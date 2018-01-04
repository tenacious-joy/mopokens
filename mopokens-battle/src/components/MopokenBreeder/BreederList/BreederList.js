import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import axios from 'axios';
import * as _ from 'lodash';

class BreederList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            breeders: [],
            uri: 'http://localhost:3001',
            activeBreeder: [],
        }
        this.fetchBreeders();
        this.displayBreederMopokens = this.displayBreederMopokens.bind(this);
    }

    fetchBreeders() {
        axios.get(`${this.state.uri}/api/breeders`)
    .then(res => {
        this.setState({ breeders: res.data });
 });
    }

    displayBreederMopokens (breeder) {
        axios.get(`${this.state.uri}/api/getBreederLevels?email=${breeder.email}`)
    .then(res => {
        const mopokens = _.shuffle(res.data.mopokens);
        if (res.data) {
            this.setState({ activeBreeder : mopokens.slice(0,5) });
            this.props.play(mopokens.slice(0,5));
        }
 });     
    }

    render() {
        return (
                <Card>
    <CardHeader
      title="Your competents"
      subtitle="Choose one"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
      {  this.state.breeders && this.state.breeders.map((breeder) => (
          breeder.email !== this.props.user ? 
            <FlatButton key={breeder.id} label={breeder.firstName}
            labelStyle={{ color: 'red' }} onClick={() => this.displayBreederMopokens(breeder)} /> : null
        )) }
    </CardActions>
    <div id="opponents" style={{display: 'flex',
                        flexWrap: 'wrap', marginLeft: '20pc'}}>{
                            this.state.activeBreeder && this.state.activeBreeder.map((mopoken) => (
                                <Chip className="chip"
                        id={'chip'+mopoken.id}
                        key={'chip'+mopoken.id}
                        style={{margin: 20}}>
                        {mopoken.type}</Chip>
                            ))}
                        </div>
    
  </Card>
        );
    }
}

BreederList.propTypes = {
    user: PropTypes.string.isRequired,
    play: PropTypes.func.isRequired,
}

BreederList.contextTypes = {
    router: PropTypes.object,
    location: PropTypes.object
}


export default BreederList;