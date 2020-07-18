import { IndexScene } from "./scene";
import { ChampionsScene } from "./scene/champions";
import { CreateLobbyScene } from "./scene/lobby/create";
import { LobbyScene } from "./scene/lobby/lobby";
import { SceneDefinition } from "./util/SceneDefinition";

export const scenes: SceneDefinition[] = [
  {
    route: "/",
    component: IndexScene,
  },
  {
    route: "/champions",
    component: ChampionsScene,
    navbarTitle: "Champions",
  },
  {
    route: "/lobby/create",
    component: CreateLobbyScene,
    navbarTitle: "Create Lobby",
  },
  {
    route: "/lobby/:lobbyId",
    component: LobbyScene,
  },
];
