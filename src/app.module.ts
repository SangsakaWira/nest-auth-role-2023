import { config } from 'dotenv';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './products/users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-strategy/auth.jwt.guards';
import { RolesGuard } from './auth/role-strategy/auth.role.guard';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { isAdminMiddleware } from './middleware/admin.middleware';
config();

// Products
const DB_URL_V2 = process.env.DB_HOST || "mongodb://localhost:27017/nest-database"
const DB_PROD = DB_URL_V2

const AuthProvider = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
}

const RoleProvider = {
  provide: APP_GUARD,
  useClass: RolesGuard,
}

@Module({
  imports: [ConfigModule.forRoot(),UsersModule, AuthModule, MongooseModule.forRoot(DB_PROD)],
  controllers: [AppController],
  providers: [AppService, AuthService, AuthProvider, RoleProvider,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, isAdminMiddleware)
      .forRoutes("user")
  }
}
