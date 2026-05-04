// LOAD COMPONENTS
async function loadComponent(id, file){
  let res = await fetch(file);
  let data = await res.text();
  document.getElementById(id).innerHTML = data;
}

loadComponent("header","components/header.html");
loadComponent("footer","components/footer.html");


// SCROLL ANIMATION
function reveal(){
  let elements = document.querySelectorAll(".fade");

  elements.forEach(el=>{
    let top = el.getBoundingClientRect().top;
    if(top < window.innerHeight - 50){
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


// LOAD GALLERY (ONLY ON GALLERY PAGE)
fetch("data/artworks.json")
.then(res => res.json())
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
  let modalImg = document.getElementById("modal-img");

  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal(){
  document.getElementById("modal").style.display = "none";
}
