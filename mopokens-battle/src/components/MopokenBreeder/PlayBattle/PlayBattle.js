import React, { Component } from 'react';
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
                    this.state.open ? <MyProgress /> : null
                }
            </div>
        )
    }
}

export default PlayBattle;