import './charList.scss';
import { useEffect, useRef, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MySpinner from '../spinner/mySpinner';

const CharList = (props) => {
    const [heroes,setHeroes] =useState([]);
    const [newCharLoading,setNewCharLoading]=useState(false);
    const [offset,setOffset]=useState(100);
    const isLogged =useRef(true);
    const charRefs=useRef([]);
    const {loading,error,getAllCharacters} = useMarvelService();
    
    
    useEffect(()=>{
        if(isLogged.current){
            isLogged.current=false;
            loadHeroesList();
            console.log('useeffect');
        }
        // eslint-disable-next-line
    },[])

    const onCharLoaded = (newHeroes) => {
        setNewCharLoading(false);
        setHeroes(heroes=>[...heroes,...newHeroes]);
        setOffset(offset=>offset+9);
        setNewCharLoading(false);
    }
    const loadHeroesList = () => {
        //clearError();
        getAllCharacters()
            .then(onCharLoaded)
    }
    
    const onNewCharactersLoading = () => {
        setNewCharLoading(true)
    }

    const loadNewCharacters = (offset) => {
        onNewCharactersLoading();
        getAllCharacters(offset)
            .then(onCharLoaded)
    }
    
    const focusOnItem = (id) => {
        charRefs.current.forEach(item=>item.classList.remove('char__item_selected'));
        charRefs.current[id].classList.add('char__item_selected');
        charRefs.current[id].focus();
    }


    let heroesList=heroes.map((item,i)=>{
        let imgStyle = {'objectFit':'cover'};
        if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif" || 
            item.thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'contain'};
        }
        return (
            <li 
            className="char__item" 
            key={item.id} 
            ref={elem=>charRefs.current[i]=elem} 
            onClick={()=>{
                props.onCharSelected(item.id);
                focusOnItem(i)
            }}
            >
                <img src={item.thumbnail} alt="abyss" style={imgStyle}/>
                <div className="char__name">{item.name}</div>
            </li>
        )
    })
    let isError = error?<ErrorMessage/>:null;
    let isLoading=loading && !newCharLoading?<MySpinner/>:null;
    let contentView=!(loading && error)?<ViewHeroes heroes={heroesList}/>:null;
    let styleForLoadMore = newCharLoading?{color:'red'}:null;
    return(
        <div className="char__list">
            {isError}
            {contentView}
            {isLoading}
            <button className="button button__main button__long"
            style={styleForLoadMore}
                    onClick={()=>loadNewCharacters(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )  

}

const ViewHeroes = ({heroes}) => {
    return (
        <ul className="char__grid">
            {heroes}
        </ul>
    )
}

export default CharList;