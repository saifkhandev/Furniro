import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      // Set user after login/register
      setAuth: (user, accessToken, refreshToken) => {
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      },

      // Update access token after refresh
      setAccessToken: (accessToken) => {
        set({ accessToken });
        localStorage.setItem('accessToken', accessToken);
      },

      // Update user data
      setUser: (user) => {
        set({ user });
      },

      // Logout
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      },

      // Check if user is admin
      isAdmin: () => {
        const user = get().user;
        return user?.role === 'admin';
      },
    }),
    {
      name: 'grove-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
