import React, { useEffect, useRef, useState } from "react"
import { useSongData } from "../context/SongContext"

const Player = () => {
  const {song, fetchSingleSong, selectedSong, isPlaying, setIsPlaying, prevSong, nextSong} = useSongData()

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [volume, setVolume] = useState<number>(1)
  const [progress, setProgress] = useState<number>(1)
  const [duration, setDuration] = useState<number>(1)

  useEffect(() =>{
    const audio = audioRef.current
    if(!audio)
      return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
    }

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime || 0)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [song])

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if( audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value)/100) * duration;
    setVolume(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setProgress(newTime)
  };

  useEffect(() => {
    fetchSingleSong()
  }, [selectedSong])

  return (
    <div>
      {
        song && <div className="h-[10%] bg-black flex justify-between items-center text-white p-4">
          <div className="lg:flex items-center gap-4">
            <img src={song.thumbnail && 'music_bg.jpg'} alt={song.title} className="w-12" />
            <div className="hidden md:block">
              <p>{song.title}</p>
              <p>{song.description?.slice(0, 30)}...</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 m-auto">
            {song.audio && (
              <audio ref={audioRef} src={song.audio} autoPlay={isPlaying} />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default Player