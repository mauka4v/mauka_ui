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
  ReferenceLine,
  ResponsiveContainer,
  ComposedChart,
  Scatter
} from 'recharts';
import { DD_HH_FMT, convertEpochToHumam } from '../../common/moment';
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

const CustomTooltip = ({ active, payload, label }) => {
  // console.log(label )
  if (active && payload && payload.length) {

    const {OpenClose, BuyValue, SellValue} = payload[0].payload
    
    return (
      <div className="custom-tooltip">
        <p className="label">{` At Time ${label} `}</p>
        <p className="">Open: {OpenClose[0]}</p>
        <p className="">Close: {OpenClose[1]}</p>
        {BuyValue !== "null" && <p className="">Buy Price: {BuyValue}</p>}
        {SellValue !== "null" && <p className="">Sell Price: {SellValue}</p>}
      </div>
    );
  }
}

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
  return data.map(({ Open, Close, Date, Datetime, ...other }) => {
    return {
      ...other,
      Date: Date !== undefined && convertEpochToHumam(Date),
      Datetime: Datetime !== undefined && convertEpochToHumam(Datetime, DD_HH_FMT),
      OpenClose: [Open, Close],
    };
  });
};


export const CustomShapeBarChart = (props) => {
  const {Data, Interval} = props
  const data = prepareData(Data);
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
    <ResponsiveContainer width="100%" height="70%">
      <ComposedChart data={data}>
      <XAxis dataKey={Interval === "1h" ? "Datetime" : "Date"}/>
      <YAxis 
      type="number"
          domain={['auto', 'auto']} /> 
          <ReferenceLine y={'dataMin'} stroke="#000" />
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <Scatter 
          dataKey={(v)=>v.BuyValue ? v.BuyValue : parseInt(v.Open/2)}
          name="BuyValue" fill="yellow"  strokeWidth={10} />
        <Scatter 
          dataKey={(v)=>v.SellValue ? v.SellValue : parseInt(v.Open/2)}
          name="SellValue" 
          fill="red" 
          />
      <Bar
        dataKey="OpenClose"
        fill="#8884d8"
        shape={<Candlestick />}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
      <Legend/>
        <Tooltip content={<CustomTooltip />} />
    </ComposedChart>
    </ResponsiveContainer>
  );
};