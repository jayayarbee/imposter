import type { CategorySource } from "@/types";

export const fashion: CategorySource = {
  id: "fashion",
  label: "Fashion",
  description: "Clothing, footwear, accessories, styles and brands.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Jeans|T-shirt|Sneakers|Hoodie|Sunglasses|Handbag|Sandals|Dress|Baseball cap|Scarf|Sweatshirt|Flip-flops|Shirt|Trousers|Shorts|Skirt|Jacket|Sweater|Socks|Shoes|Boots|Heels|Watch|Belt|Tie|Cap|Hat|Gloves|Saree|Kurta|Lehenga|Dupatta|Dhoti|Crocs|Bindi|Bangles|Jhumkas|Necklace|Earrings",
    medium: "Blazer|Loafers|Cargo pants|Denim jacket|Nike|Gucci|Beret|Trench coat|Leggings|Tuxedo|Adidas|Moccasins|Mundu|Kasavu saree|Banarasi saree|Kolhapuri chappals|Salwar kameez|Anarkali suit|Pashmina|Bandhani|Jumpsuit|Cardigan|Bomber jacket|Crop top|Chinos|Pleated skirt|Ray-Ban|Levi's|Zara|H&M|Louis Vuitton|Prada|Versace|Louboutin|Converse|Dr. Martens|Tiffany & Co.|Burberry",
    hard: "Fascinator|Brogues|Espadrilles|Balenciaga|Cummerbund|Culottes|Houndstooth|Sherwani|Chanel|Dior|Kimono|Yukata|Kanjeevaram|Chikankari|Ikat|Phulkari|Bomkai|Paithani|Nehru jacket|Obi|Hanbok|Cheongsam|Dashiki|Poncho|Kilt|Haute couture|Selvedge denim|Tweed|Harris Tweed|Gabardine|Seersucker|Chambray|Jacquard|Herringbone|Argyle|Paisley|Fedora|Hermès",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "Barbie~Pink|brand-feature|Her signature colour|global",
      "Jeans~Rivets|fashion-feature|Metal rivets reinforce the pocket corners|global",
      "Sneakers~Swoosh|brand-feature|The curved logo of Nike sneakers|global",
      "Hoodie~Kangaroo pocket|fashion-feature|The front pouch|global",
      "Saree~Pallu|fashion-feature|The decorative end draped over the shoulder|indian",
      "Handbag~Birkin|fashion-brand|Hermès's famous luxury bag|global",
      "Crocs~Jibbitz|fashion-feature|Charms that plug into the shoe's holes|global",
      "Baseball cap~Worn backwards|daily-habit|A popular street style|global",
      "Lehenga~Dupatta|fashion-feature|Paired with a long scarf|indian",
      "Sunglasses~Aviators|fashion-feature|Teardrop-shaped pilot style|global",
    ],
    medium: [
      "Adidas~Three stripes|brand-feature|The brand's signature design|global",
      "Levi's~Red tab|brand-feature|A small red tag on the back pocket|global",
      "Louboutin~Red sole|brand-feature|The signature lacquered red outsole|global",
      "Tiffany & Co.~Blue box|brand-feature|Its robin's-egg blue packaging|global",
      "Dr. Martens~Air-cushioned sole|brand-feature|The bouncing sole of its boots|global",
      "Burberry~Trench coat|fashion-brand|Famous for its gabardine trench|global",
      "Kolhapuri chappals~Maharashtra|place-culture|Handmade leather sandals from the Kolhapur region of Maharashtra|indian",
      "Banarasi saree~Zari|fashion-feature|Woven with gold or silver threads|indian",
      "Kasavu saree~Onam|place-culture|The cream-and-gold saree worn at Kerala's Onam|indian,malayalam",
      "Gucci~Double G|brand-feature|Interlocking G logo|global",
    ],
    hard: [
      "Fascinator~Royal Ascot|place-culture|Worn at horse-racing events such as Royal Ascot|global",
      "Houndstooth~Broken check|fashion-feature|A pattern of jagged broken checks|global",
      "Cummerbund~Crumb catcher|fashion-feature|Pleats traditionally face up to catch crumbs|global",
      "Brogues~Perforations|fashion-feature|Decorative holes punched in the leather|global",
      "Espadrilles~Rope sole|fashion-feature|Soles made of braided jute rope|global",
      "Balenciaga~Cristóbal|person-event|Founded by Cristóbal Balenciaga|global",
      "Kimono~Obi|fashion-feature|The wide sash tied at the waist|global,japanese",
      "Chanel~No. 5|brand-product|Its iconic perfume|global",
      "Nehru jacket~Jawaharlal Nehru|person-event|Named after India's first prime minister|indian",
      "Chikankari~Lucknow|place-culture|Delicate white embroidery from Lucknow|indian",
    ],
  },
};
