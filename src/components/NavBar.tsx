import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <Navbar position="static" className="border-b-1">
      <NavbarBrand>
        <Link href="#" onClick={() => navigate('/')} color="foreground">
          <p className="font-bold text-inherit">Klima.SH</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="primary"
            variant="flat"
            onClick={() => navigate('/settings')}
          >
            Settings
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
