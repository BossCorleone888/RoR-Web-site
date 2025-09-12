/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function va(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const ve={},Is=[],Mt=()=>{},Vf=()=>!1,gu=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Ta=n=>n.startsWith("onUpdate:"),lt=Object.assign,Ia=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},C1=Object.prototype.hasOwnProperty,_e=(n,e)=>C1.call(n,e),ie=Array.isArray,ws=n=>_u(n)==="[object Map]",S1=n=>_u(n)==="[object Set]",ue=n=>typeof n=="function",Be=n=>typeof n=="string",Gr=n=>typeof n=="symbol",Fe=n=>n!==null&&typeof n=="object",Of=n=>(Fe(n)||ue(n))&&ue(n.then)&&ue(n.catch),x1=Object.prototype.toString,_u=n=>x1.call(n),R1=n=>_u(n).slice(8,-1),D1=n=>_u(n)==="[object Object]",wa=n=>Be(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,As=va(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),yu=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},P1=/-\w/g,kn=yu(n=>n.replace(P1,e=>e.slice(1).toUpperCase())),N1=/\B([A-Z])/g,lr=yu(n=>n.replace(N1,"-$1").toLowerCase()),Mf=yu(n=>n.charAt(0).toUpperCase()+n.slice(1)),io=yu(n=>n?`on${Mf(n)}`:""),Rn=(n,e)=>!Object.is(n,e),uo=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},Lf=(n,e,t,r=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:r,value:t})},F1=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let vl;const bu=()=>vl||(vl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Aa(n){if(ie(n)){const e={};for(let t=0;t<n.length;t++){const r=n[t],s=Be(r)?M1(r):Aa(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(Be(n)||Fe(n))return n}const k1=/;(?![^(]*\))/g,V1=/:([^]+)/,O1=/\/\*[^]*?\*\//g;function M1(n){const e={};return n.replace(O1,"").split(k1).forEach(t=>{if(t){const r=t.split(V1);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Ca(n){let e="";if(Be(n))e=n;else if(ie(n))for(let t=0;t<n.length;t++){const r=Ca(n[t]);r&&(e+=r+" ")}else if(Fe(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const L1="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",U1=va(L1);function Uf(n){return!!n||n===""}/**
* @vue/reactivity v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ht;class B1{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=ht,!e&&ht&&(this.index=(ht.scopes||(ht.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=ht;try{return ht=this,e()}finally{ht=t}}}on(){++this._on===1&&(this.prevScope=ht,ht=this)}off(){this._on>0&&--this._on===0&&(ht=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,r;for(t=0,r=this.effects.length;t<r;t++)this.effects[t].stop();for(this.effects.length=0,t=0,r=this.cleanups.length;t<r;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function q1(){return ht}let Ee;const oo=new WeakSet;class Bf{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ht&&ht.active&&ht.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,oo.has(this)&&(oo.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||jf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Tl(this),zf(this);const e=Ee,t=At;Ee=this,At=!0;try{return this.fn()}finally{$f(this),Ee=e,At=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Ra(e);this.deps=this.depsTail=void 0,Tl(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?oo.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Fo(this)&&this.run()}get dirty(){return Fo(this)}}let qf=0,Cs,Ss;function jf(n,e=!1){if(n.flags|=8,e){n.next=Ss,Ss=n;return}n.next=Cs,Cs=n}function Sa(){qf++}function xa(){if(--qf>0)return;if(Ss){let e=Ss;for(Ss=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Cs;){let e=Cs;for(Cs=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){n||(n=r)}e=t}}if(n)throw n}function zf(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function $f(n){let e,t=n.depsTail,r=t;for(;r;){const s=r.prevDep;r.version===-1?(r===t&&(t=s),Ra(r),j1(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}n.deps=e,n.depsTail=t}function Fo(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Hf(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Hf(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Ls)||(n.globalVersion=Ls,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Fo(n))))return;n.flags|=2;const e=n.dep,t=Ee,r=At;Ee=n,At=!0;try{zf(n);const s=n.fn(n._value);(e.version===0||Rn(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{Ee=t,At=r,$f(n),n.flags&=-3}}function Ra(n,e=!1){const{dep:t,prevSub:r,nextSub:s}=n;if(r&&(r.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=r,n.nextSub=void 0),t.subs===n&&(t.subs=r,!r&&t.computed)){t.computed.flags&=-5;for(let i=t.computed.deps;i;i=i.nextDep)Ra(i,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function j1(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let At=!0;const Gf=[];function tn(){Gf.push(At),At=!1}function nn(){const n=Gf.pop();At=n===void 0?!0:n}function Tl(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Ee;Ee=void 0;try{e()}finally{Ee=t}}}let Ls=0;class z1{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Da{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Ee||!At||Ee===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Ee)t=this.activeLink=new z1(Ee,this),Ee.deps?(t.prevDep=Ee.depsTail,Ee.depsTail.nextDep=t,Ee.depsTail=t):Ee.deps=Ee.depsTail=t,Wf(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const r=t.nextDep;r.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=r),t.prevDep=Ee.depsTail,t.nextDep=void 0,Ee.depsTail.nextDep=t,Ee.depsTail=t,Ee.deps===t&&(Ee.deps=r)}return t}trigger(e){this.version++,Ls++,this.notify(e)}notify(e){Sa();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{xa()}}}function Wf(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)Wf(r)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const ko=new WeakMap,er=Symbol(""),Vo=Symbol(""),Us=Symbol("");function Ze(n,e,t){if(At&&Ee){let r=ko.get(n);r||ko.set(n,r=new Map);let s=r.get(t);s||(r.set(t,s=new Da),s.map=r,s.key=t),s.track()}}function Xt(n,e,t,r,s,i){const o=ko.get(n);if(!o){Ls++;return}const a=c=>{c&&c.trigger()};if(Sa(),e==="clear")o.forEach(a);else{const c=ie(n),h=c&&wa(t);if(c&&t==="length"){const d=Number(r);o.forEach((m,_)=>{(_==="length"||_===Us||!Gr(_)&&_>=d)&&a(m)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),h&&a(o.get(Us)),e){case"add":c?h&&a(o.get("length")):(a(o.get(er)),ws(n)&&a(o.get(Vo)));break;case"delete":c||(a(o.get(er)),ws(n)&&a(o.get(Vo)));break;case"set":ws(n)&&a(o.get(er));break}}xa()}function yr(n){const e=ge(n);return e===n?e:(Ze(e,"iterate",Us),Ct(n)?e:e.map(ot))}function Pa(n){return Ze(n=ge(n),"iterate",Us),n}const $1={__proto__:null,[Symbol.iterator](){return ao(this,Symbol.iterator,ot)},concat(...n){return yr(this).concat(...n.map(e=>ie(e)?yr(e):e))},entries(){return ao(this,"entries",n=>(n[1]=ot(n[1]),n))},every(n,e){return Qt(this,"every",n,e,void 0,arguments)},filter(n,e){return Qt(this,"filter",n,e,t=>t.map(ot),arguments)},find(n,e){return Qt(this,"find",n,e,ot,arguments)},findIndex(n,e){return Qt(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return Qt(this,"findLast",n,e,ot,arguments)},findLastIndex(n,e){return Qt(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return Qt(this,"forEach",n,e,void 0,arguments)},includes(...n){return co(this,"includes",n)},indexOf(...n){return co(this,"indexOf",n)},join(n){return yr(this).join(n)},lastIndexOf(...n){return co(this,"lastIndexOf",n)},map(n,e){return Qt(this,"map",n,e,void 0,arguments)},pop(){return gs(this,"pop")},push(...n){return gs(this,"push",n)},reduce(n,...e){return Il(this,"reduce",n,e)},reduceRight(n,...e){return Il(this,"reduceRight",n,e)},shift(){return gs(this,"shift")},some(n,e){return Qt(this,"some",n,e,void 0,arguments)},splice(...n){return gs(this,"splice",n)},toReversed(){return yr(this).toReversed()},toSorted(n){return yr(this).toSorted(n)},toSpliced(...n){return yr(this).toSpliced(...n)},unshift(...n){return gs(this,"unshift",n)},values(){return ao(this,"values",ot)}};function ao(n,e,t){const r=Pa(n),s=r[e]();return r!==n&&!Ct(n)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=t(i.value)),i}),s}const H1=Array.prototype;function Qt(n,e,t,r,s,i){const o=Pa(n),a=o!==n&&!Ct(n),c=o[e];if(c!==H1[e]){const m=c.apply(n,i);return a?ot(m):m}let h=t;o!==n&&(a?h=function(m,_){return t.call(this,ot(m),_,n)}:t.length>2&&(h=function(m,_){return t.call(this,m,_,n)}));const d=c.call(o,h,r);return a&&s?s(d):d}function Il(n,e,t,r){const s=Pa(n);let i=t;return s!==n&&(Ct(n)?t.length>3&&(i=function(o,a,c){return t.call(this,o,a,c,n)}):i=function(o,a,c){return t.call(this,o,ot(a),c,n)}),s[e](i,...r)}function co(n,e,t){const r=ge(n);Ze(r,"iterate",Us);const s=r[e](...t);return(s===-1||s===!1)&&Va(t[0])?(t[0]=ge(t[0]),r[e](...t)):s}function gs(n,e,t=[]){tn(),Sa();const r=ge(n)[e].apply(n,t);return xa(),nn(),r}const G1=va("__proto__,__v_isRef,__isVue"),Kf=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Gr));function W1(n){Gr(n)||(n=String(n));const e=ge(this);return Ze(e,"has",n),e.hasOwnProperty(n)}class Qf{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,r){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return i;if(t==="__v_raw")return r===(s?i?rm:Zf:i?Xf:Yf).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=ie(e);if(!s){let c;if(o&&(c=$1[t]))return c;if(t==="hasOwnProperty")return W1}const a=Reflect.get(e,t,rt(e)?e:r);return(Gr(t)?Kf.has(t):G1(t))||(s||Ze(e,"get",t),i)?a:rt(a)?o&&wa(t)?a:a.value:Fe(a)?s?ed(a):Fa(a):a}}class Jf extends Qf{constructor(e=!1){super(!1,e)}set(e,t,r,s){let i=e[t];if(!this._isShallow){const c=ir(i);if(!Ct(r)&&!ir(r)&&(i=ge(i),r=ge(r)),!ie(e)&&rt(i)&&!rt(r))return c||(i.value=r),!0}const o=ie(e)&&wa(t)?Number(t)<e.length:_e(e,t),a=Reflect.set(e,t,r,rt(e)?e:s);return e===ge(s)&&(o?Rn(r,i)&&Xt(e,"set",t,r):Xt(e,"add",t,r)),a}deleteProperty(e,t){const r=_e(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&r&&Xt(e,"delete",t,void 0),s}has(e,t){const r=Reflect.has(e,t);return(!Gr(t)||!Kf.has(t))&&Ze(e,"has",t),r}ownKeys(e){return Ze(e,"iterate",ie(e)?"length":er),Reflect.ownKeys(e)}}class K1 extends Qf{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Q1=new Jf,J1=new K1,Y1=new Jf(!0);const Oo=n=>n,Ai=n=>Reflect.getPrototypeOf(n);function X1(n,e,t){return function(...r){const s=this.__v_raw,i=ge(s),o=ws(i),a=n==="entries"||n===Symbol.iterator&&o,c=n==="keys"&&o,h=s[n](...r),d=t?Oo:e?Mo:ot;return!e&&Ze(i,"iterate",c?Vo:er),{next(){const{value:m,done:_}=h.next();return _?{value:m,done:_}:{value:a?[d(m[0]),d(m[1])]:d(m),done:_}},[Symbol.iterator](){return this}}}}function Ci(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Z1(n,e){const t={get(s){const i=this.__v_raw,o=ge(i),a=ge(s);n||(Rn(s,a)&&Ze(o,"get",s),Ze(o,"get",a));const{has:c}=Ai(o),h=e?Oo:n?Mo:ot;if(c.call(o,s))return h(i.get(s));if(c.call(o,a))return h(i.get(a));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!n&&Ze(ge(s),"iterate",er),s.size},has(s){const i=this.__v_raw,o=ge(i),a=ge(s);return n||(Rn(s,a)&&Ze(o,"has",s),Ze(o,"has",a)),s===a?i.has(s):i.has(s)||i.has(a)},forEach(s,i){const o=this,a=o.__v_raw,c=ge(a),h=e?Oo:n?Mo:ot;return!n&&Ze(c,"iterate",er),a.forEach((d,m)=>s.call(i,h(d),h(m),o))}};return lt(t,n?{add:Ci("add"),set:Ci("set"),delete:Ci("delete"),clear:Ci("clear")}:{add(s){!e&&!Ct(s)&&!ir(s)&&(s=ge(s));const i=ge(this);return Ai(i).has.call(i,s)||(i.add(s),Xt(i,"add",s,s)),this},set(s,i){!e&&!Ct(i)&&!ir(i)&&(i=ge(i));const o=ge(this),{has:a,get:c}=Ai(o);let h=a.call(o,s);h||(s=ge(s),h=a.call(o,s));const d=c.call(o,s);return o.set(s,i),h?Rn(i,d)&&Xt(o,"set",s,i):Xt(o,"add",s,i),this},delete(s){const i=ge(this),{has:o,get:a}=Ai(i);let c=o.call(i,s);c||(s=ge(s),c=o.call(i,s)),a&&a.call(i,s);const h=i.delete(s);return c&&Xt(i,"delete",s,void 0),h},clear(){const s=ge(this),i=s.size!==0,o=s.clear();return i&&Xt(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=X1(s,n,e)}),t}function Na(n,e){const t=Z1(n,e);return(r,s,i)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?r:Reflect.get(_e(t,s)&&s in r?t:r,s,i)}const em={get:Na(!1,!1)},tm={get:Na(!1,!0)},nm={get:Na(!0,!1)};const Yf=new WeakMap,Xf=new WeakMap,Zf=new WeakMap,rm=new WeakMap;function sm(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function im(n){return n.__v_skip||!Object.isExtensible(n)?0:sm(R1(n))}function Fa(n){return ir(n)?n:ka(n,!1,Q1,em,Yf)}function um(n){return ka(n,!1,Y1,tm,Xf)}function ed(n){return ka(n,!0,J1,nm,Zf)}function ka(n,e,t,r,s){if(!Fe(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const i=im(n);if(i===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,i===2?r:t);return s.set(n,a),a}function xs(n){return ir(n)?xs(n.__v_raw):!!(n&&n.__v_isReactive)}function ir(n){return!!(n&&n.__v_isReadonly)}function Ct(n){return!!(n&&n.__v_isShallow)}function Va(n){return n?!!n.__v_raw:!1}function ge(n){const e=n&&n.__v_raw;return e?ge(e):n}function om(n){return!_e(n,"__v_skip")&&Object.isExtensible(n)&&Lf(n,"__v_skip",!0),n}const ot=n=>Fe(n)?Fa(n):n,Mo=n=>Fe(n)?ed(n):n;function rt(n){return n?n.__v_isRef===!0:!1}function A4(n){return am(n,!1)}function am(n,e){return rt(n)?n:new cm(n,e)}class cm{constructor(e,t){this.dep=new Da,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:ge(e),this._value=t?e:ot(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,r=this.__v_isShallow||Ct(e)||ir(e);e=r?e:ge(e),Rn(e,t)&&(this._rawValue=e,this._value=r?e:ot(e),this.dep.trigger())}}function lm(n){return rt(n)?n.value:n}const hm={get:(n,e,t)=>e==="__v_raw"?n:lm(Reflect.get(n,e,t)),set:(n,e,t,r)=>{const s=n[e];return rt(s)&&!rt(t)?(s.value=t,!0):Reflect.set(n,e,t,r)}};function td(n){return xs(n)?n:new Proxy(n,hm)}class fm{constructor(e,t,r){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Da(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ls-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Ee!==this)return jf(this,!0),!0}get value(){const e=this.dep.track();return Hf(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function dm(n,e,t=!1){let r,s;return ue(n)?r=n:(r=n.get,s=n.set),new fm(r,s,t)}const Si={},Wi=new WeakMap;let Yn;function pm(n,e=!1,t=Yn){if(t){let r=Wi.get(t);r||Wi.set(t,r=[]),r.push(n)}}function mm(n,e,t=ve){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:a,call:c}=t,h=$=>s?$:Ct($)||s===!1||s===0?bn($,1):bn($);let d,m,_,S,D=!1,O=!1;if(rt(n)?(m=()=>n.value,D=Ct(n)):xs(n)?(m=()=>h(n),D=!0):ie(n)?(O=!0,D=n.some($=>xs($)||Ct($)),m=()=>n.map($=>{if(rt($))return $.value;if(xs($))return h($);if(ue($))return c?c($,2):$()})):ue(n)?e?m=c?()=>c(n,2):n:m=()=>{if(_){tn();try{_()}finally{nn()}}const $=Yn;Yn=d;try{return c?c(n,3,[S]):n(S)}finally{Yn=$}}:m=Mt,e&&s){const $=m,ce=s===!0?1/0:s;m=()=>bn($(),ce)}const q=q1(),H=()=>{d.stop(),q&&q.active&&Ia(q.effects,d)};if(i&&e){const $=e;e=(...ce)=>{$(...ce),H()}}let K=O?new Array(n.length).fill(Si):Si;const Q=$=>{if(!(!(d.flags&1)||!d.dirty&&!$))if(e){const ce=d.run();if(s||D||(O?ce.some((Te,I)=>Rn(Te,K[I])):Rn(ce,K))){_&&_();const Te=Yn;Yn=d;try{const I=[ce,K===Si?void 0:O&&K[0]===Si?[]:K,S];K=ce,c?c(e,3,I):e(...I)}finally{Yn=Te}}}else d.run()};return a&&a(Q),d=new Bf(m),d.scheduler=o?()=>o(Q,!1):Q,S=$=>pm($,!1,d),_=d.onStop=()=>{const $=Wi.get(d);if($){if(c)c($,4);else for(const ce of $)ce();Wi.delete(d)}},e?r?Q(!0):K=d.run():o?o(Q.bind(null,!0),!0):d.run(),H.pause=d.pause.bind(d),H.resume=d.resume.bind(d),H.stop=H,H}function bn(n,e=1/0,t){if(e<=0||!Fe(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,rt(n))bn(n.value,e,t);else if(ie(n))for(let r=0;r<n.length;r++)bn(n[r],e,t);else if(S1(n)||ws(n))n.forEach(r=>{bn(r,e,t)});else if(D1(n)){for(const r in n)bn(n[r],e,t);for(const r of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,r)&&bn(n[r],e,t)}return n}/**
* @vue/runtime-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ys(n,e,t,r){try{return r?n(...r):n()}catch(s){Eu(s,e,t)}}function zt(n,e,t,r){if(ue(n)){const s=Ys(n,e,t,r);return s&&Of(s)&&s.catch(i=>{Eu(i,e,t)}),s}if(ie(n)){const s=[];for(let i=0;i<n.length;i++)s.push(zt(n[i],e,t,r));return s}}function Eu(n,e,t,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||ve;if(e){let a=e.parent;const c=e.proxy,h=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const d=a.ec;if(d){for(let m=0;m<d.length;m++)if(d[m](n,c,h)===!1)return}a=a.parent}if(i){tn(),Ys(i,null,10,[n,c,h]),nn();return}}gm(n,t,s,r,o)}function gm(n,e,t,r=!0,s=!1){if(s)throw n;console.error(n)}const at=[];let Dt=-1;const Ar=[];let gn=null,br=0;const nd=Promise.resolve();let Ki=null;function _m(n){const e=Ki||nd;return n?e.then(this?n.bind(this):n):e}function ym(n){let e=Dt+1,t=at.length;for(;e<t;){const r=e+t>>>1,s=at[r],i=Bs(s);i<n||i===n&&s.flags&2?e=r+1:t=r}return e}function Oa(n){if(!(n.flags&1)){const e=Bs(n),t=at[at.length-1];!t||!(n.flags&2)&&e>=Bs(t)?at.push(n):at.splice(ym(e),0,n),n.flags|=1,rd()}}function rd(){Ki||(Ki=nd.then(id))}function bm(n){ie(n)?Ar.push(...n):gn&&n.id===-1?gn.splice(br+1,0,n):n.flags&1||(Ar.push(n),n.flags|=1),rd()}function wl(n,e,t=Dt+1){for(;t<at.length;t++){const r=at[t];if(r&&r.flags&2){if(n&&r.id!==n.uid)continue;at.splice(t,1),t--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function sd(n){if(Ar.length){const e=[...new Set(Ar)].sort((t,r)=>Bs(t)-Bs(r));if(Ar.length=0,gn){gn.push(...e);return}for(gn=e,br=0;br<gn.length;br++){const t=gn[br];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}gn=null,br=0}}const Bs=n=>n.id==null?n.flags&2?-1:1/0:n.id;function id(n){try{for(Dt=0;Dt<at.length;Dt++){const e=at[Dt];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Ys(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Dt<at.length;Dt++){const e=at[Dt];e&&(e.flags&=-2)}Dt=-1,at.length=0,sd(),Ki=null,(at.length||Ar.length)&&id()}}let kt=null,ud=null;function Qi(n){const e=kt;return kt=n,ud=n&&n.type.__scopeId||null,e}function Em(n,e=kt,t){if(!e||n._n)return n;const r=(...s)=>{r._d&&kl(-1);const i=Qi(e);let o;try{o=n(...s)}finally{Qi(i),r._d&&kl(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function Qn(n,e,t,r){const s=n.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];i&&(a.oldValue=i[o].value);let c=a.dir[r];c&&(tn(),zt(c,t,8,[n.el,a,n,e]),nn())}}const vm=Symbol("_vte"),Tm=n=>n.__isTeleport,Im=Symbol("_leaveCb");function Ma(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Ma(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function od(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}const Ji=new WeakMap;function Rs(n,e,t,r,s=!1){if(ie(n)){n.forEach((D,O)=>Rs(D,e&&(ie(e)?e[O]:e),t,r,s));return}if(Ds(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Rs(n,e,t,r.component.subTree);return}const i=r.shapeFlag&4?ja(r.component):r.el,o=s?null:i,{i:a,r:c}=n,h=e&&e.r,d=a.refs===ve?a.refs={}:a.refs,m=a.setupState,_=ge(m),S=m===ve?Vf:D=>_e(_,D);if(h!=null&&h!==c){if(Al(e),Be(h))d[h]=null,S(h)&&(m[h]=null);else if(rt(h)){h.value=null;const D=e;D.k&&(d[D.k]=null)}}if(ue(c))Ys(c,a,12,[o,d]);else{const D=Be(c),O=rt(c);if(D||O){const q=()=>{if(n.f){const H=D?S(c)?m[c]:d[c]:c.value;if(s)ie(H)&&Ia(H,i);else if(ie(H))H.includes(i)||H.push(i);else if(D)d[c]=[i],S(c)&&(m[c]=d[c]);else{const K=[i];c.value=K,n.k&&(d[n.k]=K)}}else D?(d[c]=o,S(c)&&(m[c]=o)):O&&(c.value=o,n.k&&(d[n.k]=o))};if(o){const H=()=>{q(),Ji.delete(n)};H.id=-1,Ji.set(n,H),mt(H,t)}else Al(n),q()}}}function Al(n){const e=Ji.get(n);e&&(e.flags|=8,Ji.delete(n))}bu().requestIdleCallback;bu().cancelIdleCallback;const Ds=n=>!!n.type.__asyncLoader,ad=n=>n.type.__isKeepAlive;function wm(n,e){cd(n,"a",e)}function Am(n,e){cd(n,"da",e)}function cd(n,e,t=ct){const r=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(vu(e,r,t),t){let s=t.parent;for(;s&&s.parent;)ad(s.parent.vnode)&&Cm(r,e,t,s),s=s.parent}}function Cm(n,e,t,r){const s=vu(e,n,r,!0);ld(()=>{Ia(r[e],s)},t)}function vu(n,e,t=ct,r=!1){if(t){const s=t[n]||(t[n]=[]),i=e.__weh||(e.__weh=(...o)=>{tn();const a=Xs(t),c=zt(e,t,n,o);return a(),nn(),c});return r?s.unshift(i):s.push(i),i}}const an=n=>(e,t=ct)=>{(!qs||n==="sp")&&vu(n,(...r)=>e(...r),t)},Sm=an("bm"),xm=an("m"),Rm=an("bu"),Dm=an("u"),Pm=an("bum"),ld=an("um"),Nm=an("sp"),Fm=an("rtg"),km=an("rtc");function Vm(n,e=ct){vu("ec",n,e)}const Om=Symbol.for("v-ndc"),Lo=n=>n?Dd(n)?ja(n):Lo(n.parent):null,Ps=lt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Lo(n.parent),$root:n=>Lo(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>fd(n),$forceUpdate:n=>n.f||(n.f=()=>{Oa(n.update)}),$nextTick:n=>n.n||(n.n=_m.bind(n.proxy)),$watch:n=>sg.bind(n)}),lo=(n,e)=>n!==ve&&!n.__isScriptSetup&&_e(n,e),Mm={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:r,data:s,props:i,accessCache:o,type:a,appContext:c}=n;let h;if(e[0]!=="$"){const S=o[e];if(S!==void 0)switch(S){case 1:return r[e];case 2:return s[e];case 4:return t[e];case 3:return i[e]}else{if(lo(r,e))return o[e]=1,r[e];if(s!==ve&&_e(s,e))return o[e]=2,s[e];if((h=n.propsOptions[0])&&_e(h,e))return o[e]=3,i[e];if(t!==ve&&_e(t,e))return o[e]=4,t[e];Uo&&(o[e]=0)}}const d=Ps[e];let m,_;if(d)return e==="$attrs"&&Ze(n.attrs,"get",""),d(n);if((m=a.__cssModules)&&(m=m[e]))return m;if(t!==ve&&_e(t,e))return o[e]=4,t[e];if(_=c.config.globalProperties,_e(_,e))return _[e]},set({_:n},e,t){const{data:r,setupState:s,ctx:i}=n;return lo(s,e)?(s[e]=t,!0):r!==ve&&_e(r,e)?(r[e]=t,!0):_e(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(i[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:r,appContext:s,propsOptions:i,type:o}},a){let c,h;return!!(t[a]||n!==ve&&a[0]!=="$"&&_e(n,a)||lo(e,a)||(c=i[0])&&_e(c,a)||_e(r,a)||_e(Ps,a)||_e(s.config.globalProperties,a)||(h=o.__cssModules)&&h[a])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:_e(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Cl(n){return ie(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Uo=!0;function Lm(n){const e=fd(n),t=n.proxy,r=n.ctx;Uo=!1,e.beforeCreate&&Sl(e.beforeCreate,n,"bc");const{data:s,computed:i,methods:o,watch:a,provide:c,inject:h,created:d,beforeMount:m,mounted:_,beforeUpdate:S,updated:D,activated:O,deactivated:q,beforeDestroy:H,beforeUnmount:K,destroyed:Q,unmounted:$,render:ce,renderTracked:Te,renderTriggered:I,errorCaptured:g,serverPrefetch:E,expose:v,inheritAttrs:w,components:C,directives:b,filters:dt}=e;if(h&&Um(h,r,null),o)for(const ye in o){const pe=o[ye];ue(pe)&&(r[ye]=pe.bind(t))}if(s){const ye=s.call(t,t);Fe(ye)&&(n.data=Fa(ye))}if(Uo=!0,i)for(const ye in i){const pe=i[ye],vt=ue(pe)?pe.bind(t,t):ue(pe.get)?pe.get.bind(t,t):Mt,jn=!ue(pe)&&ue(pe.set)?pe.set.bind(t):Mt,Ht=Sg({get:vt,set:jn});Object.defineProperty(r,ye,{enumerable:!0,configurable:!0,get:()=>Ht.value,set:ke=>Ht.value=ke})}if(a)for(const ye in a)hd(a[ye],r,t,ye);if(c){const ye=ue(c)?c.call(t):c;Reflect.ownKeys(ye).forEach(pe=>{Hm(pe,ye[pe])})}d&&Sl(d,n,"c");function qe(ye,pe){ie(pe)?pe.forEach(vt=>ye(vt.bind(t))):pe&&ye(pe.bind(t))}if(qe(Sm,m),qe(xm,_),qe(Rm,S),qe(Dm,D),qe(wm,O),qe(Am,q),qe(Vm,g),qe(km,Te),qe(Fm,I),qe(Pm,K),qe(ld,$),qe(Nm,E),ie(v))if(v.length){const ye=n.exposed||(n.exposed={});v.forEach(pe=>{Object.defineProperty(ye,pe,{get:()=>t[pe],set:vt=>t[pe]=vt,enumerable:!0})})}else n.exposed||(n.exposed={});ce&&n.render===Mt&&(n.render=ce),w!=null&&(n.inheritAttrs=w),C&&(n.components=C),b&&(n.directives=b),E&&od(n)}function Um(n,e,t=Mt){ie(n)&&(n=Bo(n));for(const r in n){const s=n[r];let i;Fe(s)?"default"in s?i=ki(s.from||r,s.default,!0):i=ki(s.from||r):i=ki(s),rt(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function Sl(n,e,t){zt(ie(n)?n.map(r=>r.bind(e.proxy)):n.bind(e.proxy),e,t)}function hd(n,e,t,r){let s=r.includes(".")?Ad(t,r):()=>t[r];if(Be(n)){const i=e[n];ue(i)&&fo(s,i)}else if(ue(n))fo(s,n.bind(t));else if(Fe(n))if(ie(n))n.forEach(i=>hd(i,e,t,r));else{const i=ue(n.handler)?n.handler.bind(t):e[n.handler];ue(i)&&fo(s,i,n)}}function fd(n){const e=n.type,{mixins:t,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=n.appContext,a=i.get(e);let c;return a?c=a:!s.length&&!t&&!r?c=e:(c={},s.length&&s.forEach(h=>Yi(c,h,o,!0)),Yi(c,e,o)),Fe(e)&&i.set(e,c),c}function Yi(n,e,t,r=!1){const{mixins:s,extends:i}=e;i&&Yi(n,i,t,!0),s&&s.forEach(o=>Yi(n,o,t,!0));for(const o in e)if(!(r&&o==="expose")){const a=Bm[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const Bm={data:xl,props:Rl,emits:Rl,methods:ys,computed:ys,beforeCreate:ut,created:ut,beforeMount:ut,mounted:ut,beforeUpdate:ut,updated:ut,beforeDestroy:ut,beforeUnmount:ut,destroyed:ut,unmounted:ut,activated:ut,deactivated:ut,errorCaptured:ut,serverPrefetch:ut,components:ys,directives:ys,watch:jm,provide:xl,inject:qm};function xl(n,e){return e?n?function(){return lt(ue(n)?n.call(this,this):n,ue(e)?e.call(this,this):e)}:e:n}function qm(n,e){return ys(Bo(n),Bo(e))}function Bo(n){if(ie(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function ut(n,e){return n?[...new Set([].concat(n,e))]:e}function ys(n,e){return n?lt(Object.create(null),n,e):e}function Rl(n,e){return n?ie(n)&&ie(e)?[...new Set([...n,...e])]:lt(Object.create(null),Cl(n),Cl(e??{})):e}function jm(n,e){if(!n)return e;if(!e)return n;const t=lt(Object.create(null),n);for(const r in e)t[r]=ut(n[r],e[r]);return t}function dd(){return{app:null,config:{isNativeTag:Vf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let zm=0;function $m(n,e){return function(r,s=null){ue(r)||(r=lt({},r)),s!=null&&!Fe(s)&&(s=null);const i=dd(),o=new WeakSet,a=[];let c=!1;const h=i.app={_uid:zm++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:xg,get config(){return i.config},set config(d){},use(d,...m){return o.has(d)||(d&&ue(d.install)?(o.add(d),d.install(h,...m)):ue(d)&&(o.add(d),d(h,...m))),h},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),h},component(d,m){return m?(i.components[d]=m,h):i.components[d]},directive(d,m){return m?(i.directives[d]=m,h):i.directives[d]},mount(d,m,_){if(!c){const S=h._ceVNode||tr(r,s);return S.appContext=i,_===!0?_="svg":_===!1&&(_=void 0),n(S,d,_),c=!0,h._container=d,d.__vue_app__=h,ja(S.component)}},onUnmount(d){a.push(d)},unmount(){c&&(zt(a,h._instance,16),n(null,h._container),delete h._container.__vue_app__)},provide(d,m){return i.provides[d]=m,h},runWithContext(d){const m=Cr;Cr=h;try{return d()}finally{Cr=m}}};return h}}let Cr=null;function Hm(n,e){if(ct){let t=ct.provides;const r=ct.parent&&ct.parent.provides;r===t&&(t=ct.provides=Object.create(r)),t[n]=e}}function ki(n,e,t=!1){const r=vg();if(r||Cr){let s=Cr?Cr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&ue(e)?e.call(r&&r.proxy):e}}const pd={},md=()=>Object.create(pd),gd=n=>Object.getPrototypeOf(n)===pd;function Gm(n,e,t,r=!1){const s={},i=md();n.propsDefaults=Object.create(null),_d(n,e,s,i);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);t?n.props=r?s:um(s):n.type.props?n.props=s:n.props=i,n.attrs=i}function Wm(n,e,t,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=n,a=ge(s),[c]=n.propsOptions;let h=!1;if((r||o>0)&&!(o&16)){if(o&8){const d=n.vnode.dynamicProps;for(let m=0;m<d.length;m++){let _=d[m];if(Tu(n.emitsOptions,_))continue;const S=e[_];if(c)if(_e(i,_))S!==i[_]&&(i[_]=S,h=!0);else{const D=kn(_);s[D]=qo(c,a,D,S,n,!1)}else S!==i[_]&&(i[_]=S,h=!0)}}}else{_d(n,e,s,i)&&(h=!0);let d;for(const m in a)(!e||!_e(e,m)&&((d=lr(m))===m||!_e(e,d)))&&(c?t&&(t[m]!==void 0||t[d]!==void 0)&&(s[m]=qo(c,a,m,void 0,n,!0)):delete s[m]);if(i!==a)for(const m in i)(!e||!_e(e,m))&&(delete i[m],h=!0)}h&&Xt(n.attrs,"set","")}function _d(n,e,t,r){const[s,i]=n.propsOptions;let o=!1,a;if(e)for(let c in e){if(As(c))continue;const h=e[c];let d;s&&_e(s,d=kn(c))?!i||!i.includes(d)?t[d]=h:(a||(a={}))[d]=h:Tu(n.emitsOptions,c)||(!(c in r)||h!==r[c])&&(r[c]=h,o=!0)}if(i){const c=ge(t),h=a||ve;for(let d=0;d<i.length;d++){const m=i[d];t[m]=qo(s,c,m,h[m],n,!_e(h,m))}}return o}function qo(n,e,t,r,s,i){const o=n[t];if(o!=null){const a=_e(o,"default");if(a&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&ue(c)){const{propsDefaults:h}=s;if(t in h)r=h[t];else{const d=Xs(s);r=h[t]=c.call(null,e),d()}}else r=c;s.ce&&s.ce._setProp(t,r)}o[0]&&(i&&!a?r=!1:o[1]&&(r===""||r===lr(t))&&(r=!0))}return r}const Km=new WeakMap;function yd(n,e,t=!1){const r=t?Km:e.propsCache,s=r.get(n);if(s)return s;const i=n.props,o={},a=[];let c=!1;if(!ue(n)){const d=m=>{c=!0;const[_,S]=yd(m,e,!0);lt(o,_),S&&a.push(...S)};!t&&e.mixins.length&&e.mixins.forEach(d),n.extends&&d(n.extends),n.mixins&&n.mixins.forEach(d)}if(!i&&!c)return Fe(n)&&r.set(n,Is),Is;if(ie(i))for(let d=0;d<i.length;d++){const m=kn(i[d]);Dl(m)&&(o[m]=ve)}else if(i)for(const d in i){const m=kn(d);if(Dl(m)){const _=i[d],S=o[m]=ie(_)||ue(_)?{type:_}:lt({},_),D=S.type;let O=!1,q=!0;if(ie(D))for(let H=0;H<D.length;++H){const K=D[H],Q=ue(K)&&K.name;if(Q==="Boolean"){O=!0;break}else Q==="String"&&(q=!1)}else O=ue(D)&&D.name==="Boolean";S[0]=O,S[1]=q,(O||_e(S,"default"))&&a.push(m)}}const h=[o,a];return Fe(n)&&r.set(n,h),h}function Dl(n){return n[0]!=="$"&&!As(n)}const La=n=>n==="_"||n==="_ctx"||n==="$stable",Ua=n=>ie(n)?n.map(Nt):[Nt(n)],Qm=(n,e,t)=>{if(e._n)return e;const r=Em((...s)=>Ua(e(...s)),t);return r._c=!1,r},bd=(n,e,t)=>{const r=n._ctx;for(const s in n){if(La(s))continue;const i=n[s];if(ue(i))e[s]=Qm(s,i,r);else if(i!=null){const o=Ua(i);e[s]=()=>o}}},Ed=(n,e)=>{const t=Ua(e);n.slots.default=()=>t},vd=(n,e,t)=>{for(const r in e)(t||!La(r))&&(n[r]=e[r])},Jm=(n,e,t)=>{const r=n.slots=md();if(n.vnode.shapeFlag&32){const s=e._;s?(vd(r,e,t),t&&Lf(r,"_",s,!0)):bd(e,r)}else e&&Ed(n,e)},Ym=(n,e,t)=>{const{vnode:r,slots:s}=n;let i=!0,o=ve;if(r.shapeFlag&32){const a=e._;a?t&&a===1?i=!1:vd(s,e,t):(i=!e.$stable,bd(e,s)),o=e}else e&&(Ed(n,e),o={default:1});if(i)for(const a in s)!La(a)&&o[a]==null&&delete s[a]},mt=fg;function Xm(n){return Zm(n)}function Zm(n,e){const t=bu();t.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:a,createComment:c,setText:h,setElementText:d,parentNode:m,nextSibling:_,setScopeId:S=Mt,insertStaticContent:D}=n,O=(y,T,R,k=null,N=null,F=null,j=void 0,U=null,L=!!T.dynamicChildren)=>{if(y===T)return;y&&!_s(y,T)&&(k=Gt(y),ke(y,N,F,!0),y=null),T.patchFlag===-2&&(L=!1,T.dynamicChildren=null);const{type:V,ref:Y,shapeFlag:z}=T;switch(V){case Iu:q(y,T,R,k);break;case Or:H(y,T,R,k);break;case po:y==null&&K(T,R,k,j);break;case Yt:C(y,T,R,k,N,F,j,U,L);break;default:z&1?ce(y,T,R,k,N,F,j,U,L):z&6?b(y,T,R,k,N,F,j,U,L):(z&64||z&128)&&V.process(y,T,R,k,N,F,j,U,L,xt)}Y!=null&&N?Rs(Y,y&&y.ref,F,T||y,!T):Y==null&&y&&y.ref!=null&&Rs(y.ref,null,F,y,!0)},q=(y,T,R,k)=>{if(y==null)r(T.el=a(T.children),R,k);else{const N=T.el=y.el;T.children!==y.children&&h(N,T.children)}},H=(y,T,R,k)=>{y==null?r(T.el=c(T.children||""),R,k):T.el=y.el},K=(y,T,R,k)=>{[y.el,y.anchor]=D(y.children,T,R,k,y.el,y.anchor)},Q=({el:y,anchor:T},R,k)=>{let N;for(;y&&y!==T;)N=_(y),r(y,R,k),y=N;r(T,R,k)},$=({el:y,anchor:T})=>{let R;for(;y&&y!==T;)R=_(y),s(y),y=R;s(T)},ce=(y,T,R,k,N,F,j,U,L)=>{T.type==="svg"?j="svg":T.type==="math"&&(j="mathml"),y==null?Te(T,R,k,N,F,j,U,L):E(y,T,N,F,j,U,L)},Te=(y,T,R,k,N,F,j,U)=>{let L,V;const{props:Y,shapeFlag:z,transition:J,dirs:ee}=y;if(L=y.el=o(y.type,F,Y&&Y.is,Y),z&8?d(L,y.children):z&16&&g(y.children,L,null,k,N,ho(y,F),j,U),ee&&Qn(y,null,k,"created"),I(L,y,y.scopeId,j,k),Y){for(const se in Y)se!=="value"&&!As(se)&&i(L,se,null,Y[se],F,k);"value"in Y&&i(L,"value",null,Y.value,F),(V=Y.onVnodeBeforeMount)&&Rt(V,k,y)}ee&&Qn(y,null,k,"beforeMount");const X=eg(N,J);X&&J.beforeEnter(L),r(L,T,R),((V=Y&&Y.onVnodeMounted)||X||ee)&&mt(()=>{V&&Rt(V,k,y),X&&J.enter(L),ee&&Qn(y,null,k,"mounted")},N)},I=(y,T,R,k,N)=>{if(R&&S(y,R),k)for(let F=0;F<k.length;F++)S(y,k[F]);if(N){let F=N.subTree;if(T===F||Sd(F.type)&&(F.ssContent===T||F.ssFallback===T)){const j=N.vnode;I(y,j,j.scopeId,j.slotScopeIds,N.parent)}}},g=(y,T,R,k,N,F,j,U,L=0)=>{for(let V=L;V<y.length;V++){const Y=y[V]=U?_n(y[V]):Nt(y[V]);O(null,Y,T,R,k,N,F,j,U)}},E=(y,T,R,k,N,F,j)=>{const U=T.el=y.el;let{patchFlag:L,dynamicChildren:V,dirs:Y}=T;L|=y.patchFlag&16;const z=y.props||ve,J=T.props||ve;let ee;if(R&&Jn(R,!1),(ee=J.onVnodeBeforeUpdate)&&Rt(ee,R,T,y),Y&&Qn(T,y,R,"beforeUpdate"),R&&Jn(R,!0),(z.innerHTML&&J.innerHTML==null||z.textContent&&J.textContent==null)&&d(U,""),V?v(y.dynamicChildren,V,U,R,k,ho(T,N),F):j||pe(y,T,U,null,R,k,ho(T,N),F,!1),L>0){if(L&16)w(U,z,J,R,N);else if(L&2&&z.class!==J.class&&i(U,"class",null,J.class,N),L&4&&i(U,"style",z.style,J.style,N),L&8){const X=T.dynamicProps;for(let se=0;se<X.length;se++){const le=X[se],je=z[le],ze=J[le];(ze!==je||le==="value")&&i(U,le,je,ze,N,R)}}L&1&&y.children!==T.children&&d(U,T.children)}else!j&&V==null&&w(U,z,J,R,N);((ee=J.onVnodeUpdated)||Y)&&mt(()=>{ee&&Rt(ee,R,T,y),Y&&Qn(T,y,R,"updated")},k)},v=(y,T,R,k,N,F,j)=>{for(let U=0;U<T.length;U++){const L=y[U],V=T[U],Y=L.el&&(L.type===Yt||!_s(L,V)||L.shapeFlag&198)?m(L.el):R;O(L,V,Y,null,k,N,F,j,!0)}},w=(y,T,R,k,N)=>{if(T!==R){if(T!==ve)for(const F in T)!As(F)&&!(F in R)&&i(y,F,T[F],null,N,k);for(const F in R){if(As(F))continue;const j=R[F],U=T[F];j!==U&&F!=="value"&&i(y,F,U,j,N,k)}"value"in R&&i(y,"value",T.value,R.value,N)}},C=(y,T,R,k,N,F,j,U,L)=>{const V=T.el=y?y.el:a(""),Y=T.anchor=y?y.anchor:a("");let{patchFlag:z,dynamicChildren:J,slotScopeIds:ee}=T;ee&&(U=U?U.concat(ee):ee),y==null?(r(V,R,k),r(Y,R,k),g(T.children||[],R,Y,N,F,j,U,L)):z>0&&z&64&&J&&y.dynamicChildren?(v(y.dynamicChildren,J,R,N,F,j,U),(T.key!=null||N&&T===N.subTree)&&Td(y,T,!0)):pe(y,T,R,Y,N,F,j,U,L)},b=(y,T,R,k,N,F,j,U,L)=>{T.slotScopeIds=U,y==null?T.shapeFlag&512?N.ctx.activate(T,R,k,j,L):dt(T,R,k,N,F,j,L):ln(y,T,L)},dt=(y,T,R,k,N,F,j)=>{const U=y.component=Eg(y,k,N);if(ad(y)&&(U.ctx.renderer=xt),Tg(U,!1,j),U.asyncDep){if(N&&N.registerDep(U,qe,j),!y.el){const L=U.subTree=tr(Or);H(null,L,T,R),y.placeholder=L.el}}else qe(U,y,T,R,N,F,j)},ln=(y,T,R)=>{const k=T.component=y.component;if(lg(y,T,R))if(k.asyncDep&&!k.asyncResolved){ye(k,T,R);return}else k.next=T,k.update();else T.el=y.el,k.vnode=T},qe=(y,T,R,k,N,F,j)=>{const U=()=>{if(y.isMounted){let{next:z,bu:J,u:ee,parent:X,vnode:se}=y;{const Ke=Id(y);if(Ke){z&&(z.el=se.el,ye(y,z,j)),Ke.asyncDep.then(()=>{y.isUnmounted||U()});return}}let le=z,je;Jn(y,!1),z?(z.el=se.el,ye(y,z,j)):z=se,J&&uo(J),(je=z.props&&z.props.onVnodeBeforeUpdate)&&Rt(je,X,z,se),Jn(y,!0);const ze=Nl(y),_t=y.subTree;y.subTree=ze,O(_t,ze,m(_t.el),Gt(_t),y,N,F),z.el=ze.el,le===null&&hg(y,ze.el),ee&&mt(ee,N),(je=z.props&&z.props.onVnodeUpdated)&&mt(()=>Rt(je,X,z,se),N)}else{let z;const{el:J,props:ee}=T,{bm:X,m:se,parent:le,root:je,type:ze}=y,_t=Ds(T);Jn(y,!1),X&&uo(X),!_t&&(z=ee&&ee.onVnodeBeforeMount)&&Rt(z,le,T),Jn(y,!0);{je.ce&&je.ce._def.shadowRoot!==!1&&je.ce._injectChildStyle(ze);const Ke=y.subTree=Nl(y);O(null,Ke,R,k,y,N,F),T.el=Ke.el}if(se&&mt(se,N),!_t&&(z=ee&&ee.onVnodeMounted)){const Ke=T;mt(()=>Rt(z,le,Ke),N)}(T.shapeFlag&256||le&&Ds(le.vnode)&&le.vnode.shapeFlag&256)&&y.a&&mt(y.a,N),y.isMounted=!0,T=R=k=null}};y.scope.on();const L=y.effect=new Bf(U);y.scope.off();const V=y.update=L.run.bind(L),Y=y.job=L.runIfDirty.bind(L);Y.i=y,Y.id=y.uid,L.scheduler=()=>Oa(Y),Jn(y,!0),V()},ye=(y,T,R)=>{T.component=y;const k=y.vnode.props;y.vnode=T,y.next=null,Wm(y,T.props,k,R),Ym(y,T.children,R),tn(),wl(y),nn()},pe=(y,T,R,k,N,F,j,U,L=!1)=>{const V=y&&y.children,Y=y?y.shapeFlag:0,z=T.children,{patchFlag:J,shapeFlag:ee}=T;if(J>0){if(J&128){jn(V,z,R,k,N,F,j,U,L);return}else if(J&256){vt(V,z,R,k,N,F,j,U,L);return}}ee&8?(Y&16&&$n(V,N,F),z!==V&&d(R,z)):Y&16?ee&16?jn(V,z,R,k,N,F,j,U,L):$n(V,N,F,!0):(Y&8&&d(R,""),ee&16&&g(z,R,k,N,F,j,U,L))},vt=(y,T,R,k,N,F,j,U,L)=>{y=y||Is,T=T||Is;const V=y.length,Y=T.length,z=Math.min(V,Y);let J;for(J=0;J<z;J++){const ee=T[J]=L?_n(T[J]):Nt(T[J]);O(y[J],ee,R,null,N,F,j,U,L)}V>Y?$n(y,N,F,!0,!1,z):g(T,R,k,N,F,j,U,L,z)},jn=(y,T,R,k,N,F,j,U,L)=>{let V=0;const Y=T.length;let z=y.length-1,J=Y-1;for(;V<=z&&V<=J;){const ee=y[V],X=T[V]=L?_n(T[V]):Nt(T[V]);if(_s(ee,X))O(ee,X,R,null,N,F,j,U,L);else break;V++}for(;V<=z&&V<=J;){const ee=y[z],X=T[J]=L?_n(T[J]):Nt(T[J]);if(_s(ee,X))O(ee,X,R,null,N,F,j,U,L);else break;z--,J--}if(V>z){if(V<=J){const ee=J+1,X=ee<Y?T[ee].el:k;for(;V<=J;)O(null,T[V]=L?_n(T[V]):Nt(T[V]),R,X,N,F,j,U,L),V++}}else if(V>J)for(;V<=z;)ke(y[V],N,F,!0),V++;else{const ee=V,X=V,se=new Map;for(V=X;V<=J;V++){const $e=T[V]=L?_n(T[V]):Nt(T[V]);$e.key!=null&&se.set($e.key,V)}let le,je=0;const ze=J-X+1;let _t=!1,Ke=0;const hn=new Array(ze);for(V=0;V<ze;V++)hn[V]=0;for(V=ee;V<=z;V++){const $e=y[V];if(je>=ze){ke($e,N,F,!0);continue}let yt;if($e.key!=null)yt=se.get($e.key);else for(le=X;le<=J;le++)if(hn[le-X]===0&&_s($e,T[le])){yt=le;break}yt===void 0?ke($e,N,F,!0):(hn[yt-X]=V+1,yt>=Ke?Ke=yt:_t=!0,O($e,T[yt],R,null,N,F,j,U,L),je++)}const rs=_t?tg(hn):Is;for(le=rs.length-1,V=ze-1;V>=0;V--){const $e=X+V,yt=T[$e],ci=T[$e+1],dr=$e+1<Y?ci.el||ci.placeholder:k;hn[V]===0?O(null,yt,R,dr,N,F,j,U,L):_t&&(le<0||V!==rs[le]?Ht(yt,R,dr,2):le--)}}},Ht=(y,T,R,k,N=null)=>{const{el:F,type:j,transition:U,children:L,shapeFlag:V}=y;if(V&6){Ht(y.component.subTree,T,R,k);return}if(V&128){y.suspense.move(T,R,k);return}if(V&64){j.move(y,T,R,xt);return}if(j===Yt){r(F,T,R);for(let z=0;z<L.length;z++)Ht(L[z],T,R,k);r(y.anchor,T,R);return}if(j===po){Q(y,T,R);return}if(k!==2&&V&1&&U)if(k===0)U.beforeEnter(F),r(F,T,R),mt(()=>U.enter(F),N);else{const{leave:z,delayLeave:J,afterLeave:ee}=U,X=()=>{y.ctx.isUnmounted?s(F):r(F,T,R)},se=()=>{F._isLeaving&&F[Im](!0),z(F,()=>{X(),ee&&ee()})};J?J(F,X,se):se()}else r(F,T,R)},ke=(y,T,R,k=!1,N=!1)=>{const{type:F,props:j,ref:U,children:L,dynamicChildren:V,shapeFlag:Y,patchFlag:z,dirs:J,cacheIndex:ee}=y;if(z===-2&&(N=!1),U!=null&&(tn(),Rs(U,null,R,y,!0),nn()),ee!=null&&(T.renderCache[ee]=void 0),Y&256){T.ctx.deactivate(y);return}const X=Y&1&&J,se=!Ds(y);let le;if(se&&(le=j&&j.onVnodeBeforeUnmount)&&Rt(le,T,y),Y&6)zn(y.component,R,k);else{if(Y&128){y.suspense.unmount(R,k);return}X&&Qn(y,null,T,"beforeUnmount"),Y&64?y.type.remove(y,T,R,xt,k):V&&!V.hasOnce&&(F!==Yt||z>0&&z&64)?$n(V,T,R,!1,!0):(F===Yt&&z&384||!N&&Y&16)&&$n(L,T,R),k&&Ve(y)}(se&&(le=j&&j.onVnodeUnmounted)||X)&&mt(()=>{le&&Rt(le,T,y),X&&Qn(y,null,T,"unmounted")},R)},Ve=y=>{const{type:T,el:R,anchor:k,transition:N}=y;if(T===Yt){$u(R,k);return}if(T===po){$(y);return}const F=()=>{s(R),N&&!N.persisted&&N.afterLeave&&N.afterLeave()};if(y.shapeFlag&1&&N&&!N.persisted){const{leave:j,delayLeave:U}=N,L=()=>j(R,F);U?U(y.el,F,L):L()}else F()},$u=(y,T)=>{let R;for(;y!==T;)R=_(y),s(y),y=R;s(T)},zn=(y,T,R)=>{const{bum:k,scope:N,job:F,subTree:j,um:U,m:L,a:V}=y;Pl(L),Pl(V),k&&uo(k),N.stop(),F&&(F.flags|=8,ke(j,y,T,R)),U&&mt(U,T),mt(()=>{y.isUnmounted=!0},T)},$n=(y,T,R,k=!1,N=!1,F=0)=>{for(let j=F;j<y.length;j++)ke(y[j],T,R,k,N)},Gt=y=>{if(y.shapeFlag&6)return Gt(y.component.subTree);if(y.shapeFlag&128)return y.suspense.next();const T=_(y.anchor||y.el),R=T&&T[vm];return R?_(R):T};let ts=!1;const ai=(y,T,R)=>{y==null?T._vnode&&ke(T._vnode,null,null,!0):O(T._vnode||null,y,T,null,null,null,R),T._vnode=y,ts||(ts=!0,wl(),sd(),ts=!1)},xt={p:O,um:ke,m:Ht,r:Ve,mt:dt,mc:g,pc:pe,pbc:v,n:Gt,o:n};return{render:ai,hydrate:void 0,createApp:$m(ai)}}function ho({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Jn({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function eg(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function Td(n,e,t=!1){const r=n.children,s=e.children;if(ie(r)&&ie(s))for(let i=0;i<r.length;i++){const o=r[i];let a=s[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[i]=_n(s[i]),a.el=o.el),!t&&a.patchFlag!==-2&&Td(o,a)),a.type===Iu&&a.patchFlag!==-1&&(a.el=o.el),a.type===Or&&!a.el&&(a.el=o.el)}}function tg(n){const e=n.slice(),t=[0];let r,s,i,o,a;const c=n.length;for(r=0;r<c;r++){const h=n[r];if(h!==0){if(s=t[t.length-1],n[s]<h){e[r]=s,t.push(r);continue}for(i=0,o=t.length-1;i<o;)a=i+o>>1,n[t[a]]<h?i=a+1:o=a;h<n[t[i]]&&(i>0&&(e[r]=t[i-1]),t[i]=r)}}for(i=t.length,o=t[i-1];i-- >0;)t[i]=o,o=e[o];return t}function Id(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Id(e)}function Pl(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const ng=Symbol.for("v-scx"),rg=()=>ki(ng);function fo(n,e,t){return wd(n,e,t)}function wd(n,e,t=ve){const{immediate:r,deep:s,flush:i,once:o}=t,a=lt({},t),c=e&&r||!e&&i!=="post";let h;if(qs){if(i==="sync"){const S=rg();h=S.__watcherHandles||(S.__watcherHandles=[])}else if(!c){const S=()=>{};return S.stop=Mt,S.resume=Mt,S.pause=Mt,S}}const d=ct;a.call=(S,D,O)=>zt(S,d,D,O);let m=!1;i==="post"?a.scheduler=S=>{mt(S,d&&d.suspense)}:i!=="sync"&&(m=!0,a.scheduler=(S,D)=>{D?S():Oa(S)}),a.augmentJob=S=>{e&&(S.flags|=4),m&&(S.flags|=2,d&&(S.id=d.uid,S.i=d))};const _=mm(n,e,a);return qs&&(h?h.push(_):c&&_()),_}function sg(n,e,t){const r=this.proxy,s=Be(n)?n.includes(".")?Ad(r,n):()=>r[n]:n.bind(r,r);let i;ue(e)?i=e:(i=e.handler,t=e);const o=Xs(this),a=wd(s,i.bind(r),t);return o(),a}function Ad(n,e){const t=e.split(".");return()=>{let r=n;for(let s=0;s<t.length&&r;s++)r=r[t[s]];return r}}const ig=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${kn(e)}Modifiers`]||n[`${lr(e)}Modifiers`];function ug(n,e,...t){if(n.isUnmounted)return;const r=n.vnode.props||ve;let s=t;const i=e.startsWith("update:"),o=i&&ig(r,e.slice(7));o&&(o.trim&&(s=t.map(d=>Be(d)?d.trim():d)),o.number&&(s=t.map(F1)));let a,c=r[a=io(e)]||r[a=io(kn(e))];!c&&i&&(c=r[a=io(lr(e))]),c&&zt(c,n,6,s);const h=r[a+"Once"];if(h){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,zt(h,n,6,s)}}const og=new WeakMap;function Cd(n,e,t=!1){const r=t?og:e.emitsCache,s=r.get(n);if(s!==void 0)return s;const i=n.emits;let o={},a=!1;if(!ue(n)){const c=h=>{const d=Cd(h,e,!0);d&&(a=!0,lt(o,d))};!t&&e.mixins.length&&e.mixins.forEach(c),n.extends&&c(n.extends),n.mixins&&n.mixins.forEach(c)}return!i&&!a?(Fe(n)&&r.set(n,null),null):(ie(i)?i.forEach(c=>o[c]=null):lt(o,i),Fe(n)&&r.set(n,o),o)}function Tu(n,e){return!n||!gu(e)?!1:(e=e.slice(2).replace(/Once$/,""),_e(n,e[0].toLowerCase()+e.slice(1))||_e(n,lr(e))||_e(n,e))}function Nl(n){const{type:e,vnode:t,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:a,emit:c,render:h,renderCache:d,props:m,data:_,setupState:S,ctx:D,inheritAttrs:O}=n,q=Qi(n);let H,K;try{if(t.shapeFlag&4){const $=s||r,ce=$;H=Nt(h.call(ce,$,d,m,S,_,D)),K=a}else{const $=e;H=Nt($.length>1?$(m,{attrs:a,slots:o,emit:c}):$(m,null)),K=e.props?a:ag(a)}}catch($){Eu($,n,1),H=tr(Or)}let Q=H;if(K&&O!==!1){const $=Object.keys(K),{shapeFlag:ce}=Q;$.length&&ce&7&&(i&&$.some(Ta)&&(K=cg(K,i)),Q=Mr(Q,K,!1,!0))}return t.dirs&&(Q=Mr(Q,null,!1,!0),Q.dirs=Q.dirs?Q.dirs.concat(t.dirs):t.dirs),t.transition&&Ma(Q,t.transition),H=Q,Qi(q),H}const ag=n=>{let e;for(const t in n)(t==="class"||t==="style"||gu(t))&&((e||(e={}))[t]=n[t]);return e},cg=(n,e)=>{const t={};for(const r in n)(!Ta(r)||!(r.slice(9)in e))&&(t[r]=n[r]);return t};function lg(n,e,t){const{props:r,children:s,component:i}=n,{props:o,children:a,patchFlag:c}=e,h=i.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&c>=0){if(c&1024)return!0;if(c&16)return r?Fl(r,o,h):!!o;if(c&8){const d=e.dynamicProps;for(let m=0;m<d.length;m++){const _=d[m];if(o[_]!==r[_]&&!Tu(h,_))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?Fl(r,o,h):!0:!!o;return!1}function Fl(n,e,t){const r=Object.keys(e);if(r.length!==Object.keys(n).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==n[i]&&!Tu(t,i))return!0}return!1}function hg({vnode:n,parent:e},t){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===n&&(r.el=n.el),r===n)(n=e.vnode).el=t,e=e.parent;else break}}const Sd=n=>n.__isSuspense;function fg(n,e){e&&e.pendingBranch?ie(n)?e.effects.push(...n):e.effects.push(n):bm(n)}const Yt=Symbol.for("v-fgt"),Iu=Symbol.for("v-txt"),Or=Symbol.for("v-cmt"),po=Symbol.for("v-stc");let An=null,Ba=1;function kl(n,e=!1){Ba+=n,n<0&&An&&e&&(An.hasOnce=!0)}function xd(n){return n?n.__v_isVNode===!0:!1}function _s(n,e){return n.type===e.type&&n.key===e.key}const Rd=({key:n})=>n??null,Vi=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Be(n)||rt(n)||ue(n)?{i:kt,r:n,k:e,f:!!t}:n:null);function dg(n,e=null,t=null,r=0,s=null,i=n===Yt?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&Rd(e),ref:e&&Vi(e),scopeId:ud,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:kt};return a?(qa(c,t),i&128&&n.normalize(c)):t&&(c.shapeFlag|=Be(t)?8:16),Ba>0&&!o&&An&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&An.push(c),c}const tr=pg;function pg(n,e=null,t=null,r=0,s=null,i=!1){if((!n||n===Om)&&(n=Or),xd(n)){const a=Mr(n,e,!0);return t&&qa(a,t),Ba>0&&!i&&An&&(a.shapeFlag&6?An[An.indexOf(n)]=a:An.push(a)),a.patchFlag=-2,a}if(Cg(n)&&(n=n.__vccOpts),e){e=mg(e);let{class:a,style:c}=e;a&&!Be(a)&&(e.class=Ca(a)),Fe(c)&&(Va(c)&&!ie(c)&&(c=lt({},c)),e.style=Aa(c))}const o=Be(n)?1:Sd(n)?128:Tm(n)?64:Fe(n)?4:ue(n)?2:0;return dg(n,e,t,r,s,o,i,!0)}function mg(n){return n?Va(n)||gd(n)?lt({},n):n:null}function Mr(n,e,t=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:a,transition:c}=n,h=e?_g(s||{},e):s,d={__v_isVNode:!0,__v_skip:!0,type:n.type,props:h,key:h&&Rd(h),ref:e&&e.ref?t&&i?ie(i)?i.concat(Vi(e)):[i,Vi(e)]:Vi(e):i,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Yt?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:c,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Mr(n.ssContent),ssFallback:n.ssFallback&&Mr(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return c&&r&&Ma(d,c.clone(d)),d}function gg(n=" ",e=0){return tr(Iu,null,n,e)}function Nt(n){return n==null||typeof n=="boolean"?tr(Or):ie(n)?tr(Yt,null,n.slice()):xd(n)?_n(n):tr(Iu,null,String(n))}function _n(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Mr(n)}function qa(n,e){let t=0;const{shapeFlag:r}=n;if(e==null)e=null;else if(ie(e))t=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),qa(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!gd(e)?e._ctx=kt:s===3&&kt&&(kt.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else ue(e)?(e={default:e,_ctx:kt},t=32):(e=String(e),r&64?(t=16,e=[gg(e)]):t=8);n.children=e,n.shapeFlag|=t}function _g(...n){const e={};for(let t=0;t<n.length;t++){const r=n[t];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=Ca([e.class,r.class]));else if(s==="style")e.style=Aa([e.style,r.style]);else if(gu(s)){const i=e[s],o=r[s];o&&i!==o&&!(ie(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function Rt(n,e,t,r=null){zt(n,e,7,[t,r])}const yg=dd();let bg=0;function Eg(n,e,t){const r=n.type,s=(e?e.appContext:n.appContext)||yg,i={uid:bg++,vnode:n,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new B1(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:yd(r,s),emitsOptions:Cd(r,s),emit:null,emitted:null,propsDefaults:ve,inheritAttrs:r.inheritAttrs,ctx:ve,data:ve,props:ve,attrs:ve,slots:ve,refs:ve,setupState:ve,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=ug.bind(null,i),n.ce&&n.ce(i),i}let ct=null;const vg=()=>ct||kt;let Xi,jo;{const n=bu(),e=(t,r)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};Xi=e("__VUE_INSTANCE_SETTERS__",t=>ct=t),jo=e("__VUE_SSR_SETTERS__",t=>qs=t)}const Xs=n=>{const e=ct;return Xi(n),n.scope.on(),()=>{n.scope.off(),Xi(e)}},Vl=()=>{ct&&ct.scope.off(),Xi(null)};function Dd(n){return n.vnode.shapeFlag&4}let qs=!1;function Tg(n,e=!1,t=!1){e&&jo(e);const{props:r,children:s}=n.vnode,i=Dd(n);Gm(n,r,i,e),Jm(n,s,t||e);const o=i?Ig(n,e):void 0;return e&&jo(!1),o}function Ig(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Mm);const{setup:r}=t;if(r){tn();const s=n.setupContext=r.length>1?Ag(n):null,i=Xs(n),o=Ys(r,n,0,[n.props,s]),a=Of(o);if(nn(),i(),(a||n.sp)&&!Ds(n)&&od(n),a){if(o.then(Vl,Vl),e)return o.then(c=>{Ol(n,c)}).catch(c=>{Eu(c,n,0)});n.asyncDep=o}else Ol(n,o)}else Pd(n)}function Ol(n,e,t){ue(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:Fe(e)&&(n.setupState=td(e)),Pd(n)}function Pd(n,e,t){const r=n.type;n.render||(n.render=r.render||Mt);{const s=Xs(n);tn();try{Lm(n)}finally{nn(),s()}}}const wg={get(n,e){return Ze(n,"get",""),n[e]}};function Ag(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,wg),slots:n.slots,emit:n.emit,expose:e}}function ja(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(td(om(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Ps)return Ps[t](n)},has(e,t){return t in e||t in Ps}})):n.proxy}function Cg(n){return ue(n)&&"__vccOpts"in n}const Sg=(n,e)=>dm(n,e,qs),xg="3.5.21";/**
* @vue/runtime-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let zo;const Ml=typeof window<"u"&&window.trustedTypes;if(Ml)try{zo=Ml.createPolicy("vue",{createHTML:n=>n})}catch{}const Nd=zo?n=>zo.createHTML(n):n=>n,Rg="http://www.w3.org/2000/svg",Dg="http://www.w3.org/1998/Math/MathML",Jt=typeof document<"u"?document:null,Ll=Jt&&Jt.createElement("template"),Pg={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,r)=>{const s=e==="svg"?Jt.createElementNS(Rg,n):e==="mathml"?Jt.createElementNS(Dg,n):t?Jt.createElement(n,{is:t}):Jt.createElement(n);return n==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:n=>Jt.createTextNode(n),createComment:n=>Jt.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Jt.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,r,s,i){const o=t?t.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===i||!(s=s.nextSibling)););else{Ll.innerHTML=Nd(r==="svg"?`<svg>${n}</svg>`:r==="mathml"?`<math>${n}</math>`:n);const a=Ll.content;if(r==="svg"||r==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Ng=Symbol("_vtc");function Fg(n,e,t){const r=n[Ng];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Ul=Symbol("_vod"),kg=Symbol("_vsh"),Vg=Symbol(""),Og=/(?:^|;)\s*display\s*:/;function Mg(n,e,t){const r=n.style,s=Be(t);let i=!1;if(t&&!s){if(e)if(Be(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&Oi(r,a,"")}else for(const o in e)t[o]==null&&Oi(r,o,"");for(const o in t)o==="display"&&(i=!0),Oi(r,o,t[o])}else if(s){if(e!==t){const o=r[Vg];o&&(t+=";"+o),r.cssText=t,i=Og.test(t)}}else e&&n.removeAttribute("style");Ul in n&&(n[Ul]=i?r.display:"",n[kg]&&(r.display="none"))}const Bl=/\s*!important$/;function Oi(n,e,t){if(ie(t))t.forEach(r=>Oi(n,e,r));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const r=Lg(n,e);Bl.test(t)?n.setProperty(lr(r),t.replace(Bl,""),"important"):n[r]=t}}const ql=["Webkit","Moz","ms"],mo={};function Lg(n,e){const t=mo[e];if(t)return t;let r=kn(e);if(r!=="filter"&&r in n)return mo[e]=r;r=Mf(r);for(let s=0;s<ql.length;s++){const i=ql[s]+r;if(i in n)return mo[e]=i}return e}const jl="http://www.w3.org/1999/xlink";function zl(n,e,t,r,s,i=U1(e)){r&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(jl,e.slice(6,e.length)):n.setAttributeNS(jl,e,t):t==null||i&&!Uf(t)?n.removeAttribute(e):n.setAttribute(e,i?"":Gr(t)?String(t):t)}function $l(n,e,t,r,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Nd(t):t);return}const i=n.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?n.getAttribute("value")||"":n.value,c=t==null?n.type==="checkbox"?"on":"":String(t);(a!==c||!("_value"in n))&&(n.value=c),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=Uf(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(s||e)}function Ug(n,e,t,r){n.addEventListener(e,t,r)}function Bg(n,e,t,r){n.removeEventListener(e,t,r)}const Hl=Symbol("_vei");function qg(n,e,t,r,s=null){const i=n[Hl]||(n[Hl]={}),o=i[e];if(r&&o)o.value=r;else{const[a,c]=jg(e);if(r){const h=i[e]=Hg(r,s);Ug(n,a,h,c)}else o&&(Bg(n,a,o,c),i[e]=void 0)}}const Gl=/(?:Once|Passive|Capture)$/;function jg(n){let e;if(Gl.test(n)){e={};let r;for(;r=n.match(Gl);)n=n.slice(0,n.length-r[0].length),e[r[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):lr(n.slice(2)),e]}let go=0;const zg=Promise.resolve(),$g=()=>go||(zg.then(()=>go=0),go=Date.now());function Hg(n,e){const t=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=t.attached)return;zt(Gg(r,t.value),e,5,[r])};return t.value=n,t.attached=$g(),t}function Gg(n,e){if(ie(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const Wl=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,Wg=(n,e,t,r,s,i)=>{const o=s==="svg";e==="class"?Fg(n,r,o):e==="style"?Mg(n,t,r):gu(e)?Ta(e)||qg(n,e,t,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Kg(n,e,r,o))?($l(n,e,r),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&zl(n,e,r,o,i,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!Be(r))?$l(n,kn(e),r,i,e):(e==="true-value"?n._trueValue=r:e==="false-value"&&(n._falseValue=r),zl(n,e,r,o))};function Kg(n,e,t,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in n&&Wl(e)&&ue(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Wl(e)&&Be(t)?!1:e in n}const Qg=lt({patchProp:Wg},Pg);let Kl;function Jg(){return Kl||(Kl=Xm(Qg))}const C4=((...n)=>{const e=Jg().createApp(...n),{mount:t}=e;return e.mount=r=>{const s=Xg(r);if(!s)return;const i=e._component;!ue(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=t(s,!1,Yg(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e});function Yg(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Xg(n){return Be(n)?document.querySelector(n):n}const Ql={};function Zg(n){let e=Ql[n];if(e)return e;e=Ql[n]=[];for(let t=0;t<128;t++){const r=String.fromCharCode(t);e.push(r)}for(let t=0;t<n.length;t++){const r=n.charCodeAt(t);e[r]="%"+("0"+r.toString(16).toUpperCase()).slice(-2)}return e}function wu(n,e){typeof e!="string"&&(e=wu.defaultChars);const t=Zg(e);return n.replace(/(%[a-f0-9]{2})+/gi,function(r){let s="";for(let i=0,o=r.length;i<o;i+=3){const a=parseInt(r.slice(i+1,i+3),16);if(a<128){s+=t[a];continue}if((a&224)===192&&i+3<o){const c=parseInt(r.slice(i+4,i+6),16);if((c&192)===128){const h=a<<6&1984|c&63;h<128?s+="��":s+=String.fromCharCode(h),i+=3;continue}}if((a&240)===224&&i+6<o){const c=parseInt(r.slice(i+4,i+6),16),h=parseInt(r.slice(i+7,i+9),16);if((c&192)===128&&(h&192)===128){const d=a<<12&61440|c<<6&4032|h&63;d<2048||d>=55296&&d<=57343?s+="���":s+=String.fromCharCode(d),i+=6;continue}}if((a&248)===240&&i+9<o){const c=parseInt(r.slice(i+4,i+6),16),h=parseInt(r.slice(i+7,i+9),16),d=parseInt(r.slice(i+10,i+12),16);if((c&192)===128&&(h&192)===128&&(d&192)===128){let m=a<<18&1835008|c<<12&258048|h<<6&4032|d&63;m<65536||m>1114111?s+="����":(m-=65536,s+=String.fromCharCode(55296+(m>>10),56320+(m&1023))),i+=9;continue}}s+="�"}return s})}wu.defaultChars=";/?:@&=+$,#";wu.componentChars="";const Jl={};function e_(n){let e=Jl[n];if(e)return e;e=Jl[n]=[];for(let t=0;t<128;t++){const r=String.fromCharCode(t);/^[0-9a-z]$/i.test(r)?e.push(r):e.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2))}for(let t=0;t<n.length;t++)e[n.charCodeAt(t)]=n[t];return e}function Au(n,e,t){typeof e!="string"&&(t=e,e=Au.defaultChars),typeof t>"u"&&(t=!0);const r=e_(e);let s="";for(let i=0,o=n.length;i<o;i++){const a=n.charCodeAt(i);if(t&&a===37&&i+2<o&&/^[0-9a-f]{2}$/i.test(n.slice(i+1,i+3))){s+=n.slice(i,i+3),i+=2;continue}if(a<128){s+=r[a];continue}if(a>=55296&&a<=57343){if(a>=55296&&a<=56319&&i+1<o){const c=n.charCodeAt(i+1);if(c>=56320&&c<=57343){s+=encodeURIComponent(n[i]+n[i+1]),i++;continue}}s+="%EF%BF%BD";continue}s+=encodeURIComponent(n[i])}return s}Au.defaultChars=";/?:@&=+$,-_.!~*'()#";Au.componentChars="-_.!~*'()";function t_(n){let e="";return e+=n.protocol||"",e+=n.slashes?"//":"",e+=n.auth?n.auth+"@":"",n.hostname&&n.hostname.indexOf(":")!==-1?e+="["+n.hostname+"]":e+=n.hostname||"",e+=n.port?":"+n.port:"",e+=n.pathname||"",e+=n.search||"",e+=n.hash||"",e}function Zi(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const n_=/^([a-z0-9.+-]+:)/i,r_=/:[0-9]*$/,s_=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,i_=["<",">",'"',"`"," ","\r",`
`,"	"],u_=["{","}","|","\\","^","`"].concat(i_),o_=["'"].concat(u_),Yl=["%","/","?",";","#"].concat(o_),Xl=["/","?","#"],a_=255,Zl=/^[+a-z0-9A-Z_-]{0,63}$/,c_=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,eh={javascript:!0,"javascript:":!0},th={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function l_(n,e){if(n&&n instanceof Zi)return n;const t=new Zi;return t.parse(n,e),t}Zi.prototype.parse=function(n,e){let t,r,s,i=n;if(i=i.trim(),!e&&n.split("#").length===1){const h=s_.exec(i);if(h)return this.pathname=h[1],h[2]&&(this.search=h[2]),this}let o=n_.exec(i);if(o&&(o=o[0],t=o.toLowerCase(),this.protocol=o,i=i.substr(o.length)),(e||o||i.match(/^\/\/[^@\/]+@[^@\/]+/))&&(s=i.substr(0,2)==="//",s&&!(o&&eh[o])&&(i=i.substr(2),this.slashes=!0)),!eh[o]&&(s||o&&!th[o])){let h=-1;for(let D=0;D<Xl.length;D++)r=i.indexOf(Xl[D]),r!==-1&&(h===-1||r<h)&&(h=r);let d,m;h===-1?m=i.lastIndexOf("@"):m=i.lastIndexOf("@",h),m!==-1&&(d=i.slice(0,m),i=i.slice(m+1),this.auth=d),h=-1;for(let D=0;D<Yl.length;D++)r=i.indexOf(Yl[D]),r!==-1&&(h===-1||r<h)&&(h=r);h===-1&&(h=i.length),i[h-1]===":"&&h--;const _=i.slice(0,h);i=i.slice(h),this.parseHost(_),this.hostname=this.hostname||"";const S=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!S){const D=this.hostname.split(/\./);for(let O=0,q=D.length;O<q;O++){const H=D[O];if(H&&!H.match(Zl)){let K="";for(let Q=0,$=H.length;Q<$;Q++)H.charCodeAt(Q)>127?K+="x":K+=H[Q];if(!K.match(Zl)){const Q=D.slice(0,O),$=D.slice(O+1),ce=H.match(c_);ce&&(Q.push(ce[1]),$.unshift(ce[2])),$.length&&(i=$.join(".")+i),this.hostname=Q.join(".");break}}}}this.hostname.length>a_&&(this.hostname=""),S&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const a=i.indexOf("#");a!==-1&&(this.hash=i.substr(a),i=i.slice(0,a));const c=i.indexOf("?");return c!==-1&&(this.search=i.substr(c),i=i.slice(0,c)),i&&(this.pathname=i),th[t]&&this.hostname&&!this.pathname&&(this.pathname=""),this};Zi.prototype.parseHost=function(n){let e=r_.exec(n);e&&(e=e[0],e!==":"&&(this.port=e.substr(1)),n=n.substr(0,n.length-e.length)),n&&(this.hostname=n)};const S4=Object.freeze(Object.defineProperty({__proto__:null,decode:wu,encode:Au,format:t_,parse:l_},Symbol.toStringTag,{value:"Module"})),Fd=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,kd=/[\0-\x1F\x7F-\x9F]/,h_=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,Vd=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,f_=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,Od=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,x4=Object.freeze(Object.defineProperty({__proto__:null,Any:Fd,Cc:kd,Cf:h_,P:Vd,S:f_,Z:Od},Symbol.toStringTag,{value:"Module"})),d_=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(n=>n.charCodeAt(0))),p_=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(n=>n.charCodeAt(0)));var _o;const m_=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),g_=(_o=String.fromCodePoint)!==null&&_o!==void 0?_o:function(n){let e="";return n>65535&&(n-=65536,e+=String.fromCharCode(n>>>10&1023|55296),n=56320|n&1023),e+=String.fromCharCode(n),e};function __(n){var e;return n>=55296&&n<=57343||n>1114111?65533:(e=m_.get(n))!==null&&e!==void 0?e:n}var Ue;(function(n){n[n.NUM=35]="NUM",n[n.SEMI=59]="SEMI",n[n.EQUALS=61]="EQUALS",n[n.ZERO=48]="ZERO",n[n.NINE=57]="NINE",n[n.LOWER_A=97]="LOWER_A",n[n.LOWER_F=102]="LOWER_F",n[n.LOWER_X=120]="LOWER_X",n[n.LOWER_Z=122]="LOWER_Z",n[n.UPPER_A=65]="UPPER_A",n[n.UPPER_F=70]="UPPER_F",n[n.UPPER_Z=90]="UPPER_Z"})(Ue||(Ue={}));const y_=32;var Cn;(function(n){n[n.VALUE_LENGTH=49152]="VALUE_LENGTH",n[n.BRANCH_LENGTH=16256]="BRANCH_LENGTH",n[n.JUMP_TABLE=127]="JUMP_TABLE"})(Cn||(Cn={}));function $o(n){return n>=Ue.ZERO&&n<=Ue.NINE}function b_(n){return n>=Ue.UPPER_A&&n<=Ue.UPPER_F||n>=Ue.LOWER_A&&n<=Ue.LOWER_F}function E_(n){return n>=Ue.UPPER_A&&n<=Ue.UPPER_Z||n>=Ue.LOWER_A&&n<=Ue.LOWER_Z||$o(n)}function v_(n){return n===Ue.EQUALS||E_(n)}var Me;(function(n){n[n.EntityStart=0]="EntityStart",n[n.NumericStart=1]="NumericStart",n[n.NumericDecimal=2]="NumericDecimal",n[n.NumericHex=3]="NumericHex",n[n.NamedEntity=4]="NamedEntity"})(Me||(Me={}));var En;(function(n){n[n.Legacy=0]="Legacy",n[n.Strict=1]="Strict",n[n.Attribute=2]="Attribute"})(En||(En={}));class T_{constructor(e,t,r){this.decodeTree=e,this.emitCodePoint=t,this.errors=r,this.state=Me.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=En.Strict}startEntity(e){this.decodeMode=e,this.state=Me.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(e,t){switch(this.state){case Me.EntityStart:return e.charCodeAt(t)===Ue.NUM?(this.state=Me.NumericStart,this.consumed+=1,this.stateNumericStart(e,t+1)):(this.state=Me.NamedEntity,this.stateNamedEntity(e,t));case Me.NumericStart:return this.stateNumericStart(e,t);case Me.NumericDecimal:return this.stateNumericDecimal(e,t);case Me.NumericHex:return this.stateNumericHex(e,t);case Me.NamedEntity:return this.stateNamedEntity(e,t)}}stateNumericStart(e,t){return t>=e.length?-1:(e.charCodeAt(t)|y_)===Ue.LOWER_X?(this.state=Me.NumericHex,this.consumed+=1,this.stateNumericHex(e,t+1)):(this.state=Me.NumericDecimal,this.stateNumericDecimal(e,t))}addToNumericResult(e,t,r,s){if(t!==r){const i=r-t;this.result=this.result*Math.pow(s,i)+parseInt(e.substr(t,i),s),this.consumed+=i}}stateNumericHex(e,t){const r=t;for(;t<e.length;){const s=e.charCodeAt(t);if($o(s)||b_(s))t+=1;else return this.addToNumericResult(e,r,t,16),this.emitNumericEntity(s,3)}return this.addToNumericResult(e,r,t,16),-1}stateNumericDecimal(e,t){const r=t;for(;t<e.length;){const s=e.charCodeAt(t);if($o(s))t+=1;else return this.addToNumericResult(e,r,t,10),this.emitNumericEntity(s,2)}return this.addToNumericResult(e,r,t,10),-1}emitNumericEntity(e,t){var r;if(this.consumed<=t)return(r=this.errors)===null||r===void 0||r.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(e===Ue.SEMI)this.consumed+=1;else if(this.decodeMode===En.Strict)return 0;return this.emitCodePoint(__(this.result),this.consumed),this.errors&&(e!==Ue.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(e,t){const{decodeTree:r}=this;let s=r[this.treeIndex],i=(s&Cn.VALUE_LENGTH)>>14;for(;t<e.length;t++,this.excess++){const o=e.charCodeAt(t);if(this.treeIndex=I_(r,s,this.treeIndex+Math.max(1,i),o),this.treeIndex<0)return this.result===0||this.decodeMode===En.Attribute&&(i===0||v_(o))?0:this.emitNotTerminatedNamedEntity();if(s=r[this.treeIndex],i=(s&Cn.VALUE_LENGTH)>>14,i!==0){if(o===Ue.SEMI)return this.emitNamedEntityData(this.treeIndex,i,this.consumed+this.excess);this.decodeMode!==En.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var e;const{result:t,decodeTree:r}=this,s=(r[t]&Cn.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,s,this.consumed),(e=this.errors)===null||e===void 0||e.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(e,t,r){const{decodeTree:s}=this;return this.emitCodePoint(t===1?s[e]&~Cn.VALUE_LENGTH:s[e+1],r),t===3&&this.emitCodePoint(s[e+2],r),r}end(){var e;switch(this.state){case Me.NamedEntity:return this.result!==0&&(this.decodeMode!==En.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case Me.NumericDecimal:return this.emitNumericEntity(0,2);case Me.NumericHex:return this.emitNumericEntity(0,3);case Me.NumericStart:return(e=this.errors)===null||e===void 0||e.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case Me.EntityStart:return 0}}}function Md(n){let e="";const t=new T_(n,r=>e+=g_(r));return function(s,i){let o=0,a=0;for(;(a=s.indexOf("&",a))>=0;){e+=s.slice(o,a),t.startEntity(i);const h=t.write(s,a+1);if(h<0){o=a+t.end();break}o=a+h,a=h===0?o+1:o}const c=e+s.slice(o);return e="",c}}function I_(n,e,t,r){const s=(e&Cn.BRANCH_LENGTH)>>7,i=e&Cn.JUMP_TABLE;if(s===0)return i!==0&&r===i?t:-1;if(i){const c=r-i;return c<0||c>=s?-1:n[t+c]-1}let o=t,a=o+s-1;for(;o<=a;){const c=o+a>>>1,h=n[c];if(h<r)o=c+1;else if(h>r)a=c-1;else return n[c+s]}return-1}const w_=Md(d_);Md(p_);function R4(n,e=En.Legacy){return w_(n,e)}function A_(n){const e={};n=n||{},e.src_Any=Fd.source,e.src_Cc=kd.source,e.src_Z=Od.source,e.src_P=Vd.source,e.src_ZPCc=[e.src_Z,e.src_P,e.src_Cc].join("|"),e.src_ZCc=[e.src_Z,e.src_Cc].join("|");const t="[><｜]";return e.src_pseudo_letter="(?:(?!"+t+"|"+e.src_ZPCc+")"+e.src_Any+")",e.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",e.src_auth="(?:(?:(?!"+e.src_ZCc+"|[@/\\[\\]()]).)+@)?",e.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",e.src_host_terminator="(?=$|"+t+"|"+e.src_ZPCc+")(?!"+(n["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+e.src_ZPCc+"))",e.src_path="(?:[/?#](?:(?!"+e.src_ZCc+"|"+t+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+e.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+e.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+e.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+e.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+e.src_ZCc+"|[']).)+\\'|\\'(?="+e.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+e.src_ZCc+"|[.]|$)|"+(n["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+e.src_ZCc+"|$)|;(?!"+e.src_ZCc+"|$)|\\!+(?!"+e.src_ZCc+"|[!]|$)|\\?(?!"+e.src_ZCc+"|[?]|$))+|\\/)?",e.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',e.src_xn="xn--[a-z0-9\\-]{1,59}",e.src_domain_root="(?:"+e.src_xn+"|"+e.src_pseudo_letter+"{1,63})",e.src_domain="(?:"+e.src_xn+"|(?:"+e.src_pseudo_letter+")|(?:"+e.src_pseudo_letter+"(?:-|"+e.src_pseudo_letter+"){0,61}"+e.src_pseudo_letter+"))",e.src_host="(?:(?:(?:(?:"+e.src_domain+")\\.)*"+e.src_domain+"))",e.tpl_host_fuzzy="(?:"+e.src_ip4+"|(?:(?:(?:"+e.src_domain+")\\.)+(?:%TLDS%)))",e.tpl_host_no_ip_fuzzy="(?:(?:(?:"+e.src_domain+")\\.)+(?:%TLDS%))",e.src_host_strict=e.src_host+e.src_host_terminator,e.tpl_host_fuzzy_strict=e.tpl_host_fuzzy+e.src_host_terminator,e.src_host_port_strict=e.src_host+e.src_port+e.src_host_terminator,e.tpl_host_port_fuzzy_strict=e.tpl_host_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_port_no_ip_fuzzy_strict=e.tpl_host_no_ip_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+e.src_ZPCc+"|>|$))",e.tpl_email_fuzzy="(^|"+t+'|"|\\(|'+e.src_ZCc+")("+e.src_email_name+"@"+e.tpl_host_fuzzy_strict+")",e.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+e.src_ZPCc+"))((?![$+<=>^`|｜])"+e.tpl_host_port_fuzzy_strict+e.src_path+")",e.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+e.src_ZPCc+"))((?![$+<=>^`|｜])"+e.tpl_host_port_no_ip_fuzzy_strict+e.src_path+")",e}function Ho(n){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(r){n[r]=t[r]})}),n}function Cu(n){return Object.prototype.toString.call(n)}function C_(n){return Cu(n)==="[object String]"}function S_(n){return Cu(n)==="[object Object]"}function x_(n){return Cu(n)==="[object RegExp]"}function nh(n){return Cu(n)==="[object Function]"}function R_(n){return n.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const Ld={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function D_(n){return Object.keys(n||{}).reduce(function(e,t){return e||Ld.hasOwnProperty(t)},!1)}const P_={"http:":{validate:function(n,e,t){const r=n.slice(e);return t.re.http||(t.re.http=new RegExp("^\\/\\/"+t.re.src_auth+t.re.src_host_port_strict+t.re.src_path,"i")),t.re.http.test(r)?r.match(t.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(n,e,t){const r=n.slice(e);return t.re.no_http||(t.re.no_http=new RegExp("^"+t.re.src_auth+"(?:localhost|(?:(?:"+t.re.src_domain+")\\.)+"+t.re.src_domain_root+")"+t.re.src_port+t.re.src_host_terminator+t.re.src_path,"i")),t.re.no_http.test(r)?e>=3&&n[e-3]===":"||e>=3&&n[e-3]==="/"?0:r.match(t.re.no_http)[0].length:0}},"mailto:":{validate:function(n,e,t){const r=n.slice(e);return t.re.mailto||(t.re.mailto=new RegExp("^"+t.re.src_email_name+"@"+t.re.src_host_strict,"i")),t.re.mailto.test(r)?r.match(t.re.mailto)[0].length:0}}},N_="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",F_="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function k_(n){n.__index__=-1,n.__text_cache__=""}function V_(n){return function(e,t){const r=e.slice(t);return n.test(r)?r.match(n)[0].length:0}}function rh(){return function(n,e){e.normalize(n)}}function eu(n){const e=n.re=A_(n.__opts__),t=n.__tlds__.slice();n.onCompile(),n.__tlds_replaced__||t.push(N_),t.push(e.src_xn),e.src_tlds=t.join("|");function r(a){return a.replace("%TLDS%",e.src_tlds)}e.email_fuzzy=RegExp(r(e.tpl_email_fuzzy),"i"),e.link_fuzzy=RegExp(r(e.tpl_link_fuzzy),"i"),e.link_no_ip_fuzzy=RegExp(r(e.tpl_link_no_ip_fuzzy),"i"),e.host_fuzzy_test=RegExp(r(e.tpl_host_fuzzy_test),"i");const s=[];n.__compiled__={};function i(a,c){throw new Error('(LinkifyIt) Invalid schema "'+a+'": '+c)}Object.keys(n.__schemas__).forEach(function(a){const c=n.__schemas__[a];if(c===null)return;const h={validate:null,link:null};if(n.__compiled__[a]=h,S_(c)){x_(c.validate)?h.validate=V_(c.validate):nh(c.validate)?h.validate=c.validate:i(a,c),nh(c.normalize)?h.normalize=c.normalize:c.normalize?i(a,c):h.normalize=rh();return}if(C_(c)){s.push(a);return}i(a,c)}),s.forEach(function(a){n.__compiled__[n.__schemas__[a]]&&(n.__compiled__[a].validate=n.__compiled__[n.__schemas__[a]].validate,n.__compiled__[a].normalize=n.__compiled__[n.__schemas__[a]].normalize)}),n.__compiled__[""]={validate:null,normalize:rh()};const o=Object.keys(n.__compiled__).filter(function(a){return a.length>0&&n.__compiled__[a]}).map(R_).join("|");n.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+e.src_ZPCc+"))("+o+")","i"),n.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+e.src_ZPCc+"))("+o+")","ig"),n.re.schema_at_start=RegExp("^"+n.re.schema_search.source,"i"),n.re.pretest=RegExp("("+n.re.schema_test.source+")|("+n.re.host_fuzzy_test.source+")|@","i"),k_(n)}function O_(n,e){const t=n.__index__,r=n.__last_index__,s=n.__text_cache__.slice(t,r);this.schema=n.__schema__.toLowerCase(),this.index=t+e,this.lastIndex=r+e,this.raw=s,this.text=s,this.url=s}function Go(n,e){const t=new O_(n,e);return n.__compiled__[t.schema].normalize(t,n),t}function Et(n,e){if(!(this instanceof Et))return new Et(n,e);e||D_(n)&&(e=n,n={}),this.__opts__=Ho({},Ld,e),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=Ho({},P_,n),this.__compiled__={},this.__tlds__=F_,this.__tlds_replaced__=!1,this.re={},eu(this)}Et.prototype.add=function(e,t){return this.__schemas__[e]=t,eu(this),this};Et.prototype.set=function(e){return this.__opts__=Ho(this.__opts__,e),this};Et.prototype.test=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return!1;let t,r,s,i,o,a,c,h,d;if(this.re.schema_test.test(e)){for(c=this.re.schema_search,c.lastIndex=0;(t=c.exec(e))!==null;)if(i=this.testSchemaAt(e,t[2],c.lastIndex),i){this.__schema__=t[2],this.__index__=t.index+t[1].length,this.__last_index__=t.index+t[0].length+i;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(h=e.search(this.re.host_fuzzy_test),h>=0&&(this.__index__<0||h<this.__index__)&&(r=e.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(o=r.index+r[1].length,(this.__index__<0||o<this.__index__)&&(this.__schema__="",this.__index__=o,this.__last_index__=r.index+r[0].length))),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&(d=e.indexOf("@"),d>=0&&(s=e.match(this.re.email_fuzzy))!==null&&(o=s.index+s[1].length,a=s.index+s[0].length,(this.__index__<0||o<this.__index__||o===this.__index__&&a>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=o,this.__last_index__=a))),this.__index__>=0};Et.prototype.pretest=function(e){return this.re.pretest.test(e)};Et.prototype.testSchemaAt=function(e,t,r){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(e,r,this):0};Et.prototype.match=function(e){const t=[];let r=0;this.__index__>=0&&this.__text_cache__===e&&(t.push(Go(this,r)),r=this.__last_index__);let s=r?e.slice(r):e;for(;this.test(s);)t.push(Go(this,r)),s=s.slice(this.__last_index__),r+=this.__last_index__;return t.length?t:null};Et.prototype.matchAtStart=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return null;const t=this.re.schema_at_start.exec(e);if(!t)return null;const r=this.testSchemaAt(e,t[2],t[0].length);return r?(this.__schema__=t[2],this.__index__=t.index+t[1].length,this.__last_index__=t.index+t[0].length+r,Go(this,0)):null};Et.prototype.tlds=function(e,t){return e=Array.isArray(e)?e:[e],t?(this.__tlds__=this.__tlds__.concat(e).sort().filter(function(r,s,i){return r!==i[s-1]}).reverse(),eu(this),this):(this.__tlds__=e.slice(),this.__tlds_replaced__=!0,eu(this),this)};Et.prototype.normalize=function(e){e.schema||(e.url="http://"+e.url),e.schema==="mailto:"&&!/^mailto:/i.test(e.url)&&(e.url="mailto:"+e.url)};Et.prototype.onCompile=function(){};const Sr=2147483647,Vt=36,za=1,js=26,M_=38,L_=700,Ud=72,Bd=128,qd="-",U_=/^xn--/,B_=/[^\0-\x7F]/,q_=/[\x2E\u3002\uFF0E\uFF61]/g,j_={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},yo=Vt-za,Ot=Math.floor,bo=String.fromCharCode;function yn(n){throw new RangeError(j_[n])}function z_(n,e){const t=[];let r=n.length;for(;r--;)t[r]=e(n[r]);return t}function jd(n,e){const t=n.split("@");let r="";t.length>1&&(r=t[0]+"@",n=t[1]),n=n.replace(q_,".");const s=n.split("."),i=z_(s,e).join(".");return r+i}function zd(n){const e=[];let t=0;const r=n.length;for(;t<r;){const s=n.charCodeAt(t++);if(s>=55296&&s<=56319&&t<r){const i=n.charCodeAt(t++);(i&64512)==56320?e.push(((s&1023)<<10)+(i&1023)+65536):(e.push(s),t--)}else e.push(s)}return e}const $_=n=>String.fromCodePoint(...n),H_=function(n){return n>=48&&n<58?26+(n-48):n>=65&&n<91?n-65:n>=97&&n<123?n-97:Vt},sh=function(n,e){return n+22+75*(n<26)-((e!=0)<<5)},$d=function(n,e,t){let r=0;for(n=t?Ot(n/L_):n>>1,n+=Ot(n/e);n>yo*js>>1;r+=Vt)n=Ot(n/yo);return Ot(r+(yo+1)*n/(n+M_))},Hd=function(n){const e=[],t=n.length;let r=0,s=Bd,i=Ud,o=n.lastIndexOf(qd);o<0&&(o=0);for(let a=0;a<o;++a)n.charCodeAt(a)>=128&&yn("not-basic"),e.push(n.charCodeAt(a));for(let a=o>0?o+1:0;a<t;){const c=r;for(let d=1,m=Vt;;m+=Vt){a>=t&&yn("invalid-input");const _=H_(n.charCodeAt(a++));_>=Vt&&yn("invalid-input"),_>Ot((Sr-r)/d)&&yn("overflow"),r+=_*d;const S=m<=i?za:m>=i+js?js:m-i;if(_<S)break;const D=Vt-S;d>Ot(Sr/D)&&yn("overflow"),d*=D}const h=e.length+1;i=$d(r-c,h,c==0),Ot(r/h)>Sr-s&&yn("overflow"),s+=Ot(r/h),r%=h,e.splice(r++,0,s)}return String.fromCodePoint(...e)},Gd=function(n){const e=[];n=zd(n);const t=n.length;let r=Bd,s=0,i=Ud;for(const c of n)c<128&&e.push(bo(c));const o=e.length;let a=o;for(o&&e.push(qd);a<t;){let c=Sr;for(const d of n)d>=r&&d<c&&(c=d);const h=a+1;c-r>Ot((Sr-s)/h)&&yn("overflow"),s+=(c-r)*h,r=c;for(const d of n)if(d<r&&++s>Sr&&yn("overflow"),d===r){let m=s;for(let _=Vt;;_+=Vt){const S=_<=i?za:_>=i+js?js:_-i;if(m<S)break;const D=m-S,O=Vt-S;e.push(bo(sh(S+D%O,0))),m=Ot(D/O)}e.push(bo(sh(m,0))),i=$d(s,h,a===o),s=0,++a}++s,++r}return e.join("")},G_=function(n){return jd(n,function(e){return U_.test(e)?Hd(e.slice(4).toLowerCase()):e})},W_=function(n){return jd(n,function(e){return B_.test(e)?"xn--"+Gd(e):e})},D4={version:"2.3.1",ucs2:{decode:zd,encode:$_},decode:Hd,encode:Gd,toASCII:W_,toUnicode:G_},K_=()=>{};var ih={};/**
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
 */const Wd=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Q_=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],a=n[t++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Kd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,a=o?n[s+1]:0,c=s+2<n.length,h=c?n[s+2]:0,d=i>>2,m=(i&3)<<4|a>>4;let _=(a&15)<<2|h>>6,S=h&63;c||(S=64,o||(_=64)),r.push(t[d],t[m],t[_],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Wd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Q_(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||a==null||h==null||m==null)throw new J_;const _=i<<2|a>>4;if(r.push(_),h!==64){const S=a<<4&240|h>>2;if(r.push(S),m!==64){const D=h<<6&192|m;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class J_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Y_=function(n){const e=Wd(n);return Kd.encodeByteArray(e,!0)},tu=function(n){return Y_(n).replace(/\./g,"")},Qd=function(n){try{return Kd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function X_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Z_=()=>X_().__FIREBASE_DEFAULTS__,e2=()=>{if(typeof process>"u"||typeof ih>"u")return;const n=ih.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},t2=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Qd(n[1]);return e&&JSON.parse(e)},Su=()=>{try{return K_()||Z_()||e2()||t2()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Jd=n=>Su()?.emulatorHosts?.[n],n2=n=>{const e=Jd(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Yd=()=>Su()?.config,Xd=n=>Su()?.[`_${n}`];/**
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
 */class r2{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Wr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Zd(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function s2(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[tu(JSON.stringify(t)),tu(JSON.stringify(o)),""].join(".")}const Ns={};function i2(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ns))Ns[e]?n.emulator.push(e):n.prod.push(e);return n}function u2(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let uh=!1;function e0(n,e){if(typeof window>"u"||typeof document>"u"||!Wr(window.location.host)||Ns[n]===e||Ns[n]||uh)return;Ns[n]=e;function t(_){return`__firebase__banner__${_}`}const r="__firebase__banner",i=i2().prod.length>0;function o(){const _=document.getElementById(r);_&&_.remove()}function a(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function c(_,S){_.setAttribute("width","24"),_.setAttribute("id",S),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function h(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{uh=!0,o()},_}function d(_,S){_.setAttribute("id",S),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function m(){const _=u2(r),S=t("text"),D=document.getElementById(S)||document.createElement("span"),O=t("learnmore"),q=document.getElementById(O)||document.createElement("a"),H=t("preprendIcon"),K=document.getElementById(H)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const Q=_.element;a(Q),d(q,O);const $=h();c(K,H),Q.append(K,D,q,$),document.body.appendChild(Q)}i?(D.innerText="Preview backend disconnected.",K.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,D.innerText="Preview backend running in this workspace."),D.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
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
 */function st(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function o2(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(st())}function a2(){const n=Su()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function c2(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function l2(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function h2(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function f2(){const n=st();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function d2(){return!a2()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function p2(){try{return typeof indexedDB=="object"}catch{return!1}}function m2(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
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
 */const g2="FirebaseError";class cn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=g2,Object.setPrototypeOf(this,cn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Zs.prototype.create)}}class Zs{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?_2(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new cn(s,a,r)}}function _2(n,e){return n.replace(y2,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const y2=/\{\$([^}]+)}/g;function b2(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ur(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(oh(i)&&oh(o)){if(!ur(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function oh(n){return n!==null&&typeof n=="object"}/**
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
 */function ei(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function E2(n,e){const t=new v2(n,e);return t.subscribe.bind(t)}class v2{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");T2(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Eo),s.error===void 0&&(s.error=Eo),s.complete===void 0&&(s.complete=Eo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function T2(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Eo(){}/**
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
 */function gt(n){return n&&n._delegate?n._delegate:n}class or{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Xn="[DEFAULT]";/**
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
 */class I2{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new r2;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(A2(e))try{this.getOrInitializeService({instanceIdentifier:Xn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Xn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Xn){return this.instances.has(e)}getOptions(e=Xn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:w2(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Xn){return this.component?this.component.multipleInstances?e:Xn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function w2(n){return n===Xn?void 0:n}function A2(n){return n.instantiationMode==="EAGER"}/**
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
 */class C2{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new I2(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var oe;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(oe||(oe={}));const S2={debug:oe.DEBUG,verbose:oe.VERBOSE,info:oe.INFO,warn:oe.WARN,error:oe.ERROR,silent:oe.SILENT},x2=oe.INFO,R2={[oe.DEBUG]:"log",[oe.VERBOSE]:"log",[oe.INFO]:"info",[oe.WARN]:"warn",[oe.ERROR]:"error"},D2=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=R2[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class $a{constructor(e){this.name=e,this._logLevel=x2,this._logHandler=D2,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in oe))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?S2[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,oe.DEBUG,...e),this._logHandler(this,oe.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,oe.VERBOSE,...e),this._logHandler(this,oe.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,oe.INFO,...e),this._logHandler(this,oe.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,oe.WARN,...e),this._logHandler(this,oe.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,oe.ERROR,...e),this._logHandler(this,oe.ERROR,...e)}}const P2=(n,e)=>e.some(t=>n instanceof t);let ah,ch;function N2(){return ah||(ah=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function F2(){return ch||(ch=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const t0=new WeakMap,Wo=new WeakMap,n0=new WeakMap,vo=new WeakMap,Ha=new WeakMap;function k2(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(Dn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&t0.set(t,n)}).catch(()=>{}),Ha.set(e,n),e}function V2(n){if(Wo.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Wo.set(n,e)}let Ko={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Wo.get(n);if(e==="objectStoreNames")return n.objectStoreNames||n0.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Dn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function O2(n){Ko=n(Ko)}function M2(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(To(this),e,...t);return n0.set(r,e.sort?e.sort():[e]),Dn(r)}:F2().includes(n)?function(...e){return n.apply(To(this),e),Dn(t0.get(this))}:function(...e){return Dn(n.apply(To(this),e))}}function L2(n){return typeof n=="function"?M2(n):(n instanceof IDBTransaction&&V2(n),P2(n,N2())?new Proxy(n,Ko):n)}function Dn(n){if(n instanceof IDBRequest)return k2(n);if(vo.has(n))return vo.get(n);const e=L2(n);return e!==n&&(vo.set(n,e),Ha.set(e,n)),e}const To=n=>Ha.get(n);function U2(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),a=Dn(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Dn(o.result),c.oldVersion,c.newVersion,Dn(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),a}const B2=["get","getKey","getAll","getAllKeys","count"],q2=["put","add","delete","clear"],Io=new Map;function lh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Io.get(e))return Io.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=q2.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||B2.includes(t)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let h=c.store;return r&&(h=h.index(a.shift())),(await Promise.all([h[t](...a),s&&c.done]))[0]};return Io.set(e,i),i}O2(n=>({...n,get:(e,t,r)=>lh(e,t)||n.get(e,t,r),has:(e,t)=>!!lh(e,t)||n.has(e,t)}));/**
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
 */class j2{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(z2(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function z2(n){return n.getComponent()?.type==="VERSION"}const Qo="@firebase/app",hh="0.14.2";/**
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
 */const rn=new $a("@firebase/app"),$2="@firebase/app-compat",H2="@firebase/analytics-compat",G2="@firebase/analytics",W2="@firebase/app-check-compat",K2="@firebase/app-check",Q2="@firebase/auth",J2="@firebase/auth-compat",Y2="@firebase/database",X2="@firebase/data-connect",Z2="@firebase/database-compat",ey="@firebase/functions",ty="@firebase/functions-compat",ny="@firebase/installations",ry="@firebase/installations-compat",sy="@firebase/messaging",iy="@firebase/messaging-compat",uy="@firebase/performance",oy="@firebase/performance-compat",ay="@firebase/remote-config",cy="@firebase/remote-config-compat",ly="@firebase/storage",hy="@firebase/storage-compat",fy="@firebase/firestore",dy="@firebase/ai",py="@firebase/firestore-compat",my="firebase",gy="12.2.0";/**
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
 */const Jo="[DEFAULT]",_y={[Qo]:"fire-core",[$2]:"fire-core-compat",[G2]:"fire-analytics",[H2]:"fire-analytics-compat",[K2]:"fire-app-check",[W2]:"fire-app-check-compat",[Q2]:"fire-auth",[J2]:"fire-auth-compat",[Y2]:"fire-rtdb",[X2]:"fire-data-connect",[Z2]:"fire-rtdb-compat",[ey]:"fire-fn",[ty]:"fire-fn-compat",[ny]:"fire-iid",[ry]:"fire-iid-compat",[sy]:"fire-fcm",[iy]:"fire-fcm-compat",[uy]:"fire-perf",[oy]:"fire-perf-compat",[ay]:"fire-rc",[cy]:"fire-rc-compat",[ly]:"fire-gcs",[hy]:"fire-gcs-compat",[fy]:"fire-fst",[py]:"fire-fst-compat",[dy]:"fire-vertex","fire-js":"fire-js",[my]:"fire-js-all"};/**
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
 */const zs=new Map,yy=new Map,Yo=new Map;function fh(n,e){try{n.container.addComponent(e)}catch(t){rn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Lr(n){const e=n.name;if(Yo.has(e))return rn.debug(`There were multiple attempts to register component ${e}.`),!1;Yo.set(e,n);for(const t of zs.values())fh(t,n);for(const t of yy.values())fh(t,n);return!0}function Ga(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function It(n){return n==null?!1:n.settings!==void 0}/**
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
 */const by={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Pn=new Zs("app","Firebase",by);/**
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
 */class Ey{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new or("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Pn.create("app-deleted",{appName:this._name})}}/**
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
 */const Kr=gy;function vy(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Jo,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Pn.create("bad-app-name",{appName:String(s)});if(t||(t=Yd()),!t)throw Pn.create("no-options");const i=zs.get(s);if(i){if(ur(t,i.options)&&ur(r,i.config))return i;throw Pn.create("duplicate-app",{appName:s})}const o=new C2(s);for(const c of Yo.values())o.addComponent(c);const a=new Ey(t,r,o);return zs.set(s,a),a}function r0(n=Jo){const e=zs.get(n);if(!e&&n===Jo&&Yd())return vy();if(!e)throw Pn.create("no-app",{appName:n});return e}function P4(){return Array.from(zs.values())}function nr(n,e,t){let r=_y[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),rn.warn(o.join(" "));return}Lr(new or(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const Ty="firebase-heartbeat-database",Iy=1,$s="firebase-heartbeat-store";let wo=null;function s0(){return wo||(wo=U2(Ty,Iy,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore($s)}catch(t){console.warn(t)}}}}).catch(n=>{throw Pn.create("idb-open",{originalErrorMessage:n.message})})),wo}async function wy(n){try{const t=(await s0()).transaction($s),r=await t.objectStore($s).get(i0(n));return await t.done,r}catch(e){if(e instanceof cn)rn.warn(e.message);else{const t=Pn.create("idb-get",{originalErrorMessage:e?.message});rn.warn(t.message)}}}async function dh(n,e){try{const r=(await s0()).transaction($s,"readwrite");await r.objectStore($s).put(e,i0(n)),await r.done}catch(t){if(t instanceof cn)rn.warn(t.message);else{const r=Pn.create("idb-set",{originalErrorMessage:t?.message});rn.warn(r.message)}}}function i0(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Ay=1024,Cy=30;class Sy{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ry(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=ph();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>Cy){const s=Dy(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){rn.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ph(),{heartbeatsToSend:t,unsentEntries:r}=xy(this._heartbeatsCache.heartbeats),s=tu(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return rn.warn(e),""}}}function ph(){return new Date().toISOString().substring(0,10)}function xy(n,e=Ay){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),mh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),mh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Ry{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return p2()?m2().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await wy(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return dh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return dh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function mh(n){return tu(JSON.stringify({version:2,heartbeats:n})).length}function Dy(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function Py(n){Lr(new or("platform-logger",e=>new j2(e),"PRIVATE")),Lr(new or("heartbeat",e=>new Sy(e),"PRIVATE")),nr(Qo,hh,n),nr(Qo,hh,"esm2020"),nr("fire-js","")}Py("");var gh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Nn,u0;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,g){function E(){}E.prototype=g.prototype,I.D=g.prototype,I.prototype=new E,I.prototype.constructor=I,I.C=function(v,w,C){for(var b=Array(arguments.length-2),dt=2;dt<arguments.length;dt++)b[dt-2]=arguments[dt];return g.prototype[w].apply(v,b)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,g,E){E||(E=0);var v=Array(16);if(typeof g=="string")for(var w=0;16>w;++w)v[w]=g.charCodeAt(E++)|g.charCodeAt(E++)<<8|g.charCodeAt(E++)<<16|g.charCodeAt(E++)<<24;else for(w=0;16>w;++w)v[w]=g[E++]|g[E++]<<8|g[E++]<<16|g[E++]<<24;g=I.g[0],E=I.g[1],w=I.g[2];var C=I.g[3],b=g+(C^E&(w^C))+v[0]+3614090360&4294967295;g=E+(b<<7&4294967295|b>>>25),b=C+(w^g&(E^w))+v[1]+3905402710&4294967295,C=g+(b<<12&4294967295|b>>>20),b=w+(E^C&(g^E))+v[2]+606105819&4294967295,w=C+(b<<17&4294967295|b>>>15),b=E+(g^w&(C^g))+v[3]+3250441966&4294967295,E=w+(b<<22&4294967295|b>>>10),b=g+(C^E&(w^C))+v[4]+4118548399&4294967295,g=E+(b<<7&4294967295|b>>>25),b=C+(w^g&(E^w))+v[5]+1200080426&4294967295,C=g+(b<<12&4294967295|b>>>20),b=w+(E^C&(g^E))+v[6]+2821735955&4294967295,w=C+(b<<17&4294967295|b>>>15),b=E+(g^w&(C^g))+v[7]+4249261313&4294967295,E=w+(b<<22&4294967295|b>>>10),b=g+(C^E&(w^C))+v[8]+1770035416&4294967295,g=E+(b<<7&4294967295|b>>>25),b=C+(w^g&(E^w))+v[9]+2336552879&4294967295,C=g+(b<<12&4294967295|b>>>20),b=w+(E^C&(g^E))+v[10]+4294925233&4294967295,w=C+(b<<17&4294967295|b>>>15),b=E+(g^w&(C^g))+v[11]+2304563134&4294967295,E=w+(b<<22&4294967295|b>>>10),b=g+(C^E&(w^C))+v[12]+1804603682&4294967295,g=E+(b<<7&4294967295|b>>>25),b=C+(w^g&(E^w))+v[13]+4254626195&4294967295,C=g+(b<<12&4294967295|b>>>20),b=w+(E^C&(g^E))+v[14]+2792965006&4294967295,w=C+(b<<17&4294967295|b>>>15),b=E+(g^w&(C^g))+v[15]+1236535329&4294967295,E=w+(b<<22&4294967295|b>>>10),b=g+(w^C&(E^w))+v[1]+4129170786&4294967295,g=E+(b<<5&4294967295|b>>>27),b=C+(E^w&(g^E))+v[6]+3225465664&4294967295,C=g+(b<<9&4294967295|b>>>23),b=w+(g^E&(C^g))+v[11]+643717713&4294967295,w=C+(b<<14&4294967295|b>>>18),b=E+(C^g&(w^C))+v[0]+3921069994&4294967295,E=w+(b<<20&4294967295|b>>>12),b=g+(w^C&(E^w))+v[5]+3593408605&4294967295,g=E+(b<<5&4294967295|b>>>27),b=C+(E^w&(g^E))+v[10]+38016083&4294967295,C=g+(b<<9&4294967295|b>>>23),b=w+(g^E&(C^g))+v[15]+3634488961&4294967295,w=C+(b<<14&4294967295|b>>>18),b=E+(C^g&(w^C))+v[4]+3889429448&4294967295,E=w+(b<<20&4294967295|b>>>12),b=g+(w^C&(E^w))+v[9]+568446438&4294967295,g=E+(b<<5&4294967295|b>>>27),b=C+(E^w&(g^E))+v[14]+3275163606&4294967295,C=g+(b<<9&4294967295|b>>>23),b=w+(g^E&(C^g))+v[3]+4107603335&4294967295,w=C+(b<<14&4294967295|b>>>18),b=E+(C^g&(w^C))+v[8]+1163531501&4294967295,E=w+(b<<20&4294967295|b>>>12),b=g+(w^C&(E^w))+v[13]+2850285829&4294967295,g=E+(b<<5&4294967295|b>>>27),b=C+(E^w&(g^E))+v[2]+4243563512&4294967295,C=g+(b<<9&4294967295|b>>>23),b=w+(g^E&(C^g))+v[7]+1735328473&4294967295,w=C+(b<<14&4294967295|b>>>18),b=E+(C^g&(w^C))+v[12]+2368359562&4294967295,E=w+(b<<20&4294967295|b>>>12),b=g+(E^w^C)+v[5]+4294588738&4294967295,g=E+(b<<4&4294967295|b>>>28),b=C+(g^E^w)+v[8]+2272392833&4294967295,C=g+(b<<11&4294967295|b>>>21),b=w+(C^g^E)+v[11]+1839030562&4294967295,w=C+(b<<16&4294967295|b>>>16),b=E+(w^C^g)+v[14]+4259657740&4294967295,E=w+(b<<23&4294967295|b>>>9),b=g+(E^w^C)+v[1]+2763975236&4294967295,g=E+(b<<4&4294967295|b>>>28),b=C+(g^E^w)+v[4]+1272893353&4294967295,C=g+(b<<11&4294967295|b>>>21),b=w+(C^g^E)+v[7]+4139469664&4294967295,w=C+(b<<16&4294967295|b>>>16),b=E+(w^C^g)+v[10]+3200236656&4294967295,E=w+(b<<23&4294967295|b>>>9),b=g+(E^w^C)+v[13]+681279174&4294967295,g=E+(b<<4&4294967295|b>>>28),b=C+(g^E^w)+v[0]+3936430074&4294967295,C=g+(b<<11&4294967295|b>>>21),b=w+(C^g^E)+v[3]+3572445317&4294967295,w=C+(b<<16&4294967295|b>>>16),b=E+(w^C^g)+v[6]+76029189&4294967295,E=w+(b<<23&4294967295|b>>>9),b=g+(E^w^C)+v[9]+3654602809&4294967295,g=E+(b<<4&4294967295|b>>>28),b=C+(g^E^w)+v[12]+3873151461&4294967295,C=g+(b<<11&4294967295|b>>>21),b=w+(C^g^E)+v[15]+530742520&4294967295,w=C+(b<<16&4294967295|b>>>16),b=E+(w^C^g)+v[2]+3299628645&4294967295,E=w+(b<<23&4294967295|b>>>9),b=g+(w^(E|~C))+v[0]+4096336452&4294967295,g=E+(b<<6&4294967295|b>>>26),b=C+(E^(g|~w))+v[7]+1126891415&4294967295,C=g+(b<<10&4294967295|b>>>22),b=w+(g^(C|~E))+v[14]+2878612391&4294967295,w=C+(b<<15&4294967295|b>>>17),b=E+(C^(w|~g))+v[5]+4237533241&4294967295,E=w+(b<<21&4294967295|b>>>11),b=g+(w^(E|~C))+v[12]+1700485571&4294967295,g=E+(b<<6&4294967295|b>>>26),b=C+(E^(g|~w))+v[3]+2399980690&4294967295,C=g+(b<<10&4294967295|b>>>22),b=w+(g^(C|~E))+v[10]+4293915773&4294967295,w=C+(b<<15&4294967295|b>>>17),b=E+(C^(w|~g))+v[1]+2240044497&4294967295,E=w+(b<<21&4294967295|b>>>11),b=g+(w^(E|~C))+v[8]+1873313359&4294967295,g=E+(b<<6&4294967295|b>>>26),b=C+(E^(g|~w))+v[15]+4264355552&4294967295,C=g+(b<<10&4294967295|b>>>22),b=w+(g^(C|~E))+v[6]+2734768916&4294967295,w=C+(b<<15&4294967295|b>>>17),b=E+(C^(w|~g))+v[13]+1309151649&4294967295,E=w+(b<<21&4294967295|b>>>11),b=g+(w^(E|~C))+v[4]+4149444226&4294967295,g=E+(b<<6&4294967295|b>>>26),b=C+(E^(g|~w))+v[11]+3174756917&4294967295,C=g+(b<<10&4294967295|b>>>22),b=w+(g^(C|~E))+v[2]+718787259&4294967295,w=C+(b<<15&4294967295|b>>>17),b=E+(C^(w|~g))+v[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(w+(b<<21&4294967295|b>>>11))&4294967295,I.g[2]=I.g[2]+w&4294967295,I.g[3]=I.g[3]+C&4294967295}r.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var E=g-this.blockSize,v=this.B,w=this.h,C=0;C<g;){if(w==0)for(;C<=E;)s(this,I,C),C+=this.blockSize;if(typeof I=="string"){for(;C<g;)if(v[w++]=I.charCodeAt(C++),w==this.blockSize){s(this,v),w=0;break}}else for(;C<g;)if(v[w++]=I[C++],w==this.blockSize){s(this,v),w=0;break}}this.h=w,this.o+=g},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var E=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=E&255,E/=256;for(this.u(I),I=Array(16),g=E=0;4>g;++g)for(var v=0;32>v;v+=8)I[E++]=this.g[g]>>>v&255;return I};function i(I,g){var E=a;return Object.prototype.hasOwnProperty.call(E,I)?E[I]:E[I]=g(I)}function o(I,g){this.h=g;for(var E=[],v=!0,w=I.length-1;0<=w;w--){var C=I[w]|0;v&&C==g||(E[w]=C,v=!1)}this.g=E}var a={};function c(I){return-128<=I&&128>I?i(I,function(g){return new o([g|0],0>g?-1:0)}):new o([I|0],0>I?-1:0)}function h(I){if(isNaN(I)||!isFinite(I))return m;if(0>I)return q(h(-I));for(var g=[],E=1,v=0;I>=E;v++)g[v]=I/E|0,E*=4294967296;return new o(g,0)}function d(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return q(d(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var E=h(Math.pow(g,8)),v=m,w=0;w<I.length;w+=8){var C=Math.min(8,I.length-w),b=parseInt(I.substring(w,w+C),g);8>C?(C=h(Math.pow(g,C)),v=v.j(C).add(h(b))):(v=v.j(E),v=v.add(h(b)))}return v}var m=c(0),_=c(1),S=c(16777216);n=o.prototype,n.m=function(){if(O(this))return-q(this).m();for(var I=0,g=1,E=0;E<this.g.length;E++){var v=this.i(E);I+=(0<=v?v:4294967296+v)*g,g*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(D(this))return"0";if(O(this))return"-"+q(this).toString(I);for(var g=h(Math.pow(I,6)),E=this,v="";;){var w=$(E,g).g;E=H(E,w.j(g));var C=((0<E.g.length?E.g[0]:E.h)>>>0).toString(I);if(E=w,D(E))return C+v;for(;6>C.length;)C="0"+C;v=C+v}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function D(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function O(I){return I.h==-1}n.l=function(I){return I=H(this,I),O(I)?-1:D(I)?0:1};function q(I){for(var g=I.g.length,E=[],v=0;v<g;v++)E[v]=~I.g[v];return new o(E,~I.h).add(_)}n.abs=function(){return O(this)?q(this):this},n.add=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],v=0,w=0;w<=g;w++){var C=v+(this.i(w)&65535)+(I.i(w)&65535),b=(C>>>16)+(this.i(w)>>>16)+(I.i(w)>>>16);v=b>>>16,C&=65535,b&=65535,E[w]=b<<16|C}return new o(E,E[E.length-1]&-2147483648?-1:0)};function H(I,g){return I.add(q(g))}n.j=function(I){if(D(this)||D(I))return m;if(O(this))return O(I)?q(this).j(q(I)):q(q(this).j(I));if(O(I))return q(this.j(q(I)));if(0>this.l(S)&&0>I.l(S))return h(this.m()*I.m());for(var g=this.g.length+I.g.length,E=[],v=0;v<2*g;v++)E[v]=0;for(v=0;v<this.g.length;v++)for(var w=0;w<I.g.length;w++){var C=this.i(v)>>>16,b=this.i(v)&65535,dt=I.i(w)>>>16,ln=I.i(w)&65535;E[2*v+2*w]+=b*ln,K(E,2*v+2*w),E[2*v+2*w+1]+=C*ln,K(E,2*v+2*w+1),E[2*v+2*w+1]+=b*dt,K(E,2*v+2*w+1),E[2*v+2*w+2]+=C*dt,K(E,2*v+2*w+2)}for(v=0;v<g;v++)E[v]=E[2*v+1]<<16|E[2*v];for(v=g;v<2*g;v++)E[v]=0;return new o(E,0)};function K(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function Q(I,g){this.g=I,this.h=g}function $(I,g){if(D(g))throw Error("division by zero");if(D(I))return new Q(m,m);if(O(I))return g=$(q(I),g),new Q(q(g.g),q(g.h));if(O(g))return g=$(I,q(g)),new Q(q(g.g),g.h);if(30<I.g.length){if(O(I)||O(g))throw Error("slowDivide_ only works with positive integers.");for(var E=_,v=g;0>=v.l(I);)E=ce(E),v=ce(v);var w=Te(E,1),C=Te(v,1);for(v=Te(v,2),E=Te(E,2);!D(v);){var b=C.add(v);0>=b.l(I)&&(w=w.add(E),C=b),v=Te(v,1),E=Te(E,1)}return g=H(I,w.j(g)),new Q(w,g)}for(w=m;0<=I.l(g);){for(E=Math.max(1,Math.floor(I.m()/g.m())),v=Math.ceil(Math.log(E)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),C=h(E),b=C.j(g);O(b)||0<b.l(I);)E-=v,C=h(E),b=C.j(g);D(C)&&(C=_),w=w.add(C),I=H(I,b)}return new Q(w,I)}n.A=function(I){return $(this,I).h},n.and=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],v=0;v<g;v++)E[v]=this.i(v)&I.i(v);return new o(E,this.h&I.h)},n.or=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],v=0;v<g;v++)E[v]=this.i(v)|I.i(v);return new o(E,this.h|I.h)},n.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],v=0;v<g;v++)E[v]=this.i(v)^I.i(v);return new o(E,this.h^I.h)};function ce(I){for(var g=I.g.length+1,E=[],v=0;v<g;v++)E[v]=I.i(v)<<1|I.i(v-1)>>>31;return new o(E,I.h)}function Te(I,g){var E=g>>5;g%=32;for(var v=I.g.length-E,w=[],C=0;C<v;C++)w[C]=0<g?I.i(C+E)>>>g|I.i(C+E+1)<<32-g:I.i(C+E);return new o(w,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,u0=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=d,Nn=o}).apply(typeof gh<"u"?gh:typeof self<"u"?self:typeof window<"u"?window:{});var xi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var o0,bs,a0,Mi,Xo,c0,l0,h0;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(u,l,f){return u==Array.prototype||u==Object.prototype||(u[l]=f.value),u};function t(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof xi=="object"&&xi];for(var l=0;l<u.length;++l){var f=u[l];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function s(u,l){if(l)e:{var f=r;u=u.split(".");for(var p=0;p<u.length-1;p++){var A=u[p];if(!(A in f))break e;f=f[A]}u=u[u.length-1],p=f[u],l=l(p),l!=p&&l!=null&&e(f,u,{configurable:!0,writable:!0,value:l})}}function i(u,l){u instanceof String&&(u+="");var f=0,p=!1,A={next:function(){if(!p&&f<u.length){var x=f++;return{value:l(x,u[x]),done:!1}}return p=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}s("Array.prototype.values",function(u){return u||function(){return i(this,function(l,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function c(u){var l=typeof u;return l=l!="object"?l:u?Array.isArray(u)?"array":l:"null",l=="array"||l=="object"&&typeof u.length=="number"}function h(u){var l=typeof u;return l=="object"&&u!=null||l=="function"}function d(u,l,f){return u.call.apply(u.bind,arguments)}function m(u,l,f){if(!u)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,p),u.apply(l,A)}}return function(){return u.apply(l,arguments)}}function _(u,l,f){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:m,_.apply(null,arguments)}function S(u,l){var f=Array.prototype.slice.call(arguments,1);return function(){var p=f.slice();return p.push.apply(p,arguments),u.apply(this,p)}}function D(u,l){function f(){}f.prototype=l.prototype,u.aa=l.prototype,u.prototype=new f,u.prototype.constructor=u,u.Qb=function(p,A,x){for(var B=Array(arguments.length-2),be=2;be<arguments.length;be++)B[be-2]=arguments[be];return l.prototype[A].apply(p,B)}}function O(u){const l=u.length;if(0<l){const f=Array(l);for(let p=0;p<l;p++)f[p]=u[p];return f}return[]}function q(u,l){for(let f=1;f<arguments.length;f++){const p=arguments[f];if(c(p)){const A=u.length||0,x=p.length||0;u.length=A+x;for(let B=0;B<x;B++)u[A+B]=p[B]}else u.push(p)}}class H{constructor(l,f){this.i=l,this.j=f,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function K(u){return/^[\s\xa0]*$/.test(u)}function Q(){var u=a.navigator;return u&&(u=u.userAgent)?u:""}function $(u){return $[" "](u),u}$[" "]=function(){};var ce=Q().indexOf("Gecko")!=-1&&!(Q().toLowerCase().indexOf("webkit")!=-1&&Q().indexOf("Edge")==-1)&&!(Q().indexOf("Trident")!=-1||Q().indexOf("MSIE")!=-1)&&Q().indexOf("Edge")==-1;function Te(u,l,f){for(const p in u)l.call(f,u[p],p,u)}function I(u,l){for(const f in u)l.call(void 0,u[f],f,u)}function g(u){const l={};for(const f in u)l[f]=u[f];return l}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(u,l){let f,p;for(let A=1;A<arguments.length;A++){p=arguments[A];for(f in p)u[f]=p[f];for(let x=0;x<E.length;x++)f=E[x],Object.prototype.hasOwnProperty.call(p,f)&&(u[f]=p[f])}}function w(u){var l=1;u=u.split(":");const f=[];for(;0<l&&u.length;)f.push(u.shift()),l--;return u.length&&f.push(u.join(":")),f}function C(u){a.setTimeout(()=>{throw u},0)}function b(){var u=vt;let l=null;return u.g&&(l=u.g,u.g=u.g.next,u.g||(u.h=null),l.next=null),l}class dt{constructor(){this.h=this.g=null}add(l,f){const p=ln.get();p.set(l,f),this.h?this.h.next=p:this.g=p,this.h=p}}var ln=new H(()=>new qe,u=>u.reset());class qe{constructor(){this.next=this.g=this.h=null}set(l,f){this.h=l,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let ye,pe=!1,vt=new dt,jn=()=>{const u=a.Promise.resolve(void 0);ye=()=>{u.then(Ht)}};var Ht=()=>{for(var u;u=b();){try{u.h.call(u.g)}catch(f){C(f)}var l=ln;l.j(u),100>l.h&&(l.h++,u.next=l.g,l.g=u)}pe=!1};function ke(){this.s=this.s,this.C=this.C}ke.prototype.s=!1,ke.prototype.ma=function(){this.s||(this.s=!0,this.N())},ke.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ve(u,l){this.type=u,this.g=this.target=l,this.defaultPrevented=!1}Ve.prototype.h=function(){this.defaultPrevented=!0};var $u=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var u=!1,l=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const f=()=>{};a.addEventListener("test",f,l),a.removeEventListener("test",f,l)}catch{}return u})();function zn(u,l){if(Ve.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u){var f=this.type=u.type,p=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;if(this.target=u.target||u.srcElement,this.g=l,l=u.relatedTarget){if(ce){e:{try{$(l.nodeName);var A=!0;break e}catch{}A=!1}A||(l=null)}}else f=="mouseover"?l=u.fromElement:f=="mouseout"&&(l=u.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=typeof u.pointerType=="string"?u.pointerType:$n[u.pointerType]||"",this.state=u.state,this.i=u,u.defaultPrevented&&zn.aa.h.call(this)}}D(zn,Ve);var $n={2:"touch",3:"pen",4:"mouse"};zn.prototype.h=function(){zn.aa.h.call(this);var u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var Gt="closure_listenable_"+(1e6*Math.random()|0),ts=0;function ai(u,l,f,p,A){this.listener=u,this.proxy=null,this.src=l,this.type=f,this.capture=!!p,this.ha=A,this.key=++ts,this.da=this.fa=!1}function xt(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function ns(u){this.src=u,this.g={},this.h=0}ns.prototype.add=function(u,l,f,p,A){var x=u.toString();u=this.g[x],u||(u=this.g[x]=[],this.h++);var B=T(u,l,p,A);return-1<B?(l=u[B],f||(l.fa=!1)):(l=new ai(l,this.src,x,!!p,A),l.fa=f,u.push(l)),l};function y(u,l){var f=l.type;if(f in u.g){var p=u.g[f],A=Array.prototype.indexOf.call(p,l,void 0),x;(x=0<=A)&&Array.prototype.splice.call(p,A,1),x&&(xt(l),u.g[f].length==0&&(delete u.g[f],u.h--))}}function T(u,l,f,p){for(var A=0;A<u.length;++A){var x=u[A];if(!x.da&&x.listener==l&&x.capture==!!f&&x.ha==p)return A}return-1}var R="closure_lm_"+(1e6*Math.random()|0),k={};function N(u,l,f,p,A){if(Array.isArray(l)){for(var x=0;x<l.length;x++)N(u,l[x],f,p,A);return null}return f=ee(f),u&&u[Gt]?u.K(l,f,h(p)?!!p.capture:!1,A):F(u,l,f,!1,p,A)}function F(u,l,f,p,A,x){if(!l)throw Error("Invalid event type");var B=h(A)?!!A.capture:!!A,be=z(u);if(be||(u[R]=be=new ns(u)),f=be.add(l,f,p,B,x),f.proxy)return f;if(p=j(),f.proxy=p,p.src=u,p.listener=f,u.addEventListener)$u||(A=B),A===void 0&&(A=!1),u.addEventListener(l.toString(),p,A);else if(u.attachEvent)u.attachEvent(V(l.toString()),p);else if(u.addListener&&u.removeListener)u.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return f}function j(){function u(f){return l.call(u.src,u.listener,f)}const l=Y;return u}function U(u,l,f,p,A){if(Array.isArray(l))for(var x=0;x<l.length;x++)U(u,l[x],f,p,A);else p=h(p)?!!p.capture:!!p,f=ee(f),u&&u[Gt]?(u=u.i,l=String(l).toString(),l in u.g&&(x=u.g[l],f=T(x,f,p,A),-1<f&&(xt(x[f]),Array.prototype.splice.call(x,f,1),x.length==0&&(delete u.g[l],u.h--)))):u&&(u=z(u))&&(l=u.g[l.toString()],u=-1,l&&(u=T(l,f,p,A)),(f=-1<u?l[u]:null)&&L(f))}function L(u){if(typeof u!="number"&&u&&!u.da){var l=u.src;if(l&&l[Gt])y(l.i,u);else{var f=u.type,p=u.proxy;l.removeEventListener?l.removeEventListener(f,p,u.capture):l.detachEvent?l.detachEvent(V(f),p):l.addListener&&l.removeListener&&l.removeListener(p),(f=z(l))?(y(f,u),f.h==0&&(f.src=null,l[R]=null)):xt(u)}}}function V(u){return u in k?k[u]:k[u]="on"+u}function Y(u,l){if(u.da)u=!0;else{l=new zn(l,this);var f=u.listener,p=u.ha||u.src;u.fa&&L(u),u=f.call(p,l)}return u}function z(u){return u=u[R],u instanceof ns?u:null}var J="__closure_events_fn_"+(1e9*Math.random()>>>0);function ee(u){return typeof u=="function"?u:(u[J]||(u[J]=function(l){return u.handleEvent(l)}),u[J])}function X(){ke.call(this),this.i=new ns(this),this.M=this,this.F=null}D(X,ke),X.prototype[Gt]=!0,X.prototype.removeEventListener=function(u,l,f,p){U(this,u,l,f,p)};function se(u,l){var f,p=u.F;if(p)for(f=[];p;p=p.F)f.push(p);if(u=u.M,p=l.type||l,typeof l=="string")l=new Ve(l,u);else if(l instanceof Ve)l.target=l.target||u;else{var A=l;l=new Ve(p,u),v(l,A)}if(A=!0,f)for(var x=f.length-1;0<=x;x--){var B=l.g=f[x];A=le(B,p,!0,l)&&A}if(B=l.g=u,A=le(B,p,!0,l)&&A,A=le(B,p,!1,l)&&A,f)for(x=0;x<f.length;x++)B=l.g=f[x],A=le(B,p,!1,l)&&A}X.prototype.N=function(){if(X.aa.N.call(this),this.i){var u=this.i,l;for(l in u.g){for(var f=u.g[l],p=0;p<f.length;p++)xt(f[p]);delete u.g[l],u.h--}}this.F=null},X.prototype.K=function(u,l,f,p){return this.i.add(String(u),l,!1,f,p)},X.prototype.L=function(u,l,f,p){return this.i.add(String(u),l,!0,f,p)};function le(u,l,f,p){if(l=u.i.g[String(l)],!l)return!0;l=l.concat();for(var A=!0,x=0;x<l.length;++x){var B=l[x];if(B&&!B.da&&B.capture==f){var be=B.listener,He=B.ha||B.src;B.fa&&y(u.i,B),A=be.call(He,p)!==!1&&A}}return A&&!p.defaultPrevented}function je(u,l,f){if(typeof u=="function")f&&(u=_(u,f));else if(u&&typeof u.handleEvent=="function")u=_(u.handleEvent,u);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:a.setTimeout(u,l||0)}function ze(u){u.g=je(()=>{u.g=null,u.i&&(u.i=!1,ze(u))},u.l);const l=u.h;u.h=null,u.m.apply(null,l)}class _t extends ke{constructor(l,f){super(),this.m=l,this.l=f,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:ze(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ke(u){ke.call(this),this.h=u,this.g={}}D(Ke,ke);var hn=[];function rs(u){Te(u.g,function(l,f){this.g.hasOwnProperty(f)&&L(l)},u),u.g={}}Ke.prototype.N=function(){Ke.aa.N.call(this),rs(this)},Ke.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var $e=a.JSON.stringify,yt=a.JSON.parse,ci=class{stringify(u){return a.JSON.stringify(u,void 0)}parse(u){return a.JSON.parse(u,void 0)}};function dr(){}dr.prototype.h=null;function Dc(u){return u.h||(u.h=u.i())}function Pc(){}var ss={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Hu(){Ve.call(this,"d")}D(Hu,Ve);function Gu(){Ve.call(this,"c")}D(Gu,Ve);var Hn={},Nc=null;function li(){return Nc=Nc||new X}Hn.La="serverreachability";function Fc(u){Ve.call(this,Hn.La,u)}D(Fc,Ve);function is(u){const l=li();se(l,new Fc(l))}Hn.STAT_EVENT="statevent";function kc(u,l){Ve.call(this,Hn.STAT_EVENT,u),this.stat=l}D(kc,Ve);function it(u){const l=li();se(l,new kc(l,u))}Hn.Ma="timingevent";function Vc(u,l){Ve.call(this,Hn.Ma,u),this.size=l}D(Vc,Ve);function us(u,l){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){u()},l)}function os(){this.g=!0}os.prototype.xa=function(){this.g=!1};function r1(u,l,f,p,A,x){u.info(function(){if(u.g)if(x)for(var B="",be=x.split("&"),He=0;He<be.length;He++){var me=be[He].split("=");if(1<me.length){var Qe=me[0];me=me[1];var Je=Qe.split("_");B=2<=Je.length&&Je[1]=="type"?B+(Qe+"="+me+"&"):B+(Qe+"=redacted&")}}else B=null;else B=x;return"XMLHTTP REQ ("+p+") [attempt "+A+"]: "+l+`
`+f+`
`+B})}function s1(u,l,f,p,A,x,B){u.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+A+"]: "+l+`
`+f+`
`+x+" "+B})}function pr(u,l,f,p){u.info(function(){return"XMLHTTP TEXT ("+l+"): "+u1(u,f)+(p?" "+p:"")})}function i1(u,l){u.info(function(){return"TIMEOUT: "+l})}os.prototype.info=function(){};function u1(u,l){if(!u.g)return l;if(!l)return null;try{var f=JSON.parse(l);if(f){for(u=0;u<f.length;u++)if(Array.isArray(f[u])){var p=f[u];if(!(2>p.length)){var A=p[1];if(Array.isArray(A)&&!(1>A.length)){var x=A[0];if(x!="noop"&&x!="stop"&&x!="close")for(var B=1;B<A.length;B++)A[B]=""}}}}return $e(f)}catch{return l}}var hi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Oc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Wu;function fi(){}D(fi,dr),fi.prototype.g=function(){return new XMLHttpRequest},fi.prototype.i=function(){return{}},Wu=new fi;function fn(u,l,f,p){this.j=u,this.i=l,this.l=f,this.R=p||1,this.U=new Ke(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Mc}function Mc(){this.i=null,this.g="",this.h=!1}var Lc={},Ku={};function Qu(u,l,f){u.L=1,u.v=gi(Wt(l)),u.m=f,u.P=!0,Uc(u,null)}function Uc(u,l){u.F=Date.now(),di(u),u.A=Wt(u.v);var f=u.A,p=u.R;Array.isArray(p)||(p=[String(p)]),Zc(f.i,"t",p),u.C=0,f=u.j.J,u.h=new Mc,u.g=_l(u.j,f?l:null,!u.m),0<u.O&&(u.M=new _t(_(u.Y,u,u.g),u.O)),l=u.U,f=u.g,p=u.ca;var A="readystatechange";Array.isArray(A)||(A&&(hn[0]=A.toString()),A=hn);for(var x=0;x<A.length;x++){var B=N(f,A[x],p||l.handleEvent,!1,l.h||l);if(!B)break;l.g[B.key]=B}l=u.H?g(u.H):{},u.m?(u.u||(u.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.A,u.u,u.m,l)):(u.u="GET",u.g.ea(u.A,u.u,null,l)),is(),r1(u.i,u.u,u.A,u.l,u.R,u.m)}fn.prototype.ca=function(u){u=u.target;const l=this.M;l&&Kt(u)==3?l.j():this.Y(u)},fn.prototype.Y=function(u){try{if(u==this.g)e:{const Je=Kt(this.g);var l=this.g.Ba();const _r=this.g.Z();if(!(3>Je)&&(Je!=3||this.g&&(this.h.h||this.g.oa()||ul(this.g)))){this.J||Je!=4||l==7||(l==8||0>=_r?is(3):is(2)),Ju(this);var f=this.g.Z();this.X=f;t:if(Bc(this)){var p=ul(this.g);u="";var A=p.length,x=Kt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Gn(this),as(this);var B="";break t}this.h.i=new a.TextDecoder}for(l=0;l<A;l++)this.h.h=!0,u+=this.h.i.decode(p[l],{stream:!(x&&l==A-1)});p.length=0,this.h.g+=u,this.C=0,B=this.h.g}else B=this.g.oa();if(this.o=f==200,s1(this.i,this.u,this.A,this.l,this.R,Je,f),this.o){if(this.T&&!this.K){t:{if(this.g){var be,He=this.g;if((be=He.g?He.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(be)){var me=be;break t}}me=null}if(f=me)pr(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Yu(this,f);else{this.o=!1,this.s=3,it(12),Gn(this),as(this);break e}}if(this.P){f=!0;let Tt;for(;!this.J&&this.C<B.length;)if(Tt=o1(this,B),Tt==Ku){Je==4&&(this.s=4,it(14),f=!1),pr(this.i,this.l,null,"[Incomplete Response]");break}else if(Tt==Lc){this.s=4,it(15),pr(this.i,this.l,B,"[Invalid Chunk]"),f=!1;break}else pr(this.i,this.l,Tt,null),Yu(this,Tt);if(Bc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Je!=4||B.length!=0||this.h.h||(this.s=1,it(16),f=!1),this.o=this.o&&f,!f)pr(this.i,this.l,B,"[Invalid Chunked Response]"),Gn(this),as(this);else if(0<B.length&&!this.W){this.W=!0;var Qe=this.j;Qe.g==this&&Qe.ba&&!Qe.M&&(Qe.j.info("Great, no buffering proxy detected. Bytes received: "+B.length),ro(Qe),Qe.M=!0,it(11))}}else pr(this.i,this.l,B,null),Yu(this,B);Je==4&&Gn(this),this.o&&!this.J&&(Je==4?dl(this.j,this):(this.o=!1,di(this)))}else w1(this.g),f==400&&0<B.indexOf("Unknown SID")?(this.s=3,it(12)):(this.s=0,it(13)),Gn(this),as(this)}}}catch{}finally{}};function Bc(u){return u.g?u.u=="GET"&&u.L!=2&&u.j.Ca:!1}function o1(u,l){var f=u.C,p=l.indexOf(`
`,f);return p==-1?Ku:(f=Number(l.substring(f,p)),isNaN(f)?Lc:(p+=1,p+f>l.length?Ku:(l=l.slice(p,p+f),u.C=p+f,l)))}fn.prototype.cancel=function(){this.J=!0,Gn(this)};function di(u){u.S=Date.now()+u.I,qc(u,u.I)}function qc(u,l){if(u.B!=null)throw Error("WatchDog timer not null");u.B=us(_(u.ba,u),l)}function Ju(u){u.B&&(a.clearTimeout(u.B),u.B=null)}fn.prototype.ba=function(){this.B=null;const u=Date.now();0<=u-this.S?(i1(this.i,this.A),this.L!=2&&(is(),it(17)),Gn(this),this.s=2,as(this)):qc(this,this.S-u)};function as(u){u.j.G==0||u.J||dl(u.j,u)}function Gn(u){Ju(u);var l=u.M;l&&typeof l.ma=="function"&&l.ma(),u.M=null,rs(u.U),u.g&&(l=u.g,u.g=null,l.abort(),l.ma())}function Yu(u,l){try{var f=u.j;if(f.G!=0&&(f.g==u||Xu(f.h,u))){if(!u.K&&Xu(f.h,u)&&f.G==3){try{var p=f.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var A=p;if(A[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<u.F)Ti(f),Ei(f);else break e;no(f),it(18)}}else f.za=A[1],0<f.za-f.T&&37500>A[2]&&f.F&&f.v==0&&!f.C&&(f.C=us(_(f.Za,f),6e3));if(1>=$c(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else Kn(f,11)}else if((u.K||f.g==u)&&Ti(f),!K(l))for(A=f.Da.g.parse(l),l=0;l<A.length;l++){let me=A[l];if(f.T=me[0],me=me[1],f.G==2)if(me[0]=="c"){f.K=me[1],f.ia=me[2];const Qe=me[3];Qe!=null&&(f.la=Qe,f.j.info("VER="+f.la));const Je=me[4];Je!=null&&(f.Aa=Je,f.j.info("SVER="+f.Aa));const _r=me[5];_r!=null&&typeof _r=="number"&&0<_r&&(p=1.5*_r,f.L=p,f.j.info("backChannelRequestTimeoutMs_="+p)),p=f;const Tt=u.g;if(Tt){const wi=Tt.g?Tt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(wi){var x=p.h;x.g||wi.indexOf("spdy")==-1&&wi.indexOf("quic")==-1&&wi.indexOf("h2")==-1||(x.j=x.l,x.g=new Set,x.h&&(Zu(x,x.h),x.h=null))}if(p.D){const so=Tt.g?Tt.g.getResponseHeader("X-HTTP-Session-Id"):null;so&&(p.ya=so,Ie(p.I,p.D,so))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-u.F,f.j.info("Handshake RTT: "+f.R+"ms")),p=f;var B=u;if(p.qa=gl(p,p.J?p.ia:null,p.W),B.K){Hc(p.h,B);var be=B,He=p.L;He&&(be.I=He),be.B&&(Ju(be),di(be)),p.g=B}else hl(p);0<f.i.length&&vi(f)}else me[0]!="stop"&&me[0]!="close"||Kn(f,7);else f.G==3&&(me[0]=="stop"||me[0]=="close"?me[0]=="stop"?Kn(f,7):to(f):me[0]!="noop"&&f.l&&f.l.ta(me),f.v=0)}}is(4)}catch{}}var a1=class{constructor(u,l){this.g=u,this.map=l}};function jc(u){this.l=u||10,a.PerformanceNavigationTiming?(u=a.performance.getEntriesByType("navigation"),u=0<u.length&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function zc(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function $c(u){return u.h?1:u.g?u.g.size:0}function Xu(u,l){return u.h?u.h==l:u.g?u.g.has(l):!1}function Zu(u,l){u.g?u.g.add(l):u.h=l}function Hc(u,l){u.h&&u.h==l?u.h=null:u.g&&u.g.has(l)&&u.g.delete(l)}jc.prototype.cancel=function(){if(this.i=Gc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function Gc(u){if(u.h!=null)return u.i.concat(u.h.D);if(u.g!=null&&u.g.size!==0){let l=u.i;for(const f of u.g.values())l=l.concat(f.D);return l}return O(u.i)}function c1(u){if(u.V&&typeof u.V=="function")return u.V();if(typeof Map<"u"&&u instanceof Map||typeof Set<"u"&&u instanceof Set)return Array.from(u.values());if(typeof u=="string")return u.split("");if(c(u)){for(var l=[],f=u.length,p=0;p<f;p++)l.push(u[p]);return l}l=[],f=0;for(p in u)l[f++]=u[p];return l}function l1(u){if(u.na&&typeof u.na=="function")return u.na();if(!u.V||typeof u.V!="function"){if(typeof Map<"u"&&u instanceof Map)return Array.from(u.keys());if(!(typeof Set<"u"&&u instanceof Set)){if(c(u)||typeof u=="string"){var l=[];u=u.length;for(var f=0;f<u;f++)l.push(f);return l}l=[],f=0;for(const p in u)l[f++]=p;return l}}}function Wc(u,l){if(u.forEach&&typeof u.forEach=="function")u.forEach(l,void 0);else if(c(u)||typeof u=="string")Array.prototype.forEach.call(u,l,void 0);else for(var f=l1(u),p=c1(u),A=p.length,x=0;x<A;x++)l.call(void 0,p[x],f&&f[x],u)}var Kc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function h1(u,l){if(u){u=u.split("&");for(var f=0;f<u.length;f++){var p=u[f].indexOf("="),A=null;if(0<=p){var x=u[f].substring(0,p);A=u[f].substring(p+1)}else x=u[f];l(x,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function Wn(u){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,u instanceof Wn){this.h=u.h,pi(this,u.j),this.o=u.o,this.g=u.g,mi(this,u.s),this.l=u.l;var l=u.i,f=new hs;f.i=l.i,l.g&&(f.g=new Map(l.g),f.h=l.h),Qc(this,f),this.m=u.m}else u&&(l=String(u).match(Kc))?(this.h=!1,pi(this,l[1]||"",!0),this.o=cs(l[2]||""),this.g=cs(l[3]||"",!0),mi(this,l[4]),this.l=cs(l[5]||"",!0),Qc(this,l[6]||"",!0),this.m=cs(l[7]||"")):(this.h=!1,this.i=new hs(null,this.h))}Wn.prototype.toString=function(){var u=[],l=this.j;l&&u.push(ls(l,Jc,!0),":");var f=this.g;return(f||l=="file")&&(u.push("//"),(l=this.o)&&u.push(ls(l,Jc,!0),"@"),u.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&u.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&u.push("/"),u.push(ls(f,f.charAt(0)=="/"?p1:d1,!0))),(f=this.i.toString())&&u.push("?",f),(f=this.m)&&u.push("#",ls(f,g1)),u.join("")};function Wt(u){return new Wn(u)}function pi(u,l,f){u.j=f?cs(l,!0):l,u.j&&(u.j=u.j.replace(/:$/,""))}function mi(u,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);u.s=l}else u.s=null}function Qc(u,l,f){l instanceof hs?(u.i=l,_1(u.i,u.h)):(f||(l=ls(l,m1)),u.i=new hs(l,u.h))}function Ie(u,l,f){u.i.set(l,f)}function gi(u){return Ie(u,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),u}function cs(u,l){return u?l?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function ls(u,l,f){return typeof u=="string"?(u=encodeURI(u).replace(l,f1),f&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function f1(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var Jc=/[#\/\?@]/g,d1=/[#\?:]/g,p1=/[#\?]/g,m1=/[#\?@]/g,g1=/#/g;function hs(u,l){this.h=this.g=null,this.i=u||null,this.j=!!l}function dn(u){u.g||(u.g=new Map,u.h=0,u.i&&h1(u.i,function(l,f){u.add(decodeURIComponent(l.replace(/\+/g," ")),f)}))}n=hs.prototype,n.add=function(u,l){dn(this),this.i=null,u=mr(this,u);var f=this.g.get(u);return f||this.g.set(u,f=[]),f.push(l),this.h+=1,this};function Yc(u,l){dn(u),l=mr(u,l),u.g.has(l)&&(u.i=null,u.h-=u.g.get(l).length,u.g.delete(l))}function Xc(u,l){return dn(u),l=mr(u,l),u.g.has(l)}n.forEach=function(u,l){dn(this),this.g.forEach(function(f,p){f.forEach(function(A){u.call(l,A,p,this)},this)},this)},n.na=function(){dn(this);const u=Array.from(this.g.values()),l=Array.from(this.g.keys()),f=[];for(let p=0;p<l.length;p++){const A=u[p];for(let x=0;x<A.length;x++)f.push(l[p])}return f},n.V=function(u){dn(this);let l=[];if(typeof u=="string")Xc(this,u)&&(l=l.concat(this.g.get(mr(this,u))));else{u=Array.from(this.g.values());for(let f=0;f<u.length;f++)l=l.concat(u[f])}return l},n.set=function(u,l){return dn(this),this.i=null,u=mr(this,u),Xc(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[l]),this.h+=1,this},n.get=function(u,l){return u?(u=this.V(u),0<u.length?String(u[0]):l):l};function Zc(u,l,f){Yc(u,l),0<f.length&&(u.i=null,u.g.set(mr(u,l),O(f)),u.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],l=Array.from(this.g.keys());for(var f=0;f<l.length;f++){var p=l[f];const x=encodeURIComponent(String(p)),B=this.V(p);for(p=0;p<B.length;p++){var A=x;B[p]!==""&&(A+="="+encodeURIComponent(String(B[p]))),u.push(A)}}return this.i=u.join("&")};function mr(u,l){return l=String(l),u.j&&(l=l.toLowerCase()),l}function _1(u,l){l&&!u.j&&(dn(u),u.i=null,u.g.forEach(function(f,p){var A=p.toLowerCase();p!=A&&(Yc(this,p),Zc(this,A,f))},u)),u.j=l}function y1(u,l){const f=new os;if(a.Image){const p=new Image;p.onload=S(pn,f,"TestLoadImage: loaded",!0,l,p),p.onerror=S(pn,f,"TestLoadImage: error",!1,l,p),p.onabort=S(pn,f,"TestLoadImage: abort",!1,l,p),p.ontimeout=S(pn,f,"TestLoadImage: timeout",!1,l,p),a.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=u}else l(!1)}function b1(u,l){const f=new os,p=new AbortController,A=setTimeout(()=>{p.abort(),pn(f,"TestPingServer: timeout",!1,l)},1e4);fetch(u,{signal:p.signal}).then(x=>{clearTimeout(A),x.ok?pn(f,"TestPingServer: ok",!0,l):pn(f,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),pn(f,"TestPingServer: error",!1,l)})}function pn(u,l,f,p,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),p(f)}catch{}}function E1(){this.g=new ci}function v1(u,l,f){const p=f||"";try{Wc(u,function(A,x){let B=A;h(A)&&(B=$e(A)),l.push(p+x+"="+encodeURIComponent(B))})}catch(A){throw l.push(p+"type="+encodeURIComponent("_badmap")),A}}function _i(u){this.l=u.Ub||null,this.j=u.eb||!1}D(_i,dr),_i.prototype.g=function(){return new yi(this.l,this.j)},_i.prototype.i=(function(u){return function(){return u}})({});function yi(u,l){X.call(this),this.D=u,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(yi,X),n=yi.prototype,n.open=function(u,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=u,this.A=l,this.readyState=1,ds(this)},n.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};u&&(l.body=u),(this.D||a).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,fs(this)),this.readyState=0},n.Sa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,ds(this)),this.g&&(this.readyState=3,ds(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;el(this)}else u.text().then(this.Ra.bind(this),this.ga.bind(this))};function el(u){u.j.read().then(u.Pa.bind(u)).catch(u.ga.bind(u))}n.Pa=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var l=u.value?u.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!u.done}))&&(this.response=this.responseText+=l)}u.done?fs(this):ds(this),this.readyState==3&&el(this)}},n.Ra=function(u){this.g&&(this.response=this.responseText=u,fs(this))},n.Qa=function(u){this.g&&(this.response=u,fs(this))},n.ga=function(){this.g&&fs(this)};function fs(u){u.readyState=4,u.l=null,u.j=null,u.v=null,ds(u)}n.setRequestHeader=function(u,l){this.u.append(u,l)},n.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],l=this.h.entries();for(var f=l.next();!f.done;)f=f.value,u.push(f[0]+": "+f[1]),f=l.next();return u.join(`\r
`)};function ds(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(yi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function tl(u){let l="";return Te(u,function(f,p){l+=p,l+=":",l+=f,l+=`\r
`}),l}function eo(u,l,f){e:{for(p in f){var p=!1;break e}p=!0}p||(f=tl(f),typeof u=="string"?f!=null&&encodeURIComponent(String(f)):Ie(u,l,f))}function Se(u){X.call(this),this.headers=new Map,this.o=u||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(Se,X);var T1=/^https?$/i,I1=["POST","PUT"];n=Se.prototype,n.Ha=function(u){this.J=u},n.ea=function(u,l,f,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);l=l?l.toUpperCase():"GET",this.D=u,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Wu.g(),this.v=this.o?Dc(this.o):Dc(Wu),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(l,String(u),!0),this.B=!1}catch(x){nl(this,x);return}if(u=f||"",f=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var A in p)f.set(A,p[A]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const x of p.keys())f.set(x,p.get(x));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(f.keys()).find(x=>x.toLowerCase()=="content-type"),A=a.FormData&&u instanceof a.FormData,!(0<=Array.prototype.indexOf.call(I1,l,void 0))||p||A||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[x,B]of f)this.g.setRequestHeader(x,B);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{il(this),this.u=!0,this.g.send(u),this.u=!1}catch(x){nl(this,x)}};function nl(u,l){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=l,u.m=5,rl(u),bi(u)}function rl(u){u.A||(u.A=!0,se(u,"complete"),se(u,"error"))}n.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=u||7,se(this,"complete"),se(this,"abort"),bi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),bi(this,!0)),Se.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?sl(this):this.bb())},n.bb=function(){sl(this)};function sl(u){if(u.h&&typeof o<"u"&&(!u.v[1]||Kt(u)!=4||u.Z()!=2)){if(u.u&&Kt(u)==4)je(u.Ea,0,u);else if(se(u,"readystatechange"),Kt(u)==4){u.h=!1;try{const B=u.Z();e:switch(B){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var f;if(!(f=l)){var p;if(p=B===0){var A=String(u.D).match(Kc)[1]||null;!A&&a.self&&a.self.location&&(A=a.self.location.protocol.slice(0,-1)),p=!T1.test(A?A.toLowerCase():"")}f=p}if(f)se(u,"complete"),se(u,"success");else{u.m=6;try{var x=2<Kt(u)?u.g.statusText:""}catch{x=""}u.l=x+" ["+u.Z()+"]",rl(u)}}finally{bi(u)}}}}function bi(u,l){if(u.g){il(u);const f=u.g,p=u.v[0]?()=>{}:null;u.g=null,u.v=null,l||se(u,"ready");try{f.onreadystatechange=p}catch{}}}function il(u){u.I&&(a.clearTimeout(u.I),u.I=null)}n.isActive=function(){return!!this.g};function Kt(u){return u.g?u.g.readyState:0}n.Z=function(){try{return 2<Kt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(u){if(this.g){var l=this.g.responseText;return u&&l.indexOf(u)==0&&(l=l.substring(u.length)),yt(l)}};function ul(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.H){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function w1(u){const l={};u=(u.g&&2<=Kt(u)&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<u.length;p++){if(K(u[p]))continue;var f=w(u[p]);const A=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const x=l[A]||[];l[A]=x,x.push(f)}I(l,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ps(u,l,f){return f&&f.internalChannelParams&&f.internalChannelParams[u]||l}function ol(u){this.Aa=0,this.i=[],this.j=new os,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ps("failFast",!1,u),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ps("baseRetryDelayMs",5e3,u),this.cb=ps("retryDelaySeedMs",1e4,u),this.Wa=ps("forwardChannelMaxRetries",2,u),this.wa=ps("forwardChannelRequestTimeoutMs",2e4,u),this.pa=u&&u.xmlHttpFactory||void 0,this.Xa=u&&u.Tb||void 0,this.Ca=u&&u.useFetchStreams||!1,this.L=void 0,this.J=u&&u.supportsCrossDomainXhr||!1,this.K="",this.h=new jc(u&&u.concurrentRequestLimit),this.Da=new E1,this.P=u&&u.fastHandshake||!1,this.O=u&&u.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=u&&u.Rb||!1,u&&u.xa&&this.j.xa(),u&&u.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&u&&u.detectBufferingProxy||!1,this.ja=void 0,u&&u.longPollingTimeout&&0<u.longPollingTimeout&&(this.ja=u.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=ol.prototype,n.la=8,n.G=1,n.connect=function(u,l,f,p){it(0),this.W=u,this.H=l||{},f&&p!==void 0&&(this.H.OSID=f,this.H.OAID=p),this.F=this.X,this.I=gl(this,null,this.W),vi(this)};function to(u){if(al(u),u.G==3){var l=u.U++,f=Wt(u.I);if(Ie(f,"SID",u.K),Ie(f,"RID",l),Ie(f,"TYPE","terminate"),ms(u,f),l=new fn(u,u.j,l),l.L=2,l.v=gi(Wt(f)),f=!1,a.navigator&&a.navigator.sendBeacon)try{f=a.navigator.sendBeacon(l.v.toString(),"")}catch{}!f&&a.Image&&(new Image().src=l.v,f=!0),f||(l.g=_l(l.j,null),l.g.ea(l.v)),l.F=Date.now(),di(l)}ml(u)}function Ei(u){u.g&&(ro(u),u.g.cancel(),u.g=null)}function al(u){Ei(u),u.u&&(a.clearTimeout(u.u),u.u=null),Ti(u),u.h.cancel(),u.s&&(typeof u.s=="number"&&a.clearTimeout(u.s),u.s=null)}function vi(u){if(!zc(u.h)&&!u.s){u.s=!0;var l=u.Ga;ye||jn(),pe||(ye(),pe=!0),vt.add(l,u),u.B=0}}function A1(u,l){return $c(u.h)>=u.h.j-(u.s?1:0)?!1:u.s?(u.i=l.D.concat(u.i),!0):u.G==1||u.G==2||u.B>=(u.Va?0:u.Wa)?!1:(u.s=us(_(u.Ga,u,l),pl(u,u.B)),u.B++,!0)}n.Ga=function(u){if(this.s)if(this.s=null,this.G==1){if(!u){this.U=Math.floor(1e5*Math.random()),u=this.U++;const A=new fn(this,this.j,u);let x=this.o;if(this.S&&(x?(x=g(x),v(x,this.S)):x=this.S),this.m!==null||this.O||(A.H=x,x=null),this.P)e:{for(var l=0,f=0;f<this.i.length;f++){t:{var p=this.i[f];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=f;break e}if(l===4096||f===this.i.length-1){l=f+1;break e}}l=1e3}else l=1e3;l=ll(this,A,l),f=Wt(this.I),Ie(f,"RID",u),Ie(f,"CVER",22),this.D&&Ie(f,"X-HTTP-Session-Id",this.D),ms(this,f),x&&(this.O?l="headers="+encodeURIComponent(String(tl(x)))+"&"+l:this.m&&eo(f,this.m,x)),Zu(this.h,A),this.Ua&&Ie(f,"TYPE","init"),this.P?(Ie(f,"$req",l),Ie(f,"SID","null"),A.T=!0,Qu(A,f,null)):Qu(A,f,l),this.G=2}}else this.G==3&&(u?cl(this,u):this.i.length==0||zc(this.h)||cl(this))};function cl(u,l){var f;l?f=l.l:f=u.U++;const p=Wt(u.I);Ie(p,"SID",u.K),Ie(p,"RID",f),Ie(p,"AID",u.T),ms(u,p),u.m&&u.o&&eo(p,u.m,u.o),f=new fn(u,u.j,f,u.B+1),u.m===null&&(f.H=u.o),l&&(u.i=l.D.concat(u.i)),l=ll(u,f,1e3),f.I=Math.round(.5*u.wa)+Math.round(.5*u.wa*Math.random()),Zu(u.h,f),Qu(f,p,l)}function ms(u,l){u.H&&Te(u.H,function(f,p){Ie(l,p,f)}),u.l&&Wc({},function(f,p){Ie(l,p,f)})}function ll(u,l,f){f=Math.min(u.i.length,f);var p=u.l?_(u.l.Na,u.l,u):null;e:{var A=u.i;let x=-1;for(;;){const B=["count="+f];x==-1?0<f?(x=A[0].g,B.push("ofs="+x)):x=0:B.push("ofs="+x);let be=!0;for(let He=0;He<f;He++){let me=A[He].g;const Qe=A[He].map;if(me-=x,0>me)x=Math.max(0,A[He].g-100),be=!1;else try{v1(Qe,B,"req"+me+"_")}catch{p&&p(Qe)}}if(be){p=B.join("&");break e}}}return u=u.i.splice(0,f),l.D=u,p}function hl(u){if(!u.g&&!u.u){u.Y=1;var l=u.Fa;ye||jn(),pe||(ye(),pe=!0),vt.add(l,u),u.v=0}}function no(u){return u.g||u.u||3<=u.v?!1:(u.Y++,u.u=us(_(u.Fa,u),pl(u,u.v)),u.v++,!0)}n.Fa=function(){if(this.u=null,fl(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var u=2*this.R;this.j.info("BP detection timer enabled: "+u),this.A=us(_(this.ab,this),u)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,it(10),Ei(this),fl(this))};function ro(u){u.A!=null&&(a.clearTimeout(u.A),u.A=null)}function fl(u){u.g=new fn(u,u.j,"rpc",u.Y),u.m===null&&(u.g.H=u.o),u.g.O=0;var l=Wt(u.qa);Ie(l,"RID","rpc"),Ie(l,"SID",u.K),Ie(l,"AID",u.T),Ie(l,"CI",u.F?"0":"1"),!u.F&&u.ja&&Ie(l,"TO",u.ja),Ie(l,"TYPE","xmlhttp"),ms(u,l),u.m&&u.o&&eo(l,u.m,u.o),u.L&&(u.g.I=u.L);var f=u.g;u=u.ia,f.L=1,f.v=gi(Wt(l)),f.m=null,f.P=!0,Uc(f,u)}n.Za=function(){this.C!=null&&(this.C=null,Ei(this),no(this),it(19))};function Ti(u){u.C!=null&&(a.clearTimeout(u.C),u.C=null)}function dl(u,l){var f=null;if(u.g==l){Ti(u),ro(u),u.g=null;var p=2}else if(Xu(u.h,l))f=l.D,Hc(u.h,l),p=1;else return;if(u.G!=0){if(l.o)if(p==1){f=l.m?l.m.length:0,l=Date.now()-l.F;var A=u.B;p=li(),se(p,new Vc(p,f)),vi(u)}else hl(u);else if(A=l.s,A==3||A==0&&0<l.X||!(p==1&&A1(u,l)||p==2&&no(u)))switch(f&&0<f.length&&(l=u.h,l.i=l.i.concat(f)),A){case 1:Kn(u,5);break;case 4:Kn(u,10);break;case 3:Kn(u,6);break;default:Kn(u,2)}}}function pl(u,l){let f=u.Ta+Math.floor(Math.random()*u.cb);return u.isActive()||(f*=2),f*l}function Kn(u,l){if(u.j.info("Error code "+l),l==2){var f=_(u.fb,u),p=u.Xa;const A=!p;p=new Wn(p||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||pi(p,"https"),gi(p),A?y1(p.toString(),f):b1(p.toString(),f)}else it(2);u.G=0,u.l&&u.l.sa(l),ml(u),al(u)}n.fb=function(u){u?(this.j.info("Successfully pinged google.com"),it(2)):(this.j.info("Failed to ping google.com"),it(1))};function ml(u){if(u.G=0,u.ka=[],u.l){const l=Gc(u.h);(l.length!=0||u.i.length!=0)&&(q(u.ka,l),q(u.ka,u.i),u.h.i.length=0,O(u.i),u.i.length=0),u.l.ra()}}function gl(u,l,f){var p=f instanceof Wn?Wt(f):new Wn(f);if(p.g!="")l&&(p.g=l+"."+p.g),mi(p,p.s);else{var A=a.location;p=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;var x=new Wn(null);p&&pi(x,p),l&&(x.g=l),A&&mi(x,A),f&&(x.l=f),p=x}return f=u.D,l=u.ya,f&&l&&Ie(p,f,l),Ie(p,"VER",u.la),ms(u,p),p}function _l(u,l,f){if(l&&!u.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=u.Ca&&!u.pa?new Se(new _i({eb:f})):new Se(u.pa),l.Ha(u.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function yl(){}n=yl.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ii(){}Ii.prototype.g=function(u,l){return new pt(u,l)};function pt(u,l){X.call(this),this.g=new ol(l),this.l=u,this.h=l&&l.messageUrlParams||null,u=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(u?u["X-WebChannel-Content-Type"]=l.messageContentType:u={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(u?u["X-WebChannel-Client-Profile"]=l.va:u={"X-WebChannel-Client-Profile":l.va}),this.g.S=u,(u=l&&l.Sb)&&!K(u)&&(this.g.m=u),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!K(l)&&(this.g.D=l,u=this.h,u!==null&&l in u&&(u=this.h,l in u&&delete u[l])),this.j=new gr(this)}D(pt,X),pt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},pt.prototype.close=function(){to(this.g)},pt.prototype.o=function(u){var l=this.g;if(typeof u=="string"){var f={};f.__data__=u,u=f}else this.u&&(f={},f.__data__=$e(u),u=f);l.i.push(new a1(l.Ya++,u)),l.G==3&&vi(l)},pt.prototype.N=function(){this.g.l=null,delete this.j,to(this.g),delete this.g,pt.aa.N.call(this)};function bl(u){Hu.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var l=u.__sm__;if(l){e:{for(const f in l){u=f;break e}u=void 0}(this.i=u)&&(u=this.i,l=l!==null&&u in l?l[u]:void 0),this.data=l}else this.data=u}D(bl,Hu);function El(){Gu.call(this),this.status=1}D(El,Gu);function gr(u){this.g=u}D(gr,yl),gr.prototype.ua=function(){se(this.g,"a")},gr.prototype.ta=function(u){se(this.g,new bl(u))},gr.prototype.sa=function(u){se(this.g,new El)},gr.prototype.ra=function(){se(this.g,"b")},Ii.prototype.createWebChannel=Ii.prototype.g,pt.prototype.send=pt.prototype.o,pt.prototype.open=pt.prototype.m,pt.prototype.close=pt.prototype.close,h0=function(){return new Ii},l0=function(){return li()},c0=Hn,Xo={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},hi.NO_ERROR=0,hi.TIMEOUT=8,hi.HTTP_ERROR=6,Mi=hi,Oc.COMPLETE="complete",a0=Oc,Pc.EventType=ss,ss.OPEN="a",ss.CLOSE="b",ss.ERROR="c",ss.MESSAGE="d",X.prototype.listen=X.prototype.K,bs=Pc,Se.prototype.listenOnce=Se.prototype.L,Se.prototype.getLastError=Se.prototype.Ka,Se.prototype.getLastErrorCode=Se.prototype.Ba,Se.prototype.getStatus=Se.prototype.Z,Se.prototype.getResponseJson=Se.prototype.Oa,Se.prototype.getResponseText=Se.prototype.oa,Se.prototype.send=Se.prototype.ea,Se.prototype.setWithCredentials=Se.prototype.Ha,o0=Se}).apply(typeof xi<"u"?xi:typeof self<"u"?self:typeof window<"u"?window:{});const _h="@firebase/firestore",yh="4.9.1";/**
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
 */class Xe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Xe.UNAUTHENTICATED=new Xe(null),Xe.GOOGLE_CREDENTIALS=new Xe("google-credentials-uid"),Xe.FIRST_PARTY=new Xe("first-party-uid"),Xe.MOCK_USER=new Xe("mock-user");/**
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
 */let Qr="12.2.0";/**
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
 */const ar=new $a("@firebase/firestore");function Er(){return ar.logLevel}function G(n,...e){if(ar.logLevel<=oe.DEBUG){const t=e.map(Wa);ar.debug(`Firestore (${Qr}): ${n}`,...t)}}function sn(n,...e){if(ar.logLevel<=oe.ERROR){const t=e.map(Wa);ar.error(`Firestore (${Qr}): ${n}`,...t)}}function Ur(n,...e){if(ar.logLevel<=oe.WARN){const t=e.map(Wa);ar.warn(`Firestore (${Qr}): ${n}`,...t)}}function Wa(n){if(typeof n=="string")return n;try{/**
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
*/return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
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
 */function re(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,f0(n,r,t)}function f0(n,e,t){let r=`FIRESTORE (${Qr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw sn(r),new Error(r)}function Ce(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||f0(e,s,r)}function fe(n,e){return n}/**
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
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends cn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class xr{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
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
 */class d0{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Ny{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Xe.UNAUTHENTICATED)))}shutdown(){}}class Fy{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class ky{constructor(e){this.t=e,this.currentUser=Xe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Ce(this.o===void 0,42304);let r=this.i;const s=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve();let i=new xr;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new xr,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const c=i;e.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},a=c=>{G("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((c=>a(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(G("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new xr)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(G("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ce(typeof r.accessToken=="string",31837,{l:r}),new d0(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ce(e===null||typeof e=="string",2055,{h:e}),new Xe(e)}}class Vy{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Xe.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Oy{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Vy(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Xe.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class bh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class My{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,It(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Ce(this.o===void 0,3512);const r=i=>{i.error!=null&&G("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,G("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{G("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):G("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new bh(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Ce(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new bh(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Ly(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class p0{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Ly(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ae(n,e){return n<e?-1:n>e?1:0}function Zo(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Ao(s)===Ao(i)?ae(s,i):Ao(s)?1:-1}return ae(n.length,e.length)}const Uy=55296,By=57343;function Ao(n){const e=n.charCodeAt(0);return e>=Uy&&e<=By}function Br(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
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
 */const Eh="__name__";class Pt{constructor(e,t,r){t===void 0?t=0:t>e.length&&re(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&re(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Pt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Pt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Pt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ae(e.length,t.length)}static compareSegments(e,t){const r=Pt.isNumericId(e),s=Pt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Pt.extractNumericId(e).compare(Pt.extractNumericId(t)):Zo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Nn.fromString(e.substring(4,e.length-2))}}class we extends Pt{construct(e,t,r){return new we(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new we(t)}static emptyPath(){return new we([])}}const qy=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class tt extends Pt{construct(e,t,r){return new tt(e,t,r)}static isValidIdentifier(e){return qy.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),tt.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Eh}static keyField(){return new tt([Eh])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new W(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const a=e[s];if(a==="\\"){if(s+1===e.length)throw new W(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new W(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(r+=a,s++):(i(),s++)}if(i(),o)throw new W(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new tt(t)}static emptyPath(){return new tt([])}}/**
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
 */class Z{constructor(e){this.path=e}static fromPath(e){return new Z(we.fromString(e))}static fromName(e){return new Z(we.fromString(e).popFirst(5))}static empty(){return new Z(we.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&we.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return we.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Z(new we(e.slice()))}}function jy(n,e,t,r){if(e===!0&&r===!0)throw new W(M.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function vh(n){if(Z.isDocumentKey(n))throw new W(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function m0(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function xu(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":re(12329,{type:typeof n})}function Li(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new W(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=xu(n);throw new W(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function Ne(n,e){const t={typeString:n};return e&&(t.value=e),t}function ti(n,e){if(!m0(n))throw new W(M.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new W(M.INVALID_ARGUMENT,t);return!0}/**
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
 */const Th=-62135596800,Ih=1e6;class Ae{static now(){return Ae.fromMillis(Date.now())}static fromDate(e){return Ae.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Ih);return new Ae(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new W(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new W(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Th)throw new W(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ih}_compareTo(e){return this.seconds===e.seconds?ae(this.nanoseconds,e.nanoseconds):ae(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ae._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ti(e,Ae._jsonSchema))return new Ae(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Th;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ae._jsonSchemaVersion="firestore/timestamp/1.0",Ae._jsonSchema={type:Ne("string",Ae._jsonSchemaVersion),seconds:Ne("number"),nanoseconds:Ne("number")};/**
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
 */class ne{static fromTimestamp(e){return new ne(e)}static min(){return new ne(new Ae(0,0))}static max(){return new ne(new Ae(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Hs=-1;function zy(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=ne.fromTimestamp(r===1e9?new Ae(t+1,0):new Ae(t,r));return new Vn(s,Z.empty(),e)}function $y(n){return new Vn(n.readTime,n.key,Hs)}class Vn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Vn(ne.min(),Z.empty(),Hs)}static max(){return new Vn(ne.max(),Z.empty(),Hs)}}function Hy(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=Z.comparator(n.documentKey,e.documentKey),t!==0?t:ae(n.largestBatchId,e.largestBatchId))}/**
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
 */const Gy="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Wy{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
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
 */async function Ru(n){if(n.code!==M.FAILED_PRECONDITION||n.message!==Gy)throw n;G("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&re(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):P.reject(t)}static resolve(e){return new P(((t,r)=>{t(e)}))}static reject(e){return new P(((t,r)=>{r(e)}))}static waitFor(e){return new P(((t,r)=>{let s=0,i=0,o=!1;e.forEach((a=>{++s,a.next((()=>{++i,o&&i===s&&t()}),(c=>r(c)))})),o=!0,i===s&&t()}))}static or(e){let t=P.resolve(!1);for(const r of e)t=t.next((s=>s?P.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new P(((r,s)=>{const i=e.length,o=new Array(i);let a=0;for(let c=0;c<i;c++){const h=c;t(e[h]).next((d=>{o[h]=d,++a,a===i&&r(o)}),(d=>s(d)))}}))}static doWhile(e,t){return new P(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function Ky(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Jr(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Du{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Du.ce=-1;/**
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
 */const Qy=-1;function Pu(n){return n==null}function nu(n){return n===0&&1/n==-1/0}function Jy(n){return typeof n=="number"&&Number.isInteger(n)&&!nu(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const g0="";function Yy(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=wh(e)),e=Xy(n.get(t),e);return wh(e)}function Xy(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case g0:t+="";break;default:t+=i}}return t}function wh(n){return n+g0+""}/**
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
 */function Ah(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Yr(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function _0(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Re{constructor(e,t){this.comparator=e,this.root=t||Ge.EMPTY}insert(e,t){return new Re(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ge.BLACK,null,null))}remove(e){return new Re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ge.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ri(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ri(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ri(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ri(this.root,e,this.comparator,!0)}}class Ri{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ge{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Ge.RED,this.left=s??Ge.EMPTY,this.right=i??Ge.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Ge(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ge.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ge.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ge.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ge.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw re(43730,{key:this.key,value:this.value});if(this.right.isRed())throw re(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw re(27949);return e+(this.isRed()?0:1)}}Ge.EMPTY=null,Ge.RED=!0,Ge.BLACK=!1;Ge.EMPTY=new class{constructor(){this.size=0}get key(){throw re(57766)}get value(){throw re(16141)}get color(){throw re(16727)}get left(){throw re(29726)}get right(){throw re(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Ge(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Oe{constructor(e){this.comparator=e,this.data=new Re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ch(this.data.getIterator())}getIteratorFrom(e){return new Ch(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof Oe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Oe(this.comparator);return t.data=e,t}}class Ch{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Sn{constructor(e){this.fields=e,e.sort(tt.comparator)}static empty(){return new Sn([])}unionWith(e){let t=new Oe(tt.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Sn(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Br(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
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
 */class y0 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class We{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new y0("Invalid base64 string: "+i):i}})(e);return new We(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new We(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ae(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}We.EMPTY_BYTE_STRING=new We("");const Zy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function On(n){if(Ce(!!n,39018),typeof n=="string"){let e=0;const t=Zy.exec(n);if(Ce(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:xe(n.seconds),nanos:xe(n.nanos)}}function xe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Mn(n){return typeof n=="string"?We.fromBase64String(n):We.fromUint8Array(n)}/**
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
 */const b0="server_timestamp",E0="__type__",v0="__previous_value__",T0="__local_write_time__";function Ka(n){return(n?.mapValue?.fields||{})[E0]?.stringValue===b0}function Nu(n){const e=n.mapValue.fields[v0];return Ka(e)?Nu(e):e}function Gs(n){const e=On(n.mapValue.fields[T0].timestampValue);return new Ae(e.seconds,e.nanos)}/**
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
 */class eb{constructor(e,t,r,s,i,o,a,c,h,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=d}}const ru="(default)";class Ws{constructor(e,t){this.projectId=e,this.database=t||ru}static empty(){return new Ws("","")}get isDefaultDatabase(){return this.database===ru}isEqual(e){return e instanceof Ws&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const I0="__type__",tb="__max__",Di={mapValue:{}},w0="__vector__",su="value";function Ln(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ka(n)?4:rb(n)?9007199254740991:nb(n)?10:11:re(28295,{value:n})}function $t(n,e){if(n===e)return!0;const t=Ln(n);if(t!==Ln(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Gs(n).isEqual(Gs(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=On(s.timestampValue),a=On(i.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return Mn(s.bytesValue).isEqual(Mn(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return xe(s.geoPointValue.latitude)===xe(i.geoPointValue.latitude)&&xe(s.geoPointValue.longitude)===xe(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return xe(s.integerValue)===xe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=xe(s.doubleValue),a=xe(i.doubleValue);return o===a?nu(o)===nu(a):isNaN(o)&&isNaN(a)}return!1})(n,e);case 9:return Br(n.arrayValue.values||[],e.arrayValue.values||[],$t);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},a=i.mapValue.fields||{};if(Ah(o)!==Ah(a))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!$t(o[c],a[c])))return!1;return!0})(n,e);default:return re(52216,{left:n})}}function Ks(n,e){return(n.values||[]).find((t=>$t(t,e)))!==void 0}function qr(n,e){if(n===e)return 0;const t=Ln(n),r=Ln(e);if(t!==r)return ae(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ae(n.booleanValue,e.booleanValue);case 2:return(function(i,o){const a=xe(i.integerValue||i.doubleValue),c=xe(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1})(n,e);case 3:return Sh(n.timestampValue,e.timestampValue);case 4:return Sh(Gs(n),Gs(e));case 5:return Zo(n.stringValue,e.stringValue);case 6:return(function(i,o){const a=Mn(i),c=Mn(o);return a.compareTo(c)})(n.bytesValue,e.bytesValue);case 7:return(function(i,o){const a=i.split("/"),c=o.split("/");for(let h=0;h<a.length&&h<c.length;h++){const d=ae(a[h],c[h]);if(d!==0)return d}return ae(a.length,c.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,o){const a=ae(xe(i.latitude),xe(o.latitude));return a!==0?a:ae(xe(i.longitude),xe(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return xh(n.arrayValue,e.arrayValue);case 10:return(function(i,o){const a=i.fields||{},c=o.fields||{},h=a[su]?.arrayValue,d=c[su]?.arrayValue,m=ae(h?.values?.length||0,d?.values?.length||0);return m!==0?m:xh(h,d)})(n.mapValue,e.mapValue);case 11:return(function(i,o){if(i===Di.mapValue&&o===Di.mapValue)return 0;if(i===Di.mapValue)return 1;if(o===Di.mapValue)return-1;const a=i.fields||{},c=Object.keys(a),h=o.fields||{},d=Object.keys(h);c.sort(),d.sort();for(let m=0;m<c.length&&m<d.length;++m){const _=Zo(c[m],d[m]);if(_!==0)return _;const S=qr(a[c[m]],h[d[m]]);if(S!==0)return S}return ae(c.length,d.length)})(n.mapValue,e.mapValue);default:throw re(23264,{he:t})}}function Sh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ae(n,e);const t=On(n),r=On(e),s=ae(t.seconds,r.seconds);return s!==0?s:ae(t.nanos,r.nanos)}function xh(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=qr(t[s],r[s]);if(i)return i}return ae(t.length,r.length)}function jr(n){return ea(n)}function ea(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=On(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Mn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return Z.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ea(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${ea(t.fields[o])}`;return s+"}"})(n.mapValue):re(61005,{value:n})}function Ui(n){switch(Ln(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Nu(n);return e?16+Ui(e):16;case 5:return 2*n.stringValue.length;case 6:return Mn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Ui(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return Yr(r.fields,((i,o)=>{s+=i.length+Ui(o)})),s})(n.mapValue);default:throw re(13486,{value:n})}}function Rh(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ta(n){return!!n&&"integerValue"in n}function Qa(n){return!!n&&"arrayValue"in n}function Dh(n){return!!n&&"nullValue"in n}function Ph(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Co(n){return!!n&&"mapValue"in n}function nb(n){return(n?.mapValue?.fields||{})[I0]?.stringValue===w0}function Fs(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Yr(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Fs(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Fs(n.arrayValue.values[t]);return e}return{...n}}function rb(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===tb}/**
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
 */class Ft{constructor(e){this.value=e}static empty(){return new Ft({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Co(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Fs(t)}setAll(e){let t=tt.emptyPath(),r={},s=[];e.forEach(((o,a)=>{if(!t.isImmediateParentOf(a)){const c=this.getFieldsMap(t);this.applyChanges(c,r,s),r={},s=[],t=a.popLast()}o?r[a.lastSegment()]=Fs(o):s.push(a.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Co(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return $t(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Co(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Yr(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new Ft(Fs(this.value))}}/**
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
 */class et{constructor(e,t,r,s,i,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new et(e,0,ne.min(),ne.min(),ne.min(),Ft.empty(),0)}static newFoundDocument(e,t,r,s){return new et(e,1,t,ne.min(),r,s,0)}static newNoDocument(e,t){return new et(e,2,t,ne.min(),ne.min(),Ft.empty(),0)}static newUnknownDocument(e,t){return new et(e,3,t,ne.min(),ne.min(),Ft.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ne.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ft.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ft.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ne.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof et&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new et(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class iu{constructor(e,t){this.position=e,this.inclusive=t}}function Nh(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=Z.comparator(Z.fromName(o.referenceValue),t.key):r=qr(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Fh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!$t(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Qs{constructor(e,t="asc"){this.field=e,this.dir=t}}function sb(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class A0{}class Pe extends A0{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new ub(e,t,r):t==="array-contains"?new cb(e,r):t==="in"?new lb(e,r):t==="not-in"?new hb(e,r):t==="array-contains-any"?new fb(e,r):new Pe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new ob(e,r):new ab(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(qr(t,this.value)):t!==null&&Ln(this.value)===Ln(t)&&this.matchesComparison(qr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return re(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class St extends A0{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new St(e,t)}matches(e){return C0(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function C0(n){return n.op==="and"}function S0(n){return ib(n)&&C0(n)}function ib(n){for(const e of n.filters)if(e instanceof St)return!1;return!0}function na(n){if(n instanceof Pe)return n.field.canonicalString()+n.op.toString()+jr(n.value);if(S0(n))return n.filters.map((e=>na(e))).join(",");{const e=n.filters.map((t=>na(t))).join(",");return`${n.op}(${e})`}}function x0(n,e){return n instanceof Pe?(function(r,s){return s instanceof Pe&&r.op===s.op&&r.field.isEqual(s.field)&&$t(r.value,s.value)})(n,e):n instanceof St?(function(r,s){return s instanceof St&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,a)=>i&&x0(o,s.filters[a])),!0):!1})(n,e):void re(19439)}function R0(n){return n instanceof Pe?(function(t){return`${t.field.canonicalString()} ${t.op} ${jr(t.value)}`})(n):n instanceof St?(function(t){return t.op.toString()+" {"+t.getFilters().map(R0).join(" ,")+"}"})(n):"Filter"}class ub extends Pe{constructor(e,t,r){super(e,t,r),this.key=Z.fromName(r.referenceValue)}matches(e){const t=Z.comparator(e.key,this.key);return this.matchesComparison(t)}}class ob extends Pe{constructor(e,t){super(e,"in",t),this.keys=D0("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class ab extends Pe{constructor(e,t){super(e,"not-in",t),this.keys=D0("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function D0(n,e){return(e.arrayValue?.values||[]).map((t=>Z.fromName(t.referenceValue)))}class cb extends Pe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Qa(t)&&Ks(t.arrayValue,this.value)}}class lb extends Pe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ks(this.value.arrayValue,t)}}class hb extends Pe{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ks(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ks(this.value.arrayValue,t)}}class fb extends Pe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Qa(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Ks(this.value.arrayValue,r)))}}/**
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
 */class db{constructor(e,t=null,r=[],s=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.Te=null}}function kh(n,e=null,t=[],r=[],s=null,i=null,o=null){return new db(n,e,t,r,s,i,o)}function Ja(n){const e=fe(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>na(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Pu(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>jr(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>jr(r))).join(",")),e.Te=t}return e.Te}function Ya(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!sb(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!x0(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Fh(n.startAt,e.startAt)&&Fh(n.endAt,e.endAt)}function ra(n){return Z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class Xr{constructor(e,t=null,r=[],s=[],i=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function pb(n,e,t,r,s,i,o,a){return new Xr(n,e,t,r,s,i,o,a)}function Xa(n){return new Xr(n)}function Vh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function P0(n){return n.collectionGroup!==null}function ks(n){const e=fe(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new Oe(tt.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((h=>{h.isInequality()&&(a=a.add(h.field))}))})),a})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Qs(i,r))})),t.has(tt.keyField().canonicalString())||e.Ie.push(new Qs(tt.keyField(),r))}return e.Ie}function Lt(n){const e=fe(n);return e.Ee||(e.Ee=mb(e,ks(n))),e.Ee}function mb(n,e){if(n.limitType==="F")return kh(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Qs(s.field,i)}));const t=n.endAt?new iu(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new iu(n.startAt.position,n.startAt.inclusive):null;return kh(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function sa(n,e){const t=n.filters.concat([e]);return new Xr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ia(n,e,t){return new Xr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Fu(n,e){return Ya(Lt(n),Lt(e))&&n.limitType===e.limitType}function N0(n){return`${Ja(Lt(n))}|lt:${n.limitType}`}function vr(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>R0(s))).join(", ")}]`),Pu(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>jr(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>jr(s))).join(",")),`Target(${r})`})(Lt(n))}; limitType=${n.limitType})`}function ku(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):Z.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of ks(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(o,a,c){const h=Nh(o,a,c);return o.inclusive?h<=0:h<0})(r.startAt,ks(r),s)||r.endAt&&!(function(o,a,c){const h=Nh(o,a,c);return o.inclusive?h>=0:h>0})(r.endAt,ks(r),s))})(n,e)}function gb(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function F0(n){return(e,t)=>{let r=!1;for(const s of ks(n)){const i=_b(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function _b(n,e,t){const r=n.field.isKeyField()?Z.comparator(e.key,t.key):(function(i,o,a){const c=o.data.field(i),h=a.data.field(i);return c!==null&&h!==null?qr(c,h):re(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return re(19790,{direction:n.dir})}}/**
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
 */class hr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Yr(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return _0(this.inner)}size(){return this.innerSize}}/**
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
 */const yb=new Re(Z.comparator);function Un(){return yb}const k0=new Re(Z.comparator);function Es(...n){let e=k0;for(const t of n)e=e.insert(t.key,t);return e}function bb(n){let e=k0;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function Zn(){return Vs()}function V0(){return Vs()}function Vs(){return new hr((n=>n.toString()),((n,e)=>n.isEqual(e)))}const Eb=new Oe(Z.comparator);function de(...n){let e=Eb;for(const t of n)e=e.add(t);return e}const vb=new Oe(ae);function Tb(){return vb}/**
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
 */function Za(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:nu(e)?"-0":e}}function O0(n){return{integerValue:""+n}}function Ib(n,e){return Jy(e)?O0(e):Za(n,e)}/**
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
 */class Vu{constructor(){this._=void 0}}function wb(n,e,t){return n instanceof ua?(function(s,i){const o={fields:{[E0]:{stringValue:b0},[T0]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ka(i)&&(i=Nu(i)),i&&(o.fields[v0]=i),{mapValue:o}})(t,e):n instanceof uu?M0(n,e):n instanceof ou?L0(n,e):(function(s,i){const o=Cb(s,i),a=Oh(o)+Oh(s.Ae);return ta(o)&&ta(s.Ae)?O0(a):Za(s.serializer,a)})(n,e)}function Ab(n,e,t){return n instanceof uu?M0(n,e):n instanceof ou?L0(n,e):t}function Cb(n,e){return n instanceof oa?(function(r){return ta(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class ua extends Vu{}class uu extends Vu{constructor(e){super(),this.elements=e}}function M0(n,e){const t=U0(e);for(const r of n.elements)t.some((s=>$t(s,r)))||t.push(r);return{arrayValue:{values:t}}}class ou extends Vu{constructor(e){super(),this.elements=e}}function L0(n,e){let t=U0(e);for(const r of n.elements)t=t.filter((s=>!$t(s,r)));return{arrayValue:{values:t}}}class oa extends Vu{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Oh(n){return xe(n.integerValue||n.doubleValue)}function U0(n){return Qa(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Sb(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof uu&&s instanceof uu||r instanceof ou&&s instanceof ou?Br(r.elements,s.elements,$t):r instanceof oa&&s instanceof oa?$t(r.Ae,s.Ae):r instanceof ua&&s instanceof ua})(n.transform,e.transform)}class rr{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new rr}static exists(e){return new rr(void 0,e)}static updateTime(e){return new rr(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Bi(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class ec{}function B0(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Rb(n.key,rr.none()):new tc(n.key,n.data,rr.none());{const t=n.data,r=Ft.empty();let s=new Oe(tt.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Ou(n.key,r,new Sn(s.toArray()),rr.none())}}function xb(n,e,t){n instanceof tc?(function(s,i,o){const a=s.value.clone(),c=Lh(s.fieldTransforms,i,o.transformResults);a.setAll(c),i.convertToFoundDocument(o.version,a).setHasCommittedMutations()})(n,e,t):n instanceof Ou?(function(s,i,o){if(!Bi(s.precondition,i))return void i.convertToUnknownDocument(o.version);const a=Lh(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(q0(s)),c.setAll(a),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Os(n,e,t,r){return n instanceof tc?(function(i,o,a,c){if(!Bi(i.precondition,o))return a;const h=i.value.clone(),d=Uh(i.fieldTransforms,c,o);return h.setAll(d),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(n,e,t,r):n instanceof Ou?(function(i,o,a,c){if(!Bi(i.precondition,o))return a;const h=Uh(i.fieldTransforms,c,o),d=o.data;return d.setAll(q0(i)),d.setAll(h),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),a===null?null:a.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(n,e,t,r):(function(i,o,a){return Bi(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a})(n,e,t)}function Mh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Br(r,s,((i,o)=>Sb(i,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class tc extends ec{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ou extends ec{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function q0(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function Lh(n,e,t){const r=new Map;Ce(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,Ab(o,a,t[s]))}return r}function Uh(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,wb(i,o,e))}return r}class Rb extends ec{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Db{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&xb(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Os(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Os(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=V0();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=t.has(s.key)?null:a;const c=B0(o,a);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(ne.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),de())}isEqual(e){return this.batchId===e.batchId&&Br(this.mutations,e.mutations,((t,r)=>Mh(t,r)))&&Br(this.baseMutations,e.baseMutations,((t,r)=>Mh(t,r)))}}/**
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
 */class Pb{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class Nb{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var De,he;function j0(n){if(n===void 0)return sn("GRPC error has no .code"),M.UNKNOWN;switch(n){case De.OK:return M.OK;case De.CANCELLED:return M.CANCELLED;case De.UNKNOWN:return M.UNKNOWN;case De.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case De.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case De.INTERNAL:return M.INTERNAL;case De.UNAVAILABLE:return M.UNAVAILABLE;case De.UNAUTHENTICATED:return M.UNAUTHENTICATED;case De.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case De.NOT_FOUND:return M.NOT_FOUND;case De.ALREADY_EXISTS:return M.ALREADY_EXISTS;case De.PERMISSION_DENIED:return M.PERMISSION_DENIED;case De.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case De.ABORTED:return M.ABORTED;case De.OUT_OF_RANGE:return M.OUT_OF_RANGE;case De.UNIMPLEMENTED:return M.UNIMPLEMENTED;case De.DATA_LOSS:return M.DATA_LOSS;default:return re(39323,{code:n})}}(he=De||(De={}))[he.OK=0]="OK",he[he.CANCELLED=1]="CANCELLED",he[he.UNKNOWN=2]="UNKNOWN",he[he.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",he[he.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",he[he.NOT_FOUND=5]="NOT_FOUND",he[he.ALREADY_EXISTS=6]="ALREADY_EXISTS",he[he.PERMISSION_DENIED=7]="PERMISSION_DENIED",he[he.UNAUTHENTICATED=16]="UNAUTHENTICATED",he[he.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",he[he.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",he[he.ABORTED=10]="ABORTED",he[he.OUT_OF_RANGE=11]="OUT_OF_RANGE",he[he.UNIMPLEMENTED=12]="UNIMPLEMENTED",he[he.INTERNAL=13]="INTERNAL",he[he.UNAVAILABLE=14]="UNAVAILABLE",he[he.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function Fb(){return new TextEncoder}/**
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
 */const kb=new Nn([4294967295,4294967295],0);function Bh(n){const e=Fb().encode(n),t=new u0;return t.update(e),new Uint8Array(t.digest())}function qh(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Nn([t,r],0),new Nn([s,i],0)]}class nc{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new vs(`Invalid padding: ${t}`);if(r<0)throw new vs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new vs(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new vs(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Nn.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(Nn.fromNumber(r)));return s.compare(kb)===1&&(s=new Nn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Bh(e),[r,s]=qh(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new nc(i,s,t);return r.forEach((a=>o.insert(a))),o}insert(e){if(this.ge===0)return;const t=Bh(e),[r,s]=qh(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class vs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Mu{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,ni.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Mu(ne.min(),s,new Re(ae),Un(),de())}}class ni{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new ni(r,t,de(),de(),de())}}/**
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
 */class qi{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class z0{constructor(e,t){this.targetId=e,this.Ce=t}}class $0{constructor(e,t,r=We.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class jh{constructor(){this.ve=0,this.Fe=zh(),this.Me=We.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=de(),t=de(),r=de();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:re(38017,{changeType:i})}})),new ni(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=zh()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,Ce(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Vb{constructor(e){this.Ge=e,this.ze=new Map,this.je=Un(),this.Je=Pi(),this.He=Pi(),this.Ye=new Re(ae)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:re(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(ra(i))if(r===0){const o=new Z(i.path);this.et(t,o,et.newNoDocument(o,ne.min()))}else Ce(r===1,20013,{expectedCount:r});else{const o=this._t(t);if(o!==r){const a=this.ut(e),c=a?this.ct(a,e,o):1;if(c!==0){this.it(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,a;try{o=Mn(r).toUint8Array()}catch(c){if(c instanceof y0)return Ur("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{a=new nc(o,s,i)}catch(c){return Ur(c instanceof vs?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return a.ge===0?null:a}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const o=this.Ge.ht(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(a)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,o)=>{const a=this.ot(o);if(a){if(i.current&&ra(a.target)){const c=new Z(a.target.path);this.It(c).has(o)||this.Et(o,c)||this.et(o,c,et.newNoDocument(c,e))}i.Be&&(t.set(o,i.ke()),i.qe())}}));let r=de();this.He.forEach(((i,o)=>{let a=!0;o.forEachWhile((c=>{const h=this.ot(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)})),a&&(r=r.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new Mu(e,t,this.Ye,this.je,r);return this.je=Un(),this.Je=Pi(),this.He=Pi(),this.Ye=new Re(ae),s}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new jh,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new Oe(ae),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new Oe(ae),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||G("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new jh),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Pi(){return new Re(Z.comparator)}function zh(){return new Re(Z.comparator)}const Ob={asc:"ASCENDING",desc:"DESCENDING"},Mb={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Lb={and:"AND",or:"OR"};class Ub{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function aa(n,e){return n.useProto3Json||Pu(e)?e:{value:e}}function ca(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function H0(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Rr(n){return Ce(!!n,49232),ne.fromTimestamp((function(t){const r=On(t);return new Ae(r.seconds,r.nanos)})(n))}function G0(n,e){return la(n,e).canonicalString()}function la(n,e){const t=(function(s){return new we(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function W0(n){const e=we.fromString(n);return Ce(X0(e),10190,{key:e.toString()}),e}function So(n,e){const t=W0(e);if(t.get(1)!==n.databaseId.projectId)throw new W(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new W(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new Z(Q0(t))}function K0(n,e){return G0(n.databaseId,e)}function Bb(n){const e=W0(n);return e.length===4?we.emptyPath():Q0(e)}function $h(n){return new we(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Q0(n){return Ce(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function qb(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:re(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,d){return h.useProto3Json?(Ce(d===void 0||typeof d=="string",58123),We.fromBase64String(d||"")):(Ce(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),We.fromUint8Array(d||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&(function(h){const d=h.code===void 0?M.UNKNOWN:j0(h.code);return new W(d,h.message||"")})(o);t=new $0(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=So(n,r.document.name),i=Rr(r.document.updateTime),o=r.document.createTime?Rr(r.document.createTime):ne.min(),a=new Ft({mapValue:{fields:r.document.fields}}),c=et.newFoundDocument(s,i,o,a),h=r.targetIds||[],d=r.removedTargetIds||[];t=new qi(h,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=So(n,r.document),i=r.readTime?Rr(r.readTime):ne.min(),o=et.newNoDocument(s,i),a=r.removedTargetIds||[];t=new qi([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=So(n,r.document),i=r.removedTargetIds||[];t=new qi([],i,s,null)}else{if(!("filter"in e))return re(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new Nb(s,i),a=r.targetId;t=new z0(a,o)}}return t}function jb(n,e){return{documents:[K0(n,e.path)]}}function zb(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=K0(n,s);const i=(function(h){if(h.length!==0)return Y0(St.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((d=>(function(_){return{field:Tr(_.field),direction:Gb(_.dir)}})(d)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const a=aa(n,e.limit);return a!==null&&(t.structuredQuery.limit=a),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:t,parent:s}}function $b(n){let e=Bb(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){Ce(r===1,65062);const d=t.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];t.where&&(i=(function(m){const _=J0(m);return _ instanceof St&&S0(_)?_.getFilters():[_]})(t.where));let o=[];t.orderBy&&(o=(function(m){return m.map((_=>(function(D){return new Qs(Ir(D.field),(function(q){switch(q){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(D.direction))})(_)))})(t.orderBy));let a=null;t.limit&&(a=(function(m){let _;return _=typeof m=="object"?m.value:m,Pu(_)?null:_})(t.limit));let c=null;t.startAt&&(c=(function(m){const _=!!m.before,S=m.values||[];return new iu(S,_)})(t.startAt));let h=null;return t.endAt&&(h=(function(m){const _=!m.before,S=m.values||[];return new iu(S,_)})(t.endAt)),pb(e,s,o,i,a,"F",c,h)}function Hb(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return re(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function J0(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Ir(t.unaryFilter.field);return Pe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Ir(t.unaryFilter.field);return Pe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Ir(t.unaryFilter.field);return Pe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Ir(t.unaryFilter.field);return Pe.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return re(61313);default:return re(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Pe.create(Ir(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return re(58110);default:return re(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return St.create(t.compositeFilter.filters.map((r=>J0(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return re(1026)}})(t.compositeFilter.op))})(n):re(30097,{filter:n})}function Gb(n){return Ob[n]}function Wb(n){return Mb[n]}function Kb(n){return Lb[n]}function Tr(n){return{fieldPath:n.canonicalString()}}function Ir(n){return tt.fromServerFormat(n.fieldPath)}function Y0(n){return n instanceof Pe?(function(t){if(t.op==="=="){if(Ph(t.value))return{unaryFilter:{field:Tr(t.field),op:"IS_NAN"}};if(Dh(t.value))return{unaryFilter:{field:Tr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Ph(t.value))return{unaryFilter:{field:Tr(t.field),op:"IS_NOT_NAN"}};if(Dh(t.value))return{unaryFilter:{field:Tr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Tr(t.field),op:Wb(t.op),value:t.value}}})(n):n instanceof St?(function(t){const r=t.getFilters().map((s=>Y0(s)));return r.length===1?r[0]:{compositeFilter:{op:Kb(t.op),filters:r}}})(n):re(54877,{filter:n})}function X0(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class xn{constructor(e,t,r,s,i=ne.min(),o=ne.min(),a=We.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new xn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new xn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new xn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new xn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Qb{constructor(e){this.yt=e}}function Jb(n){const e=$b({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ia(e,e.limit,"L"):e}/**
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
 */class Yb{constructor(){this.Cn=new Xb}addToCollectionParentIndex(e,t){return this.Cn.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(Vn.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(Vn.min())}updateCollectionGroup(e,t,r){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class Xb{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Oe(we.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Oe(we.comparator)).toArray()}}/**
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
 */const Hh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Z0=41943040;class ft{static withCacheSize(e){return new ft(e,ft.DEFAULT_COLLECTION_PERCENTILE,ft.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */ft.DEFAULT_COLLECTION_PERCENTILE=10,ft.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ft.DEFAULT=new ft(Z0,ft.DEFAULT_COLLECTION_PERCENTILE,ft.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ft.DISABLED=new ft(-1,0,0);/**
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
 */class zr{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new zr(0)}static cr(){return new zr(-1)}}/**
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
 */const Gh="LruGarbageCollector",Zb=1048576;function Wh([n,e],[t,r]){const s=ae(n,t);return s===0?ae(e,r):s}class e3{constructor(e){this.Ir=e,this.buffer=new Oe(Wh),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Wh(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class t3{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){G(Gh,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Jr(t)?G(Gh,"Ignoring IndexedDB error during garbage collection: ",t):await Ru(t)}await this.Vr(3e5)}))}}class n3{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return P.resolve(Du.ce);const r=new e3(t);return this.mr.forEachTarget(e,(s=>r.Ar(s.sequenceNumber))).next((()=>this.mr.pr(e,(s=>r.Ar(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(G("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Hh)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(G("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Hh):this.yr(e,t)))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,s,i,o,a,c,h;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(G("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(e,s)))).next((m=>(r=m,a=Date.now(),this.removeTargets(e,r,t)))).next((m=>(i=m,c=Date.now(),this.removeOrphanedDocuments(e,r)))).next((m=>(h=Date.now(),Er()<=oe.DEBUG&&G("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(a-o)+`ms
	Removed ${i} targets in `+(c-a)+`ms
	Removed ${m} documents in `+(h-c)+`ms
Total Duration: ${h-d}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function r3(n,e){return new n3(n,e)}/**
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
 */class s3{constructor(){this.changes=new hr((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,et.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?P.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class i3{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class u3{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Os(r.mutation,s,Sn.empty(),Ae.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,de()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=de()){const s=Zn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let o=Es();return i.forEach(((a,c)=>{o=o.insert(a,c.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=Zn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,de())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,a)=>{t.set(o,a)}))}))}computeViews(e,t,r,s){let i=Un();const o=Vs(),a=(function(){return Vs()})();return t.forEach(((c,h)=>{const d=r.get(h.key);s.has(h.key)&&(d===void 0||d.mutation instanceof Ou)?i=i.insert(h.key,h):d!==void 0?(o.set(h.key,d.mutation.getFieldMask()),Os(d.mutation,h,d.mutation.getFieldMask(),Ae.now())):o.set(h.key,Sn.empty())})),this.recalculateAndSaveOverlays(e,i).next((c=>(c.forEach(((h,d)=>o.set(h,d))),t.forEach(((h,d)=>a.set(h,new i3(d,o.get(h)??null)))),a)))}recalculateAndSaveOverlays(e,t){const r=Vs();let s=new Re(((o,a)=>o-a)),i=de();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const a of o)a.keys().forEach((c=>{const h=t.get(c);if(h===null)return;let d=r.get(c)||Sn.empty();d=a.applyToLocalView(h,d),r.set(c,d);const m=(s.get(a.batchId)||de()).add(c);s=s.insert(a.batchId,m)}))})).next((()=>{const o=[],a=s.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),h=c.key,d=c.value,m=V0();d.forEach((_=>{if(!i.has(_)){const S=B0(t.get(_),r.get(_));S!==null&&m.set(_,S),i=i.add(_)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return P.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return(function(o){return Z.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):P0(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):P.resolve(Zn());let a=Hs,c=i;return o.next((h=>P.forEach(h,((d,m)=>(a<m.largestBatchId&&(a=m.largestBatchId),i.get(d)?P.resolve():this.remoteDocumentCache.getEntry(e,d).next((_=>{c=c.insert(d,_)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,c,h,de()))).next((d=>({batchId:a,changes:bb(d)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Z(t)).next((r=>{let s=Es();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=Es();return this.indexManager.getCollectionParents(e,i).next((a=>P.forEach(a,(c=>{const h=(function(m,_){return new Xr(_,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(t,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((d=>{d.forEach(((m,_)=>{o=o.insert(m,_)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((o=>{i.forEach(((c,h)=>{const d=h.getKey();o.get(d)===null&&(o=o.insert(d,et.newInvalidDocument(d)))}));let a=Es();return o.forEach(((c,h)=>{const d=i.get(c);d!==void 0&&Os(d.mutation,h,Sn.empty(),Ae.now()),ku(t,h)&&(a=a.insert(c,h))})),a}))}}/**
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
 */class o3{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return P.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Rr(s.createTime)}})(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,(function(s){return{name:s.name,query:Jb(s.bundledQuery),readTime:Rr(s.readTime)}})(t)),P.resolve()}}/**
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
 */class a3{constructor(){this.overlays=new Re(Z.comparator),this.qr=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Zn();return P.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.St(e,t,i)})),P.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(r)),P.resolve()}getOverlaysForCollection(e,t,r){const s=Zn(),i=t.length+1,o=new Z(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return P.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Re(((h,d)=>h-d));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let d=i.get(h.largestBatchId);d===null&&(d=Zn(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const a=Zn(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((h,d)=>a.set(h,d))),!(a.size()>=s)););return P.resolve(a)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Pb(t,r));let i=this.qr.get(t);i===void 0&&(i=de(),this.qr.set(t,i)),this.qr.set(t,i.add(r.key))}}/**
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
 */class c3{constructor(){this.sessionToken=We.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
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
 */class rc{constructor(){this.Qr=new Oe(Le.$r),this.Ur=new Oe(Le.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new Le(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Gr(new Le(e,t))}zr(e,t){e.forEach((r=>this.removeReference(r,t)))}jr(e){const t=new Z(new we([])),r=new Le(t,e),s=new Le(t,e+1),i=[];return this.Ur.forEachInRange([r,s],(o=>{this.Gr(o),i.push(o.key)})),i}Jr(){this.Qr.forEach((e=>this.Gr(e)))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new Z(new we([])),r=new Le(t,e),s=new Le(t,e+1);let i=de();return this.Ur.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new Le(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Le{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return Z.comparator(e.key,t.key)||ae(e.Yr,t.Yr)}static Kr(e,t){return ae(e.Yr,t.Yr)||Z.comparator(e.key,t.key)}}/**
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
 */class l3{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new Oe(Le.$r)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Db(i,t,r,s);this.mutationQueue.push(o);for(const a of s)this.Zr=this.Zr.add(new Le(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return P.resolve(o)}lookupMutationBatch(e,t){return P.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.ei(r),i=s<0?0:s;return P.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?Qy:this.tr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Le(t,0),s=new Le(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],(o=>{const a=this.Xr(o.Yr);i.push(a)})),P.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Oe(ae);return t.forEach((s=>{const i=new Le(s,0),o=new Le(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,o],(a=>{r=r.add(a.Yr)}))})),P.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;Z.isDocumentKey(i)||(i=i.child(""));const o=new Le(new Z(i),0);let a=new Oe(ae);return this.Zr.forEachWhile((c=>{const h=c.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(a=a.add(c.Yr)),!0)}),o),P.resolve(this.ti(a))}ti(e){const t=[];return e.forEach((r=>{const s=this.Xr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){Ce(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return P.forEach(t.mutations,(s=>{const i=new Le(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Zr=r}))}ir(e){}containsKey(e,t){const r=new Le(t,0),s=this.Zr.firstAfterOrEqual(r);return P.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class h3{constructor(e){this.ri=e,this.docs=(function(){return new Re(Z.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return P.resolve(r?r.document.mutableCopy():et.newInvalidDocument(t))}getEntries(e,t){let r=Un();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():et.newInvalidDocument(s))})),P.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Un();const o=t.path,a=new Z(o.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:h,value:{document:d}}=c.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Hy($y(d),r)<=0||(s.has(d.key)||ku(t,d))&&(i=i.insert(d.key,d.mutableCopy()))}return P.resolve(i)}getAllFromCollectionGroup(e,t,r,s){re(9500)}ii(e,t){return P.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new f3(this)}getSize(e){return P.resolve(this.size)}}class f3 extends s3{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)})),P.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
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
 */class d3{constructor(e){this.persistence=e,this.si=new hr((t=>Ja(t)),Ya),this.lastRemoteSnapshotVersion=ne.min(),this.highestTargetId=0,this.oi=0,this._i=new rc,this.targetCount=0,this.ai=zr.ur()}forEachTarget(e,t){return this.si.forEach(((r,s)=>t(s))),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),P.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new zr(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.Pr(t),P.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.si.forEach(((o,a)=>{a.sequenceNumber<=t&&r.get(a.targetId)===null&&(this.si.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)})),P.waitFor(i).next((()=>s))}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return P.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),P.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),P.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return P.resolve(r)}containsKey(e,t){return P.resolve(this._i.containsKey(t))}}/**
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
 */class ep{constructor(e,t){this.ui={},this.overlays={},this.ci=new Du(0),this.li=!1,this.li=!0,this.hi=new c3,this.referenceDelegate=e(this),this.Pi=new d3(this),this.indexManager=new Yb,this.remoteDocumentCache=(function(s){return new h3(s)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new Qb(t),this.Ii=new o3(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new a3,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new l3(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){G("MemoryPersistence","Starting transaction:",e);const s=new p3(this.ci.next());return this.referenceDelegate.Ei(),r(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(e,t){return P.or(Object.values(this.ui).map((r=>()=>r.containsKey(e,t))))}}class p3 extends Wy{constructor(e){super(),this.currentSequenceNumber=e}}class sc{constructor(e){this.persistence=e,this.Ri=new rc,this.Vi=null}static mi(e){return new sc(e)}get fi(){if(this.Vi)return this.Vi;throw re(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),P.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),P.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach((s=>this.fi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.fi,(r=>{const s=Z.fromPath(r);return this.gi(e,s).next((i=>{i||t.removeEntry(s,ne.min())}))})).next((()=>(this.Vi=null,t.apply(e))))}updateLimboDocument(e,t){return this.gi(e,t).next((r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())}))}Ti(e){return 0}gi(e,t){return P.or([()=>P.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class au{constructor(e,t){this.persistence=e,this.pi=new hr((r=>Yy(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=r3(this,t)}static mi(e,t){return new au(e,t)}Ei(){}di(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}wr(e){let t=0;return this.pr(e,(r=>{t++})).next((()=>t))}pr(e,t){return P.forEach(this.pi,((r,s)=>this.br(e,r,s).next((i=>i?P.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,(o=>this.br(e,o,t).next((a=>{a||(r++,i.removeEntry(o,ne.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),P.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),P.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ui(e.data.value)),t}br(e,t,r){return P.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return P.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class ic{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=s}static As(e,t){let r=de(),s=de();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ic(e,t.fromCache,r,s)}}/**
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
 */class m3{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class g3{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return d2()?8:Ky(st())>0?6:4})()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ys(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ws(e,t,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new m3;return this.Ss(e,t,o).next((a=>{if(i.result=a,this.Vs)return this.bs(e,t,o,a.size)}))})).next((()=>i.result))}bs(e,t,r,s){return r.documentReadCount<this.fs?(Er()<=oe.DEBUG&&G("QueryEngine","SDK will not create cache indexes for query:",vr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),P.resolve()):(Er()<=oe.DEBUG&&G("QueryEngine","Query:",vr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Er()<=oe.DEBUG&&G("QueryEngine","The SDK decides to create cache indexes for query:",vr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Lt(t))):P.resolve())}ys(e,t){if(Vh(t))return P.resolve(null);let r=Lt(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=ia(t,null,"F"),r=Lt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const o=de(...i);return this.ps.getDocuments(e,o).next((a=>this.indexManager.getMinOffset(e,r).next((c=>{const h=this.Ds(t,a);return this.Cs(t,h,o,c.readTime)?this.ys(e,ia(t,null,"F")):this.vs(e,h,t,c)}))))})))))}ws(e,t,r,s){return Vh(t)||s.isEqual(ne.min())?P.resolve(null):this.ps.getDocuments(e,r).next((i=>{const o=this.Ds(t,i);return this.Cs(t,o,r,s)?P.resolve(null):(Er()<=oe.DEBUG&&G("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),vr(t)),this.vs(e,o,t,zy(s,Hs)).next((a=>a)))}))}Ds(e,t){let r=new Oe(F0(e));return t.forEach(((s,i)=>{ku(e,i)&&(r=r.add(i))})),r}Cs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,r){return Er()<=oe.DEBUG&&G("QueryEngine","Using full collection scan to execute query:",vr(t)),this.ps.getDocumentsMatchingQuery(e,t,Vn.min(),r)}vs(e,t,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
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
 */const uc="LocalStore",_3=3e8;class y3{constructor(e,t,r,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new Re(ae),this.xs=new hr((i=>Ja(i)),Ya),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new u3(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Ms)))}}function b3(n,e,t,r){return new y3(n,e,t,r)}async function tp(n,e){const t=fe(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],a=[];let c=de();for(const h of s){o.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}for(const h of i){a.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}return t.localDocuments.getDocuments(r,c).next((h=>({Ls:h,removedBatchIds:o,addedBatchIds:a})))}))}))}function np(n){const e=fe(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Pi.getLastRemoteSnapshotVersion(t)))}function E3(n,e){const t=fe(n),r=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const a=[];e.targetChanges.forEach(((d,m)=>{const _=s.get(m);if(!_)return;a.push(t.Pi.removeMatchingKeys(i,d.removedDocuments,m).next((()=>t.Pi.addMatchingKeys(i,d.addedDocuments,m))));let S=_.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?S=S.withResumeToken(We.EMPTY_BYTE_STRING,ne.min()).withLastLimboFreeSnapshotVersion(ne.min()):d.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(d.resumeToken,r)),s=s.insert(m,S),(function(O,q,H){return O.resumeToken.approximateByteSize()===0||q.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=_3?!0:H.addedDocuments.size+H.modifiedDocuments.size+H.removedDocuments.size>0})(_,S,d)&&a.push(t.Pi.updateTargetData(i,S))}));let c=Un(),h=de();if(e.documentUpdates.forEach((d=>{e.resolvedLimboDocuments.has(d)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(i,d))})),a.push(v3(i,o,e.documentUpdates).next((d=>{c=d.ks,h=d.qs}))),!r.isEqual(ne.min())){const d=t.Pi.getLastRemoteSnapshotVersion(i).next((m=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r)));a.push(d)}return P.waitFor(a).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,c,h))).next((()=>c))})).then((i=>(t.Ms=s,i)))}function v3(n,e,t){let r=de(),s=de();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let o=Un();return t.forEach(((a,c)=>{const h=i.get(a);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(a)),c.isNoDocument()&&c.version.isEqual(ne.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):G(uc,"Ignoring outdated watch update for ",a,". Current version:",h.version," Watch version:",c.version)})),{ks:o,qs:s}}))}function T3(n,e){const t=fe(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.Pi.getTargetData(r,e).next((i=>i?(s=i,P.resolve(s)):t.Pi.allocateTargetId(r).next((o=>(s=new xn(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r}))}async function ha(n,e,t){const r=fe(n),s=r.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!Jr(o))throw o;G(uc,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function Kh(n,e,t){const r=fe(n);let s=ne.min(),i=de();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,h,d){const m=fe(c),_=m.xs.get(d);return _!==void 0?P.resolve(m.Ms.get(_)):m.Pi.getTargetData(h,d)})(r,o,Lt(e)).next((a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(o,a.targetId).next((c=>{i=c}))})).next((()=>r.Fs.getDocumentsMatchingQuery(o,e,t?s:ne.min(),t?i:de()))).next((a=>(I3(r,gb(e),a),{documents:a,Qs:i})))))}function I3(n,e,t){let r=n.Os.get(e)||ne.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Os.set(e,r)}class Qh{constructor(){this.activeTargetIds=Tb()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class w3{constructor(){this.Mo=new Qh,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Qh,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class A3{Oo(e){}shutdown(){}}/**
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
 */const Jh="ConnectivityMonitor";class Yh{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){G(Jh,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){G(Jh,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Ni=null;function fa(){return Ni===null?Ni=(function(){return 268435456+Math.round(2147483648*Math.random())})():Ni++,"0x"+Ni.toString(16)}/**
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
 */const xo="RestConnection",C3={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class S3{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===ru?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,t,r,s,i){const o=fa(),a=this.zo(e,t.toUriEncodedString());G(xo,`Sending RPC '${e}' ${o}:`,a,r);const c={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(c,s,i);const{host:h}=new URL(a),d=Wr(h);return this.Jo(e,a,c,r,d).then((m=>(G(xo,`Received RPC '${e}' ${o}: `,m),m)),(m=>{throw Ur(xo,`RPC '${e}' ${o} failed with error: `,m,"url: ",a,"request:",r),m}))}Ho(e,t,r,s,i,o){return this.Go(e,t,r,s,i)}jo(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Qr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}zo(e,t){const r=C3[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
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
 */class x3{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
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
 */const Ye="WebChannelConnection";class R3 extends S3{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,s,i){const o=fa();return new Promise(((a,c)=>{const h=new o0;h.setWithCredentials(!0),h.listenOnce(a0.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Mi.NO_ERROR:const m=h.getResponseJson();G(Ye,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(m)),a(m);break;case Mi.TIMEOUT:G(Ye,`RPC '${e}' ${o} timed out`),c(new W(M.DEADLINE_EXCEEDED,"Request time out"));break;case Mi.HTTP_ERROR:const _=h.getStatus();if(G(Ye,`RPC '${e}' ${o} failed with status:`,_,"response text:",h.getResponseText()),_>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const D=S?.error;if(D&&D.status&&D.message){const O=(function(H){const K=H.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(K)>=0?K:M.UNKNOWN})(D.status);c(new W(O,D.message))}else c(new W(M.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new W(M.UNAVAILABLE,"Connection failed."));break;default:re(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{G(Ye,`RPC '${e}' ${o} completed.`)}}));const d=JSON.stringify(s);G(Ye,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",d,r,15)}))}T_(e,t,r){const s=fa(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=h0(),a=l0(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.jo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const d=i.join("");G(Ye,`Creating RPC '${e}' stream ${s}: ${d}`,c);const m=o.createWebChannel(d,c);this.I_(m);let _=!1,S=!1;const D=new x3({Yo:q=>{S?G(Ye,`Not sending because RPC '${e}' stream ${s} is closed:`,q):(_||(G(Ye,`Opening RPC '${e}' stream ${s} transport.`),m.open(),_=!0),G(Ye,`RPC '${e}' stream ${s} sending:`,q),m.send(q))},Zo:()=>m.close()}),O=(q,H,K)=>{q.listen(H,(Q=>{try{K(Q)}catch($){setTimeout((()=>{throw $}),0)}}))};return O(m,bs.EventType.OPEN,(()=>{S||(G(Ye,`RPC '${e}' stream ${s} transport opened.`),D.o_())})),O(m,bs.EventType.CLOSE,(()=>{S||(S=!0,G(Ye,`RPC '${e}' stream ${s} transport closed`),D.a_(),this.E_(m))})),O(m,bs.EventType.ERROR,(q=>{S||(S=!0,Ur(Ye,`RPC '${e}' stream ${s} transport errored. Name:`,q.name,"Message:",q.message),D.a_(new W(M.UNAVAILABLE,"The operation could not be completed")))})),O(m,bs.EventType.MESSAGE,(q=>{if(!S){const H=q.data[0];Ce(!!H,16349);const K=H,Q=K?.error||K[0]?.error;if(Q){G(Ye,`RPC '${e}' stream ${s} received error:`,Q);const $=Q.status;let ce=(function(g){const E=De[g];if(E!==void 0)return j0(E)})($),Te=Q.message;ce===void 0&&(ce=M.INTERNAL,Te="Unknown error status: "+$+" with message "+Q.message),S=!0,D.a_(new W(ce,Te)),m.close()}else G(Ye,`RPC '${e}' stream ${s} received:`,H),D.u_(H)}})),O(a,c0.STAT_EVENT,(q=>{q.stat===Xo.PROXY?G(Ye,`RPC '${e}' stream ${s} detected buffering proxy`):q.stat===Xo.NOPROXY&&G(Ye,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{D.__()}),0),D}terminate(){this.c_.forEach((e=>e.close())),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter((t=>t===e))}}function Ro(){return typeof document<"u"?document:null}/**
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
 */function Lu(n){return new Ub(n,!0)}/**
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
 */class rp{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&G("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const Xh="PersistentStream";class D3{constructor(e,t,r,s,i,o,a,c){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new rp(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===M.RESOURCE_EXHAUSTED?(sn(t.toString()),sn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===t&&this.G_(r,s)}),(r=>{e((()=>{const s=new W(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return G(Xh,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget((()=>this.D_===e?t():(G(Xh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class P3 extends D3{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=qb(this.serializer,e),r=(function(i){if(!("targetChange"in i))return ne.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ne.min():o.readTime?Rr(o.readTime):ne.min()})(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=$h(this.serializer),t.addTarget=(function(i,o){let a;const c=o.target;if(a=ra(c)?{documents:jb(i,c)}:{query:zb(i,c).ft},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=H0(i,o.resumeToken);const h=aa(i,o.expectedCount);h!==null&&(a.expectedCount=h)}else if(o.snapshotVersion.compareTo(ne.min())>0){a.readTime=ca(i,o.snapshotVersion.toTimestamp());const h=aa(i,o.expectedCount);h!==null&&(a.expectedCount=h)}return a})(this.serializer,e);const r=Hb(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=$h(this.serializer),t.removeTarget=e,this.q_(t)}}/**
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
 */class N3{}class F3 extends N3{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new W(M.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Go(e,la(t,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new W(M.UNKNOWN,i.toString())}))}Ho(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Ho(e,la(t,r),s,o,a,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new W(M.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class k3{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(sn(t),this.aa=!1):G("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const $r="RemoteStore";class V3{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((o=>{r.enqueueAndForget((async()=>{si(this)&&(G($r,"Restarting streams for network reachability change."),await(async function(c){const h=fe(c);h.Ea.add(4),await ri(h),h.Ra.set("Unknown"),h.Ea.delete(4),await Uu(h)})(this))}))})),this.Ra=new k3(r,s)}}async function Uu(n){if(si(n))for(const e of n.da)await e(!0)}async function ri(n){for(const e of n.da)await e(!1)}function sp(n,e){const t=fe(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),lc(t)?cc(t):Zr(t).O_()&&ac(t,e))}function oc(n,e){const t=fe(n),r=Zr(t);t.Ia.delete(e),r.O_()&&ip(t,e),t.Ia.size===0&&(r.O_()?r.L_():si(t)&&t.Ra.set("Unknown"))}function ac(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ne.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Zr(n).Y_(e)}function ip(n,e){n.Va.Ue(e),Zr(n).Z_(e)}function cc(n){n.Va=new Vb({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Zr(n).start(),n.Ra.ua()}function lc(n){return si(n)&&!Zr(n).x_()&&n.Ia.size>0}function si(n){return fe(n).Ea.size===0}function up(n){n.Va=void 0}async function O3(n){n.Ra.set("Online")}async function M3(n){n.Ia.forEach(((e,t)=>{ac(n,e)}))}async function L3(n,e){up(n),lc(n)?(n.Ra.ha(e),cc(n)):n.Ra.set("Unknown")}async function U3(n,e,t){if(n.Ra.set("Online"),e instanceof $0&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const a of i.targetIds)s.Ia.has(a)&&(await s.remoteSyncer.rejectListen(a,o),s.Ia.delete(a),s.Va.removeTarget(a))})(n,e)}catch(r){G($r,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Zh(n,r)}else if(e instanceof qi?n.Va.Ze(e):e instanceof z0?n.Va.st(e):n.Va.tt(e),!t.isEqual(ne.min()))try{const r=await np(n.localStore);t.compareTo(r)>=0&&await(function(i,o){const a=i.Va.Tt(o);return a.targetChanges.forEach(((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.Ia.get(h);d&&i.Ia.set(h,d.withResumeToken(c.resumeToken,o))}})),a.targetMismatches.forEach(((c,h)=>{const d=i.Ia.get(c);if(!d)return;i.Ia.set(c,d.withResumeToken(We.EMPTY_BYTE_STRING,d.snapshotVersion)),ip(i,c);const m=new xn(d.target,c,h,d.sequenceNumber);ac(i,m)})),i.remoteSyncer.applyRemoteEvent(a)})(n,t)}catch(r){G($r,"Failed to raise snapshot:",r),await Zh(n,r)}}async function Zh(n,e,t){if(!Jr(e))throw e;n.Ea.add(1),await ri(n),n.Ra.set("Offline"),t||(t=()=>np(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{G($r,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await Uu(n)}))}async function ef(n,e){const t=fe(n);t.asyncQueue.verifyOperationInProgress(),G($r,"RemoteStore received new credentials");const r=si(t);t.Ea.add(3),await ri(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await Uu(t)}async function B3(n,e){const t=fe(n);e?(t.Ea.delete(2),await Uu(t)):e||(t.Ea.add(2),await ri(t),t.Ra.set("Unknown"))}function Zr(n){return n.ma||(n.ma=(function(t,r,s){const i=fe(t);return i.sa(),new P3(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:O3.bind(null,n),t_:M3.bind(null,n),r_:L3.bind(null,n),H_:U3.bind(null,n)}),n.da.push((async e=>{e?(n.ma.B_(),lc(n)?cc(n):n.Ra.set("Unknown")):(await n.ma.stop(),up(n))}))),n.ma}/**
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
 */class hc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new xr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,a=new hc(e,t,o,s,i);return a.start(r),a}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function op(n,e){if(sn("AsyncQueue",`${e}: ${n}`),Jr(n))return new W(M.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Dr{static emptySet(e){return new Dr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||Z.comparator(t.key,r.key):(t,r)=>Z.comparator(t.key,r.key),this.keyedMap=Es(),this.sortedSet=new Re(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Dr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Dr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class tf{constructor(){this.ga=new Re(Z.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):re(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Hr{constructor(e,t,r,s,i,o,a,c,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach((a=>{o.push({type:0,doc:a})})),new Hr(e,t,Dr.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Fu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class q3{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class j3{constructor(){this.queries=nf(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=fe(t),i=s.queries;s.queries=nf(),i.forEach(((o,a)=>{for(const c of a.Sa)c.onError(r)}))})(this,new W(M.ABORTED,"Firestore shutting down"))}}function nf(){return new hr((n=>N0(n)),Fu)}async function z3(n,e){const t=fe(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new q3,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const a=op(o,`Initialization of query '${vr(e.query)}' failed`);return void e.onError(a)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&fc(t)}async function $3(n,e){const t=fe(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function H3(n,e){const t=fe(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const a of o.Sa)a.Fa(s)&&(r=!0);o.wa=s}}r&&fc(t)}function G3(n,e,t){const r=fe(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function fc(n){n.Ca.forEach((e=>{e.next()}))}var da,rf;(rf=da||(da={})).Ma="default",rf.Cache="cache";class W3{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Hr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Hr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==da.Cache}}/**
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
 */class ap{constructor(e){this.key=e}}class cp{constructor(e){this.key=e}}class K3{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=de(),this.mutatedKeys=de(),this.eu=F0(e),this.tu=new Dr(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new tf,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,a=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((d,m)=>{const _=s.get(d),S=ku(this.query,m)?m:null,D=!!_&&this.mutatedKeys.has(_.key),O=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let q=!1;_&&S?_.data.isEqual(S.data)?D!==O&&(r.track({type:3,doc:S}),q=!0):this.su(_,S)||(r.track({type:2,doc:S}),q=!0,(c&&this.eu(S,c)>0||h&&this.eu(S,h)<0)&&(a=!0)):!_&&S?(r.track({type:0,doc:S}),q=!0):_&&!S&&(r.track({type:1,doc:_}),q=!0,(c||h)&&(a=!0)),q&&(S?(o=o.add(S),i=O?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{tu:o,iu:r,Cs:a,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((d,m)=>(function(S,D){const O=q=>{switch(q){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return re(20277,{Rt:q})}};return O(S)-O(D)})(d.type,m.type)||this.eu(d.doc,m.doc))),this.ou(r),s=s??!1;const a=t&&!s?this._u():[],c=this.Xa.size===0&&this.current&&!s?1:0,h=c!==this.Za;return this.Za=c,o.length!==0||h?{snapshot:new Hr(this.query,e.tu,i,o,e.mutatedKeys,c===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:a}:{au:a}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new tf,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Ya=this.Ya.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ya=this.Ya.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=de(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const t=[];return e.forEach((r=>{this.Xa.has(r)||t.push(new cp(r))})),this.Xa.forEach((r=>{e.has(r)||t.push(new ap(r))})),t}cu(e){this.Ya=e.Qs,this.Xa=de();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Hr.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const dc="SyncEngine";class Q3{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class J3{constructor(e){this.key=e,this.hu=!1}}class Y3{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new hr((a=>N0(a)),Fu),this.Iu=new Map,this.Eu=new Set,this.du=new Re(Z.comparator),this.Au=new Map,this.Ru=new rc,this.Vu={},this.mu=new Map,this.fu=zr.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function X3(n,e,t=!0){const r=pp(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await lp(r,e,t,!0),s}async function Z3(n,e){const t=pp(n);await lp(t,e,!0,!1)}async function lp(n,e,t,r){const s=await T3(n.localStore,Lt(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let a;return r&&(a=await e6(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&sp(n.remoteStore,s),a}async function e6(n,e,t,r,s){n.pu=(m,_,S)=>(async function(O,q,H,K){let Q=q.view.ru(H);Q.Cs&&(Q=await Kh(O.localStore,q.query,!1).then((({documents:I})=>q.view.ru(I,Q))));const $=K&&K.targetChanges.get(q.targetId),ce=K&&K.targetMismatches.get(q.targetId)!=null,Te=q.view.applyChanges(Q,O.isPrimaryClient,$,ce);return uf(O,q.targetId,Te.au),Te.snapshot})(n,m,_,S);const i=await Kh(n.localStore,e,!0),o=new K3(e,i.Qs),a=o.ru(i.documents),c=ni.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=o.applyChanges(a,n.isPrimaryClient,c);uf(n,t,h.au);const d=new Q3(e,t,o);return n.Tu.set(e,d),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),h.snapshot}async function t6(n,e,t){const r=fe(n),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter((o=>!Fu(o,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ha(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&oc(r.remoteStore,s.targetId),pa(r,s.targetId)})).catch(Ru)):(pa(r,s.targetId),await ha(r.localStore,s.targetId,!0))}async function n6(n,e){const t=fe(n),r=t.Tu.get(e),s=t.Iu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),oc(t.remoteStore,r.targetId))}async function hp(n,e){const t=fe(n);try{const r=await E3(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Au.get(i);o&&(Ce(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?Ce(o.hu,14607):s.removedDocuments.size>0&&(Ce(o.hu,42227),o.hu=!1))})),await dp(t,r,e)}catch(r){await Ru(r)}}function sf(n,e,t){const r=fe(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach(((i,o)=>{const a=o.view.va(e);a.snapshot&&s.push(a.snapshot)})),(function(o,a){const c=fe(o);c.onlineState=a;let h=!1;c.queries.forEach(((d,m)=>{for(const _ of m.Sa)_.va(a)&&(h=!0)})),h&&fc(c)})(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function r6(n,e,t){const r=fe(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let o=new Re(Z.comparator);o=o.insert(i,et.newNoDocument(i,ne.min()));const a=de().add(i),c=new Mu(ne.min(),new Map,new Re(ae),o,a);await hp(r,c),r.du=r.du.remove(i),r.Au.delete(e),pc(r)}else await ha(r.localStore,e,!1).then((()=>pa(r,e,t))).catch(Ru)}function pa(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach((r=>{n.Ru.containsKey(r)||fp(n,r)}))}function fp(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(oc(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),pc(n))}function uf(n,e,t){for(const r of t)r instanceof ap?(n.Ru.addReference(r.key,e),s6(n,r)):r instanceof cp?(G(dc,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||fp(n,r.key)):re(19791,{wu:r})}function s6(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||(G(dc,"New document in limbo: "+t),n.Eu.add(r),pc(n))}function pc(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new Z(we.fromString(e)),r=n.fu.next();n.Au.set(r,new J3(t)),n.du=n.du.insert(t,r),sp(n.remoteStore,new xn(Lt(Xa(t.path)),r,"TargetPurposeLimboResolution",Du.ce))}}async function dp(n,e,t){const r=fe(n),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach(((a,c)=>{o.push(r.pu(c,e,t).then((h=>{if((h||t)&&r.isPrimaryClient){const d=h?!h.fromCache:t?.targetChanges.get(c.targetId)?.current;r.sharedClientState.updateQueryState(c.targetId,d?"current":"not-current")}if(h){s.push(h);const d=ic.As(c.targetId,h);i.push(d)}})))})),await Promise.all(o),r.Pu.H_(s),await(async function(c,h){const d=fe(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>P.forEach(h,(_=>P.forEach(_.Es,(S=>d.persistence.referenceDelegate.addReference(m,_.targetId,S))).next((()=>P.forEach(_.ds,(S=>d.persistence.referenceDelegate.removeReference(m,_.targetId,S)))))))))}catch(m){if(!Jr(m))throw m;G(uc,"Failed to update sequence numbers: "+m)}for(const m of h){const _=m.targetId;if(!m.fromCache){const S=d.Ms.get(_),D=S.snapshotVersion,O=S.withLastLimboFreeSnapshotVersion(D);d.Ms=d.Ms.insert(_,O)}}})(r.localStore,i))}async function i6(n,e){const t=fe(n);if(!t.currentUser.isEqual(e)){G(dc,"User change. New user:",e.toKey());const r=await tp(t.localStore,e);t.currentUser=e,(function(i,o){i.mu.forEach((a=>{a.forEach((c=>{c.reject(new W(M.CANCELLED,o))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await dp(t,r.Ls)}}function u6(n,e){const t=fe(n),r=t.Au.get(e);if(r&&r.hu)return de().add(r.key);{let s=de();const i=t.Iu.get(e);if(!i)return s;for(const o of i){const a=t.Tu.get(o);s=s.unionWith(a.view.nu)}return s}}function pp(n){const e=fe(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=hp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=u6.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=r6.bind(null,e),e.Pu.H_=H3.bind(null,e.eventManager),e.Pu.yu=G3.bind(null,e.eventManager),e}class cu{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Lu(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return b3(this.persistence,new g3,e.initialUser,this.serializer)}Cu(e){return new ep(sc.mi,this.serializer)}Du(e){return new w3}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}cu.provider={build:()=>new cu};class o6 extends cu{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){Ce(this.persistence.referenceDelegate instanceof au,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new t3(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?ft.withCacheSize(this.cacheSizeBytes):ft.DEFAULT;return new ep((r=>au.mi(r,t)),this.serializer)}}class ma{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>sf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=i6.bind(null,this.syncEngine),await B3(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new j3})()}createDatastore(e){const t=Lu(e.databaseInfo.databaseId),r=(function(i){return new R3(i)})(e.databaseInfo);return(function(i,o,a,c){return new F3(i,o,a,c)})(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,o,a){return new V3(r,s,i,o,a)})(this.localStore,this.datastore,e.asyncQueue,(t=>sf(this.syncEngine,t,0)),(function(){return Yh.v()?new Yh:new A3})())}createSyncEngine(e,t){return(function(s,i,o,a,c,h,d){const m=new Y3(s,i,o,a,c,h);return d&&(m.gu=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const r=fe(t);G($r,"RemoteStore shutting down."),r.Ea.add(5),await ri(r),r.Aa.shutdown(),r.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}ma.provider={build:()=>new ma};/**
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
 */class a6{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):sn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
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
 */const Bn="FirestoreClient";class c6{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Xe.UNAUTHENTICATED,this.clientId=p0.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{G(Bn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(G(Bn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new xr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=op(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Do(n,e){n.asyncQueue.verifyOperationInProgress(),G(Bn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await tp(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function of(n,e){n.asyncQueue.verifyOperationInProgress();const t=await l6(n);G(Bn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>ef(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>ef(e.remoteStore,s))),n._onlineComponents=e}async function l6(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){G(Bn,"Using user provided OfflineComponentProvider");try{await Do(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===M.FAILED_PRECONDITION||s.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Ur("Error using user provided cache. Falling back to memory cache: "+t),await Do(n,new cu)}}else G(Bn,"Using default OfflineComponentProvider"),await Do(n,new o6(void 0));return n._offlineComponents}async function h6(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(G(Bn,"Using user provided OnlineComponentProvider"),await of(n,n._uninitializedComponentsProvider._online)):(G(Bn,"Using default OnlineComponentProvider"),await of(n,new ma))),n._onlineComponents}async function af(n){const e=await h6(n),t=e.eventManager;return t.onListen=X3.bind(null,e.syncEngine),t.onUnlisten=t6.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Z3.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=n6.bind(null,e.syncEngine),t}/**
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
 */function mp(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const cf=new Map;/**
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
 */const gp="firestore.googleapis.com",lf=!0;class hf{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new W(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=gp,this.ssl=lf}else this.host=e.host,this.ssl=e.ssl??lf;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Z0;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Zb)throw new W(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}jy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=mp(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class mc{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new hf({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new hf(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Ny;switch(r.type){case"firstParty":return new Oy(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=cf.get(t);r&&(G("ComponentProvider","Removing Datastore"),cf.delete(t),r.terminate())})(this),Promise.resolve()}}function f6(n,e,t,r={}){n=Li(n,mc);const s=Wr(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},a=`${e}:${t}`;s&&(Zd(`https://${a}`),e0("Firestore",!0)),i.host!==gp&&i.host!==a&&Ur("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:a,ssl:s,emulatorOptions:r};if(!ur(c,o)&&(n._setSettings(c),r.mockUserToken)){let h,d;if(typeof r.mockUserToken=="string")h=r.mockUserToken,d=Xe.MOCK_USER;else{h=s2(r.mockUserToken,n._app?.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new W(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new Xe(m)}n._authCredentials=new Fy(new d0(h,d))}}/**
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
 */class fr{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new fr(this.firestore,e,this._query)}}class nt{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Pr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new nt(this.firestore,e,this._key)}toJSON(){return{type:nt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(ti(t,nt._jsonSchema))return new nt(e,r||null,new Z(we.fromString(t.referencePath)))}}nt._jsonSchemaVersion="firestore/documentReference/1.0",nt._jsonSchema={type:Ne("string",nt._jsonSchemaVersion),referencePath:Ne("string")};class Pr extends fr{constructor(e,t,r){super(e,t,Xa(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new nt(this.firestore,null,new Z(e))}withConverter(e){return new Pr(this.firestore,e,this._path)}}function F4(n,e,...t){if(n=gt(n),n instanceof mc){const r=we.fromString(e,...t);return vh(r),new Pr(n,null,r)}{if(!(n instanceof nt||n instanceof Pr))throw new W(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(we.fromString(e,...t));return vh(r),new Pr(n.firestore,null,r)}}/**
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
 */const ff="AsyncQueue";class df{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new rp(this,"async_queue_retry"),this._c=()=>{const r=Ro();r&&G(ff,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=Ro();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Ro();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new xr;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Jr(e))throw e;G(ff,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,sn("INTERNAL UNHANDLED ERROR: ",pf(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=hc.createAndSchedule(this,e,t,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&re(47125,{Pc:pf(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function pf(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
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
 */function mf(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}class ga extends mc{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new df,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new df(e),this._firestoreClient=void 0,await e}}}function k4(n,e){const t=typeof n=="object"?n:r0(),r=typeof n=="string"?n:ru,s=Ga(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=n2("firestore");i&&f6(s,...i)}return s}function d6(n){if(n._terminated)throw new W(M.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||p6(n),n._firestoreClient}function p6(n){const e=n._freezeSettings(),t=(function(s,i,o,a){return new eb(s,i,o,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,mp(a.experimentalLongPollingOptions),a.useFetchStreams,a.isUsingEmulator)})(n._databaseId,n._app?.options.appId||"",n._persistenceKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new c6(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(n._componentsProvider))}/**
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
 */class bt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new bt(We.fromBase64String(e))}catch(t){throw new W(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new bt(We.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:bt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ti(e,bt._jsonSchema))return bt.fromBase64String(e.bytes)}}bt._jsonSchemaVersion="firestore/bytes/1.0",bt._jsonSchema={type:Ne("string",bt._jsonSchemaVersion),bytes:Ne("string")};/**
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
 */class _p{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new W(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new tt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class yp{constructor(e){this._methodName=e}}/**
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
 */class Ut{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new W(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new W(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ae(this._lat,e._lat)||ae(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ut._jsonSchemaVersion}}static fromJSON(e){if(ti(e,Ut._jsonSchema))return new Ut(e.latitude,e.longitude)}}Ut._jsonSchemaVersion="firestore/geoPoint/1.0",Ut._jsonSchema={type:Ne("string",Ut._jsonSchemaVersion),latitude:Ne("number"),longitude:Ne("number")};/**
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
 */class Bt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Bt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ti(e,Bt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Bt(e.vectorValues);throw new W(M.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Bt._jsonSchemaVersion="firestore/vectorValue/1.0",Bt._jsonSchema={type:Ne("string",Bt._jsonSchemaVersion),vectorValues:Ne("object")};/**
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
 */const m6=/^__.*__$/;function bp(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw re(40011,{Ac:n})}}class gc{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new gc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return _a(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(bp(this.Ac)&&m6.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class g6{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Lu(e)}Cc(e,t,r,s=!1){return new gc({Ac:e,methodName:t,Dc:r,path:tt.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function _6(n){const e=n._freezeSettings(),t=Lu(n._databaseId);return new g6(n._databaseId,!!e.ignoreUndefinedProperties,t)}function y6(n,e,t,r=!1){return _c(t,n.Cc(r?4:3,e))}function _c(n,e){if(Ep(n=gt(n)))return E6("Unsupported field value:",e,n),b6(n,e);if(n instanceof yp)return(function(r,s){if(!bp(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const a of r){let c=_c(a,s.wc(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=gt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Ib(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Ae.fromDate(r);return{timestampValue:ca(s.serializer,i)}}if(r instanceof Ae){const i=new Ae(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ca(s.serializer,i)}}if(r instanceof Ut)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof bt)return{bytesValue:H0(s.serializer,r._byteString)};if(r instanceof nt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:G0(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Bt)return(function(o,a){return{mapValue:{fields:{[I0]:{stringValue:w0},[su]:{arrayValue:{values:o.toArray().map((h=>{if(typeof h!="number")throw a.Sc("VectorValues must only contain numeric values.");return Za(a.serializer,h)}))}}}}}})(r,s);throw s.Sc(`Unsupported field value: ${xu(r)}`)})(n,e)}function b6(n,e){const t={};return _0(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Yr(n,((r,s)=>{const i=_c(s,e.mc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function Ep(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ae||n instanceof Ut||n instanceof bt||n instanceof nt||n instanceof yp||n instanceof Bt)}function E6(n,e,t){if(!Ep(t)||!m0(t)){const r=xu(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}const v6=new RegExp("[~\\*/\\[\\]]");function T6(n,e,t){if(e.search(v6)>=0)throw _a(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new _p(...e.split("."))._internalPath}catch{throw _a(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function _a(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new W(M.INVALID_ARGUMENT,a+n+c)}/**
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
 */class vp{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new nt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new I6(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(yc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class I6 extends vp{data(){return super.data()}}function yc(n,e){return typeof e=="string"?T6(n,e):e instanceof _p?e._internalPath:e._delegate._internalPath}/**
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
 */function w6(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new W(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class bc{}class Tp extends bc{}function V4(n,e,...t){let r=[];e instanceof bc&&r.push(e),r=r.concat(t),(function(i){const o=i.filter((c=>c instanceof vc)).length,a=i.filter((c=>c instanceof Ec)).length;if(o>1||o>0&&a>0)throw new W(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class Ec extends Tp{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ec(e,t,r)}_apply(e){const t=this._parse(e);return Ip(e._query,t),new fr(e.firestore,e.converter,sa(e._query,t))}_parse(e){const t=_6(e.firestore);return(function(i,o,a,c,h,d,m){let _;if(h.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new W(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){_f(m,d);const D=[];for(const O of m)D.push(gf(c,i,O));_={arrayValue:{values:D}}}else _=gf(c,i,m)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||_f(m,d),_=y6(a,o,m,d==="in"||d==="not-in");return Pe.create(h,d,_)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class vc extends bc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new vc(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:St.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const a=i.getFlattenedFilters();for(const c of a)Ip(o,c),o=sa(o,c)})(e._query,t),new fr(e.firestore,e.converter,sa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Tc extends Tp{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Tc(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new W(M.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new W(M.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Qs(i,o)})(e._query,this._field,this._direction);return new fr(e.firestore,e.converter,(function(s,i){const o=s.explicitOrderBy.concat([i]);return new Xr(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)})(e._query,t))}}function O4(n,e="asc"){const t=e,r=yc("orderBy",n);return Tc._create(r,t)}function gf(n,e,t){if(typeof(t=gt(t))=="string"){if(t==="")throw new W(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!P0(e)&&t.indexOf("/")!==-1)throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(we.fromString(t));if(!Z.isDocumentKey(r))throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Rh(n,new Z(r))}if(t instanceof nt)return Rh(n,t._key);throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${xu(t)}.`)}function _f(n,e){if(!Array.isArray(n)||n.length===0)throw new W(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Ip(n,e){const t=(function(s,i){for(const o of s)for(const a of o.getFlattenedFilters())if(i.indexOf(a.op)>=0)return a.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new W(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new W(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class A6{convertValue(e,t="none"){switch(Ln(e)){case 0:return null;case 1:return e.booleanValue;case 2:return xe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Mn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw re(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Yr(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){const t=e.fields?.[su].arrayValue?.values?.map((r=>xe(r.doubleValue)));return new Bt(t)}convertGeoPoint(e){return new Ut(xe(e.latitude),xe(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Nu(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Gs(e));default:return null}}convertTimestamp(e){const t=On(e);return new Ae(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=we.fromString(e);Ce(X0(r),9688,{name:e});const s=new Ws(r.get(1),r.get(3)),i=new Z(r.popFirst(5));return s.isEqual(t)||sn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}class Ts{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class sr extends vp{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ji(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(yc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new W(M.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=sr._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}sr._jsonSchemaVersion="firestore/documentSnapshot/1.0",sr._jsonSchema={type:Ne("string",sr._jsonSchemaVersion),bundleSource:Ne("string","DocumentSnapshot"),bundleName:Ne("string"),bundle:Ne("string")};class ji extends sr{data(e={}){return super.data(e)}}class Nr{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Ts(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new ji(this._firestore,this._userDataWriter,r.key,r,new Ts(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new W(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((a=>{const c=new ji(s._firestore,s._userDataWriter,a.doc.key,a.doc,new Ts(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((a=>i||a.type!==3)).map((a=>{const c=new ji(s._firestore,s._userDataWriter,a.doc.key,a.doc,new Ts(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,d=-1;return a.type!==0&&(h=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),d=o.indexOf(a.doc.key)),{type:C6(a.type),doc:c,oldIndex:h,newIndex:d}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new W(M.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Nr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=p0.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function C6(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return re(61501,{type:n})}}Nr._jsonSchemaVersion="firestore/querySnapshot/1.0",Nr._jsonSchema={type:Ne("string",Nr._jsonSchemaVersion),bundleSource:Ne("string","QuerySnapshot"),bundleName:Ne("string"),bundle:Ne("string")};class wp extends A6{constructor(e){super(),this.firestore=e}convertBytes(e){return new bt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new nt(this.firestore,null,t)}}function M4(n,...e){n=gt(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||mf(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(mf(e[r])){const c=e[r];e[r]=c.next?.bind(c),e[r+1]=c.error?.bind(c),e[r+2]=c.complete?.bind(c)}let i,o,a;if(n instanceof nt)o=Li(n.firestore,ga),a=Xa(n._key.path),i={next:c=>{e[r]&&e[r](S6(o,n,c))},error:e[r+1],complete:e[r+2]};else{const c=Li(n,fr);o=Li(c.firestore,ga),a=c._query;const h=new wp(o);i={next:d=>{e[r]&&e[r](new Nr(o,h,c,d))},error:e[r+1],complete:e[r+2]},w6(n._query)}return(function(h,d,m,_){const S=new a6(_),D=new W3(d,S,m);return h.asyncQueue.enqueueAndForget((async()=>z3(await af(h),D))),()=>{S.Nu(),h.asyncQueue.enqueueAndForget((async()=>$3(await af(h),D)))}})(d6(o),a,s,i)}function S6(n,e,t){const r=t.docs.get(e._key),s=new wp(n);return new sr(n,s,e._key,r,new Ts(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(s){Qr=s})(Kr),Lr(new or("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),a=new ga(new ky(r.getProvider("auth-internal")),new My(o,r.getProvider("app-check-internal")),(function(h,d){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new W(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ws(h.options.projectId,d)})(o,s),o);return i={useFetchStreams:t,...i},a._setSettings(i),a}),"PUBLIC").setMultipleInstances(!0)),nr(_h,yh,e),nr(_h,yh,"esm2020")})();function Ap(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const x6=Ap,Cp=new Zs("auth","Firebase",Ap());/**
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
 */const lu=new $a("@firebase/auth");function R6(n,...e){lu.logLevel<=oe.WARN&&lu.warn(`Auth (${Kr}): ${n}`,...e)}function zi(n,...e){lu.logLevel<=oe.ERROR&&lu.error(`Auth (${Kr}): ${n}`,...e)}/**
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
 */function un(n,...e){throw Ic(n,...e)}function qt(n,...e){return Ic(n,...e)}function Sp(n,e,t){const r={...x6(),[e]:t};return new Zs("auth","Firebase",r).create(e,{appName:n.name})}function Fn(n){return Sp(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ic(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Cp.create(n,...e)}function te(n,e,...t){if(!n)throw Ic(e,...t)}function Zt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw zi(e),new Error(e)}function on(n,e){n||Zt(e)}/**
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
 */function ya(){return typeof self<"u"&&self.location?.href||""}function D6(){return yf()==="http:"||yf()==="https:"}function yf(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function P6(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(D6()||l2()||"connection"in navigator)?navigator.onLine:!0}function N6(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class ii{constructor(e,t){this.shortDelay=e,this.longDelay=t,on(t>e,"Short delay should be less than long delay!"),this.isMobile=o2()||h2()}get(){return P6()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function wc(n,e){on(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class xp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Zt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Zt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Zt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const F6={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const k6=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],V6=new ii(3e4,6e4);function Bu(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function es(n,e,t,r,s={}){return Rp(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const a=ei({key:n.config.apiKey,...o}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const h={method:e,headers:c,...i};return c2()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&Wr(n.emulatorConfig.host)&&(h.credentials="include"),xp.fetch()(await Pp(n,n.config.apiHost,t,a),h)})}async function Rp(n,e,t){n._canInitEmulator=!1;const r={...F6,...e};try{const s=new O6(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Fi(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,h]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Fi(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Fi(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Fi(n,"user-disabled",o);const d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Sp(n,d,h);un(n,d)}}catch(s){if(s instanceof cn)throw s;un(n,"network-request-failed",{message:String(s)})}}async function Dp(n,e,t,r,s={}){const i=await es(n,e,t,r,s);return"mfaPendingCredential"in i&&un(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Pp(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?wc(n.config,s):`${n.config.apiScheme}://${s}`;return k6.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class O6{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(qt(this.auth,"network-request-failed")),V6.get())})}}function Fi(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=qt(n,e,r);return s.customData._tokenResponse=t,s}/**
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
 */async function M6(n,e){return es(n,"POST","/v1/accounts:delete",e)}async function hu(n,e){return es(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ms(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function L6(n,e=!1){const t=gt(n),r=await t.getIdToken(e),s=Ac(r);te(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:Ms(Po(s.auth_time)),issuedAtTime:Ms(Po(s.iat)),expirationTime:Ms(Po(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Po(n){return Number(n)*1e3}function Ac(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return zi("JWT malformed, contained fewer than 3 sections"),null;try{const s=Qd(t);return s?JSON.parse(s):(zi("Failed to decode base64 JWT payload"),null)}catch(s){return zi("Caught error parsing JWT payload as JSON",s?.toString()),null}}function bf(n){const e=Ac(n);return te(e,"internal-error"),te(typeof e.exp<"u","internal-error"),te(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Js(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof cn&&U6(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function U6({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class B6{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ba{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ms(this.lastLoginAt),this.creationTime=Ms(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function fu(n){const e=n.auth,t=await n.getIdToken(),r=await Js(n,hu(e,{idToken:t}));te(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?Np(s.providerUserInfo):[],o=j6(n.providerData,i),a=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!o?.length,h=a?c:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new ba(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,d)}async function q6(n){const e=gt(n);await fu(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function j6(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Np(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function z6(n,e){const t=await Rp(n,{},async()=>{const r=ei({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await Pp(n,s,"/v1/token",`key=${i}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:r};return n.emulatorConfig&&Wr(n.emulatorConfig.host)&&(c.credentials="include"),xp.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function $6(n,e){return es(n,"POST","/v2/accounts:revokeToken",Bu(n,e))}/**
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
 */class Fr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){te(e.idToken,"internal-error"),te(typeof e.idToken<"u","internal-error"),te(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):bf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){te(e.length!==0,"internal-error");const t=bf(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(te(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await z6(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Fr;return r&&(te(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(te(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(te(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Fr,this.toJSON())}_performRefresh(){return Zt("not implemented")}}/**
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
 */function mn(n,e){te(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class wt{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new B6(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ba(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Js(this,this.stsTokenManager.getToken(this.auth,e));return te(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return L6(this,e)}reload(){return q6(this)}_assign(e){this!==e&&(te(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new wt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){te(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await fu(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(It(this.auth.app))return Promise.reject(Fn(this.auth));const e=await this.getIdToken();return await Js(this,M6(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,c=t._redirectEventId??void 0,h=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:m,emailVerified:_,isAnonymous:S,providerData:D,stsTokenManager:O}=t;te(m&&O,e,"internal-error");const q=Fr.fromJSON(this.name,O);te(typeof m=="string",e,"internal-error"),mn(r,e.name),mn(s,e.name),te(typeof _=="boolean",e,"internal-error"),te(typeof S=="boolean",e,"internal-error"),mn(i,e.name),mn(o,e.name),mn(a,e.name),mn(c,e.name),mn(h,e.name),mn(d,e.name);const H=new wt({uid:m,auth:e,email:s,emailVerified:_,displayName:r,isAnonymous:S,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:q,createdAt:h,lastLoginAt:d});return D&&Array.isArray(D)&&(H.providerData=D.map(K=>({...K}))),c&&(H._redirectEventId=c),H}static async _fromIdTokenResponse(e,t,r=!1){const s=new Fr;s.updateFromServerResponse(t);const i=new wt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await fu(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];te(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Np(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,a=new Fr;a.updateFromIdToken(r);const c=new wt({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new ba(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(c,h),c}}/**
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
 */const Ef=new Map;function en(n){on(n instanceof Function,"Expected a class definition");let e=Ef.get(n);return e?(on(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ef.set(n,e),e)}/**
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
 */class Fp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Fp.type="NONE";const vf=Fp;/**
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
 */function $i(n,e,t){return`firebase:${n}:${e}:${t}`}class kr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=$i(this.userKey,s.apiKey,i),this.fullPersistenceKey=$i("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await hu(this.auth,{idToken:e}).catch(()=>{});return t?wt._fromGetAccountInfoResponse(this.auth,t,e):null}return wt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new kr(en(vf),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||en(vf);const o=$i(r,e.config.apiKey,e.name);let a=null;for(const h of t)try{const d=await h._get(o);if(d){let m;if(typeof d=="string"){const _=await hu(e,{idToken:d}).catch(()=>{});if(!_)break;m=await wt._fromGetAccountInfoResponse(e,_,d)}else m=wt._fromJSON(e,d);h!==i&&(a=m),i=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new kr(i,e,r):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new kr(i,e,r))}}/**
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
 */function Tf(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Mp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(kp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Up(e))return"Blackberry";if(Bp(e))return"Webos";if(Vp(e))return"Safari";if((e.includes("chrome/")||Op(e))&&!e.includes("edge/"))return"Chrome";if(Lp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function kp(n=st()){return/firefox\//i.test(n)}function Vp(n=st()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Op(n=st()){return/crios\//i.test(n)}function Mp(n=st()){return/iemobile/i.test(n)}function Lp(n=st()){return/android/i.test(n)}function Up(n=st()){return/blackberry/i.test(n)}function Bp(n=st()){return/webos/i.test(n)}function Cc(n=st()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function H6(n=st()){return Cc(n)&&!!window.navigator?.standalone}function G6(){return f2()&&document.documentMode===10}function qp(n=st()){return Cc(n)||Lp(n)||Bp(n)||Up(n)||/windows phone/i.test(n)||Mp(n)}/**
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
 */function jp(n,e=[]){let t;switch(n){case"Browser":t=Tf(st());break;case"Worker":t=`${Tf(st())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Kr}/${r}`}/**
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
 */class W6{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function K6(n,e={}){return es(n,"GET","/v2/passwordPolicy",Bu(n,e))}/**
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
 */const Q6=6;class J6{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Q6,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class Y6{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new If(this),this.idTokenSubscription=new If(this),this.beforeStateQueue=new W6(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Cp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=en(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await kr.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await hu(this,{idToken:e}),r=await wt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(It(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=r?._redirectEventId,a=await this.tryRedirectSignIn(e);(!i||i===o)&&a?.user&&(r=a.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return te(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await fu(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=N6()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(It(this.app))return Promise.reject(Fn(this));const t=e?gt(e):null;return t&&te(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&te(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return It(this.app)?Promise.reject(Fn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return It(this.app)?Promise.reject(Fn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(en(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await K6(this),t=new J6(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Zs("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await $6(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&en(e)||this._popupRedirectResolver;te(t,this,"argument-error"),this.redirectPersistenceManager=await kr.create(this,[en(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(te(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,r,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return te(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=jp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(It(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&R6(`Error while retrieving App Check token: ${e.error}`),e?.token}}function qu(n){return gt(n)}class If{constructor(e){this.auth=e,this.observer=null,this.addObserver=E2(t=>this.observer=t)}get next(){return te(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Sc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function X6(n){Sc=n}function Z6(n){return Sc.loadJS(n)}function eE(){return Sc.gapiScript}function tE(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function nE(n,e){const t=Ga(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(ur(i,e??{}))return s;un(s,"already-initialized")}return t.initialize({options:e})}function rE(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(en);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function sE(n,e,t){const r=qu(n);te(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=zp(e),{host:o,port:a}=iE(e),c=a===null?"":`:${a}`,h={url:`${i}//${o}${c}/`},d=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){te(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),te(ur(h,r.config.emulator)&&ur(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Wr(o)?(Zd(`${i}//${o}${c}`),e0("Auth",!0)):uE()}function zp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function iE(n){const e=zp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:wf(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:wf(o)}}}function wf(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function uE(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class $p{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Zt("not implemented")}_getIdTokenResponse(e){return Zt("not implemented")}_linkToIdToken(e,t){return Zt("not implemented")}_getReauthenticationResolver(e){return Zt("not implemented")}}/**
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
 */async function Vr(n,e){return Dp(n,"POST","/v1/accounts:signInWithIdp",Bu(n,e))}/**
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
 */const oE="http://localhost";class cr extends $p{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new cr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):un("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const o=new cr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Vr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Vr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Vr(e,t)}buildRequest(){const e={requestUri:oE,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ei(t)}return e}}/**
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
 */class Hp{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ui extends Hp{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class vn extends ui{constructor(){super("facebook.com")}static credential(e){return cr._fromParams({providerId:vn.PROVIDER_ID,signInMethod:vn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return vn.credentialFromTaggedObject(e)}static credentialFromError(e){return vn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return vn.credential(e.oauthAccessToken)}catch{return null}}}vn.FACEBOOK_SIGN_IN_METHOD="facebook.com";vn.PROVIDER_ID="facebook.com";/**
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
 */class Tn extends ui{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return cr._fromParams({providerId:Tn.PROVIDER_ID,signInMethod:Tn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Tn.credentialFromTaggedObject(e)}static credentialFromError(e){return Tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Tn.credential(t,r)}catch{return null}}}Tn.GOOGLE_SIGN_IN_METHOD="google.com";Tn.PROVIDER_ID="google.com";/**
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
 */class In extends ui{constructor(){super("github.com")}static credential(e){return cr._fromParams({providerId:In.PROVIDER_ID,signInMethod:In.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return In.credentialFromTaggedObject(e)}static credentialFromError(e){return In.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return In.credential(e.oauthAccessToken)}catch{return null}}}In.GITHUB_SIGN_IN_METHOD="github.com";In.PROVIDER_ID="github.com";/**
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
 */class wn extends ui{constructor(){super("twitter.com")}static credential(e,t){return cr._fromParams({providerId:wn.PROVIDER_ID,signInMethod:wn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return wn.credentialFromTaggedObject(e)}static credentialFromError(e){return wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return wn.credential(t,r)}catch{return null}}}wn.TWITTER_SIGN_IN_METHOD="twitter.com";wn.PROVIDER_ID="twitter.com";/**
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
 */async function aE(n,e){return Dp(n,"POST","/v1/accounts:signUp",Bu(n,e))}/**
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
 */class qn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await wt._fromIdTokenResponse(e,r,s),o=Af(r);return new qn({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Af(r);return new qn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Af(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */async function L4(n){if(It(n.app))return Promise.reject(Fn(n));const e=qu(n);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new qn({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await aE(e,{returnSecureToken:!0}),r=await qn._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(r.user),r}/**
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
 */class du extends cn{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,du.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new du(e,t,r,s)}}function Gp(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?du._fromErrorAndOperation(n,i,e,r):i})}async function cE(n,e,t=!1){const r=await Js(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return qn._forOperation(n,"link",r)}/**
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
 */async function lE(n,e,t=!1){const{auth:r}=n;if(It(r.app))return Promise.reject(Fn(r));const s="reauthenticate";try{const i=await Js(n,Gp(r,s,e,n),t);te(i.idToken,r,"internal-error");const o=Ac(i.idToken);te(o,r,"internal-error");const{sub:a}=o;return te(n.uid===a,r,"user-mismatch"),qn._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&un(r,"user-mismatch"),i}}/**
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
 */async function hE(n,e,t=!1){if(It(n.app))return Promise.reject(Fn(n));const r="signIn",s=await Gp(n,r,e),i=await qn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}/**
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
 */function U4(n,e){return gt(n).setPersistence(e)}function fE(n,e,t,r){return gt(n).onIdTokenChanged(e,t,r)}function dE(n,e,t){return gt(n).beforeAuthStateChanged(e,t)}function B4(n,e,t,r){return gt(n).onAuthStateChanged(e,t,r)}const pu="__sak";/**
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
 */class Wp{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(pu,"1"),this.storage.removeItem(pu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const pE=1e3,mE=10;class Kp extends Wp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=qp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);G6()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,mE):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},pE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Kp.type="LOCAL";const gE=Kp;/**
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
 */class Qp extends Wp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Qp.type="SESSION";const Jp=Qp;/**
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
 */function _E(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class ju{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ju(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const a=Array.from(o).map(async h=>h(t.origin,i)),c=await _E(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ju.receivers=[];/**
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
 */function xc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class yE{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const h=xc("",20);s.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(m){const _=m;if(_.data.eventId===h)switch(_.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(_.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function jt(){return window}function bE(n){jt().location.href=n}/**
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
 */function Yp(){return typeof jt().WorkerGlobalScope<"u"&&typeof jt().importScripts=="function"}async function EE(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function vE(){return navigator?.serviceWorker?.controller||null}function TE(){return Yp()?self:null}/**
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
 */const Xp="firebaseLocalStorageDb",IE=1,mu="firebaseLocalStorage",Zp="fbase_key";class oi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function zu(n,e){return n.transaction([mu],e?"readwrite":"readonly").objectStore(mu)}function wE(){const n=indexedDB.deleteDatabase(Xp);return new oi(n).toPromise()}function Ea(){const n=indexedDB.open(Xp,IE);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(mu,{keyPath:Zp})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(mu)?e(r):(r.close(),await wE(),e(await Ea()))})})}async function Cf(n,e,t){const r=zu(n,!0).put({[Zp]:e,value:t});return new oi(r).toPromise()}async function AE(n,e){const t=zu(n,!1).get(e),r=await new oi(t).toPromise();return r===void 0?null:r.value}function Sf(n,e){const t=zu(n,!0).delete(e);return new oi(t).toPromise()}const CE=800,SE=3;class e1{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ea(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>SE)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Yp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ju._getInstance(TE()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await EE(),!this.activeServiceWorker)return;this.sender=new yE(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||vE()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ea();return await Cf(e,pu,"1"),await Sf(e,pu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Cf(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>AE(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Sf(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=zu(s,!1).getAll();return new oi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),CE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}e1.type="LOCAL";const xE=e1;new ii(3e4,6e4);/**
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
 */function RE(n,e){return e?en(e):(te(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Rc extends $p{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Vr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Vr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Vr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function DE(n){return hE(n.auth,new Rc(n),n.bypassAuthState)}function PE(n){const{auth:e,user:t}=n;return te(t,e,"internal-error"),lE(t,new Rc(n),n.bypassAuthState)}async function NE(n){const{auth:e,user:t}=n;return te(t,e,"internal-error"),cE(t,new Rc(n),n.bypassAuthState)}/**
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
 */class t1{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return DE;case"linkViaPopup":case"linkViaRedirect":return NE;case"reauthViaPopup":case"reauthViaRedirect":return PE;default:un(this.auth,"internal-error")}}resolve(e){on(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){on(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const FE=new ii(2e3,1e4);class wr extends t1{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,wr.currentPopupAction&&wr.currentPopupAction.cancel(),wr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return te(e,this.auth,"internal-error"),e}async onExecution(){on(this.filter.length===1,"Popup operations only handle one event");const e=xc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(qt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(qt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,wr.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(qt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,FE.get())};e()}}wr.currentPopupAction=null;/**
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
 */const kE="pendingRedirect",Hi=new Map;class VE extends t1{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Hi.get(this.auth._key());if(!e){try{const r=await OE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Hi.set(this.auth._key(),e)}return this.bypassAuthState||Hi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function OE(n,e){const t=UE(e),r=LE(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function ME(n,e){Hi.set(n._key(),e)}function LE(n){return en(n._redirectPersistence)}function UE(n){return $i(kE,n.config.apiKey,n.name)}async function BE(n,e,t=!1){if(It(n.app))return Promise.reject(Fn(n));const r=qu(n),s=RE(r,e),o=await new VE(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const qE=600*1e3;class jE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!zE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!n1(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(qt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=qE&&this.cachedEventUids.clear(),this.cachedEventUids.has(xf(e))}saveEventToCache(e){this.cachedEventUids.add(xf(e)),this.lastProcessedEventTime=Date.now()}}function xf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function n1({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function zE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return n1(n);default:return!1}}/**
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
 */async function $E(n,e={}){return es(n,"GET","/v1/projects",e)}/**
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
 */const HE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,GE=/^https?/;async function WE(n){if(n.config.emulator)return;const{authorizedDomains:e}=await $E(n);for(const t of e)try{if(KE(t))return}catch{}un(n,"unauthorized-domain")}function KE(n){const e=ya(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!GE.test(t))return!1;if(HE.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const QE=new ii(3e4,6e4);function Rf(){const n=jt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function JE(n){return new Promise((e,t)=>{function r(){Rf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Rf(),t(qt(n,"network-request-failed"))},timeout:QE.get()})}if(jt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(jt().gapi?.load)r();else{const s=tE("iframefcb");return jt()[s]=()=>{gapi.load?r():t(qt(n,"network-request-failed"))},Z6(`${eE()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw Gi=null,e})}let Gi=null;function YE(n){return Gi=Gi||JE(n),Gi}/**
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
 */const XE=new ii(5e3,15e3),ZE="__/auth/iframe",e4="emulator/auth/iframe",t4={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},n4=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function r4(n){const e=n.config;te(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?wc(e,e4):`https://${n.config.authDomain}/${ZE}`,r={apiKey:e.apiKey,appName:n.name,v:Kr},s=n4.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${ei(r).slice(1)}`}async function s4(n){const e=await YE(n),t=jt().gapi;return te(t,n,"internal-error"),e.open({where:document.body,url:r4(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:t4,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=qt(n,"network-request-failed"),a=jt().setTimeout(()=>{i(o)},XE.get());function c(){jt().clearTimeout(a),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
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
 */const i4={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},u4=500,o4=600,a4="_blank",c4="http://localhost";class Df{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function l4(n,e,t,r=u4,s=o4){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...i4,width:r.toString(),height:s.toString(),top:i,left:o},h=st().toLowerCase();t&&(a=Op(h)?a4:t),kp(h)&&(e=e||c4,c.scrollbars="yes");const d=Object.entries(c).reduce((_,[S,D])=>`${_}${S}=${D},`,"");if(H6(h)&&a!=="_self")return h4(e||"",a),new Df(null);const m=window.open(e||"",a,d);te(m,n,"popup-blocked");try{m.focus()}catch{}return new Df(m)}function h4(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const f4="__/auth/handler",d4="emulator/auth/handler",p4=encodeURIComponent("fac");async function Pf(n,e,t,r,s,i){te(n.config.authDomain,n,"auth-domain-config-required"),te(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Kr,eventId:s};if(e instanceof Hp){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",b2(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,m]of Object.entries({}))o[d]=m}if(e instanceof ui){const d=e.getScopes().filter(m=>m!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const c=await n._getAppCheckToken(),h=c?`#${p4}=${encodeURIComponent(c)}`:"";return`${m4(n)}?${ei(a).slice(1)}${h}`}function m4({config:n}){return n.emulator?wc(n,d4):`https://${n.authDomain}/${f4}`}/**
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
 */const No="webStorageSupport";class g4{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Jp,this._completeRedirectFn=BE,this._overrideRedirectResult=ME}async _openPopup(e,t,r,s){on(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Pf(e,t,r,ya(),s);return l4(e,i,xc())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Pf(e,t,r,ya(),s);return bE(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(on(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await s4(e),r=new jE(e);return t.register("authEvent",s=>(te(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(No,{type:No},s=>{const i=s?.[0]?.[No];i!==void 0&&t(!!i),un(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=WE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return qp()||Vp()||Cc()}}const _4=g4;var Nf="@firebase/auth",Ff="1.11.0";/**
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
 */class y4{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){te(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function b4(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function E4(n){Lr(new or("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;te(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:jp(n)},h=new Y6(r,s,i,c);return rE(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Lr(new or("auth-internal",e=>{const t=qu(e.getProvider("auth").getImmediate());return(r=>new y4(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),nr(Nf,Ff,b4(n)),nr(Nf,Ff,"esm2020")}/**
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
 */const v4=300,T4=Xd("authIdTokenMaxAge")||v4;let kf=null;const I4=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>T4)return;const s=t?.token;kf!==s&&(kf=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function q4(n=r0()){const e=Ga(n,"auth");if(e.isInitialized())return e.getImmediate();const t=nE(n,{popupRedirectResolver:_4,persistence:[xE,gE,Jp]}),r=Xd("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=I4(i.toString());dE(t,o,()=>o(t.currentUser)),fE(t,a=>o(a))}}const s=Jd("auth");return s&&sE(t,`http://${s}`),t}function w4(){return document.getElementsByTagName("head")?.[0]??document}X6({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=qt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",w4().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});E4("Browser");export{O4 as A,M4 as B,C4 as C,Et as L,Vd as P,f_ as a,l_ as b,wu as c,R4 as d,Au as e,t_ as f,P4 as g,r0 as h,vy as i,k4 as j,q4 as k,gE as l,S4 as m,vf as n,L4 as o,D4 as p,B4 as q,nr as r,U4 as s,A4 as t,x4 as u,Sg as v,fo as w,F4 as x,xm as y,V4 as z};
//# sourceMappingURL=vendor-CGyoh539.js.map
