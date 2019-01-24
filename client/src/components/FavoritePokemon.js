import React from 'react';
import { Pokemon } from "./Pokemon";
import {connect} from 'react-redux'

const BareFavoritePokemon = ({favoritePokemon}) => {
    return <div>
        {favoritePokemon? 
        <React.Fragment>
            <p>Your favorite pokemon is {favoritePokemon.name}</p>
            <Pokemon id={favoritePokemon.id} enableChange={false}/>
        </React.Fragment>
        :
        <p>You have no favorite pokemon</p>
        }
    </div>
}

export const FavoritePokemon = connect(state => state)(BareFavoritePokemon);