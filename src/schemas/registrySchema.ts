import * as z from "zod";

export const registrySchema = z.object({
  vuejs: z.array(
    z.object({
      name: z.string(),
      author: z.string(),
      dependencies: z.array(z.string()),
      files: z.array(
        z.object({
          path: z.string(),
        }),
      ),
    }),
  ),
  react: z.array(
    z.object({
      name: z.string(),
      author: z.string(),
      dependencies: z.array(z.string()),
      files: z.array(
        z.object({
          path: z.string(),
        }),
      ),
    }),
  ),
});