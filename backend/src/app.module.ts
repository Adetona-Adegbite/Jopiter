import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { MessageModule } from './message/message.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [AuthModule, PrismaModule, PostModule, MessageModule, PaymentsModule],
})
export class AppModule {}
