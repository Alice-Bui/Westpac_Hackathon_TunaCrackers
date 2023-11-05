"use strict";

let appState = {
    loading: true,
    mainMenu: false,

    leaderBoard: false,

    botany: false,

    askQuest: false,
    budgetStimulation: false,

    weeklyTask: false,

    milestoneTrack: false,
}

function changeappState(type) {
    appState.loading = appState.mainMenu = appState.leaderBoard = appState.botany = false;
    appState.askQuest = appState.budgetStimulation = appState.weeklyTask = appState.milestoneTrack = false;
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
        case "botany":
            appState.botany = true;
            break;
        case "askQuest":
            appState.askQuest = true;
            break;
        case "budgetStimulation":
            appState.budgetStimulation = true;
            break;
        case "weeklyTask":
            appState.weeklyTask = true;
            break;
        case "milestoneTrack":
            appState.milestoneTrack = true;
            break;
    }
}
function preload() {
    preLoadingScreen();
    preMenuScreen();
    preLeaderBoardScreen();
    preBotanyScreen();
    preWeeklyTaskScreen();
    preMilestoneTrackScreen();
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
        case appState.botany:
            drawBotanyScreen();
            break;
        case appState.askQuest:
            drawAskQuestScreen();
            break;
        case appState.budgetStimulation:
            drawBudgetStimulationScreen();
            break;
        case appState.weeklyTask:
            drawWeeklyTaskScreen();
            break;
        case appState.milestoneTrack:
            drawMilestoneTrackScreen();
            break;
    }
}

///////////////////////////////// LOADING SCREEN //////////////////////////////////
let westpac_logo, loading_logo;
let initial_loadingScreen = true;
let start_lessonButton;
let transparency_logo = 255;

function preLoadingScreen() {
    westpac_logo = loadImage('./logo/WBC.AX.svg');
    loading_logo = loadImage('./assets/loading/loading.svg');
}

