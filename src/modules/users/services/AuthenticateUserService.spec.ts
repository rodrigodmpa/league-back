import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authUser: AuthenticateUserService;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate a user', async () => {
    const user = await createUser.execute({
      name: 'JohnDoe',
      email: 'johndoe@example.com',
      password: '121212',
    });
    const response = await authUser.execute({
      email: 'johndoe@example.com',
      password: '121212',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should restrict a user with non existing email', async () => {
    await expect(
      authUser.execute({
        email: 'johndoe@example.com',
        password: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should restrict a user with incorrect password', async () => {
    await createUser.execute({
      name: 'JohnDoe',
      email: 'johndoe2@example.com',
      password: '121212',
    });

    await expect(
      authUser.execute({
        email: 'johndoe2@example.com',
        password: '12122',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
