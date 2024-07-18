import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './type-defs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(@Body() user: User) {
    console.log(user);
    try {
      const data = await this.authService.signup(user);
      // console.log(data);

      return { ok: true, user: data };
    } catch (e) {
      // console.log(e);

      return { ok: false, error: e.message };
    }
  }
  @Post('login')
  async login(@Body() user: User) {
    console.log(user);

    try {
      const data = await this.authService.login(user);
      return data;
    } catch (e) {
      console.log(e);

      return e;
    }
  }
}
