"use strict";

let appState = {
    loading: false,
    mainMenu: false,
    leaderBoard: true
}

function changeappState(type) {
    appState.loading = appState.mainMenu = appState.leaderBoard = false;
    switch (type) {
        case "loading":
            appState.loading = true;
            break;
        case "mainMenu":
            appState.mainMenu = true;
            break;
        case "leaderBoard":
            appState.leaderBoard = true;
            break;
    }
}
function preload() {
    preLoadingScreen();
    preMenuScreen();
}

function setup() {
    new Canvas(414,736);
}

function draw() {
    clear();
    switch (true) {
        case appState.loading:
            drawLoadingScreen();
            break;
        case appState.mainMenu:
            drawMainMenuScreen();
            break;
        case appState.leaderBoard:
            drawLeaderBoardScreen();
            break;
    }
}

///////////////////////////////// LOADING SCREEN //////////////////////////////////
let westpac_logo, loading_logo;
let initial_loadingScreen = true;
let start_lessonButton;
let transparency_logo = 255;

function preLoadingScreen() {
    westpac_logo = loadImage('./logo/WBC.AX.svg')
    loading_logo = loadImage('./assets/loading/loading.svg')
}

function drawLoadingScreen() {
    imageMode(CENTER);
    background('#F3F4F6')
    if (frameCount <= 102) {
        westpac_logo.resize(0.7*width, 0)
        tint(255, transparency_logo)
        transparency_logo -=2.5
        image(westpac_logo, width/2, height/2)
    } else {
        transparency_logo += 5
        tint(255, transparency_logo)
        loading_logo.resize(0.8*width, 0)
        image(loading_logo, width/2, height*0.5)
        fill(218, 23, 16, transparency_logo)
        stroke(218, 23, 16, transparency_logo)
        strokeWeight(2)
        textFont("myFont", 42)
        //textStyle(BOLD)
        textAlign(CENTER, CENTER)

        text("Westpac", width/2, 0.1*height);
        text("Financial Academy", width/2, 0.2*height)
        if (frameCount >= 200) {
            if (initial_loadingScreen) {
                start_lessonButton = createButton('Start your Learning Journey')
                adjustStartButtonStyle(start_lessonButton)
                initial_loadingScreen = false;
                start_lessonButton.mousePressed(changeScreen)
            }
        }
    }
}
function adjustStartButtonStyle(Button) {
    Button.size(0.6*width, 0.1*height);
    Button.position(0.2*width, 0.8*height);
    Button.style("border-radius: 20px");
    Button.style("border-color: #DA1710");
    Button.style("background: #DA1710");
    Button.style("padding-left: 25px")
    Button.style("padding-right: 25px")
    Button.style("color: #F9F9FB");
    Button.style("font-family: myFont")
    Button.style("font-size: 24px");

    Button.mouseOver(Button_MouseHover)
    Button.mouseOut(start_lessonButton_MouseOut)
}
function Button_MouseHover(){
    this.style("transform: scale(1.2, 1.2)");
    this.style("border-color: #1F1C4F");
    this.style("background: #1F1C4F");
}
function start_lessonButton_MouseOut(){
    this.style("transform: none")
    this.style("border-color: #DA1710");
    this.style("background: #DA1710");
}
function changeScreen() {
    start_lessonButton.hide();
    appState.loading = false;
    appState.mainMenu = true;
}

//////////////////////////////// MAIN MENU //////////////////////////////////
let level_icon;
let showMainLesson = true;
let showDetailLesson0 = false;
let initial_menuScreen = true;
let menuButtonGrp = []

