import { Injectable } from '@nestjs/common';
import { PingResponseDto } from './dto/ping-response.dto';

@Injectable()
export class AppService {
  ping(): PingResponseDto {
    return {
      appName: 'Free Api',
      appVersion: '1.0',
    };
  }
}
