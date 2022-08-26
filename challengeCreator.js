// Create constant reference arrays
// Yes, they"re hardcoded... TODO: offload to local dir JSON?

// Value that should be initialized to a blank array 
const blankArrayKeys = ["blacklistOrbs", "whitelistOrbs", "blacklistRelics", "whitelistRelics", "blacklistScenarios", "whitelistScenarios", "blacklistBattles", "whitelistBattles", "blacklistEliteBattles", "whitelistEliteBattles", "startingRelics", "requiredMods", "requiredChallenges", "startingOrbs"];
const textChoices = ["requiredMods", "requiredChallenges"];
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
    "allowCruciball": "Boolean. Allows the player to continue the challenge with cruciball levels. Cruciball Levels are challenge dependant. CURRENTLY NOT IMPLEMENTED"
};

// Forest Battles
const forestBattles = ["EntryEncounter", "Bats1", "SlimeEncounter2", "SlimeEncounterRandomMap", "PlantEncounter1", "MuchoSlimeEncounter_Easy", "ForestSpiderEasy", "StumpEncounterEasy", "Bats2", "ForestKitchenSink", "MuchoSlimeEncounter", "SlimeEncounter4", "PlantsEncounter2", "ONLYBATS", "ForestSpiderBattleData", "StumpPlantEncounter", "StumpMix"];
const forestEliteBattles = ["SlimeMiniBossEncounter_HARD", "PlantMiniboss", "MinotaurBossEncounter"];
const forestScenarios = ["BrambleTree", "SunnyClearing", "Thunderstorm", "MysteriousAltarOffer", "SlimyPathMapData", "CrowClearing", "Inferno", "HaglinScouting", "WaterfallMapData", "OrbeliskMapData", "MirrorDuplicate", "MirrorRemove", "Gambler", "PeglinEchoScenarioMapData", "HealingTreeScenario", "DuplicationAltar"];

// Castle Battles
const castleBattles = ["ShieldEncounter_Easy", "MatchingKnights_Easy", "TeleportOnly_Easy", "BrickSlimeEasyBattle", "AllKnightsMapLayoutEasy", "ShieldAtcherMapData_Easy", "JustMirrorEasy", "RotatingShieldEncounterEasy", "ShieldAndKnight", "ShieldTeleport", "BrickSlimeNormalBattle", "ShieldArcherHealBattle", "ShieldClerics", "MirrorPlantBattle", "LightningRodArcherBattle"];
const castleEliteBattles = ["KnightMiniBoss", "DemonWallMinibossMapData", "ShieldMageMinibossMapData"];
const castleScenarios = ["PeglinChef", "MysteriousAltarOffer", "HaglinScouting", "OldBrickSlime", "AggressiveBrickSlimes", "VampireScenarioMapData", "MirrorDuplicate", "MirrorRemove", "ScaryHaglin", "OrbeliskMapData", "Gambler"];

// Mine Battles
const mineBattles = ["MinesMirrorSoloEasy", "MinesEldritchEasyEncounter1", "MinesMirrorAndRanged", "MinesEldritchEncounter1", "MinesSapperGoblinEncounter", "MinesSpiderBattle", "MinesLightningSapperBattleData", "MinesRangedSapperBattle"];
const mineEliteBattles = ["TurnedManMapData", "MinesInvisibleManMiniboss", "SlenderlinMinibossMapData"];
const mineScenarios =  ["Inferno", "MysteriousAltarOffer", "HaglinScouting", "VampireScenarioMapData", "MirrorDuplicate", "MirrorRemove", "ScaryHaglin", "WaterfallMapData", "OrbeliskMapData", "ForestPortalMapData", "MirrorTunnel", "Gambler", "SecretTunnelMapData", "PeglinEchoScenarioMapData", "DuplicationAltar", "MinecartMapData"];

