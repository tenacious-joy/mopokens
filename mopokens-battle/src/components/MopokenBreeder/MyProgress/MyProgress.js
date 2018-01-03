import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { mopokensMapper } from '../../../assets/mopokensAdvantageMapper';
import Badge from 'material-ui/Badge';
import FlatButton from 'material-ui/FlatButton';
import SelectedMopoken from '../SelectedMopokens/SelectedMopoken';
class MyProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mopokens: [],
            disabled: [],
            errorOpen: false,
        };
        this.selectMopoken = this.selectMopoken.bind(this);
        this.enableReferenceMopoken = this.enableReferenceMopoken.bind(this);
    }

    selectMopoken(mopoken,i) {
        let mopokens = this.state.mopokens;
        let disabled = this.state.disabled;
        if (mopokens.length < 5) {
            const existingMopoken = mopokens.filter((mopo) => mopo.type === mopoken);
            if (existingMopoken.length === 0) {
                mopokens.push({type: mopoken, level: 0, disabled: false });
                this.setState({mopokens});
            }
           const existingDisabled = disabled.filter((mopo) => mopo.type === mopoken);
        if (disabled.length === 0 || existingDisabled.length === 0) {
            disabled.push({type: mopoken, level: 0, disabled: true});
            this.setState({disabled});
        } else {
            const foundMopokens = disabled.map(
                (mopo) => {
                    if (mopo.type === mopoken) {
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
                    Object.keys(mopokensMapper).map((type, i) => (
                        <Badge
                badgeContent={0}
                key={'badge'+i}
                secondary={true}
                badgeStyle={{top: 12, right: 12}}
            ><FlatButton id={'btn'+i}
            disabled={this.state.disabled && this.state.disabled.length > 0 &&
                this.state.disabled.find((mopoken) => mopoken.type === type) &&
                this.state.disabled.find((mopoken) => mopoken.type === type).disabled}
            label={type}
            onClick={() => this.selectMopoken(type,i)} primary={true} />
            </Badge>
                    ))
                }
                    <SelectedMopoken
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