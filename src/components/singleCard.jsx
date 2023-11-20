import './singleCard.css'

export default function singleCard({ card, handlePick, flipped, disabled }) {

    const handleClick = () => {
        if(!disabled){
            handlePick(card)
        }


    }

    return (
        <div className="card" >
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front" />
                <img className="back" src="/background/PngItem_2473359.png" onClick={handleClick} alt="card back" />
            </div>
        </div>
    )

}