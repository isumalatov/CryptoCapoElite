import { getid } from "@/app/actions/auth";
import { getreferralwallet } from "@/app/actions/account";
import { userId, userReferralWallet } from "@/app/lib/definitions";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { toast } from "react-toastify";

export default function FintechIntro() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [link, setLink] = useState("");
  const [referralwallet, setReferralWallet] = useState("");

  useEffect(() => {
    async function fetchDataId() {
      try {
        const { success, message } = await getid();
        if (success) {
          const { id } = message as userId;
          setId(id);
          setLink(`https://cryptocapoelite.com/signup/${id}`);
        }
        if (!success) {
          toast.error(message as string);
        }
      } catch (err) {
        console.error(err);
      }
    }
    
    async function fetchDataReferralWallet() {
      try {
        const { success, message } = await getreferralwallet();
        if (success) {
          const { referralwallet } = message as userReferralWallet;
          setReferralWallet(referralwallet);
        }
        if (!success) {
          toast.error(message as string);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchDataId();
    fetchDataReferralWallet();
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
            {!referralwallet || referralwallet.trim() === "" ? (
              <div>
                <div className="mb-2">
                  Para obtener el link, debes de establecer una billetera de
                  referidos en Ajustes:
                </div>
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => router.push("/settings/account")}
                >
                  Ir a Ajustes
                </button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
