"use server";

import dbConnect from "@/app/lib/dbConnect";
import Investment from "@/models/Investment";
import InvestmentCopia from "@/models/InvestmentCopia";
import PresaleCopia from "@/models/PresaleCopia";
import UserCopia from "@/models/UserCopia";
import User from "@/models/User";
import Presale from "@/models/Presale";
import {
  InvestmentData,
  InvestmentDataCreate,
  InvestmentDataCreateUser,
  UserData,
  PresaleData,
  ReferralData,
  ReferralDataCreate,
} from "@/app/lib/definitions";
import { getSession } from "../lib/session";
import { fetchuserid } from "./user";
import { fetchpresaleid } from "./presale";
import {
  createreferral,
  updatereferralinvestmentid,
  deletereferralinvestmentid,
  fetchreferralinvestmentid,
} from "./referral";

export async function fetchpresaleinvestments(id: string) {
  try {
    await dbConnect();
    const investments = await Investment.find({ "presale.id": id });
    if (!investments) {
      return {
        success: false,
        message: "Error al cargar inversiones",
      };
    }
    const investmentsData: InvestmentData[] = investments.map((i) => ({
      id: i._id.toString(),
      user: { id: i.user.id, name: i.user.name },
      presale: { id: i.presale.id, name: i.presale.name },
      amount: i.amount,
      tokens: i.tokens,
      txid: i.txid,
      wallet: i.wallet,
      state: i.state,
    }));
    return { success: true, message: investmentsData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar inversiones" };
  }
}

export async function fetchuserinvestments() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Error al cargar inversiones",
      };
    }
    const investments = await Investment.find({ "user.id": session.userId });
    if (!investments) {
      return {
        success: false,
        message: "Error al cargar inversiones",
      };
    }
    const investmentsData: InvestmentData[] = investments.map((i) => ({
      id: i._id.toString(),
      user: { id: i.user.id, name: i.user.name },
      presale: { id: i.presale.id, name: i.presale.name },
      amount: i.amount,
      tokens: i.tokens,
      txid: i.txid,
      wallet: i.wallet,
      state: i.state,
    }));
    return { success: true, message: investmentsData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar inversiones" };
  }
}

export async function createinvestment(investmentData: InvestmentDataCreate) {
  try {
    await dbConnect();
    const profile = await fetchuserid(investmentData.idUser);
    if (!(profile as { success: boolean; message: UserData }).success)
      return { success: false, message: "Error al crear inversión" };
    const presale = await fetchpresaleid(investmentData.idPresale);
    if (!(presale as { success: boolean; message: PresaleData }).success)
      return { success: false, message: "Error al crear inversión" };
    const investment = new Investment({
      user: {
        id: investmentData.idUser,
        name: (profile as { success: boolean; message: UserData }).message.name,
      },
      presale: {
        id: investmentData.idPresale,
        name: (presale as { success: boolean; message: PresaleData }).message
          .name,
      },
      amount: Number(investmentData.amount.toFixed(2)),
      tokens: Number(investmentData.tokens.toFixed(2)),
      txid: investmentData.txid,
      wallet: investmentData.wallet,
      state: investmentData.state,
    });
    await investment.save();
    if (
      (profile as { success: boolean; message: UserData }).message.referral
        .id != ""
    ) {
      const referralprofile = await fetchuserid(
        (profile as { success: boolean; message: UserData }).message.referral.id
      );
      if (!(referralprofile as { success: boolean; message: UserData }).success)
        return { success: false, message: "Error al crear inversión" };
      const referralData: ReferralDataCreate = {
        idUser: (referralprofile as { success: boolean; message: UserData })
          .message.id,
        idInvestment: investment._id.toString(),
        amount: Number(
          (
            (investment.amount /
              (1 -
                (presale as { success: boolean; message: PresaleData }).message
                  .fees)) *
            0.01
          ).toFixed(2)
        ),
        wallet: (referralprofile as { success: boolean; message: UserData })
          .message.referralwallet,
        state: investmentData.state,
      };
      await createreferral(referralData);
    }
    return { success: true, message: "Inversión creada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al crear inversión" };
  }
}

