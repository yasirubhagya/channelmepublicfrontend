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
import { ADD_ChannelChit } from '../../gql';
import Typography from '@material-ui/core/Typography';
import { Query, ApolloConsumer, Mutation } from 'react-apollo';
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
        margin: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 2,
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
        nicNo: '',
        email: '',
        phoneNo: '',
        bookedChannelChit: null
    };

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    }
    handleNicNoChange = (e) => {
        this.setState({ nicNo: e.target.value });
    }
    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }
    handlePhoneNOChange = (e) => {
        this.setState({ phoneNo: e.target.value });
    }

    handleComplete = (data) => {
        this.setState({ bookedChannelChit: data.addChannelChit });
    }


    render() {

        const { classes } = this.props;
        if (this.props.data.length) {
            return (
                <MuiThemeProvider theme={this.theme}>
                    {!this.state.bookedChannelChit ?
                        <React.Fragment>
                            {this.props.user ?

                                <Paper className={classes.root} elevation={2}>
                                    <div className={classes.selectionRoot}>
                                        <h4>Your Loged In as {this.props.user.name}</h4>
                                        <Mutation mutation={ADD_ChannelChit} context={{ headers: { authorization: this.props.user ? `Bearer ${localStorage.getItem('authToken')}` : null } }} onError={(error) => { alert(error) }} onCompleted={(data) => { this.handleComplete(data) }}>
                                            {(addChannelChit, { loading, error, data }) => (

                                                <Button variant='outlined' color='primary' className={classes.button} onClick={
                                                    () => {
                                                        addChannelChit({
                                                            variables: { channelId: this.props.data[this.props.SelectedChannelIndex]._id }
                                                        })
                                                            .catch(error => { console.log(error) })
                                                    }
                                                }> Confirm Booking </Button>
                                            )}
                                        </Mutation>
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
                                                    onChange={this.handleNameChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <TextField
                                                    label="NIC NO"
                                                    className={classes.textField}
                                                    value={this.state.nicNo}
                                                    onChange={this.handleNicNoChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <TextField
                                                    label="E-Mail"
                                                    className={classes.textField}
                                                    value={this.state.email}
                                                    onChange={this.handleEmailChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <TextField
                                                    label="Phone NO"
                                                    className={classes.textField}
                                                    value={this.state.phoneNo}
                                                    onChange={this.handlePhoneNOChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                            <Mutation mutation={ADD_ChannelChit} onError={(error) => { alert(error) }} onCompleted={(data) => { this.handleComplete(data) }}>
                                                {(addChannelChit, { loading, error, data }) => (
                                                    <Button variant='outlined' color='primary' className={classes.button} onClick={
                                                        () => {
                                                            addChannelChit({
                                                                variables: {
                                                                    name: this.state.name,
                                                                    nicNO: this.state.nicNo,
                                                                    email: this.state.email,
                                                                    phoneNo: this.state.phoneNo,
                                                                    channelId: this.props.data[this.props.SelectedChannelIndex]._id
                                                                }
                                                            })
                                                                .catch(error => { console.log(error) })
                                                        }
                                                    }> Confirm Booking </Button>
                                                )}
                                            </Mutation>


                                        </form>
                                    </div>
                                </Paper>
                            }
                        </React.Fragment>
                        :
                        <Paper className={classes.root} elevation={2}>

                            {console.log(this.state.bookedChannelChit)}
                            <Typography style={{ display: 'block' }} variant='body1'>
                                Doctor :{this.state.bookedChannelChit.channel.doctor.name}
                            </Typography>
                            <Typography style={{ display: 'block' }} variant='body1'>
                                channelcenter :{this.state.bookedChannelChit.channel.channelCenter.name}
                            </Typography>
                            <Typography style={{ display: 'block' }} variant='body1'>
                                date :{new Date(parseInt(this.state.bookedChannelChit.channel.timeFrom)).toLocaleString()}
                            </Typography>
                            <Typography style={{ display: 'block' }} variant='body1'>
                                chitNo :{this.state.bookedChannelChit.chitNo}
                            </Typography>

                        </Paper>
                    }

                </MuiThemeProvider>

            );
        }
        return (
            <Paper className={classes.root} elevation={2}>
                <div className={classes.selectionRoot}>
                    <h4>No data Available</h4>
                </div>
            </Paper>
        )

    }
}

Book.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object
};

export default withStyles(Styles)(Book);
