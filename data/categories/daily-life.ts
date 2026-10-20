import type { CategorySource } from "@/types";

export const dailyLife: CategorySource = {
  id: "daily-life",
  label: "Daily Life",
  description: "Routines, habits, chores and everyday situations.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Alarm clock|Brushing teeth|Cooking dinner|Doing laundry|Commuting|Grocery shopping|Making the bed|Washing dishes|Taking a nap|Taking a shower|Taking a bath|Ordering takeaway|Snooze button|Morning coffee|Traffic jam|Power cut|Doorbell|Remote control|Phone charger|Selfie|Birthday cake|Ironing clothes|Sweeping|Mopping|Bedtime story|Weekend|Chai break|Auto rickshaw ride|Office lunch|Group chat|Sleepover|Watering plants|Newspaper|Mosquito net|Bathroom queue|Wedding invitation",
    medium: "Meal prep|Spring cleaning|Carpooling|Window shopping|Procrastinating|Small talk|House warming|Rush hour|Paying bills|Neighbour|Roommate|Daydreaming|Electricity bill|Mobile recharge|Voice note|Screen time|Parking trouble|Festival shopping|Pooja room|Pickle jar|Monsoon commute|Housewarming|Family WhatsApp group|Kitchen cabinet|Water can|Grocery list|Gas cylinder|Ironing board|Relatives visiting|Morning walk|Newspaper delivery|Neighbour's dog|Surge pricing|Online order|Return policy|Gym membership|Piggy bank",
    hard: "Decluttering|Doomscrolling|Digital detox|Decision fatigue|Bullet journaling|Habit stacking|Sunday scaries|Minimalism|Habit tracking|Sunk cost|Shower thoughts|Analysis paralysis|Imposter syndrome|Parkinson's law|Deja vu|Sleep paralysis|Circadian rhythm|Golden hour|Blue hour|Ikigai|Hygge|Wabi-sabi|Kintsugi|Time blocking|Pomodoro technique|Inbox zero|Daylight saving|Bucket list|Gratitude journal|Slow living|Lagom|Fika",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "Alarm clock~Snooze|daily-habit|Hitting snooze to steal a few more minutes of sleep|global",
      "Pillow~Dreams|daily-context|Sleeping and dreaming|global",
      "Shower~Singing|daily-habit|Many people sing while showering|global",
      "Laundry~Odd sock|daily-context|One sock always vanishes in the wash|global",
      "Elevator~Awkward silence|daily-context|Strangers go quiet during a lift ride|global",
      "Phone charger~Low battery|daily-context|Panic at one percent battery sends people hunting for a charger|global",
      "Birthday cake~Candles|daily-context|Blowing out candles and making a wish|global",
      "Newspaper~Morning chai|daily-habit|Reading the paper with tea is a classic Indian morning ritual|indian",
      "Power cut~Candle|daily-context|Candles come out when the electricity fails|indian",
      "Weekend~Sleeping in|daily-habit|Staying in bed late on days off|global",
    ],
    medium: [
      "Electricity bill~Shock|wordplay|A big bill can give you a shock like a live wire|global",
      "Wi-Fi password~Guests|daily-context|Guests ask for the Wi-Fi password almost immediately|global",
      "Group chat~Mute|daily-habit|People mute noisy group chats|global",
      "Pickle jar~Grandmother|daily-context|Homemade pickle jars are a grandmother tradition in many Indian homes|indian",
      "Gas cylinder~Refill booking|daily-context|Indian households book LPG refills in advance|indian",
      "Voice note~Playback speed|tech-behaviour|People speed voice notes up to save time|global",
      "Monsoon commute~Waterlogging|daily-context|Heavy rain floods roads during city commutes|indian",
      "Piggy bank~Loose change|daily-habit|Saving spare coins in a piggy bank|global",
      "Gym membership~New Year|daily-habit|Memberships are bought as resolutions and often abandoned|global",
      "Surge pricing~Rain|tech-behaviour|Cab fares spike when it rains|global",
    ],
    hard: [
      "Sunk cost~Movie ticket|daily-context|Staying through a bad film because you already paid is the classic example|global",
      "Deja vu~Glitch|film-scene|In The Matrix a repeated black cat is explained as a glitch|global",
      "Pomodoro technique~Tomato|wordplay|Named after the tomato-shaped kitchen timer its inventor used|global",
      "Golden hour~Photographers|daily-context|The soft light just after sunrise or before sunset|global",
      "Kintsugi~Gold|place-culture|Japanese art of mending broken pottery with gold lacquer|global",
      "Hygge~Candles|place-culture|Danish idea of cosiness often pictured with candlelight|global",
      "Bucket list~Jack Nicholson|film-fact|The 2007 film The Bucket List starred Jack Nicholson and Morgan Freeman|global",
      "Inbox zero~Merlin Mann|person-event|Productivity writer Merlin Mann popularised the term|global",
      "Imposter syndrome~Pauline Clance|person-event|Clance and Suzanne Imes described the impostor phenomenon in 1978|global",
      "Analysis paralysis~Long menu|daily-context|Overthinking choices such as what to order|global",
    ],
  },
};
