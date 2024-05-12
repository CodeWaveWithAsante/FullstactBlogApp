import { Select, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Loading from "../components/Loading";
import { useAnalytics } from "../hooks/post-hook";
import useStore from "../store";
import clsx from "clsx";
import Stats from "../components/Stats";
import Graph from "../components/Graph";

const Analytics = () => {
  const { colorScheme } = useMantineColorScheme();

  const { user } = useStore();
  const [numOfDays, setNumberOfDays] = useState(28);
  const [visible, { toggle }] = useDisclosure(false);
  const { data, isPending, mutate } = useAnalytics(toast, toggle, user?.token);

  const theme = colorScheme === "dark";

  useEffect(() => {
    mutate(numOfDays);
  }, [numOfDays]);

  return (
    <div className='w-full'>
      <div className='w-full flex items-center justify-between mb-3'>
        <p
          className={clsx(
            "text-xl font-semibold ",
            theme ? "text-white" : "text-slate-700"
          )}
        >
          Analytics
        </p>

        <Select
          // label='Select Range'
          defaultValue='28 days'
          placeholder='Range'
          data={["7 days", "28 days", "90 days", "365 days"]}
          onChange={(val) => setNumberOfDays(val?.split(" "[0]))}
        />
      </div>

      <Stats dt={data} />

      <div className='w-full py-8'>
        <p className='py-5 text-base font-medium '>
          View Stats for last {numOfDays} days
        </p>
        <Graph dt={data?.viewStats} />
      </div>

      <div className='w-full py-8'>
        <p className='py-5 text-base font-medium '>
          Followers Stats for last {numOfDays} days
        </p>
        <Graph dt={data?.followersStats} />
      </div>

      <Loading visible={isPending} />

      <Toaster richColors />
    </div>
  );
};

export default Analytics;
