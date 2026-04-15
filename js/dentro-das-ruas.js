const modal = document.getElementById("modal");
const modalImg = document.getElementById("img-ampliada");
const imagens = document.querySelectorAll(".galeria_efeito");
const fechar = document.querySelector(".fechar");

imagens.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

fechar.onclick = () => {
  modal.style.display = "none";
};

// fechar clicando fora da imagem
modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};