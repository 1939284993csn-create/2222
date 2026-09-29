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
  const availableWidth = Math.max(280, windowWidth - 40);
  const availableHeight = Math.max(210, windowHeight - 180);
  let canvasWidth = Math.min(maxCanvasWidth, availableWidth);
  let canvasHeight = canvasWidth / canvasRatio;

  if (canvasHeight > availableHeight) {
    canvasHeight = availableHeight;
    canvasWidth = canvasHeight * canvasRatio;
  }

  return {
    width: Math.floor(canvasWidth),
    height: Math.floor(canvasHeight)
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
