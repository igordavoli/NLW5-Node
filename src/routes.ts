import { Router } from "express";
import { SettingsController } from './controllers/SettingsController'



const settingsController = new SettingsController;
const routes = Router();
routes.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' })
})

routes.post('/settings', settingsController.create)

export { routes };