import React, { useEffect, useState } from "react";
import { FaBasketball } from "react-icons/fa6";
import { motion } from "framer-motion";

type PlayerStatsProps = {
  playerName: string;
};

function PlayerStats({ playerName }: PlayerStatsProps) {
  const [playerStats, setPlayerStats] = useState<any>(null);
  const [playerBio, setPlayerBio] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!playerName) {
        setPlayerStats(null);
        setPlayerBio(null);
        return;
      }
      setLoading(true);
      try {
        // Fetch career stats
        const statsRes = await fetch(
          `http://localhost:8000/player_stats?player=${encodeURIComponent(
            playerName
          )}`
        );
        const statsData = await statsRes.json();
        if (Array.isArray(statsData) && statsData.length > 0) {
          setPlayerStats(statsData[statsData.length - 1]);
        } else {
          setPlayerStats(null);
        }

        // Fetch bio info
        const bioRes = await fetch(
          `http://localhost:8000/player_bio?player=${encodeURIComponent(
            playerName
          )}`
        );
        const bioData = await bioRes.json();
        setPlayerBio(bioData && !bioData.error ? bioData : null);
      } catch (error) {
        setPlayerStats(null);
        setPlayerBio(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [playerName]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-4xl min-w-4xl mt-8">
      {loading && (
        <div className="flex justify-center mt-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            style={{ display: "inline-block" }}
          >
            <FaBasketball className="text-orange-500" size={48} />
          </motion.div>
        </div>
      )}
      {!loading && (
        <div className="flex flex-col items-center text-black font-[Oswald]">
          <div className="flex flex-row items-center mb-4 space-x-6 w-full">
            <img
              src={
                playerBio?.PERSON_ID
                  ? `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerBio.PERSON_ID}.png`
                  : "https://via.placeholder.com/150"
              }
              className="w-100 h-100 rounded-full"
              alt={playerName}
            />
            <div className="flex flex-col justify-center">
              <h1 className="font-bold underline text-2xl text-blue-600">
                {playerName} #{playerBio?.JERSEY || "N/A"}
              </h1>
              <h1>Height: {playerBio?.HEIGHT || "N/A"}</h1>
              <h1>Weight: {playerBio?.WEIGHT || "N/A"}</h1>
              <h1>Position: {playerBio?.POSITION || "N/A"}</h1>
              <h1>Team: {playerBio?.TEAM_ABBREVIATION || "N/A"}</h1>
              <h1>
                Birth Date:{" "}
                {playerBio?.BIRTHDATE
                  ? new Date(playerBio.BIRTHDATE).getFullYear()
                  : "N/A"}
              </h1>
              <h1>Experience: {playerBio?.SEASON_EXP || "N/A"}</h1>
              <h1>College: {playerBio?.SCHOOL || "N/A"}</h1>
            </div>
          </div>

          {/* averages */}
          <div className="border-2 border-gray-500 rounded-lg w-full mb-6">
            <h1 className="bg-blue-600 text-center rounded-t-md text-white">
              Latest Season Played
            </h1>
            <div className="grid grid-cols-4 gap-4 p-4 text-center">
              <div>
                <h1>Points</h1>
                <div>{playerStats?.PTS || "N/A"}</div>
              </div>
              <div>
                <h1>Rebounds</h1>
                <div>{playerStats?.REB || "N/A"}</div>
              </div>
              <div>
                <h1>Assists</h1>
                <div>{playerStats?.AST || "N/A"}</div>
              </div>
              <div>
                <h1>Field Goal Percentage</h1>
                <div>
                  {playerStats?.FG_PCT
                    ? (playerStats.FG_PCT * 100).toFixed(1) + "%"
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerStats;
