import useHttp from "../hooks/http.hook";

const  useMarvelService = () => {
    const _url ='https://gateway.marvel.com:443/v1/public';
    const _apikey='d379d0a530b6e98b6a0836db770a4498';
    const _offsetForGetAllCharacters = 100;
    const _offsetForGetAllComics = 2000;

    const {loading,request,error,clearError} = useHttp();

    const getAllCharacters = async(offset=_offsetForGetAllCharacters)=>{
        try {
            const res = await request(`${_url}/characters?limit=9&offset=${offset}&apikey=${_apikey}`);
            return res.data.results.map(character=>_transformCharacter(character));
        } catch (error) {
            return [];
        }
    }
    const getAllComics = async(offset=_offsetForGetAllComics)=>{
        try {
            const res = await request(`${_url}/comics?limit=8&offset=${offset}&apikey=${_apikey}`);
            return res.data.results.map(comics=>_transformComics(comics));
        } catch (error) {
            return [];
        }
    }

    const getComics = async (id) => {
        try {
            const res =await request(`${_url}/comics/${id}?apikey=${_apikey}`);
            return _transformComics(res.data.results[0]);
        } catch (error) {
            return {}
        }
    }

    const getCharacter = async (id) =>{
        try {
            const res =await request(`${_url}/characters/${id}?apikey=${_apikey}`);
            return _transformCharacter(res.data.results[0]);
        } catch (error) {
            return {}
        }
    }

    const _transformCharacter = (character) => {
        return {
            id:character.id,
            name:character.name,
            description:character.description?`${character.description.slice(0,200)}...`:"There is no data about this character",
            thumbnail:`${character.thumbnail.path}.${character.thumbnail.extension}`,
            homepage:character.urls[0].url,
            wiki:character.urls[1].url,
            comics:character.comics.items
        };
    }

    const _transformComics = (comics) => {
        return {
            id:comics.id,
            title:comics.title,
            description:comics.description?`${comics.description.slice(0,200)}...`:"There is no data about this comics",
            thumbnail:`${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            url:comics.urls[0].url,
            price:comics.prices[0].price? `${comics.prices[0].price}$`: "not available",
            pages:comics.pageCount? `${comics.pageCount} p.`: "No information about the number of pages",
            language: comics.textObjects[0]?.language || "en-us"
        };
    }

    return {
        loading,
        error,
        clearError,
        getAllCharacters,
        getCharacter,
        getAllComics,
        getComics
    }
}
export default useMarvelService;