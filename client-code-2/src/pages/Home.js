import React from "react";
import { Button, Typography, Container, Box, CssBaseline, Drawer, AppBar, Toolbar, List, Divider, IconButton, Badge, Grid, Paper, Link, } from "@mui/material";
import { ChevronLeft as ChevronLeftIcon, Notifications as NotificationsIcon, Menu as MenuIcon, LogoutOutlined} from "@mui/icons-material"
import { useToast } from 'rc-toastr';
import { mainListItems, secondaryListItems } from "../components/listItems";


const Home = ({ setAuth }) => {
  const { toast } = useToast();

  const {token} = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : null; 

  const handleLogout = () => { 
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      localStorage.removeItem("data");
      setAuth(false);
      localStorage.setItem("logout", Date.now());
      toast.info("Logout!!")
    });
  }

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <CssBaseline />
      <AppBar
        position="absolute"
      >
        <Toolbar >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
      >
        <div >
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main >
        <div />
        <Container maxWidth="lg" >
          <Grid container spacing={3} gap={5} padding={10} marginTop={10}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={12}>
              <Paper>
                {/* <Chart /> */}
                <img src="https://h3d9f2s8.rocketcdn.me/wp-content/uploads/2022/08/Power-BI-Dashboard.png" alt="https://h3d9f2s8.rocketcdn.me/wp-content/uploads/2022/08/Power-BI-Dashboard.png" />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper>
                {/* <Deposits /> */}
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper >
                {/* <Orders /> */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Home;
