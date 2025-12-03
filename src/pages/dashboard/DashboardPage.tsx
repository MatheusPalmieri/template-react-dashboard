import {
  Activity,
  ArrowDown,
  ArrowUp,
  BarChart3,
  DollarSign,
  TrendingUp,
  Users,
} from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? 'Bom dia' : currentHour < 18 ? 'Boa tarde' : 'Boa noite';
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0];

  const stats = [
    {
      title: 'Total de Usuários',
      value: '2,543',
      icon: Users,
      trend: { value: 12.5, isPositive: true },
      color: 'cyan',
    },
    {
      title: 'Receita Total',
      value: 'R$ 45.2K',
      icon: DollarSign,
      trend: { value: 8.3, isPositive: true },
      color: 'green',
    },
    {
      title: 'Projetos Ativos',
      value: '12',
      icon: BarChart3,
      trend: { value: 3.2, isPositive: false },
      color: 'purple',
    },
    {
      title: 'Taxa de Conversão',
      value: '68.4%',
      icon: TrendingUp,
      trend: { value: 5.7, isPositive: true },
      color: 'blue',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          {greeting}, {userName}
        </h1>
        <p className="mt-1 text-gray-400">
          Aqui está um resumo das suas atividades de hoje
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-6 transition-all hover:border-neutral-700"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <div
                    className={`flex items-center space-x-1 text-sm ${
                      stat.trend.isPositive ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {stat.trend.isPositive ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                    <span>{Math.abs(stat.trend.value)}%</span>
                    <span className="text-gray-500">vs mês passado</span>
                  </div>
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    stat.color === 'cyan'
                      ? 'bg-cyan-600/10 text-cyan-400'
                      : stat.color === 'green'
                        ? 'bg-green-600/10 text-green-400'
                        : stat.color === 'purple'
                          ? 'bg-purple-600/10 text-purple-400'
                          : 'bg-blue-600/10 text-blue-400'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart placeholder */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Atividade Recente
            </h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex h-64 items-center justify-center text-gray-500">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-600" />
              <p className="mt-2 text-sm">Gráfico em breve</p>
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Notificações</h3>
            <span className="rounded-full bg-cyan-600 px-2 py-1 text-xs font-medium text-white">
              3
            </span>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Novo usuário cadastrado', time: '5 min' },
              { title: 'Pagamento recebido', time: '1 hora' },
              { title: 'Relatório disponível', time: '2 horas' },
            ].map((notification, i) => (
              <div
                key={i}
                className="group flex items-start space-x-3 rounded-lg border border-neutral-800 bg-neutral-900 p-4 transition-colors hover:border-neutral-700"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cyan-600/10">
                  <Activity className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    {notification.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Há {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
