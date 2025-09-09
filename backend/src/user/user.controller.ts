import { Controller, Get, Req } from '@nestjs/common';

import { UserService } from './user.service';
import type { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Req() req: Request) {
    // The JwtStrategy will attach user info to req.user
    const userId = req.user?.userId;

    const user = await this.userService.findById(userId);
    if (!user) {
      return { status: 'failed', message: 'User not found' };
    }

    return {
      status: 'success',
      message: 'Profile fetched successfully',
      user,
    };
  }
}
