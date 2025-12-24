import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ACCOUNT_REPOSITORY } from '../../src/domain/account.repository.interface';
import { InMemoryAccountRepository } from '../../src/infrastructure/persistence/in-memory/in-memory-account.repository';

describe('AccountController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule.forRoot()],
    })
      .overrideProvider(ACCOUNT_REPOSITORY)
      .useClass(InMemoryAccountRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/accounts (POST) - should create an account', () => {
    return request(app.getHttpServer())
      .post('/accounts')
      .send({ id: '1', ownerName: 'Alice' })
      .expect(201);
  });

  it('/accounts/:id/deposit (POST) - should deposit money', async () => {
    await request(app.getHttpServer())
      .post('/accounts')
      .send({ id: '1', ownerName: 'Alice' });

    await request(app.getHttpServer())
      .post('/accounts/1/deposit')
      .send({ amount: 1000 })
      .expect(200);

    const response = await request(app.getHttpServer())
      .get('/accounts/1/balance')
      .expect(200);

    expect(response.body.balance).toBe(1000);
  });
});
