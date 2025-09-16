/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ba(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Te={},Or=[],Ut=()=>{},sd=()=>!1,Fu=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),qa=t=>t.startsWith("onUpdate:"),lt=Object.assign,ja=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},pg=Object.prototype.hasOwnProperty,_e=(t,e)=>pg.call(t,e),se=Array.isArray,Mr=t=>Ou(t)==="[object Map]",id=t=>Ou(t)==="[object Set]",oe=t=>typeof t=="function",ke=t=>typeof t=="string",Qn=t=>typeof t=="symbol",Se=t=>t!==null&&typeof t=="object",ud=t=>(Se(t)||oe(t))&&oe(t.then)&&oe(t.catch),od=Object.prototype.toString,Ou=t=>od.call(t),mg=t=>Ou(t).slice(8,-1),ad=t=>Ou(t)==="[object Object]",$a=t=>ke(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Ns=Ba(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Mu=t=>{const e=Object.create(null);return(n=>e[n]||(e[n]=t(n)))},gg=/-\w/g,Un=Mu(t=>t.replace(gg,e=>e.slice(1).toUpperCase())),_g=/\B([A-Z])/g,Jn=Mu(t=>t.replace(_g,"-$1").toLowerCase()),cd=Mu(t=>t.charAt(0).toUpperCase()+t.slice(1)),Ro=Mu(t=>t?`on${cd(t)}`:""),Nn=(t,e)=>!Object.is(t,e),Ki=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},ld=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},ta=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let $l;const Lu=()=>$l||($l=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function za(t){if(se(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=ke(r)?Tg(r):za(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(ke(t)||Se(t))return t}const yg=/;(?![^(]*\))/g,bg=/:([^]+)/,Eg=/\/\*[^]*?\*\//g;function Tg(t){const e={};return t.replace(Eg,"").split(yg).forEach(n=>{if(n){const r=n.split(bg);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Ha(t){let e="";if(ke(t))e=t;else if(se(t))for(let n=0;n<t.length;n++){const r=Ha(t[n]);r&&(e+=r+" ")}else if(Se(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const vg="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ig=Ba(vg);function hd(t){return!!t||t===""}const fd=t=>!!(t&&t.__v_isRef===!0),wg=t=>ke(t)?t:t==null?"":se(t)||Se(t)&&(t.toString===od||!oe(t.toString))?fd(t)?wg(t.value):JSON.stringify(t,dd,2):String(t),dd=(t,e)=>fd(e)?dd(t,e.value):Mr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[Do(r,i)+" =>"]=s,n),{})}:id(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Do(n))}:Qn(e)?Do(e):Se(e)&&!se(e)&&!ad(e)?String(e):e,Do=(t,e="")=>{var n;return Qn(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ft;class Ag{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=ft,!e&&ft&&(this.index=(ft.scopes||(ft.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=ft;try{return ft=this,e()}finally{ft=n}}}on(){++this._on===1&&(this.prevScope=ft,ft=this)}off(){this._on>0&&--this._on===0&&(ft=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Cg(){return ft}let ve;const xo=new WeakSet;class pd{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ft&&ft.active&&ft.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,xo.has(this)&&(xo.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||gd(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,zl(this),_d(this);const e=ve,n=xt;ve=this,xt=!0;try{return this.fn()}finally{yd(this),ve=e,xt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Ka(e);this.deps=this.depsTail=void 0,zl(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?xo.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){na(this)&&this.run()}get dirty(){return na(this)}}let md=0,ks,Fs;function gd(t,e=!1){if(t.flags|=8,e){t.next=Fs,Fs=t;return}t.next=ks,ks=t}function Wa(){md++}function Ga(){if(--md>0)return;if(Fs){let e=Fs;for(Fs=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;ks;){let e=ks;for(ks=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function _d(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function yd(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),Ka(r),Sg(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function na(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(bd(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function bd(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===Ws)||(t.globalVersion=Ws,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!na(t))))return;t.flags|=2;const e=t.dep,n=ve,r=xt;ve=t,xt=!0;try{_d(t);const s=t.fn(t._value);(e.version===0||Nn(s,t._value))&&(t.flags|=128,t._value=s,e.version++)}catch(s){throw e.version++,s}finally{ve=n,xt=r,yd(t),t.flags&=-3}}function Ka(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Ka(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Sg(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let xt=!0;const Ed=[];function an(){Ed.push(xt),xt=!1}function cn(){const t=Ed.pop();xt=t===void 0?!0:t}function zl(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=ve;ve=void 0;try{e()}finally{ve=n}}}let Ws=0;class Rg{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Qa{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!ve||!xt||ve===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==ve)n=this.activeLink=new Rg(ve,this),ve.deps?(n.prevDep=ve.depsTail,ve.depsTail.nextDep=n,ve.depsTail=n):ve.deps=ve.depsTail=n,Td(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=ve.depsTail,n.nextDep=void 0,ve.depsTail.nextDep=n,ve.depsTail=n,ve.deps===n&&(ve.deps=r)}return n}trigger(e){this.version++,Ws++,this.notify(e)}notify(e){Wa();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Ga()}}}function Td(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)Td(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const ra=new WeakMap,cr=Symbol(""),sa=Symbol(""),Gs=Symbol("");function nt(t,e,n){if(xt&&ve){let r=ra.get(t);r||ra.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new Qa),s.map=r,s.key=n),s.track()}}function nn(t,e,n,r,s,i){const o=ra.get(t);if(!o){Ws++;return}const a=c=>{c&&c.trigger()};if(Wa(),e==="clear")o.forEach(a);else{const c=se(t),h=c&&$a(n);if(c&&n==="length"){const d=Number(r);o.forEach((m,_)=>{(_==="length"||_===Gs||!Qn(_)&&_>=d)&&a(m)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),h&&a(o.get(Gs)),e){case"add":c?h&&a(o.get("length")):(a(o.get(cr)),Mr(t)&&a(o.get(sa)));break;case"delete":c||(a(o.get(cr)),Mr(t)&&a(o.get(sa)));break;case"set":Mr(t)&&a(o.get(cr));break}}Ga()}function Rr(t){const e=ge(t);return e===t?e:(nt(e,"iterate",Gs),It(t)?e:e.map(Ke))}function Uu(t){return nt(t=ge(t),"iterate",Gs),t}const Dg={__proto__:null,[Symbol.iterator](){return Po(this,Symbol.iterator,Ke)},concat(...t){return Rr(this).concat(...t.map(e=>se(e)?Rr(e):e))},entries(){return Po(this,"entries",t=>(t[1]=Ke(t[1]),t))},every(t,e){return Zt(this,"every",t,e,void 0,arguments)},filter(t,e){return Zt(this,"filter",t,e,n=>n.map(Ke),arguments)},find(t,e){return Zt(this,"find",t,e,Ke,arguments)},findIndex(t,e){return Zt(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return Zt(this,"findLast",t,e,Ke,arguments)},findLastIndex(t,e){return Zt(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return Zt(this,"forEach",t,e,void 0,arguments)},includes(...t){return Vo(this,"includes",t)},indexOf(...t){return Vo(this,"indexOf",t)},join(t){return Rr(this).join(t)},lastIndexOf(...t){return Vo(this,"lastIndexOf",t)},map(t,e){return Zt(this,"map",t,e,void 0,arguments)},pop(){return As(this,"pop")},push(...t){return As(this,"push",t)},reduce(t,...e){return Hl(this,"reduce",t,e)},reduceRight(t,...e){return Hl(this,"reduceRight",t,e)},shift(){return As(this,"shift")},some(t,e){return Zt(this,"some",t,e,void 0,arguments)},splice(...t){return As(this,"splice",t)},toReversed(){return Rr(this).toReversed()},toSorted(t){return Rr(this).toSorted(t)},toSpliced(...t){return Rr(this).toSpliced(...t)},unshift(...t){return As(this,"unshift",t)},values(){return Po(this,"values",Ke)}};function Po(t,e,n){const r=Uu(t),s=r[e]();return r!==t&&!It(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=n(i.value)),i}),s}const xg=Array.prototype;function Zt(t,e,n,r,s,i){const o=Uu(t),a=o!==t&&!It(t),c=o[e];if(c!==xg[e]){const m=c.apply(t,i);return a?Ke(m):m}let h=n;o!==t&&(a?h=function(m,_){return n.call(this,Ke(m),_,t)}:n.length>2&&(h=function(m,_){return n.call(this,m,_,t)}));const d=c.call(o,h,r);return a&&s?s(d):d}function Hl(t,e,n,r){const s=Uu(t);let i=n;return s!==t&&(It(t)?n.length>3&&(i=function(o,a,c){return n.call(this,o,a,c,t)}):i=function(o,a,c){return n.call(this,o,Ke(a),c,t)}),s[e](i,...r)}function Vo(t,e,n){const r=ge(t);nt(r,"iterate",Gs);const s=r[e](...n);return(s===-1||s===!1)&&Za(n[0])?(n[0]=ge(n[0]),r[e](...n)):s}function As(t,e,n=[]){an(),Wa();const r=ge(t)[e].apply(t,n);return Ga(),cn(),r}const Pg=Ba("__proto__,__v_isRef,__isVue"),vd=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Qn));function Vg(t){Qn(t)||(t=String(t));const e=ge(this);return nt(e,"has",t),e.hasOwnProperty(t)}class Id{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?jg:Sd:i?Cd:Ad).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=se(e);if(!s){let c;if(o&&(c=Dg[n]))return c;if(n==="hasOwnProperty")return Vg}const a=Reflect.get(e,n,st(e)?e:r);return(Qn(n)?vd.has(n):Pg(n))||(s||nt(e,"get",n),i)?a:st(a)?o&&$a(n)?a:a.value:Se(a)?s?Rd(a):Xa(a):a}}class wd extends Id{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];if(!this._isShallow){const c=Bn(i);if(!It(r)&&!Bn(r)&&(i=ge(i),r=ge(r)),!se(e)&&st(i)&&!st(r))return c||(i.value=r),!0}const o=se(e)&&$a(n)?Number(n)<e.length:_e(e,n),a=Reflect.set(e,n,r,st(e)?e:s);return e===ge(s)&&(o?Nn(r,i)&&nn(e,"set",n,r):nn(e,"add",n,r)),a}deleteProperty(e,n){const r=_e(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&nn(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!Qn(n)||!vd.has(n))&&nt(e,"has",n),r}ownKeys(e){return nt(e,"iterate",se(e)?"length":cr),Reflect.ownKeys(e)}}class Ng extends Id{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const kg=new wd,Fg=new Ng,Og=new wd(!0);const ia=t=>t,Ui=t=>Reflect.getPrototypeOf(t);function Mg(t,e,n){return function(...r){const s=this.__v_raw,i=ge(s),o=Mr(i),a=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,h=s[t](...r),d=n?ia:e?au:Ke;return!e&&nt(i,"iterate",c?sa:cr),{next(){const{value:m,done:_}=h.next();return _?{value:m,done:_}:{value:a?[d(m[0]),d(m[1])]:d(m),done:_}},[Symbol.iterator](){return this}}}}function Bi(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Lg(t,e){const n={get(s){const i=this.__v_raw,o=ge(i),a=ge(s);t||(Nn(s,a)&&nt(o,"get",s),nt(o,"get",a));const{has:c}=Ui(o),h=e?ia:t?au:Ke;if(c.call(o,s))return h(i.get(s));if(c.call(o,a))return h(i.get(a));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!t&&nt(ge(s),"iterate",cr),s.size},has(s){const i=this.__v_raw,o=ge(i),a=ge(s);return t||(Nn(s,a)&&nt(o,"has",s),nt(o,"has",a)),s===a?i.has(s):i.has(s)||i.has(a)},forEach(s,i){const o=this,a=o.__v_raw,c=ge(a),h=e?ia:t?au:Ke;return!t&&nt(c,"iterate",cr),a.forEach((d,m)=>s.call(i,h(d),h(m),o))}};return lt(n,t?{add:Bi("add"),set:Bi("set"),delete:Bi("delete"),clear:Bi("clear")}:{add(s){!e&&!It(s)&&!Bn(s)&&(s=ge(s));const i=ge(this);return Ui(i).has.call(i,s)||(i.add(s),nn(i,"add",s,s)),this},set(s,i){!e&&!It(i)&&!Bn(i)&&(i=ge(i));const o=ge(this),{has:a,get:c}=Ui(o);let h=a.call(o,s);h||(s=ge(s),h=a.call(o,s));const d=c.call(o,s);return o.set(s,i),h?Nn(i,d)&&nn(o,"set",s,i):nn(o,"add",s,i),this},delete(s){const i=ge(this),{has:o,get:a}=Ui(i);let c=o.call(i,s);c||(s=ge(s),c=o.call(i,s)),a&&a.call(i,s);const h=i.delete(s);return c&&nn(i,"delete",s,void 0),h},clear(){const s=ge(this),i=s.size!==0,o=s.clear();return i&&nn(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=Mg(s,t,e)}),n}function Ja(t,e){const n=Lg(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(_e(n,s)&&s in r?n:r,s,i)}const Ug={get:Ja(!1,!1)},Bg={get:Ja(!1,!0)},qg={get:Ja(!0,!1)};const Ad=new WeakMap,Cd=new WeakMap,Sd=new WeakMap,jg=new WeakMap;function $g(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function zg(t){return t.__v_skip||!Object.isExtensible(t)?0:$g(mg(t))}function Xa(t){return Bn(t)?t:Ya(t,!1,kg,Ug,Ad)}function Hg(t){return Ya(t,!1,Og,Bg,Cd)}function Rd(t){return Ya(t,!0,Fg,qg,Sd)}function Ya(t,e,n,r,s){if(!Se(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=zg(t);if(i===0)return t;const o=s.get(t);if(o)return o;const a=new Proxy(t,i===2?r:n);return s.set(t,a),a}function Lr(t){return Bn(t)?Lr(t.__v_raw):!!(t&&t.__v_isReactive)}function Bn(t){return!!(t&&t.__v_isReadonly)}function It(t){return!!(t&&t.__v_isShallow)}function Za(t){return t?!!t.__v_raw:!1}function ge(t){const e=t&&t.__v_raw;return e?ge(e):t}function Wg(t){return!_e(t,"__v_skip")&&Object.isExtensible(t)&&ld(t,"__v_skip",!0),t}const Ke=t=>Se(t)?Xa(t):t,au=t=>Se(t)?Rd(t):t;function st(t){return t?t.__v_isRef===!0:!1}function N4(t){return Gg(t,!1)}function Gg(t,e){return st(t)?t:new Kg(t,e)}class Kg{constructor(e,n){this.dep=new Qa,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:ge(e),this._value=n?e:Ke(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||It(e)||Bn(e);e=r?e:ge(e),Nn(e,n)&&(this._rawValue=e,this._value=r?e:Ke(e),this.dep.trigger())}}function Qg(t){return st(t)?t.value:t}const Jg={get:(t,e,n)=>e==="__v_raw"?t:Qg(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return st(s)&&!st(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function Dd(t){return Lr(t)?t:new Proxy(t,Jg)}class Xg{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Qa(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ws-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&ve!==this)return gd(this,!0),!0}get value(){const e=this.dep.track();return bd(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Yg(t,e,n=!1){let r,s;return oe(t)?r=t:(r=t.get,s=t.set),new Xg(r,s,n)}const qi={},cu=new WeakMap;let ur;function Zg(t,e=!1,n=ur){if(n){let r=cu.get(n);r||cu.set(n,r=[]),r.push(t)}}function e1(t,e,n=Te){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:a,call:c}=n,h=H=>s?H:It(H)||s===!1||s===0?rn(H,1):rn(H);let d,m,_,A,D=!1,k=!1;if(st(t)?(m=()=>t.value,D=It(t)):Lr(t)?(m=()=>h(t),D=!0):se(t)?(k=!0,D=t.some(H=>Lr(H)||It(H)),m=()=>t.map(H=>{if(st(H))return H.value;if(Lr(H))return h(H);if(oe(H))return c?c(H,2):H()})):oe(t)?e?m=c?()=>c(t,2):t:m=()=>{if(_){an();try{_()}finally{cn()}}const H=ur;ur=d;try{return c?c(t,3,[A]):t(A)}finally{ur=H}}:m=Ut,e&&s){const H=m,he=s===!0?1/0:s;m=()=>rn(H(),he)}const L=Cg(),$=()=>{d.stop(),L&&L.active&&ja(L.effects,d)};if(i&&e){const H=e;e=(...he)=>{H(...he),$()}}let K=k?new Array(t.length).fill(qi):qi;const Q=H=>{if(!(!(d.flags&1)||!d.dirty&&!H))if(e){const he=d.run();if(s||D||(k?he.some((we,I)=>Nn(we,K[I])):Nn(he,K))){_&&_();const we=ur;ur=d;try{const I=[he,K===qi?void 0:k&&K[0]===qi?[]:K,A];K=he,c?c(e,3,I):e(...I)}finally{ur=we}}}else d.run()};return a&&a(Q),d=new pd(m),d.scheduler=o?()=>o(Q,!1):Q,A=H=>Zg(H,!1,d),_=d.onStop=()=>{const H=cu.get(d);if(H){if(c)c(H,4);else for(const he of H)he();cu.delete(d)}},e?r?Q(!0):K=d.run():o?o(Q.bind(null,!0),!0):d.run(),$.pause=d.pause.bind(d),$.resume=d.resume.bind(d),$.stop=$,$}function rn(t,e=1/0,n){if(e<=0||!Se(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,st(t))rn(t.value,e,n);else if(se(t))for(let r=0;r<t.length;r++)rn(t[r],e,n);else if(id(t)||Mr(t))t.forEach(r=>{rn(r,e,n)});else if(ad(t)){for(const r in t)rn(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&rn(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function li(t,e,n,r){try{return r?t(...r):t()}catch(s){Bu(s,e,n)}}function Gt(t,e,n,r){if(oe(t)){const s=li(t,e,n,r);return s&&ud(s)&&s.catch(i=>{Bu(i,e,n)}),s}if(se(t)){const s=[];for(let i=0;i<t.length;i++)s.push(Gt(t[i],e,n,r));return s}}function Bu(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Te;if(e){let a=e.parent;const c=e.proxy,h=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const d=a.ec;if(d){for(let m=0;m<d.length;m++)if(d[m](t,c,h)===!1)return}a=a.parent}if(i){an(),li(i,null,10,[t,c,h]),cn();return}}t1(t,n,s,r,o)}function t1(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const at=[];let kt=-1;const Ur=[];let In=null,Dr=0;const xd=Promise.resolve();let lu=null;function n1(t){const e=lu||xd;return t?e.then(this?t.bind(this):t):e}function r1(t){let e=kt+1,n=at.length;for(;e<n;){const r=e+n>>>1,s=at[r],i=Ks(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function ec(t){if(!(t.flags&1)){const e=Ks(t),n=at[at.length-1];!n||!(t.flags&2)&&e>=Ks(n)?at.push(t):at.splice(r1(e),0,t),t.flags|=1,Pd()}}function Pd(){lu||(lu=xd.then(Nd))}function s1(t){se(t)?Ur.push(...t):In&&t.id===-1?In.splice(Dr+1,0,t):t.flags&1||(Ur.push(t),t.flags|=1),Pd()}function Wl(t,e,n=kt+1){for(;n<at.length;n++){const r=at[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;at.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Vd(t){if(Ur.length){const e=[...new Set(Ur)].sort((n,r)=>Ks(n)-Ks(r));if(Ur.length=0,In){In.push(...e);return}for(In=e,Dr=0;Dr<In.length;Dr++){const n=In[Dr];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}In=null,Dr=0}}const Ks=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Nd(t){try{for(kt=0;kt<at.length;kt++){const e=at[kt];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),li(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;kt<at.length;kt++){const e=at[kt];e&&(e.flags&=-2)}kt=-1,at.length=0,Vd(),lu=null,(at.length||Ur.length)&&Nd()}}let vt=null,kd=null;function hu(t){const e=vt;return vt=t,kd=t&&t.type.__scopeId||null,e}function i1(t,e=vt,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&nh(-1);const i=hu(e);let o;try{o=t(...s)}finally{hu(i),r._d&&nh(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function k4(t,e){if(vt===null)return t;const n=zu(vt),r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,o,a,c=Te]=e[s];i&&(oe(i)&&(i={mounted:i,updated:i}),i.deep&&rn(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:a,modifiers:c}))}return t}function sr(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];i&&(a.oldValue=i[o].value);let c=a.dir[r];c&&(an(),Gt(c,n,8,[t.el,a,t,e]),cn())}}const u1=Symbol("_vte"),o1=t=>t.__isTeleport,a1=Symbol("_leaveCb");function tc(t,e){t.shapeFlag&6&&t.component?(t.transition=e,tc(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Fd(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const fu=new WeakMap;function Os(t,e,n,r,s=!1){if(se(t)){t.forEach((D,k)=>Os(D,e&&(se(e)?e[k]:e),n,r,s));return}if(Ms(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Os(t,e,n,r.component.subTree);return}const i=r.shapeFlag&4?zu(r.component):r.el,o=s?null:i,{i:a,r:c}=t,h=e&&e.r,d=a.refs===Te?a.refs={}:a.refs,m=a.setupState,_=ge(m),A=m===Te?sd:D=>_e(_,D);if(h!=null&&h!==c){if(Gl(e),ke(h))d[h]=null,A(h)&&(m[h]=null);else if(st(h)){h.value=null;const D=e;D.k&&(d[D.k]=null)}}if(oe(c))li(c,a,12,[o,d]);else{const D=ke(c),k=st(c);if(D||k){const L=()=>{if(t.f){const $=D?A(c)?m[c]:d[c]:c.value;if(s)se($)&&ja($,i);else if(se($))$.includes(i)||$.push(i);else if(D)d[c]=[i],A(c)&&(m[c]=d[c]);else{const K=[i];c.value=K,t.k&&(d[t.k]=K)}}else D?(d[c]=o,A(c)&&(m[c]=o)):k&&(c.value=o,t.k&&(d[t.k]=o))};if(o){const $=()=>{L(),fu.delete(t)};$.id=-1,fu.set(t,$),gt($,n)}else Gl(t),L()}}}function Gl(t){const e=fu.get(t);e&&(e.flags|=8,fu.delete(t))}Lu().requestIdleCallback;Lu().cancelIdleCallback;const Ms=t=>!!t.type.__asyncLoader,Od=t=>t.type.__isKeepAlive;function c1(t,e){Md(t,"a",e)}function l1(t,e){Md(t,"da",e)}function Md(t,e,n=ct){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(qu(e,r,n),n){let s=n.parent;for(;s&&s.parent;)Od(s.parent.vnode)&&h1(r,e,n,s),s=s.parent}}function h1(t,e,n,r){const s=qu(e,t,r,!0);Ld(()=>{ja(r[e],s)},n)}function qu(t,e,n=ct,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{an();const a=hi(n),c=Gt(e,n,t,o);return a(),cn(),c});return r?s.unshift(i):s.push(i),i}}const mn=t=>(e,n=ct)=>{(!Js||t==="sp")&&qu(t,(...r)=>e(...r),n)},f1=mn("bm"),d1=mn("m"),p1=mn("bu"),m1=mn("u"),g1=mn("bum"),Ld=mn("um"),_1=mn("sp"),y1=mn("rtg"),b1=mn("rtc");function E1(t,e=ct){qu("ec",t,e)}const T1=Symbol.for("v-ndc");function F4(t,e,n,r){let s;const i=n,o=se(t);if(o||ke(t)){const a=o&&Lr(t);let c=!1,h=!1;a&&(c=!It(t),h=Bn(t),t=Uu(t)),s=new Array(t.length);for(let d=0,m=t.length;d<m;d++)s[d]=e(c?h?au(Ke(t[d])):Ke(t[d]):t[d],d,void 0,i)}else if(typeof t=="number"){s=new Array(t);for(let a=0;a<t;a++)s[a]=e(a+1,a,void 0,i)}else if(Se(t))if(t[Symbol.iterator])s=Array.from(t,(a,c)=>e(a,c,void 0,i));else{const a=Object.keys(t);s=new Array(a.length);for(let c=0,h=a.length;c<h;c++){const d=a[c];s[c]=e(t[d],d,c,i)}}else s=[];return s}const ua=t=>t?u0(t)?zu(t):ua(t.parent):null,Ls=lt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>ua(t.parent),$root:t=>ua(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Bd(t),$forceUpdate:t=>t.f||(t.f=()=>{ec(t.update)}),$nextTick:t=>t.n||(t.n=n1.bind(t.proxy)),$watch:t=>$1.bind(t)}),No=(t,e)=>t!==Te&&!t.__isScriptSetup&&_e(t,e),v1={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:a,appContext:c}=t;let h;if(e[0]!=="$"){const A=o[e];if(A!==void 0)switch(A){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(No(r,e))return o[e]=1,r[e];if(s!==Te&&_e(s,e))return o[e]=2,s[e];if((h=t.propsOptions[0])&&_e(h,e))return o[e]=3,i[e];if(n!==Te&&_e(n,e))return o[e]=4,n[e];oa&&(o[e]=0)}}const d=Ls[e];let m,_;if(d)return e==="$attrs"&&nt(t.attrs,"get",""),d(t);if((m=a.__cssModules)&&(m=m[e]))return m;if(n!==Te&&_e(n,e))return o[e]=4,n[e];if(_=c.config.globalProperties,_e(_,e))return _[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return No(s,e)?(s[e]=n,!0):r!==Te&&_e(r,e)?(r[e]=n,!0):_e(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i,type:o}},a){let c,h;return!!(n[a]||t!==Te&&a[0]!=="$"&&_e(t,a)||No(e,a)||(c=i[0])&&_e(c,a)||_e(r,a)||_e(Ls,a)||_e(s.config.globalProperties,a)||(h=o.__cssModules)&&h[a])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:_e(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Kl(t){return se(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let oa=!0;function I1(t){const e=Bd(t),n=t.proxy,r=t.ctx;oa=!1,e.beforeCreate&&Ql(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:a,provide:c,inject:h,created:d,beforeMount:m,mounted:_,beforeUpdate:A,updated:D,activated:k,deactivated:L,beforeDestroy:$,beforeUnmount:K,destroyed:Q,unmounted:H,render:he,renderTracked:we,renderTriggered:I,errorCaptured:g,serverPrefetch:E,expose:T,inheritAttrs:w,components:S,directives:b,filters:pt}=e;if(h&&w1(h,r,null),o)for(const be in o){const pe=o[be];oe(pe)&&(r[be]=pe.bind(n))}if(s){const be=s.call(n,n);Se(be)&&(t.data=Xa(be))}if(oa=!0,i)for(const be in i){const pe=i[be],At=oe(pe)?pe.bind(n,n):oe(pe.get)?pe.get.bind(n,n):Ut,Xn=!oe(pe)&&oe(pe.set)?pe.set.bind(n):Ut,Qt=p_({get:At,set:Xn});Object.defineProperty(r,be,{enumerable:!0,configurable:!0,get:()=>Qt.value,set:Fe=>Qt.value=Fe})}if(a)for(const be in a)Ud(a[be],r,n,be);if(c){const be=oe(c)?c.call(n):c;Reflect.ownKeys(be).forEach(pe=>{x1(pe,be[pe])})}d&&Ql(d,t,"c");function je(be,pe){se(pe)?pe.forEach(At=>be(At.bind(n))):pe&&be(pe.bind(n))}if(je(f1,m),je(d1,_),je(p1,A),je(m1,D),je(c1,k),je(l1,L),je(E1,g),je(b1,we),je(y1,I),je(g1,K),je(Ld,H),je(_1,E),se(T))if(T.length){const be=t.exposed||(t.exposed={});T.forEach(pe=>{Object.defineProperty(be,pe,{get:()=>n[pe],set:At=>n[pe]=At,enumerable:!0})})}else t.exposed||(t.exposed={});he&&t.render===Ut&&(t.render=he),w!=null&&(t.inheritAttrs=w),S&&(t.components=S),b&&(t.directives=b),E&&Fd(t)}function w1(t,e,n=Ut){se(t)&&(t=aa(t));for(const r in t){const s=t[r];let i;Se(s)?"default"in s?i=Qi(s.from||r,s.default,!0):i=Qi(s.from||r):i=Qi(s),st(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function Ql(t,e,n){Gt(se(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function Ud(t,e,n,r){let s=r.includes(".")?Zd(n,r):()=>n[r];if(ke(t)){const i=e[t];oe(i)&&Fo(s,i)}else if(oe(t))Fo(s,t.bind(n));else if(Se(t))if(se(t))t.forEach(i=>Ud(i,e,n,r));else{const i=oe(t.handler)?t.handler.bind(n):e[t.handler];oe(i)&&Fo(s,i,t)}}function Bd(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,a=i.get(e);let c;return a?c=a:!s.length&&!n&&!r?c=e:(c={},s.length&&s.forEach(h=>du(c,h,o,!0)),du(c,e,o)),Se(e)&&i.set(e,c),c}function du(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&du(t,i,n,!0),s&&s.forEach(o=>du(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const a=A1[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const A1={data:Jl,props:Xl,emits:Xl,methods:Rs,computed:Rs,beforeCreate:ot,created:ot,beforeMount:ot,mounted:ot,beforeUpdate:ot,updated:ot,beforeDestroy:ot,beforeUnmount:ot,destroyed:ot,unmounted:ot,activated:ot,deactivated:ot,errorCaptured:ot,serverPrefetch:ot,components:Rs,directives:Rs,watch:S1,provide:Jl,inject:C1};function Jl(t,e){return e?t?function(){return lt(oe(t)?t.call(this,this):t,oe(e)?e.call(this,this):e)}:e:t}function C1(t,e){return Rs(aa(t),aa(e))}function aa(t){if(se(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function ot(t,e){return t?[...new Set([].concat(t,e))]:e}function Rs(t,e){return t?lt(Object.create(null),t,e):e}function Xl(t,e){return t?se(t)&&se(e)?[...new Set([...t,...e])]:lt(Object.create(null),Kl(t),Kl(e??{})):e}function S1(t,e){if(!t)return e;if(!e)return t;const n=lt(Object.create(null),t);for(const r in e)n[r]=ot(t[r],e[r]);return n}function qd(){return{app:null,config:{isNativeTag:sd,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let R1=0;function D1(t,e){return function(r,s=null){oe(r)||(r=lt({},r)),s!=null&&!Se(s)&&(s=null);const i=qd(),o=new WeakSet,a=[];let c=!1;const h=i.app={_uid:R1++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:m_,get config(){return i.config},set config(d){},use(d,...m){return o.has(d)||(d&&oe(d.install)?(o.add(d),d.install(h,...m)):oe(d)&&(o.add(d),d(h,...m))),h},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),h},component(d,m){return m?(i.components[d]=m,h):i.components[d]},directive(d,m){return m?(i.directives[d]=m,h):i.directives[d]},mount(d,m,_){if(!c){const A=h._ceVNode||on(r,s);return A.appContext=i,_===!0?_="svg":_===!1&&(_=void 0),t(A,d,_),c=!0,h._container=d,d.__vue_app__=h,zu(A.component)}},onUnmount(d){a.push(d)},unmount(){c&&(Gt(a,h._instance,16),t(null,h._container),delete h._container.__vue_app__)},provide(d,m){return i.provides[d]=m,h},runWithContext(d){const m=Br;Br=h;try{return d()}finally{Br=m}}};return h}}let Br=null;function x1(t,e){if(ct){let n=ct.provides;const r=ct.parent&&ct.parent.provides;r===n&&(n=ct.provides=Object.create(r)),n[t]=e}}function Qi(t,e,n=!1){const r=a_();if(r||Br){let s=Br?Br._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&oe(e)?e.call(r&&r.proxy):e}}const jd={},$d=()=>Object.create(jd),zd=t=>Object.getPrototypeOf(t)===jd;function P1(t,e,n,r=!1){const s={},i=$d();t.propsDefaults=Object.create(null),Hd(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:Hg(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function V1(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,a=ge(s),[c]=t.propsOptions;let h=!1;if((r||o>0)&&!(o&16)){if(o&8){const d=t.vnode.dynamicProps;for(let m=0;m<d.length;m++){let _=d[m];if(ju(t.emitsOptions,_))continue;const A=e[_];if(c)if(_e(i,_))A!==i[_]&&(i[_]=A,h=!0);else{const D=Un(_);s[D]=ca(c,a,D,A,t,!1)}else A!==i[_]&&(i[_]=A,h=!0)}}}else{Hd(t,e,s,i)&&(h=!0);let d;for(const m in a)(!e||!_e(e,m)&&((d=Jn(m))===m||!_e(e,d)))&&(c?n&&(n[m]!==void 0||n[d]!==void 0)&&(s[m]=ca(c,a,m,void 0,t,!0)):delete s[m]);if(i!==a)for(const m in i)(!e||!_e(e,m))&&(delete i[m],h=!0)}h&&nn(t.attrs,"set","")}function Hd(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,a;if(e)for(let c in e){if(Ns(c))continue;const h=e[c];let d;s&&_e(s,d=Un(c))?!i||!i.includes(d)?n[d]=h:(a||(a={}))[d]=h:ju(t.emitsOptions,c)||(!(c in r)||h!==r[c])&&(r[c]=h,o=!0)}if(i){const c=ge(n),h=a||Te;for(let d=0;d<i.length;d++){const m=i[d];n[m]=ca(s,c,m,h[m],t,!_e(h,m))}}return o}function ca(t,e,n,r,s,i){const o=t[n];if(o!=null){const a=_e(o,"default");if(a&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&oe(c)){const{propsDefaults:h}=s;if(n in h)r=h[n];else{const d=hi(s);r=h[n]=c.call(null,e),d()}}else r=c;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!a?r=!1:o[1]&&(r===""||r===Jn(n))&&(r=!0))}return r}const N1=new WeakMap;function Wd(t,e,n=!1){const r=n?N1:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},a=[];let c=!1;if(!oe(t)){const d=m=>{c=!0;const[_,A]=Wd(m,e,!0);lt(o,_),A&&a.push(...A)};!n&&e.mixins.length&&e.mixins.forEach(d),t.extends&&d(t.extends),t.mixins&&t.mixins.forEach(d)}if(!i&&!c)return Se(t)&&r.set(t,Or),Or;if(se(i))for(let d=0;d<i.length;d++){const m=Un(i[d]);Yl(m)&&(o[m]=Te)}else if(i)for(const d in i){const m=Un(d);if(Yl(m)){const _=i[d],A=o[m]=se(_)||oe(_)?{type:_}:lt({},_),D=A.type;let k=!1,L=!0;if(se(D))for(let $=0;$<D.length;++$){const K=D[$],Q=oe(K)&&K.name;if(Q==="Boolean"){k=!0;break}else Q==="String"&&(L=!1)}else k=oe(D)&&D.name==="Boolean";A[0]=k,A[1]=L,(k||_e(A,"default"))&&a.push(m)}}const h=[o,a];return Se(t)&&r.set(t,h),h}function Yl(t){return t[0]!=="$"&&!Ns(t)}const nc=t=>t==="_"||t==="_ctx"||t==="$stable",rc=t=>se(t)?t.map(Ot):[Ot(t)],k1=(t,e,n)=>{if(e._n)return e;const r=i1((...s)=>rc(e(...s)),n);return r._c=!1,r},Gd=(t,e,n)=>{const r=t._ctx;for(const s in t){if(nc(s))continue;const i=t[s];if(oe(i))e[s]=k1(s,i,r);else if(i!=null){const o=rc(i);e[s]=()=>o}}},Kd=(t,e)=>{const n=rc(e);t.slots.default=()=>n},Qd=(t,e,n)=>{for(const r in e)(n||!nc(r))&&(t[r]=e[r])},F1=(t,e,n)=>{const r=t.slots=$d();if(t.vnode.shapeFlag&32){const s=e._;s?(Qd(r,e,n),n&&ld(r,"_",s,!0)):Gd(e,r)}else e&&Kd(t,e)},O1=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=Te;if(r.shapeFlag&32){const a=e._;a?n&&a===1?i=!1:Qd(s,e,n):(i=!e.$stable,Gd(e,s)),o=e}else e&&(Kd(t,e),o={default:1});if(i)for(const a in s)!nc(a)&&o[a]==null&&delete s[a]},gt=X1;function M1(t){return L1(t)}function L1(t,e){const n=Lu();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:a,createComment:c,setText:h,setElementText:d,parentNode:m,nextSibling:_,setScopeId:A=Ut,insertStaticContent:D}=t,k=(y,v,x,O=null,N=null,F=null,j=void 0,B=null,U=!!v.dynamicChildren)=>{if(y===v)return;y&&!Cs(y,v)&&(O=Jt(y),Fe(y,N,F,!0),y=null),v.patchFlag===-2&&(U=!1,v.dynamicChildren=null);const{type:M,ref:Y,shapeFlag:z}=v;switch(M){case $u:L(y,v,x,O);break;case qn:$(y,v,x,O);break;case Oo:y==null&&K(v,x,O,j);break;case tn:S(y,v,x,O,N,F,j,B,U);break;default:z&1?he(y,v,x,O,N,F,j,B,U):z&6?b(y,v,x,O,N,F,j,B,U):(z&64||z&128)&&M.process(y,v,x,O,N,F,j,B,U,Vt)}Y!=null&&N?Os(Y,y&&y.ref,F,v||y,!v):Y==null&&y&&y.ref!=null&&Os(y.ref,null,F,y,!0)},L=(y,v,x,O)=>{if(y==null)r(v.el=a(v.children),x,O);else{const N=v.el=y.el;v.children!==y.children&&h(N,v.children)}},$=(y,v,x,O)=>{y==null?r(v.el=c(v.children||""),x,O):v.el=y.el},K=(y,v,x,O)=>{[y.el,y.anchor]=D(y.children,v,x,O,y.el,y.anchor)},Q=({el:y,anchor:v},x,O)=>{let N;for(;y&&y!==v;)N=_(y),r(y,x,O),y=N;r(v,x,O)},H=({el:y,anchor:v})=>{let x;for(;y&&y!==v;)x=_(y),s(y),y=x;s(v)},he=(y,v,x,O,N,F,j,B,U)=>{v.type==="svg"?j="svg":v.type==="math"&&(j="mathml"),y==null?we(v,x,O,N,F,j,B,U):E(y,v,N,F,j,B,U)},we=(y,v,x,O,N,F,j,B)=>{let U,M;const{props:Y,shapeFlag:z,transition:J,dirs:te}=y;if(U=y.el=o(y.type,F,Y&&Y.is,Y),z&8?d(U,y.children):z&16&&g(y.children,U,null,O,N,ko(y,F),j,B),te&&sr(y,null,O,"created"),I(U,y,y.scopeId,j,O),Y){for(const ue in Y)ue!=="value"&&!Ns(ue)&&i(U,ue,null,Y[ue],F,O);"value"in Y&&i(U,"value",null,Y.value,F),(M=Y.onVnodeBeforeMount)&&Nt(M,O,y)}te&&sr(y,null,O,"beforeMount");const Z=U1(N,J);Z&&J.beforeEnter(U),r(U,v,x),((M=Y&&Y.onVnodeMounted)||Z||te)&&gt(()=>{M&&Nt(M,O,y),Z&&J.enter(U),te&&sr(y,null,O,"mounted")},N)},I=(y,v,x,O,N)=>{if(x&&A(y,x),O)for(let F=0;F<O.length;F++)A(y,O[F]);if(N){let F=N.subTree;if(v===F||t0(F.type)&&(F.ssContent===v||F.ssFallback===v)){const j=N.vnode;I(y,j,j.scopeId,j.slotScopeIds,N.parent)}}},g=(y,v,x,O,N,F,j,B,U=0)=>{for(let M=U;M<y.length;M++){const Y=y[M]=B?wn(y[M]):Ot(y[M]);k(null,Y,v,x,O,N,F,j,B)}},E=(y,v,x,O,N,F,j)=>{const B=v.el=y.el;let{patchFlag:U,dynamicChildren:M,dirs:Y}=v;U|=y.patchFlag&16;const z=y.props||Te,J=v.props||Te;let te;if(x&&ir(x,!1),(te=J.onVnodeBeforeUpdate)&&Nt(te,x,v,y),Y&&sr(v,y,x,"beforeUpdate"),x&&ir(x,!0),(z.innerHTML&&J.innerHTML==null||z.textContent&&J.textContent==null)&&d(B,""),M?T(y.dynamicChildren,M,B,x,O,ko(v,N),F):j||pe(y,v,B,null,x,O,ko(v,N),F,!1),U>0){if(U&16)w(B,z,J,x,N);else if(U&2&&z.class!==J.class&&i(B,"class",null,J.class,N),U&4&&i(B,"style",z.style,J.style,N),U&8){const Z=v.dynamicProps;for(let ue=0;ue<Z.length;ue++){const fe=Z[ue],$e=z[fe],ze=J[fe];(ze!==$e||fe==="value")&&i(B,fe,$e,ze,N,x)}}U&1&&y.children!==v.children&&d(B,v.children)}else!j&&M==null&&w(B,z,J,x,N);((te=J.onVnodeUpdated)||Y)&&gt(()=>{te&&Nt(te,x,v,y),Y&&sr(v,y,x,"updated")},O)},T=(y,v,x,O,N,F,j)=>{for(let B=0;B<v.length;B++){const U=y[B],M=v[B],Y=U.el&&(U.type===tn||!Cs(U,M)||U.shapeFlag&198)?m(U.el):x;k(U,M,Y,null,O,N,F,j,!0)}},w=(y,v,x,O,N)=>{if(v!==x){if(v!==Te)for(const F in v)!Ns(F)&&!(F in x)&&i(y,F,v[F],null,N,O);for(const F in x){if(Ns(F))continue;const j=x[F],B=v[F];j!==B&&F!=="value"&&i(y,F,B,j,N,O)}"value"in x&&i(y,"value",v.value,x.value,N)}},S=(y,v,x,O,N,F,j,B,U)=>{const M=v.el=y?y.el:a(""),Y=v.anchor=y?y.anchor:a("");let{patchFlag:z,dynamicChildren:J,slotScopeIds:te}=v;te&&(B=B?B.concat(te):te),y==null?(r(M,x,O),r(Y,x,O),g(v.children||[],x,Y,N,F,j,B,U)):z>0&&z&64&&J&&y.dynamicChildren?(T(y.dynamicChildren,J,x,N,F,j,B),(v.key!=null||N&&v===N.subTree)&&Jd(y,v,!0)):pe(y,v,x,Y,N,F,j,B,U)},b=(y,v,x,O,N,F,j,B,U)=>{v.slotScopeIds=B,y==null?v.shapeFlag&512?N.ctx.activate(v,x,O,j,U):pt(v,x,O,N,F,j,U):_n(y,v,U)},pt=(y,v,x,O,N,F,j)=>{const B=y.component=o_(y,O,N);if(Od(y)&&(B.ctx.renderer=Vt),c_(B,!1,j),B.asyncDep){if(N&&N.registerDep(B,je,j),!y.el){const U=B.subTree=on(qn);$(null,U,v,x),y.placeholder=U.el}}else je(B,y,v,x,N,F,j)},_n=(y,v,x)=>{const O=v.component=y.component;if(Q1(y,v,x))if(O.asyncDep&&!O.asyncResolved){be(O,v,x);return}else O.next=v,O.update();else v.el=y.el,O.vnode=v},je=(y,v,x,O,N,F,j)=>{const B=()=>{if(y.isMounted){let{next:z,bu:J,u:te,parent:Z,vnode:ue}=y;{const Xe=Xd(y);if(Xe){z&&(z.el=ue.el,be(y,z,j)),Xe.asyncDep.then(()=>{y.isUnmounted||B()});return}}let fe=z,$e;ir(y,!1),z?(z.el=ue.el,be(y,z,j)):z=ue,J&&Ki(J),($e=z.props&&z.props.onVnodeBeforeUpdate)&&Nt($e,Z,z,ue),ir(y,!0);const ze=eh(y),yt=y.subTree;y.subTree=ze,k(yt,ze,m(yt.el),Jt(yt),y,N,F),z.el=ze.el,fe===null&&J1(y,ze.el),te&&gt(te,N),($e=z.props&&z.props.onVnodeUpdated)&&gt(()=>Nt($e,Z,z,ue),N)}else{let z;const{el:J,props:te}=v,{bm:Z,m:ue,parent:fe,root:$e,type:ze}=y,yt=Ms(v);ir(y,!1),Z&&Ki(Z),!yt&&(z=te&&te.onVnodeBeforeMount)&&Nt(z,fe,v),ir(y,!0);{$e.ce&&$e.ce._def.shadowRoot!==!1&&$e.ce._injectChildStyle(ze);const Xe=y.subTree=eh(y);k(null,Xe,x,O,y,N,F),v.el=Xe.el}if(ue&&gt(ue,N),!yt&&(z=te&&te.onVnodeMounted)){const Xe=v;gt(()=>Nt(z,fe,Xe),N)}(v.shapeFlag&256||fe&&Ms(fe.vnode)&&fe.vnode.shapeFlag&256)&&y.a&&gt(y.a,N),y.isMounted=!0,v=x=O=null}};y.scope.on();const U=y.effect=new pd(B);y.scope.off();const M=y.update=U.run.bind(U),Y=y.job=U.runIfDirty.bind(U);Y.i=y,Y.id=y.uid,U.scheduler=()=>ec(Y),ir(y,!0),M()},be=(y,v,x)=>{v.component=y;const O=y.vnode.props;y.vnode=v,y.next=null,V1(y,v.props,O,x),O1(y,v.children,x),an(),Wl(y),cn()},pe=(y,v,x,O,N,F,j,B,U=!1)=>{const M=y&&y.children,Y=y?y.shapeFlag:0,z=v.children,{patchFlag:J,shapeFlag:te}=v;if(J>0){if(J&128){Xn(M,z,x,O,N,F,j,B,U);return}else if(J&256){At(M,z,x,O,N,F,j,B,U);return}}te&8?(Y&16&&Zn(M,N,F),z!==M&&d(x,z)):Y&16?te&16?Xn(M,z,x,O,N,F,j,B,U):Zn(M,N,F,!0):(Y&8&&d(x,""),te&16&&g(z,x,O,N,F,j,B,U))},At=(y,v,x,O,N,F,j,B,U)=>{y=y||Or,v=v||Or;const M=y.length,Y=v.length,z=Math.min(M,Y);let J;for(J=0;J<z;J++){const te=v[J]=U?wn(v[J]):Ot(v[J]);k(y[J],te,x,null,N,F,j,B,U)}M>Y?Zn(y,N,F,!0,!1,z):g(v,x,O,N,F,j,B,U,z)},Xn=(y,v,x,O,N,F,j,B,U)=>{let M=0;const Y=v.length;let z=y.length-1,J=Y-1;for(;M<=z&&M<=J;){const te=y[M],Z=v[M]=U?wn(v[M]):Ot(v[M]);if(Cs(te,Z))k(te,Z,x,null,N,F,j,B,U);else break;M++}for(;M<=z&&M<=J;){const te=y[z],Z=v[J]=U?wn(v[J]):Ot(v[J]);if(Cs(te,Z))k(te,Z,x,null,N,F,j,B,U);else break;z--,J--}if(M>z){if(M<=J){const te=J+1,Z=te<Y?v[te].el:O;for(;M<=J;)k(null,v[M]=U?wn(v[M]):Ot(v[M]),x,Z,N,F,j,B,U),M++}}else if(M>J)for(;M<=z;)Fe(y[M],N,F,!0),M++;else{const te=M,Z=M,ue=new Map;for(M=Z;M<=J;M++){const He=v[M]=U?wn(v[M]):Ot(v[M]);He.key!=null&&ue.set(He.key,M)}let fe,$e=0;const ze=J-Z+1;let yt=!1,Xe=0;const yn=new Array(ze);for(M=0;M<ze;M++)yn[M]=0;for(M=te;M<=z;M++){const He=y[M];if($e>=ze){Fe(He,N,F,!0);continue}let bt;if(He.key!=null)bt=ue.get(He.key);else for(fe=Z;fe<=J;fe++)if(yn[fe-Z]===0&&Cs(He,v[fe])){bt=fe;break}bt===void 0?Fe(He,N,F,!0):(yn[bt-Z]=M+1,bt>=Xe?Xe=bt:yt=!0,k(He,v[bt],x,null,N,F,j,B,U),$e++)}const fs=yt?B1(yn):Or;for(fe=fs.length-1,M=ze-1;M>=0;M--){const He=Z+M,bt=v[He],Ii=v[He+1],Ir=He+1<Y?Ii.el||Ii.placeholder:O;yn[M]===0?k(null,bt,x,Ir,N,F,j,B,U):yt&&(fe<0||M!==fs[fe]?Qt(bt,x,Ir,2):fe--)}}},Qt=(y,v,x,O,N=null)=>{const{el:F,type:j,transition:B,children:U,shapeFlag:M}=y;if(M&6){Qt(y.component.subTree,v,x,O);return}if(M&128){y.suspense.move(v,x,O);return}if(M&64){j.move(y,v,x,Vt);return}if(j===tn){r(F,v,x);for(let z=0;z<U.length;z++)Qt(U[z],v,x,O);r(y.anchor,v,x);return}if(j===Oo){Q(y,v,x);return}if(O!==2&&M&1&&B)if(O===0)B.beforeEnter(F),r(F,v,x),gt(()=>B.enter(F),N);else{const{leave:z,delayLeave:J,afterLeave:te}=B,Z=()=>{y.ctx.isUnmounted?s(F):r(F,v,x)},ue=()=>{F._isLeaving&&F[a1](!0),z(F,()=>{Z(),te&&te()})};J?J(F,Z,ue):ue()}else r(F,v,x)},Fe=(y,v,x,O=!1,N=!1)=>{const{type:F,props:j,ref:B,children:U,dynamicChildren:M,shapeFlag:Y,patchFlag:z,dirs:J,cacheIndex:te}=y;if(z===-2&&(N=!1),B!=null&&(an(),Os(B,null,x,y,!0),cn()),te!=null&&(v.renderCache[te]=void 0),Y&256){v.ctx.deactivate(y);return}const Z=Y&1&&J,ue=!Ms(y);let fe;if(ue&&(fe=j&&j.onVnodeBeforeUnmount)&&Nt(fe,v,y),Y&6)Yn(y.component,x,O);else{if(Y&128){y.suspense.unmount(x,O);return}Z&&sr(y,null,v,"beforeUnmount"),Y&64?y.type.remove(y,v,x,Vt,O):M&&!M.hasOnce&&(F!==tn||z>0&&z&64)?Zn(M,v,x,!1,!0):(F===tn&&z&384||!N&&Y&16)&&Zn(U,v,x),O&&Oe(y)}(ue&&(fe=j&&j.onVnodeUnmounted)||Z)&&gt(()=>{fe&&Nt(fe,v,y),Z&&sr(y,null,v,"unmounted")},x)},Oe=y=>{const{type:v,el:x,anchor:O,transition:N}=y;if(v===tn){fo(x,O);return}if(v===Oo){H(y);return}const F=()=>{s(x),N&&!N.persisted&&N.afterLeave&&N.afterLeave()};if(y.shapeFlag&1&&N&&!N.persisted){const{leave:j,delayLeave:B}=N,U=()=>j(x,F);B?B(y.el,F,U):U()}else F()},fo=(y,v)=>{let x;for(;y!==v;)x=_(y),s(y),y=x;s(v)},Yn=(y,v,x)=>{const{bum:O,scope:N,job:F,subTree:j,um:B,m:U,a:M}=y;Zl(U),Zl(M),O&&Ki(O),N.stop(),F&&(F.flags|=8,Fe(j,y,v,x)),B&&gt(B,v),gt(()=>{y.isUnmounted=!0},v)},Zn=(y,v,x,O=!1,N=!1,F=0)=>{for(let j=F;j<y.length;j++)Fe(y[j],v,x,O,N)},Jt=y=>{if(y.shapeFlag&6)return Jt(y.component.subTree);if(y.shapeFlag&128)return y.suspense.next();const v=_(y.anchor||y.el),x=v&&v[u1];return x?_(x):v};let ls=!1;const vi=(y,v,x)=>{y==null?v._vnode&&Fe(v._vnode,null,null,!0):k(v._vnode||null,y,v,null,null,null,x),v._vnode=y,ls||(ls=!0,Wl(),Vd(),ls=!1)},Vt={p:k,um:Fe,m:Qt,r:Oe,mt:pt,mc:g,pc:pe,pbc:T,n:Jt,o:t};return{render:vi,hydrate:void 0,createApp:D1(vi)}}function ko({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function ir({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function U1(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Jd(t,e,n=!1){const r=t.children,s=e.children;if(se(r)&&se(s))for(let i=0;i<r.length;i++){const o=r[i];let a=s[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[i]=wn(s[i]),a.el=o.el),!n&&a.patchFlag!==-2&&Jd(o,a)),a.type===$u&&a.patchFlag!==-1&&(a.el=o.el),a.type===qn&&!a.el&&(a.el=o.el)}}function B1(t){const e=t.slice(),n=[0];let r,s,i,o,a;const c=t.length;for(r=0;r<c;r++){const h=t[r];if(h!==0){if(s=n[n.length-1],t[s]<h){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,t[n[a]]<h?i=a+1:o=a;h<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function Xd(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Xd(e)}function Zl(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const q1=Symbol.for("v-scx"),j1=()=>Qi(q1);function Fo(t,e,n){return Yd(t,e,n)}function Yd(t,e,n=Te){const{immediate:r,deep:s,flush:i,once:o}=n,a=lt({},n),c=e&&r||!e&&i!=="post";let h;if(Js){if(i==="sync"){const A=j1();h=A.__watcherHandles||(A.__watcherHandles=[])}else if(!c){const A=()=>{};return A.stop=Ut,A.resume=Ut,A.pause=Ut,A}}const d=ct;a.call=(A,D,k)=>Gt(A,d,D,k);let m=!1;i==="post"?a.scheduler=A=>{gt(A,d&&d.suspense)}:i!=="sync"&&(m=!0,a.scheduler=(A,D)=>{D?A():ec(A)}),a.augmentJob=A=>{e&&(A.flags|=4),m&&(A.flags|=2,d&&(A.id=d.uid,A.i=d))};const _=e1(t,e,a);return Js&&(h?h.push(_):c&&_()),_}function $1(t,e,n){const r=this.proxy,s=ke(t)?t.includes(".")?Zd(r,t):()=>r[t]:t.bind(r,r);let i;oe(e)?i=e:(i=e.handler,n=e);const o=hi(this),a=Yd(s,i.bind(r),n);return o(),a}function Zd(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const z1=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Un(e)}Modifiers`]||t[`${Jn(e)}Modifiers`];function H1(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Te;let s=n;const i=e.startsWith("update:"),o=i&&z1(r,e.slice(7));o&&(o.trim&&(s=n.map(d=>ke(d)?d.trim():d)),o.number&&(s=n.map(ta)));let a,c=r[a=Ro(e)]||r[a=Ro(Un(e))];!c&&i&&(c=r[a=Ro(Jn(e))]),c&&Gt(c,t,6,s);const h=r[a+"Once"];if(h){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,Gt(h,t,6,s)}}const W1=new WeakMap;function e0(t,e,n=!1){const r=n?W1:e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},a=!1;if(!oe(t)){const c=h=>{const d=e0(h,e,!0);d&&(a=!0,lt(o,d))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!a?(Se(t)&&r.set(t,null),null):(se(i)?i.forEach(c=>o[c]=null):lt(o,i),Se(t)&&r.set(t,o),o)}function ju(t,e){return!t||!Fu(e)?!1:(e=e.slice(2).replace(/Once$/,""),_e(t,e[0].toLowerCase()+e.slice(1))||_e(t,Jn(e))||_e(t,e))}function eh(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:a,emit:c,render:h,renderCache:d,props:m,data:_,setupState:A,ctx:D,inheritAttrs:k}=t,L=hu(t);let $,K;try{if(n.shapeFlag&4){const H=s||r,he=H;$=Ot(h.call(he,H,d,m,A,_,D)),K=a}else{const H=e;$=Ot(H.length>1?H(m,{attrs:a,slots:o,emit:c}):H(m,null)),K=e.props?a:G1(a)}}catch(H){Us.length=0,Bu(H,t,1),$=on(qn)}let Q=$;if(K&&k!==!1){const H=Object.keys(K),{shapeFlag:he}=Q;H.length&&he&7&&(i&&H.some(qa)&&(K=K1(K,i)),Q=Kr(Q,K,!1,!0))}return n.dirs&&(Q=Kr(Q,null,!1,!0),Q.dirs=Q.dirs?Q.dirs.concat(n.dirs):n.dirs),n.transition&&tc(Q,n.transition),$=Q,hu(L),$}const G1=t=>{let e;for(const n in t)(n==="class"||n==="style"||Fu(n))&&((e||(e={}))[n]=t[n]);return e},K1=(t,e)=>{const n={};for(const r in t)(!qa(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function Q1(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:a,patchFlag:c}=e,h=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?th(r,o,h):!!o;if(c&8){const d=e.dynamicProps;for(let m=0;m<d.length;m++){const _=d[m];if(o[_]!==r[_]&&!ju(h,_))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?th(r,o,h):!0:!!o;return!1}function th(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!ju(n,i))return!0}return!1}function J1({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const t0=t=>t.__isSuspense;function X1(t,e){e&&e.pendingBranch?se(t)?e.effects.push(...t):e.effects.push(t):s1(t)}const tn=Symbol.for("v-fgt"),$u=Symbol.for("v-txt"),qn=Symbol.for("v-cmt"),Oo=Symbol.for("v-stc"),Us=[];let _t=null;function Y1(t=!1){Us.push(_t=t?null:[])}function Z1(){Us.pop(),_t=Us[Us.length-1]||null}let Qs=1;function nh(t,e=!1){Qs+=t,t<0&&_t&&e&&(_t.hasOnce=!0)}function n0(t){return t.dynamicChildren=Qs>0?_t||Or:null,Z1(),Qs>0&&_t&&_t.push(t),t}function O4(t,e,n,r,s,i){return n0(i0(t,e,n,r,s,i,!0))}function e_(t,e,n,r,s){return n0(on(t,e,n,r,s,!0))}function r0(t){return t?t.__v_isVNode===!0:!1}function Cs(t,e){return t.type===e.type&&t.key===e.key}const s0=({key:t})=>t??null,Ji=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?ke(t)||st(t)||oe(t)?{i:vt,r:t,k:e,f:!!n}:t:null);function i0(t,e=null,n=null,r=0,s=null,i=t===tn?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&s0(e),ref:e&&Ji(e),scopeId:kd,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:vt};return a?(sc(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=ke(n)?8:16),Qs>0&&!o&&_t&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&_t.push(c),c}const on=t_;function t_(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===T1)&&(t=qn),r0(t)){const a=Kr(t,e,!0);return n&&sc(a,n),Qs>0&&!i&&_t&&(a.shapeFlag&6?_t[_t.indexOf(t)]=a:_t.push(a)),a.patchFlag=-2,a}if(d_(t)&&(t=t.__vccOpts),e){e=n_(e);let{class:a,style:c}=e;a&&!ke(a)&&(e.class=Ha(a)),Se(c)&&(Za(c)&&!se(c)&&(c=lt({},c)),e.style=za(c))}const o=ke(t)?1:t0(t)?128:o1(t)?64:Se(t)?4:oe(t)?2:0;return i0(t,e,n,r,s,o,i,!0)}function n_(t){return t?Za(t)||zd(t)?lt({},t):t:null}function Kr(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:a,transition:c}=t,h=e?s_(s||{},e):s,d={__v_isVNode:!0,__v_skip:!0,type:t.type,props:h,key:h&&s0(h),ref:e&&e.ref?n&&i?se(i)?i.concat(Ji(e)):[i,Ji(e)]:Ji(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:a,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==tn?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:c,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Kr(t.ssContent),ssFallback:t.ssFallback&&Kr(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return c&&r&&tc(d,c.clone(d)),d}function r_(t=" ",e=0){return on($u,null,t,e)}function M4(t="",e=!1){return e?(Y1(),e_(qn,null,t)):on(qn,null,t)}function Ot(t){return t==null||typeof t=="boolean"?on(qn):se(t)?on(tn,null,t.slice()):r0(t)?wn(t):on($u,null,String(t))}function wn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Kr(t)}function sc(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(se(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),sc(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!zd(e)?e._ctx=vt:s===3&&vt&&(vt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else oe(e)?(e={default:e,_ctx:vt},n=32):(e=String(e),r&64?(n=16,e=[r_(e)]):n=8);t.children=e,t.shapeFlag|=n}function s_(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=Ha([e.class,r.class]));else if(s==="style")e.style=za([e.style,r.style]);else if(Fu(s)){const i=e[s],o=r[s];o&&i!==o&&!(se(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function Nt(t,e,n,r=null){Gt(t,e,7,[n,r])}const i_=qd();let u_=0;function o_(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||i_,i={uid:u_++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Ag(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Wd(r,s),emitsOptions:e0(r,s),emit:null,emitted:null,propsDefaults:Te,inheritAttrs:r.inheritAttrs,ctx:Te,data:Te,props:Te,attrs:Te,slots:Te,refs:Te,setupState:Te,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=H1.bind(null,i),t.ce&&t.ce(i),i}let ct=null;const a_=()=>ct||vt;let pu,la;{const t=Lu(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};pu=e("__VUE_INSTANCE_SETTERS__",n=>ct=n),la=e("__VUE_SSR_SETTERS__",n=>Js=n)}const hi=t=>{const e=ct;return pu(t),t.scope.on(),()=>{t.scope.off(),pu(e)}},rh=()=>{ct&&ct.scope.off(),pu(null)};function u0(t){return t.vnode.shapeFlag&4}let Js=!1;function c_(t,e=!1,n=!1){e&&la(e);const{props:r,children:s}=t.vnode,i=u0(t);P1(t,r,i,e),F1(t,s,n||e);const o=i?l_(t,e):void 0;return e&&la(!1),o}function l_(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,v1);const{setup:r}=n;if(r){an();const s=t.setupContext=r.length>1?f_(t):null,i=hi(t),o=li(r,t,0,[t.props,s]),a=ud(o);if(cn(),i(),(a||t.sp)&&!Ms(t)&&Fd(t),a){if(o.then(rh,rh),e)return o.then(c=>{sh(t,c)}).catch(c=>{Bu(c,t,0)});t.asyncDep=o}else sh(t,o)}else o0(t)}function sh(t,e,n){oe(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Se(e)&&(t.setupState=Dd(e)),o0(t)}function o0(t,e,n){const r=t.type;t.render||(t.render=r.render||Ut);{const s=hi(t);an();try{I1(t)}finally{cn(),s()}}}const h_={get(t,e){return nt(t,"get",""),t[e]}};function f_(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,h_),slots:t.slots,emit:t.emit,expose:e}}function zu(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Dd(Wg(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Ls)return Ls[n](t)},has(e,n){return n in e||n in Ls}})):t.proxy}function d_(t){return oe(t)&&"__vccOpts"in t}const p_=(t,e)=>Yg(t,e,Js),m_="3.5.21";/**
* @vue/runtime-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ha;const ih=typeof window<"u"&&window.trustedTypes;if(ih)try{ha=ih.createPolicy("vue",{createHTML:t=>t})}catch{}const a0=ha?t=>ha.createHTML(t):t=>t,g_="http://www.w3.org/2000/svg",__="http://www.w3.org/1998/Math/MathML",en=typeof document<"u"?document:null,uh=en&&en.createElement("template"),y_={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?en.createElementNS(g_,t):e==="mathml"?en.createElementNS(__,t):n?en.createElement(t,{is:n}):en.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>en.createTextNode(t),createComment:t=>en.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>en.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{uh.innerHTML=a0(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const a=uh.content;if(r==="svg"||r==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},b_=Symbol("_vtc");function E_(t,e,n){const r=t[b_];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const mu=Symbol("_vod"),c0=Symbol("_vsh"),L4={name:"show",beforeMount(t,{value:e},{transition:n}){t[mu]=t.style.display==="none"?"":t.style.display,n&&e?n.beforeEnter(t):Ss(t,e)},mounted(t,{value:e},{transition:n}){n&&e&&n.enter(t)},updated(t,{value:e,oldValue:n},{transition:r}){!e!=!n&&(r?e?(r.beforeEnter(t),Ss(t,!0),r.enter(t)):r.leave(t,()=>{Ss(t,!1)}):Ss(t,e))},beforeUnmount(t,{value:e}){Ss(t,e)}};function Ss(t,e){t.style.display=e?t[mu]:"none",t[c0]=!e}const T_=Symbol(""),v_=/(?:^|;)\s*display\s*:/;function I_(t,e,n){const r=t.style,s=ke(n);let i=!1;if(n&&!s){if(e)if(ke(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&Xi(r,a,"")}else for(const o in e)n[o]==null&&Xi(r,o,"");for(const o in n)o==="display"&&(i=!0),Xi(r,o,n[o])}else if(s){if(e!==n){const o=r[T_];o&&(n+=";"+o),r.cssText=n,i=v_.test(n)}}else e&&t.removeAttribute("style");mu in t&&(t[mu]=i?r.display:"",t[c0]&&(r.display="none"))}const oh=/\s*!important$/;function Xi(t,e,n){if(se(n))n.forEach(r=>Xi(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=w_(t,e);oh.test(n)?t.setProperty(Jn(r),n.replace(oh,""),"important"):t[r]=n}}const ah=["Webkit","Moz","ms"],Mo={};function w_(t,e){const n=Mo[e];if(n)return n;let r=Un(e);if(r!=="filter"&&r in t)return Mo[e]=r;r=cd(r);for(let s=0;s<ah.length;s++){const i=ah[s]+r;if(i in t)return Mo[e]=i}return e}const ch="http://www.w3.org/1999/xlink";function lh(t,e,n,r,s,i=Ig(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(ch,e.slice(6,e.length)):t.setAttributeNS(ch,e,n):n==null||i&&!hd(n)?t.removeAttribute(e):t.setAttribute(e,i?"":Qn(n)?String(n):n)}function hh(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?a0(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?t.getAttribute("value")||"":t.value,c=n==null?t.type==="checkbox"?"on":"":String(n);(a!==c||!("_value"in t))&&(t.value=c),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const a=typeof t[e];a==="boolean"?n=hd(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(s||e)}function xr(t,e,n,r){t.addEventListener(e,n,r)}function A_(t,e,n,r){t.removeEventListener(e,n,r)}const fh=Symbol("_vei");function C_(t,e,n,r,s=null){const i=t[fh]||(t[fh]={}),o=i[e];if(r&&o)o.value=r;else{const[a,c]=S_(e);if(r){const h=i[e]=x_(r,s);xr(t,a,h,c)}else o&&(A_(t,a,o,c),i[e]=void 0)}}const dh=/(?:Once|Passive|Capture)$/;function S_(t){let e;if(dh.test(t)){e={};let r;for(;r=t.match(dh);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Jn(t.slice(2)),e]}let Lo=0;const R_=Promise.resolve(),D_=()=>Lo||(R_.then(()=>Lo=0),Lo=Date.now());function x_(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Gt(P_(r,n.value),e,5,[r])};return n.value=t,n.attached=D_(),n}function P_(t,e){if(se(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const ph=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,V_=(t,e,n,r,s,i)=>{const o=s==="svg";e==="class"?E_(t,r,o):e==="style"?I_(t,n,r):Fu(e)?qa(e)||C_(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):N_(t,e,r,o))?(hh(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&lh(t,e,r,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!ke(r))?hh(t,Un(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),lh(t,e,r,o))};function N_(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&ph(e)&&oe(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return ph(e)&&ke(n)?!1:e in t}const mh=t=>{const e=t.props["onUpdate:modelValue"]||!1;return se(e)?n=>Ki(e,n):e};function k_(t){t.target.composing=!0}function gh(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Uo=Symbol("_assign"),U4={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[Uo]=mh(s);const i=r||s.props&&s.props.type==="number";xr(t,e?"change":"input",o=>{if(o.target.composing)return;let a=t.value;n&&(a=a.trim()),i&&(a=ta(a)),t[Uo](a)}),n&&xr(t,"change",()=>{t.value=t.value.trim()}),e||(xr(t,"compositionstart",k_),xr(t,"compositionend",gh),xr(t,"change",gh))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},o){if(t[Uo]=mh(o),t.composing)return;const a=(i||t.type==="number")&&!/^0\d/.test(t.value)?ta(t.value):t.value,c=e??"";a!==c&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||s&&t.value.trim()===c)||(t.value=c))}},F_=["ctrl","shift","alt","meta"],O_={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>F_.some(n=>t[`${n}Key`]&&!e.includes(n))},B4=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=((s,...i)=>{for(let o=0;o<e.length;o++){const a=O_[e[o]];if(a&&a(s,e))return}return t(s,...i)}))},M_={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},q4=(t,e)=>{const n=t._withKeys||(t._withKeys={}),r=e.join(".");return n[r]||(n[r]=(s=>{if(!("key"in s))return;const i=Jn(s.key);if(e.some(o=>o===i||M_[o]===i))return t(s)}))},L_=lt({patchProp:V_},y_);let _h;function U_(){return _h||(_h=M1(L_))}const j4=((...t)=>{const e=U_().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=q_(r);if(!s)return;const i=e._component;!oe(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,B_(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e});function B_(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function q_(t){return ke(t)?document.querySelector(t):t}const yh={};function j_(t){let e=yh[t];if(e)return e;e=yh[t]=[];for(let n=0;n<128;n++){const r=String.fromCharCode(n);e.push(r)}for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);e[r]="%"+("0"+r.toString(16).toUpperCase()).slice(-2)}return e}function Hu(t,e){typeof e!="string"&&(e=Hu.defaultChars);const n=j_(e);return t.replace(/(%[a-f0-9]{2})+/gi,function(r){let s="";for(let i=0,o=r.length;i<o;i+=3){const a=parseInt(r.slice(i+1,i+3),16);if(a<128){s+=n[a];continue}if((a&224)===192&&i+3<o){const c=parseInt(r.slice(i+4,i+6),16);if((c&192)===128){const h=a<<6&1984|c&63;h<128?s+="��":s+=String.fromCharCode(h),i+=3;continue}}if((a&240)===224&&i+6<o){const c=parseInt(r.slice(i+4,i+6),16),h=parseInt(r.slice(i+7,i+9),16);if((c&192)===128&&(h&192)===128){const d=a<<12&61440|c<<6&4032|h&63;d<2048||d>=55296&&d<=57343?s+="���":s+=String.fromCharCode(d),i+=6;continue}}if((a&248)===240&&i+9<o){const c=parseInt(r.slice(i+4,i+6),16),h=parseInt(r.slice(i+7,i+9),16),d=parseInt(r.slice(i+10,i+12),16);if((c&192)===128&&(h&192)===128&&(d&192)===128){let m=a<<18&1835008|c<<12&258048|h<<6&4032|d&63;m<65536||m>1114111?s+="����":(m-=65536,s+=String.fromCharCode(55296+(m>>10),56320+(m&1023))),i+=9;continue}}s+="�"}return s})}Hu.defaultChars=";/?:@&=+$,#";Hu.componentChars="";const bh={};function $_(t){let e=bh[t];if(e)return e;e=bh[t]=[];for(let n=0;n<128;n++){const r=String.fromCharCode(n);/^[0-9a-z]$/i.test(r)?e.push(r):e.push("%"+("0"+n.toString(16).toUpperCase()).slice(-2))}for(let n=0;n<t.length;n++)e[t.charCodeAt(n)]=t[n];return e}function Wu(t,e,n){typeof e!="string"&&(n=e,e=Wu.defaultChars),typeof n>"u"&&(n=!0);const r=$_(e);let s="";for(let i=0,o=t.length;i<o;i++){const a=t.charCodeAt(i);if(n&&a===37&&i+2<o&&/^[0-9a-f]{2}$/i.test(t.slice(i+1,i+3))){s+=t.slice(i,i+3),i+=2;continue}if(a<128){s+=r[a];continue}if(a>=55296&&a<=57343){if(a>=55296&&a<=56319&&i+1<o){const c=t.charCodeAt(i+1);if(c>=56320&&c<=57343){s+=encodeURIComponent(t[i]+t[i+1]),i++;continue}}s+="%EF%BF%BD";continue}s+=encodeURIComponent(t[i])}return s}Wu.defaultChars=";/?:@&=+$,-_.!~*'()#";Wu.componentChars="-_.!~*'()";function z_(t){let e="";return e+=t.protocol||"",e+=t.slashes?"//":"",e+=t.auth?t.auth+"@":"",t.hostname&&t.hostname.indexOf(":")!==-1?e+="["+t.hostname+"]":e+=t.hostname||"",e+=t.port?":"+t.port:"",e+=t.pathname||"",e+=t.search||"",e+=t.hash||"",e}function gu(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const H_=/^([a-z0-9.+-]+:)/i,W_=/:[0-9]*$/,G_=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,K_=["<",">",'"',"`"," ","\r",`
`,"	"],Q_=["{","}","|","\\","^","`"].concat(K_),J_=["'"].concat(Q_),Eh=["%","/","?",";","#"].concat(J_),Th=["/","?","#"],X_=255,vh=/^[+a-z0-9A-Z_-]{0,63}$/,Y_=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Ih={javascript:!0,"javascript:":!0},wh={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Z_(t,e){if(t&&t instanceof gu)return t;const n=new gu;return n.parse(t,e),n}gu.prototype.parse=function(t,e){let n,r,s,i=t;if(i=i.trim(),!e&&t.split("#").length===1){const h=G_.exec(i);if(h)return this.pathname=h[1],h[2]&&(this.search=h[2]),this}let o=H_.exec(i);if(o&&(o=o[0],n=o.toLowerCase(),this.protocol=o,i=i.substr(o.length)),(e||o||i.match(/^\/\/[^@\/]+@[^@\/]+/))&&(s=i.substr(0,2)==="//",s&&!(o&&Ih[o])&&(i=i.substr(2),this.slashes=!0)),!Ih[o]&&(s||o&&!wh[o])){let h=-1;for(let D=0;D<Th.length;D++)r=i.indexOf(Th[D]),r!==-1&&(h===-1||r<h)&&(h=r);let d,m;h===-1?m=i.lastIndexOf("@"):m=i.lastIndexOf("@",h),m!==-1&&(d=i.slice(0,m),i=i.slice(m+1),this.auth=d),h=-1;for(let D=0;D<Eh.length;D++)r=i.indexOf(Eh[D]),r!==-1&&(h===-1||r<h)&&(h=r);h===-1&&(h=i.length),i[h-1]===":"&&h--;const _=i.slice(0,h);i=i.slice(h),this.parseHost(_),this.hostname=this.hostname||"";const A=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!A){const D=this.hostname.split(/\./);for(let k=0,L=D.length;k<L;k++){const $=D[k];if($&&!$.match(vh)){let K="";for(let Q=0,H=$.length;Q<H;Q++)$.charCodeAt(Q)>127?K+="x":K+=$[Q];if(!K.match(vh)){const Q=D.slice(0,k),H=D.slice(k+1),he=$.match(Y_);he&&(Q.push(he[1]),H.unshift(he[2])),H.length&&(i=H.join(".")+i),this.hostname=Q.join(".");break}}}}this.hostname.length>X_&&(this.hostname=""),A&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const a=i.indexOf("#");a!==-1&&(this.hash=i.substr(a),i=i.slice(0,a));const c=i.indexOf("?");return c!==-1&&(this.search=i.substr(c),i=i.slice(0,c)),i&&(this.pathname=i),wh[n]&&this.hostname&&!this.pathname&&(this.pathname=""),this};gu.prototype.parseHost=function(t){let e=W_.exec(t);e&&(e=e[0],e!==":"&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)};const $4=Object.freeze(Object.defineProperty({__proto__:null,decode:Hu,encode:Wu,format:z_,parse:Z_},Symbol.toStringTag,{value:"Module"})),l0=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,h0=/[\0-\x1F\x7F-\x9F]/,e2=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,f0=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,t2=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,d0=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,z4=Object.freeze(Object.defineProperty({__proto__:null,Any:l0,Cc:h0,Cf:e2,P:f0,S:t2,Z:d0},Symbol.toStringTag,{value:"Module"})),n2=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(t=>t.charCodeAt(0))),r2=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(t=>t.charCodeAt(0)));var Bo;const s2=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),i2=(Bo=String.fromCodePoint)!==null&&Bo!==void 0?Bo:function(t){let e="";return t>65535&&(t-=65536,e+=String.fromCharCode(t>>>10&1023|55296),t=56320|t&1023),e+=String.fromCharCode(t),e};function u2(t){var e;return t>=55296&&t<=57343||t>1114111?65533:(e=s2.get(t))!==null&&e!==void 0?e:t}var qe;(function(t){t[t.NUM=35]="NUM",t[t.SEMI=59]="SEMI",t[t.EQUALS=61]="EQUALS",t[t.ZERO=48]="ZERO",t[t.NINE=57]="NINE",t[t.LOWER_A=97]="LOWER_A",t[t.LOWER_F=102]="LOWER_F",t[t.LOWER_X=120]="LOWER_X",t[t.LOWER_Z=122]="LOWER_Z",t[t.UPPER_A=65]="UPPER_A",t[t.UPPER_F=70]="UPPER_F",t[t.UPPER_Z=90]="UPPER_Z"})(qe||(qe={}));const o2=32;var Pn;(function(t){t[t.VALUE_LENGTH=49152]="VALUE_LENGTH",t[t.BRANCH_LENGTH=16256]="BRANCH_LENGTH",t[t.JUMP_TABLE=127]="JUMP_TABLE"})(Pn||(Pn={}));function fa(t){return t>=qe.ZERO&&t<=qe.NINE}function a2(t){return t>=qe.UPPER_A&&t<=qe.UPPER_F||t>=qe.LOWER_A&&t<=qe.LOWER_F}function c2(t){return t>=qe.UPPER_A&&t<=qe.UPPER_Z||t>=qe.LOWER_A&&t<=qe.LOWER_Z||fa(t)}function l2(t){return t===qe.EQUALS||c2(t)}var Ue;(function(t){t[t.EntityStart=0]="EntityStart",t[t.NumericStart=1]="NumericStart",t[t.NumericDecimal=2]="NumericDecimal",t[t.NumericHex=3]="NumericHex",t[t.NamedEntity=4]="NamedEntity"})(Ue||(Ue={}));var Cn;(function(t){t[t.Legacy=0]="Legacy",t[t.Strict=1]="Strict",t[t.Attribute=2]="Attribute"})(Cn||(Cn={}));class h2{constructor(e,n,r){this.decodeTree=e,this.emitCodePoint=n,this.errors=r,this.state=Ue.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=Cn.Strict}startEntity(e){this.decodeMode=e,this.state=Ue.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(e,n){switch(this.state){case Ue.EntityStart:return e.charCodeAt(n)===qe.NUM?(this.state=Ue.NumericStart,this.consumed+=1,this.stateNumericStart(e,n+1)):(this.state=Ue.NamedEntity,this.stateNamedEntity(e,n));case Ue.NumericStart:return this.stateNumericStart(e,n);case Ue.NumericDecimal:return this.stateNumericDecimal(e,n);case Ue.NumericHex:return this.stateNumericHex(e,n);case Ue.NamedEntity:return this.stateNamedEntity(e,n)}}stateNumericStart(e,n){return n>=e.length?-1:(e.charCodeAt(n)|o2)===qe.LOWER_X?(this.state=Ue.NumericHex,this.consumed+=1,this.stateNumericHex(e,n+1)):(this.state=Ue.NumericDecimal,this.stateNumericDecimal(e,n))}addToNumericResult(e,n,r,s){if(n!==r){const i=r-n;this.result=this.result*Math.pow(s,i)+parseInt(e.substr(n,i),s),this.consumed+=i}}stateNumericHex(e,n){const r=n;for(;n<e.length;){const s=e.charCodeAt(n);if(fa(s)||a2(s))n+=1;else return this.addToNumericResult(e,r,n,16),this.emitNumericEntity(s,3)}return this.addToNumericResult(e,r,n,16),-1}stateNumericDecimal(e,n){const r=n;for(;n<e.length;){const s=e.charCodeAt(n);if(fa(s))n+=1;else return this.addToNumericResult(e,r,n,10),this.emitNumericEntity(s,2)}return this.addToNumericResult(e,r,n,10),-1}emitNumericEntity(e,n){var r;if(this.consumed<=n)return(r=this.errors)===null||r===void 0||r.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(e===qe.SEMI)this.consumed+=1;else if(this.decodeMode===Cn.Strict)return 0;return this.emitCodePoint(u2(this.result),this.consumed),this.errors&&(e!==qe.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(e,n){const{decodeTree:r}=this;let s=r[this.treeIndex],i=(s&Pn.VALUE_LENGTH)>>14;for(;n<e.length;n++,this.excess++){const o=e.charCodeAt(n);if(this.treeIndex=f2(r,s,this.treeIndex+Math.max(1,i),o),this.treeIndex<0)return this.result===0||this.decodeMode===Cn.Attribute&&(i===0||l2(o))?0:this.emitNotTerminatedNamedEntity();if(s=r[this.treeIndex],i=(s&Pn.VALUE_LENGTH)>>14,i!==0){if(o===qe.SEMI)return this.emitNamedEntityData(this.treeIndex,i,this.consumed+this.excess);this.decodeMode!==Cn.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var e;const{result:n,decodeTree:r}=this,s=(r[n]&Pn.VALUE_LENGTH)>>14;return this.emitNamedEntityData(n,s,this.consumed),(e=this.errors)===null||e===void 0||e.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(e,n,r){const{decodeTree:s}=this;return this.emitCodePoint(n===1?s[e]&~Pn.VALUE_LENGTH:s[e+1],r),n===3&&this.emitCodePoint(s[e+2],r),r}end(){var e;switch(this.state){case Ue.NamedEntity:return this.result!==0&&(this.decodeMode!==Cn.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case Ue.NumericDecimal:return this.emitNumericEntity(0,2);case Ue.NumericHex:return this.emitNumericEntity(0,3);case Ue.NumericStart:return(e=this.errors)===null||e===void 0||e.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case Ue.EntityStart:return 0}}}function p0(t){let e="";const n=new h2(t,r=>e+=i2(r));return function(s,i){let o=0,a=0;for(;(a=s.indexOf("&",a))>=0;){e+=s.slice(o,a),n.startEntity(i);const h=n.write(s,a+1);if(h<0){o=a+n.end();break}o=a+h,a=h===0?o+1:o}const c=e+s.slice(o);return e="",c}}function f2(t,e,n,r){const s=(e&Pn.BRANCH_LENGTH)>>7,i=e&Pn.JUMP_TABLE;if(s===0)return i!==0&&r===i?n:-1;if(i){const c=r-i;return c<0||c>=s?-1:t[n+c]-1}let o=n,a=o+s-1;for(;o<=a;){const c=o+a>>>1,h=t[c];if(h<r)o=c+1;else if(h>r)a=c-1;else return t[c+s]}return-1}const d2=p0(n2);p0(r2);function H4(t,e=Cn.Legacy){return d2(t,e)}function p2(t){const e={};t=t||{},e.src_Any=l0.source,e.src_Cc=h0.source,e.src_Z=d0.source,e.src_P=f0.source,e.src_ZPCc=[e.src_Z,e.src_P,e.src_Cc].join("|"),e.src_ZCc=[e.src_Z,e.src_Cc].join("|");const n="[><｜]";return e.src_pseudo_letter="(?:(?!"+n+"|"+e.src_ZPCc+")"+e.src_Any+")",e.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",e.src_auth="(?:(?:(?!"+e.src_ZCc+"|[@/\\[\\]()]).)+@)?",e.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",e.src_host_terminator="(?=$|"+n+"|"+e.src_ZPCc+")(?!"+(t["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+e.src_ZPCc+"))",e.src_path="(?:[/?#](?:(?!"+e.src_ZCc+"|"+n+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+e.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+e.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+e.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+e.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+e.src_ZCc+"|[']).)+\\'|\\'(?="+e.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+e.src_ZCc+"|[.]|$)|"+(t["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+e.src_ZCc+"|$)|;(?!"+e.src_ZCc+"|$)|\\!+(?!"+e.src_ZCc+"|[!]|$)|\\?(?!"+e.src_ZCc+"|[?]|$))+|\\/)?",e.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',e.src_xn="xn--[a-z0-9\\-]{1,59}",e.src_domain_root="(?:"+e.src_xn+"|"+e.src_pseudo_letter+"{1,63})",e.src_domain="(?:"+e.src_xn+"|(?:"+e.src_pseudo_letter+")|(?:"+e.src_pseudo_letter+"(?:-|"+e.src_pseudo_letter+"){0,61}"+e.src_pseudo_letter+"))",e.src_host="(?:(?:(?:(?:"+e.src_domain+")\\.)*"+e.src_domain+"))",e.tpl_host_fuzzy="(?:"+e.src_ip4+"|(?:(?:(?:"+e.src_domain+")\\.)+(?:%TLDS%)))",e.tpl_host_no_ip_fuzzy="(?:(?:(?:"+e.src_domain+")\\.)+(?:%TLDS%))",e.src_host_strict=e.src_host+e.src_host_terminator,e.tpl_host_fuzzy_strict=e.tpl_host_fuzzy+e.src_host_terminator,e.src_host_port_strict=e.src_host+e.src_port+e.src_host_terminator,e.tpl_host_port_fuzzy_strict=e.tpl_host_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_port_no_ip_fuzzy_strict=e.tpl_host_no_ip_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+e.src_ZPCc+"|>|$))",e.tpl_email_fuzzy="(^|"+n+'|"|\\(|'+e.src_ZCc+")("+e.src_email_name+"@"+e.tpl_host_fuzzy_strict+")",e.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+e.src_ZPCc+"))((?![$+<=>^`|｜])"+e.tpl_host_port_fuzzy_strict+e.src_path+")",e.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+e.src_ZPCc+"))((?![$+<=>^`|｜])"+e.tpl_host_port_no_ip_fuzzy_strict+e.src_path+")",e}function da(t){return Array.prototype.slice.call(arguments,1).forEach(function(n){n&&Object.keys(n).forEach(function(r){t[r]=n[r]})}),t}function Gu(t){return Object.prototype.toString.call(t)}function m2(t){return Gu(t)==="[object String]"}function g2(t){return Gu(t)==="[object Object]"}function _2(t){return Gu(t)==="[object RegExp]"}function Ah(t){return Gu(t)==="[object Function]"}function y2(t){return t.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const m0={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function b2(t){return Object.keys(t||{}).reduce(function(e,n){return e||m0.hasOwnProperty(n)},!1)}const E2={"http:":{validate:function(t,e,n){const r=t.slice(e);return n.re.http||(n.re.http=new RegExp("^\\/\\/"+n.re.src_auth+n.re.src_host_port_strict+n.re.src_path,"i")),n.re.http.test(r)?r.match(n.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(t,e,n){const r=t.slice(e);return n.re.no_http||(n.re.no_http=new RegExp("^"+n.re.src_auth+"(?:localhost|(?:(?:"+n.re.src_domain+")\\.)+"+n.re.src_domain_root+")"+n.re.src_port+n.re.src_host_terminator+n.re.src_path,"i")),n.re.no_http.test(r)?e>=3&&t[e-3]===":"||e>=3&&t[e-3]==="/"?0:r.match(n.re.no_http)[0].length:0}},"mailto:":{validate:function(t,e,n){const r=t.slice(e);return n.re.mailto||(n.re.mailto=new RegExp("^"+n.re.src_email_name+"@"+n.re.src_host_strict,"i")),n.re.mailto.test(r)?r.match(n.re.mailto)[0].length:0}}},T2="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",v2="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function I2(t){t.__index__=-1,t.__text_cache__=""}function w2(t){return function(e,n){const r=e.slice(n);return t.test(r)?r.match(t)[0].length:0}}function Ch(){return function(t,e){e.normalize(t)}}function _u(t){const e=t.re=p2(t.__opts__),n=t.__tlds__.slice();t.onCompile(),t.__tlds_replaced__||n.push(T2),n.push(e.src_xn),e.src_tlds=n.join("|");function r(a){return a.replace("%TLDS%",e.src_tlds)}e.email_fuzzy=RegExp(r(e.tpl_email_fuzzy),"i"),e.link_fuzzy=RegExp(r(e.tpl_link_fuzzy),"i"),e.link_no_ip_fuzzy=RegExp(r(e.tpl_link_no_ip_fuzzy),"i"),e.host_fuzzy_test=RegExp(r(e.tpl_host_fuzzy_test),"i");const s=[];t.__compiled__={};function i(a,c){throw new Error('(LinkifyIt) Invalid schema "'+a+'": '+c)}Object.keys(t.__schemas__).forEach(function(a){const c=t.__schemas__[a];if(c===null)return;const h={validate:null,link:null};if(t.__compiled__[a]=h,g2(c)){_2(c.validate)?h.validate=w2(c.validate):Ah(c.validate)?h.validate=c.validate:i(a,c),Ah(c.normalize)?h.normalize=c.normalize:c.normalize?i(a,c):h.normalize=Ch();return}if(m2(c)){s.push(a);return}i(a,c)}),s.forEach(function(a){t.__compiled__[t.__schemas__[a]]&&(t.__compiled__[a].validate=t.__compiled__[t.__schemas__[a]].validate,t.__compiled__[a].normalize=t.__compiled__[t.__schemas__[a]].normalize)}),t.__compiled__[""]={validate:null,normalize:Ch()};const o=Object.keys(t.__compiled__).filter(function(a){return a.length>0&&t.__compiled__[a]}).map(y2).join("|");t.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+e.src_ZPCc+"))("+o+")","i"),t.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+e.src_ZPCc+"))("+o+")","ig"),t.re.schema_at_start=RegExp("^"+t.re.schema_search.source,"i"),t.re.pretest=RegExp("("+t.re.schema_test.source+")|("+t.re.host_fuzzy_test.source+")|@","i"),I2(t)}function A2(t,e){const n=t.__index__,r=t.__last_index__,s=t.__text_cache__.slice(n,r);this.schema=t.__schema__.toLowerCase(),this.index=n+e,this.lastIndex=r+e,this.raw=s,this.text=s,this.url=s}function pa(t,e){const n=new A2(t,e);return t.__compiled__[n.schema].normalize(n,t),n}function wt(t,e){if(!(this instanceof wt))return new wt(t,e);e||b2(t)&&(e=t,t={}),this.__opts__=da({},m0,e),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=da({},E2,t),this.__compiled__={},this.__tlds__=v2,this.__tlds_replaced__=!1,this.re={},_u(this)}wt.prototype.add=function(e,n){return this.__schemas__[e]=n,_u(this),this};wt.prototype.set=function(e){return this.__opts__=da(this.__opts__,e),this};wt.prototype.test=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return!1;let n,r,s,i,o,a,c,h,d;if(this.re.schema_test.test(e)){for(c=this.re.schema_search,c.lastIndex=0;(n=c.exec(e))!==null;)if(i=this.testSchemaAt(e,n[2],c.lastIndex),i){this.__schema__=n[2],this.__index__=n.index+n[1].length,this.__last_index__=n.index+n[0].length+i;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(h=e.search(this.re.host_fuzzy_test),h>=0&&(this.__index__<0||h<this.__index__)&&(r=e.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(o=r.index+r[1].length,(this.__index__<0||o<this.__index__)&&(this.__schema__="",this.__index__=o,this.__last_index__=r.index+r[0].length))),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&(d=e.indexOf("@"),d>=0&&(s=e.match(this.re.email_fuzzy))!==null&&(o=s.index+s[1].length,a=s.index+s[0].length,(this.__index__<0||o<this.__index__||o===this.__index__&&a>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=o,this.__last_index__=a))),this.__index__>=0};wt.prototype.pretest=function(e){return this.re.pretest.test(e)};wt.prototype.testSchemaAt=function(e,n,r){return this.__compiled__[n.toLowerCase()]?this.__compiled__[n.toLowerCase()].validate(e,r,this):0};wt.prototype.match=function(e){const n=[];let r=0;this.__index__>=0&&this.__text_cache__===e&&(n.push(pa(this,r)),r=this.__last_index__);let s=r?e.slice(r):e;for(;this.test(s);)n.push(pa(this,r)),s=s.slice(this.__last_index__),r+=this.__last_index__;return n.length?n:null};wt.prototype.matchAtStart=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return null;const n=this.re.schema_at_start.exec(e);if(!n)return null;const r=this.testSchemaAt(e,n[2],n[0].length);return r?(this.__schema__=n[2],this.__index__=n.index+n[1].length,this.__last_index__=n.index+n[0].length+r,pa(this,0)):null};wt.prototype.tlds=function(e,n){return e=Array.isArray(e)?e:[e],n?(this.__tlds__=this.__tlds__.concat(e).sort().filter(function(r,s,i){return r!==i[s-1]}).reverse(),_u(this),this):(this.__tlds__=e.slice(),this.__tlds_replaced__=!0,_u(this),this)};wt.prototype.normalize=function(e){e.schema||(e.url="http://"+e.url),e.schema==="mailto:"&&!/^mailto:/i.test(e.url)&&(e.url="mailto:"+e.url)};wt.prototype.onCompile=function(){};const qr=2147483647,Mt=36,ic=1,Xs=26,C2=38,S2=700,g0=72,_0=128,y0="-",R2=/^xn--/,D2=/[^\0-\x7F]/,x2=/[\x2E\u3002\uFF0E\uFF61]/g,P2={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},qo=Mt-ic,Lt=Math.floor,jo=String.fromCharCode;function An(t){throw new RangeError(P2[t])}function V2(t,e){const n=[];let r=t.length;for(;r--;)n[r]=e(t[r]);return n}function b0(t,e){const n=t.split("@");let r="";n.length>1&&(r=n[0]+"@",t=n[1]),t=t.replace(x2,".");const s=t.split("."),i=V2(s,e).join(".");return r+i}function E0(t){const e=[];let n=0;const r=t.length;for(;n<r;){const s=t.charCodeAt(n++);if(s>=55296&&s<=56319&&n<r){const i=t.charCodeAt(n++);(i&64512)==56320?e.push(((s&1023)<<10)+(i&1023)+65536):(e.push(s),n--)}else e.push(s)}return e}const N2=t=>String.fromCodePoint(...t),k2=function(t){return t>=48&&t<58?26+(t-48):t>=65&&t<91?t-65:t>=97&&t<123?t-97:Mt},Sh=function(t,e){return t+22+75*(t<26)-((e!=0)<<5)},T0=function(t,e,n){let r=0;for(t=n?Lt(t/S2):t>>1,t+=Lt(t/e);t>qo*Xs>>1;r+=Mt)t=Lt(t/qo);return Lt(r+(qo+1)*t/(t+C2))},v0=function(t){const e=[],n=t.length;let r=0,s=_0,i=g0,o=t.lastIndexOf(y0);o<0&&(o=0);for(let a=0;a<o;++a)t.charCodeAt(a)>=128&&An("not-basic"),e.push(t.charCodeAt(a));for(let a=o>0?o+1:0;a<n;){const c=r;for(let d=1,m=Mt;;m+=Mt){a>=n&&An("invalid-input");const _=k2(t.charCodeAt(a++));_>=Mt&&An("invalid-input"),_>Lt((qr-r)/d)&&An("overflow"),r+=_*d;const A=m<=i?ic:m>=i+Xs?Xs:m-i;if(_<A)break;const D=Mt-A;d>Lt(qr/D)&&An("overflow"),d*=D}const h=e.length+1;i=T0(r-c,h,c==0),Lt(r/h)>qr-s&&An("overflow"),s+=Lt(r/h),r%=h,e.splice(r++,0,s)}return String.fromCodePoint(...e)},I0=function(t){const e=[];t=E0(t);const n=t.length;let r=_0,s=0,i=g0;for(const c of t)c<128&&e.push(jo(c));const o=e.length;let a=o;for(o&&e.push(y0);a<n;){let c=qr;for(const d of t)d>=r&&d<c&&(c=d);const h=a+1;c-r>Lt((qr-s)/h)&&An("overflow"),s+=(c-r)*h,r=c;for(const d of t)if(d<r&&++s>qr&&An("overflow"),d===r){let m=s;for(let _=Mt;;_+=Mt){const A=_<=i?ic:_>=i+Xs?Xs:_-i;if(m<A)break;const D=m-A,k=Mt-A;e.push(jo(Sh(A+D%k,0))),m=Lt(D/k)}e.push(jo(Sh(m,0))),i=T0(s,h,a===o),s=0,++a}++s,++r}return e.join("")},F2=function(t){return b0(t,function(e){return R2.test(e)?v0(e.slice(4).toLowerCase()):e})},O2=function(t){return b0(t,function(e){return D2.test(e)?"xn--"+I0(e):e})},W4={version:"2.3.1",ucs2:{decode:E0,encode:N2},decode:v0,encode:I0,toASCII:O2,toUnicode:F2},M2=()=>{};var Rh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w0=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},L2=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},A0={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,h=c?t[s+2]:0,d=i>>2,m=(i&3)<<4|a>>4;let _=(a&15)<<2|h>>6,A=h&63;c||(A=64,o||(_=64)),r.push(n[d],n[m],n[_],n[A])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(w0(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):L2(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const m=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||h==null||m==null)throw new U2;const _=i<<2|a>>4;if(r.push(_),h!==64){const A=a<<4&240|h>>2;if(r.push(A),m!==64){const D=h<<6&192|m;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class U2 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const B2=function(t){const e=w0(t);return A0.encodeByteArray(e,!0)},yu=function(t){return B2(t).replace(/\./g,"")},C0=function(t){try{return A0.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q2(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j2=()=>q2().__FIREBASE_DEFAULTS__,$2=()=>{if(typeof process>"u"||typeof Rh>"u")return;const t=Rh.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},z2=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&C0(t[1]);return e&&JSON.parse(e)},Ku=()=>{try{return M2()||j2()||$2()||z2()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},S0=t=>Ku()?.emulatorHosts?.[t],H2=t=>{const e=S0(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},R0=()=>Ku()?.config,D0=t=>Ku()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W2{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ns(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function x0(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G2(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t};return[yu(JSON.stringify(n)),yu(JSON.stringify(o)),""].join(".")}const Bs={};function K2(){const t={prod:[],emulator:[]};for(const e of Object.keys(Bs))Bs[e]?t.emulator.push(e):t.prod.push(e);return t}function Q2(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Dh=!1;function P0(t,e){if(typeof window>"u"||typeof document>"u"||!ns(window.location.host)||Bs[t]===e||Bs[t]||Dh)return;Bs[t]=e;function n(_){return`__firebase__banner__${_}`}const r="__firebase__banner",i=K2().prod.length>0;function o(){const _=document.getElementById(r);_&&_.remove()}function a(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function c(_,A){_.setAttribute("width","24"),_.setAttribute("id",A),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function h(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{Dh=!0,o()},_}function d(_,A){_.setAttribute("id",A),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function m(){const _=Q2(r),A=n("text"),D=document.getElementById(A)||document.createElement("span"),k=n("learnmore"),L=document.getElementById(k)||document.createElement("a"),$=n("preprendIcon"),K=document.getElementById($)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const Q=_.element;a(Q),d(L,k);const H=h();c(K,$),Q.append(K,D,L,H),document.body.appendChild(Q)}i?(D.innerText="Preview backend disconnected.",K.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(K.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,D.innerText="Preview backend running in this workspace."),D.setAttribute("id",A)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function J2(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(it())}function X2(){const t=Ku()?.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Y2(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Z2(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function ey(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ty(){const t=it();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function ny(){return!X2()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ry(){try{return typeof indexedDB=="object"}catch{return!1}}function sy(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iy="FirebaseError";class gn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=iy,Object.setPrototypeOf(this,gn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,fi.prototype.create)}}class fi{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?uy(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new gn(s,a,r)}}function uy(t,e){return t.replace(oy,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const oy=/\{\$([^}]+)}/g;function ay(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function dr(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(xh(i)&&xh(o)){if(!dr(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function xh(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function di(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function cy(t,e){const n=new ly(t,e);return n.subscribe.bind(n)}class ly{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");hy(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=$o),s.error===void 0&&(s.error=$o),s.complete===void 0&&(s.complete=$o);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function hy(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function $o(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(t){return t&&t._delegate?t._delegate:t}class pr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fy{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new W2;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(py(e))try{this.getOrInitializeService({instanceIdentifier:or})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=or){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=or){return this.instances.has(e)}getOptions(e=or){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:dy(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=or){return this.component?this.component.multipleInstances?e:or:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function dy(t){return t===or?void 0:t}function py(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class my{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new fy(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ae;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ae||(ae={}));const gy={debug:ae.DEBUG,verbose:ae.VERBOSE,info:ae.INFO,warn:ae.WARN,error:ae.ERROR,silent:ae.SILENT},_y=ae.INFO,yy={[ae.DEBUG]:"log",[ae.VERBOSE]:"log",[ae.INFO]:"info",[ae.WARN]:"warn",[ae.ERROR]:"error"},by=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=yy[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class uc{constructor(e){this.name=e,this._logLevel=_y,this._logHandler=by,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ae))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?gy[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ae.DEBUG,...e),this._logHandler(this,ae.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ae.VERBOSE,...e),this._logHandler(this,ae.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ae.INFO,...e),this._logHandler(this,ae.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ae.WARN,...e),this._logHandler(this,ae.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ae.ERROR,...e),this._logHandler(this,ae.ERROR,...e)}}const Ey=(t,e)=>e.some(n=>t instanceof n);let Ph,Vh;function Ty(){return Ph||(Ph=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function vy(){return Vh||(Vh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const V0=new WeakMap,ma=new WeakMap,N0=new WeakMap,zo=new WeakMap,oc=new WeakMap;function Iy(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(kn(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&V0.set(n,t)}).catch(()=>{}),oc.set(e,t),e}function wy(t){if(ma.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});ma.set(t,e)}let ga={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ma.get(t);if(e==="objectStoreNames")return t.objectStoreNames||N0.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return kn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Ay(t){ga=t(ga)}function Cy(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Ho(this),e,...n);return N0.set(r,e.sort?e.sort():[e]),kn(r)}:vy().includes(t)?function(...e){return t.apply(Ho(this),e),kn(V0.get(this))}:function(...e){return kn(t.apply(Ho(this),e))}}function Sy(t){return typeof t=="function"?Cy(t):(t instanceof IDBTransaction&&wy(t),Ey(t,Ty())?new Proxy(t,ga):t)}function kn(t){if(t instanceof IDBRequest)return Iy(t);if(zo.has(t))return zo.get(t);const e=Sy(t);return e!==t&&(zo.set(t,e),oc.set(e,t)),e}const Ho=t=>oc.get(t);function Ry(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=kn(o);return r&&o.addEventListener("upgradeneeded",c=>{r(kn(o.result),c.oldVersion,c.newVersion,kn(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),a}const Dy=["get","getKey","getAll","getAllKeys","count"],xy=["put","add","delete","clear"],Wo=new Map;function Nh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Wo.get(e))return Wo.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=xy.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Dy.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let h=c.store;return r&&(h=h.index(a.shift())),(await Promise.all([h[n](...a),s&&c.done]))[0]};return Wo.set(e,i),i}Ay(t=>({...t,get:(e,n,r)=>Nh(e,n)||t.get(e,n,r),has:(e,n)=>!!Nh(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Py{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Vy(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Vy(t){return t.getComponent()?.type==="VERSION"}const _a="@firebase/app",kh="0.14.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln=new uc("@firebase/app"),Ny="@firebase/app-compat",ky="@firebase/analytics-compat",Fy="@firebase/analytics",Oy="@firebase/app-check-compat",My="@firebase/app-check",Ly="@firebase/auth",Uy="@firebase/auth-compat",By="@firebase/database",qy="@firebase/data-connect",jy="@firebase/database-compat",$y="@firebase/functions",zy="@firebase/functions-compat",Hy="@firebase/installations",Wy="@firebase/installations-compat",Gy="@firebase/messaging",Ky="@firebase/messaging-compat",Qy="@firebase/performance",Jy="@firebase/performance-compat",Xy="@firebase/remote-config",Yy="@firebase/remote-config-compat",Zy="@firebase/storage",eb="@firebase/storage-compat",tb="@firebase/firestore",nb="@firebase/ai",rb="@firebase/firestore-compat",sb="firebase",ib="12.2.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ya="[DEFAULT]",ub={[_a]:"fire-core",[Ny]:"fire-core-compat",[Fy]:"fire-analytics",[ky]:"fire-analytics-compat",[My]:"fire-app-check",[Oy]:"fire-app-check-compat",[Ly]:"fire-auth",[Uy]:"fire-auth-compat",[By]:"fire-rtdb",[qy]:"fire-data-connect",[jy]:"fire-rtdb-compat",[$y]:"fire-fn",[zy]:"fire-fn-compat",[Hy]:"fire-iid",[Wy]:"fire-iid-compat",[Gy]:"fire-fcm",[Ky]:"fire-fcm-compat",[Qy]:"fire-perf",[Jy]:"fire-perf-compat",[Xy]:"fire-rc",[Yy]:"fire-rc-compat",[Zy]:"fire-gcs",[eb]:"fire-gcs-compat",[tb]:"fire-fst",[rb]:"fire-fst-compat",[nb]:"fire-vertex","fire-js":"fire-js",[sb]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ys=new Map,ob=new Map,ba=new Map;function Fh(t,e){try{t.container.addComponent(e)}catch(n){ln.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Qr(t){const e=t.name;if(ba.has(e))return ln.debug(`There were multiple attempts to register component ${e}.`),!1;ba.set(e,t);for(const n of Ys.values())Fh(n,t);for(const n of ob.values())Fh(n,t);return!0}function ac(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function St(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ab={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Fn=new fi("app","Firebase",ab);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cb{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new pr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Fn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rs=ib;function lb(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:ya,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Fn.create("bad-app-name",{appName:String(s)});if(n||(n=R0()),!n)throw Fn.create("no-options");const i=Ys.get(s);if(i){if(dr(n,i.options)&&dr(r,i.config))return i;throw Fn.create("duplicate-app",{appName:s})}const o=new my(s);for(const c of ba.values())o.addComponent(c);const a=new cb(n,r,o);return Ys.set(s,a),a}function k0(t=ya){const e=Ys.get(t);if(!e&&t===ya&&R0())return lb();if(!e)throw Fn.create("no-app",{appName:t});return e}function G4(){return Array.from(Ys.values())}function lr(t,e,n){let r=ub[t]??t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ln.warn(o.join(" "));return}Qr(new pr(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hb="firebase-heartbeat-database",fb=1,Zs="firebase-heartbeat-store";let Go=null;function F0(){return Go||(Go=Ry(hb,fb,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Zs)}catch(n){console.warn(n)}}}}).catch(t=>{throw Fn.create("idb-open",{originalErrorMessage:t.message})})),Go}async function db(t){try{const n=(await F0()).transaction(Zs),r=await n.objectStore(Zs).get(O0(t));return await n.done,r}catch(e){if(e instanceof gn)ln.warn(e.message);else{const n=Fn.create("idb-get",{originalErrorMessage:e?.message});ln.warn(n.message)}}}async function Oh(t,e){try{const r=(await F0()).transaction(Zs,"readwrite");await r.objectStore(Zs).put(e,O0(t)),await r.done}catch(n){if(n instanceof gn)ln.warn(n.message);else{const r=Fn.create("idb-set",{originalErrorMessage:n?.message});ln.warn(r.message)}}}function O0(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pb=1024,mb=30;class gb{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new yb(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Mh();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>mb){const s=bb(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ln.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Mh(),{heartbeatsToSend:n,unsentEntries:r}=_b(this._heartbeatsCache.heartbeats),s=yu(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return ln.warn(e),""}}}function Mh(){return new Date().toISOString().substring(0,10)}function _b(t,e=pb){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Lh(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Lh(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class yb{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ry()?sy().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await db(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Oh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Oh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Lh(t){return yu(JSON.stringify({version:2,heartbeats:t})).length}function bb(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eb(t){Qr(new pr("platform-logger",e=>new Py(e),"PRIVATE")),Qr(new pr("heartbeat",e=>new gb(e),"PRIVATE")),lr(_a,kh,t),lr(_a,kh,"esm2020"),lr("fire-js","")}Eb("");var Uh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var On,M0;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,g){function E(){}E.prototype=g.prototype,I.D=g.prototype,I.prototype=new E,I.prototype.constructor=I,I.C=function(T,w,S){for(var b=Array(arguments.length-2),pt=2;pt<arguments.length;pt++)b[pt-2]=arguments[pt];return g.prototype[w].apply(T,b)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,g,E){E||(E=0);var T=Array(16);if(typeof g=="string")for(var w=0;16>w;++w)T[w]=g.charCodeAt(E++)|g.charCodeAt(E++)<<8|g.charCodeAt(E++)<<16|g.charCodeAt(E++)<<24;else for(w=0;16>w;++w)T[w]=g[E++]|g[E++]<<8|g[E++]<<16|g[E++]<<24;g=I.g[0],E=I.g[1],w=I.g[2];var S=I.g[3],b=g+(S^E&(w^S))+T[0]+3614090360&4294967295;g=E+(b<<7&4294967295|b>>>25),b=S+(w^g&(E^w))+T[1]+3905402710&4294967295,S=g+(b<<12&4294967295|b>>>20),b=w+(E^S&(g^E))+T[2]+606105819&4294967295,w=S+(b<<17&4294967295|b>>>15),b=E+(g^w&(S^g))+T[3]+3250441966&4294967295,E=w+(b<<22&4294967295|b>>>10),b=g+(S^E&(w^S))+T[4]+4118548399&4294967295,g=E+(b<<7&4294967295|b>>>25),b=S+(w^g&(E^w))+T[5]+1200080426&4294967295,S=g+(b<<12&4294967295|b>>>20),b=w+(E^S&(g^E))+T[6]+2821735955&4294967295,w=S+(b<<17&4294967295|b>>>15),b=E+(g^w&(S^g))+T[7]+4249261313&4294967295,E=w+(b<<22&4294967295|b>>>10),b=g+(S^E&(w^S))+T[8]+1770035416&4294967295,g=E+(b<<7&4294967295|b>>>25),b=S+(w^g&(E^w))+T[9]+2336552879&4294967295,S=g+(b<<12&4294967295|b>>>20),b=w+(E^S&(g^E))+T[10]+4294925233&4294967295,w=S+(b<<17&4294967295|b>>>15),b=E+(g^w&(S^g))+T[11]+2304563134&4294967295,E=w+(b<<22&4294967295|b>>>10),b=g+(S^E&(w^S))+T[12]+1804603682&4294967295,g=E+(b<<7&4294967295|b>>>25),b=S+(w^g&(E^w))+T[13]+4254626195&4294967295,S=g+(b<<12&4294967295|b>>>20),b=w+(E^S&(g^E))+T[14]+2792965006&4294967295,w=S+(b<<17&4294967295|b>>>15),b=E+(g^w&(S^g))+T[15]+1236535329&4294967295,E=w+(b<<22&4294967295|b>>>10),b=g+(w^S&(E^w))+T[1]+4129170786&4294967295,g=E+(b<<5&4294967295|b>>>27),b=S+(E^w&(g^E))+T[6]+3225465664&4294967295,S=g+(b<<9&4294967295|b>>>23),b=w+(g^E&(S^g))+T[11]+643717713&4294967295,w=S+(b<<14&4294967295|b>>>18),b=E+(S^g&(w^S))+T[0]+3921069994&4294967295,E=w+(b<<20&4294967295|b>>>12),b=g+(w^S&(E^w))+T[5]+3593408605&4294967295,g=E+(b<<5&4294967295|b>>>27),b=S+(E^w&(g^E))+T[10]+38016083&4294967295,S=g+(b<<9&4294967295|b>>>23),b=w+(g^E&(S^g))+T[15]+3634488961&4294967295,w=S+(b<<14&4294967295|b>>>18),b=E+(S^g&(w^S))+T[4]+3889429448&4294967295,E=w+(b<<20&4294967295|b>>>12),b=g+(w^S&(E^w))+T[9]+568446438&4294967295,g=E+(b<<5&4294967295|b>>>27),b=S+(E^w&(g^E))+T[14]+3275163606&4294967295,S=g+(b<<9&4294967295|b>>>23),b=w+(g^E&(S^g))+T[3]+4107603335&4294967295,w=S+(b<<14&4294967295|b>>>18),b=E+(S^g&(w^S))+T[8]+1163531501&4294967295,E=w+(b<<20&4294967295|b>>>12),b=g+(w^S&(E^w))+T[13]+2850285829&4294967295,g=E+(b<<5&4294967295|b>>>27),b=S+(E^w&(g^E))+T[2]+4243563512&4294967295,S=g+(b<<9&4294967295|b>>>23),b=w+(g^E&(S^g))+T[7]+1735328473&4294967295,w=S+(b<<14&4294967295|b>>>18),b=E+(S^g&(w^S))+T[12]+2368359562&4294967295,E=w+(b<<20&4294967295|b>>>12),b=g+(E^w^S)+T[5]+4294588738&4294967295,g=E+(b<<4&4294967295|b>>>28),b=S+(g^E^w)+T[8]+2272392833&4294967295,S=g+(b<<11&4294967295|b>>>21),b=w+(S^g^E)+T[11]+1839030562&4294967295,w=S+(b<<16&4294967295|b>>>16),b=E+(w^S^g)+T[14]+4259657740&4294967295,E=w+(b<<23&4294967295|b>>>9),b=g+(E^w^S)+T[1]+2763975236&4294967295,g=E+(b<<4&4294967295|b>>>28),b=S+(g^E^w)+T[4]+1272893353&4294967295,S=g+(b<<11&4294967295|b>>>21),b=w+(S^g^E)+T[7]+4139469664&4294967295,w=S+(b<<16&4294967295|b>>>16),b=E+(w^S^g)+T[10]+3200236656&4294967295,E=w+(b<<23&4294967295|b>>>9),b=g+(E^w^S)+T[13]+681279174&4294967295,g=E+(b<<4&4294967295|b>>>28),b=S+(g^E^w)+T[0]+3936430074&4294967295,S=g+(b<<11&4294967295|b>>>21),b=w+(S^g^E)+T[3]+3572445317&4294967295,w=S+(b<<16&4294967295|b>>>16),b=E+(w^S^g)+T[6]+76029189&4294967295,E=w+(b<<23&4294967295|b>>>9),b=g+(E^w^S)+T[9]+3654602809&4294967295,g=E+(b<<4&4294967295|b>>>28),b=S+(g^E^w)+T[12]+3873151461&4294967295,S=g+(b<<11&4294967295|b>>>21),b=w+(S^g^E)+T[15]+530742520&4294967295,w=S+(b<<16&4294967295|b>>>16),b=E+(w^S^g)+T[2]+3299628645&4294967295,E=w+(b<<23&4294967295|b>>>9),b=g+(w^(E|~S))+T[0]+4096336452&4294967295,g=E+(b<<6&4294967295|b>>>26),b=S+(E^(g|~w))+T[7]+1126891415&4294967295,S=g+(b<<10&4294967295|b>>>22),b=w+(g^(S|~E))+T[14]+2878612391&4294967295,w=S+(b<<15&4294967295|b>>>17),b=E+(S^(w|~g))+T[5]+4237533241&4294967295,E=w+(b<<21&4294967295|b>>>11),b=g+(w^(E|~S))+T[12]+1700485571&4294967295,g=E+(b<<6&4294967295|b>>>26),b=S+(E^(g|~w))+T[3]+2399980690&4294967295,S=g+(b<<10&4294967295|b>>>22),b=w+(g^(S|~E))+T[10]+4293915773&4294967295,w=S+(b<<15&4294967295|b>>>17),b=E+(S^(w|~g))+T[1]+2240044497&4294967295,E=w+(b<<21&4294967295|b>>>11),b=g+(w^(E|~S))+T[8]+1873313359&4294967295,g=E+(b<<6&4294967295|b>>>26),b=S+(E^(g|~w))+T[15]+4264355552&4294967295,S=g+(b<<10&4294967295|b>>>22),b=w+(g^(S|~E))+T[6]+2734768916&4294967295,w=S+(b<<15&4294967295|b>>>17),b=E+(S^(w|~g))+T[13]+1309151649&4294967295,E=w+(b<<21&4294967295|b>>>11),b=g+(w^(E|~S))+T[4]+4149444226&4294967295,g=E+(b<<6&4294967295|b>>>26),b=S+(E^(g|~w))+T[11]+3174756917&4294967295,S=g+(b<<10&4294967295|b>>>22),b=w+(g^(S|~E))+T[2]+718787259&4294967295,w=S+(b<<15&4294967295|b>>>17),b=E+(S^(w|~g))+T[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(w+(b<<21&4294967295|b>>>11))&4294967295,I.g[2]=I.g[2]+w&4294967295,I.g[3]=I.g[3]+S&4294967295}r.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var E=g-this.blockSize,T=this.B,w=this.h,S=0;S<g;){if(w==0)for(;S<=E;)s(this,I,S),S+=this.blockSize;if(typeof I=="string"){for(;S<g;)if(T[w++]=I.charCodeAt(S++),w==this.blockSize){s(this,T),w=0;break}}else for(;S<g;)if(T[w++]=I[S++],w==this.blockSize){s(this,T),w=0;break}}this.h=w,this.o+=g},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var E=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=E&255,E/=256;for(this.u(I),I=Array(16),g=E=0;4>g;++g)for(var T=0;32>T;T+=8)I[E++]=this.g[g]>>>T&255;return I};function i(I,g){var E=a;return Object.prototype.hasOwnProperty.call(E,I)?E[I]:E[I]=g(I)}function o(I,g){this.h=g;for(var E=[],T=!0,w=I.length-1;0<=w;w--){var S=I[w]|0;T&&S==g||(E[w]=S,T=!1)}this.g=E}var a={};function c(I){return-128<=I&&128>I?i(I,function(g){return new o([g|0],0>g?-1:0)}):new o([I|0],0>I?-1:0)}function h(I){if(isNaN(I)||!isFinite(I))return m;if(0>I)return L(h(-I));for(var g=[],E=1,T=0;I>=E;T++)g[T]=I/E|0,E*=4294967296;return new o(g,0)}function d(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return L(d(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var E=h(Math.pow(g,8)),T=m,w=0;w<I.length;w+=8){var S=Math.min(8,I.length-w),b=parseInt(I.substring(w,w+S),g);8>S?(S=h(Math.pow(g,S)),T=T.j(S).add(h(b))):(T=T.j(E),T=T.add(h(b)))}return T}var m=c(0),_=c(1),A=c(16777216);t=o.prototype,t.m=function(){if(k(this))return-L(this).m();for(var I=0,g=1,E=0;E<this.g.length;E++){var T=this.i(E);I+=(0<=T?T:4294967296+T)*g,g*=4294967296}return I},t.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(D(this))return"0";if(k(this))return"-"+L(this).toString(I);for(var g=h(Math.pow(I,6)),E=this,T="";;){var w=H(E,g).g;E=$(E,w.j(g));var S=((0<E.g.length?E.g[0]:E.h)>>>0).toString(I);if(E=w,D(E))return S+T;for(;6>S.length;)S="0"+S;T=S+T}},t.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function D(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function k(I){return I.h==-1}t.l=function(I){return I=$(this,I),k(I)?-1:D(I)?0:1};function L(I){for(var g=I.g.length,E=[],T=0;T<g;T++)E[T]=~I.g[T];return new o(E,~I.h).add(_)}t.abs=function(){return k(this)?L(this):this},t.add=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],T=0,w=0;w<=g;w++){var S=T+(this.i(w)&65535)+(I.i(w)&65535),b=(S>>>16)+(this.i(w)>>>16)+(I.i(w)>>>16);T=b>>>16,S&=65535,b&=65535,E[w]=b<<16|S}return new o(E,E[E.length-1]&-2147483648?-1:0)};function $(I,g){return I.add(L(g))}t.j=function(I){if(D(this)||D(I))return m;if(k(this))return k(I)?L(this).j(L(I)):L(L(this).j(I));if(k(I))return L(this.j(L(I)));if(0>this.l(A)&&0>I.l(A))return h(this.m()*I.m());for(var g=this.g.length+I.g.length,E=[],T=0;T<2*g;T++)E[T]=0;for(T=0;T<this.g.length;T++)for(var w=0;w<I.g.length;w++){var S=this.i(T)>>>16,b=this.i(T)&65535,pt=I.i(w)>>>16,_n=I.i(w)&65535;E[2*T+2*w]+=b*_n,K(E,2*T+2*w),E[2*T+2*w+1]+=S*_n,K(E,2*T+2*w+1),E[2*T+2*w+1]+=b*pt,K(E,2*T+2*w+1),E[2*T+2*w+2]+=S*pt,K(E,2*T+2*w+2)}for(T=0;T<g;T++)E[T]=E[2*T+1]<<16|E[2*T];for(T=g;T<2*g;T++)E[T]=0;return new o(E,0)};function K(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function Q(I,g){this.g=I,this.h=g}function H(I,g){if(D(g))throw Error("division by zero");if(D(I))return new Q(m,m);if(k(I))return g=H(L(I),g),new Q(L(g.g),L(g.h));if(k(g))return g=H(I,L(g)),new Q(L(g.g),g.h);if(30<I.g.length){if(k(I)||k(g))throw Error("slowDivide_ only works with positive integers.");for(var E=_,T=g;0>=T.l(I);)E=he(E),T=he(T);var w=we(E,1),S=we(T,1);for(T=we(T,2),E=we(E,2);!D(T);){var b=S.add(T);0>=b.l(I)&&(w=w.add(E),S=b),T=we(T,1),E=we(E,1)}return g=$(I,w.j(g)),new Q(w,g)}for(w=m;0<=I.l(g);){for(E=Math.max(1,Math.floor(I.m()/g.m())),T=Math.ceil(Math.log(E)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),S=h(E),b=S.j(g);k(b)||0<b.l(I);)E-=T,S=h(E),b=S.j(g);D(S)&&(S=_),w=w.add(S),I=$(I,b)}return new Q(w,I)}t.A=function(I){return H(this,I).h},t.and=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],T=0;T<g;T++)E[T]=this.i(T)&I.i(T);return new o(E,this.h&I.h)},t.or=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],T=0;T<g;T++)E[T]=this.i(T)|I.i(T);return new o(E,this.h|I.h)},t.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],T=0;T<g;T++)E[T]=this.i(T)^I.i(T);return new o(E,this.h^I.h)};function he(I){for(var g=I.g.length+1,E=[],T=0;T<g;T++)E[T]=I.i(T)<<1|I.i(T-1)>>>31;return new o(E,I.h)}function we(I,g){var E=g>>5;g%=32;for(var T=I.g.length-E,w=[],S=0;S<T;S++)w[S]=0<g?I.i(S+E)>>>g|I.i(S+E+1)<<32-g:I.i(S+E);return new o(w,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,M0=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=d,On=o}).apply(typeof Uh<"u"?Uh:typeof self<"u"?self:typeof window<"u"?window:{});var ji=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var L0,Ds,U0,Yi,Ea,B0,q0,j0;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(u,l,f){return u==Array.prototype||u==Object.prototype||(u[l]=f.value),u};function n(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof ji=="object"&&ji];for(var l=0;l<u.length;++l){var f=u[l];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function s(u,l){if(l)e:{var f=r;u=u.split(".");for(var p=0;p<u.length-1;p++){var C=u[p];if(!(C in f))break e;f=f[C]}u=u[u.length-1],p=f[u],l=l(p),l!=p&&l!=null&&e(f,u,{configurable:!0,writable:!0,value:l})}}function i(u,l){u instanceof String&&(u+="");var f=0,p=!1,C={next:function(){if(!p&&f<u.length){var R=f++;return{value:l(R,u[R]),done:!1}}return p=!0,{done:!0,value:void 0}}};return C[Symbol.iterator]=function(){return C},C}s("Array.prototype.values",function(u){return u||function(){return i(this,function(l,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function c(u){var l=typeof u;return l=l!="object"?l:u?Array.isArray(u)?"array":l:"null",l=="array"||l=="object"&&typeof u.length=="number"}function h(u){var l=typeof u;return l=="object"&&u!=null||l=="function"}function d(u,l,f){return u.call.apply(u.bind,arguments)}function m(u,l,f){if(!u)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var C=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(C,p),u.apply(l,C)}}return function(){return u.apply(l,arguments)}}function _(u,l,f){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:m,_.apply(null,arguments)}function A(u,l){var f=Array.prototype.slice.call(arguments,1);return function(){var p=f.slice();return p.push.apply(p,arguments),u.apply(this,p)}}function D(u,l){function f(){}f.prototype=l.prototype,u.aa=l.prototype,u.prototype=new f,u.prototype.constructor=u,u.Qb=function(p,C,R){for(var q=Array(arguments.length-2),Ee=2;Ee<arguments.length;Ee++)q[Ee-2]=arguments[Ee];return l.prototype[C].apply(p,q)}}function k(u){const l=u.length;if(0<l){const f=Array(l);for(let p=0;p<l;p++)f[p]=u[p];return f}return[]}function L(u,l){for(let f=1;f<arguments.length;f++){const p=arguments[f];if(c(p)){const C=u.length||0,R=p.length||0;u.length=C+R;for(let q=0;q<R;q++)u[C+q]=p[q]}else u.push(p)}}class ${constructor(l,f){this.i=l,this.j=f,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function K(u){return/^[\s\xa0]*$/.test(u)}function Q(){var u=a.navigator;return u&&(u=u.userAgent)?u:""}function H(u){return H[" "](u),u}H[" "]=function(){};var he=Q().indexOf("Gecko")!=-1&&!(Q().toLowerCase().indexOf("webkit")!=-1&&Q().indexOf("Edge")==-1)&&!(Q().indexOf("Trident")!=-1||Q().indexOf("MSIE")!=-1)&&Q().indexOf("Edge")==-1;function we(u,l,f){for(const p in u)l.call(f,u[p],p,u)}function I(u,l){for(const f in u)l.call(void 0,u[f],f,u)}function g(u){const l={};for(const f in u)l[f]=u[f];return l}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(u,l){let f,p;for(let C=1;C<arguments.length;C++){p=arguments[C];for(f in p)u[f]=p[f];for(let R=0;R<E.length;R++)f=E[R],Object.prototype.hasOwnProperty.call(p,f)&&(u[f]=p[f])}}function w(u){var l=1;u=u.split(":");const f=[];for(;0<l&&u.length;)f.push(u.shift()),l--;return u.length&&f.push(u.join(":")),f}function S(u){a.setTimeout(()=>{throw u},0)}function b(){var u=At;let l=null;return u.g&&(l=u.g,u.g=u.g.next,u.g||(u.h=null),l.next=null),l}class pt{constructor(){this.h=this.g=null}add(l,f){const p=_n.get();p.set(l,f),this.h?this.h.next=p:this.g=p,this.h=p}}var _n=new $(()=>new je,u=>u.reset());class je{constructor(){this.next=this.g=this.h=null}set(l,f){this.h=l,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let be,pe=!1,At=new pt,Xn=()=>{const u=a.Promise.resolve(void 0);be=()=>{u.then(Qt)}};var Qt=()=>{for(var u;u=b();){try{u.h.call(u.g)}catch(f){S(f)}var l=_n;l.j(u),100>l.h&&(l.h++,u.next=l.g,l.g=u)}pe=!1};function Fe(){this.s=this.s,this.C=this.C}Fe.prototype.s=!1,Fe.prototype.ma=function(){this.s||(this.s=!0,this.N())},Fe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Oe(u,l){this.type=u,this.g=this.target=l,this.defaultPrevented=!1}Oe.prototype.h=function(){this.defaultPrevented=!0};var fo=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var u=!1,l=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const f=()=>{};a.addEventListener("test",f,l),a.removeEventListener("test",f,l)}catch{}return u})();function Yn(u,l){if(Oe.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u){var f=this.type=u.type,p=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;if(this.target=u.target||u.srcElement,this.g=l,l=u.relatedTarget){if(he){e:{try{H(l.nodeName);var C=!0;break e}catch{}C=!1}C||(l=null)}}else f=="mouseover"?l=u.fromElement:f=="mouseout"&&(l=u.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=typeof u.pointerType=="string"?u.pointerType:Zn[u.pointerType]||"",this.state=u.state,this.i=u,u.defaultPrevented&&Yn.aa.h.call(this)}}D(Yn,Oe);var Zn={2:"touch",3:"pen",4:"mouse"};Yn.prototype.h=function(){Yn.aa.h.call(this);var u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var Jt="closure_listenable_"+(1e6*Math.random()|0),ls=0;function vi(u,l,f,p,C){this.listener=u,this.proxy=null,this.src=l,this.type=f,this.capture=!!p,this.ha=C,this.key=++ls,this.da=this.fa=!1}function Vt(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function hs(u){this.src=u,this.g={},this.h=0}hs.prototype.add=function(u,l,f,p,C){var R=u.toString();u=this.g[R],u||(u=this.g[R]=[],this.h++);var q=v(u,l,p,C);return-1<q?(l=u[q],f||(l.fa=!1)):(l=new vi(l,this.src,R,!!p,C),l.fa=f,u.push(l)),l};function y(u,l){var f=l.type;if(f in u.g){var p=u.g[f],C=Array.prototype.indexOf.call(p,l,void 0),R;(R=0<=C)&&Array.prototype.splice.call(p,C,1),R&&(Vt(l),u.g[f].length==0&&(delete u.g[f],u.h--))}}function v(u,l,f,p){for(var C=0;C<u.length;++C){var R=u[C];if(!R.da&&R.listener==l&&R.capture==!!f&&R.ha==p)return C}return-1}var x="closure_lm_"+(1e6*Math.random()|0),O={};function N(u,l,f,p,C){if(Array.isArray(l)){for(var R=0;R<l.length;R++)N(u,l[R],f,p,C);return null}return f=te(f),u&&u[Jt]?u.K(l,f,h(p)?!!p.capture:!1,C):F(u,l,f,!1,p,C)}function F(u,l,f,p,C,R){if(!l)throw Error("Invalid event type");var q=h(C)?!!C.capture:!!C,Ee=z(u);if(Ee||(u[x]=Ee=new hs(u)),f=Ee.add(l,f,p,q,R),f.proxy)return f;if(p=j(),f.proxy=p,p.src=u,p.listener=f,u.addEventListener)fo||(C=q),C===void 0&&(C=!1),u.addEventListener(l.toString(),p,C);else if(u.attachEvent)u.attachEvent(M(l.toString()),p);else if(u.addListener&&u.removeListener)u.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return f}function j(){function u(f){return l.call(u.src,u.listener,f)}const l=Y;return u}function B(u,l,f,p,C){if(Array.isArray(l))for(var R=0;R<l.length;R++)B(u,l[R],f,p,C);else p=h(p)?!!p.capture:!!p,f=te(f),u&&u[Jt]?(u=u.i,l=String(l).toString(),l in u.g&&(R=u.g[l],f=v(R,f,p,C),-1<f&&(Vt(R[f]),Array.prototype.splice.call(R,f,1),R.length==0&&(delete u.g[l],u.h--)))):u&&(u=z(u))&&(l=u.g[l.toString()],u=-1,l&&(u=v(l,f,p,C)),(f=-1<u?l[u]:null)&&U(f))}function U(u){if(typeof u!="number"&&u&&!u.da){var l=u.src;if(l&&l[Jt])y(l.i,u);else{var f=u.type,p=u.proxy;l.removeEventListener?l.removeEventListener(f,p,u.capture):l.detachEvent?l.detachEvent(M(f),p):l.addListener&&l.removeListener&&l.removeListener(p),(f=z(l))?(y(f,u),f.h==0&&(f.src=null,l[x]=null)):Vt(u)}}}function M(u){return u in O?O[u]:O[u]="on"+u}function Y(u,l){if(u.da)u=!0;else{l=new Yn(l,this);var f=u.listener,p=u.ha||u.src;u.fa&&U(u),u=f.call(p,l)}return u}function z(u){return u=u[x],u instanceof hs?u:null}var J="__closure_events_fn_"+(1e9*Math.random()>>>0);function te(u){return typeof u=="function"?u:(u[J]||(u[J]=function(l){return u.handleEvent(l)}),u[J])}function Z(){Fe.call(this),this.i=new hs(this),this.M=this,this.F=null}D(Z,Fe),Z.prototype[Jt]=!0,Z.prototype.removeEventListener=function(u,l,f,p){B(this,u,l,f,p)};function ue(u,l){var f,p=u.F;if(p)for(f=[];p;p=p.F)f.push(p);if(u=u.M,p=l.type||l,typeof l=="string")l=new Oe(l,u);else if(l instanceof Oe)l.target=l.target||u;else{var C=l;l=new Oe(p,u),T(l,C)}if(C=!0,f)for(var R=f.length-1;0<=R;R--){var q=l.g=f[R];C=fe(q,p,!0,l)&&C}if(q=l.g=u,C=fe(q,p,!0,l)&&C,C=fe(q,p,!1,l)&&C,f)for(R=0;R<f.length;R++)q=l.g=f[R],C=fe(q,p,!1,l)&&C}Z.prototype.N=function(){if(Z.aa.N.call(this),this.i){var u=this.i,l;for(l in u.g){for(var f=u.g[l],p=0;p<f.length;p++)Vt(f[p]);delete u.g[l],u.h--}}this.F=null},Z.prototype.K=function(u,l,f,p){return this.i.add(String(u),l,!1,f,p)},Z.prototype.L=function(u,l,f,p){return this.i.add(String(u),l,!0,f,p)};function fe(u,l,f,p){if(l=u.i.g[String(l)],!l)return!0;l=l.concat();for(var C=!0,R=0;R<l.length;++R){var q=l[R];if(q&&!q.da&&q.capture==f){var Ee=q.listener,We=q.ha||q.src;q.fa&&y(u.i,q),C=Ee.call(We,p)!==!1&&C}}return C&&!p.defaultPrevented}function $e(u,l,f){if(typeof u=="function")f&&(u=_(u,f));else if(u&&typeof u.handleEvent=="function")u=_(u.handleEvent,u);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:a.setTimeout(u,l||0)}function ze(u){u.g=$e(()=>{u.g=null,u.i&&(u.i=!1,ze(u))},u.l);const l=u.h;u.h=null,u.m.apply(null,l)}class yt extends Fe{constructor(l,f){super(),this.m=l,this.l=f,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:ze(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Xe(u){Fe.call(this),this.h=u,this.g={}}D(Xe,Fe);var yn=[];function fs(u){we(u.g,function(l,f){this.g.hasOwnProperty(f)&&U(l)},u),u.g={}}Xe.prototype.N=function(){Xe.aa.N.call(this),fs(this)},Xe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var He=a.JSON.stringify,bt=a.JSON.parse,Ii=class{stringify(u){return a.JSON.stringify(u,void 0)}parse(u){return a.JSON.parse(u,void 0)}};function Ir(){}Ir.prototype.h=null;function Yc(u){return u.h||(u.h=u.i())}function Zc(){}var ds={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function po(){Oe.call(this,"d")}D(po,Oe);function mo(){Oe.call(this,"c")}D(mo,Oe);var er={},el=null;function wi(){return el=el||new Z}er.La="serverreachability";function tl(u){Oe.call(this,er.La,u)}D(tl,Oe);function ps(u){const l=wi();ue(l,new tl(l))}er.STAT_EVENT="statevent";function nl(u,l){Oe.call(this,er.STAT_EVENT,u),this.stat=l}D(nl,Oe);function ut(u){const l=wi();ue(l,new nl(l,u))}er.Ma="timingevent";function rl(u,l){Oe.call(this,er.Ma,u),this.size=l}D(rl,Oe);function ms(u,l){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){u()},l)}function gs(){this.g=!0}gs.prototype.xa=function(){this.g=!1};function Hm(u,l,f,p,C,R){u.info(function(){if(u.g)if(R)for(var q="",Ee=R.split("&"),We=0;We<Ee.length;We++){var me=Ee[We].split("=");if(1<me.length){var Ye=me[0];me=me[1];var Ze=Ye.split("_");q=2<=Ze.length&&Ze[1]=="type"?q+(Ye+"="+me+"&"):q+(Ye+"=redacted&")}}else q=null;else q=R;return"XMLHTTP REQ ("+p+") [attempt "+C+"]: "+l+`
`+f+`
`+q})}function Wm(u,l,f,p,C,R,q){u.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+C+"]: "+l+`
`+f+`
`+R+" "+q})}function wr(u,l,f,p){u.info(function(){return"XMLHTTP TEXT ("+l+"): "+Km(u,f)+(p?" "+p:"")})}function Gm(u,l){u.info(function(){return"TIMEOUT: "+l})}gs.prototype.info=function(){};function Km(u,l){if(!u.g)return l;if(!l)return null;try{var f=JSON.parse(l);if(f){for(u=0;u<f.length;u++)if(Array.isArray(f[u])){var p=f[u];if(!(2>p.length)){var C=p[1];if(Array.isArray(C)&&!(1>C.length)){var R=C[0];if(R!="noop"&&R!="stop"&&R!="close")for(var q=1;q<C.length;q++)C[q]=""}}}}return He(f)}catch{return l}}var Ai={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},sl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},go;function Ci(){}D(Ci,Ir),Ci.prototype.g=function(){return new XMLHttpRequest},Ci.prototype.i=function(){return{}},go=new Ci;function bn(u,l,f,p){this.j=u,this.i=l,this.l=f,this.R=p||1,this.U=new Xe(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new il}function il(){this.i=null,this.g="",this.h=!1}var ul={},_o={};function yo(u,l,f){u.L=1,u.v=xi(Xt(l)),u.m=f,u.P=!0,ol(u,null)}function ol(u,l){u.F=Date.now(),Si(u),u.A=Xt(u.v);var f=u.A,p=u.R;Array.isArray(p)||(p=[String(p)]),Tl(f.i,"t",p),u.C=0,f=u.j.J,u.h=new il,u.g=Ul(u.j,f?l:null,!u.m),0<u.O&&(u.M=new yt(_(u.Y,u,u.g),u.O)),l=u.U,f=u.g,p=u.ca;var C="readystatechange";Array.isArray(C)||(C&&(yn[0]=C.toString()),C=yn);for(var R=0;R<C.length;R++){var q=N(f,C[R],p||l.handleEvent,!1,l.h||l);if(!q)break;l.g[q.key]=q}l=u.H?g(u.H):{},u.m?(u.u||(u.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.A,u.u,u.m,l)):(u.u="GET",u.g.ea(u.A,u.u,null,l)),ps(),Hm(u.i,u.u,u.A,u.l,u.R,u.m)}bn.prototype.ca=function(u){u=u.target;const l=this.M;l&&Yt(u)==3?l.j():this.Y(u)},bn.prototype.Y=function(u){try{if(u==this.g)e:{const Ze=Yt(this.g);var l=this.g.Ba();const Sr=this.g.Z();if(!(3>Ze)&&(Ze!=3||this.g&&(this.h.h||this.g.oa()||Rl(this.g)))){this.J||Ze!=4||l==7||(l==8||0>=Sr?ps(3):ps(2)),bo(this);var f=this.g.Z();this.X=f;t:if(al(this)){var p=Rl(this.g);u="";var C=p.length,R=Yt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){tr(this),_s(this);var q="";break t}this.h.i=new a.TextDecoder}for(l=0;l<C;l++)this.h.h=!0,u+=this.h.i.decode(p[l],{stream:!(R&&l==C-1)});p.length=0,this.h.g+=u,this.C=0,q=this.h.g}else q=this.g.oa();if(this.o=f==200,Wm(this.i,this.u,this.A,this.l,this.R,Ze,f),this.o){if(this.T&&!this.K){t:{if(this.g){var Ee,We=this.g;if((Ee=We.g?We.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(Ee)){var me=Ee;break t}}me=null}if(f=me)wr(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Eo(this,f);else{this.o=!1,this.s=3,ut(12),tr(this),_s(this);break e}}if(this.P){f=!0;let Ct;for(;!this.J&&this.C<q.length;)if(Ct=Qm(this,q),Ct==_o){Ze==4&&(this.s=4,ut(14),f=!1),wr(this.i,this.l,null,"[Incomplete Response]");break}else if(Ct==ul){this.s=4,ut(15),wr(this.i,this.l,q,"[Invalid Chunk]"),f=!1;break}else wr(this.i,this.l,Ct,null),Eo(this,Ct);if(al(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ze!=4||q.length!=0||this.h.h||(this.s=1,ut(16),f=!1),this.o=this.o&&f,!f)wr(this.i,this.l,q,"[Invalid Chunked Response]"),tr(this),_s(this);else if(0<q.length&&!this.W){this.W=!0;var Ye=this.j;Ye.g==this&&Ye.ba&&!Ye.M&&(Ye.j.info("Great, no buffering proxy detected. Bytes received: "+q.length),Co(Ye),Ye.M=!0,ut(11))}}else wr(this.i,this.l,q,null),Eo(this,q);Ze==4&&tr(this),this.o&&!this.J&&(Ze==4?Fl(this.j,this):(this.o=!1,Si(this)))}else fg(this.g),f==400&&0<q.indexOf("Unknown SID")?(this.s=3,ut(12)):(this.s=0,ut(13)),tr(this),_s(this)}}}catch{}finally{}};function al(u){return u.g?u.u=="GET"&&u.L!=2&&u.j.Ca:!1}function Qm(u,l){var f=u.C,p=l.indexOf(`
`,f);return p==-1?_o:(f=Number(l.substring(f,p)),isNaN(f)?ul:(p+=1,p+f>l.length?_o:(l=l.slice(p,p+f),u.C=p+f,l)))}bn.prototype.cancel=function(){this.J=!0,tr(this)};function Si(u){u.S=Date.now()+u.I,cl(u,u.I)}function cl(u,l){if(u.B!=null)throw Error("WatchDog timer not null");u.B=ms(_(u.ba,u),l)}function bo(u){u.B&&(a.clearTimeout(u.B),u.B=null)}bn.prototype.ba=function(){this.B=null;const u=Date.now();0<=u-this.S?(Gm(this.i,this.A),this.L!=2&&(ps(),ut(17)),tr(this),this.s=2,_s(this)):cl(this,this.S-u)};function _s(u){u.j.G==0||u.J||Fl(u.j,u)}function tr(u){bo(u);var l=u.M;l&&typeof l.ma=="function"&&l.ma(),u.M=null,fs(u.U),u.g&&(l=u.g,u.g=null,l.abort(),l.ma())}function Eo(u,l){try{var f=u.j;if(f.G!=0&&(f.g==u||To(f.h,u))){if(!u.K&&To(f.h,u)&&f.G==3){try{var p=f.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var C=p;if(C[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<u.F)Oi(f),ki(f);else break e;Ao(f),ut(18)}}else f.za=C[1],0<f.za-f.T&&37500>C[2]&&f.F&&f.v==0&&!f.C&&(f.C=ms(_(f.Za,f),6e3));if(1>=fl(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else rr(f,11)}else if((u.K||f.g==u)&&Oi(f),!K(l))for(C=f.Da.g.parse(l),l=0;l<C.length;l++){let me=C[l];if(f.T=me[0],me=me[1],f.G==2)if(me[0]=="c"){f.K=me[1],f.ia=me[2];const Ye=me[3];Ye!=null&&(f.la=Ye,f.j.info("VER="+f.la));const Ze=me[4];Ze!=null&&(f.Aa=Ze,f.j.info("SVER="+f.Aa));const Sr=me[5];Sr!=null&&typeof Sr=="number"&&0<Sr&&(p=1.5*Sr,f.L=p,f.j.info("backChannelRequestTimeoutMs_="+p)),p=f;const Ct=u.g;if(Ct){const Li=Ct.g?Ct.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Li){var R=p.h;R.g||Li.indexOf("spdy")==-1&&Li.indexOf("quic")==-1&&Li.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(vo(R,R.h),R.h=null))}if(p.D){const So=Ct.g?Ct.g.getResponseHeader("X-HTTP-Session-Id"):null;So&&(p.ya=So,Ae(p.I,p.D,So))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-u.F,f.j.info("Handshake RTT: "+f.R+"ms")),p=f;var q=u;if(p.qa=Ll(p,p.J?p.ia:null,p.W),q.K){dl(p.h,q);var Ee=q,We=p.L;We&&(Ee.I=We),Ee.B&&(bo(Ee),Si(Ee)),p.g=q}else Nl(p);0<f.i.length&&Fi(f)}else me[0]!="stop"&&me[0]!="close"||rr(f,7);else f.G==3&&(me[0]=="stop"||me[0]=="close"?me[0]=="stop"?rr(f,7):wo(f):me[0]!="noop"&&f.l&&f.l.ta(me),f.v=0)}}ps(4)}catch{}}var Jm=class{constructor(u,l){this.g=u,this.map=l}};function ll(u){this.l=u||10,a.PerformanceNavigationTiming?(u=a.performance.getEntriesByType("navigation"),u=0<u.length&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function hl(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function fl(u){return u.h?1:u.g?u.g.size:0}function To(u,l){return u.h?u.h==l:u.g?u.g.has(l):!1}function vo(u,l){u.g?u.g.add(l):u.h=l}function dl(u,l){u.h&&u.h==l?u.h=null:u.g&&u.g.has(l)&&u.g.delete(l)}ll.prototype.cancel=function(){if(this.i=pl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function pl(u){if(u.h!=null)return u.i.concat(u.h.D);if(u.g!=null&&u.g.size!==0){let l=u.i;for(const f of u.g.values())l=l.concat(f.D);return l}return k(u.i)}function Xm(u){if(u.V&&typeof u.V=="function")return u.V();if(typeof Map<"u"&&u instanceof Map||typeof Set<"u"&&u instanceof Set)return Array.from(u.values());if(typeof u=="string")return u.split("");if(c(u)){for(var l=[],f=u.length,p=0;p<f;p++)l.push(u[p]);return l}l=[],f=0;for(p in u)l[f++]=u[p];return l}function Ym(u){if(u.na&&typeof u.na=="function")return u.na();if(!u.V||typeof u.V!="function"){if(typeof Map<"u"&&u instanceof Map)return Array.from(u.keys());if(!(typeof Set<"u"&&u instanceof Set)){if(c(u)||typeof u=="string"){var l=[];u=u.length;for(var f=0;f<u;f++)l.push(f);return l}l=[],f=0;for(const p in u)l[f++]=p;return l}}}function ml(u,l){if(u.forEach&&typeof u.forEach=="function")u.forEach(l,void 0);else if(c(u)||typeof u=="string")Array.prototype.forEach.call(u,l,void 0);else for(var f=Ym(u),p=Xm(u),C=p.length,R=0;R<C;R++)l.call(void 0,p[R],f&&f[R],u)}var gl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Zm(u,l){if(u){u=u.split("&");for(var f=0;f<u.length;f++){var p=u[f].indexOf("="),C=null;if(0<=p){var R=u[f].substring(0,p);C=u[f].substring(p+1)}else R=u[f];l(R,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function nr(u){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,u instanceof nr){this.h=u.h,Ri(this,u.j),this.o=u.o,this.g=u.g,Di(this,u.s),this.l=u.l;var l=u.i,f=new Es;f.i=l.i,l.g&&(f.g=new Map(l.g),f.h=l.h),_l(this,f),this.m=u.m}else u&&(l=String(u).match(gl))?(this.h=!1,Ri(this,l[1]||"",!0),this.o=ys(l[2]||""),this.g=ys(l[3]||"",!0),Di(this,l[4]),this.l=ys(l[5]||"",!0),_l(this,l[6]||"",!0),this.m=ys(l[7]||"")):(this.h=!1,this.i=new Es(null,this.h))}nr.prototype.toString=function(){var u=[],l=this.j;l&&u.push(bs(l,yl,!0),":");var f=this.g;return(f||l=="file")&&(u.push("//"),(l=this.o)&&u.push(bs(l,yl,!0),"@"),u.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&u.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&u.push("/"),u.push(bs(f,f.charAt(0)=="/"?ng:tg,!0))),(f=this.i.toString())&&u.push("?",f),(f=this.m)&&u.push("#",bs(f,sg)),u.join("")};function Xt(u){return new nr(u)}function Ri(u,l,f){u.j=f?ys(l,!0):l,u.j&&(u.j=u.j.replace(/:$/,""))}function Di(u,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);u.s=l}else u.s=null}function _l(u,l,f){l instanceof Es?(u.i=l,ig(u.i,u.h)):(f||(l=bs(l,rg)),u.i=new Es(l,u.h))}function Ae(u,l,f){u.i.set(l,f)}function xi(u){return Ae(u,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),u}function ys(u,l){return u?l?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function bs(u,l,f){return typeof u=="string"?(u=encodeURI(u).replace(l,eg),f&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function eg(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var yl=/[#\/\?@]/g,tg=/[#\?:]/g,ng=/[#\?]/g,rg=/[#\?@]/g,sg=/#/g;function Es(u,l){this.h=this.g=null,this.i=u||null,this.j=!!l}function En(u){u.g||(u.g=new Map,u.h=0,u.i&&Zm(u.i,function(l,f){u.add(decodeURIComponent(l.replace(/\+/g," ")),f)}))}t=Es.prototype,t.add=function(u,l){En(this),this.i=null,u=Ar(this,u);var f=this.g.get(u);return f||this.g.set(u,f=[]),f.push(l),this.h+=1,this};function bl(u,l){En(u),l=Ar(u,l),u.g.has(l)&&(u.i=null,u.h-=u.g.get(l).length,u.g.delete(l))}function El(u,l){return En(u),l=Ar(u,l),u.g.has(l)}t.forEach=function(u,l){En(this),this.g.forEach(function(f,p){f.forEach(function(C){u.call(l,C,p,this)},this)},this)},t.na=function(){En(this);const u=Array.from(this.g.values()),l=Array.from(this.g.keys()),f=[];for(let p=0;p<l.length;p++){const C=u[p];for(let R=0;R<C.length;R++)f.push(l[p])}return f},t.V=function(u){En(this);let l=[];if(typeof u=="string")El(this,u)&&(l=l.concat(this.g.get(Ar(this,u))));else{u=Array.from(this.g.values());for(let f=0;f<u.length;f++)l=l.concat(u[f])}return l},t.set=function(u,l){return En(this),this.i=null,u=Ar(this,u),El(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[l]),this.h+=1,this},t.get=function(u,l){return u?(u=this.V(u),0<u.length?String(u[0]):l):l};function Tl(u,l,f){bl(u,l),0<f.length&&(u.i=null,u.g.set(Ar(u,l),k(f)),u.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],l=Array.from(this.g.keys());for(var f=0;f<l.length;f++){var p=l[f];const R=encodeURIComponent(String(p)),q=this.V(p);for(p=0;p<q.length;p++){var C=R;q[p]!==""&&(C+="="+encodeURIComponent(String(q[p]))),u.push(C)}}return this.i=u.join("&")};function Ar(u,l){return l=String(l),u.j&&(l=l.toLowerCase()),l}function ig(u,l){l&&!u.j&&(En(u),u.i=null,u.g.forEach(function(f,p){var C=p.toLowerCase();p!=C&&(bl(this,p),Tl(this,C,f))},u)),u.j=l}function ug(u,l){const f=new gs;if(a.Image){const p=new Image;p.onload=A(Tn,f,"TestLoadImage: loaded",!0,l,p),p.onerror=A(Tn,f,"TestLoadImage: error",!1,l,p),p.onabort=A(Tn,f,"TestLoadImage: abort",!1,l,p),p.ontimeout=A(Tn,f,"TestLoadImage: timeout",!1,l,p),a.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=u}else l(!1)}function og(u,l){const f=new gs,p=new AbortController,C=setTimeout(()=>{p.abort(),Tn(f,"TestPingServer: timeout",!1,l)},1e4);fetch(u,{signal:p.signal}).then(R=>{clearTimeout(C),R.ok?Tn(f,"TestPingServer: ok",!0,l):Tn(f,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(C),Tn(f,"TestPingServer: error",!1,l)})}function Tn(u,l,f,p,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),p(f)}catch{}}function ag(){this.g=new Ii}function cg(u,l,f){const p=f||"";try{ml(u,function(C,R){let q=C;h(C)&&(q=He(C)),l.push(p+R+"="+encodeURIComponent(q))})}catch(C){throw l.push(p+"type="+encodeURIComponent("_badmap")),C}}function Pi(u){this.l=u.Ub||null,this.j=u.eb||!1}D(Pi,Ir),Pi.prototype.g=function(){return new Vi(this.l,this.j)},Pi.prototype.i=(function(u){return function(){return u}})({});function Vi(u,l){Z.call(this),this.D=u,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(Vi,Z),t=Vi.prototype,t.open=function(u,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=u,this.A=l,this.readyState=1,vs(this)},t.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};u&&(l.body=u),(this.D||a).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ts(this)),this.readyState=0},t.Sa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,vs(this)),this.g&&(this.readyState=3,vs(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;vl(this)}else u.text().then(this.Ra.bind(this),this.ga.bind(this))};function vl(u){u.j.read().then(u.Pa.bind(u)).catch(u.ga.bind(u))}t.Pa=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var l=u.value?u.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!u.done}))&&(this.response=this.responseText+=l)}u.done?Ts(this):vs(this),this.readyState==3&&vl(this)}},t.Ra=function(u){this.g&&(this.response=this.responseText=u,Ts(this))},t.Qa=function(u){this.g&&(this.response=u,Ts(this))},t.ga=function(){this.g&&Ts(this)};function Ts(u){u.readyState=4,u.l=null,u.j=null,u.v=null,vs(u)}t.setRequestHeader=function(u,l){this.u.append(u,l)},t.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],l=this.h.entries();for(var f=l.next();!f.done;)f=f.value,u.push(f[0]+": "+f[1]),f=l.next();return u.join(`\r
`)};function vs(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(Vi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function Il(u){let l="";return we(u,function(f,p){l+=p,l+=":",l+=f,l+=`\r
`}),l}function Io(u,l,f){e:{for(p in f){var p=!1;break e}p=!0}p||(f=Il(f),typeof u=="string"?f!=null&&encodeURIComponent(String(f)):Ae(u,l,f))}function De(u){Z.call(this),this.headers=new Map,this.o=u||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(De,Z);var lg=/^https?$/i,hg=["POST","PUT"];t=De.prototype,t.Ha=function(u){this.J=u},t.ea=function(u,l,f,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);l=l?l.toUpperCase():"GET",this.D=u,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():go.g(),this.v=this.o?Yc(this.o):Yc(go),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(l,String(u),!0),this.B=!1}catch(R){wl(this,R);return}if(u=f||"",f=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var C in p)f.set(C,p[C]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const R of p.keys())f.set(R,p.get(R));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(f.keys()).find(R=>R.toLowerCase()=="content-type"),C=a.FormData&&u instanceof a.FormData,!(0<=Array.prototype.indexOf.call(hg,l,void 0))||p||C||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,q]of f)this.g.setRequestHeader(R,q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Sl(this),this.u=!0,this.g.send(u),this.u=!1}catch(R){wl(this,R)}};function wl(u,l){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=l,u.m=5,Al(u),Ni(u)}function Al(u){u.A||(u.A=!0,ue(u,"complete"),ue(u,"error"))}t.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=u||7,ue(this,"complete"),ue(this,"abort"),Ni(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ni(this,!0)),De.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Cl(this):this.bb())},t.bb=function(){Cl(this)};function Cl(u){if(u.h&&typeof o<"u"&&(!u.v[1]||Yt(u)!=4||u.Z()!=2)){if(u.u&&Yt(u)==4)$e(u.Ea,0,u);else if(ue(u,"readystatechange"),Yt(u)==4){u.h=!1;try{const q=u.Z();e:switch(q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var f;if(!(f=l)){var p;if(p=q===0){var C=String(u.D).match(gl)[1]||null;!C&&a.self&&a.self.location&&(C=a.self.location.protocol.slice(0,-1)),p=!lg.test(C?C.toLowerCase():"")}f=p}if(f)ue(u,"complete"),ue(u,"success");else{u.m=6;try{var R=2<Yt(u)?u.g.statusText:""}catch{R=""}u.l=R+" ["+u.Z()+"]",Al(u)}}finally{Ni(u)}}}}function Ni(u,l){if(u.g){Sl(u);const f=u.g,p=u.v[0]?()=>{}:null;u.g=null,u.v=null,l||ue(u,"ready");try{f.onreadystatechange=p}catch{}}}function Sl(u){u.I&&(a.clearTimeout(u.I),u.I=null)}t.isActive=function(){return!!this.g};function Yt(u){return u.g?u.g.readyState:0}t.Z=function(){try{return 2<Yt(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(u){if(this.g){var l=this.g.responseText;return u&&l.indexOf(u)==0&&(l=l.substring(u.length)),bt(l)}};function Rl(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.H){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function fg(u){const l={};u=(u.g&&2<=Yt(u)&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<u.length;p++){if(K(u[p]))continue;var f=w(u[p]);const C=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const R=l[C]||[];l[C]=R,R.push(f)}I(l,function(p){return p.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Is(u,l,f){return f&&f.internalChannelParams&&f.internalChannelParams[u]||l}function Dl(u){this.Aa=0,this.i=[],this.j=new gs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Is("failFast",!1,u),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Is("baseRetryDelayMs",5e3,u),this.cb=Is("retryDelaySeedMs",1e4,u),this.Wa=Is("forwardChannelMaxRetries",2,u),this.wa=Is("forwardChannelRequestTimeoutMs",2e4,u),this.pa=u&&u.xmlHttpFactory||void 0,this.Xa=u&&u.Tb||void 0,this.Ca=u&&u.useFetchStreams||!1,this.L=void 0,this.J=u&&u.supportsCrossDomainXhr||!1,this.K="",this.h=new ll(u&&u.concurrentRequestLimit),this.Da=new ag,this.P=u&&u.fastHandshake||!1,this.O=u&&u.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=u&&u.Rb||!1,u&&u.xa&&this.j.xa(),u&&u.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&u&&u.detectBufferingProxy||!1,this.ja=void 0,u&&u.longPollingTimeout&&0<u.longPollingTimeout&&(this.ja=u.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Dl.prototype,t.la=8,t.G=1,t.connect=function(u,l,f,p){ut(0),this.W=u,this.H=l||{},f&&p!==void 0&&(this.H.OSID=f,this.H.OAID=p),this.F=this.X,this.I=Ll(this,null,this.W),Fi(this)};function wo(u){if(xl(u),u.G==3){var l=u.U++,f=Xt(u.I);if(Ae(f,"SID",u.K),Ae(f,"RID",l),Ae(f,"TYPE","terminate"),ws(u,f),l=new bn(u,u.j,l),l.L=2,l.v=xi(Xt(f)),f=!1,a.navigator&&a.navigator.sendBeacon)try{f=a.navigator.sendBeacon(l.v.toString(),"")}catch{}!f&&a.Image&&(new Image().src=l.v,f=!0),f||(l.g=Ul(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Si(l)}Ml(u)}function ki(u){u.g&&(Co(u),u.g.cancel(),u.g=null)}function xl(u){ki(u),u.u&&(a.clearTimeout(u.u),u.u=null),Oi(u),u.h.cancel(),u.s&&(typeof u.s=="number"&&a.clearTimeout(u.s),u.s=null)}function Fi(u){if(!hl(u.h)&&!u.s){u.s=!0;var l=u.Ga;be||Xn(),pe||(be(),pe=!0),At.add(l,u),u.B=0}}function dg(u,l){return fl(u.h)>=u.h.j-(u.s?1:0)?!1:u.s?(u.i=l.D.concat(u.i),!0):u.G==1||u.G==2||u.B>=(u.Va?0:u.Wa)?!1:(u.s=ms(_(u.Ga,u,l),Ol(u,u.B)),u.B++,!0)}t.Ga=function(u){if(this.s)if(this.s=null,this.G==1){if(!u){this.U=Math.floor(1e5*Math.random()),u=this.U++;const C=new bn(this,this.j,u);let R=this.o;if(this.S&&(R?(R=g(R),T(R,this.S)):R=this.S),this.m!==null||this.O||(C.H=R,R=null),this.P)e:{for(var l=0,f=0;f<this.i.length;f++){t:{var p=this.i[f];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=f;break e}if(l===4096||f===this.i.length-1){l=f+1;break e}}l=1e3}else l=1e3;l=Vl(this,C,l),f=Xt(this.I),Ae(f,"RID",u),Ae(f,"CVER",22),this.D&&Ae(f,"X-HTTP-Session-Id",this.D),ws(this,f),R&&(this.O?l="headers="+encodeURIComponent(String(Il(R)))+"&"+l:this.m&&Io(f,this.m,R)),vo(this.h,C),this.Ua&&Ae(f,"TYPE","init"),this.P?(Ae(f,"$req",l),Ae(f,"SID","null"),C.T=!0,yo(C,f,null)):yo(C,f,l),this.G=2}}else this.G==3&&(u?Pl(this,u):this.i.length==0||hl(this.h)||Pl(this))};function Pl(u,l){var f;l?f=l.l:f=u.U++;const p=Xt(u.I);Ae(p,"SID",u.K),Ae(p,"RID",f),Ae(p,"AID",u.T),ws(u,p),u.m&&u.o&&Io(p,u.m,u.o),f=new bn(u,u.j,f,u.B+1),u.m===null&&(f.H=u.o),l&&(u.i=l.D.concat(u.i)),l=Vl(u,f,1e3),f.I=Math.round(.5*u.wa)+Math.round(.5*u.wa*Math.random()),vo(u.h,f),yo(f,p,l)}function ws(u,l){u.H&&we(u.H,function(f,p){Ae(l,p,f)}),u.l&&ml({},function(f,p){Ae(l,p,f)})}function Vl(u,l,f){f=Math.min(u.i.length,f);var p=u.l?_(u.l.Na,u.l,u):null;e:{var C=u.i;let R=-1;for(;;){const q=["count="+f];R==-1?0<f?(R=C[0].g,q.push("ofs="+R)):R=0:q.push("ofs="+R);let Ee=!0;for(let We=0;We<f;We++){let me=C[We].g;const Ye=C[We].map;if(me-=R,0>me)R=Math.max(0,C[We].g-100),Ee=!1;else try{cg(Ye,q,"req"+me+"_")}catch{p&&p(Ye)}}if(Ee){p=q.join("&");break e}}}return u=u.i.splice(0,f),l.D=u,p}function Nl(u){if(!u.g&&!u.u){u.Y=1;var l=u.Fa;be||Xn(),pe||(be(),pe=!0),At.add(l,u),u.v=0}}function Ao(u){return u.g||u.u||3<=u.v?!1:(u.Y++,u.u=ms(_(u.Fa,u),Ol(u,u.v)),u.v++,!0)}t.Fa=function(){if(this.u=null,kl(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var u=2*this.R;this.j.info("BP detection timer enabled: "+u),this.A=ms(_(this.ab,this),u)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ut(10),ki(this),kl(this))};function Co(u){u.A!=null&&(a.clearTimeout(u.A),u.A=null)}function kl(u){u.g=new bn(u,u.j,"rpc",u.Y),u.m===null&&(u.g.H=u.o),u.g.O=0;var l=Xt(u.qa);Ae(l,"RID","rpc"),Ae(l,"SID",u.K),Ae(l,"AID",u.T),Ae(l,"CI",u.F?"0":"1"),!u.F&&u.ja&&Ae(l,"TO",u.ja),Ae(l,"TYPE","xmlhttp"),ws(u,l),u.m&&u.o&&Io(l,u.m,u.o),u.L&&(u.g.I=u.L);var f=u.g;u=u.ia,f.L=1,f.v=xi(Xt(l)),f.m=null,f.P=!0,ol(f,u)}t.Za=function(){this.C!=null&&(this.C=null,ki(this),Ao(this),ut(19))};function Oi(u){u.C!=null&&(a.clearTimeout(u.C),u.C=null)}function Fl(u,l){var f=null;if(u.g==l){Oi(u),Co(u),u.g=null;var p=2}else if(To(u.h,l))f=l.D,dl(u.h,l),p=1;else return;if(u.G!=0){if(l.o)if(p==1){f=l.m?l.m.length:0,l=Date.now()-l.F;var C=u.B;p=wi(),ue(p,new rl(p,f)),Fi(u)}else Nl(u);else if(C=l.s,C==3||C==0&&0<l.X||!(p==1&&dg(u,l)||p==2&&Ao(u)))switch(f&&0<f.length&&(l=u.h,l.i=l.i.concat(f)),C){case 1:rr(u,5);break;case 4:rr(u,10);break;case 3:rr(u,6);break;default:rr(u,2)}}}function Ol(u,l){let f=u.Ta+Math.floor(Math.random()*u.cb);return u.isActive()||(f*=2),f*l}function rr(u,l){if(u.j.info("Error code "+l),l==2){var f=_(u.fb,u),p=u.Xa;const C=!p;p=new nr(p||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Ri(p,"https"),xi(p),C?ug(p.toString(),f):og(p.toString(),f)}else ut(2);u.G=0,u.l&&u.l.sa(l),Ml(u),xl(u)}t.fb=function(u){u?(this.j.info("Successfully pinged google.com"),ut(2)):(this.j.info("Failed to ping google.com"),ut(1))};function Ml(u){if(u.G=0,u.ka=[],u.l){const l=pl(u.h);(l.length!=0||u.i.length!=0)&&(L(u.ka,l),L(u.ka,u.i),u.h.i.length=0,k(u.i),u.i.length=0),u.l.ra()}}function Ll(u,l,f){var p=f instanceof nr?Xt(f):new nr(f);if(p.g!="")l&&(p.g=l+"."+p.g),Di(p,p.s);else{var C=a.location;p=C.protocol,l=l?l+"."+C.hostname:C.hostname,C=+C.port;var R=new nr(null);p&&Ri(R,p),l&&(R.g=l),C&&Di(R,C),f&&(R.l=f),p=R}return f=u.D,l=u.ya,f&&l&&Ae(p,f,l),Ae(p,"VER",u.la),ws(u,p),p}function Ul(u,l,f){if(l&&!u.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=u.Ca&&!u.pa?new De(new Pi({eb:f})):new De(u.pa),l.Ha(u.J),l}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Bl(){}t=Bl.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Mi(){}Mi.prototype.g=function(u,l){return new mt(u,l)};function mt(u,l){Z.call(this),this.g=new Dl(l),this.l=u,this.h=l&&l.messageUrlParams||null,u=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(u?u["X-WebChannel-Content-Type"]=l.messageContentType:u={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(u?u["X-WebChannel-Client-Profile"]=l.va:u={"X-WebChannel-Client-Profile":l.va}),this.g.S=u,(u=l&&l.Sb)&&!K(u)&&(this.g.m=u),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!K(l)&&(this.g.D=l,u=this.h,u!==null&&l in u&&(u=this.h,l in u&&delete u[l])),this.j=new Cr(this)}D(mt,Z),mt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},mt.prototype.close=function(){wo(this.g)},mt.prototype.o=function(u){var l=this.g;if(typeof u=="string"){var f={};f.__data__=u,u=f}else this.u&&(f={},f.__data__=He(u),u=f);l.i.push(new Jm(l.Ya++,u)),l.G==3&&Fi(l)},mt.prototype.N=function(){this.g.l=null,delete this.j,wo(this.g),delete this.g,mt.aa.N.call(this)};function ql(u){po.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var l=u.__sm__;if(l){e:{for(const f in l){u=f;break e}u=void 0}(this.i=u)&&(u=this.i,l=l!==null&&u in l?l[u]:void 0),this.data=l}else this.data=u}D(ql,po);function jl(){mo.call(this),this.status=1}D(jl,mo);function Cr(u){this.g=u}D(Cr,Bl),Cr.prototype.ua=function(){ue(this.g,"a")},Cr.prototype.ta=function(u){ue(this.g,new ql(u))},Cr.prototype.sa=function(u){ue(this.g,new jl)},Cr.prototype.ra=function(){ue(this.g,"b")},Mi.prototype.createWebChannel=Mi.prototype.g,mt.prototype.send=mt.prototype.o,mt.prototype.open=mt.prototype.m,mt.prototype.close=mt.prototype.close,j0=function(){return new Mi},q0=function(){return wi()},B0=er,Ea={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ai.NO_ERROR=0,Ai.TIMEOUT=8,Ai.HTTP_ERROR=6,Yi=Ai,sl.COMPLETE="complete",U0=sl,Zc.EventType=ds,ds.OPEN="a",ds.CLOSE="b",ds.ERROR="c",ds.MESSAGE="d",Z.prototype.listen=Z.prototype.K,Ds=Zc,De.prototype.listenOnce=De.prototype.L,De.prototype.getLastError=De.prototype.Ka,De.prototype.getLastErrorCode=De.prototype.Ba,De.prototype.getStatus=De.prototype.Z,De.prototype.getResponseJson=De.prototype.Oa,De.prototype.getResponseText=De.prototype.oa,De.prototype.send=De.prototype.ea,De.prototype.setWithCredentials=De.prototype.Ha,L0=De}).apply(typeof ji<"u"?ji:typeof self<"u"?self:typeof window<"u"?window:{});const Bh="@firebase/firestore",qh="4.9.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}tt.UNAUTHENTICATED=new tt(null),tt.GOOGLE_CREDENTIALS=new tt("google-credentials-uid"),tt.FIRST_PARTY=new tt("first-party-uid"),tt.MOCK_USER=new tt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ss="12.2.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mr=new uc("@firebase/firestore");function Pr(){return mr.logLevel}function G(t,...e){if(mr.logLevel<=ae.DEBUG){const n=e.map(cc);mr.debug(`Firestore (${ss}): ${t}`,...n)}}function hn(t,...e){if(mr.logLevel<=ae.ERROR){const n=e.map(cc);mr.error(`Firestore (${ss}): ${t}`,...n)}}function Jr(t,...e){if(mr.logLevel<=ae.WARN){const n=e.map(cc);mr.warn(`Firestore (${ss}): ${t}`,...n)}}function cc(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(n){return JSON.stringify(n)})(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,$0(t,r,n)}function $0(t,e,n){let r=`FIRESTORE (${ss}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw hn(r),new Error(r)}function ye(t,e,n,r){let s="Unexpected state";typeof n=="string"?s=n:r=n,t||$0(e,s,r)}function ie(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends gn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(){this.promise=new Promise(((e,n)=>{this.resolve=e,this.reject=n}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z0{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Tb{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable((()=>n(tt.UNAUTHENTICATED)))}shutdown(){}}class vb{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable((()=>n(this.token.user)))}shutdown(){this.changeListener=null}}class Ib{constructor(e){this.t=e,this.currentUser=tt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){ye(this.o===void 0,42304);let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new hr;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new hr,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const c=i;e.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},a=c=>{G("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((c=>a(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(G("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new hr)}}),0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then((r=>this.i!==e?(G("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ye(typeof r.accessToken=="string",31837,{l:r}),new z0(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ye(e===null||typeof e=="string",2055,{h:e}),new tt(e)}}class wb{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=tt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Ab{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new wb(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable((()=>n(tt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class jh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Cb{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,St(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){ye(this.o===void 0,3512);const r=i=>{i.error!=null&&G("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,G("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{G("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):G("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new jh(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((n=>n?(ye(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new jh(n.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sb(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Sb(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%62))}return r}}function ce(t,e){return t<e?-1:t>e?1:0}function Ta(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const s=t.charAt(r),i=e.charAt(r);if(s!==i)return Ko(s)===Ko(i)?ce(s,i):Ko(s)?1:-1}return ce(t.length,e.length)}const Rb=55296,Db=57343;function Ko(t){const e=t.charCodeAt(0);return e>=Rb&&e<=Db}function Xr(t,e,n){return t.length===e.length&&t.every(((r,s)=>n(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $h="__name__";class Ft{constructor(e,n,r){n===void 0?n=0:n>e.length&&ee(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&ee(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Ft.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Ft?e.forEach((r=>{n.push(r)})):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=Ft.compareSegments(e.get(s),n.get(s));if(i!==0)return i}return ce(e.length,n.length)}static compareSegments(e,n){const r=Ft.isNumericId(e),s=Ft.isNumericId(n);return r&&!s?-1:!r&&s?1:r&&s?Ft.extractNumericId(e).compare(Ft.extractNumericId(n)):Ta(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return On.fromString(e.substring(4,e.length-2))}}class Ie extends Ft{construct(e,n,r){return new Ie(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter((s=>s.length>0)))}return new Ie(n)}static emptyPath(){return new Ie([])}}const xb=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Qe extends Ft{construct(e,n,r){return new Qe(e,n,r)}static isValidIdentifier(e){return xb.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Qe.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===$h}static keyField(){return new Qe([$h])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new W(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const a=e[s];if(a==="\\"){if(s+1===e.length)throw new W(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new W(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(r+=a,s++):(i(),s++)}if(i(),o)throw new W(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Qe(n)}static emptyPath(){return new Qe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(e){this.path=e}static fromPath(e){return new X(Ie.fromString(e))}static fromName(e){return new X(Ie.fromString(e).popFirst(5))}static empty(){return new X(Ie.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ie.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Ie.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new X(new Ie(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H0(t,e,n){if(!n)throw new W(P.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Pb(t,e,n,r){if(e===!0&&r===!0)throw new W(P.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function zh(t){if(!X.isDocumentKey(t))throw new W(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Hh(t){if(X.isDocumentKey(t))throw new W(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function W0(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function Qu(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ee(12329,{type:typeof t})}function jr(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new W(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Qu(t);throw new W(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(t,e){const n={typeString:t};return e&&(n.value=e),n}function pi(t,e){if(!W0(t))throw new W(P.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const o=t[r];if(s&&typeof o!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new W(P.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wh=-62135596800,Gh=1e6;class Ce{static now(){return Ce.fromMillis(Date.now())}static fromDate(e){return Ce.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*Gh);return new Ce(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new W(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new W(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<Wh)throw new W(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Gh}_compareTo(e){return this.seconds===e.seconds?ce(this.nanoseconds,e.nanoseconds):ce(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ce._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(pi(e,Ce._jsonSchema))return new Ce(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Wh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ce._jsonSchemaVersion="firestore/timestamp/1.0",Ce._jsonSchema={type:Ne("string",Ce._jsonSchemaVersion),seconds:Ne("number"),nanoseconds:Ne("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{static fromTimestamp(e){return new re(e)}static min(){return new re(new Ce(0,0))}static max(){return new re(new Ce(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ei=-1;function Vb(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=re.fromTimestamp(r===1e9?new Ce(n+1,0):new Ce(n,r));return new jn(s,X.empty(),e)}function Nb(t){return new jn(t.readTime,t.key,ei)}class jn{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new jn(re.min(),X.empty(),ei)}static max(){return new jn(re.max(),X.empty(),ei)}}function kb(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=X.comparator(t.documentKey,e.documentKey),n!==0?n:ce(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fb="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ob{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function is(t){if(t.code!==P.FAILED_PRECONDITION||t.message!==Fb)throw t;G("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)}),(n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)}))}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&ee(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new V(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}}))}toPromise(){return new Promise(((e,n)=>{this.next(e,n)}))}wrapUserFunction(e){try{const n=e();return n instanceof V?n:V.resolve(n)}catch(n){return V.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction((()=>e(n))):V.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction((()=>e(n))):V.reject(n)}static resolve(e){return new V(((n,r)=>{n(e)}))}static reject(e){return new V(((n,r)=>{r(e)}))}static waitFor(e){return new V(((n,r)=>{let s=0,i=0,o=!1;e.forEach((a=>{++s,a.next((()=>{++i,o&&i===s&&n()}),(c=>r(c)))})),o=!0,i===s&&n()}))}static or(e){let n=V.resolve(!1);for(const r of e)n=n.next((s=>s?V.resolve(s):r()));return n}static forEach(e,n){const r=[];return e.forEach(((s,i)=>{r.push(n.call(this,s,i))})),this.waitFor(r)}static mapArray(e,n){return new V(((r,s)=>{const i=e.length,o=new Array(i);let a=0;for(let c=0;c<i;c++){const h=c;n(e[h]).next((d=>{o[h]=d,++a,a===i&&r(o)}),(d=>s(d)))}}))}static doWhile(e,n){return new V(((r,s)=>{const i=()=>{e()===!0?n().next((()=>{i()}),s):r()};i()}))}}function Mb(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function us(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ju{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>n.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ju.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hc=-1;function Xu(t){return t==null}function bu(t){return t===0&&1/t==-1/0}function Lb(t){return typeof t=="number"&&Number.isInteger(t)&&!bu(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G0="";function Ub(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Kh(e)),e=Bb(t.get(n),e);return Kh(e)}function Bb(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const i=t.charAt(s);switch(i){case"\0":n+="";break;case G0:n+="";break;default:n+=i}}return n}function Kh(t){return t+G0+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qh(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function yr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function K0(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e,n){this.comparator=e,this.root=n||Ge.EMPTY}insert(e,n){return new Re(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Ge.BLACK,null,null))}remove(e){return new Re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ge.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((n,r)=>(e(n,r),!1)))}toString(){const e=[];return this.inorderTraversal(((n,r)=>(e.push(`${n}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new $i(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new $i(this.root,e,this.comparator,!1)}getReverseIterator(){return new $i(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new $i(this.root,e,this.comparator,!0)}}class $i{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ge{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??Ge.RED,this.left=s??Ge.EMPTY,this.right=i??Ge.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new Ge(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ge.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return Ge.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ge.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ge.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ee(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ee(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw ee(27949);return e+(this.isRed()?0:1)}}Ge.EMPTY=null,Ge.RED=!0,Ge.BLACK=!1;Ge.EMPTY=new class{constructor(){this.size=0}get key(){throw ee(57766)}get value(){throw ee(16141)}get color(){throw ee(16727)}get left(){throw ee(29726)}get right(){throw ee(36894)}copy(e,n,r,s,i){return this}insert(e,n,r){return new Ge(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.comparator=e,this.data=new Re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((n,r)=>(e(n),!1)))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Jh(this.data.getIterator())}getIteratorFrom(e){return new Jh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach((r=>{n=n.add(r)})),n}isEqual(e){if(!(e instanceof Le)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((n=>{e.push(n)})),e}toString(){const e=[];return this.forEach((n=>e.push(n))),"SortedSet("+e.toString()+")"}copy(e){const n=new Le(this.comparator);return n.data=e,n}}class Jh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e){this.fields=e,e.sort(Qe.comparator)}static empty(){return new Rt([])}unionWith(e){let n=new Le(Qe.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Rt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Xr(this.fields,e.fields,((n,r)=>n.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q0 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.binaryString=e}static fromBase64String(e){const n=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Q0("Invalid base64 string: "+i):i}})(e);return new Je(n)}static fromUint8Array(e){const n=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new Je(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(n){return btoa(n)})(this.binaryString)}toUint8Array(){return(function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ce(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Je.EMPTY_BYTE_STRING=new Je("");const qb=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function $n(t){if(ye(!!t,39018),typeof t=="string"){let e=0;const n=qb.exec(t);if(ye(!!n,46558,{timestamp:t}),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:xe(t.seconds),nanos:xe(t.nanos)}}function xe(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function zn(t){return typeof t=="string"?Je.fromBase64String(t):Je.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J0="server_timestamp",X0="__type__",Y0="__previous_value__",Z0="__local_write_time__";function fc(t){return(t?.mapValue?.fields||{})[X0]?.stringValue===J0}function Yu(t){const e=t.mapValue.fields[Y0];return fc(e)?Yu(e):e}function ti(t){const e=$n(t.mapValue.fields[Z0].timestampValue);return new Ce(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jb{constructor(e,n,r,s,i,o,a,c,h,d){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=d}}const Eu="(default)";class ni{constructor(e,n){this.projectId=e,this.database=n||Eu}static empty(){return new ni("","")}get isDefaultDatabase(){return this.database===Eu}isEqual(e){return e instanceof ni&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ep="__type__",$b="__max__",zi={mapValue:{}},tp="__vector__",Tu="value";function Hn(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?fc(t)?4:Hb(t)?9007199254740991:zb(t)?10:11:ee(28295,{value:t})}function Kt(t,e){if(t===e)return!0;const n=Hn(t);if(n!==Hn(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return ti(t).isEqual(ti(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=$n(s.timestampValue),a=$n(i.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos})(t,e);case 5:return t.stringValue===e.stringValue;case 6:return(function(s,i){return zn(s.bytesValue).isEqual(zn(i.bytesValue))})(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return(function(s,i){return xe(s.geoPointValue.latitude)===xe(i.geoPointValue.latitude)&&xe(s.geoPointValue.longitude)===xe(i.geoPointValue.longitude)})(t,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return xe(s.integerValue)===xe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=xe(s.doubleValue),a=xe(i.doubleValue);return o===a?bu(o)===bu(a):isNaN(o)&&isNaN(a)}return!1})(t,e);case 9:return Xr(t.arrayValue.values||[],e.arrayValue.values||[],Kt);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},a=i.mapValue.fields||{};if(Qh(o)!==Qh(a))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!Kt(o[c],a[c])))return!1;return!0})(t,e);default:return ee(52216,{left:t})}}function ri(t,e){return(t.values||[]).find((n=>Kt(n,e)))!==void 0}function Yr(t,e){if(t===e)return 0;const n=Hn(t),r=Hn(e);if(n!==r)return ce(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ce(t.booleanValue,e.booleanValue);case 2:return(function(i,o){const a=xe(i.integerValue||i.doubleValue),c=xe(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1})(t,e);case 3:return Xh(t.timestampValue,e.timestampValue);case 4:return Xh(ti(t),ti(e));case 5:return Ta(t.stringValue,e.stringValue);case 6:return(function(i,o){const a=zn(i),c=zn(o);return a.compareTo(c)})(t.bytesValue,e.bytesValue);case 7:return(function(i,o){const a=i.split("/"),c=o.split("/");for(let h=0;h<a.length&&h<c.length;h++){const d=ce(a[h],c[h]);if(d!==0)return d}return ce(a.length,c.length)})(t.referenceValue,e.referenceValue);case 8:return(function(i,o){const a=ce(xe(i.latitude),xe(o.latitude));return a!==0?a:ce(xe(i.longitude),xe(o.longitude))})(t.geoPointValue,e.geoPointValue);case 9:return Yh(t.arrayValue,e.arrayValue);case 10:return(function(i,o){const a=i.fields||{},c=o.fields||{},h=a[Tu]?.arrayValue,d=c[Tu]?.arrayValue,m=ce(h?.values?.length||0,d?.values?.length||0);return m!==0?m:Yh(h,d)})(t.mapValue,e.mapValue);case 11:return(function(i,o){if(i===zi.mapValue&&o===zi.mapValue)return 0;if(i===zi.mapValue)return 1;if(o===zi.mapValue)return-1;const a=i.fields||{},c=Object.keys(a),h=o.fields||{},d=Object.keys(h);c.sort(),d.sort();for(let m=0;m<c.length&&m<d.length;++m){const _=Ta(c[m],d[m]);if(_!==0)return _;const A=Yr(a[c[m]],h[d[m]]);if(A!==0)return A}return ce(c.length,d.length)})(t.mapValue,e.mapValue);default:throw ee(23264,{he:n})}}function Xh(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ce(t,e);const n=$n(t),r=$n(e),s=ce(n.seconds,r.seconds);return s!==0?s:ce(n.nanos,r.nanos)}function Yh(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=Yr(n[s],r[s]);if(i)return i}return ce(n.length,r.length)}function Zr(t){return va(t)}function va(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?(function(n){const r=$n(n);return`time(${r.seconds},${r.nanos})`})(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?(function(n){return zn(n).toBase64()})(t.bytesValue):"referenceValue"in t?(function(n){return X.fromName(n).toString()})(t.referenceValue):"geoPointValue"in t?(function(n){return`geo(${n.latitude},${n.longitude})`})(t.geoPointValue):"arrayValue"in t?(function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=va(i);return r+"]"})(t.arrayValue):"mapValue"in t?(function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${va(n.fields[o])}`;return s+"}"})(t.mapValue):ee(61005,{value:t})}function Zi(t){switch(Hn(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Yu(t);return e?16+Zi(e):16;case 5:return 2*t.stringValue.length;case 6:return zn(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Zi(i)),0)})(t.arrayValue);case 10:case 11:return(function(r){let s=0;return yr(r.fields,((i,o)=>{s+=i.length+Zi(o)})),s})(t.mapValue);default:throw ee(13486,{value:t})}}function Zh(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Ia(t){return!!t&&"integerValue"in t}function dc(t){return!!t&&"arrayValue"in t}function ef(t){return!!t&&"nullValue"in t}function tf(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function eu(t){return!!t&&"mapValue"in t}function zb(t){return(t?.mapValue?.fields||{})[ep]?.stringValue===tp}function qs(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return yr(t.mapValue.fields,((n,r)=>e.mapValue.fields[n]=qs(r))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=qs(t.arrayValue.values[n]);return e}return{...t}}function Hb(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===$b}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e){this.value=e}static empty(){return new Et({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!eu(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=qs(n)}setAll(e){let n=Qe.emptyPath(),r={},s=[];e.forEach(((o,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=a.popLast()}o?r[a.lastSegment()]=qs(o):s.push(a.lastSegment())}));const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());eu(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Kt(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];eu(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){yr(n,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new Et(qs(this.value))}}function np(t){const e=[];return yr(t.fields,((n,r)=>{const s=new Qe([n]);if(eu(r)){const i=np(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new Rt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,n,r,s,i,o,a){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new rt(e,0,re.min(),re.min(),re.min(),Et.empty(),0)}static newFoundDocument(e,n,r,s){return new rt(e,1,n,re.min(),r,s,0)}static newNoDocument(e,n){return new rt(e,2,n,re.min(),re.min(),Et.empty(),0)}static newUnknownDocument(e,n){return new rt(e,3,n,re.min(),re.min(),Et.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(re.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Et.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Et.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=re.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof rt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new rt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(e,n){this.position=e,this.inclusive=n}}function nf(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=X.comparator(X.fromName(o.referenceValue),n.key):r=Yr(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function rf(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Kt(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(e,n="asc"){this.field=e,this.dir=n}}function Wb(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{}class Ve extends rp{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new Kb(e,n,r):n==="array-contains"?new Xb(e,r):n==="in"?new Yb(e,r):n==="not-in"?new Zb(e,r):n==="array-contains-any"?new e3(e,r):new Ve(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new Qb(e,r):new Jb(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(Yr(n,this.value)):n!==null&&Hn(this.value)===Hn(n)&&this.matchesComparison(Yr(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ee(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Pt extends rp{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new Pt(e,n)}matches(e){return sp(this)?this.filters.find((n=>!n.matches(e)))===void 0:this.filters.find((n=>n.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,n)=>e.concat(n.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function sp(t){return t.op==="and"}function ip(t){return Gb(t)&&sp(t)}function Gb(t){for(const e of t.filters)if(e instanceof Pt)return!1;return!0}function wa(t){if(t instanceof Ve)return t.field.canonicalString()+t.op.toString()+Zr(t.value);if(ip(t))return t.filters.map((e=>wa(e))).join(",");{const e=t.filters.map((n=>wa(n))).join(",");return`${t.op}(${e})`}}function up(t,e){return t instanceof Ve?(function(r,s){return s instanceof Ve&&r.op===s.op&&r.field.isEqual(s.field)&&Kt(r.value,s.value)})(t,e):t instanceof Pt?(function(r,s){return s instanceof Pt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,a)=>i&&up(o,s.filters[a])),!0):!1})(t,e):void ee(19439)}function op(t){return t instanceof Ve?(function(n){return`${n.field.canonicalString()} ${n.op} ${Zr(n.value)}`})(t):t instanceof Pt?(function(n){return n.op.toString()+" {"+n.getFilters().map(op).join(" ,")+"}"})(t):"Filter"}class Kb extends Ve{constructor(e,n,r){super(e,n,r),this.key=X.fromName(r.referenceValue)}matches(e){const n=X.comparator(e.key,this.key);return this.matchesComparison(n)}}class Qb extends Ve{constructor(e,n){super(e,"in",n),this.keys=ap("in",n)}matches(e){return this.keys.some((n=>n.isEqual(e.key)))}}class Jb extends Ve{constructor(e,n){super(e,"not-in",n),this.keys=ap("not-in",n)}matches(e){return!this.keys.some((n=>n.isEqual(e.key)))}}function ap(t,e){return(e.arrayValue?.values||[]).map((n=>X.fromName(n.referenceValue)))}class Xb extends Ve{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return dc(n)&&ri(n.arrayValue,this.value)}}class Yb extends Ve{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&ri(this.value.arrayValue,n)}}class Zb extends Ve{constructor(e,n){super(e,"not-in",n)}matches(e){if(ri(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!ri(this.value.arrayValue,n)}}class e3 extends Ve{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!dc(n)||!n.arrayValue.values)&&n.arrayValue.values.some((r=>ri(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t3{constructor(e,n=null,r=[],s=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.Te=null}}function sf(t,e=null,n=[],r=[],s=null,i=null,o=null){return new t3(t,e,n,r,s,i,o)}function pc(t){const e=ie(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map((r=>wa(r))).join(","),n+="|ob:",n+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Xu(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map((r=>Zr(r))).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map((r=>Zr(r))).join(",")),e.Te=n}return e.Te}function mc(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Wb(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!up(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!rf(t.startAt,e.startAt)&&rf(t.endAt,e.endAt)}function Aa(t){return X.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(e,n=null,r=[],s=[],i=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function n3(t,e,n,r,s,i,o,a){return new os(t,e,n,r,s,i,o,a)}function gc(t){return new os(t)}function uf(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function cp(t){return t.collectionGroup!==null}function js(t){const e=ie(t);if(e.Ie===null){e.Ie=[];const n=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new Le(Qe.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((h=>{h.isInequality()&&(a=a.add(h.field))}))})),a})(e).forEach((i=>{n.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new si(i,r))})),n.has(Qe.keyField().canonicalString())||e.Ie.push(new si(Qe.keyField(),r))}return e.Ie}function Bt(t){const e=ie(t);return e.Ee||(e.Ee=r3(e,js(t))),e.Ee}function r3(t,e){if(t.limitType==="F")return sf(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new si(s.field,i)}));const n=t.endAt?new vu(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new vu(t.startAt.position,t.startAt.inclusive):null;return sf(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Ca(t,e){const n=t.filters.concat([e]);return new os(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Sa(t,e,n){return new os(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Zu(t,e){return mc(Bt(t),Bt(e))&&t.limitType===e.limitType}function lp(t){return`${pc(Bt(t))}|lt:${t.limitType}`}function Vr(t){return`Query(target=${(function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map((s=>op(s))).join(", ")}]`),Xu(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map((s=>Zr(s))).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map((s=>Zr(s))).join(",")),`Target(${r})`})(Bt(t))}; limitType=${t.limitType})`}function eo(t,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):X.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(t,e)&&(function(r,s){for(const i of js(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(t,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(t,e)&&(function(r,s){return!(r.startAt&&!(function(o,a,c){const h=nf(o,a,c);return o.inclusive?h<=0:h<0})(r.startAt,js(r),s)||r.endAt&&!(function(o,a,c){const h=nf(o,a,c);return o.inclusive?h>=0:h>0})(r.endAt,js(r),s))})(t,e)}function s3(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function hp(t){return(e,n)=>{let r=!1;for(const s of js(t)){const i=i3(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function i3(t,e,n){const r=t.field.isKeyField()?X.comparator(e.key,n.key):(function(i,o,a){const c=o.data.field(i),h=a.data.field(i);return c!==null&&h!==null?Yr(c,h):ee(42886)})(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return ee(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){yr(this.inner,((n,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return K0(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u3=new Re(X.comparator);function fn(){return u3}const fp=new Re(X.comparator);function xs(...t){let e=fp;for(const n of t)e=e.insert(n.key,n);return e}function dp(t){let e=fp;return t.forEach(((n,r)=>e=e.insert(n,r.overlayedDocument))),e}function ar(){return $s()}function pp(){return $s()}function $s(){return new br((t=>t.toString()),((t,e)=>t.isEqual(e)))}const o3=new Re(X.comparator),a3=new Le(X.comparator);function le(...t){let e=a3;for(const n of t)e=e.add(n);return e}const c3=new Le(ce);function l3(){return c3}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _c(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:bu(e)?"-0":e}}function mp(t){return{integerValue:""+t}}function h3(t,e){return Lb(e)?mp(e):_c(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(){this._=void 0}}function f3(t,e,n){return t instanceof ii?(function(s,i){const o={fields:{[X0]:{stringValue:J0},[Z0]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&fc(i)&&(i=Yu(i)),i&&(o.fields[Y0]=i),{mapValue:o}})(n,e):t instanceof ui?_p(t,e):t instanceof oi?yp(t,e):(function(s,i){const o=gp(s,i),a=of(o)+of(s.Ae);return Ia(o)&&Ia(s.Ae)?mp(a):_c(s.serializer,a)})(t,e)}function d3(t,e,n){return t instanceof ui?_p(t,e):t instanceof oi?yp(t,e):n}function gp(t,e){return t instanceof Iu?(function(r){return Ia(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class ii extends to{}class ui extends to{constructor(e){super(),this.elements=e}}function _p(t,e){const n=bp(e);for(const r of t.elements)n.some((s=>Kt(s,r)))||n.push(r);return{arrayValue:{values:n}}}class oi extends to{constructor(e){super(),this.elements=e}}function yp(t,e){let n=bp(e);for(const r of t.elements)n=n.filter((s=>!Kt(s,r)));return{arrayValue:{values:n}}}class Iu extends to{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function of(t){return xe(t.integerValue||t.doubleValue)}function bp(t){return dc(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p3{constructor(e,n){this.field=e,this.transform=n}}function m3(t,e){return t.field.isEqual(e.field)&&(function(r,s){return r instanceof ui&&s instanceof ui||r instanceof oi&&s instanceof oi?Xr(r.elements,s.elements,Kt):r instanceof Iu&&s instanceof Iu?Kt(r.Ae,s.Ae):r instanceof ii&&s instanceof ii})(t.transform,e.transform)}class g3{constructor(e,n){this.version=e,this.transformResults=n}}class qt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new qt}static exists(e){return new qt(void 0,e)}static updateTime(e){return new qt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function tu(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class no{}function Ep(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new yc(t.key,qt.none()):new mi(t.key,t.data,qt.none());{const n=t.data,r=Et.empty();let s=new Le(Qe.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Er(t.key,r,new Rt(s.toArray()),qt.none())}}function _3(t,e,n){t instanceof mi?(function(s,i,o){const a=s.value.clone(),c=cf(s.fieldTransforms,i,o.transformResults);a.setAll(c),i.convertToFoundDocument(o.version,a).setHasCommittedMutations()})(t,e,n):t instanceof Er?(function(s,i,o){if(!tu(s.precondition,i))return void i.convertToUnknownDocument(o.version);const a=cf(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(Tp(s)),c.setAll(a),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(t,e,n):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,n)}function zs(t,e,n,r){return t instanceof mi?(function(i,o,a,c){if(!tu(i.precondition,o))return a;const h=i.value.clone(),d=lf(i.fieldTransforms,c,o);return h.setAll(d),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(t,e,n,r):t instanceof Er?(function(i,o,a,c){if(!tu(i.precondition,o))return a;const h=lf(i.fieldTransforms,c,o),d=o.data;return d.setAll(Tp(i)),d.setAll(h),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),a===null?null:a.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(t,e,n,r):(function(i,o,a){return tu(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a})(t,e,n)}function y3(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=gp(r.transform,s||null);i!=null&&(n===null&&(n=Et.empty()),n.set(r.field,i))}return n||null}function af(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Xr(r,s,((i,o)=>m3(i,o)))})(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class mi extends no{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Er extends no{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Tp(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}})),e}function cf(t,e,n){const r=new Map;ye(t.length===n.length,32656,{Re:n.length,Ve:t.length});for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,d3(o,a,n[s]))}return r}function lf(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,f3(i,o,e))}return r}class yc extends no{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class b3 extends no{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E3{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&_3(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=zs(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=zs(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=pp();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(s.key)?null:a;const c=Ep(o,a);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(re.min())})),r}keys(){return this.mutations.reduce(((e,n)=>e.add(n.key)),le())}isEqual(e){return this.batchId===e.batchId&&Xr(this.mutations,e.mutations,((n,r)=>af(n,r)))&&Xr(this.baseMutations,e.baseMutations,((n,r)=>af(n,r)))}}class bc{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){ye(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return o3})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new bc(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T3{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v3{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pe,de;function I3(t){switch(t){case P.OK:return ee(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return ee(15467,{code:t})}}function vp(t){if(t===void 0)return hn("GRPC error has no .code"),P.UNKNOWN;switch(t){case Pe.OK:return P.OK;case Pe.CANCELLED:return P.CANCELLED;case Pe.UNKNOWN:return P.UNKNOWN;case Pe.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case Pe.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case Pe.INTERNAL:return P.INTERNAL;case Pe.UNAVAILABLE:return P.UNAVAILABLE;case Pe.UNAUTHENTICATED:return P.UNAUTHENTICATED;case Pe.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case Pe.NOT_FOUND:return P.NOT_FOUND;case Pe.ALREADY_EXISTS:return P.ALREADY_EXISTS;case Pe.PERMISSION_DENIED:return P.PERMISSION_DENIED;case Pe.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case Pe.ABORTED:return P.ABORTED;case Pe.OUT_OF_RANGE:return P.OUT_OF_RANGE;case Pe.UNIMPLEMENTED:return P.UNIMPLEMENTED;case Pe.DATA_LOSS:return P.DATA_LOSS;default:return ee(39323,{code:t})}}(de=Pe||(Pe={}))[de.OK=0]="OK",de[de.CANCELLED=1]="CANCELLED",de[de.UNKNOWN=2]="UNKNOWN",de[de.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",de[de.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",de[de.NOT_FOUND=5]="NOT_FOUND",de[de.ALREADY_EXISTS=6]="ALREADY_EXISTS",de[de.PERMISSION_DENIED=7]="PERMISSION_DENIED",de[de.UNAUTHENTICATED=16]="UNAUTHENTICATED",de[de.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",de[de.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",de[de.ABORTED=10]="ABORTED",de[de.OUT_OF_RANGE=11]="OUT_OF_RANGE",de[de.UNIMPLEMENTED=12]="UNIMPLEMENTED",de[de.INTERNAL=13]="INTERNAL",de[de.UNAVAILABLE=14]="UNAVAILABLE",de[de.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w3(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A3=new On([4294967295,4294967295],0);function hf(t){const e=w3().encode(t),n=new M0;return n.update(e),new Uint8Array(n.digest())}function ff(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new On([n,r],0),new On([s,i],0)]}class Ec{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Ps(`Invalid padding: ${n}`);if(r<0)throw new Ps(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ps(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Ps(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=On.fromNumber(this.ge)}ye(e,n,r){let s=e.add(n.multiply(On.fromNumber(r)));return s.compare(A3)===1&&(s=new On([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=hf(e),[r,s]=ff(n);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Ec(i,s,n);return r.forEach((a=>o.insert(a))),o}insert(e){if(this.ge===0)return;const n=hf(e),[r,s]=ff(n);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Ps extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,gi.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new ro(re.min(),s,new Re(ce),fn(),le())}}class gi{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new gi(r,n,le(),le(),le())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(e,n,r,s){this.be=e,this.removedTargetIds=n,this.key=r,this.De=s}}class Ip{constructor(e,n){this.targetId=e,this.Ce=n}}class wp{constructor(e,n,r=Je.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class df{constructor(){this.ve=0,this.Fe=pf(),this.Me=Je.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=le(),n=le(),r=le();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:ee(38017,{changeType:i})}})),new gi(this.Me,this.xe,e,n,r)}qe(){this.Oe=!1,this.Fe=pf()}Qe(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,ye(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class C3{constructor(e){this.Ge=e,this.ze=new Map,this.je=fn(),this.Je=Hi(),this.He=Hi(),this.Ye=new Re(ce)}Ze(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Xe(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,(n=>{const r=this.nt(n);switch(e.state){case 0:this.rt(n)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),r.Le(e.resumeToken));break;default:ee(56790,{state:e.state})}}))}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach(((r,s)=>{this.rt(s)&&n(s)}))}st(e){const n=e.targetId,r=e.Ce.count,s=this.ot(n);if(s){const i=s.target;if(Aa(i))if(r===0){const o=new X(i.path);this.et(n,o,rt.newNoDocument(o,re.min()))}else ye(r===1,20013,{expectedCount:r});else{const o=this._t(n);if(o!==r){const a=this.ut(e),c=a?this.ct(a,e,o):1;if(c!==0){this.it(n);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(n,h)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,a;try{o=zn(r).toUint8Array()}catch(c){if(c instanceof Q0)return Jr("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{a=new Ec(o,s,i)}catch(c){return Jr(c instanceof Ps?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return a.ge===0?null:a}ct(e,n,r){return n.Ce.count===r-this.Pt(e,n.targetId)?0:2}Pt(e,n){const r=this.Ge.getRemoteKeysForTarget(n);let s=0;return r.forEach((i=>{const o=this.Ge.ht(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(a)||(this.et(n,i,null),s++)})),s}Tt(e){const n=new Map;this.ze.forEach(((i,o)=>{const a=this.ot(o);if(a){if(i.current&&Aa(a.target)){const c=new X(a.target.path);this.It(c).has(o)||this.Et(o,c)||this.et(o,c,rt.newNoDocument(c,e))}i.Be&&(n.set(o,i.ke()),i.qe())}}));let r=le();this.He.forEach(((i,o)=>{let a=!0;o.forEachWhile((c=>{const h=this.ot(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)})),a&&(r=r.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new ro(e,n,this.Ye,this.je,r);return this.je=fn(),this.Je=Hi(),this.He=Hi(),this.Ye=new Re(ce),s}Xe(e,n){if(!this.rt(e))return;const r=this.Et(e,n.key)?2:0;this.nt(e).Qe(n.key,r),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.It(n.key).add(e)),this.He=this.He.insert(n.key,this.dt(n.key).add(e))}et(e,n,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,n)?s.Qe(n,1):s.$e(n),this.He=this.He.insert(n,this.dt(n).delete(e)),this.He=this.He.insert(n,this.dt(n).add(e)),r&&(this.je=this.je.insert(n,r))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let n=this.ze.get(e);return n||(n=new df,this.ze.set(e,n)),n}dt(e){let n=this.He.get(e);return n||(n=new Le(ce),this.He=this.He.insert(e,n)),n}It(e){let n=this.Je.get(e);return n||(n=new Le(ce),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||G("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new df),this.Ge.getRemoteKeysForTarget(e).forEach((n=>{this.et(e,n,null)}))}Et(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function Hi(){return new Re(X.comparator)}function pf(){return new Re(X.comparator)}const S3={asc:"ASCENDING",desc:"DESCENDING"},R3={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},D3={and:"AND",or:"OR"};class x3{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Ra(t,e){return t.useProto3Json||Xu(e)?e:{value:e}}function wu(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ap(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function P3(t,e){return wu(t,e.toTimestamp())}function jt(t){return ye(!!t,49232),re.fromTimestamp((function(n){const r=$n(n);return new Ce(r.seconds,r.nanos)})(t))}function Tc(t,e){return Da(t,e).canonicalString()}function Da(t,e){const n=(function(s){return new Ie(["projects",s.projectId,"databases",s.database])})(t).child("documents");return e===void 0?n:n.child(e)}function Cp(t){const e=Ie.fromString(t);return ye(Pp(e),10190,{key:e.toString()}),e}function xa(t,e){return Tc(t.databaseId,e.path)}function Qo(t,e){const n=Cp(e);if(n.get(1)!==t.databaseId.projectId)throw new W(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new W(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new X(Rp(n))}function Sp(t,e){return Tc(t.databaseId,e)}function V3(t){const e=Cp(t);return e.length===4?Ie.emptyPath():Rp(e)}function Pa(t){return new Ie(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Rp(t){return ye(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function mf(t,e,n){return{name:xa(t,e),fields:n.value.mapValue.fields}}function N3(t,e){let n;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:ee(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,d){return h.useProto3Json?(ye(d===void 0||typeof d=="string",58123),Je.fromBase64String(d||"")):(ye(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Je.fromUint8Array(d||new Uint8Array))})(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&(function(h){const d=h.code===void 0?P.UNKNOWN:vp(h.code);return new W(d,h.message||"")})(o);n=new wp(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Qo(t,r.document.name),i=jt(r.document.updateTime),o=r.document.createTime?jt(r.document.createTime):re.min(),a=new Et({mapValue:{fields:r.document.fields}}),c=rt.newFoundDocument(s,i,o,a),h=r.targetIds||[],d=r.removedTargetIds||[];n=new nu(h,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Qo(t,r.document),i=r.readTime?jt(r.readTime):re.min(),o=rt.newNoDocument(s,i),a=r.removedTargetIds||[];n=new nu([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Qo(t,r.document),i=r.removedTargetIds||[];n=new nu([],i,s,null)}else{if(!("filter"in e))return ee(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new v3(s,i),a=r.targetId;n=new Ip(a,o)}}return n}function k3(t,e){let n;if(e instanceof mi)n={update:mf(t,e.key,e.value)};else if(e instanceof yc)n={delete:xa(t,e.key)};else if(e instanceof Er)n={update:mf(t,e.key,e.data),updateMask:$3(e.fieldMask)};else{if(!(e instanceof b3))return ee(16599,{Vt:e.type});n={verify:xa(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((r=>(function(i,o){const a=o.transform;if(a instanceof ii)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof ui)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof oi)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Iu)return{fieldPath:o.field.canonicalString(),increment:a.Ae};throw ee(20930,{transform:o.transform})})(0,r)))),e.precondition.isNone||(n.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:P3(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ee(27497)})(t,e.precondition)),n}function F3(t,e){return t&&t.length>0?(ye(e!==void 0,14353),t.map((n=>(function(s,i){let o=s.updateTime?jt(s.updateTime):jt(i);return o.isEqual(re.min())&&(o=jt(i)),new g3(o,s.transformResults||[])})(n,e)))):[]}function O3(t,e){return{documents:[Sp(t,e.path)]}}function M3(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Sp(t,s);const i=(function(h){if(h.length!==0)return xp(Pt.create(h,"and"))})(e.filters);i&&(n.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((d=>(function(_){return{field:Nr(_.field),direction:B3(_.dir)}})(d)))})(e.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Ra(t,e.limit);return a!==null&&(n.structuredQuery.limit=a),e.startAt&&(n.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(n.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:n,parent:s}}function L3(t){let e=V3(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){ye(r===1,65062);const d=n.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];n.where&&(i=(function(m){const _=Dp(m);return _ instanceof Pt&&ip(_)?_.getFilters():[_]})(n.where));let o=[];n.orderBy&&(o=(function(m){return m.map((_=>(function(D){return new si(kr(D.field),(function(L){switch(L){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(D.direction))})(_)))})(n.orderBy));let a=null;n.limit&&(a=(function(m){let _;return _=typeof m=="object"?m.value:m,Xu(_)?null:_})(n.limit));let c=null;n.startAt&&(c=(function(m){const _=!!m.before,A=m.values||[];return new vu(A,_)})(n.startAt));let h=null;return n.endAt&&(h=(function(m){const _=!m.before,A=m.values||[];return new vu(A,_)})(n.endAt)),n3(e,s,o,i,a,"F",c,h)}function U3(t,e){const n=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ee(28987,{purpose:s})}})(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Dp(t){return t.unaryFilter!==void 0?(function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=kr(n.unaryFilter.field);return Ve.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=kr(n.unaryFilter.field);return Ve.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=kr(n.unaryFilter.field);return Ve.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=kr(n.unaryFilter.field);return Ve.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ee(61313);default:return ee(60726)}})(t):t.fieldFilter!==void 0?(function(n){return Ve.create(kr(n.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ee(58110);default:return ee(50506)}})(n.fieldFilter.op),n.fieldFilter.value)})(t):t.compositeFilter!==void 0?(function(n){return Pt.create(n.compositeFilter.filters.map((r=>Dp(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ee(1026)}})(n.compositeFilter.op))})(t):ee(30097,{filter:t})}function B3(t){return S3[t]}function q3(t){return R3[t]}function j3(t){return D3[t]}function Nr(t){return{fieldPath:t.canonicalString()}}function kr(t){return Qe.fromServerFormat(t.fieldPath)}function xp(t){return t instanceof Ve?(function(n){if(n.op==="=="){if(tf(n.value))return{unaryFilter:{field:Nr(n.field),op:"IS_NAN"}};if(ef(n.value))return{unaryFilter:{field:Nr(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(tf(n.value))return{unaryFilter:{field:Nr(n.field),op:"IS_NOT_NAN"}};if(ef(n.value))return{unaryFilter:{field:Nr(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Nr(n.field),op:q3(n.op),value:n.value}}})(t):t instanceof Pt?(function(n){const r=n.getFilters().map((s=>xp(s)));return r.length===1?r[0]:{compositeFilter:{op:j3(n.op),filters:r}}})(t):ee(54877,{filter:t})}function $3(t){const e=[];return t.fields.forEach((n=>e.push(n.canonicalString()))),{fieldPaths:e}}function Pp(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(e,n,r,s,i=re.min(),o=re.min(),a=Je.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new Vn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Vn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Vn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Vn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z3{constructor(e){this.yt=e}}function H3(t){const e=L3({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Sa(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W3{constructor(){this.Cn=new G3}addToCollectionParentIndex(e,n){return this.Cn.add(n),V.resolve()}getCollectionParents(e,n){return V.resolve(this.Cn.getEntries(n))}addFieldIndex(e,n){return V.resolve()}deleteFieldIndex(e,n){return V.resolve()}deleteAllFieldIndexes(e){return V.resolve()}createTargetIndexes(e,n){return V.resolve()}getDocumentsMatchingTarget(e,n){return V.resolve(null)}getIndexType(e,n){return V.resolve(0)}getFieldIndexes(e,n){return V.resolve([])}getNextCollectionGroupToUpdate(e){return V.resolve(null)}getMinOffset(e,n){return V.resolve(jn.min())}getMinOffsetFromCollectionGroup(e,n){return V.resolve(jn.min())}updateCollectionGroup(e,n,r){return V.resolve()}updateIndexEntries(e,n){return V.resolve()}}class G3{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new Le(Ie.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Le(Ie.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Vp=41943040;class dt{static withCacheSize(e){return new dt(e,dt.DEFAULT_COLLECTION_PERCENTILE,dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */dt.DEFAULT_COLLECTION_PERCENTILE=10,dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,dt.DEFAULT=new dt(Vp,dt.DEFAULT_COLLECTION_PERCENTILE,dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),dt.DISABLED=new dt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new es(0)}static cr(){return new es(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _f="LruGarbageCollector",K3=1048576;function yf([t,e],[n,r]){const s=ce(t,n);return s===0?ce(e,r):s}class Q3{constructor(e){this.Ir=e,this.buffer=new Le(yf),this.Er=0}dr(){return++this.Er}Ar(e){const n=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();yf(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class J3{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){G(_f,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){us(n)?G(_f,"Ignoring IndexedDB error during garbage collection: ",n):await is(n)}await this.Vr(3e5)}))}}class X3{constructor(e,n){this.mr=e,this.params=n}calculateTargetCount(e,n){return this.mr.gr(e).next((r=>Math.floor(n/100*r)))}nthSequenceNumber(e,n){if(n===0)return V.resolve(Ju.ce);const r=new Q3(n);return this.mr.forEachTarget(e,(s=>r.Ar(s.sequenceNumber))).next((()=>this.mr.pr(e,(s=>r.Ar(s))))).next((()=>r.maxValue))}removeTargets(e,n,r){return this.mr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.mr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(G("LruGarbageCollector","Garbage collection skipped; disabled"),V.resolve(gf)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(G("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),gf):this.yr(e,n)))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,n){let r,s,i,o,a,c,h;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(G("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(e,s)))).next((m=>(r=m,a=Date.now(),this.removeTargets(e,r,n)))).next((m=>(i=m,c=Date.now(),this.removeOrphanedDocuments(e,r)))).next((m=>(h=Date.now(),Pr()<=ae.DEBUG&&G("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(a-o)+`ms
	Removed ${i} targets in `+(c-a)+`ms
	Removed ${m} documents in `+(h-c)+`ms
Total Duration: ${h-d}ms`),V.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function Y3(t,e){return new X3(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z3{constructor(){this.changes=new br((e=>e.toString()),((e,n)=>e.isEqual(n))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,rt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?V.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eE{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,n)))).next((s=>(r!==null&&zs(r.mutation,s,Rt.empty(),Ce.now()),s)))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next((r=>this.getLocalViewOfDocuments(e,r,le()).next((()=>r))))}getLocalViewOfDocuments(e,n,r=le()){const s=ar();return this.populateOverlays(e,s,n).next((()=>this.computeViews(e,n,s,r).next((i=>{let o=xs();return i.forEach(((a,c)=>{o=o.insert(a,c.overlayedDocument)})),o}))))}getOverlayedDocuments(e,n){const r=ar();return this.populateOverlays(e,r,n).next((()=>this.computeViews(e,n,r,le())))}populateOverlays(e,n,r){const s=[];return r.forEach((i=>{n.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,a)=>{n.set(o,a)}))}))}computeViews(e,n,r,s){let i=fn();const o=$s(),a=(function(){return $s()})();return n.forEach(((c,h)=>{const d=r.get(h.key);s.has(h.key)&&(d===void 0||d.mutation instanceof Er)?i=i.insert(h.key,h):d!==void 0?(o.set(h.key,d.mutation.getFieldMask()),zs(d.mutation,h,d.mutation.getFieldMask(),Ce.now())):o.set(h.key,Rt.empty())})),this.recalculateAndSaveOverlays(e,i).next((c=>(c.forEach(((h,d)=>o.set(h,d))),n.forEach(((h,d)=>a.set(h,new eE(d,o.get(h)??null)))),a)))}recalculateAndSaveOverlays(e,n){const r=$s();let s=new Re(((o,a)=>o-a)),i=le();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next((o=>{for(const a of o)a.keys().forEach((c=>{const h=n.get(c);if(h===null)return;let d=r.get(c)||Rt.empty();d=a.applyToLocalView(h,d),r.set(c,d);const m=(s.get(a.batchId)||le()).add(c);s=s.insert(a.batchId,m)}))})).next((()=>{const o=[],a=s.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),h=c.key,d=c.value,m=pp();d.forEach((_=>{if(!i.has(_)){const A=Ep(n.get(_),r.get(_));A!==null&&m.set(_,A),i=i.add(_)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return V.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,n,r,s){return(function(o){return X.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):cp(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):V.resolve(ar());let a=ei,c=i;return o.next((h=>V.forEach(h,((d,m)=>(a<m.largestBatchId&&(a=m.largestBatchId),i.get(d)?V.resolve():this.remoteDocumentCache.getEntry(e,d).next((_=>{c=c.insert(d,_)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,c,h,le()))).next((d=>({batchId:a,changes:dp(d)})))))}))}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new X(n)).next((r=>{let s=xs();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=xs();return this.indexManager.getCollectionParents(e,i).next((a=>V.forEach(a,(c=>{const h=(function(m,_){return new os(_,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((d=>{d.forEach(((m,_)=>{o=o.insert(m,_)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s)))).next((o=>{i.forEach(((c,h)=>{const d=h.getKey();o.get(d)===null&&(o=o.insert(d,rt.newInvalidDocument(d)))}));let a=xs();return o.forEach(((c,h)=>{const d=i.get(c);d!==void 0&&zs(d.mutation,h,Rt.empty(),Ce.now()),eo(n,h)&&(a=a.insert(c,h))})),a}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nE{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,n){return V.resolve(this.Lr.get(n))}saveBundleMetadata(e,n){return this.Lr.set(n.id,(function(s){return{id:s.id,version:s.version,createTime:jt(s.createTime)}})(n)),V.resolve()}getNamedQuery(e,n){return V.resolve(this.kr.get(n))}saveNamedQuery(e,n){return this.kr.set(n.name,(function(s){return{name:s.name,query:H3(s.bundledQuery),readTime:jt(s.readTime)}})(n)),V.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(){this.overlays=new Re(X.comparator),this.qr=new Map}getOverlay(e,n){return V.resolve(this.overlays.get(n))}getOverlays(e,n){const r=ar();return V.forEach(n,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,n,r){return r.forEach(((s,i)=>{this.St(e,n,i)})),V.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(r)),V.resolve()}getOverlaysForCollection(e,n,r){const s=ar(),i=n.length+1,o=new X(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,h=c.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return V.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new Re(((h,d)=>h-d));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let d=i.get(h.largestBatchId);d===null&&(d=ar(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const a=ar(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((h,d)=>a.set(h,d))),!(a.size()>=s)););return V.resolve(a)}St(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new T3(n,r));let i=this.qr.get(n);i===void 0&&(i=le(),this.qr.set(n,i)),this.qr.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(){this.sessionToken=Je.EMPTY_BYTE_STRING}getSessionToken(e){return V.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,V.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(){this.Qr=new Le(Be.$r),this.Ur=new Le(Be.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,n){const r=new Be(e,n);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,n){e.forEach((r=>this.addReference(r,n)))}removeReference(e,n){this.Gr(new Be(e,n))}zr(e,n){e.forEach((r=>this.removeReference(r,n)))}jr(e){const n=new X(new Ie([])),r=new Be(n,e),s=new Be(n,e+1),i=[];return this.Ur.forEachInRange([r,s],(o=>{this.Gr(o),i.push(o.key)})),i}Jr(){this.Qr.forEach((e=>this.Gr(e)))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const n=new X(new Ie([])),r=new Be(n,e),s=new Be(n,e+1);let i=le();return this.Ur.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const n=new Be(e,0),r=this.Qr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Be{constructor(e,n){this.key=e,this.Yr=n}static $r(e,n){return X.comparator(e.key,n.key)||ce(e.Yr,n.Yr)}static Kr(e,n){return ce(e.Yr,n.Yr)||X.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iE{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.tr=1,this.Zr=new Le(Be.$r)}checkEmpty(e){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new E3(i,n,r,s);this.mutationQueue.push(o);for(const a of s)this.Zr=this.Zr.add(new Be(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return V.resolve(o)}lookupMutationBatch(e,n){return V.resolve(this.Xr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.ei(r),i=s<0?0:s;return V.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?hc:this.tr-1)}getAllMutationBatches(e){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Be(n,0),s=new Be(n,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],(o=>{const a=this.Xr(o.Yr);i.push(a)})),V.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Le(ce);return n.forEach((s=>{const i=new Be(s,0),o=new Be(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,o],(a=>{r=r.add(a.Yr)}))})),V.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;X.isDocumentKey(i)||(i=i.child(""));const o=new Be(new X(i),0);let a=new Le(ce);return this.Zr.forEachWhile((c=>{const h=c.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(a=a.add(c.Yr)),!0)}),o),V.resolve(this.ti(a))}ti(e){const n=[];return e.forEach((r=>{const s=this.Xr(r);s!==null&&n.push(s)})),n}removeMutationBatch(e,n){ye(this.ni(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return V.forEach(n.mutations,(s=>{const i=new Be(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Zr=r}))}ir(e){}containsKey(e,n){const r=new Be(n,0),s=this.Zr.firstAfterOrEqual(r);return V.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,V.resolve()}ni(e,n){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const n=this.ei(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uE{constructor(e){this.ri=e,this.docs=(function(){return new Re(X.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.ri(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return V.resolve(r?r.document.mutableCopy():rt.newInvalidDocument(n))}getEntries(e,n){let r=fn();return n.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():rt.newInvalidDocument(s))})),V.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=fn();const o=n.path,a=new X(o.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:h,value:{document:d}}=c.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||kb(Nb(d),r)<=0||(s.has(d.key)||eo(n,d))&&(i=i.insert(d.key,d.mutableCopy()))}return V.resolve(i)}getAllFromCollectionGroup(e,n,r,s){ee(9500)}ii(e,n){return V.forEach(this.docs,(r=>n(r)))}newChangeBuffer(e){return new oE(this)}getSize(e){return V.resolve(this.size)}}class oE extends Z3{constructor(e){super(),this.Nr=e}applyChanges(e){const n=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?n.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)})),V.waitFor(n)}getFromCache(e,n){return this.Nr.getEntry(e,n)}getAllFromCache(e,n){return this.Nr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aE{constructor(e){this.persistence=e,this.si=new br((n=>pc(n)),mc),this.lastRemoteSnapshotVersion=re.min(),this.highestTargetId=0,this.oi=0,this._i=new vc,this.targetCount=0,this.ai=es.ur()}forEachTarget(e,n){return this.si.forEach(((r,s)=>n(s))),V.resolve()}getLastRemoteSnapshotVersion(e){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return V.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.oi&&(this.oi=n),V.resolve()}Pr(e){this.si.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.ai=new es(n),this.highestTargetId=n),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,n){return this.Pr(n),this.targetCount+=1,V.resolve()}updateTargetData(e,n){return this.Pr(n),V.resolve()}removeTargetData(e,n){return this.si.delete(n.target),this._i.jr(n.targetId),this.targetCount-=1,V.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.si.forEach(((o,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.si.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)})),V.waitFor(i).next((()=>s))}getTargetCount(e){return V.resolve(this.targetCount)}getTargetData(e,n){const r=this.si.get(n)||null;return V.resolve(r)}addMatchingKeys(e,n,r){return this._i.Wr(n,r),V.resolve()}removeMatchingKeys(e,n,r){this._i.zr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),V.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this._i.jr(n),V.resolve()}getMatchingKeysForTargetId(e,n){const r=this._i.Hr(n);return V.resolve(r)}containsKey(e,n){return V.resolve(this._i.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Np{constructor(e,n){this.ui={},this.overlays={},this.ci=new Ju(0),this.li=!1,this.li=!0,this.hi=new sE,this.referenceDelegate=e(this),this.Pi=new aE(this),this.indexManager=new W3,this.remoteDocumentCache=(function(s){return new uE(s)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new z3(n),this.Ii=new nE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new rE,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.ui[e.toKey()];return r||(r=new iE(n,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,n,r){G("MemoryPersistence","Starting transaction:",e);const s=new cE(this.ci.next());return this.referenceDelegate.Ei(),r(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(e,n){return V.or(Object.values(this.ui).map((r=>()=>r.containsKey(e,n))))}}class cE extends Ob{constructor(e){super(),this.currentSequenceNumber=e}}class Ic{constructor(e){this.persistence=e,this.Ri=new vc,this.Vi=null}static mi(e){return new Ic(e)}get fi(){if(this.Vi)return this.Vi;throw ee(60996)}addReference(e,n,r){return this.Ri.addReference(r,n),this.fi.delete(r.toString()),V.resolve()}removeReference(e,n,r){return this.Ri.removeReference(r,n),this.fi.add(r.toString()),V.resolve()}markPotentiallyOrphaned(e,n){return this.fi.add(n.toString()),V.resolve()}removeTarget(e,n){this.Ri.jr(n.targetId).forEach((s=>this.fi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>r.removeTargetData(e,n)))}Ei(){this.Vi=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.fi,(r=>{const s=X.fromPath(r);return this.gi(e,s).next((i=>{i||n.removeEntry(s,re.min())}))})).next((()=>(this.Vi=null,n.apply(e))))}updateLimboDocument(e,n){return this.gi(e,n).next((r=>{r?this.fi.delete(n.toString()):this.fi.add(n.toString())}))}Ti(e){return 0}gi(e,n){return V.or([()=>V.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ai(e,n)])}}class Au{constructor(e,n){this.persistence=e,this.pi=new br((r=>Ub(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Y3(this,n)}static mi(e,n){return new Au(e,n)}Ei(){}di(e){return V.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}gr(e){const n=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>n.next((s=>r+s))))}wr(e){let n=0;return this.pr(e,(r=>{n++})).next((()=>n))}pr(e,n){return V.forEach(this.pi,((r,s)=>this.br(e,r,s).next((i=>i?V.resolve():n(s)))))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,(o=>this.br(e,o,n).next((a=>{a||(r++,i.removeEntry(o,re.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,n){return this.pi.set(n,e.currentSequenceNumber),V.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),V.resolve()}removeReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),V.resolve()}updateLimboDocument(e,n){return this.pi.set(n,e.currentSequenceNumber),V.resolve()}Ti(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=Zi(e.data.value)),n}br(e,n,r){return V.or([()=>this.persistence.Ai(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const s=this.pi.get(n);return V.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Es=r,this.ds=s}static As(e,n){let r=le(),s=le();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new wc(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hE{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return ny()?8:Mb(it())>0?6:4})()}initialize(e,n){this.ps=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.ys(e,n).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ws(e,n,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new lE;return this.Ss(e,n,o).next((a=>{if(i.result=a,this.Vs)return this.bs(e,n,o,a.size)}))})).next((()=>i.result))}bs(e,n,r,s){return r.documentReadCount<this.fs?(Pr()<=ae.DEBUG&&G("QueryEngine","SDK will not create cache indexes for query:",Vr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),V.resolve()):(Pr()<=ae.DEBUG&&G("QueryEngine","Query:",Vr(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Pr()<=ae.DEBUG&&G("QueryEngine","The SDK decides to create cache indexes for query:",Vr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Bt(n))):V.resolve())}ys(e,n){if(uf(n))return V.resolve(null);let r=Bt(n);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(n.limit!==null&&s===1&&(n=Sa(n,null,"F"),r=Bt(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const o=le(...i);return this.ps.getDocuments(e,o).next((a=>this.indexManager.getMinOffset(e,r).next((c=>{const h=this.Ds(n,a);return this.Cs(n,h,o,c.readTime)?this.ys(e,Sa(n,null,"F")):this.vs(e,h,n,c)}))))})))))}ws(e,n,r,s){return uf(n)||s.isEqual(re.min())?V.resolve(null):this.ps.getDocuments(e,r).next((i=>{const o=this.Ds(n,i);return this.Cs(n,o,r,s)?V.resolve(null):(Pr()<=ae.DEBUG&&G("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Vr(n)),this.vs(e,o,n,Vb(s,ei)).next((a=>a)))}))}Ds(e,n){let r=new Le(hp(e));return n.forEach(((s,i)=>{eo(e,i)&&(r=r.add(i))})),r}Cs(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,n,r){return Pr()<=ae.DEBUG&&G("QueryEngine","Using full collection scan to execute query:",Vr(n)),this.ps.getDocumentsMatchingQuery(e,n,jn.min(),r)}vs(e,n,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next((i=>(n.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ac="LocalStore",fE=3e8;class dE{constructor(e,n,r,s){this.persistence=e,this.Fs=n,this.serializer=s,this.Ms=new Re(ce),this.xs=new br((i=>pc(i)),mc),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new tE(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(n=>e.collect(n,this.Ms)))}}function pE(t,e,n,r){return new dE(t,e,n,r)}async function kp(t,e){const n=ie(t);return await n.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,n.Bs(e),n.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],a=[];let c=le();for(const h of s){o.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}for(const h of i){a.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}return n.localDocuments.getDocuments(r,c).next((h=>({Ls:h,removedBatchIds:o,addedBatchIds:a})))}))}))}function mE(t,e){const n=ie(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=n.Ns.newChangeBuffer({trackRemovals:!0});return(function(a,c,h,d){const m=h.batch,_=m.keys();let A=V.resolve();return _.forEach((D=>{A=A.next((()=>d.getEntry(c,D))).next((k=>{const L=h.docVersions.get(D);ye(L!==null,48541),k.version.compareTo(L)<0&&(m.applyToRemoteDocument(k,h),k.isValidDocument()&&(k.setReadTime(h.commitVersion),d.addEntry(k)))}))})),A.next((()=>a.mutationQueue.removeMutationBatch(c,m)))})(n,r,e,i).next((()=>i.apply(r))).next((()=>n.mutationQueue.performConsistencyCheck(r))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(a){let c=le();for(let h=0;h<a.mutationResults.length;++h)a.mutationResults[h].transformResults.length>0&&(c=c.add(a.batch.mutations[h].key));return c})(e)))).next((()=>n.localDocuments.getDocuments(r,s)))}))}function Fp(t){const e=ie(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(n=>e.Pi.getLastRemoteSnapshotVersion(n)))}function gE(t,e){const n=ie(t),r=e.snapshotVersion;let s=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=n.Ns.newChangeBuffer({trackRemovals:!0});s=n.Ms;const a=[];e.targetChanges.forEach(((d,m)=>{const _=s.get(m);if(!_)return;a.push(n.Pi.removeMatchingKeys(i,d.removedDocuments,m).next((()=>n.Pi.addMatchingKeys(i,d.addedDocuments,m))));let A=_.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?A=A.withResumeToken(Je.EMPTY_BYTE_STRING,re.min()).withLastLimboFreeSnapshotVersion(re.min()):d.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(d.resumeToken,r)),s=s.insert(m,A),(function(k,L,$){return k.resumeToken.approximateByteSize()===0||L.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=fE?!0:$.addedDocuments.size+$.modifiedDocuments.size+$.removedDocuments.size>0})(_,A,d)&&a.push(n.Pi.updateTargetData(i,A))}));let c=fn(),h=le();if(e.documentUpdates.forEach((d=>{e.resolvedLimboDocuments.has(d)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,d))})),a.push(_E(i,o,e.documentUpdates).next((d=>{c=d.ks,h=d.qs}))),!r.isEqual(re.min())){const d=n.Pi.getLastRemoteSnapshotVersion(i).next((m=>n.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r)));a.push(d)}return V.waitFor(a).next((()=>o.apply(i))).next((()=>n.localDocuments.getLocalViewOfDocuments(i,c,h))).next((()=>c))})).then((i=>(n.Ms=s,i)))}function _E(t,e,n){let r=le(),s=le();return n.forEach((i=>r=r.add(i))),e.getEntries(t,r).next((i=>{let o=fn();return n.forEach(((a,c)=>{const h=i.get(a);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(a)),c.isNoDocument()&&c.version.isEqual(re.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):G(Ac,"Ignoring outdated watch update for ",a,". Current version:",h.version," Watch version:",c.version)})),{ks:o,qs:s}}))}function yE(t,e){const n=ie(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=hc),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function bE(t,e){const n=ie(t);return n.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return n.Pi.getTargetData(r,e).next((i=>i?(s=i,V.resolve(s)):n.Pi.allocateTargetId(r).next((o=>(s=new Vn(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Pi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=n.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(r.targetId,r),n.xs.set(e,r.targetId)),r}))}async function Va(t,e,n){const r=ie(t),s=r.Ms.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!us(o))throw o;G(Ac,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function bf(t,e,n){const r=ie(t);let s=re.min(),i=le();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,h,d){const m=ie(c),_=m.xs.get(d);return _!==void 0?V.resolve(m.Ms.get(_)):m.Pi.getTargetData(h,d)})(r,o,Bt(e)).next((a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(o,a.targetId).next((c=>{i=c}))})).next((()=>r.Fs.getDocumentsMatchingQuery(o,e,n?s:re.min(),n?i:le()))).next((a=>(EE(r,s3(e),a),{documents:a,Qs:i})))))}function EE(t,e,n){let r=t.Os.get(e)||re.min();n.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),t.Os.set(e,r)}class Ef{constructor(){this.activeTargetIds=l3()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class TE{constructor(){this.Mo=new Ef,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,n,r){this.xo[e]=n}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Ef,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vE{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tf="ConnectivityMonitor";class vf{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){G(Tf,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){G(Tf,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wi=null;function Na(){return Wi===null?Wi=(function(){return 268435456+Math.round(2147483648*Math.random())})():Wi++,"0x"+Wi.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jo="RestConnection",IE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class wE{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=n+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Eu?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,n,r,s,i){const o=Na(),a=this.zo(e,n.toUriEncodedString());G(Jo,`Sending RPC '${e}' ${o}:`,a,r);const c={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(c,s,i);const{host:h}=new URL(a),d=ns(h);return this.Jo(e,a,c,r,d).then((m=>(G(Jo,`Received RPC '${e}' ${o}: `,m),m)),(m=>{throw Jr(Jo,`RPC '${e}' ${o} failed with error: `,m,"url: ",a,"request:",r),m}))}Ho(e,n,r,s,i,o){return this.Go(e,n,r,s,i)}jo(e,n,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+ss})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}zo(e,n){const r=IE[e];return`${this.Uo}/v1/${n}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AE{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et="WebChannelConnection";class CE extends wE{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,n,r,s,i){const o=Na();return new Promise(((a,c)=>{const h=new L0;h.setWithCredentials(!0),h.listenOnce(U0.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Yi.NO_ERROR:const m=h.getResponseJson();G(et,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(m)),a(m);break;case Yi.TIMEOUT:G(et,`RPC '${e}' ${o} timed out`),c(new W(P.DEADLINE_EXCEEDED,"Request time out"));break;case Yi.HTTP_ERROR:const _=h.getStatus();if(G(et,`RPC '${e}' ${o} failed with status:`,_,"response text:",h.getResponseText()),_>0){let A=h.getResponseJson();Array.isArray(A)&&(A=A[0]);const D=A?.error;if(D&&D.status&&D.message){const k=(function($){const K=$.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(K)>=0?K:P.UNKNOWN})(D.status);c(new W(k,D.message))}else c(new W(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new W(P.UNAVAILABLE,"Connection failed."));break;default:ee(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{G(et,`RPC '${e}' ${o} completed.`)}}));const d=JSON.stringify(s);G(et,`RPC '${e}' ${o} sending request:`,s),h.send(n,"POST",d,r,15)}))}T_(e,n,r){const s=Na(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=j0(),a=q0(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.jo(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const d=i.join("");G(et,`Creating RPC '${e}' stream ${s}: ${d}`,c);const m=o.createWebChannel(d,c);this.I_(m);let _=!1,A=!1;const D=new AE({Yo:L=>{A?G(et,`Not sending because RPC '${e}' stream ${s} is closed:`,L):(_||(G(et,`Opening RPC '${e}' stream ${s} transport.`),m.open(),_=!0),G(et,`RPC '${e}' stream ${s} sending:`,L),m.send(L))},Zo:()=>m.close()}),k=(L,$,K)=>{L.listen($,(Q=>{try{K(Q)}catch(H){setTimeout((()=>{throw H}),0)}}))};return k(m,Ds.EventType.OPEN,(()=>{A||(G(et,`RPC '${e}' stream ${s} transport opened.`),D.o_())})),k(m,Ds.EventType.CLOSE,(()=>{A||(A=!0,G(et,`RPC '${e}' stream ${s} transport closed`),D.a_(),this.E_(m))})),k(m,Ds.EventType.ERROR,(L=>{A||(A=!0,Jr(et,`RPC '${e}' stream ${s} transport errored. Name:`,L.name,"Message:",L.message),D.a_(new W(P.UNAVAILABLE,"The operation could not be completed")))})),k(m,Ds.EventType.MESSAGE,(L=>{if(!A){const $=L.data[0];ye(!!$,16349);const K=$,Q=K?.error||K[0]?.error;if(Q){G(et,`RPC '${e}' stream ${s} received error:`,Q);const H=Q.status;let he=(function(g){const E=Pe[g];if(E!==void 0)return vp(E)})(H),we=Q.message;he===void 0&&(he=P.INTERNAL,we="Unknown error status: "+H+" with message "+Q.message),A=!0,D.a_(new W(he,we)),m.close()}else G(et,`RPC '${e}' stream ${s} received:`,$),D.u_($)}})),k(a,B0.STAT_EVENT,(L=>{L.stat===Ea.PROXY?G(et,`RPC '${e}' stream ${s} detected buffering proxy`):L.stat===Ea.NOPROXY&&G(et,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{D.__()}),0),D}terminate(){this.c_.forEach((e=>e.close())),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter((n=>n===e))}}function Xo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function so(t){return new x3(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(e,n,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=n,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const n=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,n-r);s>0&&G("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const If="PersistentStream";class Mp{constructor(e,n,r,s,i,o,a,c){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Op(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===P.RESOURCE_EXHAUSTED?(hn(n.toString()),hn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(n)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===n&&this.G_(r,s)}),(r=>{e((()=>{const s=new W(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,n){const r=this.W_(this.D_);this.stream=this.j_(e,n),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return G(If,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return n=>{this.Mi.enqueueAndForget((()=>this.D_===e?n():(G(If,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class SE extends Mp{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=N3(this.serializer,e),r=(function(i){if(!("targetChange"in i))return re.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?re.min():o.readTime?jt(o.readTime):re.min()})(e);return this.listener.H_(n,r)}Y_(e){const n={};n.database=Pa(this.serializer),n.addTarget=(function(i,o){let a;const c=o.target;if(a=Aa(c)?{documents:O3(i,c)}:{query:M3(i,c).ft},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=Ap(i,o.resumeToken);const h=Ra(i,o.expectedCount);h!==null&&(a.expectedCount=h)}else if(o.snapshotVersion.compareTo(re.min())>0){a.readTime=wu(i,o.snapshotVersion.toTimestamp());const h=Ra(i,o.expectedCount);h!==null&&(a.expectedCount=h)}return a})(this.serializer,e);const r=U3(this.serializer,e);r&&(n.labels=r),this.q_(n)}Z_(e){const n={};n.database=Pa(this.serializer),n.removeTarget=e,this.q_(n)}}class RE extends Mp{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return ye(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ye(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){ye(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=F3(e.writeResults,e.commitTime),r=jt(e.commitTime);return this.listener.na(r,n)}ra(){const e={};e.database=Pa(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map((r=>k3(this.serializer,r)))};this.q_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DE{}class xE extends DE{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new W(P.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,n,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Go(e,Da(n,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new W(P.UNKNOWN,i.toString())}))}Ho(e,n,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Ho(e,Da(n,r),s,o,a,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new W(P.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class PE{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(hn(n),this.aa=!1):G("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr="RemoteStore";class VE{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((o=>{r.enqueueAndForget((async()=>{Tr(this)&&(G(gr,"Restarting streams for network reachability change."),await(async function(c){const h=ie(c);h.Ea.add(4),await _i(h),h.Ra.set("Unknown"),h.Ea.delete(4),await io(h)})(this))}))})),this.Ra=new PE(r,s)}}async function io(t){if(Tr(t))for(const e of t.da)await e(!0)}async function _i(t){for(const e of t.da)await e(!1)}function Lp(t,e){const n=ie(t);n.Ia.has(e.targetId)||(n.Ia.set(e.targetId,e),Dc(n)?Rc(n):as(n).O_()&&Sc(n,e))}function Cc(t,e){const n=ie(t),r=as(n);n.Ia.delete(e),r.O_()&&Up(n,e),n.Ia.size===0&&(r.O_()?r.L_():Tr(n)&&n.Ra.set("Unknown"))}function Sc(t,e){if(t.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(re.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}as(t).Y_(e)}function Up(t,e){t.Va.Ue(e),as(t).Z_(e)}function Rc(t){t.Va=new C3({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ia.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),as(t).start(),t.Ra.ua()}function Dc(t){return Tr(t)&&!as(t).x_()&&t.Ia.size>0}function Tr(t){return ie(t).Ea.size===0}function Bp(t){t.Va=void 0}async function NE(t){t.Ra.set("Online")}async function kE(t){t.Ia.forEach(((e,n)=>{Sc(t,e)}))}async function FE(t,e){Bp(t),Dc(t)?(t.Ra.ha(e),Rc(t)):t.Ra.set("Unknown")}async function OE(t,e,n){if(t.Ra.set("Online"),e instanceof wp&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const a of i.targetIds)s.Ia.has(a)&&(await s.remoteSyncer.rejectListen(a,o),s.Ia.delete(a),s.Va.removeTarget(a))})(t,e)}catch(r){G(gr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Cu(t,r)}else if(e instanceof nu?t.Va.Ze(e):e instanceof Ip?t.Va.st(e):t.Va.tt(e),!n.isEqual(re.min()))try{const r=await Fp(t.localStore);n.compareTo(r)>=0&&await(function(i,o){const a=i.Va.Tt(o);return a.targetChanges.forEach(((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.Ia.get(h);d&&i.Ia.set(h,d.withResumeToken(c.resumeToken,o))}})),a.targetMismatches.forEach(((c,h)=>{const d=i.Ia.get(c);if(!d)return;i.Ia.set(c,d.withResumeToken(Je.EMPTY_BYTE_STRING,d.snapshotVersion)),Up(i,c);const m=new Vn(d.target,c,h,d.sequenceNumber);Sc(i,m)})),i.remoteSyncer.applyRemoteEvent(a)})(t,n)}catch(r){G(gr,"Failed to raise snapshot:",r),await Cu(t,r)}}async function Cu(t,e,n){if(!us(e))throw e;t.Ea.add(1),await _i(t),t.Ra.set("Offline"),n||(n=()=>Fp(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{G(gr,"Retrying IndexedDB access"),await n(),t.Ea.delete(1),await io(t)}))}function qp(t,e){return e().catch((n=>Cu(t,n,e)))}async function uo(t){const e=ie(t),n=Wn(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:hc;for(;ME(e);)try{const s=await yE(e.localStore,r);if(s===null){e.Ta.length===0&&n.L_();break}r=s.batchId,LE(e,s)}catch(s){await Cu(e,s)}jp(e)&&$p(e)}function ME(t){return Tr(t)&&t.Ta.length<10}function LE(t,e){t.Ta.push(e);const n=Wn(t);n.O_()&&n.X_&&n.ea(e.mutations)}function jp(t){return Tr(t)&&!Wn(t).x_()&&t.Ta.length>0}function $p(t){Wn(t).start()}async function UE(t){Wn(t).ra()}async function BE(t){const e=Wn(t);for(const n of t.Ta)e.ea(n.mutations)}async function qE(t,e,n){const r=t.Ta.shift(),s=bc.from(r,e,n);await qp(t,(()=>t.remoteSyncer.applySuccessfulWrite(s))),await uo(t)}async function jE(t,e){e&&Wn(t).X_&&await(async function(r,s){if((function(o){return I3(o)&&o!==P.ABORTED})(s.code)){const i=r.Ta.shift();Wn(r).B_(),await qp(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await uo(r)}})(t,e),jp(t)&&$p(t)}async function wf(t,e){const n=ie(t);n.asyncQueue.verifyOperationInProgress(),G(gr,"RemoteStore received new credentials");const r=Tr(n);n.Ea.add(3),await _i(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ea.delete(3),await io(n)}async function $E(t,e){const n=ie(t);e?(n.Ea.delete(2),await io(n)):e||(n.Ea.add(2),await _i(n),n.Ra.set("Unknown"))}function as(t){return t.ma||(t.ma=(function(n,r,s){const i=ie(n);return i.sa(),new SE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(t.datastore,t.asyncQueue,{Xo:NE.bind(null,t),t_:kE.bind(null,t),r_:FE.bind(null,t),H_:OE.bind(null,t)}),t.da.push((async e=>{e?(t.ma.B_(),Dc(t)?Rc(t):t.Ra.set("Unknown")):(await t.ma.stop(),Bp(t))}))),t.ma}function Wn(t){return t.fa||(t.fa=(function(n,r,s){const i=ie(n);return i.sa(),new RE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(t.datastore,t.asyncQueue,{Xo:()=>Promise.resolve(),t_:UE.bind(null,t),r_:jE.bind(null,t),ta:BE.bind(null,t),na:qE.bind(null,t)}),t.da.push((async e=>{e?(t.fa.B_(),await uo(t)):(await t.fa.stop(),t.Ta.length>0&&(G(gr,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))}))),t.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new hr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,a=new xc(e,n,o,s,i);return a.start(r),a}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Pc(t,e){if(hn("AsyncQueue",`${e}: ${t}`),us(t))return new W(P.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r{static emptySet(e){return new $r(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||X.comparator(n.key,r.key):(n,r)=>X.comparator(n.key,r.key),this.keyedMap=xs(),this.sortedSet=new Re(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((n,r)=>(e(n),!1)))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof $r)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((n=>{e.push(n.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new $r;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af{constructor(){this.ga=new Re(X.comparator)}track(e){const n=e.doc.key,r=this.ga.get(n);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(n,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(n):e.type===1&&r.type===2?this.ga=this.ga.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):ee(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal(((n,r)=>{e.push(r)})),e}}class ts{constructor(e,n,r,s,i,o,a,c,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach((a=>{o.push({type:0,doc:a})})),new ts(e,n,$r.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Zu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zE{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class HE{constructor(){this.queries=Cf(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,r){const s=ie(n),i=s.queries;s.queries=Cf(),i.forEach(((o,a)=>{for(const c of a.Sa)c.onError(r)}))})(this,new W(P.ABORTED,"Firestore shutting down"))}}function Cf(){return new br((t=>lp(t)),Zu)}async function WE(t,e){const n=ie(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new zE,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await n.onListen(s,!0);break;case 1:i.wa=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const a=Pc(o,`Initialization of query '${Vr(e.query)}' failed`);return void e.onError(a)}n.queries.set(s,i),i.Sa.push(e),e.va(n.onlineState),i.wa&&e.Fa(i.wa)&&Vc(n)}async function GE(t,e){const n=ie(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function KE(t,e){const n=ie(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const a of o.Sa)a.Fa(s)&&(r=!0);o.wa=s}}r&&Vc(n)}function QE(t,e,n){const r=ie(t),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(n);r.queries.delete(e)}function Vc(t){t.Ca.forEach((e=>{e.next()}))}var ka,Sf;(Sf=ka||(ka={})).Ma="default",Sf.Cache="cache";class JE{constructor(e,n,r){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new ts(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const r=n!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=ts.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==ka.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{constructor(e){this.key=e}}class Hp{constructor(e){this.key=e}}class XE{constructor(e,n){this.query=e,this.Ya=n,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=le(),this.mutatedKeys=le(),this.eu=hp(e),this.tu=new $r(this.eu)}get nu(){return this.Ya}ru(e,n){const r=n?n.iu:new Af,s=n?n.tu:this.tu;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,a=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((d,m)=>{const _=s.get(d),A=eo(this.query,m)?m:null,D=!!_&&this.mutatedKeys.has(_.key),k=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let L=!1;_&&A?_.data.isEqual(A.data)?D!==k&&(r.track({type:3,doc:A}),L=!0):this.su(_,A)||(r.track({type:2,doc:A}),L=!0,(c&&this.eu(A,c)>0||h&&this.eu(A,h)<0)&&(a=!0)):!_&&A?(r.track({type:0,doc:A}),L=!0):_&&!A&&(r.track({type:1,doc:_}),L=!0,(c||h)&&(a=!0)),L&&(A?(o=o.add(A),i=k?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{tu:o,iu:r,Cs:a,mutatedKeys:i}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((d,m)=>(function(A,D){const k=L=>{switch(L){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ee(20277,{Rt:L})}};return k(A)-k(D)})(d.type,m.type)||this.eu(d.doc,m.doc))),this.ou(r),s=s??!1;const a=n&&!s?this._u():[],c=this.Xa.size===0&&this.current&&!s?1:0,h=c!==this.Za;return this.Za=c,o.length!==0||h?{snapshot:new ts(this.query,e.tu,i,o,e.mutatedKeys,c===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:a}:{au:a}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Af,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((n=>this.Ya=this.Ya.add(n))),e.modifiedDocuments.forEach((n=>{})),e.removedDocuments.forEach((n=>this.Ya=this.Ya.delete(n))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=le(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const n=[];return e.forEach((r=>{this.Xa.has(r)||n.push(new Hp(r))})),this.Xa.forEach((r=>{e.has(r)||n.push(new zp(r))})),n}cu(e){this.Ya=e.Qs,this.Xa=le();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return ts.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Nc="SyncEngine";class YE{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class ZE{constructor(e){this.key=e,this.hu=!1}}class e6{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new br((a=>lp(a)),Zu),this.Iu=new Map,this.Eu=new Set,this.du=new Re(X.comparator),this.Au=new Map,this.Ru=new vc,this.Vu={},this.mu=new Map,this.fu=es.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function t6(t,e,n=!0){const r=Xp(t);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Wp(r,e,n,!0),s}async function n6(t,e){const n=Xp(t);await Wp(n,e,!0,!1)}async function Wp(t,e,n,r){const s=await bE(t.localStore,Bt(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let a;return r&&(a=await r6(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&Lp(t.remoteStore,s),a}async function r6(t,e,n,r,s){t.pu=(m,_,A)=>(async function(k,L,$,K){let Q=L.view.ru($);Q.Cs&&(Q=await bf(k.localStore,L.query,!1).then((({documents:I})=>L.view.ru(I,Q))));const H=K&&K.targetChanges.get(L.targetId),he=K&&K.targetMismatches.get(L.targetId)!=null,we=L.view.applyChanges(Q,k.isPrimaryClient,H,he);return Df(k,L.targetId,we.au),we.snapshot})(t,m,_,A);const i=await bf(t.localStore,e,!0),o=new XE(e,i.Qs),a=o.ru(i.documents),c=gi.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),h=o.applyChanges(a,t.isPrimaryClient,c);Df(t,n,h.au);const d=new YE(e,n,o);return t.Tu.set(e,d),t.Iu.has(n)?t.Iu.get(n).push(e):t.Iu.set(n,[e]),h.snapshot}async function s6(t,e,n){const r=ie(t),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter((o=>!Zu(o,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Va(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Cc(r.remoteStore,s.targetId),Fa(r,s.targetId)})).catch(is)):(Fa(r,s.targetId),await Va(r.localStore,s.targetId,!0))}async function i6(t,e){const n=ie(t),r=n.Tu.get(e),s=n.Iu.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Cc(n.remoteStore,r.targetId))}async function u6(t,e,n){const r=d6(t);try{const s=await(function(o,a){const c=ie(o),h=Ce.now(),d=a.reduce(((A,D)=>A.add(D.key)),le());let m,_;return c.persistence.runTransaction("Locally write mutations","readwrite",(A=>{let D=fn(),k=le();return c.Ns.getEntries(A,d).next((L=>{D=L,D.forEach((($,K)=>{K.isValidDocument()||(k=k.add($))}))})).next((()=>c.localDocuments.getOverlayedDocuments(A,D))).next((L=>{m=L;const $=[];for(const K of a){const Q=y3(K,m.get(K.key).overlayedDocument);Q!=null&&$.push(new Er(K.key,Q,np(Q.value.mapValue),qt.exists(!0)))}return c.mutationQueue.addMutationBatch(A,h,$,a)})).next((L=>{_=L;const $=L.applyToLocalDocumentSet(m,k);return c.documentOverlayCache.saveOverlays(A,L.batchId,$)}))})).then((()=>({batchId:_.batchId,changes:dp(m)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(o,a,c){let h=o.Vu[o.currentUser.toKey()];h||(h=new Re(ce)),h=h.insert(a,c),o.Vu[o.currentUser.toKey()]=h})(r,s.batchId,n),await yi(r,s.changes),await uo(r.remoteStore)}catch(s){const i=Pc(s,"Failed to persist write");n.reject(i)}}async function Gp(t,e){const n=ie(t);try{const r=await gE(n.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=n.Au.get(i);o&&(ye(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?ye(o.hu,14607):s.removedDocuments.size>0&&(ye(o.hu,42227),o.hu=!1))})),await yi(n,r,e)}catch(r){await is(r)}}function Rf(t,e,n){const r=ie(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Tu.forEach(((i,o)=>{const a=o.view.va(e);a.snapshot&&s.push(a.snapshot)})),(function(o,a){const c=ie(o);c.onlineState=a;let h=!1;c.queries.forEach(((d,m)=>{for(const _ of m.Sa)_.va(a)&&(h=!0)})),h&&Vc(c)})(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function o6(t,e,n){const r=ie(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Au.get(e),i=s&&s.key;if(i){let o=new Re(X.comparator);o=o.insert(i,rt.newNoDocument(i,re.min()));const a=le().add(i),c=new ro(re.min(),new Map,new Re(ce),o,a);await Gp(r,c),r.du=r.du.remove(i),r.Au.delete(e),kc(r)}else await Va(r.localStore,e,!1).then((()=>Fa(r,e,n))).catch(is)}async function a6(t,e){const n=ie(t),r=e.batch.batchId;try{const s=await mE(n.localStore,e);Qp(n,r,null),Kp(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await yi(n,s)}catch(s){await is(s)}}async function c6(t,e,n){const r=ie(t);try{const s=await(function(o,a){const c=ie(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let d;return c.mutationQueue.lookupMutationBatch(h,a).next((m=>(ye(m!==null,37113),d=m.keys(),c.mutationQueue.removeMutationBatch(h,m)))).next((()=>c.mutationQueue.performConsistencyCheck(h))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(h,d,a))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,d))).next((()=>c.localDocuments.getDocuments(h,d)))}))})(r.localStore,e);Qp(r,e,n),Kp(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await yi(r,s)}catch(s){await is(s)}}function Kp(t,e){(t.mu.get(e)||[]).forEach((n=>{n.resolve()})),t.mu.delete(e)}function Qp(t,e,n){const r=ie(t);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Fa(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Iu.get(e))t.Tu.delete(r),n&&t.Pu.yu(r,n);t.Iu.delete(e),t.isPrimaryClient&&t.Ru.jr(e).forEach((r=>{t.Ru.containsKey(r)||Jp(t,r)}))}function Jp(t,e){t.Eu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(Cc(t.remoteStore,n),t.du=t.du.remove(e),t.Au.delete(n),kc(t))}function Df(t,e,n){for(const r of n)r instanceof zp?(t.Ru.addReference(r.key,e),l6(t,r)):r instanceof Hp?(G(Nc,"Document no longer in limbo: "+r.key),t.Ru.removeReference(r.key,e),t.Ru.containsKey(r.key)||Jp(t,r.key)):ee(19791,{wu:r})}function l6(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Eu.has(r)||(G(Nc,"New document in limbo: "+n),t.Eu.add(r),kc(t))}function kc(t){for(;t.Eu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Eu.values().next().value;t.Eu.delete(e);const n=new X(Ie.fromString(e)),r=t.fu.next();t.Au.set(r,new ZE(n)),t.du=t.du.insert(n,r),Lp(t.remoteStore,new Vn(Bt(gc(n.path)),r,"TargetPurposeLimboResolution",Ju.ce))}}async function yi(t,e,n){const r=ie(t),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach(((a,c)=>{o.push(r.pu(c,e,n).then((h=>{if((h||n)&&r.isPrimaryClient){const d=h?!h.fromCache:n?.targetChanges.get(c.targetId)?.current;r.sharedClientState.updateQueryState(c.targetId,d?"current":"not-current")}if(h){s.push(h);const d=wc.As(c.targetId,h);i.push(d)}})))})),await Promise.all(o),r.Pu.H_(s),await(async function(c,h){const d=ie(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>V.forEach(h,(_=>V.forEach(_.Es,(A=>d.persistence.referenceDelegate.addReference(m,_.targetId,A))).next((()=>V.forEach(_.ds,(A=>d.persistence.referenceDelegate.removeReference(m,_.targetId,A)))))))))}catch(m){if(!us(m))throw m;G(Ac,"Failed to update sequence numbers: "+m)}for(const m of h){const _=m.targetId;if(!m.fromCache){const A=d.Ms.get(_),D=A.snapshotVersion,k=A.withLastLimboFreeSnapshotVersion(D);d.Ms=d.Ms.insert(_,k)}}})(r.localStore,i))}async function h6(t,e){const n=ie(t);if(!n.currentUser.isEqual(e)){G(Nc,"User change. New user:",e.toKey());const r=await kp(n.localStore,e);n.currentUser=e,(function(i,o){i.mu.forEach((a=>{a.forEach((c=>{c.reject(new W(P.CANCELLED,o))}))})),i.mu.clear()})(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await yi(n,r.Ls)}}function f6(t,e){const n=ie(t),r=n.Au.get(e);if(r&&r.hu)return le().add(r.key);{let s=le();const i=n.Iu.get(e);if(!i)return s;for(const o of i){const a=n.Tu.get(o);s=s.unionWith(a.view.nu)}return s}}function Xp(t){const e=ie(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Gp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=f6.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=o6.bind(null,e),e.Pu.H_=KE.bind(null,e.eventManager),e.Pu.yu=QE.bind(null,e.eventManager),e}function d6(t){const e=ie(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=a6.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=c6.bind(null,e),e}class Su{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=so(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return pE(this.persistence,new hE,e.initialUser,this.serializer)}Cu(e){return new Np(Ic.mi,this.serializer)}Du(e){return new TE}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Su.provider={build:()=>new Su};class p6 extends Su{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){ye(this.persistence.referenceDelegate instanceof Au,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new J3(r,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?dt.withCacheSize(this.cacheSizeBytes):dt.DEFAULT;return new Np((r=>Au.mi(r,n)),this.serializer)}}class Oa{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Rf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=h6.bind(null,this.syncEngine),await $E(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new HE})()}createDatastore(e){const n=so(e.databaseInfo.databaseId),r=(function(i){return new CE(i)})(e.databaseInfo);return(function(i,o,a,c){return new xE(i,o,a,c)})(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return(function(r,s,i,o,a){return new VE(r,s,i,o,a)})(this.localStore,this.datastore,e.asyncQueue,(n=>Rf(this.syncEngine,n,0)),(function(){return vf.v()?new vf:new vE})())}createSyncEngine(e,n){return(function(s,i,o,a,c,h,d){const m=new e6(s,i,o,a,c,h);return d&&(m.gu=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){await(async function(n){const r=ie(n);G(gr,"RemoteStore shutting down."),r.Ea.add(5),await _i(r),r.Aa.shutdown(),r.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Oa.provider={build:()=>new Oa};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m6{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):hn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout((()=>{this.muted||e(n)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gn="FirestoreClient";class g6{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=tt.UNAUTHENTICATED,this.clientId=lc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{G(Gn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(G(Gn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new hr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Pc(n,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Yo(t,e){t.asyncQueue.verifyOperationInProgress(),G(Gn,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((async s=>{r.isEqual(s)||(await kp(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t._offlineComponents=e}async function xf(t,e){t.asyncQueue.verifyOperationInProgress();const n=await _6(t);G(Gn,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener((r=>wf(e.remoteStore,r))),t.setAppCheckTokenChangeListener(((r,s)=>wf(e.remoteStore,s))),t._onlineComponents=e}async function _6(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){G(Gn,"Using user provided OfflineComponentProvider");try{await Yo(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!(function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(n))throw n;Jr("Error using user provided cache. Falling back to memory cache: "+n),await Yo(t,new Su)}}else G(Gn,"Using default OfflineComponentProvider"),await Yo(t,new p6(void 0));return t._offlineComponents}async function Yp(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(G(Gn,"Using user provided OnlineComponentProvider"),await xf(t,t._uninitializedComponentsProvider._online)):(G(Gn,"Using default OnlineComponentProvider"),await xf(t,new Oa))),t._onlineComponents}function y6(t){return Yp(t).then((e=>e.syncEngine))}async function Pf(t){const e=await Yp(t),n=e.eventManager;return n.onListen=t6.bind(null,e.syncEngine),n.onUnlisten=s6.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=n6.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=i6.bind(null,e.syncEngine),n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zp(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vf=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const em="firestore.googleapis.com",Nf=!0;class kf{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new W(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=em,this.ssl=Nf}else this.host=e.host,this.ssl=e.ssl??Nf;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Vp;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<K3)throw new W(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Pb("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Zp(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new W(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new W(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new W(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class oo{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new kf({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new kf(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Tb;switch(r.type){case"firstParty":return new Ab(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(n){const r=Vf.get(n);r&&(G("ComponentProvider","Removing Datastore"),Vf.delete(n),r.terminate())})(this),Promise.resolve()}}function b6(t,e,n,r={}){t=jr(t,oo);const s=ns(e),i=t._getSettings(),o={...i,emulatorOptions:t._getEmulatorOptions()},a=`${e}:${n}`;s&&(x0(`https://${a}`),P0("Firestore",!0)),i.host!==em&&i.host!==a&&Jr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:a,ssl:s,emulatorOptions:r};if(!dr(c,o)&&(t._setSettings(c),r.mockUserToken)){let h,d;if(typeof r.mockUserToken=="string")h=r.mockUserToken,d=tt.MOCK_USER;else{h=G2(r.mockUserToken,t._app?.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new W(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new tt(m)}t._authCredentials=new vb(new z0(h,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new vr(this.firestore,e,this._query)}}class Me{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Mn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Me(this.firestore,e,this._key)}toJSON(){return{type:Me._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(pi(n,Me._jsonSchema))return new Me(e,r||null,new X(Ie.fromString(n.referencePath)))}}Me._jsonSchemaVersion="firestore/documentReference/1.0",Me._jsonSchema={type:Ne("string",Me._jsonSchemaVersion),referencePath:Ne("string")};class Mn extends vr{constructor(e,n,r){super(e,n,gc(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Me(this.firestore,null,new X(e))}withConverter(e){return new Mn(this.firestore,e,this._path)}}function Q4(t,e,...n){if(t=ht(t),H0("collection","path",e),t instanceof oo){const r=Ie.fromString(e,...n);return Hh(r),new Mn(t,null,r)}{if(!(t instanceof Me||t instanceof Mn))throw new W(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ie.fromString(e,...n));return Hh(r),new Mn(t.firestore,null,r)}}function E6(t,e,...n){if(t=ht(t),arguments.length===1&&(e=lc.newId()),H0("doc","path",e),t instanceof oo){const r=Ie.fromString(e,...n);return zh(r),new Me(t,null,new X(r))}{if(!(t instanceof Me||t instanceof Mn))throw new W(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ie.fromString(e,...n));return zh(r),new Me(t.firestore,t instanceof Mn?t.converter:null,new X(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ff="AsyncQueue";class Of{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Op(this,"async_queue_retry"),this._c=()=>{const r=Xo();r&&G(Ff,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const n=Xo();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=Xo();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const n=new hr;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise))).then((()=>n.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!us(e))throw e;G(Ff,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const n=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,hn("INTERNAL UNHANDLED ERROR: ",Mf(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=n,n}enqueueAfterDelay(e,n,r){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const s=xc.createAndSchedule(this,e,n,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&ee(47125,{Pc:Mf(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((n,r)=>n.targetTimeMs-r.targetTimeMs));for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function Mf(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lf(t){return(function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(t,["next","error","complete"])}class ai extends oo{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new Of,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Of(e),this._firestoreClient=void 0,await e}}}function J4(t,e){const n=typeof t=="object"?t:k0(),r=typeof t=="string"?t:Eu,s=ac(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=H2("firestore");i&&b6(s,...i)}return s}function tm(t){if(t._terminated)throw new W(P.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||T6(t),t._firestoreClient}function T6(t){const e=t._freezeSettings(),n=(function(s,i,o,a){return new jb(s,i,o,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,Zp(a.experimentalLongPollingOptions),a.useFetchStreams,a.isUsingEmulator)})(t._databaseId,t._app?.options.appId||"",t._persistenceKey,e);t._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new g6(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Tt(Je.fromBase64String(e))}catch(n){throw new W(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Tt(Je.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Tt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(pi(e,Tt._jsonSchema))return Tt.fromBase64String(e.bytes)}}Tt._jsonSchemaVersion="firestore/bytes/1.0",Tt._jsonSchema={type:Ne("string",Tt._jsonSchemaVersion),bytes:Ne("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new W(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Qe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oc{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new W(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new W(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ce(this._lat,e._lat)||ce(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:$t._jsonSchemaVersion}}static fromJSON(e){if(pi(e,$t._jsonSchema))return new $t(e.latitude,e.longitude)}}$t._jsonSchemaVersion="firestore/geoPoint/1.0",$t._jsonSchema={type:Ne("string",$t._jsonSchemaVersion),latitude:Ne("number"),longitude:Ne("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e){this._values=(e||[]).map((n=>n))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:zt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(pi(e,zt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((n=>typeof n=="number")))return new zt(e.vectorValues);throw new W(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}zt._jsonSchemaVersion="firestore/vectorValue/1.0",zt._jsonSchema={type:Ne("string",zt._jsonSchemaVersion),vectorValues:Ne("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v6=/^__.*__$/;class I6{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Er(e,this.data,this.fieldMask,n,this.fieldTransforms):new mi(e,this.data,n,this.fieldTransforms)}}function nm(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ee(40011,{Ac:t})}}class Mc{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Mc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const n=this.path?.child(e),r=this.Vc({path:n,fc:!1});return r.gc(e),r}yc(e){const n=this.path?.child(e),r=this.Vc({path:n,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Ru(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((n=>e.isPrefixOf(n)))!==void 0||this.fieldTransforms.find((n=>e.isPrefixOf(n.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(nm(this.Ac)&&v6.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class w6{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||so(e)}Cc(e,n,r,s=!1){return new Mc({Ac:e,methodName:n,Dc:r,path:Qe.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function rm(t){const e=t._freezeSettings(),n=so(t._databaseId);return new w6(t._databaseId,!!e.ignoreUndefinedProperties,n)}function A6(t,e,n,r,s,i={}){const o=t.Cc(i.merge||i.mergeFields?2:0,e,n,s);um("Data must be an object, but it was:",o,r);const a=sm(r,o);let c,h;if(i.merge)c=new Rt(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const m of i.mergeFields){const _=S6(e,m,n);if(!o.contains(_))throw new W(P.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);D6(d,_)||d.push(_)}c=new Rt(d),h=o.fieldTransforms.filter((m=>c.covers(m.field)))}else c=null,h=o.fieldTransforms;return new I6(new Et(a),c,h)}class Lc extends Oc{_toFieldTransform(e){return new p3(e.path,new ii)}isEqual(e){return e instanceof Lc}}function C6(t,e,n,r=!1){return Uc(n,t.Cc(r?4:3,e))}function Uc(t,e){if(im(t=ht(t)))return um("Unsupported field value:",e,t),sm(t,e);if(t instanceof Oc)return(function(r,s){if(!nm(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const a of r){let c=Uc(a,s.wc(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}})(t,e)}return(function(r,s){if((r=ht(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return h3(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Ce.fromDate(r);return{timestampValue:wu(s.serializer,i)}}if(r instanceof Ce){const i=new Ce(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:wu(s.serializer,i)}}if(r instanceof $t)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Tt)return{bytesValue:Ap(s.serializer,r._byteString)};if(r instanceof Me){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Tc(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof zt)return(function(o,a){return{mapValue:{fields:{[ep]:{stringValue:tp},[Tu]:{arrayValue:{values:o.toArray().map((h=>{if(typeof h!="number")throw a.Sc("VectorValues must only contain numeric values.");return _c(a.serializer,h)}))}}}}}})(r,s);throw s.Sc(`Unsupported field value: ${Qu(r)}`)})(t,e)}function sm(t,e){const n={};return K0(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):yr(t,((r,s)=>{const i=Uc(s,e.mc(r));i!=null&&(n[r]=i)})),{mapValue:{fields:n}}}function im(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ce||t instanceof $t||t instanceof Tt||t instanceof Me||t instanceof Oc||t instanceof zt)}function um(t,e,n){if(!im(n)||!W0(n)){const r=Qu(n);throw r==="an object"?e.Sc(t+" a custom object"):e.Sc(t+" "+r)}}function S6(t,e,n){if((e=ht(e))instanceof Fc)return e._internalPath;if(typeof e=="string")return om(t,e);throw Ru("Field path arguments must be of type string or ",t,!1,void 0,n)}const R6=new RegExp("[~\\*/\\[\\]]");function om(t,e,n){if(e.search(R6)>=0)throw Ru(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Fc(...e.split("."))._internalPath}catch{throw Ru(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Ru(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new W(P.INVALID_ARGUMENT,a+t+c)}function D6(t,e){return t.some((n=>n.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class am{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Me(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new x6(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Bc("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class x6 extends am{data(){return super.data()}}function Bc(t,e){return typeof e=="string"?om(t,e):e instanceof Fc?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P6(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new W(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class qc{}class cm extends qc{}function X4(t,e,...n){let r=[];e instanceof qc&&r.push(e),r=r.concat(n),(function(i){const o=i.filter((c=>c instanceof $c)).length,a=i.filter((c=>c instanceof jc)).length;if(o>1||o>0&&a>0)throw new W(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)t=s._apply(t);return t}class jc extends cm{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new jc(e,n,r)}_apply(e){const n=this._parse(e);return lm(e._query,n),new vr(e.firestore,e.converter,Ca(e._query,n))}_parse(e){const n=rm(e.firestore);return(function(i,o,a,c,h,d,m){let _;if(h.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new W(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){Bf(m,d);const D=[];for(const k of m)D.push(Uf(c,i,k));_={arrayValue:{values:D}}}else _=Uf(c,i,m)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||Bf(m,d),_=C6(a,o,m,d==="in"||d==="not-in");return Ve.create(h,d,_)})(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}class $c extends qc{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new $c(e,n)}_parse(e){const n=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return n.length===1?n[0]:Pt.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:((function(s,i){let o=s;const a=i.getFlattenedFilters();for(const c of a)lm(o,c),o=Ca(o,c)})(e._query,n),new vr(e.firestore,e.converter,Ca(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class zc extends cm{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new zc(e,n)}_apply(e){const n=(function(s,i,o){if(s.startAt!==null)throw new W(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new W(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new si(i,o)})(e._query,this._field,this._direction);return new vr(e.firestore,e.converter,(function(s,i){const o=s.explicitOrderBy.concat([i]);return new os(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)})(e._query,n))}}function Y4(t,e="asc"){const n=e,r=Bc("orderBy",t);return zc._create(r,n)}function Uf(t,e,n){if(typeof(n=ht(n))=="string"){if(n==="")throw new W(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!cp(e)&&n.indexOf("/")!==-1)throw new W(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Ie.fromString(n));if(!X.isDocumentKey(r))throw new W(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Zh(t,new X(r))}if(n instanceof Me)return Zh(t,n._key);throw new W(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Qu(n)}.`)}function Bf(t,e){if(!Array.isArray(t)||t.length===0)throw new W(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function lm(t,e){const n=(function(s,i){for(const o of s)for(const a of o.getFlattenedFilters())if(i.indexOf(a.op)>=0)return a.op;return null})(t.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(n!==null)throw n===e.op?new W(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new W(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class V6{convertValue(e,n="none"){switch(Hn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return xe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(zn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw ee(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return yr(e,((s,i)=>{r[s]=this.convertValue(i,n)})),r}convertVectorValue(e){const n=e.fields?.[Tu].arrayValue?.values?.map((r=>xe(r.doubleValue)));return new zt(n)}convertGeoPoint(e){return new $t(xe(e.latitude),xe(e.longitude))}convertArray(e,n){return(e.values||[]).map((r=>this.convertValue(r,n)))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Yu(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(ti(e));default:return null}}convertTimestamp(e){const n=$n(e);return new Ce(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Ie.fromString(e);ye(Pp(r),9688,{name:e});const s=new ni(r.get(1),r.get(3)),i=new X(r.popFirst(5));return s.isEqual(n)||hn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N6(t,e,n){let r;return r=t?t.toFirestore(e):e,r}class Vs{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class fr extends am{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new ru(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Bc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new W(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=fr._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}fr._jsonSchemaVersion="firestore/documentSnapshot/1.0",fr._jsonSchema={type:Ne("string",fr._jsonSchemaVersion),bundleSource:Ne("string","DocumentSnapshot"),bundleName:Ne("string"),bundle:Ne("string")};class ru extends fr{data(e={}){return super.data(e)}}class zr{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Vs(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((n=>e.push(n))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach((r=>{e.call(n,new ru(this._firestore,this._userDataWriter,r.key,r,new Vs(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new W(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((a=>{const c=new ru(s._firestore,s._userDataWriter,a.doc.key,a.doc,new Vs(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((a=>i||a.type!==3)).map((a=>{const c=new ru(s._firestore,s._userDataWriter,a.doc.key,a.doc,new Vs(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,d=-1;return a.type!==0&&(h=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),d=o.indexOf(a.doc.key)),{type:k6(a.type),doc:c,oldIndex:h,newIndex:d}}))}})(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new W(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=zr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=lc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(n.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function k6(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ee(61501,{type:t})}}zr._jsonSchemaVersion="firestore/querySnapshot/1.0",zr._jsonSchema={type:Ne("string",zr._jsonSchemaVersion),bundleSource:Ne("string","QuerySnapshot"),bundleName:Ne("string"),bundle:Ne("string")};class hm extends V6{constructor(e){super(),this.firestore=e}convertBytes(e){return new Tt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Me(this.firestore,null,n)}}function Z4(t){return fm(jr(t.firestore,ai),[new yc(t._key,qt.none())])}function ev(t,e){const n=jr(t.firestore,ai),r=E6(t),s=N6(t.converter,e);return fm(n,[A6(rm(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,qt.exists(!1))]).then((()=>r))}function tv(t,...e){t=ht(t);let n={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Lf(e[r])||(n=e[r++]);const s={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(Lf(e[r])){const c=e[r];e[r]=c.next?.bind(c),e[r+1]=c.error?.bind(c),e[r+2]=c.complete?.bind(c)}let i,o,a;if(t instanceof Me)o=jr(t.firestore,ai),a=gc(t._key.path),i={next:c=>{e[r]&&e[r](F6(o,t,c))},error:e[r+1],complete:e[r+2]};else{const c=jr(t,vr);o=jr(c.firestore,ai),a=c._query;const h=new hm(o);i={next:d=>{e[r]&&e[r](new zr(o,h,c,d))},error:e[r+1],complete:e[r+2]},P6(t._query)}return(function(h,d,m,_){const A=new m6(_),D=new JE(d,A,m);return h.asyncQueue.enqueueAndForget((async()=>WE(await Pf(h),D))),()=>{A.Nu(),h.asyncQueue.enqueueAndForget((async()=>GE(await Pf(h),D)))}})(tm(o),a,s,i)}function fm(t,e){return(function(r,s){const i=new hr;return r.asyncQueue.enqueueAndForget((async()=>u6(await y6(r),s,i))),i.promise})(tm(t),e)}function F6(t,e,n){const r=n.docs.get(e._key),s=new hm(t);return new fr(t,s,e._key,r,new Vs(n.hasPendingWrites,n.fromCache),e.converter)}function nv(){return new Lc("serverTimestamp")}(function(e,n=!0){(function(s){ss=s})(rs),Qr(new pr("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),a=new ai(new Ib(r.getProvider("auth-internal")),new Cb(o,r.getProvider("app-check-internal")),(function(h,d){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new W(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ni(h.options.projectId,d)})(o,s),o);return i={useFetchStreams:n,...i},a._setSettings(i),a}),"PUBLIC").setMultipleInstances(!0)),lr(Bh,qh,e),lr(Bh,qh,"esm2020")})();function dm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const O6=dm,pm=new fi("auth","Firebase",dm());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Du=new uc("@firebase/auth");function M6(t,...e){Du.logLevel<=ae.WARN&&Du.warn(`Auth (${rs}): ${t}`,...e)}function su(t,...e){Du.logLevel<=ae.ERROR&&Du.error(`Auth (${rs}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(t,...e){throw Hc(t,...e)}function Ht(t,...e){return Hc(t,...e)}function mm(t,e,n){const r={...O6(),[e]:n};return new fi("auth","Firebase",r).create(e,{appName:t.name})}function Ln(t){return mm(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Hc(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return pm.create(t,...e)}function ne(t,e,...n){if(!t)throw Hc(e,...n)}function sn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw su(e),new Error(e)}function pn(t,e){t||sn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ma(){return typeof self<"u"&&self.location?.href||""}function L6(){return qf()==="http:"||qf()==="https:"}function qf(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U6(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(L6()||Z2()||"connection"in navigator)?navigator.onLine:!0}function B6(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(e,n){this.shortDelay=e,this.longDelay=n,pn(n>e,"Short delay should be less than long delay!"),this.isMobile=J2()||ey()}get(){return U6()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wc(t,e){pn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;sn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;sn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;sn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q6={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j6=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],$6=new bi(3e4,6e4);function ao(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function cs(t,e,n,r,s={}){return _m(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const a=di({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const h={method:e,headers:c,...i};return Y2()||(h.referrerPolicy="no-referrer"),t.emulatorConfig&&ns(t.emulatorConfig.host)&&(h.credentials="include"),gm.fetch()(await bm(t,t.config.apiHost,n,a),h)})}async function _m(t,e,n){t._canInitEmulator=!1;const r={...q6,...e};try{const s=new z6(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Gi(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,h]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Gi(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Gi(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Gi(t,"user-disabled",o);const d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw mm(t,d,h);dn(t,d)}}catch(s){if(s instanceof gn)throw s;dn(t,"network-request-failed",{message:String(s)})}}async function ym(t,e,n,r,s={}){const i=await cs(t,e,n,r,s);return"mfaPendingCredential"in i&&dn(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function bm(t,e,n,r){const s=`${e}${n}?${r}`,i=t,o=i.config.emulator?Wc(t.config,s):`${t.config.apiScheme}://${s}`;return j6.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class z6{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Ht(this.auth,"network-request-failed")),$6.get())})}}function Gi(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Ht(t,e,r);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function H6(t,e){return cs(t,"POST","/v1/accounts:delete",e)}async function xu(t,e){return cs(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hs(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function W6(t,e=!1){const n=ht(t),r=await n.getIdToken(e),s=Gc(r);ne(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:Hs(Zo(s.auth_time)),issuedAtTime:Hs(Zo(s.iat)),expirationTime:Hs(Zo(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Zo(t){return Number(t)*1e3}function Gc(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return su("JWT malformed, contained fewer than 3 sections"),null;try{const s=C0(n);return s?JSON.parse(s):(su("Failed to decode base64 JWT payload"),null)}catch(s){return su("Caught error parsing JWT payload as JSON",s?.toString()),null}}function jf(t){const e=Gc(t);return ne(e,"internal-error"),ne(typeof e.exp<"u","internal-error"),ne(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ci(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof gn&&G6(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function G6({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K6{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Hs(this.lastLoginAt),this.creationTime=Hs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pu(t){const e=t.auth,n=await t.getIdToken(),r=await ci(t,xu(e,{idToken:n}));ne(r?.users.length,e,"internal-error");const s=r.users[0];t._notifyReloadListener(s);const i=s.providerUserInfo?.length?Em(s.providerUserInfo):[],o=J6(t.providerData,i),a=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!o?.length,h=a?c:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new La(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(t,d)}async function Q6(t){const e=ht(t);await Pu(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function J6(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Em(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function X6(t,e){const n=await _m(t,{},async()=>{const r=di({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=await bm(t,s,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:r};return t.emulatorConfig&&ns(t.emulatorConfig.host)&&(c.credentials="include"),gm.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Y6(t,e){return cs(t,"POST","/v2/accounts:revokeToken",ao(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ne(e.idToken,"internal-error"),ne(typeof e.idToken<"u","internal-error"),ne(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):jf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){ne(e.length!==0,"internal-error");const n=jf(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(ne(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await X6(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Hr;return r&&(ne(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(ne(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(ne(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Hr,this.toJSON())}_performRefresh(){return sn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vn(t,e){ne(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Dt{constructor({uid:e,auth:n,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new K6(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new La(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await ci(this,this.stsTokenManager.getToken(this.auth,e));return ne(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return W6(this,e)}reload(){return Q6(this)}_assign(e){this!==e&&(ne(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Dt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){ne(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Pu(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(St(this.auth.app))return Promise.reject(Ln(this.auth));const e=await this.getIdToken();return await ci(this,H6(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,s=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,h=n.createdAt??void 0,d=n.lastLoginAt??void 0,{uid:m,emailVerified:_,isAnonymous:A,providerData:D,stsTokenManager:k}=n;ne(m&&k,e,"internal-error");const L=Hr.fromJSON(this.name,k);ne(typeof m=="string",e,"internal-error"),vn(r,e.name),vn(s,e.name),ne(typeof _=="boolean",e,"internal-error"),ne(typeof A=="boolean",e,"internal-error"),vn(i,e.name),vn(o,e.name),vn(a,e.name),vn(c,e.name),vn(h,e.name),vn(d,e.name);const $=new Dt({uid:m,auth:e,email:s,emailVerified:_,displayName:r,isAnonymous:A,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:L,createdAt:h,lastLoginAt:d});return D&&Array.isArray(D)&&($.providerData=D.map(K=>({...K}))),c&&($._redirectEventId=c),$}static async _fromIdTokenResponse(e,n,r=!1){const s=new Hr;s.updateFromServerResponse(n);const i=new Dt({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Pu(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];ne(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Em(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,a=new Hr;a.updateFromIdToken(r);const c=new Dt({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new La(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $f=new Map;function un(t){pn(t instanceof Function,"Expected a class definition");let e=$f.get(t);return e?(pn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,$f.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Tm.type="NONE";const zf=Tm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iu(t,e,n){return`firebase:${t}:${e}:${n}`}class Wr{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=iu(this.userKey,s.apiKey,i),this.fullPersistenceKey=iu("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await xu(this.auth,{idToken:e}).catch(()=>{});return n?Dt._fromGetAccountInfoResponse(this.auth,n,e):null}return Dt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Wr(un(zf),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||un(zf);const o=iu(r,e.config.apiKey,e.name);let a=null;for(const h of n)try{const d=await h._get(o);if(d){let m;if(typeof d=="string"){const _=await xu(e,{idToken:d}).catch(()=>{});if(!_)break;m=await Dt._fromGetAccountInfoResponse(e,_,d)}else m=Dt._fromJSON(e,d);h!==i&&(a=m),i=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Wr(i,e,r):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Wr(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hf(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Am(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(vm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Sm(e))return"Blackberry";if(Rm(e))return"Webos";if(Im(e))return"Safari";if((e.includes("chrome/")||wm(e))&&!e.includes("edge/"))return"Chrome";if(Cm(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if(r?.length===2)return r[1]}return"Other"}function vm(t=it()){return/firefox\//i.test(t)}function Im(t=it()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function wm(t=it()){return/crios\//i.test(t)}function Am(t=it()){return/iemobile/i.test(t)}function Cm(t=it()){return/android/i.test(t)}function Sm(t=it()){return/blackberry/i.test(t)}function Rm(t=it()){return/webos/i.test(t)}function Kc(t=it()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Z6(t=it()){return Kc(t)&&!!window.navigator?.standalone}function eT(){return ty()&&document.documentMode===10}function Dm(t=it()){return Kc(t)||Cm(t)||Rm(t)||Sm(t)||/windows phone/i.test(t)||Am(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xm(t,e=[]){let n;switch(t){case"Browser":n=Hf(it());break;case"Worker":n=`${Hf(it())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${rs}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tT{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nT(t,e={}){return cs(t,"GET","/v2/passwordPolicy",ao(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rT=6;class sT{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??rT,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Wf(this),this.idTokenSubscription=new Wf(this),this.beforeStateQueue=new tT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=pm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=un(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Wr.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await xu(this,{idToken:e}),r=await Dt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(St(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=r?._redirectEventId,a=await this.tryRedirectSignIn(e);(!i||i===o)&&a?.user&&(r=a.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return ne(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Pu(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=B6()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(St(this.app))return Promise.reject(Ln(this));const n=e?ht(e):null;return n&&ne(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&ne(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return St(this.app)?Promise.reject(Ln(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return St(this.app)?Promise.reject(Ln(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(un(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await nT(this),n=new sT(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new fi("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await Y6(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&un(e)||this._popupRedirectResolver;ne(n,this,"argument-error"),this.redirectPersistenceManager=await Wr.create(this,[un(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(ne(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ne(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=xm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(St(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&M6(`Error while retrieving App Check token: ${e.error}`),e?.token}}function co(t){return ht(t)}class Wf{constructor(e){this.auth=e,this.observer=null,this.addObserver=cy(n=>this.observer=n)}get next(){return ne(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function uT(t){Qc=t}function oT(t){return Qc.loadJS(t)}function aT(){return Qc.gapiScript}function cT(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lT(t,e){const n=ac(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(dr(i,e??{}))return s;dn(s,"already-initialized")}return n.initialize({options:e})}function hT(t,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(un);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}function fT(t,e,n){const r=co(t);ne(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Pm(e),{host:o,port:a}=dT(e),c=a===null?"":`:${a}`,h={url:`${i}//${o}${c}/`},d=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){ne(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),ne(dr(h,r.config.emulator)&&dr(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,ns(o)?(x0(`${i}//${o}${c}`),P0("Auth",!0)):pT()}function Pm(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function dT(t){const e=Pm(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Gf(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Gf(o)}}}function Gf(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function pT(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vm{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return sn("not implemented")}_getIdTokenResponse(e){return sn("not implemented")}_linkToIdToken(e,n){return sn("not implemented")}_getReauthenticationResolver(e){return sn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gr(t,e){return ym(t,"POST","/v1/accounts:signInWithIdp",ao(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mT="http://localhost";class _r extends Vm{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new _r(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):dn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=n;if(!r||!s)return null;const o=new _r(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Gr(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Gr(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Gr(e,n)}buildRequest(){const e={requestUri:mT,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=di(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nm{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei extends Nm{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn extends Ei{constructor(){super("facebook.com")}static credential(e){return _r._fromParams({providerId:Sn.PROVIDER_ID,signInMethod:Sn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Sn.credentialFromTaggedObject(e)}static credentialFromError(e){return Sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Sn.credential(e.oauthAccessToken)}catch{return null}}}Sn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Sn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn extends Ei{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return _r._fromParams({providerId:Rn.PROVIDER_ID,signInMethod:Rn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Rn.credentialFromTaggedObject(e)}static credentialFromError(e){return Rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Rn.credential(n,r)}catch{return null}}}Rn.GOOGLE_SIGN_IN_METHOD="google.com";Rn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn extends Ei{constructor(){super("github.com")}static credential(e){return _r._fromParams({providerId:Dn.PROVIDER_ID,signInMethod:Dn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Dn.credentialFromTaggedObject(e)}static credentialFromError(e){return Dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Dn.credential(e.oauthAccessToken)}catch{return null}}}Dn.GITHUB_SIGN_IN_METHOD="github.com";Dn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn extends Ei{constructor(){super("twitter.com")}static credential(e,n){return _r._fromParams({providerId:xn.PROVIDER_ID,signInMethod:xn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return xn.credentialFromTaggedObject(e)}static credentialFromError(e){return xn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return xn.credential(n,r)}catch{return null}}}xn.TWITTER_SIGN_IN_METHOD="twitter.com";xn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gT(t,e){return ym(t,"POST","/v1/accounts:signUp",ao(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Dt._fromIdTokenResponse(e,r,s),o=Kf(r);return new Kn({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Kf(r);return new Kn({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Kf(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rv(t){if(St(t.app))return Promise.reject(Ln(t));const e=co(t);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new Kn({user:e.currentUser,providerId:null,operationType:"signIn"});const n=await gT(e,{returnSecureToken:!0}),r=await Kn._fromIdTokenResponse(e,"signIn",n,!0);return await e._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu extends gn{constructor(e,n,r,s){super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Vu.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Vu(e,n,r,s)}}function km(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Vu._fromErrorAndOperation(t,i,e,r):i})}async function _T(t,e,n=!1){const r=await ci(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Kn._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yT(t,e,n=!1){const{auth:r}=t;if(St(r.app))return Promise.reject(Ln(r));const s="reauthenticate";try{const i=await ci(t,km(r,s,e,t),n);ne(i.idToken,r,"internal-error");const o=Gc(i.idToken);ne(o,r,"internal-error");const{sub:a}=o;return ne(t.uid===a,r,"user-mismatch"),Kn._forOperation(t,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&dn(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bT(t,e,n=!1){if(St(t.app))return Promise.reject(Ln(t));const r="signIn",s=await km(t,r,e),i=await Kn._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sv(t,e){return ht(t).setPersistence(e)}function ET(t,e,n,r){return ht(t).onIdTokenChanged(e,n,r)}function TT(t,e,n){return ht(t).beforeAuthStateChanged(e,n)}function iv(t,e,n,r){return ht(t).onAuthStateChanged(e,n,r)}const Nu="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fm{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Nu,"1"),this.storage.removeItem(Nu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vT=1e3,IT=10;class Om extends Fm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Dm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);eT()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,IT):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},vT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Om.type="LOCAL";const wT=Om;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mm extends Fm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Mm.type="SESSION";const Lm=Mm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AT(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new lo(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const a=Array.from(o).map(async h=>h(n.origin,i)),c=await AT(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}lo.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jc(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CT{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const h=Jc("",20);s.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(m){const _=m;if(_.data.eventId===h)switch(_.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(_.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wt(){return window}function ST(t){Wt().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Um(){return typeof Wt().WorkerGlobalScope<"u"&&typeof Wt().importScripts=="function"}async function RT(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function DT(){return navigator?.serviceWorker?.controller||null}function xT(){return Um()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bm="firebaseLocalStorageDb",PT=1,ku="firebaseLocalStorage",qm="fbase_key";class Ti{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ho(t,e){return t.transaction([ku],e?"readwrite":"readonly").objectStore(ku)}function VT(){const t=indexedDB.deleteDatabase(Bm);return new Ti(t).toPromise()}function Ua(){const t=indexedDB.open(Bm,PT);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(ku,{keyPath:qm})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(ku)?e(r):(r.close(),await VT(),e(await Ua()))})})}async function Qf(t,e,n){const r=ho(t,!0).put({[qm]:e,value:n});return new Ti(r).toPromise()}async function NT(t,e){const n=ho(t,!1).get(e),r=await new Ti(n).toPromise();return r===void 0?null:r.value}function Jf(t,e){const n=ho(t,!0).delete(e);return new Ti(n).toPromise()}const kT=800,FT=3;class jm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ua(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>FT)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Um()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=lo._getInstance(xT()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await RT(),!this.activeServiceWorker)return;this.sender=new CT(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||DT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ua();return await Qf(e,Nu,"1"),await Jf(e,Nu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Qf(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>NT(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Jf(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ho(s,!1).getAll();return new Ti(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),kT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}jm.type="LOCAL";const OT=jm;new bi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MT(t,e){return e?un(e):(ne(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc extends Vm{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Gr(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Gr(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Gr(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function LT(t){return bT(t.auth,new Xc(t),t.bypassAuthState)}function UT(t){const{auth:e,user:n}=t;return ne(n,e,"internal-error"),yT(n,new Xc(t),t.bypassAuthState)}async function BT(t){const{auth:e,user:n}=t;return ne(n,e,"internal-error"),_T(n,new Xc(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $m{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return LT;case"linkViaPopup":case"linkViaRedirect":return BT;case"reauthViaPopup":case"reauthViaRedirect":return UT;default:dn(this.auth,"internal-error")}}resolve(e){pn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){pn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qT=new bi(2e3,1e4);class Fr extends $m{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Fr.currentPopupAction&&Fr.currentPopupAction.cancel(),Fr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ne(e,this.auth,"internal-error"),e}async onExecution(){pn(this.filter.length===1,"Popup operations only handle one event");const e=Jc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Ht(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Ht(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Fr.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ht(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,qT.get())};e()}}Fr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jT="pendingRedirect",uu=new Map;class $T extends $m{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=uu.get(this.auth._key());if(!e){try{const r=await zT(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}uu.set(this.auth._key(),e)}return this.bypassAuthState||uu.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function zT(t,e){const n=GT(e),r=WT(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function HT(t,e){uu.set(t._key(),e)}function WT(t){return un(t._redirectPersistence)}function GT(t){return iu(jT,t.config.apiKey,t.name)}async function KT(t,e,n=!1){if(St(t.app))return Promise.reject(Ln(t));const r=co(t),s=MT(r,e),o=await new $T(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QT=600*1e3;class JT{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!XT(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!zm(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";n.onError(Ht(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=QT&&this.cachedEventUids.clear(),this.cachedEventUids.has(Xf(e))}saveEventToCache(e){this.cachedEventUids.add(Xf(e)),this.lastProcessedEventTime=Date.now()}}function Xf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function zm({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function XT(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return zm(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YT(t,e={}){return cs(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,e4=/^https?/;async function t4(t){if(t.config.emulator)return;const{authorizedDomains:e}=await YT(t);for(const n of e)try{if(n4(n))return}catch{}dn(t,"unauthorized-domain")}function n4(t){const e=Ma(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!e4.test(n))return!1;if(ZT.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r4=new bi(3e4,6e4);function Yf(){const t=Wt().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function s4(t){return new Promise((e,n)=>{function r(){Yf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Yf(),n(Ht(t,"network-request-failed"))},timeout:r4.get()})}if(Wt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Wt().gapi?.load)r();else{const s=cT("iframefcb");return Wt()[s]=()=>{gapi.load?r():n(Ht(t,"network-request-failed"))},oT(`${aT()}?onload=${s}`).catch(i=>n(i))}}).catch(e=>{throw ou=null,e})}let ou=null;function i4(t){return ou=ou||s4(t),ou}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u4=new bi(5e3,15e3),o4="__/auth/iframe",a4="emulator/auth/iframe",c4={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},l4=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function h4(t){const e=t.config;ne(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Wc(e,a4):`https://${t.config.authDomain}/${o4}`,r={apiKey:e.apiKey,appName:t.name,v:rs},s=l4.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${di(r).slice(1)}`}async function f4(t){const e=await i4(t),n=Wt().gapi;return ne(n,t,"internal-error"),e.open({where:document.body,url:h4(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:c4,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Ht(t,"network-request-failed"),a=Wt().setTimeout(()=>{i(o)},u4.get());function c(){Wt().clearTimeout(a),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d4={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},p4=500,m4=600,g4="_blank",_4="http://localhost";class Zf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function y4(t,e,n,r=p4,s=m4){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...d4,width:r.toString(),height:s.toString(),top:i,left:o},h=it().toLowerCase();n&&(a=wm(h)?g4:n),vm(h)&&(e=e||_4,c.scrollbars="yes");const d=Object.entries(c).reduce((_,[A,D])=>`${_}${A}=${D},`,"");if(Z6(h)&&a!=="_self")return b4(e||"",a),new Zf(null);const m=window.open(e||"",a,d);ne(m,t,"popup-blocked");try{m.focus()}catch{}return new Zf(m)}function b4(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E4="__/auth/handler",T4="emulator/auth/handler",v4=encodeURIComponent("fac");async function ed(t,e,n,r,s,i){ne(t.config.authDomain,t,"auth-domain-config-required"),ne(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:rs,eventId:s};if(e instanceof Nm){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",ay(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,m]of Object.entries({}))o[d]=m}if(e instanceof Ei){const d=e.getScopes().filter(m=>m!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const c=await t._getAppCheckToken(),h=c?`#${v4}=${encodeURIComponent(c)}`:"";return`${I4(t)}?${di(a).slice(1)}${h}`}function I4({config:t}){return t.emulator?Wc(t,T4):`https://${t.authDomain}/${E4}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ea="webStorageSupport";class w4{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Lm,this._completeRedirectFn=KT,this._overrideRedirectResult=HT}async _openPopup(e,n,r,s){pn(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await ed(e,n,r,Ma(),s);return y4(e,i,Jc())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await ed(e,n,r,Ma(),s);return ST(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(pn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await f4(e),r=new JT(e);return n.register("authEvent",s=>(ne(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(ea,{type:ea},s=>{const i=s?.[0]?.[ea];i!==void 0&&n(!!i),dn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=t4(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Dm()||Im()||Kc()}}const A4=w4;var td="@firebase/auth",nd="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C4{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){ne(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S4(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function R4(t){Qr(new pr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;ne(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:xm(t)},h=new iT(r,s,i,c);return hT(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Qr(new pr("auth-internal",e=>{const n=co(e.getProvider("auth").getImmediate());return(r=>new C4(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),lr(td,nd,S4(t)),lr(td,nd,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D4=300,x4=D0("authIdTokenMaxAge")||D4;let rd=null;const P4=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>x4)return;const s=n?.token;rd!==s&&(rd=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function uv(t=k0()){const e=ac(t,"auth");if(e.isInitialized())return e.getImmediate();const n=lT(t,{popupRedirectResolver:A4,persistence:[OT,wT,Lm]}),r=D0("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=P4(i.toString());TT(n,o,()=>o(n.currentUser)),ET(n,a=>o(a))}}const s=S0("auth");return s&&fT(n,`http://${s}`),n}function V4(){return document.getElementsByTagName("head")?.[0]??document}uT({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=Ht("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",V4().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});R4("Browser");export{X4 as A,Y4 as B,tv as C,O4 as D,M4 as E,k4 as F,i0 as G,U4 as H,q4 as I,wg as J,L4 as K,wt as L,Qg as M,tn as N,F4 as O,f0 as P,r_ as Q,B4 as R,Ha as S,Y1 as T,ev as U,Z4 as V,E6 as W,j4 as X,t2 as a,Z_ as b,Hu as c,H4 as d,Wu as e,z_ as f,k0 as g,G4 as h,lb as i,J4 as j,uv as k,wT as l,$4 as m,zf as n,rv as o,W4 as p,iv as q,lr as r,sv as s,nv as t,z4 as u,N4 as v,Fo as w,p_ as x,d1 as y,Q4 as z};
//# sourceMappingURL=vendor-B0cdf9Ys.js.map
