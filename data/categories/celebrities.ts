import type { CategorySource } from "@/types";

export const celebrities: CategorySource = {
  id: "celebrities",
  label: "Celebrities",
  description: "Actors, musicians, athletes, entertainers and internet personalities.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Taylor Swift|Beyoncé|Elon Musk|Tom Cruise|Shah Rukh Khan|Oprah Winfrey|Will Smith|David Beckham|Ed Sheeran|Katy Perry|Brad Pitt|Amitabh Bachchan|Salman Khan|Akshay Kumar|Deepika Padukone|Alia Bhatt|Rajinikanth|Mohanlal|Mammootty|Lata Mangeshkar|A. R. Rahman|Katrina Kaif|Hrithik Roshan|Ranveer Singh|Justin Bieber|Rihanna|Kim Kardashian|Dwayne Johnson|Robert Downey Jr.|Jennifer Lawrence|Selena Gomez|Ariana Grande|Billie Eilish|Kylie Jenner",
    medium: "Keanu Reeves|Zendaya|Priyanka Chopra|MrBeast|Dua Lipa|Serena Williams|Gordon Ramsay|Trevor Noah|Bad Bunny|Emma Watson|Nicolas Cage|Dulquer Salmaan|Fahadh Faasil|Nivin Pauly|Prithviraj Sukumaran|Tovino Thomas|Vijay Sethupathi|Dhanush|Allu Arjun|Mahesh Babu|Jr NTR|Ram Charan|Yash|Prabhas|Rishab Shetty|Nawazuddin Siddiqui|Pankaj Tripathi|Rajkummar Rao|Vicky Kaushal|Kriti Sanon|Anushka Sharma|Taapsee Pannu|Samantha Ruth Prabhu|Nayanthara|Sai Pallavi|Keerthy Suresh|Rashmika Mandanna|Timothée Chalamet|Margot Robbie|Ryan Gosling|Emma Stone|Chris Hemsworth|Gal Gadot|Dev Patel",
    hard: "Daniel Day-Lewis|Florence Pugh|Lin-Manuel Miranda|Rosalía|Bong Joon-ho|Awkwafina|Quentin Tarantino|Ke Huy Quan|Tilda Swinton|Cate Blanchett|Pedro Pascal|Oscar Isaac|Naseeruddin Shah|Om Puri|Smita Patil|Shabana Azmi|Mrinal Sen|Ritwik Ghatak|Adoor Gopalakrishnan|Shaji N. Karun|Mani Ratnam|Balu Mahendra|Girish Karnad|Soumitra Chatterjee|Waheeda Rehman|Guru Dutt|Raj Kapoor|Dev Anand|Dilip Kumar|Madhubala|Nargis|Lauren Bacall|Humphrey Bogart|Audrey Hepburn|Marlon Brando|Toshiro Mifune|Ingmar Bergman|Akira Kurosawa|Werner Herzog|Agnès Varda|Meryl Streep",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "Ranbir Kapoor~Chocolate boy|person-signature|Early image as the romantic chocolate-boy hero|indian,hindi",
      "Varun Dhawan~Student|actor-role|Debuted in Student of the Year|indian,hindi",
      "Shah Rukh Khan~Open arms|person-signature|Signature pose with outstretched arms|indian,hindi",
      "Amitabh Bachchan~Angry young man|person-signature|1970s screen persona from films like Zanjeer and Deewaar|indian,hindi",
      "Akshay Kumar~Khiladi|person-signature|Nickname from a long series of Khiladi films|indian,hindi",
      "Rajinikanth~Thalaivar|person-signature|Fans' title for the superstar|indian,tamil",
      "MS Dhoni~Helicopter shot|person-signature|His trademark cricket stroke|indian",
      "Taylor Swift~Eras Tour|person-event|Her record-setting concert tour|global",
      "Elon Musk~Rocket|person-signature|Founded the rocket company SpaceX|global",
      "Leonardo DiCaprio~Bear|film-scene|The Revenant bear attack won him a long-awaited Best Actor Oscar|global",
    ],
    medium: [
      "Vidya Balan~Entertainment|film-dialogue|The Dirty Picture's famous line repeating the word entertainment|indian,hindi",
      "Mohanlal~Lalettan|person-signature|Affectionate title used by Malayalam fans|indian,malayalam",
      "Mammootty~Mammukka|person-signature|Fans' nickname for the Malayalam star|indian,malayalam",
      "Dulquer Salmaan~Charlie|actor-role|Played the title role in the Malayalam film Charlie|indian,malayalam",
      "Fahadh Faasil~Shekhawat|actor-role|Played SP Bhanwar Singh Shekhawat in Pushpa|indian,malayalam,telugu",
      "Yash~Rocky Bhai|actor-role|Played Rocky in the KGF films|indian,kannada",
      "Prabhas~Baahubali|actor-role|Played Amarendra and Mahendra Baahubali|indian,telugu",
      "Ranveer Singh~Alauddin Khilji|actor-role|Played Khilji in Padmaavat|indian,hindi",
      "Beyoncé~Beyhive|person-signature|Name of her devoted fan base|global",
      "Rihanna~Fenty|brand-product|Her Fenty Beauty cosmetics brand|global",
    ],
    hard: [
      "Satyajit Ray~Pather Panchali|person-achievement|His debut film as director|indian,bengali",
      "Ilaiyaraaja~Thiruvasagam|music-signature|Composed Thiruvasagam in Symphony|indian,tamil",
      "A. R. Rahman~Slumdog Millionaire|person-achievement|Won Oscars for its score and the song Jai Ho|indian",
      "Daniel Day-Lewis~Method acting|person-signature|Famous for staying in character; three Best Actor Oscars|global",
      "Meryl Streep~Nominations|person-achievement|Holds the record for most acting Oscar nominations|global",
      "Hayao Miyazaki~Studio Ghibli|person-achievement|Co-founded the animation studio|global,japanese",
      "Lin-Manuel Miranda~Hamilton|person-achievement|Created and starred in the Broadway musical Hamilton|global",
      "Pedro Pascal~Din Djarin|actor-role|Plays the Mandalorian in The Mandalorian|global",
      "Bong Joon-ho~Parasite|person-achievement|Directed the first non-English film to win Best Picture|global,korean",
      "Quentin Tarantino~Video store|person-event|Worked at a video store before directing|global",
    ],
  },
};
