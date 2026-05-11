const intro = document.getElementById("intro-screen");
const startBtn = document.getElementById("startBtn");

const block = document.getElementById("block");
const info = document.getElementById("info");
const columns = document.querySelectorAll(".col");
const dropZone = document.getElementById("drop-zone");

const items = [
  {text:"Audio + subtítulos", type:"rep"},
  {text:"Texto simplificado", type:"rep"},
  {text:"Mapas visuales", type:"rep"},

  {text:"Responder en video", type:"acc"},
  {text:"Proyecto creativo", type:"acc"},
  {text:"Presentación oral", type:"acc"},

  {text:"Gamificación", type:"com"},
  {text:"Elección libre", type:"com"},
  {text:"Retos progresivos", type:"com"},

  {text:"Iconos y símbolos", type:"rep"},
  {text:"Escribir reflexiones", type:"acc"},
  {text:"Trabajo colaborativo", type:"com"},

  {text:"Infografías", type:"rep"},
  {text:"Portafolio digital", type:"acc"},
  {text:"Feedback inmediato", type:"com"}
];

let index = 0;
let y = 0;
let falling;
let hasLanded = false;

/* =========================
   INICIO (SIN DUPLICADOS)
========================= */
startBtn.addEventListener("click", () => {
  intro.classList.add("abrir");

  setTimeout(() => {
    intro.style.display = "none";
    spawn();
  }, 1200);
});

/* =========================
   SPAWN LIMPIO
========================= */
function spawn(){

  clearInterval(falling); // 🔥 IMPORTANTE (evita bug)

  hasLanded = false;

  if(index >= items.length){
    info.textContent = "SISTEMA RESTAURADO ✔";
    block.style.display = "none";
    return;
  }

  block.textContent = items[index].text;

  y = 0;
  block.style.top = "0px";

  const limit = dropZone.offsetHeight - 80;

  falling = setInterval(() => {

    y += 3; // 👈 más estable que 1.5
    block.style.top = y + "px";

    if(y > limit){

      clearInterval(falling);

      if(!hasLanded){
        loseGame();
      }

    }

  }, 20);
}

/* =========================
   CLICS
========================= */
columns.forEach(col=>{
  col.addEventListener("click",()=>{

    if(index >= items.length) return;

    hasLanded = true;

    const item = items[index];

    const div = document.createElement("div");
    div.classList.add("item");
    div.textContent = item.text;

    col.appendChild(div);

    info.textContent =
      col.dataset.type === item.type
      ? "✔ CORRECTO"
      : "✖ INCORRECTO";

    index++;
    spawn();
  });
});

/* =========================
   DERROTA
========================= */
function loseGame(){

  info.textContent = "❌ SISTEMA FALLIDO";

  block.style.boxShadow = "0 0 30px red";
  block.style.borderColor = "red";
  block.textContent = "ERROR";

  setTimeout(()=>{
    location.reload();
  },1500);
}