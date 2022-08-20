class Challenge {
    constructor (id, name, author) {
        // defaults... probably, need to confirm
        this.id = id;
        this.name = name;
        this.description = "Write a description! (Does nothing)";
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
    generateButtons() {
        let challengeContainer = document.getElementById('challengesContainer');
        let challengeDiv = document.getElementById(this.id);
        if(challengeDiv == null){
            challengeDiv = document.createElement('div');
            challengeContainer.appendChild(challengeDiv);
            challengeDiv.id = this.id;
        }
        let keyArray = Object.keys(this);
        keyArray.forEach((item) => {
            this.addButton(challengeDiv, this[item], typeof this[item], item);
        });
    }

    addButton(container, customValue, type, name){
        let newKeyFieldInput = null;
        switch(type) {
            case "string":
                newKeyFieldInput = document.createElement('input');
                newKeyFieldInput.type = "text";
                newKeyFieldInput.value = customValue;
                break;
            case "object":
                newKeyFieldInput = document.createElement('input');
                newKeyFieldInput.type = "text";
                newKeyFieldInput.value = customValue;
                break;
            case "boolean":
                newKeyFieldInput = document.createElement('input');
                newKeyFieldInput.type = "checkbox";
                newKeyFieldInput.value = customValue;
                break;
            case "number":
                newKeyFieldInput = document.createElement('input');
                newKeyFieldInput.type = "number";
                newKeyFieldInput.value = customValue;
                break;
            default:
                return;
        }
        let inputField = document.createElement('div');
        let nameField = document.createElement('b');
        nameField.innerHTML = name;
        inputField.appendChild(nameField);
        inputField.appendChild(newKeyFieldInput);
        inputField.appendChild(document.createElement('br'));
        container.appendChild(inputField);
    }
}
let defaultChallengeSettings = new Challenge();
let challengeObjectArray = [];

// This function's fundamentals from stackoverflow #36127648
document.getElementById('import').onclick = function() {
    // Zero out previous values
    document.getElementById("challengesContainer").textContent = '';
    challengeObjectArray = [];

    // Load JSON
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
            containerDivider = document.createElement('h2');
            containerDivider.innerHTML = newChallenge.name;
            document.getElementById('challengesContainer').appendChild(containerDivider);
            newChallenge.generateButtons();
        });
    }
    fr.onerror = function(e) {
        console.log("Error loading JSON file.");
    }

    fr.readAsText(files.item(0));
};

// TODO - create new challenge button