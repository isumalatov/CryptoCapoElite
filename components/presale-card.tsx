import "../styles/custom.css";
import Image from "next/image";
import { PresaleData } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

export default function PresaleCard({ presale }: { presale: PresaleData }) {
  const router = useRouter();
  return (
    <div
      className="w-full sm:w-1/3 lg:w-1/4 min-h-[200px] max-h-[210px] bg-gradient-to-r from-slate-700 to-slate-800 flex flex-col items-center justify-center rounded-xl m-2 relative"
      style={{ top: "50px" }}
    >
      <div
        className="absolute bottom-0 left-50% transform -translate-x-50% -translate-y-1/2 w-full h-32 px-4 rounded-xl"
        style={{ width: "calc(100% + 40px)", zIndex: -1, bottom: "100px" }}
      >
        <Image
          src={presale.imageurl}
          alt="line"
          layout="fill"
          objectFit="cover"
          className="rounded-xl border-4 border-gray-500"
        />
      </div>
      <div className="flex flex-col items-center w-full relative">
        <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl w-full text-center text-white m-2 font-bold">
          {presale.title}
        </h1>
        <div className="flex justify-between w-full m-2">
          <div className="flex flex-col items-center ml-4">
            <p className="text-slate-300">Price</p>
            <p className="text-white">{presale.price}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-slate-300">Round</p>
            <p className="text-white">{presale.round}</p>
          </div>
          <div className="flex flex-col items-center mr-4">
            <p className="text-slate-300">Min</p>
            <p className="text-white">{presale.min}</p>
          </div>
        </div>
      </div>

      <button
        className={
          presale.state === "Deal Completado"
            ? "gradient-button-complete custom-button px-20 py-2 text-white rounded-full m-4 relative bg-gradient-to-r"
            : "gradient-button custom-button px-20 py-2 text-white rounded-full m-4 relative bg-gradient-to-r"
        }
        onClick={() => router.push(`/dashboard/${presale.id}`)}
      >
        {presale.state}
      </button>
    </div>
  );
}
