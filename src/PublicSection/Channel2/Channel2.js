import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';
import { InlineDatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { GET_Doctors, GET_FieldOfConsultant, GET_Cities, GET_ChannelCenters, SEARCH_Channels } from '../../gql';
import { Query, ApolloConsumer } from 'react-apollo';
import Select from './SelectComponent';





const Channel2Styles = theme => ({
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
        height:'73px',
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
        height:'73px',
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
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },

});

class Channel2 extends Component {
    doctorlabelWidth = 0;
    theme = createMuiTheme({
        palette: {
            primary: { main: lightGreen[600] }, // Purple and green play nicely together.
            secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
        },
        typography: { useNextVariants: true },
    });

    state = {

        searchParams: {
            doctorId: '',
            consultantTypeId: '',
            channelCenterId: '',
            cityId: '',
            date: new Date()
        },
        channels: []

    };

    handleDoctorChange = (e) => {
        this.setState({ searchParams: { ...this.state.searchParams, doctorId:e? e.value :'' } });
    }

    handleConsultantTypeChange = (e) => {
        this.setState({ searchParams: { ...this.state.searchParams, consultantTypeId: e? e.value :'' } });
    }

    handleChannelCenterChange = (e) => {
        this.setState({ searchParams: { ...this.state.searchParams, channelCenterId: e? e.value :''} });
    }
    handleCityChange = (e) => {
        this.setState({ searchParams: { ...this.state.searchParams, cityId: e? e.value :'' } });
    }
    handleDateChange = (date) => {
        this.setState({ searchParams: { ...this.state.searchParams, date: date } });
    }

    render() {

        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={this.theme}>
                <Paper className={classes.root} elevation={2}>
                    <div className={classes.selectionRoot}>
                        <form className={classes.formRoot} autoComplete="off">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <Query query={GET_Doctors}>
                                    {({ loading, error, data }) => {
                                        if (loading) return <p>Loading...</p>;
                                        if (error) return <MenuItem value=''>Error...</MenuItem>;
                                        let options = data.doctors.map(item => ({
                                            value: item._id,
                                            label: item.name,
                                        }));
                                        return (
                                            <Select placeholder='Doctor' options={options} handleChange={this.handleDoctorChange} />
                                        )
                                    }}
                                </Query>
                            </FormControl>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <Query query={GET_FieldOfConsultant}>
                                    {({ loading, error, data }) => {
                                        if (loading) return <p>Loading...</p>;
                                        if (error) return <MenuItem value=''>Error...</MenuItem>;
                                        let options = data.consultantType.map(item => ({
                                            value: item._id,
                                            label: item.name,
                                        }));
                                        return (
                                            <Select placeholder='Specialisation' options={options} handleChange={this.handleConsultantTypeChange} />
                                        )
                                    }}
                                </Query>
                            </FormControl>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <Query query={GET_ChannelCenters}>
                                    {({ loading, error, data }) => {
                                        if (loading) return <p>Loading...</p>;
                                        if (error) return <MenuItem value=''>Error...</MenuItem>;
                                        let options = data.channelCenters.map(item => ({
                                            value: item._id,
                                            label: item.name,
                                        }));
                                        return (
                                            <Select placeholder='Channel Center' options={options} handleChange={this.handleChannelCenterChange} />
                                        )
                                    }}
                                </Query>
                            </FormControl>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <Query query={GET_Cities}>
                                    {({ loading, error, data }) => {
                                        if (loading) return <p>Loading...</p>;
                                        if (error) return <MenuItem value=''>Error...</MenuItem>;
                                        let options = data.cities.map(item => ({
                                            value: item._id,
                                            label: item.name,
                                        }));
                                        return (
                                            <Select placeholder='City' options={options} handleChange={this.handleCityChange} />
                                        )
                                    }}
                                </Query>
                            </FormControl>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <InlineDatePicker
                                    keyboard
                                    clearable
                                    variant="outlined"

                                    value={this.state.searchParams.date}
                                    onChange={this.handleDateChange}
                                    format="dd/MM/yyyy"
                                    mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                                    className={classes.formControl}
                                />
                            </MuiPickersUtilsProvider>
                            
                                <ApolloConsumer>
                                    {client => (
                                        
                                            <Button variant="outlined" color="primary" fullWidth className={classes.formControl}
                                                onClick={async () => {
                                                    const { data } = await client.query({
                                                        query: SEARCH_Channels,
                                                        variables: {
                                                            doctorId: this.state.searchParams.doctorId,
                                                            consultantTypeId:this.state.searchParams.consultantTypeId,
                                                            channelCenterId:this.state.searchParams.channelCenterId,
                                                            cityId:this.state.searchParams.cityId,
                                                            date: this.state.searchParams.date
                                                        }
                                                    });
                                                   
                                                    this.props.setChannels(data.searchChannels);
                                                    this.props.history.push('/SerchResult')
                                                }
                                                }
                                            >
                                                Search
                                        </Button>
                                        
                                    )}
                                </ApolloConsumer>
                            

                        </form>
                    </div>

                </Paper>
            </MuiThemeProvider>
        );
    }
}

Channel2.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
};

export default withRouter(withStyles(Channel2Styles)(Channel2));
