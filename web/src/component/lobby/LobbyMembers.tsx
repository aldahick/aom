import React, { useState } from "react";
import { SocketEvent } from "../socket/SocketEvent";
import { ILobbyServerMembersPayload } from "../../graphql/types";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  memberContainer: {
    margin: "1em",
    padding: "1em"
  },
  championImageContainer: {
    width: 120,
    height: 120
  },
  spellImageContainer: {
    width: 64,
    height: 64
  }
});

export const LobbyMembers: React.FC = () => {
  const [members, setMembers] = useState<ILobbyServerMembersPayload["members"]>([]);
  const classes = useStyles();

  const onMembers = ({ members }: ILobbyServerMembersPayload) => {
    setMembers(members);
  };

  return (
    <SocketEvent name="lobby.server.members" handle={onMembers}>
      <Grid container direction="column" spacing={2}>
        {members.map(member => (
          <Grid item key={member.summonerName} xs={12} sm={8} md={6} lg={4}>
            <Paper className={classes.memberContainer}>
              <Typography variant="h6">{member.summonerName}</Typography>
              {member.champion && (
                <img src={member.champion.imageUrl} alt={`${member.champion.name}'s avatar`} title={member.champion.name} />
              )}
              {member.spell && (
                <img src={member.spell.imageUrl} alt={`${member.spell.name} icon`} title={member.spell.name} />
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </SocketEvent>
  )
};
