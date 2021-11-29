import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import './App.css';

// don't need to change, so won't need to be kept in component

const cardImages = [
  {"src" : "/img/helmet-1.png", matched: false},
  {"src" : "/img/potion-1.png", matched: false},
  {"src" : "/img/ring-1.png", matched: false},
  {"src" : "/img/scroll-1.png", matched: false},
  {"src" : "/img/shield-1.png", matched: false},
  {"src" : "/img/sword-1.png", matched: false}
]

function App() {

  const [cards, setcards] = useState([]);
  const [turns, setturns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [disabled, setdisabled] = useState(false);


  // shuffle cards
  const shuffleCards = () => {
    // spread operator twice to double cards to make 12 deck
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      // each item rep by "card"
      // adding another property "id" to each card
      .map((card) => ({ ...card, id : Math.random()}))
    
    setchoiceOne(null);
    setchoiceTwo(null);
    setcards(shuffledCards);
    setturns(0);
  }

  // handle a choice
  const handleChoice = (card) => {
    // if false/null, will update choiceOne, otherwise will set choiceTwo
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
  }

  // compare 2 selectec cards
  // runs when component first maps the DOM
  useEffect(() => {    
    if(choiceOne && choiceTwo){
      setdisabled(true);

      if(choiceOne.src === choiceTwo.src){
        setcards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setchoiceOne(null);
    setchoiceTwo(null);
    setturns(prevTurns => prevTurns + 1);
    setdisabled(false);
  }

  // start game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          // pass card item to child component as prop
          // pass handleChoice function as prop
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched === true}
            disabled={disabled}
            />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
