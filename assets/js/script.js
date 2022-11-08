const hole = document.querySelectorAll('.hole')
const mole = document.querySelectorAll('.mole')
const score = document.getElementById('score')
const hiscore = document.getElementById('hiscore')
const time = document.getElementById('time')
const pop = document.getElementById('pop')

let timeMin = 500
let timeMax = 1200
let over = true
let holeBefore
let scoreVal = 0
let hiscoreVal = 0
let timeVal = 10
let moleOut = false;

if(localStorage.highscore){
    hiscoreVal = localStorage.highscore
}else{
    localStorage.setItem('highscore', 0)
    hiscoreVal = localStorage.highscore
}

score.innerHTML = scoreVal
hiscore.innerHTML = hiscoreVal
time.innerHTML = timeVal

function start(){
    if(over){
        over = false
        scoreVal = 0
        score.innerHTML = scoreVal
        timeVal = 10
        time.innerHTML = timeVal
        upMole()
        setTimeout(() => {
            downAllMole()
            clearInterval(interval)
            over = true
            if(scoreVal > hiscoreVal){
                hiscoreVal = scoreVal
                localStorage.setItem('highscore', hiscoreVal)
                hiscore.innerHTML = hiscoreVal
            }
        }, 10000)
        var interval = setInterval(() => {
            if(!over){
                timeVal--
                time.innerHTML = timeVal
            }
        }, 999)
    }
}
function timeRandom(){
    math = Math.round(Math.random() * (timeMax - timeMin) + timeMin)
    return math
}
function randomOut(){
    const random = Math.floor(Math.random() * hole.length)
    if(random == holeBefore){
        return randomOut()
    }else{
        holeBefore = random
        return random
    }
}
function upMole(){
    rand = randomOut()
    let randHole = hole[rand]
    randHole.classList.add('out')
    timeRand = timeRandom()
    setTimeout(() => {
        if(moleOut){
            downMole(randHole)
        }
    }, timeRand)

}
function downMole(hole){
    hole.classList.remove('out')
    moleOut = false
    if(!over) upMole()
}
function whack(hole){
    scoreVal++
    score.innerHTML = scoreVal
    pop.play()
    parent = hole.closest('.hole')
    downMole(parent)
}
function downAllMole(){
    hole.forEach( h => {
        h.classList.remove('out')
    })
}
mole.forEach( m => {
    m.addEventListener('click', function(){
        whack(m)
    })
})
