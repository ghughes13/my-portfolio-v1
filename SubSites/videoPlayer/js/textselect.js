const vid = document.querySelector("video");
const caption = document.querySelectorAll('span');

vid.addEventListener('timeupdate', () => {
  for(let i = 0;i < caption.length; i++){
  if(vid.currentTime >= caption[i].getAttribute('data-start') && vid.currentTime < caption[i].getAttribute('data-end')){
    caption[i].style.color = 'orange';
  } else {
    caption[i].style.color = 'black';
  }
 }
});

for(let i = 0; i < caption.length; i++) {
  caption[i].addEventListener('click', () => {
    let goto = caption[i].getAttribute('data-start');
    vid.currentTime = goto;
  });
}
