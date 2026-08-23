const nav=document.querySelector('.nav');
document.querySelector('.menu').addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>10));

const toggle=document.querySelector('.theme-toggle');
const saved=localStorage.getItem('theme');
if(saved==='dark') document.body.classList.add('dark');
toggle.textContent=document.body.classList.contains('dark')?'☼':'☀';
toggle.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  const dark=document.body.classList.contains('dark');
  localStorage.setItem('theme',dark?'dark':'light');
  toggle.textContent=dark?'☼':'☀';
});
