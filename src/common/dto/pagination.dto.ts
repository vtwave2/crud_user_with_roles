import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Max, Min, IsInt, IsNotEmpty } from 'class-validator';

export class PaginationDto {
  @ApiProperty()
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  pageStart: number;

  @ApiProperty()
  @Max(100)
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  pageSize: number;
}
