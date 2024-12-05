import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Post('send')
  async sendMessage(
    @Body('senderId') senderId: number,
    @Body('receiverId') receiverId: number,
    @Body('content') content: string,
  ) {
    return this.messageService.sendMessage(senderId, receiverId, content);
  }
  @Get(':userId1/:userId2')
  async getMessages(
    @Param('userId1') userId1: number,
    @Param('userId2') userId2: number,
  ) {
    return this.messageService.getMessagesBetweenUsers(userId1, userId2);
  }
}
