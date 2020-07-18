import { mutation, query } from "@athenajs/core";
import { singleton } from "tsyringe";
import { IMutation,IQuery } from "../graphql/types";
import { ItemManager } from "../manager/item";

@singleton()
export class ItemResolver {
  constructor(
    private itemManager: ItemManager
  ) { }

  @query()
  async items(): Promise<IQuery["items"]> {
    return this.itemManager.getAll();
  }

  @mutation()
  async updateItems(): Promise<IMutation["updateItems"]> {
    await this.itemManager.update();
    return true;
  }
}
