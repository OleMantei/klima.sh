import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";
import Logo from "../../public/Logo_Klima.SH.svg";

export default function IntroductionCard() {
  return (
    <div className="flex h-screen	w-screen justify-center items-center p-4">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="Logo Klima.SH"
            height={40}
            radius="sm"
            src={Logo}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">Klima.SH</p>
            <p className="text-small text-default-500">klimash.de</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-rose-600 text-small mb-1">
            Dies ist ein privates Studierendenprojekt der{" "}
            <a href="https://www.uni-luebeck.de" className="underline">
              Universität zu Lübeck
            </a>
            . Es ist zum jetzigen Zeitpunkt nicht für die Öffentlichkeit
            bestimmt.
          </p>
          <p>
            Eine Progressive Web App zur Visualisierung von Haushaltsdaten und
            Kernindikatoren zum Klimawandel (Schleswig-Holstein).
          </p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/OleMantei/klima.sh"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
