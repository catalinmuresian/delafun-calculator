"use strict";(globalThis["webpackChunkdelafun_calculator"]=globalThis["webpackChunkdelafun_calculator"]||[]).push([[287],{5287:(l,e,a)=>{a.r(e),a.d(e,{default:()=>J});a(239);var n=a(1758),u=a(8790),t=a(9104),i=a(8734);const s={class:"text-h6"},o={class:"text-h6"},d=(0,n.Lk)("h6",{style:{margin:"20px 0 0 0"}},"Evenimente",-1),p={style:{display:"flex",width:"100%","justify-content":"flex-end"}},v={style:{display:"flex","flex-direction":"column",gap:"10px"}},c={style:{"margin-bottom":"2px",display:"flex","align-items":"center",gap:"5px"}},r=(0,n.Lk)("h6",{style:{margin:"40px 0 0 0"}},"Cheltuieli",-1),m={style:{display:"flex",width:"100%","justify-content":"flex-end"}},f={style:{display:"flex","flex-direction":"column",gap:"10px"}},g={style:{"margin-bottom":"2px",display:"flex","align-items":"center",gap:"5px"}},k=(0,n.Lk)("hr",{style:{margin:"40px 0"}},null,-1),b={class:"flex",style:{gap:"10px","align-items":"center"}},y={class:"cont"},x=(0,n.Lk)("label",{class:"label"},"Total suma evenimente",-1),h={class:"cont"},L=(0,n.Lk)("label",{class:"label"},"Total suma cheltuieli",-1),C={class:"cont"},F=(0,n.Lk)("label",{class:"label"},"Total suma ramasa",-1),_={class:"flex",style:{"flex-direction":"column",gap:"10px","justify-content":"flex-start","margin-top":"20px"}},V={class:"flex",style:{gap:"10px"}},S=(0,n.Lk)("label",null,"Catalin -",-1),E={class:"flex",style:{gap:"10px"}},A=(0,n.Lk)("label",null,"Vali -",-1),R={class:"flex",style:{gap:"10px"}},q=(0,n.Lk)("label",null,"Ion -",-1),w={class:"flex",style:{gap:"10px"}},M=(0,n.Lk)("label",null,"Radu -",-1),I={class:"flex",style:{gap:"10px"}},K=(0,n.Lk)("label",null,"Sarpe -",-1),Q={class:"flex",style:{gap:"10px"}},U=(0,n.Lk)("label",null,"Tony -",-1),W={__name:"IndexPage",setup(l){const e=(0,i.KR)(""),a=(0,i.KR)({events:{id:null,input:"",openModal:!1},spendings:{id:null,input:"",openModal:!1}}),W=(0,i.KR)({events:[{id:1,value:null,focus:!1,name:""}],spendings:[{id:1,value:null,focus:!1,name:""}]}),$=(0,i.KR)({totalSumaEvenimente:0,totalSumaCheltuieli:0,totalSumaRamasaDupaCheltuieli:0,totalSumaRamasaDupaCatalinSiVali:0,catalin:0,vali:0,ion:0,radu:0,sarpe:0,tony:0});function j(){let l=0,e=0;const a=[],n=[];W.value.events.forEach((l=>{a.push(1*l.value)})),W.value.spendings.forEach((l=>{n.push(1*l.value)})),l=a.reduce(((l,e)=>l+e),0),e=n.reduce(((l,e)=>l+e),0);const u=l-e,t=.13*u,i=.13*u,s=u-(t+i),o={ion:0,sarpe:0,radu:0,tony:0},d=Object.keys(o);d.forEach((l=>{o[l]=s/4})),$.value.totalSumaEvenimente=l,$.value.totalSumaCheltuieli=e,$.value.totalSumaRamasaDupaCheltuieli=u,$.value.totalSumaRamasaDupaCatalinSiVali=s,$.value.catalin=t,$.value.vali=i,$.value.ion=o.ion,$.value.radu=o.radu,$.value.sarpe=o.sarpe,$.value.tony=o.tony}function D(l){e.value=l}function T(l){e.value=l}function B(l,n,u){a.value[u].id=l,a.value[u].openModal=!0,e.value=n,a.value[u].input=n}function X(l,n){W.value[n].forEach((l=>{l.id===a.value[n].id&&(l.name=e.value)})),e.value=""}function z(l,e){W.value[e].forEach((e=>{e.id===l&&(e.focus=!0)}))}function N(l,e){W.value[e].forEach((e=>{e.id===l&&(e.focus=!1)}))}function P(l,e,a){W.value[a].forEach((a=>{a.id===l&&(a.value=e)}))}function O(l){l.target.blur()}function G(l){W.value[l].push({id:W.value[l].length+1,value:null,focus:!1,name:""})}return(l,i)=>{const H=(0,n.g2)("q-card-section"),J=(0,n.g2)("q-input"),Y=(0,n.g2)("q-btn"),Z=(0,n.g2)("q-card-actions"),ll=(0,n.g2)("q-card"),el=(0,n.g2)("q-dialog"),al=(0,n.g2)("q-icon"),nl=(0,n.g2)("q-page"),ul=(0,n.gN)("close-popup");return(0,n.uX)(),(0,n.Wv)(nl,{style:{padding:"0 16px"}},{default:(0,n.k6)((()=>[(0,n.bF)(el,{modelValue:a.value.events.openModal,"onUpdate:modelValue":i[4]||(i[4]=l=>a.value.events.openModal=l),persistent:""},{default:(0,n.k6)((()=>[(0,n.bF)(ll,{style:{width:"100%"}},{default:(0,n.k6)((()=>[(0,n.bF)(H,null,{default:(0,n.k6)((()=>[(0,n.Lk)("div",s,"Nume eveniment "+(0,u.v_)(a.value.events.input.length?`- ${a.value.events.input}`:`#${a.value.events.id}`),1)])),_:1}),(0,n.bF)(H,{class:"q-pt-none"},{default:(0,n.k6)((()=>[(0,n.bF)(J,{dense:"",modelValue:e.value,"onUpdate:modelValue":[i[0]||(i[0]=l=>e.value=l),i[1]||(i[1]=l=>D(l))],autofocus:"",onKeyup:i[2]||(i[2]=(0,t.jR)((l=>a.value.events.openModal=!1),["enter"]))},null,8,["modelValue"])])),_:1}),(0,n.bF)(Z,{align:"right",class:"text-primary"},{default:(0,n.k6)((()=>[(0,n.bo)((0,n.bF)(Y,{flat:"",label:"Inchide"},null,512),[[ul]]),(0,n.bo)((0,n.bF)(Y,{flat:"",label:"Salveaza",onClick:i[3]||(i[3]=l=>X(a.value.events.id,"events"))},null,512),[[ul]])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,n.bF)(el,{modelValue:a.value.spendings.openModal,"onUpdate:modelValue":i[9]||(i[9]=l=>a.value.spendings.openModal=l),persistent:""},{default:(0,n.k6)((()=>[(0,n.bF)(ll,{style:{width:"100%"}},{default:(0,n.k6)((()=>[(0,n.bF)(H,null,{default:(0,n.k6)((()=>[(0,n.Lk)("div",o,"Nume cheltuiala "+(0,u.v_)(a.value.spendings.input.length?`- ${a.value.spendings.input}`:`#${a.value.spendings.id}`),1)])),_:1}),(0,n.bF)(H,{class:"q-pt-none"},{default:(0,n.k6)((()=>[(0,n.bF)(J,{dense:"",modelValue:e.value,"onUpdate:modelValue":[i[5]||(i[5]=l=>e.value=l),i[6]||(i[6]=l=>T(l))],autofocus:"",onKeyup:i[7]||(i[7]=(0,t.jR)((l=>a.value.spendings.openModal=!1),["enter"]))},null,8,["modelValue"])])),_:1}),(0,n.bF)(Z,{align:"right",class:"text-primary"},{default:(0,n.k6)((()=>[(0,n.bo)((0,n.bF)(Y,{flat:"",label:"Inchide"},null,512),[[ul]]),(0,n.bo)((0,n.bF)(Y,{flat:"",label:"Salveaza",onClick:i[8]||(i[8]=l=>X(a.value.spendings.id,"spendings"))},null,512),[[ul]])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,n.Lk)("div",null,[d,(0,n.Lk)("div",p,[(0,n.bF)(Y,{style:{"margin-bottom":"5px"},dense:"","no-caps":"",flat:"",onClick:i[10]||(i[10]=l=>G("events")),color:"primary",label:"Adauga eveniment",icon:"add"})]),(0,n.Lk)("div",v,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(W.value.events,(({value:l,id:e,focus:a,name:t})=>((0,n.uX)(),(0,n.CE)("div",null,[(0,n.Lk)("label",c,[(0,n.eW)((0,u.v_)("Eveniment "+(t.length?`- ${t}`:`#${e}`))+" ",1),(0,n.bF)(al,{onClick:l=>B(e,t,"events"),color:"primary",style:{"padding-bottom":"5px",cursor:"pointer"},name:"edit"},null,8,["onClick"])]),(0,n.bF)(J,{style:{width:"100px"},dense:"",onBlur:l=>N(e,"events"),onFocus:l=>z(e,"events"),outlined:a,filled:!a,type:"number",pattern:"\\d*",onWheel:i[11]||(i[11]=l=>O(l)),"onUpdate:modelValue":l=>P(e,l,"events"),"model-value":l},null,8,["onBlur","onFocus","outlined","filled","onUpdate:modelValue","model-value"])])))),256))])]),(0,n.Lk)("div",null,[r,(0,n.Lk)("div",m,[(0,n.bF)(Y,{style:{"margin-bottom":"5px"},dense:"","no-caps":"",flat:"",onClick:i[12]||(i[12]=l=>G("spendings")),color:"primary",label:"Adauga cheltuiala",icon:"add"})]),(0,n.Lk)("div",f,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(W.value.spendings,(({value:l,id:e,focus:a,name:t})=>((0,n.uX)(),(0,n.CE)("div",null,[(0,n.Lk)("label",g,[(0,n.eW)((0,u.v_)("Cheltuiala "+(t.length?`- ${t}`:`#${e}`))+" ",1),(0,n.bF)(al,{onClick:l=>B(e,t,"spendings"),color:"primary",style:{"padding-bottom":"5px",cursor:"pointer"},name:"edit"},null,8,["onClick"])]),(0,n.bF)(J,{style:{width:"100px"},dense:"",onBlur:l=>N(e,"spendings"),onFocus:l=>z(e,"spendings"),outlined:a,filled:!a,type:"number",pattern:"\\d*",onWheel:i[13]||(i[13]=l=>O(l)),"onUpdate:modelValue":l=>P(e,l,"spendings"),"model-value":l},null,8,["onBlur","onFocus","outlined","filled","onUpdate:modelValue","model-value"])])))),256))])]),(0,n.bF)(Y,{style:{width:"100%","margin-top":"40px"},color:"green","no-caps":"",dense:"",onClick:i[14]||(i[14]=l=>j())},{default:(0,n.k6)((()=>[(0,n.eW)("Calculeaza")])),_:1}),k,(0,n.Lk)("div",b,[(0,n.Lk)("div",y,[x,(0,n.Lk)("span",null,(0,u.v_)($.value.totalSumaEvenimente),1)]),(0,n.eW)(" - "),(0,n.Lk)("div",h,[L,(0,n.Lk)("span",null,(0,u.v_)($.value.totalSumaCheltuieli),1)]),(0,n.eW)(" = "),(0,n.Lk)("div",C,[F,(0,n.Lk)("span",null,(0,u.v_)($.value.totalSumaRamasaDupaCheltuieli),1)])]),(0,n.Lk)("div",_,[(0,n.Lk)("div",V,[S,(0,n.Lk)("span",null,(0,u.v_)($.value.catalin),1)]),(0,n.Lk)("div",E,[A,(0,n.Lk)("span",null,(0,u.v_)($.value.vali),1)]),(0,n.Lk)("div",R,[q,(0,n.Lk)("span",null,(0,u.v_)($.value.ion),1)]),(0,n.Lk)("div",w,[M,(0,n.Lk)("span",null,(0,u.v_)($.value.radu),1)]),(0,n.Lk)("div",I,[K,(0,n.Lk)("span",null,(0,u.v_)($.value.sarpe),1)]),(0,n.Lk)("div",Q,[U,(0,n.Lk)("span",null,(0,u.v_)($.value.tony),1)])])])),_:1})}}};var $=a(3177),j=a(3500),D=a(7569),T=a(7066),B=a(8266),X=a(6334),z=a(4533),N=a(4609),P=a(2769),O=a(8582),G=a.n(O);const H=W,J=H;G()(W,"components",{QPage:$.A,QDialog:j.A,QCard:D.A,QCardSection:T.A,QInput:B.A,QCardActions:X.A,QBtn:z.A,QIcon:N.A}),G()(W,"directives",{ClosePopup:P.A})}}]);