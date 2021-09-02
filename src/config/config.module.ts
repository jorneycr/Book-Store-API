import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService
    },
  ],
})
export class ConfigModule {}
