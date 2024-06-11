//----------------------------------------------
//user
//----------------------------------------------

export interface UserData {
  id: string;
  admin: boolean;
  name: string;
  email: string;
  password: string;
  discord: string;
  telegram: string;
  allowemailprev: boolean;
  allowemailcancel: boolean;
  allowemailnew: boolean;
  referral: { id: string; name: string };
  referralwallet: string;
}

export interface UserDataCreate {
  admin: boolean;
  name: string;
  email: string;
  password: string;
  discord: string;
  telegram: string;
  allowemailprev: boolean;
  allowemailcancel: boolean;
  allowemailnew: boolean;
  idUser: string;
  referralwallet: string;
}

export interface UserDataUpdate {
  admin: boolean;
  name: string;
  email: string;
  discord: string;
  telegram: string;
  allowemailprev: boolean;
  allowemailcancel: boolean;
  allowemailnew: boolean;
  idUser: string;
  referralwallet: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  email: string;
  name: string;
  password: string;
  repeatpassword: string;
  allowemail: boolean;
}

export interface SignUpReferralFormData {
  email: string;
  name: string;
  password: string;
  repeatpassword: string;
  allowemail: boolean;
  idUser: string;
}

export interface ChangePasswordFormData {
  oldpassword: string;
  password: string;
  repeatpassword: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
  telegram: string;
  discord: string;
  referralwallet: string;
}

export interface NotificationFormData {
  allowemailprev: boolean;
  allowemailcancel: boolean;
  allowemailnew: boolean;
}

export interface userAdmin {
  admin: boolean;
}

export interface userId {
  id: string;
}

export interface userName {
  name: string;
}

export interface userReferralWallet {
  referralwallet: string;
}

export interface WelcomeBannerProps {
  title: string;
  subtitle: string;
}

//----------------------------------------------
//notice
//----------------------------------------------

export interface NoticeData {
  id: string;
  title: string;
  content: string;
}

export interface NoticeDataCreate {
  title: string;
  content: string;
}

//----------------------------------------------
//help
//----------------------------------------------

export interface HelpData {
  id: string;
  user: { id: string; name: string };
  help: string;
}

export interface HelpDataCreate {
  help: string;
}

//----------------------------------------------
//presale
//----------------------------------------------

export interface PresaleData {
  id: string;
  title: string;
  name: string;
  description: string;
  wallet: string;
  imagename: string;
  imageurl: string;
  state: string;
  round: string;
  price: number;
  min: number;
  max: number;
  vesting: string;
  tokenstandard: string;
  fees: number;
  url: string;
  urltelegram: string;
  urltwitter: string;
  urldocs: string;
}

export interface PresaleDataCreate {
  title: string;
  name: string;
  description: string;
  wallet: string;
  imagename: string;
  imageurl: string;
  state: string;
  round: string;
  price: number;
  min: number;
  max: number;
  vesting: string;
  tokenstandard: string;
  fees: number;
  url: string;
  urltelegram: string;
  urltwitter: string;
  urldocs: string;
}

//----------------------------------------------
//investment
//----------------------------------------------

export interface InvestmentData {
  id: string;
  user: { id: string; name: string };
  presale: { id: string; name: string };
  amount: number;
  tokens: number;
  txid: string;
  wallet: string;
  state: string;
}

export interface InvestmentDataCreate {
  idUser: string;
  idPresale: string;
  amount: number;
  tokens: number;
  txid: string;
  wallet: string;
  state: string;
}

export interface InvestmentDataCreateUser {
  idPresale: string;
  amount: number;
  txid: string;
  wallet: string;
}

//----------------------------------------------
//referral
//----------------------------------------------

export interface ReferralData {
  id: string;
  user: { id: string; name: string };
  investment : { id: string };
  amount: number;
  wallet: string;
  state: string;
}

export interface ReferralDataCreate {
  idUser: string;
  idInvestment: string;
  amount: number;
  wallet: string;
  state: string;
}
