import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import { mopokensMapper } from '../../../assets/mopokensAdvantageMapper';

class MyProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: Array(Object.keys(mopokensMapper).length).fill(false),
            mopokens: [],
            errorOpen: false,
        };
        this.selectMopoken = this.selectMopoken.bind(this);
    }

    selectMopoken(mopoken,i) {
        const mopokens = this.state.mopokens;
        if (mopokens.length < 5) {
            if (!mopokens.includes(mopoken)) {
                mopokens.push(mopoken);
                this.setState({mopokens});
            } else if (mopokens.length === 5) {
                this.setState({ errorOpen: true });
            }
        const disabled = this.state.disabled;
        disabled[i] = true;
        this.setState({disabled});
        }  
    }

    render() {
        return(
            <div id="mopoken">
                {
                    Object.keys(mopokensMapper).map((type, i) => (
                        <Badge
                badgeContent={0}
                key={'badge'+i}
                secondary={true}
                badgeStyle={{top: 12, right: 12}}
            ><FlatButton id={'btn'+i}
            disabled={this.state.disabled[i]}
            label={type}
            onClick={() => this.selectMopoken(type,i)} primary={true} />
            </Badge>
                    ))
                }
                    <div id="chipText" style={{display: 'flex',
    flexWrap: 'wrap', border: '1px solid grey'}}>{this.state.mopokens.map((mopoken, j) => (
                        <Chip className="chip"
                        key={'chip'+j} style={{margin: 10}}>{mopoken}</Chip>
                    ))}</div>
            </div>
        )
    }
}

export default MyProgress;