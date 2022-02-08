import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import useSongInfo from '../hooks/useSongInfo';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';

/* This Function to made player song */
function Player() {
    const spotifyApi = useSpotify();
    const  { data: session, status } = useSession();
    const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50)

    /* This variable to get id song */
    const songInfo = useSongInfo();

    /* This variable to fetch the song */
    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                console.log("Now Playing: ", data.body.item);
                setCurrentIdTrack(data.body?.item?.id);
                
                spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                    setIsPlaying(data.body?.is_playing); 
                });
            });
        }
    };

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) 
        {
            // Fetch the song info
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackIdState, spotifyApi, session])

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
        {/* Left in song player*/}
            <div className="flex items-center space-x-4">
                <img 
                    className="hidden md:inline h-10 w-10" 
                    src={songInfo?.album.images?.[0]?.url} 
                    alt="" 
                />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
        </div>
    );
}

export default Player;
