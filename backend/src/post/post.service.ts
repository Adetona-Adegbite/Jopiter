import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async createPost(data: {
    userId: number;
    imageUrl: string;
    tagline: string;
    price: number;
    caption: string;
  }) {
    return this.prisma.post.create({
      data: {
        userId: data.userId,
        imageUrl: data.imageUrl,
        tagline: data.tagline,
        price: data.price,
        caption: data.caption,
      },
    });
  }
  async getAllPosts() {
    return this.prisma.post.findMany();
  }
}
