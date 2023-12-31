import { z, ZodError } from 'zod';
import { UserService } from './userService';

const isEmailUnique = async (email: string) => {
    const existingUser = await UserService.findOne(email);
    return !existingUser; 
};

const isUsernameUnique = async (username: string) => {
    const existingUser = await UserService.findOneByUsername(username);
    return !existingUser;
};

export const SignupInputSchema = z.object({
    username: z.string().min(3, { message: 'Username must be between 3 and 255 characters' }).max(255, { message: 'Username must be between 3 and 255 characters' }).refine(async (value) => {
        return await isUsernameUnique(value);
      }, { message: 'Username must be unique' }),
    email: z.string().email({ message: 'Invalid email format' }).refine(async (value) => {
        return await isEmailUnique(value);
    }, { message: 'Email must be unique' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export type SignupInput = z.infer<typeof SignupInputSchema>;

export const validateSignupInput = async (data: unknown): Promise<SignupInput> => {
    try {
        return await SignupInputSchema.parseAsync(data);
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

export const loginInputSchema = z.object({
    email: z.string().email({message:'Invalid email format'}),
    password:z.string().min(6, { message: 'Password must be at least 6 characters long' })
})

export type LoginInput=z.infer<typeof loginInputSchema>

export const validateLoginInput = async (data: unknown): Promise<LoginInput> => {
    try {
        return await loginInputSchema.parseAsync(data);
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