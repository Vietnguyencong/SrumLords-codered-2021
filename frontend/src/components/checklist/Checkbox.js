import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import ListSubheader from "@mui/material/ListSubheader";
import Select from "src/components/checklist/Select";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function InsetList({ setcheck1, setcheck2, setcheck3 }) {
  return (
    <List
      sx={{ width: "100%", maxWidth: 900, bgcolor: "background.paper" }}
      aria-label="contacts"
    >
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Select />
          </ListItemIcon>
          <ListItemText
            length={50}
            primary="First-Aid Kits are accessible and stocked for workers"
          />
        </ListItemButton>
        <IconButton>
          <CommentIcon />
        </IconButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Select />
          </ListItemIcon>
          <ListItemText primary="Supervisory Safety Manual is on site along with accident report forms" />
        </ListItemButton>
        <IconButton>
          <CommentIcon />
        </IconButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Select />
          </ListItemIcon>
          <ListItemText primary="Chemicals and containers are labelled according to Government Regulations" />
        </ListItemButton>
        <IconButton>
          <CommentIcon />
        </IconButton>
      </ListItem>
    </List>
  );
}
