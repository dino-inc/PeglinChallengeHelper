class Challenge {
    constructor (id, name, description, author) {
        // defaults... probably
        this.id = id;
        this.name = name;
        this.description = description;
        this.author = author;
        const blankArrayKeys = ["blacklistOrbs", "whitelistOrbs", "blacklistRelics", "whitelistRelics", "blacklistScenarios", "whitelistScenarios", "blacklistBattles", "whitelistBattles", "blacklistEliteBattles", "whitelistEliteBattles", "startingRelics"];
        blankArrayKeys.forEach((item) => {
            this[item] = [];
        });
        const disabledKeys = ["skipStartingRelic", "permanentDamage", "immuneScenarioDamage", "preventNewOrbs", "preventOrbUpgrades", "preventPegMinigame", "allowCruciball"];
        disabledKeys.forEach((item) => {
            this[item] = false;
        });
        this.startingOrbs = [];
        this.startingAct = 1;
        this.startingRefreshes = 2;
        this.startingCrits = 2;
        this.maxHealth = 0;
        this.enemyHealthMultiplier = 0.0;
        this.riggedBombSelfDamage = 4;
        this.predictionBounces = 1;
        this.battleToEliteConversionChange = 0.0;
        this.enrageThreshold = 0;
        this.enrageAmount = 0;
    }

    // Create buttons based on keyfield file type
    function generateButtons() {
        let challengeContainer = document.getElementById('challengesContainer');
        let challengeDiv = challengeContainer.getElementById(this.id);
        if(challengeDiv = null){
            challengeDiv = challengeContainer.createElement('div');
            challengeDiv.id = this.id;
        }
        let keyArray = Object.keys(this);
        keyArray.forEach((item) => {
            addButton(this.id, this[item], typeof this[item]);
        });
    }
    function addButton(containerID, defaultValue, type){
    }
}
let defaultChallengeSettings = new Challenge();
let challengeObjectArray = [];

// This function's fundamentals from stackoverflow #36127648
document.getElementById('import').onclick = function() {
    var files = document.getElementById('selectFiles').files;
    if (files.length <= 0) {
        return false;
    }
    var fr = new FileReader();
    fr.onload = function(e) {
        let challengeContainer = JSON.parse(e.target.result);
        // Load challenge keys into an new object for every challenge in the file
        challengeContainer.challenges.forEach((item) => {
            let newChallenge = new Challenge(); 
            Object.keys(item).forEach((keyField) => {
                newChallenge[keyField] = item[keyField];
            });
            console.log(newChallenge);
        });
    }
    fr.onerror = function(e) {
        console.log("Error loading JSON file.");
    }

    fr.readAsText(files.item(0));
};

// TODO: new file button that creates a default and appends it to the challengeObjectArray