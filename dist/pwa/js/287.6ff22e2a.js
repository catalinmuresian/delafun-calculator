"use strict";(globalThis["webpackChunkdelafun_calculator"]=globalThis["webpackChunkdelafun_calculator"]||[]).push([[287],{5287:(e,l,a)=>{a.r(l),a.d(l,{default:()=>Re});a(239);var t=a(1758),n=a(8790),u=a(9104),o=a(8734);const i=(0,t.Lk)("span",{class:"q-ml-sm"},"Esti sigur ca vrei sa stergi acest event ?",-1),s=(0,t.Lk)("span",{class:"q-ml-sm"},"Esti sigur ca vrei sa stergi aceasta cheltuiala ?",-1),d=(0,t.Lk)("span",{class:"q-ml-sm"},"Esti sigur ca vrei sa resetezi totul ?",-1),r={style:{display:"flex",width:"100%","justify-content":"space-between","align-items":"center"}},p={style:{color:"grey","font-size":"12px","margin-bottom":"5px","text-transform":"capitalize"}},v=(0,t.Lk)("div",{class:"text-h6"},"Setari eveniment",-1),c=(0,t.Lk)("span",null,"Nume",-1),m={style:{display:"flex","align-items":"flex-start",gap:"5px"}},f={style:{display:"flex",gap:"10px","margin-top":"5px"}},b=(0,t.Lk)("span",{style:{"margin-bottom":"6px",display:"block"}},"Selecteaza moneda",-1),g={style:{display:"flex",width:"100%","justify-content":"space-between","align-items":"center"}},h={style:{color:"grey","font-size":"12px","margin-bottom":"5px","text-transform":"capitalize"}},y=(0,t.Lk)("div",{style:{"font-size":"16px"}},"Setari cheltuiala",-1),k=(0,t.Lk)("span",null,"Nume",-1),x=(0,t.Lk)("span",{style:{"margin-bottom":"6px",display:"block"}},"Selecteaza moneda",-1),F={style:{margin:"0",position:"relative",display:"inline"}},C={style:{display:"flex","justify-content":"flex-end"}},L={style:{display:"flex","flex-direction":"column",gap:"10px"}},S={style:{"margin-bottom":"2px",display:"flex","align-items":"center",gap:"5px"}},_={style:{display:"flex",gap:"15px","align-items":"center"}},E={style:{display:"flex"}},V={key:0,style:{display:"flex","align-items":"flex-start",gap:"3px"}},A={style:{display:"flex","flex-direction":"column","padding-top":"1px"}},w=(0,t.Lk)("span",{style:{"font-size":"10px",color:"grey","font-weight":"500"}},"- 11% Firma",-1),R={style:{"font-size":"14px",color:"black","font-weight":"500"}},M={key:1,style:{display:"flex","align-items":"flex-start",gap:"3px"}},Q={style:{display:"flex","flex-direction":"column","padding-top":"1px"}},W={style:{"font-size":"10px",color:"grey","font-weight":"500"}},K={style:{"font-size":"14px",color:"black","font-weight":"500",display:"flex",gap:"5px","flex-wrap":"wrap"}},q={style:{margin:"0",position:"relative",display:"inline"}},z={style:{display:"flex","justify-content":"flex-end"}},U={style:{display:"flex","flex-direction":"column",gap:"10px"}},$={style:{"margin-bottom":"2px",display:"flex","align-items":"center",gap:"5px"}},T={style:{padding:"0 16px","margin-top":"20px",display:"flex","align-items":"center",gap:"10px"}},X={key:0,style:{"margin-top":"20px",padding:"0 16px"}},D={key:0,style:{color:"grey","font-size":"10px",display:"flex","align-items":"center",gap:"3px"}},I={class:"flex",style:{gap:"10px","align-items":"center"}},j={class:"cont"},N=(0,t.Lk)("label",{class:"label"},"Total suma evenimente",-1),B={class:"cont"},P=(0,t.Lk)("label",{class:"label"},"Total suma cheltuieli",-1),O={key:0},G={key:1,class:"cont"},H=(0,t.Lk)("label",{class:"label"},"Total suma cheltuieli lei schimbat",-1),J={class:"cont"},Y=(0,t.Lk)("label",{class:"label"},"Total suma ramasa",-1),Z={class:"flex",style:{gap:"10px","align-items":"center","margin-top":"20px"}},ee={class:"cont"},le=(0,t.Lk)("label",{class:"label"},"Total suma evenimente lei",-1),ae={class:"cont"},te=(0,t.Lk)("label",{class:"label"},"Total suma cheltuieli lei",-1),ne={key:0},ue={key:1,class:"cont"},oe=(0,t.Lk)("label",{class:"label"},"Total suma cheltuieli euro schimbat",-1),ie={class:"cont"},se=(0,t.Lk)("label",{class:"label"},"Total suma ramasa lei",-1),de={__name:"IndexPage",setup(e){const l=(0,o.KR)(!0),a=(0,o.KR)(!0),de=(0,o.KR)(!1),re=(0,o.KR)(!1),pe=(0,o.KR)([]),ve=(0,o.KR)(["Ion","Radu","Sarpe","Tony","Catalin","Vali"]),ce=(0,o.KR)(null),me=(0,o.KR)("€"),fe=(0,o.KR)(!1),be=(0,o.KR)(!1),ge=[{name:"name",required:!0,label:"Nume",align:"left",field:e=>e.name,format:e=>`${e}`,sortable:!0},{name:"euro",align:"center",label:"Euro",field:"euro",format:e=>`${e} €`,sortable:!0},{name:"lei",label:"Lei",field:"lei",format:e=>`${e} lei`,sortable:!0}],he=[{name:"Catalin",euro:0,lei:0,totalAvans:null},{name:"Vali",euro:0,lei:0,totalAvans:null},{name:"Ion",euro:0,lei:0,totalAvans:null},{name:"Sarpe",euro:0,lei:0,totalAvans:null},{name:"Tony",euro:0,lei:0,totalAvans:null},{name:"Radu",euro:0,lei:0,totalAvans:null}],ye=(0,o.KR)(""),ke=(0,o.KR)({events:{index:null,input:"",openModal:!1},spendings:{index:null,input:"",openModal:!1}}),xe=(0,o.KR)(!1),Fe=(0,o.KR)(!1),Ce=(0,o.KR)({events:[],spendings:[]}),Le=(0,o.KR)(""),Se=(0,o.KR)(["lei","€"]),_e=(0,o.KR)({totalSumaEvenimenteEuro:0,totalSumaCheltuieliEuro:0,totalSumaRamasaDupaCheltuieliEuro:0,totalSumaRamasaDupaCatalinSiValiEuro:0,totalSumaEvenimenteLei:0,totalSumaCheltuieliLei:0,totalSumaRamasaDupaCheltuieliLei:0,totalSumaRamasaDupaCatalinSiValiLei:0,totalSumaCheltuieliLeiSchimbat:0,totalSumaCheltuieliEuroSchimbat:0}),Ee=(0,o.KR)(!1);function Ve(){return Ce.value.events.length<1}function Ae(){Ee.value=!1,fe.value=!1,Ce.value.events=[],Ce.value.spendings=[];const e=Object.keys(_e.value);e.forEach((e=>{_e[e]=0})),he.forEach((e=>{e.euro=0,e.lei=0})),Le.value="",l.value=!1,a.value=!1}function we(){let e,t,n,u;fe.value=!0,Ee.value=!0,l.value=!1,a.value=!1,_e.value.totalSumaCheltuieliLeiSchimbat=0,_e.value.totalSumaCheltuieliEuroSchimbat=0;const o={euro:[],lei:[]},i={euro:[],lei:[]};Ce.value.events.forEach((e=>{const l="lei"===e.currency?"lei":"euro";o[l].push(e.companyEvent?e.priceWithCompanySpendings:1*e.value)})),Ce.value.spendings.forEach((e=>{const l="lei"===e.currency?"lei":"euro";i[l].push(1*e.value)})),e=o.euro.reduce(((e,l)=>e+l),0),t=o.lei.reduce(((e,l)=>e+l),0),n=i.euro.reduce(((e,l)=>e+l),0),u=i.lei.reduce(((e,l)=>e+l),0);let s=e,d=t;if(t>u)d=t-u;else{const e=u-t;d=0,s-=e/5,_e.value.totalSumaCheltuieliLeiSchimbat=e/5}if(e>n)s-=n;else{const l=n-e;s=0,d-=5*l,_e.value.totalSumaCheltuieliEuroSchimbat=5*l}const r=.13*s,p=.13*s,v=.13*d,c=.13*d,m=s-(r+p),f=d-(v+c),b={ion:0,sarpe:0,radu:0,tony:0},g={ion:0,sarpe:0,radu:0,tony:0},h=Object.keys(b),y=Object.keys(g);h.forEach((e=>{b[e]=m/4})),y.forEach((e=>{g[e]=f/4})),_e.value.totalSumaEvenimenteEuro=e,_e.value.totalSumaCheltuieliEuro=n,_e.value.totalSumaRamasaDupaCheltuieliEuro=s,_e.value.totalSumaRamasaDupaCatalinSiValiEuro=m,he.forEach((e=>{"Catalin"===e.name&&(e.euro=Math.floor(r),e.lei=Math.floor(v)),"Vali"===e.name&&(e.euro=Math.floor(p),e.lei=Math.floor(c)),"Ion"===e.name&&(e.euro=Math.floor(b.ion),e.lei=Math.floor(g.ion)),"Radu"===e.name&&(e.euro=Math.floor(b.radu),e.lei=Math.floor(g.radu)),"Sarpe"===e.name&&(e.euro=Math.floor(b.sarpe),e.lei=Math.floor(g.sarpe)),"Tony"===e.name&&(e.euro=Math.floor(b.tony),e.lei=Math.floor(g.tony))})),_e.value.totalSumaEvenimenteLei=t,_e.value.totalSumaCheltuieliLei=u,_e.value.totalSumaRamasaDupaCheltuieliLei=d,_e.value.totalSumaRamasaDupaCatalinSiValiLei=f;const k={Catalin:[],Vali:[],Ion:[],Radu:[],Sarpe:[],Tony:[]};Ce.value.events.forEach((e=>{if(e.ifAvans){const l="€"===e.valutaAvans?"euro":"lei",a="€"===e.valutaAvans?"lei":"euro",t=(e.pretAvans/e.avansMembrii.length).toFixed(0);he.forEach((n=>{e.avansMembrii.includes(n.name)&&(n[l]>t?n[l]=(n[l]-t).toFixed(0):(n[a]=n[a]-("euro"===l?5*(t-n[l]):(t-n[l])/5),n[l]=n[l]-(t-(t-n[l]))),k[n.name].push("euro"===l?1*t:1*t/5))}))}})),he.forEach((e=>{e.totalAvans=k[e.name].reduce(((e,l)=>(e+l).toFixed(0)),0)}))}function Re(e){ye.value=e}function Me(e){ye.value=e}function Qe(e,l,a,t,n,u,o,i,s){xe.value=n||!1,Fe.value=u||!1,ce.value=u?i:null,me.value=u?s:"€",pe.value=u?o:[],ke.value[a].index=e,ke.value[a].openModal=!0,ye.value=l,ke.value[a].input=l,Le.value=t}function We(e,l,a){Ce.value[l].forEach(((e,t)=>{t===ke.value[l].index&&(e.name=ye.value,e.currency=a,"events"===l&&(e.companyEvent=xe.value,e.priceWithCompanySpendings=Ke(e.value),ce.value&&pe.value.length?(e.ifAvans=Fe.value,e.pretAvans=ce.value,e.valutaAvans=me.value,e.avansMembrii=pe.value):e.ifAvans=!1))})),ye.value=""}function Ke(e){return e-.11*e}function qe(e,l){Ce.value[l].forEach(((l,a)=>{a===e&&(l.focus=!0)}))}function ze(e,l){Ce.value[l].forEach(((l,a)=>{a===e&&(l.focus=!1),l.companyEvent&&(l.priceWithCompanySpendings=Ke(l.value))}))}function Ue(e,l,a){Ce.value[a].forEach(((a,t)=>{t===e&&(a.value=l)}))}function $e(e){e.target.blur()}function Te(e){Ce.value[e].push({value:null,focus:!1,name:"",avansMembrii:[],currency:"€",pretAvans:null,valutaAvans:"€",ifAvans:!1})}function Xe(e,l){Ce.value[l].splice(e,1),de.value=!1,re.value=!1,ke.value.events.openModal=!1,ke.value.spendings.openModal=!1}return(e,o)=>{const Ke=(0,t.g2)("q-card-section"),De=(0,t.g2)("q-btn"),Ie=(0,t.g2)("q-card-actions"),je=(0,t.g2)("q-card"),Ne=(0,t.g2)("q-dialog"),Be=(0,t.g2)("q-input"),Pe=(0,t.g2)("q-checkbox"),Oe=(0,t.g2)("q-select"),Ge=(0,t.g2)("q-badge"),He=(0,t.g2)("q-item-section"),Je=(0,t.g2)("q-icon"),Ye=(0,t.g2)("q-expansion-item"),Ze=(0,t.g2)("q-td"),el=(0,t.g2)("q-tr"),ll=(0,t.g2)("q-table"),al=(0,t.g2)("q-page"),tl=(0,t.gN)("close-popup");return(0,t.uX)(),(0,t.Wv)(al,{style:{"min-height":"unset"}},{default:(0,t.k6)((()=>[(0,t.bF)(Ne,{modelValue:de.value,"onUpdate:modelValue":o[1]||(o[1]=e=>de.value=e),persistent:""},{default:(0,t.k6)((()=>[(0,t.bF)(je,null,{default:(0,t.k6)((()=>[(0,t.bF)(Ke,{class:"row items-center"},{default:(0,t.k6)((()=>[i])),_:1}),(0,t.bF)(Ie,{align:"right"},{default:(0,t.k6)((()=>[(0,t.bo)((0,t.bF)(De,{flat:"",label:"Nu","no-caps":"",color:"grey"},null,512),[[tl]]),(0,t.bo)((0,t.bF)(De,{flat:"","no-caps":"",onClick:o[0]||(o[0]=e=>Xe(ke.value.events.index,"events")),label:"Da",color:"info"},null,512),[[tl]])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,t.bF)(Ne,{modelValue:re.value,"onUpdate:modelValue":o[3]||(o[3]=e=>re.value=e),persistent:""},{default:(0,t.k6)((()=>[(0,t.bF)(je,null,{default:(0,t.k6)((()=>[(0,t.bF)(Ke,{class:"row items-center"},{default:(0,t.k6)((()=>[s])),_:1}),(0,t.bF)(Ie,{align:"right"},{default:(0,t.k6)((()=>[(0,t.bo)((0,t.bF)(De,{flat:"",label:"Nu","no-caps":"",color:"grey"},null,512),[[tl]]),(0,t.bo)((0,t.bF)(De,{flat:"","no-caps":"",onClick:o[2]||(o[2]=e=>Xe(ke.value.spendings.index,"spendings")),label:"Da",color:"info"},null,512),[[tl]])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,t.bF)(Ne,{modelValue:be.value,"onUpdate:modelValue":o[4]||(o[4]=e=>be.value=e),persistent:""},{default:(0,t.k6)((()=>[(0,t.bF)(je,null,{default:(0,t.k6)((()=>[(0,t.bF)(Ke,{class:"row items-center"},{default:(0,t.k6)((()=>[d])),_:1}),(0,t.bF)(Ie,{align:"right"},{default:(0,t.k6)((()=>[(0,t.bo)((0,t.bF)(De,{flat:"",label:"Nu","no-caps":"",color:"grey"},null,512),[[tl]]),(0,t.bo)((0,t.bF)(De,{flat:"","no-caps":"",onClick:Ae,label:"Da",color:"info"},null,512),[[tl]])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,t.bF)(Ne,{modelValue:ke.value.events.openModal,"onUpdate:modelValue":o[17]||(o[17]=e=>ke.value.events.openModal=e),persistent:""},{default:(0,t.k6)((()=>[(0,t.bF)(je,{style:{width:"100%"}},{default:(0,t.k6)((()=>[(0,t.bF)(Ke,null,{default:(0,t.k6)((()=>[(0,t.Lk)("div",r,[(0,t.Lk)("span",p,(0,n.v_)(ke.value.events.input.length?`${ke.value.events.input}`:`#${ke.value.events.index+1}`),1),(0,t.bo)((0,t.bF)(De,{icon:"close",dense:"",color:"grey",flat:""},null,512),[[tl]])]),v])),_:1}),(0,t.bF)(Ke,{class:"q-pt-none"},{default:(0,t.k6)((()=>[c,(0,t.bF)(Be,{dense:"",autofocus:"",modelValue:ye.value,"onUpdate:modelValue":[o[5]||(o[5]=e=>ye.value=e),o[6]||(o[6]=e=>Re(e))],onKeyup:o[7]||(o[7]=(0,u.jR)((e=>ke.value.events.openModal=!1),["enter"]))},null,8,["modelValue"])])),_:1}),(0,t.bF)(Ke,{style:{display:"flex",gap:"5px","align-items":"flex-start"}},{default:(0,t.k6)((()=>[(0,t.bF)(Pe,{dense:"",color:"orange",modelValue:xe.value,"onUpdate:modelValue":o[8]||(o[8]=e=>xe.value=e)},null,8,["modelValue"]),(0,t.eW)(" Cheltuieli firma 11% ")])),_:1}),(0,t.bF)(Ke,{style:{display:"flex",gap:"5px","align-items":"flex-start","flex-direction":"column"}},{default:(0,t.k6)((()=>[(0,t.Lk)("div",m,[(0,t.bF)(Pe,{dense:"",color:"positive",modelValue:Fe.value,"onUpdate:modelValue":o[9]||(o[9]=e=>Fe.value=e)},null,8,["modelValue"]),(0,t.eW)(" Avans ")]),(0,t.bo)((0,t.Lk)("div",f,[(0,t.bF)(Be,{class:(0,n.C4)(["input-avans",ce.value?"input-price-right":"input-price-left"]),placeholder:"Pret avans",style:{width:"110px"},dense:"",outlined:"",type:"number",pattern:"\\d*",onWheel:o[10]||(o[10]=e=>$e(e)),modelValue:ce.value,"onUpdate:modelValue":o[11]||(o[11]=e=>ce.value=e)},null,8,["class","modelValue"]),(0,t.bF)(Oe,{class:"currency-select",behavior:"menu",style:{width:"100%","max-width":"75px"},outlined:"",modelValue:me.value,"onUpdate:modelValue":o[12]||(o[12]=e=>me.value=e),dense:"",options:Se.value},null,8,["modelValue","options"])],512),[[u.aG,Fe.value]]),(0,t.bo)((0,t.bF)(Oe,{style:{"min-width":"200px"},outlined:"",behavior:"menu",dense:"",modelValue:pe.value,"onUpdate:modelValue":o[13]||(o[13]=e=>pe.value=e),multiple:"",options:ve.value,"use-chips":"",label:"Selecteaza membrii"},null,8,["modelValue","options"]),[[u.aG,Fe.value]])])),_:1}),(0,t.bF)(Ke,null,{default:(0,t.k6)((()=>[b,(0,t.bF)(Oe,{class:"currency-select",behavior:"menu",style:{width:"100%","max-width":"75px"},outlined:"",modelValue:Le.value,"onUpdate:modelValue":o[14]||(o[14]=e=>Le.value=e),dense:"",options:Se.value},null,8,["modelValue","options"])])),_:1}),(0,t.bF)(Ie,{align:"between",class:"text-primary"},{default:(0,t.k6)((()=>[(0,t.bF)(De,{flat:"",label:"Sterge",color:"negative","no-caps":"",onClick:o[15]||(o[15]=e=>de.value=!0)}),(0,t.bo)((0,t.bF)(De,{flat:"",label:"Salveaza","no-caps":"",type:"submit",onClick:o[16]||(o[16]=e=>We(ke.value.events.index,"events",Le.value))},null,512),[[tl]])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,t.bF)(Ne,{modelValue:ke.value.spendings.openModal,"onUpdate:modelValue":o[24]||(o[24]=e=>ke.value.spendings.openModal=e),persistent:""},{default:(0,t.k6)((()=>[(0,t.bF)(je,{style:{width:"100%"}},{default:(0,t.k6)((()=>[(0,t.bF)(Ke,null,{default:(0,t.k6)((()=>[(0,t.Lk)("div",g,[(0,t.Lk)("span",h,(0,n.v_)(ke.value.spendings.input.length?`${ke.value.spendings.input}`:`#${ke.value.spendings.index+1}`),1),(0,t.bo)((0,t.bF)(De,{icon:"close",dense:"",color:"grey",flat:""},null,512),[[tl]])]),y])),_:1}),(0,t.bF)(Ke,{class:"q-pt-none"},{default:(0,t.k6)((()=>[k,(0,t.bF)(Be,{dense:"",autofocus:"",modelValue:ye.value,"onUpdate:modelValue":[o[18]||(o[18]=e=>ye.value=e),o[19]||(o[19]=e=>Me(e))],onKeyup:o[20]||(o[20]=(0,u.jR)((e=>ke.value.spendings.openModal=!1),["enter"]))},null,8,["modelValue"])])),_:1}),(0,t.bF)(Ke,null,{default:(0,t.k6)((()=>[x,(0,t.bF)(Oe,{style:{width:"100%","max-width":"85px"},outlined:"",behavior:"menu",modelValue:Le.value,"onUpdate:modelValue":o[21]||(o[21]=e=>Le.value=e),dense:"",options:Se.value},null,8,["modelValue","options"])])),_:1}),(0,t.bF)(Ie,{align:"between",class:"text-primary"},{default:(0,t.k6)((()=>[(0,t.bF)(De,{flat:"",label:"Sterge","no-caps":"",color:"negative",onClick:o[22]||(o[22]=e=>re.value=!0)}),(0,t.bo)((0,t.bF)(De,{flat:"",label:"Salveaza","no-caps":"",onClick:o[23]||(o[23]=e=>We(ke.value.spendings.index,"spendings",Le.value))},null,512),[[tl]])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,t.bF)(Ye,{modelValue:l.value,"onUpdate:modelValue":o[27]||(o[27]=e=>l.value=e)},{header:(0,t.k6)((()=>[(0,t.bF)(He,null,{default:(0,t.k6)((()=>[(0,t.Lk)("div",null,[(0,t.Lk)("h6",F,[(0,t.eW)("Evenimente "),Ce.value.events.length?((0,t.uX)(),(0,t.Wv)(Ge,{key:0,style:{right:"-20px","font-weight":"500"},rounded:"",floating:"",color:"positive",label:Ce.value.events?.length},null,8,["label"])):(0,t.Q3)("",!0)])])])),_:1})])),default:(0,t.k6)((()=>[(0,t.bF)(je,null,{default:(0,t.k6)((()=>[(0,t.bF)(Ke,{style:{"padding-top":"0"}},{default:(0,t.k6)((()=>[(0,t.Lk)("div",C,[(0,t.bF)(De,{style:{"margin-bottom":"5px"},dense:"","no-caps":"",flat:"",onClick:o[25]||(o[25]=e=>Te("events")),color:"info",label:"Adauga eveniment",icon:"add"})]),(0,t.Lk)("div",L,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(Ce.value.events,(({value:e,focus:l,name:a,currency:u,companyEvent:i,priceWithCompanySpendings:s,ifAvans:d,avansMembrii:r,pretAvans:p,valutaAvans:v},c)=>((0,t.uX)(),(0,t.CE)("div",null,[(0,t.Lk)("label",S,[(0,t.eW)((0,n.v_)("Eveniment "+(a.length?`- ${a}`:`#${c+1}`))+" ",1),(0,t.bF)(Je,{onClick:e=>Qe(c,a,"events",u,i,d,r,p,v),size:"22px",color:"grey",style:{cursor:"pointer"},name:"settings"},null,8,["onClick"])]),(0,t.Lk)("div",_,[(0,t.Lk)("div",E,[(0,t.bF)(Be,{style:{width:"100px"},class:"input-events-spendings",dense:"",suffix:u,onBlur:e=>ze(c,"events"),onFocus:e=>qe(c,"events"),outlined:l,filled:!l,type:"number",pattern:"\\d*",onWheel:o[26]||(o[26]=e=>$e(e)),"onUpdate:modelValue":e=>Ue(c,e,"events"),"model-value":e},null,8,["suffix","onBlur","onFocus","outlined","filled","onUpdate:modelValue","model-value"])]),i?((0,t.uX)(),(0,t.CE)("div",V,[(0,t.bF)(Je,{size:"18px",color:"orange",name:"info"}),(0,t.Lk)("div",A,[w,(0,t.Lk)("span",R,(0,n.v_)(`${s} ${u}`),1)])])):(0,t.Q3)("",!0),d?((0,t.uX)(),(0,t.CE)("div",M,[(0,t.bF)(Je,{size:"18px",color:"green",name:"info"}),(0,t.Lk)("div",Q,[(0,t.Lk)("span",W,(0,n.v_)(`Avans - ${p} ${v}`),1),(0,t.Lk)("div",K,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(r,((e,l)=>((0,t.uX)(),(0,t.CE)("span",null,(0,n.v_)(`${e}${l+1!==r.length?",":""}`),1)))),256))])])])):(0,t.Q3)("",!0)])])))),256))])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,t.bF)(Ye,{modelValue:a.value,"onUpdate:modelValue":o[30]||(o[30]=e=>a.value=e)},{header:(0,t.k6)((()=>[(0,t.bF)(He,null,{default:(0,t.k6)((()=>[(0,t.Lk)("div",null,[(0,t.Lk)("h6",q,[(0,t.eW)("Cheltuieli "),Ce.value.spendings.length?((0,t.uX)(),(0,t.Wv)(Ge,{key:0,style:{right:"-20px","font-weight":"500"},rounded:"",floating:"",color:"negative",label:Ce.value.spendings?.length},null,8,["label"])):(0,t.Q3)("",!0)])])])),_:1})])),default:(0,t.k6)((()=>[(0,t.bF)(je,null,{default:(0,t.k6)((()=>[(0,t.bF)(Ke,{style:{"padding-top":"0"}},{default:(0,t.k6)((()=>[(0,t.Lk)("div",z,[(0,t.bF)(De,{style:{"margin-bottom":"5px"},dense:"","no-caps":"",flat:"",onClick:o[28]||(o[28]=e=>Te("spendings")),color:"info",label:"Adauga cheltuiala",icon:"add"})]),(0,t.Lk)("div",U,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(Ce.value.spendings,(({value:e,focus:l,name:a,currency:u},i)=>((0,t.uX)(),(0,t.CE)("div",null,[(0,t.Lk)("label",$,[(0,t.eW)((0,n.v_)("Cheltuiala "+(a.length?`- ${a}`:`#${i+1}`))+" ",1),(0,t.bF)(Je,{onClick:e=>Qe(i,a,"spendings",u),size:"22px",color:"grey",style:{cursor:"pointer"},name:"settings"},null,8,["onClick"])]),(0,t.bF)(Be,{class:"input-events-spendings",style:{width:"100px"},dense:"",onBlur:e=>ze(i,"spendings"),onFocus:e=>qe(i,"spendings"),outlined:l,suffix:u,filled:!l,type:"number",pattern:"\\d*",onWheel:o[29]||(o[29]=e=>$e(e)),"onUpdate:modelValue":e=>Ue(i,e,"spendings"),"model-value":e},null,8,["onBlur","onFocus","outlined","suffix","filled","onUpdate:modelValue","model-value"])])))),256))])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,t.Lk)("div",T,[(0,t.bF)(De,{style:{width:"100%"},color:"info","no-caps":"",dense:"",disabled:Ve(),onClick:o[31]||(o[31]=e=>we())},{default:(0,t.k6)((()=>[(0,t.eW)("Calculeaza")])),_:1},8,["disabled"]),Ee.value?((0,t.uX)(),(0,t.Wv)(De,{key:0,round:"",onClick:o[32]||(o[32]=e=>be.value=!0),dense:"",color:"brown-4",icon:"restart_alt"})):(0,t.Q3)("",!0)]),fe.value?((0,t.uX)(),(0,t.CE)("div",X,[(0,t.bF)(ll,{flat:"","hide-header":"","hide-bottom":"",bordered:"",rows:he,columns:ge,pagination:{rowsPerPage:0},"row-key":"name",separator:"cell"},{body:(0,t.k6)((e=>[(0,t.bF)(el,{props:e},{default:(0,t.k6)((()=>[(0,t.bF)(Ze,{key:"name",style:{display:"flex","align-items":"center","justify-content":"space-between"},props:e},{default:(0,t.k6)((()=>[(0,t.Lk)("span",null,(0,n.v_)(e.row.name),1),e.row.totalAvans?((0,t.uX)(),(0,t.CE)("div",D,[(0,t.bF)(Je,{size:"18px",color:"green",name:"info"}),(0,t.eW)(" "+(0,n.v_)(`${e.row.totalAvans} €`),1)])):(0,t.Q3)("",!0)])),_:2},1032,["props"]),(0,t.bF)(Ze,{key:"euro",props:e},{default:(0,t.k6)((()=>[(0,t.eW)((0,n.v_)(`${e.row.euro} €`),1)])),_:2},1032,["props"]),(0,t.bF)(Ze,{key:"lei",props:e},{default:(0,t.k6)((()=>[(0,t.eW)((0,n.v_)(`${e.row.lei} lei`),1)])),_:2},1032,["props"])])),_:2},1032,["props"])])),_:1}),(0,t.bF)(Ye,{style:{"margin-top":"10px"},dense:"",label:"Detaliat"},{default:(0,t.k6)((()=>[(0,t.bF)(je,null,{default:(0,t.k6)((()=>[(0,t.bF)(Ke,null,{default:(0,t.k6)((()=>[(0,t.Lk)("div",I,[(0,t.Lk)("div",j,[N,(0,t.Lk)("span",null,(0,n.v_)(_e.value.totalSumaEvenimenteEuro)+" euro",1)]),(0,t.eW)(" - "),(0,t.Lk)("div",B,[P,(0,t.Lk)("span",{style:(0,n.Tr)(_e.value.totalSumaCheltuieliEuroSchimbat>1&&"text-decoration: line-through;")},(0,n.v_)(_e.value.totalSumaCheltuieliEuro)+" euro",5)]),_e.value.totalSumaCheltuieliLeiSchimbat>1?((0,t.uX)(),(0,t.CE)("span",O,"-")):(0,t.Q3)("",!0),_e.value.totalSumaCheltuieliLeiSchimbat>1?((0,t.uX)(),(0,t.CE)("div",G,[H,(0,t.Lk)("span",null,(0,n.v_)(_e.value.totalSumaCheltuieliLeiSchimbat)+" euro",1)])):(0,t.Q3)("",!0),(0,t.eW)(" = "),(0,t.Lk)("div",J,[Y,(0,t.Lk)("span",null,(0,n.v_)(_e.value.totalSumaRamasaDupaCheltuieliEuro)+" euro",1)])]),(0,t.Lk)("div",Z,[(0,t.Lk)("div",ee,[le,(0,t.Lk)("span",null,(0,n.v_)(_e.value.totalSumaEvenimenteLei)+" lei",1)]),(0,t.eW)(" - "),(0,t.Lk)("div",ae,[te,(0,t.Lk)("span",{style:(0,n.Tr)(_e.value.totalSumaCheltuieliLeiSchimbat>1&&"text-decoration: line-through;")},(0,n.v_)(_e.value.totalSumaCheltuieliLei)+" lei",5)]),_e.value.totalSumaCheltuieliEuroSchimbat>1?((0,t.uX)(),(0,t.CE)("span",ne,"-")):(0,t.Q3)("",!0),_e.value.totalSumaCheltuieliEuroSchimbat>1?((0,t.uX)(),(0,t.CE)("div",ue,[oe,(0,t.Lk)("span",null,(0,n.v_)(_e.value.totalSumaCheltuieliEuroSchimbat)+" lei",1)])):(0,t.Q3)("",!0),(0,t.eW)(" = "),(0,t.Lk)("div",ie,[se,(0,t.Lk)("span",null,(0,n.v_)(_e.value.totalSumaRamasaDupaCheltuieliLei)+" lei",1)])])])),_:1})])),_:1})])),_:1})])):(0,t.Q3)("",!0)])),_:1})}}};var re=a(3177),pe=a(3228),ve=a(7569),ce=a(7066),me=a(6334),fe=a(7954),be=a(8020),ge=a(790),he=a(1956),ye=a(6586),ke=a(3418),xe=a(4031),Fe=a(4609),Ce=a(1718),Le=a(1239),Se=a(7109),_e=a(1225),Ee=a(2769),Ve=a(8582),Ae=a.n(Ve);const we=de,Re=we;Ae()(de,"components",{QPage:re.A,QDialog:pe.A,QCard:ve.A,QCardSection:ce.A,QCardActions:me.A,QBtn:fe.A,QInput:be.A,QCheckbox:ge.A,QSelect:he.A,QExpansionItem:ye.A,QItemSection:ke.A,QBadge:xe.A,QIcon:Fe.A,QTable:Ce.A,QTr:Le.A,QTd:Se.A,QField:_e.A}),Ae()(de,"directives",{ClosePopup:Ee.A})}}]);