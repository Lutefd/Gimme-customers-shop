import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const messageRouter = createTRPCRouter({
  sendMessages: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        listingId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const message = await ctx.prisma.message.create({
        data: {
          message: input.message,
          fromUser: ctx.auth.userId,
          fromUserName: ctx.auth.user?.username ?? "Usuario Deletado",
          listingId: input.listingId,
        },
      });
      return message;
    }),
});
