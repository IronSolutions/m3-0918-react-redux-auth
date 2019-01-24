import React from 'react';
import { Pokemon } from './Pokemon';
import {connect} from 'react-redux';

class BarePokemonList extends React.Component {

    constructor(props){
        super();
        this.state = {
            list: props.list || [] 
        }
    }

    handleReverse(){
        const {list} = this.state;
        this.setState({list:list.reverse()})
    }

    render() {
        const {list} = this.state;
        return (
            <React.Fragment>
                <h2> {this.props.numClicks} clicks on pokemons</h2>
                <button onClick={() => this.handleReverse()}>Reverse</button>
                <div>
                    {list.map( (e,i) => <Pokemon id={e} key={e} />)}
                </div>
            </React.Fragment>
        )
    }
}

export const PokemonList = connect(store => store)(BarePokemonList);
