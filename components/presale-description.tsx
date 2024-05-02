import Image from "next/image";
import Prueba from "../public/images/mystiko.png";
import "../styles/custom.css";

export default function PresaleDescription() {
    return (
        <div className="relative p-4 sm:p-6 md:p-8 rounded-sm mb-8 ">
            <h1 className="mb-1 text-white text-2xl sm:text-3xl md:text-4xl">
                MYSTIKO | Preventa #1
            </h1>
            <div className="bg-white w-full min-h-30 rounded-lg flex flex-col sm:flex-row md:flex-row items-center">
                <div className="w-full sm:w-1/3 md:w-1/3 flex items-center justify-center sm:pb-4 sm:pl-4 md:pl-6 pt-3 pr-3 pl-3">
                    <Image src={Prueba} alt="Mystiko" className="rounded-xl " />
                </div>
                <div className="w-full sm:w-2/3 md:w-2/3">
                    <div className="w-11/12 ml-5 sm:ml-8 md:ml-12 py-2 pr-4 flex flex-col items-center justify-center sm:items-start sm:justify-start">
                        {/* Start */}
                        <div className="relative mb-8 w-full flex justify-center sm:block">
                            <div
                                className="absolute bottom-0 w-full h-px bg-slate-200 dark:bg-slate-700"
                                aria-hidden="true"
                            ></div>
                            <ul className="relative text-sm font-medium flex justify-center sm:justify-start md:justify-start flex-nowrap overflow-x-scroll no-scrollbar">
                                <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                                    <div className="border-b-2 border-transparent hover:border-indigo-500">
                                        <a
                                            className="block pb-3 text-slate-500 dark:text-slate-400 hover:text-indigo-500 whitespace-nowrap"
                                            href="#0"
                                        >
                                            Descripción
                                        </a>
                                    </div>
                                </li>
                                <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                                    <div className="border-b-2 border-transparent hover:border-indigo-500">
                                        <a
                                            className="block pb-3 text-slate-500 dark:text-slate-400 hover:text-indigo-500 whitespace-nowrap"
                                            href="#0"
                                        >
                                            Datos del Token
                                        </a>
                                    </div>
                                </li>
                                <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                                    <div className="border-b-2 border-transparent hover:border-indigo-500">
                                        <a
                                            className="block pb-3 text-slate-500 dark:text-slate-400 hover:text-indigo-500 whitespace-nowrap"
                                            href="#0"
                                        >
                                            Integrations
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center sm:items-start md:items-start border border-gray-800 rounded-xl p-4 w-full sm:w-auto md:w-auto">
                            <h1 className="text-sm sm:text-base md:text-lg font-bold text-slate-900"></h1>
                            <p className="text-xs sm:text-sm md:text-base">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id at
                                vero modi iure vitae delectus recusandae animi quasi similique
                                mollitia, optio repudiandae. Expedita ut deleniti reprehenderit
                                dolore consectetur nemo eius?
                            </p>
                        </div>
                        <div className="flex justify-center w-full mt-4">
                            <button className="gradient-button custom-button w-auto text-xs sm:text-sm md:text-base py-2 px-60 text-white rounded-full m-4">
                                Participar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}