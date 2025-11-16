import * as z from "zod";

const registrySchema = z.record(
  z.string(),
  z.object({
    Path: z.string(),
  })
);

export { registrySchema };
