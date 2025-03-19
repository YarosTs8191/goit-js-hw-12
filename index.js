import{a as l,S as u,i as d}from"./assets/vendor-DXaqCXe3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const f="49301647-30570283b511de5f9e60954e8",m="https://pixabay.com/api/";async function p(o){try{return(await l.get(m,{params:{key:f,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data.hits}catch(t){return console.error("Error fetching images:",t),[]}}const y=document.querySelector(".gallery");let g=new u(".gallery a",{captionsData:"alt",captionDelay:250});function h(o){y.innerHTML=o.map(({webformatURL:t,largeImageURL:i,tags:a,likes:e,views:r,comments:s,downloads:c})=>`
        <li class="gallery-item">
            <a href="${i}">
                <img src="${t}" alt="${a}" loading="lazy" />
            </a>
            <div class="info">
                <p>❤️ ${e} Likes</p>
                <p>👁️ ${r} Views</p>
                <p>💬 ${s} Comments</p>
                <p>⬇️ ${c} Downloads</p>
            </div>
        </li>
    `).join(""),g.refresh()}function L(){document.querySelector(".loader").classList.add("visible")}function b(){document.querySelector(".loader").classList.remove("visible")}function n(o){d.error({title:"Error",message:o,position:"topRight"})}document.querySelector(".form").addEventListener("submit",async o=>{o.preventDefault();const t=o.target.elements["search-text"].value.trim();if(!t){n("Please enter a search term!");return}L();const i=await p(t);b(),i.length===0?n("Sorry, there are no images matching your search query. Please try again!"):h(i)});
//# sourceMappingURL=index.js.map
