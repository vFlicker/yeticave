import { DatabaseService } from '../../common';

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
}
