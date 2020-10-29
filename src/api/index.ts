import Axios, { AxiosRequestConfig } from 'axios';
const baseUrl = 'https://api.baseplate.appetiserdev.tech/api/v1/auth';

interface IUser {
  id: number;
  full_name: string;
  description: string | null;
  birthdate: Date | null;
  gender: string | null;
  email: string;
  phone_number: number;
  created_at: Date;
  updated_at: Date;
  email_verified: boolean;
  phone_number_verified: boolean;
  verified: boolean;
  avatar_permanent_url: string;
  avatar_permanent_thumb_url: string;
  mine: boolean
  avatar: null;
}

interface IData {
  access_token: string;
  token_type: string;
  expires_in: string;
  user: IUser;
}

interface IStorageData {
  access_token: string;
  email: string;
}

interface IUserResponse {
  data: IData;
  http_status: number;
  success: boolean;
  test: string;
}

export interface IErrorLoginResponse {
  message: string;
  errors: Object;
  http_status: number;
  success: boolean;
  error_code: string;
  test: string;
}

interface IVerifyTokenResponse {
  data: {
    username: string;
  };
  http_status: number;
  success: boolean;
}

export const onLogin = async (username: string, password: string): Promise<IUserResponse | IErrorLoginResponse> => {
  const requestConfig: AxiosRequestConfig = {
    method: 'POST',
    url: `${baseUrl}/login`,
    data: {username, password}
  };
  try {
    const { data } = await Axios.request(requestConfig);
    const response: IUserResponse = data;

    processData(response);

    return response;

  } catch (error) {
    const { data } = error.response;
    return data;
  }
}

export const onLogout = (): void => {
  const requestConfig: AxiosRequestConfig = {
    method: 'POST',
    url: `${baseUrl}/logout`
  };
  Axios.request(requestConfig);
  removeStorageData();
}

export const onSignUp = async (email: string, full_name: string, password: string, password_confirmation: string ): Promise<IUserResponse | IErrorLoginResponse> => {
  const requestConfig: AxiosRequestConfig = {
    method: 'POST',
    url: `${baseUrl}/register`,
    data: {email, full_name, password, password_confirmation}
  };
  try {
    const { data } = await Axios.request(requestConfig);
    const response: IUserResponse = data;

    processData(response);

    return response;

  } catch (error) {
    const { data } = error.response;
    return data;
  }
}

export const onVerify = async (token: string, email: string) => {
  const storageData = localStorage.getItem('appetiser');

  if (storageData === null) {
    return false;
  }

  const { access_token }: IStorageData = JSON.parse(storageData);

  const requestConfig: AxiosRequestConfig = {
    method: 'POST',
    url: `${baseUrl}/verification/verify`,
    headers: {
      Authorization: access_token,
    },
    data: {token, via: email}
  };
  try {
    const { data } = await Axios.request(requestConfig);
    const response: IUserResponse = data;

    processData(response);

    return response;

  } catch (error) {
    const { data } = error.response;
    return data;
  }
}

export const verifyToken = async (): Promise<boolean> => {
  const storageData = localStorage.getItem('appetiser');

  if (storageData === null) {
    return false;
  }

  const { access_token, email }: IStorageData = JSON.parse(storageData);

  const requestConfig: AxiosRequestConfig = {
    method: 'POST',
    url: `${baseUrl}/check-username`,
    headers: {
      Authorization: access_token,
    },
    data: {
      username: email,
    }
  };

  try {
    const { data } = await Axios.request(requestConfig);
    const response: IVerifyTokenResponse = data;
    const { username } = response.data;
    return username === email;
  } catch {
    removeStorageData();
    return false;
  }
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('appetiser');
}

export const onResendVerification = async (email: string) => {
  const storageData = localStorage.getItem('appetiser');

  if (storageData === null) {
    return false;
  }

  const { access_token }: IStorageData = JSON.parse(storageData);

  const requestConfig: AxiosRequestConfig = {
    method: 'POST',
    url: `${baseUrl}/verification/resend`,
    headers: {
      Authorization: access_token,
    },
    data: {
      via: email
    }
  };
  try {
    const { data } = await Axios.request(requestConfig);
    const response: IUserResponse = data;

    console.log(response);

    return response;

  } catch (error) {
    const { data } = error.response;
    console.log(data);
    return data;
  }
}

const removeStorageData = (): void => {
  localStorage.removeItem('appetiser');
}

const processData = (response: IUserResponse): void => {
  const { access_token, user } = response.data;
  const jsonData = JSON.stringify({access_token, email: user.email})

  if (response.http_status === 200) {
    localStorage.setItem('appetiser', jsonData);
  }
}
