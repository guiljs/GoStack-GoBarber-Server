import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateuserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to authenticate', async () => {
    const hashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateuserService(fakeUsersRepository, hashProvider);
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      hashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const hashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      hashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const hashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateuserService(fakeUsersRepository, hashProvider);
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      hashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
