"use client";

import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Settings,
  ExpandLess,
  ExpandMore,
  Dashboard,
  Work,
  ContactMail,
  Info,
  CheckCircle,
  Cancel,
  DragIndicator,
} from "@mui/icons-material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface MenuItem {
  id: string;
  text: string;
  icon?: JSX.Element;
  children?: MenuItem[];
}

// Initial Sidebar Menu
const initialMenuItems: MenuItem[] = [
  { id: "dashboard", text: "Dashboard", icon: <Dashboard /> },
  { id: "jobApplications", text: "Job Applications", icon: <Work /> },
  { id: "qualifications", text: "Qualifications", icon: <Work /> },
  { id: "about", text: "About", icon: <Info /> },
  { id: "contact", text: "Contact", icon: <ContactMail /> },
];

// Drag and Drop Item Type
const ItemType = "MENU_ITEM";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [navItems, setNavItems] = useState<MenuItem[]>(initialMenuItems);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Toggle Sidebar on Mobile
  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  // Toggle Edit Mode
  const toggleEditMode = () => setEditMode(!editMode);

  // Toggle Expand/Collapse Submenus
  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Move Item in List
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const updatedItems = [...navItems];
    const [movedItem] = updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, movedItem);
    setNavItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleMobileMenu}>
        <div className="w-64 bg-gray-100 h-full p-4">
          <IconButton onClick={toggleMobileMenu}>
            <MenuIcon />
          </IconButton>
          <NavList items={navItems} expanded={expanded} toggleExpand={toggleExpand} editMode={editMode} moveItem={moveItem} />
        </div>
      </Drawer>

      {/* Desktop Sidebar */}
      <div className="hidden sm:flex flex-col bg-gray-100 w-64 h-screen p-4">
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-gray-300">
          <h2 className="text-lg font-bold text-gray-800">Menu</h2>
          {editMode ? (
            <div className="flex gap-2">
              <CheckCircle className="text-green-500 cursor-pointer" onClick={toggleEditMode} />
              <Cancel className="text-red-500 cursor-pointer" onClick={toggleEditMode} />
            </div>
          ) : (
            <IconButton onClick={toggleEditMode}>
              <Settings className="text-gray-500" />
            </IconButton>
          )}
        </div>

        {/* Navigation List */}
        <NavList items={navItems} expanded={expanded} toggleExpand={toggleExpand} editMode={editMode} moveItem={moveItem} />
      </div>

      {/* Mobile Menu Button */}
      <IconButton className="sm:hidden fixed top-4 right-4 z-50" onClick={toggleMobileMenu}>
        <MenuIcon />
      </IconButton>
    </DndProvider>
  );
}

// Sidebar Navigation List
interface NavListProps {
  items: MenuItem[];
  expanded: Record<string, boolean>;
  toggleExpand: (id: string) => void;
  editMode: boolean;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

function NavList({ items, expanded, toggleExpand, editMode, moveItem }: NavListProps) {
  return (
    <List>
      {items.map((item, index) => (
        <DraggableItem key={item.id} index={index} item={item} expanded={expanded} toggleExpand={toggleExpand} editMode={editMode} moveItem={moveItem} />
      ))}
    </List>
  );
}

// Draggable Sidebar Item
interface DraggableItemProps {
  item: MenuItem;
  index: number;
  expanded: Record<string, boolean>;
  toggleExpand: (id: string) => void;
  editMode: boolean;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

function DraggableItem({ item, index, expanded, toggleExpand, editMode, moveItem }: DraggableItemProps) {
  const ref = useDragDrop(index, moveItem);

  return (
    <div ref={ref}>
      <ListItemButton onClick={() => item.children && toggleExpand(item.id)} className="cursor-pointer">
        {editMode && <DragIndicator className="text-gray-500 mr-2 cursor-grab" />}
        {item.icon && <span className="mr-2">{item.icon}</span>}
        <ListItemText primary={item.text} />
        {item.children?.length > 0 && (expanded[item.id] ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>

      {/* Nested Items */}
      {item.children?.length > 0 && (
        <Collapse in={expanded[item.id]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <ListItemButton key={child.id} className="pl-6">
                <ListItemText primary={child.text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </div>
  );
}

// Custom Hook for Drag & Drop
function useDragDrop(index: number, moveItem: (dragIndex: number, hoverIndex: number) => void) {
  const ref = useState<HTMLDivElement | null>(null)[0];

  useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })[1](ref);

  useDrop({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  })[1](ref);

  return ref;
}
