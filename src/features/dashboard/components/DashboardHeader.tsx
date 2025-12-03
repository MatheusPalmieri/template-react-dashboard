interface DashboardHeaderProps {
  userName?: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? 'Bom dia' : currentHour < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-white">
        {greeting}
        {userName && `, ${userName.split(' ')[0]}`}
      </h1>
      <p className="mt-1 text-gray-400">
        Aqui está um resumo das suas atividades de hoje
      </p>
    </div>
  );
}
