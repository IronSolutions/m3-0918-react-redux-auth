import React, {Component} from "react";
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { getPokemon } from "../lib/pokeApi";
import cx from 'classnames';
import { connect } from 'react-redux';

const PokeBall = styled.div`
    border: 5px solid transparent;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin: 10px;
    position: relative;
    overflow: hidden;
    color: black;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: content-box;
    &.selected{
        border: 5px solid red;
    }
    &.isFavorite{
        border: 5px solid yellow;
    }
    &:before{
        content:'';
        position: absolute;
        height: 50%;
        width: 100%;
        top: 0;
        left: 0;
        background: white;
        z-index: 1;
    }
    &:after {
        content:'';
        position: absolute;
        height: 50%;
        width: 100%;
        bottom: 0;
        left: 0;
        background: red;
        z-index: 2;
    }
    .cnt{
        position: relative;
        margin:0;
        z-index: 3;
        display: inline-block;
        border-radius: 50%;
        border: 1px solid black;
        background: white;
        padding: 5px;
        p{
            margin: 0;
        }
    }
`

class BarePokemon extends Component {

    constructor(){
        super();
        this.state = {
            selected: false,
            data: null,
        }
    }

    static propTypes = {
        id: PropTypes.number.isRequired
    }

    componentDidMount(){
        //console.log("Component did mount");
        const {id} = this.props;
        getPokemon(id).then(data => {
            this.setState({data});
        })    }

    static defaultProps = {
        enableChange: true,
        isFavorite: false
    }

    componentWillReceiveProps(nextProps){
        const {id} = nextProps;
        if(id !== this.props.id){
            getPokemon(id).then(data => {
                this.setState({data});
            })    
        }
    }


    handleClick(){
        console.log("CLICK ON POKEMON");
        const {selected, data} = this.state;
        const { dispatch } = this.props;
        this.setState({selected: !selected});

        if(this.props.enableChange){
            dispatch({
                type:"INCREMENT_CLICKS"
            })

            if(!selected){
                dispatch({type:"SELECT_POKEMON", pokemon:{id:this.props.id, ...this.state.data}});
            }else{
                dispatch({type:"UNSELECT_POKEMON", pokemon:{id:this.props.id, ...this.state.data}});
            }
        }
    }

    render(){
        const {id, isFavorite} = this.props;
        const {selected, data} = this.state;
        console.log("RENDERPOKEMON")
        return (
            <PokeBall className={cx({selected, isFavorite})} onClick={() => this.handleClick()}>
                <div className="cnt">
                {data ? 
                    selected ? <img src={data.front_default} alt=""/> : <p>#{id}</p>
                :
                <p>...</p>}
                </div>
            </PokeBall>
        )
    }
}

export const Pokemon = connect((state,props)=>{
    return {
        isFavorite: state.favoritePokemon && state.favoritePokemon.id === props.id ? true : false
    }
})(BarePokemon);