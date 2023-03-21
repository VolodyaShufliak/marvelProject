import './charInfo.scss';
import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MySpinner from '../spinner/mySpinner';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {
    const [character,setCharacter] = useState(null);
    const {loading,error,getCharacter,clearError} = MarvelService();

    useEffect(()=>{
        updateCharacter();
        // eslint-disable-next-line
    },[props.selectedCharacter])

    const updateCharacter = () => {
        clearError();
        if(!props.selectedCharacter) return;
        getCharacter(props.selectedCharacter)
            .then(onCharLoaded)
    }

    const onCharLoaded = (character) => {
        setCharacter(character);
    }


    const sceleton = (character || loading || error) ?null:<Skeleton/>;
    const  isErrorMessage = error?<ErrorMessage/>:null;
    const isSpinner = loading?<MySpinner/>:null;
    const contentOnPage = !(loading || error || sceleton)?<ViewCharInfo character={character}/>:null;
    return(
        <>
            {sceleton}
            {isErrorMessage}
            {isSpinner}
            {contentOnPage}
        </>
    ) 
}


const ViewCharInfo=({character})=>{
    const comics=character.comics.map((item,i)=>{
        return (
            <li className="char__comics-item" key={i}>
                {item.name}
            </li>
        );
    })
    if(comics.length===0){
        comics.push('Коміксів у цього персонажа немає');
    }else if(comics.length>10){comics.length=10}
    let imgStyle = {'objectFit':'cover'};
    if (character.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif" || 
        character.thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    return(
        <div className="char__info">
            <div className="char__basics">
                <img src={character.thumbnail} style={imgStyle} alt="abyss"/>
                <div>
                    <div className="char__info-name">{character.name}</div>
                    <div className="char__btns">
                        <a href={character.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={character.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {character.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics}
            </ul>
        </div>
        )
}
export default CharInfo;