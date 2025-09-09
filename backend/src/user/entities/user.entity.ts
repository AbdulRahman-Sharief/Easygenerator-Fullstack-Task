import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsString, Matches, MinLength } from 'class-validator';
import { NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({ timestamps: true })
export class UserEntity {
  @Prop({ default: null, required: true, min: 3 })
  name: string;

  @Prop({ default: null, unique: true, sparse: true })
  email: string;

  @Prop({ required: true, select: false })
  @Exclude()
  @IsString({ message: 'Password must be a string.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()[\]{}\-_=+|;:'",.<>\/\\]).{8,}$/,
    {
      message:
        'Password must contain at least one letter, one number, and one special character.',
    },
  )
  password: string;

  @Prop({ default: new Date() })
  @Exclude()
  passwordChangedAt: Date;

  // hash the password
  async hashPassword() {
    if (this.password !== null) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }
  async comparePassword(attemptedPassword: string) {
    return await bcrypt.compare(attemptedPassword, this.password);
  }
  // toJSON() {
  //   return instanceToPlain(this);
  // }
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.loadClass(UserEntity);

UserSchema.pre<UserDocument>('save', async function (next: NextFunction) {
  if (!this.isModified('password')) return next();
  try {
    await this.hashPassword();
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.pre<UserDocument>('save', async function (next: NextFunction) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});
