document.addEventListener("DOMContentLoaded", () => {
  const heartShooter = document.getElementById("heart-shooter");
  const finalHeart = document.getElementById("final-heart");
  const message = document.getElementById("message");
  const startBtn = document.getElementById("start-btn");
  const loveSong = document.getElementById("love-song");

  startBtn.addEventListener("click", () => {
    // Inicia a música (com tratamento para autoplay bloqueado)
    loveSong.volume = 0.3;
    const playPromise = loveSong.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        startBtn.textContent = "Clique para ativar o som";
        startBtn.onclick = () => loveSong.play();
      });
    }

    startBtn.classList.add("hidden");
    shootHearts();
    message.classList.add('show');
    startHeartRain(); // ⬅️ aqui começa a chuva de corações!
  });

  function shootHearts() {
    // Posições finais dos 3 corações (formando um coração maior)
    const targets = [
      { x: -60, y: -80 }, // Esquerda
      { x: 60, y: -80 }, // Direita
      { x: 0, y: -150 }, // Topo
      { x: -60, y: -80 }, // Esquerda
      { x: 60, y: -80 }, // Direita
    ];

    targets.forEach((target, i) => {
      setTimeout(() => {
        createHeart(target.x, target.y);

        // Mostra o coração pulsante e mensagem após o último coração
        if (i === targets.length - 1) {
          setTimeout(() => {
            heartShooter.classList.add("hidden");
            finalHeart.classList.remove("hidden");
            finalHeart.classList.add("pulse");
            message.classList.remove("hidden");
            message.classList.add("show");
          }, 1000);
        }
      }, i * 600);
    });
  }

  function createHeart(tx, ty) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";
    heart.style.setProperty("--tx", `${tx}px`);
    heart.style.setProperty("--ty", `${ty}px`);

    document.body.appendChild(heart);

    // Remove o coração após a animação
    setTimeout(() => {
      heart.remove();
    }, 2000);
  }
});

function startHeartRain() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤";
    heart.style.position = "fixed";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = "-30px";
    heart.style.fontSize = `${Math.random() * 20 + 20}px`;
    heart.style.opacity = Math.random();
    heart.style.animation = `rain 5s linear`;
    document.body.appendChild(heart);

    heart.addEventListener("animationend", () => heart.remove());
  }, 150);
}

// Estilo da animação da chuva (adicione ao seu CSS também!)
