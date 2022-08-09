import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useHistory } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { IButtonsNavBar } from './IButtonsNavBar';

const drawerWidth = 240;

export interface SideBarProps {
    dynamicButtons?: IButtonsNavBar[],
    selected: string,
    window?: () => Window;
}

const SideBarMenu: React.FC<SideBarProps> = ({ dynamicButtons, selected, window }) => {
    const history = useHistory();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const defautSideBarValues: IButtonsNavBar[] = [
        { path: `/home`, name: `Home` },
        { path: `/projects`, name: `Projects` }
    ];

    const btns: IButtonsNavBar[] = defautSideBarValues.concat(dynamicButtons)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {btns.map(value => (
                    <ListItem key={value.name.toString()} disablePadding>
                        <ListItemButton
                            selected={selected === value.path}
                        >
                            <ListItemText
                                primary={value.name}
                                onClick={() => {
                                    if (value.path !== selected) {
                                        history.push(value.path.toString())
                                    }
                                }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

SideBarMenu.defaultProps = {
    dynamicButtons: []
}


export default SideBarMenu