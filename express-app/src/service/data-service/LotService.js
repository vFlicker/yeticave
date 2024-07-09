export class LotService {
  #data = null;

  constructor(data) {
    this.#data = data;
  }

  findAll() {
    return this.#data.lots;
  }

  findOne(id) {
    return this.#data.lots.find((lot) => lot.id === id);
  }

  create(lot) {
    const { id: previousLotId } = this.#data.lots.at(-1);
    const newLot = { ...lot, id: previousLotId + 1 };
    this.#data.lots.push(newLot);
    return newLot;
  }
}
