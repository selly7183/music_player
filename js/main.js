const frame = document.querySelector('section');
const list = frame.querySelectorAll('article');
const prev = document.querySelector('.btnPrev');
const next = document.querySelector('.btnNext'); 
const names = ['Blizzards', 'Calm', 'Dusty_Road', 'Escape', 'Payday', 'Retreat', 'Seasonal', 'Vespers'];
const len = list.length;    //article list 갯수 
const deg = 360/len;    //8개 패널 한바퀴 돌림(45도)
let num = 0;    //초기화
let active = 0;

names.forEach((name, index) =>{
    const pic = list[index].querySelector('.pic');
    const h2 = list[index].querySelector('.txt h2');
    list[index].style.transform = `rotate(${deg*index}deg) translateY(-100vh)`;
    pic.style.backgroundImage = `url(img/${name}.jpg)`;
    h2.innerText = name;

    const audio = document.createElement('audio');
    audio.setAttribute('src',`music/${name}.mp3`);
    audio.setAttribute('loop', 'loop');
    list[index].append(audio);
})


prev.addEventListener('click', e=>{
    //console.log(--num);     
    //초기값을 한번 받고 시작하기 때문에 0부터 찍힘. 그래서 --를 전위로 바꿔줌.

    frame.style.transform = `rotate(${deg* ++num}deg)`; //시계방향으로 돌아야해서 ++

    (active===0) ? active = len-1 : active--;   
    for(let el of list) el.classList.remove('on');
    list[active].classList.add('on');
})

next.addEventListener('click',e=>{
    //console.log(++num);
    frame.style.transform = `rotate(${deg* --num}deg)`; //반시계방향으로 돌아야해서 --

    (active == len-1) ? active = 0 : active++;
    for(let el of list) el.classList.remove('on');
    list[active].classList.add('on');
})

for(let el of list){
    const play = el.querySelector('.play');
    const pause = el.querySelector('.pause');
    const load = el.querySelector('.load');

    play.addEventListener('click',e=>{
        e.currentTarget.closest('article').querySelector('.pic').classList.add('on');
        e.currentTarget.closest('article').querySelector('audio').play();
    })
    pause.addEventListener('click', e=>{
        e.currentTarget.closest('article').querySelector('.pic').classList.remove('on');
        e.currentTarget.closest('article').querySelector('audio').pause();
    })

    load.addEventListener('click',e=>{
        e.currentTarget.closest('article').querySelector('.pic').classList.add('on');
        e.currentTarget.closest('article').querySelector('audio').load();
        e.currentTarget.closest('article').querySelector('audio').play();
    })
}