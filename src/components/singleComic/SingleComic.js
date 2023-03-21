import { useEffect, useState , useRef } from 'react';
import { useParams , Link } from 'react-router-dom';
import './singleComic.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MySpinner from '../spinner/mySpinner';
const SingleComic = () => {
    const {comicsId} = useParams();
    const [comics,setComics] = useState({})
    const {loading,error,getComics,clearError} = useMarvelService();
    const isLogged = useRef(true);
    useEffect(()=>{
        if(isLogged.current){
            loadComics();
        }
        // eslint-disable-next-line 
    },[])

    const loadComics = () => {
        clearError();
        getComics(comicsId)
            .then(onComicsLoaded)
    }
    const onComicsLoaded = (comics) => {
        setComics(comics);
    }
    const  isErrorMessage = error?<ErrorMessage/>:null;
    const isSpinner = loading?<MySpinner/>:null;
    const contentOnPage = !(loading || error )?<ViewComics comics={comics}/>:null;
    return (
        <>
            {isErrorMessage}
            {isSpinner}
            {contentOnPage}
        </>
    )
}

const ViewComics = ({comics}) => {
    return (
        <div className="single-comic">
            <img src={comics.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comics.title}</h2>
                <p className="single-comic__descr">{comics.description}</p>
                <p className="single-comic__descr">{comics.pages}</p>
                <p className="single-comic__descr">{comics.language}</p>
                <div className="single-comic__price">{comics.price}</div>
            </div>
            <Link  to='/comics'  className="single-comic__back">Back to all</Link>
        </div>
    )
}
export default SingleComic;