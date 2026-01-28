import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class ListUserDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;
}
