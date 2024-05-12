import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { BsEye, BsPostcardHeart } from "react-icons/bs";
import { FaUsers, FaUsersCog } from "react-icons/fa";
import { formatNumber } from "../utils";

const icons = {
  user: FaUsersCog,
  view: BsEye,
  post: BsPostcardHeart,
  users: FaUsers,
};

const Stats = ({ dt }) => {
  const data = [
    {
      title: "TOTAL POST",
      icon: "post",
      value: formatNumber(dt?.totalPosts ?? 0),
      diff: 34,
    },
    {
      title: "FOLLOWERS",
      icon: "users",
      value: formatNumber(dt?.followers ?? 0),
      diff: -13,
    },
    {
      title: "TOTAL VIEWS",
      icon: "view",
      value: formatNumber(dt?.totalViews ?? 0),
      diff: 18,
    },
    {
      title: "TOTAL WRITERS",
      icon: "user",
      value: formatNumber(dt?.totalWriters ?? 0),
      diff: -30,
    },
  ];

  const stats = data?.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p='md' key={stat.title}>
        <Group justify='space-between'>
          <Text className='capitalize text-sm'>{stat.title}</Text>
          <Icon size='1.4rem' stroke={1.5} />
        </Group>

        <Group align='flex-end' gap='xs' mt={25}>
          <Text className='text-2xl 2xl:text-4xl font-serif'>{stat.value}</Text>

          <Text
            c={stat.diff > 0 ? "teal" : "red"}
            fz='sm'
            fw='500'
            className='font-medium'
          >
            <span>{stat.diff}%</span>
            <DiffIcon size='1rem' stroke={0.5} />
          </Text>
        </Group>

        <Text fz='xs' c='dimmed' mt={7}>
          Compare to previous month
        </Text>
      </Paper>
    );
  });
  return <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>;
};

export default Stats;
