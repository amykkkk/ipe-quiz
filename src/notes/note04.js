NOTES.push([
  {key:"포인터 인자와 값 인자의 혼합 전달",
   body:`C언어는 엄밀히 말해 모든 인자를 <b>값으로 복사</b>해서 넘깁니다. 포인터를 넘기는 것도 '주소값'을 복사하는 것이며, 그 주소를 역참조(<code>*a</code>)해야 원본이 바뀝니다. 그래서 <code>*a = ...</code>는 호출한 쪽 변수를 바꾸지만, <code>a = &amp;other;</code>처럼 포인터 자체를 바꾸면 원본에는 영향이 없습니다.<br>
배열 이름을 넘기면 첫 원소의 주소로 바뀌므로(배열의 포인터 변환) 함수 안에서 원소를 수정하면 원본 배열이 바뀝니다. 시험에는 swap 함수가 자주 나오는데, 값 전달 swap은 실패하고 포인터 swap만 성공합니다.
<pre>void swap1(int a, int b) { int t=a; a=b; b=t; }      // 원본 그대로
void swap2(int *a, int *b) { int t=*a; *a=*b; *b=t; } // 원본 교환</pre>
<table><tr><th>전달 형태</th><th>함수 안에서 바꾸는 것</th><th>원본 변화</th></tr>
<tr><td>int b</td><td>b = 10</td><td>없음</td></tr>
<tr><td>int *a</td><td>*a = 10</td><td>있음</td></tr>
<tr><td>int *a</td><td>a = &amp;k</td><td>없음 (포인터 복사본만 변경)</td></tr>
<tr><td>int arr[]</td><td>arr[0] = 10</td><td>있음</td></tr></table>
두 번째 호출처럼 앞 호출의 결과(x=7)가 다음 호출의 인자로 쓰이는 순차 추적이 핵심입니다.`,
   trap:"함수 안의 <code>b = *a * 2</code>를 원본에 반영하거나, 두 번째 호출에 바뀌기 전의 x(3)를 넣는 실수가 많습니다.",
   tip:"별(*) 붙여 대입하면 원본, 이름만 대입하면 복사본.",
   kw:["Call by Value","Call by Reference","포인터 역참조","swap 함수","배열의 포인터 변환"]},

  {key:"static 변수는 모든 인스턴스가 공유",
   body:`<b>static(클래스) 변수</b>는 클래스 로딩 시 메모리(메서드 영역)에 단 하나만 만들어지고, 모든 객체가 같은 변수를 봅니다. 반면 <b>인스턴스 변수</b>는 new 할 때마다 객체(힙)마다 따로 생깁니다.<br>
<code>a.count</code>, <code>b.count</code>, <code>Item.count</code>는 모두 같은 변수를 가리키므로, 마지막으로 대입한 값이 출력 시점의 값입니다. 다만 id는 생성 시점의 count로 계산되어 이미 저장되었으므로 이후 count를 바꿔도 id는 바뀌지 않습니다.<br>
static 메서드는 객체 없이 호출할 수 있지만 <b>this를 쓸 수 없고 인스턴스 멤버에 직접 접근할 수 없습니다</b>. static 블록은 클래스 로딩 시 한 번만 실행됩니다.
<table><tr><th>구분</th><th>static 변수</th><th>인스턴스 변수</th></tr>
<tr><td>개수</td><td>클래스당 1개</td><td>객체마다 1개</td></tr>
<tr><td>생성 시점</td><td>클래스 로딩</td><td>new 실행</td></tr>
<tr><td>접근</td><td>클래스명.변수 (권장)</td><td>참조변수.변수</td></tr></table>`,
   trap:"<code>a.count = 7</code>이 a 객체만의 값이라고 생각해 Item.count를 3으로 계산하거나, id까지 다시 계산하는 실수가 흔합니다.",
   tip:"static은 공용 칠판 하나 - 누가 써도 모두에게 보인다.",
   kw:["static 변수","인스턴스 변수","클래스 변수 공유","static 메서드","생성자 호출 순서"]},

  {key:"zip(*m)을 이용한 행렬 전치",
   body:`<code>*m</code>은 리스트를 <b>언패킹</b>하여 각 원소를 별도 인자로 넘깁니다. 따라서 <code>zip(*m)</code>은 각 행의 같은 위치 원소끼리 묶은 <b>튜플</b>을 만들어 행렬의 전치(transpose)가 됩니다. zip의 결과는 이터레이터이므로 list()로 감싸야 인덱싱과 len()이 가능합니다.<br>
zip은 길이가 다르면 <b>가장 짧은 쪽에 맞춰</b> 잘립니다. 결과 원소는 리스트가 아니라 튜플이라는 점도 출력형 문제에서 중요합니다.
<pre>print(list(zip([1,2,3],[4,5])))   # [(1, 4), (2, 5)]
print(list(zip(*[[1,2],[3,4]])))  # [(1, 3), (2, 4)]
a, *b = [1, 2, 3]                 # a=1, b=[2, 3]</pre>
<table><tr><th>함수</th><th>역할</th></tr>
<tr><td>zip()</td><td>여러 iterable을 같은 위치끼리 튜플로 묶음</td></tr>
<tr><td>enumerate()</td><td>(인덱스, 값) 쌍 생성</td></tr>
<tr><td>map()</td><td>각 원소에 함수 적용</td></tr>
<tr><td>filter()</td><td>조건이 참인 원소만 남김</td></tr></table>`,
   trap:"전치 전의 m[1][1](=5)과 m[2][0](존재하지 않음)으로 착각하거나, len(t)를 원래 행 수 2로 답하는 실수가 많습니다.",
   tip:"zip은 지퍼 - 같은 칸끼리 맞물려 세로줄이 가로줄이 된다.",
   kw:["zip","언패킹 *","튜플","전치 행렬","enumerate"]},

  {key:"집합 연산자 UNION / UNION ALL / INTERSECT",
   body:`집합 연산자는 두 SELECT 결과를 위아래로 합치거나 비교하므로, 두 쿼리의 <b>컬럼 수와 데이터 타입이 호환</b>되어야 합니다. 결과 컬럼명은 첫 번째 SELECT의 것을 따르며, <b>ORDER BY는 맨 마지막에 한 번만</b> 쓸 수 있습니다.<br>
UNION, INTERSECT, EXCEPT는 결과에서 <b>중복을 제거</b>하므로 원래 테이블 안의 중복(T1의 3,3)도 하나로 줄어듭니다. UNION ALL만 중복을 그대로 두며, 정렬 작업이 없어 성능상 유리합니다.
<table><tr><th>연산자</th><th>의미</th><th>중복</th><th>예시 결과(T1,T2)</th></tr>
<tr><td>UNION</td><td>합집합</td><td>제거</td><td>1,2,3,4</td></tr>
<tr><td>UNION ALL</td><td>합집합</td><td>유지</td><td>1,2,3,3,3,4,4</td></tr>
<tr><td>INTERSECT</td><td>교집합</td><td>제거</td><td>3</td></tr>
<tr><td>EXCEPT(MINUS)</td><td>차집합</td><td>제거</td><td>1,2</td></tr></table>
MINUS는 Oracle, EXCEPT는 표준 SQL 표기이며, 차집합은 순서가 바뀌면(T2 − T1 = {4}) 결과도 바뀝니다. JOIN이 옆으로(컬럼 방향) 붙인다면 집합 연산은 아래로(행 방향) 붙인다고 구분하세요.`,
   trap:"INTERSECT 결과를 공통값 3의 등장 횟수만큼 세거나, UNION에서 같은 테이블 내부 중복은 남는다고 생각하는 실수가 많습니다.",
   tip:"ALL이 붙어야만 중복이 살아남는다.",
   kw:["UNION","UNION ALL","INTERSECT","EXCEPT/MINUS","집합 연산 컬럼 호환"]},

  {key:"반정규화(Denormalization)의 개념과 기법",
   body:`정규화는 중복을 제거해 <b>이상 현상(삽입·삭제·갱신 이상)</b>을 막는 과정이고, 반정규화는 그 결과로 조인이 너무 많아져 조회 성능이 떨어질 때 <b>의도적으로 중복을 허용</b>하는 과정입니다. 보통 물리적 설계 단계에서 수행하며, 대신 데이터 일관성 유지 비용(트리거, 배치 동기화)이 늘어납니다.<br>
반정규화 전에는 먼저 인덱스 조정, 뷰, 클러스터링, 파티셔닝 같은 대안을 검토하는 것이 원칙입니다.
<table><tr><th>구분</th><th>기법</th></tr>
<tr><td>테이블 통합</td><td>1:1, 1:M 관계 테이블 합치기, 슈퍼/서브타입 통합</td></tr>
<tr><td>테이블 분할</td><td>수평 분할(행 기준), 수직 분할(컬럼 기준)</td></tr>
<tr><td>중복 테이블 추가</td><td>집계 테이블, 진행 테이블, 특정 부분만 포함 테이블</td></tr>
<tr><td>중복 속성 추가</td><td>조인 감소용 컬럼 복제, 파생 컬럼 추가</td></tr></table>
정규형 순서도 함께 암기하세요: 1NF(원자값) → 2NF(부분 함수 종속 제거) → 3NF(이행 함수 종속 제거) → BCNF(결정자가 모두 후보키) → 4NF(다치 종속 제거) → 5NF(조인 종속 제거).`,
   trap:"설명에 '중복 허용', '성능 향상'이 나오는데 정규화나 이상 현상으로 답하는 실수가 있습니다. 반대로 '이상 현상 제거'는 정규화입니다.",
   tip:"정규화는 쪼개기, 반정규화는 성능 위해 다시 붙이기.",
   kw:["반정규화","정규화 1NF~5NF","이상 현상","수평/수직 분할","집계 테이블"]},

  {key:"로그 기반 회복의 REDO와 UNDO",
   body:`회복은 <b>로그(Log)</b>에 기록된 트랜잭션의 시작, 변경 전 값(before image), 변경 후 값(after image), Commit 여부를 이용합니다. 로그에 <b>Start와 Commit이 모두 있으면 REDO</b>(after image로 재수행), <b>Start만 있고 Commit이 없으면 UNDO</b>(before image로 복원)합니다.<br>
REDO와 UNDO는 여러 번 수행해도 결과가 같아야 하는 <b>멱등성</b>을 가집니다.
<table><tr><th>회복 기법</th><th>특징</th><th>필요 연산</th></tr>
<tr><td>즉시 갱신</td><td>Commit 전에도 DB에 바로 반영</td><td>REDO + UNDO</td></tr>
<tr><td>지연 갱신</td><td>Commit 후에 DB에 반영</td><td>REDO만 (NO-UNDO)</td></tr>
<tr><td>검사점(Checkpoint)</td><td>일정 시점 기록, 그 이후 로그만 검사</td><td>회복 시간 단축</td></tr>
<tr><td>그림자 페이징</td><td>현재/그림자 페이지 테이블 유지</td><td>UNDO 불필요 (로그 미사용)</td></tr></table>
미디어 장애(디스크 손상) 시에는 백업(덤프)을 복원한 뒤 로그로 REDO 합니다. 트랜잭션 성질 ACID 중 <b>원자성</b>은 UNDO(Rollback)로, <b>영속성</b>은 REDO로 보장된다고 연결해 두세요.`,
   trap:"REDO와 UNDO의 기준을 거꾸로 외우거나, 지연 갱신에도 UNDO가 필요하다고 답하는 실수가 많습니다.",
   tip:"커밋했으면 다시(RE)DO, 못 했으면 없던 일(UN)DO.",
   kw:["REDO","UNDO","즉시 갱신","지연 갱신","Checkpoint","Shadow Paging"]},

  {key:"파밍(Pharming)과 피싱 계열 공격 구분",
   body:`파밍은 사용자가 <b>올바른 URL을 직접 입력해도</b> 이름 해석 과정(hosts 파일, DNS 캐시, DNS 서버)이 조작되어 위조 사이트의 IP로 연결되는 공격입니다. 링크를 클릭하도록 속이는 피싱보다 탐지가 어렵고, 주소창이 정상으로 보이는 것이 특징입니다.<br>
대응책으로는 hosts 파일 점검, 백신, 공식 DNS 사용, <b>DNSSEC</b>(DNS 응답에 전자서명), HTTPS 인증서 확인, OTP 등 추가 인증이 있습니다.
<table><tr><th>공격</th><th>수단/특징</th></tr>
<tr><td>피싱(Phishing)</td><td>가짜 이메일·링크로 위조 사이트 유도</td></tr>
<tr><td>스피어 피싱</td><td>특정 개인·조직을 겨냥한 맞춤형 피싱</td></tr>
<tr><td>스미싱(Smishing)</td><td>SMS 문자 + 피싱</td></tr>
<tr><td>비싱(Vishing)</td><td>음성 전화 + 피싱</td></tr>
<tr><td>큐싱(Qshing)</td><td>QR코드 + 피싱</td></tr>
<tr><td>파밍(Pharming)</td><td>DNS·hosts 변조로 정상 주소도 가짜 사이트로</td></tr></table>`,
   trap:"'가짜 사이트로 유도'라는 말만 보고 피싱이라고 답하기 쉽습니다. 'DNS·hosts 변조', '정상 주소 입력'이 나오면 파밍입니다.",
   tip:"Pharming = 농장(Farm)째로 길을 바꿔 버린다.",
   kw:["파밍","피싱","스미싱","DNS 스푸핑","DNSSEC","hosts 파일"]},

  {key:"허니팟(Honeypot)과 침입 탐지·차단 시스템",
   body:`허니팟은 실제 서비스와 무관한 <b>미끼 시스템</b>이므로 접근 자체가 의심 행위로 간주되어 오탐이 적습니다. 공격자가 오래 머무르도록 그럴듯하게 꾸미고, 모든 행위를 기록해 새로운 공격 기법과 악성코드를 수집합니다. 여러 허니팟을 묶은 것이 <b>허니넷</b>입니다.<br>
IDS의 탐지 방식은 <b>오용 탐지</b>(Misuse, 시그니처 기반: 알려진 공격 패턴 비교, 오탐 적음, 신종 공격에 약함)와 <b>이상 탐지</b>(Anomaly, 행위 기반: 정상 패턴에서 벗어나면 탐지, 신종 공격 탐지 가능, 오탐 많음)로 나뉩니다. 설치 위치에 따라 HIDS(호스트)와 NIDS(네트워크)로 구분합니다.
<table><tr><th>시스템</th><th>역할</th></tr>
<tr><td>방화벽</td><td>정책(IP·포트) 기반 접근 통제</td></tr>
<tr><td>IDS</td><td>침입 탐지·경보 (차단은 안 함)</td></tr>
<tr><td>IPS</td><td>탐지 + 실시간 차단</td></tr>
<tr><td>허니팟</td><td>미끼로 유인·기록·분석</td></tr>
<tr><td>SIEM/ESM</td><td>여러 보안 장비 로그 통합 분석</td></tr>
<tr><td>NAC</td><td>네트워크 접속 단말의 보안 정책 준수 검사</td></tr></table>`,
   trap:"'유인', '미끼'를 놓치고 IDS로 답하거나, 허니넷과 허니팟을 바꿔 쓰는 실수가 있습니다. 단일 시스템은 허니팟, 네트워크 구성은 허니넷입니다.",
   tip:"꿀단지(Honey pot)에 벌레(공격자)가 꼬이게 한다.",
   kw:["허니팟","허니넷","IDS","IPS","오용 탐지/이상 탐지","SIEM"]},

  {key:"TCP 3-Way Handshake와 제어 플래그",
   body:`TCP는 데이터 전송 전에 양쪽의 <b>초기 순서번호(ISN)</b>를 교환하고 확인하기 위해 3단계 연결을 합니다. 클라이언트가 SYN(seq=x)을 보내고, 서버가 SYN+ACK(seq=y, ack=x+1)로 답하며, 클라이언트가 ACK(ack=y+1)를 보내면 연결이 수립됩니다.<br>
상태 변화: 클라이언트는 CLOSED → SYN_SENT → ESTABLISHED, 서버는 LISTEN → SYN_RECEIVED → ESTABLISHED입니다. 종료는 FIN → ACK → FIN → ACK의 4-Way Handshake이며, 먼저 종료한 쪽은 <b>TIME_WAIT</b> 상태로 잠시 대기합니다.
<table><tr><th>플래그</th><th>의미</th></tr>
<tr><td>SYN</td><td>연결 요청, 순서번호 동기화</td></tr>
<tr><td>ACK</td><td>수신 확인</td></tr>
<tr><td>FIN</td><td>정상 연결 종료</td></tr>
<tr><td>RST</td><td>연결 강제 초기화</td></tr>
<tr><td>PSH</td><td>버퍼링 없이 즉시 상위 계층 전달</td></tr>
<tr><td>URG</td><td>긴급 데이터 포함</td></tr></table>
마지막 ACK를 보내지 않아 서버의 대기 큐를 고갈시키는 공격이 <b>SYN Flooding</b>입니다. UDP는 이런 연결 과정이 없는 비연결형 프로토콜입니다.`,
   trap:"2단계를 ACK만 쓰거나, 종료 과정(4-Way)과 혼동하는 실수가 많습니다. 서버는 응답과 동시에 자신의 연결 요청도 보내므로 SYN+ACK입니다.",
   tip:"싱(SYN) - 싱액(SYN+ACK) - 액(ACK), 끝낼 땐 핀액핀액.",
   kw:["3-Way Handshake","4-Way Handshake","SYN Flooding","TCP 플래그","TIME_WAIT"]},

  {key:"팩토리 메서드 패턴과 GoF 생성 패턴",
   body:`팩토리 메서드는 상위 클래스가 <code>createProduct()</code> 같은 생성 메서드의 틀만 정의하고, 하위 클래스가 이를 <b>오버라이딩</b>하여 실제로 만들 객체를 결정합니다. 클라이언트 코드는 구체 클래스 대신 인터페이스에 의존하므로 새 제품 추가 시 기존 코드를 고치지 않아도 됩니다(개방-폐쇄 원칙).<br>
GoF 패턴은 목적에 따라 <b>생성 5개, 구조 7개, 행위 11개</b>로 나뉩니다.
<table><tr><th>생성 패턴</th><th>핵심</th></tr>
<tr><td>Factory Method</td><td>생성할 클래스를 서브클래스가 결정 (상속)</td></tr>
<tr><td>Abstract Factory</td><td>관련 객체군(제품군)을 묶어 생성</td></tr>
<tr><td>Builder</td><td>복잡한 객체를 단계별로 조립, 표현과 생성 분리</td></tr>
<tr><td>Prototype</td><td>원형 객체를 복제(clone)해 생성</td></tr>
<tr><td>Singleton</td><td>인스턴스를 하나만 생성, 전역 접근점 제공</td></tr></table>
구조 패턴: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy<br>
행위 패턴: Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor`,
   trap:"Abstract Factory와 혼동하기 쉽습니다. '하위 클래스가 결정', '가상 생성자'는 Factory Method, '제품군', '관련 객체들의 집합'은 Abstract Factory입니다.",
   tip:"생성 패턴 암기: 팩추빌프싱 (팩토리 메서드, 추상 팩토리, 빌더, 프로토타입, 싱글톤).",
   kw:["Factory Method","Abstract Factory","Builder","Prototype","Singleton","GoF 패턴 분류"]},

  {key:"인수 테스트의 알파·베타 테스트 구분",
   body:`인수 테스트는 개발 완료 후 사용자의 요구사항 충족 여부를 확인하는 마지막 테스트 레벨입니다. V-모델에서 단위 테스트는 상세 설계(모듈 설계), 통합 테스트는 아키텍처 설계, 시스템 테스트는 시스템 요구사항, 인수 테스트는 사용자 요구사항과 대응합니다.<br>
알파와 베타는 <b>장소(개발자 사이트 vs 사용자 환경)</b>와 <b>개발자 동석 여부</b>로 구분합니다.
<table><tr><th>종류</th><th>설명</th></tr>
<tr><td>알파 테스트</td><td>개발자 장소, 개발자 앞에서 사용자가 수행, 통제된 환경</td></tr>
<tr><td>베타 테스트</td><td>사용자 실제 환경, 개발자 없이 수행(필드 테스트)</td></tr>
<tr><td>사용자 인수</td><td>사용자가 시스템 사용 적절성 확인</td></tr>
<tr><td>운영상 인수</td><td>시스템 관리자가 백업·복원, 보안 등 확인</td></tr>
<tr><td>계약 인수</td><td>계약상 인수 기준 충족 확인</td></tr>
<tr><td>규정 인수</td><td>법·규정 준수 확인</td></tr></table>
관련 개념: <b>검증(Verification)</b>은 '제품을 올바르게 만들었는가'(명세 기준), <b>확인(Validation)</b>은 '올바른 제품을 만들었는가'(사용자 요구 기준)입니다.`,
   trap:"알파와 베타의 장소를 바꿔 쓰는 실수가 대부분입니다. 개발자가 함께 있으면 알파입니다.",
   tip:"알파벳 순서처럼 알파가 먼저 - 집(개발사) 안에서 먼저, 베타는 밖(현장)으로.",
   kw:["인수 테스트","알파 테스트","베타 테스트","V-모델","Verification/Validation"]},

  {key:"FIFO 페이지 교체와 페이지 부재 계산",
   body:`페이지 부재(Page Fault)는 참조한 페이지가 주기억장치 프레임에 없을 때 발생하며, 초기에 프레임이 비어 있으면 처음 채우는 참조도 모두 부재로 셉니다. FIFO는 큐처럼 <b>가장 먼저 적재된 페이지</b>를 교체하며, 적중(Hit)해도 적재 순서는 바뀌지 않습니다.<br>
FIFO는 프레임 수를 늘려도 부재가 오히려 증가할 수 있는 <b>벨레이디의 모순(Belady's Anomaly)</b>이 발생할 수 있습니다.
<table><tr><th>알고리즘</th><th>교체 대상</th><th>본 문제 부재 수</th></tr>
<tr><td>OPT(최적)</td><td>앞으로 가장 오래 사용되지 않을 페이지</td><td>6</td></tr>
<tr><td>FIFO</td><td>가장 먼저 들어온 페이지</td><td>9</td></tr>
<tr><td>LRU</td><td>가장 오랫동안 사용되지 않은 페이지</td><td>8</td></tr>
<tr><td>LFU</td><td>사용 횟수가 가장 적은 페이지</td><td>-</td></tr>
<tr><td>NUR</td><td>참조 비트·변형 비트로 최근 미사용 페이지</td><td>-</td></tr>
<tr><td>SCR(2차 기회)</td><td>FIFO + 참조 비트로 한 번 더 기회</td><td>-</td></tr></table>
OPT는 미래 참조를 알아야 하므로 실제 구현은 불가능하고 비교 기준으로만 쓰입니다. 페이지 적중률 = 적중 수 / 전체 참조 수로도 출제됩니다.`,
   trap:"FIFO에서 적중된 페이지의 순서를 갱신(LRU처럼 처리)하거나, 처음 3번의 빈 프레임 적재를 부재에서 빼는 실수가 많습니다.",
   tip:"FIFO는 줄 서기 - 먼저 온 사람이 먼저 나가고, 다시 불려도 줄 순서는 그대로.",
   kw:["FIFO","LRU","OPT","Belady's Anomaly","페이지 부재","LFU/NUR"]},

  {key:"switch문의 폴스루(Fall-through)",
   body:`switch는 조건식 값과 일치하는 case 레이블로 <b>점프</b>한 뒤, break를 만날 때까지 아래 문장을 차례로 모두 실행합니다. 일치하는 case가 없으면 default로 점프하며, default가 중간에 있어도 동작 원리는 같습니다(그 아래로 계속 실행).<br>
C와 Java의 전통적인 switch는 모두 폴스루가 있습니다. 반면 Java 14 이상의 화살표(<code>case 1 -&gt;</code>) 문법은 폴스루가 없습니다. case 값은 상수여야 하며 중복될 수 없습니다.
<pre>int n = 2;
switch (n) {
    default: printf("D");
    case 1:  printf("A");
    case 2:  printf("B");
    case 3:  printf("C"); break;
}
// 출력: BC  (일치하는 case 2부터 break까지)</pre>
같은 예에서 n = 5이면 default부터 시작해 DABC가 출력됩니다. 반복문 안의 switch에서 break는 <b>switch만 빠져나가고 반복은 계속</b>된다는 점, continue는 반복문에 적용된다는 점도 함께 기억하세요.`,
   trap:"case 2 뒤의 default를 '일치하는 case가 있으니 실행 안 됨'으로 처리하거나, break가 for문까지 종료한다고 착각하는 실수가 많습니다.",
   tip:"switch는 입구만 고르고 출구는 break - break 없으면 바닥까지 미끄러진다.",
   kw:["switch","Fall-through","break","default 위치","continue"]},

  {key:"Java 오버로딩 메서드 선택 우선순위",
   body:`컴파일러는 오버로딩된 메서드를 3단계로 찾습니다. <b>1단계</b>: 박싱·언박싱 없이 정확 일치 또는 확대 변환(기본형 widening, 참조형 상위 타입 변환)으로 가능한 메서드, <b>2단계</b>: 박싱·언박싱 허용, <b>3단계</b>: 가변인자 허용. 앞 단계에서 후보가 있으면 뒤 단계는 보지 않으며, 후보가 여럿이면 <b>가장 구체적인(가까운) 타입</b>을 고릅니다.<br>
Integer를 Object로 넘기는 것은 참조형 확대 변환이라 1단계에서 이미 가능하므로, 언박싱이 필요한 p(int)보다 우선합니다.
<table><tr><th>원래 타입</th><th>확대 변환 가능 순서</th></tr>
<tr><td>byte</td><td>short → int → long → float → double</td></tr>
<tr><td>short</td><td>int → long → float → double</td></tr>
<tr><td>char</td><td>int → long → float → double (short 불가)</td></tr>
<tr><td>int</td><td>long → float → double</td></tr>
<tr><td>float</td><td>double</td></tr></table>
축소 변환(double → int 등)은 자동으로 일어나지 않으므로, p(int)만 있을 때 p(3.0)은 컴파일 오류입니다. 오버로딩(같은 이름, 매개변수 다름, 컴파일 시 결정)과 오버라이딩(상속 관계, 시그니처 동일, 실행 시 결정)도 구분해 두세요.`,
   trap:"char는 문자니까 Object, Integer는 숫자니까 int라고 직관적으로 고르는 실수가 많습니다. 박싱·언박싱은 확대 변환보다 후순위입니다.",
   tip:"넓히기 먼저, 포장(박싱)은 나중, 가변인자는 맨 마지막.",
   kw:["오버로딩","widening","박싱/언박싱","가변인자","오버라이딩"]},

  {key:"Python 문자열 메서드와 인덱싱",
   body:`문자열은 <b>불변(immutable)</b> 객체라 replace, lower, upper 등은 원본을 바꾸지 않고 새 문자열을 반환합니다. 인덱스 0은 첫 글자, -1은 마지막 글자이며, 슬라이싱 <code>s[a:b]</code>는 b를 포함하지 않습니다.<br>
<code>split()</code>을 인자 없이 쓰면 연속된 공백을 하나로 보고 양끝 공백도 무시하지만, <code>split(" ")</code>는 공백 하나하나를 구분자로 써서 빈 문자열이 생길 수 있습니다.
<pre>print("a  b".split())      # ['a', 'b']
print("a  b".split(" "))   # ['a', '', 'b']
print("hello"[1:4])        # ell
print("hello"[::-1])       # olleh</pre>
<table><tr><th>메서드</th><th>예 ("hello world")</th></tr>
<tr><td>upper() / lower()</td><td>HELLO WORLD / hello world</td></tr>
<tr><td>capitalize()</td><td>Hello world</td></tr>
<tr><td>title()</td><td>Hello World</td></tr>
<tr><td>swapcase()</td><td>HELLO WORLD (대소문자 반전)</td></tr>
<tr><td>find("o")</td><td>4 (없으면 -1)</td></tr>
<tr><td>count("o")</td><td>2</td></tr></table>`,
   trap:"쉼표를 지우지 않은 채 'Hello,'의 마지막 글자를 쉼표로 처리하거나, 첫 글자와 마지막 글자의 대소문자 변환을 반대로 적용하는 실수가 많습니다.",
   tip:"마이너스 1은 맨 끝, 인자 없는 split은 공백 뭉치를 알아서 정리.",
   kw:["split","replace","문자열 인덱싱","슬라이싱","upper/lower","불변 객체"]},

  {key:"서브넷 마스크로 서브넷 수·호스트 수 계산",
   body:`서브넷 마스크 옥텟 값으로 1의 비트 수를 구합니다: 128(1), 192(2), 224(3), 240(4), 248(5), 252(6), 254(7), 255(8). 따라서 255.255.240.0은 8+8+4 = /20입니다.<br>
<b>서브넷 수 = 2^(빌린 비트 수)</b>, <b>사용 가능 호스트 수 = 2^(호스트 비트 수) − 2</b>입니다. 2를 빼는 이유는 호스트 부분이 모두 0인 <b>네트워크 주소</b>와 모두 1인 <b>브로드캐스트 주소</b>는 호스트에 할당할 수 없기 때문입니다.<br>
/20이면 세 번째 옥텟에서 블록 크기가 256 − 240 = 16이므로 서브넷은 172.16.0.0, 172.16.16.0, 172.16.32.0, ..., 172.16.240.0이 됩니다. 첫 서브넷의 브로드캐스트 주소는 172.16.15.255입니다.
<table><tr><th>프리픽스</th><th>마스크</th><th>호스트 수</th></tr>
<tr><td>/24</td><td>255.255.255.0</td><td>254</td></tr>
<tr><td>/26</td><td>255.255.255.192</td><td>62</td></tr>
<tr><td>/28</td><td>255.255.255.240</td><td>14</td></tr>
<tr><td>/30</td><td>255.255.255.252</td><td>2</td></tr></table>
172.16.0.0/12는 사설 IP 대역(10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) 중 하나입니다.`,
   trap:"서브넷 수를 /20 전체 기준(2^20)으로 계산하거나, 호스트 수에서 2를 빼지 않아 4096으로 답하는 실수가 많습니다.",
   tip:"서브넷은 빌린 비트, 호스트는 남은 비트에서 2 빼기.",
   kw:["서브네팅","CIDR","브로드캐스트 주소","네트워크 주소","사설 IP"]},

  {key:"모듈 결합도의 강도 순서",
   body:`결합도(Coupling)는 모듈 <b>간</b> 상호 의존 정도이고, 응집도(Cohesion)는 모듈 <b>내부</b> 구성 요소들의 관련 정도입니다. 결합도가 낮을수록 한 모듈의 변경이 다른 모듈에 덜 퍼지므로 유지보수가 쉽습니다.<br>
스탬프 결합도는 배열·구조체 같은 자료구조를 통째로 넘겨, 일부만 쓰더라도 구조가 바뀌면 영향을 받습니다. 제어 결합도는 플래그로 상대 모듈의 처리 흐름을 결정하며, 하위 모듈이 상위 모듈에 처리 명령을 내리는 <b>권리 전도</b> 현상이 생길 수 있습니다.
<table><tr><th>응집도 (강 → 약)</th><th>설명</th></tr>
<tr><td>기능적</td><td>단일 기능을 위한 요소들</td></tr>
<tr><td>순차적</td><td>한 활동의 출력이 다음 활동의 입력</td></tr>
<tr><td>교환적(통신적)</td><td>같은 입력·출력을 사용하는 활동들</td></tr>
<tr><td>절차적</td><td>순서대로 수행되는 서로 다른 기능</td></tr>
<tr><td>시간적</td><td>특정 시기에 함께 수행(초기화 등)</td></tr>
<tr><td>논리적</td><td>유사한 성격의 처리를 한 모듈에 모음</td></tr>
<tr><td>우연적</td><td>서로 관련 없는 요소들</td></tr></table>
관련: <b>팬인(Fan-in)</b>은 자신을 호출하는 상위 모듈 수, <b>팬아웃(Fan-out)</b>은 자신이 호출하는 하위 모듈 수로, 팬인은 높게 팬아웃은 낮게 설계하는 것이 바람직합니다.`,
   trap:"순서를 '강한 것부터'로 거꾸로 쓰거나, 외부 결합도와 공통 결합도의 순서를 바꾸는 실수가 많습니다. 문제의 방향(약→강 / 강→약)을 반드시 확인하세요.",
   tip:"결합도 약→강: 데스제외공내 / 응집도 강→약: 기순교절시논우.",
   kw:["결합도","응집도","스탬프 결합도","제어 결합도","팬인/팬아웃"]},

  {key:"논리 연산자의 단락 평가와 증감 연산",
   body:`<code>&amp;&amp;</code>는 왼쪽이 거짓(0)이면, <code>||</code>는 왼쪽이 참(0이 아닌 값)이면 결과가 이미 정해지므로 <b>오른쪽 피연산자를 아예 평가하지 않습니다</b>. 따라서 오른쪽에 있는 ++, 함수 호출, 대입 등의 부수 효과도 발생하지 않습니다.<br>
후위 증가 <code>x++</code>는 '현재 값으로 평가한 뒤 증가', 전위 증가 <code>++x</code>는 '증가한 뒤 그 값으로 평가'입니다. 비트 연산자 <code>&amp;</code>, <code>|</code>는 단락 평가를 하지 않고 양쪽을 모두 계산합니다.
<pre>int a = 0, b = 0;
if (a &amp; b++) { }    // b는 1이 됨 (비트 연산은 양쪽 평가)
if (a &amp;&amp; b++) { }   // b는 그대로 1 (오른쪽 미평가)
int r = (a++ || b++); // a 0 평가 후 1, 오른쪽 평가: b 1로 참 후 2, r = 1</pre>
<table><tr><th>연산</th><th>왼쪽 값</th><th>오른쪽 평가 여부</th></tr>
<tr><td>A &amp;&amp; B</td><td>거짓</td><td>안 함 (결과 0)</td></tr>
<tr><td>A &amp;&amp; B</td><td>참</td><td>함</td></tr>
<tr><td>A || B</td><td>참</td><td>안 함 (결과 1)</td></tr>
<tr><td>A || B</td><td>거짓</td><td>함</td></tr></table>
Java와 Python(and, or)도 같은 단락 평가를 합니다. C에서 논리 연산의 결과값은 항상 0 또는 1입니다.`,
   trap:"조건식에 쓰인 y++를 무조건 실행된 것으로 세거나, 후위 증가 x++를 증가된 값 1로 평가해 첫 조건을 참으로 처리하는 실수가 많습니다.",
   tip:"AND는 처음이 0이면 끝, OR는 처음이 참이면 끝 - 뒤는 쳐다보지도 않는다.",
   kw:["단락 평가","Short-circuit","전위/후위 증가","비트 연산자","논리 연산 결과값"]},

  {key:"블록 암호 운영 모드 CBC와 비교",
   body:`블록 암호(AES, DES 등)는 고정 길이 블록 하나만 암호화하므로, 긴 평문을 처리하는 방식이 <b>운영 모드</b>입니다. CBC는 C_i = E(P_i XOR C_(i-1)), C_0 = IV로 동작해 앞 블록이 뒤 블록에 연쇄적으로 영향을 줍니다.<br>
CBC는 <b>암호화는 순차적</b>이라 병렬화가 불가능하지만, 복호화는 이전 암호문 블록을 이미 알기 때문에 병렬 처리가 가능합니다. 암호문 한 블록에 오류가 나면 해당 블록과 다음 블록의 복호화에 영향을 줍니다. IV는 비밀일 필요는 없지만 예측 불가능해야 합니다.
<table><tr><th>모드</th><th>동작</th><th>특징</th></tr>
<tr><td>ECB</td><td>블록별 독립 암호화</td><td>같은 평문→같은 암호문, 패턴 노출, 병렬 가능</td></tr>
<tr><td>CBC</td><td>이전 암호문과 XOR 후 암호화</td><td>IV 필요, 암호화 순차</td></tr>
<tr><td>CFB</td><td>이전 암호문을 암호화해 평문과 XOR</td><td>스트림처럼 동작, 패딩 불필요</td></tr>
<tr><td>OFB</td><td>암호 출력을 반복 암호화해 키스트림 생성</td><td>오류 전파 없음</td></tr>
<tr><td>CTR</td><td>카운터를 암호화해 평문과 XOR</td><td>암·복호화 모두 병렬, 랜덤 접근 가능</td></tr></table>
관련: 대칭키 블록 암호 DES(64비트 블록, 56비트 키), AES(128비트 블록, 128/192/256비트 키), SEED·ARIA(국산), 스트림 암호 RC4 등도 함께 정리하세요.`,
   trap:"'이전 블록과 XOR'만 보고 CFB나 OFB로 답하는 실수가 있습니다. 평문을 이전 암호문과 XOR한 뒤 암호화하면 CBC, 암호화 출력을 평문과 XOR하면 CFB/OFB/CTR 계열입니다.",
   tip:"CBC = Chain, 사슬처럼 앞 암호문이 뒤를 묶는다.",
   kw:["CBC","ECB","CTR","초기화 벡터 IV","AES","블록 암호 운영 모드"]},

  {key:"NOT IN 서브쿼리와 NULL 함정",
   body:`<code>IN</code>/<code>NOT IN</code> 서브쿼리는 서브쿼리 결과를 먼저 구한 뒤 값 목록과 비교하는 <b>비연관 서브쿼리</b>입니다. 서브쿼리 결과의 중복(1, 1)은 결과에 영향을 주지 않습니다.<br>
가장 큰 함정은 <b>NULL</b>입니다. <code>A NOT IN (1, 3, NULL)</code>은 <code>A&lt;&gt;1 AND A&lt;&gt;3 AND A&lt;&gt;NULL</code>로 풀리는데, NULL과의 비교는 UNKNOWN이므로 전체가 참이 될 수 없어 <b>결과가 0행</b>이 됩니다. 반면 NOT EXISTS는 NULL의 영향을 받지 않습니다.
<table><tr><th>연산자</th><th>의미</th></tr>
<tr><td>IN</td><td>목록 중 하나라도 같으면 참</td></tr>
<tr><td>NOT IN</td><td>목록의 모든 값과 다르면 참 (NULL 포함 시 0행)</td></tr>
<tr><td>EXISTS</td><td>서브쿼리 결과가 1행 이상이면 참 (연관 서브쿼리)</td></tr>
<tr><td>ANY / SOME</td><td>하나라도 조건 만족 (&gt; ANY는 최솟값보다 큼)</td></tr>
<tr><td>ALL</td><td>모두 조건 만족 (&gt; ALL은 최댓값보다 큼)</td></tr></table>
같은 결과를 LEFT OUTER JOIN으로도 구할 수 있습니다: <code>SELECT COUNT(*) FROM 학생 S LEFT JOIN 수강 C ON S.학번 = C.학번 WHERE C.학번 IS NULL;</code> 또한 COUNT(*)는 NULL을 포함한 행 수, COUNT(컬럼)은 NULL을 제외한 개수라는 점도 자주 출제됩니다.`,
   trap:"서브쿼리 결과 행 수(3)를 빼서 4 − 3 = 1로 계산하는 실수가 있습니다. 중복된 학번 1은 한 번만 의미가 있으므로 학생 기준으로 직접 걸러야 합니다.",
   tip:"NOT IN 목록에 NULL 한 방울이면 결과는 텅 빈다.",
   kw:["NOT IN","NOT EXISTS","서브쿼리","NULL 비교","ANY/ALL","COUNT(*)"]}
]);
