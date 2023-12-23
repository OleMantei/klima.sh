import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { isChrome, isIOS, isMobileSafari, isMobile } from 'react-device-detect';
import { GoShare } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router';

interface Props {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
  supportsInstallPrompt: boolean;
}

export default function DownloadModal({
  isOpen,
  setIsOpen,
  supportsInstallPrompt,
}: Props) {
  const navigate = useNavigate();

  const getPWAInstructionsMobile = () => {
    const content = [];
    if (isIOS) {
      content.push(
        'Tippe in der Adressleiste auf „Teilen” (Rechteck mit Pfeil) und dann auf „Zum Home-Bildschirm hinzufügen”.',
      );
      if (!isMobileSafari && !isChrome) {
        content.push(
          'Solltest du Probleme haben, dann probiere es noch einmal im Browser Safari.',
        );
      }
    }
    if (!isIOS) {
      content.push(
        'Tippe in der Adressleiste auf „Menü” (drei Punkte) und dann auf „Zum Startbildschirm hinzufügen”.',
      );
      if (!isChrome) {
        content.push(
          'Solltest du Probleme haben, dann probiere es noch einmal im Browser Chrome.',
        );
      }
    }
    if (!supportsInstallPrompt) {
      content.push(
        `Öffne die App anschließend auf deinem ${
          isIOS ? 'Home-Bildschirm' : 'Startbildschirm'
        }.`,
      );
    }
    return content;
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">App laden</ModalHeader>
            <ModalBody>
              {isMobile ? (
                <>
                  {supportsInstallPrompt && (
                    <>
                      <p className="mb-5">
                        {`Du wirst gleich aufgefordert, die App zu installieren.
                    Bestätige die Anfrage und öffne die App auf deinem
                    ${isIOS ? 'Home-Bildschirm' : 'Startbildschirm'}.`}
                      </p>
                      <p className="text-small text-default-500">
                        Nicht geklappt?
                      </p>
                    </>
                  )}
                  <Avatar
                    showFallback
                    fallback={
                      isIOS ? (
                        <GoShare
                          className="w-6 h-6"
                          fill="currentColor"
                          size={20}
                        />
                      ) : (
                        <BsThreeDotsVertical
                          className="w-6 h-6"
                          fill="currentColor"
                          size={20}
                        />
                      )
                    }
                  />
                  {getPWAInstructionsMobile().map((paragraph, index) => (
                    <p key={index}>
                      <span className="font-bold">{index + 1}.</span>{' '}
                      {paragraph}
                    </p>
                  ))}
                </>
              ) : (
                <div>
                  <p className="mb-5">
                    Die Anwendung ist für das Smartphone entwickelt. Öffne diese
                    dort für die beste Nutzungserfahrung.
                  </p>
                  <div className="flex flex-col">
                    <QRCodeSVG
                      className="self-center mb-1 p-2 bg-white"
                      value={String(window.location)}
                    />
                    <a className="self-center" href={String(window.location)}>
                      {String(window.location)}
                    </a>
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                className="text-default-500"
                variant="light"
                onPress={() => navigate('/dashboard')}
              >
                zum Dashboard
              </Button>
              <Button color="primary" onPress={onClose}>
                schließen
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
