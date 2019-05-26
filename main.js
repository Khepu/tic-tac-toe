
let state = [[0, 0, 0],
             [0, 0, 0],
             [0, 0, 0]];

const player1 = 1;
const player2 = 2;

const clone = arr => arr.slice(0);

const legalMoves = (state, player) => {
    let states = [];
      for(let i = 0; i < 3; i++){
          for(let k = 0; k < 3; k++){
              if (state[i][k] == 0){
                  const cloned = clone(state);
                  clone[i][k] = player;
                  states.push(clone);
              }
          }
      }
    return states;
};

