let games = [
    {
        id: '1',
        title: 'The Legend of Zelda: Breath of the Wild',
        platform: ['Nintendo Switch', 'Wii U']
    },
    {
        id: '2',
        title: 'Super Mario Odyssey',
        platform: ['Nintendo Switch']
    },
    {
        id: '3',
        title: 'The Witcher 3: Wild Hunt',
        platform: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch']
    },
    {
        id: '4',
        title: 'God of War',
        platform: ['PlayStation 4']
    },
    {
        id: '5',
        title: 'Minecraft',
        platform: ['PC', 'Xbox One', 'PlayStation 4', 'Nintendo Switch', 'Mobile']
    }
]

let authors = [
    {
        id: '1',
        name: 'John Doe',
        verified: true
    },
    {
        id: '2',
        name: 'Jane Smith',
        verified: false
    },
    {
        id: '3',
        name: 'Alice Johnson',
        verified: true
    },
]

let reviews = [
    {
        id: '1',
        rating: 5,
        content: 'An amazing open-world adventure!',
        author_id: '1',
        game_id: '1'
    },
    {
        id: '2',
        rating: 4,
        content: 'A fun and creative platformer.',
        author_id: '2',
        game_id: '2'
    },
    {
        id: '3',
        rating: 5,
        content: 'A masterpiece of storytelling and gameplay.',
        author_id: '3',
        game_id: '3'
    },
    {
        id: '4',
        rating: 5,
        content: 'An epic action-adventure game.',
        author_id: '1',
        game_id: '4'
    },
    {
        id: '5',
        rating: 4,
        content: 'A sandbox game that lets you build anything.',
        author_id: '2',
        game_id: '5'
    },
    {
        id: '6',
        rating: 3,
        content: 'A good game, but it has some bugs.',
        author_id: '1',
        game_id: '1'
    },
    {
        id: '7',
        rating: 2,
        content: 'Not my cup of tea, but others might like it.',
        author_id: '2',
        game_id: '2'
    },
    {
        id: '8',
        rating: 1,
        content: 'I did not enjoy this game at all.',
        author_id: '1',
        game_id: '1'
    }
]

export default { games, authors, reviews };