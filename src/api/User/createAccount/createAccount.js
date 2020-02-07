import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, bio = "" } = args;
      const uesr = await prisma.createUser({
        username,
        email,
        bio
      });
      return uesr;
    }
  }
};