// Orbs mapped to internal names
const orbMap = {"AllOrbNothing": "all_orb_nothing", "BlindOrb": "blind", "Bomborb": "bomborb", "Bramble": "bramble", "Bouldorb": "boulder", "Bufforb": "buff", "Concentrication": "special_pegs_orb", "Critiball": "critiball", "Daggorb": "dagger", "Debufforb": "debuff", "Doctorb": "heal_orb", "EchoOrb": "echo_orb", "Egg": "egg", "Etherwheel": "refresh_on_exit", "Extraorbinary": "extra_orbinary", "Fireball": "fireball", "GhostOrb": "ghost", "IceBall": "icicle", "JackOrbLantern": "portal", "LightningBall": "lightning", "Memorb": "memorb", "Mirrob": "mirror", "Morbidorb": "morbid", "Necorbmancer": "necorb", "Ohmyogrb": "destroy_peg_orb", "Orbelisk": "orbelisk", "Orbsium": "dense_orb", "Orboros": "orberos", "Refreshorb": "refreshorb", "Rubborb": "rubber", "ShuffleOrb": "shuffle", "Sphear": "sphear", "Splatorb": "splatorb", "StoneOrb": "stone", "Sworb": "sworb", "VampireOrb": "vampire_orb"};

// Relics mapped to internal names
const relicMap = {"Alchemist's Cookbook": "PEG_TO_BOMB", "Ambidextionary": "ADDITIONAL_DISCARD", "Ambiguous Amulet": "WALL_BOUNCES_COUNT", "An Apple A Day": "MAX_HEALTH_SMALL", "Bad Cheese": "DAMAGE_ENEMIES_ON_RELOAD", "Basic Blade": "NON_CRIT_BONUS_DMG", "Betsy's Hedge": "HEDGE_BETS", "Bomb Baton": "ADDITIONAL_STARTING_BOMBS", "Bombulet": "DOUBLE_BOMBS_ON_MAP", "Complex Claw": "CRIT_BONUS_DMG", "Consuming Chalice": "REDUCE_REFRESH", "Cookie": "HEAL_ON_REFRESH_POTION", "Critsomallos Fleece": "CRITS_STACK", "Cursed Mask": "CONFUSION_RELIC", "Decoy Orb": "FREE_RELOAD", "Dumb Bell": "STR_ON_RELOAD", "Echo Chamber": "ALL_ATTACKS_ECHO", "Electropegnet": "PEG_MAGNET", "Enhanced Gunpowder": "BOMB_SPLASH", "Eye of Turtle": "ADDITIONAL_ORB_RELIC_OPTIONS", "Fresh Bandana": "ADDITIONAL_REFRESH1", "Gardener's Gloves": "DAMAGE_BONUS_PLANT_FLAT", "Gift That Keeps Giving": "UNPOPPABLE_PEGS", "Glorious SuffeRing": "ALL_ORBS_BUFF", "Grabby Hand": "FLYING_HORIZONTAL_PIERCE", "Haglin's Satchel": "ADD_ORBS_AND_UPGRADE", "Heavy Shaft Potion": "CRIT_ALSO_REFRESH", "Hero's Backpack": "ADJACENCY_BONUS", "Improved Catalyst": "ADDITIONAL_BOMB_DAMAGE", "Inconspicuous Ring": "BOUNCERS_COUNT", "Infernal Ingot": "LIFESTEAL_PEG_HITS", "Intentional Oboe": "REDUCE_LOST_HEALTH", "Kinetic Meteorite": "BOMB_FORCE_ALWAYS", "Knife's Edge": "LOW_HEALTH_GUARANTEED_CRIT", "Light Shaft Potion": "REFRESH_ALSO_CRIT", "Lucky Penny": "ADDITIONAL_CRIT2", "Matryoshka Shell": "MATRYOSHKA"};


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
        this.startingOrbs = ["StoneOrb-Lvl1","StoneOrb-Lvl1","StoneOrb-Lvl1","Daggorb-Lvl1"];
        this.startingAct = 1;
        this.startingRefreshes = 2;
        this.startingCrits = 2;
        this.maxHealth = 100;
        this.enemyHealthMultiplier = 1.0;
        this.riggedBombSelfDamage = 4;
        this.predictionBounces = 1;
        this.battleToEliteConversionChance = 0.0;
        this.enrageThreshold = 0;
        this.enrageAmount = 0;
        this.choiceObjectMap = new Object();
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
                if(textChoices.includes(name)){
                    newKeyFieldInput = document.createElement("input");
                    newKeyFieldInput.type = "text";
                    newKeyFieldInput.classList.add("string");
                }
                else {
                    newKeyFieldInput = document.createElement("select");
                    newKeyFieldInput.multiple = true;
                    newKeyFieldInput.classList.add("stringArray");
                }
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
        this.choiceObject = this.convertToChoices(name, newKeyFieldInput);
        return inputField;
    }
    // Convert any of the  necessary fields to the choices object
    convertToChoices(name, element){
        let choices1 = null;
        if (blankArrayKeys.includes(name)) {
            choices1 = new Choices(element, {
                allowHTML: true,
                removeItems: true,
                removeItemButton: true,
                shouldSort: false,
                itemSelectText: "Select"
            });
            // Store the Choices object for the name inside the challenge object
            this.choiceObjectMap[name] = choices1;
            switch(name){
                // Add the predetermined battle/relic/orb inputs to the choice fields
                case "blacklistBattles": case "whitelistBattles":
                    const battleCats = [[forestBattles, "Forest Battles"], [castleBattles, "Castle Battles"], [mineBattles, "Mine Battles"]];
                    battleCats.forEach((item) => {
                        this.addChoiceCategory(name, item[0], item[1]);
                    });
                    break;
                case "blacklistEliteBattles": case "whitelistEliteBattles":
                    const eliteBattleCats = [[forestEliteBattles, "Forest Elite Battles"], [castleEliteBattles, "Castle Elite Battles"], [mineEliteBattles, "Mine Elite Battles"]];
                    eliteBattleCats.forEach((item) => {
                        this.addChoiceCategory(name, item[0], item[1]);
                    });
                    break;
                case "blacklistOrbs": case "whitelistOrbs": case "startingOrbs":
                    this.addChoiceOptionsFromObject(name, orbMap);
                    break;
                case "blacklistRelics": case "whitelistRelics": case "startingRelics":
                    this.addChoiceOptionsFromObject(name, relicMap);
                    break;
                case "blacklistScenarios": case "whitelistScenarios":
                    const scenariosCat = [[forestScenarios, "Forest Scenarios"], [castleScenarios, "Castle Scenarios"], [mineScenarios, "Mine Scenarios"]];
                    scenariosCat.forEach((item) => {
                        this.addChoiceCategory(name, item[0], item[1]);
                    });
                    break;
            };
        }
        return choices1;
    }
    
    // Add choices to a keyfield from the array passed in
    addChoiceCategory(name, battleList, catName) {
        // select choice object being manipulated
        let input = this.choiceObjectMap[name];
        let tempChoiceArray = []
        battleList.forEach((item) => {
            tempChoiceArray.push({value: item, label: item});
        });
        
        input.setChoices([{label: catName,
            id: categoryID++,
            disabled: false,
            choices: tempChoiceArray,
        }], "value", 'label', false);
    }

    // Add choices to a keyfield from the passed object's keys
    addChoiceOptionsFromObject(name, mapObject) {
        let mapObjectKeys = Object.keys(mapObject);
        let input = this.choiceObjectMap[name];
        let tempChoiceArray = [];
        mapObjectKeys.forEach((item) => {
            let internalNameIndex = Object.keys(mapObject).indexOf(item);
            tempChoiceArray.push({value: Object.keys(mapObject)[internalNameIndex], label: item});
        });
        input.setChoices(tempChoiceArray, "value", 'label', false);
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
let categoryID = 0;

// This function"s basic structure from stackoverflow 36127648
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
        // TODO support arbitrary objects
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
    if (file != undefined){
        downloadObject(storageObject, file.name);
    }
    else {
        newFileName = prompt("File name?");
        downloadObject(storageObject, newFileName);
    }
 
}

// thanks, stackoverflow 12597364
function downloadObject(obj, filename){
    if(filename == ""){
        filename = "newChallenge";
    }
    var blob = new Blob([JSON.stringify(obj, null, 2)], {type: "application/json;charset=utf-8"});
    var url = URL.createObjectURL(blob);
    var elem = document.createElement("a");
    elem.href = url;
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }


