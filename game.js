let colonials = 0;

const colonialImg = document.getElementById("colonial-img");

/* GLOBAL MULTIPLIERS / STATE */
let eventMultiplier = 1;          // Planet-Eaters burst
let imperialBonusMultiplier = 1;  // Imperial Serpents
let wormBranchMultiplier = 1;     // Subterranean Empires

/* CLICK HANDLER WITH SPECIAL ABILITIES */
colonialImg.onclick = (event) => {
    let gain = 1;

    // Quantum Pilgrims: 10% chance for 10x click
    const quantum = getBuilding("quantum");
    if (quantum && quantum.owned > 0) {
        if (Math.random() < 0.10) {
            gain *= 10;
        }
    }

    // Psionic Ophidians: extra CPS-based click gain
    const psionic = getBuilding("psionic");
    if (psionic && psionic.owned > 0) {
        gain += Math.floor(getTotalCps() * 0.5);
    }

    colonials += gain;
    updateDisplay();
    spawnFloat(event, gain);
};

/* FLOATING TEXT */
function spawnFloat(event, amount) {
    const container = document.getElementById("float-container");
    const float = document.createElement("div");
    float.className = "float";
    float.innerText = `+${amount}`;

    const rect = colonialImg.getBoundingClientRect();
    float.style.left = (event.clientX - rect.left) + "px";
    float.style.top = (event.clientY - rect.top) + "px";

    container.appendChild(float);
    setTimeout(() => float.remove(), 1000);
}

/* DISPLAY UPDATE */
function updateDisplay() {
    document.getElementById("counter").innerText = `Colonials: ${colonials}`;
    document.getElementById("cps-counter").innerText = `CPS: ${getTotalCps()}`;
}

