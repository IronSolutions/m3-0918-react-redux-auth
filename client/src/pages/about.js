import React from 'react';
import { PokemonList } from '../components/PokemonList'
import { FavoritePokemon } from '../components/FavoritePokemon';

import _ from 'lodash';

export const AboutPage = () => (
    <div>
        <FavoritePokemon />
        <PokemonList list={_.range(1,6)} />
    </div>
)