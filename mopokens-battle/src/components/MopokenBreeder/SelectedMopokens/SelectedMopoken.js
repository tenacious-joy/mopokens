import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import CustomSnackBar from '../../Common/CustomSnackBar/CustomSnackBar';
import './SelectedMopoken.css';

class SelectedMopoken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMopokens: props.mopokens,
        };
    }

    deleteMopoken(mopoken) {
        let mopokens = this.state.selectedMopokens;
        mopokens = mopokens.filter(mopo => mopo.type !== mopoken.type);
        this.setState({ selectedMopokens: mopokens });
        this.props.enableReferenceMopoken(mopoken, mopokens);
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