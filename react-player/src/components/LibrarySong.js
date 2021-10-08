import React from 'react'


const LibrarySong = ({song,songs,setCurrentSong,id,setSongs,audioRef,isPlaying}) => {
    const songSelectHandler= async()=>{
         await setCurrentSong(song)
        // add active state
        const newSongs = songs.map((song)=> {
           
            if(song.id===id){
                return{
                    ...song,
                    active:true,
                }
            }
            else{
                return{
                    ...song,
                    active:false,
                }
            }
        })
        setSongs(newSongs)
    //    CHECK IF IS SONG IS PLAYING
    if(isPlaying) audioRef.current.play()
        
    }
    //
    return (
        <div onClick={songSelectHandler} className={`Library-song ${song.active  && 'selected'}`}>
        <img alt={song.name} src={song.cover}  />
        <div className="song-description">
        <h3> { song.name}</h3>
        <h4> {song.author}</h4>
        </div>
        
        </div>

    )
        
    
}

export default  LibrarySong