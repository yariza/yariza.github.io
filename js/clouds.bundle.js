(window.webpackJsonp=window.webpackJsonp||[]).push([["clouds"],[,,,function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=c(t(6)),r=c(t(7)),a=(t(0),c(t(8))),i=c(t(9));function c(n){return n&&n.__esModule?n:{default:n}}var u=function(n){function e(n){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var t=function(n,e){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?n:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.getName=function(){return"clouds"},t.supportsAudio=function(){return!1},t.setup=function(){t.time=0;var n=t.ctx.context;n.viewport(0,0,t.ctx.width,t.ctx.height);var e=n.createShader(n.VERTEX_SHADER);n.shaderSource(e,a.default),n.compileShader(e);var o=n.createShader(n.FRAGMENT_SHADER);n.shaderSource(o,i.default),n.compileShader(o),t.fs=o;var r=n.createProgram();n.attachShader(r,e),n.attachShader(r,o),n.linkProgram(r),t.program=r,n.getShaderParameter(e,n.COMPILE_STATUS)||(console.warn(a.default.split("\n").map(function(n,e){return("    "+e).slice(-4)+": "+n}).join("\n")),console.error(n.getShaderInfoLog(e))),n.getShaderParameter(o,n.COMPILE_STATUS)||(console.warn(i.default.split("\n").map(function(n,e){return("    "+e).slice(-4)+": "+n}).join("\n")),console.error(n.getShaderInfoLog(o))),n.getProgramParameter(r,n.LINK_STATUS)||console.error(n.getProgramInfoLog(r));var c=new Float32Array([-1,1,1,1,1,-1,-1,1,1,-1,-1,-1]),u=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,u),n.bufferData(n.ARRAY_BUFFER,c,n.STATIC_DRAW),n.useProgram(r),r.uColor=n.getUniformLocation(r,"_color"),n.uniform4fv(r.uColor,[0,.3,0,1]),r.uTime=n.getUniformLocation(r,"_time"),n.uniform1f(r.uTime,0),r.uResolution=n.getUniformLocation(r,"_resolution"),n.uniform2fv(r.uResolution,[t.ctx.width,t.ctx.height]),r.aVertexPosition=n.getAttribLocation(r,"position"),n.enableVertexAttribArray(r.aVertexPosition),n.vertexAttribPointer(r.aVertexPosition,2,n.FLOAT,!1,0,0),n.drawArrays(n.TRIANGLES,0,6)},t.resize=function(){t.ctx.context.viewport(0,0,t.ctx.width,t.ctx.height)},t.mousemove=function(){},t.update=function(){var n=t.ctx.dt/1e3;t.time+=n},t.draw=function(){t.stats&&(t.stats.end(),t.stats.begin());var n=t.ctx.context;n.uniform1f(t.program.uTime,t.time),n.uniform2fv(t.program.uResolution,[t.ctx.width,t.ctx.height]),n.drawArrays(n.TRIANGLES,0,6)},t.curDark=t.dark,t.ctx=o.default.create(Object.assign(n,{type:"webgl",retina:!1})),t.ctx.setup=t.setup.bind(t),t.ctx.resize=t.resize.bind(t),t.ctx.mousemove=t.mousemove.bind(t),t.ctx.update=t.update.bind(t),t.ctx.draw=t.draw.bind(t),t}return function(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(n,e):n.__proto__=e)}(e,r.default),e}();e.default=u},,,function(n,e,t){"use strict";var o,r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n};!function(a,i){"object"===r(e)?n.exports=i(a,a.document):void 0===(o=function(){return i(a,a.document)}.call(e,t,e,n))||(n.exports=o)}("undefined"!=typeof window?window:void 0,function(n,e){var t="E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min".split(" "),o=Math,r="canvas",a="dom",i=e,c=n,u=[],s={fullscreen:!0,autostart:!0,autoclear:!0,autopause:!0,container:i.body,interval:1,globals:!0,retina:!1,type:r},l={8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",27:"ESCAPE",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN"};function f(n){return"function"==typeof n}function p(n){return"string"==typeof n}function m(n,e,t){for(var o in e)!t&&o in n||(n[o]=e[o]);return n}function d(n,e){return function(){n.apply(e,arguments)}}function h(n){var e,t,o,s,h,v,g,y,_,x,w,b,S,P,D,T,E,C=0,R=[],L=!1,I=!1,z=c.devicePixelRatio||1,O=n.type==a,N=n.type==r,F={x:0,y:0,ox:0,oy:0,dx:0,dy:0},j=[n.eventTarget||n.element,V,"mousedown","touchstart",V,"mousemove","touchmove",V,"mouseup","touchend",V,"click",V,"mouseout",V,"mouseover",i,function(e){b=e.keyCode,S="keyup"==e.type,M[b]=M[function(n){return l[n]||String.fromCharCode(n)}(b)]=!S,G(n[e.type],e)},"keydown","keyup",c,function(e){n.autopause&&("blur"==e.type?q:W)();G(n[e.type],e)},"focus","blur",U,"resize"],M={};for(b in l)M[l[b]]=!1;function G(e){f(e)&&e.apply(n,[].splice.call(arguments,1))}function B(n){for(v=0;v<j.length;v++)p(_=j[v])?o[(n?"add":"remove")+"EventListener"].call(o,_,t,{passive:!1,capture:!1}):f(_)?t=_:o=_}function U(){o=O?n.style:n.canvas,g=O?"px":"",T=n.width,E=n.height,n.fullscreen&&(E=n.height=c.innerHeight,T=n.width=c.innerWidth),n.retina&&N&&z&&(o.style.height=E+"px",o.style.width=T+"px",T*=z,E*=z),o.height!==E&&(o.height=E+g),o.width!==T&&(o.width=T+g),N&&!n.autoclear&&n.retina&&n.scale(z,z),I&&G(n.resize)}function Y(e,t){return function(n,e){h=e.getBoundingClientRect(),n.x=n.pageX-h.left-(c.scrollX||c.pageXOffset),n.y=n.pageY-h.top-(c.scrollY||c.pageYOffset)}(e,n.element),(t=t||{}).ox=t.x||e.x,t.oy=t.y||e.y,t.x=e.x,t.y=e.y,t.dx=t.x-t.ox,t.dy=t.y-t.oy,t}function H(e){if(e.currentTarget===n.element&&e.preventDefault(),(x=function(n){var e={};for(var t in n)"webkitMovementX"!==t&&"webkitMovementY"!==t&&(f(n[t])?e[t]=d(n[t],n):e[t]=n[t]);return e}(e)).originalEvent=e,x.touches)for(R.length=x.touches.length,v=0;v<x.touches.length;v++)R[v]=Y(x.touches[v],R[v]);else R.length=0,R[0]=Y(x,F);return m(F,R[0],!0),x}function V(e){for(e=H(e),P=(D=j.indexOf(w=e.type))-1,n.dragging=!!/down|start/.test(w)||!/up|end/.test(w)&&n.dragging;P;)p(j[P])?G(n[j[P--]],e):p(j[D])?G(n[j[D++]],e):P=0}function W(){n.now=+new Date,n.running=!0}function q(){n.running=!1}return m(n,{touches:R,mouse:F,keys:M,dragging:!1,running:!1,millis:0,now:NaN,dt:NaN,destroy:function(){s=n.element.parentNode,v=u.indexOf(n),s&&s.removeChild(n.element),~v&&u.splice(v,1),B(!1),q()},toggle:function(){(n.running?q:W)()},clear:function(){N&&n.clearRect(0,0,n.width*z,n.height*z)},start:W,stop:q}),u.push(n),n.autostart&&W(),B(!0),U(),function t(){A(e),e=k(t),I||(G(n.setup),I=f(n.setup)),L||(G(n.resize),L=f(n.resize)),n.running&&!C&&(n.dt=(y=+new Date)-n.now,n.millis+=n.dt,n.now=y,G(n.update),N&&(n.retina&&(n.save(),n.autoclear&&n.scale(z,z)),n.autoclear&&n.clear()),G(n.draw),N&&n.retina&&n.restore()),C=++C%n.interval}(),n}for(var v,g,y={CANVAS:r,WEB_GL:"webgl",WEBGL:"webgl",DOM:a,instances:u,install:function(n){if(!n.__hasSketch){for(var e=0;e<t.length;e++)n[t[e]]=o[t[e]];m(n,{TWO_PI:2*o.PI,HALF_PI:o.PI/2,QUARTER_PI:o.PI/4,random:function(n,e){return function(n){return"[object Array]"==Object.prototype.toString.call(n)}(n)?n[~~(o.random()*n.length)]:(function(n){return"number"==typeof n}(e)||(e=n||1,n=0),n+o.random()*(e-n))},lerp:function(n,e,t){return n+t*(e-n)},map:function(n,e,t,o,r){return(n-e)/(t-e)*(r-o)+o}}),n.__hasSketch=!0}},create:function(n){return(n=m(n||{},s)).globals&&y.install(self),v=n.element=n.element||i.createElement(n.type===a?"div":"canvas"),g=n.context=n.context||function(){switch(n.type){case r:return v.getContext("2d",n);case"webgl":return v.getContext("webgl",n)||v.getContext("experimental-webgl",n);case a:return v.canvas=v}}(),(n.container||i.body).appendChild(v),y.augment(g,n)},augment:function(n,e){return(e=m(e||{},s)).element=n.canvas||n,e.element.className+=" sketch",m(n,e,!0),h(n)}},_=["ms","moz","webkit","o"],x=self,w=0,b="AnimationFrame",S="request"+b,P="cancel"+b,k=x[S],A=x[P],D=0;D<_.length&&!k;D++)k=x[_[D]+"Request"+b],A=x[_[D]+"Cancel"+b];return x[S]=k=k||function(n){var e=+new Date,t=o.max(0,16-(e-w)),r=setTimeout(function(){n(e+t)},t);return w=e+t,r},x[P]=A=A||function(n){clearTimeout(n)},y})},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=function n(){var e=this;!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.getName=function(){return"untitled"},this.supportsAudio=function(){return!1},this.setDarkMode=function(n){e.dark=!0===n?1:0},this.darkBG="#0e0e0e".match(/[A-Za-z0-9]{2}/g).map(function(n){return parseInt(n,16)/255}),this.lightBG="#ffffff".match(/[A-Za-z0-9]{2}/g).map(function(n){return parseInt(n,16)/255}),this.dark="dark"===document.body.id?1:0}},function(n,e){n.exports="#define GLSLIFY 1\nattribute vec2 position;\n\nvarying vec2 uv;\n\nvoid main() {\n    uv = position * 0.5 + 0.5;\n    gl_Position = vec4(position, 0.0, 1.0);\n}\n"},function(n,e){n.exports="precision highp float;\n#define GLSLIFY 1\n\nuniform vec4 _color;\nuniform float _time;\nuniform vec2 _resolution;\n\nuniform float _noiseFreq;\n\nvarying vec2 uv;\n\n// #pragma glslify: fbm_9_2D = require(../../include/fbm/2D/fbm_9_2D)\nfloat hash1_1D_3_0( float n )\n{\n    return fract( n*17.0*fract( n*0.3183099 ) );\n}\n\n\n\n\nfloat noise_3D_2_1( in vec3 x )\n{\n    vec3 p = floor(x);\n    vec3 w = fract(x);\n    \n    vec3 u = w*w*w*(w*(w*6.0-15.0)+10.0);\n    \n    float n = p.x + 317.0*p.y + 157.0*p.z;\n    \n    float a = hash1_1D_3_0(n+0.0);\n    float b = hash1_1D_3_0(n+1.0);\n    float c = hash1_1D_3_0(n+317.0);\n    float d = hash1_1D_3_0(n+318.0);\n    float e = hash1_1D_3_0(n+157.0);\n\tfloat f = hash1_1D_3_0(n+158.0);\n    float g = hash1_1D_3_0(n+474.0);\n    float h = hash1_1D_3_0(n+475.0);\n\n    float k0 =   a;\n    float k1 =   b - a;\n    float k2 =   c - a;\n    float k3 =   e - a;\n    float k4 =   a - b - c + d;\n    float k5 =   a - c - e + g;\n    float k6 =   a - b - e + f;\n    float k7 = - a + b + c - d + e - f - g + h;\n\n    return -1.0+2.0*(k0 + k1*u.x + k2*u.y + k3*u.z + k4*u.x*u.y + k5*u.y*u.z + k6*u.z*u.x + k7*u.x*u.y*u.z);\n}\n\n\n\n\nconst mat3 m3_1_2  = mat3( 0.00,  0.80,  0.60,\n                      -0.80,  0.36, -0.48,\n                      -0.60, -0.48,  0.64 );\n\nfloat fbm_4_3D_1_3( in vec3 x )\n{\n    float f = 2.0;\n    float s = 0.5;\n    float a = 0.0;\n    float b = 0.5;\n\n    // #pragma unroll_loop\n    for( int i=0; i<5; i++ )\n    {\n        float n = noise_3D_2_1(x);\n        a += b*n;\n        b *= s;\n        x = f*m3_1_2*x;\n    }\n\treturn a;\n}\n\n\n\n\n\nmat3 setCamera( vec3 ro, vec3 ta, float cr )\n{\n\tvec3 cw = normalize(ta-ro);\n\tvec3 cp = vec3(sin(cr), cos(cr),0.0);\n\tvec3 cu = normalize( cross(cw,cp) );\n\tvec3 cv = normalize( cross(cu,cw) );\n    return mat3( cu, cv, cw );\n}\n\nfloat rayPlaneIntersection( vec3 ro, vec3 rd, vec3 po, vec3 pn)\n{\n    float denom = dot(pn, rd);\n    float t = dot(po - ro, pn) / denom;\n    return t;\n}\n\nfloat map(vec3 pos)\n{\n    float density = clamp(noise_3D_2_1(pos * 0.4 + vec3(0.1, 0.04, 0.1) * _time), 0.0, 1.0);\n    density -= smoothstep(4.0, 10.0, pos.y);\n    density *= smoothstep(0.0, 1.0, pos.y);\n    density -= 0.1;\n    return clamp(density, 0.0, 1.0);\n}\n\nfloat raymarch(vec3 cameraPos, vec3 rayDir)\n{\n    float alpha = 0.0;\n    vec3 pos = cameraPos;\n    float stepSize = 0.5;\n    float weight = stepSize;\n    for (int i = 0; i < 64; i++)\n    {\n        alpha += map(pos) * weight;\n        if (alpha > 1.0) return 1.0;\n        pos += rayDir * stepSize;\n        // stepSize *= 1.2;\n    }\n    return alpha;\n}\n\nvoid main()\n{\n    float aspectRatio = _resolution.x / _resolution.y;\n    vec2 p = (uv - 0.5) * vec2(aspectRatio, 1.0);\n\n    // gl_FragColor = vec4(fract(p * 10.0), 0.0, 1.0);\n    // return;\n    \n    vec3 cameraPos = vec3(0.0, 10.0, -80.0);\n    vec3 cameraTarget = vec3(0.0, 0.0, 0.0);\n\n    mat3 cameraMat = setCamera(cameraPos, cameraTarget, 0.0);\n    vec3 rayDir = cameraMat * normalize(vec3(p.xy, 1.0));\n\n    vec3 planeNormal = vec3(0.0, 1.0, 0.0);\n    vec3 planeCenter = vec3(0.0, 10.0, 0.0);\n\n    float t = rayPlaneIntersection(cameraPos, rayDir, planeCenter, planeNormal);\n\n    vec3 startPos = cameraPos;    \n    if (t > 0.0) {\n        startPos += rayDir * t;\n    }\n\n    float alpha = raymarch(startPos, rayDir);\n    gl_FragColor = mix(vec4(0.3, 0.3, 0.5, 1.0), vec4(0.8, 0.8, 0.8, 1.0), alpha);\n    return;\n\n    vec2 pix = uv * _resolution;\n\n    gl_FragColor = vec4(fract(pix / 20.0), 0.0, 1.0);\n}\n"}]]);
//# sourceMappingURL=clouds.bundle.js.map