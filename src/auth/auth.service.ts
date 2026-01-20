import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService:  JwtService,
    ) {}

    async register(email: string ,password: string ) {
        // const hashed = await bcrypt.hash(password, 12);
        const user = await this.usersService.create(email, password, null);
        return {
            user,
            message: 'Registration successful',
        };

    }

    
    
    async login (email: string, password: string) {
        const user = await this.usersService.findByEmail (email, { relations: ['role', 'role.permissions'] });

        if (!user) throw new UnauthorizedException();

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            message: 'Login successful',
            
        }
    }

}
