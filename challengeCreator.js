// Create constant reference arrays
// Yes, they're hardcoded... TODO: offload to local dir JSON?

// Value that should be initialized to a blank array 
const blankArrayKeys = ["blacklistOrbs", "whitelistOrbs", "blacklistRelics", "whitelistRelics", "blacklistScenarios", "whitelistScenarios", "blacklistBattles", "whitelistBattles", "blacklistEliteBattles", "whitelistEliteBattles", "startingRelics", "requiredMods", "requiredChallenges", "startingOrbs"];
// Value that should be initialized to false boolean
const disabledKeys = ["skipStartingRelic", "permanentDamage", "immuneScenarioDamage", "preventNewOrbs", "preventOrbUpgrades", "preventPegMinigame", "allowCruciball"];

// List of categories
const categorySort = ["Required", "Prerequisites", "Blacklists", "Whitelists", "Start Modifiers", "Special", "Rewards", "Uncategorized"];

// Mapping of keyfields to categories
const categoryMap = [["id", "name", "description", "author"], 
["requiredMods", "requiredChallenges"], 
["blacklistOrbs",  "blacklistRelics",  "blacklistScenarios",  "blacklistBattles",  "blacklistEliteBattles"], 
["whitelistOrbs", "whitelistRelics", "whitelistScenarios", "whitelistBattles", "whitelistEliteBattles"],
["startingOrbs", "startingRelics", "startingAct", "startingRefreshes", "startingCrits", "skipStartingRelic", "maxHealth", "enemyHealthMultiplier"], 
["permanentDamage", "immuneScenarioDamage", "riggedBombSelfDamage", "predictionBounces", "battleToEliteConversionChance", "enrageThreshold","enrageAmount", "allowCruciball"], 
["preventNewOrbs", "preventOrbUpgrades", "preventPegMinigame"]];

// All keyfields that are arrays - duplicate of blankArrayKeys, TODO resolve
const arrayInputs = ["requiredMods", "requiredChallenges", "blacklistOrbs",  "blacklistRelics",  "blacklistScenarios",  "blacklistBattles",  "blacklistEliteBattles", "whitelistOrbs", "whitelistRelics", "whitelistScenarios", "whitelistBattles", "whitelistEliteBattles", "startingOrbs", "startingRelics"];

// All keyfields that are floats
const floatKeys = ["enemyHealthMultiplier", "battleToEliteConversionChance"];

// Tooltip object
const tooltips = {
    "id": "String. ID used for tracking this challenge.",
    "name": "String. Display name for challenge.",
    "description": "String. NOT IMPLEMENTED. WILL DO NOTHING.",
    "author": "String. The author of the challenge.",
    "requiredMods": "String Array. Mods required for this challenge to work. Use the GUID of the mod.",
    "requiredChallenges": "String Array. Challenges required for this challenge to be revealed. Use ID of the other challenges.",
    "blacklistOrbs": "String Array. Orbs removed from the reward pool. Does not affect Scenarios.",
    "whitelistOrbs": "String Array. Orbs allowed to be given as rewards. Removes all others. Does not affect Scenarios.",
    "blacklistRelics": "String Array. Relics removed from the reward pool. Does not affect Scenarios.",
    "whitelistRelics": "String Array. Relics allowed to be given as rewards. Removes all others. Does not affect Scenarios.",
    "blacklistScenarios": "String Array. Scenarios not allowed to occur.",
    "whitelistScenarios": "String Array. Scenarios allowed to occur. Removes all others.",
    "blacklistBattles": "String Array. Battles not allowed to occur.",
    "whitelistBattles": "String Array. Battles allowed to occur. Removes all others.",
    "blacklistEliteBattles": "String Array. Elite battles not allowed to occur.",
    "whitelistEliteBattles": "String Array. Elite battles allowed to occur. Removes all others.",
    "startingOrbs": "String Array. What orbs the player starts with.",
    "startingRelics": "String Array. What relics the player starts with.",
    "startingAct": "Integer. What act the player starts on. Valid entries 1-3.",
    "startingRefreshes": "Integer. The number of refresh pegs on the board.",
    "startingCrits": "Integer. The number of crits pegs on the board.",
    "skipStartingRelic": "Boolean. Skip the starting relic.",
    "maxHealth": "Integer. The starting amount of health.",
    "enemyHealthMultiplier": "Float (ex: 1.1, .9). How much enemy health increases/decreases.",
    "permanentDamage": "Boolean. Lose max health when damaged.",
    "immuneScenarioDamage": "Boolean. Lose no health from scenarios.",
    "riggedBombSelfDamage": "Integer. How much damage rigged bombs inflict on the player.",
    "preventNewOrbs": "Boolean. Removes orbs from the battle reward. Does not affect scenarios.",
    "preventOrbUpgrades": "Boolean. Removes upgrades from the battle reward. Does not affect scenarios.",
    "preventPegMinigame": "Boolean. Remove all peg pachinko minigames from event spaces.",
    "predictionBounces": "Integer. How many prediction bounces are used.",
    "battleToEliteConversionChance": "Float. Between 0.0 and 1.0. Converts regular battles to elite battles. Does not affect the first three spaces.",
    "enrageThreshold": "Integer. Minimum amount of damage the player needs to deal to an enemy. If met, increases the enemy damage.",
    "enrageAmount": "Integer. Amount of damage to increase the enemy when enrageThreshold is met.",
    "AllowCruciball": "Boolean. Allows the player to continue the challenge with cruciball levels. Cruciball Levels are challenge dependant. CURRENTLY NOT IMPLEMENTED"
};

