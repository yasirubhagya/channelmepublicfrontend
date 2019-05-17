
import { Mutation, Query } from "react-apollo";
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { getChannelChitsForaUser, DELETE_City} from '../../gql';


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
        height: '54px',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '46%',
        },

        [theme.breakpoints.up('md')]: {
            width: '30%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '22%',
        },
    },

    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },

});


class MyChannels extends Component {

    state = {
        City: {
            _id: '',
            name: '',
            createdById: ''
        },
        editMode: false
    }



    theme = createMuiTheme({
        palette: {
            primary: { main: lightGreen['A400'] }, // Purple and green play nicely together.
            secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
        },
        typography: { useNextVariants: true },
    });


    handleNameChange = (event) => {
        this.setState({ City: { ...this.state.City, name: event.target.value } });
    };




    render() {

        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={this.theme}>
               
                <Paper className={classes.root}>

                    <Query query={getChannelChitsForaUser}>

                        {({ loading, error, data }) => {
                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;
                            console.log(data);
                            return (
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Doctor's name</TableCell>
                                            <TableCell align="right">Channel Center</TableCell>
                                            <TableCell align="right">Chit NO</TableCell>
                                            <TableCell align="right">Date</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            data.getChannelChitsForaUser.map(item => (
                                                <TableRow key={item._id}>
                                                    <TableCell component="th" scope="row">
                                                        {item.channel.doctor.name}
                                                    </TableCell>
                                                    <TableCell align="right">{item.channel.channelCenter.name}</TableCell>
                                                    <TableCell align="right">{item.chitNo}</TableCell>
                                                    <TableCell align="right">{new Date(parseInt(item.channel.timeFrom)).toDateString()}</TableCell>
                                                    <TableCell align="right">{item.channel.status}</TableCell>
                                                    
                                                </TableRow>
                                            )
                                            )
                                        }

                                    </TableBody>
                                </Table>
                            )
                        }}

                    </Query>
                </Paper>

            </MuiThemeProvider>
        );
    }
}

export default withStyles(Styles)(MyChannels);