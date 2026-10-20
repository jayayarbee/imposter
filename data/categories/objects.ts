import type { CategorySource } from "@/types";

export const objects: CategorySource = {
  id: "objects",
  label: "Objects",
  description: "Everyday items, tools, household objects and equipment.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Umbrella|Scissors|Backpack|Toothbrush|Key|Clock|Mirror|Pillow|Candle|Spoon|Fork|Mug|Cup|Balloon|Matchbox|Lightbulb|Broom|Bucket|Towel|Soap|Comb|Wallet|Spectacles|Sofa|Mattress|Fan|Air conditioner|Refrigerator|Washing machine|Mixer grinder|Pressure cooker|Tiffin box|Water bottle|Lock|Ladder|Rope|Needle|Thread|Button|Zip",
    medium: "Screwdriver|Flashlight|Thermos|Padlock|Extension cord|Hammer|Tape measure|Hourglass|Lantern|Spanner|Kettle|Teapot|Pliers|Drill machine|Hacksaw|Handsaw|Tape|Stapler|Paper clip|Safety pin|Magnet|Mortar and pestle|Grinding stone|Brass lamp|Hand fan|Thermometer|Stethoscope|Binoculars|Telescope|Microscope|Gavel|Typewriter|Rotary phone|Slide rule|Quill|Tongs|Ladle|Sieve",
    hard: "Plumb line|Abacus|Spirit level|Vice grip|Compass|Magnifying glass|Barometer|Sextant|Astrolabe|Plumb bob|Theodolite|Hygrometer|Anemometer|Sundial|Metronome|Stereoscope|Gramophone|Kaleidoscope|Periscope|Pantograph|Bellows|Awl|Chisel|Mallet|Lathe|Anvil|Spindle|Loom|Charkha|Urli|Kerosene stove|Wick lamp|Coconut scraper",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "IKEA~Allen key|brand-product|Flat-pack furniture is assembled with an Allen key|global",
      "Mirror~Bad luck|place-culture|The superstition about breaking a mirror|global",
      "Keys~Keyboard|wordplay|Both are covered in keys|global",
      "Kettle~Whistle|object-sound|Whistles when the water boils|global",
      "Umbrella~Left behind|daily-context|Often forgotten on trains and in offices|global",
      "Balloon~Pop|object-sound|The sudden bang when it bursts|global",
      "Remote control~Sofa cushions|daily-context|Always lost between the cushions|global",
      "Clock~Tick-tock|object-sound|The sound of passing seconds|global",
      "Lightbulb~Bright idea|wordplay|A symbol for a good idea|global",
      "Matchbox~Strike|object-use|The rough side lights the match|global",
    ],
    medium: [
      "Screwdriver~Cocktail|wordplay|Also the name of a vodka and orange juice drink|global",
      "Gavel~Courtroom|object-setting|The judge's small hammer|global",
      "Lantern~Diogenes|person-event|He searched for an honest man with a lamp in daylight|global",
      "Stapler~Red Swingline|film-prop|Milton's beloved red stapler in Office Space|global",
      "Magnifying glass~Sherlock Holmes|film-prop|The detective's tool for studying clues|global",
      "Thermometer~Mercury|object-use|Old thermometers used a silver liquid metal|global",
      "Binoculars~Birdwatching|object-setting|A birder's essential|global",
      "Typewriter~Carriage return|object-sound|The ding and slide at the end of a line|global",
      "Safety pin~Punk|daily-context|Worn as a punk fashion statement|global",
      "Tape measure~Measure twice|daily-habit|The carpenter's rule of thumb|global",
    ],
    hard: [
      "Plumb bob~Vertical|object-use|Hangs on a string to show true vertical|global",
      "Abacus~Beads|object-use|Counting by sliding beads on rods|global",
      "Spirit level~Bubble|object-use|A trapped bubble shows whether a surface is level|global",
      "Barometer~Air pressure|object-use|Measures atmospheric pressure|global",
      "Sextant~Celestial navigation|object-use|Measures angles between stars and the horizon|global",
      "Slide rule~Engineers|object-use|Engineers calculated with it before pocket calculators|global",
      "Rotary phone~Dial|object-sound|The whirring return of a dial|global",
      "Quill~Feather|object-use|A pen cut from a feather|global",
      "Compass~Magnetic needle|object-use|A needle aligns with Earth's magnetic field|global",
      "Metronome~Tempo|object-use|Ticks to keep musical time|global",
    ],
  },
};
