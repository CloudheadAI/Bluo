import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, AuthState, SubscriptionTier } from '../types';
import { loginUser, registerUser, resetPassword } from '../services/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  updateSubscription: (tier: SubscriptionTier) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const user = await loginUser(email, password);
      setState({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (err) {
      setState((s) => ({
        ...s,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Login failed',
      }));
    }
  }, []);

  const register = useCallback(async (username: string, email: string, password: string) => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const user = await registerUser(username, email, password);
      setState({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (err) {
      setState((s) => ({
        ...s,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Registration failed',
      }));
    }
  }, []);

  const logout = useCallback(() => {
    setState({ user: null, isAuthenticated: false, isLoading: false, error: null });
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      await resetPassword(email);
      setState((s) => ({ ...s, isLoading: false }));
    } catch (err) {
      setState((s) => ({
        ...s,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Password reset failed',
      }));
    }
  }, []);

  const updateSubscription = useCallback((tier: SubscriptionTier) => {
    setState((s) => {
      if (!s.user) return s;
      return { ...s, user: { ...s.user, subscriptionTier: tier } as User };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, requestPasswordReset, updateSubscription }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
