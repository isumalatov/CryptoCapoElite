"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import "../styles/custom.css";
import { createinvestmentuser } from "@/app/actions/investment";
import { PresaleData, InvestmentDataCreateUser } from "@/app/lib/definitions";
import Slider from "@mui/material/Slider";
import { toast } from "react-toastify";

export default function PresaleInfo({ presale }: { presale: PresaleData }) {
  const [step = 1, setStep] = useState<number>(1);
  const [amount, setAmount] = useState<number>(50);
  const [txid, setTxid] = useState("");
  const [wallet, setWallet] = useState("");

  async function handleCreateInvestment() {
    try {
      const investment: InvestmentDataCreateUser = {
        idPresale: presale.id,
        amount: amount,
        txid: txid,
        wallet: wallet,
      };
      const { success, message } = await createinvestmentuser(investment);
      if (success) {
        toast.success(message);
      }
      if (!success) {
        toast.error(message as string);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setAmount(newValue as number);
  };

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(presale.wallet);
    // Aquí puedes mostrar un mensaje de confirmación si lo deseas
  }, [presale.wallet]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full max-w-[96rem] mx-auto">
      {/*H1*/}
      <div>
        <h1 className="font-bold text-3xl ml-2">{presale.title}</h1>
      </div>
      {/*CARD*/}
      <div className="bg-white dark:bg-slate-800 w-full h-full flex flex-row rounded-2xl mt-2">
        {/*IMAGE*/}
        <div className="basis-2/5 p-4 justify-center items-center">
          <Image
            src={presale.imageurl}
            alt="Token Image"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded-xl"
          />
        </div>
        {/*Links*/}
        {(step === 1 || step === 2 || step === 3) && (
          <div className="basis-3/5 flex flex-col">
            <div className="basis-1/5 flex justify-center">
              <div className="border-b-2 border-gray-400 w-4/5 pt-6">
                <ul className="flex justify-start space-x-6">
                  <li className="font-bold text-xs sm:text-base">
                    <button onClick={() => setStep(1)}>Descripción</button>
                  </li>
                  <li className="font-bold text-xs sm:text-base">
                    <button onClick={() => setStep(2)}>Datos del token</button>
                  </li>
                  <li className="font-bold text-xs sm:text-base">
                    <button onClick={() => setStep(3)}>Links</button>
                  </li>
                </ul>
              </div>
            </div>
            {/*CONTENT*/}
            <div className="basis-3/5 flex justify-center items-center">
              {step === 1 && (
                <div className="border-2 border-gray-400 mt-3 mb-3 rounded-xl w-4/5 overflow-y-auto overflow-x-hidden max-h-[160px]">
                  <h2 className="mt-1 ml-2 font-bold text-xs sm:text-base">
                    Informacion sobre el Deal
                  </h2>
                  <div className="w-full grid grid-cols-1">
                    <p className="break-words mt-1 m-2">
                      {presale.description}
                    </p>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="border-2 border-gray-400 mt-3 mb-3 rounded-xl w-4/5 overflow-y-auto overflow-x-hidden max-h-[160px]">
                  <h2 className="mt-1 ml-2 font-bold text-xs sm:text-base">
                    Informacion sobre el Token
                  </h2>
                  <div className="w-full grid grid-cols-2 gap-4 ml-2">
                    <div className="mt-2">
                      <h3 className="text-xs font-bold">Nombre</h3>
                      <p className="text-xs sm:text-sm md:text-base">
                        {presale.name}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold">Round</h3>
                      <p className="text-xs sm:text-sm md:text-base">
                        {presale.round}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold">
                        Precio de la compra del token
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base">
                        {presale.price}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold">Vesting</h3>
                      <p className="mr-4 text-xs sm:text-sm md:text-base break-words">
                        {presale.vesting}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="border-2 border-gray-400 mt-3 mb-3 rounded-xl w-4/5 overflow-y-auto overflow-x-hidden max-h-[160px]">
                  <h2 className="mt-1 ml-2 font-bold">
                    Links oficiales del Proyecto
                  </h2>
                  <div className="flex flex-col rounded-xl p-2 w-auto ">
                    <div className="w-full grid grid-cols-4 gap-y-2">
                      <h3 className="text-xs col-span-1 font-bold">
                        Web Oficial:
                      </h3>
                      <a
                        href={presale.url}
                        className="text-xs text-blue-500 col-span-3 ml-0 ml-[-40px] break-words"
                      >
                        {presale.url}
                      </a>
                      <h3 className="text-xs col-start-1 sm:col-span-1 font-bold">
                        Telegram:
                      </h3>
                      <a
                        href={presale.urltelegram}
                        className="text-xs text-blue-500 col-span-3 ml-0 ml-[-40px] break-words"
                      >
                        {presale.urltelegram}
                      </a>
                      <h3 className="text-xs col-start-1 sm:col-span-1 font-bold">
                        Twitter:
                      </h3>
                      <a
                        href={presale.urltwitter}
                        className="text-xs text-blue-500 col-span-3 ml-0 ml-[-40px] break-words"
                      >
                        {presale.urltwitter}
                      </a>
                      <h3 className="text-xs col-start-1 sm:col-span-1 font-bold">
                        Docs:
                      </h3>
                      <a
                        href={presale.urldocs}
                        className="text-xs text-blue-500 col-span-3 ml-0 ml-[-40px] break-words"
                      >
                        {presale.urldocs}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/*BUTTON*/}
            <div className="basis-1/5 flex justify-center">
              <button
                className={presale.state === "Deal Completado" ? "gradient-button-complete w-4/5 text-xl text-white rounded-full mb-6" : "gradient-button w-4/5 text-xl text-white rounded-full mb-6"}
                onClick={(presale.state === "Participar" ? () => setStep(4) : () => setStep(1))}
              >
                {presale.state}
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="basis-3/5 flex flex-col">
            <div className="basis-1/5 flex justify-center items-center mt-2 w-3/4 mx-auto">
              <button
                className="font-bold text-sm mr-8"
                onClick={() => setStep(4)}
              >
                1 Realizar Inversion
              </button>
              <hr className="border-gray-400 mx-2 flex-grow" />
              <button
                className="font-bold text-sm ml-8"
                onClick={() => setStep(5)}
              >
                2 Aplicar a la Preventa
              </button>
            </div>
            <div className="basis-3/5 flex flex-col justify-center">
              <p className="basis-1/5 font-bold text-center text-sm">
                Realiza la inversión a esta wallet
              </p>
              <button
                className="basis-1/5 font-bold text-center text-2xl"
                onClick={handleCopy}
                title="Copiar al portapapeles"
              >
                {presale.wallet}
              </button>
              <p className="basis-1/5 text-center text-sm font-bold">
                {presale.tokenstandard}
              </p>
              <p className="basis-1/5 text-center text-sm">
                <span className="font-bold">Fees:</span> {presale.fees}%{" "}
              </p>
              <p className="basis-1/5 text-center text-sm">
                <span className="font-bold">Mínimo: </span>
                {presale.min}$ <span className="font-bold">Máximo: </span>
                {presale.max}${" "}
              </p>
            </div>
            <div className="basis-1/5 flex justify-center">
              <button
                className="gradient-button w-4/5 text-xl text-white rounded-full mb-6 "
                onClick={() => setStep(5)}
              >
                Siguiente Paso
              </button>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="basis-3/5 flex flex-col">
            <div className="basis-1/5 flex justify-center items-center mt-2 w-3/4 mx-auto">
              <button
                className="font-bold text-sm mr-8"
                onClick={() => setStep(4)}
              >
                1 Realizar Inversion
              </button>
              <hr className="border-gray-400 mx-2 flex-grow" />
              <button
                className="font-bold text-sm ml-8"
                onClick={() => setStep(5)}
              >
                2 Aplicar a la Preventa
              </button>
            </div>
            <div className="basis-3/5 flex flex-col items-center justify-center w-2/3 mx-auto">
              <p className="text-center text-2xl font-bold">{amount}$</p>
              <Slider
                aria-label="slider"
                value={amount}
                onChange={handleChange}
                step={50}
                min={presale.min}
                max={presale.max}
              />
              <input
                className="text-center text-base mb-4 rounded-full w-full h-9"
                placeholder="Txid/Hash"
                value={txid}
                onChange={(e) => setTxid(e.target.value)}
              />
              <input
                className="text-center text-base mb-4 rounded-full w-full h-9"
                placeholder="Wallet para recibir"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
              />
            </div>
            <div className="basis-1/5 flex justify-center">
              <button
                className="gradient-button w-4/5 text-xl text-white rounded-full mb-6 "
                onClick={handleCreateInvestment}
              >
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
