/* ==========================================================
   Academic Website
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     Current Year
  ========================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* ==========================================
     Dark Mode
  ========================================== */

  const toggle = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {

    document.body.classList.add("dark");

  }

  if (toggle) {

    toggle.addEventListener("click", () => {

      document.body.classList.toggle("dark");

      localStorage.setItem(

        "theme",

        document.body.classList.contains("dark")
          ? "dark"
          : "light"

      );

    });

  }

  /* ==========================================
     Mobile Navigation
  ========================================== */

  const navButton = document.querySelector(".mobile-nav-toggle");

  const nav = document.querySelector(".nav-links");

  if (navButton && nav) {

    navButton.addEventListener("click", () => {

      nav.classList.toggle("show");

    });

    // close the menu once a link is tapped
    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("show");

      });

    });

  }

  /* ==========================================
     Active Navigation
  ========================================== */

  const sections = document.querySelectorAll("section[id]");

  const links = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        links.forEach(link => {

          link.classList.remove("active");

          if (

            link.getAttribute("href") ===

            "#" + entry.target.id

          ) {

            link.classList.add("active");

          }

        });

      });

    },

    {

      // a section counts as "active" while it crosses the middle of the
      // viewport (a fixed .4 threshold never triggers for sections taller
      // than ~2.5 screens, e.g. Publications on a phone)
      rootMargin: "-45% 0px -50% 0px",

      threshold: 0

    }

  );

  sections.forEach(section => observer.observe(section));

});



/* ==========================================================
   HERO GRAPHIC
   ========================================================== */

