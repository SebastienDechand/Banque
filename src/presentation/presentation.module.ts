import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { AccountController } from './controllers/account.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [AccountController],
})
export class PresentationModule {}
