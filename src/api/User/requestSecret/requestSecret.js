import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        await sendSecretMail(email, loginSecret);
        console.log(email, loginSecret);
        console.log("1");
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        console.log("2");
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
