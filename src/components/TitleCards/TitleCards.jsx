import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data'; 
import { Link } from 'react-router-dom';

const TitleCards = ({title, category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjk4Y2I5ZTlhNjAwYWYzZmQ4NjUzMThmMjVhNzNiOSIsIm5iZiI6MS43NDcyMDc0NTA3ODcwMDAyZSs5LCJzdWIiOiI2ODI0NDUxYTI1MjFhN2ZhZmI3ZTg1OTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qH3r73KbVl6izkqAACGaGaK4VQNRUCTmwajjKum94dI'
  }
};

  

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', (e) => {
      e.preventDefault();
      cardsRef.current.scrollLeft += e.deltaY;
    })
  },[]);

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return  <Link to={`/player/${card.id}`} className='card' key={index}>
                    <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt={card.original_title} />
                    <p>{card.original_title}</p>
                  </Link>
})}
      </div>
    </div>
  );
};

export default TitleCards;
