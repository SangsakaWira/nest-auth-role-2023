import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import jwt_decode from "jwt-decode";

@Injectable()
export class isDoctorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    var decoded = jwt_decode(req.headers.authorization.split(" ")[1]);
    next();
  }
}
