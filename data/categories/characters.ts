import type { CategorySource } from "@/types";

export const characters: CategorySource = {
  id: "characters",
  label: "Characters",
  description: "Fictional characters from literature, comics, animation and screen media.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Batman|Mickey Mouse|Harry Potter|Spider-Man|Winnie the Pooh|Sherlock Holmes|Pikachu|Shrek|Elsa|Mario|Superman|Donald Duck|Iron Man|Hulk|Thor|Captain America|Doraemon|Nobita|Chhota Bheem|Motu Patlu|Tom|Jerry|Goofy|Pinocchio|Cinderella|Snow White|Simba|Woody|Buzz Lightyear|Olaf|Moana|Dora the Explorer|SpongeBob|Peppa Pig|Mowgli|Hanuman|Santa Claus",
    medium: "Gandalf|Darth Vader|Wonder Woman|Hermione Granger|Tintin|Scooby-Doo|Captain Jack Sparrow|Bugs Bunny|Alice|Dumbledore|Daffy Duck|Yoda|Luke Skywalker|Jon Snow|Walter White|Joey Tribbiani|Chandler Bing|Gru|Minions|Naruto|Goku|Luffy|Pennywise|Voldemort|Katniss Everdeen|Peter Pan|Captain Hook|Tarzan|Aladdin|Genie|Baloo|Shaktimaan|Krrish|Chulbul Pandey|Munna Bhai|Gabbar Singh|Mogambo",
    hard: "Gollum|Hannibal Lecter|Rorschach|Marvin the Martian|Don Quixote|Captain Haddock|Ebenezer Scrooge|Jessica Rabbit|Hercule Poirot|Miss Marple|Sancho Panza|Frodo|Samwise Gamgee|Tyrion Lannister|Ned Stark|Gregor Samsa|Holden Caulfield|Atticus Finch|Dr Watson|Moriarty|Dorian Gray|Heathcliff|Jay Gatsby|Elizabeth Bennet|Mr Darcy|Captain Nemo|Phileas Fogg|Long John Silver|Dracula|Count Olaf|Calvin|Hobbes|Asterix|Obelix|Lucky Luke|Tenali Raman|Birbal|Vikram and Betaal|Chacha Chaudhary|Suppandi",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "Superman~Henry Cavill|character-actor|Cavill played Superman in the DC films|global",
      "Joker~Heath Ledger|character-actor|Ledger's Oscar-winning Joker in The Dark Knight|global",
      "Doraemon~Pocket|film-prop|His fourth-dimensional pocket holds the gadgets|global,japanese",
      "Shrek~Onion|film-dialogue|Shrek explains that ogres are like onions with layers|global",
      "Spider-Man~Tobey Maguire|character-actor|Played Peter Parker in Sam Raimi's trilogy|global",
      "Iron Man~Arc reactor|film-prop|The glowing device in Tony Stark's chest|global",
      "Harry Potter~Lightning scar|character-trait|The mark on his forehead|global",
      "Mickey Mouse~Steamboat Willie|film-fact|Debuted in the 1928 cartoon Steamboat Willie|global",
      "Mario~Plumber|character-trait|His job in the Mushroom Kingdom|global",
      "Batman~Alfred|film-character|His loyal butler|global",
    ],
    medium: [
      "Gandalf~Ian McKellen|character-actor|McKellen played the wizard in Peter Jackson's films|global",
      "Darth Vader~James Earl Jones|character-actor|Jones provided Vader's voice|global",
      "Wonder Woman~Lasso of Truth|film-prop|Her golden lasso compels honesty|global",
      "Hermione Granger~Time-Turner|film-prop|The device she uses in Prisoner of Azkaban|global",
      "Captain Jack Sparrow~Compass|film-prop|His compass does not point north|global",
      "Bugs Bunny~What's up Doc|film-dialogue|His catchphrase|global",
      "Alice~Rabbit hole|film-scene|She falls down a rabbit hole into Wonderland|global",
      "Chhota Bheem~Laddoo|character-trait|His strength comes from eating laddoos|indian",
      "Motu Patlu~Samosa|character-trait|Motu is obsessed with samosas|indian",
      "Tintin~Snowy|film-character|His loyal white terrier|global",
    ],
    hard: [
      "Gollum~Andy Serkis|character-actor|Serkis performed Gollum through motion capture|global",
      "Hannibal Lecter~Fava beans|film-dialogue|His chilling line in The Silence of the Lambs|global",
      "Rorschach~Inkblot mask|character-trait|His mask's shifting inkblot patterns|global",
      "Marvin the Martian~Space modulator|film-prop|His explosive Illudium Q-36 weapon|global",
      "Don Quixote~Windmills|character-trait|He famously charges at windmills|global",
      "Captain Haddock~Blistering barnacles|film-dialogue|His favourite exclamation|global",
      "Ebenezer Scrooge~Three ghosts|film-scene|Visited by the ghosts of Christmas Past, Present and Yet to Come|global",
      "Hercule Poirot~Little grey cells|film-dialogue|His phrase for his intellect|global",
      "Gabbar Singh~Kitne aadmi the|film-dialogue|The Sholay villain's famous question|indian,hindi",
      "Mogambo~Khush hua|film-dialogue|The Mr India villain's catchphrase|indian,hindi",
    ],
  },
};
