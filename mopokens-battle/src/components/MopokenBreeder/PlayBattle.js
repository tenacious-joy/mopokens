import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { mopokensMapper } from '../../assets/mopokensAdvantageMapper';

class PlayBattle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            play: true,
        }
        this.renderMopokenList = this.renderMopokenList.bind(this);
    }

    renderMopokenList() {
       // this.props.hideWelcome();
        return(
            <div>{mopokensMapper.fire}</div>
        ); 
    }

    render() {
        return(
            <div>
                {
                    this.state.play ? <RaisedButton label="PLAY NOW" secondary={true}
                onClick={() => this.setState({ open: true, play: false })}/> : null
                }
                {
                    this.state.open ? this.renderMopokenList() : null
                }
            </div>
        )
    }
}

export default PlayBattle;