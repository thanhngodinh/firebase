import { Application } from 'express';
import {userController} from './userController';


export function route(app: Application): void {
  app.post('/users/search', userController.searchPost);
  app.get('/users/search', userController.search);
  app.post('/users', userController.create);
  app.get('/users/:id', userController.load);
  app.put('/users/:id', userController.update);
  app.patch('/users/:id', userController.patch);
  app.delete('/users/:id', userController.delete);
}
