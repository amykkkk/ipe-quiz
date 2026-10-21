NOTES.push([
  {key:"2차원 배열의 행 우선 저장과 포인터 연산",
   body:`C의 2차원 배열은 <b>행 우선(Row-major)</b> 순서로 메모리에 한 줄로 연속 저장됩니다. 따라서 열 수가 C인 배열에서 a[i][j]는 시작 주소로부터 <b>i*C + j</b>번째 원소이며, <code>int *p = &amp;a[0][0]</code>로 잡은 1차원 포인터로 <code>*(p + i*C + j)</code>처럼 접근할 수 있습니다.<br>
배열 이름 <code>a</code>는 '첫 번째 행을 가리키는 포인터(int (*)[3])'로 해석되므로 <code>a+1</code>은 원소 1개가 아니라 <b>한 행(int 3개 = 12바이트)</b>만큼 이동합니다. 반면 <code>a[0]</code>, <code>*a</code>는 int*로 해석되어 +1 하면 원소 하나(4바이트)만 이동합니다.<br>
대각선 문제에서는 주대각선 조건 i == j, 부대각선 조건 i + j == n-1을 기억하면 빠르게 풀립니다.
<table><tr><th>표현식</th><th>의미</th><th>a[3][3] 기준 값</th></tr>
<tr><td><code>*(*(a+i)+j)</code></td><td>a[i][j]</td><td>*(*(a+2)+1) = 8</td></tr>
<tr><td><code>*(a[i]+j)</code></td><td>a[i][j]</td><td>*(a[1]+2) = 6</td></tr>
<tr><td><code>**a</code></td><td>a[0][0]</td><td>1</td></tr>
<tr><td><code>*(*a+4)</code></td><td>p+4 위치 = a[1][1]</td><td>5</td></tr>
<tr><td><code>sizeof(a) / sizeof(a[0])</code></td><td>행의 개수</td><td>36 / 12 = 3</td></tr></table>`,
   trap:"<code>*(a+5)</code>처럼 배열 이름에 바로 정수를 더하면 원소가 아니라 <b>행 단위</b>로 이동한다는 점을 놓치기 쉽습니다. 1차원 포인터 p와 배열 이름 a의 +1 이동량을 구분하세요.",
   tip:"2차원 위치 = 행번호 × 열수 + 열번호, a+1은 한 줄 점프, *a+1은 한 칸 이동.",
   kw:["행 우선 저장","배열 포인터","포인터 산술","주대각선/부대각선","sizeof"]},

  {key:"인터페이스 다형성과 동적 바인딩(오버라이딩)",
   body:`Java에서 인스턴스 메서드 호출은 <b>참조 변수의 타입이 아니라 실제 생성된 객체의 타입</b>을 기준으로 실행 시점에 결정됩니다(동적 바인딩). 그래서 Shape 타입 배열에 담겨도 Square 객체는 Square의 area()가 실행됩니다.<br>
<code>super.area()</code>는 부모 클래스에 정의된 메서드를 직접 호출하므로 동적 바인딩을 타지 않습니다. 반면 부모 생성자나 부모 메서드 내부에서 다른 메서드를 호출하면, 그 메서드가 자식에서 오버라이딩되어 있을 경우 자식의 메서드가 실행되는 점이 자주 출제됩니다.<br>
주의할 점은 <b>필드와 static 메서드는 정적 바인딩</b>이라는 것입니다. 부모 타입 참조로 필드에 접근하면 부모의 필드 값이 나오고, static 메서드는 오버라이딩이 아니라 숨김(hiding)이 됩니다.
<table><tr><th>구분</th><th>오버라이딩</th><th>오버로딩</th></tr>
<tr><td>위치</td><td>상속 관계(부모-자식)</td><td>같은 클래스 내</td></tr>
<tr><td>시그니처</td><td>이름·매개변수·반환형 동일</td><td>이름 동일, 매개변수 개수/타입 다름</td></tr>
<tr><td>결정 시점</td><td>실행 시(동적)</td><td>컴파일 시(정적)</td></tr></table>
인터페이스의 추상 메서드는 암묵적으로 public이므로 구현 클래스에서 반드시 public으로 구현해야 합니다.`,
   trap:"참조 타입(Shape)만 보고 판단하거나, Square가 Rect를 상속하니 area()가 16이라고 계산하는 실수가 많습니다. 실제 객체의 오버라이딩 메서드와 super 호출을 함께 따라가세요.",
   tip:"메서드는 객체(new 뒤)를 따르고, 필드와 static은 변수 타입(왼쪽)을 따른다.",
   kw:["동적 바인딩","오버라이딩","오버로딩","인터페이스","super","업캐스팅"]},

  {key:"파이썬 집합(set) 연산자와 대칭 차집합",
   body:`set은 <b>중복을 허용하지 않고 순서가 없는</b> 자료형입니다. 출력 순서가 보장되지 않기 때문에 시험 문제에서는 보통 <code>sorted()</code>로 정렬해 리스트로 바꾼 뒤 출력합니다. sorted()의 결과는 항상 <b>list</b>라는 점도 기억하세요.<br>
빈 집합은 <code>set()</code>으로 만들어야 하며, <code>{}</code>는 빈 딕셔너리입니다. 원소 추가는 add()(1개), update()(여러 개), 삭제는 remove()(없으면 KeyError)와 discard()(없어도 오류 없음)를 구분합니다.
<table><tr><th>연산</th><th>연산자</th><th>메서드</th><th>{1,2,3,4,5}, {4,5,6,7}</th></tr>
<tr><td>합집합</td><td><code>|</code></td><td>union()</td><td>{1,2,3,4,5,6,7}</td></tr>
<tr><td>교집합</td><td><code>&amp;</code></td><td>intersection()</td><td>{4,5}</td></tr>
<tr><td>차집합</td><td><code>-</code></td><td>difference()</td><td>{1,2,3}</td></tr>
<tr><td>대칭 차집합</td><td><code>^</code></td><td>symmetric_difference()</td><td>{1,2,3,6,7}</td></tr></table>
대칭 차집합은 (a - b) | (b - a) 또는 (a | b) - (a &amp; b)와 같습니다. 리스트 컴프리헨션 <code>[식 for x in 반복 if 조건]</code>은 조건을 먼저 거른 뒤 식을 적용합니다.`,
   trap:"<code>^</code>를 거듭제곱(파이썬은 <code>**</code>)이나 교집합으로 착각하는 경우가 많습니다. 또 컴프리헨션의 if 조건은 2배 하기 <b>전</b> 원래 값 x에 적용됩니다.",
   tip:"| 합, &amp; 교, - 차, ^ 「한쪽에만」(XOR와 같은 의미).",
   kw:["set","대칭 차집합","sorted","리스트 컴프리헨션","discard/remove"]},

  {key:"IN 서브쿼리 + GROUP BY HAVING 집계",
   body:`이 문제는 <b>비연관 서브쿼리</b>가 먼저 실행되어 조건 집합(고객 목록)을 만들고, 그 결과를 메인 쿼리의 IN 조건으로 사용하는 구조입니다. SQL의 논리적 실행 순서는 <b>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</b>입니다.<br>
WHERE는 그룹화 <b>전</b> 개별 행을 거르고 집계 함수를 쓸 수 없으며, HAVING은 그룹화 <b>후</b> 그룹을 거르고 집계 함수를 사용할 수 있습니다. COUNT(*)는 NULL 포함 행 수, COUNT(컬럼)은 NULL을 제외한 개수입니다.
<table><tr><th>연산자</th><th>의미</th></tr>
<tr><td>IN</td><td>서브쿼리 결과 중 하나와 같으면 참</td></tr>
<tr><td>EXISTS</td><td>서브쿼리 결과 행이 하나라도 있으면 참</td></tr>
<tr><td>ANY / SOME</td><td>결과 중 하나라도 조건을 만족하면 참</td></tr>
<tr><td>ALL</td><td>결과 모두에 대해 조건을 만족하면 참</td></tr></table>
같은 결과를 조인으로도 작성할 수 있으며, 서브쿼리 안의 GROUP BY 결과 컬럼이 SELECT 대상과 일치해야 IN 비교가 가능합니다.`,
   trap:"서브쿼리 조건을 만족한 고객의 수량만 더해야 하는데, 주문 건수(COUNT)를 더하거나 박 고객까지 포함하는 실수가 잦습니다. HAVING의 '&gt;= 2'처럼 등호 포함 여부도 확인하세요.",
   tip:"실행 순서 암기: 프(FROM)-웨(WHERE)-그(GROUP)-해(HAVING)-셀(SELECT)-오(ORDER).",
   kw:["서브쿼리","IN/EXISTS","GROUP BY","HAVING","SQL 실행 순서","COUNT(*)"]},

  {key:"후보키와 슈퍼키(유일성·최소성)",
   body:`<b>유일성</b>은 키 값으로 모든 튜플을 서로 구별할 수 있는 성질, <b>최소성</b>은 키를 구성하는 속성 중 하나라도 빼면 유일성이 깨지는 성질(꼭 필요한 속성만으로 구성)입니다.<br>
예를 들어 [학생](학번, 주민번호, 이름)에서 학번, 주민번호는 각각 후보키이며, (학번, 이름)은 유일성은 있지만 이름이 없어도 식별되므로 최소성이 없는 슈퍼키입니다. 모든 후보키는 슈퍼키이지만 모든 슈퍼키가 후보키는 아닙니다.
<table><tr><th>키</th><th>유일성</th><th>최소성</th><th>특징</th></tr>
<tr><td>슈퍼키</td><td>O</td><td>X</td><td>식별 가능한 속성 집합 전체</td></tr>
<tr><td>후보키</td><td>O</td><td>O</td><td>기본키가 될 수 있는 후보</td></tr>
<tr><td>기본키</td><td>O</td><td>O</td><td>후보키 중 선택, NULL·중복 불가</td></tr>
<tr><td>대체키</td><td>O</td><td>O</td><td>기본키로 선택되지 않은 후보키</td></tr>
<tr><td>외래키</td><td>-</td><td>-</td><td>다른 릴레이션의 기본키 참조, NULL 허용</td></tr></table>
여러 속성으로 구성된 키는 복합키(Composite Key)라고 하며, 복합키도 최소성을 만족하면 후보키가 됩니다.`,
   trap:"후보키와 슈퍼키의 설명을 서로 바꿔 쓰는 실수가 가장 많습니다. '최소성 X'가 보이면 슈퍼키, '유일성+최소성'이면 후보키입니다.",
   tip:"슈퍼키는 「슈퍼(크게) 묶어도 되는 키」, 후보키는 「군더더기 없는 키」.",
   kw:["유일성","최소성","기본키","대체키","외래키","복합키"]},

  {key:"개체 무결성과 참조 무결성",
   body:`무결성(Integrity)은 데이터베이스에 저장된 데이터의 정확성과 일관성을 보장하는 성질입니다. <b>개체 무결성</b>은 기본키를 구성하는 <b>모든</b> 속성(복합키의 각 속성 포함)이 NULL이나 중복을 가질 수 없다는 규칙입니다.<br>
<b>참조 무결성</b>은 외래키가 참조하는 대상이 반드시 존재해야 한다는 규칙으로, 참조되는 행을 삭제·수정할 때의 처리 방식을 FOREIGN KEY 옵션으로 지정합니다.
<table><tr><th>참조 옵션</th><th>동작</th></tr>
<tr><td>CASCADE</td><td>참조되는 행 삭제/변경 시 참조하는 행도 함께 삭제/변경</td></tr>
<tr><td>SET NULL</td><td>참조하는 외래키 값을 NULL로 변경</td></tr>
<tr><td>SET DEFAULT</td><td>외래키 값을 기본값으로 변경</td></tr>
<tr><td>RESTRICT / NO ACTION</td><td>참조하는 행이 있으면 삭제/변경 거부</td></tr></table>
<b>도메인 무결성</b>은 속성 값이 정의된 도메인(타입, 범위, CHECK)에 속해야 한다는 규칙이고, <b>고유 무결성</b>은 UNIQUE로 지정된 속성 값이 중복되지 않아야 한다는 규칙입니다.`,
   trap:"외래키는 NULL을 가질 수 <b>있다</b>는 점을 놓치기 쉽습니다. NULL 불가는 기본키(개체 무결성) 쪽 규칙입니다.",
   tip:"개체 = 기본키(PK) 지킴이, 참조 = 외래키(FK) 지킴이, 도메인 = 값의 범위 지킴이.",
   kw:["개체 무결성","참조 무결성","도메인 무결성","CASCADE","SET NULL","제약조건"]},

  {key:"SYN Flooding과 DoS 공격 유형 구분",
   body:`TCP 연결은 <b>SYN → SYN+ACK → ACK</b>의 3-Way Handshake로 성립합니다. 서버는 SYN을 받으면 SYN+ACK를 보내고 연결 정보를 백로그 큐에 넣어 ACK를 기다리는 <b>Half-Open</b> 상태가 되는데, SYN Flooding은 이 대기 상태를 대량으로 만들어 큐를 고갈시키는 공격입니다.<br>
대응책인 <b>SYN Cookie</b>는 연결 정보를 큐에 저장하지 않고 시퀀스 번호에 암호화해 담아 두었다가 ACK가 오면 검증하는 방식입니다.
<table><tr><th>공격</th><th>핵심 원리</th></tr>
<tr><td>SYN Flooding</td><td>SYN만 대량 전송, Half-Open으로 백로그 큐 고갈</td></tr>
<tr><td>Smurf</td><td>출발지를 피해자로 위조한 ICMP Echo를 브로드캐스트로 전송</td></tr>
<tr><td>Ping of Death</td><td>최대 크기(65,535바이트)를 넘는 ICMP 패킷</td></tr>
<tr><td>Land Attack</td><td>출발지 IP = 목적지 IP로 위조</td></tr>
<tr><td>Teardrop</td><td>IP 조각(Fragment)의 Offset을 겹치게 조작</td></tr>
<tr><td>UDP Flooding</td><td>대량의 UDP 패킷으로 ICMP Unreachable 응답 유발</td></tr></table>
여러 좀비 PC(봇넷)를 동원하면 DDoS이며, 대표 도구로 Trinoo, TFN, Stacheldraht가 있습니다.`,
   trap:"Smurf(ICMP + 브로드캐스트)와 SYN Flooding(TCP + 백로그 큐)을 혼동하기 쉽습니다. 키워드 '3-Way Handshake', 'SYN', 'Backlog'가 나오면 SYN Flooding입니다.",
   tip:"TCP면 SYN, 브로드캐스트면 Smurf, 같은 IP면 Land, 조각이면 Teardrop, 큰 핑이면 Ping of Death.",
   kw:["3-Way Handshake","SYN Cookie","Smurf","Land Attack","Teardrop","DDoS"]},

  {key:"솔트(Salt)와 해시 기반 비밀번호 보호",
   body:`해시 함수는 임의 길이 입력을 고정 길이 값으로 바꾸는 <b>단방향</b> 함수로 복호화가 불가능합니다. 그러나 같은 입력은 항상 같은 해시를 내기 때문에, 공격자는 미리 계산한 '평문-해시' 대응표인 <b>레인보우 테이블</b>로 해시값을 역추적할 수 있습니다.<br>
<b>솔트</b>는 사용자마다 다른 무작위 값을 비밀번호에 붙여 해시하므로, 같은 비밀번호라도 저장된 해시가 달라지고 사전 계산 테이블이 무력화됩니다. 솔트는 비밀일 필요가 없어 보통 해시값과 함께 저장합니다.<br>
<b>키 스트레칭</b>은 해시를 수천~수만 번 반복해 무차별 대입 공격의 비용을 높이는 기법입니다.
<table><tr><th>알고리즘</th><th>특징</th></tr>
<tr><td>MD5</td><td>128비트, 충돌 취약점으로 사용 비권장</td></tr>
<tr><td>SHA-1 / SHA-256</td><td>160비트 / 256비트 출력, SHA-2 계열 권장</td></tr>
<tr><td>bcrypt</td><td>솔트 내장 + 반복 비용(cost) 조절 가능</td></tr>
<tr><td>PBKDF2, scrypt</td><td>키 스트레칭 기반, scrypt는 메모리 비용까지 증가</td></tr></table>`,
   trap:"솔트를 '암호화 키'로 착각하거나, 키 스트레칭과 답을 바꿔 쓰는 실수가 많습니다. '덧붙이는 무작위 문자열'은 솔트, '반복 해시'는 키 스트레칭입니다.",
   tip:"음식에 소금(Salt) 뿌리면 같은 재료라도 맛(해시)이 달라진다.",
   kw:["레인보우 테이블","키 스트레칭","단방향 해시","bcrypt","SHA-256"]},

  {key:"FLSM 서브네팅: 마스크와 호스트 수 계산",
   body:`FLSM은 모든 서브넷을 같은 크기로 나누는 방식입니다. 필요한 서브넷 수 N에 대해 <b>2^n ≥ N</b>을 만족하는 최소 n비트를 호스트 부분에서 빌려 네트워크 비트로 사용하고, 남은 호스트 비트 h로 <b>2^h - 2</b>개의 호스트를 할당합니다(네트워크 주소, 브로드캐스트 주소 제외).<br>
/27이면 블록 크기는 256 - 224 = 32이므로 서브넷은 .0, .32, .64, .96, .128, .160, .192, .224로 시작합니다. 예를 들어 세 번째 서브넷은 200.1.1.64/27, 사용 가능 호스트 .65~.94, 브로드캐스트 .95입니다.
<table><tr><th>프리픽스</th><th>마지막 옥텟 마스크</th><th>서브넷 수(/24 기준)</th><th>가용 호스트</th></tr>
<tr><td>/25</td><td>128</td><td>2</td><td>126</td></tr>
<tr><td>/26</td><td>192</td><td>4</td><td>62</td></tr>
<tr><td>/27</td><td>224</td><td>8</td><td>30</td></tr>
<tr><td>/28</td><td>240</td><td>16</td><td>14</td></tr>
<tr><td>/29</td><td>248</td><td>32</td><td>6</td></tr>
<tr><td>/30</td><td>252</td><td>64</td><td>2</td></tr></table>
반면 VLSM은 서브넷마다 필요한 호스트 수에 맞춰 마스크 길이를 다르게 하며, 큰 서브넷부터 할당합니다.`,
   trap:"호스트 수에서 2를 빼지 않아 32라고 쓰거나, 서브넷 6개라서 2^n이 정확히 6이 되는 값을 찾다가 실수합니다. 항상 6 이상인 최소 2의 거듭제곱(8)을 고르세요.",
   tip:"마스크 값 순서 128-192-224-240-248-252-254-255, 블록 크기 = 256 - 마스크.",
   kw:["FLSM","VLSM","CIDR","브로드캐스트 주소","서브넷 마스크","블록 크기"]},

  {key:"어댑터 패턴과 GoF 구조 패턴 비교",
   body:`어댑터 패턴은 기존 클래스(Adaptee)를 감싸는 어댑터를 두고, 클라이언트가 기대하는 인터페이스(Target)로 호출을 변환합니다. 상속으로 구현하는 <b>클래스 어댑터</b>와 합성(위임)으로 구현하는 <b>객체 어댑터</b>가 있습니다.<br>
GoF 패턴은 생성 5개, 구조 7개, 행위 11개로 분류됩니다. 구조 패턴은 클래스나 객체를 조합해 더 큰 구조를 만드는 패턴입니다.
<table><tr><th>구조 패턴</th><th>한 줄 구분</th></tr>
<tr><td>Adapter</td><td>호환되지 않는 인터페이스를 변환</td></tr>
<tr><td>Bridge</td><td>기능 계층과 구현 계층을 분리해 독립적으로 확장</td></tr>
<tr><td>Composite</td><td>부분-전체를 트리 구조로 동일하게 다룸</td></tr>
<tr><td>Decorator</td><td>객체에 기능을 동적으로 덧붙임</td></tr>
<tr><td>Facade</td><td>복잡한 서브시스템에 단순한 통합 창구 제공</td></tr>
<tr><td>Flyweight</td><td>공유를 통해 다수의 작은 객체 메모리 절약</td></tr>
<tr><td>Proxy</td><td>대리 객체로 접근 제어·지연 로딩</td></tr></table>
생성 패턴: 추상 팩토리, 빌더, 팩토리 메서드, 프로토타입, 싱글톤.`,
   trap:"Adapter(인터페이스 변환)와 Facade(인터페이스 단순화), Decorator(기능 추가), Proxy(접근 대리)를 혼동하기 쉽습니다. '호환되지 않는', '변환'이 핵심 단서입니다.",
   tip:"구조 7개 암기: 「어브컴데퍼플프」(어댑터-브리지-컴포지트-데코레이터-퍼사드-플라이웨이트-프록시).",
   kw:["GoF","구조 패턴","Facade","Decorator","Proxy","Bridge"]},

  {key:"테스트 오라클 4종류 구분",
   body:`<b>테스트 오라클</b>은 테스트 결과가 참인지 거짓인지 판단하기 위해 사전에 정의된 참값을 입력하여 비교하는 기법 및 활동입니다. 특징으로는 <b>제한된 검증</b>(모든 경우에 적용 불가), <b>수학적 기법</b>(값 도출에 수학 활용), <b>자동화 가능성</b>이 있습니다.
<table><tr><th>오라클</th><th>기대 결과 제공 범위</th><th>특징</th></tr>
<tr><td>참(True)</td><td>모든 입력 값</td><td>모든 오류 검출 가능, 미션 크리티컬 시스템</td></tr>
<tr><td>샘플링(Sampling)</td><td>특정 몇몇 입력 값</td><td>경계값·구간별 예상값, 일반적인 업무</td></tr>
<tr><td>추정(Heuristic)</td><td>특정 입력은 기대값, 나머지는 추정</td><td>샘플링 오라클 개선형</td></tr>
<tr><td>일관성 검사(Consistent)</td><td>변경 전후 결과 비교</td><td>애플리케이션 변경 시 동일성 확인</td></tr></table>
함께 출제되는 개념으로 테스트 케이스(입력값, 실행 조건, 기대 결과의 집합), 테스트 시나리오(테스트 케이스의 동작 순서 기술), 테스트 하네스 도구(드라이버, 스텁, 슈트, 스크립트, 목 오브젝트)가 있습니다.`,
   trap:"샘플링과 추정(휴리스틱) 오라클을 헷갈리기 쉽습니다. '나머지는 추정'이라는 말이 있으면 추정 오라클, '특정 몇몇만'이면 샘플링 오라클입니다.",
   tip:"참-샘-추-일: 전부 / 일부 / 일부+추정 / 전후 비교.",
   kw:["참 오라클","샘플링 오라클","추정 오라클","일관성 검사 오라클","테스트 케이스","테스트 하네스"]},

  {key:"교착상태 4조건과 예방·회피·발견·회복",
   body:`교착상태는 둘 이상의 프로세스가 서로가 가진 자원을 기다리며 무한히 대기하는 상태입니다. 4가지 조건이 <b>동시에 모두</b> 성립해야 발생하므로, 하나만 깨뜨려도 교착상태를 막을 수 있습니다(예방).
<table><tr><th>조건</th><th>예방 방법(조건 부정)</th></tr>
<tr><td>상호 배제</td><td>자원 공유 허용(현실적으로 어려움)</td></tr>
<tr><td>점유와 대기</td><td>필요한 자원을 한꺼번에 요청·할당</td></tr>
<tr><td>비선점</td><td>자원을 가진 프로세스가 대기하면 자원 반납/선점 허용</td></tr>
<tr><td>환형 대기</td><td>자원에 순서 번호를 부여해 오름차순으로만 요청</td></tr></table>
<b>회피</b>는 자원 할당 전에 시스템이 <b>안전 상태</b>를 유지하는지 검사하는 방식으로, 대표 기법이 다익스트라의 <b>은행원 알고리즘</b>입니다. <b>발견</b>은 자원 할당 그래프나 탐지 알고리즘으로 교착 여부를 검사하고, <b>회복</b>은 교착 프로세스를 종료하거나 자원을 선점해 해결합니다.`,
   trap:"'비선점'을 '선점'으로 잘못 쓰거나, 은행원 알고리즘을 예방 기법이라고 답하는 실수가 잦습니다. 은행원 알고리즘은 <b>회피</b> 기법입니다.",
   tip:"「상점비환」(상호배제-점유대기-비선점-환형대기), 해결은 「예회발회」.",
   kw:["상호 배제","점유와 대기","비선점","환형 대기","은행원 알고리즘","안전 상태"]},

  {key:"비트 연산자와 시프트 연산",
   body:`비트 연산은 정수를 2진수로 바꾼 뒤 자리별로 계산합니다. 4비트 이상 값은 8-4-2-1 가중치로 빠르게 변환하세요(13 = 8+4+1 = 1101).<br>
<b>왼쪽 시프트 a &lt;&lt; n</b>은 a × 2^n, <b>오른쪽 시프트 a &gt;&gt; n</b>은 양수일 때 a ÷ 2^n의 몫(소수점 버림)과 같습니다. <b>~a</b>는 2의 보수 체계에서 <b>-(a+1)</b>이므로 ~13 = -14입니다.
<table><tr><th>연산자</th><th>규칙</th><th>13, 6 결과</th></tr>
<tr><td>&amp; (AND)</td><td>둘 다 1이면 1</td><td>4</td></tr>
<tr><td>| (OR)</td><td>하나라도 1이면 1</td><td>15</td></tr>
<tr><td>^ (XOR)</td><td>서로 다르면 1</td><td>11</td></tr>
<tr><td>~ (NOT)</td><td>비트 반전</td><td>~13 = -14</td></tr></table>
연산자 우선순위는 산술(+ -) &gt; 시프트(&lt;&lt; &gt;&gt;) &gt; 관계 &gt; &amp; &gt; ^ &gt; | 순입니다. 그래서 괄호가 없으면 결과가 달라집니다.
<pre>int x = 1 &lt;&lt; 2 + 1;   // 1 &lt;&lt; 3 = 8
int y = 5 &amp; 3 == 3;   // 5 &amp; (3 == 3) = 5 &amp; 1 = 1</pre>`,
   trap:"괄호 없는 식에서 +가 &lt;&lt;보다 먼저, ==가 &amp;보다 먼저 계산되는 우선순위 함정이 단골입니다. 또 XOR과 OR을 혼동하지 마세요.",
   tip:"&lt;&lt;는 곱하기 2, &gt;&gt;는 나누기 2, ~a는 마이너스(a+1).",
   kw:["AND/OR/XOR","시프트 연산","2의 보수","연산자 우선순위","비트 마스크"]},

  {key:"String 풀, ==와 equals(), StringBuilder",
   body:`문자열 리터럴은 힙의 <b>String Constant Pool</b>에 한 번만 저장되고 같은 리터럴은 같은 객체를 공유합니다. <code>new String()</code>은 풀과 상관없이 힙에 새 객체를 만듭니다. <code>==</code>는 <b>참조(주소)</b> 비교, <code>equals()</code>는 <b>내용</b> 비교입니다.<br>
<code>intern()</code>을 호출하면 풀에 있는 객체 참조를 반환하므로 <code>a == c.intern()</code>은 true입니다. 또 컴파일 시점 상수 결합인 <code>"Ja" + "va"</code>는 풀의 "Java"와 같은 객체가 되어 ==가 true지만, 변수를 이용한 결합은 실행 시 새 객체가 생성되어 false입니다.
<table><tr><th>클래스</th><th>가변성</th><th>스레드 안전</th></tr>
<tr><td>String</td><td>불변(immutable)</td><td>안전</td></tr>
<tr><td>StringBuilder</td><td>가변</td><td>미보장(빠름)</td></tr>
<tr><td>StringBuffer</td><td>가변</td><td>동기화로 안전</td></tr></table>
StringBuilder의 reverse(), append(), insert(), delete()는 자기 자신을 변경하고 자신을 반환하므로 메서드 체이닝이 가능합니다. 반대로 String의 concat(), toUpperCase(), replace()는 새 문자열을 반환할 뿐 원본은 그대로입니다.`,
   trap:"<code>s.toUpperCase();</code>처럼 반환값을 받지 않으면 String 원본은 바뀌지 않는다는 함정과, new String과의 == 비교를 true로 착각하는 실수가 많습니다.",
   tip:"==는 「같은 집?」, equals는 「같은 내용?」, 리터럴은 공유, new는 새집.",
   kw:["String Constant Pool","equals","intern","StringBuilder","StringBuffer","불변 객체"]},

  {key:"재귀 문자열 뒤집기와 파이썬 슬라이싱",
   body:`재귀 함수는 <b>종료 조건(base case)</b>과 문제를 더 작게 만드는 <b>재귀 호출</b>로 구성됩니다. <code>f(s[1:]) + s[0]</code>은 첫 글자를 맨 뒤로 보내는 작업을 반복하므로 전체 문자열이 뒤집힙니다. 반대로 <code>s[0] + f(s[1:])</code>이면 원래 문자열이 그대로 나옵니다.<br>
슬라이싱 <code>s[start:end:step]</code>은 start 이상 <b>end 미만</b>을 취하며, 음수 인덱스는 뒤에서부터(-1이 마지막) 셉니다.
<table><tr><th>표현식 (s = "ABCDE")</th><th>결과</th></tr>
<tr><td>s[1:4]</td><td>BCD</td></tr>
<tr><td>s[-3:]</td><td>CDE</td></tr>
<tr><td>s[:-1]</td><td>ABCD</td></tr>
<tr><td>s[::2]</td><td>ACE</td></tr>
<tr><td>s[::-1]</td><td>EDCBA</td></tr>
<tr><td>s[4:1:-1]</td><td>EDC</td></tr></table>
슬라이싱은 범위를 벗어나도 오류가 나지 않고 가능한 부분만 반환하지만, 단일 인덱스 접근(s[10])은 IndexError가 발생합니다.`,
   trap:"슬라이스 끝 인덱스를 포함시켜 'DCBA'로 쓰거나, 뒤집기 전 원본 'ABCDE'에 슬라이싱을 적용하는 실수가 많습니다. 먼저 함수 결과를 완성한 뒤 슬라이싱하세요.",
   tip:"슬라이스는 「앞은 포함, 뒤는 미포함」, [::-1]은 뒤집기.",
   kw:["재귀 함수","종료 조건","슬라이싱","음수 인덱스","step"]},

  {key:"ARP·RARP·ICMP·IGMP 프로토콜 구분",
   body:`같은 네트워크 내에서 실제 프레임을 전달하려면 MAC 주소가 필요하므로, 호스트는 <b>ARP 요청을 브로드캐스트</b>로 보내고 해당 IP를 가진 호스트가 <b>유니캐스트로 응답</b>합니다. 결과는 ARP 캐시 테이블에 저장되며, 이를 위조하는 공격이 <b>ARP 스푸핑</b>입니다.<br>
ICMP는 IP의 비신뢰성을 보완하기 위해 오류 보고와 진단 메시지를 전달합니다. traceroute는 TTL을 1부터 늘려가며 Time Exceeded 메시지를 받아 경로를 추적합니다.
<table><tr><th>프로토콜</th><th>역할</th></tr>
<tr><td>ARP</td><td>IP 주소 → MAC 주소</td></tr>
<tr><td>RARP</td><td>MAC 주소 → IP 주소</td></tr>
<tr><td>ICMP</td><td>오류·제어 메시지 (ping, traceroute)</td></tr>
<tr><td>IGMP</td><td>멀티캐스트 그룹 가입·탈퇴 관리</td></tr></table>
대표 ICMP 메시지: Echo Request(Type 8), Echo Reply(Type 0), Destination Unreachable(Type 3), Time Exceeded(Type 11).`,
   trap:"ARP와 RARP의 변환 방향을 반대로 쓰는 실수가 가장 흔합니다. 또 ICMP를 전송 계층 프로토콜로 오해하지 마세요(네트워크 계층).",
   tip:"ARP는 「IP 알면 MAC 찾기」, R(Reverse)이 붙으면 반대, ICMP는 「핑」.",
   kw:["ARP","RARP","ICMP","IGMP","ARP 스푸핑","TTL"]},

  {key:"스크럼의 스프린트와 구성 요소",
   body:`스크럼은 짧은 반복 주기(스프린트)마다 동작하는 제품 증분을 만들어 내는 애자일 프레임워크입니다. 스프린트 기간 중에는 목표가 변경되지 않도록 보호하며, 남은 작업량을 <b>번다운 차트</b>로 시각화합니다. 한 스프린트에서 처리한 작업량을 <b>속도(Velocity)</b>라 하며 다음 계획의 근거가 됩니다.
<table><tr><th>구분</th><th>요소</th><th>설명</th></tr>
<tr><td>역할</td><td>제품 책임자(PO)</td><td>제품 백로그 작성·우선순위 결정</td></tr>
<tr><td>역할</td><td>스크럼 마스터(SM)</td><td>프로세스 가이드, 장애 요소 제거</td></tr>
<tr><td>역할</td><td>개발팀</td><td>자기 조직화된 팀, 실제 개발</td></tr>
<tr><td>산출물</td><td>제품/스프린트 백로그</td><td>전체 요구사항 / 이번 스프린트 작업 목록</td></tr>
<tr><td>이벤트</td><td>계획 회의, 일일 스크럼, 검토, 회고</td><td>검토는 결과물 시연, 회고는 프로세스 개선</td></tr></table>
같은 애자일 계열인 <b>XP</b>는 5가지 가치(용기, 단순성, 의사소통, 피드백, 존중)와 짝 프로그래밍, 테스트 주도 개발, 지속적 통합 등의 실천 방법을 가지며, <b>칸반</b>은 작업 흐름을 보드로 시각화하고 진행 중 작업(WIP)을 제한합니다.`,
   trap:"스프린트 검토(Review, 결과물 확인)와 회고(Retrospective, 일하는 방식 개선)를 구분하지 못하거나, 일일 스크럼을 스크럼 마스터가 주도한다고 착각하기 쉽습니다.",
   tip:"PO는 「무엇을」, SM은 「잘 굴러가게」, 개발팀은 「만든다」 / 스프린트 = 2~4주 달리기.",
   kw:["스프린트","제품 백로그","번다운 차트","스크럼 마스터","XP","칸반"]},

  {key:"while문에서 continue와 break의 흐름",
   body:`<b>continue</b>는 반복문의 나머지 문장을 건너뛰고 다음 반복으로 넘어가며, <b>break</b>는 가장 가까운 반복문(또는 switch)을 즉시 탈출합니다. while/do-while에서 continue는 <b>조건식</b>으로, for에서는 <b>증감식</b>으로 이동합니다.<br>
이 차이 때문에 while문에서 증가문이 continue <b>뒤</b>에 있으면 무한 루프가 생길 수 있습니다. 반면 이 문제처럼 i++가 맨 앞에 있으면 안전합니다.
<pre>int i = 0;
while (i &lt; 5) {
    if (i == 2) continue;  // i가 2에서 멈춤 → 무한 루프
    i++;
}</pre>
<table><tr><th>제어문</th><th>동작</th></tr>
<tr><td>break</td><td>현재 반복문 탈출 (중첩 시 안쪽 하나만)</td></tr>
<tr><td>continue</td><td>이번 반복의 남은 부분 생략</td></tr>
<tr><td>return</td><td>함수 자체를 종료</td></tr>
<tr><td>goto</td><td>지정한 레이블로 이동</td></tr></table>
break로 탈출하면 마지막 i 값이 출력에 그대로 남는다는 점도 추적 시 꼭 확인하세요.`,
   trap:"break 조건에 걸린 값(7)을 cnt에 더하거나, 탈출 시점의 i 값을 20으로 착각하는 실수가 많습니다. break 아래 문장은 실행되지 않습니다.",
   tip:"continue = 「이번 판 패스」, break = 「게임 종료」. 반복마다 i와 누적 변수를 표로 적자.",
   kw:["continue","break","무한 루프","do-while","중첩 반복문"]},

  {key:"SSO와 통합 인증·권한 위임 기술",
   body:`SSO는 인증 서버가 한 번 인증한 사용자에게 토큰이나 티켓을 발급하고, 각 서비스가 이를 신뢰해 별도 로그인 없이 접근을 허용하는 구조입니다. 편리하지만 인증 서버가 <b>단일 장애점</b>이 되고, 계정 하나가 탈취되면 연결된 모든 서비스가 위험해진다는 단점이 있습니다.
<table><tr><th>기술</th><th>특징</th></tr>
<tr><td>Kerberos</td><td>KDC(AS + TGS)가 티켓을 발급하는 대칭키 기반 인증</td></tr>
<tr><td>SAML</td><td>XML 기반으로 인증·권한 정보를 교환, 웹 SSO에 활용</td></tr>
<tr><td>OAuth</td><td>비밀번호 대신 액세스 토큰으로 권한을 위임(인가)</td></tr>
<tr><td>OpenID Connect</td><td>OAuth 2.0 위에 인증(신원 확인) 계층 추가</td></tr>
<tr><td>MFA</td><td>지식·소유·생체 등 서로 다른 인증 요소 2가지 이상 조합</td></tr></table>
접근 통제의 기본 틀인 <b>AAA</b>는 인증(Authentication), 인가(Authorization), 계정 관리(Accounting)로 구성되며, 이를 제공하는 프로토콜로 RADIUS, TACACS+가 있습니다.`,
   trap:"OAuth는 '인증'이 아니라 '권한 위임(인가)' 표준이라는 점, 그리고 SSO와 MFA(인증 요소 개수)를 혼동하는 실수가 많습니다.",
   tip:"SSO = 「한 번 로그인, 여러 곳 통과」, OAuth = 「열쇠 대신 출입증 빌려주기」.",
   kw:["SSO","Kerberos","SAML","OAuth","MFA","AAA"]},

  {key:"DDL: CREATE INDEX와 ALTER TABLE ADD",
   body:`DDL(데이터 정의어)은 스키마와 객체 구조를 정의하며 CREATE, ALTER, DROP, TRUNCATE가 있습니다. 인덱스는 검색 속도를 높이기 위한 구조로, <code>UNIQUE</code>를 붙이면 중복 값을 허용하지 않는 인덱스가 됩니다. 인덱스 삭제는 <code>DROP INDEX 인덱스명;</code>입니다.
<pre>CREATE UNIQUE INDEX idx_id ON 학생(학번 ASC);
ALTER TABLE 학생 ADD 전화번호 VARCHAR(20);
ALTER TABLE 학생 DROP COLUMN 전화번호 CASCADE;
DROP TABLE 학생 RESTRICT;</pre>
<b>CASCADE</b>는 참조하는 객체까지 연쇄 삭제, <b>RESTRICT</b>는 참조 중이면 삭제를 거부합니다.
<table><tr><th>명령</th><th>분류</th><th>특징</th></tr>
<tr><td>DELETE</td><td>DML</td><td>행 단위 삭제, WHERE 가능, ROLLBACK 가능</td></tr>
<tr><td>TRUNCATE</td><td>DDL</td><td>모든 행 삭제, 테이블 구조 유지, 롤백 불가</td></tr>
<tr><td>DROP</td><td>DDL</td><td>테이블 구조까지 완전히 제거</td></tr></table>
그 밖에 DML은 SELECT/INSERT/UPDATE/DELETE, DCL은 GRANT/REVOKE, TCL은 COMMIT/ROLLBACK/SAVEPOINT입니다.`,
   trap:"속성 추가에 <code>ADD COLUMN</code>만 정답이라 생각하거나 <code>INSERT</code>를 쓰는 실수가 많습니다. INSERT는 행(데이터) 추가 DML이고, 열 추가는 ALTER TABLE ... ADD입니다.",
   tip:"구조 바꾸기는 ALTER(ADD/ALTER/DROP), 데이터 넣기는 INSERT.",
   kw:["DDL","CREATE INDEX","ALTER TABLE","CASCADE/RESTRICT","TRUNCATE","DROP"]}
]);
