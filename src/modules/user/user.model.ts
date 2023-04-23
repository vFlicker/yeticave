import { DatabaseService } from '../../common';

type SingUpData = {
  email: string;
  password: string;
  name: string;
  contacts: string;
};

export class UserModel {
  public async getUserByEmail(email: string) {
    const databaseService = DatabaseService.getInstance();

    const sql = `SELECT
      user_id as id,
      email,
      user_name as name,
      user_password as password,
      avatar_url as "avatarUrl",
      contacts
    FROM
      app_user
    WHERE
      email = $1`;

    const { rows } = await databaseService.query(sql, [email]);
    return rows[0];
  }

  public async create(data: SingUpData) {
    const databaseService = DatabaseService.getInstance();
    const { name, email, password, contacts } = data;

    const sql = `INSERT INTO
      app_user(user_name, email, user_password, contacts)
    VALUES
      ($1, $2, $3, $4)`;

    await databaseService.query(sql, [name, email, password, contacts]);
  }
}