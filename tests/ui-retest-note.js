const {JSDOM}=require('jsdom');const fs=require('fs'),os=require('os'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','docs','index.html'),'utf8');
function open(storage){
  const errs=[];
  const dom=new JSDOM(html,{runScripts:'dangerously',url:'http://localhost/x.html',beforeParse(w){
    w.matchMedia=()=>({matches:false});w.scrollTo=()=>{};w.Element.prototype.scrollIntoView=()=>{};w.confirm=()=>true;w.print=()=>{};
    if(storage) w.localStorage.setItem('jpk2026_3_wrongnote_v1',storage);
    w.addEventListener('error',e=>errs.push(e.message));}});
  return {w:dom.window,d:dom.window.document,errs};
}
let {w,d,errs}=open();
const $=s=>d.querySelector(s), E=w.eval('EXAMS'), N=w.eval('NOTES');
console.log('notes per set',N.map(n=>n.length).join(','));
// set1: first 15 right, last 5 wrong
E[0].questions.forEach((q,i)=>{ if(i<15) q.ans.forEach((a,k)=>d.getElementById(`s0q${i+1}b${k}`).value=a[0]); else d.getElementById(`s0q${i+1}b0`).value='오답'; });
$('#submitAll').click();
console.log('set1',$('#cur').textContent,'badges',$('#badge-retest').textContent,$('#badge-note').textContent,'study shown in result',!!$('#s0q16 .study'));
// override one wrong -> removed from note
$('#s0q20 .override').click(); console.log('after override badge',$('#badge-note').textContent);
// note view
$('#tab-note').click(); console.log('note cards',d.querySelectorAll('#nList article').length,'count',$('#nCount').textContent,'study',d.querySelectorAll('#nList .study').length);
$('#nSearch').value='zzzz'; $('#nSearch').dispatchEvent(new w.Event('input')); console.log('search none ->',$('#nList').textContent.trim().slice(0,20));
$('#nSearch').value=''; $('#nSearch').dispatchEvent(new w.Event('input'));
// retest: answer 2 right, 2 wrong
$('#tab-retest').click(); console.log('retest info',$('#rInfo').textContent);
$('#rShuffle').checked=false; $('#rStart').click();
const cards=[...d.querySelectorAll('#rList article')]; console.log('retest cards',cards.length);
const keys=w.eval('0')||null;
cards.forEach((c,idx)=>{ const m=c.querySelector('.meta').textContent.match(/제(\d)회 (\d+)번/); const q=E[m[1]-1].questions[m[2]-1];
  if(idx<2) q.ans.forEach((a,k)=>c.querySelector(`#r${idx}b${k}`).value=a[0]); });
$('#rSubmitAll').click(); console.log('retest final',$('#rFinal').textContent.replace(/\s+/g,' ').slice(0,90));
console.log('badges after retest',$('#badge-retest').textContent,$('#badge-note').textContent);
$('#rFinal .again').click(); console.log('again cards',d.querySelectorAll('#rList article').length);
const saved=w.localStorage.getItem('jpk2026_3_wrongnote_v1'); console.log('errors',errs);
// reload persistence
({w,d,errs}=open(saved)); console.log('after reload badges',d.querySelector('#badge-retest').textContent,d.querySelector('#badge-note').textContent);
d.querySelector('#tab-note').click(); d.querySelector('#nStatus').value='done'; d.querySelector('#nStatus').dispatchEvent(new w.Event('change'));
console.log('mastered in note',d.querySelectorAll('#nList article').length,'errors',errs);
({w,d,errs}=open());
console.log('tabs',d.querySelectorAll('.tab').length,'cards',d.querySelectorAll('article.card').length,'nSet options',d.querySelectorAll('#nSet option').length);
d.querySelector('#tab9').click(); console.log('set10 visible',d.querySelector('#set9').classList.contains('active'),d.querySelector('#setName').textContent,'next disabled',d.querySelector('#nextBtn').disabled);
d.querySelector('#prevBtn').click(); console.log('prev ->',d.querySelector('#setName').textContent);
const E2=w.eval('EXAMS'); E2[7].questions.forEach((q,i)=>{ d.getElementById('s7q'+(i+1)+'b0').value='x'; });
d.querySelector('#tab7').click(); d.querySelector('#submitAll').click(); console.log('set8 all wrong score',d.querySelector('#cur').textContent,'note badge',d.querySelector('#badge-note').textContent);
d.querySelector('#final7 .goRetest').click(); console.log('retest from set8 cards',d.querySelectorAll('#rList article').length);
console.log('errors',errs);
process.exit(0);
