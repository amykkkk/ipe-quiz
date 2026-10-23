// 대메뉴(모의고사 / 이론계산 / 오답 재시험 / 오답노트) and the untimed 이론계산 sets
const {JSDOM}=require('jsdom');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','docs','index.html'),'utf8');
const all=[];
const open=(hash='',store={})=>{const errs=[];const dom=new JSDOM(html,{runScripts:'dangerously',url:'http://localhost/x.html'+hash,beforeParse(w){w.matchMedia=()=>({matches:false});w.scrollTo=()=>{};w.Element.prototype.scrollIntoView=()=>{};w.confirm=()=>true;
  for(const k in store)w.localStorage.setItem(k,store[k]);w.addEventListener('error',e=>errs.push(e.message));}});const w=dom.window;w.errs=errs;all.push(w);return w;};
const dump=w=>{const o={};for(let i=0;i<w.localStorage.length;i++){const k=w.localStorage.key(i);o[k]=w.localStorage.getItem(k);}return o;};
let failed=0;const T=(name,ok)=>{if(!ok)failed++;console.log((ok?'PASS':'FAIL')+'  '+name);};
const shown=(d,ids)=>ids.filter(id=>d.getElementById(id).style.display!=='none');

const w=open(),d=w.document,E=w.eval('EXAMS');
const exam=E.map((e,k)=>k).filter(k=>!E[k].calc),calc=E.map((e,k)=>k).filter(k=>E[k].calc);
T('10 exam sets + 5 calc sets ('+exam.length+'+'+calc.length+')',exam.length===10&&calc.length===5&&calc[0]===10);
const tabIds=E.map((_,k)=>'tab'+k);
T('start: 모의고사 menu active, only exam tabs shown',d.getElementById('menu-exam').classList.contains('active')&&shown(d,tabIds).length===10&&shown(d,tabIds).every(id=>!E[+id.slice(3)].calc));
d.getElementById('menu-calc').click();
T('이론계산 menu: 5 calc tabs, first calc set opened',shown(d,tabIds).length===5&&d.getElementById('setName').textContent===E[10].short&&d.getElementById('menu-calc').classList.contains('active'));
T('calc set: no timer, 0/10, prev disabled',d.getElementById('timerWrap').style.display==='none'&&d.getElementById('qTotal').textContent==='10'&&d.getElementById('prevBtn').disabled&&!d.getElementById('nextBtn').disabled);
T('calc hash #calc1',w.location.hash==='#calc1');
d.getElementById('nextBtn').click();
T('next → 페이지 교체 (#calc2)',d.getElementById('setName').textContent===E[11].short&&w.location.hash==='#calc2');
d.getElementById('tab-note').click();
T('오답노트: sub tabs hidden',d.getElementById('tabs').style.display==='none');
d.getElementById('menu-calc').click();
T('back to 이론계산 remembers 페이지 교체',d.getElementById('setName').textContent===E[11].short);
d.getElementById('menu-exam').click();
T('back to 모의고사 remembers 제1회',d.getElementById('setName').textContent==='제1회'&&d.getElementById('timerWrap').style.display==='');

// solve 서브넷 계산: 8 right, 2 wrong
const si=12;d.getElementById('tab'+si).click();
E[si].questions.forEach((q,i)=>q.ans.forEach((a,k)=>d.getElementById(`s${si}q${i+1}b${k}`).value=i<8?a[0]:'틀림'));
d.getElementById('submitAll').click();
const fin=d.getElementById('final'+si).textContent.replace(/\s+/g,' ');
T('calc result: 40점 / 50점 · 정답률 80% ('+fin.slice(0,60)+')',fin.includes('40점 / 50점 · 정답률 80%')&&!fin.includes('합격'));
T('calc result: next button goes to 디스크 스케줄링',fin.includes(E[13].short+' 풀러 가기'));
T('wrong answers in note with calc name',d.getElementById('badge-note').textContent==='2');
d.getElementById('tab-note').click();
T('note card meta shows 서브넷 계산 9번',d.querySelector('#nList .meta').textContent.startsWith(E[si].short+' 9번'));
T('note filter has calc names',[...d.querySelectorAll('#nSet option')].some(o=>o.textContent===E[si].short));
d.getElementById('menu-exam').click();
T('overview lists calc rows with 정답률',d.getElementById('overview').textContent.includes('정답률 80%'));

const w2=open('#calc3',dump(w)),d2=w2.document;
T('reload #calc3 opens 서브넷 계산 with saved result',d2.getElementById('setName').textContent===E[si].short&&d2.getElementById('done').textContent==='10'&&d2.getElementById('cur').textContent==='40');
const w3=open('#set4'),d3=w3.document;
T('#set4 still opens 제4회',d3.getElementById('setName').textContent==='제4회');

setTimeout(()=>{
  T('calc timer does not run',d2.getElementById('timer').textContent==='2:30:00');
  const errs=all.flatMap(x=>x.errs);console.log('script errors:',errs);
  process.exit(failed||errs.length?1:0);
},1300);
