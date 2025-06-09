import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const server = "http://localhost:8000";

export interface Song {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  audio: string;
  album: string;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface SongContextType {
  songs: Song[];
  song: Song | null
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  loading: boolean;
  selectedSong: string | null;
  setSelectedSong: (id: string) => void;
  albums: Album[];
  fetchSingleSong: () => Promise<void>;
  nextSong: () => void;
  prevSong: () => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

interface SongProviderProps {
  children: ReactNode;
}

export const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [albums, setAlbums] = useState<Album[]>([]);

  const fetchSongs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Song[]>(`${server}/api/v1/song/all`);
      setSongs(data);
      if (data.length > 0) setSelectedSong(data[0].id.toString());
    } catch (error) {
      console.error("Failed to fetch songs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const [song, setSong] = useState<Song | null>(null);

  const fetchSingleSong = useCallback(async () => {
    setLoading(true);
    if (!selectedSong) return;
    try {
      const { data } = await axios.get<Song>(
        `${server}/api/v1/song/${selectedSong}`
      );
      setSong(data);
    } catch (error) {
      console.error("Failed to fetch single song:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedSong]);

  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Album[]>(`${server}/api/v1/album/all`);
      setAlbums(data);
    } catch (error) {
      console.error("Failed to fetch albums:", error);
    } finally {
      setLoading(false)
    }
  }, []);

  const [index, setIndex] = useState<number>(0);

  const nextSong = useCallback(() => {
    if (index === songs.length - 1) {
      setIndex(0);
      if (selectedSong !== songs[0].id.toString()) {
        // Prevent unnecessary state updates
        setSelectedSong(songs[0].id.toString());
      }
    } else {
      setIndex((prevIndex) => prevIndex + 1);
      if (selectedSong !== songs[index + 1]?.id.toString()) {
        // Prevent redundant re-renders
        setSelectedSong(songs[index + 1]?.id.toString());
      }
    }
  }, [index, songs, selectedSong]);

  const prevSong = useCallback(() => {
    if(index > 0){
        setIndex((prevIndex) => prevIndex - 1)
        setSelectedSong(songs[index - 1]?.id.toString())
    }
  }, [index, songs])

  useEffect(() => {
    const storedSong = localStorage.getItem("selectedSong");
    if (storedSong) {
      setSelectedSong(storedSong);
    } else if (songs.length > 0) {
      setSelectedSong(songs[0].id.toString());
    }
  }, [songs]);

  useEffect(() => {
    if (selectedSong) {
      localStorage.setItem("selectedSong", selectedSong);
    }
  }, [selectedSong]); 

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  return (
    <SongContext.Provider
      value={{
        songs,
        isPlaying,
        setIsPlaying,
        loading,
        selectedSong,
        setSelectedSong,
        albums,
        fetchSingleSong,
        song,
        nextSong,
        prevSong
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongData = (): SongContextType => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSongData must be used within a SongProvider");
  }
  return context;
};
