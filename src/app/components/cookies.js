import { cookies } from "next/headers";
const getCookies = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token;
};

export default getCookies;
