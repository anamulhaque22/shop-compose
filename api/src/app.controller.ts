import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  health() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const environment: string =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.configService.get<string>('NODE_ENV') ?? 'development';

    return {
      status: 'ok',
      environment,
    };
  }
}
