NOTES.push([
  {key:"구조체 포인터 전달(화살표 연산자) vs 값 전달",
   body:`C에서 구조체를 함수에 넘기는 방법은 두 가지입니다. <b>값 전달</b>(<code>void f(Student s)</code>)은 구조체 전체가 복사되므로 함수 안에서 멤버를 바꿔도 원본은 그대로이고, <b>주소 전달</b>(<code>void f(Student *s)</code>)은 원본을 직접 수정합니다.<br>
포인터로 멤버에 접근할 때는 <code>s-&gt;score</code>를 쓰며, 이는 <code>(*s).score</code>와 같습니다. 괄호 없이 <code>*s.score</code>라고 쓰면 <code>.</code>이 <code>*</code>보다 우선하므로 <code>*(s.score)</code>로 해석되어 오류입니다.<br>
구조체 배열에서 <code>p + i</code>는 <code>&amp;st[i]</code>와 같고, <code>p[i].score</code>, <code>(p+i)-&gt;score</code>, <code>(*(p+i)).score</code>는 모두 같은 값입니다.
<table><tr><th>표현</th><th>의미</th></tr>
<tr><td><code>p-&gt;score</code></td><td>p가 가리키는 구조체의 score</td></tr>
<tr><td><code>(*p).score</code></td><td>위와 동일</td></tr>
<tr><td><code>p[2].score</code></td><td>세 번째 구조체의 score</td></tr>
<tr><td><code>(p+1)-&gt;bonus</code></td><td>두 번째 구조체의 bonus</td></tr>
<tr><td><code>p++-&gt;score</code></td><td>현재 구조체 score 사용 후 p 이동</td></tr></table>
같은 원리로 구조체 안의 일반 int 매개변수(add)는 값 전달이므로 함수 안에서 변경해도 호출한 쪽에 반영되지 않습니다. 정수 나눗셈 <code>75 / 10</code>은 소수점 이하를 버린 7입니다.`,
   trap:"reset(st[1])처럼 구조체를 값으로 넘긴 함수가 원본을 0으로 만든다고 착각하기 쉽습니다. 또한 함수 안의 add = add * 2가 main의 add를 바꾼다고 계산하면 오답이 됩니다.",
   tip:"별표(*)나 화살표 연산자가 있어야 원본이 바뀐다. 그냥 넘기면 복사본.",
   kw:["구조체 포인터","화살표 연산자","값에 의한 전달","주소에 의한 전달","구조체 배열"]},

  {key:"instanceof와 다운캐스팅, 다형성 배열",
   body:`<code>a instanceof X</code>는 a가 참조하는 <b>실제 객체</b>가 X 또는 X의 <b>하위 클래스</b> 객체이면 true입니다. 따라서 Puppy 객체는 <code>instanceof Puppy</code>, <code>instanceof Dog</code>, <code>instanceof Animal</code>이 모두 true입니다. null에 대한 instanceof는 항상 false입니다.<br>
부모 타입 배열(<code>Animal[]</code>)에 여러 자식 객체를 담으면 자식에만 있는 메서드(fetch)는 직접 호출할 수 없으므로 <b>다운캐스팅</b>이 필요합니다. 다운캐스팅은 참조 타입만 바꿀 뿐 객체를 바꾸지 않으므로, <code>(Dog) a</code>로 바꿔도 실제 객체가 Puppy이면 오버라이딩된 Puppy의 메서드가 호출됩니다.<br>
실제 객체가 대상 타입이 아닌데 캐스팅하면(Bird를 Dog로) 컴파일은 되지만 실행 중 <b>ClassCastException</b>이 발생하므로 instanceof로 먼저 확인합니다.
<table><tr><th>구분</th><th>업캐스팅</th><th>다운캐스팅</th></tr>
<tr><td>방향</td><td>자식 → 부모</td><td>부모 → 자식</td></tr>
<tr><td>형변환 연산자</td><td>생략 가능(자동)</td><td>명시 필수</td></tr>
<tr><td>실패 가능성</td><td>없음</td><td>ClassCastException</td></tr>
<tr><td>호출 가능 메서드</td><td>부모에 선언된 것만</td><td>자식 메서드까지</td></tr></table>
if-else if 체인에서는 <b>순서</b>가 중요합니다. 상위 타입 검사를 먼저 하면 하위 타입 분기는 영원히 실행되지 않습니다. Java 16부터는 <code>if (a instanceof Dog d)</code> 패턴 매칭으로 검사와 캐스팅을 한 번에 할 수 있습니다.`,
   trap:"Puppy를 Dog로 캐스팅했으니 Dog의 fetch()(10)가 호출된다고 생각하기 쉽습니다. 캐스팅 후에도 실행되는 것은 실제 객체(Puppy)의 오버라이딩 메서드입니다.",
   tip:"instanceof는 '나 또는 내 자식이니?', 캐스팅은 '이름표만 바꾸기'.",
   kw:["instanceof","다운캐스팅","업캐스팅","ClassCastException","다형성","동적 바인딩"]},

  {key:"EXISTS / NOT EXISTS 상관 부속질의",
   body:`<b>상관 부속질의(Correlated Subquery)</b>는 서브쿼리가 바깥 쿼리의 열(C.고객번호)을 참조하므로, 바깥 쿼리의 <b>행마다 한 번씩</b> 서브쿼리가 평가됩니다.<br>
<code>EXISTS</code>는 서브쿼리 결과 행이 <b>하나 이상 존재</b>하면 참, <code>NOT EXISTS</code>는 결과가 <b>하나도 없으면</b> 참입니다. 반환되는 값 자체는 보지 않으므로 <code>SELECT *</code>, <code>SELECT 1</code> 어느 것을 써도 결과가 같습니다.<br>
EXISTS는 바깥 테이블의 각 행을 기준으로 판정하므로, 조건에 맞는 주문이 여러 건이어도 바깥 행은 <b>한 번만</b> 결과에 포함됩니다(JOIN과의 차이).
<table><tr><th>구문</th><th>판정 기준</th><th>NULL 영향</th></tr>
<tr><td>EXISTS</td><td>결과 행 존재 여부</td><td>없음</td></tr>
<tr><td>IN</td><td>값이 목록에 포함</td><td>목록의 NULL은 무시</td></tr>
<tr><td>NOT IN</td><td>값이 목록에 없음</td><td>목록에 NULL 있으면 결과 0행</td></tr>
<tr><td>NOT EXISTS</td><td>결과 행이 없음</td><td>없음</td></tr></table>
같은 서브쿼리 조건으로 EXISTS와 NOT EXISTS를 실행하면 두 결과 행 수의 합은 항상 바깥 테이블 전체 행 수(5)가 됩니다. 주문이 아예 없는 고객(C3)은 NOT EXISTS 쪽에 들어갑니다.`,
   trap:"주문 테이블의 건수(20000 이상 주문 4건)를 그대로 답하는 실수가 흔합니다. EXISTS는 고객 기준으로 세므로 3입니다. >=의 경계값(20000)도 놓치지 마세요.",
   tip:"EXISTS는 '있냐 없냐'만 본다. 몇 개인지는 관심 없다.",
   kw:["EXISTS","NOT EXISTS","상관 부속질의","IN vs EXISTS","NOT IN NULL"]},

  {key:"병행 제어 미실시 문제 4가지와 로킹",
   body:`여러 트랜잭션이 동시에 실행될 때 병행 제어를 하지 않으면 <b>갱신 손실, 현황 파악 오류, 모순성, 연쇄 복귀</b>가 발생합니다.<br>
<table><tr><th>문제</th><th>영문</th><th>내용</th></tr>
<tr><td>갱신 손실</td><td>Lost Update</td><td>두 트랜잭션이 같은 데이터를 갱신하여 한쪽 결과가 덮어써짐</td></tr>
<tr><td>현황 파악 오류</td><td>Dirty Read</td><td>커밋 전 중간 결과를 다른 트랜잭션이 읽음</td></tr>
<tr><td>모순성</td><td>Inconsistency</td><td>동시 실행으로 데이터 간 일관성이 깨짐</td></tr>
<tr><td>연쇄 복귀</td><td>Cascading Rollback</td><td>한 트랜잭션 롤백 시 그 데이터를 쓴 다른 트랜잭션도 롤백</td></tr></table>
대표 해결 기법은 <b>로킹(Locking)</b>으로, 공유 락(S, 읽기)과 배타 락(X, 쓰기)을 사용합니다. <b>2단계 로킹(2PL)</b>은 확장 단계(락 획득만)와 축소 단계(락 해제만)로 나누어 <b>직렬 가능성</b>을 보장하지만 교착상태는 막지 못합니다.<br>
로킹 단위(Granularity)가 <b>크면</b> 병행성은 낮아지고 관리 오버헤드는 줄며, <b>작으면</b> 병행성은 높아지고 오버헤드는 커집니다. 그 밖에 타임스탬프 순서, 낙관적 검증(검증 기법), 다중 버전(MVCC) 기법이 있습니다.<br>
SQL 표준의 고립 수준(Isolation Level)으로 보면 Dirty Read는 READ UNCOMMITTED에서만 허용되고, Non-Repeatable Read와 Phantom Read는 각각 REPEATABLE READ, SERIALIZABLE에서 방지됩니다.`,
   trap:"현황 파악 오류(중간 결과를 읽음)와 모순성(결과적으로 일관성 깨짐)을 혼동하기 쉽습니다. '중간 결과 참조'라는 키워드가 나오면 현황 파악 오류입니다.",
   tip:"병행 제어 문제 암기: '갱현모연' (갱신 손실-현황 파악 오류-모순성-연쇄 복귀).",
   kw:["갱신 손실","현황 파악 오류","모순성","연쇄 복귀","2단계 로킹","로킹 단위"]},

  {key:"SQL 인젝션 원리와 Prepared Statement",
   body:`<b>SQL 인젝션</b>은 사용자 입력이 SQL 문자열에 그대로 연결될 때, 입력값에 따옴표·OR·주석 등을 넣어 쿼리의 구조 자체를 바꾸는 공격입니다.<br>
<code>' OR '1'='1</code>을 넣으면 앞의 따옴표가 원래 문자열을 닫고 항상 참인 조건이 추가됩니다. SQL에서 <b>AND가 OR보다 우선</b>하므로 <code>(id='admin' AND pw='') OR '1'='1'</code>이 되어 전체가 참입니다. 아이디 칸에 <code>admin'--</code>를 넣어 뒤의 비밀번호 조건을 주석 처리하는 변형도 자주 나옵니다.
<table><tr><th>유형</th><th>특징</th></tr>
<tr><td>Form(인증 우회)</td><td>로그인 조건을 항상 참으로 만듦</td></tr>
<tr><td>Union 기반</td><td>UNION으로 다른 테이블 데이터 추가 조회</td></tr>
<tr><td>Error 기반</td><td>DB 오류 메시지로 구조 정보 수집</td></tr>
<tr><td>Blind</td><td>참/거짓 응답 차이로 정보 추론</td></tr>
<tr><td>Stored Procedure</td><td>저장 프로시저(xp_cmdshell 등) 악용</td></tr></table>
가장 확실한 대응은 <b>Prepared Statement(매개변수화 쿼리)</b>입니다. 쿼리 구조를 먼저 컴파일하고 <code>?</code> 자리에 값만 바인딩하므로 입력값은 끝까지 데이터로 취급됩니다. 보조 대책으로 입력값 검증, 특수문자 이스케이프, 최소 권한 DB 계정, 상세 오류 메시지 숨기기가 있습니다.`,
   trap:"Statement에 문자열을 연결하는 방식은 필터링을 해도 우회될 수 있습니다. 문제에서 '바인딩 변수', '쿼리 구조와 데이터 분리'가 나오면 Prepared Statement입니다.",
   tip:"작은따옴표(')로 닫고, OR로 참 만들고, --로 나머지 지운다.",
   kw:["SQL 인젝션","Prepared Statement","Blind SQL Injection","Union 기반","입력값 검증"]},

  {key:"super().__init__과 오버라이딩, self의 탐색 순서",
   body:`자식 클래스가 <code>__init__</code>을 정의하면 부모의 <code>__init__</code>은 <b>자동으로 호출되지 않으므로</b> <code>super().__init__(...)</code>을 명시적으로 호출해야 부모가 초기화하는 속성(owner, balance)이 생깁니다. 호출하지 않으면 해당 속성 접근 시 AttributeError가 납니다.<br>
Python의 메서드·속성 탐색은 <b>인스턴스 → 클래스 → 부모 클래스</b>(MRO) 순입니다. 부모 클래스에 정의된 메서드라도 <code>self</code>는 실제 객체이므로, 그 안의 <code>self.interest()</code>, <code>self.rate</code>는 실제 객체의 클래스(Saving)부터 찾습니다.<br>
<code>super().interest()</code>는 MRO에서 현재 클래스의 <b>다음 클래스</b>의 메서드를 호출하되 self는 그대로 넘깁니다.
<table><tr><th>호출 위치</th><th>표현</th><th>찾는 순서</th></tr>
<tr><td>Account.info 안</td><td>self.interest()</td><td>Saving → Account</td></tr>
<tr><td>Saving.interest 안</td><td>super().interest()</td><td>Account부터</td></tr>
<tr><td>Account.interest 안</td><td>self.rate</td><td>인스턴스 → Saving(0.2)</td></tr></table>
<code>Saving.__mro__</code>로 순서를 확인할 수 있고, 다중 상속에서는 C3 선형화 규칙을 따릅니다. 클래스 변수를 <code>self.rate = 값</code>으로 대입하면 클래스 변수가 바뀌는 게 아니라 인스턴스 변수가 새로 생깁니다.`,
   trap:"super().interest()가 부모 메서드이니 부모의 rate(0.1)를 쓴다고 생각하기 쉽습니다. self가 Saving 객체이므로 0.2가 적용됩니다. 또 balance를 500으로 계산하는 실수도 흔합니다(balance * 2로 1000).",
   tip:"self는 항상 '진짜 나(실제 객체)'부터 찾는다. super()는 '한 칸 위에서부터'.",
   kw:["super().__init__","오버라이딩","MRO","클래스 변수","self"]},

  {key:"CSMA/CD(802.3) vs CSMA/CA(802.11)",
   body:`CSMA는 전송 전 매체가 사용 중인지 감지(Carrier Sense)하는 다중 접근 방식이며, 충돌 처리 방식에 따라 CD와 CA로 나뉩니다.<br>
<b>CSMA/CD</b>는 유선 이더넷(IEEE 802.3)에서 전송 중 충돌을 감지하면 Jam 신호를 보내고 <b>이진 지수 백오프</b>(충돌할수록 대기 범위 2배) 후 재전송합니다. 충돌 감지를 위해 최소 프레임 크기(64바이트)가 정해져 있습니다. 전이중 스위치 환경에서는 충돌이 없어 사실상 사용되지 않습니다.<br>
<b>CSMA/CA</b>는 무선 LAN(IEEE 802.11)에서 사용되며, 매체가 비어도 IFS 시간과 임의 백오프만큼 기다린 후 전송하고 수신 측은 ACK로 응답합니다. 숨겨진 노드 문제를 줄이기 위해 <b>RTS/CTS</b>를 선택적으로 사용합니다.
<table><tr><th>구분</th><th>CSMA/CD</th><th>CSMA/CA</th></tr>
<tr><td>표준</td><td>IEEE 802.3</td><td>IEEE 802.11</td></tr>
<tr><td>환경</td><td>유선 LAN</td><td>무선 LAN</td></tr>
<tr><td>충돌 처리</td><td>감지(Detection) 후 재전송</td><td>회피(Avoidance)</td></tr>
<tr><td>핵심 요소</td><td>Jam 신호, 백오프</td><td>IFS, RTS/CTS, ACK</td></tr></table>
관련 표준: 802.1Q(VLAN), 802.5(토큰 링), 802.15(블루투스·WPAN), 802.15.4(지그비), 802.16(WiMAX).`,
   trap:"CD는 Detection(감지), CA는 Avoidance(회피)입니다. 무선에서 충돌을 '감지'한다고 쓰면 틀립니다.",
   tip:"유선은 D(Detect, 부딪히고 안다), 무선은 A(Avoid, 미리 피한다).",
   kw:["CSMA/CD","CSMA/CA","IEEE 802.3","IEEE 802.11","RTS/CTS","숨겨진 노드"]},

  {key:"요구사항 개발 프로세스: 도출-분석-명세-확인",
   body:`요구사항 공학은 크게 <b>요구사항 개발</b>(도출 → 분석 → 명세 → 확인)과 <b>요구사항 관리</b>(변경 관리, 추적)로 나뉩니다. 앞에 타당성 조사(Feasibility Study)를 두기도 합니다.
<table><tr><th>단계</th><th>주요 활동</th><th>기법·산출물</th></tr>
<tr><td>도출(Elicitation)</td><td>이해관계자로부터 요구 수집</td><td>인터뷰, 브레인스토밍, 설문, 프로토타이핑, 유스케이스, 워크숍</td></tr>
<tr><td>분석(Analysis)</td><td>모순·누락 식별, 범위·우선순위 결정</td><td>DFD, 자료 사전, 개념 모델링, UML</td></tr>
<tr><td>명세(Specification)</td><td>요구사항 문서화</td><td>SRS, 정형 명세(Z, VDM), 비정형 명세</td></tr>
<tr><td>확인(Validation)</td><td>요구사항이 올바른지 검토</td><td>리뷰, 워크스루, 인스펙션, 프로토타입 검증</td></tr></table>
요구사항은 기능 요구사항(무엇을 하는가)과 비기능 요구사항(성능, 보안, 가용성 등 품질 제약)으로 분류합니다.<br>
명세 기법 중 <b>정형 명세</b>는 수학적 기호로 정확하지만 이해가 어렵고, <b>비정형 명세</b>는 자연어·다이어그램으로 이해는 쉽지만 모호할 수 있습니다. 확인(Validation)은 '고객이 원하는 것을 만드는가', 검증(Verification)은 '명세대로 올바르게 만드는가'를 봅니다.`,
   trap:"분석과 명세의 순서를 바꾸거나, 확인을 도출 앞에 두는 실수가 많습니다. 정리(분석)한 뒤에 문서(명세)를 씁니다.",
   tip:"도-분-명-확: '도둑을 분석해서 명세서를 쓰고 확인한다'.",
   kw:["요구사항 도출","요구사항 분석","요구사항 명세","요구사항 확인","기능/비기능 요구사항"]},

  {key:"ASCII 산술: 대소문자 차이 32, 문자와 정수",
   body:`C에서 char는 1바이트 정수이므로 문자에 정수를 더하고 빼는 연산이 가능합니다. 대문자와 소문자의 ASCII 차이는 <b>32</b>이므로 소문자 − 32 = 대문자, 대문자 + 32 = 소문자입니다.
<table><tr><th>문자</th><th>코드</th><th>문자</th><th>코드</th></tr>
<tr><td>'0'</td><td>48</td><td>'9'</td><td>57</td></tr>
<tr><td>'A'</td><td>65</td><td>'Z'</td><td>90</td></tr>
<tr><td>'a'</td><td>97</td><td>'z'</td><td>122</td></tr>
<tr><td>' ' (공백)</td><td>32</td><td>':'</td><td>58</td></tr></table>
숫자 문자를 정수로 바꿀 때는 <code>c - '0'</code>, 정수를 숫자 문자로 바꿀 때는 <code>n + '0'</code>을 씁니다. 같은 값이라도 printf의 <code>%c</code>는 문자로, <code>%d</code>는 정수 코드로 출력합니다.<br>
대소문자 비트 관점에서는 32가 0x20 비트이므로 <code>c ^ 32</code>는 대소문자 토글, <code>c | 32</code>는 소문자화, <code>c &amp; ~32</code>는 대문자화입니다. 표준 라이브러리 ctype.h의 toupper, tolower, isalpha, isdigit도 같은 역할을 합니다.<br>
<code>for (i = 0; s[i]; i++)</code>는 널 문자(&#92;0, 값 0)를 만나면 조건이 거짓이 되어 종료하는 관용 표현입니다.`,
   trap:"'9' + 1을 숫자 10이나 문자 '0'으로 착각하기 쉽습니다. 실제로는 ASCII 58인 ':'입니다. %c와 %d가 같은 문자를 다르게 출력하는 점도 함정입니다.",
   tip:"A=65, a=97, 0=48, 대소문자 차이는 32.",
   kw:["ASCII","대소문자 변환","%c vs %d","c - '0'","널 문자"]},

  {key:"스래싱과 워킹 셋, PFF",
   body:`<b>스래싱(Thrashing)</b>은 프로세스가 실제 작업보다 페이지 교체에 더 많은 시간을 쓰는 현상입니다. 다중 프로그래밍 정도를 높이면 처음에는 CPU 이용률이 올라가지만, 임계점을 넘으면 프레임이 부족해져 페이지 부재가 폭증하고 CPU 이용률이 급격히 떨어집니다.<br>
원인은 프로세스의 <b>지역성(Locality)</b>을 담을 만큼 프레임이 확보되지 못하기 때문입니다. 지역성에는 최근 참조한 위치를 다시 참조하는 <b>시간 지역성</b>(반복문, 스택)과 인접한 위치를 참조하는 <b>공간 지역성</b>(배열 순회)이 있습니다.
<table><tr><th>방지 기법</th><th>내용</th></tr>
<tr><td>워킹 셋(Working Set)</td><td>최근 Δ 시간 동안 참조한 페이지 집합을 메모리에 유지</td></tr>
<tr><td>PFF(페이지 부재 빈도)</td><td>부재율이 상한보다 높으면 프레임 추가, 하한보다 낮으면 회수</td></tr>
<tr><td>다중 프로그래밍 정도 조절</td><td>일부 프로세스를 중단(스왑 아웃)</td></tr></table>
워킹 셋 크기의 합이 전체 프레임 수보다 커지면 일부 프로세스를 중단시켜 스래싱을 막습니다. 관련 개념으로 <b>프리페이징</b>(필요할 것으로 예상되는 페이지를 미리 적재)과 <b>요구 페이징</b>(필요할 때만 적재)이 있습니다.`,
   trap:"스래싱의 원인을 '프레임이 너무 많아서'라고 쓰면 틀립니다. 다중 프로그래밍 정도가 높아 프로세스당 프레임이 부족한 것이 원인입니다.",
   tip:"스래싱 = 일은 안 하고 짐(페이지)만 나른다. 해결은 워킹 셋과 PFF.",
   kw:["스래싱","워킹 셋","PFF","지역성","다중 프로그래밍 정도"]},

  {key:"스니핑 vs 스푸핑, ARP 스푸핑",
   body:`<b>스니핑(Sniffing)</b>은 네트워크를 흐르는 패킷을 몰래 엿보는 <b>수동적</b> 공격이고, <b>스푸핑(Spoofing)</b>은 IP·MAC·DNS 등 신원 정보를 위조하여 속이는 <b>능동적</b> 공격입니다.<br>
ARP는 IP 주소를 MAC 주소로 변환하는 프로토콜로, 인증 과정이 없어 요청하지 않은 ARP 응답도 캐시에 반영됩니다. 이를 악용해 게이트웨이 IP에 공격자 MAC을 대응시키는 것이 <b>ARP 스푸핑(ARP 캐시 포이즈닝)</b>이며, 이후 트래픽을 중계하며 스니핑하는 중간자 공격(MITM)으로 이어집니다.
<table><tr><th>공격</th><th>위조 대상</th><th>대응</th></tr>
<tr><td>ARP 스푸핑</td><td>IP–MAC 대응</td><td>정적 ARP 테이블(arp -s), ARP 감시</td></tr>
<tr><td>IP 스푸핑</td><td>출발지 IP</td><td>패킷 필터링, 신뢰 관계 제거</td></tr>
<tr><td>DNS 스푸핑</td><td>도메인–IP 응답</td><td>DNSSEC, hosts 파일</td></tr>
<tr><td>스위치 재밍</td><td>MAC 테이블 범람(MAC Flooding)</td><td>포트 보안</td></tr></table>
스니핑을 하려면 NIC를 자신에게 오지 않은 프레임도 받는 <b>무차별 모드(Promiscuous Mode)</b>로 설정합니다. 스위치 환경에서는 패킷이 공격자에게 오지 않으므로 ARP 스푸핑이나 스위치 재밍과 함께 사용됩니다. 근본 대책은 SSL/TLS, SSH 등 통신 암호화입니다.`,
   trap:"ARP 스푸핑과 ARP 스니핑을 혼동하거나, 스니핑을 능동 공격이라고 쓰는 실수가 있습니다. 위조는 스푸핑, 도청은 스니핑입니다.",
   tip:"스푸핑(Spoof) = 속이기, 스니핑(Sniff) = 냄새 맡기(엿보기).",
   kw:["ARP 스푸핑","스니핑","무차별 모드","중간자 공격","스위치 재밍","DNS 스푸핑"]},

  {key:"CROSS JOIN 행 수와 셀프 조인",
   body:`<b>CROSS JOIN(교차 조인)</b>은 조인 조건 없이 두 테이블의 모든 행을 조합하는 <b>카티션 곱</b>입니다. 결과의 <b>카디널리티(행 수)는 곱</b>, <b>차수(열 수)는 합</b>입니다. <code>FROM A, B</code>처럼 WHERE 조건 없이 테이블을 나열해도 같은 결과입니다.<br>
<b>셀프 조인</b>은 같은 테이블을 서로 다른 별칭으로 두 번 사용하는 조인으로, 사원–관리자처럼 한 테이블 안의 계층 관계를 비교할 때 씁니다. 관리자사번이 NULL인 행은 등가 조건(<code>=</code>)을 만족하지 못해 내부 조인 결과에서 빠집니다. 최상위 관리자까지 포함하려면 LEFT OUTER JOIN을 씁니다.
<table><tr><th>조인</th><th>결과</th></tr>
<tr><td>CROSS JOIN</td><td>m × n 행</td></tr>
<tr><td>INNER JOIN</td><td>조건을 만족하는 행만</td></tr>
<tr><td>LEFT OUTER JOIN</td><td>왼쪽 전체 + 매칭(없으면 NULL)</td></tr>
<tr><td>NATURAL JOIN</td><td>같은 이름 열로 자동 등가 조인, 중복 열 1개</td></tr>
<tr><td>SELF JOIN</td><td>같은 테이블끼리 조인</td></tr></table>
집계 함수 MAX, MIN, SUM, AVG, COUNT(열)은 NULL을 제외하고 계산하며, COUNT(*)만 NULL을 포함한 모든 행을 셉니다. 집계 함수끼리 산술 연산(<code>MAX(급여) - MIN(급여)</code>)도 가능합니다.`,
   trap:"CROSS JOIN 행 수를 5 + 3 = 8로 더하는 실수가 많습니다. 행은 곱(15), 열은 합(7)입니다. 셀프 조인에서 NULL 관리자 행이 포함된다고 착각하지 마세요.",
   tip:"카티션 곱: 카디널리티는 곱하고, 차수는 더한다.",
   kw:["CROSS JOIN","카티션 곱","셀프 조인","카디널리티","차수","MAX/MIN"]},

  {key:"Java String 메서드와 char + int 함정",
   body:`Java String은 0부터 시작하는 인덱스를 사용하며, 주요 메서드의 반환값과 범위 규칙을 정확히 알아야 합니다.
<table><tr><th>메서드</th><th>반환</th><th>주의점</th></tr>
<tr><td>length()</td><td>int</td><td>배열은 length(괄호 없음)</td></tr>
<tr><td>charAt(i)</td><td>char</td><td>정수와 더하면 정수 연산</td></tr>
<tr><td>substring(a, b)</td><td>String</td><td>a 이상 b 미만, 길이 b−a</td></tr>
<tr><td>indexOf / lastIndexOf</td><td>int</td><td>없으면 −1</td></tr>
<tr><td>split(정규식)</td><td>String[]</td><td>끝의 빈 문자열은 제거됨</td></tr>
<tr><td>replace(a, b)</td><td>String</td><td>원본 불변, 새 문자열 반환</td></tr></table>
<b>+ 연산자</b>는 왼쪽부터 평가되며, 피연산자 중 하나라도 String이면 문자열 연결, 둘 다 숫자형(char 포함)이면 산술 덧셈입니다. 그래서 <code>'R' + 4</code>는 86, <code>"" + 'R' + 4</code>는 "R4", <code>1 + 2 + "A"</code>는 "3A", <code>"A" + 1 + 2</code>는 "A12"입니다.<br>
String은 <b>불변(immutable)</b>이라 toLowerCase, trim 등은 원본을 바꾸지 않고 새 문자열을 반환합니다. 반복적으로 문자열을 수정할 때는 StringBuilder를 사용합니다.`,
   trap:"System.out.print(charAt(1) + length())를 'R4'로 답하는 실수가 대표적입니다. String이 하나도 없으므로 정수 덧셈 82 + 4 = 86입니다. substring 끝 인덱스 포함 여부도 자주 틀립니다.",
   tip:"+ 앞에 문자열이 있어야 연결된다. char + int = 숫자.",
   kw:["charAt","substring","indexOf","split","문자열 연결 연산","불변 객체"]},

  {key:"프록시 패턴과 GoF 구조 패턴 비교",
   body:`<b>프록시(Proxy)</b> 패턴은 실제 객체와 같은 인터페이스를 가진 대리 객체를 두고, 클라이언트 요청을 대리 객체가 먼저 받아 접근 제어·지연 생성·캐싱 등을 한 뒤 실제 객체에 위임합니다.<br>
종류로는 무거운 객체(대용량 이미지 등)를 필요할 때 생성하는 <b>가상 프록시</b>, 원격 객체를 로컬처럼 쓰게 하는 <b>원격 프록시</b>(RMI 스텁), 권한을 검사하는 <b>보호 프록시</b>, 결과를 저장해 두는 <b>캐싱 프록시</b>가 있습니다.
<table><tr><th>구조 패턴</th><th>핵심 목적</th></tr>
<tr><td>Adapter</td><td>호환되지 않는 인터페이스 변환</td></tr>
<tr><td>Bridge</td><td>기능 계층과 구현 계층 분리</td></tr>
<tr><td>Composite</td><td>부분–전체 트리 구조를 동일하게 처리</td></tr>
<tr><td>Decorator</td><td>객체에 동적으로 기능 추가</td></tr>
<tr><td>Facade</td><td>복잡한 서브시스템에 단순한 통합 인터페이스</td></tr>
<tr><td>Flyweight</td><td>공유를 통해 다수 객체의 메모리 절약</td></tr>
<tr><td>Proxy</td><td>대리 객체로 접근 제어</td></tr></table>
생성 패턴 중 <b>Builder</b>는 복잡한 객체를 단계별로 조립하여 같은 과정으로 다른 표현을 만들고, <b>Prototype</b>은 원본 객체를 복제(clone)하여 새 객체를 생성합니다. 이들도 같은 유형으로 출제되므로 함께 암기합니다.`,
   trap:"프록시와 데코레이터는 구조(대상을 감싸고 같은 인터페이스)가 거의 같아 혼동됩니다. 목적이 접근 제어·지연이면 프록시, 기능 추가면 데코레이터입니다.",
   tip:"구조 패턴 7개: '어브컴데퍼플프' (Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy).",
   kw:["Proxy","가상 프록시","구조 패턴","Decorator","Builder","Prototype"]},

  {key:"3단계 스키마와 데이터 독립성",
   body:`ANSI/SPARC 3단계 구조는 사용자 관점과 물리적 저장을 분리하여 <b>데이터 독립성</b>을 확보하기 위한 것입니다.
<table><tr><th>스키마</th><th>관점</th><th>특징</th></tr>
<tr><td>외부 스키마</td><td>개별 사용자·응용 프로그램</td><td>서브 스키마, 여러 개 존재</td></tr>
<tr><td>개념 스키마</td><td>조직 전체(DBA)</td><td>하나만 존재, 관계·제약조건·권한·보안 정의</td></tr>
<tr><td>내부 스키마</td><td>물리적 저장 장치</td><td>레코드 형식, 인덱스, 저장 순서</td></tr></table>
스키마 사이에는 <b>사상(Mapping)</b>이 존재합니다. 외부/개념 사상은 <b>논리적 데이터 독립성</b>(개념 스키마가 바뀌어도 외부 스키마·응용 프로그램 무관)을, 개념/내부 사상은 <b>물리적 데이터 독립성</b>(저장 구조·인덱스가 바뀌어도 개념 스키마 무관)을 제공합니다.<br>
스키마는 <b>데이터 사전(시스템 카탈로그)</b>에 저장되며, 카탈로그는 일반 사용자도 SELECT로 조회할 수 있지만 직접 갱신은 DBMS만 합니다. 스키마는 시간에 따라 거의 변하지 않는 구조(내연)이고, 특정 시점의 실제 데이터는 인스턴스(외연)라고 합니다.`,
   trap:"외부 스키마를 '하나만 존재'라고 하거나, 접근 권한·보안 정책 정의를 외부 스키마로 쓰는 실수가 많습니다. 조직 전체의 제약조건·권한은 개념 스키마입니다. 논리적/물리적 독립성 짝도 자주 바뀌어 출제됩니다.",
   tip:"외-개-내 = 사용자-전체-저장. 외개 사이는 논리, 개내 사이는 물리.",
   kw:["외부 스키마","개념 스키마","내부 스키마","논리적 데이터 독립성","물리적 데이터 독립성","사상"]},

  {key:"할당(별칭) vs 얕은 복사 vs 깊은 복사",
   body:`Python 변수는 객체를 가리키는 이름(참조)이므로 <code>b = a</code>는 복사가 아니라 <b>같은 객체에 이름을 하나 더 붙이는 것</b>입니다. <code>a is b</code>가 True이고 한쪽 변경이 다른 쪽에도 보입니다.<br>
<b>얕은 복사</b>(<code>a[:]</code>, <code>list(a)</code>, <code>a.copy()</code>, <code>copy.copy(a)</code>)는 바깥 리스트만 새로 만들고 안의 원소는 같은 객체를 참조합니다. 따라서 정수 원소를 다른 값으로 바꾸는 것은 독립적이지만, 내부 리스트를 수정(<code>c[2][0] = 30</code>)하면 원본에도 반영됩니다. <b>깊은 복사</b>(<code>copy.deepcopy</code>)는 내부 객체까지 재귀적으로 복제합니다.
<table><tr><th>방법</th><th>a is 결과</th><th>내부 리스트 공유</th></tr>
<tr><td>b = a</td><td>True</td><td>공유(완전히 같은 객체)</td></tr>
<tr><td>a[:], a.copy(), list(a)</td><td>False</td><td>공유</td></tr>
<tr><td>copy.deepcopy(a)</td><td>False</td><td>독립</td></tr></table>
<code>==</code>는 값 비교, <code>is</code>는 객체 동일성 비교입니다. 비슷한 함정으로 <code>[[0]*3]*3</code>은 같은 내부 리스트 3개를 참조하므로 한 칸을 바꾸면 세 행이 모두 바뀌고, <code>[[0]*3 for _ in range(3)]</code>는 독립된 행을 만듭니다.`,
   trap:"얕은 복사 c를 만들었으니 c를 통한 변경은 모두 a와 무관하다고 생각하기 쉽습니다. 원소 교체(c[1] = 20)는 독립적이지만 내부 리스트 수정(c[2][0] = 30)은 a에 반영됩니다.",
   tip:"= 는 이름표 추가, [:]는 겉봉투만 새로, deepcopy는 속까지 새로.",
   kw:["별칭","얕은 복사","깊은 복사","copy.deepcopy","is vs ==","[[0]*3]*3"]},

  {key:"Well-known 포트 번호와 TCP/UDP",
   body:`포트 번호는 0~1023이 <b>Well-known</b>, 1024~49151이 등록(Registered), 49152~65535가 동적(Dynamic/Private) 포트입니다.
<table><tr><th>프로토콜</th><th>포트</th><th>전송</th></tr>
<tr><td>FTP</td><td>20(데이터), 21(제어)</td><td>TCP</td></tr>
<tr><td>SSH / SFTP</td><td>22</td><td>TCP</td></tr>
<tr><td>Telnet</td><td>23</td><td>TCP</td></tr>
<tr><td>SMTP</td><td>25</td><td>TCP</td></tr>
<tr><td>DNS</td><td>53</td><td>UDP/TCP</td></tr>
<tr><td>DHCP</td><td>67(서버), 68(클라이언트)</td><td>UDP</td></tr>
<tr><td>TFTP</td><td>69</td><td>UDP</td></tr>
<tr><td>HTTP</td><td>80</td><td>TCP</td></tr>
<tr><td>POP3</td><td>110</td><td>TCP</td></tr>
<tr><td>NTP</td><td>123</td><td>UDP</td></tr>
<tr><td>IMAP</td><td>143</td><td>TCP</td></tr>
<tr><td>SNMP</td><td>161(Agent), 162(Trap)</td><td>UDP</td></tr>
<tr><td>HTTPS</td><td>443</td><td>TCP</td></tr></table>
SMTP는 메일 <b>송신</b>, POP3·IMAP은 메일 <b>수신</b>입니다. POP3는 서버에서 내려받은 뒤 삭제하는 방식이 기본이고, IMAP은 서버에 보관한 채 동기화합니다. FTP 능동 모드에서는 서버가 20번 포트로 데이터 연결을 시작하고, 수동 모드에서는 클라이언트가 서버의 임의 포트로 접속합니다.`,
   trap:"FTP 제어 포트를 20으로 쓰는 실수가 가장 많습니다. 제어(명령)는 21, 데이터는 20입니다. SSH(22)와 Telnet(23)도 자주 뒤바뀝니다.",
   tip:"20·21 FTP, 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 80 HTTP, 110 POP3, 143 IMAP, 443 HTTPS.",
   kw:["Well-known 포트","FTP 20/21","SSH 22","DNS 53","SMTP 25","HTTPS 443"]},

  {key:"do-while 최소 1회 실행과 2차원 배열 순회",
   body:`<b>do-while</b>은 본문을 먼저 실행하고 조건을 나중에 검사하는 <b>후검사 반복문</b>이므로 조건이 처음부터 거짓이어도 <b>최소 1회</b> 실행됩니다. while과 for는 선검사 반복문이라 조건이 거짓이면 한 번도 실행되지 않습니다. do-while의 <code>while (조건);</code> 끝에는 세미콜론이 필요합니다.
<table><tr><th>반복문</th><th>조건 검사 시점</th><th>최소 실행 횟수</th></tr>
<tr><td>for</td><td>본문 전</td><td>0회</td></tr>
<tr><td>while</td><td>본문 전</td><td>0회</td></tr>
<tr><td>do-while</td><td>본문 후</td><td>1회</td></tr></table>
2차원 배열 <code>a[3][4]</code>에서 행 합은 i를 고정하고 j를 돌며 더하고, 열 합은 j를 고정하고 i를 돌며 더합니다. 하나의 이중 루프에서 <code>row[i] += a[i][j]</code>와 <code>col[j] += a[i][j]</code>를 동시에 누적할 수 있습니다.<br>
<code>(i + j) % 2 == 0</code> 조건은 체스판처럼 칸을 번갈아 선택합니다. 비슷하게 <code>i == j</code>는 주대각선, <code>i + j == n - 1</code>은 부대각선입니다. 배열 초기화 <code>int row[3] = {0};</code>은 모든 원소를 0으로 만듭니다.`,
   trap:"마지막 do-while의 조건(k가 5 초과)이 처음부터 거짓이므로 실행되지 않는다고 판단하는 것이 대표적 함정입니다. 1회 실행되어 k = 3, cnt가 1 증가합니다.",
   tip:"do-while은 '일단 하고 본다'. 행 합은 i 고정, 열 합은 j 고정.",
   kw:["do-while","후검사 반복","2차원 배열","행 합/열 합","최소 1회 실행"]},

  {key:"테스트 드라이버 vs 스텁, 통합 테스트 방식",
   body:`통합 테스트는 단위 테스트를 마친 모듈을 결합하며 인터페이스 오류를 찾는 테스트입니다. 아직 만들어지지 않은 모듈을 대신하는 임시 모듈이 필요합니다.
<table><tr><th>구분</th><th>테스트 드라이버</th><th>테스트 스텁</th></tr>
<tr><td>사용 방식</td><td>상향식 통합</td><td>하향식 통합</td></tr>
<tr><td>대신하는 모듈</td><td>상위 모듈</td><td>하위 모듈</td></tr>
<tr><td>역할</td><td>테스트 대상을 호출, 데이터 전달, 결과 수신</td><td>호출되면 미리 정한 값을 반환</td></tr>
<tr><td>특징</td><td>시험용 메인 프로그램 성격</td><td>기능이 단순한 가짜 모듈</td></tr></table>
<b>하향식</b>은 주요 제어 모듈부터 깊이 우선 또는 너비 우선으로 통합하므로 초기에 시스템 구조를 확인할 수 있지만 스텁 작성 부담이 큽니다. <b>상향식</b>은 하위 모듈을 <b>클러스터</b>로 묶어 드라이버로 테스트한 뒤 상위로 올라가며, 하위 기능을 철저히 검증하지만 전체 구조는 늦게 보입니다.<br>
<b>샌드위치(혼합식)</b>는 상위는 하향식, 하위는 상향식을 병행하고, <b>빅뱅</b>은 모든 모듈을 한 번에 결합하여 오류 위치 파악이 어렵습니다. 통합 후 변경으로 새 오류가 없는지 확인하는 것은 <b>회귀 테스트</b>입니다.`,
   trap:"드라이버와 스텁을 반대로 쓰는 실수가 매우 흔합니다. 상향식은 위가 없으니 위를 대신할 드라이버, 하향식은 아래가 없으니 아래를 대신할 스텁입니다.",
   tip:"상드하스: 상향식-드라이버, 하향식-스텁.",
   kw:["테스트 드라이버","테스트 스텁","상향식 통합","하향식 통합","빅뱅","회귀 테스트"]},

  {key:"시큐어 코딩 보안 약점 7대 유형",
   body:`행정안전부 소프트웨어 개발보안 가이드는 구현 단계 보안 약점을 <b>7가지 유형</b>으로 분류합니다.
<table><tr><th>유형</th><th>대표 보안 약점</th></tr>
<tr><td>입력 데이터 검증 및 표현</td><td>SQL 삽입, XSS, 경로 조작, OS 명령어 삽입, 위험한 파일 업로드, CSRF</td></tr>
<tr><td>보안 기능</td><td>부적절한 인가, 취약한 암호화 알고리즘, 하드코딩된 비밀번호</td></tr>
<tr><td>시간 및 상태</td><td>TOCTOU 경쟁 조건, 종료되지 않는 반복문·재귀</td></tr>
<tr><td>에러 처리</td><td>오류 메시지 정보 노출, 오류 상황 대응 부재</td></tr>
<tr><td>코드 오류</td><td>널 포인터 역참조, 부적절한 자원 해제</td></tr>
<tr><td>캡슐화</td><td>잘못된 세션에 의한 정보 노출, 디버그 코드 잔존</td></tr>
<tr><td>API 오용</td><td>DNS lookup에 의존한 보안 결정, 취약한 API 사용</td></tr></table>
입력 데이터 검증의 기본 원칙은 <b>서버 측</b>에서 검증하는 것입니다. 클라이언트(JavaScript) 검증은 우회가 쉬워 보조 수단일 뿐입니다. 허용할 값만 정의하는 <b>화이트리스트</b> 방식이 차단할 값을 나열하는 블랙리스트보다 안전합니다.<br>
XSS 유형에는 Stored(저장형), Reflected(반사형), DOM 기반이 있으며, 출력 시 &lt;, &gt; 등을 HTML 엔티티로 변환(이스케이프)하여 대응합니다.`,
   trap:"SQL 삽입, XSS가 나열되었는데 '보안 기능'으로 답하는 실수가 있습니다. 입력값 때문에 생기는 약점은 모두 '입력 데이터 검증 및 표현'입니다.",
   tip:"7대 유형 암기: '입보시에 코캡아' (입력·보안 기능·시간 및 상태·에러 처리·코드 오류·캡슐화·API 오용).",
   kw:["시큐어 코딩","입력 데이터 검증 및 표현","XSS","화이트리스트","보안 약점 7대 유형"]}
]);
