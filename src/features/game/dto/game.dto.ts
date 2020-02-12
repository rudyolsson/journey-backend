import { IsNotEmpty } from 'class-validator';
import { User } from 'src/features/user/entity/user.entity';

export class GameDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  userId: string;
  name: string;

  user: User;
}
