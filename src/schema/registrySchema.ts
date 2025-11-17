import * as z from "zod";

const registrySchema = z.record(
  z.string(),
  z.object({
    path: z.string(),
  })
);

export { registrySchema };
