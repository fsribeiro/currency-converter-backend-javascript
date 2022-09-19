import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_CURRENCY_URI, {
      connectionName: process.env.MONGO_CURRENCY_DOCKER_SERVICE,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
