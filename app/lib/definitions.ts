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

export interface ChangePasswordFormData {
  oldpassword: string;
  password: string;
  repeatpassword: string;
}
