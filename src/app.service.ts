import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getVersion(): string {
    return 'Surabah Back End v1.0.0';
  }
}
