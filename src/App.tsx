import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Settings from './pages/Settings';
import { useRecoilValue } from 'recoil';
import { userState } from './store';
import AppContainer from './components/AppContainer';

export default function App() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  return (
    <NextUIProvider navigate={navigate}>
      <NextThemesProvider
        attribute="class"
        defaultTheme={user.prefersColorScheme}
      >
        <AppContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AppContainer>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
