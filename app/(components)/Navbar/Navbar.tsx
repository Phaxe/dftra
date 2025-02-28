"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import {
  Search,
  Home,
  Work,
  Business,
  Notifications,
  Message,
  ExpandMore,
  Menu as MenuIcon,
} from "@mui/icons-material";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <AppBar position="sticky" className="bg-white shadow-md px-4">
      <Toolbar className="flex justify-between items-center">
        {/* Left Section - Logo & Search */}
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg text-blue-600">Logo</span>
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <InputBase
              placeholder="Search..."
              className="pl-10 pr-3 py-1 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Desktop Icons */}
        <div className="hidden sm:flex items-center gap-6 text-gray-600">
          {[
            { icon: <Home />, text: "Home" },
            { icon: <Work />, text: "Jobs" },
            { icon: <Business />, text: "Employers" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer hover:text-blue-500"
            >
              <IconButton>{item.icon}</IconButton>
              <span className="text-xs">{item.text}</span>
            </div>
          ))}

          {/* Divider */}
          <span className="text-gray-300">|</span>

          {[
            { icon: <Notifications />, text: "Notifications" },
            { icon: <Message />, text: "Messaging" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer hover:text-blue-500"
            >
              <IconButton>{item.icon}</IconButton>
              <span className="text-xs">{item.text}</span>
            </div>
          ))}
          {/* Profile Section */}
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={handleMenuOpen}
          >
               <Avatar src="/profile.jpg" className="w-8 h-8" />
            <div>
           
              <span className="hidden text-white sm:block text-sm font-medium">
                Profile
                <ExpandMore className="text-white" />
              </span>
          
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
       <div className="xl:hidden">
       <IconButton  onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
       </div>
      </Toolbar>

      {/* Profile Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <div className="px-4 py-2 flex items-center gap-3">
          <Avatar src="/profile.jpg" className="w-12 h-12" />
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-500">Software Engineer</p>
          </div>
        </div>
        <Divider />
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Language</MenuItem>
        <MenuItem onClick={handleMenuClose}>Help</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} className="text-red-600">
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List className="w-64">
          {["Home", "Jobs", "Employers", "Notifications", "Messaging"].map(
            (text) => (
              <ListItem key={text} onClick={handleDrawerToggle}>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}
