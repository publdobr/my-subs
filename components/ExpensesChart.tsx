import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Subscription } from '../types';
import { COLORS } from '../constants';

interface ExpensesChartProps {
  subscriptions: Subscription[];
}

const calculateMonthlyCost = (cost: number, cycle: string) => {
  if (cycle === 'monthly') return cost;
  if (cycle === 'annually') return cost / 12;
  if (cycle === 'weekly') return cost * (365.25 / 12 / 7);
  return 0;
};

export const ExpensesChart: React.FC<ExpensesChartProps> = ({ subscriptions }) => {
  const data = subscriptions.map(sub => ({
    name: sub.name,
    value: calculateMonthlyCost(sub.cost, sub.cycle),
  })).filter(item => item.value > 0);

  const CHART_COLORS = [COLORS.mainBlue, COLORS.coral, COLORS.yellow, COLORS.green, COLORS.pink, COLORS.brown];

  if (data.length === 0) return null;

  return (
    <div 
      className="p-6 rounded-3xl border-4 mb-8"
      style={{ 
        backgroundColor: COLORS.white, 
        borderColor: COLORS.illustrationBlue, 
        boxShadow: `8px 8px 0px 0px ${COLORS.mainBlue}` 
      }}
    >
      <h3 className="text-xl font-bold mb-4 text-center" style={{ color: COLORS.darkText }}>Расходы за месяц</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: `3px solid ${COLORS.mainBlue}`, 
                fontFamily: 'Nunito',
                boxShadow: `4px 4px 0px 0px ${COLORS.coral}`
              }} 
              itemStyle={{ color: COLORS.darkText, fontWeight: 'bold' }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Цена']}
            />
            <Legend 
                iconType="circle" 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                wrapperStyle={{ fontFamily: 'Nunito', fontWeight: 600, color: COLORS.darkText }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};