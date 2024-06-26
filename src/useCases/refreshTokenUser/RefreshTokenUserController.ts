import { Request, Response } from "express";
import RefreshTokenUserUseCase from "./refreshTokenUserUseCase";

class RefreshTokenUserController {

    async handle(request: Request, response: Response){
        const {refresh_token} = await request.body;

        const refreshTokenUserUseCase = new RefreshTokenUserUseCase();
        const token = await refreshTokenUserUseCase.execute(refresh_token);

        return response.json(token);
    }

}


export default RefreshTokenUserController;