import { Id } from '../../common';
import { BaseModel, BaseQuery } from '../../framework';
import { Bet, CreateBet, HistoryBet, MaxPrice } from './interfaces';

export class BetModel extends BaseModel {
  public getQuery(): BaseQuery | null {
    return null;
  }

  public async getBetsForUser(id: Id): Promise<Bet[]> {
    const sql = `SELECT
      image_url AS "imageUrl",
      title,
      contacts,
      category_name AS "categoryName",
      lot.end_date AS "endDate",
      bet.lot_id AS "lotId",
      bet.price,
      bet.create_date AS "createDate",
      bet.is_winner as "isWinner"
    FROM (
      SELECT lot_id, MAX(price) AS max_price
      FROM bet
      WHERE user_id = $1
      GROUP BY lot_id
    ) max_bet
    JOIN bet
      ON bet.lot_id = max_bet.lot_id AND bet.price = max_bet.max_price
    JOIN lot
      ON bet.lot_id = lot.id
    JOIN category
      ON lot.category_id = category.id
    JOIN app_user
      ON bet.user_id = app_user.id
    WHERE bet.user_id = $1
    ORDER BY bet.create_date DESC`;

    const { rows } = await this.databaseService.getDB().query(sql, [id]);
    return rows;
  }

  public async getHistoryOfRatesByLotId(id: Id): Promise<HistoryBet[]> {
    const sql = `SELECT
      user_name as "userName",
      price,
      bet.create_date as "createDate"
    FROM bet
    INNER JOIN app_user
      ON bet.user_id = app_user.id
    WHERE lot_id = $1
    ORDER BY bet.create_date DESC`;

    const { rows } = await this.databaseService
      .getDB()
      .query<HistoryBet>(sql, [id]);
    return rows;
  }

  public async getMaxPriceByLotId(id: Id): Promise<MaxPrice> {
    const sql = `SELECT
      Max(price) as price
    FROM bet
    WHERE lot_id = $1;`;

    const { rows } = await this.databaseService
      .getDB()
      .query<MaxPrice>(sql, [id]);
    return rows[0];
  }

  public async createNew(createBet: CreateBet): Promise<void> {
    const { userId, lotId, price } = createBet;

    const sql = `INSERT INTO
        bet (
          user_id,
          lot_id,
          price
        )
      VALUES
        ($1, $2, $3)`;

    await this.databaseService.getDB().query(sql, [userId, lotId, price]);
  }
}
