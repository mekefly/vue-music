import { require } from "../utils";

export async function loginByPhone(query: {
  phone: number;
  password?: string;
  countrycode?: number;
  md5_password: string;
  captcha: string;
}) {
  return await require({ url: "/login/cellphone", query });
}
