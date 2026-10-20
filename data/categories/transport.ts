import type { CategorySource } from "@/types";

export const transport: CategorySource = {
  id: "transport",
  label: "Transport",
  description: "Vehicles, railways, aircraft, ships and public transport.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Bicycle|Car|Bus|Airplane|Train|Motorcycle|Taxi|Boat|Helicopter|Scooter|Metro|Tram|Ship|Tractor|Truck|Lorry|Jeep|Van|Fire engine|Rickshaw|Auto rickshaw|Bullock cart|Horse cart|Mumbai local|Double-decker bus|Rocket|Spaceship|Parachute|Bike|Roller skates|Wheelchair|Fighter jet|Tempo|Delhi Metro|Kochi Metro",
    medium: "Submarine|Ferry|Cable car|Ambulance|Skateboard|Jet ski|Monorail|Segway|Cruise ship|Tuk-tuk|Trolley|Seaplane|Glider|Paraglider|Cargo ship|Tanker|Container ship|Barge|Houseboat|Shikara|Speedboat|Kayak|Canoe|Vande Bharat|Rajdhani Express|Toy train|Palace on Wheels|Concorde|Airbus A380|Boeing 747|Electric car|Hybrid car|Hyperloop|Water Metro|Kolkata tram",
    hard: "Hovercraft|Funicular|Gondola|Hot air balloon|Trolleybus|Maglev|Bullet train|Zeppelin|Blimp|Catamaran|Trimaran|Hansom cab|Penny-farthing|Velocipede|Sedan chair|Palanquin|Chariot|Dhow|Junk|Clipper ship|Galleon|Longship|Coracle|Outrigger|Hovertrain|Aerotrain|Monowheel|Airship|Autogyro|Tiltrotor|Space shuttle|Lunar rover|Bathyscaphe|Icebreaker|Snowcat|Sleigh|Dog sled|Camel caravan|Steam locomotive",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "Train~Chai vendors|transport-feature|Tea sellers working the platforms|indian",
      "Taxi~Yellow cab|transport-feature|New York's iconic colour|global",
      "Mumbai local~Dabbawalas|transport-route|Tiffin carriers use the trains|indian",
      "Bicycle~Bell|transport-feature|The ring to warn pedestrians|global",
      "Airplane~Window seat|daily-context|A prized seat on a flight|global",
      "London bus~Double-decker|transport-feature|The red two-storey bus|global",
      "Metro~Smart card|transport-feature|Tap-and-go travel passes|global",
      "Auto rickshaw~Meter|transport-feature|The fare dial passengers argue about|indian",
      "Scooter~Vespa|brand-product|The Italian scooter that defined the category|global",
      "Ship~Lifeboats|film-fact|Titanic famously had too few|global",
    ],
    medium: [
      "Submarine~Sonar|transport-feature|Used to detect objects underwater|global",
      "Ferry~Water Metro|transport-route|Kochi's electric boat network|indian,malayalam",
      "Cable car~Gulmarg|transport-route|A high-altitude gondola in Kashmir|indian",
      "Ambulance~Mirror writing|transport-feature|The front text is reversed so mirrors read it|global",
      "Skateboard~Ollie|sport-term|The basic jump trick|global",
      "Monorail~Mumbai|transport-route|India's first modern monorail opened there in 2014|indian",
      "Segway~Gyroscope|transport-feature|Sensors keep the rider balanced|global",
      "Cruise ship~Buffet|daily-context|Famous for endless food|global",
      "Rickshaw~Kolkata hand-pulled|transport-route|Kolkata still has hand-pulled rickshaws|indian",
      "Tuk-tuk~Bangkok|transport-route|A signature way to get around the city|global",
    ],
    hard: [
      "Hovercraft~Air cushion|transport-feature|Rides on a cushion of air|global",
      "Funicular~Counterbalanced cars|transport-feature|Two cars on a slope balance each other|global",
      "Gondola~Venice|transport-route|The city's classic canal boat|global",
      "Hot air balloon~Montgolfier brothers|person-event|Made the first public flights in 1783|global",
      "Maglev~Shanghai|transport-route|Its airport maglev is a famous example|global",
      "Zeppelin~Hindenburg|person-event|The 1937 airship disaster|global",
      "Catamaran~Tamil word|wordplay|Derived from Tamil kattumaram, logs tied together|global",
      "Steam locomotive~Stephenson's Rocket|person-event|The famous 1829 engine|global",
      "Tram~Kolkata|transport-route|India's only city with trams, though the network has shrunk|indian",
      "Trolleybus~Overhead wires|transport-feature|Powered through wires above the road|global",
    ],
  },
};
