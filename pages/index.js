import Head from 'next/head';
import Center from '../components/Center';
import Sidebar from '../components/Sidebar';
import { getSession } from 'next-auth/react';
import Player from '../components/Player';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify | Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* First Developing */}
      <main className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Center */}
        <Center />
      </main>
        {/* Player */}
        <div className="sticky bottom-0">
          <Player />
        </div>

    </div>     
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}