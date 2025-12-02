import { Game } from './types';

// Robust, open/embeddable game URLs to ensure "100% Playable"
export const GAMES: Game[] = [
  {
    id: 'subway-surfers',
    title: 'Subway Surfers',
    description: 'Dash as fast as you can through the subway and dodge the oncoming trains!',
    thumbnail: 'https://picsum.photos/300/300?random=1',
    url: 'https://scratch.mit.edu/projects/612185567/embed',
    category: 'action',
    tags: ['run', '3d', 'popular'],
    plays: 1542030,
    rating: 4.8,
    isTrending: true
  },
  {
    id: 'slope',
    title: 'Slope',
    description: 'Control the ball in a high-speed 3D course. Don\'t fall off!',
    thumbnail: 'https://picsum.photos/300/300?random=2',
    url: 'https://scratch.mit.edu/projects/285226176/embed',
    category: 'arcade',
    tags: ['skill', '3d', 'fast'],
    plays: 2300500,
    rating: 4.5,
    isTrending: true
  },
  {
    id: '1v1-lol',
    title: '1v1.LOL',
    description: 'Build and shoot simulator. Practice your battle royale skills.',
    thumbnail: 'https://picsum.photos/300/300?random=3',
    url: 'https://scratch.mit.edu/projects/425642468/embed',
    category: 'shooter',
    tags: ['multiplayer', 'building', 'fps'],
    plays: 890000,
    rating: 4.7,
    isTrending: true
  },
  {
    id: 'minecraft-classic',
    title: 'Minecraft Classic',
    description: 'The original version of Minecraft. Build securely in your browser.',
    thumbnail: 'https://picsum.photos/300/300?random=4',
    url: 'https://scratch.mit.edu/projects/10128407/embed',
    category: 'action',
    tags: ['sandbox', 'building', 'classic'],
    plays: 5600100,
    rating: 4.9,
    isTrending: true
  },
  {
    id: 'happy-wheels',
    title: 'Happy Wheels',
    description: 'Physics-based obstacle course game with a dark twist.',
    thumbnail: 'https://picsum.photos/300/300?random=5',
    url: 'https://scratch.mit.edu/projects/27533351/embed',
    category: 'racing',
    tags: ['physics', 'gore', 'funny'],
    plays: 1200000,
    rating: 4.6
  },
  {
    id: 'basketball-stars',
    title: 'Basketball Stars',
    description: 'Play basketball with the greatest stars. 1-on-1 action.',
    thumbnail: 'https://picsum.photos/300/300?random=6',
    url: 'https://scratch.mit.edu/projects/157438150/embed',
    category: 'action',
    tags: ['sports', '2player'],
    plays: 650000,
    rating: 4.4,
    isNew: true
  },
  {
    id: '2048',
    title: '2048',
    description: 'Join the numbers and get to the 2048 tile!',
    thumbnail: 'https://picsum.photos/300/300?random=7',
    url: 'https://play2048.co/',
    category: 'puzzle',
    tags: ['math', 'logic'],
    plays: 900000,
    rating: 4.3
  },
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    description: 'American football management and gameplay in retro style.',
    thumbnail: 'https://picsum.photos/300/300?random=8',
    url: 'https://scratch.mit.edu/projects/610502047/embed',
    category: 'action',
    tags: ['sports', 'retro'],
    plays: 780000,
    rating: 4.8,
    isNew: true
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Dash',
    description: 'Jump and fly your way through danger in this rhythm-based platformer.',
    thumbnail: 'https://picsum.photos/300/300?random=9',
    url: 'https://scratch.mit.edu/projects/105500895/embed',
    category: 'arcade',
    tags: ['music', 'difficult'],
    plays: 3400000,
    rating: 4.6
  },
  {
    id: 'drift-hunters',
    title: 'Drift Hunters',
    description: 'Car drifting simulator. Tune your car and drift.',
    thumbnail: 'https://picsum.photos/300/300?random=10',
    url: 'https://scratch.mit.edu/projects/151608985/embed',
    category: 'racing',
    tags: ['cars', '3d'],
    plays: 540000,
    rating: 4.4,
    isNew: true
  },
  {
    id: 'crossy-road',
    title: 'Crossy Road',
    description: 'Why did the chicken cross the road? Find out in this endless hopper.',
    thumbnail: 'https://picsum.photos/300/300?random=11',
    url: 'https://scratch.mit.edu/projects/61223403/embed',
    category: 'arcade',
    tags: ['casual', 'endless'],
    plays: 1100000,
    rating: 4.5
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    description: 'Bike racing game with crazy stunts and deadly obstacles.',
    thumbnail: 'https://picsum.photos/300/300?random=12',
    url: 'https://scratch.mit.edu/projects/236683862/embed',
    category: 'racing',
    tags: ['motorcycle', 'stunts'],
    plays: 980000,
    rating: 4.7
  }
];

export const ADSENSE_ID = 'ca-pub-9774042341049510';