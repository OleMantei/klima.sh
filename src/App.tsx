import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ColorSchemeProvider } from './components/App/ColorSchemeProvider';
import { TotalEmissionsBySector } from './pages/DetailPages/TotalEmissionsBySector/TotalEmissionsBySector';

export default function App() {
  const navigate = useNavigate();
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;

  return (
    <NextUIProvider navigate={navigate}>
      <NextThemesProvider attribute="class">
        <ColorSchemeProvider>
          <Routes>
            <Route path="/" element={isPWA ? <Dashboard /> : <Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/dashboard/totalEmissionsBySector"
              element={<TotalEmissionsBySector />}
            />
          </Routes>
        </ColorSchemeProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
