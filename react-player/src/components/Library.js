import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({songs,setCurrentSong,audioRef,isPlaying,setSongs,libraryStatus}) => {
    return (
        <div className={`Library ${libraryStatus && 'active-library'}`}>
         <h2>library</h2>
         <div className="Library-songs">
          {songs.map((song)=> <LibrarySong 
            songs={songs}
            setCurrentSong={setCurrentSong} 
            setSongs={setSongs}
            isPlaying={isPlaying}
            song={song}
            id={song.id}
            key={song.id}
            audioRef={audioRef}/>)}  
          </div>
        </div>
    )
}

export default Library
