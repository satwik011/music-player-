import React,{useState,useRef} from "react"
import Song from "./components/Song";
import Player from "./components/Player";
import'./styles/app.scss'
import Library from "./components/Library";
import data from "./Data"
import Nav from "./components/Nav";


function App() {
  // states
  const[songs,setSongs]=   useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef= useRef(null)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration:0,
    animationPercentage:0,
})
const[libraryStatus,setLibraryStatus]= useState(false)
  const timeUpdateHandler=(e)=>{
    const current= e.target.currentTime
    const duration= e.target.duration
    const roundCurrent= Math.round(current)
    const roundDuration= Math.round(duration)
    const animation=Math.round((roundCurrent/roundDuration)*100)
    
    
    setSongInfo({...songInfo,currentTime:current ,duration ,animationPercentage:animation})

}

    const songEndHandler=async()=>{
      let currentIndex= songs.findIndex((song)=> song.id===currentSong.id)
        
      
        await setCurrentSong(songs[(currentIndex + 1)%songs.length])
        if(isPlaying) audioRef.current.play()
    }
    
  return (
 <div className={`App ${libraryStatus && 'library-active'}`}>
       <Nav setLibraryStatus={setLibraryStatus} libraryStatus={libraryStatus}/>
       <Song currentSong={currentSong}/>
     <Player audioRef={audioRef} 
      currentSong={currentSong}
      isPlaying={isPlaying} 
      setSongs={setSongs}
      setIsPlaying={setIsPlaying}
      setSongInfo={setSongInfo}
      setCurrentSong={setCurrentSong}
      songs={songs}
      songInfo={songInfo}/>
      <Library 
      setCurrentSong={setCurrentSong} 
      audioRef={audioRef}
      setSongs={setSongs}
      isPlaying={isPlaying}
      libraryStatus={libraryStatus}
      
      songs={songs}/>
      <audio
      onLoadedMetadata={timeUpdateHandler}  
      onTimeUpdate={timeUpdateHandler} 
      ref={audioRef} 
      onEnded={songEndHandler}
      src={currentSong.audio}>
      
      </audio>

    </div>
  );
}

export default App;
