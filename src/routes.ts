import { Request, Response, Router } from "express";
import CreateUserController from "./useCases/createUser/CreateUserController";
import CreateUseCase from "./useCases/createUser/CreateUseCase";
import AuthenticateUserController from "./useCases/authenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import RefreshTokenUserController from "./useCases/refreshTokenUser/refreshTokenUserController";

const router = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/refresh_token", refreshTokenUserController.handle);

router.get(
  "/images",
  ensureAuthenticated,
  (request: Request, response: Response) => {
    return response.json([
      { id: 1, url: "http://imagem1" },
      { id: 2, url: "http://imagem2" },
      { id: 3, url: "http://imagem3" },
      { id: 4, url: "http://imagem4" },
      { id: 5, url: "http://imagem5" },
    ]);
  }
);

export { router };
