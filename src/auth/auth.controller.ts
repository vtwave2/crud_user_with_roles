import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/authUser.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'login ' })
  @ApiCreatedResponse({ description: 'User logged with successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @Post('login')
  async signIn(@Body() authUserDto: AuthUserDto) {
    return await this.authService.signIn(authUserDto);
  }
}
