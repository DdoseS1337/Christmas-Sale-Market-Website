import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AdminModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
