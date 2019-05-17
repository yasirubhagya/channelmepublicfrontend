import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { Button, Paper, Divider } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        margin: theme.spacing.unit * 2,
    },
    list: {
        width: '100%',
        maxHeight: '600px',
        overflow: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',

        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    listItem: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '90%',
        },

        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '33.33%',
        },
    },

    expansionPanelDetails:{
        display:'inline-block',
        padding:theme.spacing.unit*4
    },

    subHeader: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderStyle: 'solid',
        borderWidth: 1,
    },

    grow: {
        flexGrow: 1,
        margin: '2px'
    },

    icon: {
        color: 'white',
    },
});



function AdvancedGridList(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <List className={classes.list} subheader={<div className={classes.subHeader} component="div" color='primary'>Search Results</div>}>
                {props.data && props.data.map((tile,index) => (
                    <ListItem className={classes.listItem} key={tile._id} >
                        <ExpansionPanel varient='outlined' className={classes.grow}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant='subtitle2' className={classes.heading}>{tile.doctor.name + ' is available on ' + new Date(parseInt(tile.timeFrom)).toLocaleDateString()}</Typography>
                            </ExpansionPanelSummary>
                            <Divider />
                            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                                
                                <Typography style={{display:'block'}} variant='body1'>
                                    Doctor : {tile.doctor.name}
                                 </Typography>
                                 
                                <Typography variant='body1'>
                                    Specialization : {tile.doctor.fieldOfConsulting.name}
                                 </Typography>
                                <Typography variant='body1'>
                                    Venue : {tile.channelCenter.name}
                                 </Typography>
                                <Typography variant='body1'>
                                    City : Colombo
                                 </Typography>
                                <Typography variant='body1'>
                                    Date : {new Date(parseInt(tile.timeFrom)).toLocaleDateString()}
                                 </Typography>
                                <Typography variant='body1'>
                                    Time : {new Date(parseInt(tile.timeFrom)).toLocaleTimeString()}
                                 </Typography>
                                 <Typography variant='body1'>
                                    Available Chit No : {tile.channelChit.length + 1}
                                 </Typography>


                            </ExpansionPanelDetails>
                            <ExpansionPanelActions>
                                <Button variant='outlined' size="medium" color="primary" onClick={()=>{props.SetSelectedChannelIndex(index);props.history.push('/Book')}}>
                                    Book
                                </Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>

                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

AdvancedGridList.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
};

export default withRouter(withStyles(styles)(AdvancedGridList));
