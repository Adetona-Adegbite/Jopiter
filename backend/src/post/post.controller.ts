import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Folder where files will be saved
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${file.originalname}`.replace(
            /\s+/g,
            '_',
          ); // Remove spaces
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: string,
    @Body('tagline') tagline: string,
    @Body('caption') caption: string,
    @Body('price') price: string,
  ) {
    const newPost = await this.postService.createPost({
      userId: parseInt(userId, 10),
      imageUrl: `/uploads/${file.filename}`,
      tagline: tagline,
      caption: caption,
      price: parseInt(price, 10),
    });
    return {
      message: 'Post created successfully!',
      post: newPost,
    };
  }

  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }
}
