(function(){
  const toast = document.getElementById("toast");
  window.showToast = function(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"), 1600);
  }

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
    });
  }

  // Portal link visibility (optional): show portal hint once any clue revealed
  const anyRevealed = !!localStorage.getItem("apr1_any_clue");
  const portalHint = document.getElementById("portalHint");
  if(portalHint && anyRevealed){
    portalHint.classList.remove("hidden");
  }
})();
