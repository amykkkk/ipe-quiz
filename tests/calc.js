// 이론계산: recompute every answer from the question's chk (calculation conditions) and compare with ans[k][0]
const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','docs','index.html'),'utf8');
const scripts=html.split('<script>').slice(1).map(s=>s.split('</script>')[0]);
const [EX,NO]=new Function(scripts[0]+';return [EXAMS,NOTES]')();
const num=x=>String(Math.round(x*100)/100);
const avg=a=>a.reduce((s,x)=>s+x,0)/a.length;

function sched(c){
  const P=c.p.map(([n,a,b,pr],i)=>({n,a,b,pr:pr||0,r:b,i})),fin={};let t=0;
  const run=(p,d)=>{t+=d;p.r-=d;if(!p.r)fin[p.n]=t;};
  const by=(...f)=>(x,y)=>{for(const g of f){const d=g(x)-g(y);if(d)return d;}return 0;};
  if(['FCFS','SJF','HRN','PRI'].includes(c.alg)){
    const left=[...P];
    while(left.length){
      const ready=left.filter(p=>p.a<=t);if(!ready.length){t=Math.min(...left.map(p=>p.a));continue;}
      const key={FCFS:by(p=>p.a,p=>p.i),SJF:by(p=>p.b,p=>p.a,p=>p.i),PRI:by(p=>p.pr,p=>p.a,p=>p.i),HRN:by(p=>-(t-p.a+p.b)/p.b,p=>p.a,p=>p.i)}[c.alg];
      const p=ready.sort(key)[0];left.splice(left.indexOf(p),1);run(p,p.b);
    }
  }else if(c.alg==='SRT'||c.alg==='PPRI'){
    while(Object.keys(fin).length<P.length){
      const ready=P.filter(p=>p.a<=t&&p.r>0);if(!ready.length){t=Math.min(...P.filter(p=>p.r>0).map(p=>p.a));continue;}
      run(ready.sort(c.alg==='SRT'?by(p=>p.r,p=>p.a,p=>p.i):by(p=>p.pr,p=>p.a,p=>p.i))[0],1);
    }
  }else{ // RR: arrivals up to the current time join the queue before the preempted process
    const order=[...P].sort(by(p=>p.a,p=>p.i)),q=[];let i=0;
    const admit=()=>{while(i<order.length&&order[i].a<=t)q.push(order[i++]);};admit();
    while(Object.keys(fin).length<P.length){
      if(!q.length){t=order[i].a;admit();continue;}
      const p=q.shift();run(p,Math.min(c.q,p.r));admit();if(p.r>0)q.push(p);
    }
  }
  return c.ask.map(a=>a==='wait'?num(avg(P.map(p=>fin[p.n]-p.a-p.b))):a==='tat'?num(avg(P.map(p=>fin[p.n]-p.a))):Object.keys(fin).sort((x,y)=>fin[x]-fin[y]).join(', '));
}
function pages(alg,n,ref){
  const fr=[],load={},last={},freq={};let F=0;
  ref.forEach((p,t)=>{
    if(fr.includes(p)){last[p]=t;freq[p]++;return;}
    F++;let slot=fr.length;
    if(fr.length>=n){
      const next=x=>{const k=ref.indexOf(x,t+1);return k<0?Infinity:k;};
      const v=[...fr].sort({FIFO:(a,b)=>load[a]-load[b],LRU:(a,b)=>last[a]-last[b],LFU:(a,b)=>freq[a]-freq[b]||load[a]-load[b],OPT:(a,b)=>next(b)-next(a)||load[a]-load[b]}[alg])[0];
      slot=fr.indexOf(v);
    }
    fr[slot]=p;load[p]=last[p]=t;freq[p]=1;
  });
  return {F,fr};
}
const ip=s=>s.split('.').reduce((a,o)=>a*256+ +o,0),dot=x=>[24,16,8,0].map(s=>Math.floor(x/2**s)%256).join('.');
const maskOf=p=>dot(2**32-2**(32-p));
const bitsFor=n=>Math.ceil(Math.log2(n));
function net(c){
  const size=2**(32-c.p),base=Math.floor(ip(c.ip)/size)*size;
  return c.ask.map(a=>({mask:maskOf(c.p),network:dot(base),broadcast:dot(base+size-1),first:dot(base+1),last:dot(base+size-2),hosts:String(size-2)}[a]));
}
function disk(c){
  const up=c.req.filter(x=>x>=c.head).sort((a,b)=>a-b),dn=c.req.filter(x=>x<c.head).sort((a,b)=>b-a);
  let path=[c.head];
  if(c.alg==='FCFS')path.push(...c.req);
  else if(c.alg==='SSTF'){const left=[...c.req];let pos=c.head;while(left.length){left.sort((a,b)=>Math.abs(a-pos)-Math.abs(b-pos)||a-b);pos=left.shift();path.push(pos);}}
  else{
    const [first,second]=c.dir==='up'?[up,dn]:[dn,up],edge=c.dir==='up'?c.max:0,other=c.dir==='up'?0:c.max;
    const wrap=[...second].reverse();
    path.push(...first,...({SCAN:[edge,...second],LOOK:second,CSCAN:[edge,other,...wrap],CLOOK:wrap}[c.alg]));
  }
  path=path.filter((x,i)=>i===0||x!==path[i-1]);
  const tot=path.slice(1).reduce((s,x,i)=>s+Math.abs(x-path[i]),0),served=path.slice(1).filter(x=>c.req.includes(x));
  return c.ask.map(a=>a==='total'?String(tot):a==='avg'?num(tot/c.req.length):served.join(', '));
}
function expect(c){
  switch(c.t){
    case 'sched':return sched(c);
    case 'hrn':return [c.p.map(([n,w,s])=>[n,(w+s)/s]).sort((a,b)=>b[1]-a[1]).map(x=>x[0]).join(', ')];
    case 'page':{const {F,fr}=pages(c.alg,c.n,c.ref);return [{faults:String(F),hits:String(c.ref.length-F),rate:num(F/c.ref.length*100),final:[...fr].sort((a,b)=>a-b).join(', ')}[c.ask]];}
    case 'belady':return [3,4].map(n=>String(pages('FIFO',n,c.ref).F));
    case 'addr':return [String(Math.floor(c.a/c.size)),String(c.a%c.size)];
    case 'net':return net(c);
    case 'prefix':return ['/'+c.mask.split('.').map(o=>(+o).toString(2).replace(/0/g,'').length).reduce((a,b)=>a+b,0)];
    case 'split':{const np=c.p+bitsFor(c.n);if(c.k){const s=2**(32-np),b=ip(c.base)+(c.k-1)*s;return [dot(b+s-1)];}return [maskOf(np),String(2**(32-np)-2)];}
    case 'need':{const np=32-bitsFor(c.need+2);return [maskOf(np),String(2**(np-c.p))];}
    case 'vlsm':{let cur=ip(c.base);for(let i=0;i<c.need.length;i++){const s=2**bitsFor(c.need[i]+2);if(i===c.k)return [dot(cur),dot(cur+s-1)];cur+=s;}break;}
    case 'disk':return disk(c);
    case 'avail':return [num(c.mttf/(c.mttf+c.mttr)*100)];
    case 'mtbf':{const f=avg(c.up),r=avg(c.down);return [num(f+r),num(f/(f+r)*100)];}
    case 'loc':return [String(c.loc/c.prod),String(c.loc/c.prod/c.people)];
    case 'people':return [String(c.loc/c.prod/c.months)];
    case 'mccabe':return [String(c.e-c.n+2)];
    case 'decisions':return [String(c.d+1)];
    case 'card':return [String(c.rows),String(c.cols)];
    case 'cart':return [String(c.r[0]+c.s[0]),String(c.r[1]*c.s[1])];
    case 'hamming':{let p=1;while(2**p<c.m+p+1)p++;return [String(p)];}
    case 'raid':return [String((c.n-1)*c.size),String((c.n-2)*c.size)];
  }
  throw new Error('unknown chk '+c.t);
}

const fails=[];let n=0;
const calc=EX.map((E,si)=>({E,si})).filter(x=>x.E.calc);
calc.forEach(({E,si})=>{
  if(E.questions.length!==10)fails.push(`${E.short}: ${E.questions.length} questions`);
  if(!NO[si]||NO[si].length!==E.questions.length)fails.push(`${E.short}: notes ${NO[si]&&NO[si].length}`);
  E.questions.forEach((q,i)=>{
    if(!q.chk){fails.push(`${E.short} ${i+1}: no chk`);return;}
    n++;const got=expect(q.chk),want=q.ans.map(a=>a[0]);
    if(JSON.stringify(got)!==JSON.stringify(want))fails.push(`${E.short} ${i+1}: computed ${JSON.stringify(got)} but answer ${JSON.stringify(want)}`);
  });
});
console.log('calc sets',calc.map(x=>x.E.short+' '+x.E.questions.length).join(', '),'| checked',n);
console.log('calc failures',fails);
process.exit(calc.length&&!fails.length?0:1);
