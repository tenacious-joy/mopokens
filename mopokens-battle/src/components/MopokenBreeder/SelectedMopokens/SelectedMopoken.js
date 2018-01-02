import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import CustomSnackBar from '../../Common/CustomSnackBar/CustomSnackBar';
import './SelectedMopoken.css';
import { opponent } from '../../../assets/opponent';
import { mopokensMapper } from '../../../assets/mopokensAdvantageMapper';
import { sequence } from '../../../utils/sequenceGenerator';
// import Noty from 'noty';

class SelectedMopoken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMopokens: props.mopokens,
            showOpponents: false,
            winCount: 0,
        };
        this.showWinningSequence = this.showWinningSequence.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.chooseBreeder !== this.props.chooseBreeder) {
            if (!nextProps.chooseBreeder) {
                this.setState({showOpponents:  false});
             //   this.setState({ winCount:0 });
            }
        }
    }

    deleteMopoken(mopoken) {
        let mopokens = this.state.selectedMopokens;
        mopokens = mopokens.filter(mopo => mopo.type !== mopoken.type);
        this.setState({ selectedMopokens: mopokens });
        this.props.enableReferenceMopoken(mopoken, mopokens);
    }

    showWinningSequence() {
        const selectedMopokens = this.state.selectedMopokens.slice();
        const possiblePermutations = sequence.heapsPermute(selectedMopokens, 
            selectedMopokens.length, selectedMopokens.slice());
        let found = false;
        for (let permutation of possiblePermutations) {
            let winCount = 0;
            if (!found) {
            permutation.map((mopoken, idx) => {
                if (mopokensMapper[mopoken.type]) {
                    if (mopokensMapper[mopoken.type].includes(opponent[idx].type) ||
                    mopoken.level >= opponent[idx].level) {
                       winCount ++;
                    }
                }
                if(winCount >= 3) {
                    found = true;
                }
            });
        }
            if(found) {
                if (!sequence.isArrayDifferent(permutation, this.state.selectedMopokens)) {
                    alert("You won the battle!!!")
                } else {
                    alert("find the right pattern in developer tools console");
                    console.log(JSON.stringify(permutation));
                }
                break; 
            }
        }
        }

    render() {
        return(<div>
                    <div id="chipText" style={{display: 'flex',
    flexWrap: 'wrap', border: '1px solid grey'}}>{this.state.selectedMopokens.map((mopoken, j) => (
                        <Chip className="chip"
                        id={'chip'+j}
                        key={'chip'+j}
                        onRequestDelete={() => this.deleteMopoken(mopoken)}
                        style={{margin: 10}}>{mopoken.type}</Chip>
                    ))}</div>
                    {
                        this.props.chooseBreeder ? 
                        <RaisedButton id="chooseBreeder"
                        disabled={false}
                        label="Show Opponent"
                        primary={true}
                        onClick={() => this.setState({showOpponents: true})}/> : null
                    }
                    {
                        this.props.chooseBreeder && this.state.showOpponents ? 
                        <div id="opponents" style={{display: 'flex',
                        flexWrap: 'wrap', border: '1px solid grey'}}>{
                            opponent.map((oppo) => (<Chip className="chip"
                        id={'chip'+oppo.level+oppo.type}
                        key={'chip'+oppo.level+oppo.type}
                        style={{margin: 10}}>{oppo.type}</Chip>))}
                        <RaisedButton id="play" disabled={false}
                        label="play"
                        primary onClick={this.showWinningSequence}/>
                        </div> : null
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

export default SelectedMopoken;