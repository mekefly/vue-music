const docEl = document.documentElement;
const dpr = window.devicePixelRatio || 1;

// adjust body font size
function setBodyFontSize() {
  if (document.body) {
    document.body.style.fontSize = dpr * 12 + "px";
  } else {
    document.addEventListener("DOMContentLoaded", setBodyFontSize);
  }
}
setBodyFontSize();

// rem unit
function setRemUnit() {
  const screenScale = docEl.clientWidth / docEl.clientHeight;
  const scale = 1.2;
  if (screenScale > scale) {
    docEl.classList.add("horizontal-screen");

    var rem = (docEl.clientHeight * scale) / 32;
    docEl.style.fontSize = rem + "px";
  } else {
    docEl.classList.remove("horizontal-screen");
    var rem = docEl.clientWidth / 32;
    docEl.style.fontSize = rem + "px";
  }
  setBodyFontSize();
}

setRemUnit();

// reset rem unit on page resize
window.addEventListener("resize", setRemUnit);
window.addEventListener("pageshow", function (e) {
  if (e.persisted) {
    setRemUnit();
  }
});

// detect 0.5px supports
if (dpr >= 2) {
  var fakeBody = document.createElement("body");
  var testElement = document.createElement("div");
  testElement.style.border = ".5px solid transparent";
  fakeBody.appendChild(testElement);
  docEl.appendChild(fakeBody);
  if (testElement.offsetHeight === 1) {
    docEl.classList.add("hairlines");
  }
  docEl.removeChild(fakeBody);
}
export {};
