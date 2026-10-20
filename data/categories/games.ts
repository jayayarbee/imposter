import type { CategorySource } from "@/types";

export const games: CategorySource = {
  id: "games",
  label: "Games",
  description: "Video games, board games, mobile games and tabletop games.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Minecraft|Tetris|Monopoly|Chess|Fortnite|Pac-Man|Angry Birds|Uno|Candy Crush|Snakes and Ladders|Checkers|Scrabble|Ludo|Carrom|Temple Run|Pokémon Go|Mario Kart|Super Mario|Pokémon|Free Fire|PUBG|BGMI|Call of Duty|FIFA|GTA|Clash of Clans|Hill Climb Racing|Flappy Bird|Pong|Poker|Rummy|Hide and seek|Mastermind|Sudoku|Rubik's Cube|Lego",
    medium: "Roblox|Among Us|Cluedo|Fall Guys|Stardew Valley|Rocket League|The Sims|Catan|Subway Surfers|Jenga|Zelda|Elden Ring|Red Dead Redemption|The Witcher|Skyrim|Overwatch|Valorant|League of Legends|Dota 2|Genshin Impact|Animal Crossing|Pictionary|Taboo|Codenames|Carcassonne|Ticket to Ride|Pandemic|Risk|Wordle|Tekken|Street Fighter|Mortal Kombat|Counter-Strike|Satisfactory",
    hard: "Dark Souls|Hollow Knight|Factorio|Dwarf Fortress|Disco Elysium|Terraforming Mars|Gloomhaven|Backgammon|Celeste|Portal|Half-Life|Braid|Hades|Undertale|Outer Wilds|Return of the Obra Dinn|Baba Is You|Katamari Damacy|Shadow of the Colossus|Bloodborne|Azul|Wingspan|Brass Birmingham|Twilight Struggle|Pandemic Legacy|Mahjong|Shogi|Xiangqi|Chaturanga|Pachisi|Mancala|Senet|Zork",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "Minecraft~Creeper|game-character|The green mob that explodes near players|global",
      "Pac-Man~Power pellet|game-mechanic|Lets him eat the ghosts|global",
      "Monopoly~Jail|game-mechanic|The Go to Jail square|global",
      "Uno~Draw four|game-mechanic|The wild card that forces four cards|global",
      "Snakes and Ladders~Moksha Patam|place-culture|The Indian game it grew out of|indian",
      "Angry Birds~Slingshot|game-mechanic|How birds are launched|global",
      "Candy Crush~Match three|game-mechanic|Swapping candies to line up three|global",
      "Fortnite~Victory Royale|game-mechanic|The winning message|global",
      "Ludo~Six|game-mechanic|You need a six to leave home|indian",
      "Carrom~Striker|game-mechanic|The disc used to pocket coins|indian",
    ],
    medium: [
      "Tetris~Alexey Pajitnov|person-event|Created by the Soviet engineer|global",
      "Chess~En passant|game-mechanic|A special pawn capture|global",
      "Among Us~Emergency meeting|game-mechanic|Crew call to vote out suspects|global",
      "Cluedo~Candlestick|game-mechanic|One of the murder weapons|global",
      "Catan~Robber|game-mechanic|Blocks a hex and steals resources|global",
      "Stardew Valley~Parsnip|game-mechanic|The first crop most players plant|global",
      "The Sims~Plumbob|game-mechanic|The green diamond over a Sim's head|global",
      "Rocket League~Soccer with cars|game-mechanic|Football played by rocket-powered cars|global",
      "Subway Surfers~Graffiti|game-lore|The runner is chased after tagging a railway|global",
      "Roblox~Robux|game-mechanic|Its in-game currency|global",
    ],
    hard: [
      "Dark Souls~Praise the sun|game-lore|Solaire's gesture and phrase|global",
      "Hollow Knight~Hallownest|game-lore|The ruined underground kingdom|global",
      "Factorio~The factory must grow|game-lore|The community's mantra|global",
      "Dwarf Fortress~Losing is fun|game-lore|The community's motto|global",
      "Disco Elysium~Skill voices|game-mechanic|Character skills speak in your head|global",
      "Terraforming Mars~Corporations|game-mechanic|Players play as competing corporations|global",
      "Gloomhaven~Ability cards|game-mechanic|The same cards drive attacks and movement|global",
      "Backgammon~Doubling cube|game-mechanic|Raises the stakes of a game|global",
      "Celeste~Strawberries|game-mechanic|The optional collectibles in each level|global",
      "Zork~Grue|game-lore|You are likely to be eaten by one in the dark|global",
    ],
  },
};
