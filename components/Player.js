import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import useSpotify from '../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import useSongInfo from '../hooks/useSongInfo';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import {
    RewindIcon,
    VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline';
import {
    PlayIcon,
    PauseIcon,
    ReplyIcon,
    VolumeUpIcon,
    FastForwardIcon,
    SwitchHorizontalIcon
} from '@heroicons/react/solid';

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

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
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

            {/* Center in player song */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon 
                    // onClik={()=> spotifyApi.skipToPrevious()} -- The Api is not working
                    className="button"
                />
                
                {isPlaying ? (     
                    <PauseIcon onClick={handlePlayPause} 
                    className="button w-10 h-10" />          
                ) : (
                    <PlayIcon onClick={handlePlayPause} 
                    className="button w-10 h-10" />  
                )}

                    
                <FastForwardIcon 
                    // onClik={()=> spotifyApi.skipToNext()} -- The Api is not working
                    className="button"
                />
                <ReplyIcon className="button" />
            </div>

            {/*  Right in player songs */}
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeDownIcon className="button" /> 
                    <input 
                        className="w-14 md:w-28"
                        type="range"
                        value={volume} 
                        onChange={e => setVolume(Number(e.target.value))}
                        min={0} 
                        max={100}
                    />       
                <VolumeUpIcon className="button" />
            </div>
        </div>
    );
}

export default Player;
