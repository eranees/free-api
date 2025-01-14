import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PingResponseDto } from './dto/ping-response.dto';

@Controller()
@ApiTags('Ping')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: PingResponseDto,
  })
  @ApiOperation({
    summary: 'This endpoint is used to test server is down or up',
  })
  ping(): PingResponseDto {
    return this.appService.ping();
  }
}
