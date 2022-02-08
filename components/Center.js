import { shuffle } from 'lodash'; 
// import spotifyApi from '../lib/spotify';
import Songs from '../components/Songs';
import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { useSession, signOut } from 'next-auth/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
];


function Center() {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    /* This effect to suffle color theme */
    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId]);

    /* This effect to set the playlist */
     useEffect(() => {
            spotifyApi
                .getPlaylist(playlistId)
                .then((data) => {
                    setPlaylist(data.body)
                })
            .catch((err) => console.log("Something went wrong", err));
     }, [spotifyApi, playlistId])

    //  console.log(playlist);
    // console.log(playlist); 

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div 
                    className="flex items-center bg-black space-x-3 opacity-90 hover:opactiy-80 cursor-pointer rounded-full p-1 pr-2 text-white"
                    onClick={signOut}
                >
                    <img 
                        className="rounded-full w-10 h-10"
                        src={session?.user.image} 
                        alt="" 
                    />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header>

            <section 
                className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 w-full`}
            >
                <img 
                    className="h-44 w-44 shadow-2xl"
                    src={playlist?.images?.[0]?.url}
                    alt="" 
                />
                {/* This for caption */}
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                </div>
            </section>
                {/* This for those songs */}
                <div>
                    <Songs />
                </div>
        </div>
    );
}

export default Center;