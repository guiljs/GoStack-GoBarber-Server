import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

describe('Profiles', () => {
  it('Should be able to show profile', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const showProfile = new ShowProfileService(fakeUsersRepository);

    const user = await fakeUsersRepository.create({
      name: 'Guilherme Santos',
      email: 'gui@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute(user.id);

    expect(profile.name).toBe('Guilherme Santos');
  });

  it('Should not be able to show profile of non-existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const showProfile = new ShowProfileService(fakeUsersRepository);

    await expect(showProfile.execute('not-existing-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
