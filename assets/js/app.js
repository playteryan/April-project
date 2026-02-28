(function(){
  const toast = document.getElementById("toast");
  window.showToast = function(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"), 1600);
  };

  // Mobile drawer
  const btn = document.getElementById("hamburger");
  const overlay = document.getElementById("drawerOverlay");
  const closeBtn = document.getElementById("drawerClose");
  function closeNav(){ document.body.classList.remove("nav-open"); }
  function openNav(){ document.body.classList.add("nav-open"); }
  btn?.addEventListener("click", ()=>{
    document.body.classList.contains("nav-open") ? closeNav() : openNav();
  });
  overlay?.addEventListener("click", closeNav);
  closeBtn?.addEventListener("click", closeNav);
  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape") closeNav();
  });

  // A tiny "suspicious" mutation on hover (only on elements marked data-sus="1")
  document.querySelectorAll("[data-sus='1']").forEach(el=>{
    const original = el.textContent;
    el.addEventListener("mouseenter", ()=>{
      if(Math.random() < 0.15){
        el.textContent = original.replace(/about/i, "abort").replace(/About/, "Abort");
        setTimeout(()=>el.textContent = original, 220);
      }
    });
  });

  // Redaction reveal click
  document.querySelectorAll("[data-reveal]").forEach(el=>{
    el.addEventListener("click", ()=>{
      const reveal = el.getAttribute("data-reveal");
      el.classList.toggle("reveal");
      el.textContent = el.classList.contains("reveal") ? reveal : "REDACTED";
      window.showToast(el.classList.contains("reveal") ? "Recovered fragment." : "Hidden again.");
      try{ localStorage.setItem("apr1_any_clue","true"); }catch(e){}
      const portalHint = document.getElementById("portalHint");
      if(portalHint){ portalHint.classList.remove("hidden"); }
    });
  });

  // Contact faux-submit
  const contactBtn = document.getElementById("contactSend");
  if(contactBtn){
    contactBtn.addEventListener("click", (e)=>{
      e.preventDefault();
      const msg = document.getElementById("contactMsg");
      if(msg){
        msg.textContent = "Your message has been archived.";
        msg.classList.remove("hidden");
      }
      window.showToast("Observed.");
      try{ localStorage.setItem("apr1_any_clue","true"); }catch(e){}
      const portalHint = document.getElementById("portalHint");
      if(portalHint){ portalHint.classList.remove("hidden"); }
    });
  }

  // Scroll reveal (IntersectionObserver)
  const items = Array.from(document.querySelectorAll(".reveal-on-scroll"));
  if(items.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(el=> io.observe(el));
  }
})();
