import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

class CustomSnackBar extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  getStyle() {
    return {
      backgroundColor: this.props.type === 'error' ? '#E4153C' : '#00AB84',
      color: '#FFFFFF',
      textAlign: 'center',
      fontSize: '18px',
      width: '50pc',
    };
  }

  render() {
    return (
      <div>
        <Snackbar
          autoHideDuration={
            this.props.timeout ? this.props.timeout : null
          }
          bodyStyle={this.getStyle()}
          message={this.props.message}
          open={this.props.open}
        />
      </div>
      );
  }
}

export default CustomSnackBar;
