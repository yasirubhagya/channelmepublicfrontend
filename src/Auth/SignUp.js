import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Mutation } from "react-apollo";
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import lightGreen from '@material-ui/core/colors/lightGreen';
import SignInWithGoogle from './SignInWithGoogle';
import { SignUpNormalUser } from '../gql';
const Styles = theme => ({
    card: {
        maxWidth: '600px',
        margin: '0.5rem'
    },
    root: {
        width: '100%',
        textAlign: 'left',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },

});


function getSteps() {
    return ['SignUp with Google', 'Confirm Registration'];
}

function getStepContent(step, varthis) {

    switch (step) {
        case 0:
            return (
                <SignInWithGoogle user={varthis.state.user} handleSetUser={varthis.handleSetUser} />

            );
        case 1:
            return (
                ''
            );
        default:
            return 'Unknown step';
    }
}

class SignUp extends Component {
    theme = createMuiTheme({
        palette: {
            primary: { main: lightGreen[600] }, // Purple and green play nicely together.
            secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
        },
        typography: { useNextVariants: true },
    });
    state = {
        activeStep: 0,
        user: {
            googleId: '',
            email: '',
            name: '',
            picture: '',
            userType: ''
        },
        authToken: null
    };

    handleSetUser = (user) => {
        this.setState({
            user: {
                googleId: user.googleId,
                email: user.email,
                name: user.name,
                picture: user.picture,
                userType: user.userType
            },
            authToken: user.authToken
        });
    }

    handleSetChannelCenter = (ChannelCenter) => {
        this.setState({
            channelCenter: { ...ChannelCenter }
        });
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
            user: {
                googleId: '',
                email: '',
                name: '',
                picture: '',
                userType: ''
            },
            authToken: null
        });
    };




    render() {

        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <MuiThemeProvider theme={this.theme}>
                <Card className={classes.card}>
                    <CardHeader title={<Typography variant="h4" color="primary">SignUp To Our Service</Typography>} />
                    <Divider />
                    <CardContent className={classes.root}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        <div>{getStepContent(index, this)}</div>
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={this.handleBack}
                                                    className={classes.button}
                                                >
                                                    Back
                                                </Button>
                                                {activeStep === steps.length - 1 ?
                                                    <Mutation mutation={SignUpNormalUser} context={{ headers: { authorization: this.state.authToken ? `Bearer ${this.state.authToken}` : null } }} onError={(error) => { localStorage.removeItem('user'); localStorage.removeItem('authToken'); this.handleReset(); alert(error) }} onCompleted={(data) => {alert(data + " is added success fully");this.props.setUserHandle(data.SignUpNormalUser);this.props.history.push('/') }}>
                                                        {(SignUpNormalUser, { loading, error, data }) => (
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => {
                                                                    SignUpNormalUser({
                                                                        variables: null
                                                                    })
                                                                        .catch(error => { console.log(error) })
                                                                    this.handleNext()
                                                                }}
                                                                className={classes.button}
                                                            >
                                                                CONFIRM
                                                            </Button>
                                                        )}
                                                    </Mutation>
                                                    :
                                                    <Button
                                                        variant="contained"
                                                        disabled={
                                                            (activeStep === 0 && this.state.user.googleId === '')
                                                        }
                                                        color="primary"
                                                        onClick={this.handleNext}
                                                        className={classes.button}
                                                    >
                                                        NEXT
                                                    </Button>
                                                }

                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} className={classes.resetContainer}>
                                <Typography>All steps completed - you&apos;re finished with registration, SignIn with Google to continue </Typography>
                            </Paper>
                        )}
                    </CardContent>
                </Card>
            </MuiThemeProvider>


        );
    }

}

export default withRouter(withStyles(Styles)(SignUp));