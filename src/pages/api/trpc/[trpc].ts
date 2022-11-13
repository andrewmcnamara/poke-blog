// [trpc].ts
import { createAstroTRPCApiHandler } from "astro-trpc";
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import type { Pokemon } from "../../../lib/pokemon";

const t = initTRPC.create();

// the tRPC router
export const appRouter = t.router({
  greeting: t.procedure
    .input((val: unknown) => {
      // if (typeof val === "string") return val;
      // throw new Error(`Invalid input: ${typeof val}`);
      return "ivysaur";
    })
    .query(async (req) => {
      // console.log(`https://pokeapi.co/api/v2/pokemon/${req.input}`);
      const input = req.input;
      const pokemon: Pokemon = await (
        await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
      ).json();

      return pokemon;
      // return {
      //   greeting: `hello ${input ?? "world!"}`,
      // };
    }),
});

// type definition of the router
export type AppRouter = typeof appRouter;

// API handler
export const all = createAstroTRPCApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
