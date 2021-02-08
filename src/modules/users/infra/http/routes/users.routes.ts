import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// Rote deve: Receber a requisição, chamar outro arquivo, devolver uma resposta

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersController.updateAvatar,
);
export default usersRouter;
