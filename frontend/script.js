const abilitiesMod = {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0
};

skills = [{name:"Acrobatics", ability: "dex"}, {name:"Appraise", ability: "int"}, {name:"Bluff", ability: "cha"}, {name:"Climb", ability: "str"}, 
    {name:"Craft", ability: "int"}, {name:"Diplomacy", ability: "cha"}, {name:"Disable Device", ability: "dex"}, {name:"Disguise", ability: "cha"}, 
    {name:"Escape Artist", ability: "dex"}, {name:"Fly", ability: "dex"}, {name:"Handle Animal", ability: "wis"}, {name:"Heal", ability: "wis"}, 
    {name:"Intimidate", ability: "cha"}, {name:"Knowledge Arcana", ability: "int"}, {name:"Knowledge Dungeoneering", ability: "int"}, 
    {name:"Knowledge Engineering", ability: "int"}, {name:"Knowledge Geography", ability: "int"}, {name:"Knowledge History", ability: "int"}, 
    {name:"Knowledge Local", ability: "int"}, {name:"Knowledge Nature", ability: "int"}, {name:"Knowledge Nobility", ability: "int"}, 
    {name:"Knowledge Planes", ability: "int"}, {name:"Knowledge Religion", ability: "int"}, {name:"Linguistics", ability: "wis"}, 
    {name:"Perception", ability: "wis"}, {name:"Perform", ability: "cha"}, {name:"Profession", ability: "wis"}, {name:"Ride", ability: "dex"}, 
    {name:"Sense Motive", ability: "wis"}, {name:"Sleight of Hand", ability: "dex"}, {name:"Spellcraft", ability: "int"}, 
    {name:"Stealth", ability: "dex"}, {name:"Survival", ability: "wis"}, {name:"Swim", ability: "str"}, {name:"Use Magic Device", ability: "cha"}];

skilllist = [];

function updateAbilityModifiers() {
    document.querySelectorAll('[data-ability]').forEach(el => {
        const score = parseInt(el.value);
        const mod = Math.floor((score - 10) / 2);
        const sign = mod >= 0 ? '+' : '';

        abilitiesMod[el.dataset.ability] = mod;
        el.nextElementSibling.textContent = `(${sign}${mod})`;
    });
    renderSkills();
}

function renderSkills() {
    let skills_container = document.getElementById('skills-container');
    skills_container.innerHTML = '';
    for (let skill of skilllist) {
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<p class="label">${skill.name} </p><p class="value">${skill.getModifier() + " " + skill.ability}</p>
            <p class="value">${"Ranks: " + skill.ranks}</p>
            <p class="value">${"Misc: " + skill.misc}</p>`;
        skills_container.appendChild(card);
    }
}

updateAbilityModifiers();

document.querySelectorAll('[data-ability]').forEach(el => {
    el.addEventListener('change',updateAbilityModifiers);
});

const input = document.querySelector('#current-hp-input');
input.addEventListener('change', function(e) {
    const currentHp = e.target.value;
});

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
    
    this.classList.add('active');
    document.getElementById(this.dataset.tab).style.display = 'block';
    });
});

class Skill {
    constructor(name, ability, class_skill, ranks, misc) {
        this.name = name;
        this.ability = ability;
        this.class_skill = class_skill;
        this.ranks = ranks;
        this.misc = misc;
    }

    getModifier() {
        const classBonus = (this.class_skill && this.ranks > 0) ? 3 : 0;
        return abilitiesMod[this.ability] + classBonus + this.ranks + this.misc;
    }
}


for (let {name, ability} of skills) {
    skilllist.push(new Skill(name, ability, true, 1, 0));
}

renderSkills();

spelllist = [];

async function fetchSpells() {
    const response = await fetch('http://127.0.0.1:8000/spells');
    const data = await response.json();
    spelllist = data;
    renderSpells();
}

function renderSpells() {
    console.log('render spells called', spelllist);
    let spells_container = document.getElementById('spells-container');
    spells_container.innerHTML = '';
    for (let spell of spelllist) {
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<p class="label">${spell.name} </p><p class="value">${"Level: " + spell.level}</p>
            <p class="value">${"Description: " + spell.description}</p>`;
        spells_container.appendChild(card);
    }
}

fetchSpells();