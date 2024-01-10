import express from 'express';
import {
  getUserDetails,
  login,
  signup,
  getCurrUser,
  logout,
} from './userController';
import {
  isAuth,
  loginCheckCredentials,
  validateLoginMiddleware,
  validateSignupMiddleware,
} from './middleware';

const router = express.Router();

router.post('/login', validateLoginMiddleware, loginCheckCredentials, login);

router.post('/signup', validateSignupMiddleware, signup);

router.get('/auth', isAuth, getCurrUser);

router.get('/:userId', getUserDetails);

router.post('/logout', logout);

export default router;
