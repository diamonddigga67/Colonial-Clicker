let colonials = 0;
let cps = 0;

const colonialImg = document.getElementById("colonial-img");

/* CLICK HANDLER WITH FLOATING +1 */
colonialImg.onclick = (event) => {
    colonials++;
    updateDisplay();
    spawnFloat(event);
};

/* FLOATING +1 EFFECT */
function spawnFloat(event) {
    const container = document.getElementById("float-container");
    const float = document.createElement("div");
    float.className = "float";
    float.innerText = "+1";

    const rect = colonialImg.getBoundingClientRect();
    float.style.left = (event.clientX - rect.left) + "px";
    float.style.top = (event.clientY - rect.top) + "px";

    container.appendChild(float);
    setTimeout(() => float.remove(), 1000);
}

/* DISPLAY UPDATE */
function updateDisplay() {
    document.getElementById("counter").innerText = `Colonials: ${colonials}`;
    document.getElementById("cps-counter").innerText = `CPS: ${cps}`;
}

/* EVOLUTION BUILDINGS */
const buildings = [
    {
        id: "gravital",
        name: "Gravital Adaptation",
        baseCost: 50,
        cost: 50,
        cps: 1,
        owned: 0,
        description: "Colonials adapt to crushing gravity."
    },
    {
        id: "worm",
        name: "Worm Child Divergence",
        baseCost: 200,
        cost: 200,
        cps: 5,
        owned: 0,
        description: "A lineage collapses into burrowing specialists."
    },
    {
        id: "snake",
        name: "Snake People Evolution",
        baseCost: 1000,
        cost: 1000,
        cps: 20,
        owned: 0,
        description: "A serpentine future takes shape."
    },
    {
        id: "q",
        name: "Q Interference",
        baseCost: 5000,
        cost: 5000,
        cps: 100,
        owned: 0,
        description: "A godlike species reshapes your destiny."
    }
];

/* COOKIE-CLICKER STYLE BOOST UPGRADES */
const boosts = [
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
    {
        id: "worm10",
        building: "worm",
        required: 10,
        multiplier: 2,
        cost: 2500,
        name: "Burrowing Instincts",
        bought: false
    }
];

/* RENDER BUILDINGS */
function renderBuildings() {
    const container = document.getElementById("buildings");
    container.innerHTML = "";

    buildings.forEach((b, index) => {
        const div = document.createElement("div");
        div.className = "upgrade";
        div.innerHTML = `
            <h3>${b.name}</h3>
            <p>${b.description}</p>
            <p>Owned: ${b.owned}</p>
            <p>Cost: ${b.cost}</p>
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

        // Add CPS
        cps += b.cps;

        // Price increases by 20%
        b.cost = Math.floor(b.baseCost * Math.pow(1.2, b.owned));

        updateDisplay();
        renderBuildings();
        renderBoosts();
    }
}

/* RENDER BOOST UPGRADES */
function renderBoosts() {
    const container = document.getElementById("boosts");
    container.innerHTML = "";

    boosts.forEach((u) => {
        const building = buildings.find(b => b.id === u.building);

        if (!u.bought && building.owned >= u.required) {
            const div = document.createElement("div");
            div.className = "boost";
            div.innerHTML = `
                <h3>${u.name}</h3>
                <p>Boosts ${building.name}</p>
                <p>Cost: ${u.cost}</p>
                <button onclick="buyBoost('${u.id}')">Buy Upgrade</button>
            `;
            container.appendChild(div);
        }
    });
}

/* BUY BOOST */
function buyBoost(id) {
    const u = boosts.find(x => x.id === id);
    const building = buildings.find(b => b.id === u.building);

    if (colonials >= u.cost) {
        colonials -= u.cost;
        u.bought = true;

        // Multiply CPS of that building
        building.cps *= u.multiplier;

        // Recalculate total CPS
        cps = 0;
        buildings.forEach(b => cps += b.cps * b.owned);

        updateDisplay();
        renderBoosts();
        renderBuildings();
    }
}

/* AUTO-GENERATE COLONIALS */
setInterval(() => {
    colonials += cps;
    updateDisplay();
}, 1000);

renderBuildings();
renderBoosts();
