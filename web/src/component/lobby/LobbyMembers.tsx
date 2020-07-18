import React, { useState } from "react";
import { SocketEvent } from "../socket/SocketEvent";
import { ILobbyServerMembersPayload } from "../../graphql/types";
import { Grid, Typography, Paper } from "@material-ui/core";

export const LobbyMembers: React.FC = () => {
  const [members, setMembers] = useState<ILobbyServerMembersPayload["members"]>([]);

  const onMembers = ({ members }: ILobbyServerMembersPayload) => {
    setMembers(members);
  };

  return (
    <SocketEvent name="lobby.server.members" handle={onMembers}>
      <Grid container spacing={2}>
        {members.map(member => (
          <Grid item key={member.summonerName}>
            <Paper>
              <Typography variant="h6">{member.summonerName}</Typography>
              {member.champion && (
                <img src={member.champion.imageUrl} alt={`${member.champion.name}'s avatar`} title={member.champion.name} />
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </SocketEvent>
  )
};
