// LOAD HEADER + FOOTER
async function loadComponent(id, file){
  let res = await fetch(file);
  let data = await res.text();
  document.getElementById(id).innerHTML = data;
}

loadComponent("header","components/header.html");
loadComponent("footer","components/footer.html");

// SCROLL ANIMATION
let fades = document.querySelectorAll(".fade");

window.addEventListener("scroll", ()=>{
  fades.forEach(el=>{
    let top = el.getBoundingClientRect().top;
    if(top < window.innerHeight - 50){
      el.classList.add("show");
    }
  });
});

// LOAD GALLERY
fetch("data/artworks.json")
.then(res=>res.json())
.then(data=>{
  let gallery = document.getElementById("gallery");
  if(!gallery) return;

  data.forEach(item=>{
    let div = document.createElement("div");
    div.className="art fade";

    let img = document.createElement("img");
    img.src = item.image;
    img.loading = "lazy";

    img.onclick = ()=> openModal(item.image);

    div.appendChild(img);
    gallery.appendChild(div);
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
