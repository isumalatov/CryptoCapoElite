import Image from "next/image";
import Prueba from "../public/images/mystiko.png";
import "../styles/custom.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function MenuPreventas() {
  return (
    <div className="relative p-4 sm:p-6 md:p-8 rounded-sm mb-8 sm:ml-[-35px] sm:mr-[-35px]">
      <h1 className="mb-1 text-white text-2xl sm:text-3xl md:text-4xl">
        MYSTIKO | Preventa #1
      </h1>
      <div
        className="bg-white w-full h-[600px] sm:h-auto rounded-lg flex flex-col sm:flex-row md:flex-row items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="w-full sm:w-1/2 md:w-1/2 h-[300px] flex items-center justify-center sm:pt-3 sm:pb-4 sm:pl-4 md:pl-6 pr-3 pl-3">
          <Image
            src={Prueba}
            alt="Mystiko"
            width={600}
            className="rounded-xl"
          />
        </div>
        <div className="w-full md:w-2/3">
          <div className="flex flex-wrap items-center justify-center mt-2 w-full md:w-2/3 mx-4 sm:mx-auto">
            <h2 className="text-xxs sm:text-xs md:text-sm lg:text-base lg:mr-8">
              Título 1
            </h2>
            <hr className="border-gray-400 mx-2 flex-grow" />
            <h2 className="text-xxs sm:text-xs md:text-sm lg:text-base lg:ml-8 mr-8">
              Título 2
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center mt-6 w-full md:w-2/3 mx-auto">
            <p className="text-center text-xs sm:text-sm md:text-base mb-4">
              Realiza la inversión a esta wallet
            </p>
            <p className="text-center text-lg sm:text-xl md:text-2xl mb-4 break-all">
              0xF18598F42927B27f73eb3FBE270A23209023c089
            </p>
            <p className="text-center text-xs sm:text-sm md:text-base mb-4">
              Bep20 - USDT
            </p>
            <p className="text-center text-xs sm:text-sm md:text-base mb-4">
              Fees: 12%
            </p>
            <p className="text-center text-xs sm:text-sm md:text-base mb-4">
              Mínimo: $250 Máximo: $10000{" "}
            </p>
          </div>
          <div className="flex justify-center w-full mt-4">
            <button className="gradient-button custom-button w-auto text-xs sm:text-sm md:text-base py-2 px-4 sm:px-8 md:px-60 text-white rounded-full m-4">
              Participar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
