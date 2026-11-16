'use strict';
(() => {
  document.querySelectorAll('[data-mood]').forEach(button=>button.addEventListener('click',()=>{
    const mood=button.dataset.mood;if(!['blue','sand','green'].includes(mood))return;
    const preview=document.querySelector('.live-preview');if(!preview)return;
    preview.dataset.moodTheme=mood;
    document.querySelectorAll('[data-mood]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  }));
  const progress=document.querySelector('.reading-progress');
  let scheduled=false;
  const updateProgress=()=>{const distance=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${distance>0?Math.min(1,Math.max(0,scrollY/distance)):0})`;scheduled=false;};
  if(progress){addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress);}},{passive:true});addEventListener('resize',updateProgress);updateProgress();}
  // Content is always visible; motion adds emphasis rather than gating access.
  if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('arrived');observer.unobserve(entry.target);}});},{threshold:.08});
    document.querySelectorAll('.sectiontop,.value-grid article,.package-grid article,.project').forEach(el=>observer.observe(el));
  }
})();
