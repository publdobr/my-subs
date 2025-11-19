import React, { useState } from 'react';
import { COLORS } from '../constants';
import { Subscription } from '../types';

interface SubscriptionFormProps {
  onAddSubscription: (subscription: Omit<Subscription, 'id'>) => void;
}

const InputField = ({ id, label, value, onChange, type, ...rest }: any) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold mb-2 pl-1" style={{ color: COLORS.darkText }}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-white/50 transition-all font-bold text-lg"
      style={{ backgroundColor: COLORS.white, borderColor: COLORS.pink, color: COLORS.darkText }}
      {...rest}
    />
  </div>
);

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onAddSubscription }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [cycle, setCycle] = useState('monthly');
  const [nextDue, setNextDue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const parsedCost = parseFloat(cost);
    if (!name.trim() || isNaN(parsedCost) || parsedCost <= 0 || !nextDue) {
      setError('Заполни все поля корректно!');
      return;
    }

    setIsLoading(true);
    try {
      onAddSubscription({
        name: name.trim(),
        cost: parsedCost,
        cycle: cycle as 'monthly' | 'annually' | 'weekly',
        nextDue: new Date(nextDue),
        createdAt: new Date(),
      });
      setName(''); setCost(''); setCycle('monthly'); setNextDue('');
    } catch (e) {
      console.error(e);
      setError('Не удалось сохранить подписку.');
    } finally {
      setIsLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-6 sm:p-8 rounded-3xl border-4 relative overflow-hidden transition-all" 
      style={{ 
        backgroundColor: COLORS.yellow, 
        borderColor: COLORS.green, 
        boxShadow: `8px 8px 0px 0px ${COLORS.coral}`
      }}
    >
      <h2 className="text-3xl font-black mb-6 text-center uppercase tracking-tight" style={{ color: COLORS.darkText }}>
        ДОБАВИТЬ НОВУЮ
      </h2>
      {error && (
        <div className="mb-6 p-4 rounded-2xl text-sm font-bold text-center animate-pulse" style={{ backgroundColor: COLORS.white, color: COLORS.coral, border: `3px dashed ${COLORS.coral}` }}>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField id="name" label="Что отслеживаем?" value={name} onChange={setName} type="text" placeholder="Netflix, Яндекс Плюс..." required />
        <InputField id="cost" label="Цена ($)" value={cost} onChange={setCost} type="number" step="0.01" placeholder="9.99" required />
        
        <div className="col-span-1">
          <label htmlFor="cycle" className="block text-sm font-bold mb-2 pl-1" style={{ color: COLORS.darkText }}>
            Как часто?
          </label>
          <div className="relative">
            <select
              id="cycle"
              value={cycle}
              onChange={(e) => setCycle(e.target.value)}
              className="w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-white/50 transition-all cursor-pointer font-bold text-lg appearance-none"
              style={{ backgroundColor: COLORS.white, borderColor: COLORS.pink, color: COLORS.darkText }}
            >
              <option value="monthly">Раз в месяц</option>
              <option value="annually">Раз в год</option>
              <option value="weekly">Каждую неделю</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke={COLORS.pink} viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
        <InputField id="nextDue" label="Следующая оплата" value={nextDue} onChange={setNextDue} type="date" min={today} required />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-8 py-4 px-6 rounded-2xl font-black text-xl uppercase tracking-wider transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: COLORS.coral, color: COLORS.white, boxShadow: `4px 4px 0px 0px ${COLORS.darkText}` }}
      >
        {isLoading ? 'СОХРАНЯЮ...' : 'ГОТОВО!'}
      </button>
    </form>
  );
};