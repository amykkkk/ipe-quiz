NOTES.push([
  {key:"구조체 포인터와 원형 연결 리스트 순회",
   body:`자기 참조 구조체(<code>struct Node *next</code>)는 연결 리스트의 기본 단위이며, 마지막 노드가 첫 노드를 가리키면 <b>원형 연결 리스트</b>가 됩니다.<br>
원형 리스트를 n번 순회하면 i번째 방문 노드는 <b>i % 노드 수</b> 위치이므로, 반복 횟수를 주기로 나누어 계산하면 빠릅니다(7 = 3 × 2 + 1 → 한 바퀴 합 6 × 2 + 첫 노드 1).<br>
구조체 멤버 접근은 변수일 때 <code>.</code>, 포인터일 때 <code>-&gt;</code>를 쓰며, <code>p-&gt;next-&gt;v</code>처럼 연쇄 접근도 자주 출제됩니다.<br>
포인터 산술 규칙도 함께 정리하세요: <code>p + 1</code>은 1바이트가 아니라 <b>sizeof(가리키는 자료형)</b>만큼 이동하고, <code>arr[i]</code>는 <code>*(arr + i)</code>와 같습니다.
<table><tr><th>표현</th><th>의미</th></tr>
<tr><td><code>*p++</code></td><td>*p 값을 사용한 뒤 포인터 p를 증가</td></tr>
<tr><td><code>(*p)++</code></td><td>p가 가리키는 값을 증가</td></tr>
<tr><td><code>*++p</code></td><td>p를 먼저 증가시킨 뒤 값 참조</td></tr>
<tr><td><code>p-&gt;v</code></td><td><code>(*p).v</code>와 동일</td></tr></table>
<pre>int arr[] = {10, 20, 30};
int *q = arr;
printf("%d", *(q + 2));   // 30</pre>`,
   trap:"반복문이 <code>s += p-&gt;v</code> 후 <code>p = p-&gt;next</code> 순서인지, 이동 후 더하는지에 따라 시작 노드가 달라집니다. 순서를 반드시 확인하세요.",
   tip:"원형 리스트 = 나머지(%) 연산. 반복 횟수 ÷ 노드 수 = 몇 바퀴 + 나머지 몇 칸.",
   kw:["자기 참조 구조체","-> 연산자","포인터 산술","원형 연결 리스트","*(arr+i)"]},

  {key:"Java 생성자 체이닝 this()와 super()",
   body:`모든 생성자의 첫 줄에는 <code>this(...)</code> 또는 <code>super(...)</code> 중 <b>하나만</b> 올 수 있으며, 둘 다 없으면 컴파일러가 <code>super()</code>를 자동 삽입합니다.<br>
따라서 객체 생성 시 항상 <b>부모 생성자가 먼저 완료</b>된 후 자식 생성자의 나머지 코드가 실행됩니다.<br>
부모에 기본 생성자가 없는데 자식 생성자가 super(인자)를 명시하지 않으면 컴파일 오류가 납니다.<br>
static 블록과 인스턴스 초기화 블록이 섞이면 다음 순서로 실행됩니다.
<table><tr><th>순서</th><th>실행 내용</th></tr>
<tr><td>1</td><td>부모 static 블록 (클래스 최초 로딩 시 1회)</td></tr>
<tr><td>2</td><td>자식 static 블록</td></tr>
<tr><td>3</td><td>부모 인스턴스 초기화 블록 → 부모 생성자 본문</td></tr>
<tr><td>4</td><td>자식 인스턴스 초기화 블록 → 자식 생성자 본문</td></tr></table>
오버로딩된 생성자끼리 this()로 호출하는 것을 생성자 체이닝이라 하고, 호출 경로를 스택처럼 따라간 뒤 <b>안쪽부터 출력</b>이 쌓인다고 생각하면 됩니다.`,
   trap:"this()가 있는 생성자에도 super()가 자동 삽입된다고 착각해 기본 생성자의 출력(P)을 추가하는 실수가 가장 흔합니다.",
   tip:"생성자 첫 줄 = this 아니면 super, 둘 다 없으면 super() 자동. 출력은 부모 → 자식, 안쪽 → 바깥쪽.",
   kw:["this()","super()","생성자 오버로딩","초기화 블록","static 블록"]},

  {key:"Python map/filter/lambda와 음수 인덱스",
   body:`<code>filter(함수, 반복객체)</code>는 함수 결과가 True인 요소만 남기고, <code>map(함수, 반복객체)</code>는 모든 요소에 함수를 적용합니다. Python 3에서는 둘 다 <b>지연 평가 이터레이터</b>를 반환하므로 <code>list()</code>로 감싸야 값이 보입니다.<br>
같은 결과를 리스트 컴프리헨션으로도 쓸 수 있어 함께 출제됩니다.
<pre>nums = [1, 2, 3, 4, 5, 6]
r = [x * x for x in nums if x % 2 == 0]   # [4, 16, 36]
from functools import reduce
print(reduce(lambda a, b: a + b, r))      # 56</pre>
<table><tr><th>함수</th><th>역할</th><th>반환</th></tr>
<tr><td>map</td><td>각 요소 변환</td><td>map 이터레이터</td></tr>
<tr><td>filter</td><td>조건 만족 요소 선별</td><td>filter 이터레이터</td></tr>
<tr><td>reduce</td><td>누적 연산 (functools)</td><td>단일 값</td></tr></table>
인덱스 <code>-1</code>은 마지막, <code>-2</code>는 뒤에서 두 번째이며, 슬라이싱 <code>r[::-1]</code>은 역순, <code>r[1:]</code>은 두 번째부터입니다.`,
   trap:"filter와 map의 적용 순서(안쪽 함수가 먼저)를 거꾸로 해석하거나, list() 없이 map을 print하면 값이 아니라 객체 정보가 출력된다는 점을 놓칩니다.",
   tip:"안쪽부터 풀기: filter(거르기) → map(바꾸기) → list(펼치기).",
   kw:["lambda","map","filter","리스트 컴프리헨션","음수 인덱스","슬라이싱"]},

  {key:"OUTER JOIN 종류와 ON/USING 조건",
   body:`외부 조인은 조인 조건에 맞지 않는 행도 결과에 포함시키며, <b>기준이 되는 쪽</b>(LEFT/RIGHT/FULL)의 행은 모두 남고 반대쪽 컬럼은 NULL로 채워집니다.<br>
<code>OUTER</code> 키워드는 생략 가능해 <code>LEFT JOIN</code>도 같은 의미입니다.
<table><tr><th>조인</th><th>결과</th></tr>
<tr><td>INNER JOIN</td><td>양쪽 일치 행만</td></tr>
<tr><td>LEFT OUTER JOIN</td><td>왼쪽 전체 + 오른쪽 일치분</td></tr>
<tr><td>RIGHT OUTER JOIN</td><td>오른쪽 전체 + 왼쪽 일치분</td></tr>
<tr><td>FULL OUTER JOIN</td><td>양쪽 전체</td></tr>
<tr><td>CROSS JOIN</td><td>카티션 곱 (행 수 = m × n)</td></tr>
<tr><td>NATURAL JOIN</td><td>같은 이름 컬럼으로 자동 동등 조인</td></tr></table>
오라클 전용 표기로는 <code>WHERE A.부서코드 = B.부서코드(+)</code>처럼 NULL이 채워질 쪽에 (+)를 붙이면 LEFT OUTER JOIN과 같습니다.<br>
SELECT문의 논리적 실행 순서는 <b>FROM → ON/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</b>이므로, 외부 조인 후 WHERE에서 오른쪽 테이블 컬럼을 조건으로 걸면 NULL 행이 제거되어 내부 조인처럼 동작할 수 있습니다.`,
   trap:"「부서 없는 사원까지」는 사원 쪽을 살리는 것이므로 FROM에 쓴 테이블 위치를 보고 LEFT/RIGHT를 결정해야 합니다. 조건절에 WHERE를 쓰는 실수도 주의하세요.",
   tip:"살릴 테이블 쪽 방향 = 조인 방향. 조건은 ON, 컬럼명 같으면 USING.",
   kw:["LEFT OUTER JOIN","FULL OUTER JOIN","NATURAL JOIN","USING","(+) 표기","SQL 실행 순서"]},

  {key:"이상 현상과 정규화 단계",
   body:`이상 현상은 하나의 릴레이션에 서로 다른 주제의 속성이 섞여 <b>함수적 종속이 잘못 설계</b>되었을 때 발생하며, 정규화는 릴레이션을 무손실 분해하여 이를 제거합니다.<br>
함수적 종속 X → Y는 X 값이 Y 값을 유일하게 결정함을 뜻하고, 각 정규형은 특정 종속을 제거하는 단계입니다.
<table><tr><th>정규형</th><th>조건</th></tr>
<tr><td>1NF</td><td>모든 속성 값이 원자값(도메인 원자성)</td></tr>
<tr><td>2NF</td><td>부분 함수적 종속 제거 (완전 함수적 종속)</td></tr>
<tr><td>3NF</td><td>이행적 함수적 종속 제거 (A→B, B→C 이면 A→C 제거)</td></tr>
<tr><td>BCNF</td><td>모든 결정자가 후보키</td></tr>
<tr><td>4NF</td><td>다치(다중값) 종속 제거</td></tr>
<tr><td>5NF</td><td>조인 종속 제거 (후보키를 통한 조인 종속만 허용)</td></tr></table>
정규화의 반대 개념인 <b>반정규화(역정규화)</b>는 성능 향상을 위해 의도적으로 중복을 허용하는 것으로, 테이블 병합·분할, 중복 컬럼 추가 등이 있습니다.`,
   trap:"갱신 이상을 「수정 이상」으로 써도 정답이지만, 삭제 이상과 갱신 이상의 설명(연쇄 삭제 vs 불일치)을 바꿔 쓰는 실수가 잦습니다.",
   tip:"이상 현상 = 삽·삭·갱. 정규화 단계 = 「도부이결다조」(도메인 원자값, 부분, 이행, 결정자, 다치, 조인).",
   kw:["함수적 종속","부분 함수적 종속","이행적 종속","BCNF","반정규화"]},

  {key:"트랜잭션 ACID 특성과 보장 기법",
   body:`트랜잭션은 데이터베이스 상태를 변환하는 <b>하나의 논리적 작업 단위</b>이며 ACID 각 특성은 DBMS의 서로 다른 모듈이 보장합니다.<br>
원자성은 <b>COMMIT/ROLLBACK</b>(트랜잭션 관리자), 일관성은 무결성 제약조건, 독립성은 <b>병행 제어(로킹, 타임스탬프)</b>, 영속성은 <b>회복 기법(로그, 체크포인트)</b>이 담당합니다.<br>
트랜잭션의 상태 전이도 함께 출제됩니다.
<table><tr><th>상태</th><th>설명</th></tr>
<tr><td>활동(Active)</td><td>트랜잭션 실행 중</td></tr>
<tr><td>부분 완료(Partially Committed)</td><td>마지막 연산 실행 직후, COMMIT 직전</td></tr>
<tr><td>완료(Committed)</td><td>COMMIT 완료</td></tr>
<tr><td>실패(Failed)</td><td>오류로 실행 중단</td></tr>
<tr><td>철회(Aborted)</td><td>ROLLBACK 수행</td></tr></table>
회복 기법으로는 즉시 갱신(REDO/UNDO 모두 필요), 지연 갱신(REDO만 필요), 그림자 페이징, 검사점 기법이 있습니다.`,
   trap:"Isolation을 「고립성/격리성」으로 써도 되지만, 일관성(Consistency)과 독립성(Isolation)의 설명을 혼동하는 경우가 많습니다. 「동시 실행·끼어들기」는 독립성입니다.",
   tip:"ACID = 원·일·독·영. 원자성은 All or Nothing, 영속성은 고장 나도 남는다.",
   kw:["COMMIT","ROLLBACK","병행 제어","로킹","회복 기법","트랜잭션 상태"]},

  {key:"스미싱 등 피싱 계열 사회공학 공격",
   body:`피싱 계열 공격은 기술적 취약점보다 <b>사람의 심리를 이용하는 사회공학(Social Engineering)</b> 기법으로, 전달 매체에 따라 이름이 달라집니다.
<table><tr><th>공격</th><th>매체/방식</th></tr>
<tr><td>피싱</td><td>이메일 등으로 가짜 사이트 유도</td></tr>
<tr><td>스미싱</td><td>SMS 문자 + 악성 URL/앱</td></tr>
<tr><td>비싱</td><td>음성 전화 (보이스피싱)</td></tr>
<tr><td>큐싱</td><td>QR코드로 악성 URL 유도</td></tr>
<tr><td>파밍</td><td>DNS·hosts 변조로 정상 주소 입력 시에도 가짜 사이트 접속</td></tr>
<tr><td>스피어 피싱</td><td>특정 개인·조직을 겨냥한 맞춤형 메일</td></tr>
<tr><td>웨일링</td><td>CEO 등 고위 임원을 겨냥한 스피어 피싱</td></tr></table>
스미싱은 악성 앱 설치로 인증번호 가로채기, 소액결제, 연락처 탈취로 이어지며, 출처 불명의 URL 클릭 금지와 「출처를 알 수 없는 앱 설치」 차단이 대표 대응책입니다.<br>
비슷하게 출제되는 <b>워터링 홀</b>은 표적이 자주 방문하는 웹사이트를 감염시켜 기다리는 공격입니다.`,
   trap:"파밍은 사용자가 URL을 정상적으로 입력해도 속는다는 점이 핵심이라 스미싱·피싱과 구분됩니다. 「문자」 키워드면 스미싱입니다.",
   tip:"Smishing = SMS + Phishing, Qshing = QR + Phishing, Vishing = Voice + Phishing.",
   kw:["사회공학","피싱","파밍","큐싱","스피어 피싱","워터링 홀"]},

  {key:"RSA와 대칭키/공개키 암호 비교",
   body:`RSA는 두 큰 소수 p, q의 곱 n을 공개하고, n을 다시 소인수분해하기 어렵다는 점에 안전성을 둡니다. 공개키로 암호화하면 개인키로만 복호화되고(기밀성), 개인키로 서명하면 공개키로 검증됩니다(전자서명).<br>
대칭키 방식은 n명이 서로 통신할 때 <b>n(n-1)/2개</b>의 키가 필요하고, 공개키 방식은 <b>2n개</b>가 필요합니다.
<table><tr><th>구분</th><th>대칭키</th><th>공개키(비대칭키)</th></tr>
<tr><td>키</td><td>암·복호화 키 동일</td><td>공개키/개인키 쌍</td></tr>
<tr><td>속도</td><td>빠름</td><td>느림</td></tr>
<tr><td>알고리즘</td><td>DES, 3DES, AES, SEED, ARIA, IDEA</td><td>RSA, ECC, ElGamal, DSA</td></tr>
<tr><td>문제</td><td>키 배송 문제</td><td>연산량 큼</td></tr></table>
대칭키는 다시 블록 암호(DES, AES, SEED)와 스트림 암호(RC4, LFSR)로 나뉩니다. 해시(SHA-256, MD5)는 복호화가 불가능한 일방향 함수로 무결성 검증에 쓰입니다.<br>
AES는 128비트 블록에 128/192/256비트 키, DES는 64비트 블록에 56비트 키를 사용합니다.`,
   trap:"「소인수분해」는 RSA, 「이산대수」는 ElGamal/디피-헬만, 「타원곡선」은 ECC입니다. 수학적 난제 키워드로 구분하세요.",
   tip:"RSA = 세 사람 이름 머리글자(Rivest, Shamir, Adleman) + 소인수분해.",
   kw:["공개키 암호","ECC","AES","SEED/ARIA","해시 함수","전자서명"]},

  {key:"OSI 7계층별 PDU와 장비",
   body:`데이터는 송신 측에서 상위 계층에서 하위 계층으로 내려가며 각 계층의 헤더가 붙는 <b>캡슐화</b>, 수신 측에서는 헤더를 떼어내는 <b>역캡슐화</b>를 거칩니다. 이때 각 계층의 데이터 단위를 PDU라고 합니다.
<table><tr><th>계층</th><th>PDU</th><th>주요 프로토콜/장비</th></tr>
<tr><td>7 응용 / 6 표현 / 5 세션</td><td>메시지(데이터)</td><td>HTTP, FTP, SMTP / JPEG, SSL / NetBIOS</td></tr>
<tr><td>4 전송</td><td>세그먼트</td><td>TCP, UDP / 게이트웨이</td></tr>
<tr><td>3 네트워크</td><td>패킷</td><td>IP, ICMP, ARP / 라우터</td></tr>
<tr><td>2 데이터 링크</td><td>프레임</td><td>Ethernet, HDLC / 스위치, 브리지</td></tr>
<tr><td>1 물리</td><td>비트</td><td>RS-232C / 허브, 리피터</td></tr></table>
TCP/IP 4계층 모델은 네트워크 액세스(1·2) - 인터넷(3) - 전송(4) - 응용(5·6·7)으로 대응됩니다.<br>
주소 체계도 계층별로 다릅니다: 2계층은 MAC 주소, 3계층은 IP 주소, 4계층은 포트 번호를 사용합니다.`,
   trap:"전송 계층 PDU를 패킷으로, 네트워크 계층을 프레임으로 바꿔 쓰는 실수가 많습니다. 아래에서 위로 「비-프-패-세」 순서를 고정하세요.",
   tip:"아래부터 「비프패세메」: 비트 → 프레임 → 패킷 → 세그먼트 → 메시지. 계층 이름은 「물데네전세표응」.",
   kw:["캡슐화","PDU","MAC 주소","라우터","TCP/IP 4계층"]},

  {key:"옵서버 패턴과 GoF 패턴 분류",
   body:`옵서버 패턴은 <b>Subject(주체)</b>가 Observer 목록을 보관하고, 상태 변경 시 <code>notify()</code>로 각 Observer의 <code>update()</code>를 호출하는 구조입니다. 주체와 관찰자가 느슨하게 결합되어 관찰자를 자유롭게 추가·제거할 수 있으며, 발행-구독(Pub-Sub) 모델과 MVC의 Model-View 관계의 기반이 됩니다.<br>
GoF 패턴은 목적에 따라 생성 5개, 구조 7개, 행위 11개로 나뉩니다.
<table><tr><th>분류</th><th>패턴</th></tr>
<tr><td>생성(5)</td><td>추상 팩토리, 빌더, 팩토리 메서드, 프로토타입, 싱글톤</td></tr>
<tr><td>구조(7)</td><td>어댑터, 브리지, 컴포지트, 데코레이터, 퍼사드, 플라이웨이트, 프록시</td></tr>
<tr><td>행위(11)</td><td>책임 연쇄, 커맨드, 인터프리터, 반복자, 중재자, 메멘토, 옵서버, 상태, 전략, 템플릿 메서드, 방문자</td></tr></table>
혼동하기 쉬운 행위 패턴: <b>중재자(Mediator)</b>는 객체 간 N:M 상호작용을 중재자 하나로 캡슐화, <b>전략(Strategy)</b>은 알고리즘군을 교체 가능하게 캡슐화, <b>상태(State)</b>는 상태에 따라 객체 행위를 변경, <b>메멘토</b>는 이전 상태 저장·복원(Undo)입니다.`,
   trap:"「1:N 통지/자동 갱신」은 옵서버, 「객체 간 복잡한 상호작용 중재」는 중재자입니다. 둘 다 객체 간 통신을 다루어 혼동하기 쉽습니다.",
   tip:"생성 5개 「추빌팩프싱」, 구조 7개 「어브컴데퍼플프」. 나머지는 모두 행위.",
   kw:["Subject/Observer","Pub-Sub","중재자 패턴","전략 패턴","GoF 23패턴"]},

  {key:"화이트박스 테스트 커버리지 종류",
   body:`커버리지는 테스트가 코드 구조를 얼마나 수행했는지 나타내는 척도이며, 아래로 갈수록 검증 강도가 높아집니다.
<table><tr><th>커버리지</th><th>기준</th></tr>
<tr><td>구문(문장) 커버리지</td><td>모든 문장을 최소 1번 실행</td></tr>
<tr><td>결정(분기) 커버리지</td><td>각 결정문 전체가 참·거짓을 1번 이상</td></tr>
<tr><td>조건 커버리지</td><td>결정문 내 각 개별 조건이 참·거짓을 1번 이상</td></tr>
<tr><td>조건/결정 커버리지</td><td>개별 조건과 전체 결정 모두 참·거짓 만족</td></tr>
<tr><td>변경 조건/결정(MC/DC)</td><td>각 개별 조건이 독립적으로 결정 결과에 영향</td></tr>
<tr><td>다중 조건 커버리지</td><td>모든 개별 조건 조합을 테스트 (2^n)</td></tr></table>
예를 들어 <code>if (A &amp;&amp; B)</code>에서 MC/DC는 A만 바꿔 결과가 바뀌는 쌍(TT/FT)과 B만 바꿔 결과가 바뀌는 쌍(TT/TF)이 필요하므로 TT, FT, TF 3개 케이스로 충족됩니다(n+1개). 다중 조건은 4개가 필요합니다.<br>
화이트박스 기법에는 기초 경로 검사(McCabe 순환 복잡도 V(G) = E - N + 2), 제어 구조 검사(조건·루프·데이터 흐름)도 있습니다.`,
   trap:"「조건/결정 커버리지」와 「변경 조건/결정 커버리지」를 혼동하기 쉽습니다. 「독립적으로 영향」이라는 표현이 나오면 MC/DC입니다.",
   tip:"구 → 결 → 조 → 조결 → 변조결 → 다중. 「독립적 영향」 = 변경(Modified).",
   kw:["구문 커버리지","결정 커버리지","조건 커버리지","다중 조건 커버리지","순환 복잡도"]},

  {key:"CPU 스케줄링 SJF와 대기 시간 계산",
   body:`SJF는 준비 큐에서 <b>실행 시간이 가장 짧은 프로세스</b>를 먼저 선택하여 평균 대기 시간을 최소화하지만, 긴 작업이 계속 밀리는 <b>기아(Starvation)</b> 현상이 발생할 수 있습니다.<br>
대기 시간 = 반환 시간 - 실행 시간 = (종료 시각 - 도착 시각) - 실행 시간이며, 비선점에서는 시작 시각 - 도착 시각과 같습니다.
<table><tr><th>기법</th><th>방식</th><th>선점</th></tr>
<tr><td>FCFS</td><td>도착 순서대로</td><td>비선점</td></tr>
<tr><td>SJF</td><td>실행 시간 짧은 순</td><td>비선점</td></tr>
<tr><td>HRN</td><td>우선순위 = (대기 + 서비스) / 서비스, 큰 값 우선</td><td>비선점</td></tr>
<tr><td>SRT</td><td>남은 시간 짧은 순 (SJF의 선점형)</td><td>선점</td></tr>
<tr><td>RR</td><td>시간 할당량(Time Slice)만큼 순환</td><td>선점</td></tr>
<tr><td>MLQ / MLFQ</td><td>다단계 큐 / 다단계 피드백 큐</td><td>선점</td></tr></table>
같은 데이터를 SRT로 풀면 P1(0~1) → P2(1~4) → P4(4~6) → P1(6~11) → P3(11~19)이 되어 대기 시간 P1 5, P2 0, P3 9, P4 1, 평균 <b>3.75</b>로 SJF보다 작아집니다.<br>
HRN은 대기 시간이 길수록 우선순위가 높아져 SJF의 기아 현상을 보완하며, 우선순위 기법의 기아는 <b>에이징(Aging)</b>으로 해결합니다.`,
   trap:"비선점 SJF는 시각 0에 도착한 P1이 끝날 때까지 다른 짧은 작업이 끼어들 수 없습니다. 처음부터 실행 시간 순으로 정렬해 버리는 실수에 주의하세요.",
   tip:"간트 차트를 먼저 그리고, 대기 = 시작 - 도착(비선점). 선점형은 종료 - 도착 - 실행.",
   kw:["FCFS","SRT","HRN","Round Robin","기아 현상","에이징"]},

  {key:"C 문자 연산과 strlen/sizeof 차이",
   body:`C의 <code>char</code>는 내부적으로 ASCII 코드 정수이므로 <code>'7' - '0'</code> = 7처럼 숫자 문자를 정수로 바꾸고, <code>'a' - 32</code>나 <code>'a' - 'A'</code>로 대소문자를 변환할 수 있습니다.<br>
주요 ASCII 값: <code>'0'</code> = 48, <code>'A'</code> = 65, <code>'a'</code> = 97 (대소문자 차이 32).<br>
<code>strlen</code>은 널 문자(<code>'0'</code>이 아닌 NUL) 직전까지의 길이, <code>sizeof</code>는 널 문자를 포함한 배열 전체 바이트 수입니다.
<table><tr><th>표현</th><th>char s[] = "KOREA2026"</th></tr>
<tr><td>strlen(s)</td><td>9</td></tr>
<tr><td>sizeof(s)</td><td>10</td></tr>
<tr><td>s[9]</td><td>널 문자 (값 0)</td></tr></table>
<pre>char c = 'b';
printf("%c %d", c - 32, c - 'a');   // B 1</pre>
문자열 함수로 <code>strcpy</code>(복사), <code>strcat</code>(연결), <code>strcmp</code>(비교, 같으면 0)도 함께 정리하세요. 포인터 <code>char *p = "abc"</code>에서는 sizeof(p)가 문자열 길이가 아니라 포인터 크기(보통 8 또는 4)라는 점도 함정입니다.`,
   trap:"숫자 문자를 개수로 세는지(cnt++) 값으로 더하는지(cnt += s[i] - '0')를 구분해야 하며, 마지막 곱셈에 strlen 값(널 제외)을 쓰는 점을 놓치기 쉽습니다.",
   tip:"'0'=48, 'A'=65, 'a'=97. strlen은 널 빼고, sizeof는 널 포함.",
   kw:["ASCII 코드","strlen","sizeof","널 문자","문자-정수 변환"]},

  {key:"Java try-catch-finally 실행 흐름",
   body:`<code>finally</code> 블록은 예외 발생 여부와 관계없이, 그리고 try나 catch에 <code>return</code>이 있어도 <b>메서드가 반환되기 직전에 반드시 실행</b>됩니다(System.exit() 호출 시 제외).<br>
return 값은 return 문 실행 시점에 이미 계산되어 보관되므로, finally에서 지역 변수를 바꿔도 반환값은 바뀌지 않습니다. 단, <b>finally 안에 return이 있으면 그 값이 최종 반환값</b>이 됩니다.
<pre>static int f() {
    int x = 1;
    try { return x; }
    finally { x = 99; }      // 반환값은 1
}</pre>
<table><tr><th>상황</th><th>실행 블록</th></tr>
<tr><td>예외 없음</td><td>try 전체 → finally</td></tr>
<tr><td>예외 발생 + catch 일치</td><td>try(예외 지점까지) → catch → finally</td></tr>
<tr><td>예외 발생 + catch 불일치</td><td>try → finally → 예외 상위 전파</td></tr></table>
catch를 여러 개 둘 때는 하위 예외(ArithmeticException)를 상위 예외(Exception)보다 먼저 써야 하며, 순서가 반대면 컴파일 오류입니다. 0으로 정수 나눗셈은 ArithmeticException, 배열 범위 초과는 ArrayIndexOutOfBoundsException, null 참조는 NullPointerException입니다.`,
   trap:"finally가 return 이후라서 실행되지 않는다고 생각하거나, 출력 순서에서 main의 print(a+b)가 마지막이라는 점을 놓쳐 정수 덧셈 대신 문자열 연결로 착각하는 실수가 있습니다.",
   tip:"finally는 return보다 먼저, 무조건 실행. finally 안 return은 모든 것을 덮어쓴다.",
   kw:["finally","ArithmeticException","예외 전파","throw/throws","다중 catch"]},

  {key:"Python 클래스 변수와 연산자 오버로딩",
   body:`클래스 본문에 선언한 변수(<code>total</code>)는 모든 인스턴스가 공유하는 <b>클래스 변수</b>, <code>self.n</code>은 인스턴스마다 따로 있는 <b>인스턴스 변수</b>입니다.<br>
주의: <code>self.total += 1</code>처럼 인스턴스로 대입하면 클래스 변수가 바뀌는 것이 아니라 같은 이름의 인스턴스 변수가 새로 생겨 클래스 변수를 가립니다. 공유 값을 바꾸려면 <code>Counter.total</code>로 접근해야 합니다.<br>
<code>__add__</code> 같은 매직 메서드(던더 메서드)는 연산자를 객체에 맞게 재정의합니다.
<table><tr><th>메서드</th><th>호출 시점</th></tr>
<tr><td>__init__</td><td>객체 생성 시 (생성자)</td></tr>
<tr><td>__str__</td><td>print(), str() 호출 시</td></tr>
<tr><td>__add__ / __sub__</td><td>+ / - 연산</td></tr>
<tr><td>__eq__ / __lt__</td><td>== / &lt; 비교</td></tr>
<tr><td>__len__</td><td>len() 호출 시</td></tr></table>
연산자 메서드 내부에서 새 객체를 생성하면 <code>__init__</code>이 다시 실행되므로 클래스 변수 누적 값도 함께 바뀐다는 점이 이 유형의 핵심입니다.`,
   trap:"a + b가 단순 덧셈이라 생각해 __add__ 내부의 Counter(...) 생성으로 total이 한 번 더 증가하는 것을 놓치는 경우가 많습니다.",
   tip:"클래스 변수는 공용 금고, 객체를 만들 때마다(__init__) 금고가 바뀐다.",
   kw:["클래스 변수","인스턴스 변수","__init__","__add__","매직 메서드"]},

  {key:"IPv4에서 IPv6 전환 기술과 IPv6 특징",
   body:`IPv6 전환은 기존 IPv4 인프라를 한 번에 교체할 수 없어 공존 기술이 필요합니다. <b>듀얼 스택</b>은 장비가 두 프로토콜을 모두 지원, <b>터널링</b>은 IPv6 패킷을 IPv4 패킷에 캡슐화해 IPv4 구간을 통과(6to4, ISATAP, Teredo 등), <b>변환</b>은 NAT-PT처럼 헤더와 주소를 상호 변환합니다.
<table><tr><th>구분</th><th>IPv4</th><th>IPv6</th></tr>
<tr><td>주소 길이</td><td>32비트</td><td>128비트</td></tr>
<tr><td>표기</td><td>8비트씩 4개, 10진수, 점(.)</td><td>16비트씩 8개, 16진수, 콜론(:)</td></tr>
<tr><td>주소 유형</td><td>유니캐스트, 멀티캐스트, 브로드캐스트</td><td>유니캐스트, 멀티캐스트, 애니캐스트</td></tr>
<tr><td>헤더</td><td>가변 (20~60바이트)</td><td>고정 40바이트 + 확장 헤더</td></tr>
<tr><td>보안</td><td>IPSec 선택</td><td>IPSec 기본 지원</td></tr></table>
IPv6는 연속된 0 필드를 <code>::</code>로 한 번만 생략할 수 있고, 자동 주소 설정(Stateless Auto-configuration)과 흐름 레이블로 QoS를 지원합니다.`,
   trap:"IPv6에 브로드캐스트가 있다고 쓰거나, 터널링과 변환의 설명(캡슐화 vs 헤더 변환)을 바꾸는 실수가 잦습니다.",
   tip:"전환 3총사 「듀터변」: 듀얼 스택, 터널링, 변환. IPv6 주소 유형은 「유멀애」.",
   kw:["듀얼 스택","터널링","NAT-PT","애니캐스트","IPv6 128비트"]},

  {key:"C 매크로 텍스트 치환과 괄호 함정",
   body:`<code>#define</code>은 전처리기가 컴파일 전에 <b>문자 그대로 치환</b>하므로 연산자 우선순위가 호출 형태가 아닌 치환된 결과식에 적용됩니다. 그래서 인자와 전체식을 모두 괄호로 감싸야 합니다.
<table><tr><th>정의</th><th>SQ(a+1), a=3</th><th>50 / SQ(5)</th></tr>
<tr><td><code>x * x</code></td><td>3+1*3+1 = 7</td><td>50/5*5 = 50</td></tr>
<tr><td><code>(x) * (x)</code></td><td>(3+1)*(3+1) = 16</td><td>50/(5)*(5) = 50</td></tr>
<tr><td><code>((x) * (x))</code></td><td>16</td><td>50/25 = 2</td></tr></table>
인자만 괄호로 감싸도 전체 괄호가 없으면 나눗셈 앞에서 여전히 틀린 결과가 나온다는 점이 자주 출제됩니다.
<pre>#define MUL(a, b) a * b
int r = MUL(2 + 3, 4);    // 2 + 3 * 4 = 14</pre>
매크로는 함수 호출 오버헤드가 없지만 타입 검사가 없고, <code>SQ(i++)</code>처럼 부수 효과가 있는 인자는 여러 번 평가되어 위험합니다. 상수 매크로 <code>#define PI 3.14</code>와 조건부 컴파일 <code>#ifdef</code>도 함께 기억하세요.`,
   trap:"매크로를 함수처럼 인자를 먼저 계산한 뒤 대입한다고 생각해 16, 2로 답하는 것이 대표적인 오답입니다.",
   tip:"매크로는 계산기가 아니라 복사-붙여넣기. 치환식을 직접 써 놓고 우선순위(* / 먼저, 같은 순위는 왼쪽부터)로 계산.",
   kw:["#define","전처리기","연산자 우선순위","매크로 함수","부수 효과"]},

  {key:"소프트웨어 형상 관리(SCM) 절차와 용어",
   body:`형상 관리는 소프트웨어 개발 전 과정에서 발생하는 <b>변경 사항을 관리</b>하여 가시성과 추적성을 확보하는 활동으로, 유지보수 단계뿐 아니라 개발 전 단계에 적용됩니다.<br>
<b>베이스라인(기준선)</b>은 정식 검토·승인되어 이후 변경은 공식 절차(형상 통제)를 거쳐야 하는 기준 시점의 산출물입니다.
<table><tr><th>절차</th><th>핵심 활동</th></tr>
<tr><td>형상 식별</td><td>관리 대상 항목 선정, 이름·번호 부여</td></tr>
<tr><td>형상 통제</td><td>변경 요청 검토·승인(CCB), 베이스라인 반영</td></tr>
<tr><td>형상 감사</td><td>베이스라인 변경의 무결성·적합성 검증</td></tr>
<tr><td>형상 기록(상태 보고)</td><td>변경 내용을 기록하고 보고서 작성</td></tr></table>
버전 관리 용어도 함께 출제됩니다: <b>체크아웃</b>(저장소에서 파일 가져오기), <b>체크인</b>(수정 파일 저장소 반영), <b>커밋</b>(변경 내용 확정), <b>동기화</b>(최신 버전으로 갱신), <b>Import/Export</b>.<br>
도구 유형은 공유 폴더 방식(RCS, SCCS), 클라이언트/서버 방식(CVS, SVN), 분산 저장소 방식(Git, Bitkeeper)으로 나뉩니다.`,
   trap:"「CCB 승인」, 「변경 요구 검토」 키워드는 형상 통제이고, 「무결성 평가·검증」은 형상 감사입니다. 두 절차를 혼동하지 마세요.",
   tip:"형상 관리 절차 「식통감기」: 식별 → 통제 → 감사 → 기록.",
   kw:["베이스라인","CCB","형상 감사","체크인/체크아웃","Git/SVN"]},

  {key:"접근 통제 정책 DAC/MAC/RBAC",
   body:`접근 통제는 주체(사용자·프로세스)가 객체(파일·데이터)에 접근하는 것을 정책에 따라 허용·거부하는 것으로, 권한 결정 주체가 누구냐에 따라 구분됩니다.
<table><tr><th>구분</th><th>DAC</th><th>MAC</th><th>RBAC</th></tr>
<tr><td>권한 부여자</td><td>데이터 소유자</td><td>시스템(관리자 규칙)</td><td>중앙 관리자</td></tr>
<tr><td>접근 기준</td><td>신원(ID)</td><td>보안 등급(레이블)</td><td>역할(Role)</td></tr>
<tr><td>특징</td><td>유연, 권한 위임 가능</td><td>엄격, 군사·정부</td><td>인사 이동 시 관리 용이</td></tr>
<tr><td>예</td><td>ACL, 유닉스 파일 권한</td><td>Bell-LaPadula</td><td>기업 직무별 권한</td></tr></table>
MAC의 대표 모델: <b>벨-라파듈라(BLP)</b>는 기밀성 모델로 No Read Up, No Write Down이고, <b>비바(Biba)</b>는 무결성 모델로 No Read Down, No Write Up입니다. 클락-윌슨(Clark-Wilson)도 무결성 모델입니다.<br>
접근 통제의 3요소는 정책, 메커니즘, 보안 모델이며, 인증 이후 단계인 인가(Authorization)에 해당합니다.`,
   trap:"「소유자가 부여」는 DAC, 「등급 비교·강제적」은 MAC입니다. 문제에서 영문 약어를 요구하면 한글로 쓰면 감점될 수 있으니 조건을 확인하세요.",
   tip:"D = 데이터 주인 마음대로(Discretionary), M = 무조건 규칙(Mandatory), R = 역할(Role).",
   kw:["임의적 접근 통제","강제적 접근 통제","역할 기반 접근 통제","벨-라파듈라","비바 모델"]},

  {key:"GRANT/REVOKE 권한 위임과 연쇄 회수",
   body:`DCL의 GRANT는 권한을 부여하고 REVOKE는 회수하며, 기본 형식은 다음과 같습니다.
<pre>GRANT 권한목록 ON 테이블 TO 사용자 [WITH GRANT OPTION];
REVOKE [GRANT OPTION FOR] 권한목록 ON 테이블 FROM 사용자 [CASCADE | RESTRICT];</pre>
부여 대상에 <code>PUBLIC</code>을 쓰면 모든 사용자에게 부여되며, 권한에는 SELECT, INSERT, UPDATE, DELETE, ALL 등이 있습니다. GRANT는 <b>TO</b>, REVOKE는 <b>FROM</b>을 쓴다는 점이 자주 출제됩니다.
<table><tr><th>옵션</th><th>의미</th></tr>
<tr><td>WITH GRANT OPTION</td><td>받은 권한을 다른 사용자에게 재부여 가능</td></tr>
<tr><td>GRANT OPTION FOR</td><td>권한 자체는 유지, 재부여 권한만 회수</td></tr>
<tr><td>CASCADE</td><td>해당 사용자가 재부여한 권한까지 연쇄 회수</td></tr>
<tr><td>RESTRICT</td><td>재부여된 권한이 있으면 회수 거부</td></tr></table>
SQL 분류도 정리하세요: DDL(CREATE, ALTER, DROP, TRUNCATE), DML(SELECT, INSERT, UPDATE, DELETE), DCL(GRANT, REVOKE), TCL(COMMIT, ROLLBACK, SAVEPOINT).<br>
여러 권한을 묶어 관리하려면 <code>CREATE ROLE</code>로 역할을 만들고 역할에 권한을 GRANT한 뒤 사용자에게 역할을 GRANT합니다.`,
   trap:"WITH ADMIN OPTION(시스템 권한·역할 위임)과 WITH GRANT OPTION(객체 권한 위임)을 혼동하거나, REVOKE에서 TO를 쓰는 실수가 잦습니다.",
   tip:"GRANT ~ TO ~ WITH GRANT OPTION, REVOKE ~ FROM ~ CASCADE. 「주는 건 TO, 뺏는 건 FROM」.",
   kw:["DCL","WITH GRANT OPTION","CASCADE","RESTRICT","ROLE","TCL"]}
]);
