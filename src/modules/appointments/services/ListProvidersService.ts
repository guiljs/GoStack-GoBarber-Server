import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id?: string): Promise<User[]> {
    const providers = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    return providers;
  }
}