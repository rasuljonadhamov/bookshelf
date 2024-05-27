import md5 from "md5";

export const generateAuthHeaders = (
  method: string,
  url: string,
  body: any,
  userKey: string,
  userSecret: string
) => {
  const bodyString = body ? JSON.stringify(body) : "";
  const signString = `${method}${url}${bodyString}${userSecret}`;
  const sign = md5(signString);

  return {
    Key: userKey,
    Sign: sign,
  };
};
