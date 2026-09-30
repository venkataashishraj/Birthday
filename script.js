const openBtn = document.getElementById("openBtn");
const reveal = document.getElementById("reveal");
const musicBtn = document.getElementById("musicBtn");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

openBtn.addEventListener("click", () => {
  reveal.classList.remove("hidden");
  reveal.animate(
    [{opacity: 0, transform: "translateY(30px)"}, {opacity: 1, transform: "translateY(0)"}],
    {duration: 1000, easing: "cubic-bezier(.2,.8,.2,1)"}
  );
  setTimeout(() => reveal.scrollIntoView({behavior: "smooth"}), 80);
  burstConfetti();
});

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    document.getElementById("lightboxImg").src = img.src;
    document.getElementById("lightbox").classList.remove("hidden");
  });
});
document.getElementById("closeLightbox").onclick = () =>
  document.getElementById("lightbox").classList.add("hidden");
document.getElementById("lightbox").addEventListener("click", e => {
  if (e.target.id === "lightbox") e.currentTarget.classList.add("hidden");
});

let pieces = [];
function burstConfetti() {
  pieces = Array.from({length: 150}, () => ({
    x: innerWidth / 2,
    y: innerHeight * .35,
    vx: (Math.random() - .5) * 11,
    vy: Math.random() * -10 - 3,
    g: .22,
    s: Math.random() * 7 + 3,
    r: Math.random() * Math.PI,
    vr: (Math.random() - .5) * .3,
    life: 1
  }));
  animateConfetti();
}
function animateConfetti() {
  ctx.clearRect(0,0,innerWidth,innerHeight);
  pieces.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += p.g; p.r += p.vr; p.life -= .008;
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.r);
    ctx.fillStyle = ["#ff5a9f","#ffd166","#a78bfa","#ffffff","#60a5fa"][Math.floor(Math.random()*5)];
    ctx.fillRect(-p.s/2, -p.s/2, p.s, p.s*.55);
    ctx.restore();
  });
  pieces = pieces.filter(p => p.life > 0 && p.y < innerHeight + 50);
  if (pieces.length) requestAnimationFrame(animateConfetti);
}
