/**
 * Change this to your access key.
 * NOTE: This is for "experience" (not real security).
 */
const ACCESS_KEY = "0401";

(function(){
  const form = document.getElementById("portalForm");
  if(!form) return;

  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const input = document.getElementById("accessKey");
    const err = document.getElementById("portalError");
    const ok = document.getElementById("portalOk");

    const val = (input?.value || "").trim();
    if(val === ACCESS_KEY){
      localStorage.setItem("apr1_unlocked","true");
      if(ok){ ok.style.display = "block"; }
      if(err){ err.style.display = "none"; }
      setTimeout(()=>{ window.location.href = "archive/index.html"; }, 350);
    } else {
      if(err){ err.style.display = "block"; }
      if(ok){ ok.style.display = "none"; }
      input?.focus();
      input?.select();
    }
  });
})();
