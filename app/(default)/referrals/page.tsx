export const metadata = {
  title: "Referidos",
  description: "Pagina de referidos",
};

import WelcomeBanner from "../welcome-banner";

export default function Referrals() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <WelcomeBanner
        title="Tus Referidos 🚀"
        subtitle="Estos son todos tus referidos:"
      />
    </div>
  );
}
