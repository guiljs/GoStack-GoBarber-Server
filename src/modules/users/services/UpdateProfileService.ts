import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithEmail = await this.usersRepository.findByEmail(email);

    if (userWithEmail && userWithEmail.id !== user_id) {
      throw new AppError('Cannot update email to a already used email');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('Should inform old password to set new password.');
    }

    if (password && old_password) {
      const isOldPasswordRight = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!isOldPasswordRight) {
        throw new AppError('Old Password is not right.');
      }
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    await this.cacheProvider.invalidatePrefix(`providers-list`);

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
