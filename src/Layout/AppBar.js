import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import lightGreen from '@material-ui/core/colors/lightGreen';
import AppDrawer from './SideBar';
import '../App.css';
import img from '../logo.png';
import { NavLink } from 'react-router-dom';



const theme = createMuiTheme({
    palette: {
        primary: { main: lightGreen['A400'] }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
    typography: { useNextVariants: true },
});


const AppBarStyles = {
    root: {
        flexGrow: 1,
    },

    menuBar: {
        background: '#ffffff',
        height: '100px',
    },

    toolbar: {
        height: '100%',

    },
    button: {
        margin: '0.25rem'
    },
    grow: {
        flexGrow: 1,
    },
    SideBarButton: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },

    },
    actionSet: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },

    },
    placeholder: {
        display: 'flex',
    },
    logo: {
        width: '110px',
        height: '36px',
        margin: '0.25rem'
    }

};

const MenuBar = (props) => {
    const { classes ,user } = props;
    return (
        <div className={classes.root}>
            <AppBar className={classes.menuBar} position="static" color="default">
                <Toolbar className={classes.toolbar}>
                    <MuiThemeProvider theme={theme}>
                        <div className={classes.placeholder}>
                            <img className={classes.logo} alt='' src={img} />
                        </div>
                        <div className={classes.grow}></div>
                        <Typography variant="h4" color="primary">
                            Channel me
                    </Typography>

                        <div className={classes.grow}></div>
                        <div className={classes.actionSet}>
                        <NavLink style={{ textDecoration: 'none' }} to='/'>
                                <Button variant="outlined" color="primary" className={classes.button}>
                                    Home
                                </Button>
                            </NavLink>
                        { !user &&
                            <NavLink style={{ textDecoration: 'none' }} to='/SignIn'>
                                <Button variant="outlined" color="primary" className={classes.button}>
                                    LogIn
                                </Button>
                            </NavLink>
                        }
                        { !user &&
                            <NavLink style={{ textDecoration: 'none' }} to='/SignUp'>
                                <Button variant="outlined" color="primary" className={classes.button}>
                                    Register
                                </Button>
                            </NavLink>
                        }
                       
                        { user &&
                            (<NavLink style={{ textDecoration: 'none' }} to='/MyChannels'>
                                <Button variant="outlined" color="primary" className={classes.button}>
                                    My Channels
                                </Button>
                            </NavLink>
                            )
                        }
                        { user &&
                            (<NavLink style={{ textDecoration: 'none' }} to='/SignOut'>
                                <Button variant="outlined" color="primary" className={classes.button}>
                                    Log Out
                                </Button>
                            </NavLink>
                            )
                        }
                        </div>
                        <IconButton
                                color="primary"
                                aria-label="Open drawer"
                                onClick={props.onClose}
                                className={classes.SideBarButton}
                            >
                                <MenuIcon />
                            </IconButton>
                    </MuiThemeProvider>
                </Toolbar>
            </AppBar>
            <AppDrawer open = {props.open} onClose={props.onClose} user ={user}/>
        </div>
    );
}

MenuBar.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose:PropTypes.func.isRequired
};

export default withStyles(AppBarStyles)(MenuBar);
