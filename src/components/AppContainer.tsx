import NavBar from './NavBar';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default function AppContainer({ children }: Props) {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="grow">{children}</div>
    </div>
  );
}
