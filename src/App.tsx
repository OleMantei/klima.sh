import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ColorSchemeProvider } from './components/App/ColorSchemeProvider';
import { TotalEmissionsBySector } from './pages/DetailPages/TotalEmissionsBySector';
import { Help } from './pages/Help';
import { DesktopAppContainer } from './components/DesktopAppContainer';

export default function App() {
  const navigate = useNavigate();
  const isPWA = window.matchMedia('(display-mode: fullscreen)').matches;

  return (
    <NextUIProvider navigate={navigate}>
      <NextThemesProvider attribute="class">
        <ColorSchemeProvider>
          <DesktopAppContainer>
            <Routes>
              // prevent visual redirect by conditionally rendering element
              <Route path="/" element={isPWA ? <Dashboard /> : <Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/dashboard/totalEmissionsBySector"
                element={<TotalEmissionsBySector />}
              />
              <Route path="/help" element={<Help />} />
            </Routes>
          </DesktopAppContainer>
        </ColorSchemeProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
