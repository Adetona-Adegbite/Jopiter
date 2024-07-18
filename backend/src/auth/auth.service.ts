import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { User } from './type-defs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(userdata: User) {
    try {
      // Check if the user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: userdata.email,
        },
      });

      // If user already exists, throw a ConflictException
      if (existingUser) {
        throw new ConflictException('User already exists. Try to login');
      }

      // Hash the password
      const hash = await argon.hash(userdata.password);

      // Create the user
      const newUser = await this.prisma.user.create({
        data: {
          email: userdata.email,
          hash: hash,
          phone_number: userdata.phone,
          country: userdata.country,
        },
      });

      // Remove sensitive data from the response
      delete newUser.hash;

      // Return the newly created user
      return newUser;
    } catch (e) {
      console.error(e);
      throw e; // Re-throw the error to be handled by NestJS's global error handler
    }
  }
  async login(userdata: User) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userdata.email,
      },
    });
    if (!user) {
      throw new NotFoundException('Invalid Credentials'); // Generic message
    }
    const pwMatches = await argon.verify(user.hash, userdata.password);
    if (!pwMatches) {
      throw new UnauthorizedException('Invalid Credentials'); // Generic message
    }
    delete user.hash;
    return user;
  }
}
