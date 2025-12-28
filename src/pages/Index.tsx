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
  team: string;
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
  const [donationAmount, setDonationAmount] = useState('');
  const [activeTab, setActiveTab] = useState('donate');

  const fights: Fight[] = [
    {
      id: 1,
      date: '28 декабря 2024',
      time: '18:00 МСК',
      status: 'upcoming',
      fighter1: {
        id: 1,
        name: 'АРС',
        nickname: 'Блондин',
        record: '2-0-0',
        country: '🇷🇺',
        team: 'Тренер: Сергей Иванов | Менеджер: Дмитрий Петров'
      },
      fighter2: {
        id: 2,
        name: 'АРАМ',
        nickname: 'Морозов',
        record: '0-0-0',
        country: '🇷🇺',
        team: 'Тренер: Александр Смирнов | Менеджер: Игорь Соколов'
      }
    }
  ];

  const handleDonation = (fighterId: number) => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast({
        title: "Ошибка",
        description: "Введите корректную сумму пожертвования",
        variant: "destructive"
      });
      return;
    }

    setSelectedFighter(fighterId);
    toast({
      title: "Спасибо за поддержку!",
      description: `Сумма: ${donationAmount}₽. Переведите средства на +7 918 126 27 04 (Т-Банк). Деньги не возвращаются.`,
      duration: 10000
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-destructive to-secondary py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJzLTUuMzczIDEyLTEyIDEyLTEyLTUuMzczLTEyLTEyIDUuMzczLTEyIDEyLTEyek0yNCAyYzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJzLTUuMzczIDEyLTEyIDEyUzEyIDE5LjYyNyAxMiAxNCAyMC4zNzMgMiAyNCAyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
              ПОДДЕРЖИ БОЙЦА
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Помоги команде тренеров и менеджеров подготовить бойцов к победе
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Badge variant="secondary" className="text-lg px-6 py-2 animate-pulse-glow">
                <Icon name="Flame" className="mr-2" size={20} />
                Бой сегодня в 18:00
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto h-14 bg-card">
            <TabsTrigger value="donate" className="text-base">
              <Icon name="Heart" className="mr-2" size={18} />
              Поддержать
            </TabsTrigger>
            <TabsTrigger value="my-donations" className="text-base">
              <Icon name="HandHeart" className="mr-2" size={18} />
              Мои донаты
            </TabsTrigger>
            <TabsTrigger value="info" className="text-base">
              <Icon name="Info" className="mr-2" size={18} />
              Информация
            </TabsTrigger>
          </TabsList>

          <TabsContent value="donate" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Ближайшие бои</h2>
              <p className="text-muted-foreground">Выберите команду бойца для поддержки</p>
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-sm text-destructive font-semibold">⚠️ Внимание: Все пожертвования идут на поддержку тренеров и менеджеров. Деньги не возвращаются.</p>
              </div>
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
                    <div className="flex flex-col items-center md:items-end mb-3">
                      <img 
                        src="https://cdn.poehali.dev/projects/bb796026-b353-4c6b-b283-ab4561272180/files/166f9bac-964f-4da9-a086-d7016abe9881.jpg" 
                        alt={fight.fighter1.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{fight.fighter1.name}</h3>
                      <p className="text-primary font-semibold text-lg">"{fight.fighter1.nickname}"</p>
                    </div>
                    <div className="flex items-center justify-center md:justify-end gap-3">
                      <span className="text-2xl">{fight.fighter1.country}</span>
                      <Badge variant="outline" className="font-mono">{fight.fighter1.record}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Команда поддержки</p>
                        <p className="text-sm font-medium text-foreground">{fight.fighter1.team}</p>
                      </div>
                      <Input
                        type="number"
                        placeholder="Сумма пожертвования (₽)"
                        value={selectedFighter === fight.fighter1.id ? donationAmount : ''}
                        onChange={(e) => {
                          setSelectedFighter(fight.fighter1.id);
                          setDonationAmount(e.target.value);
                        }}
                        className="text-center bg-input border-border"
                      />
                      <Button 
                        onClick={() => handleDonation(fight.fighter1.id)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6"
                      >
                        <Icon name="Heart" className="mr-2" size={20} />
                        Поддержать команду
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
                    <div className="flex flex-col items-center md:items-start mb-3">
                      <img 
                        src="https://cdn.poehali.dev/projects/bb796026-b353-4c6b-b283-ab4561272180/files/90ab52e4-5c5f-447c-a909-457d323a515e.jpg" 
                        alt={fight.fighter2.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{fight.fighter2.name}</h3>
                      <p className="text-primary font-semibold text-lg">"{fight.fighter2.nickname}"</p>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <Badge variant="outline" className="font-mono">{fight.fighter2.record}</Badge>
                      <span className="text-2xl">{fight.fighter2.country}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Команда поддержки</p>
                        <p className="text-sm font-medium text-foreground">{fight.fighter2.team}</p>
                      </div>
                      <Input
                        type="number"
                        placeholder="Сумма пожертвования (₽)"
                        value={selectedFighter === fight.fighter2.id ? donationAmount : ''}
                        onChange={(e) => {
                          setSelectedFighter(fight.fighter2.id);
                          setDonationAmount(e.target.value);
                        }}
                        className="text-center bg-input border-border"
                      />
                      <Button 
                        onClick={() => handleDonation(fight.fighter2.id)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6"
                      >
                        <Icon name="Heart" className="mr-2" size={20} />
                        Поддержать команду
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="my-donations" className="space-y-6">
            <div className="text-center py-16">
              <div className="bg-card rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Icon name="HandHeart" size={48} className="text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Ваши пожертвования появятся здесь</h3>
              <p className="text-muted-foreground mb-6">После оплаты ваши пожертвования будут отображаться в этом разделе</p>
              <Button onClick={() => setActiveTab('donate')} variant="outline" size="lg">
                <Icon name="Heart" className="mr-2" size={20} />
                Поддержать команду
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            <Card className="p-8 bg-card border-2 border-border">
              <h2 className="text-3xl font-bold mb-6 text-center">Информация о пожертвованиях</h2>
              
              <div className="bg-destructive/10 border-2 border-destructive rounded-lg p-6 mb-6">
                <p className="text-lg font-bold text-destructive flex items-center gap-2">
                  <Icon name="AlertTriangle" size={24} />
                  Важно: Деньги не возвращаются!
                </p>
                <p className="text-sm text-muted-foreground mt-3">
                  Все пожертвования являются добровольными и идут на поддержку тренеров и менеджеров бойцов. Возврат средств не предусмотрен.
                </p>
              </div>

              <div className="space-y-6 text-foreground">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="Heart" className="text-primary" size={24} />
                    Как поддержать команду
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 ml-8 text-muted-foreground">
                    <li>Выберите бойца, которого хотите поддержать</li>
                    <li>Укажите сумму пожертвования</li>
                    <li>Нажмите кнопку "Поддержать команду"</li>
                    <li>Переведите указанную сумму на реквизиты</li>
                  </ol>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="CreditCard" className="text-secondary" size={24} />
                    Реквизиты для перевода
                  </h3>
                  <div className="bg-primary/10 border-2 border-primary rounded-lg p-6">
                    <p className="text-2xl font-bold text-primary mb-2">+7 918 126 27 04</p>
                    <p className="text-lg font-semibold text-foreground">Т-Банк (Tinkoff)</p>
                    <p className="text-sm text-muted-foreground mt-3">
                      В комментарии к платежу укажите имя бойца
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="Users" className="text-accent" size={24} />
                    Куда идут средства
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-8 text-muted-foreground">
                    <li>Оплата работы тренеров и менеджеров</li>
                    <li>Организация тренировок и спаррингов</li>
                    <li>Минимальное пожертвование: 100₽</li>
                    <li>Пожертвования помогают развивать спорт и поддерживать бойцов</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="ShieldAlert" className="text-destructive" size={24} />
                    Важная информация
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-8 text-muted-foreground">
                    <li>Это не букмекерская платформа - это система поддержки команд бойцов</li>
                    <li>Все средства идут на оплату работы тренеров и менеджеров</li>
                    <li>Деньги не возвращаются ни при каких обстоятельствах</li>
                    <li>Пожертвования принимаются только от лиц старше 18 лет</li>
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