let cpuNumber=0;//랜덤숫자
let chances=5;//기회 5번.
let resultbox=document.getElementById("resultBox");//결과창
let userinput=document.getElementById("userInput");//입력창
let playbutton=document.getElementById("gameButton");//플레이버튼
let resetbutton=document.getElementById("resetButton");//리셋버튼
let history=[];//입력했던 숫자 기록하기


playbutton.addEventListener("click",playit);//클릭하면 playit함수가 실행
resetbutton.addEventListener("click",gameReset);//클릭하면 RESET함수 실행
userinput.addEventListener("focus",function(){
    userinput.value="";
})//익명의 함수 씀,,포커스를 두면 function(){userinput.value=""}라는 익명함수 실행

function getRandomNumber(){
    cpuNumber=Math.floor(Math.random()*(100-1)+1);
    console.log("the number is",cpuNumber);
}//랜덤 숫자를 생성하는 함수.

getRandomNumber();//함수 호출.

//메인 게임 실행 함수.
function playit(){
    let userValue=userinput.value;//html입력창에 쓴 수치를 js변수에 할당하기
    if(userValue<1 || userValue>100){
        resultbox.textContent="1부터 100사이의 숫자를 입력하십시요."
        return;//숫자 범위 초과하면 알림.(1부터100)
    }
    if(history.includes(userValue)){
        resultbox.textContent="이미 입력했던 숫자입니다.";
        return;//입력했던 수자를 입력하면 알림.
    }
    if(userValue<cpuNumber){
        console.log("GO UP!!");
        chances--;
        resultbox.textContent=`더 큰 숫자입니다. 남은횟수:  ${chances} 회`;
        gameOver(); 
    
    }
    else if(userValue>cpuNumber){
        console.log("GO DOWN!!");
        chances--;
        resultbox.textContent=`더 작은 숫자입니다. 남은횟수:  ${chances} 회`;
        gameOver();
    }
    else{
        let successaudio=new Audio("success.mp3");
        successaudio.play();
        resultbox.textContent="축하합니다.숫자를 맞추었습니다.";
        console.log("Congratulations!");
        playbutton.disabled=true;
    }
    history.push(userValue);
    console.log(history);

}

//게임 종료를 알려주는 함수.
function gameOver(){
    if(chances<1){
        let falseaudio=new Audio("false.mp3");
        falseaudio.play();
        console.log("YOU LOSE!!"); 
        resultbox.textContent=`GAME OVER!!
        정확한 숫자는 ${cpuNumber} 이 였습니다.다시 시작할려면 [RESET] 버튼을 클릭해 주십시오.`;
        playbutton.disabled=true;
    }
}


//다시시작하기 함수.
function gameReset(){
    getRandomNumber();
    playbutton.disabled=false;
    resultbox.textContent="결과창";
    userinput.textContent="";
    chances=5;
}

function clickbutton(){
    let audio=new Audio("clicksound.mp3");
    audio.play();
}

function mutemusic(){
    let bgaudio=document.getElementById("backgroundmusic");
    if(!bgaudio.paused){
        bgaudio.pause();
        isPlaying=false;
    }
    else{
        bgaudio.play();
        isPlaying=true;
    }
} 

