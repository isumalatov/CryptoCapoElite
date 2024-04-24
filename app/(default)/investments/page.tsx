export const metadata = {
  title: "Mis Inversiones",
  description: "Pagina de mis inversiones",
};

import WelcomeBanner from "../welcome-banner";

export default function Investments() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <WelcomeBanner
        title="Tus Inversiones 💸"
        subtitle="Estas son todas tus inversiones:"
      />
    </div>
  );
}
