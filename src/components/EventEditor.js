import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

function getModalStyle() {
  const top = 20;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${left}%, -${top}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
/*
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  */
});


class EventEditor extends React.Component {

  handleClose = () => {
    this.props.toggleEventEditor();
  };

  render() {
    const { classes } = this.props;
	const { holiday, birthday, busy, anniversary, } = this.props.events;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
	          <div className={classes.root}>
		        <FormControl component="fieldset" className={classes.formControl}>
		          <FormLabel component="legend">Event(s) on the day:</FormLabel>
		          <FormGroup>
		            <FormControlLabel
		              control={
		                <Checkbox checked={holiday} onChange={this.props.toggleEvent('holiday')} value="holiday" />
		              }
		              label="Holiday"
		            />
		            <FormControlLabel
		              control={
		                <Checkbox checked={birthday} onChange={this.props.toggleEvent('birthday')} value="birthday" />
		              }
		              label="Birthday"
		            />
		            <FormControlLabel
		              control={
		                <Checkbox checked={busy} onChange={this.props.toggleEvent('busy')} value="busy" />
		              }
		              label="Busy"
		            />
		            <FormControlLabel
		              control={
		                <Checkbox checked={anniversary} onChange={this.props.toggleEvent('anniversary')} value="anniversary" />
		              }
		              label="Anniversary"
		            />
		          </FormGroup>
		          <FormHelperText>You can choose more than one event.</FormHelperText>
		        </FormControl>
		       </div>
	          <Button onClick={this.handleClose}>OK</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

EventEditor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventEditor);

