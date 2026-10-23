// Google login sync, with an in-memory fake in place of Firebase (window.IPE_CLOUD)
const {JSDOM}=require('jsdom');const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','docs','index.html'),'utf8');
const db={};const copy=x=>JSON.parse(JSON.stringify(x));
const fake=user=>{let cb;return{onUser(c){cb=c;setTimeout(()=>c(user),0);},signIn(){user={uid:'u1',name:'me@test.com'};cb(user);return Promise.resolve();},signOut(){user=null;cb(null);return Promise.resolve();},
  load:uid=>Promise.resolve(db[uid]?copy(db[uid]):null),store:(uid,d)=>{db[uid]=copy(d);return Promise.resolve();}};};
const all=[];
const open=(user,withCloud=true)=>{const errs=[];const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'http://localhost/x.html',beforeParse(w){w.matchMedia=()=>({matches:false});w.scrollTo=()=>{};w.Element.prototype.scrollIntoView=()=>{};w.confirm=()=>true;
  if(withCloud)w.IPE_CLOUD=fake(user);w.addEventListener('error',e=>errs.push(e.message));}});const w=dom.window;w.errs=errs;all.push(w);return w;};
let failed=0;const T=(name,ok)=>{if(!ok)failed++;console.log((ok?'PASS':'FAIL')+'  '+name);};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const answer=(w,si,qi,val)=>{const d=w.document;d.getElementById('tab'+si).click();const id=`s${si}q${qi+1}`;d.getElementById(id+'b0').value=val;d.querySelector('#'+id+' .sub').click();};
const cloudWR=()=>JSON.parse(db.u1.wrongnote),cloudPR=()=>JSON.parse(db.u1.progress);
const visible=w=>w.document.dispatchEvent(new w.Event('visibilitychange'));

(async()=>{
  const plain=open(null,false);
  T('no cloud configured: login bar hidden',plain.document.getElementById('acct').style.display==='none');

  // A: solves before logging in, then logs in -> record uploaded
  const A=open(null),dA=A.document;await wait(50);
  T('login bar shown with "Google 로그인"',dA.getElementById('acct').style.display===''&&dA.getElementById('acctBtn').textContent==='Google 로그인');
  answer(A,0,0,'x');
  dA.getElementById('acctBtn').click();await wait(100);
  T('A login uploads wrong note made before login',!!db.u1&&!!cloudWR()['0-0']);
  T('A login uploads progress',cloudPR()[0].st[0].submitted===true);
  T('A shows account and saved status',dA.getElementById('acctMsg').textContent.includes('me@test.com')&&dA.getElementById('acctBtn').textContent==='로그아웃');

  // B: another device, already logged in -> gets A's record
  const B=open({uid:'u1',name:'me@test.com'}),dB=B.document;await wait(100);
  T('B (other device) gets wrong note from cloud',dB.getElementById('badge-note').textContent==='1');
  T('B restores submitted answer of 제1회 1번',!!dB.getElementById('s0q1').dataset.submitted&&dB.getElementById('s0q1b0').value==='x');
  const q=B.eval('EXAMS')[1].questions[0];answer(B,1,0,q.ans[0][0]);
  await wait(1800);
  T('B change uploaded after debounce',cloudPR()[1].st[0].submitted===true);
  visible(A);await wait(100);
  T('A picks up B change when tab becomes visible',dA.getElementById('tab1').textContent.includes('1/20'));

  // delete on B -> gone on A as well (A has no unsynced wrong-note edits)
  dB.getElementById('tab-note').click();dB.querySelector('#nList .del').click();await wait(1800);
  T('B deletion uploaded',!cloudWR()['0-0']);
  visible(A);await wait(100);
  T('A follows deletion from B',dA.getElementById('badge-note').style.display==='none');

  // C: offline/logged-out record merged with the cloud on login
  const C=open(null),dC=C.document;await wait(50);
  answer(C,2,0,'zz');
  dC.getElementById('acctBtn').click();await wait(100);
  T('C login merges: cloud keeps 제2회 from B',cloudPR()[1].st[0].submitted===true);
  T('C login merges: cloud gets 제3회 from C',cloudPR()[2].st[0].submitted===true&&!!cloudWR()['2-0']);
  T('C shows 제2회 progress from cloud',dC.getElementById('tab1').textContent.includes('1/20'));
  dC.getElementById('acctBtn').click();await wait(50);
  T('C logout keeps local record',dC.getElementById('acctBtn').textContent==='Google 로그인'&&dC.getElementById('badge-note').textContent==='1');

  const errs=all.flatMap(x=>x.errs);console.log('script errors:',errs);
  process.exit(failed||errs.length?1:0);
})();