class Challenge {
    constructor (newChallenge) {
        // Only prompt if user is creating a new challenge manually
        if(newChallenge){
            this.id = prompt("Challenge ID? Make it unique with no spaces, please.");
            this.name = prompt("Display name for the challenge?");
            this.author = prompt("Who is creating this challenge?");
        } else {
            this.id = "default";
            this.name = "default";
            this.author = "default";
        }
        this.setDefaults();
    }

    setDefaults() {
        this.description = "Write a description! (Does nothing)";
        blankArrayKeys.forEach((item) => {
            this[item] = [];
        });
        disabledKeys.forEach((item) => {
            this[item] = false;
        });
        this.startingAct = 1;
        this.startingRefreshes = 2;
        this.startingCrits = 2;
        this.maxHealth = 0;
        this.enemyHealthMultiplier = 0.0;
        this.riggedBombSelfDamage = 4;
        this.predictionBounces = 1;
        this.battleToEliteConversionChance = 0.0;
        this.enrageThreshold = 0;
        this.enrageAmount = 0;
    }

    // Create buttons based on keyfield file type
    generateChallenge() {
        let challengeContainer = document.getElementById("challengesContainer");
        let challengeDiv = document.getElementById(this.id);

        // Create div and span to contain individual challenge
        let challengeSpan = document.createElement("span");
        let challengeHeader = document.createElement("h2");
        challengeDiv = document.createElement("ul");
        challengeSpan.id = this.id;
        challengeSpan.classList.add("challenge");
        challengeHeader.innerHTML = this.name;
        challengeSpan.appendChild(challengeHeader);
        challengeSpan.appendChild(challengeDiv);
        challengeContainer.appendChild(challengeSpan);
        challengeDiv.id = this.id;



        // Create category containers for each category
        categorySort.forEach((item) => {
            let categorySpan = challengeDiv.appendChild(document.createElement("li"));
            let newCategoryHeader = categorySpan.appendChild(document.createElement("h3"));
            let newCategory = categorySpan.appendChild(document.createElement("ul"));
            categorySpan.id = item+this.id;
            categorySpan.classList.add("category");
            newCategory.id = item+this.id+"category";
            newCategoryHeader.innerHTML = item;
        });

        let challengeCategory = document.getElementById("Uncategorized");
        let keyArray = Object.keys(this);
        keyArray.forEach((item) => {
            // Check the category index for the key, use the corresponding category container
            let mappedCategory = 7;
            categoryMap.forEach((category, index) => {
                category.forEach((keyFieldMap) => {
                    if (keyFieldMap == item) {
                        mappedCategory = index;
                    }
                });
            });
            challengeCategory = document.getElementById(categorySort[mappedCategory]+this.id+"category");
            challengeCategory = challengeCategory.appendChild(document.createElement("li"));

            // Add the button to the found category
            let newButton = this.addButton(challengeCategory, this[item], typeof this[item], item);
            newButton.classList.add(item, "keyField");
        });
        let challengeCategoryHide = document.getElementById("Uncategorized"+this.id);
        challengeCategoryHide.hidden = true;
    }

