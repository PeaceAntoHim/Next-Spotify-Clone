import {
    RssIcon,
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
} from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom';    
import { useSession } from 'next-auth/react';

function Sidebar() {
    const spotifyApi = useSpotify();
    /* Made Middleware to scure web */
    const { data: session, status } = useSession();
    /* made statment playlist */
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState
    (playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);    
            });
        }
    }, [session, spotifyApi]);
    // console.log(playlists);
    // console.log('You pick a playlist >>>', playlistId);

    return(
        <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
            <div className="space-y-4">
                {/* Primary Button */}
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>   

                <hr className="border-t-[0.1px] border-gray-900" />

                {/* Secondary Button */}
                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 text-blue-500 hover:text-white">
                    <HeartIcon className="h-5 w-5" />
                    <p>Like Songs</p>
                </button>   
                <button className="flex items-center space-x-2 text-green-500 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Your Episodes</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900" />

                {/* Playlist... */}
                {playlists.map((playlist) => (
                    <p 
                        key={playlist.id} 
                        className="cursor-pointer hover:text-white"
                        onClick={() => setPlaylistId(playlist.id)}
                    >
                        {playlist.name}
                    </p>
                ))}
            </div>
        </div>
    )

}

export default Sidebar;