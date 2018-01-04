import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Chip from 'material-ui/Chip';
import Badge from 'material-ui/Badge';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CustomSnackBar from '../../Common/CustomSnackBar/CustomSnackBar';
import './SelectedMopoken.css';
import { opponent } from '../../../assets/opponent';
import { mopokensMapper } from '../../../assets/mopokensAdvantageMapper';
import { sequence } from '../../../utils/sequenceGenerator';
import BreederList from '../BreederList/BreederList';
import {
  blue500,
} from 'material-ui/styles/colors';
import axios from 'axios';

class SelectedMopoken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMopokens: props.mopokens,
            play: false,
            winCount: 0,
            opponent,
            uri: 'http://localhost:3001',
        };
        this.showWinningSequence = this.showWinningSequence.bind(this);
        this.enablePlay = this.enablePlay.bind(this);
    }

    deleteMopoken(mopoken) {
        let mopokens = this.state.selectedMopokens;
        mopokens = mopokens.filter(mopo => mopo.type !== mopoken.type);
        this.setState({ selectedMopokens: mopokens });
        this.props.enableReferenceMopoken(mopoken, mopokens);
    }

    showWinningSequence() {
        sequence.patterns.length = 0;
        const selectedMopokens = this.state.selectedMopokens.slice();
        const possiblePermutations = sequence.heapsPermute(selectedMopokens, 
            selectedMopokens.length, selectedMopokens.slice());
        let found = false;
        for (let permutation of possiblePermutations) {
            let winCount = 0;
            if (!found) {
                // eslint-disable-next-line
            permutation.map((mopoken, idx) => {
                if (mopokensMapper[mopoken.type]) {
                    if (mopokensMapper[mopoken.type].includes(this.state.opponent[idx].type) ||
                    mopoken.level > this.state.opponent[idx].level) {
                       winCount ++;
                       if (!sequence.isArrayDifferent(permutation, this.state.selectedMopokens)) {
                        mopoken.level = mopoken.level + 1;
                       }
                    }
                }
                if(winCount >= 3) {
                    found = true;
                }
            });
        }
            if(found && sequence.isArrayDifferent(permutation, this.state.selectedMopokens)) {
                this.setState({ winningSequence: permutation });
                this.setState({ won: false });
                this.props.callBack();
                break; 
            } else if(found && !sequence.isArrayDifferent(permutation, this.state.selectedMopokens)) {
                this.setState({ won: true });
            }
        }
        this.updateBreederWins();
        }

        enablePlay(opponent) {
            this.setState({ play: true });
            this.setState({ opponent });
        }

        updateBreederWins() {
            const cloneData = [].concat(this.state.selectedMopokens);
            for(const data of this.props.initialData) {
               if (!this.state.selectedMopokens.find(mopo => mopo.type === data.type)) {
                cloneData.push(data);
               }
            }
            const payload = {
                email: this.props.user,
                mopokens: cloneData
            }
            axios.post(`${this.state.uri}/api/saveUserLevels`, payload)
    .then(res => {
      //  this.setState({ selectedMopokens: res.data });
 });
        }

    render() {
        return(<div>
                    <div id="chipText" style={{display: 'flex',
    flexWrap: 'wrap', marginLeft: this.state.won === undefined ? '20pc' : '28pc'}}>
    {this.state.won === undefined && this.state.selectedMopokens &&
    this.state.selectedMopokens.map((mopoken, j) => (
                        <Chip className="chip"
                        id={'chip'+j}
                        key={'chip'+j}
                        onRequestDelete={() => this.deleteMopoken(mopoken)}
                        style={{margin: 20}}>{mopoken.type}</Chip>
                    ))}{this.state.won === true ? 
                    <span style={{color: 'green', fontSize: '5em'}}>
                    You won the match</span> : this.state.won === false ? <div><h3 style={{color: blue500}}>Here's the winning sequence...</h3>
                       { this.state.winningSequence && this.state.winningSequence.map((val, i) => (
                            <Badge
                badgeContent={val.level}
                key={'badge'+i}
                secondary={true}
                badgeStyle={{top: 12, right: 12}}
            ><FlatButton id={'btn'+i}
            disabled={false}
            label={val.type}
            primary={true} />
            </Badge>
                        ))
                    }</div>: null}</div>
                    {
                        this.props.chooseBreeder ?
                        <div>
                        <BreederList user={this.props.user} play={this.enablePlay} />
                        <RaisedButton id="play" disabled={!this.state.play}
                        label="play"
                        primary style={{marginTop: '2pc'}} onClick={this.showWinningSequence}/></div> : null
                    }
                    {
                        this.props.errorOpen ? <CustomSnackBar
                        type="error" timeout={3000}
                        message="Delete one/two mopokens to add new ones"
                        open /> : null
                    }
            </div>
        )
    }
}

SelectedMopoken.propTypes = {
    initialData: PropTypes.object.isRequired,
    chooseBreeder: PropTypes.bool.isRequired,
    errorOpen: PropTypes.bool.isRequired,
    mopokens: PropTypes.object.isRequired,
    enableReferenceMopoken: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired,
}

export default SelectedMopoken;