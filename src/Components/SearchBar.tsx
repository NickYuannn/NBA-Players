import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { players } from "./players";
import { Command, CommandGroup, CommandItem } from "./ui/command";
import Fuse from "fuse.js";
import { useState } from "react";

function SearchBar() {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const fuse = new Fuse(players, { threshold: 0.3 });

  const filtered =
    input.length > 0 ? fuse.search(input).map((r) => r.item) : [];

  return (
    <div className="relative w-full max-w-md text-white">
      <Input
        type="text"
        placeholder="Search NBA player..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="rounded-lg"
      />
      {open && filtered.length > 0 && (
        <Command className="absolute top-full z-10 w-full bg-white border shadow-md mt-1 rounded-lg">
          <CommandGroup>
            {filtered.map((player, index) => (
              <CommandItem
                key={index}
                onSelect={() => {
                  setInput(player);
                  setOpen(false);
                }}
              >
                {player}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      )}
    </div>
  );
}

export default SearchBar;
