import { Navbar, NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { GoShare } from 'react-icons/go';
import { RWebShare } from 'react-web-share';
import { useEffect, useState } from 'react';

type ShareDetails = {
  text: string;
  url: string;
  title: string;
};

type Props = {
  navigateBackTitle: string;
  navigateBackPath: string;
  pageTitle?: string;
  shareDetails?: ShareDetails;
};

export const NavBar = ({
  navigateBackTitle,
  navigateBackPath,
  pageTitle,
  shareDetails,
}: Props) => {
  const navigate = useNavigate();
  const [shareLoaded, setShareLoaded] = useState(false);

  useEffect(() => {
    setTimeout(function () {
      // fix unwanted sharing click
      setShareLoaded(true);
    }, 0);
  }, []);

  return (
    <Navbar isBordered maxWidth="full">
      <NavbarContent className="-mx-6">
        <NavbarItem>
          <Button
            color="primary"
            variant="light"
            startContent={<BsChevronLeft />}
            disableRipple={true}
            disableAnimation={true}
            style={{ backgroundColor: 'transparent' }}
            onPress={() => navigate(navigateBackPath)}
          >
            {navigateBackTitle}
          </Button>
        </NavbarItem>
        <NavbarItem>{pageTitle}</NavbarItem>
      </NavbarContent>
      {shareDetails && shareLoaded && (
        <NavbarContent justify="end" className="-mx-2">
          <RWebShare
            data={shareDetails}
            closeText="Schließen"
            sites={['whatsapp', 'telegram', 'mail', 'copy']}
          >
            <Button isIconOnly color="primary" variant="solid">
              <GoShare />
            </Button>
          </RWebShare>
        </NavbarContent>
      )}
    </Navbar>
  );
};
