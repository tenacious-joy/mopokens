import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import MyProgress from '../MyProgress/MyProgress';

class PlayBattle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,  
        }
    }

    render() {
        return(
            <div>
                <RaisedButton id="playBattle" label="Pick a challenge"
                     secondary={true}
                onClick={() => this.setState({ open: true })}/>
                {
                    this.state.open ? <MyProgress user={this.props.user} /> : null
                }
            </div>
        )
    }
}

PlayBattle.propTypes = {
    user: PropTypes.string.isRequired,
}

export default PlayBattle;