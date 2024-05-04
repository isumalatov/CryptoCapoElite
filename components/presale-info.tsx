"use client";

import Image from "next/image";
import "../styles/custom.css";
import { PresaleData } from "@/app/lib/definitions";
import { useState } from "react";

export default function PresaleInfo({ presale }: { presale: PresaleData }) {
  const [step = 1, setStep] = useState<number>(1);
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/*H1*/}
      <div>
        <h1>{presale.title}</h1>
      </div>
      {/*CARD*/}
      <div className="bg-white dark:bg-slate-800 w-full h-full flex flex-row">
        {/*IMAGE*/}
        <div className="basis-2/5">
          <Image
            src={presale.imageurl}
            alt="Mystiko"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded-xl"
          />
        </div>
        {/*INFO*/}
        <div className="basis-3/5 flex flex-col">
          {/*NAV*/}
          <div className="basis-1/5"></div>
          {/*CONTENT*/}
          <div className="basis-3/5">
            {step === 1 && (
              <div>
                <h2>{presale.title}</h2>
                <p>{presale.description}</p>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2>{presale.title}</h2>
                <p>{presale.description}</p>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2>{presale.title}</h2>
                <p>{presale.description}</p>
              </div>
            )}
          </div>
          {/*BUTTON*/}
          <div className="basis-1/5 flex justify-center">
            <button className="gradient-button w-4/5 text-xs text-white rounded-full">
              Participar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
