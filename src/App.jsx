import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/singleCard';

//i was originally going to use the whole deck of cards
//but even with it as it is it is already a lot
const cardImages = [
  { "src": "/Cards/PNG-cards-1.3/ace_of_clubs.png", matched: false },
  { "src": "/Cards/PNG-cards-1.3/ace_of_diamonds.png", matched: false },
  { "src": "/Cards/PNG-cards-1.3/ace_of_hearts.png", matched: false },
  { "src": "/Cards/PNG-cards-1.3/ace_of_spades.png", matched: false },

  { "src": "/Cards/PNG-cards-1.3/jack_of_clubs2.png", matched: false },
  { "src": "/Cards/PNG-cards-1.3/jack_of_diamonds2.png", matched: false },
  { "src": "/Cards/PNG-cards-1.3/jack_of_hearts2.png", matched: false },
  { "src": "/Cards/PNG-cards-1.3/jack_of_spades2.png", matched: false },

  { "src": "/Cards/PNG-cards-1.3/queen_of_clubs2.png", matched: false },
  { "src": "/Cards/PNG-cards-1.3/queen_of_diamonds2.png", matched: false },
  { "src": "/Cards/PNG-cards-1.3/queen_of_hearts2.png", matched: false },
  { "src": "/Cards/PNG-cards-1.3/queen_of_spades2.png", matched: false },

  { "src": "/Cards/PNG-cards-1.3/king_of_clubs2.png", matched: false },
  { "src": "/Cards/PNG-cards-1.3/king_of_diamonds2.png", matched: false },
  { "src": "/Cards/PNG-cards-1.3/king_of_hearts2.png", matched: false },
  { "src": "/Cards/PNG-cards-1.3/king_of_spades2.png", matched: false },

];


function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const[firstPick, setPickOne] = useState(null);
  const[sectonPick, setPicktwo] = useState(null);

  const[disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setPickOne(null);
    setPicktwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  //handle user picking a card
  const handlePick = (card) =>{
    
    //if first pick is null the it is set to the card picked
    //else setPickTwo is the card clicked on
    firstPick ? setPicktwo(card) : setPickOne(card);
    

  }


  // compare firstPick and SeconPick 
  useEffect (() => {
    if(firstPick && sectonPick){
      setDisabled(true)


        if(firstPick.src === sectonPick.src){
         // checking if the cards match let me know in the conse
          // console.log("it's a match!");
         
         setCards(prevCards => {

          return prevCards.map(card => {
            if(card.src === firstPick.src){
              return {...card, matched: true };
            } else {
              return card;
            }

          })
         });
         
         
          resetTurn();
        } else{
          //if it's not a match
          //console.log("These cards don't match");

          setTimeout(() => resetTurn(), 1000)

        }
    }


  }, [firstPick, sectonPick])


  console.log(cards);



  const resetTurn = () =>{
    setPickOne(null);
    setPicktwo(null);
    setTurns(prevTurns => prevTurns +1);
    setDisabled(false);

  }

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <>
      <div className="app">
        <h1>Memory Card Game</h1>
        <button onClick={shuffleCards}>New game</button>

        <div className="card-grid">
          {cards.map(card => (
            <SingleCard
             key={card.id}  
             card={card}
             handlePick={handlePick}
             flipped={card === firstPick || card === sectonPick || card.matched}
             disabled={disabled}
             />
          ))}
        </div>
        <p>Turns: {turns}</p>
      </div>

    </>
  )
}

export default App
