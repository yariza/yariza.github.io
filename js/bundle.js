!function(t){function e(e){for(var n,r,a=e[0],i=e[1],s=0,c=[];s<a.length;s++)r=a[s],o[r]&&c.push(o[r][0]),o[r]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);for(u&&u(e);c.length;)c.shift()()}var n={},o={main:0};function r(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var a=new Promise(function(e,r){n=o[t]=[e,r]});e.push(n[2]=a);var i,s=document.getElementsByTagName("head")[0],u=document.createElement("script");u.charset="utf-8",u.timeout=120,r.nc&&u.setAttribute("nonce",r.nc),u.src=function(t){return r.p+""+t+".bundle.js"}(t),i=function(e){u.onerror=u.onload=null,clearTimeout(c);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src,i=new Error("Loading chunk "+t+" failed.\n("+r+": "+a+")");i.type=r,i.request=a,n[1](i)}o[t]=void 0}};var c=setTimeout(function(){i({type:"timeout",target:u})},12e4);u.onerror=u.onload=i,s.appendChild(u)}return Promise.all(e)},r.m=t,r.c=n,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/js/",r.oe=function(t){throw console.error(t),t};var a=window.webpackJsonp=window.webpackJsonp||[],i=a.push.bind(a);a.push=e,a=a.slice();for(var s=0;s<a.length;s++)e(a[s]);var u=i;r(r.s=1)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.isTouch=function(){var t=" -webkit- -moz- -o- -ms- ".split(" ");return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)||function(t){return window.matchMedia(t).matches}(["(",t.join("touch-enabled),("),"heartz",")"].join(""))}();var o=e.clamp=function(t,e,n){return Math.min(n,Math.max(e,t))};e.smoothdamp=function(t,e,n,r,a,i){var s=2/(r=max(0,r)),u=s*i,c=1/(1+u+.48*u*u+.235*u*u*u),l=t-e,d=e,f=a*r,m=(n+s*(l=o(l,-f,f)))*i;n=(n-s*m)*c;var p=(e=t-l)+(l+m)*c;return d-t>0==p>d&&(n=((p=d)-d)/i),[p,n]}},function(t,e,n){"use strict";var o=n(0),r=[{name:"waves",sketch:function(){return n.e("waves").then(n.t.bind(null,2,7))}},{name:"flow-field",sketch:function(){return n.e("flow-field").then(n.t.bind(null,3,7))}}],a=null,i=0,s=!0,u=!1;if(window.location.hash)for(var c=window.location.hash.slice(1),l=0;l<r.length;l++)if(r[l].name===c){i=l;break}Promise.all([r[i].sketch(),new Promise(function(t,e){document.addEventListener("DOMContentLoaded",t)})]).then(function(t){var e=t[0].default,n=function(t){s=t;var e=document.getElementsByClassName("sketch-mute-button")[0];s?(e.classList.toggle("fa-volume-up",!1),e.classList.toggle("fa-volume-off",!0)):(e.classList.toggle("fa-volume-up",!0),e.classList.toggle("fa-volume-off",!1))},c=function(){n(!s),s?a.mute():a.unmute()},l=function(t){var e=i+t;if(!(e<0||e>=r.length)){if(e!==i){i=e;var o=window.location;return window.location.assign(o.origin+o.pathname+"#"+r[i].name),void window.location.reload(!0)}u=!1,n(!0),document.getElementsByClassName("sketch-left")[0].classList.toggle("disabled",0===i),document.getElementsByClassName("sketch-right")[0].classList.toggle("disabled",i===r.length-1)}};l(0),function(){var t=(a=new e({eventTarget:document.body,container:document.body,retina:"auto"})).ctx.touchstart;a.ctx.touchstart=function(e){t&&t(e);var n=e.target.classList;!o.isTouch||"a"===e.target.tagName.toLowerCase()||n.contains("sketch-left")||n.contains("sketch-right")||e.preventDefault()},document.getElementsByClassName("sketch-mute")[0].style.display=a.supportsAudio()?"block":"none",document.getElementsByClassName("sketch-title")[0].textContent=a.getName();var n=a.ctx.element.style;n.position="absolute",n.left="0px",n.top="0px",n.zIndex="-1"}(),document.addEventListener("keydown",function(t){var e=t.key;"ArrowLeft"===e?l(-1):"ArrowRight"===e&&l(1),a.supportsAudio()&&u&&"m"===e&&c()}),document.addEventListener("click",function(t){t.target.classList.contains("sketch-left")?(l(-1),t.preventDefault(),t.stopPropagation()):t.target.classList.contains("sketch-right")?(l(1),t.preventDefault(),t.stopPropagation()):t.target.classList.contains("dark-mode")&&a.setDarkMode("dark"===document.body.id),u?t.target.classList.contains("sketch-mute-button")&&c():(u=!0,n(!1))})})}]);
//# sourceMappingURL=bundle.js.map