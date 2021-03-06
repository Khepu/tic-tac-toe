let state = [0, 0, 0,
             0, 0, 0,
             0, 0, 0];

let history = [state];

const player1 = 1;
const player2 = 2;

const identity = x => x;

const legalMoves = (state, player) =>
    state.map((spot, i) => spot == 0 ? i : -1)
      .filter(spot => spot != -1);

const updateState = (state, spot, player) =>
      state.map((s, i) => i == spot ? player : s);

const filterSpots = (state, player) =>
      state.map((s, i) => s == player ? i : -1)
      .filter(p => p > -1);

const containsp = spots => condition =>
      condition.map(c => spots.includes(c)).filter(identity).length == 3;

const checkState = state => {
    if (history.length < 6){
        return -1;
    }

    const player1spots = filterSpots(state, player1);
    const player2spots = filterSpots(state, player2);
    const emptySpots = filterSpots(state, 0);

    const conditions = [[0, 4, 8], [2, 4, 6],             //diagonals
                        [0, 1, 2], [3, 4, 5], [6, 7, 8],  //horizontals
                        [0, 3, 6], [1, 4, 7], [2, 5, 8]]; //verticals

    if (conditions.map(containsp(player1spots)).some(identity)) {
        return 1; // Nikise o prwtos paiktis (to nevroniko)
    } else if (conditions.map(containsp(player2spots)).some(identity)) {
        return 2; // Nikise o deuteros paiktis (to bot)
    } else if (emptySpots == 0) {
        return 0; // Isopalia
    }

    return -1; // Sunexeia game
};

// Gets all legal states, shuffles them and returns the first one
const easyBot = state =>
      legalMoves(state, player2).sort(() => 0.5 - Math.random())[0];

const hardBot = state => {
    const friendlyMoves = legalMoves(state, player2);
    const friendlyResults = friendlyMoves.map(m => [m, checkState(updateState(state, m, player2))]);
    const winningMoves = friendlyResults.filter(m => m[1] == player2);

    if (winningMoves.length > 0){
        return winningMoves[0][0];
    }

    const enemyMoves = legalMoves(state, player1);
    const enemyResults = enemyMoves.map(m => [m, checkState(updateState(state, m, player1))]);
    const losingMoves = enemyResults.filter(m => m[1] == player1);
    if (losingMoves.length > 0) {
        return losingMoves[0][0];
    }

   return friendlyMoves.sort(() => 0.5 - Math.random())[0];
};


const start = async games => {
    const players = [player1, player2];
    let isOver = checkState(state);
    let end = games;
    let aiwon = 0;

    while(end--) {
        let turn = Math.random() < 0.5 ? 0 : 1;
        const startingState = state;

        while(isOver == -1) {
            turn = turn ^ 1;
            const player = players[turn];

            if (player == 2) {
                state = updateState(state, hardBot(state), player2);
            } else if (player == 1) {
                state = legalMoves(state, player1)
                    .map(s => updateState(state, s, player1))
                    .map(s => [evaluate(s), s])
                    .reduce((acc, val) => acc[0] > val[0] ? acc : val, [0, 0])[1];
            }

            history.push(state);
            isOver = checkState(state);
        }
        if (isOver == 2){
            aiwon++;
        }
        state = startingState;
        await train(history, isOver);
        history = [state];
        isOver = -1;
        console.log("One more down!!!");
    }
    console.log(aiwon);
};

const initManual = () => {
    state = [0, 0, 0,
             0, 0, 0,
             0, 0, 0];

    history = [state];
    [...document.getElementsByTagName("img")]
        .map(img => img.onclick = play(img.id));
    graphics(state);
};

const printEnd = (result, player) =>
      console.log(result == player ? "Player " + player + " wins!" : "Draw!");


const play = pos => () =>{
    if(state[pos] != 0){
        return;
    }

    state = updateState(state, pos, player2);
    history.push(state);
    graphics(state);

    let check = checkState(state);
    if(check != -1){
        printEnd(check, player2);
        setTimeout(() => initManual(), 3000);
        return;
    }

    setTimeout(() => "", 1000);

    state = legalMoves(state, player1)
        .map(s => updateState(state, s, player1))
        .map(s => [evaluate(s), s])
        .reduce((acc, val) => acc[0] > val[0] ? acc : val, [0, 0])[1];
    history.push(state);
    graphics(state);

    check = checkState(state);
    if(check != -1){
        printEnd(check, player1);
        setTimeout(() => initManual(), 3000);
    }
};

