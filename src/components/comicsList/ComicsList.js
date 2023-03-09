import { useEffect, useState , useRef } from 'react';
import MySpinner from '../spinner/mySpinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList,setComicsList] = useState([]);
    const [offset,setOffset] = useState(0)
    const [newComicsLoad,setNewComicsLoad] = useState(false);
    const {loading,error,getAllComics,clearError} = useMarvelService();
    const isLogged = useRef(true);
    useEffect(()=>{
        if(isLogged.current){
            isLogged.current=false;
            loadComicsList();
            console.log('comics');
        }
        // eslint-disable-next-line
    },[]);

    const comicsListLoaded = (newComics) => {
        setComicsList(comicsList=>[...comicsList,...newComics]);
        setOffset(offset=>offset+8);
        setNewComicsLoad(newComicsLoad=> false)
    }
    const loadComicsList = () => {
        clearError();
        getAllComics()
            .then(comicsListLoaded)
    }
    const updateComicsList = (offset) => {
        clearError();
        setNewComicsLoad(true);
        getAllComics(offset)
            .then(comicsListLoaded)
    }
    const viewComics = comicsList.map((item,i)=>{
        return(
            <li className="comics__item" key={i}>
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
        )
    })
    const isSpinner = loading && !newComicsLoad?<MySpinner/>:null;
    const isError = error?<ErrorMessage/>:null;
    const isContent =!(loading && error )?<ViewComics comics={viewComics}/>:null;
    let styleForLoadMore = newComicsLoad||loading?{color:'red'}:null;
    return (
        <div className="comics__list">
            {isSpinner}
            {isError}
            {isContent}
            <button onClick={()=>updateComicsList(offset)} className="button button__main button__long" style={styleForLoadMore}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const ViewComics = ({comics}) => {

    return (
        <ul className="comics__grid">
            {comics}
        </ul>
    )
}

export default ComicsList;