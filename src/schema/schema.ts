import * as z from "zod";

const componentSchema = z.object({
  name: z.string(),
  author: z.string(),
  description: z.string(),
});

export { componentSchema };