function preMenuScreen() {
    level_icon = loadImage('./assets/mainmenu/level_icon1.svg')
}
function drawMainMenuScreen() {
    background('#F3F4F6');
    noStroke();
    fill('#DA1710')
    rect(0, 0, width, 0.15*height);
    level_icon.resize(0, 0.1*height)
    imageMode(CENTER);
    image(level_icon, width*0.2, 0.075*height);

    fill("#FFB449")
    ellipse(width*0.65, 0.075*height, 0.05*height)
    westpac_logo.resize(0.075*width, 0)
    image(westpac_logo, width*0.65, 0.075*height)
    
    fill("#F9F9FB")
    stroke("#F9F9FB")
    //strokeWeight(2)
    textFont("Time News Roman",25)
    textAlign(CENTER, CENTER)
    text("10", width*0.35, 0.075*height)
    text("100", width*0.8, 0.075*height)

    if (showMainLesson) {
        fill("#1F1C4F");
        stroke("#1F1C4F")
        strokeWeight(2)
        textFont("myFont", 32)
        text("Finance Basics", width/2, 0.25*height)
        text("Loans", width/2, 0.5*height)
        text("Interest", width/2, 0.75*height)
    }

    if (initial_menuScreen) {
        let menuButtonColor = ["#e2b0ff", "#fff2a7", "#ffa9d0", "#94b7e7", "#ff8585"]
        let menuButtonColor1 = ["#991AD6", "#FF3DDB", "#0074C4", "#008000", "#C53B00"];
        /*for (let i=0; i<5; i++) {
            let menuButton = new Sprite(width/2, 0.375*height, 0.125*height);
            menuButton.color = menuButtonColor1[i]
            menuButton.stroke = menuButtonColor1[i]
            if (i==1 || i==2) {
                menuButton.x = width/4 + width/2*(i-1);
                menuButton.y = 0.625*height;
            }
            if (i==3 || i==4) {
                menuButton.x = width/4 + width/2*(i-3);
                menuButton.y = 0.875*height;
            }
            
        }
        initial_menuScreen = false;*/
        for (let i=0; i<5; i++) {
            let menuButton = createButton("");
            menuButton.size(0.15*height, 0.15*height)
            menuButton.position((width-menuButton.width)/2, 0.375*height-menuButton.width/2);
            menuButton.style("border-radius: 50%")
            menuButton.style("border-color", menuButtonColor[i])
            menuButton.style("background", menuButtonColor[i])
            
            if (i==1 || i==2) {
                menuButton.position((width/2 + width*(i-1)-menuButton.width)/2, 0.625*height-menuButton.width/2);
            } 
            if (i==3 || i==4) {
                menuButton.position((width/2 + width*(i-3)-menuButton.width)/2, 0.875*height-menuButton.width/2);
            }

            menuButton.mouseOver(Button_MouseHover)
            menuButton.mouseOut(menuButton_MouseOut)

            menuButtonGrp.push(menuButton);
        }
        menuButtonGrp[0].mousePressed(lesson0)
        initial_menuScreen = false;
    }

    if (showDetailLesson0) {
        for (let i=0; i<5; i++) {
            fill(125 + i*20, 186, 242);
            rect(0.1*width, (0.25 + 0.15*i)*height, 0.8*width, 0.1*height, 20);
            fill("#F9F9FB");
            textFont("myFont", 24);
            text("Lesson " + (i+1), width/2, (0.25 + 0.15*i)*height + 0.05*height);
        }
    }
}
function Button_MouseHover() {
    this.style("transform: scale(1.2, 1.2)")
}
function menuButton_MouseOut() {
    this.style("transform: none")
}
function lesson0() {
    for (let i=0; i<5; i++) {
        menuButtonGrp[i].hide();
    }
    showMainLesson = false;
    showDetailLesson0 = true;
}


//////////////////////////////// LEADERBOARD //////////////////////////////////
function drawLeaderBoardScreen() {
    background('#F3F4F6');
    noStroke();
    fill('#DA1710');
    rect(0, 0, width, 0.15*height);

    stroke('#FF3DDB');
    strokeWeight(5);
    line(0, 0.075*height, width*0.25, 0.075*height);
    line(width*0.75, 0.075*height, width, 0.075*height);

    fill("#F9F9FB");
    noStroke();
    textAlign(CENTER, CENTER)
    textStyle(BOLD)
    textFont("myFont", 32);
    text("LEADERBOARD", width/2, 0.075*height);
}