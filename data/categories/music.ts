import type { CategorySource } from "@/types";

export const music: CategorySource = {
  id: "music",
  label: "Music",
  description: "Artists, bands, instruments, genres and albums.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Guitar|Piano|Drums|The Beatles|Violin|Pop|Rock|Hip hop|Queen|Adele|Bass guitar|Cello|Flute|Trumpet|Harmonium|Dholak|Keyboard|DJ|Concert|Playlist|Karaoke|Ghazal|Qawwali|Carnatic music|Hindustani classical|Lullaby|National anthem|Disco|EDM|K-pop|BTS|Michael Jackson|Arijit Singh|Shreya Ghoshal|Sonu Nigam|Kishore Kumar|Mohammed Rafi",
    medium: "Saxophone|Jazz|Coldplay|Ukulele|Orchestra|Bollywood|Eminem|Harmonica|Opera|Reggae|Clarinet|Veena|Mridangam|Santoor|Bansuri|Ghatam|Chenda|Maddalam|Edakka|K. J. Yesudas|K. S. Chithra|Sid Sriram|Anirudh Ravichander|Honey Singh|Badshah|Diljit Dosanjh|Prateek Kuhad|Linkin Park|Imagine Dragons|Maroon 5|Metallica|Nirvana|Led Zeppelin|AC/DC|ABBA|Elvis Presley|Bob Marley|Mozart|Beethoven|Bach|Vivaldi|Daft Punk|Gorillaz",
    hard: "Theremin|Dubstep|Pink Floyd|Radiohead|Fugue|Bossa nova|Tabla|Shoegaze|Sitar|Sarod|Harpsichord|Clavichord|Raga|Tala|Thumri|Dhrupad|Tillana|Baul|Rabindra Sangeet|Gamelan|Didgeridoo|Hurdy-gurdy|Kora|Oud|Erhu|Shamisen|Balalaika|Bagpipes|Glass harmonica|Ondes Martenot|Counterpoint|Polyrhythm|Syncopation|Time signature|Key change|Krautrock|Math rock|Post-rock|Trip hop|Vaporwave|City pop|Zakir Hussain|Ravi Shankar",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "The Beatles~Abbey Road|music-signature|The album cover with the zebra crossing|global",
      "Queen~Bohemian Rhapsody|music-song|Their six-minute operatic rock epic|global",
      "Adele~Hello|music-song|Her chart-topping 2015 comeback single|global",
      "Ed Sheeran~Loop pedal|music-instrument|Builds songs live by layering loops|global",
      "Violin~Stradivarius|music-instrument|The most famous violin makers|global",
      "Piano~Middle C|music-instrument|The central reference key|global",
      "Hip hop~Turntable|music-instrument|DJs scratch records on turntables|global",
      "Arijit Singh~Tum Hi Ho|music-song|His breakout song from Aashiqui 2|indian,hindi",
      "Lata Mangeshkar~Ae Mere Watan Ke Logon|music-song|Her emotional 1963 patriotic song|indian,hindi",
      "Guitar~Plectrum|music-instrument|The small pick used to strum|global",
    ],
    medium: [
      "Coldplay~Yellow|music-song|One of their early hit singles|global",
      "Ukulele~Hawaii|place-culture|Strongly linked with Hawaiian music|global",
      "Eminem~Lose Yourself|music-song|The 8 Mile song that won an Oscar|global",
      "Jazz~Improvisation|music-signature|Musicians invent solos on the spot|global",
      "Daft Punk~Helmets|music-signature|The robot helmets they perform in|global",
      "Gorillaz~Animated band|music-signature|Its members are cartoon characters|global",
      "Reggae~Bob Marley|music-signature|The genre's best-known global star|global",
      "Opera~La Scala|place-landmark|Milan's famous opera house|global",
      "Saxophone~Adolphe Sax|person-event|Invented in the 1840s by Adolphe Sax|global",
      "Imagine Dragons~Radioactive|music-song|Their breakthrough hit from Night Visions|global",
    ],
    hard: [
      "Theremin~No touching|music-instrument|Played without physical contact|global",
      "Sitar~Ravi Shankar|music-signature|Introduced the sitar to Western audiences|indian,global",
      "Dubstep~Wobble bass|music-signature|The genre's trademark growling bass|global",
      "Radiohead~Pay what you want|person-event|They released In Rainbows with pay-what-you-want pricing|global",
      "Fugue~Bach|music-signature|Bach perfected the form|global",
      "Bossa nova~Girl from Ipanema|music-song|The genre's most famous song|global",
      "Tabla~Zakir Hussain|music-signature|The maestro who took the tabla worldwide|indian",
      "Shoegaze~Effects pedals|music-instrument|Defined by washes of pedal effects|global",
      "Harpsichord~Plucked strings|music-instrument|Strings are plucked rather than struck|global",
      "Pink Floyd~Prism|music-signature|The cover of The Dark Side of the Moon|global",
    ],
  },
};
