const {JSDOM}=require('jsdom');const fs=require('fs'),os=require('os'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','docs','index.html'),'utf8');
let store={};
function open(hash=''){
  const errs=[];
  const dom=new JSDOM(html,{runScripts:'dangerously',url:'http://localhost/x.html'+hash,beforeParse(w){
    w.matchMedia=()=>({matches:false});w.scrollTo=()=>{};w.Element.prototype.scrollIntoView=()=>{};w.confirm=()=>true;
    for(const k in store) w.localStorage.setItem(k,store[k]);
    w.addEventListener('error',e=>errs.push(e.message));}});
  return {w:dom.window,d:dom.window.document,errs,keep(){store={};for(let i=0;i<dom.window.localStorage.length;i++){const k=dom.window.localStorage.key(i);store[k]=dom.window.localStorage.getItem(k);}}};
}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  let A=open(); let {w,d}=A; const E=w.eval('EXAMS');
  // set1 fully correct
  E[0].questions.forEach((q,i)=>q.ans.forEach((a,k)=>d.getElementById(`s0q${i+1}b${k}`).value=a[0])); d.getElementById('submitAll').click();
  // set3: submit 5 (3 right, 2 wrong), draft typed in q6
  d.getElementById('tab2').click();
  for(let i=0;i<5;i++){const q=E[2].questions[i];q.ans.forEach((a,k)=>d.getElementById(`s2q${i+1}b${k}`).value=i<3?a[0]:'틀림');d.querySelector(`#s2q${i+1} .sub`).click();}
  // override q5
  d.querySelector('#s2q5 .override').click();
  const inp=d.getElementById('s2q6b0'); inp.value='작성중인답'; inp.dispatchEvent(new w.Event('input'));
  await sleep(2600); // timer ticks + debounce
  const before={score:d.getElementById('cur').textContent,done:d.getElementById('done').textContent,timer:d.getElementById('timer').textContent};
  w.dispatchEvent(new w.Event('pagehide')); A.keep();
  console.log('before reload set3',JSON.stringify(before),'errors',A.errs);
  // reload at same tab
  A=open('#set3'); ({w,d}=A);
  console.log('after reload: view',d.getElementById('setName').textContent,'done',d.getElementById('done').textContent,'score',d.getElementById('cur').textContent,'timer',d.getElementById('timer').textContent);
  console.log('draft restored:',d.getElementById('s2q6b0').value,'| q6 editable:',!d.getElementById('s2q6b0').disabled,'| q1 locked+ok:',d.getElementById('s2q1b0').disabled,d.getElementById('s2q1b0').classList.contains('ok'),'| q5 override shown:',d.querySelector('#s2q5 .verdict').textContent.slice(0,14));
  console.log('tabs:',[...d.querySelectorAll('.tab')].slice(0,3).map(t=>t.textContent).join(' / '));
  d.getElementById('tab0').click(); console.log('set1 final card shown:',d.getElementById('final0').style.display,'score',d.getElementById('cur').textContent);
  console.log('overview:',d.getElementById('overview').textContent.replace(/\s+/g,' ').slice(0,120));
  // continue solving q6 after reload, then reset only set1
  d.getElementById('tab2').click(); d.querySelector('#s2q6 .sub').click(); console.log('set3 done after continuing',d.getElementById('done').textContent);
  d.getElementById('tab0').click(); d.getElementById('resetBtn').click(); A.keep();
  A=open(); ({w,d}=A);
  console.log('after set1 reset+reload: set1 done',d.getElementById('done').textContent,'| set3 tab',d.getElementById('tab2').textContent,'| note badge',d.getElementById('badge-note').textContent);
  d.getElementById('resetAllBtn').click(); A.keep(); A=open(); ({w,d}=A);
  console.log('after reset all: tab3',d.getElementById('tab2').textContent,'| note badge kept',d.getElementById('badge-note').textContent,'errors',A.errs);
  process.exit(0);
})();
