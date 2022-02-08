import { useState } from 'react';
import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import useSongInfo from '../hooks/useSongInfo';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';

/* This Function to made player song */
function Player() {
    const spotifyApi = useSpotify();
    const  { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50)

    const songInfo = useSongInfo();


    return (
        <div>
        {/* Left */}
            <div>
                <img 
                    className="hidden md:inline h-10 w-10" 
                    src={songInfo?.album.images?.[0]?.url} 
                    alt="" 
                />
            </div>
        </div>
    );
}

export default Player;
