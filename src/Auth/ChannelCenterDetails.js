import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const ChannelCenterDetailsStyles = theme => ({
    root:{
        margin:'1rem',
        display:'block'
    },
})

const ChannelCenterDetails = (props) => {
const {classes} = props
    return (
        <div className={classes.root}>
        <TextField
          label="RegNo"
          fullWidth={true}
          value={props.channelCenter.regNo}
          onChange={(event)=>props.handleSetChannelCenter({...props.channelCenter,regNo:event.target.value})}
          margin="normal"
          variant="outlined"
        />
        <TextField
          
          label="Name"
          fullWidth={true}
          value={props.channelCenter.name}
          onChange={(event)=>props.handleSetChannelCenter({...props.channelCenter,name:event.target.value})}
          margin="normal"
          variant="outlined"
        />
        <TextField
          
          label="Owner"
          fullWidth={true}
          value={props.channelCenter.owner}
          onChange={(event)=>props.handleSetChannelCenter({...props.channelCenter,owner:event.target.value})}
          margin="normal"
          variant="outlined"
        />
        <TextField
          
          label="Address"
          fullWidth={true}
          value={props.channelCenter.address}
          onChange={(event)=>props.handleSetChannelCenter({...props.channelCenter,address:event.target.value})}
          margin="normal"
          variant="outlined"
        />
        <TextField
          
          label="PhoneNo"
          fullWidth={true}
          value={props.channelCenter.phoneNo}
          onChange={(event)=>props.handleSetChannelCenter({...props.channelCenter,phoneNo:event.target.value})}
          margin="normal"
          variant="outlined"
        />
       
        </div>
    );
}

export default withStyles(ChannelCenterDetailsStyles)(ChannelCenterDetails);