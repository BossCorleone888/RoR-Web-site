(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function vc(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Ae={},Xr=[],Wt=()=>{},h0=()=>!1,co=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Tc=t=>t.startsWith("onUpdate:"),pt=Object.assign,Ac=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},O1=Object.prototype.hasOwnProperty,be=(t,e)=>O1.call(t,e),ue=Array.isArray,Yr=t=>lo(t)==="[object Map]",f0=t=>lo(t)==="[object Set]",ce=t=>typeof t=="function",Oe=t=>typeof t=="string",lr=t=>typeof t=="symbol",ke=t=>t!==null&&typeof t=="object",d0=t=>(ke(t)||ce(t))&&ce(t.then)&&ce(t.catch),p0=Object.prototype.toString,lo=t=>p0.call(t),M1=t=>lo(t).slice(8,-1),m0=t=>lo(t)==="[object Object]",wc=t=>Oe(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Xi=vc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ho=t=>{const e=Object.create(null);return(n=>e[n]||(e[n]=t(n)))},L1=/-\w/g,Zn=ho(t=>t.replace(L1,e=>e.slice(1).toUpperCase())),U1=/\B([A-Z])/g,Pr=ho(t=>t.replace(U1,"-$1").toLowerCase()),g0=ho(t=>t.charAt(0).toUpperCase()+t.slice(1)),ra=ho(t=>t?`on${g0(t)}`:""),$n=(t,e)=>!Object.is(t,e),bu=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},_0=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},Na=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Ph;const fo=()=>Ph||(Ph=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ic(t){if(ue(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],i=Oe(r)?z1(r):Ic(r);if(i)for(const s in i)e[s]=i[s]}return e}else if(Oe(t)||ke(t))return t}const B1=/;(?![^(]*\))/g,q1=/:([^]+)/,j1=/\/\*[^]*?\*\//g;function z1(t){const e={};return t.replace(j1,"").split(B1).forEach(n=>{if(n){const r=n.split(q1);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Zr(t){let e="";if(Oe(t))e=t;else if(ue(t))for(let n=0;n<t.length;n++){const r=Zr(t[n]);r&&(e+=r+" ")}else if(ke(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const $1="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",H1=vc($1);function y0(t){return!!t||t===""}const b0=t=>!!(t&&t.__v_isRef===!0),ln=t=>Oe(t)?t:t==null?"":ue(t)||ke(t)&&(t.toString===p0||!ce(t.toString))?b0(t)?ln(t.value):JSON.stringify(t,E0,2):String(t),E0=(t,e)=>b0(e)?E0(t,e.value):Yr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,i],s)=>(n[ia(r,s)+" =>"]=i,n),{})}:f0(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>ia(n))}:lr(e)?ia(e):ke(e)&&!ue(e)&&!m0(e)?String(e):e,ia=(t,e="")=>{var n;return lr(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let mt;class W1{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=mt,!e&&mt&&(this.index=(mt.scopes||(mt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=mt;try{return mt=this,e()}finally{mt=n}}}on(){++this._on===1&&(this.prevScope=mt,mt=this)}off(){this._on>0&&--this._on===0&&(mt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function G1(){return mt}let we;const sa=new WeakSet;class v0{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,mt&&mt.active&&mt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,sa.has(this)&&(sa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||A0(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Fh(this),w0(this);const e=we,n=Ot;we=this,Ot=!0;try{return this.fn()}finally{I0(this),we=e,Ot=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Sc(e);this.deps=this.depsTail=void 0,Fh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?sa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Va(this)&&this.run()}get dirty(){return Va(this)}}let T0=0,Yi,Zi;function A0(t,e=!1){if(t.flags|=8,e){t.next=Zi,Zi=t;return}t.next=Yi,Yi=t}function xc(){T0++}function Cc(){if(--T0>0)return;if(Zi){let e=Zi;for(Zi=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Yi;){let e=Yi;for(Yi=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function w0(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function I0(t){let e,n=t.depsTail,r=n;for(;r;){const i=r.prevDep;r.version===-1?(r===n&&(n=i),Sc(r),K1(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=i}t.deps=e,t.depsTail=n}function Va(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(x0(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function x0(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===ls)||(t.globalVersion=ls,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Va(t))))return;t.flags|=2;const e=t.dep,n=we,r=Ot;we=t,Ot=!0;try{w0(t);const i=t.fn(t._value);(e.version===0||$n(i,t._value))&&(t.flags|=128,t._value=i,e.version++)}catch(i){throw e.version++,i}finally{we=n,Ot=r,I0(t),t.flags&=-3}}function Sc(t,e=!1){const{dep:n,prevSub:r,nextSub:i}=t;if(r&&(r.nextSub=i,t.prevSub=void 0),i&&(i.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)Sc(s,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function K1(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Ot=!0;const C0=[];function yn(){C0.push(Ot),Ot=!1}function bn(){const t=C0.pop();Ot=t===void 0?!0:t}function Fh(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=we;we=void 0;try{e()}finally{we=n}}}let ls=0;class Q1{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class kc{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!we||!Ot||we===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==we)n=this.activeLink=new Q1(we,this),we.deps?(n.prevDep=we.depsTail,we.depsTail.nextDep=n,we.depsTail=n):we.deps=we.depsTail=n,S0(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=we.depsTail,n.nextDep=void 0,we.depsTail.nextDep=n,we.depsTail=n,we.deps===n&&(we.deps=r)}return n}trigger(e){this.version++,ls++,this.notify(e)}notify(e){xc();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Cc()}}}function S0(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)S0(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Oa=new WeakMap,wr=Symbol(""),Ma=Symbol(""),hs=Symbol("");function st(t,e,n){if(Ot&&we){let r=Oa.get(t);r||Oa.set(t,r=new Map);let i=r.get(n);i||(r.set(n,i=new kc),i.map=r,i.key=n),i.track()}}function dn(t,e,n,r,i,s){const u=Oa.get(t);if(!u){ls++;return}const a=c=>{c&&c.trigger()};if(xc(),e==="clear")u.forEach(a);else{const c=ue(t),l=c&&wc(n);if(c&&n==="length"){const f=Number(r);u.forEach((p,g)=>{(g==="length"||g===hs||!lr(g)&&g>=f)&&a(p)})}else switch((n!==void 0||u.has(void 0))&&a(u.get(n)),l&&a(u.get(hs)),e){case"add":c?l&&a(u.get("length")):(a(u.get(wr)),Yr(t)&&a(u.get(Ma)));break;case"delete":c||(a(u.get(wr)),Yr(t)&&a(u.get(Ma)));break;case"set":Yr(t)&&a(u.get(wr));break}}Cc()}function jr(t){const e=ye(t);return e===t?e:(st(e,"iterate",hs),St(t)?e:e.map(Je))}function po(t){return st(t=ye(t),"iterate",hs),t}const J1={__proto__:null,[Symbol.iterator](){return ua(this,Symbol.iterator,Je)},concat(...t){return jr(this).concat(...t.map(e=>ue(e)?jr(e):e))},entries(){return ua(this,"entries",t=>(t[1]=Je(t[1]),t))},every(t,e){return cn(this,"every",t,e,void 0,arguments)},filter(t,e){return cn(this,"filter",t,e,n=>n.map(Je),arguments)},find(t,e){return cn(this,"find",t,e,Je,arguments)},findIndex(t,e){return cn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return cn(this,"findLast",t,e,Je,arguments)},findLastIndex(t,e){return cn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return cn(this,"forEach",t,e,void 0,arguments)},includes(...t){return oa(this,"includes",t)},indexOf(...t){return oa(this,"indexOf",t)},join(t){return jr(this).join(t)},lastIndexOf(...t){return oa(this,"lastIndexOf",t)},map(t,e){return cn(this,"map",t,e,void 0,arguments)},pop(){return zi(this,"pop")},push(...t){return zi(this,"push",t)},reduce(t,...e){return Nh(this,"reduce",t,e)},reduceRight(t,...e){return Nh(this,"reduceRight",t,e)},shift(){return zi(this,"shift")},some(t,e){return cn(this,"some",t,e,void 0,arguments)},splice(...t){return zi(this,"splice",t)},toReversed(){return jr(this).toReversed()},toSorted(t){return jr(this).toSorted(t)},toSpliced(...t){return jr(this).toSpliced(...t)},unshift(...t){return zi(this,"unshift",t)},values(){return ua(this,"values",Je)}};function ua(t,e,n){const r=po(t),i=r[e]();return r!==t&&!St(t)&&(i._next=i.next,i.next=()=>{const s=i._next();return s.value&&(s.value=n(s.value)),s}),i}const X1=Array.prototype;function cn(t,e,n,r,i,s){const u=po(t),a=u!==t&&!St(t),c=u[e];if(c!==X1[e]){const p=c.apply(t,s);return a?Je(p):p}let l=n;u!==t&&(a?l=function(p,g){return n.call(this,Je(p),g,t)}:n.length>2&&(l=function(p,g){return n.call(this,p,g,t)}));const f=c.call(u,l,r);return a&&i?i(f):f}function Nh(t,e,n,r){const i=po(t);let s=n;return i!==t&&(St(t)?n.length>3&&(s=function(u,a,c){return n.call(this,u,a,c,t)}):s=function(u,a,c){return n.call(this,u,Je(a),c,t)}),i[e](s,...r)}function oa(t,e,n){const r=ye(t);st(r,"iterate",hs);const i=r[e](...n);return(i===-1||i===!1)&&Fc(n[0])?(n[0]=ye(n[0]),r[e](...n)):i}function zi(t,e,n=[]){yn(),xc();const r=ye(t)[e].apply(t,n);return Cc(),bn(),r}const Y1=vc("__proto__,__v_isRef,__isVue"),k0=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(lr));function Z1(t){lr(t)||(t=String(t));const e=ye(this);return st(e,"has",t),e.hasOwnProperty(t)}class R0{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const i=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!i;if(n==="__v_isReadonly")return i;if(n==="__v_isShallow")return s;if(n==="__v_raw")return r===(i?s?c_:N0:s?F0:P0).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const u=ue(e);if(!i){let c;if(u&&(c=J1[n]))return c;if(n==="hasOwnProperty")return Z1}const a=Reflect.get(e,n,ot(e)?e:r);return(lr(n)?k0.has(n):Y1(n))||(i||st(e,"get",n),s)?a:ot(a)?u&&wc(n)?a:a.value:ke(a)?i?V0(a):Dc(a):a}}class D0 extends R0{constructor(e=!1){super(!1,e)}set(e,n,r,i){let s=e[n];if(!this._isShallow){const c=er(s);if(!St(r)&&!er(r)&&(s=ye(s),r=ye(r)),!ue(e)&&ot(s)&&!ot(r))return c||(s.value=r),!0}const u=ue(e)&&wc(n)?Number(n)<e.length:be(e,n),a=Reflect.set(e,n,r,ot(e)?e:i);return e===ye(i)&&(u?$n(r,s)&&dn(e,"set",n,r):dn(e,"add",n,r)),a}deleteProperty(e,n){const r=be(e,n);e[n];const i=Reflect.deleteProperty(e,n);return i&&r&&dn(e,"delete",n,void 0),i}has(e,n){const r=Reflect.has(e,n);return(!lr(n)||!k0.has(n))&&st(e,"has",n),r}ownKeys(e){return st(e,"iterate",ue(e)?"length":wr),Reflect.ownKeys(e)}}class e_ extends R0{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const t_=new D0,n_=new e_,r_=new D0(!0);const La=t=>t,ou=t=>Reflect.getPrototypeOf(t);function i_(t,e,n){return function(...r){const i=this.__v_raw,s=ye(i),u=Yr(s),a=t==="entries"||t===Symbol.iterator&&u,c=t==="keys"&&u,l=i[t](...r),f=n?La:e?Vu:Je;return!e&&st(s,"iterate",c?Ma:wr),{next(){const{value:p,done:g}=l.next();return g?{value:p,done:g}:{value:a?[f(p[0]),f(p[1])]:f(p),done:g}},[Symbol.iterator](){return this}}}}function au(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function s_(t,e){const n={get(i){const s=this.__v_raw,u=ye(s),a=ye(i);t||($n(i,a)&&st(u,"get",i),st(u,"get",a));const{has:c}=ou(u),l=e?La:t?Vu:Je;if(c.call(u,i))return l(s.get(i));if(c.call(u,a))return l(s.get(a));s!==u&&s.get(i)},get size(){const i=this.__v_raw;return!t&&st(ye(i),"iterate",wr),i.size},has(i){const s=this.__v_raw,u=ye(s),a=ye(i);return t||($n(i,a)&&st(u,"has",i),st(u,"has",a)),i===a?s.has(i):s.has(i)||s.has(a)},forEach(i,s){const u=this,a=u.__v_raw,c=ye(a),l=e?La:t?Vu:Je;return!t&&st(c,"iterate",wr),a.forEach((f,p)=>i.call(s,l(f),l(p),u))}};return pt(n,t?{add:au("add"),set:au("set"),delete:au("delete"),clear:au("clear")}:{add(i){!e&&!St(i)&&!er(i)&&(i=ye(i));const s=ye(this);return ou(s).has.call(s,i)||(s.add(i),dn(s,"add",i,i)),this},set(i,s){!e&&!St(s)&&!er(s)&&(s=ye(s));const u=ye(this),{has:a,get:c}=ou(u);let l=a.call(u,i);l||(i=ye(i),l=a.call(u,i));const f=c.call(u,i);return u.set(i,s),l?$n(s,f)&&dn(u,"set",i,s):dn(u,"add",i,s),this},delete(i){const s=ye(this),{has:u,get:a}=ou(s);let c=u.call(s,i);c||(i=ye(i),c=u.call(s,i)),a&&a.call(s,i);const l=s.delete(i);return c&&dn(s,"delete",i,void 0),l},clear(){const i=ye(this),s=i.size!==0,u=i.clear();return s&&dn(i,"clear",void 0,void 0),u}}),["keys","values","entries",Symbol.iterator].forEach(i=>{n[i]=i_(i,t,e)}),n}function Rc(t,e){const n=s_(t,e);return(r,i,s)=>i==="__v_isReactive"?!t:i==="__v_isReadonly"?t:i==="__v_raw"?r:Reflect.get(be(n,i)&&i in r?n:r,i,s)}const u_={get:Rc(!1,!1)},o_={get:Rc(!1,!0)},a_={get:Rc(!0,!1)};const P0=new WeakMap,F0=new WeakMap,N0=new WeakMap,c_=new WeakMap;function l_(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function h_(t){return t.__v_skip||!Object.isExtensible(t)?0:l_(M1(t))}function Dc(t){return er(t)?t:Pc(t,!1,t_,u_,P0)}function f_(t){return Pc(t,!1,r_,o_,F0)}function V0(t){return Pc(t,!0,n_,a_,N0)}function Pc(t,e,n,r,i){if(!ke(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const s=h_(t);if(s===0)return t;const u=i.get(t);if(u)return u;const a=new Proxy(t,s===2?r:n);return i.set(t,a),a}function ei(t){return er(t)?ei(t.__v_raw):!!(t&&t.__v_isReactive)}function er(t){return!!(t&&t.__v_isReadonly)}function St(t){return!!(t&&t.__v_isShallow)}function Fc(t){return t?!!t.__v_raw:!1}function ye(t){const e=t&&t.__v_raw;return e?ye(e):t}function d_(t){return!be(t,"__v_skip")&&Object.isExtensible(t)&&_0(t,"__v_skip",!0),t}const Je=t=>ke(t)?Dc(t):t,Vu=t=>ke(t)?V0(t):t;function ot(t){return t?t.__v_isRef===!0:!1}function $i(t){return p_(t,!1)}function p_(t,e){return ot(t)?t:new m_(t,e)}class m_{constructor(e,n){this.dep=new kc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:ye(e),this._value=n?e:Je(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||St(e)||er(e);e=r?e:ye(e),$n(e,n)&&(this._rawValue=e,this._value=r?e:Je(e),this.dep.trigger())}}function g_(t){return ot(t)?t.value:t}const __={get:(t,e,n)=>e==="__v_raw"?t:g_(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const i=t[e];return ot(i)&&!ot(n)?(i.value=n,!0):Reflect.set(t,e,n,r)}};function O0(t){return ei(t)?t:new Proxy(t,__)}class y_{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new kc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ls-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&we!==this)return A0(this,!0),!0}get value(){const e=this.dep.track();return x0(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function b_(t,e,n=!1){let r,i;return ce(t)?r=t:(r=t.get,i=t.set),new y_(r,i,n)}const cu={},Ou=new WeakMap;let vr;function E_(t,e=!1,n=vr){if(n){let r=Ou.get(n);r||Ou.set(n,r=[]),r.push(t)}}function v_(t,e,n=Ae){const{immediate:r,deep:i,once:s,scheduler:u,augmentJob:a,call:c}=n,l=k=>i?k:St(k)||i===!1||i===0?pn(k,1):pn(k);let f,p,g,_,b=!1,R=!1;if(ot(t)?(p=()=>t.value,b=St(t)):ei(t)?(p=()=>l(t),b=!0):ue(t)?(R=!0,b=t.some(k=>ei(k)||St(k)),p=()=>t.map(k=>{if(ot(k))return k.value;if(ei(k))return l(k);if(ce(k))return c?c(k,2):k()})):ce(t)?e?p=c?()=>c(t,2):t:p=()=>{if(g){yn();try{g()}finally{bn()}}const k=vr;vr=f;try{return c?c(t,3,[_]):t(_)}finally{vr=k}}:p=Wt,e&&i){const k=p,q=i===!0?1/0:i;p=()=>pn(k(),q)}const N=G1(),B=()=>{f.stop(),N&&N.active&&Ac(N.effects,f)};if(s&&e){const k=e;e=(...q)=>{k(...q),B()}}let V=R?new Array(t.length).fill(cu):cu;const P=k=>{if(!(!(f.flags&1)||!f.dirty&&!k))if(e){const q=f.run();if(i||b||(R?q.some((Q,A)=>$n(Q,V[A])):$n(q,V))){g&&g();const Q=vr;vr=f;try{const A=[q,V===cu?void 0:R&&V[0]===cu?[]:V,_];V=q,c?c(e,3,A):e(...A)}finally{vr=Q}}}else f.run()};return a&&a(P),f=new v0(p),f.scheduler=u?()=>u(P,!1):P,_=k=>E_(k,!1,f),g=f.onStop=()=>{const k=Ou.get(f);if(k){if(c)c(k,4);else for(const q of k)q();Ou.delete(f)}},e?r?P(!0):V=f.run():u?u(P.bind(null,!0),!0):f.run(),B.pause=f.pause.bind(f),B.resume=f.resume.bind(f),B.stop=B,B}function pn(t,e=1/0,n){if(e<=0||!ke(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,ot(t))pn(t.value,e,n);else if(ue(t))for(let r=0;r<t.length;r++)pn(t[r],e,n);else if(f0(t)||Yr(t))t.forEach(r=>{pn(r,e,n)});else if(m0(t)){for(const r in t)pn(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&pn(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ks(t,e,n,r){try{return r?t(...r):t()}catch(i){mo(i,e,n)}}function en(t,e,n,r){if(ce(t)){const i=ks(t,e,n,r);return i&&d0(i)&&i.catch(s=>{mo(s,e,n)}),i}if(ue(t)){const i=[];for(let s=0;s<t.length;s++)i.push(en(t[s],e,n,r));return i}}function mo(t,e,n,r=!0){const i=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:u}=e&&e.appContext.config||Ae;if(e){let a=e.parent;const c=e.proxy,l=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const f=a.ec;if(f){for(let p=0;p<f.length;p++)if(f[p](t,c,l)===!1)return}a=a.parent}if(s){yn(),ks(s,null,10,[t,c,l]),bn();return}}T_(t,n,i,r,u)}function T_(t,e,n,r=!0,i=!1){if(i)throw t;console.error(t)}const ft=[];let qt=-1;const ti=[];let Nn=null,$r=0;const M0=Promise.resolve();let Mu=null;function A_(t){const e=Mu||M0;return t?e.then(this?t.bind(this):t):e}function w_(t){let e=qt+1,n=ft.length;for(;e<n;){const r=e+n>>>1,i=ft[r],s=fs(i);s<t||s===t&&i.flags&2?e=r+1:n=r}return e}function Nc(t){if(!(t.flags&1)){const e=fs(t),n=ft[ft.length-1];!n||!(t.flags&2)&&e>=fs(n)?ft.push(t):ft.splice(w_(e),0,t),t.flags|=1,L0()}}function L0(){Mu||(Mu=M0.then(B0))}function I_(t){ue(t)?ti.push(...t):Nn&&t.id===-1?Nn.splice($r+1,0,t):t.flags&1||(ti.push(t),t.flags|=1),L0()}function Vh(t,e,n=qt+1){for(;n<ft.length;n++){const r=ft[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;ft.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function U0(t){if(ti.length){const e=[...new Set(ti)].sort((n,r)=>fs(n)-fs(r));if(ti.length=0,Nn){Nn.push(...e);return}for(Nn=e,$r=0;$r<Nn.length;$r++){const n=Nn[$r];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Nn=null,$r=0}}const fs=t=>t.id==null?t.flags&2?-1:1/0:t.id;function B0(t){try{for(qt=0;qt<ft.length;qt++){const e=ft[qt];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),ks(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;qt<ft.length;qt++){const e=ft[qt];e&&(e.flags&=-2)}qt=-1,ft.length=0,U0(),Mu=null,(ft.length||ti.length)&&B0()}}let Ct=null,q0=null;function Lu(t){const e=Ct;return Ct=t,q0=t&&t.type.__scopeId||null,e}function x_(t,e=Ct,n){if(!e||t._n)return t;const r=(...i)=>{r._d&&Gh(-1);const s=Lu(e);let u;try{u=t(...i)}finally{Lu(s),r._d&&Gh(1)}return u};return r._n=!0,r._c=!0,r._d=!0,r}function Oh(t,e){if(Ct===null)return t;const n=bo(Ct),r=t.dirs||(t.dirs=[]);for(let i=0;i<e.length;i++){let[s,u,a,c=Ae]=e[i];s&&(ce(s)&&(s={mounted:s,updated:s}),s.deep&&pn(u),r.push({dir:s,instance:n,value:u,oldValue:void 0,arg:a,modifiers:c}))}return t}function br(t,e,n,r){const i=t.dirs,s=e&&e.dirs;for(let u=0;u<i.length;u++){const a=i[u];s&&(a.oldValue=s[u].value);let c=a.dir[r];c&&(yn(),en(c,n,8,[t.el,a,t,e]),bn())}}const C_=Symbol("_vte"),S_=t=>t.__isTeleport,k_=Symbol("_leaveCb");function Vc(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Vc(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function j0(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const Uu=new WeakMap;function es(t,e,n,r,i=!1){if(ue(t)){t.forEach((b,R)=>es(b,e&&(ue(e)?e[R]:e),n,r,i));return}if(ts(r)&&!i){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&es(t,e,n,r.component.subTree);return}const s=r.shapeFlag&4?bo(r.component):r.el,u=i?null:s,{i:a,r:c}=t,l=e&&e.r,f=a.refs===Ae?a.refs={}:a.refs,p=a.setupState,g=ye(p),_=p===Ae?h0:b=>be(g,b);if(l!=null&&l!==c){if(Mh(e),Oe(l))f[l]=null,_(l)&&(p[l]=null);else if(ot(l)){l.value=null;const b=e;b.k&&(f[b.k]=null)}}if(ce(c))ks(c,a,12,[u,f]);else{const b=Oe(c),R=ot(c);if(b||R){const N=()=>{if(t.f){const B=b?_(c)?p[c]:f[c]:c.value;if(i)ue(B)&&Ac(B,s);else if(ue(B))B.includes(s)||B.push(s);else if(b)f[c]=[s],_(c)&&(p[c]=f[c]);else{const V=[s];c.value=V,t.k&&(f[t.k]=V)}}else b?(f[c]=u,_(c)&&(p[c]=u)):R&&(c.value=u,t.k&&(f[t.k]=u))};if(u){const B=()=>{N(),Uu.delete(t)};B.id=-1,Uu.set(t,B),Et(B,n)}else Mh(t),N()}}}function Mh(t){const e=Uu.get(t);e&&(e.flags|=8,Uu.delete(t))}fo().requestIdleCallback;fo().cancelIdleCallback;const ts=t=>!!t.type.__asyncLoader,z0=t=>t.type.__isKeepAlive;function R_(t,e){$0(t,"a",e)}function D_(t,e){$0(t,"da",e)}function $0(t,e,n=dt){const r=t.__wdc||(t.__wdc=()=>{let i=n;for(;i;){if(i.isDeactivated)return;i=i.parent}return t()});if(go(e,r,n),n){let i=n.parent;for(;i&&i.parent;)z0(i.parent.vnode)&&P_(r,e,n,i),i=i.parent}}function P_(t,e,n,r){const i=go(e,t,r,!0);H0(()=>{Ac(r[e],i)},n)}function go(t,e,n=dt,r=!1){if(n){const i=n[t]||(n[t]=[]),s=e.__weh||(e.__weh=(...u)=>{yn();const a=Rs(n),c=en(e,n,t,u);return a(),bn(),c});return r?i.unshift(s):i.push(s),s}}const In=t=>(e,n=dt)=>{(!ps||t==="sp")&&go(t,(...r)=>e(...r),n)},F_=In("bm"),Ua=In("m"),N_=In("bu"),V_=In("u"),O_=In("bum"),H0=In("um"),M_=In("sp"),L_=In("rtg"),U_=In("rtc");function B_(t,e=dt){go("ec",t,e)}const q_=Symbol.for("v-ndc");function Lh(t,e,n,r){let i;const s=n,u=ue(t);if(u||Oe(t)){const a=u&&ei(t);let c=!1,l=!1;a&&(c=!St(t),l=er(t),t=po(t)),i=new Array(t.length);for(let f=0,p=t.length;f<p;f++)i[f]=e(c?l?Vu(Je(t[f])):Je(t[f]):t[f],f,void 0,s)}else if(typeof t=="number"){i=new Array(t);for(let a=0;a<t;a++)i[a]=e(a+1,a,void 0,s)}else if(ke(t))if(t[Symbol.iterator])i=Array.from(t,(a,c)=>e(a,c,void 0,s));else{const a=Object.keys(t);i=new Array(a.length);for(let c=0,l=a.length;c<l;c++){const f=a[c];i[c]=e(t[f],f,c,s)}}else i=[];return i}const Ba=t=>t?fp(t)?bo(t):Ba(t.parent):null,ns=pt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Ba(t.parent),$root:t=>Ba(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>G0(t),$forceUpdate:t=>t.f||(t.f=()=>{Nc(t.update)}),$nextTick:t=>t.n||(t.n=A_.bind(t.proxy)),$watch:t=>c2.bind(t)}),aa=(t,e)=>t!==Ae&&!t.__isScriptSetup&&be(t,e),j_={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:i,props:s,accessCache:u,type:a,appContext:c}=t;let l;if(e[0]!=="$"){const _=u[e];if(_!==void 0)switch(_){case 1:return r[e];case 2:return i[e];case 4:return n[e];case 3:return s[e]}else{if(aa(r,e))return u[e]=1,r[e];if(i!==Ae&&be(i,e))return u[e]=2,i[e];if((l=t.propsOptions[0])&&be(l,e))return u[e]=3,s[e];if(n!==Ae&&be(n,e))return u[e]=4,n[e];qa&&(u[e]=0)}}const f=ns[e];let p,g;if(f)return e==="$attrs"&&st(t.attrs,"get",""),f(t);if((p=a.__cssModules)&&(p=p[e]))return p;if(n!==Ae&&be(n,e))return u[e]=4,n[e];if(g=c.config.globalProperties,be(g,e))return g[e]},set({_:t},e,n){const{data:r,setupState:i,ctx:s}=t;return aa(i,e)?(i[e]=n,!0):r!==Ae&&be(r,e)?(r[e]=n,!0):be(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(s[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:i,propsOptions:s,type:u}},a){let c,l;return!!(n[a]||t!==Ae&&a[0]!=="$"&&be(t,a)||aa(e,a)||(c=s[0])&&be(c,a)||be(r,a)||be(ns,a)||be(i.config.globalProperties,a)||(l=u.__cssModules)&&l[a])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:be(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Uh(t){return ue(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let qa=!0;function z_(t){const e=G0(t),n=t.proxy,r=t.ctx;qa=!1,e.beforeCreate&&Bh(e.beforeCreate,t,"bc");const{data:i,computed:s,methods:u,watch:a,provide:c,inject:l,created:f,beforeMount:p,mounted:g,beforeUpdate:_,updated:b,activated:R,deactivated:N,beforeDestroy:B,beforeUnmount:V,destroyed:P,unmounted:k,render:q,renderTracked:Q,renderTriggered:A,errorCaptured:y,serverPrefetch:E,expose:w,inheritAttrs:x,components:S,directives:T,filters:Ze}=e;if(l&&$_(l,r,null),u)for(const ve in u){const ge=u[ve];ce(ge)&&(r[ve]=ge.bind(n))}if(i){const ve=i.call(n,n);ke(ve)&&(t.data=Dc(ve))}if(qa=!0,s)for(const ve in s){const ge=s[ve],Rt=ce(ge)?ge.bind(n,n):ce(ge.get)?ge.get.bind(n,n):Wt,fr=!ce(ge)&&ce(ge.set)?ge.set.bind(n):Wt,sn=Fn({get:Rt,set:fr});Object.defineProperty(r,ve,{enumerable:!0,configurable:!0,get:()=>sn.value,set:Le=>sn.value=Le})}if(a)for(const ve in a)W0(a[ve],r,n,ve);if(c){const ve=ce(c)?c.call(n):c;Reflect.ownKeys(ve).forEach(ge=>{J_(ge,ve[ge])})}f&&Bh(f,t,"c");function Me(ve,ge){ue(ge)?ge.forEach(Rt=>ve(Rt.bind(n))):ge&&ve(ge.bind(n))}if(Me(F_,p),Me(Ua,g),Me(N_,_),Me(V_,b),Me(R_,R),Me(D_,N),Me(B_,y),Me(U_,Q),Me(L_,A),Me(O_,V),Me(H0,k),Me(M_,E),ue(w))if(w.length){const ve=t.exposed||(t.exposed={});w.forEach(ge=>{Object.defineProperty(ve,ge,{get:()=>n[ge],set:Rt=>n[ge]=Rt,enumerable:!0})})}else t.exposed||(t.exposed={});q&&t.render===Wt&&(t.render=q),x!=null&&(t.inheritAttrs=x),S&&(t.components=S),T&&(t.directives=T),E&&j0(t)}function $_(t,e,n=Wt){ue(t)&&(t=ja(t));for(const r in t){const i=t[r];let s;ke(i)?"default"in i?s=Eu(i.from||r,i.default,!0):s=Eu(i.from||r):s=Eu(i),ot(s)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>s.value,set:u=>s.value=u}):e[r]=s}}function Bh(t,e,n){en(ue(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function W0(t,e,n,r){let i=r.includes(".")?up(n,r):()=>n[r];if(Oe(t)){const s=e[t];ce(s)&&vu(i,s)}else if(ce(t))vu(i,t.bind(n));else if(ke(t))if(ue(t))t.forEach(s=>W0(s,e,n,r));else{const s=ce(t.handler)?t.handler.bind(n):e[t.handler];ce(s)&&vu(i,s,t)}}function G0(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:i,optionsCache:s,config:{optionMergeStrategies:u}}=t.appContext,a=s.get(e);let c;return a?c=a:!i.length&&!n&&!r?c=e:(c={},i.length&&i.forEach(l=>Bu(c,l,u,!0)),Bu(c,e,u)),ke(e)&&s.set(e,c),c}function Bu(t,e,n,r=!1){const{mixins:i,extends:s}=e;s&&Bu(t,s,n,!0),i&&i.forEach(u=>Bu(t,u,n,!0));for(const u in e)if(!(r&&u==="expose")){const a=H_[u]||n&&n[u];t[u]=a?a(t[u],e[u]):e[u]}return t}const H_={data:qh,props:jh,emits:jh,methods:Wi,computed:Wi,beforeCreate:ht,created:ht,beforeMount:ht,mounted:ht,beforeUpdate:ht,updated:ht,beforeDestroy:ht,beforeUnmount:ht,destroyed:ht,unmounted:ht,activated:ht,deactivated:ht,errorCaptured:ht,serverPrefetch:ht,components:Wi,directives:Wi,watch:G_,provide:qh,inject:W_};function qh(t,e){return e?t?function(){return pt(ce(t)?t.call(this,this):t,ce(e)?e.call(this,this):e)}:e:t}function W_(t,e){return Wi(ja(t),ja(e))}function ja(t){if(ue(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function ht(t,e){return t?[...new Set([].concat(t,e))]:e}function Wi(t,e){return t?pt(Object.create(null),t,e):e}function jh(t,e){return t?ue(t)&&ue(e)?[...new Set([...t,...e])]:pt(Object.create(null),Uh(t),Uh(e??{})):e}function G_(t,e){if(!t)return e;if(!e)return t;const n=pt(Object.create(null),t);for(const r in e)n[r]=ht(t[r],e[r]);return n}function K0(){return{app:null,config:{isNativeTag:h0,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let K_=0;function Q_(t,e){return function(r,i=null){ce(r)||(r=pt({},r)),i!=null&&!ke(i)&&(i=null);const s=K0(),u=new WeakSet,a=[];let c=!1;const l=s.app={_uid:K_++,_component:r,_props:i,_container:null,_context:s,_instance:null,version:F2,get config(){return s.config},set config(f){},use(f,...p){return u.has(f)||(f&&ce(f.install)?(u.add(f),f.install(l,...p)):ce(f)&&(u.add(f),f(l,...p))),l},mixin(f){return s.mixins.includes(f)||s.mixins.push(f),l},component(f,p){return p?(s.components[f]=p,l):s.components[f]},directive(f,p){return p?(s.directives[f]=p,l):s.directives[f]},mount(f,p,g){if(!c){const _=l._ceVNode||_n(r,i);return _.appContext=s,g===!0?g="svg":g===!1&&(g=void 0),t(_,f,g),c=!0,l._container=f,f.__vue_app__=l,bo(_.component)}},onUnmount(f){a.push(f)},unmount(){c&&(en(a,l._instance,16),t(null,l._container),delete l._container.__vue_app__)},provide(f,p){return s.provides[f]=p,l},runWithContext(f){const p=ni;ni=l;try{return f()}finally{ni=p}}};return l}}let ni=null;function J_(t,e){if(dt){let n=dt.provides;const r=dt.parent&&dt.parent.provides;r===n&&(n=dt.provides=Object.create(r)),n[t]=e}}function Eu(t,e,n=!1){const r=C2();if(r||ni){let i=ni?ni._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&t in i)return i[t];if(arguments.length>1)return n&&ce(e)?e.call(r&&r.proxy):e}}const Q0={},J0=()=>Object.create(Q0),X0=t=>Object.getPrototypeOf(t)===Q0;function X_(t,e,n,r=!1){const i={},s=J0();t.propsDefaults=Object.create(null),Y0(t,e,i,s);for(const u in t.propsOptions[0])u in i||(i[u]=void 0);n?t.props=r?i:f_(i):t.type.props?t.props=i:t.props=s,t.attrs=s}function Y_(t,e,n,r){const{props:i,attrs:s,vnode:{patchFlag:u}}=t,a=ye(i),[c]=t.propsOptions;let l=!1;if((r||u>0)&&!(u&16)){if(u&8){const f=t.vnode.dynamicProps;for(let p=0;p<f.length;p++){let g=f[p];if(_o(t.emitsOptions,g))continue;const _=e[g];if(c)if(be(s,g))_!==s[g]&&(s[g]=_,l=!0);else{const b=Zn(g);i[b]=za(c,a,b,_,t,!1)}else _!==s[g]&&(s[g]=_,l=!0)}}}else{Y0(t,e,i,s)&&(l=!0);let f;for(const p in a)(!e||!be(e,p)&&((f=Pr(p))===p||!be(e,f)))&&(c?n&&(n[p]!==void 0||n[f]!==void 0)&&(i[p]=za(c,a,p,void 0,t,!0)):delete i[p]);if(s!==a)for(const p in s)(!e||!be(e,p))&&(delete s[p],l=!0)}l&&dn(t.attrs,"set","")}function Y0(t,e,n,r){const[i,s]=t.propsOptions;let u=!1,a;if(e)for(let c in e){if(Xi(c))continue;const l=e[c];let f;i&&be(i,f=Zn(c))?!s||!s.includes(f)?n[f]=l:(a||(a={}))[f]=l:_o(t.emitsOptions,c)||(!(c in r)||l!==r[c])&&(r[c]=l,u=!0)}if(s){const c=ye(n),l=a||Ae;for(let f=0;f<s.length;f++){const p=s[f];n[p]=za(i,c,p,l[p],t,!be(l,p))}}return u}function za(t,e,n,r,i,s){const u=t[n];if(u!=null){const a=be(u,"default");if(a&&r===void 0){const c=u.default;if(u.type!==Function&&!u.skipFactory&&ce(c)){const{propsDefaults:l}=i;if(n in l)r=l[n];else{const f=Rs(i);r=l[n]=c.call(null,e),f()}}else r=c;i.ce&&i.ce._setProp(n,r)}u[0]&&(s&&!a?r=!1:u[1]&&(r===""||r===Pr(n))&&(r=!0))}return r}const Z_=new WeakMap;function Z0(t,e,n=!1){const r=n?Z_:e.propsCache,i=r.get(t);if(i)return i;const s=t.props,u={},a=[];let c=!1;if(!ce(t)){const f=p=>{c=!0;const[g,_]=Z0(p,e,!0);pt(u,g),_&&a.push(..._)};!n&&e.mixins.length&&e.mixins.forEach(f),t.extends&&f(t.extends),t.mixins&&t.mixins.forEach(f)}if(!s&&!c)return ke(t)&&r.set(t,Xr),Xr;if(ue(s))for(let f=0;f<s.length;f++){const p=Zn(s[f]);zh(p)&&(u[p]=Ae)}else if(s)for(const f in s){const p=Zn(f);if(zh(p)){const g=s[f],_=u[p]=ue(g)||ce(g)?{type:g}:pt({},g),b=_.type;let R=!1,N=!0;if(ue(b))for(let B=0;B<b.length;++B){const V=b[B],P=ce(V)&&V.name;if(P==="Boolean"){R=!0;break}else P==="String"&&(N=!1)}else R=ce(b)&&b.name==="Boolean";_[0]=R,_[1]=N,(R||be(_,"default"))&&a.push(p)}}const l=[u,a];return ke(t)&&r.set(t,l),l}function zh(t){return t[0]!=="$"&&!Xi(t)}const Oc=t=>t==="_"||t==="_ctx"||t==="$stable",Mc=t=>ue(t)?t.map(zt):[zt(t)],e2=(t,e,n)=>{if(e._n)return e;const r=x_((...i)=>Mc(e(...i)),n);return r._c=!1,r},ep=(t,e,n)=>{const r=t._ctx;for(const i in t){if(Oc(i))continue;const s=t[i];if(ce(s))e[i]=e2(i,s,r);else if(s!=null){const u=Mc(s);e[i]=()=>u}}},tp=(t,e)=>{const n=Mc(e);t.slots.default=()=>n},np=(t,e,n)=>{for(const r in e)(n||!Oc(r))&&(t[r]=e[r])},t2=(t,e,n)=>{const r=t.slots=J0();if(t.vnode.shapeFlag&32){const i=e._;i?(np(r,e,n),n&&_0(r,"_",i,!0)):ep(e,r)}else e&&tp(t,e)},n2=(t,e,n)=>{const{vnode:r,slots:i}=t;let s=!0,u=Ae;if(r.shapeFlag&32){const a=e._;a?n&&a===1?s=!1:np(i,e,n):(s=!e.$stable,ep(e,i)),u=e}else e&&(tp(t,e),u={default:1});if(s)for(const a in i)!Oc(a)&&u[a]==null&&delete i[a]},Et=_2;function r2(t){return i2(t)}function i2(t,e){const n=fo();n.__VUE__=!0;const{insert:r,remove:i,patchProp:s,createElement:u,createText:a,createComment:c,setText:l,setElementText:f,parentNode:p,nextSibling:g,setScopeId:_=Wt,insertStaticContent:b}=t,R=(v,I,F,j=null,L=null,U=null,G=void 0,H=null,$=!!I.dynamicChildren)=>{if(v===I)return;v&&!Hi(v,I)&&(j=un(v),Le(v,L,U,!0),v=null),I.patchFlag===-2&&($=!1,I.dynamicChildren=null);const{type:z,ref:ee,shapeFlag:K}=I;switch(z){case yo:N(v,I,F,j);break;case tr:B(v,I,F,j);break;case la:v==null&&V(I,F,j,G);break;case Pt:S(v,I,F,j,L,U,G,H,$);break;default:K&1?q(v,I,F,j,L,U,G,H,$):K&6?T(v,I,F,j,L,U,G,H,$):(K&64||K&128)&&z.process(v,I,F,j,L,U,G,H,$,Ut)}ee!=null&&L?es(ee,v&&v.ref,U,I||v,!I):ee==null&&v&&v.ref!=null&&es(v.ref,null,U,v,!0)},N=(v,I,F,j)=>{if(v==null)r(I.el=a(I.children),F,j);else{const L=I.el=v.el;I.children!==v.children&&l(L,I.children)}},B=(v,I,F,j)=>{v==null?r(I.el=c(I.children||""),F,j):I.el=v.el},V=(v,I,F,j)=>{[v.el,v.anchor]=b(v.children,I,F,j,v.el,v.anchor)},P=({el:v,anchor:I},F,j)=>{let L;for(;v&&v!==I;)L=g(v),r(v,F,j),v=L;r(I,F,j)},k=({el:v,anchor:I})=>{let F;for(;v&&v!==I;)F=g(v),i(v),v=F;i(I)},q=(v,I,F,j,L,U,G,H,$)=>{I.type==="svg"?G="svg":I.type==="math"&&(G="mathml"),v==null?Q(I,F,j,L,U,G,H,$):E(v,I,L,U,G,H,$)},Q=(v,I,F,j,L,U,G,H)=>{let $,z;const{props:ee,shapeFlag:K,transition:Y,dirs:re}=v;if($=v.el=u(v.type,U,ee&&ee.is,ee),K&8?f($,v.children):K&16&&y(v.children,$,null,j,L,ca(v,U),G,H),re&&br(v,null,j,"created"),A($,v,v.scopeId,G,j),ee){for(const ae in ee)ae!=="value"&&!Xi(ae)&&s($,ae,null,ee[ae],U,j);"value"in ee&&s($,"value",null,ee.value,U),(z=ee.onVnodeBeforeMount)&&Bt(z,j,v)}re&&br(v,null,j,"beforeMount");const te=s2(L,Y);te&&Y.beforeEnter($),r($,I,F),((z=ee&&ee.onVnodeMounted)||te||re)&&Et(()=>{z&&Bt(z,j,v),te&&Y.enter($),re&&br(v,null,j,"mounted")},L)},A=(v,I,F,j,L)=>{if(F&&_(v,F),j)for(let U=0;U<j.length;U++)_(v,j[U]);if(L){let U=L.subTree;if(I===U||ap(U.type)&&(U.ssContent===I||U.ssFallback===I)){const G=L.vnode;A(v,G,G.scopeId,G.slotScopeIds,L.parent)}}},y=(v,I,F,j,L,U,G,H,$=0)=>{for(let z=$;z<v.length;z++){const ee=v[z]=H?Vn(v[z]):zt(v[z]);R(null,ee,I,F,j,L,U,G,H)}},E=(v,I,F,j,L,U,G)=>{const H=I.el=v.el;let{patchFlag:$,dynamicChildren:z,dirs:ee}=I;$|=v.patchFlag&16;const K=v.props||Ae,Y=I.props||Ae;let re;if(F&&Er(F,!1),(re=Y.onVnodeBeforeUpdate)&&Bt(re,F,I,v),ee&&br(I,v,F,"beforeUpdate"),F&&Er(F,!0),(K.innerHTML&&Y.innerHTML==null||K.textContent&&Y.textContent==null)&&f(H,""),z?w(v.dynamicChildren,z,H,F,j,ca(I,L),U):G||ge(v,I,H,null,F,j,ca(I,L),U,!1),$>0){if($&16)x(H,K,Y,F,L);else if($&2&&K.class!==Y.class&&s(H,"class",null,Y.class,L),$&4&&s(H,"style",K.style,Y.style,L),$&8){const te=I.dynamicProps;for(let ae=0;ae<te.length;ae++){const pe=te[ae],He=K[pe],We=Y[pe];(We!==He||pe==="value")&&s(H,pe,He,We,L,F)}}$&1&&v.children!==I.children&&f(H,I.children)}else!G&&z==null&&x(H,K,Y,F,L);((re=Y.onVnodeUpdated)||ee)&&Et(()=>{re&&Bt(re,F,I,v),ee&&br(I,v,F,"updated")},j)},w=(v,I,F,j,L,U,G)=>{for(let H=0;H<I.length;H++){const $=v[H],z=I[H],ee=$.el&&($.type===Pt||!Hi($,z)||$.shapeFlag&198)?p($.el):F;R($,z,ee,null,j,L,U,G,!0)}},x=(v,I,F,j,L)=>{if(I!==F){if(I!==Ae)for(const U in I)!Xi(U)&&!(U in F)&&s(v,U,I[U],null,L,j);for(const U in F){if(Xi(U))continue;const G=F[U],H=I[U];G!==H&&U!=="value"&&s(v,U,H,G,L,j)}"value"in F&&s(v,"value",I.value,F.value,L)}},S=(v,I,F,j,L,U,G,H,$)=>{const z=I.el=v?v.el:a(""),ee=I.anchor=v?v.anchor:a("");let{patchFlag:K,dynamicChildren:Y,slotScopeIds:re}=I;re&&(H=H?H.concat(re):re),v==null?(r(z,F,j),r(ee,F,j),y(I.children||[],F,ee,L,U,G,H,$)):K>0&&K&64&&Y&&v.dynamicChildren?(w(v.dynamicChildren,Y,F,L,U,G,H),(I.key!=null||L&&I===L.subTree)&&rp(v,I,!0)):ge(v,I,F,ee,L,U,G,H,$)},T=(v,I,F,j,L,U,G,H,$)=>{I.slotScopeIds=H,v==null?I.shapeFlag&512?L.ctx.activate(I,F,j,G,$):Ze(I,F,j,L,U,G,$):ct(v,I,$)},Ze=(v,I,F,j,L,U,G)=>{const H=v.component=x2(v,j,L);if(z0(v)&&(H.ctx.renderer=Ut),S2(H,!1,G),H.asyncDep){if(L&&L.registerDep(H,Me,G),!v.el){const $=H.subTree=_n(tr);B(null,$,I,F),v.placeholder=$.el}}else Me(H,v,I,F,L,U,G)},ct=(v,I,F)=>{const j=I.component=v.component;if(m2(v,I,F))if(j.asyncDep&&!j.asyncResolved){ve(j,I,F);return}else j.next=I,j.update();else I.el=v.el,j.vnode=I},Me=(v,I,F,j,L,U,G)=>{const H=()=>{if(v.isMounted){let{next:K,bu:Y,u:re,parent:te,vnode:ae}=v;{const et=ip(v);if(et){K&&(K.el=ae.el,ve(v,K,G)),et.asyncDep.then(()=>{v.isUnmounted||H()});return}}let pe=K,He;Er(v,!1),K?(K.el=ae.el,ve(v,K,G)):K=ae,Y&&bu(Y),(He=K.props&&K.props.onVnodeBeforeUpdate)&&Bt(He,te,K,ae),Er(v,!0);const We=Hh(v),At=v.subTree;v.subTree=We,R(At,We,p(At.el),un(At),v,L,U),K.el=We.el,pe===null&&g2(v,We.el),re&&Et(re,L),(He=K.props&&K.props.onVnodeUpdated)&&Et(()=>Bt(He,te,K,ae),L)}else{let K;const{el:Y,props:re}=I,{bm:te,m:ae,parent:pe,root:He,type:We}=v,At=ts(I);Er(v,!1),te&&bu(te),!At&&(K=re&&re.onVnodeBeforeMount)&&Bt(K,pe,I),Er(v,!0);{He.ce&&He.ce._def.shadowRoot!==!1&&He.ce._injectChildStyle(We);const et=v.subTree=Hh(v);R(null,et,F,j,v,L,U),I.el=et.el}if(ae&&Et(ae,L),!At&&(K=re&&re.onVnodeMounted)){const et=I;Et(()=>Bt(K,pe,et),L)}(I.shapeFlag&256||pe&&ts(pe.vnode)&&pe.vnode.shapeFlag&256)&&v.a&&Et(v.a,L),v.isMounted=!0,I=F=j=null}};v.scope.on();const $=v.effect=new v0(H);v.scope.off();const z=v.update=$.run.bind($),ee=v.job=$.runIfDirty.bind($);ee.i=v,ee.id=v.uid,$.scheduler=()=>Nc(ee),Er(v,!0),z()},ve=(v,I,F)=>{I.component=v;const j=v.vnode.props;v.vnode=I,v.next=null,Y_(v,I.props,j,F),n2(v,I.children,F),yn(),Vh(v),bn()},ge=(v,I,F,j,L,U,G,H,$=!1)=>{const z=v&&v.children,ee=v?v.shapeFlag:0,K=I.children,{patchFlag:Y,shapeFlag:re}=I;if(Y>0){if(Y&128){fr(z,K,F,j,L,U,G,H,$);return}else if(Y&256){Rt(z,K,F,j,L,U,G,H,$);return}}re&8?(ee&16&&pr(z,L,U),K!==z&&f(F,K)):ee&16?re&16?fr(z,K,F,j,L,U,G,H,$):pr(z,L,U,!0):(ee&8&&f(F,""),re&16&&y(K,F,j,L,U,G,H,$))},Rt=(v,I,F,j,L,U,G,H,$)=>{v=v||Xr,I=I||Xr;const z=v.length,ee=I.length,K=Math.min(z,ee);let Y;for(Y=0;Y<K;Y++){const re=I[Y]=$?Vn(I[Y]):zt(I[Y]);R(v[Y],re,F,null,L,U,G,H,$)}z>ee?pr(v,L,U,!0,!1,K):y(I,F,j,L,U,G,H,$,K)},fr=(v,I,F,j,L,U,G,H,$)=>{let z=0;const ee=I.length;let K=v.length-1,Y=ee-1;for(;z<=K&&z<=Y;){const re=v[z],te=I[z]=$?Vn(I[z]):zt(I[z]);if(Hi(re,te))R(re,te,F,null,L,U,G,H,$);else break;z++}for(;z<=K&&z<=Y;){const re=v[K],te=I[Y]=$?Vn(I[Y]):zt(I[Y]);if(Hi(re,te))R(re,te,F,null,L,U,G,H,$);else break;K--,Y--}if(z>K){if(z<=Y){const re=Y+1,te=re<ee?I[re].el:j;for(;z<=Y;)R(null,I[z]=$?Vn(I[z]):zt(I[z]),F,te,L,U,G,H,$),z++}}else if(z>Y)for(;z<=K;)Le(v[z],L,U,!0),z++;else{const re=z,te=z,ae=new Map;for(z=te;z<=Y;z++){const Ge=I[z]=$?Vn(I[z]):zt(I[z]);Ge.key!=null&&ae.set(Ge.key,z)}let pe,He=0;const We=Y-te+1;let At=!1,et=0;const Cn=new Array(We);for(z=0;z<We;z++)Cn[z]=0;for(z=re;z<=K;z++){const Ge=v[z];if(He>=We){Le(Ge,L,U,!0);continue}let wt;if(Ge.key!=null)wt=ae.get(Ge.key);else for(pe=te;pe<=Y;pe++)if(Cn[pe-te]===0&&Hi(Ge,I[pe])){wt=pe;break}wt===void 0?Le(Ge,L,U,!0):(Cn[wt-te]=z+1,wt>=et?et=wt:At=!0,R(Ge,I[wt],F,null,L,U,G,H,$),He++)}const Ri=At?u2(Cn):Xr;for(pe=Ri.length-1,z=We-1;z>=0;z--){const Ge=te+z,wt=I[Ge],Hs=I[Ge+1],Mr=Ge+1<ee?Hs.el||Hs.placeholder:j;Cn[z]===0?R(null,wt,F,Mr,L,U,G,H,$):At&&(pe<0||z!==Ri[pe]?sn(wt,F,Mr,2):pe--)}}},sn=(v,I,F,j,L=null)=>{const{el:U,type:G,transition:H,children:$,shapeFlag:z}=v;if(z&6){sn(v.component.subTree,I,F,j);return}if(z&128){v.suspense.move(I,F,j);return}if(z&64){G.move(v,I,F,Ut);return}if(G===Pt){r(U,I,F);for(let K=0;K<$.length;K++)sn($[K],I,F,j);r(v.anchor,I,F);return}if(G===la){P(v,I,F);return}if(j!==2&&z&1&&H)if(j===0)H.beforeEnter(U),r(U,I,F),Et(()=>H.enter(U),L);else{const{leave:K,delayLeave:Y,afterLeave:re}=H,te=()=>{v.ctx.isUnmounted?i(U):r(U,I,F)},ae=()=>{U._isLeaving&&U[k_](!0),K(U,()=>{te(),re&&re()})};Y?Y(U,te,ae):ae()}else r(U,I,F)},Le=(v,I,F,j=!1,L=!1)=>{const{type:U,props:G,ref:H,children:$,dynamicChildren:z,shapeFlag:ee,patchFlag:K,dirs:Y,cacheIndex:re}=v;if(K===-2&&(L=!1),H!=null&&(yn(),es(H,null,F,v,!0),bn()),re!=null&&(I.renderCache[re]=void 0),ee&256){I.ctx.deactivate(v);return}const te=ee&1&&Y,ae=!ts(v);let pe;if(ae&&(pe=G&&G.onVnodeBeforeUnmount)&&Bt(pe,I,v),ee&6)dr(v.component,F,j);else{if(ee&128){v.suspense.unmount(F,j);return}te&&br(v,null,I,"beforeUnmount"),ee&64?v.type.remove(v,I,F,Ut,j):z&&!z.hasOnce&&(U!==Pt||K>0&&K&64)?pr(z,I,F,!1,!0):(U===Pt&&K&384||!L&&ee&16)&&pr($,I,F),j&&Ue(v)}(ae&&(pe=G&&G.onVnodeUnmounted)||te)&&Et(()=>{pe&&Bt(pe,I,v),te&&br(v,null,I,"unmounted")},F)},Ue=v=>{const{type:I,el:F,anchor:j,transition:L}=v;if(I===Pt){jo(F,j);return}if(I===la){k(v);return}const U=()=>{i(F),L&&!L.persisted&&L.afterLeave&&L.afterLeave()};if(v.shapeFlag&1&&L&&!L.persisted){const{leave:G,delayLeave:H}=L,$=()=>G(F,U);H?H(v.el,U,$):$()}else U()},jo=(v,I)=>{let F;for(;v!==I;)F=g(v),i(v),v=F;i(I)},dr=(v,I,F)=>{const{bum:j,scope:L,job:U,subTree:G,um:H,m:$,a:z}=v;$h($),$h(z),j&&bu(j),L.stop(),U&&(U.flags|=8,Le(G,v,I,F)),H&&Et(H,I),Et(()=>{v.isUnmounted=!0},I)},pr=(v,I,F,j=!1,L=!1,U=0)=>{for(let G=U;G<v.length;G++)Le(v[G],I,F,j,L)},un=v=>{if(v.shapeFlag&6)return un(v.component.subTree);if(v.shapeFlag&128)return v.suspense.next();const I=g(v.anchor||v.el),F=I&&I[C_];return F?g(F):I};let Si=!1;const $s=(v,I,F)=>{v==null?I._vnode&&Le(I._vnode,null,null,!0):R(I._vnode||null,v,I,null,null,null,F),I._vnode=v,Si||(Si=!0,Vh(),U0(),Si=!1)},Ut={p:R,um:Le,m:sn,r:Ue,mt:Ze,mc:y,pc:ge,pbc:w,n:un,o:t};return{render:$s,hydrate:void 0,createApp:Q_($s)}}function ca({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Er({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function s2(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function rp(t,e,n=!1){const r=t.children,i=e.children;if(ue(r)&&ue(i))for(let s=0;s<r.length;s++){const u=r[s];let a=i[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[s]=Vn(i[s]),a.el=u.el),!n&&a.patchFlag!==-2&&rp(u,a)),a.type===yo&&a.patchFlag!==-1&&(a.el=u.el),a.type===tr&&!a.el&&(a.el=u.el)}}function u2(t){const e=t.slice(),n=[0];let r,i,s,u,a;const c=t.length;for(r=0;r<c;r++){const l=t[r];if(l!==0){if(i=n[n.length-1],t[i]<l){e[r]=i,n.push(r);continue}for(s=0,u=n.length-1;s<u;)a=s+u>>1,t[n[a]]<l?s=a+1:u=a;l<t[n[s]]&&(s>0&&(e[r]=n[s-1]),n[s]=r)}}for(s=n.length,u=n[s-1];s-- >0;)n[s]=u,u=e[u];return n}function ip(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:ip(e)}function $h(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const o2=Symbol.for("v-scx"),a2=()=>Eu(o2);function vu(t,e,n){return sp(t,e,n)}function sp(t,e,n=Ae){const{immediate:r,deep:i,flush:s,once:u}=n,a=pt({},n),c=e&&r||!e&&s!=="post";let l;if(ps){if(s==="sync"){const _=a2();l=_.__watcherHandles||(_.__watcherHandles=[])}else if(!c){const _=()=>{};return _.stop=Wt,_.resume=Wt,_.pause=Wt,_}}const f=dt;a.call=(_,b,R)=>en(_,f,b,R);let p=!1;s==="post"?a.scheduler=_=>{Et(_,f&&f.suspense)}:s!=="sync"&&(p=!0,a.scheduler=(_,b)=>{b?_():Nc(_)}),a.augmentJob=_=>{e&&(_.flags|=4),p&&(_.flags|=2,f&&(_.id=f.uid,_.i=f))};const g=v_(t,e,a);return ps&&(l?l.push(g):c&&g()),g}function c2(t,e,n){const r=this.proxy,i=Oe(t)?t.includes(".")?up(r,t):()=>r[t]:t.bind(r,r);let s;ce(e)?s=e:(s=e.handler,n=e);const u=Rs(this),a=sp(i,s.bind(r),n);return u(),a}function up(t,e){const n=e.split(".");return()=>{let r=t;for(let i=0;i<n.length&&r;i++)r=r[n[i]];return r}}const l2=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Zn(e)}Modifiers`]||t[`${Pr(e)}Modifiers`];function h2(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Ae;let i=n;const s=e.startsWith("update:"),u=s&&l2(r,e.slice(7));u&&(u.trim&&(i=n.map(f=>Oe(f)?f.trim():f)),u.number&&(i=n.map(Na)));let a,c=r[a=ra(e)]||r[a=ra(Zn(e))];!c&&s&&(c=r[a=ra(Pr(e))]),c&&en(c,t,6,i);const l=r[a+"Once"];if(l){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,en(l,t,6,i)}}const f2=new WeakMap;function op(t,e,n=!1){const r=n?f2:e.emitsCache,i=r.get(t);if(i!==void 0)return i;const s=t.emits;let u={},a=!1;if(!ce(t)){const c=l=>{const f=op(l,e,!0);f&&(a=!0,pt(u,f))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!s&&!a?(ke(t)&&r.set(t,null),null):(ue(s)?s.forEach(c=>u[c]=null):pt(u,s),ke(t)&&r.set(t,u),u)}function _o(t,e){return!t||!co(e)?!1:(e=e.slice(2).replace(/Once$/,""),be(t,e[0].toLowerCase()+e.slice(1))||be(t,Pr(e))||be(t,e))}function Hh(t){const{type:e,vnode:n,proxy:r,withProxy:i,propsOptions:[s],slots:u,attrs:a,emit:c,render:l,renderCache:f,props:p,data:g,setupState:_,ctx:b,inheritAttrs:R}=t,N=Lu(t);let B,V;try{if(n.shapeFlag&4){const k=i||r,q=k;B=zt(l.call(q,k,f,p,_,g,b)),V=a}else{const k=e;B=zt(k.length>1?k(p,{attrs:a,slots:u,emit:c}):k(p,null)),V=e.props?a:d2(a)}}catch(k){rs.length=0,mo(k,t,1),B=_n(tr)}let P=B;if(V&&R!==!1){const k=Object.keys(V),{shapeFlag:q}=P;k.length&&q&7&&(s&&k.some(Tc)&&(V=p2(V,s)),P=ai(P,V,!1,!0))}return n.dirs&&(P=ai(P,null,!1,!0),P.dirs=P.dirs?P.dirs.concat(n.dirs):n.dirs),n.transition&&Vc(P,n.transition),B=P,Lu(N),B}const d2=t=>{let e;for(const n in t)(n==="class"||n==="style"||co(n))&&((e||(e={}))[n]=t[n]);return e},p2=(t,e)=>{const n={};for(const r in t)(!Tc(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function m2(t,e,n){const{props:r,children:i,component:s}=t,{props:u,children:a,patchFlag:c}=e,l=s.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Wh(r,u,l):!!u;if(c&8){const f=e.dynamicProps;for(let p=0;p<f.length;p++){const g=f[p];if(u[g]!==r[g]&&!_o(l,g))return!0}}}else return(i||a)&&(!a||!a.$stable)?!0:r===u?!1:r?u?Wh(r,u,l):!0:!!u;return!1}function Wh(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let i=0;i<r.length;i++){const s=r[i];if(e[s]!==t[s]&&!_o(n,s))return!0}return!1}function g2({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const ap=t=>t.__isSuspense;function _2(t,e){e&&e.pendingBranch?ue(t)?e.effects.push(...t):e.effects.push(t):I_(t)}const Pt=Symbol.for("v-fgt"),yo=Symbol.for("v-txt"),tr=Symbol.for("v-cmt"),la=Symbol.for("v-stc"),rs=[];let vt=null;function hn(t=!1){rs.push(vt=t?null:[])}function y2(){rs.pop(),vt=rs[rs.length-1]||null}let ds=1;function Gh(t,e=!1){ds+=t,t<0&&vt&&e&&(vt.hasOnce=!0)}function cp(t){return t.dynamicChildren=ds>0?vt||Xr:null,y2(),ds>0&&vt&&vt.push(t),t}function Dn(t,e,n,r,i,s){return cp(le(t,e,n,r,i,s,!0))}function b2(t,e,n,r,i){return cp(_n(t,e,n,r,i,!0))}function lp(t){return t?t.__v_isVNode===!0:!1}function Hi(t,e){return t.type===e.type&&t.key===e.key}const hp=({key:t})=>t??null,Tu=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Oe(t)||ot(t)||ce(t)?{i:Ct,r:t,k:e,f:!!n}:t:null);function le(t,e=null,n=null,r=0,i=null,s=t===Pt?0:1,u=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&hp(e),ref:e&&Tu(e),scopeId:q0,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:Ct};return a?(Lc(c,n),s&128&&t.normalize(c)):n&&(c.shapeFlag|=Oe(n)?8:16),ds>0&&!u&&vt&&(c.patchFlag>0||s&6)&&c.patchFlag!==32&&vt.push(c),c}const _n=E2;function E2(t,e=null,n=null,r=0,i=null,s=!1){if((!t||t===q_)&&(t=tr),lp(t)){const a=ai(t,e,!0);return n&&Lc(a,n),ds>0&&!s&&vt&&(a.shapeFlag&6?vt[vt.indexOf(t)]=a:vt.push(a)),a.patchFlag=-2,a}if(P2(t)&&(t=t.__vccOpts),e){e=v2(e);let{class:a,style:c}=e;a&&!Oe(a)&&(e.class=Zr(a)),ke(c)&&(Fc(c)&&!ue(c)&&(c=pt({},c)),e.style=Ic(c))}const u=Oe(t)?1:ap(t)?128:S_(t)?64:ke(t)?4:ce(t)?2:0;return le(t,e,n,r,i,u,s,!0)}function v2(t){return t?Fc(t)||X0(t)?pt({},t):t:null}function ai(t,e,n=!1,r=!1){const{props:i,ref:s,patchFlag:u,children:a,transition:c}=t,l=e?A2(i||{},e):i,f={__v_isVNode:!0,__v_skip:!0,type:t.type,props:l,key:l&&hp(l),ref:e&&e.ref?n&&s?ue(s)?s.concat(Tu(e)):[s,Tu(e)]:Tu(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:a,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Pt?u===-1?16:u|16:u,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:c,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&ai(t.ssContent),ssFallback:t.ssFallback&&ai(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return c&&r&&Vc(f,c.clone(f)),f}function Au(t=" ",e=0){return _n(yo,null,t,e)}function T2(t="",e=!1){return e?(hn(),b2(tr,null,t)):_n(tr,null,t)}function zt(t){return t==null||typeof t=="boolean"?_n(tr):ue(t)?_n(Pt,null,t.slice()):lp(t)?Vn(t):_n(yo,null,String(t))}function Vn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:ai(t)}function Lc(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(ue(e))n=16;else if(typeof e=="object")if(r&65){const i=e.default;i&&(i._c&&(i._d=!1),Lc(t,i()),i._c&&(i._d=!0));return}else{n=32;const i=e._;!i&&!X0(e)?e._ctx=Ct:i===3&&Ct&&(Ct.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else ce(e)?(e={default:e,_ctx:Ct},n=32):(e=String(e),r&64?(n=16,e=[Au(e)]):n=8);t.children=e,t.shapeFlag|=n}function A2(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const i in r)if(i==="class")e.class!==r.class&&(e.class=Zr([e.class,r.class]));else if(i==="style")e.style=Ic([e.style,r.style]);else if(co(i)){const s=e[i],u=r[i];u&&s!==u&&!(ue(s)&&s.includes(u))&&(e[i]=s?[].concat(s,u):u)}else i!==""&&(e[i]=r[i])}return e}function Bt(t,e,n,r=null){en(t,e,7,[n,r])}const w2=K0();let I2=0;function x2(t,e,n){const r=t.type,i=(e?e.appContext:t.appContext)||w2,s={uid:I2++,vnode:t,type:r,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new W1(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Z0(r,i),emitsOptions:op(r,i),emit:null,emitted:null,propsDefaults:Ae,inheritAttrs:r.inheritAttrs,ctx:Ae,data:Ae,props:Ae,attrs:Ae,slots:Ae,refs:Ae,setupState:Ae,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=h2.bind(null,s),t.ce&&t.ce(s),s}let dt=null;const C2=()=>dt||Ct;let qu,$a;{const t=fo(),e=(n,r)=>{let i;return(i=t[n])||(i=t[n]=[]),i.push(r),s=>{i.length>1?i.forEach(u=>u(s)):i[0](s)}};qu=e("__VUE_INSTANCE_SETTERS__",n=>dt=n),$a=e("__VUE_SSR_SETTERS__",n=>ps=n)}const Rs=t=>{const e=dt;return qu(t),t.scope.on(),()=>{t.scope.off(),qu(e)}},Kh=()=>{dt&&dt.scope.off(),qu(null)};function fp(t){return t.vnode.shapeFlag&4}let ps=!1;function S2(t,e=!1,n=!1){e&&$a(e);const{props:r,children:i}=t.vnode,s=fp(t);X_(t,r,s,e),t2(t,i,n||e);const u=s?k2(t,e):void 0;return e&&$a(!1),u}function k2(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,j_);const{setup:r}=n;if(r){yn();const i=t.setupContext=r.length>1?D2(t):null,s=Rs(t),u=ks(r,t,0,[t.props,i]),a=d0(u);if(bn(),s(),(a||t.sp)&&!ts(t)&&j0(t),a){if(u.then(Kh,Kh),e)return u.then(c=>{Qh(t,c)}).catch(c=>{mo(c,t,0)});t.asyncDep=u}else Qh(t,u)}else dp(t)}function Qh(t,e,n){ce(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:ke(e)&&(t.setupState=O0(e)),dp(t)}function dp(t,e,n){const r=t.type;t.render||(t.render=r.render||Wt);{const i=Rs(t);yn();try{z_(t)}finally{bn(),i()}}}const R2={get(t,e){return st(t,"get",""),t[e]}};function D2(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,R2),slots:t.slots,emit:t.emit,expose:e}}function bo(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(O0(d_(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in ns)return ns[n](t)},has(e,n){return n in e||n in ns}})):t.proxy}function P2(t){return ce(t)&&"__vccOpts"in t}const Fn=(t,e)=>b_(t,e,ps),F2="3.5.21";/**
* @vue/runtime-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ha;const Jh=typeof window<"u"&&window.trustedTypes;if(Jh)try{Ha=Jh.createPolicy("vue",{createHTML:t=>t})}catch{}const pp=Ha?t=>Ha.createHTML(t):t=>t,N2="http://www.w3.org/2000/svg",V2="http://www.w3.org/1998/Math/MathML",fn=typeof document<"u"?document:null,Xh=fn&&fn.createElement("template"),O2={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const i=e==="svg"?fn.createElementNS(N2,t):e==="mathml"?fn.createElementNS(V2,t):n?fn.createElement(t,{is:n}):fn.createElement(t);return t==="select"&&r&&r.multiple!=null&&i.setAttribute("multiple",r.multiple),i},createText:t=>fn.createTextNode(t),createComment:t=>fn.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>fn.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,i,s){const u=n?n.previousSibling:e.lastChild;if(i&&(i===s||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),n),!(i===s||!(i=i.nextSibling)););else{Xh.innerHTML=pp(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const a=Xh.content;if(r==="svg"||r==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}e.insertBefore(a,n)}return[u?u.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},M2=Symbol("_vtc");function L2(t,e,n){const r=t[M2];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const Yh=Symbol("_vod"),U2=Symbol("_vsh"),B2=Symbol(""),q2=/(?:^|;)\s*display\s*:/;function j2(t,e,n){const r=t.style,i=Oe(n);let s=!1;if(n&&!i){if(e)if(Oe(e))for(const u of e.split(";")){const a=u.slice(0,u.indexOf(":")).trim();n[a]==null&&wu(r,a,"")}else for(const u in e)n[u]==null&&wu(r,u,"");for(const u in n)u==="display"&&(s=!0),wu(r,u,n[u])}else if(i){if(e!==n){const u=r[B2];u&&(n+=";"+u),r.cssText=n,s=q2.test(n)}}else e&&t.removeAttribute("style");Yh in t&&(t[Yh]=s?r.display:"",t[U2]&&(r.display="none"))}const Zh=/\s*!important$/;function wu(t,e,n){if(ue(n))n.forEach(r=>wu(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=z2(t,e);Zh.test(n)?t.setProperty(Pr(r),n.replace(Zh,""),"important"):t[r]=n}}const ef=["Webkit","Moz","ms"],ha={};function z2(t,e){const n=ha[e];if(n)return n;let r=Zn(e);if(r!=="filter"&&r in t)return ha[e]=r;r=g0(r);for(let i=0;i<ef.length;i++){const s=ef[i]+r;if(s in t)return ha[e]=s}return e}const tf="http://www.w3.org/1999/xlink";function nf(t,e,n,r,i,s=H1(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(tf,e.slice(6,e.length)):t.setAttributeNS(tf,e,n):n==null||s&&!y0(n)?t.removeAttribute(e):t.setAttribute(e,s?"":lr(n)?String(n):n)}function rf(t,e,n,r,i){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?pp(n):n);return}const s=t.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?t.getAttribute("value")||"":t.value,c=n==null?t.type==="checkbox"?"on":"":String(n);(a!==c||!("_value"in t))&&(t.value=c),n==null&&t.removeAttribute(e),t._value=n;return}let u=!1;if(n===""||n==null){const a=typeof t[e];a==="boolean"?n=y0(n):n==null&&a==="string"?(n="",u=!0):a==="number"&&(n=0,u=!0)}try{t[e]=n}catch{}u&&t.removeAttribute(i||e)}function Hr(t,e,n,r){t.addEventListener(e,n,r)}function $2(t,e,n,r){t.removeEventListener(e,n,r)}const sf=Symbol("_vei");function H2(t,e,n,r,i=null){const s=t[sf]||(t[sf]={}),u=s[e];if(r&&u)u.value=r;else{const[a,c]=W2(e);if(r){const l=s[e]=Q2(r,i);Hr(t,a,l,c)}else u&&($2(t,a,u,c),s[e]=void 0)}}const uf=/(?:Once|Passive|Capture)$/;function W2(t){let e;if(uf.test(t)){e={};let r;for(;r=t.match(uf);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Pr(t.slice(2)),e]}let fa=0;const G2=Promise.resolve(),K2=()=>fa||(G2.then(()=>fa=0),fa=Date.now());function Q2(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;en(J2(r,n.value),e,5,[r])};return n.value=t,n.attached=K2(),n}function J2(t,e){if(ue(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>i=>!i._stopped&&r&&r(i))}else return e}const of=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,X2=(t,e,n,r,i,s)=>{const u=i==="svg";e==="class"?L2(t,r,u):e==="style"?j2(t,n,r):co(e)?Tc(e)||H2(t,e,n,r,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Y2(t,e,r,u))?(rf(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&nf(t,e,r,u,s,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!Oe(r))?rf(t,Zn(e),r,s,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),nf(t,e,r,u))};function Y2(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&of(e)&&ce(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=t.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return of(e)&&Oe(n)?!1:e in t}const af=t=>{const e=t.props["onUpdate:modelValue"]||!1;return ue(e)?n=>bu(e,n):e};function Z2(t){t.target.composing=!0}function cf(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const da=Symbol("_assign"),lf={created(t,{modifiers:{lazy:e,trim:n,number:r}},i){t[da]=af(i);const s=r||i.props&&i.props.type==="number";Hr(t,e?"change":"input",u=>{if(u.target.composing)return;let a=t.value;n&&(a=a.trim()),s&&(a=Na(a)),t[da](a)}),n&&Hr(t,"change",()=>{t.value=t.value.trim()}),e||(Hr(t,"compositionstart",Z2),Hr(t,"compositionend",cf),Hr(t,"change",cf))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:i,number:s}},u){if(t[da]=af(u),t.composing)return;const a=(s||t.type==="number")&&!/^0\d/.test(t.value)?Na(t.value):t.value,c=e??"";a!==c&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||i&&t.value.trim()===c)||(t.value=c))}},ey=["ctrl","shift","alt","meta"],ty={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>ey.some(n=>t[`${n}Key`]&&!e.includes(n))},hf=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=((i,...s)=>{for(let u=0;u<e.length;u++){const a=ty[e[u]];if(a&&a(i,e))return}return t(i,...s)}))},ny=pt({patchProp:X2},O2);let ff;function ry(){return ff||(ff=r2(ny))}const iy=((...t)=>{const e=ry().createApp(...t),{mount:n}=e;return e.mount=r=>{const i=uy(r);if(!i)return;const s=e._component;!ce(s)&&!s.render&&!s.template&&(s.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const u=n(i,!1,sy(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),u},e});function sy(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function uy(t){return Oe(t)?document.querySelector(t):t}const oy="modulepreload",ay=function(t){return"/RoR-Web-site/"+t},df={},lu=function(e,n,r){let i=Promise.resolve();if(n&&n.length>0){let l=function(f){return Promise.all(f.map(p=>Promise.resolve(p).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};var u=l;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");i=l(n.map(f=>{if(f=ay(f),f in df)return;df[f]=!0;const p=f.endsWith(".css"),g=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${g}`))return;const _=document.createElement("link");if(_.rel=p?"stylesheet":oy,p||(_.as="script"),_.crossOrigin="",_.href=f,c&&_.setAttribute("nonce",c),document.head.appendChild(_),p)return new Promise((b,R)=>{_.addEventListener("load",b),_.addEventListener("error",()=>R(new Error(`Unable to preload CSS for ${f}`)))})}))}function s(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return i.then(a=>{for(const c of a||[])c.status==="rejected"&&s(c.reason);return e().catch(s)})},pf={};function cy(t){let e=pf[t];if(e)return e;e=pf[t]=[];for(let n=0;n<128;n++){const r=String.fromCharCode(n);e.push(r)}for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);e[r]="%"+("0"+r.toString(16).toUpperCase()).slice(-2)}return e}function ci(t,e){typeof e!="string"&&(e=ci.defaultChars);const n=cy(e);return t.replace(/(%[a-f0-9]{2})+/gi,function(r){let i="";for(let s=0,u=r.length;s<u;s+=3){const a=parseInt(r.slice(s+1,s+3),16);if(a<128){i+=n[a];continue}if((a&224)===192&&s+3<u){const c=parseInt(r.slice(s+4,s+6),16);if((c&192)===128){const l=a<<6&1984|c&63;l<128?i+="��":i+=String.fromCharCode(l),s+=3;continue}}if((a&240)===224&&s+6<u){const c=parseInt(r.slice(s+4,s+6),16),l=parseInt(r.slice(s+7,s+9),16);if((c&192)===128&&(l&192)===128){const f=a<<12&61440|c<<6&4032|l&63;f<2048||f>=55296&&f<=57343?i+="���":i+=String.fromCharCode(f),s+=6;continue}}if((a&248)===240&&s+9<u){const c=parseInt(r.slice(s+4,s+6),16),l=parseInt(r.slice(s+7,s+9),16),f=parseInt(r.slice(s+10,s+12),16);if((c&192)===128&&(l&192)===128&&(f&192)===128){let p=a<<18&1835008|c<<12&258048|l<<6&4032|f&63;p<65536||p>1114111?i+="����":(p-=65536,i+=String.fromCharCode(55296+(p>>10),56320+(p&1023))),s+=9;continue}}i+="�"}return i})}ci.defaultChars=";/?:@&=+$,#";ci.componentChars="";const mf={};function ly(t){let e=mf[t];if(e)return e;e=mf[t]=[];for(let n=0;n<128;n++){const r=String.fromCharCode(n);/^[0-9a-z]$/i.test(r)?e.push(r):e.push("%"+("0"+n.toString(16).toUpperCase()).slice(-2))}for(let n=0;n<t.length;n++)e[t.charCodeAt(n)]=t[n];return e}function Ds(t,e,n){typeof e!="string"&&(n=e,e=Ds.defaultChars),typeof n>"u"&&(n=!0);const r=ly(e);let i="";for(let s=0,u=t.length;s<u;s++){const a=t.charCodeAt(s);if(n&&a===37&&s+2<u&&/^[0-9a-f]{2}$/i.test(t.slice(s+1,s+3))){i+=t.slice(s,s+3),s+=2;continue}if(a<128){i+=r[a];continue}if(a>=55296&&a<=57343){if(a>=55296&&a<=56319&&s+1<u){const c=t.charCodeAt(s+1);if(c>=56320&&c<=57343){i+=encodeURIComponent(t[s]+t[s+1]),s++;continue}}i+="%EF%BF%BD";continue}i+=encodeURIComponent(t[s])}return i}Ds.defaultChars=";/?:@&=+$,-_.!~*'()#";Ds.componentChars="-_.!~*'()";function Uc(t){let e="";return e+=t.protocol||"",e+=t.slashes?"//":"",e+=t.auth?t.auth+"@":"",t.hostname&&t.hostname.indexOf(":")!==-1?e+="["+t.hostname+"]":e+=t.hostname||"",e+=t.port?":"+t.port:"",e+=t.pathname||"",e+=t.search||"",e+=t.hash||"",e}function ju(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const hy=/^([a-z0-9.+-]+:)/i,fy=/:[0-9]*$/,dy=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,py=["<",">",'"',"`"," ","\r",`
`,"	"],my=["{","}","|","\\","^","`"].concat(py),gy=["'"].concat(my),gf=["%","/","?",";","#"].concat(gy),_f=["/","?","#"],_y=255,yf=/^[+a-z0-9A-Z_-]{0,63}$/,yy=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,bf={javascript:!0,"javascript:":!0},Ef={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Bc(t,e){if(t&&t instanceof ju)return t;const n=new ju;return n.parse(t,e),n}ju.prototype.parse=function(t,e){let n,r,i,s=t;if(s=s.trim(),!e&&t.split("#").length===1){const l=dy.exec(s);if(l)return this.pathname=l[1],l[2]&&(this.search=l[2]),this}let u=hy.exec(s);if(u&&(u=u[0],n=u.toLowerCase(),this.protocol=u,s=s.substr(u.length)),(e||u||s.match(/^\/\/[^@\/]+@[^@\/]+/))&&(i=s.substr(0,2)==="//",i&&!(u&&bf[u])&&(s=s.substr(2),this.slashes=!0)),!bf[u]&&(i||u&&!Ef[u])){let l=-1;for(let b=0;b<_f.length;b++)r=s.indexOf(_f[b]),r!==-1&&(l===-1||r<l)&&(l=r);let f,p;l===-1?p=s.lastIndexOf("@"):p=s.lastIndexOf("@",l),p!==-1&&(f=s.slice(0,p),s=s.slice(p+1),this.auth=f),l=-1;for(let b=0;b<gf.length;b++)r=s.indexOf(gf[b]),r!==-1&&(l===-1||r<l)&&(l=r);l===-1&&(l=s.length),s[l-1]===":"&&l--;const g=s.slice(0,l);s=s.slice(l),this.parseHost(g),this.hostname=this.hostname||"";const _=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!_){const b=this.hostname.split(/\./);for(let R=0,N=b.length;R<N;R++){const B=b[R];if(B&&!B.match(yf)){let V="";for(let P=0,k=B.length;P<k;P++)B.charCodeAt(P)>127?V+="x":V+=B[P];if(!V.match(yf)){const P=b.slice(0,R),k=b.slice(R+1),q=B.match(yy);q&&(P.push(q[1]),k.unshift(q[2])),k.length&&(s=k.join(".")+s),this.hostname=P.join(".");break}}}}this.hostname.length>_y&&(this.hostname=""),_&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const a=s.indexOf("#");a!==-1&&(this.hash=s.substr(a),s=s.slice(0,a));const c=s.indexOf("?");return c!==-1&&(this.search=s.substr(c),s=s.slice(0,c)),s&&(this.pathname=s),Ef[n]&&this.hostname&&!this.pathname&&(this.pathname=""),this};ju.prototype.parseHost=function(t){let e=fy.exec(t);e&&(e=e[0],e!==":"&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)};const by=Object.freeze(Object.defineProperty({__proto__:null,decode:ci,encode:Ds,format:Uc,parse:Bc},Symbol.toStringTag,{value:"Module"})),mp=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,gp=/[\0-\x1F\x7F-\x9F]/,Ey=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,qc=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,_p=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,yp=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,vy=Object.freeze(Object.defineProperty({__proto__:null,Any:mp,Cc:gp,Cf:Ey,P:qc,S:_p,Z:yp},Symbol.toStringTag,{value:"Module"})),Ty=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(t=>t.charCodeAt(0))),Ay=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(t=>t.charCodeAt(0)));var pa;const wy=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),Iy=(pa=String.fromCodePoint)!==null&&pa!==void 0?pa:function(t){let e="";return t>65535&&(t-=65536,e+=String.fromCharCode(t>>>10&1023|55296),t=56320|t&1023),e+=String.fromCharCode(t),e};function xy(t){var e;return t>=55296&&t<=57343||t>1114111?65533:(e=wy.get(t))!==null&&e!==void 0?e:t}var $e;(function(t){t[t.NUM=35]="NUM",t[t.SEMI=59]="SEMI",t[t.EQUALS=61]="EQUALS",t[t.ZERO=48]="ZERO",t[t.NINE=57]="NINE",t[t.LOWER_A=97]="LOWER_A",t[t.LOWER_F=102]="LOWER_F",t[t.LOWER_X=120]="LOWER_X",t[t.LOWER_Z=122]="LOWER_Z",t[t.UPPER_A=65]="UPPER_A",t[t.UPPER_F=70]="UPPER_F",t[t.UPPER_Z=90]="UPPER_Z"})($e||($e={}));const Cy=32;var jn;(function(t){t[t.VALUE_LENGTH=49152]="VALUE_LENGTH",t[t.BRANCH_LENGTH=16256]="BRANCH_LENGTH",t[t.JUMP_TABLE=127]="JUMP_TABLE"})(jn||(jn={}));function Wa(t){return t>=$e.ZERO&&t<=$e.NINE}function Sy(t){return t>=$e.UPPER_A&&t<=$e.UPPER_F||t>=$e.LOWER_A&&t<=$e.LOWER_F}function ky(t){return t>=$e.UPPER_A&&t<=$e.UPPER_Z||t>=$e.LOWER_A&&t<=$e.LOWER_Z||Wa(t)}function Ry(t){return t===$e.EQUALS||ky(t)}var je;(function(t){t[t.EntityStart=0]="EntityStart",t[t.NumericStart=1]="NumericStart",t[t.NumericDecimal=2]="NumericDecimal",t[t.NumericHex=3]="NumericHex",t[t.NamedEntity=4]="NamedEntity"})(je||(je={}));var Mn;(function(t){t[t.Legacy=0]="Legacy",t[t.Strict=1]="Strict",t[t.Attribute=2]="Attribute"})(Mn||(Mn={}));class Dy{constructor(e,n,r){this.decodeTree=e,this.emitCodePoint=n,this.errors=r,this.state=je.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=Mn.Strict}startEntity(e){this.decodeMode=e,this.state=je.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(e,n){switch(this.state){case je.EntityStart:return e.charCodeAt(n)===$e.NUM?(this.state=je.NumericStart,this.consumed+=1,this.stateNumericStart(e,n+1)):(this.state=je.NamedEntity,this.stateNamedEntity(e,n));case je.NumericStart:return this.stateNumericStart(e,n);case je.NumericDecimal:return this.stateNumericDecimal(e,n);case je.NumericHex:return this.stateNumericHex(e,n);case je.NamedEntity:return this.stateNamedEntity(e,n)}}stateNumericStart(e,n){return n>=e.length?-1:(e.charCodeAt(n)|Cy)===$e.LOWER_X?(this.state=je.NumericHex,this.consumed+=1,this.stateNumericHex(e,n+1)):(this.state=je.NumericDecimal,this.stateNumericDecimal(e,n))}addToNumericResult(e,n,r,i){if(n!==r){const s=r-n;this.result=this.result*Math.pow(i,s)+parseInt(e.substr(n,s),i),this.consumed+=s}}stateNumericHex(e,n){const r=n;for(;n<e.length;){const i=e.charCodeAt(n);if(Wa(i)||Sy(i))n+=1;else return this.addToNumericResult(e,r,n,16),this.emitNumericEntity(i,3)}return this.addToNumericResult(e,r,n,16),-1}stateNumericDecimal(e,n){const r=n;for(;n<e.length;){const i=e.charCodeAt(n);if(Wa(i))n+=1;else return this.addToNumericResult(e,r,n,10),this.emitNumericEntity(i,2)}return this.addToNumericResult(e,r,n,10),-1}emitNumericEntity(e,n){var r;if(this.consumed<=n)return(r=this.errors)===null||r===void 0||r.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(e===$e.SEMI)this.consumed+=1;else if(this.decodeMode===Mn.Strict)return 0;return this.emitCodePoint(xy(this.result),this.consumed),this.errors&&(e!==$e.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(e,n){const{decodeTree:r}=this;let i=r[this.treeIndex],s=(i&jn.VALUE_LENGTH)>>14;for(;n<e.length;n++,this.excess++){const u=e.charCodeAt(n);if(this.treeIndex=Py(r,i,this.treeIndex+Math.max(1,s),u),this.treeIndex<0)return this.result===0||this.decodeMode===Mn.Attribute&&(s===0||Ry(u))?0:this.emitNotTerminatedNamedEntity();if(i=r[this.treeIndex],s=(i&jn.VALUE_LENGTH)>>14,s!==0){if(u===$e.SEMI)return this.emitNamedEntityData(this.treeIndex,s,this.consumed+this.excess);this.decodeMode!==Mn.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var e;const{result:n,decodeTree:r}=this,i=(r[n]&jn.VALUE_LENGTH)>>14;return this.emitNamedEntityData(n,i,this.consumed),(e=this.errors)===null||e===void 0||e.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(e,n,r){const{decodeTree:i}=this;return this.emitCodePoint(n===1?i[e]&~jn.VALUE_LENGTH:i[e+1],r),n===3&&this.emitCodePoint(i[e+2],r),r}end(){var e;switch(this.state){case je.NamedEntity:return this.result!==0&&(this.decodeMode!==Mn.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case je.NumericDecimal:return this.emitNumericEntity(0,2);case je.NumericHex:return this.emitNumericEntity(0,3);case je.NumericStart:return(e=this.errors)===null||e===void 0||e.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case je.EntityStart:return 0}}}function bp(t){let e="";const n=new Dy(t,r=>e+=Iy(r));return function(i,s){let u=0,a=0;for(;(a=i.indexOf("&",a))>=0;){e+=i.slice(u,a),n.startEntity(s);const l=n.write(i,a+1);if(l<0){u=a+n.end();break}u=a+l,a=l===0?u+1:u}const c=e+i.slice(u);return e="",c}}function Py(t,e,n,r){const i=(e&jn.BRANCH_LENGTH)>>7,s=e&jn.JUMP_TABLE;if(i===0)return s!==0&&r===s?n:-1;if(s){const c=r-s;return c<0||c>=i?-1:t[n+c]-1}let u=n,a=u+i-1;for(;u<=a;){const c=u+a>>>1,l=t[c];if(l<r)u=c+1;else if(l>r)a=c-1;else return t[c+i]}return-1}const Fy=bp(Ty);bp(Ay);function Ep(t,e=Mn.Legacy){return Fy(t,e)}function Ny(t){return Object.prototype.toString.call(t)}function jc(t){return Ny(t)==="[object String]"}const Vy=Object.prototype.hasOwnProperty;function Oy(t,e){return Vy.call(t,e)}function Eo(t){return Array.prototype.slice.call(arguments,1).forEach(function(n){if(n){if(typeof n!="object")throw new TypeError(n+"must be object");Object.keys(n).forEach(function(r){t[r]=n[r]})}}),t}function vp(t,e,n){return[].concat(t.slice(0,e),n,t.slice(e+1))}function zc(t){return!(t>=55296&&t<=57343||t>=64976&&t<=65007||(t&65535)===65535||(t&65535)===65534||t>=0&&t<=8||t===11||t>=14&&t<=31||t>=127&&t<=159||t>1114111)}function zu(t){if(t>65535){t-=65536;const e=55296+(t>>10),n=56320+(t&1023);return String.fromCharCode(e,n)}return String.fromCharCode(t)}const Tp=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,My=/&([a-z#][a-z0-9]{1,31});/gi,Ly=new RegExp(Tp.source+"|"+My.source,"gi"),Uy=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function By(t,e){if(e.charCodeAt(0)===35&&Uy.test(e)){const r=e[1].toLowerCase()==="x"?parseInt(e.slice(2),16):parseInt(e.slice(1),10);return zc(r)?zu(r):t}const n=Ep(t);return n!==t?n:t}function qy(t){return t.indexOf("\\")<0?t:t.replace(Tp,"$1")}function li(t){return t.indexOf("\\")<0&&t.indexOf("&")<0?t:t.replace(Ly,function(e,n,r){return n||By(e,r)})}const jy=/[&<>"]/,zy=/[&<>"]/g,$y={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function Hy(t){return $y[t]}function nr(t){return jy.test(t)?t.replace(zy,Hy):t}const Wy=/[.?*+^$[\]\\(){}|-]/g;function Gy(t){return t.replace(Wy,"\\$&")}function xe(t){switch(t){case 9:case 32:return!0}return!1}function ms(t){if(t>=8192&&t<=8202)return!0;switch(t){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function gs(t){return qc.test(t)||_p.test(t)}function _s(t){switch(t){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function vo(t){return t=t.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(t=t.replace(/ẞ/g,"ß")),t.toLowerCase().toUpperCase()}const Ky={mdurl:by,ucmicro:vy},Qy=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:vp,assign:Eo,escapeHtml:nr,escapeRE:Gy,fromCodePoint:zu,has:Oy,isMdAsciiPunct:_s,isPunctChar:gs,isSpace:xe,isString:jc,isValidEntityCode:zc,isWhiteSpace:ms,lib:Ky,normalizeReference:vo,unescapeAll:li,unescapeMd:qy},Symbol.toStringTag,{value:"Module"}));function Jy(t,e,n){let r,i,s,u;const a=t.posMax,c=t.pos;for(t.pos=e+1,r=1;t.pos<a;){if(s=t.src.charCodeAt(t.pos),s===93&&(r--,r===0)){i=!0;break}if(u=t.pos,t.md.inline.skipToken(t),s===91){if(u===t.pos-1)r++;else if(n)return t.pos=c,-1}}let l=-1;return i&&(l=t.pos),t.pos=c,l}function Xy(t,e,n){let r,i=e;const s={ok:!1,pos:0,str:""};if(t.charCodeAt(i)===60){for(i++;i<n;){if(r=t.charCodeAt(i),r===10||r===60)return s;if(r===62)return s.pos=i+1,s.str=li(t.slice(e+1,i)),s.ok=!0,s;if(r===92&&i+1<n){i+=2;continue}i++}return s}let u=0;for(;i<n&&(r=t.charCodeAt(i),!(r===32||r<32||r===127));){if(r===92&&i+1<n){if(t.charCodeAt(i+1)===32)break;i+=2;continue}if(r===40&&(u++,u>32))return s;if(r===41){if(u===0)break;u--}i++}return e===i||u!==0||(s.str=li(t.slice(e,i)),s.pos=i,s.ok=!0),s}function Yy(t,e,n,r){let i,s=e;const u={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(r)u.str=r.str,u.marker=r.marker;else{if(s>=n)return u;let a=t.charCodeAt(s);if(a!==34&&a!==39&&a!==40)return u;e++,s++,a===40&&(a=41),u.marker=a}for(;s<n;){if(i=t.charCodeAt(s),i===u.marker)return u.pos=s+1,u.str+=li(t.slice(e,s)),u.ok=!0,u;if(i===40&&u.marker===41)return u;i===92&&s+1<n&&s++,s++}return u.can_continue=!0,u.str+=li(t.slice(e,s)),u}const Zy=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:Xy,parseLinkLabel:Jy,parseLinkTitle:Yy},Symbol.toStringTag,{value:"Module"})),nn={};nn.code_inline=function(t,e,n,r,i){const s=t[e];return"<code"+i.renderAttrs(s)+">"+nr(s.content)+"</code>"};nn.code_block=function(t,e,n,r,i){const s=t[e];return"<pre"+i.renderAttrs(s)+"><code>"+nr(t[e].content)+`</code></pre>
`};nn.fence=function(t,e,n,r,i){const s=t[e],u=s.info?li(s.info).trim():"";let a="",c="";if(u){const f=u.split(/(\s+)/g);a=f[0],c=f.slice(2).join("")}let l;if(n.highlight?l=n.highlight(s.content,a,c)||nr(s.content):l=nr(s.content),l.indexOf("<pre")===0)return l+`
`;if(u){const f=s.attrIndex("class"),p=s.attrs?s.attrs.slice():[];f<0?p.push(["class",n.langPrefix+a]):(p[f]=p[f].slice(),p[f][1]+=" "+n.langPrefix+a);const g={attrs:p};return`<pre><code${i.renderAttrs(g)}>${l}</code></pre>
`}return`<pre><code${i.renderAttrs(s)}>${l}</code></pre>
`};nn.image=function(t,e,n,r,i){const s=t[e];return s.attrs[s.attrIndex("alt")][1]=i.renderInlineAsText(s.children,n,r),i.renderToken(t,e,n)};nn.hardbreak=function(t,e,n){return n.xhtmlOut?`<br />
`:`<br>
`};nn.softbreak=function(t,e,n){return n.breaks?n.xhtmlOut?`<br />
`:`<br>
`:`
`};nn.text=function(t,e){return nr(t[e].content)};nn.html_block=function(t,e){return t[e].content};nn.html_inline=function(t,e){return t[e].content};function bi(){this.rules=Eo({},nn)}bi.prototype.renderAttrs=function(e){let n,r,i;if(!e.attrs)return"";for(i="",n=0,r=e.attrs.length;n<r;n++)i+=" "+nr(e.attrs[n][0])+'="'+nr(e.attrs[n][1])+'"';return i};bi.prototype.renderToken=function(e,n,r){const i=e[n];let s="";if(i.hidden)return"";i.block&&i.nesting!==-1&&n&&e[n-1].hidden&&(s+=`
`),s+=(i.nesting===-1?"</":"<")+i.tag,s+=this.renderAttrs(i),i.nesting===0&&r.xhtmlOut&&(s+=" /");let u=!1;if(i.block&&(u=!0,i.nesting===1&&n+1<e.length)){const a=e[n+1];(a.type==="inline"||a.hidden||a.nesting===-1&&a.tag===i.tag)&&(u=!1)}return s+=u?`>
`:">",s};bi.prototype.renderInline=function(t,e,n){let r="";const i=this.rules;for(let s=0,u=t.length;s<u;s++){const a=t[s].type;typeof i[a]<"u"?r+=i[a](t,s,e,n,this):r+=this.renderToken(t,s,e)}return r};bi.prototype.renderInlineAsText=function(t,e,n){let r="";for(let i=0,s=t.length;i<s;i++)switch(t[i].type){case"text":r+=t[i].content;break;case"image":r+=this.renderInlineAsText(t[i].children,e,n);break;case"html_inline":case"html_block":r+=t[i].content;break;case"softbreak":case"hardbreak":r+=`
`;break}return r};bi.prototype.render=function(t,e,n){let r="";const i=this.rules;for(let s=0,u=t.length;s<u;s++){const a=t[s].type;a==="inline"?r+=this.renderInline(t[s].children,e,n):typeof i[a]<"u"?r+=i[a](t,s,e,n,this):r+=this.renderToken(t,s,e,n)}return r};function _t(){this.__rules__=[],this.__cache__=null}_t.prototype.__find__=function(t){for(let e=0;e<this.__rules__.length;e++)if(this.__rules__[e].name===t)return e;return-1};_t.prototype.__compile__=function(){const t=this,e=[""];t.__rules__.forEach(function(n){n.enabled&&n.alt.forEach(function(r){e.indexOf(r)<0&&e.push(r)})}),t.__cache__={},e.forEach(function(n){t.__cache__[n]=[],t.__rules__.forEach(function(r){r.enabled&&(n&&r.alt.indexOf(n)<0||t.__cache__[n].push(r.fn))})})};_t.prototype.at=function(t,e,n){const r=this.__find__(t),i=n||{};if(r===-1)throw new Error("Parser rule not found: "+t);this.__rules__[r].fn=e,this.__rules__[r].alt=i.alt||[],this.__cache__=null};_t.prototype.before=function(t,e,n,r){const i=this.__find__(t),s=r||{};if(i===-1)throw new Error("Parser rule not found: "+t);this.__rules__.splice(i,0,{name:e,enabled:!0,fn:n,alt:s.alt||[]}),this.__cache__=null};_t.prototype.after=function(t,e,n,r){const i=this.__find__(t),s=r||{};if(i===-1)throw new Error("Parser rule not found: "+t);this.__rules__.splice(i+1,0,{name:e,enabled:!0,fn:n,alt:s.alt||[]}),this.__cache__=null};_t.prototype.push=function(t,e,n){const r=n||{};this.__rules__.push({name:t,enabled:!0,fn:e,alt:r.alt||[]}),this.__cache__=null};_t.prototype.enable=function(t,e){Array.isArray(t)||(t=[t]);const n=[];return t.forEach(function(r){const i=this.__find__(r);if(i<0){if(e)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[i].enabled=!0,n.push(r)},this),this.__cache__=null,n};_t.prototype.enableOnly=function(t,e){Array.isArray(t)||(t=[t]),this.__rules__.forEach(function(n){n.enabled=!1}),this.enable(t,e)};_t.prototype.disable=function(t,e){Array.isArray(t)||(t=[t]);const n=[];return t.forEach(function(r){const i=this.__find__(r);if(i<0){if(e)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[i].enabled=!1,n.push(r)},this),this.__cache__=null,n};_t.prototype.getRules=function(t){return this.__cache__===null&&this.__compile__(),this.__cache__[t]||[]};function Lt(t,e,n){this.type=t,this.tag=e,this.attrs=null,this.map=null,this.nesting=n,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}Lt.prototype.attrIndex=function(e){if(!this.attrs)return-1;const n=this.attrs;for(let r=0,i=n.length;r<i;r++)if(n[r][0]===e)return r;return-1};Lt.prototype.attrPush=function(e){this.attrs?this.attrs.push(e):this.attrs=[e]};Lt.prototype.attrSet=function(e,n){const r=this.attrIndex(e),i=[e,n];r<0?this.attrPush(i):this.attrs[r]=i};Lt.prototype.attrGet=function(e){const n=this.attrIndex(e);let r=null;return n>=0&&(r=this.attrs[n][1]),r};Lt.prototype.attrJoin=function(e,n){const r=this.attrIndex(e);r<0?this.attrPush([e,n]):this.attrs[r][1]=this.attrs[r][1]+" "+n};function Ap(t,e,n){this.src=t,this.env=n,this.tokens=[],this.inlineMode=!1,this.md=e}Ap.prototype.Token=Lt;const eb=/\r\n?|\n/g,tb=/\0/g;function nb(t){let e;e=t.src.replace(eb,`
`),e=e.replace(tb,"�"),t.src=e}function rb(t){let e;t.inlineMode?(e=new t.Token("inline","",0),e.content=t.src,e.map=[0,1],e.children=[],t.tokens.push(e)):t.md.block.parse(t.src,t.md,t.env,t.tokens)}function ib(t){const e=t.tokens;for(let n=0,r=e.length;n<r;n++){const i=e[n];i.type==="inline"&&t.md.inline.parse(i.content,t.md,t.env,i.children)}}function sb(t){return/^<a[>\s]/i.test(t)}function ub(t){return/^<\/a\s*>/i.test(t)}function ob(t){const e=t.tokens;if(t.md.options.linkify)for(let n=0,r=e.length;n<r;n++){if(e[n].type!=="inline"||!t.md.linkify.pretest(e[n].content))continue;let i=e[n].children,s=0;for(let u=i.length-1;u>=0;u--){const a=i[u];if(a.type==="link_close"){for(u--;i[u].level!==a.level&&i[u].type!=="link_open";)u--;continue}if(a.type==="html_inline"&&(sb(a.content)&&s>0&&s--,ub(a.content)&&s++),!(s>0)&&a.type==="text"&&t.md.linkify.test(a.content)){const c=a.content;let l=t.md.linkify.match(c);const f=[];let p=a.level,g=0;l.length>0&&l[0].index===0&&u>0&&i[u-1].type==="text_special"&&(l=l.slice(1));for(let _=0;_<l.length;_++){const b=l[_].url,R=t.md.normalizeLink(b);if(!t.md.validateLink(R))continue;let N=l[_].text;l[_].schema?l[_].schema==="mailto:"&&!/^mailto:/i.test(N)?N=t.md.normalizeLinkText("mailto:"+N).replace(/^mailto:/,""):N=t.md.normalizeLinkText(N):N=t.md.normalizeLinkText("http://"+N).replace(/^http:\/\//,"");const B=l[_].index;if(B>g){const q=new t.Token("text","",0);q.content=c.slice(g,B),q.level=p,f.push(q)}const V=new t.Token("link_open","a",1);V.attrs=[["href",R]],V.level=p++,V.markup="linkify",V.info="auto",f.push(V);const P=new t.Token("text","",0);P.content=N,P.level=p,f.push(P);const k=new t.Token("link_close","a",-1);k.level=--p,k.markup="linkify",k.info="auto",f.push(k),g=l[_].lastIndex}if(g<c.length){const _=new t.Token("text","",0);_.content=c.slice(g),_.level=p,f.push(_)}e[n].children=i=vp(i,u,f)}}}}const wp=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,ab=/\((c|tm|r)\)/i,cb=/\((c|tm|r)\)/ig,lb={c:"©",r:"®",tm:"™"};function hb(t,e){return lb[e.toLowerCase()]}function fb(t){let e=0;for(let n=t.length-1;n>=0;n--){const r=t[n];r.type==="text"&&!e&&(r.content=r.content.replace(cb,hb)),r.type==="link_open"&&r.info==="auto"&&e--,r.type==="link_close"&&r.info==="auto"&&e++}}function db(t){let e=0;for(let n=t.length-1;n>=0;n--){const r=t[n];r.type==="text"&&!e&&wp.test(r.content)&&(r.content=r.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),r.type==="link_open"&&r.info==="auto"&&e--,r.type==="link_close"&&r.info==="auto"&&e++}}function pb(t){let e;if(t.md.options.typographer)for(e=t.tokens.length-1;e>=0;e--)t.tokens[e].type==="inline"&&(ab.test(t.tokens[e].content)&&fb(t.tokens[e].children),wp.test(t.tokens[e].content)&&db(t.tokens[e].children))}const mb=/['"]/,vf=/['"]/g,Tf="’";function hu(t,e,n){return t.slice(0,e)+n+t.slice(e+1)}function gb(t,e){let n;const r=[];for(let i=0;i<t.length;i++){const s=t[i],u=t[i].level;for(n=r.length-1;n>=0&&!(r[n].level<=u);n--);if(r.length=n+1,s.type!=="text")continue;let a=s.content,c=0,l=a.length;e:for(;c<l;){vf.lastIndex=c;const f=vf.exec(a);if(!f)break;let p=!0,g=!0;c=f.index+1;const _=f[0]==="'";let b=32;if(f.index-1>=0)b=a.charCodeAt(f.index-1);else for(n=i-1;n>=0&&!(t[n].type==="softbreak"||t[n].type==="hardbreak");n--)if(t[n].content){b=t[n].content.charCodeAt(t[n].content.length-1);break}let R=32;if(c<l)R=a.charCodeAt(c);else for(n=i+1;n<t.length&&!(t[n].type==="softbreak"||t[n].type==="hardbreak");n++)if(t[n].content){R=t[n].content.charCodeAt(0);break}const N=_s(b)||gs(String.fromCharCode(b)),B=_s(R)||gs(String.fromCharCode(R)),V=ms(b),P=ms(R);if(P?p=!1:B&&(V||N||(p=!1)),V?g=!1:N&&(P||B||(g=!1)),R===34&&f[0]==='"'&&b>=48&&b<=57&&(g=p=!1),p&&g&&(p=N,g=B),!p&&!g){_&&(s.content=hu(s.content,f.index,Tf));continue}if(g)for(n=r.length-1;n>=0;n--){let k=r[n];if(r[n].level<u)break;if(k.single===_&&r[n].level===u){k=r[n];let q,Q;_?(q=e.md.options.quotes[2],Q=e.md.options.quotes[3]):(q=e.md.options.quotes[0],Q=e.md.options.quotes[1]),s.content=hu(s.content,f.index,Q),t[k.token].content=hu(t[k.token].content,k.pos,q),c+=Q.length-1,k.token===i&&(c+=q.length-1),a=s.content,l=a.length,r.length=n;continue e}}p?r.push({token:i,pos:f.index,single:_,level:u}):g&&_&&(s.content=hu(s.content,f.index,Tf))}}}function _b(t){if(t.md.options.typographer)for(let e=t.tokens.length-1;e>=0;e--)t.tokens[e].type!=="inline"||!mb.test(t.tokens[e].content)||gb(t.tokens[e].children,t)}function yb(t){let e,n;const r=t.tokens,i=r.length;for(let s=0;s<i;s++){if(r[s].type!=="inline")continue;const u=r[s].children,a=u.length;for(e=0;e<a;e++)u[e].type==="text_special"&&(u[e].type="text");for(e=n=0;e<a;e++)u[e].type==="text"&&e+1<a&&u[e+1].type==="text"?u[e+1].content=u[e].content+u[e+1].content:(e!==n&&(u[n]=u[e]),n++);e!==n&&(u.length=n)}}const ma=[["normalize",nb],["block",rb],["inline",ib],["linkify",ob],["replacements",pb],["smartquotes",_b],["text_join",yb]];function $c(){this.ruler=new _t;for(let t=0;t<ma.length;t++)this.ruler.push(ma[t][0],ma[t][1])}$c.prototype.process=function(t){const e=this.ruler.getRules("");for(let n=0,r=e.length;n<r;n++)e[n](t)};$c.prototype.State=Ap;function rn(t,e,n,r){this.src=t,this.md=e,this.env=n,this.tokens=r,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const i=this.src;for(let s=0,u=0,a=0,c=0,l=i.length,f=!1;u<l;u++){const p=i.charCodeAt(u);if(!f)if(xe(p)){a++,p===9?c+=4-c%4:c++;continue}else f=!0;(p===10||u===l-1)&&(p!==10&&u++,this.bMarks.push(s),this.eMarks.push(u),this.tShift.push(a),this.sCount.push(c),this.bsCount.push(0),f=!1,a=0,c=0,s=u+1)}this.bMarks.push(i.length),this.eMarks.push(i.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}rn.prototype.push=function(t,e,n){const r=new Lt(t,e,n);return r.block=!0,n<0&&this.level--,r.level=this.level,n>0&&this.level++,this.tokens.push(r),r};rn.prototype.isEmpty=function(e){return this.bMarks[e]+this.tShift[e]>=this.eMarks[e]};rn.prototype.skipEmptyLines=function(e){for(let n=this.lineMax;e<n&&!(this.bMarks[e]+this.tShift[e]<this.eMarks[e]);e++);return e};rn.prototype.skipSpaces=function(e){for(let n=this.src.length;e<n;e++){const r=this.src.charCodeAt(e);if(!xe(r))break}return e};rn.prototype.skipSpacesBack=function(e,n){if(e<=n)return e;for(;e>n;)if(!xe(this.src.charCodeAt(--e)))return e+1;return e};rn.prototype.skipChars=function(e,n){for(let r=this.src.length;e<r&&this.src.charCodeAt(e)===n;e++);return e};rn.prototype.skipCharsBack=function(e,n,r){if(e<=r)return e;for(;e>r;)if(n!==this.src.charCodeAt(--e))return e+1;return e};rn.prototype.getLines=function(e,n,r,i){if(e>=n)return"";const s=new Array(n-e);for(let u=0,a=e;a<n;a++,u++){let c=0;const l=this.bMarks[a];let f=l,p;for(a+1<n||i?p=this.eMarks[a]+1:p=this.eMarks[a];f<p&&c<r;){const g=this.src.charCodeAt(f);if(xe(g))g===9?c+=4-(c+this.bsCount[a])%4:c++;else if(f-l<this.tShift[a])c++;else break;f++}c>r?s[u]=new Array(c-r+1).join(" ")+this.src.slice(f,p):s[u]=this.src.slice(f,p)}return s.join("")};rn.prototype.Token=Lt;const bb=65536;function ga(t,e){const n=t.bMarks[e]+t.tShift[e],r=t.eMarks[e];return t.src.slice(n,r)}function Af(t){const e=[],n=t.length;let r=0,i=t.charCodeAt(r),s=!1,u=0,a="";for(;r<n;)i===124&&(s?(a+=t.substring(u,r-1),u=r):(e.push(a+t.substring(u,r)),a="",u=r+1)),s=i===92,r++,i=t.charCodeAt(r);return e.push(a+t.substring(u)),e}function Eb(t,e,n,r){if(e+2>n)return!1;let i=e+1;if(t.sCount[i]<t.blkIndent||t.sCount[i]-t.blkIndent>=4)return!1;let s=t.bMarks[i]+t.tShift[i];if(s>=t.eMarks[i])return!1;const u=t.src.charCodeAt(s++);if(u!==124&&u!==45&&u!==58||s>=t.eMarks[i])return!1;const a=t.src.charCodeAt(s++);if(a!==124&&a!==45&&a!==58&&!xe(a)||u===45&&xe(a))return!1;for(;s<t.eMarks[i];){const k=t.src.charCodeAt(s);if(k!==124&&k!==45&&k!==58&&!xe(k))return!1;s++}let c=ga(t,e+1),l=c.split("|");const f=[];for(let k=0;k<l.length;k++){const q=l[k].trim();if(!q){if(k===0||k===l.length-1)continue;return!1}if(!/^:?-+:?$/.test(q))return!1;q.charCodeAt(q.length-1)===58?f.push(q.charCodeAt(0)===58?"center":"right"):q.charCodeAt(0)===58?f.push("left"):f.push("")}if(c=ga(t,e).trim(),c.indexOf("|")===-1||t.sCount[e]-t.blkIndent>=4)return!1;l=Af(c),l.length&&l[0]===""&&l.shift(),l.length&&l[l.length-1]===""&&l.pop();const p=l.length;if(p===0||p!==f.length)return!1;if(r)return!0;const g=t.parentType;t.parentType="table";const _=t.md.block.ruler.getRules("blockquote"),b=t.push("table_open","table",1),R=[e,0];b.map=R;const N=t.push("thead_open","thead",1);N.map=[e,e+1];const B=t.push("tr_open","tr",1);B.map=[e,e+1];for(let k=0;k<l.length;k++){const q=t.push("th_open","th",1);f[k]&&(q.attrs=[["style","text-align:"+f[k]]]);const Q=t.push("inline","",0);Q.content=l[k].trim(),Q.children=[],t.push("th_close","th",-1)}t.push("tr_close","tr",-1),t.push("thead_close","thead",-1);let V,P=0;for(i=e+2;i<n&&!(t.sCount[i]<t.blkIndent);i++){let k=!1;for(let Q=0,A=_.length;Q<A;Q++)if(_[Q](t,i,n,!0)){k=!0;break}if(k||(c=ga(t,i).trim(),!c)||t.sCount[i]-t.blkIndent>=4||(l=Af(c),l.length&&l[0]===""&&l.shift(),l.length&&l[l.length-1]===""&&l.pop(),P+=p-l.length,P>bb))break;if(i===e+2){const Q=t.push("tbody_open","tbody",1);Q.map=V=[e+2,0]}const q=t.push("tr_open","tr",1);q.map=[i,i+1];for(let Q=0;Q<p;Q++){const A=t.push("td_open","td",1);f[Q]&&(A.attrs=[["style","text-align:"+f[Q]]]);const y=t.push("inline","",0);y.content=l[Q]?l[Q].trim():"",y.children=[],t.push("td_close","td",-1)}t.push("tr_close","tr",-1)}return V&&(t.push("tbody_close","tbody",-1),V[1]=i),t.push("table_close","table",-1),R[1]=i,t.parentType=g,t.line=i,!0}function vb(t,e,n){if(t.sCount[e]-t.blkIndent<4)return!1;let r=e+1,i=r;for(;r<n;){if(t.isEmpty(r)){r++;continue}if(t.sCount[r]-t.blkIndent>=4){r++,i=r;continue}break}t.line=i;const s=t.push("code_block","code",0);return s.content=t.getLines(e,i,4+t.blkIndent,!1)+`
`,s.map=[e,t.line],!0}function Tb(t,e,n,r){let i=t.bMarks[e]+t.tShift[e],s=t.eMarks[e];if(t.sCount[e]-t.blkIndent>=4||i+3>s)return!1;const u=t.src.charCodeAt(i);if(u!==126&&u!==96)return!1;let a=i;i=t.skipChars(i,u);let c=i-a;if(c<3)return!1;const l=t.src.slice(a,i),f=t.src.slice(i,s);if(u===96&&f.indexOf(String.fromCharCode(u))>=0)return!1;if(r)return!0;let p=e,g=!1;for(;p++,!(p>=n||(i=a=t.bMarks[p]+t.tShift[p],s=t.eMarks[p],i<s&&t.sCount[p]<t.blkIndent));)if(t.src.charCodeAt(i)===u&&!(t.sCount[p]-t.blkIndent>=4)&&(i=t.skipChars(i,u),!(i-a<c)&&(i=t.skipSpaces(i),!(i<s)))){g=!0;break}c=t.sCount[e],t.line=p+(g?1:0);const _=t.push("fence","code",0);return _.info=f,_.content=t.getLines(e+1,p,c,!0),_.markup=l,_.map=[e,t.line],!0}function Ab(t,e,n,r){let i=t.bMarks[e]+t.tShift[e],s=t.eMarks[e];const u=t.lineMax;if(t.sCount[e]-t.blkIndent>=4||t.src.charCodeAt(i)!==62)return!1;if(r)return!0;const a=[],c=[],l=[],f=[],p=t.md.block.ruler.getRules("blockquote"),g=t.parentType;t.parentType="blockquote";let _=!1,b;for(b=e;b<n;b++){const P=t.sCount[b]<t.blkIndent;if(i=t.bMarks[b]+t.tShift[b],s=t.eMarks[b],i>=s)break;if(t.src.charCodeAt(i++)===62&&!P){let q=t.sCount[b]+1,Q,A;t.src.charCodeAt(i)===32?(i++,q++,A=!1,Q=!0):t.src.charCodeAt(i)===9?(Q=!0,(t.bsCount[b]+q)%4===3?(i++,q++,A=!1):A=!0):Q=!1;let y=q;for(a.push(t.bMarks[b]),t.bMarks[b]=i;i<s;){const E=t.src.charCodeAt(i);if(xe(E))E===9?y+=4-(y+t.bsCount[b]+(A?1:0))%4:y++;else break;i++}_=i>=s,c.push(t.bsCount[b]),t.bsCount[b]=t.sCount[b]+1+(Q?1:0),l.push(t.sCount[b]),t.sCount[b]=y-q,f.push(t.tShift[b]),t.tShift[b]=i-t.bMarks[b];continue}if(_)break;let k=!1;for(let q=0,Q=p.length;q<Q;q++)if(p[q](t,b,n,!0)){k=!0;break}if(k){t.lineMax=b,t.blkIndent!==0&&(a.push(t.bMarks[b]),c.push(t.bsCount[b]),f.push(t.tShift[b]),l.push(t.sCount[b]),t.sCount[b]-=t.blkIndent);break}a.push(t.bMarks[b]),c.push(t.bsCount[b]),f.push(t.tShift[b]),l.push(t.sCount[b]),t.sCount[b]=-1}const R=t.blkIndent;t.blkIndent=0;const N=t.push("blockquote_open","blockquote",1);N.markup=">";const B=[e,0];N.map=B,t.md.block.tokenize(t,e,b);const V=t.push("blockquote_close","blockquote",-1);V.markup=">",t.lineMax=u,t.parentType=g,B[1]=t.line;for(let P=0;P<f.length;P++)t.bMarks[P+e]=a[P],t.tShift[P+e]=f[P],t.sCount[P+e]=l[P],t.bsCount[P+e]=c[P];return t.blkIndent=R,!0}function wb(t,e,n,r){const i=t.eMarks[e];if(t.sCount[e]-t.blkIndent>=4)return!1;let s=t.bMarks[e]+t.tShift[e];const u=t.src.charCodeAt(s++);if(u!==42&&u!==45&&u!==95)return!1;let a=1;for(;s<i;){const l=t.src.charCodeAt(s++);if(l!==u&&!xe(l))return!1;l===u&&a++}if(a<3)return!1;if(r)return!0;t.line=e+1;const c=t.push("hr","hr",0);return c.map=[e,t.line],c.markup=Array(a+1).join(String.fromCharCode(u)),!0}function wf(t,e){const n=t.eMarks[e];let r=t.bMarks[e]+t.tShift[e];const i=t.src.charCodeAt(r++);if(i!==42&&i!==45&&i!==43)return-1;if(r<n){const s=t.src.charCodeAt(r);if(!xe(s))return-1}return r}function If(t,e){const n=t.bMarks[e]+t.tShift[e],r=t.eMarks[e];let i=n;if(i+1>=r)return-1;let s=t.src.charCodeAt(i++);if(s<48||s>57)return-1;for(;;){if(i>=r)return-1;if(s=t.src.charCodeAt(i++),s>=48&&s<=57){if(i-n>=10)return-1;continue}if(s===41||s===46)break;return-1}return i<r&&(s=t.src.charCodeAt(i),!xe(s))?-1:i}function Ib(t,e){const n=t.level+2;for(let r=e+2,i=t.tokens.length-2;r<i;r++)t.tokens[r].level===n&&t.tokens[r].type==="paragraph_open"&&(t.tokens[r+2].hidden=!0,t.tokens[r].hidden=!0,r+=2)}function xb(t,e,n,r){let i,s,u,a,c=e,l=!0;if(t.sCount[c]-t.blkIndent>=4||t.listIndent>=0&&t.sCount[c]-t.listIndent>=4&&t.sCount[c]<t.blkIndent)return!1;let f=!1;r&&t.parentType==="paragraph"&&t.sCount[c]>=t.blkIndent&&(f=!0);let p,g,_;if((_=If(t,c))>=0){if(p=!0,u=t.bMarks[c]+t.tShift[c],g=Number(t.src.slice(u,_-1)),f&&g!==1)return!1}else if((_=wf(t,c))>=0)p=!1;else return!1;if(f&&t.skipSpaces(_)>=t.eMarks[c])return!1;if(r)return!0;const b=t.src.charCodeAt(_-1),R=t.tokens.length;p?(a=t.push("ordered_list_open","ol",1),g!==1&&(a.attrs=[["start",g]])):a=t.push("bullet_list_open","ul",1);const N=[c,0];a.map=N,a.markup=String.fromCharCode(b);let B=!1;const V=t.md.block.ruler.getRules("list"),P=t.parentType;for(t.parentType="list";c<n;){s=_,i=t.eMarks[c];const k=t.sCount[c]+_-(t.bMarks[c]+t.tShift[c]);let q=k;for(;s<i;){const ct=t.src.charCodeAt(s);if(ct===9)q+=4-(q+t.bsCount[c])%4;else if(ct===32)q++;else break;s++}const Q=s;let A;Q>=i?A=1:A=q-k,A>4&&(A=1);const y=k+A;a=t.push("list_item_open","li",1),a.markup=String.fromCharCode(b);const E=[c,0];a.map=E,p&&(a.info=t.src.slice(u,_-1));const w=t.tight,x=t.tShift[c],S=t.sCount[c],T=t.listIndent;if(t.listIndent=t.blkIndent,t.blkIndent=y,t.tight=!0,t.tShift[c]=Q-t.bMarks[c],t.sCount[c]=q,Q>=i&&t.isEmpty(c+1)?t.line=Math.min(t.line+2,n):t.md.block.tokenize(t,c,n,!0),(!t.tight||B)&&(l=!1),B=t.line-c>1&&t.isEmpty(t.line-1),t.blkIndent=t.listIndent,t.listIndent=T,t.tShift[c]=x,t.sCount[c]=S,t.tight=w,a=t.push("list_item_close","li",-1),a.markup=String.fromCharCode(b),c=t.line,E[1]=c,c>=n||t.sCount[c]<t.blkIndent||t.sCount[c]-t.blkIndent>=4)break;let Ze=!1;for(let ct=0,Me=V.length;ct<Me;ct++)if(V[ct](t,c,n,!0)){Ze=!0;break}if(Ze)break;if(p){if(_=If(t,c),_<0)break;u=t.bMarks[c]+t.tShift[c]}else if(_=wf(t,c),_<0)break;if(b!==t.src.charCodeAt(_-1))break}return p?a=t.push("ordered_list_close","ol",-1):a=t.push("bullet_list_close","ul",-1),a.markup=String.fromCharCode(b),N[1]=c,t.line=c,t.parentType=P,l&&Ib(t,R),!0}function Cb(t,e,n,r){let i=t.bMarks[e]+t.tShift[e],s=t.eMarks[e],u=e+1;if(t.sCount[e]-t.blkIndent>=4||t.src.charCodeAt(i)!==91)return!1;function a(V){const P=t.lineMax;if(V>=P||t.isEmpty(V))return null;let k=!1;if(t.sCount[V]-t.blkIndent>3&&(k=!0),t.sCount[V]<0&&(k=!0),!k){const A=t.md.block.ruler.getRules("reference"),y=t.parentType;t.parentType="reference";let E=!1;for(let w=0,x=A.length;w<x;w++)if(A[w](t,V,P,!0)){E=!0;break}if(t.parentType=y,E)return null}const q=t.bMarks[V]+t.tShift[V],Q=t.eMarks[V];return t.src.slice(q,Q+1)}let c=t.src.slice(i,s+1);s=c.length;let l=-1;for(i=1;i<s;i++){const V=c.charCodeAt(i);if(V===91)return!1;if(V===93){l=i;break}else if(V===10){const P=a(u);P!==null&&(c+=P,s=c.length,u++)}else if(V===92&&(i++,i<s&&c.charCodeAt(i)===10)){const P=a(u);P!==null&&(c+=P,s=c.length,u++)}}if(l<0||c.charCodeAt(l+1)!==58)return!1;for(i=l+2;i<s;i++){const V=c.charCodeAt(i);if(V===10){const P=a(u);P!==null&&(c+=P,s=c.length,u++)}else if(!xe(V))break}const f=t.md.helpers.parseLinkDestination(c,i,s);if(!f.ok)return!1;const p=t.md.normalizeLink(f.str);if(!t.md.validateLink(p))return!1;i=f.pos;const g=i,_=u,b=i;for(;i<s;i++){const V=c.charCodeAt(i);if(V===10){const P=a(u);P!==null&&(c+=P,s=c.length,u++)}else if(!xe(V))break}let R=t.md.helpers.parseLinkTitle(c,i,s);for(;R.can_continue;){const V=a(u);if(V===null)break;c+=V,i=s,s=c.length,u++,R=t.md.helpers.parseLinkTitle(c,i,s,R)}let N;for(i<s&&b!==i&&R.ok?(N=R.str,i=R.pos):(N="",i=g,u=_);i<s;){const V=c.charCodeAt(i);if(!xe(V))break;i++}if(i<s&&c.charCodeAt(i)!==10&&N)for(N="",i=g,u=_;i<s;){const V=c.charCodeAt(i);if(!xe(V))break;i++}if(i<s&&c.charCodeAt(i)!==10)return!1;const B=vo(c.slice(1,l));return B?(r||(typeof t.env.references>"u"&&(t.env.references={}),typeof t.env.references[B]>"u"&&(t.env.references[B]={title:N,href:p}),t.line=u),!0):!1}const Sb=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],kb="[a-zA-Z_:][a-zA-Z0-9:._-]*",Rb="[^\"'=<>`\\x00-\\x20]+",Db="'[^']*'",Pb='"[^"]*"',Fb="(?:"+Rb+"|"+Db+"|"+Pb+")",Nb="(?:\\s+"+kb+"(?:\\s*=\\s*"+Fb+")?)",Ip="<[A-Za-z][A-Za-z0-9\\-]*"+Nb+"*\\s*\\/?>",xp="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",Vb="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",Ob="<[?][\\s\\S]*?[?]>",Mb="<![A-Za-z][^>]*>",Lb="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",Ub=new RegExp("^(?:"+Ip+"|"+xp+"|"+Vb+"|"+Ob+"|"+Mb+"|"+Lb+")"),Bb=new RegExp("^(?:"+Ip+"|"+xp+")"),zr=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+Sb.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(Bb.source+"\\s*$"),/^$/,!1]];function qb(t,e,n,r){let i=t.bMarks[e]+t.tShift[e],s=t.eMarks[e];if(t.sCount[e]-t.blkIndent>=4||!t.md.options.html||t.src.charCodeAt(i)!==60)return!1;let u=t.src.slice(i,s),a=0;for(;a<zr.length&&!zr[a][0].test(u);a++);if(a===zr.length)return!1;if(r)return zr[a][2];let c=e+1;if(!zr[a][1].test(u)){for(;c<n&&!(t.sCount[c]<t.blkIndent);c++)if(i=t.bMarks[c]+t.tShift[c],s=t.eMarks[c],u=t.src.slice(i,s),zr[a][1].test(u)){u.length!==0&&c++;break}}t.line=c;const l=t.push("html_block","",0);return l.map=[e,c],l.content=t.getLines(e,c,t.blkIndent,!0),!0}function jb(t,e,n,r){let i=t.bMarks[e]+t.tShift[e],s=t.eMarks[e];if(t.sCount[e]-t.blkIndent>=4)return!1;let u=t.src.charCodeAt(i);if(u!==35||i>=s)return!1;let a=1;for(u=t.src.charCodeAt(++i);u===35&&i<s&&a<=6;)a++,u=t.src.charCodeAt(++i);if(a>6||i<s&&!xe(u))return!1;if(r)return!0;s=t.skipSpacesBack(s,i);const c=t.skipCharsBack(s,35,i);c>i&&xe(t.src.charCodeAt(c-1))&&(s=c),t.line=e+1;const l=t.push("heading_open","h"+String(a),1);l.markup="########".slice(0,a),l.map=[e,t.line];const f=t.push("inline","",0);f.content=t.src.slice(i,s).trim(),f.map=[e,t.line],f.children=[];const p=t.push("heading_close","h"+String(a),-1);return p.markup="########".slice(0,a),!0}function zb(t,e,n){const r=t.md.block.ruler.getRules("paragraph");if(t.sCount[e]-t.blkIndent>=4)return!1;const i=t.parentType;t.parentType="paragraph";let s=0,u,a=e+1;for(;a<n&&!t.isEmpty(a);a++){if(t.sCount[a]-t.blkIndent>3)continue;if(t.sCount[a]>=t.blkIndent){let _=t.bMarks[a]+t.tShift[a];const b=t.eMarks[a];if(_<b&&(u=t.src.charCodeAt(_),(u===45||u===61)&&(_=t.skipChars(_,u),_=t.skipSpaces(_),_>=b))){s=u===61?1:2;break}}if(t.sCount[a]<0)continue;let g=!1;for(let _=0,b=r.length;_<b;_++)if(r[_](t,a,n,!0)){g=!0;break}if(g)break}if(!s)return!1;const c=t.getLines(e,a,t.blkIndent,!1).trim();t.line=a+1;const l=t.push("heading_open","h"+String(s),1);l.markup=String.fromCharCode(u),l.map=[e,t.line];const f=t.push("inline","",0);f.content=c,f.map=[e,t.line-1],f.children=[];const p=t.push("heading_close","h"+String(s),-1);return p.markup=String.fromCharCode(u),t.parentType=i,!0}function $b(t,e,n){const r=t.md.block.ruler.getRules("paragraph"),i=t.parentType;let s=e+1;for(t.parentType="paragraph";s<n&&!t.isEmpty(s);s++){if(t.sCount[s]-t.blkIndent>3||t.sCount[s]<0)continue;let l=!1;for(let f=0,p=r.length;f<p;f++)if(r[f](t,s,n,!0)){l=!0;break}if(l)break}const u=t.getLines(e,s,t.blkIndent,!1).trim();t.line=s;const a=t.push("paragraph_open","p",1);a.map=[e,t.line];const c=t.push("inline","",0);return c.content=u,c.map=[e,t.line],c.children=[],t.push("paragraph_close","p",-1),t.parentType=i,!0}const fu=[["table",Eb,["paragraph","reference"]],["code",vb],["fence",Tb,["paragraph","reference","blockquote","list"]],["blockquote",Ab,["paragraph","reference","blockquote","list"]],["hr",wb,["paragraph","reference","blockquote","list"]],["list",xb,["paragraph","reference","blockquote"]],["reference",Cb],["html_block",qb,["paragraph","reference","blockquote"]],["heading",jb,["paragraph","reference","blockquote"]],["lheading",zb],["paragraph",$b]];function To(){this.ruler=new _t;for(let t=0;t<fu.length;t++)this.ruler.push(fu[t][0],fu[t][1],{alt:(fu[t][2]||[]).slice()})}To.prototype.tokenize=function(t,e,n){const r=this.ruler.getRules(""),i=r.length,s=t.md.options.maxNesting;let u=e,a=!1;for(;u<n&&(t.line=u=t.skipEmptyLines(u),!(u>=n||t.sCount[u]<t.blkIndent));){if(t.level>=s){t.line=n;break}const c=t.line;let l=!1;for(let f=0;f<i;f++)if(l=r[f](t,u,n,!1),l){if(c>=t.line)throw new Error("block rule didn't increment state.line");break}if(!l)throw new Error("none of the block rules matched");t.tight=!a,t.isEmpty(t.line-1)&&(a=!0),u=t.line,u<n&&t.isEmpty(u)&&(a=!0,u++,t.line=u)}};To.prototype.parse=function(t,e,n,r){if(!t)return;const i=new this.State(t,e,n,r);this.tokenize(i,i.line,i.lineMax)};To.prototype.State=rn;function Ps(t,e,n,r){this.src=t,this.env=n,this.md=e,this.tokens=r,this.tokens_meta=Array(r.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}Ps.prototype.pushPending=function(){const t=new Lt("text","",0);return t.content=this.pending,t.level=this.pendingLevel,this.tokens.push(t),this.pending="",t};Ps.prototype.push=function(t,e,n){this.pending&&this.pushPending();const r=new Lt(t,e,n);let i=null;return n<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),r.level=this.level,n>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],i={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(r),this.tokens_meta.push(i),r};Ps.prototype.scanDelims=function(t,e){const n=this.posMax,r=this.src.charCodeAt(t),i=t>0?this.src.charCodeAt(t-1):32;let s=t;for(;s<n&&this.src.charCodeAt(s)===r;)s++;const u=s-t,a=s<n?this.src.charCodeAt(s):32,c=_s(i)||gs(String.fromCharCode(i)),l=_s(a)||gs(String.fromCharCode(a)),f=ms(i),p=ms(a),g=!p&&(!l||f||c),_=!f&&(!c||p||l);return{can_open:g&&(e||!_||c),can_close:_&&(e||!g||l),length:u}};Ps.prototype.Token=Lt;function Hb(t){switch(t){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function Wb(t,e){let n=t.pos;for(;n<t.posMax&&!Hb(t.src.charCodeAt(n));)n++;return n===t.pos?!1:(e||(t.pending+=t.src.slice(t.pos,n)),t.pos=n,!0)}const Gb=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function Kb(t,e){if(!t.md.options.linkify||t.linkLevel>0)return!1;const n=t.pos,r=t.posMax;if(n+3>r||t.src.charCodeAt(n)!==58||t.src.charCodeAt(n+1)!==47||t.src.charCodeAt(n+2)!==47)return!1;const i=t.pending.match(Gb);if(!i)return!1;const s=i[1],u=t.md.linkify.matchAtStart(t.src.slice(n-s.length));if(!u)return!1;let a=u.url;if(a.length<=s.length)return!1;a=a.replace(/\*+$/,"");const c=t.md.normalizeLink(a);if(!t.md.validateLink(c))return!1;if(!e){t.pending=t.pending.slice(0,-s.length);const l=t.push("link_open","a",1);l.attrs=[["href",c]],l.markup="linkify",l.info="auto";const f=t.push("text","",0);f.content=t.md.normalizeLinkText(a);const p=t.push("link_close","a",-1);p.markup="linkify",p.info="auto"}return t.pos+=a.length-s.length,!0}function Qb(t,e){let n=t.pos;if(t.src.charCodeAt(n)!==10)return!1;const r=t.pending.length-1,i=t.posMax;if(!e)if(r>=0&&t.pending.charCodeAt(r)===32)if(r>=1&&t.pending.charCodeAt(r-1)===32){let s=r-1;for(;s>=1&&t.pending.charCodeAt(s-1)===32;)s--;t.pending=t.pending.slice(0,s),t.push("hardbreak","br",0)}else t.pending=t.pending.slice(0,-1),t.push("softbreak","br",0);else t.push("softbreak","br",0);for(n++;n<i&&xe(t.src.charCodeAt(n));)n++;return t.pos=n,!0}const Hc=[];for(let t=0;t<256;t++)Hc.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(t){Hc[t.charCodeAt(0)]=1});function Jb(t,e){let n=t.pos;const r=t.posMax;if(t.src.charCodeAt(n)!==92||(n++,n>=r))return!1;let i=t.src.charCodeAt(n);if(i===10){for(e||t.push("hardbreak","br",0),n++;n<r&&(i=t.src.charCodeAt(n),!!xe(i));)n++;return t.pos=n,!0}let s=t.src[n];if(i>=55296&&i<=56319&&n+1<r){const a=t.src.charCodeAt(n+1);a>=56320&&a<=57343&&(s+=t.src[n+1],n++)}const u="\\"+s;if(!e){const a=t.push("text_special","",0);i<256&&Hc[i]!==0?a.content=s:a.content=u,a.markup=u,a.info="escape"}return t.pos=n+1,!0}function Xb(t,e){let n=t.pos;if(t.src.charCodeAt(n)!==96)return!1;const i=n;n++;const s=t.posMax;for(;n<s&&t.src.charCodeAt(n)===96;)n++;const u=t.src.slice(i,n),a=u.length;if(t.backticksScanned&&(t.backticks[a]||0)<=i)return e||(t.pending+=u),t.pos+=a,!0;let c=n,l;for(;(l=t.src.indexOf("`",c))!==-1;){for(c=l+1;c<s&&t.src.charCodeAt(c)===96;)c++;const f=c-l;if(f===a){if(!e){const p=t.push("code_inline","code",0);p.markup=u,p.content=t.src.slice(n,l).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return t.pos=c,!0}t.backticks[f]=l}return t.backticksScanned=!0,e||(t.pending+=u),t.pos+=a,!0}function Yb(t,e){const n=t.pos,r=t.src.charCodeAt(n);if(e||r!==126)return!1;const i=t.scanDelims(t.pos,!0);let s=i.length;const u=String.fromCharCode(r);if(s<2)return!1;let a;s%2&&(a=t.push("text","",0),a.content=u,s--);for(let c=0;c<s;c+=2)a=t.push("text","",0),a.content=u+u,t.delimiters.push({marker:r,length:0,token:t.tokens.length-1,end:-1,open:i.can_open,close:i.can_close});return t.pos+=i.length,!0}function xf(t,e){let n;const r=[],i=e.length;for(let s=0;s<i;s++){const u=e[s];if(u.marker!==126||u.end===-1)continue;const a=e[u.end];n=t.tokens[u.token],n.type="s_open",n.tag="s",n.nesting=1,n.markup="~~",n.content="",n=t.tokens[a.token],n.type="s_close",n.tag="s",n.nesting=-1,n.markup="~~",n.content="",t.tokens[a.token-1].type==="text"&&t.tokens[a.token-1].content==="~"&&r.push(a.token-1)}for(;r.length;){const s=r.pop();let u=s+1;for(;u<t.tokens.length&&t.tokens[u].type==="s_close";)u++;u--,s!==u&&(n=t.tokens[u],t.tokens[u]=t.tokens[s],t.tokens[s]=n)}}function Zb(t){const e=t.tokens_meta,n=t.tokens_meta.length;xf(t,t.delimiters);for(let r=0;r<n;r++)e[r]&&e[r].delimiters&&xf(t,e[r].delimiters)}const Cp={tokenize:Yb,postProcess:Zb};function eE(t,e){const n=t.pos,r=t.src.charCodeAt(n);if(e||r!==95&&r!==42)return!1;const i=t.scanDelims(t.pos,r===42);for(let s=0;s<i.length;s++){const u=t.push("text","",0);u.content=String.fromCharCode(r),t.delimiters.push({marker:r,length:i.length,token:t.tokens.length-1,end:-1,open:i.can_open,close:i.can_close})}return t.pos+=i.length,!0}function Cf(t,e){const n=e.length;for(let r=n-1;r>=0;r--){const i=e[r];if(i.marker!==95&&i.marker!==42||i.end===-1)continue;const s=e[i.end],u=r>0&&e[r-1].end===i.end+1&&e[r-1].marker===i.marker&&e[r-1].token===i.token-1&&e[i.end+1].token===s.token+1,a=String.fromCharCode(i.marker),c=t.tokens[i.token];c.type=u?"strong_open":"em_open",c.tag=u?"strong":"em",c.nesting=1,c.markup=u?a+a:a,c.content="";const l=t.tokens[s.token];l.type=u?"strong_close":"em_close",l.tag=u?"strong":"em",l.nesting=-1,l.markup=u?a+a:a,l.content="",u&&(t.tokens[e[r-1].token].content="",t.tokens[e[i.end+1].token].content="",r--)}}function tE(t){const e=t.tokens_meta,n=t.tokens_meta.length;Cf(t,t.delimiters);for(let r=0;r<n;r++)e[r]&&e[r].delimiters&&Cf(t,e[r].delimiters)}const Sp={tokenize:eE,postProcess:tE};function nE(t,e){let n,r,i,s,u="",a="",c=t.pos,l=!0;if(t.src.charCodeAt(t.pos)!==91)return!1;const f=t.pos,p=t.posMax,g=t.pos+1,_=t.md.helpers.parseLinkLabel(t,t.pos,!0);if(_<0)return!1;let b=_+1;if(b<p&&t.src.charCodeAt(b)===40){for(l=!1,b++;b<p&&(n=t.src.charCodeAt(b),!(!xe(n)&&n!==10));b++);if(b>=p)return!1;if(c=b,i=t.md.helpers.parseLinkDestination(t.src,b,t.posMax),i.ok){for(u=t.md.normalizeLink(i.str),t.md.validateLink(u)?b=i.pos:u="",c=b;b<p&&(n=t.src.charCodeAt(b),!(!xe(n)&&n!==10));b++);if(i=t.md.helpers.parseLinkTitle(t.src,b,t.posMax),b<p&&c!==b&&i.ok)for(a=i.str,b=i.pos;b<p&&(n=t.src.charCodeAt(b),!(!xe(n)&&n!==10));b++);}(b>=p||t.src.charCodeAt(b)!==41)&&(l=!0),b++}if(l){if(typeof t.env.references>"u")return!1;if(b<p&&t.src.charCodeAt(b)===91?(c=b+1,b=t.md.helpers.parseLinkLabel(t,b),b>=0?r=t.src.slice(c,b++):b=_+1):b=_+1,r||(r=t.src.slice(g,_)),s=t.env.references[vo(r)],!s)return t.pos=f,!1;u=s.href,a=s.title}if(!e){t.pos=g,t.posMax=_;const R=t.push("link_open","a",1),N=[["href",u]];R.attrs=N,a&&N.push(["title",a]),t.linkLevel++,t.md.inline.tokenize(t),t.linkLevel--,t.push("link_close","a",-1)}return t.pos=b,t.posMax=p,!0}function rE(t,e){let n,r,i,s,u,a,c,l,f="";const p=t.pos,g=t.posMax;if(t.src.charCodeAt(t.pos)!==33||t.src.charCodeAt(t.pos+1)!==91)return!1;const _=t.pos+2,b=t.md.helpers.parseLinkLabel(t,t.pos+1,!1);if(b<0)return!1;if(s=b+1,s<g&&t.src.charCodeAt(s)===40){for(s++;s<g&&(n=t.src.charCodeAt(s),!(!xe(n)&&n!==10));s++);if(s>=g)return!1;for(l=s,a=t.md.helpers.parseLinkDestination(t.src,s,t.posMax),a.ok&&(f=t.md.normalizeLink(a.str),t.md.validateLink(f)?s=a.pos:f=""),l=s;s<g&&(n=t.src.charCodeAt(s),!(!xe(n)&&n!==10));s++);if(a=t.md.helpers.parseLinkTitle(t.src,s,t.posMax),s<g&&l!==s&&a.ok)for(c=a.str,s=a.pos;s<g&&(n=t.src.charCodeAt(s),!(!xe(n)&&n!==10));s++);else c="";if(s>=g||t.src.charCodeAt(s)!==41)return t.pos=p,!1;s++}else{if(typeof t.env.references>"u")return!1;if(s<g&&t.src.charCodeAt(s)===91?(l=s+1,s=t.md.helpers.parseLinkLabel(t,s),s>=0?i=t.src.slice(l,s++):s=b+1):s=b+1,i||(i=t.src.slice(_,b)),u=t.env.references[vo(i)],!u)return t.pos=p,!1;f=u.href,c=u.title}if(!e){r=t.src.slice(_,b);const R=[];t.md.inline.parse(r,t.md,t.env,R);const N=t.push("image","img",0),B=[["src",f],["alt",""]];N.attrs=B,N.children=R,N.content=r,c&&B.push(["title",c])}return t.pos=s,t.posMax=g,!0}const iE=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,sE=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function uE(t,e){let n=t.pos;if(t.src.charCodeAt(n)!==60)return!1;const r=t.pos,i=t.posMax;for(;;){if(++n>=i)return!1;const u=t.src.charCodeAt(n);if(u===60)return!1;if(u===62)break}const s=t.src.slice(r+1,n);if(sE.test(s)){const u=t.md.normalizeLink(s);if(!t.md.validateLink(u))return!1;if(!e){const a=t.push("link_open","a",1);a.attrs=[["href",u]],a.markup="autolink",a.info="auto";const c=t.push("text","",0);c.content=t.md.normalizeLinkText(s);const l=t.push("link_close","a",-1);l.markup="autolink",l.info="auto"}return t.pos+=s.length+2,!0}if(iE.test(s)){const u=t.md.normalizeLink("mailto:"+s);if(!t.md.validateLink(u))return!1;if(!e){const a=t.push("link_open","a",1);a.attrs=[["href",u]],a.markup="autolink",a.info="auto";const c=t.push("text","",0);c.content=t.md.normalizeLinkText(s);const l=t.push("link_close","a",-1);l.markup="autolink",l.info="auto"}return t.pos+=s.length+2,!0}return!1}function oE(t){return/^<a[>\s]/i.test(t)}function aE(t){return/^<\/a\s*>/i.test(t)}function cE(t){const e=t|32;return e>=97&&e<=122}function lE(t,e){if(!t.md.options.html)return!1;const n=t.posMax,r=t.pos;if(t.src.charCodeAt(r)!==60||r+2>=n)return!1;const i=t.src.charCodeAt(r+1);if(i!==33&&i!==63&&i!==47&&!cE(i))return!1;const s=t.src.slice(r).match(Ub);if(!s)return!1;if(!e){const u=t.push("html_inline","",0);u.content=s[0],oE(u.content)&&t.linkLevel++,aE(u.content)&&t.linkLevel--}return t.pos+=s[0].length,!0}const hE=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,fE=/^&([a-z][a-z0-9]{1,31});/i;function dE(t,e){const n=t.pos,r=t.posMax;if(t.src.charCodeAt(n)!==38||n+1>=r)return!1;if(t.src.charCodeAt(n+1)===35){const s=t.src.slice(n).match(hE);if(s){if(!e){const u=s[1][0].toLowerCase()==="x"?parseInt(s[1].slice(1),16):parseInt(s[1],10),a=t.push("text_special","",0);a.content=zc(u)?zu(u):zu(65533),a.markup=s[0],a.info="entity"}return t.pos+=s[0].length,!0}}else{const s=t.src.slice(n).match(fE);if(s){const u=Ep(s[0]);if(u!==s[0]){if(!e){const a=t.push("text_special","",0);a.content=u,a.markup=s[0],a.info="entity"}return t.pos+=s[0].length,!0}}}return!1}function Sf(t){const e={},n=t.length;if(!n)return;let r=0,i=-2;const s=[];for(let u=0;u<n;u++){const a=t[u];if(s.push(0),(t[r].marker!==a.marker||i!==a.token-1)&&(r=u),i=a.token,a.length=a.length||0,!a.close)continue;e.hasOwnProperty(a.marker)||(e[a.marker]=[-1,-1,-1,-1,-1,-1]);const c=e[a.marker][(a.open?3:0)+a.length%3];let l=r-s[r]-1,f=l;for(;l>c;l-=s[l]+1){const p=t[l];if(p.marker===a.marker&&p.open&&p.end<0){let g=!1;if((p.close||a.open)&&(p.length+a.length)%3===0&&(p.length%3!==0||a.length%3!==0)&&(g=!0),!g){const _=l>0&&!t[l-1].open?s[l-1]+1:0;s[u]=u-l+_,s[l]=_,a.open=!1,p.end=u,p.close=!1,f=-1,i=-2;break}}}f!==-1&&(e[a.marker][(a.open?3:0)+(a.length||0)%3]=f)}}function pE(t){const e=t.tokens_meta,n=t.tokens_meta.length;Sf(t.delimiters);for(let r=0;r<n;r++)e[r]&&e[r].delimiters&&Sf(e[r].delimiters)}function mE(t){let e,n,r=0;const i=t.tokens,s=t.tokens.length;for(e=n=0;e<s;e++)i[e].nesting<0&&r--,i[e].level=r,i[e].nesting>0&&r++,i[e].type==="text"&&e+1<s&&i[e+1].type==="text"?i[e+1].content=i[e].content+i[e+1].content:(e!==n&&(i[n]=i[e]),n++);e!==n&&(i.length=n)}const _a=[["text",Wb],["linkify",Kb],["newline",Qb],["escape",Jb],["backticks",Xb],["strikethrough",Cp.tokenize],["emphasis",Sp.tokenize],["link",nE],["image",rE],["autolink",uE],["html_inline",lE],["entity",dE]],ya=[["balance_pairs",pE],["strikethrough",Cp.postProcess],["emphasis",Sp.postProcess],["fragments_join",mE]];function Fs(){this.ruler=new _t;for(let t=0;t<_a.length;t++)this.ruler.push(_a[t][0],_a[t][1]);this.ruler2=new _t;for(let t=0;t<ya.length;t++)this.ruler2.push(ya[t][0],ya[t][1])}Fs.prototype.skipToken=function(t){const e=t.pos,n=this.ruler.getRules(""),r=n.length,i=t.md.options.maxNesting,s=t.cache;if(typeof s[e]<"u"){t.pos=s[e];return}let u=!1;if(t.level<i){for(let a=0;a<r;a++)if(t.level++,u=n[a](t,!0),t.level--,u){if(e>=t.pos)throw new Error("inline rule didn't increment state.pos");break}}else t.pos=t.posMax;u||t.pos++,s[e]=t.pos};Fs.prototype.tokenize=function(t){const e=this.ruler.getRules(""),n=e.length,r=t.posMax,i=t.md.options.maxNesting;for(;t.pos<r;){const s=t.pos;let u=!1;if(t.level<i){for(let a=0;a<n;a++)if(u=e[a](t,!1),u){if(s>=t.pos)throw new Error("inline rule didn't increment state.pos");break}}if(u){if(t.pos>=r)break;continue}t.pending+=t.src[t.pos++]}t.pending&&t.pushPending()};Fs.prototype.parse=function(t,e,n,r){const i=new this.State(t,e,n,r);this.tokenize(i);const s=this.ruler2.getRules(""),u=s.length;for(let a=0;a<u;a++)s[a](i)};Fs.prototype.State=Ps;function gE(t){const e={};t=t||{},e.src_Any=mp.source,e.src_Cc=gp.source,e.src_Z=yp.source,e.src_P=qc.source,e.src_ZPCc=[e.src_Z,e.src_P,e.src_Cc].join("|"),e.src_ZCc=[e.src_Z,e.src_Cc].join("|");const n="[><｜]";return e.src_pseudo_letter="(?:(?!"+n+"|"+e.src_ZPCc+")"+e.src_Any+")",e.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",e.src_auth="(?:(?:(?!"+e.src_ZCc+"|[@/\\[\\]()]).)+@)?",e.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",e.src_host_terminator="(?=$|"+n+"|"+e.src_ZPCc+")(?!"+(t["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+e.src_ZPCc+"))",e.src_path="(?:[/?#](?:(?!"+e.src_ZCc+"|"+n+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+e.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+e.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+e.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+e.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+e.src_ZCc+"|[']).)+\\'|\\'(?="+e.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+e.src_ZCc+"|[.]|$)|"+(t["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+e.src_ZCc+"|$)|;(?!"+e.src_ZCc+"|$)|\\!+(?!"+e.src_ZCc+"|[!]|$)|\\?(?!"+e.src_ZCc+"|[?]|$))+|\\/)?",e.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',e.src_xn="xn--[a-z0-9\\-]{1,59}",e.src_domain_root="(?:"+e.src_xn+"|"+e.src_pseudo_letter+"{1,63})",e.src_domain="(?:"+e.src_xn+"|(?:"+e.src_pseudo_letter+")|(?:"+e.src_pseudo_letter+"(?:-|"+e.src_pseudo_letter+"){0,61}"+e.src_pseudo_letter+"))",e.src_host="(?:(?:(?:(?:"+e.src_domain+")\\.)*"+e.src_domain+"))",e.tpl_host_fuzzy="(?:"+e.src_ip4+"|(?:(?:(?:"+e.src_domain+")\\.)+(?:%TLDS%)))",e.tpl_host_no_ip_fuzzy="(?:(?:(?:"+e.src_domain+")\\.)+(?:%TLDS%))",e.src_host_strict=e.src_host+e.src_host_terminator,e.tpl_host_fuzzy_strict=e.tpl_host_fuzzy+e.src_host_terminator,e.src_host_port_strict=e.src_host+e.src_port+e.src_host_terminator,e.tpl_host_port_fuzzy_strict=e.tpl_host_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_port_no_ip_fuzzy_strict=e.tpl_host_no_ip_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+e.src_ZPCc+"|>|$))",e.tpl_email_fuzzy="(^|"+n+'|"|\\(|'+e.src_ZCc+")("+e.src_email_name+"@"+e.tpl_host_fuzzy_strict+")",e.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+e.src_ZPCc+"))((?![$+<=>^`|｜])"+e.tpl_host_port_fuzzy_strict+e.src_path+")",e.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+e.src_ZPCc+"))((?![$+<=>^`|｜])"+e.tpl_host_port_no_ip_fuzzy_strict+e.src_path+")",e}function Ga(t){return Array.prototype.slice.call(arguments,1).forEach(function(n){n&&Object.keys(n).forEach(function(r){t[r]=n[r]})}),t}function Ao(t){return Object.prototype.toString.call(t)}function _E(t){return Ao(t)==="[object String]"}function yE(t){return Ao(t)==="[object Object]"}function bE(t){return Ao(t)==="[object RegExp]"}function kf(t){return Ao(t)==="[object Function]"}function EE(t){return t.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const kp={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function vE(t){return Object.keys(t||{}).reduce(function(e,n){return e||kp.hasOwnProperty(n)},!1)}const TE={"http:":{validate:function(t,e,n){const r=t.slice(e);return n.re.http||(n.re.http=new RegExp("^\\/\\/"+n.re.src_auth+n.re.src_host_port_strict+n.re.src_path,"i")),n.re.http.test(r)?r.match(n.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(t,e,n){const r=t.slice(e);return n.re.no_http||(n.re.no_http=new RegExp("^"+n.re.src_auth+"(?:localhost|(?:(?:"+n.re.src_domain+")\\.)+"+n.re.src_domain_root+")"+n.re.src_port+n.re.src_host_terminator+n.re.src_path,"i")),n.re.no_http.test(r)?e>=3&&t[e-3]===":"||e>=3&&t[e-3]==="/"?0:r.match(n.re.no_http)[0].length:0}},"mailto:":{validate:function(t,e,n){const r=t.slice(e);return n.re.mailto||(n.re.mailto=new RegExp("^"+n.re.src_email_name+"@"+n.re.src_host_strict,"i")),n.re.mailto.test(r)?r.match(n.re.mailto)[0].length:0}}},AE="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",wE="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function IE(t){t.__index__=-1,t.__text_cache__=""}function xE(t){return function(e,n){const r=e.slice(n);return t.test(r)?r.match(t)[0].length:0}}function Rf(){return function(t,e){e.normalize(t)}}function $u(t){const e=t.re=gE(t.__opts__),n=t.__tlds__.slice();t.onCompile(),t.__tlds_replaced__||n.push(AE),n.push(e.src_xn),e.src_tlds=n.join("|");function r(a){return a.replace("%TLDS%",e.src_tlds)}e.email_fuzzy=RegExp(r(e.tpl_email_fuzzy),"i"),e.link_fuzzy=RegExp(r(e.tpl_link_fuzzy),"i"),e.link_no_ip_fuzzy=RegExp(r(e.tpl_link_no_ip_fuzzy),"i"),e.host_fuzzy_test=RegExp(r(e.tpl_host_fuzzy_test),"i");const i=[];t.__compiled__={};function s(a,c){throw new Error('(LinkifyIt) Invalid schema "'+a+'": '+c)}Object.keys(t.__schemas__).forEach(function(a){const c=t.__schemas__[a];if(c===null)return;const l={validate:null,link:null};if(t.__compiled__[a]=l,yE(c)){bE(c.validate)?l.validate=xE(c.validate):kf(c.validate)?l.validate=c.validate:s(a,c),kf(c.normalize)?l.normalize=c.normalize:c.normalize?s(a,c):l.normalize=Rf();return}if(_E(c)){i.push(a);return}s(a,c)}),i.forEach(function(a){t.__compiled__[t.__schemas__[a]]&&(t.__compiled__[a].validate=t.__compiled__[t.__schemas__[a]].validate,t.__compiled__[a].normalize=t.__compiled__[t.__schemas__[a]].normalize)}),t.__compiled__[""]={validate:null,normalize:Rf()};const u=Object.keys(t.__compiled__).filter(function(a){return a.length>0&&t.__compiled__[a]}).map(EE).join("|");t.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+e.src_ZPCc+"))("+u+")","i"),t.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+e.src_ZPCc+"))("+u+")","ig"),t.re.schema_at_start=RegExp("^"+t.re.schema_search.source,"i"),t.re.pretest=RegExp("("+t.re.schema_test.source+")|("+t.re.host_fuzzy_test.source+")|@","i"),IE(t)}function CE(t,e){const n=t.__index__,r=t.__last_index__,i=t.__text_cache__.slice(n,r);this.schema=t.__schema__.toLowerCase(),this.index=n+e,this.lastIndex=r+e,this.raw=i,this.text=i,this.url=i}function Ka(t,e){const n=new CE(t,e);return t.__compiled__[n.schema].normalize(n,t),n}function Tt(t,e){if(!(this instanceof Tt))return new Tt(t,e);e||vE(t)&&(e=t,t={}),this.__opts__=Ga({},kp,e),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=Ga({},TE,t),this.__compiled__={},this.__tlds__=wE,this.__tlds_replaced__=!1,this.re={},$u(this)}Tt.prototype.add=function(e,n){return this.__schemas__[e]=n,$u(this),this};Tt.prototype.set=function(e){return this.__opts__=Ga(this.__opts__,e),this};Tt.prototype.test=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return!1;let n,r,i,s,u,a,c,l,f;if(this.re.schema_test.test(e)){for(c=this.re.schema_search,c.lastIndex=0;(n=c.exec(e))!==null;)if(s=this.testSchemaAt(e,n[2],c.lastIndex),s){this.__schema__=n[2],this.__index__=n.index+n[1].length,this.__last_index__=n.index+n[0].length+s;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(l=e.search(this.re.host_fuzzy_test),l>=0&&(this.__index__<0||l<this.__index__)&&(r=e.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(u=r.index+r[1].length,(this.__index__<0||u<this.__index__)&&(this.__schema__="",this.__index__=u,this.__last_index__=r.index+r[0].length))),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&(f=e.indexOf("@"),f>=0&&(i=e.match(this.re.email_fuzzy))!==null&&(u=i.index+i[1].length,a=i.index+i[0].length,(this.__index__<0||u<this.__index__||u===this.__index__&&a>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=u,this.__last_index__=a))),this.__index__>=0};Tt.prototype.pretest=function(e){return this.re.pretest.test(e)};Tt.prototype.testSchemaAt=function(e,n,r){return this.__compiled__[n.toLowerCase()]?this.__compiled__[n.toLowerCase()].validate(e,r,this):0};Tt.prototype.match=function(e){const n=[];let r=0;this.__index__>=0&&this.__text_cache__===e&&(n.push(Ka(this,r)),r=this.__last_index__);let i=r?e.slice(r):e;for(;this.test(i);)n.push(Ka(this,r)),i=i.slice(this.__last_index__),r+=this.__last_index__;return n.length?n:null};Tt.prototype.matchAtStart=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return null;const n=this.re.schema_at_start.exec(e);if(!n)return null;const r=this.testSchemaAt(e,n[2],n[0].length);return r?(this.__schema__=n[2],this.__index__=n.index+n[1].length,this.__last_index__=n.index+n[0].length+r,Ka(this,0)):null};Tt.prototype.tlds=function(e,n){return e=Array.isArray(e)?e:[e],n?(this.__tlds__=this.__tlds__.concat(e).sort().filter(function(r,i,s){return r!==s[i-1]}).reverse(),$u(this),this):(this.__tlds__=e.slice(),this.__tlds_replaced__=!0,$u(this),this)};Tt.prototype.normalize=function(e){e.schema||(e.url="http://"+e.url),e.schema==="mailto:"&&!/^mailto:/i.test(e.url)&&(e.url="mailto:"+e.url)};Tt.prototype.onCompile=function(){};const ri=2147483647,$t=36,Wc=1,ys=26,SE=38,kE=700,Rp=72,Dp=128,Pp="-",RE=/^xn--/,DE=/[^\0-\x7F]/,PE=/[\x2E\u3002\uFF0E\uFF61]/g,FE={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},ba=$t-Wc,Ht=Math.floor,Ea=String.fromCharCode;function On(t){throw new RangeError(FE[t])}function NE(t,e){const n=[];let r=t.length;for(;r--;)n[r]=e(t[r]);return n}function Fp(t,e){const n=t.split("@");let r="";n.length>1&&(r=n[0]+"@",t=n[1]),t=t.replace(PE,".");const i=t.split("."),s=NE(i,e).join(".");return r+s}function Np(t){const e=[];let n=0;const r=t.length;for(;n<r;){const i=t.charCodeAt(n++);if(i>=55296&&i<=56319&&n<r){const s=t.charCodeAt(n++);(s&64512)==56320?e.push(((i&1023)<<10)+(s&1023)+65536):(e.push(i),n--)}else e.push(i)}return e}const VE=t=>String.fromCodePoint(...t),OE=function(t){return t>=48&&t<58?26+(t-48):t>=65&&t<91?t-65:t>=97&&t<123?t-97:$t},Df=function(t,e){return t+22+75*(t<26)-((e!=0)<<5)},Vp=function(t,e,n){let r=0;for(t=n?Ht(t/kE):t>>1,t+=Ht(t/e);t>ba*ys>>1;r+=$t)t=Ht(t/ba);return Ht(r+(ba+1)*t/(t+SE))},Op=function(t){const e=[],n=t.length;let r=0,i=Dp,s=Rp,u=t.lastIndexOf(Pp);u<0&&(u=0);for(let a=0;a<u;++a)t.charCodeAt(a)>=128&&On("not-basic"),e.push(t.charCodeAt(a));for(let a=u>0?u+1:0;a<n;){const c=r;for(let f=1,p=$t;;p+=$t){a>=n&&On("invalid-input");const g=OE(t.charCodeAt(a++));g>=$t&&On("invalid-input"),g>Ht((ri-r)/f)&&On("overflow"),r+=g*f;const _=p<=s?Wc:p>=s+ys?ys:p-s;if(g<_)break;const b=$t-_;f>Ht(ri/b)&&On("overflow"),f*=b}const l=e.length+1;s=Vp(r-c,l,c==0),Ht(r/l)>ri-i&&On("overflow"),i+=Ht(r/l),r%=l,e.splice(r++,0,i)}return String.fromCodePoint(...e)},Mp=function(t){const e=[];t=Np(t);const n=t.length;let r=Dp,i=0,s=Rp;for(const c of t)c<128&&e.push(Ea(c));const u=e.length;let a=u;for(u&&e.push(Pp);a<n;){let c=ri;for(const f of t)f>=r&&f<c&&(c=f);const l=a+1;c-r>Ht((ri-i)/l)&&On("overflow"),i+=(c-r)*l,r=c;for(const f of t)if(f<r&&++i>ri&&On("overflow"),f===r){let p=i;for(let g=$t;;g+=$t){const _=g<=s?Wc:g>=s+ys?ys:g-s;if(p<_)break;const b=p-_,R=$t-_;e.push(Ea(Df(_+b%R,0))),p=Ht(b/R)}e.push(Ea(Df(p,0))),s=Vp(i,l,a===u),i=0,++a}++i,++r}return e.join("")},ME=function(t){return Fp(t,function(e){return RE.test(e)?Op(e.slice(4).toLowerCase()):e})},LE=function(t){return Fp(t,function(e){return DE.test(e)?"xn--"+Mp(e):e})},Lp={version:"2.3.1",ucs2:{decode:Np,encode:VE},decode:Op,encode:Mp,toASCII:LE,toUnicode:ME},UE={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},BE={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},qE={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},jE={default:UE,zero:BE,commonmark:qE},zE=/^(vbscript|javascript|file|data):/,$E=/^data:image\/(gif|png|jpeg|webp);/;function HE(t){const e=t.trim().toLowerCase();return zE.test(e)?$E.test(e):!0}const Up=["http:","https:","mailto:"];function WE(t){const e=Bc(t,!0);if(e.hostname&&(!e.protocol||Up.indexOf(e.protocol)>=0))try{e.hostname=Lp.toASCII(e.hostname)}catch{}return Ds(Uc(e))}function GE(t){const e=Bc(t,!0);if(e.hostname&&(!e.protocol||Up.indexOf(e.protocol)>=0))try{e.hostname=Lp.toUnicode(e.hostname)}catch{}return ci(Uc(e),ci.defaultChars+"%")}function kt(t,e){if(!(this instanceof kt))return new kt(t,e);e||jc(t)||(e=t||{},t="default"),this.inline=new Fs,this.block=new To,this.core=new $c,this.renderer=new bi,this.linkify=new Tt,this.validateLink=HE,this.normalizeLink=WE,this.normalizeLinkText=GE,this.utils=Qy,this.helpers=Eo({},Zy),this.options={},this.configure(t),e&&this.set(e)}kt.prototype.set=function(t){return Eo(this.options,t),this};kt.prototype.configure=function(t){const e=this;if(jc(t)){const n=t;if(t=jE[n],!t)throw new Error('Wrong `markdown-it` preset "'+n+'", check name')}if(!t)throw new Error("Wrong `markdown-it` preset, can't be empty");return t.options&&e.set(t.options),t.components&&Object.keys(t.components).forEach(function(n){t.components[n].rules&&e[n].ruler.enableOnly(t.components[n].rules),t.components[n].rules2&&e[n].ruler2.enableOnly(t.components[n].rules2)}),this};kt.prototype.enable=function(t,e){let n=[];Array.isArray(t)||(t=[t]),["core","block","inline"].forEach(function(i){n=n.concat(this[i].ruler.enable(t,!0))},this),n=n.concat(this.inline.ruler2.enable(t,!0));const r=t.filter(function(i){return n.indexOf(i)<0});if(r.length&&!e)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+r);return this};kt.prototype.disable=function(t,e){let n=[];Array.isArray(t)||(t=[t]),["core","block","inline"].forEach(function(i){n=n.concat(this[i].ruler.disable(t,!0))},this),n=n.concat(this.inline.ruler2.disable(t,!0));const r=t.filter(function(i){return n.indexOf(i)<0});if(r.length&&!e)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+r);return this};kt.prototype.use=function(t){const e=[this].concat(Array.prototype.slice.call(arguments,1));return t.apply(t,e),this};kt.prototype.parse=function(t,e){if(typeof t!="string")throw new Error("Input data should be a String");const n=new this.core.State(t,this,e);return this.core.process(n),n.tokens};kt.prototype.render=function(t,e){return e=e||{},this.renderer.render(this.parse(t,e),this.options,e)};kt.prototype.parseInline=function(t,e){const n=new this.core.State(t,this,e);return n.inlineMode=!0,this.core.process(n),n.tokens};kt.prototype.renderInline=function(t,e){return e=e||{},this.renderer.render(this.parseInline(t,e),this.options,e)};const KE=()=>{};var Pf={};/**
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
 */const Bp=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},QE=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],u=t[n++],a=t[n++],c=((i&7)<<18|(s&63)<<12|(u&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],u=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|u&63)}}return e.join("")},qp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],u=i+1<t.length,a=u?t[i+1]:0,c=i+2<t.length,l=c?t[i+2]:0,f=s>>2,p=(s&3)<<4|a>>4;let g=(a&15)<<2|l>>6,_=l&63;c||(_=64,u||(g=64)),r.push(n[f],n[p],n[g],n[_])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Bp(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):QE(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const l=i<t.length?n[t.charAt(i)]:64;++i;const p=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||a==null||l==null||p==null)throw new JE;const g=s<<2|a>>4;if(r.push(g),l!==64){const _=a<<4&240|l>>2;if(r.push(_),p!==64){const b=l<<6&192|p;r.push(b)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class JE extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const XE=function(t){const e=Bp(t);return qp.encodeByteArray(e,!0)},Hu=function(t){return XE(t).replace(/\./g,"")},jp=function(t){try{return qp.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function YE(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const ZE=()=>YE().__FIREBASE_DEFAULTS__,e3=()=>{if(typeof process>"u"||typeof Pf>"u")return;const t=Pf.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},t3=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&jp(t[1]);return e&&JSON.parse(e)},wo=()=>{try{return KE()||ZE()||e3()||t3()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},zp=t=>wo()?.emulatorHosts?.[t],n3=t=>{const e=zp(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},$p=()=>wo()?.config,Hp=t=>wo()?.[`_${t}`];/**
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
 */class r3{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function Ei(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Wp(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function i3(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const u={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Hu(JSON.stringify(n)),Hu(JSON.stringify(u)),""].join(".")}const is={};function s3(){const t={prod:[],emulator:[]};for(const e of Object.keys(is))is[e]?t.emulator.push(e):t.prod.push(e);return t}function u3(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Ff=!1;function Gp(t,e){if(typeof window>"u"||typeof document>"u"||!Ei(window.location.host)||is[t]===e||is[t]||Ff)return;is[t]=e;function n(g){return`__firebase__banner__${g}`}const r="__firebase__banner",s=s3().prod.length>0;function u(){const g=document.getElementById(r);g&&g.remove()}function a(g){g.style.display="flex",g.style.background="#7faaf0",g.style.position="fixed",g.style.bottom="5px",g.style.left="5px",g.style.padding=".5em",g.style.borderRadius="5px",g.style.alignItems="center"}function c(g,_){g.setAttribute("width","24"),g.setAttribute("id",_),g.setAttribute("height","24"),g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("fill","none"),g.style.marginLeft="-6px"}function l(){const g=document.createElement("span");return g.style.cursor="pointer",g.style.marginLeft="16px",g.style.fontSize="24px",g.innerHTML=" &times;",g.onclick=()=>{Ff=!0,u()},g}function f(g,_){g.setAttribute("id",_),g.innerText="Learn more",g.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",g.setAttribute("target","__blank"),g.style.paddingLeft="5px",g.style.textDecoration="underline"}function p(){const g=u3(r),_=n("text"),b=document.getElementById(_)||document.createElement("span"),R=n("learnmore"),N=document.getElementById(R)||document.createElement("a"),B=n("preprendIcon"),V=document.getElementById(B)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(g.created){const P=g.element;a(P),f(N,R);const k=l();c(V,B),P.append(V,b,N,k),document.body.appendChild(P)}s?(b.innerText="Preview backend disconnected.",V.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(V.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,b.innerText="Preview backend running in this workspace."),b.setAttribute("id",_)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function at(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function o3(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(at())}function a3(){const t=wo()?.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function c3(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function l3(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function h3(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function f3(){const t=at();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function d3(){return!a3()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function p3(){try{return typeof indexedDB=="object"}catch{return!1}}function m3(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(n){e(n)}})}/**
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
 */const g3="FirebaseError";class xn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=g3,Object.setPrototypeOf(this,xn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ns.prototype.create)}}class Ns{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],u=s?_3(s,r):"Error",a=`${this.serviceName}: ${u} (${i}).`;return new xn(i,a,r)}}function _3(t,e){return t.replace(y3,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const y3=/\{\$([^}]+)}/g;function b3(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Cr(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],u=e[i];if(Nf(s)&&Nf(u)){if(!Cr(s,u))return!1}else if(s!==u)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Nf(t){return t!==null&&typeof t=="object"}/**
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
 */function Vs(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function E3(t,e){const n=new v3(t,e);return n.subscribe.bind(n)}class v3{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");T3(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=va),i.error===void 0&&(i.error=va),i.complete===void 0&&(i.complete=va);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function T3(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function va(){}/**
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
 */function yt(t){return t&&t._delegate?t._delegate:t}class Sr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Tr="[DEFAULT]";/**
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
 */class A3{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new r3;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(I3(e))try{this.getOrInitializeService({instanceIdentifier:Tr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Tr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Tr){return this.instances.has(e)}getOptions(e=Tr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,u]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&u.resolve(i)}return i}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:w3(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Tr){return this.component?this.component.multipleInstances?e:Tr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function w3(t){return t===Tr?void 0:t}function I3(t){return t.instantiationMode==="EAGER"}/**
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
 */class x3{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new A3(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var he;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(he||(he={}));const C3={debug:he.DEBUG,verbose:he.VERBOSE,info:he.INFO,warn:he.WARN,error:he.ERROR,silent:he.SILENT},S3=he.INFO,k3={[he.DEBUG]:"log",[he.VERBOSE]:"log",[he.INFO]:"info",[he.WARN]:"warn",[he.ERROR]:"error"},R3=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=k3[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Gc{constructor(e){this.name=e,this._logLevel=S3,this._logHandler=R3,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in he))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?C3[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,he.DEBUG,...e),this._logHandler(this,he.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,he.VERBOSE,...e),this._logHandler(this,he.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,he.INFO,...e),this._logHandler(this,he.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,he.WARN,...e),this._logHandler(this,he.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,he.ERROR,...e),this._logHandler(this,he.ERROR,...e)}}const D3=(t,e)=>e.some(n=>t instanceof n);let Vf,Of;function P3(){return Vf||(Vf=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function F3(){return Of||(Of=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Kp=new WeakMap,Qa=new WeakMap,Qp=new WeakMap,Ta=new WeakMap,Kc=new WeakMap;function N3(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",u)},s=()=>{n(Hn(t.result)),i()},u=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",u)});return e.then(n=>{n instanceof IDBCursor&&Kp.set(n,t)}).catch(()=>{}),Kc.set(e,t),e}function V3(t){if(Qa.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",u),t.removeEventListener("abort",u)},s=()=>{n(),i()},u=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",u),t.addEventListener("abort",u)});Qa.set(t,e)}let Ja={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Qa.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Qp.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Hn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function O3(t){Ja=t(Ja)}function M3(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Aa(this),e,...n);return Qp.set(r,e.sort?e.sort():[e]),Hn(r)}:F3().includes(t)?function(...e){return t.apply(Aa(this),e),Hn(Kp.get(this))}:function(...e){return Hn(t.apply(Aa(this),e))}}function L3(t){return typeof t=="function"?M3(t):(t instanceof IDBTransaction&&V3(t),D3(t,P3())?new Proxy(t,Ja):t)}function Hn(t){if(t instanceof IDBRequest)return N3(t);if(Ta.has(t))return Ta.get(t);const e=L3(t);return e!==t&&(Ta.set(t,e),Kc.set(e,t)),e}const Aa=t=>Kc.get(t);function U3(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const u=indexedDB.open(t,e),a=Hn(u);return r&&u.addEventListener("upgradeneeded",c=>{r(Hn(u.result),c.oldVersion,c.newVersion,Hn(u.transaction),c)}),n&&u.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const B3=["get","getKey","getAll","getAllKeys","count"],q3=["put","add","delete","clear"],wa=new Map;function Mf(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(wa.get(e))return wa.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=q3.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||B3.includes(n)))return;const s=async function(u,...a){const c=this.transaction(u,i?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),i&&c.done]))[0]};return wa.set(e,s),s}O3(t=>({...t,get:(e,n,r)=>Mf(e,n)||t.get(e,n,r),has:(e,n)=>!!Mf(e,n)||t.has(e,n)}));/**
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
 */class j3{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(z3(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function z3(t){return t.getComponent()?.type==="VERSION"}const Xa="@firebase/app",Lf="0.14.2";/**
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
 */const En=new Gc("@firebase/app"),$3="@firebase/app-compat",H3="@firebase/analytics-compat",W3="@firebase/analytics",G3="@firebase/app-check-compat",K3="@firebase/app-check",Q3="@firebase/auth",J3="@firebase/auth-compat",X3="@firebase/database",Y3="@firebase/data-connect",Z3="@firebase/database-compat",e6="@firebase/functions",t6="@firebase/functions-compat",n6="@firebase/installations",r6="@firebase/installations-compat",i6="@firebase/messaging",s6="@firebase/messaging-compat",u6="@firebase/performance",o6="@firebase/performance-compat",a6="@firebase/remote-config",c6="@firebase/remote-config-compat",l6="@firebase/storage",h6="@firebase/storage-compat",f6="@firebase/firestore",d6="@firebase/ai",p6="@firebase/firestore-compat",m6="firebase",g6="12.2.0";/**
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
 */const Ya="[DEFAULT]",_6={[Xa]:"fire-core",[$3]:"fire-core-compat",[W3]:"fire-analytics",[H3]:"fire-analytics-compat",[K3]:"fire-app-check",[G3]:"fire-app-check-compat",[Q3]:"fire-auth",[J3]:"fire-auth-compat",[X3]:"fire-rtdb",[Y3]:"fire-data-connect",[Z3]:"fire-rtdb-compat",[e6]:"fire-fn",[t6]:"fire-fn-compat",[n6]:"fire-iid",[r6]:"fire-iid-compat",[i6]:"fire-fcm",[s6]:"fire-fcm-compat",[u6]:"fire-perf",[o6]:"fire-perf-compat",[a6]:"fire-rc",[c6]:"fire-rc-compat",[l6]:"fire-gcs",[h6]:"fire-gcs-compat",[f6]:"fire-fst",[p6]:"fire-fst-compat",[d6]:"fire-vertex","fire-js":"fire-js",[m6]:"fire-js-all"};/**
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
 */const Wu=new Map,y6=new Map,Za=new Map;function Uf(t,e){try{t.container.addComponent(e)}catch(n){En.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function hi(t){const e=t.name;if(Za.has(e))return En.debug(`There were multiple attempts to register component ${e}.`),!1;Za.set(e,t);for(const n of Wu.values())Uf(n,t);for(const n of y6.values())Uf(n,t);return!0}function Qc(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ft(t){return t==null?!1:t.settings!==void 0}/**
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
 */const b6={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Wn=new Ns("app","Firebase",b6);/**
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
 */class E6{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Sr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Wn.create("app-deleted",{appName:this._name})}}/**
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
 */const vi=g6;function Jp(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:Ya,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw Wn.create("bad-app-name",{appName:String(i)});if(n||(n=$p()),!n)throw Wn.create("no-options");const s=Wu.get(i);if(s){if(Cr(n,s.options)&&Cr(r,s.config))return s;throw Wn.create("duplicate-app",{appName:i})}const u=new x3(i);for(const c of Za.values())u.addComponent(c);const a=new E6(n,r,u);return Wu.set(i,a),a}function Xp(t=Ya){const e=Wu.get(t);if(!e&&t===Ya&&$p())return Jp();if(!e)throw Wn.create("no-app",{appName:t});return e}function Gn(t,e,n){let r=_6[t]??t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const u=[`Unable to register library "${r}" with version "${e}":`];i&&u.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&u.push("and"),s&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),En.warn(u.join(" "));return}hi(new Sr(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const v6="firebase-heartbeat-database",T6=1,bs="firebase-heartbeat-store";let Ia=null;function Yp(){return Ia||(Ia=U3(v6,T6,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(bs)}catch(n){console.warn(n)}}}}).catch(t=>{throw Wn.create("idb-open",{originalErrorMessage:t.message})})),Ia}async function A6(t){try{const n=(await Yp()).transaction(bs),r=await n.objectStore(bs).get(Zp(t));return await n.done,r}catch(e){if(e instanceof xn)En.warn(e.message);else{const n=Wn.create("idb-get",{originalErrorMessage:e?.message});En.warn(n.message)}}}async function Bf(t,e){try{const r=(await Yp()).transaction(bs,"readwrite");await r.objectStore(bs).put(e,Zp(t)),await r.done}catch(n){if(n instanceof xn)En.warn(n.message);else{const r=Wn.create("idb-set",{originalErrorMessage:n?.message});En.warn(r.message)}}}function Zp(t){return`${t.name}!${t.options.appId}`}/**
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
 */const w6=1024,I6=30;class x6{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new S6(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=qf();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>I6){const i=k6(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){En.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=qf(),{heartbeatsToSend:n,unsentEntries:r}=C6(this._heartbeatsCache.heartbeats),i=Hu(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return En.warn(e),""}}}function qf(){return new Date().toISOString().substring(0,10)}function C6(t,e=w6){const n=[];let r=t.slice();for(const i of t){const s=n.find(u=>u.agent===i.agent);if(s){if(s.dates.push(i.date),jf(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),jf(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class S6{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return p3()?m3().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await A6(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Bf(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Bf(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function jf(t){return Hu(JSON.stringify({version:2,heartbeats:t})).length}function k6(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
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
 */function R6(t){hi(new Sr("platform-logger",e=>new j3(e),"PRIVATE")),hi(new Sr("heartbeat",e=>new x6(e),"PRIVATE")),Gn(Xa,Lf,t),Gn(Xa,Lf,"esm2020"),Gn("fire-js","")}R6("");var D6="firebase",P6="12.2.1";/**
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
 */Gn(D6,P6,"app");var zf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Kn,em;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(A,y){function E(){}E.prototype=y.prototype,A.D=y.prototype,A.prototype=new E,A.prototype.constructor=A,A.C=function(w,x,S){for(var T=Array(arguments.length-2),Ze=2;Ze<arguments.length;Ze++)T[Ze-2]=arguments[Ze];return y.prototype[x].apply(w,T)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(A,y,E){E||(E=0);var w=Array(16);if(typeof y=="string")for(var x=0;16>x;++x)w[x]=y.charCodeAt(E++)|y.charCodeAt(E++)<<8|y.charCodeAt(E++)<<16|y.charCodeAt(E++)<<24;else for(x=0;16>x;++x)w[x]=y[E++]|y[E++]<<8|y[E++]<<16|y[E++]<<24;y=A.g[0],E=A.g[1],x=A.g[2];var S=A.g[3],T=y+(S^E&(x^S))+w[0]+3614090360&4294967295;y=E+(T<<7&4294967295|T>>>25),T=S+(x^y&(E^x))+w[1]+3905402710&4294967295,S=y+(T<<12&4294967295|T>>>20),T=x+(E^S&(y^E))+w[2]+606105819&4294967295,x=S+(T<<17&4294967295|T>>>15),T=E+(y^x&(S^y))+w[3]+3250441966&4294967295,E=x+(T<<22&4294967295|T>>>10),T=y+(S^E&(x^S))+w[4]+4118548399&4294967295,y=E+(T<<7&4294967295|T>>>25),T=S+(x^y&(E^x))+w[5]+1200080426&4294967295,S=y+(T<<12&4294967295|T>>>20),T=x+(E^S&(y^E))+w[6]+2821735955&4294967295,x=S+(T<<17&4294967295|T>>>15),T=E+(y^x&(S^y))+w[7]+4249261313&4294967295,E=x+(T<<22&4294967295|T>>>10),T=y+(S^E&(x^S))+w[8]+1770035416&4294967295,y=E+(T<<7&4294967295|T>>>25),T=S+(x^y&(E^x))+w[9]+2336552879&4294967295,S=y+(T<<12&4294967295|T>>>20),T=x+(E^S&(y^E))+w[10]+4294925233&4294967295,x=S+(T<<17&4294967295|T>>>15),T=E+(y^x&(S^y))+w[11]+2304563134&4294967295,E=x+(T<<22&4294967295|T>>>10),T=y+(S^E&(x^S))+w[12]+1804603682&4294967295,y=E+(T<<7&4294967295|T>>>25),T=S+(x^y&(E^x))+w[13]+4254626195&4294967295,S=y+(T<<12&4294967295|T>>>20),T=x+(E^S&(y^E))+w[14]+2792965006&4294967295,x=S+(T<<17&4294967295|T>>>15),T=E+(y^x&(S^y))+w[15]+1236535329&4294967295,E=x+(T<<22&4294967295|T>>>10),T=y+(x^S&(E^x))+w[1]+4129170786&4294967295,y=E+(T<<5&4294967295|T>>>27),T=S+(E^x&(y^E))+w[6]+3225465664&4294967295,S=y+(T<<9&4294967295|T>>>23),T=x+(y^E&(S^y))+w[11]+643717713&4294967295,x=S+(T<<14&4294967295|T>>>18),T=E+(S^y&(x^S))+w[0]+3921069994&4294967295,E=x+(T<<20&4294967295|T>>>12),T=y+(x^S&(E^x))+w[5]+3593408605&4294967295,y=E+(T<<5&4294967295|T>>>27),T=S+(E^x&(y^E))+w[10]+38016083&4294967295,S=y+(T<<9&4294967295|T>>>23),T=x+(y^E&(S^y))+w[15]+3634488961&4294967295,x=S+(T<<14&4294967295|T>>>18),T=E+(S^y&(x^S))+w[4]+3889429448&4294967295,E=x+(T<<20&4294967295|T>>>12),T=y+(x^S&(E^x))+w[9]+568446438&4294967295,y=E+(T<<5&4294967295|T>>>27),T=S+(E^x&(y^E))+w[14]+3275163606&4294967295,S=y+(T<<9&4294967295|T>>>23),T=x+(y^E&(S^y))+w[3]+4107603335&4294967295,x=S+(T<<14&4294967295|T>>>18),T=E+(S^y&(x^S))+w[8]+1163531501&4294967295,E=x+(T<<20&4294967295|T>>>12),T=y+(x^S&(E^x))+w[13]+2850285829&4294967295,y=E+(T<<5&4294967295|T>>>27),T=S+(E^x&(y^E))+w[2]+4243563512&4294967295,S=y+(T<<9&4294967295|T>>>23),T=x+(y^E&(S^y))+w[7]+1735328473&4294967295,x=S+(T<<14&4294967295|T>>>18),T=E+(S^y&(x^S))+w[12]+2368359562&4294967295,E=x+(T<<20&4294967295|T>>>12),T=y+(E^x^S)+w[5]+4294588738&4294967295,y=E+(T<<4&4294967295|T>>>28),T=S+(y^E^x)+w[8]+2272392833&4294967295,S=y+(T<<11&4294967295|T>>>21),T=x+(S^y^E)+w[11]+1839030562&4294967295,x=S+(T<<16&4294967295|T>>>16),T=E+(x^S^y)+w[14]+4259657740&4294967295,E=x+(T<<23&4294967295|T>>>9),T=y+(E^x^S)+w[1]+2763975236&4294967295,y=E+(T<<4&4294967295|T>>>28),T=S+(y^E^x)+w[4]+1272893353&4294967295,S=y+(T<<11&4294967295|T>>>21),T=x+(S^y^E)+w[7]+4139469664&4294967295,x=S+(T<<16&4294967295|T>>>16),T=E+(x^S^y)+w[10]+3200236656&4294967295,E=x+(T<<23&4294967295|T>>>9),T=y+(E^x^S)+w[13]+681279174&4294967295,y=E+(T<<4&4294967295|T>>>28),T=S+(y^E^x)+w[0]+3936430074&4294967295,S=y+(T<<11&4294967295|T>>>21),T=x+(S^y^E)+w[3]+3572445317&4294967295,x=S+(T<<16&4294967295|T>>>16),T=E+(x^S^y)+w[6]+76029189&4294967295,E=x+(T<<23&4294967295|T>>>9),T=y+(E^x^S)+w[9]+3654602809&4294967295,y=E+(T<<4&4294967295|T>>>28),T=S+(y^E^x)+w[12]+3873151461&4294967295,S=y+(T<<11&4294967295|T>>>21),T=x+(S^y^E)+w[15]+530742520&4294967295,x=S+(T<<16&4294967295|T>>>16),T=E+(x^S^y)+w[2]+3299628645&4294967295,E=x+(T<<23&4294967295|T>>>9),T=y+(x^(E|~S))+w[0]+4096336452&4294967295,y=E+(T<<6&4294967295|T>>>26),T=S+(E^(y|~x))+w[7]+1126891415&4294967295,S=y+(T<<10&4294967295|T>>>22),T=x+(y^(S|~E))+w[14]+2878612391&4294967295,x=S+(T<<15&4294967295|T>>>17),T=E+(S^(x|~y))+w[5]+4237533241&4294967295,E=x+(T<<21&4294967295|T>>>11),T=y+(x^(E|~S))+w[12]+1700485571&4294967295,y=E+(T<<6&4294967295|T>>>26),T=S+(E^(y|~x))+w[3]+2399980690&4294967295,S=y+(T<<10&4294967295|T>>>22),T=x+(y^(S|~E))+w[10]+4293915773&4294967295,x=S+(T<<15&4294967295|T>>>17),T=E+(S^(x|~y))+w[1]+2240044497&4294967295,E=x+(T<<21&4294967295|T>>>11),T=y+(x^(E|~S))+w[8]+1873313359&4294967295,y=E+(T<<6&4294967295|T>>>26),T=S+(E^(y|~x))+w[15]+4264355552&4294967295,S=y+(T<<10&4294967295|T>>>22),T=x+(y^(S|~E))+w[6]+2734768916&4294967295,x=S+(T<<15&4294967295|T>>>17),T=E+(S^(x|~y))+w[13]+1309151649&4294967295,E=x+(T<<21&4294967295|T>>>11),T=y+(x^(E|~S))+w[4]+4149444226&4294967295,y=E+(T<<6&4294967295|T>>>26),T=S+(E^(y|~x))+w[11]+3174756917&4294967295,S=y+(T<<10&4294967295|T>>>22),T=x+(y^(S|~E))+w[2]+718787259&4294967295,x=S+(T<<15&4294967295|T>>>17),T=E+(S^(x|~y))+w[9]+3951481745&4294967295,A.g[0]=A.g[0]+y&4294967295,A.g[1]=A.g[1]+(x+(T<<21&4294967295|T>>>11))&4294967295,A.g[2]=A.g[2]+x&4294967295,A.g[3]=A.g[3]+S&4294967295}r.prototype.u=function(A,y){y===void 0&&(y=A.length);for(var E=y-this.blockSize,w=this.B,x=this.h,S=0;S<y;){if(x==0)for(;S<=E;)i(this,A,S),S+=this.blockSize;if(typeof A=="string"){for(;S<y;)if(w[x++]=A.charCodeAt(S++),x==this.blockSize){i(this,w),x=0;break}}else for(;S<y;)if(w[x++]=A[S++],x==this.blockSize){i(this,w),x=0;break}}this.h=x,this.o+=y},r.prototype.v=function(){var A=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);A[0]=128;for(var y=1;y<A.length-8;++y)A[y]=0;var E=8*this.o;for(y=A.length-8;y<A.length;++y)A[y]=E&255,E/=256;for(this.u(A),A=Array(16),y=E=0;4>y;++y)for(var w=0;32>w;w+=8)A[E++]=this.g[y]>>>w&255;return A};function s(A,y){var E=a;return Object.prototype.hasOwnProperty.call(E,A)?E[A]:E[A]=y(A)}function u(A,y){this.h=y;for(var E=[],w=!0,x=A.length-1;0<=x;x--){var S=A[x]|0;w&&S==y||(E[x]=S,w=!1)}this.g=E}var a={};function c(A){return-128<=A&&128>A?s(A,function(y){return new u([y|0],0>y?-1:0)}):new u([A|0],0>A?-1:0)}function l(A){if(isNaN(A)||!isFinite(A))return p;if(0>A)return N(l(-A));for(var y=[],E=1,w=0;A>=E;w++)y[w]=A/E|0,E*=4294967296;return new u(y,0)}function f(A,y){if(A.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(A.charAt(0)=="-")return N(f(A.substring(1),y));if(0<=A.indexOf("-"))throw Error('number format error: interior "-" character');for(var E=l(Math.pow(y,8)),w=p,x=0;x<A.length;x+=8){var S=Math.min(8,A.length-x),T=parseInt(A.substring(x,x+S),y);8>S?(S=l(Math.pow(y,S)),w=w.j(S).add(l(T))):(w=w.j(E),w=w.add(l(T)))}return w}var p=c(0),g=c(1),_=c(16777216);t=u.prototype,t.m=function(){if(R(this))return-N(this).m();for(var A=0,y=1,E=0;E<this.g.length;E++){var w=this.i(E);A+=(0<=w?w:4294967296+w)*y,y*=4294967296}return A},t.toString=function(A){if(A=A||10,2>A||36<A)throw Error("radix out of range: "+A);if(b(this))return"0";if(R(this))return"-"+N(this).toString(A);for(var y=l(Math.pow(A,6)),E=this,w="";;){var x=k(E,y).g;E=B(E,x.j(y));var S=((0<E.g.length?E.g[0]:E.h)>>>0).toString(A);if(E=x,b(E))return S+w;for(;6>S.length;)S="0"+S;w=S+w}},t.i=function(A){return 0>A?0:A<this.g.length?this.g[A]:this.h};function b(A){if(A.h!=0)return!1;for(var y=0;y<A.g.length;y++)if(A.g[y]!=0)return!1;return!0}function R(A){return A.h==-1}t.l=function(A){return A=B(this,A),R(A)?-1:b(A)?0:1};function N(A){for(var y=A.g.length,E=[],w=0;w<y;w++)E[w]=~A.g[w];return new u(E,~A.h).add(g)}t.abs=function(){return R(this)?N(this):this},t.add=function(A){for(var y=Math.max(this.g.length,A.g.length),E=[],w=0,x=0;x<=y;x++){var S=w+(this.i(x)&65535)+(A.i(x)&65535),T=(S>>>16)+(this.i(x)>>>16)+(A.i(x)>>>16);w=T>>>16,S&=65535,T&=65535,E[x]=T<<16|S}return new u(E,E[E.length-1]&-2147483648?-1:0)};function B(A,y){return A.add(N(y))}t.j=function(A){if(b(this)||b(A))return p;if(R(this))return R(A)?N(this).j(N(A)):N(N(this).j(A));if(R(A))return N(this.j(N(A)));if(0>this.l(_)&&0>A.l(_))return l(this.m()*A.m());for(var y=this.g.length+A.g.length,E=[],w=0;w<2*y;w++)E[w]=0;for(w=0;w<this.g.length;w++)for(var x=0;x<A.g.length;x++){var S=this.i(w)>>>16,T=this.i(w)&65535,Ze=A.i(x)>>>16,ct=A.i(x)&65535;E[2*w+2*x]+=T*ct,V(E,2*w+2*x),E[2*w+2*x+1]+=S*ct,V(E,2*w+2*x+1),E[2*w+2*x+1]+=T*Ze,V(E,2*w+2*x+1),E[2*w+2*x+2]+=S*Ze,V(E,2*w+2*x+2)}for(w=0;w<y;w++)E[w]=E[2*w+1]<<16|E[2*w];for(w=y;w<2*y;w++)E[w]=0;return new u(E,0)};function V(A,y){for(;(A[y]&65535)!=A[y];)A[y+1]+=A[y]>>>16,A[y]&=65535,y++}function P(A,y){this.g=A,this.h=y}function k(A,y){if(b(y))throw Error("division by zero");if(b(A))return new P(p,p);if(R(A))return y=k(N(A),y),new P(N(y.g),N(y.h));if(R(y))return y=k(A,N(y)),new P(N(y.g),y.h);if(30<A.g.length){if(R(A)||R(y))throw Error("slowDivide_ only works with positive integers.");for(var E=g,w=y;0>=w.l(A);)E=q(E),w=q(w);var x=Q(E,1),S=Q(w,1);for(w=Q(w,2),E=Q(E,2);!b(w);){var T=S.add(w);0>=T.l(A)&&(x=x.add(E),S=T),w=Q(w,1),E=Q(E,1)}return y=B(A,x.j(y)),new P(x,y)}for(x=p;0<=A.l(y);){for(E=Math.max(1,Math.floor(A.m()/y.m())),w=Math.ceil(Math.log(E)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),S=l(E),T=S.j(y);R(T)||0<T.l(A);)E-=w,S=l(E),T=S.j(y);b(S)&&(S=g),x=x.add(S),A=B(A,T)}return new P(x,A)}t.A=function(A){return k(this,A).h},t.and=function(A){for(var y=Math.max(this.g.length,A.g.length),E=[],w=0;w<y;w++)E[w]=this.i(w)&A.i(w);return new u(E,this.h&A.h)},t.or=function(A){for(var y=Math.max(this.g.length,A.g.length),E=[],w=0;w<y;w++)E[w]=this.i(w)|A.i(w);return new u(E,this.h|A.h)},t.xor=function(A){for(var y=Math.max(this.g.length,A.g.length),E=[],w=0;w<y;w++)E[w]=this.i(w)^A.i(w);return new u(E,this.h^A.h)};function q(A){for(var y=A.g.length+1,E=[],w=0;w<y;w++)E[w]=A.i(w)<<1|A.i(w-1)>>>31;return new u(E,A.h)}function Q(A,y){var E=y>>5;y%=32;for(var w=A.g.length-E,x=[],S=0;S<w;S++)x[S]=0<y?A.i(S+E)>>>y|A.i(S+E+1)<<32-y:A.i(S+E);return new u(x,A.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,em=r,u.prototype.add=u.prototype.add,u.prototype.multiply=u.prototype.j,u.prototype.modulo=u.prototype.A,u.prototype.compare=u.prototype.l,u.prototype.toNumber=u.prototype.m,u.prototype.toString=u.prototype.toString,u.prototype.getBits=u.prototype.i,u.fromNumber=l,u.fromString=f,Kn=u}).apply(typeof zf<"u"?zf:typeof self<"u"?self:typeof window<"u"?window:{});var du=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var tm,Gi,nm,Iu,ec,rm,im,sm;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,h,d){return o==Array.prototype||o==Object.prototype||(o[h]=d.value),o};function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof du=="object"&&du];for(var h=0;h<o.length;++h){var d=o[h];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=n(this);function i(o,h){if(h)e:{var d=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var C=o[m];if(!(C in d))break e;d=d[C]}o=o[o.length-1],m=d[o],h=h(m),h!=m&&h!=null&&e(d,o,{configurable:!0,writable:!0,value:h})}}function s(o,h){o instanceof String&&(o+="");var d=0,m=!1,C={next:function(){if(!m&&d<o.length){var D=d++;return{value:h(D,o[D]),done:!1}}return m=!0,{done:!0,value:void 0}}};return C[Symbol.iterator]=function(){return C},C}i("Array.prototype.values",function(o){return o||function(){return s(this,function(h,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var u=u||{},a=this||self;function c(o){var h=typeof o;return h=h!="object"?h:o?Array.isArray(o)?"array":h:"null",h=="array"||h=="object"&&typeof o.length=="number"}function l(o){var h=typeof o;return h=="object"&&o!=null||h=="function"}function f(o,h,d){return o.call.apply(o.bind,arguments)}function p(o,h,d){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var C=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(C,m),o.apply(h,C)}}return function(){return o.apply(h,arguments)}}function g(o,h,d){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,g.apply(null,arguments)}function _(o,h){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function b(o,h){function d(){}d.prototype=h.prototype,o.aa=h.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(m,C,D){for(var W=Array(arguments.length-2),Te=2;Te<arguments.length;Te++)W[Te-2]=arguments[Te];return h.prototype[C].apply(m,W)}}function R(o){const h=o.length;if(0<h){const d=Array(h);for(let m=0;m<h;m++)d[m]=o[m];return d}return[]}function N(o,h){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(c(m)){const C=o.length||0,D=m.length||0;o.length=C+D;for(let W=0;W<D;W++)o[C+W]=m[W]}else o.push(m)}}class B{constructor(h,d){this.i=h,this.j=d,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function V(o){return/^[\s\xa0]*$/.test(o)}function P(){var o=a.navigator;return o&&(o=o.userAgent)?o:""}function k(o){return k[" "](o),o}k[" "]=function(){};var q=P().indexOf("Gecko")!=-1&&!(P().toLowerCase().indexOf("webkit")!=-1&&P().indexOf("Edge")==-1)&&!(P().indexOf("Trident")!=-1||P().indexOf("MSIE")!=-1)&&P().indexOf("Edge")==-1;function Q(o,h,d){for(const m in o)h.call(d,o[m],m,o)}function A(o,h){for(const d in o)h.call(void 0,o[d],d,o)}function y(o){const h={};for(const d in o)h[d]=o[d];return h}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(o,h){let d,m;for(let C=1;C<arguments.length;C++){m=arguments[C];for(d in m)o[d]=m[d];for(let D=0;D<E.length;D++)d=E[D],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function x(o){var h=1;o=o.split(":");const d=[];for(;0<h&&o.length;)d.push(o.shift()),h--;return o.length&&d.push(o.join(":")),d}function S(o){a.setTimeout(()=>{throw o},0)}function T(){var o=Rt;let h=null;return o.g&&(h=o.g,o.g=o.g.next,o.g||(o.h=null),h.next=null),h}class Ze{constructor(){this.h=this.g=null}add(h,d){const m=ct.get();m.set(h,d),this.h?this.h.next=m:this.g=m,this.h=m}}var ct=new B(()=>new Me,o=>o.reset());class Me{constructor(){this.next=this.g=this.h=null}set(h,d){this.h=h,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let ve,ge=!1,Rt=new Ze,fr=()=>{const o=a.Promise.resolve(void 0);ve=()=>{o.then(sn)}};var sn=()=>{for(var o;o=T();){try{o.h.call(o.g)}catch(d){S(d)}var h=ct;h.j(o),100>h.h&&(h.h++,o.next=h.g,h.g=o)}ge=!1};function Le(){this.s=this.s,this.C=this.C}Le.prototype.s=!1,Le.prototype.ma=function(){this.s||(this.s=!0,this.N())},Le.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ue(o,h){this.type=o,this.g=this.target=h,this.defaultPrevented=!1}Ue.prototype.h=function(){this.defaultPrevented=!0};var jo=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,h=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,h),a.removeEventListener("test",d,h)}catch{}return o})();function dr(o,h){if(Ue.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=h,h=o.relatedTarget){if(q){e:{try{k(h.nodeName);var C=!0;break e}catch{}C=!1}C||(h=null)}}else d=="mouseover"?h=o.fromElement:d=="mouseout"&&(h=o.toElement);this.relatedTarget=h,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:pr[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&dr.aa.h.call(this)}}b(dr,Ue);var pr={2:"touch",3:"pen",4:"mouse"};dr.prototype.h=function(){dr.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var un="closure_listenable_"+(1e6*Math.random()|0),Si=0;function $s(o,h,d,m,C){this.listener=o,this.proxy=null,this.src=h,this.type=d,this.capture=!!m,this.ha=C,this.key=++Si,this.da=this.fa=!1}function Ut(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function ki(o){this.src=o,this.g={},this.h=0}ki.prototype.add=function(o,h,d,m,C){var D=o.toString();o=this.g[D],o||(o=this.g[D]=[],this.h++);var W=I(o,h,m,C);return-1<W?(h=o[W],d||(h.fa=!1)):(h=new $s(h,this.src,D,!!m,C),h.fa=d,o.push(h)),h};function v(o,h){var d=h.type;if(d in o.g){var m=o.g[d],C=Array.prototype.indexOf.call(m,h,void 0),D;(D=0<=C)&&Array.prototype.splice.call(m,C,1),D&&(Ut(h),o.g[d].length==0&&(delete o.g[d],o.h--))}}function I(o,h,d,m){for(var C=0;C<o.length;++C){var D=o[C];if(!D.da&&D.listener==h&&D.capture==!!d&&D.ha==m)return C}return-1}var F="closure_lm_"+(1e6*Math.random()|0),j={};function L(o,h,d,m,C){if(Array.isArray(h)){for(var D=0;D<h.length;D++)L(o,h[D],d,m,C);return null}return d=re(d),o&&o[un]?o.K(h,d,l(m)?!!m.capture:!1,C):U(o,h,d,!1,m,C)}function U(o,h,d,m,C,D){if(!h)throw Error("Invalid event type");var W=l(C)?!!C.capture:!!C,Te=K(o);if(Te||(o[F]=Te=new ki(o)),d=Te.add(h,d,m,W,D),d.proxy)return d;if(m=G(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)jo||(C=W),C===void 0&&(C=!1),o.addEventListener(h.toString(),m,C);else if(o.attachEvent)o.attachEvent(z(h.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function G(){function o(d){return h.call(o.src,o.listener,d)}const h=ee;return o}function H(o,h,d,m,C){if(Array.isArray(h))for(var D=0;D<h.length;D++)H(o,h[D],d,m,C);else m=l(m)?!!m.capture:!!m,d=re(d),o&&o[un]?(o=o.i,h=String(h).toString(),h in o.g&&(D=o.g[h],d=I(D,d,m,C),-1<d&&(Ut(D[d]),Array.prototype.splice.call(D,d,1),D.length==0&&(delete o.g[h],o.h--)))):o&&(o=K(o))&&(h=o.g[h.toString()],o=-1,h&&(o=I(h,d,m,C)),(d=-1<o?h[o]:null)&&$(d))}function $(o){if(typeof o!="number"&&o&&!o.da){var h=o.src;if(h&&h[un])v(h.i,o);else{var d=o.type,m=o.proxy;h.removeEventListener?h.removeEventListener(d,m,o.capture):h.detachEvent?h.detachEvent(z(d),m):h.addListener&&h.removeListener&&h.removeListener(m),(d=K(h))?(v(d,o),d.h==0&&(d.src=null,h[F]=null)):Ut(o)}}}function z(o){return o in j?j[o]:j[o]="on"+o}function ee(o,h){if(o.da)o=!0;else{h=new dr(h,this);var d=o.listener,m=o.ha||o.src;o.fa&&$(o),o=d.call(m,h)}return o}function K(o){return o=o[F],o instanceof ki?o:null}var Y="__closure_events_fn_"+(1e9*Math.random()>>>0);function re(o){return typeof o=="function"?o:(o[Y]||(o[Y]=function(h){return o.handleEvent(h)}),o[Y])}function te(){Le.call(this),this.i=new ki(this),this.M=this,this.F=null}b(te,Le),te.prototype[un]=!0,te.prototype.removeEventListener=function(o,h,d,m){H(this,o,h,d,m)};function ae(o,h){var d,m=o.F;if(m)for(d=[];m;m=m.F)d.push(m);if(o=o.M,m=h.type||h,typeof h=="string")h=new Ue(h,o);else if(h instanceof Ue)h.target=h.target||o;else{var C=h;h=new Ue(m,o),w(h,C)}if(C=!0,d)for(var D=d.length-1;0<=D;D--){var W=h.g=d[D];C=pe(W,m,!0,h)&&C}if(W=h.g=o,C=pe(W,m,!0,h)&&C,C=pe(W,m,!1,h)&&C,d)for(D=0;D<d.length;D++)W=h.g=d[D],C=pe(W,m,!1,h)&&C}te.prototype.N=function(){if(te.aa.N.call(this),this.i){var o=this.i,h;for(h in o.g){for(var d=o.g[h],m=0;m<d.length;m++)Ut(d[m]);delete o.g[h],o.h--}}this.F=null},te.prototype.K=function(o,h,d,m){return this.i.add(String(o),h,!1,d,m)},te.prototype.L=function(o,h,d,m){return this.i.add(String(o),h,!0,d,m)};function pe(o,h,d,m){if(h=o.i.g[String(h)],!h)return!0;h=h.concat();for(var C=!0,D=0;D<h.length;++D){var W=h[D];if(W&&!W.da&&W.capture==d){var Te=W.listener,Ke=W.ha||W.src;W.fa&&v(o.i,W),C=Te.call(Ke,m)!==!1&&C}}return C&&!m.defaultPrevented}function He(o,h,d){if(typeof o=="function")d&&(o=g(o,d));else if(o&&typeof o.handleEvent=="function")o=g(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:a.setTimeout(o,h||0)}function We(o){o.g=He(()=>{o.g=null,o.i&&(o.i=!1,We(o))},o.l);const h=o.h;o.h=null,o.m.apply(null,h)}class At extends Le{constructor(h,d){super(),this.m=h,this.l=d,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:We(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function et(o){Le.call(this),this.h=o,this.g={}}b(et,Le);var Cn=[];function Ri(o){Q(o.g,function(h,d){this.g.hasOwnProperty(d)&&$(h)},o),o.g={}}et.prototype.N=function(){et.aa.N.call(this),Ri(this)},et.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ge=a.JSON.stringify,wt=a.JSON.parse,Hs=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function Mr(){}Mr.prototype.h=null;function ql(o){return o.h||(o.h=o.i())}function jl(){}var Di={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function zo(){Ue.call(this,"d")}b(zo,Ue);function $o(){Ue.call(this,"c")}b($o,Ue);var mr={},zl=null;function Ws(){return zl=zl||new te}mr.La="serverreachability";function $l(o){Ue.call(this,mr.La,o)}b($l,Ue);function Pi(o){const h=Ws();ae(h,new $l(h))}mr.STAT_EVENT="statevent";function Hl(o,h){Ue.call(this,mr.STAT_EVENT,o),this.stat=h}b(Hl,Ue);function lt(o){const h=Ws();ae(h,new Hl(h,o))}mr.Ma="timingevent";function Wl(o,h){Ue.call(this,mr.Ma,o),this.size=h}b(Wl,Ue);function Fi(o,h){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},h)}function Ni(){this.g=!0}Ni.prototype.xa=function(){this.g=!1};function d1(o,h,d,m,C,D){o.info(function(){if(o.g)if(D)for(var W="",Te=D.split("&"),Ke=0;Ke<Te.length;Ke++){var _e=Te[Ke].split("=");if(1<_e.length){var tt=_e[0];_e=_e[1];var nt=tt.split("_");W=2<=nt.length&&nt[1]=="type"?W+(tt+"="+_e+"&"):W+(tt+"=redacted&")}}else W=null;else W=D;return"XMLHTTP REQ ("+m+") [attempt "+C+"]: "+h+`
`+d+`
`+W})}function p1(o,h,d,m,C,D,W){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+C+"]: "+h+`
`+d+`
`+D+" "+W})}function Lr(o,h,d,m){o.info(function(){return"XMLHTTP TEXT ("+h+"): "+g1(o,d)+(m?" "+m:"")})}function m1(o,h){o.info(function(){return"TIMEOUT: "+h})}Ni.prototype.info=function(){};function g1(o,h){if(!o.g)return h;if(!h)return null;try{var d=JSON.parse(h);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var m=d[o];if(!(2>m.length)){var C=m[1];if(Array.isArray(C)&&!(1>C.length)){var D=C[0];if(D!="noop"&&D!="stop"&&D!="close")for(var W=1;W<C.length;W++)C[W]=""}}}}return Ge(d)}catch{return h}}var Gs={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Gl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ho;function Ks(){}b(Ks,Mr),Ks.prototype.g=function(){return new XMLHttpRequest},Ks.prototype.i=function(){return{}},Ho=new Ks;function Sn(o,h,d,m){this.j=o,this.i=h,this.l=d,this.R=m||1,this.U=new et(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Kl}function Kl(){this.i=null,this.g="",this.h=!1}var Ql={},Wo={};function Go(o,h,d){o.L=1,o.v=Ys(on(h)),o.m=d,o.P=!0,Jl(o,null)}function Jl(o,h){o.F=Date.now(),Qs(o),o.A=on(o.v);var d=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),lh(d.i,"t",m),o.C=0,d=o.j.J,o.h=new Kl,o.g=Sh(o.j,d?h:null,!o.m),0<o.O&&(o.M=new At(g(o.Y,o,o.g),o.O)),h=o.U,d=o.g,m=o.ca;var C="readystatechange";Array.isArray(C)||(C&&(Cn[0]=C.toString()),C=Cn);for(var D=0;D<C.length;D++){var W=L(d,C[D],m||h.handleEvent,!1,h.h||h);if(!W)break;h.g[W.key]=W}h=o.H?y(o.H):{},o.m?(o.u||(o.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,h)):(o.u="GET",o.g.ea(o.A,o.u,null,h)),Pi(),d1(o.i,o.u,o.A,o.l,o.R,o.m)}Sn.prototype.ca=function(o){o=o.target;const h=this.M;h&&an(o)==3?h.j():this.Y(o)},Sn.prototype.Y=function(o){try{if(o==this.g)e:{const nt=an(this.g);var h=this.g.Ba();const qr=this.g.Z();if(!(3>nt)&&(nt!=3||this.g&&(this.h.h||this.g.oa()||_h(this.g)))){this.J||nt!=4||h==7||(h==8||0>=qr?Pi(3):Pi(2)),Ko(this);var d=this.g.Z();this.X=d;t:if(Xl(this)){var m=_h(this.g);o="";var C=m.length,D=an(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){gr(this),Vi(this);var W="";break t}this.h.i=new a.TextDecoder}for(h=0;h<C;h++)this.h.h=!0,o+=this.h.i.decode(m[h],{stream:!(D&&h==C-1)});m.length=0,this.h.g+=o,this.C=0,W=this.h.g}else W=this.g.oa();if(this.o=d==200,p1(this.i,this.u,this.A,this.l,this.R,nt,d),this.o){if(this.T&&!this.K){t:{if(this.g){var Te,Ke=this.g;if((Te=Ke.g?Ke.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!V(Te)){var _e=Te;break t}}_e=null}if(d=_e)Lr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Qo(this,d);else{this.o=!1,this.s=3,lt(12),gr(this),Vi(this);break e}}if(this.P){d=!0;let Dt;for(;!this.J&&this.C<W.length;)if(Dt=_1(this,W),Dt==Wo){nt==4&&(this.s=4,lt(14),d=!1),Lr(this.i,this.l,null,"[Incomplete Response]");break}else if(Dt==Ql){this.s=4,lt(15),Lr(this.i,this.l,W,"[Invalid Chunk]"),d=!1;break}else Lr(this.i,this.l,Dt,null),Qo(this,Dt);if(Xl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),nt!=4||W.length!=0||this.h.h||(this.s=1,lt(16),d=!1),this.o=this.o&&d,!d)Lr(this.i,this.l,W,"[Invalid Chunked Response]"),gr(this),Vi(this);else if(0<W.length&&!this.W){this.W=!0;var tt=this.j;tt.g==this&&tt.ba&&!tt.M&&(tt.j.info("Great, no buffering proxy detected. Bytes received: "+W.length),ta(tt),tt.M=!0,lt(11))}}else Lr(this.i,this.l,W,null),Qo(this,W);nt==4&&gr(this),this.o&&!this.J&&(nt==4?wh(this.j,this):(this.o=!1,Qs(this)))}else N1(this.g),d==400&&0<W.indexOf("Unknown SID")?(this.s=3,lt(12)):(this.s=0,lt(13)),gr(this),Vi(this)}}}catch{}finally{}};function Xl(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function _1(o,h){var d=o.C,m=h.indexOf(`
`,d);return m==-1?Wo:(d=Number(h.substring(d,m)),isNaN(d)?Ql:(m+=1,m+d>h.length?Wo:(h=h.slice(m,m+d),o.C=m+d,h)))}Sn.prototype.cancel=function(){this.J=!0,gr(this)};function Qs(o){o.S=Date.now()+o.I,Yl(o,o.I)}function Yl(o,h){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Fi(g(o.ba,o),h)}function Ko(o){o.B&&(a.clearTimeout(o.B),o.B=null)}Sn.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(m1(this.i,this.A),this.L!=2&&(Pi(),lt(17)),gr(this),this.s=2,Vi(this)):Yl(this,this.S-o)};function Vi(o){o.j.G==0||o.J||wh(o.j,o)}function gr(o){Ko(o);var h=o.M;h&&typeof h.ma=="function"&&h.ma(),o.M=null,Ri(o.U),o.g&&(h=o.g,o.g=null,h.abort(),h.ma())}function Qo(o,h){try{var d=o.j;if(d.G!=0&&(d.g==o||Jo(d.h,o))){if(!o.K&&Jo(d.h,o)&&d.G==3){try{var m=d.Da.g.parse(h)}catch{m=null}if(Array.isArray(m)&&m.length==3){var C=m;if(C[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)iu(d),nu(d);else break e;ea(d),lt(18)}}else d.za=C[1],0<d.za-d.T&&37500>C[2]&&d.F&&d.v==0&&!d.C&&(d.C=Fi(g(d.Za,d),6e3));if(1>=th(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else yr(d,11)}else if((o.K||d.g==o)&&iu(d),!V(h))for(C=d.Da.g.parse(h),h=0;h<C.length;h++){let _e=C[h];if(d.T=_e[0],_e=_e[1],d.G==2)if(_e[0]=="c"){d.K=_e[1],d.ia=_e[2];const tt=_e[3];tt!=null&&(d.la=tt,d.j.info("VER="+d.la));const nt=_e[4];nt!=null&&(d.Aa=nt,d.j.info("SVER="+d.Aa));const qr=_e[5];qr!=null&&typeof qr=="number"&&0<qr&&(m=1.5*qr,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const Dt=o.g;if(Dt){const uu=Dt.g?Dt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(uu){var D=m.h;D.g||uu.indexOf("spdy")==-1&&uu.indexOf("quic")==-1&&uu.indexOf("h2")==-1||(D.j=D.l,D.g=new Set,D.h&&(Xo(D,D.h),D.h=null))}if(m.D){const na=Dt.g?Dt.g.getResponseHeader("X-HTTP-Session-Id"):null;na&&(m.ya=na,Ce(m.I,m.D,na))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var W=o;if(m.qa=Ch(m,m.J?m.ia:null,m.W),W.K){nh(m.h,W);var Te=W,Ke=m.L;Ke&&(Te.I=Ke),Te.B&&(Ko(Te),Qs(Te)),m.g=W}else Th(m);0<d.i.length&&ru(d)}else _e[0]!="stop"&&_e[0]!="close"||yr(d,7);else d.G==3&&(_e[0]=="stop"||_e[0]=="close"?_e[0]=="stop"?yr(d,7):Zo(d):_e[0]!="noop"&&d.l&&d.l.ta(_e),d.v=0)}}Pi(4)}catch{}}var y1=class{constructor(o,h){this.g=o,this.map=h}};function Zl(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function eh(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function th(o){return o.h?1:o.g?o.g.size:0}function Jo(o,h){return o.h?o.h==h:o.g?o.g.has(h):!1}function Xo(o,h){o.g?o.g.add(h):o.h=h}function nh(o,h){o.h&&o.h==h?o.h=null:o.g&&o.g.has(h)&&o.g.delete(h)}Zl.prototype.cancel=function(){if(this.i=rh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function rh(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let h=o.i;for(const d of o.g.values())h=h.concat(d.D);return h}return R(o.i)}function b1(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(c(o)){for(var h=[],d=o.length,m=0;m<d;m++)h.push(o[m]);return h}h=[],d=0;for(m in o)h[d++]=o[m];return h}function E1(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(c(o)||typeof o=="string"){var h=[];o=o.length;for(var d=0;d<o;d++)h.push(d);return h}h=[],d=0;for(const m in o)h[d++]=m;return h}}}function ih(o,h){if(o.forEach&&typeof o.forEach=="function")o.forEach(h,void 0);else if(c(o)||typeof o=="string")Array.prototype.forEach.call(o,h,void 0);else for(var d=E1(o),m=b1(o),C=m.length,D=0;D<C;D++)h.call(void 0,m[D],d&&d[D],o)}var sh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function v1(o,h){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var m=o[d].indexOf("="),C=null;if(0<=m){var D=o[d].substring(0,m);C=o[d].substring(m+1)}else D=o[d];h(D,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function _r(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof _r){this.h=o.h,Js(this,o.j),this.o=o.o,this.g=o.g,Xs(this,o.s),this.l=o.l;var h=o.i,d=new Li;d.i=h.i,h.g&&(d.g=new Map(h.g),d.h=h.h),uh(this,d),this.m=o.m}else o&&(h=String(o).match(sh))?(this.h=!1,Js(this,h[1]||"",!0),this.o=Oi(h[2]||""),this.g=Oi(h[3]||"",!0),Xs(this,h[4]),this.l=Oi(h[5]||"",!0),uh(this,h[6]||"",!0),this.m=Oi(h[7]||"")):(this.h=!1,this.i=new Li(null,this.h))}_r.prototype.toString=function(){var o=[],h=this.j;h&&o.push(Mi(h,oh,!0),":");var d=this.g;return(d||h=="file")&&(o.push("//"),(h=this.o)&&o.push(Mi(h,oh,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Mi(d,d.charAt(0)=="/"?w1:A1,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Mi(d,x1)),o.join("")};function on(o){return new _r(o)}function Js(o,h,d){o.j=d?Oi(h,!0):h,o.j&&(o.j=o.j.replace(/:$/,""))}function Xs(o,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);o.s=h}else o.s=null}function uh(o,h,d){h instanceof Li?(o.i=h,C1(o.i,o.h)):(d||(h=Mi(h,I1)),o.i=new Li(h,o.h))}function Ce(o,h,d){o.i.set(h,d)}function Ys(o){return Ce(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Oi(o,h){return o?h?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Mi(o,h,d){return typeof o=="string"?(o=encodeURI(o).replace(h,T1),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function T1(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var oh=/[#\/\?@]/g,A1=/[#\?:]/g,w1=/[#\?]/g,I1=/[#\?@]/g,x1=/#/g;function Li(o,h){this.h=this.g=null,this.i=o||null,this.j=!!h}function kn(o){o.g||(o.g=new Map,o.h=0,o.i&&v1(o.i,function(h,d){o.add(decodeURIComponent(h.replace(/\+/g," ")),d)}))}t=Li.prototype,t.add=function(o,h){kn(this),this.i=null,o=Ur(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(h),this.h+=1,this};function ah(o,h){kn(o),h=Ur(o,h),o.g.has(h)&&(o.i=null,o.h-=o.g.get(h).length,o.g.delete(h))}function ch(o,h){return kn(o),h=Ur(o,h),o.g.has(h)}t.forEach=function(o,h){kn(this),this.g.forEach(function(d,m){d.forEach(function(C){o.call(h,C,m,this)},this)},this)},t.na=function(){kn(this);const o=Array.from(this.g.values()),h=Array.from(this.g.keys()),d=[];for(let m=0;m<h.length;m++){const C=o[m];for(let D=0;D<C.length;D++)d.push(h[m])}return d},t.V=function(o){kn(this);let h=[];if(typeof o=="string")ch(this,o)&&(h=h.concat(this.g.get(Ur(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)h=h.concat(o[d])}return h},t.set=function(o,h){return kn(this),this.i=null,o=Ur(this,o),ch(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[h]),this.h+=1,this},t.get=function(o,h){return o?(o=this.V(o),0<o.length?String(o[0]):h):h};function lh(o,h,d){ah(o,h),0<d.length&&(o.i=null,o.g.set(Ur(o,h),R(d)),o.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],h=Array.from(this.g.keys());for(var d=0;d<h.length;d++){var m=h[d];const D=encodeURIComponent(String(m)),W=this.V(m);for(m=0;m<W.length;m++){var C=D;W[m]!==""&&(C+="="+encodeURIComponent(String(W[m]))),o.push(C)}}return this.i=o.join("&")};function Ur(o,h){return h=String(h),o.j&&(h=h.toLowerCase()),h}function C1(o,h){h&&!o.j&&(kn(o),o.i=null,o.g.forEach(function(d,m){var C=m.toLowerCase();m!=C&&(ah(this,m),lh(this,C,d))},o)),o.j=h}function S1(o,h){const d=new Ni;if(a.Image){const m=new Image;m.onload=_(Rn,d,"TestLoadImage: loaded",!0,h,m),m.onerror=_(Rn,d,"TestLoadImage: error",!1,h,m),m.onabort=_(Rn,d,"TestLoadImage: abort",!1,h,m),m.ontimeout=_(Rn,d,"TestLoadImage: timeout",!1,h,m),a.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else h(!1)}function k1(o,h){const d=new Ni,m=new AbortController,C=setTimeout(()=>{m.abort(),Rn(d,"TestPingServer: timeout",!1,h)},1e4);fetch(o,{signal:m.signal}).then(D=>{clearTimeout(C),D.ok?Rn(d,"TestPingServer: ok",!0,h):Rn(d,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(C),Rn(d,"TestPingServer: error",!1,h)})}function Rn(o,h,d,m,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),m(d)}catch{}}function R1(){this.g=new Hs}function D1(o,h,d){const m=d||"";try{ih(o,function(C,D){let W=C;l(C)&&(W=Ge(C)),h.push(m+D+"="+encodeURIComponent(W))})}catch(C){throw h.push(m+"type="+encodeURIComponent("_badmap")),C}}function Zs(o){this.l=o.Ub||null,this.j=o.eb||!1}b(Zs,Mr),Zs.prototype.g=function(){return new eu(this.l,this.j)},Zs.prototype.i=(function(o){return function(){return o}})({});function eu(o,h){te.call(this),this.D=o,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}b(eu,te),t=eu.prototype,t.open=function(o,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=h,this.readyState=1,Bi(this)},t.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(h.body=o),(this.D||a).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ui(this)),this.readyState=0},t.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Bi(this)),this.g&&(this.readyState=3,Bi(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;hh(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function hh(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}t.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var h=o.value?o.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!o.done}))&&(this.response=this.responseText+=h)}o.done?Ui(this):Bi(this),this.readyState==3&&hh(this)}},t.Ra=function(o){this.g&&(this.response=this.responseText=o,Ui(this))},t.Qa=function(o){this.g&&(this.response=o,Ui(this))},t.ga=function(){this.g&&Ui(this)};function Ui(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Bi(o)}t.setRequestHeader=function(o,h){this.u.append(o,h)},t.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],h=this.h.entries();for(var d=h.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=h.next();return o.join(`\r
`)};function Bi(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(eu.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function fh(o){let h="";return Q(o,function(d,m){h+=m,h+=":",h+=d,h+=`\r
`}),h}function Yo(o,h,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=fh(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):Ce(o,h,d))}function De(o){te.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}b(De,te);var P1=/^https?$/i,F1=["POST","PUT"];t=De.prototype,t.Ha=function(o){this.J=o},t.ea=function(o,h,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);h=h?h.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ho.g(),this.v=this.o?ql(this.o):ql(Ho),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(h,String(o),!0),this.B=!1}catch(D){dh(this,D);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var C in m)d.set(C,m[C]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const D of m.keys())d.set(D,m.get(D));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(D=>D.toLowerCase()=="content-type"),C=a.FormData&&o instanceof a.FormData,!(0<=Array.prototype.indexOf.call(F1,h,void 0))||m||C||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[D,W]of d)this.g.setRequestHeader(D,W);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{gh(this),this.u=!0,this.g.send(o),this.u=!1}catch(D){dh(this,D)}};function dh(o,h){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=h,o.m=5,ph(o),tu(o)}function ph(o){o.A||(o.A=!0,ae(o,"complete"),ae(o,"error"))}t.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,ae(this,"complete"),ae(this,"abort"),tu(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),tu(this,!0)),De.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?mh(this):this.bb())},t.bb=function(){mh(this)};function mh(o){if(o.h&&typeof u<"u"&&(!o.v[1]||an(o)!=4||o.Z()!=2)){if(o.u&&an(o)==4)He(o.Ea,0,o);else if(ae(o,"readystatechange"),an(o)==4){o.h=!1;try{const W=o.Z();e:switch(W){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var d;if(!(d=h)){var m;if(m=W===0){var C=String(o.D).match(sh)[1]||null;!C&&a.self&&a.self.location&&(C=a.self.location.protocol.slice(0,-1)),m=!P1.test(C?C.toLowerCase():"")}d=m}if(d)ae(o,"complete"),ae(o,"success");else{o.m=6;try{var D=2<an(o)?o.g.statusText:""}catch{D=""}o.l=D+" ["+o.Z()+"]",ph(o)}}finally{tu(o)}}}}function tu(o,h){if(o.g){gh(o);const d=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,h||ae(o,"ready");try{d.onreadystatechange=m}catch{}}}function gh(o){o.I&&(a.clearTimeout(o.I),o.I=null)}t.isActive=function(){return!!this.g};function an(o){return o.g?o.g.readyState:0}t.Z=function(){try{return 2<an(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(o){if(this.g){var h=this.g.responseText;return o&&h.indexOf(o)==0&&(h=h.substring(o.length)),wt(h)}};function _h(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function N1(o){const h={};o=(o.g&&2<=an(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(V(o[m]))continue;var d=x(o[m]);const C=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const D=h[C]||[];h[C]=D,D.push(d)}A(h,function(m){return m.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function qi(o,h,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||h}function yh(o){this.Aa=0,this.i=[],this.j=new Ni,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=qi("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=qi("baseRetryDelayMs",5e3,o),this.cb=qi("retryDelaySeedMs",1e4,o),this.Wa=qi("forwardChannelMaxRetries",2,o),this.wa=qi("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Zl(o&&o.concurrentRequestLimit),this.Da=new R1,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=yh.prototype,t.la=8,t.G=1,t.connect=function(o,h,d,m){lt(0),this.W=o,this.H=h||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=Ch(this,null,this.W),ru(this)};function Zo(o){if(bh(o),o.G==3){var h=o.U++,d=on(o.I);if(Ce(d,"SID",o.K),Ce(d,"RID",h),Ce(d,"TYPE","terminate"),ji(o,d),h=new Sn(o,o.j,h),h.L=2,h.v=Ys(on(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(h.v.toString(),"")}catch{}!d&&a.Image&&(new Image().src=h.v,d=!0),d||(h.g=Sh(h.j,null),h.g.ea(h.v)),h.F=Date.now(),Qs(h)}xh(o)}function nu(o){o.g&&(ta(o),o.g.cancel(),o.g=null)}function bh(o){nu(o),o.u&&(a.clearTimeout(o.u),o.u=null),iu(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&a.clearTimeout(o.s),o.s=null)}function ru(o){if(!eh(o.h)&&!o.s){o.s=!0;var h=o.Ga;ve||fr(),ge||(ve(),ge=!0),Rt.add(h,o),o.B=0}}function V1(o,h){return th(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=h.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Fi(g(o.Ga,o,h),Ih(o,o.B)),o.B++,!0)}t.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const C=new Sn(this,this.j,o);let D=this.o;if(this.S&&(D?(D=y(D),w(D,this.S)):D=this.S),this.m!==null||this.O||(C.H=D,D=null),this.P)e:{for(var h=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(h+=m,4096<h){h=d;break e}if(h===4096||d===this.i.length-1){h=d+1;break e}}h=1e3}else h=1e3;h=vh(this,C,h),d=on(this.I),Ce(d,"RID",o),Ce(d,"CVER",22),this.D&&Ce(d,"X-HTTP-Session-Id",this.D),ji(this,d),D&&(this.O?h="headers="+encodeURIComponent(String(fh(D)))+"&"+h:this.m&&Yo(d,this.m,D)),Xo(this.h,C),this.Ua&&Ce(d,"TYPE","init"),this.P?(Ce(d,"$req",h),Ce(d,"SID","null"),C.T=!0,Go(C,d,null)):Go(C,d,h),this.G=2}}else this.G==3&&(o?Eh(this,o):this.i.length==0||eh(this.h)||Eh(this))};function Eh(o,h){var d;h?d=h.l:d=o.U++;const m=on(o.I);Ce(m,"SID",o.K),Ce(m,"RID",d),Ce(m,"AID",o.T),ji(o,m),o.m&&o.o&&Yo(m,o.m,o.o),d=new Sn(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),h&&(o.i=h.D.concat(o.i)),h=vh(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Xo(o.h,d),Go(d,m,h)}function ji(o,h){o.H&&Q(o.H,function(d,m){Ce(h,m,d)}),o.l&&ih({},function(d,m){Ce(h,m,d)})}function vh(o,h,d){d=Math.min(o.i.length,d);var m=o.l?g(o.l.Na,o.l,o):null;e:{var C=o.i;let D=-1;for(;;){const W=["count="+d];D==-1?0<d?(D=C[0].g,W.push("ofs="+D)):D=0:W.push("ofs="+D);let Te=!0;for(let Ke=0;Ke<d;Ke++){let _e=C[Ke].g;const tt=C[Ke].map;if(_e-=D,0>_e)D=Math.max(0,C[Ke].g-100),Te=!1;else try{D1(tt,W,"req"+_e+"_")}catch{m&&m(tt)}}if(Te){m=W.join("&");break e}}}return o=o.i.splice(0,d),h.D=o,m}function Th(o){if(!o.g&&!o.u){o.Y=1;var h=o.Fa;ve||fr(),ge||(ve(),ge=!0),Rt.add(h,o),o.v=0}}function ea(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Fi(g(o.Fa,o),Ih(o,o.v)),o.v++,!0)}t.Fa=function(){if(this.u=null,Ah(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Fi(g(this.ab,this),o)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,lt(10),nu(this),Ah(this))};function ta(o){o.A!=null&&(a.clearTimeout(o.A),o.A=null)}function Ah(o){o.g=new Sn(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var h=on(o.qa);Ce(h,"RID","rpc"),Ce(h,"SID",o.K),Ce(h,"AID",o.T),Ce(h,"CI",o.F?"0":"1"),!o.F&&o.ja&&Ce(h,"TO",o.ja),Ce(h,"TYPE","xmlhttp"),ji(o,h),o.m&&o.o&&Yo(h,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Ys(on(h)),d.m=null,d.P=!0,Jl(d,o)}t.Za=function(){this.C!=null&&(this.C=null,nu(this),ea(this),lt(19))};function iu(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function wh(o,h){var d=null;if(o.g==h){iu(o),ta(o),o.g=null;var m=2}else if(Jo(o.h,h))d=h.D,nh(o.h,h),m=1;else return;if(o.G!=0){if(h.o)if(m==1){d=h.m?h.m.length:0,h=Date.now()-h.F;var C=o.B;m=Ws(),ae(m,new Wl(m,d)),ru(o)}else Th(o);else if(C=h.s,C==3||C==0&&0<h.X||!(m==1&&V1(o,h)||m==2&&ea(o)))switch(d&&0<d.length&&(h=o.h,h.i=h.i.concat(d)),C){case 1:yr(o,5);break;case 4:yr(o,10);break;case 3:yr(o,6);break;default:yr(o,2)}}}function Ih(o,h){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*h}function yr(o,h){if(o.j.info("Error code "+h),h==2){var d=g(o.fb,o),m=o.Xa;const C=!m;m=new _r(m||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Js(m,"https"),Ys(m),C?S1(m.toString(),d):k1(m.toString(),d)}else lt(2);o.G=0,o.l&&o.l.sa(h),xh(o),bh(o)}t.fb=function(o){o?(this.j.info("Successfully pinged google.com"),lt(2)):(this.j.info("Failed to ping google.com"),lt(1))};function xh(o){if(o.G=0,o.ka=[],o.l){const h=rh(o.h);(h.length!=0||o.i.length!=0)&&(N(o.ka,h),N(o.ka,o.i),o.h.i.length=0,R(o.i),o.i.length=0),o.l.ra()}}function Ch(o,h,d){var m=d instanceof _r?on(d):new _r(d);if(m.g!="")h&&(m.g=h+"."+m.g),Xs(m,m.s);else{var C=a.location;m=C.protocol,h=h?h+"."+C.hostname:C.hostname,C=+C.port;var D=new _r(null);m&&Js(D,m),h&&(D.g=h),C&&Xs(D,C),d&&(D.l=d),m=D}return d=o.D,h=o.ya,d&&h&&Ce(m,d,h),Ce(m,"VER",o.la),ji(o,m),m}function Sh(o,h,d){if(h&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=o.Ca&&!o.pa?new De(new Zs({eb:d})):new De(o.pa),h.Ha(o.J),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function kh(){}t=kh.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function su(){}su.prototype.g=function(o,h){return new bt(o,h)};function bt(o,h){te.call(this),this.g=new yh(h),this.l=o,this.h=h&&h.messageUrlParams||null,o=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(o?o["X-WebChannel-Content-Type"]=h.messageContentType:o={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(o?o["X-WebChannel-Client-Profile"]=h.va:o={"X-WebChannel-Client-Profile":h.va}),this.g.S=o,(o=h&&h.Sb)&&!V(o)&&(this.g.m=o),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!V(h)&&(this.g.D=h,o=this.h,o!==null&&h in o&&(o=this.h,h in o&&delete o[h])),this.j=new Br(this)}b(bt,te),bt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},bt.prototype.close=function(){Zo(this.g)},bt.prototype.o=function(o){var h=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=Ge(o),o=d);h.i.push(new y1(h.Ya++,o)),h.G==3&&ru(h)},bt.prototype.N=function(){this.g.l=null,delete this.j,Zo(this.g),delete this.g,bt.aa.N.call(this)};function Rh(o){zo.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var h=o.__sm__;if(h){e:{for(const d in h){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,h=h!==null&&o in h?h[o]:void 0),this.data=h}else this.data=o}b(Rh,zo);function Dh(){$o.call(this),this.status=1}b(Dh,$o);function Br(o){this.g=o}b(Br,kh),Br.prototype.ua=function(){ae(this.g,"a")},Br.prototype.ta=function(o){ae(this.g,new Rh(o))},Br.prototype.sa=function(o){ae(this.g,new Dh)},Br.prototype.ra=function(){ae(this.g,"b")},su.prototype.createWebChannel=su.prototype.g,bt.prototype.send=bt.prototype.o,bt.prototype.open=bt.prototype.m,bt.prototype.close=bt.prototype.close,sm=function(){return new su},im=function(){return Ws()},rm=mr,ec={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Gs.NO_ERROR=0,Gs.TIMEOUT=8,Gs.HTTP_ERROR=6,Iu=Gs,Gl.COMPLETE="complete",nm=Gl,jl.EventType=Di,Di.OPEN="a",Di.CLOSE="b",Di.ERROR="c",Di.MESSAGE="d",te.prototype.listen=te.prototype.K,Gi=jl,De.prototype.listenOnce=De.prototype.L,De.prototype.getLastError=De.prototype.Ka,De.prototype.getLastErrorCode=De.prototype.Ba,De.prototype.getStatus=De.prototype.Z,De.prototype.getResponseJson=De.prototype.Oa,De.prototype.getResponseText=De.prototype.oa,De.prototype.send=De.prototype.ea,De.prototype.setWithCredentials=De.prototype.Ha,tm=De}).apply(typeof du<"u"?du:typeof self<"u"?self:typeof window<"u"?window:{});const $f="@firebase/firestore",Hf="4.9.1";/**
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
 */class it{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}it.UNAUTHENTICATED=new it(null),it.GOOGLE_CREDENTIALS=new it("google-credentials-uid"),it.FIRST_PARTY=new it("first-party-uid"),it.MOCK_USER=new it("mock-user");/**
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
 */let Ti="12.2.0";/**
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
 */const kr=new Gc("@firebase/firestore");function Wr(){return kr.logLevel}function X(t,...e){if(kr.logLevel<=he.DEBUG){const n=e.map(Jc);kr.debug(`Firestore (${Ti}): ${t}`,...n)}}function vn(t,...e){if(kr.logLevel<=he.ERROR){const n=e.map(Jc);kr.error(`Firestore (${Ti}): ${t}`,...n)}}function fi(t,...e){if(kr.logLevel<=he.WARN){const n=e.map(Jc);kr.warn(`Firestore (${Ti}): ${t}`,...n)}}function Jc(t){if(typeof t=="string")return t;try{/**
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
 */function ne(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,um(t,r,n)}function um(t,e,n){let r=`FIRESTORE (${Ti}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw vn(r),new Error(r)}function Ee(t,e,n,r){let i="Unexpected state";typeof n=="string"?i=n:r=n,t||um(e,i,r)}function oe(t,e){return t}/**
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
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class J extends xn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Qn{constructor(){this.promise=new Promise(((e,n)=>{this.resolve=e,this.reject=n}))}}/**
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
 */class om{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class F6{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable((()=>n(it.UNAUTHENTICATED)))}shutdown(){}}class N6{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable((()=>n(this.token.user)))}shutdown(){this.changeListener=null}}class V6{constructor(e){this.t=e,this.currentUser=it.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Ee(this.o===void 0,42304);let r=this.i;const i=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let s=new Qn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Qn,e.enqueueRetryable((()=>i(this.currentUser)))};const u=()=>{const c=s;e.enqueueRetryable((async()=>{await c.promise,await i(this.currentUser)}))},a=c=>{X("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),u())};this.t.onInit((c=>a(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(X("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Qn)}}),0),u()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then((r=>this.i!==e?(X("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ee(typeof r.accessToken=="string",31837,{l:r}),new om(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ee(e===null||typeof e=="string",2055,{h:e}),new it(e)}}class O6{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=it.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class M6{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new O6(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable((()=>n(it.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Wf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class L6{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ft(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){Ee(this.o===void 0,3512);const r=s=>{s.error!=null&&X("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const u=s.token!==this.m;return this.m=s.token,X("FirebaseAppCheckTokenProvider",`Received ${u?"new":"existing"} token.`),u?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable((()=>r(s)))};const i=s=>{X("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((s=>i(s))),setTimeout((()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):X("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Wf(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((n=>n?(Ee(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new Wf(n.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function U6(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
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
 */class Xc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=U6(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%62))}return r}}function fe(t,e){return t<e?-1:t>e?1:0}function tc(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const i=t.charAt(r),s=e.charAt(r);if(i!==s)return xa(i)===xa(s)?fe(i,s):xa(i)?1:-1}return fe(t.length,e.length)}const B6=55296,q6=57343;function xa(t){const e=t.charCodeAt(0);return e>=B6&&e<=q6}function di(t,e,n){return t.length===e.length&&t.every(((r,i)=>n(r,e[i])))}/**
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
 */const Gf="__name__";class jt{constructor(e,n,r){n===void 0?n=0:n>e.length&&ne(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&ne(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return jt.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof jt?e.forEach((r=>{n.push(r)})):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=jt.compareSegments(e.get(i),n.get(i));if(s!==0)return s}return fe(e.length,n.length)}static compareSegments(e,n){const r=jt.isNumericId(e),i=jt.isNumericId(n);return r&&!i?-1:!r&&i?1:r&&i?jt.extractNumericId(e).compare(jt.extractNumericId(n)):tc(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Kn.fromString(e.substring(4,e.length-2))}}class Ie extends jt{construct(e,n,r){return new Ie(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new J(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter((i=>i.length>0)))}return new Ie(n)}static emptyPath(){return new Ie([])}}const j6=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Xe extends jt{construct(e,n,r){return new Xe(e,n,r)}static isValidIdentifier(e){return j6.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Xe.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Gf}static keyField(){return new Xe([Gf])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new J(O.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let u=!1;for(;i<e.length;){const a=e[i];if(a==="\\"){if(i+1===e.length)throw new J(O.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new J(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,i+=2}else a==="`"?(u=!u,i++):a!=="."||u?(r+=a,i++):(s(),i++)}if(s(),u)throw new J(O.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Xe(n)}static emptyPath(){return new Xe([])}}/**
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
 */class Z{constructor(e){this.path=e}static fromPath(e){return new Z(Ie.fromString(e))}static fromName(e){return new Z(Ie.fromString(e).popFirst(5))}static empty(){return new Z(Ie.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ie.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Ie.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Z(new Ie(e.slice()))}}/**
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
 */function am(t,e,n){if(!n)throw new J(O.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function z6(t,e,n,r){if(e===!0&&r===!0)throw new J(O.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Kf(t){if(!Z.isDocumentKey(t))throw new J(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Qf(t){if(Z.isDocumentKey(t))throw new J(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function cm(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function Io(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ne(12329,{type:typeof t})}function Jn(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new J(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Io(t);throw new J(O.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */function Ve(t,e){const n={typeString:t};return e&&(n.value=e),n}function Os(t,e){if(!cm(t))throw new J(O.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const u=t[r];if(i&&typeof u!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&u!==s.value){n=`Expected '${r}' field to equal '${s.value}'`;break}}if(n)throw new J(O.INVALID_ARGUMENT,n);return!0}/**
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
 */const Jf=-62135596800,Xf=1e6;class Se{static now(){return Se.fromMillis(Date.now())}static fromDate(e){return Se.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*Xf);return new Se(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new J(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new J(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<Jf)throw new J(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new J(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Xf}_compareTo(e){return this.seconds===e.seconds?fe(this.nanoseconds,e.nanoseconds):fe(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Se._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Os(e,Se._jsonSchema))return new Se(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Jf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Se._jsonSchemaVersion="firestore/timestamp/1.0",Se._jsonSchema={type:Ve("string",Se._jsonSchemaVersion),seconds:Ve("number"),nanoseconds:Ve("number")};/**
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
 */class se{static fromTimestamp(e){return new se(e)}static min(){return new se(new Se(0,0))}static max(){return new se(new Se(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Es=-1;function $6(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=se.fromTimestamp(r===1e9?new Se(n+1,0):new Se(n,r));return new rr(i,Z.empty(),e)}function H6(t){return new rr(t.readTime,t.key,Es)}class rr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new rr(se.min(),Z.empty(),Es)}static max(){return new rr(se.max(),Z.empty(),Es)}}function W6(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=Z.comparator(t.documentKey,e.documentKey),n!==0?n:fe(t.largestBatchId,e.largestBatchId))}/**
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
 */const G6="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class K6{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
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
 */async function Ai(t){if(t.code!==O.FAILED_PRECONDITION||t.message!==G6)throw t;X("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class M{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)}),(n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)}))}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&ne(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new M(((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}}))}toPromise(){return new Promise(((e,n)=>{this.next(e,n)}))}wrapUserFunction(e){try{const n=e();return n instanceof M?n:M.resolve(n)}catch(n){return M.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction((()=>e(n))):M.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction((()=>e(n))):M.reject(n)}static resolve(e){return new M(((n,r)=>{n(e)}))}static reject(e){return new M(((n,r)=>{r(e)}))}static waitFor(e){return new M(((n,r)=>{let i=0,s=0,u=!1;e.forEach((a=>{++i,a.next((()=>{++s,u&&s===i&&n()}),(c=>r(c)))})),u=!0,s===i&&n()}))}static or(e){let n=M.resolve(!1);for(const r of e)n=n.next((i=>i?M.resolve(i):r()));return n}static forEach(e,n){const r=[];return e.forEach(((i,s)=>{r.push(n.call(this,i,s))})),this.waitFor(r)}static mapArray(e,n){return new M(((r,i)=>{const s=e.length,u=new Array(s);let a=0;for(let c=0;c<s;c++){const l=c;n(e[l]).next((f=>{u[l]=f,++a,a===s&&r(u)}),(f=>i(f)))}}))}static doWhile(e,n){return new M(((r,i)=>{const s=()=>{e()===!0?n().next((()=>{s()}),i):r()};s()}))}}function Q6(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function wi(t){return t.name==="IndexedDbTransactionError"}/**
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
 */class xo{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>n.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}xo.ce=-1;/**
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
 */const Yc=-1;function Co(t){return t==null}function Gu(t){return t===0&&1/t==-1/0}function J6(t){return typeof t=="number"&&Number.isInteger(t)&&!Gu(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */const lm="";function X6(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Yf(e)),e=Y6(t.get(n),e);return Yf(e)}function Y6(t,e){let n=e;const r=t.length;for(let i=0;i<r;i++){const s=t.charAt(i);switch(s){case"\0":n+="";break;case lm:n+="";break;default:n+=s}}return n}function Yf(t){return t+lm+""}/**
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
 */function Zf(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Fr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function hm(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class Re{constructor(e,n){this.comparator=e,this.root=n||Qe.EMPTY}insert(e,n){return new Re(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Qe.BLACK,null,null))}remove(e){return new Re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Qe.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((n,r)=>(e(n,r),!1)))}toString(){const e=[];return this.inorderTraversal(((n,r)=>(e.push(`${n}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new pu(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new pu(this.root,e,this.comparator,!1)}getReverseIterator(){return new pu(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new pu(this.root,e,this.comparator,!0)}}class pu{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Qe{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??Qe.RED,this.left=i??Qe.EMPTY,this.right=s??Qe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new Qe(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Qe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return Qe.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Qe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Qe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ne(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ne(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw ne(27949);return e+(this.isRed()?0:1)}}Qe.EMPTY=null,Qe.RED=!0,Qe.BLACK=!1;Qe.EMPTY=new class{constructor(){this.size=0}get key(){throw ne(57766)}get value(){throw ne(16141)}get color(){throw ne(16727)}get left(){throw ne(29726)}get right(){throw ne(36894)}copy(e,n,r,i,s){return this}insert(e,n,r){return new Qe(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class qe{constructor(e){this.comparator=e,this.data=new Re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((n,r)=>(e(n),!1)))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new ed(this.data.getIterator())}getIteratorFrom(e){return new ed(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach((r=>{n=n.add(r)})),n}isEqual(e){if(!(e instanceof qe)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((n=>{e.push(n)})),e}toString(){const e=[];return this.forEach((n=>e.push(n))),"SortedSet("+e.toString()+")"}copy(e){const n=new qe(this.comparator);return n.data=e,n}}class ed{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Nt{constructor(e){this.fields=e,e.sort(Xe.comparator)}static empty(){return new Nt([])}unionWith(e){let n=new qe(Xe.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Nt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return di(this.fields,e.fields,((n,r)=>n.isEqual(r)))}}/**
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
 */class fm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Ye{constructor(e){this.binaryString=e}static fromBase64String(e){const n=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new fm("Invalid base64 string: "+s):s}})(e);return new Ye(n)}static fromUint8Array(e){const n=(function(i){let s="";for(let u=0;u<i.length;++u)s+=String.fromCharCode(i[u]);return s})(e);return new Ye(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(n){return btoa(n)})(this.binaryString)}toUint8Array(){return(function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return fe(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ye.EMPTY_BYTE_STRING=new Ye("");const Z6=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ir(t){if(Ee(!!t,39018),typeof t=="string"){let e=0;const n=Z6.exec(t);if(Ee(!!n,46558,{timestamp:t}),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Pe(t.seconds),nanos:Pe(t.nanos)}}function Pe(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function sr(t){return typeof t=="string"?Ye.fromBase64String(t):Ye.fromUint8Array(t)}/**
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
 */const dm="server_timestamp",pm="__type__",mm="__previous_value__",gm="__local_write_time__";function Zc(t){return(t?.mapValue?.fields||{})[pm]?.stringValue===dm}function So(t){const e=t.mapValue.fields[mm];return Zc(e)?So(e):e}function vs(t){const e=ir(t.mapValue.fields[gm].timestampValue);return new Se(e.seconds,e.nanos)}/**
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
 */class ev{constructor(e,n,r,i,s,u,a,c,l,f){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=u,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=l,this.isUsingEmulator=f}}const Ku="(default)";class Ts{constructor(e,n){this.projectId=e,this.database=n||Ku}static empty(){return new Ts("","")}get isDefaultDatabase(){return this.database===Ku}isEqual(e){return e instanceof Ts&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const _m="__type__",tv="__max__",mu={mapValue:{}},ym="__vector__",Qu="value";function ur(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Zc(t)?4:rv(t)?9007199254740991:nv(t)?10:11:ne(28295,{value:t})}function tn(t,e){if(t===e)return!0;const n=ur(t);if(n!==ur(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return vs(t).isEqual(vs(e));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const u=ir(i.timestampValue),a=ir(s.timestampValue);return u.seconds===a.seconds&&u.nanos===a.nanos})(t,e);case 5:return t.stringValue===e.stringValue;case 6:return(function(i,s){return sr(i.bytesValue).isEqual(sr(s.bytesValue))})(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return(function(i,s){return Pe(i.geoPointValue.latitude)===Pe(s.geoPointValue.latitude)&&Pe(i.geoPointValue.longitude)===Pe(s.geoPointValue.longitude)})(t,e);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return Pe(i.integerValue)===Pe(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const u=Pe(i.doubleValue),a=Pe(s.doubleValue);return u===a?Gu(u)===Gu(a):isNaN(u)&&isNaN(a)}return!1})(t,e);case 9:return di(t.arrayValue.values||[],e.arrayValue.values||[],tn);case 10:case 11:return(function(i,s){const u=i.mapValue.fields||{},a=s.mapValue.fields||{};if(Zf(u)!==Zf(a))return!1;for(const c in u)if(u.hasOwnProperty(c)&&(a[c]===void 0||!tn(u[c],a[c])))return!1;return!0})(t,e);default:return ne(52216,{left:t})}}function As(t,e){return(t.values||[]).find((n=>tn(n,e)))!==void 0}function pi(t,e){if(t===e)return 0;const n=ur(t),r=ur(e);if(n!==r)return fe(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return fe(t.booleanValue,e.booleanValue);case 2:return(function(s,u){const a=Pe(s.integerValue||s.doubleValue),c=Pe(u.integerValue||u.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1})(t,e);case 3:return td(t.timestampValue,e.timestampValue);case 4:return td(vs(t),vs(e));case 5:return tc(t.stringValue,e.stringValue);case 6:return(function(s,u){const a=sr(s),c=sr(u);return a.compareTo(c)})(t.bytesValue,e.bytesValue);case 7:return(function(s,u){const a=s.split("/"),c=u.split("/");for(let l=0;l<a.length&&l<c.length;l++){const f=fe(a[l],c[l]);if(f!==0)return f}return fe(a.length,c.length)})(t.referenceValue,e.referenceValue);case 8:return(function(s,u){const a=fe(Pe(s.latitude),Pe(u.latitude));return a!==0?a:fe(Pe(s.longitude),Pe(u.longitude))})(t.geoPointValue,e.geoPointValue);case 9:return nd(t.arrayValue,e.arrayValue);case 10:return(function(s,u){const a=s.fields||{},c=u.fields||{},l=a[Qu]?.arrayValue,f=c[Qu]?.arrayValue,p=fe(l?.values?.length||0,f?.values?.length||0);return p!==0?p:nd(l,f)})(t.mapValue,e.mapValue);case 11:return(function(s,u){if(s===mu.mapValue&&u===mu.mapValue)return 0;if(s===mu.mapValue)return 1;if(u===mu.mapValue)return-1;const a=s.fields||{},c=Object.keys(a),l=u.fields||{},f=Object.keys(l);c.sort(),f.sort();for(let p=0;p<c.length&&p<f.length;++p){const g=tc(c[p],f[p]);if(g!==0)return g;const _=pi(a[c[p]],l[f[p]]);if(_!==0)return _}return fe(c.length,f.length)})(t.mapValue,e.mapValue);default:throw ne(23264,{he:n})}}function td(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return fe(t,e);const n=ir(t),r=ir(e),i=fe(n.seconds,r.seconds);return i!==0?i:fe(n.nanos,r.nanos)}function nd(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=pi(n[i],r[i]);if(s)return s}return fe(n.length,r.length)}function mi(t){return nc(t)}function nc(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?(function(n){const r=ir(n);return`time(${r.seconds},${r.nanos})`})(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?(function(n){return sr(n).toBase64()})(t.bytesValue):"referenceValue"in t?(function(n){return Z.fromName(n).toString()})(t.referenceValue):"geoPointValue"in t?(function(n){return`geo(${n.latitude},${n.longitude})`})(t.geoPointValue):"arrayValue"in t?(function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=nc(s);return r+"]"})(t.arrayValue):"mapValue"in t?(function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const u of r)s?s=!1:i+=",",i+=`${u}:${nc(n.fields[u])}`;return i+"}"})(t.mapValue):ne(61005,{value:t})}function xu(t){switch(ur(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=So(t);return e?16+xu(e):16;case 5:return 2*t.stringValue.length;case 6:return sr(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((i,s)=>i+xu(s)),0)})(t.arrayValue);case 10:case 11:return(function(r){let i=0;return Fr(r.fields,((s,u)=>{i+=s.length+xu(u)})),i})(t.mapValue);default:throw ne(13486,{value:t})}}function rd(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function rc(t){return!!t&&"integerValue"in t}function el(t){return!!t&&"arrayValue"in t}function id(t){return!!t&&"nullValue"in t}function sd(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Cu(t){return!!t&&"mapValue"in t}function nv(t){return(t?.mapValue?.fields||{})[_m]?.stringValue===ym}function ss(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return Fr(t.mapValue.fields,((n,r)=>e.mapValue.fields[n]=ss(r))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=ss(t.arrayValue.values[n]);return e}return{...t}}function rv(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===tv}/**
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
 */class It{constructor(e){this.value=e}static empty(){return new It({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Cu(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=ss(n)}setAll(e){let n=Xe.emptyPath(),r={},i=[];e.forEach(((u,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,r,i),r={},i=[],n=a.popLast()}u?r[a.lastSegment()]=ss(u):i.push(a.lastSegment())}));const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());Cu(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return tn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];Cu(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){Fr(n,((i,s)=>e[i]=s));for(const i of r)delete e[i]}clone(){return new It(ss(this.value))}}function bm(t){const e=[];return Fr(t.fields,((n,r)=>{const i=new Xe([n]);if(Cu(r)){const s=bm(r.mapValue).fields;if(s.length===0)e.push(i);else for(const u of s)e.push(i.child(u))}else e.push(i)})),new Nt(e)}/**
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
 */class ut{constructor(e,n,r,i,s,u,a){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=u,this.documentState=a}static newInvalidDocument(e){return new ut(e,0,se.min(),se.min(),se.min(),It.empty(),0)}static newFoundDocument(e,n,r,i){return new ut(e,1,n,se.min(),r,i,0)}static newNoDocument(e,n){return new ut(e,2,n,se.min(),se.min(),It.empty(),0)}static newUnknownDocument(e,n){return new ut(e,3,n,se.min(),se.min(),It.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(se.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=It.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=It.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=se.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ut&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ut(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Ju{constructor(e,n){this.position=e,this.inclusive=n}}function ud(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],u=t.position[i];if(s.field.isKeyField()?r=Z.comparator(Z.fromName(u.referenceValue),n.key):r=pi(u,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function od(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!tn(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class ws{constructor(e,n="asc"){this.field=e,this.dir=n}}function iv(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
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
 */class Em{}class Ne extends Em{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new uv(e,n,r):n==="array-contains"?new cv(e,r):n==="in"?new lv(e,r):n==="not-in"?new hv(e,r):n==="array-contains-any"?new fv(e,r):new Ne(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new ov(e,r):new av(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(pi(n,this.value)):n!==null&&ur(this.value)===ur(n)&&this.matchesComparison(pi(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ne(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Mt extends Em{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new Mt(e,n)}matches(e){return vm(this)?this.filters.find((n=>!n.matches(e)))===void 0:this.filters.find((n=>n.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,n)=>e.concat(n.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function vm(t){return t.op==="and"}function Tm(t){return sv(t)&&vm(t)}function sv(t){for(const e of t.filters)if(e instanceof Mt)return!1;return!0}function ic(t){if(t instanceof Ne)return t.field.canonicalString()+t.op.toString()+mi(t.value);if(Tm(t))return t.filters.map((e=>ic(e))).join(",");{const e=t.filters.map((n=>ic(n))).join(",");return`${t.op}(${e})`}}function Am(t,e){return t instanceof Ne?(function(r,i){return i instanceof Ne&&r.op===i.op&&r.field.isEqual(i.field)&&tn(r.value,i.value)})(t,e):t instanceof Mt?(function(r,i){return i instanceof Mt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce(((s,u,a)=>s&&Am(u,i.filters[a])),!0):!1})(t,e):void ne(19439)}function wm(t){return t instanceof Ne?(function(n){return`${n.field.canonicalString()} ${n.op} ${mi(n.value)}`})(t):t instanceof Mt?(function(n){return n.op.toString()+" {"+n.getFilters().map(wm).join(" ,")+"}"})(t):"Filter"}class uv extends Ne{constructor(e,n,r){super(e,n,r),this.key=Z.fromName(r.referenceValue)}matches(e){const n=Z.comparator(e.key,this.key);return this.matchesComparison(n)}}class ov extends Ne{constructor(e,n){super(e,"in",n),this.keys=Im("in",n)}matches(e){return this.keys.some((n=>n.isEqual(e.key)))}}class av extends Ne{constructor(e,n){super(e,"not-in",n),this.keys=Im("not-in",n)}matches(e){return!this.keys.some((n=>n.isEqual(e.key)))}}function Im(t,e){return(e.arrayValue?.values||[]).map((n=>Z.fromName(n.referenceValue)))}class cv extends Ne{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return el(n)&&As(n.arrayValue,this.value)}}class lv extends Ne{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&As(this.value.arrayValue,n)}}class hv extends Ne{constructor(e,n){super(e,"not-in",n)}matches(e){if(As(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!As(this.value.arrayValue,n)}}class fv extends Ne{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!el(n)||!n.arrayValue.values)&&n.arrayValue.values.some((r=>As(this.value.arrayValue,r)))}}/**
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
 */class dv{constructor(e,n=null,r=[],i=[],s=null,u=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=u,this.endAt=a,this.Te=null}}function ad(t,e=null,n=[],r=[],i=null,s=null,u=null){return new dv(t,e,n,r,i,s,u)}function tl(t){const e=oe(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map((r=>ic(r))).join(","),n+="|ob:",n+=e.orderBy.map((r=>(function(s){return s.field.canonicalString()+s.dir})(r))).join(","),Co(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map((r=>mi(r))).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map((r=>mi(r))).join(",")),e.Te=n}return e.Te}function nl(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!iv(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Am(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!od(t.startAt,e.startAt)&&od(t.endAt,e.endAt)}function sc(t){return Z.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
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
 */class Ii{constructor(e,n=null,r=[],i=[],s=null,u="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=u,this.startAt=a,this.endAt=c,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function pv(t,e,n,r,i,s,u,a){return new Ii(t,e,n,r,i,s,u,a)}function rl(t){return new Ii(t)}function cd(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function xm(t){return t.collectionGroup!==null}function us(t){const e=oe(t);if(e.Ie===null){e.Ie=[];const n=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(u){let a=new qe(Xe.comparator);return u.filters.forEach((c=>{c.getFlattenedFilters().forEach((l=>{l.isInequality()&&(a=a.add(l.field))}))})),a})(e).forEach((s=>{n.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new ws(s,r))})),n.has(Xe.keyField().canonicalString())||e.Ie.push(new ws(Xe.keyField(),r))}return e.Ie}function Gt(t){const e=oe(t);return e.Ee||(e.Ee=mv(e,us(t))),e.Ee}function mv(t,e){if(t.limitType==="F")return ad(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new ws(i.field,s)}));const n=t.endAt?new Ju(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Ju(t.startAt.position,t.startAt.inclusive):null;return ad(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function uc(t,e){const n=t.filters.concat([e]);return new Ii(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function oc(t,e,n){return new Ii(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ko(t,e){return nl(Gt(t),Gt(e))&&t.limitType===e.limitType}function Cm(t){return`${tl(Gt(t))}|lt:${t.limitType}`}function Gr(t){return`Query(target=${(function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map((i=>wm(i))).join(", ")}]`),Co(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map((i=>(function(u){return`${u.field.canonicalString()} (${u.dir})`})(i))).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map((i=>mi(i))).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map((i=>mi(i))).join(",")),`Target(${r})`})(Gt(t))}; limitType=${t.limitType})`}function Ro(t,e){return e.isFoundDocument()&&(function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):Z.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)})(t,e)&&(function(r,i){for(const s of us(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0})(t,e)&&(function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0})(t,e)&&(function(r,i){return!(r.startAt&&!(function(u,a,c){const l=ud(u,a,c);return u.inclusive?l<=0:l<0})(r.startAt,us(r),i)||r.endAt&&!(function(u,a,c){const l=ud(u,a,c);return u.inclusive?l>=0:l>0})(r.endAt,us(r),i))})(t,e)}function gv(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function Sm(t){return(e,n)=>{let r=!1;for(const i of us(t)){const s=_v(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function _v(t,e,n){const r=t.field.isKeyField()?Z.comparator(e.key,n.key):(function(s,u,a){const c=u.data.field(s),l=a.data.field(s);return c!==null&&l!==null?pi(c,l):ne(42886)})(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return ne(19790,{direction:t.dir})}}/**
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
 */class Nr{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Fr(this.inner,((n,r)=>{for(const[i,s]of r)e(i,s)}))}isEmpty(){return hm(this.inner)}size(){return this.innerSize}}/**
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
 */const yv=new Re(Z.comparator);function Tn(){return yv}const km=new Re(Z.comparator);function Ki(...t){let e=km;for(const n of t)e=e.insert(n.key,n);return e}function Rm(t){let e=km;return t.forEach(((n,r)=>e=e.insert(n,r.overlayedDocument))),e}function Ar(){return os()}function Dm(){return os()}function os(){return new Nr((t=>t.toString()),((t,e)=>t.isEqual(e)))}const bv=new Re(Z.comparator),Ev=new qe(Z.comparator);function de(...t){let e=Ev;for(const n of t)e=e.add(n);return e}const vv=new qe(fe);function Tv(){return vv}/**
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
 */function il(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Gu(e)?"-0":e}}function Pm(t){return{integerValue:""+t}}function Av(t,e){return J6(e)?Pm(e):il(t,e)}/**
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
 */class Do{constructor(){this._=void 0}}function wv(t,e,n){return t instanceof Is?(function(i,s){const u={fields:{[pm]:{stringValue:dm},[gm]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Zc(s)&&(s=So(s)),s&&(u.fields[mm]=s),{mapValue:u}})(n,e):t instanceof xs?Nm(t,e):t instanceof Cs?Vm(t,e):(function(i,s){const u=Fm(i,s),a=ld(u)+ld(i.Ae);return rc(u)&&rc(i.Ae)?Pm(a):il(i.serializer,a)})(t,e)}function Iv(t,e,n){return t instanceof xs?Nm(t,e):t instanceof Cs?Vm(t,e):n}function Fm(t,e){return t instanceof Xu?(function(r){return rc(r)||(function(s){return!!s&&"doubleValue"in s})(r)})(e)?e:{integerValue:0}:null}class Is extends Do{}class xs extends Do{constructor(e){super(),this.elements=e}}function Nm(t,e){const n=Om(e);for(const r of t.elements)n.some((i=>tn(i,r)))||n.push(r);return{arrayValue:{values:n}}}class Cs extends Do{constructor(e){super(),this.elements=e}}function Vm(t,e){let n=Om(e);for(const r of t.elements)n=n.filter((i=>!tn(i,r)));return{arrayValue:{values:n}}}class Xu extends Do{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function ld(t){return Pe(t.integerValue||t.doubleValue)}function Om(t){return el(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
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
 */class xv{constructor(e,n){this.field=e,this.transform=n}}function Cv(t,e){return t.field.isEqual(e.field)&&(function(r,i){return r instanceof xs&&i instanceof xs||r instanceof Cs&&i instanceof Cs?di(r.elements,i.elements,tn):r instanceof Xu&&i instanceof Xu?tn(r.Ae,i.Ae):r instanceof Is&&i instanceof Is})(t.transform,e.transform)}class Sv{constructor(e,n){this.version=e,this.transformResults=n}}class Kt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Kt}static exists(e){return new Kt(void 0,e)}static updateTime(e){return new Kt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Su(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Po{}function Mm(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new sl(t.key,Kt.none()):new Ms(t.key,t.data,Kt.none());{const n=t.data,r=It.empty();let i=new qe(Xe.comparator);for(let s of e.fields)if(!i.has(s)){let u=n.field(s);u===null&&s.length>1&&(s=s.popLast(),u=n.field(s)),u===null?r.delete(s):r.set(s,u),i=i.add(s)}return new Vr(t.key,r,new Nt(i.toArray()),Kt.none())}}function kv(t,e,n){t instanceof Ms?(function(i,s,u){const a=i.value.clone(),c=fd(i.fieldTransforms,s,u.transformResults);a.setAll(c),s.convertToFoundDocument(u.version,a).setHasCommittedMutations()})(t,e,n):t instanceof Vr?(function(i,s,u){if(!Su(i.precondition,s))return void s.convertToUnknownDocument(u.version);const a=fd(i.fieldTransforms,s,u.transformResults),c=s.data;c.setAll(Lm(i)),c.setAll(a),s.convertToFoundDocument(u.version,c).setHasCommittedMutations()})(t,e,n):(function(i,s,u){s.convertToNoDocument(u.version).setHasCommittedMutations()})(0,e,n)}function as(t,e,n,r){return t instanceof Ms?(function(s,u,a,c){if(!Su(s.precondition,u))return a;const l=s.value.clone(),f=dd(s.fieldTransforms,c,u);return l.setAll(f),u.convertToFoundDocument(u.version,l).setHasLocalMutations(),null})(t,e,n,r):t instanceof Vr?(function(s,u,a,c){if(!Su(s.precondition,u))return a;const l=dd(s.fieldTransforms,c,u),f=u.data;return f.setAll(Lm(s)),f.setAll(l),u.convertToFoundDocument(u.version,f).setHasLocalMutations(),a===null?null:a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((p=>p.field)))})(t,e,n,r):(function(s,u,a){return Su(s.precondition,u)?(u.convertToNoDocument(u.version).setHasLocalMutations(),null):a})(t,e,n)}function Rv(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=Fm(r.transform,i||null);s!=null&&(n===null&&(n=It.empty()),n.set(r.field,s))}return n||null}function hd(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!(function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&di(r,i,((s,u)=>Cv(s,u)))})(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Ms extends Po{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Vr extends Po{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Lm(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}})),e}function fd(t,e,n){const r=new Map;Ee(t.length===n.length,32656,{Re:n.length,Ve:t.length});for(let i=0;i<n.length;i++){const s=t[i],u=s.transform,a=e.data.field(s.field);r.set(s.field,Iv(u,a,n[i]))}return r}function dd(t,e,n){const r=new Map;for(const i of t){const s=i.transform,u=n.data.field(i.field);r.set(i.field,wv(s,u,e))}return r}class sl extends Po{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Dv extends Po{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Pv{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&kv(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=as(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=as(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=Dm();return this.mutations.forEach((i=>{const s=e.get(i.key),u=s.overlayedDocument;let a=this.applyToLocalView(u,s.mutatedFields);a=n.has(i.key)?null:a;const c=Mm(u,a);c!==null&&r.set(i.key,c),u.isValidDocument()||u.convertToNoDocument(se.min())})),r}keys(){return this.mutations.reduce(((e,n)=>e.add(n.key)),de())}isEqual(e){return this.batchId===e.batchId&&di(this.mutations,e.mutations,((n,r)=>hd(n,r)))&&di(this.baseMutations,e.baseMutations,((n,r)=>hd(n,r)))}}class ul{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){Ee(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let i=(function(){return bv})();const s=e.mutations;for(let u=0;u<s.length;u++)i=i.insert(s[u].key,r[u].version);return new ul(e,n,r,i)}}/**
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
 */class Fv{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class Nv{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
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
 */var Fe,me;function Vv(t){switch(t){case O.OK:return ne(64938);case O.CANCELLED:case O.UNKNOWN:case O.DEADLINE_EXCEEDED:case O.RESOURCE_EXHAUSTED:case O.INTERNAL:case O.UNAVAILABLE:case O.UNAUTHENTICATED:return!1;case O.INVALID_ARGUMENT:case O.NOT_FOUND:case O.ALREADY_EXISTS:case O.PERMISSION_DENIED:case O.FAILED_PRECONDITION:case O.ABORTED:case O.OUT_OF_RANGE:case O.UNIMPLEMENTED:case O.DATA_LOSS:return!0;default:return ne(15467,{code:t})}}function Um(t){if(t===void 0)return vn("GRPC error has no .code"),O.UNKNOWN;switch(t){case Fe.OK:return O.OK;case Fe.CANCELLED:return O.CANCELLED;case Fe.UNKNOWN:return O.UNKNOWN;case Fe.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case Fe.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case Fe.INTERNAL:return O.INTERNAL;case Fe.UNAVAILABLE:return O.UNAVAILABLE;case Fe.UNAUTHENTICATED:return O.UNAUTHENTICATED;case Fe.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case Fe.NOT_FOUND:return O.NOT_FOUND;case Fe.ALREADY_EXISTS:return O.ALREADY_EXISTS;case Fe.PERMISSION_DENIED:return O.PERMISSION_DENIED;case Fe.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case Fe.ABORTED:return O.ABORTED;case Fe.OUT_OF_RANGE:return O.OUT_OF_RANGE;case Fe.UNIMPLEMENTED:return O.UNIMPLEMENTED;case Fe.DATA_LOSS:return O.DATA_LOSS;default:return ne(39323,{code:t})}}(me=Fe||(Fe={}))[me.OK=0]="OK",me[me.CANCELLED=1]="CANCELLED",me[me.UNKNOWN=2]="UNKNOWN",me[me.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",me[me.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",me[me.NOT_FOUND=5]="NOT_FOUND",me[me.ALREADY_EXISTS=6]="ALREADY_EXISTS",me[me.PERMISSION_DENIED=7]="PERMISSION_DENIED",me[me.UNAUTHENTICATED=16]="UNAUTHENTICATED",me[me.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",me[me.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",me[me.ABORTED=10]="ABORTED",me[me.OUT_OF_RANGE=11]="OUT_OF_RANGE",me[me.UNIMPLEMENTED=12]="UNIMPLEMENTED",me[me.INTERNAL=13]="INTERNAL",me[me.UNAVAILABLE=14]="UNAVAILABLE",me[me.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function Ov(){return new TextEncoder}/**
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
 */const Mv=new Kn([4294967295,4294967295],0);function pd(t){const e=Ov().encode(t),n=new em;return n.update(e),new Uint8Array(n.digest())}function md(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Kn([n,r],0),new Kn([i,s],0)]}class ol{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Qi(`Invalid padding: ${n}`);if(r<0)throw new Qi(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Qi(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Qi(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=Kn.fromNumber(this.ge)}ye(e,n,r){let i=e.add(n.multiply(Kn.fromNumber(r)));return i.compare(Mv)===1&&(i=new Kn([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=pd(e),[r,i]=md(n);for(let s=0;s<this.hashCount;s++){const u=this.ye(r,i,s);if(!this.we(u))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),u=new ol(s,i,n);return r.forEach((a=>u.insert(a))),u}insert(e){if(this.ge===0)return;const n=pd(e),[r,i]=md(n);for(let s=0;s<this.hashCount;s++){const u=this.ye(r,i,s);this.Se(u)}}Se(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Qi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Fo{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,Ls.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Fo(se.min(),i,new Re(fe),Tn(),de())}}class Ls{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Ls(r,n,de(),de(),de())}}/**
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
 */class ku{constructor(e,n,r,i){this.be=e,this.removedTargetIds=n,this.key=r,this.De=i}}class Bm{constructor(e,n){this.targetId=e,this.Ce=n}}class qm{constructor(e,n,r=Ye.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class gd{constructor(){this.ve=0,this.Fe=_d(),this.Me=Ye.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=de(),n=de(),r=de();return this.Fe.forEach(((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:ne(38017,{changeType:s})}})),new Ls(this.Me,this.xe,e,n,r)}qe(){this.Oe=!1,this.Fe=_d()}Qe(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,Ee(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Lv{constructor(e){this.Ge=e,this.ze=new Map,this.je=Tn(),this.Je=gu(),this.He=gu(),this.Ye=new Re(fe)}Ze(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Xe(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,(n=>{const r=this.nt(n);switch(e.state){case 0:this.rt(n)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),r.Le(e.resumeToken));break;default:ne(56790,{state:e.state})}}))}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach(((r,i)=>{this.rt(i)&&n(i)}))}st(e){const n=e.targetId,r=e.Ce.count,i=this.ot(n);if(i){const s=i.target;if(sc(s))if(r===0){const u=new Z(s.path);this.et(n,u,ut.newNoDocument(u,se.min()))}else Ee(r===1,20013,{expectedCount:r});else{const u=this._t(n);if(u!==r){const a=this.ut(e),c=a?this.ct(a,e,u):1;if(c!==0){this.it(n);const l=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(n,l)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let u,a;try{u=sr(r).toUint8Array()}catch(c){if(c instanceof fm)return fi("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{a=new ol(u,i,s)}catch(c){return fi(c instanceof Qi?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return a.ge===0?null:a}ct(e,n,r){return n.Ce.count===r-this.Pt(e,n.targetId)?0:2}Pt(e,n){const r=this.Ge.getRemoteKeysForTarget(n);let i=0;return r.forEach((s=>{const u=this.Ge.ht(),a=`projects/${u.projectId}/databases/${u.database}/documents/${s.path.canonicalString()}`;e.mightContain(a)||(this.et(n,s,null),i++)})),i}Tt(e){const n=new Map;this.ze.forEach(((s,u)=>{const a=this.ot(u);if(a){if(s.current&&sc(a.target)){const c=new Z(a.target.path);this.It(c).has(u)||this.Et(u,c)||this.et(u,c,ut.newNoDocument(c,e))}s.Be&&(n.set(u,s.ke()),s.qe())}}));let r=de();this.He.forEach(((s,u)=>{let a=!0;u.forEachWhile((c=>{const l=this.ot(c);return!l||l.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)})),a&&(r=r.add(s))})),this.je.forEach(((s,u)=>u.setReadTime(e)));const i=new Fo(e,n,this.Ye,this.je,r);return this.je=Tn(),this.Je=gu(),this.He=gu(),this.Ye=new Re(fe),i}Xe(e,n){if(!this.rt(e))return;const r=this.Et(e,n.key)?2:0;this.nt(e).Qe(n.key,r),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.It(n.key).add(e)),this.He=this.He.insert(n.key,this.dt(n.key).add(e))}et(e,n,r){if(!this.rt(e))return;const i=this.nt(e);this.Et(e,n)?i.Qe(n,1):i.$e(n),this.He=this.He.insert(n,this.dt(n).delete(e)),this.He=this.He.insert(n,this.dt(n).add(e)),r&&(this.je=this.je.insert(n,r))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let n=this.ze.get(e);return n||(n=new gd,this.ze.set(e,n)),n}dt(e){let n=this.He.get(e);return n||(n=new qe(fe),this.He=this.He.insert(e,n)),n}It(e){let n=this.Je.get(e);return n||(n=new qe(fe),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||X("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new gd),this.Ge.getRemoteKeysForTarget(e).forEach((n=>{this.et(e,n,null)}))}Et(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function gu(){return new Re(Z.comparator)}function _d(){return new Re(Z.comparator)}const Uv={asc:"ASCENDING",desc:"DESCENDING"},Bv={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},qv={and:"AND",or:"OR"};class jv{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function ac(t,e){return t.useProto3Json||Co(e)?e:{value:e}}function Yu(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function jm(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function zv(t,e){return Yu(t,e.toTimestamp())}function Qt(t){return Ee(!!t,49232),se.fromTimestamp((function(n){const r=ir(n);return new Se(r.seconds,r.nanos)})(t))}function al(t,e){return cc(t,e).canonicalString()}function cc(t,e){const n=(function(i){return new Ie(["projects",i.projectId,"databases",i.database])})(t).child("documents");return e===void 0?n:n.child(e)}function zm(t){const e=Ie.fromString(t);return Ee(Km(e),10190,{key:e.toString()}),e}function lc(t,e){return al(t.databaseId,e.path)}function Ca(t,e){const n=zm(e);if(n.get(1)!==t.databaseId.projectId)throw new J(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new J(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Z(Hm(n))}function $m(t,e){return al(t.databaseId,e)}function $v(t){const e=zm(t);return e.length===4?Ie.emptyPath():Hm(e)}function hc(t){return new Ie(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Hm(t){return Ee(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function yd(t,e,n){return{name:lc(t,e),fields:n.value.mapValue.fields}}function Hv(t,e){let n;if("targetChange"in e){e.targetChange;const r=(function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:ne(39313,{state:l})})(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=(function(l,f){return l.useProto3Json?(Ee(f===void 0||typeof f=="string",58123),Ye.fromBase64String(f||"")):(Ee(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ye.fromUint8Array(f||new Uint8Array))})(t,e.targetChange.resumeToken),u=e.targetChange.cause,a=u&&(function(l){const f=l.code===void 0?O.UNKNOWN:Um(l.code);return new J(f,l.message||"")})(u);n=new qm(r,i,s,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Ca(t,r.document.name),s=Qt(r.document.updateTime),u=r.document.createTime?Qt(r.document.createTime):se.min(),a=new It({mapValue:{fields:r.document.fields}}),c=ut.newFoundDocument(i,s,u,a),l=r.targetIds||[],f=r.removedTargetIds||[];n=new ku(l,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Ca(t,r.document),s=r.readTime?Qt(r.readTime):se.min(),u=ut.newNoDocument(i,s),a=r.removedTargetIds||[];n=new ku([],a,u.key,u)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Ca(t,r.document),s=r.removedTargetIds||[];n=new ku([],s,i,null)}else{if(!("filter"in e))return ne(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,u=new Nv(i,s),a=r.targetId;n=new Bm(a,u)}}return n}function Wv(t,e){let n;if(e instanceof Ms)n={update:yd(t,e.key,e.value)};else if(e instanceof sl)n={delete:lc(t,e.key)};else if(e instanceof Vr)n={update:yd(t,e.key,e.data),updateMask:tT(e.fieldMask)};else{if(!(e instanceof Dv))return ne(16599,{Vt:e.type});n={verify:lc(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((r=>(function(s,u){const a=u.transform;if(a instanceof Is)return{fieldPath:u.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof xs)return{fieldPath:u.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof Cs)return{fieldPath:u.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Xu)return{fieldPath:u.field.canonicalString(),increment:a.Ae};throw ne(20930,{transform:u.transform})})(0,r)))),e.precondition.isNone||(n.currentDocument=(function(i,s){return s.updateTime!==void 0?{updateTime:zv(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:ne(27497)})(t,e.precondition)),n}function Gv(t,e){return t&&t.length>0?(Ee(e!==void 0,14353),t.map((n=>(function(i,s){let u=i.updateTime?Qt(i.updateTime):Qt(s);return u.isEqual(se.min())&&(u=Qt(s)),new Sv(u,i.transformResults||[])})(n,e)))):[]}function Kv(t,e){return{documents:[$m(t,e.path)]}}function Qv(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=$m(t,i);const s=(function(l){if(l.length!==0)return Gm(Mt.create(l,"and"))})(e.filters);s&&(n.structuredQuery.where=s);const u=(function(l){if(l.length!==0)return l.map((f=>(function(g){return{field:Kr(g.field),direction:Yv(g.dir)}})(f)))})(e.orderBy);u&&(n.structuredQuery.orderBy=u);const a=ac(t,e.limit);return a!==null&&(n.structuredQuery.limit=a),e.startAt&&(n.structuredQuery.startAt=(function(l){return{before:l.inclusive,values:l.position}})(e.startAt)),e.endAt&&(n.structuredQuery.endAt=(function(l){return{before:!l.inclusive,values:l.position}})(e.endAt)),{ft:n,parent:i}}function Jv(t){let e=$v(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){Ee(r===1,65062);const f=n.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];n.where&&(s=(function(p){const g=Wm(p);return g instanceof Mt&&Tm(g)?g.getFilters():[g]})(n.where));let u=[];n.orderBy&&(u=(function(p){return p.map((g=>(function(b){return new ws(Qr(b.field),(function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(b.direction))})(g)))})(n.orderBy));let a=null;n.limit&&(a=(function(p){let g;return g=typeof p=="object"?p.value:p,Co(g)?null:g})(n.limit));let c=null;n.startAt&&(c=(function(p){const g=!!p.before,_=p.values||[];return new Ju(_,g)})(n.startAt));let l=null;return n.endAt&&(l=(function(p){const g=!p.before,_=p.values||[];return new Ju(_,g)})(n.endAt)),pv(e,i,u,s,a,"F",c,l)}function Xv(t,e){const n=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ne(28987,{purpose:i})}})(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Wm(t){return t.unaryFilter!==void 0?(function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Qr(n.unaryFilter.field);return Ne.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Qr(n.unaryFilter.field);return Ne.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Qr(n.unaryFilter.field);return Ne.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const u=Qr(n.unaryFilter.field);return Ne.create(u,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ne(61313);default:return ne(60726)}})(t):t.fieldFilter!==void 0?(function(n){return Ne.create(Qr(n.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ne(58110);default:return ne(50506)}})(n.fieldFilter.op),n.fieldFilter.value)})(t):t.compositeFilter!==void 0?(function(n){return Mt.create(n.compositeFilter.filters.map((r=>Wm(r))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return ne(1026)}})(n.compositeFilter.op))})(t):ne(30097,{filter:t})}function Yv(t){return Uv[t]}function Zv(t){return Bv[t]}function eT(t){return qv[t]}function Kr(t){return{fieldPath:t.canonicalString()}}function Qr(t){return Xe.fromServerFormat(t.fieldPath)}function Gm(t){return t instanceof Ne?(function(n){if(n.op==="=="){if(sd(n.value))return{unaryFilter:{field:Kr(n.field),op:"IS_NAN"}};if(id(n.value))return{unaryFilter:{field:Kr(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(sd(n.value))return{unaryFilter:{field:Kr(n.field),op:"IS_NOT_NAN"}};if(id(n.value))return{unaryFilter:{field:Kr(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Kr(n.field),op:Zv(n.op),value:n.value}}})(t):t instanceof Mt?(function(n){const r=n.getFilters().map((i=>Gm(i)));return r.length===1?r[0]:{compositeFilter:{op:eT(n.op),filters:r}}})(t):ne(54877,{filter:t})}function tT(t){const e=[];return t.fields.forEach((n=>e.push(n.canonicalString()))),{fieldPaths:e}}function Km(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
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
 */class zn{constructor(e,n,r,i,s=se.min(),u=se.min(),a=Ye.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=u,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new zn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new zn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new zn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new zn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class nT{constructor(e){this.yt=e}}function rT(t){const e=Jv({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?oc(e,e.limit,"L"):e}/**
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
 */class iT{constructor(){this.Cn=new sT}addToCollectionParentIndex(e,n){return this.Cn.add(n),M.resolve()}getCollectionParents(e,n){return M.resolve(this.Cn.getEntries(n))}addFieldIndex(e,n){return M.resolve()}deleteFieldIndex(e,n){return M.resolve()}deleteAllFieldIndexes(e){return M.resolve()}createTargetIndexes(e,n){return M.resolve()}getDocumentsMatchingTarget(e,n){return M.resolve(null)}getIndexType(e,n){return M.resolve(0)}getFieldIndexes(e,n){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,n){return M.resolve(rr.min())}getMinOffsetFromCollectionGroup(e,n){return M.resolve(rr.min())}updateCollectionGroup(e,n,r){return M.resolve()}updateIndexEntries(e,n){return M.resolve()}}class sT{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new qe(Ie.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new qe(Ie.comparator)).toArray()}}/**
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
 */const bd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Qm=41943040;class gt{static withCacheSize(e){return new gt(e,gt.DEFAULT_COLLECTION_PERCENTILE,gt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
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
 */gt.DEFAULT_COLLECTION_PERCENTILE=10,gt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,gt.DEFAULT=new gt(Qm,gt.DEFAULT_COLLECTION_PERCENTILE,gt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),gt.DISABLED=new gt(-1,0,0);/**
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
 */class gi{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new gi(0)}static cr(){return new gi(-1)}}/**
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
 */const Ed="LruGarbageCollector",uT=1048576;function vd([t,e],[n,r]){const i=fe(t,n);return i===0?fe(e,r):i}class oT{constructor(e){this.Ir=e,this.buffer=new qe(vd),this.Er=0}dr(){return++this.Er}Ar(e){const n=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();vd(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class aT{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){X(Ed,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){wi(n)?X(Ed,"Ignoring IndexedDB error during garbage collection: ",n):await Ai(n)}await this.Vr(3e5)}))}}class cT{constructor(e,n){this.mr=e,this.params=n}calculateTargetCount(e,n){return this.mr.gr(e).next((r=>Math.floor(n/100*r)))}nthSequenceNumber(e,n){if(n===0)return M.resolve(xo.ce);const r=new oT(n);return this.mr.forEachTarget(e,(i=>r.Ar(i.sequenceNumber))).next((()=>this.mr.pr(e,(i=>r.Ar(i))))).next((()=>r.maxValue))}removeTargets(e,n,r){return this.mr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.mr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(X("LruGarbageCollector","Garbage collection skipped; disabled"),M.resolve(bd)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(X("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),bd):this.yr(e,n)))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,n){let r,i,s,u,a,c,l;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(X("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,u=Date.now(),this.nthSequenceNumber(e,i)))).next((p=>(r=p,a=Date.now(),this.removeTargets(e,r,n)))).next((p=>(s=p,c=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(l=Date.now(),Wr()<=he.DEBUG&&X("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${u-f}ms
	Determined least recently used ${i} in `+(a-u)+`ms
	Removed ${s} targets in `+(c-a)+`ms
	Removed ${p} documents in `+(l-c)+`ms
Total Duration: ${l-f}ms`),M.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p}))))}}function lT(t,e){return new cT(t,e)}/**
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
 */class hT{constructor(){this.changes=new Nr((e=>e.toString()),((e,n)=>e.isEqual(n))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,ut.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?M.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class fT{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
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
 */class dT{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next((i=>(r=i,this.remoteDocumentCache.getEntry(e,n)))).next((i=>(r!==null&&as(r.mutation,i,Nt.empty(),Se.now()),i)))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next((r=>this.getLocalViewOfDocuments(e,r,de()).next((()=>r))))}getLocalViewOfDocuments(e,n,r=de()){const i=Ar();return this.populateOverlays(e,i,n).next((()=>this.computeViews(e,n,i,r).next((s=>{let u=Ki();return s.forEach(((a,c)=>{u=u.insert(a,c.overlayedDocument)})),u}))))}getOverlayedDocuments(e,n){const r=Ar();return this.populateOverlays(e,r,n).next((()=>this.computeViews(e,n,r,de())))}populateOverlays(e,n,r){const i=[];return r.forEach((s=>{n.has(s)||i.push(s)})),this.documentOverlayCache.getOverlays(e,i).next((s=>{s.forEach(((u,a)=>{n.set(u,a)}))}))}computeViews(e,n,r,i){let s=Tn();const u=os(),a=(function(){return os()})();return n.forEach(((c,l)=>{const f=r.get(l.key);i.has(l.key)&&(f===void 0||f.mutation instanceof Vr)?s=s.insert(l.key,l):f!==void 0?(u.set(l.key,f.mutation.getFieldMask()),as(f.mutation,l,f.mutation.getFieldMask(),Se.now())):u.set(l.key,Nt.empty())})),this.recalculateAndSaveOverlays(e,s).next((c=>(c.forEach(((l,f)=>u.set(l,f))),n.forEach(((l,f)=>a.set(l,new fT(f,u.get(l)??null)))),a)))}recalculateAndSaveOverlays(e,n){const r=os();let i=new Re(((u,a)=>u-a)),s=de();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next((u=>{for(const a of u)a.keys().forEach((c=>{const l=n.get(c);if(l===null)return;let f=r.get(c)||Nt.empty();f=a.applyToLocalView(l,f),r.set(c,f);const p=(i.get(a.batchId)||de()).add(c);i=i.insert(a.batchId,p)}))})).next((()=>{const u=[],a=i.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),l=c.key,f=c.value,p=Dm();f.forEach((g=>{if(!s.has(g)){const _=Mm(n.get(g),r.get(g));_!==null&&p.set(g,_),s=s.add(g)}})),u.push(this.documentOverlayCache.saveOverlays(e,l,p))}return M.waitFor(u)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,n,r,i){return(function(u){return Z.isDocumentKey(u.path)&&u.collectionGroup===null&&u.filters.length===0})(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):xm(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next((s=>{const u=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):M.resolve(Ar());let a=Es,c=s;return u.next((l=>M.forEach(l,((f,p)=>(a<p.largestBatchId&&(a=p.largestBatchId),s.get(f)?M.resolve():this.remoteDocumentCache.getEntry(e,f).next((g=>{c=c.insert(f,g)}))))).next((()=>this.populateOverlays(e,l,s))).next((()=>this.computeViews(e,c,l,de()))).next((f=>({batchId:a,changes:Rm(f)})))))}))}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new Z(n)).next((r=>{let i=Ki();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i}))}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let u=Ki();return this.indexManager.getCollectionParents(e,s).next((a=>M.forEach(a,(c=>{const l=(function(p,g){return new Ii(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(n,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,l,r,i).next((f=>{f.forEach(((p,g)=>{u=u.insert(p,g)}))}))})).next((()=>u))))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next((u=>(s=u,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i)))).next((u=>{s.forEach(((c,l)=>{const f=l.getKey();u.get(f)===null&&(u=u.insert(f,ut.newInvalidDocument(f)))}));let a=Ki();return u.forEach(((c,l)=>{const f=s.get(c);f!==void 0&&as(f.mutation,l,Nt.empty(),Se.now()),Ro(n,l)&&(a=a.insert(c,l))})),a}))}}/**
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
 */class pT{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,n){return M.resolve(this.Lr.get(n))}saveBundleMetadata(e,n){return this.Lr.set(n.id,(function(i){return{id:i.id,version:i.version,createTime:Qt(i.createTime)}})(n)),M.resolve()}getNamedQuery(e,n){return M.resolve(this.kr.get(n))}saveNamedQuery(e,n){return this.kr.set(n.name,(function(i){return{name:i.name,query:rT(i.bundledQuery),readTime:Qt(i.readTime)}})(n)),M.resolve()}}/**
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
 */class mT{constructor(){this.overlays=new Re(Z.comparator),this.qr=new Map}getOverlay(e,n){return M.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Ar();return M.forEach(n,(i=>this.getOverlay(e,i).next((s=>{s!==null&&r.set(i,s)})))).next((()=>r))}saveOverlays(e,n,r){return r.forEach(((i,s)=>{this.St(e,n,s)})),M.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.qr.get(r);return i!==void 0&&(i.forEach((s=>this.overlays=this.overlays.remove(s))),this.qr.delete(r)),M.resolve()}getOverlaysForCollection(e,n,r){const i=Ar(),s=n.length+1,u=new Z(n.child("")),a=this.overlays.getIteratorFrom(u);for(;a.hasNext();){const c=a.getNext().value,l=c.getKey();if(!n.isPrefixOf(l.path))break;l.path.length===s&&c.largestBatchId>r&&i.set(c.getKey(),c)}return M.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new Re(((l,f)=>l-f));const u=this.overlays.getIterator();for(;u.hasNext();){const l=u.getNext().value;if(l.getKey().getCollectionGroup()===n&&l.largestBatchId>r){let f=s.get(l.largestBatchId);f===null&&(f=Ar(),s=s.insert(l.largestBatchId,f)),f.set(l.getKey(),l)}}const a=Ar(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((l,f)=>a.set(l,f))),!(a.size()>=i)););return M.resolve(a)}St(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const u=this.qr.get(i.largestBatchId).delete(r.key);this.qr.set(i.largestBatchId,u)}this.overlays=this.overlays.insert(r.key,new Fv(n,r));let s=this.qr.get(n);s===void 0&&(s=de(),this.qr.set(n,s)),this.qr.set(n,s.add(r.key))}}/**
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
 */class gT{constructor(){this.sessionToken=Ye.EMPTY_BYTE_STRING}getSessionToken(e){return M.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,M.resolve()}}/**
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
 */class cl{constructor(){this.Qr=new qe(ze.$r),this.Ur=new qe(ze.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,n){const r=new ze(e,n);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,n){e.forEach((r=>this.addReference(r,n)))}removeReference(e,n){this.Gr(new ze(e,n))}zr(e,n){e.forEach((r=>this.removeReference(r,n)))}jr(e){const n=new Z(new Ie([])),r=new ze(n,e),i=new ze(n,e+1),s=[];return this.Ur.forEachInRange([r,i],(u=>{this.Gr(u),s.push(u.key)})),s}Jr(){this.Qr.forEach((e=>this.Gr(e)))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const n=new Z(new Ie([])),r=new ze(n,e),i=new ze(n,e+1);let s=de();return this.Ur.forEachInRange([r,i],(u=>{s=s.add(u.key)})),s}containsKey(e){const n=new ze(e,0),r=this.Qr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class ze{constructor(e,n){this.key=e,this.Yr=n}static $r(e,n){return Z.comparator(e.key,n.key)||fe(e.Yr,n.Yr)}static Kr(e,n){return fe(e.Yr,n.Yr)||Z.comparator(e.key,n.key)}}/**
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
 */class _T{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.tr=1,this.Zr=new qe(ze.$r)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const u=new Pv(s,n,r,i);this.mutationQueue.push(u);for(const a of i)this.Zr=this.Zr.add(new ze(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return M.resolve(u)}lookupMutationBatch(e,n){return M.resolve(this.Xr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.ei(r),s=i<0?0:i;return M.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?Yc:this.tr-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new ze(n,0),i=new ze(n,Number.POSITIVE_INFINITY),s=[];return this.Zr.forEachInRange([r,i],(u=>{const a=this.Xr(u.Yr);s.push(a)})),M.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new qe(fe);return n.forEach((i=>{const s=new ze(i,0),u=new ze(i,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([s,u],(a=>{r=r.add(a.Yr)}))})),M.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;Z.isDocumentKey(s)||(s=s.child(""));const u=new ze(new Z(s),0);let a=new qe(fe);return this.Zr.forEachWhile((c=>{const l=c.key.path;return!!r.isPrefixOf(l)&&(l.length===i&&(a=a.add(c.Yr)),!0)}),u),M.resolve(this.ti(a))}ti(e){const n=[];return e.forEach((r=>{const i=this.Xr(r);i!==null&&n.push(i)})),n}removeMutationBatch(e,n){Ee(this.ni(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return M.forEach(n.mutations,(i=>{const s=new ze(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)})).next((()=>{this.Zr=r}))}ir(e){}containsKey(e,n){const r=new ze(n,0),i=this.Zr.firstAfterOrEqual(r);return M.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}ni(e,n){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const n=this.ei(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class yT{constructor(e){this.ri=e,this.docs=(function(){return new Re(Z.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,u=this.ri(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:u}),this.size+=u-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return M.resolve(r?r.document.mutableCopy():ut.newInvalidDocument(n))}getEntries(e,n){let r=Tn();return n.forEach((i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():ut.newInvalidDocument(i))})),M.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=Tn();const u=n.path,a=new Z(u.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:l,value:{document:f}}=c.getNext();if(!u.isPrefixOf(l.path))break;l.path.length>u.length+1||W6(H6(f),r)<=0||(i.has(f.key)||Ro(n,f))&&(s=s.insert(f.key,f.mutableCopy()))}return M.resolve(s)}getAllFromCollectionGroup(e,n,r,i){ne(9500)}ii(e,n){return M.forEach(this.docs,(r=>n(r)))}newChangeBuffer(e){return new bT(this)}getSize(e){return M.resolve(this.size)}}class bT extends hT{constructor(e){super(),this.Nr=e}applyChanges(e){const n=[];return this.changes.forEach(((r,i)=>{i.isValidDocument()?n.push(this.Nr.addEntry(e,i)):this.Nr.removeEntry(r)})),M.waitFor(n)}getFromCache(e,n){return this.Nr.getEntry(e,n)}getAllFromCache(e,n){return this.Nr.getEntries(e,n)}}/**
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
 */class ET{constructor(e){this.persistence=e,this.si=new Nr((n=>tl(n)),nl),this.lastRemoteSnapshotVersion=se.min(),this.highestTargetId=0,this.oi=0,this._i=new cl,this.targetCount=0,this.ai=gi.ur()}forEachTarget(e,n){return this.si.forEach(((r,i)=>n(i))),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.oi&&(this.oi=n),M.resolve()}Pr(e){this.si.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.ai=new gi(n),this.highestTargetId=n),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,n){return this.Pr(n),this.targetCount+=1,M.resolve()}updateTargetData(e,n){return this.Pr(n),M.resolve()}removeTargetData(e,n){return this.si.delete(n.target),this._i.jr(n.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.si.forEach(((u,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.si.delete(u),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)})),M.waitFor(s).next((()=>i))}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,n){const r=this.si.get(n)||null;return M.resolve(r)}addMatchingKeys(e,n,r){return this._i.Wr(n,r),M.resolve()}removeMatchingKeys(e,n,r){this._i.zr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach((u=>{s.push(i.markPotentiallyOrphaned(e,u))})),M.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this._i.jr(n),M.resolve()}getMatchingKeysForTargetId(e,n){const r=this._i.Hr(n);return M.resolve(r)}containsKey(e,n){return M.resolve(this._i.containsKey(n))}}/**
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
 */class Jm{constructor(e,n){this.ui={},this.overlays={},this.ci=new xo(0),this.li=!1,this.li=!0,this.hi=new gT,this.referenceDelegate=e(this),this.Pi=new ET(this),this.indexManager=new iT,this.remoteDocumentCache=(function(i){return new yT(i)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new nT(n),this.Ii=new pT(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new mT,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.ui[e.toKey()];return r||(r=new _T(n,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,n,r){X("MemoryPersistence","Starting transaction:",e);const i=new vT(this.ci.next());return this.referenceDelegate.Ei(),r(i).next((s=>this.referenceDelegate.di(i).next((()=>s)))).toPromise().then((s=>(i.raiseOnCommittedEvent(),s)))}Ai(e,n){return M.or(Object.values(this.ui).map((r=>()=>r.containsKey(e,n))))}}class vT extends K6{constructor(e){super(),this.currentSequenceNumber=e}}class ll{constructor(e){this.persistence=e,this.Ri=new cl,this.Vi=null}static mi(e){return new ll(e)}get fi(){if(this.Vi)return this.Vi;throw ne(60996)}addReference(e,n,r){return this.Ri.addReference(r,n),this.fi.delete(r.toString()),M.resolve()}removeReference(e,n,r){return this.Ri.removeReference(r,n),this.fi.add(r.toString()),M.resolve()}markPotentiallyOrphaned(e,n){return this.fi.add(n.toString()),M.resolve()}removeTarget(e,n){this.Ri.jr(n.targetId).forEach((i=>this.fi.add(i.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next((i=>{i.forEach((s=>this.fi.add(s.toString())))})).next((()=>r.removeTargetData(e,n)))}Ei(){this.Vi=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.fi,(r=>{const i=Z.fromPath(r);return this.gi(e,i).next((s=>{s||n.removeEntry(i,se.min())}))})).next((()=>(this.Vi=null,n.apply(e))))}updateLimboDocument(e,n){return this.gi(e,n).next((r=>{r?this.fi.delete(n.toString()):this.fi.add(n.toString())}))}Ti(e){return 0}gi(e,n){return M.or([()=>M.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ai(e,n)])}}class Zu{constructor(e,n){this.persistence=e,this.pi=new Nr((r=>X6(r.path)),((r,i)=>r.isEqual(i))),this.garbageCollector=lT(this,n)}static mi(e,n){return new Zu(e,n)}Ei(){}di(e){return M.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}gr(e){const n=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>n.next((i=>r+i))))}wr(e){let n=0;return this.pr(e,(r=>{n++})).next((()=>n))}pr(e,n){return M.forEach(this.pi,((r,i)=>this.br(e,r,i).next((s=>s?M.resolve():n(i)))))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ii(e,(u=>this.br(e,u,n).next((a=>{a||(r++,s.removeEntry(u,se.min()))})))).next((()=>s.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,n){return this.pi.set(n,e.currentSequenceNumber),M.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),M.resolve()}removeReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),M.resolve()}updateLimboDocument(e,n){return this.pi.set(n,e.currentSequenceNumber),M.resolve()}Ti(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=xu(e.data.value)),n}br(e,n,r){return M.or([()=>this.persistence.Ai(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const i=this.pi.get(n);return M.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class hl{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.Es=r,this.ds=i}static As(e,n){let r=de(),i=de();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new hl(e,n.fromCache,r,i)}}/**
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
 */class TT{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class AT{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return d3()?8:Q6(at())>0?6:4})()}initialize(e,n){this.ps=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.ys(e,n).next((u=>{s.result=u})).next((()=>{if(!s.result)return this.ws(e,n,i,r).next((u=>{s.result=u}))})).next((()=>{if(s.result)return;const u=new TT;return this.Ss(e,n,u).next((a=>{if(s.result=a,this.Vs)return this.bs(e,n,u,a.size)}))})).next((()=>s.result))}bs(e,n,r,i){return r.documentReadCount<this.fs?(Wr()<=he.DEBUG&&X("QueryEngine","SDK will not create cache indexes for query:",Gr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),M.resolve()):(Wr()<=he.DEBUG&&X("QueryEngine","Query:",Gr(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.gs*i?(Wr()<=he.DEBUG&&X("QueryEngine","The SDK decides to create cache indexes for query:",Gr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Gt(n))):M.resolve())}ys(e,n){if(cd(n))return M.resolve(null);let r=Gt(n);return this.indexManager.getIndexType(e,r).next((i=>i===0?null:(n.limit!==null&&i===1&&(n=oc(n,null,"F"),r=Gt(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next((s=>{const u=de(...s);return this.ps.getDocuments(e,u).next((a=>this.indexManager.getMinOffset(e,r).next((c=>{const l=this.Ds(n,a);return this.Cs(n,l,u,c.readTime)?this.ys(e,oc(n,null,"F")):this.vs(e,l,n,c)}))))})))))}ws(e,n,r,i){return cd(n)||i.isEqual(se.min())?M.resolve(null):this.ps.getDocuments(e,r).next((s=>{const u=this.Ds(n,s);return this.Cs(n,u,r,i)?M.resolve(null):(Wr()<=he.DEBUG&&X("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Gr(n)),this.vs(e,u,n,$6(i,Es)).next((a=>a)))}))}Ds(e,n){let r=new qe(Sm(e));return n.forEach(((i,s)=>{Ro(e,s)&&(r=r.add(s))})),r}Cs(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Ss(e,n,r){return Wr()<=he.DEBUG&&X("QueryEngine","Using full collection scan to execute query:",Gr(n)),this.ps.getDocumentsMatchingQuery(e,n,rr.min(),r)}vs(e,n,r,i){return this.ps.getDocumentsMatchingQuery(e,r,i).next((s=>(n.forEach((u=>{s=s.insert(u.key,u)})),s)))}}/**
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
 */const fl="LocalStore",wT=3e8;class IT{constructor(e,n,r,i){this.persistence=e,this.Fs=n,this.serializer=i,this.Ms=new Re(fe),this.xs=new Nr((s=>tl(s)),nl),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new dT(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(n=>e.collect(n,this.Ms)))}}function xT(t,e,n,r){return new IT(t,e,n,r)}async function Xm(t,e){const n=oe(t);return await n.persistence.runTransaction("Handle user change","readonly",(r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next((s=>(i=s,n.Bs(e),n.mutationQueue.getAllMutationBatches(r)))).next((s=>{const u=[],a=[];let c=de();for(const l of i){u.push(l.batchId);for(const f of l.mutations)c=c.add(f.key)}for(const l of s){a.push(l.batchId);for(const f of l.mutations)c=c.add(f.key)}return n.localDocuments.getDocuments(r,c).next((l=>({Ls:l,removedBatchIds:u,addedBatchIds:a})))}))}))}function CT(t,e){const n=oe(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const i=e.batch.keys(),s=n.Ns.newChangeBuffer({trackRemovals:!0});return(function(a,c,l,f){const p=l.batch,g=p.keys();let _=M.resolve();return g.forEach((b=>{_=_.next((()=>f.getEntry(c,b))).next((R=>{const N=l.docVersions.get(b);Ee(N!==null,48541),R.version.compareTo(N)<0&&(p.applyToRemoteDocument(R,l),R.isValidDocument()&&(R.setReadTime(l.commitVersion),f.addEntry(R)))}))})),_.next((()=>a.mutationQueue.removeMutationBatch(c,p)))})(n,r,e,s).next((()=>s.apply(r))).next((()=>n.mutationQueue.performConsistencyCheck(r))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(a){let c=de();for(let l=0;l<a.mutationResults.length;++l)a.mutationResults[l].transformResults.length>0&&(c=c.add(a.batch.mutations[l].key));return c})(e)))).next((()=>n.localDocuments.getDocuments(r,i)))}))}function Ym(t){const e=oe(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(n=>e.Pi.getLastRemoteSnapshotVersion(n)))}function ST(t,e){const n=oe(t),r=e.snapshotVersion;let i=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(s=>{const u=n.Ns.newChangeBuffer({trackRemovals:!0});i=n.Ms;const a=[];e.targetChanges.forEach(((f,p)=>{const g=i.get(p);if(!g)return;a.push(n.Pi.removeMatchingKeys(s,f.removedDocuments,p).next((()=>n.Pi.addMatchingKeys(s,f.addedDocuments,p))));let _=g.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?_=_.withResumeToken(Ye.EMPTY_BYTE_STRING,se.min()).withLastLimboFreeSnapshotVersion(se.min()):f.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(f.resumeToken,r)),i=i.insert(p,_),(function(R,N,B){return R.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=wT?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0})(g,_,f)&&a.push(n.Pi.updateTargetData(s,_))}));let c=Tn(),l=de();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(s,f))})),a.push(kT(s,u,e.documentUpdates).next((f=>{c=f.ks,l=f.qs}))),!r.isEqual(se.min())){const f=n.Pi.getLastRemoteSnapshotVersion(s).next((p=>n.Pi.setTargetsMetadata(s,s.currentSequenceNumber,r)));a.push(f)}return M.waitFor(a).next((()=>u.apply(s))).next((()=>n.localDocuments.getLocalViewOfDocuments(s,c,l))).next((()=>c))})).then((s=>(n.Ms=i,s)))}function kT(t,e,n){let r=de(),i=de();return n.forEach((s=>r=r.add(s))),e.getEntries(t,r).next((s=>{let u=Tn();return n.forEach(((a,c)=>{const l=s.get(a);c.isFoundDocument()!==l.isFoundDocument()&&(i=i.add(a)),c.isNoDocument()&&c.version.isEqual(se.min())?(e.removeEntry(a,c.readTime),u=u.insert(a,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(c),u=u.insert(a,c)):X(fl,"Ignoring outdated watch update for ",a,". Current version:",l.version," Watch version:",c.version)})),{ks:u,qs:i}}))}function RT(t,e){const n=oe(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Yc),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function DT(t,e){const n=oe(t);return n.persistence.runTransaction("Allocate target","readwrite",(r=>{let i;return n.Pi.getTargetData(r,e).next((s=>s?(i=s,M.resolve(i)):n.Pi.allocateTargetId(r).next((u=>(i=new zn(e,u,"TargetPurposeListen",r.currentSequenceNumber),n.Pi.addTargetData(r,i).next((()=>i)))))))})).then((r=>{const i=n.Ms.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(r.targetId,r),n.xs.set(e,r.targetId)),r}))}async function fc(t,e,n){const r=oe(t),i=r.Ms.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,(u=>r.persistence.referenceDelegate.removeTarget(u,i)))}catch(u){if(!wi(u))throw u;X(fl,`Failed to update sequence numbers for target ${e}: ${u}`)}r.Ms=r.Ms.remove(e),r.xs.delete(i.target)}function Td(t,e,n){const r=oe(t);let i=se.min(),s=de();return r.persistence.runTransaction("Execute query","readwrite",(u=>(function(c,l,f){const p=oe(c),g=p.xs.get(f);return g!==void 0?M.resolve(p.Ms.get(g)):p.Pi.getTargetData(l,f)})(r,u,Gt(e)).next((a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(u,a.targetId).next((c=>{s=c}))})).next((()=>r.Fs.getDocumentsMatchingQuery(u,e,n?i:se.min(),n?s:de()))).next((a=>(PT(r,gv(e),a),{documents:a,Qs:s})))))}function PT(t,e,n){let r=t.Os.get(e)||se.min();n.forEach(((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)})),t.Os.set(e,r)}class Ad{constructor(){this.activeTargetIds=Tv()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class FT{constructor(){this.Mo=new Ad,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,n,r){this.xo[e]=n}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Ad,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class NT{Oo(e){}shutdown(){}}/**
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
 */const wd="ConnectivityMonitor";class Id{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){X(wd,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){X(wd,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let _u=null;function dc(){return _u===null?_u=(function(){return 268435456+Math.round(2147483648*Math.random())})():_u++,"0x"+_u.toString(16)}/**
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
 */const Sa="RestConnection",VT={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class OT{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Uo=n+"://"+e.host,this.Ko=`projects/${r}/databases/${i}`,this.Wo=this.databaseId.database===Ku?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Go(e,n,r,i,s){const u=dc(),a=this.zo(e,n.toUriEncodedString());X(Sa,`Sending RPC '${e}' ${u}:`,a,r);const c={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(c,i,s);const{host:l}=new URL(a),f=Ei(l);return this.Jo(e,a,c,r,f).then((p=>(X(Sa,`Received RPC '${e}' ${u}: `,p),p)),(p=>{throw fi(Sa,`RPC '${e}' ${u} failed with error: `,p,"url: ",a,"request:",r),p}))}Ho(e,n,r,i,s,u){return this.Go(e,n,r,i,s)}jo(e,n,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ti})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach(((i,s)=>e[s]=i)),r&&r.headers.forEach(((i,s)=>e[s]=i))}zo(e,n){const r=VT[e];return`${this.Uo}/v1/${n}:${r}`}terminate(){}}/**
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
 */class MT{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
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
 */const rt="WebChannelConnection";class LT extends OT{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,n,r,i,s){const u=dc();return new Promise(((a,c)=>{const l=new tm;l.setWithCredentials(!0),l.listenOnce(nm.COMPLETE,(()=>{try{switch(l.getLastErrorCode()){case Iu.NO_ERROR:const p=l.getResponseJson();X(rt,`XHR for RPC '${e}' ${u} received:`,JSON.stringify(p)),a(p);break;case Iu.TIMEOUT:X(rt,`RPC '${e}' ${u} timed out`),c(new J(O.DEADLINE_EXCEEDED,"Request time out"));break;case Iu.HTTP_ERROR:const g=l.getStatus();if(X(rt,`RPC '${e}' ${u} failed with status:`,g,"response text:",l.getResponseText()),g>0){let _=l.getResponseJson();Array.isArray(_)&&(_=_[0]);const b=_?.error;if(b&&b.status&&b.message){const R=(function(B){const V=B.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(V)>=0?V:O.UNKNOWN})(b.status);c(new J(R,b.message))}else c(new J(O.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new J(O.UNAVAILABLE,"Connection failed."));break;default:ne(9055,{l_:e,streamId:u,h_:l.getLastErrorCode(),P_:l.getLastError()})}}finally{X(rt,`RPC '${e}' ${u} completed.`)}}));const f=JSON.stringify(i);X(rt,`RPC '${e}' ${u} sending request:`,i),l.send(n,"POST",f,r,15)}))}T_(e,n,r){const i=dc(),s=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],u=sm(),a=im(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.jo(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const f=s.join("");X(rt,`Creating RPC '${e}' stream ${i}: ${f}`,c);const p=u.createWebChannel(f,c);this.I_(p);let g=!1,_=!1;const b=new MT({Yo:N=>{_?X(rt,`Not sending because RPC '${e}' stream ${i} is closed:`,N):(g||(X(rt,`Opening RPC '${e}' stream ${i} transport.`),p.open(),g=!0),X(rt,`RPC '${e}' stream ${i} sending:`,N),p.send(N))},Zo:()=>p.close()}),R=(N,B,V)=>{N.listen(B,(P=>{try{V(P)}catch(k){setTimeout((()=>{throw k}),0)}}))};return R(p,Gi.EventType.OPEN,(()=>{_||(X(rt,`RPC '${e}' stream ${i} transport opened.`),b.o_())})),R(p,Gi.EventType.CLOSE,(()=>{_||(_=!0,X(rt,`RPC '${e}' stream ${i} transport closed`),b.a_(),this.E_(p))})),R(p,Gi.EventType.ERROR,(N=>{_||(_=!0,fi(rt,`RPC '${e}' stream ${i} transport errored. Name:`,N.name,"Message:",N.message),b.a_(new J(O.UNAVAILABLE,"The operation could not be completed")))})),R(p,Gi.EventType.MESSAGE,(N=>{if(!_){const B=N.data[0];Ee(!!B,16349);const V=B,P=V?.error||V[0]?.error;if(P){X(rt,`RPC '${e}' stream ${i} received error:`,P);const k=P.status;let q=(function(y){const E=Fe[y];if(E!==void 0)return Um(E)})(k),Q=P.message;q===void 0&&(q=O.INTERNAL,Q="Unknown error status: "+k+" with message "+P.message),_=!0,b.a_(new J(q,Q)),p.close()}else X(rt,`RPC '${e}' stream ${i} received:`,B),b.u_(B)}})),R(a,rm.STAT_EVENT,(N=>{N.stat===ec.PROXY?X(rt,`RPC '${e}' stream ${i} detected buffering proxy`):N.stat===ec.NOPROXY&&X(rt,`RPC '${e}' stream ${i} detected no buffering proxy`)})),setTimeout((()=>{b.__()}),0),b}terminate(){this.c_.forEach((e=>e.close())),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter((n=>n===e))}}function ka(){return typeof document<"u"?document:null}/**
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
 */function No(t){return new jv(t,!0)}/**
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
 */class Zm{constructor(e,n,r=1e3,i=1.5,s=6e4){this.Mi=e,this.timerId=n,this.d_=r,this.A_=i,this.R_=s,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const n=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),i=Math.max(0,n-r);i>0&&X("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.V_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,i,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const xd="PersistentStream";class eg{constructor(e,n,r,i,s,u,a,c){this.Mi=e,this.S_=r,this.b_=i,this.connection=s,this.authCredentialsProvider=u,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Zm(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===O.RESOURCE_EXHAUSTED?(vn(n.toString()),vn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(n)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,i])=>{this.D_===n&&this.G_(r,i)}),(r=>{e((()=>{const i=new J(O.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(i)}))}))}G_(e,n){const r=this.W_(this.D_);this.stream=this.j_(e,n),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((i=>{r((()=>this.z_(i)))})),this.stream.onMessage((i=>{r((()=>++this.F_==1?this.J_(i):this.onNext(i)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return X(xd,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return n=>{this.Mi.enqueueAndForget((()=>this.D_===e?n():(X(xd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class UT extends eg{constructor(e,n,r,i,s,u){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,u),this.serializer=s}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=Hv(this.serializer,e),r=(function(s){if(!("targetChange"in s))return se.min();const u=s.targetChange;return u.targetIds&&u.targetIds.length?se.min():u.readTime?Qt(u.readTime):se.min()})(e);return this.listener.H_(n,r)}Y_(e){const n={};n.database=hc(this.serializer),n.addTarget=(function(s,u){let a;const c=u.target;if(a=sc(c)?{documents:Kv(s,c)}:{query:Qv(s,c).ft},a.targetId=u.targetId,u.resumeToken.approximateByteSize()>0){a.resumeToken=jm(s,u.resumeToken);const l=ac(s,u.expectedCount);l!==null&&(a.expectedCount=l)}else if(u.snapshotVersion.compareTo(se.min())>0){a.readTime=Yu(s,u.snapshotVersion.toTimestamp());const l=ac(s,u.expectedCount);l!==null&&(a.expectedCount=l)}return a})(this.serializer,e);const r=Xv(this.serializer,e);r&&(n.labels=r),this.q_(n)}Z_(e){const n={};n.database=hc(this.serializer),n.removeTarget=e,this.q_(n)}}class BT extends eg{constructor(e,n,r,i,s,u){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,u),this.serializer=s}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return Ee(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Ee(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Ee(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=Gv(e.writeResults,e.commitTime),r=Qt(e.commitTime);return this.listener.na(r,n)}ra(){const e={};e.database=hc(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map((r=>Wv(this.serializer,r)))};this.q_(n)}}/**
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
 */class qT{}class jT extends qT{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new J(O.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,n,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,u])=>this.connection.Go(e,cc(n,r),i,s,u))).catch((s=>{throw s.name==="FirebaseError"?(s.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new J(O.UNKNOWN,s.toString())}))}Ho(e,n,r,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([u,a])=>this.connection.Ho(e,cc(n,r),i,u,a,s))).catch((u=>{throw u.name==="FirebaseError"?(u.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),u):new J(O.UNKNOWN,u.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class zT{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(vn(n),this.aa=!1):X("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const Rr="RemoteStore";class $T{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=s,this.Aa.Oo((u=>{r.enqueueAndForget((async()=>{Or(this)&&(X(Rr,"Restarting streams for network reachability change."),await(async function(c){const l=oe(c);l.Ea.add(4),await Us(l),l.Ra.set("Unknown"),l.Ea.delete(4),await Vo(l)})(this))}))})),this.Ra=new zT(r,i)}}async function Vo(t){if(Or(t))for(const e of t.da)await e(!0)}async function Us(t){for(const e of t.da)await e(!1)}function tg(t,e){const n=oe(t);n.Ia.has(e.targetId)||(n.Ia.set(e.targetId,e),gl(n)?ml(n):xi(n).O_()&&pl(n,e))}function dl(t,e){const n=oe(t),r=xi(n);n.Ia.delete(e),r.O_()&&ng(n,e),n.Ia.size===0&&(r.O_()?r.L_():Or(n)&&n.Ra.set("Unknown"))}function pl(t,e){if(t.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(se.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}xi(t).Y_(e)}function ng(t,e){t.Va.Ue(e),xi(t).Z_(e)}function ml(t){t.Va=new Lv({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ia.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),xi(t).start(),t.Ra.ua()}function gl(t){return Or(t)&&!xi(t).x_()&&t.Ia.size>0}function Or(t){return oe(t).Ea.size===0}function rg(t){t.Va=void 0}async function HT(t){t.Ra.set("Online")}async function WT(t){t.Ia.forEach(((e,n)=>{pl(t,e)}))}async function GT(t,e){rg(t),gl(t)?(t.Ra.ha(e),ml(t)):t.Ra.set("Unknown")}async function KT(t,e,n){if(t.Ra.set("Online"),e instanceof qm&&e.state===2&&e.cause)try{await(async function(i,s){const u=s.cause;for(const a of s.targetIds)i.Ia.has(a)&&(await i.remoteSyncer.rejectListen(a,u),i.Ia.delete(a),i.Va.removeTarget(a))})(t,e)}catch(r){X(Rr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await eo(t,r)}else if(e instanceof ku?t.Va.Ze(e):e instanceof Bm?t.Va.st(e):t.Va.tt(e),!n.isEqual(se.min()))try{const r=await Ym(t.localStore);n.compareTo(r)>=0&&await(function(s,u){const a=s.Va.Tt(u);return a.targetChanges.forEach(((c,l)=>{if(c.resumeToken.approximateByteSize()>0){const f=s.Ia.get(l);f&&s.Ia.set(l,f.withResumeToken(c.resumeToken,u))}})),a.targetMismatches.forEach(((c,l)=>{const f=s.Ia.get(c);if(!f)return;s.Ia.set(c,f.withResumeToken(Ye.EMPTY_BYTE_STRING,f.snapshotVersion)),ng(s,c);const p=new zn(f.target,c,l,f.sequenceNumber);pl(s,p)})),s.remoteSyncer.applyRemoteEvent(a)})(t,n)}catch(r){X(Rr,"Failed to raise snapshot:",r),await eo(t,r)}}async function eo(t,e,n){if(!wi(e))throw e;t.Ea.add(1),await Us(t),t.Ra.set("Offline"),n||(n=()=>Ym(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{X(Rr,"Retrying IndexedDB access"),await n(),t.Ea.delete(1),await Vo(t)}))}function ig(t,e){return e().catch((n=>eo(t,n,e)))}async function Oo(t){const e=oe(t),n=or(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Yc;for(;QT(e);)try{const i=await RT(e.localStore,r);if(i===null){e.Ta.length===0&&n.L_();break}r=i.batchId,JT(e,i)}catch(i){await eo(e,i)}sg(e)&&ug(e)}function QT(t){return Or(t)&&t.Ta.length<10}function JT(t,e){t.Ta.push(e);const n=or(t);n.O_()&&n.X_&&n.ea(e.mutations)}function sg(t){return Or(t)&&!or(t).x_()&&t.Ta.length>0}function ug(t){or(t).start()}async function XT(t){or(t).ra()}async function YT(t){const e=or(t);for(const n of t.Ta)e.ea(n.mutations)}async function ZT(t,e,n){const r=t.Ta.shift(),i=ul.from(r,e,n);await ig(t,(()=>t.remoteSyncer.applySuccessfulWrite(i))),await Oo(t)}async function eA(t,e){e&&or(t).X_&&await(async function(r,i){if((function(u){return Vv(u)&&u!==O.ABORTED})(i.code)){const s=r.Ta.shift();or(r).B_(),await ig(r,(()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i))),await Oo(r)}})(t,e),sg(t)&&ug(t)}async function Cd(t,e){const n=oe(t);n.asyncQueue.verifyOperationInProgress(),X(Rr,"RemoteStore received new credentials");const r=Or(n);n.Ea.add(3),await Us(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ea.delete(3),await Vo(n)}async function tA(t,e){const n=oe(t);e?(n.Ea.delete(2),await Vo(n)):e||(n.Ea.add(2),await Us(n),n.Ra.set("Unknown"))}function xi(t){return t.ma||(t.ma=(function(n,r,i){const s=oe(n);return s.sa(),new UT(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(t.datastore,t.asyncQueue,{Xo:HT.bind(null,t),t_:WT.bind(null,t),r_:GT.bind(null,t),H_:KT.bind(null,t)}),t.da.push((async e=>{e?(t.ma.B_(),gl(t)?ml(t):t.Ra.set("Unknown")):(await t.ma.stop(),rg(t))}))),t.ma}function or(t){return t.fa||(t.fa=(function(n,r,i){const s=oe(n);return s.sa(),new BT(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(t.datastore,t.asyncQueue,{Xo:()=>Promise.resolve(),t_:XT.bind(null,t),r_:eA.bind(null,t),ta:YT.bind(null,t),na:ZT.bind(null,t)}),t.da.push((async e=>{e?(t.fa.B_(),await Oo(t)):(await t.fa.stop(),t.Ta.length>0&&(X(Rr,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))}))),t.fa}/**
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
 */class _l{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Qn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((u=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const u=Date.now()+r,a=new _l(e,n,u,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new J(O.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function yl(t,e){if(vn("AsyncQueue",`${e}: ${t}`),wi(t))return new J(O.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class ii{static emptySet(e){return new ii(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||Z.comparator(n.key,r.key):(n,r)=>Z.comparator(n.key,r.key),this.keyedMap=Ki(),this.sortedSet=new Re(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((n,r)=>(e(n),!1)))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof ii)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((n=>{e.push(n.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new ii;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
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
 */class Sd{constructor(){this.ga=new Re(Z.comparator)}track(e){const n=e.doc.key,r=this.ga.get(n);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(n,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(n):e.type===1&&r.type===2?this.ga=this.ga.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):ne(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal(((n,r)=>{e.push(r)})),e}}class _i{constructor(e,n,r,i,s,u,a,c,l){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=u,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(e,n,r,i,s){const u=[];return n.forEach((a=>{u.push({type:0,doc:a})})),new _i(e,n,ii.emptySet(n),u,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ko(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
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
 */class nA{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class rA{constructor(){this.queries=kd(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,r){const i=oe(n),s=i.queries;i.queries=kd(),s.forEach(((u,a)=>{for(const c of a.Sa)c.onError(r)}))})(this,new J(O.ABORTED,"Firestore shutting down"))}}function kd(){return new Nr((t=>Cm(t)),ko)}async function og(t,e){const n=oe(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.ba()&&e.Da()&&(r=2):(s=new nA,r=e.Da()?0:1);try{switch(r){case 0:s.wa=await n.onListen(i,!0);break;case 1:s.wa=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(u){const a=yl(u,`Initialization of query '${Gr(e.query)}' failed`);return void e.onError(a)}n.queries.set(i,s),s.Sa.push(e),e.va(n.onlineState),s.wa&&e.Fa(s.wa)&&bl(n)}async function ag(t,e){const n=oe(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const u=s.Sa.indexOf(e);u>=0&&(s.Sa.splice(u,1),s.Sa.length===0?i=e.Da()?0:1:!s.ba()&&e.Da()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function iA(t,e){const n=oe(t);let r=!1;for(const i of e){const s=i.query,u=n.queries.get(s);if(u){for(const a of u.Sa)a.Fa(i)&&(r=!0);u.wa=i}}r&&bl(n)}function sA(t,e,n){const r=oe(t),i=r.queries.get(e);if(i)for(const s of i.Sa)s.onError(n);r.queries.delete(e)}function bl(t){t.Ca.forEach((e=>{e.next()}))}var pc,Rd;(Rd=pc||(pc={})).Ma="default",Rd.Cache="cache";class cg{constructor(e,n,r){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new _i(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const r=n!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=_i.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==pc.Cache}}/**
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
 */class lg{constructor(e){this.key=e}}class hg{constructor(e){this.key=e}}class uA{constructor(e,n){this.query=e,this.Ya=n,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=de(),this.mutatedKeys=de(),this.eu=Sm(e),this.tu=new ii(this.eu)}get nu(){return this.Ya}ru(e,n){const r=n?n.iu:new Sd,i=n?n.tu:this.tu;let s=n?n.mutatedKeys:this.mutatedKeys,u=i,a=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,l=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal(((f,p)=>{const g=i.get(f),_=Ro(this.query,p)?p:null,b=!!g&&this.mutatedKeys.has(g.key),R=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let N=!1;g&&_?g.data.isEqual(_.data)?b!==R&&(r.track({type:3,doc:_}),N=!0):this.su(g,_)||(r.track({type:2,doc:_}),N=!0,(c&&this.eu(_,c)>0||l&&this.eu(_,l)<0)&&(a=!0)):!g&&_?(r.track({type:0,doc:_}),N=!0):g&&!_&&(r.track({type:1,doc:g}),N=!0,(c||l)&&(a=!0)),N&&(_?(u=u.add(_),s=R?s.add(f):s.delete(f)):(u=u.delete(f),s=s.delete(f)))})),this.query.limit!==null)for(;u.size>this.query.limit;){const f=this.query.limitType==="F"?u.last():u.first();u=u.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{tu:u,iu:r,Cs:a,mutatedKeys:s}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const u=e.iu.ya();u.sort(((f,p)=>(function(_,b){const R=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ne(20277,{Rt:N})}};return R(_)-R(b)})(f.type,p.type)||this.eu(f.doc,p.doc))),this.ou(r),i=i??!1;const a=n&&!i?this._u():[],c=this.Xa.size===0&&this.current&&!i?1:0,l=c!==this.Za;return this.Za=c,u.length!==0||l?{snapshot:new _i(this.query,e.tu,s,u,e.mutatedKeys,c===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:a}:{au:a}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Sd,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((n=>this.Ya=this.Ya.add(n))),e.modifiedDocuments.forEach((n=>{})),e.removedDocuments.forEach((n=>this.Ya=this.Ya.delete(n))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=de(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const n=[];return e.forEach((r=>{this.Xa.has(r)||n.push(new hg(r))})),this.Xa.forEach((r=>{e.has(r)||n.push(new lg(r))})),n}cu(e){this.Ya=e.Qs,this.Xa=de();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return _i.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const El="SyncEngine";class oA{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class aA{constructor(e){this.key=e,this.hu=!1}}class cA{constructor(e,n,r,i,s,u){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=u,this.Pu={},this.Tu=new Nr((a=>Cm(a)),ko),this.Iu=new Map,this.Eu=new Set,this.du=new Re(Z.comparator),this.Au=new Map,this.Ru=new cl,this.Vu={},this.mu=new Map,this.fu=gi.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function lA(t,e,n=!0){const r=_g(t);let i;const s=r.Tu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await fg(r,e,n,!0),i}async function hA(t,e){const n=_g(t);await fg(n,e,!0,!1)}async function fg(t,e,n,r){const i=await DT(t.localStore,Gt(e)),s=i.targetId,u=t.sharedClientState.addLocalQueryTarget(s,n);let a;return r&&(a=await fA(t,e,s,u==="current",i.resumeToken)),t.isPrimaryClient&&n&&tg(t.remoteStore,i),a}async function fA(t,e,n,r,i){t.pu=(p,g,_)=>(async function(R,N,B,V){let P=N.view.ru(B);P.Cs&&(P=await Td(R.localStore,N.query,!1).then((({documents:A})=>N.view.ru(A,P))));const k=V&&V.targetChanges.get(N.targetId),q=V&&V.targetMismatches.get(N.targetId)!=null,Q=N.view.applyChanges(P,R.isPrimaryClient,k,q);return Pd(R,N.targetId,Q.au),Q.snapshot})(t,p,g,_);const s=await Td(t.localStore,e,!0),u=new uA(e,s.Qs),a=u.ru(s.documents),c=Ls.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),l=u.applyChanges(a,t.isPrimaryClient,c);Pd(t,n,l.au);const f=new oA(e,n,u);return t.Tu.set(e,f),t.Iu.has(n)?t.Iu.get(n).push(e):t.Iu.set(n,[e]),l.snapshot}async function dA(t,e,n){const r=oe(t),i=r.Tu.get(e),s=r.Iu.get(i.targetId);if(s.length>1)return r.Iu.set(i.targetId,s.filter((u=>!ko(u,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await fc(r.localStore,i.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(i.targetId),n&&dl(r.remoteStore,i.targetId),mc(r,i.targetId)})).catch(Ai)):(mc(r,i.targetId),await fc(r.localStore,i.targetId,!0))}async function pA(t,e){const n=oe(t),r=n.Tu.get(e),i=n.Iu.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),dl(n.remoteStore,r.targetId))}async function mA(t,e,n){const r=TA(t);try{const i=await(function(u,a){const c=oe(u),l=Se.now(),f=a.reduce(((_,b)=>_.add(b.key)),de());let p,g;return c.persistence.runTransaction("Locally write mutations","readwrite",(_=>{let b=Tn(),R=de();return c.Ns.getEntries(_,f).next((N=>{b=N,b.forEach(((B,V)=>{V.isValidDocument()||(R=R.add(B))}))})).next((()=>c.localDocuments.getOverlayedDocuments(_,b))).next((N=>{p=N;const B=[];for(const V of a){const P=Rv(V,p.get(V.key).overlayedDocument);P!=null&&B.push(new Vr(V.key,P,bm(P.value.mapValue),Kt.exists(!0)))}return c.mutationQueue.addMutationBatch(_,l,B,a)})).next((N=>{g=N;const B=N.applyToLocalDocumentSet(p,R);return c.documentOverlayCache.saveOverlays(_,N.batchId,B)}))})).then((()=>({batchId:g.batchId,changes:Rm(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),(function(u,a,c){let l=u.Vu[u.currentUser.toKey()];l||(l=new Re(fe)),l=l.insert(a,c),u.Vu[u.currentUser.toKey()]=l})(r,i.batchId,n),await Bs(r,i.changes),await Oo(r.remoteStore)}catch(i){const s=yl(i,"Failed to persist write");n.reject(s)}}async function dg(t,e){const n=oe(t);try{const r=await ST(n.localStore,e);e.targetChanges.forEach(((i,s)=>{const u=n.Au.get(s);u&&(Ee(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?u.hu=!0:i.modifiedDocuments.size>0?Ee(u.hu,14607):i.removedDocuments.size>0&&(Ee(u.hu,42227),u.hu=!1))})),await Bs(n,r,e)}catch(r){await Ai(r)}}function Dd(t,e,n){const r=oe(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Tu.forEach(((s,u)=>{const a=u.view.va(e);a.snapshot&&i.push(a.snapshot)})),(function(u,a){const c=oe(u);c.onlineState=a;let l=!1;c.queries.forEach(((f,p)=>{for(const g of p.Sa)g.va(a)&&(l=!0)})),l&&bl(c)})(r.eventManager,e),i.length&&r.Pu.H_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function gA(t,e,n){const r=oe(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Au.get(e),s=i&&i.key;if(s){let u=new Re(Z.comparator);u=u.insert(s,ut.newNoDocument(s,se.min()));const a=de().add(s),c=new Fo(se.min(),new Map,new Re(fe),u,a);await dg(r,c),r.du=r.du.remove(s),r.Au.delete(e),vl(r)}else await fc(r.localStore,e,!1).then((()=>mc(r,e,n))).catch(Ai)}async function _A(t,e){const n=oe(t),r=e.batch.batchId;try{const i=await CT(n.localStore,e);mg(n,r,null),pg(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Bs(n,i)}catch(i){await Ai(i)}}async function yA(t,e,n){const r=oe(t);try{const i=await(function(u,a){const c=oe(u);return c.persistence.runTransaction("Reject batch","readwrite-primary",(l=>{let f;return c.mutationQueue.lookupMutationBatch(l,a).next((p=>(Ee(p!==null,37113),f=p.keys(),c.mutationQueue.removeMutationBatch(l,p)))).next((()=>c.mutationQueue.performConsistencyCheck(l))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(l,f,a))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,f))).next((()=>c.localDocuments.getDocuments(l,f)))}))})(r.localStore,e);mg(r,e,n),pg(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Bs(r,i)}catch(i){await Ai(i)}}function pg(t,e){(t.mu.get(e)||[]).forEach((n=>{n.resolve()})),t.mu.delete(e)}function mg(t,e,n){const r=oe(t);let i=r.Vu[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Vu[r.currentUser.toKey()]=i}}function mc(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Iu.get(e))t.Tu.delete(r),n&&t.Pu.yu(r,n);t.Iu.delete(e),t.isPrimaryClient&&t.Ru.jr(e).forEach((r=>{t.Ru.containsKey(r)||gg(t,r)}))}function gg(t,e){t.Eu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(dl(t.remoteStore,n),t.du=t.du.remove(e),t.Au.delete(n),vl(t))}function Pd(t,e,n){for(const r of n)r instanceof lg?(t.Ru.addReference(r.key,e),bA(t,r)):r instanceof hg?(X(El,"Document no longer in limbo: "+r.key),t.Ru.removeReference(r.key,e),t.Ru.containsKey(r.key)||gg(t,r.key)):ne(19791,{wu:r})}function bA(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Eu.has(r)||(X(El,"New document in limbo: "+n),t.Eu.add(r),vl(t))}function vl(t){for(;t.Eu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Eu.values().next().value;t.Eu.delete(e);const n=new Z(Ie.fromString(e)),r=t.fu.next();t.Au.set(r,new aA(n)),t.du=t.du.insert(n,r),tg(t.remoteStore,new zn(Gt(rl(n.path)),r,"TargetPurposeLimboResolution",xo.ce))}}async function Bs(t,e,n){const r=oe(t),i=[],s=[],u=[];r.Tu.isEmpty()||(r.Tu.forEach(((a,c)=>{u.push(r.pu(c,e,n).then((l=>{if((l||n)&&r.isPrimaryClient){const f=l?!l.fromCache:n?.targetChanges.get(c.targetId)?.current;r.sharedClientState.updateQueryState(c.targetId,f?"current":"not-current")}if(l){i.push(l);const f=hl.As(c.targetId,l);s.push(f)}})))})),await Promise.all(u),r.Pu.H_(i),await(async function(c,l){const f=oe(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>M.forEach(l,(g=>M.forEach(g.Es,(_=>f.persistence.referenceDelegate.addReference(p,g.targetId,_))).next((()=>M.forEach(g.ds,(_=>f.persistence.referenceDelegate.removeReference(p,g.targetId,_)))))))))}catch(p){if(!wi(p))throw p;X(fl,"Failed to update sequence numbers: "+p)}for(const p of l){const g=p.targetId;if(!p.fromCache){const _=f.Ms.get(g),b=_.snapshotVersion,R=_.withLastLimboFreeSnapshotVersion(b);f.Ms=f.Ms.insert(g,R)}}})(r.localStore,s))}async function EA(t,e){const n=oe(t);if(!n.currentUser.isEqual(e)){X(El,"User change. New user:",e.toKey());const r=await Xm(n.localStore,e);n.currentUser=e,(function(s,u){s.mu.forEach((a=>{a.forEach((c=>{c.reject(new J(O.CANCELLED,u))}))})),s.mu.clear()})(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Bs(n,r.Ls)}}function vA(t,e){const n=oe(t),r=n.Au.get(e);if(r&&r.hu)return de().add(r.key);{let i=de();const s=n.Iu.get(e);if(!s)return i;for(const u of s){const a=n.Tu.get(u);i=i.unionWith(a.view.nu)}return i}}function _g(t){const e=oe(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=dg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=vA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=gA.bind(null,e),e.Pu.H_=iA.bind(null,e.eventManager),e.Pu.yu=sA.bind(null,e.eventManager),e}function TA(t){const e=oe(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=_A.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=yA.bind(null,e),e}class to{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=No(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return xT(this.persistence,new AT,e.initialUser,this.serializer)}Cu(e){return new Jm(ll.mi,this.serializer)}Du(e){return new FT}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}to.provider={build:()=>new to};class AA extends to{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){Ee(this.persistence.referenceDelegate instanceof Zu,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new aT(r,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?gt.withCacheSize(this.cacheSizeBytes):gt.DEFAULT;return new Jm((r=>Zu.mi(r,n)),this.serializer)}}class gc{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Dd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=EA.bind(null,this.syncEngine),await tA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new rA})()}createDatastore(e){const n=No(e.databaseInfo.databaseId),r=(function(s){return new LT(s)})(e.databaseInfo);return(function(s,u,a,c){return new jT(s,u,a,c)})(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return(function(r,i,s,u,a){return new $T(r,i,s,u,a)})(this.localStore,this.datastore,e.asyncQueue,(n=>Dd(this.syncEngine,n,0)),(function(){return Id.v()?new Id:new NT})())}createSyncEngine(e,n){return(function(i,s,u,a,c,l,f){const p=new cA(i,s,u,a,c,l);return f&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){await(async function(n){const r=oe(n);X(Rr,"RemoteStore shutting down."),r.Ea.add(5),await Us(r),r.Aa.shutdown(),r.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}gc.provider={build:()=>new gc};/**
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
 */class yg{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):vn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout((()=>{this.muted||e(n)}),0)}}/**
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
 */const ar="FirestoreClient";class wA{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=it.UNAUTHENTICATED,this.clientId=Xc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,(async u=>{X(ar,"Received user=",u.uid),await this.authCredentialListener(u),this.user=u})),this.appCheckCredentials.start(r,(u=>(X(ar,"Received new app check token=",u),this.appCheckCredentialListener(u,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Qn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=yl(n,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Ra(t,e){t.asyncQueue.verifyOperationInProgress(),X(ar,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((async i=>{r.isEqual(i)||(await Xm(e.localStore,i),r=i)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t._offlineComponents=e}async function Fd(t,e){t.asyncQueue.verifyOperationInProgress();const n=await IA(t);X(ar,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener((r=>Cd(e.remoteStore,r))),t.setAppCheckTokenChangeListener(((r,i)=>Cd(e.remoteStore,i))),t._onlineComponents=e}async function IA(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){X(ar,"Using user provided OfflineComponentProvider");try{await Ra(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!(function(i){return i.name==="FirebaseError"?i.code===O.FAILED_PRECONDITION||i.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(n))throw n;fi("Error using user provided cache. Falling back to memory cache: "+n),await Ra(t,new to)}}else X(ar,"Using default OfflineComponentProvider"),await Ra(t,new AA(void 0));return t._offlineComponents}async function bg(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(X(ar,"Using user provided OnlineComponentProvider"),await Fd(t,t._uninitializedComponentsProvider._online)):(X(ar,"Using default OnlineComponentProvider"),await Fd(t,new gc))),t._onlineComponents}function xA(t){return bg(t).then((e=>e.syncEngine))}async function _c(t){const e=await bg(t),n=e.eventManager;return n.onListen=lA.bind(null,e.syncEngine),n.onUnlisten=dA.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=hA.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=pA.bind(null,e.syncEngine),n}function CA(t,e,n={}){const r=new Qn;return t.asyncQueue.enqueueAndForget((async()=>(function(s,u,a,c,l){const f=new yg({next:g=>{f.Nu(),u.enqueueAndForget((()=>ag(s,p))),g.fromCache&&c.source==="server"?l.reject(new J(O.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(g)},error:g=>l.reject(g)}),p=new cg(a,f,{includeMetadataChanges:!0,qa:!0});return og(s,p)})(await _c(t),t.asyncQueue,e,n,r))),r.promise}/**
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
 */function Eg(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const Nd=new Map;/**
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
 */const vg="firestore.googleapis.com",Vd=!0;class Od{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new J(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=vg,this.ssl=Vd}else this.host=e.host,this.ssl=e.ssl??Vd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Qm;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<uT)throw new J(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}z6("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Eg(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new J(O.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new J(O.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new J(O.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,i){return r.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Mo{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Od({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new J(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new J(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Od(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new F6;switch(r.type){case"firstParty":return new M6(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new J(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(n){const r=Nd.get(n);r&&(X("ComponentProvider","Removing Datastore"),Nd.delete(n),r.terminate())})(this),Promise.resolve()}}function SA(t,e,n,r={}){t=Jn(t,Mo);const i=Ei(e),s=t._getSettings(),u={...s,emulatorOptions:t._getEmulatorOptions()},a=`${e}:${n}`;i&&(Wp(`https://${a}`),Gp("Firestore",!0)),s.host!==vg&&s.host!==a&&fi("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...s,host:a,ssl:i,emulatorOptions:r};if(!Cr(c,u)&&(t._setSettings(c),r.mockUserToken)){let l,f;if(typeof r.mockUserToken=="string")l=r.mockUserToken,f=it.MOCK_USER;else{l=i3(r.mockUserToken,t._app?.options.projectId);const p=r.mockUserToken.sub||r.mockUserToken.user_id;if(!p)throw new J(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new it(p)}t._authCredentials=new N6(new om(l,f))}}/**
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
 */class hr{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new hr(this.firestore,e,this._query)}}class Be{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Xn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Be(this.firestore,e,this._key)}toJSON(){return{type:Be._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(Os(n,Be._jsonSchema))return new Be(e,r||null,new Z(Ie.fromString(n.referencePath)))}}Be._jsonSchemaVersion="firestore/documentReference/1.0",Be._jsonSchema={type:Ve("string",Be._jsonSchemaVersion),referencePath:Ve("string")};class Xn extends hr{constructor(e,n,r){super(e,n,rl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Be(this.firestore,null,new Z(e))}withConverter(e){return new Xn(this.firestore,e,this._path)}}function kA(t,e,...n){if(t=yt(t),am("collection","path",e),t instanceof Mo){const r=Ie.fromString(e,...n);return Qf(r),new Xn(t,null,r)}{if(!(t instanceof Be||t instanceof Xn))throw new J(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ie.fromString(e,...n));return Qf(r),new Xn(t.firestore,null,r)}}function Tg(t,e,...n){if(t=yt(t),arguments.length===1&&(e=Xc.newId()),am("doc","path",e),t instanceof Mo){const r=Ie.fromString(e,...n);return Kf(r),new Be(t,null,new Z(r))}{if(!(t instanceof Be||t instanceof Xn))throw new J(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ie.fromString(e,...n));return Kf(r),new Be(t.firestore,t instanceof Xn?t.converter:null,new Z(r))}}/**
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
 */const Md="AsyncQueue";class Ld{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Zm(this,"async_queue_retry"),this._c=()=>{const r=ka();r&&X(Md,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const n=ka();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=ka();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const n=new Qn;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise))).then((()=>n.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!wi(e))throw e;X(Md,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const n=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,vn("INTERNAL UNHANDLED ERROR: ",Ud(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=n,n}enqueueAfterDelay(e,n,r){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const i=_l.createAndSchedule(this,e,n,r,(s=>this.hc(s)));return this.tc.push(i),i}uc(){this.nc&&ne(47125,{Pc:Ud(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((n,r)=>n.targetTimeMs-r.targetTimeMs));for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function Ud(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
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
 */function Bd(t){return(function(n,r){if(typeof n!="object"||n===null)return!1;const i=n;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1})(t,["next","error","complete"])}class yi extends Mo{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new Ld,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Ld(e),this._firestoreClient=void 0,await e}}}function RA(t,e){const n=typeof t=="object"?t:Xp(),r=typeof t=="string"?t:Ku,i=Qc(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=n3("firestore");s&&SA(i,...s)}return i}function Tl(t){if(t._terminated)throw new J(O.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||DA(t),t._firestoreClient}function DA(t){const e=t._freezeSettings(),n=(function(i,s,u,a){return new ev(i,s,u,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,Eg(a.experimentalLongPollingOptions),a.useFetchStreams,a.isUsingEmulator)})(t._databaseId,t._app?.options.appId||"",t._persistenceKey,e);t._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new wA(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&(function(i){const s=i?._online.build();return{_offline:i?._offline.build(s),_online:s}})(t._componentsProvider))}/**
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
 */class xt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new xt(Ye.fromBase64String(e))}catch(n){throw new J(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new xt(Ye.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:xt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Os(e,xt._jsonSchema))return xt.fromBase64String(e.bytes)}}xt._jsonSchemaVersion="firestore/bytes/1.0",xt._jsonSchema={type:Ve("string",xt._jsonSchemaVersion),bytes:Ve("string")};/**
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
 */class Al{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new J(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Xe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class wl{constructor(e){this._methodName=e}}/**
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
 */class Jt{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new J(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new J(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return fe(this._lat,e._lat)||fe(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Jt._jsonSchemaVersion}}static fromJSON(e){if(Os(e,Jt._jsonSchema))return new Jt(e.latitude,e.longitude)}}Jt._jsonSchemaVersion="firestore/geoPoint/1.0",Jt._jsonSchema={type:Ve("string",Jt._jsonSchemaVersion),latitude:Ve("number"),longitude:Ve("number")};/**
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
 */class Xt{constructor(e){this._values=(e||[]).map((n=>n))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Xt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Os(e,Xt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((n=>typeof n=="number")))return new Xt(e.vectorValues);throw new J(O.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Xt._jsonSchemaVersion="firestore/vectorValue/1.0",Xt._jsonSchema={type:Ve("string",Xt._jsonSchemaVersion),vectorValues:Ve("object")};/**
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
 */const PA=/^__.*__$/;class FA{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Vr(e,this.data,this.fieldMask,n,this.fieldTransforms):new Ms(e,this.data,n,this.fieldTransforms)}}function Ag(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ne(40011,{Ac:t})}}class Il{constructor(e,n,r,i,s,u){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Rc(),this.fieldTransforms=s||[],this.fieldMask=u||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Il({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const n=this.path?.child(e),r=this.Vc({path:n,fc:!1});return r.gc(e),r}yc(e){const n=this.path?.child(e),r=this.Vc({path:n,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return no(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((n=>e.isPrefixOf(n)))!==void 0||this.fieldTransforms.find((n=>e.isPrefixOf(n.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Ag(this.Ac)&&PA.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class NA{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||No(e)}Cc(e,n,r,i=!1){return new Il({Ac:e,methodName:n,Dc:r,path:Xe.emptyPath(),fc:!1,bc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function wg(t){const e=t._freezeSettings(),n=No(t._databaseId);return new NA(t._databaseId,!!e.ignoreUndefinedProperties,n)}function VA(t,e,n,r,i,s={}){const u=t.Cc(s.merge||s.mergeFields?2:0,e,n,i);Cg("Data must be an object, but it was:",u,r);const a=Ig(r,u);let c,l;if(s.merge)c=new Nt(u.fieldMask),l=u.fieldTransforms;else if(s.mergeFields){const f=[];for(const p of s.mergeFields){const g=MA(e,p,n);if(!u.contains(g))throw new J(O.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);UA(f,g)||f.push(g)}c=new Nt(f),l=u.fieldTransforms.filter((p=>c.covers(p.field)))}else c=null,l=u.fieldTransforms;return new FA(new It(a),c,l)}class xl extends wl{_toFieldTransform(e){return new xv(e.path,new Is)}isEqual(e){return e instanceof xl}}function OA(t,e,n,r=!1){return Cl(n,t.Cc(r?4:3,e))}function Cl(t,e){if(xg(t=yt(t)))return Cg("Unsupported field value:",e,t),Ig(t,e);if(t instanceof wl)return(function(r,i){if(!Ag(i.Ac))throw i.Sc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Sc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return(function(r,i){const s=[];let u=0;for(const a of r){let c=Cl(a,i.wc(u));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),u++}return{arrayValue:{values:s}}})(t,e)}return(function(r,i){if((r=yt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Av(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Se.fromDate(r);return{timestampValue:Yu(i.serializer,s)}}if(r instanceof Se){const s=new Se(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Yu(i.serializer,s)}}if(r instanceof Jt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof xt)return{bytesValue:jm(i.serializer,r._byteString)};if(r instanceof Be){const s=i.databaseId,u=r.firestore._databaseId;if(!u.isEqual(s))throw i.Sc(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:al(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Xt)return(function(u,a){return{mapValue:{fields:{[_m]:{stringValue:ym},[Qu]:{arrayValue:{values:u.toArray().map((l=>{if(typeof l!="number")throw a.Sc("VectorValues must only contain numeric values.");return il(a.serializer,l)}))}}}}}})(r,i);throw i.Sc(`Unsupported field value: ${Io(r)}`)})(t,e)}function Ig(t,e){const n={};return hm(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Fr(t,((r,i)=>{const s=Cl(i,e.mc(r));s!=null&&(n[r]=s)})),{mapValue:{fields:n}}}function xg(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Se||t instanceof Jt||t instanceof xt||t instanceof Be||t instanceof wl||t instanceof Xt)}function Cg(t,e,n){if(!xg(n)||!cm(n)){const r=Io(n);throw r==="an object"?e.Sc(t+" a custom object"):e.Sc(t+" "+r)}}function MA(t,e,n){if((e=yt(e))instanceof Al)return e._internalPath;if(typeof e=="string")return Sg(t,e);throw no("Field path arguments must be of type string or ",t,!1,void 0,n)}const LA=new RegExp("[~\\*/\\[\\]]");function Sg(t,e,n){if(e.search(LA)>=0)throw no(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Al(...e.split("."))._internalPath}catch{throw no(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function no(t,e,n,r,i){const s=r&&!r.isEmpty(),u=i!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||u)&&(c+=" (found",s&&(c+=` in field ${r}`),u&&(c+=` in document ${i}`),c+=")"),new J(O.INVALID_ARGUMENT,a+t+c)}function UA(t,e){return t.some((n=>n.isEqual(e)))}/**
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
 */class kg{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Be(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new BA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Sl("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class BA extends kg{data(){return super.data()}}function Sl(t,e){return typeof e=="string"?Sg(t,e):e instanceof Al?e._internalPath:e._delegate._internalPath}/**
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
 */function Rg(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new J(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class kl{}class Dg extends kl{}function qA(t,e,...n){let r=[];e instanceof kl&&r.push(e),r=r.concat(n),(function(s){const u=s.filter((c=>c instanceof Dl)).length,a=s.filter((c=>c instanceof Rl)).length;if(u>1||u>0&&a>0)throw new J(O.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const i of r)t=i._apply(t);return t}class Rl extends Dg{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new Rl(e,n,r)}_apply(e){const n=this._parse(e);return Pg(e._query,n),new hr(e.firestore,e.converter,uc(e._query,n))}_parse(e){const n=wg(e.firestore);return(function(s,u,a,c,l,f,p){let g;if(l.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new J(O.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){jd(p,f);const b=[];for(const R of p)b.push(qd(c,s,R));g={arrayValue:{values:b}}}else g=qd(c,s,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||jd(p,f),g=OA(a,u,p,f==="in"||f==="not-in");return Ne.create(l,f,g)})(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}class Dl extends kl{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Dl(e,n)}_parse(e){const n=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return n.length===1?n[0]:Mt.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:((function(i,s){let u=i;const a=s.getFlattenedFilters();for(const c of a)Pg(u,c),u=uc(u,c)})(e._query,n),new hr(e.firestore,e.converter,uc(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Pl extends Dg{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new Pl(e,n)}_apply(e){const n=(function(i,s,u){if(i.startAt!==null)throw new J(O.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new J(O.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ws(s,u)})(e._query,this._field,this._direction);return new hr(e.firestore,e.converter,(function(i,s){const u=i.explicitOrderBy.concat([s]);return new Ii(i.path,i.collectionGroup,u,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)})(e._query,n))}}function jA(t,e="asc"){const n=e,r=Sl("orderBy",t);return Pl._create(r,n)}function qd(t,e,n){if(typeof(n=yt(n))=="string"){if(n==="")throw new J(O.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!xm(e)&&n.indexOf("/")!==-1)throw new J(O.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Ie.fromString(n));if(!Z.isDocumentKey(r))throw new J(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return rd(t,new Z(r))}if(n instanceof Be)return rd(t,n._key);throw new J(O.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Io(n)}.`)}function jd(t,e){if(!Array.isArray(t)||t.length===0)throw new J(O.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Pg(t,e){const n=(function(i,s){for(const u of i)for(const a of u.getFlattenedFilters())if(s.indexOf(a.op)>=0)return a.op;return null})(t.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(n!==null)throw n===e.op?new J(O.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new J(O.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class zA{convertValue(e,n="none"){switch(ur(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Pe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(sr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw ne(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Fr(e,((i,s)=>{r[i]=this.convertValue(s,n)})),r}convertVectorValue(e){const n=e.fields?.[Qu].arrayValue?.values?.map((r=>Pe(r.doubleValue)));return new Xt(n)}convertGeoPoint(e){return new Jt(Pe(e.latitude),Pe(e.longitude))}convertArray(e,n){return(e.values||[]).map((r=>this.convertValue(r,n)))}convertServerTimestamp(e,n){switch(n){case"previous":const r=So(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(vs(e));default:return null}}convertTimestamp(e){const n=ir(e);return new Se(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Ie.fromString(e);Ee(Km(r),9688,{name:e});const i=new Ts(r.get(1),r.get(3)),s=new Z(r.popFirst(5));return i.isEqual(n)||vn(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
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
 */function $A(t,e,n){let r;return r=t?t.toFirestore(e):e,r}class Ji{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Ir extends kg{constructor(e,n,r,i,s,u){super(e,n,r,i,u),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Ru(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Sl("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new J(O.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=Ir._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}Ir._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ir._jsonSchema={type:Ve("string",Ir._jsonSchemaVersion),bundleSource:Ve("string","DocumentSnapshot"),bundleName:Ve("string"),bundle:Ve("string")};class Ru extends Ir{data(e={}){return super.data(e)}}class xr{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new Ji(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach((n=>e.push(n))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach((r=>{e.call(n,new Ru(this._firestore,this._userDataWriter,r.key,r,new Ji(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new J(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=(function(i,s){if(i._snapshot.oldDocs.isEmpty()){let u=0;return i._snapshot.docChanges.map((a=>{const c=new Ru(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Ji(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:u++}}))}{let u=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((a=>s||a.type!==3)).map((a=>{const c=new Ru(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Ji(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);let l=-1,f=-1;return a.type!==0&&(l=u.indexOf(a.doc.key),u=u.delete(a.doc.key)),a.type!==1&&(u=u.add(a.doc),f=u.indexOf(a.doc.key)),{type:HA(a.type),doc:c,oldIndex:l,newIndex:f}}))}})(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new J(O.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=xr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Xc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],i=[];return this.docs.forEach((s=>{s._document!==null&&(n.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function HA(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ne(61501,{type:t})}}xr._jsonSchemaVersion="firestore/querySnapshot/1.0",xr._jsonSchema={type:Ve("string",xr._jsonSchemaVersion),bundleSource:Ve("string","QuerySnapshot"),bundleName:Ve("string"),bundle:Ve("string")};class Fl extends zA{constructor(e){super(),this.firestore=e}convertBytes(e){return new xt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Be(this.firestore,null,n)}}function WA(t){t=Jn(t,hr);const e=Jn(t.firestore,yi),n=Tl(e),r=new Fl(e);return Rg(t._query),CA(n,t._query).then((i=>new xr(e,r,t,i)))}function zd(t){return Fg(Jn(t.firestore,yi),[new sl(t._key,Kt.none())])}function GA(t,e){const n=Jn(t.firestore,yi),r=Tg(t),i=$A(t.converter,e);return Fg(n,[VA(wg(t.firestore),"addDoc",r._key,i,t.converter!==null,{}).toMutation(r._key,Kt.exists(!1))]).then((()=>r))}function KA(t,...e){t=yt(t);let n={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Bd(e[r])||(n=e[r++]);const i={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(Bd(e[r])){const c=e[r];e[r]=c.next?.bind(c),e[r+1]=c.error?.bind(c),e[r+2]=c.complete?.bind(c)}let s,u,a;if(t instanceof Be)u=Jn(t.firestore,yi),a=rl(t._key.path),s={next:c=>{e[r]&&e[r](QA(u,t,c))},error:e[r+1],complete:e[r+2]};else{const c=Jn(t,hr);u=Jn(c.firestore,yi),a=c._query;const l=new Fl(u);s={next:f=>{e[r]&&e[r](new xr(u,l,c,f))},error:e[r+1],complete:e[r+2]},Rg(t._query)}return(function(l,f,p,g){const _=new yg(g),b=new cg(f,_,p);return l.asyncQueue.enqueueAndForget((async()=>og(await _c(l),b))),()=>{_.Nu(),l.asyncQueue.enqueueAndForget((async()=>ag(await _c(l),b)))}})(Tl(u),a,i,s)}function Fg(t,e){return(function(r,i){const s=new Qn;return r.asyncQueue.enqueueAndForget((async()=>mA(await xA(r),i,s))),s.promise})(Tl(t),e)}function QA(t,e,n){const r=n.docs.get(e._key),i=new Fl(t);return new Ir(t,i,e._key,r,new Ji(n.hasPendingWrites,n.fromCache),e.converter)}function JA(){return new xl("serverTimestamp")}(function(e,n=!0){(function(i){Ti=i})(vi),hi(new Sr("firestore",((r,{instanceIdentifier:i,options:s})=>{const u=r.getProvider("app").getImmediate(),a=new yi(new V6(r.getProvider("auth-internal")),new L6(u,r.getProvider("app-check-internal")),(function(l,f){if(!Object.prototype.hasOwnProperty.apply(l.options,["projectId"]))throw new J(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ts(l.options.projectId,f)})(u,i),u);return s={useFetchStreams:n,...s},a._setSettings(s),a}),"PUBLIC").setMultipleInstances(!0)),Gn($f,Hf,e),Gn($f,Hf,"esm2020")})();function Ng(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const XA=Ng,Vg=new Ns("auth","Firebase",Ng());/**
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
 */const ro=new Gc("@firebase/auth");function YA(t,...e){ro.logLevel<=he.WARN&&ro.warn(`Auth (${vi}): ${t}`,...e)}function Du(t,...e){ro.logLevel<=he.ERROR&&ro.error(`Auth (${vi}): ${t}`,...e)}/**
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
 */function An(t,...e){throw Nl(t,...e)}function Yt(t,...e){return Nl(t,...e)}function Og(t,e,n){const r={...XA(),[e]:n};return new Ns("auth","Firebase",r).create(e,{appName:t.name})}function Yn(t){return Og(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Nl(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Vg.create(t,...e)}function ie(t,e,...n){if(!t)throw Nl(e,...n)}function mn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Du(e),new Error(e)}function wn(t,e){t||mn(e)}/**
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
 */function yc(){return typeof self<"u"&&self.location?.href||""}function ZA(){return $d()==="http:"||$d()==="https:"}function $d(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function ew(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ZA()||l3()||"connection"in navigator)?navigator.onLine:!0}function tw(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class qs{constructor(e,n){this.shortDelay=e,this.longDelay=n,wn(n>e,"Short delay should be less than long delay!"),this.isMobile=o3()||h3()}get(){return ew()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Vl(t,e){wn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Mg{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;mn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;mn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;mn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const nw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const rw=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],iw=new qs(3e4,6e4);function Lo(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Ci(t,e,n,r,i={}){return Lg(t,i,async()=>{let s={},u={};r&&(e==="GET"?u=r:s={body:JSON.stringify(r)});const a=Vs({key:t.config.apiKey,...u}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...s};return c3()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&Ei(t.emulatorConfig.host)&&(l.credentials="include"),Mg.fetch()(await Bg(t,t.config.apiHost,n,a),l)})}async function Lg(t,e,n){t._canInitEmulator=!1;const r={...nw,...e};try{const i=new sw(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const u=await s.json();if("needConfirmation"in u)throw yu(t,"account-exists-with-different-credential",u);if(s.ok&&!("errorMessage"in u))return u;{const a=s.ok?u.errorMessage:u.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw yu(t,"credential-already-in-use",u);if(c==="EMAIL_EXISTS")throw yu(t,"email-already-in-use",u);if(c==="USER_DISABLED")throw yu(t,"user-disabled",u);const f=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Og(t,f,l);An(t,f)}}catch(i){if(i instanceof xn)throw i;An(t,"network-request-failed",{message:String(i)})}}async function Ug(t,e,n,r,i={}){const s=await Ci(t,e,n,r,i);return"mfaPendingCredential"in s&&An(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function Bg(t,e,n,r){const i=`${e}${n}?${r}`,s=t,u=s.config.emulator?Vl(t.config,i):`${t.config.apiScheme}://${i}`;return rw.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(u).toString():u}class sw{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Yt(this.auth,"network-request-failed")),iw.get())})}}function yu(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Yt(t,e,r);return i.customData._tokenResponse=n,i}/**
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
 */async function uw(t,e){return Ci(t,"POST","/v1/accounts:delete",e)}async function io(t,e){return Ci(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function cs(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ow(t,e=!1){const n=yt(t),r=await n.getIdToken(e),i=Ol(r);ie(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,u=s?.sign_in_provider;return{claims:i,token:r,authTime:cs(Da(i.auth_time)),issuedAtTime:cs(Da(i.iat)),expirationTime:cs(Da(i.exp)),signInProvider:u||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Da(t){return Number(t)*1e3}function Ol(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Du("JWT malformed, contained fewer than 3 sections"),null;try{const i=jp(n);return i?JSON.parse(i):(Du("Failed to decode base64 JWT payload"),null)}catch(i){return Du("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Hd(t){const e=Ol(t);return ie(e,"internal-error"),ie(typeof e.exp<"u","internal-error"),ie(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ss(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof xn&&aw(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function aw({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class cw{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class bc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=cs(this.lastLoginAt),this.creationTime=cs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function so(t){const e=t.auth,n=await t.getIdToken(),r=await Ss(t,io(e,{idToken:n}));ie(r?.users.length,e,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const s=i.providerUserInfo?.length?qg(i.providerUserInfo):[],u=hw(t.providerData,s),a=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!u?.length,l=a?c:!1,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:u,metadata:new bc(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(t,f)}async function lw(t){const e=yt(t);await so(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function hw(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function qg(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
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
 */async function fw(t,e){const n=await Lg(t,{},async()=>{const r=Vs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,u=await Bg(t,i,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:r};return t.emulatorConfig&&Ei(t.emulatorConfig.host)&&(c.credentials="include"),Mg.fetch()(u,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function dw(t,e){return Ci(t,"POST","/v2/accounts:revokeToken",Lo(t,e))}/**
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
 */class si{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ie(e.idToken,"internal-error"),ie(typeof e.idToken<"u","internal-error"),ie(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Hd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){ie(e.length!==0,"internal-error");const n=Hd(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(ie(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await fw(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,u=new si;return r&&(ie(typeof r=="string","internal-error",{appName:e}),u.refreshToken=r),i&&(ie(typeof i=="string","internal-error",{appName:e}),u.accessToken=i),s&&(ie(typeof s=="number","internal-error",{appName:e}),u.expirationTime=s),u}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new si,this.toJSON())}_performRefresh(){return mn("not implemented")}}/**
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
 */function Pn(t,e){ie(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Vt{constructor({uid:e,auth:n,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new cw(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new bc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Ss(this,this.stsTokenManager.getToken(this.auth,e));return ie(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return ow(this,e)}reload(){return lw(this)}_assign(e){this!==e&&(ie(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Vt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){ie(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await so(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ft(this.auth.app))return Promise.reject(Yn(this.auth));const e=await this.getIdToken();return await Ss(this,uw(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,i=n.email??void 0,s=n.phoneNumber??void 0,u=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,f=n.lastLoginAt??void 0,{uid:p,emailVerified:g,isAnonymous:_,providerData:b,stsTokenManager:R}=n;ie(p&&R,e,"internal-error");const N=si.fromJSON(this.name,R);ie(typeof p=="string",e,"internal-error"),Pn(r,e.name),Pn(i,e.name),ie(typeof g=="boolean",e,"internal-error"),ie(typeof _=="boolean",e,"internal-error"),Pn(s,e.name),Pn(u,e.name),Pn(a,e.name),Pn(c,e.name),Pn(l,e.name),Pn(f,e.name);const B=new Vt({uid:p,auth:e,email:i,emailVerified:g,displayName:r,isAnonymous:_,photoURL:u,phoneNumber:s,tenantId:a,stsTokenManager:N,createdAt:l,lastLoginAt:f});return b&&Array.isArray(b)&&(B.providerData=b.map(V=>({...V}))),c&&(B._redirectEventId=c),B}static async _fromIdTokenResponse(e,n,r=!1){const i=new si;i.updateFromServerResponse(n);const s=new Vt({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await so(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];ie(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?qg(i.providerUserInfo):[],u=!(i.email&&i.passwordHash)&&!s?.length,a=new si;a.updateFromIdToken(r);const c=new Vt({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:u}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new bc(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(c,l),c}}/**
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
 */const Wd=new Map;function gn(t){wn(t instanceof Function,"Expected a class definition");let e=Wd.get(t);return e?(wn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Wd.set(t,e),e)}/**
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
 */class jg{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}jg.type="NONE";const Gd=jg;/**
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
 */function Pu(t,e,n){return`firebase:${t}:${e}:${n}`}class ui{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Pu(this.userKey,i.apiKey,s),this.fullPersistenceKey=Pu("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await io(this.auth,{idToken:e}).catch(()=>{});return n?Vt._fromGetAccountInfoResponse(this.auth,n,e):null}return Vt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new ui(gn(Gd),e,r);const i=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||gn(Gd);const u=Pu(r,e.config.apiKey,e.name);let a=null;for(const l of n)try{const f=await l._get(u);if(f){let p;if(typeof f=="string"){const g=await io(e,{idToken:f}).catch(()=>{});if(!g)break;p=await Vt._fromGetAccountInfoResponse(e,g,f)}else p=Vt._fromJSON(e,f);l!==s&&(a=p),s=l;break}}catch{}const c=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new ui(s,e,r):(s=c[0],a&&await s._set(u,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==s)try{await l._remove(u)}catch{}})),new ui(s,e,r))}}/**
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
 */function Kd(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Wg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(zg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Kg(e))return"Blackberry";if(Qg(e))return"Webos";if($g(e))return"Safari";if((e.includes("chrome/")||Hg(e))&&!e.includes("edge/"))return"Chrome";if(Gg(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if(r?.length===2)return r[1]}return"Other"}function zg(t=at()){return/firefox\//i.test(t)}function $g(t=at()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Hg(t=at()){return/crios\//i.test(t)}function Wg(t=at()){return/iemobile/i.test(t)}function Gg(t=at()){return/android/i.test(t)}function Kg(t=at()){return/blackberry/i.test(t)}function Qg(t=at()){return/webos/i.test(t)}function Ml(t=at()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function pw(t=at()){return Ml(t)&&!!window.navigator?.standalone}function mw(){return f3()&&document.documentMode===10}function Jg(t=at()){return Ml(t)||Gg(t)||Qg(t)||Kg(t)||/windows phone/i.test(t)||Wg(t)}/**
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
 */function Xg(t,e=[]){let n;switch(t){case"Browser":n=Kd(at());break;case"Worker":n=`${Kd(at())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${vi}/${r}`}/**
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
 */class gw{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((u,a)=>{try{const c=e(s);u(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function _w(t,e={}){return Ci(t,"GET","/v2/passwordPolicy",Lo(t,e))}/**
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
 */const yw=6;class bw{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??yw,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class Ew{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Qd(this),this.idTokenSubscription=new Qd(this),this.beforeStateQueue=new gw(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Vg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=gn(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await ui.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await io(this,{idToken:e}),r=await Vt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ft(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(u,u))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,u=r?._redirectEventId,a=await this.tryRedirectSignIn(e);(!s||s===u)&&a?.user&&(r=a.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(s){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return ie(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await so(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=tw()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ft(this.app))return Promise.reject(Yn(this));const n=e?yt(e):null;return n&&ie(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&ie(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ft(this.app)?Promise.reject(Yn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ft(this.app)?Promise.reject(Yn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(gn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await _w(this),n=new bw(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ns("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await dw(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&gn(e)||this._popupRedirectResolver;ie(n,this,"argument-error"),this.redirectPersistenceManager=await ui.create(this,[gn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let u=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(ie(a,this,"internal-error"),a.then(()=>{u||s(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,i);return()=>{u=!0,c()}}else{const c=e.addObserver(n);return()=>{u=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ie(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Xg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Ft(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&YA(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Uo(t){return yt(t)}class Qd{constructor(e){this.auth=e,this.observer=null,this.addObserver=E3(n=>this.observer=n)}get next(){return ie(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Ll={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function vw(t){Ll=t}function Tw(t){return Ll.loadJS(t)}function Aw(){return Ll.gapiScript}function ww(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Iw(t,e){const n=Qc(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(Cr(s,e??{}))return i;An(i,"already-initialized")}return n.initialize({options:e})}function xw(t,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(gn);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}function Cw(t,e,n){const r=Uo(t);ie(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Yg(e),{host:u,port:a}=Sw(e),c=a===null?"":`:${a}`,l={url:`${s}//${u}${c}/`},f=Object.freeze({host:u,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){ie(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),ie(Cr(l,r.config.emulator)&&Cr(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Ei(u)?(Wp(`${s}//${u}${c}`),Gp("Auth",!0)):kw()}function Yg(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Sw(t){const e=Yg(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Jd(r.substr(s.length+1))}}else{const[s,u]=r.split(":");return{host:s,port:Jd(u)}}}function Jd(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function kw(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Zg{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return mn("not implemented")}_getIdTokenResponse(e){return mn("not implemented")}_linkToIdToken(e,n){return mn("not implemented")}_getReauthenticationResolver(e){return mn("not implemented")}}/**
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
 */async function oi(t,e){return Ug(t,"POST","/v1/accounts:signInWithIdp",Lo(t,e))}/**
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
 */const Rw="http://localhost";class Dr extends Zg{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Dr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):An("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=n;if(!r||!i)return null;const u=new Dr(r,i);return u.idToken=s.idToken||void 0,u.accessToken=s.accessToken||void 0,u.secret=s.secret,u.nonce=s.nonce,u.pendingToken=s.pendingToken||null,u}_getIdTokenResponse(e){const n=this.buildRequest();return oi(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,oi(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,oi(e,n)}buildRequest(){const e={requestUri:Rw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Vs(n)}return e}}/**
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
 */class e1{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class js extends e1{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Ln extends js{constructor(){super("facebook.com")}static credential(e){return Dr._fromParams({providerId:Ln.PROVIDER_ID,signInMethod:Ln.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ln.credentialFromTaggedObject(e)}static credentialFromError(e){return Ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ln.credential(e.oauthAccessToken)}catch{return null}}}Ln.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ln.PROVIDER_ID="facebook.com";/**
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
 */class Un extends js{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Dr._fromParams({providerId:Un.PROVIDER_ID,signInMethod:Un.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Un.credentialFromTaggedObject(e)}static credentialFromError(e){return Un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Un.credential(n,r)}catch{return null}}}Un.GOOGLE_SIGN_IN_METHOD="google.com";Un.PROVIDER_ID="google.com";/**
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
 */class Bn extends js{constructor(){super("github.com")}static credential(e){return Dr._fromParams({providerId:Bn.PROVIDER_ID,signInMethod:Bn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Bn.credentialFromTaggedObject(e)}static credentialFromError(e){return Bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Bn.credential(e.oauthAccessToken)}catch{return null}}}Bn.GITHUB_SIGN_IN_METHOD="github.com";Bn.PROVIDER_ID="github.com";/**
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
 */class qn extends js{constructor(){super("twitter.com")}static credential(e,n){return Dr._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return qn.credentialFromTaggedObject(e)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return qn.credential(n,r)}catch{return null}}}qn.TWITTER_SIGN_IN_METHOD="twitter.com";qn.PROVIDER_ID="twitter.com";/**
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
 */async function Dw(t,e){return Ug(t,"POST","/v1/accounts:signUp",Lo(t,e))}/**
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
 */class cr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Vt._fromIdTokenResponse(e,r,i),u=Xd(r);return new cr({user:s,providerId:u,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=Xd(r);return new cr({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function Xd(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */async function Pw(t){if(Ft(t.app))return Promise.reject(Yn(t));const e=Uo(t);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new cr({user:e.currentUser,providerId:null,operationType:"signIn"});const n=await Dw(e,{returnSecureToken:!0}),r=await cr._fromIdTokenResponse(e,"signIn",n,!0);return await e._updateCurrentUser(r.user),r}/**
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
 */class uo extends xn{constructor(e,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,uo.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new uo(e,n,r,i)}}function t1(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?uo._fromErrorAndOperation(t,s,e,r):s})}async function Fw(t,e,n=!1){const r=await Ss(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return cr._forOperation(t,"link",r)}/**
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
 */async function Nw(t,e,n=!1){const{auth:r}=t;if(Ft(r.app))return Promise.reject(Yn(r));const i="reauthenticate";try{const s=await Ss(t,t1(r,i,e,t),n);ie(s.idToken,r,"internal-error");const u=Ol(s.idToken);ie(u,r,"internal-error");const{sub:a}=u;return ie(t.uid===a,r,"user-mismatch"),cr._forOperation(t,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&An(r,"user-mismatch"),s}}/**
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
 */async function Vw(t,e,n=!1){if(Ft(t.app))return Promise.reject(Yn(t));const r="signIn",i=await t1(t,r,e),s=await cr._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}function Ow(t,e,n,r){return yt(t).onIdTokenChanged(e,n,r)}function Mw(t,e,n){return yt(t).beforeAuthStateChanged(e,n)}function Lw(t,e,n,r){return yt(t).onAuthStateChanged(e,n,r)}const oo="__sak";/**
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
 */class n1{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(oo,"1"),this.storage.removeItem(oo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Uw=1e3,Bw=10;class r1 extends n1{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Jg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((u,a,c)=>{this.notifyListeners(u,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const u=this.storage.getItem(r);!n&&this.localCache[r]===u||this.notifyListeners(r,u)},s=this.storage.getItem(r);mw()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Bw):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Uw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}r1.type="LOCAL";const qw=r1;/**
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
 */class i1 extends n1{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}i1.type="SESSION";const s1=i1;/**
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
 */function jw(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Bo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new Bo(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,u=this.handlersMap[i];if(!u?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(u).map(async l=>l(n.origin,s)),c=await jw(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Bo.receivers=[];/**
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
 */function Ul(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class zw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,u;return new Promise((a,c)=>{const l=Ul("",20);i.port1.start();const f=setTimeout(()=>{c(new Error("unsupported_event"))},r);u={messageChannel:i,onMessage(p){const g=p;if(g.data.eventId===l)switch(g.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(g.data.response);break;default:clearTimeout(f),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(u),i.port1.addEventListener("message",u.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[i.port2])}).finally(()=>{u&&this.removeMessageHandler(u)})}}/**
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
 */function Zt(){return window}function $w(t){Zt().location.href=t}/**
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
 */function u1(){return typeof Zt().WorkerGlobalScope<"u"&&typeof Zt().importScripts=="function"}async function Hw(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ww(){return navigator?.serviceWorker?.controller||null}function Gw(){return u1()?self:null}/**
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
 */const o1="firebaseLocalStorageDb",Kw=1,ao="firebaseLocalStorage",a1="fbase_key";class zs{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function qo(t,e){return t.transaction([ao],e?"readwrite":"readonly").objectStore(ao)}function Qw(){const t=indexedDB.deleteDatabase(o1);return new zs(t).toPromise()}function Ec(){const t=indexedDB.open(o1,Kw);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(ao,{keyPath:a1})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(ao)?e(r):(r.close(),await Qw(),e(await Ec()))})})}async function Yd(t,e,n){const r=qo(t,!0).put({[a1]:e,value:n});return new zs(r).toPromise()}async function Jw(t,e){const n=qo(t,!1).get(e),r=await new zs(n).toPromise();return r===void 0?null:r.value}function Zd(t,e){const n=qo(t,!0).delete(e);return new zs(n).toPromise()}const Xw=800,Yw=3;class c1{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ec(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Yw)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return u1()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Bo._getInstance(Gw()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Hw(),!this.activeServiceWorker)return;this.sender=new zw(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ww()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ec();return await Yd(e,oo,"1"),await Zd(e,oo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Yd(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Jw(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Zd(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=qo(i,!1).getAll();return new zs(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Xw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}c1.type="LOCAL";const Zw=c1;new qs(3e4,6e4);/**
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
 */function eI(t,e){return e?gn(e):(ie(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Bl extends Zg{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return oi(e,this._buildIdpRequest())}_linkToIdToken(e,n){return oi(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return oi(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function tI(t){return Vw(t.auth,new Bl(t),t.bypassAuthState)}function nI(t){const{auth:e,user:n}=t;return ie(n,e,"internal-error"),Nw(n,new Bl(t),t.bypassAuthState)}async function rI(t){const{auth:e,user:n}=t;return ie(n,e,"internal-error"),Fw(n,new Bl(t),t.bypassAuthState)}/**
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
 */class l1{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:u,type:a}=e;if(u){this.reject(u);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return tI;case"linkViaPopup":case"linkViaRedirect":return rI;case"reauthViaPopup":case"reauthViaRedirect":return nI;default:An(this.auth,"internal-error")}}resolve(e){wn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){wn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const iI=new qs(2e3,1e4);class Jr extends l1{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Jr.currentPopupAction&&Jr.currentPopupAction.cancel(),Jr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ie(e,this.auth,"internal-error"),e}async onExecution(){wn(this.filter.length===1,"Popup operations only handle one event");const e=Ul();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Yt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Yt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Jr.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Yt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,iI.get())};e()}}Jr.currentPopupAction=null;/**
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
 */const sI="pendingRedirect",Fu=new Map;class uI extends l1{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Fu.get(this.auth._key());if(!e){try{const r=await oI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Fu.set(this.auth._key(),e)}return this.bypassAuthState||Fu.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function oI(t,e){const n=lI(e),r=cI(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function aI(t,e){Fu.set(t._key(),e)}function cI(t){return gn(t._redirectPersistence)}function lI(t){return Pu(sI,t.config.apiKey,t.name)}async function hI(t,e,n=!1){if(Ft(t.app))return Promise.reject(Yn(t));const r=Uo(t),i=eI(r,e),u=await new uI(r,i,n).execute();return u&&!n&&(delete u.user._redirectEventId,await r._persistUserIfCurrent(u.user),await r._setRedirectUser(null,e)),u}/**
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
 */const fI=600*1e3;class dI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!pI(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!h1(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";n.onError(Yt(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=fI&&this.cachedEventUids.clear(),this.cachedEventUids.has(e0(e))}saveEventToCache(e){this.cachedEventUids.add(e0(e)),this.lastProcessedEventTime=Date.now()}}function e0(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function h1({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function pI(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return h1(t);default:return!1}}/**
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
 */async function mI(t,e={}){return Ci(t,"GET","/v1/projects",e)}/**
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
 */const gI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,_I=/^https?/;async function yI(t){if(t.config.emulator)return;const{authorizedDomains:e}=await mI(t);for(const n of e)try{if(bI(n))return}catch{}An(t,"unauthorized-domain")}function bI(t){const e=yc(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const u=new URL(t);return u.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&u.hostname===r}if(!_I.test(n))return!1;if(gI.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const EI=new qs(3e4,6e4);function t0(){const t=Zt().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function vI(t){return new Promise((e,n)=>{function r(){t0(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{t0(),n(Yt(t,"network-request-failed"))},timeout:EI.get()})}if(Zt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Zt().gapi?.load)r();else{const i=ww("iframefcb");return Zt()[i]=()=>{gapi.load?r():n(Yt(t,"network-request-failed"))},Tw(`${Aw()}?onload=${i}`).catch(s=>n(s))}}).catch(e=>{throw Nu=null,e})}let Nu=null;function TI(t){return Nu=Nu||vI(t),Nu}/**
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
 */const AI=new qs(5e3,15e3),wI="__/auth/iframe",II="emulator/auth/iframe",xI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},CI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function SI(t){const e=t.config;ie(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Vl(e,II):`https://${t.config.authDomain}/${wI}`,r={apiKey:e.apiKey,appName:t.name,v:vi},i=CI.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${Vs(r).slice(1)}`}async function kI(t){const e=await TI(t),n=Zt().gapi;return ie(n,t,"internal-error"),e.open({where:document.body,url:SI(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:xI,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const u=Yt(t,"network-request-failed"),a=Zt().setTimeout(()=>{s(u)},AI.get());function c(){Zt().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(u)})}))}/**
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
 */const RI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},DI=500,PI=600,FI="_blank",NI="http://localhost";class n0{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function VI(t,e,n,r=DI,i=PI){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),u=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...RI,width:r.toString(),height:i.toString(),top:s,left:u},l=at().toLowerCase();n&&(a=Hg(l)?FI:n),zg(l)&&(e=e||NI,c.scrollbars="yes");const f=Object.entries(c).reduce((g,[_,b])=>`${g}${_}=${b},`,"");if(pw(l)&&a!=="_self")return OI(e||"",a),new n0(null);const p=window.open(e||"",a,f);ie(p,t,"popup-blocked");try{p.focus()}catch{}return new n0(p)}function OI(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const MI="__/auth/handler",LI="emulator/auth/handler",UI=encodeURIComponent("fac");async function r0(t,e,n,r,i,s){ie(t.config.authDomain,t,"auth-domain-config-required"),ie(t.config.apiKey,t,"invalid-api-key");const u={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:vi,eventId:i};if(e instanceof e1){e.setDefaultLanguage(t.languageCode),u.providerId=e.providerId||"",b3(e.getCustomParameters())||(u.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))u[f]=p}if(e instanceof js){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(u.scopes=f.join(","))}t.tenantId&&(u.tid=t.tenantId);const a=u;for(const f of Object.keys(a))a[f]===void 0&&delete a[f];const c=await t._getAppCheckToken(),l=c?`#${UI}=${encodeURIComponent(c)}`:"";return`${BI(t)}?${Vs(a).slice(1)}${l}`}function BI({config:t}){return t.emulator?Vl(t,LI):`https://${t.authDomain}/${MI}`}/**
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
 */const Pa="webStorageSupport";class qI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=s1,this._completeRedirectFn=hI,this._overrideRedirectResult=aI}async _openPopup(e,n,r,i){wn(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await r0(e,n,r,yc(),i);return VI(e,s,Ul())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await r0(e,n,r,yc(),i);return $w(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(wn(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await kI(e),r=new dI(e);return n.register("authEvent",i=>(ie(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Pa,{type:Pa},i=>{const s=i?.[0]?.[Pa];s!==void 0&&n(!!s),An(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=yI(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Jg()||$g()||Ml()}}const jI=qI;var i0="@firebase/auth",s0="1.11.0";/**
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
 */class zI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){ie(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function $I(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function HI(t){hi(new Sr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:u,authDomain:a}=r.options;ie(u&&!u.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:u,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Xg(t)},l=new Ew(r,i,s,c);return xw(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),hi(new Sr("auth-internal",e=>{const n=Uo(e.getProvider("auth").getImmediate());return(r=>new zI(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Gn(i0,s0,$I(t)),Gn(i0,s0,"esm2020")}/**
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
 */const WI=300,GI=Hp("authIdTokenMaxAge")||WI;let u0=null;const KI=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>GI)return;const i=n?.token;u0!==i&&(u0=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function QI(t=Xp()){const e=Qc(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Iw(t,{popupRedirectResolver:jI,persistence:[Zw,qw,s1]}),r=Hp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const u=KI(s.toString());Mw(n,u,()=>u(n.currentUser)),Ow(n,a=>u(a))}}const i=zp("auth");return i&&Cw(n,`http://${i}`),n}function JI(){return document.getElementsByTagName("head")?.[0]??document}vw({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=Yt("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",JI().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});HI("Browser");const XI={apiKey:"AIzaSyCsOqpk7qzesQfNhIVb_Nm-lSAtWoNg2Z0",authDomain:"ror-web-site.firebaseapp.com",projectId:"ror-web-site",appId:"1:777517324792:web:5fe680dc85e91239d71e0d"},f1=Jp(XI),o0=RA(f1),YI=JA,Fa=QI(f1);async function ZI(){return Fa.currentUser||await Pw(Fa),new Promise(t=>Lw(Fa,e=>e&&t(e)))}const e4={class:"layout-pc"},t4={class:"sidenav"},n4={class:"sidenav-inner"},r4={"aria-label":"サイドナビ"},i4={class:"nav-list"},s4=["onClick","aria-current"],u4={class:"nav-text"},o4={class:"content"},a4={class:"panel"},c4=["innerHTML"],l4={key:1,class:"loading"},h4={class:"sidebar"},f4={class:"pad"},d4={class:"hint"},p4={class:"row"},m4=["disabled"],g4={class:"card list"},_4={class:"posts"},y4={class:"meta"},b4={class:"name"},E4={class:"time"},v4=["onClick"],T4=["textContent"],A4={key:0,class:"empty"},a0="ror_selected_topic_v2",c0=500,l0=10,w4={__name:"App",setup(t){const e=new kt({breaks:!0}),n=Object.assign({"./content/1.基本.md":()=>lu(()=>import("./1.基本-BllvYrDA.js"),[]).then(P=>P.default),"./content/2.players.md":()=>lu(()=>import("./2.players-IYwVCbU4.js"),[]).then(P=>P.default),"./content/3.略語集.md":()=>lu(()=>import("./3.略語集-MdPddEiQ.js"),[]).then(P=>P.default),"./content/4.リンク.md":()=>lu(()=>import("./4.リンク-Bb9p9_Ht.js"),[]).then(P=>P.default)}),r=$i([]),i=$i("");Ua(async()=>{const P=Object.entries(n).sort((q,Q)=>q[0].localeCompare(Q[0],"ja"));for(const[q,Q]of P){const A=await Q();let E=(A.split(/\r?\n/).find(x=>x.trim().length)??"Untitled").replace(/^#+\s*/,"").trim();const w=q.split("/").pop().replace(/\.md$/,"");r.value.push({id:w,title:E,body:A})}const k=localStorage.getItem(a0);i.value=k&&r.value.some(q=>q.id===k)?k:r.value[0]?.id||""}),vu(i,P=>{P&&localStorage.setItem(a0,P)});const s=Fn(()=>r.value.find(P=>P.id===i.value)),u=Fn(()=>s.value?e.render(s.value.body):""),a=$i(""),c=$i(""),l=$i([]),f=Fn(()=>c.value.length),p=Fn(()=>c.value?c.value.split(/\r\n|\r|\n/).length:0),g=Fn(()=>f.value>c0),_=Fn(()=>p.value>l0),b=Fn(()=>!!c.value.trim()&&!g.value&&!_.value),R=kA(o0,"messages");Ua(async()=>{await ZI();const P=qA(R,jA("created_at","desc"));KA(P,k=>{l.value=k.docs.map(q=>{const Q=q.data(),A=Q.created_at?.toDate?Q.created_at.toDate():new Date;return{id:q.id,name:Q.name||"名無し",text:Q.text||"",at:A.toLocaleString()}})})});function N(){const P=c.value.trim(),k=a.value.trim()||"名無し";b.value&&GA(R,{name:k,text:P,created_at:YI()}).then(()=>{c.value=""})}async function B(P){await zd(Tg(o0,"messages",P))}async function V(){if(!confirm("全投稿を削除しますか？"))return;const P=await WA(R);for(const k of P.docs)await zd(k.ref)}return(P,k)=>(hn(),Dn("div",e4,[le("aside",t4,[le("div",n4,[k[3]||(k[3]=le("div",{class:"logo"},"MENU",-1)),le("nav",r4,[le("ul",i4,[(hn(!0),Dn(Pt,null,Lh(r.value,q=>(hn(),Dn("li",{key:q.id},[le("a",{href:"#",class:Zr(["nav-link",{active:q.id===i.value}]),onClick:hf(Q=>i.value=q.id,["prevent"]),"aria-current":q.id===i.value?"page":void 0},[k[2]||(k[2]=le("span",{class:"dot","aria-hidden":"true"},null,-1)),le("span",u4,ln(q.title),1)],10,s4)]))),128))])])])]),le("main",o4,[k[4]||(k[4]=le("h2",{class:"title"},"♠♡♦♧ RoRメンバーサイト ♠♡♦♧",-1)),k[5]||(k[5]=le("p",{class:"lead"},[Au("ここではメンバー向けに "),le("strong",null,"ルール"),Au(" や "),le("strong",null,"ノウハウ"),Au(" を共有します。")],-1)),le("section",a4,[u.value?(hn(),Dn("article",{key:0,class:"md",innerHTML:u.value},null,8,c4)):(hn(),Dn("div",l4,"読み込み中…（content フォルダに .md を置くと自動で出るべ）"))])]),le("aside",h4,[le("div",f4,[k[10]||(k[10]=le("h3",null,"✍️ メンバー書き込み",-1)),le("form",{onSubmit:hf(N,["prevent"]),class:"card"},[k[7]||(k[7]=le("label",{class:"lbl"},"ニックネーム",-1)),Oh(le("input",{"onUpdate:modelValue":k[0]||(k[0]=q=>a.value=q),class:"input",placeholder:"例：Momo56 / 名無し など"},null,512),[[lf,a.value]]),k[8]||(k[8]=le("label",{class:"lbl"},"メッセージ",-1)),Oh(le("textarea",{"onUpdate:modelValue":k[1]||(k[1]=q=>c.value=q),class:"textarea",placeholder:"複数行OK。ノウハウや連絡事項などをどうぞ",rows:"5"},null,512),[[lf,c.value]]),le("div",d4,[le("span",{class:Zr({over:g.value})},ln(f.value)+"/"+ln(c0)+"文字",3),k[6]||(k[6]=le("span",null,"・",-1)),le("span",{class:Zr({over:_.value})},ln(p.value)+"/"+ln(l0)+"行",3)]),le("div",p4,[le("button",{class:"btn-primary",type:"submit",disabled:!b.value},"投稿",8,m4),le("button",{class:"btn-danger",type:"button",onClick:V},"全削除")])],32),le("div",g4,[k[9]||(k[9]=le("h4",null,"🗂 最新の投稿",-1)),le("ul",_4,[(hn(!0),Dn(Pt,null,Lh(l.value,q=>(hn(),Dn("li",{key:q.id,class:"post"},[le("div",y4,[le("strong",b4,ln(q.name||"名無し"),1),le("small",E4,ln(q.at),1),le("button",{class:"btn-mini",type:"button",onClick:Q=>B(q.id)},"削除",8,v4)]),le("div",{class:"text",textContent:ln(q.text)},null,8,T4)]))),128)),l.value.length===0?(hn(),Dn("li",A4,"まだ投稿はありません。")):T2("",!0)])]),k[11]||(k[11]=le("p",{class:"note"},"※ Firestoreでリアルタイム共有しています。",-1))])])]))}};iy(w4).mount("#app");
