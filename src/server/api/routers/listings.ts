import type { User } from "@clerk/nextjs/dist/api";
import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    profilePicture: user.profileImageUrl,
  };
};

export const listingsRouter = createTRPCRouter({
  myListings: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor } = input;
      const listedItems = await ctx.prisma.listing.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          userId: ctx.auth.userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (listedItems.length > limit) {
        const nextItem = listedItems.pop();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        nextCursor = nextItem!.id;
      }
      return {
        listedItems,
        nextCursor,
      };
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
      const listedItems = await ctx.prisma.listing.findMany({
        where: {
          id: input.listingId,
        },
      });
      const users = (
        await clerkClient.users.getUserList({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          userId: listedItems.map((item) => item.userId),
        })
      ).map(filterUserForClient);
      return listedItems.map((item) => {
        const author = users.find((user) => user.id === item.userId);
        if (!author) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Autor não encontrado",
          });
        }
        return {
          item,
          author,
        };
      });
    }),

  getBatch: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor } = input;
      const listedItems = await ctx.prisma.listing.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (listedItems.length > limit) {
        const nextItem = listedItems.pop();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        nextCursor = nextItem!.id;
      }
      return {
        listedItems,
        nextCursor,
      };
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
