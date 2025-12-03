# Dashboard Feature

Módulo de dashboard seguindo arquitetura feature-based.

## 📁 Estrutura

```
dashboard/
├── components/
│   ├── DashboardHeader.tsx    # Cabeçalho com saudação
│   ├── StatsCard.tsx           # Card de estatísticas
│   └── index.ts
└── index.ts
```

## 🎯 Componentes

### DashboardHeader

Cabeçalho do dashboard com saudação personalizada baseada no horário.

**Props:**

- `userName`: string (opcional) - Nome do usuário

**Funcionalidades:**

- Saudação dinâmica (Bom dia/Boa tarde/Boa noite)
- Exibe primeiro nome do usuário
- Texto com gradiente

### StatsCard

Card para exibir estatísticas com ícone e tendência.

**Props:**

- `title`: string - Título da métrica
- `value`: string | number - Valor da métrica
- `icon`: ReactNode - Ícone SVG
- `trend`: { value: number, isPositive: boolean } (opcional) - Tendência
- `variant`: 'cyan' | 'purple' | 'green' | 'blue' - Cor do tema

**Funcionalidades:**

- Design glassmorphism
- Indicador de tendência (positiva/negativa)
- Variantes de cores
- Ícone customizável

## 🔧 Uso

```tsx
import { DashboardHeader, StatsCard } from '@/features/dashboard';

<DashboardHeader userName="João Silva" />

<StatsCard
  title="Total de Usuários"
  value="2,543"
  icon={<UserIcon />}
  trend={{ value: 12.5, isPositive: true }}
  variant="cyan"
/>
```
