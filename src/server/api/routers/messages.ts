import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/dist/api";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    profilePicture: user.profileImageUrl,
    email: user.emailAddresses[0]?.emailAddress,
  };
};
export const messageRouter = createTRPCRouter({
  sendMessages: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        listingId: z.string(),
        listingName: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const message = await ctx.prisma.message.create({
        data: {
          message: input.message,
          fromUser: ctx.auth.userId,
          fromUserName: ctx.auth.user?.username ?? "Usuario Deletado",
          listingId: input.listingId,
          listingName: input.listingName,
        },
      });
      return message;
    }),

  getMessages: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;
    const messages = await ctx.prisma.listing.findMany({
      where: {
        userId,
      },
      include: {
        Message: true,
      },
    });
    const messagesArr = messages.flatMap((item) => item.Message);

    const users = (
      await clerkClient.users.getUserList({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        userId: messagesArr.map((item) => item.fromUser),
      })
    ).map(filterUserForClient);

    return messagesArr.map((item) => {
      const user = users.find((user) => user.id === item.fromUser);
      return {
        ...item,
        fromUser: user,
      };
    });
  }),
});
