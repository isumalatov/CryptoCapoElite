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

export interface HelpFormData {
  help: string;
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

export interface HelpDataTable {
  id: string;
  user: string;
  help: string;
}

export interface HelpData {
  user: string;
  help: string;
}

export interface PresaleDataTable {
  id: string;
  title: string;
  description: string;
  wallet: string;
  imagename: string;
  imageurl: string;
  state: string;
  round: string;
  price: string;
  min: string;
  max: string;
  vesting: string;
  url: string;
  urltelegram: string;
  urltwitter: string;
  urldocs: string;
}

export interface PresaleData {
  title: string;
  description: string;
  wallet: string;
  imagename: string;
  imageurl: string;
  state: string;
  round: string;
  price: string;
  min: string;
  max: string;
  vesting: string;
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
  user: string;
  presale: string;
  amount: string;
  txid: string;
  wallet: string;
  state: string;
}

export interface InvestmentData {
  user: string;
  presale: string;
  amount: string;
  txid: string;
  wallet: string;
  state: string;
}
