NOTES.push([
  {key:"포인터 역방향 이동과 포인터 간 뺄셈",
   body:`포인터에 정수를 더하거나 빼면 <b>원소 단위</b>로 이동하므로 <code>p -= 2</code>는 int 기준 8바이트 앞으로 이동합니다. 같은 배열을 가리키는 두 포인터는 <code>&lt;</code>, <code>&gt;</code>로 비교할 수 있고, 배열 앞쪽 원소일수록 주소가 작습니다.<br>
두 포인터의 차 <code>p - q</code>는 (주소 차 ÷ sizeof(원소))로 계산된 <b>원소 개수</b>이며 결과형은 <code>ptrdiff_t</code>입니다. 앞 포인터에서 뒤 포인터를 빼면 <b>음수</b>가 나올 수 있습니다.<br>
포인터 + 포인터는 허용되지 않으며(컴파일 오류), 포인터 - 정수, 포인터 - 포인터만 가능합니다.
<table><tr><th>연산</th><th>허용</th><th>결과</th></tr>
<tr><td>p + 정수, p - 정수</td><td>O</td><td>포인터 (원소 단위 이동)</td></tr>
<tr><td>p - q</td><td>O</td><td>정수 (원소 개수 차)</td></tr>
<tr><td>p + q</td><td>X</td><td>컴파일 오류</td></tr>
<tr><td>p &gt; q</td><td>O</td><td>주소 비교 (같은 배열 내)</td></tr></table>
투 포인터(양 끝에서 좁혀 오기) 패턴은 문자열 뒤집기, 회문 검사 문제에 자주 쓰이므로 매 반복마다 두 포인터의 위치를 표로 기록하며 추적하는 습관이 중요합니다.`,
   trap:"p - q를 바이트 차(-4)로 답하거나 부호를 무시해 1로 답하는 실수가 흔합니다. 또한 루프 종료 후 포인터가 마지막으로 이동한 위치(*p)를 묻는 경우가 많습니다.",
   tip:"포인터 빼기 = '몇 칸 떨어졌나', 뒤에서 앞을 빼면 마이너스.",
   kw:["포인터 산술","ptrdiff_t","포인터 비교","투 포인터"]},

  {key:"객체 생성 순서와 생성자 내 오버라이딩 메서드 호출",
   body:`Java에서 <code>new 자식()</code>을 하면 먼저 메모리가 확보되고 모든 필드가 <b>기본값(0, null, false)</b>으로 채워집니다. 이후 자식 생성자 첫 줄의 <code>super()</code>가 실행되어 <b>부모 필드 초기화 → 부모 생성자 본문</b>이 끝난 뒤에야 <b>자식 필드 초기화 → 자식 생성자 본문</b>이 실행됩니다.<br>
부모 생성자에서 오버라이딩된 메서드를 호출하면 동적 바인딩으로 자식 메서드가 실행되지만, 자식 필드는 아직 초기화 전이라 기본값이 보입니다.
<pre>1) 모든 필드 기본값 (n=0, r=0)
2) 부모 필드 초기화 (n=1)
3) 부모 생성자 본문 → draw() → 자식 draw (r=0)
4) 자식 필드 초기화 (r=5)
5) 자식 생성자 본문 (r=3)</pre>
추상 클래스(abstract class)는 직접 <code>new</code>로 생성할 수 없지만 <b>생성자는 가질 수 있으며</b>, 자식 객체 생성 시 반드시 호출됩니다. 추상 메서드는 몸체가 없고, 이를 하나라도 가진 클래스는 abstract로 선언해야 하며 자식은 모든 추상 메서드를 구현해야 합니다. 인스턴스 초기화 블록 <code>{ }</code>은 필드 초기화와 함께 선언 순서대로 실행되고, static 블록은 클래스 로딩 시 단 한 번 실행됩니다.`,
   trap:"생성자 안의 draw()가 부모 것이 실행된다고 생각하거나(추상 메서드라 불가), 자식 필드 r이 이미 5라고 생각해 D5로 답하는 실수가 많습니다.",
   tip:"부모가 먼저 다 끝나야 자식 필드가 깨어난다 — 부모 생성자 속 자식 필드는 0.",
   kw:["추상 클래스","생성자 호출 순서","필드 초기화","동적 바인딩","기본값"]},

  {key:"중첩 리스트 컴프리헨션과 2차원 리스트 얕은 복사",
   body:`<code>[식 for a in A for b in B]</code>처럼 for가 여러 개인 컴프리헨션은 <b>왼쪽 for가 바깥 루프</b>입니다. 즉 일반 중첩 for문을 위에서 아래로 쓴 순서 그대로 한 줄에 나열한 것입니다.<br>
반면 <code>[[식 for j in B] for i in A]</code>처럼 컴프리헨션 안에 컴프리헨션이 있으면 <b>2차원 리스트</b>가 만들어지며, 안쪽이 한 행을 만듭니다.
<table><tr><th>표현</th><th>결과 형태</th></tr>
<tr><td><code>[x for r in m for x in r]</code></td><td>1차원으로 평탄화</td></tr>
<tr><td><code>[[x*2 for x in r] for r in m]</code></td><td>2차원 유지</td></tr>
<tr><td><code>[[0]*3 for _ in range(3)]</code></td><td>독립된 행 3개 (안전)</td></tr>
<tr><td><code>[[0]*3]*3</code></td><td>같은 행 객체 3번 참조 (위험)</td></tr></table>
<code>*</code> 연산은 리스트 원소의 <b>참조만 복사</b>하므로 내부 리스트가 공유됩니다. 깊은 복사가 필요하면 <code>copy.deepcopy()</code>를 사용합니다. 열 단위 처리는 <code>zip(*m)</code>이나 인덱스 k를 바깥에 두는 컴프리헨션으로 할 수 있습니다.`,
   trap:"[[0]*3]*3에서 g[0][0]만 바뀐다고 생각해 g[2][0]을 0으로 답하는 실수가 대표적입니다. 중첩 for의 순서를 거꾸로 해석하는 것도 흔한 함정입니다.",
   tip:"for는 왼쪽이 바깥, 곱하기(*)로 만든 2차원 리스트는 '복사가 아니라 거울'.",
   kw:["리스트 컴프리헨션","중첩 for","얕은 복사","참조 공유","2차원 리스트"]},

  {key:"COUNT(*)/COUNT(컬럼)/COUNT(DISTINCT)와 NULL",
   body:`집계 함수 중 <code>COUNT(*)</code>만 NULL을 포함한 <b>전체 행 수</b>를 셉니다. <code>COUNT(컬럼)</code>, <code>SUM</code>, <code>AVG</code>, <code>MAX</code>, <code>MIN</code>은 모두 <b>NULL을 제외</b>하고 계산합니다.<br>
특히 AVG는 NULL을 제외한 값의 합을 <b>NULL이 아닌 행 수</b>로 나누므로, NULL을 0으로 보고 계산한 값과 다릅니다. NULL을 0으로 취급하려면 <code>AVG(COALESCE(보너스, 0))</code>처럼 변환해야 합니다.
<table><tr><th>식 (예제 테이블)</th><th>NULL 처리</th><th>결과</th></tr>
<tr><td>COUNT(*)</td><td>포함</td><td>7</td></tr>
<tr><td>COUNT(부서)</td><td>제외</td><td>5</td></tr>
<tr><td>COUNT(DISTINCT 부서)</td><td>제외 후 중복 제거</td><td>3</td></tr>
<tr><td>SUM(보너스)</td><td>제외</td><td>900</td></tr>
<tr><td>AVG(보너스)</td><td>제외</td><td>900 / 5 = 180</td></tr>
<tr><td>AVG(COALESCE(보너스,0))</td><td>0으로 변환</td><td>900 / 7 ≈ 128.57</td></tr></table>
모든 값이 NULL인 그룹에서 COUNT(컬럼)은 0이지만 SUM·AVG는 NULL을 반환합니다. GROUP BY에서는 NULL끼리 <b>하나의 그룹</b>으로 묶입니다.`,
   trap:"AVG를 전체 행 수(7)로 나누거나, COUNT(DISTINCT 부서)에 NULL을 하나의 값으로 세어 4로 답하는 실수가 많습니다.",
   tip:"별(*)만 NULL을 센다, 나머지 집계는 NULL을 투명인간 취급.",
   kw:["COUNT(*)","COUNT DISTINCT","NULL","AVG","COALESCE"]},

  {key:"완전·부분·이행 함수적 종속",
   body:`<b>함수적 종속(X → Y)</b>은 X 값이 정해지면 Y 값이 오직 하나로 결정되는 관계이며, X를 결정자, Y를 종속자라 합니다.<br>
복합키를 가진 릴레이션에서 종속자가 키 <b>전체</b>에 종속되면 완전 함수적 종속, 키의 <b>일부</b>만으로 결정되면 부분 함수적 종속입니다. X → Y, Y → Z가 성립해 X → Z가 유도되는 경우가 이행적 함수적 종속입니다.
<table><tr><th>종류</th><th>예</th><th>제거하는 정규형</th></tr>
<tr><td>완전 함수적 종속</td><td>(학번, 과목코드) → 성적</td><td>바람직한 형태</td></tr>
<tr><td>부분 함수적 종속</td><td>(학번, 과목코드) → 학생이름</td><td>2NF</td></tr>
<tr><td>이행적 함수적 종속</td><td>학번 → 학과 → 학과장</td><td>3NF</td></tr>
<tr><td>다치 종속</td><td>A →→ B</td><td>4NF</td></tr></table>
기본키가 단일 속성이면 부분 함수적 종속은 존재할 수 없으므로 1NF이면 자동으로 2NF입니다. 암스트롱 공리에는 반사·증가·이행 규칙이 있고, 이로부터 합집합·분해·의사이행 규칙이 유도됩니다.`,
   trap:"학번 → 학과장을 '부분 종속'으로 착각하기 쉽습니다. 결정자가 학번 하나라도 중간 속성(학과)을 거쳐 결정되면 이행 종속입니다.",
   tip:"전부=완전, 일부=부분, 거쳐서=이행 / 부분은 2NF, 이행은 3NF에서 제거.",
   kw:["함수적 종속","완전 함수적 종속","부분 함수적 종속","이행적 함수적 종속","결정자"]},

  {key:"XSS의 3가지 유형과 대응",
   body:`<b>XSS(Cross Site Scripting)</b>는 검증되지 않은 입력값이 웹 페이지에 그대로 출력될 때, 공격자가 삽입한 스크립트가 <b>다른 사용자의 브라우저</b>에서 실행되는 취약점입니다. 주로 세션 쿠키 탈취, 피싱 페이지 이동, 키 입력 가로채기에 악용됩니다.
<table><tr><th>유형</th><th>스크립트 위치</th><th>특징</th></tr>
<tr><td>저장형(Stored)</td><td>서버 DB(게시판 등)</td><td>열람자 모두 피해, 파급력 큼</td></tr>
<tr><td>반사형(Reflected)</td><td>URL 파라미터</td><td>악성 링크 클릭 시 응답에 반사</td></tr>
<tr><td>DOM 기반</td><td>클라이언트 JavaScript</td><td>서버 응답과 무관하게 DOM 조작 중 발생</td></tr></table>
대응은 입력값 검증(화이트리스트), 출력 시 HTML 엔티티 인코딩, 쿠키에 <b>HttpOnly</b> 속성 지정(스크립트로 쿠키 접근 차단), <b>CSP(Content Security Policy)</b> 적용입니다. 같은 입력값 검증 부족 계열로 SQL 삽입(SQL Injection), 운영체제 명령어 삽입이 있으며, 이들은 시큐어 코딩 가이드의 '입력 데이터 검증 및 표현' 항목에 속합니다.`,
   trap:"XSS와 CSRF를 혼동하기 쉽습니다. XSS는 스크립트가 사용자 브라우저에서 실행되는 것, CSRF는 사용자 권한으로 서버에 위조 요청을 보내는 것입니다.",
   tip:"XSS = 스크립트가 '피해자 브라우저'에서 춤춘다, 저장·반사·DOM.",
   kw:["XSS","저장형 XSS","반사형 XSS","DOM XSS","HttpOnly","CSP"]},

  {key:"RIP: 거리 벡터, 최대 15홉",
   body:`<b>RIP(Routing Information Protocol)</b>는 거리 벡터(Distance Vector) 방식의 IGP로, <b>벨만-포드 알고리즘</b>을 사용하며 메트릭은 홉 수 하나뿐입니다. 최대 15홉까지 허용하고 16홉은 무한대(도달 불가)로 처리하므로 대규모 망에는 부적합합니다.<br>
30초마다 전체 라우팅 테이블을 이웃에 브로드캐스트(RIPv2는 멀티캐스트 224.0.0.9)하며, UDP 520번 포트를 사용합니다. RIPv1은 클래스풀(서브넷 마스크 미전송), RIPv2는 클래스리스(VLSM 지원)·인증을 지원합니다.
<table><tr><th>구분</th><th>RIP</th><th>OSPF</th><th>BGP</th></tr>
<tr><td>방식</td><td>거리 벡터</td><td>링크 상태</td><td>경로 벡터</td></tr>
<tr><td>알고리즘</td><td>벨만-포드</td><td>다익스트라(SPF)</td><td>정책 기반</td></tr>
<tr><td>범위</td><td>IGP, 소규모</td><td>IGP, 대규모</td><td>EGP(AS 간)</td></tr>
<tr><td>갱신</td><td>30초 주기 전체</td><td>변화 시 LSA</td><td>변화 시 증분</td></tr></table>
거리 벡터의 <b>무한 카운팅(Count to Infinity)</b> 문제는 스플릿 호라이즌(받은 방향으로 재광고 금지), 포이즌 리버스(받은 방향에 무한대로 광고), 홀드다운 타이머, 트리거 업데이트로 완화합니다.`,
   trap:"최대 홉 수를 16으로 답하는 실수가 가장 흔합니다. 16은 '도달 불가'를 의미하며 사용 가능한 최대는 15입니다.",
   tip:"RIP은 '벨만'이 15층까지만 올라가는 엘리베이터, OSPF는 '다익스트라' 지도.",
   kw:["RIP","거리 벡터","벨만-포드","15홉","스플릿 호라이즌"]},

  {key:"응집도 강도 순서 (기-순-교-절-시-논-우)",
   body:`<b>응집도(Cohesion)</b>는 모듈 내부 구성 요소들이 서로 관련된 정도로, 높을수록(강할수록) 좋은 설계입니다. 결합도(Coupling)는 모듈 간 의존 정도로 낮을수록 좋습니다.
<table><tr><th>순위(강→약)</th><th>응집도</th><th>설명</th></tr>
<tr><td>1</td><td>기능적</td><td>모든 요소가 단일 기능 수행</td></tr>
<tr><td>2</td><td>순차적</td><td>한 요소의 출력이 다음 요소의 입력</td></tr>
<tr><td>3</td><td>교환적(통신적)</td><td>같은 입력/출력 데이터를 사용</td></tr>
<tr><td>4</td><td>절차적</td><td>정해진 순서로 수행되는 서로 다른 기능</td></tr>
<tr><td>5</td><td>시간적</td><td>같은 시점에 수행(초기화, 종료 처리)</td></tr>
<tr><td>6</td><td>논리적</td><td>유사한 성격의 처리를 하나로 묶음</td></tr>
<tr><td>7</td><td>우연적</td><td>서로 관련 없는 요소의 모음</td></tr></table>
결합도 순서(약→강)는 데이터 → 스탬프 → 제어 → 외부 → 공통 → 내용입니다. 시험에서는 '강한 순'과 '약한 순'을 바꿔 묻거나, 설명을 주고 응집도 이름을 쓰게 하는 형태가 모두 출제됩니다. 순차적과 교환적의 차이는 '출력이 입력으로 이어지는가(순차)' 대 '같은 데이터를 공유할 뿐인가(교환)'입니다.`,
   trap:"문제가 '강한 것부터'인지 '약한 것부터'인지 반드시 확인하세요. 시간적과 논리적, 순차적과 교환적의 순서를 뒤바꾸는 실수가 많습니다.",
   tip:"응집도 강→약 '기순교절시논우', 결합도 약→강 '데스제외공내'.",
   kw:["응집도","기능적 응집도","우연적 응집도","결합도","모듈화"]},

  {key:"strcpy/strcat과 strlen vs sizeof",
   body:`<code>strcpy(dst, src)</code>는 src를 널 문자까지 dst에 <b>덮어쓰기</b> 복사하고, <code>strcat(dst, src)</code>는 dst의 널 문자 위치부터 src를 <b>이어 붙입니다</b>. 두 함수 모두 dst의 크기를 검사하지 않아 <b>버퍼 오버플로</b> 위험이 있으므로 <code>strncpy</code>, <code>strncat</code>, <code>snprintf</code> 사용이 권장됩니다.
<table><tr><th>식</th><th>의미</th><th>예: char a[20]="KOR"</th></tr>
<tr><td>strlen(a)</td><td>널 문자 앞까지 글자 수 (실행 시간)</td><td>3</td></tr>
<tr><td>sizeof(a)</td><td>배열 전체 바이트 (컴파일 시간)</td><td>20</td></tr>
<tr><td>sizeof("KOR")</td><td>문자열 리터럴 + 널 문자</td><td>4</td></tr>
<tr><td>sizeof(char *p)</td><td>포인터 크기</td><td>4 또는 8</td></tr></table>
<code>char b[] = "EA"</code>처럼 크기를 생략하면 널 문자를 포함한 3바이트 배열이 됩니다. 배열이 함수 매개변수로 전달되면 포인터로 변환되어 함수 안의 sizeof는 포인터 크기가 됩니다. <code>strcmp</code>는 같으면 0, 앞 문자열이 사전순으로 앞서면 음수를 반환합니다.`,
   trap:"sizeof(a)를 내용 길이(9)나 9+1=10으로 답하는 실수, sizeof(b)를 2로 답하는 실수(널 문자 누락)가 대표적입니다.",
   tip:"strlen은 '글자 수', sizeof는 '그릇 크기'(배열이면 선언 크기, 리터럴이면 +1).",
   kw:["strcpy","strcat","strlen","sizeof","널 문자","버퍼 오버플로"]},

  {key:"HRN 우선순위 = (대기+서비스)/서비스",
   body:`<b>HRN(Highest Response-ratio Next)</b>은 SJF가 실행 시간이 긴 작업을 계속 뒤로 미뤄 발생하는 <b>기아(Starvation)</b>를 해결하기 위해, 대기 시간이 길수록 우선순위가 올라가도록 만든 <b>비선점</b> 스케줄링입니다.
<pre>우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간
         = 1 + 대기 시간 / 서비스 시간</pre>
값이 <b>클수록</b> 먼저 실행되며, 대기 시간이 늘어나면 값이 계속 커지므로 결국 실행되는 <b>에이징(Aging)</b> 효과가 있습니다.
<table><tr><th>기법</th><th>선점</th><th>기준</th></tr>
<tr><td>FCFS</td><td>비선점</td><td>도착 순서</td></tr>
<tr><td>SJF</td><td>비선점</td><td>실행 시간 짧은 순</td></tr>
<tr><td>HRN</td><td>비선점</td><td>응답 비율 큰 순</td></tr>
<tr><td>SRT</td><td>선점</td><td>남은 실행 시간 짧은 순</td></tr>
<tr><td>RR</td><td>선점</td><td>시간 할당량(Time Slice)</td></tr>
<tr><td>MLFQ</td><td>선점</td><td>다단계 큐 간 이동</td></tr></table>
실제 문제에서 한 작업이 끝난 뒤 다음 작업을 고를 때는 그 시점의 대기 시간으로 우선순위를 다시 계산해야 합니다.`,
   trap:"공식을 대기/서비스 또는 서비스/(대기+서비스)로 잘못 외우거나, 값이 작은 것을 먼저 실행하는 실수가 많습니다. HRN은 비선점입니다.",
   tip:"HRN = '1 + 기다린 시간 / 일할 시간', 큰 놈이 먼저.",
   kw:["HRN","응답 비율","기아 현상","에이징","비선점 스케줄링"]},

  {key:"인터페이스 default 메서드와 X.super.m()",
   body:`Java 8부터 인터페이스는 몸체가 있는 <b>default 메서드</b>와 <b>static 메서드</b>를 가질 수 있고, Java 9부터는 private 메서드도 가능합니다. default 메서드는 구현 클래스에 자동 상속되며 필요하면 오버라이딩할 수 있습니다(오버라이딩 시 public 필수).<br>
상위 인터페이스의 default 구현을 호출하려면 <code>인터페이스명.super.메서드()</code>를 사용하며, 이는 <b>직접</b> 상속·구현한 인터페이스에 대해서만 쓸 수 있습니다.
<table><tr><th>충돌 상황</th><th>규칙</th></tr>
<tr><td>클래스 메서드 vs default</td><td>클래스(부모 클래스 포함)가 우선</td></tr>
<tr><td>하위 인터페이스 vs 상위 인터페이스 default</td><td>더 구체적인 하위 인터페이스가 우선</td></tr>
<tr><td>서로 무관한 두 인터페이스의 같은 default</td><td>컴파일 오류 → 클래스에서 반드시 재정의</td></tr></table>
인터페이스의 static 메서드는 구현 클래스로 상속되지 않아 <code>인터페이스명.메서드()</code>로만 호출합니다. 인터페이스의 필드는 자동으로 public static final 상수입니다.`,
   trap:"Kim이 hello()를 재정의하지 않았으므로 Greet의 'G'가 나온다고 생각하기 쉽지만, 더 구체적인 Polite의 default가 상속됩니다.",
   tip:"default 충돌은 '클래스가 이기고, 더 구체적인 인터페이스가 이긴다'.",
   kw:["default 메서드","인터페이스","X.super.m()","다중 상속 충돌"]},

  {key:"CSRF와 XSS 비교, CSRF 대응",
   body:`<b>CSRF(Cross-Site Request Forgery)</b>는 사용자가 로그인한 상태에서 공격자가 준비한 페이지를 열면, 브라우저가 자동으로 쿠키를 붙여 보내는 성질을 악용해 사용자 권한으로 <b>서버에 위조 요청</b>을 실행시키는 공격입니다.
<table><tr><th>구분</th><th>XSS</th><th>CSRF</th></tr>
<tr><td>실행 위치</td><td>사용자 브라우저</td><td>웹 서버</td></tr>
<tr><td>악용 대상</td><td>사용자가 웹 사이트를 신뢰</td><td>웹 사이트가 사용자 브라우저를 신뢰</td></tr>
<tr><td>주요 피해</td><td>쿠키 탈취, 스크립트 실행</td><td>원치 않는 송금·정보 변경</td></tr>
<tr><td>대응</td><td>출력 인코딩, HttpOnly, CSP</td><td>CSRF 토큰, Referer 검증, SameSite</td></tr></table>
가장 대표적인 대응은 서버가 폼마다 예측 불가능한 <b>CSRF 토큰</b>을 발급하고 요청 시 검증하는 것입니다. 상태를 바꾸는 요청은 GET이 아닌 POST로 처리하고, 쿠키에 <code>SameSite=Lax/Strict</code> 속성을 지정하면 타 사이트에서 시작된 요청에 쿠키가 실리지 않습니다. XSS 취약점이 있으면 토큰도 탈취될 수 있어 CSRF 방어가 무력화될 수 있습니다.`,
   trap:"'사용자 모르게 요청을 보낸다'는 설명을 보고 XSS로 답하는 실수가 많습니다. 핵심 키워드는 '요청 위조', '인증된 사용자 권한', '서버가 정상 요청으로 처리'입니다.",
   tip:"CSRF = 'Request Forgery' — 요청을 위조해 서버를 속인다.",
   kw:["CSRF","요청 위조","CSRF 토큰","SameSite","XSS 비교"]},

  {key:"split/strip/join/capitalize와 f-string 서식",
   body:`<code>split(sep)</code>은 구분자를 지정하면 빈 문자열도 그대로 원소로 남기지만, 인자 없이 <code>split()</code>을 쓰면 연속 공백을 하나로 보고 양끝 공백과 빈 문자열을 제거합니다. <code>strip()</code>은 양끝 공백만 제거하며 중간 공백은 유지합니다.
<table><tr><th>메서드</th><th>예</th><th>결과</th></tr>
<tr><td>capitalize()</td><td>"sQL db".capitalize()</td><td>"Sql db"</td></tr>
<tr><td>title()</td><td>"sql db".title()</td><td>"Sql Db"</td></tr>
<tr><td>swapcase()</td><td>"AbC".swapcase()</td><td>"aBc"</td></tr>
<tr><td>"a b".split(" ")</td><td>"a  b".split(" ")</td><td>['a', '', 'b']</td></tr>
<tr><td>"a  b".split()</td><td>연속 공백 무시</td><td>['a', 'b']</td></tr>
<tr><td>"-".join(["a","b"])</td><td>구분자.join(리스트)</td><td>"a-b"</td></tr></table>
f-string 서식 지정자: <code>{x:03d}</code>(폭 3, 0 채움), <code>{x:&gt;5}</code>(오른쪽 정렬), <code>{x:&lt;5}</code>(왼쪽 정렬), <code>{x:^5}</code>(가운데), <code>{x:.2f}</code>(소수 둘째 자리), <code>{x:,}</code>(천 단위 쉼표). 문자열은 불변(immutable)이므로 메서드는 항상 <b>새 문자열을 반환</b>하고 원본은 바뀌지 않습니다.`,
   trap:"capitalize()가 나머지 글자를 소문자로 바꾸는 점, split(',')가 빈 문자열을 남기는 점을 놓치기 쉽습니다. join은 리스트가 아니라 구분자 문자열의 메서드입니다.",
   tip:"capitalize는 문장 첫 글자, title은 단어마다 첫 글자.",
   kw:["split","join","strip","capitalize","f-string","format"]},

  {key:"UPDATE/DELETE 후 결과와 NULL 연산",
   body:`NULL은 '값이 없음(알 수 없음)'을 뜻하므로 <b>NULL과의 산술 연산 결과는 항상 NULL</b>이고, 비교 연산(=, &lt;&gt;) 결과는 UNKNOWN이 되어 WHERE 조건에서 거짓처럼 처리됩니다. 따라서 NULL 비교에는 반드시 <code>IS NULL</code> / <code>IS NOT NULL</code>을 사용합니다.
<table><tr><th>식</th><th>결과</th></tr>
<tr><td>NULL + 50</td><td>NULL</td></tr>
<tr><td>부서 = NULL</td><td>UNKNOWN (항상 선택 안 됨)</td></tr>
<tr><td>COALESCE(보너스, 0) + 50</td><td>50</td></tr>
<tr><td>NULL OR TRUE</td><td>TRUE</td></tr>
<tr><td>NULL AND FALSE</td><td>FALSE</td></tr></table>
UPDATE/DELETE에 WHERE절이 없으면 <b>모든 행</b>이 대상이 됩니다. DELETE는 행을 지우지만 테이블 구조는 남기며 ROLLBACK이 가능하고(DML), TRUNCATE는 전체 행을 빠르게 지우는 DDL, DROP은 테이블 자체를 제거합니다. 여러 SQL이 순서대로 나오면 단계마다 중간 테이블을 직접 적어 가며 추적해야 실수가 없습니다.`,
   trap:"WHERE 보너스 IS NULL로 선택된 행이 50으로 바뀐다고 생각해 SUM을 600으로 답하는 실수가 대표적입니다. 행은 선택되지만 NULL + 50 = NULL입니다.",
   tip:"NULL은 '블랙홀' — 무엇을 더해도 NULL, 비교는 IS NULL로만.",
   kw:["UPDATE","DELETE","NULL 연산","IS NULL","COALESCE","TRUNCATE"]},

  {key:"전략(Strategy) 패턴 vs 템플릿 메서드·상태",
   body:`<b>전략(Strategy) 패턴</b>은 알고리즘군을 정의하고 각각을 캡슐화해 <b>교체 가능</b>하게 만드는 행위 패턴입니다. 구성 요소는 Context(전략을 사용하는 쪽), Strategy(공통 인터페이스), ConcreteStrategy(구체 알고리즘)이며 상속 대신 <b>위임(구성)</b>을 사용합니다.
<table><tr><th>패턴</th><th>핵심</th><th>구현 방식</th></tr>
<tr><td>Strategy</td><td>알고리즘 전체를 런타임에 교체</td><td>구성(위임)</td></tr>
<tr><td>Template Method</td><td>알고리즘 골격 고정, 일부 단계만 재정의</td><td>상속</td></tr>
<tr><td>State</td><td>내부 상태에 따라 행위가 자동 변경</td><td>상태 객체가 전이 담당</td></tr>
<tr><td>Command</td><td>요청을 객체로 캡슐화(실행 취소, 큐)</td><td>명령 객체</td></tr></table>
전략 패턴은 새 알고리즘을 추가할 때 기존 코드를 수정하지 않아 <b>OCP(개방-폐쇄 원칙)</b>를 만족하며, 조건문 분기를 다형성으로 대체합니다. Java의 <code>Comparator</code>를 <code>Collections.sort</code>에 넘기는 것이 대표적 예입니다. GoF 패턴은 생성 5, 구조 7, 행위 11개로 총 23개입니다.`,
   trap:"'알고리즘'이라는 단어만 보고 템플릿 메서드로 답하기 쉽습니다. '골격은 고정, 일부 단계 재정의'면 템플릿 메서드, '알고리즘 통째로 교체'면 전략입니다.",
   tip:"전략은 '갈아 끼우는 무기', 템플릿 메서드는 '빈칸 채우기 양식'.",
   kw:["Strategy","행위 패턴","Template Method","State","OCP"]},

  {key:"뷰(View) 특징과 WITH CHECK OPTION",
   body:`<b>뷰</b>는 기본 테이블에서 유도된 <b>가상 테이블</b>로, 정의(SELECT문)만 시스템 카탈로그에 저장되고 실행 시점에 기본 테이블에서 데이터를 가져옵니다.
<pre>CREATE VIEW 영업사원 AS
  SELECT 사번, 이름 FROM 사원 WHERE 부서 = '영업'
  WITH CHECK OPTION;
DROP VIEW 영업사원 RESTRICT;   -- 참조 객체 있으면 거부
DROP VIEW 영업사원 CASCADE;    -- 참조 객체까지 삭제</pre>
<table><tr><th>장점</th><th>단점</th></tr>
<tr><td>논리적 데이터 독립성 제공</td><td>ALTER로 정의 변경 불가</td></tr>
<tr><td>필요한 데이터만 보여 보안(접근 제어)</td><td>독자적인 인덱스를 가질 수 없음</td></tr>
<tr><td>복잡한 질의를 단순화</td><td>삽입·삭제·갱신에 제약</td></tr></table>
집계 함수, GROUP BY, DISTINCT, 조인이 포함된 뷰나 기본키 컬럼이 빠진 뷰는 일반적으로 갱신할 수 없습니다. <b>시스템 카탈로그(데이터 사전)</b>는 테이블·뷰·인덱스·권한 같은 메타데이터를 저장하며, 사용자는 SELECT로 조회만 가능하고 직접 갱신은 DBMS가 합니다.`,
   trap:"뷰도 ALTER VIEW로 바꿀 수 있다고 생각하기 쉽습니다(시험 기준으로는 변경 불가). 또한 뷰는 물리적으로 데이터를 저장하지 않습니다.",
   tip:"뷰 = '창문' — 데이터는 방(기본 테이블)에 있고, 창틀(정의)만 바꾸려면 새로 달아야 한다.",
   kw:["뷰","가상 테이블","WITH CHECK OPTION","시스템 카탈로그","논리적 독립성"]},

  {key:"CIDR 경로 요약(슈퍼네팅) 계산법",
   body:`<b>경로 요약(Route Summarization)</b>은 연속된 여러 네트워크를 하나의 큰 프리픽스로 묶어 라우팅 테이블 크기를 줄이는 기법으로, 서브네팅의 반대 개념이라 <b>슈퍼네팅</b>이라고도 합니다.<br>
계산 순서: ① 값이 달라지는 옥텟을 2진수로 쓴다 ② 모든 주소에서 <b>공통인 앞쪽 비트 수</b>를 센다 ③ 공통 비트 이후를 0으로 만든 값이 요약 주소, 공통 비트 수가 프리픽스 길이입니다.
<table><tr><th>네트워크 수(2의 거듭제곱)</th><th>줄어드는 비트</th><th>/24 기준 요약</th><th>마스크(3번째 옥텟)</th></tr>
<tr><td>2</td><td>1</td><td>/23</td><td>254</td></tr>
<tr><td>4</td><td>2</td><td>/22</td><td>252</td></tr>
<tr><td>8</td><td>3</td><td>/21</td><td>248</td></tr>
<tr><td>16</td><td>4</td><td>/20</td><td>240</td></tr></table>
빠른 검산: 네트워크가 2^n개(위 표)이고 시작 옥텟 값이 그 개수의 배수이면 정확히 하나의 블록으로 요약됩니다. 시작 값이 배수가 아니면(예: 10.1.42.0~49.0) 공통 비트가 줄어들어 불필요한 네트워크까지 포함되므로 주의합니다.`,
   trap:"8개 네트워크라서 /24에서 8을 빼 /16으로 답하는 실수가 있습니다. 2의 3제곱이므로 3비트만 줄어 /21입니다.",
   tip:"요약 = 2진수로 쓰고 '같은 데까지 자르기', 네트워크 2^n개면 프리픽스 −n.",
   kw:["CIDR","경로 요약","슈퍼네팅","프리픽스","서브넷 마스크"]},

  {key:"구조체 배열과 포인터 접근 (->, [], (*p).)",
   body:`구조체 포인터로 멤버에 접근할 때 <code>p-&gt;x</code>와 <code>(*p).x</code>는 같은 의미입니다. <code>*p.x</code>는 <code>.</code>이 <code>*</code>보다 우선순위가 높아 <code>*(p.x)</code>로 해석되므로 오류가 납니다.
<table><tr><th>표현 (p = arr)</th><th>같은 의미</th></tr>
<tr><td>p-&gt;x</td><td>(*p).x, arr[0].x, p[0].x</td></tr>
<tr><td>(p+1)-&gt;y</td><td>p[1].y, (*(p+1)).y, arr[1].y</td></tr>
<tr><td>p++ 후 p[-1].x</td><td>arr[0].x</td></tr>
<tr><td>p-&gt;x++</td><td>(p-&gt;x)++ — 멤버 값 증가</td></tr>
<tr><td>(p++)-&gt;x</td><td>현재 원소의 x 사용 후 p 이동</td></tr></table>
구조체 포인터 +1은 <b>sizeof(struct P)</b>만큼 주소가 증가하며, 멤버가 int 2개면 보통 8바이트입니다(패딩에 따라 달라질 수 있음). 구조체 변수끼리는 대입(=)은 가능하지만 ==로 비교할 수 없습니다. 구조체를 함수에 값으로 넘기면 복사본이 전달되므로 원본을 바꾸려면 포인터로 전달해야 합니다.`,
   trap:"p++ 이후의 인덱스 기준이 바뀐 것을 놓치고 p[-1]을 오류로 보거나, 먼저 수정된 arr[1].x(9)를 원래 값 3으로 계산하는 실수가 많습니다.",
   tip:"화살표(-&gt;)는 '포인터의 멤버', p[i]는 '포인터에서 i칸 간 구조체'.",
   kw:["구조체","구조체 포인터","화살표 연산자","포인터 인덱싱","sizeof 구조체"]},

  {key:"디피-헬만 키 교환 계산과 MITM 취약점",
   body:`<b>디피-헬만(Diffie-Hellman)</b>은 1976년 발표된 최초의 공개키 개념 알고리즘으로, 암호화가 아니라 <b>안전하지 않은 채널에서 대칭키를 합의</b>하는 데 사용됩니다. 안전성은 <b>이산 대수 문제</b>의 어려움에 기반합니다.
<pre>공개: p = 23, g = 5
A: 비밀 a = 6  → 공개값 g^a mod p = 8
B: 비밀 b = 15 → 공개값 g^b mod p = 19
공유키 = 19^6 mod 23 = 8^15 mod 23 = 2</pre>
<table><tr><th>알고리즘</th><th>기반 수학 문제</th><th>주 용도</th></tr>
<tr><td>디피-헬만</td><td>이산 대수</td><td>키 교환</td></tr>
<tr><td>RSA</td><td>소인수분해</td><td>암호화, 전자서명</td></tr>
<tr><td>ElGamal</td><td>이산 대수</td><td>암호화, 전자서명</td></tr>
<tr><td>ECC</td><td>타원곡선 이산 대수</td><td>짧은 키로 높은 안전성</td></tr></table>
디피-헬만은 상대방을 인증하지 않으므로 공격자가 중간에서 각자와 따로 키를 합의하는 <b>중간자 공격(MITM)</b>에 취약하며, 인증서나 전자서명과 결합해 사용합니다. TLS, IPSec의 IKE에서 키 교환에 쓰이며, 매 세션 새 키를 만드는 DHE/ECDHE는 <b>전방향 안전성(PFS)</b>을 제공합니다.`,
   trap:"디피-헬만을 데이터 암호화 알고리즘으로 오해하거나, 공유키를 g^(a+b)로 계산하는 실수가 있습니다. 공유키는 g^(ab) mod p입니다.",
   tip:"DH = '공개값 교환 후 내 비밀값으로 한 번 더 거듭제곱', 약점은 MITM.",
   kw:["디피-헬만","이산 대수","키 교환","중간자 공격","PFS"]},

  {key:"UML 구조 다이어그램 vs 행위 다이어그램",
   body:`UML 2.x 다이어그램은 시스템의 정적인 구성을 나타내는 <b>구조(Structural)</b> 다이어그램과 동적인 동작을 나타내는 <b>행위(Behavioral)</b> 다이어그램으로 나뉩니다. 행위 다이어그램 중 객체 간 메시지 교환에 초점을 둔 것들을 따로 <b>상호작용(Interaction)</b> 다이어그램이라 합니다.
<table><tr><th>분류</th><th>다이어그램</th><th>핵심</th></tr>
<tr><td>구조</td><td>클래스</td><td>클래스 속성·연산·관계</td></tr>
<tr><td>구조</td><td>객체</td><td>특정 시점의 인스턴스 관계</td></tr>
<tr><td>구조</td><td>컴포넌트</td><td>구현 모듈과 인터페이스</td></tr>
<tr><td>구조</td><td>배치</td><td>물리 노드에 산출물 배치</td></tr>
<tr><td>구조</td><td>복합체 구조, 패키지</td><td>내부 구조, 요소 그룹화</td></tr>
<tr><td>행위</td><td>유스케이스, 활동, 상태</td><td>기능, 처리 흐름, 상태 전이</td></tr>
<tr><td>행위(상호작용)</td><td>시퀀스, 커뮤니케이션, 상호작용 개요, 타이밍</td><td>메시지 순서·연결·시간</td></tr></table>
UML의 구성 요소는 <b>사물(Things), 관계(Relationships), 다이어그램(Diagram)</b>이며, 관계에는 연관·집합·포함·일반화·의존·실체화가 있습니다. 시퀀스는 시간 순서, 커뮤니케이션은 객체 간 연결 구조에 초점을 둔다는 차이가 자주 출제됩니다.`,
   trap:"유스케이스와 활동 다이어그램을 구조로, 패키지·배치 다이어그램을 행위로 분류하는 실수가 많습니다.",
   tip:"구조 6개 '클객컴배복패', 나머지는 모두 행위.",
   kw:["UML","구조 다이어그램","행위 다이어그램","상호작용 다이어그램","시퀀스 다이어그램"]}
]);
