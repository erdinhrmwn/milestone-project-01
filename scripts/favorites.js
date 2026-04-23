const FAVORITES_KEY = 'favorite_players';

/**
 * Get the list of favorite player IDs from localStorage
 * @returns {number[]}
 */
function getFavorites() {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Check if a player ID is in the favorites list
 * @param {number} playerId 
 * @returns {boolean}
 */
function isFavorite(playerId) {
    return getFavorites().includes(playerId);
}

/**
 * Toggle a player ID in the favorites list
 * @param {number} playerId 
 */
function toggleFavorite(playerId) {
    let favorites = getFavorites();

    // check if player is already a favorite
    const checkFavorite = isFavorite(playerId);

    if (!checkFavorite) {
        // add player to favorites
        favorites.push(playerId);
    } else {
        // remove player from favorites
        favorites = favorites.filter(id => id !== playerId);
    }

    // save favorites to localStorage
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
