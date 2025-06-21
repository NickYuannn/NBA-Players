import { Input } from "./ui/input";
import { Command, CommandGroup, CommandItem } from "./ui/command";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { motion } from "framer-motion";

type SearchBarProps = {
  playerName: string;
  setPlayerName: (value: string) => void;
  players: string[];
  onRefresh?: () => void;
};

function SearchBar({
  playerName,
  setPlayerName,
  players,
  onRefresh,
}: SearchBarProps) {
  const fuse = new Fuse(players, { threshold: 0.3 });
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (input === "") {
      setPlayerName("");
    }
  }, [input, setPlayerName]);

  const results = input.length > 0 ? fuse.search(input).map((r) => r.item) : [];

  const handleSelect = (player: string) => {
    setInput(player);
    setOpen(false);
    console.log;
    setPlayerName(player);
  };

  return (
    <div className="flex items-center justify-center gap-4 px-6 py-4 bg-gray-800 rounded-lg shadow-lg w-2xl">
      <div className="relative w-full text-white">
        <Input
          type="text"
          placeholder="Search NBA player..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="rounded-lg hover:scale-105 transition-transform duration-200 ease-in-out"
        />
        {results.length > 0 && open && (
          <Command>
            <CommandGroup className="bg-white rounded-2xl text-black">
              {results.map((player, index) => (
                <CommandItem key={index} onSelect={() => handleSelect(player)}>
                  {player}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        )}
      </div>
      {playerName && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <FiRefreshCcw
            size={32}
            color="white"
            className="cursor-pointer"
            onClick={() => {
              if (onRefresh) onRefresh();
            }}
          />
        </motion.div>
      )}
    </div>
  );
}

export default SearchBar;