(function () {

const canvas = document.getElementById("oneHealthCanvas");

// other pages (e.g. sideprojects.html) have no hero canvas
if (!canvas) return;

const ctx = canvas.getContext("2d");

// the graphic is drawn in a 600 x 600 coordinate space
const BASE_SIZE = 600;

function resizeCanvas() {

  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;

  // scale the 600 x 600 drawing to whatever size the canvas has
  // (1:1 on desktop, smaller on phones)
  const scale = (rect.width / BASE_SIZE) * window.devicePixelRatio;

  ctx.setTransform(scale, 0, 0, scale, 0, 0);

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


const particles = [];

for (let i = 0; i < 45; i++) {

  const exposureTypes = [
    "chemical",
    "biological",
    "physical"
  ];


  particles.push({

    angle: Math.random() * Math.PI * 2,

    radius: 260 + Math.random() * 60,

    targetRadius: 190 + Math.random() * 30,

    speed: 0.001 + Math.random() * 0.003,

    size: 5,

    type: exposureTypes[
      Math.floor(Math.random() * exposureTypes.length)
    ]

  });

}


const nodes = [

  {
    name: "Human",
    icon: "human",
    x: 300,
    y: 180,
    color: "#4A90E2"
  },

  {
    name: "Animal",
    icon: "animal",
    x: 170,
    y: 350,
    color: "#38B2AC"
  },

  {
    name: "Ecosystem",
    icon: "ecosystem",
    x: 430,
    y: 350,
    color: "#5FAF6F"
  }

];


let time = 0;


function drawNode(node) {

  ctx.beginPath();

  ctx.arc(
    node.x,
    node.y,
    65,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = node.color + "18";
  ctx.fill();

  ctx.strokeStyle = node.color;
  ctx.lineWidth = 2;
  ctx.stroke();


  // icon area

  ctx.strokeStyle = node.color;
  ctx.lineWidth = 3;


  if (node.icon === "human") {

    ctx.beginPath();
    ctx.arc(node.x, node.y - 15, 10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(node.x, node.y - 5);
    ctx.lineTo(node.x, node.y + 25);
    ctx.stroke();

  }


  if (node.icon === "animal") {

    ctx.beginPath();

    ctx.arc(
      node.x,
      node.y,
      18,
      0,
      Math.PI * 2
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
      node.x - 10,
      node.y - 18,
      5,
      0,
      Math.PI * 2
    );

    ctx.arc(
      node.x + 10,
      node.y - 18,
      5,
      0,
      Math.PI * 2
    );

    ctx.stroke();

  }


  if (node.icon === "ecosystem") {

    ctx.beginPath();

    ctx.moveTo(
      node.x,
      node.y + 20
    );

    ctx.lineTo(
      node.x,
      node.y - 20
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.arc(
      node.x - 12,
      node.y - 5,
      12,
      0,
      Math.PI
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.arc(
      node.x + 12,
      node.y + 5,
      12,
      0,
      Math.PI
    );

    ctx.stroke();

  }


  ctx.fillStyle = node.color;

  ctx.font = "15px Arial";

  ctx.textAlign = "center";

  ctx.fillText(
    node.name,
    node.x,
    node.y + 45
  );

}



function drawConnections() {


  const pairs = [
    [0, 1],
    [0, 2],
    [1, 2]
  ];


  pairs.forEach(pair => {


    const a = nodes[pair[0]];
    const b = nodes[pair[1]];


    const gradient =
      ctx.createLinearGradient(
        a.x,
        a.y,
        b.x,
        b.y
      );


    gradient.addColorStop(
      0,
      a.color
    );

    gradient.addColorStop(
      1,
      b.color
    );


    ctx.beginPath();

    ctx.moveTo(a.x, a.y);

    ctx.lineTo(b.x, b.y);

    ctx.strokeStyle = gradient;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#7aa7c7";

    ctx.globalAlpha = .15;

    ctx.lineWidth = 1;

    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.globalAlpha = 1;


  });


}

const particleSize = 5;

function drawExposome() {

  particles.forEach(p => {

    p.angle += p.speed;

    if (p.radius > p.targetRadius) {

      p.radius -= 0.08;

    }
    else {

      p.radius += 0.02;

    }

    if (p.radius < 160) {
      p.radius = 260 + Math.random() * 80;
    }


    let x =
      300 +
      Math.cos(p.angle) *
      p.radius;


    let y =
      280 +
      Math.sin(p.angle) *
      p.radius;

    if(insideNodeBoundary(x,y)){

    p.radius = 280 + Math.random()*60;
    p.angle = Math.random()*Math.PI*2;

    return;

}


    ctx.save();


    if (p.type === "chemical") {

      // molecule-like hexagon

      ctx.beginPath();

      for (let i = 0; i < 6; i++) {

        let r = particleSize;

        let a =
          i * Math.PI / 3;

        let px =
          x + Math.cos(a) * p.size * 2;

        let py =
          y + Math.sin(a) * p.size * 2;

        if (i === 0)
          ctx.moveTo(px, py);
        else
          ctx.lineTo(px, py);

      }

      ctx.closePath();

      ctx.fillStyle = "#D99A2B";

      ctx.fill();

    }



    if (p.type === "biological") {

      // microbial organic particle

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        particleSize,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "#8E7CC3";

      ctx.fill();


      ctx.beginPath();

      ctx.arc(
        x + p.size,
        y - p.size,
        p.size / 2,
        0,
        Math.PI * 2
      );

      ctx.fill();

    }



    if (p.type === "physical") {

      // environmental wave particle

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        particleSize,
        0,
        Math.PI * 2
      );


      ctx.strokeStyle = "#5BA6D9";

      ctx.lineWidth = 2;

      ctx.stroke();

    }



    ctx.restore();


  });

}


function insideNodeBoundary(x, y) {

  for (const node of nodes) {

    let dx = x - node.x;
    let dy = y - node.y;

    let distance = Math.sqrt(
      dx * dx + dy * dy
    );

    if (distance < 90) {

      return true;

    }

  }

  return false;

}

function drawNetwork() {


  const cx = 300;
  const cy = 280;


  for (let i = 0; i < 15; i++) {


    let x =
      cx +
      Math.cos(
        time * 0.01 + i
      ) *
      (90 + i * 5);


    let y =
      cy +
      Math.sin(
        time * 0.01 + i
      ) *
      (70 + i * 4);



    ctx.beginPath();

    ctx.arc(
      x,
      y,
      3,
      0,
      Math.PI * 2
    );


    ctx.fillStyle = "#555";

    ctx.fill();


  }

}



function animate() {


  ctx.clearRect(
    0,
    0,
    BASE_SIZE,
    BASE_SIZE
  );


  drawExposome();

  drawConnections();


  nodes.forEach(drawNode);


  drawNetwork();


  time++;


  requestAnimationFrame(
    animate
  );


}


animate();

})();
