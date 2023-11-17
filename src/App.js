import axios from "axios";
import { useState } from 'react';
import './index.css';

function App() {
  const [title, setTitle] = useState("Shape of You");
  const [songs, setSongs] = useState(null);
  const [lyrics, setLyrics] = useState(null);

  const getSongs = (id) => {
    axios
      .get(
        `https://genius-song-lyrics1.p.rapidapi.com/search?q=${
          id
        }&per_page=3&page=1`, {
        headers: {
          'X-RapidAPI-Key' : '477d060cb7msh27703ee829d7e6dp152675jsn3c5428025199'
        }
      })
    .then((res) => {
      setSongs(res.data.response.hits);
    }, 
    (error) => {
      console.log(error);
    });
  }

  const getLyrics = (id) => {
    axios
      .get(
        `https://genius-song-lyrics1.p.rapidapi.com/songs/${
          id
        }/lyrics`, {
        headers: {
          'X-RapidAPI-Key' : '477d060cb7msh27703ee829d7e6dp152675jsn3c5428025199'
        }
      })
    .then((res) => {
      // console.log(res.data.response.lyrics);
      console.log(res.data.response.lyrics.lyrics.body.html);
      setLyrics(res.data.response.lyrics.lyrics.body.html);
    }, 
    (error) => {
      console.log(error);
    });
  }

  return (
    <div className="App">
      <div className='header'>
        <span className='text-main'>Lyrics</span>Finder
      </div>
      <div className='search'>
        <input 
          type="value" 
          onChange={ e => {
            setTitle(e.target.value);
            setSongs(null);
            setLyrics(null);
          }}
          placeholder='Enter a song or an artist name'
        />
        <button className="btn btn-primary" onClick={e => {
          getSongs(title)
        }}>Search</button>
      </div>
      {songs && 
      <div className='container mt-5'>
        <div className='row'>
          {
            songs.map(song => (
              <div className ="card col-sm-4 px-0" key={song.result.id}>
              <div className ="card-body text-center">
                <h4 className ="card-title">{song.result.title}</h4>
                <p className ="card-text">{song.result.artist_names}</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    getLyrics(song.result.id);
                  }}>
                    Get Lyrics</button>
              </div>
            </div>
            ))
          }
        </div>
      </div>}
      {lyrics &&
        <div dangerouslySetInnerHTML={{ __html: lyrics }} />
      }
    </div>
  );
}

export default App;
