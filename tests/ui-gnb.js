// GNB(모의고사 / 이론계산 / 오답 재시험 / 오답노트 / 성적표), the separate 성적표 page, code colors and the red-pen grading mark
const {JSDOM}=require('jsdom');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','docs','index.html'),'utf8');
const all=[];
const open=(hash='',store={})=>{const errs=[];const dom=new JSDOM(html,{runScripts:'dangerously',url:'http://localhost/x.html'+hash,beforeParse(w){w.matchMedia=()=>({matches:false});w.scrollTo=()=>{};w.Element.prototype.scrollIntoView=()=>{};w.confirm=()=>true;
  for(const k in store)w.localStorage.setItem(k,store[k]);w.addEventListener('error',e=>errs.push(e.message));}});const w=dom.window;w.errs=errs;all.push(w);return w;};
const dump=w=>{const o={};for(let i=0;i<w.localStorage.length;i++){const k=w.localStorage.key(i);o[k]=w.localStorage.getItem(k);}return o;};
let failed=0;const T=(name,ok)=>{if(!ok)failed++;console.log((ok?'PASS':'FAIL')+'  '+name);};

const w=open(),d=w.document,E=w.eval('EXAMS'),$=id=>d.getElementById(id);
const items=[...d.querySelectorAll('#menu .gitem')].map(b=>b.id);
T('GNB has 5 menu items ('+items.join(',')+')',items.join()==='menu-exam,menu-calc,tab-retest,tab-note,tab-report');
T('start: 모의고사 title, report page hidden',$('pTitle').textContent==='모의고사'&&!$('view-report').classList.contains('active'));
$('tab-report').click();
T('성적표 menu: report page shown, set bar and sub tabs hidden',$('view-report').classList.contains('active')&&$('setBar').style.display==='none'&&$('tabs').style.display==='none'&&$('tab-report').classList.contains('active'));
T('성적표 title and hash #report',$('pTitle').textContent==='성적표'&&w.location.hash==='#report');
T('성적표 lists every set',$('overview').querySelectorAll('a[data-set]').length===E.length);
$('overview').querySelector('a[data-set="3"]').click();
T('성적표 link opens 제4회',$('setName').textContent==='제4회'&&!$('view-report').classList.contains('active'));
$('menu-calc').click();
T('이론계산 title',$('pTitle').textContent==='이론계산'&&$('menu-calc').classList.contains('active')&&!$('menu-exam').classList.contains('active'));
$('tab-note').click();
T('오답노트 title',$('pTitle').textContent==='오답노트');
d.querySelector('.brand').click();
T('brand goes back to 모의고사',$('pTitle').textContent==='모의고사'&&$('setName').textContent==='제4회');

// code colors keep the exact code text
const qi=E[0].questions.findIndex(q=>q.code),code=$(`s0q${qi+1}`).querySelector('pre.code code');
T('code block colored (C언어 keywords)',code.querySelectorAll('.hl-kw').length>0);
const bad=[];E.forEach((e,si)=>e.questions.forEach((q,i)=>{if(!q.code)return;const c=$(`s${si}q${i+1}`).querySelector('pre.code code');if(c.textContent!==q.code.replace(/^\n/,'').replace(/\s+$/,''))bad.push(`${si}-${i}`);}));
T('every code block text unchanged by coloring ('+bad.length+' differ)',!bad.length);

// red-pen mark
$('tab0').click();
const q0=E[0].questions[0];q0.ans.forEach((a,k)=>$(`s0q1b${k}`).value=a[0]);$('s0q1').querySelector('.sub').click();
T('right answer: number circled, pen score 5',$('s0q1').dataset.mark==='ok'&&$('s0q1').querySelector('.pts').dataset.score==='5');
E[0].questions[1].ans.forEach((a,k)=>$(`s0q2b${k}`).value='틀림');$('s0q2').querySelector('.sub').click();
T('wrong answer: slash mark, pen score 0',$('s0q2').dataset.mark==='bad'&&$('s0q2').querySelector('.pts').dataset.score==='0');
const w2=open('#report',dump(w)),d2=w2.document;
T('reload #report opens 성적표 with saved score',d2.getElementById('view-report').classList.contains('active')&&d2.getElementById('overview').textContent.includes('2/20'));
const w3=open('#set1',dump(w)),d3=w3.document;
T('reload keeps pen marks',d3.getElementById('s0q1').dataset.mark==='ok'&&d3.getElementById('s0q2').dataset.mark==='bad');
w.document.getElementById('resetBtn').click();
T('다시 풀기 clears the pen marks',!$('s0q1').dataset.mark&&!$('s0q2').dataset.mark);

const errs=all.flatMap(x=>x.errs);console.log('script errors:',errs);
process.exit(failed||errs.length?1:0);
