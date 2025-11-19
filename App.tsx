import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Components
import { SubscriptionCard } from './components/SubscriptionCard';
import { SubscriptionForm } from './components/SubscriptionForm';
import { ExpensesChart } from './components/ExpensesChart';
import { Squiggle, WobblyCloud, Star, AbstractBlob, TriangleBlob } from './components/BackgroundElements';

// Types & Constants
import { Subscription } from './types';
import { COLORS } from './constants';

const App = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const storedSubscriptions = localStorage.getItem('subscriptions');
    if (storedSubscriptions) {
      setSubscriptions(JSON.parse(storedSubscriptions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const handleAddSubscription = (newSubscription: Omit<Subscription, 'id'>) => {
    setSubscriptions(prev => [...prev, { ...newSubscription, id: crypto.randomUUID() }]);
  };

  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm('Удалить эту подписку?')) {
      setSubscriptions(prev => prev.filter(sub => sub.id !== id));
    }
  }, []);

  const calculateMonthlyCost = (cost: number, cycle: string) => {
    if (cycle === 'monthly') return cost;
    if (cycle === 'annually') return cost / 12;
    if (cycle === 'weekly') return cost * (365.25 / 12 / 7);
    return 0;
  };

  const totalMonthly = useMemo(() => subscriptions.reduce((acc, sub) => acc + calculateMonthlyCost(sub.cost, sub.cycle), 0), [subscriptions]);

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 md:p-8 relative overflow-x-hidden font-sans selection:bg-pink-200" style={{ backgroundColor: COLORS.white }}>
      
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <WobblyCloud className="top-8 left-[10%] w-32 opacity-60 animate-float" />
          <Squiggle className="top-1/3 right-10 w-48 opacity-60 rotate-12 animate-pulse-slow" />
          <Star className="bottom-1/4 left-[15%] w-16 opacity-70 animate-spin-slow" />
          <AbstractBlob className="bottom-10 right-8 w-24 opacity-60 -rotate-12" />
          <TriangleBlob className="top-1/2 left-5 w-20 opacity-60 -rotate-6 animate-float" />
          <WobblyCloud className="top-20 right-[15%] w-28 opacity-60 rotate-5" color={COLORS.pink} strokeColor={COLORS.coral} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-8 p-8 rounded-[2rem] border-4 text-center transform hover:scale-[1.01] transition-transform" 
          style={{ backgroundColor: COLORS.pink, borderColor: COLORS.coral, boxShadow: `8px 8px 0px 0px ${COLORS.mainBlue}` }}>
          <h1 className="text-5xl sm:text-6xl font-black mb-4 text-white drop-shadow-sm tracking-tight" style={{textShadow: `3px 3px 0px ${COLORS.coral}`}}>
            Мои Подписки
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-2xl border-4 transform -rotate-1" style={{ backgroundColor: COLORS.mainBlue, borderColor: COLORS.green, boxShadow: `6px 6px 0px 0px ${COLORS.coral}`, color: COLORS.white }}>
              <p className="text-sm opacity-90 font-bold uppercase tracking-wider">Всего в месяц</p>
              <p className="text-4xl sm:text-5xl font-black mt-2">${totalMonthly.toFixed(2)}</p>
            </div>
            <div className="p-6 rounded-2xl border-4 transform rotate-1" style={{ backgroundColor: COLORS.green, borderColor: COLORS.mainBlue, boxShadow: `6px 6px 0px 0px ${COLORS.coral}`, color: COLORS.darkText }}>
              <p className="text-sm opacity-90 font-bold uppercase tracking-wider">Количество</p>
              <p className="text-4xl sm:text-5xl font-black mt-2">{subscriptions.length}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <SubscriptionForm onAddSubscription={handleAddSubscription} />
            </section>
            
            <section className="grid grid-cols-1 gap-6">
              {subscriptions.length === 0 && (
                <div className="text-center p-10 opacity-50 border-4 border-dashed rounded-3xl" style={{ borderColor: COLORS.brown }}>
                    <p className="text-2xl font-bold">Подписок пока нет!</p>
                    <p className="mt-2">Добавь первую подписку выше.</p>
                </div>
              )}
              {subscriptions.map(sub => <SubscriptionCard key={sub.id} sub={sub} onDelete={handleDelete} />)}
            </section>
          </div>

          {/* Right Column: Chart */}
          <div className="lg:col-span-1">
             <div className="sticky top-8">
                 <ExpensesChart subscriptions={subscriptions} />
                 
                 <div className="p-6 rounded-3xl border-4 text-center" style={{ backgroundColor: COLORS.illustrationBlue, borderColor: COLORS.mainBlue, boxShadow: `8px 8px 0px 0px ${COLORS.darkText}` }}>
                    <p className="font-bold text-lg mb-2" style={{ color: COLORS.darkText }}>Совет дня</p>
                    <p className="text-sm leading-relaxed" style={{ color: COLORS.darkText }}>
                        Проверяй свои регулярные платежи каждый месяц. Часто «бесплатные пробные периоды» незаметно становятся платными!
                    </p>
                 </div>
             </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default App;