    // Returns the input field created
    addButton(container, customValue, type, name){
        let newKeyFieldInput = null;
        switch(type) {
            case "string":
                newKeyFieldInput = document.createElement("input");
                newKeyFieldInput.type = "text";
                newKeyFieldInput.value = customValue;
                newKeyFieldInput.classList.add("string");
                break;
            case "object":
                newKeyFieldInput = document.createElement("input");
                newKeyFieldInput.type = "text";
                newKeyFieldInput.value = customValue;
                newKeyFieldInput.classList.add("stringArray");
                break;
            case "boolean":
                newKeyFieldInput = document.createElement("input");
                newKeyFieldInput.type = "checkbox";
                newKeyFieldInput.checked = customValue;
                newKeyFieldInput.classList.add("boolean");
                break;
            case "number":
                newKeyFieldInput = document.createElement("input");
                newKeyFieldInput.type = "number";
                newKeyFieldInput.value = customValue;
                newKeyFieldInput.classList.add("number")
                break;
            default:
                return;
        }
        let inputField = document.createElement("div");
        let nameField = document.createElement("span");
        let tooltip = document.createElement("span");
        newKeyFieldInput.id = name;
        nameField.innerHTML = name;
        tooltip.innerHTML = tooltips[name];
        tooltip.classList.add("tooltiptext");
        nameField.classList.add("tooltip");
        nameField.appendChild(tooltip);
        inputField.appendChild(nameField);
        inputField.appendChild(newKeyFieldInput);
        container.appendChild(inputField);
        return inputField;
    }
    // Returns the keys that are different from the default
    compareKeyfields(challenge){
        let keyDiff = [];
        Object.keys(this).forEach((keyField) => {
            //console.log(keyField +"\n"+challenge[keyField]+ " vs " +this[keyField]);
            if (!(keyField in challenge)){
                keyDiff.push(keyField);
            } else {
                if (typeof(challenge[keyField]) == "object") {
                    // Handle array objects special case
                    // check every element stolen from the internet
                    function checkEveryElement(a, b) {
                        return a.every((v, i) => v === b[i]);
                    }
                    if (challenge[keyField].length !== this[keyField].length || !checkEveryElement(challenge[keyField], this[keyField])) {
                        keyDiff.push(keyField);
                    }
                }
                else if (challenge[keyField] != this[keyField]) {
                    keyDiff.push(keyField);
                }
            }
        });
        return keyDiff;
    }
}
let defaultChallengeSettings = new Challenge();
let challengeObjectArray = [];

// This function's basic structure from stackoverflow 36127648
document.getElementById("import").onclick = function() {
    // Zero out previous values
    document.getElementById("challengesContainer").textContent = "";
    challengeObjectArray = [];

    // Load JSON
    var files = document.getElementById("selectFiles").files;
    if (files.length <= 0) {
        return false;
    }
    var fr = new FileReader();
    fr.onload = function(e) {
        let challengeContainer = JSON.parse(e.target.result);
        // Load challenge keys into an new object for every challenge in the file
        challengeContainer.challenges.forEach((item) => {
            let newChallenge = new Challenge(false);
            challengeObjectArray.push(newChallenge); 
            Object.keys(item).forEach((keyField) => {
                newChallenge[keyField] = item[keyField];
            });
            newChallenge.generateChallenge();
        });
    }
    fr.onerror = function(e) {
        console.log("Error loading JSON file.");
    }

    fr.readAsText(files.item(0));
};

document.getElementById("newChallenge").onclick = function() {
    let newChallenge = new Challenge(true);
    challengeObjectArray.push(newChallenge);
    newChallenge.generateChallenge();
}

document.getElementById("generateJSON").onclick = function() {
    // Create an empty JSON object containing a challenges array
    let storageObject = new Object();
    storageObject.challenges = [];
    challengeObjectArray.forEach((challenge) => {
        // Update every single attribute of the challenge with their values from the GUI
        allKeyFields = document.querySelectorAll("#"+challenge.id+" > li > ul > li > div > input");
        allKeyFields.forEach((keyField) => {
            switch(keyField.classList[0]) {
                case "text":
                    challenge[keyField.id] = keyField.value;
                    break;
                case "stringArray":
                    if (keyField.value == "") {
                        challenge[keyField.id] = [];
                    }
                    else {
                        challenge[keyField.id] = keyField.value.split(",");
                    }
                    break;
                case "boolean":
                    if(keyField.checked == true){
                        challenge[keyField.id] = true;
                    } else {
                        challenge[keyField.id] = false;
                    }
                    break;
                case "number":
                    if (floatKeys.includes(keyField.id)){
                        challenge[keyField.id] = parseFloat(keyField.value);
                    } 
                    else {
                        challenge[keyField.id] = parseInt(keyField.value);
                    }
                    break;
                default:
                    return;
            }
        });
        // Check against internal challenge class which values are changed vs default
        let editedKeyfields = challenge.compareKeyfields(defaultChallengeSettings);
        
        // create new object for each challenge, add keyfields that changed
        let storageChallengeObject = new Object();
        editedKeyfields.forEach((item) => {
            storageChallengeObject[item] = challenge[item];
        });
        // Add dummy challenge object into dummy storage object challenges array
        storageObject["challenges"].push(storageChallengeObject);
    });
    let file = document.getElementById("selectFiles").files[0];
    downloadObject(storageObject, file.name);
}

// thanks, stackoverflow 12597364
function downloadObject(obj, filename){
    var blob = new Blob([JSON.stringify(obj, null, 2)], {type: "application/json;charset=utf-8"});
    var url = URL.createObjectURL(blob);
    var elem = document.createElement("a");
    elem.href = url;
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }


