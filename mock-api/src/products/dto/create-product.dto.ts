import { ApiProperty, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsAlpha,
  MinLength,
  Matches,
  IsBoolean,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @ApiResponseProperty()
  id: string;

  @ApiProperty()
  picture: string;

  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;


  @ApiProperty()
  price?: number;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  description: string;

  @ApiProperty()
  @IsArray()
  tags: Array<string>;

  @ApiResponseProperty()
  createdDate: Date;

  @ApiResponseProperty()
  updatedDate: Date;
}
