import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type UserRole = 'cliente' | 'tecnico';

type Session = {
  name: string;
  email: string;
  role: UserRole;
};

type SessionContextValue = {
  session: Session | null;
  signIn: (role: UserRole, email: string, password: string) => boolean;
  signOut: () => void;
};

const demoAccounts = {
  cliente: [
    { email: 'cliente@servispro.com', password: '123456', name: 'Carlos' },
    { email: 'sofia@manocerca.app', password: '123456', name: 'Sofía' },
    { email: 'mateo@manocerca.app', password: '123456', name: 'Mateo' },
  ],
  tecnico: [
    { email: 'tecnico@servispro.com', password: '123456', name: 'Roberto' },
    { email: 'daniela@manocerca.app', password: '123456', name: 'Daniela' },
    { email: 'andres@manocerca.app', password: '123456', name: 'Andrés' },
    { email: 'camila@manocerca.app', password: '123456', name: 'Camila' },
  ],
} as const;

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      signIn: (role, email, password) => {
        const account = demoAccounts[role].find((candidate) => email.trim().toLowerCase() === candidate.email && password === candidate.password);
        if (!account) {
          return false;
        }
        setSession({ name: account.name, email: account.email, role });
        return true;
      },
      signOut: () => setSession(null),
    }),
    [session],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession debe usarse dentro de SessionProvider');
  }
  return context;
}

export const demoCredentials = {
  cliente: demoAccounts.cliente[0],
  tecnico: demoAccounts.tecnico[0],
};

export const demoUsers = demoAccounts;