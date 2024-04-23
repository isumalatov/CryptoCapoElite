import WelcomeBannerAdmin from "../welcome-banner-admin";

export default function InvestmentsAdmin() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="mb-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
          Preventas ✨
        </h1>
      </div>
      <WelcomeBannerAdmin
        title="Administración de Preventas"
        subtitle="Gestiona las preventas:"
      />
    </div>
  );
}
