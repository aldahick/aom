import React, { useState } from "react";
import {
  Button, TextField, Typography,
} from "@material-ui/core";
import { observer } from "mobx-react";
import { ILobbyClientJoinPayload } from "../../graphql/types";
import { useStores } from "../../hook/useStores";
import { SocketEvent } from "../socket/SocketEvent";
import { Grids } from "../util/Grids";

const WEBSOCKET_EVENT = "lobby.client.join";
const STORAGE_KEY = "summonerName";

export const LobbyJoinForm: React.FC<{
  lobbyId: string;
  onJoin: () => void;
}> = observer(({ lobbyId, onJoin }) => {
  const { socketStore } = useStores();
  const [name, setName] = useState(sessionStorage.getItem(STORAGE_KEY) || "");

  const join = () => {
    if (!name) {
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, name);
    const payload: ILobbyClientJoinPayload = {
      summonerName: name,
      lobbyId,
    };
    socketStore.socket.emit(WEBSOCKET_EVENT, payload);
  };

  if (!socketStore.socket) {
    return <Typography>Connecting...</Typography>;
  }

  if (sessionStorage.getItem("")) {
    join();
  }

  return (
    <SocketEvent name={WEBSOCKET_EVENT} handle={onJoin}>
      <Grids alignItems="flex-end">
        <TextField
          label="Your Summoner Name"
          value={name}
          onChange={evt => setName(evt.target.value)}
          onKeyPress={evt => {
            if (evt.key === "Enter") {
              join();
            }
          }}
        />
        <Button variant="outlined" onClick={join}>Join</Button>
      </Grids>
    </SocketEvent>
  );
});
