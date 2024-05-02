import PresaleData from "@/components/presale-data";
import PresaleDescription from "@/components/presale-description";
import PresaleLinks from "@/components/presale-links";
import PresaleInvest from "@/components/presale-invest";

export default function Presale() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <h1>Presale</h1>
      <PresaleData />
      <PresaleDescription />
      <PresaleLinks />
      <PresaleInvest />
    </div>
  );
}
