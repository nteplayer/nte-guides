const characterDB = {
    "Nanally": { base: 10, aCosts: [0, 2, 4, 6, 8, 12, 16], synergy: { "CharB": -2 } }
    // Add more characters here
};

let currentRoster = [];

function calculateRosterCost() {
    let total = 0;
    let names = currentRoster.map(c => c.name);

    currentRoster.forEach(char => {
        const data = characterDB[char.name];
        // Base + Awakening (A1-A6)
        total += data.base + data.aCosts[char.awakeningLevel];

        // Synergy Check (Point 6)
        for (let partner in data.synergy) {
            if (names.includes(partner)) {
                total += data.synergy[partner];
            }
        }
    });

    document.getElementById('total-cost').innerText = total;
}

function saveRosterToFirebase(rosterData) {
    const user = firebase.auth().currentUser;
    if (user) {
        db.collection("users").doc(user.uid).collection("rosters").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            data: rosterData
        });
    }
}
