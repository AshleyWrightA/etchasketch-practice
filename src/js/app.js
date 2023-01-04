//DOM Elements
const gridSlider = document.querySelector(".grid-size-silder");
const sliderDisplay = document.querySelector(".slider-display");
const gridBox = document.querySelector(".grid-box");
const classicButton = document.querySelector(".classic-button");
const rainbowButton = document.querySelector(".rainbow-button");
const clearButton = document.querySelector(".clear-button");

const rgbHandler = {
  //Handles rainbow mode
  //Object Literal

  r: 255,
  g: 0,
  b: 0,
  currentColor: "yellow",
  cycleCount: 0,

  cycle: () => {
    rgbHandler.cycleCount++;
    if (rgbHandler.cycleCount === 85) {
      if (rgbHandler.currentColor === "red") {
        rgbHandler.currentColor = "yellow";
      } else if (rgbHandler.currentColor === "yellow") {
        rgbHandler.currentColor = "green";
      } else if (rgbHandler.currentColor === "green") {
        rgbHandler.currentColor = "cyan";
      } else if (rgbHandler.currentColor === "cyan") {
        rgbHandler.currentColor = "blue";
      } else if (rgbHandler.currentColor === "blue") {
        rgbHandler.currentColor = "magenta";
      } else if (rgbHandler.currentColor === "magenta") {
        rgbHandler.currentColor = "red";
      }
      rgbHandler.cycleCount = 0;
    }
  },

  advanceRGB: () => {
    rgbHandler.cycle();
    if (rgbHandler.currentColor == "red") {
      rgbHandler.b = rgbHandler.b - 3;
    } else if (rgbHandler.currentColor == "yellow") {
      rgbHandler.g = rgbHandler.g + 3;
    } else if (rgbHandler.currentColor == "green") {
      rgbHandler.r = rgbHandler.r - 3;
    } else if (rgbHandler.currentColor == "cyan") {
      rgbHandler.b = rgbHandler.b + 3;
    } else if (rgbHandler.currentColor == "blue") {
      rgbHandler.g = rgbHandler.g - 3;
    } else if (rgbHandler.currentColor == "magenta") {
      rgbHandler.r = rgbHandler.r + 3;
    }
  },

  stringRGB: () => {
    return `rgb(${rgbHandler.r}, ${rgbHandler.g}, ${rgbHandler.b})`;
  },
};

let gridSliderValue = document.querySelector(".grid-size-silder").value;
const getGridSize = () => gridSliderValue;
const updateSlider = () => {
  gridSliderValue = document.querySelector(".grid-size-silder").value;
  sliderDisplay.textContent = `${gridSliderValue}`;
};
const updateNodelist = () => (gridElementNodelist = document.querySelectorAll(".grid-element"));

let classicMode = true;
let rainbowMode = false;
let mouseDraw = false;

const gridElementClicked = (e) => {
  if (classicMode == true) {
    e.style.backgroundColor = `rgb(40, 40, 40)`;
  } else if (rainbowMode == true) {
    e.style.backgroundColor = rgbHandler.stringRGB();
    rgbHandler.advanceRGB();
  }
};

//Event Listeners
document.addEventListener(
  "click",
  (e) => {
    if (e.target === classicButton) {
      classicMode = true;
      rainbowMode = false;
      clearGrid();
    }
    if (e.target === rainbowButton) {
      classicMode = false;
      rainbowMode = true;
      clearGrid();
    }
    if (e.target === gridSlider) {
      clearGrid();
      updateSlider();
      updateNodelist();
      buildGrid();
    }
    if (e.target === clearButton) {
      updateNodelist();
      clearGrid();
    }
  },
  false
);

document.addEventListener("mousedown", (e) => {
  if (e.target.matches(".grid-element")) {
    mouseDraw = true;
  }
});

document.addEventListener("mouseup", (e) => {
  if (e.target.matches(".grid-element")) {
    mouseDraw = false;
  }
});

document.addEventListener("mouseover", (e) => {
  if (e.target.matches(".grid-element") && mouseDraw === true) {
    gridElementClicked(e.target);
  }
  //Cancel drawing if you go to far from the etch-a-sketch
  if (e.target.matches("body")) {
    mouseDraw = false;
  }
});

const buildGrid = () => {
  gridBox.style.gridTemplateColumns = `repeat(${getGridSize()}, 1fr)`;
  gridBox.style.gridTemplateRows = `repeat(${getGridSize()}, 1fr)`;

  for (let i = 0; i < getGridSize() * getGridSize(); i++) {
    let gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.style.backGroundColor = "transparent";
    gridBox.appendChild(gridElement);
  }
};

const clearGrid = () => {
  gridElementNodelist.forEach((e) => (e.style.backgroundColor = "transparent"));
};

updateSlider();
buildGrid();
let gridElementNodelist = document.querySelectorAll(".grid-element");
