import * as z from "zod";

const registryItemSchema = z.object({
  name: z.string(),
  author: z.string(),
  dependencies: z.array(z.string()),
  files: z.array(
    z.object({
      path: z.string(),
    }),
  ),
})

export const registrySchema = z.object({
  vuejs: z.array(registryItemSchema),
  react: z.array(registryItemSchema)
})
