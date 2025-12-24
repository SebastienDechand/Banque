import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function boostrap() {
  const app = await NestFactory.create(AppModule.forRoot());

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`API Bancaire démarrée sur http://localhost:${port}`);
  console.log(`MongoDB connecté sur ${process.env.MONGODB_URI}`);
}

boostrap();
