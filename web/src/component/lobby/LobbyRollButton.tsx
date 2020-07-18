import React from "react";
import { Button } from "@material-ui/core";
import { useStores } from "../../hook/useStores";

export const LobbyRollButton: React.FC = () => {
  const { socketStore } = useStores();

  const roll = () => {
    socketStore.socket.emit("lobby.client.roll");
  };

  return (
    <Button variant="contained" onClick={roll}>Roll</Button>
  )
};
