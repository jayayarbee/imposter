import type { CategorySource } from "@/types";

export const technology: CategorySource = {
  id: "technology",
  label: "Technology",
  description: "Devices, apps, software, computing and inventions.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Smartphone|Laptop|WiFi|Instagram|YouTube|Google|Camera|Email|Bluetooth|Television|Facebook|Tablet|WhatsApp|Twitter|Snapchat|Telegram|Netflix|Amazon|Flipkart|Zomato|Swiggy|UPI|Paytm|Google Pay|Alexa|Siri|Earphones|Power bank|Pen drive|Hotspot|Selfie stick|Emoji|GIF|Meme|Video call|Zoom|Gmail|Google Maps|Wikipedia|Uber|Ola",
    medium: "Bitcoin|Drone|ChatGPT|Smartwatch|Cloud storage|Virtual reality|Router|Spotify|3D printer|QR code|Augmented reality|Ethereum|Artificial intelligence|Machine learning|Cloud computing|Cybersecurity|Phishing|Ransomware|Deepfake|Metaverse|NFT|Starlink|Tesla|Self-driving car|SpaceX|ISRO|Chandrayaan|Aadhaar|DigiLocker|5G|Fibre optic|SSD|GPU|Wearable|E-reader|Smart speaker|Bluetooth earbuds|Wireless charging|VPN",
    hard: "Blockchain|Quantum computing|Kubernetes|Raspberry Pi|Firewall|Neural network|API|Open source|Cryptography|Linux|Unix|Compiler|Binary|Algorithm|Recursion|Encryption|Hash function|Zero-knowledge proof|Turing test|Moore's law|Von Neumann architecture|TCP/IP|DNS|IPv6|Docker|Git|Python|JavaScript|Rust|Assembly language|Bytecode|Garbage collection|Mainframe|Punch card|ENIAC|Arpanet|Cookie|Cache|Latency|Bandwidth|Packet loss",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "WhatsApp~Blue ticks|tech-feature|The read receipts|global",
      "Google Maps~U-turn|tech-behaviour|Its familiar rerouting instruction|global",
      "YouTube~Skip ad|tech-feature|The button that appears after five seconds|global",
      "Netflix~Skip intro|tech-feature|The button that jumps past opening titles|global",
      "UPI~Scan and pay|tech-behaviour|Paying by scanning a QR code|indian",
      "Google~Verb|wordplay|Its name became a word for searching|global",
      "Instagram~Double tap|tech-behaviour|The gesture that likes a post|global",
      "Email~CC|tech-feature|Short for carbon copy|global",
      "Bluetooth~Pairing|tech-behaviour|Connecting two devices|global",
      "Smartphone~Cracked screen|tech-error|A familiar sight after a drop|global",
    ],
    medium: [
      "Bitcoin~Satoshi Nakamoto|person-event|The pseudonymous creator|global",
      "Drone~Male bees|wordplay|Male honeybees are also called drones|global",
      "ChatGPT~Hallucination|tech-error|Confidently inventing facts|global",
      "Cloud storage~Someone else's computer|wordplay|The popular joke about what the cloud is|global",
      "Spotify~Wrapped|tech-feature|The annual listening summary|global",
      "QR code~Car parts|person-event|Invented in 1994 to track car parts|global",
      "Virtual reality~Motion sickness|tech-error|A common side effect|global",
      "Router~Blinking lights|tech-behaviour|Users restart it when the lights misbehave|global",
      "3D printer~Layer by layer|tech-feature|Builds objects one thin layer at a time|global",
      "Smartwatch~Step count|tech-feature|A headline fitness feature|global",
    ],
    hard: [
      "Blockchain~Genesis block|tech-feature|The very first block in a chain|global",
      "Quantum computing~Qubit|tech-feature|Its basic unit of information|global",
      "Kubernetes~Helmsman|wordplay|The Greek name behind it means helmsman|global",
      "Raspberry Pi~Credit-card sized|tech-feature|A tiny single-board computer|global",
      "Firewall~Fireproof wall|wordplay|Named after the barrier that stops fire spreading|global",
      "Neural network~Backpropagation|tech-feature|How errors are passed back to train it|global",
      "API~Waiter analogy|tech-behaviour|Often explained as a restaurant waiter|global",
      "Open source~Linux|tech-feature|The best-known open-source operating system kernel|global",
      "Cryptography~Enigma|person-event|The WWII cipher machine|global",
      "Compiler~Grace Hopper|person-event|Wrote one of the first compilers|global",
    ],
  },
};
