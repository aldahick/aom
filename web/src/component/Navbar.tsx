import React from "react";
import {
  AppBar,
  Grid,
  Link,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { observer } from "mobx-react";
import { Link as RouterLink } from "react-router-dom";
import { scenes } from "../scenes";
import { ThemeSelect } from "./settings/ThemeSelect";

const useStyles = makeStyles({
  titleContainer: {
    marginLeft: "1em",
    marginRight: "2em",
  },
  titleText: {
    fontWeight: 600,
  },
  navbarLink: {
    "color": "inherit",
    "&:hover": {
      textDecoration: "none",
    },
  },
  rightContainer: {
    flexGrow: 1,
  },
});

export const Navbar: React.FC = observer(() => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <Grid container alignItems="center" spacing={2}>
          <Grid item className={classes.titleContainer}>
            <Typography variant="h6" color="inherit" className={classes.titleText}>
              AOM
            </Typography>
          </Grid>
          {scenes.filter(s => !!s.navbarTitle).map(({ route, navbarTitle }) => (
            <Grid item key={route}>
              <Link component={RouterLink} to={route} className={classes.navbarLink}>
                <Typography color="inherit">{navbarTitle}</Typography>
              </Link>
            </Grid>
          ))}
          <Grid item className={classes.rightContainer}>
            <Grid container direction="row-reverse">
              <Grid item>
                <ThemeSelect />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});
