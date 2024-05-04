import { client } from "../prisma/client";
import dayjs from "dayjs";

class GenereateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, "second").unix();
    const genereateRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return genereateRefreshToken;
  }
}

export default GenereateRefreshToken;
