/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Zo(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Te={},gr=[],Ot=()=>{},Hh=()=>!1,Zi=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),ea=t=>t.startsWith("onUpdate:"),at=Object.assign,ta=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Sp=Object.prototype.hasOwnProperty,_e=(t,e)=>Sp.call(t,e),re=Array.isArray,_r=t=>eu(t)==="[object Map]",Kh=t=>eu(t)==="[object Set]",ue=t=>typeof t=="function",Fe=t=>typeof t=="string",Nn=t=>typeof t=="symbol",xe=t=>t!==null&&typeof t=="object",Gh=t=>(xe(t)||ue(t))&&ue(t.then)&&ue(t.catch),Wh=Object.prototype.toString,eu=t=>Wh.call(t),Dp=t=>eu(t).slice(8,-1),Qh=t=>eu(t)==="[object Object]",na=t=>Fe(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,us=Zo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),tu=t=>{const e=Object.create(null);return(n=>e[n]||(e[n]=t(n)))},Rp=/-\w/g,wn=tu(t=>t.replace(Rp,e=>e.slice(1).toUpperCase())),Pp=/\B([A-Z])/g,Zn=tu(t=>t.replace(Pp,"-$1").toLowerCase()),Xh=tu(t=>t.charAt(0).toUpperCase()+t.slice(1)),zu=tu(t=>t?`on${Xh(t)}`:""),En=(t,e)=>!Object.is(t,e),_i=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},Jh=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},_o=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Hc;const nu=()=>Hc||(Hc=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ra(t){if(re(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=Fe(r)?kp(r):ra(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(Fe(t)||xe(t))return t}const Vp=/;(?![^(]*\))/g,Fp=/:([^]+)/,Np=/\/\*[^]*?\*\//g;function kp(t){const e={};return t.replace(Np,"").split(Vp).forEach(n=>{if(n){const r=n.split(Fp);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function sa(t){let e="";if(Fe(t))e=t;else if(re(t))for(let n=0;n<t.length;n++){const r=sa(t[n]);r&&(e+=r+" ")}else if(xe(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Op="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Mp=Zo(Op);function Yh(t){return!!t||t===""}const Zh=t=>!!(t&&t.__v_isRef===!0),Lp=t=>Fe(t)?t:t==null?"":re(t)||xe(t)&&(t.toString===Wh||!ue(t.toString))?Zh(t)?Lp(t.value):JSON.stringify(t,ef,2):String(t),ef=(t,e)=>Zh(e)?ef(t,e.value):_r(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[$u(r,i)+" =>"]=s,n),{})}:Kh(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>$u(n))}:Nn(e)?$u(e):xe(e)&&!re(e)&&!Qh(e)?String(e):e,$u=(t,e="")=>{var n;return Nn(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ct;class Up{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=ct,!e&&ct&&(this.index=(ct.scopes||(ct.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=ct;try{return ct=this,e()}finally{ct=n}}}on(){++this._on===1&&(this.prevScope=ct,ct=this)}off(){this._on>0&&--this._on===0&&(ct=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Bp(){return ct}let ve;const Hu=new WeakSet;class tf{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ct&&ct.active&&ct.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Hu.has(this)&&(Hu.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||rf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Kc(this),sf(this);const e=ve,n=Ct;ve=this,Ct=!0;try{return this.fn()}finally{uf(this),ve=e,Ct=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)oa(e);this.deps=this.depsTail=void 0,Kc(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Hu.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){yo(this)&&this.run()}get dirty(){return yo(this)}}let nf=0,os,as;function rf(t,e=!1){if(t.flags|=8,e){t.next=as,as=t;return}t.next=os,os=t}function ia(){nf++}function ua(){if(--nf>0)return;if(as){let e=as;for(as=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;os;){let e=os;for(os=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function sf(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function uf(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),oa(r),qp(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function yo(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(of(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function of(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===bs)||(t.globalVersion=bs,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!yo(t))))return;t.flags|=2;const e=t.dep,n=ve,r=Ct;ve=t,Ct=!0;try{sf(t);const s=t.fn(t._value);(e.version===0||En(s,t._value))&&(t.flags|=128,t._value=s,e.version++)}catch(s){throw e.version++,s}finally{ve=n,Ct=r,uf(t),t.flags&=-3}}function oa(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)oa(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function qp(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Ct=!0;const af=[];function tn(){af.push(Ct),Ct=!1}function nn(){const t=af.pop();Ct=t===void 0?!0:t}function Kc(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=ve;ve=void 0;try{e()}finally{ve=n}}}let bs=0;class jp{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class aa{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!ve||!Ct||ve===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==ve)n=this.activeLink=new jp(ve,this),ve.deps?(n.prevDep=ve.depsTail,ve.depsTail.nextDep=n,ve.depsTail=n):ve.deps=ve.depsTail=n,cf(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=ve.depsTail,n.nextDep=void 0,ve.depsTail.nextDep=n,ve.depsTail=n,ve.deps===n&&(ve.deps=r)}return n}trigger(e){this.version++,bs++,this.notify(e)}notify(e){ia();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{ua()}}}function cf(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)cf(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const bo=new WeakMap,Qn=Symbol(""),Eo=Symbol(""),Es=Symbol("");function et(t,e,n){if(Ct&&ve){let r=bo.get(t);r||bo.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new aa),s.map=r,s.key=n),s.track()}}function Yt(t,e,n,r,s,i){const o=bo.get(t);if(!o){bs++;return}const a=l=>{l&&l.trigger()};if(ia(),e==="clear")o.forEach(a);else{const l=re(t),h=l&&na(n);if(l&&n==="length"){const d=Number(r);o.forEach((m,E)=>{(E==="length"||E===Es||!Nn(E)&&E>=d)&&a(m)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),h&&a(o.get(Es)),e){case"add":l?h&&a(o.get("length")):(a(o.get(Qn)),_r(t)&&a(o.get(Eo)));break;case"delete":l||(a(o.get(Qn)),_r(t)&&a(o.get(Eo)));break;case"set":_r(t)&&a(o.get(Qn));break}}ua()}function cr(t){const e=ge(t);return e===t?e:(et(e,"iterate",Es),Tt(t)?e:e.map(Ge))}function ru(t){return et(t=ge(t),"iterate",Es),t}const zp={__proto__:null,[Symbol.iterator](){return Ku(this,Symbol.iterator,Ge)},concat(...t){return cr(this).concat(...t.map(e=>re(e)?cr(e):e))},entries(){return Ku(this,"entries",t=>(t[1]=Ge(t[1]),t))},every(t,e){return Qt(this,"every",t,e,void 0,arguments)},filter(t,e){return Qt(this,"filter",t,e,n=>n.map(Ge),arguments)},find(t,e){return Qt(this,"find",t,e,Ge,arguments)},findIndex(t,e){return Qt(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return Qt(this,"findLast",t,e,Ge,arguments)},findLastIndex(t,e){return Qt(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return Qt(this,"forEach",t,e,void 0,arguments)},includes(...t){return Gu(this,"includes",t)},indexOf(...t){return Gu(this,"indexOf",t)},join(t){return cr(this).join(t)},lastIndexOf(...t){return Gu(this,"lastIndexOf",t)},map(t,e){return Qt(this,"map",t,e,void 0,arguments)},pop(){return es(this,"pop")},push(...t){return es(this,"push",t)},reduce(t,...e){return Gc(this,"reduce",t,e)},reduceRight(t,...e){return Gc(this,"reduceRight",t,e)},shift(){return es(this,"shift")},some(t,e){return Qt(this,"some",t,e,void 0,arguments)},splice(...t){return es(this,"splice",t)},toReversed(){return cr(this).toReversed()},toSorted(t){return cr(this).toSorted(t)},toSpliced(...t){return cr(this).toSpliced(...t)},unshift(...t){return es(this,"unshift",t)},values(){return Ku(this,"values",Ge)}};function Ku(t,e,n){const r=ru(t),s=r[e]();return r!==t&&!Tt(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=n(i.value)),i}),s}const $p=Array.prototype;function Qt(t,e,n,r,s,i){const o=ru(t),a=o!==t&&!Tt(t),l=o[e];if(l!==$p[e]){const m=l.apply(t,i);return a?Ge(m):m}let h=n;o!==t&&(a?h=function(m,E){return n.call(this,Ge(m),E,t)}:n.length>2&&(h=function(m,E){return n.call(this,m,E,t)}));const d=l.call(o,h,r);return a&&s?s(d):d}function Gc(t,e,n,r){const s=ru(t);let i=n;return s!==t&&(Tt(t)?n.length>3&&(i=function(o,a,l){return n.call(this,o,a,l,t)}):i=function(o,a,l){return n.call(this,o,Ge(a),l,t)}),s[e](i,...r)}function Gu(t,e,n){const r=ge(t);et(r,"iterate",Es);const s=r[e](...n);return(s===-1||s===!1)&&fa(n[0])?(n[0]=ge(n[0]),r[e](...n)):s}function es(t,e,n=[]){tn(),ia();const r=ge(t)[e].apply(t,n);return ua(),nn(),r}const Hp=Zo("__proto__,__v_isRef,__isVue"),lf=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Nn));function Kp(t){Nn(t)||(t=String(t));const e=ge(this);return et(e,"has",t),e.hasOwnProperty(t)}class hf{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?nm:mf:i?pf:df).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=re(e);if(!s){let l;if(o&&(l=zp[n]))return l;if(n==="hasOwnProperty")return Kp}const a=Reflect.get(e,n,rt(e)?e:r);return(Nn(n)?lf.has(n):Hp(n))||(s||et(e,"get",n),i)?a:rt(a)?o&&na(n)?a:a.value:xe(a)?s?gf(a):la(a):a}}class ff extends hf{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];if(!this._isShallow){const l=In(i);if(!Tt(r)&&!In(r)&&(i=ge(i),r=ge(r)),!re(e)&&rt(i)&&!rt(r))return l||(i.value=r),!0}const o=re(e)&&na(n)?Number(n)<e.length:_e(e,n),a=Reflect.set(e,n,r,rt(e)?e:s);return e===ge(s)&&(o?En(r,i)&&Yt(e,"set",n,r):Yt(e,"add",n,r)),a}deleteProperty(e,n){const r=_e(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&Yt(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!Nn(n)||!lf.has(n))&&et(e,"has",n),r}ownKeys(e){return et(e,"iterate",re(e)?"length":Qn),Reflect.ownKeys(e)}}class Gp extends hf{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Wp=new ff,Qp=new Gp,Xp=new ff(!0);const To=t=>t,oi=t=>Reflect.getPrototypeOf(t);function Jp(t,e,n){return function(...r){const s=this.__v_raw,i=ge(s),o=_r(i),a=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,h=s[t](...r),d=n?To:e?Di:Ge;return!e&&et(i,"iterate",l?Eo:Qn),{next(){const{value:m,done:E}=h.next();return E?{value:m,done:E}:{value:a?[d(m[0]),d(m[1])]:d(m),done:E}},[Symbol.iterator](){return this}}}}function ai(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Yp(t,e){const n={get(s){const i=this.__v_raw,o=ge(i),a=ge(s);t||(En(s,a)&&et(o,"get",s),et(o,"get",a));const{has:l}=oi(o),h=e?To:t?Di:Ge;if(l.call(o,s))return h(i.get(s));if(l.call(o,a))return h(i.get(a));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!t&&et(ge(s),"iterate",Qn),s.size},has(s){const i=this.__v_raw,o=ge(i),a=ge(s);return t||(En(s,a)&&et(o,"has",s),et(o,"has",a)),s===a?i.has(s):i.has(s)||i.has(a)},forEach(s,i){const o=this,a=o.__v_raw,l=ge(a),h=e?To:t?Di:Ge;return!t&&et(l,"iterate",Qn),a.forEach((d,m)=>s.call(i,h(d),h(m),o))}};return at(n,t?{add:ai("add"),set:ai("set"),delete:ai("delete"),clear:ai("clear")}:{add(s){!e&&!Tt(s)&&!In(s)&&(s=ge(s));const i=ge(this);return oi(i).has.call(i,s)||(i.add(s),Yt(i,"add",s,s)),this},set(s,i){!e&&!Tt(i)&&!In(i)&&(i=ge(i));const o=ge(this),{has:a,get:l}=oi(o);let h=a.call(o,s);h||(s=ge(s),h=a.call(o,s));const d=l.call(o,s);return o.set(s,i),h?En(i,d)&&Yt(o,"set",s,i):Yt(o,"add",s,i),this},delete(s){const i=ge(this),{has:o,get:a}=oi(i);let l=o.call(i,s);l||(s=ge(s),l=o.call(i,s)),a&&a.call(i,s);const h=i.delete(s);return l&&Yt(i,"delete",s,void 0),h},clear(){const s=ge(this),i=s.size!==0,o=s.clear();return i&&Yt(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=Jp(s,t,e)}),n}function ca(t,e){const n=Yp(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(_e(n,s)&&s in r?n:r,s,i)}const Zp={get:ca(!1,!1)},em={get:ca(!1,!0)},tm={get:ca(!0,!1)};const df=new WeakMap,pf=new WeakMap,mf=new WeakMap,nm=new WeakMap;function rm(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function sm(t){return t.__v_skip||!Object.isExtensible(t)?0:rm(Dp(t))}function la(t){return In(t)?t:ha(t,!1,Wp,Zp,df)}function im(t){return ha(t,!1,Xp,em,pf)}function gf(t){return ha(t,!0,Qp,tm,mf)}function ha(t,e,n,r,s){if(!xe(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=sm(t);if(i===0)return t;const o=s.get(t);if(o)return o;const a=new Proxy(t,i===2?r:n);return s.set(t,a),a}function yr(t){return In(t)?yr(t.__v_raw):!!(t&&t.__v_isReactive)}function In(t){return!!(t&&t.__v_isReadonly)}function Tt(t){return!!(t&&t.__v_isShallow)}function fa(t){return t?!!t.__v_raw:!1}function ge(t){const e=t&&t.__v_raw;return e?ge(e):t}function um(t){return!_e(t,"__v_skip")&&Object.isExtensible(t)&&Jh(t,"__v_skip",!0),t}const Ge=t=>xe(t)?la(t):t,Di=t=>xe(t)?gf(t):t;function rt(t){return t?t.__v_isRef===!0:!1}function I6(t){return om(t,!1)}function om(t,e){return rt(t)?t:new am(t,e)}class am{constructor(e,n){this.dep=new aa,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:ge(e),this._value=n?e:Ge(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||Tt(e)||In(e);e=r?e:ge(e),En(e,n)&&(this._rawValue=e,this._value=r?e:Ge(e),this.dep.trigger())}}function cm(t){return rt(t)?t.value:t}const lm={get:(t,e,n)=>e==="__v_raw"?t:cm(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return rt(s)&&!rt(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function _f(t){return yr(t)?t:new Proxy(t,lm)}class hm{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new aa(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=bs-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&ve!==this)return rf(this,!0),!0}get value(){const e=this.dep.track();return of(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function fm(t,e,n=!1){let r,s;return ue(t)?r=t:(r=t.get,s=t.set),new hm(r,s,n)}const ci={},Ri=new WeakMap;let Hn;function dm(t,e=!1,n=Hn){if(n){let r=Ri.get(n);r||Ri.set(n,r=[]),r.push(t)}}function pm(t,e,n=Te){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:a,call:l}=n,h=K=>s?K:Tt(K)||s===!1||s===0?Zt(K,1):Zt(K);let d,m,E,x,R=!1,k=!1;if(rt(t)?(m=()=>t.value,R=Tt(t)):yr(t)?(m=()=>h(t),R=!0):re(t)?(k=!0,R=t.some(K=>yr(K)||Tt(K)),m=()=>t.map(K=>{if(rt(K))return K.value;if(yr(K))return h(K);if(ue(K))return l?l(K,2):K()})):ue(t)?e?m=l?()=>l(t,2):t:m=()=>{if(E){tn();try{E()}finally{nn()}}const K=Hn;Hn=d;try{return l?l(t,3,[x]):t(x)}finally{Hn=K}}:m=Ot,e&&s){const K=m,le=s===!0?1/0:s;m=()=>Zt(K(),le)}const L=Bp(),$=()=>{d.stop(),L&&L.active&&ta(L.effects,d)};if(i&&e){const K=e;e=(...le)=>{K(...le),$()}}let G=k?new Array(t.length).fill(ci):ci;const W=K=>{if(!(!(d.flags&1)||!d.dirty&&!K))if(e){const le=d.run();if(s||R||(k?le.some((Ae,A)=>En(Ae,G[A])):En(le,G))){E&&E();const Ae=Hn;Hn=d;try{const A=[le,G===ci?void 0:k&&G[0]===ci?[]:G,x];G=le,l?l(e,3,A):e(...A)}finally{Hn=Ae}}}else d.run()};return a&&a(W),d=new tf(m),d.scheduler=o?()=>o(W,!1):W,x=K=>dm(K,!1,d),E=d.onStop=()=>{const K=Ri.get(d);if(K){if(l)l(K,4);else for(const le of K)le();Ri.delete(d)}},e?r?W(!0):G=d.run():o?o(W.bind(null,!0),!0):d.run(),$.pause=d.pause.bind(d),$.resume=d.resume.bind(d),$.stop=$,$}function Zt(t,e=1/0,n){if(e<=0||!xe(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,rt(t))Zt(t.value,e,n);else if(re(t))for(let r=0;r<t.length;r++)Zt(t[r],e,n);else if(Kh(t)||_r(t))t.forEach(r=>{Zt(r,e,n)});else if(Qh(t)){for(const r in t)Zt(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&Zt(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ks(t,e,n,r){try{return r?t(...r):t()}catch(s){su(s,e,n)}}function jt(t,e,n,r){if(ue(t)){const s=ks(t,e,n,r);return s&&Gh(s)&&s.catch(i=>{su(i,e,n)}),s}if(re(t)){const s=[];for(let i=0;i<t.length;i++)s.push(jt(t[i],e,n,r));return s}}function su(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Te;if(e){let a=e.parent;const l=e.proxy,h=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const d=a.ec;if(d){for(let m=0;m<d.length;m++)if(d[m](t,l,h)===!1)return}a=a.parent}if(i){tn(),ks(i,null,10,[t,l,h]),nn();return}}mm(t,n,s,r,o)}function mm(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const ut=[];let Rt=-1;const br=[];let pn=null,lr=0;const yf=Promise.resolve();let Pi=null;function gm(t){const e=Pi||yf;return t?e.then(this?t.bind(this):t):e}function _m(t){let e=Rt+1,n=ut.length;for(;e<n;){const r=e+n>>>1,s=ut[r],i=Ts(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function da(t){if(!(t.flags&1)){const e=Ts(t),n=ut[ut.length-1];!n||!(t.flags&2)&&e>=Ts(n)?ut.push(t):ut.splice(_m(e),0,t),t.flags|=1,bf()}}function bf(){Pi||(Pi=yf.then(Tf))}function ym(t){re(t)?br.push(...t):pn&&t.id===-1?pn.splice(lr+1,0,t):t.flags&1||(br.push(t),t.flags|=1),bf()}function Wc(t,e,n=Rt+1){for(;n<ut.length;n++){const r=ut[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;ut.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Ef(t){if(br.length){const e=[...new Set(br)].sort((n,r)=>Ts(n)-Ts(r));if(br.length=0,pn){pn.push(...e);return}for(pn=e,lr=0;lr<pn.length;lr++){const n=pn[lr];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}pn=null,lr=0}}const Ts=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Tf(t){try{for(Rt=0;Rt<ut.length;Rt++){const e=ut[Rt];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),ks(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Rt<ut.length;Rt++){const e=ut[Rt];e&&(e.flags&=-2)}Rt=-1,ut.length=0,Ef(),Pi=null,(ut.length||br.length)&&Tf()}}let Et=null,vf=null;function Vi(t){const e=Et;return Et=t,vf=t&&t.type.__scopeId||null,e}function bm(t,e=Et,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&sl(-1);const i=Vi(e);let o;try{o=t(...s)}finally{Vi(i),r._d&&sl(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function C6(t,e){if(Et===null)return t;const n=au(Et),r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,o,a,l=Te]=e[s];i&&(ue(i)&&(i={mounted:i,updated:i}),i.deep&&Zt(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:a,modifiers:l}))}return t}function zn(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];i&&(a.oldValue=i[o].value);let l=a.dir[r];l&&(tn(),jt(l,n,8,[t.el,a,t,e]),nn())}}const Em=Symbol("_vte"),Tm=t=>t.__isTeleport,vm=Symbol("_leaveCb");function pa(t,e){t.shapeFlag&6&&t.component?(t.transition=e,pa(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Af(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const Fi=new WeakMap;function cs(t,e,n,r,s=!1){if(re(t)){t.forEach((R,k)=>cs(R,e&&(re(e)?e[k]:e),n,r,s));return}if(ls(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&cs(t,e,n,r.component.subTree);return}const i=r.shapeFlag&4?au(r.component):r.el,o=s?null:i,{i:a,r:l}=t,h=e&&e.r,d=a.refs===Te?a.refs={}:a.refs,m=a.setupState,E=ge(m),x=m===Te?Hh:R=>_e(E,R);if(h!=null&&h!==l){if(Qc(e),Fe(h))d[h]=null,x(h)&&(m[h]=null);else if(rt(h)){h.value=null;const R=e;R.k&&(d[R.k]=null)}}if(ue(l))ks(l,a,12,[o,d]);else{const R=Fe(l),k=rt(l);if(R||k){const L=()=>{if(t.f){const $=R?x(l)?m[l]:d[l]:l.value;if(s)re($)&&ta($,i);else if(re($))$.includes(i)||$.push(i);else if(R)d[l]=[i],x(l)&&(m[l]=d[l]);else{const G=[i];l.value=G,t.k&&(d[t.k]=G)}}else R?(d[l]=o,x(l)&&(m[l]=o)):k&&(l.value=o,t.k&&(d[t.k]=o))};if(o){const $=()=>{L(),Fi.delete(t)};$.id=-1,Fi.set(t,$),pt($,n)}else Qc(t),L()}}}function Qc(t){const e=Fi.get(t);e&&(e.flags|=8,Fi.delete(t))}nu().requestIdleCallback;nu().cancelIdleCallback;const ls=t=>!!t.type.__asyncLoader,wf=t=>t.type.__isKeepAlive;function Am(t,e){If(t,"a",e)}function wm(t,e){If(t,"da",e)}function If(t,e,n=ot){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(iu(e,r,n),n){let s=n.parent;for(;s&&s.parent;)wf(s.parent.vnode)&&Im(r,e,n,s),s=s.parent}}function Im(t,e,n,r){const s=iu(e,t,r,!0);Cf(()=>{ta(r[e],s)},n)}function iu(t,e,n=ot,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{tn();const a=Os(n),l=jt(e,n,t,o);return a(),nn(),l});return r?s.unshift(i):s.push(i),i}}const on=t=>(e,n=ot)=>{(!As||t==="sp")&&iu(t,(...r)=>e(...r),n)},Cm=on("bm"),xm=on("m"),Sm=on("bu"),Dm=on("u"),Rm=on("bum"),Cf=on("um"),Pm=on("sp"),Vm=on("rtg"),Fm=on("rtc");function Nm(t,e=ot){iu("ec",t,e)}const km=Symbol.for("v-ndc");function x6(t,e,n,r){let s;const i=n,o=re(t);if(o||Fe(t)){const a=o&&yr(t);let l=!1,h=!1;a&&(l=!Tt(t),h=In(t),t=ru(t)),s=new Array(t.length);for(let d=0,m=t.length;d<m;d++)s[d]=e(l?h?Di(Ge(t[d])):Ge(t[d]):t[d],d,void 0,i)}else if(typeof t=="number"){s=new Array(t);for(let a=0;a<t;a++)s[a]=e(a+1,a,void 0,i)}else if(xe(t))if(t[Symbol.iterator])s=Array.from(t,(a,l)=>e(a,l,void 0,i));else{const a=Object.keys(t);s=new Array(a.length);for(let l=0,h=a.length;l<h;l++){const d=a[l];s[l]=e(t[d],d,l,i)}}else s=[];return s}const vo=t=>t?Wf(t)?au(t):vo(t.parent):null,hs=at(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>vo(t.parent),$root:t=>vo(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Sf(t),$forceUpdate:t=>t.f||(t.f=()=>{da(t.update)}),$nextTick:t=>t.n||(t.n=gm.bind(t.proxy)),$watch:t=>r1.bind(t)}),Wu=(t,e)=>t!==Te&&!t.__isScriptSetup&&_e(t,e),Om={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:a,appContext:l}=t;let h;if(e[0]!=="$"){const x=o[e];if(x!==void 0)switch(x){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(Wu(r,e))return o[e]=1,r[e];if(s!==Te&&_e(s,e))return o[e]=2,s[e];if((h=t.propsOptions[0])&&_e(h,e))return o[e]=3,i[e];if(n!==Te&&_e(n,e))return o[e]=4,n[e];Ao&&(o[e]=0)}}const d=hs[e];let m,E;if(d)return e==="$attrs"&&et(t.attrs,"get",""),d(t);if((m=a.__cssModules)&&(m=m[e]))return m;if(n!==Te&&_e(n,e))return o[e]=4,n[e];if(E=l.config.globalProperties,_e(E,e))return E[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return Wu(s,e)?(s[e]=n,!0):r!==Te&&_e(r,e)?(r[e]=n,!0):_e(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i,type:o}},a){let l,h;return!!(n[a]||t!==Te&&a[0]!=="$"&&_e(t,a)||Wu(e,a)||(l=i[0])&&_e(l,a)||_e(r,a)||_e(hs,a)||_e(s.config.globalProperties,a)||(h=o.__cssModules)&&h[a])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:_e(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Xc(t){return re(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Ao=!0;function Mm(t){const e=Sf(t),n=t.proxy,r=t.ctx;Ao=!1,e.beforeCreate&&Jc(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:a,provide:l,inject:h,created:d,beforeMount:m,mounted:E,beforeUpdate:x,updated:R,activated:k,deactivated:L,beforeDestroy:$,beforeUnmount:G,destroyed:W,unmounted:K,render:le,renderTracked:Ae,renderTriggered:A,errorCaptured:g,serverPrefetch:b,expose:T,inheritAttrs:w,components:C,directives:y,filters:ft}=e;if(h&&Lm(h,r,null),o)for(const be in o){const de=o[be];ue(de)&&(r[be]=de.bind(n))}if(s){const be=s.call(n,n);xe(be)&&(t.data=la(be))}if(Ao=!0,i)for(const be in i){const de=i[be],At=ue(de)?de.bind(n,n):ue(de.get)?de.get.bind(n,n):Ot,On=!ue(de)&&ue(de.set)?de.set.bind(n):Ot,Ht=S1({get:At,set:On});Object.defineProperty(r,be,{enumerable:!0,configurable:!0,get:()=>Ht.value,set:Ne=>Ht.value=Ne})}if(a)for(const be in a)xf(a[be],r,n,be);if(l){const be=ue(l)?l.call(n):l;Reflect.ownKeys(be).forEach(de=>{$m(de,be[de])})}d&&Jc(d,t,"c");function qe(be,de){re(de)?de.forEach(At=>be(At.bind(n))):de&&be(de.bind(n))}if(qe(Cm,m),qe(xm,E),qe(Sm,x),qe(Dm,R),qe(Am,k),qe(wm,L),qe(Nm,g),qe(Fm,Ae),qe(Vm,A),qe(Rm,G),qe(Cf,K),qe(Pm,b),re(T))if(T.length){const be=t.exposed||(t.exposed={});T.forEach(de=>{Object.defineProperty(be,de,{get:()=>n[de],set:At=>n[de]=At,enumerable:!0})})}else t.exposed||(t.exposed={});le&&t.render===Ot&&(t.render=le),w!=null&&(t.inheritAttrs=w),C&&(t.components=C),y&&(t.directives=y),b&&Af(t)}function Lm(t,e,n=Ot){re(t)&&(t=wo(t));for(const r in t){const s=t[r];let i;xe(s)?"default"in s?i=yi(s.from||r,s.default,!0):i=yi(s.from||r):i=yi(s),rt(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function Jc(t,e,n){jt(re(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function xf(t,e,n,r){let s=r.includes(".")?qf(n,r):()=>n[r];if(Fe(t)){const i=e[t];ue(i)&&Xu(s,i)}else if(ue(t))Xu(s,t.bind(n));else if(xe(t))if(re(t))t.forEach(i=>xf(i,e,n,r));else{const i=ue(t.handler)?t.handler.bind(n):e[t.handler];ue(i)&&Xu(s,i,t)}}function Sf(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,a=i.get(e);let l;return a?l=a:!s.length&&!n&&!r?l=e:(l={},s.length&&s.forEach(h=>Ni(l,h,o,!0)),Ni(l,e,o)),xe(e)&&i.set(e,l),l}function Ni(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&Ni(t,i,n,!0),s&&s.forEach(o=>Ni(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const a=Um[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const Um={data:Yc,props:Zc,emits:Zc,methods:ns,computed:ns,beforeCreate:it,created:it,beforeMount:it,mounted:it,beforeUpdate:it,updated:it,beforeDestroy:it,beforeUnmount:it,destroyed:it,unmounted:it,activated:it,deactivated:it,errorCaptured:it,serverPrefetch:it,components:ns,directives:ns,watch:qm,provide:Yc,inject:Bm};function Yc(t,e){return e?t?function(){return at(ue(t)?t.call(this,this):t,ue(e)?e.call(this,this):e)}:e:t}function Bm(t,e){return ns(wo(t),wo(e))}function wo(t){if(re(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function it(t,e){return t?[...new Set([].concat(t,e))]:e}function ns(t,e){return t?at(Object.create(null),t,e):e}function Zc(t,e){return t?re(t)&&re(e)?[...new Set([...t,...e])]:at(Object.create(null),Xc(t),Xc(e??{})):e}function qm(t,e){if(!t)return e;if(!e)return t;const n=at(Object.create(null),t);for(const r in e)n[r]=it(t[r],e[r]);return n}function Df(){return{app:null,config:{isNativeTag:Hh,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let jm=0;function zm(t,e){return function(r,s=null){ue(r)||(r=at({},r)),s!=null&&!xe(s)&&(s=null);const i=Df(),o=new WeakSet,a=[];let l=!1;const h=i.app={_uid:jm++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:D1,get config(){return i.config},set config(d){},use(d,...m){return o.has(d)||(d&&ue(d.install)?(o.add(d),d.install(h,...m)):ue(d)&&(o.add(d),d(h,...m))),h},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),h},component(d,m){return m?(i.components[d]=m,h):i.components[d]},directive(d,m){return m?(i.directives[d]=m,h):i.directives[d]},mount(d,m,E){if(!l){const x=h._ceVNode||en(r,s);return x.appContext=i,E===!0?E="svg":E===!1&&(E=void 0),t(x,d,E),l=!0,h._container=d,d.__vue_app__=h,au(x.component)}},onUnmount(d){a.push(d)},unmount(){l&&(jt(a,h._instance,16),t(null,h._container),delete h._container.__vue_app__)},provide(d,m){return i.provides[d]=m,h},runWithContext(d){const m=Er;Er=h;try{return d()}finally{Er=m}}};return h}}let Er=null;function $m(t,e){if(ot){let n=ot.provides;const r=ot.parent&&ot.parent.provides;r===n&&(n=ot.provides=Object.create(r)),n[t]=e}}function yi(t,e,n=!1){const r=v1();if(r||Er){let s=Er?Er._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&ue(e)?e.call(r&&r.proxy):e}}const Rf={},Pf=()=>Object.create(Rf),Vf=t=>Object.getPrototypeOf(t)===Rf;function Hm(t,e,n,r=!1){const s={},i=Pf();t.propsDefaults=Object.create(null),Ff(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:im(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function Km(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,a=ge(s),[l]=t.propsOptions;let h=!1;if((r||o>0)&&!(o&16)){if(o&8){const d=t.vnode.dynamicProps;for(let m=0;m<d.length;m++){let E=d[m];if(uu(t.emitsOptions,E))continue;const x=e[E];if(l)if(_e(i,E))x!==i[E]&&(i[E]=x,h=!0);else{const R=wn(E);s[R]=Io(l,a,R,x,t,!1)}else x!==i[E]&&(i[E]=x,h=!0)}}}else{Ff(t,e,s,i)&&(h=!0);let d;for(const m in a)(!e||!_e(e,m)&&((d=Zn(m))===m||!_e(e,d)))&&(l?n&&(n[m]!==void 0||n[d]!==void 0)&&(s[m]=Io(l,a,m,void 0,t,!0)):delete s[m]);if(i!==a)for(const m in i)(!e||!_e(e,m))&&(delete i[m],h=!0)}h&&Yt(t.attrs,"set","")}function Ff(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,a;if(e)for(let l in e){if(us(l))continue;const h=e[l];let d;s&&_e(s,d=wn(l))?!i||!i.includes(d)?n[d]=h:(a||(a={}))[d]=h:uu(t.emitsOptions,l)||(!(l in r)||h!==r[l])&&(r[l]=h,o=!0)}if(i){const l=ge(n),h=a||Te;for(let d=0;d<i.length;d++){const m=i[d];n[m]=Io(s,l,m,h[m],t,!_e(h,m))}}return o}function Io(t,e,n,r,s,i){const o=t[n];if(o!=null){const a=_e(o,"default");if(a&&r===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&ue(l)){const{propsDefaults:h}=s;if(n in h)r=h[n];else{const d=Os(s);r=h[n]=l.call(null,e),d()}}else r=l;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!a?r=!1:o[1]&&(r===""||r===Zn(n))&&(r=!0))}return r}const Gm=new WeakMap;function Nf(t,e,n=!1){const r=n?Gm:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},a=[];let l=!1;if(!ue(t)){const d=m=>{l=!0;const[E,x]=Nf(m,e,!0);at(o,E),x&&a.push(...x)};!n&&e.mixins.length&&e.mixins.forEach(d),t.extends&&d(t.extends),t.mixins&&t.mixins.forEach(d)}if(!i&&!l)return xe(t)&&r.set(t,gr),gr;if(re(i))for(let d=0;d<i.length;d++){const m=wn(i[d]);el(m)&&(o[m]=Te)}else if(i)for(const d in i){const m=wn(d);if(el(m)){const E=i[d],x=o[m]=re(E)||ue(E)?{type:E}:at({},E),R=x.type;let k=!1,L=!0;if(re(R))for(let $=0;$<R.length;++$){const G=R[$],W=ue(G)&&G.name;if(W==="Boolean"){k=!0;break}else W==="String"&&(L=!1)}else k=ue(R)&&R.name==="Boolean";x[0]=k,x[1]=L,(k||_e(x,"default"))&&a.push(m)}}const h=[o,a];return xe(t)&&r.set(t,h),h}function el(t){return t[0]!=="$"&&!us(t)}const ma=t=>t==="_"||t==="_ctx"||t==="$stable",ga=t=>re(t)?t.map(Vt):[Vt(t)],Wm=(t,e,n)=>{if(e._n)return e;const r=bm((...s)=>ga(e(...s)),n);return r._c=!1,r},kf=(t,e,n)=>{const r=t._ctx;for(const s in t){if(ma(s))continue;const i=t[s];if(ue(i))e[s]=Wm(s,i,r);else if(i!=null){const o=ga(i);e[s]=()=>o}}},Of=(t,e)=>{const n=ga(e);t.slots.default=()=>n},Mf=(t,e,n)=>{for(const r in e)(n||!ma(r))&&(t[r]=e[r])},Qm=(t,e,n)=>{const r=t.slots=Pf();if(t.vnode.shapeFlag&32){const s=e._;s?(Mf(r,e,n),n&&Jh(r,"_",s,!0)):kf(e,r)}else e&&Of(t,e)},Xm=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=Te;if(r.shapeFlag&32){const a=e._;a?n&&a===1?i=!1:Mf(s,e,n):(i=!e.$stable,kf(e,s)),o=e}else e&&(Of(t,e),o={default:1});if(i)for(const a in s)!ma(a)&&o[a]==null&&delete s[a]},pt=h1;function Jm(t){return Ym(t)}function Ym(t,e){const n=nu();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:a,createComment:l,setText:h,setElementText:d,parentNode:m,nextSibling:E,setScopeId:x=Ot,insertStaticContent:R}=t,k=(_,v,D,O=null,V=null,F=null,j=void 0,B=null,U=!!v.dynamicChildren)=>{if(_===v)return;_&&!ts(_,v)&&(O=Kt(_),Ne(_,V,F,!0),_=null),v.patchFlag===-2&&(U=!1,v.dynamicChildren=null);const{type:M,ref:J,shapeFlag:z}=v;switch(M){case ou:L(_,v,D,O);break;case Cn:$(_,v,D,O);break;case Ju:_==null&&G(v,D,O,j);break;case Jt:C(_,v,D,O,V,F,j,B,U);break;default:z&1?le(_,v,D,O,V,F,j,B,U):z&6?y(_,v,D,O,V,F,j,B,U):(z&64||z&128)&&M.process(_,v,D,O,V,F,j,B,U,St)}J!=null&&V?cs(J,_&&_.ref,F,v||_,!v):J==null&&_&&_.ref!=null&&cs(_.ref,null,F,_,!0)},L=(_,v,D,O)=>{if(_==null)r(v.el=a(v.children),D,O);else{const V=v.el=_.el;v.children!==_.children&&h(V,v.children)}},$=(_,v,D,O)=>{_==null?r(v.el=l(v.children||""),D,O):v.el=_.el},G=(_,v,D,O)=>{[_.el,_.anchor]=R(_.children,v,D,O,_.el,_.anchor)},W=({el:_,anchor:v},D,O)=>{let V;for(;_&&_!==v;)V=E(_),r(_,D,O),_=V;r(v,D,O)},K=({el:_,anchor:v})=>{let D;for(;_&&_!==v;)D=E(_),s(_),_=D;s(v)},le=(_,v,D,O,V,F,j,B,U)=>{v.type==="svg"?j="svg":v.type==="math"&&(j="mathml"),_==null?Ae(v,D,O,V,F,j,B,U):b(_,v,V,F,j,B,U)},Ae=(_,v,D,O,V,F,j,B)=>{let U,M;const{props:J,shapeFlag:z,transition:Q,dirs:te}=_;if(U=_.el=o(_.type,F,J&&J.is,J),z&8?d(U,_.children):z&16&&g(_.children,U,null,O,V,Qu(_,F),j,B),te&&zn(_,null,O,"created"),A(U,_,_.scopeId,j,O),J){for(const ie in J)ie!=="value"&&!us(ie)&&i(U,ie,null,J[ie],F,O);"value"in J&&i(U,"value",null,J.value,F),(M=J.onVnodeBeforeMount)&&Dt(M,O,_)}te&&zn(_,null,O,"beforeMount");const Z=Zm(V,Q);Z&&Q.beforeEnter(U),r(U,v,D),((M=J&&J.onVnodeMounted)||Z||te)&&pt(()=>{M&&Dt(M,O,_),Z&&Q.enter(U),te&&zn(_,null,O,"mounted")},V)},A=(_,v,D,O,V)=>{if(D&&x(_,D),O)for(let F=0;F<O.length;F++)x(_,O[F]);if(V){let F=V.subTree;if(v===F||zf(F.type)&&(F.ssContent===v||F.ssFallback===v)){const j=V.vnode;A(_,j,j.scopeId,j.slotScopeIds,V.parent)}}},g=(_,v,D,O,V,F,j,B,U=0)=>{for(let M=U;M<_.length;M++){const J=_[M]=B?mn(_[M]):Vt(_[M]);k(null,J,v,D,O,V,F,j,B)}},b=(_,v,D,O,V,F,j)=>{const B=v.el=_.el;let{patchFlag:U,dynamicChildren:M,dirs:J}=v;U|=_.patchFlag&16;const z=_.props||Te,Q=v.props||Te;let te;if(D&&$n(D,!1),(te=Q.onVnodeBeforeUpdate)&&Dt(te,D,v,_),J&&zn(v,_,D,"beforeUpdate"),D&&$n(D,!0),(z.innerHTML&&Q.innerHTML==null||z.textContent&&Q.textContent==null)&&d(B,""),M?T(_.dynamicChildren,M,B,D,O,Qu(v,V),F):j||de(_,v,B,null,D,O,Qu(v,V),F,!1),U>0){if(U&16)w(B,z,Q,D,V);else if(U&2&&z.class!==Q.class&&i(B,"class",null,Q.class,V),U&4&&i(B,"style",z.style,Q.style,V),U&8){const Z=v.dynamicProps;for(let ie=0;ie<Z.length;ie++){const he=Z[ie],je=z[he],ze=Q[he];(ze!==je||he==="value")&&i(B,he,je,ze,V,D)}}U&1&&_.children!==v.children&&d(B,v.children)}else!j&&M==null&&w(B,z,Q,D,V);((te=Q.onVnodeUpdated)||J)&&pt(()=>{te&&Dt(te,D,v,_),J&&zn(v,_,D,"updated")},O)},T=(_,v,D,O,V,F,j)=>{for(let B=0;B<v.length;B++){const U=_[B],M=v[B],J=U.el&&(U.type===Jt||!ts(U,M)||U.shapeFlag&198)?m(U.el):D;k(U,M,J,null,O,V,F,j,!0)}},w=(_,v,D,O,V)=>{if(v!==D){if(v!==Te)for(const F in v)!us(F)&&!(F in D)&&i(_,F,v[F],null,V,O);for(const F in D){if(us(F))continue;const j=D[F],B=v[F];j!==B&&F!=="value"&&i(_,F,B,j,V,O)}"value"in D&&i(_,"value",v.value,D.value,V)}},C=(_,v,D,O,V,F,j,B,U)=>{const M=v.el=_?_.el:a(""),J=v.anchor=_?_.anchor:a("");let{patchFlag:z,dynamicChildren:Q,slotScopeIds:te}=v;te&&(B=B?B.concat(te):te),_==null?(r(M,D,O),r(J,D,O),g(v.children||[],D,J,V,F,j,B,U)):z>0&&z&64&&Q&&_.dynamicChildren?(T(_.dynamicChildren,Q,D,V,F,j,B),(v.key!=null||V&&v===V.subTree)&&Lf(_,v,!0)):de(_,v,D,J,V,F,j,B,U)},y=(_,v,D,O,V,F,j,B,U)=>{v.slotScopeIds=B,_==null?v.shapeFlag&512?V.ctx.activate(v,D,O,j,U):ft(v,D,O,V,F,j,U):an(_,v,U)},ft=(_,v,D,O,V,F,j)=>{const B=_.component=T1(_,O,V);if(wf(_)&&(B.ctx.renderer=St),A1(B,!1,j),B.asyncDep){if(V&&V.registerDep(B,qe,j),!_.el){const U=B.subTree=en(Cn);$(null,U,v,D),_.placeholder=U.el}}else qe(B,_,v,D,V,F,j)},an=(_,v,D)=>{const O=v.component=_.component;if(c1(_,v,D))if(O.asyncDep&&!O.asyncResolved){be(O,v,D);return}else O.next=v,O.update();else v.el=_.el,O.vnode=v},qe=(_,v,D,O,V,F,j)=>{const B=()=>{if(_.isMounted){let{next:z,bu:Q,u:te,parent:Z,vnode:ie}=_;{const Xe=Uf(_);if(Xe){z&&(z.el=ie.el,be(_,z,j)),Xe.asyncDep.then(()=>{_.isUnmounted||B()});return}}let he=z,je;$n(_,!1),z?(z.el=ie.el,be(_,z,j)):z=ie,Q&&_i(Q),(je=z.props&&z.props.onVnodeBeforeUpdate)&&Dt(je,Z,z,ie),$n(_,!0);const ze=nl(_),gt=_.subTree;_.subTree=ze,k(gt,ze,m(gt.el),Kt(gt),_,V,F),z.el=ze.el,he===null&&l1(_,ze.el),te&&pt(te,V),(je=z.props&&z.props.onVnodeUpdated)&&pt(()=>Dt(je,Z,z,ie),V)}else{let z;const{el:Q,props:te}=v,{bm:Z,m:ie,parent:he,root:je,type:ze}=_,gt=ls(v);$n(_,!1),Z&&_i(Z),!gt&&(z=te&&te.onVnodeBeforeMount)&&Dt(z,he,v),$n(_,!0);{je.ce&&je.ce._def.shadowRoot!==!1&&je.ce._injectChildStyle(ze);const Xe=_.subTree=nl(_);k(null,Xe,D,O,_,V,F),v.el=Xe.el}if(ie&&pt(ie,V),!gt&&(z=te&&te.onVnodeMounted)){const Xe=v;pt(()=>Dt(z,he,Xe),V)}(v.shapeFlag&256||he&&ls(he.vnode)&&he.vnode.shapeFlag&256)&&_.a&&pt(_.a,V),_.isMounted=!0,v=D=O=null}};_.scope.on();const U=_.effect=new tf(B);_.scope.off();const M=_.update=U.run.bind(U),J=_.job=U.runIfDirty.bind(U);J.i=_,J.id=_.uid,U.scheduler=()=>da(J),$n(_,!0),M()},be=(_,v,D)=>{v.component=_;const O=_.vnode.props;_.vnode=v,_.next=null,Km(_,v.props,O,D),Xm(_,v.children,D),tn(),Wc(_),nn()},de=(_,v,D,O,V,F,j,B,U=!1)=>{const M=_&&_.children,J=_?_.shapeFlag:0,z=v.children,{patchFlag:Q,shapeFlag:te}=v;if(Q>0){if(Q&128){On(M,z,D,O,V,F,j,B,U);return}else if(Q&256){At(M,z,D,O,V,F,j,B,U);return}}te&8?(J&16&&Ln(M,V,F),z!==M&&d(D,z)):J&16?te&16?On(M,z,D,O,V,F,j,B,U):Ln(M,V,F,!0):(J&8&&d(D,""),te&16&&g(z,D,O,V,F,j,B,U))},At=(_,v,D,O,V,F,j,B,U)=>{_=_||gr,v=v||gr;const M=_.length,J=v.length,z=Math.min(M,J);let Q;for(Q=0;Q<z;Q++){const te=v[Q]=U?mn(v[Q]):Vt(v[Q]);k(_[Q],te,D,null,V,F,j,B,U)}M>J?Ln(_,V,F,!0,!1,z):g(v,D,O,V,F,j,B,U,z)},On=(_,v,D,O,V,F,j,B,U)=>{let M=0;const J=v.length;let z=_.length-1,Q=J-1;for(;M<=z&&M<=Q;){const te=_[M],Z=v[M]=U?mn(v[M]):Vt(v[M]);if(ts(te,Z))k(te,Z,D,null,V,F,j,B,U);else break;M++}for(;M<=z&&M<=Q;){const te=_[z],Z=v[Q]=U?mn(v[Q]):Vt(v[Q]);if(ts(te,Z))k(te,Z,D,null,V,F,j,B,U);else break;z--,Q--}if(M>z){if(M<=Q){const te=Q+1,Z=te<J?v[te].el:O;for(;M<=Q;)k(null,v[M]=U?mn(v[M]):Vt(v[M]),D,Z,V,F,j,B,U),M++}}else if(M>Q)for(;M<=z;)Ne(_[M],V,F,!0),M++;else{const te=M,Z=M,ie=new Map;for(M=Z;M<=Q;M++){const $e=v[M]=U?mn(v[M]):Vt(v[M]);$e.key!=null&&ie.set($e.key,M)}let he,je=0;const ze=Q-Z+1;let gt=!1,Xe=0;const cn=new Array(ze);for(M=0;M<ze;M++)cn[M]=0;for(M=te;M<=z;M++){const $e=_[M];if(je>=ze){Ne($e,V,F,!0);continue}let _t;if($e.key!=null)_t=ie.get($e.key);else for(he=Z;he<=Q;he++)if(cn[he-Z]===0&&ts($e,v[he])){_t=he;break}_t===void 0?Ne($e,V,F,!0):(cn[_t-Z]=M+1,_t>=Xe?Xe=_t:gt=!0,k($e,v[_t],D,null,V,F,j,B,U),je++)}const qr=gt?e1(cn):gr;for(he=qr.length-1,M=ze-1;M>=0;M--){const $e=Z+M,_t=v[$e],Hs=v[$e+1],sr=$e+1<J?Hs.el||Hs.placeholder:O;cn[M]===0?k(null,_t,D,sr,V,F,j,B,U):gt&&(he<0||M!==qr[he]?Ht(_t,D,sr,2):he--)}}},Ht=(_,v,D,O,V=null)=>{const{el:F,type:j,transition:B,children:U,shapeFlag:M}=_;if(M&6){Ht(_.component.subTree,v,D,O);return}if(M&128){_.suspense.move(v,D,O);return}if(M&64){j.move(_,v,D,St);return}if(j===Jt){r(F,v,D);for(let z=0;z<U.length;z++)Ht(U[z],v,D,O);r(_.anchor,v,D);return}if(j===Ju){W(_,v,D);return}if(O!==2&&M&1&&B)if(O===0)B.beforeEnter(F),r(F,v,D),pt(()=>B.enter(F),V);else{const{leave:z,delayLeave:Q,afterLeave:te}=B,Z=()=>{_.ctx.isUnmounted?s(F):r(F,v,D)},ie=()=>{F._isLeaving&&F[vm](!0),z(F,()=>{Z(),te&&te()})};Q?Q(F,Z,ie):ie()}else r(F,v,D)},Ne=(_,v,D,O=!1,V=!1)=>{const{type:F,props:j,ref:B,children:U,dynamicChildren:M,shapeFlag:J,patchFlag:z,dirs:Q,cacheIndex:te}=_;if(z===-2&&(V=!1),B!=null&&(tn(),cs(B,null,D,_,!0),nn()),te!=null&&(v.renderCache[te]=void 0),J&256){v.ctx.deactivate(_);return}const Z=J&1&&Q,ie=!ls(_);let he;if(ie&&(he=j&&j.onVnodeBeforeUnmount)&&Dt(he,v,_),J&6)Mn(_.component,D,O);else{if(J&128){_.suspense.unmount(D,O);return}Z&&zn(_,null,v,"beforeUnmount"),J&64?_.type.remove(_,v,D,St,O):M&&!M.hasOnce&&(F!==Jt||z>0&&z&64)?Ln(M,v,D,!1,!0):(F===Jt&&z&384||!V&&J&16)&&Ln(U,v,D),O&&ke(_)}(ie&&(he=j&&j.onVnodeUnmounted)||Z)&&pt(()=>{he&&Dt(he,v,_),Z&&zn(_,null,v,"unmounted")},D)},ke=_=>{const{type:v,el:D,anchor:O,transition:V}=_;if(v===Jt){Su(D,O);return}if(v===Ju){K(_);return}const F=()=>{s(D),V&&!V.persisted&&V.afterLeave&&V.afterLeave()};if(_.shapeFlag&1&&V&&!V.persisted){const{leave:j,delayLeave:B}=V,U=()=>j(D,F);B?B(_.el,F,U):U()}else F()},Su=(_,v)=>{let D;for(;_!==v;)D=E(_),s(_),_=D;s(v)},Mn=(_,v,D)=>{const{bum:O,scope:V,job:F,subTree:j,um:B,m:U,a:M}=_;tl(U),tl(M),O&&_i(O),V.stop(),F&&(F.flags|=8,Ne(j,_,v,D)),B&&pt(B,v),pt(()=>{_.isUnmounted=!0},v)},Ln=(_,v,D,O=!1,V=!1,F=0)=>{for(let j=F;j<_.length;j++)Ne(_[j],v,D,O,V)},Kt=_=>{if(_.shapeFlag&6)return Kt(_.component.subTree);if(_.shapeFlag&128)return _.suspense.next();const v=E(_.anchor||_.el),D=v&&v[Em];return D?E(D):v};let Ur=!1;const $s=(_,v,D)=>{_==null?v._vnode&&Ne(v._vnode,null,null,!0):k(v._vnode||null,_,v,null,null,null,D),v._vnode=_,Ur||(Ur=!0,Wc(),Ef(),Ur=!1)},St={p:k,um:Ne,m:Ht,r:ke,mt:ft,mc:g,pc:de,pbc:T,n:Kt,o:t};return{render:$s,hydrate:void 0,createApp:zm($s)}}function Qu({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function $n({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Zm(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Lf(t,e,n=!1){const r=t.children,s=e.children;if(re(r)&&re(s))for(let i=0;i<r.length;i++){const o=r[i];let a=s[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[i]=mn(s[i]),a.el=o.el),!n&&a.patchFlag!==-2&&Lf(o,a)),a.type===ou&&a.patchFlag!==-1&&(a.el=o.el),a.type===Cn&&!a.el&&(a.el=o.el)}}function e1(t){const e=t.slice(),n=[0];let r,s,i,o,a;const l=t.length;for(r=0;r<l;r++){const h=t[r];if(h!==0){if(s=n[n.length-1],t[s]<h){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,t[n[a]]<h?i=a+1:o=a;h<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function Uf(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Uf(e)}function tl(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const t1=Symbol.for("v-scx"),n1=()=>yi(t1);function Xu(t,e,n){return Bf(t,e,n)}function Bf(t,e,n=Te){const{immediate:r,deep:s,flush:i,once:o}=n,a=at({},n),l=e&&r||!e&&i!=="post";let h;if(As){if(i==="sync"){const x=n1();h=x.__watcherHandles||(x.__watcherHandles=[])}else if(!l){const x=()=>{};return x.stop=Ot,x.resume=Ot,x.pause=Ot,x}}const d=ot;a.call=(x,R,k)=>jt(x,d,R,k);let m=!1;i==="post"?a.scheduler=x=>{pt(x,d&&d.suspense)}:i!=="sync"&&(m=!0,a.scheduler=(x,R)=>{R?x():da(x)}),a.augmentJob=x=>{e&&(x.flags|=4),m&&(x.flags|=2,d&&(x.id=d.uid,x.i=d))};const E=pm(t,e,a);return As&&(h?h.push(E):l&&E()),E}function r1(t,e,n){const r=this.proxy,s=Fe(t)?t.includes(".")?qf(r,t):()=>r[t]:t.bind(r,r);let i;ue(e)?i=e:(i=e.handler,n=e);const o=Os(this),a=Bf(s,i.bind(r),n);return o(),a}function qf(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const s1=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${wn(e)}Modifiers`]||t[`${Zn(e)}Modifiers`];function i1(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Te;let s=n;const i=e.startsWith("update:"),o=i&&s1(r,e.slice(7));o&&(o.trim&&(s=n.map(d=>Fe(d)?d.trim():d)),o.number&&(s=n.map(_o)));let a,l=r[a=zu(e)]||r[a=zu(wn(e))];!l&&i&&(l=r[a=zu(Zn(e))]),l&&jt(l,t,6,s);const h=r[a+"Once"];if(h){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,jt(h,t,6,s)}}const u1=new WeakMap;function jf(t,e,n=!1){const r=n?u1:e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},a=!1;if(!ue(t)){const l=h=>{const d=jf(h,e,!0);d&&(a=!0,at(o,d))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!a?(xe(t)&&r.set(t,null),null):(re(i)?i.forEach(l=>o[l]=null):at(o,i),xe(t)&&r.set(t,o),o)}function uu(t,e){return!t||!Zi(e)?!1:(e=e.slice(2).replace(/Once$/,""),_e(t,e[0].toLowerCase()+e.slice(1))||_e(t,Zn(e))||_e(t,e))}function nl(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:a,emit:l,render:h,renderCache:d,props:m,data:E,setupState:x,ctx:R,inheritAttrs:k}=t,L=Vi(t);let $,G;try{if(n.shapeFlag&4){const K=s||r,le=K;$=Vt(h.call(le,K,d,m,x,E,R)),G=a}else{const K=e;$=Vt(K.length>1?K(m,{attrs:a,slots:o,emit:l}):K(m,null)),G=e.props?a:o1(a)}}catch(K){fs.length=0,su(K,t,1),$=en(Cn)}let W=$;if(G&&k!==!1){const K=Object.keys(G),{shapeFlag:le}=W;K.length&&le&7&&(i&&K.some(ea)&&(G=a1(G,i)),W=xr(W,G,!1,!0))}return n.dirs&&(W=xr(W,null,!1,!0),W.dirs=W.dirs?W.dirs.concat(n.dirs):n.dirs),n.transition&&pa(W,n.transition),$=W,Vi(L),$}const o1=t=>{let e;for(const n in t)(n==="class"||n==="style"||Zi(n))&&((e||(e={}))[n]=t[n]);return e},a1=(t,e)=>{const n={};for(const r in t)(!ea(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function c1(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:a,patchFlag:l}=e,h=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?rl(r,o,h):!!o;if(l&8){const d=e.dynamicProps;for(let m=0;m<d.length;m++){const E=d[m];if(o[E]!==r[E]&&!uu(h,E))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?rl(r,o,h):!0:!!o;return!1}function rl(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!uu(n,i))return!0}return!1}function l1({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const zf=t=>t.__isSuspense;function h1(t,e){e&&e.pendingBranch?re(t)?e.effects.push(...t):e.effects.push(t):ym(t)}const Jt=Symbol.for("v-fgt"),ou=Symbol.for("v-txt"),Cn=Symbol.for("v-cmt"),Ju=Symbol.for("v-stc"),fs=[];let mt=null;function f1(t=!1){fs.push(mt=t?null:[])}function d1(){fs.pop(),mt=fs[fs.length-1]||null}let vs=1;function sl(t,e=!1){vs+=t,t<0&&mt&&e&&(mt.hasOnce=!0)}function $f(t){return t.dynamicChildren=vs>0?mt||gr:null,d1(),vs>0&&mt&&mt.push(t),t}function S6(t,e,n,r,s,i){return $f(Gf(t,e,n,r,s,i,!0))}function p1(t,e,n,r,s){return $f(en(t,e,n,r,s,!0))}function Hf(t){return t?t.__v_isVNode===!0:!1}function ts(t,e){return t.type===e.type&&t.key===e.key}const Kf=({key:t})=>t??null,bi=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Fe(t)||rt(t)||ue(t)?{i:Et,r:t,k:e,f:!!n}:t:null);function Gf(t,e=null,n=null,r=0,s=null,i=t===Jt?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Kf(e),ref:e&&bi(e),scopeId:vf,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Et};return a?(_a(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=Fe(n)?8:16),vs>0&&!o&&mt&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&mt.push(l),l}const en=m1;function m1(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===km)&&(t=Cn),Hf(t)){const a=xr(t,e,!0);return n&&_a(a,n),vs>0&&!i&&mt&&(a.shapeFlag&6?mt[mt.indexOf(t)]=a:mt.push(a)),a.patchFlag=-2,a}if(x1(t)&&(t=t.__vccOpts),e){e=g1(e);let{class:a,style:l}=e;a&&!Fe(a)&&(e.class=sa(a)),xe(l)&&(fa(l)&&!re(l)&&(l=at({},l)),e.style=ra(l))}const o=Fe(t)?1:zf(t)?128:Tm(t)?64:xe(t)?4:ue(t)?2:0;return Gf(t,e,n,r,s,o,i,!0)}function g1(t){return t?fa(t)||Vf(t)?at({},t):t:null}function xr(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:a,transition:l}=t,h=e?y1(s||{},e):s,d={__v_isVNode:!0,__v_skip:!0,type:t.type,props:h,key:h&&Kf(h),ref:e&&e.ref?n&&i?re(i)?i.concat(bi(e)):[i,bi(e)]:bi(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:a,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Jt?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&xr(t.ssContent),ssFallback:t.ssFallback&&xr(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&r&&pa(d,l.clone(d)),d}function _1(t=" ",e=0){return en(ou,null,t,e)}function D6(t="",e=!1){return e?(f1(),p1(Cn,null,t)):en(Cn,null,t)}function Vt(t){return t==null||typeof t=="boolean"?en(Cn):re(t)?en(Jt,null,t.slice()):Hf(t)?mn(t):en(ou,null,String(t))}function mn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:xr(t)}function _a(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(re(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),_a(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!Vf(e)?e._ctx=Et:s===3&&Et&&(Et.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else ue(e)?(e={default:e,_ctx:Et},n=32):(e=String(e),r&64?(n=16,e=[_1(e)]):n=8);t.children=e,t.shapeFlag|=n}function y1(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=sa([e.class,r.class]));else if(s==="style")e.style=ra([e.style,r.style]);else if(Zi(s)){const i=e[s],o=r[s];o&&i!==o&&!(re(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function Dt(t,e,n,r=null){jt(t,e,7,[n,r])}const b1=Df();let E1=0;function T1(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||b1,i={uid:E1++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Up(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Nf(r,s),emitsOptions:jf(r,s),emit:null,emitted:null,propsDefaults:Te,inheritAttrs:r.inheritAttrs,ctx:Te,data:Te,props:Te,attrs:Te,slots:Te,refs:Te,setupState:Te,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=i1.bind(null,i),t.ce&&t.ce(i),i}let ot=null;const v1=()=>ot||Et;let ki,Co;{const t=nu(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};ki=e("__VUE_INSTANCE_SETTERS__",n=>ot=n),Co=e("__VUE_SSR_SETTERS__",n=>As=n)}const Os=t=>{const e=ot;return ki(t),t.scope.on(),()=>{t.scope.off(),ki(e)}},il=()=>{ot&&ot.scope.off(),ki(null)};function Wf(t){return t.vnode.shapeFlag&4}let As=!1;function A1(t,e=!1,n=!1){e&&Co(e);const{props:r,children:s}=t.vnode,i=Wf(t);Hm(t,r,i,e),Qm(t,s,n||e);const o=i?w1(t,e):void 0;return e&&Co(!1),o}function w1(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Om);const{setup:r}=n;if(r){tn();const s=t.setupContext=r.length>1?C1(t):null,i=Os(t),o=ks(r,t,0,[t.props,s]),a=Gh(o);if(nn(),i(),(a||t.sp)&&!ls(t)&&Af(t),a){if(o.then(il,il),e)return o.then(l=>{ul(t,l)}).catch(l=>{su(l,t,0)});t.asyncDep=o}else ul(t,o)}else Qf(t)}function ul(t,e,n){ue(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:xe(e)&&(t.setupState=_f(e)),Qf(t)}function Qf(t,e,n){const r=t.type;t.render||(t.render=r.render||Ot);{const s=Os(t);tn();try{Mm(t)}finally{nn(),s()}}}const I1={get(t,e){return et(t,"get",""),t[e]}};function C1(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,I1),slots:t.slots,emit:t.emit,expose:e}}function au(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(_f(um(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in hs)return hs[n](t)},has(e,n){return n in e||n in hs}})):t.proxy}function x1(t){return ue(t)&&"__vccOpts"in t}const S1=(t,e)=>fm(t,e,As),D1="3.5.21";/**
* @vue/runtime-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let xo;const ol=typeof window<"u"&&window.trustedTypes;if(ol)try{xo=ol.createPolicy("vue",{createHTML:t=>t})}catch{}const Xf=xo?t=>xo.createHTML(t):t=>t,R1="http://www.w3.org/2000/svg",P1="http://www.w3.org/1998/Math/MathML",Xt=typeof document<"u"?document:null,al=Xt&&Xt.createElement("template"),V1={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?Xt.createElementNS(R1,t):e==="mathml"?Xt.createElementNS(P1,t):n?Xt.createElement(t,{is:n}):Xt.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>Xt.createTextNode(t),createComment:t=>Xt.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Xt.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{al.innerHTML=Xf(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const a=al.content;if(r==="svg"||r==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},F1=Symbol("_vtc");function N1(t,e,n){const r=t[F1];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const cl=Symbol("_vod"),k1=Symbol("_vsh"),O1=Symbol(""),M1=/(?:^|;)\s*display\s*:/;function L1(t,e,n){const r=t.style,s=Fe(n);let i=!1;if(n&&!s){if(e)if(Fe(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&Ei(r,a,"")}else for(const o in e)n[o]==null&&Ei(r,o,"");for(const o in n)o==="display"&&(i=!0),Ei(r,o,n[o])}else if(s){if(e!==n){const o=r[O1];o&&(n+=";"+o),r.cssText=n,i=M1.test(n)}}else e&&t.removeAttribute("style");cl in t&&(t[cl]=i?r.display:"",t[k1]&&(r.display="none"))}const ll=/\s*!important$/;function Ei(t,e,n){if(re(n))n.forEach(r=>Ei(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=U1(t,e);ll.test(n)?t.setProperty(Zn(r),n.replace(ll,""),"important"):t[r]=n}}const hl=["Webkit","Moz","ms"],Yu={};function U1(t,e){const n=Yu[e];if(n)return n;let r=wn(e);if(r!=="filter"&&r in t)return Yu[e]=r;r=Xh(r);for(let s=0;s<hl.length;s++){const i=hl[s]+r;if(i in t)return Yu[e]=i}return e}const fl="http://www.w3.org/1999/xlink";function dl(t,e,n,r,s,i=Mp(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(fl,e.slice(6,e.length)):t.setAttributeNS(fl,e,n):n==null||i&&!Yh(n)?t.removeAttribute(e):t.setAttribute(e,i?"":Nn(n)?String(n):n)}function pl(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?Xf(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const a=typeof t[e];a==="boolean"?n=Yh(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(s||e)}function hr(t,e,n,r){t.addEventListener(e,n,r)}function B1(t,e,n,r){t.removeEventListener(e,n,r)}const ml=Symbol("_vei");function q1(t,e,n,r,s=null){const i=t[ml]||(t[ml]={}),o=i[e];if(r&&o)o.value=r;else{const[a,l]=j1(e);if(r){const h=i[e]=H1(r,s);hr(t,a,h,l)}else o&&(B1(t,a,o,l),i[e]=void 0)}}const gl=/(?:Once|Passive|Capture)$/;function j1(t){let e;if(gl.test(t)){e={};let r;for(;r=t.match(gl);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Zn(t.slice(2)),e]}let Zu=0;const z1=Promise.resolve(),$1=()=>Zu||(z1.then(()=>Zu=0),Zu=Date.now());function H1(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;jt(K1(r,n.value),e,5,[r])};return n.value=t,n.attached=$1(),n}function K1(t,e){if(re(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const _l=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,G1=(t,e,n,r,s,i)=>{const o=s==="svg";e==="class"?N1(t,r,o):e==="style"?L1(t,n,r):Zi(e)?ea(e)||q1(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):W1(t,e,r,o))?(pl(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&dl(t,e,r,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!Fe(r))?pl(t,wn(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),dl(t,e,r,o))};function W1(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&_l(e)&&ue(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return _l(e)&&Fe(n)?!1:e in t}const yl=t=>{const e=t.props["onUpdate:modelValue"]||!1;return re(e)?n=>_i(e,n):e};function Q1(t){t.target.composing=!0}function bl(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const eo=Symbol("_assign"),R6={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[eo]=yl(s);const i=r||s.props&&s.props.type==="number";hr(t,e?"change":"input",o=>{if(o.target.composing)return;let a=t.value;n&&(a=a.trim()),i&&(a=_o(a)),t[eo](a)}),n&&hr(t,"change",()=>{t.value=t.value.trim()}),e||(hr(t,"compositionstart",Q1),hr(t,"compositionend",bl),hr(t,"change",bl))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},o){if(t[eo]=yl(o),t.composing)return;const a=(i||t.type==="number")&&!/^0\d/.test(t.value)?_o(t.value):t.value,l=e??"";a!==l&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||s&&t.value.trim()===l)||(t.value=l))}},X1=["ctrl","shift","alt","meta"],J1={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>X1.some(n=>t[`${n}Key`]&&!e.includes(n))},P6=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=((s,...i)=>{for(let o=0;o<e.length;o++){const a=J1[e[o]];if(a&&a(s,e))return}return t(s,...i)}))},Y1=at({patchProp:G1},V1);let El;function Z1(){return El||(El=Jm(Y1))}const V6=((...t)=>{const e=Z1().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=tg(r);if(!s)return;const i=e._component;!ue(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,eg(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e});function eg(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function tg(t){return Fe(t)?document.querySelector(t):t}const Tl={};function ng(t){let e=Tl[t];if(e)return e;e=Tl[t]=[];for(let n=0;n<128;n++){const r=String.fromCharCode(n);e.push(r)}for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);e[r]="%"+("0"+r.toString(16).toUpperCase()).slice(-2)}return e}function cu(t,e){typeof e!="string"&&(e=cu.defaultChars);const n=ng(e);return t.replace(/(%[a-f0-9]{2})+/gi,function(r){let s="";for(let i=0,o=r.length;i<o;i+=3){const a=parseInt(r.slice(i+1,i+3),16);if(a<128){s+=n[a];continue}if((a&224)===192&&i+3<o){const l=parseInt(r.slice(i+4,i+6),16);if((l&192)===128){const h=a<<6&1984|l&63;h<128?s+="��":s+=String.fromCharCode(h),i+=3;continue}}if((a&240)===224&&i+6<o){const l=parseInt(r.slice(i+4,i+6),16),h=parseInt(r.slice(i+7,i+9),16);if((l&192)===128&&(h&192)===128){const d=a<<12&61440|l<<6&4032|h&63;d<2048||d>=55296&&d<=57343?s+="���":s+=String.fromCharCode(d),i+=6;continue}}if((a&248)===240&&i+9<o){const l=parseInt(r.slice(i+4,i+6),16),h=parseInt(r.slice(i+7,i+9),16),d=parseInt(r.slice(i+10,i+12),16);if((l&192)===128&&(h&192)===128&&(d&192)===128){let m=a<<18&1835008|l<<12&258048|h<<6&4032|d&63;m<65536||m>1114111?s+="����":(m-=65536,s+=String.fromCharCode(55296+(m>>10),56320+(m&1023))),i+=9;continue}}s+="�"}return s})}cu.defaultChars=";/?:@&=+$,#";cu.componentChars="";const vl={};function rg(t){let e=vl[t];if(e)return e;e=vl[t]=[];for(let n=0;n<128;n++){const r=String.fromCharCode(n);/^[0-9a-z]$/i.test(r)?e.push(r):e.push("%"+("0"+n.toString(16).toUpperCase()).slice(-2))}for(let n=0;n<t.length;n++)e[t.charCodeAt(n)]=t[n];return e}function lu(t,e,n){typeof e!="string"&&(n=e,e=lu.defaultChars),typeof n>"u"&&(n=!0);const r=rg(e);let s="";for(let i=0,o=t.length;i<o;i++){const a=t.charCodeAt(i);if(n&&a===37&&i+2<o&&/^[0-9a-f]{2}$/i.test(t.slice(i+1,i+3))){s+=t.slice(i,i+3),i+=2;continue}if(a<128){s+=r[a];continue}if(a>=55296&&a<=57343){if(a>=55296&&a<=56319&&i+1<o){const l=t.charCodeAt(i+1);if(l>=56320&&l<=57343){s+=encodeURIComponent(t[i]+t[i+1]),i++;continue}}s+="%EF%BF%BD";continue}s+=encodeURIComponent(t[i])}return s}lu.defaultChars=";/?:@&=+$,-_.!~*'()#";lu.componentChars="-_.!~*'()";function sg(t){let e="";return e+=t.protocol||"",e+=t.slashes?"//":"",e+=t.auth?t.auth+"@":"",t.hostname&&t.hostname.indexOf(":")!==-1?e+="["+t.hostname+"]":e+=t.hostname||"",e+=t.port?":"+t.port:"",e+=t.pathname||"",e+=t.search||"",e+=t.hash||"",e}function Oi(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const ig=/^([a-z0-9.+-]+:)/i,ug=/:[0-9]*$/,og=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,ag=["<",">",'"',"`"," ","\r",`
`,"	"],cg=["{","}","|","\\","^","`"].concat(ag),lg=["'"].concat(cg),Al=["%","/","?",";","#"].concat(lg),wl=["/","?","#"],hg=255,Il=/^[+a-z0-9A-Z_-]{0,63}$/,fg=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Cl={javascript:!0,"javascript:":!0},xl={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function dg(t,e){if(t&&t instanceof Oi)return t;const n=new Oi;return n.parse(t,e),n}Oi.prototype.parse=function(t,e){let n,r,s,i=t;if(i=i.trim(),!e&&t.split("#").length===1){const h=og.exec(i);if(h)return this.pathname=h[1],h[2]&&(this.search=h[2]),this}let o=ig.exec(i);if(o&&(o=o[0],n=o.toLowerCase(),this.protocol=o,i=i.substr(o.length)),(e||o||i.match(/^\/\/[^@\/]+@[^@\/]+/))&&(s=i.substr(0,2)==="//",s&&!(o&&Cl[o])&&(i=i.substr(2),this.slashes=!0)),!Cl[o]&&(s||o&&!xl[o])){let h=-1;for(let R=0;R<wl.length;R++)r=i.indexOf(wl[R]),r!==-1&&(h===-1||r<h)&&(h=r);let d,m;h===-1?m=i.lastIndexOf("@"):m=i.lastIndexOf("@",h),m!==-1&&(d=i.slice(0,m),i=i.slice(m+1),this.auth=d),h=-1;for(let R=0;R<Al.length;R++)r=i.indexOf(Al[R]),r!==-1&&(h===-1||r<h)&&(h=r);h===-1&&(h=i.length),i[h-1]===":"&&h--;const E=i.slice(0,h);i=i.slice(h),this.parseHost(E),this.hostname=this.hostname||"";const x=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!x){const R=this.hostname.split(/\./);for(let k=0,L=R.length;k<L;k++){const $=R[k];if($&&!$.match(Il)){let G="";for(let W=0,K=$.length;W<K;W++)$.charCodeAt(W)>127?G+="x":G+=$[W];if(!G.match(Il)){const W=R.slice(0,k),K=R.slice(k+1),le=$.match(fg);le&&(W.push(le[1]),K.unshift(le[2])),K.length&&(i=K.join(".")+i),this.hostname=W.join(".");break}}}}this.hostname.length>hg&&(this.hostname=""),x&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const a=i.indexOf("#");a!==-1&&(this.hash=i.substr(a),i=i.slice(0,a));const l=i.indexOf("?");return l!==-1&&(this.search=i.substr(l),i=i.slice(0,l)),i&&(this.pathname=i),xl[n]&&this.hostname&&!this.pathname&&(this.pathname=""),this};Oi.prototype.parseHost=function(t){let e=ug.exec(t);e&&(e=e[0],e!==":"&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)};const F6=Object.freeze(Object.defineProperty({__proto__:null,decode:cu,encode:lu,format:sg,parse:dg},Symbol.toStringTag,{value:"Module"})),Jf=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Yf=/[\0-\x1F\x7F-\x9F]/,pg=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,Zf=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,mg=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,e0=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,N6=Object.freeze(Object.defineProperty({__proto__:null,Any:Jf,Cc:Yf,Cf:pg,P:Zf,S:mg,Z:e0},Symbol.toStringTag,{value:"Module"})),gg=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(t=>t.charCodeAt(0))),_g=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(t=>t.charCodeAt(0)));var to;const yg=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),bg=(to=String.fromCodePoint)!==null&&to!==void 0?to:function(t){let e="";return t>65535&&(t-=65536,e+=String.fromCharCode(t>>>10&1023|55296),t=56320|t&1023),e+=String.fromCharCode(t),e};function Eg(t){var e;return t>=55296&&t<=57343||t>1114111?65533:(e=yg.get(t))!==null&&e!==void 0?e:t}var Be;(function(t){t[t.NUM=35]="NUM",t[t.SEMI=59]="SEMI",t[t.EQUALS=61]="EQUALS",t[t.ZERO=48]="ZERO",t[t.NINE=57]="NINE",t[t.LOWER_A=97]="LOWER_A",t[t.LOWER_F=102]="LOWER_F",t[t.LOWER_X=120]="LOWER_X",t[t.LOWER_Z=122]="LOWER_Z",t[t.UPPER_A=65]="UPPER_A",t[t.UPPER_F=70]="UPPER_F",t[t.UPPER_Z=90]="UPPER_Z"})(Be||(Be={}));const Tg=32;var yn;(function(t){t[t.VALUE_LENGTH=49152]="VALUE_LENGTH",t[t.BRANCH_LENGTH=16256]="BRANCH_LENGTH",t[t.JUMP_TABLE=127]="JUMP_TABLE"})(yn||(yn={}));function So(t){return t>=Be.ZERO&&t<=Be.NINE}function vg(t){return t>=Be.UPPER_A&&t<=Be.UPPER_F||t>=Be.LOWER_A&&t<=Be.LOWER_F}function Ag(t){return t>=Be.UPPER_A&&t<=Be.UPPER_Z||t>=Be.LOWER_A&&t<=Be.LOWER_Z||So(t)}function wg(t){return t===Be.EQUALS||Ag(t)}var Le;(function(t){t[t.EntityStart=0]="EntityStart",t[t.NumericStart=1]="NumericStart",t[t.NumericDecimal=2]="NumericDecimal",t[t.NumericHex=3]="NumericHex",t[t.NamedEntity=4]="NamedEntity"})(Le||(Le={}));var _n;(function(t){t[t.Legacy=0]="Legacy",t[t.Strict=1]="Strict",t[t.Attribute=2]="Attribute"})(_n||(_n={}));class Ig{constructor(e,n,r){this.decodeTree=e,this.emitCodePoint=n,this.errors=r,this.state=Le.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=_n.Strict}startEntity(e){this.decodeMode=e,this.state=Le.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(e,n){switch(this.state){case Le.EntityStart:return e.charCodeAt(n)===Be.NUM?(this.state=Le.NumericStart,this.consumed+=1,this.stateNumericStart(e,n+1)):(this.state=Le.NamedEntity,this.stateNamedEntity(e,n));case Le.NumericStart:return this.stateNumericStart(e,n);case Le.NumericDecimal:return this.stateNumericDecimal(e,n);case Le.NumericHex:return this.stateNumericHex(e,n);case Le.NamedEntity:return this.stateNamedEntity(e,n)}}stateNumericStart(e,n){return n>=e.length?-1:(e.charCodeAt(n)|Tg)===Be.LOWER_X?(this.state=Le.NumericHex,this.consumed+=1,this.stateNumericHex(e,n+1)):(this.state=Le.NumericDecimal,this.stateNumericDecimal(e,n))}addToNumericResult(e,n,r,s){if(n!==r){const i=r-n;this.result=this.result*Math.pow(s,i)+parseInt(e.substr(n,i),s),this.consumed+=i}}stateNumericHex(e,n){const r=n;for(;n<e.length;){const s=e.charCodeAt(n);if(So(s)||vg(s))n+=1;else return this.addToNumericResult(e,r,n,16),this.emitNumericEntity(s,3)}return this.addToNumericResult(e,r,n,16),-1}stateNumericDecimal(e,n){const r=n;for(;n<e.length;){const s=e.charCodeAt(n);if(So(s))n+=1;else return this.addToNumericResult(e,r,n,10),this.emitNumericEntity(s,2)}return this.addToNumericResult(e,r,n,10),-1}emitNumericEntity(e,n){var r;if(this.consumed<=n)return(r=this.errors)===null||r===void 0||r.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(e===Be.SEMI)this.consumed+=1;else if(this.decodeMode===_n.Strict)return 0;return this.emitCodePoint(Eg(this.result),this.consumed),this.errors&&(e!==Be.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(e,n){const{decodeTree:r}=this;let s=r[this.treeIndex],i=(s&yn.VALUE_LENGTH)>>14;for(;n<e.length;n++,this.excess++){const o=e.charCodeAt(n);if(this.treeIndex=Cg(r,s,this.treeIndex+Math.max(1,i),o),this.treeIndex<0)return this.result===0||this.decodeMode===_n.Attribute&&(i===0||wg(o))?0:this.emitNotTerminatedNamedEntity();if(s=r[this.treeIndex],i=(s&yn.VALUE_LENGTH)>>14,i!==0){if(o===Be.SEMI)return this.emitNamedEntityData(this.treeIndex,i,this.consumed+this.excess);this.decodeMode!==_n.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var e;const{result:n,decodeTree:r}=this,s=(r[n]&yn.VALUE_LENGTH)>>14;return this.emitNamedEntityData(n,s,this.consumed),(e=this.errors)===null||e===void 0||e.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(e,n,r){const{decodeTree:s}=this;return this.emitCodePoint(n===1?s[e]&~yn.VALUE_LENGTH:s[e+1],r),n===3&&this.emitCodePoint(s[e+2],r),r}end(){var e;switch(this.state){case Le.NamedEntity:return this.result!==0&&(this.decodeMode!==_n.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case Le.NumericDecimal:return this.emitNumericEntity(0,2);case Le.NumericHex:return this.emitNumericEntity(0,3);case Le.NumericStart:return(e=this.errors)===null||e===void 0||e.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case Le.EntityStart:return 0}}}function t0(t){let e="";const n=new Ig(t,r=>e+=bg(r));return function(s,i){let o=0,a=0;for(;(a=s.indexOf("&",a))>=0;){e+=s.slice(o,a),n.startEntity(i);const h=n.write(s,a+1);if(h<0){o=a+n.end();break}o=a+h,a=h===0?o+1:o}const l=e+s.slice(o);return e="",l}}function Cg(t,e,n,r){const s=(e&yn.BRANCH_LENGTH)>>7,i=e&yn.JUMP_TABLE;if(s===0)return i!==0&&r===i?n:-1;if(i){const l=r-i;return l<0||l>=s?-1:t[n+l]-1}let o=n,a=o+s-1;for(;o<=a;){const l=o+a>>>1,h=t[l];if(h<r)o=l+1;else if(h>r)a=l-1;else return t[l+s]}return-1}const xg=t0(gg);t0(_g);function k6(t,e=_n.Legacy){return xg(t,e)}function Sg(t){const e={};t=t||{},e.src_Any=Jf.source,e.src_Cc=Yf.source,e.src_Z=e0.source,e.src_P=Zf.source,e.src_ZPCc=[e.src_Z,e.src_P,e.src_Cc].join("|"),e.src_ZCc=[e.src_Z,e.src_Cc].join("|");const n="[><｜]";return e.src_pseudo_letter="(?:(?!"+n+"|"+e.src_ZPCc+")"+e.src_Any+")",e.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",e.src_auth="(?:(?:(?!"+e.src_ZCc+"|[@/\\[\\]()]).)+@)?",e.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",e.src_host_terminator="(?=$|"+n+"|"+e.src_ZPCc+")(?!"+(t["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+e.src_ZPCc+"))",e.src_path="(?:[/?#](?:(?!"+e.src_ZCc+"|"+n+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+e.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+e.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+e.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+e.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+e.src_ZCc+"|[']).)+\\'|\\'(?="+e.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+e.src_ZCc+"|[.]|$)|"+(t["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+e.src_ZCc+"|$)|;(?!"+e.src_ZCc+"|$)|\\!+(?!"+e.src_ZCc+"|[!]|$)|\\?(?!"+e.src_ZCc+"|[?]|$))+|\\/)?",e.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',e.src_xn="xn--[a-z0-9\\-]{1,59}",e.src_domain_root="(?:"+e.src_xn+"|"+e.src_pseudo_letter+"{1,63})",e.src_domain="(?:"+e.src_xn+"|(?:"+e.src_pseudo_letter+")|(?:"+e.src_pseudo_letter+"(?:-|"+e.src_pseudo_letter+"){0,61}"+e.src_pseudo_letter+"))",e.src_host="(?:(?:(?:(?:"+e.src_domain+")\\.)*"+e.src_domain+"))",e.tpl_host_fuzzy="(?:"+e.src_ip4+"|(?:(?:(?:"+e.src_domain+")\\.)+(?:%TLDS%)))",e.tpl_host_no_ip_fuzzy="(?:(?:(?:"+e.src_domain+")\\.)+(?:%TLDS%))",e.src_host_strict=e.src_host+e.src_host_terminator,e.tpl_host_fuzzy_strict=e.tpl_host_fuzzy+e.src_host_terminator,e.src_host_port_strict=e.src_host+e.src_port+e.src_host_terminator,e.tpl_host_port_fuzzy_strict=e.tpl_host_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_port_no_ip_fuzzy_strict=e.tpl_host_no_ip_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+e.src_ZPCc+"|>|$))",e.tpl_email_fuzzy="(^|"+n+'|"|\\(|'+e.src_ZCc+")("+e.src_email_name+"@"+e.tpl_host_fuzzy_strict+")",e.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+e.src_ZPCc+"))((?![$+<=>^`|｜])"+e.tpl_host_port_fuzzy_strict+e.src_path+")",e.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+e.src_ZPCc+"))((?![$+<=>^`|｜])"+e.tpl_host_port_no_ip_fuzzy_strict+e.src_path+")",e}function Do(t){return Array.prototype.slice.call(arguments,1).forEach(function(n){n&&Object.keys(n).forEach(function(r){t[r]=n[r]})}),t}function hu(t){return Object.prototype.toString.call(t)}function Dg(t){return hu(t)==="[object String]"}function Rg(t){return hu(t)==="[object Object]"}function Pg(t){return hu(t)==="[object RegExp]"}function Sl(t){return hu(t)==="[object Function]"}function Vg(t){return t.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const n0={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function Fg(t){return Object.keys(t||{}).reduce(function(e,n){return e||n0.hasOwnProperty(n)},!1)}const Ng={"http:":{validate:function(t,e,n){const r=t.slice(e);return n.re.http||(n.re.http=new RegExp("^\\/\\/"+n.re.src_auth+n.re.src_host_port_strict+n.re.src_path,"i")),n.re.http.test(r)?r.match(n.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(t,e,n){const r=t.slice(e);return n.re.no_http||(n.re.no_http=new RegExp("^"+n.re.src_auth+"(?:localhost|(?:(?:"+n.re.src_domain+")\\.)+"+n.re.src_domain_root+")"+n.re.src_port+n.re.src_host_terminator+n.re.src_path,"i")),n.re.no_http.test(r)?e>=3&&t[e-3]===":"||e>=3&&t[e-3]==="/"?0:r.match(n.re.no_http)[0].length:0}},"mailto:":{validate:function(t,e,n){const r=t.slice(e);return n.re.mailto||(n.re.mailto=new RegExp("^"+n.re.src_email_name+"@"+n.re.src_host_strict,"i")),n.re.mailto.test(r)?r.match(n.re.mailto)[0].length:0}}},kg="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",Og="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function Mg(t){t.__index__=-1,t.__text_cache__=""}function Lg(t){return function(e,n){const r=e.slice(n);return t.test(r)?r.match(t)[0].length:0}}function Dl(){return function(t,e){e.normalize(t)}}function Mi(t){const e=t.re=Sg(t.__opts__),n=t.__tlds__.slice();t.onCompile(),t.__tlds_replaced__||n.push(kg),n.push(e.src_xn),e.src_tlds=n.join("|");function r(a){return a.replace("%TLDS%",e.src_tlds)}e.email_fuzzy=RegExp(r(e.tpl_email_fuzzy),"i"),e.link_fuzzy=RegExp(r(e.tpl_link_fuzzy),"i"),e.link_no_ip_fuzzy=RegExp(r(e.tpl_link_no_ip_fuzzy),"i"),e.host_fuzzy_test=RegExp(r(e.tpl_host_fuzzy_test),"i");const s=[];t.__compiled__={};function i(a,l){throw new Error('(LinkifyIt) Invalid schema "'+a+'": '+l)}Object.keys(t.__schemas__).forEach(function(a){const l=t.__schemas__[a];if(l===null)return;const h={validate:null,link:null};if(t.__compiled__[a]=h,Rg(l)){Pg(l.validate)?h.validate=Lg(l.validate):Sl(l.validate)?h.validate=l.validate:i(a,l),Sl(l.normalize)?h.normalize=l.normalize:l.normalize?i(a,l):h.normalize=Dl();return}if(Dg(l)){s.push(a);return}i(a,l)}),s.forEach(function(a){t.__compiled__[t.__schemas__[a]]&&(t.__compiled__[a].validate=t.__compiled__[t.__schemas__[a]].validate,t.__compiled__[a].normalize=t.__compiled__[t.__schemas__[a]].normalize)}),t.__compiled__[""]={validate:null,normalize:Dl()};const o=Object.keys(t.__compiled__).filter(function(a){return a.length>0&&t.__compiled__[a]}).map(Vg).join("|");t.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+e.src_ZPCc+"))("+o+")","i"),t.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+e.src_ZPCc+"))("+o+")","ig"),t.re.schema_at_start=RegExp("^"+t.re.schema_search.source,"i"),t.re.pretest=RegExp("("+t.re.schema_test.source+")|("+t.re.host_fuzzy_test.source+")|@","i"),Mg(t)}function Ug(t,e){const n=t.__index__,r=t.__last_index__,s=t.__text_cache__.slice(n,r);this.schema=t.__schema__.toLowerCase(),this.index=n+e,this.lastIndex=r+e,this.raw=s,this.text=s,this.url=s}function Ro(t,e){const n=new Ug(t,e);return t.__compiled__[n.schema].normalize(n,t),n}function vt(t,e){if(!(this instanceof vt))return new vt(t,e);e||Fg(t)&&(e=t,t={}),this.__opts__=Do({},n0,e),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=Do({},Ng,t),this.__compiled__={},this.__tlds__=Og,this.__tlds_replaced__=!1,this.re={},Mi(this)}vt.prototype.add=function(e,n){return this.__schemas__[e]=n,Mi(this),this};vt.prototype.set=function(e){return this.__opts__=Do(this.__opts__,e),this};vt.prototype.test=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return!1;let n,r,s,i,o,a,l,h,d;if(this.re.schema_test.test(e)){for(l=this.re.schema_search,l.lastIndex=0;(n=l.exec(e))!==null;)if(i=this.testSchemaAt(e,n[2],l.lastIndex),i){this.__schema__=n[2],this.__index__=n.index+n[1].length,this.__last_index__=n.index+n[0].length+i;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(h=e.search(this.re.host_fuzzy_test),h>=0&&(this.__index__<0||h<this.__index__)&&(r=e.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(o=r.index+r[1].length,(this.__index__<0||o<this.__index__)&&(this.__schema__="",this.__index__=o,this.__last_index__=r.index+r[0].length))),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&(d=e.indexOf("@"),d>=0&&(s=e.match(this.re.email_fuzzy))!==null&&(o=s.index+s[1].length,a=s.index+s[0].length,(this.__index__<0||o<this.__index__||o===this.__index__&&a>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=o,this.__last_index__=a))),this.__index__>=0};vt.prototype.pretest=function(e){return this.re.pretest.test(e)};vt.prototype.testSchemaAt=function(e,n,r){return this.__compiled__[n.toLowerCase()]?this.__compiled__[n.toLowerCase()].validate(e,r,this):0};vt.prototype.match=function(e){const n=[];let r=0;this.__index__>=0&&this.__text_cache__===e&&(n.push(Ro(this,r)),r=this.__last_index__);let s=r?e.slice(r):e;for(;this.test(s);)n.push(Ro(this,r)),s=s.slice(this.__last_index__),r+=this.__last_index__;return n.length?n:null};vt.prototype.matchAtStart=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return null;const n=this.re.schema_at_start.exec(e);if(!n)return null;const r=this.testSchemaAt(e,n[2],n[0].length);return r?(this.__schema__=n[2],this.__index__=n.index+n[1].length,this.__last_index__=n.index+n[0].length+r,Ro(this,0)):null};vt.prototype.tlds=function(e,n){return e=Array.isArray(e)?e:[e],n?(this.__tlds__=this.__tlds__.concat(e).sort().filter(function(r,s,i){return r!==i[s-1]}).reverse(),Mi(this),this):(this.__tlds__=e.slice(),this.__tlds_replaced__=!0,Mi(this),this)};vt.prototype.normalize=function(e){e.schema||(e.url="http://"+e.url),e.schema==="mailto:"&&!/^mailto:/i.test(e.url)&&(e.url="mailto:"+e.url)};vt.prototype.onCompile=function(){};const Tr=2147483647,Ft=36,ya=1,ws=26,Bg=38,qg=700,r0=72,s0=128,i0="-",jg=/^xn--/,zg=/[^\0-\x7F]/,$g=/[\x2E\u3002\uFF0E\uFF61]/g,Hg={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},no=Ft-ya,Nt=Math.floor,ro=String.fromCharCode;function gn(t){throw new RangeError(Hg[t])}function Kg(t,e){const n=[];let r=t.length;for(;r--;)n[r]=e(t[r]);return n}function u0(t,e){const n=t.split("@");let r="";n.length>1&&(r=n[0]+"@",t=n[1]),t=t.replace($g,".");const s=t.split("."),i=Kg(s,e).join(".");return r+i}function o0(t){const e=[];let n=0;const r=t.length;for(;n<r;){const s=t.charCodeAt(n++);if(s>=55296&&s<=56319&&n<r){const i=t.charCodeAt(n++);(i&64512)==56320?e.push(((s&1023)<<10)+(i&1023)+65536):(e.push(s),n--)}else e.push(s)}return e}const Gg=t=>String.fromCodePoint(...t),Wg=function(t){return t>=48&&t<58?26+(t-48):t>=65&&t<91?t-65:t>=97&&t<123?t-97:Ft},Rl=function(t,e){return t+22+75*(t<26)-((e!=0)<<5)},a0=function(t,e,n){let r=0;for(t=n?Nt(t/qg):t>>1,t+=Nt(t/e);t>no*ws>>1;r+=Ft)t=Nt(t/no);return Nt(r+(no+1)*t/(t+Bg))},c0=function(t){const e=[],n=t.length;let r=0,s=s0,i=r0,o=t.lastIndexOf(i0);o<0&&(o=0);for(let a=0;a<o;++a)t.charCodeAt(a)>=128&&gn("not-basic"),e.push(t.charCodeAt(a));for(let a=o>0?o+1:0;a<n;){const l=r;for(let d=1,m=Ft;;m+=Ft){a>=n&&gn("invalid-input");const E=Wg(t.charCodeAt(a++));E>=Ft&&gn("invalid-input"),E>Nt((Tr-r)/d)&&gn("overflow"),r+=E*d;const x=m<=i?ya:m>=i+ws?ws:m-i;if(E<x)break;const R=Ft-x;d>Nt(Tr/R)&&gn("overflow"),d*=R}const h=e.length+1;i=a0(r-l,h,l==0),Nt(r/h)>Tr-s&&gn("overflow"),s+=Nt(r/h),r%=h,e.splice(r++,0,s)}return String.fromCodePoint(...e)},l0=function(t){const e=[];t=o0(t);const n=t.length;let r=s0,s=0,i=r0;for(const l of t)l<128&&e.push(ro(l));const o=e.length;let a=o;for(o&&e.push(i0);a<n;){let l=Tr;for(const d of t)d>=r&&d<l&&(l=d);const h=a+1;l-r>Nt((Tr-s)/h)&&gn("overflow"),s+=(l-r)*h,r=l;for(const d of t)if(d<r&&++s>Tr&&gn("overflow"),d===r){let m=s;for(let E=Ft;;E+=Ft){const x=E<=i?ya:E>=i+ws?ws:E-i;if(m<x)break;const R=m-x,k=Ft-x;e.push(ro(Rl(x+R%k,0))),m=Nt(R/k)}e.push(ro(Rl(m,0))),i=a0(s,h,a===o),s=0,++a}++s,++r}return e.join("")},Qg=function(t){return u0(t,function(e){return jg.test(e)?c0(e.slice(4).toLowerCase()):e})},Xg=function(t){return u0(t,function(e){return zg.test(e)?"xn--"+l0(e):e})},O6={version:"2.3.1",ucs2:{decode:o0,encode:Gg},decode:c0,encode:l0,toASCII:Xg,toUnicode:Qg},Jg=()=>{};var Pl={};/**
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
 */const h0=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Yg=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],a=t[n++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},f0={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,a=o?t[s+1]:0,l=s+2<t.length,h=l?t[s+2]:0,d=i>>2,m=(i&3)<<4|a>>4;let E=(a&15)<<2|h>>6,x=h&63;l||(x=64,o||(E=64)),r.push(n[d],n[m],n[E],n[x])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(h0(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Yg(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const m=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||h==null||m==null)throw new Zg;const E=i<<2|a>>4;if(r.push(E),h!==64){const x=a<<4&240|h>>2;if(r.push(x),m!==64){const R=h<<6&192|m;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Zg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const e_=function(t){const e=h0(t);return f0.encodeByteArray(e,!0)},d0=function(t){return e_(t).replace(/\./g,"")},p0=function(t){try{return f0.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function t_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const n_=()=>t_().__FIREBASE_DEFAULTS__,r_=()=>{if(typeof process>"u"||typeof Pl>"u")return;const t=Pl.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},s_=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&p0(t[1]);return e&&JSON.parse(e)},m0=()=>{try{return Jg()||n_()||r_()||s_()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},i_=t=>m0()?.[`_${t}`];/**
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
 */function ba(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}/**
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
 */function xt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function u_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(xt())}function o_(){const t=m0()?.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function a_(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function c_(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function l_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function h_(){return!o_()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function f_(){try{return typeof indexedDB=="object"}catch{return!1}}function d_(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}/**
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
 */const p_="FirebaseError";class kn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=p_,Object.setPrototypeOf(this,kn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ms.prototype.create)}}class Ms{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?m_(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new kn(s,a,r)}}function m_(t,e){return t.replace(g_,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const g_=/\{\$([^}]+)}/g;/**
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
 */function g0(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function __(t,e){const n=new y_(t,e);return n.subscribe.bind(n)}class y_{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");b_(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=so),s.error===void 0&&(s.error=so),s.complete===void 0&&(s.complete=so);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function b_(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function so(){}/**
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
 */function xn(t){return t&&t._delegate?t._delegate:t}class Sr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */var oe;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(oe||(oe={}));const E_={debug:oe.DEBUG,verbose:oe.VERBOSE,info:oe.INFO,warn:oe.WARN,error:oe.ERROR,silent:oe.SILENT},T_=oe.INFO,v_={[oe.DEBUG]:"log",[oe.VERBOSE]:"log",[oe.INFO]:"info",[oe.WARN]:"warn",[oe.ERROR]:"error"},A_=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=v_[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ea{constructor(e){this.name=e,this._logLevel=T_,this._logHandler=A_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in oe))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?E_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,oe.DEBUG,...e),this._logHandler(this,oe.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,oe.VERBOSE,...e),this._logHandler(this,oe.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,oe.INFO,...e),this._logHandler(this,oe.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,oe.WARN,...e),this._logHandler(this,oe.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,oe.ERROR,...e),this._logHandler(this,oe.ERROR,...e)}}const w_=(t,e)=>e.some(n=>t instanceof n);let Vl,Fl;function I_(){return Vl||(Vl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function C_(){return Fl||(Fl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const _0=new WeakMap,Po=new WeakMap,y0=new WeakMap,io=new WeakMap,Ta=new WeakMap;function x_(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Tn(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&_0.set(n,t)}).catch(()=>{}),Ta.set(e,t),e}function S_(t){if(Po.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Po.set(t,e)}let Vo={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Po.get(t);if(e==="objectStoreNames")return t.objectStoreNames||y0.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Tn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function D_(t){Vo=t(Vo)}function R_(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(uo(this),e,...n);return y0.set(r,e.sort?e.sort():[e]),Tn(r)}:C_().includes(t)?function(...e){return t.apply(uo(this),e),Tn(_0.get(this))}:function(...e){return Tn(t.apply(uo(this),e))}}function P_(t){return typeof t=="function"?R_(t):(t instanceof IDBTransaction&&S_(t),w_(t,I_())?new Proxy(t,Vo):t)}function Tn(t){if(t instanceof IDBRequest)return x_(t);if(io.has(t))return io.get(t);const e=P_(t);return e!==t&&(io.set(t,e),Ta.set(e,t)),e}const uo=t=>Ta.get(t);function V_(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=Tn(o);return r&&o.addEventListener("upgradeneeded",l=>{r(Tn(o.result),l.oldVersion,l.newVersion,Tn(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),a}const F_=["get","getKey","getAll","getAllKeys","count"],N_=["put","add","delete","clear"],oo=new Map;function Nl(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(oo.get(e))return oo.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=N_.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||F_.includes(n)))return;const i=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(a.shift())),(await Promise.all([h[n](...a),s&&l.done]))[0]};return oo.set(e,i),i}D_(t=>({...t,get:(e,n,r)=>Nl(e,n)||t.get(e,n,r),has:(e,n)=>!!Nl(e,n)||t.has(e,n)}));/**
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
 */class k_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(O_(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function O_(t){return t.getComponent()?.type==="VERSION"}const Fo="@firebase/app",kl="0.14.2";/**
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
 */const rn=new Ea("@firebase/app"),M_="@firebase/app-compat",L_="@firebase/analytics-compat",U_="@firebase/analytics",B_="@firebase/app-check-compat",q_="@firebase/app-check",j_="@firebase/auth",z_="@firebase/auth-compat",$_="@firebase/database",H_="@firebase/data-connect",K_="@firebase/database-compat",G_="@firebase/functions",W_="@firebase/functions-compat",Q_="@firebase/installations",X_="@firebase/installations-compat",J_="@firebase/messaging",Y_="@firebase/messaging-compat",Z_="@firebase/performance",e2="@firebase/performance-compat",t2="@firebase/remote-config",n2="@firebase/remote-config-compat",r2="@firebase/storage",s2="@firebase/storage-compat",i2="@firebase/firestore",u2="@firebase/ai",o2="@firebase/firestore-compat",a2="firebase",c2="12.2.0",l2={[Fo]:"fire-core",[M_]:"fire-core-compat",[U_]:"fire-analytics",[L_]:"fire-analytics-compat",[q_]:"fire-app-check",[B_]:"fire-app-check-compat",[j_]:"fire-auth",[z_]:"fire-auth-compat",[$_]:"fire-rtdb",[H_]:"fire-data-connect",[K_]:"fire-rtdb-compat",[G_]:"fire-fn",[W_]:"fire-fn-compat",[Q_]:"fire-iid",[X_]:"fire-iid-compat",[J_]:"fire-fcm",[Y_]:"fire-fcm-compat",[Z_]:"fire-perf",[e2]:"fire-perf-compat",[t2]:"fire-rc",[n2]:"fire-rc-compat",[r2]:"fire-gcs",[s2]:"fire-gcs-compat",[i2]:"fire-fst",[o2]:"fire-fst-compat",[u2]:"fire-vertex","fire-js":"fire-js",[a2]:"fire-js-all"};/**
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
 */const h2=new Map,f2=new Map,Ol=new Map;function Ml(t,e){try{t.container.addComponent(e)}catch(n){rn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Dr(t){const e=t.name;if(Ol.has(e))return rn.debug(`There were multiple attempts to register component ${e}.`),!1;Ol.set(e,t);for(const n of h2.values())Ml(n,t);for(const n of f2.values())Ml(n,t);return!0}function Kn(t){return t==null?!1:t.settings!==void 0}/**
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
 */const d2={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},va=new Ms("app","Firebase",d2);/**
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
 */const fu=c2;function Xn(t,e,n){let r=l2[t]??t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),rn.warn(o.join(" "));return}Dr(new Sr(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const p2="firebase-heartbeat-database",m2=1,Is="firebase-heartbeat-store";let ao=null;function b0(){return ao||(ao=V_(p2,m2,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Is)}catch(n){console.warn(n)}}}}).catch(t=>{throw va.create("idb-open",{originalErrorMessage:t.message})})),ao}async function g2(t){try{const n=(await b0()).transaction(Is),r=await n.objectStore(Is).get(E0(t));return await n.done,r}catch(e){if(e instanceof kn)rn.warn(e.message);else{const n=va.create("idb-get",{originalErrorMessage:e?.message});rn.warn(n.message)}}}async function Ll(t,e){try{const r=(await b0()).transaction(Is,"readwrite");await r.objectStore(Is).put(e,E0(t)),await r.done}catch(n){if(n instanceof kn)rn.warn(n.message);else{const r=va.create("idb-set",{originalErrorMessage:n?.message});rn.warn(r.message)}}}function E0(t){return`${t.name}!${t.options.appId}`}/**
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
 */const _2=1024,y2=30;class b2{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new T2(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Ul();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>y2){const s=v2(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){rn.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ul(),{heartbeatsToSend:n,unsentEntries:r}=E2(this._heartbeatsCache.heartbeats),s=d0(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return rn.warn(e),""}}}function Ul(){return new Date().toISOString().substring(0,10)}function E2(t,e=_2){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Bl(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Bl(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class T2{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return f_()?d_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await g2(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ll(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ll(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Bl(t){return d0(JSON.stringify({version:2,heartbeats:t})).length}function v2(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
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
 */function A2(t){Dr(new Sr("platform-logger",e=>new k_(e),"PRIVATE")),Dr(new Sr("heartbeat",e=>new b2(e),"PRIVATE")),Xn(Fo,kl,t),Xn(Fo,kl,"esm2020"),Xn("fire-js","")}A2("");var ql=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var vn,T0;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(A,g){function b(){}b.prototype=g.prototype,A.D=g.prototype,A.prototype=new b,A.prototype.constructor=A,A.C=function(T,w,C){for(var y=Array(arguments.length-2),ft=2;ft<arguments.length;ft++)y[ft-2]=arguments[ft];return g.prototype[w].apply(T,y)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(A,g,b){b||(b=0);var T=Array(16);if(typeof g=="string")for(var w=0;16>w;++w)T[w]=g.charCodeAt(b++)|g.charCodeAt(b++)<<8|g.charCodeAt(b++)<<16|g.charCodeAt(b++)<<24;else for(w=0;16>w;++w)T[w]=g[b++]|g[b++]<<8|g[b++]<<16|g[b++]<<24;g=A.g[0],b=A.g[1],w=A.g[2];var C=A.g[3],y=g+(C^b&(w^C))+T[0]+3614090360&4294967295;g=b+(y<<7&4294967295|y>>>25),y=C+(w^g&(b^w))+T[1]+3905402710&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(b^C&(g^b))+T[2]+606105819&4294967295,w=C+(y<<17&4294967295|y>>>15),y=b+(g^w&(C^g))+T[3]+3250441966&4294967295,b=w+(y<<22&4294967295|y>>>10),y=g+(C^b&(w^C))+T[4]+4118548399&4294967295,g=b+(y<<7&4294967295|y>>>25),y=C+(w^g&(b^w))+T[5]+1200080426&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(b^C&(g^b))+T[6]+2821735955&4294967295,w=C+(y<<17&4294967295|y>>>15),y=b+(g^w&(C^g))+T[7]+4249261313&4294967295,b=w+(y<<22&4294967295|y>>>10),y=g+(C^b&(w^C))+T[8]+1770035416&4294967295,g=b+(y<<7&4294967295|y>>>25),y=C+(w^g&(b^w))+T[9]+2336552879&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(b^C&(g^b))+T[10]+4294925233&4294967295,w=C+(y<<17&4294967295|y>>>15),y=b+(g^w&(C^g))+T[11]+2304563134&4294967295,b=w+(y<<22&4294967295|y>>>10),y=g+(C^b&(w^C))+T[12]+1804603682&4294967295,g=b+(y<<7&4294967295|y>>>25),y=C+(w^g&(b^w))+T[13]+4254626195&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(b^C&(g^b))+T[14]+2792965006&4294967295,w=C+(y<<17&4294967295|y>>>15),y=b+(g^w&(C^g))+T[15]+1236535329&4294967295,b=w+(y<<22&4294967295|y>>>10),y=g+(w^C&(b^w))+T[1]+4129170786&4294967295,g=b+(y<<5&4294967295|y>>>27),y=C+(b^w&(g^b))+T[6]+3225465664&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^b&(C^g))+T[11]+643717713&4294967295,w=C+(y<<14&4294967295|y>>>18),y=b+(C^g&(w^C))+T[0]+3921069994&4294967295,b=w+(y<<20&4294967295|y>>>12),y=g+(w^C&(b^w))+T[5]+3593408605&4294967295,g=b+(y<<5&4294967295|y>>>27),y=C+(b^w&(g^b))+T[10]+38016083&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^b&(C^g))+T[15]+3634488961&4294967295,w=C+(y<<14&4294967295|y>>>18),y=b+(C^g&(w^C))+T[4]+3889429448&4294967295,b=w+(y<<20&4294967295|y>>>12),y=g+(w^C&(b^w))+T[9]+568446438&4294967295,g=b+(y<<5&4294967295|y>>>27),y=C+(b^w&(g^b))+T[14]+3275163606&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^b&(C^g))+T[3]+4107603335&4294967295,w=C+(y<<14&4294967295|y>>>18),y=b+(C^g&(w^C))+T[8]+1163531501&4294967295,b=w+(y<<20&4294967295|y>>>12),y=g+(w^C&(b^w))+T[13]+2850285829&4294967295,g=b+(y<<5&4294967295|y>>>27),y=C+(b^w&(g^b))+T[2]+4243563512&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^b&(C^g))+T[7]+1735328473&4294967295,w=C+(y<<14&4294967295|y>>>18),y=b+(C^g&(w^C))+T[12]+2368359562&4294967295,b=w+(y<<20&4294967295|y>>>12),y=g+(b^w^C)+T[5]+4294588738&4294967295,g=b+(y<<4&4294967295|y>>>28),y=C+(g^b^w)+T[8]+2272392833&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^b)+T[11]+1839030562&4294967295,w=C+(y<<16&4294967295|y>>>16),y=b+(w^C^g)+T[14]+4259657740&4294967295,b=w+(y<<23&4294967295|y>>>9),y=g+(b^w^C)+T[1]+2763975236&4294967295,g=b+(y<<4&4294967295|y>>>28),y=C+(g^b^w)+T[4]+1272893353&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^b)+T[7]+4139469664&4294967295,w=C+(y<<16&4294967295|y>>>16),y=b+(w^C^g)+T[10]+3200236656&4294967295,b=w+(y<<23&4294967295|y>>>9),y=g+(b^w^C)+T[13]+681279174&4294967295,g=b+(y<<4&4294967295|y>>>28),y=C+(g^b^w)+T[0]+3936430074&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^b)+T[3]+3572445317&4294967295,w=C+(y<<16&4294967295|y>>>16),y=b+(w^C^g)+T[6]+76029189&4294967295,b=w+(y<<23&4294967295|y>>>9),y=g+(b^w^C)+T[9]+3654602809&4294967295,g=b+(y<<4&4294967295|y>>>28),y=C+(g^b^w)+T[12]+3873151461&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^b)+T[15]+530742520&4294967295,w=C+(y<<16&4294967295|y>>>16),y=b+(w^C^g)+T[2]+3299628645&4294967295,b=w+(y<<23&4294967295|y>>>9),y=g+(w^(b|~C))+T[0]+4096336452&4294967295,g=b+(y<<6&4294967295|y>>>26),y=C+(b^(g|~w))+T[7]+1126891415&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~b))+T[14]+2878612391&4294967295,w=C+(y<<15&4294967295|y>>>17),y=b+(C^(w|~g))+T[5]+4237533241&4294967295,b=w+(y<<21&4294967295|y>>>11),y=g+(w^(b|~C))+T[12]+1700485571&4294967295,g=b+(y<<6&4294967295|y>>>26),y=C+(b^(g|~w))+T[3]+2399980690&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~b))+T[10]+4293915773&4294967295,w=C+(y<<15&4294967295|y>>>17),y=b+(C^(w|~g))+T[1]+2240044497&4294967295,b=w+(y<<21&4294967295|y>>>11),y=g+(w^(b|~C))+T[8]+1873313359&4294967295,g=b+(y<<6&4294967295|y>>>26),y=C+(b^(g|~w))+T[15]+4264355552&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~b))+T[6]+2734768916&4294967295,w=C+(y<<15&4294967295|y>>>17),y=b+(C^(w|~g))+T[13]+1309151649&4294967295,b=w+(y<<21&4294967295|y>>>11),y=g+(w^(b|~C))+T[4]+4149444226&4294967295,g=b+(y<<6&4294967295|y>>>26),y=C+(b^(g|~w))+T[11]+3174756917&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~b))+T[2]+718787259&4294967295,w=C+(y<<15&4294967295|y>>>17),y=b+(C^(w|~g))+T[9]+3951481745&4294967295,A.g[0]=A.g[0]+g&4294967295,A.g[1]=A.g[1]+(w+(y<<21&4294967295|y>>>11))&4294967295,A.g[2]=A.g[2]+w&4294967295,A.g[3]=A.g[3]+C&4294967295}r.prototype.u=function(A,g){g===void 0&&(g=A.length);for(var b=g-this.blockSize,T=this.B,w=this.h,C=0;C<g;){if(w==0)for(;C<=b;)s(this,A,C),C+=this.blockSize;if(typeof A=="string"){for(;C<g;)if(T[w++]=A.charCodeAt(C++),w==this.blockSize){s(this,T),w=0;break}}else for(;C<g;)if(T[w++]=A[C++],w==this.blockSize){s(this,T),w=0;break}}this.h=w,this.o+=g},r.prototype.v=function(){var A=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);A[0]=128;for(var g=1;g<A.length-8;++g)A[g]=0;var b=8*this.o;for(g=A.length-8;g<A.length;++g)A[g]=b&255,b/=256;for(this.u(A),A=Array(16),g=b=0;4>g;++g)for(var T=0;32>T;T+=8)A[b++]=this.g[g]>>>T&255;return A};function i(A,g){var b=a;return Object.prototype.hasOwnProperty.call(b,A)?b[A]:b[A]=g(A)}function o(A,g){this.h=g;for(var b=[],T=!0,w=A.length-1;0<=w;w--){var C=A[w]|0;T&&C==g||(b[w]=C,T=!1)}this.g=b}var a={};function l(A){return-128<=A&&128>A?i(A,function(g){return new o([g|0],0>g?-1:0)}):new o([A|0],0>A?-1:0)}function h(A){if(isNaN(A)||!isFinite(A))return m;if(0>A)return L(h(-A));for(var g=[],b=1,T=0;A>=b;T++)g[T]=A/b|0,b*=4294967296;return new o(g,0)}function d(A,g){if(A.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(A.charAt(0)=="-")return L(d(A.substring(1),g));if(0<=A.indexOf("-"))throw Error('number format error: interior "-" character');for(var b=h(Math.pow(g,8)),T=m,w=0;w<A.length;w+=8){var C=Math.min(8,A.length-w),y=parseInt(A.substring(w,w+C),g);8>C?(C=h(Math.pow(g,C)),T=T.j(C).add(h(y))):(T=T.j(b),T=T.add(h(y)))}return T}var m=l(0),E=l(1),x=l(16777216);t=o.prototype,t.m=function(){if(k(this))return-L(this).m();for(var A=0,g=1,b=0;b<this.g.length;b++){var T=this.i(b);A+=(0<=T?T:4294967296+T)*g,g*=4294967296}return A},t.toString=function(A){if(A=A||10,2>A||36<A)throw Error("radix out of range: "+A);if(R(this))return"0";if(k(this))return"-"+L(this).toString(A);for(var g=h(Math.pow(A,6)),b=this,T="";;){var w=K(b,g).g;b=$(b,w.j(g));var C=((0<b.g.length?b.g[0]:b.h)>>>0).toString(A);if(b=w,R(b))return C+T;for(;6>C.length;)C="0"+C;T=C+T}},t.i=function(A){return 0>A?0:A<this.g.length?this.g[A]:this.h};function R(A){if(A.h!=0)return!1;for(var g=0;g<A.g.length;g++)if(A.g[g]!=0)return!1;return!0}function k(A){return A.h==-1}t.l=function(A){return A=$(this,A),k(A)?-1:R(A)?0:1};function L(A){for(var g=A.g.length,b=[],T=0;T<g;T++)b[T]=~A.g[T];return new o(b,~A.h).add(E)}t.abs=function(){return k(this)?L(this):this},t.add=function(A){for(var g=Math.max(this.g.length,A.g.length),b=[],T=0,w=0;w<=g;w++){var C=T+(this.i(w)&65535)+(A.i(w)&65535),y=(C>>>16)+(this.i(w)>>>16)+(A.i(w)>>>16);T=y>>>16,C&=65535,y&=65535,b[w]=y<<16|C}return new o(b,b[b.length-1]&-2147483648?-1:0)};function $(A,g){return A.add(L(g))}t.j=function(A){if(R(this)||R(A))return m;if(k(this))return k(A)?L(this).j(L(A)):L(L(this).j(A));if(k(A))return L(this.j(L(A)));if(0>this.l(x)&&0>A.l(x))return h(this.m()*A.m());for(var g=this.g.length+A.g.length,b=[],T=0;T<2*g;T++)b[T]=0;for(T=0;T<this.g.length;T++)for(var w=0;w<A.g.length;w++){var C=this.i(T)>>>16,y=this.i(T)&65535,ft=A.i(w)>>>16,an=A.i(w)&65535;b[2*T+2*w]+=y*an,G(b,2*T+2*w),b[2*T+2*w+1]+=C*an,G(b,2*T+2*w+1),b[2*T+2*w+1]+=y*ft,G(b,2*T+2*w+1),b[2*T+2*w+2]+=C*ft,G(b,2*T+2*w+2)}for(T=0;T<g;T++)b[T]=b[2*T+1]<<16|b[2*T];for(T=g;T<2*g;T++)b[T]=0;return new o(b,0)};function G(A,g){for(;(A[g]&65535)!=A[g];)A[g+1]+=A[g]>>>16,A[g]&=65535,g++}function W(A,g){this.g=A,this.h=g}function K(A,g){if(R(g))throw Error("division by zero");if(R(A))return new W(m,m);if(k(A))return g=K(L(A),g),new W(L(g.g),L(g.h));if(k(g))return g=K(A,L(g)),new W(L(g.g),g.h);if(30<A.g.length){if(k(A)||k(g))throw Error("slowDivide_ only works with positive integers.");for(var b=E,T=g;0>=T.l(A);)b=le(b),T=le(T);var w=Ae(b,1),C=Ae(T,1);for(T=Ae(T,2),b=Ae(b,2);!R(T);){var y=C.add(T);0>=y.l(A)&&(w=w.add(b),C=y),T=Ae(T,1),b=Ae(b,1)}return g=$(A,w.j(g)),new W(w,g)}for(w=m;0<=A.l(g);){for(b=Math.max(1,Math.floor(A.m()/g.m())),T=Math.ceil(Math.log(b)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),C=h(b),y=C.j(g);k(y)||0<y.l(A);)b-=T,C=h(b),y=C.j(g);R(C)&&(C=E),w=w.add(C),A=$(A,y)}return new W(w,A)}t.A=function(A){return K(this,A).h},t.and=function(A){for(var g=Math.max(this.g.length,A.g.length),b=[],T=0;T<g;T++)b[T]=this.i(T)&A.i(T);return new o(b,this.h&A.h)},t.or=function(A){for(var g=Math.max(this.g.length,A.g.length),b=[],T=0;T<g;T++)b[T]=this.i(T)|A.i(T);return new o(b,this.h|A.h)},t.xor=function(A){for(var g=Math.max(this.g.length,A.g.length),b=[],T=0;T<g;T++)b[T]=this.i(T)^A.i(T);return new o(b,this.h^A.h)};function le(A){for(var g=A.g.length+1,b=[],T=0;T<g;T++)b[T]=A.i(T)<<1|A.i(T-1)>>>31;return new o(b,A.h)}function Ae(A,g){var b=g>>5;g%=32;for(var T=A.g.length-b,w=[],C=0;C<T;C++)w[C]=0<g?A.i(C+b)>>>g|A.i(C+b+1)<<32-g:A.i(C+b);return new o(w,A.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,T0=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=d,vn=o}).apply(typeof ql<"u"?ql:typeof self<"u"?self:typeof window<"u"?window:{});var li=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var v0,rs,A0,Ti,No,w0,I0,C0;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(u,c,f){return u==Array.prototype||u==Object.prototype||(u[c]=f.value),u};function n(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof li=="object"&&li];for(var c=0;c<u.length;++c){var f=u[c];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function s(u,c){if(c)e:{var f=r;u=u.split(".");for(var p=0;p<u.length-1;p++){var I=u[p];if(!(I in f))break e;f=f[I]}u=u[u.length-1],p=f[u],c=c(p),c!=p&&c!=null&&e(f,u,{configurable:!0,writable:!0,value:c})}}function i(u,c){u instanceof String&&(u+="");var f=0,p=!1,I={next:function(){if(!p&&f<u.length){var S=f++;return{value:c(S,u[S]),done:!1}}return p=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}s("Array.prototype.values",function(u){return u||function(){return i(this,function(c,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(u){var c=typeof u;return c=c!="object"?c:u?Array.isArray(u)?"array":c:"null",c=="array"||c=="object"&&typeof u.length=="number"}function h(u){var c=typeof u;return c=="object"&&u!=null||c=="function"}function d(u,c,f){return u.call.apply(u.bind,arguments)}function m(u,c,f){if(!u)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,p),u.apply(c,I)}}return function(){return u.apply(c,arguments)}}function E(u,c,f){return E=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:m,E.apply(null,arguments)}function x(u,c){var f=Array.prototype.slice.call(arguments,1);return function(){var p=f.slice();return p.push.apply(p,arguments),u.apply(this,p)}}function R(u,c){function f(){}f.prototype=c.prototype,u.aa=c.prototype,u.prototype=new f,u.prototype.constructor=u,u.Qb=function(p,I,S){for(var q=Array(arguments.length-2),Ee=2;Ee<arguments.length;Ee++)q[Ee-2]=arguments[Ee];return c.prototype[I].apply(p,q)}}function k(u){const c=u.length;if(0<c){const f=Array(c);for(let p=0;p<c;p++)f[p]=u[p];return f}return[]}function L(u,c){for(let f=1;f<arguments.length;f++){const p=arguments[f];if(l(p)){const I=u.length||0,S=p.length||0;u.length=I+S;for(let q=0;q<S;q++)u[I+q]=p[q]}else u.push(p)}}class ${constructor(c,f){this.i=c,this.j=f,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function G(u){return/^[\s\xa0]*$/.test(u)}function W(){var u=a.navigator;return u&&(u=u.userAgent)?u:""}function K(u){return K[" "](u),u}K[" "]=function(){};var le=W().indexOf("Gecko")!=-1&&!(W().toLowerCase().indexOf("webkit")!=-1&&W().indexOf("Edge")==-1)&&!(W().indexOf("Trident")!=-1||W().indexOf("MSIE")!=-1)&&W().indexOf("Edge")==-1;function Ae(u,c,f){for(const p in u)c.call(f,u[p],p,u)}function A(u,c){for(const f in u)c.call(void 0,u[f],f,u)}function g(u){const c={};for(const f in u)c[f]=u[f];return c}const b="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(u,c){let f,p;for(let I=1;I<arguments.length;I++){p=arguments[I];for(f in p)u[f]=p[f];for(let S=0;S<b.length;S++)f=b[S],Object.prototype.hasOwnProperty.call(p,f)&&(u[f]=p[f])}}function w(u){var c=1;u=u.split(":");const f=[];for(;0<c&&u.length;)f.push(u.shift()),c--;return u.length&&f.push(u.join(":")),f}function C(u){a.setTimeout(()=>{throw u},0)}function y(){var u=At;let c=null;return u.g&&(c=u.g,u.g=u.g.next,u.g||(u.h=null),c.next=null),c}class ft{constructor(){this.h=this.g=null}add(c,f){const p=an.get();p.set(c,f),this.h?this.h.next=p:this.g=p,this.h=p}}var an=new $(()=>new qe,u=>u.reset());class qe{constructor(){this.next=this.g=this.h=null}set(c,f){this.h=c,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let be,de=!1,At=new ft,On=()=>{const u=a.Promise.resolve(void 0);be=()=>{u.then(Ht)}};var Ht=()=>{for(var u;u=y();){try{u.h.call(u.g)}catch(f){C(f)}var c=an;c.j(u),100>c.h&&(c.h++,u.next=c.g,c.g=u)}de=!1};function Ne(){this.s=this.s,this.C=this.C}Ne.prototype.s=!1,Ne.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ne.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ke(u,c){this.type=u,this.g=this.target=c,this.defaultPrevented=!1}ke.prototype.h=function(){this.defaultPrevented=!0};var Su=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var u=!1,c=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const f=()=>{};a.addEventListener("test",f,c),a.removeEventListener("test",f,c)}catch{}return u})();function Mn(u,c){if(ke.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u){var f=this.type=u.type,p=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;if(this.target=u.target||u.srcElement,this.g=c,c=u.relatedTarget){if(le){e:{try{K(c.nodeName);var I=!0;break e}catch{}I=!1}I||(c=null)}}else f=="mouseover"?c=u.fromElement:f=="mouseout"&&(c=u.toElement);this.relatedTarget=c,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=typeof u.pointerType=="string"?u.pointerType:Ln[u.pointerType]||"",this.state=u.state,this.i=u,u.defaultPrevented&&Mn.aa.h.call(this)}}R(Mn,ke);var Ln={2:"touch",3:"pen",4:"mouse"};Mn.prototype.h=function(){Mn.aa.h.call(this);var u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var Kt="closure_listenable_"+(1e6*Math.random()|0),Ur=0;function $s(u,c,f,p,I){this.listener=u,this.proxy=null,this.src=c,this.type=f,this.capture=!!p,this.ha=I,this.key=++Ur,this.da=this.fa=!1}function St(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function Br(u){this.src=u,this.g={},this.h=0}Br.prototype.add=function(u,c,f,p,I){var S=u.toString();u=this.g[S],u||(u=this.g[S]=[],this.h++);var q=v(u,c,p,I);return-1<q?(c=u[q],f||(c.fa=!1)):(c=new $s(c,this.src,S,!!p,I),c.fa=f,u.push(c)),c};function _(u,c){var f=c.type;if(f in u.g){var p=u.g[f],I=Array.prototype.indexOf.call(p,c,void 0),S;(S=0<=I)&&Array.prototype.splice.call(p,I,1),S&&(St(c),u.g[f].length==0&&(delete u.g[f],u.h--))}}function v(u,c,f,p){for(var I=0;I<u.length;++I){var S=u[I];if(!S.da&&S.listener==c&&S.capture==!!f&&S.ha==p)return I}return-1}var D="closure_lm_"+(1e6*Math.random()|0),O={};function V(u,c,f,p,I){if(Array.isArray(c)){for(var S=0;S<c.length;S++)V(u,c[S],f,p,I);return null}return f=te(f),u&&u[Kt]?u.K(c,f,h(p)?!!p.capture:!1,I):F(u,c,f,!1,p,I)}function F(u,c,f,p,I,S){if(!c)throw Error("Invalid event type");var q=h(I)?!!I.capture:!!I,Ee=z(u);if(Ee||(u[D]=Ee=new Br(u)),f=Ee.add(c,f,p,q,S),f.proxy)return f;if(p=j(),f.proxy=p,p.src=u,p.listener=f,u.addEventListener)Su||(I=q),I===void 0&&(I=!1),u.addEventListener(c.toString(),p,I);else if(u.attachEvent)u.attachEvent(M(c.toString()),p);else if(u.addListener&&u.removeListener)u.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return f}function j(){function u(f){return c.call(u.src,u.listener,f)}const c=J;return u}function B(u,c,f,p,I){if(Array.isArray(c))for(var S=0;S<c.length;S++)B(u,c[S],f,p,I);else p=h(p)?!!p.capture:!!p,f=te(f),u&&u[Kt]?(u=u.i,c=String(c).toString(),c in u.g&&(S=u.g[c],f=v(S,f,p,I),-1<f&&(St(S[f]),Array.prototype.splice.call(S,f,1),S.length==0&&(delete u.g[c],u.h--)))):u&&(u=z(u))&&(c=u.g[c.toString()],u=-1,c&&(u=v(c,f,p,I)),(f=-1<u?c[u]:null)&&U(f))}function U(u){if(typeof u!="number"&&u&&!u.da){var c=u.src;if(c&&c[Kt])_(c.i,u);else{var f=u.type,p=u.proxy;c.removeEventListener?c.removeEventListener(f,p,u.capture):c.detachEvent?c.detachEvent(M(f),p):c.addListener&&c.removeListener&&c.removeListener(p),(f=z(c))?(_(f,u),f.h==0&&(f.src=null,c[D]=null)):St(u)}}}function M(u){return u in O?O[u]:O[u]="on"+u}function J(u,c){if(u.da)u=!0;else{c=new Mn(c,this);var f=u.listener,p=u.ha||u.src;u.fa&&U(u),u=f.call(p,c)}return u}function z(u){return u=u[D],u instanceof Br?u:null}var Q="__closure_events_fn_"+(1e9*Math.random()>>>0);function te(u){return typeof u=="function"?u:(u[Q]||(u[Q]=function(c){return u.handleEvent(c)}),u[Q])}function Z(){Ne.call(this),this.i=new Br(this),this.M=this,this.F=null}R(Z,Ne),Z.prototype[Kt]=!0,Z.prototype.removeEventListener=function(u,c,f,p){B(this,u,c,f,p)};function ie(u,c){var f,p=u.F;if(p)for(f=[];p;p=p.F)f.push(p);if(u=u.M,p=c.type||c,typeof c=="string")c=new ke(c,u);else if(c instanceof ke)c.target=c.target||u;else{var I=c;c=new ke(p,u),T(c,I)}if(I=!0,f)for(var S=f.length-1;0<=S;S--){var q=c.g=f[S];I=he(q,p,!0,c)&&I}if(q=c.g=u,I=he(q,p,!0,c)&&I,I=he(q,p,!1,c)&&I,f)for(S=0;S<f.length;S++)q=c.g=f[S],I=he(q,p,!1,c)&&I}Z.prototype.N=function(){if(Z.aa.N.call(this),this.i){var u=this.i,c;for(c in u.g){for(var f=u.g[c],p=0;p<f.length;p++)St(f[p]);delete u.g[c],u.h--}}this.F=null},Z.prototype.K=function(u,c,f,p){return this.i.add(String(u),c,!1,f,p)},Z.prototype.L=function(u,c,f,p){return this.i.add(String(u),c,!0,f,p)};function he(u,c,f,p){if(c=u.i.g[String(c)],!c)return!0;c=c.concat();for(var I=!0,S=0;S<c.length;++S){var q=c[S];if(q&&!q.da&&q.capture==f){var Ee=q.listener,He=q.ha||q.src;q.fa&&_(u.i,q),I=Ee.call(He,p)!==!1&&I}}return I&&!p.defaultPrevented}function je(u,c,f){if(typeof u=="function")f&&(u=E(u,f));else if(u&&typeof u.handleEvent=="function")u=E(u.handleEvent,u);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:a.setTimeout(u,c||0)}function ze(u){u.g=je(()=>{u.g=null,u.i&&(u.i=!1,ze(u))},u.l);const c=u.h;u.h=null,u.m.apply(null,c)}class gt extends Ne{constructor(c,f){super(),this.m=c,this.l=f,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:ze(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Xe(u){Ne.call(this),this.h=u,this.g={}}R(Xe,Ne);var cn=[];function qr(u){Ae(u.g,function(c,f){this.g.hasOwnProperty(f)&&U(c)},u),u.g={}}Xe.prototype.N=function(){Xe.aa.N.call(this),qr(this)},Xe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var $e=a.JSON.stringify,_t=a.JSON.parse,Hs=class{stringify(u){return a.JSON.stringify(u,void 0)}parse(u){return a.JSON.parse(u,void 0)}};function sr(){}sr.prototype.h=null;function ec(u){return u.h||(u.h=u.i())}function tc(){}var jr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Du(){ke.call(this,"d")}R(Du,ke);function Ru(){ke.call(this,"c")}R(Ru,ke);var Un={},nc=null;function Ks(){return nc=nc||new Z}Un.La="serverreachability";function rc(u){ke.call(this,Un.La,u)}R(rc,ke);function zr(u){const c=Ks();ie(c,new rc(c))}Un.STAT_EVENT="statevent";function sc(u,c){ke.call(this,Un.STAT_EVENT,u),this.stat=c}R(sc,ke);function st(u){const c=Ks();ie(c,new sc(c,u))}Un.Ma="timingevent";function ic(u,c){ke.call(this,Un.Ma,u),this.size=c}R(ic,ke);function $r(u,c){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){u()},c)}function Hr(){this.g=!0}Hr.prototype.xa=function(){this.g=!1};function ip(u,c,f,p,I,S){u.info(function(){if(u.g)if(S)for(var q="",Ee=S.split("&"),He=0;He<Ee.length;He++){var pe=Ee[He].split("=");if(1<pe.length){var Je=pe[0];pe=pe[1];var Ye=Je.split("_");q=2<=Ye.length&&Ye[1]=="type"?q+(Je+"="+pe+"&"):q+(Je+"=redacted&")}}else q=null;else q=S;return"XMLHTTP REQ ("+p+") [attempt "+I+"]: "+c+`
`+f+`
`+q})}function up(u,c,f,p,I,S,q){u.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+I+"]: "+c+`
`+f+`
`+S+" "+q})}function ir(u,c,f,p){u.info(function(){return"XMLHTTP TEXT ("+c+"): "+ap(u,f)+(p?" "+p:"")})}function op(u,c){u.info(function(){return"TIMEOUT: "+c})}Hr.prototype.info=function(){};function ap(u,c){if(!u.g)return c;if(!c)return null;try{var f=JSON.parse(c);if(f){for(u=0;u<f.length;u++)if(Array.isArray(f[u])){var p=f[u];if(!(2>p.length)){var I=p[1];if(Array.isArray(I)&&!(1>I.length)){var S=I[0];if(S!="noop"&&S!="stop"&&S!="close")for(var q=1;q<I.length;q++)I[q]=""}}}}return $e(f)}catch{return c}}var Gs={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},uc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Pu;function Ws(){}R(Ws,sr),Ws.prototype.g=function(){return new XMLHttpRequest},Ws.prototype.i=function(){return{}},Pu=new Ws;function ln(u,c,f,p){this.j=u,this.i=c,this.l=f,this.R=p||1,this.U=new Xe(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new oc}function oc(){this.i=null,this.g="",this.h=!1}var ac={},Vu={};function Fu(u,c,f){u.L=1,u.v=Ys(Gt(c)),u.m=f,u.P=!0,cc(u,null)}function cc(u,c){u.F=Date.now(),Qs(u),u.A=Gt(u.v);var f=u.A,p=u.R;Array.isArray(p)||(p=[String(p)]),Ac(f.i,"t",p),u.C=0,f=u.j.J,u.h=new oc,u.g=qc(u.j,f?c:null,!u.m),0<u.O&&(u.M=new gt(E(u.Y,u,u.g),u.O)),c=u.U,f=u.g,p=u.ca;var I="readystatechange";Array.isArray(I)||(I&&(cn[0]=I.toString()),I=cn);for(var S=0;S<I.length;S++){var q=V(f,I[S],p||c.handleEvent,!1,c.h||c);if(!q)break;c.g[q.key]=q}c=u.H?g(u.H):{},u.m?(u.u||(u.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.A,u.u,u.m,c)):(u.u="GET",u.g.ea(u.A,u.u,null,c)),zr(),ip(u.i,u.u,u.A,u.l,u.R,u.m)}ln.prototype.ca=function(u){u=u.target;const c=this.M;c&&Wt(u)==3?c.j():this.Y(u)},ln.prototype.Y=function(u){try{if(u==this.g)e:{const Ye=Wt(this.g);var c=this.g.Ba();const ar=this.g.Z();if(!(3>Ye)&&(Ye!=3||this.g&&(this.h.h||this.g.oa()||Rc(this.g)))){this.J||Ye!=4||c==7||(c==8||0>=ar?zr(3):zr(2)),Nu(this);var f=this.g.Z();this.X=f;t:if(lc(this)){var p=Rc(this.g);u="";var I=p.length,S=Wt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Bn(this),Kr(this);var q="";break t}this.h.i=new a.TextDecoder}for(c=0;c<I;c++)this.h.h=!0,u+=this.h.i.decode(p[c],{stream:!(S&&c==I-1)});p.length=0,this.h.g+=u,this.C=0,q=this.h.g}else q=this.g.oa();if(this.o=f==200,up(this.i,this.u,this.A,this.l,this.R,Ye,f),this.o){if(this.T&&!this.K){t:{if(this.g){var Ee,He=this.g;if((Ee=He.g?He.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!G(Ee)){var pe=Ee;break t}}pe=null}if(f=pe)ir(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ku(this,f);else{this.o=!1,this.s=3,st(12),Bn(this),Kr(this);break e}}if(this.P){f=!0;let wt;for(;!this.J&&this.C<q.length;)if(wt=cp(this,q),wt==Vu){Ye==4&&(this.s=4,st(14),f=!1),ir(this.i,this.l,null,"[Incomplete Response]");break}else if(wt==ac){this.s=4,st(15),ir(this.i,this.l,q,"[Invalid Chunk]"),f=!1;break}else ir(this.i,this.l,wt,null),ku(this,wt);if(lc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ye!=4||q.length!=0||this.h.h||(this.s=1,st(16),f=!1),this.o=this.o&&f,!f)ir(this.i,this.l,q,"[Invalid Chunked Response]"),Bn(this),Kr(this);else if(0<q.length&&!this.W){this.W=!0;var Je=this.j;Je.g==this&&Je.ba&&!Je.M&&(Je.j.info("Great, no buffering proxy detected. Bytes received: "+q.length),qu(Je),Je.M=!0,st(11))}}else ir(this.i,this.l,q,null),ku(this,q);Ye==4&&Bn(this),this.o&&!this.J&&(Ye==4?Mc(this.j,this):(this.o=!1,Qs(this)))}else Cp(this.g),f==400&&0<q.indexOf("Unknown SID")?(this.s=3,st(12)):(this.s=0,st(13)),Bn(this),Kr(this)}}}catch{}finally{}};function lc(u){return u.g?u.u=="GET"&&u.L!=2&&u.j.Ca:!1}function cp(u,c){var f=u.C,p=c.indexOf(`
`,f);return p==-1?Vu:(f=Number(c.substring(f,p)),isNaN(f)?ac:(p+=1,p+f>c.length?Vu:(c=c.slice(p,p+f),u.C=p+f,c)))}ln.prototype.cancel=function(){this.J=!0,Bn(this)};function Qs(u){u.S=Date.now()+u.I,hc(u,u.I)}function hc(u,c){if(u.B!=null)throw Error("WatchDog timer not null");u.B=$r(E(u.ba,u),c)}function Nu(u){u.B&&(a.clearTimeout(u.B),u.B=null)}ln.prototype.ba=function(){this.B=null;const u=Date.now();0<=u-this.S?(op(this.i,this.A),this.L!=2&&(zr(),st(17)),Bn(this),this.s=2,Kr(this)):hc(this,this.S-u)};function Kr(u){u.j.G==0||u.J||Mc(u.j,u)}function Bn(u){Nu(u);var c=u.M;c&&typeof c.ma=="function"&&c.ma(),u.M=null,qr(u.U),u.g&&(c=u.g,u.g=null,c.abort(),c.ma())}function ku(u,c){try{var f=u.j;if(f.G!=0&&(f.g==u||Ou(f.h,u))){if(!u.K&&Ou(f.h,u)&&f.G==3){try{var p=f.Da.g.parse(c)}catch{p=null}if(Array.isArray(p)&&p.length==3){var I=p;if(I[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<u.F)si(f),ni(f);else break e;Bu(f),st(18)}}else f.za=I[1],0<f.za-f.T&&37500>I[2]&&f.F&&f.v==0&&!f.C&&(f.C=$r(E(f.Za,f),6e3));if(1>=pc(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else jn(f,11)}else if((u.K||f.g==u)&&si(f),!G(c))for(I=f.Da.g.parse(c),c=0;c<I.length;c++){let pe=I[c];if(f.T=pe[0],pe=pe[1],f.G==2)if(pe[0]=="c"){f.K=pe[1],f.ia=pe[2];const Je=pe[3];Je!=null&&(f.la=Je,f.j.info("VER="+f.la));const Ye=pe[4];Ye!=null&&(f.Aa=Ye,f.j.info("SVER="+f.Aa));const ar=pe[5];ar!=null&&typeof ar=="number"&&0<ar&&(p=1.5*ar,f.L=p,f.j.info("backChannelRequestTimeoutMs_="+p)),p=f;const wt=u.g;if(wt){const ui=wt.g?wt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ui){var S=p.h;S.g||ui.indexOf("spdy")==-1&&ui.indexOf("quic")==-1&&ui.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Mu(S,S.h),S.h=null))}if(p.D){const ju=wt.g?wt.g.getResponseHeader("X-HTTP-Session-Id"):null;ju&&(p.ya=ju,we(p.I,p.D,ju))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-u.F,f.j.info("Handshake RTT: "+f.R+"ms")),p=f;var q=u;if(p.qa=Bc(p,p.J?p.ia:null,p.W),q.K){mc(p.h,q);var Ee=q,He=p.L;He&&(Ee.I=He),Ee.B&&(Nu(Ee),Qs(Ee)),p.g=q}else kc(p);0<f.i.length&&ri(f)}else pe[0]!="stop"&&pe[0]!="close"||jn(f,7);else f.G==3&&(pe[0]=="stop"||pe[0]=="close"?pe[0]=="stop"?jn(f,7):Uu(f):pe[0]!="noop"&&f.l&&f.l.ta(pe),f.v=0)}}zr(4)}catch{}}var lp=class{constructor(u,c){this.g=u,this.map=c}};function fc(u){this.l=u||10,a.PerformanceNavigationTiming?(u=a.performance.getEntriesByType("navigation"),u=0<u.length&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function dc(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function pc(u){return u.h?1:u.g?u.g.size:0}function Ou(u,c){return u.h?u.h==c:u.g?u.g.has(c):!1}function Mu(u,c){u.g?u.g.add(c):u.h=c}function mc(u,c){u.h&&u.h==c?u.h=null:u.g&&u.g.has(c)&&u.g.delete(c)}fc.prototype.cancel=function(){if(this.i=gc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function gc(u){if(u.h!=null)return u.i.concat(u.h.D);if(u.g!=null&&u.g.size!==0){let c=u.i;for(const f of u.g.values())c=c.concat(f.D);return c}return k(u.i)}function hp(u){if(u.V&&typeof u.V=="function")return u.V();if(typeof Map<"u"&&u instanceof Map||typeof Set<"u"&&u instanceof Set)return Array.from(u.values());if(typeof u=="string")return u.split("");if(l(u)){for(var c=[],f=u.length,p=0;p<f;p++)c.push(u[p]);return c}c=[],f=0;for(p in u)c[f++]=u[p];return c}function fp(u){if(u.na&&typeof u.na=="function")return u.na();if(!u.V||typeof u.V!="function"){if(typeof Map<"u"&&u instanceof Map)return Array.from(u.keys());if(!(typeof Set<"u"&&u instanceof Set)){if(l(u)||typeof u=="string"){var c=[];u=u.length;for(var f=0;f<u;f++)c.push(f);return c}c=[],f=0;for(const p in u)c[f++]=p;return c}}}function _c(u,c){if(u.forEach&&typeof u.forEach=="function")u.forEach(c,void 0);else if(l(u)||typeof u=="string")Array.prototype.forEach.call(u,c,void 0);else for(var f=fp(u),p=hp(u),I=p.length,S=0;S<I;S++)c.call(void 0,p[S],f&&f[S],u)}var yc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function dp(u,c){if(u){u=u.split("&");for(var f=0;f<u.length;f++){var p=u[f].indexOf("="),I=null;if(0<=p){var S=u[f].substring(0,p);I=u[f].substring(p+1)}else S=u[f];c(S,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function qn(u){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,u instanceof qn){this.h=u.h,Xs(this,u.j),this.o=u.o,this.g=u.g,Js(this,u.s),this.l=u.l;var c=u.i,f=new Qr;f.i=c.i,c.g&&(f.g=new Map(c.g),f.h=c.h),bc(this,f),this.m=u.m}else u&&(c=String(u).match(yc))?(this.h=!1,Xs(this,c[1]||"",!0),this.o=Gr(c[2]||""),this.g=Gr(c[3]||"",!0),Js(this,c[4]),this.l=Gr(c[5]||"",!0),bc(this,c[6]||"",!0),this.m=Gr(c[7]||"")):(this.h=!1,this.i=new Qr(null,this.h))}qn.prototype.toString=function(){var u=[],c=this.j;c&&u.push(Wr(c,Ec,!0),":");var f=this.g;return(f||c=="file")&&(u.push("//"),(c=this.o)&&u.push(Wr(c,Ec,!0),"@"),u.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&u.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&u.push("/"),u.push(Wr(f,f.charAt(0)=="/"?gp:mp,!0))),(f=this.i.toString())&&u.push("?",f),(f=this.m)&&u.push("#",Wr(f,yp)),u.join("")};function Gt(u){return new qn(u)}function Xs(u,c,f){u.j=f?Gr(c,!0):c,u.j&&(u.j=u.j.replace(/:$/,""))}function Js(u,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);u.s=c}else u.s=null}function bc(u,c,f){c instanceof Qr?(u.i=c,bp(u.i,u.h)):(f||(c=Wr(c,_p)),u.i=new Qr(c,u.h))}function we(u,c,f){u.i.set(c,f)}function Ys(u){return we(u,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),u}function Gr(u,c){return u?c?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function Wr(u,c,f){return typeof u=="string"?(u=encodeURI(u).replace(c,pp),f&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function pp(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var Ec=/[#\/\?@]/g,mp=/[#\?:]/g,gp=/[#\?]/g,_p=/[#\?@]/g,yp=/#/g;function Qr(u,c){this.h=this.g=null,this.i=u||null,this.j=!!c}function hn(u){u.g||(u.g=new Map,u.h=0,u.i&&dp(u.i,function(c,f){u.add(decodeURIComponent(c.replace(/\+/g," ")),f)}))}t=Qr.prototype,t.add=function(u,c){hn(this),this.i=null,u=ur(this,u);var f=this.g.get(u);return f||this.g.set(u,f=[]),f.push(c),this.h+=1,this};function Tc(u,c){hn(u),c=ur(u,c),u.g.has(c)&&(u.i=null,u.h-=u.g.get(c).length,u.g.delete(c))}function vc(u,c){return hn(u),c=ur(u,c),u.g.has(c)}t.forEach=function(u,c){hn(this),this.g.forEach(function(f,p){f.forEach(function(I){u.call(c,I,p,this)},this)},this)},t.na=function(){hn(this);const u=Array.from(this.g.values()),c=Array.from(this.g.keys()),f=[];for(let p=0;p<c.length;p++){const I=u[p];for(let S=0;S<I.length;S++)f.push(c[p])}return f},t.V=function(u){hn(this);let c=[];if(typeof u=="string")vc(this,u)&&(c=c.concat(this.g.get(ur(this,u))));else{u=Array.from(this.g.values());for(let f=0;f<u.length;f++)c=c.concat(u[f])}return c},t.set=function(u,c){return hn(this),this.i=null,u=ur(this,u),vc(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[c]),this.h+=1,this},t.get=function(u,c){return u?(u=this.V(u),0<u.length?String(u[0]):c):c};function Ac(u,c,f){Tc(u,c),0<f.length&&(u.i=null,u.g.set(ur(u,c),k(f)),u.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],c=Array.from(this.g.keys());for(var f=0;f<c.length;f++){var p=c[f];const S=encodeURIComponent(String(p)),q=this.V(p);for(p=0;p<q.length;p++){var I=S;q[p]!==""&&(I+="="+encodeURIComponent(String(q[p]))),u.push(I)}}return this.i=u.join("&")};function ur(u,c){return c=String(c),u.j&&(c=c.toLowerCase()),c}function bp(u,c){c&&!u.j&&(hn(u),u.i=null,u.g.forEach(function(f,p){var I=p.toLowerCase();p!=I&&(Tc(this,p),Ac(this,I,f))},u)),u.j=c}function Ep(u,c){const f=new Hr;if(a.Image){const p=new Image;p.onload=x(fn,f,"TestLoadImage: loaded",!0,c,p),p.onerror=x(fn,f,"TestLoadImage: error",!1,c,p),p.onabort=x(fn,f,"TestLoadImage: abort",!1,c,p),p.ontimeout=x(fn,f,"TestLoadImage: timeout",!1,c,p),a.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=u}else c(!1)}function Tp(u,c){const f=new Hr,p=new AbortController,I=setTimeout(()=>{p.abort(),fn(f,"TestPingServer: timeout",!1,c)},1e4);fetch(u,{signal:p.signal}).then(S=>{clearTimeout(I),S.ok?fn(f,"TestPingServer: ok",!0,c):fn(f,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(I),fn(f,"TestPingServer: error",!1,c)})}function fn(u,c,f,p,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),p(f)}catch{}}function vp(){this.g=new Hs}function Ap(u,c,f){const p=f||"";try{_c(u,function(I,S){let q=I;h(I)&&(q=$e(I)),c.push(p+S+"="+encodeURIComponent(q))})}catch(I){throw c.push(p+"type="+encodeURIComponent("_badmap")),I}}function Zs(u){this.l=u.Ub||null,this.j=u.eb||!1}R(Zs,sr),Zs.prototype.g=function(){return new ei(this.l,this.j)},Zs.prototype.i=(function(u){return function(){return u}})({});function ei(u,c){Z.call(this),this.D=u,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R(ei,Z),t=ei.prototype,t.open=function(u,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=u,this.A=c,this.readyState=1,Jr(this)},t.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};u&&(c.body=u),(this.D||a).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Xr(this)),this.readyState=0},t.Sa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,Jr(this)),this.g&&(this.readyState=3,Jr(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;wc(this)}else u.text().then(this.Ra.bind(this),this.ga.bind(this))};function wc(u){u.j.read().then(u.Pa.bind(u)).catch(u.ga.bind(u))}t.Pa=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var c=u.value?u.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!u.done}))&&(this.response=this.responseText+=c)}u.done?Xr(this):Jr(this),this.readyState==3&&wc(this)}},t.Ra=function(u){this.g&&(this.response=this.responseText=u,Xr(this))},t.Qa=function(u){this.g&&(this.response=u,Xr(this))},t.ga=function(){this.g&&Xr(this)};function Xr(u){u.readyState=4,u.l=null,u.j=null,u.v=null,Jr(u)}t.setRequestHeader=function(u,c){this.u.append(u,c)},t.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],c=this.h.entries();for(var f=c.next();!f.done;)f=f.value,u.push(f[0]+": "+f[1]),f=c.next();return u.join(`\r
`)};function Jr(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(ei.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function Ic(u){let c="";return Ae(u,function(f,p){c+=p,c+=":",c+=f,c+=`\r
`}),c}function Lu(u,c,f){e:{for(p in f){var p=!1;break e}p=!0}p||(f=Ic(f),typeof u=="string"?f!=null&&encodeURIComponent(String(f)):we(u,c,f))}function De(u){Z.call(this),this.headers=new Map,this.o=u||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(De,Z);var wp=/^https?$/i,Ip=["POST","PUT"];t=De.prototype,t.Ha=function(u){this.J=u},t.ea=function(u,c,f,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);c=c?c.toUpperCase():"GET",this.D=u,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Pu.g(),this.v=this.o?ec(this.o):ec(Pu),this.g.onreadystatechange=E(this.Ea,this);try{this.B=!0,this.g.open(c,String(u),!0),this.B=!1}catch(S){Cc(this,S);return}if(u=f||"",f=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var I in p)f.set(I,p[I]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const S of p.keys())f.set(S,p.get(S));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(f.keys()).find(S=>S.toLowerCase()=="content-type"),I=a.FormData&&u instanceof a.FormData,!(0<=Array.prototype.indexOf.call(Ip,c,void 0))||p||I||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,q]of f)this.g.setRequestHeader(S,q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Dc(this),this.u=!0,this.g.send(u),this.u=!1}catch(S){Cc(this,S)}};function Cc(u,c){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=c,u.m=5,xc(u),ti(u)}function xc(u){u.A||(u.A=!0,ie(u,"complete"),ie(u,"error"))}t.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=u||7,ie(this,"complete"),ie(this,"abort"),ti(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ti(this,!0)),De.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Sc(this):this.bb())},t.bb=function(){Sc(this)};function Sc(u){if(u.h&&typeof o<"u"&&(!u.v[1]||Wt(u)!=4||u.Z()!=2)){if(u.u&&Wt(u)==4)je(u.Ea,0,u);else if(ie(u,"readystatechange"),Wt(u)==4){u.h=!1;try{const q=u.Z();e:switch(q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var f;if(!(f=c)){var p;if(p=q===0){var I=String(u.D).match(yc)[1]||null;!I&&a.self&&a.self.location&&(I=a.self.location.protocol.slice(0,-1)),p=!wp.test(I?I.toLowerCase():"")}f=p}if(f)ie(u,"complete"),ie(u,"success");else{u.m=6;try{var S=2<Wt(u)?u.g.statusText:""}catch{S=""}u.l=S+" ["+u.Z()+"]",xc(u)}}finally{ti(u)}}}}function ti(u,c){if(u.g){Dc(u);const f=u.g,p=u.v[0]?()=>{}:null;u.g=null,u.v=null,c||ie(u,"ready");try{f.onreadystatechange=p}catch{}}}function Dc(u){u.I&&(a.clearTimeout(u.I),u.I=null)}t.isActive=function(){return!!this.g};function Wt(u){return u.g?u.g.readyState:0}t.Z=function(){try{return 2<Wt(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(u){if(this.g){var c=this.g.responseText;return u&&c.indexOf(u)==0&&(c=c.substring(u.length)),_t(c)}};function Rc(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.H){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function Cp(u){const c={};u=(u.g&&2<=Wt(u)&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<u.length;p++){if(G(u[p]))continue;var f=w(u[p]);const I=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const S=c[I]||[];c[I]=S,S.push(f)}A(c,function(p){return p.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Yr(u,c,f){return f&&f.internalChannelParams&&f.internalChannelParams[u]||c}function Pc(u){this.Aa=0,this.i=[],this.j=new Hr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Yr("failFast",!1,u),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Yr("baseRetryDelayMs",5e3,u),this.cb=Yr("retryDelaySeedMs",1e4,u),this.Wa=Yr("forwardChannelMaxRetries",2,u),this.wa=Yr("forwardChannelRequestTimeoutMs",2e4,u),this.pa=u&&u.xmlHttpFactory||void 0,this.Xa=u&&u.Tb||void 0,this.Ca=u&&u.useFetchStreams||!1,this.L=void 0,this.J=u&&u.supportsCrossDomainXhr||!1,this.K="",this.h=new fc(u&&u.concurrentRequestLimit),this.Da=new vp,this.P=u&&u.fastHandshake||!1,this.O=u&&u.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=u&&u.Rb||!1,u&&u.xa&&this.j.xa(),u&&u.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&u&&u.detectBufferingProxy||!1,this.ja=void 0,u&&u.longPollingTimeout&&0<u.longPollingTimeout&&(this.ja=u.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Pc.prototype,t.la=8,t.G=1,t.connect=function(u,c,f,p){st(0),this.W=u,this.H=c||{},f&&p!==void 0&&(this.H.OSID=f,this.H.OAID=p),this.F=this.X,this.I=Bc(this,null,this.W),ri(this)};function Uu(u){if(Vc(u),u.G==3){var c=u.U++,f=Gt(u.I);if(we(f,"SID",u.K),we(f,"RID",c),we(f,"TYPE","terminate"),Zr(u,f),c=new ln(u,u.j,c),c.L=2,c.v=Ys(Gt(f)),f=!1,a.navigator&&a.navigator.sendBeacon)try{f=a.navigator.sendBeacon(c.v.toString(),"")}catch{}!f&&a.Image&&(new Image().src=c.v,f=!0),f||(c.g=qc(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Qs(c)}Uc(u)}function ni(u){u.g&&(qu(u),u.g.cancel(),u.g=null)}function Vc(u){ni(u),u.u&&(a.clearTimeout(u.u),u.u=null),si(u),u.h.cancel(),u.s&&(typeof u.s=="number"&&a.clearTimeout(u.s),u.s=null)}function ri(u){if(!dc(u.h)&&!u.s){u.s=!0;var c=u.Ga;be||On(),de||(be(),de=!0),At.add(c,u),u.B=0}}function xp(u,c){return pc(u.h)>=u.h.j-(u.s?1:0)?!1:u.s?(u.i=c.D.concat(u.i),!0):u.G==1||u.G==2||u.B>=(u.Va?0:u.Wa)?!1:(u.s=$r(E(u.Ga,u,c),Lc(u,u.B)),u.B++,!0)}t.Ga=function(u){if(this.s)if(this.s=null,this.G==1){if(!u){this.U=Math.floor(1e5*Math.random()),u=this.U++;const I=new ln(this,this.j,u);let S=this.o;if(this.S&&(S?(S=g(S),T(S,this.S)):S=this.S),this.m!==null||this.O||(I.H=S,S=null),this.P)e:{for(var c=0,f=0;f<this.i.length;f++){t:{var p=this.i[f];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(c+=p,4096<c){c=f;break e}if(c===4096||f===this.i.length-1){c=f+1;break e}}c=1e3}else c=1e3;c=Nc(this,I,c),f=Gt(this.I),we(f,"RID",u),we(f,"CVER",22),this.D&&we(f,"X-HTTP-Session-Id",this.D),Zr(this,f),S&&(this.O?c="headers="+encodeURIComponent(String(Ic(S)))+"&"+c:this.m&&Lu(f,this.m,S)),Mu(this.h,I),this.Ua&&we(f,"TYPE","init"),this.P?(we(f,"$req",c),we(f,"SID","null"),I.T=!0,Fu(I,f,null)):Fu(I,f,c),this.G=2}}else this.G==3&&(u?Fc(this,u):this.i.length==0||dc(this.h)||Fc(this))};function Fc(u,c){var f;c?f=c.l:f=u.U++;const p=Gt(u.I);we(p,"SID",u.K),we(p,"RID",f),we(p,"AID",u.T),Zr(u,p),u.m&&u.o&&Lu(p,u.m,u.o),f=new ln(u,u.j,f,u.B+1),u.m===null&&(f.H=u.o),c&&(u.i=c.D.concat(u.i)),c=Nc(u,f,1e3),f.I=Math.round(.5*u.wa)+Math.round(.5*u.wa*Math.random()),Mu(u.h,f),Fu(f,p,c)}function Zr(u,c){u.H&&Ae(u.H,function(f,p){we(c,p,f)}),u.l&&_c({},function(f,p){we(c,p,f)})}function Nc(u,c,f){f=Math.min(u.i.length,f);var p=u.l?E(u.l.Na,u.l,u):null;e:{var I=u.i;let S=-1;for(;;){const q=["count="+f];S==-1?0<f?(S=I[0].g,q.push("ofs="+S)):S=0:q.push("ofs="+S);let Ee=!0;for(let He=0;He<f;He++){let pe=I[He].g;const Je=I[He].map;if(pe-=S,0>pe)S=Math.max(0,I[He].g-100),Ee=!1;else try{Ap(Je,q,"req"+pe+"_")}catch{p&&p(Je)}}if(Ee){p=q.join("&");break e}}}return u=u.i.splice(0,f),c.D=u,p}function kc(u){if(!u.g&&!u.u){u.Y=1;var c=u.Fa;be||On(),de||(be(),de=!0),At.add(c,u),u.v=0}}function Bu(u){return u.g||u.u||3<=u.v?!1:(u.Y++,u.u=$r(E(u.Fa,u),Lc(u,u.v)),u.v++,!0)}t.Fa=function(){if(this.u=null,Oc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var u=2*this.R;this.j.info("BP detection timer enabled: "+u),this.A=$r(E(this.ab,this),u)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,st(10),ni(this),Oc(this))};function qu(u){u.A!=null&&(a.clearTimeout(u.A),u.A=null)}function Oc(u){u.g=new ln(u,u.j,"rpc",u.Y),u.m===null&&(u.g.H=u.o),u.g.O=0;var c=Gt(u.qa);we(c,"RID","rpc"),we(c,"SID",u.K),we(c,"AID",u.T),we(c,"CI",u.F?"0":"1"),!u.F&&u.ja&&we(c,"TO",u.ja),we(c,"TYPE","xmlhttp"),Zr(u,c),u.m&&u.o&&Lu(c,u.m,u.o),u.L&&(u.g.I=u.L);var f=u.g;u=u.ia,f.L=1,f.v=Ys(Gt(c)),f.m=null,f.P=!0,cc(f,u)}t.Za=function(){this.C!=null&&(this.C=null,ni(this),Bu(this),st(19))};function si(u){u.C!=null&&(a.clearTimeout(u.C),u.C=null)}function Mc(u,c){var f=null;if(u.g==c){si(u),qu(u),u.g=null;var p=2}else if(Ou(u.h,c))f=c.D,mc(u.h,c),p=1;else return;if(u.G!=0){if(c.o)if(p==1){f=c.m?c.m.length:0,c=Date.now()-c.F;var I=u.B;p=Ks(),ie(p,new ic(p,f)),ri(u)}else kc(u);else if(I=c.s,I==3||I==0&&0<c.X||!(p==1&&xp(u,c)||p==2&&Bu(u)))switch(f&&0<f.length&&(c=u.h,c.i=c.i.concat(f)),I){case 1:jn(u,5);break;case 4:jn(u,10);break;case 3:jn(u,6);break;default:jn(u,2)}}}function Lc(u,c){let f=u.Ta+Math.floor(Math.random()*u.cb);return u.isActive()||(f*=2),f*c}function jn(u,c){if(u.j.info("Error code "+c),c==2){var f=E(u.fb,u),p=u.Xa;const I=!p;p=new qn(p||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Xs(p,"https"),Ys(p),I?Ep(p.toString(),f):Tp(p.toString(),f)}else st(2);u.G=0,u.l&&u.l.sa(c),Uc(u),Vc(u)}t.fb=function(u){u?(this.j.info("Successfully pinged google.com"),st(2)):(this.j.info("Failed to ping google.com"),st(1))};function Uc(u){if(u.G=0,u.ka=[],u.l){const c=gc(u.h);(c.length!=0||u.i.length!=0)&&(L(u.ka,c),L(u.ka,u.i),u.h.i.length=0,k(u.i),u.i.length=0),u.l.ra()}}function Bc(u,c,f){var p=f instanceof qn?Gt(f):new qn(f);if(p.g!="")c&&(p.g=c+"."+p.g),Js(p,p.s);else{var I=a.location;p=I.protocol,c=c?c+"."+I.hostname:I.hostname,I=+I.port;var S=new qn(null);p&&Xs(S,p),c&&(S.g=c),I&&Js(S,I),f&&(S.l=f),p=S}return f=u.D,c=u.ya,f&&c&&we(p,f,c),we(p,"VER",u.la),Zr(u,p),p}function qc(u,c,f){if(c&&!u.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=u.Ca&&!u.pa?new De(new Zs({eb:f})):new De(u.pa),c.Ha(u.J),c}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function jc(){}t=jc.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function ii(){}ii.prototype.g=function(u,c){return new dt(u,c)};function dt(u,c){Z.call(this),this.g=new Pc(c),this.l=u,this.h=c&&c.messageUrlParams||null,u=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(u?u["X-WebChannel-Content-Type"]=c.messageContentType:u={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(u?u["X-WebChannel-Client-Profile"]=c.va:u={"X-WebChannel-Client-Profile":c.va}),this.g.S=u,(u=c&&c.Sb)&&!G(u)&&(this.g.m=u),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!G(c)&&(this.g.D=c,u=this.h,u!==null&&c in u&&(u=this.h,c in u&&delete u[c])),this.j=new or(this)}R(dt,Z),dt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},dt.prototype.close=function(){Uu(this.g)},dt.prototype.o=function(u){var c=this.g;if(typeof u=="string"){var f={};f.__data__=u,u=f}else this.u&&(f={},f.__data__=$e(u),u=f);c.i.push(new lp(c.Ya++,u)),c.G==3&&ri(c)},dt.prototype.N=function(){this.g.l=null,delete this.j,Uu(this.g),delete this.g,dt.aa.N.call(this)};function zc(u){Du.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var c=u.__sm__;if(c){e:{for(const f in c){u=f;break e}u=void 0}(this.i=u)&&(u=this.i,c=c!==null&&u in c?c[u]:void 0),this.data=c}else this.data=u}R(zc,Du);function $c(){Ru.call(this),this.status=1}R($c,Ru);function or(u){this.g=u}R(or,jc),or.prototype.ua=function(){ie(this.g,"a")},or.prototype.ta=function(u){ie(this.g,new zc(u))},or.prototype.sa=function(u){ie(this.g,new $c)},or.prototype.ra=function(){ie(this.g,"b")},ii.prototype.createWebChannel=ii.prototype.g,dt.prototype.send=dt.prototype.o,dt.prototype.open=dt.prototype.m,dt.prototype.close=dt.prototype.close,C0=function(){return new ii},I0=function(){return Ks()},w0=Un,No={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Gs.NO_ERROR=0,Gs.TIMEOUT=8,Gs.HTTP_ERROR=6,Ti=Gs,uc.COMPLETE="complete",A0=uc,tc.EventType=jr,jr.OPEN="a",jr.CLOSE="b",jr.ERROR="c",jr.MESSAGE="d",Z.prototype.listen=Z.prototype.K,rs=tc,De.prototype.listenOnce=De.prototype.L,De.prototype.getLastError=De.prototype.Ka,De.prototype.getLastErrorCode=De.prototype.Ba,De.prototype.getStatus=De.prototype.Z,De.prototype.getResponseJson=De.prototype.Oa,De.prototype.getResponseText=De.prototype.oa,De.prototype.send=De.prototype.ea,De.prototype.setWithCredentials=De.prototype.Ha,v0=De}).apply(typeof li<"u"?li:typeof self<"u"?self:typeof window<"u"?window:{});const jl="@firebase/firestore",zl="4.9.1";/**
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
 */class lt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}lt.UNAUTHENTICATED=new lt(null),lt.GOOGLE_CREDENTIALS=new lt("google-credentials-uid"),lt.FIRST_PARTY=new lt("first-party-uid"),lt.MOCK_USER=new lt("mock-user");/**
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
 */let kr="12.2.0";/**
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
 */const Jn=new Ea("@firebase/firestore");function fr(){return Jn.logLevel}function H(t,...e){if(Jn.logLevel<=oe.DEBUG){const n=e.map(Aa);Jn.debug(`Firestore (${kr}): ${t}`,...n)}}function sn(t,...e){if(Jn.logLevel<=oe.ERROR){const n=e.map(Aa);Jn.error(`Firestore (${kr}): ${t}`,...n)}}function Cs(t,...e){if(Jn.logLevel<=oe.WARN){const n=e.map(Aa);Jn.warn(`Firestore (${kr}): ${t}`,...n)}}function Aa(t){if(typeof t=="string")return t;try{/**
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
 */function ee(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,x0(t,r,n)}function x0(t,e,n){let r=`FIRESTORE (${kr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw sn(r),new Error(r)}function ye(t,e,n,r){let s="Unexpected state";typeof n=="string"?s=n:r=n,t||x0(e,s,r)}function se(t,e){return t}/**
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
 */const N={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class X extends kn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class An{constructor(){this.promise=new Promise(((e,n)=>{this.resolve=e,this.reject=n}))}}/**
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
 */class w2{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class I2{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable((()=>n(lt.UNAUTHENTICATED)))}shutdown(){}}class C2{constructor(e){this.t=e,this.currentUser=lt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){ye(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,n(l)):Promise.resolve();let i=new An;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new An,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const l=i;e.enqueueRetryable((async()=>{await l.promise,await s(this.currentUser)}))},a=l=>{H("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((l=>a(l))),setTimeout((()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?a(l):(H("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new An)}}),0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then((r=>this.i!==e?(H("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ye(typeof r.accessToken=="string",31837,{l:r}),new w2(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ye(e===null||typeof e=="string",2055,{h:e}),new lt(e)}}class x2{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=lt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class S2{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new x2(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable((()=>n(lt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class $l{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class D2{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Kn(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){ye(this.o===void 0,3512);const r=i=>{i.error!=null&&H("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,H("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{H("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):H("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new $l(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((n=>n?(ye(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new $l(n.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function R2(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
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
 */class wa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=R2(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%62))}return r}}function ae(t,e){return t<e?-1:t>e?1:0}function ko(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const s=t.charAt(r),i=e.charAt(r);if(s!==i)return co(s)===co(i)?ae(s,i):co(s)?1:-1}return ae(t.length,e.length)}const P2=55296,V2=57343;function co(t){const e=t.charCodeAt(0);return e>=P2&&e<=V2}function Rr(t,e,n){return t.length===e.length&&t.every(((r,s)=>n(r,e[s])))}/**
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
 */const Hl="__name__";class Pt{constructor(e,n,r){n===void 0?n=0:n>e.length&&ee(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&ee(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Pt.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Pt?e.forEach((r=>{n.push(r)})):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=Pt.compareSegments(e.get(s),n.get(s));if(i!==0)return i}return ae(e.length,n.length)}static compareSegments(e,n){const r=Pt.isNumericId(e),s=Pt.isNumericId(n);return r&&!s?-1:!r&&s?1:r&&s?Pt.extractNumericId(e).compare(Pt.extractNumericId(n)):ko(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return vn.fromString(e.substring(4,e.length-2))}}class Ce extends Pt{construct(e,n,r){return new Ce(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new X(N.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter((s=>s.length>0)))}return new Ce(n)}static emptyPath(){return new Ce([])}}const F2=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class We extends Pt{construct(e,n,r){return new We(e,n,r)}static isValidIdentifier(e){return F2.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),We.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Hl}static keyField(){return new We([Hl])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new X(N.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const a=e[s];if(a==="\\"){if(s+1===e.length)throw new X(N.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new X(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(r+=a,s++):(i(),s++)}if(i(),o)throw new X(N.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new We(n)}static emptyPath(){return new We([])}}/**
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
 */class Y{constructor(e){this.path=e}static fromPath(e){return new Y(Ce.fromString(e))}static fromName(e){return new Y(Ce.fromString(e).popFirst(5))}static empty(){return new Y(Ce.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ce.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Ce.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Y(new Ce(e.slice()))}}/**
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
 */function N2(t,e,n){if(!n)throw new X(N.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function k2(t,e,n,r){if(e===!0&&r===!0)throw new X(N.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Kl(t){if(!Y.isDocumentKey(t))throw new X(N.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function S0(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function Ia(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ee(12329,{type:typeof t})}function Li(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new X(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Ia(t);throw new X(N.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */function Ve(t,e){const n={typeString:t};return e&&(n.value=e),n}function Ls(t,e){if(!S0(t))throw new X(N.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const o=t[r];if(s&&typeof o!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new X(N.INVALID_ARGUMENT,n);return!0}/**
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
 */const Gl=-62135596800,Wl=1e6;class Ie{static now(){return Ie.fromMillis(Date.now())}static fromDate(e){return Ie.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*Wl);return new Ie(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new X(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new X(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<Gl)throw new X(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new X(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Wl}_compareTo(e){return this.seconds===e.seconds?ae(this.nanoseconds,e.nanoseconds):ae(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ie._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ls(e,Ie._jsonSchema))return new Ie(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Gl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ie._jsonSchemaVersion="firestore/timestamp/1.0",Ie._jsonSchema={type:Ve("string",Ie._jsonSchemaVersion),seconds:Ve("number"),nanoseconds:Ve("number")};/**
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
 */class ne{static fromTimestamp(e){return new ne(e)}static min(){return new ne(new Ie(0,0))}static max(){return new ne(new Ie(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const xs=-1;function O2(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=ne.fromTimestamp(r===1e9?new Ie(n+1,0):new Ie(n,r));return new Sn(s,Y.empty(),e)}function M2(t){return new Sn(t.readTime,t.key,xs)}class Sn{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Sn(ne.min(),Y.empty(),xs)}static max(){return new Sn(ne.max(),Y.empty(),xs)}}function L2(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=Y.comparator(t.documentKey,e.documentKey),n!==0?n:ae(t.largestBatchId,e.largestBatchId))}/**
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
 */const U2="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class B2{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
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
 */async function Or(t){if(t.code!==N.FAILED_PRECONDITION||t.message!==U2)throw t;H("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)}),(n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)}))}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&ee(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new P(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}}))}toPromise(){return new Promise(((e,n)=>{this.next(e,n)}))}wrapUserFunction(e){try{const n=e();return n instanceof P?n:P.resolve(n)}catch(n){return P.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction((()=>e(n))):P.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction((()=>e(n))):P.reject(n)}static resolve(e){return new P(((n,r)=>{n(e)}))}static reject(e){return new P(((n,r)=>{r(e)}))}static waitFor(e){return new P(((n,r)=>{let s=0,i=0,o=!1;e.forEach((a=>{++s,a.next((()=>{++i,o&&i===s&&n()}),(l=>r(l)))})),o=!0,i===s&&n()}))}static or(e){let n=P.resolve(!1);for(const r of e)n=n.next((s=>s?P.resolve(s):r()));return n}static forEach(e,n){const r=[];return e.forEach(((s,i)=>{r.push(n.call(this,s,i))})),this.waitFor(r)}static mapArray(e,n){return new P(((r,s)=>{const i=e.length,o=new Array(i);let a=0;for(let l=0;l<i;l++){const h=l;n(e[h]).next((d=>{o[h]=d,++a,a===i&&r(o)}),(d=>s(d)))}}))}static doWhile(e,n){return new P(((r,s)=>{const i=()=>{e()===!0?n().next((()=>{i()}),s):r()};i()}))}}function q2(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Mr(t){return t.name==="IndexedDbTransactionError"}/**
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
 */class du{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>n.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}du.ce=-1;/**
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
 */const Ca=-1;function pu(t){return t==null}function Ui(t){return t===0&&1/t==-1/0}function j2(t){return typeof t=="number"&&Number.isInteger(t)&&!Ui(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */const D0="";function z2(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Ql(e)),e=$2(t.get(n),e);return Ql(e)}function $2(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const i=t.charAt(s);switch(i){case"\0":n+="";break;case D0:n+="";break;default:n+=i}}return n}function Ql(t){return t+D0+""}/**
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
 */function Xl(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function er(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function R0(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class Se{constructor(e,n){this.comparator=e,this.root=n||Ke.EMPTY}insert(e,n){return new Se(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Ke.BLACK,null,null))}remove(e){return new Se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ke.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((n,r)=>(e(n,r),!1)))}toString(){const e=[];return this.inorderTraversal(((n,r)=>(e.push(`${n}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new hi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new hi(this.root,e,this.comparator,!1)}getReverseIterator(){return new hi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new hi(this.root,e,this.comparator,!0)}}class hi{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ke{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??Ke.RED,this.left=s??Ke.EMPTY,this.right=i??Ke.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new Ke(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ke.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return Ke.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ke.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ke.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ee(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ee(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw ee(27949);return e+(this.isRed()?0:1)}}Ke.EMPTY=null,Ke.RED=!0,Ke.BLACK=!1;Ke.EMPTY=new class{constructor(){this.size=0}get key(){throw ee(57766)}get value(){throw ee(16141)}get color(){throw ee(16727)}get left(){throw ee(29726)}get right(){throw ee(36894)}copy(e,n,r,s,i){return this}insert(e,n,r){return new Ke(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Me{constructor(e){this.comparator=e,this.data=new Se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((n,r)=>(e(n),!1)))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Jl(this.data.getIterator())}getIteratorFrom(e){return new Jl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach((r=>{n=n.add(r)})),n}isEqual(e){if(!(e instanceof Me)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((n=>{e.push(n)})),e}toString(){const e=[];return this.forEach((n=>e.push(n))),"SortedSet("+e.toString()+")"}copy(e){const n=new Me(this.comparator);return n.data=e,n}}class Jl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class It{constructor(e){this.fields=e,e.sort(We.comparator)}static empty(){return new It([])}unionWith(e){let n=new Me(We.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new It(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Rr(this.fields,e.fields,((n,r)=>n.isEqual(r)))}}/**
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
 */class P0 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Qe{constructor(e){this.binaryString=e}static fromBase64String(e){const n=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new P0("Invalid base64 string: "+i):i}})(e);return new Qe(n)}static fromUint8Array(e){const n=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new Qe(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(n){return btoa(n)})(this.binaryString)}toUint8Array(){return(function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ae(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Qe.EMPTY_BYTE_STRING=new Qe("");const H2=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Dn(t){if(ye(!!t,39018),typeof t=="string"){let e=0;const n=H2.exec(t);if(ye(!!n,46558,{timestamp:t}),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Re(t.seconds),nanos:Re(t.nanos)}}function Re(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Rn(t){return typeof t=="string"?Qe.fromBase64String(t):Qe.fromUint8Array(t)}/**
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
 */const V0="server_timestamp",F0="__type__",N0="__previous_value__",k0="__local_write_time__";function xa(t){return(t?.mapValue?.fields||{})[F0]?.stringValue===V0}function mu(t){const e=t.mapValue.fields[N0];return xa(e)?mu(e):e}function Ss(t){const e=Dn(t.mapValue.fields[k0].timestampValue);return new Ie(e.seconds,e.nanos)}/**
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
 */class K2{constructor(e,n,r,s,i,o,a,l,h,d){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=l,this.useFetchStreams=h,this.isUsingEmulator=d}}const Oo="(default)";class Ds{constructor(e,n){this.projectId=e,this.database=n||Oo}static empty(){return new Ds("","")}get isDefaultDatabase(){return this.database===Oo}isEqual(e){return e instanceof Ds&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const O0="__type__",G2="__max__",fi={mapValue:{}},M0="__vector__",Bi="value";function Pn(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?xa(t)?4:Q2(t)?9007199254740991:W2(t)?10:11:ee(28295,{value:t})}function zt(t,e){if(t===e)return!0;const n=Pn(t);if(n!==Pn(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Ss(t).isEqual(Ss(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Dn(s.timestampValue),a=Dn(i.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos})(t,e);case 5:return t.stringValue===e.stringValue;case 6:return(function(s,i){return Rn(s.bytesValue).isEqual(Rn(i.bytesValue))})(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return(function(s,i){return Re(s.geoPointValue.latitude)===Re(i.geoPointValue.latitude)&&Re(s.geoPointValue.longitude)===Re(i.geoPointValue.longitude)})(t,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return Re(s.integerValue)===Re(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Re(s.doubleValue),a=Re(i.doubleValue);return o===a?Ui(o)===Ui(a):isNaN(o)&&isNaN(a)}return!1})(t,e);case 9:return Rr(t.arrayValue.values||[],e.arrayValue.values||[],zt);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},a=i.mapValue.fields||{};if(Xl(o)!==Xl(a))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(a[l]===void 0||!zt(o[l],a[l])))return!1;return!0})(t,e);default:return ee(52216,{left:t})}}function Rs(t,e){return(t.values||[]).find((n=>zt(n,e)))!==void 0}function Pr(t,e){if(t===e)return 0;const n=Pn(t),r=Pn(e);if(n!==r)return ae(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ae(t.booleanValue,e.booleanValue);case 2:return(function(i,o){const a=Re(i.integerValue||i.doubleValue),l=Re(o.integerValue||o.doubleValue);return a<l?-1:a>l?1:a===l?0:isNaN(a)?isNaN(l)?0:-1:1})(t,e);case 3:return Yl(t.timestampValue,e.timestampValue);case 4:return Yl(Ss(t),Ss(e));case 5:return ko(t.stringValue,e.stringValue);case 6:return(function(i,o){const a=Rn(i),l=Rn(o);return a.compareTo(l)})(t.bytesValue,e.bytesValue);case 7:return(function(i,o){const a=i.split("/"),l=o.split("/");for(let h=0;h<a.length&&h<l.length;h++){const d=ae(a[h],l[h]);if(d!==0)return d}return ae(a.length,l.length)})(t.referenceValue,e.referenceValue);case 8:return(function(i,o){const a=ae(Re(i.latitude),Re(o.latitude));return a!==0?a:ae(Re(i.longitude),Re(o.longitude))})(t.geoPointValue,e.geoPointValue);case 9:return Zl(t.arrayValue,e.arrayValue);case 10:return(function(i,o){const a=i.fields||{},l=o.fields||{},h=a[Bi]?.arrayValue,d=l[Bi]?.arrayValue,m=ae(h?.values?.length||0,d?.values?.length||0);return m!==0?m:Zl(h,d)})(t.mapValue,e.mapValue);case 11:return(function(i,o){if(i===fi.mapValue&&o===fi.mapValue)return 0;if(i===fi.mapValue)return 1;if(o===fi.mapValue)return-1;const a=i.fields||{},l=Object.keys(a),h=o.fields||{},d=Object.keys(h);l.sort(),d.sort();for(let m=0;m<l.length&&m<d.length;++m){const E=ko(l[m],d[m]);if(E!==0)return E;const x=Pr(a[l[m]],h[d[m]]);if(x!==0)return x}return ae(l.length,d.length)})(t.mapValue,e.mapValue);default:throw ee(23264,{he:n})}}function Yl(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ae(t,e);const n=Dn(t),r=Dn(e),s=ae(n.seconds,r.seconds);return s!==0?s:ae(n.nanos,r.nanos)}function Zl(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=Pr(n[s],r[s]);if(i)return i}return ae(n.length,r.length)}function Vr(t){return Mo(t)}function Mo(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?(function(n){const r=Dn(n);return`time(${r.seconds},${r.nanos})`})(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?(function(n){return Rn(n).toBase64()})(t.bytesValue):"referenceValue"in t?(function(n){return Y.fromName(n).toString()})(t.referenceValue):"geoPointValue"in t?(function(n){return`geo(${n.latitude},${n.longitude})`})(t.geoPointValue):"arrayValue"in t?(function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=Mo(i);return r+"]"})(t.arrayValue):"mapValue"in t?(function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Mo(n.fields[o])}`;return s+"}"})(t.mapValue):ee(61005,{value:t})}function vi(t){switch(Pn(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=mu(t);return e?16+vi(e):16;case 5:return 2*t.stringValue.length;case 6:return Rn(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+vi(i)),0)})(t.arrayValue);case 10:case 11:return(function(r){let s=0;return er(r.fields,((i,o)=>{s+=i.length+vi(o)})),s})(t.mapValue);default:throw ee(13486,{value:t})}}function Lo(t){return!!t&&"integerValue"in t}function Sa(t){return!!t&&"arrayValue"in t}function eh(t){return!!t&&"nullValue"in t}function th(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ai(t){return!!t&&"mapValue"in t}function W2(t){return(t?.mapValue?.fields||{})[O0]?.stringValue===M0}function ds(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return er(t.mapValue.fields,((n,r)=>e.mapValue.fields[n]=ds(r))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=ds(t.arrayValue.values[n]);return e}return{...t}}function Q2(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===G2}/**
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
 */class yt{constructor(e){this.value=e}static empty(){return new yt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Ai(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=ds(n)}setAll(e){let n=We.emptyPath(),r={},s=[];e.forEach(((o,a)=>{if(!n.isImmediateParentOf(a)){const l=this.getFieldsMap(n);this.applyChanges(l,r,s),r={},s=[],n=a.popLast()}o?r[a.lastSegment()]=ds(o):s.push(a.lastSegment())}));const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());Ai(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return zt(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];Ai(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){er(n,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new yt(ds(this.value))}}function L0(t){const e=[];return er(t.fields,((n,r)=>{const s=new We([n]);if(Ai(r)){const i=L0(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new It(e)}/**
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
 */class tt{constructor(e,n,r,s,i,o,a){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new tt(e,0,ne.min(),ne.min(),ne.min(),yt.empty(),0)}static newFoundDocument(e,n,r,s){return new tt(e,1,n,ne.min(),r,s,0)}static newNoDocument(e,n){return new tt(e,2,n,ne.min(),ne.min(),yt.empty(),0)}static newUnknownDocument(e,n){return new tt(e,3,n,ne.min(),ne.min(),yt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ne.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=yt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=yt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ne.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof tt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new tt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class qi{constructor(e,n){this.position=e,this.inclusive=n}}function nh(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=Y.comparator(Y.fromName(o.referenceValue),n.key):r=Pr(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function rh(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!zt(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class ji{constructor(e,n="asc"){this.field=e,this.dir=n}}function X2(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
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
 */class U0{}class Oe extends U0{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new Y2(e,n,r):n==="array-contains"?new ty(e,r):n==="in"?new ny(e,r):n==="not-in"?new ry(e,r):n==="array-contains-any"?new sy(e,r):new Oe(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new Z2(e,r):new ey(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(Pr(n,this.value)):n!==null&&Pn(this.value)===Pn(n)&&this.matchesComparison(Pr(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ee(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class $t extends U0{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new $t(e,n)}matches(e){return B0(this)?this.filters.find((n=>!n.matches(e)))===void 0:this.filters.find((n=>n.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,n)=>e.concat(n.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function B0(t){return t.op==="and"}function q0(t){return J2(t)&&B0(t)}function J2(t){for(const e of t.filters)if(e instanceof $t)return!1;return!0}function Uo(t){if(t instanceof Oe)return t.field.canonicalString()+t.op.toString()+Vr(t.value);if(q0(t))return t.filters.map((e=>Uo(e))).join(",");{const e=t.filters.map((n=>Uo(n))).join(",");return`${t.op}(${e})`}}function j0(t,e){return t instanceof Oe?(function(r,s){return s instanceof Oe&&r.op===s.op&&r.field.isEqual(s.field)&&zt(r.value,s.value)})(t,e):t instanceof $t?(function(r,s){return s instanceof $t&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,a)=>i&&j0(o,s.filters[a])),!0):!1})(t,e):void ee(19439)}function z0(t){return t instanceof Oe?(function(n){return`${n.field.canonicalString()} ${n.op} ${Vr(n.value)}`})(t):t instanceof $t?(function(n){return n.op.toString()+" {"+n.getFilters().map(z0).join(" ,")+"}"})(t):"Filter"}class Y2 extends Oe{constructor(e,n,r){super(e,n,r),this.key=Y.fromName(r.referenceValue)}matches(e){const n=Y.comparator(e.key,this.key);return this.matchesComparison(n)}}class Z2 extends Oe{constructor(e,n){super(e,"in",n),this.keys=$0("in",n)}matches(e){return this.keys.some((n=>n.isEqual(e.key)))}}class ey extends Oe{constructor(e,n){super(e,"not-in",n),this.keys=$0("not-in",n)}matches(e){return!this.keys.some((n=>n.isEqual(e.key)))}}function $0(t,e){return(e.arrayValue?.values||[]).map((n=>Y.fromName(n.referenceValue)))}class ty extends Oe{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Sa(n)&&Rs(n.arrayValue,this.value)}}class ny extends Oe{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Rs(this.value.arrayValue,n)}}class ry extends Oe{constructor(e,n){super(e,"not-in",n)}matches(e){if(Rs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!Rs(this.value.arrayValue,n)}}class sy extends Oe{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Sa(n)||!n.arrayValue.values)&&n.arrayValue.values.some((r=>Rs(this.value.arrayValue,r)))}}/**
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
 */class iy{constructor(e,n=null,r=[],s=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.Te=null}}function sh(t,e=null,n=[],r=[],s=null,i=null,o=null){return new iy(t,e,n,r,s,i,o)}function Da(t){const e=se(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map((r=>Uo(r))).join(","),n+="|ob:",n+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),pu(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map((r=>Vr(r))).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map((r=>Vr(r))).join(",")),e.Te=n}return e.Te}function Ra(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!X2(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!j0(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!rh(t.startAt,e.startAt)&&rh(t.endAt,e.endAt)}function Bo(t){return Y.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
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
 */class gu{constructor(e,n=null,r=[],s=[],i=null,o="F",a=null,l=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=l,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function uy(t,e,n,r,s,i,o,a){return new gu(t,e,n,r,s,i,o,a)}function H0(t){return new gu(t)}function ih(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function oy(t){return t.collectionGroup!==null}function ps(t){const e=se(t);if(e.Ie===null){e.Ie=[];const n=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new Me(We.comparator);return o.filters.forEach((l=>{l.getFlattenedFilters().forEach((h=>{h.isInequality()&&(a=a.add(h.field))}))})),a})(e).forEach((i=>{n.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new ji(i,r))})),n.has(We.keyField().canonicalString())||e.Ie.push(new ji(We.keyField(),r))}return e.Ie}function Mt(t){const e=se(t);return e.Ee||(e.Ee=ay(e,ps(t))),e.Ee}function ay(t,e){if(t.limitType==="F")return sh(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new ji(s.field,i)}));const n=t.endAt?new qi(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new qi(t.startAt.position,t.startAt.inclusive):null;return sh(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function qo(t,e,n){return new gu(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function _u(t,e){return Ra(Mt(t),Mt(e))&&t.limitType===e.limitType}function K0(t){return`${Da(Mt(t))}|lt:${t.limitType}`}function dr(t){return`Query(target=${(function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map((s=>z0(s))).join(", ")}]`),pu(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map((s=>Vr(s))).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map((s=>Vr(s))).join(",")),`Target(${r})`})(Mt(t))}; limitType=${t.limitType})`}function yu(t,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):Y.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(t,e)&&(function(r,s){for(const i of ps(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(t,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(t,e)&&(function(r,s){return!(r.startAt&&!(function(o,a,l){const h=nh(o,a,l);return o.inclusive?h<=0:h<0})(r.startAt,ps(r),s)||r.endAt&&!(function(o,a,l){const h=nh(o,a,l);return o.inclusive?h>=0:h>0})(r.endAt,ps(r),s))})(t,e)}function cy(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function G0(t){return(e,n)=>{let r=!1;for(const s of ps(t)){const i=ly(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function ly(t,e,n){const r=t.field.isKeyField()?Y.comparator(e.key,n.key):(function(i,o,a){const l=o.data.field(i),h=a.data.field(i);return l!==null&&h!==null?Pr(l,h):ee(42886)})(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return ee(19790,{direction:t.dir})}}/**
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
 */class tr{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){er(this.inner,((n,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return R0(this.inner)}size(){return this.innerSize}}/**
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
 */const hy=new Se(Y.comparator);function un(){return hy}const W0=new Se(Y.comparator);function ss(...t){let e=W0;for(const n of t)e=e.insert(n.key,n);return e}function Q0(t){let e=W0;return t.forEach(((n,r)=>e=e.insert(n,r.overlayedDocument))),e}function Gn(){return ms()}function X0(){return ms()}function ms(){return new tr((t=>t.toString()),((t,e)=>t.isEqual(e)))}const fy=new Se(Y.comparator),dy=new Me(Y.comparator);function ce(...t){let e=dy;for(const n of t)e=e.add(n);return e}const py=new Me(ae);function my(){return py}/**
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
 */function Pa(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ui(e)?"-0":e}}function J0(t){return{integerValue:""+t}}function gy(t,e){return j2(e)?J0(e):Pa(t,e)}/**
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
 */class bu{constructor(){this._=void 0}}function _y(t,e,n){return t instanceof Ps?(function(s,i){const o={fields:{[F0]:{stringValue:V0},[k0]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&xa(i)&&(i=mu(i)),i&&(o.fields[N0]=i),{mapValue:o}})(n,e):t instanceof Vs?Z0(t,e):t instanceof Fs?ed(t,e):(function(s,i){const o=Y0(s,i),a=uh(o)+uh(s.Ae);return Lo(o)&&Lo(s.Ae)?J0(a):Pa(s.serializer,a)})(t,e)}function yy(t,e,n){return t instanceof Vs?Z0(t,e):t instanceof Fs?ed(t,e):n}function Y0(t,e){return t instanceof zi?(function(r){return Lo(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class Ps extends bu{}class Vs extends bu{constructor(e){super(),this.elements=e}}function Z0(t,e){const n=td(e);for(const r of t.elements)n.some((s=>zt(s,r)))||n.push(r);return{arrayValue:{values:n}}}class Fs extends bu{constructor(e){super(),this.elements=e}}function ed(t,e){let n=td(e);for(const r of t.elements)n=n.filter((s=>!zt(s,r)));return{arrayValue:{values:n}}}class zi extends bu{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function uh(t){return Re(t.integerValue||t.doubleValue)}function td(t){return Sa(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
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
 */class by{constructor(e,n){this.field=e,this.transform=n}}function Ey(t,e){return t.field.isEqual(e.field)&&(function(r,s){return r instanceof Vs&&s instanceof Vs||r instanceof Fs&&s instanceof Fs?Rr(r.elements,s.elements,zt):r instanceof zi&&s instanceof zi?zt(r.Ae,s.Ae):r instanceof Ps&&s instanceof Ps})(t.transform,e.transform)}class Ty{constructor(e,n){this.version=e,this.transformResults=n}}class Lt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Lt}static exists(e){return new Lt(void 0,e)}static updateTime(e){return new Lt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function wi(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Eu{}function nd(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Va(t.key,Lt.none()):new Us(t.key,t.data,Lt.none());{const n=t.data,r=yt.empty();let s=new Me(We.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new nr(t.key,r,new It(s.toArray()),Lt.none())}}function vy(t,e,n){t instanceof Us?(function(s,i,o){const a=s.value.clone(),l=ah(s.fieldTransforms,i,o.transformResults);a.setAll(l),i.convertToFoundDocument(o.version,a).setHasCommittedMutations()})(t,e,n):t instanceof nr?(function(s,i,o){if(!wi(s.precondition,i))return void i.convertToUnknownDocument(o.version);const a=ah(s.fieldTransforms,i,o.transformResults),l=i.data;l.setAll(rd(s)),l.setAll(a),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()})(t,e,n):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,n)}function gs(t,e,n,r){return t instanceof Us?(function(i,o,a,l){if(!wi(i.precondition,o))return a;const h=i.value.clone(),d=ch(i.fieldTransforms,l,o);return h.setAll(d),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(t,e,n,r):t instanceof nr?(function(i,o,a,l){if(!wi(i.precondition,o))return a;const h=ch(i.fieldTransforms,l,o),d=o.data;return d.setAll(rd(i)),d.setAll(h),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),a===null?null:a.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(t,e,n,r):(function(i,o,a){return wi(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a})(t,e,n)}function Ay(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=Y0(r.transform,s||null);i!=null&&(n===null&&(n=yt.empty()),n.set(r.field,i))}return n||null}function oh(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Rr(r,s,((i,o)=>Ey(i,o)))})(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Us extends Eu{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class nr extends Eu{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function rd(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}})),e}function ah(t,e,n){const r=new Map;ye(t.length===n.length,32656,{Re:n.length,Ve:t.length});for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,yy(o,a,n[s]))}return r}function ch(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,_y(i,o,e))}return r}class Va extends Eu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class wy extends Eu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Iy{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&vy(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=gs(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=gs(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=X0();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(s.key)?null:a;const l=nd(o,a);l!==null&&r.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(ne.min())})),r}keys(){return this.mutations.reduce(((e,n)=>e.add(n.key)),ce())}isEqual(e){return this.batchId===e.batchId&&Rr(this.mutations,e.mutations,((n,r)=>oh(n,r)))&&Rr(this.baseMutations,e.baseMutations,((n,r)=>oh(n,r)))}}class Fa{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){ye(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return fy})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Fa(e,n,r,s)}}/**
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
 */class Cy{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class xy{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
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
 */var Pe,fe;function Sy(t){switch(t){case N.OK:return ee(64938);case N.CANCELLED:case N.UNKNOWN:case N.DEADLINE_EXCEEDED:case N.RESOURCE_EXHAUSTED:case N.INTERNAL:case N.UNAVAILABLE:case N.UNAUTHENTICATED:return!1;case N.INVALID_ARGUMENT:case N.NOT_FOUND:case N.ALREADY_EXISTS:case N.PERMISSION_DENIED:case N.FAILED_PRECONDITION:case N.ABORTED:case N.OUT_OF_RANGE:case N.UNIMPLEMENTED:case N.DATA_LOSS:return!0;default:return ee(15467,{code:t})}}function sd(t){if(t===void 0)return sn("GRPC error has no .code"),N.UNKNOWN;switch(t){case Pe.OK:return N.OK;case Pe.CANCELLED:return N.CANCELLED;case Pe.UNKNOWN:return N.UNKNOWN;case Pe.DEADLINE_EXCEEDED:return N.DEADLINE_EXCEEDED;case Pe.RESOURCE_EXHAUSTED:return N.RESOURCE_EXHAUSTED;case Pe.INTERNAL:return N.INTERNAL;case Pe.UNAVAILABLE:return N.UNAVAILABLE;case Pe.UNAUTHENTICATED:return N.UNAUTHENTICATED;case Pe.INVALID_ARGUMENT:return N.INVALID_ARGUMENT;case Pe.NOT_FOUND:return N.NOT_FOUND;case Pe.ALREADY_EXISTS:return N.ALREADY_EXISTS;case Pe.PERMISSION_DENIED:return N.PERMISSION_DENIED;case Pe.FAILED_PRECONDITION:return N.FAILED_PRECONDITION;case Pe.ABORTED:return N.ABORTED;case Pe.OUT_OF_RANGE:return N.OUT_OF_RANGE;case Pe.UNIMPLEMENTED:return N.UNIMPLEMENTED;case Pe.DATA_LOSS:return N.DATA_LOSS;default:return ee(39323,{code:t})}}(fe=Pe||(Pe={}))[fe.OK=0]="OK",fe[fe.CANCELLED=1]="CANCELLED",fe[fe.UNKNOWN=2]="UNKNOWN",fe[fe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",fe[fe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",fe[fe.NOT_FOUND=5]="NOT_FOUND",fe[fe.ALREADY_EXISTS=6]="ALREADY_EXISTS",fe[fe.PERMISSION_DENIED=7]="PERMISSION_DENIED",fe[fe.UNAUTHENTICATED=16]="UNAUTHENTICATED",fe[fe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",fe[fe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",fe[fe.ABORTED=10]="ABORTED",fe[fe.OUT_OF_RANGE=11]="OUT_OF_RANGE",fe[fe.UNIMPLEMENTED=12]="UNIMPLEMENTED",fe[fe.INTERNAL=13]="INTERNAL",fe[fe.UNAVAILABLE=14]="UNAVAILABLE",fe[fe.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function Dy(){return new TextEncoder}/**
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
 */const Ry=new vn([4294967295,4294967295],0);function lh(t){const e=Dy().encode(t),n=new T0;return n.update(e),new Uint8Array(n.digest())}function hh(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new vn([n,r],0),new vn([s,i],0)]}class Na{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new is(`Invalid padding: ${n}`);if(r<0)throw new is(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new is(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new is(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=vn.fromNumber(this.ge)}ye(e,n,r){let s=e.add(n.multiply(vn.fromNumber(r)));return s.compare(Ry)===1&&(s=new vn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=lh(e),[r,s]=hh(n);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Na(i,s,n);return r.forEach((a=>o.insert(a))),o}insert(e){if(this.ge===0)return;const n=lh(e),[r,s]=hh(n);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class is extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Tu{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,Bs.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Tu(ne.min(),s,new Se(ae),un(),ce())}}class Bs{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Bs(r,n,ce(),ce(),ce())}}/**
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
 */class Ii{constructor(e,n,r,s){this.be=e,this.removedTargetIds=n,this.key=r,this.De=s}}class id{constructor(e,n){this.targetId=e,this.Ce=n}}class ud{constructor(e,n,r=Qe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class fh{constructor(){this.ve=0,this.Fe=dh(),this.Me=Qe.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=ce(),n=ce(),r=ce();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:ee(38017,{changeType:i})}})),new Bs(this.Me,this.xe,e,n,r)}qe(){this.Oe=!1,this.Fe=dh()}Qe(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,ye(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Py{constructor(e){this.Ge=e,this.ze=new Map,this.je=un(),this.Je=di(),this.He=di(),this.Ye=new Se(ae)}Ze(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Xe(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,(n=>{const r=this.nt(n);switch(e.state){case 0:this.rt(n)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),r.Le(e.resumeToken));break;default:ee(56790,{state:e.state})}}))}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach(((r,s)=>{this.rt(s)&&n(s)}))}st(e){const n=e.targetId,r=e.Ce.count,s=this.ot(n);if(s){const i=s.target;if(Bo(i))if(r===0){const o=new Y(i.path);this.et(n,o,tt.newNoDocument(o,ne.min()))}else ye(r===1,20013,{expectedCount:r});else{const o=this._t(n);if(o!==r){const a=this.ut(e),l=a?this.ct(a,e,o):1;if(l!==0){this.it(n);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(n,h)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,a;try{o=Rn(r).toUint8Array()}catch(l){if(l instanceof P0)return Cs("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{a=new Na(o,s,i)}catch(l){return Cs(l instanceof is?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return a.ge===0?null:a}ct(e,n,r){return n.Ce.count===r-this.Pt(e,n.targetId)?0:2}Pt(e,n){const r=this.Ge.getRemoteKeysForTarget(n);let s=0;return r.forEach((i=>{const o=this.Ge.ht(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(a)||(this.et(n,i,null),s++)})),s}Tt(e){const n=new Map;this.ze.forEach(((i,o)=>{const a=this.ot(o);if(a){if(i.current&&Bo(a.target)){const l=new Y(a.target.path);this.It(l).has(o)||this.Et(o,l)||this.et(o,l,tt.newNoDocument(l,e))}i.Be&&(n.set(o,i.ke()),i.qe())}}));let r=ce();this.He.forEach(((i,o)=>{let a=!0;o.forEachWhile((l=>{const h=this.ot(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)})),a&&(r=r.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new Tu(e,n,this.Ye,this.je,r);return this.je=un(),this.Je=di(),this.He=di(),this.Ye=new Se(ae),s}Xe(e,n){if(!this.rt(e))return;const r=this.Et(e,n.key)?2:0;this.nt(e).Qe(n.key,r),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.It(n.key).add(e)),this.He=this.He.insert(n.key,this.dt(n.key).add(e))}et(e,n,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,n)?s.Qe(n,1):s.$e(n),this.He=this.He.insert(n,this.dt(n).delete(e)),this.He=this.He.insert(n,this.dt(n).add(e)),r&&(this.je=this.je.insert(n,r))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let n=this.ze.get(e);return n||(n=new fh,this.ze.set(e,n)),n}dt(e){let n=this.He.get(e);return n||(n=new Me(ae),this.He=this.He.insert(e,n)),n}It(e){let n=this.Je.get(e);return n||(n=new Me(ae),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||H("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new fh),this.Ge.getRemoteKeysForTarget(e).forEach((n=>{this.et(e,n,null)}))}Et(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function di(){return new Se(Y.comparator)}function dh(){return new Se(Y.comparator)}const Vy={asc:"ASCENDING",desc:"DESCENDING"},Fy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Ny={and:"AND",or:"OR"};class ky{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function jo(t,e){return t.useProto3Json||pu(e)?e:{value:e}}function $i(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function od(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Oy(t,e){return $i(t,e.toTimestamp())}function Ut(t){return ye(!!t,49232),ne.fromTimestamp((function(n){const r=Dn(n);return new Ie(r.seconds,r.nanos)})(t))}function ka(t,e){return zo(t,e).canonicalString()}function zo(t,e){const n=(function(s){return new Ce(["projects",s.projectId,"databases",s.database])})(t).child("documents");return e===void 0?n:n.child(e)}function ad(t){const e=Ce.fromString(t);return ye(dd(e),10190,{key:e.toString()}),e}function $o(t,e){return ka(t.databaseId,e.path)}function lo(t,e){const n=ad(e);if(n.get(1)!==t.databaseId.projectId)throw new X(N.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new X(N.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Y(ld(n))}function cd(t,e){return ka(t.databaseId,e)}function My(t){const e=ad(t);return e.length===4?Ce.emptyPath():ld(e)}function Ho(t){return new Ce(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function ld(t){return ye(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function ph(t,e,n){return{name:$o(t,e),fields:n.value.mapValue.fields}}function Ly(t,e){let n;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:ee(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,d){return h.useProto3Json?(ye(d===void 0||typeof d=="string",58123),Qe.fromBase64String(d||"")):(ye(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Qe.fromUint8Array(d||new Uint8Array))})(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&(function(h){const d=h.code===void 0?N.UNKNOWN:sd(h.code);return new X(d,h.message||"")})(o);n=new ud(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=lo(t,r.document.name),i=Ut(r.document.updateTime),o=r.document.createTime?Ut(r.document.createTime):ne.min(),a=new yt({mapValue:{fields:r.document.fields}}),l=tt.newFoundDocument(s,i,o,a),h=r.targetIds||[],d=r.removedTargetIds||[];n=new Ii(h,d,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=lo(t,r.document),i=r.readTime?Ut(r.readTime):ne.min(),o=tt.newNoDocument(s,i),a=r.removedTargetIds||[];n=new Ii([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=lo(t,r.document),i=r.removedTargetIds||[];n=new Ii([],i,s,null)}else{if(!("filter"in e))return ee(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new xy(s,i),a=r.targetId;n=new id(a,o)}}return n}function Uy(t,e){let n;if(e instanceof Us)n={update:ph(t,e.key,e.value)};else if(e instanceof Va)n={delete:$o(t,e.key)};else if(e instanceof nr)n={update:ph(t,e.key,e.data),updateMask:Wy(e.fieldMask)};else{if(!(e instanceof wy))return ee(16599,{Vt:e.type});n={verify:$o(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((r=>(function(i,o){const a=o.transform;if(a instanceof Ps)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof Vs)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof Fs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof zi)return{fieldPath:o.field.canonicalString(),increment:a.Ae};throw ee(20930,{transform:o.transform})})(0,r)))),e.precondition.isNone||(n.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Oy(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ee(27497)})(t,e.precondition)),n}function By(t,e){return t&&t.length>0?(ye(e!==void 0,14353),t.map((n=>(function(s,i){let o=s.updateTime?Ut(s.updateTime):Ut(i);return o.isEqual(ne.min())&&(o=Ut(i)),new Ty(o,s.transformResults||[])})(n,e)))):[]}function qy(t,e){return{documents:[cd(t,e.path)]}}function jy(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=cd(t,s);const i=(function(h){if(h.length!==0)return fd($t.create(h,"and"))})(e.filters);i&&(n.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((d=>(function(E){return{field:pr(E.field),direction:Hy(E.dir)}})(d)))})(e.orderBy);o&&(n.structuredQuery.orderBy=o);const a=jo(t,e.limit);return a!==null&&(n.structuredQuery.limit=a),e.startAt&&(n.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(n.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:n,parent:s}}function zy(t){let e=My(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){ye(r===1,65062);const d=n.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];n.where&&(i=(function(m){const E=hd(m);return E instanceof $t&&q0(E)?E.getFilters():[E]})(n.where));let o=[];n.orderBy&&(o=(function(m){return m.map((E=>(function(R){return new ji(mr(R.field),(function(L){switch(L){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(R.direction))})(E)))})(n.orderBy));let a=null;n.limit&&(a=(function(m){let E;return E=typeof m=="object"?m.value:m,pu(E)?null:E})(n.limit));let l=null;n.startAt&&(l=(function(m){const E=!!m.before,x=m.values||[];return new qi(x,E)})(n.startAt));let h=null;return n.endAt&&(h=(function(m){const E=!m.before,x=m.values||[];return new qi(x,E)})(n.endAt)),uy(e,s,o,i,a,"F",l,h)}function $y(t,e){const n=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ee(28987,{purpose:s})}})(e.purpose);return n==null?null:{"goog-listen-tags":n}}function hd(t){return t.unaryFilter!==void 0?(function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=mr(n.unaryFilter.field);return Oe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=mr(n.unaryFilter.field);return Oe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=mr(n.unaryFilter.field);return Oe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=mr(n.unaryFilter.field);return Oe.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ee(61313);default:return ee(60726)}})(t):t.fieldFilter!==void 0?(function(n){return Oe.create(mr(n.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ee(58110);default:return ee(50506)}})(n.fieldFilter.op),n.fieldFilter.value)})(t):t.compositeFilter!==void 0?(function(n){return $t.create(n.compositeFilter.filters.map((r=>hd(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ee(1026)}})(n.compositeFilter.op))})(t):ee(30097,{filter:t})}function Hy(t){return Vy[t]}function Ky(t){return Fy[t]}function Gy(t){return Ny[t]}function pr(t){return{fieldPath:t.canonicalString()}}function mr(t){return We.fromServerFormat(t.fieldPath)}function fd(t){return t instanceof Oe?(function(n){if(n.op==="=="){if(th(n.value))return{unaryFilter:{field:pr(n.field),op:"IS_NAN"}};if(eh(n.value))return{unaryFilter:{field:pr(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(th(n.value))return{unaryFilter:{field:pr(n.field),op:"IS_NOT_NAN"}};if(eh(n.value))return{unaryFilter:{field:pr(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:pr(n.field),op:Ky(n.op),value:n.value}}})(t):t instanceof $t?(function(n){const r=n.getFilters().map((s=>fd(s)));return r.length===1?r[0]:{compositeFilter:{op:Gy(n.op),filters:r}}})(t):ee(54877,{filter:t})}function Wy(t){const e=[];return t.fields.forEach((n=>e.push(n.canonicalString()))),{fieldPaths:e}}function dd(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
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
 */class bn{constructor(e,n,r,s,i=ne.min(),o=ne.min(),a=Qe.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=l}withSequenceNumber(e){return new bn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new bn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new bn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new bn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Qy{constructor(e){this.yt=e}}function Xy(t){const e=zy({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?qo(e,e.limit,"L"):e}/**
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
 */class Jy{constructor(){this.Cn=new Yy}addToCollectionParentIndex(e,n){return this.Cn.add(n),P.resolve()}getCollectionParents(e,n){return P.resolve(this.Cn.getEntries(n))}addFieldIndex(e,n){return P.resolve()}deleteFieldIndex(e,n){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,n){return P.resolve()}getDocumentsMatchingTarget(e,n){return P.resolve(null)}getIndexType(e,n){return P.resolve(0)}getFieldIndexes(e,n){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,n){return P.resolve(Sn.min())}getMinOffsetFromCollectionGroup(e,n){return P.resolve(Sn.min())}updateCollectionGroup(e,n,r){return P.resolve()}updateIndexEntries(e,n){return P.resolve()}}class Yy{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new Me(Ce.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Me(Ce.comparator)).toArray()}}/**
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
 */const mh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},pd=41943040;class ht{static withCacheSize(e){return new ht(e,ht.DEFAULT_COLLECTION_PERCENTILE,ht.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
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
 */ht.DEFAULT_COLLECTION_PERCENTILE=10,ht.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ht.DEFAULT=new ht(pd,ht.DEFAULT_COLLECTION_PERCENTILE,ht.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ht.DISABLED=new ht(-1,0,0);/**
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
 */class Fr{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Fr(0)}static cr(){return new Fr(-1)}}/**
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
 */const gh="LruGarbageCollector",Zy=1048576;function _h([t,e],[n,r]){const s=ae(t,n);return s===0?ae(e,r):s}class eb{constructor(e){this.Ir=e,this.buffer=new Me(_h),this.Er=0}dr(){return++this.Er}Ar(e){const n=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();_h(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class tb{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){H(gh,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){Mr(n)?H(gh,"Ignoring IndexedDB error during garbage collection: ",n):await Or(n)}await this.Vr(3e5)}))}}class nb{constructor(e,n){this.mr=e,this.params=n}calculateTargetCount(e,n){return this.mr.gr(e).next((r=>Math.floor(n/100*r)))}nthSequenceNumber(e,n){if(n===0)return P.resolve(du.ce);const r=new eb(n);return this.mr.forEachTarget(e,(s=>r.Ar(s.sequenceNumber))).next((()=>this.mr.pr(e,(s=>r.Ar(s))))).next((()=>r.maxValue))}removeTargets(e,n,r){return this.mr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.mr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(H("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(mh)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(H("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),mh):this.yr(e,n)))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,n){let r,s,i,o,a,l,h;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(H("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(e,s)))).next((m=>(r=m,a=Date.now(),this.removeTargets(e,r,n)))).next((m=>(i=m,l=Date.now(),this.removeOrphanedDocuments(e,r)))).next((m=>(h=Date.now(),fr()<=oe.DEBUG&&H("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(a-o)+`ms
	Removed ${i} targets in `+(l-a)+`ms
	Removed ${m} documents in `+(h-l)+`ms
Total Duration: ${h-d}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function rb(t,e){return new nb(t,e)}/**
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
 */class sb{constructor(){this.changes=new tr((e=>e.toString()),((e,n)=>e.isEqual(n))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,tt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?P.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class ib{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
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
 */class ub{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,n)))).next((s=>(r!==null&&gs(r.mutation,s,It.empty(),Ie.now()),s)))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next((r=>this.getLocalViewOfDocuments(e,r,ce()).next((()=>r))))}getLocalViewOfDocuments(e,n,r=ce()){const s=Gn();return this.populateOverlays(e,s,n).next((()=>this.computeViews(e,n,s,r).next((i=>{let o=ss();return i.forEach(((a,l)=>{o=o.insert(a,l.overlayedDocument)})),o}))))}getOverlayedDocuments(e,n){const r=Gn();return this.populateOverlays(e,r,n).next((()=>this.computeViews(e,n,r,ce())))}populateOverlays(e,n,r){const s=[];return r.forEach((i=>{n.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,a)=>{n.set(o,a)}))}))}computeViews(e,n,r,s){let i=un();const o=ms(),a=(function(){return ms()})();return n.forEach(((l,h)=>{const d=r.get(h.key);s.has(h.key)&&(d===void 0||d.mutation instanceof nr)?i=i.insert(h.key,h):d!==void 0?(o.set(h.key,d.mutation.getFieldMask()),gs(d.mutation,h,d.mutation.getFieldMask(),Ie.now())):o.set(h.key,It.empty())})),this.recalculateAndSaveOverlays(e,i).next((l=>(l.forEach(((h,d)=>o.set(h,d))),n.forEach(((h,d)=>a.set(h,new ib(d,o.get(h)??null)))),a)))}recalculateAndSaveOverlays(e,n){const r=ms();let s=new Se(((o,a)=>o-a)),i=ce();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next((o=>{for(const a of o)a.keys().forEach((l=>{const h=n.get(l);if(h===null)return;let d=r.get(l)||It.empty();d=a.applyToLocalView(h,d),r.set(l,d);const m=(s.get(a.batchId)||ce()).add(l);s=s.insert(a.batchId,m)}))})).next((()=>{const o=[],a=s.getReverseIterator();for(;a.hasNext();){const l=a.getNext(),h=l.key,d=l.value,m=X0();d.forEach((E=>{if(!i.has(E)){const x=nd(n.get(E),r.get(E));x!==null&&m.set(E,x),i=i.add(E)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return P.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,n,r,s){return(function(o){return Y.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):oy(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):P.resolve(Gn());let a=xs,l=i;return o.next((h=>P.forEach(h,((d,m)=>(a<m.largestBatchId&&(a=m.largestBatchId),i.get(d)?P.resolve():this.remoteDocumentCache.getEntry(e,d).next((E=>{l=l.insert(d,E)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,l,h,ce()))).next((d=>({batchId:a,changes:Q0(d)})))))}))}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new Y(n)).next((r=>{let s=ss();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=ss();return this.indexManager.getCollectionParents(e,i).next((a=>P.forEach(a,(l=>{const h=(function(m,E){return new gu(E,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(n,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((d=>{d.forEach(((m,E)=>{o=o.insert(m,E)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s)))).next((o=>{i.forEach(((l,h)=>{const d=h.getKey();o.get(d)===null&&(o=o.insert(d,tt.newInvalidDocument(d)))}));let a=ss();return o.forEach(((l,h)=>{const d=i.get(l);d!==void 0&&gs(d.mutation,h,It.empty(),Ie.now()),yu(n,h)&&(a=a.insert(l,h))})),a}))}}/**
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
 */class ob{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,n){return P.resolve(this.Lr.get(n))}saveBundleMetadata(e,n){return this.Lr.set(n.id,(function(s){return{id:s.id,version:s.version,createTime:Ut(s.createTime)}})(n)),P.resolve()}getNamedQuery(e,n){return P.resolve(this.kr.get(n))}saveNamedQuery(e,n){return this.kr.set(n.name,(function(s){return{name:s.name,query:Xy(s.bundledQuery),readTime:Ut(s.readTime)}})(n)),P.resolve()}}/**
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
 */class ab{constructor(){this.overlays=new Se(Y.comparator),this.qr=new Map}getOverlay(e,n){return P.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Gn();return P.forEach(n,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,n,r){return r.forEach(((s,i)=>{this.St(e,n,i)})),P.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(r)),P.resolve()}getOverlaysForCollection(e,n,r){const s=Gn(),i=n.length+1,o=new Y(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const l=a.getNext().value,h=l.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return P.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new Se(((h,d)=>h-d));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let d=i.get(h.largestBatchId);d===null&&(d=Gn(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const a=Gn(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach(((h,d)=>a.set(h,d))),!(a.size()>=s)););return P.resolve(a)}St(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Cy(n,r));let i=this.qr.get(n);i===void 0&&(i=ce(),this.qr.set(n,i)),this.qr.set(n,i.add(r.key))}}/**
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
 */class cb{constructor(){this.sessionToken=Qe.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,P.resolve()}}/**
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
 */class Oa{constructor(){this.Qr=new Me(Ue.$r),this.Ur=new Me(Ue.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,n){const r=new Ue(e,n);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,n){e.forEach((r=>this.addReference(r,n)))}removeReference(e,n){this.Gr(new Ue(e,n))}zr(e,n){e.forEach((r=>this.removeReference(r,n)))}jr(e){const n=new Y(new Ce([])),r=new Ue(n,e),s=new Ue(n,e+1),i=[];return this.Ur.forEachInRange([r,s],(o=>{this.Gr(o),i.push(o.key)})),i}Jr(){this.Qr.forEach((e=>this.Gr(e)))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const n=new Y(new Ce([])),r=new Ue(n,e),s=new Ue(n,e+1);let i=ce();return this.Ur.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const n=new Ue(e,0),r=this.Qr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Ue{constructor(e,n){this.key=e,this.Yr=n}static $r(e,n){return Y.comparator(e.key,n.key)||ae(e.Yr,n.Yr)}static Kr(e,n){return ae(e.Yr,n.Yr)||Y.comparator(e.key,n.key)}}/**
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
 */class lb{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.tr=1,this.Zr=new Me(Ue.$r)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Iy(i,n,r,s);this.mutationQueue.push(o);for(const a of s)this.Zr=this.Zr.add(new Ue(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return P.resolve(o)}lookupMutationBatch(e,n){return P.resolve(this.Xr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.ei(r),i=s<0?0:s;return P.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?Ca:this.tr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Ue(n,0),s=new Ue(n,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],(o=>{const a=this.Xr(o.Yr);i.push(a)})),P.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Me(ae);return n.forEach((s=>{const i=new Ue(s,0),o=new Ue(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,o],(a=>{r=r.add(a.Yr)}))})),P.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;Y.isDocumentKey(i)||(i=i.child(""));const o=new Ue(new Y(i),0);let a=new Me(ae);return this.Zr.forEachWhile((l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(a=a.add(l.Yr)),!0)}),o),P.resolve(this.ti(a))}ti(e){const n=[];return e.forEach((r=>{const s=this.Xr(r);s!==null&&n.push(s)})),n}removeMutationBatch(e,n){ye(this.ni(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return P.forEach(n.mutations,(s=>{const i=new Ue(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Zr=r}))}ir(e){}containsKey(e,n){const r=new Ue(n,0),s=this.Zr.firstAfterOrEqual(r);return P.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}ni(e,n){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const n=this.ei(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class hb{constructor(e){this.ri=e,this.docs=(function(){return new Se(Y.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.ri(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return P.resolve(r?r.document.mutableCopy():tt.newInvalidDocument(n))}getEntries(e,n){let r=un();return n.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():tt.newInvalidDocument(s))})),P.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=un();const o=n.path,a=new Y(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(a);for(;l.hasNext();){const{key:h,value:{document:d}}=l.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||L2(M2(d),r)<=0||(s.has(d.key)||yu(n,d))&&(i=i.insert(d.key,d.mutableCopy()))}return P.resolve(i)}getAllFromCollectionGroup(e,n,r,s){ee(9500)}ii(e,n){return P.forEach(this.docs,(r=>n(r)))}newChangeBuffer(e){return new fb(this)}getSize(e){return P.resolve(this.size)}}class fb extends sb{constructor(e){super(),this.Nr=e}applyChanges(e){const n=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?n.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)})),P.waitFor(n)}getFromCache(e,n){return this.Nr.getEntry(e,n)}getAllFromCache(e,n){return this.Nr.getEntries(e,n)}}/**
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
 */class db{constructor(e){this.persistence=e,this.si=new tr((n=>Da(n)),Ra),this.lastRemoteSnapshotVersion=ne.min(),this.highestTargetId=0,this.oi=0,this._i=new Oa,this.targetCount=0,this.ai=Fr.ur()}forEachTarget(e,n){return this.si.forEach(((r,s)=>n(s))),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.oi&&(this.oi=n),P.resolve()}Pr(e){this.si.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.ai=new Fr(n),this.highestTargetId=n),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,n){return this.Pr(n),this.targetCount+=1,P.resolve()}updateTargetData(e,n){return this.Pr(n),P.resolve()}removeTargetData(e,n){return this.si.delete(n.target),this._i.jr(n.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.si.forEach(((o,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.si.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)})),P.waitFor(i).next((()=>s))}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,n){const r=this.si.get(n)||null;return P.resolve(r)}addMatchingKeys(e,n,r){return this._i.Wr(n,r),P.resolve()}removeMatchingKeys(e,n,r){this._i.zr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),P.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this._i.jr(n),P.resolve()}getMatchingKeysForTargetId(e,n){const r=this._i.Hr(n);return P.resolve(r)}containsKey(e,n){return P.resolve(this._i.containsKey(n))}}/**
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
 */class md{constructor(e,n){this.ui={},this.overlays={},this.ci=new du(0),this.li=!1,this.li=!0,this.hi=new cb,this.referenceDelegate=e(this),this.Pi=new db(this),this.indexManager=new Jy,this.remoteDocumentCache=(function(s){return new hb(s)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new Qy(n),this.Ii=new ob(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new ab,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.ui[e.toKey()];return r||(r=new lb(n,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,n,r){H("MemoryPersistence","Starting transaction:",e);const s=new pb(this.ci.next());return this.referenceDelegate.Ei(),r(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(e,n){return P.or(Object.values(this.ui).map((r=>()=>r.containsKey(e,n))))}}class pb extends B2{constructor(e){super(),this.currentSequenceNumber=e}}class Ma{constructor(e){this.persistence=e,this.Ri=new Oa,this.Vi=null}static mi(e){return new Ma(e)}get fi(){if(this.Vi)return this.Vi;throw ee(60996)}addReference(e,n,r){return this.Ri.addReference(r,n),this.fi.delete(r.toString()),P.resolve()}removeReference(e,n,r){return this.Ri.removeReference(r,n),this.fi.add(r.toString()),P.resolve()}markPotentiallyOrphaned(e,n){return this.fi.add(n.toString()),P.resolve()}removeTarget(e,n){this.Ri.jr(n.targetId).forEach((s=>this.fi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>r.removeTargetData(e,n)))}Ei(){this.Vi=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.fi,(r=>{const s=Y.fromPath(r);return this.gi(e,s).next((i=>{i||n.removeEntry(s,ne.min())}))})).next((()=>(this.Vi=null,n.apply(e))))}updateLimboDocument(e,n){return this.gi(e,n).next((r=>{r?this.fi.delete(n.toString()):this.fi.add(n.toString())}))}Ti(e){return 0}gi(e,n){return P.or([()=>P.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ai(e,n)])}}class Hi{constructor(e,n){this.persistence=e,this.pi=new tr((r=>z2(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=rb(this,n)}static mi(e,n){return new Hi(e,n)}Ei(){}di(e){return P.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}gr(e){const n=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>n.next((s=>r+s))))}wr(e){let n=0;return this.pr(e,(r=>{n++})).next((()=>n))}pr(e,n){return P.forEach(this.pi,((r,s)=>this.br(e,r,s).next((i=>i?P.resolve():n(s)))))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,(o=>this.br(e,o,n).next((a=>{a||(r++,i.removeEntry(o,ne.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,n){return this.pi.set(n,e.currentSequenceNumber),P.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),P.resolve()}removeReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,n){return this.pi.set(n,e.currentSequenceNumber),P.resolve()}Ti(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=vi(e.data.value)),n}br(e,n,r){return P.or([()=>this.persistence.Ai(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const s=this.pi.get(n);return P.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class La{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Es=r,this.ds=s}static As(e,n){let r=ce(),s=ce();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new La(e,n.fromCache,r,s)}}/**
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
 */class mb{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class gb{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return h_()?8:q2(xt())>0?6:4})()}initialize(e,n){this.ps=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.ys(e,n).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ws(e,n,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new mb;return this.Ss(e,n,o).next((a=>{if(i.result=a,this.Vs)return this.bs(e,n,o,a.size)}))})).next((()=>i.result))}bs(e,n,r,s){return r.documentReadCount<this.fs?(fr()<=oe.DEBUG&&H("QueryEngine","SDK will not create cache indexes for query:",dr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),P.resolve()):(fr()<=oe.DEBUG&&H("QueryEngine","Query:",dr(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(fr()<=oe.DEBUG&&H("QueryEngine","The SDK decides to create cache indexes for query:",dr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Mt(n))):P.resolve())}ys(e,n){if(ih(n))return P.resolve(null);let r=Mt(n);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(n.limit!==null&&s===1&&(n=qo(n,null,"F"),r=Mt(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const o=ce(...i);return this.ps.getDocuments(e,o).next((a=>this.indexManager.getMinOffset(e,r).next((l=>{const h=this.Ds(n,a);return this.Cs(n,h,o,l.readTime)?this.ys(e,qo(n,null,"F")):this.vs(e,h,n,l)}))))})))))}ws(e,n,r,s){return ih(n)||s.isEqual(ne.min())?P.resolve(null):this.ps.getDocuments(e,r).next((i=>{const o=this.Ds(n,i);return this.Cs(n,o,r,s)?P.resolve(null):(fr()<=oe.DEBUG&&H("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),dr(n)),this.vs(e,o,n,O2(s,xs)).next((a=>a)))}))}Ds(e,n){let r=new Me(G0(e));return n.forEach(((s,i)=>{yu(e,i)&&(r=r.add(i))})),r}Cs(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,n,r){return fr()<=oe.DEBUG&&H("QueryEngine","Using full collection scan to execute query:",dr(n)),this.ps.getDocumentsMatchingQuery(e,n,Sn.min(),r)}vs(e,n,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next((i=>(n.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
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
 */const Ua="LocalStore",_b=3e8;class yb{constructor(e,n,r,s){this.persistence=e,this.Fs=n,this.serializer=s,this.Ms=new Se(ae),this.xs=new tr((i=>Da(i)),Ra),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new ub(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(n=>e.collect(n,this.Ms)))}}function bb(t,e,n,r){return new yb(t,e,n,r)}async function gd(t,e){const n=se(t);return await n.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,n.Bs(e),n.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],a=[];let l=ce();for(const h of s){o.push(h.batchId);for(const d of h.mutations)l=l.add(d.key)}for(const h of i){a.push(h.batchId);for(const d of h.mutations)l=l.add(d.key)}return n.localDocuments.getDocuments(r,l).next((h=>({Ls:h,removedBatchIds:o,addedBatchIds:a})))}))}))}function Eb(t,e){const n=se(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=n.Ns.newChangeBuffer({trackRemovals:!0});return(function(a,l,h,d){const m=h.batch,E=m.keys();let x=P.resolve();return E.forEach((R=>{x=x.next((()=>d.getEntry(l,R))).next((k=>{const L=h.docVersions.get(R);ye(L!==null,48541),k.version.compareTo(L)<0&&(m.applyToRemoteDocument(k,h),k.isValidDocument()&&(k.setReadTime(h.commitVersion),d.addEntry(k)))}))})),x.next((()=>a.mutationQueue.removeMutationBatch(l,m)))})(n,r,e,i).next((()=>i.apply(r))).next((()=>n.mutationQueue.performConsistencyCheck(r))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(a){let l=ce();for(let h=0;h<a.mutationResults.length;++h)a.mutationResults[h].transformResults.length>0&&(l=l.add(a.batch.mutations[h].key));return l})(e)))).next((()=>n.localDocuments.getDocuments(r,s)))}))}function _d(t){const e=se(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(n=>e.Pi.getLastRemoteSnapshotVersion(n)))}function Tb(t,e){const n=se(t),r=e.snapshotVersion;let s=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=n.Ns.newChangeBuffer({trackRemovals:!0});s=n.Ms;const a=[];e.targetChanges.forEach(((d,m)=>{const E=s.get(m);if(!E)return;a.push(n.Pi.removeMatchingKeys(i,d.removedDocuments,m).next((()=>n.Pi.addMatchingKeys(i,d.addedDocuments,m))));let x=E.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?x=x.withResumeToken(Qe.EMPTY_BYTE_STRING,ne.min()).withLastLimboFreeSnapshotVersion(ne.min()):d.resumeToken.approximateByteSize()>0&&(x=x.withResumeToken(d.resumeToken,r)),s=s.insert(m,x),(function(k,L,$){return k.resumeToken.approximateByteSize()===0||L.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=_b?!0:$.addedDocuments.size+$.modifiedDocuments.size+$.removedDocuments.size>0})(E,x,d)&&a.push(n.Pi.updateTargetData(i,x))}));let l=un(),h=ce();if(e.documentUpdates.forEach((d=>{e.resolvedLimboDocuments.has(d)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,d))})),a.push(vb(i,o,e.documentUpdates).next((d=>{l=d.ks,h=d.qs}))),!r.isEqual(ne.min())){const d=n.Pi.getLastRemoteSnapshotVersion(i).next((m=>n.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r)));a.push(d)}return P.waitFor(a).next((()=>o.apply(i))).next((()=>n.localDocuments.getLocalViewOfDocuments(i,l,h))).next((()=>l))})).then((i=>(n.Ms=s,i)))}function vb(t,e,n){let r=ce(),s=ce();return n.forEach((i=>r=r.add(i))),e.getEntries(t,r).next((i=>{let o=un();return n.forEach(((a,l)=>{const h=i.get(a);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(a)),l.isNoDocument()&&l.version.isEqual(ne.min())?(e.removeEntry(a,l.readTime),o=o.insert(a,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),o=o.insert(a,l)):H(Ua,"Ignoring outdated watch update for ",a,". Current version:",h.version," Watch version:",l.version)})),{ks:o,qs:s}}))}function Ab(t,e){const n=se(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Ca),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function wb(t,e){const n=se(t);return n.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return n.Pi.getTargetData(r,e).next((i=>i?(s=i,P.resolve(s)):n.Pi.allocateTargetId(r).next((o=>(s=new bn(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Pi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=n.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(r.targetId,r),n.xs.set(e,r.targetId)),r}))}async function Ko(t,e,n){const r=se(t),s=r.Ms.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!Mr(o))throw o;H(Ua,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function yh(t,e,n){const r=se(t);let s=ne.min(),i=ce();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(l,h,d){const m=se(l),E=m.xs.get(d);return E!==void 0?P.resolve(m.Ms.get(E)):m.Pi.getTargetData(h,d)})(r,o,Mt(e)).next((a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(o,a.targetId).next((l=>{i=l}))})).next((()=>r.Fs.getDocumentsMatchingQuery(o,e,n?s:ne.min(),n?i:ce()))).next((a=>(Ib(r,cy(e),a),{documents:a,Qs:i})))))}function Ib(t,e,n){let r=t.Os.get(e)||ne.min();n.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),t.Os.set(e,r)}class bh{constructor(){this.activeTargetIds=my()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Cb{constructor(){this.Mo=new bh,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,n,r){this.xo[e]=n}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new bh,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class xb{Oo(e){}shutdown(){}}/**
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
 */const Eh="ConnectivityMonitor";class Th{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){H(Eh,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){H(Eh,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let pi=null;function Go(){return pi===null?pi=(function(){return 268435456+Math.round(2147483648*Math.random())})():pi++,"0x"+pi.toString(16)}/**
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
 */const ho="RestConnection",Sb={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Db{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=n+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Oo?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,n,r,s,i){const o=Go(),a=this.zo(e,n.toUriEncodedString());H(ho,`Sending RPC '${e}' ${o}:`,a,r);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(l,s,i);const{host:h}=new URL(a),d=ba(h);return this.Jo(e,a,l,r,d).then((m=>(H(ho,`Received RPC '${e}' ${o}: `,m),m)),(m=>{throw Cs(ho,`RPC '${e}' ${o} failed with error: `,m,"url: ",a,"request:",r),m}))}Ho(e,n,r,s,i,o){return this.Go(e,n,r,s,i)}jo(e,n,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+kr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}zo(e,n){const r=Sb[e];return`${this.Uo}/v1/${n}:${r}`}terminate(){}}/**
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
 */class Rb{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
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
 */const Ze="WebChannelConnection";class Pb extends Db{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,n,r,s,i){const o=Go();return new Promise(((a,l)=>{const h=new v0;h.setWithCredentials(!0),h.listenOnce(A0.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Ti.NO_ERROR:const m=h.getResponseJson();H(Ze,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(m)),a(m);break;case Ti.TIMEOUT:H(Ze,`RPC '${e}' ${o} timed out`),l(new X(N.DEADLINE_EXCEEDED,"Request time out"));break;case Ti.HTTP_ERROR:const E=h.getStatus();if(H(Ze,`RPC '${e}' ${o} failed with status:`,E,"response text:",h.getResponseText()),E>0){let x=h.getResponseJson();Array.isArray(x)&&(x=x[0]);const R=x?.error;if(R&&R.status&&R.message){const k=(function($){const G=$.toLowerCase().replace(/_/g,"-");return Object.values(N).indexOf(G)>=0?G:N.UNKNOWN})(R.status);l(new X(k,R.message))}else l(new X(N.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new X(N.UNAVAILABLE,"Connection failed."));break;default:ee(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{H(Ze,`RPC '${e}' ${o} completed.`)}}));const d=JSON.stringify(s);H(Ze,`RPC '${e}' ${o} sending request:`,s),h.send(n,"POST",d,r,15)}))}T_(e,n,r){const s=Go(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=C0(),a=I0(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,n,r),l.encodeInitMessageHeaders=!0;const d=i.join("");H(Ze,`Creating RPC '${e}' stream ${s}: ${d}`,l);const m=o.createWebChannel(d,l);this.I_(m);let E=!1,x=!1;const R=new Rb({Yo:L=>{x?H(Ze,`Not sending because RPC '${e}' stream ${s} is closed:`,L):(E||(H(Ze,`Opening RPC '${e}' stream ${s} transport.`),m.open(),E=!0),H(Ze,`RPC '${e}' stream ${s} sending:`,L),m.send(L))},Zo:()=>m.close()}),k=(L,$,G)=>{L.listen($,(W=>{try{G(W)}catch(K){setTimeout((()=>{throw K}),0)}}))};return k(m,rs.EventType.OPEN,(()=>{x||(H(Ze,`RPC '${e}' stream ${s} transport opened.`),R.o_())})),k(m,rs.EventType.CLOSE,(()=>{x||(x=!0,H(Ze,`RPC '${e}' stream ${s} transport closed`),R.a_(),this.E_(m))})),k(m,rs.EventType.ERROR,(L=>{x||(x=!0,Cs(Ze,`RPC '${e}' stream ${s} transport errored. Name:`,L.name,"Message:",L.message),R.a_(new X(N.UNAVAILABLE,"The operation could not be completed")))})),k(m,rs.EventType.MESSAGE,(L=>{if(!x){const $=L.data[0];ye(!!$,16349);const G=$,W=G?.error||G[0]?.error;if(W){H(Ze,`RPC '${e}' stream ${s} received error:`,W);const K=W.status;let le=(function(g){const b=Pe[g];if(b!==void 0)return sd(b)})(K),Ae=W.message;le===void 0&&(le=N.INTERNAL,Ae="Unknown error status: "+K+" with message "+W.message),x=!0,R.a_(new X(le,Ae)),m.close()}else H(Ze,`RPC '${e}' stream ${s} received:`,$),R.u_($)}})),k(a,w0.STAT_EVENT,(L=>{L.stat===No.PROXY?H(Ze,`RPC '${e}' stream ${s} detected buffering proxy`):L.stat===No.NOPROXY&&H(Ze,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{R.__()}),0),R}terminate(){this.c_.forEach((e=>e.close())),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter((n=>n===e))}}function fo(){return typeof document<"u"?document:null}/**
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
 */function vu(t){return new ky(t,!0)}/**
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
 */class yd{constructor(e,n,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=n,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const n=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,n-r);s>0&&H("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const vh="PersistentStream";class bd{constructor(e,n,r,s,i,o,a,l){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new yd(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===N.RESOURCE_EXHAUSTED?(sn(n.toString()),sn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===N.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(n)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===n&&this.G_(r,s)}),(r=>{e((()=>{const s=new X(N.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,n){const r=this.W_(this.D_);this.stream=this.j_(e,n),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return H(vh,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return n=>{this.Mi.enqueueAndForget((()=>this.D_===e?n():(H(vh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Vb extends bd{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=Ly(this.serializer,e),r=(function(i){if(!("targetChange"in i))return ne.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ne.min():o.readTime?Ut(o.readTime):ne.min()})(e);return this.listener.H_(n,r)}Y_(e){const n={};n.database=Ho(this.serializer),n.addTarget=(function(i,o){let a;const l=o.target;if(a=Bo(l)?{documents:qy(i,l)}:{query:jy(i,l).ft},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=od(i,o.resumeToken);const h=jo(i,o.expectedCount);h!==null&&(a.expectedCount=h)}else if(o.snapshotVersion.compareTo(ne.min())>0){a.readTime=$i(i,o.snapshotVersion.toTimestamp());const h=jo(i,o.expectedCount);h!==null&&(a.expectedCount=h)}return a})(this.serializer,e);const r=$y(this.serializer,e);r&&(n.labels=r),this.q_(n)}Z_(e){const n={};n.database=Ho(this.serializer),n.removeTarget=e,this.q_(n)}}class Fb extends bd{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return ye(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ye(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){ye(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=By(e.writeResults,e.commitTime),r=Ut(e.commitTime);return this.listener.na(r,n)}ra(){const e={};e.database=Ho(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map((r=>Uy(this.serializer,r)))};this.q_(n)}}/**
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
 */class Nb{}class kb extends Nb{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new X(N.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,n,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Go(e,zo(n,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new X(N.UNKNOWN,i.toString())}))}Ho(e,n,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Ho(e,zo(n,r),s,o,a,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new X(N.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class Ob{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(sn(n),this.aa=!1):H("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const Yn="RemoteStore";class Mb{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((o=>{r.enqueueAndForget((async()=>{rr(this)&&(H(Yn,"Restarting streams for network reachability change."),await(async function(l){const h=se(l);h.Ea.add(4),await qs(h),h.Ra.set("Unknown"),h.Ea.delete(4),await Au(h)})(this))}))})),this.Ra=new Ob(r,s)}}async function Au(t){if(rr(t))for(const e of t.da)await e(!0)}async function qs(t){for(const e of t.da)await e(!1)}function Ed(t,e){const n=se(t);n.Ia.has(e.targetId)||(n.Ia.set(e.targetId,e),za(n)?ja(n):Lr(n).O_()&&qa(n,e))}function Ba(t,e){const n=se(t),r=Lr(n);n.Ia.delete(e),r.O_()&&Td(n,e),n.Ia.size===0&&(r.O_()?r.L_():rr(n)&&n.Ra.set("Unknown"))}function qa(t,e){if(t.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ne.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Lr(t).Y_(e)}function Td(t,e){t.Va.Ue(e),Lr(t).Z_(e)}function ja(t){t.Va=new Py({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ia.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),Lr(t).start(),t.Ra.ua()}function za(t){return rr(t)&&!Lr(t).x_()&&t.Ia.size>0}function rr(t){return se(t).Ea.size===0}function vd(t){t.Va=void 0}async function Lb(t){t.Ra.set("Online")}async function Ub(t){t.Ia.forEach(((e,n)=>{qa(t,e)}))}async function Bb(t,e){vd(t),za(t)?(t.Ra.ha(e),ja(t)):t.Ra.set("Unknown")}async function qb(t,e,n){if(t.Ra.set("Online"),e instanceof ud&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const a of i.targetIds)s.Ia.has(a)&&(await s.remoteSyncer.rejectListen(a,o),s.Ia.delete(a),s.Va.removeTarget(a))})(t,e)}catch(r){H(Yn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ki(t,r)}else if(e instanceof Ii?t.Va.Ze(e):e instanceof id?t.Va.st(e):t.Va.tt(e),!n.isEqual(ne.min()))try{const r=await _d(t.localStore);n.compareTo(r)>=0&&await(function(i,o){const a=i.Va.Tt(o);return a.targetChanges.forEach(((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const d=i.Ia.get(h);d&&i.Ia.set(h,d.withResumeToken(l.resumeToken,o))}})),a.targetMismatches.forEach(((l,h)=>{const d=i.Ia.get(l);if(!d)return;i.Ia.set(l,d.withResumeToken(Qe.EMPTY_BYTE_STRING,d.snapshotVersion)),Td(i,l);const m=new bn(d.target,l,h,d.sequenceNumber);qa(i,m)})),i.remoteSyncer.applyRemoteEvent(a)})(t,n)}catch(r){H(Yn,"Failed to raise snapshot:",r),await Ki(t,r)}}async function Ki(t,e,n){if(!Mr(e))throw e;t.Ea.add(1),await qs(t),t.Ra.set("Offline"),n||(n=()=>_d(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{H(Yn,"Retrying IndexedDB access"),await n(),t.Ea.delete(1),await Au(t)}))}function Ad(t,e){return e().catch((n=>Ki(t,n,e)))}async function wu(t){const e=se(t),n=Vn(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Ca;for(;jb(e);)try{const s=await Ab(e.localStore,r);if(s===null){e.Ta.length===0&&n.L_();break}r=s.batchId,zb(e,s)}catch(s){await Ki(e,s)}wd(e)&&Id(e)}function jb(t){return rr(t)&&t.Ta.length<10}function zb(t,e){t.Ta.push(e);const n=Vn(t);n.O_()&&n.X_&&n.ea(e.mutations)}function wd(t){return rr(t)&&!Vn(t).x_()&&t.Ta.length>0}function Id(t){Vn(t).start()}async function $b(t){Vn(t).ra()}async function Hb(t){const e=Vn(t);for(const n of t.Ta)e.ea(n.mutations)}async function Kb(t,e,n){const r=t.Ta.shift(),s=Fa.from(r,e,n);await Ad(t,(()=>t.remoteSyncer.applySuccessfulWrite(s))),await wu(t)}async function Gb(t,e){e&&Vn(t).X_&&await(async function(r,s){if((function(o){return Sy(o)&&o!==N.ABORTED})(s.code)){const i=r.Ta.shift();Vn(r).B_(),await Ad(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await wu(r)}})(t,e),wd(t)&&Id(t)}async function Ah(t,e){const n=se(t);n.asyncQueue.verifyOperationInProgress(),H(Yn,"RemoteStore received new credentials");const r=rr(n);n.Ea.add(3),await qs(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ea.delete(3),await Au(n)}async function Wb(t,e){const n=se(t);e?(n.Ea.delete(2),await Au(n)):e||(n.Ea.add(2),await qs(n),n.Ra.set("Unknown"))}function Lr(t){return t.ma||(t.ma=(function(n,r,s){const i=se(n);return i.sa(),new Vb(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(t.datastore,t.asyncQueue,{Xo:Lb.bind(null,t),t_:Ub.bind(null,t),r_:Bb.bind(null,t),H_:qb.bind(null,t)}),t.da.push((async e=>{e?(t.ma.B_(),za(t)?ja(t):t.Ra.set("Unknown")):(await t.ma.stop(),vd(t))}))),t.ma}function Vn(t){return t.fa||(t.fa=(function(n,r,s){const i=se(n);return i.sa(),new Fb(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(t.datastore,t.asyncQueue,{Xo:()=>Promise.resolve(),t_:$b.bind(null,t),r_:Gb.bind(null,t),ta:Hb.bind(null,t),na:Kb.bind(null,t)}),t.da.push((async e=>{e?(t.fa.B_(),await wu(t)):(await t.fa.stop(),t.Ta.length>0&&(H(Yn,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))}))),t.fa}/**
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
 */class $a{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new An,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,a=new $a(e,n,o,s,i);return a.start(r),a}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new X(N.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ha(t,e){if(sn("AsyncQueue",`${e}: ${t}`),Mr(t))return new X(N.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class vr{static emptySet(e){return new vr(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||Y.comparator(n.key,r.key):(n,r)=>Y.comparator(n.key,r.key),this.keyedMap=ss(),this.sortedSet=new Se(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((n,r)=>(e(n),!1)))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof vr)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((n=>{e.push(n.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new vr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
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
 */class wh{constructor(){this.ga=new Se(Y.comparator)}track(e){const n=e.doc.key,r=this.ga.get(n);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(n,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(n):e.type===1&&r.type===2?this.ga=this.ga.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):ee(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal(((n,r)=>{e.push(r)})),e}}class Nr{constructor(e,n,r,s,i,o,a,l,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach((a=>{o.push({type:0,doc:a})})),new Nr(e,n,vr.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&_u(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class Qb{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class Xb{constructor(){this.queries=Ih(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,r){const s=se(n),i=s.queries;s.queries=Ih(),i.forEach(((o,a)=>{for(const l of a.Sa)l.onError(r)}))})(this,new X(N.ABORTED,"Firestore shutting down"))}}function Ih(){return new tr((t=>K0(t)),_u)}async function Jb(t,e){const n=se(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new Qb,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await n.onListen(s,!0);break;case 1:i.wa=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const a=Ha(o,`Initialization of query '${dr(e.query)}' failed`);return void e.onError(a)}n.queries.set(s,i),i.Sa.push(e),e.va(n.onlineState),i.wa&&e.Fa(i.wa)&&Ka(n)}async function Yb(t,e){const n=se(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function Zb(t,e){const n=se(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const a of o.Sa)a.Fa(s)&&(r=!0);o.wa=s}}r&&Ka(n)}function e3(t,e,n){const r=se(t),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(n);r.queries.delete(e)}function Ka(t){t.Ca.forEach((e=>{e.next()}))}var Wo,Ch;(Ch=Wo||(Wo={})).Ma="default",Ch.Cache="cache";class t3{constructor(e,n,r){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Nr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const r=n!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=Nr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Wo.Cache}}/**
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
 */class Cd{constructor(e){this.key=e}}class xd{constructor(e){this.key=e}}class n3{constructor(e,n){this.query=e,this.Ya=n,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=ce(),this.mutatedKeys=ce(),this.eu=G0(e),this.tu=new vr(this.eu)}get nu(){return this.Ya}ru(e,n){const r=n?n.iu:new wh,s=n?n.tu:this.tu;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,a=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((d,m)=>{const E=s.get(d),x=yu(this.query,m)?m:null,R=!!E&&this.mutatedKeys.has(E.key),k=!!x&&(x.hasLocalMutations||this.mutatedKeys.has(x.key)&&x.hasCommittedMutations);let L=!1;E&&x?E.data.isEqual(x.data)?R!==k&&(r.track({type:3,doc:x}),L=!0):this.su(E,x)||(r.track({type:2,doc:x}),L=!0,(l&&this.eu(x,l)>0||h&&this.eu(x,h)<0)&&(a=!0)):!E&&x?(r.track({type:0,doc:x}),L=!0):E&&!x&&(r.track({type:1,doc:E}),L=!0,(l||h)&&(a=!0)),L&&(x?(o=o.add(x),i=k?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{tu:o,iu:r,Cs:a,mutatedKeys:i}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((d,m)=>(function(x,R){const k=L=>{switch(L){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ee(20277,{Rt:L})}};return k(x)-k(R)})(d.type,m.type)||this.eu(d.doc,m.doc))),this.ou(r),s=s??!1;const a=n&&!s?this._u():[],l=this.Xa.size===0&&this.current&&!s?1:0,h=l!==this.Za;return this.Za=l,o.length!==0||h?{snapshot:new Nr(this.query,e.tu,i,o,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:a}:{au:a}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new wh,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((n=>this.Ya=this.Ya.add(n))),e.modifiedDocuments.forEach((n=>{})),e.removedDocuments.forEach((n=>this.Ya=this.Ya.delete(n))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=ce(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const n=[];return e.forEach((r=>{this.Xa.has(r)||n.push(new xd(r))})),this.Xa.forEach((r=>{e.has(r)||n.push(new Cd(r))})),n}cu(e){this.Ya=e.Qs,this.Xa=ce();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return Nr.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Ga="SyncEngine";class r3{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class s3{constructor(e){this.key=e,this.hu=!1}}class i3{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new tr((a=>K0(a)),_u),this.Iu=new Map,this.Eu=new Set,this.du=new Se(Y.comparator),this.Au=new Map,this.Ru=new Oa,this.Vu={},this.mu=new Map,this.fu=Fr.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function u3(t,e,n=!0){const r=Fd(t);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Sd(r,e,n,!0),s}async function o3(t,e){const n=Fd(t);await Sd(n,e,!0,!1)}async function Sd(t,e,n,r){const s=await wb(t.localStore,Mt(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let a;return r&&(a=await a3(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&Ed(t.remoteStore,s),a}async function a3(t,e,n,r,s){t.pu=(m,E,x)=>(async function(k,L,$,G){let W=L.view.ru($);W.Cs&&(W=await yh(k.localStore,L.query,!1).then((({documents:A})=>L.view.ru(A,W))));const K=G&&G.targetChanges.get(L.targetId),le=G&&G.targetMismatches.get(L.targetId)!=null,Ae=L.view.applyChanges(W,k.isPrimaryClient,K,le);return Sh(k,L.targetId,Ae.au),Ae.snapshot})(t,m,E,x);const i=await yh(t.localStore,e,!0),o=new n3(e,i.Qs),a=o.ru(i.documents),l=Bs.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),h=o.applyChanges(a,t.isPrimaryClient,l);Sh(t,n,h.au);const d=new r3(e,n,o);return t.Tu.set(e,d),t.Iu.has(n)?t.Iu.get(n).push(e):t.Iu.set(n,[e]),h.snapshot}async function c3(t,e,n){const r=se(t),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter((o=>!_u(o,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Ko(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Ba(r.remoteStore,s.targetId),Qo(r,s.targetId)})).catch(Or)):(Qo(r,s.targetId),await Ko(r.localStore,s.targetId,!0))}async function l3(t,e){const n=se(t),r=n.Tu.get(e),s=n.Iu.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Ba(n.remoteStore,r.targetId))}async function h3(t,e,n){const r=y3(t);try{const s=await(function(o,a){const l=se(o),h=Ie.now(),d=a.reduce(((x,R)=>x.add(R.key)),ce());let m,E;return l.persistence.runTransaction("Locally write mutations","readwrite",(x=>{let R=un(),k=ce();return l.Ns.getEntries(x,d).next((L=>{R=L,R.forEach((($,G)=>{G.isValidDocument()||(k=k.add($))}))})).next((()=>l.localDocuments.getOverlayedDocuments(x,R))).next((L=>{m=L;const $=[];for(const G of a){const W=Ay(G,m.get(G.key).overlayedDocument);W!=null&&$.push(new nr(G.key,W,L0(W.value.mapValue),Lt.exists(!0)))}return l.mutationQueue.addMutationBatch(x,h,$,a)})).next((L=>{E=L;const $=L.applyToLocalDocumentSet(m,k);return l.documentOverlayCache.saveOverlays(x,L.batchId,$)}))})).then((()=>({batchId:E.batchId,changes:Q0(m)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(o,a,l){let h=o.Vu[o.currentUser.toKey()];h||(h=new Se(ae)),h=h.insert(a,l),o.Vu[o.currentUser.toKey()]=h})(r,s.batchId,n),await js(r,s.changes),await wu(r.remoteStore)}catch(s){const i=Ha(s,"Failed to persist write");n.reject(i)}}async function Dd(t,e){const n=se(t);try{const r=await Tb(n.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=n.Au.get(i);o&&(ye(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?ye(o.hu,14607):s.removedDocuments.size>0&&(ye(o.hu,42227),o.hu=!1))})),await js(n,r,e)}catch(r){await Or(r)}}function xh(t,e,n){const r=se(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Tu.forEach(((i,o)=>{const a=o.view.va(e);a.snapshot&&s.push(a.snapshot)})),(function(o,a){const l=se(o);l.onlineState=a;let h=!1;l.queries.forEach(((d,m)=>{for(const E of m.Sa)E.va(a)&&(h=!0)})),h&&Ka(l)})(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function f3(t,e,n){const r=se(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Au.get(e),i=s&&s.key;if(i){let o=new Se(Y.comparator);o=o.insert(i,tt.newNoDocument(i,ne.min()));const a=ce().add(i),l=new Tu(ne.min(),new Map,new Se(ae),o,a);await Dd(r,l),r.du=r.du.remove(i),r.Au.delete(e),Wa(r)}else await Ko(r.localStore,e,!1).then((()=>Qo(r,e,n))).catch(Or)}async function d3(t,e){const n=se(t),r=e.batch.batchId;try{const s=await Eb(n.localStore,e);Pd(n,r,null),Rd(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await js(n,s)}catch(s){await Or(s)}}async function p3(t,e,n){const r=se(t);try{const s=await(function(o,a){const l=se(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let d;return l.mutationQueue.lookupMutationBatch(h,a).next((m=>(ye(m!==null,37113),d=m.keys(),l.mutationQueue.removeMutationBatch(h,m)))).next((()=>l.mutationQueue.performConsistencyCheck(h))).next((()=>l.documentOverlayCache.removeOverlaysForBatchId(h,d,a))).next((()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,d))).next((()=>l.localDocuments.getDocuments(h,d)))}))})(r.localStore,e);Pd(r,e,n),Rd(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await js(r,s)}catch(s){await Or(s)}}function Rd(t,e){(t.mu.get(e)||[]).forEach((n=>{n.resolve()})),t.mu.delete(e)}function Pd(t,e,n){const r=se(t);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Qo(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Iu.get(e))t.Tu.delete(r),n&&t.Pu.yu(r,n);t.Iu.delete(e),t.isPrimaryClient&&t.Ru.jr(e).forEach((r=>{t.Ru.containsKey(r)||Vd(t,r)}))}function Vd(t,e){t.Eu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(Ba(t.remoteStore,n),t.du=t.du.remove(e),t.Au.delete(n),Wa(t))}function Sh(t,e,n){for(const r of n)r instanceof Cd?(t.Ru.addReference(r.key,e),m3(t,r)):r instanceof xd?(H(Ga,"Document no longer in limbo: "+r.key),t.Ru.removeReference(r.key,e),t.Ru.containsKey(r.key)||Vd(t,r.key)):ee(19791,{wu:r})}function m3(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Eu.has(r)||(H(Ga,"New document in limbo: "+n),t.Eu.add(r),Wa(t))}function Wa(t){for(;t.Eu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Eu.values().next().value;t.Eu.delete(e);const n=new Y(Ce.fromString(e)),r=t.fu.next();t.Au.set(r,new s3(n)),t.du=t.du.insert(n,r),Ed(t.remoteStore,new bn(Mt(H0(n.path)),r,"TargetPurposeLimboResolution",du.ce))}}async function js(t,e,n){const r=se(t),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach(((a,l)=>{o.push(r.pu(l,e,n).then((h=>{if((h||n)&&r.isPrimaryClient){const d=h?!h.fromCache:n?.targetChanges.get(l.targetId)?.current;r.sharedClientState.updateQueryState(l.targetId,d?"current":"not-current")}if(h){s.push(h);const d=La.As(l.targetId,h);i.push(d)}})))})),await Promise.all(o),r.Pu.H_(s),await(async function(l,h){const d=se(l);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>P.forEach(h,(E=>P.forEach(E.Es,(x=>d.persistence.referenceDelegate.addReference(m,E.targetId,x))).next((()=>P.forEach(E.ds,(x=>d.persistence.referenceDelegate.removeReference(m,E.targetId,x)))))))))}catch(m){if(!Mr(m))throw m;H(Ua,"Failed to update sequence numbers: "+m)}for(const m of h){const E=m.targetId;if(!m.fromCache){const x=d.Ms.get(E),R=x.snapshotVersion,k=x.withLastLimboFreeSnapshotVersion(R);d.Ms=d.Ms.insert(E,k)}}})(r.localStore,i))}async function g3(t,e){const n=se(t);if(!n.currentUser.isEqual(e)){H(Ga,"User change. New user:",e.toKey());const r=await gd(n.localStore,e);n.currentUser=e,(function(i,o){i.mu.forEach((a=>{a.forEach((l=>{l.reject(new X(N.CANCELLED,o))}))})),i.mu.clear()})(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await js(n,r.Ls)}}function _3(t,e){const n=se(t),r=n.Au.get(e);if(r&&r.hu)return ce().add(r.key);{let s=ce();const i=n.Iu.get(e);if(!i)return s;for(const o of i){const a=n.Tu.get(o);s=s.unionWith(a.view.nu)}return s}}function Fd(t){const e=se(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Dd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=_3.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=f3.bind(null,e),e.Pu.H_=Zb.bind(null,e.eventManager),e.Pu.yu=e3.bind(null,e.eventManager),e}function y3(t){const e=se(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=d3.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=p3.bind(null,e),e}class Gi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=vu(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return bb(this.persistence,new gb,e.initialUser,this.serializer)}Cu(e){return new md(Ma.mi,this.serializer)}Du(e){return new Cb}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Gi.provider={build:()=>new Gi};class b3 extends Gi{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){ye(this.persistence.referenceDelegate instanceof Hi,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new tb(r,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?ht.withCacheSize(this.cacheSizeBytes):ht.DEFAULT;return new md((r=>Hi.mi(r,n)),this.serializer)}}class Xo{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>xh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=g3.bind(null,this.syncEngine),await Wb(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Xb})()}createDatastore(e){const n=vu(e.databaseInfo.databaseId),r=(function(i){return new Pb(i)})(e.databaseInfo);return(function(i,o,a,l){return new kb(i,o,a,l)})(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return(function(r,s,i,o,a){return new Mb(r,s,i,o,a)})(this.localStore,this.datastore,e.asyncQueue,(n=>xh(this.syncEngine,n,0)),(function(){return Th.v()?new Th:new xb})())}createSyncEngine(e,n){return(function(s,i,o,a,l,h,d){const m=new i3(s,i,o,a,l,h);return d&&(m.gu=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){await(async function(n){const r=se(n);H(Yn,"RemoteStore shutting down."),r.Ea.add(5),await qs(r),r.Aa.shutdown(),r.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Xo.provider={build:()=>new Xo};/**
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
 */class E3{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):sn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout((()=>{this.muted||e(n)}),0)}}/**
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
 */const Fn="FirestoreClient";class T3{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=lt.UNAUTHENTICATED,this.clientId=wa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{H(Fn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(H(Fn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new An;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Ha(n,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function po(t,e){t.asyncQueue.verifyOperationInProgress(),H(Fn,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((async s=>{r.isEqual(s)||(await gd(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t._offlineComponents=e}async function Dh(t,e){t.asyncQueue.verifyOperationInProgress();const n=await v3(t);H(Fn,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener((r=>Ah(e.remoteStore,r))),t.setAppCheckTokenChangeListener(((r,s)=>Ah(e.remoteStore,s))),t._onlineComponents=e}async function v3(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){H(Fn,"Using user provided OfflineComponentProvider");try{await po(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!(function(s){return s.name==="FirebaseError"?s.code===N.FAILED_PRECONDITION||s.code===N.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(n))throw n;Cs("Error using user provided cache. Falling back to memory cache: "+n),await po(t,new Gi)}}else H(Fn,"Using default OfflineComponentProvider"),await po(t,new b3(void 0));return t._offlineComponents}async function Nd(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(H(Fn,"Using user provided OnlineComponentProvider"),await Dh(t,t._uninitializedComponentsProvider._online)):(H(Fn,"Using default OnlineComponentProvider"),await Dh(t,new Xo))),t._onlineComponents}function A3(t){return Nd(t).then((e=>e.syncEngine))}async function w3(t){const e=await Nd(t),n=e.eventManager;return n.onListen=u3.bind(null,e.syncEngine),n.onUnlisten=c3.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=o3.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=l3.bind(null,e.syncEngine),n}function I3(t,e,n={}){const r=new An;return t.asyncQueue.enqueueAndForget((async()=>(function(i,o,a,l,h){const d=new E3({next:E=>{d.Nu(),o.enqueueAndForget((()=>Yb(i,m))),E.fromCache&&l.source==="server"?h.reject(new X(N.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(E)},error:E=>h.reject(E)}),m=new t3(a,d,{includeMetadataChanges:!0,qa:!0});return Jb(i,m)})(await w3(t),t.asyncQueue,e,n,r))),r.promise}/**
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
 */function kd(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const Rh=new Map;/**
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
 */const C3="firestore.googleapis.com",Ph=!0;class Vh{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new X(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=C3,this.ssl=Ph}else this.host=e.host,this.ssl=e.ssl??Ph;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=pd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Zy)throw new X(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}k2("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=kd(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new X(N.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new X(N.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new X(N.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Od{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Vh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new X(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new X(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Vh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new I2;switch(r.type){case"firstParty":return new S2(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new X(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(n){const r=Rh.get(n);r&&(H("ComponentProvider","Removing Datastore"),Rh.delete(n),r.terminate())})(this),Promise.resolve()}}/**
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
 */class Iu{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Iu(this.firestore,e,this._query)}}class nt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ns(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new nt(this.firestore,e,this._key)}toJSON(){return{type:nt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(Ls(n,nt._jsonSchema))return new nt(e,r||null,new Y(Ce.fromString(n.referencePath)))}}nt._jsonSchemaVersion="firestore/documentReference/1.0",nt._jsonSchema={type:Ve("string",nt._jsonSchemaVersion),referencePath:Ve("string")};class Ns extends Iu{constructor(e,n,r){super(e,n,H0(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new nt(this.firestore,null,new Y(e))}withConverter(e){return new Ns(this.firestore,e,this._path)}}function x3(t,e,...n){if(t=xn(t),arguments.length===1&&(e=wa.newId()),N2("doc","path",e),t instanceof Od){const r=Ce.fromString(e,...n);return Kl(r),new nt(t,null,new Y(r))}{if(!(t instanceof nt||t instanceof Ns))throw new X(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ce.fromString(e,...n));return Kl(r),new nt(t.firestore,t instanceof Ns?t.converter:null,new Y(r))}}/**
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
 */const Fh="AsyncQueue";class Nh{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new yd(this,"async_queue_retry"),this._c=()=>{const r=fo();r&&H(Fh,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const n=fo();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=fo();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const n=new An;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise))).then((()=>n.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Mr(e))throw e;H(Fh,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const n=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,sn("INTERNAL UNHANDLED ERROR: ",kh(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=n,n}enqueueAfterDelay(e,n,r){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const s=$a.createAndSchedule(this,e,n,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&ee(47125,{Pc:kh(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((n,r)=>n.targetTimeMs-r.targetTimeMs));for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function kh(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}class Cu extends Od{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new Nh,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Nh(e),this._firestoreClient=void 0,await e}}}function Md(t){if(t._terminated)throw new X(N.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||S3(t),t._firestoreClient}function S3(t){const e=t._freezeSettings(),n=(function(s,i,o,a){return new K2(s,i,o,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,kd(a.experimentalLongPollingOptions),a.useFetchStreams,a.isUsingEmulator)})(t._databaseId,t._app?.options.appId||"",t._persistenceKey,e);t._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new T3(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(t._componentsProvider))}/**
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
 */class bt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new bt(Qe.fromBase64String(e))}catch(n){throw new X(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new bt(Qe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:bt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ls(e,bt._jsonSchema))return bt.fromBase64String(e.bytes)}}bt._jsonSchemaVersion="firestore/bytes/1.0",bt._jsonSchema={type:Ve("string",bt._jsonSchemaVersion),bytes:Ve("string")};/**
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
 */class Qa{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new X(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new We(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Xa{constructor(e){this._methodName=e}}/**
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
 */class Bt{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new X(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new X(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ae(this._lat,e._lat)||ae(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Bt._jsonSchemaVersion}}static fromJSON(e){if(Ls(e,Bt._jsonSchema))return new Bt(e.latitude,e.longitude)}}Bt._jsonSchemaVersion="firestore/geoPoint/1.0",Bt._jsonSchema={type:Ve("string",Bt._jsonSchemaVersion),latitude:Ve("number"),longitude:Ve("number")};/**
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
 */class qt{constructor(e){this._values=(e||[]).map((n=>n))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:qt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ls(e,qt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((n=>typeof n=="number")))return new qt(e.vectorValues);throw new X(N.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}qt._jsonSchemaVersion="firestore/vectorValue/1.0",qt._jsonSchema={type:Ve("string",qt._jsonSchemaVersion),vectorValues:Ve("object")};/**
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
 */const D3=/^__.*__$/;class R3{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new nr(e,this.data,this.fieldMask,n,this.fieldTransforms):new Us(e,this.data,n,this.fieldTransforms)}}function Ld(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ee(40011,{Ac:t})}}class Ja{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Ja({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const n=this.path?.child(e),r=this.Vc({path:n,fc:!1});return r.gc(e),r}yc(e){const n=this.path?.child(e),r=this.Vc({path:n,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Wi(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((n=>e.isPrefixOf(n)))!==void 0||this.fieldTransforms.find((n=>e.isPrefixOf(n.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Ld(this.Ac)&&D3.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class P3{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||vu(e)}Cc(e,n,r,s=!1){return new Ja({Ac:e,methodName:n,Dc:r,path:We.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function V3(t){const e=t._freezeSettings(),n=vu(t._databaseId);return new P3(t._databaseId,!!e.ignoreUndefinedProperties,n)}function F3(t,e,n,r,s,i={}){const o=t.Cc(i.merge||i.mergeFields?2:0,e,n,s);jd("Data must be an object, but it was:",o,r);const a=Bd(r,o);let l,h;if(i.merge)l=new It(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const m of i.mergeFields){const E=N3(e,m,n);if(!o.contains(E))throw new X(N.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);O3(d,E)||d.push(E)}l=new It(d),h=o.fieldTransforms.filter((m=>l.covers(m.field)))}else l=null,h=o.fieldTransforms;return new R3(new yt(a),l,h)}class Ya extends Xa{_toFieldTransform(e){return new by(e.path,new Ps)}isEqual(e){return e instanceof Ya}}function Ud(t,e){if(qd(t=xn(t)))return jd("Unsupported field value:",e,t),Bd(t,e);if(t instanceof Xa)return(function(r,s){if(!Ld(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const a of r){let l=Ud(a,s.wc(o));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),o++}return{arrayValue:{values:i}}})(t,e)}return(function(r,s){if((r=xn(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return gy(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Ie.fromDate(r);return{timestampValue:$i(s.serializer,i)}}if(r instanceof Ie){const i=new Ie(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:$i(s.serializer,i)}}if(r instanceof Bt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof bt)return{bytesValue:od(s.serializer,r._byteString)};if(r instanceof nt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:ka(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof qt)return(function(o,a){return{mapValue:{fields:{[O0]:{stringValue:M0},[Bi]:{arrayValue:{values:o.toArray().map((h=>{if(typeof h!="number")throw a.Sc("VectorValues must only contain numeric values.");return Pa(a.serializer,h)}))}}}}}})(r,s);throw s.Sc(`Unsupported field value: ${Ia(r)}`)})(t,e)}function Bd(t,e){const n={};return R0(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):er(t,((r,s)=>{const i=Ud(s,e.mc(r));i!=null&&(n[r]=i)})),{mapValue:{fields:n}}}function qd(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ie||t instanceof Bt||t instanceof bt||t instanceof nt||t instanceof Xa||t instanceof qt)}function jd(t,e,n){if(!qd(n)||!S0(n)){const r=Ia(n);throw r==="an object"?e.Sc(t+" a custom object"):e.Sc(t+" "+r)}}function N3(t,e,n){if((e=xn(e))instanceof Qa)return e._internalPath;if(typeof e=="string")return zd(t,e);throw Wi("Field path arguments must be of type string or ",t,!1,void 0,n)}const k3=new RegExp("[~\\*/\\[\\]]");function zd(t,e,n){if(e.search(k3)>=0)throw Wi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Qa(...e.split("."))._internalPath}catch{throw Wi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Wi(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${r}`),o&&(l+=` in document ${s}`),l+=")"),new X(N.INVALID_ARGUMENT,a+t+l)}function O3(t,e){return t.some((n=>n.isEqual(e)))}/**
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
 */class $d{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new nt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new M3(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Hd("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class M3 extends $d{data(){return super.data()}}function Hd(t,e){return typeof e=="string"?zd(t,e):e instanceof Qa?e._internalPath:e._delegate._internalPath}/**
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
 */function L3(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new X(N.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class U3{convertValue(e,n="none"){switch(Pn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Re(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Rn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw ee(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return er(e,((s,i)=>{r[s]=this.convertValue(i,n)})),r}convertVectorValue(e){const n=e.fields?.[Bi].arrayValue?.values?.map((r=>Re(r.doubleValue)));return new qt(n)}convertGeoPoint(e){return new Bt(Re(e.latitude),Re(e.longitude))}convertArray(e,n){return(e.values||[]).map((r=>this.convertValue(r,n)))}convertServerTimestamp(e,n){switch(n){case"previous":const r=mu(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Ss(e));default:return null}}convertTimestamp(e){const n=Dn(e);return new Ie(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Ce.fromString(e);ye(dd(r),9688,{name:e});const s=new Ds(r.get(1),r.get(3)),i=new Y(r.popFirst(5));return s.isEqual(n)||sn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */function B3(t,e,n){let r;return r=t?t.toFirestore(e):e,r}class mi{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Ar extends $d{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Ci(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Hd("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new X(N.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=Ar._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}Ar._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ar._jsonSchema={type:Ve("string",Ar._jsonSchemaVersion),bundleSource:Ve("string","DocumentSnapshot"),bundleName:Ve("string"),bundle:Ve("string")};class Ci extends Ar{data(e={}){return super.data(e)}}class wr{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new mi(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((n=>e.push(n))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach((r=>{e.call(n,new Ci(this._firestore,this._userDataWriter,r.key,r,new mi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new X(N.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((a=>{const l=new Ci(s._firestore,s._userDataWriter,a.doc.key,a.doc,new mi(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);return a.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((a=>i||a.type!==3)).map((a=>{const l=new Ci(s._firestore,s._userDataWriter,a.doc.key,a.doc,new mi(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,d=-1;return a.type!==0&&(h=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),d=o.indexOf(a.doc.key)),{type:q3(a.type),doc:l,oldIndex:h,newIndex:d}}))}})(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new X(N.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=wr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=wa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(n.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function q3(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ee(61501,{type:t})}}wr._jsonSchemaVersion="firestore/querySnapshot/1.0",wr._jsonSchema={type:Ve("string",wr._jsonSchemaVersion),bundleSource:Ve("string","QuerySnapshot"),bundleName:Ve("string"),bundle:Ve("string")};class j3 extends U3{constructor(e){super(),this.firestore=e}convertBytes(e){return new bt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new nt(this.firestore,null,n)}}function L6(t){t=Li(t,Iu);const e=Li(t.firestore,Cu),n=Md(e),r=new j3(e);return L3(t._query),I3(n,t._query).then((s=>new wr(e,r,t,s)))}function U6(t){return Kd(Li(t.firestore,Cu),[new Va(t._key,Lt.none())])}function B6(t,e){const n=Li(t.firestore,Cu),r=x3(t),s=B3(t.converter,e);return Kd(n,[F3(V3(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,Lt.exists(!1))]).then((()=>r))}function Kd(t,e){return(function(r,s){const i=new An;return r.asyncQueue.enqueueAndForget((async()=>h3(await A3(r),s,i))),i.promise})(Md(t),e)}function q6(){return new Ya("serverTimestamp")}(function(e,n=!0){(function(s){kr=s})(fu),Dr(new Sr("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),a=new Cu(new C2(r.getProvider("auth-internal")),new D2(o,r.getProvider("app-check-internal")),(function(h,d){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new X(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ds(h.options.projectId,d)})(o,s),o);return i={useFetchStreams:n,...i},a._setSettings(i),a}),"PUBLIC").setMultipleInstances(!0)),Xn(jl,zl,e),Xn(jl,zl,"esm2020")})();function Gd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const z3=Gd,Wd=new Ms("auth","Firebase",Gd());/**
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
 */const Qi=new Ea("@firebase/auth");function $3(t,...e){Qi.logLevel<=oe.WARN&&Qi.warn(`Auth (${fu}): ${t}`,...e)}function xi(t,...e){Qi.logLevel<=oe.ERROR&&Qi.error(`Auth (${fu}): ${t}`,...e)}/**
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
 */function Oh(t,...e){throw Za(t,...e)}function Qd(t,...e){return Za(t,...e)}function Xd(t,e,n){const r={...z3(),[e]:n};return new Ms("auth","Firebase",r).create(e,{appName:t.name})}function Si(t){return Xd(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Za(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Wd.create(t,...e)}function me(t,e,...n){if(!t)throw Za(e,...n)}function _s(t){const e="INTERNAL ASSERTION FAILED: "+t;throw xi(e),new Error(e)}function Xi(t,e){t||_s(e)}function H3(){return Mh()==="http:"||Mh()==="https:"}function Mh(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function K3(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(H3()||c_()||"connection"in navigator)?navigator.onLine:!0}function G3(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class zs{constructor(e,n){this.shortDelay=e,this.longDelay=n,Xi(n>e,"Short delay should be less than long delay!"),this.isMobile=u_()||l_()}get(){return K3()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function W3(t,e){Xi(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Jd{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;_s("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;_s("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;_s("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Q3={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const X3=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],J3=new zs(3e4,6e4);function Yd(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function xu(t,e,n,r,s={}){return Zd(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const a=g0({key:t.config.apiKey,...o}).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const h={method:e,headers:l,...i};return a_()||(h.referrerPolicy="no-referrer"),t.emulatorConfig&&ba(t.emulatorConfig.host)&&(h.credentials="include"),Jd.fetch()(await ep(t,t.config.apiHost,n,a),h)})}async function Zd(t,e,n){t._canInitEmulator=!1;const r={...Q3,...e};try{const s=new Y3(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw gi(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[l,h]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw gi(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw gi(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw gi(t,"user-disabled",o);const d=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Xd(t,d,h);Oh(t,d)}}catch(s){if(s instanceof kn)throw s;Oh(t,"network-request-failed",{message:String(s)})}}async function ep(t,e,n,r){const s=`${e}${n}?${r}`,i=t,o=i.config.emulator?W3(t.config,s):`${t.config.apiScheme}://${s}`;return X3.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class Y3{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Qd(this.auth,"network-request-failed")),J3.get())})}}function gi(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Qd(t,e,r);return s.customData._tokenResponse=n,s}/**
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
 */async function Z3(t,e){return xu(t,"POST","/v1/accounts:delete",e)}async function Ji(t,e){return xu(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function ys(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function e6(t,e=!1){const n=xn(t),r=await n.getIdToken(e),s=tp(r);me(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:ys(mo(s.auth_time)),issuedAtTime:ys(mo(s.iat)),expirationTime:ys(mo(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function mo(t){return Number(t)*1e3}function tp(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return xi("JWT malformed, contained fewer than 3 sections"),null;try{const s=p0(n);return s?JSON.parse(s):(xi("Failed to decode base64 JWT payload"),null)}catch(s){return xi("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Lh(t){const e=tp(t);return me(e,"internal-error"),me(typeof e.exp<"u","internal-error"),me(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Jo(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof kn&&t6(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function t6({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class n6{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Yo{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ys(this.lastLoginAt),this.creationTime=ys(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Yi(t){const e=t.auth,n=await t.getIdToken(),r=await Jo(t,Ji(e,{idToken:n}));me(r?.users.length,e,"internal-error");const s=r.users[0];t._notifyReloadListener(s);const i=s.providerUserInfo?.length?np(s.providerUserInfo):[],o=s6(t.providerData,i),a=t.isAnonymous,l=!(t.email&&s.passwordHash)&&!o?.length,h=a?l:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Yo(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(t,d)}async function r6(t){const e=xn(t);await Yi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function s6(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function np(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
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
 */async function i6(t,e){const n=await Zd(t,{},async()=>{const r=g0({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=await ep(t,s,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:a,body:r};return t.emulatorConfig&&ba(t.emulatorConfig.host)&&(l.credentials="include"),Jd.fetch()(o,l)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function u6(t,e){return xu(t,"POST","/v2/accounts:revokeToken",Yd(t,e))}/**
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
 */class Ir{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){me(e.idToken,"internal-error"),me(typeof e.idToken<"u","internal-error"),me(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Lh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){me(e.length!==0,"internal-error");const n=Lh(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(me(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await i6(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Ir;return r&&(me(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(me(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(me(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ir,this.toJSON())}_performRefresh(){return _s("not implemented")}}/**
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
 */function dn(t,e){me(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class kt{constructor({uid:e,auth:n,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new n6(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Yo(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await Jo(this,this.stsTokenManager.getToken(this.auth,e));return me(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return e6(this,e)}reload(){return r6(this)}_assign(e){this!==e&&(me(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new kt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){me(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Yi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Kn(this.auth.app))return Promise.reject(Si(this.auth));const e=await this.getIdToken();return await Jo(this,Z3(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,s=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,l=n._redirectEventId??void 0,h=n.createdAt??void 0,d=n.lastLoginAt??void 0,{uid:m,emailVerified:E,isAnonymous:x,providerData:R,stsTokenManager:k}=n;me(m&&k,e,"internal-error");const L=Ir.fromJSON(this.name,k);me(typeof m=="string",e,"internal-error"),dn(r,e.name),dn(s,e.name),me(typeof E=="boolean",e,"internal-error"),me(typeof x=="boolean",e,"internal-error"),dn(i,e.name),dn(o,e.name),dn(a,e.name),dn(l,e.name),dn(h,e.name),dn(d,e.name);const $=new kt({uid:m,auth:e,email:s,emailVerified:E,displayName:r,isAnonymous:x,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:L,createdAt:h,lastLoginAt:d});return R&&Array.isArray(R)&&($.providerData=R.map(G=>({...G}))),l&&($._redirectEventId=l),$}static async _fromIdTokenResponse(e,n,r=!1){const s=new Ir;s.updateFromServerResponse(n);const i=new kt({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Yi(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];me(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?np(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,a=new Ir;a.updateFromIdToken(r);const l=new kt({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Yo(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(l,h),l}}/**
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
 */const Uh=new Map;function Wn(t){Xi(t instanceof Function,"Expected a class definition");let e=Uh.get(t);return e?(Xi(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Uh.set(t,e),e)}/**
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
 */class rp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}rp.type="NONE";const Bh=rp;/**
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
 */function go(t,e,n){return`firebase:${t}:${e}:${n}`}class Cr{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=go(this.userKey,s.apiKey,i),this.fullPersistenceKey=go("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Ji(this.auth,{idToken:e}).catch(()=>{});return n?kt._fromGetAccountInfoResponse(this.auth,n,e):null}return kt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Cr(Wn(Bh),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Wn(Bh);const o=go(r,e.config.apiKey,e.name);let a=null;for(const h of n)try{const d=await h._get(o);if(d){let m;if(typeof d=="string"){const E=await Ji(e,{idToken:d}).catch(()=>{});if(!E)break;m=await kt._fromGetAccountInfoResponse(e,E,d)}else m=kt._fromJSON(e,d);h!==i&&(a=m),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Cr(i,e,r):(i=l[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Cr(i,e,r))}}/**
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
 */function qh(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(l6(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(o6(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(f6(e))return"Blackberry";if(d6(e))return"Webos";if(a6(e))return"Safari";if((e.includes("chrome/")||c6(e))&&!e.includes("edge/"))return"Chrome";if(h6(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if(r?.length===2)return r[1]}return"Other"}function o6(t=xt()){return/firefox\//i.test(t)}function a6(t=xt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function c6(t=xt()){return/crios\//i.test(t)}function l6(t=xt()){return/iemobile/i.test(t)}function h6(t=xt()){return/android/i.test(t)}function f6(t=xt()){return/blackberry/i.test(t)}function d6(t=xt()){return/webos/i.test(t)}/**
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
 */function sp(t,e=[]){let n;switch(t){case"Browser":n=qh(xt());break;case"Worker":n=`${qh(xt())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${fu}/${r}`}/**
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
 */class p6{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,a)=>{try{const l=e(i);o(l)}catch(l){a(l)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function m6(t,e={}){return xu(t,"GET","/v2/passwordPolicy",Yd(t,e))}/**
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
 */const g6=6;class _6{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??g6,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class y6{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new jh(this),this.idTokenSubscription=new jh(this),this.beforeStateQueue=new p6(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Wn(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Cr.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Ji(this,{idToken:e}),r=await kt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Kn(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=r?._redirectEventId,a=await this.tryRedirectSignIn(e);(!i||i===o)&&a?.user&&(r=a.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return me(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Yi(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=G3()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Kn(this.app))return Promise.reject(Si(this));const n=e?xn(e):null;return n&&me(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&me(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Kn(this.app)?Promise.reject(Si(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Kn(this.app)?Promise.reject(Si(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Wn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await m6(this),n=new _6(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ms("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await u6(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Wn(e)||this._popupRedirectResolver;me(n,this,"argument-error"),this.redirectPersistenceManager=await Cr.create(this,[Wn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(me(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,r,s);return()=>{o=!0,l()}}else{const l=e.addObserver(n);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return me(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=sp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Kn(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&$3(`Error while retrieving App Check token: ${e.error}`),e?.token}}function b6(t){return xn(t)}class jh{constructor(e){this.auth=e,this.observer=null,this.addObserver=__(n=>this.observer=n)}get next(){return me(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function E6(t,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(Wn);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}new zs(3e4,6e4);/**
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
 */new zs(2e3,1e4);/**
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
 */new zs(3e4,6e4);/**
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
 */new zs(5e3,15e3);var zh="@firebase/auth",$h="1.11.0";/**
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
 */class T6{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){me(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function v6(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function A6(t){Dr(new Sr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;me(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:sp(t)},h=new y6(r,s,i,l);return E6(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Dr(new Sr("auth-internal",e=>{const n=b6(e.getProvider("auth").getImmediate());return(r=>new T6(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Xn(zh,$h,v6(t)),Xn(zh,$h,"esm2020")}/**
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
 */const w6=300;i_("authIdTokenMaxAge");A6("Browser");export{U6 as A,f1 as B,B6 as C,x3 as D,V6 as E,Jt as F,vt as L,Zf as P,mg as a,dg as b,cu as c,k6 as d,lu as e,sg as f,I6 as g,S1 as h,S6 as i,Gf as j,x6 as k,_1 as l,F6 as m,D6 as n,xm as o,O6 as p,P6 as q,Xn as r,q6 as s,C6 as t,N6 as u,R6 as v,Xu as w,sa as x,Lp as y,L6 as z};
//# sourceMappingURL=vendor-D1zEduYY.js.map
