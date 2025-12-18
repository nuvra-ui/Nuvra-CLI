import * as z from "zod";

const componentSchema = z.object({
  name: z.string(),
  description: z.string(),
  author: z.string(),
  version: z.string(),
  tags: z.array(z.string()),
  category: z.string(),
  files: z.array(
    z.object({
      path: z.string(),
    }),
  ),
});

export { componentSchema };
