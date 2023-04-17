import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        image: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // todo save to db

      const listing = await ctx.prisma.listing.create({
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          image: input.image,
          userId: ctx.auth.userId,
        },
      });
      return listing;
    }),
});
