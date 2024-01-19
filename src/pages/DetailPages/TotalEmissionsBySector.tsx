import { YearRangeSelector } from '../../components/YearRangeSelector';
// import { BarChart } from '../../components/DetailPages/BarChart';
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
        {/* <BarChart /> */}
      </div>
      <YearRangeSelector />
    </>
  );
};
