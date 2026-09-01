export const eras = [
  {
    id: 'dinosaurs',
    title: 'Dinosaurs',
    color: '#34d399',
    lessons: [
      { subtitle: 'Long Ago', text: 'Dinosaurs lived on Earth millions of years ago, long before people!', image: '🌋' },
      { subtitle: 'Giant Plant Eaters', text: 'Some dinosaurs had long necks to eat leaves from the tallest trees.', image: '🦕' },
      { subtitle: 'The T-Rex', text: 'The mighty T-Rex was a fierce meat-eater with very tiny arms.', image: '🦖' }
    ],
    artifact: { id: 'tooth', name: 'Dinosaur Tooth', icon: '🦷' },
    quiz: {
      question: 'Tap the mighty T-Rex!',
      options: [
        { id: 'trex', label: 'T-Rex', image: '🦖', isCorrect: true },
        { id: 'dog', label: 'Dog', image: '🐕', isCorrect: false },
        { id: 'cat', label: 'Cat', image: '🐈', isCorrect: false }
      ]
    }
  },
  {
    id: 'ice-age',
    title: 'Ice Age',
    color: '#93c5fd',
    lessons: [
      { subtitle: 'A Frozen World', text: 'During the Ice Age, much of the Earth was covered in thick, cold ice.', image: '❄️' },
      { subtitle: 'Furry Giants', text: 'Sabertooth tigers and giant sloths roamed the snowy plains.', image: '🐅' },
      { subtitle: 'The Woolly Mammoth', text: 'The Woolly Mammoth was like an elephant, but very furry to stay warm!', image: '🦣' }
    ],
    artifact: { id: 'cave-painting', name: 'Cave Painting', icon: '🎨' },
    quiz: {
      question: 'Spot the Woolly Mammoth!',
      options: [
        { id: 'lion', label: 'Lion', image: '🦁', isCorrect: false },
        { id: 'mammoth', label: 'Mammoth', image: '🦣', isCorrect: true },
        { id: 'monkey', label: 'Monkey', image: '🐒', isCorrect: false }
      ]
    }
  },
  {
    id: 'egypt',
    title: 'Ancient Egypt',
    color: '#fde047',
    lessons: [
      { subtitle: 'The Nile River', text: 'Ancient Egypt was a kingdom built along the very long Nile River.', image: '🌊' },
      { subtitle: 'Pharaohs', text: 'The kings and queens were called Pharaohs, and they wore beautiful gold crowns.', image: '🫅' },
      { subtitle: 'The Pyramids', text: 'They built massive stone Pyramids as tombs for the Pharaohs.', image: '🛕' }
    ],
    artifact: { id: 'crown', name: "Pharaoh's Crown", icon: '👑' },
    quiz: {
      question: "Find the Pharaoh's Pyramid!",
      options: [
        { id: 'pyramid', label: 'Pyramid', image: '🛕', isCorrect: true },
        { id: 'house', label: 'House', image: '🏠', isCorrect: false },
        { id: 'tent', label: 'Tent', image: '⛺', isCorrect: false }
      ]
    }
  },
  {
    id: 'greece',
    title: 'Ancient Greece',
    color: '#bae6fd',
    lessons: [
      { subtitle: 'City-States', text: 'Ancient Greece had many famous cities like Athens and Sparta.', image: '🏛️' },
      { subtitle: 'The Olympics', text: 'They invented the Olympic Games, where athletes ran and wrestled.', image: '🏃' },
      { subtitle: 'Marble Temples', text: 'They built gorgeous marble temples on high hills for their gods.', image: '🏺' }
    ],
    artifact: { id: 'wreath', name: 'Golden Wreath', icon: '🌿' },
    quiz: {
      question: 'Spot the Marble Temple!',
      options: [
        { id: 'temple', label: 'Temple', image: '🏛️', isCorrect: true },
        { id: 'factory', label: 'Factory', image: '🏭', isCorrect: false },
        { id: 'hospital', label: 'Hospital', image: '🏥', isCorrect: false }
      ]
    }
  },
  {
    id: 'rome',
    title: 'Ancient Rome',
    color: '#fca5a5',
    lessons: [
      { subtitle: 'Mighty Republic', text: 'Ancient Rome was a great empire with paved stone roads connecting cities.', image: '🏛️' },
      { subtitle: 'The Colosseum', text: 'Romans watched chariot races and exciting games in a giant stadium called the Colosseum!', image: '🏟️' },
      { subtitle: 'Brave Soldiers', text: 'Roman soldiers carried curved shields and wore shiny helmets with red crests.', image: '🛡️' }
    ],
    artifact: { id: 'roman-coin', name: 'Roman Gold Coin', icon: '🪙' },
    quiz: {
      question: 'Find the Colosseum Stadium!',
      options: [
        { id: 'colosseum', label: 'Colosseum', image: '🏟️', isCorrect: true },
        { id: 'igloo', label: 'Igloo', image: '🛖', isCorrect: false },
        { id: 'windmill', label: 'Windmill', image: '🏬', isCorrect: false }
      ]
    }
  },
  {
    id: 'maya',
    title: 'Ancient Maya',
    color: '#86efac',
    lessons: [
      { subtitle: 'Jungle Cities', text: 'The Maya built wonderful stone cities hidden deep inside tropical rainforests.', image: '🌴' },
      { subtitle: 'Step Pyramids', text: 'They constructed tall step pyramids with stairs leading right up to the sky.', image: '🛕' },
      { subtitle: 'Chocolate Trees', text: 'The Maya were among the first people to make yummy drinks from cocoa beans!', image: '🍫' }
    ],
    artifact: { id: 'jade-mask', name: 'Maya Jade Mask', icon: '🎭' },
    quiz: {
      question: 'Spot the Step Pyramid!',
      options: [
        { id: 'step-pyramid', label: 'Step Pyramid', image: '🛕', isCorrect: true },
        { id: 'barn', label: 'Barn', image: '🚜', isCorrect: false },
        { id: 'skyscraper', label: 'Skyscraper', image: '🏢', isCorrect: false }
      ]
    }
  },
  {
    id: 'middle-ages',
    title: 'Middle Ages',
    color: '#a78bfa',
    lessons: [
      { subtitle: 'Kings & Queens', text: 'This was a time of powerful kings, queens, and noble lords.', image: '👑' },
      { subtitle: 'Brave Knights', text: 'Knights wore heavy metal armor and rode fast horses into battle.', image: '🐎' },
      { subtitle: 'Stone Castles', text: 'They lived in massive stone castles to stay safe from enemies.', image: '🏰' }
    ],
    artifact: { id: 'shield', name: "Knight's Shield", icon: '🛡️' },
    quiz: {
      question: 'Spot the Castle!',
      options: [
        { id: 'tent', label: 'Tent', image: '⛺', isCorrect: false },
        { id: 'castle', label: 'Castle', image: '🏰', isCorrect: true },
        { id: 'house', label: 'House', image: '🏠', isCorrect: false }
      ]
    }
  },
  {
    id: 'japan',
    title: 'Feudal Japan',
    color: '#fed7aa',
    lessons: [
      { subtitle: 'Land of the Samurai', text: 'Samurai warriors followed a code of honor, courage, and respect.', image: '⚔️' },
      { subtitle: 'Cherry Blossoms', text: 'People celebrated spring beneath beautiful blooming pink cherry blossom trees.', image: '🌸' },
      { subtitle: 'Wooden Pagodas', text: 'They designed elegant wooden pagoda castles with curved roofs.', image: '🏯' }
    ],
    artifact: { id: 'origami-crane', name: 'Golden Origami Crane', icon: '🦢' },
    quiz: {
      question: 'Find the Japanese Pagoda Castle!',
      options: [
        { id: 'pagoda', label: 'Pagoda Castle', image: '🏯', isCorrect: true },
        { id: 'lighthouse', label: 'Lighthouse', image: '🗼', isCorrect: false },
        { id: 'bridge', label: 'Bridge', image: '🌉', isCorrect: false }
      ]
    }
  },
  {
    id: 'pirates',
    title: 'Pirate Age',
    color: '#38bdf8',
    lessons: [
      { subtitle: 'High Seas', text: 'Brave explorers sailed wooden ships across the vast oceans.', image: '⛵' },
      { subtitle: 'Ahoy Matey!', text: 'Pirates sailed the seas looking for ships to capture.', image: '🏴‍☠️' },
      { subtitle: 'Buried Treasure', text: 'They hid their gold pieces in treasure chests and buried them on islands.', image: '🪙' }
    ],
    artifact: { id: 'compass', name: 'Pirate Compass', icon: '🧭' },
    quiz: {
      question: 'Find the Treasure Chest!',
      options: [
        { id: 'box', label: 'Box', image: '📦', isCorrect: false },
        { id: 'barrel', label: 'Barrel', image: '🛢️', isCorrect: false },
        { id: 'treasure', label: 'Treasure', image: '🪙', isCorrect: true }
      ]
    }
  },
  {
    id: 'renaissance',
    title: 'Renaissance',
    color: '#ddd6fe',
    lessons: [
      { subtitle: 'Great Inventions', text: 'Artists and scientists like Leonardo da Vinci designed flying machines!', image: '🎨' },
      { subtitle: 'The Printing Press', text: 'New printing presses allowed books to be shared with everyone for the first time.', image: '📚' },
      { subtitle: 'Looking at Stars', text: 'Astronomers used brass telescopes to look at moons and distant planets.', image: '🔭' }
    ],
    artifact: { id: 'telescope', name: 'Brass Telescope', icon: '🔭' },
    quiz: {
      question: 'Spot the Telescope!',
      options: [
        { id: 'telescope', label: 'Telescope', image: '🔭', isCorrect: true },
        { id: 'flashlight', label: 'Flashlight', image: '🔦', isCorrect: false },
        { id: 'candle', label: 'Candle', image: '🕯️', isCorrect: false }
      ]
    }
  },
  {
    id: 'wild-west',
    title: 'Wild West',
    color: '#fb923c',
    lessons: [
      { subtitle: 'Pioneers', text: 'Families traveled in covered wagons to build new homes in the west.', image: '🛤️' },
      { subtitle: 'Cowboys', text: 'Cowboys rode horses to herd cattle across the great plains.', image: '🐎' },
      { subtitle: 'Yee-Haw!', text: 'They wore wide-brimmed hats and shiny badges to keep the peace.', image: '🤠' }
    ],
    artifact: { id: 'star', name: "Sheriff's Star", icon: '⭐' },
    quiz: {
      question: 'Spot the Cowboy Hat!',
      options: [
        { id: 'hat', label: 'Cowboy Hat', image: '🤠', isCorrect: true },
        { id: 'crown', label: 'Crown', image: '👑', isCorrect: false },
        { id: 'helmet', label: 'Helmet', image: '🪖', isCorrect: false }
      ]
    }
  },
  {
    id: 'industrial',
    title: 'Industrial Revolution',
    color: '#9ca3af',
    lessons: [
      { subtitle: 'New Machines', text: 'People invented amazing machines that ran on steam power!', image: '🏗️' },
      { subtitle: 'Factories', text: 'Things were made much faster in large factories using spinning gears.', image: '⚙️' },
      { subtitle: 'Steam Trains', text: 'Huge steam trains allowed people to travel far distances very quickly.', image: '🚂' }
    ],
    artifact: { id: 'gear', name: 'Golden Gear', icon: '⚙️' },
    quiz: {
      question: 'Find the Steam Train!',
      options: [
        { id: 'car', label: 'Car', image: '🚙', isCorrect: false },
        { id: 'train', label: 'Train', image: '🚂', isCorrect: true },
        { id: 'bicycle', label: 'Bicycle', image: '🚲', isCorrect: false }
      ]
    }
  },
  {
    id: 'aviation',
    title: 'Early Aviation',
    color: '#67e8f9',
    lessons: [
      { subtitle: 'First Flight', text: 'The Wright Brothers built the very first powered airplane in 1903!', image: '🛩️' },
      { subtitle: 'Biplanes', text: 'Early airplanes had two wings stacked on top of each other and open cockpits.', image: '✈️' },
      { subtitle: 'Daredevil Pilots', text: 'Brave pilots wore leather helmets and goggles to fly above the clouds.', image: '🥽' }
    ],
    artifact: { id: 'aviator-goggles', name: 'Aviator Goggles', icon: '🥽' },
    quiz: {
      question: 'Spot the Airplane!',
      options: [
        { id: 'airplane', label: 'Airplane', image: '🛩️', isCorrect: true },
        { id: 'submarine', label: 'Submarine', image: '🚢', isCorrect: false },
        { id: 'wagon', label: 'Wagon', image: '🛒', isCorrect: false }
      ]
    }
  },
  {
    id: 'retro',
    title: '1960s Retro',
    color: '#f472b6',
    lessons: [
      { subtitle: 'Rock & Roll', text: 'Music was groovy, and people loved to dance to rock and roll.', image: '🎸' },
      { subtitle: 'Old Tech', text: 'Computers were huge, and telephones were attached to the wall with curly cords.', image: '☎️' },
      { subtitle: 'Early TV', text: 'Families watched old-school TVs with thick screens and two knobs.', image: '📺' }
    ],
    artifact: { id: 'camera', name: 'Vintage Camera', icon: '📷' },
    quiz: {
      question: 'Find the Retro TV!',
      options: [
        { id: 'laptop', label: 'Laptop', image: '💻', isCorrect: false },
        { id: 'phone', label: 'Phone', image: '📱', isCorrect: false },
        { id: 'tv', label: 'TV', image: '📺', isCorrect: true }
      ]
    }
  },
  {
    id: 'space-age',
    title: 'Space Age',
    color: '#312e81',
    lessons: [
      { subtitle: 'Leaving Earth', text: 'Scientists built powerful rockets to send astronauts into space.', image: '🚀' },
      { subtitle: 'Walking on the Moon', text: 'In 1969, humans walked on the moon for the very first time!', image: '🌕' },
      { subtitle: 'To Infinity', text: 'Now we have satellites and space stations floating among the stars.', image: '🛰️' }
    ],
    artifact: { id: 'moon-rock', name: 'Moon Rock', icon: '🌑' },
    quiz: {
      question: 'Find the Rocket Ship!',
      options: [
        { id: 'airplane', label: 'Airplane', image: '✈️', isCorrect: false },
        { id: 'rocket', label: 'Rocket', image: '🚀', isCorrect: true },
        { id: 'helicopter', label: 'Helicopter', image: '🚁', isCorrect: false }
      ]
    }
  }
];
