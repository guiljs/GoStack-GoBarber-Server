import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all providers', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'guilherme@example.com',
      name: 'Guilherme',
      password: '123',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'heitor@example.com',
      name: 'Heitor',
      password: '123',
    });

    const providers = await listProviders.execute();

    expect(providers).toEqual([user1, user2]);
    expect(providers).toHaveLength(2);
  });

  it('should be able to list all providers except user id sent', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'guilherme@example.com',
      name: 'Guilherme',
      password: '123',
    });
    const user = await fakeUsersRepository.create({
      email: 'heitor@example.com',
      name: 'Heitor',
      password: '123',
    });

    const providers = await listProviders.execute(user.id);

    expect(providers).toEqual([user1]);
    expect(providers).toHaveLength(1);
  });
});
