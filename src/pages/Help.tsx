import { NavBar } from '../components/NavBar';

export const Help = () => {
  const shareDetails = {
    text: 'Möchtest du mehr über die Nachhaltigkeit von SH erfahren? Probiere diese App.',
    url: 'https://klimash.de',
    title: 'Klima.SH',
  };

  return (
    <>
      <NavBar
        navigateBackTitle="Startseite"
        navigateBackPath="/dashboard"
        pageTitle="Hilfe"
        shareDetails={shareDetails}
      />
      <div className="p-4">
        <div>Help coming soon</div>
        <br />
        <div>
          Dies ist ein privates Studierendenprojekt der{' '}
          <a href="https://www.uni-luebeck.de" className="underline">
            Universität zu Lübeck
          </a>
          . Es ist zum jetzigen Zeitpunkt nicht für die Öffentlichkeit bestimmt.
        </div>
      </div>
    </>
  );
};
