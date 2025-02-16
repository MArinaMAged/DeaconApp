import { useContext } from 'react';

import { AuthContext } from '@/hooks/AuthContext/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a ThemeProvider');
  }

  return context;
};

export default useAuth;
