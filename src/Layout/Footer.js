import React from 'react';
import PropTypes from 'prop-types';
import {MuiThemeProvider,createMuiTheme,withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import lightGreen from '@material-ui/core/colors/lightGreen';
import color from '@material-ui/core/colors/lime';
import  Paper  from '@material-ui/core/Paper';

const theme = createMuiTheme({
    palette: {
      primary: { main: lightGreen['A400'] }, // Purple and green play nicely together.
      secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
    typography: { useNextVariants: true },
  });
  

const FooterStyles = {
    root: {
        width:'100%',
        height:'100px',
        display:'flex',
        borderRadius:0,
    },

    
    grow:{
        flexGrow: 1,
    },
    
};

const Footer = (props) => {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            I'm Foote
        </Paper>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(FooterStyles)(Footer);
