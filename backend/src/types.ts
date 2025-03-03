export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  avatar: string | null;
}

export interface JwtPayload {
  userId: number;
  role: "user" | "admin";
  iat: number;
  exp: number;
}
