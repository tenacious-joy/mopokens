import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import CustomSnackBar from '../../Common/CustomSnackBar/CustomSnackBar';
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
            }
        const disabled = this.state.disabled;
        disabled[i] = true;
        this.setState({disabled});
        } else if (mopokens.length === 5) {
            this.setState({ errorOpen: true });
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
                    {
                        this.state.errorOpen ? <CustomSnackBar
                        type="error" timeout={3000}
                        message="Delete one/two mopokens to add new ones"
                        open /> : null
                    }
            </div>
        )
    }
}

export default MyProgress;