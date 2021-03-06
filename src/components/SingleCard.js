import './SingleCard.css';

// accept prop from App.js "card"
function SingleCard({ card, handleChoice, flipped, disabled }){
    
    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
    }

    return(
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
              <img src={card.src} className="front" alt="card front"/>
              <img 
                src="/img/cover2.jpg" 
                className="back" 
                alt="card back" 
                onClick={handleClick}
              />
            </div>
        </div>
    )
}

export default SingleCard;