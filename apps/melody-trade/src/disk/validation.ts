import { z, ZodError } from 'zod';


export const DiskInputSchema = z.object({
  name: z.string().min(3,{ message: 'Name must be between 3 and 255 characters' }).max(255, { message: 'Name must be between 3 and 255 characters' }),
  description: z.string().min(3, { message: 'Description must be between 3 and 1000 characters' }).max(1000, { message: 'Description must be between 3 and 1000 characters' }),
  location: z.string().min(3, { message: 'Location must be between 3 and 255 characters' }).max(255, { message: 'Location must be between 3 and 255 characters' }),
  imageURL: z.string().url({ message: 'Invalid URL format' }),
});

export type DiskInput = z.infer<typeof DiskInputSchema>;

export const validateDiskInput = async (data: unknown): Promise<DiskInput> => {
  try {
    return await DiskInputSchema.parseAsync(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      throw errors;
    }
    throw error;
  }
};
