document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("year").textContent=new Date().getFullYear();

  // QR otomatis mengarah ke halaman saat ini.
  if(window.QRCode){
    new QRCode(document.getElementById("qrcode"),{
      text:window.location.href.split("#")[0],
      width:150,height:150,
      colorDark:"#7252b0",colorLight:"#ffffff",
      correctLevel:QRCode.CorrectLevel.H
    });
  }

  // Mobile menu
  const toggle=document.querySelector(".menu-toggle");
  const nav=document.querySelector(".navbar nav");
  toggle?.addEventListener("click",()=>nav.classList.toggle("open"));
  nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  // Reveal on scroll
  const items=document.querySelectorAll(".reveal");
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  items.forEach((el,i)=>{
    el.style.transitionDelay=`${Math.min(i*45,300)}ms`;
    observer.observe(el);
  });

  // Mouse parallax untuk desktop
  const art=document.querySelector(".hero-art");
  const img=art?.querySelector("img");
  if(art && img && matchMedia("(pointer:fine)").matches){
    art.addEventListener("mousemove",e=>{
      const r=art.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      img.style.transform=`translate(${x*10}px,${y*8}px) rotate(${x*2}deg)`;
    });
    art.addEventListener("mouseleave",()=>img.style.transform="");
  }
});