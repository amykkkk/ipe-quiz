const {JSDOM}=require('jsdom');const fs=require('fs'),os=require('os'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','docs','index.html'),'utf8');
const open=(hash='',store={},opts={})=>{const errs=[];const dom=new JSDOM(html,{runScripts:'dangerously',url:'http://localhost/x.html'+hash,beforeParse(w){w.matchMedia=()=>({matches:false});w.scrollTo=()=>{};w.Element.prototype.scrollIntoView=()=>{};w.confirm=opts.confirm||(()=>true);
  if(opts.noStorage){Object.defineProperty(w,'localStorage',{get(){throw new Error('blocked')}});}else for(const k in store)w.localStorage.setItem(k,store[k]);
  w.addEventListener('error',e=>errs.push(e.message));}});const w=dom.window;w.errs=errs;return w;};
const dump=w=>{const o={};for(let i=0;i<w.localStorage.length;i++){const k=w.localStorage.key(i);o[k]=w.localStorage.getItem(k);}return o;};
let failed=0;const T=(name,ok)=>{if(!ok)failed++;console.log((ok?'PASS':'FAIL')+'  '+name);};
const typer=w=>(si,qi,val)=>{const d=w.document;d.getElementById('tab'+si).click();const id=`s${si}q${qi+1}`;d.getElementById(id+'b0').value=val;d.querySelector('#'+id+' .sub').click();return d.getElementById(id+'b0').classList.contains('ok');};
const all=[];const mk=(...a)=>{const w=open(...a);all.push(w);return w;};

let t=typer(mk());
T('1) "28" for "2 8" is wrong',!t(0,16,'28'));
T('1) "71 1" for "7 11" is wrong',!t(3,0,'71 1'));
T('1) "31 52 89" for "3 1 5 2 8 9" is wrong',!t(0,13,'31 52 89'));
t=typer(mk());
T('1) extra spaces "  3  1 5 2 8   9 " still right',t(0,13,'  3  1 5 2 8   9 '));
T('1) "[6,12,14]" without spaces still right',t(2,2,'[6,12,14]'));
T('1) "B20 SA 10" right',t(0,1,'B20 SA 10'));
T('5) "제3정규형(2NF)" wrong for 2NF',!t(0,4,'제3정규형(2NF)'));
t=typer(mk());
T('5) "OSPF(Open Shortest Path First)" right',t(0,15,'OSPF(Open Shortest Path First)'));
T('5) "싱글톤(Singleton)" right',t(0,8,'싱글톤(Singleton)'));
T('5) "(SEED)" right',t(0,6,'(SEED)'));

const w3=mk(),d3=w3.document,E3=w3.eval('EXAMS');
d3.getElementById('s0q4b0').value=E3[0].questions[3].ans[0][0];
d3.getElementById('s0q4b0').dispatchEvent(new w3.KeyboardEvent('keydown',{key:'Enter'}));
T('2) Enter on blank ① does not submit',!d3.getElementById('s0q4').dataset.submitted);
T('2) focus moved to blank ②',d3.activeElement===d3.getElementById('s0q4b1'));
d3.getElementById('s0q4b1').value=E3[0].questions[3].ans[1][0];
d3.getElementById('s0q4b1').dispatchEvent(new w3.KeyboardEvent('keydown',{key:'Enter'}));
T('2) Enter on last blank submits with full score',!!d3.getElementById('s0q4').dataset.submitted&&d3.querySelector('#s0q4 .verdict').textContent.includes('5점 / 5점'));

const w4=mk('#s4q7',dump(w3));T('3) reload with #s4q7 opens 제5회',w4.document.getElementById('setName').textContent==='제5회');

const w5=mk(),d5=w5.document;d5.getElementById('s0q1b0').value='x';d5.querySelector('#s0q1 .sub').click();
d5.getElementById('tab-retest').click();d5.getElementById('rStart').click();d5.getElementById('r0b0').value='y';d5.querySelector('#r0 .sub').click();d5.querySelector('#r0 .override').click();
const wr=JSON.parse(w5.localStorage.getItem('jpk2026_3_wrongnote_v1'))['0-0'];T('4) retest override: cnt back to 1 & mastered ('+wr.cnt+','+wr.mastered+')',wr.cnt===1&&wr.mastered);

let asked=0;const w6=mk('',{},{confirm:()=>{asked++;return false;}}),d6=w6.document;
['s0q1','s0q2'].forEach(id=>{d6.getElementById(id+'b0').value='x';d6.querySelector('#'+id+' .sub').click();});
d6.getElementById('tab-retest').click();d6.getElementById('rStart').click();
d6.getElementById('tab-note').click();d6.querySelector('#nList .one').click();
T('8) new retest mid-way asks first; cancel keeps old one',asked===1&&d6.querySelectorAll('#rList article').length===2);

const st=dump(w3);const pr=JSON.parse(st.jpk2026_3_progress_v1);pr[1].remain=1;st.jpk2026_3_progress_v1=JSON.stringify(pr);
const w7=mk('#set2',st),d7=w7.document;
setTimeout(()=>{
  T('6) time-up banner shown at 0',d7.getElementById('timeup1').style.display==='block'&&d7.getElementById('timer').textContent==='시간 종료');
  d7.querySelector('#timeup1 .tuSubmit').click();
  T('6) "지금 제출" submits whole set and shows result',d7.getElementById('done').textContent==='20'&&d7.getElementById('final1').style.display==='block');
  const w8=mk('',{},{noStorage:true});T('7) storage-blocked warning shown, no script error',w8.document.getElementById('storageWarn').style.display==='block'&&w8.errs.length===0);
  const w9=mk();T('7) no warning when storage works',w9.document.getElementById('storageWarn').style.display==='none');
  w9.document.querySelector('.themeBtn').click();const th=w9.document.documentElement.dataset.theme;const w10=mk('',dump(w9));T('10) theme kept after reload ('+th+')',w10.document.documentElement.dataset.theme===th);
  const A=mk(),dA=A.document;dA.getElementById('s0q1b0').value='mine';dA.getElementById('s0q1b0').dispatchEvent(new A.Event('input'));
  const B=mk('',dump(A)),dB=B.document,EB=B.eval('EXAMS');EB[0].questions.forEach((q,i)=>q.ans.forEach((a,k)=>dB.getElementById(`s0q${i+1}b${k}`).value=a[0]));dB.getElementById('submitAll').click();
  const newVal=B.localStorage.getItem('jpk2026_3_progress_v1');
  A.dispatchEvent(new A.StorageEvent('storage',{key:'jpk2026_3_progress_v1',newValue:newVal}));
  T('9) visible tab shows "changed in another tab" banner',dA.getElementById('syncWarn').style.display==='block');
  A.localStorage.setItem('jpk2026_3_progress_v1',newVal);
  dA.getElementById('syncLoad').click();
  T('9) "최신 기록 불러오기" applies other tab result (제1회 '+dA.getElementById('cur').textContent+'점)',dA.getElementById('cur').textContent==='100'&&dA.getElementById('syncWarn').style.display==='none');
  const errs=all.flatMap(x=>x.errs);console.log('script errors:',errs);
  process.exit(failed||errs.length?1:0);
},1600);
