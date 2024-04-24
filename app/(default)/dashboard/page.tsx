export const metadata = {
  title: "Preventas",
  description: "Pagina de preventas",
};

import WelcomeBanner from "../welcome-banner";

export default function Dashboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <WelcomeBanner
        title="¡Bienvenido a CryptoCapoElite! 👋"
        subtitle="Estas son todas las preventas disponibles:"
      />
    </div>
  );
}
