let state = [0, 0, 0,
             0, 0, 0,
             0, 0, 0];

let history = [state];

const player1 = 1;
const player2 = 2;

const clone = arr => arr.slice(0);
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

const start = state => {
    const players = [player1, player2];
    let isOver = checkState(state);
    let end = false;

    while(!end) {
        let turn = Math.random() < 0.5 ? 0 : 1;

        while(isOver == -1) {
            turn = turn ^ 1;
            const player = players[turn];

            if (player == 2) {
                state = easyBot(state);
            } else if (player == 1) {
                state = legalMoves(state, player1)
                    .map(s => [evaluate(s), s])
                    .reduce((acc, val) => acc[0] > val[0] ? acc : val);
            }

            history.push(state);
            isOver = checkState(state);
        }

        train(history, isOver);

    }
};
