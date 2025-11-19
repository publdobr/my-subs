import React from 'react';
import { Subscription } from '../types';
import { COLORS } from '../constants';
import { Timestamp } from 'firebase/firestore';

interface SubscriptionCardProps {
  sub: Subscription;
  onDelete: (id: string) => void;
}

const calculateMonthlyCost = (cost: number, cycle: string) => {
  if (cycle === 'monthly') return cost;
  if (cycle === 'annually') return cost / 12;
  if (cycle === 'weekly') return cost * (365.25 / 12 / 7);
  return 0;
};

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ sub, onDelete }) => {
  const monthlyCost = calculateMonthlyCost(sub.cost, sub.cycle);
  const cycleText = sub.cycle === 'monthly' ? 'Ежемесячно' : sub.cycle === 'annually' ? 'Ежегодно' : 'Еженедельно';
  const nextDue = sub.nextDue instanceof Timestamp ? sub.nextDue.toDate().toLocaleDateString('ru-RU') : 'Неизвестно';

  const DeleteIcon = () => (
    <svg className="w-5 h-5 transform" viewBox="0 0 24 24" fill="none" stroke={COLORS.coral} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  return (
    <div 
      className="relative p-5 rounded-2xl border-4 transition-all duration-200 hover:-translate-y-1 group" 
      style={{ 
        backgroundColor: COLORS.white, 
        borderColor: COLORS.pink, 
        boxShadow: `8px 8px 0px 0px ${COLORS.mainBlue}`
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold leading-tight" style={{ color: COLORS.darkText }}>{sub.name}</h3>
          <p className="text-sm text-gray-500 mt-1 font-medium uppercase tracking-wide text-xs">
            {cycleText} &bull; След.: {nextDue}
          </p>
        </div>
        <button
          onClick={() => onDelete(sub.id)}
          className="p-2 rounded-xl hover:bg-red-50 transition-colors opacity-60 hover:opacity-100"
          aria-label={`Удалить ${sub.name}`}
        >
          <DeleteIcon />
        </button>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-3 border-t-2 border-dashed" style={{borderColor: COLORS.pink}}>
        <div>
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Сумма платежа</p>
          <span className="text-3xl font-bold" style={{ color: COLORS.coral }}>
            ${sub.cost.toFixed(2)}
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">В месяц</p>
          <span className="text-2xl font-bold" style={{ color: COLORS.mainBlue }}>
            ${monthlyCost.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};