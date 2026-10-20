import type { CategorySource } from "@/types";

export const countries: CategorySource = {
  id: "countries",
  label: "Countries",
  description: "Countries, capitals, territories and well-known landmarks.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "India|France|Japan|Brazil|Egypt|Australia|Italy|Canada|Eiffel Tower|Great Wall of China|Austria|Sweden|Switzerland|USA|United Kingdom|China|Russia|Germany|Spain|Mexico|South Africa|Nepal|Sri Lanka|Pakistan|Bangladesh|Dubai|London|Paris|New York|Mumbai|Delhi|Kerala|Goa|Statue of Liberty|Big Ben|Leaning Tower of Pisa|Burj Khalifa|Niagara Falls|Mount Everest|Santorini",
    medium: "Argentina|Vietnam|Morocco|Taj Mahal|Machu Picchu|Reykjavik|Nairobi|Colosseum|Greenland|Singapore|Netherlands|Belgium|Red Fort|Scotland|Turkey|Thailand|Indonesia|Peru|Kenya|Cuba|Iceland|Norway|Portugal|Greece|Hawaii|Bali|Petronas Towers|Sydney Opera House|Golden Gate Bridge|Stonehenge|Kerala backwaters|Hampi|Jaipur|Varanasi|Moscow|Cairo|Havana|Lisbon",
    hard: "Bhutan|Kyrgyzstan|Suriname|Ulaanbaatar|Angkor Wat|Petra|Vanuatu|Lesotho|Tbilisi|Svalbard|Slovakia|Slovenia|Mauritius|Mauritania|Madagascar|Uzbekistan|Mongolia|Bolivia|Ethiopia|Tonga|Brunei|Eswatini|Samarkand|Timbuktu|Lhasa|Easter Island|Galápagos|Patagonia|Atacama Desert|Salar de Uyuni|Giant's Causeway|Cappadocia|Hallstatt|Zanzibar|Ladakh|Lakshadweep|Andaman Islands|Khajuraho|Konark Sun Temple|Ajanta Caves",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "Italy~Boot|place-feature|The peninsula's shape on the map|global",
      "Japan~Land of the rising sun|place-culture|Common nickname for the country|global",
      "Switzerland~Neutrality|place-culture|Long-standing policy of neutrality|global",
      "Netherlands~Windmills|place-landmark|Iconic windmills like those at Kinderdijk|global",
      "Canada~Maple syrup|food-origin|The world's largest producer|global",
      "Great Wall of China~Visible from space myth|place-culture|A popular claim that is not true to the naked eye|global",
      "Russia~Matryoshka|place-culture|Nesting wooden dolls|global",
      "Scotland~Kilt|place-culture|Traditional tartan garment|global",
      "Niagara Falls~Honeymoon|place-culture|A classic honeymoon destination|global",
      "India~Spices|place-culture|Historic spice trade|indian",
    ],
    medium: [
      "Greenland~Misleading name|wordplay|Mostly covered in ice despite the name|global",
      "Iceland~Geysers|place-feature|The word geyser comes from Iceland's Geysir|global",
      "Taj Mahal~Shah Jahan|person-event|Built by the Mughal emperor for Mumtaz Mahal|indian",
      "Machu Picchu~Llama|place-feature|Llamas graze among the Inca ruins|global",
      "Singapore~Fine city|wordplay|A pun on its strict rules and fines|global",
      "Morocco~Fez|wordplay|The hat is named after the city|global",
      "Nairobi~National park|place-feature|Wildlife park inside the city limits|global",
      "Vietnam~Motorbikes|place-culture|Streets filled with scooters|global",
      "Argentina~Tango|place-culture|The dance grew up in Buenos Aires|global",
      "Colosseum~Gladiators|place-landmark|Hosted gladiator contests|global",
    ],
    hard: [
      "Bhutan~Gross National Happiness|place-culture|The kingdom measures progress by happiness|global",
      "Kyrgyzstan~Yurt|place-culture|Nomadic felt tents central to its culture|global",
      "Suriname~Dutch speakers|place-feature|South America's only Dutch-speaking country|global",
      "Angkor Wat~Flag|place-feature|Appears on Cambodia's national flag|global",
      "Petra~Rose-red city|place-feature|Nickname from its sandstone colour|global",
      "Vanuatu~Land diving|place-culture|The Naghol ritual on Pentecost Island|global",
      "Lesotho~Kingdom in the sky|place-feature|The whole country lies at high altitude|global",
      "Tbilisi~Sulfur baths|place-feature|Famous baths in the Abanotubani district|global",
      "Svalbard~Seed vault|place-landmark|The Global Seed Vault stores crop backups|global",
      "Mauritius~Dodo|nature-consequence|The extinct bird appears on its coat of arms|global",
    ],
  },
};
