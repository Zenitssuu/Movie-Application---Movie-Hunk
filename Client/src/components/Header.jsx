import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/UserSlice";

const drawerWidth = 240;

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    // {
    //   text: "Home",
    //   url: "/",
    //   authStatus: null,
    // },
    // {
    //   text: "Dashboard",
    //   url: "/Dashboard",
    //   authStatus: null,
    // },
    {
      text: "SignIn",
      url: "/signin",
      authStatus: !isAuthenticated,
    },
    {
      text: "SignUp",
      url: "/signup",
      authStatus: !isAuthenticated,
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, color: "#e0e0e0", fontWeight: "bold" }}>
        <Link to="/" className="">
          Movie Hunk
        </Link>
      </Typography>
      <Divider sx={{ bgcolor: "#424242" }} />
      <List>
        {navItems.map((item) =>
          item.authStatus === null || item.authStatus ? (
            <Link to={item.url} key={item.url} style={{ textDecoration: 'none' }}>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center", color: "#e0e0e0" }}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ) : null
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", position: "fixed", top: 0, zIndex: 1201 }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          bgcolor: "#212121", // Dark gray background for AppBar
          color: "#e0e0e0", // Light gray text color
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
          borderBottom: "1px solid #424242",
        }}
        position="fixed"
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              letterSpacing: 1.5,
              display: { sm: "block" },
            }}
          >
            <Link to={"/"}>
              Movie Hunk
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) =>
              item.authStatus === null || item.authStatus ? (
                <Link to={item.url} key={item.url} style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{
                      color: "#e0e0e0",
                      mx: 1,
                      '&:hover': {
                        bgcolor: "#424242", // Darker gray on hover
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                </Link>
              ) : null
            )}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {isAuthenticated && (
            <Button
              variant="contained"
              color="error"
              sx={{
                ml: 2,
                bgcolor: "#b71c1c",
                '&:hover': { bgcolor: "#d32f2f" },
              }}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "#303030", // Darker gray for drawer
              color: "#e0e0e0",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
