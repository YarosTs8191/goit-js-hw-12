import{a as h,S as L,i as b}from"./assets/vendor-DXaqCXe3.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const v="49301647-30570283b511de5f9e60954e8",E="https://pixabay.com/api/",P=15;async function d(r,o=1){try{return(await h.get(E,{params:{key:v,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:P,page:o}})).data.hits}catch(s){return console.error("Error fetching images:",s),[]}}const a=document.querySelector(".gallery");let S=new L(".gallery a",{captionsData:"alt",captionDelay:250});function f(r,o=!1){o||(a.innerHTML=""),a.insertAdjacentHTML("beforeend",r.map(({webformatURL:s,largeImageURL:n,tags:e,likes:t,views:i,comments:y,downloads:g})=>`
        <li class="gallery-item">
            <a href="${n}">
                <img src="${s}" alt="${e}" loading="lazy" />
            </a>
            <div class="info">
                <p>❤️ ${t} Likes</p>
                <p>👁️ ${i} Views</p>
                <p>💬 ${y} Comments</p>
                <p>⬇️ ${g} Downloads</p>
            </div>
        </li>
      `).join("")),S.refresh()}function m(){document.querySelector(".loader").classList.add("visible")}function p(){document.querySelector(".loader").classList.remove("visible")}function c(r){b.error({title:"Error",message:r,position:"topRight"})}document.querySelector(".form").addEventListener("submit",async r=>{r.preventDefault();const o=r.target.elements["search-text"].value.trim();if(!o){c("Please enter a search term!");return}m();const s=await d(o);p(),s.length===0?c("Sorry, there are no images matching your search query. Please try again!"):f(s)});let l=1,q="";const u=document.querySelector(".load-more");u.addEventListener("click",async()=>{l+=1,m();try{const r=await d(q,l);if(r.length===0){console.log("Більше зображень немає!"),u.classList.hidden=!0;return}f(r,!0)}catch(r){console.error("Помилка під час отримання даних:",r)}finally{p()}});
//# sourceMappingURL=index.js.map
