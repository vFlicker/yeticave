import { Id } from '../../common';
import { BaseModel } from '../../framework';
import { BetQuery } from './bet.query';
import { Bet, CreateBet, HistoryBet, MaxPrice } from './interfaces';

export class BetModel extends BaseModel {
  protected tableName = 'bets';
  protected queryBuilder: BetQuery = new BetQuery(this);

  public async getBetsForUser(id: Id): Promise<Bet[]> {
    const sql = `SELECT
      image_url AS "imageUrl",
      title,
      contacts,
      category_name AS "categoryName",
      lots.end_date AS "endDate",
      bets.lot_id AS "lotId",
      bets.price,
      bets.create_date AS "createDate",
      bets.is_winner as "isWinner"
    FROM (
      SELECT lot_id, MAX(price) AS max_price
      FROM bets
      WHERE user_id = $1
      GROUP BY lot_id
    ) max_bet
    JOIN bets
      ON bets.lot_id = max_bet.lot_id AND bets.price = max_bet.max_price
    JOIN lots
      ON bets.lot_id = lots.id
    JOIN categories
      ON lots.category_id = categories.id
    JOIN users
      ON bets.user_id = users.id
    WHERE bets.user_id = $1
    ORDER BY bets.create_date DESC`;

    const bets = this.getScalarValues<Bet>(sql, [id]);
    return bets;
  }

  public getHistoryOfRatesByLotId(id: Id): Promise<HistoryBet[]> {
    const sql = `SELECT
      user_name as "userName",
      price,
      bets.create_date as "createDate"
    FROM bets
    JOIN users
      ON bets.user_id = users.id
    WHERE lot_id = $1
    ORDER BY bets.create_date DESC`;

    const historyBets = this.getScalarValues<HistoryBet>(sql, [id]);
    return historyBets;
  }

  public async getMaxPriceByLotId(id: Id): Promise<MaxPrice> {
    const sql = `SELECT
      Max(price) as price
    FROM bets
    WHERE lot_id = $1;`;

    const maxPrice = await this.getScalarValue<MaxPrice>(sql, [id]);
    return maxPrice;
  }

  public async createNew(createBet: CreateBet): Promise<void> {
    const rows = ['user_id', 'lot_id', 'price'];

    const fields = BetQuery.createFields(rows);
    const placeholders = BetQuery.createPlaceholders(rows.length);

    const { userId, lotId, price } = createBet;

    const sql = `INSERT INTO
        bets (${fields})
      VALUES
        (${placeholders})`;

    await this.runSimpleQuery(sql, [userId, lotId, price]);
  }
}
