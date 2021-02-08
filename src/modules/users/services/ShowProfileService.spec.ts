import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });

    const updatedUser = await showProfile.execute({
      user_id: user.id,
    });

    expect(updatedUser.id).toBe(user.id);
  });
  it('should not be able to show the profile of an non existin user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