/* BUILDINGS (EVOLUTIONS) */
const buildings = [
    // TIER 1
    {
        id: "gravital",
        name: "Gravital Adaptation",
        baseCost: 50,
        cost: 50,
        baseCps: 1,
        owned: 0,
        multiplier: 1,
        branch: "gravital",
        requiresId: null,
        requiresOwned: 0,
        description: "Colonials adapt to crushing gravity."
    },
    {
        id: "worm",
        name: "Worm Children",
        baseCost: 75,
        cost: 75,
        baseCps: 1,
        owned: 0,
        multiplier: 1,
        branch: "worm",
        requiresId: null,
        requiresOwned: 0,
        description: "Colonials devolve into burrowing specialists."
    },
    {
        id: "snake",
        name: "Snake People",
        baseCost: 100,
        cost: 100,
        baseCps: 2,
        owned: 0,
        multiplier: 1,
        branch: "snake",
        requiresId: null,
        requiresOwned: 0,
        description: "Colonials become serpentine posthumans."
    },

    // TIER 2
    {
        id: "ruin",
        name: "Ruin Haunters",
        baseCost: 400,
        cost: 400,
        baseCps: 8,
        owned: 0,
        multiplier: 1,
        branch: "gravital",
        requiresId: "gravital",
        requiresOwned: 1,
        description: "Gravital descendants haunting ruined megastructures."
    },
    {
        id: "blind",
        name: "Blind Folk",
        baseCost: 600,
        cost: 600,
        baseCps: 10,
        owned: 0,
        multiplier: 1,
        branch: "gravital",
        requiresId: "gravital",
        requiresOwned: 1,
        description: "Gravital lineages that abandon sight."
    },
    {
        id: "wormPat",
        name: "Worm Patriarchs",
        baseCost: 800,
        cost: 800,
        baseCps: 12,
        owned: 0,
        multiplier: 1,
        branch: "worm",
        requiresId: "worm",
        requiresOwned: 1,
        description: "Massive rulers of worm broods."
    },
    {
        id: "wormCity",
        name: "Worm Cities",
        baseCost: 1000,
        cost: 1000,
        baseCps: 15,
        owned: 0,
        multiplier: 1,
        branch: "worm",
        requiresId: "worm",
        requiresOwned: 1,
        description: "Burrowed megastructures of worm civilization."
    },
    {
        id: "coil",
        name: "Coil-Minds",
        baseCost: 1200,
        cost: 1200,
        baseCps: 18,
        owned: 0,
        multiplier: 1,
        branch: "snake",
        requiresId: "snake",
        requiresOwned: 1,
        description: "Serpents whose bodies are living neural nets."
    },
    {
        id: "serpentNoble",
        name: "Serpent Nobles",
        baseCost: 1500,
        cost: 1500,
        baseCps: 20,
        owned: 0,
        multiplier: 1,
        branch: "snake",
        requiresId: "snake",
        requiresOwned: 1,
        description: "Aristocratic ophidian dynasties."
    },

    // TIER 3
    {
        id: "starDwellers",
        name: "Star-Dwellers",
        baseCost: 8000,
        cost: 8000,
        baseCps: 80,
        owned: 0,
        multiplier: 1,
        branch: "gravital",
        requiresId: "ruin",
        requiresOwned: 1,
        description: "Ruin Haunters that ascend to the stars."
    },
    {
        id: "starBlind",
        name: "Star-Blind Navigators",
        baseCost: 10000,
        cost: 10000,
        baseCps: 90,
        owned: 0,
        multiplier: 1,
        branch: "gravital",
        requiresId: "blind",
        requiresOwned: 1,
        description: "Blind Folk guiding ships by gravity alone."
    },
    {
        id: "hiveKings",
        name: "Hive Kings",
        baseCost: 12000,
        cost: 12000,
        baseCps: 100,
        owned: 0,
        multiplier: 1,
        branch: "worm",
        requiresId: "wormPat",
        requiresOwned: 1,
        description: "Absolute rulers of worm hives."
    },
    {
        id: "burrowedMetros",
        name: "Burrowed Metropolises",
        baseCost: 14000,
        cost: 14000,
        baseCps: 110,
        owned: 0,
        multiplier: 1,
        branch: "worm",
        requiresId: "wormCity",
        requiresOwned: 1,
        description: "Planet-spanning underground cities."
    },
    {
        id: "neuroSerpents",
        name: "Neuro-Serpents",
        baseCost: 16000,
        cost: 16000,
        baseCps: 120,
        owned: 0,
        multiplier: 1,
        branch: "snake",
        requiresId: "coil",
        requiresOwned: 1,
        description: "Serpents optimized for pure cognition."
    },
    {
        id: "crownedOphidians",
        name: "Crowned Ophidians",
        baseCost: 18000,
        cost: 18000,
        baseCps: 130,
        owned: 0,
        multiplier: 1,
        branch: "snake",
        requiresId: "serpentNoble",
        requiresOwned: 1,
        description: "Imperial serpent dynasties."
    },

    // TIER 4 (SPECIAL ABILITIES)
    {
        id: "voidborne",
        name: "Voidborne Colonials",
        baseCost: 50000,
        cost: 50000,
        baseCps: 400,
        owned: 0,
        multiplier: 1,
        branch: "gravital",
        requiresId: "starDwellers",
        requiresOwned: 1,
        description: "Colonials adapted to the vacuum of space."
    },
    {
        id: "quantum",
        name: "Quantum Pilgrims",
        baseCost: 60000,
        cost: 60000,
        baseCps: 50,
        owned: 0,
        multiplier: 1,
        branch: "gravital",
        requiresId: "starBlind",
        requiresOwned: 1,
        description: "Pilgrims walking probability itself."
    },
    {
        id: "planetEaters",
        name: "Planet-Eaters",
        baseCost: 70000,
        cost: 70000,
        baseCps: 300,
        owned: 0,
        multiplier: 1,
        branch: "worm",
        requiresId: "hiveKings",
        requiresOwned: 1,
        description: "Worms that consume entire worlds."
    },
    {
        id: "subterranean",
        name: "Subterranean Empires",
        baseCost: 80000,
        cost: 80000,
        baseCps: 200,
        owned: 0,
        multiplier: 1,
        branch: "worm",
        requiresId: "burrowedMetros",
        requiresOwned: 1,
        description: "Empires spanning the deep crust."
    },
    {
        id: "psionic",
        name: "Psionic Ophidians",
        baseCost: 90000,
        cost: 90000,
        baseCps: 150,
        owned: 0,
        multiplier: 1,
        branch: "snake",
        requiresId: "neuroSerpents",
        requiresOwned: 1,
        description: "Serpents wielding raw thought as a weapon."
    },
    {
        id: "imperial",
        name: "Imperial Serpents",
        baseCost: 100000,
        cost: 100000,
        baseCps: 250,
        owned: 0,
        multiplier: 1,
        branch: "snake",
        requiresId: "crownedOphidians",
        requiresOwned: 1,
        description: "Serpents ruling entire star empires."
    }
];

