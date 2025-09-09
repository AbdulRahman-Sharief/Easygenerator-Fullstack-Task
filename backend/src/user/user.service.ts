import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserEntity } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDTO } from './DTOs/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<UserEntity>) {}

  async create(createUserDto: CreateUserDTO): Promise<UserDocument> {
    try {
      const user = new this.UserModel(createUserDto);
      return await user.save();
    } catch (err) {
      console.log(err);

      if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        throw new ConflictException(`${field} already exists`);
      }
      if (err.name === 'CastError') {
        throw new BadRequestException(`Invalid value for field: ${err.path}`);
      }
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e: any) => e.message);
        throw new BadRequestException(messages);
      }
      console.error('Unexpected error in UserService.create:', err);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      const user = await this.UserModel.findOne({ email });
      if (!user) {
        throw new NotFoundException(`User with email "${email}" not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error('Unexpected error in UserService.findByEmail:', error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
  }
}
