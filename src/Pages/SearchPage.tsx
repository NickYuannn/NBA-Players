import React from "react";
import SearchBar from "../Components/SearchBar.tsx";
import { useState, useEffect } from "react";
import { FaBasketball } from "react-icons/fa6";
import { motion } from "framer-motion";
import PlayerStats from "@/Components/PlayerStats.tsx";
import { Button } from "@/Components/ui/button.tsx";

function SearchPage() {
  const [playerName, setPlayerName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [showStats, setShowStats] = useState(false);

  const fetchVideo = async (playerName: string) => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:8000/search?player=${encodeURIComponent(playerName)}`
    );

    const data = await res.json();
    setLoading(false);
    setVideoUrl(data.video_url || "");
  };

  useEffect(() => {
    if (playerName) {
      fetchVideo(playerName);
    } else {
      setVideoUrl("");
    }
  }, [playerName]);

  useEffect(() => {
    fetch("http://localhost:8000/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  return (
    <div className="min-h-screen p-8 background-gray flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-white font-[Oswald] ">
        Basketball Hub Search Engine
        <FaBasketball className="inline-block ml-2 text-orange-500" />
      </h1>
      <div className="flex justify-center w-full">
        <SearchBar
          playerName={playerName}
          setPlayerName={setPlayerName}
          players={players}
          onRefresh={() => fetchVideo(playerName)}
        />
      </div>
      {playerName && (
        <div className="text-4xl font-[Oswald] mt-3 text-white">{`${playerName}'s Highlights`}</div>
      )}
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="mt-5"
        >
          <FaBasketball className="text-orange-500" size={48} />
        </motion.div>
      )}

      {videoUrl && (
        <>
          <iframe
            src={`${videoUrl}?autoplay=1&mute=1&controls=1&showinfo=0&rel=0&modestbranding=0`}
            height={500}
            width={700}
            allow="autoplay; encrypted-media"
            className="mt-5 rounded-2xl"
            allowFullScreen
          />
          <Button
            className="h-10 w-25 bg-gray-800 text-sm p-3 mt-2 text-white font-[Oswald]"
            onClick={() => setShowStats(!showStats)}
          >
            Show Player Stats
          </Button>
        </>
      )}

      {showStats && <PlayerStats playerName={playerName} />}
    </div>
  );
}

export default SearchPage;
