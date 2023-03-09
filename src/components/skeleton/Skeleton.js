import './skeleton.scss';
//import '../charInfo/charInfo.scss'

const Skeleton = () => {
    return (
        <div style={{position:'relative'}}>
            <p className="char__select">Please select a character to see information</p>
            <div className="skeleton">
                <div className="pulse skeleton__header">
                    <div className="pulse skeleton__circle"></div>
                    <div className="pulse skeleton__mini"></div>
                </div>
                <div className="pulse skeleton__block"></div>
                <div className="pulse skeleton__block"></div>
                <div className="pulse skeleton__block"></div>
            </div>
        </div>
    )
}

export default Skeleton;