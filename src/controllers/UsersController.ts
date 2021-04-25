import { Request, Response } from 'express';
import { UserService } from '../services/UserService';


class UsersController {
  async findOrCreate(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const userService = new UserService;
    const user = await userService.findOrCreate(email);

    return res.status(200).json(user);
  }
}
export { UsersController };