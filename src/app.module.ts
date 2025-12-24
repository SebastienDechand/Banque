import { DynamicModule, Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApplicationModule } from './application/application.module';
import { PresentationModule } from './presentation/presentation.module';
import { ConfigModule } from '@nestjs/config';
import { InMemoryModule } from './infrastructure/persistence/in-memory/in-memory.module';

@Module({})
export class AppModule {
  static forRoot(): DynamicModule {
    const isTest = process.env.NODE_ENV === 'test';

    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        isTest ? InMemoryModule : InfrastructureModule,
        ApplicationModule,
        PresentationModule,
      ],
    };
  }
}
