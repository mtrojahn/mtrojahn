import{s as le,b as ae,n as j,r as se,d as re}from"../chunks/scheduler.WS4t4ko8.js";import{S as oe,i as ie,e as d,s as L,c as _,b as g,g as U,a as D,d as y,f as i,h as te,j as r,o as A,p as X,n as W,q as ne,l as ce,m as ue,r as de}from"../chunks/index.C_KWJU3E.js";import{e as Y}from"../chunks/each.U567mLn_.js";import{s as Z}from"../chunks/GamingTaskStore.BZrRBh6j.js";function $(a,e,s){const o=a.slice();return o[9]=e[s].value,o[10]=e[s].label,o}function ee(a){let e,s=a[10]+"",o;return{c(){e=d("option"),o=ce(s),this.h()},l(m){e=_(m,"OPTION",{});var h=g(e);o=ue(h,s),h.forEach(y),this.h()},h(){e.__value=a[9],A(e,e.__value)},m(m,h){te(m,e,h),r(e,o)},p:j,d(m){m&&y(e)}}}function _e(a){let e,s,o,m="Time to expire daily tasks",h,p,f,E,V,S,b,u,H="Weekday to expire weekly tasks",O,x,v,q,w,C,z="Time to expire weekly tasks",F,I,k,M,G,T=Y(a[3]),n=[];for(let l=0;l<T.length;l+=1)n[l]=ee($(a,T,l));return{c(){e=d("form"),s=d("div"),o=d("label"),o.textContent=m,h=L(),p=d("div"),f=d("input"),E=L(),V=d("hr"),S=L(),b=d("div"),u=d("label"),u.textContent=H,O=L(),x=d("div"),v=d("select");for(let l=0;l<n.length;l+=1)n[l].c();q=L(),w=d("div"),C=d("label"),C.textContent=z,F=L(),I=d("div"),k=d("input"),this.h()},l(l){e=_(l,"FORM",{});var c=g(e);s=_(c,"DIV",{class:!0});var t=g(s);o=_(t,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),U(o)!=="svelte-1gv4dmi"&&(o.textContent=m),h=D(t),p=_(t,"DIV",{class:!0});var P=g(p);f=_(P,"INPUT",{type:!0,class:!0,id:!0}),P.forEach(y),t.forEach(y),E=D(c),V=_(c,"HR",{}),S=D(c),b=_(c,"DIV",{class:!0});var B=g(b);u=_(B,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),U(u)!=="svelte-7fyimv"&&(u.textContent=H),O=D(B),x=_(B,"DIV",{class:!0});var J=g(x);v=_(J,"SELECT",{class:!0});var K=g(v);for(let R=0;R<n.length;R+=1)n[R].l(K);K.forEach(y),J.forEach(y),B.forEach(y),q=D(c),w=_(c,"DIV",{class:!0});var N=g(w);C=_(N,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),U(C)!=="svelte-rti70y"&&(C.textContent=z),F=D(N),I=_(N,"DIV",{class:!0});var Q=g(I);k=_(Q,"INPUT",{type:!0,class:!0,id:!0}),Q.forEach(y),N.forEach(y),c.forEach(y),this.h()},h(){i(o,"for","daily-expiration"),i(o,"class","col-sm-4 col-form-label"),i(f,"type","time"),i(f,"class","form-control"),i(f,"id","daily-expiration"),i(p,"class","col-sm-8"),i(s,"class","row mb-3"),i(u,"for","weekly-expiration"),i(u,"class","col-sm-4 col-form-label"),i(v,"class","form-select"),a[1]===void 0&&ae(()=>a[5].call(v)),i(x,"class","col-sm-8"),i(b,"class","row mb-3"),i(C,"for","daily-expiration"),i(C,"class","col-sm-4 col-form-label"),i(k,"type","time"),i(k,"class","form-control"),i(k,"id","daily-expiration"),i(I,"class","col-sm-8"),i(w,"class","row mb-3")},m(l,c){te(l,e,c),r(e,s),r(s,o),r(s,h),r(s,p),r(p,f),A(f,a[0]),r(e,E),r(e,V),r(e,S),r(e,b),r(b,u),r(b,O),r(b,x),r(x,v);for(let t=0;t<n.length;t+=1)n[t]&&n[t].m(v,null);X(v,a[1],!0),r(e,q),r(e,w),r(w,C),r(w,F),r(w,I),r(I,k),A(k,a[2]),M||(G=[W(f,"input",a[4]),W(v,"change",a[5]),W(k,"input",a[6])],M=!0)},p(l,[c]){if(c&1&&A(f,l[0]),c&8){T=Y(l[3]);let t;for(t=0;t<T.length;t+=1){const P=$(l,T,t);n[t]?n[t].p(P,c):(n[t]=ee(P),n[t].c(),n[t].m(v,null))}for(;t<n.length;t+=1)n[t].d(1);n.length=T.length}c&10&&X(v,l[1]),c&4&&A(k,l[2])},i:j,o:j,d(l){l&&y(e),ne(n,l),M=!1,se(G)}}}function fe(a,e,s){let o;re(a,Z,u=>s(7,o=u));const m=[{value:0,label:"Sunday"},{value:1,label:"Monday"},{value:2,label:"Tuesday"},{value:3,label:"Wednesday"},{value:4,label:"Thursday"},{value:5,label:"Friday"},{value:6,label:"Saturday"}];let h=o,p=h.daily_reset_time,f=h.weekly_reset_day,E=h.weekly_reset_time;function V(){p=this.value,s(0,p)}function S(){f=de(this),s(1,f),s(3,m)}function b(){E=this.value,s(2,E)}return a.$$.update=()=>{a.$$.dirty&7&&Z.update(u=>(u.daily_reset_time=p,u.weekly_reset_day=f,u.weekly_reset_time=E,u))},[p,f,E,m,V,S,b]}class ye extends oe{constructor(e){super(),ie(this,e,fe,_e,le,{})}}export{ye as component};