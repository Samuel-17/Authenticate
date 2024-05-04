import { Request, Response } from "express";
import AuthenticateUseCase from "./CreateUseCase";
class CreateUserController {
  constructor() {}

  async handle(request: Request, response: Response) {
    const { name, username, password } = request.body;

    const authenticateUseCase = new AuthenticateUseCase();

    const user = await authenticateUseCase.execute({
      name,
      password,
      username,
    });

    return response.json(user);
  }
}

export default CreateUserController;
