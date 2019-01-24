
const BASE_URL = 'https://pokeapi.co/api/v2/'

export const getPokemon = (id) => {
    const url = `${BASE_URL}pokemon/${id}`;
    //console.log(`Requesting pokemon #${id}`);
    return fetch(url).then( res => res.json()).then(data => {
        const {name, sprites:{front_default}} = data;
        return {name, front_default};
    })
}