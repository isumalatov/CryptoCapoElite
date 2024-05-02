import Image from "next/image";
import Prueba from "../public/images/mystiko.png";
import "../styles/custom.css";

export default function PresaleInvest() {
    return (
        <div className="relative p-4 sm:p-6 md:p-8 rounded-sm mb-8 ">
            <h1 className="mb-1 text-white text-2xl sm:text-3xl md:text-4xl">
                MYSTIKO | Preventa #1
            </h1>
            <div className="bg-white w-full min-h-60 rounded-lg flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/3 flex items-center justify-center sm:pb-4 sm:pl-4 md:pl-6 pt-3 pr-3 pl-3">
                    <Image src={Prueba} alt="Mystiko" className="rounded-xl " />
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
                    <div className="flex flex-col items-center justify-center mt-6 w-full md:w-2/3 mx-auto px-4 sm:px-0">
                        <p className="text-center text-xs sm:text-sm md:text-base mb-4">
                            250€
                        </p>
                        <div className="relative h-1 w-full md:w-3/4 bg-gray-200 rounded-full mb-4">
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-4 w-4 bg-blue-500 rounded-full"></div>
                        </div>
                        <input
                            className="text-center text-xs sm:text-sm md:text-base mb-4 rounded-full w-full md:w-2/3"
                            placeholder="Bep20 - USDT"
                        />
                        <input
                            className="text-center text-xs sm:text-sm md:text-base mb-4 rounded-full w-full"
                            placeholder="Txid/Hash"
                        />
                        <input
                            className="text-center text-xs sm:text-sm md:text-base mb-4 rounded-full w-full"
                            placeholder="Wallet para recibir"
                        />
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