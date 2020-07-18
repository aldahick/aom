import React from "react";
import {
  AppBar,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
  Link,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { observer } from "mobx-react";
import { ThemeSelect } from "./settings/ThemeSelect";
import { Grids } from "./util/Grids";
import { scenes } from "../scenes";

const useStyles = makeStyles({
  titleContainer: {
    marginLeft: "1em",
    marginRight: "2em"
  },
  titleText: {
    fontWeight: 600,
  },
  navbarLink: {
    color: "inherit",
    "&:hover": {
      textDecoration: "none"
    }
  },
  rightContainer: {
    flexGrow: 1
  }
});

export const Navbar: React.FC = observer(() => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item className={classes.titleContainer}>
            <Typography variant="h6" color="inherit" className={classes.titleText}>
              AOM
            </Typography>
          </Grid>
          {scenes.filter(s => !!s.navbarTitle).map(({ route, navbarTitle }) => (
            <Link component={RouterLink} to={route} className={classes.navbarLink}>
              <Typography color="inherit">{navbarTitle}</Typography>
            </Link>
          ))}
          <Grid item className={classes.rightContainer}>
            <Grids direction="row-reverse">
              <ThemeSelect />
            </Grids>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});
