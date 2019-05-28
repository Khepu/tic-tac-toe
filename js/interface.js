const id = x => document.getElementById(x+"");
const x = "./img/x.jpg";
const o = "./img/o.jpg";
const white = "./img/white.jpg";
const images = [white, o, x];

function graphics(state) {
    state.map((s, i) => id(i).childNodes[0].src = images[s]);
}
