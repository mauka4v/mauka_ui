import React from 'react';
import moment from "moment"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ReferenceLine
} from 'recharts';
const colors = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
];

const Candlestick = props => {
  const {
    fill,
    x,
    y,
    width,
    height,
    Low,
    High,
    OpenClose: [Open, Close],
  } = props;
  const isGrowing = Open < Close;
  const color = isGrowing ? 'green' : 'red';
  const ratio = Math.abs(height / (Open - Close));
  return (
    <g stroke={color} fill="none" strokeWidth="2">
      <path
        d={`
          M ${x},${y}
          L ${x},${y + height}
          L ${x + width},${y + height}
          L ${x + width},${y}
          L ${x},${y}
        `}
      />
      {/* bottom line */}
      {isGrowing ? (
        <path
          d={`
            M ${x + width / 2}, ${y + height}
            v ${(Open - Low) * ratio}
          `}
        />
      ) : (
        <path
          d={`
            M ${x + width / 2}, ${y}
            v ${(Close - Low) * ratio}
          `}
        />
      )}
      {/* top line */}
      {isGrowing ? (
        <path
          d={`
            M ${x + width / 2}, ${y}
            v ${(Close - High) * ratio}
          `}
        />
      ) : (
        <path
          d={`
            M ${x + width / 2}, ${y + height}
            v ${(Open - High) * ratio}
          `}
        />
      )}
    </g>
  );
};

const prepareData = data => {
  return data.map(({ Open, Close, ...other }) => {
    return {
      ...other,
      OpenClose: [Open, Close],
    };
  });
};

const dateFormatter = date => {
  return moment(date).format('MM/DD');
};

export const CustomShapeBarChart = (props) => {
  const {Data, Interval} = props
  const data = prepareData(Data);
  // data.reduce((acc, item) => console.log(item), 0);
  const minValue = data.reduce(
    (minValue, { Low, OpenClose: [Open, Close] }) => {
      const currentMin = Math.min(Low, Open, Close);
      return minValue === null || currentMin < minValue ? currentMin : minValue;
    },
    null,
  );
  const maxValue = data.reduce(
    (maxValue, { High, OpenClose: [Open, Close] }) => {
      const currentMax = Math.max(High, Open, Close);
      return currentMax > maxValue ? currentMax : maxValue;
    },
    minValue,
  );

  return (
    <BarChart
      width={800}
      height={600}
      data={data}
      margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
    >
      {/* <XAxis dataKey="Timestamp" /> */}
      <XAxis dataKey={Interval === "1h" ? "Datetime" : "Date"} tickFormatter={dateFormatter}/>
      <YAxis 
      // domain={[minValue, maxValue]} 
      type="number"
          domain={['auto', 'auto']} /> 
          <ReferenceLine y={'dataMin'} stroke="#000" />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar
        dataKey="OpenClose"
        fill="#8884d8"
        shape={<Candlestick />}
        // label={{ position: 'top' }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
};