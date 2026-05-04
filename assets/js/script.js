// LOAD COMPONENTS
async function loadComponent(id, file){
  let res = await fetch(file);
  let data = await res.text();
  document.getElementById(id).innerHTML = data;
}

loadComponent("header","components/header.html");
loadComponent("footer","components/footer.html");


// HEADER SCROLL EFFECT
window.addEventListener("scroll", ()=>{
  let header = document.querySelector(".header");
  if(window.scrollY > 50){
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


// SCROLL REVEAL (SMOOTHER)
function reveal(){
  document.querySelectorAll(".fade").forEach(el=>{
    let top = el.getBoundingClientRect().top;
    if(top < window.innerHeight - 100){
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


// GALLERY LOAD
fetch("data/artworks.json")
.then(res=>res.json())
.then(data=>{
  let gallery = document.getElementById("gallery");
  if(!gallery) return;

  data.forEach(item=>{
    let img = document.createElement("img");
    img.src = item.image;
    img.loading = "lazy";

    img.onclick = ()=>openModal(item.image);

    gallery.appendChild(img);
  });
});


// MODAL
function openModal(src){
  let modal = document.getElementById("modal");
  let img = document.getElementById("modal-img");

  modal.style.display="flex";
  img.src = src;
}

function closeModal(){
  document.getElementById("modal").style.display="none";
}


// OPTIONAL CURSOR GLOW
let cursor = document.createElement("div");
cursor.style.position="fixed";
cursor.style.width="20px";
cursor.style.height="20px";
cursor.style.borderRadius="50%";
cursor.style.background="rgba(255,255,255,0.2)";
cursor.style.pointerEvents="none";
cursor.style.zIndex="9999";

document.body.appendChild(cursor);

document.addEventListener("mousemove", e=>{
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
