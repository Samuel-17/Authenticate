import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;
  
  if (!authToken) {
    return response.status(401).json({
      status: "Error",
      message: "Token is missing",
    });
  }

  const [, token] = authToken.split(" ");
  try {
    verify(token, process.env.SECRET);
    return next();
  } catch (error) {
    return response.status(401).json({
      status: "Error",
      message: "Token not provided",
    });
  }
}
