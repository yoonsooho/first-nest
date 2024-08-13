import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseTransformInterceptor } from './todos/interceptors/response-transform-interceptor';
import { ResponseMsg } from './todos/decorators/response-message-decorators';

@Controller('root')
@UseInterceptors(ResponseTransformInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name')
  @ResponseMsg('성공적으로 들어왔습니다.')
  getHello(@Param('name') name: string) {
    return {
      result: '오늘도 빡코딩!!!' + name,
    };
  }
}
