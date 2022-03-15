const playerAttackValue = 10;
const strongAttackValue = playerAttackValue * 1.5;
const monsterAttackValue = 14;
const healValue = 20;

const eneteredValue = prompt('Set health Value');

let chosenMaxLife = parseInt(eneteredValue);
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 1000;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = false;

//Set health
adjustHealthBars(chosenMaxLife);
function reset() {
    currentPlayerHealth = chosenMaxLife;
    currentMonsterHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const monsterDamage = dealPlayerDamage(monsterAttackValue);
    currentPlayerHealth -= monsterDamage;
    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('your bonus life had saved you');
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You win');
        reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lose');
        reset();
    }
}

function attackMonster(type) {
    let maxDamage;
    if (type === 'ATTACK') {
        maxDamage = playerAttackValue;
    } else if (type === 'STRONG_ATTACK') {
        maxDamage = strongAttackValue;
    }
    const playerDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= playerDamage;
    endRound();
}

function attackHandler() {
    healPotion = 0;
    attackMonster('ATTACK');
}
function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
}

function healHandler() {
    let setLife;
    if (currentPlayerHealth >= chosenMaxLife - healValue) {
        setLife = chosenMaxLife - currentPlayerHealth;
    } else {
        setLife = healValue;
    }
    increasePlayerHealth(setLife);
    currentPlayerHealth += setLife;
    endRound();
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
