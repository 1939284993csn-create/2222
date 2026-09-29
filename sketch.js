const opacity = 20;
const canvasRatio = 4 / 3;
const maxCanvasWidth = 640;
let capture;
let ready = false;

function setup() {
  const canvasSize = getCanvasSize();
  createCanvas(canvasSize.width, canvasSize.height).parent("picture");
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
  capture.size(width, height);
  capture.hide();
}

function draw() {
  if (!ready) return;
  tint(255, opacity);
  image(capture, 0, 0, width, height);
  noTint();
}

function getCanvasSize() {
  const picture = document.getElementById("picture");
  const containerWidth = picture ? picture.getBoundingClientRect().width : 0;
  const fallbackWidth = Math.max(200, windowWidth - 88);
  const canvasWidth = Math.min(maxCanvasWidth, Math.max(200, containerWidth || fallbackWidth));

  return {
    width: Math.floor(canvasWidth),
    height: Math.floor(canvasWidth / canvasRatio)
  };
}

function windowResized() {
  const canvasSize = getCanvasSize();
  resizeCanvas(canvasSize.width, canvasSize.height);
  background(20);
  if (capture) {
    capture.size(width, height);
  }
}
