# Shared Feature

Componentes compartilhados entre múltiplas features.

## 📁 Estrutura

```
shared/
├── components/
│   ├── ModernSidebar.tsx      # Sidebar moderna e responsiva
│   └── index.ts
└── index.ts
```

## 🎯 Componentes

### ModernSidebar

Sidebar moderna com navegação, perfil do usuário e logout.

**Props:**

- `user`: User - Objeto do usuário do Supabase
- `onProfileClick`: () => void - Callback ao clicar no perfil

**Funcionalidades:**

- Navegação com indicador de página ativa
- Colapsável (expandir/retrair)
- Seção de perfil com avatar
- Botão de logout
- Design glassmorphism
- Gradientes animados
- Responsivo

**Navegação:**

- Dashboard (padrão)
- Extensível para novas rotas

## 🔧 Uso

```tsx
import { ModernSidebar } from '@/features/shared';
import { useAuth } from '@/hooks/useAuth';

function PrivateLayout() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen">
      <ModernSidebar user={user} onProfileClick={() => console.log('Profile clicked')} />
      <main className="flex-1">{/* Content */}</main>
    </div>
  );
}
```

## 🎨 Customização

Para adicionar novos itens de menu, edite o array `menuItems` em `ModernSidebar.tsx`:

```tsx
const menuItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    name: 'Usuários',
    path: '/users',
    icon: <UsersIcon />,
  },
  // Adicione mais itens aqui
];
```
