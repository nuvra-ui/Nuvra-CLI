import * as z from "zod";

const componentSchema = z.object({
  name: z.string(),
  description: z.string(),
  author: z.string(),
  version: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
});

export { componentSchema };
