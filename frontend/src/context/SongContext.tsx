import { createContext, useContext, type ReactNode } from "react";

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
}

const SongContext = createContext<SongContextType | undefined>(undefined);

interface SongProviderProps {
    children: ReactNode;
}

export const SongProvider: React.FC<SongProviderProps> = ({children}) => {
    const [songs, setSongs] = useState<Song[]>([]);
    return (
        <SongContext.Provider value={{ songs }}>
            {children}
        </SongContext.Provider>
    )
}

export const useSongData = (): SongContextType => {
    const context = useContext(SongContext);
    if (!context) {
        throw new Error("useSongData must be used within a SongProvider");
    }
    return context;
}