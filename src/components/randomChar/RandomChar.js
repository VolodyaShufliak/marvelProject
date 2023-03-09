import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import './randomChar.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import mjolnir from '../../resources/img/mjolnir.png';
import MySpinner from '../spinner/mySpinner';
const RandomChar = () => {

    const [character,setCharacter] = useState({});
    const {loading,error,getCharacter,clearError} = useMarvelService();

    useEffect(()=>{
        updateRandomCharacter()
        // eslint-disable-next-line
    },[])

    const onCharLoaded = (character) => {
        setCharacter(character);
    }


    const updateRandomCharacter =() => {
        clearError();
        const randomId=Math.floor(Math.random()*(1011400-1011000)+1011000);
        getCharacter(randomId)
            .then(onCharLoaded)
    }
    const  isErrorMessage = error?<ErrorMessage/>:null;
    const isSpinner = loading?<MySpinner/>:null;
    const contentOnPage = !(loading || error)?<ViewChar character={character}/>:null;
    return (
        <div className="randomchar">
            {isErrorMessage}
            {isSpinner}
            {contentOnPage}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateRandomCharacter}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const ViewChar = ({character}) => {
    const  {name,description,thumbnail,homepage,wiki}=character;
    let imgStyle = {'objectFit':'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main" target={'blank'}>
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary" target={'blank'}>
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default RandomChar;