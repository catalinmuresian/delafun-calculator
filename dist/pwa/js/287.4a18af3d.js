"use strict";(globalThis["webpackChunkdelafun_calculator"]=globalThis["webpackChunkdelafun_calculator"]||[]).push([[287],{5287:(l,e,a)=>{a.r(e),a.d(e,{default:()=>dl});a(239);var n=a(1758),t=a(8790),u=a(9104),i=a(8734);const o={style:{color:"grey","font-size":"12px","margin-bottom":"5px","text-transform":"capitalize"}},s=(0,n.Lk)("div",{class:"text-h6"},"Setari eveniment",-1),d=(0,n.Lk)("span",null,"Nume",-1),p=(0,n.Lk)("span",{style:{"margin-bottom":"6px",display:"block"}},"Selecteaza moneda",-1),v={style:{color:"grey","font-size":"12px","margin-bottom":"5px","text-transform":"capitalize"}},c=(0,n.Lk)("div",{style:{"font-size":"16px"}},"Setari cheltuiala",-1),m=(0,n.Lk)("span",null,"Nume",-1),r=(0,n.Lk)("span",{style:{"margin-bottom":"6px",display:"block"}},"Selecteaza moneda",-1),g={style:{margin:"0",position:"relative",display:"inline"}},f={style:{display:"flex","justify-content":"flex-end"}},k={style:{display:"flex","flex-direction":"column",gap:"10px"}},b={style:{"margin-bottom":"2px",display:"flex","align-items":"center",gap:"5px"}},x={style:{margin:"0",position:"relative",display:"inline"}},y={style:{display:"flex","justify-content":"flex-end"}},h={style:{display:"flex","flex-direction":"column",gap:"10px"}},L={style:{"margin-bottom":"2px",display:"flex","align-items":"center",gap:"5px"}},F={style:{padding:"0 16px"}},_=(0,n.Lk)("hr",{style:{margin:"16px 0"}},null,-1),C={class:"flex",style:{gap:"10px","align-items":"center"}},V={class:"cont"},S=(0,n.Lk)("label",{class:"label"},"Total suma evenimente",-1),A={class:"cont"},E=(0,n.Lk)("label",{class:"label"},"Total suma cheltuieli",-1),q={class:"cont"},R=(0,n.Lk)("label",{class:"label"},"Total suma ramasa",-1),Q={class:"flex",style:{"flex-direction":"column",gap:"10px","justify-content":"flex-start","margin-top":"20px"}},U={class:"flex",style:{gap:"10px"}},w=(0,n.Lk)("label",null,"Catalin -",-1),I={class:"flex",style:{gap:"10px"}},z=(0,n.Lk)("label",null,"Vali -",-1),K={class:"flex",style:{gap:"10px"}},W=(0,n.Lk)("label",null,"Ion -",-1),M={class:"flex",style:{gap:"10px"}},$=(0,n.Lk)("label",null,"Radu -",-1),B={class:"flex",style:{gap:"10px"}},T=(0,n.Lk)("label",null,"Sarpe -",-1),j={class:"flex",style:{gap:"10px"}},D=(0,n.Lk)("label",null,"Tony -",-1),X={__name:"IndexPage",setup(l){const e=(0,i.KR)(""),a=(0,i.KR)({events:{id:null,input:"",openModal:!1},spendings:{id:null,input:"",openModal:!1}}),X=(0,i.KR)(!1),N=(0,i.KR)({events:[{id:1,value:null,focus:!1,name:""}],spendings:[{id:1,value:null,focus:!1,name:""}]}),P=(0,i.KR)("LEI"),O=(0,i.KR)(["LEI","EURO","USD"]),G=(0,i.KR)({totalSumaEvenimente:0,totalSumaCheltuieli:0,totalSumaRamasaDupaCheltuieli:0,totalSumaRamasaDupaCatalinSiVali:0,catalin:0,vali:0,ion:0,radu:0,sarpe:0,tony:0});function H(l){e.value=l}function J(l){e.value=l}function Y(l,n,t){a.value[t].id=l,a.value[t].openModal=!0,e.value=n,a.value[t].input=n}function Z(l,n){N.value[n].forEach((l=>{l.id===a.value[n].id&&(l.name=e.value)})),e.value=""}function ll(l,e){N.value[e].forEach((e=>{e.id===l&&(e.focus=!0)}))}function el(l,e){N.value[e].forEach((e=>{e.id===l&&(e.focus=!1)}))}function al(l,e,a){N.value[a].forEach((a=>{a.id===l&&(a.value=e)}))}function nl(l){l.target.blur()}function tl(l){N.value[l].push({id:N.value[l].length+1,value:null,focus:!1,name:""})}return(l,i)=>{const ul=(0,n.g2)("q-card-section"),il=(0,n.g2)("q-input"),ol=(0,n.g2)("q-checkbox"),sl=(0,n.g2)("q-select"),dl=(0,n.g2)("q-btn"),pl=(0,n.g2)("q-card-actions"),vl=(0,n.g2)("q-card"),cl=(0,n.g2)("q-dialog"),ml=(0,n.g2)("q-badge"),rl=(0,n.g2)("q-item-section"),gl=(0,n.g2)("q-icon"),fl=(0,n.g2)("q-expansion-item"),kl=(0,n.g2)("q-page"),bl=(0,n.gN)("close-popup");return(0,n.uX)(),(0,n.Wv)(kl,null,{default:(0,n.k6)((()=>[(0,n.bF)(cl,{modelValue:a.value.events.openModal,"onUpdate:modelValue":i[6]||(i[6]=l=>a.value.events.openModal=l),persistent:""},{default:(0,n.k6)((()=>[(0,n.bF)(vl,{style:{width:"100%"}},{default:(0,n.k6)((()=>[(0,n.bF)(ul,null,{default:(0,n.k6)((()=>[(0,n.Lk)("span",o,(0,t.v_)(a.value.events.input.length?`${a.value.events.input}`:`#${a.value.events.id}`),1),s])),_:1}),(0,n.bF)(ul,{class:"q-pt-none"},{default:(0,n.k6)((()=>[d,(0,n.bF)(il,{dense:"",modelValue:e.value,"onUpdate:modelValue":[i[0]||(i[0]=l=>e.value=l),i[1]||(i[1]=l=>H(l))],onKeyup:i[2]||(i[2]=(0,u.jR)((l=>a.value.events.openModal=!1),["enter"]))},null,8,["modelValue"])])),_:1}),(0,n.bF)(ul,{style:{display:"flex",gap:"5px"}},{default:(0,n.k6)((()=>[(0,n.bF)(ol,{dense:"",color:"positive",modelValue:X.value,"onUpdate:modelValue":i[3]||(i[3]=l=>X.value=l)},null,8,["modelValue"]),(0,n.eW)(" Cheltuieli firma 11% ")])),_:1}),(0,n.bF)(ul,null,{default:(0,n.k6)((()=>[p,(0,n.bF)(sl,{style:{width:"100%","max-width":"85px"},outlined:"",modelValue:P.value,"onUpdate:modelValue":i[4]||(i[4]=l=>P.value=l),dense:"",options:O.value},null,8,["modelValue","options"])])),_:1}),(0,n.bF)(pl,{align:"right",class:"text-primary"},{default:(0,n.k6)((()=>[(0,n.bo)((0,n.bF)(dl,{flat:"",label:"Inchide"},null,512),[[bl]]),(0,n.bo)((0,n.bF)(dl,{flat:"",label:"Salveaza",onClick:i[5]||(i[5]=l=>Z(a.value.events.id,"events"))},null,512),[[bl]])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,n.bF)(cl,{modelValue:a.value.spendings.openModal,"onUpdate:modelValue":i[12]||(i[12]=l=>a.value.spendings.openModal=l),persistent:""},{default:(0,n.k6)((()=>[(0,n.bF)(vl,{style:{width:"100%"}},{default:(0,n.k6)((()=>[(0,n.bF)(ul,null,{default:(0,n.k6)((()=>[(0,n.Lk)("span",v,(0,t.v_)(a.value.spendings.input.length?`${a.value.spendings.input}`:`#${a.value.spendings.id}`),1),c])),_:1}),(0,n.bF)(ul,{class:"q-pt-none"},{default:(0,n.k6)((()=>[m,(0,n.bF)(il,{dense:"",modelValue:e.value,"onUpdate:modelValue":[i[7]||(i[7]=l=>e.value=l),i[8]||(i[8]=l=>J(l))],onKeyup:i[9]||(i[9]=(0,u.jR)((l=>a.value.spendings.openModal=!1),["enter"]))},null,8,["modelValue"])])),_:1}),(0,n.bF)(ul,null,{default:(0,n.k6)((()=>[r,(0,n.bF)(sl,{style:{width:"100%","max-width":"85px"},outlined:"",modelValue:P.value,"onUpdate:modelValue":i[10]||(i[10]=l=>P.value=l),dense:"",options:O.value},null,8,["modelValue","options"])])),_:1}),(0,n.bF)(pl,{align:"right",class:"text-primary"},{default:(0,n.k6)((()=>[(0,n.bo)((0,n.bF)(dl,{flat:"",label:"Inchide"},null,512),[[bl]]),(0,n.bo)((0,n.bF)(dl,{flat:"",label:"Salveaza",onClick:i[11]||(i[11]=l=>Z(a.value.spendings.id,"spendings"))},null,512),[[bl]])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,n.bF)(fl,null,{header:(0,n.k6)((()=>[(0,n.bF)(rl,null,{default:(0,n.k6)((()=>[(0,n.Lk)("div",null,[(0,n.Lk)("h6",g,[(0,n.eW)("Evenimente "),(0,n.bF)(ml,{style:{right:"-20px","font-weight":"500"},rounded:"",floating:"",color:"positive",label:N.value.events?.length},null,8,["label"])])])])),_:1})])),default:(0,n.k6)((()=>[(0,n.bF)(vl,null,{default:(0,n.k6)((()=>[(0,n.bF)(ul,{style:{"padding-top":"0"}},{default:(0,n.k6)((()=>[(0,n.Lk)("div",f,[(0,n.bF)(dl,{style:{"margin-bottom":"5px"},dense:"","no-caps":"",flat:"",onClick:i[13]||(i[13]=l=>tl("events")),color:"primary",label:"Adauga eveniment",icon:"add"})]),(0,n.Lk)("div",k,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(N.value.events,(({value:l,id:e,focus:a,name:u})=>((0,n.uX)(),(0,n.CE)("div",null,[(0,n.Lk)("label",b,[(0,n.eW)((0,t.v_)("Eveniment "+(u.length?`- ${u}`:`#${e}`))+" ",1),(0,n.bF)(gl,{onClick:l=>Y(e,u,"events"),size:"16px",color:"grey",style:{cursor:"pointer"},name:"settings"},null,8,["onClick"])]),(0,n.bF)(il,{style:{width:"100px"},dense:"",onBlur:l=>el(e,"events"),onFocus:l=>ll(e,"events"),outlined:a,filled:!a,type:"number",pattern:"\\d*",onWheel:i[14]||(i[14]=l=>nl(l)),"onUpdate:modelValue":l=>al(e,l,"events"),"model-value":l},null,8,["onBlur","onFocus","outlined","filled","onUpdate:modelValue","model-value"])])))),256))])])),_:1})])),_:1})])),_:1}),(0,n.bF)(fl,null,{header:(0,n.k6)((()=>[(0,n.bF)(rl,null,{default:(0,n.k6)((()=>[(0,n.Lk)("div",null,[(0,n.Lk)("h6",x,[(0,n.eW)("Cheltuieli "),(0,n.bF)(ml,{style:{right:"-20px","font-weight":"500"},rounded:"",floating:"",color:"negative",label:"1"})])])])),_:1})])),default:(0,n.k6)((()=>[(0,n.bF)(vl,null,{default:(0,n.k6)((()=>[(0,n.bF)(ul,{style:{"padding-top":"0"}},{default:(0,n.k6)((()=>[(0,n.Lk)("div",y,[(0,n.bF)(dl,{style:{"margin-bottom":"5px"},dense:"","no-caps":"",flat:"",onClick:i[15]||(i[15]=l=>tl("spendings")),color:"primary",label:"Adauga cheltuiala",icon:"add"})]),(0,n.Lk)("div",h,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(N.value.spendings,(({value:l,id:e,focus:a,name:u})=>((0,n.uX)(),(0,n.CE)("div",null,[(0,n.Lk)("label",L,[(0,n.eW)((0,t.v_)("Cheltuiala "+(u.length?`- ${u}`:`#${e}`))+" ",1),(0,n.bF)(gl,{onClick:l=>Y(e,u,"spendings"),size:"16px",color:"grey",style:{cursor:"pointer"},name:"settings"},null,8,["onClick"])]),(0,n.bF)(il,{style:{width:"100px"},dense:"",onBlur:l=>el(e,"spendings"),onFocus:l=>ll(e,"spendings"),outlined:a,filled:!a,type:"number",pattern:"\\d*",onWheel:i[16]||(i[16]=l=>nl(l)),"onUpdate:modelValue":l=>al(e,l,"spendings"),"model-value":l},null,8,["onBlur","onFocus","outlined","filled","onUpdate:modelValue","model-value"])])))),256))])])),_:1})])),_:1})])),_:1}),(0,n.Lk)("div",F,[_,(0,n.Lk)("div",C,[(0,n.Lk)("div",V,[S,(0,n.Lk)("span",null,(0,t.v_)(G.value.totalSumaEvenimente),1)]),(0,n.eW)(" - "),(0,n.Lk)("div",A,[E,(0,n.Lk)("span",null,(0,t.v_)(G.value.totalSumaCheltuieli),1)]),(0,n.eW)(" = "),(0,n.Lk)("div",q,[R,(0,n.Lk)("span",null,(0,t.v_)(G.value.totalSumaRamasaDupaCheltuieli),1)])]),(0,n.Lk)("div",Q,[(0,n.Lk)("div",U,[w,(0,n.Lk)("span",null,(0,t.v_)(G.value.catalin),1)]),(0,n.Lk)("div",I,[z,(0,n.Lk)("span",null,(0,t.v_)(G.value.vali),1)]),(0,n.Lk)("div",K,[W,(0,n.Lk)("span",null,(0,t.v_)(G.value.ion),1)]),(0,n.Lk)("div",M,[$,(0,n.Lk)("span",null,(0,t.v_)(G.value.radu),1)]),(0,n.Lk)("div",B,[T,(0,n.Lk)("span",null,(0,t.v_)(G.value.sarpe),1)]),(0,n.Lk)("div",j,[D,(0,n.Lk)("span",null,(0,t.v_)(G.value.tony),1)])])])])),_:1})}}};var N=a(3177),P=a(3228),O=a(7569),G=a(4685),H=a(8020),J=a(790),Y=a(1921),Z=a(6334),ll=a(7954),el=a(2750),al=a(3418),nl=a(4031),tl=a(4609),ul=a(2769),il=a(8582),ol=a.n(il);const sl=X,dl=sl;ol()(X,"components",{QPage:N.A,QDialog:P.A,QCard:O.A,QCardSection:G.A,QInput:H.A,QCheckbox:J.A,QSelect:Y.A,QCardActions:Z.A,QBtn:ll.A,QExpansionItem:el.A,QItemSection:al.A,QBadge:nl.A,QIcon:tl.A}),ol()(X,"directives",{ClosePopup:ul.A})}}]);