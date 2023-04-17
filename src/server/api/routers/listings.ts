import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  myListings: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.listing.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  listingAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.listing.findMany();
  }),

  listingLatestFour: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.listing.findMany({
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getItem: publicProcedure
    .input(z.object({ listingId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.listing.findUnique({
        where: {
          id: input.listingId,
        },
      });
    }),
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
