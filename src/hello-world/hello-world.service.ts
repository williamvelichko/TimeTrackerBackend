import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloWorldService {
  private readonly statement = 'hello world';
  return(): string {
    return this.statement;
  }
}
