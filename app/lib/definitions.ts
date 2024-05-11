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

export interface ProfileFormData {
  name: string;
  email: string;
  telegram: string;
  discord: string;
}

export interface ChangePasswordFormData {
  oldpassword: string;
  password: string;
  repeatpassword: string;
}

export interface NotificationFormData {
  allowemailprev: boolean;
  allowemailcancel: boolean;
  allowemailnew: boolean;
}

export interface isAdministrator {
  admin: boolean;
}

export interface userName {
  name: string;
}

export interface WelcomeBannerProps {
  title: string;
  subtitle: string;
}

export interface NoticeDataTable {
  id: string;
  title: string;
  content: string;
}

export interface NoticeData {
  title: string;
  content: string;
}

export interface HelpFormData {
  help: string;
}

export interface HelpDataTable {
  id: string;
  user: { id: string; name: string };
  help: string;
}

export interface HelpData {
  user: { id: string; name: string };
  help: string;
}

export interface PresaleDataTable {
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

export interface PresaleData {
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

export interface UserDataTable {
  id: string;
  admin: boolean;
  name: string;
  email: string;
  discord: string;
  telegram: string;
  allowemailprev: boolean;
  allowemailcancel: boolean;
  allowemailnew: boolean;
}

export interface UserData {
  admin: boolean;
  name: string;
  email: string;
  password: string;
  discord: string;
  telegram: string;
  allowemailprev: boolean;
  allowemailcancel: boolean;
  allowemailnew: boolean;
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
}

export interface InvestmentDataTable {
  id: string;
  user: { id: string; name: string };
  presale: { id: string; name: string };
  amount: number;
  tokens: number;
  txid: string;
  wallet: string;
  state: string;
}

export interface InvestmentData {
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
