import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';


class UsersController {
  async findOrCreate(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const userService = new UsersService;
    const user = await userService.findOrCreate(email);

    return res.status(200).json(user);
  }
}
export { UsersController };