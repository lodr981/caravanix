// Kolekce obsahu. Texty leží mimo aplikaci v content/<jazyk>/ (jazyk se přidá novou kolekcí a profilem země).
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const lekceCs = defineCollection({
  loader: glob({ pattern: "*.md", base: "../../content/cs/lekce" }),
  schema: z.object({
    titulek: z.string(),
    seoTitulek: z.string(),
    popis: z.string(),
    mytus: z.string().optional(),
    zasada: z.string(),
    karty: z.array(z.string()),
    kalkulacka: z.string().optional(),
    poradi: z.number(),
  }),
});

export const collections = { lekceCs };
