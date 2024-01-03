import { Request, Response } from 'express';
import { hashPassword } from './usecase';
import { UserService } from './userService';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await UserService.findOne(email);
    const { id } = user;
    const accessToken = jwt.sign({ id }, process.env.TOKEN_KEY, {
      expiresIn: '1h',
    });
    return res
      .status(200)
      .send({ message: 'Login Successfuly', user, accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPW = await hashPassword(password);
    const data = { username, email, password: hashedPW };
    const user = await UserService.createUser(data);
    const accessToken = jwt.sign({ d: user.id }, process.env.TOKEN_KEY, {
      expiresIn: '1h',
    });
    return res
      .status(201)
      .send({ message: 'User created successfully', user, accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { nameIn } = req.params;
    const user = await UserService.findOneByUsername(nameIn);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

export const getCurrUser = async (req: Request, res: Response) => {
  try {
    const { reqUserId } = req;
    const user = await UserService.findById(reqUserId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    return res.status(200).send({
      currUserId: user.id,
      currUserEmail: user.email,
      currUserName: user.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
