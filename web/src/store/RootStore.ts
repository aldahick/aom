import { computed } from "mobx";
import { NavbarStore } from "./NavbarStore";
import { SettingsStore } from "./SettingsStore";
import { StatusStore } from "./StatusStore";
import { SocketStore } from "./SocketStore";

export class RootStore {
  navbarStore = new NavbarStore();

  settingsStore = new SettingsStore();

  socketStore = new SocketStore(this);

  statusStore = new StatusStore();

  @computed
  get allStores(): Omit<RootStore, "allStores"> & { rootStore: Omit<RootStore, "allStores"> } {
    return {
      rootStore: this,
      ...this,
    };
  }
}