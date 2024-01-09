import { YearRangeSelector } from '../../components/YearRangeSelector';
import { BarSample } from '../../components/DetailPages/CartXY';
import { NavBar } from '../../components/NavBar';

export const TotalEmissionsBySector = () => {
  return (
    <>
      <NavBar
        navigateBackPath="/dashboard"
        navigateBackTitle="Startseite"
        pageTitle="Emissionen nach Sektoren"
      />
      <div className="p-4">
        <p className="text-center my-10">Coming soon</p>
        <BarSample />
      </div>
      <YearRangeSelector />
    </>
  );
};
