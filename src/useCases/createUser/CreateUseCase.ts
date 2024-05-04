import { client } from "../../prisma/client";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  username: string;
  password: string;
}

class CreateUseCase {
  model;

  constructor() {
    this.model = "user";
  }

  async execute({ name, username, password }: IUserRequest) {
    // Verify if user exists
    // Register the user

    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists ");
    }

    const passwordHash = await hash(password, 8);

    return await client["user"].create({
      data: {
        name: name,
        username: username,
        password: passwordHash,
      },
    });
  }
}

export default CreateUseCase;
