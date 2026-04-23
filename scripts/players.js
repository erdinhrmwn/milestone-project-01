const PLAYERS_KEY = 'available_players';

const initialPlayers = [
    {
        id: 1,
        name: "Lionel Messi",
        position: "FW",
        nationality: "Argentina",
        image: "https://placehold.co/150?text=Messi"
    },
    {
        id: 2,
        name: "Cristiano Ronaldo",
        position: "FW",
        nationality: "Portugal",
        image: "https://placehold.co/150?text=Ronaldo"
    },
    {
        id: 3,
        name: "Kylian Mbappé",
        position: "FW",
        nationality: "France",
        image: "https://placehold.co/150?text=Mbappe"
    },
    {
        id: 4,
        name: "Kevin De Bruyne",
        position: "MF",
        nationality: "Belgium",
        image: "https://placehold.co/150?text=De+Bruyne"
    },
    {
        id: 5,
        name: "Virgil van Dijk",
        position: "DF",
        nationality: "Netherlands",
        image: "https://placehold.co/150?text=Van+Dijk"
    },
    {
        id: 6,
        name: "Alisson Becker",
        position: "GK",
        nationality: "Brazil",
        image: "https://placehold.co/150?text=Alisson"
    }
];

function getAvailablePlayers() {
    const data = localStorage.getItem(PLAYERS_KEY);
    return data ? JSON.parse(data) : initialPlayers;
}

function addPlayer(name, position, nationality, image) {
    const players = getAvailablePlayers();

    const sanitizeName = name.trim();
    const sanitizePosition = position.trim();
    const sanitizeNationality = nationality.trim();
    const sanitizeImage = image.trim();

    // Validate input data
    if (!sanitizeName || !sanitizePosition || !sanitizeNationality || !sanitizeImage) {
        alert('Please fill in all the fields');
        return;
    }

    // Validate name 
    if (sanitizeName.length < 3) {
        alert('Player name must be at least 3 characters long');
        return;
    }

    // Validate player position
    const validPositions = ['FW', 'MF', 'DF', 'GK'];
    if (!validPositions.includes(sanitizePosition)) {
        alert('Invalid player position, use FW, MF, DF, or GK');
        return;
    }

    // Validate nationality
    if (sanitizeNationality.length < 3) {
        alert('Player nationality must be at least 3 characters long');
        return;
    }

    // Validate player image
    if (!sanitizeImage.startsWith('http') && !sanitizeImage.startsWith('https')) {
        alert('Invalid player image');
        return;
    }

    // Check if player name is already exist
    if (players.find(player => player.name === sanitizeName)) {
        alert('Player already exists');
        return;
    }

    const newPlayer = {
        id: players.length + 1,
        name: sanitizeName,
        position: sanitizePosition,
        nationality: sanitizeNationality,
        image: sanitizeImage
    };
    players.push(newPlayer);
    savePlayers(players);
}

function deletePlayer(playerId) {
    const players = getAvailablePlayers();
    const updatedPlayers = players.filter(player => player.id !== playerId);
    savePlayers(updatedPlayers);
}

function savePlayers(players) {
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
}
