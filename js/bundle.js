!function(e){var t={};function r(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(i,n,function(t){return e[t]}.bind(null,n));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";var i=function(e){return e&&e.__esModule?e:{default:e}}(r(1));document.addEventListener("DOMContentLoaded",function(){var e=new[i.default][0]({eventTarget:document.body,container:document.body,retina:"auto"}).ctx.element.style;e.position="absolute",e.left="0px",e.top="0px",e.zIndex="-1"})},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(r(2)),n=a(r(3)),o=r(4);function a(e){return e&&e.__esModule?e:{default:e}}t.default=function e(t){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.getName=function(){return"flow-field"},this.bressenhamLine=function(e,t,r,i,n){var o=floor(e),a=floor(t),u=floor(r),s=floor(i),l=u-o,c=s-a,d=abs(c)>=abs(l);if(d){var f=o;o=a,a=f,f=u,l=(u=s)-o,c=(s=f)-a}var v=1;l<0&&(v=-1,l=-l);var g=1;c<0&&(g=-1,c=-c);for(var y=2*c,m=y-2*l,h=y-l,p=a,x=void 0,_=void 0,V=!1,D=o;D!=u;D+=v)d?(x=p,_=D):(x=D,_=p),n(x,_),h>0?(h+=m,p+=g):h+=y,V=!0;V||n(e,t)},this.clamp=function(e,t,r){return min(r,max(t,e))},this.smoothstep=function(e,t,i){return(i=r.clamp((i-e)/(t-e),0,1))*i*(3-2*i)},this.getValue=function(e,t,i){return e[i*(r.gridDim.x+2)+t]},this.setValue=function(e,t,i,n){e[i*(r.gridDim.x+2)+t]=n},this.getVelocity=function(e,t){return{x:r.getValue(r.next_velocity_u,e+1,t+1),y:r.getValue(r.next_velocity_v,e+1,t+1)}},this.setVelocity=function(e,t,i){r.setValue(r.next_velocity_u,e+1,t+1,i.x),r.setValue(r.next_velocity_v,e+1,t+1,i.y)},this.swap_u=function(){var e=r.next_velocity_u;r.next_velocity_u=r.next_velocity_u,r.next_velocity_u=e},this.swap_v=function(){var e=r.next_velocity_v;r.next_velocity_v=r.next_velocity_v,r.next_velocity_v=e},this.interpolateD=function(e,t,i){var n=r.clamp(floor(t),0,r.gridDim.x),o=n+1,a=r.clamp(floor(i),0,r.gridDim.y),u=a+1,s=r.clamp(t-n,0,1),l=r.clamp(i-a,0,1),c=r.getValue(e,n,a),d=r.getValue(e,n,u);return(c*(1-s)+r.getValue(e,o,a)*s)*(1-l)+(d*(1-s)+r.getValue(e,o,u)*s)*l},this.set_boundary_corners=function(e){r.setValue(e,0,0,.5*(r.getValue(e,1,0)+r.getValue(e,0,1))),r.setValue(e,0,r.gridDim.y+1,.5*(r.getValue(e,1,r.gridDim.y+1)+r.getValue(e,0,r.gridDim.y))),r.setValue(e,r.gridDim.x+1,0,.5*(r.getValue(e,r.gridDim.x,0)+r.getValue(e,r.gridDim.x+1,1))),r.setValue(e,r.gridDim.x+1,r.gridDim.y+1,.5*(r.getValue(e,r.gridDim.x,r.gridDim.y+1)+r.getValue(e,r.gridDim.x+1,r.gridDim.y)))},this.set_boundary_solid=function(e){for(var t=0;t<=r.gridDim.x+1;t++)r.setValue(e,t,0,r.getValue(e,t,1)),r.setValue(e,t,r.gridDim.y+1,r.getValue(e,t,r.gridDim.y));for(var i=0;i<=r.gridDim.y+1;i++)r.setValue(e,0,i,r.getValue(e,1,i)),r.setValue(e,r.gridDim.x+1,i,r.getValue(e,r.gridDim.x,i));r.set_boundary_corners(e)},this.set_boundary_horizontal=function(e){for(var t=0;t<=r.gridDim.x+1;t++)r.setValue(e,t,0,-r.getValue(e,t,1)),r.setValue(e,t,r.gridDim.y+1,-r.getValue(e,t,r.gridDim.y));for(var i=0;i<=r.gridDim.y+1;i++)r.setValue(e,0,i,r.getValue(e,1,i)),r.setValue(e,r.gridDim.x+1,i,r.getValue(e,r.gridDim.x,i));r.set_boundary_corners(e)},this.set_boundary_vertical=function(e){for(var t=0;t<=r.gridDim.x+1;t++)r.setValue(e,t,0,r.getValue(e,t,1)),r.setValue(e,t,r.gridDim.y+1,r.getValue(e,t,r.gridDim.y));for(var i=0;i<=r.gridDim.y+1;i++)r.setValue(e,0,i,-r.getValue(e,1,i)),r.setValue(e,r.gridDim.x+1,i,-r.getValue(e,r.gridDim.x,i));r.set_boundary_corners(e)},this.diffuse=function(e,t,i,n){for(var o=n*i/r.gridSize/r.gridSize,a=0;a<r.iterations;a++)for(var u=1;u<=r.gridDim.x;u++)for(var s=1;s<=r.gridDim.y;s++)r.setValue(e,u,s,(r.getValue(t,u,s)+o*(r.getValue(e,u-1,s)+r.getValue(e,u+1,s)+r.getValue(e,u,s-1)+r.getValue(e,u,s+1)))/(1+4*o))},this.advect=function(e,t,i,n,o){for(var a=1;a<=r.gridDim.x;a++)for(var u=1;u<=r.gridDim.y;u++){var s=a-r.getValue(i,a,u)*o/r.gridSize,l=u-r.getValue(n,a,u)*o/r.gridSize;r.setValue(e,a,u,r.interpolateD(t,s,l))}},this.project=function(e,t,i,n){for(var o=r.gridSize,a=1;a<=r.gridDim.x;a++)for(var u=1;u<=r.gridDim.y;u++)r.setValue(r.divergence,a,u,-.5*o*(r.getValue(r.next_velocity_u,a+1,u)-r.getValue(r.next_velocity_u,a-1,u)+r.getValue(r.next_velocity_v,a,u+1)-r.getValue(r.next_velocity_v,a,u-1))),r.setValue(r.pressure,a,u,0);r.set_boundary_solid(r.divergence),r.set_boundary_solid(r.pressure);for(var s=0;s<r.iterations;s++){for(var l=1;l<=r.gridDim.x;l++)for(var c=1;c<=r.gridDim.y;c++)r.setValue(r.pressure,l,c,(r.getValue(r.divergence,l,c)+r.getValue(r.pressure,l-1,c)+r.getValue(r.pressure,l+1,c)+r.getValue(r.pressure,l,c-1)+r.getValue(r.pressure,l,c+1))/4);r.set_boundary_solid(r.pressure)}for(var d=1;d<=r.gridDim.x;d++)for(var f=1;f<=r.gridDim.y;f++)r.setValue(r.next_velocity_u,d,f,r.getValue(r.next_velocity_u,d,f)-.5*(r.getValue(r.pressure,d+1,f)-r.getValue(r.pressure,d-1,f))/o),r.setValue(r.next_velocity_v,d,f,r.getValue(r.next_velocity_v,d,f)-.5*(r.getValue(r.pressure,d,f+1)-r.getValue(r.pressure,d,f-1))/o);r.set_boundary_vertical(e),r.set_boundary_horizontal(t)},this.vel_step=function(e,t,i,n,o,a){r.diffuse(i,e,o,a),r.set_boundary_vertical(i),r.diffuse(n,t,o,a),r.set_boundary_horizontal(n),r.project(i,n,e,t),r.advect(e,i,i,n,a),r.set_boundary_vertical(e),r.advect(t,n,i,n,a),r.set_boundary_horizontal(t),r.project(e,t,i,n)},this.computeCurl=function(e,t,i){var n=r.simplex.noise3D(e+1e-4,t,i),o=r.simplex.noise3D(e-1e-4,t,i),a=(n-o)/2e-4;return[((n=r.simplex.noise3D(e,t+1e-4,i))-(o=r.simplex.noise3D(e,t-1e-4,i)))/2e-4,-a]},this.add_velocity=function(e,t){for(var i=r.ctx.millis*r.noiseEvolution/1e3,n=1;n<=r.gridDim.x;n++)for(var o=1;o<=r.gridDim.y;o++){var a=r.computeCurl(n*r.noiseFreq,o*r.noiseFreq,i);r.setValue(e,n,o,r.getValue(e,n,o)+a[0]*r.noiseScale),r.setValue(t,n,o,r.getValue(t,n,o)+a[1]*r.noiseScale)}},this.resize=function(){r.gridDim.x=floor(r.ctx.width/r.gridSize),r.gridDim.y=floor(r.ctx.height/r.gridSize);var e=(r.gridDim.x+2)*(r.gridDim.y+2);r.next_velocity_u=new Float32Array(e),r.next_velocity_v=new Float32Array(e),r.next_velocity_u=new Float32Array(e),r.next_velocity_v=new Float32Array(e),r.divergence=new Float32Array(e),r.pressure=new Float32Array(e)},this.touchstart=function(e){o.isTouch&&"a"!==e.target.tagName.toLowerCase()&&e.preventDefault()},this.mousemove=function(){var e=r.ctx.mouse;if(0!==e.dx||0!==e.dy){var t=r.clamp(floor(e.x/r.gridSize),0,r.gridDim.x-1),i=r.clamp(floor(e.y/r.gridSize),0,r.gridDim.y-1),n=r.clamp(floor(e.ox/r.gridSize),0,r.gridDim.x-1),o=r.clamp(floor(e.oy/r.gridSize),0,r.gridDim.y-1);r.bressenhamLine(t,i,n,o,function(t,i){var n=r.getVelocity(t,i);n.x+=e.dx*r.mouseSpeed,n.y+=e.dy*r.mouseSpeed,r.setVelocity(t,i,n)})}},this.update=function(){r.add_velocity(r.next_velocity_u,r.next_velocity_v),r.next_velocity_u.set(r.next_velocity_u),r.next_velocity_v.set(r.next_velocity_v),r.vel_step(r.next_velocity_u,r.next_velocity_v,r.next_velocity_u,r.next_velocity_v,r.viscosity,r.ctx.dt*r.timeScale/1e3),r.swap_u(),r.swap_v()},this.draw=function(){r.ctx.lineWidth=2;for(var e=0;e<r.gridDim.y;e++)for(var t=e/(r.gridDim.y-1),i=r.smoothstep(.5,0,abs(t-.5)),n=0;n<r.gridDim.x;n++){var o={x:(n+.5)*r.gridSize,y:(e+.5)*r.gridSize},a=r.getVelocity(n,e);a.x=a.x,a.y=a.y;var u=sqrt(a.x*a.x+a.y*a.y);if(0!==u){var s=1-pow(1.5,-u/r.gridSize),l=floor(255*lerp(1,.4,i*s));r.ctx.strokeStyle="rgb("+l+", "+l+", "+l+")";var c=min(.7*r.gridSize,u/2);a.x=a.x*c/u,a.y=a.y*c/u,r.ctx.beginPath(),r.ctx.moveTo(o.x,o.y),r.ctx.lineTo(o.x+a.x,o.y+a.y),r.ctx.stroke()}}},this.viscosity=.3,this.gridSize=20,this.mouseSpeed=5,this.timeScale=5,this.iterations=20,this.noiseScale=.02,this.noiseFreq=.05,this.noiseEvolution=.2,this.gridDim={x:0,y:0},this.simplex=new i.default,this.ctx=n.default.create(t),this.ctx.resize=this.resize.bind(this),this.ctx.touchstart=this.touchstart.bind(this),this.ctx.mousemove=this.mousemove.bind(this),this.ctx.update=this.update.bind(this),this.ctx.draw=this.draw.bind(this)}},function(e,t,r){var i;!function(){"use strict";var n=.5*(Math.sqrt(3)-1),o=(3-Math.sqrt(3))/6,a=1/6,u=(Math.sqrt(5)-1)/4,s=(5-Math.sqrt(5))/20;function l(e){var t;t="function"==typeof e?e:e?function(){var e=0,t=0,r=0,i=1,n=function(){var e=4022871197;return function(t){t=t.toString();for(var r=0;r<t.length;r++){var i=.02519603282416938*(e+=t.charCodeAt(r));i-=e=i>>>0,e=(i*=e)>>>0,e+=4294967296*(i-=e)}return 2.3283064365386963e-10*(e>>>0)}}();e=n(" "),t=n(" "),r=n(" ");for(var o=0;o<arguments.length;o++)(e-=n(arguments[o]))<0&&(e+=1),(t-=n(arguments[o]))<0&&(t+=1),(r-=n(arguments[o]))<0&&(r+=1);return n=null,function(){var n=2091639*e+2.3283064365386963e-10*i;return e=t,t=r,r=n-(i=0|n)}}(e):Math.random,this.p=c(t),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(var r=0;r<512;r++)this.perm[r]=this.p[255&r],this.permMod12[r]=this.perm[r]%12}function c(e){var t,r=new Uint8Array(256);for(t=0;t<256;t++)r[t]=t;for(t=0;t<255;t++){var i=t+~~(e()*(256-t)),n=r[t];r[t]=r[i],r[i]=n}return r}l.prototype={grad3:new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),grad4:new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]),noise2D:function(e,t){var r,i,a=this.permMod12,u=this.perm,s=this.grad3,l=0,c=0,d=0,f=(e+t)*n,v=Math.floor(e+f),g=Math.floor(t+f),y=(v+g)*o,m=e-(v-y),h=t-(g-y);m>h?(r=1,i=0):(r=0,i=1);var p=m-r+o,x=h-i+o,_=m-1+2*o,V=h-1+2*o,D=255&v,b=255&g,w=.5-m*m-h*h;if(w>=0){var S=3*a[D+u[b]];l=(w*=w)*w*(s[S]*m+s[S+1]*h)}var M=.5-p*p-x*x;if(M>=0){var z=3*a[D+r+u[b+i]];c=(M*=M)*M*(s[z]*p+s[z+1]*x)}var T=.5-_*_-V*V;if(T>=0){var A=3*a[D+1+u[b+1]];d=(T*=T)*T*(s[A]*_+s[A+1]*V)}return 70*(l+c+d)},noise3D:function(e,t,r){var i,n,o,u,s,l,c,d,f,v,g=this.permMod12,y=this.perm,m=this.grad3,h=(e+t+r)*(1/3),p=Math.floor(e+h),x=Math.floor(t+h),_=Math.floor(r+h),V=(p+x+_)*a,D=e-(p-V),b=t-(x-V),w=r-(_-V);D>=b?b>=w?(s=1,l=0,c=0,d=1,f=1,v=0):D>=w?(s=1,l=0,c=0,d=1,f=0,v=1):(s=0,l=0,c=1,d=1,f=0,v=1):b<w?(s=0,l=0,c=1,d=0,f=1,v=1):D<w?(s=0,l=1,c=0,d=0,f=1,v=1):(s=0,l=1,c=0,d=1,f=1,v=0);var S=D-s+a,M=b-l+a,z=w-c+a,T=D-d+2*a,A=b-f+2*a,C=w-v+2*a,P=D-1+.5,E=b-1+.5,O=w-1+.5,j=255&p,k=255&x,F=255&_,L=.6-D*D-b*b-w*w;if(L<0)i=0;else{var N=3*g[j+y[k+y[F]]];i=(L*=L)*L*(m[N]*D+m[N+1]*b+m[N+2]*w)}var q=.6-S*S-M*M-z*z;if(q<0)n=0;else{var I=3*g[j+s+y[k+l+y[F+c]]];n=(q*=q)*q*(m[I]*S+m[I+1]*M+m[I+2]*z)}var R=.6-T*T-A*A-C*C;if(R<0)o=0;else{var W=3*g[j+d+y[k+f+y[F+v]]];o=(R*=R)*R*(m[W]*T+m[W+1]*A+m[W+2]*C)}var B=.6-P*P-E*E-O*O;if(B<0)u=0;else{var G=3*g[j+1+y[k+1+y[F+1]]];u=(B*=B)*B*(m[G]*P+m[G+1]*E+m[G+2]*O)}return 32*(i+n+o+u)},noise4D:function(e,t,r,i){var n,o,a,l,c,d,f,v,g,y,m,h,p,x,_,V,D,b=this.perm,w=this.grad4,S=(e+t+r+i)*u,M=Math.floor(e+S),z=Math.floor(t+S),T=Math.floor(r+S),A=Math.floor(i+S),C=(M+z+T+A)*s,P=e-(M-C),E=t-(z-C),O=r-(T-C),j=i-(A-C),k=0,F=0,L=0,N=0;P>E?k++:F++,P>O?k++:L++,P>j?k++:N++,E>O?F++:L++,E>j?F++:N++,O>j?L++:N++;var q=P-(d=k>=3?1:0)+s,I=E-(f=F>=3?1:0)+s,R=O-(v=L>=3?1:0)+s,W=j-(g=N>=3?1:0)+s,B=P-(y=k>=2?1:0)+2*s,G=E-(m=F>=2?1:0)+2*s,U=O-(h=L>=2?1:0)+2*s,H=j-(p=N>=2?1:0)+2*s,X=P-(x=k>=1?1:0)+3*s,Y=E-(_=F>=1?1:0)+3*s,Q=O-(V=L>=1?1:0)+3*s,K=j-(D=N>=1?1:0)+3*s,J=P-1+4*s,Z=E-1+4*s,$=O-1+4*s,ee=j-1+4*s,te=255&M,re=255&z,ie=255&T,ne=255&A,oe=.6-P*P-E*E-O*O-j*j;if(oe<0)n=0;else{var ae=b[te+b[re+b[ie+b[ne]]]]%32*4;n=(oe*=oe)*oe*(w[ae]*P+w[ae+1]*E+w[ae+2]*O+w[ae+3]*j)}var ue=.6-q*q-I*I-R*R-W*W;if(ue<0)o=0;else{var se=b[te+d+b[re+f+b[ie+v+b[ne+g]]]]%32*4;o=(ue*=ue)*ue*(w[se]*q+w[se+1]*I+w[se+2]*R+w[se+3]*W)}var le=.6-B*B-G*G-U*U-H*H;if(le<0)a=0;else{var ce=b[te+y+b[re+m+b[ie+h+b[ne+p]]]]%32*4;a=(le*=le)*le*(w[ce]*B+w[ce+1]*G+w[ce+2]*U+w[ce+3]*H)}var de=.6-X*X-Y*Y-Q*Q-K*K;if(de<0)l=0;else{var fe=b[te+x+b[re+_+b[ie+V+b[ne+D]]]]%32*4;l=(de*=de)*de*(w[fe]*X+w[fe+1]*Y+w[fe+2]*Q+w[fe+3]*K)}var ve=.6-J*J-Z*Z-$*$-ee*ee;if(ve<0)c=0;else{var ge=b[te+1+b[re+1+b[ie+1+b[ne+1]]]]%32*4;c=(ve*=ve)*ve*(w[ge]*J+w[ge+1]*Z+w[ge+2]*$+w[ge+3]*ee)}return 27*(n+o+a+l+c)}},l._buildPermutationTable=c,void 0===(i=function(){return l}.call(t,r,t,e))||(e.exports=i),t.SimplexNoise=l,e.exports=l}()},function(e,t,r){"use strict";var i,n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(o,a){"object"===n(t)?e.exports=a(o,o.document):void 0===(i=function(){return a(o,o.document)}.call(t,r,t,e))||(e.exports=i)}("undefined"!=typeof window?window:void 0,function(e,t){var r="E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min".split(" "),i=Math,n="canvas",o="dom",a=t,u=e,s=[],l={fullscreen:!0,autostart:!0,autoclear:!0,autopause:!0,container:a.body,interval:1,globals:!0,retina:!1,type:n},c={8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",27:"ESCAPE",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN"};function d(e){return"function"==typeof e}function f(e){return"string"==typeof e}function v(e,t,r){for(var i in t)!r&&i in e||(e[i]=t[i]);return e}function g(e,t){return function(){e.apply(t,arguments)}}function y(e){var t,r,i,l,y,m,h,p,x,_,V,D,b,w,z,T,A,C=0,P=[],E=!1,O=!1,j=u.devicePixelRatio||1,k=e.type==o,F=e.type==n,L={x:0,y:0,ox:0,oy:0,dx:0,dy:0},N=[e.eventTarget||e.element,U,"mousedown","touchstart",U,"mousemove","touchmove",U,"mouseup","touchend",U,"click",U,"mouseout",U,"mouseover",a,function(t){D=t.keyCode,b="keyup"==t.type,q[D]=q[function(e){return c[e]||String.fromCharCode(e)}(D)]=!b,I(e[t.type],t)},"keydown","keyup",u,function(t){e.autopause&&("blur"==t.type?X:H)();I(e[t.type],t)},"focus","blur",W,"resize"],q={};for(D in c)q[c[D]]=!1;function I(t){d(t)&&t.apply(e,[].splice.call(arguments,1))}function R(e){for(m=0;m<N.length;m++)f(x=N[m])?i[(e?"add":"remove")+"EventListener"].call(i,x,r,{passive:!1,capture:!1}):d(x)?r=x:i=x}function W(){i=k?e.style:e.canvas,h=k?"px":"",T=e.width,A=e.height,e.fullscreen&&(A=e.height=u.innerHeight,T=e.width=u.innerWidth),e.retina&&F&&j&&(i.style.height=A+"px",i.style.width=T+"px",T*=j,A*=j),i.height!==A&&(i.height=A+h),i.width!==T&&(i.width=T+h),F&&!e.autoclear&&e.retina&&e.scale(j,j),O&&I(e.resize)}function B(t,r){return function(e,t){y=t.getBoundingClientRect(),e.x=e.pageX-y.left-(u.scrollX||u.pageXOffset),e.y=e.pageY-y.top-(u.scrollY||u.pageYOffset)}(t,e.element),(r=r||{}).ox=r.x||t.x,r.oy=r.y||t.y,r.x=t.x,r.y=t.y,r.dx=r.x-r.ox,r.dy=r.y-r.oy,r}function G(t){if(t.currentTarget===e.element&&t.preventDefault(),(_=function(e){var t={};for(var r in e)"webkitMovementX"!==r&&"webkitMovementY"!==r&&(d(e[r])?t[r]=g(e[r],e):t[r]=e[r]);return t}(t)).originalEvent=t,_.touches)for(P.length=_.touches.length,m=0;m<_.touches.length;m++)P[m]=B(_.touches[m],P[m]);else P.length=0,P[0]=B(_,L);return v(L,P[0],!0),_}function U(t){for(t=G(t),w=(z=N.indexOf(V=t.type))-1,e.dragging=!!/down|start/.test(V)||!/up|end/.test(V)&&e.dragging;w;)f(N[w])?I(e[N[w--]],t):f(N[z])?I(e[N[z++]],t):w=0}function H(){e.now=+new Date,e.running=!0}function X(){e.running=!1}return v(e,{touches:P,mouse:L,keys:q,dragging:!1,running:!1,millis:0,now:NaN,dt:NaN,destroy:function(){l=e.element.parentNode,m=s.indexOf(e),l&&l.removeChild(e.element),~m&&s.splice(m,1),R(!1),X()},toggle:function(){(e.running?X:H)()},clear:function(){F&&e.clearRect(0,0,e.width*j,e.height*j)},start:H,stop:X}),s.push(e),e.autostart&&H(),R(!0),W(),function r(){M(t),t=S(r),O||(I(e.setup),O=d(e.setup)),E||(I(e.resize),E=d(e.resize)),e.running&&!C&&(e.dt=(p=+new Date)-e.now,e.millis+=e.dt,e.now=p,I(e.update),F&&(e.retina&&(e.save(),e.autoclear&&e.scale(j,j)),e.autoclear&&e.clear()),I(e.draw),F&&e.retina&&e.restore()),C=++C%e.interval}(),e}for(var m,h,p={CANVAS:n,WEB_GL:"webgl",WEBGL:"webgl",DOM:o,instances:s,install:function(e){if(!e.__hasSketch){for(var t=0;t<r.length;t++)e[r[t]]=i[r[t]];v(e,{TWO_PI:2*i.PI,HALF_PI:i.PI/2,QUARTER_PI:i.PI/4,random:function(e,t){return function(e){return"[object Array]"==Object.prototype.toString.call(e)}(e)?e[~~(i.random()*e.length)]:(function(e){return"number"==typeof e}(t)||(t=e||1,e=0),e+i.random()*(t-e))},lerp:function(e,t,r){return e+r*(t-e)},map:function(e,t,r,i,n){return(e-t)/(r-t)*(n-i)+i}}),e.__hasSketch=!0}},create:function(e){return(e=v(e||{},l)).globals&&p.install(self),m=e.element=e.element||a.createElement(e.type===o?"div":"canvas"),h=e.context=e.context||function(){switch(e.type){case n:return m.getContext("2d",e);case"webgl":return m.getContext("webgl",e)||m.getContext("experimental-webgl",e);case o:return m.canvas=m}}(),(e.container||a.body).appendChild(m),p.augment(h,e)},augment:function(e,t){return(t=v(t||{},l)).element=e.canvas||e,t.element.className+=" sketch",v(e,t,!0),y(e)}},x=["ms","moz","webkit","o"],_=self,V=0,D="AnimationFrame",b="request"+D,w="cancel"+D,S=_[b],M=_[w],z=0;z<x.length&&!S;z++)S=_[x[z]+"Request"+D],M=_[x[z]+"Cancel"+D];return _[b]=S=S||function(e){var t=+new Date,r=i.max(0,16-(t-V)),n=setTimeout(function(){e(t+r)},r);return V=t+r,n},_[w]=M=M||function(e){clearTimeout(e)},p})},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.isTouch=function(){var e=" -webkit- -moz- -o- -ms- ".split(" ");return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)||function(e){return window.matchMedia(e).matches}(["(",e.join("touch-enabled),("),"heartz",")"].join(""))}()}]);
//# sourceMappingURL=bundle.js.map