/* COOKIE-CLICKER STYLE BOOSTS */
const boosts = [
    // Gravital line
    {
        id: "gravital10",
        building: "gravital",
        required: 10,
        multiplier: 2,
        cost: 500,
        name: "Reinforced Skeletons",
        bought: false
    },
    {
        id: "gravital25",
        building: "gravital",
        required: 25,
        multiplier: 2,
        cost: 2000,
        name: "Hyperdense Bone Matrix",
        bought: false
    },

    // Worm line
    {
        id: "worm10",
        building: "worm",
        required: 10,
        multiplier: 2,
        cost: 800,
        name: "Burrowing Instincts",
        bought: false
    },
    {
        id: "worm25",
        building: "worm",
        required: 25,
        multiplier: 2,
        cost: 2500,
        name: "Segmented Efficiency",
        bought: false
    },

    // Snake line
    {
        id: "snake10",
        building: "snake",
        required: 10,
        multiplier: 2,
        cost: 1000,
        name: "Coiled Reflexes",
        bought: false
    },
    {
        id: "snake25",
        building: "snake",
        required: 25,
        multiplier: 2,
        cost: 3000,
        name: "Serpentine Grace",
        bought: false
    }
];

/* HELPERS */
function getBuilding(id) {
    return buildings.find(b => b.id === id);
}

/* TOTAL CPS CALCULATION */
function getTotalCps() {
    let total = 0;

    // Worm branch multiplier from Subterranean Empires
    const subterranean = getBuilding("subterranean");
    wormBranchMultiplier = (subterranean && subterranean.owned > 0) ? 1.5 : 1;

    // Imperial Serpents global bonus
    const imperial = getBuilding("imperial");
    imperialBonusMultiplier = imperial ? (1 + 0.01 * imperial.owned) : 1;

    buildings.forEach(b => {
        if (b.owned > 0) {
            let branchMult = 1;
            if (b.branch === "worm") branchMult *= wormBranchMultiplier;
            const base = b.baseCps * b.multiplier * b.owned * branchMult;
            total += base;
        }
    });

    total = Math.floor(total * imperialBonusMultiplier * eventMultiplier);
    return total;
}

/* RENDER BUILDINGS */
function renderBuildings() {
    const container = document.getElementById("buildings");
    container.innerHTML = "";

    buildings.forEach((b, index) => {
        if (b.requiresId) {
            const req = getBuilding(b.requiresId);
            if (!req || req.owned < b.requiresOwned) return;
        }

        const div = document.createElement("div");
        div.className = "upgrade";
        div.innerHTML = `
            <h3>${b.name}</h3>
            <p>${b.description}</p>
            <p>Owned: ${b.owned}</p>
            <p>Cost: ${b.cost}</p>
            <p>CPS each: ${Math.floor(b.baseCps * b.multiplier)}</p>
            <button onclick="buyBuilding(${index})">Evolve</button>
        `;
        container.appendChild(div);
    });
}

/* BUY BUILDING */
function buyBuilding(i) {
    const b = buildings[i];

    if (colonials >= b.cost) {
        colonials -= b.cost;
        b.owned++;

        // Price increases by 20% each purchase
        b.cost = Math.floor(b.baseCost * Math.pow(1.2, b.owned));

        updateDisplay();
        renderBuildings();
        renderBoosts();
    }
}

/* RENDER BOOSTS */
function renderBoosts() {
    const container = document.getElementById("boosts");
    container.innerHTML = "";

    boosts.forEach(u => {
        if (u.bought) return;
        const building = getBuilding(u.building);
        if (!building || building.owned < u.required) return;

        const div = document.createElement("div");
        div.className = "boost";
        div.innerHTML = `
            <h3>${u.name}</h3>
            <p>Boosts ${building.name}</p>
            <p>Cost: ${u.cost}</p>
            <button onclick="buyBoost('${u.id}')">Buy Upgrade</button>
        `;
        container.appendChild(div);
    });
}

/* BUY BOOST */
function buyBoost(id) {
    const u = boosts.find(x => x.id === id);
    const building = getBuilding(u.building);

    if (colonials >= u.cost && !u.bought) {
        colonials -= u.cost;
        u.bought = true;

        building.multiplier *= u.multiplier;

        updateDisplay();
        renderBoosts();
        renderBuildings();
    }
}

/* SPECIAL ABILITIES TIMERS */

/* Voidborne Colonials: Gravity Well (every 10s, +5x CPS burst) */
setInterval(() => {
    const voidborne = getBuilding("voidborne");
    if (voidborne && voidborne.owned > 0) {
        colonials += getTotalCps() * 5;
        updateDisplay();
    }
}, 10000);

/* Planet-Eaters: Consumption Cycle (every 30s, CPS x2 for 10s) */
setInterval(() => {
    const planetEaters = getBuilding("planetEaters");
    if (planetEaters && planetEaters.owned > 0) {
        eventMultiplier = 2;
        setTimeout(() => {
            eventMultiplier = 1;
        }, 10000);
    }
}, 30000);

/* AUTO-GENERATE COLONIALS */
setInterval(() => {
    colonials += getTotalCps();
    updateDisplay();
}, 1000);

/* INITIAL RENDER */
renderBuildings();
renderBoosts();
updateDisplay();

