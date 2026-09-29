const opacity = 20;
let capture;
let ready = false;

function setup() {
  createCanvas(640, 480).parent("picture");
  pixelDensity(1);
  background(20);
  select("#start").mousePressed(startCamera);
  window.addEventListener("pagehide", () => {
    ready = false;
    if (capture) capture.remove();
  });
}

function startCamera() {
  select("#start").attribute("disabled", "");
  select("#status").html("Allow camera access. If blocked, allow it in the browser and reload this page.");
  capture = createCapture(VIDEO, () => {
    ready = true;
    select("#status").html("Camera ready.");
  });
  capture.size(640, 480);
  capture.hide();
}

function draw() {
  if (!ready) return;
  tint(255, opacity);
  image(capture, 0, 0, width, height);
  noTint();
}
