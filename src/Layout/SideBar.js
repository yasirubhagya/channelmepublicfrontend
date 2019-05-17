import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { NavLink } from 'react-router-dom';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

const theme = createMuiTheme({
    palette: {
        primary: { main: lightGreen['A400'] }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
    typography: { useNextVariants: true },
});



const AppDrawer = (props) => {

    const { classes, user } = props;
    const sideList = (
        <div className={classes.list}>
            <List>
                <NavLink style={{ textDecoration: 'none' }} to='/'>
                    <ListItem button>

                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary='Home' />

                    </ListItem>
                </NavLink>
            </List>
            <Divider />
            {
                !user &&
                <List>
                    <NavLink style={{ textDecoration: 'none' }} to='/SignIn'>
                        <ListItem button>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <ListItemText primary='Log In' />
                        </ListItem>
                    </NavLink>
                    <NavLink style={{ textDecoration: 'none' }} to='/SignUp'>
                        <ListItem button>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <ListItemText primary='Register' />
                        </ListItem>
                    </NavLink>
                </List>
            }
            <Divider />
            <List>
                {user &&
                    <NavLink style={{ textDecoration: 'none' }} to='/MyChannels'>
                        <ListItem button>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <ListItemText primary='My Channels' />
                        </ListItem>
                    </NavLink>
                }
                {user &&
                    <NavLink style={{ textDecoration: 'none' }} to='/SignOut'>
                        <ListItem button>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <ListItemText primary='Log out' />
                        </ListItem>
                    </NavLink>
                }
            </List>
        </div>
    );
    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <Drawer anchor="right" open={props.open} onClose={props.onClose}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={props.onClose}
                        onKeyDown={props.onClose}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </MuiThemeProvider>
        </div>

    );
}

AppDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(AppDrawer);
