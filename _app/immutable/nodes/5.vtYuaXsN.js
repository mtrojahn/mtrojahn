import{s as re,f as oe,n as J,r as ne,e as Q,o as ie}from"../chunks/scheduler.gf8ilvFp.js";import{S as ce,i as ue,g as p,s as A,h as m,j as N,c as M,y as Y,f as b,k as E,l as F,A as K,a as W,x as r,B as X,z as U,C as de,m as Z,n as $,o as ee,D as fe}from"../chunks/index.uKRM2Sym.js";import{e as te}from"../chunks/each.BoSOzGm4.js";import{D as P,t as se,a as _e,b as he,d as pe,s as me}from"../chunks/GamingTaskStore.mVaTVFj9.js";function le(e,l,n){const c=e.slice();return c[14]=l[n],c}function ae(e){let l,n,c,o,u,x,y,I=e[14].name+"",d,w,D,T=e[14].frequency+"",O,R,C,L,t="",a,v,h;function H(){return e[9](e[14])}function S(){return e[10](e[14])}return{c(){l=p("tr"),n=p("td"),c=p("input"),x=A(),y=p("td"),d=Z(I),w=A(),D=p("td"),O=Z(T),R=A(),C=p("td"),L=p("i"),L.innerHTML=t,a=A(),this.h()},l(g){l=m(g,"TR",{});var f=N(l);n=m(f,"TD",{});var j=N(n);c=m(j,"INPUT",{class:!0,type:!0,id:!0}),j.forEach(b),x=M(f),y=m(f,"TD",{});var q=N(y);d=$(q,I),q.forEach(b),w=M(f),D=m(f,"TD",{class:!0});var _=N(D);O=$(_,T),_.forEach(b),R=M(f),C=m(f,"TD",{class:!0});var s=N(C);L=m(s,"I",{class:!0,"aria-hidden":!0,style:!0,"data-svelte-h":!0}),Y(L)!=="svelte-chcjmm"&&(L.innerHTML=t),s.forEach(b),a=M(f),f.forEach(b),this.h()},h(){E(c,"class","form-check-input"),E(c,"type","checkbox"),E(c,"id",o=e[14].id),c.checked=u=e[14].completed,E(D,"class","text-end"),E(L,"class","fa fa-trash ms-4"),E(L,"aria-hidden","true"),F(L,"cursor","pointer"),E(C,"class","text-end")},m(g,f){W(g,l,f),r(l,n),r(n,c),r(l,x),r(l,y),r(y,d),r(l,w),r(l,D),r(D,O),r(l,R),r(l,C),r(C,L),r(l,a),v||(h=[U(c,"change",H),U(L,"click",S)],v=!0)},p(g,f){e=g,f&4&&o!==(o=e[14].id)&&E(c,"id",o),f&4&&u!==(u=e[14].completed)&&(c.checked=u),f&4&&I!==(I=e[14].name+"")&&ee(d,I),f&4&&T!==(T=e[14].frequency+"")&&ee(O,T)},d(g){g&&b(l),v=!1,ne(h)}}}function ve(e){let l,n,c,o,u,x="Daily",y,I="Weekly",d,w="Permanent",D,T,O='<i class="fa fa-plus" aria-hidden="true"></i>',R,C,L="Tasks",t,a,v,h,H='<th style="width: 150px;">Done</th> <th>Task</th> <th class="text-end">Frequency</th> <th style="width: 400px"></th>',S,g,f,j,q=te(e[2]),_=[];for(let s=0;s<q.length;s+=1)_[s]=ae(le(e,q,s));return{c(){l=p("div"),n=p("input"),c=A(),o=p("select"),u=p("option"),u.textContent=x,y=p("option"),y.textContent=I,d=p("option"),d.textContent=w,D=A(),T=p("button"),T.innerHTML=O,R=A(),C=p("h6"),C.textContent=L,t=A(),a=p("div"),v=p("table"),h=p("tr"),h.innerHTML=H,S=A(),g=p("tbody");for(let s=0;s<_.length;s+=1)_[s].c();this.h()},l(s){l=m(s,"DIV",{class:!0});var k=N(l);n=m(k,"INPUT",{type:!0,class:!0,placeholder:!0,style:!0}),c=M(k),o=m(k,"SELECT",{class:!0,style:!0});var i=N(o);u=m(i,"OPTION",{"data-svelte-h":!0}),Y(u)!=="svelte-1h1fffs"&&(u.textContent=x),y=m(i,"OPTION",{"data-svelte-h":!0}),Y(y)!=="svelte-1glifvy"&&(y.textContent=I),d=m(i,"OPTION",{"data-svelte-h":!0}),Y(d)!=="svelte-1dsr87i"&&(d.textContent=w),i.forEach(b),D=M(k),T=m(k,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),Y(T)!=="svelte-yltwyw"&&(T.innerHTML=O),k.forEach(b),R=M(s),C=m(s,"H6",{"data-svelte-h":!0}),Y(C)!=="svelte-xgf3w0"&&(C.textContent=L),t=M(s),a=m(s,"DIV",{class:!0});var B=N(a);v=m(B,"TABLE",{class:!0});var V=N(v);h=m(V,"TR",{"data-svelte-h":!0}),Y(h)!=="svelte-tjolv0"&&(h.innerHTML=H),S=M(V),g=m(V,"TBODY",{});var G=N(g);for(let z=0;z<_.length;z+=1)_[z].l(G);G.forEach(b),V.forEach(b),B.forEach(b),this.h()},h(){E(n,"type","text"),E(n,"class","form-control form-control-sm"),E(n,"placeholder","New Task"),F(n,"max-width","300px"),u.__value="DAILY",K(u,u.__value),y.__value="WEEKLY",K(y,y.__value),d.__value="PERMANENT",K(d,d.__value),E(o,"class","form-select form-select-sm ms-3"),F(o,"max-width","150px"),e[0]===void 0&&oe(()=>e[7].call(o)),E(T,"type","button"),E(T,"class","btn btn-primary btn-sm ms-3"),E(l,"class","d-flex flex-row justify-content-end"),E(v,"class","table table-striped"),E(a,"class","row mx-1 mt-4")},m(s,k){W(s,l,k),r(l,n),K(n,e[1]),r(l,c),r(l,o),r(o,u),r(o,y),r(o,d),X(o,e[0],!0),r(l,D),r(l,T),W(s,R,k),W(s,C,k),W(s,t,k),W(s,a,k),r(a,v),r(v,h),r(v,S),r(v,g);for(let i=0;i<_.length;i+=1)_[i]&&_[i].m(g,null);f||(j=[U(n,"input",e[6]),U(o,"change",e[7]),U(T,"click",e[8])],f=!0)},p(s,[k]){if(k&2&&n.value!==s[1]&&K(n,s[1]),k&1&&X(o,s[0]),k&4){q=te(s[2]);let i;for(i=0;i<q.length;i+=1){const B=le(s,q,i);_[i]?_[i].p(B,k):(_[i]=ae(B),_[i].c(),_[i].m(g,null))}for(;i<_.length;i+=1)_[i].d(1);_.length=q.length}},i:J,o:J,d(s){s&&(b(l),b(R),b(C),b(t),b(a)),de(_,s),f=!1,ne(j)}}}function ye(e,l,n){let c,o,u,x;Q(e,se,t=>n(4,u=t)),Q(e,me,t=>n(5,x=t));const y=t=>{const a=P.local(),v=o.daily_reset_time.split(":");let h=P.local().set({hour:v[0],minute:v[1],second:0});return h>a&&(h=h.minus({days:1})),P.fromISO(t.last_reset)<h&&t.completed},I=t=>{const a=P.local();if(o.weekly_reset_day!==P.local().weekday)return!1;const v=o.weekly_reset_time.split(":");let h=P.local().set({hour:v[0],minute:v[1],second:0});return h>a&&(h=h.minus({days:7})),P.fromISO(t.last_reset)<h&&t.completed};ie(()=>{const t=u.map(a=>((a.frequency==="DAILY"&&y(a)||a.frequency==="WEEKLY"&&I(a))&&(a.completed=!1,a.last_reset=P.local().set({second:0}).toISO()),a));se.set(t)});let d="DAILY",w="";const D=(t,a)=>{_e(t,a),n(0,d="DAILY"),n(1,w="")};function T(){w=this.value,n(1,w)}function O(){d=fe(this),n(0,d)}const R=()=>D(w,d),C=t=>he(t.id),L=t=>pe(t.id);return e.$$.update=()=>{e.$$.dirty&16&&n(2,c=u.filter(t=>["DAILY","WEEKLY"].includes(t.frequency)).sort((t,a)=>t.name.localeCompare(a.name)&&t.frequency.localeCompare(a.frequency)).concat(u.filter(t=>t.frequency==="PERMANENT"))),e.$$.dirty&32&&(o=x)},[d,w,c,D,u,x,T,O,R,C,L]}class be extends ce{constructor(l){super(),ue(this,l,ye,ve,re,{})}}export{be as component};
