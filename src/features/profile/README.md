# Profile Feature

Módulo de perfil de usuário seguindo arquitetura feature-based.

## 📁 Estrutura

```
profile/
├── components/
│   ├── ProfileModal.tsx        # Modal de visualização do perfil
│   ├── EditProfileModal.tsx    # Modal de edição do perfil
│   └── index.ts
├── hooks/
│   ├── useProfile.ts           # Hook para gerenciar modais
│   └── index.ts
└── index.ts
```

## 🎯 Componentes

### ProfileModal

Modal para visualizar informações do perfil do usuário.

**Props:**

- `user`: User - Objeto do usuário do Supabase
- `isOpen`: boolean - Estado de abertura do modal
- `onClose`: () => void - Callback para fechar
- `onEditClick`: () => void - Callback para abrir edição

**Funcionalidades:**

- Exibe avatar, nome e email
- Mostra data de cadastro
- Status ativo com indicador
- Botão para editar perfil
- Design glassmorphism

### EditProfileModal

Modal para editar informações do perfil.

**Props:**

- `user`: User - Objeto do usuário do Supabase
- `isOpen`: boolean - Estado de abertura do modal
- `onClose`: () => void - Callback para fechar
- `onSuccess`: () => void - Callback após sucesso

**Funcionalidades:**

- Edição do nome
- Email desabilitado (não editável)
- Validação de formulário
- Loading state
- Tratamento de erros
- Integração com Supabase

## 🪝 Hooks

### useProfile

Hook para gerenciar o estado dos modais de perfil.

**Retorno:**

- `isProfileOpen`: boolean - Modal de perfil aberto
- `isEditOpen`: boolean - Modal de edição aberto
- `openProfile`: () => void - Abre modal de perfil
- `closeProfile`: () => void - Fecha modal de perfil
- `openEdit`: () => void - Abre modal de edição
- `closeEdit`: () => void - Fecha modal de edição
- `handleEditSuccess`: () => void - Handler após sucesso na edição

## 🔧 Uso

```tsx
import { EditProfileModal, ProfileModal, useProfile } from '@/features/profile';
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user } = useAuth();
  const {
    isProfileOpen,
    isEditOpen,
    openProfile,
    closeProfile,
    openEdit,
    closeEdit,
    handleEditSuccess,
  } = useProfile();

  return (
    <>
      <button onClick={openProfile}>Ver Perfil</button>

      <ProfileModal
        user={user}
        isOpen={isProfileOpen}
        onClose={closeProfile}
        onEditClick={openEdit}
      />

      <EditProfileModal
        user={user}
        isOpen={isEditOpen}
        onClose={closeEdit}
        onSuccess={handleEditSuccess}
      />
    </>
  );
}
```
