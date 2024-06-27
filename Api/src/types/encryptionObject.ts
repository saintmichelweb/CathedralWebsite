import { readEnv } from "../setup/readEnv";

export const EncryptionTransformerObject = {
  key: readEnv("KEY", "") as string,
  algorithm: readEnv("ALGORITHM", "") as string,
  ivLength: readEnv("IVLENGTH", "", true) as number,
  iv: readEnv("IV", "") as string,
};
