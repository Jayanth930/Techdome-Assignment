import { Express } from 'express';

interface User {
    email : string ,
    id : string
}

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}