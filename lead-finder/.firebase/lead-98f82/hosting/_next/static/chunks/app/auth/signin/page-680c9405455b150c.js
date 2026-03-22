(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[98],{7874:function(e,t,a){Promise.resolve().then(a.bind(a,7401))},7401:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return u}});var s=a(7437),i=a(2265),r=a(8777),o=a(699),l=a(4033),n=a(1396),d=a.n(n),c=a(5925);function u(){let{user:e,loading:t,signInWithGoogle:a}=(0,o.useAuth)(),n=(0,l.useRouter)(),[u,p]=(0,i.useState)(!1);(0,i.useEffect)(()=>{!t&&e&&n.push("/dashboard")},[e,t,n]);let m=async()=>{p(!0);try{await a(),c.default.success("Welcome back! Redirecting to dashboard..."),n.push("/dashboard")}catch(e){console.error("Sign in error:",e),c.default.error("Sign in failed. Please try again.")}finally{p(!1)}};return t?(0,s.jsx)("div",{className:"min-h-screen bg-white flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"w-16 h-16 border-4 border-gray-100 border-t-yellow-500 rounded-full animate-spin mx-auto"}),(0,s.jsx)("p",{className:"mt-4 text-gray-500",children:"Loading..."})]})}):e?null:(0,s.jsx)("main",{className:"min-h-screen bg-white overflow-hidden",children:(0,s.jsxs)("div",{className:"grid lg:grid-cols-2 min-h-screen",children:[(0,s.jsxs)("div",{className:"flex flex-col justify-center px-8 lg:px-16 py-12 relative",children:[(0,s.jsxs)("div",{className:"absolute inset-0 overflow-hidden",children:[(0,s.jsx)("div",{className:"absolute top-0 left-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"}),(0,s.jsx)("div",{className:"absolute bottom-0 right-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"}),(0,s.jsx)("div",{className:"absolute inset-0 opacity-[0.02]",style:{backgroundImage:"radial-gradient(circle at 1px 1px, black 1px, transparent 0)",backgroundSize:"40px 40px"}})]}),(0,s.jsxs)(r.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},className:"relative z-10 max-w-md mx-auto w-full",children:[(0,s.jsxs)(d(),{href:"/",className:"flex items-center gap-3 mb-12",children:[(0,s.jsx)("img",{src:"/logo.svg",alt:"SmartLeadTool",className:"w-14 h-14"}),(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"text-2xl font-bold text-black",children:"SmartLeadTool"}),(0,s.jsx)("p",{className:"text-xs text-gray-500",children:"Find Local Leads Fast"})]})]}),(0,s.jsxs)("div",{className:"mb-10",children:[(0,s.jsx)("h1",{className:"text-4xl md:text-5xl font-bold text-black mb-4",children:"Welcome back"}),(0,s.jsx)("p",{className:"text-lg text-gray-600",children:"Sign in to access your dashboard and find high-quality leads for your business."})]}),(0,s.jsx)("button",{onClick:m,disabled:u,className:"w-full py-5 px-6 bg-white border-2 border-gray-200 rounded-2xl font-medium text-black hover:border-yellow-400 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed group",children:u?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"w-6 h-6 border-2 border-gray-300 border-t-yellow-500 rounded-full animate-spin"}),(0,s.jsx)("span",{children:"Signing in..."})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("svg",{className:"w-6 h-6",viewBox:"0 0 24 24",children:[(0,s.jsx)("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),(0,s.jsx)("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),(0,s.jsx)("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"}),(0,s.jsx)("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"})]}),(0,s.jsx)("span",{children:"Continue with Google"}),(0,s.jsx)("svg",{className:"w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors ml-auto",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 8l4 4m0 0l-4 4m4-4H3"})})]})}),(0,s.jsxs)("p",{className:"mt-6 text-sm text-gray-500 text-center",children:["By signing in, you agree to our"," ",(0,s.jsx)(d(),{href:"/legal/terms",className:"text-black hover:text-yellow-600 underline transition-colors",children:"Terms of Service"})," ","and"," ",(0,s.jsx)(d(),{href:"/legal/privacy",className:"text-black hover:text-yellow-600 underline transition-colors",children:"Privacy Policy"})]}),(0,s.jsxs)("div",{className:"mt-12 pt-8 border-t border-gray-100",children:[(0,s.jsx)("p",{className:"text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6",children:"What you'll get"}),(0,s.jsx)("div",{className:"grid grid-cols-2 gap-4",children:[{title:"Verified Leads",description:"Real phone numbers for local businesses"},{title:"Smart Filtering",description:"Find businesses without websites"},{title:"Export Data",description:"Download leads as CSV files"},{title:"AI Pitches",description:"Generate personalized sales messages"}].map((e,t)=>(0,s.jsxs)(r.E.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.3+.1*t},className:"flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors",children:[(0,s.jsx)("div",{className:"w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"}),(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"font-semibold text-black text-sm",children:e.title}),(0,s.jsx)("p",{className:"text-xs text-gray-500",children:e.description})]})]},t))})]})]})]}),(0,s.jsxs)("div",{className:"hidden lg:block relative bg-black overflow-hidden",children:[(0,s.jsx)("div",{className:"absolute inset-0",children:(0,s.jsx)("img",{src:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=1600&fit=crop",alt:"Business Dashboard",className:"w-full h-full object-cover opacity-40"})}),(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-br from-black via-black/90 to-yellow-900/30"}),(0,s.jsx)("div",{className:"absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[120px] opacity-20"}),(0,s.jsx)("div",{className:"absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-[150px] opacity-10"}),(0,s.jsxs)("div",{className:"relative h-full flex flex-col justify-between p-16",children:[(0,s.jsx)(r.E.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{delay:.5},children:(0,s.jsxs)("div",{className:"inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10",children:[(0,s.jsx)("span",{className:"w-2 h-2 bg-green-400 rounded-full animate-pulse"}),(0,s.jsx)("span",{className:"text-sm text-white/80",children:"Find leads in any location"})]})}),(0,s.jsxs)(r.E.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6,delay:.3},children:[(0,s.jsxs)("h2",{className:"text-5xl font-bold text-white mb-6 leading-tight",children:["Find businesses",(0,s.jsx)("br",{}),(0,s.jsx)("span",{className:"text-yellow-400",children:"without websites"})]}),(0,s.jsx)("p",{className:"text-gray-400 text-lg mb-10 max-w-md",children:"Get access to high-quality leads with verified phone numbers. Perfect for web developers, digital marketers, and agencies."}),(0,s.jsx)("div",{className:"space-y-4 mb-12",children:["Verified Contact Information","Filter By Website Status","Export to CSV","AI Sales Pitch Generator"].map((e,t)=>(0,s.jsxs)(r.E.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.4,delay:.6+.1*t},className:"flex items-center gap-4",children:[(0,s.jsx)("span",{className:"w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-black font-bold",children:"✓"}),(0,s.jsx)("span",{className:"text-white text-lg",children:e})]},t))}),(0,s.jsx)("div",{className:"grid grid-cols-3 gap-8",children:[{value:"20+",label:"Categories"},{value:"100+",label:"Cities Covered"},{value:"24/7",label:"Access"}].map((e,t)=>(0,s.jsxs)(r.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:1+.1*t},className:"text-center",children:[(0,s.jsx)("p",{className:"text-4xl font-bold text-yellow-400",children:e.value}),(0,s.jsx)("p",{className:"text-gray-500 text-sm mt-1",children:e.label})]},t))})]}),(0,s.jsx)(r.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:1.2},className:"p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10",children:(0,s.jsxs)("div",{className:"flex items-center gap-4",children:[(0,s.jsx)("div",{className:"w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center",children:(0,s.jsx)("svg",{className:"w-6 h-6 text-black",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 10V3L4 14h7v7l9-11h-7z"})})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-white font-medium",children:"Get started in seconds"}),(0,s.jsx)("p",{className:"text-gray-400 text-sm",children:"Sign in with Google to begin"})]})]})})]})]})]})})}},4033:function(e,t,a){e.exports=a(5313)},5925:function(e,t,a){"use strict";let s,i;a.r(t),a.d(t,{CheckmarkIcon:function(){return K},ErrorIcon:function(){return q},LoaderIcon:function(){return Y},ToastBar:function(){return en},ToastIcon:function(){return ea},Toaster:function(){return ep},default:function(){return em},resolveValue:function(){return k},toast:function(){return B},useToaster:function(){return V},useToasterStore:function(){return T}});var r,o=a(2265);let l={data:""},n=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||l},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let a="",s="",i="";for(let r in e){let o=e[r];"@"==r[0]?"i"==r[1]?a=r+" "+o+";":s+="f"==r[1]?p(o,r):r+"{"+p(o,"k"==r[1]?"":t)+"}":"object"==typeof o?s+=p(o,t?t.replace(/([^,])+/g,e=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):r):null!=o&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=p.p?p.p(r,o):r+":"+o+";")}return a+(t&&i?t+"{"+i+"}":i)+s},m={},f=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+f(e[a]);return t}return e},h=(e,t,a,s,i)=>{var r;let o=f(e),l=m[o]||(m[o]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(o));if(!m[l]){let t=o!==e?e:(e=>{let t,a,s=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?s.shift():t[3]?(a=t[3].replace(u," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(u," ").trim();return s[0]})(e);m[l]=p(i?{["@keyframes "+l]:t}:t,a?"":"."+l)}let n=a&&m.g?m.g:null;return a&&(m.g=m[l]),r=m[l],n?t.data=t.data.replace(n,r):-1===t.data.indexOf(r)&&(t.data=s?r+t.data:t.data+r),l},x=(e,t,a)=>e.reduce((e,s,i)=>{let r=t[i];if(r&&r.call){let e=r(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;r=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+s+(null==r?"":r)},"");function b(e){let t=this||{},a=e.call?e(t.p):e;return h(a.unshift?a.raw?x(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,n(t.target),t.g,t.o,t.k)}b.bind({g:1});let g,y,v,w=b.bind({k:1});function j(e,t){let a=this||{};return function(){let s=arguments;function i(r,o){let l=Object.assign({},r),n=l.className||i.className;a.p=Object.assign({theme:y&&y()},l),a.o=/ *go\d+/.test(n),l.className=b.apply(a,s)+(n?" "+n:""),t&&(l.ref=o);let d=e;return e[0]&&(d=l.as||e,delete l.as),v&&d[0]&&v(l),g(d,l)}return t?t(i):i}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,E=(s=0,()=>(++s).toString()),C=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},S="default",I=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return I(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},$=[],z={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},L={},A=(e,t=S)=>{L[t]=I(L[t]||z,e),$.forEach(([e,a])=>{e===t&&a(L[t])})},D=e=>Object.keys(L).forEach(t=>A(e,t)),F=e=>Object.keys(L).find(t=>L[t].toasts.some(t=>t.id===e)),O=(e=S)=>t=>{A(t,e)},P={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},T=(e={},t=S)=>{let[a,s]=(0,o.useState)(L[t]||z),i=(0,o.useRef)(L[t]);(0,o.useEffect)(()=>(i.current!==L[t]&&s(L[t]),$.push([t,s]),()=>{let e=$.findIndex(([e])=>e===t);e>-1&&$.splice(e,1)}),[t]);let r=a.toasts.map(t=>{var a,s,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||P[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...a,toasts:r}},_=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||E()}),M=e=>(t,a)=>{let s=_(t,e,a);return O(s.toasterId||F(s.id))({type:2,toast:s}),s.id},B=(e,t)=>M("blank")(e,t);B.error=M("error"),B.success=M("success"),B.loading=M("loading"),B.custom=M("custom"),B.dismiss=(e,t)=>{let a={type:3,toastId:e};t?O(t)(a):D(a)},B.dismissAll=e=>B.dismiss(void 0,e),B.remove=(e,t)=>{let a={type:4,toastId:e};t?O(t)(a):D(a)},B.removeAll=e=>B.remove(void 0,e),B.promise=(e,t,a)=>{let s=B.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?k(t.success,e):void 0;return i?B.success(i,{id:s,...a,...null==a?void 0:a.success}):B.dismiss(s),e}).catch(e=>{let i=t.error?k(t.error,e):void 0;i?B.error(i,{id:s,...a,...null==a?void 0:a.error}):B.dismiss(s)}),e};var H=1e3,V=(e,t="default")=>{let{toasts:a,pausedAt:s}=T(e,t),i=(0,o.useRef)(new Map).current,r=(0,o.useCallback)((e,t=H)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,a)},[]);(0,o.useEffect)(()=>{if(s)return;let e=Date.now(),i=a.map(a=>{if(a.duration===1/0)return;let s=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(s<0){a.visible&&B.dismiss(a.id);return}return setTimeout(()=>B.dismiss(a.id,t),s)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[a,s,t]);let l=(0,o.useCallback)(O(t),[t]),n=(0,o.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,o.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,o.useCallback)(()=>{s&&l({type:6,time:Date.now()})},[s,l]),u=(0,o.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:i=8,defaultPosition:r}=t||{},o=a.filter(t=>(t.position||r)===(e.position||r)&&t.height),l=o.findIndex(t=>t.id===e.id),n=o.filter((e,t)=>t<l&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+i,0)},[a]);return(0,o.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)r(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,r]),{toasts:a,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}},G=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,R=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,q=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${W} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,U=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Y=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${U} 1s linear infinite;
`,Z=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,J=w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,K=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${J} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Q=j("div")`
  position: absolute;
`,X=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ea=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?o.createElement(et,null,t):t:"blank"===a?null:o.createElement(X,null,o.createElement(Y,{...s}),"loading"!==a&&o.createElement(Q,null,"error"===a?o.createElement(q,{...s}):o.createElement(K,{...s})))},es=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ei=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=j("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,eo=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,el=(e,t)=>{let a=e.includes("top")?1:-1,[s,i]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(a),ei(a)];return{animation:t?`${w(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=o.memo(({toast:e,position:t,style:a,children:s})=>{let i=e.height?el(e.position||t||"top-center",e.visible):{opacity:0},r=o.createElement(ea,{toast:e}),l=o.createElement(eo,{...e.ariaProps},k(e.message,e));return o.createElement(er,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof s?s({icon:r,message:l}):o.createElement(o.Fragment,null,r,l))});r=o.createElement,p.p=void 0,g=r,y=void 0,v=void 0;var ed=({id:e,className:t,style:a,onHeightUpdate:s,children:i})=>{let r=o.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return o.createElement("div",{ref:r,className:t,style:a},i)},ec=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},eu=b`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ep=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:i,toasterId:r,containerStyle:l,containerClassName:n})=>{let{toasts:d,handlers:c}=V(a,r);return o.createElement("div",{"data-rht-toaster":r||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let r=a.position||t,l=ec(r,c.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return o.createElement(ed,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?eu:"",style:l},"custom"===a.type?k(a.message,a):i?i(a):o.createElement(en,{toast:a,position:r}))}))},em=B}},function(e){e.O(0,[287,117,815,396,806,699,971,938,744],function(){return e(e.s=7874)}),_N_E=e.O()}]);