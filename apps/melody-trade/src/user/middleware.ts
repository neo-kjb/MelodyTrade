import { Request, Response, NextFunction } from 'express';
import { validateSignupInput, SignupInput, LoginInput, validateLoginInput } from './validation';
import { UserService } from './userService';
import { isEqualPassword } from './usecase';

export const validateSignupMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedInput: SignupInput = await validateSignupInput(req.body);
        req.body = validatedInput
        next();
    } catch (error) {
        console.error('Validation error:', error);
        res.status(400).json({ message: 'Invalid input', errors: error });
    }
};

export const validateLoginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedInput: LoginInput = await validateLoginInput(req.body);
        req.body = validatedInput
        next();
    } catch (error) {
        console.error('Validation error:', error);
        res.status(400).json({ message: 'Invalid input', errors: error });
    }
};

export const loginCheckCredentials = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.findOne(email);
  
      if (!user) {
        return res.status(404).send({ message: "Invalid credentials" });
      }
  
      const isEqual = await isEqualPassword(password, user.password);
  
      if (!isEqual) {
        return res.status(401).send({ message: "Invalid credentials" });
      }  
      next();
    } catch (error) {
      console.error("Error in loginCheckCredentials:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
  