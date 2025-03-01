//import { db } from "@/lib/db/index"
//import { destinations } from "@/lib/db/schema"

import { db } from "@/db/drizzle"
import { destinations } from "@/db/schema"
// Initial seed data
const initialDestinations = [
  {
    "city": "Paris",
    "country": "France",
    "clues": [
      "This city is home to a famous tower that sparkles every night.",
      "Known as the 'City of Love' and a hub for fashion and art."
    ],
    "fun_fact": [
      "The Eiffel Tower was supposed to be dismantled after 20 years but was saved because it was useful for radio transmissions!",
      "Paris has only one stop sign in the entire city—most intersections rely on priority-to-the-right rules."
    ],
    "trivia": [
      "This city is famous for its croissants and macarons. Bon appétit!",
      "Paris was originally a Roman city called Lutetia."
    ]
  },
  {
    "city": "Tokyo",
    "country": "Japan",
    "clues": [
      "This city has the busiest pedestrian crossing in the world.",
      "You can visit an entire district dedicated to anime, manga, and gaming."
    ],
    "fun_fact": [
      "Tokyo was originally a small fishing village called Edo before becoming the bustling capital it is today!",
      "More than 14 million people live in Tokyo, making it one of the most populous cities in the world."
    ],
    "trivia": [
      "The city has over 160,000 restaurants, more than any other city in the world.",
      "Tokyo's subway system is so efficient that train delays of just a few minutes come with formal apologies."
    ]
  },
  {
    "city": "New York",
    "country": "USA",
    "clues": [
      "Home to a green statue gifted by France in the 1800s.",
      "Nicknamed 'The Big Apple' and known for its Broadway theaters."
    ],
    "fun_fact": [
      "The Statue of Liberty was originally a copper color before oxidizing to its iconic green patina.",
      "Times Square was once called Longacre Square before being renamed in 1904."
    ],
    "trivia": [
      "New York City has 468 subway stations, making it one of the most complex transit systems in the world.",
      "The Empire State Building has its own zip code: 10118."
    ]
  },
  {
    "city": "London",
    "country": "UK",
    "clues": [
      "Home to a clock tower that is often mistaken for its bell.",
      "A city where red buses and black cabs dominate the streets."
    ],
    "fun_fact": [
      "Big Ben is actually the name of the bell, not the clock tower!",
      "The London Underground is the oldest subway system in the world."
    ],
    "trivia": [
      "London has over 170 museums, including the British Museum which has over 8 million objects.",
      "The city hosted the Olympics three times, in 1908, 1948, and 2012."
    ]
  },
  {
    "city": "Rome",
    "country": "Italy",
    "clues": [
      "This city is home to an ancient amphitheater once used for gladiator fights.",
      "It has a small independent country within its borders."
    ],
    "fun_fact": [
      "The Colosseum could hold up to 80,000 spectators in its prime!",
      "Vatican City, the smallest country in the world, is located within Rome."
    ],
    "trivia": [
      "Rome has more fountains than any other city in the world, with over 1,500 of them.",
      "The city's Trevi Fountain collects thousands of euros in coins daily, which are donated to charity."
    ]
  },
  {
    "city": "Sydney",
    "country": "Australia",
    "clues": [
      "This city is known for a famous opera house with a sail-like design.",
      "It has one of the largest natural harbors in the world."
    ],
    "fun_fact": [
      "Sydney's Opera House took 14 years to build and was initially expected to take only 4!",
      "Bondi Beach is one of the most famous beaches in the world."
    ],
    "trivia": [
      "Sydney is home to the world's largest IMAX screen.",
      "The Sydney Harbour Bridge is nicknamed 'The Coathanger' due to its shape."
    ]
  },
  {
    "city": "Cairo",
    "country": "Egypt",
    "clues": [
      "Home to one of the Seven Wonders of the Ancient World.",
      "A major river flows through this city, sustaining an ancient civilization."
    ],
    "fun_fact": [
      "The Great Pyramid of Giza was the tallest structure in the world for over 3,800 years!",
      "Cairo is the largest city in Africa by population."
    ],
    "trivia": [
      "The city's name means 'The Victorious' in Arabic.",
      "Cairo has a museum dedicated entirely to mummies."
    ]
  },
  {
    "city": "Rio de Janeiro",
    "country": "Brazil",
    "clues": [
      "Home to a giant statue that overlooks the city from a mountaintop.",
      "Famous for its carnival, samba music, and beaches."
    ],
    "fun_fact": [
      "Rio's Christ the Redeemer statue was named one of the New Seven Wonders of the World.",
      "The city's Maracanã Stadium once held a record 199,854 spectators at a football match."
    ],
    "trivia": [
      "Rio de Janeiro means 'January River' in Portuguese, but it doesn't actually have a river.",
      "Copacabana Beach is one of the most famous beaches in the world."
    ]
  },
  {
    "city": "Cape Town",
    "country": "South Africa",
    "clues": [
      "This city sits at the foot of a flat-topped mountain.",
      "It was the first place where Nelson Mandela made a public speech after being released from prison."
    ],
    "fun_fact": [
      "Table Mountain has more plant species than the entire United Kingdom!",
      "Cape Town was originally called the 'Cape of Storms' by Portuguese explorers."
    ],
    "trivia": [
      "The city's Robben Island prison housed Nelson Mandela for 18 years.",
      "Cape Town has one of the highest densities of great white sharks in the world."
    ]
  },
  {
    "city": "Barcelona",
    "country": "Spain",
    "clues": [
      "This city is known for its unfinished cathedral designed by Antoni Gaudí.",
      "It has a famous pedestrian street called La Rambla."
    ],
    "fun_fact": [
      "The Sagrada Familia has been under construction since 1882 and is not expected to be completed until 2026!",
      "Barcelona has 9 UNESCO World Heritage Sites, most of which were designed by Gaudí."
    ],
    "trivia": [
      "Barcelona's Camp Nou is the largest football stadium in Europe.",
      "The city hosted the 1992 Summer Olympics, which transformed its infrastructure."
    ]
  },
  {
    "city": "Dubai",
    "country": "UAE",
    "clues": [
      "This city is home to the tallest building in the world.",
      "It has man-made islands shaped like palm trees."
    ],
    "fun_fact": [
      "The Burj Khalifa is so tall that you can watch the sunset twice in one day—once from the ground and again from the top!",
      "Dubai has the world's only 7-star hotel, the Burj Al Arab."
    ],
    "trivia": [
      "Dubai has the largest shopping mall in the world by total area.",
      "Less than 15% of Dubai's population are local Emiratis; the rest are expats."
    ]
  },
  {
    "city": "Venice",
    "country": "Italy",
    "clues": [
      "This city has canals instead of streets and gondolas instead of cars.",
      "It hosts a famous carnival where people wear elaborate masks."
    ],
    "fun_fact": [
      "Venice is built on 118 small islands connected by over 400 bridges!",
      "The city is slowly sinking at a rate of 1-2 millimeters per year."
    ],
    "trivia": [
      "There are no cars allowed in Venice's historic center.",
      "The city's acqua alta (high water) phenomenon floods St. Mark's Square up to 60 times a year."
    ]
  },
  {
    "city": "Amsterdam",
    "country": "Netherlands",
    "clues": [
      "This city has more bicycles than people.",
      "Famous for its narrow houses, canals, and museums dedicated to famous painters."
    ],
    "fun_fact": [
      "Amsterdam's houses are intentionally built leaning forward to help move furniture using pulleys without hitting the façade!",
      "There are over 1,200 bridges in Amsterdam, three times more than Venice."
    ],
    "trivia": [
      "Most of Amsterdam is below sea level, built on reclaimed land.",
      "The narrowest house in Amsterdam is only 2.02 meters (6.6 feet) wide!"
    ]
  },
  {
    "city": "Istanbul",
    "country": "Turkey",
    "clues": [
      "This city straddles two continents, Europe and Asia.",
      "It was previously known as Constantinople and Byzantium."
    ],
    "fun_fact": [
      "The Grand Bazaar is one of the oldest and largest covered markets in the world with over 4,000 shops!",
      "Istanbul's Hagia Sophia was the world's largest cathedral for nearly 1,000 years."
    ],
    "trivia": [
      "The city has been the capital of three empires: Roman, Byzantine, and Ottoman.",
      "Istanbul's Tünel is the world's second-oldest underground railway, after London's."
    ]
  },
  {
    "city": "Bangkok",
    "country": "Thailand",
    "clues": [
      "This city is known for its ornate shrines and vibrant street life.",
      "Its full ceremonial name is the longest city name in the world."
    ],
    "fun_fact": [
      "Bangkok's full name has 169 characters and is listed in the Guinness Book of World Records!",
      "The city is sinking 2-3 centimeters every year, and could be underwater by 2030."
    ],
    "trivia": [
      "Bangkok has more than 400 Buddhist temples called 'wats'.",
      "The city is known as the 'Venice of the East' due to its many canals."
    ]
  },
  {
    "city": "Prague",
    "country": "Czech Republic",
    "clues": [
      "This city is known for its medieval astronomical clock in the old town square.",
      "It has a castle that is considered the largest ancient castle complex in the world."
    ],
    "fun_fact": [
      "Prague Castle covers an area of 70,000 square meters, making it the largest ancient castle complex in the world!",
      "The city's Charles Bridge is adorned with 30 statues of saints."
    ],
    "trivia": [
      "Prague is home to the narrowest street in Europe, which is so tight it has its own traffic light.",
      "The city is often called the 'City of a Hundred Spires' due to its many gothic church towers."
    ]
  },
  {
    "city": "Marrakech",
    "country": "Morocco",
    "clues": [
      "This city is known for its vibrant markets and red-colored buildings.",
      "It features a large central square that transforms into an open-air food market at night."
    ],
    "fun_fact": [
      "The medina of Marrakech contains 19 km of tangled alleyways!",
      "The city's name comes from the Berber phrase 'mur akush,' meaning 'Land of God.'"
    ],
    "trivia": [
      "Marrakech was founded in 1062 and is one of Morocco's four imperial cities.",
      "The city's Majorelle Garden was once owned by fashion designer Yves Saint Laurent."
    ]
  },
  {
    "city": "Buenos Aires",
    "country": "Argentina",
    "clues": [
      "This city is known as the 'Paris of South America.'",
      "Famous for tango dancing and colorful neighborhoods."
    ],
    "fun_fact": [
      "Buenos Aires has the widest avenue in the world, 9 de Julio Avenue, which spans 140 meters!",
      "The city has the highest concentration of theaters in the world."
    ],
    "trivia": [
      "The Recoleta Cemetery in Buenos Aires is where Eva Perón is buried.",
      "Buenos Aires means 'good airs' or 'fair winds' in Spanish."
    ]
  },
  {
    "city": "Singapore",
    "country": "Singapore",
    "clues": [
      "This city-state is known for its ultra-modern architecture and cleanliness.",
      "It features massive greenhouse domes with plants from around the world."
    ],
    "fun_fact": [
      "Singapore is one of only three city-states in the world, along with Monaco and Vatican City!",
      "The city has a 50% green cover despite being one of the most densely populated places on Earth."
    ],
    "trivia": [
      "Chewing gum is banned in Singapore to keep the city clean.",
      "Singapore's Changi Airport has been voted the world's best airport for eight consecutive years."
    ]
  },
  {
    "city": "Vienna",
    "country": "Austria",
    "clues": [
      "This city is known as the 'City of Music' due to its musical legacy.",
      "Famous for its coffeehouse culture and imperial palaces."
    ],
    "fun_fact": [
      "Vienna has more than 200 coffee houses, and 'Viennese Coffee House Culture' is recognized by UNESCO!",
      "The city's Giant Ferris Wheel (Riesenrad) featured in the film 'The Third Man' and has been operating since 1897."
    ],
    "trivia": [
      "Vienna has consistently been ranked as one of the most livable cities in the world.",
      "The snowglobe was invented in Vienna in 1900 by Erwin Perzy."
    ]
  },
  {
    "city": "Kyoto",
    "country": "Japan",
    "clues": [
      "This city is known for its classical Buddhist temples and gardens.",
      "It was Japan's capital for more than 1,000 years."
    ],
    "fun_fact": [
      "Kyoto was spared from atomic bombing during WWII because the US Secretary of War Henry Stimson had honeymooned there and admired its cultural significance!",
      "The city has over 1,600 Buddhist temples and 400 Shinto shrines."
    ],
    "trivia": [
      "Kyoto's Gion district is famous for geisha and traditional wooden machiya houses.",
      "The Nintendo Company was founded in Kyoto in 1889 as a playing card company."
    ]
  },
  {
    "city": "Jerusalem",
    "country": "Israel",
    "clues": [
      "This city is considered holy by three major world religions.",
      "Its old city is divided into four quarters: Muslim, Christian, Jewish, and Armenian."
    ],
    "fun_fact": [
      "Jerusalem has been destroyed and rebuilt at least 20 times throughout history!",
      "The city has over 2,000 archaeological sites."
    ],
    "trivia": [
      "Jerusalem Syndrome is a psychological phenomenon where visitors develop religious psychosis.",
      "The Old City of Jerusalem covers an area of less than 1 square kilometer."
    ]
  },
  {
    "city": "Mexico City",
    "country": "Mexico",
    "clues": [
      "This city is built on the ruins of an ancient Aztec capital.",
      "It's home to the only royal castle in the Americas."
    ],
    "fun_fact": [
      "Mexico City is sinking at a rate of about 20 cm per year because it's built on the bed of a drained lake!",
      "The city's Chapultepec Park is one of the largest urban parks in the world, twice the size of New York's Central Park."
    ],
    "trivia": [
      "Mexico City has the most museums of any city in the world, with over 150 museums.",
      "The ancient city of Tenochtitlan, on which Mexico City was built, had running water and sewage systems in the 1400s."
    ]
  },
  {
    "city": "Copenhagen",
    "country": "Denmark",
    "clues": [
      "This city is home to a famous statue of a mermaid sitting on a rock.",
      "Known for its colorful harbor, cycling culture, and sustainable urban design."
    ],
    "fun_fact": [
      "Copenhagen's Little Mermaid statue has been vandalized and decapitated multiple times since its installation in 1913!",
      "The city aims to be the world's first carbon-neutral capital by 2025."
    ],
    "trivia": [
      "Copenhagen has more bicycles than inhabitants, with five times more bikes than cars.",
      "Tivoli Gardens, located in Copenhagen, is one of the oldest amusement parks in the world, opened in 1843."
    ]
  },
  {
    "city": "Havana",
    "country": "Cuba",
    "clues": [
      "This city is known for its vintage American cars and colorful colonial architecture.",
      "Famous for its cigars, rum, and vibrant music scene."
    ],
    "fun_fact": [
      "Havana has around 60,000 classic American cars from the 1940s and 1950s still on the road!",
      "The city's historic center is a UNESCO World Heritage site with over 900 landmarks."
    ],
    "trivia": [
      "Havana's Malecón seawall is 8 km long and considered the world's largest sofa.",
      "The cocktails daiquiri and mojito were both invented in Havana."
    ]
  },
  {
    "city": "Moscow",
    "country": "Russia",
    "clues": [
      "This city's central square is dominated by a colorful cathedral with onion domes.",
      "Home to the world's largest fortress and a famous metro system."
    ],
    "fun_fact": [
      "Moscow's Metro stations are so ornate they're called 'underground palaces,' complete with chandeliers and mosaics!",
      "The Kremlin walls are 2,235 meters long, making it the world's largest medieval fortress."
    ],
    "trivia": [
      "Moscow has seven skyscrapers known as the 'Seven Sisters' built in Stalinist architectural style.",
      "The city hosts the largest active cathedral in the Orthodox Christian world."
    ]
  },
  {
    "city": "San Francisco",
    "country": "USA",
    "clues": [
      "This city is known for its steep hills, cable cars, and iconic golden bridge.",
      "Famous for its fog and former prison on an island."
    ],
    "fun_fact": [
      "The Golden Gate Bridge's color is officially called 'International Orange' and was chosen to enhance visibility in fog!",
      "San Francisco's Lombard Street is known as the 'crookedest street in the world' with eight hairpin turns."
    ],
    "trivia": [
      "The city's cable cars are the only moving National Historic Landmark in the United States.",
      "Fortune cookies were actually invented in San Francisco, not China."
    ]
  },
  {
    "city": "Dubrovnik",
    "country": "Croatia",
    "clues": [
      "This city is surrounded by massive stone walls overlooking the Adriatic Sea.",
      "It served as a filming location for a popular fantasy TV series about thrones."
    ],
    "fun_fact": [
      "Dubrovnik's city walls are 1,940 meters long and up to 25 meters high, completely encircling the old town!",
      "The city was an independent republic called Ragusa for 450 years until Napoleon's conquest."
    ],
    "trivia": [
      "Dubrovnik banned new restaurants to protect its historic core.",
      "The city's pharmacy, established in 1317, is one of the oldest still functioning in Europe."
    ]
  },
  {
    "city": "Petra",
    "country": "Jordan",
    "clues": [
      "This ancient city is carved into pink sandstone cliffs.",
      "It was rediscovered in 1812 after being lost to the Western world for centuries."
    ],
    "fun_fact": [
      "Petra's Treasury building was featured in 'Indiana Jones and the Last Crusade' as the temple holding the Holy Grail!",
      "The city's original name was Raqmu, and it was the capital of the Nabataean Kingdom."
    ],
    "trivia": [
      "Petra was named one of the New Seven Wonders of the World in 2007.",
      "The city has over 800 carved tombs, earning it the nickname 'City of Tombs.'"
    ]
  },
  {
    "city": "Machu Picchu",
    "country": "Peru",
    "clues": [
      "This ancient city sits high in the mountains and was built by the Inca civilization.",
      "It remained hidden from the outside world until its rediscovery in 1911."
    ],
    "fun_fact": [
      "Machu Picchu was built with stones so precisely cut that you can't fit even a credit card between them—without using mortar!",
      "The site features over 700 agricultural terraces that helped feed its population."
    ],
    "trivia": [
      "Machu Picchu was built around 1450 but abandoned just over 100 years later during the Spanish conquest.",
      "The name means 'Old Peak' or 'Old Mountain' in the Quechua language."
    ]
  },
  {
    "city": "Seoul",
    "country": "South Korea",
    "clues": [
      "This city blends ancient palaces with ultra-modern skyscrapers.",
      "Known for its vibrant street food and K-pop culture."
    ],
    "fun_fact": [
      "Seoul's subway system is among the world's largest with 331 stations and handles nearly 7 million passengers daily!",
      "The city has free public WiFi available on all buses, subways, and in public spaces."
    ],
    "trivia": [
      "Seoul has the world's largest indoor amusement park called Lotte World.",
      "The city's Incheon International Airport consistently ranks among the world's best airports."
    ]
  },
  {
    "city": "Santorini",
    "country": "Greece",
    "clues": [
      "This island city is known for its white buildings with blue domes overlooking the sea.",
      "It was formed by one of the largest volcanic eruptions in recorded history."
    ],
    "fun_fact": [
      "Santorini's houses are painted white with lime to reflect the harsh summer sun, and blue to represent the Greek flag!",
      "The island may be the inspiration for the lost city of Atlantis."
    ],
    "trivia": [
      "Santorini has beaches with black, red, and white volcanic sand.",
      "The island produces unique wine due to its volcanic soil and unusual grape-growing method where vines are woven into basket shapes."
    ]
  },
  {
    "city": "Reykjavik",
    "country": "Iceland",
    "clues": [
      "This city is the northernmost capital of a sovereign state.",
      "Famous for its geothermal pools, midnight sun, and northern lights."
    ],
    "fun_fact": [
      "Reykjavik means 'Smoky Bay' in Icelandic, named for the steam rising from hot springs!",
      "The city is heated almost entirely by geothermal energy, making it one of the cleanest capitals in the world."
    ],
    "trivia": [
      "Reykjavik has no mosquitoes due to its climate.",
      "The city's Hallgrímskirkja church took 41 years to build and its design was inspired by basalt lava flows."
    ]
  },
  {
    "city": "Kathmandu",
    "country": "Nepal",
    "clues": [
      "This city is nestled in a valley surrounded by the Himalayan mountains.",
      "Known for its ancient temples, stupas with painted eyes, and as a gateway to Mount Everest."
    ],
    "fun_fact": [
      "Kathmandu's Boudhanath Stupa has eyes painted on it that represent Buddha's all-seeing wisdom!",
      "The city was once only accessible by foot until the first road was built in the 1950s."
    ],
    "trivia": [
      "Kathmandu has the densest concentration of UNESCO World Heritage Sites of any city in the world.",
      "The city's Durbar Square contains more than 50 temples dating from the 12th to 18th centuries."
    ]
  },
  {
    "city": "Mumbai",
    "country": "India",
    "clues": [
      "This city is home to the world's most expensive private residence and largest slum.",
      "Known for its colonial architecture, Bollywood film industry, and bustling street life."
    ],
    "fun_fact": [
      "Mumbai's dabbawalas deliver over 200,000 home-cooked lunches every day with incredible precision and almost no errors!",
      "The city was originally seven separate islands that were joined through land reclamation projects."
    ],
    "trivia": [
      "Mumbai's Chhatrapati Shivaji Terminus railway station is a UNESCO World Heritage site.",
      "The city hosts the world's largest outdoor laundry facility, called Dhobi Ghat."
    ]
  },
  {
    "city": "Vancouver",
    "country": "Canada",
    "clues": [
      "This city is surrounded by mountains and water, offering outdoor activities year-round.",
      "Consistently ranked among the world's most livable cities."
    ],
    "fun_fact": [
      "Vancouver has the smallest carbon footprint of any major city in North America!",
      "The city's Stanley Park is 10% larger than New York's Central Park and features a 8.8 km seawall."
    ],
    "trivia": [
      "Vancouver is home to Canada's largest port and is a major film production center, nicknamed 'Hollywood North.'",
      "The city hosted the 2010 Winter Olympics and has the world's longest uninterrupted waterfront path."
    ]
  },
  {
    "city": "Casablanca",
    "country": "Morocco",
    "clues": [
      "This city is home to one of the largest mosques in the world with a minaret visible throughout the city.",
      "Made famous by a classic Hollywood film, though it wasn't actually filmed there."
    ],
    "fun_fact": [
      "The Hassan II Mosque has a retractable roof and is partly built over the Atlantic Ocean!",
      "Casablanca means 'white house' in Spanish, named for the white-washed buildings visible from the sea."
    ],
    "trivia": [
      "Despite the famous film's title, 'Casablanca' was entirely filmed on Hollywood studio lots.",
      "The city is Morocco's largest and serves as its main industrial and economic center."
    ]
  },
  {
    "city": "Athens",
    "country": "Greece",
    "clues": [
      "This city is dominated by an ancient citadel perched on a rocky outcrop.",
      "Considered the birthplace of democracy, Western philosophy, and Olympic Games."
    ],
    "fun_fact": [
      "The Acropolis was built without using cement or mortar, just perfectly cut stones that fit together!",
      "Athens is Europe's oldest capital, with a recorded history spanning over 3,400 years."
    ],
    "trivia": [
      "The modern Olympic Games were revived in Athens in 1896.",
      "The city is named after Athena, the goddess of wisdom, who won a contest against Poseidon to become its patron."
    ]
  },
  {
    "city": "Krakow",
    "country": "Poland",
    "clues": [
      "This city's old town has a central market square that's one of Europe's largest medieval squares.",
      "Its historic center survived World War II almost completely intact."
    ],
    "fun_fact": [
      "According to legend, a dragon once lived in a cave at the foot of Krakow's Wawel Hill!",
      "The city's Wieliczka Salt Mine features an underground chapel with chandeliers made of salt crystals."
    ],
    "trivia": [
      "Krakow was the capital of Poland for over 500 years until 1596.",
      "The city has a tradition where a trumpet signal is played every hour from the main church tower, abruptly stopping mid-melody to commemorate a trumpeter shot during a Mongol invasion."
    ]
  },
  {
    "city": "Cusco",
    "country": "Peru",
    "clues": [
      "This city was once the capital of the Inca Empire.",
      "It serves as a gateway to an ancient citadel high in the mountains."
    ],
    "fun_fact": [
      "Cusco's street pattern is designed in the shape of a puma, a sacred animal to the Incas!",
      "The city sits at an elevation of 3,400 meters (11,200 feet) above sea level."
    ],
    "trivia": [
      "Cusco's Korikancha temple was once covered in sheets of gold before the Spanish conquest.",
      "The city's name means 'navel of the world' in Quechua, as the Incas believed it was the center of the universe."
    ]
  },
  {
    "city": "Edinburgh",
    "country": "Scotland",
    "clues": [
      "This city's skyline is dominated by a castle perched atop an extinct volcano.",
      "Known for its annual arts festival and medieval old town."
    ],
    "fun_fact": [
      "Edinburgh has more listed buildings than anywhere else in the world!",
      "The city inspired J.K. Rowling's Harry Potter series, and she wrote the first book in a local café."
    ],
    "trivia": [
      "Edinburgh has over 200 pubs within its city limits.",
      "The city is built on seven hills, similar to Rome."
    ]
  },
  {
    "city": "Quebec City",
    "country": "Canada",
    "clues": [
      "This city is the only walled city in North America north of Mexico.",
      "Known for its French heritage, cobblestone streets, and winter carnival."
    ],
    "fun_fact": [
      "Quebec City's Château Frontenac hotel holds the Guinness World Record for being the most photographed hotel in the world!",
      "The city's Old Town is a UNESCO World Heritage site and has buildings dating back to the 17th century."
    ],
    "trivia": [
      "Quebec City hosts the world's largest winter carnival, featuring ice sculptures and a hotel made entirely of ice.",
      "The city was founded in 1608, making it one of the oldest European settlements in North America."
    ]
  },
  {
    "city": "Florence",
    "country": "Italy",
    "clues": [
      "This city is known as the 'Cradle of the Renaissance' for its art and architecture.",
      "Home to a famous bridge lined with jewelry shops crossing the Arno River."
    ],
    "fun_fact": [
      "Florence's Uffizi Gallery was created when the Medici family donated their art collection, which was one of the first modern museums!",
      "The city's Duomo was the largest dome in the world until modern times, and was built without scaffolding."
    ],
    "trivia": [
      "Florence has more than 80 museums.",
      "The city is the birthplace of the Italian language, as developed by Dante Alighieri."
    ]
  }
]


async function run() {
  try {
    // Check if data already exists

    // Seed the database
    const seededDestinations = await db.insert(destinations).values(initialDestinations).returning()
    console.log("Seeded destinations:", seededDestinations)
    const seedValue = await db.select().from(destinations)
    console.log("Seed value:", seedValue)
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

run();