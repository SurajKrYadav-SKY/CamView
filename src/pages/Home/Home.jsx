import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, Outlet, useLocation } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const location = useLocation();

  const getHeading = () => {
    switch (location.pathname) {
      case "/ticket_summary":
        return "Ticket Summary";
      case "/alert_dashboard":
        return "Alert Dashboard";
      case "/ticket_dashboard":
        return "Ticket Dashboard";
      case "/ticket_stats":
        return "Ticket Stats";
      default:
        return "Home";
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar (Navbar) with Custom Background */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "white", // Change this to your desired navbar color
          color: "#000000",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: "bold", fontSize: "26px" }}
          >
            {getHeading()}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
            <Typography
              variant="body1"
              sx={{ mr: 2, fontWeight: "600", fontSize: "20px" }}
            >
              Welcome, User!
            </Typography>
            <IconButton
              size="large"
              aria-label="show new notifications"
              color="inherit"
            >
              <NotificationsNoneIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (Sidebar) with Custom Background */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#3C4046", // Change this to your desired sidebar color
            color: "#ffffff", // Optional: Change text color in the sidebar
            borderRadius: "10px",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <ListItem disablePadding>
          <ListItemButton>
            <img
              src="./images/cam.png"
              alt=""
              style={{
                width: "150px",
                height: "50px",
                marginBottom: "20px",
                marginLeft: "18px",
                marginTop: "10px",
              }}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <List sx={{ marginLeft: "15px" }}>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/ticket_summary">
              <ListItemIcon>
                <PieChartIcon
                  sx={{
                    color: isActive("/ticket_summary") ? "#ffffff" : "#c0c0c0",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Ticket Summary"
                sx={{
                  fontWeight: isActive("/ticket_summary") ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/alert_dashboard">
              <ListItemIcon>
                <NotificationsActiveIcon
                  sx={{
                    color: isActive("/alert_dashboard") ? "#ffffff" : "#c0c0c0",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Alert Dashboard"
                sx={{
                  fontWeight: isActive("/alert_dashboard") ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/ticket_dashboard">
              <ListItemIcon>
                <NotificationsActiveIcon
                  sx={{
                    color: isActive("/ticket_dashboard")
                      ? "#ffffff"
                      : "#c0c0c0",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Ticket Dashboard"
                sx={{
                  fontWeight: isActive("/ticket_dashboard") ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/ticket_stats">
              <ListItemIcon>
                <BarChartIcon
                  sx={{
                    color: isActive("/ticket_stats") ? "#ffffff" : "#c0c0c0",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Ticket Stats"
                sx={{
                  fontWeight: isActive("/ticket_stats") ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
