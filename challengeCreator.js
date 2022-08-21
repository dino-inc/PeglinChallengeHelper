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
        const blankArrayKeys = ["blacklistOrbs", "whitelistOrbs", "blacklistRelics", "whitelistRelics", "blacklistScenarios", "whitelistScenarios", "blacklistBattles", "whitelistBattles", "blacklistEliteBattles", "whitelistEliteBattles", "startingRelics", "requiredMods", "requiredChallenges"];
        blankArrayKeys.forEach((item) => {
            this[item] = null;
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

        // Create keyfield categories
        const categorySort = ["Required", "Prerequisites", "Blacklists", "Whitelists", "Start Modifiers", "Special", "Rewards", "Uncategorized"];
        const categoryMap = [["id", "name", "description", "author"], 
        ["requiredMods", "requiredChallenges"], 
        ["blacklistOrbs",  "blacklistRelics",  "blacklistScenarios",  "blacklistBattles",  "blacklistEliteBattles"], 
        ["whitelistOrbs", "whitelistRelics", "whitelistScenarios", "whitelistBattles", "whitelistEliteBattles"],
        ["startingOrbs", "startingRelics", "startingAct", "startingRefreshes", "startingCrits", "skipStartingRelic", "maxHealth", "enemyHealthMultiplier"], 
        ["permanentDamage", "immuneScenarioDamage", "riggedBombSelfDamage", "predictionBounces", "battleToEliteConversionChance", "enrageThreshold","enrageAmount", "allowCruciball"], 
        ["preventNewOrbs", "preventOrbUpgrades", "preventPegMinigame"],];

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

    }

    // Returns the input field created
    addButton(container, customValue, type, name){
        let newKeyFieldInput = null;
        switch(type) {
            case "string":
                newKeyFieldInput = document.createElement("input");
                newKeyFieldInput.type = "text";
                newKeyFieldInput.value = customValue;
                break;
            case "object":
                newKeyFieldInput = document.createElement("input");
                newKeyFieldInput.type = "text";
                newKeyFieldInput.value = customValue;
                break;
            case "boolean":
                newKeyFieldInput = document.createElement("input");
                newKeyFieldInput.type = "checkbox";
                newKeyFieldInput.checked = customValue;
                break;
            case "number":
                newKeyFieldInput = document.createElement("input");
                newKeyFieldInput.type = "number";
                newKeyFieldInput.value = customValue;
                break;
            default:
                return;
        }
        let inputField = document.createElement("div");
        let nameField = document.createElement("span");
        newKeyFieldInput.id = name;
        nameField.innerHTML = name;
        inputField.appendChild(nameField);
        inputField.appendChild(newKeyFieldInput);
        container.appendChild(inputField);
        return inputField;
    }
    // Returns the keys that are different from the default
    compareKeyfields(challenge){
        let keyDiff = [];
        Object.keys(this).forEach((keyField) => {
            /*console.log(keyField +"\n"+challenge[keyField]+ " vs " +this[keyField]);*/
            if (!(keyField in challenge)){
                keyDiff.push(keyField);
            } else {
                if(challenge[keyField] != this[keyField]) {
                    keyDiff.push(keyField);
                }
            }
        });
        return keyDiff;
    }
}
let defaultChallengeSettings = new Challenge();
let challengeObjectArray = [];

// This function"s fundamentals from stackoverflow #36127648
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
    const arrayInputs = ["requiredMods", "requiredChallenges", "blacklistOrbs",  "blacklistRelics",  "blacklistScenarios",  "blacklistBattles",  "blacklistEliteBattles", "whitelistOrbs", "whitelistRelics", "whitelistScenarios", "whitelistBattles", "whitelistEliteBattles", "startingOrbs", "startingRelics"] 
    challengeObjectArray.forEach((challenge) => {
        // Update every single attribute of the challenge with their values from the GUI
        allKeyFields = document.querySelectorAll("#"+challenge.id+" > li > ul > li > div > input");
        allKeyFields.forEach((keyField) => {
            switch(keyField.type) {
                case "text":
                    if (keyField.id in arrayInputs){
                        let split = keyField.value.split(",");
                        if (split == []){
                            challenge[keyField.id] = null;
                        }
                    } else {
                        challenge[keyField.id] = keyField.value;
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
                    challenge[keyField.id] = parseInt(keyField.value);
                    break;
                default:
                    return;
            }
        });

        // Check against internal challenge class which values are changed vs default
        let editedKeyfields = challenge.compareKeyfields(defaultChallengeSettings);
        console.log(editedKeyfields);
        // TODO: bake to JSON every value that changed

    });
}