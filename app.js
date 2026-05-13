const characterData = {
    "Nanally": {
        baseCost: 10,
        awakeningCosts: [0, 2, 4, 7, 10, 15, 20], // A0 to A6
        synergy: {
            "CharacterB": -2, // Cost decreases by 2 if played together
            "CharacterC": 3   // Cost increases if combo is OP
        }
    }
};

function calculateTotalCost(currentRoster) {
    let total = 0;
    currentRoster.forEach(char => {
        total += char.baseCost + char.awakeningCosts[char.awakeningLevel];
        
        // Check for Synergy (Point 6 in your plan)
        char.activeSynergies.forEach(syn => {
            if (currentRoster.includes(syn)) {
                total += characterData[char.name].synergy[syn] || 0;
            }
        });
    });
    return total;
}
