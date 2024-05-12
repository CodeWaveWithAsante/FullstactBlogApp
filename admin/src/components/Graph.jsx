import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Graph = ({ dt }) => {
  return (
    <ResponsiveContainer width='100%' height={400}>
      {dt?.length > 0 ? (
        <AreaChart data={dt}>
          <XAxis dataKey='_id' />
          <YAxis />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='Total'
            stroke='#8884d8'
            fill='#8884d8'
          />
        </AreaChart>
      ) : (
        <img
          src='https://user-images.githubusercontent.com/15953522/49493502-63e21d00-f882-11e8-911c-1d7655f393e8.png'
          alt='No Data'
          className='w-full h-full opacity-50'
        />
      )}
    </ResponsiveContainer>
  );
};

export default Graph;
