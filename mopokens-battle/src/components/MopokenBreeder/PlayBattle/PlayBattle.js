import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import MyProgress from '../MyProgress/MyProgress';

class PlayBattle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            hideBtn: false
        }
        this.callBack = this.callBack.bind(this);
    }

    callBack(hideBtn) {
        this.setState({ hideBtn });
    }

    render() {
        return(
            <div>
                { !this.state.hideBtn ? <RaisedButton id="playBattle" label="Pick a challenge"
                     secondary={true}
                onClick={() => this.setState({ open: true })}/> : null }
                {
                    this.state.open ? <MyProgress user={this.props.user} callBack={this.callBack} /> : null
                }
            </div>
        )
    }
}

PlayBattle.propTypes = {
    user: PropTypes.string.isRequired,
}

export default PlayBattle;