import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line,
  AreaChart,
  Area
} from 'recharts';
import { WidgetConfig } from '../../../types/dashboardTypes';
import useFetchData from '../../../hooks/useFetchData';

interface ChartWidgetProps {
  config: WidgetConfig;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ config }) => {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('bar');
  let { data } = useFetchData(config.id);

  // Datos de ejemplo (en producción usaríamos useFetchData hook)
  data = [
    { name: 'Ene', '2024': 4000, '2025': 4500 },
    { name: 'Feb', '2024': 3000, '2025': 4500 },
    { name: 'Mar', '2024': 2000, '2025': 4500 },
    { name: 'Abr', '2024': 2780, '2025': 4500 },
    { name: 'May', '2024': 1890, '2025': 4500 },
    { name: 'Jun', '2024': 1890, '2025': 4500 },
    { name: 'Jul', '2024': 1890, '2025': 4500 },
    { name: 'Ago', '2024': 1890, '2025': 4500 },
    { name: 'Sep', '2024': 1890, '2025': 4500 },
    { name: 'Oct', '2024': 1890, '2025': 4500 },
    { name: 'Nov', '2024': 1890, '2025': 4500 },
    { name: 'Dic', '2024': 1890, '2025': 4500 },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setChartType('bar')}
          className={`px-2 py-1 mr-2 rounded ${chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Barras
        </button>
        <button
          onClick={() => setChartType('line')}
          className={`px-2 py-1 rounded ${chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Líneas
        </button>
        <button
          onClick={() => setChartType('area')}
          className={`px-2 py-1 rounded ${chartType === 'area' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Área
        </button>
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="2024" fill="#8884d8" />
              <Bar dataKey="2025" fill="#8884d8" />
            </BarChart>
          ) : (
            chartType === 'line' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="2024" stroke="#82ca9d" />
                <Line type="monotone" dataKey="2025" stroke="#82ca9d" />
              </LineChart>
            ) : (
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="2024" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="2025" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            )
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartWidget;