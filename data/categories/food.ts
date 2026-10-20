import type { CategorySource } from "@/types";

export const food: CategorySource = {
  id: "food",
  label: "Food",
  description: "Dishes, ingredients, snacks, desserts and beverages.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Pizza|Burger|Ice cream|Pancakes|Sandwich|Chocolate|Popcorn|Banana|French fries|Spaghetti|Biryani|Pulao|Coffee|Tea|Samosa|Dosa|Idli|Pani puri|Gulab jamun|Jalebi|Chai|Parle-G|Noodles|Cake|Cookies|Donut|Hot dog|Ice lolly|Chips|Paratha|Butter chicken|Dal rice|Rajma chawal|Vada pav|Pav bhaji|Lassi|Mango|Watermelon|Coconut water|Oreo|Maggi",
    medium: "Sushi|Tacos|Croissant|Paneer tikka|Hummus|Tiramisu|Dumplings|Lasagna|Falafel|Smoothie|Latte|Cappuccino|Burrito|Hyderabadi biryani|Masala dosa|Chole bhature|Kerala parotta|Appam|Puttu|Sadya|Payasam|Rasmalai|Kulfi|Falooda|Momos|Ramen|Pho|Paella|Nachos|Pesto|Risotto|Shawarma|Gyoza|Poha|Misal pav|Thali|Filter coffee|Tender coconut|Pickle",
    hard: "Bouillabaisse|Kimchi|Baklava|Haggis|Gnocchi|Ceviche|Shakshuka|Mochi|Pad thai|Kombucha|Ravioli|Sauerkraut|Haleem|Dum pukht|Kosha mangsho|Sarson da saag|Litti chokha|Bisi bele bath|Moplah biryani|Kerala fish curry|Pesarattu|Dhokla|Khandvi|Undhiyu|Poutine|Pierogi|Tteokbokki|Banh mi|Arepa|Injera|Tagine|Mole|Foie gras|Truffle|Saffron|Wagyu",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "Oreo~Twist|brand-feature|The twist-lick-dunk ritual of eating an Oreo|global",
      "Maggi~Two minutes|brand-slogan|The instant noodle's famous two-minute promise|indian",
      "Rasgulla~Sponge|food-texture|Its soft spongy texture|indian",
      "KitKat~Break|brand-slogan|Have a break, have a KitKat|global",
      "Namkeen~Crunch|food-texture|Crispy savoury snacks|indian",
      "Burger~Stack|food-method|Built in layers|global",
      "Pizza~Cheese pull|food-texture|The stretchy string of melted mozzarella|global",
      "Pani puri~One bite|food-method|Eaten whole so the water doesn't spill|indian",
      "Parle-G~Dunking|food-context|Dipped in tea until it softens|indian",
      "Gulab jamun~Sugar syrup|food-method|Fried dumplings soaked in syrup|indian",
    ],
    medium: [
      "Amul~Utterly butterly|brand-slogan|Amul's long-running tagline|indian",
      "Domino's~Thirty minutes|brand-slogan|The 30-minute delivery promise; terms vary by market and time|global,indian",
      "Dairy Milk~Kuch meetha ho jaye|brand-slogan|Cadbury's Kuch Meetha Ho Jaye campaign|indian",
      "Mentos~Dimaag ki batti|brand-slogan|The Dimaag ki batti jala de tagline|indian",
      "Red Bull~Wings|brand-slogan|Red Bull gives you wings|global",
      "Tiramisu~Pick me up|wordplay|The Italian name means pick me up|global",
      "Croissant~Crescent|wordplay|The French word for crescent moon shape|global",
      "Idli~Fermented batter|food-method|Steamed cakes made from fermented rice and lentil batter|indian",
      "Sadya~Banana leaf|food-context|Kerala feast served on a banana leaf|indian,malayalam",
      "Puttu~Steam|food-method|Steamed in a cylindrical mould|indian,malayalam",
    ],
    hard: [
      "Bouillabaisse~Marseille|food-origin|Provençal fish stew from Marseille|global",
      "Haggis~Burns Night|food-context|Served on Burns Night with Address to a Haggis|global",
      "Kombucha~SCOBY|food-method|Fermented with a symbiotic culture of bacteria and yeast|global",
      "Ceviche~Citrus|food-method|Fish is cured by lime acid rather than heat|global",
      "Mochi~Pounding|food-method|Made by pounding steamed glutinous rice|global,japanese",
      "Baklava~Phyllo|food-texture|Many layers of paper-thin pastry|global",
      "Kimchi~Gimjang|food-context|The communal winter kimchi-making season|global,korean",
      "Pad thai~Tamarind|food-method|Its sour tang comes from tamarind|global",
      "Paneer~Curdling|food-method|Made by curdling hot milk with acid|indian",
      "Appam~Stew|food-context|Often served with vegetable or egg stew in Kerala|indian,malayalam",
    ],
  },
};
