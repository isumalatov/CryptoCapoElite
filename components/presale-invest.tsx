"use client";

import Image from "next/image";
import Prueba from "../public/images/mystiko.png";
import "../styles/custom.css";
import { useState } from "react";
import { PresaleData } from "@/app/lib/definitions";

export default function MenuPreventas({ presale }: { presale: PresaleData }) {
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    const slider = e.currentTarget;
    const rect = slider.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left; // posición del mouse en el slider
    const width = rect.right - rect.left; // ancho del slider
    let newProgress = (x / width) * 100;
    newProgress = Math.max(0, Math.min(newProgress, 100)); // asegurarse de que newProgress está entre 0 y 100
    setProgress(newProgress);
  };

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
          <div className="flex flex-col items-center justify-center mt-6 w-full md:w-2/3 mx-auto px-4 sm:px-0">
            <p className="text-center text-xs sm:text-sm md:text-base mb-4">
              250€
            </p>
            <div
              className="relative h-1 w-full md:w-3/4 bg-gray-200 rounded-full mb-4"
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              onTouchMove={handleMouseMove}
            >
              <div
                className="absolute left-0 top-1/2 transform -translate-y-1/2 h-4 w-4 bg-blue-500 rounded-full pointer"
                style={{ left: `${progress}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
              ></div>
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
