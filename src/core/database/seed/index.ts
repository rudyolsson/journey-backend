import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from '../../../features/user/entity/user.entity';
import { Profile } from '../../../features/profile/entity/profile.entity';
import { createUserMock, createUserProfileMock } from './user.mock';
const databaseConf = require('../../config/database');

async function remove(user: boolean, profile: boolean): Promise<void> {
  if (user) {
    await User.delete({});
  }
  if (profile) {
    await Profile.delete({});
  }

  console.log('Remove data executed');
}

async function createUserMocks(userEmail: string): Promise<User> {
  const user: User = await createUserMock(userEmail);
  return user;
}

(async () => {
  await createConnection(databaseConf);
  await remove(true, true);
  const rudy = await createUserMocks('rudyolsson@gmail.com');
  await createUserProfileMock(
    rudy,
    'Rudy',
    'Olsson',
    'UL',
    '1 Street',
    '+44 7654 12345'
  );
  console.log('Finished');
  process.exit(0);
})();