export async function createinvestmentuser(
  investmentData: InvestmentDataCreateUser
) {
  try {
    await dbConnect();
    const session = await getSession();
    if (
      !investmentData.txid ||
      !investmentData.wallet ||
      investmentData.txid.trim() === "" ||
      investmentData.wallet.trim() === ""
    ) {
      return { success: false, message: "Error al crear inversión" };
    }
    if (!session) {
      return { success: false, message: "Error al crear inversión" };
    }
    const profile = await fetchuserid(session.userId as string);
    if (!(profile as { success: boolean; message: UserData }).success)
      return { success: false, message: "Error al crear inversión" };
    const presale = await fetchpresaleid(investmentData.idPresale);
    if (!(presale as { success: boolean; message: PresaleData }).success)
      return { success: false, message: "Error al crear inversión" };
    if (
      investmentData.amount <
      (presale as { success: boolean; message: PresaleData }).message.min
    ) {
      return { success: false, message: "Error al crear inversión" };
    }
    if (
      investmentData.amount >
      (presale as { success: boolean; message: PresaleData }).message.max
    ) {
      return { success: false, message: "Error al crear inversión" };
    }
    const investment = new Investment({
      user: {
        id: session.userId as string,
        name: (profile as { success: boolean; message: UserData }).message.name,
      },
      presale: {
        id: investmentData.idPresale,
        name: (presale as { success: boolean; message: PresaleData }).message
          .name,
      },
      amount: Number(
        (
          investmentData.amount -
          investmentData.amount *
            ((presale as { success: boolean; message: PresaleData }).message
              .fees /
              100)
        ).toFixed(2)
      ),
      tokens: Number(
        (
          (investmentData.amount -
            investmentData.amount *
              ((presale as { success: boolean; message: PresaleData }).message
                .fees /
                100)) /
          (presale as { success: boolean; message: PresaleData }).message.price
        ).toFixed(2)
      ),
      txid: investmentData.txid,
      wallet: investmentData.wallet,
      state: "Pendiente",
    });
    await investment.save();
    if (
      (profile as { success: boolean; message: UserData }).message.referral
        .id != ""
    ) {
      const referralprofile = await fetchuserid(
        (profile as { success: boolean; message: UserData }).message.referral.id
      );
      if (!(referralprofile as { success: boolean; message: UserData }).success)
        return { success: false, message: "Error al crear inversión" };
      const referralData: ReferralDataCreate = {
        idUser: (referralprofile as { success: boolean; message: UserData })
          .message.id,
        idInvestment: investment._id.toString(),
        amount: Number(
          (
            (investment.amount /
              (1 -
                (presale as { success: boolean; message: PresaleData }).message
                  .fees)) *
            0.01
          ).toFixed(2)
        ),
        wallet: (referralprofile as { success: boolean; message: UserData })
          .message.referralwallet,
        state: "Pendiente",
      };
      await createreferral(referralData);
    }
    return { success: true, message: "Inversión creada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al crear inversión" };
  }
}

export async function deleteinvestment(id: string) {
  try {
    await dbConnect();
    const investment = await Investment.findById({ _id: id });
    if (!investment) {
      return { success: false, message: "Error al eliminar inversión" };
    }
    const profile = await fetchuserid(investment.user.id);
    if (!(profile as { success: boolean; message: UserData }).success)
      return { success: false, message: "Error al eliminar inversión" };
    await Investment.deleteOne({ _id: id });
    if (
      (profile as { success: boolean; message: UserData }).message.referral
        .id != ""
    ) {
      const referral = await fetchreferralinvestmentid(id);
      if (!(referral as { success: boolean; message: ReferralData }).success)
        return { success: false, message: "Error al eliminar inversión" };
      await deletereferralinvestmentid(id);
    }
    return { success: true, message: "Inversión eliminada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al eliminar inversión" };
  }
}

