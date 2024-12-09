export interface TextFieldProps {
  name: string;
  label: string;
  subtype?: string;
  required?: boolean;
  register?: any;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface BlogCreateFormProps {
  title: string;
  description: string;
  image?: string | File | null;
  _id?:string;
}

export interface ProfileFormData {
  name: string;
  profileImage?: string ;
}