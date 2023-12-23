import { Image, Button } from '@nextui-org/react';
import { BsDownload } from 'react-icons/bs';
import Logo from '../assets/Logo_Klima.SH.svg';
import DownloadModal from '../components/Home/DownloadModal';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useAddToHomescreenPrompt } from '../scripts/useAddToHomescreenPrompt';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supportsInstallPrompt, setSupportsInstallPrompt] = useState(false);
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();

  const handleDownload = () => {
    if (isMobile) {
      promptToInstall();
      if (prompt) {
        setSupportsInstallPrompt(true);
      }
    }
  };

  return (
    <>
      <DownloadModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        supportsInstallPrompt={supportsInstallPrompt}
      />
      <div className="flex flex-col h-screen w-screen items-center p-4 bg-[url('./assets/nicholas-doherty-pONBhDyOFoM-unsplash-darkened.png')] bg-cover	bg-center">
        <div className="flex-1 flex flex-col justify-center items-center">
          <Image
            isBlurred
            alt="Logo Klima.SH"
            width={75}
            radius="lg"
            src={Logo}
          />
          <div className="flex flex-col mt-5 text-center max-w-lg">
            <h1 className="text-5xl mb-2 text-white">Klima.SH</h1>
            <p className="text-medium text-white/75 mb-5">
              Eine Progressive Web App für das Smartphone zur Visualisierung von
              Haushaltsdaten und Kernindikatoren zum Klimawandel.
            </p>
            <Button
              size="lg"
              color="primary"
              startContent={<BsDownload />}
              onClick={() => {
                setIsModalOpen(true);
                handleDownload();
              }}
            >
              App laden
            </Button>
          </div>
        </div>
        <p className="text-small text-rose-600">
          Dies ist ein privates Studierendenprojekt der{' '}
          <a href="https://www.uni-luebeck.de" className="underline">
            Universität zu Lübeck
          </a>
          . Es ist zum jetzigen Zeitpunkt nicht für die Öffentlichkeit bestimmt.
        </p>
      </div>
    </>
  );
}
