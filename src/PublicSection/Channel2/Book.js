import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { InlineDatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import AdvancedGridList from './ChannelContent';
import { GET_Doctors, GET_FieldOfConsultant, GET_Cities, GET_ChannelCenters, SEARCH_Channels } from '../../gql';
import { Query, ApolloConsumer } from 'react-apollo';
import Select from './SelectComponent';





const Styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: theme.spacing.unit * 2,

    },
    selectionRoot: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formRoot: {
        flexGrow: 1,
        textAlign: 'center'
    },
    formControl: {
        margin: theme.spacing.unit,
        height: '73px',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '46%',
        },

        [theme.breakpoints.up('md')]: {
            width: '30%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '15%',
        },
    },
    button: {
        margin:theme.spacing.unit,
        marginLeft: theme.spacing.unit*2,
        height: '50px',
        width: '200px'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },

});

class Book extends Component {
    doctorlabelWidth = 0;
    theme = createMuiTheme({
        palette: {
            primary: { main: lightGreen[600] }, // Purple and green play nicely together.
            secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
        },
        typography: { useNextVariants: true },
    });

    state = {

        name: '',


    };

    handleChange = (e) => {

    }


    render() {

        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={this.theme}>
                {this.props.user ?
                    <Paper className={classes.root} elevation={2}>
                        <div className={classes.selectionRoot}>
                            <h4>Your Loged In as {this.props.user.name}</h4>
                             {console.log(this.props.data[this.props.SelectedChannelIndex])}
                            <Button variant='outlined' color='primary' className={classes.button}> Confirm Booking </Button>
                        </div>
                    </Paper>
                    :
                    <Paper className={classes.root} elevation={2}>
                        <div className={classes.selectionRoot}>
                            <form className={classes.formRoot} autoComplete="off">
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <TextField
                                        label="Name"
                                        className={classes.textField}
                                        value={this.state.name}
                                        onChange={this.handleChange('name')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <TextField
                                        label="NIC NO"
                                        className={classes.textField}
                                        value={this.state.name}
                                        onChange={this.handleChange('name')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <TextField
                                        label="E-Mail"
                                        className={classes.textField}
                                        value={this.state.name}
                                        onChange={this.handleChange('name')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <TextField
                                        label="Phone NO"
                                        className={classes.textField}
                                        value={this.state.name}
                                        onChange={this.handleChange('name')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>


                            </form>
                        </div>
                    </Paper>
                }
            </MuiThemeProvider>
        );
    }
}

Book.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object
};

export default withStyles(Styles)(Book);