function drawLoadingScreen() {
    imageMode(CENTER);
    background('#F3F4F6');
    if (frameCount <= 102) {
        westpac_logo.resize(0.7*width, 0);
        tint(255, transparency_logo);
        transparency_logo -=2.5;
        image(westpac_logo, width/2, height/2)
    } else {
        transparency_logo += 5;
        tint(255, transparency_logo);
        loading_logo.resize(0.8*width, 0);
        image(loading_logo, width/2, height*0.5);
        fill(218, 23, 16, transparency_logo);
        stroke(218, 23, 16, transparency_logo);
        strokeWeight(2);
        textFont("myFont", 42);
        textAlign(CENTER, CENTER);

        text("Westpac", width/2, 0.1*height);
        text("Financial Academy", width/2, 0.2*height);
        if (frameCount >= 200) {
            if (initial_loadingScreen) {
                start_lessonButton = createButton('Start your Learning Journey');
                adjustStartButtonStyle(start_lessonButton);
                initial_loadingScreen = false;
                start_lessonButton.mousePressed(changeScreen);
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
    Button.style("padding-left: 25px");
    Button.style("padding-right: 25px");
    Button.style("color: #F9F9FB");
    Button.style("font-family: myFont");
    Button.style("font-size: 24px");

    Button.mouseOver(start_lessonButton_MouseHover);
    Button.mouseOut(start_lessonButton_MouseOut);
}
function start_lessonButton_MouseHover(){
    this.style("transform: scale(1.2, 1.2)");
    this.style("border-color: #1F1C4F");
    this.style("background: #1F1C4F");
}
function start_lessonButton_MouseOut(){
    this.style("transform: none");
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
let menuButtonGrp = [];

function preMenuScreen() {
    level_icon = loadImage('./assets/mainmenu/level_icon.svg')
}
function drawMainMenuScreen() {
    background('#F3F4F6');
    noStroke();
    fill('#DA1710');
    rect(0, 0, width, 0.15*height);
    level_icon.resize(0, 0.15*height);
    imageMode(CENTER);
    image(level_icon, width*0.2, 0.075*height);

    fill("#FFB449");
    ellipse(width*0.65, 0.075*height, 0.075*height);
    westpac_logo.resize(0.1*width, 0);
    image(westpac_logo, width*0.65, 0.075*height);
    
    fill("#F9F9FB");
    stroke("#F9F9FB");
    textFont("myFont",25);
    textAlign(CENTER, CENTER);
    text("10", width*0.35, 0.075*height);
    text("100", width*0.8, 0.075*height);

    if (showMainLesson) {
        fill("#1F1C4F");
        stroke("#1F1C4F");
        strokeWeight(2);
        textFont("myFont", 32);
        text("Finance Basics", width/2, 0.25*height);
        text("Loans", width/2, 0.5*height);
        text("Interest", width/2, 0.75*height);
    }

    if (initial_menuScreen) {
        let menuButtonColor = ["#e2b0ff", "#fff2a7", "#ffa9d0", "#94b7e7", "#ff8585"];
        for (let i=0; i<5; i++) {
            let menuButton = createButton("");
            menuButton.size(0.15*height, 0.15*height);
            menuButton.position((width-menuButton.width)/2, 0.375*height-menuButton.width/2);
            menuButton.style("border-radius: 50%");
            menuButton.style("border-color", menuButtonColor[i]);
            menuButton.style("background", menuButtonColor[i]);
            
            if (i==1 || i==2) {
                menuButton.position((width/2 + width*(i-1)-menuButton.width)/2, 0.625*height-menuButton.width/2);
            } 
            if (i==3 || i==4) {
                menuButton.position((width/2 + width*(i-3)-menuButton.width)/2, 0.875*height-menuButton.width/2);
            }

            menuButton.mouseOver(menuButton_MouseHover);
            menuButton.mouseOut(menuButton_MouseOut);

            menuButtonGrp.push(menuButton);
        }
        menuButtonGrp[0].mousePressed(lesson0)
        initial_menuScreen = false;
    }

    if (showDetailLesson0) {
        stroke("#1F1C4F");
        fill("#1F1C4F");
        textFont("myFont", 32);
        text("Finance Basics", width/2, 0.2*height);
        for (let i=0; i<5; i++) {
            stroke("#1F1C4F");
            fill(125 + i*20, 186, 242);
            rect(0.1*width, (0.25 + 0.15*i)*height, 0.8*width, 0.1*height, 20);
            fill("#F9F9FB");
            stroke("#F9F9FB");
            textFont("myFont", 24);
            text("Lesson " + (i+1), width/2, (0.25 + 0.15*i)*height + 0.05*height);
        }
    }
}
function menuButton_MouseHover() {
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
let top6_player = [["player", 6]];
let playerAvatar = [];

function preLeaderBoardScreen() {
    for (let i = 0; i < top6_player.length; i++) {
        for (let j = 1; j < top6_player[i][1] + 1; j++) {
            let player = top6_player[i][0] + j + ".png";
            loadImage("./assets/leaderboard/" + player, asset => playerAvatar.push(asset));
        }
    }
}
function drawLeaderBoardScreen() {
    background('#F3F4F6');
    noStroke();
    fill(145, 130, 100);
    rect(0, 0, width, 0.15*height);

    stroke('#F3F4F6');
    strokeWeight(5);
    line(0, 0.075*height, width*0.25, 0.075*height);
    line(width*0.75, 0.075*height, width, 0.075*height);

    fill("#F9F9FB");
    noStroke();
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textFont("myFont", 32);
    text("LEADERBOARD", width/2, 0.075*height);

    for (let i=0; i<6; i++) {
        fill(125 + i*20, 100 + i*20, 25 + i*20);
        rect(0.1*width, (0.2+0.13*i)*height, 0.8*width, 0.1*height, 15);

        imageMode(CENTER);
        playerAvatar[i].resize(0, 0.09*height);
        image(playerAvatar[i], 0.2*width, (0.25+0.13*i)*height);

        fill("#DEDEE1");
        text("#Rank " + (i+1), 0.45*width, (0.25+0.13*i)*height)
    }
}


//////////////////////////////// BOTANY //////////////////////////////////
let botany, noti1, noti2, noti3;
let numFrame =0;
let initialBotanyScreen = true;
function preBotanyScreen() {
    botany = loadImage("./assets/botany/theme.jpg");
    noti1 = loadImage("./assets/botany/noti1.jpg");
    noti2 = loadImage("./assets/botany/noti2.jpg");
    noti3 = loadImage("./assets/botany/noti3.jpg")
}
function drawBotanyScreen() {
    imageMode(CENTER);
    background("#fdf8e7");
    botany.resize(width, 0);
    image(botany, width/2, height-botany.height/2.5);
    numFrame += 1;
    noti1.resize(width, 0.1*height);
    noti2.resize(width, 0.1*height);
    noti3.resize(width, 0.1*height);
    if (numFrame >=60){
        image(noti1, width/2, 0.06*height)
    }
    if (numFrame >= 120){
        image(noti2, width/2, 0.16*height)
    }
    if (numFrame >= 180) {
        image(noti3, width/2, 0.26*height)
    }
}

//////////////////////////////// ASK QUESTION //////////////////////////////////
let initial_askQuestScreen = true;
let goal0, goal1, goal2;
let goalButton = [];

function drawAskQuestScreen() {
    background("#F3F4F6");
    stroke("#1F1C4F");
    strokeWeight(2);
    noFill();
    rect(0.05*width, 0.025*height, 0.9*width, 0.95*height);

    fill("#1F1C4F");
    rect(0.1*width, 0.075*height, 0.8*width, 0.1*height, 15);
    
    fill("#F9F9FB");
    textAlign(CENTER, CENTER);
    stroke("#F9F9FB");
    textFont("myFont", 42);
    textStyle(NORMAL);
    text("GOALS", width/2, 0.125*height);

    noStroke();
    fill("#181B25");
    textAlign(LEFT, TOP);
    textWrap(WORD);
    textStyle(BOLD);
    textFont("myFont", 24);
    text("Hello <USER NAME> :)", 0.1*width, 0.25*height);
    text("What are your spending goals this week?", 0.1*width, 0.3*height, 0.8*width);

    if (initial_askQuestScreen) {
        goal0 = createButton("I'm saving up for _______");
        goal1 = createButton("Lead me to my Budget Stimulation");
        goal2 = createButton("I'm not sure yet :(");

        goalButton.push(goal0, goal1, goal2);

        for (let i=0; i<goalButton.length; i++) {
            goalButton[i].position(0.25*width, (0.45+0.125*i)*height);
            goalButton[i].size(0.6*width, 0.075*height);
            goalButton[i].style("border-radius: 10px");
            goalButton[i].style("background: #DEDEE1");
            goalButton[i].mouseOver(goalButton_MouseHover);
            goalButton[i].mouseOut(goalButton_MouseOut)
        }
        goal1.mousePressed(goToBudgetStimulationScreen);

        initial_askQuestScreen = false
    }
}
function goalButton_MouseHover() {
    this.style("transform: scale(1.2, 1.2");
    this.style("background: #1F1C4F");
    this.style("color: #F9F9FB")
}
function goalButton_MouseOut(){
    this.style("transform: none");
    this.style("background: #DEDEE1");
    this.style("color: #181B25")
}
function goToBudgetStimulationScreen() {
    for (let i=0; i<goalButton.length; i++){
        goalButton[i].hide()
    }
    appState.askQuest = false;
    appState.budgetStimulation = true;
}


//////////////////////////////// BUDGET STIMULATION //////////////////////////////////
let cat0 = 1;
let cat1 = 1;
let cat2 = 1;
let cat3 = 1;
let totalCatColor = ["#e2b0ff", "#fff2a7", "#ffa9d0", "#94b7e7"];
let totalCat = [cat0, cat1, cat2, cat3];
let total;
let onePer;
let startPie,endPie, gap;
let inputData = [];
let inputTitle = ["Category 0", "Category 1", "Category 2", "Category 3"];
let initial_budgetStimulationScreen = true;

function drawBudgetStimulationScreen() {
    angleMode(DEGREES);
    background("#F3F4F6");
    textAlign(CENTER, TOP);
    fill("#1F1C4F");
    stroke("#1F1C4F");
    strokeWeight(2);
    textFont("myFont", 42);
    textStyle(NORMAL);
    text("Budget Stimulation", width/2, height*0.075);
    text("Calculator", width/2, height*0.15);

    textSize(24);
    text("Estimate cashflow", width/2, 0.8*height);
    textAlign(LEFT, CENTER);
    textSize(20);
    strokeWeight(1);
    text("Spend:", 0.1*width, 0.85*height);
    text("Income:", 0.1*width, 0.9*height);

    noFill();
    strokeWeight(5);
    stroke("#008000");
    line(0.3*width, 0.85*height, 0.8*width, 0.85*height);
    stroke("#0074C4");
    line(0.3*width, 0.9*height, 0.7*width, 0.9*height);

    if (initial_budgetStimulationScreen) {
        for (let i=0; i<totalCatColor.length; i++) {
            let catTitle = createElement('p', inputTitle[i] + " ($):");
            catTitle.style("font-family: myFont");
            catTitle.style("font-size: 16px");
            catTitle.style("color: #1F1C4F");

            let inputCat = createInput();
            inputCat.size(0.3*width, 0.03*height);
            inputCat.style("border-radius: 5px");
            inputCat.style("background", totalCatColor[i]);
            if (i <2) {
                catTitle.position(((0.1+0.5*i)*width), 0.55*height);
                inputCat.position((0.1+0.5*i)*width, 0.6*height)
            } else {
                catTitle.position(((0.1+0.5*(i-2))*width), 0.65*height);
                inputCat.position((0.1+0.5*(i-2))*width, 0.7*height)
            }
            inputData.push(inputCat)
        }

        inputData[0].input(myInputEvent0);
        inputData[1].input(myInputEvent1);
        inputData[2].input(myInputEvent2);
        inputData[3].input(myInputEvent3);

        initial_budgetStimulationScreen = false;
    }

    total = totalCat[0] + totalCat[1] + totalCat[2] + totalCat[3];
    onePer = 360/total;
    startPie = 0;
    endPie = 0;
    noStroke();
    for (let i=0; i < totalCat.length; i++) {
        endPie += onePer*totalCat[i];
        fill(totalCatColor[i]);
        arc(width/2, 0.4*height, 0.5*width, 0.5*width, startPie, endPie);
        startPie += onePer*totalCat[i]
    }
}
function myInputEvent0(){
    totalCat[0]=float(this.value());
} 
function myInputEvent1(){
    totalCat[1]=float(this.value());
} 
function myInputEvent2(){
    totalCat[2]=float(this.value());
} 
function myInputEvent3(){
    totalCat[3]=float(this.value());
} 


//////////////////////////////// WEEKLY TASK //////////////////////////////////
let tasks = [["task", 3]];
let taskIcons = [];
let checkmark;
let numFrame1 = 0;
function preWeeklyTaskScreen() {
    for (let i = 0; i < tasks.length; i++) {
        for (let j = 1; j < tasks[i][1] + 1; j++) {
            let t = tasks[i][0] + j + ".png";
            loadImage("./assets/weeklytasks/" + t, asset => taskIcons.push(asset));
        }
    }
    checkmark = loadImage("./assets/weeklytasks/checkmark.png");
}
function drawWeeklyTaskScreen() {
    background("#D3B683");
    stroke("#1F1C4F");
    strokeWeight(2);
    noFill();
    rect(0.05*width, 0.025*height, 0.9*width, 0.95*height);
    
    fill("#1F1C4F");
    textAlign(CENTER, CENTER);
    textFont("myFont", 42);
    textStyle(NORMAL);
    text("Weekly Tasks", width/2, 0.125*height);

    for (let i=0; i<3; i++) {
        stroke("#1F1C4F");
        fill(125 + i*40, 186, 242);
        rect(0.1*width, (0.2+0.2*i)*height, 0.8*width, 0.15*height, 15);

        imageMode(CENTER);
        taskIcons[i].resize(0.15*width, 0);
        image(taskIcons[i], 0.25*width, (0.275+0.2*i)*height);

        rect(0.75*width, (0.25+0.2*i)*height, 0.1*width);
        
        fill("#1F1C4F");
        textSize(24);
        text("Task" + (i+1), 0.45*width, (0.275+0.2*i)*height)
    }

    numFrame1 ++;

    if (numFrame1 >= 120) {
        checkmark.resize(0.1*width, 0);
        image(checkmark,0.8*width, 0.28*height);
    }
    if (numFrame1 >= 180) {
        noStroke();
        fill("#FFB449");
        ellipse(width*0.425, 0.85*height, 0.125*height);
        westpac_logo.resize(0.15*width, 0);
        imageMode(CENTER);
        image(westpac_logo, width*0.425, 0.85*height);

        fill("#1F1C4F");
        textSize(36);
        text("+", 0.25*width, 0.85*height);
        text("100 !!!", 0.7*width, 0.85*height);
    }
}

//////////////////////////////// MILESTONE TRACK //////////////////////////////////
let seeding, sprout, flower, complete;
let progressImg = [];
let numFrame2 = 0;
function preMilestoneTrackScreen() {
    seeding = loadImage("./assets/milestonetrack/seeding.png");
    sprout = loadImage("./assets/milestonetrack/sprout.png");
    flower = loadImage("./assets/milestonetrack/flower.png");
    complete = loadImage("./assets/milestonetrack/complete.png");
    progressImg.push(seeding, sprout, flower, complete)
}
function drawMilestoneTrackScreen() {
    background("#FFD9F7");
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    fill("#1F1C4F");
    stroke("#1F1C4F");
    strokeWeight(2);
    textFont("myFont", 36);
    text("> Milestone Tracking <", width/2, height*0.075);

    numFrame2++
    for (let i =0; i<progressImg.length; i++) {
        let time = 60 + 60*i;
        if (numFrame2 >= time) {
            progressImg[i].resize(0.2*width, 0)
            let x1 = 0.2;
            let x2 = 0.65;
            let x;
            if (i%2==0) {
                x = 0.2
            } else {
                x = 0.65
            }
            noStroke();
            image(progressImg[i], x*width, (0.225+0.2*i)*height);
            fill(255, 180 + 20*i, 73);
            rect((x-0.1)*width, (0.15+0.2*i)*height, 0.25*width, 0.05*height, 15);
                
            fill("#1F1C4F");
            textStyle(BOLD);
            textSize(20);
            text("Week "+(i+1), x*width, (0.18+0.2*i)*height);

            if (i==progressImg.length-1) {
                noStroke();
                fill("#0B6E4F");
                textSize(20);
                textStyle(BOLD);
                textAlign(LEFT, CENTER);
                text("MONTHLY GOAL REACHED!!", 0.1*width, 0.875*height)
            }
        }
    }
}
