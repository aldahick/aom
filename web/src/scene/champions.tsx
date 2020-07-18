import React from "react";
import gql from "graphql-tag";
import { checkQueryResult } from "../util/graphql"
import { useQuery } from "react-apollo";
import { IQuery } from "../graphql/types";
import { Grid, Typography } from "@material-ui/core";

const QUERY_CHAMPIONS = gql`
query Web_Champions {
  champions {
    name
    imageUrl
  }
}
`;

export const ChampionsScene: React.FC = () => {
  return checkQueryResult<{ champions: IQuery["champions"] }>(({ champions }) => (
    <Grid container>
      {champions.map(({ name, imageUrl }) => (
        <Grid item>
          <Typography>{name}</Typography>
          <img src={imageUrl} alt={`${name}'s avatar`} title={name} />
        </Grid>
      ))}
    </Grid>
  ))(useQuery(QUERY_CHAMPIONS));
};
