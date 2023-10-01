import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { LoginData, RegisterData } from './types';
import { Role } from '@prisma/client';
import { hash, verify } from 'argon2';
import { NewUserData } from 'src/user/types';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(registerData: RegisterData) {
    // админ только я
    if (!registerData.role || registerData.role === Role.ADMIN) {
      registerData.role = Role.INVESTOR;
    }

    const userExists = await this.userRepository.findUserByEmail(
      registerData.email,
    );
    if (userExists) throw new ForbiddenException('Email is already in use');

    const hashedPassword = await hash(registerData.password);

    const userData = { ...registerData, hashedPassword };
    delete userData.password;
    const user = await this.userRepository.createNewUser(
      userData as NewUserData,
    );

    return user.toJSON();
  }

  async login(loginData: LoginData) {
    const userFound = await this.userRepository.findUserByEmail(
      loginData.email,
    );

    if (!userFound) throw new ForbiddenException('Credentials incorrect');

    const passwordMatches = await userFound.validatePassword(
      loginData.password,
    );
    if (!passwordMatches) throw new ForbiddenException('Credentials incorrect');

    return userFound.toJSON();
  }
}
