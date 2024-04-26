import "../styles/custom.css";
import Image from "next/image";
import { PresaleDataTable } from "@/app/lib/definitions";
import { useRouter } from 'next/navigation'

export default function PresaleCard({
  presale,
}: {
  presale: PresaleDataTable;
}) {
  const router = useRouter()
  return (
    <div
      className="w-full sm:w-1/3 lg:w-1/4 bg-gradient-to-r from-slate-700 to-slate-800 flex flex-col items-center justify-center rounded-xl m-2 relative"
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
        <h1 className="text-custom w-full text-center text-white m-2 font-bold">
          {presale.title}
        </h1>
        <div className="flex justify-between w-full m-2">
          <div className="flex flex-col items-center ml-4">
            <h3>Precio</h3>
            <p className="text-white">{presale.price}</p>
          </div>
          <div className="flex flex-col items-center">
            <h3>Ronda</h3>
            <p className="text-white">{presale.round}</p>
          </div>
          <div className="flex flex-col items-center mr-4">
            <h3>Minimo</h3>
            <p className="text-white">{presale.min}</p>
          </div>
        </div>
      </div>
      <button className="gradient-button custom-button px-20 py-2 bg-green-500 text-white rounded-full m-4 relative bg-gradient-to-r from-green-400 to-green-500" onClick={() => router.push(`/dashboard/${presale.id}`)}>
        {presale.state}
      </button>
    </div>
  );
}
