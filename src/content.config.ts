import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const copyCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/copy" }),
  schema: z.discriminatedUnion("section", [
    z.object({
      section: z.literal("hero"),
      meta: z.object({
        title: z.string(),
        description: z.string(),
      }),
      nav: z.object({
        commitspaceLabel: z.string(),
        commitspaceHref: z.string(),
        workLabel: z.string(),
        workHref: z.string(),
      }),
      headline: z.string(),
      subtext: z.string().optional(),
      primaryLabel: z.string(),
      primaryHref: z.string(),
      secondaryLabel: z.string(),
      secondaryHref: z.string(),
    }),
    z.object({
      section: z.literal("about"),
      title: z.string(),
      aboutBody: z.string().optional(),
      missionTitle: z.string(),
      missionBody: z.string(),
      buildTitle: z.string(),
      buildBody: z.string(),
      workTitle: z.string(),
      workBody: z.string(),
      workCtaLabel: z.string(),
      workCtaHref: z.string(),
    }),
    z.object({
      section: z.literal("commitspace"),
      status: z.string(),
      title: z.string(),
      body: z.string().optional(),
      problemTitle: z.string(),
      problemBody: z.string(),
      whatIsCards: z.array(
        z.object({
          title: z.string(),
          body: z.string(),
          imageSrc: z.string().optional(),
          imageAlt: z.string().optional(),
        }),
      ).length(4),
      personasTitle: z.string(),
      primaryUserTitle: z.string(),
      primaryUserBody: z.string(),
      secondaryUserTitle: z.string(),
      secondaryUserBody: z.string(),
      benefits: z.array(z.string()),
      primaryCtaLabel: z.string(),
      primaryCtaHref: z.string(),
      secondaryCtaLabel: z.string(),
      secondaryCtaHref: z.string(),
    }),
  ]),
});

export const collections = {
  copy: copyCollection,
};
