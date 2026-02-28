/**
 * Edit this ONE line to change the access key.
 * NOTE: This is for "experience" (not real security).
 */
const ACCESS_KEY = "0401";

(function(){
  // Allow friends to enter archive directly if already unlocked
  const unlocked = localStorage.getItem("apr1_unlocked") === "true";
  const guard = document.querySelector("[data-guard]");
  if(guard){
    guard.classList.toggle("hidden", !unlocked);
  }

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

function markClueFound(){
  // Call this when you reveal any clue to gently unlock the portal hint
  localStorage.setItem("apr1_any_clue", "true");
}
