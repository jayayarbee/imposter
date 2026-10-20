import type { CategorySource } from "@/types";

export const sports: CategorySource = {
  id: "sports",
  label: "Sports",
  description: "Sports, athletes, teams, equipment and competitions.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Football|Cricket|Basketball|Tennis|Swimming|Lionel Messi|Virat Kohli|Olympics|Boxing|Golf|Rugby|Badminton|Cycling|Running|Marathon|Athletics|Gymnastics|Karate|Judo|Skating|Baseball|Sachin Tendulkar|MS Dhoni|Rohit Sharma|PV Sindhu|Neeraj Chopra|Sunil Chhetri|Cristiano Ronaldo|Mary Kom|Pelé|Maradona|Roger Federer|Rafael Nadal|Gold medal|World Cup|Stadium|Kho-kho",
    medium: "Volleyball|Table tennis|Formula 1|Wimbledon|Usain Bolt|Archery|Skiing|Surfing|Wrestling|Squash|Racquetball|Hockey|Lacrosse|IPL|Grand Slam|Tour de France|Ranji Trophy|Santosh Trophy|Pro Kabaddi League|Indian Super League|La Liga|Premier League|Champions League|NBA|NFL|Super Bowl|Lewis Hamilton|Max Verstappen|Michael Schumacher|Novak Djokovic|Simone Biles|Michael Phelps|Dhyan Chand|Milkha Singh|P. T. Usha|P. R. Sreejesh|Hammer throw|Discus|Shot put|Decathlon|Taekwondo|Polo|Snooker|Darts|Bowling|Rowing|Sailing",
    hard: "Curling|Fencing|Pickleball|Kabaddi|Biathlon|Pole vault|Sepak takraw|Water polo|Bowls|Hurling|Shinty|Gaelic football|Jai alai|Sumo|Kendo|Sambo|Capoeira|Kalaripayattu|Mallakhamb|Gatka|Thang-ta|Vallam kali|Kambala|Pehlwani|Bandy|Floorball|Korfball|Netball|Underwater hockey|Cheese rolling|Tug of war|Caber toss|Skeleton|Luge|Bobsled|Ski jumping|Nordic combined|Modern pentathlon|Steeplechase|Keirin|Dressage|Eventing|Rhythmic gymnastics|Artistic swimming",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "Cricket~Duck|sport-term|A batter out for zero|global",
      "Cricket~Ashes|sport-event|The England v Australia Test rivalry|global",
      "Tennis~Love|sport-term|The word for a score of zero in tennis|global",
      "Golf~Hole in one|sport-term|Sinking the ball with a single shot|global",
      "Olympics~Five rings|sport-event|The interlocked ring logo|global",
      "Football~Offside|sport-term|A famously debated rule|global",
      "Cristiano Ronaldo~Siuuu|person-signature|His trademark celebration|global",
      "Sachin Tendulkar~Hundred hundreds|person-achievement|Scored 100 international centuries|indian",
      "Usain Bolt~Lightning pose|person-signature|His celebratory pose after winning|global",
      "Lionel Messi~World Cup 2022|person-achievement|Lifted the trophy with Argentina in 2022|global",
    ],
    medium: [
      "Formula 1~Pit stop|sport-term|The rapid tyre change|global",
      "Wimbledon~Strawberries and cream|sport-event|The tournament's traditional snack|global",
      "Table tennis~Ping-pong diplomacy|person-event|The 1971 exchange that thawed US-China ties|global",
      "Archery~Robin Hood|film-character|The legendary outlaw archer|global",
      "Surfing~Wipeout|sport-term|A fall off the board|global",
      "Volleyball~Wilson|film-fact|The volleyball friend in Cast Away|global",
      "Hockey~Dhyan Chand|person-achievement|India's legendary hockey wizard|indian",
      "Kabaddi~Raider's chant|sport-term|The raider must keep chanting while in the other half|indian",
      "IPL~Orange Cap|sport-event|Awarded to the season's top run-scorer|indian",
      "Neeraj Chopra~Javelin gold|person-achievement|Won gold at the Tokyo Games held in 2021|indian",
    ],
    hard: [
      "Curling~Sweeping the ice|sport-equipment|Players sweep to steer the stone|global",
      "Fencing~Touché|sport-term|Called to acknowledge a hit|global",
      "Pickleball~The kitchen|sport-term|The non-volley zone|global",
      "Biathlon~Skis and rifle|sport-equipment|Cross-country skiing combined with shooting|global",
      "Pole vault~Sergey Bubka|person-achievement|The record-breaking vaulter|global",
      "Water polo~Eggbeater kick|sport-term|Technique for staying upright in the water|global",
      "Hurling~Sliotar|sport-equipment|The ball used in the Irish game|global",
      "Cricket~Duckworth-Lewis|sport-term|Method for setting targets in rain-hit games|global",
      "Marathon~Pheidippides|person-event|The legendary run from Marathon to Athens|global",
      "Sepak takraw~Rattan ball|sport-equipment|A woven ball kicked over a net|global",
    ],
  },
};
