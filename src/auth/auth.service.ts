import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthUserDto } from './dto/authUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: AuthUserDto): Promise<{ access_token } | undefined> {
    const { email, password } = user;
    if (!password || !email) {
      throw new UnauthorizedException('Password and Email Required!');
    }

    const userFind = await this.userService.findOneByEmail(email);

    if (!userFind) {
      throw new BadRequestException('User Not found');
    }
    const userRoles = await this.userService.getUserRoles(userFind.id);

    if (!userRoles) {
      throw new BadRequestException('User role not found');
    }

    const payload = {
      id: userFind.id,
      email: userFind.email,
      roles: userRoles.map((ur) => {
        return ur.role.codigo;
      }),
    };
    console.log('PAYLOAD AUTH SERVICE', payload);

    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
