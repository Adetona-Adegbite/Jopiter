import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:linkbeez@localhost:5434/jopiter?schema=public',
        },
      },
    });
  }
}
