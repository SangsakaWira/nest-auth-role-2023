import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../products/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local-strategy/auth.local.strategy';
import { JwtStrategy } from './jwt-strategy/auth.jwt.strategy'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';

@Module({
  imports: [UsersModule, PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2592000s' },
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule]
})
export class AuthModule { }
