import type { CategorySource } from "@/types";

export const jobs: CategorySource = {
  id: "jobs",
  label: "Jobs",
  description: "Professions, occupations, trades and specialist roles.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Doctor|Teacher|Chef|Pilot|Firefighter|Police officer|Farmer|Artist|Plumber|Dentist|Nurse|Baker|Engineer|Lawyer|Judge|Soldier|Driver|Tailor|Carpenter|Barber|Cobbler|Fisherman|Shopkeeper|Mechanic|Actor|Dancer|Astronaut|Scientist|Magician|Detective|Referee|Postman|Cashier|Waiter|Security guard|Gardener|Painter|Mason|Bus conductor",
    medium: "Architect|Electrician|Journalist|Veterinarian|Accountant|Photographer|Barista|Translator|Paramedic|Editor|Software developer|Data analyst|Pharmacist|Surgeon|Physiotherapist|Civil servant|IAS officer|Chartered accountant|Stockbroker|Air traffic controller|Interpreter|Librarian|Curator|Choreographer|Stuntman|Sherpa|Lifeguard|Ranger|Beekeeper|Potter|Weaver|Goldsmith|Fashion designer|Sound engineer|Voice actor|Content creator",
    hard: "Sommelier|Actuary|Locksmith|Taxidermist|Chiropractor|Pathologist|Blacksmith|Auctioneer|Stenographer|Cartographer|Surveyor|Statistician|Lamplighter|Toxicologist|Epidemiologist|Forensic accountant|Hydrologist|Meteorologist|Seismologist|Cryptographer|Falconer|Farrier|Luthier|Cooper|Wheelwright|Thatcher|Gaffer|Foley artist|Best boy|Key grip|Mahout|Toddy tapper|Dhobi|Ferryman|Lighthouse keeper|Heraldist|Town crier|Chimney sweep",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "Chef~Toque|job-tool|The tall white hat|global",
      "Firefighter~Dalmatian|job-workplace|The spotted dog is the classic fire-station mascot|global",
      "Teacher~Red pen|job-tool|Used for marking homework|global",
      "Barber~Striped pole|job-workplace|The red and white pole outside a barber shop|global",
      "Judge~Gavel|job-tool|The hammer used to call for order|global",
      "Astronaut~Zero gravity|job-workplace|Floating inside the space station|global",
      "Magician~Rabbit|job-tool|The classic hat trick|global",
      "Detective~Trench coat|job-tool|The classic film-noir outfit|global",
      "Referee~Yellow card|job-tool|A caution shown to a player|global",
      "Postman~Barking dogs|job-task|Dogs are a classic hazard of delivering mail|global",
    ],
    medium: [
      "Architect~Blueprint|job-tool|The plan of a building|global",
      "Journalist~Scoop|job-task|An exclusive story|global",
      "Accountant~Ledger|job-tool|The book of financial accounts|global",
      "Photographer~Aperture|job-tool|The lens opening that controls light|global",
      "Barista~Latte art|job-task|Pouring patterns into milk foam|global",
      "Translator~Lost in translation|film-fact|A phrase and a Sofia Coppola film about miscommunication|global",
      "Paramedic~Golden hour|job-task|The critical first hour after a serious injury|global",
      "Lifeguard~Whistle|job-tool|Blown to warn swimmers|global",
      "Sherpa~Tenzing Norgay|person-achievement|Reached the Everest summit with Edmund Hillary in 1953|global",
      "Editor~Final cut|job-task|The finished version of a film|global",
    ],
    hard: [
      "Sommelier~Terroir|job-task|Judges wine by its place of origin|global",
      "Actuary~Mortality tables|job-tool|Statistics used to price risk|global",
      "Locksmith~Lock picking|job-task|Opening locks without keys|global",
      "Blacksmith~Anvil|job-tool|The iron block metal is hammered on|global",
      "Auctioneer~Going once|job-task|The countdown before the hammer falls|global",
      "Stenographer~Shorthand|job-task|Rapid symbols to record speech|global",
      "Cartographer~Mercator projection|job-task|A famous way of flattening the globe|global",
      "Surveyor~Theodolite|job-tool|Measures angles on land|global",
      "Town crier~Oyez|job-task|The traditional call for attention|global",
      "Chimney sweep~Good luck|place-culture|A sweep is considered a lucky sight in some cultures|global",
    ],
  },
};
