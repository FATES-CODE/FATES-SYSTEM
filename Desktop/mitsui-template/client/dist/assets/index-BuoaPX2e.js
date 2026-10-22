(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.44
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function xc(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const Tt={},ss=[],ni=()=>{},lf=()=>!1,$a=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Xa=n=>n.startsWith("onUpdate:"),Yt=Object.assign,yc=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Ep=Object.prototype.hasOwnProperty,gt=(n,e)=>Ep.call(n,e),Je=Array.isArray,zi=n=>Ur(n)==="[object Map]",Gs=n=>Ur(n)==="[object Set]",pu=n=>Ur(n)==="[object Date]",nt=n=>typeof n=="function",Ut=n=>typeof n=="string",Hn=n=>typeof n=="symbol",bt=n=>n!==null&&typeof n=="object",cf=n=>(bt(n)||nt(n))&&nt(n.then)&&nt(n.catch),uf=Object.prototype.toString,Ur=n=>uf.call(n),Tp=n=>Ur(n).slice(8,-1),df=n=>Ur(n)==="[object Object]",Sc=n=>Ut(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,hr=xc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),qa=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},Ap=/-\w/g,fn=qa(n=>n.replace(Ap,e=>e.slice(1).toUpperCase())),wp=/\B([A-Z])/g,hs=qa(n=>n.replace(wp,"-$1").toLowerCase()),Ya=qa(n=>n.charAt(0).toUpperCase()+n.slice(1)),ho=qa(n=>n?`on${Ya(n)}`:""),jn=(n,e)=>!Object.is(n,e),ya=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},ff=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},bc=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let mu;const Ka=()=>mu||(mu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Za(n){if(Je(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=Ut(i)?Ip(i):Za(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(Ut(n)||bt(n))return n}const Cp=/;(?![^(]*\))/g,Rp=/:([^]+)/,Pp=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function Ip(n){const e={};return n.replace(Pp,t=>t.startsWith("/*")?"":t).split(Cp).forEach(t=>{if(t){const i=t.split(Rp);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Dt(n){let e="";if(Ut(n))e=n;else if(Je(n))for(let t=0;t<n.length;t++){const i=Dt(n[t]);i&&(e+=i+" ")}else if(bt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Lp="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly",Dp=xc(Lp);function hf(n){return!!n||n===""}function Np(n,e,t){if(n.length!==e.length)return!1;let i=!0;for(let s=0;i&&s<n.length;s++)i=Ys(n[s],e[s],t);return i}function gu(n,e,t){if(n.size!==e.size)return!1;const i=Array.from(e),s=new Uint8Array(i.length);for(const r of n){let a=-1;for(let o=0;o<i.length;o++)if(!s[o]&&Ys(r,i[o],t)){a=o;break}if(a<0)return!1;s[a]=1}return!0}function Up(n,e,t){let i=zi(n),s=zi(e);if(i||s||(i=Gs(n),s=Gs(e),i||s))return i&&s?gu(n,e,t):!1;const r=Object.keys(n).length,a=Object.keys(e).length;if(r!==a)return!1;for(const o in n){const l=n.hasOwnProperty(o),c=e.hasOwnProperty(o);if(l&&!c||!l&&c||!Ys(n[o],e[o],t))return!1}return String(n)===String(e)}function _u(n,e,t,i){t||(t=[new Map,new Map]);const[s,r]=t;if(s.has(n)||r.has(e))return s.get(n)===e&&r.get(e)===n;s.set(n,e),r.set(e,n);const a=i(n,e,t);return s.delete(n),r.delete(e),a}function Ys(n,e,t){if(n===e)return!0;let i=pu(n),s=pu(e);return i||s?i&&s?n.getTime()===e.getTime():!1:(i=Hn(n),s=Hn(e),i||s?n===e:(i=Je(n),s=Je(e),i||s?i&&s?_u(n,e,t,Np):!1:(i=bt(n),s=bt(e),i||s?!i||!s?!1:_u(n,e,t,Up):String(n)===String(e))))}function pf(n,e){return n.findIndex(t=>Ys(t,e))}const mf=n=>!!(n&&n.__v_isRef===!0),N=n=>Ut(n)?n:n==null?"":Je(n)||bt(n)&&(n.toString===uf||!nt(n.toString))?mf(n)?N(n.value):JSON.stringify(n,gf,2):String(n),gf=(n,e)=>mf(e)?gf(n,e.value):zi(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[po(i,r)+" =>"]=s,t),{})}:Gs(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>po(t))}:Hn(e)?po(e):bt(e)&&!Je(e)&&!df(e)?String(e):e,po=(n,e="")=>{var t;return Hn(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.44
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let $t;class Op{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&$t&&($t.active?(this.parent=$t,this.index=($t.scopes||($t.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes){const i=this.scopes.slice();for(e=0,t=i.length;e<t;e++)i[e].pause()}for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes){const s=this.scopes.slice();for(e=0,t=s.length;e<t;e++)s[e].resume()}const i=this.effects.slice();for(e=0,t=i.length;e<t;e++)i[e].resume()}}run(e){if(this._active){const t=$t;try{return $t=this,e()}finally{$t=t}}}on(){++this._on===1&&(this.prevScope=$t,$t=this)}off(){if(this._on>0&&--this._on===0){if($t===this)$t=this.prevScope;else{let e=$t;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){const s=this.scopes.slice();for(t=0,i=s.length;t<i;t++)s[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Fp(){return $t}let Ct;const mo=new WeakSet;class _f{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,$t&&($t.active?$t.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,mo.has(this)&&(mo.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||xf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,vu(this),yf(this);const e=Ct,t=Fn;Ct=this,Fn=!0;try{return this.fn()}finally{Sf(this),Ct=e,Fn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Tc(e);this.deps=this.depsTail=void 0,vu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?mo.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){hl(this)&&this.run()}get dirty(){return hl(this)}}let vf=0,pr,mr;function xf(n,e=!1){if(n.flags|=8,e){n.next=mr,mr=n;return}n.next=pr,pr=n}function Mc(){vf++}function Ec(){if(--vf>0)return;if(mr){let e=mr;for(mr=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;pr;){let e=pr;for(pr=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function yf(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Sf(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),Tc(i),Bp(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function hl(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(bf(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function bf(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===br)||(n.globalVersion=br,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!hl(n))))return;n.flags|=2;const e=n.dep,t=Ct,i=Fn;Ct=n,Fn=!0;try{yf(n);const s=n.fn(n._value);(e.version===0||jn(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{Ct=t,Fn=i,Sf(n),n.flags&=-3}}function Tc(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)Tc(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Bp(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Fn=!0;const Mf=[];function si(){Mf.push(Fn),Fn=!1}function ri(){const n=Mf.pop();Fn=n===void 0?!0:n}function vu(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Ct;Ct=void 0;try{e()}finally{Ct=t}}}let br=0;class kp{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Ac{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Ct||!Fn||Ct===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Ct)t=this.activeLink=new kp(Ct,this),Ct.deps?(t.prevDep=Ct.depsTail,Ct.depsTail.nextDep=t,Ct.depsTail=t):Ct.deps=Ct.depsTail=t,Ef(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=Ct.depsTail,t.nextDep=void 0,Ct.depsTail.nextDep=t,Ct.depsTail=t,Ct.deps===t&&(Ct.deps=i)}return t}trigger(e){this.version++,br++,this.notify(e)}notify(e){Mc();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Ec()}}}function Ef(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Ef(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const pl=new WeakMap,cs=Symbol(""),ml=Symbol(""),Mr=Symbol("");function Qt(n,e,t){if(Fn&&Ct){let i=pl.get(n);i||pl.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new Ac),s.map=i,s.key=t),s.track()}}function yi(n,e,t,i,s,r){const a=pl.get(n);if(!a){br++;return}const o=l=>{l&&l.trigger()};if(Mc(),e==="clear")a.forEach(o);else{const l=Je(n),c=l&&Sc(t);if(l&&t==="length"){const u=Number(i);a.forEach((h,f)=>{(f==="length"||f===Mr||!Hn(f)&&f>=u)&&o(h)})}else switch((t!==void 0||a.has(void 0))&&o(a.get(t)),c&&o(a.get(Mr)),e){case"add":l?c&&o(a.get("length")):(o(a.get(cs)),zi(n)&&o(a.get(ml)));break;case"delete":l||(o(a.get(cs)),zi(n)&&o(a.get(ml)));break;case"set":zi(n)&&o(a.get(cs));break}}Ec()}function _s(n){const e=yt(n);return e===n||(Qt(e,"iterate",Mr),An(n))?e:ai(n)?Wi(n)?e.map(t=>$i(Cn(t))):e.map($i):e.map(Cn)}function Ja(n){return Qt(n=yt(n),"iterate",Mr),n}function Kn(n,e){return ai(n)?$i(Wi(n)?Cn(e):e):Cn(e)}const Hp={__proto__:null,[Symbol.iterator](){return go(this,Symbol.iterator,n=>Kn(this,n))},concat(...n){return _s(this).concat(...n.map(e=>Je(e)?_s(e):e))},entries(){return go(this,"entries",n=>(n[1]=Kn(this,n[1]),n))},every(n,e){return di(this,"every",n,e,void 0,arguments)},filter(n,e){return di(this,"filter",n,e,t=>t.map(i=>Kn(this,i)),arguments)},find(n,e){return di(this,"find",n,e,t=>Kn(this,t),arguments)},findIndex(n,e){return di(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return di(this,"findLast",n,e,t=>Kn(this,t),arguments)},findLastIndex(n,e){return di(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return di(this,"forEach",n,e,void 0,arguments)},includes(...n){return _o(this,"includes",n)},indexOf(...n){return _o(this,"indexOf",n)},join(n){return _s(this).join(n)},lastIndexOf(...n){return _o(this,"lastIndexOf",n)},map(n,e){return di(this,"map",n,e,void 0,arguments)},pop(){return Qs(this,"pop")},push(...n){return Qs(this,"push",n)},reduce(n,...e){return yu(this,"reduce",n,e)},reduceRight(n,...e){return yu(this,"reduceRight",n,e)},shift(){return Qs(this,"shift")},some(n,e){return di(this,"some",n,e,void 0,arguments)},splice(...n){return Qs(this,"splice",n)},toReversed(){return _s(this).toReversed()},toSorted(n){return _s(this).toSorted(n)},toSpliced(...n){return _s(this).toSpliced(...n)},unshift(...n){return Qs(this,"unshift",n)},values(){return go(this,"values",n=>Kn(this,n))}};function go(n,e,t){const i=Ja(n),s=i[e],r=s.call(i);if(i!==n&&!An(n)){if(r[Symbol.toStringTag]==="Array Iterator"){const a=Object.create(Object.getPrototypeOf(r));return a.next=()=>xu(r.next(),t),s!==Tf[e]&&Object.defineProperties(a,{return:{get(){const o=r.return;return typeof o=="function"?o.bind(r):o}},throw:{get(){const o=r.throw;return typeof o=="function"?o.bind(r):o}}}),a}r._next=r.next,r.next=()=>xu(r._next(),t)}return r}function xu(n,e){return n.done||(n.value=e(n.value)),n}const Tf=Array.prototype;function di(n,e,t,i,s,r){const a=Ja(n),o=a!==n&&!An(n),l=a[e];if(l!==Tf[e]){const h=l.apply(n,r);return o?Cn(h):h}let c=t;a!==n&&(o?c=function(h,f){return t.call(this,Kn(n,h),f,n)}:t.length>2&&(c=function(h,f){return t.call(this,h,f,n)}));const u=l.call(a,c,i);return o&&s?s(u):u}function yu(n,e,t,i){const s=Ja(n),r=s!==n&&!An(n);let a=t,o=!1;s!==n&&(r?(o=i.length===0,a=function(c,u,h){return o&&(o=!1,c=Kn(n,c)),t.call(this,c,Kn(n,u),h,n)}):t.length>3&&(a=function(c,u,h){return t.call(this,c,u,h,n)}));const l=s[e](a,...i);return o?Kn(n,l):l}function _o(n,e,t){const i=yt(n);Qt(i,"iterate",Mr);const s=i[e](...t);return(s===-1||s===!1)&&Rc(t[0])?(t[0]=yt(t[0]),i[e](...t)):s}function Qs(n,e,t=[]){si(),Mc();const i=yt(n)[e].apply(n,t);return Ec(),ri(),i}const Gp=xc("__proto__,__v_isRef,__isVue"),Af=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Hn));function Vp(n){Hn(n)||(n=String(n));const e=yt(this);return Qt(e,"has",n),e.hasOwnProperty(n)}class wf{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?Qp:If:r?Pf:Rf).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const a=Je(e);if(!s){let l;if(a&&(l=Hp[t]))return l;if(t==="hasOwnProperty")return Vp}const o=Reflect.get(e,t,tn(e)?e:i);if((Hn(t)?Af.has(t):Gp(t))||(s||Qt(e,"get",t),r))return o;if(tn(o)){const l=a&&Sc(t)?o:o.value;return s&&bt(l)?_l(l):l}return bt(o)?s?_l(o):Or(o):o}}class Cf extends wf{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];const a=Je(e)&&Sc(t);if(!this._isShallow){const c=ai(r);if(!An(i)&&!ai(i)&&(r=yt(r),i=yt(i)),!a&&tn(r)&&!tn(i))return c||(r.value=i),!0}const o=a?Number(t)<e.length:gt(e,t),l=Reflect.set(e,t,i,tn(e)?e:s);return e===yt(s)&&l&&(o?jn(i,r)&&yi(e,"set",t,i):yi(e,"add",t,i)),l}deleteProperty(e,t){const i=gt(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&yi(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!Hn(t)||!Af.has(t))&&Qt(e,"has",t),i}ownKeys(e){return Qt(e,"iterate",Je(e)?"length":cs),Reflect.ownKeys(e)}}class zp extends wf{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Wp=new Cf,$p=new zp,Xp=new Cf(!0);const gl=n=>n,Xr=n=>Reflect.getPrototypeOf(n);function qp(n,e,t){return function(...i){const s=this.__v_raw,r=yt(s),a=zi(r),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,c=s[n](...i),u=t?gl:e?$i:Cn;return!e&&Qt(r,"iterate",l?ml:cs),Yt(Object.create(c),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:o?[u(h[0]),u(h[1])]:u(h),done:f}}})}}function qr(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Yp(n,e){const t={get(s){const r=this.__v_raw,a=yt(r),o=yt(s);n||(jn(s,o)&&Qt(a,"get",s),Qt(a,"get",o));const{has:l}=Xr(a),c=e?gl:n?$i:Cn;if(l.call(a,s))return c(r.get(s));if(l.call(a,o))return c(r.get(o));r!==a&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Qt(yt(s),"iterate",cs),s.size},has(s){const r=this.__v_raw,a=yt(r),o=yt(s);return n||(jn(s,o)&&Qt(a,"has",s),Qt(a,"has",o)),s===o?r.has(s):r.has(s)||r.has(o)},forEach(s,r){const a=this,o=a.__v_raw,l=yt(o),c=e?gl:n?$i:Cn;return!n&&Qt(l,"iterate",cs),o.forEach((u,h)=>s.call(r,c(u),c(h),a))}};return Yt(t,n?{add:qr("add"),set:qr("set"),delete:qr("delete"),clear:qr("clear")}:{add(s){const r=yt(this),a=Xr(r),o=yt(s),l=!e&&!An(s)&&!ai(s)?o:s;return a.has.call(r,l)||jn(s,l)&&a.has.call(r,s)||jn(o,l)&&a.has.call(r,o)||(r.add(l),yi(r,"add",l,l)),this},set(s,r){!e&&!An(r)&&!ai(r)&&(r=yt(r));const a=yt(this),{has:o,get:l}=Xr(a);let c=o.call(a,s);c||(s=yt(s),c=o.call(a,s));const u=l.call(a,s);return a.set(s,r),c?jn(r,u)&&yi(a,"set",s,r):yi(a,"add",s,r),this},delete(s){const r=yt(this),{has:a,get:o}=Xr(r);let l=a.call(r,s);l||(s=yt(s),l=a.call(r,s)),o&&o.call(r,s);const c=r.delete(s);return l&&yi(r,"delete",s,void 0),c},clear(){const s=yt(this),r=s.size!==0,a=s.clear();return r&&yi(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=qp(s,n,e)}),t}function wc(n,e){const t=Yp(n,e);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_isShallow"?e:s==="__v_raw"?i:Reflect.get(gt(t,s)&&s in i?t:i,s,r)}const Kp={get:wc(!1,!1)},Zp={get:wc(!1,!0)},Jp={get:wc(!0,!1)};const Rf=new WeakMap,Pf=new WeakMap,If=new WeakMap,Qp=new WeakMap;function jp(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Or(n){return ai(n)?n:Cc(n,!1,Wp,Kp,Rf)}function Lf(n){return Cc(n,!1,Xp,Zp,Pf)}function _l(n){return Cc(n,!0,$p,Jp,If)}function Cc(n,e,t,i,s){if(!bt(n)||n.__v_raw&&!(e&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const r=s.get(n);if(r)return r;const a=jp(Tp(n));if(a===0)return n;const o=new Proxy(n,a===2?i:t);return s.set(n,o),o}function Wi(n){return ai(n)?Wi(n.__v_raw):!!(n&&n.__v_isReactive)}function ai(n){return!!(n&&n.__v_isReadonly)}function An(n){return!!(n&&n.__v_isShallow)}function Rc(n){return n?!!n.__v_raw:!1}function yt(n){const e=n&&n.__v_raw;return e?yt(e):n}function em(n){return!gt(n,"__v_skip")&&Object.isExtensible(n)&&ff(n,"__v_skip",!0),n}const Cn=n=>bt(n)?Or(n):n,$i=n=>bt(n)?_l(n):n;function tn(n){return n?n.__v_isRef===!0:!1}function Nt(n){return Df(n,!1)}function tm(n){return Df(n,!0)}function Df(n,e){return tn(n)?n:new nm(n,e)}class nm{constructor(e,t){this.dep=new Ac,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:yt(e),this._value=t?e:Cn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||An(e)||ai(e);e=i?e:yt(e),jn(e,t)&&(this._rawValue=e,this._value=i?e:Cn(e),this.dep.trigger())}}function En(n){return tn(n)?n.value:n}const im={get:(n,e,t)=>e==="__v_raw"?n:En(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return tn(s)&&!tn(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function Nf(n){return Wi(n)?n:new Proxy(n,im)}class sm{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Ac(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=br-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Ct!==this)return xf(this,!0),!0}get value(){const e=this.dep.track();return bf(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function rm(n,e,t=!1){let i,s;return nt(n)?i=n:(i=n.get,s=n.set),new sm(i,s,t)}const Yr={},Ra=new WeakMap;let ns;function am(n,e=!1,t=ns){if(t){let i=Ra.get(t);i||Ra.set(t,i=[]),i.push(n)}}function om(n,e,t=Tt){const{immediate:i,deep:s,once:r,scheduler:a,augmentJob:o,call:l}=t,c=x=>s?x:An(x)||s===!1||s===0?Si(x,1):Si(x);let u,h,f,p,v=!1,b=!1;if(tn(n)?(h=()=>n.value,v=An(n)):Wi(n)?(h=()=>c(n),v=!0):Je(n)?(b=!0,v=n.some(x=>Wi(x)||An(x)),h=()=>n.map(x=>{if(tn(x))return x.value;if(Wi(x))return c(x);if(nt(x))return l?l(x,2):x()})):nt(n)?e?h=l?()=>l(n,2):n:h=()=>{if(f){si();try{f()}finally{ri()}}const x=ns;ns=u;try{return l?l(n,3,[p]):n(p)}finally{ns=x}}:h=ni,e&&s){const x=h,T=s===!0?1/0:s;h=()=>Si(x(),T)}const g=Fp(),m=()=>{u.stop(),g&&g.active&&yc(g.effects,u)};if(r&&e){const x=e;e=(...T)=>{try{return x(...T)}finally{m()}}}let E=b?new Array(n.length).fill(Yr):Yr;const A=x=>{if(!(!(u.flags&1)||!u.dirty&&!x))if(e){const T=u.run();if(x||s||v||(b?T.some((w,I)=>jn(w,E[I])):jn(T,E))){const w=ns;si();try{f&&f(),ns=u;const I=[T,E===Yr?void 0:b&&E[0]===Yr?[]:E,p];E=T,l?l(e,3,I):e(...I)}finally{ns=w,ri()}}}else u.run()};return o&&o(A),u=new _f(h),u.scheduler=a?()=>a(A,!1):A,p=x=>am(x,!1,u),f=u.onStop=()=>{const x=Ra.get(u);if(x){if(l)l(x,4);else for(const T of x)T();Ra.delete(u)}},e?i?A(!0):E=u.run():a?a(A.bind(null,!0),!0):u.run(),m.pause=u.pause.bind(u),m.resume=u.resume.bind(u),m.stop=m,m}function Si(n,e=1/0,t){if(e<=0||!bt(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,tn(n))Si(n.value,e,t);else if(Je(n))for(let i=0;i<n.length;i++)Si(n[i],e,t);else if(Gs(n)||zi(n))n.forEach(i=>{Si(i,e,t)});else if(df(n)){for(const i in n)Si(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&Si(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.44
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Fr(n,e,t,i){try{return i?n(...i):n()}catch(s){Qa(s,e,t)}}function Gn(n,e,t,i){if(nt(n)){const s=Fr(n,e,t,i);return s&&cf(s)&&s.catch(r=>{Qa(r,e,t)}),s}if(Je(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Gn(n[r],e,t,i));return s}}function Qa(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||Tt;if(e){let o=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;o;){const u=o.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}o=o.parent}if(r){si(),Fr(r,null,10,[n,l,c]),ri();return}}lm(n,t,s,i,a)}function lm(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const dn=[];let Nn=-1;const Zn=[];let ki=null,Ds=0;const Uf=Promise.resolve();let Pa=null;function Pc(n){const e=Pa||Uf;return n?e.then(this?n.bind(this):n):e}function cm(n){let e=Nn+1,t=dn.length;for(;e<t;){const i=e+t>>>1,s=dn[i],r=Er(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function Ic(n){if(!(n.flags&1)){const e=Er(n),t=dn[dn.length-1];!t||!(n.flags&2)&&e>=Er(t)?dn.push(n):dn.splice(cm(e),0,n),n.flags|=1,Of()}}function Of(){Pa||(Pa=Uf.then(kf))}function um(n){if(!Je(n))ki&&n.id===-1?ki.splice(Ds+1,0,n):n.flags&1||(Zn.push(n),n.flags|=1);else for(let e=0;e<n.length;e++)Zn.push(n[e]);Of()}function Ff(n,e,t,i=Nn+1){for(;i<dn.length;i++){const s=dn[i];if(s&&s.flags&2){if(n&&s.id!==n.uid||e!==void 0&&!(s.id>=e))continue;dn.splice(i,1),i=n?i-1:Nn,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Bf(n,e,t=0){if(Zn.length){let i=Zn,s=0;if(e){i=[];for(let a=0;a<Zn.length;a++){const o=Zn[a];(o.i!==void 0?!o.i||o.i.uid<t:e.has(o))?Zn[s++]=o:i.push(o)}}const r=[...new Set(i)].sort((a,o)=>Er(a)-Er(o));if(Zn.length=s,ki){for(let a=0;a<r.length;a++)ki.push(r[a]);return}for(ki=r,Ds=0;Ds<ki.length;Ds++){const a=ki[Ds];a.flags&4&&(a.flags&=-2),a.flags&8||a(),a.flags&=-2}ki=null,Ds=0}}let vo=!1;function dm(n,e){if(vo){n();return}const t=e===void 0?void 0:new Set(Zn);n(),vo=!0;try{Ff(void 0,e),Bf(void 0,t,e)}finally{vo=!1}}const Er=n=>n.id==null?n.flags&2?-1:1/0:n.id;function kf(n){try{for(Nn=0;Nn<dn.length;Nn++){const e=dn[Nn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Fr(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Nn<dn.length;Nn++){const e=dn[Nn];e&&(e.flags&=-2)}Nn=-1,dn.length=0,Bf(),Pa=null,(dn.length||Zn.length)&&kf()}}let Xt=null,Hf=null;function Ia(n){const e=Xt;return Xt=n,Hf=n&&n.type.__scopeId||null,e}function Ve(n,e=Xt,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&Ua(-1);const r=Ia(e),a=Ei.length;let o;try{o=n(...s)}finally{for(let l=Ei.length;l>a;l--)Uc();Ia(r),i._d&&Ua(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Yi(n,e){if(Xt===null)return n;const t=io(Xt),i=n.dirs||(n.dirs=[]);for(let s=0;s<e.length;s++){let[r,a,o,l=Tt]=e[s];r&&(nt(r)&&(r={mounted:r,updated:r}),r.deep&&Si(a),i.push({dir:r,instance:t,value:a,oldValue:void 0,arg:o,modifiers:l}))}return n}function Ki(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let a=0;a<s.length;a++){const o=s[a];r&&(o.oldValue=r[a].value);let l=o.dir[i];l&&(si(),Gn(l,t,8,[n.el,o,n,e]),ri())}}function Sa(n,e){if(jt){let t=jt.provides;const i=jt.parent&&jt.parent.provides;i===t&&(t=jt.provides=Object.create(i)),t[n]=e}}function Bn(n,e,t=!1){const i=cg();if(i||Bs){let s=Bs?Bs._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&nt(e)?e.call(i&&i.proxy):e}}const fm=Symbol.for("v-scx"),hm=()=>Bn(fm);function gr(n,e,t){return Gf(n,e,t)}function Gf(n,e,t=Tt){const{immediate:i,deep:s,flush:r,once:a}=t,o=Yt({},t),l=e&&i||!e&&r!=="post";let c;if(wr){if(r==="sync"){const p=hm();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=ni,p.resume=ni,p.pause=ni,p}}const u=jt;o.call=(p,v,b)=>Gn(p,u,v,b);let h=!1;r==="post"?o.scheduler=p=>{p.i=u,mn(p,u&&u.suspense)}:r!=="sync"&&(h=!0,o.scheduler=(p,v)=>{v?p():Ic(p)}),o.augmentJob=p=>{e&&(p.flags|=4),h&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const f=om(n,e,o);return wr&&(c?c.push(f):l&&f()),f}function pm(n,e,t){const i=this.proxy,s=Ut(n)?n.includes(".")?Vf(i,n):()=>i[n]:n.bind(i,i);let r;nt(e)?r=e:(r=e.handler,t=e);const a=kr(this),o=Gf(s,r.bind(i),t);return a(),o}function Vf(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const mm=Symbol("_vte"),ja=n=>n.__isTeleport,xo=Symbol("_leaveCb");function gm(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==Rn){e=t;break}}return e}function zf(n){if(!Lc(n))return ja(n.type)&&n.children?gm(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&nt(t.default))return t.default()}}function La(n,e){if(n.shapeFlag&6&&n.component){n.transition=e;const t=n.component.subTree;La(ja(t.type)&&zf(t)||t,e)}else if(n.shapeFlag&128)n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback);else if(n.transition=e,n.type===Le&&Je(n.children)){const t=Qf(n.children,!1);t&&La(t,e)}}function vl(n){if(n.component)return vl(n.component.subTree);if(n.type===Le){const e=Je(n.children)&&Qf(n.children,!1);return e?vl(e):void 0}if(n.type!==Rn)return n}function Wf(n,e){return nt(n)?Yt({name:n.name},e,{setup:n}):n}function $f(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Su(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const Da=new WeakMap;function _r(n,e,t,i,s=!1){if(Je(n)){n.forEach((b,g)=>_r(b,e&&(Je(e)?e[g]:e),t,i,s));return}if(Fs(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&_r(n,e,t,i.component.subTree);return}const r=i.shapeFlag&4?io(i.component):i.el,a=s?null:r,{i:o,r:l}=n,c=e&&e.r,u=o.refs===Tt?o.refs={}:o.refs,h=o.setupState,f=yt(h),p=h===Tt?lf:b=>Su(u,b)?!1:gt(f,b),v=(b,g)=>!(g&&Su(u,g));if(c!=null&&c!==l){if(bu(e),Ut(c))u[c]=null,p(c)&&(h[c]=null);else if(tn(c)){const b=e;v(c,b.k)&&(c.value=null),b.k&&(u[b.k]=null)}}if(nt(l))Fr(l,o,12,[a,u]);else{const b=Ut(l),g=tn(l);if(b||g){const m=()=>{if(n.f){const E=b?p(l)?h[l]:u[l]:v()||!n.k?l.value:u[n.k];if(s)Je(E)&&yc(E,r);else if(Je(E))E.includes(r)||E.push(r);else if(b)u[l]=[r],p(l)&&(h[l]=u[l]);else{const A=[r];v(l,n.k)&&(l.value=A),n.k&&(u[n.k]=A)}}else b?(u[l]=a,p(l)&&(h[l]=a)):g&&(v(l,n.k)&&(l.value=a),n.k&&(u[n.k]=a))};if(a){const E=()=>{m(),Da.delete(n)};E.id=-1,Da.set(n,E),mn(E,t)}else bu(n),m()}}}function bu(n){const e=Da.get(n);e&&(e.flags|=8,Da.delete(n))}Ka().requestIdleCallback;Ka().cancelIdleCallback;const Fs=n=>!!n.type.__asyncLoader,Lc=n=>n.type.__isKeepAlive;function _m(n,e){Xf(n,"a",e)}function vm(n,e){Xf(n,"da",e)}function Xf(n,e,t=jt){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(eo(e,i,t),t){let s=t.parent;for(;s&&s.parent;)Lc(s.parent.vnode)&&xm(i,e,t,s),s=s.parent}}function xm(n,e,t,i){const s=eo(e,n,i,!0);Ks(()=>{yc(i[e],s)},t)}function eo(n,e,t=jt,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...a)=>{si();const o=kr(t),l=Gn(e,t,n,a);return o(),ri(),l});return i?s.unshift(r):s.push(r),r}}const Ri=n=>(e,t=jt)=>{(!wr||n==="sp")&&eo(n,(...i)=>e(...i),t)},ym=Ri("bm"),Br=Ri("m"),Sm=Ri("bu"),bm=Ri("u"),Mm=Ri("bum"),Ks=Ri("um"),Em=Ri("sp"),Tm=Ri("rtg"),Am=Ri("rtc");function wm(n,e=jt){eo("ec",n,e)}const Cm="components";function rn(n,e){return Pm(Cm,n,!0,e)||n}const Rm=Symbol.for("v-ndc");function Pm(n,e,t=!0,i=!1){const s=Xt||jt;if(s){const r=s.type;{const o=pg(r,!1);if(o&&(o===e||o===fn(e)||o===Ya(fn(e))))return r}const a=Mu(s[n]||r[n],e)||Mu(s.appContext[n],e);return!a&&i?r:a}}function Mu(n,e){return n&&(n[e]||n[fn(e)]||n[Ya(fn(e))])}function Ke(n,e,t,i){let s;const r=t,a=Je(n);if(a||Ut(n)){const o=a&&Wi(n);let l=!1,c=!1;o&&(l=!An(n),c=ai(n),n=Ja(n)),s=new Array(n.length);for(let u=0,h=n.length;u<h;u++)s[u]=e(l?c?$i(Cn(n[u])):Cn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number")if(!Number.isInteger(n)||n<0)s=[];else{s=new Array(n);for(let o=0;o<n;o++)s[o]=e(o+1,o,void 0,r)}else if(bt(n))if(n[Symbol.iterator])s=Array.from(n,(o,l)=>e(o,l,void 0,r));else{const o=Object.keys(n);s=new Array(o.length);for(let l=0,c=o.length;l<c;l++){const u=o[l];s[l]=e(n[u],u,l,r)}}else s=[];return s}function Eu(n,e,t,i,s,r){if(t==null&&(t={}),Xt.ce||Xt.parent&&Fs(Xt.parent)&&Xt.parent.ce){const c=t,u=Object.keys(c).length>0;return e!=="default"&&(c.name=e),$(),It(Le,null,[Xe("slot",c,i)],u?-2:64)}let a=n[e];a&&a._c&&(a._d=!1);const o=Ei.length;$();let l;try{const c=a&&qf(a(t)),u=t.key||r||c&&c.key;l=It(Le,{key:(u&&!Hn(u)?u:`_${e}`)+(!c&&i?"_fb":"")},c||(i?i():[]),c&&n._===1?64:-2)}catch(c){for(let u=Ei.length;u>o;u--)Uc();throw c}finally{a&&a._c&&(a._d=!0)}return l}function qf(n){return n.some(e=>Vs(e)?!(e.type===Rn||e.type===Le&&!qf(e.children)):!0)?n:null}const xl=n=>n?ph(n)?io(n):xl(n.parent):null,vr=Yt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>xl(n.parent),$root:n=>xl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Kf(n),$forceUpdate:n=>n.f||(n.f=()=>{Ic(n.update)}),$nextTick:n=>n.n||(n.n=Pc.bind(n.proxy)),$watch:n=>pm.bind(n)}),yo=(n,e)=>n!==Tt&&!n.__isScriptSetup&&gt(n,e),Im={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:a,type:o,appContext:l}=n;if(e[0]!=="$"){const f=a[e];if(f!==void 0)switch(f){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(yo(i,e))return a[e]=1,i[e];if(s!==Tt&&gt(s,e))return a[e]=2,s[e];if(gt(r,e))return a[e]=3,r[e];if(t!==Tt&&gt(t,e))return a[e]=4,t[e];yl&&(a[e]=0)}}const c=vr[e];let u,h;if(c)return e==="$attrs"&&Qt(n.attrs,"get",""),c(n);if((u=o.__cssModules)&&(u=u[e]))return u;if(t!==Tt&&gt(t,e))return a[e]=4,t[e];if(h=l.config.globalProperties,gt(h,e))return h[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return yo(s,e)?(s[e]=t,!0):i!==Tt&&gt(i,e)?(i[e]=t,!0):gt(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,props:r,type:a}},o){let l;return!!(t[o]||n!==Tt&&o[0]!=="$"&&gt(n,o)||yo(e,o)||gt(r,o)||gt(i,o)||gt(vr,o)||gt(s.config.globalProperties,o)||(l=a.__cssModules)&&l[o])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:gt(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Tu(n){return Je(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let yl=!0;function Lm(n){const e=Kf(n),t=n.proxy,i=n.ctx;yl=!1,e.beforeCreate&&Au(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:p,updated:v,activated:b,deactivated:g,beforeDestroy:m,beforeUnmount:E,destroyed:A,unmounted:x,render:T,renderTracked:w,renderTriggered:I,errorCaptured:y,serverPrefetch:R,expose:F,inheritAttrs:G,components:K,directives:j,filters:z}=e;if(c&&Dm(c,i,null),a)for(const H in a){const ae=a[H];nt(ae)&&(i[H]=ae.bind(t))}if(s){const H=s.call(t,t);bt(H)&&(n.data=Or(H))}if(yl=!0,r)for(const H in r){const ae=r[H],ne=nt(ae)?ae.bind(t,t):nt(ae.get)?ae.get.bind(t,t):ni,de=!nt(ae)&&nt(ae.set)?ae.set.bind(t):ni,pe=st({get:ne,set:de});Object.defineProperty(i,H,{enumerable:!0,configurable:!0,get:()=>pe.value,set:Re=>pe.value=Re})}if(o)for(const H in o)Yf(o[H],i,t,H);if(l){const H=nt(l)?l.call(t):l;Reflect.ownKeys(H).forEach(ae=>{Sa(ae,H[ae])})}u&&Au(u,n,"c");function q(H,ae){Je(ae)?ae.forEach(ne=>H(ne.bind(t))):ae&&H(ae.bind(t))}if(q(ym,h),q(Br,f),q(Sm,p),q(bm,v),q(_m,b),q(vm,g),q(wm,y),q(Am,w),q(Tm,I),q(Mm,E),q(Ks,x),q(Em,R),Je(F))if(F.length){const H=n.exposed||(n.exposed={});F.forEach(ae=>{Object.defineProperty(H,ae,{get:()=>t[ae],set:ne=>t[ae]=ne,enumerable:!0})})}else n.exposed||(n.exposed={});T&&n.render===ni&&(n.render=T),G!=null&&(n.inheritAttrs=G),K&&(n.components=K),j&&(n.directives=j),R&&$f(n)}function Dm(n,e,t=ni){Je(n)&&(n=Sl(n));for(const i in n){const s=n[i];let r;bt(s)?"default"in s?r=Bn(s.from||i,s.default,!0):r=Bn(s.from||i):r=Bn(s),tn(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:a=>r.value=a}):e[i]=r}}function Au(n,e,t){Gn(Je(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function Yf(n,e,t,i){let s=i.includes(".")?Vf(t,i):()=>t[i];if(Ut(n)){const r=e[n];nt(r)&&gr(s,r)}else if(nt(n))gr(s,n.bind(t));else if(bt(n))if(Je(n))n.forEach(r=>Yf(r,e,t,i));else{const r=nt(n.handler)?n.handler.bind(t):e[n.handler];nt(r)&&gr(s,r,n)}}function Kf(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:a}}=n.appContext,o=r.get(e);let l;return o?l=o:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>Na(l,c,a,!0)),Na(l,e,a)),bt(e)&&r.set(e,l),l}function Na(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&Na(n,r,t,!0),s&&s.forEach(a=>Na(n,a,t,!0));for(const a in e)if(!(i&&a==="expose")){const o=Nm[a]||t&&t[a];n[a]=o?o(n[a],e[a]):e[a]}return n}const Nm={data:wu,props:Cu,emits:Cu,methods:cr,computed:cr,beforeCreate:ln,created:ln,beforeMount:ln,mounted:ln,beforeUpdate:ln,updated:ln,beforeDestroy:ln,beforeUnmount:ln,destroyed:ln,unmounted:ln,activated:ln,deactivated:ln,errorCaptured:ln,serverPrefetch:ln,components:cr,directives:cr,watch:Om,provide:wu,inject:Um};function wu(n,e){return e?n?function(){return Yt(nt(n)?n.call(this,this):n,nt(e)?e.call(this,this):e)}:e:n}function Um(n,e){return cr(Sl(n),Sl(e))}function Sl(n){if(Je(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function ln(n,e){return n?[...new Set([].concat(n,e))]:e}function cr(n,e){return n?Yt(Object.create(null),n,e):e}function Cu(n,e){return n?Je(n)&&Je(e)?[...new Set([...n,...e])]:Yt(Object.create(null),Tu(n),Tu(e??{})):e}function Om(n,e){if(!n)return e;if(!e)return n;const t=Yt(Object.create(null),n);for(const i in e)t[i]=ln(n[i],e[i]);return t}function Zf(){return{app:null,config:{isNativeTag:lf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Fm=0;function Bm(n,e){return function(i,s=null){nt(i)||(i=Yt({},i)),s!=null&&!bt(s)&&(s=null);const r=Zf(),a=new WeakSet,o=[];let l=!1;const c=r.app={_uid:Fm++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:gg,get config(){return r.config},set config(u){},use(u,...h){return a.has(u)||(u&&nt(u.install)?(a.add(u),u.install(c,...h)):nt(u)&&(a.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!l){const p=c._ceVNode||Xe(i,s);return p.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(p,u,f),l=!0,c._container=u,u.__vue_app__=c,io(p.component)}},onUnmount(u){o.push(u)},unmount(){l&&(Gn(o,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=Bs;Bs=c;try{return u()}finally{Bs=h}}};return c}}let Bs=null;const km=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${fn(e)}Modifiers`]||n[`${hs(e)}Modifiers`];function Hm(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||Tt;let s=t;const r=e.startsWith("update:"),a=r&&km(i,e.slice(7));a&&(a.trim&&(s=t.map(u=>Ut(u)?u.trim():u)),a.number&&(s=s.map(bc)));let o,l=i[o=ho(e)]||i[o=ho(fn(e))];!l&&r&&(l=i[o=ho(hs(e))]),l&&Gn(l,n,6,s);const c=i[o+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,Gn(c,n,6,s)}}const Gm=new WeakMap;function Jf(n,e,t=!1){const i=t?Gm:e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let a={},o=!1;if(!nt(n)){const l=c=>{const u=Jf(c,e,!0);u&&(o=!0,Yt(a,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!o?(bt(n)&&i.set(n,null),null):(Je(r)?r.forEach(l=>a[l]=null):Yt(a,r),bt(n)&&i.set(n,a),a)}function to(n,e){return!n||!$a(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),gt(n,e[0].toLowerCase()+e.slice(1))||gt(n,hs(e))||gt(n,e))}function Ru(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:h,data:f,setupState:p,ctx:v,inheritAttrs:b}=n,g=Ia(n);let m,E;try{if(t.shapeFlag&4){const x=s||i,T=x;m=Jn(c.call(T,x,u,h,p,f,v)),E=o}else{const x=e;m=Jn(x.length>1?x(h,{attrs:o,slots:a,emit:l}):x(h,null)),E=e.props?o:Vm(o)}}catch(x){Ei.length=0,Qa(x,n,1),m=Xe(Rn)}let A=m;if(E&&b!==!1){const x=Object.keys(E),{shapeFlag:T}=A;x.length&&T&7&&(r&&x.some(Xa)&&(E=zm(E,r)),A=zs(A,E,!1,!0))}if(t.dirs&&(A=zs(A,null,!1,!0),A.dirs=A.dirs?A.dirs.concat(t.dirs):t.dirs),t.transition){const x=ja(A.type)&&zf(A)||A;La(x,t.transition)}return m=A,Ia(g),m}function Qf(n,e=!0){let t;for(let i=0;i<n.length;i++){const s=n[i];if(Vs(s)){if(s.type!==Rn||s.children==="v-if"){if(t)return;t=s}}else return}return t}const Vm=n=>{let e;for(const t in n)(t==="class"||t==="style"||$a(t))&&((e||(e={}))[t]=n[t]);return e},zm=(n,e)=>{const t={};for(const i in n)(!Xa(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function Wm(n,e,t){const{props:i,children:s,component:r}=n,{props:a,children:o,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?Pu(i,a,c):!!a;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(jf(a,i,f)&&!to(c,f))return!0}}}else return(s||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?Pu(i,a,c):!0:!!a;return!1}function Pu(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(!gt(n,r)||jf(e,n,r)&&!to(t,r))return!0}return!1}function jf(n,e,t){const i=n[t],s=e[t];return t==="style"&&bt(i)&&bt(s)?!Ys(i,s):i!==s}function $m({vnode:n,parent:e,suspense:t},i){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=e.vnode).el=i,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=i)}const eh={},th=()=>Object.create(eh),nh=n=>Object.getPrototypeOf(n)===eh;function Xm(n,e,t,i=!1){const s={},r=th();n.propsDefaults=Object.create(null),ih(n,e,s,r);for(const a in n.propsOptions[0])a in s||(s[a]=void 0);t?n.props=i?s:Lf(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function qm(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:a}}=n,o=yt(s),[l]=n.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(to(n.emitsOptions,f))continue;const p=e[f];if(l)if(gt(r,f))p!==r[f]&&(r[f]=p,c=!0);else{const v=fn(f);s[v]=bl(l,o,v,p,n,!1)}else p!==r[f]&&(r[f]=p,c=!0)}}}else{ih(n,e,s,r)&&(c=!0);let u;for(const h in o)(!e||!gt(e,h)&&((u=hs(h))===h||!gt(e,u)))&&(l?t&&(t[h]!==void 0||t[u]!==void 0)&&(s[h]=bl(l,o,h,void 0,n,!0)):delete s[h]);if(r!==o)for(const h in r)(!e||!gt(e,h))&&(delete r[h],c=!0)}c&&yi(n.attrs,"set","")}function ih(n,e,t,i){const[s,r]=n.propsOptions;let a=!1,o;if(e)for(let l in e){if(hr(l))continue;const c=e[l];let u;s&&gt(s,u=fn(l))?!r||!r.includes(u)?t[u]=c:(o||(o={}))[u]=c:to(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(r){const l=yt(t),c=o||Tt;for(let u=0;u<r.length;u++){const h=r[u];t[h]=bl(s,l,h,c[h],n,!gt(c,h))}}return a}function bl(n,e,t,i,s,r){const a=n[t];if(a!=null){const o=gt(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&nt(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const u=kr(s);i=c[t]=l.call(null,e),u()}}else i=l;s.ce&&s.ce._setProp(t,i)}a[0]&&(r&&!o?i=!1:a[1]&&(i===""||i===hs(t))&&(i=!0))}return i}const Ym=new WeakMap;function sh(n,e,t=!1){const i=t?Ym:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,a={},o=[];let l=!1;if(!nt(n)){const u=h=>{l=!0;const[f,p]=sh(h,e,!0);Yt(a,f),p&&o.push(...p)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return bt(n)&&i.set(n,ss),ss;if(Je(r))for(let u=0;u<r.length;u++){const h=fn(r[u]);Iu(h)&&(a[h]=Tt)}else if(r)for(const u in r){const h=fn(u);if(Iu(h)){const f=r[u],p=a[h]=Je(f)||nt(f)?{type:f}:Yt({},f),v=p.type;let b=!1,g=!0;if(Je(v))for(let m=0;m<v.length;++m){const E=v[m],A=nt(E)&&E.name;if(A==="Boolean"){b=!0;break}else A==="String"&&(g=!1)}else b=nt(v)&&v.name==="Boolean";p[0]=b,p[1]=g,(b||gt(p,"default"))&&o.push(h)}}const c=[a,o];return bt(n)&&i.set(n,c),c}function Iu(n){return n[0]!=="$"&&!hr(n)}const Dc=n=>n==="_"||n==="_ctx"||n==="$stable",Nc=n=>Je(n)?n.map(Jn):[Jn(n)],Km=(n,e,t)=>{if(e._n)return e;const i=Ve((...s)=>Nc(e(...s)),t);return i._c=!1,i},rh=(n,e,t)=>{const i=n._ctx;for(const s in n){if(Dc(s))continue;const r=n[s];if(nt(r))e[s]=Km(s,r,i);else if(r!=null){const a=Nc(r);e[s]=()=>a}}},ah=(n,e)=>{const t=Nc(e);n.slots.default=()=>t},oh=(n,e,t)=>{for(const i in e)(t||!Dc(i))&&(n[i]=e[i])},Zm=(n,e,t)=>{const i=n.slots=th();if(n.vnode.shapeFlag&32){const s=e._;s?(oh(i,e,t),t&&ff(i,"_",s,!0)):rh(e,i)}else e&&ah(n,e)},Jm=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,a=Tt;if(i.shapeFlag&32){const o=e._;o?t&&o===1?r=!1:oh(s,e,t):(r=!e.$stable,rh(e,s)),a=e}else e&&(ah(n,e),a={default:1});if(r)for(const o in s)!Dc(o)&&a[o]==null&&delete s[o]},mn=ng;function Qm(n){return jm(n)}function jm(n,e){const t=Ka();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:p=ni,insertStaticContent:v}=n,b=(M,P,V,X=null,Q=null,oe=null,le=void 0,me=null,_e=!!P.dynamicChildren)=>{if(M===P)return;M&&!js(M,P)&&(X=D(M),Re(M,Q,oe,!0),M=null),P.patchFlag===-2&&(_e=!1,P.dynamicChildren=null),P.dynamicChildren&&M&&M.dynamicChildren&&M.dynamicChildren.hasOnce&&(P.dynamicChildren===ss&&(P.dynamicChildren=[]),P.dynamicChildren.hasOnce=!0);const{type:fe,ref:Me,shapeFlag:ye}=P;switch(fe){case no:g(M,P,V,X);break;case Rn:m(M,P,V,X);break;case bo:M==null&&E(P,V,X,le);break;case Le:K(M,P,V,X,Q,oe,le,me,_e);break;default:ye&1?T(M,P,V,X,Q,oe,le,me,_e):ye&6?j(M,P,V,X,Q,oe,le,me,_e):(ye&64||ye&128)&&fe.process(M,P,V,X,Q,oe,le,me,_e,se)}Me!=null&&Q?_r(Me,M&&M.ref,oe,P||M,!P):Me==null&&M&&M.ref!=null&&_r(M.ref,null,oe,M,!0)},g=(M,P,V,X)=>{if(M==null)i(P.el=o(P.children),V,X);else{const Q=P.el=M.el;P.children!==M.children&&c(Q,P.children)}},m=(M,P,V,X)=>{M==null?i(P.el=l(P.children||""),V,X):P.el=M.el},E=(M,P,V,X)=>{[M.el,M.anchor]=v(M.children,P,V,X,M.el,M.anchor)},A=({el:M,anchor:P},V,X)=>{let Q;for(;M&&M!==P;)Q=f(M),i(M,V,X),M=Q;i(P,V,X)},x=({el:M,anchor:P})=>{let V;for(;M&&M!==P;)V=f(M),s(M),M=V;s(P)},T=(M,P,V,X,Q,oe,le,me,_e)=>{if(P.type==="svg"?le="svg":P.type==="math"&&(le="mathml"),M==null)w(P,V,X,Q,oe,le,me,_e);else{const fe=M.el&&M.el._isVueCE?M.el:null;try{fe&&fe._beginPatch(),R(M,P,Q,oe,le,me,_e)}finally{fe&&fe._endPatch()}}},w=(M,P,V,X,Q,oe,le,me)=>{let _e,fe;const{props:Me,shapeFlag:ye,transition:L,dirs:Be}=M;if(_e=M.el=a(M.type,oe,Me&&Me.is,Me),ye&8?u(_e,M.children):ye&16&&y(M.children,_e,null,X,Q,So(M,oe),le,me),Be&&Ki(M,null,X,"created"),I(_e,M,M.scopeId,le,X),Me){for(const C in Me)C!=="value"&&!hr(C)&&r(_e,C,null,Me[C],oe,X);"value"in Me&&r(_e,"value",null,Me.value,oe),(fe=Me.onVnodeBeforeMount)&&Xn(fe,X,M)}Be&&Ki(M,null,X,"beforeMount");const ke=eg(Q,L);ke&&L.beforeEnter(_e),i(_e,P,V),((fe=Me&&Me.onVnodeMounted)||ke||Be)&&mn(()=>{try{fe&&Xn(fe,X,M),ke&&L.enter(_e),Be&&Ki(M,null,X,"mounted")}finally{}},Q)},I=(M,P,V,X,Q)=>{if(V&&p(M,V),X)for(let oe=0;oe<X.length;oe++)p(M,X[oe]);if(Q){let oe=Q.subTree;if(P===oe||uh(oe.type)&&(oe.ssContent===P||oe.ssFallback===P)){const le=Q.vnode;I(M,le,le.scopeId,le.slotScopeIds,Q.parent)}}},y=(M,P,V,X,Q,oe,le,me,_e=0)=>{for(let fe=_e;fe<M.length;fe++){const Me=M[fe]=me?xi(M[fe]):Jn(M[fe]);b(null,Me,P,V,X,Q,oe,le,me)}},R=(M,P,V,X,Q,oe,le)=>{const me=P.el=M.el;let{patchFlag:_e,dynamicChildren:fe,dirs:Me}=P;_e|=M.patchFlag&16;const ye=M.props||Tt,L=P.props||Tt;let Be;if(V&&Zi(V,!1),(Be=L.onVnodeBeforeUpdate)&&Xn(Be,V,P,M),Me&&Ki(P,M,V,"beforeUpdate"),V&&Zi(V,!0),fe&&(!M.dynamicChildren||M.dynamicChildren.length!==fe.length)&&(_e=0,le=!1,fe=null),(ye.innerHTML&&L.innerHTML==null||ye.textContent&&L.textContent==null)&&u(me,""),fe?F(M.dynamicChildren,fe,me,V,X,So(P,Q),oe):le||ae(M,P,me,null,V,X,So(P,Q),oe,!1),_e>0){if(_e&16)G(me,ye,L,V,Q);else if(_e&2&&ye.class!==L.class&&r(me,"class",null,L.class,Q),_e&4&&r(me,"style",ye.style,L.style,Q),_e&8){const ke=P.dynamicProps;for(let C=0;C<ke.length;C++){const _=ke[C],k=ye[_],Y=L[_];(Y!==k||_==="value")&&r(me,_,k,Y,Q,V)}}_e&1&&M.children!==P.children&&u(me,P.children)}else!le&&fe==null&&G(me,ye,L,V,Q);((Be=L.onVnodeUpdated)||Me)&&mn(()=>{Be&&Xn(Be,V,P,M),Me&&Ki(P,M,V,"updated")},X)},F=(M,P,V,X,Q,oe,le)=>{for(let me=0;me<P.length;me++){const _e=M[me],fe=P[me],Me=_e.el||Ml(_e),ye=Me&&(_e.type===Le||!js(_e,fe)||_e.shapeFlag&198)?h(Me):V;b(_e,fe,ye,null,X,Q,oe,le,!0)}},G=(M,P,V,X,Q)=>{if(P!==V){if(P!==Tt)for(const oe in P)!hr(oe)&&!(oe in V)&&r(M,oe,P[oe],null,Q,X);for(const oe in V){if(hr(oe))continue;const le=V[oe],me=P[oe];le!==me&&oe!=="value"&&r(M,oe,me,le,Q,X)}"value"in V&&r(M,"value",P.value,V.value,Q)}},K=(M,P,V,X,Q,oe,le,me,_e)=>{const fe=P.el=M?M.el:o(""),Me=P.anchor=M?M.anchor:o("");let{patchFlag:ye,dynamicChildren:L,slotScopeIds:Be}=P;Be&&(me=me?me.concat(Be):Be),M==null?(i(fe,V,X),i(Me,V,X),y(P.children||[],V,Me,Q,oe,le,me,_e)):ye>0&&ye&64&&L&&M.dynamicChildren&&M.dynamicChildren.length===L.length?(F(M.dynamicChildren,L,V,Q,oe,le,me),(P.key!=null||Q&&P===Q.subTree)&&lh(M,P,!0)):ae(M,P,V,Me,Q,oe,le,me,_e)},j=(M,P,V,X,Q,oe,le,me,_e)=>{P.slotScopeIds=me,M==null?P.shapeFlag&512?Q.ctx.activate(P,V,X,le,_e):z(P,V,X,Q,oe,le,_e):O(M,P,_e)},z=(M,P,V,X,Q,oe,le)=>{const me=M.component=lg(M,X,Q);if(Lc(M)&&(me.ctx.renderer=se),ug(me,!1,le),me.asyncDep){if(Q&&Q.registerDep(me,q,le,oe),!M.el){const _e=me.subTree=Xe(Rn);m(null,_e,P,V),M.placeholder=_e.el}}else q(me,M,P,V,Q,oe,le)},O=(M,P,V)=>{const X=P.component=M.component;if(Wm(M,P,V))if(X.asyncDep&&!X.asyncResolved){P.el=M.el,P.placeholder=M.placeholder,H(X,P,V);return}else X.next=P,X.update();else P.el=M.el,P.placeholder=M.placeholder,X.vnode=P},q=(M,P,V,X,Q,oe,le)=>{const me=()=>{if(M.isMounted){let{next:ye,bu:L,u:Be,parent:ke,vnode:C}=M;{const ve=ch(M);if(ve){ye&&(ye.el=C.el,H(M,ye,le)),ve.asyncDep.then(()=>{mn(()=>{M.isUnmounted||fe()},Q)});return}}let _=ye,k;Zi(M,!1),ye?(ye.el=C.el,H(M,ye,le)):ye=C,L&&ya(L),(k=ye.props&&ye.props.onVnodeBeforeUpdate)&&Xn(k,ke,ye,C),Zi(M,!0);const Y=Ru(M),re=M.subTree;M.subTree=Y,b(re,Y,h(re.el),D(re),M,Q,oe),ye.el=Y.el,_===null&&$m(M,Y.el),Be&&mn(Be,Q),(k=ye.props&&ye.props.onVnodeUpdated)&&mn(()=>Xn(k,ke,ye,C),Q)}else{let ye;const{el:L,props:Be}=P,{bm:ke,m:C,parent:_,root:k,type:Y}=M,re=Fs(P);Zi(M,!1),ke&&ya(ke),!re&&(ye=Be&&Be.onVnodeBeforeMount)&&Xn(ye,_,P),Zi(M,!0);{k.ce&&k.ce._hasShadowRoot()&&k.ce._injectChildStyle(Y,M.parent?M.parent.type:void 0);const ve=M.subTree=Ru(M);b(null,ve,V,X,M,Q,oe),P.el=ve.el}if(C&&mn(C,Q),!re&&(ye=Be&&Be.onVnodeMounted)){const ve=P;mn(()=>Xn(ye,_,ve),Q)}(P.shapeFlag&256||_&&Fs(_.vnode)&&_.vnode.shapeFlag&256)&&M.a&&mn(M.a,Q),M.isMounted=!0,P=V=X=null}};M.scope.on();const _e=M.effect=new _f(me);M.scope.off();const fe=M.update=_e.run.bind(_e),Me=M.job=_e.runIfDirty.bind(_e);Me.i=M,Me.id=M.uid,_e.scheduler=()=>Ic(Me),Zi(M,!0),fe()},H=(M,P,V)=>{P.component=M;const X=M.vnode.props;M.vnode=P,M.next=null,qm(M,P.props,X,V),Jm(M,P.children,V),si(),Ff(M),ri()},ae=(M,P,V,X,Q,oe,le,me,_e=!1)=>{const fe=M&&M.children,Me=M?M.shapeFlag:0,ye=P.children,{patchFlag:L,shapeFlag:Be}=P;if(L>0){if(L&128){de(fe,ye,V,X,Q,oe,le,me,_e);return}else if(L&256){ne(fe,ye,V,X,Q,oe,le,me,_e);return}}Be&8?(Me&16&&Qe(fe,Q,oe),ye!==fe&&u(V,ye)):Me&16?Be&16?de(fe,ye,V,X,Q,oe,le,me,_e):Qe(fe,Q,oe,!0):(Me&8&&u(V,""),Be&16&&y(ye,V,X,Q,oe,le,me,_e))},ne=(M,P,V,X,Q,oe,le,me,_e)=>{M=M||ss,P=P||ss;const fe=M.length,Me=P.length,ye=Math.min(fe,Me);let L;for(L=0;L<ye;L++){const Be=P[L]=_e?xi(P[L]):Jn(P[L]);b(M[L],Be,V,null,Q,oe,le,me,_e)}fe>Me?Qe(M,Q,oe,!0,!1,ye):y(P,V,X,Q,oe,le,me,_e,ye)},de=(M,P,V,X,Q,oe,le,me,_e)=>{let fe=0;const Me=P.length;let ye=M.length-1,L=Me-1;for(;fe<=ye&&fe<=L;){const Be=M[fe],ke=P[fe]=_e?xi(P[fe]):Jn(P[fe]);if(js(Be,ke))b(Be,ke,V,null,Q,oe,le,me,_e);else break;fe++}for(;fe<=ye&&fe<=L;){const Be=M[ye],ke=P[L]=_e?xi(P[L]):Jn(P[L]);if(js(Be,ke))b(Be,ke,V,null,Q,oe,le,me,_e);else break;ye--,L--}if(fe>ye){if(fe<=L){const Be=L+1,ke=Be<Me?P[Be].el:X;for(;fe<=L;)b(null,P[fe]=_e?xi(P[fe]):Jn(P[fe]),V,ke,Q,oe,le,me,_e),fe++}}else if(fe>L)for(;fe<=ye;)Re(M[fe],Q,oe,!0),fe++;else{const Be=fe,ke=fe,C=new Map;for(fe=ke;fe<=L;fe++){const ce=P[fe]=_e?xi(P[fe]):Jn(P[fe]);ce.key!=null&&C.set(ce.key,fe)}let _,k=0;const Y=L-ke+1;let re=!1,ve=0;const be=new Array(Y);for(fe=0;fe<Y;fe++)be[fe]=0;for(fe=Be;fe<=ye;fe++){const ce=M[fe];if(k>=Y){Re(ce,Q,oe,!0);continue}let Se;if(ce.key!=null)Se=C.get(ce.key);else for(_=ke;_<=L;_++)if(be[_-ke]===0&&js(ce,P[_])){Se=_;break}Se===void 0?Re(ce,Q,oe,!0):(be[Se-ke]=fe+1,Se>=ve?ve=Se:re=!0,b(ce,P[Se],V,null,Q,oe,le,me,_e),k++)}const ue=re?tg(be):ss;for(_=ue.length-1,fe=Y-1;fe>=0;fe--){const ce=ke+fe,Se=P[ce],ze=P[ce+1],Ee=ce+1<Me?ze.el||Ml(ze):X;be[fe]===0?b(null,Se,V,Ee,Q,oe,le,me,_e):re&&(_<0||fe!==ue[_]?pe(Se,V,Ee,2):_--)}}},pe=(M,P,V,X,Q=null)=>{const{el:oe,type:le,transition:me,children:_e,shapeFlag:fe}=M;if(fe&6){pe(M.component.subTree,P,V,X);return}if(fe&128){M.suspense.move(P,V,X);return}if(fe&64){le.move(M,P,V,se);return}if(le===Le){i(oe,P,V);for(let ye=0;ye<_e.length;ye++)pe(_e[ye],P,V,X);i(M.anchor,P,V);return}if(le===bo){A(M,P,V);return}if(X!==2&&fe&1&&me)if(X===0)me.persisted&&!oe[xo]?i(oe,P,V):(me.beforeEnter(oe),i(oe,P,V),mn(()=>me.enter(oe),Q));else{const{leave:ye,delayLeave:L,afterLeave:Be}=me,ke=()=>{M.ctx.isUnmounted?s(oe):i(oe,P,V)},C=()=>{const _=oe._isLeaving||!!oe[xo];oe._isLeaving&&oe[xo](!0),me.persisted&&!_?ke():ye(oe,()=>{ke(),Be&&Be()})};L?L(oe,ke,C):C()}else i(oe,P,V)},Re=(M,P,V,X=!1,Q=!1)=>{const{type:oe,props:le,ref:me,children:_e,dynamicChildren:fe,shapeFlag:Me,patchFlag:ye,dirs:L,cacheIndex:Be,memo:ke}=M;if((ye===-2||fe&&fe.hasOnce)&&(Q=!1),me!=null&&(si(),_r(me,null,V,M,!0),ri()),Be!=null&&(!M.ctx||M.ctx===P)&&(P.renderCache[Be]=void 0),Me&256){P.ctx.deactivate(M);return}const C=Me&1&&L,_=!Fs(M);let k;if(_&&(k=le&&le.onVnodeBeforeUnmount)&&Xn(k,P,M),Me&6)et(M.component,V,X);else{if(Me&128){M.suspense.unmount(V,X);return}C&&Ki(M,null,P,"beforeUnmount"),Me&64?M.type.remove(M,P,V,se,X):fe&&!fe.hasOnce&&(oe!==Le||ye>0&&ye&64)?Qe(fe,P,V,!1,!0):(oe===Le&&ye&384||!Q&&Me&16)&&Qe(_e,P,V),X&&Oe(M)}const Y=ke!=null&&Be==null;(_&&(k=le&&le.onVnodeUnmounted)||C||Y)&&mn(()=>{k&&Xn(k,P,M),C&&Ki(M,null,P,"unmounted"),Y&&(M.el=null)},V)},Oe=M=>{const{type:P,el:V,anchor:X,transition:Q}=M,oe=P===Le;if(oe&&!Q){lt(V,X);return}if(P===bo){x(M),Q&&!Q.persisted&&Q.afterLeave&&Q.afterLeave();return}const le=oe?vl(M):M,me=()=>{oe?h(V)&&lt(V,X):s(V),Q&&!Q.persisted&&Q.afterLeave&&Q.afterLeave()};if(le&&le.shapeFlag&1&&Q&&!Q.persisted){const{leave:_e,delayLeave:fe}=Q,Me=le.el,ye=()=>_e(Me,me);fe?fe(Me,me,ye):ye()}else me()},lt=(M,P)=>{let V;for(;M!==P;)V=f(M),s(M),M=V;s(P)},et=(M,P,V)=>{const{bum:X,scope:Q,job:oe,subTree:le,um:me,m:_e,a:fe}=M;Lu(_e),Lu(fe),X&&ya(X),Q.stop(),oe?(oe.flags|=8,Re(le,M,P,V)):M.vnode.el&&le&&(le.transition=M.vnode.transition,Re(le,M,P,V)),me&&mn(me,P),mn(()=>{M.isUnmounted=!0},P)},Qe=(M,P,V,X=!1,Q=!1,oe=0)=>{for(let le=oe;le<M.length;le++)Re(M[le],P,V,X,Q)},D=M=>{if(M.shapeFlag&6)return D(M.component.subTree);if(M.shapeFlag&128)return M.suspense.next();const P=f(M.anchor||M.el),V=P&&P[mm];return V?f(V):P},W=(M,P,V)=>{const X=M&&P._vnode?void 0:M&&M.component?M.component.uid:og();dm(()=>{M==null?P._vnode&&Re(P._vnode,null,null,!0):b(P._vnode||null,M,P,null,null,null,V),P._vnode=M},X)},se={p:b,um:Re,m:pe,r:Oe,mt:z,mc:y,pc:ae,pbc:F,n:D,o:n};return{render:W,hydrate:void 0,createApp:Bm(W)}}function So({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Zi({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function eg(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function lh(n,e,t=!1){const i=n.children,s=e.children;if(Je(i)&&Je(s))for(let r=0;r<i.length;r++){const a=i[r];let o=s[r];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=s[r]=xi(s[r]),o.el=a.el),!t&&o.patchFlag!==-2&&lh(a,o)),o.type===no&&(o.patchFlag===-1&&(o=s[r]=xi(o)),o.el=a.el),o.type===Rn&&!o.el&&(o.el=a.el)}}function tg(n){const e=n.slice(),t=[0];let i,s,r,a,o;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,a=t.length-1;r<a;)o=r+a>>1,n[t[o]]<c?r=o+1:a=o;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,a=t[r-1];r-- >0;)t[r]=a,a=e[a];return t}function ch(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:ch(e)}function Lu(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function Ml(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?Ml(e.subTree):null}const uh=n=>n.__isSuspense;function ng(n,e){e&&e.pendingBranch?Je(n)?e.effects.push(...n):e.effects.push(n):um(n)}const Le=Symbol.for("v-fgt"),no=Symbol.for("v-txt"),Rn=Symbol.for("v-cmt"),bo=Symbol.for("v-stc"),Ei=[];let yn=null;function $(n=!1){Ei.push(yn=n?null:[])}function Uc(){Ei.pop(),yn=Ei[Ei.length-1]||null}let Tr=1;function Ua(n,e=!1){Tr+=n,n<0&&yn&&e&&(yn.hasOnce=!0)}function dh(n){return n.dynamicChildren=Tr>0?yn||ss:null,Uc(),Tr>0&&yn&&yn.push(n),n}function ee(n,e,t,i,s,r){return dh(d(n,e,t,i,s,r,!0))}function It(n,e,t,i,s){return dh(Xe(n,e,t,i,s,!0))}function Vs(n){return n?n.__v_isVNode===!0:!1}function js(n,e){return n.type===e.type&&n.key===e.key}const fh=({key:n})=>n??null,ba=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Ut(n)||tn(n)||nt(n)?{i:Xt,r:n,k:e,f:!!t}:n:null);function d(n,e=null,t=null,i=0,s=null,r=n===Le?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&fh(e),ref:e&&ba(e),scopeId:Hf,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Xt};return o?(Oa(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=Ut(t)?8:16),Tr>0&&!a&&yn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&yn.push(l),l}const Xe=ig;function ig(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===Rm)&&(n=Rn),Vs(n)){const o=zs(n,e,!0);return t&&Oa(o,t),Tr>0&&!r&&yn&&(o.shapeFlag&6?yn[yn.indexOf(n)]=o:yn.push(o)),o.patchFlag=-2,o}if(mg(n)&&(n=n.__vccOpts),e){e=sg(e);let{class:o,style:l}=e;o&&!Ut(o)&&(e.class=Dt(o)),bt(l)&&(Rc(l)&&!Je(l)&&(l=Yt({},l)),e.style=Za(l))}const a=Ut(n)?1:uh(n)?128:ja(n)?64:bt(n)?4:nt(n)?2:0;return d(n,e,t,i,s,a,r,!0)}function sg(n){return n?Rc(n)||nh(n)?Yt({},n):n:null}function zs(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:a,children:o,transition:l}=n,c=e?rg(s||{},e):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&fh(c),ref:e&&e.ref?t&&r?Je(r)?r.concat(ba(e)):[r,ba(e)]:ba(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Le?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&zs(n.ssContent),ssFallback:n.ssFallback&&zs(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce,cacheIndex:n.cacheIndex};return l&&i&&La(u,l.clone(u)),u}function ht(n=" ",e=0){return Xe(no,null,n,e)}function Bt(n="",e=!1){return e?($(),It(Rn,null,n)):Xe(Rn,null,n)}function Jn(n){return n==null||typeof n=="boolean"?Xe(Rn):Je(n)?Xe(Le,null,n.slice()):Vs(n)?xi(n):Xe(no,null,String(n))}function xi(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:zs(n)}function Oa(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Je(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),Oa(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!nh(e)?e._ctx=Xt:s===3&&Xt&&(Xt.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else if(nt(e)){if(i&65){Oa(n,{default:e});return}e={default:e,_ctx:Xt},t=32}else e=String(e),i&64?(t=16,e=[ht(e)]):t=8;n.children=e,n.shapeFlag|=t}function rg(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=Dt([e.class,i.class]));else if(s==="style")e.style=Za([e.style,i.style]);else if($a(s)){const r=e[s],a=i[s];a&&r!==a&&!(Je(r)&&r.includes(a))?e[s]=r?[].concat(r,a):a:a==null&&r==null&&!Xa(s)&&(e[s]=a)}else s!==""&&(e[s]=i[s])}return e}function Xn(n,e,t,i=null){Gn(n,e,7,[t,i])}const ag=Zf();let hh=0;function og(){return hh}function lg(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||ag,r={uid:hh++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Op(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:sh(i,s),emitsOptions:Jf(i,s),emit:null,emitted:null,propsDefaults:Tt,inheritAttrs:i.inheritAttrs,ctx:Tt,data:Tt,props:Tt,attrs:Tt,slots:Tt,refs:Tt,setupState:Tt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Hm.bind(null,r),n.ce&&n.ce(r),r}let jt=null;const cg=()=>jt||Xt;let Fa,Ar;{const n=Ka(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(a=>a(r)):s[0](r)}};Fa=e("__VUE_INSTANCE_SETTERS__",t=>jt=t),Ar=e("__VUE_SSR_SETTERS__",t=>wr=t)}const kr=n=>{const e=jt;return Fa(n),n.scope.on(),()=>{n.scope.off(),Fa(e)}},Du=()=>{jt&&jt.scope.off(),Fa(null)};function ph(n){return n.vnode.shapeFlag&4}let wr=!1;function ug(n,e=!1,t=!1){e&&Ar(e);const{props:i,children:s}=n.vnode,r=ph(n);Xm(n,i,r,e),Zm(n,s,t||e);const a=r?dg(n,e):void 0;return e&&Ar(!1),a}function dg(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Im);const{setup:i}=t;if(i){si();const s=n.setupContext=i.length>1?hg(n):null,r=kr(n),a=Fr(i,n,0,[n.props,s]),o=cf(a);if(ri(),r(),(o||n.sp)&&!Fs(n)&&$f(n),o){if(a.then(Du,Du),e)return a.then(l=>{Ar(!0);try{Nu(n,l,e)}finally{Ar(!1)}}).catch(l=>{Qa(l,n,0)});n.asyncDep=a}else Nu(n,a)}else mh(n)}function Nu(n,e,t){nt(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:bt(e)&&(n.setupState=Nf(e)),mh(n)}function mh(n,e,t){const i=n.type;n.render||(n.render=i.render||ni);{const s=kr(n);si();try{Lm(n)}finally{ri(),s()}}}const fg={get(n,e){return Qt(n,"get",""),n[e]}};function hg(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,fg),slots:n.slots,emit:n.emit,expose:e}}function io(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Nf(em(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in vr)return vr[t](n)},has(e,t){return t in e||t in vr}})):n.proxy}function pg(n,e=!0){return nt(n)?n.displayName||n.name:n.name||e&&n.__name}function mg(n){return nt(n)&&"__vccOpts"in n}const st=(n,e)=>rm(n,e,wr);function gh(n,e,t){try{Ua(-1);const i=arguments.length;return i===2?bt(e)&&!Je(e)?Vs(e)?Xe(n,null,[e]):Xe(n,e):Xe(n,null,e):(i>3?t=Array.prototype.slice.call(arguments,2):i===3&&Vs(t)&&(t=[t]),Xe(n,e,t))}finally{Ua(1)}}const gg="3.5.44";/**
* @vue/runtime-dom v3.5.44
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let El;const Uu=typeof window<"u"&&window.trustedTypes;if(Uu)try{El=Uu.createPolicy("vue",{createHTML:n=>n})}catch{}const _h=El?n=>El.createHTML(n):n=>n,_g="http://www.w3.org/2000/svg",vg="http://www.w3.org/1998/Math/MathML",vi=typeof document<"u"?document:null,Ou=vi&&vi.createElement("template"),xg={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?vi.createElementNS(_g,n):e==="mathml"?vi.createElementNS(vg,n):t?vi.createElement(n,{is:t}):vi.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>vi.createTextNode(n),createComment:n=>vi.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>vi.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const a=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{Ou.innerHTML=_h(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const o=Ou.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},yg=Symbol("_vtc");function Sg(n,e,t){const i=n[yg];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Fu=Symbol("_vod"),bg=Symbol("_vsh"),Mg=Symbol(""),Eg=/(?:^|;)\s*display\s*:/;function Tg(n,e,t){const i=n.style,s=Ut(t);let r=!1;if(t&&!s){if(e)if(Ut(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();t[o]==null&&ur(i,o,"")}else for(const a in e)t[a]==null&&ur(i,a,"");for(const a in t){a==="display"&&(r=!0);const o=t[a];o!=null?wg(n,a,!Ut(e)&&e?e[a]:void 0,o)||ur(i,a,o):ur(i,a,"")}}else if(s){if(e!==t){const a=i[Mg];a&&(t+=";"+a),i.cssText=t,r=Eg.test(t)}}else e&&n.removeAttribute("style");Fu in n&&((!s||e!==t)&&(n[Fu]=r?i.display:""),n[bg]&&(i.display="none"))}const Kr=/\s*!important$/;function ur(n,e,t){if(Je(t))t.forEach(i=>ur(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))Kr.test(t)?n.setProperty(e,t.replace(Kr,""),"important"):n.setProperty(e,t);else{const i=Ag(n,e);Kr.test(t)?n.setProperty(hs(i),t.replace(Kr,""),"important"):n[i]=t}}const Bu=["Webkit","Moz","ms"],Mo={};function Ag(n,e){const t=Mo[e];if(t)return t;let i=fn(e);if(i!=="filter"&&i in n)return Mo[e]=i;i=Ya(i);for(let s=0;s<Bu.length;s++){const r=Bu[s]+i;if(r in n)return Mo[e]=r}return e}function wg(n,e,t,i){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&Ut(i)&&t===i}const ku="http://www.w3.org/1999/xlink";function Hu(n,e,t,i,s,r=Dp(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(ku,e.slice(6,e.length)):n.setAttributeNS(ku,e,t):t==null||r&&!hf(t)?n.removeAttribute(e):n.setAttribute(e,r?"":Hn(t)?String(t):t)}function Gu(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?_h(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const o=r==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(o!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const o=typeof n[e];o==="boolean"?t=hf(t):t==null&&o==="string"?(t="",a=!0):o==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(s||e)}function is(n,e,t,i){n.addEventListener(e,t,i)}function Cg(n,e,t,i){n.removeEventListener(e,t,i)}const Vu=Symbol("_vei");function Rg(n,e,t,i,s=null){const r=n[Vu]||(n[Vu]={}),a=r[e];if(i&&a)a.value=i;else{const[o,l]=Lg(e);if(i){const c=r[e]=Ug(i,s);is(n,o,c,l)}else a&&(Cg(n,o,a,l),r[e]=void 0)}}const Pg=/(Once|Passive|Capture)$/,Ig=/^on:?(?:Once|Passive|Capture)$/;function Lg(n){let e,t;for(;(t=n.match(Pg))&&!Ig.test(n);)e||(e={}),n=n.slice(0,n.length-t[1].length),e[t[1].toLowerCase()]=!0;return[n[2]===":"?n.slice(3):hs(n.slice(2)),e]}let Eo=0;const Dg=Promise.resolve(),Ng=()=>Eo||(Dg.then(()=>Eo=0),Eo=Date.now());function Ug(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;const s=t.value;if(Je(s)){const r=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{r.call(i),i._stopped=!0};const a=s.slice(),o=[i];for(let l=0;l<a.length&&!i._stopped;l++){const c=a[l];c&&Gn(c,e,5,o)}}else Gn(s,e,5,[i])};return t.value=n,t.attached=Ng(),t}const zu=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,Og=(n,e,t,i,s,r)=>{const a=s==="svg";e==="class"?Sg(n,i,a):e==="style"?Tg(n,t,i):$a(e)?Xa(e)||Rg(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Fg(n,e,i,a))?(Gu(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Hu(n,e,i,a,r,e!=="value")):n._isVueCE&&(Bg(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!Ut(i)))?Gu(n,fn(e),i,r,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Hu(n,e,i,a))};function Fg(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&zu(e)&&nt(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return zu(e)&&Ut(t)?!1:e in n}function Bg(n,e){const t=n._def.props;if(!t)return!1;const i=fn(e);return Array.isArray(t)?t.some(s=>fn(s)===i):Object.keys(t).some(s=>fn(s)===i)}const Ba=n=>{const e=n.props["onUpdate:modelValue"]||!1;return Je(e)?t=>ya(e,t):e};function kg(n){n.target.composing=!0}function Wu(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const rs=Symbol("_assign"),Zr=Symbol("_initialValue");function To(n,e,t){return e&&(n=n.trim()),t&&(n=bc(n)),n}const vs={created(n,{modifiers:{lazy:e,trim:t,number:i}},s){n.parentNode&&(n.type==="text"?n[Zr]=n.defaultValue.replace(/[\r\n]/g,""):n.type==="textarea"&&(n[Zr]=n.defaultValue.replace(/\r\n?/g,`
`))),n[rs]=Ba(s);const r=i||s.props&&s.props.type==="number";is(n,e?"change":"input",a=>{a.target.composing||n[rs](To(n.value,t,r))}),(t||r)&&is(n,"change",()=>{n.value=To(n.value,t,r)}),e||(is(n,"compositionstart",kg),is(n,"compositionend",Wu),is(n,"change",Wu))},mounted(n,{value:e,modifiers:{trim:t,number:i}}){const s=e??"",r=n[Zr];delete n[Zr],r!==void 0&&(n.type==="text"||n.type==="textarea")&&n.value!==r?n[rs](To(n.value,t,i)):n.value=s},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:i,trim:s,number:r}},a){if(n[rs]=Ba(a),n.composing)return;const o=(r||n.type==="number")&&!/^0\d/.test(n.value)?bc(n.value):n.value,l=e??"";if(o===l)return;const c=n.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===n&&n.type!=="range"&&(i&&e===t||s&&n.value.trim()===l)||(n.value=l)}},Hg={deep:!0,created(n,e,t){n[rs]=Ba(t),is(n,"change",()=>{const i=n._modelValue,s=Gg(n),r=n.checked,a=n[rs];if(Je(i)){const o=pf(i,s),l=o!==-1;if(r&&!l)a(i.concat(s));else if(!r&&l){const c=[...i];c.splice(o,1),a(c)}}else if(Gs(i)){const o=new Set(i);r?o.add(s):o.delete(s),a(o)}else a(vh(n,r))})},mounted:$u,beforeUpdate(n,e,t){n[rs]=Ba(t),$u(n,e,t)}};function $u(n,{value:e,oldValue:t},i){n._modelValue=e;let s;if(Je(e))s=pf(e,i.props.value)>-1;else if(Gs(e))s=e.has(i.props.value);else{if(e===t)return;s=Ys(e,vh(n,!0))}n.checked!==s&&(n.checked=s)}function Gg(n){return"_value"in n?n._value:n.value}function vh(n,e){const t=e?"_trueValue":"_falseValue";return t in n?n[t]:e}const Vg=["ctrl","shift","alt","meta"],zg={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>Vg.some(t=>n[`${t}Key`]&&!e.includes(t))},xr=(n,e)=>{if(!n)return n;const t=n._withMods||(n._withMods={}),i=e.join(".");return t[i]||(t[i]=(s,...r)=>{for(let a=0;a<e.length;a++){const o=zg[e[a]];if(o&&o(s,e))return}return n(s,...r)})},Wg=Yt({patchProp:Og},xg);let Xu;function $g(){return Xu||(Xu=Qm(Wg))}const Xg=(...n)=>{const e=$g().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=Yg(i);if(!s)return;const r=e._component;!nt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=t(s,!1,qg(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e};function qg(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Yg(n){return Ut(n)?document.querySelector(n):n}const Kg="/images/Azamino-PNG-25.png",Oc="/images/logo.jpg",Zg="/images/header/informationheaderimage2.jpg",Jg="/images/header/serviceheader1.jpg",Qg="/images/header/serviceheader2.png",jg="/images/header/serviceheader4.jpg",e_="/images/header/serviceheader3.png",t_="/images/header/contactheaderimage.jpg";/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Ns=typeof document<"u";function xh(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function n_(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&xh(n.default)}const xt=Object.assign;function Ao(n,e){const t={};for(const i in e){const s=e[i];t[i]=Vn(s)?s.map(n):n(s)}return t}const yr=()=>{},Vn=Array.isArray;function qu(n,e){const t={};for(const i in n)t[i]=i in e?e[i]:n[i];return t}const yh=/#/g,i_=/&/g,s_=/\//g,r_=/=/g,a_=/\?/g,Sh=/\+/g,o_=/%5B/g,l_=/%5D/g,bh=/%5E/g,c_=/%60/g,Mh=/%7B/g,u_=/%7C/g,Eh=/%7D/g,d_=/%20/g;function Fc(n){return n==null?"":encodeURI(""+n).replace(u_,"|").replace(o_,"[").replace(l_,"]")}function f_(n){return Fc(n).replace(Mh,"{").replace(Eh,"}").replace(bh,"^")}function Tl(n){return Fc(n).replace(Sh,"%2B").replace(d_,"+").replace(yh,"%23").replace(i_,"%26").replace(c_,"`").replace(Mh,"{").replace(Eh,"}").replace(bh,"^")}function h_(n){return Tl(n).replace(r_,"%3D")}function p_(n){return Fc(n).replace(yh,"%23").replace(a_,"%3F")}function m_(n){return p_(n).replace(s_,"%2F")}function Cr(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const g_=/\/$/,__=n=>n.replace(g_,"");function wo(n,e,t="/"){let i,s={},r="",a="";const o=e.indexOf("#");let l=e.indexOf("?");return l=o>=0&&l>o?-1:l,l>=0&&(i=e.slice(0,l),r=e.slice(l,o>0?o:e.length),s=n(r.slice(1))),o>=0&&(i=i||e.slice(0,o),a=e.slice(o,e.length)),i=S_(i??e,t),{fullPath:i+r+a,path:i,query:s,hash:Cr(a)}}function v_(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function Yu(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function x_(n,e,t){const i=e.matched.length-1,s=t.matched.length-1;return i>-1&&i===s&&Ws(e.matched[i],t.matched[s])&&Th(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function Ws(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function Th(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(var t in n)if(!y_(n[t],e[t]))return!1;return!0}function y_(n,e){return Vn(n)?Ku(n,e):Vn(e)?Ku(e,n):(n==null?void 0:n.valueOf())===(e==null?void 0:e.valueOf())}function Ku(n,e){return Vn(e)?n.length===e.length&&n.every((t,i)=>t===e[i]):n.length===1&&n[0]===e}function S_(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),i=n.split("/"),s=i[i.length-1];(s===".."||s===".")&&i.push("");let r=t.length-1,a,o;for(a=0;a<i.length;a++)if(o=i[a],o!==".")if(o==="..")r>1&&r--;else break;return t.slice(0,r).join("/")+"/"+i.slice(a).join("/")}const Di={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Al=function(n){return n.pop="pop",n.push="push",n}({}),Co=function(n){return n.back="back",n.forward="forward",n.unknown="",n}({});function b_(n){if(!n)if(Ns){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),__(n)}const M_=/^[^#]+#/;function E_(n,e){return n.replace(M_,"#")+e}function T_(n,e){const t=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:e.behavior,left:i.left-t.left-(e.left||0),top:i.top-t.top-(e.top||0)}}const so=()=>({left:window.scrollX,top:window.scrollY});function A_(n){let e;if("el"in n){const t=n.el,i=typeof t=="string"&&t.startsWith("#"),s=typeof t=="string"?i?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!s)return;e=T_(s,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Zu(n,e){return(history.state?history.state.position-e:-1)+n}const wl=new Map;function w_(n,e){wl.set(n,e)}function C_(n){const e=wl.get(n);return wl.delete(n),e}function R_(n){return typeof n=="string"||n&&typeof n=="object"}function Ah(n){return typeof n=="string"||typeof n=="symbol"}let Lt=function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n}({});const wh=Symbol("");Lt.MATCHER_NOT_FOUND+"",Lt.NAVIGATION_GUARD_REDIRECT+"",Lt.NAVIGATION_ABORTED+"",Lt.NAVIGATION_CANCELLED+"",Lt.NAVIGATION_DUPLICATED+"";function $s(n,e){return xt(new Error,{type:n,[wh]:!0},e)}function fi(n,e){return n instanceof Error&&wh in n&&(e==null||!!(n.type&e))}const P_=["params","query","hash"];function I_(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const e={};for(const t of P_)t in n&&(e[t]=n[t]);return JSON.stringify(e,null,2)}function L_(n){const e={};if(n===""||n==="?")return e;const t=(n[0]==="?"?n.slice(1):n).split("&");for(let i=0;i<t.length;++i){const s=t[i].replace(Sh," "),r=s.indexOf("="),a=Cr(r<0?s:s.slice(0,r)),o=r<0?null:Cr(s.slice(r+1));if(a in e){let l=e[a];Vn(l)||(l=e[a]=[l]),l.push(o)}else e[a]=o}return e}function Ju(n){let e="";for(let t in n){const i=n[t];if(t=h_(t),i==null){i!==void 0&&(e+=(e.length?"&":"")+t);continue}(Vn(i)?i.map(s=>s&&Tl(s)):[i&&Tl(i)]).forEach(s=>{s!==void 0&&(e+=(e.length?"&":"")+t,s!=null&&(e+="="+s))})}return e}function D_(n){const e={};for(const t in n){const i=n[t];i!==void 0&&(e[t]=Vn(i)?i.map(s=>s==null?null:""+s):i==null?i:""+i)}return e}const N_=Symbol(""),Qu=Symbol(""),ro=Symbol(""),Bc=Symbol(""),Cl=Symbol("");function er(){let n=[];function e(i){return n.push(i),()=>{const s=n.indexOf(i);s>-1&&n.splice(s,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function Hi(n,e,t,i,s,r=a=>a()){const a=i&&(i.enterCallbacks[s]=i.enterCallbacks[s]||[]);return()=>new Promise((o,l)=>{const c=f=>{f===!1?l($s(Lt.NAVIGATION_ABORTED,{from:t,to:e})):f instanceof Error?l(f):R_(f)?l($s(Lt.NAVIGATION_GUARD_REDIRECT,{from:e,to:f})):(a&&i.enterCallbacks[s]===a&&typeof f=="function"&&a.push(f),o())},u=r(()=>n.call(i&&i.instances[s],e,t,c));let h=Promise.resolve(u);n.length<3&&(h=h.then(c)),h.catch(f=>l(f))})}function Ro(n,e,t,i,s=r=>r()){const r=[];for(const a of n)for(const o in a.components){let l=a.components[o];if(!(e!=="beforeRouteEnter"&&!a.instances[o]))if(xh(l)){const c=(l.__vccOpts||l)[e];c&&r.push(Hi(c,t,i,a,o,s))}else{let c=l();r.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${o}" at "${a.path}"`);const h=n_(u)?u.default:u;a.mods[o]=u,a.components[o]=h;const f=(h.__vccOpts||h)[e];return f&&Hi(f,t,i,a,o,s)()}))}}return r}function U_(n,e){const t=[],i=[],s=[],r=Math.max(e.matched.length,n.matched.length);for(let a=0;a<r;a++){const o=e.matched[a];o&&(n.matched.find(c=>Ws(c,o))?i.push(o):t.push(o));const l=n.matched[a];l&&(e.matched.find(c=>Ws(c,l))||s.push(l))}return[t,i,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let O_=()=>location.protocol+"//"+location.host;function Ch(n,e){const{pathname:t,search:i,hash:s}=e,r=n.indexOf("#");if(r>-1){let a=s.includes(n.slice(r))?n.slice(r).length:1,o=s.slice(a);return o[0]!=="/"&&(o="/"+o),Yu(o,"")}return Yu(t,n)+i+s}function F_(n,e,t,i){let s=[],r=[],a=null;const o=({state:f})=>{const p=Ch(n,location),v=t.value,b=e.value;let g=0;if(f){if(t.value=p,e.value=f,a&&a===v){a=null;return}g=b?f.position-b.position:0}else i(p);s.forEach(m=>{m(t.value,v,{delta:g,type:Al.pop,direction:g?g>0?Co.forward:Co.back:Co.unknown})})};function l(){a=t.value}function c(f){s.push(f);const p=()=>{const v=s.indexOf(f);v>-1&&s.splice(v,1)};return r.push(p),p}function u(){if(document.visibilityState==="hidden"){const{history:f}=window;if(!f.state)return;f.replaceState(xt({},f.state,{scroll:so()}),"")}}function h(){for(const f of r)f();r=[],window.removeEventListener("popstate",o),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",o),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:l,listen:c,destroy:h}}function ju(n,e,t,i=!1,s=!1){return{back:n,current:e,forward:t,replaced:i,position:window.history.length,scroll:s?so():null}}function B_(n){const{history:e,location:t}=window,i={value:Ch(n,t)},s={value:e.state};s.value||r(i.value,{back:null,current:i.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function r(l,c,u){const h=n.indexOf("#"),f=h>-1?(t.host&&document.querySelector("base")?n:n.slice(h))+l:O_()+n+l;try{e[u?"replaceState":"pushState"](c,"",f),s.value=c}catch(p){console.error(p),t[u?"replace":"assign"](f)}}function a(l,c){r(l,xt({},e.state,ju(s.value.back,l,s.value.forward,!0),c,{position:s.value.position}),!0),i.value=l}function o(l,c){const u=xt({},s.value,e.state,{forward:l,scroll:so()});r(u.current,u,!0),r(l,xt({},ju(i.value,l,null),{position:u.position+1},c),!1),i.value=l}return{location:i,state:s,push:o,replace:a}}function k_(n){n=b_(n);const e=B_(n),t=F_(n,e.state,e.location,e.replace);function i(r,a=!0){a||t.pauseListeners(),history.go(r)}const s=xt({location:"",base:n,go:i,createHref:E_.bind(null,n)},e,t);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}let as=function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n}({});var Gt=function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n}(Gt||{});const H_={type:as.Static,value:""},G_=/[a-zA-Z0-9_]/;function V_(n){if(!n)return[[]];if(n==="/")return[[H_]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(p){throw new Error(`ERR (${t})/"${c}": ${p}`)}let t=Gt.Static,i=t;const s=[];let r;function a(){r&&s.push(r),r=[]}let o=0,l,c="",u="";function h(){c&&(t===Gt.Static?r.push({type:as.Static,value:c}):t===Gt.Param||t===Gt.ParamRegExp||t===Gt.ParamRegExpEnd?(r.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:as.Param,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function f(){c+=l}for(;o<n.length;){if(l=n[o++],l==="\\"&&t!==Gt.ParamRegExp){i=t,t=Gt.EscapeNext;continue}switch(t){case Gt.Static:l==="/"?(c&&h(),a()):l===":"?(h(),t=Gt.Param):f();break;case Gt.EscapeNext:f(),t=i;break;case Gt.Param:l==="("?t=Gt.ParamRegExp:G_.test(l)?f():(h(),t=Gt.Static,l!=="*"&&l!=="?"&&l!=="+"&&o--);break;case Gt.ParamRegExp:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:t=Gt.ParamRegExpEnd:u+=l;break;case Gt.ParamRegExpEnd:h(),t=Gt.Static,l!=="*"&&l!=="?"&&l!=="+"&&o--,u="";break;default:e("Unknown state");break}}return t===Gt.ParamRegExp&&e(`Unfinished custom RegExp for param "${c}"`),h(),a(),s}const ed="[^/]+?",z_={sensitive:!1,strict:!1,start:!0,end:!0};var un=function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n}(un||{});const W_=/[.+*?^${}()[\]/\\]/g;function $_(n,e){const t=xt({},z_,e),i=[];let s=t.start?"^":"";const r=[];for(const c of n){const u=c.length?[]:[un.Root];t.strict&&!c.length&&(s+="/");for(let h=0;h<c.length;h++){const f=c[h];let p=un.Segment+(t.sensitive?un.BonusCaseSensitive:0);if(f.type===as.Static)h||(s+="/"),s+=f.value.replace(W_,"\\$&"),p+=un.Static;else if(f.type===as.Param){const{value:v,repeatable:b,optional:g,regexp:m}=f;r.push({name:v,repeatable:b,optional:g});const E=m||ed;if(E!==ed){p+=un.BonusCustomRegExp;try{`${E}`}catch(x){throw new Error(`Invalid custom RegExp for param "${v}" (${E}): `+x.message)}}let A=b?`((?:${E})(?:/(?:${E}))*)`:`(${E})`;h||(A=g&&c.length<2?`(?:/${A})`:"/"+A),g&&(A+="?"),s+=A,p+=un.Dynamic,g&&(p+=un.BonusOptional),b&&(p+=un.BonusRepeatable),E===".*"&&(p+=un.BonusWildcard)}u.push(p)}i.push(u)}if(t.strict&&t.end){const c=i.length-1;i[c][i[c].length-1]+=un.BonusStrict}t.strict||(s+="/?"),t.end?s+="$":t.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const a=new RegExp(s,t.sensitive?"":"i");function o(c){const u=c.match(a),h={};if(!u)return null;for(let f=1;f<u.length;f++){const p=u[f]||"",v=r[f-1];h[v.name]=p&&v.repeatable?p.split("/"):p}return h}function l(c){let u="",h=!1;for(const f of n){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const p of f)if(p.type===as.Static)u+=p.value;else if(p.type===as.Param){const{value:v,repeatable:b,optional:g}=p,m=v in c?c[v]:"";if(Vn(m)&&!b)throw new Error(`Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`);const E=Vn(m)?m.join("/"):m;if(!E)if(g)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${v}"`);u+=E}}return u||"/"}return{re:a,score:i,keys:r,parse:o,stringify:l}}function X_(n,e){let t=0;for(;t<n.length&&t<e.length;){const i=e[t]-n[t];if(i)return i;t++}return n.length<e.length?n.length===1&&n[0]===un.Static+un.Segment?-1:1:n.length>e.length?e.length===1&&e[0]===un.Static+un.Segment?1:-1:0}function Rh(n,e){let t=0;const i=n.score,s=e.score;for(;t<i.length&&t<s.length;){const r=X_(i[t],s[t]);if(r)return r;t++}if(Math.abs(s.length-i.length)===1){if(td(i))return 1;if(td(s))return-1}return s.length-i.length}function td(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const q_={strict:!1,end:!0,sensitive:!1};function Y_(n,e,t){const i=$_(V_(n.path),t),s=xt(i,{record:n,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function K_(n,e){const t=[],i=new Map;e=qu(q_,e);function s(h){return i.get(h)}function r(h,f,p){const v=!p,b=id(h);b.aliasOf=p&&p.record;const g=qu(e,h),m=[b];if("alias"in h){const x=typeof h.alias=="string"?[h.alias]:h.alias;for(const T of x)m.push(id(xt({},b,{components:p?p.record.components:b.components,path:T,aliasOf:p?p.record:b})))}let E,A;for(const x of m){const{path:T}=x;if(f&&T[0]!=="/"){const w=f.record.path,I=w[w.length-1]==="/"?"":"/";x.path=f.record.path+(T&&I+T)}if(E=Y_(x,f,g),p?p.alias.push(E):(A=A||E,A!==E&&A.alias.push(E),v&&h.name&&!sd(E)&&a(h.name)),Ph(E)&&l(E),b.children){const w=b.children;for(let I=0;I<w.length;I++)r(w[I],E,p&&p.children[I])}p=p||E}return A?()=>{a(A)}:yr}function a(h){if(Ah(h)){const f=i.get(h);f&&(i.delete(h),t.splice(t.indexOf(f),1),f.children.forEach(a),f.alias.forEach(a))}else{const f=t.indexOf(h);f>-1&&(t.splice(f,1),h.record.name&&i.delete(h.record.name),h.children.forEach(a),h.alias.forEach(a))}}function o(){return t}function l(h){const f=Q_(h,t);t.splice(f,0,h),h.record.name&&!sd(h)&&i.set(h.record.name,h)}function c(h,f){let p,v={},b,g;if("name"in h&&h.name){if(p=i.get(h.name),!p)throw $s(Lt.MATCHER_NOT_FOUND,{location:h});g=p.record.name,v=xt(nd(f.params,p.keys.filter(A=>!A.optional).concat(p.parent?p.parent.keys.filter(A=>A.optional):[]).map(A=>A.name)),h.params&&nd(h.params,p.keys.map(A=>A.name))),b=p.stringify(v)}else if(h.path!=null)b=h.path,p=t.find(A=>A.re.test(b)),p&&(v=p.parse(b),g=p.record.name);else{if(p=f.name?i.get(f.name):t.find(A=>A.re.test(f.path)),!p)throw $s(Lt.MATCHER_NOT_FOUND,{location:h,currentLocation:f});g=p.record.name,v=xt({},f.params,h.params),b=p.stringify(v)}const m=[];let E=p;for(;E;)m.unshift(E.record),E=E.parent;return{name:g,path:b,params:v,matched:m,meta:J_(m)}}n.forEach(h=>r(h));function u(){t.length=0,i.clear()}return{addRoute:r,resolve:c,removeRoute:a,clearRoutes:u,getRoutes:o,getRecordMatcher:s}}function nd(n,e){const t={};for(const i of e)i in n&&(t[i]=n[i]);return t}function id(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:Z_(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function Z_(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const i in n.components)e[i]=typeof t=="object"?t[i]:t;return e}function sd(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function J_(n){return n.reduce((e,t)=>xt(e,t.meta),{})}function Q_(n,e){let t=0,i=e.length;for(;t!==i;){const r=t+i>>1;Rh(n,e[r])<0?i=r:t=r+1}const s=j_(n);return s&&(i=e.lastIndexOf(s,i-1)),i}function j_(n){let e=n;for(;e=e.parent;)if(Ph(e)&&Rh(n,e)===0)return e}function Ph({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function rd(n){const e=Bn(ro),t=Bn(Bc),i=st(()=>{const l=En(n.to);return e.resolve(l)}),s=st(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],h=t.matched;if(!u||!h.length)return-1;const f=h.findIndex(Ws.bind(null,u));if(f>-1)return f;const p=ad(l[c-2]);return c>1&&ad(u)===p&&h[h.length-1].path!==p?h.findIndex(Ws.bind(null,l[c-2])):f}),r=st(()=>s.value>-1&&sv(t.params,i.value.params)),a=st(()=>s.value>-1&&s.value===t.matched.length-1&&Th(t.params,i.value.params));function o(l={}){if(iv(l)){const c=e[En(n.replace)?"replace":"push"](En(n.to)).catch(yr);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:i,href:st(()=>i.value.href),isActive:r,isExactActive:a,navigate:o}}function ev(n){return n.length===1?n[0]:n}const tv=Wf({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:rd,setup(n,{slots:e}){const t=Or(rd(n)),{options:i}=Bn(ro),s=st(()=>({[od(n.activeClass,i.linkActiveClass,"router-link-active")]:t.isActive,[od(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const r=e.default&&ev(e.default(t));return n.custom?r:gh("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:s.value},r)}}}),nv=tv;function iv(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function sv(n,e){for(const t in e){const i=e[t],s=n[t];if(typeof i=="string"){if(i!==s)return!1}else if(!Vn(s)||s.length!==i.length||i.some((r,a)=>r.valueOf()!==s[a].valueOf()))return!1}return!0}function ad(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const od=(n,e,t)=>n??e??t,rv=Wf({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const i=Bn(Cl),s=st(()=>n.route||i.value),r=Bn(Qu,0),a=st(()=>{let c=En(r);const{matched:u}=s.value;let h;for(;(h=u[c])&&!h.components;)c++;return c}),o=st(()=>s.value.matched[a.value]);Sa(Qu,st(()=>a.value+1)),Sa(N_,o),Sa(Cl,s);const l=Nt();return gr(()=>[l.value,o.value,n.name],([c,u,h],[f,p,v])=>{u&&(u.instances[h]=c,p&&p!==u&&c&&c===f&&(u.leaveGuards.size||(u.leaveGuards=p.leaveGuards),u.updateGuards.size||(u.updateGuards=p.updateGuards))),c&&u&&(!p||!Ws(u,p)||!f)&&(u.enterCallbacks[h]||[]).forEach(b=>b(c))},{flush:"post"}),()=>{const c=s.value,u=n.name,h=o.value,f=h&&h.components[u];if(!f)return ld(t.default,{Component:f,route:c});const p=h.props[u],v=p?p===!0?c.params:typeof p=="function"?p(c):p:null,g=gh(f,xt({},v,e,{onVnodeUnmounted:m=>{m.component.isUnmounted&&(h.instances[u]=null)},ref:l}));return ld(t.default,{Component:g,route:c})||g}}});function ld(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const av=rv;function ov(n){const e=K_(n.routes,n),t=n.parseQuery||L_,i=n.stringifyQuery||Ju,s=n.history,r=er(),a=er(),o=er(),l=tm(Di);let c=Di;Ns&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Ao.bind(null,D=>""+D),h=Ao.bind(null,m_),f=Ao.bind(null,Cr);function p(D,W){let se,xe;return Ah(D)?(se=e.getRecordMatcher(D),xe=W):xe=D,e.addRoute(xe,se)}function v(D){const W=e.getRecordMatcher(D);W&&e.removeRoute(W)}function b(){return e.getRoutes().map(D=>D.record)}function g(D){return!!e.getRecordMatcher(D)}function m(D,W){if(W=xt({},W||l.value),typeof D=="string"){const X=wo(t,D,W.path),Q=e.resolve({path:X.path},W),oe=s.createHref(X.fullPath);return xt(X,Q,{params:f(Q.params),hash:Cr(X.hash),redirectedFrom:void 0,href:oe})}let se;if(D.path!=null)se=xt({},D,{path:wo(t,D.path,W.path).path});else{const X=xt({},D.params);for(const Q in X)X[Q]==null&&delete X[Q];se=xt({},D,{params:h(X)}),W.params=h(W.params)}const xe=e.resolve(se,W),M=D.hash||"";xe.params=u(f(xe.params));const P=v_(i,xt({},D,{hash:f_(M),path:xe.path})),V=s.createHref(P);return xt({fullPath:P,hash:M,query:i===Ju?D_(D.query):D.query||{}},xe,{redirectedFrom:void 0,href:V})}function E(D){return typeof D=="string"?wo(t,D,l.value.path):xt({},D)}function A(D,W){if(c!==D)return $s(Lt.NAVIGATION_CANCELLED,{from:W,to:D})}function x(D){return I(D)}function T(D){return x(xt(E(D),{replace:!0}))}function w(D,W){const se=D.matched[D.matched.length-1];if(se&&se.redirect){const{redirect:xe}=se;let M=typeof xe=="function"?xe(D,W):xe;return typeof M=="string"&&(M=M.includes("?")||M.includes("#")?M=E(M):{path:M},M.params={}),xt({query:D.query,hash:D.hash,params:M.path!=null?{}:D.params},M)}}function I(D,W){const se=c=m(D),xe=l.value,M=D.state,P=D.force,V=D.replace===!0,X=w(se,xe);if(X)return I(xt(E(X),{state:typeof X=="object"?xt({},M,X.state):M,force:P,replace:V}),W||se);const Q=se;Q.redirectedFrom=W;let oe;return!P&&x_(i,xe,se)&&(oe=$s(Lt.NAVIGATION_DUPLICATED,{to:Q,from:xe}),pe(xe,xe,!0,!1)),(oe?Promise.resolve(oe):F(Q,xe)).catch(le=>fi(le)?fi(le,Lt.NAVIGATION_GUARD_REDIRECT)?le:de(le):ae(le,Q,xe)).then(le=>{if(le){if(fi(le,Lt.NAVIGATION_GUARD_REDIRECT))return I(xt({replace:V},E(le.to),{state:typeof le.to=="object"?xt({},M,le.to.state):M,force:P}),W||Q)}else le=K(Q,xe,!0,V,M);return G(Q,xe,le),le})}function y(D,W){const se=A(D,W);return se?Promise.reject(se):Promise.resolve()}function R(D){const W=lt.values().next().value;return W&&typeof W.runWithContext=="function"?W.runWithContext(D):D()}function F(D,W){let se;const[xe,M,P]=U_(D,W);se=Ro(xe.reverse(),"beforeRouteLeave",D,W);for(const X of xe)X.leaveGuards.forEach(Q=>{se.push(Hi(Q,D,W))});const V=y.bind(null,D,W);return se.push(V),Qe(se).then(()=>{se=[];for(const X of r.list())se.push(Hi(X,D,W));return se.push(V),Qe(se)}).then(()=>{se=Ro(M,"beforeRouteUpdate",D,W);for(const X of M)X.updateGuards.forEach(Q=>{se.push(Hi(Q,D,W))});return se.push(V),Qe(se)}).then(()=>{se=[];for(const X of P)if(X.beforeEnter)if(Vn(X.beforeEnter))for(const Q of X.beforeEnter)se.push(Hi(Q,D,W));else se.push(Hi(X.beforeEnter,D,W));return se.push(V),Qe(se)}).then(()=>(D.matched.forEach(X=>X.enterCallbacks={}),se=Ro(P,"beforeRouteEnter",D,W,R),se.push(V),Qe(se))).then(()=>{se=[];for(const X of a.list())se.push(Hi(X,D,W));return se.push(V),Qe(se)}).catch(X=>fi(X,Lt.NAVIGATION_CANCELLED)?X:Promise.reject(X))}function G(D,W,se){o.list().forEach(xe=>R(()=>xe(D,W,se)))}function K(D,W,se,xe,M){const P=A(D,W);if(P)return P;const V=W===Di,X=Ns?history.state:{};se&&(xe||V?s.replace(D.fullPath,xt({scroll:V&&X&&X.scroll},M)):s.push(D.fullPath,M)),l.value=D,pe(D,W,se,V),de()}let j;function z(){j||(j=s.listen((D,W,se)=>{if(!et.listening)return;const xe=m(D),M=w(xe,et.currentRoute.value);if(M){I(xt(M,{replace:!0,force:!0}),xe).catch(yr);return}c=xe;const P=l.value;Ns&&w_(Zu(P.fullPath,se.delta),so()),F(xe,P).catch(V=>fi(V,Lt.NAVIGATION_ABORTED|Lt.NAVIGATION_CANCELLED)?V:fi(V,Lt.NAVIGATION_GUARD_REDIRECT)?(I(xt(E(V.to),{force:!0}),xe).then(X=>{fi(X,Lt.NAVIGATION_ABORTED|Lt.NAVIGATION_DUPLICATED)&&!se.delta&&se.type===Al.pop&&s.go(-1,!1)}).catch(yr),Promise.reject()):(se.delta&&s.go(-se.delta,!1),ae(V,xe,P))).then(V=>{V=V||K(xe,P,!1),V&&(se.delta&&!fi(V,Lt.NAVIGATION_CANCELLED)?s.go(-se.delta,!1):se.type===Al.pop&&fi(V,Lt.NAVIGATION_ABORTED|Lt.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),G(xe,P,V)}).catch(yr)}))}let O=er(),q=er(),H;function ae(D,W,se){de(D);const xe=q.list();return xe.length?xe.forEach(M=>M(D,W,se)):console.error(D),Promise.reject(D)}function ne(){return H&&l.value!==Di?Promise.resolve():new Promise((D,W)=>{O.add([D,W])})}function de(D){return H||(H=!D,z(),O.list().forEach(([W,se])=>D?se(D):W()),O.reset()),D}function pe(D,W,se,xe){const{scrollBehavior:M}=n;if(!Ns||!M)return Promise.resolve();const P=!se&&C_(Zu(D.fullPath,0))||(xe||!se)&&history.state&&history.state.scroll||null;return Pc().then(()=>M(D,W,P)).then(V=>V&&A_(V)).catch(V=>ae(V,D,W))}const Re=D=>s.go(D);let Oe;const lt=new Set,et={currentRoute:l,listening:!0,addRoute:p,removeRoute:v,clearRoutes:e.clearRoutes,hasRoute:g,getRoutes:b,resolve:m,options:n,push:x,replace:T,go:Re,back:()=>Re(-1),forward:()=>Re(1),beforeEach:r.add,beforeResolve:a.add,afterEach:o.add,onError:q.add,isReady:ne,install(D){D.component("RouterLink",nv),D.component("RouterView",av),D.config.globalProperties.$router=et,Object.defineProperty(D.config.globalProperties,"$route",{enumerable:!0,get:()=>En(l)}),Ns&&!Oe&&l.value===Di&&(Oe=!0,x(s.location).catch(xe=>{}));const W={};for(const xe in Di)Object.defineProperty(W,xe,{get:()=>l.value[xe],enumerable:!0});D.provide(ro,et),D.provide(Bc,Lf(W)),D.provide(Cl,l);const se=D.unmount;lt.add(D),D.unmount=function(){lt.delete(D),lt.size<1&&(c=Di,j&&j(),j=null,l.value=Di,Oe=!1,H=!1),se()}}};function Qe(D){return D.reduce((W,se)=>W.then(()=>R(se)),Promise.resolve())}return et}function lv(){return Bn(ro)}function Ih(n){return Bn(Bc)}const cv=()=>{try{const n=localStorage.getItem("site_lang");if(n&&["ja","en","ko"].includes(n))return n}catch{}return"ja"},Fe=Nt(cv());function Po(n){if(["ja","en","ko"].includes(n)){Fe.value=n;try{localStorage.setItem("site_lang",n)}catch{}}}const hn=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t},uv={class:"header-inner-container"},dv={class:"header-logo-area"},fv={key:0,src:Kg,alt:"AZAMINO Inc",class:"header-brand-logo",loading:"eager",decoding:"sync"},hv={key:1,src:Oc,alt:"AZAMINO Inc",class:"header-brand-logo1",loading:"eager",decoding:"sync"},pv={class:"nav-menu-list"},mv=["onClick"],gv=["onClick"],_v={class:"nav-title-text"},vv={class:"nav-title-text"},xv={key:2,class:"mobile-sub-list"},yv={class:"header-utility-group"},Sv={class:"mitsui-lang-box"},bv={class:"mega-menu-content-wrap"},Mv={class:"mega-menu-left-title-box"},Ev={class:"mega-category-title"},Tv={class:"mega-category-sub"},Av={key:0,class:"mega-menu-layout-company"},wv={class:"mega-company-links"},Cv={class:"mega-company-item"},Rv={class:"mega-item-name"},Pv={href:"/downloads/company-brochure.pdf",download:"AZAMINO_회사소개서.pdf",class:"mega-brochure-download-link",title:"회사소개서 다운로드"},Iv={class:"mega-company-item"},Lv={class:"mega-item-name"},Dv={class:"mega-header-image-box"},Nv={key:1,class:"mega-menu-layout-service"},Uv={class:"mega-service-cards-grid"},Ov={class:"mega-service-info"},Fv={class:"mega-service-name"},Bv={class:"mega-service-info"},kv={class:"mega-service-name"},Hv={class:"mega-service-info"},Gv={class:"mega-service-name"},Vv={class:"mega-service-info"},zv={class:"mega-service-name"},Wv={key:2,class:"mega-menu-layout-contact"},$v={class:"mega-contact-links"},Xv={class:"mega-item-name"},qv={class:"mega-item-name"},Yv={class:"mega-header-image-box"},Kv={key:3,class:"mega-menu-right-grid"},Zv={class:"mega-item-name"},Jv={__name:"Header",props:{languages:{type:Array,default:()=>[{code:"ko",name:"kor",url:"/kr"},{code:"ja",name:"jpn",url:"/jp"},{code:"en",name:"eng",url:"/en"}]},menuItems:{type:Array,default:()=>[]}},setup(n){const e=n,t=Ih(),i=lv(),s=Nt(!1),r=Nt(!1),a=Nt(null),o=st(()=>s.value||a.value!==null),l=st(()=>a.value&&e.menuItems.find(E=>E.id===a.value)||null),c=E=>({company:"COMPANY INFO",service:"BUSINESS DIVISIONS",contact:"CONTACT US"})[E]||"",u=()=>Fe.value==="ja"?"会社紹介書ダウンロード (PDF)":Fe.value==="en"?"Company Brochure (PDF)":"회사소개서 다운로드 (PDF)",h=(E,A)=>{const x=e.menuItems.find(w=>w.id===E);if(x&&x.subItems){const w=x.subItems.find(I=>I.url===A);if(w)return w.name}return{"/greeting":Fe.value==="ja"?"ご挨拶":Fe.value==="en"?"CEO Message":"인사말","/overview":Fe.value==="ja"?"企業理念":Fe.value==="en"?"Corporate Philosophy":"경영이념","/food":Fe.value==="ja"?"介護食品":Fe.value==="en"?"Care Food":"개호식품","/money":Fe.value==="ja"?"金庫":Fe.value==="en"?"Safes":"금고","/product":Fe.value==="ja"?"生活用品":Fe.value==="en"?"Living Goods":"생활용품","/chemical":Fe.value==="ja"?"化学製品":Fe.value==="en"?"Chemicals":"화학제품","/quiry":Fe.value==="ja"?"オンラインお問い合わせ":Fe.value==="en"?"Online Inquiry":"온라인 문의","/location":Fe.value==="ja"?"アクセス":Fe.value==="en"?"Location & Access":"오시는 길"}[A]||""},f=E=>!!(t.path===E.url||E.subItems&&E.subItems.some(A=>A.url===t.path)||E.id==="company"&&["/company","/information","/greeting","/overview","/history","/ci","/idea","/philosophy"].includes(t.path)||E.id==="service"&&["/service","/business","/food","/money","/product","/chemical"].includes(t.path)||E.id==="contact"&&["/contact","/quiry","/location"].includes(t.path)),p=E=>{E.subItems&&E.subItems.length>0?a.value=a.value===E.id?null:E.id:(a.value=null,r.value=!1,E.url&&E.url!==t.path&&i.push(E.url))},v=()=>{a.value=null,r.value=!1},b=()=>{a.value=null,r.value=!1},g=()=>{const E=window.scrollY||document.documentElement.scrollTop;s.value=E>20},m=E=>{const A=document.querySelector(".mitsui-style-header");A&&!A.contains(E.target)&&(a.value=null)};return gr(()=>t.path,()=>{a.value=null,r.value=!1,g()}),Br(()=>{try{const E=localStorage.getItem("site_lang");E&&(Fe.value=E)}catch{}window.addEventListener("scroll",g,{passive:!0}),document.addEventListener("click",m),g()}),Ks(()=>{window.removeEventListener("scroll",g),document.removeEventListener("click",m)}),(E,A)=>{const x=rn("router-link");return $(),ee("header",{class:Dt(["mitsui-style-header",{"is-scrolled":s.value,"is-white-theme":o.value,"has-active-dropdown":a.value!==null,"is-mobile-open":r.value}])},[d("div",uv,[d("div",dv,[Xe(x,{to:"/",class:"logo-link",title:"AZAMINO",onClick:v},{default:Ve(()=>[o.value?($(),ee("img",hv)):($(),ee("img",fv))]),_:1})]),d("button",{class:"header-mobile-toggle",onClick:A[0]||(A[0]=T=>r.value=!r.value),"aria-label":"메뉴 열기/닫기"},[d("span",{class:Dt(["hamburger-bar",{open:r.value}])},null,2)]),d("nav",{class:Dt(["header-main-nav",{"mobile-open":r.value}])},[d("ul",pv,[($(!0),ee(Le,null,Ke(n.menuItems,T=>($(),ee("li",{key:T.id,class:Dt(["nav-menu-item",{"has-dropdown":T.subItems&&T.subItems.length>0,"is-active-menu":f(T),"is-menu-open":a.value===T.id}]),onClick:xr(w=>p(T),["stop"])},[T.subItems&&T.subItems.length>0?($(),ee("button",{key:0,type:"button",class:"nav-item-link nav-item-btn",onClick:xr(w=>p(T),["stop"])},[d("span",_v,N(T.title),1),d("span",{class:Dt(["nav-plus-icon",{rotate:a.value===T.id}])},"+",2)],8,gv)):($(),It(x,{key:1,to:T.url,class:"nav-item-link",onClick:b},{default:Ve(()=>[d("span",vv,N(T.title),1)]),_:2},1032,["to"])),r.value&&T.subItems&&T.subItems.length>0&&a.value===T.id?($(),ee("ul",xv,[($(!0),ee(Le,null,Ke(T.subItems,(w,I)=>($(),ee("li",{key:I},[Xe(x,{to:w.url,onClick:b},{default:Ve(()=>[ht(N(w.name),1)]),_:2},1032,["to"])]))),128))])):Bt("",!0)],10,mv))),128))])],2),d("div",yv,[d("div",Sv,[d("button",{type:"button",class:Dt(["lang-box-btn",{"is-active":En(Fe)==="ja"}]),onClick:A[1]||(A[1]=T=>En(Po)("ja"))}," JP ",2),d("button",{type:"button",class:Dt(["lang-box-btn",{"is-active":En(Fe)==="en"}]),onClick:A[2]||(A[2]=T=>En(Po)("en"))}," EN ",2),d("button",{type:"button",class:Dt(["lang-box-btn",{"is-active":En(Fe)==="ko"}]),onClick:A[3]||(A[3]=T=>En(Po)("ko"))}," KR ",2)])]),l.value&&l.value.subItems&&l.value.subItems.length>0?($(),ee("div",{key:0,class:"subpage-mega-menu-panel",onClick:A[4]||(A[4]=xr(()=>{},["stop"]))},[d("div",bv,[d("div",Mv,[Xe(x,{to:l.value.url,class:"mega-category-title-link",onClick:b},{default:Ve(()=>[d("h3",Ev,N(l.value.title),1)]),_:1},8,["to"]),d("span",Tv,N(c(l.value.id)),1)]),l.value.id==="company"?($(),ee("div",Av,[d("div",wv,[d("div",Cv,[Xe(x,{to:"/greeting",class:"mega-menu-item-link",onClick:b},{default:Ve(()=>[d("span",Rv,N(h("company","/greeting")),1),A[5]||(A[5]=d("span",{class:"mega-item-red-arrow"},">",-1))]),_:1}),d("a",Pv,[A[6]||(A[6]=d("svg",{class:"brochure-pdf-icon",viewBox:"0 0 24 24",fill:"#D32F2F"},[d("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h-2v1.5h2c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-2v1.5zm6 4.5h-1.5v-6h1.5c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2zm-9-6v6H8v-2h1.5c.83 0 1.5-.67 1.5-1.5v-1c0-.83-.67-1.5-1.5-1.5H6.5z"})],-1)),d("span",null,N(u()),1),A[7]||(A[7]=d("span",{class:"brochure-download-arrow"},"↓",-1))])]),d("div",Iv,[Xe(x,{to:"/overview",class:"mega-menu-item-link",onClick:b},{default:Ve(()=>[d("span",Lv,N(h("company","/overview")),1),A[8]||(A[8]=d("span",{class:"mega-item-red-arrow"},">",-1))]),_:1})])]),d("div",Dv,[Xe(x,{to:"/information",onClick:b,class:"mega-img-link"},{default:Ve(()=>[...A[9]||(A[9]=[d("img",{src:Zg,alt:"AZAMINO Company",class:"mega-banner-img"},null,-1)])]),_:1})])])):l.value.id==="service"?($(),ee("div",Nv,[d("div",Uv,[Xe(x,{to:"/food",class:"mega-service-card",onClick:b},{default:Ve(()=>[A[11]||(A[11]=d("div",{class:"mega-service-thumb"},[d("img",{src:Jg,alt:"개호식품"})],-1)),d("div",Ov,[d("span",Fv,N(h("service","/food")),1),A[10]||(A[10]=d("span",{class:"mega-item-red-arrow"},">",-1))])]),_:1}),Xe(x,{to:"/money",class:"mega-service-card",onClick:b},{default:Ve(()=>[A[13]||(A[13]=d("div",{class:"mega-service-thumb"},[d("img",{src:Qg,alt:"금고"})],-1)),d("div",Bv,[d("span",kv,N(h("service","/money")),1),A[12]||(A[12]=d("span",{class:"mega-item-red-arrow"},">",-1))])]),_:1}),Xe(x,{to:"/product",class:"mega-service-card",onClick:b},{default:Ve(()=>[A[15]||(A[15]=d("div",{class:"mega-service-thumb"},[d("img",{src:jg,alt:"생활용품"})],-1)),d("div",Hv,[d("span",Gv,N(h("service","/product")),1),A[14]||(A[14]=d("span",{class:"mega-item-red-arrow"},">",-1))])]),_:1}),Xe(x,{to:"/chemical",class:"mega-service-card",onClick:b},{default:Ve(()=>[A[17]||(A[17]=d("div",{class:"mega-service-thumb"},[d("img",{src:e_,alt:"화학제품"})],-1)),d("div",Vv,[d("span",zv,N(h("service","/chemical")),1),A[16]||(A[16]=d("span",{class:"mega-item-red-arrow"},">",-1))])]),_:1})])])):l.value.id==="contact"?($(),ee("div",Wv,[d("div",$v,[Xe(x,{to:"/quiry",class:"mega-menu-item-link",onClick:b},{default:Ve(()=>[d("span",Xv,N(h("contact","/quiry")),1),A[18]||(A[18]=d("span",{class:"mega-item-red-arrow"},">",-1))]),_:1}),Xe(x,{to:"/location",class:"mega-menu-item-link",onClick:b},{default:Ve(()=>[d("span",qv,N(h("contact","/location")),1),A[19]||(A[19]=d("span",{class:"mega-item-red-arrow"},">",-1))]),_:1})]),d("div",Yv,[Xe(x,{to:"/contact",onClick:b,class:"mega-img-link"},{default:Ve(()=>[...A[20]||(A[20]=[d("img",{src:t_,alt:"AZAMINO Contact",class:"mega-banner-img"},null,-1)])]),_:1})])])):($(),ee("div",Kv,[($(!0),ee(Le,null,Ke(l.value.subItems,(T,w)=>($(),It(x,{key:w,to:T.url,class:"mega-menu-item-link",onClick:b},{default:Ve(()=>[d("span",Zv,N(T.name),1),A[21]||(A[21]=d("span",{class:"mega-item-red-arrow"},">",-1))]),_:2},1032,["to"]))),128))]))])])):Bt("",!0)])],2)}}},Qv=hn(Jv,[["__scopeId","data-v-3fcc44da"]]),jv={class:"site-footer"},e0={class:"container footer-container"},t0={class:"footer-top-section"},n0={class:"footer-brand-slogan-wrap"},i0={class:"footer-slogan-box"},s0={class:"footer-slogan-text"},r0={class:"footer-slogan-sub"},a0={class:"footer-nav-columns"},o0={class:"footer-col"},l0={class:"footer-col-title"},c0={class:"footer-col-list"},u0={class:"footer-col"},d0={class:"footer-col-title"},f0={class:"footer-col-list"},h0={class:"footer-col"},p0={class:"footer-col-title"},m0={class:"footer-col-list"},g0={class:"footer-col footer-col-sitemap"},_0={class:"footer-col-title"},v0={class:"footer-bottom-bar"},x0={class:"footer-bottom-left"},y0={class:"footer-legal-links"},S0={class:"footer-bottom-right"},b0={class:"footer-copyright-text"},M0={__name:"Footer",setup(n){const e=Nt(new Date().getFullYear()),t={ko:{slogan:`미래를 일상으로,
혁신을 표준으로`,sloganSub:"사람과 기술, 세계를 연결하여 풍요로운 내일을 열어갑니다.",legal:{terms:"이용약관",privacy:"개인정보처리방침",email:"이메일무단수집거부"},cols:{company:{title:"회사정보",links:[{name:"인사말",url:"/greeting"},{name:"경영이념",url:"/overview"}]},service:{title:"사업소개",links:[{name:"개호식품",url:"/food"},{name:"금고",url:"/money"},{name:"생활용품",url:"/product"},{name:"화학제품",url:"/chemical"}]},contact:{title:"연락처",links:[{name:"온라인 문의",url:"/quiry"},{name:"오시는 길",url:"/location"}]},sitemap:{title:"SITEMAP"}}},ja:{slogan:`未来を日常に、
革新を標準に`,sloganSub:"人と技術、世界をつなぎ、豊かな明日を切り拓きます。",legal:{terms:"利用規約",privacy:"個人情報保護方針",email:"メールアドレス無断収集拒否"},cols:{company:{title:"会社情報",links:[{name:"ご挨拶",url:"/greeting"},{name:"企業理念",url:"/overview"}]},service:{title:"事業紹介",links:[{name:"介護食品",url:"/food"},{name:"金庫",url:"/money"},{name:"生活用品",url:"/product"},{name:"化学製品",url:"/chemical"}]},contact:{title:"お問い合わせ",links:[{name:"オンラインお問い合わせ",url:"/quiry"},{name:"アクセス",url:"/location"}]},sitemap:{title:"サイトマップ"}}},en:{slogan:`Bringing the future into everyday life,
making innovation the standard`,sloganSub:"Connecting people, technology, and global networks for a prosperous tomorrow.",legal:{terms:"Terms of Use",privacy:"Privacy Policy",email:"Email Policy"},cols:{company:{title:"Company",links:[{name:"CEO Message",url:"/greeting"},{name:"Corporate Philosophy",url:"/overview"}]},service:{title:"Business",links:[{name:"Care Food",url:"/food"},{name:"Safes",url:"/money"},{name:"Living Goods",url:"/product"},{name:"Chemicals",url:"/chemical"}]},contact:{title:"Contact",links:[{name:"Online Inquiry",url:"/quiry"},{name:"Location & Access",url:"/location"}]},sitemap:{title:"SITEMAP"}}}},i=st(()=>t[Fe.value]||t.ja);return(s,r)=>{const a=rn("router-link");return $(),ee("footer",jv,[d("div",e0,[d("div",t0,[d("div",n0,[d("div",i0,[r[0]||(r[0]=d("span",{class:"footer-slogan-tag"},"Innovation",-1)),d("h2",s0,N(i.value.slogan),1),d("p",r0,N(i.value.sloganSub),1)])]),d("div",a0,[d("div",o0,[d("h3",l0,[Xe(a,{to:"/information"},{default:Ve(()=>[ht(N(i.value.cols.company.title),1)]),_:1})]),d("ul",c0,[($(!0),ee(Le,null,Ke(i.value.cols.company.links,o=>($(),ee("li",{key:o.name},[Xe(a,{to:o.url},{default:Ve(()=>[ht(N(o.name),1)]),_:2},1032,["to"])]))),128))])]),d("div",u0,[d("h3",d0,[Xe(a,{to:"/service"},{default:Ve(()=>[ht(N(i.value.cols.service.title),1)]),_:1})]),d("ul",f0,[($(!0),ee(Le,null,Ke(i.value.cols.service.links,o=>($(),ee("li",{key:o.name},[Xe(a,{to:o.url},{default:Ve(()=>[ht(N(o.name),1)]),_:2},1032,["to"])]))),128))])]),d("div",h0,[d("h3",p0,[Xe(a,{to:"/contact"},{default:Ve(()=>[ht(N(i.value.cols.contact.title),1)]),_:1})]),d("ul",m0,[($(!0),ee(Le,null,Ke(i.value.cols.contact.links,o=>($(),ee("li",{key:o.name},[Xe(a,{to:o.url},{default:Ve(()=>[ht(N(o.name),1)]),_:2},1032,["to"])]))),128))])]),d("div",g0,[d("h3",_0,[Xe(a,{to:"/sitemap"},{default:Ve(()=>[ht(N(i.value.cols.sitemap.title),1)]),_:1})])])])]),r[4]||(r[4]=d("div",{class:"footer-divider-line"},null,-1)),d("div",v0,[d("div",x0,[Xe(a,{to:"/",class:"footer-bottom-logo",title:"AZAMINO 메인으로"},{default:Ve(()=>[...r[1]||(r[1]=[d("img",{src:Oc,alt:"AZAMINO Inc",class:"footer-logo-img"},null,-1)])]),_:1}),d("div",y0,[Xe(a,{to:"/terms"},{default:Ve(()=>[ht(N(i.value.legal.terms),1)]),_:1}),r[2]||(r[2]=d("span",{class:"legal-sep"},"｜",-1)),Xe(a,{to:"/privacy"},{default:Ve(()=>[ht(N(i.value.legal.privacy),1)]),_:1}),r[3]||(r[3]=d("span",{class:"legal-sep"},"｜",-1)),Xe(a,{to:"/email-policy"},{default:Ve(()=>[ht(N(i.value.legal.email),1)]),_:1})])]),d("div",S0,[d("p",b0," COPYRIGHT © "+N(e.value)+" AZAMINO Inc. ALL RIGHTS RESERVED. ",1)])])])])}}},E0=hn(M0,[["__scopeId","data-v-bc596466"]]),T0={class:"app-layout"},A0={class:"app-main-content"},w0={__name:"App",setup(n){const e=Nt({languages:[{code:"ko",name:"kor",url:"/kr"},{code:"en",name:"eng",url:"/en"},{code:"ja",name:"jpn",url:"/jp"}]}),t={ko:[{id:"company",title:"회사정보",url:"/information",subItems:[{name:"인사말",url:"/greeting"},{name:"경영이념",url:"/overview"}]},{id:"service",title:"사업소개",url:"/service",subItems:[{name:"개호식품",url:"/food"},{name:"금고",url:"/money"},{name:"생활용품",url:"/product"},{name:"화학제품",url:"/chemical"}]},{id:"contact",title:"연락처",url:"/contact",subItems:[{name:"온라인 문의",url:"/quiry"},{name:"오시는 길",url:"/location"}]},{id:"presence",title:"SITEMAP",url:"/sitemap",subItems:[]}],ja:[{id:"company",title:"会社情報",url:"/information",subItems:[{name:"ご挨拶",url:"/greeting"},{name:"企業理念",url:"/overview"}]},{id:"service",title:"事業紹介",url:"/service",subItems:[{name:"介護食品",url:"/food"},{name:"金庫",url:"/money"},{name:"生活用品",url:"/product"},{name:"化学製品",url:"/chemical"}]},{id:"contact",title:"お問い合わせ",url:"/contact",subItems:[{name:"オンラインお問い合わせ",url:"/quiry"},{name:"アクセス",url:"/location"}]},{id:"presence",title:"SITEMAP",url:"/sitemap",subItems:[]}],en:[{id:"company",title:"Company",url:"/information",subItems:[{name:"CEO Message",url:"/greeting"},{name:"Corporate Philosophy",url:"/overview"}]},{id:"service",title:"Business",url:"/service",subItems:[{name:"Care Food",url:"/food"},{name:"Safes",url:"/money"},{name:"Living Goods",url:"/product"},{name:"Chemicals",url:"/chemical"}]},{id:"contact",title:"Contact",url:"/contact",subItems:[{name:"Online Inquiry",url:"/quiry"},{name:"Location & Access",url:"/location"}]},{id:"presence",title:"SITEMAP",url:"/sitemap",subItems:[]}]},i=st(()=>t[Fe.value]||t.ja);return(s,r)=>{const a=rn("router-view");return $(),ee("div",T0,[Xe(Qv,{languages:e.value.languages,"menu-items":i.value},null,8,["languages","menu-items"]),d("main",A0,[Xe(a)]),Xe(E0)])}}},C0={class:"video-background-layer"},R0=["src","onError"],P0=["src","alt"],I0={class:"lb-inner-container"},L0={class:"lb-description-text"},D0={class:"text-line line-1"},N0={class:"text-line line-2"},U0={class:"text-line line-3"},tr=650,O0={__name:"MAINSlider",setup(n){const e=Nt(null),t=Nt(1);let i=0;const s=Nt([{id:1,isVideo:!0,src:"/videos/video-1.mp4",hasError:!1},{id:2,isVideo:!0,src:"/videos/video-2.mp4",hasError:!1},{id:3,isVideo:!0,src:"/videos/video-3.mp4",hasError:!1},{id:4,isVideo:!0,src:"/videos/gaigosixyokuhin.mp4",hasError:!1},{id:5,isVideo:!0,src:"/videos/video-5.mp4",hasError:!1}]),r=Nt(0),a=Nt(!0);let o=null;const l=A=>{s.value[A]&&(s.value[A].hasError=!0)},c=()=>{r.value=(r.value+1)%s.value.length},u=()=>{a.value&&(h(),o=setInterval(c,8e3))},h=()=>{o&&(clearInterval(o),o=null)},f=()=>{t.value=t.value===1?2:1,i=Date.now()},p=A=>{const x=window.scrollY||window.pageYOffset,T=x<=12,w=Date.now();if(T){if(A.deltaY>15){if(t.value===1){A.preventDefault(),w-i>tr&&(t.value=2,i=w);return}if(w-i<tr){A.preventDefault();return}}else if(A.deltaY<-15&&t.value===2){A.preventDefault(),w-i>tr&&(t.value=1,i=w);return}}else x<=20&&t.value===1&&(t.value=2)};let v=0;const b=A=>{v=A.touches[0].clientY},g=A=>{if((window.scrollY||window.pageYOffset)>12)return;const T=A.touches[0].clientY,w=v-T,I=Date.now();w>40&&t.value===1?(A.preventDefault(),I-i>tr&&(t.value=2,i=I)):w<-40&&t.value===2&&(A.preventDefault(),I-i>tr&&(t.value=1,i=I))},m={ko:{line1:"전 세계 거점과 전방위 산업 영역에서,",line2:"시장 정보와 인사이트, 글로벌 파트너십과 사업 역량을 결합하여 새로운 비즈니스를 창출합니다.",line3:"이를 통해 미래 성장 동력을 확보하고 글로벌 시장을 선도합니다."},en:{line1:"Across global hubs and across all industries,",line2:"Combining market intelligence and insights with global partnerships and business capabilities to create new ventures.",line3:"This enables us to secure future growth drivers and lead the global market."},ja:{line1:"世界中の拠点とあらゆる産業分野において、",line2:"市場情報とインサイト、グローバルパートナーシップと事業能力を組み合わせ、新たなビジネスを創出します。",line3:"これにより、将来の成長動力を確保し、グローバル市場をリードします。"}},E=st(()=>m[Fe.value]||m.ja);return Br(()=>{window.addEventListener("wheel",p,{passive:!1}),window.addEventListener("touchstart",b,{passive:!0}),window.addEventListener("touchmove",g,{passive:!1}),u(),s.value.forEach((A,x)=>{x>0&&!A.isVideo&&fetch(A.src,{method:"HEAD"}).then(T=>{var w;T.ok&&((w=T.headers.get("content-type"))!=null&&w.includes("video"))&&(A.isVideo=!0)}).catch(()=>{})})}),Ks(()=>{window.removeEventListener("wheel",p),window.removeEventListener("touchstart",b),window.removeEventListener("touchmove",g),h()}),(A,x)=>($(),ee("section",{class:"mitsui-hero-viewport",ref_key:"heroContainerRef",ref:e,onMouseenter:h,onMouseleave:u},[d("div",C0,[($(!0),ee(Le,null,Ke(s.value,(T,w)=>($(),ee("div",{key:T.id,class:Dt(["video-slide-item",{"is-active":r.value===w}])},[T.isVideo&&!T.hasError&&(r.value===w||w===0)?($(),ee("video",{key:0,src:T.src,autoplay:"",muted:"",loop:"",playsinline:"",preload:"auto",class:"hero-video-element",onError:I=>l(w),s:""},null,40,R0)):($(),ee("img",{key:1,src:T.fallbackImage,alt:"AZAMINO Slide "+(w+1),class:"hero-fallback-image",loading:"eager"},null,8,P0))],2))),128))]),d("div",{class:Dt(["caption-stage-center",{"is-active":t.value===1,"is-hidden":t.value!==1}]),onClick:f,title:"클릭하여 설명 보기"},[x[0]||(x[0]=d("h1",{class:"center-innovation-title"},"Customer Innovation",-1)),d("button",{type:"button",class:"center-scroll-guide-btn",onClick:xr(f,["stop"]),title:"다음 내용 보기"})],2),d("div",{class:Dt(["caption-stage-left-bottom",{"is-active":t.value===2,"is-hidden":t.value!==2}]),onClick:f,title:"클릭하여 타이틀 보기"},[d("div",I0,[d("p",L0,[d("span",D0,N(E.value.line1),1),d("span",N0,N(E.value.line2),1),d("span",U0,N(E.value.line3),1)])])],2)],544))}},F0=hn(O0,[["__scopeId","data-v-4459c6de"]]);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const kc="186",B0=0,cd=1,k0=2,Ma=1,H0=2,dr=3,us=0,gn=1,bi=2,Ti=0,Sr=1,Rl=2,ud=3,dd=4,G0=5,Us=100,V0=101,z0=102,W0=103,$0=104,X0=200,q0=201,Y0=202,K0=203,Lh=204,Dh=205,Z0=206,J0=207,Q0=208,j0=209,ex=210,tx=211,nx=212,ix=213,sx=214,Pl=0,Il=1,Ll=2,Rr=3,Dl=4,Nl=5,Ul=6,Ol=7,Nh=0,rx=1,ax=2,ii=0,Uh=1,Oh=2,Fh=3,Bh=4,kh=5,Hh=6,Gh=7,Vh=300,ds=301,Xs=302,Io=303,Lo=304,ao=306,Fl=1e3,Mi=1001,Bl=1002,qt=1003,ox=1004,Jr=1005,en=1006,Do=1007,os=1008,xn=1009,zh=1010,Wh=1011,Pr=1012,Hc=1013,oi=1014,ei=1015,li=1016,Gc=1017,Vc=1018,Ir=1020,$h=35902,Xh=35899,qh=1021,Yh=1022,On=1023,Ci=1026,ls=1027,Kh=1028,zc=1029,fs=1030,Wc=1031,$c=1033,Ea=33776,Ta=33777,Aa=33778,wa=33779,kl=35840,Hl=35841,Gl=35842,Vl=35843,zl=36196,Wl=37492,$l=37496,Xl=37488,ql=37489,ka=37490,Yl=37491,Kl=37808,Zl=37809,Jl=37810,Ql=37811,jl=37812,ec=37813,tc=37814,nc=37815,ic=37816,sc=37817,rc=37818,ac=37819,oc=37820,lc=37821,cc=36492,uc=36494,dc=36495,fc=36283,hc=36284,Ha=36285,pc=36286,lx=3200,mc=0,cx=1,Vi="",Mn="srgb",Ga="srgb-linear",Va="linear",St="srgb",No=7680,ux=519,dx=512,fx=513,hx=514,Xc=515,px=516,mx=517,qc=518,gx=519,_x=35044,fd="300 es",ti=2e3,Lr=2001;function vx(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Dr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function xx(){const n=Dr("canvas");return n.style.display="block",n}const hd={};function pd(...n){const e="THREE."+n.shift();console.log(e,...n)}function Zh(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function je(...n){n=Zh(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function mt(...n){n=Zh(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function ks(...n){const e=n.join(" ");e in hd||(hd[e]=!0,je(...n))}function yx(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Sx={[Pl]:Il,[Ll]:Ul,[Dl]:Ol,[Rr]:Nl,[Il]:Pl,[Ul]:Ll,[Ol]:Dl,[Nl]:Rr};class ps{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Uo=Math.PI/180,gc=180/Math.PI;function Hr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]).toLowerCase()}function ut(n,e,t){return Math.max(e,Math.min(t,n))}function bx(n,e){return(n%e+e)%e}function Oo(n,e,t){return(1-t)*n+t*e}function nr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function pn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const jc=class jc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};jc.prototype.isVector2=!0;let dt=jc;class Zs{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3],f=r[a+0],p=r[a+1],v=r[a+2],b=r[a+3];if(h!==b||l!==f||c!==p||u!==v){let g=l*f+c*p+u*v+h*b;g<0&&(f=-f,p=-p,v=-v,b=-b,g=-g);let m=1-o;if(g<.9995){const E=Math.acos(g),A=Math.sin(E);m=Math.sin(m*E)/A,o=Math.sin(o*E)/A,l=l*m+f*o,c=c*m+p*o,u=u*m+v*o,h=h*m+b*o}else{l=l*m+f*o,c=c*m+p*o,u=u*m+v*o,h=h*m+b*o;const E=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=E,c*=E,u*=E,h*=E}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[a],f=r[a+1],p=r[a+2],v=r[a+3];return e[t]=o*v+u*h+l*p-c*f,e[t+1]=l*v+u*f+c*h-o*p,e[t+2]=c*v+u*p+o*f-l*h,e[t+3]=u*v-o*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),h=o(r/2),f=l(i/2),p=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=f*u*h+c*p*v,this._y=c*p*h-f*u*v,this._z=c*u*v+f*p*h,this._w=c*u*h-f*p*v;break;case"YXZ":this._x=f*u*h+c*p*v,this._y=c*p*h-f*u*v,this._z=c*u*v-f*p*h,this._w=c*u*h+f*p*v;break;case"ZXY":this._x=f*u*h-c*p*v,this._y=c*p*h+f*u*v,this._z=c*u*v+f*p*h,this._w=c*u*h-f*p*v;break;case"ZYX":this._x=f*u*h-c*p*v,this._y=c*p*h+f*u*v,this._z=c*u*v-f*p*h,this._w=c*u*h+f*p*v;break;case"YZX":this._x=f*u*h+c*p*v,this._y=c*p*h+f*u*v,this._z=c*u*v-f*p*h,this._w=c*u*h-f*p*v;break;case"XZY":this._x=f*u*h-c*p*v,this._y=c*p*h-f*u*v,this._z=c*u*v+f*p*h,this._w=c*u*h+f*p*v;break;default:je("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const eu=class eu{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(md.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(md.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),h=2*(r*i-a*t);return this.x=t+l*c+a*h-o*u,this.y=i+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Fo.copy(this).projectOnVector(e),this.sub(Fo)}reflect(e){return this.sub(Fo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};eu.prototype.isVector3=!0;let te=eu;const Fo=new te,md=new Zs,tu=class tu{constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],v=i[8],b=s[0],g=s[3],m=s[6],E=s[1],A=s[4],x=s[7],T=s[2],w=s[5],I=s[8];return r[0]=a*b+o*E+l*T,r[3]=a*g+o*A+l*w,r[6]=a*m+o*x+l*I,r[1]=c*b+u*E+h*T,r[4]=c*g+u*A+h*w,r[7]=c*m+u*x+h*I,r[2]=f*b+p*E+v*T,r[5]=f*g+p*A+v*w,r[8]=f*m+p*x+v*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*r,p=c*r-a*l,v=t*h+i*f+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/v;return e[0]=h*b,e[1]=(s*c-u*i)*b,e[2]=(o*i-s*a)*b,e[3]=f*b,e[4]=(u*t-s*l)*b,e[5]=(s*r-o*t)*b,e[6]=p*b,e[7]=(i*l-c*t)*b,e[8]=(a*t-i*r)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return ks("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Bo.makeScale(e,t)),this}rotate(e){return ks("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Bo.makeRotation(-e)),this}translate(e,t){return ks("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Bo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};tu.prototype.isMatrix3=!0;let tt=tu;const Bo=new tt,gd=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_d=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mx(){const n={enabled:!0,workingColorSpace:Ga,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===St&&(s.r=Ai(s.r),s.g=Ai(s.g),s.b=Ai(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===St&&(s.r=Hs(s.r),s.g=Hs(s.g),s.b=Hs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Vi?Va:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ks("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ks("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ga]:{primaries:e,whitePoint:i,transfer:Va,toXYZ:gd,fromXYZ:_d,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Mn},outputColorSpaceConfig:{drawingBufferColorSpace:Mn}},[Mn]:{primaries:e,whitePoint:i,transfer:St,toXYZ:gd,fromXYZ:_d,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Mn}}}),n}const ct=Mx();function Ai(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Hs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let xs;class Ex{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{xs===void 0&&(xs=Dr("canvas")),xs.width=e.width,xs.height=e.height;const s=xs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=xs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Dr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ai(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ai(t[i]/255)*255):t[i]=Ai(t[i]);return{data:t,width:e.width,height:e.height}}else return je("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Tx=0;class Yc{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Tx++}),this.uuid=Hr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ko(s[a].image)):r.push(ko(s[a]))}else r=ko(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function ko(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ex.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(je("Texture: Unable to serialize Texture."),{})}let Ax=0;const Ho=new te;class nn extends ps{constructor(e=nn.DEFAULT_IMAGE,t=nn.DEFAULT_MAPPING,i=Mi,s=Mi,r=en,a=os,o=On,l=xn,c=nn.DEFAULT_ANISOTROPY,u=Vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ax++}),this.uuid=Hr(),this.name="",this.source=new Yc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new dt(0,0),this.repeat=new dt(1,1),this.center=new dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ho).x}get height(){return this.source.getSize(Ho).y}get depth(){return this.source.getSize(Ho).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){je(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){je(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Vh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fl:e.x=e.x-Math.floor(e.x);break;case Mi:e.x=e.x<0?0:1;break;case Bl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fl:e.y=e.y-Math.floor(e.y);break;case Mi:e.y=e.y<0?0:1;break;case Bl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}nn.DEFAULT_IMAGE=null;nn.DEFAULT_MAPPING=Vh;nn.DEFAULT_ANISOTROPY=1;const nu=class nu{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],v=l[9],b=l[2],g=l[6],m=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-b)<.01&&Math.abs(v-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+b)<.1&&Math.abs(v+g)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(c+1)/2,x=(p+1)/2,T=(m+1)/2,w=(u+f)/4,I=(h+b)/4,y=(v+g)/4;return A>x&&A>T?A<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(A),s=w/i,r=I/i):x>T?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=w/s,r=y/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=I/r,s=y/r),this.set(i,s,r,t),this}let E=Math.sqrt((g-v)*(g-v)+(h-b)*(h-b)+(f-u)*(f-u));return Math.abs(E)<.001&&(E=1),this.x=(g-v)/E,this.y=(h-b)/E,this.z=(f-u)/E,this.w=Math.acos((c+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this.w=ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this.w=ut(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};nu.prototype.isVector4=!0;let Pt=nu;class wx extends ps{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new nn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:en,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Yc(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class kn extends wx{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Jh extends nn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Cx extends nn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Wa=class Wa{constructor(e,t,i,s,r,a,o,l,c,u,h,f,p,v,b,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,h,f,p,v,b,g)}set(e,t,i,s,r,a,o,l,c,u,h,f,p,v,b,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=f,m[3]=p,m[7]=v,m[11]=b,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wa().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/ys.setFromMatrixColumn(e,0).length(),r=1/ys.setFromMatrixColumn(e,1).length(),a=1/ys.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=a*u,p=a*h,v=o*u,b=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+v*c,t[5]=f-b*c,t[9]=-o*l,t[2]=b-f*c,t[6]=v+p*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,p=l*h,v=c*u,b=c*h;t[0]=f+b*o,t[4]=v*o-p,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=p*o-v,t[6]=b+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,p=l*h,v=c*u,b=c*h;t[0]=f-b*o,t[4]=-a*h,t[8]=v+p*o,t[1]=p+v*o,t[5]=a*u,t[9]=b-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,p=a*h,v=o*u,b=o*h;t[0]=l*u,t[4]=v*c-p,t[8]=f*c+b,t[1]=l*h,t[5]=b*c+f,t[9]=p*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,v=o*l,b=o*c;t[0]=l*u,t[4]=b-f*h,t[8]=v*h+p,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*h+v,t[10]=f-b*h}else if(e.order==="XZY"){const f=a*l,p=a*c,v=o*l,b=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+b,t[5]=a*u,t[9]=p*h-v,t[2]=v*h-p,t[6]=o*u,t[10]=b*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rx,e,Px)}lookAt(e,t,i){const s=this.elements;return _n.subVectors(e,t),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),Ni.crossVectors(i,_n),Ni.lengthSq()===0&&(Math.abs(i.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),Ni.crossVectors(i,_n)),Ni.normalize(),Qr.crossVectors(_n,Ni),s[0]=Ni.x,s[4]=Qr.x,s[8]=_n.x,s[1]=Ni.y,s[5]=Qr.y,s[9]=_n.y,s[2]=Ni.z,s[6]=Qr.z,s[10]=_n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],v=i[2],b=i[6],g=i[10],m=i[14],E=i[3],A=i[7],x=i[11],T=i[15],w=s[0],I=s[4],y=s[8],R=s[12],F=s[1],G=s[5],K=s[9],j=s[13],z=s[2],O=s[6],q=s[10],H=s[14],ae=s[3],ne=s[7],de=s[11],pe=s[15];return r[0]=a*w+o*F+l*z+c*ae,r[4]=a*I+o*G+l*O+c*ne,r[8]=a*y+o*K+l*q+c*de,r[12]=a*R+o*j+l*H+c*pe,r[1]=u*w+h*F+f*z+p*ae,r[5]=u*I+h*G+f*O+p*ne,r[9]=u*y+h*K+f*q+p*de,r[13]=u*R+h*j+f*H+p*pe,r[2]=v*w+b*F+g*z+m*ae,r[6]=v*I+b*G+g*O+m*ne,r[10]=v*y+b*K+g*q+m*de,r[14]=v*R+b*j+g*H+m*pe,r[3]=E*w+A*F+x*z+T*ae,r[7]=E*I+A*G+x*O+T*ne,r[11]=E*y+A*K+x*q+T*de,r[15]=E*R+A*j+x*H+T*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],p=e[14],v=e[3],b=e[7],g=e[11],m=e[15],E=l*p-c*f,A=o*p-c*h,x=o*f-l*h,T=a*p-c*u,w=a*f-l*u,I=a*h-o*u;return t*(b*E-g*A+m*x)-i*(v*E-g*T+m*w)+s*(v*A-b*T+m*I)-r*(v*x-b*w+g*I)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],p=e[11],v=e[12],b=e[13],g=e[14],m=e[15],E=t*o-i*a,A=t*l-s*a,x=t*c-r*a,T=i*l-s*o,w=i*c-r*o,I=s*c-r*l,y=u*b-h*v,R=u*g-f*v,F=u*m-p*v,G=h*g-f*b,K=h*m-p*b,j=f*m-p*g,z=E*j-A*K+x*G+T*F-w*R+I*y;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/z;return e[0]=(o*j-l*K+c*G)*O,e[1]=(s*K-i*j-r*G)*O,e[2]=(b*I-g*w+m*T)*O,e[3]=(f*w-h*I-p*T)*O,e[4]=(l*F-a*j-c*R)*O,e[5]=(t*j-s*F+r*R)*O,e[6]=(g*x-v*I-m*A)*O,e[7]=(u*I-f*x+p*A)*O,e[8]=(a*K-o*F+c*y)*O,e[9]=(i*F-t*K-r*y)*O,e[10]=(v*w-b*x+m*E)*O,e[11]=(h*x-u*w-p*E)*O,e[12]=(o*R-a*G-l*y)*O,e[13]=(t*G-i*R+s*y)*O,e[14]=(b*A-v*T-g*E)*O,e[15]=(u*T-h*A+f*E)*O,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,f=r*c,p=r*u,v=r*h,b=a*u,g=a*h,m=o*h,E=l*c,A=l*u,x=l*h,T=i.x,w=i.y,I=i.z;return s[0]=(1-(b+m))*T,s[1]=(p+x)*T,s[2]=(v-A)*T,s[3]=0,s[4]=(p-x)*w,s[5]=(1-(f+m))*w,s[6]=(g+E)*w,s[7]=0,s[8]=(v+A)*I,s[9]=(g-E)*I,s[10]=(1-(f+b))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=ys.set(s[0],s[1],s[2]).length();const o=ys.set(s[4],s[5],s[6]).length(),l=ys.set(s[8],s[9],s[10]).length();r<0&&(a=-a),In.copy(this);const c=1/a,u=1/o,h=1/l;return In.elements[0]*=c,In.elements[1]*=c,In.elements[2]*=c,In.elements[4]*=u,In.elements[5]*=u,In.elements[6]*=u,In.elements[8]*=h,In.elements[9]*=h,In.elements[10]*=h,t.setFromRotationMatrix(In),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=ti,l=!1){const c=this.elements,u=2*r/(t-e),h=2*r/(i-s),f=(t+e)/(t-e),p=(i+s)/(i-s);let v,b;if(l)v=r/(a-r),b=a*r/(a-r);else if(o===ti)v=-(a+r)/(a-r),b=-2*a*r/(a-r);else if(o===Lr)v=-a/(a-r),b=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=ti,l=!1){const c=this.elements,u=2/(t-e),h=2/(i-s),f=-(t+e)/(t-e),p=-(i+s)/(i-s);let v,b;if(l)v=1/(a-r),b=a/(a-r);else if(o===ti)v=-2/(a-r),b=-(a+r)/(a-r);else if(o===Lr)v=-1/(a-r),b=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=v,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Wa.prototype.isMatrix4=!0;let Ot=Wa;const ys=new te,In=new Ot,Rx=new te(0,0,0),Px=new te(1,1,1),Ni=new te,Qr=new te,_n=new te,vd=new Ot,xd=new Zs;class Xi{constructor(e=0,t=0,i=0,s=Xi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ut(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ut(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:je("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return vd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xd.setFromEuler(this),this.setFromQuaternion(xd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Xi.DEFAULT_ORDER="XYZ";class Qh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ix=0;const yd=new te,Ss=new Zs,hi=new Ot,jr=new te,ir=new te,Lx=new te,Dx=new Zs,Sd=new te(1,0,0),bd=new te(0,1,0),Md=new te(0,0,1),Ed={type:"added"},Nx={type:"removed"},bs={type:"childadded",child:null},Go={type:"childremoved",child:null};class sn extends ps{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ix++}),this.uuid=Hr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=sn.DEFAULT_UP.clone();const e=new te,t=new Xi,i=new Zs,s=new te(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ot},normalMatrix:{value:new tt}}),this.matrix=new Ot,this.matrixWorld=new Ot,this.matrixAutoUpdate=sn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.multiply(Ss),this}rotateOnWorldAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.premultiply(Ss),this}rotateX(e){return this.rotateOnAxis(Sd,e)}rotateY(e){return this.rotateOnAxis(bd,e)}rotateZ(e){return this.rotateOnAxis(Md,e)}translateOnAxis(e,t){return yd.copy(e).applyQuaternion(this.quaternion),this.position.add(yd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Sd,e)}translateY(e){return this.translateOnAxis(bd,e)}translateZ(e){return this.translateOnAxis(Md,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?jr.copy(e):jr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(ir,jr,this.up):hi.lookAt(jr,ir,this.up),this.quaternion.setFromRotationMatrix(hi),s&&(hi.extractRotation(s.matrixWorld),Ss.setFromRotationMatrix(hi),this.quaternion.premultiply(Ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(mt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ed),bs.child=e,this.dispatchEvent(bs),bs.child=null):mt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Nx),Go.child=e,this.dispatchEvent(Go),Go.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(hi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ed),bs.child=e,this.dispatchEvent(bs),bs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,e,Lx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,Dx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}sn.DEFAULT_UP=new te(0,1,0);sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ea extends sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ux={type:"move"};class Vo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ea,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ea,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new te,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new te),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ea,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new te,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new te,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const b of e.hand.values()){const g=t.getJointPose(b,i),m=this._getHandJoint(c,b);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,v=.005;c.inputState.pinching&&f>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ux)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ea;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const jh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ui={h:0,s:0,l:0},ta={h:0,s:0,l:0};function zo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class pt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=ct.workingColorSpace){return this.r=e,this.g=t,this.b=i,ct.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=ct.workingColorSpace){if(e=bx(e,1),t=ut(t,0,1),i=ut(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=zo(a,r,e+1/3),this.g=zo(a,r,e),this.b=zo(a,r,e-1/3)}return ct.colorSpaceToWorking(this,s),this}setStyle(e,t=Mn){function i(r){r!==void 0&&parseFloat(r)<1&&je("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:je("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);je("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mn){const i=jh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):je("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}copyLinearToSRGB(e){return this.r=Hs(e.r),this.g=Hs(e.g),this.b=Hs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mn){return ct.workingToColorSpace(Jt.copy(this),e),Math.round(ut(Jt.r*255,0,255))*65536+Math.round(ut(Jt.g*255,0,255))*256+Math.round(ut(Jt.b*255,0,255))}getHexString(e=Mn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ct.workingColorSpace){ct.workingToColorSpace(Jt.copy(this),t);const i=Jt.r,s=Jt.g,r=Jt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ct.workingColorSpace){return ct.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=Mn){ct.workingToColorSpace(Jt.copy(this),e);const t=Jt.r,i=Jt.g,s=Jt.b;return e!==Mn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Ui),this.setHSL(Ui.h+e,Ui.s+t,Ui.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ui),e.getHSL(ta);const i=Oo(Ui.h,ta.h,t),s=Oo(Ui.s,ta.s,t),r=Oo(Ui.l,ta.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new pt;pt.NAMES=jh;class Ox extends sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xi,this.environmentIntensity=1,this.environmentRotation=new Xi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Ln=new te,pi=new te,Wo=new te,mi=new te,Ms=new te,Es=new te,Td=new te,$o=new te,Xo=new te,qo=new te,Yo=new Pt,Ko=new Pt,Zo=new Pt;class Un{constructor(e=new te,t=new te,i=new te){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Ln.subVectors(e,t),s.cross(Ln);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Ln.subVectors(s,t),pi.subVectors(i,t),Wo.subVectors(e,t);const a=Ln.dot(Ln),o=Ln.dot(pi),l=Ln.dot(Wo),c=pi.dot(pi),u=pi.dot(Wo),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const f=1/h,p=(c*l-o*u)*f,v=(a*u-o*l)*f;return r.set(1-p-v,v,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,mi.x),l.addScaledVector(a,mi.y),l.addScaledVector(o,mi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Yo.setScalar(0),Ko.setScalar(0),Zo.setScalar(0),Yo.fromBufferAttribute(e,t),Ko.fromBufferAttribute(e,i),Zo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Yo,r.x),a.addScaledVector(Ko,r.y),a.addScaledVector(Zo,r.z),a}static isFrontFacing(e,t,i,s){return Ln.subVectors(i,t),pi.subVectors(e,t),Ln.cross(pi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ln.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),Ln.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Un.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Un.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Ms.subVectors(s,i),Es.subVectors(r,i),$o.subVectors(e,i);const l=Ms.dot($o),c=Es.dot($o);if(l<=0&&c<=0)return t.copy(i);Xo.subVectors(e,s);const u=Ms.dot(Xo),h=Es.dot(Xo);if(u>=0&&h<=u)return t.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Ms,a);qo.subVectors(e,r);const p=Ms.dot(qo),v=Es.dot(qo);if(v>=0&&p<=v)return t.copy(r);const b=p*c-l*v;if(b<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(i).addScaledVector(Es,o);const g=u*v-p*h;if(g<=0&&h-u>=0&&p-v>=0)return Td.subVectors(r,s),o=(h-u)/(h-u+(p-v)),t.copy(s).addScaledVector(Td,o);const m=1/(g+b+f);return a=b*m,o=f*m,t.copy(i).addScaledVector(Ms,a).addScaledVector(Es,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Gr{constructor(e=new te(1/0,1/0,1/0),t=new te(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Dn):Dn.fromBufferAttribute(r,a),Dn.applyMatrix4(e.matrixWorld),this.expandByPoint(Dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),na.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),na.copy(i.boundingBox)),na.applyMatrix4(e.matrixWorld),this.union(na)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Dn),Dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sr),ia.subVectors(this.max,sr),Ts.subVectors(e.a,sr),As.subVectors(e.b,sr),ws.subVectors(e.c,sr),Oi.subVectors(As,Ts),Fi.subVectors(ws,As),Ji.subVectors(Ts,ws);let t=[0,-Oi.z,Oi.y,0,-Fi.z,Fi.y,0,-Ji.z,Ji.y,Oi.z,0,-Oi.x,Fi.z,0,-Fi.x,Ji.z,0,-Ji.x,-Oi.y,Oi.x,0,-Fi.y,Fi.x,0,-Ji.y,Ji.x,0];return!Jo(t,Ts,As,ws,ia)||(t=[1,0,0,0,1,0,0,0,1],!Jo(t,Ts,As,ws,ia))?!1:(sa.crossVectors(Oi,Fi),t=[sa.x,sa.y,sa.z],Jo(t,Ts,As,ws,ia))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const gi=[new te,new te,new te,new te,new te,new te,new te,new te],Dn=new te,na=new Gr,Ts=new te,As=new te,ws=new te,Oi=new te,Fi=new te,Ji=new te,sr=new te,ia=new te,sa=new te,Qi=new te;function Jo(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Qi.fromArray(n,r);const o=s.x*Math.abs(Qi.x)+s.y*Math.abs(Qi.y)+s.z*Math.abs(Qi.z),l=e.dot(Qi),c=t.dot(Qi),u=i.dot(Qi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Ht=new te,ra=new dt;let Fx=0;class wi extends ps{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Fx++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=_x,this.updateRanges=[],this.gpuType=ei,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ra.fromBufferAttribute(this,t),ra.applyMatrix3(e),this.setXY(t,ra.x,ra.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix3(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=nr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=pn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nr(t,this.array)),t}setX(e,t){return this.normalized&&(t=pn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nr(t,this.array)),t}setY(e,t){return this.normalized&&(t=pn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nr(t,this.array)),t}setW(e,t){return this.normalized&&(t=pn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=pn(t,this.array),i=pn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=pn(t,this.array),i=pn(i,this.array),s=pn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=pn(t,this.array),i=pn(i,this.array),s=pn(s,this.array),r=pn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class ep extends wi{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class tp extends wi{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class wn extends wi{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Bx=new Gr,rr=new te,Qo=new te;class Kc{constructor(e=new te,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Bx.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rr.subVectors(e,this.center);const t=rr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(rr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rr.copy(e.center).add(Qo)),this.expandByPoint(rr.copy(e.center).sub(Qo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let kx=0;const bn=new Ot,jo=new sn,Cs=new te,vn=new Gr,ar=new Gr,Wt=new te;class ui extends ps{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kx++}),this.uuid=Hr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vx(e)?tp:ep)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new tt().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,i){return bn.makeTranslation(e,t,i),this.applyMatrix4(bn),this}scale(e,t,i){return bn.makeScale(e,t,i),this.applyMatrix4(bn),this}lookAt(e){return jo.lookAt(e),jo.updateMatrix(),this.applyMatrix4(jo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cs).negate(),this.translate(Cs.x,Cs.y,Cs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new wn(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&je("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){mt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new te(-1/0,-1/0,-1/0),new te(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];vn.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&mt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){mt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new te,1/0);return}if(e){const i=this.boundingSphere.center;if(vn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ar.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(vn.min,ar.min),vn.expandByPoint(Wt),Wt.addVectors(vn.max,ar.max),vn.expandByPoint(Wt)):(vn.expandByPoint(ar.min),vn.expandByPoint(ar.max))}vn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Wt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Wt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Wt.fromBufferAttribute(o,c),l&&(Cs.fromBufferAttribute(e,c),Wt.add(Cs)),s=Math.max(s,i.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&mt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){mt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new wi(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new te,l[y]=new te;const c=new te,u=new te,h=new te,f=new dt,p=new dt,v=new dt,b=new te,g=new te;function m(y,R,F){c.fromBufferAttribute(i,y),u.fromBufferAttribute(i,R),h.fromBufferAttribute(i,F),f.fromBufferAttribute(r,y),p.fromBufferAttribute(r,R),v.fromBufferAttribute(r,F),u.sub(c),h.sub(c),p.sub(f),v.sub(f);const G=1/(p.x*v.y-v.x*p.y);isFinite(G)&&(b.copy(u).multiplyScalar(v.y).addScaledVector(h,-p.y).multiplyScalar(G),g.copy(h).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(G),o[y].add(b),o[R].add(b),o[F].add(b),l[y].add(g),l[R].add(g),l[F].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let y=0,R=E.length;y<R;++y){const F=E[y],G=F.start,K=F.count;for(let j=G,z=G+K;j<z;j+=3)m(e.getX(j+0),e.getX(j+1),e.getX(j+2))}const A=new te,x=new te,T=new te,w=new te;function I(y){T.fromBufferAttribute(s,y),w.copy(T);const R=o[y];A.copy(R),A.sub(T.multiplyScalar(T.dot(R))).normalize(),x.crossVectors(w,R);const G=x.dot(l[y])<0?-1:1;a.setXYZW(y,A.x,A.y,A.z,G)}for(let y=0,R=E.length;y<R;++y){const F=E[y],G=F.start,K=F.count;for(let j=G,z=G+K;j<z;j+=3)I(e.getX(j+0)),I(e.getX(j+1)),I(e.getX(j+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new wi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new te,r=new te,a=new te,o=new te,l=new te,c=new te,u=new te,h=new te;if(e)for(let f=0,p=e.count;f<p;f+=3){const v=e.getX(f+0),b=e.getX(f+1),g=e.getX(f+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,b),a.fromBufferAttribute(t,g),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,g),o.add(u),l.add(u),c.add(u),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let p=0,v=0;for(let b=0,g=l.length;b<g;b++){o.isInterleavedBufferAttribute?p=l[b]*o.data.stride+o.offset:p=l[b]*u;for(let m=0;m<u;m++)f[v++]=c[p++]}return new wi(f,u,h)}if(this.index===null)return je("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ui,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=e(f,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const el=new te,Hx=new te,Gx=new tt;class Gi{constructor(e=new te(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=el.subVectors(i,t).cross(Hx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(el),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Gx.getNormalMatrix(e),s=this.coplanarPoint(el).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Vx=0;class Vr extends ps{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vx++}),this.uuid=Hr(),this.name="",this.type="Material",this.blending=Sr,this.side=us,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Lh,this.blendDst=Dh,this.blendEquation=Us,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pt(0,0,0),this.blendAlpha=0,this.depthFunc=Rr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ux,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=No,this.stencilZFail=No,this.stencilZPass=No,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){je(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){je(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new pt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Gi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new dt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new dt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const _i=new te,tl=new te,aa=new te,oa=new te;class zx{constructor(e=new te,t=new te(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_i.copy(this.origin).addScaledVector(this.direction,t),_i.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){tl.copy(e).add(t).multiplyScalar(.5),aa.copy(t).sub(e).normalize(),oa.copy(this.origin).sub(tl);const r=e.distanceTo(t)*.5,a=-this.direction.dot(aa),o=oa.dot(this.direction),l=-oa.dot(aa),c=oa.lengthSq(),u=Math.abs(1-a*a);let h,f,p,v;if(u>0)if(h=a*l-o,f=a*o-l,v=r*u,h>=0)if(f>=-v)if(f<=v){const b=1/u;h*=b,f*=b,p=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f<=-v?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c):f<=v?(h=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(tl).addScaledVector(aa,f),p}intersectSphere(e,t){if(e.radius<0)return null;_i.subVectors(e.center,this.origin);const i=_i.dot(this.direction),s=_i.dot(_i)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,t,i,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,h=e.x-a.x,f=e.y-a.y,p=e.z-a.z,v=t.x-a.x,b=t.y-a.y,g=t.z-a.z,m=i.x-a.x,E=i.y-a.y,A=i.z-a.z,x=Math.abs(l),T=Math.abs(c),w=Math.abs(u);let I,y,R,F,G,K,j,z,O,q,H,ae;if(x>=T&&x>=w?(R=l,K=h,O=v,ae=m,l>=0?(I=c,y=u,F=f,G=p,j=b,z=g,q=E,H=A):(I=u,y=c,F=p,G=f,j=g,z=b,q=A,H=E)):T>=w?(R=c,K=f,O=b,ae=E,c>=0?(I=u,y=l,F=p,G=h,j=g,z=v,q=A,H=m):(I=l,y=u,F=h,G=p,j=v,z=g,q=m,H=A)):(R=u,K=p,O=g,ae=A,u>=0?(I=l,y=c,F=h,G=f,j=v,z=b,q=m,H=E):(I=c,y=l,F=f,G=h,j=b,z=v,q=E,H=m)),R===0)return null;const ne=I/R,de=y/R,pe=1/R,Re=F-ne*K,Oe=G-de*K,lt=j-ne*O,et=z-de*O,Qe=q-ne*ae,D=H-de*ae,W=Qe*et-D*lt,se=Re*D-Oe*Qe,xe=lt*Oe-et*Re;if(s){if(W<0||se<0||xe<0)return null}else if((W<0||se<0||xe<0)&&(W>0||se>0||xe>0))return null;const M=W+se+xe;if(M===0)return null;const P=pe*(W*K+se*O+xe*ae);return(M>0?P<0:P>0)?null:this.at(P/M,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class np extends Vr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xi,this.combine=Nh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ad=new Ot,ji=new zx,la=new Kc,wd=new te,ca=new te,ua=new te,da=new te,nl=new te,fa=new te,Cd=new te,ha=new te;class zn extends sn{constructor(e=new ui,t=new np){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){fa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],h=r[l];u!==0&&(nl.fromBufferAttribute(h,e),a?fa.addScaledVector(nl,u):fa.addScaledVector(nl.sub(t),u))}t.add(fa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),la.copy(i.boundingSphere),la.applyMatrix4(r),ji.copy(e.ray).recast(e.near),!(la.containsPoint(ji.origin)===!1&&(ji.intersectSphere(la,wd)===null||ji.origin.distanceToSquared(wd)>(e.far-e.near)**2))&&(Ad.copy(r).invert(),ji.copy(e.ray).applyMatrix4(Ad),!(i.boundingBox!==null&&ji.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ji)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,b=f.length;v<b;v++){const g=f[v],m=a[g.materialIndex],E=Math.max(g.start,p.start),A=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let x=E,T=A;x<T;x+=3){const w=o.getX(x),I=o.getX(x+1),y=o.getX(x+2);s=pa(this,m,e,i,c,u,h,w,I,y),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const v=Math.max(0,p.start),b=Math.min(o.count,p.start+p.count);for(let g=v,m=b;g<m;g+=3){const E=o.getX(g),A=o.getX(g+1),x=o.getX(g+2);s=pa(this,a,e,i,c,u,h,E,A,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,b=f.length;v<b;v++){const g=f[v],m=a[g.materialIndex],E=Math.max(g.start,p.start),A=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let x=E,T=A;x<T;x+=3){const w=x,I=x+1,y=x+2;s=pa(this,m,e,i,c,u,h,w,I,y),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const v=Math.max(0,p.start),b=Math.min(l.count,p.start+p.count);for(let g=v,m=b;g<m;g+=3){const E=g,A=g+1,x=g+2;s=pa(this,a,e,i,c,u,h,E,A,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function Wx(n,e,t,i,s,r,a,o){let l;if(e.side===gn?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===us,o),l===null)return null;ha.copy(o),ha.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(ha);return c<t.near||c>t.far?null:{distance:c,point:ha.clone(),object:n}}function pa(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,ca),n.getVertexPosition(l,ua),n.getVertexPosition(c,da);const u=Wx(n,e,t,i,ca,ua,da,Cd);if(u){const h=new te;Un.getBarycoord(Cd,ca,ua,da,h),s&&(u.uv=Un.getInterpolatedAttribute(s,o,l,c,h,new dt)),r&&(u.uv1=Un.getInterpolatedAttribute(r,o,l,c,h,new dt)),a&&(u.normal=Un.getInterpolatedAttribute(a,o,l,c,h,new te),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new te,materialIndex:0};Un.getNormal(ca,ua,da,f.normal),u.face=f,u.barycoord=h}return u}class $x extends nn{constructor(e=null,t=1,i=1,s,r,a,o,l,c=qt,u=qt,h,f){super(null,a,o,l,c,u,s,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const es=new Kc,Xx=new dt(.5,.5),ma=new te;class Zc{constructor(e=new Gi,t=new Gi,i=new Gi,s=new Gi,r=new Gi,a=new Gi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ti,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],h=r[5],f=r[6],p=r[7],v=r[8],b=r[9],g=r[10],m=r[11],E=r[12],A=r[13],x=r[14],T=r[15];if(s[0].setComponents(c-a,p-u,m-v,T-E).normalize(),s[1].setComponents(c+a,p+u,m+v,T+E).normalize(),s[2].setComponents(c+o,p+h,m+b,T+A).normalize(),s[3].setComponents(c-o,p-h,m-b,T-A).normalize(),i)s[4].setComponents(l,f,g,x).normalize(),s[5].setComponents(c-l,p-f,m-g,T-x).normalize();else if(s[4].setComponents(c-l,p-f,m-g,T-x).normalize(),t===ti)s[5].setComponents(c+l,p+f,m+g,T+x).normalize();else if(t===Lr)s[5].setComponents(l,f,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),es.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),es.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(es)}intersectsSprite(e){es.center.set(0,0,0);const t=Xx.distanceTo(e.center);return es.radius=.7071067811865476+t,es.applyMatrix4(e.matrixWorld),this.intersectsSphere(es)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ma.x=s.normal.x>0?e.max.x:e.min.x,ma.y=s.normal.y>0?e.max.y:e.min.y,ma.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ma)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ip extends nn{constructor(e=[],t=ds,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Nr extends nn{constructor(e,t,i=oi,s,r,a,o=qt,l=qt,c,u=Ci,h=1){if(u!==Ci&&u!==ls)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:h};super(f,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class qx extends Nr{constructor(e,t=oi,i=ds,s,r,a=qt,o=qt,l,c=Ci){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class sp extends nn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class zr extends ui{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,p=0;v("z","y","x",-1,-1,i,t,e,a,r,0),v("z","y","x",1,-1,i,t,-e,a,r,1),v("x","z","y",1,1,e,i,t,s,a,2),v("x","z","y",1,-1,e,i,-t,s,a,3),v("x","y","z",1,-1,e,t,i,s,r,4),v("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new wn(c,3)),this.setAttribute("normal",new wn(u,3)),this.setAttribute("uv",new wn(h,2));function v(b,g,m,E,A,x,T,w,I,y,R){const F=x/I,G=T/y,K=x/2,j=T/2,z=w/2,O=I+1,q=y+1;let H=0,ae=0;const ne=new te;for(let de=0;de<q;de++){const pe=de*G-j;for(let Re=0;Re<O;Re++){const Oe=Re*F-K;ne[b]=Oe*E,ne[g]=pe*A,ne[m]=z,c.push(ne.x,ne.y,ne.z),ne[b]=0,ne[g]=0,ne[m]=w>0?1:-1,u.push(ne.x,ne.y,ne.z),h.push(Re/I),h.push(1-de/y),H+=1}}for(let de=0;de<y;de++)for(let pe=0;pe<I;pe++){const Re=f+pe+O*de,Oe=f+pe+O*(de+1),lt=f+(pe+1)+O*(de+1),et=f+(pe+1)+O*de;l.push(Re,Oe,et),l.push(Oe,lt,et),ae+=6}o.addGroup(p,ae,R),p+=ae,f+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class oo extends ui{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,h=e/o,f=t/l,p=[],v=[],b=[],g=[];for(let m=0;m<u;m++){const E=m*f-a;for(let A=0;A<c;A++){const x=A*h-r;v.push(x,-E,0),b.push(0,0,1),g.push(A/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let E=0;E<o;E++){const A=E+c*m,x=E+c*(m+1),T=E+1+c*(m+1),w=E+1+c*m;p.push(A,x,w),p.push(x,T,w)}this.setIndex(p),this.setAttribute("position",new wn(v,3)),this.setAttribute("normal",new wn(b,3)),this.setAttribute("uv",new wn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oo(e.width,e.height,e.widthSegments,e.heightSegments)}}class za extends ui{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new te,f=new te,p=[],v=[],b=[],g=[];for(let m=0;m<=i;m++){const E=[],A=m/i,x=a+A*o,T=e*Math.cos(x),w=Math.sqrt(e*e-T*T);let I=0;m===0&&a===0?I=.5/t:m===i&&l===Math.PI&&(I=-.5/t);for(let y=0;y<=t;y++){const R=y/t,F=s+R*r;h.x=-w*Math.cos(F),h.y=T,h.z=w*Math.sin(F),v.push(h.x,h.y,h.z),f.copy(h).normalize(),b.push(f.x,f.y,f.z),g.push(R+I,1-A),E.push(c++)}u.push(E)}for(let m=0;m<i;m++)for(let E=0;E<t;E++){const A=u[m][E+1],x=u[m][E],T=u[m+1][E],w=u[m+1][E+1];(m!==0||a>0)&&p.push(A,x,w),(m!==i-1||l<Math.PI)&&p.push(x,T,w)}this.setIndex(p),this.setAttribute("position",new wn(v,3)),this.setAttribute("normal",new wn(b,3)),this.setAttribute("uv",new wn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new za(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function qs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(Rd(s))s.isRenderTargetTexture?(je("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Rd(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function cn(n){const e={};for(let t=0;t<n.length;t++){const i=qs(n[t]);for(const s in i)e[s]=i[s]}return e}function Rd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Yx(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function rp(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}const Kx={clone:qs,merge:cn};var Zx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ci extends Vr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zx,this.fragmentShader=Jx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qs(e.uniforms),this.uniformsGroups=Yx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new pt().setHex(s.value);break;case"v2":this.uniforms[i].value=new dt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new te().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Pt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new tt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Ot().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Qx extends ci{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Pd extends Vr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new pt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=mc,this.normalScale=new dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class jx extends Vr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ey extends Vr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const il={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(Id(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!Id(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Id(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class ty{constructor(e,t,i){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const p=c[h],v=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const ny=new ty;class Jc{constructor(e){this.manager=e!==void 0?e:ny,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Jc.DEFAULT_MATERIAL_NAME="__DEFAULT";const Rs=new WeakMap;class iy extends Jc{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=il.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let h=Rs.get(a);h===void 0&&(h=[],Rs.set(a,h)),h.push({onLoad:t,onError:s})}return a}const o=Dr("img");function l(){u(),t&&t(this);const h=Rs.get(this)||[];for(let f=0;f<h.length;f++){const p=h[f];p.onLoad&&p.onLoad(this)}Rs.delete(this),r.manager.itemEnd(e)}function c(h){u(),s&&s(h),il.remove(`image:${e}`);const f=Rs.get(this)||[];for(let p=0;p<f.length;p++){const v=f[p];v.onError&&v.onError(h)}Rs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),il.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class sy extends Jc{constructor(e){super(e)}load(e,t,i,s){const r=new nn,a=new iy(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class ap extends sn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new pt(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const sl=new Ot,Ld=new te,Dd=new te;class ry{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new dt(512,512),this.mapType=xn,this.map=null,this.mapPass=null,this.matrix=new Ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zc,this._frameExtents=new dt(1,1),this._viewportCount=1,this._viewports=[new Pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Ld.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ld),Dd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Dd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){sl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(sl,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Lr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(sl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ga=new te,_a=new Zs,qn=new te;class op extends sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ot,this.projectionMatrix=new Ot,this.projectionMatrixInverse=new Ot,this.coordinateSystem=ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ga,_a,qn),qn.x===1&&qn.y===1&&qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,_a,qn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ga,_a,qn),qn.x===1&&qn.y===1&&qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,_a,qn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Bi=new te,Nd=new dt,Ud=new dt;class Tn extends op{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=gc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Uo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gc*2*Math.atan(Math.tan(Uo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z),Bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z)}getViewSize(e,t){return this.getViewBounds(e,Nd,Ud),t.subVectors(Ud,Nd)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Uo*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Qc extends op{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class ay extends ry{constructor(){super(new Qc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Od extends ap{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.target=new sn,this.shadow=new ay}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class oy extends ap{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Ps=-90,Is=1;class ly extends sn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Tn(Ps,Is,e,t);s.layers=this.layers,this.add(s);const r=new Tn(Ps,Is,e,t);r.layers=this.layers,this.add(r);const a=new Tn(Ps,Is,e,t);a.layers=this.layers,this.add(a);const o=new Tn(Ps,Is,e,t);o.layers=this.layers,this.add(o);const l=new Tn(Ps,Is,e,t);l.layers=this.layers,this.add(l);const c=new Tn(Ps,Is,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===ti)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Lr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,f,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class cy extends Tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const iu=class iu{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};iu.prototype.isMatrix2=!0;let Fd=iu;function Bd(n,e,t,i){const s=uy(i);switch(t){case qh:return n*e;case Kh:return n*e/s.components*s.byteLength;case zc:return n*e/s.components*s.byteLength;case fs:return n*e*2/s.components*s.byteLength;case Wc:return n*e*2/s.components*s.byteLength;case Yh:return n*e*3/s.components*s.byteLength;case On:return n*e*4/s.components*s.byteLength;case $c:return n*e*4/s.components*s.byteLength;case Ea:case Ta:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Aa:case wa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Hl:case Vl:return Math.max(n,16)*Math.max(e,8)/4;case kl:case Gl:return Math.max(n,8)*Math.max(e,8)/2;case zl:case Wl:case Xl:case ql:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $l:case ka:case Yl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Kl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Zl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Jl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ql:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case jl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ec:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case tc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case nc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ic:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case sc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case rc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ac:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case oc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case lc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case cc:case uc:case dc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case fc:case hc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ha:case pc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function uy(n){switch(n){case xn:case zh:return{byteLength:1,components:1};case Pr:case Wh:case li:return{byteLength:2,components:1};case Gc:case Vc:return{byteLength:2,components:4};case oi:case Hc:case ei:return{byteLength:4,components:1};case $h:case Xh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:kc}}));typeof window<"u"&&(window.__THREE__?je("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=kc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function lp(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function dy(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,u);else{h.sort((p,v)=>p.start-v.start);let f=0;for(let p=1;p<h.length;p++){const v=h[f],b=h[p];b.start<=v.start+v.count+1?v.count=Math.max(v.count,b.start+b.count-v.start):(++f,h[f]=b)}h.length=f+1;for(let p=0,v=h.length;p<v;p++){const b=h[p];n.bufferSubData(c,b.start*u.BYTES_PER_ELEMENT,u,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var fy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,py=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,my=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_y=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,xy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Sy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,by=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,My=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ey=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ty=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ay=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,wy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Cy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ry=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Py=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Iy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ly=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Dy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ny=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Uy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Oy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Fy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,By=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ky=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vy="gl_FragColor = linearToOutputTexel( gl_FragColor );",zy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Wy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,$y=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Xy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,qy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ky=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,eS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,nS=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,iS=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,sS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,rS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,aS=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,oS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,uS=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,dS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,fS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,hS=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pS=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,mS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_S=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,SS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,bS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,MS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ES=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,TS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,AS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,CS=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,RS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,PS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,IS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,LS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,DS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,NS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,US=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,OS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,FS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,BS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,HS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,GS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,VS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,WS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$S=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,XS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,YS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,KS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ZS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,JS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,QS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,eb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,nb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ib=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ab=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ob=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,lb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ub=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,db=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const fb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_b=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,xb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,yb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Sb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,bb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Mb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ab=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,wb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ib=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Db=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Nb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ub=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ob=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Fb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Gb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$b=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,at={alphahash_fragment:fy,alphahash_pars_fragment:hy,alphamap_fragment:py,alphamap_pars_fragment:my,alphatest_fragment:gy,alphatest_pars_fragment:_y,aomap_fragment:vy,aomap_pars_fragment:xy,batching_pars_vertex:yy,batching_vertex:Sy,begin_vertex:by,beginnormal_vertex:My,bsdfs:Ey,iridescence_fragment:Ty,bumpmap_pars_fragment:Ay,clipping_planes_fragment:wy,clipping_planes_pars_fragment:Cy,clipping_planes_pars_vertex:Ry,clipping_planes_vertex:Py,color_fragment:Iy,color_pars_fragment:Ly,color_pars_vertex:Dy,color_vertex:Ny,common:Uy,cube_uv_reflection_fragment:Oy,defaultnormal_vertex:Fy,displacementmap_pars_vertex:By,displacementmap_vertex:ky,emissivemap_fragment:Hy,emissivemap_pars_fragment:Gy,colorspace_fragment:Vy,colorspace_pars_fragment:zy,envmap_fragment:Wy,envmap_common_pars_fragment:$y,envmap_pars_fragment:Xy,envmap_pars_vertex:qy,envmap_physical_pars_fragment:sS,envmap_vertex:Yy,fog_vertex:Ky,fog_pars_vertex:Zy,fog_fragment:Jy,fog_pars_fragment:Qy,gradientmap_pars_fragment:jy,lightmap_pars_fragment:eS,lights_lambert_fragment:tS,lights_lambert_pars_fragment:nS,lights_pars_begin:iS,lights_toon_fragment:rS,lights_toon_pars_fragment:aS,lights_phong_fragment:oS,lights_phong_pars_fragment:lS,lights_physical_fragment:cS,lights_physical_pars_fragment:uS,lights_fragment_begin:dS,lights_fragment_maps:fS,lights_fragment_end:hS,lightprobes_pars_fragment:pS,logdepthbuf_fragment:mS,logdepthbuf_pars_fragment:gS,logdepthbuf_pars_vertex:_S,logdepthbuf_vertex:vS,map_fragment:xS,map_pars_fragment:yS,map_particle_fragment:SS,map_particle_pars_fragment:bS,metalnessmap_fragment:MS,metalnessmap_pars_fragment:ES,morphinstance_vertex:TS,morphcolor_vertex:AS,morphnormal_vertex:wS,morphtarget_pars_vertex:CS,morphtarget_vertex:RS,normal_fragment_begin:PS,normal_fragment_maps:IS,normal_pars_fragment:LS,normal_pars_vertex:DS,normal_vertex:NS,normalmap_pars_fragment:US,clearcoat_normal_fragment_begin:OS,clearcoat_normal_fragment_maps:FS,clearcoat_pars_fragment:BS,iridescence_pars_fragment:kS,opaque_fragment:HS,packing:GS,premultiplied_alpha_fragment:VS,project_vertex:zS,dithering_fragment:WS,dithering_pars_fragment:$S,roughnessmap_fragment:XS,roughnessmap_pars_fragment:qS,shadowmap_pars_fragment:YS,shadowmap_pars_vertex:KS,shadowmap_vertex:ZS,shadowmask_pars_fragment:JS,skinbase_vertex:QS,skinning_pars_vertex:jS,skinning_vertex:eb,skinnormal_vertex:tb,specularmap_fragment:nb,specularmap_pars_fragment:ib,tonemapping_fragment:sb,tonemapping_pars_fragment:rb,transmission_fragment:ab,transmission_pars_fragment:ob,uv_pars_fragment:lb,uv_pars_vertex:cb,uv_vertex:ub,worldpos_vertex:db,background_vert:fb,background_frag:hb,backgroundCube_vert:pb,backgroundCube_frag:mb,cube_vert:gb,cube_frag:_b,depth_vert:vb,depth_frag:xb,distance_vert:yb,distance_frag:Sb,equirect_vert:bb,equirect_frag:Mb,linedashed_vert:Eb,linedashed_frag:Tb,meshbasic_vert:Ab,meshbasic_frag:wb,meshlambert_vert:Cb,meshlambert_frag:Rb,meshmatcap_vert:Pb,meshmatcap_frag:Ib,meshnormal_vert:Lb,meshnormal_frag:Db,meshphong_vert:Nb,meshphong_frag:Ub,meshphysical_vert:Ob,meshphysical_frag:Fb,meshtoon_vert:Bb,meshtoon_frag:kb,points_vert:Hb,points_frag:Gb,shadow_vert:Vb,shadow_frag:zb,sprite_vert:Wb,sprite_frag:$b},Ce={common:{diffuse:{value:new pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new te},probesMax:{value:new te},probesResolution:{value:new te}},points:{diffuse:{value:new pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new pt(16777215)},opacity:{value:1},center:{value:new dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},Qn={basic:{uniforms:cn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:cn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new pt(0)},envMapIntensity:{value:1}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:cn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new pt(0)},specular:{value:new pt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:cn([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:cn([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new pt(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:cn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:cn([Ce.points,Ce.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:cn([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:cn([Ce.common,Ce.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:cn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:cn([Ce.sprite,Ce.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distance:{uniforms:cn([Ce.common,Ce.displacementmap,{referencePosition:{value:new te},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distance_vert,fragmentShader:at.distance_frag},shadow:{uniforms:cn([Ce.lights,Ce.fog,{color:{value:new pt(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};Qn.physical={uniforms:cn([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new pt(0)},specularColor:{value:new pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};const va={r:0,b:0,g:0},Xb=new Ot,cp=new tt;cp.set(-1,0,0,0,1,0,0,0,1);function qb(n,e,t,i,s,r){const a=new pt(0);let o=s===!0?0:1,l,c,u=null,h=0,f=null;function p(E){let A=E.isScene===!0?E.background:null;if(A&&A.isTexture){const x=E.backgroundBlurriness>0;A=e.get(A,x)}return A}function v(E){let A=!1;const x=p(E);x===null?g(a,o):x&&x.isColor&&(g(x,1),A=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function b(E,A){const x=p(A);x&&(x.isCubeTexture||x.mapping===ao)?(c===void 0&&(c=new zn(new zr(1,1,1),new ci({name:"BackgroundCubeMaterial",uniforms:qs(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,w,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Xb.makeRotationFromEuler(A.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(cp),c.material.toneMapped=ct.getTransfer(x.colorSpace)!==St,(u!==x||h!==x.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=x,h=x.version,f=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new zn(new oo(2,2),new ci({name:"BackgroundMaterial",uniforms:qs(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:us,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=ct.getTransfer(x.colorSpace)!==St,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||h!==x.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=x,h=x.version,f=n.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function g(E,A){E.getRGB(va,rp(n)),t.buffers.color.setClear(va.r,va.g,va.b,A,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,A=1){a.set(E),o=A,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,g(a,o)},render:v,addToRenderList:b,dispose:m}}function Yb(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,a=!1;function o(G,K,j,z,O){let q=!1;const H=h(G,z,j,K);r!==H&&(r=H,c(r.object)),q=p(G,z,j,O),q&&v(G,z,j,O),O!==null&&e.update(O,n.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,x(G,K,j,z),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return n.createVertexArray()}function c(G){return n.bindVertexArray(G)}function u(G){return n.deleteVertexArray(G)}function h(G,K,j,z){const O=z.wireframe===!0;let q=i[K.id];q===void 0&&(q={},i[K.id]=q);const H=G.isInstancedMesh===!0?G.id:0;let ae=q[H];ae===void 0&&(ae={},q[H]=ae);let ne=ae[j.id];ne===void 0&&(ne={},ae[j.id]=ne);let de=ne[O];return de===void 0&&(de=f(l()),ne[O]=de),de}function f(G){const K=[],j=[],z=[];for(let O=0;O<t;O++)K[O]=0,j[O]=0,z[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:K,enabledAttributes:j,attributeDivisors:z,object:G,attributes:{},index:null}}function p(G,K,j,z){const O=r.attributes,q=K.attributes;let H=0;const ae=j.getAttributes();for(const ne in ae)if(ae[ne].location>=0){const pe=O[ne];let Re=q[ne];if(Re===void 0&&(ne==="instanceMatrix"&&G.instanceMatrix&&(Re=G.instanceMatrix),ne==="instanceColor"&&G.instanceColor&&(Re=G.instanceColor)),pe===void 0||pe.attribute!==Re||Re&&pe.data!==Re.data)return!0;H++}return r.attributesNum!==H||r.index!==z}function v(G,K,j,z){const O={},q=K.attributes;let H=0;const ae=j.getAttributes();for(const ne in ae)if(ae[ne].location>=0){let pe=q[ne];pe===void 0&&(ne==="instanceMatrix"&&G.instanceMatrix&&(pe=G.instanceMatrix),ne==="instanceColor"&&G.instanceColor&&(pe=G.instanceColor));const Re={};Re.attribute=pe,pe&&pe.data&&(Re.data=pe.data),O[ne]=Re,H++}r.attributes=O,r.attributesNum=H,r.index=z}function b(){const G=r.newAttributes;for(let K=0,j=G.length;K<j;K++)G[K]=0}function g(G){m(G,0)}function m(G,K){const j=r.newAttributes,z=r.enabledAttributes,O=r.attributeDivisors;j[G]=1,z[G]===0&&(n.enableVertexAttribArray(G),z[G]=1),O[G]!==K&&(n.vertexAttribDivisor(G,K),O[G]=K)}function E(){const G=r.newAttributes,K=r.enabledAttributes;for(let j=0,z=K.length;j<z;j++)K[j]!==G[j]&&(n.disableVertexAttribArray(j),K[j]=0)}function A(G,K,j,z,O,q,H){H===!0?n.vertexAttribIPointer(G,K,j,O,q):n.vertexAttribPointer(G,K,j,z,O,q)}function x(G,K,j,z){b();const O=z.attributes,q=j.getAttributes(),H=K.defaultAttributeValues;for(const ae in q){const ne=q[ae];if(ne.location>=0){let de=O[ae];if(de===void 0&&(ae==="instanceMatrix"&&G.instanceMatrix&&(de=G.instanceMatrix),ae==="instanceColor"&&G.instanceColor&&(de=G.instanceColor)),de!==void 0){const pe=de.normalized,Re=de.itemSize,Oe=e.get(de);if(Oe===void 0)continue;const lt=Oe.buffer,et=Oe.type,Qe=Oe.bytesPerElement,D=et===n.INT||et===n.UNSIGNED_INT||de.gpuType===Hc;if(de.isInterleavedBufferAttribute){const W=de.data,se=W.stride,xe=de.offset;if(W.isInstancedInterleavedBuffer){for(let M=0;M<ne.locationSize;M++)m(ne.location+M,W.meshPerAttribute);G.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let M=0;M<ne.locationSize;M++)g(ne.location+M);n.bindBuffer(n.ARRAY_BUFFER,lt);for(let M=0;M<ne.locationSize;M++)A(ne.location+M,Re/ne.locationSize,et,pe,se*Qe,(xe+Re/ne.locationSize*M)*Qe,D)}else{if(de.isInstancedBufferAttribute){for(let W=0;W<ne.locationSize;W++)m(ne.location+W,de.meshPerAttribute);G.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let W=0;W<ne.locationSize;W++)g(ne.location+W);n.bindBuffer(n.ARRAY_BUFFER,lt);for(let W=0;W<ne.locationSize;W++)A(ne.location+W,Re/ne.locationSize,et,pe,Re*Qe,Re/ne.locationSize*W*Qe,D)}}else if(H!==void 0){const pe=H[ae];if(pe!==void 0)switch(pe.length){case 2:n.vertexAttrib2fv(ne.location,pe);break;case 3:n.vertexAttrib3fv(ne.location,pe);break;case 4:n.vertexAttrib4fv(ne.location,pe);break;default:n.vertexAttrib1fv(ne.location,pe)}}}}E()}function T(){R();for(const G in i){const K=i[G];for(const j in K){const z=K[j];for(const O in z){const q=z[O];for(const H in q)u(q[H].object),delete q[H];delete z[O]}}delete i[G]}}function w(G){if(i[G.id]===void 0)return;const K=i[G.id];for(const j in K){const z=K[j];for(const O in z){const q=z[O];for(const H in q)u(q[H].object),delete q[H];delete z[O]}}delete i[G.id]}function I(G){for(const K in i){const j=i[K];for(const z in j){const O=j[z];if(O[G.id]===void 0)continue;const q=O[G.id];for(const H in q)u(q[H].object),delete q[H];delete O[G.id]}}}function y(G){for(const K in i){const j=i[K],z=G.isInstancedMesh===!0?G.id:0,O=j[z];if(O!==void 0){for(const q in O){const H=O[q];for(const ae in H)u(H[ae].object),delete H[ae];delete O[q]}delete j[z],Object.keys(j).length===0&&delete i[K]}}}function R(){F(),a=!0,r!==s&&(r=s,c(r.object))}function F(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:F,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:y,releaseStatesOfProgram:I,initAttributes:b,enableAttribute:g,disableUnusedAttributes:E}}function Kb(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let f=0;for(let p=0;p<u;p++)f+=c[p];t.update(f,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Zb(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(I){return!(I!==On&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){const y=I===li&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==xn&&I!==ei&&!y&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(je("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&je("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:v,maxTextureSize:b,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:E,maxVaryings:A,maxFragmentUniforms:x,maxSamples:T,samples:w}}function Jb(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Gi,o=new tt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||s;return s=f,i=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,p){const v=h.clippingPlanes,b=h.clipIntersection,g=h.clipShadows,m=n.get(h);if(!s||v===null||v.length===0||r&&!g)r?u(null):c();else{const E=r?0:i,A=E*4;let x=m.clippingState||null;l.value=x,x=u(v,f,A,p);for(let T=0;T!==A;++T)x[T]=t[T];m.clippingState=x,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,p,v){const b=h!==null?h.length:0;let g=null;if(b!==0){if(g=l.value,v!==!0||g===null){const m=p+b*4,E=f.matrixWorldInverse;o.getNormalMatrix(E),(g===null||g.length<m)&&(g=new Float32Array(m));for(let A=0,x=p;A!==b;++A,x+=4)a.copy(h[A]).applyMatrix4(E,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,g}}const Os=4,Qb=6,jb=20,eM=256,or=new Qc,kd=new pt;let rl=null,al=0,ol=0,ll=!1;const tM=new te,ts=new te;class Hd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=tM}=r;rl=this._renderer.getRenderTarget(),al=this._renderer.getActiveCubeFace(),ol=this._renderer.getActiveMipmapLevel(),ll=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(rl,al,ol),this._renderer.xr.enabled=ll,e.scissorTest=!1,Ls(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ds||e.mapping===Xs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),rl=this._renderer.getRenderTarget(),al=this._renderer.getActiveCubeFace(),ol=this._renderer.getActiveMipmapLevel(),ll=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:en,minFilter:en,generateMipmaps:!1,type:li,format:On,colorSpace:Ga,depthBuffer:!1},s=Gd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gd(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=nM(r)),this._blurMaterial=sM(r,e,t),this._ggxMaterial=iM(r,e,t)}return s}_compileMaterial(e){const t=new zn(new ui,e);this._renderer.compile(t,or)}_sceneToCubeUV(e,t,i,s,r){const l=new Tn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,p=h.toneMapping;h.getClearColor(kd),h.toneMapping=ii,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new zn(new zr,new np({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,g=b.material;let m=!1;const E=e.background;E?E.isColor&&(g.color.copy(E),e.background=null,m=!0):(g.color.copy(kd),m=!0);for(let A=0;A<6;A++){const x=A%3;x===0?(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[A],r.y,r.z)):x===1?(l.up.set(0,0,c[A]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[A],r.z)):(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[A]));const T=this._cubeSize;Ls(s,x*T,A>2?T:0,T,T),h.setRenderTarget(s),m&&h.render(b,l),h.render(e,l)}h.toneMapping=p,h.autoClear=f,e.background=E}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ds||e.mapping===Xs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=zd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vd());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ls(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,or)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),f=c*1.25,p=h*f,{_lodMax:v}=this,b=this._sizeLods[i],g=3*b*(i>v-Os?i-v+Os:0),m=4*(this._cubeSize-b);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=v-t,Ls(r,g,m,3*b,2*b),s.setRenderTarget(r),s.render(o,or),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=v-i,Ls(e,g,m,3*b,2*b),s.setRenderTarget(e),s.render(o,or)}_blur(e,t,i,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;const u=this._sizeLods[s],h=3*u*(s>this._lodMax-Os?s-this._lodMax+Os:0),f=4*(this._cubeSize-u);Ls(t,h,f,3*u,2*u),a.setRenderTarget(t),a.render(l,or)}}function nM(n){const e=[],t=[];let i=n;const s=n-Os+1+Qb;for(let r=0;r<s;r++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,f=6,p=3,v=new Float32Array(p*f*h),b=new Float32Array(p*f*h);for(let m=0;m<h;m++){const E=m%3*2/3-1,A=m>2?0:-1,x=[E,A,0,E+2/3,A,0,E+2/3,A+1,0,E,A,0,E+2/3,A+1,0,E,A+1,0];v.set(x,p*f*m);for(let T=0;T<f;T++){const w=u[T*2]*2-1,I=u[T*2+1]*2-1;m===0?ts.set(1,I,w):m===1?ts.set(-w,1,-I):m===2?ts.set(-w,I,1):m===3?ts.set(-1,I,-w):m===4?ts.set(-w,-1,I):ts.set(w,I,-1),ts.toArray(b,(m*f+T)*p)}}const g=new ui;g.setAttribute("position",new wi(v,p)),g.setAttribute("outputDirection",new wi(b,p)),t.push(new zn(g,null)),i>Os&&i--}return{lodMeshes:t,sizeLods:e}}function Gd(n,e,t){const i=new kn(n,e,t);return i.texture.mapping=ao,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ls(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function iM(n,e,t){return new ci({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:eM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:lo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function sM(n,e,t){return new ci({name:"SphericalGaussianBlur",defines:{SAMPLES:jb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:lo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function Vd(){return new ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function zd(){return new ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function lo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class up extends kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new ip(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new zr(5,5,5),r=new ci({name:"CubemapFromEquirect",uniforms:qs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:gn,blending:Ti});r.uniforms.tEquirect.value=t;const a=new zn(s,r),o=t.minFilter;return t.minFilter===os&&(t.minFilter=en),new ly(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function rM(n){let e=new WeakMap,t=new WeakMap,i=null;function s(f,p=!1){return f==null?null:p?a(f):r(f)}function r(f){if(f&&f.isTexture){const p=f.mapping;if(p===Io||p===Lo)if(e.has(f)){const v=e.get(f).texture;return o(v,f.mapping)}else{const v=f.image;if(v&&v.height>0){const b=new up(v.height);return b.fromEquirectangularTexture(n,f),e.set(f,b),f.addEventListener("dispose",c),o(b.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const p=f.mapping,v=p===Io||p===Lo,b=p===ds||p===Xs;if(v||b){let g=t.get(f);const m=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return i===null&&(i=new Hd(n)),g=v?i.fromEquirectangular(f,g):i.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{const E=f.image;return v&&E&&E.height>0||b&&E&&l(E)?(i===null&&(i=new Hd(n)),g=v?i.fromEquirectangular(f):i.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",u),g.texture):null}}}return f}function o(f,p){return p===Io?f.mapping=ds:p===Lo&&(f.mapping=Xs),f}function l(f){let p=0;const v=6;for(let b=0;b<v;b++)f[b]!==void 0&&p++;return p===v}function c(f){const p=f.target;p.removeEventListener("dispose",c);const v=e.get(p);v!==void 0&&(e.delete(p),v.dispose())}function u(f){const p=f.target;p.removeEventListener("dispose",u);const v=t.get(p);v!==void 0&&(t.delete(p),v.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function aM(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&ks("WebGLRenderer: "+i+" extension not supported."),s}}}function oM(n,e,t,i){const s={},r=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);f.removeEventListener("dispose",a),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const p in f)e.update(f[p],n.ARRAY_BUFFER)}function c(h){const f=[],p=h.index,v=h.attributes.position;let b=0;if(v===void 0)return;if(p!==null){const E=p.array;b=p.version;for(let A=0,x=E.length;A<x;A+=3){const T=E[A+0],w=E[A+1],I=E[A+2];f.push(T,w,w,I,I,T)}}else{const E=v.array;b=v.version;for(let A=0,x=E.length/3-1;A<x;A+=3){const T=A+0,w=A+1,I=A+2;f.push(T,w,w,I,I,T)}}const g=new(v.count>=65535?tp:ep)(f,1);g.version=b;const m=r.get(h);m&&e.remove(m),r.set(h,g)}function u(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function lM(n,e,t){let i;function s(h){i=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,f){n.drawElements(i,f,r,h*a),t.update(f,i,1)}function c(h,f,p){p!==0&&(n.drawElementsInstanced(i,f,r,h*a,p),t.update(f,i,p))}function u(h,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,h,0,p);let b=0;for(let g=0;g<p;g++)b+=f[g];t.update(b,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function cM(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:mt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function uM(n,e,t){const i=new WeakMap,s=new Pt;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==h){let F=function(){y.dispose(),i.delete(o),o.removeEventListener("dispose",F)};var p=F;f!==void 0&&f.texture.dispose();const v=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let x=0;v===!0&&(x=1),b===!0&&(x=2),g===!0&&(x=3);let T=o.attributes.position.count*x,w=1;T>e.maxTextureSize&&(w=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const I=new Float32Array(T*w*4*h),y=new Jh(I,T,w,h);y.type=ei,y.needsUpdate=!0;const R=x*4;for(let G=0;G<h;G++){const K=m[G],j=E[G],z=A[G],O=T*w*4*G;for(let q=0;q<K.count;q++){const H=q*R;v===!0&&(s.fromBufferAttribute(K,q),I[O+H+0]=s.x,I[O+H+1]=s.y,I[O+H+2]=s.z,I[O+H+3]=0),b===!0&&(s.fromBufferAttribute(j,q),I[O+H+4]=s.x,I[O+H+5]=s.y,I[O+H+6]=s.z,I[O+H+7]=0),g===!0&&(s.fromBufferAttribute(z,q),I[O+H+8]=s.x,I[O+H+9]=s.y,I[O+H+10]=s.z,I[O+H+11]=z.itemSize===4?s.w:1)}}f={count:h,texture:y,size:new dt(T,w)},i.set(o,f),o.addEventListener("dispose",F)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let v=0;for(let g=0;g<c.length;g++)v+=c[g];const b=o.morphTargetsRelative?1:1-v;l.getUniforms().setValue(n,"morphTargetBaseInfluence",b),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function dM(n,e,t,i,s){let r=new WeakMap;function a(c){const u=s.render.frame,h=c.geometry,f=e.get(c,h);if(r.get(f)!==u&&(e.update(f),r.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return f}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const fM={[Uh]:"LINEAR_TONE_MAPPING",[Oh]:"REINHARD_TONE_MAPPING",[Fh]:"CINEON_TONE_MAPPING",[Bh]:"ACES_FILMIC_TONE_MAPPING",[Hh]:"AGX_TONE_MAPPING",[Gh]:"NEUTRAL_TONE_MAPPING",[kh]:"CUSTOM_TONE_MAPPING"};function hM(n,e,t,i,s,r){const a=new kn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new ui;c.setAttribute("position",new wn([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new wn([0,2,0,0,2,0],2));const u=new Qx({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new zn(c,u),f=new Qc(-1,1,1,-1,0,1);let p=null,v=null,b=!1,g,m=null,E=[],A=!1;this.setSize=function(x,T){a.setSize(x,T),o!==null&&o.setSize(x,T),l!==null&&l.setSize(x,T);for(let w=0;w<E.length;w++){const I=E[w];I.setSize&&I.setSize(x,T)}},this.setEffects=function(x){E=x,A=E.length>0&&E[0].isRenderPass===!0;const T=a.width,w=a.height;E.length>0&&o===null&&(o=new kn(T,w,{type:li,depthBuffer:!1,stencilBuffer:!1}),l=new kn(T,w,{type:li,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<E.length;I++){const y=E[I];y.setSize&&y.setSize(T,w)}},this.begin=function(x,T){if(b||x.toneMapping===ii&&E.length===0)return!1;if(m=T,T!==null){const w=T.width,I=T.height;(a.width!==w||a.height!==I)&&this.setSize(w,I)}return A===!1&&x.setRenderTarget(a),g=x.toneMapping,x.toneMapping=ii,!0},this.hasRenderPass=function(){return A},this.end=function(x,T){x.toneMapping=g,b=!0;let w=a,I=o;for(let y=0;y<E.length;y++){const R=E[y];R.enabled!==!1&&(R.render(x,I,w,T),R.needsSwap!==!1&&(w=I,I=I===o?l:o))}if(p!==x.outputColorSpace||v!==x.toneMapping){p=x.outputColorSpace,v=x.toneMapping,u.defines={},ct.getTransfer(p)===St&&(u.defines.SRGB_TRANSFER="");const y=fM[v];y&&(u.defines[y]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=w.texture,x.setRenderTarget(m),x.render(h,f),m=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const dp=new nn,_c=new Nr(1,1),fp=new Jh,hp=new Cx,pp=new ip,Wd=[],$d=[],Xd=new Float32Array(16),qd=new Float32Array(9),Yd=new Float32Array(4);function Js(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Wd[s];if(r===void 0&&(r=new Float32Array(s),Wd[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Vt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function co(n,e){let t=$d[e];t===void 0&&(t=new Int32Array(e),$d[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function pM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function mM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2fv(this.addr,e),zt(t,e)}}function gM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;n.uniform3fv(this.addr,e),zt(t,e)}}function _M(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4fv(this.addr,e),zt(t,e)}}function vM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(Vt(t,i))return;Yd.set(i),n.uniformMatrix2fv(this.addr,!1,Yd),zt(t,i)}}function xM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(Vt(t,i))return;qd.set(i),n.uniformMatrix3fv(this.addr,!1,qd),zt(t,i)}}function yM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(Vt(t,i))return;Xd.set(i),n.uniformMatrix4fv(this.addr,!1,Xd),zt(t,i)}}function SM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function bM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2iv(this.addr,e),zt(t,e)}}function MM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;n.uniform3iv(this.addr,e),zt(t,e)}}function EM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4iv(this.addr,e),zt(t,e)}}function TM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function AM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2uiv(this.addr,e),zt(t,e)}}function wM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;n.uniform3uiv(this.addr,e),zt(t,e)}}function CM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4uiv(this.addr,e),zt(t,e)}}function RM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(_c.compareFunction=t.isReversedDepthBuffer()?qc:Xc,r=_c):r=dp,t.setTexture2D(e||r,s)}function PM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||hp,s)}function IM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||pp,s)}function LM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||fp,s)}function DM(n){switch(n){case 5126:return pM;case 35664:return mM;case 35665:return gM;case 35666:return _M;case 35674:return vM;case 35675:return xM;case 35676:return yM;case 5124:case 35670:return SM;case 35667:case 35671:return bM;case 35668:case 35672:return MM;case 35669:case 35673:return EM;case 5125:return TM;case 36294:return AM;case 36295:return wM;case 36296:return CM;case 35678:case 36198:case 36298:case 36306:case 35682:return RM;case 35679:case 36299:case 36307:return PM;case 35680:case 36300:case 36308:case 36293:return IM;case 36289:case 36303:case 36311:case 36292:return LM}}function NM(n,e){n.uniform1fv(this.addr,e)}function UM(n,e){const t=Js(e,this.size,2);n.uniform2fv(this.addr,t)}function OM(n,e){const t=Js(e,this.size,3);n.uniform3fv(this.addr,t)}function FM(n,e){const t=Js(e,this.size,4);n.uniform4fv(this.addr,t)}function BM(n,e){const t=Js(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function kM(n,e){const t=Js(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function HM(n,e){const t=Js(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function GM(n,e){n.uniform1iv(this.addr,e)}function VM(n,e){n.uniform2iv(this.addr,e)}function zM(n,e){n.uniform3iv(this.addr,e)}function WM(n,e){n.uniform4iv(this.addr,e)}function $M(n,e){n.uniform1uiv(this.addr,e)}function XM(n,e){n.uniform2uiv(this.addr,e)}function qM(n,e){n.uniform3uiv(this.addr,e)}function YM(n,e){n.uniform4uiv(this.addr,e)}function KM(n,e,t){const i=this.cache,s=e.length,r=co(t,s);Vt(i,r)||(n.uniform1iv(this.addr,r),zt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=_c:a=dp;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function ZM(n,e,t){const i=this.cache,s=e.length,r=co(t,s);Vt(i,r)||(n.uniform1iv(this.addr,r),zt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||hp,r[a])}function JM(n,e,t){const i=this.cache,s=e.length,r=co(t,s);Vt(i,r)||(n.uniform1iv(this.addr,r),zt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||pp,r[a])}function QM(n,e,t){const i=this.cache,s=e.length,r=co(t,s);Vt(i,r)||(n.uniform1iv(this.addr,r),zt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||fp,r[a])}function jM(n){switch(n){case 5126:return NM;case 35664:return UM;case 35665:return OM;case 35666:return FM;case 35674:return BM;case 35675:return kM;case 35676:return HM;case 5124:case 35670:return GM;case 35667:case 35671:return VM;case 35668:case 35672:return zM;case 35669:case 35673:return WM;case 5125:return $M;case 36294:return XM;case 36295:return qM;case 36296:return YM;case 35678:case 36198:case 36298:case 36306:case 35682:return KM;case 35679:case 36299:case 36307:return ZM;case 35680:case 36300:case 36308:case 36293:return JM;case 36289:case 36303:case 36311:case 36292:return QM}}class eE{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=DM(t.type)}}class tE{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jM(t.type)}}class nE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const cl=/(\w+)(\])?(\[|\.)?/g;function Kd(n,e){n.seq.push(e),n.map[e.id]=e}function iE(n,e,t){const i=n.name,s=i.length;for(cl.lastIndex=0;;){const r=cl.exec(i),a=cl.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Kd(t,c===void 0?new eE(o,n,e):new tE(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new nE(o),Kd(t,h)),t=h}}}class Ca{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);iE(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Zd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const sE=37297;let rE=0;function aE(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Jd=new tt;function oE(n){ct._getMatrix(Jd,ct.workingColorSpace,n);const e=`mat3( ${Jd.elements.map(t=>t.toFixed(4))} )`;switch(ct.getTransfer(n)){case Va:return[e,"LinearTransferOETF"];case St:return[e,"sRGBTransferOETF"];default:return je("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Qd(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+aE(n.getShaderSource(e),o)}else return r}function lE(n,e){const t=oE(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const cE={[Uh]:"Linear",[Oh]:"Reinhard",[Fh]:"Cineon",[Bh]:"ACESFilmic",[Hh]:"AgX",[Gh]:"Neutral",[kh]:"Custom"};function uE(n,e){const t=cE[e];return t===void 0?(je("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const xa=new te;function dE(){ct.getLuminanceCoefficients(xa);const n=xa.x.toFixed(4),e=xa.y.toFixed(4),t=xa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fr).join(`
`)}function hE(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function pE(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function fr(n){return n!==""}function jd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ef(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const mE=/^[ \t]*#include +<([\w\d./]+)>/gm;function vc(n){return n.replace(mE,_E)}const gE=new Map;function _E(n,e){let t=at[e];if(t===void 0){const i=gE.get(e);if(i!==void 0)t=at[i],je('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return vc(t)}const vE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tf(n){return n.replace(vE,xE)}function xE(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function nf(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const yE={[Ma]:"SHADOWMAP_TYPE_PCF",[dr]:"SHADOWMAP_TYPE_VSM"};function SE(n){return yE[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const bE={[ds]:"ENVMAP_TYPE_CUBE",[Xs]:"ENVMAP_TYPE_CUBE",[ao]:"ENVMAP_TYPE_CUBE_UV"};function ME(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":bE[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const EE={[Xs]:"ENVMAP_MODE_REFRACTION"};function TE(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":EE[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const AE={[Nh]:"ENVMAP_BLENDING_MULTIPLY",[rx]:"ENVMAP_BLENDING_MIX",[ax]:"ENVMAP_BLENDING_ADD"};function wE(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":AE[n.combine]||"ENVMAP_BLENDING_NONE"}function CE(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function RE(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=SE(t),c=ME(t),u=TE(t),h=wE(t),f=CE(t),p=fE(t),v=hE(r),b=s.createProgram();let g,m,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(fr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(fr).join(`
`),m.length>0&&(m+=`
`)):(g=[nf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fr).join(`
`),m=[nf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ii?"#define TONE_MAPPING":"",t.toneMapping!==ii?at.tonemapping_pars_fragment:"",t.toneMapping!==ii?uE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,lE("linearToOutputTexel",t.outputColorSpace),dE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fr).join(`
`)),a=vc(a),a=jd(a,t),a=ef(a,t),o=vc(o),o=jd(o,t),o=ef(o,t),a=tf(a),o=tf(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===fd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===fd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const A=E+g+a,x=E+m+o,T=Zd(s,s.VERTEX_SHADER,A),w=Zd(s,s.FRAGMENT_SHADER,x);s.attachShader(b,T),s.attachShader(b,w),t.index0AttributeName!==void 0?s.bindAttribLocation(b,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function I(G){if(n.debug.checkShaderErrors){const K=s.getProgramInfoLog(b)||"",j=s.getShaderInfoLog(T)||"",z=s.getShaderInfoLog(w)||"",O=K.trim(),q=j.trim(),H=z.trim();let ae=!0,ne=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(ae=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,b,T,w);else{const de=Qd(s,T,"vertex"),pe=Qd(s,w,"fragment");mt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+O+`
`+de+`
`+pe)}else O!==""?je("WebGLProgram: Program Info Log:",O):(q===""||H==="")&&(ne=!1);ne&&(G.diagnostics={runnable:ae,programLog:O,vertexShader:{log:q,prefix:g},fragmentShader:{log:H,prefix:m}})}s.deleteShader(T),s.deleteShader(w),y=new Ca(s,b),R=pE(s,b)}let y;this.getUniforms=function(){return y===void 0&&I(this),y};let R;this.getAttributes=function(){return R===void 0&&I(this),R};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(b,sE)),F},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rE++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=T,this.fragmentShader=w,this}let PE=0;class IE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new LE(e),t.set(e,i)),i}}class LE{constructor(e){this.id=PE++,this.code=e,this.usedTimes=0}}function DE(n){return n===fs||n===ka||n===Ha}function NE(n,e,t,i,s,r){const a=new Qh,o=new IE,l=new Set,c=[],u=new Map,h=i.logarithmicDepthBuffer;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return l.add(y),y===0?"uv":`uv${y}`}function b(y,R,F,G,K,j){const z=G.fog,O=K.geometry,q=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?G.environment:null,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,ae=e.get(y.envMap||q,H),ne=ae&&ae.mapping===ao?ae.image.height:null,de=p[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&je("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const pe=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Re=pe!==void 0?pe.length:0;let Oe=0;O.morphAttributes.position!==void 0&&(Oe=1),O.morphAttributes.normal!==void 0&&(Oe=2),O.morphAttributes.color!==void 0&&(Oe=3);let lt,et,Qe,D;if(de){const At=Qn[de];lt=At.vertexShader,et=At.fragmentShader}else{lt=y.vertexShader,et=y.fragmentShader;const At=o.getVertexShaderStage(y),_t=o.getFragmentShaderStage(y);o.update(y,At,_t),Qe=At.id,D=_t.id}const W=n.getRenderTarget(),se=n.state.buffers.depth.getReversed(),xe=K.isInstancedMesh===!0,M=K.isBatchedMesh===!0,P=!!y.map,V=!!y.matcap,X=!!ae,Q=!!y.aoMap,oe=!!y.lightMap,le=!!y.bumpMap&&y.wireframe===!1,me=!!y.normalMap,_e=!!y.displacementMap,fe=!!y.emissiveMap,Me=!!y.metalnessMap,ye=!!y.roughnessMap,L=y.anisotropy>0,Be=y.clearcoat>0,ke=y.dispersion>0,C=y.retroreflectivity>0,_=y.iridescence>0,k=y.sheen>0,Y=y.transmission>0,re=L&&!!y.anisotropyMap,ve=Be&&!!y.clearcoatMap,be=Be&&!!y.clearcoatNormalMap,ue=Be&&!!y.clearcoatRoughnessMap,ce=_&&!!y.iridescenceMap,Se=_&&!!y.iridescenceThicknessMap,ze=k&&!!y.sheenColorMap,Ee=k&&!!y.sheenRoughnessMap,Te=!!y.specularMap,qe=!!y.specularColorMap,Ze=!!y.specularIntensityMap,it=Y&&!!y.transmissionMap,B=Y&&!!y.thicknessMap,Ae=!!y.gradientMap,he=!!y.alphaMap,we=y.alphaTest>0,De=!!y.alphaHash,ge=!!y.extensions;let Ye=ii;y.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(Ye=n.toneMapping);const We={shaderID:de,shaderType:y.type,shaderName:y.name,vertexShader:lt,fragmentShader:et,defines:y.defines,customVertexShaderID:Qe,customFragmentShaderID:D,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:M,batchingColor:M&&K._colorsTexture!==null,instancing:xe,instancingColor:xe&&K.instanceColor!==null,instancingMorph:xe&&K.morphTexture!==null,outputColorSpace:W===null?n.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:ct.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:P,matcap:V,envMap:X,envMapMode:X&&ae.mapping,envMapCubeUVHeight:ne,aoMap:Q,lightMap:oe,bumpMap:le,normalMap:me,displacementMap:_e,emissiveMap:fe,normalMapObjectSpace:me&&y.normalMapType===cx,normalMapTangentSpace:me&&y.normalMapType===mc,packedNormalMap:me&&y.normalMapType===mc&&DE(y.normalMap.format),metalnessMap:Me,roughnessMap:ye,anisotropy:L,anisotropyMap:re,clearcoat:Be,clearcoatMap:ve,clearcoatNormalMap:be,clearcoatRoughnessMap:ue,dispersion:ke,retroreflection:C,iridescence:_,iridescenceMap:ce,iridescenceThicknessMap:Se,sheen:k,sheenColorMap:ze,sheenRoughnessMap:Ee,specularMap:Te,specularColorMap:qe,specularIntensityMap:Ze,transmission:Y,transmissionMap:it,thicknessMap:B,gradientMap:Ae,opaque:y.transparent===!1&&y.blending===Sr&&y.alphaToCoverage===!1,alphaMap:he,alphaTest:we,alphaHash:De,combine:y.combine,mapUv:P&&v(y.map.channel),aoMapUv:Q&&v(y.aoMap.channel),lightMapUv:oe&&v(y.lightMap.channel),bumpMapUv:le&&v(y.bumpMap.channel),normalMapUv:me&&v(y.normalMap.channel),displacementMapUv:_e&&v(y.displacementMap.channel),emissiveMapUv:fe&&v(y.emissiveMap.channel),metalnessMapUv:Me&&v(y.metalnessMap.channel),roughnessMapUv:ye&&v(y.roughnessMap.channel),anisotropyMapUv:re&&v(y.anisotropyMap.channel),clearcoatMapUv:ve&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:be&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:Se&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&v(y.sheenRoughnessMap.channel),specularMapUv:Te&&v(y.specularMap.channel),specularColorMapUv:qe&&v(y.specularColorMap.channel),specularIntensityMapUv:Ze&&v(y.specularIntensityMap.channel),transmissionMapUv:it&&v(y.transmissionMap.channel),thicknessMapUv:B&&v(y.thicknessMap.channel),alphaMapUv:he&&v(y.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(me||L),vertexNormals:!!O.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:K.isPoints===!0&&!!O.attributes.uv&&(P||he),fog:!!z,useFog:y.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||O.attributes.normal===void 0&&me===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:se,skinning:K.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Re,morphTextureStride:Oe,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:j.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&F.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ye,decodeVideoTexture:P&&y.map.isVideoTexture===!0&&ct.getTransfer(y.map.colorSpace)===St,decodeVideoTextureEmissive:fe&&y.emissiveMap.isVideoTexture===!0&&ct.getTransfer(y.emissiveMap.colorSpace)===St,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===bi,flipSided:y.side===gn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ge&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&y.extensions.multiDraw===!0||M)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return We.vertexUv1s=l.has(1),We.vertexUv2s=l.has(2),We.vertexUv3s=l.has(3),l.clear(),We}function g(y){const R=[];if(y.shaderID?R.push(y.shaderID):(R.push(y.customVertexShaderID),R.push(y.customFragmentShaderID)),y.defines!==void 0)for(const F in y.defines)R.push(F),R.push(y.defines[F]);return y.isRawShaderMaterial===!1&&(m(R,y),E(R,y),R.push(n.outputColorSpace)),R.push(y.customProgramCacheKey),R.join()}function m(y,R){y.push(R.precision),y.push(R.outputColorSpace),y.push(R.envMapMode),y.push(R.envMapCubeUVHeight),y.push(R.mapUv),y.push(R.alphaMapUv),y.push(R.lightMapUv),y.push(R.aoMapUv),y.push(R.bumpMapUv),y.push(R.normalMapUv),y.push(R.displacementMapUv),y.push(R.emissiveMapUv),y.push(R.metalnessMapUv),y.push(R.roughnessMapUv),y.push(R.anisotropyMapUv),y.push(R.clearcoatMapUv),y.push(R.clearcoatNormalMapUv),y.push(R.clearcoatRoughnessMapUv),y.push(R.iridescenceMapUv),y.push(R.iridescenceThicknessMapUv),y.push(R.sheenColorMapUv),y.push(R.sheenRoughnessMapUv),y.push(R.specularMapUv),y.push(R.specularColorMapUv),y.push(R.specularIntensityMapUv),y.push(R.transmissionMapUv),y.push(R.thicknessMapUv),y.push(R.combine),y.push(R.fogExp2),y.push(R.sizeAttenuation),y.push(R.morphTargetsCount),y.push(R.morphAttributeCount),y.push(R.numSunLights),y.push(R.numDirLights),y.push(R.numPointLights),y.push(R.numSpotLights),y.push(R.numSpotLightMaps),y.push(R.numHemiLights),y.push(R.numRectAreaLights),y.push(R.numSunLightShadows),y.push(R.numDirLightShadows),y.push(R.numPointLightShadows),y.push(R.numSpotLightShadows),y.push(R.numSpotLightShadowsWithMaps),y.push(R.numLightProbes),y.push(R.shadowMapType),y.push(R.toneMapping),y.push(R.numClippingPlanes),y.push(R.numClipIntersection),y.push(R.depthPacking)}function E(y,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.retroreflection&&a.enable(24),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),R.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function A(y){const R=p[y.type];let F;if(R){const G=Qn[R];F=Kx.clone(G.uniforms)}else F=y.uniforms;return F}function x(y,R){let F=u.get(R);return F!==void 0?++F.usedTimes:(F=new RE(n,R,y,s),c.push(F),u.set(R,F)),F}function T(y){if(--y.usedTimes===0){const R=c.indexOf(y);c[R]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function w(y){o.remove(y)}function I(){o.dispose()}return{getParameters:b,getProgramCacheKey:g,getUniforms:A,acquireProgram:x,releaseProgram:T,releaseShaderCache:w,programs:c,dispose:I}}function UE(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function OE(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function sf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function rf(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(f){let p=0;return f.isInstancedMesh&&(p+=2),f.isSkinnedMesh&&(p+=1),p}function o(f,p,v,b,g,m){let E=n[e];return E===void 0?(E={id:f.id,object:f,geometry:p,material:v,materialVariant:a(f),groupOrder:b,renderOrder:f.renderOrder,z:g,group:m},n[e]=E):(E.id=f.id,E.object=f,E.geometry=p,E.material=v,E.materialVariant=a(f),E.groupOrder=b,E.renderOrder=f.renderOrder,E.z=g,E.group=m),e++,E}function l(f,p,v,b,g,m,E){E.reversedDepth===!0&&(g=-g);const A=o(f,p,v,b,g,m);v.transmission>0?i.push(A):v.transparent===!0?s.push(A):t.push(A)}function c(f,p,v,b,g,m){const E=o(f,p,v,b,g,m);v.transmission>0?i.unshift(E):v.transparent===!0?s.unshift(E):t.unshift(E)}function u(f,p){t.length>1&&t.sort(f||OE),i.length>1&&i.sort(p||sf),s.length>1&&s.sort(p||sf)}function h(){for(let f=e,p=n.length;f<p;f++){const v=n[f];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:h,sort:u}}function FE(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new rf,n.set(i,[a])):s>=r.length?(a=new rf,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function BE(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new te,color:new pt};break;case"SpotLight":t={position:new te,direction:new te,color:new pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new te,color:new pt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new te,skyColor:new pt,groundColor:new pt};break;case"RectAreaLight":t={color:new pt,position:new te,halfWidth:new te,halfHeight:new te};break}return n[e.id]=t,t}}}function kE(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let HE=0;function GE(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function VE(n){const e=new BE,t=kE(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new te);const s=new te,r=new Ot,a=new Ot;function o(c){let u=0,h=0,f=0;for(let K=0;K<9;K++)i.probe[K].set(0,0,0);let p=0,v=0,b=0,g=0,m=0,E=0,A=0,x=0,T=0,w=0,I=0,y=0,R=0,F=0;c.sort(GE);for(let K=0,j=c.length;K<j;K++){const z=c[K],O=z.color,q=z.intensity,H=z.distance;let ae=null;if(z.shadow&&z.shadow.map&&(z.shadow.map.texture.format===fs?ae=z.shadow.map.texture:ae=z.shadow.map.depthTexture||z.shadow.map.texture),z.isAmbientLight)u+=O.r*q,h+=O.g*q,f+=O.b*q;else if(z.isLightProbe){for(let ne=0;ne<9;ne++)i.probe[ne].addScaledVector(z.sh.coefficients[ne],q);F++}else if(z.isSunLight){const ne=e.get(z);if(ne.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){const de=z.shadow,pe=t.get(z);pe.shadowIntensity=de.intensity,pe.shadowBias=de.bias,pe.shadowNormalBias=de.normalBias,pe.shadowRadius=de.radius,pe.shadowMapSize.copy(de.mapSize).multiply(de.getFrameExtents()),i.sunShadow[v]=pe,i.sunShadowMap[v]=ae;const Re=de.getViewportCount();for(let Oe=0;Oe<Re;Oe++)i.sunShadowMatrix[b+Oe]=de.getMatrix(Oe),i.sunShadowCascade[b+Oe]=de._cascadeData[Oe];b+=Re,v++}i.sun[p]=ne,p++}else if(z.isDirectionalLight){const ne=e.get(z);if(ne.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){const de=z.shadow,pe=t.get(z);pe.shadowIntensity=de.intensity,pe.shadowBias=de.bias,pe.shadowNormalBias=de.normalBias,pe.shadowRadius=de.radius,pe.shadowMapSize=de.mapSize,i.directionalShadow[g]=pe,i.directionalShadowMap[g]=ae,i.directionalShadowMatrix[g]=z.shadow.matrix,T++}i.directional[g]=ne,g++}else if(z.isSpotLight){const ne=e.get(z);ne.position.setFromMatrixPosition(z.matrixWorld),ne.color.copy(O).multiplyScalar(q),ne.distance=H,ne.coneCos=Math.cos(z.angle),ne.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),ne.decay=z.decay,i.spot[E]=ne;const de=z.shadow;if(z.map&&(i.spotLightMap[y]=z.map,y++,de.updateMatrices(z),z.castShadow&&R++),i.spotLightMatrix[E]=de.matrix,z.castShadow){const pe=t.get(z);pe.shadowIntensity=de.intensity,pe.shadowBias=de.bias,pe.shadowNormalBias=de.normalBias,pe.shadowRadius=de.radius,pe.shadowMapSize=de.mapSize,i.spotShadow[E]=pe,i.spotShadowMap[E]=ae,I++}E++}else if(z.isRectAreaLight){const ne=e.get(z);ne.color.copy(O).multiplyScalar(q),ne.halfWidth.set(z.width*.5,0,0),ne.halfHeight.set(0,z.height*.5,0),i.rectArea[A]=ne,A++}else if(z.isPointLight){const ne=e.get(z);if(ne.color.copy(z.color).multiplyScalar(z.intensity),ne.distance=z.distance,ne.decay=z.decay,z.castShadow){const de=z.shadow,pe=t.get(z);pe.shadowIntensity=de.intensity,pe.shadowBias=de.bias,pe.shadowNormalBias=de.normalBias,pe.shadowRadius=de.radius,pe.shadowMapSize=de.mapSize,pe.shadowCameraNear=de.camera.near,pe.shadowCameraFar=de.camera.far,i.pointShadow[m]=pe,i.pointShadowMap[m]=ae,i.pointShadowMatrix[m]=z.shadow.matrix,w++}i.point[m]=ne,m++}else if(z.isHemisphereLight){const ne=e.get(z);ne.skyColor.copy(z.color).multiplyScalar(q),ne.groundColor.copy(z.groundColor).multiplyScalar(q),i.hemi[x]=ne,x++}}A>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ce.LTC_FLOAT_1,i.rectAreaLTC2=Ce.LTC_FLOAT_2):(i.rectAreaLTC1=Ce.LTC_HALF_1,i.rectAreaLTC2=Ce.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const G=i.hash;(G.sunLength!==p||G.directionalLength!==g||G.pointLength!==m||G.spotLength!==E||G.rectAreaLength!==A||G.hemiLength!==x||G.numSunShadows!==v||G.numDirectionalShadows!==T||G.numPointShadows!==w||G.numSpotShadows!==I||G.numSpotMaps!==y||G.numLightProbes!==F)&&(i.sun.length=p,i.directional.length=g,i.spot.length=E,i.rectArea.length=A,i.point.length=m,i.hemi.length=x,i.sunShadow.length=v,i.sunShadowMap.length=v,i.sunShadowMatrix.length=b,i.sunShadowCascade.length=b,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=I,i.spotShadowMap.length=I,i.spotLightMatrix.length=I+y-R,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=F,G.sunLength=p,G.directionalLength=g,G.pointLength=m,G.spotLength=E,G.rectAreaLength=A,G.hemiLength=x,G.numSunShadows=v,G.numDirectionalShadows=T,G.numPointShadows=w,G.numSpotShadows=I,G.numSpotMaps=y,G.numLightProbes=F,i.version=HE++)}function l(c,u){let h=0,f=0,p=0,v=0,b=0,g=0;const m=u.matrixWorldInverse;for(let E=0,A=c.length;E<A;E++){const x=c[E];if(x.isSunLight){const T=i.sun[h];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(m),h++}else if(x.isDirectionalLight){const T=i.directional[f];T.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),f++}else if(x.isSpotLight){const T=i.spot[v];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),v++}else if(x.isRectAreaLight){const T=i.rectArea[b];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),a.identity(),r.copy(x.matrixWorld),r.premultiply(m),a.extractRotation(r),T.halfWidth.set(x.width*.5,0,0),T.halfHeight.set(0,x.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),b++}else if(x.isPointLight){const T=i.point[p];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),p++}else if(x.isHemisphereLight){const T=i.hemi[g];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function af(n){const e=new VE(n),t=[],i=[],s=[];function r(f){h.camera=f,t.length=0,i.length=0,s.length=0}function a(f){t.push(f)}function o(f){i.push(f)}function l(f){s.push(f)}function c(){e.setup(t)}function u(f){e.setupView(t,f)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function zE(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new af(n),e.set(s,[o])):r>=a.length?(o=new af(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const WE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$E=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,XE=[new te(1,0,0),new te(-1,0,0),new te(0,1,0),new te(0,-1,0),new te(0,0,1),new te(0,0,-1)],qE=[new te(0,-1,0),new te(0,-1,0),new te(0,0,1),new te(0,0,-1),new te(0,-1,0),new te(0,-1,0)],of=new Ot,lr=new te,ul=new te;function YE(n,e,t){let i=new Zc;const s=new dt,r=new dt,a=new Pt,o=new jx,l=new ey,c={},u=t.maxTextureSize,h={[us]:gn,[gn]:us,[bi]:bi},f=new ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new dt},radius:{value:4}},vertexShader:WE,fragmentShader:$E}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const v=new ui;v.setAttribute("position",new wi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new zn(v,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ma;let m=this.type;this.render=function(w,I,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===H0&&(je("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ma);const R=n.getRenderTarget(),F=n.getActiveCubeFace(),G=n.getActiveMipmapLevel(),K=n.state;K.setBlending(Ti),K.buffers.depth.getReversed()===!0?K.buffers.color.setClear(0,0,0,0):K.buffers.color.setClear(1,1,1,1),K.buffers.depth.setTest(!0),K.setScissorTest(!1);const j=m!==this.type;j&&I.traverse(function(z){z.material&&(Array.isArray(z.material)?z.material.forEach(O=>O.needsUpdate=!0):z.material.needsUpdate=!0)});for(let z=0,O=w.length;z<O;z++){const q=w[z],H=q.shadow;if(H===void 0){je("WebGLShadowMap:",q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const ae=H.getFrameExtents();s.multiply(ae),r.copy(H.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ae.x),s.x=r.x*ae.x,H.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ae.y),s.y=r.y*ae.y,H.mapSize.y=r.y));const ne=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=ne,H.map===null||j===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===dr){if(q.isPointLight){je("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new kn(s.x,s.y,{format:fs,type:li,minFilter:en,magFilter:en,generateMipmaps:!1}),H.map.texture.name=q.name+".shadowMap",H.map.depthTexture=new Nr(s.x,s.y,ei),H.map.depthTexture.name=q.name+".shadowMapDepth",H.map.depthTexture.format=Ci,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=qt,H.map.depthTexture.magFilter=qt}else q.isPointLight?(H.map=new up(s.x),H.map.depthTexture=new qx(s.x,oi)):(H.map=new kn(s.x,s.y),H.map.depthTexture=new Nr(s.x,s.y,oi)),H.map.depthTexture.name=q.name+".shadowMap",H.map.depthTexture.format=Ci,this.type===Ma?(H.map.depthTexture.compareFunction=ne?qc:Xc,H.map.depthTexture.minFilter=en,H.map.depthTexture.magFilter=en):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=qt,H.map.depthTexture.magFilter=qt);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==s.x||H.map.height!==s.y)&&H.map.setSize(s.x,s.y);const de=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();q.isPointLight!==!0&&H.updateMatrices(q,y);for(let pe=0;pe<de;pe++){const Re=H.getCamera(pe);if(q.isPointLight){const Oe=H.camera,lt=H.matrix,et=q.distance||Oe.far;et!==Oe.far&&(Oe.far=et,Oe.updateProjectionMatrix()),lr.setFromMatrixPosition(q.matrixWorld),Oe.position.copy(lr),ul.copy(Oe.position),ul.add(XE[pe]),Oe.up.copy(qE[pe]),Oe.lookAt(ul),Oe.updateMatrixWorld(),lt.makeTranslation(-lr.x,-lr.y,-lr.z),of.multiplyMatrices(Oe.projectionMatrix,Oe.matrixWorldInverse),H._frustum.setFromProjectionMatrix(of,Oe.coordinateSystem,Oe.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,pe),n.clear();else{pe===0&&(n.setRenderTarget(H.map),n.clear());const Oe=H.getViewport(pe);a.set(r.x*Oe.x,r.y*Oe.y,r.x*Oe.z,r.y*Oe.w),K.viewport(a)}i=H.getFrustum(pe),x(I,y,Re,q,this.type)}H.isPointLightShadow!==!0&&this.type===dr&&E(H,y),H.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(R,F,G)};function E(w,I){const y=e.update(b);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null?w.mapPass=new kn(s.x,s.y,{format:fs,type:li}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),f.uniforms.shadow_pass.value=w.map.depthTexture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(I,null,y,f,b,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value.set(w.map.width,w.map.height),p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(I,null,y,p,b,null)}function A(w,I,y,R){let F=null;const G=y.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(G!==void 0)F=G;else if(F=y.isPointLight===!0?l:o,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const K=F.uuid,j=I.uuid;let z=c[K];z===void 0&&(z={},c[K]=z);let O=z[j];O===void 0&&(O=F.clone(),z[j]=O,I.addEventListener("dispose",T)),F=O}if(F.visible=I.visible,F.wireframe=I.wireframe,R===dr?F.side=I.shadowSide!==null?I.shadowSide:I.side:F.side=I.shadowSide!==null?I.shadowSide:h[I.side],F.alphaMap=I.alphaMap,F.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,F.map=I.map,F.clipShadows=I.clipShadows,F.clippingPlanes=I.clippingPlanes,F.clipIntersection=I.clipIntersection,F.displacementMap=I.displacementMap,F.displacementScale=I.displacementScale,F.displacementBias=I.displacementBias,F.wireframeLinewidth=I.wireframeLinewidth,F.linewidth=I.linewidth,y.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const K=n.properties.get(F);K.light=y}return F}function x(w,I,y,R,F){if(w.visible===!1)return;if(w.layers.test(I.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&F===dr)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,w.matrixWorld);const j=e.update(w),z=w.material;if(Array.isArray(z)){const O=j.groups;for(let q=0,H=O.length;q<H;q++){const ae=O[q],ne=z[ae.materialIndex];if(ne&&ne.visible){const de=A(w,ne,R,F);w.onBeforeShadow(n,w,I,y,j,de,ae),n.renderBufferDirect(y,null,j,de,w,ae),w.onAfterShadow(n,w,I,y,j,de,ae)}}}else if(z.visible){const O=A(w,z,R,F);w.onBeforeShadow(n,w,I,y,j,O,null),n.renderBufferDirect(y,null,j,O,w,null),w.onAfterShadow(n,w,I,y,j,O,null)}}const K=w.children;for(let j=0,z=K.length;j<z;j++)x(K[j],I,y,R,F)}function T(w){w.target.removeEventListener("dispose",T);for(const y in c){const R=c[y],F=w.target.uuid;F in R&&(R[F].dispose(),delete R[F])}}}function KE(n,e){function t(){let B=!1;const Ae=new Pt;let he=null;const we=new Pt(0,0,0,0);return{setMask:function(De){he!==De&&!B&&(n.colorMask(De,De,De,De),he=De)},setLocked:function(De){B=De},setClear:function(De,ge,Ye,We,At){At===!0&&(De*=We,ge*=We,Ye*=We),Ae.set(De,ge,Ye,We),we.equals(Ae)===!1&&(n.clearColor(De,ge,Ye,We),we.copy(Ae))},reset:function(){B=!1,he=null,we.set(-1,0,0,0)}}}function i(){let B=!1,Ae=!1,he=null,we=null,De=null;return{setReversed:function(ge){if(Ae!==ge){const Ye=e.get("EXT_clip_control");ge?Ye.clipControlEXT(Ye.LOWER_LEFT_EXT,Ye.ZERO_TO_ONE_EXT):Ye.clipControlEXT(Ye.LOWER_LEFT_EXT,Ye.NEGATIVE_ONE_TO_ONE_EXT),Ae=ge;const We=De;De=null,this.setClear(We)}},getReversed:function(){return Ae},setTest:function(ge){ge?W(n.DEPTH_TEST):se(n.DEPTH_TEST)},setMask:function(ge){he!==ge&&!B&&(n.depthMask(ge),he=ge)},setFunc:function(ge){if(Ae&&(ge=Sx[ge]),we!==ge){switch(ge){case Pl:n.depthFunc(n.NEVER);break;case Il:n.depthFunc(n.ALWAYS);break;case Ll:n.depthFunc(n.LESS);break;case Rr:n.depthFunc(n.LEQUAL);break;case Dl:n.depthFunc(n.EQUAL);break;case Nl:n.depthFunc(n.GEQUAL);break;case Ul:n.depthFunc(n.GREATER);break;case Ol:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}we=ge}},setLocked:function(ge){B=ge},setClear:function(ge){De!==ge&&(De=ge,Ae&&(ge=1-ge),n.clearDepth(ge))},reset:function(){B=!1,he=null,we=null,De=null,Ae=!1}}}function s(){let B=!1,Ae=null,he=null,we=null,De=null,ge=null,Ye=null,We=null,At=null;return{setTest:function(_t){B||(_t?W(n.STENCIL_TEST):se(n.STENCIL_TEST))},setMask:function(_t){Ae!==_t&&!B&&(n.stencilMask(_t),Ae=_t)},setFunc:function(_t,Pn,Wn){(he!==_t||we!==Pn||De!==Wn)&&(n.stencilFunc(_t,Pn,Wn),he=_t,we=Pn,De=Wn)},setOp:function(_t,Pn,Wn){(ge!==_t||Ye!==Pn||We!==Wn)&&(n.stencilOp(_t,Pn,Wn),ge=_t,Ye=Pn,We=Wn)},setLocked:function(_t){B=_t},setClear:function(_t){At!==_t&&(n.clearStencil(_t),At=_t)},reset:function(){B=!1,Ae=null,he=null,we=null,De=null,ge=null,Ye=null,We=null,At=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let u={},h={},f={},p=new WeakMap,v=[],b=null,g=!1,m=null,E=null,A=null,x=null,T=null,w=null,I=null,y=new pt(0,0,0),R=0,F=!1,G=null,K=null,j=null,z=null,O=null;const q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,ae=0;const ne=n.getParameter(n.VERSION);ne.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(ne)[1]),H=ae>=1):ne.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),H=ae>=2);let de=null,pe={};const Re=n.getParameter(n.SCISSOR_BOX),Oe=n.getParameter(n.VIEWPORT),lt=new Pt().fromArray(Re),et=new Pt().fromArray(Oe);function Qe(B,Ae,he,we){const De=new Uint8Array(4),ge=n.createTexture();n.bindTexture(B,ge),n.texParameteri(B,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(B,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ye=0;Ye<he;Ye++)B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?n.texImage3D(Ae,0,n.RGBA,1,1,we,0,n.RGBA,n.UNSIGNED_BYTE,De):n.texImage2D(Ae+Ye,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,De);return ge}const D={};D[n.TEXTURE_2D]=Qe(n.TEXTURE_2D,n.TEXTURE_2D,1),D[n.TEXTURE_CUBE_MAP]=Qe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),D[n.TEXTURE_2D_ARRAY]=Qe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),D[n.TEXTURE_3D]=Qe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),W(n.DEPTH_TEST),a.setFunc(Rr),le(!1),me(cd),W(n.CULL_FACE),Q(Ti);function W(B){u[B]!==!0&&(n.enable(B),u[B]=!0)}function se(B){u[B]!==!1&&(n.disable(B),u[B]=!1)}function xe(B,Ae){return f[B]!==Ae?(n.bindFramebuffer(B,Ae),f[B]=Ae,B===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=Ae),B===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=Ae),!0):!1}function M(B,Ae){let he=v,we=!1;if(B){he=p.get(Ae),he===void 0&&(he=[],p.set(Ae,he));const De=B.textures;if(he.length!==De.length||he[0]!==n.COLOR_ATTACHMENT0){for(let ge=0,Ye=De.length;ge<Ye;ge++)he[ge]=n.COLOR_ATTACHMENT0+ge;he.length=De.length,we=!0}}else he[0]!==n.BACK&&(he[0]=n.BACK,we=!0);we&&n.drawBuffers(he)}function P(B){return b!==B?(n.useProgram(B),b=B,!0):!1}const V={[Us]:n.FUNC_ADD,[V0]:n.FUNC_SUBTRACT,[z0]:n.FUNC_REVERSE_SUBTRACT};V[W0]=n.MIN,V[$0]=n.MAX;const X={[X0]:n.ZERO,[q0]:n.ONE,[Y0]:n.SRC_COLOR,[Lh]:n.SRC_ALPHA,[ex]:n.SRC_ALPHA_SATURATE,[Q0]:n.DST_COLOR,[Z0]:n.DST_ALPHA,[K0]:n.ONE_MINUS_SRC_COLOR,[Dh]:n.ONE_MINUS_SRC_ALPHA,[j0]:n.ONE_MINUS_DST_COLOR,[J0]:n.ONE_MINUS_DST_ALPHA,[tx]:n.CONSTANT_COLOR,[nx]:n.ONE_MINUS_CONSTANT_COLOR,[ix]:n.CONSTANT_ALPHA,[sx]:n.ONE_MINUS_CONSTANT_ALPHA};function Q(B,Ae,he,we,De,ge,Ye,We,At,_t){if(B===Ti){g===!0&&(se(n.BLEND),g=!1);return}if(g===!1&&(W(n.BLEND),g=!0),B!==G0){if(B!==m||_t!==F){if((E!==Us||T!==Us)&&(n.blendEquation(n.FUNC_ADD),E=Us,T=Us),_t)switch(B){case Sr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Rl:n.blendFunc(n.ONE,n.ONE);break;case ud:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case dd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:mt("WebGLState: Invalid blending: ",B);break}else switch(B){case Sr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Rl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ud:mt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case dd:mt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:mt("WebGLState: Invalid blending: ",B);break}A=null,x=null,w=null,I=null,y.set(0,0,0),R=0,m=B,F=_t}return}De=De||Ae,ge=ge||he,Ye=Ye||we,(Ae!==E||De!==T)&&(n.blendEquationSeparate(V[Ae],V[De]),E=Ae,T=De),(he!==A||we!==x||ge!==w||Ye!==I)&&(n.blendFuncSeparate(X[he],X[we],X[ge],X[Ye]),A=he,x=we,w=ge,I=Ye),(We.equals(y)===!1||At!==R)&&(n.blendColor(We.r,We.g,We.b,At),y.copy(We),R=At),m=B,F=!1}function oe(B,Ae){B.side===bi?se(n.CULL_FACE):W(n.CULL_FACE);let he=B.side===gn;Ae&&(he=!he),le(he),B.blending===Sr&&B.transparent===!1?Q(Ti):Q(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),r.setMask(B.colorWrite);const we=B.stencilWrite;o.setTest(we),we&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),fe(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?W(n.SAMPLE_ALPHA_TO_COVERAGE):se(n.SAMPLE_ALPHA_TO_COVERAGE)}function le(B){G!==B&&(B?n.frontFace(n.CW):n.frontFace(n.CCW),G=B)}function me(B){B!==B0?(W(n.CULL_FACE),B!==K&&(B===cd?n.cullFace(n.BACK):B===k0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):se(n.CULL_FACE),K=B}function _e(B){B!==j&&(H&&n.lineWidth(B),j=B)}function fe(B,Ae,he){B?(W(n.POLYGON_OFFSET_FILL),(z!==Ae||O!==he)&&(z=Ae,O=he,a.getReversed()&&(Ae=-Ae),n.polygonOffset(Ae,he))):se(n.POLYGON_OFFSET_FILL)}function Me(B){B?W(n.SCISSOR_TEST):se(n.SCISSOR_TEST)}function ye(B){B===void 0&&(B=n.TEXTURE0+q-1),de!==B&&(n.activeTexture(B),de=B)}function L(B,Ae,he){he===void 0&&(de===null?he=n.TEXTURE0+q-1:he=de);let we=pe[he];we===void 0&&(we={type:void 0,texture:void 0},pe[he]=we),(we.type!==B||we.texture!==Ae)&&(de!==he&&(n.activeTexture(he),de=he),n.bindTexture(B,Ae||D[B]),we.type=B,we.texture=Ae)}function Be(){const B=pe[de];B!==void 0&&B.type!==void 0&&(n.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function ke(){try{n.compressedTexImage2D(...arguments)}catch(B){mt("WebGLState:",B)}}function C(){try{n.compressedTexImage3D(...arguments)}catch(B){mt("WebGLState:",B)}}function _(){try{n.texSubImage2D(...arguments)}catch(B){mt("WebGLState:",B)}}function k(){try{n.texSubImage3D(...arguments)}catch(B){mt("WebGLState:",B)}}function Y(){try{n.compressedTexSubImage2D(...arguments)}catch(B){mt("WebGLState:",B)}}function re(){try{n.compressedTexSubImage3D(...arguments)}catch(B){mt("WebGLState:",B)}}function ve(){try{n.texStorage2D(...arguments)}catch(B){mt("WebGLState:",B)}}function be(){try{n.texStorage3D(...arguments)}catch(B){mt("WebGLState:",B)}}function ue(){try{n.texImage2D(...arguments)}catch(B){mt("WebGLState:",B)}}function ce(){try{n.texImage3D(...arguments)}catch(B){mt("WebGLState:",B)}}function Se(B){return h[B]!==void 0?h[B]:n.getParameter(B)}function ze(B,Ae){h[B]!==Ae&&(n.pixelStorei(B,Ae),h[B]=Ae)}function Ee(B){lt.equals(B)===!1&&(n.scissor(B.x,B.y,B.z,B.w),lt.copy(B))}function Te(B){et.equals(B)===!1&&(n.viewport(B.x,B.y,B.z,B.w),et.copy(B))}function qe(B,Ae){let he=c.get(Ae);he===void 0&&(he=new WeakMap,c.set(Ae,he));let we=he.get(B);we===void 0&&(we=n.getUniformBlockIndex(Ae,B.name),he.set(B,we))}function Ze(B,Ae){const we=c.get(Ae).get(B);l.get(Ae)!==we&&(n.uniformBlockBinding(Ae,we,B.__bindingPointIndex),l.set(Ae,we))}function it(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},de=null,pe={},f={},p=new WeakMap,v=[],b=null,g=!1,m=null,E=null,A=null,x=null,T=null,w=null,I=null,y=new pt(0,0,0),R=0,F=!1,G=null,K=null,j=null,z=null,O=null,lt.set(0,0,n.canvas.width,n.canvas.height),et.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:W,disable:se,bindFramebuffer:xe,drawBuffers:M,useProgram:P,setBlending:Q,setMaterial:oe,setFlipSided:le,setCullFace:me,setLineWidth:_e,setPolygonOffset:fe,setScissorTest:Me,activeTexture:ye,bindTexture:L,unbindTexture:Be,compressedTexImage2D:ke,compressedTexImage3D:C,texImage2D:ue,texImage3D:ce,pixelStorei:ze,getParameter:Se,updateUBOMapping:qe,uniformBlockBinding:Ze,texStorage2D:ve,texStorage3D:be,texSubImage2D:_,texSubImage3D:k,compressedTexSubImage2D:Y,compressedTexSubImage3D:re,scissor:Ee,viewport:Te,reset:it}}function ZE(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new dt,u=new WeakMap,h=new Set;let f;const p=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(C,_){return v?new OffscreenCanvas(C,_):Dr("canvas")}function g(C,_,k){let Y=1;const re=ke(C);if((re.width>k||re.height>k)&&(Y=k/Math.max(re.width,re.height)),Y<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const ve=Math.floor(Y*re.width),be=Math.floor(Y*re.height);f===void 0&&(f=b(ve,be));const ue=_?b(ve,be):f;return ue.width=ve,ue.height=be,ue.getContext("2d").drawImage(C,0,0,ve,be),je("WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+ve+"x"+be+")."),ue}else return"data"in C&&je("WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),C;return C}function m(C){return C.generateMipmaps}function E(C){n.generateMipmap(C)}function A(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(C,_,k,Y,re,ve=!1){if(C!==null){if(n[C]!==void 0)return n[C];je("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let be;Y&&(be=e.get("EXT_texture_norm16"),be||je("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ue=_;if(_===n.RED&&(k===n.FLOAT&&(ue=n.R32F),k===n.HALF_FLOAT&&(ue=n.R16F),k===n.UNSIGNED_BYTE&&(ue=n.R8),k===n.UNSIGNED_SHORT&&be&&(ue=be.R16_EXT),k===n.SHORT&&be&&(ue=be.R16_SNORM_EXT)),_===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(ue=n.R8UI),k===n.UNSIGNED_SHORT&&(ue=n.R16UI),k===n.UNSIGNED_INT&&(ue=n.R32UI),k===n.BYTE&&(ue=n.R8I),k===n.SHORT&&(ue=n.R16I),k===n.INT&&(ue=n.R32I)),_===n.RG&&(k===n.FLOAT&&(ue=n.RG32F),k===n.HALF_FLOAT&&(ue=n.RG16F),k===n.UNSIGNED_BYTE&&(ue=n.RG8),k===n.UNSIGNED_SHORT&&be&&(ue=be.RG16_EXT),k===n.SHORT&&be&&(ue=be.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(ue=n.RG8UI),k===n.UNSIGNED_SHORT&&(ue=n.RG16UI),k===n.UNSIGNED_INT&&(ue=n.RG32UI),k===n.BYTE&&(ue=n.RG8I),k===n.SHORT&&(ue=n.RG16I),k===n.INT&&(ue=n.RG32I)),_===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(ue=n.RGB8UI),k===n.UNSIGNED_SHORT&&(ue=n.RGB16UI),k===n.UNSIGNED_INT&&(ue=n.RGB32UI),k===n.BYTE&&(ue=n.RGB8I),k===n.SHORT&&(ue=n.RGB16I),k===n.INT&&(ue=n.RGB32I)),_===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(ue=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(ue=n.RGBA16UI),k===n.UNSIGNED_INT&&(ue=n.RGBA32UI),k===n.BYTE&&(ue=n.RGBA8I),k===n.SHORT&&(ue=n.RGBA16I),k===n.INT&&(ue=n.RGBA32I)),_===n.RGB&&(k===n.UNSIGNED_SHORT&&be&&(ue=be.RGB16_EXT),k===n.SHORT&&be&&(ue=be.RGB16_SNORM_EXT),k===n.UNSIGNED_INT_5_9_9_9_REV&&(ue=n.RGB9_E5),k===n.UNSIGNED_INT_10F_11F_11F_REV&&(ue=n.R11F_G11F_B10F)),_===n.RGBA){const ce=ve?Va:ct.getTransfer(re);k===n.FLOAT&&(ue=n.RGBA32F),k===n.HALF_FLOAT&&(ue=n.RGBA16F),k===n.UNSIGNED_BYTE&&(ue=ce===St?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT&&be&&(ue=be.RGBA16_EXT),k===n.SHORT&&be&&(ue=be.RGBA16_SNORM_EXT),k===n.UNSIGNED_SHORT_4_4_4_4&&(ue=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(ue=n.RGB5_A1)}return(ue===n.R16F||ue===n.R32F||ue===n.RG16F||ue===n.RG32F||ue===n.RGBA16F||ue===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function T(C,_){let k;return C?_===null||_===oi||_===Ir?k=n.DEPTH24_STENCIL8:_===ei?k=n.DEPTH32F_STENCIL8:_===Pr&&(k=n.DEPTH24_STENCIL8,je("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===oi||_===Ir?k=n.DEPTH_COMPONENT24:_===ei?k=n.DEPTH_COMPONENT32F:_===Pr&&(k=n.DEPTH_COMPONENT16),k}function w(C,_){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==qt&&C.minFilter!==en?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function I(C){const _=C.target;_.removeEventListener("dispose",I),R(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&h.delete(_)}function y(C){const _=C.target;_.removeEventListener("dispose",y),G(_)}function R(C){const _=i.get(C);if(_.__webglInit===void 0)return;const k=C.source,Y=p.get(k);if(Y){const re=Y[_.__cacheKey];re.usedTimes--,re.usedTimes===0&&F(C),Object.keys(Y).length===0&&p.delete(k)}i.remove(C)}function F(C){const _=i.get(C);n.deleteTexture(_.__webglTexture);const k=C.source,Y=p.get(k);delete Y[_.__cacheKey],a.memory.textures--}function G(C){const _=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let re=0;re<_.__webglFramebuffer[Y].length;re++)n.deleteFramebuffer(_.__webglFramebuffer[Y][re]);else n.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)n.deleteFramebuffer(_.__webglFramebuffer[Y]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const k=C.textures;for(let Y=0,re=k.length;Y<re;Y++){const ve=i.get(k[Y]);ve.__webglTexture&&(n.deleteTexture(ve.__webglTexture),a.memory.textures--),i.remove(k[Y])}i.remove(C)}let K=0;function j(){K=0}function z(){return K}function O(C){K=C}function q(){const C=K;return C>=s.maxTextures&&je("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),K+=1,C}function H(C){const _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function ae(C,_){const k=i.get(C);if(C.isVideoTexture&&L(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&k.__version!==C.version){const Y=C.image;if(Y===null)je("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)je("WebGLRenderer: Texture marked for update but image is incomplete");else{se(k,C,_);return}}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+_)}function ne(C,_){const k=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){se(k,C,_);return}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+_)}function de(C,_){const k=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){se(k,C,_);return}t.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+_)}function pe(C,_){const k=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&k.__version!==C.version){xe(k,C,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+_)}const Re={[Fl]:n.REPEAT,[Mi]:n.CLAMP_TO_EDGE,[Bl]:n.MIRRORED_REPEAT},Oe={[qt]:n.NEAREST,[ox]:n.NEAREST_MIPMAP_NEAREST,[Jr]:n.NEAREST_MIPMAP_LINEAR,[en]:n.LINEAR,[Do]:n.LINEAR_MIPMAP_NEAREST,[os]:n.LINEAR_MIPMAP_LINEAR},lt={[dx]:n.NEVER,[gx]:n.ALWAYS,[fx]:n.LESS,[Xc]:n.LEQUAL,[hx]:n.EQUAL,[qc]:n.GEQUAL,[px]:n.GREATER,[mx]:n.NOTEQUAL};function et(C,_){if(_.type===ei&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===en||_.magFilter===Do||_.magFilter===Jr||_.magFilter===os||_.minFilter===en||_.minFilter===Do||_.minFilter===Jr||_.minFilter===os)&&je("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,Re[_.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,Re[_.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,Re[_.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,Oe[_.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,Oe[_.minFilter]),_.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,lt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===qt||_.minFilter!==Jr&&_.minFilter!==os||_.type===ei&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Qe(C,_){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",I));const Y=_.source;let re=p.get(Y);re===void 0&&(re={},p.set(Y,re));const ve=H(_);if(ve!==C.__cacheKey){re[ve]===void 0&&(re[ve]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,k=!0),re[ve].usedTimes++;const be=re[C.__cacheKey];be!==void 0&&(re[C.__cacheKey].usedTimes--,be.usedTimes===0&&F(_)),C.__cacheKey=ve,C.__webglTexture=re[ve].texture}return k}function D(C,_,k){return Math.floor(Math.floor(C/k)/_)}function W(C,_,k,Y){const ve=C.updateRanges;if(ve.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,k,Y,_.data);else{ve.sort((ze,Ee)=>ze.start-Ee.start);let be=0;for(let ze=1;ze<ve.length;ze++){const Ee=ve[be],Te=ve[ze],qe=Ee.start+Ee.count,Ze=D(Te.start,_.width,4),it=D(Ee.start,_.width,4);Te.start<=qe+1&&Ze===it&&D(Te.start+Te.count-1,_.width,4)===Ze?Ee.count=Math.max(Ee.count,Te.start+Te.count-Ee.start):(++be,ve[be]=Te)}ve.length=be+1;const ue=t.getParameter(n.UNPACK_ROW_LENGTH),ce=t.getParameter(n.UNPACK_SKIP_PIXELS),Se=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let ze=0,Ee=ve.length;ze<Ee;ze++){const Te=ve[ze],qe=Math.floor(Te.start/4),Ze=Math.ceil(Te.count/4),it=qe%_.width,B=Math.floor(qe/_.width),Ae=Ze,he=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,it),t.pixelStorei(n.UNPACK_SKIP_ROWS,B),t.texSubImage2D(n.TEXTURE_2D,0,it,B,Ae,he,k,Y,_.data)}C.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,ue),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ce),t.pixelStorei(n.UNPACK_SKIP_ROWS,Se)}}function se(C,_,k){let Y=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=n.TEXTURE_3D);const re=Qe(C,_),ve=_.source;t.bindTexture(Y,C.__webglTexture,n.TEXTURE0+k);const be=i.get(ve);if(ve.version!==be.__version||re===!0){if(t.activeTexture(n.TEXTURE0+k),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const he=ct.getPrimaries(ct.workingColorSpace),we=_.colorSpace===Vi?null:ct.getPrimaries(_.colorSpace),De=_.colorSpace===Vi||he===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let ce=g(_.image,!1,s.maxTextureSize);ce=Be(_,ce);const Se=r.convert(_.format,_.colorSpace),ze=r.convert(_.type);let Ee=x(_.internalFormat,Se,ze,_.normalized,_.colorSpace,_.isVideoTexture);et(Y,_);let Te;const qe=_.mipmaps,Ze=_.isVideoTexture!==!0,it=be.__version===void 0||re===!0,B=ve.dataReady,Ae=w(_,ce);if(_.isDepthTexture)Ee=T(_.format===ls,_.type),it&&(Ze?t.texStorage2D(n.TEXTURE_2D,1,Ee,ce.width,ce.height):t.texImage2D(n.TEXTURE_2D,0,Ee,ce.width,ce.height,0,Se,ze,null));else if(_.isDataTexture)if(qe.length>0){Ze&&it&&t.texStorage2D(n.TEXTURE_2D,Ae,Ee,qe[0].width,qe[0].height);for(let he=0,we=qe.length;he<we;he++)Te=qe[he],Ze?B&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,Te.width,Te.height,Se,ze,Te.data):t.texImage2D(n.TEXTURE_2D,he,Ee,Te.width,Te.height,0,Se,ze,Te.data);_.generateMipmaps=!1}else Ze?(it&&t.texStorage2D(n.TEXTURE_2D,Ae,Ee,ce.width,ce.height),B&&W(_,ce,Se,ze)):t.texImage2D(n.TEXTURE_2D,0,Ee,ce.width,ce.height,0,Se,ze,ce.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ze&&it&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ae,Ee,qe[0].width,qe[0].height,ce.depth);for(let he=0,we=qe.length;he<we;he++)if(Te=qe[he],_.format!==On)if(Se!==null)if(Ze){if(B)if(_.layerUpdates.size>0){const De=Bd(Te.width,Te.height,_.format,_.type);for(const ge of _.layerUpdates){const Ye=Te.data.subarray(ge*De/Te.data.BYTES_PER_ELEMENT,(ge+1)*De/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,ge,Te.width,Te.height,1,Se,Ye)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,Te.width,Te.height,ce.depth,Se,Te.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,he,Ee,Te.width,Te.height,ce.depth,0,Te.data,0,0);else je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ze?B&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,Te.width,Te.height,ce.depth,Se,ze,Te.data):t.texImage3D(n.TEXTURE_2D_ARRAY,he,Ee,Te.width,Te.height,ce.depth,0,Se,ze,Te.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ze&&it&&t.texStorage2D(n.TEXTURE_2D,Ae,Ee,qe[0].width,qe[0].height);for(let he=0,we=qe.length;he<we;he++)Te=qe[he],_.format!==On?Se!==null?Ze?B&&t.compressedTexSubImage2D(n.TEXTURE_2D,he,0,0,Te.width,Te.height,Se,Te.data):t.compressedTexImage2D(n.TEXTURE_2D,he,Ee,Te.width,Te.height,0,Te.data):je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?B&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,Te.width,Te.height,Se,ze,Te.data):t.texImage2D(n.TEXTURE_2D,he,Ee,Te.width,Te.height,0,Se,ze,Te.data)}else if(_.isDataArrayTexture)if(Ze){if(it&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ae,Ee,ce.width,ce.height,ce.depth),B)if(_.layerUpdates.size>0){const he=Bd(ce.width,ce.height,_.format,_.type);for(const we of _.layerUpdates){const De=ce.data.subarray(we*he/ce.data.BYTES_PER_ELEMENT,(we+1)*he/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,we,ce.width,ce.height,1,Se,ze,De)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Se,ze,ce.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ee,ce.width,ce.height,ce.depth,0,Se,ze,ce.data);else if(_.isData3DTexture)Ze?(it&&t.texStorage3D(n.TEXTURE_3D,Ae,Ee,ce.width,ce.height,ce.depth),B&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Se,ze,ce.data)):t.texImage3D(n.TEXTURE_3D,0,Ee,ce.width,ce.height,ce.depth,0,Se,ze,ce.data);else if(_.isFramebufferTexture){if(it)if(Ze)t.texStorage2D(n.TEXTURE_2D,Ae,Ee,ce.width,ce.height);else{let he=ce.width,we=ce.height;for(let De=0;De<Ae;De++)t.texImage2D(n.TEXTURE_2D,De,Ee,he,we,0,Se,ze,null),he>>=1,we>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const he=n.canvas;if(he.hasAttribute("layoutsubtree")||he.setAttribute("layoutsubtree","true"),ce.parentNode!==he){he.appendChild(ce),h.add(_),he.onpaint=we=>{const De=we.changedElements;for(const ge of h)De.includes(ge.image)&&(ge.needsUpdate=!0)},he.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ce);else{const De=n.RGBA,ge=n.RGBA,Ye=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,De,ge,Ye,ce)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(qe.length>0){if(Ze&&it){const he=ke(qe[0]);t.texStorage2D(n.TEXTURE_2D,Ae,Ee,he.width,he.height)}for(let he=0,we=qe.length;he<we;he++)Te=qe[he],Ze?B&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,Se,ze,Te):t.texImage2D(n.TEXTURE_2D,he,Ee,Se,ze,Te);_.generateMipmaps=!1}else if(Ze){if(it){const he=ke(ce);t.texStorage2D(n.TEXTURE_2D,Ae,Ee,he.width,he.height)}B&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Se,ze,ce)}else t.texImage2D(n.TEXTURE_2D,0,Ee,Se,ze,ce);m(_)&&E(Y),be.__version=ve.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function xe(C,_,k){if(_.image.length!==6)return;const Y=Qe(C,_),re=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+k);const ve=i.get(re);if(re.version!==ve.__version||Y===!0){t.activeTexture(n.TEXTURE0+k);const be=ct.getPrimaries(ct.workingColorSpace),ue=_.colorSpace===Vi?null:ct.getPrimaries(_.colorSpace),ce=_.colorSpace===Vi||be===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const Se=_.isCompressedTexture||_.image[0].isCompressedTexture,ze=_.image[0]&&_.image[0].isDataTexture,Ee=[];for(let ge=0;ge<6;ge++)!Se&&!ze?Ee[ge]=g(_.image[ge],!0,s.maxCubemapSize):Ee[ge]=ze?_.image[ge].image:_.image[ge],Ee[ge]=Be(_,Ee[ge]);const Te=Ee[0],qe=r.convert(_.format,_.colorSpace),Ze=r.convert(_.type),it=x(_.internalFormat,qe,Ze,_.normalized,_.colorSpace),B=_.isVideoTexture!==!0,Ae=ve.__version===void 0||Y===!0,he=re.dataReady;let we=w(_,Te);et(n.TEXTURE_CUBE_MAP,_);let De;if(Se){B&&Ae&&t.texStorage2D(n.TEXTURE_CUBE_MAP,we,it,Te.width,Te.height);for(let ge=0;ge<6;ge++){De=Ee[ge].mipmaps;for(let Ye=0;Ye<De.length;Ye++){const We=De[Ye];_.format!==On?qe!==null?B?he&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye,0,0,We.width,We.height,qe,We.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye,it,We.width,We.height,0,We.data):je("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye,0,0,We.width,We.height,qe,Ze,We.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye,it,We.width,We.height,0,qe,Ze,We.data)}}}else{if(De=_.mipmaps,B&&Ae){De.length>0&&we++;const ge=ke(Ee[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,we,it,ge.width,ge.height)}for(let ge=0;ge<6;ge++)if(ze){B?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Ee[ge].width,Ee[ge].height,qe,Ze,Ee[ge].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,it,Ee[ge].width,Ee[ge].height,0,qe,Ze,Ee[ge].data);for(let Ye=0;Ye<De.length;Ye++){const At=De[Ye].image[ge].image;B?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye+1,0,0,At.width,At.height,qe,Ze,At.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye+1,it,At.width,At.height,0,qe,Ze,At.data)}}else{B?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,qe,Ze,Ee[ge]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,it,qe,Ze,Ee[ge]);for(let Ye=0;Ye<De.length;Ye++){const We=De[Ye];B?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye+1,0,0,qe,Ze,We.image[ge]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye+1,it,qe,Ze,We.image[ge])}}}m(_)&&E(n.TEXTURE_CUBE_MAP),ve.__version=re.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function M(C,_,k,Y,re,ve){const be=r.convert(k.format,k.colorSpace),ue=r.convert(k.type),ce=x(k.internalFormat,be,ue,k.normalized,k.colorSpace),Se=i.get(_),ze=i.get(k);if(ze.__renderTarget=_,!Se.__hasExternalTextures){const Ee=Math.max(1,_.width>>ve),Te=Math.max(1,_.height>>ve);re===n.TEXTURE_3D||re===n.TEXTURE_2D_ARRAY?t.texImage3D(re,ve,ce,Ee,Te,_.depth,0,be,ue,null):t.texImage2D(re,ve,ce,Ee,Te,0,be,ue,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),ye(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,re,ze.__webglTexture,0,Me(_)):(re===n.TEXTURE_2D||re>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,re,ze.__webglTexture,ve),t.bindFramebuffer(n.FRAMEBUFFER,null)}function P(C,_,k){if(n.bindRenderbuffer(n.RENDERBUFFER,C),_.depthBuffer){const Y=_.depthTexture,re=Y&&Y.isDepthTexture?Y.type:null,ve=T(_.stencilBuffer,re),be=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ye(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Me(_),ve,_.width,_.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Me(_),ve,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ve,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,be,n.RENDERBUFFER,C)}else{const Y=_.textures;for(let re=0;re<Y.length;re++){const ve=Y[re],be=r.convert(ve.format,ve.colorSpace),ue=r.convert(ve.type),ce=x(ve.internalFormat,be,ue,ve.normalized,ve.colorSpace);ye(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Me(_),ce,_.width,_.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Me(_),ce,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ce,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function V(C,_,k){const Y=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const re=i.get(_.depthTexture);if(re.__renderTarget=_,(!re.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y){if(re.__webglInit===void 0&&(re.__webglInit=!0,_.depthTexture.addEventListener("dispose",I)),re.__webglTexture===void 0){re.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,re.__webglTexture),et(n.TEXTURE_CUBE_MAP,_.depthTexture);const Se=r.convert(_.depthTexture.format),ze=r.convert(_.depthTexture.type);let Ee;_.depthTexture.format===Ci?Ee=n.DEPTH_COMPONENT24:_.depthTexture.format===ls&&(Ee=n.DEPTH24_STENCIL8);for(let Te=0;Te<6;Te++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Ee,_.width,_.height,0,Se,ze,null)}}else ae(_.depthTexture,0);const ve=re.__webglTexture,be=Me(_),ue=Y?n.TEXTURE_CUBE_MAP_POSITIVE_X+k:n.TEXTURE_2D,ce=_.depthTexture.format===ls?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Ci)ye(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,ue,ve,0,be):n.framebufferTexture2D(n.FRAMEBUFFER,ce,ue,ve,0);else if(_.depthTexture.format===ls)ye(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,ue,ve,0,be):n.framebufferTexture2D(n.FRAMEBUFFER,ce,ue,ve,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function X(C){const _=i.get(C),k=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){const Y=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const re=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",re)};Y.addEventListener("dispose",re),_.__depthDisposeCallback=re}_.__boundDepthTexture=Y}if(C.depthTexture&&!_.__autoAllocateDepthBuffer)if(k)for(let Y=0;Y<6;Y++)V(_.__webglFramebuffer[Y],C,Y);else{const Y=C.texture.mipmaps;Y&&Y.length>0?V(_.__webglFramebuffer[0],C,0):V(_.__webglFramebuffer,C,0)}else if(k){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=n.createRenderbuffer(),P(_.__webglDepthbuffer[Y],C,!1);else{const re=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=_.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,ve),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,ve)}}else{const Y=C.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),P(_.__webglDepthbuffer,C,!1);else{const re=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ve),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,ve)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Q(C,_,k){const Y=i.get(C);_!==void 0&&M(Y.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&X(C)}function oe(C){const _=C.texture,k=i.get(C),Y=i.get(_);C.addEventListener("dispose",y);const re=C.textures,ve=C.isWebGLCubeRenderTarget===!0,be=re.length>1;if(be||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=_.version,a.memory.textures++),ve){k.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[ue]=[];for(let ce=0;ce<_.mipmaps.length;ce++)k.__webglFramebuffer[ue][ce]=n.createFramebuffer()}else k.__webglFramebuffer[ue]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let ue=0;ue<_.mipmaps.length;ue++)k.__webglFramebuffer[ue]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(be)for(let ue=0,ce=re.length;ue<ce;ue++){const Se=i.get(re[ue]);Se.__webglTexture===void 0&&(Se.__webglTexture=n.createTexture(),a.memory.textures++)}if(C.samples>0&&ye(C)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ue=0;ue<re.length;ue++){const ce=re[ue];k.__webglColorRenderbuffer[ue]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[ue]);const Se=r.convert(ce.format,ce.colorSpace),ze=r.convert(ce.type),Ee=x(ce.internalFormat,Se,ze,ce.normalized,ce.colorSpace,C.isXRRenderTarget===!0),Te=Me(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,Te,Ee,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,k.__webglColorRenderbuffer[ue])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),P(k.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ve){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),et(n.TEXTURE_CUBE_MAP,_);for(let ue=0;ue<6;ue++)if(_.mipmaps&&_.mipmaps.length>0)for(let ce=0;ce<_.mipmaps.length;ce++)M(k.__webglFramebuffer[ue][ce],C,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ce);else M(k.__webglFramebuffer[ue],C,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);m(_)&&E(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let ue=0,ce=re.length;ue<ce;ue++){const Se=re[ue],ze=i.get(Se);let Ee=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Ee=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ee,ze.__webglTexture),et(Ee,Se),M(k.__webglFramebuffer,C,Se,n.COLOR_ATTACHMENT0+ue,Ee,0),m(Se)&&E(Ee)}t.unbindTexture()}else{let ue=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ue=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,Y.__webglTexture),et(ue,_),_.mipmaps&&_.mipmaps.length>0)for(let ce=0;ce<_.mipmaps.length;ce++)M(k.__webglFramebuffer[ce],C,_,n.COLOR_ATTACHMENT0,ue,ce);else M(k.__webglFramebuffer,C,_,n.COLOR_ATTACHMENT0,ue,0);m(_)&&E(ue),t.unbindTexture()}C.depthBuffer&&X(C)}function le(C){const _=C.textures;for(let k=0,Y=_.length;k<Y;k++){const re=_[k];if(m(re)){const ve=A(C),be=i.get(re).__webglTexture;t.bindTexture(ve,be),E(ve),t.unbindTexture()}}}const me=[],_e=[];function fe(C){if(C.samples>0){if(ye(C)===!1){const _=C.textures,k=C.width,Y=C.height;let re=n.COLOR_BUFFER_BIT;const ve=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=i.get(C),ue=_.length>1;if(ue)for(let Se=0;Se<_.length;Se++)t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);const ce=C.texture.mipmaps;ce&&ce.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Se=0;Se<_.length;Se++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(re|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(re|=n.STENCIL_BUFFER_BIT)),ue){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,be.__webglColorRenderbuffer[Se]);const ze=i.get(_[Se]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ze,0)}n.blitFramebuffer(0,0,k,Y,0,0,k,Y,re,n.NEAREST),l===!0&&(me.length=0,_e.length=0,me.push(n.COLOR_ATTACHMENT0+Se),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(me.push(ve),_e.push(ve),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,_e)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,me))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ue)for(let Se=0;Se<_.length;Se++){t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,be.__webglColorRenderbuffer[Se]);const ze=i.get(_[Se]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,ze,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){const _=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Me(C){return Math.min(s.maxSamples,C.samples)}function ye(C){const _=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function L(C){const _=a.render.frame;u.get(C)!==_&&(u.set(C,_),C.update())}function Be(C,_){const k=C.colorSpace,Y=C.format,re=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==Ga&&k!==Vi&&(ct.getTransfer(k)===St?(Y!==On||re!==xn)&&je("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):mt("WebGLTextures: Unsupported texture color space:",k)),_}function ke(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=j,this.getTextureUnits=z,this.setTextureUnits=O,this.setTexture2D=ae,this.setTexture2DArray=ne,this.setTexture3D=de,this.setTextureCube=pe,this.rebindTextures=Q,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=fe,this.setupDepthRenderbuffer=X,this.setupFrameBufferTexture=M,this.useMultisampledRTT=ye,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function JE(n,e){function t(i,s=Vi){let r;const a=ct.getTransfer(s);if(i===xn)return n.UNSIGNED_BYTE;if(i===Gc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Vc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===$h)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Xh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===zh)return n.BYTE;if(i===Wh)return n.SHORT;if(i===Pr)return n.UNSIGNED_SHORT;if(i===Hc)return n.INT;if(i===oi)return n.UNSIGNED_INT;if(i===ei)return n.FLOAT;if(i===li)return n.HALF_FLOAT;if(i===qh)return n.ALPHA;if(i===Yh)return n.RGB;if(i===On)return n.RGBA;if(i===Ci)return n.DEPTH_COMPONENT;if(i===ls)return n.DEPTH_STENCIL;if(i===Kh)return n.RED;if(i===zc)return n.RED_INTEGER;if(i===fs)return n.RG;if(i===Wc)return n.RG_INTEGER;if(i===$c)return n.RGBA_INTEGER;if(i===Ea||i===Ta||i===Aa||i===wa)if(a===St)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ea)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ea)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ta)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Aa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===wa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===kl||i===Hl||i===Gl||i===Vl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===kl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Hl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Gl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Vl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===zl||i===Wl||i===$l||i===Xl||i===ql||i===ka||i===Yl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===zl||i===Wl)return a===St?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===$l)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Xl)return r.COMPRESSED_R11_EAC;if(i===ql)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ka)return r.COMPRESSED_RG11_EAC;if(i===Yl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Kl||i===Zl||i===Jl||i===Ql||i===jl||i===ec||i===tc||i===nc||i===ic||i===sc||i===rc||i===ac||i===oc||i===lc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Kl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Zl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Jl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ql)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===jl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ec)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===tc)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===nc)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ic)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===sc)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===rc)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ac)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===oc)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===lc)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===cc||i===uc||i===dc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===cc)return a===St?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===uc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===dc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===fc||i===hc||i===Ha||i===pc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===fc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===hc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ha)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===pc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ir?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const QE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class eT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new sp(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ci({vertexShader:QE,fragmentShader:jE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new zn(new oo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tT extends ps{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,v=null;const b=typeof XRWebGLBinding<"u",g=new eT,m={},E=t.getContextAttributes();let A=null,x=null;const T=[],w=[],I=new dt;let y=null,R=null;const F=new Tn;F.viewport=new Pt;const G=new Tn;G.viewport=new Pt;const K=[F,G],j=new cy;let z=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(D){let W=T[D];return W===void 0&&(W=new Vo,T[D]=W),W.getTargetRaySpace()},this.getControllerGrip=function(D){let W=T[D];return W===void 0&&(W=new Vo,T[D]=W),W.getGripSpace()},this.getHand=function(D){let W=T[D];return W===void 0&&(W=new Vo,T[D]=W),W.getHandSpace()};function q(D){const W=w.indexOf(D.inputSource);if(W===-1)return;const se=T[W];se!==void 0&&(se.update(D.inputSource,D.frame,c||a),se.dispatchEvent({type:D.type,data:D.inputSource}))}function H(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",ae);for(let D=0;D<T.length;D++){const W=w[D];W!==null&&(w[D]=null,T[D].disconnect(W))}z=null,O=null,g.reset();for(const D in m)delete m[D];if(e.setRenderTarget(A),p=null,f=null,h=null,s=null,x=null,Qe.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(I.width,I.height,!1),R!==null){const D=R.camera;D.fov=R.fov,D.zoom=R.zoom,D.updateProjectionMatrix(),R=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(D){r=D,i.isPresenting===!0&&je("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(D){o=D,i.isPresenting===!0&&je("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(D){c=D},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h===null&&b&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(D){if(s=D,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",H),s.addEventListener("inputsourceschange",ae),E.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(I),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,xe=null,M=null;E.depth&&(M=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=E.stencil?ls:Ci,xe=E.stencil?Ir:oi);const P={colorFormat:t.RGBA8,depthFormat:M,scaleFactor:r};h=this.getBinding(),f=h.createProjectionLayer(P),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new kn(f.textureWidth,f.textureHeight,{format:On,type:xn,depthTexture:new Nr(f.textureWidth,f.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const se={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,se),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new kn(p.framebufferWidth,p.framebufferHeight,{format:On,type:xn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Qe.setContext(s),Qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ae(D){for(let W=0;W<D.removed.length;W++){const se=D.removed[W],xe=w.indexOf(se);xe>=0&&(w[xe]=null,T[xe].disconnect(se))}for(let W=0;W<D.added.length;W++){const se=D.added[W];let xe=w.indexOf(se);if(xe===-1){for(let P=0;P<T.length;P++)if(P>=w.length){w.push(se),xe=P;break}else if(w[P]===null){w[P]=se,xe=P;break}if(xe===-1)break}const M=T[xe];M&&M.connect(se)}}const ne=new te,de=new te;function pe(D,W,se){ne.setFromMatrixPosition(W.matrixWorld),de.setFromMatrixPosition(se.matrixWorld);const xe=ne.distanceTo(de),M=W.projectionMatrix.elements,P=se.projectionMatrix.elements,V=M[14]/(M[10]-1),X=M[14]/(M[10]+1),Q=(M[9]+1)/M[5],oe=(M[9]-1)/M[5],le=(M[8]-1)/M[0],me=(P[8]+1)/P[0],_e=V*le,fe=V*me,Me=xe/(-le+me),ye=Me*-le;if(W.matrixWorld.decompose(D.position,D.quaternion,D.scale),D.translateX(ye),D.translateZ(Me),D.matrixWorld.compose(D.position,D.quaternion,D.scale),D.matrixWorldInverse.copy(D.matrixWorld).invert(),M[10]===-1)D.projectionMatrix.copy(W.projectionMatrix),D.projectionMatrixInverse.copy(W.projectionMatrixInverse);else{const L=V+Me,Be=X+Me,ke=_e-ye,C=fe+(xe-ye),_=Q*X/Be*L,k=oe*X/Be*L;D.projectionMatrix.makePerspective(ke,C,_,k,L,Be),D.projectionMatrixInverse.copy(D.projectionMatrix).invert()}}function Re(D,W){W===null?D.matrixWorld.copy(D.matrix):D.matrixWorld.multiplyMatrices(W.matrixWorld,D.matrix),D.matrixWorldInverse.copy(D.matrixWorld).invert()}this.updateCamera=function(D){if(s===null)return;let W=D.near,se=D.far;g.texture!==null&&(g.depthNear>0&&(W=g.depthNear),g.depthFar>0&&(se=g.depthFar)),j.near=G.near=F.near=W,j.far=G.far=F.far=se,(z!==j.near||O!==j.far)&&(s.updateRenderState({depthNear:j.near,depthFar:j.far}),z=j.near,O=j.far),j.layers.mask=D.layers.mask|6,F.layers.mask=j.layers.mask&-5,G.layers.mask=j.layers.mask&-3;const xe=D.parent,M=j.cameras;Re(j,xe);for(let P=0;P<M.length;P++)Re(M[P],xe);M.length===2?pe(j,F,G):j.projectionMatrix.copy(F.projectionMatrix),R===null&&D.isPerspectiveCamera&&(R={camera:D,fov:D.fov,zoom:D.zoom}),Oe(D,j,xe)};function Oe(D,W,se){se===null?D.matrix.copy(W.matrixWorld):(D.matrix.copy(se.matrixWorld),D.matrix.invert(),D.matrix.multiply(W.matrixWorld)),D.matrix.decompose(D.position,D.quaternion,D.scale),D.updateMatrixWorld(!0),D.projectionMatrix.copy(W.projectionMatrix),D.projectionMatrixInverse.copy(W.projectionMatrixInverse),D.isPerspectiveCamera&&(D.fov=gc*2*Math.atan(1/D.projectionMatrix.elements[5]),D.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(D){l=D,f!==null&&(f.fixedFoveation=D),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=D)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(j)},this.getCameraTexture=function(D){return m[D]};let lt=null;function et(D,W){if(u=W.getViewerPose(c||a),v=W,u!==null){const se=u.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let xe=!1;se.length!==j.cameras.length&&(j.cameras.length=0,xe=!0);for(let X=0;X<se.length;X++){const Q=se[X];let oe=null;if(p!==null)oe=p.getViewport(Q);else{const me=h.getViewSubImage(f,Q);oe=me.viewport,X===0&&(e.setRenderTargetTextures(x,me.colorTexture,me.depthStencilTexture),e.setRenderTarget(x))}let le=K[X];le===void 0&&(le=new Tn,le.layers.enable(X),le.viewport=new Pt,K[X]=le),le.matrix.fromArray(Q.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(Q.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(oe.x,oe.y,oe.width,oe.height),X===0&&(j.matrix.copy(le.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),xe===!0&&j.cameras.push(le)}const M=s.enabledFeatures;if(M&&M.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){h=i.getBinding();const X=h.getDepthInformation(se[0]);X&&X.isValid&&X.texture&&g.init(X,s.renderState)}if(M&&M.includes("camera-access")&&b){e.state.unbindTexture(),h=i.getBinding();for(let X=0;X<se.length;X++){const Q=se[X].camera;if(Q){let oe=m[Q];oe||(oe=new sp,m[Q]=oe);const le=h.getCameraImage(Q);oe.sourceTexture=le}}}}for(let se=0;se<T.length;se++){const xe=w[se],M=T[se];xe!==null&&M!==void 0&&M.update(xe,W,c||a)}lt&&lt(D,W),W.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:W}),v=null}const Qe=new lp;Qe.setAnimationLoop(et),this.setAnimationLoop=function(D){lt=D},this.dispose=function(){}}}const nT=new Ot,mp=new tt;mp.set(-1,0,0,0,1,0,0,0,1);function iT(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,rp(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,E,A,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),h(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&p(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),v(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),b(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,E,A):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===gn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===gn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const E=e.get(m),A=E.envMap,x=E.envMapRotation;A&&(g.envMap.value=A,g.envMapRotation.value.setFromMatrix4(nT.makeRotationFromEuler(x)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(mp),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,E,A){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*E,g.scale.value=A*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function h(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function p(g,m,E){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===gn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,m){m.matcap&&(g.matcap.value=m.matcap)}function b(g,m){const E=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function sT(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,T){const w=T.program;i.uniformBlockBinding(x,w)}function c(x,T){let w=s[x.id];w===void 0&&(g(x),w=u(x),s[x.id]=w,x.addEventListener("dispose",E));const I=T.program;i.updateUBOMapping(x,I);const y=e.render.frame;r[x.id]!==y&&(f(x),r[x.id]=y)}function u(x){const T=h();x.__bindingPointIndex=T;const w=n.createBuffer(),I=x.__size,y=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,I,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,w),w}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return mt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const T=s[x.id],w=x.uniforms,I=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let y=0,R=w.length;y<R;y++){const F=w[y];if(Array.isArray(F))for(let G=0,K=F.length;G<K;G++)p(F[G],y,G,I);else p(F,y,0,I)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(x,T,w,I){if(b(x,T,w,I)===!0){const y=x.__offset,R=x.value;if(Array.isArray(R)){let F=0;for(let G=0;G<R.length;G++){const K=R[G],j=m(K);v(K,x.__data,F),typeof K!="number"&&typeof K!="boolean"&&!K.isMatrix3&&!ArrayBuffer.isView(K)&&(F+=j.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(R,x.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,x.__data)}}function v(x,T,w){typeof x=="number"||typeof x=="boolean"?T[0]=x:x.isMatrix3?(T[0]=x.elements[0],T[1]=x.elements[1],T[2]=x.elements[2],T[3]=0,T[4]=x.elements[3],T[5]=x.elements[4],T[6]=x.elements[5],T[7]=0,T[8]=x.elements[6],T[9]=x.elements[7],T[10]=x.elements[8],T[11]=0):ArrayBuffer.isView(x)?T.set(new x.constructor(x.buffer,x.byteOffset,T.length)):x.toArray(T,w)}function b(x,T,w,I){const y=x.value,R=T+"_"+w;if(I[R]===void 0)return typeof y=="number"||typeof y=="boolean"?I[R]=y:ArrayBuffer.isView(y)?I[R]=y.slice():I[R]=y.clone(),!0;{const F=I[R];if(typeof y=="number"||typeof y=="boolean"){if(F!==y)return I[R]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(F.equals(y)===!1)return F.copy(y),!0}}return!1}function g(x){const T=x.uniforms;let w=0;const I=16;for(let R=0,F=T.length;R<F;R++){const G=Array.isArray(T[R])?T[R]:[T[R]];for(let K=0,j=G.length;K<j;K++){const z=G[K],O=Array.isArray(z.value)?z.value:[z.value];for(let q=0,H=O.length;q<H;q++){const ae=O[q],ne=m(ae),de=w%I,pe=de%ne.boundary,Re=de+pe;w+=pe,Re!==0&&I-Re<ne.storage&&(w+=I-Re),z.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=w,w+=ne.storage}}}const y=w%I;return y>0&&(w+=I-y),x.__size=w,x.__cache={},this}function m(x){const T={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(T.boundary=4,T.storage=4):x.isVector2?(T.boundary=8,T.storage=8):x.isVector3||x.isColor?(T.boundary=16,T.storage=12):x.isVector4?(T.boundary=16,T.storage=16):x.isMatrix3?(T.boundary=48,T.storage=48):x.isMatrix4?(T.boundary=64,T.storage=64):x.isTexture?je("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(T.boundary=16,T.storage=x.byteLength):je("WebGLRenderer: Unsupported uniform value type.",x),T}function E(x){const T=x.target;T.removeEventListener("dispose",E);const w=a.indexOf(T.__bindingPointIndex);a.splice(w,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function A(){for(const x in s)n.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:A}}const rT=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Yn=null;function aT(){return Yn===null&&(Yn=new $x(rT,16,16,fs,li),Yn.name="DFG_LUT",Yn.minFilter=en,Yn.magFilter=en,Yn.wrapS=Mi,Yn.wrapT=Mi,Yn.generateMipmaps=!1,Yn.needsUpdate=!0),Yn}class oT{constructor(e={}){const{canvas:t=xx(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:p=xn}=e;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=a;const b=p,g=new Set([$c,Wc,zc]),m=new Set([xn,oi,Pr,Ir,Gc,Vc]),E=new Uint32Array(4),A=new Int32Array(4),x=new te;let T=null,w=null;const I=[],y=[];let R=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ii,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const F=this;let G=!1,K=null,j=null,z=null,O=null;this._outputColorSpace=Mn;let q=0,H=0,ae=null,ne=-1,de=null;const pe=new Pt,Re=new Pt;let Oe=null;const lt=new pt(0);let et=0,Qe=t.width,D=t.height,W=1,se=null,xe=null;const M=new Pt(0,0,Qe,D),P=new Pt(0,0,Qe,D);let V=!1;const X=new Zc;let Q=!1,oe=!1;const le=new Ot,me=new te,_e=new Pt,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Me=!1;function ye(){return ae===null?W:1}let L=i;function Be(S,U){return t.getContext(S,U)}let ke,C,_,k,Y,re,ve,be,ue,ce,Se,ze,Ee,Te,qe,Ze,it,B,Ae,he,we,De,ge;try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${kc}`),t.addEventListener("webglcontextlost",At,!1),t.addEventListener("webglcontextrestored",_t,!1),t.addEventListener("webglcontextcreationerror",Pn,!1),L===null){const U="webgl2";if(L=Be(U,S),L===null)throw Be(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ye()}catch(S){throw t.removeEventListener("webglcontextlost",At,!1),t.removeEventListener("webglcontextrestored",_t,!1),t.removeEventListener("webglcontextcreationerror",Pn,!1),mt("WebGLRenderer: "+S.message),S}function Ye(){ke=new aM(L),ke.init(),we=new JE(L,ke),C=new Zb(L,ke,e,we),_=new KE(L,ke),C.reversedDepthBuffer&&f&&_.buffers.depth.setReversed(!0),j=L.createFramebuffer(),z=L.createFramebuffer(),O=L.createFramebuffer(),k=new cM(L),Y=new UE,re=new ZE(L,ke,_,Y,C,we,k),ve=new rM(F),be=new dy(L),De=new Yb(L,be),ue=new oM(L,be,k,De),ce=new dM(L,ue,be,De,k),B=new uM(L,C,re),qe=new Jb(Y),Se=new NE(F,ve,ke,C,De,qe),ze=new iT(F,Y),Ee=new FE,Te=new zE(ke),it=new qb(F,ve,_,ce,v,l),Ze=new YE(F,ce,C),ge=new sT(L,k,C,_),Ae=new Kb(L,ke,k),he=new lM(L,ke,k),k.programs=Se.programs,F.capabilities=C,F.extensions=ke,F.properties=Y,F.renderLists=Ee,F.shadowMap=Ze,F.state=_,F.info=k}b!==xn&&(R=new hM(b,t.width,t.height,o,s,r));const We=new tT(F,L);this.xr=We,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const S=ke.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ke.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(S){S!==void 0&&(W=S,this.setSize(Qe,D,!1))},this.getSize=function(S){return S.set(Qe,D)},this.setSize=function(S,U,ie=!0){if(We.isPresenting){je("WebGLRenderer: Can't change size while VR device is presenting.");return}Qe=S,D=U,t.width=Math.floor(S*W),t.height=Math.floor(U*W),ie===!0&&(t.style.width=S+"px",t.style.height=U+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(Qe*W,D*W).floor()},this.setDrawingBufferSize=function(S,U,ie){Qe=S,D=U,W=ie,t.width=Math.floor(S*ie),t.height=Math.floor(U*ie),this.setViewport(0,0,S,U)},this.setEffects=function(S){if(b===xn){mt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let U=0;U<S.length;U++)if(S[U].isOutputPass===!0){je("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(pe)},this.getViewport=function(S){return S.copy(M)},this.setViewport=function(S,U,ie,Z){S.isVector4?M.set(S.x,S.y,S.z,S.w):M.set(S,U,ie,Z),_.viewport(pe.copy(M).multiplyScalar(W).round())},this.getScissor=function(S){return S.copy(P)},this.setScissor=function(S,U,ie,Z){S.isVector4?P.set(S.x,S.y,S.z,S.w):P.set(S,U,ie,Z),_.scissor(Re.copy(P).multiplyScalar(W).round())},this.getScissorTest=function(){return V},this.setScissorTest=function(S){_.setScissorTest(V=S)},this.setOpaqueSort=function(S){se=S},this.setTransparentSort=function(S){xe=S},this.getClearColor=function(S){return S.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(S=!0,U=!0,ie=!0){let Z=0;if(S){let J=!1;if(ae!==null){const Ie=ae.texture.format;J=g.has(Ie)}if(J){const Ie=ae.texture.type,Ue=m.has(Ie),Pe=it.getClearColor(),He=it.getClearAlpha(),$e=Pe.r,rt=Pe.g,ot=Pe.b;Ue?(E[0]=$e,E[1]=rt,E[2]=ot,E[3]=He,L.clearBufferuiv(L.COLOR,0,E)):(A[0]=$e,A[1]=rt,A[2]=ot,A[3]=He,L.clearBufferiv(L.COLOR,0,A))}else Z|=L.COLOR_BUFFER_BIT}U&&(Z|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ie&&(Z|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&L.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),K=S},this.dispose=function(){t.removeEventListener("webglcontextlost",At,!1),t.removeEventListener("webglcontextrestored",_t,!1),t.removeEventListener("webglcontextcreationerror",Pn,!1),it.dispose(),Ee.dispose(),Te.dispose(),Y.dispose(),ve.dispose(),ce.dispose(),De.dispose(),ge.dispose(),Se.dispose(),We.dispose(),We.removeEventListener("sessionstart",ru),We.removeEventListener("sessionend",au),qi.stop()};function At(S){S.preventDefault(),pd("WebGLRenderer: Context Lost."),G=!0}function _t(){pd("WebGLRenderer: Context Restored."),G=!1;const S=k.autoReset,U=Ze.enabled,ie=Ze.autoUpdate,Z=Ze.needsUpdate,J=Ze.type;Ye(),k.autoReset=S,Ze.enabled=U,Ze.autoUpdate=ie,Ze.needsUpdate=Z,Ze.type=J}function Pn(S){mt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Wn(S){const U=S.target;U.removeEventListener("dispose",Wn),_p(U)}function _p(S){vp(S),Y.remove(S)}function vp(S){const U=Y.get(S).programs;U!==void 0&&(U.forEach(function(ie){Se.releaseProgram(ie)}),S.isShaderMaterial&&Se.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,ie,Z,J,Ie){U===null&&(U=fe);const Ue=J.isMesh&&J.matrixWorld.determinantAffine()<0,Pe=Sp(S,U,ie,Z,J);_.setMaterial(Z,Ue);let He=ie.index,$e=1;if(Z.wireframe===!0){if(He=ue.getWireframeAttribute(ie),He===void 0)return;$e=2}const rt=ie.drawRange,ot=ie.attributes.position;let Ge=rt.start*$e,vt=(rt.start+rt.count)*$e;Ie!==null&&(Ge=Math.max(Ge,Ie.start*$e),vt=Math.min(vt,(Ie.start+Ie.count)*$e)),He!==null?(Ge=Math.max(Ge,0),vt=Math.min(vt,He.count)):ot!=null&&(Ge=Math.max(Ge,0),vt=Math.min(vt,ot.count));const kt=vt-Ge;if(kt<0||kt===1/0)return;De.setup(J,Z,Pe,ie,He);let Rt,Et=Ae;if(He!==null&&(Rt=be.get(He),Et=he,Et.setIndex(Rt)),J.isMesh)Z.wireframe===!0?(_.setLineWidth(Z.wireframeLinewidth*ye()),Et.setMode(L.LINES)):Et.setMode(L.TRIANGLES);else if(J.isLine){let Kt=Z.linewidth;Kt===void 0&&(Kt=1),_.setLineWidth(Kt*ye()),J.isLineSegments?Et.setMode(L.LINES):J.isLineLoop?Et.setMode(L.LINE_LOOP):Et.setMode(L.LINE_STRIP)}else J.isPoints?Et.setMode(L.POINTS):J.isSprite&&Et.setMode(L.TRIANGLES);if(J.isBatchedMesh)if(ke.get("WEBGL_multi_draw"))Et.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const Kt=J._multiDrawStarts,Ne=J._multiDrawCounts,on=J._multiDrawCount,ft=He?be.get(He).bytesPerElement:1,Sn=Y.get(Z).currentProgram.getUniforms();for(let $n=0;$n<on;$n++)Sn.setValue(L,"_gl_DrawID",$n),Et.render(Kt[$n]/ft,Ne[$n])}else if(J.isInstancedMesh)Et.renderInstances(Ge,kt,J.count);else if(ie.isInstancedBufferGeometry){const Kt=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,Ne=Math.min(ie.instanceCount,Kt);Et.renderInstances(Ge,kt,Ne)}else Et.render(Ge,kt)};function su(S,U,ie,Z){K!==null&&S.isNodeMaterial&&K.setObject(Z,S),Q===!0&&qe.setState(S,ie,!1),S.transparent===!0&&S.side===bi&&S.forceSinglePass===!1?(S.side=gn,S.needsUpdate=!0,$r(S,U,Z),S.side=us,S.needsUpdate=!0,$r(S,U,Z),S.side=bi):$r(S,U,Z)}this.compile=function(S,U,ie=null){ie===null&&(ie=S),K!==null&&K.renderStart(S,U,ie),w=Te.get(ie),w.init(U),y.push(w),ie.traverseVisible(function(J){J.isLight&&J.layers.test(U.layers)&&(w.pushLight(J),J.castShadow&&w.pushShadow(J))}),S!==ie&&S.traverseVisible(function(J){J.isLight&&J.layers.test(U.layers)&&(w.pushLight(J),J.castShadow&&w.pushShadow(J))}),w.setupLights(),K!==null&&K.updateLights(w.state.lightsArray),oe=this.localClippingEnabled,Q=qe.init(this.clippingPlanes,oe),Q===!0&&qe.setGlobalState(this.clippingPlanes,U),K!==null&&Ze.render(w.state.shadowsArray,ie,U);const Z=new Set;return S.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const Ie=J.material;if(Ie)if(Array.isArray(Ie))for(let Ue=0;Ue<Ie.length;Ue++){const Pe=Ie[Ue];su(Pe,ie,U,J),Z.add(Pe)}else su(Ie,ie,U,J),Z.add(Ie)}),w=y.pop(),K!==null&&K.renderEnd(),Z},this.compileAsync=function(S,U,ie=null){const Z=this.compile(S,U,ie);return new Promise(J=>{function Ie(){if(Z.forEach(function(Ue){const He=Y.get(Ue).currentProgram;(He===void 0||He.isReady())&&Z.delete(Ue)}),Z.size===0){J(S);return}setTimeout(Ie,10)}ke.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let uo=null;function xp(S){uo&&uo(S)}function ru(){qi.stop()}function au(){qi.start()}const qi=new lp;qi.setAnimationLoop(xp),typeof self<"u"&&qi.setContext(self),this.setAnimationLoop=function(S){uo=S,We.setAnimationLoop(S),S===null?qi.stop():qi.start()},We.addEventListener("sessionstart",ru),We.addEventListener("sessionend",au),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){mt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;K!==null&&K.renderStart(S,U);const ie=We.enabled===!0&&We.isPresenting===!0,Z=R!==null&&(ae===null||ie)&&R.begin(F,ae);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),We.enabled===!0&&We.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(We.cameraAutoUpdate===!0&&We.updateCamera(U),U=We.getCamera()),S.isScene===!0&&S.onBeforeRender(F,S,U,ae),w=Te.get(S,y.length),w.init(U),w.state.textureUnits=re.getTextureUnits(),y.push(w),le.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),X.setFromProjectionMatrix(le,ti,U.reversedDepth),oe=this.localClippingEnabled,Q=qe.init(this.clippingPlanes,oe),T=Ee.get(S,I.length),T.init(),I.push(T),We.enabled===!0&&We.isPresenting===!0){const Ue=F.xr.getDepthSensingMesh();Ue!==null&&fo(Ue,U,-1/0,F.sortObjects)}fo(S,U,0,F.sortObjects),T.finish(),K!==null&&K.updateLights(w.state.lightsArray),F.sortObjects===!0&&T.sort(se,xe),Me=We.enabled===!1||We.isPresenting===!1||We.hasDepthSensing()===!1,Me&&it.addToRenderList(T,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Q===!0&&qe.beginShadows();const J=w.state.shadowsArray;if(Ze.render(J,S,U),Q===!0&&qe.endShadows(),(Z&&R.hasRenderPass())===!1){const Ue=T.opaque,Pe=T.transmissive;if(w.setupLights(),U.isArrayCamera){const He=U.cameras;if(Pe.length>0)for(let $e=0,rt=He.length;$e<rt;$e++){const ot=He[$e];lu(Ue,Pe,S,ot)}Me&&it.render(S);for(let $e=0,rt=He.length;$e<rt;$e++){const ot=He[$e];ou(T,S,ot,ot.viewport)}}else Pe.length>0&&lu(Ue,Pe,S,U),Me&&it.render(S),ou(T,S,U)}ae!==null&&H===0&&(re.updateMultisampleRenderTarget(ae),re.updateRenderTargetMipmap(ae)),Z&&R.end(F),S.isScene===!0&&S.onAfterRender(F,S,U),De.resetDefaultState(),ne=-1,de=null,y.pop(),y.length>0?(w=y[y.length-1],re.setTextureUnits(w.state.textureUnits),Q===!0&&qe.setGlobalState(F.clippingPlanes,w.state.camera)):w=null,I.pop(),I.length>0?T=I[I.length-1]:T=null,K!==null&&K.renderEnd()};function fo(S,U,ie,Z){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)ie=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLightProbeGrid)w.pushLightProbeGrid(S);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(X)){Z&&_e.setFromMatrixPosition(S.matrixWorld).applyMatrix4(le);const Ue=ce.update(S),Pe=S.material;Pe.visible&&T.push(S,Ue,Pe,ie,_e.z,null,U)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(X))){const Ue=ce.update(S),Pe=S.material;if(Z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),_e.copy(S.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),_e.copy(Ue.boundingSphere.center)),_e.applyMatrix4(S.matrixWorld).applyMatrix4(le)),Array.isArray(Pe)){const He=Ue.groups;for(let $e=0,rt=He.length;$e<rt;$e++){const ot=He[$e],Ge=Pe[ot.materialIndex];Ge&&Ge.visible&&T.push(S,Ue,Ge,ie,_e.z,ot,U)}}else Pe.visible&&T.push(S,Ue,Pe,ie,_e.z,null,U)}}const Ie=S.children;for(let Ue=0,Pe=Ie.length;Ue<Pe;Ue++)fo(Ie[Ue],U,ie,Z)}function ou(S,U,ie,Z){const{opaque:J,transmissive:Ie,transparent:Ue}=S;w.setupLightsView(ie),Q===!0&&qe.setGlobalState(F.clippingPlanes,ie),Z&&_.viewport(pe.copy(Z)),J.length>0&&Wr(J,U,ie),Ie.length>0&&Wr(Ie,U,ie),Ue.length>0&&Wr(Ue,U,ie),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function lu(S,U,ie,Z){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[Z.id]===void 0){const Ge=ke.has("EXT_color_buffer_half_float")||ke.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[Z.id]=new kn(1,1,{generateMipmaps:!0,type:Ge?li:xn,minFilter:os,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ct.workingColorSpace})}const Ie=w.state.transmissionRenderTarget[Z.id],Ue=Z.viewport||pe;Ie.setSize(Ue.z*F.transmissionResolutionScale,Ue.w*F.transmissionResolutionScale);const Pe=F.getRenderTarget(),He=F.getActiveCubeFace(),$e=F.getActiveMipmapLevel();F.setRenderTarget(Ie),F.getClearColor(lt),et=F.getClearAlpha(),et<1&&F.setClearColor(16777215,.5),F.clear(),Me&&it.render(ie);const rt=F.toneMapping;F.toneMapping=ii;const ot=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),w.setupLightsView(Z),Q===!0&&qe.setGlobalState(F.clippingPlanes,Z),Wr(S,ie,Z),re.updateMultisampleRenderTarget(Ie),re.updateRenderTargetMipmap(Ie),ke.has("WEBGL_multisampled_render_to_texture")===!1){let Ge=!1;for(let vt=0,kt=U.length;vt<kt;vt++){const Rt=U[vt],{object:Et,geometry:Kt,material:Ne,group:on}=Rt;if(Ne.side===bi&&Et.layers.test(Z.layers)){const ft=Ne.side;Ne.side=gn,Ne.needsUpdate=!0,cu(Et,ie,Z,Kt,Ne,on),Ne.side=ft,Ne.needsUpdate=!0,Ge=!0}}Ge===!0&&(re.updateMultisampleRenderTarget(Ie),re.updateRenderTargetMipmap(Ie))}F.setRenderTarget(Pe,He,$e),F.setClearColor(lt,et),ot!==void 0&&(Z.viewport=ot),F.toneMapping=rt}function Wr(S,U,ie){const Z=U.isScene===!0?U.overrideMaterial:null;for(let J=0,Ie=S.length;J<Ie;J++){const Ue=S[J],{object:Pe,geometry:He,group:$e}=Ue;let rt=Ue.material;rt.allowOverride===!0&&Z!==null&&(rt=Z),Pe.layers.test(ie.layers)&&cu(Pe,U,ie,He,rt,$e)}}function cu(S,U,ie,Z,J,Ie){K!==null&&J.isNodeMaterial&&K.setObject(S,J),S.onBeforeRender(F,U,ie,Z,J,Ie),S.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),J.onBeforeRender(F,U,ie,Z,S,Ie),J.transparent===!0&&J.side===bi&&J.forceSinglePass===!1?(J.side=gn,J.needsUpdate=!0,F.renderBufferDirect(ie,U,Z,J,S,Ie),J.side=us,J.needsUpdate=!0,F.renderBufferDirect(ie,U,Z,J,S,Ie),J.side=bi):F.renderBufferDirect(ie,U,Z,J,S,Ie),S.onAfterRender(F,U,ie,Z,J,Ie)}function $r(S,U,ie){U.isScene!==!0&&(U=fe);const Z=Y.get(S),J=w.state.lights,Ie=w.state.shadowsArray,Ue=J.state.version,Pe=Se.getParameters(S,J.state,Ie,U,ie,w.state.lightProbeGridArray),He=Se.getProgramCacheKey(Pe);let $e=Z.programs;Z.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?U.environment:null,Z.fog=U.fog;const rt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;Z.envMap=ve.get(S.envMap||Z.environment,rt),Z.envMapRotation=Z.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,$e===void 0&&(S.addEventListener("dispose",Wn),$e=new Map,Z.programs=$e);let ot=$e.get(He);if(ot!==void 0){if(Z.currentProgram===ot&&Z.lightsStateVersion===Ue)return du(S,Pe),ot}else Pe.uniforms=Se.getUniforms(S),K!==null&&S.isNodeMaterial&&K.build(S,ie,Pe),S.onBeforeCompile(Pe,F),ot=Se.acquireProgram(Pe,He),$e.set(He,ot),Z.uniforms=Pe.uniforms;const Ge=Z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ge.clippingPlanes=qe.uniform),du(S,Pe),Z.needsLights=Mp(S),Z.lightsStateVersion=Ue,Z.needsLights&&(Ge.ambientLightColor.value=J.state.ambient,Ge.lightProbe.value=J.state.probe,Ge.sunLights.value=J.state.sun,Ge.sunLightShadows.value=J.state.sunShadow,Ge.directionalLights.value=J.state.directional,Ge.directionalLightShadows.value=J.state.directionalShadow,Ge.spotLights.value=J.state.spot,Ge.spotLightShadows.value=J.state.spotShadow,Ge.rectAreaLights.value=J.state.rectArea,Ge.ltc_1.value=J.state.rectAreaLTC1,Ge.ltc_2.value=J.state.rectAreaLTC2,Ge.pointLights.value=J.state.point,Ge.pointLightShadows.value=J.state.pointShadow,Ge.hemisphereLights.value=J.state.hemi,Ge.sunShadowMatrix.value=J.state.sunShadowMatrix,Ge.sunShadowCascade.value=J.state.sunShadowCascade,Ge.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Ge.spotLightMatrix.value=J.state.spotLightMatrix,Ge.spotLightMap.value=J.state.spotLightMap,Ge.pointShadowMatrix.value=J.state.pointShadowMatrix),Z.lightProbeGrid=w.state.lightProbeGridArray.length>0,Z.currentProgram=ot,Z.uniformsList=null,ot}function uu(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=Ca.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function du(S,U){const ie=Y.get(S);ie.outputColorSpace=U.outputColorSpace,ie.batching=U.batching,ie.batchingColor=U.batchingColor,ie.instancing=U.instancing,ie.instancingColor=U.instancingColor,ie.instancingMorph=U.instancingMorph,ie.skinning=U.skinning,ie.morphTargets=U.morphTargets,ie.morphNormals=U.morphNormals,ie.morphColors=U.morphColors,ie.morphTargetsCount=U.morphTargetsCount,ie.numClippingPlanes=U.numClippingPlanes,ie.numIntersection=U.numClipIntersection,ie.vertexAlphas=U.vertexAlphas,ie.vertexTangents=U.vertexTangents,ie.toneMapping=U.toneMapping}function yp(S,U){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;x.setFromMatrixPosition(U.matrixWorld);for(let ie=0,Z=S.length;ie<Z;ie++){const J=S[ie];if(J.texture!==null&&J.boundingBox.containsPoint(x))return J}return null}function Sp(S,U,ie,Z,J){U.isScene!==!0&&(U=fe),re.resetTextureUnits();const Ie=U.fog,Ue=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?U.environment:null,Pe=ae===null?F.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:ct.workingColorSpace,He=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,$e=ve.get(Z.envMap||Ue,He),rt=Z.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,ot=!!ie.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ge=!!ie.morphAttributes.position,vt=!!ie.morphAttributes.normal,kt=!!ie.morphAttributes.color;let Rt=ii;Z.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Rt=F.toneMapping);const Et=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,Kt=Et!==void 0?Et.length:0,Ne=Y.get(Z),on=w.state.lights;if(Q===!0&&(oe===!0||S!==de)){const wt=S===de&&Z.id===ne;qe.setState(Z,S,wt)}let ft=!1;Z.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==on.state.version||Ne.outputColorSpace!==Pe||J.isBatchedMesh&&Ne.batching===!1||!J.isBatchedMesh&&Ne.batching===!0||J.isBatchedMesh&&Ne.batchingColor===!0&&J._colorsTexture===null||J.isBatchedMesh&&Ne.batchingColor===!1&&J._colorsTexture!==null||J.isInstancedMesh&&Ne.instancing===!1||!J.isInstancedMesh&&Ne.instancing===!0||J.isSkinnedMesh&&Ne.skinning===!1||!J.isSkinnedMesh&&Ne.skinning===!0||J.isInstancedMesh&&Ne.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Ne.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Ne.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Ne.instancingMorph===!1&&J.morphTexture!==null||Ne.envMap!==$e||Z.fog===!0&&Ne.fog!==Ie||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==qe.numPlanes||Ne.numIntersection!==qe.numIntersection)||Ne.vertexAlphas!==rt||Ne.vertexTangents!==ot||Ne.morphTargets!==Ge||Ne.morphNormals!==vt||Ne.morphColors!==kt||Ne.toneMapping!==Rt||Ne.morphTargetsCount!==Kt||!!Ne.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(ft=!0):(ft=!0,Ne.__version=Z.version);let Sn=Ne.currentProgram;ft===!0&&(Sn=$r(Z,U,J),K&&Z.isNodeMaterial&&K.onUpdateProgram(Z,Sn,Ne));let $n=!1,Pi=!1,ms=!1;const Mt=Sn.getUniforms(),Ft=Ne.uniforms;if(_.useProgram(Sn.program)&&($n=!0,Pi=!0,ms=!0),Z.id!==ne&&(ne=Z.id,Pi=!0),Ne.needsLights){const wt=yp(w.state.lightProbeGridArray,J);Ne.lightProbeGrid!==wt&&(Ne.lightProbeGrid=wt,Pi=!0)}if($n||de!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Mt.setValue(L,"projectionMatrix",S.projectionMatrix),Mt.setValue(L,"viewMatrix",S.matrixWorldInverse);const Li=Mt.map.cameraPosition;Li!==void 0&&Li.setValue(L,me.setFromMatrixPosition(S.matrixWorld)),C.logarithmicDepthBuffer&&Mt.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Mt.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),de!==S&&(de=S,Pi=!0,ms=!0)}if(Ne.needsLights&&(on.state.sunShadowMap.length>0&&Mt.setValue(L,"sunShadowMap",on.state.sunShadowMap,re),on.state.directionalShadowMap.length>0&&Mt.setValue(L,"directionalShadowMap",on.state.directionalShadowMap,re),on.state.spotShadowMap.length>0&&Mt.setValue(L,"spotShadowMap",on.state.spotShadowMap,re),on.state.pointShadowMap.length>0&&Mt.setValue(L,"pointShadowMap",on.state.pointShadowMap,re)),J.isSkinnedMesh){Mt.setOptional(L,J,"bindMatrix"),Mt.setOptional(L,J,"bindMatrixInverse");const wt=J.skeleton;wt&&(wt.boneTexture===null&&wt.computeBoneTexture(),Mt.setValue(L,"boneTexture",wt.boneTexture,re))}J.isBatchedMesh&&(Mt.setOptional(L,J,"batchingTexture"),Mt.setValue(L,"batchingTexture",J._matricesTexture,re),Mt.setOptional(L,J,"batchingIdTexture"),Mt.setValue(L,"batchingIdTexture",J._indirectTexture,re),Mt.setOptional(L,J,"batchingColorTexture"),J._colorsTexture!==null&&Mt.setValue(L,"batchingColorTexture",J._colorsTexture,re));const Ii=ie.morphAttributes;if((Ii.position!==void 0||Ii.normal!==void 0||Ii.color!==void 0)&&B.update(J,ie,Sn),(Pi||Ne.receiveShadow!==J.receiveShadow)&&(Ne.receiveShadow=J.receiveShadow,Mt.setValue(L,"receiveShadow",J.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&U.environment!==null&&(Ft.envMapIntensity.value=U.environmentIntensity),Ft.dfgLUT!==void 0&&(Ft.dfgLUT.value=aT()),Pi){if(Mt.setValue(L,"toneMappingExposure",F.toneMappingExposure),Ne.needsLights&&bp(Ft,ms),Ie&&Z.fog===!0&&ze.refreshFogUniforms(Ft,Ie),ze.refreshMaterialUniforms(Ft,Z,W,D,w.state.transmissionRenderTarget[S.id]),Ne.needsLights&&Ne.lightProbeGrid){const wt=Ne.lightProbeGrid;Ft.probesSH.value=wt.texture,Ft.probesMin.value.copy(wt.boundingBox.min),Ft.probesMax.value.copy(wt.boundingBox.max),Ft.probesResolution.value.copy(wt.resolution)}Ca.upload(L,uu(Ne),Ft,re)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Ca.upload(L,uu(Ne),Ft,re),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Mt.setValue(L,"center",J.center),Mt.setValue(L,"modelViewMatrix",J.modelViewMatrix),Mt.setValue(L,"normalMatrix",J.normalMatrix),Mt.setValue(L,"modelMatrix",J.matrixWorld),Z.uniformsGroups!==void 0){const wt=Z.uniformsGroups;for(let Li=0,gs=wt.length;Li<gs;Li++){const hu=wt[Li];ge.update(hu,Sn),ge.bind(hu,Sn)}}return Sn}function bp(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.sunLights.needsUpdate=U,S.sunLightShadows.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function Mp(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(S,U,ie){const Z=Y.get(S);Z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),Y.get(S.texture).__webglTexture=U,Y.get(S.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:ie,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,U){const ie=Y.get(S);ie.__webglFramebuffer=U,ie.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,ie=0){ae=S,q=U,H=ie;let Z=null,J=!1,Ie=!1;if(S){const Pe=Y.get(S);if(Pe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(L.FRAMEBUFFER,Pe.__webglFramebuffer),pe.copy(S.viewport),Re.copy(S.scissor),Oe=S.scissorTest,_.viewport(pe),_.scissor(Re),_.setScissorTest(Oe),ne=-1;return}else if(Pe.__webglFramebuffer===void 0)re.setupRenderTarget(S);else if(Pe.__hasExternalTextures)re.rebindTextures(S,Y.get(S.texture).__webglTexture,Y.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const rt=S.depthTexture;if(Pe.__boundDepthTexture!==rt){if(rt!==null&&Y.has(rt)&&(S.width!==rt.image.width||S.height!==rt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(S)}}const He=S.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(Ie=!0);const $e=Y.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray($e[U])?Z=$e[U][ie]:Z=$e[U],J=!0):S.samples>0&&re.useMultisampledRTT(S)===!1?Z=Y.get(S).__webglMultisampledFramebuffer:Array.isArray($e)?Z=$e[ie]:Z=$e,pe.copy(S.viewport),Re.copy(S.scissor),Oe=S.scissorTest}else pe.copy(M).multiplyScalar(W).floor(),Re.copy(P).multiplyScalar(W).floor(),Oe=V;if(ie!==0&&(Z=j),_.bindFramebuffer(L.FRAMEBUFFER,Z)&&_.drawBuffers(S,Z),_.viewport(pe),_.scissor(Re),_.setScissorTest(Oe),J){const Pe=Y.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,Pe.__webglTexture,ie)}else if(Ie){const Pe=U;for(let He=0;He<S.textures.length;He++){const $e=Y.get(S.textures[He]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+He,$e.__webglTexture,ie,Pe)}}else if(S!==null&&ie!==0){const Pe=Y.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Pe.__webglTexture,ie)}ne=-1};function fu(S){const U=Y.get(S);return(U.__readFormat!==S.format||U.__readType!==S.type)&&(U.__readFormat=S.format,U.__readType=S.type,U.__formatReadable=C.textureFormatReadable(S.format),U.__typeReadable=C.textureTypeReadable(S.type)),U}this.readRenderTargetPixels=function(S,U,ie,Z,J,Ie,Ue,Pe=0){if(!(S&&S.isWebGLRenderTarget)){mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let He=Y.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ue!==void 0&&(He=He[Ue]),He){_.bindFramebuffer(L.FRAMEBUFFER,He);try{const $e=S.textures[Pe],rt=$e.format,ot=$e.type;S.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Pe);const Ge=fu($e);if(Ge.__formatReadable===!1){mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ge.__typeReadable===!1){mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-Z&&ie>=0&&ie<=S.height-J&&L.readPixels(U,ie,Z,J,we.convert(rt),we.convert(ot),Ie)}finally{const $e=ae!==null?Y.get(ae).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,$e)}}},this.readRenderTargetPixelsAsync=async function(S,U,ie,Z,J,Ie,Ue,Pe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let He=Y.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ue!==void 0&&(He=He[Ue]),He)if(U>=0&&U<=S.width-Z&&ie>=0&&ie<=S.height-J){_.bindFramebuffer(L.FRAMEBUFFER,He);const $e=S.textures[Pe],rt=$e.format,ot=$e.type;S.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Pe);const Ge=fu($e);if(Ge.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ge.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const vt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,vt),L.bufferData(L.PIXEL_PACK_BUFFER,Ie.byteLength,L.STREAM_READ),L.readPixels(U,ie,Z,J,we.convert(rt),we.convert(ot),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);const kt=ae!==null?Y.get(ae).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,kt);const Rt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await yx(L,Rt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,vt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Ie),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(vt),L.deleteSync(Rt),Ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,U=null,ie=0){const Z=Math.pow(2,-ie),J=Math.floor(S.image.width*Z),Ie=Math.floor(S.image.height*Z),Ue=U!==null?U.x:0,Pe=U!==null?U.y:0;re.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,ie,0,0,Ue,Pe,J,Ie),_.unbindTexture()},this.copyTextureToTexture=function(S,U,ie=null,Z=null,J=0,Ie=0){let Ue,Pe,He,$e,rt,ot,Ge,vt,kt;const Rt=S.isCompressedTexture?S.mipmaps[Ie]:S.image;if(ie!==null)Ue=ie.max.x-ie.min.x,Pe=ie.max.y-ie.min.y,He=ie.isBox3?ie.max.z-ie.min.z:1,$e=ie.min.x,rt=ie.min.y,ot=ie.isBox3?ie.min.z:0;else{const Ft=Math.pow(2,-J);Ue=Math.floor(Rt.width*Ft),Pe=Math.floor(Rt.height*Ft),S.isDataArrayTexture?He=Rt.depth:S.isData3DTexture?He=Math.floor(Rt.depth*Ft):He=1,$e=0,rt=0,ot=0}Z!==null?(Ge=Z.x,vt=Z.y,kt=Z.z):(Ge=0,vt=0,kt=0);const Et=we.convert(U.format),Kt=we.convert(U.type);let Ne;U.isData3DTexture?(re.setTexture3D(U,0),Ne=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(re.setTexture2DArray(U,0),Ne=L.TEXTURE_2D_ARRAY):(re.setTexture2D(U,0),Ne=L.TEXTURE_2D),_.activeTexture(L.TEXTURE0),_.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),_.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),_.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const on=_.getParameter(L.UNPACK_ROW_LENGTH),ft=_.getParameter(L.UNPACK_IMAGE_HEIGHT),Sn=_.getParameter(L.UNPACK_SKIP_PIXELS),$n=_.getParameter(L.UNPACK_SKIP_ROWS),Pi=_.getParameter(L.UNPACK_SKIP_IMAGES);_.pixelStorei(L.UNPACK_ROW_LENGTH,Rt.width),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Rt.height),_.pixelStorei(L.UNPACK_SKIP_PIXELS,$e),_.pixelStorei(L.UNPACK_SKIP_ROWS,rt),_.pixelStorei(L.UNPACK_SKIP_IMAGES,ot);const ms=S.isDataArrayTexture||S.isData3DTexture,Mt=U.isDataArrayTexture||U.isData3DTexture;if(S.isDepthTexture){const Ft=Y.get(S),Ii=Y.get(U),wt=Y.get(Ft.__renderTarget),Li=Y.get(Ii.__renderTarget);_.bindFramebuffer(L.READ_FRAMEBUFFER,wt.__webglFramebuffer),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,Li.__webglFramebuffer);for(let gs=0;gs<He;gs++)ms&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Y.get(S).__webglTexture,J,ot+gs),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Y.get(U).__webglTexture,Ie,kt+gs)),L.blitFramebuffer($e,rt,Ue,Pe,Ge,vt,Ue,Pe,L.DEPTH_BUFFER_BIT,L.NEAREST);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(J!==0||S.isRenderTargetTexture||Y.has(S)){const Ft=Y.get(S),Ii=Y.get(U);_.bindFramebuffer(L.READ_FRAMEBUFFER,z),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,O);for(let wt=0;wt<He;wt++)ms?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ft.__webglTexture,J,ot+wt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ft.__webglTexture,J),Mt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ii.__webglTexture,Ie,kt+wt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ii.__webglTexture,Ie),J!==0?L.blitFramebuffer($e,rt,Ue,Pe,Ge,vt,Ue,Pe,L.COLOR_BUFFER_BIT,L.NEAREST):Mt?L.copyTexSubImage3D(Ne,Ie,Ge,vt,kt+wt,$e,rt,Ue,Pe):L.copyTexSubImage2D(Ne,Ie,Ge,vt,$e,rt,Ue,Pe);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Mt?S.isDataTexture||S.isData3DTexture?L.texSubImage3D(Ne,Ie,Ge,vt,kt,Ue,Pe,He,Et,Kt,Rt.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(Ne,Ie,Ge,vt,kt,Ue,Pe,He,Et,Rt.data):L.texSubImage3D(Ne,Ie,Ge,vt,kt,Ue,Pe,He,Et,Kt,Rt):S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,Ie,Ge,vt,Ue,Pe,Et,Kt,Rt.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,Ie,Ge,vt,Rt.width,Rt.height,Et,Rt.data):L.texSubImage2D(L.TEXTURE_2D,Ie,Ge,vt,Ue,Pe,Et,Kt,Rt);_.pixelStorei(L.UNPACK_ROW_LENGTH,on),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ft),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Sn),_.pixelStorei(L.UNPACK_SKIP_ROWS,$n),_.pixelStorei(L.UNPACK_SKIP_IMAGES,Pi),Ie===0&&U.generateMipmaps&&L.generateMipmap(Ne),_.unbindTexture()},this.initRenderTarget=function(S){Y.get(S).__webglFramebuffer===void 0&&re.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?re.setTextureCube(S,0):S.isData3DTexture?re.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?re.setTexture2DArray(S,0):re.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){q=0,H=0,ae=null,_.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=ct._getUnpackColorSpace()}}const lT={class:"mitsui-globe-section",id:"mitsui-globe-section"},cT={class:"globe-container"},uT={class:"globe-layout"},dT={class:"globe-left-col"},fT={key:0,class:"globe-sub-desc"},hT={class:"globe-right-col"},pT={class:"video-cards-stack"},mT={class:"video-media-wrap"},gT=["src","onTimeupdate"],_T=["onClick","title"],vT={key:0,viewBox:"0 0 24 24",fill:"currentColor"},xT={key:1,viewBox:"0 0 24 24",fill:"currentColor"},yT={class:"showcase-bottom-bar"},ST={class:"showcase-meta"},bT={class:"meta-title"},MT={__name:"GlobeInnovation",setup(n){const e={ko:{desc:"아자미노는 한국과 일본을 잇는 비즈니스 네트워크와 정밀한 데이터 기반 통찰력으로 지속 가능한 무역 솔루션을 실현합니다.",allBizBtn:"All Business"},ja:{desc:"AZAMINOは、緻密な市場分析と強固なインフラを通じて、持続可能な貿易ソリューションを実現します。",allBizBtn:"All Business"},en:{desc:"Azamino delivers sustainable trade solutions through sophisticated market analysis and robust infrastructure.",allBizBtn:"All Business"}},t=st(()=>e[Fe.value]||e.ja),i=[{id:1,category:"Corporate (DX)",title:"Nutritional foods designed for dysphagia and geriatric care",src:"/videos/gaigosixyokuhin.mp4"},{id:2,category:"Chemicals & Energy",title:"Shockproof, heavy-duty portable safe",src:"/videos/kane.mp4"},{id:3,category:"Global Trading & DX",title:"Performance chemicals and specialty polymer solutions",src:"/videos/mainbanner-3.mp4"}],s=Nt([]),r=Nt([!0,!0,!0]),a=Nt([0,0,0]),o=(O,q)=>{O&&(s.value[q]=O)},l=O=>{const q=s.value[O];q&&(q.paused?(q.play(),r.value[O]=!0):(q.pause(),r.value[O]=!1))},c=(O,q)=>{const H=O.target;H&&H.duration&&(a.value[q]=H.currentTime/H.duration*100)},u=Nt(null),h=Nt(null);let f,p,v,b,g,m,E=!1,A={x:0,y:0},x=0,T=0;const w=()=>{const O=u.value,q=h.value;if(!O||!q)return;const H=O.clientWidth||380,ae=O.clientHeight||380;f=new Ox,p=new Tn(45,H/ae,.1,1e3),p.position.z=2.68,v=new oT({canvas:q,antialias:!0,alpha:!0,powerPreference:"high-performance"}),v.setSize(H,ae),v.setPixelRatio(Math.min(window.devicePixelRatio,2));const ne=new oy(16777215,.5);f.add(ne);const de=new Od(16777215,2.2);de.position.set(4,2.5,3.5),f.add(de);const pe=new Od(3718648,1.25);pe.position.set(-3,-2,-2),f.add(pe);const Re=new sy,Oe=Re.load("/images/earth/earth_atmos_2048.jpg"),lt=Re.load("/images/earth/earth_specular_2048.jpg"),et=Re.load("/images/earth/earth_normal_2048.jpg"),Qe=Re.load("/images/earth/earth_clouds_1024.png"),D=new za(1,64,64),W=new Pd({map:Oe,roughnessMap:lt,roughness:.65,metalness:.1,normalMap:et,normalScale:new dt(.5,.5)});b=new zn(D,W),b.rotation.z=.41,f.add(b);const se=new za(1.018,64,64),xe=new Pd({map:Qe,transparent:!0,opacity:.85,blending:Rl,depthWrite:!1});g=new zn(se,xe),g.rotation.z=.41,f.add(g),q.addEventListener("mousedown",y),window.addEventListener("mousemove",R),window.addEventListener("mouseup",F),q.addEventListener("touchstart",G,{passive:!0}),window.addEventListener("touchmove",K,{passive:!0}),window.addEventListener("touchend",j),I()},I=()=>{m=requestAnimationFrame(I),E?(b.rotation.y+=T,g.rotation.y+=T*1.05,b.rotation.x+=x,g.rotation.x+=x,x*=.92,T*=.92):(b.rotation.y+=.0022,g.rotation.y+=.0028),v.render(f,p)},y=O=>{E=!0,A={x:O.clientX,y:O.clientY}},R=O=>{if(!E)return;const q=O.clientX-A.x,H=O.clientY-A.y;T=q*.004,x=H*.004,A={x:O.clientX,y:O.clientY}},F=()=>{E=!1},G=O=>{O.touches.length===1&&(E=!0,A={x:O.touches[0].clientX,y:O.touches[0].clientY})},K=O=>{if(!E||O.touches.length!==1)return;const q=O.touches[0].clientX-A.x,H=O.touches[0].clientY-A.y;T=q*.004,x=H*.004,A={x:O.touches[0].clientX,y:O.touches[0].clientY}},j=()=>{E=!1},z=()=>{if(!u.value||!v||!p)return;const O=u.value.clientWidth,q=u.value.clientHeight;p.aspect=O/q,p.updateProjectionMatrix(),v.setSize(O,q)};return Br(()=>{Pc(()=>{w(),window.addEventListener("resize",z),s.value.forEach((O,q)=>{if(O){O.muted=!0;const H=O.play();H!==void 0&&H.then(()=>{r.value[q]=!0}).catch(()=>{r.value[q]=!1})}})})}),Ks(()=>{window.removeEventListener("resize",z),cancelAnimationFrame(m),window.removeEventListener("mousemove",R),window.removeEventListener("mouseup",F),window.removeEventListener("touchmove",K),window.removeEventListener("touchend",j),v&&v.dispose(),b&&(b.geometry.dispose(),b.material.dispose()),g&&(g.geometry.dispose(),g.material.dispose())}),(O,q)=>($(),ee("section",lT,[d("div",cT,[d("div",uT,[d("div",dT,[q[1]||(q[1]=d("div",{class:"globe-top-rule"},null,-1)),q[2]||(q[2]=d("span",{class:"globe-tag"},"Innovation",-1)),q[3]||(q[3]=d("h2",{class:"globe-main-title"},[ht(" Continuing to"),d("br"),ht(" challenge and create,"),d("br"),ht(" for brighter futures. ")],-1)),t.value.desc?($(),ee("p",fT,N(t.value.desc),1)):Bt("",!0),d("div",{class:"earth-canvas-wrapper",ref_key:"earthContainerRef",ref:u},[d("canvas",{ref_key:"earthCanvasRef",ref:h,class:"earth-canvas"},null,512),q[0]||(q[0]=d("div",{class:"earth-halo-glow"},null,-1))],512)]),d("div",hT,[d("div",pT,[($(),ee(Le,null,Ke(i,(H,ae)=>d("article",{key:H.id,class:"video-showcase-card"},[d("div",mT,[d("video",{ref_for:!0,ref:ne=>o(ne,ae),src:H.src,autoplay:"",muted:"",loop:"",playsinline:"",preload:"auto",class:"showcase-video",onTimeupdate:ne=>c(ne,ae)},null,40,gT),d("button",{type:"button",class:"video-play-btn",onClick:ne=>l(ae),title:r.value[ae]?"Pause":"Play","aria-label":"재생/일시정지"},[r.value[ae]?($(),ee("svg",xT,[...q[5]||(q[5]=[d("path",{d:"M6 19h4V5H6v14zm8-14v14h4V5h-4z"},null,-1)])])):($(),ee("svg",vT,[...q[4]||(q[4]=[d("path",{d:"M8 5v14l11-7z"},null,-1)])]))],8,_T)]),d("div",yT,[d("div",ST,[d("h3",bT,N(H.title),1)])])])),64))])])])])]))}},ET=hn(MT,[["__scopeId","data-v-1a04feef"]]),TT={class:"mitsui-style-main-view"},AT={class:"mitsui-business-section"},wT={class:"container"},CT={class:"sec-header-row"},RT={class:"header-text-group"},PT={class:"sec-headline"},IT={class:"business-rows-list"},LT={class:"biz-row-left"},DT={class:"biz-row-title-wrap"},NT={class:"biz-row-title"},UT={key:0,class:"biz-row-subtitle"},OT={class:"biz-row-desc"},FT={class:"biz-row-right"},BT={class:"biz-row-img-wrap"},kT=["src","alt"],HT={class:"mitsui-pickup-section"},GT={class:"container"},VT={class:"pickup-header-row"},zT={class:"pickup-headline"},WT={class:"pickup-cards-grid"},$T=["href","download"],XT={class:"pickup-img-box"},qT=["src","alt"],YT={class:"pickup-card-content"},KT={class:"pickup-title-wrap"},ZT={class:"pickup-card-title"},JT={key:0,class:"pickup-card-sub"},QT={class:"pickup-img-box"},jT=["src","alt"],e1={class:"pickup-card-content"},t1={class:"pickup-title-wrap"},n1={class:"pickup-card-title"},i1={key:0,class:"pickup-card-sub"},s1={__name:"MainView",setup(n){const e={ko:{slides:[{id:1,category:"GLOBAL INNOVATION",keyword:"Connecting Worlds,",mainTitle:"Creating Lasting Value.",description:"Discover Our Global Operations",link:"information",image:"/images/main/slide-main-tokyo.jpg"},{id:2,category:"WELLNESS & NUTRITION",keyword:"Care Food Solutions,",mainTitle:"건강하고 풍요로운 삶을 위한 약속",description:"엄선된 일본 최고 수준의 영양 케어푸드로 고령화 사회의 삶의 질을 높입니다.",link:"food",image:"/images/main/slide-main-healthyfood.jpg"},{id:3,category:"SAFETY & SECURITY",keyword:"Asset Protection,",mainTitle:"신뢰할 수 있는 내화·방범 금고 솔루션",description:"소중한 자산과 기밀을 안전하게 지키는 일본 최고의 방재 보안 제품을 공급합니다.",link:"money",image:"/images/main/slide-main-money.png"},{id:4,category:"ADVANCED CHEMICALS",keyword:"Industrial Innovation,",mainTitle:"첨단 산업을 선도하는 정밀 화학 원료",description:"다양한 산업 현장에 필요한 고기능성 화학 제품을 신속하고 안정적으로 조달합니다.",link:"chemical",image:"/images/main/slide-main-chemical.png"},{id:5,category:"GLOBAL TRADING NETWORK",keyword:"360° Trade Solutions,",mainTitle:"최적의 글로벌 공급망을 연결합니다",description:"무역, 물류, 유통을 잇는 원스톱 프로세스로 고객에게 최상의 비즈니스 경쟁력을 제공합니다.",link:"service",video:"/videos/azamino-graph.mp4"}],topics:{date:"2026.10.15",title:"아자미노 공식 웹사이트 리뉴얼 및 신규 무역 사업부문 안내",btnText:"공지사항 전체보기",link:"/contact"},about:{headline:"Discover Our Global Operations",desc1:"아자미노는 한국과 일본을 잇는 탄탄한 비즈니스 네트워크와 정밀한 시장 통찰력을 바탕으로 설립된 종합 무역 솔루션 파트너입니다.",desc2:"개호식품, 방재 금고, 생활소비재, 첨단 화학제품에 이르기까지 다각화된 사업 포트폴리오를 전개하며, 단순한 유통을 넘어 고객과 산업에 지속 가능한 가치를 제공합니다.",ctaText:"회사소개 바로가기",pillars:[{num:"01",title:"Global Synergy",desc:"한일 양국의 특화된 장점을 결합하여 안정적이고 유기적인 공급망 인프라를 실현합니다."},{num:"02",title:"Strict Quality Assurance",desc:"현지 기준과 국내 안전 규격을 완벽히 충족하는 최우수 인증 제품만을 엄선 공급합니다."},{num:"03",title:"Sustainable Partnership",desc:"일회성 거래가 아닌, 고객의 중장기적 비즈니스 성장을 함께 도모하는 상생의 동반자입니다."}]},business:{headline:"Discover Our Global Operations",viewAllText:"사업소개 전체보기",items:[{id:"food",title:"Innovation",desc:"단순한 연결을 넘어 새로운 가치를 창출합니다.",image:"/images/main/slide-main-healthyfood.jpeg",link:"/food"},{id:"money",title:"Sustainability",desc:"우리의 혁신은 흔들림 없는 성장의 굳건한 토대입니다.",image:"/images/main/slide-main-money.png",link:"/money"},{id:"product",title:"Trust",desc:"신뢰로 구축하고 완벽한 실행력으로 증명하는 네트워크.",image:"/images/main/slide-main-tokyo.jpg",link:"/product"}]},pickup:{headline:"Contents",items:[{id:"profile",title:"Company Profile",subTitle:"Philosophy & Overview",link:"/overview",image:"/images/pickup/pickup_1.webp"},{id:"leadership",title:"Greetings",subTitle:"Executive Message",link:"/greeting",image:"/images/pickup/pickup_2.webp"},{id:"services",title:"Services",subTitle:"Our Businesses",link:"/service",image:"/images/pickup/pickup_4.webp"},{id:"brochure",title:"Company Brochure",subTitle:"会社紹介書 (PDF)",link:"/downloads/会社紹介書.pdf",downloadName:"会社紹介書.pdf",isDownload:!0,image:"/images/pickup/pickup_5.webp"}]},cta:{title:"아자미노와 함께 비즈니스의 새로운 내일을 만들어가십시오.",desc:"제품 수입, 유통 협력, 신규 무역 프로젝트에 대해 전문 팀이 신속하게 상담해 드립니다.",btnInquiry:"온라인 문의하기",btnLocation:"오시는 길 안내"}},ja:{slides:[{id:1,category:"GLOBAL INNOVATION",keyword:"Connecting Worlds,",mainTitle:"Creating Lasting Value.",description:"AZAMINOは、日韓の信頼と専門性を軸に、新たなビジネス価値を共創します。",link:"information",image:"/images/main/slide-main-tokyo.jpg"},{id:2,category:"WELLNESS & NUTRITION",keyword:"Care Food Solutions,",mainTitle:"健やかで豊かな暮らしへの約束",description:"高品質な介護食品の輸出入を通じて、高齢化社会のQOL向上に貢献します。",link:"food",image:"/images/main/slide-main-healthyfood.jpg"},{id:3,category:"SAFETY & SECURITY",keyword:"Asset Protection,",mainTitle:"信頼の耐火・防犯金庫ソリューション",description:"大切な資産と機密を火災や盗難から守る、最高水準の金庫製品をお届けします。",link:"money",image:"/images/main/slide-main-money.png"},{id:4,category:"ADVANCED CHEMICALS",keyword:"Industrial Innovation,",mainTitle:"先端産業を支える高機能化学品",description:"製造現場の技術革新に不可欠な精密化学原料を迅速かつ安定的に調達します。",link:"chemical",image:"/images/main/slide-main-chemical.png"},{id:5,category:"GLOBAL TRADING NETWORK",keyword:"360° Trade Solutions,",mainTitle:"最適なグローバルサプライチェーンの構築",description:"貿易・物流・販売を一貫して支援し、お客様の競争力を最大化します。",link:"service",video:"/videos/azamino-graph.mp4"}],topics:{date:"2026.10.15",title:"AZAMINO公式コーポレートサイトリニューアルおよび新規事業展開のお知らせ",btnText:"お知らせ一覧",link:"/contact"},about:{headline:"信頼と洞察で、日韓貿易の未来を切り拓く。",desc1:"株式会社AZAMINOは、日韓をつなぐ確かなネットワークと市場知見を強みとする総合ビジネスパートナーです。",desc2:"介護食品、セキュリティ金庫、生活用品、高機能化学品に至るまで、多角的な事業を展開し、単なる流通を超えた持続可能な価値を社会に提供します。",ctaText:"企業情報を見る",pillars:[{num:"01",title:"Global Synergy",desc:"日韓両国の強みを融合させ、強固で機動的なサプライチェーンインフラを実現します。"},{num:"02",title:"Strict Quality Assurance",desc:"安全基準と厳格な検査をクリアした、確かな品質の製品のみを厳選調達します。"},{num:"03",title:"Sustainable Partnership",desc:"長期的な信頼を基盤に、パートナー企業とともに持続的な成長を目指します。"}]},business:{headline:"Discover Our Global Operations",viewAllText:"事業紹介 全体を見る",items:[{id:"food",title:"Innovation",desc:"単なるつながりを超え、新たな価値を創造する。",image:"/images/main/slide-main-healthyfood.jpeg",link:"/food"},{id:"money",title:"Sustainability",desc:"私たちの革新は、着実な成長の礎です。",image:"/images/main/slide-main-money.png",link:"/money"},{id:"product",title:"Trust",desc:"信頼で築き、確かな実行力で証明するネットワーク。",image:"/images/main/slide-main-tokyo.jpg",link:"/product"}]},feature:{headline:"データ主導の貿易ソリューションとアザミノの未来構想",desc:"迅速な通関業務、厳密な品質検証、安全な物流ネットワークまで、日韓貿易の全過程をワンストップで最適化します。",ctaText:"ソリューションを見る",stats:[{val:"360°",label:"One-Stop Trading"},{val:"100%",label:"Strict Verification"},{val:"24/7",label:"Global Network"}]},pickup:{headline:"Pickup Contents",items:[{id:"profile",title:"Corporate Profile",subTitle:"会社情報・概要",link:"/overview",image:"/images/pickup/pickup_1.webp"},{id:"leadership",title:"Greetings",subTitle:"役員メッセージ",link:"/greeting",image:"/images/pickup/pickup_2.webp"},{id:"services",title:"Services & Products",subTitle:"事業・取扱商品",link:"/service",image:"/images/pickup/pickup_4.webp"},{id:"brochure",title:"Corporate Brochure",subTitle:"会社紹介書 (PDF)",link:"/downloads/会社紹介書.pdf",downloadName:"会社紹介書.pdf",isDownload:!0,image:"/images/pickup/pickup_5.webp"}]},cta:{title:"AZAMINOとともに、新たなビジネスの可能性を拓きませんか。",desc:"輸出入取引、販売代理店、アライアンスに関するご相談は、お気軽にお問い合わせください。",btnInquiry:"お問い合わせ",btnLocation:"アクセス"}},en:{slides:[{id:1,category:"GLOBAL INNOVATION",keyword:"Connecting Worlds,",mainTitle:"Creating Lasting Value.",description:"AZAMINO bridges Korea and Japan to co-create sustainable business opportunities.",link:"information",image:"/images/main/slide-main-tokyo.jpg"},{id:2,category:"WELLNESS & NUTRITION",keyword:"Care Food Solutions,",mainTitle:"Dedicated to Healthy, Fulfilling Lives",description:"Delivering premium specialized nutrition products designed for senior well-being.",link:"food",image:"/images/main/slide-main-healthyfood.jpg"},{id:3,category:"SAFETY & SECURITY",keyword:"Asset Protection,",mainTitle:"Proven Fireproof & Security Safes",description:"Protecting vital assets and confidential records against fire, theft, and natural disasters.",link:"money",image:"/images/main/slide-main-money.png"},{id:4,category:"ADVANCED CHEMICALS",keyword:"Industrial Innovation,",mainTitle:"Specialty Chemicals for Advanced Industry",description:"Providing functional raw materials and specialty chemicals essential for high-tech manufacturing.",link:"chemical",image:"/images/main/slide-main-chemical.png"},{id:5,category:"GLOBAL TRADING NETWORK",keyword:"360° Trade Solutions,",mainTitle:"Connecting Optimized Global Supply Chains",description:"Comprehensive one-stop trade, logistics, and distribution that empower our clients.",link:"service",video:"/videos/azamino-graph.mp4"}],topics:{date:"2026.10.15",title:"AZAMINO Launches Renewed Corporate Platform and Business Divisions",btnText:"View All News",link:"/contact"},about:{headline:"Connecting Korea and Japan with Integrity, Insight, and Precision.",desc1:"AZAMINO Inc. is a premier cross-border trading and business solutions provider rooted in profound bilateral expertise between Korea and Japan.",desc2:"Across care food, fireproof safes, lifestyle goods, and specialty chemicals, we deliver tangible, enduring value that moves industries forward.",ctaText:"About Our Company",pillars:[{num:"01",title:"Global Synergy",desc:"Harnessing the specialized competencies of both nations to engineer seamless supply chains."},{num:"02",title:"Strict Quality Assurance",desc:"Procuring and distributing only certified products that comply with rigorous international benchmarks."},{num:"03",title:"Sustainable Partnership",desc:"Committed to fostering long-term mutual growth alongside our clients and global partners."}]},business:{headline:"Discover Our Global Operations",viewAllText:"View All Operations",items:[{id:"food",title:"Innovation",desc:"Creating new value beyond simple connectivity.",image:"/images/main/slide-main-healthyfood.jpeg",link:"/food"},{id:"money",title:"Sustainability",desc:"Our innovation is the foundation of steady growth.",image:"/images/main/slide-main-money.png",link:"/money"},{id:"product",title:"Trust",desc:"A network built on trust, proven by flawless execution.",image:"/images/main/slide-main-tokyo.jpg",link:"/product"}]},feature:{headline:"Data-Driven Trade Solutions and AZAMINO’s Global Vision",desc:"From rapid customs clearance to strict quality audits and safe warehousing, we unify cross-border trade seamlessly.",ctaText:"Explore Trade Solutions",stats:[{val:"360°",label:"One-Stop Trading"},{val:"100%",label:"Strict Verification"},{val:"24/7",label:"Global Network"}]},pickup:{headline:"Pickup Contents",items:[{id:"profile",title:"Corporate Profile",subTitle:"Philosophy & Overview",link:"/overview",image:"/images/pickup/pickup_1.webp"},{id:"leadership",title:"Greetings",subTitle:"Executive Message",link:"/greeting",image:"/images/pickup/pickup_2.webp"},{id:"services",title:"Services & Products",subTitle:"Business Divisions",link:"/service",image:"/images/pickup/pickup_4.webp"},{id:"brochure",title:"Corporate Brochure",subTitle:"Company Brochure (PDF)",link:"/downloads/会社紹介書.pdf",downloadName:"会社紹介書.pdf",isDownload:!0,image:"/images/pickup/pickup_5.webp"}]},cta:{title:"Partner with AZAMINO to Pioneer New Horizons.",desc:"Our specialized team is ready to consult on imports, distribution partnerships, and new trade initiatives.",btnInquiry:"Contact Us",btnLocation:"Office Locations"}}},t=st(()=>e[Fe.value]||e.ja);return(i,s)=>{const r=rn("router-link");return $(),ee("div",TT,[Xe(F0,{slides:t.value.slides},null,8,["slides"]),Xe(ET),d("section",AT,[d("div",wT,[d("div",CT,[d("div",RT,[d("h2",PT,N(t.value.business.headline),1)])]),d("div",IT,[($(!0),ee(Le,null,Ke(t.value.business.items,a=>($(),ee("article",{key:a.id,class:"biz-row-item"},[Xe(r,{to:a.link||"/service",class:"biz-row-link"},{default:Ve(()=>[d("div",LT,[d("div",DT,[d("h3",NT,N(a.title),1),a.badge||a.enTitle?($(),ee("span",UT,N(a.badge||a.enTitle),1)):Bt("",!0)]),d("p",OT,N(a.desc),1)]),d("div",FT,[d("div",BT,[d("img",{src:a.image,alt:a.title,loading:"lazy",class:"biz-row-img"},null,8,kT)])])]),_:2},1032,["to"])]))),128))])])]),d("section",HT,[d("div",GT,[s[4]||(s[4]=d("div",{class:"pickup-top-divider"},null,-1)),d("div",VT,[d("h2",zT,N(t.value.pickup.headline),1)]),d("div",WT,[($(!0),ee(Le,null,Ke(t.value.pickup.items,a=>($(),ee("article",{key:a.id,class:"pickup-card"},[a.isDownload?($(),ee("a",{key:0,href:a.link,download:a.downloadName||"会社紹介書.pdf",class:"pickup-card-link",title:"会社紹介書 ダウンロード"},[d("div",XT,[d("img",{src:a.image,alt:a.title,class:"pickup-img",loading:"lazy"},null,8,qT),s[0]||(s[0]=d("div",{class:"pickup-scrim"},null,-1))]),d("div",YT,[d("div",KT,[d("h3",ZT,N(a.title),1),a.subTitle?($(),ee("span",JT,N(a.subTitle),1)):Bt("",!0)]),s[1]||(s[1]=d("div",{class:"pickup-arrow-badge"},[d("svg",{class:"pickup-arrow-svg",viewBox:"0 0 16 16",fill:"currentColor"},[d("path",{"fill-rule":"evenodd",d:"M8 2a.75.75 0 0 1 .75.75v8.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V2.75A.75.75 0 0 1 8 2z"})])],-1))])],8,$T)):($(),It(r,{key:1,to:a.link,class:"pickup-card-link"},{default:Ve(()=>[d("div",QT,[d("img",{src:a.image,alt:a.title,class:"pickup-img",loading:"lazy"},null,8,jT),s[2]||(s[2]=d("div",{class:"pickup-scrim"},null,-1))]),d("div",e1,[d("div",t1,[d("h3",n1,N(a.title),1),a.subTitle?($(),ee("span",i1,N(a.subTitle),1)):Bt("",!0)]),s[3]||(s[3]=d("div",{class:"pickup-arrow-badge"},[d("svg",{class:"pickup-arrow-svg",viewBox:"0 0 16 16",fill:"currentColor"},[d("path",{"fill-rule":"evenodd",d:"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"})])],-1))])]),_:2},1032,["to"]))]))),128))])])])])}}},r1=hn(s1,[["__scopeId","data-v-cbdea55c"]]),a1={class:"visual-hero-inner"},o1={key:0,class:"visual-hero-category-en"},l1={class:"visual-hero-title"},c1={key:1,class:"visual-hero-desc"},u1={class:"subpage-breadcrumb","aria-label":"Breadcrumb"},d1={class:"subpage-container breadcrumb-container"},f1={class:"breadcrumb-list"},h1={class:"breadcrumb-item"},p1={class:"breadcrumb-item"},m1={key:1},g1={class:"breadcrumb-item breadcrumb-current"},_1={key:1,class:"subpage-hero"},v1={class:"subpage-container subpage-hero-container"},x1={class:"subpage-hero-title"},y1={key:0,class:"subpage-hero-desc"},S1={class:"subpage-content-area"},b1={class:"subpage-container"},M1={__name:"SubPageLayout",props:{categoryTitle:{type:String,required:!0},categoryEn:{type:String,default:""},categoryUrl:{type:String,default:""},pageTitle:{type:String,default:""},pageDescription:{type:String,default:""},heroImage:{type:String,default:""},tabs:{type:Array,default:()=>[]},hideHero:{type:Boolean,default:!1}},setup(n){Ih();const e=Nt(null);return(t,i)=>{const s=rn("router-link");return $(),ee("div",{class:Dt(["subpage-wrapper",{"has-custom-hero":!!t.$slots.hero||!!n.heroImage}])},[Eu(t.$slots,"hero",{},void 0),!t.$slots.hero&&n.heroImage?($(),ee("section",{key:0,class:"subpage-visual-hero-fullscreen",style:Za({backgroundImage:`url(${n.heroImage})`})},[i[1]||(i[1]=d("div",{class:"visual-hero-overlay"},null,-1)),d("div",a1,[n.categoryEn?($(),ee("span",o1,N(n.categoryEn),1)):Bt("",!0),d("h1",l1,N(n.pageTitle||n.categoryTitle),1),i[0]||(i[0]=d("div",{class:"visual-hero-underline"},null,-1)),n.pageDescription?($(),ee("p",c1,N(n.pageDescription),1)):Bt("",!0)])],4)):Bt("",!0),d("div",{id:"subpage-content-start",ref_key:"contentStartRef",ref:e},null,512),d("nav",u1,[d("div",d1,[d("ol",f1,[d("li",h1,[Xe(s,{to:"/"},{default:Ve(()=>[...i[2]||(i[2]=[d("svg",{class:"breadcrumb-home-icon",viewBox:"0 0 24 24",fill:"currentColor"},[d("path",{d:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"})],-1),d("span",{class:"sr-only"},"HOME",-1)])]),_:1})]),i[4]||(i[4]=d("li",{class:"breadcrumb-separator"},">",-1)),d("li",p1,[n.categoryUrl?($(),It(s,{key:0,to:n.categoryUrl},{default:Ve(()=>[ht(N(n.categoryTitle),1)]),_:1},8,["to"])):($(),ee("span",m1,N(n.categoryTitle),1))]),n.pageTitle&&n.pageTitle!==n.categoryTitle?($(),ee(Le,{key:0},[i[3]||(i[3]=d("li",{class:"breadcrumb-separator"},">",-1)),d("li",g1,N(n.pageTitle),1)],64)):Bt("",!0)])])]),!t.$slots.hero&&!n.heroImage&&!n.hideHero?($(),ee("section",_1,[d("div",v1,[d("h1",x1,N(n.pageTitle||n.categoryTitle),1),n.pageDescription?($(),ee("p",y1,N(n.pageDescription),1)):Bt("",!0)])])):Bt("",!0),d("div",S1,[d("div",b1,[Eu(t.$slots,"default",{},void 0)])])],2)}}},an=hn(M1,[["__scopeId","data-v-6a5a8b40"]]),E1={class:"glance-center-container"},T1={class:"glance-heading-title"},A1={class:"glance-main-grid"},w1={class:"glance-left-brand-col"},C1={class:"glance-brand-text"},R1={class:"brand-corp-name"},P1={class:"brand-sub-title"},I1={class:"glance-right-col"},L1={class:"glance-stats-row glance-top-row"},D1={class:"stat-col-label"},N1={class:"stat-val-wrapper"},U1={key:0,class:"stat-unit-text"},O1={class:"glance-stats-row glance-bottom-row"},F1={class:"glance-stat-col stat-cf-col"},B1={class:"stat-col-label"},k1={class:"stat-icon-num-wrap"},H1={class:"stat-val-stacked"},G1={class:"stat-big-number is-bank-name"},V1={class:"glance-stat-col stat-network-col"},z1={class:"network-header-wrap"},W1={class:"stat-col-label"},$1={class:"network-headline-val"},X1={class:"network-big-val"},q1={class:"network-unit-text"},Y1={class:"network-sub-metrics-grid"},K1={class:"sub-item-icon"},Z1={key:0,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},J1={key:1,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},Q1={key:2,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},j1={class:"sub-item-label"},eA={class:"sub-item-val-wrap"},tA={class:"sub-item-number"},nA={class:"sub-item-unit"},iA={class:"glance-footnote-bar"},sA={class:"footnote-text"},rA={id:"company-main-content",class:"company-mitsui-template-wrap"},aA={class:"company-features-list"},oA={class:"biz-feature-thumb-wrap"},lA=["src","alt"],cA={class:"biz-feature-content-wrap"},uA={class:"biz-feature-title"},dA={class:"biz-feature-lead-text"},fA={class:"biz-feature-sub-text"},hA={__name:"Information",setup(n){const e={ko:{badge:"2024년 3월기",title:"회사정보",brandName:"AZAMINO",topStats:[{label:"매상",value:"2",unit:"億円"},{label:"설립",value:"2014年1月24日",unit:""}],bottomStats:{bank:{label:"주요거래은행",value:"미즈호 은행"},globalNetwork:{label:"글로벌 네트워크",value:"62",unit:"개국",subMetrics:[{icon:"location",label:"사무소",value:"85",unit:"거점"},{icon:"building",label:"비즈니스 회사",value:"300",unit:"사"},{icon:"users",label:"인원",value:"30,000",unit:"명"}]}},footnote:"※ 기재된 수치는 당사 글로벌 네트워크 및 제휴 파트너사의 지표를 포함합니다."},ja:{badge:"2024年3月期",title:"企業情報",brandName:"AZAMINO",topStats:[{label:"売上",value:"2",unit:"億円"},{label:"設立",value:"2014年1月24日",unit:""}],bottomStats:{bank:{label:"主要取引銀行",value:"みずほ銀行"},globalNetwork:{label:"グローバルネットワーク",value:"62",unit:"ヵ国",subMetrics:[{icon:"location",label:"拠点",value:"85",unit:"拠点"},{icon:"building",label:"グループ会社",value:"300",unit:"社"},{icon:"users",label:"従業員数",value:"30,000",unit:"名"}]}},footnote:"※ 記載された数値は、当社のグローバルネットワークおよび提携パートナーを含みます。"},en:{badge:"FY2024",title:"Company Info",brandName:"AZAMINO",topStats:[{label:"Revenue",value:"200",unit:"M JPY"},{label:"Established",value:"Jan 24, 2014",unit:""}],bottomStats:{bank:{label:"Main Bank",value:"Mizuho Bank"},globalNetwork:{label:"Global Network",value:"62",unit:"Countries",subMetrics:[{icon:"location",label:"Offices",value:"85",unit:"Locations"},{icon:"building",label:"Affiliates",value:"300",unit:"Companies"},{icon:"users",label:"Headcount",value:"30,000",unit:"Staff"}]}},footnote:"* Data includes our global operating network and affiliated trade partners."}},t=st(()=>e[Fe.value]||e.ja),i={ko:[{title:"인사말",mainLink:"/greeting",image:"/images/card/main-card-1.png",leadText:"신뢰와 도전을 바탕으로 새로운 미래 가치를 창출합니다.",subText:"AZAMINO는 급변하는 글로벌 비즈니스 환경 속에서 고객과 파트너를 위한 최고의 솔루션을 제공하며 지속 가능한 성장을 추구합니다.",subLinks:[{name:"대표이사 인사말",url:"/greeting"},{name:"경영 철학",url:"/greeting"}]},{title:"회사이념",mainLink:"/overview",image:"/images/card/main-card-2.png",leadText:"사람과 기술, 세계를 연결하여 풍요로운 사회에 공헌합니다.",subText:"글로벌 네트워크와 탄탄한 전문성을 바탕으로, 고객과 사회 모두에게 신뢰받는 혁신적 비즈니스를 실현해 나갑니다.",subLinks:[{name:"경영이념 체계",url:"/overview"},{name:"회사개요",url:"/overview"},{name:"사업소 안내",url:"/location"}]}],ja:[{title:"ご挨拶",mainLink:"/greeting",image:"/images/card/main-card-1.png",leadText:"信頼と挑戦を礎に、新たな未来価値を共創します。",subText:"急速に変化するグローバルビジネス環境の中で、お客様とパートナーの皆様に最適なソリューションを提供し、持続可能な発展を推進します。",subLinks:[{name:"代表挨拶",url:"/greeting"},{name:"経営哲学",url:"/greeting"}]},{title:"企業理念",mainLink:"/overview",image:"/images/card/main-card-2.png",leadText:"人と技術、グローバルネットワークをつなぎ、豊かな社会に貢献します。",subText:"強固な専門性と国際的なネットワークを活かし、社会と人々に信頼されるイノベーションを実現してまいります。",subLinks:[{name:"経営理念体系",url:"/overview"},{name:"会社概要",url:"/overview"},{name:"拠点案内",url:"/location"}]}],en:[{title:"CEO Greeting",mainLink:"/greeting",image:"/images/card/main-card-1.png",leadText:"Creating sustainable future value based on trust and bold innovation.",subText:"AZAMINO delivers optimal global business solutions, driving sustainable growth together with our partners worldwide.",subLinks:[{name:"CEO Message",url:"/greeting"},{name:"Management Philosophy",url:"/greeting"}]},{title:"Corporate Philosophy",mainLink:"/overview",image:"/images/card/main-card-2.png",leadText:"Connecting people, technology, and global networks for social prosperity.",subText:"Leveraging our global network and deep expertise, we strive to realize innovative businesses trusted by society.",subLinks:[{name:"Philosophy System",url:"/overview"},{name:"Company Overview",url:"/overview"},{name:"Global Locations",url:"/location"}]}]},s=st(()=>i[Fe.value]||i.ja),r=Nt(!1),a=()=>{window.scrollY>20?r.value=!0:r.value=!1},o=h=>{h.deltaY>0&&(r.value=!0)},l=()=>{if(r.value=!r.value,r.value){const h=document.querySelector(".glance-hero-mitsui-fullscreen");h&&h.scrollIntoView({behavior:"smooth"})}};Br(()=>{window.addEventListener("scroll",a,{passive:!0}),window.addEventListener("wheel",o,{passive:!0}),a()}),Ks(()=>{window.removeEventListener("scroll",a),window.removeEventListener("wheel",o)});const c={ko:{categoryTitle:"회사정보",categoryEn:"COMPANY INFO",categoryUrl:"/information",pageTitle:"회사정보"},ja:{categoryTitle:"企業情報",categoryEn:"COMPANY INFO",categoryUrl:"/information",pageTitle:"企業情報"},en:{categoryTitle:"Company Info",categoryEn:"COMPANY INFO",categoryUrl:"/information",pageTitle:"Company Info"}},u=st(()=>c[Fe.value]||c.ja);return(h,f)=>{const p=rn("router-link");return $(),It(an,{"category-title":u.value.categoryTitle,"category-en":u.value.categoryEn,"category-url":u.value.categoryUrl,"page-title":u.value.pageTitle},{hero:Ve(()=>[d("section",{class:Dt(["glance-hero-mitsui-fullscreen",{"is-revealed":r.value}])},[f[7]||(f[7]=d("div",{class:"glance-backdrop-overlay"},null,-1)),d("div",E1,[d("div",{class:"glance-title-top-box",onClick:l,title:"클릭하여 상세 정보 펼치기"},[d("h1",T1,N(t.value.title),1),f[0]||(f[0]=d("div",{class:"glance-title-underline"},null,-1))]),d("div",{class:Dt(["glance-rest-content",{visible:r.value}])},[d("div",A1,[d("div",w1,[f[1]||(f[1]=d("div",{class:"glance-symbol-mark"},null,-1)),d("div",C1,[d("span",R1,N(t.value.brandName),1),d("span",P1,N(t.value.subTitle),1)])]),d("div",I1,[d("div",L1,[($(!0),ee(Le,null,Ke(t.value.topStats,(v,b)=>($(),ee("div",{key:b,class:"glance-stat-col"},[d("span",D1,N(v.label),1),d("div",N1,[d("span",{class:Dt(["stat-big-number",{"is-date":v.value.length>6}])},N(v.value),3),v.unit?($(),ee("span",U1,N(v.unit),1)):Bt("",!0)])]))),128))]),f[6]||(f[6]=d("div",{class:"glance-row-divider"},null,-1)),d("div",O1,[d("div",F1,[d("span",B1,N(t.value.bottomStats.bank.label),1),d("div",k1,[f[2]||(f[2]=d("div",{class:"stat-graphic-icon"},[d("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.2","stroke-linecap":"round","stroke-linejoin":"round"},[d("rect",{x:"2",y:"5",width:"20",height:"14",rx:"2"}),d("line",{x1:"2",y1:"10",x2:"22",y2:"10"})])],-1)),d("div",H1,[d("span",G1,N(t.value.bottomStats.bank.value),1)])])]),d("div",V1,[d("div",z1,[d("span",W1,N(t.value.bottomStats.globalNetwork.label),1),d("div",$1,[d("span",X1,N(t.value.bottomStats.globalNetwork.value),1),d("span",q1,N(t.value.bottomStats.globalNetwork.unit),1)])]),d("div",Y1,[($(!0),ee(Le,null,Ke(t.value.bottomStats.globalNetwork.subMetrics,(v,b)=>($(),ee("div",{key:b,class:"network-sub-item"},[d("div",K1,[v.icon==="location"?($(),ee("svg",Z1,[...f[3]||(f[3]=[d("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"},null,-1),d("circle",{cx:"12",cy:"10",r:"3"},null,-1)])])):v.icon==="building"?($(),ee("svg",J1,[...f[4]||(f[4]=[d("rect",{x:"4",y:"2",width:"16",height:"20",rx:"2",ry:"2"},null,-1),d("line",{x1:"9",y1:"6",x2:"9",y2:"6.01"},null,-1),d("line",{x1:"15",y1:"6",x2:"15",y2:"6.01"},null,-1),d("line",{x1:"9",y1:"10",x2:"9",y2:"10.01"},null,-1),d("line",{x1:"15",y1:"10",x2:"15",y2:"10.01"},null,-1),d("line",{x1:"9",y1:"14",x2:"9",y2:"14.01"},null,-1),d("line",{x1:"15",y1:"14",x2:"15",y2:"14.01"},null,-1),d("line",{x1:"9",y1:"18",x2:"15",y2:"18"},null,-1)])])):($(),ee("svg",Q1,[...f[5]||(f[5]=[d("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"},null,-1),d("circle",{cx:"9",cy:"7",r:"4"},null,-1),d("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"},null,-1),d("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"},null,-1)])]))]),d("span",j1,N(v.label),1),d("div",eA,[d("span",tA,N(v.value),1),d("span",nA,N(v.unit),1)])]))),128))])])])])]),d("div",iA,[d("p",sA,N(t.value.footnote),1)])],2)])],2)]),default:Ve(()=>[d("div",rA,[d("div",aA,[($(!0),ee(Le,null,Ke(s.value,(v,b)=>($(),ee("section",{key:b,class:"company-business-feature-row"},[d("div",oA,[Xe(p,{to:v.mainLink,class:"biz-thumb-link"},{default:Ve(()=>[d("img",{src:v.image,alt:v.title,class:"biz-thumb-img"},null,8,lA)]),_:2},1032,["to"])]),d("div",cA,[d("h2",uA,[Xe(p,{to:v.mainLink,class:"biz-title-link"},{default:Ve(()=>[ht(N(v.title),1)]),_:2},1032,["to"])]),d("p",dA,N(v.leadText),1),d("p",fA,N(v.subText),1)])]))),128))])])]),_:1},8,["category-title","category-en","category-url","page-title"])}}},pA=hn(hA,[["__scopeId","data-v-92a309ac"]]),mA="/images/card/main-card-1.png",gA={class:"greeting-page-container"},_A={class:"greeting-main-section"},vA={class:"greeting-profile-col"},xA={class:"profile-card"},yA={class:"profile-photo-box"},SA=["alt"],bA={class:"profile-info-box"},MA={class:"profile-role-label"},EA={class:"profile-name-text"},TA={class:"greeting-content-col"},AA={class:"greeting-paragraphs-wrapper"},wA={class:"greeting-sign-block"},CA={class:"sign-date"},RA={class:"sign-name-wrap"},PA={class:"sign-role"},IA={class:"sign-name"},LA={__name:"Greeting",setup(n){const e=st(()=>Fe.value==="ja"?[{name:"ご挨拶",url:"/greeting"},{name:"企業理念",url:"/overview"}]:Fe.value==="en"?[{name:"CEO Message",url:"/greeting"},{name:"Corporate Philosophy",url:"/overview"}]:[{name:"인사말",url:"/greeting"},{name:"경영이념",url:"/overview"}]),t={ko:{categoryTitle:"회사정보",categoryEn:"COMPANY INFO",categoryUrl:"/information",pageTitle:"인사말",desc:"신뢰와 혁신을 바탕으로 고객과 함께 더 넓은 미래로 나아갑니다.",leadHeadline:"변화와 혁신의 글로벌 무대에서, 변함없는 신뢰로 보답하겠습니다.",leadSub:"AZAMINO는 국경을 넘어 사람과 비즈니스를 연결하며 지속 가능한 가치를 창출합니다.",ceoTitle:"AZAMINO",ceoName:"임직원 일동",signDate:"2024년 AZAMINO Inc.",paragraphs:["안녕하십니까. AZAMINO 홈페이지를 찾아주신 고객 여러분과 파트너 여러분께 진심으로 감사의 말씀을 드립니다.","오늘날 세계 경제는 급격한 기술의 발전과 시장 환경의 다변화 속에서 끊임없는 변화와 도전을 마주하고 있습니다. 이러한 흐름 속에서 AZAMINO는 탄탄한 글로벌 네트워크와 무역 전문성을 바탕으로 다양한 산업 분야에서 최적의 가치를 제공해 왔습니다.","우리는 단순한 거래를 넘어, 고객과 사회가 공감할 수 있는 지속 가능한 솔루션을 만들어가고자 합니다. 정직과 신뢰를 가장 중요한 나침반으로 삼고, 모든 이해관계자와 함께 성장하는 상생의 경영을 실천하겠습니다.","앞으로도 혁신적인 비즈니스 모델 구축과 적극적인 글로벌 시장 개척을 통해 더 큰 신뢰와 감동을 드리는 기업으로 거듭나겠습니다. 여러분의 변함없는 관심과 성원을 부탁드립니다."]},ja:{categoryTitle:"企業情報",categoryEn:"COMPANY INFO",categoryUrl:"/information",pageTitle:"ご挨拶",desc:"信頼と革新を胸に、お客様と共に豊かな未来を切り拓きます。",leadHeadline:"変革のグローバルステージにおいて、揺るぎない信頼でお応えします。",leadSub:"AZAMINOは国境を越えて人とビジネスをつなぎ、持続可能な価値を共創してまいります。",ceoTitle:"AZAMINO",ceoName:"AZAMINO社員一同",signDate:"2024年 AZAMINO Inc.",paragraphs:["平素は格別のご高配を賜り、厚く御礼申し上げます。AZAMINOのウェブサイトをご覧いただき、誠にありがとうございます。","現代のグローバル経済は、技術革新や市場の変化が目まぐるしく進む中、絶え間ない変革の時代を迎えております。そうした環境下において、弊社は確かな国際ネットワークと専門的ノウハウを結集し、多様な産業分野でお客様のニーズに応える価値を提供してまいりました。","私たちは単なる商取引にとどまらず、社会と共鳴し持続可能な発展を支えるパートナーでありたいと願っております。誠実と信頼を経営の基盤とし、すべてのステークホルダーの皆様と共に成長を遂げる所存です。","今後とも挑戦する姿勢を忘れることなく、より高度なサービスと革新的なビジネスモデルの創出に努めてまいります。引き続き皆様の温かいご支援を賜りますようお願い申し上げます。"]},en:{categoryTitle:"Company Info",categoryEn:"COMPANY INFO",categoryUrl:"/information",pageTitle:"CEO Message",desc:"Pioneering a sustainable global future through trust and innovation.",leadHeadline:"Delivering uncompromised trust on the dynamic global stage.",leadSub:"AZAMINO connects people, industries, and borders to co-create sustainable value.",ceoTitle:"AZAMINO",ceoName:"All Employees and executives",signDate:"2024 AZAMINO Inc.",paragraphs:["Welcome to the official website of AZAMINO Inc. We extend our deepest gratitude to our valued clients, partners, and stakeholders across the globe.","In an increasingly connected yet rapidly transforming world economy, businesses must demonstrate agility, integrity, and forward-looking vision. AZAMINO has consistently met these demands by providing top-tier solutions leveraging our global trade network and comprehensive expertise.","Beyond traditional business transactions, we aspire to build lasting partnerships that generate tangible value for both industry and society. Integrity and reliability remain the bedrock of our corporate philosophy as we pursue shared prosperity.","We remain steadfast in our commitment to continuous innovation, seeking out new frontiers and delivering exceptional experiences. Thank you for your continued trust and partnership."]}},i=st(()=>t[Fe.value]||t.ja);return(s,r)=>($(),It(an,{"category-title":i.value.categoryTitle,"category-en":i.value.categoryEn,"category-url":i.value.categoryUrl,"page-title":i.value.pageTitle,"page-description":i.value.desc,"hero-image":"/images/main/slide-main-tokyo.jpg",tabs:e.value},{default:Ve(()=>[d("div",gA,[d("section",_A,[d("div",vA,[d("div",xA,[d("div",yA,[d("img",{src:mA,alt:i.value.ceoTitle,class:"profile-photo-img"},null,8,SA)]),d("div",bA,[d("span",MA,N(i.value.ceoTitle),1),d("h3",EA,N(i.value.ceoName),1)])])]),d("div",TA,[d("div",AA,[($(!0),ee(Le,null,Ke(i.value.paragraphs,(a,o)=>($(),ee("p",{key:o,class:"greeting-para-item"},N(a),1))),128))]),d("div",wA,[d("p",CA,N(i.value.signDate),1),d("p",RA,[d("span",PA,N(i.value.ceoTitle),1),d("strong",IA,N(i.value.ceoName),1)])])])])])]),_:1},8,["category-title","category-en","category-url","page-title","page-description","tabs"]))}},DA=hn(LA,[["__scopeId","data-v-cd625c13"]]),NA={class:"mitsui-philosophy-page"},UA={class:"philosophy-section mission-section"},OA={class:"section-catchphrase"},FA={class:"section-desc"},BA={class:"philosophy-section vision-section"},kA={class:"section-catchphrase vision-catch"},HA={class:"section-desc"},GA={class:"philosophy-section values-section"},VA={class:"values-subtitle"},zA={class:"values-grid"},WA={class:"value-pictogram"},$A={key:0,viewBox:"0 0 120 120",fill:"none",xmlns:"http://www.w3.org/2000/svg"},XA={key:1,viewBox:"0 0 120 120",fill:"none",xmlns:"http://www.w3.org/2000/svg"},qA={key:2,viewBox:"0 0 120 120",fill:"none",xmlns:"http://www.w3.org/2000/svg"},YA={key:3,viewBox:"0 0 120 120",fill:"none",xmlns:"http://www.w3.org/2000/svg"},KA={class:"value-title"},ZA={class:"value-desc"},JA={class:"profile-section"},QA={class:"profile-title"},jA={class:"profile-table-wrap"},ew={class:"mitsui-style-table"},tw={scope:"row",style:{width:"24%","vertical-align":"top"}},nw={key:0,class:"overview-map-box"},iw={class:"overview-map-embed"},sw=["src"],rw={__name:"Overview",setup(n){const e=st(()=>Fe.value==="ja"?[{name:"ご挨拶",url:"/greeting"},{name:"企業理念",url:"/overview"}]:Fe.value==="en"?[{name:"CEO Message",url:"/greeting"},{name:"Corporate Philosophy",url:"/overview"}]:[{name:"인사말",url:"/greeting"},{name:"경영이념",url:"/overview"}]),t=st(()=>{const i="https://maps.google.com/maps?q=35.633931,139.691578&t=&z=17&ie=UTF8&iwloc=&output=embed";return Fe.value==="ja"?{categoryTitle:"企業情報",categoryEn:"COMPANY INFO",pageTitle:"企業理念",desc:"Mission・Vision・Valuesを通じて、新たな未来価値を共創します。",missionCatch:"世界中の未来をつくる",missionText:"大切な地球と人びとの、豊かで夢あふれる明日を実現します。人と技術、グローバルなネットワークをつなぎ、持続可能な社会の繁栄に貢献します。",visionCatch:"Innovation",visionText:"一人ひとりの「挑戦と創造」で事業を生み育て、社会課題を解決し、成長を続ける企業グループを目指します。",valuesSubtitle:"「挑戦と創造」を支える価値観",valuesList:[{title:"変革を行動で",desc:"私たちは、自ら動き、自ら挑み、常に変化を生む主体であり続けます。"},{title:"多様性を力に",desc:"私たちは、自由闊達な場を築き、互いの力を掛け合わせ最高の成果を生みます。"},{title:"個から成長を",desc:"私たちは、常にプロとして自己を高め続け、個の成長を全体の成長につなげます。"},{title:"真摯に誠実に",desc:"私たちは、高い志とフェアで謙虚な心を持ち、未来に対して誇れる仕事をします。"}],profileTitle:"会社概要",tableRows:[{th:"会社名",td:"AZAMINO株式会社"},{th:"英語社名",td:"AZAMINO Inc."},{th:"設立",td:"2014年1月24日"},{th:"資本金",td:"2億円"},{th:"所在地",td:"〒153-0051 東京都目黒区上目黒1丁目26番1号 中目黒アトラスタワー"},{th:"アクセス地図",isMap:!0,mapEmbedUrl:i}]}:Fe.value==="en"?{categoryTitle:"Company",categoryEn:"COMPANY INFO",pageTitle:"Corporate Philosophy",desc:"Creating sustainable value through our Mission, Vision, and Values.",missionCatch:"Build a brighter future for the world",missionText:"Connecting people, technology, and global networks to create sustainable solutions and enrich people's lives worldwide.",visionCatch:"Innovation",visionText:"A corporate group continuously generating and nurturing businesses through challenge and innovation to resolve global social issues.",valuesSubtitle:"Four Core Values supporting Challenge and Creation",valuesList:[{title:"Action-driven Transformation",desc:"We take the initiative, embrace challenges, and constantly generate positive change."},{title:"Power in Diversity",desc:"We foster an open and dynamic environment, combining diverse strengths for optimal impact."},{title:"Growth through Individuality",desc:"We pursue professional excellence, turning individual growth into shared organizational success."},{title:"Integrity and Trust",desc:"We maintain high ethical standards with fairness and humility, taking pride in our contributions."}],profileTitle:"Company Profile",tableRows:[{th:"Company Name",td:"AZAMINO Inc."},{th:"Established",td:"January 24, 2014"},{th:"Capital",td:"200 Million JPY"},{th:"Head Office",td:"Nakameguro Atlas Tower, 1-26-1 Kamimeguro, Meguro-ku, Tokyo, Japan"},{th:"Access Map",isMap:!0,mapEmbedUrl:i}]}:{categoryTitle:"회사정보",categoryEn:"COMPANY INFO",pageTitle:"경영이념",desc:"사람과 기술, 글로벌 네트워크를 연결하여 새로운 미래 가치를 창출합니다.",missionCatch:"세계와 사람을 연결하는 지속 가능한 미래 가치 창출",missionText:"소중한 사람들과 지속 가능한 내일을 위해, 글로벌 네트워크와 신뢰를 바탕으로 꿈과 희망이 넘치는 풍요로운 사회를 실현합니다.",visionCatch:"Innovation",visionText:"임직원 한 사람 한 사람의 '도전과 창조'로 새로운 사업을 육성하고, 사회적 과제를 선도적으로 해결하며 지속적인 성장을 이어가는 글로벌 비즈니스 파트너.",valuesSubtitle:"「도전과 창조」를 뒷받침하는 4대 기본 정신",valuesList:[{title:"변혁을 행동으로",desc:"우리는 스스로 움직이고, 스스로 도전하여 현실에 안주하지 않고 끊임없이 새로운 변화를 만드는 주체로 존재합니다."},{title:"다양성을 힘으로",desc:"자유롭고 열린 소통의 장을 조성하고, 다양한 개성과 역량을 상호 융합하여 최고의 시너지와 결실을 창출합니다."},{title:"개개인의 성장을 함께",desc:"항상 프로페셔널로서 자기 발전에 힘쓰며, 개인의 성장을 조직과 사회 전체의 동반 성장으로 승화시킵니다."},{title:"진실과 신뢰로",desc:"높은 윤리 의식과 공정하고 겸허한 태도로 미래와 고객 앞에 떳떳하고 신뢰받을 수 있는 비즈니스를 수행합니다."}],profileTitle:"회사개요",tableRows:[{th:"회사명",td:"아자미노 주식회사"},{th:"대표자",td:"대표이사"},{th:"설립일",td:"2014년 1월 24일"},{th:"자본금",td:"2억 엔"},{th:"본사 소재지",td:"도쿄도 메구로구 카미메구로 1-26-1 나카메구로 아틀라스 타워"},{th:"위치 안내",isMap:!0,mapEmbedUrl:i}]}});return(i,s)=>($(),It(an,{"category-title":t.value.categoryTitle,"category-en":t.value.categoryEn,"category-url":"/information","page-description":t.value.desc,"page-title":t.value.pageTitle,"hero-image":"/images/company/business-innovation.jpg",tabs:e.value},{default:Ve(()=>[d("div",NA,[d("section",UA,[s[0]||(s[0]=d("span",{class:"section-label-en"},"Mission",-1)),s[1]||(s[1]=d("div",{class:"section-bar"},null,-1)),d("h2",OA,N(t.value.missionCatch),1),d("p",FA,N(t.value.missionText),1)]),d("section",BA,[s[2]||(s[2]=d("span",{class:"section-label-en"},"Vision",-1)),s[3]||(s[3]=d("div",{class:"section-bar"},null,-1)),d("h2",kA,N(t.value.visionCatch),1),d("p",HA,N(t.value.visionText),1)]),d("section",GA,[s[8]||(s[8]=d("span",{class:"section-label-en values-label"},"Values",-1)),s[9]||(s[9]=d("div",{class:"section-bar"},null,-1)),d("p",VA,N(t.value.valuesSubtitle),1),d("div",zA,[($(!0),ee(Le,null,Ke(t.value.valuesList,(r,a)=>($(),ee("div",{key:a,class:"value-item"},[d("div",WA,[a===0?($(),ee("svg",$A,[...s[4]||(s[4]=[d("circle",{cx:"60",cy:"20",r:"10",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"60",y1:"30",x2:"60",y2:"65",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"60",y1:"42",x2:"38",y2:"55",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"60",y1:"42",x2:"82",y2:"35",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"60",y1:"65",x2:"42",y2:"90",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"60",y1:"65",x2:"78",y2:"90",stroke:"#333","stroke-width":"2.5"},null,-1),d("path",{d:"M82 35 L95 25 L100 30",stroke:"#333","stroke-width":"2","stroke-linecap":"round"},null,-1),d("polygon",{points:"98,22 100,30 92,28",fill:"#333"},null,-1),d("path",{d:"M20 95 C30 60, 50 85, 60 50 C70 35, 90 40, 105 30",stroke:"#333","stroke-width":"1.5","stroke-dasharray":"4 3",fill:"none"},null,-1)])])):a===1?($(),ee("svg",XA,[...s[5]||(s[5]=[d("circle",{cx:"35",cy:"35",r:"9",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"35",y1:"44",x2:"35",y2:"72",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"35",y1:"54",x2:"20",y2:"64",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"35",y1:"54",x2:"50",y2:"64",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"35",y1:"72",x2:"25",y2:"95",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"35",y1:"72",x2:"45",y2:"95",stroke:"#333","stroke-width":"2.5"},null,-1),d("circle",{cx:"85",cy:"35",r:"9",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"85",y1:"44",x2:"85",y2:"72",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"85",y1:"54",x2:"70",y2:"64",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"85",y1:"54",x2:"100",y2:"64",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"85",y1:"72",x2:"75",y2:"95",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"85",y1:"72",x2:"95",y2:"95",stroke:"#333","stroke-width":"2.5"},null,-1),d("circle",{cx:"60",cy:"22",r:"9",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"60",y1:"31",x2:"60",y2:"59",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"60",y1:"41",x2:"45",y2:"51",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"60",y1:"41",x2:"75",y2:"51",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"60",y1:"59",x2:"50",y2:"82",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"60",y1:"59",x2:"70",y2:"82",stroke:"#333","stroke-width":"2.5"},null,-1),d("path",{d:"M42 100 L60 90 L78 100",stroke:"#333","stroke-width":"1.5","stroke-dasharray":"3 3",fill:"none"},null,-1)])])):a===2?($(),ee("svg",qA,[...s[6]||(s[6]=[d("rect",{x:"15",y:"80",width:"25",height:"15",stroke:"#333","stroke-width":"2",fill:"none"},null,-1),d("rect",{x:"40",y:"65",width:"25",height:"30",stroke:"#333","stroke-width":"2",fill:"none"},null,-1),d("rect",{x:"65",y:"50",width:"25",height:"45",stroke:"#333","stroke-width":"2",fill:"none"},null,-1),d("circle",{cx:"50",cy:"22",r:"8",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"50",y1:"30",x2:"50",y2:"52",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"50",y1:"38",x2:"37",y2:"48",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"50",y1:"38",x2:"63",y2:"30",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"50",y1:"52",x2:"40",y2:"68",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"50",y1:"52",x2:"60",y2:"68",stroke:"#333","stroke-width":"2.5"},null,-1),d("path",{d:"M70 42 L80 32 L85 37",stroke:"#333","stroke-width":"2","stroke-linecap":"round"},null,-1),d("polygon",{points:"83,29 85,37 77,35",fill:"#333"},null,-1),d("path",{d:"M95 50 L105 35",stroke:"#333","stroke-width":"1.5","stroke-dasharray":"3 3"},null,-1),d("text",{x:"96",y:"32","font-size":"14",fill:"#333","font-weight":"600"},"↑",-1)])])):($(),ee("svg",YA,[...s[7]||(s[7]=[d("circle",{cx:"35",cy:"28",r:"9",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"35",y1:"37",x2:"35",y2:"65",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"35",y1:"65",x2:"25",y2:"90",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"35",y1:"65",x2:"45",y2:"90",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"35",y1:"47",x2:"20",y2:"57",stroke:"#333","stroke-width":"2.5"},null,-1),d("circle",{cx:"85",cy:"28",r:"9",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"85",y1:"37",x2:"85",y2:"65",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"85",y1:"65",x2:"75",y2:"90",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"85",y1:"65",x2:"95",y2:"90",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"85",y1:"47",x2:"100",y2:"57",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"35",y1:"47",x2:"55",y2:"52",stroke:"#333","stroke-width":"2.5"},null,-1),d("line",{x1:"85",y1:"47",x2:"65",y2:"52",stroke:"#333","stroke-width":"2.5"},null,-1),d("ellipse",{cx:"60",cy:"52",rx:"8",ry:"5",stroke:"#333","stroke-width":"2",fill:"none"},null,-1),d("path",{d:"M45 98 C50 94, 55 94, 60 98 C65 94, 70 94, 75 98",stroke:"#333","stroke-width":"1.5",fill:"none"},null,-1)])]))]),d("h3",KA,N(r.title),1),d("p",ZA,N(r.desc),1)]))),128))])]),s[10]||(s[10]=d("div",{class:"philosophy-divider"},null,-1)),d("section",JA,[d("h3",QA,N(t.value.profileTitle),1),d("div",jA,[d("table",ew,[d("tbody",null,[($(!0),ee(Le,null,Ke(t.value.tableRows,r=>($(),ee("tr",{key:r.th},[d("th",tw,N(r.th),1),d("td",null,[r.isMap?($(),ee("div",nw,[d("div",iw,[d("iframe",{src:r.mapEmbedUrl,width:"100%",height:"360",style:{border:"0",display:"block"},allowfullscreen:"",loading:"lazy",referrerpolicy:"no-referrer-when-downgrade",title:"Google Map"},null,8,sw)])])):($(),ee(Le,{key:1},[ht(N(r.td),1)],64))])]))),128))])])])])])]),_:1},8,["category-title","category-en","page-description","page-title","tabs"]))}},aw=hn(rw,[["__scopeId","data-v-f9a4f613"]]),ow={__name:"Ci",setup(n){const e=st(()=>Fe.value==="ja"?[{name:"ご挨拶",url:"/greeting"},{name:"企業理念",url:"/overview"},{name:"CI紹介",url:"/ci"}]:Fe.value==="en"?[{name:"CEO Message",url:"/greeting"},{name:"Corporate Philosophy",url:"/overview"},{name:"CI Introduction",url:"/ci"}]:[{name:"인사말",url:"/greeting"},{name:"경영이념",url:"/overview"},{name:"CI 소개",url:"/ci"}]);return(t,i)=>($(),It(an,{"category-title":"회사정보","category-en":"COMPANY INFO","category-url":"/information","page-title":"CI","page-description":"기업의 철학과 미래 비전을 시각적으로 형상화한 브랜드 아이덴티티입니다.","hero-image":"/images/tokyo-tower-bg.jpg",tabs:e.value},{default:Ve(()=>[...i[0]||(i[0]=[d("div",{class:"ci-page"},[d("div",{class:"sub-headline-box"},[d("span",{class:"sub-badge"},"CORPORATE IDENTITY"),d("h2",{class:"sub-main-title"},"CI 스토리 및 컨셉"),d("div",{class:"sub-title-bar"}),d("p",{class:"section-intro"}," AZAMINO의 CI는 신뢰와 혁신을 바탕으로 글로벌 무대를 향해 무한히 뻗어나가는 비즈니스의 활력과 견고한 기업가 정신을 상징합니다. ")]),d("div",{class:"ci-logo-display-card"},[d("div",{class:"ci-logo-preview"},[d("img",{src:Oc,alt:"AZAMINO CI Logo",class:"ci-preview-img"})]),d("div",{class:"ci-logo-explanation"},[d("h3",{class:"ci-concept-title"},"Symbol & Wordmark Concept"),d("p",{class:"ci-concept-text"}," 심볼은 신뢰를 상징하는 정방형 프레임과 유연한 비즈니스 밸류체인을 형상화하여, 고객과 사회에 변함없는 가치를 전달하고자 하는 확고한 의지를 담았습니다. 정제된 서체의 워드마크는 글로벌 스탠다드에 부합하는 전문성과 품격을 나타냅니다. ")])]),d("section",{class:"section-block"},[d("h3",{class:"section-sub-title"},"Brand Color System"),d("p",{class:"section-sub-desc"}," CI의 시각적 일관성과 신뢰감을 형성하는 핵심 컬러 팔레트 규정입니다. "),d("div",{class:"color-palette-grid"},[d("div",{class:"color-chip-card"},[d("div",{class:"color-chip",style:{"background-color":"#0b2545"}}),d("div",{class:"color-details"},[d("span",{class:"color-role"},"Main Primary Color"),d("strong",{class:"color-name"},"Mitsui Deep Navy"),d("div",{class:"color-codes"},[d("span",null,"HEX: #0B2545"),d("span",null,"RGB: 11, 37, 69")]),d("p",{class:"color-desc"},"깊은 신뢰와 안정성, 글로벌 비즈니스의 전문성을 상징합니다.")])]),d("div",{class:"color-chip-card"},[d("div",{class:"color-chip",style:{"background-color":"#134074"}}),d("div",{class:"color-details"},[d("span",{class:"color-role"},"Secondary Color"),d("strong",{class:"color-name"},"Ocean Blue"),d("div",{class:"color-codes"},[d("span",null,"HEX: #134074"),d("span",null,"RGB: 19, 64, 116")]),d("p",{class:"color-desc"},"대양을 건너는 활발한 무역과 역동적인 혁신 에너지를 표현합니다.")])]),d("div",{class:"color-chip-card"},[d("div",{class:"color-chip",style:{"background-color":"#c7b3cd"}}),d("div",{class:"color-details"},[d("span",{class:"color-role"},"Accent Color"),d("strong",{class:"color-name"},"Soft Lilac Accent"),d("div",{class:"color-codes"},[d("span",null,"HEX: #C7B3CD"),d("span",null,"RGB: 199, 179, 205")]),d("p",{class:"color-desc"},"고객을 향한 따뜻한 케어(개호식품, 생활소비재)와 감성을 나타냅니다.")])])])]),d("section",{class:"section-block"},[d("h3",{class:"section-sub-title"},"Logo Usage Guidelines"),d("div",{class:"ci-guideline-box"},[d("ul",{class:"ci-rules-list"},[d("li",null,[d("strong",null,"여백 규정 (Clear Space):"),ht(" 로고의 시인성과 독립성을 보장하기 위해 주변의 다른 요소나 문자로부터 최소 지정 여백을 유지해야 합니다. ")]),d("li",null,[d("strong",null,"비율 유지 (Aspect Ratio):"),ht(" 로고는 어떤 경우에도 임의로 비율을 왜곡하거나 변형하여 사용할 수 없습니다. ")]),d("li",null,[d("strong",null,"색상 변형 금지:"),ht(" 규정된 브랜드 전용 색상 이외의 임의의 그라데이션, 그림자 효과, 색상 반전 사용을 지양합니다. ")])])])])],-1)])]),_:1},8,["tabs"]))}},lw={class:"service-mitsui-page"},cw={class:"service-intro-section"},uw={class:"service-lead-title"},dw={class:"service-lead-desc"},fw={class:"service-sections-list"},hw=["id"],pw={class:"biz-division-text-col"},mw={class:"biz-division-num"},gw={class:"biz-division-tag"},_w={class:"biz-division-title"},vw={class:"biz-division-subtitle"},xw={class:"biz-division-lead"},yw={class:"biz-division-body"},Sw={class:"biz-feature-chips"},bw={class:"biz-detail-link-wrap"},Mw={class:"biz-division-media-col"},Ew={class:"biz-video-container"},Tw=["src","title"],Aw={class:"biz-video-caption"},ww={__name:"ServiceIndex",setup(n){const e={ko:{categoryTitle:"사업소개",categoryEn:"BUSINESS DIVISIONS",categoryUrl:"/service",pageTitle:"사업소개",leadTitle:"다각화된 글로벌 무역으로 새로운 가치를 창출합니다.",introText:"아자미노(AZAMINO)는 고령화 사회의 삶의 질을 높이는 선진 개호식품부터 자산을 지키는 최고 등급의 특수 방재 금고, 일상의 품격을 높이는 고품질 생활소비재와 첨단 미래 산업을 지탱하는 고기능성 화학제품에 이르기까지 다각화된 글로벌 무역 및 유통 솔루션을 제공합니다.",viewDetailText:"사업 상세정보 보기",tabs:[{name:"사업소개 전체",url:"/service"},{name:"개호식품",url:"/food"},{name:"금고",url:"/money"},{name:"생활용품",url:"/product"},{name:"화학제품",url:"/chemical"}],divisions:[{id:"food",categoryTag:"WELLNESS & NUTRITION",title:"개호식품 솔루션",enTitle:"Care Food Solutions",lead:"씹고 삼키는 기쁨을 지키며, 고령화 사회의 영양과 존엄을 지원하는 맞춤형 케어푸드.",paragraphs:["초고령 사회에 진입한 대한민국에 일본의 40년 축적된 시니어 케어푸드 기술과 노하우를 바탕으로, 저작 및 연하(삼킴) 기능이 저하된 어르신들이 식사의 즐거움을 잃지 않도록 과학적인 영양식을 공급합니다.","일본개호식품협의회(UDF) 규격을 엄격히 충족하는 1~4구분 식품과 연하곤란자용 특수 점도조절제(토로미)를 엄선하여 국내 주요 대학병원, 전문 요양원 및 실버타운에 콜드체인 시스템으로 안전하게 배송합니다."],chips:["UDF 인증 식품","연하곤란 영양식","맞춤형 점도조절제","철저한 콜드체인 물류"],link:"/food",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQs",videoCaption:"AZAMINO 개호식품 솔루션 소개 영상"},{id:"money",categoryTag:"SECURITY & ASSET PROTECTION",title:"특수 방재·방범 금고",enTitle:"Safes & Security Systems",lead:"일본 최고의 내화·방도 기술력이 집약된 최고 수준의 보안 금고 시스템.",paragraphs:["예기치 못한 화재나 재난, 도난 위협으로부터 기업의 기밀 문서와 개인의 소중한 귀중품을 완벽하게 보호하는 일본 선진 보안 금고를 수입·유통합니다.","JIS(일본산업규격) 초고온 내화 시험을 완벽 통과하고 전기충격·유압 파쇄 방지 특수 합금 설계가 적용된 고성능 금고 라인업을 금융기관, 관공서 및 프리미엄 주거 공간에 최적 맞춤형으로 제안합니다."],chips:["JIS 내화 인증","특수 방도 합금","생체인식 스마트 락","금융기관 납품 실적"],link:"/money",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQs",videoCaption:"AZAMINO 고성능 내화 보안 금고 시연 영상"},{id:"product",categoryTag:"LIFESTYLE & LIVING GOODS",title:"프리미엄 생활용품",enTitle:"Premium Living Goods",lead:"일상의 편리함과 위생, 삶의 만족도를 높이는 혁신적인 생활소비재 유통.",paragraphs:["일본의 실용적인 디자인 철학과 장인정신이 깃든 친환경 생활소비재 및 프리미엄 홈 케어 아이템을 엄선하여 아시아 전역에 공급합니다.","주방 및 위생 용품, 스마트 정리 시스템, 기능성 바스 용품 등 일상 속 작은 불편을 해소하고 현대인의 웰빙 라이프스타일을 완성하는 차별화된 제품군을 온·오프라인 메이저 유통망을 통해 선보입니다."],chips:["친환경 프리미엄 소재","일본 실용주의 디자인","위생·항균 특화","온·오프라인 글로벌 유통"],link:"/product",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQs",videoCaption:"AZAMINO 프리미엄 리빙 아이템 브랜드 영상"},{id:"chemical",categoryTag:"ADVANCED CHEMICALS",title:"첨단 산업 화학제품",enTitle:"Advanced Industrial Chemicals",lead:"기초 원료부터 첨단 정밀화학, 친환경 바이오 플라스틱까지 아우르는 글로벌 서플라이 체인.",paragraphs:["자동차, 디스플레이, 반도체 및 2차전지 등 첨단 제조 산업의 기반이 되는 고순도 기초 화학 원료와 기능성 정밀화학 수지를 전 세계 공급망을 통해 적기에 안정적으로 공급합니다.","특히 탄소중립 시대를 선도하기 위해 재생 가능 바이오 플라스틱, 생분해성 폴리머 등 친환경 소재 포트폴리오를 지속적으로 확대하여 고객사의 지속 가능한 ESG 경영을 적극 뒷받침하고 있습니다."],chips:["고순도 기초화학 원료","친환경 바이오 플라스틱","정밀 화학 수지","원스톱 글로벌 공급망"],link:"/chemical",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQs",videoCaption:"AZAMINO 첨단 화학소재 글로벌 공급망 영상"}]},ja:{categoryTitle:"事業紹介",categoryEn:"BUSINESS DIVISIONS",categoryUrl:"/service",pageTitle:"事業紹介",leadTitle:"多角化されたグローバル貿易で新たな価値を創出します。",introText:"AZAMINOは、高齢化社会の生活の質を高める先進介護食品から、大切な資産を守る最高水準のセキュリティ金庫、日々の暮らしを豊かにする高品質な生活消費財、そして先端産業を支える機能性化学品に至るまで、多角的なグローバル貿易および流通ソリューションを展開しております。",viewDetailText:"事業詳細を見る",tabs:[{name:"事業紹介 全体",url:"/service"},{name:"介護食品",url:"/food"},{name:"金庫",url:"/money"},{name:"生活用品",url:"/product"},{name:"化学品",url:"/chemical"}],divisions:[{id:"food",categoryTag:"WELLNESS & NUTRITION",title:"介護食品ソリューション",enTitle:"Care Food Solutions",lead:"噛む・飲み込む喜びを守り、高齢化社会の栄養と尊厳を支えるテイラーメイド・ケアフード。",paragraphs:["超高齢社会を迎えた市場において、日本の40年にわたり培われたシニアケアフードの技術とノウハウを活かし、咀嚼・嚥下機能が低下された方々が食事の喜びを維持できるよう科学的な栄養食を提供しております。","日本介護食品協議会（UDF）の規格を満たす区分1～4の食品および嚥下困難者用とろみ調整食品を厳選し、主要医療機関や福祉施設へ徹底したコールドチェーン体制でお届けします。"],chips:["UDF認証取得","嚥下サポート栄養食","とろみ調整食品","厳格なコールドチェーン"],link:"/food",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQs",videoCaption:"AZAMINO 介護食品ソリューション紹介映像"},{id:"money",categoryTag:"SECURITY & ASSET PROTECTION",title:"特殊防災・防犯金庫",enTitle:"Safes & Security Systems",lead:"日本の誇る高度な耐火・防盗技術が集約された最高峰のセキュリティ金庫システム。",paragraphs:["予期せぬ火災や自然災害、盗難の脅威から企業の重要機密文書や個人の貴重品を堅牢に守る先進セキュリティ金庫を供給しております。","JIS（日本産業規格）の耐火試験に合格した超高性能耐火構造と、特殊破砕防止合金技術を採用した製品ラインアップを、金融機関や官公庁、高級レジデンス向けにご提案いたします。"],chips:["JIS耐火規格クリア","特殊防盗合金設計","スマート生体認証","金融機関導入実績"],link:"/money",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQs",videoCaption:"AZAMINO 高機能セキュリティ金庫実演映像"},{id:"product",categoryTag:"LIFESTYLE & LIVING GOODS",title:"プレミアム生活用品",enTitle:"Premium Living Goods",lead:"日常の利便性と衛生、生活の満足度を高める革新的な生活消費財の流通。",paragraphs:["日本の機能的デザイン思想とクラフトマンシップが息づく環境配慮型の生活消費財およびホームケアアイテムを厳選し、アジア全域へ展開しております。","キッチン・サニタリー用品、整理収納システム、機能性バスアイテムなど、日常の不便を解消し上質なウェルビーイング生活を支える製品群を取り揃えています。"],chips:["環境配慮型素材","日本の実用美デザイン","衛生・抗菌機能","グローバル流通展開"],link:"/product",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQs",videoCaption:"AZAMINO プレミアムリビング ブランド映像"},{id:"chemical",categoryTag:"ADVANCED CHEMICALS",title:"先端産業化学品",enTitle:"Advanced Industrial Chemicals",lead:"基礎原料から精密化学、環境配慮型バイオプラスチックまでをつなぐグローバルサプライチェーン。",paragraphs:["自動車、ディスプレイ、半導体、二次電池などハイテク製造業を根幹から支える高純度基礎化学原料や機能性樹脂を、グローバルネットワークを通じて安定的に供給いたします。","カーボンニュートラル社会の実現に向け、バイオマスプラスチックや生分解性ポリマーなどの環境調和型素材ポートフォリオを拡充し、お客様のESG経営をサポートいたします。"],chips:["高純度基礎化学品","バイオマスプラスチック","機能性高分子樹脂","ワンストップ安定供給"],link:"/chemical",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQs",videoCaption:"AZAMINO 先端化学品サプライチェーン映像"}]},en:{categoryTitle:"Business Divisions",categoryEn:"BUSINESS DIVISIONS",categoryUrl:"/service",pageTitle:"Business Divisions",leadTitle:"Creating lasting global value through diversified trading.",introText:"AZAMINO provides diversified global trading and supply-chain solutions spanning from Japanese specialized senior care food to high-security fireproof safes, premium household consumer goods, and advanced industrial chemicals.",viewDetailText:"View Division Details",tabs:[{name:"All Businesses",url:"/service"},{name:"Care Food",url:"/food"},{name:"Safes & Security",url:"/money"},{name:"Living Goods",url:"/product"},{name:"Chemicals",url:"/chemical"}],divisions:[{id:"food",categoryTag:"WELLNESS & NUTRITION",title:"Care Food Solutions",enTitle:"Senior Care Food",lead:"Supporting nutrition, dignity, and the pure joy of eating for aging societies.",paragraphs:["Leveraging Japan's 40 years of pioneering senior dietary food technology, we distribute scientifically formulated nutrition to preserve mealtime enjoyment for individuals facing chewing and swallowing challenges.","Strictly conforming to Universal Design Food (UDF) grades, our specialized meals and thickening agents are supplied reliably to major hospitals and healthcare residences via cold-chain distribution."],chips:["UDF Certified","Swallowing Support Meals","Thickening Agents","Strict Cold-Chain Logistics"],link:"/food",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQs",videoCaption:"AZAMINO Care Food Solutions Introduction Video"},{id:"money",categoryTag:"SECURITY & ASSET PROTECTION",title:"Safes & Security Systems",enTitle:"High-Security Fireproof Safes",lead:"Engineered with top Japanese burglary-resistant and fireproof technologies.",paragraphs:["We supply advanced protective safes designed to safeguard vital corporate archives, data media, and invaluable personal assets against extreme disasters and forced breaches.","Exceeding JIS high-temperature fire endurance standards and reinforced with anti-drill alloy shielding, our security systems cater to leading financial institutions and luxury residences."],chips:["JIS Fireproof Certified","Reinforced Alloy Shields","Biometric Locks","Institutional Grade"],link:"/money",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQs",videoCaption:"AZAMINO High-Security Safe Demonstration Video"},{id:"product",categoryTag:"LIFESTYLE & LIVING GOODS",title:"Premium Living Goods",enTitle:"Consumer & Home Essentials",lead:"Distributing everyday convenience, hygiene, and design excellence.",paragraphs:["Guided by Japanese minimalist practicality and fine craftsmanship, we curate high-grade eco-friendly lifestyle goods and wellness home essentials across Asian consumer markets.","From antimicrobial kitchen tools to ergonomic storage solutions, our consumer goods eliminate everyday friction and enrich modern lifestyle experiences."],chips:["Eco-Conscious Materials","Functional Design","Antimicrobial Hygiene","Global Consumer Distribution"],link:"/product",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQs",videoCaption:"AZAMINO Premium Living Brand Showcase"},{id:"chemical",categoryTag:"ADVANCED CHEMICALS",title:"Advanced Industrial Chemicals",enTitle:"Fine Chemicals & Bioplastics",lead:"Powering high-tech industries with resilient global supply chains.",paragraphs:["We deliver high-purity petrochemical feedstocks, engineering plastics, and fine chemical resins essential for automotive, semiconductor, display, and EV battery manufacturing.","In alignment with carbon-neutral initiatives, we actively expand our lineup of bio-based plastics and biodegradable polymers to empower client ESG sustainability goals."],chips:["High-Purity Raw Materials","Renewable Bioplastics","Engineering Resins","Resilient Supply Chain"],link:"/chemical",videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQs",videoCaption:"AZAMINO Advanced Chemicals Global Network Video"}]}},t=st(()=>e[Fe.value]||e.ja);return(i,s)=>{const r=rn("router-link");return $(),It(an,{"category-title":t.value.categoryTitle,"category-en":t.value.categoryEn,"category-url":t.value.categoryUrl,"page-title":t.value.pageTitle,"hero-image":"/images/main/slide-main-tokyo.jpg",tabs:t.value.tabs},{default:Ve(()=>[d("div",lw,[d("section",cw,[d("h2",uw,N(t.value.leadTitle),1),d("p",dw,N(t.value.introText),1)]),d("div",fw,[($(!0),ee(Le,null,Ke(t.value.divisions,(a,o)=>($(),ee("article",{key:a.id,id:a.id,class:Dt(["biz-division-row",{"reverse-layout":o%2===1}])},[d("div",pw,[d("span",mw,"0"+N(o+1),1),d("span",gw,N(a.categoryTag),1),d("h3",_w,N(a.title),1),d("p",vw,N(a.enTitle),1),d("p",xw,N(a.lead),1),d("div",yw,[($(!0),ee(Le,null,Ke(a.paragraphs,(l,c)=>($(),ee("p",{key:c},N(l),1))),128))]),d("ul",Sw,[($(!0),ee(Le,null,Ke(a.chips,(l,c)=>($(),ee("li",{key:c},N(l),1))),128))]),d("div",bw,[Xe(r,{to:a.link,class:"biz-detail-btn"},{default:Ve(()=>[d("span",null,N(t.value.viewDetailText),1),s[0]||(s[0]=d("span",{class:"btn-arrow"},"→",-1))]),_:1},8,["to"])])]),d("div",Mw,[d("div",Ew,[d("iframe",{src:a.videoUrl,title:a.title+" 비즈니스 영상",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:"",class:"biz-video-iframe",loading:"lazy"},null,8,Tw)]),d("p",Aw,N(a.videoCaption),1)])],10,hw))),128))])])]),_:1},8,["category-title","category-en","category-url","page-title","tabs"])}}},Cw=hn(ww,[["__scopeId","data-v-ce2a3476"]]),Rw="/images/main/slide-main-healthyfood.jpg",Pw={class:"business-detail-page"},Iw={class:"business-intro-card"},Lw={class:"intro-visual"},Dw=["alt"],Nw={class:"intro-content"},Uw={class:"sub-badge"},Ow=["innerHTML"],Fw={class:"intro-desc"},Bw={class:"section-block"},kw={class:"section-sub-title"},Hw={class:"biz-strengths-grid"},Gw={class:"strength-num"},Vw={class:"section-block"},zw={class:"section-sub-title"},Ww={class:"product-lineup-grid"},$w={class:"lineup-header"},Xw={class:"lineup-tag"},qw={class:"lineup-desc"},Yw={class:"lineup-tags"},Kw={class:"biz-cta-box"},Zw={class:"cta-text"},Jw={__name:"Food",setup(n){const e={ko:{banner:{categoryTitle:"사업소개",categoryEn:"BUSINESS DIVISIONS",pageTitle:"개호식품",pageDescription:"일본의 검증된 고령친화 개호식품을 통해 존엄하고 건강한 식생활을 제안합니다."},tabs:[{name:"사업소개 전체",url:"/service"},{name:"개호식품",url:"/food"},{name:"금고",url:"/money"},{name:"생활용품",url:"/product"},{name:"화학제품",url:"/chemical"}],intro:{badge:"CARE FOOD SOLUTION",title:"맛과 영양, 씹는 즐거움을 지키는<br /><strong>맞춤형 개호식품</strong> 솔루션",desc:"초고령 사회로 진입한 대한민국에 일본의 40년 축적된 시니어 케어푸드 기술을 도입합니다. 저작 및 연하(삼킴) 기능이 저하된 어르신들이 식사의 기쁨을 유지할 수 있도록 과학적인 개호식품을 공급하고 있습니다."},strengthsTitle:"핵심 역량 및 강점",strengths:[{num:"01",title:"UDF 인증 엄선 공급",desc:"일본개호식품협의회의 엄격한 규격(UDF 1~4구분)을 충족하는 검증된 제품만을 엄선 수입합니다."},{num:"02",title:"콜드체인 안심 물류",desc:"신선도와 영양소 보존을 위해 수입 통관부터 병원/시설 배송까지 전 과정 철저한 온도 제어 시스템을 운영합니다."},{num:"03",title:"전문 영양 설계 지원",desc:"임상 영양사와 협력하여 요양병원, 실버타운 맞춤형 식단 구성 컨설팅 및 샘플 제공 프로그램을 지원합니다."}],lineupTitle:"주요 제품 라인업",lineup:[{tag:"Category 01",title:"연하 보조 유동식 / 무스식",desc:"치아가 없거나 씹는 힘이 약한 어르신을 위한 혀로 으깰 수 있는 부드러운 영양식",tags:["#UDF3구분","#고단백","#칼로리보충"]},{tag:"Category 02",title:"점도 증진제 (토로미 파우더)",desc:"물이나 국물에 섞어 사레들림을 방지하고 삼키기 쉬운 점도로 조절해 주는 특수 분말",tags:["#사레들림방지","#투명한용해","#무미무취"]},{tag:"Category 03",title:"영양 강화 젤리 & 디저트",desc:"소화 흡수가 빠르고 비타민, 미네랄, 아연 등 필수 미량 영양소가 농축된 시니어 간식",tags:["#비타민강화","#고칼슘","#수분보충"]},{tag:"Category 04",title:"치료식 & 저염 단백질 식단",desc:"신장, 당뇨 등 만성질환 케어가 필요한 분들을 위한 정밀 염분·단백질 제한 특수식",tags:["#저염식단","#단백질조절","#환자맞춤식"]}],cta:{title:"개호식품 샘플 신청 및 B2B 납품 상담",desc:"병원, 요양원, 주간보호센터 등 시설 대량 공급 및 전용 식단 컨설팅을 도와드립니다.",btn:"문의하기"}},ja:{banner:{categoryTitle:"事業紹介",categoryEn:"BUSINESS DIVISIONS",pageTitle:"介護食品",pageDescription:"日本の確かな高齢者向け介護食品を通じて、尊厳ある健康的な食生活をご提案します。"},tabs:[{name:"事業紹介 全体",url:"/service"},{name:"介護食品",url:"/food"},{name:"金庫",url:"/money"},{name:"生活用品",url:"/product"},{name:"化学品",url:"/chemical"}],intro:{badge:"CARE FOOD SOLUTION",title:"美味しさと栄養、食べる喜びを守る<br /><strong>カスタマイズ介護食品</strong>ソリューション",desc:"超高齢社会を迎えた韓国へ、日本で培われた先進のシニアケアフード技術を導入。咀嚼・嚥下機能が低下した方々にも食べる喜びを保っていただける安全で栄養バランスに優れた介護食を供給します。"},strengthsTitle:"コアコンピタンスおよび強み",strengths:[{num:"01",title:"UDF規格認証品の厳選供給",desc:"日本介護食品協議会の厳格な規格(UDF区分1〜4)に適合した信頼性の高い製品のみを厳選輸入します。"},{num:"02",title:"コールドチェーン安心物流",desc:"鮮度と栄養を保持するため、通関から施設納品まで全工程で徹底した温度管理システムを稼働しています。"},{num:"03",title:"専門栄養設計サポート",desc:"療養病院や福祉施設向けに、栄養士と連携した献立構成コンサルティングおよびサンプル提供を実施しています。"}],lineupTitle:"主要製品ラインナップ",lineup:[{tag:"Category 01",title:"嚥下補助流動食・ムース食",desc:"歯のない方や噛む力が弱い方のための、舌でつぶせる柔らかい高栄養介護食",tags:["#UDF区分3","#高タンパク","#カロリー補給"]},{tag:"Category 02",title:"とろみ調整食品 (とろみパウダー)",desc:"水分や汁物に素早く溶け、誤嚥を防ぎ飲み込みやすく調整する特殊粉末",tags:["#誤嚥防止","#透明な溶解","#無味無臭"]},{tag:"Category 03",title:"栄養強化ゼリー＆デザート",desc:"消化吸収に優れ、ビタミン・ミネラル・亜鉛などが濃縮されたシニア向け補助食",tags:["#ビタミン強化","#高カルシウム","#水分補給"]},{tag:"Category 04",title:"治療食＆低塩分食",desc:"腎臓疾患や生活習慣病のケアが必要な方向けの精密な塩分・タンパク質調整食",tags:["#減塩食","#タンパク調整","#疾患別対応"]}],cta:{title:"介護食品サンプル請求およびB2B導入相談",desc:"病院・福祉施設様向けの大量一括納品および専用献立コンサルティングを承っております。",btn:"お問い合わせ"}},en:{banner:{categoryTitle:"Business Divisions",categoryEn:"BUSINESS DIVISIONS",pageTitle:"Care Food Solutions",pageDescription:"Offering premium, Japanese-certified nutritional senior care food products."},tabs:[{name:"All Businesses",url:"/service"},{name:"Care Food",url:"/food"},{name:"Safes & Security",url:"/money"},{name:"Living Goods",url:"/product"},{name:"Chemicals",url:"/chemical"}],intro:{badge:"CARE FOOD SOLUTION",title:"Preserving Taste, Nutrition & Joy of Dining<br /><strong>Specialized Senior Care Food</strong> Solutions",desc:"Introducing advanced Japanese senior care nutrition technologies. Providing scientifically engineered dietary solutions for seniors with impaired chewing and swallowing capabilities."},strengthsTitle:"Core Capabilities & Strengths",strengths:[{num:"01",title:"Strict UDF Certified Products",desc:"Importing products certified under the strict Universal Design Food (UDF) standards."},{num:"02",title:"Cold-Chain Logistics",desc:"Full-process temperature-controlled logistics from customs clearance to hospitals and nursing homes."},{num:"03",title:"Clinical Nutrition Consulting",desc:"Customized dietary menu planning and sample programs in collaboration with clinical nutritionists."}],lineupTitle:"Key Product Lineup",lineup:[{tag:"Category 01",title:"Puree & Mousse Meals",desc:"Smooth, easily swallowed nutritious meals designed for seniors with chewing difficulties.",tags:["#UDF-Grade3","#HighProtein","#CalorieBoost"]},{tag:"Category 02",title:"Food Thickening Powder",desc:"Quick-dissolving thickening agents that prevent choking without altering taste or appearance.",tags:["#ChokePrevention","#ClearDissolve","#Odorless"]},{tag:"Category 03",title:"Nutritional Jellies & Desserts",desc:"Easily digestible snacks enriched with essential vitamins, calcium, and zinc.",tags:["#VitaminEnriched","#HighCalcium","#Hydration"]},{tag:"Category 04",title:"Therapeutic Diets",desc:"Scientifically regulated low-sodium and protein-managed meals for chronic disease care.",tags:["#LowSodium","#ProteinControl","#CustomCare"]}],cta:{title:"Request Samples & B2B Inquiries",desc:"We support bulk institutional deliveries and dietary consultation for hospitals and nursing homes.",btn:"Contact Us"}}},t=st(()=>e[Fe.value]||e.ja);return(i,s)=>{const r=rn("router-link");return $(),It(an,{"category-title":t.value.banner.categoryTitle,"category-en":t.value.banner.categoryEn,"category-url":"/service","page-title":t.value.banner.pageTitle,"page-description":t.value.banner.pageDescription,"hero-image":"/images/main/slide-main-healthyfood.jpg",tabs:t.value.tabs},{default:Ve(()=>[d("div",Pw,[d("div",Iw,[d("div",Lw,[d("img",{src:Rw,alt:t.value.intro.badge,class:"intro-img"},null,8,Dw)]),d("div",Nw,[d("span",Uw,N(t.value.intro.badge),1),d("h2",{class:"intro-title",innerHTML:t.value.intro.title},null,8,Ow),d("p",Fw,N(t.value.intro.desc),1)])]),d("section",Bw,[d("h3",kw,N(t.value.strengthsTitle),1),d("div",Hw,[($(!0),ee(Le,null,Ke(t.value.strengths,a=>($(),ee("div",{key:a.num,class:"strength-card"},[d("div",Gw,N(a.num),1),d("h4",null,N(a.title),1),d("p",null,N(a.desc),1)]))),128))])]),d("section",Vw,[d("h3",zw,N(t.value.lineupTitle),1),d("div",Ww,[($(!0),ee(Le,null,Ke(t.value.lineup,a=>($(),ee("div",{key:a.tag,class:"lineup-item"},[d("div",$w,[d("span",Xw,N(a.tag),1),d("h4",null,N(a.title),1)]),d("p",qw,N(a.desc),1),d("ul",Yw,[($(!0),ee(Le,null,Ke(a.tags,o=>($(),ee("li",{key:o},N(o),1))),128))])]))),128))])]),d("div",Kw,[d("div",Zw,[d("h4",null,N(t.value.cta.title),1),d("p",null,N(t.value.cta.desc),1)]),Xe(r,{to:"/quiry",class:"btn-primary-mitsui"},{default:Ve(()=>[ht(N(t.value.cta.btn)+" →",1)]),_:1})])])]),_:1},8,["category-title","category-en","page-title","page-description","tabs"])}}},Qw="/images/main/slide-main-money.png",jw={class:"business-detail-page"},eC={class:"business-intro-card"},tC={class:"intro-visual"},nC=["alt"],iC={class:"intro-content"},sC={class:"sub-badge"},rC=["innerHTML"],aC={class:"intro-desc"},oC={class:"section-block"},lC={class:"section-sub-title"},cC={class:"biz-strengths-grid"},uC={class:"strength-num"},dC={class:"section-block"},fC={class:"section-sub-title"},hC={class:"product-lineup-grid"},pC={class:"lineup-header"},mC={class:"lineup-tag"},gC={class:"lineup-desc"},_C={class:"lineup-spec"},vC={class:"section-block"},xC={class:"section-sub-title"},yC={class:"profile-table-wrap"},SC={class:"mitsui-style-table"},bC={scope:"row"},MC={class:"biz-cta-box"},EC={class:"cta-text"},TC={__name:"Money",setup(n){const e={ko:{banner:{categoryTitle:"사업소개",categoryEn:"BUSINESS DIVISIONS",pageTitle:"금고",pageDescription:"일본의 정밀 보안 기술로 소중한 자산과 기밀을 안전하게 지켜드립니다."},tabs:[{name:"사업소개 전체",url:"/service"},{name:"개호식품",url:"/food"},{name:"금고",url:"/money"},{name:"생활용품",url:"/product"},{name:"화학제품",url:"/chemical"}],intro:{badge:"HIGH SECURITY SAFES",title:"극한의 환경에서도 자산을 보호하는<br /><strong>일본 프리미엄 금고</strong> 솔루션",desc:"화재, 도난, 침수 등 예기치 못한 재난으로부터 고객의 소중한 귀중품과 기업의 기밀 문서를 안전하게 지킵니다. 일본 공업규격(JIS)의 가혹한 고온 내화 시험과 충격 낙하 시험을 완벽하게 통과한 세계 최고 수준의 내화·방도 금고 라인업을 수입·공급하고 있습니다."},strengthsTitle:"핵심 보안 기술",strengths:[{num:"01",title:"1,010℃ 2시간 최고등급 내화",desc:"1,000도가 넘는 화재 현장에서도 내부 온도를 177℃ 이하로 유지하여 종이 및 디지털 저장매체를 온전히 보호합니다."},{num:"02",title:"특수 합금 방도 방어벽",desc:"드릴 및 절단 토치 공격에 견디는 특수 방도 합금 플레이트와 빗장 잠금 구조로 외부 침입을 원천 차단합니다."},{num:"03",title:"첨단 생체인식 스마트 락",desc:"정전용량 지문인식 센서, 터치스크린 패스워드, 이중 잠금 모드 및 외부 충격 감지 경보 기능을 탑재했습니다."}],lineupTitle:"제품 라인업",lineup:[{tag:"Lineup 01",title:"프리미엄 인테리어 홈 금고",desc:"고급스러운 외관 디자인으로 주거 공간 및 서재의 인테리어와 완벽한 조화를 이루는 프리미엄 가정용 금고입니다.",specs:["정밀 지문인식 + 백업 터치키","내부 LED 조명 및 보석 수납 트레이"]},{tag:"Lineup 02",title:"비즈니스 오피스 내화금고",desc:"중요 계약서, 회계 장부, 인감, 디지털 백업 드라이브를 보관하는 중대형 사무용 고성능 내화금고입니다.",specs:["바인더 전용 수납 선반 및 서랍","화재 시 9.1m 낙하 충격 시험 통과"]},{tag:"Lineup 03",title:"금융기관/특수 보안 대형 금고",desc:"은행, 관공서, 귀금속상 등 고위험 자산을 보관하기 위해 주문 제작되는 최고등급 방도·방폭 금고입니다.",specs:["리록킹(Relocking) 자동 잠금 장치","경비 보안 시스템 원격 연동 포트"]}],tableTitle:"금고 규격 및 사양 비교표",tableHeaders:["모델 시리즈","용도","내화 시간","잠금 방식","주요 규격(JIS)"],tableRows:[{model:"PRESTIGE 시리즈",use:"가정용 / 프리미엄 주거",fire:"1시간 내화 (JIS S 1037)",lock:"지문인식 + 디지털 터치",spec:"외장 피아노 블랙 / 화이트 마감"},{model:"EXECUTIVE 시리즈",use:"기업 사무용 / 법무·회계",fire:"2시간 내화 (JIS S 1037)",lock:"이중 비밀번호 + 기계식 락",spec:"A4 화일 및 바인더 최적화"},{model:"TITAN STRONG 시리즈",use:"금융기관 / 금은방 / 연구소",fire:"2시간 내화 + TS-15 방도",lock:"다이얼 + 지문 + 스마트 카드",spec:"강화 합금 특수도어 120mm"}],cta:{title:"금고 제품 카탈로그 요청 및 설치 상담",desc:"공간 크기와 보안 목적에 최적화된 금고 추천 및 전문 운송·설치 서비스를 안내해 드립니다.",btn:"문의하기"}},ja:{banner:{categoryTitle:"事業紹介",categoryEn:"BUSINESS DIVISIONS",pageTitle:"金庫",pageDescription:"日本の精密セキュリティ技術で大切な資産と機密を安全にお守りします。"},tabs:[{name:"事業紹介 全体",url:"/service"},{name:"介護食品",url:"/food"},{name:"金庫",url:"/money"},{name:"生活用品",url:"/product"},{name:"化学品",url:"/chemical"}],intro:{badge:"HIGH SECURITY SAFES",title:"過酷な環境下でも資産を守り抜く<br /><strong>日本製プレミアム金庫</strong>ソリューション",desc:"火災、盗難、水害など予期せぬ災害からお客様の貴重品や企業の重要機密文書を安全に守ります。日本産業規格（JIS）の過酷な高温耐火試験や衝撃落下試験をクリアした、世界最高水準の耐火・防盗金庫ラインナップを輸入・販売しています。"},strengthsTitle:"コア・セキュリティ技術",strengths:[{num:"01",title:"1,010℃ 2時間 最高等級耐火",desc:"1,000度を超える火災現場でも内部温度を177℃以下に保ち、紙文書やデジタル記録媒体を確実に保護します。"},{num:"02",title:"特殊合金防盗シールド",desc:"ドリルやバーナー破壊攻撃に耐える特殊防盗合金プレートと強力なカンヌキ構造で不正解錠・侵入を遮断します。"},{num:"03",title:"最新生体認証スマートロック",desc:"静電容量式指紋認証、タッチスクリーン暗証番号、二重施錠モード、衝撃検知アラームを搭載しています。"}],lineupTitle:"製品ラインナップ",lineup:[{tag:"Lineup 01",title:"プレミアムインテリア金庫",desc:"洗練されたデザインで住空間や書斎のインテリアに自然に溶け込む高級家庭用金庫です。",specs:["精密指紋認証＋バックアップキー","庫内LEDライト＆貴金属収納トレイ"]},{tag:"Lineup 02",title:"オフィス用耐火金庫",desc:"重要書類、帳簿、社印、デジタルバックアップを確実に守る中・大型ビジネス用耐火金庫です。",specs:["A4ファイル専用棚板＆引き出し","火災時9.1m落下衝撃試験合格"]},{tag:"Lineup 03",title:"金融機関・特殊防盗大型金庫",desc:"金融機関や貴金属店など高額資産を保管するために特注設計された最高峰の防盗・防爆金庫です。",specs:["自動再施錠(リロッキング)装置","警備保障システム連動端子"]}],tableTitle:"金庫の規格および仕様比較表",tableHeaders:["モデルシリーズ","用途","耐火時間","施錠方式","主要規格(JIS)"],tableRows:[{model:"PRESTIGE シリーズ",use:"家庭用 / 高級レジデンス",fire:"1時間耐火 (JIS S 1037)",lock:"指紋認証 ＋ デジタルタッチ",spec:"ピアノブラック / ホワイト光沢仕上"},{model:"EXECUTIVE シリーズ",use:"オフィス / 法務・会計",fire:"2時間耐火 (JIS S 1037)",lock:"二重暗証番号 ＋ シリンダー錠",spec:"A4バインダー最適化設計"},{model:"TITAN STRONG シリーズ",use:"金融機関 / 貴金属店 / 研究所",fire:"2時間耐火 ＋ TS-15防盗",lock:"ダイヤル ＋ 指紋 ＋ ICカード",spec:"120mm特殊合金防盗ドア"}],cta:{title:"金庫カタログ請求および導入相談",desc:"設置スペースやセキュリティ要件に応じた最適モデルのご提案、専門輸送・据付工事をご案内します。",btn:"お問い合わせ"}},en:{banner:{categoryTitle:"Business Divisions",categoryEn:"BUSINESS DIVISIONS",pageTitle:"Safes & Security",pageDescription:"Safeguarding your valuable assets and confidential documents with Japanese high-security technology."},tabs:[{name:"All Businesses",url:"/service"},{name:"Care Food",url:"/food"},{name:"Safes & Security",url:"/money"},{name:"Living Goods",url:"/product"},{name:"Chemicals",url:"/chemical"}],intro:{badge:"HIGH SECURITY SAFES",title:"Protecting Assets in Extreme Conditions<br /><strong>Premium Japanese Safe</strong> Solutions",desc:"Protecting your most valuable assets and confidential enterprise documents from fire, theft, and natural disasters. We import and supply world-class fireproof and burglar-resistant safes certified under stringent Japanese Industrial Standards (JIS)."},strengthsTitle:"Core Security Technologies",strengths:[{num:"01",title:"1,010℃ 2-Hour Fire Endurance",desc:"Maintains internal temperature below 177℃ even in infernos over 1,000℃, safeguarding documents and digital media."},{num:"02",title:"Special Alloy Anti-Burglary Barrier",desc:"Reinforced anti-drill plates and deadbolts protect against severe cutting, drilling, and mechanical attacks."},{num:"03",title:"Advanced Biometric Smart Locks",desc:"Equipped with capacitive fingerprint sensors, touch keypads, dual-custody mode, and tamper alarms."}],lineupTitle:"Product Lineup",lineup:[{tag:"Lineup 01",title:"Premium Home Interior Safes",desc:"Sophisticated aesthetic design that seamlessly integrates into luxury residences and private studies.",specs:["Biometric Fingerprint + Touchscreen Keypad","Internal LED Illumination & Jewelry Tray"]},{tag:"Lineup 02",title:"Commercial Office Fireproof Safes",desc:"Engineered for critical legal documents, financial ledgers, and enterprise backup media.",specs:["Binder-friendly Shelves & Lockable Drawers","9.1m Impact Drop Test Certified"]},{tag:"Lineup 03",title:"Institutional High-Security Safes",desc:"Heavy-duty burglar and explosion-resistant vaults designed for financial institutions and jewelers.",specs:["Automatic Relocking Mechanism","Remote Security System Linkage Ports"]}],tableTitle:"Specifications & Comparison Table",tableHeaders:["Model Series","Application","Fire Rating","Locking Method","Standard (JIS)"],tableRows:[{model:"PRESTIGE Series",use:"Residential / Private Suites",fire:"1-Hour Fire (JIS S 1037)",lock:"Fingerprint + Digital Touch",spec:"Piano Black / Pearl White Finish"},{model:"EXECUTIVE Series",use:"Corporate / Legal & Accounting",fire:"2-Hour Fire (JIS S 1037)",lock:"Dual Password + Cylinder Lock",spec:"A4 Binder Optimized Shelving"},{model:"TITAN STRONG Series",use:"Financial / Jewelry / Research",fire:"2-Hour Fire + TS-15 Burglary",lock:"Dial + Fingerprint + Smart Card",spec:"120mm Heavy Alloy Door"}],cta:{title:"Catalog Request & Installation Inquiries",desc:"We provide model recommendations tailored to your space and security level, along with professional delivery and setup.",btn:"Contact Us"}}},t=st(()=>e[Fe.value]||e.ja);return(i,s)=>{const r=rn("router-link");return $(),It(an,{"category-title":t.value.banner.categoryTitle,"category-en":t.value.banner.categoryEn,"category-url":"/service","page-title":t.value.banner.pageTitle,"page-description":t.value.banner.pageDescription,"hero-image":"/images/main/slide-main-money.png",tabs:t.value.tabs},{default:Ve(()=>[d("div",jw,[d("div",eC,[d("div",tC,[d("img",{src:Qw,alt:t.value.intro.badge,class:"intro-img"},null,8,nC)]),d("div",iC,[d("span",sC,N(t.value.intro.badge),1),d("h2",{class:"intro-title",innerHTML:t.value.intro.title},null,8,rC),d("p",aC,N(t.value.intro.desc),1)])]),d("section",oC,[d("h3",lC,N(t.value.strengthsTitle),1),d("div",cC,[($(!0),ee(Le,null,Ke(t.value.strengths,a=>($(),ee("div",{key:a.num,class:"strength-card"},[d("div",uC,N(a.num),1),d("h4",null,N(a.title),1),d("p",null,N(a.desc),1)]))),128))])]),d("section",dC,[d("h3",fC,N(t.value.lineupTitle),1),d("div",hC,[($(!0),ee(Le,null,Ke(t.value.lineup,a=>($(),ee("div",{key:a.tag,class:"lineup-item"},[d("div",pC,[d("span",mC,N(a.tag),1),d("h4",null,N(a.title),1)]),d("p",gC,N(a.desc),1),d("ul",_C,[($(!0),ee(Le,null,Ke(a.specs,o=>($(),ee("li",{key:o},N(o),1))),128))])]))),128))])]),d("section",vC,[d("h3",xC,N(t.value.tableTitle),1),d("div",yC,[d("table",SC,[d("thead",null,[d("tr",null,[($(!0),ee(Le,null,Ke(t.value.tableHeaders,a=>($(),ee("th",{key:a},N(a),1))),128))])]),d("tbody",null,[($(!0),ee(Le,null,Ke(t.value.tableRows,a=>($(),ee("tr",{key:a.model},[d("th",bC,N(a.model),1),d("td",null,N(a.use),1),d("td",null,N(a.fire),1),d("td",null,N(a.lock),1),d("td",null,N(a.spec),1)]))),128))])])])]),d("div",MC,[d("div",EC,[d("h4",null,N(t.value.cta.title),1),d("p",null,N(t.value.cta.desc),1)]),Xe(r,{to:"/quiry",class:"btn-primary-mitsui"},{default:Ve(()=>[ht(N(t.value.cta.btn)+" →",1)]),_:1})])])]),_:1},8,["category-title","category-en","page-title","page-description","tabs"])}}},AC="/images/card/main-card-2.png",wC={class:"business-detail-page"},CC={class:"business-intro-card"},RC={class:"intro-visual"},PC=["alt"],IC={class:"intro-content"},LC={class:"sub-badge"},DC=["innerHTML"],NC={class:"intro-desc"},UC={class:"section-block"},OC={class:"section-sub-title"},FC={class:"biz-strengths-grid"},BC={class:"strength-num"},kC={class:"section-block"},HC={class:"section-sub-title"},GC={class:"product-lineup-grid"},VC={class:"lineup-header"},zC={class:"lineup-tag"},WC={class:"lineup-desc"},$C={class:"lineup-spec"},XC={class:"section-block"},qC={class:"section-sub-title"},YC={class:"profile-table-wrap"},KC={class:"mitsui-style-table"},ZC={scope:"row"},JC={class:"biz-cta-box"},QC={class:"cta-text"},jC={__name:"Product",setup(n){const e={ko:{banner:{categoryTitle:"사업소개",categoryEn:"BUSINESS DIVISIONS",pageTitle:"생활용품",pageDescription:"일상의 품격과 위생, 편리함을 더하는 프리미엄 생활소비재를 엄선 유통합니다."},tabs:[{name:"사업소개 전체",url:"/service"},{name:"개호식품",url:"/food"},{name:"금고",url:"/money"},{name:"생활용품",url:"/product"},{name:"화학제품",url:"/chemical"}],intro:{badge:"LIVING & LIFESTYLE",title:"실용성과 감성을 모두 갖춘<br /><strong>프리미엄 생활용품</strong> 솔루션",desc:"세심한 디테일과 높은 완성도로 정평이 난 일본의 우수 소비재 제조사와 협력하여, 국내 소비자의 눈높이에 맞춘 감각적인 리빙웨어와 위생용품을 소개합니다. 단순한 상품 유통을 넘어, 사람들의 일상을 더욱 쾌적하고 편리하게 만드는 라이프스타일 가치를 전파합니다."},strengthsTitle:"생활용품 비즈니스 경쟁력",strengths:[{num:"01",title:"철저한 안전·위생 기준 검증",desc:"국내 식약처 및 KC 안전기준은 물론, 일본 후생노동성 기준을 만족하는 친환경·무독성 제품만을 취급합니다."},{num:"02",title:"아이디어 특허 소비재 소싱",desc:"공간 활용성, 인체공학적 그립감, 세척 용이성 등 사용자 중심의 특허 디자인 제품군을 지속 발굴합니다."},{num:"03",title:"온·오프라인 옴니채널 유통",desc:"백화점, 대형 할인점, e커머스 플랫폼 및 기업 특판 등 다각화된 유통 채널에 최적 공급 체계를 갖추고 있습니다."}],lineupTitle:"주요 취급 카테고리",lineup:[{tag:"Category 01",title:"스마트 키친 & 테이블웨어",desc:"조리 시간을 단축하고 식탁의 품격을 높이는 고품질 스테인리스 조리도구 및 밀폐 보관 용기입니다.",specs:["항균 내열 실리콘 주방용품","내열 유리 및 고진공 밀폐용기"]},{tag:"Category 02",title:"위생 & 퍼스널 클린 케어",desc:"가정과 다중이용시설의 청결을 지켜주는 저자극 항균 세정제, 무알콜 소독 티슈 및 클리닝 툴입니다.",specs:["천연 유래 성분 항균 스프레이","초극세사 다목적 클리너"]},{tag:"Category 03",title:"친환경 에코 리빙 잡화",desc:"생분해성 소재와 재활용 가능한 원료로 제작된 지속 가능한 친환경 생활소비재 라인업입니다.",specs:["대나무 섬유 생활용품","친환경 펄프 패키징 제품군"]}],tableTitle:"B2B 공급 및 유통 프로세스",tableHeaders:["단계","구분","주요 업무 내용"],tableRows:[{step:"STEP 01",phase:"상품 발굴 및 소싱",desc:"일본 현지 박람회 및 파트너사 네트워크를 통한 신상품 및 트렌드 분석"},{step:"STEP 02",phase:"품질 및 인증 검증",desc:"국내 안전기준(KC인증, 식약처 정밀검사 등) 사전 시험 및 품질 보증"},{step:"STEP 03",phase:"수입 통관 및 물류",desc:"정식 수입 통관 및 자체 종합 물류 센터를 통한 안전 입고 관리"},{step:"STEP 04",phase:"유통 및 사후 관리",desc:"주요 채널 납품, 프로모션 지원, CS 및 지속적인 품질 모니터링"}],cta:{title:"생활용품 입점 문의 및 특판 상담",desc:"기업 판촉물, 온·오프라인 유통 입점 및 OEM/ODM 협업 문의를 환영합니다.",btn:"문의하기"}},ja:{banner:{categoryTitle:"事業紹介",categoryEn:"BUSINESS DIVISIONS",pageTitle:"生活用品",pageDescription:"日々の暮らしに品格と清潔、利便性をプラスする厳選されたプレミアム生活消費財をお届けします。"},tabs:[{name:"事業紹介 全体",url:"/service"},{name:"介護食品",url:"/food"},{name:"金庫",url:"/money"},{name:"生活用品",url:"/product"},{name:"化学品",url:"/chemical"}],intro:{badge:"LIVING & LIFESTYLE",title:"実用性と感性を兼ね備えた<br /><strong>プレミアム生活用品</strong>ソリューション",desc:"細部へのこだわりと高い完成度で定評のある日本の優れた消費財メーカーと連携し、韓国消費者のニーズに応える洗練されたリビングウェアや衛生用品をお届けします。単なる商品の流通にとどまらず、人々の日常をより快適で豊かにするライフスタイル価値を創造します。"},strengthsTitle:"生活用品事業の強み",strengths:[{num:"01",title:"徹底した安全・衛生基準の検証",desc:"韓国KC認証や食品医薬品安全処の基準はもちろん、日本の厚生労働省基準をクリアした環境配慮・無害な製品のみを厳選します。"},{num:"02",title:"アイデア特許消費財のソーシング",desc:"省スペース性、人間工学に基づくグリップ感、お手入れのしやすさなど、ユーザー目線の特許デザイン商品を継続発掘します。"},{num:"03",title:"オンライン・オフラインのオムニチャネル流通",desc:"百貨店、大手量販店、ECプラットフォーム、法人ギフトなど、多角化されたチャネルへ最適な供給体制を構築しています。"}],lineupTitle:"主要取扱カテゴリー",lineup:[{tag:"Category 01",title:"スマートキッチン＆テーブルウェア",desc:"調理の時短を叶え、食卓の品位を高める高品質ステンレス調理器具および密閉保存容器です。",specs:["抗菌耐熱シリコンキッチン用品","耐熱ガラス＆真空密閉容器"]},{tag:"Category 02",title:"衛生＆パーソナルクリーンケア",desc:"家庭や公共施設の清潔を守る低刺激抗菌洗剤、ノンアルコール除菌シートおよび清掃ツールです。",specs:["天然由来成分の除菌スプレー","超極細繊維マルチクリーナー"]},{tag:"Category 03",title:"環境配慮エコーリビング雑貨",desc:"生分解性素材やリサイクル可能な原料で作られた、持続可能なエコライフスタイル消費財です。",specs:["竹繊維配合の生活雑貨","環境配慮パルプパッケージ製品群"]}],tableTitle:"B2B供給・流通プロセス",tableHeaders:["ステップ","区分","主要業務内容"],tableRows:[{step:"STEP 01",phase:"商品発掘・ソーシング",desc:"日本の展示会および提携メーカーネットワークを通じた新商品・トレンド分析"},{step:"STEP 02",phase:"品質・規格認証検証",desc:"韓国安全規格（KC認証、食品医薬品安全処検査等）の事前試験と品質保証"},{step:"STEP 03",phase:"輸入通関・物流管理",desc:"正規輸入通関および提携総合物流センターを通じた厳格な入出荷管理"},{step:"STEP 04",phase:"流通・アフターフォロー",desc:"主要販路への納品、販促支援、カスタマーサポートおよび品質モニタリング"}],cta:{title:"生活用品のお取扱・法人特販のご相談",desc:"企業の販促ノベルティ、オンライン・オフライン店舗への導入、OEM/ODMのご相談を承ります。",btn:"お問い合わせ"}},en:{banner:{categoryTitle:"Business Divisions",categoryEn:"BUSINESS DIVISIONS",pageTitle:"Living Goods",pageDescription:"Distributing curated premium lifestyle and household goods that enhance daily comfort and hygiene."},tabs:[{name:"All Businesses",url:"/service"},{name:"Care Food",url:"/food"},{name:"Safes & Security",url:"/money"},{name:"Living Goods",url:"/product"},{name:"Chemicals",url:"/chemical"}],intro:{badge:"LIVING & LIFESTYLE",title:"Combining Practical Utility & Refined Aesthetics<br /><strong>Premium Lifestyle Goods</strong> Solutions",desc:"Partnering with Japan’s leading manufacturers known for attention to detail and exquisite craftsmanship, we introduce sensible livingware and personal care products tailored to modern consumers. Beyond retail distribution, we enrich daily lives with thoughtful lifestyle solutions."},strengthsTitle:"Core Competencies in Living Goods",strengths:[{num:"01",title:"Strict Safety & Hygiene Standards",desc:"Handling only eco-friendly, non-toxic products satisfying KC certification, MFDS food-grade standards, and Japan MHLW criteria."},{num:"02",title:"Patented Functional Lifestyle Goods",desc:"Constantly sourcing user-centric products featuring space-saving designs, ergonomic comfort, and effortless cleaning."},{num:"03",title:"Omnichannel Distribution Network",desc:"Seamlessly supplying department stores, hypermarkets, major e-commerce platforms, and corporate B2B gifting channels."}],lineupTitle:"Key Categories",lineup:[{tag:"Category 01",title:"Smart Kitchen & Tableware",desc:"High-grade stainless cookware and vacuum airtight containers that elevate kitchen efficiency and table styling.",specs:["Antibacterial Heat-resistant Silicone Ware","Thermal Glass & High-vacuum Containers"]},{tag:"Category 02",title:"Hygiene & Personal Clean Care",desc:"Hypoallergenic antimicrobial cleansers, alcohol-free sanitizing wipes, and premium cleaning tools.",specs:["Naturally Derived Antimicrobial Sprays","Ultra-microfiber Multipurpose Cloths"]},{tag:"Category 03",title:"Eco-friendly Sustainable Living",desc:"Sustainable consumer products crafted from biodegradable plant fibers and recyclable components.",specs:["Bamboo Fiber Household Goods","Eco Pulp Packaged Product Line"]}],tableTitle:"B2B Supply & Distribution Process",tableHeaders:["Step","Phase","Key Operations"],tableRows:[{step:"STEP 01",phase:"Discovery & Sourcing",desc:"Trend scouting and new product identification through Japanese trade expos and vendor networks"},{step:"STEP 02",phase:"Quality & Regulatory Testing",desc:"Pre-testing compliance with Korean regulations including KC marks and MFDS food contact safety"},{step:"STEP 03",phase:"Customs & Logistics",desc:"Formal import customs clearance, safe warehousing, and distribution fulfillment"},{step:"STEP 04",phase:"Channel Delivery & Care",desc:"Supplying major retail channels, promotional marketing support, and ongoing customer care"}],cta:{title:"Retail Inquiries & Corporate Gifting",desc:"We welcome inquiries for retail distribution, corporate gifts, and OEM/ODM collaborations.",btn:"Contact Us"}}},t=st(()=>e[Fe.value]||e.ja);return(i,s)=>{const r=rn("router-link");return $(),It(an,{"category-title":t.value.banner.categoryTitle,"category-en":t.value.banner.categoryEn,"category-url":"/service","page-title":t.value.banner.pageTitle,"page-description":t.value.banner.pageDescription,"hero-image":"/images/main/main-card-2.jpeg",tabs:t.value.tabs},{default:Ve(()=>[d("div",wC,[d("div",CC,[d("div",RC,[d("img",{src:AC,alt:t.value.intro.badge,class:"intro-img"},null,8,PC)]),d("div",IC,[d("span",LC,N(t.value.intro.badge),1),d("h2",{class:"intro-title",innerHTML:t.value.intro.title},null,8,DC),d("p",NC,N(t.value.intro.desc),1)])]),d("section",UC,[d("h3",OC,N(t.value.strengthsTitle),1),d("div",FC,[($(!0),ee(Le,null,Ke(t.value.strengths,a=>($(),ee("div",{key:a.num,class:"strength-card"},[d("div",BC,N(a.num),1),d("h4",null,N(a.title),1),d("p",null,N(a.desc),1)]))),128))])]),d("section",kC,[d("h3",HC,N(t.value.lineupTitle),1),d("div",GC,[($(!0),ee(Le,null,Ke(t.value.lineup,a=>($(),ee("div",{key:a.tag,class:"lineup-item"},[d("div",VC,[d("span",zC,N(a.tag),1),d("h4",null,N(a.title),1)]),d("p",WC,N(a.desc),1),d("ul",$C,[($(!0),ee(Le,null,Ke(a.specs,o=>($(),ee("li",{key:o},N(o),1))),128))])]))),128))])]),d("section",XC,[d("h3",qC,N(t.value.tableTitle),1),d("div",YC,[d("table",KC,[d("thead",null,[d("tr",null,[($(!0),ee(Le,null,Ke(t.value.tableHeaders,a=>($(),ee("th",{key:a},N(a),1))),128))])]),d("tbody",null,[($(!0),ee(Le,null,Ke(t.value.tableRows,a=>($(),ee("tr",{key:a.step},[d("th",ZC,N(a.step),1),d("td",null,N(a.phase),1),d("td",null,N(a.desc),1)]))),128))])])])]),d("div",JC,[d("div",QC,[d("h4",null,N(t.value.cta.title),1),d("p",null,N(t.value.cta.desc),1)]),Xe(r,{to:"/quiry",class:"btn-primary-mitsui"},{default:Ve(()=>[ht(N(t.value.cta.btn)+" →",1)]),_:1})])])]),_:1},8,["category-title","category-en","page-title","page-description","tabs"])}}},eR="/images/main/slide-main-chemical.png",tR={class:"business-detail-page"},nR={class:"business-intro-card"},iR={class:"intro-visual"},sR=["alt"],rR={class:"intro-content"},aR={class:"sub-badge"},oR=["innerHTML"],lR={class:"intro-desc"},cR={class:"section-block"},uR={class:"section-sub-title"},dR={class:"biz-strengths-grid"},fR={class:"strength-num"},hR={class:"section-block"},pR={class:"section-sub-title"},mR={class:"product-lineup-grid"},gR={class:"lineup-header"},_R={class:"lineup-tag"},vR={class:"lineup-desc"},xR={class:"lineup-spec"},yR={class:"section-block"},SR={class:"section-sub-title"},bR={class:"profile-table-wrap"},MR={class:"mitsui-style-table"},ER={scope:"row"},TR={class:"biz-cta-box"},AR={class:"cta-text"},wR={__name:"Chemical",setup(n){const e={ko:{banner:{categoryTitle:"사업소개",categoryEn:"BUSINESS DIVISIONS",pageTitle:"화학제품",pageDescription:"정밀화학부터 친환경 소재까지, 미래 산업을 견인하는 글로벌 화학 트레이딩 솔루션입니다."},tabs:[{name:"사업소개 전체",url:"/service"},{name:"개호식품",url:"/food"},{name:"금고",url:"/money"},{name:"생활용품",url:"/product"},{name:"화학제품",url:"/chemical"}],intro:{badge:"ADVANCED CHEMICALS",title:"산업의 기초부터 첨단 미래까지<br /><strong>글로벌 화학 원료</strong> 트레이딩",desc:"일한상사의 화학 사업 부문은 자동차, IT 전자, 배터리, 건축 등 핵심 제조업의 근간이 되는 기초 유분 및 고기능성 정밀화학 소재를 전 세계 주요 제조사로부터 안정적으로 소싱하여 공급합니다. 또한 최근 대두되는 탄소중립 이슈에 발맞추어 바이오매스 플라스틱과 생분해성 수지 등 차세대 친환경 화학소재 포트폴리오를 지속적으로 확대하고 있습니다."},strengthsTitle:"화학 사업 부문 핵심 역량",strengths:[{num:"01",title:"글로벌 소싱 네트워크",desc:"일본, 동남아, 미국, 유럽 등 유수의 글로벌 케미칼 제조사와 긴밀한 파트너십을 구축하여 수급 변동에도 안정적 공급을 보장합니다."},{num:"02",title:"고기능성 스페셜티 솔루션",desc:"단순 범용 원료뿐만 아니라 반도체 공정, 2차 전지, 모빌리티 분야에 요구되는 초고순도 스페셜티 화학품을 발굴·제안합니다."},{num:"03",title:"전문 화학 물류 & 규제 대응",desc:"위험물 안전 운송 규격(IMDG), 화평법/화관법 준수 등 고도화된 화학물질 관리 체계와 맞춤형 저장 인프라를 보유하고 있습니다."}],lineupTitle:"주요 취급 품목 분야",lineup:[{tag:"Chemical Sector 01",title:"기초화학품 & 합성수지 원료",desc:"산업 전반의 베이스가 되는 올레핀계, 아로마틱계 기초유분 및 범용·엔지니어링 플라스틱 수지입니다.",specs:["PE, PP, ABS, PC 합성수지","모노머, 용제, 가소제 및 중간체"]},{tag:"Chemical Sector 02",title:"정밀화학 & 전자재료 첨가제",desc:"디스플레이, 반도체 및 고기능성 코팅 도료 등에 사용되는 고부가가치 정밀 화학 원료 및 기능성 첨가제입니다.",specs:["실리콘 오일 & 변성 실리콘 수지","UV 경화제, 대전방지제, 산화방지제"]},{tag:"Chemical Sector 03",title:"친환경 바이오매스 & 순환 소재",desc:"ESG 경영 및 탄소 배출 저감을 위한 식물성 유래 바이오 플라스틱 및 재활용 재생 레진 제품군입니다.",specs:["PLA, PHA 친환경 생분해성 수지","Post-Consumer Recycled(PCR) 수지"]}],tableTitle:"품목별 용도 및 포장 규격",tableHeaders:["품목군","주요 대상 산업","대표 제품명","공급 단위/포장"],tableRows:[{group:"고기능성 수지",industry:"자동차 경량화, 전기·전자 하우징",product:"엔지니어링 플라스틱 컴파운드",pack:"25kg Bag, 500kg Jumbo Bag"},{group:"정밀 용제 & 모노머",industry:"페인트, 접착제, 인쇄 잉크 제조",product:"아크릴계 모노머, 고순도 에스테르",pack:"200L Drum, ISO Tank 컨테이너"},{group:"바이오 플라스틱",industry:"식품 포장재, 일회용품 대체 용기",product:"식물유래 생분해성 복합레진",pack:"25kg Bag, 컨테이너 FCL"}],cta:{title:"화학소재 견적 의뢰 및 기술 자료(TDS/MSDS) 요청",desc:"원하시는 스펙과 수량, 납기 조건을 문의해주시면 전문 트레이더가 최적의 솔루션을 안내합니다.",btn:"문의하기"}},ja:{banner:{categoryTitle:"事業紹介",categoryEn:"BUSINESS DIVISIONS",pageTitle:"化学品",pageDescription:"精密化学から環境配慮素材まで、未来産業を牽引するグローバル化学品トレーディングソリューションです。"},tabs:[{name:"事業紹介 全体",url:"/service"},{name:"介護食品",url:"/food"},{name:"金庫",url:"/money"},{name:"生活用品",url:"/product"},{name:"化学品",url:"/chemical"}],intro:{badge:"ADVANCED CHEMICALS",title:"産業の基盤から先端の未来まで<br /><strong>グローバル化学原料</strong>トレーディング",desc:"日韓商事の化学品事業部門は、自動車、ITエレクトロニクス、二次電池、建築など基幹製造業を支える基礎化学原料および高機能精密化学素材を、世界トップクラスのメーカーから安定的に調達・供給しています。また、カーボンニュートラルの潮流に対応し、バイオマスプラスチックや生分解性樹脂など次世代の環境配慮型素材ポートフォリオを積極的に拡充しています。"},strengthsTitle:"化学事業のコアコンピタンス",strengths:[{num:"01",title:"グローバル調達ネットワーク",desc:"日本、東南アジア、米国、欧州などの大手化学メーカーと強固なパートナーシップを結び、市況変動下でも安定供給を保証します。"},{num:"02",title:"高機能スペシャリティ化学提案",desc:"汎用原料にとどまらず、半導体プロセス、二次電池、モビリティ分野に不可欠な超高純度スペシャリティケミカルを発掘・提案します。"},{num:"03",title:"専門化学物流＆法規制コンプライアンス",desc:"危険物海上輸送基準（IMDG）や韓国化学物質登録評価法・管理法に準拠した厳格な管理体制と専門貯蔵インフラを完備しています。"}],lineupTitle:"主要取扱分野",lineup:[{tag:"Chemical Sector 01",title:"基礎化学品＆合成樹脂原料",desc:"産業全般の基礎となるオレフィン系・芳香族系の基礎留分および汎用・エンプラ樹脂です。",specs:["PE、PP、ABS、PC合成樹脂","モノマー、溶剤、可塑剤および中間体"]},{tag:"Chemical Sector 02",title:"精密化学品＆電子材料添加剤",desc:"ディスプレイ、半導体、高機能塗料などに用いられる高付加価値精密化学原料と機能性添加剤です。",specs:["シリコーンオイル＆変性シリコーン樹脂","UV硬化剤、帯電防止剤、酸化防止剤"]},{tag:"Chemical Sector 03",title:"環境配慮バイオマス＆循環型素材",desc:"ESG経営および脱炭素に向けた植物由来バイオプラスチックや再生リサイクル樹脂群です。",specs:["PLA、PHA生分解性樹脂","PCR（使用済み回収再生）樹脂"]}],tableTitle:"品目別の用途および包装規格",tableHeaders:["品目群","主要対象産業","代表製品名","供給単位・包装"],tableRows:[{group:"高機能性樹脂",industry:"自動車軽量化、電気・電子ハウジング",product:"エンジニアリングプラスチックコンパウンド",pack:"25kg Bag, 500kg Jumbo Bag"},{group:"精密溶剤・モノマー",industry:"塗料、接着剤、印刷インク製造",product:"アクリル系モノマー、高純度エステル",pack:"200L Drum, ISO Tank コンテナ"},{group:"バイオプラスチック",industry:"食品包装材、使い捨て代替容器",product:"植物由来生分解性コンパウンドレジン",pack:"25kg Bag, コンテナ FCL"}],cta:{title:"化学原料のお見積りおよび技術資料(TDS/MSDS)請求",desc:"ご希望のスペック、数量、納期条件をお知らせいただければ、専門トレーダーが最適なご提案を差し上げます。",btn:"お問い合わせ"}},en:{banner:{categoryTitle:"Business Divisions",categoryEn:"BUSINESS DIVISIONS",pageTitle:"Chemicals",pageDescription:"Global chemical trading solutions driving future industries from fine chemicals to eco-friendly materials."},tabs:[{name:"All Businesses",url:"/service"},{name:"Care Food",url:"/food"},{name:"Safes & Security",url:"/money"},{name:"Living Goods",url:"/product"},{name:"Chemicals",url:"/chemical"}],intro:{badge:"ADVANCED CHEMICALS",title:"From Industrial Fundamentals to High-Tech Frontiers<br /><strong>Global Chemical Trading</strong> Solutions",desc:"Our Chemical Division stably sources and distributes basic petrochemical fractions and high-performance specialty chemicals for automotive, electronics, rechargeable batteries, and construction industries. We are actively expanding next-generation sustainable portfolios including biomass plastics and biodegradable resins to support carbon-neutral ESG goals."},strengthsTitle:"Core Competencies in Chemicals",strengths:[{num:"01",title:"Global Sourcing Network",desc:"Securing stable supply even under market fluctuations through strategic partnerships across Japan, Southeast Asia, the US, and Europe."},{num:"02",title:"High-Performance Specialties",desc:"Offering ultra-high-purity specialty chemicals tailored for semiconductor manufacturing, secondary batteries, and advanced mobility."},{num:"03",title:"Specialized Chemical Logistics & Compliance",desc:"Equipped with dedicated hazmat storage and rigorous compliance adhering to IMDG regulations and Korean K-REACH / CCA laws."}],lineupTitle:"Key Chemical Sectors",lineup:[{tag:"Chemical Sector 01",title:"Basic Chemicals & Synthetic Resins",desc:"Olefin and aromatic fractions, as well as general-purpose and engineering plastic resins serving as foundational industrial feedstocks.",specs:["PE, PP, ABS, PC Synthetic Resins","Monomers, Solvents, Plasticizers & Intermediates"]},{tag:"Chemical Sector 02",title:"Fine Chemicals & Electronic Additives",desc:"High-value specialty materials and functional additives formulated for displays, semiconductor processes, and advanced coatings.",specs:["Silicone Oils & Modified Silicone Resins","UV Curatives, Antistatic Agents, Antioxidants"]},{tag:"Chemical Sector 03",title:"Bio-based & Circular Materials",desc:"Plant-derived bioplastics and recycled PCR resins designed to advance circular economy and carbon emission reductions.",specs:["PLA, PHA Biodegradable Resins","Post-Consumer Recycled (PCR) Resins"]}],tableTitle:"Product Applications & Packaging",tableHeaders:["Category","Target Industries","Representative Products","Packaging / Unit"],tableRows:[{group:"High-Performance Resins",industry:"Automotive lightweighting, electrical/electronic housings",product:"Engineering Plastic Compounds",pack:"25kg Bag, 500kg Jumbo Bag"},{group:"Fine Solvents & Monomers",industry:"Paints, adhesives, printing ink manufacturing",product:"Acrylic Monomers, High-Purity Esters",pack:"200L Drum, ISO Tank Container"},{group:"Bio-Plastics",industry:"Food packaging, eco containers",product:"Plant-Derived Biodegradable Compounds",pack:"25kg Bag, Container FCL"}],cta:{title:"Chemical Quote & Technical Data (TDS/MSDS) Request",desc:"Please submit your specifications, volume requirements, and delivery timeline for a custom solution from our traders.",btn:"Contact Us"}}},t=st(()=>e[Fe.value]||e.ja);return(i,s)=>{const r=rn("router-link");return $(),It(an,{"category-title":t.value.banner.categoryTitle,"category-en":t.value.banner.categoryEn,"category-url":"/service","page-title":t.value.banner.pageTitle,"page-description":t.value.banner.pageDescription,"hero-image":"/images/main/slide-main-chemical.png",tabs:t.value.tabs},{default:Ve(()=>[d("div",tR,[d("div",nR,[d("div",iR,[d("img",{src:eR,alt:t.value.intro.badge,class:"intro-img"},null,8,sR)]),d("div",rR,[d("span",aR,N(t.value.intro.badge),1),d("h2",{class:"intro-title",innerHTML:t.value.intro.title},null,8,oR),d("p",lR,N(t.value.intro.desc),1)])]),d("section",cR,[d("h3",uR,N(t.value.strengthsTitle),1),d("div",dR,[($(!0),ee(Le,null,Ke(t.value.strengths,a=>($(),ee("div",{key:a.num,class:"strength-card"},[d("div",fR,N(a.num),1),d("h4",null,N(a.title),1),d("p",null,N(a.desc),1)]))),128))])]),d("section",hR,[d("h3",pR,N(t.value.lineupTitle),1),d("div",mR,[($(!0),ee(Le,null,Ke(t.value.lineup,a=>($(),ee("div",{key:a.tag,class:"lineup-item"},[d("div",gR,[d("span",_R,N(a.tag),1),d("h4",null,N(a.title),1)]),d("p",vR,N(a.desc),1),d("ul",xR,[($(!0),ee(Le,null,Ke(a.specs,o=>($(),ee("li",{key:o},N(o),1))),128))])]))),128))])]),d("section",yR,[d("h3",SR,N(t.value.tableTitle),1),d("div",bR,[d("table",MR,[d("thead",null,[d("tr",null,[($(!0),ee(Le,null,Ke(t.value.tableHeaders,a=>($(),ee("th",{key:a},N(a),1))),128))])]),d("tbody",null,[($(!0),ee(Le,null,Ke(t.value.tableRows,a=>($(),ee("tr",{key:a.group},[d("th",ER,N(a.group),1),d("td",null,N(a.industry),1),d("td",null,N(a.product),1),d("td",null,N(a.pack),1)]))),128))])])])]),d("div",TR,[d("div",AR,[d("h4",null,N(t.value.cta.title),1),d("p",null,N(t.value.cta.desc),1)]),Xe(r,{to:"/quiry",class:"btn-primary-mitsui"},{default:Ve(()=>[ht(N(t.value.cta.btn)+" →",1)]),_:1})])])]),_:1},8,["category-title","category-en","page-title","page-description","tabs"])}}},CR={class:"company-index-page"},RR={class:"company-intro-box"},PR={class:"company-intro-text"},IR={class:"company-cards-grid"},LR={class:"card-thumb-wrap"},DR=["src","alt"],NR={class:"card-content-wrap"},UR={class:"card-main-title"},OR={class:"card-description"},FR={__name:"ContactIndex",setup(n){const e={ko:{categoryTitle:"연락처",categoryEn:"CONTACT US",categoryUrl:"/contact",pageTitle:"연락처",tabs:[{name:"문의사항",url:"/quiry"},{name:"오시는길",url:"/location"}],introText:"아자미노에 관심을 가져주셔서 감사합니다. 비즈니스 제휴 및 제품 문의사항이 있으시면 언제든지 편하게 문의해 주시기 바랍니다.",cards:[{title:"온라인 문의",desc:"개호식품, 금고, 생활용품, 화학제품 등 비즈니스 제휴 및 제품에 관한 문의를 남겨주시면 신속히 답변해 드립니다.",image:"/images/card/main-card-3.png",url:"/quiry"},{title:"오시는 길",desc:"아자미노 본사 및 글로벌 비즈니스 거점의 상세 위치와 교통편 안내입니다.",image:"/images/company/company-location.jpg",url:"/location"}]},ja:{categoryTitle:"お問い合わせ",categoryEn:"CONTACT US",categoryUrl:"/contact",pageTitle:"お問い合わせ",tabs:[{name:"お問い合わせ",url:"/quiry"},{name:"アクセス",url:"/location"}],introText:"アザミノに関心をお寄せいただき、誠にありがとうございます。ビジネス提携や製品に関するお問い合わせがございましたら、お気軽にご連絡ください。",cards:[{title:"お問い合わせ",desc:"介護食品、金庫、生活用品、化学品など、各種ビジネス提携や製品に関するご相談を承っております。",image:"/images/card/main-card-3.png",url:"/quiry"},{title:"拠点",desc:"本社およびグローバルビジネス拠点の所在地・交通アクセスをご案内いたします。",image:"/images/company/company-location.jpg",url:"/location"}]},en:{categoryTitle:"Contact Us",categoryEn:"CONTACT US",categoryUrl:"/contact",pageTitle:"Contact Us",tabs:[{name:"Inquiry",url:"/quiry"},{name:"Location",url:"/location"}],introText:"Thank you for your interest in AZAMINO. Please feel free to reach out to us regarding business partnerships and product inquiries.",cards:[{title:"Inquiry",desc:"Leave an inquiry regarding our senior care food, security safes, lifestyle goods, or chemical supplies.",image:"/images/card/main-card-3.png",url:"/quiry"},{title:"Locations",desc:"Information about our headquarters location, contact details, and global office presences.",image:"/images/company/company-location.jpg",url:"/location"}]}},t=st(()=>e[Fe.value]||e.ja);return(i,s)=>{const r=rn("router-link");return $(),It(an,{"category-title":t.value.categoryTitle,"category-en":t.value.categoryEn,"category-url":t.value.categoryUrl,"page-title":t.value.pageTitle,"hero-image":"/images/tokyo-tower-bg.jpg",tabs:t.value.tabs},{default:Ve(()=>[d("div",CR,[d("div",RR,[d("p",PR,N(t.value.introText),1)]),d("div",IR,[($(!0),ee(Le,null,Ke(t.value.cards,a=>($(),ee("article",{key:a.title,class:"company-feature-card"},[Xe(r,{to:a.url,class:"card-inner-link"},{default:Ve(()=>[d("div",LR,[d("img",{src:a.image,alt:a.title,class:"card-thumb-img"},null,8,DR)]),d("div",NR,[d("h3",UR,N(a.title),1),d("p",OR,N(a.desc),1)])]),_:2},1032,["to"])]))),128))])])]),_:1},8,["category-title","category-en","category-url","page-title","tabs"])}}},BR={class:"quiry-page"},kR={class:"sub-headline-box"},HR={class:"sub-main-title"},GR={class:"section-intro"},VR={class:"quiry-layout-grid"},zR={class:"inquiry-form-card"},WR={class:"form-row"},$R={class:"form-group"},XR={for:"companyName",class:"form-label"},qR=["placeholder"],YR={class:"form-group"},KR={for:"userName",class:"form-label required"},ZR=["placeholder"],JR={class:"form-row"},QR={class:"form-group"},jR={for:"userEmail",class:"form-label required"},eP=["placeholder"],tP={class:"form-group"},nP={for:"userPhone",class:"form-label required"},iP=["placeholder"],sP={class:"form-group"},rP={for:"inquiryTitle",class:"form-label required"},aP=["placeholder"],oP={class:"form-group"},lP={for:"inquiryMessage",class:"form-label required"},cP=["placeholder"],uP={class:"form-privacy-box"},dP={class:"checkbox-label"},fP={class:"privacy-notice"},hP={class:"form-actions"},pP=["disabled"],mP={key:0},gP={key:1},_P={key:0,class:"inquiry-error-alert"},vP={__name:"Quiry",setup(n){const e={ko:{banner:{categoryTitle:"연락처",categoryEn:"CONTACT US",pageTitle:"문의사항"},tabs:[{name:"문의사항",url:"/quiry"},{name:"오시는길",url:"/location"}],headline:{badge:"ONLINE INQUIRY",title:"온라인 비즈니스 문의",intro:"언제든 편하게 연락주세요"},form:{categoryLabel:"문의 부문",categories:[{val:"food",label:"개호식품"},{val:"money",label:"금고"},{val:"product",label:"생활용품"},{val:"chemical",label:"화학제품"},{val:"general",label:"기타/일반제휴"}],companyLabel:"회사",companyPlaceholder:"azamino",nameLabel:"담당자",namePlaceholder:"홍길동",emailLabel:"이메일",emailPlaceholder:"azamino.ltd@gmail.com",phoneLabel:"연락처",phonePlaceholder:"010-1234-5678",titleLabel:"문의 제목",titlePlaceholder:"문의내용을 입력해주세요",messageLabel:"문의 내용",messagePlaceholder:"문의하고자 하는 내용을 적어주세요",privacyConsent:"개인정보 수집 및 이용에 동의합니다. (필수)",privacyNotice:"수집 항목: 회사명, 성명, 이메일, 연락처 | 수집 목적: 고객 문의 응대 및 상담 안내 | 보유 기간: 상담 종료 후 1년간 보관 후 파기",submitBtn:"문의 등록하기",submittingBtn:"접수 처리 중",successTitle:"문의가 정상적으로 전송되었습니다.",successDesc:"문의 내용이 발송되었습니다.",errorTitle:"전송 중 문제가 발생했습니다."}},ja:{banner:{categoryTitle:"お問い合わせ",categoryEn:"CONTACT US",pageTitle:"オンラインお問い合わせ",pageDescription:"製品の導入やビジネスパートナーシップに関するお問い合わせを承っております。"},tabs:[{name:"お問い合わせ",url:"/quiry"},{name:"アクセス",url:"/location"}],headline:{badge:"ONLINE INQUIRY",title:"オンラインお問い合わせ",intro:"お気軽にご相談・お問い合わせください。"},form:{categoryLabel:"お問い合わせ項目",categories:[{val:"food",label:"介護食品"},{val:"money",label:"金庫ソリューション"},{val:"product",label:"生活用品"},{val:"chemical",label:"化学品"},{val:"general",label:"その他・提携"}],companyLabel:"貴社名",companyPlaceholder:"AZAMINO Inc.",nameLabel:"ご担当者様名",namePlaceholder:"椿 涼介",emailLabel:"メールアドレス",emailPlaceholder:"azamino.ltd@gmail.com",phoneLabel:"お電話番号",phonePlaceholder:"+82-2-1234-5678",titleLabel:"件名",titlePlaceholder:"お問い合わせの件名を入力してください",messageLabel:"お問い合わせ内容",messagePlaceholder:"詳細な内容をご記入ください",privacyConsent:"個人情報の収集および利用に同意します。(必須)",privacyNotice:"収集項目: 会社名、氏名、メールアドレス、連絡先 | 目的: お問い合わせへの対応およびご案内 | 保管期間: 1年間",submitBtn:"お問い合わせを送信する",submittingBtn:"送信処理中",successTitle:"お問い合わせを正常に受け付けました。",successDesc:"担当者にて内容を確認の上、速やかにご連絡申し上げます。",errorTitle:"送信中にエラーが発生しました。"}},en:{banner:{categoryTitle:"Contact Us",categoryEn:"CONTACT US",pageTitle:"Online Inquiry",pageDescription:"Please submit your inquiry regarding products or business partnerships."},tabs:[{name:"Inquiry",url:"/quiry"},{name:"Location",url:"/location"}],headline:{badge:"ONLINE INQUIRY",title:"Online Business Inquiry",intro:"Please feel free to reach out to us at any time."},form:{categoryLabel:"Inquiry Category",categories:[{val:"food",label:"Care Food"},{val:"money",label:"Safes Solution"},{val:"product",label:"Living Goods"},{val:"chemical",label:"Chemical Products"},{val:"general",label:"General / Partnership"}],companyLabel:"Company / Organization",companyPlaceholder:"AZAMINO Inc.",nameLabel:"Contact Person",namePlaceholder:"NAME",emailLabel:"Email",emailPlaceholder:"azamino.ltd@gmail.com",phoneLabel:"Phone Number",phonePlaceholder:"+82-10-1234-5678",titleLabel:"Subject",titlePlaceholder:"Enter the subject of your inquiry",messageLabel:"Message",messagePlaceholder:"Please describe your inquiry in detail",privacyConsent:"I agree to the collection and use of personal information.",privacyNotice:"Collected items: Company, Name, Email, Phone | Purpose: Responding to inquiry | Retention: 1 year",submitBtn:"Submit Inquiry",submittingBtn:"Submitting",successTitle:"Your inquiry has been submitted successfully.",successDesc:"Our representative will review your message and get back to you shortly.",errorTitle:"An error occurred during submission."}}},t=st(()=>e[Fe.value]||e.ja),i=Or({category:"food",company:"",name:"",email:"",phone:"",title:"",message:"",agreePrivacy:!1}),s=Nt(!1),r=Nt(!1),a=Nt(""),o=async()=>{s.value=!0,r.value=!1,a.value="";try{const l=await fetch("/api/inquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}),c=await l.json();if(!l.ok||!c.success)throw new Error(c.error||(Fe.value==="ko"?"서버 응답 오류가 발생했습니다.":"Server response error."));r.value=!0,i.company="",i.name="",i.email="",i.phone="",i.title="",i.message="",i.agreePrivacy=!1}catch(l){a.value=l.message||(Fe.value==="ko"?"전송 중 오류가 발생했습니다. 다시 시도해주세요.":"An error occurred.")}finally{s.value=!1}};return(l,c)=>($(),It(an,{"category-title":t.value.banner.categoryTitle,"category-en":t.value.banner.categoryEn,"category-url":"/contact","page-title":t.value.banner.pageTitle,"page-description":t.value.banner.pageDescription,"hero-image":"/images/company/business-innovation.jpg",tabs:t.value.tabs},{default:Ve(()=>[d("div",BR,[d("div",kR,[d("h2",HR,N(t.value.headline.title),1),d("p",GR,N(t.value.headline.intro),1)]),d("div",VR,[d("div",zR,[d("form",{onSubmit:xr(o,["prevent"]),class:"inquiry-form"},[d("div",WR,[d("div",$R,[d("label",XR,N(t.value.form.companyLabel),1),Yi(d("input",{type:"text",id:"companyName","onUpdate:modelValue":c[0]||(c[0]=u=>i.company=u),placeholder:t.value.form.companyPlaceholder,class:"form-input"},null,8,qR),[[vs,i.company]])]),d("div",YR,[d("label",KR,N(t.value.form.nameLabel),1),Yi(d("input",{type:"text",id:"userName","onUpdate:modelValue":c[1]||(c[1]=u=>i.name=u),placeholder:t.value.form.namePlaceholder,class:"form-input",required:""},null,8,ZR),[[vs,i.name]])])]),d("div",JR,[d("div",QR,[d("label",jR,N(t.value.form.emailLabel),1),Yi(d("input",{type:"email",id:"userEmail","onUpdate:modelValue":c[2]||(c[2]=u=>i.email=u),placeholder:t.value.form.emailPlaceholder,class:"form-input",required:""},null,8,eP),[[vs,i.email]])]),d("div",tP,[d("label",nP,N(t.value.form.phoneLabel),1),Yi(d("input",{type:"tel",id:"userPhone","onUpdate:modelValue":c[3]||(c[3]=u=>i.phone=u),placeholder:t.value.form.phonePlaceholder,class:"form-input",required:""},null,8,iP),[[vs,i.phone]])])]),d("div",sP,[d("label",rP,N(t.value.form.titleLabel),1),Yi(d("input",{type:"text",id:"inquiryTitle","onUpdate:modelValue":c[4]||(c[4]=u=>i.title=u),placeholder:t.value.form.titlePlaceholder,class:"form-input",required:""},null,8,aP),[[vs,i.title]])]),d("div",oP,[d("label",lP,N(t.value.form.messageLabel),1),Yi(d("textarea",{id:"inquiryMessage","onUpdate:modelValue":c[5]||(c[5]=u=>i.message=u),rows:"6",placeholder:t.value.form.messagePlaceholder,class:"form-textarea",required:""},null,8,cP),[[vs,i.message]])]),d("div",uP,[d("label",dP,[Yi(d("input",{type:"checkbox","onUpdate:modelValue":c[6]||(c[6]=u=>i.agreePrivacy=u),required:""},null,512),[[Hg,i.agreePrivacy]]),d("span",null,N(t.value.form.privacyConsent),1)]),d("p",fP,N(t.value.form.privacyNotice),1)]),d("div",hP,[d("button",{type:"submit",class:"btn-submit-inquiry",disabled:s.value},[s.value?($(),ee("span",gP,N(t.value.form.submittingBtn),1)):($(),ee("span",mP,N(t.value.form.submitBtn)+" →",1))],8,pP)]),a.value?($(),ee("div",_P,[c[7]||(c[7]=d("span",{class:"error-icon"},"✕",-1)),d("div",null,[d("strong",null,N(t.value.form.errorTitle),1),d("p",null,N(a.value),1)])])):Bt("",!0)],32)])])])]),_:1},8,["category-title","category-en","page-title","page-description","tabs"]))}},xP={class:"location-page"},yP={class:"sub-headline-box"},SP={class:"sub-main-title"},bP={class:"section-intro"},MP={class:"section-block"},EP={class:"section-sub-title"},TP={class:"profile-table-wrap"},AP={class:"mitsui-style-table"},wP={scope:"row",style:{width:"24%"}},dl="https://maps.google.com/maps?q=35.633931,139.691578&t=&z=17&ie=UTF8&iwloc=&output=embed",fl="https://www.google.com/maps/search/?api=1&query=35.633931,139.691578",CP={__name:"Location",setup(n){const e=st(()=>Fe.value==="ja"?[{name:"お問い合わせ",url:"/quiry"},{name:"アクセス",url:"/location"}]:Fe.value==="en"?[{name:"Inquiry",url:"/quiry"},{name:"Location",url:"/location"}]:[{name:"문의사항",url:"/quiry"},{name:"오시는길",url:"/location"}]),t={ko:{banner:{categoryTitle:"연락처",categoryEn:"CONTACT US",pageTitle:"오시는길",pageDescription:"아자미노 본사로 찾아오시는 길을 안내해 드립니다."},office:{badge:"HEAD OFFICE",title:"본사 위치 안내",intro:"도쿄도 메구로구 중심권에 위치하여 편리한 대중교통 인프라를 갖추고 있습니다.",address:"〒153-0065 東京都目黒区中町２丁目４７−５ 目黒セントラルマンション",addressSub:"도쿄도 메구로구 나카초 2-47-5 메구로 센트럴 맨션",mapEmbedUrl:dl,mapExternalUrl:fl,buttonText:"Google Maps에서 보기"},tableSectionTitle:"소재지 및 연락처 상세",tableRows:[{th:"소재지",td:"〒153-0065 일본 도쿄도 메구로구 나카초 2-47-5 메구로 센트럴 맨션 (〒153-0065 東京都目黒区中町２丁目４７−５ 目黒セントラルマンション)"},{th:"대표 전화",td:"03-5543-0382"},{th:"팩스 (FAX)",td:"03-5542-0387"},{th:"이메일",td:"azamino.ltd@gmail.com"}]},ja:{banner:{categoryTitle:"お問い合わせ",categoryEn:"CONTACT US",pageTitle:"アクセス",pageDescription:"AZAMINO株式会社本社へのアクセスをご案内いたします。"},office:{badge:"HEAD OFFICE",title:"本社所在地・アクセス",intro:"東京都目黒区に位置し、利便性の高い交通アクセスを備えております。",address:"〒153-0065 東京都目黒区中町２丁目４７−５ 目黒セントラルマンション",addressSub:"",mapEmbedUrl:dl,mapExternalUrl:fl,buttonText:"Google マップで見る"},tableSectionTitle:"所在地および連絡先詳細",tableRows:[{th:"所在地",td:"〒153-0065 東京都目黒区中町２丁目４７−５ 目黒セントラルマンション"},{th:"代表電話",td:"03-5543-0382"},{th:"FAX",td:"03-5542-0387"},{th:"Eメール",td:"azamino.ltd@gmail.com"}],transportSectionTitle:"公共交通機関のご案内"},en:{banner:{categoryTitle:"Contact Us",categoryEn:"CONTACT US",pageTitle:"Location",pageDescription:"Directions and contact details for AZAMINO Inc. headquarters."},office:{badge:"HEAD OFFICE",title:"Headquarters Location",intro:"Conveniently accessible in Meguro-ku, Tokyo with comprehensive transit connections.",address:"Meguro Central Mansion, 2-47-5 Nakamachi, Meguro-ku, Tokyo 153-0065, Japan",addressSub:"",mapEmbedUrl:dl,mapExternalUrl:fl,buttonText:"View on Google Maps"},tableSectionTitle:"Address & Contact Details",tableRows:[{th:"Address",td:"Meguro Central Mansion, 2-47-5 Nakamachi, Meguro-ku, Tokyo 153-0065, Japan"},{th:"Telephone",td:"03-5543-0382"},{th:"Fax",td:"03-5542-0387"},{th:"Email",td:"azamino.ltd@gmail.com"}]}},i=st(()=>t[Fe.value]||t.ja);return(s,r)=>($(),It(an,{"category-title":i.value.banner.categoryTitle,"category-en":i.value.banner.categoryEn,"category-url":"/contact","page-title":i.value.banner.pageTitle,"page-description":i.value.banner.pageDescription,"hero-image":"/images/main/slide-main-tokyo.jpg",tabs:e.value},{default:Ve(()=>[d("div",xP,[r[1]||(r[1]=d("div",{class:"company-lang-toggle-wrap"},null,-1)),d("div",yP,[d("h2",SP,N(i.value.office.title),1),r[0]||(r[0]=d("div",{class:"sub-title-bar"},null,-1)),d("p",bP,N(i.value.office.intro),1)]),r[2]||(r[2]=d("div",{class:"location-map-wrap"},null,-1)),d("section",MP,[d("h3",EP,N(i.value.tableSectionTitle),1),d("div",TP,[d("table",AP,[d("tbody",null,[($(!0),ee(Le,null,Ke(i.value.tableRows,a=>($(),ee("tr",{key:a.th},[d("th",wP,N(a.th),1),d("td",null,N(a.td),1)]))),128))])])])])])]),_:1},8,["category-title","category-en","page-title","page-description","tabs"]))}},RP=hn(CP,[["__scopeId","data-v-1f881b47"]]),PP={class:"mitsui-sitemap-wrap"},IP={class:"sitemap-section-title"},LP={class:"sitemap-links-row"},DP={key:0,class:"sitemap-separator"},NP={__name:"Sitemap",setup(n){const e={ko:{categoryTitle:"사이트 안내",categoryEn:"SITEMAP",pageTitle:"사이트맵",desc:"AZAMINO 웹사이트의 전체 메뉴 및 사이트 구성을 한눈에 확인하실 수 있습니다.",categories:[{id:"company",num:"01",title:"회사정보",en:"Company Information",mainUrl:"/information",links:[{name:"회사정보 메인",url:"/information"},{name:"인사말",url:"/greeting"},{name:"경영이념",url:"/overview"}]},{id:"service",num:"02",title:"사업소개",en:"Business Divisions",mainUrl:"/service",links:[{name:"사업소개 전체",url:"/service"},{name:"개호식품",url:"/food"},{name:"금고",url:"/money"},{name:"생활용품",url:"/product"},{name:"화학제품",url:"/chemical"}]},{id:"contact",num:"03",title:"연락처",en:"Contact & Access",mainUrl:"/contact",links:[{name:"온라인 문의",url:"/quiry"},{name:"오시는 길 (본사 위치)",url:"/location"}]},{id:"legal",num:"04",title:"정책 및 약관",en:"Legal & Policy",mainUrl:"/privacy",links:[{name:"이용약관",url:"/terms"},{name:"개인정보처리방침",url:"/privacy"},{name:"이메일무단수집거부",url:"/email-policy"}]}]},ja:{categoryTitle:"サイト案内",categoryEn:"SITEMAP",pageTitle:"サイトマップ",desc:"AZAMINOのウェブサイト構成および主要ページのご案内です。",categories:[{id:"company",num:"01",title:"会社情報",en:"Company Information",mainUrl:"/information",links:[{name:"会社情報トップ",url:"/information"},{name:"ご挨拶",url:"/greeting"},{name:"企業理念",url:"/overview"}]},{id:"service",num:"02",title:"事業紹介",en:"Business Divisions",mainUrl:"/service",links:[{name:"事業紹介トップ",url:"/service"},{name:"介護食品",url:"/food"},{name:"金庫",url:"/money"},{name:"生活用品",url:"/product"},{name:"化学製品",url:"/chemical"}]},{id:"contact",num:"03",title:"お問い合わせ",en:"Contact & Access",mainUrl:"/contact",links:[{name:"オンラインお問い合わせ",url:"/quiry"},{name:"アクセス（所在地案内）",url:"/location"}]},{id:"legal",num:"04",title:"ポリシー・規約",en:"Legal & Policy",mainUrl:"/privacy",links:[{name:"利用規約",url:"/terms"},{name:"個人情報保護方針",url:"/privacy"},{name:"メールアドレス無断収集拒否",url:"/email-policy"}]}]},en:{categoryTitle:"Site Information",categoryEn:"SITEMAP",pageTitle:"Sitemap",desc:"An organized overview of all sections and pages on the AZAMINO website.",categories:[{id:"company",num:"01",title:"Company",en:"Company Information",mainUrl:"/information",links:[{name:"Company Info Top",url:"/information"},{name:"CEO Message",url:"/greeting"},{name:"Corporate Philosophy",url:"/overview"}]},{id:"service",num:"02",title:"Business",en:"Business Divisions",mainUrl:"/service",links:[{name:"All Business Divisions",url:"/service"},{name:"Care Food Solutions",url:"/food"},{name:"Safes & Security",url:"/money"},{name:"Living Goods",url:"/product"},{name:"Advanced Chemicals",url:"/chemical"}]},{id:"contact",num:"03",title:"Contact",en:"Contact & Access",mainUrl:"/contact",links:[{name:"Online Inquiry",url:"/quiry"},{name:"Location & Head Office",url:"/location"}]},{id:"legal",num:"04",title:"Legal & Policy",en:"Legal & Policy",mainUrl:"/privacy",links:[{name:"Terms of Use",url:"/terms"},{name:"Privacy Policy",url:"/privacy"},{name:"Email Collection Policy",url:"/email-policy"}]}]}},t=st(()=>e[Fe.value]||e.ja);return(i,s)=>{const r=rn("router-link");return $(),It(an,{"category-title":t.value.categoryTitle,"category-en":t.value.categoryEn,"page-title":t.value.pageTitle,"page-description":t.value.desc,"hero-image":"/images/company/business-innovation.jpg"},{default:Ve(()=>[d("div",PP,[($(!0),ee(Le,null,Ke(t.value.categories,a=>($(),ee("div",{key:a.id,class:"sitemap-section"},[d("h2",IP,[Xe(r,{to:a.mainUrl},{default:Ve(()=>[ht(N(a.title),1)]),_:2},1032,["to"])]),d("div",LP,[($(!0),ee(Le,null,Ke(a.links,(o,l)=>($(),ee(Le,{key:l},[Xe(r,{to:o.url,class:"sitemap-link"},{default:Ve(()=>[ht(N(o.name),1)]),_:2},1032,["to"]),l<a.links.length-1?($(),ee("span",DP,"｜")):Bt("",!0)],64))),128))])]))),128))])]),_:1},8,["category-title","category-en","page-title","page-description"])}}},UP=hn(NP,[["__scopeId","data-v-54976be3"]]),OP={class:"legal-mitsui-page"},FP={class:"legal-page-heading"},BP={class:"legal-inline-nav"},kP={key:0,class:"legal-nav-sep"},HP={class:"legal-intro-text"},GP={class:"legal-articles"},VP={class:"legal-article-title"},zP={class:"legal-article-body"},WP={class:"legal-enactment"},$P={__name:"Terms",setup(n){const e=st(()=>Fe.value==="ja"?[{name:"利用規約",url:"/terms"},{name:"個人情報保護方針",url:"/privacy"},{name:"メール無断収集拒否",url:"/email-policy"}]:Fe.value==="en"?[{name:"Terms of Use",url:"/terms"},{name:"Privacy Policy",url:"/privacy"},{name:"Email Policy",url:"/email-policy"}]:[{name:"이용약관",url:"/terms"},{name:"개인정보처리방침",url:"/privacy"},{name:"이메일무단수집거부",url:"/email-policy"}]),t=st(()=>Fe.value==="ja"?{categoryTitle:"ポリシー・規約",categoryEn:"POLICY & TERMS",pageTitle:"利用規約",intro:"AZAMINO株式会社（以下「当社」）の公式ウェブサイトをご利用いただき、誠にありがとうございます。本ウェブサイトをご利用されるにあたり、以下の利用条件をよくお読みいただき、同意の上ご利用いただきますようお願い申し上げます。",articles:[{title:"1.著作権および知的財産権",paragraphs:["本ウェブサイトに掲載されている文章、画像、デザイン、ロゴマーク、プログラム等の著作権およびその他知的財産権は、当社または正当な権利を有する第三者に帰属します。","利用者は、私的使用その他法律によって明示的に認められる範囲を超えて、これらを無断で複製、転送、改変、配布することはできません。"]},{title:"2.免責事項",paragraphs:["当社は、本ウェブサイトに情報を掲載するにあたり細心の注意を払っておりますが、その正確性、有用性、確実性についてはいかなる保証も行うものではありません。","本ウェブサイトの利用または利用不能により生じた一切の損害について、当社は法律に別段の定めがある場合を除き、責任を負いません。"]},{title:"3.リンクについて",paragraphs:["本ウェブサイトへのリンクは原則として自由ですが、公序良俗に反するサイトや当社の信用を毀損する恐れのあるサイトからのリンクはお断りいたします。"]},{title:"4.準拠法および管轄裁判所",paragraphs:["本ウェブサイトの利用ならびに本利用条件の解釈および適用は、別段の定めがない限り、日本法に準拠するものとします。また、本ウェブサイトに関わる一切の紛争については、東京地方裁判所を専属的合意管轄裁判所とします。"]}],enactment:`制定日：2024年1月24日
AZAMINO株式会社`}:Fe.value==="en"?{categoryTitle:"Policy & Terms",categoryEn:"POLICY & TERMS",pageTitle:"Terms of Use",intro:'Thank you for visiting the official website of AZAMINO Inc. (hereinafter referred to as "the Company"). Please read these Terms of Use carefully before accessing or using this website.',articles:[{title:"1. Copyright and Intellectual Property Rights",paragraphs:["All text, graphics, logos, images, and software on this website are the property of the Company or its content suppliers and are protected by applicable intellectual property laws.","You may not reproduce, distribute, modify, or create derivative works without prior written consent from the Company."]},{title:"2. Disclaimer",paragraphs:["While the Company endeavors to maintain the accuracy of all information on this website, we make no representations or warranties of any kind regarding completeness, accuracy, or suitability.","The Company shall not be liable for any direct or indirect damages arising out of the use or inability to use this website."]},{title:"3. Prohibited Actions",paragraphs:["Users must not violate applicable laws, infringe upon intellectual property, or conduct unauthorized attempts to access or disrupt our systems and services."]},{title:"4. Governing Law and Jurisdiction",paragraphs:["These Terms of Use shall be governed by and construed in accordance with the laws of Japan. Any disputes arising in connection with this website shall be submitted to the exclusive jurisdiction of the Tokyo District Court."]}],enactment:`Enacted: January 24, 2024
AZAMINO Inc.`}:{categoryTitle:"이용안내 및 정책",categoryEn:"POLICY & TERMS",pageTitle:"이용약관",intro:'AZAMINO Inc.(이하 "회사")의 공식 웹사이트를 방문해 주셔서 감사합니다. 본 웹사이트를 이용하시기 전에 아래의 이용 조건을 주의 깊게 확인하시고 동의하여 주시기 바랍니다.',articles:[{title:"1.목적 및 적용 범위",paragraphs:['본 약관은 회사가 운영하는 공식 웹사이트(이하 "사이트")의 제반 서비스 이용에 있어 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.',"이용자가 본 사이트를 계속하여 이용하는 경우 본 약관의 내용을 충분히 숙지하고 동의한 것으로 간주합니다."]},{title:"2.저작권 및 지적재산권",paragraphs:["본 사이트에 게재된 모든 텍스트, 이미지, 영상, CI/BI 로고, 제품 디자인 및 소프트웨어의 저작권과 지적재산권은 회사 및 해당 정당 권리자에게 귀속됩니다.","이용자는 회사의 사전 서면 승낙 없이 본 사이트의 정보를 무단 복제, 전송, 출판, 배포, 기타 영리 목적으로 이용하거나 제3자에게 제공할 수 없습니다."]},{title:"3.서비스 제공 및 면책",paragraphs:["회사는 최신의 정확한 정보를 제공하기 위해 최선을 다하나, 사이트에 포함된 정보의 완전성, 신뢰성에 대해 보증하지 아니하며 기술적 오류나 예기치 않은 시스템 중단에 대해 고의 또는 중과실이 없는 한 책임을 지지 않습니다.","회사는 사전 공지 후 사이트의 내용이나 서비스를 변경하거나 운영을 중단할 수 있습니다."]},{title:"4.준거법 및 관할법원",paragraphs:["본 약관 및 사이트 이용과 관련한 모든 분쟁에 대해서는 대한민국 법령을 준거법으로 하며, 분쟁 발생 시 회사의 본점 소재지를 관할하는 법원을 전속 관할법원으로 합니다."]}],enactment:`제정일자: 2024년 1월 24일
AZAMINO Inc.`});return(i,s)=>{const r=rn("router-link");return $(),It(an,{"category-title":t.value.categoryTitle,"category-en":t.value.categoryEn,"page-title":t.value.pageTitle,"hide-hero":!0},{default:Ve(()=>[d("div",OP,[d("h1",FP,N(t.value.pageTitle),1),d("nav",BP,[($(!0),ee(Le,null,Ke(e.value,(a,o)=>($(),ee(Le,{key:o},[Xe(r,{to:a.url,class:Dt(["legal-nav-link",{"is-current":a.url==="/terms"}])},{default:Ve(()=>[ht(N(a.name),1)]),_:2},1032,["to","class"]),o<e.value.length-1?($(),ee("span",kP,"｜")):Bt("",!0)],64))),128))]),d("p",HP,N(t.value.intro),1),d("div",GP,[($(!0),ee(Le,null,Ke(t.value.articles,(a,o)=>($(),ee("section",{key:o,class:"legal-article"},[d("h3",VP,N(a.title),1),d("div",zP,[($(!0),ee(Le,null,Ke(a.paragraphs,(l,c)=>($(),ee("p",{key:c},N(l),1))),128))])]))),128))]),d("div",WP,[d("p",null,N(t.value.enactment),1)])])]),_:1},8,["category-title","category-en","page-title"])}}},XP=hn($P,[["__scopeId","data-v-b35bcf2b"]]),qP={class:"legal-mitsui-page"},YP={class:"legal-page-heading"},KP={class:"legal-inline-nav"},ZP={key:0,class:"legal-nav-sep"},JP={class:"legal-intro-text"},QP={class:"legal-articles"},jP={class:"legal-article-title"},e3={class:"legal-article-body"},t3={class:"legal-enactment"},n3={class:"legal-sub-sections"},i3={class:"legal-sub-heading"},s3={key:0,class:"legal-sub-body"},r3={key:0,class:"legal-contact-section"},a3={class:"legal-sub-heading"},o3={class:"legal-contact-desc"},l3={class:"legal-contact-info"},c3={__name:"Privacy",setup(n){const e=st(()=>Fe.value==="ja"?[{name:"利用規約",url:"/terms"},{name:"個人情報保護方針",url:"/privacy"},{name:"メール無断収集拒否",url:"/email-policy"}]:Fe.value==="en"?[{name:"Terms of Use",url:"/terms"},{name:"Privacy Policy",url:"/privacy"},{name:"Email Policy",url:"/email-policy"}]:[{name:"이용약관",url:"/terms"},{name:"개인정보처리방침",url:"/privacy"},{name:"이메일무단수집거부",url:"/email-policy"}]),t=st(()=>Fe.value==="ja"?{categoryTitle:"ポリシー・規約",categoryEn:"POLICY & TERMS",pageTitle:"個人情報保護方針",intro:"AZAMINO株式会社（以下「当社」）は、高度情報通信社会における個人情報の重要性を認識し、個人情報の保護に関する法令および規範を遵守し、以下の方針に基づき個人情報の適正な管理と保護に努めます。",articles:[{title:"1.個人情報の取得、利用、提供",paragraphs:["当社は、適法かつ公正な手段によって、利用目的を明示した上で個人情報を取得いたします。取得した個人情報は、お問い合わせへの回答、製品およびサービスのご案内、契約の履行、その他事前に特定した目的の範囲内でのみ利用いたします。"]},{title:"2.安全対策の実施",paragraphs:["当社は、個人情報への不正アクセスについても、必要な安全性確保の対策を実施し、適切かつ合理的なレベルの安全対策を実施し、個人情報への不正アクセスや、個人情報の紛失、破壊、改ざん及び漏えい等の予防ならびに是正に努めます。"]},{title:"3.個人情報の第三者提供について",paragraphs:["当社は、法令に定める場合を除き、事前にご本人の同意を得ることなく、個人情報を第三者に開示・提供いたしません。"]},{title:"4.法令・規範の遵守",paragraphs:["当社は、個人情報の取扱いにおいて、個人情報保護に関して、変更するとともに、これを全従業者及び関連するグループ会社に周知させ適正に利用してまいります。"]},{title:"5.グローバル・グループベースでの推進",paragraphs:["当社は、グローバルベースで個人情報保護に活動を推進し、また、当社グループ全体としても同様の取り組みを推進してまいります。"]}],enactment:`2024年1月24日
AZAMINO株式会社`,subSections:[{heading:"個人情報の取扱いについて"},{heading:"プライバシーポリシー"}],contactTitle:"ご本人の個人情報に関するご相談窓口",contactDesc:"当社は、ご本人の個人情報の取扱・管理に関する苦情または相談があった場合には、当社の確認のうえ適切に対応いたします。なお以下について個人情報保護・管理者及び個人情報に関しては、相談窓口に連絡ください。",contactAddr:"〒153-0051 東京都目黒区上目黒1丁目26番1号",companyLabel:"事業者名",emailLabel:"お問い合わせ窓口"}:Fe.value==="en"?{categoryTitle:"Policy & Terms",categoryEn:"POLICY & TERMS",pageTitle:"Privacy Policy",intro:'AZAMINO Inc. (hereinafter referred to as "the Company") recognizes the importance of personal data and is committed to protecting user privacy in compliance with applicable data protection laws.',articles:[{title:"1. Lawful Collection of Information",paragraphs:["The Company collects personal data by fair and lawful means, specifying the purpose of use in advance. Personal information collected is utilized strictly for customer inquiry management, fulfillment of commercial agreements, and notification regarding our products and corporate services."]},{title:"2. Security Safeguards",paragraphs:["We implement reasonable organizational and technical security measures to safeguard personal data against unauthorized access, loss, alteration, or leakage."]},{title:"3. Provision to Third Parties",paragraphs:["The Company does not disclose or transfer personal data to third parties without prior consent, except where required by law."]},{title:"4. Compliance with Laws and Regulations",paragraphs:["We comply with all applicable laws and regulations regarding personal data protection and continuously review and improve our practices."]},{title:"5. Global Group-wide Commitment",paragraphs:["We promote personal data protection on a global basis and ensure the same standards across all group companies."]}],enactment:`January 24, 2024
AZAMINO Inc.`,subSections:[{heading:"Handling of Personal Information"},{heading:"Privacy Policy"}],contactTitle:"Contact for Privacy Inquiries",contactDesc:"If you have any questions regarding our handling of personal information, please contact our data governance office.",contactAddr:"Nakameguro Atlas Tower, 1-26-1 Kamimeguro, Meguro-ku, Tokyo, Japan",companyLabel:"Entity Name",emailLabel:"Inquiry Email"}:{categoryTitle:"이용안내 및 정책",categoryEn:"POLICY & TERMS",pageTitle:"개인정보처리방침",intro:'AZAMINO Inc.(이하 "당사")는 개인정보보호법 등 관련 법령을 철저히 준수하며, 정보주체의 소중한 개인정보를 안전하게 보호하고 권익을 보장하기 위해 다음과 같은 개인정보처리방침을 제정하여 운영하고 있습니다.',articles:[{title:"1.개인정보의 취득, 이용, 제공",paragraphs:["회사는 적법하고 공정한 수단에 의해 이용 목적을 명시한 후 개인정보를 취득합니다. 취득한 개인정보는 문의 응대, 제품 및 서비스 안내, 계약 이행 등 사전에 특정한 목적 범위 내에서만 이용합니다."]},{title:"2.안전 대책의 실시",paragraphs:["회사는 개인정보에 대한 부정 접근, 분실, 파괴, 변조 및 유출 등을 방지하기 위해 필요하고 적절한 수준의 안전 관리 조치를 실시하고, 예방 및 시정에 힘씁니다."]},{title:"3.개인정보의 제3자 제공",paragraphs:["회사는 법령에서 정하는 경우를 제외하고, 사전에 본인의 동의 없이 개인정보를 외부에 개시·제공하지 않습니다."]},{title:"4.법령·규범의 준수",paragraphs:["회사는 개인정보 취급에 있어 개인정보 보호에 관한 법령 및 규범을 준수하며, 이를 전 임직원 및 관련 그룹사에 주지하여 적정하게 운영해 나갑니다."]},{title:"5.글로벌·그룹 차원의 추진",paragraphs:["회사는 글로벌 차원에서 개인정보 보호 활동을 추진하고, 그룹 전체적으로도 동일한 수준의 보호 노력을 기울여 나갑니다."]}],enactment:`2024년 1월 24일
AZAMINO Inc.`,subSections:[{heading:"개인정보의 취급에 관하여"},{heading:"프라이버시 정책"}],contactTitle:"개인정보에 관한 상담 창구",contactDesc:"개인정보의 취급·관리에 관한 불만 또는 상담이 있으신 경우, 확인 후 적절히 대응합니다. 아래 담당 부서로 연락해 주시기 바랍니다.",contactAddr:"〒153-0051 도쿄도 메구로구 카미메구로 1-26-1",companyLabel:"회사명",emailLabel:"개인정보 담당 메일"});return(i,s)=>{const r=rn("router-link");return $(),It(an,{"category-title":t.value.categoryTitle,"category-en":t.value.categoryEn,"page-title":t.value.pageTitle,"hide-hero":!0},{default:Ve(()=>[d("div",qP,[d("h1",YP,N(t.value.pageTitle),1),d("nav",KP,[($(!0),ee(Le,null,Ke(e.value,(a,o)=>($(),ee(Le,{key:o},[Xe(r,{to:a.url,class:Dt(["legal-nav-link",{"is-current":a.url==="/privacy"}])},{default:Ve(()=>[ht(N(a.name),1)]),_:2},1032,["to","class"]),o<e.value.length-1?($(),ee("span",ZP,"｜")):Bt("",!0)],64))),128))]),d("p",JP,N(t.value.intro),1),d("div",QP,[($(!0),ee(Le,null,Ke(t.value.articles,(a,o)=>($(),ee("section",{key:o,class:"legal-article"},[d("h3",jP,N(a.title),1),d("div",e3,[($(!0),ee(Le,null,Ke(a.paragraphs,(l,c)=>($(),ee("p",{key:c},N(l),1))),128))])]))),128))]),d("div",t3,[d("p",null,N(t.value.enactment),1)]),d("div",n3,[($(!0),ee(Le,null,Ke(t.value.subSections,(a,o)=>($(),ee("section",{class:"legal-sub-section",key:o},[d("h2",i3,N(a.heading),1),a.body?($(),ee("div",s3,[($(!0),ee(Le,null,Ke(a.body,(l,c)=>($(),ee("p",{key:c},N(l),1))),128))])):Bt("",!0)]))),128))]),t.value.contactTitle?($(),ee("section",r3,[d("h2",a3,N(t.value.contactTitle),1),d("p",o3,N(t.value.contactDesc),1),s[2]||(s[2]=d("div",{class:"legal-contact-line"},null,-1)),d("div",l3,[d("p",null,N(t.value.contactAddr),1),d("p",null,[d("strong",null,N(t.value.companyLabel)+":",1),s[0]||(s[0]=ht(" AZAMINO Inc.",-1))]),d("p",null,[d("strong",null,N(t.value.emailLabel)+":",1),s[1]||(s[1]=ht(" azamino.ltd@gmail.co.jp",-1))])])])):Bt("",!0)])]),_:1},8,["category-title","category-en","page-title"])}}},u3=hn(c3,[["__scopeId","data-v-6e8335ef"]]),d3={class:"legal-mitsui-page"},f3={class:"legal-page-heading"},h3={class:"legal-inline-nav"},p3={key:0,class:"legal-nav-sep"},m3={class:"legal-intro-text"},g3={class:"legal-articles"},_3={class:"legal-article-title"},v3={class:"legal-article-body"},x3={class:"legal-enactment"},y3={key:0,class:"legal-contact-section"},S3={class:"legal-sub-heading"},b3={class:"legal-contact-desc"},M3={class:"legal-contact-info"},E3={__name:"EmailPolicy",setup(n){const e=st(()=>Fe.value==="ja"?[{name:"利用規約",url:"/terms"},{name:"個人情報保護方針",url:"/privacy"},{name:"メール無断収集拒否",url:"/email-policy"}]:Fe.value==="en"?[{name:"Terms of Use",url:"/terms"},{name:"Privacy Policy",url:"/privacy"},{name:"Email Policy",url:"/email-policy"}]:[{name:"이용약관",url:"/terms"},{name:"개인정보처리방침",url:"/privacy"},{name:"이메일무단수집거부",url:"/email-policy"}]),t=st(()=>Fe.value==="ja"?{categoryTitle:"ポリシー・規約",categoryEn:"POLICY & TERMS",pageTitle:"メールアドレス無断収集拒否",intro:"AZAMINO株式会社（以下「当社」）は、本ウェブサイトに掲載されている電子メールアドレスの無断収集および迷惑メールの送信を固くお断りいたします。",articles:[{title:"1.メールアドレスの無断収集の禁止",paragraphs:["本ウェブサイトに掲載されているいかなるメールアドレスも、当社の事前承諾なく、電子メール収集ソフトウェアその他の技術的手段により収集することを禁じます。","これを不正に収集し、営業・広告宣伝・勧誘その他の目的で迷惑メール（スパムメール）を送信する行為は固く禁止いたします。"]},{title:"2.違反時の対応",paragraphs:["無断収集および迷惑メールの送信が確認された場合、関係法令（特定電子メールの送信の適正化等に関する法律等）に基づき、しかるべき法的措置を講じることがあります。"]}],enactment:`制定日：2024年1月24日
AZAMINO株式会社`,contactTitle:"その他、当社商品、サービスに関するお問い合わせ先",contactDesc:"下記の「お問い合わせ」ページをご覧ください。",contactLinkText:"お問い合わせ"}:Fe.value==="en"?{categoryTitle:"Policy & Terms",categoryEn:"POLICY & TERMS",pageTitle:"Unauthorized Email Collection",intro:"AZAMINO Inc. strictly prohibits the unauthorized collection of email addresses published on this website using automated crawlers or scraping tools.",articles:[{title:"1. Prohibition of Unauthorized Extraction",paragraphs:["No email address listed on this website may be extracted or harvested using email collection programs, automated bots, or technical utilities without prior explicit consent.","Transmission of unsolicited commercial communications (spam) to any harvested address will result in technical blocking and legal action."]},{title:"2. Legal Recourse and Penalties",paragraphs:["Any violation may lead to civil injunctions and criminal complaints under relevant telecommunications and cyber protection statutes."]}],enactment:`Enacted: January 24, 2024
AZAMINO Inc.`,contactTitle:"Inquiries about our products and services",contactDesc:"Please visit our Inquiry page below.",contactLinkText:"Contact Us"}:{categoryTitle:"이용안내 및 정책",categoryEn:"POLICY & TERMS",pageTitle:"이메일무단수집거부",intro:"AZAMINO Inc.는 본 웹사이트에 게재된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 전면 거부합니다.",articles:[{title:"1.이메일 주소의 기술적 수집 거부",paragraphs:["본 웹사이트에 명시된 대표 이메일 및 임직원 이메일 주소는 고객 상담 및 비즈니스 문의를 위한 목적으로만 공개된 것입니다.","당사의 사전 동의 없이 이메일 추출 소프트웨어, 웹 크롤러 등 자동화된 기술적 장치를 활용하여 이메일 주소를 무단 수집하는 행위를 엄격히 금지합니다."]},{title:"2.스팸 메일 발송 및 상업적 악용 금지",paragraphs:["무단 수집된 이메일 주소를 이용하여 영리 목적의 광고성 정보(스팸 메일)를 전송하거나 제3자에게 판매·배포하는 행위를 일체 불허합니다."]},{title:"3.위반 시 관련 법령에 따른 법적 처벌 안내",paragraphs:["이를 위반하여 이메일 주소를 무단 수집하거나 광고성 정보를 전송할 경우, 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』 제50조의 2, 제50조의 7 등에 의거하여 1천만원 이하의 벌금형 또는 형사 처벌을 받을 수 있음을 엄중히 안내드립니다."]}],enactment:`게시일자: 2024년 1월 24일
AZAMINO Inc.`,contactTitle:"기타 당사 상품 및 서비스 관련 문의처",contactDesc:"아래 「온라인 문의」 페이지를 이용해 주시기 바랍니다.",contactLinkText:"온라인 문의"});return(i,s)=>{const r=rn("router-link");return $(),It(an,{"category-title":t.value.categoryTitle,"category-en":t.value.categoryEn,"page-title":t.value.pageTitle,"hide-hero":!0},{default:Ve(()=>[d("div",d3,[d("h1",f3,N(t.value.pageTitle),1),d("nav",h3,[($(!0),ee(Le,null,Ke(e.value,(a,o)=>($(),ee(Le,{key:o},[Xe(r,{to:a.url,class:Dt(["legal-nav-link",{"is-current":a.url==="/email-policy"}])},{default:Ve(()=>[ht(N(a.name),1)]),_:2},1032,["to","class"]),o<e.value.length-1?($(),ee("span",p3,"｜")):Bt("",!0)],64))),128))]),d("p",m3,N(t.value.intro),1),d("div",g3,[($(!0),ee(Le,null,Ke(t.value.articles,(a,o)=>($(),ee("section",{key:o,class:"legal-article"},[d("h3",_3,N(a.title),1),d("div",v3,[($(!0),ee(Le,null,Ke(a.paragraphs,(l,c)=>($(),ee("p",{key:c},N(l),1))),128))])]))),128))]),d("div",x3,[d("p",null,N(t.value.enactment),1)]),t.value.contactTitle?($(),ee("section",y3,[d("h2",S3,N(t.value.contactTitle),1),d("p",b3,N(t.value.contactDesc),1),s[0]||(s[0]=d("div",{class:"legal-contact-line"},null,-1)),d("div",M3,[Xe(r,{to:"/quiry",class:"legal-inquiry-link"},{default:Ve(()=>[ht(N(t.value.contactLinkText),1)]),_:1})])])):Bt("",!0)])]),_:1},8,["category-title","category-en","page-title"])}}},T3=hn(E3,[["__scopeId","data-v-ad15dbb6"]]),A3=[{path:"/",name:"Home",component:r1},{path:"/company",redirect:"/information"},{path:"/information",name:"Information",component:pA},{path:"/greeting",name:"Greeting",component:DA},{path:"/overview",name:"Overview",component:aw},{path:"/idea",redirect:"/overview"},{path:"/philosophy",redirect:"/overview"},{path:"/history",redirect:"/overview"},{path:"/ci",name:"Ci",component:ow},{path:"/service",name:"Service",component:Cw},{path:"/business",redirect:"/service"},{path:"/food",name:"Food",component:Jw},{path:"/healthyfood",redirect:"/food"},{path:"/money",name:"Money",component:TC},{path:"/product",name:"Product",component:jC},{path:"/chemical",name:"Chemical",component:wR},{path:"/contact",name:"Contact",component:FR},{path:"/quiry",name:"Quiry",component:vP},{path:"/location",name:"Location",component:RP},{path:"/sitemap",name:"Sitemap",component:UP},{path:"/terms",name:"Terms",component:XP},{path:"/privacy",name:"Privacy",component:u3},{path:"/email-policy",name:"EmailPolicy",component:T3},{path:"/email",redirect:"/email-policy"},{path:"/:pathMatch(.*)*",redirect:"/"}],w3=ov({history:k_(),routes:A3,scrollBehavior(n,e,t){return t||{top:0,behavior:"smooth"}}}),gp=Xg(w0);gp.use(w3);gp.mount("#app");