export async function updateinvestment(
  id: string,
  investmentData: InvestmentDataCreate
) {
  try {
    await dbConnect();
    const investment = await Investment.findById({ _id: id });
    if (!investment) {
      return { success: false, message: "Error al actualizar inversión" };
    }
    const profile = await fetchuserid(investmentData.idUser);
    if (!(profile as { success: boolean; message: UserData }).success)
      return { success: false, message: "Error al actualizar inversión" };
    const presale = await fetchpresaleid(investmentData.idPresale);
    if (!(presale as { success: boolean; message: PresaleData }).success)
      return { success: false, message: "Error al actualizar inversión" };
    await Investment.updateOne(
      { _id: id },
      {
        user: {
          id: investmentData.idUser,
          name: (profile as { success: boolean; message: UserData }).message
            .name,
        },
        presale: {
          id: investmentData.idPresale,
          name: (presale as { success: boolean; message: PresaleData }).message
            .name,
        },
        amount: Number(investmentData.amount.toFixed(2)),
        tokens: Number(investmentData.tokens.toFixed(2)),
        txid: investmentData.txid,
        wallet: investmentData.wallet,
        state: investmentData.state,
      }
    );
    if (
      (profile as { success: boolean; message: UserData }).message.referral
        .id != ""
    ) {
      const referralprofile = await fetchuserid(
        (profile as { success: boolean; message: UserData }).message.referral.id
      );
      if (!(referralprofile as { success: boolean; message: UserData }).success)
        return { success: false, message: "Error al actualizar inversión" };
      const referral = await fetchreferralinvestmentid(
        investment._id.toString()
      );
      if (!(referral as { success: boolean; message: ReferralData }).success)
        return { success: false, message: "Error al actualizar inversión" };
      const referralData: ReferralDataCreate = {
        idUser: (referralprofile as { success: boolean; message: UserData })
          .message.id,
        idInvestment: investment._id.toString(),
        amount: Number(
          (
            (investment.amount /
              (1 -
                (presale as { success: boolean; message: PresaleData }).message
                  .fees /
                  100)) *
            0.01
          ).toFixed(2)
        ),
        wallet: (referralprofile as { success: boolean; message: UserData })
          .message.referralwallet,
        state: investmentData.state,
      };
      await updatereferralinvestmentid(investment._id.toString(), referralData);
    }
    return { success: true, message: "Inversión actualizada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al actualizar inversión" };
  }
}

export async function getusertotalamount() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Error al cargar cantidad total",
      };
    }
    const investments = await Investment.find({ "user.id": session.userId });
    if (!investments) {
      return {
        success: false,
        message: "Error al cargar cantidad total",
      };
    }
    const totalAmount = investments.reduce((acc, i) => acc + i.amount, 0);
    return { success: true, message: totalAmount };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar cantidad total" };
  }
}

// export async function createinvestmentsfromcopia(){
//   try {
//     console.log("Creando inversiones");
//     await dbConnect();
//     const investmentscopia = await InvestmentCopia.find({});
//     if (!investmentscopia) {
//       return {
//         success: false,
//         message: "Error al cargar inversiones",
//       };
//     }
//     for (let i = 0; i < investmentscopia.length; i++) {
//       const usercopia = await UserCopia.findOne({ id: investmentscopia[i].user_id });
//       const presalecopia = await PresaleCopia.findOne({ id: investmentscopia[i].project_id });
//       const user = await User.findOne({ email: usercopia.email });
//       if (!user) {
//         console.log(`No se encontró el usuario con el correo electrónico: ${usercopia.email}`);
//         continue; // salta a la siguiente iteración del bucle
//       }

//       const presale = await Presale.findOne({ title: presalecopia.title });
//       if (!presale) {
//         console.log(`No se encontró la pre-venta con el título: ${presalecopia.title}`);
//         continue; // salta a la siguiente iteración del bucle
//       }
//       const investment = new Investment({
//         user: {
//           id: user._id.toString(),
//           name: user.name,
//         },
//         presale: {
//           id: presale._id.toString(),
//           name: presale.title,
//         },
//         amount: investmentscopia[i].amount,
//         tokens: investmentscopia[i].amount / presale.price,
//         txid: investmentscopia[i].transaction_id,
//         wallet: investmentscopia[i].wallet,
//         state: "Pendiente",
//       });
//       await investment.save();
//       console.log(investment);
//       console.log("Inversión creada: " + i);
//     }
//     console.log("Inversiones creadas");
//     return { success: true, message: "Inversiones creadas" };
//   } catch (err) {
//     console.log(err);
//     return { success: false, message: "Error al cargar inversiones" };
//   }
// }
