import { Table } from "@mantine/core";
import { formatNumber, getInitials } from "../utils";
import moment from "moment";

export const RecentFollowerTable = ({ data, theme }) => {
  const tableData = data?.map(({ _id, createdAt, followerId: follower }) => (
    <Table key={_id} className={theme ? "text-gray-400" : "text-slate-600"}>
      <Table.Td className='flex gap-2 items-center'>
        {follower?.image ? (
          <img
            src={follower.image}
            alt={follower.name}
            className='w-10 h-10 rounded-full object-cover'
          />
        ) : (
          <p className='w-10 h-10 rounded-full flex justify-center items-center first:bg-blue-700 text-white'>
            {getInitials(follower.name)}
          </p>
        )}

        <>
          <p className='text-base'>{follower.name}</p>
          <div className='flex gap-3 items-center'>
            <span className='text-sm text-rose-600'>
              {follower.accountType}
            </span>

            {follower.followers.length > 0 && (
              <span className='text-sm to-slate-600 font-bold'>
                {formatNumber(follower.followers.length)}
              </span>
            )}
          </div>
        </>
      </Table.Td>

      <Table.Td>{moment(createdAt).fromNow()}</Table.Td>
    </Table>
  ));

  return (
    <Table highlightOnHover withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Follower</Table.Th>
          <Table.Th>Join Date</Table.Th>
        </Table.Tr>
      </Table.Thead>

      {data?.length === 0 && <Table.Caption>No Data Found.</Table.Caption>}

      <Table.Tbody>{tableData}</Table.Tbody>
    </Table>
  );
};

export const RecentPostTable = ({ data, theme }) => {
  const tableData = data?.map((el) => (
    <Table.Tr
      key={el?._id}
      className={theme ? "text-gray-400" : "text-slate-600"}
    >
      <Table.Td className='flex gap-2 items-center'>
        <img
          src={el?.img}
          alt={el?.title}
          className='w-10 h-10 rounded-full object-conver'
        />

        <>
          <p className='text-base'>{el?.title}</p>
          <span className='text-[10px] text-rose-600'>{el?.cat}</span>
        </>
      </Table.Td>
      <Table.Td>{formatNumber(el?.views.length)}</Table.Td>
      <Table.Td>{moment(el?.createdAt).fromNow()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Post Title</Table.Th>
          <Table.Th>Views</Table.Th>
          <Table.Th>Post Date</Table.Th>
        </Table.Tr>
      </Table.Thead>
      {data?.length === 0 && <Table.Caption>No Data Found.</Table.Caption>}
      <Table.Tbody>{tableData}</Table.Tbody>
    </Table>
  );
};
