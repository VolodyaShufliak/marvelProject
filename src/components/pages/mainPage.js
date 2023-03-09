import { useState } from "react";

import RandomChar from "../randomChar/RandomChar"
import CharInfo from "../charInfo/CharInfo"
import CharList from "../charList/CharList"

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedCharacter,setSelectedCharacter] = useState(null)
    const onCharSelected = (id) => {
        setSelectedCharacter(id);
    }
    return(
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList onCharSelected={onCharSelected}/>
                <CharInfo selectedCharacter={selectedCharacter}/>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}
export default MainPage;