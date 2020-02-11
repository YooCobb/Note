import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    upload: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { caption, words, location } = args;
      const post = await prisma.createPost({
        caption,
        location,
        user: { connect: { id: user.id } }
      });
      words.forEach(
        async word =>
          await prisma.createFile({
            url: word,
            post: {
              connect: {
                id: post.id
              }
            }
          })
      );
      return post;
    }
  }
};
