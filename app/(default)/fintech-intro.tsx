import { getid } from "@/app/actions/auth";
import { userId } from "@/app/lib/definitions";
import { useCallback, useEffect, useState } from "react";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { toast } from "react-toastify";

export default function FintechIntro() {
  const [id, setId] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const { success, message } = await getid();
        if (success) {
          const { id } = message as userId;
          setId(id);
          setLink(`https://crypto-capo-elite.vercel.app/signup/${id}`);
        }
        if (!success) {
          toast.error(message as string);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(link);
    // Aquí puedes mostrar un mensaje de confirmación si lo deseas
  }, [link]);

  return (
    <div className="flex flex-col col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 mb-8">
      <div className="px-5 py-6">
        <div className="md:flex md:justify-between md:items-center">
          {/* Left side */}
          <div className="flex items-center mb-4 md:mb-0">
            {/* User info */}
            <div>
              <div className="mb-2">Este es tu link de referido:</div>
              <button
                className="text-3xl font-bold text-emerald-500 flex justify-center items-center"
                onClick={handleCopy}
                title="Copiar al portapapeles"
              >
                <div className="hidden md:block">{link}</div>
                <div className="md:hidden">Copiar Link:</div>
                <div className="ml-1 mb-[2x]">
                  <ContentPasteIcon />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
