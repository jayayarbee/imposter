import type { CategorySource } from "@/types";

export const nature: CategorySource = {
  id: "nature",
  label: "Nature",
  description: "Animals, plants, weather, ecosystems and natural phenomena.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Elephant|Rainbow|Sunflower|Volcano|Waterfall|Thunderstorm|Penguin|Cactus|Dolphin|Butterfly|Crocodile|Alligator|Frog|Toad|Tiger|Lion|Giraffe|Zebra|Monkey|Parrot|Peacock|Owl|Bee|Camel|Kangaroo|Panda|Whale|Shark|Octopus|Snake|Lightning|Snowfall|Earthquake|Mountain|River|Desert|Island|Rose|Lotus|Mango tree|Banyan tree",
    medium: "Coral reef|Tornado|Chameleon|Bamboo|Glacier|Mangrove|Hummingbird|Orchid|Quicksand|Aurora|Hurricane|Typhoon|Rabbit|Hare|Eclipse|Monsoon|Cyclone|Tsunami|Landslide|Wildfire|Sundarbans|Western Ghats|Himalayas|Great Barrier Reef|Amazon rainforest|Sahara|Savanna|Tundra|Rhododendron|Venus flytrap|Orangutan|Komodo dragon|Platypus|Sloth|Flamingo|Kingfisher|Firefly|Dragonfly|Hornbill",
    hard: "Mycelium|Axolotl|Pangolin|Bioluminescence|Tardigrade|Permafrost|Kelp forest|Narwhal|Fjord|Stalactite|Stalagmite|Llama|Alpaca|Photosynthesis|Symbiosis|Keystone species|Carbon sink|Mycorrhiza|Lichen|Geyser|Karst|Estuary|Tectonic plate|Ring of Fire|El Niño|Jet stream|Pitcher plant|Titan arum|Rafflesia|Mimic octopus|Leafcutter ant|Lyrebird|Okapi|Aye-aye|Sundew|Cassowary",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "Spider~Patience|animal-trait|Waits for prey in its web|global",
      "Elephant~Memory|animal-trait|Elephants are famed for remembering|global",
      "Rainbow~Prism|nature-mechanism|Raindrops split sunlight like a prism|global",
      "Volcano~Pompeii|nature-consequence|Vesuvius buried the Roman town|global",
      "Thunderstorm~Counting seconds|nature-mechanism|Counting the gap between flash and bang estimates distance|global",
      "Peacock~Dance|animal-trait|Males fan their feathers in a courtship dance|indian",
      "Cactus~Water storage|nature-mechanism|Stores water in its thick stem|global",
      "Sunflower~Following the sun|nature-mechanism|Young sunflowers track the sun across the sky|global",
      "Butterfly~Metamorphosis|nature-mechanism|Changes from caterpillar to adult via a chrysalis|global",
      "Bee~Waggle dance|animal-trait|Honeybees signal food locations by dancing|global",
    ],
    medium: [
      "Tsunami~Landslide|nature-consequence|Underwater landslides can trigger tsunamis|global",
      "Chameleon~Tongue|animal-trait|Shoots a sticky tongue to catch insects|global",
      "Bamboo~Fast growth|nature-mechanism|Some bamboo grows nearly a metre in a day|global",
      "Glacier~Sea level|nature-consequence|Melting ice raises sea levels|global",
      "Hummingbird~Hover|animal-trait|Can hover and fly backwards|global",
      "Aurora~Solar wind|nature-mechanism|Charged particles from the sun hit the atmosphere|global",
      "Tornado~Dorothy|film-scene|A tornado carries Dorothy to Oz in The Wizard of Oz|global",
      "Mangrove~Sundarbans|nature-location|Vast mangrove forest shared by India and Bangladesh|indian",
      "Monsoon~Kerala|nature-location|The monsoon typically reaches Kerala first|indian",
      "Coral reef~Bleaching|nature-consequence|Warm water makes corals expel their algae|global",
    ],
    hard: [
      "Mycelium~Wood wide web|nature-mechanism|Fungal networks that link tree roots|global",
      "Tardigrade~Outer space|animal-trait|Survived exposure to space in a 2007 experiment|global",
      "Axolotl~Regeneration|animal-trait|Can regrow limbs and parts of organs|global",
      "Bioluminescence~Luciferin|nature-mechanism|The molecule that produces light in many glowing organisms|global",
      "Permafrost~Methane|nature-consequence|Thawing frozen ground releases greenhouse gases|global",
      "Narwhal~Unicorn of the sea|animal-trait|Nickname inspired by its long tusk|global",
      "Pangolin~Trafficking|nature-consequence|Widely described as the most trafficked mammal|global",
      "Kelp forest~Sea otter|nature-mechanism|Otters eat urchins that would otherwise devour kelp|global",
      "Fjord~Glacier|nature-mechanism|Glaciers carve deep valleys that the sea later floods|global",
      "Stalactite~Dripping water|nature-mechanism|Mineral-rich drips build cave formations over time|global",
    ],
  },
};
