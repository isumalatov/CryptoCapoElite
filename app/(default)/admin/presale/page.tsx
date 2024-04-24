import WelcomeBanner from "../../welcome-banner";

export default function InvestmentsAdmin() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <WelcomeBanner
        title="Administración de Preventas"
        subtitle="Gestiona las preventas:"
      />
    </div>
  );
}
