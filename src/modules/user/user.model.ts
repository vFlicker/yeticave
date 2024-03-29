import { BaseModel } from '../../framework';
import { CreateNewUser, User } from './interfaces';
import { UserQuery } from './user.query';

export class UserModel extends BaseModel {
  protected tableName = 'users';
  protected queryBuilder: UserQuery = new UserQuery(this);

  public email = '';
  public password = '';
  public name = '';
  public contacts = '';

  public async getUserByEmail(email: string): Promise<User> {
    const sql = this.queryBuilder.getUserByEmail();

    const user = this.getScalarValue<User>(sql, [email]);
    return user;
  }

  public async createNewUser(data: CreateNewUser): Promise<void> {
    const { name, email, password, contacts } = data;

    const rows = ['user_name', 'email', 'user_password', 'contacts'];

    const fields = UserQuery.createFields(rows);
    const placeholders = UserQuery.createPlaceholders(rows.length);

    const sql = `INSERT INTO
      users(${fields})
    VALUES
      (${placeholders})`;

    await this.runSimpleQuery(sql, [name, email, password, contacts]);
  }
}
