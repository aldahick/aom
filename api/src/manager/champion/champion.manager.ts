import { singleton } from "tsyringe";
import { DatabaseService } from "../../service/database";

@singleton()
export class ChampionManager {
  constructor(
    private db: DatabaseService
  ) { }

  async getAll() {
    return this.db.champions.find();
  }
}
