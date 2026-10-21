NOTES.push([
  {key:"*p++ / (*p)++ / *++p / ++*p 구분",
   body:`단항 연산자 중 <b>후위 ++, --</b>는 간접 참조 <code>*</code>보다 우선순위가 높고, <b>전위 ++, --</b>와 <code>*</code>는 같은 우선순위로 <b>오른쪽에서 왼쪽</b>으로 결합합니다.<br>
따라서 <code>*p++</code>는 <code>*(p++)</code>로 해석되어 현재 값을 읽은 뒤 포인터가 이동하고, <code>*++p</code>는 포인터를 먼저 이동한 뒤 값을 읽습니다.<br>
괄호로 <code>(*p)++</code>를 쓰거나 <code>++*p</code>처럼 쓰면 포인터가 아닌 <b>가리키는 값</b>이 증가합니다. 이후 배열 원소 값이 바뀐 상태로 계산되는 것이 출제 포인트입니다.
<table><tr><th>식</th><th>해석</th><th>p 이동</th><th>값 변경</th><th>식의 값</th></tr>
<tr><td><code>*p++</code></td><td>*(p++)</td><td>O(후)</td><td>X</td><td>이동 전 원소</td></tr>
<tr><td><code>*++p</code></td><td>*(++p)</td><td>O(선)</td><td>X</td><td>이동 후 원소</td></tr>
<tr><td><code>(*p)++</code></td><td>값 후위 증가</td><td>X</td><td>O</td><td>증가 전 값</td></tr>
<tr><td><code>++*p</code></td><td>++(*p)</td><td>X</td><td>O</td><td>증가 후 값</td></tr></table>
<code>p[1]</code>은 <code>*(p+1)</code>, <code>p[-1]</code>은 <code>*(p-1)</code>과 같으므로 포인터가 배열 중간을 가리킬 때 기준점이 바뀐다는 것도 함께 기억합니다.`,
   trap:"<code>(*p)++</code>를 포인터 이동으로 착각하거나, 값이 증가한 뒤의 배열 원소(a[1]=21)를 원래 값 20으로 계산하는 실수가 많습니다.",
   tip:"괄호 없으면 ++가 p에 붙고(후위), *가 먼저 붙어 있으면(++*p) 값에 붙는다.",
   kw:["포인터 증감","연산자 우선순위","우결합","*p++","++*p"]},

  {key:"부모 생성자에서 오버라이딩 메서드 호출 시 기본값",
   body:`Java 객체 생성 시 메모리가 할당되면 모든 인스턴스 필드는 먼저 <b>기본값</b>(int 0, boolean false, 참조형 null)으로 채워집니다. 그 다음 생성자 첫 줄의 <code>super()</code>가 실행되어 부모의 필드 초기화와 부모 생성자 본문이 끝난 후에야 <b>자식의 필드 초기화식</b>이 실행됩니다.<br>
부모 생성자 안에서 호출한 메서드라도 실제 객체가 자식이면 <b>동적 바인딩</b>으로 자식의 오버라이딩 메서드가 실행되므로, 아직 초기화되지 않은 자식 필드는 기본값으로 보입니다.<br>
<pre>new Child()
 1. 필드 기본값 할당 (a=0, b=0, s=null)
 2. Parent 필드 초기화 (a=10)
 3. Parent 생성자 본문  ← 여기서 show() → Child.show()
 4. Child 필드 초기화 (b=20, s="hi")
 5. Child 생성자 본문</pre>
static 초기화 블록은 클래스 로딩 시 단 한 번(부모 → 자식 순), 인스턴스 초기화 블록은 필드 초기화식과 같은 단계에서 작성 순서대로 실행됩니다. 이 때문에 "생성자에서 오버라이딩 가능한 메서드를 호출하지 말라"는 것이 설계 원칙입니다.`,
   trap:"자식 필드 b = 20 이 선언과 동시에 초기화된다고 생각해 'CS20hi'를 두 번 출력하는 오답이 가장 흔합니다. 문자열 연결 시 null은 'null'이라는 문자열로 출력됩니다.",
   tip:"부모 생성자가 끝나기 전까지 자식 필드는 0과 null — '부모 먼저, 자식 필드는 나중'.",
   kw:["객체 생성 순서","super()","동적 바인딩","필드 기본값","null 출력"]},

  {key:"하노이 탑: 이동 횟수 vs 호출 횟수",
   body:`하노이 탑은 n−1개를 보조 기둥으로 옮기고, 가장 큰 원판 1개를 옮긴 뒤, n−1개를 다시 목표 기둥으로 옮기는 재귀로 해결합니다. 이동 횟수 점화식은 <b>M(n) = 2M(n−1) + 1</b>이므로 M(n) = 2ⁿ − 1입니다.<br>
<b>호출 횟수</b>는 기저 조건을 어디에 두느냐에 따라 달라집니다. 기저가 n == 1이면 호출 횟수도 2ⁿ − 1이지만, 기저가 n == 0이면 n=0 호출까지 세어야 하므로 C(n) = 2ⁿ⁺¹ − 1이 됩니다.
<table><tr><th>n</th><th>이동 2ⁿ−1</th><th>호출(기저 n==1)</th><th>호출(기저 n==0)</th></tr>
<tr><td>3</td><td>7</td><td>7</td><td>15</td></tr>
<tr><td>4</td><td>15</td><td>15</td><td>31</td></tr>
<tr><td>5</td><td>31</td><td>31</td><td>63</td></tr></table>
같은 유형으로 <b>피보나치 재귀 호출 횟수</b>(C(n) = C(n−1) + C(n−2) + 1), <b>자릿수 합 재귀</b>(n//10으로 줄어들어 호출 횟수 = 자릿수 + 기저 1회) 등이 출제됩니다. global 키워드가 없으면 함수 내부의 cnt += 1은 UnboundLocalError가 된다는 점도 함께 기억합니다.`,
   trap:"반환값(15)과 전역 카운터(31)를 같은 값으로 착각하기 쉽습니다. 기저 조건 n == 0 호출도 cnt를 증가시킨다는 점을 놓치지 마세요.",
   tip:"이동은 2ⁿ−1, n==0 기저의 호출은 2ⁿ⁺¹−1 (이동의 2배+1).",
   kw:["하노이 탑","재귀 점화식","호출 횟수","global","기저 조건"]},

  {key:"INNER JOIN 결과 행 확정 후 집계",
   body:`조인과 집계 함수가 함께 있는 SQL은 <b>FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</b> 순서로 처리됩니다. 따라서 먼저 조인 결과 행을 표로 그려 놓고 집계를 계산하는 것이 가장 안전합니다.<br>
INNER JOIN은 양쪽 테이블에서 조건이 일치하는 행만 남기므로 <b>외래키가 NULL인 행</b>과 <b>짝이 없는 부모 행</b>은 모두 사라집니다. NULL = NULL 비교는 참이 아니라 UNKNOWN이므로 NULL끼리도 조인되지 않습니다.
<table><tr><th>조인</th><th>남는 행</th><th>이 문제에서 행 수</th></tr>
<tr><td>INNER JOIN</td><td>양쪽 일치 행만</td><td>5</td></tr>
<tr><td>LEFT OUTER JOIN 사원 기준</td><td>사원 전체(106은 지역 NULL)</td><td>6</td></tr>
<tr><td>RIGHT OUTER JOIN 부서 기준</td><td>부서 전체(D4는 사원 NULL)</td><td>6</td></tr>
<tr><td>FULL OUTER JOIN</td><td>양쪽 전체</td><td>7</td></tr></table>
COUNT(*)는 NULL 포함 행 수, COUNT(컬럼)은 NULL 제외, COUNT(DISTINCT 컬럼)은 NULL 제외 후 중복 제거 개수입니다. SUM, AVG, MAX, MIN도 NULL을 무시합니다.`,
   trap:"부서 테이블에 지역이 3종류(서울·부산·대전)라고 3으로 답하는 실수, 그리고 부서코드 NULL인 사원의 급여 400을 합계에 포함하는 실수가 대표 함정입니다.",
   tip:"조인 문제는 반드시 '조인 결과표'를 먼저 손으로 그린 뒤 집계한다.",
   kw:["INNER JOIN","NULL 조인","COUNT DISTINCT","SQL 실행 순서","OUTER JOIN"]},

  {key:"트랜잭션 5가지 상태와 전이",
   body:`트랜잭션은 <b>활동(Active)</b>으로 시작해 마지막 연산이 끝나면 <b>부분 완료(Partially Committed)</b>가 되고, Commit이 성공하면 <b>완료(Committed)</b>가 됩니다. 실행 중이나 부분 완료 상태에서 오류가 발생하면 <b>실패(Failed)</b>가 되고, Rollback을 수행하면 <b>철회(Aborted)</b> 상태가 됩니다.<br>
철회된 트랜잭션은 재시작(restart)하거나 폐기(kill)합니다. 부분 완료는 '연산은 다 했지만 결과가 아직 DB에 영구 반영되지 않은' 상태라는 점이 핵심입니다.
<table><tr><th>상태</th><th>설명</th><th>관련 연산</th></tr>
<tr><td>활동</td><td>실행 중</td><td>-</td></tr>
<tr><td>부분 완료</td><td>마지막 연산 완료, Commit 직전</td><td>-</td></tr>
<tr><td>완료</td><td>성공 종료</td><td>Commit</td></tr>
<tr><td>실패</td><td>오류로 중단</td><td>-</td></tr>
<tr><td>철회</td><td>비정상 종료, 원상 복구</td><td>Rollback</td></tr></table>
관련 개념: Commit은 변경 내용을 영구 반영, Rollback은 트랜잭션 시작 이전으로 되돌리고, Savepoint는 Rollback할 중간 지점을 지정합니다. 이 연산들은 TCL(Transaction Control Language)에 속합니다.`,
   trap:"'부분 완료'를 Commit이 끝난 상태로 착각하거나, '실패'와 '철회'의 순서를 바꾸는 실수가 많습니다. 철회는 Rollback 수행 후입니다.",
   tip:"활 → 부 → 완, 오류 나면 실 → 철 (활부완 실철).",
   kw:["트랜잭션 상태","부분 완료","철회","Commit","Rollback","TCL"]},

  {key:"웜 vs 바이러스 vs 트로이 목마",
   body:`악성 코드는 <b>숙주 필요 여부</b>와 <b>자기 복제 여부</b>로 구분합니다. 바이러스는 다른 실행 파일·문서에 자신을 삽입(감염)하여 숙주가 실행될 때 활동합니다. 웜은 숙주 없이 독립적으로 실행되며 네트워크를 통해 스스로 복제·전파합니다. 트로이 목마는 유용한 프로그램으로 위장해 사용자가 직접 설치하게 만들며, 자기 복제 기능은 없습니다.
<table><tr><th>구분</th><th>숙주</th><th>자기 복제</th><th>전파</th></tr>
<tr><td>바이러스</td><td>필요</td><td>O</td><td>감염 파일 실행 시</td></tr>
<tr><td>웜</td><td>불필요(독립)</td><td>O</td><td>네트워크 자동 전파</td></tr>
<tr><td>트로이 목마</td><td>불필요(위장)</td><td>X</td><td>사용자가 설치</td></tr></table>
그 밖에 랜섬웨어(파일 암호화 후 금전 요구), 루트킷(관리자 권한 획득 및 흔적 은닉), 스파이웨어(정보 몰래 수집), 애드웨어(광고 노출), 키로거(키 입력 탈취)도 함께 정리해 둡니다. 대표적인 웜으로는 모리스 웜, 코드레드, 슬래머(SQL Slammer), 블래스터 등이 있습니다.`,
   trap:"'자기 복제'만 보고 바이러스로 답하는 실수가 많습니다. '독립 실행·숙주 불필요·네트워크 자동 전파'가 함께 나오면 웜입니다.",
   tip:"바이러스는 기생충, 웜은 혼자 기어다니는 벌레, 트로이는 선물 상자 속 병사.",
   kw:["웜","바이러스","트로이 목마","자기 복제","숙주"]},

  {key:"TCP vs UDP 특징 비교",
   body:`전송 계층(4계층)의 대표 프로토콜인 TCP는 <b>연결 지향</b>, <b>신뢰성</b>(순서 번호, ACK, 재전송), <b>흐름 제어</b>(슬라이딩 윈도우), <b>혼잡 제어</b>(Slow Start, 혼잡 회피)를 제공합니다. 연결 설정은 3-way handshake(SYN, SYN+ACK, ACK), 연결 해제는 4-way handshake(FIN, ACK, FIN, ACK)로 이루어집니다.<br>
UDP는 연결 설정 없이 데이터그램을 보내는 비연결형 프로토콜로, 헤더가 <b>8바이트</b>(출발지 포트 2, 목적지 포트 2, 길이 2, 체크섬 2)로 매우 단순합니다. TCP 헤더는 옵션 없이 20바이트, 최대 60바이트입니다.
<table><tr><th>포트</th><th>서비스</th><th>프로토콜</th></tr>
<tr><td>20/21</td><td>FTP</td><td>TCP</td></tr>
<tr><td>22 / 23</td><td>SSH / Telnet</td><td>TCP</td></tr>
<tr><td>25</td><td>SMTP</td><td>TCP</td></tr>
<tr><td>53</td><td>DNS</td><td>UDP(주) / TCP</td></tr>
<tr><td>67/68</td><td>DHCP</td><td>UDP</td></tr>
<tr><td>80 / 443</td><td>HTTP / HTTPS</td><td>TCP</td></tr>
<tr><td>161</td><td>SNMP</td><td>UDP</td></tr></table>
UDP는 브로드캐스트·멀티캐스트가 가능하고, 실시간성이 중요한 VoIP, 온라인 게임, 스트리밍에 적합합니다.`,
   trap:"UDP에도 체크섬은 있습니다(오류 검출만 하고 재전송은 안 함). '체크섬이 없다'는 보기는 오답입니다.",
   tip:"TCP는 등기우편(확인·재발송), UDP는 전단지 배포(빠르지만 확인 안 함), UDP 헤더 4칸 × 2바이트 = 8.",
   kw:["TCP","UDP","흐름 제어","혼잡 제어","8바이트 헤더","포트 번호"]},

  {key:"소프트웨어 아키텍처 패턴 종류",
   body:`아키텍처 패턴은 시스템 전체 구조에 대한 검증된 해결책으로, 디자인 패턴보다 상위 수준입니다. 시험에는 설명을 주고 패턴명을 쓰게 하는 형태가 주로 출제됩니다.
<table><tr><th>패턴</th><th>핵심 특징</th><th>예</th></tr>
<tr><td>계층(Layers)</td><td>각 계층이 바로 위 계층에 서비스 제공</td><td>OSI 7계층</td></tr>
<tr><td>클라이언트-서버</td><td>하나의 서버와 다수 클라이언트, 요청-응답</td><td>웹 서비스</td></tr>
<tr><td>파이프-필터</td><td>데이터 스트림을 필터가 단계별 처리</td><td>UNIX 셸 파이프</td></tr>
<tr><td>MVC</td><td>Model·View·Controller 분리</td><td>웹 프레임워크</td></tr>
<tr><td>마스터-슬레이브</td><td>마스터가 분배·취합, 슬레이브가 병렬 처리</td><td>DB 복제, 병렬 연산</td></tr>
<tr><td>브로커</td><td>브로커가 요청을 적절한 서버로 중개</td><td>CORBA, 메시지 브로커</td></tr>
<tr><td>피어-투-피어</td><td>각 피어가 클라이언트이자 서버</td><td>파일 공유</td></tr>
<tr><td>이벤트-버스</td><td>소스가 채널에 이벤트 발행, 리스너가 구독</td><td>알림 서비스</td></tr></table>
MVC에서 Model은 데이터와 비즈니스 로직, View는 사용자에게 보이는 화면, Controller는 입력을 받아 Model과 View를 제어합니다. 파이프-필터는 필터 재사용이 쉽지만 데이터 변환 오버헤드가 있고 대화형 처리에 부적합합니다.`,
   trap:"마스터-슬레이브와 클라이언트-서버를 혼동하기 쉽습니다. '동일한 구조의 하위 컴포넌트에 작업 분할·결과 취합'이면 마스터-슬레이브입니다.",
   tip:"파이프는 '흘려보내기', 마스터는 '나눠주고 모으기', 브로커는 '중개인'.",
   kw:["파이프-필터","마스터-슬레이브","MVC","브로커","계층 패턴"]},

  {key:"디스크 스케줄링 총 이동 거리 계산",
   body:`디스크 스케줄링은 헤드의 탐색 시간(Seek Time)을 줄이기 위한 요청 처리 순서 결정 기법입니다. SSTF는 현재 위치에서 가장 가까운 요청을 먼저 처리하여 평균 탐색 시간이 짧지만, 멀리 있는 요청이 계속 밀리는 <b>기아(Starvation)</b>가 발생할 수 있습니다.<br>
SCAN(엘리베이터)은 한 방향으로 끝까지 이동하며 처리한 뒤 방향을 바꾸고, C-SCAN은 한 방향으로만 처리하고 끝에 도달하면 반대쪽 끝으로 점프합니다. LOOK/C-LOOK은 끝 실린더까지 가지 않고 마지막 요청에서 방향을 바꿉니다.
<table><tr><th>기법(헤드 50, 0~199, 큐 82,170,43,140,24,16,190)</th><th>총 이동</th></tr>
<tr><td>FCFS</td><td>642</td></tr>
<tr><td>SSTF</td><td>208</td></tr>
<tr><td>SCAN (큰 번호 방향 먼저, 199까지)</td><td>149 + 183 = 332</td></tr>
<tr><td>LOOK (큰 번호 방향 먼저, 190까지)</td><td>140 + 174 = 314</td></tr></table>
계산 시에는 반드시 처리 순서를 먼저 나열한 뒤 인접 차이의 절댓값을 합산합니다. SCAN 문제에서는 진행 방향과 '끝(0 또는 199)까지 가는지'를 문제 조건에서 꼭 확인해야 합니다.`,
   trap:"SSTF는 '요청 큐 순서'가 아니라 '현재 헤드 위치 기준 거리'로 매번 다시 고릅니다. 16까지 간 뒤 82로 크게 이동하는 구간(66)을 빠뜨리지 마세요.",
   tip:"SSTF = 가까운 것부터, SCAN = 엘리베이터, LOOK = 끝까지 안 가는 엘리베이터.",
   kw:["SSTF","SCAN","C-SCAN","LOOK","기아 현상","탐색 시간"]},

  {key:"소수 판별 루프 경계: i*i 이하까지 검사",
   body:`소수 판별은 2부터 √n까지만 나누어 보면 충분합니다. n이 합성수라면 반드시 √n 이하의 약수를 하나 가지기 때문입니다. 이를 정수 연산으로 쓰면 <code>for (i = 2; i * i &lt;= n; i++)</code>입니다.<br>
조건을 <code>i * i &lt; n</code>으로 쓰면 √n 자체가 검사되지 않아 <b>소수의 제곱수(4, 9, 25, 49, …)</b>가 소수로 잘못 판정됩니다. 반대로 <code>i &lt; n</code>으로 쓰면 결과는 맞지만 비효율적입니다.
<table><tr><th>루프 조건</th><th>1~30 결과 개수</th><th>합</th></tr>
<tr><td><code>i * i &lt;= n</code> (정상)</td><td>10</td><td>129</td></tr>
<tr><td><code>i * i &lt; n</code> (오류)</td><td>13 (4, 9, 25 추가)</td><td>167</td></tr></table>
같은 유형으로 <b>회문(palindrome) 판별</b>(숫자를 뒤집어 원래 값과 비교: <code>r = r * 10 + n % 10; n /= 10;</code>), <b>약수의 개수·완전수</b>(약수의 합이 자기 자신) 문제가 자주 나옵니다. <code>n &lt; 2</code>에 대한 예외 처리(1은 소수가 아님)도 확인 포인트입니다.`,
   trap:"코드를 대충 보고 '30 이하 소수 10개, 합 129'로 답하는 것이 함정입니다. 비교 연산자 &lt;와 &lt;=를 반드시 확인하세요.",
   tip:"루프 경계는 'i*i가 n과 같을 때'를 직접 대입해 본다 — 4, 9, 25가 단골.",
   kw:["소수 판별","제곱근 경계","off-by-one","회문","완전수"]},

  {key:"블루투스 공격: 블루버그·블루스나프·블루재킹",
   body:`블루투스는 근거리 무선 통신으로, 페어링·프로파일 구현의 취약점을 노린 여러 공격이 있습니다. 이름이 비슷하므로 '무엇을 하는 공격인가'로 구분해야 합니다.
<table><tr><th>공격</th><th>행위</th><th>핵심 키워드</th></tr>
<tr><td>블루프린팅(BluePrinting)</td><td>공격 대상 블루투스 장비 검색·식별</td><td>탐색</td></tr>
<tr><td>블루스나프(BlueSnarf)</td><td>파일·주소록 등 정보 무단 열람·탈취</td><td>정보 탈취</td></tr>
<tr><td>블루버그(BlueBug)</td><td>연결 취약점으로 장비 제어(통화·문자)</td><td>원격 조종</td></tr>
<tr><td>블루재킹(BlueJacking)</td><td>익명으로 스팸 메시지·명함 전송</td><td>스팸</td></tr></table>
무선 관련 공격으로 <b>이블 트윈(Evil Twin)</b>(정상 AP와 같은 SSID의 가짜 AP로 접속 유도), <b>워 드라이빙</b>(이동하며 보안이 취약한 무선 AP 탐색)도 함께 출제될 수 있습니다. 대응책은 블루투스를 사용하지 않을 때 끄기, 검색 허용 모드 해제, 알 수 없는 장치 페어링 거부 등입니다.`,
   trap:"블루재킹은 '재킹(hijacking)'이라는 이름 때문에 장비 탈취로 착각하기 쉽지만 실제로는 스팸 메시지 전송입니다. 장비 제어는 블루버그입니다.",
   tip:"프린팅=찾기, 스나프=훔치기, 버그=조종, 재킹=스팸(명함 던지기).",
   kw:["블루버그","블루스나프","블루재킹","블루프린팅","Evil Twin"]},

  {key:"사용자 정의 예외 + 다중 catch + finally",
   body:`사용자 정의 예외는 <code>Exception</code>(검사 예외, checked) 또는 <code>RuntimeException</code>(비검사 예외, unchecked)을 상속해 만듭니다. Exception을 상속하면 메서드에 <code>throws</code> 선언이나 try-catch 처리가 <b>컴파일 시 강제</b>됩니다. <code>super(메시지)</code>로 전달한 문자열은 <code>getMessage()</code>로 꺼낼 수 있습니다.<br>
다중 catch는 <b>위에서부터 순서대로</b> 검사하여 처음 일치하는 블록 하나만 실행합니다. 상위 타입(Exception)을 하위 타입보다 먼저 쓰면 아래 catch가 도달 불가능해져 <b>컴파일 오류</b>가 납니다. finally는 예외 발생·catch 여부와 관계없이 항상 실행됩니다.
<table><tr><th>예외</th><th>분류</th><th>발생 예</th></tr>
<tr><td>ArithmeticException</td><td>Runtime</td><td>정수를 0으로 나눔</td></tr>
<tr><td>ArrayIndexOutOfBoundsException</td><td>Runtime</td><td>배열 범위 초과</td></tr>
<tr><td>NullPointerException</td><td>Runtime</td><td>null 참조 사용</td></tr>
<tr><td>NumberFormatException</td><td>Runtime</td><td>Integer.parseInt("abc")</td></tr>
<tr><td>IOException</td><td>Checked</td><td>입출력 실패</td></tr></table>
실수 나눗셈 <code>10.0 / 0</code>은 예외 없이 Infinity가 된다는 점도 함께 기억합니다. 예외가 발생한 문장 이후의 try 블록 코드(여기서는 "A" 출력)는 실행되지 않습니다.`,
   trap:"짝수 6을 ArithmeticException으로 처리하는 실수(3의 배수 검사가 먼저), 그리고 finally의 sum++를 예외 발생 회차에서 빼먹는 실수가 대표 함정입니다.",
   tip:"catch는 좁은 것(자식) → 넓은 것(부모) 순서, finally는 무조건.",
   kw:["사용자 정의 예외","다중 catch","finally","ArithmeticException","getMessage"]},

  {key:"str.count/find/index, list.index, enumerate",
   body:`문자열 검색 메서드는 결과가 없을 때의 동작이 다릅니다. <code>find()</code>는 <b>−1</b>을 반환하지만 <code>index()</code>는 <b>ValueError</b>를 발생시킵니다. 리스트에는 find가 없고 index만 있습니다.<br>
<code>count(sub)</code>는 <b>겹치지 않게</b> 센 개수입니다. 예를 들어 <code>"aaaa".count("aa")</code>는 2입니다. <code>index(x, start)</code>, <code>find(x, start)</code>처럼 시작 위치를 지정하면 그 위치부터 검색하지만 반환값은 전체 기준 인덱스입니다.
<table><tr><th>식</th><th>결과</th></tr>
<tr><td><code>"banana".find("na")</code></td><td>2</td></tr>
<tr><td><code>"banana".rfind("na")</code></td><td>4</td></tr>
<tr><td><code>"banana".find("x")</code></td><td>-1</td></tr>
<tr><td><code>"banana".index("x")</code></td><td>ValueError</td></tr>
<tr><td><code>"banana".count("a")</code></td><td>3</td></tr>
<tr><td><code>"aaaa".count("aa")</code></td><td>2</td></tr></table>
<code>enumerate(iterable, start)</code>는 (번호, 값) 튜플을 만들며 start를 주면 번호가 그 값부터 시작합니다. 번호만 바뀔 뿐 실제 인덱스가 바뀌는 것은 아닙니다.`,
   trap:"<code>enumerate(lst, 1)</code>의 번호를 0부터 세거나, find의 −1을 더하지 않고 무시하는 실수가 흔합니다. index(1, 2)도 결과는 전체 기준 인덱스 3입니다.",
   tip:"find는 −1로 조용히, index는 에러로 시끄럽게.",
   kw:["find","index","count","enumerate","ValueError"]},

  {key:"ISO/IEC 25010 8가지 품질 특성",
   body:`ISO/IEC 25010은 ISO/IEC 9126을 대체한 소프트웨어 제품 품질 모델로, 9126의 6개 특성에서 <b>보안성</b>과 <b>호환성</b>이 독립 특성으로 추가되어 8개가 되었습니다.
<table><tr><th>품질 특성</th><th>부특성</th></tr>
<tr><td>기능 적합성</td><td>기능 완전성, 기능 정확성, 기능 타당성</td></tr>
<tr><td>성능 효율성</td><td>시간 반응성, 자원 효율성, 용량</td></tr>
<tr><td>호환성</td><td>공존성, 상호운용성</td></tr>
<tr><td>사용성</td><td>인식성, 학습성, 운용성, 오류 방지, UI 미학, 접근성</td></tr>
<tr><td>신뢰성</td><td>성숙성, 가용성, 결함 허용성, 회복성</td></tr>
<tr><td>보안성</td><td>기밀성, 무결성, 부인 방지, 책임성, 인증성</td></tr>
<tr><td>유지보수성</td><td>모듈성, 재사용성, 분석성, 수정성, 시험성</td></tr>
<tr><td>이식성</td><td>적응성, 설치성, 대체성</td></tr></table>
ISO/IEC 9126의 6가지는 기능성, 신뢰성, 사용성, 효율성, 유지보수성, 이식성입니다. 관련 표준으로 ISO/IEC 25000(SQuaRE)은 품질 요구사항과 평가를 통합한 체계이고, ISO/IEC 12119는 패키지 소프트웨어 품질 요구사항 및 테스트 표준입니다.`,
   trap:"'다른 환경으로 옮김'은 이식성, '다른 시스템과 함께 동작'은 호환성입니다. 대체성이 이식성의 부특성이라는 점에서 둘을 혼동하기 쉽습니다.",
   tip:"8개 암기: 기·성·호·사·신·보·유·이 (기성 호사가 신보를 유이하게 본다).",
   kw:["ISO/IEC 25010","호환성","이식성","유지보수성","ISO/IEC 9126"]},

  {key:"클러스터드 vs 넌클러스터드 인덱스, 해싱",
   body:`인덱스는 검색 속도를 높이기 위한 <b>키 값과 위치 정보</b>로 구성된 자료구조로, 대부분 B-트리(B+트리)로 구현됩니다. 검색은 빨라지지만 삽입·수정·삭제 시 인덱스도 갱신해야 하므로 변경 연산의 부하가 늘어나고 추가 저장 공간이 필요합니다.<br>
<b>클러스터드 인덱스</b>는 데이터 행 자체가 키 순서로 정렬되어 테이블당 1개만 가능하고, <b>넌클러스터드 인덱스</b>는 별도의 인덱스 구조에 포인터를 두어 여러 개 만들 수 있습니다.
<table><tr><th>구분</th><th>B+트리 인덱스</th><th>해싱</th></tr>
<tr><td>접근</td><td>트리 탐색 O(log n)</td><td>해시 함수로 직접 접근 O(1)</td></tr>
<tr><td>범위 검색</td><td>유리(리프 연결 리스트)</td><td>불리</td></tr>
<tr><td>동등(=) 검색</td><td>보통</td><td>매우 빠름</td></tr>
<tr><td>문제점</td><td>갱신 시 노드 분할</td><td>충돌(Collision), 오버플로</td></tr></table>
해싱 관련 용어로 동일한 홈 주소로 변환되는 키들을 <b>동의어(Synonym)</b>, 서로 다른 키가 같은 주소를 갖는 현상을 <b>충돌</b>이라 합니다. 해시 함수 기법에는 제산법, 제곱법, 폴딩법, 기수 변환법, 숫자 분석법 등이 있습니다.`,
   trap:"클러스터드 인덱스를 '여러 개 생성 가능'으로 고르는 보기가 단골 함정입니다. 데이터의 물리적 순서는 하나뿐이므로 테이블당 1개입니다.",
   tip:"클러스터드 = 사전 본문(정렬된 책 자체), 넌클러스터드 = 책 뒤의 색인(쪽수 포인터).",
   kw:["클러스터드 인덱스","넌클러스터드 인덱스","B+트리","해싱","충돌"]},

  {key:"필요 호스트 수로 서브넷 마스크 구하기",
   body:`필요한 호스트 수가 주어지면 <b>호스트 수 + 2(네트워크·브로드캐스트) ≤ 2ʰ</b>를 만족하는 최소 h를 구하고, 프리픽스는 32 − h가 됩니다. 이렇게 하면 조건을 만족하는 가장 긴(가장 작은) 서브넷이 됩니다.
<table><tr><th>필요 호스트</th><th>호스트 비트</th><th>프리픽스</th><th>서브넷 마스크</th><th>가용 호스트</th></tr>
<tr><td>30</td><td>5</td><td>/27</td><td>255.255.255.224</td><td>30</td></tr>
<tr><td>100</td><td>7</td><td>/25</td><td>255.255.255.128</td><td>126</td></tr>
<tr><td>200</td><td>8</td><td>/24</td><td>255.255.255.0</td><td>254</td></tr>
<tr><td>500</td><td>9</td><td>/23</td><td>255.255.254.0</td><td>510</td></tr>
<tr><td>1000</td><td>10</td><td>/22</td><td>255.255.252.0</td><td>1022</td></tr></table>
/23처럼 3번째 옥텟에 경계가 걸리면 블록 크기는 3번째 옥텟 기준 256 − 254 = <b>2</b>입니다. 따라서 서브넷은 x.x.0.0, x.x.2.0, x.x.4.0 … 순서이며, k번째 서브넷의 브로드캐스트는 다음 서브넷 시작 주소 − 1입니다.<br>
서브넷 개수는 2^(새 프리픽스 − 원래 프리픽스)이며, /16을 /23으로 나누면 2⁷ = 128개입니다.`,
   trap:"254개로 부족한데 /24를 고르거나, 가용 호스트를 2⁹ = 512로 답하는 실수가 많습니다. 3번째 서브넷의 브로드캐스트를 10.10.4.255로 쓰는 것도 오답입니다.",
   tip:"호스트 수 + 2를 넘는 2의 거듭제곱을 찾고, 32에서 뺀다.",
   kw:["서브넷 마스크","/23","호스트 비트","블록 크기","브로드캐스트 주소"]},

  {key:"ALL / ANY(SOME) 다중 행 비교 연산",
   body:`다중 행 서브쿼리에는 단일 행 비교 연산자(=, &gt; 등)를 단독으로 쓸 수 없고 IN, ANY(SOME), ALL, EXISTS를 사용합니다. ALL은 서브쿼리의 <b>모든 값</b>에 대해 조건이 참이어야 하고, ANY는 <b>하나라도</b> 참이면 됩니다.
<table><tr><th>연산</th><th>동치 표현</th><th>의미</th></tr>
<tr><td><code>&gt; ALL</code></td><td><code>&gt; MAX</code></td><td>최댓값보다 큼</td></tr>
<tr><td><code>&lt; ALL</code></td><td><code>&lt; MIN</code></td><td>최솟값보다 작음</td></tr>
<tr><td><code>&gt; ANY</code></td><td><code>&gt; MIN</code></td><td>최솟값보다 큼</td></tr>
<tr><td><code>&lt; ANY</code></td><td><code>&lt; MAX</code></td><td>최댓값보다 작음</td></tr>
<tr><td><code>= ANY</code></td><td><code>IN</code></td><td>목록 중 하나와 같음</td></tr>
<tr><td><code>&lt;&gt; ALL</code></td><td><code>NOT IN</code></td><td>목록의 어떤 값과도 다름</td></tr></table>
특수한 경우로 서브쿼리 결과가 <b>공집합</b>이면 ALL 조건은 항상 참, ANY 조건은 항상 거짓입니다. 또 서브쿼리 결과에 NULL이 섞이면 ALL·NOT IN 비교 결과가 UNKNOWN이 되어 행이 반환되지 않을 수 있습니다.`,
   trap:"&gt; ANY를 '최댓값보다 크다'로, &lt; ANY를 '최솟값보다 작다'로 거꾸로 생각하는 실수가 대표적입니다. ANY는 '가장 느슨한 기준'과 비교한다고 기억하세요.",
   tip:"ALL은 가장 엄격하게(모두 이겨야), ANY는 가장 느슨하게(하나만 이기면).",
   kw:["ALL","ANY","SOME","다중 행 서브쿼리","MAX/MIN 동치"]},

  {key:"키 스트레칭과 패스워드 저장 기법",
   body:`패스워드는 평문이나 복호화 가능한 형태가 아닌 <b>일방향 해시</b>로 저장해야 합니다. 그러나 MD5, SHA-256 같은 범용 해시는 계산이 매우 빨라 GPU로 초당 수십억 번 대입이 가능하므로 단순 해시만으로는 부족합니다.<br>
<b>키 스트레칭</b>은 해시를 수천~수만 번 반복해 한 번 검증하는 데 걸리는 시간을 늘리고, <b>솔트</b>는 사용자마다 다른 임의 값을 덧붙여 같은 패스워드라도 다른 해시값이 나오게 합니다.
<table><tr><th>기법/알고리즘</th><th>특징</th></tr>
<tr><td>솔트(Salt)</td><td>임의 값 추가, 레인보우 테이블 무력화</td></tr>
<tr><td>키 스트레칭</td><td>반복 해시로 연산 비용 증가</td></tr>
<tr><td>PBKDF2</td><td>솔트 + 반복 횟수(HMAC 기반), NIST 권고</td></tr>
<tr><td>bcrypt</td><td>Blowfish 기반, cost 인자로 반복 조절</td></tr>
<tr><td>scrypt</td><td>메모리 사용량까지 크게 하여 하드웨어 공격 방어</td></tr></table>
관련 용어로 <b>레인보우 테이블</b>은 미리 계산한 해시-평문 대응표를 이용한 공격, <b>사전 공격</b>은 자주 쓰는 단어 목록을 대입하는 공격, <b>무차별 대입 공격</b>은 모든 조합을 시도하는 공격입니다.`,
   trap:"'임의의 값을 덧붙인다'는 설명이면 솔트, '반복한다'는 설명이면 키 스트레칭입니다. 두 설명이 섞여 있으면 문제에서 강조된 동작(반복)을 기준으로 답합니다.",
   tip:"솔트는 소금 뿌리기(값 추가), 스트레칭은 늘리기(반복으로 시간 늘리기).",
   kw:["키 스트레칭","솔트","PBKDF2","bcrypt","레인보우 테이블"]},

  {key:"State 패턴과 행위 패턴 비교",
   body:`State 패턴은 객체의 상태를 클래스로 분리하고, Context 객체가 현재 상태 객체에 요청을 위임하여 상태가 바뀌면 행위도 자동으로 바뀌게 합니다. 상태 전이 로직이 상태 클래스 안으로 들어가 거대한 if/switch 문이 사라지는 것이 장점입니다.<br>
구조가 비슷한 Strategy 패턴과의 차이는 <b>누가 교체하느냐</b>입니다. State는 상태 객체가 스스로 다음 상태로 전이하고, Strategy는 클라이언트가 원하는 알고리즘을 선택해 주입합니다.
<table><tr><th>패턴</th><th>목적</th></tr>
<tr><td>State</td><td>상태에 따라 행위 변경, 상태를 클래스로 캡슐화</td></tr>
<tr><td>Strategy</td><td>알고리즘군을 캡슐화하여 교체 가능하게 함</td></tr>
<tr><td>Command</td><td>요청을 객체로 캡슐화(Undo, 큐, 로깅)</td></tr>
<tr><td>Iterator</td><td>내부 표현을 노출하지 않고 순차 접근</td></tr>
<tr><td>Mediator</td><td>객체 간 상호작용을 중재자 하나로 집중</td></tr>
<tr><td>Memento</td><td>객체 상태를 저장해 이전 상태로 복원</td></tr>
<tr><td>Template Method</td><td>알고리즘 골격은 상위, 세부 단계는 하위에서 구현</td></tr></table>
GoF 23개 패턴은 생성 5, 구조 7, 행위 11개로 구성됩니다.`,
   trap:"'상태를 저장해 복원(Undo)'은 Memento, '상태에 따라 행위가 달라짐'은 State입니다. 'Undo 기능'만 나오면 Command 또는 Memento를 의심하세요.",
   tip:"State는 '내가 스스로 바뀜', Strategy는 '남이 갈아끼움'.",
   kw:["State 패턴","Strategy","Command","Memento","행위 패턴"]},

  {key:"포인터 매개변수로 최댓값·최솟값 인덱스 반환",
   body:`C 함수는 return으로 값을 하나만 돌려줄 수 있으므로, 여러 결과를 반환하려면 <b>호출 측 변수의 주소</b>를 넘겨 함수 안에서 <code>*포인터 = 값</code>으로 직접 기록합니다(포인터를 이용한 참조 호출 효과).<br>
최댓값·최솟값 탐색에서 비교 연산자가 <code>&gt;</code>/<code>&lt;</code>이면 같은 값이 여러 개일 때 <b>처음</b> 위치가, <code>&gt;=</code>/<code>&lt;=</code>이면 <b>마지막</b> 위치가 남습니다.
<table><tr><th>조건</th><th>중복 최댓값 처리</th><th>a={7,3,9,1,9,4,1,6}</th></tr>
<tr><td><code>arr[i] &gt; arr[mx]</code></td><td>첫 번째 위치 유지</td><td>mx = 2</td></tr>
<tr><td><code>arr[i] &gt;= arr[mx]</code></td><td>마지막 위치로 갱신</td><td>mx = 4</td></tr>
<tr><td><code>arr[i] &lt; arr[mn]</code></td><td>첫 번째 위치 유지</td><td>mn = 3</td></tr>
<tr><td><code>arr[i] &lt;= arr[mn]</code></td><td>마지막 위치로 갱신</td><td>mn = 6</td></tr></table>
함수 매개변수 <code>int *arr</code>와 <code>int arr[]</code>는 동일하며, 배열 이름을 넘기면 첫 원소의 주소가 전달되므로 함수 안에서 배열 크기를 sizeof로 구할 수 없어 n을 따로 넘깁니다. 인덱스를 저장하는 <code>*maxIdx</code>를 다시 배열 첨자로 사용하는 <code>arr[*maxIdx]</code> 형태도 자주 나옵니다.`,
   trap:"최댓값 9가 두 번 나올 때 &gt;=이면 뒤쪽 인덱스 4가 된다는 점, 최솟값은 &lt;여서 앞쪽 인덱스 3이 된다는 점을 섞어 놓은 것이 함정입니다.",
   tip:"등호가 있으면 '마지막 승자', 없으면 '첫 승자'.",
   kw:["포인터 매개변수","출력 매개변수","최댓값 인덱스","등호 비교","배열 전달"]}
]);
