import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Badge from 'material-ui/Badge';
import FlatButton from 'material-ui/FlatButton';
import SelectedMopoken from '../SelectedMopokens/SelectedMopoken';
import axios from 'axios';

class MyProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mopokens: [],
            disabled: [],
            errorOpen: false,
            uri: 'http://localhost:3001',
            initialData: [],
        };
        this.selectMopoken = this.selectMopoken.bind(this);
        this.enableReferenceMopoken = this.enableReferenceMopoken.bind(this);
        this.callBack = this.callBack.bind(this);
        this.loadBreederMopokens();
    }

    callBack() {
        this.setState({mopokens: []});
        this.setState({initialData: []});
        this.props.callBack(true);
    }

    loadBreederMopokens() {
        axios.get(`${this.state.uri}/api/getBreederLevels?email=${this.props.user}`)
    .then(res => {
        this.setState({ initialData: res.data.mopokens.slice() });
    });
    }

    selectMopoken(mopoken,i) {
        let mopokens = this.state.mopokens;
        let disabled = this.state.disabled;
        if (mopokens.length < 5) {
            const existingMopoken = mopokens.filter((mopo) => mopo.type === mopoken.type);
            if (existingMopoken.length === 0) {
                mopokens.push({type: mopoken.type, level: mopoken.level, disabled: false });
                this.setState({mopokens});
            }
           const existingDisabled = disabled.filter((mopo) => mopo.type === mopoken.type);
        if (disabled.length === 0 || existingDisabled.length === 0) {
            disabled.push({type: mopoken.type, level: mopoken.level, disabled: true});
            this.setState({disabled});
        } else {
            const foundMopokens = disabled.map(
                (mopo) => {
                    if (mopo.type === mopoken.type) {
                        mopo.disabled = true;
                    }
                    return mopo;
                });
            this.setState({disabled: foundMopokens});
        }
        } else if (mopokens.length === 5) {
            this.setState({ errorOpen: true });
        }
         
    }

    enableReferenceMopoken(mopoken, mopokens) {
        const foundMopokens = this.state.disabled.map(
            (mopo) => {
                if (mopo.type === mopoken.type) {
                    mopo.disabled = false;
                }
                return mopo;
            });
        this.setState({disabled: foundMopokens, mopokens});
    }

    render() {
        return(
            <div id="mopoken">
                {
                    this.state.initialData && this.state.initialData.map((mopo, i) => (
                        <Badge
                badgeContent={mopo.level}
                key={'badge'+i}
                secondary={true}
                badgeStyle={{top: 12, right: 12}}
            ><FlatButton id={'btn'+i}
            disabled={this.state.disabled && this.state.disabled.length > 0 &&
                this.state.disabled.find((mopoken) => mopoken.type === mopo.type) &&
                this.state.disabled.find((mopoken) => mopoken.type === mopo.type).disabled}
            label={mopo.type}
            onClick={() => this.selectMopoken(mopo,i)} primary={true} />
            </Badge>
                    ))
                }
                    <SelectedMopoken
                    callBack={this.callBack}
                    initialData={this.state.initialData}
                    chooseBreeder={this.state.mopokens && this.state.mopokens.length === 5}
                    errorOpen={this.state.errorOpen}
                    mopokens={this.state.mopokens}
                    enableReferenceMopoken={this.enableReferenceMopoken}
                    user={this.props.user} />
            </div>
        )
    }
}

MyProgress.propTypes = {
    user: PropTypes.string.isRequired,
}

export default MyProgress;