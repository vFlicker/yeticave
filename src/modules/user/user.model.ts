import { createPlaceholders } from '../../common';
import { BaseModel } from '../../framework';
import { User } from './interfaces';

// TODO: move to interfaces
type SingUpData = {
  email: string;
  password: string;
  name: string;
  contacts: string;
};

export class UserModel extends BaseModel {
  public email = '';
  public password = '';
  public name = '';
  public contacts = '';

  public async getUserByEmail(email: string): Promise<User> {
    const sql = `SELECT
      id,
      email,
      user_name as name,
      user_password as password,
      avatar_url as "avatarUrl",
      contacts
    FROM
      app_user
    WHERE
      email = $1`;

    const user = this.getScalarValue<User>(sql, [email]);
    return user;
  }

  public async create(data: SingUpData): Promise<void> {
    const { name, email, password, contacts } = data;

    const placeholders = createPlaceholders(Object.keys(data).length);

    const sql = `INSERT INTO
      app_user(user_name, email, user_password, contacts)
    VALUES
      (${placeholders})`;

    await this.runSimpleQuery(sql, [name, email, password, contacts]);
  }
}
