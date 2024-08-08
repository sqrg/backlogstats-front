import React, { useState } from "react";

import Select from "react-select";
import AsyncSelect from "react-select/async";
import { debounce } from "lodash";

import { searchGames, getGame } from "../_services/GamesService";
import { Game } from "../_models/game";

type SelectOptions = {
  value: number,
  label: string,
}

export default function AddGame() {
  const [selectedGame, setSelectedGame] = useState<Game>();
  const [selectedGamePlatforms, setSelectedGamePlatforms] = useState<SelectOptions>();

  // Should I use useCallback here?
  const getOptions = debounce((input: string, callback: any) => {
    if (input.length < 3) {
      return callback([]);
    }

    searchGames(input).then((games) => {
      const options = games.map((game) => ({
        value: game.id,
        label: game.name,
      }));

      callback(options);
    });
  }, 500);

  const handleChange = async (selectedOption: any) => {
    const selectedGame = await getGame(selectedOption.value);

    setSelectedGame(selectedGame);

    if (selectedGame) {

      const platformsOptions = selectedGame.platforms?.map<SelectOptions>((p) => {
        value: p.
      })

    }

  };

  return (
    <div>
      <h1>Add game</h1>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={getOptions}
        onChange={handleChange}
      />
      {selectedGame && (
        <Select options={selectedGame.platforms} isMulti={true} />
      )}
    </div>
  );
}
