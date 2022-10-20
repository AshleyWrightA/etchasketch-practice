
//DOM Elements
const gridSlider = document.querySelector(".grid-size-silder");
const sliderDisplay = document.querySelector(".slider-display");
const gridBox = document.querySelector(".grid-box");
const classicButton = document.querySelector(".classic-button");
const rainbowButton = document.querySelector(".rainbow-button");
const clearButton = document.querySelector(".clear-button");

class RGB {
    constructor() {
        this.r = 255;
        this.g = 0;
        this.b = 0;
        this.currentColor = "yellow";
        this.cycleCount = 0;

        this.cycle = function() {
            this.cycleCount++;
            console.log(this.cycleCount)
            if (this.cycleCount === 255) {
                if (this.currentColor === "red") {
                    this.currentColor = "yellow";
                }
                else if (this.currentColor === "yellow") {
                    this.currentColor = "green";
                }
                else if (this.currentColor === "green") {
                    this.currentColor = "cyan";
                }
                else if (this.currentColor === "cyan") {
                    this.currentColor = "blue";
                }
                else if (this.currentColor === "blue") {
                    this.currentColor = "magenta";
                }
                else if (this.currentColor === "magenta") {
                    this.currentColor = "red";
                }
                this.cycleCount = 0;
            }
        };

        this.advanceRGB = function() {
            this.cycle();
            if (this.currentColor == "red") {
                this.b = this.b -2;
            }
            else if (this.currentColor == "yellow") {
                this.g = this.g +2;
            }
            else if (this.currentColor == "green") {
                this.r = this.r -2;
            }
            else if (this.currentColor == "cyan") {
                this.b = this.b +2;
            }
            else if (this.currentColor == "blue") {
                this.g = this.g -2;
            }
            else if (this.currentColor == "magenta") {
                this.r = this.r +2;
            }
        };

        this.stringRGB = function() {
            return `rgb(${this.r}, ${this.g}, ${this.b})`;
        };

    }
}

let gridSliderValue = document.querySelector(".grid-size-silder").value;
const rgbObject = new RGB();
const getGridSize = () => gridSliderValue;
const updateSlider = () => {
    gridSliderValue = document.querySelector(".grid-size-silder").value;
    sliderDisplay.textContent = `${gridSliderValue}`
}
const updateNodelist = () => gridElementNodelist = document.querySelectorAll(".grid-element");

let classicMode = true;
let rainbowMode = false;
let mouseDraw = false;

const gridElementClicked = (e) => {
    if(classicMode == true) {
        e.style.backgroundColor = `rgb(40, 40, 40)`;
    }
    else if(rainbowMode == true) {
        e.style.backgroundColor = rgbObject.stringRGB();
        rgbObject.advanceRGB();
    }
}

//Event Listeners
document.addEventListener("click", (e) => {
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
}, false);

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
        gridElementClicked(e.target)
    }
    //Cancel drawing if you go to far from the etch-a-sketch
    if (e.target.matches("body")) {
        mouseDraw = false;
    }
});

const buildGrid = () => {
    gridBox.style.gridTemplateColumns = `repeat(${getGridSize()}, 1fr)`;
    gridBox.style.gridTemplateRows = `repeat(${getGridSize()}, 1fr)`;

    for(let i = 0; i < getGridSize()*getGridSize(); i++){
        let gridElement = document.createElement("div");
        gridElement.classList.add("grid-element");
        gridElement.style.backGroundColor = "transparent";
        gridBox.appendChild(gridElement);
    }
}

const clearGrid = () => {
    gridElementNodelist.forEach(e => e.style.backgroundColor = "transparent")
}

updateSlider();
buildGrid();
let gridElementNodelist = document.querySelectorAll(".grid-element");
