import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/decorators/Public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/user/DTOs/login.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO } from 'src/user/DTOs/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDTO) {
    try {
      const { email } = body;
      console.log('Login attempt for email:', body);
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const { accessToken } = await this.authService.login(
        user._id.toString(),
        user.email,
      );

      return {
        status: 'success',
        message: 'Login successful',
        data: {
          accessToken,
          user: {
            id: user._id,
            email: user.email,

            name: user.name,
          },
        },
      };
    } catch (error) {
      console.error('Error during login:', error.message);

      if (error instanceof HttpException) throw error;

      throw new HttpException(
        'An error occurred while logging in. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDTO) {
    try {
      console.log('Request body:', createUserDto);
      const newUser = await this.userService.create(createUserDto);

      const { accessToken } = await this.authService.login(
        newUser._id.toString(),
        newUser.email,
      );

      return {
        status: 'success',
        message: 'User created successfully',
        data: {
          accessToken,
          user: {
            id: newUser._id,
            email: newUser.email,

            name: newUser.name,
          },
        },
      };
    } catch (error) {
      console.error('Error during signup:', error.message);

      if (error instanceof HttpException) throw error;

      throw new HttpException(
        'An error occurred while creating the user. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
