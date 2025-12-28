import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/components/ui/use-toast';

interface Fighter {
  id: number;
  name: string;
  nickname: string;
  record: string;
  country: string;
  odds: number;
}

interface Fight {
  id: number;
  date: string;
  time: string;
  fighter1: Fighter;
  fighter2: Fighter;
  status: 'upcoming' | 'live' | 'finished';
}

const Index = () => {
  const { toast } = useToast();
  const [selectedFighter, setSelectedFighter] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState('');
  const [activeTab, setActiveTab] = useState('bets');

  const fights: Fight[] = [
    {
      id: 1,
      date: '15 января 2025',
      time: '22:00 МСК',
      status: 'upcoming',
      fighter1: {
        id: 1,
        name: 'Иван Петров',
        nickname: 'Молот',
        record: '18-3-0',
        country: '🇷🇺',
        odds: 1.85
      },
      fighter2: {
        id: 2,
        name: 'Джон Смит',
        nickname: 'Железный',
        record: '22-5-1',
        country: '🇺🇸',
        odds: 2.10
      }
    },
    {
      id: 2,
      date: '20 января 2025',
      time: '23:30 МСК',
      status: 'upcoming',
      fighter1: {
        id: 3,
        name: 'Хабиб Магомедов',
        nickname: 'Орёл',
        record: '29-0-0',
        country: '🇷🇺',
        odds: 1.45
      },
      fighter2: {
        id: 4,
        name: 'Конор МакГрегор',
        nickname: 'Ноториус',
        record: '22-6-0',
        country: '🇮🇪',
        odds: 2.85
      }
    }
  ];

  const handleBet = (fighterId: number) => {
    if (!betAmount || parseFloat(betAmount) <= 0) {
      toast({
        title: "Ошибка",
        description: "Введите корректную сумму ставки",
        variant: "destructive"
      });
      return;
    }

    setSelectedFighter(fighterId);
    toast({
      title: "Ставка принята!",
      description: `Сумма: ${betAmount}₽. Переведите средства на +7 918 126 27 04 (Т-Банк)`,
      duration: 8000
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-destructive to-secondary py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJzLTUuMzczIDEyLTEyIDEyLTEyLTUuMzczLTEyLTEyIDUuMzczLTEyIDEyLTEyek0yNCAyYzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJzLTUuMzczIDEyLTEyIDEyUzEyIDE5LjYyNyAxMiAxNCAyMC4zNzMgMiAyNCAyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
              БОЕВАЯ АРЕНА
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Ставки на реальные бои | Живые трансляции | Мгновенные выплаты
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Badge variant="secondary" className="text-lg px-6 py-2 animate-pulse-glow">
                <Icon name="Flame" className="mr-2" size={20} />
                2 боя сегодня
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto h-14 bg-card">
            <TabsTrigger value="bets" className="text-base">
              <Icon name="Trophy" className="mr-2" size={18} />
              Бои
            </TabsTrigger>
            <TabsTrigger value="my-bets" className="text-base">
              <Icon name="Wallet" className="mr-2" size={18} />
              Мои ставки
            </TabsTrigger>
            <TabsTrigger value="rules" className="text-base">
              <Icon name="BookOpen" className="mr-2" size={18} />
              Правила
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bets" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Ближайшие бои</h2>
              <p className="text-muted-foreground">Выберите бойца и сделайте ставку</p>
            </div>

            {fights.map((fight) => (
              <Card key={fight.id} className="p-6 bg-card border-2 border-border hover:border-primary transition-all duration-300 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <Badge variant={fight.status === 'live' ? 'destructive' : 'secondary'} className="text-sm px-3 py-1">
                    {fight.status === 'live' && <Icon name="Radio" className="mr-2 animate-pulse" size={14} />}
                    {fight.status === 'live' ? 'LIVE' : fight.date}
                  </Badge>
                  <span className="text-muted-foreground font-medium">{fight.time}</span>
                </div>

                <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
                  <div className="space-y-3 text-center md:text-right">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{fight.fighter1.name}</h3>
                      <p className="text-primary font-semibold text-lg">"{fight.fighter1.nickname}"</p>
                    </div>
                    <div className="flex items-center justify-center md:justify-end gap-3">
                      <span className="text-2xl">{fight.fighter1.country}</span>
                      <Badge variant="outline" className="font-mono">{fight.fighter1.record}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-accent/20 border border-accent rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Коэффициент</p>
                        <p className="text-3xl font-bold text-accent">{fight.fighter1.odds}</p>
                      </div>
                      <Input
                        type="number"
                        placeholder="Сумма ставки (₽)"
                        value={selectedFighter === fight.fighter1.id ? betAmount : ''}
                        onChange={(e) => {
                          setSelectedFighter(fight.fighter1.id);
                          setBetAmount(e.target.value);
                        }}
                        className="text-center bg-input border-border"
                      />
                      <Button 
                        onClick={() => handleBet(fight.fighter1.id)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 animate-pulse-glow"
                      >
                        <Icon name="Zap" className="mr-2" size={20} />
                        Поставить
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="bg-destructive/20 rounded-full p-6 mb-3">
                      <Icon name="Swords" size={48} className="text-destructive" />
                    </div>
                    <span className="text-4xl font-bold text-muted-foreground">VS</span>
                  </div>

                  <div className="space-y-3 text-center md:text-left">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{fight.fighter2.name}</h3>
                      <p className="text-primary font-semibold text-lg">"{fight.fighter2.nickname}"</p>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <Badge variant="outline" className="font-mono">{fight.fighter2.record}</Badge>
                      <span className="text-2xl">{fight.fighter2.country}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-accent/20 border border-accent rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Коэффициент</p>
                        <p className="text-3xl font-bold text-accent">{fight.fighter2.odds}</p>
                      </div>
                      <Input
                        type="number"
                        placeholder="Сумма ставки (₽)"
                        value={selectedFighter === fight.fighter2.id ? betAmount : ''}
                        onChange={(e) => {
                          setSelectedFighter(fight.fighter2.id);
                          setBetAmount(e.target.value);
                        }}
                        className="text-center bg-input border-border"
                      />
                      <Button 
                        onClick={() => handleBet(fight.fighter2.id)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 animate-pulse-glow"
                      >
                        <Icon name="Zap" className="mr-2" size={20} />
                        Поставить
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="my-bets" className="space-y-6">
            <div className="text-center py-16">
              <div className="bg-card rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Icon name="Wallet" size={48} className="text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Ваши ставки появятся здесь</h3>
              <p className="text-muted-foreground mb-6">После оплаты ваши ставки будут отображаться в этом разделе</p>
              <Button onClick={() => setActiveTab('bets')} variant="outline" size="lg">
                <Icon name="Plus" className="mr-2" size={20} />
                Сделать ставку
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card className="p-8 bg-card border-2 border-border">
              <h2 className="text-3xl font-bold mb-6 text-center">Правила платформы</h2>
              
              <div className="space-y-6 text-foreground">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="CircleCheck" className="text-accent" size={24} />
                    Как сделать ставку
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 ml-8 text-muted-foreground">
                    <li>Выберите бой и бойца</li>
                    <li>Укажите сумму ставки</li>
                    <li>Нажмите кнопку "Поставить"</li>
                    <li>Переведите указанную сумму на реквизиты</li>
                  </ol>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="CreditCard" className="text-secondary" size={24} />
                    Реквизиты для оплаты
                  </h3>
                  <div className="bg-primary/10 border-2 border-primary rounded-lg p-6">
                    <p className="text-2xl font-bold text-primary mb-2">+7 918 126 27 04</p>
                    <p className="text-lg font-semibold text-foreground">Т-Банк (Tinkoff)</p>
                    <p className="text-sm text-muted-foreground mt-3">
                      В комментарии к платежу укажите номер боя и имя бойца
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="Trophy" className="text-accent" size={24} />
                    Выплаты выигрышей
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-8 text-muted-foreground">
                    <li>Выплаты производятся в течение 24 часов после боя</li>
                    <li>Средства переводятся на тот же счёт, с которого была ставка</li>
                    <li>Минимальная ставка: 100₽</li>
                    <li>Максимальная ставка: 50,000₽</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="AlertTriangle" className="text-destructive" size={24} />
                    Важно
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-8 text-muted-foreground">
                    <li>Ставки принимаются до начала боя</li>
                    <li>Отмена ставки невозможна после оплаты</li>
                    <li>Возврат средств только при отмене боя организаторами</li>
                    <li>Ставки разрешены только лицам старше 18 лет</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-card border-t border-border py-8 mt-20">
        <div className="container mx-auto max-w-6xl px-4 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Shield" size={18} />
            Боевая Арена © 2025
          </p>
          <p className="text-sm">Ставки на бои | Быстрые выплаты | Честная игра</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;