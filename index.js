import{a as g,S as h,i as L}from"./assets/vendor-DXaqCXe3.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const b="49301647-30570283b511de5f9e60954e8",S="https://pixabay.com/api/",q=15;async function u(r,o=1){try{return(await g.get(S,{params:{key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:q,page:o}})).data.hits}catch(s){return console.error("Error fetching images:",s),[]}}const a=document.querySelector(".gallery");let v=new h(".gallery a",{captionsData:"alt",captionDelay:250});function d(r,o=!1){o||(a.innerHTML=""),a.insertAdjacentHTML("beforeend",r.map(({webformatURL:s,largeImageURL:n,tags:e,likes:t,views:i,comments:p,downloads:y})=>`
        <li class="gallery-item">
            <a href="${n}">
                <img src="${s}" alt="${e}" loading="lazy" />
            </a>
            <div class="info">
                <p>❤️ ${t} Likes</p>
                <p>👁️ ${i} Views</p>
                <p>💬 ${p} Comments</p>
                <p>⬇️ ${y} Downloads</p>
            </div>
        </li>
      `).join("")),v.refresh()}function f(){document.querySelector(".loader").classList.add("visible")}function m(){document.querySelector(".loader").classList.remove("visible")}function c(r){L.error({title:"Error",message:r,position:"topRight"})}document.querySelector(".form").addEventListener("submit",async r=>{r.preventDefault();const o=r.target.elements["search-text"].value.trim();if(!o){c("Please enter a search term!");return}f();const s=await u(o);m(),s.length===0?c("Sorry, there are no images matching your search query. Please try again!"):d(s)});let l=1,E="";document.querySelector(".load-more").addEventListener("click",async()=>{l+=1,f();try{const r=await u(E,l);if(r.length===0){console.log("Більше зображень немає!"),document.querySelector(".load-more").style.display="none";return}d(r,!0)}catch(r){console.error("Помилка під час отримання даних:",r)}finally{m()}});
//# sourceMappingURL=index.js.map
