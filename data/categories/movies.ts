import type { CategorySource } from "@/types";

export const movies: CategorySource = {
  id: "movies",
  label: "Movies",
  description: "Film titles, franchises and genres.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Titanic|Frozen|The Lion King|Avatar|Jurassic Park|Toy Story|Finding Nemo|Star Wars|Kung Fu Panda|Home Alone|Star Trek|Sholay|Dilwale Dulhania Le Jayenge|3 Idiots|Dangal|PK|Baahubali|Drishyam|Pushpa|Kabir Singh|Chennai Express|Kuch Kuch Hota Hai|Hum Aapke Hain Koun|Mr India|Hera Pheri|Welcome|The Avengers|Spider-Man: No Way Home|Harry Potter and the Philosopher's Stone|Despicable Me|Ice Age|Beauty and the Beast|Black Panther|Barbie|Oppenheimer|Top Gun|Jawan|Pathaan",
    medium: "Inception|The Matrix|Gladiator|Parasite|Interstellar|Forrest Gump|Back to the Future|The Godfather|Jaws|Goodfellas|Spirited Away|Your Name|Kumbalangi Nights|Premam|Manichitrathazhu|Kireedam|Spadikam|Narasimham|Lucifer|Minnal Murali|Bangalore Days|Ustad Hotel|Maheshinte Prathikaaram|Joji|Jallikattu|The Great Indian Kitchen|Vikram Vedha|Kaithi|Vikram|Jai Bhim|Soorarai Pottru|Asuran|Super Deluxe|Magadheera|Arjun Reddy|Eega|KGF|Kantara|Ugramm|Lucia|Taare Zameen Par|Swades|Rang De Basanti|Gully Boy|Andaz Apna Apna|Jab We Met|Om Shanti Om|Zindagi Na Milegi Dobara|Barfi|Anand|Shawshank Redemption|Fight Club|Whiplash|Coco|Ratatouille|WALL-E|Mad Max: Fury Road|Dune|Everything Everywhere All at Once",
    hard: "Pulp Fiction|Blade Runner|Stalker|Oldboy|Amélie|Metropolis|Memento|Rashomon|Pan's Labyrinth|Seven Samurai|The Prestige|Reservoir Dogs|Pather Panchali|Charulata|Meghe Dhaka Tara|Ajantrik|Elippathayam|Chemmeen|Piravi|Nirmalyam|Vanaprastham|Tokyo Story|Ikiru|Ran|Throne of Blood|The 400 Blows|Breathless|Persona|The Seventh Seal|Wild Strawberries|La Dolce Vita|Bicycle Thieves|Cinema Paradiso|Wings of Desire|Run Lola Run|Das Boot|Come and See|Solaris|Andrei Rublev|In the Mood for Love|Chungking Express|A Brighter Summer Day|Taxi Driver|Apocalypse Now|Citizen Kane|Vertigo|Rear Window|Psycho|Casablanca|Sunset Boulevard|Some Like It Hot|Pyaasa|Kaagaz Ke Phool|Mother India|Awaara|Do Bigha Zamin|Garm Hava|Ankur|Manthan|Bhumika|Salaam Bombay|Mirch Masala",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "Titanic~Iceberg|film-scene|The ship strikes an iceberg|global",
      "Drishyam~Georgekutty|film-character|The family man at the centre of the story|indian,malayalam",
      "Sholay~Jai and Veeru|film-character|The two friends who take on Gabbar|indian,hindi",
      "3 Idiots~All is well|film-dialogue|The film's recurring mantra|indian,hindi",
      "Dilwale Dulhania Le Jayenge~Mustard fields|film-scene|The iconic romantic fields scene|indian,hindi",
      "Jurassic Park~Mosquito in amber|film-prop|DNA taken from a mosquito preserved in amber|global",
      "Finding Nemo~Just keep swimming|film-dialogue|Dory's song-like mantra to stay hopeful|global",
      "Home Alone~Booby traps|film-scene|Kevin defends the house with traps|global",
      "Baahubali~Kattappa|film-dialogue|The question of why Kattappa killed Baahubali|indian,telugu",
      "Toy Story~Andy's boot|film-prop|Andy's name is written under Woody's boot|global",
    ],
    medium: [
      "Interstellar~Bookshelf|film-scene|Cooper signals through a bookshelf from inside the tesseract|global",
      "John Wick~Pencil|film-scene|He kills three men with a pencil|global",
      "Manichitrathazhu~Nagavalli|film-character|The haunting figure at the heart of the Malayalam classic|indian,malayalam",
      "Premam~Malar|film-character|The teacher George falls for|indian,malayalam",
      "KGF~Kolar Gold Fields|film-location|The mining setting of the Kannada films|indian,kannada",
      "Kantara~Panjurli|film-character|The guardian spirit worshipped in the story|indian,kannada",
      "RRR~Naatu Naatu|film-music|The song that won the Best Original Song Oscar|indian,telugu",
      "Lagaan~Cricket match|film-scene|Villagers play British officers to avoid tax|indian,hindi",
      "Parasite~Scholar's rock|film-prop|The stone gift brought to the Kim family|global,korean",
      "Inception~Spinning top|film-prop|The totem that tests whether he is dreaming|global",
    ],
    hard: [
      "Pulp Fiction~Glowing briefcase|film-prop|Its contents are never revealed|global",
      "Blade Runner~Origami unicorn|film-prop|The folded figure left by Gaff|global",
      "Stalker~The Zone|film-location|The mysterious restricted area at the heart of the film|global",
      "Oldboy~Hallway fight|film-scene|A long corridor brawl with a hammer|global,korean",
      "Rashomon~Conflicting testimonies|film-fact|The same crime recounted in different ways|global,japanese",
      "Metropolis~Maria robot|film-character|The robot double built to look like Maria|global",
      "Pan's Labyrinth~Pale Man|film-character|The creature with eyes in the palms of its hands|global",
      "Seven Samurai~Magnificent Seven|film-fact|Inspired the Hollywood remake|global,japanese",
      "Pather Panchali~Kaash fields|film-scene|Apu and Durga see a train through fields of kaash grass|indian,bengali",
      "Mughal-e-Azam~Sheesh Mahal|film-location|The mirror-palace song sequence|indian,hindi",
    ],
  },
};
