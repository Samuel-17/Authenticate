import { compare } from "bcryptjs";
import { client } from "../../prisma/client";
import { sign } from "jsonwebtoken";
import GenereateRefreshToken from "../../provider/GenerateRefreshToken";
import GenerateTokenProvider from "../../provider/GenerateTokenProvider";

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    //Verify user already exists

    const userAlreadyExists = await client.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!userAlreadyExists) {
      throw new Error("User or password incorrect");
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new Error("User or password incorrect");
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id);

    const genereateRefreshToken  = new GenereateRefreshToken();
    const refreshToken = await genereateRefreshToken.execute(userAlreadyExists.id)

    return { token, refreshToken };
  }
}

export default AuthenticateUserUseCase;
