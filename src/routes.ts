import { Router } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from './controllers/SettingsController'
import { UsersController } from "./controllers/UsersController";

const settingsController = new SettingsController;
const usersController = new UsersController;
const messagesController = new MessagesController;
const routes = Router();

routes.get('/', (req, res) => {
  res.status(200).render('html/client.html');
});

routes.post('/settings', settingsController.create);

routes.post('/messages', messagesController.create);
routes.get('/messages/:userId', messagesController.listByUser);

routes.post('/users', usersController.findOrCreate);
export { routes };