const id = document.getElementById;
const x = "./img/x.jpg";
const o = "./img/o.jpg";
const white = "./img/white.jpg";
const images = [white, o, x];
//img.src = "./img/x.jpg";

/*
JS code:
    var img = document.createElement("img");
    img.src = "image.png";
    var src = document.getElementById("x");
    src.appendChild(img);
*/


//x.appendChild(img);
function img(path) {
  const img = document.createElement('img');
  img.src = path;
  return img;
}


function graphics(state) {

  let i;
  for (i = 0; i < state.length; i++) {

    id(i+"").childNodes[0].src = images[state[i]];

  }

}