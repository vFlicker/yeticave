import { DatabaseService, Id } from '../../common';

type BetData = {
  userId: Id;
  lotId: Id;
  price: number;
};

export class BetModel {
  public async getAllByUserId(id: Id) {
    const databaseService = DatabaseService.getInstance();

    // TODO: вибирати лише найбільшу ставку,
    // якщо їх де-кілька на один лот
    const sql = `SELECT
      image_url AS "imageUrl",
      title,
      contacts,
      category_name AS "categoryName",
      lot_id AS "lotId",
      lot.end_date AS "endDate",
      bet.price,
      bet.create_date AS "createDate",
      is_winner as "isWinner"
    FROM bet
    INNER JOIN lot
      USING(lot_id)
    INNER JOIN category
      USING(category_id)
    INNER JOIN app_user
      ON bet.user_id = app_user.user_id
    WHERE bet.user_id = $1`;

    const { rows } = await databaseService.query(sql, [id]);
    return rows;
  }

  public async getAllByLotId(id: Id) {
    const databaseService = DatabaseService.getInstance();

    const sql = `SELECT
      user_name as "userName",
      price,
      bet.create_date as "createDate"
    FROM bet
    INNER JOIN app_user
      USING(user_id)
    WHERE lot_id = $1
    ORDER BY bet.create_date DESC`;

    const { rows } = await databaseService.query(sql, [id]);
    return rows;
  }

  public async getMaxPriceByLotId(id: Id) {
    const databaseService = DatabaseService.getInstance();

    const sql = `SELECT
      Max(price) as price
    FROM bet
    WHERE lot_id = $1;`;

    // TODO: remove it
    // $sql = "SELECT `start_price`, `step_price`, MAX(b.price) AS `max_bet` FROM `lots` l
    // JOIN `bets` b ON l.id = b.lot_id
    // WHERE l.id = '$id'";

    const { rows } = await databaseService.query(sql, [id]);
    return rows[0].price;
  }

  public async addNew(betData: BetData) {
    const databaseService = DatabaseService.getInstance();

    const sql = `INSERT INTO
      bet (
        user_id,
        lot_id,
        price
      )
    VALUES
      ($1, $2, $3)`;

    const { userId, lotId, price } = betData;
    const { rows } = await databaseService.query(sql, [userId, lotId, price]);

    return rows;
  }
}
