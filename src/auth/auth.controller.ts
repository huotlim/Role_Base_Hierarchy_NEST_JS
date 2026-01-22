import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({
    description: 'User registered successfully',
  })
  register(@Body() dto:RegisterDto) {
    return this.authService.register(dto.email, dto.password);
  }
  
  @Post('login')
  @ApiBody({ type: LoginDto })
   @ApiOkResponse({
    description: 'Login successful',
    schema: {
      example: {
        access_token: 'jwt.token.here',
        message: 'Login successful',
      },
    },
  })
  login(@Body() dto:LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
  
}
