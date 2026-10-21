NOTES.push([
  {key:"sizeof(메모리 크기) vs strlen(문자 개수)",
   body:`<code>sizeof</code>는 <b>컴파일 시점</b>에 결정되는 연산자로 변수·자료형이 차지하는 바이트 수를 돌려주고, <code>strlen</code>은 <b>실행 시점</b>에 널 문자 직전까지 문자를 세는 라이브러리 함수입니다.<br>
<code>char a[10] = "KOREA"</code>처럼 크기를 지정하면 sizeof는 선언 크기 10이고, <code>char b[] = "SEOUL"</code>처럼 생략하면 컴파일러가 널 문자까지 포함해 6으로 정합니다.<br>
가장 중요한 함정은 <b>배열이 포인터로 붕괴(decay)</b>되는 경우입니다. 함수 매개변수 <code>char s[]</code>, <code>int arr[]</code>는 실제로 포인터이므로 sizeof가 배열 크기가 아니라 포인터 크기(64비트 8, 32비트 4)가 됩니다.
<table><tr><th>선언 (64비트)</th><th>sizeof</th><th>strlen</th></tr>
<tr><td><code>char a[10] = "KOREA"</code></td><td>10</td><td>5</td></tr>
<tr><td><code>char b[] = "SEOUL"</code></td><td>6</td><td>5</td></tr>
<tr><td><code>char *p = "SEOUL"</code></td><td>8 (포인터)</td><td>5</td></tr>
<tr><td><code>int n[5] = {1,2,3}</code></td><td>20</td><td>해당 없음</td></tr>
<tr><td>매개변수 <code>char s[]</code></td><td>8 (포인터)</td><td>5</td></tr></table>
배열 원소 개수 공식은 <code>sizeof(arr) / sizeof(arr[0])</code>이며, 이 공식은 배열이 선언된 함수 안에서만 올바르게 동작합니다. 초기값이 일부만 주어져도 나머지는 0으로 채워지고 원소 개수는 선언 크기 그대로입니다.`,
   trap:"매개변수 char s[]를 배열로 착각해 sizeof(s)를 6으로 계산하는 실수가 가장 흔합니다. 또 sizeof(b)는 널 문자를 포함해 6이라는 점도 자주 틀립니다.",
   tip:"sizeof는 '그릇 크기', strlen은 '내용물 글자 수', 함수에 넘기면 그릇은 포인터(8)로 바뀐다.",
   kw:["sizeof","strlen","널 문자","배열 붕괴","포인터 크기"]},

  {key:"Java 문자열 결합의 왼쪽 우선 평가와 char 연산",
   body:`Java의 <code>+</code> 연산자는 <b>왼쪽에서 오른쪽</b>으로 평가되며, 피연산자 중 하나라도 String이면 문자열 결합, 둘 다 숫자형(char 포함)이면 산술 덧셈입니다.<br>
<code>char</code>는 내부적으로 유니코드 정수값이므로 <code>'A' + 1</code>은 66(int)이 되고, <code>"" + 'A' + 1</code>은 "A1"이 됩니다.<br>
재귀 문제에서는 <b>반환식이 '앞에 붙이는지' '뒤에 붙이는지'</b>를 구분해 호출 트리를 끝까지 내려간 뒤 거꾸로 조립해야 합니다.
<table><tr><th>식</th><th>결과</th></tr>
<tr><td><code>'A' + 1</code></td><td>66</td></tr>
<tr><td><code>'A' + 1 + "X"</code></td><td>"66X"</td></tr>
<tr><td><code>"X" + 'A' + 1</code></td><td>"XA1"</td></tr>
<tr><td><code>(char)('A' + 1)</code></td><td>'B'</td></tr>
<tr><td><code>'A' + 'B'</code></td><td>131</td></tr></table>
대표 문자 코드: 'A' = 65, 'a' = 97, '0' = 48. 대소문자 차이는 32입니다. <code>System.out.print('A' + 'B')</code>처럼 String이 전혀 없으면 숫자가 출력된다는 점도 자주 출제됩니다.`,
   trap:"c + 1 + f(...)를 'C1...'처럼 문자로 붙여 쓰는 실수. String이 등장하기 전까지는 숫자 덧셈입니다.",
   tip:"+는 왼쪽부터, String을 만나기 전까지는 계산기, 만난 후부터는 풀(접착제).",
   kw:["문자열 결합","char 산술","유니코드","재귀 호출 트리","평가 순서"]},

  {key:"클래스 변수 vs 인스턴스 변수 섀도잉, 매직 메서드",
   body:`클래스 본문에 선언한 변수는 모든 인스턴스가 공유하는 <b>클래스 변수</b>입니다. <code>self.count</code>를 <b>읽을 때</b> 인스턴스에 같은 이름이 없으면 클래스 변수를 찾아가지만, <b>대입</b>(<code>self.count = ...</code>, <code>+=</code> 포함)하면 인스턴스에 새 변수가 만들어져 클래스 변수를 가립니다(섀도잉).<br>
단, 리스트처럼 변경 가능한 클래스 변수에 <code>self.lst.append(x)</code>를 하면 대입이 아니므로 <b>공유 객체 자체가 변경</b>됩니다.<br>
매직 메서드는 내장 함수·연산자와 연결됩니다.
<table><tr><th>메서드</th><th>호출 시점</th></tr>
<tr><td><code>__init__</code></td><td>객체 생성</td></tr>
<tr><td><code>__str__</code></td><td>print(obj), str(obj)</td></tr>
<tr><td><code>__repr__</code></td><td>리스트 안 출력, repr(obj)</td></tr>
<tr><td><code>__len__</code></td><td>len(obj)</td></tr>
<tr><td><code>__eq__</code> / <code>__lt__</code></td><td>== / &lt;</td></tr>
<tr><td><code>__add__</code></td><td>+</td></tr></table>
<code>print([a, b])</code>처럼 리스트를 출력하면 <code>__str__</code>이 아니라 <code>__repr__</code>이 쓰인다는 점도 함정으로 나옵니다.`,
   trap:"self.count += 10이 클래스 변수를 바꾼다고 생각해 Bag.count를 22로 답하는 실수. 대입은 항상 인스턴스 변수를 만듭니다.",
   tip:"읽기는 위로(클래스까지) 찾아가고, 쓰기는 내 집(인스턴스)에 새로 짓는다.",
   kw:["클래스 변수","인스턴스 변수","섀도잉","__str__","__len__","__eq__"]},

  {key:"RANK · DENSE_RANK · ROW_NUMBER 동점 처리",
   body:`순위 윈도우 함수는 <code>함수() OVER (PARTITION BY 그룹 ORDER BY 기준)</code> 형식이며, GROUP BY와 달리 <b>행 수가 줄지 않고</b> 각 행에 값이 붙습니다.<br>
세 함수는 <b>동점 처리 방식</b>만 다릅니다. 예를 들어 점수가 100, 90, 90, 80이라면 다음과 같습니다.
<table><tr><th>함수</th><th>100</th><th>90</th><th>90</th><th>80</th><th>특징</th></tr>
<tr><td>RANK</td><td>1</td><td>2</td><td>2</td><td>4</td><td>동점 후 건너뜀</td></tr>
<tr><td>DENSE_RANK</td><td>1</td><td>2</td><td>2</td><td>3</td><td>건너뛰지 않음</td></tr>
<tr><td>ROW_NUMBER</td><td>1</td><td>2</td><td>3</td><td>4</td><td>항상 고유 번호</td></tr></table>
<code>PARTITION BY</code>를 쓰면 그룹마다 순위가 1부터 다시 시작합니다. 그 밖의 윈도우 함수로 집계형(SUM, AVG, COUNT ... OVER), 행 순서형(LAG, LEAD, FIRST_VALUE, LAST_VALUE), 비율형(NTILE, PERCENT_RANK, CUME_DIST)이 있습니다.<br>
윈도우 함수는 WHERE절에서 직접 사용할 수 없으므로, 순위로 필터링하려면 서브쿼리(인라인 뷰)로 감싸야 합니다.`,
   trap:"RANK에서 동점 3명 다음 순위를 3으로 쓰는 실수(그건 DENSE_RANK). 동점 수만큼 건너뛰어 5가 됩니다.",
   tip:"RANK는 올림픽 순위(공동 2위 셋이면 다음은 5위), DENSE는 빽빽하게, ROW_NUMBER는 번호표.",
   kw:["RANK","DENSE_RANK","ROW_NUMBER","PARTITION BY","윈도우 함수","NTILE"]},

  {key:"분산 데이터베이스 투명성: 위치·중복·병행·장애",
   body:`분산 데이터베이스는 물리적으로 여러 사이트에 흩어진 데이터를 사용자에게 <b>하나의 논리적 데이터베이스처럼</b> 보이게 합니다. 이를 위해 분산 사실을 숨기는 성질을 투명성이라 합니다.
<table><tr><th>투명성</th><th>사용자가 몰라도 되는 것</th><th>관련 기술</th></tr>
<tr><td>위치(Location)</td><td>데이터의 저장 사이트</td><td>전역 디렉터리</td></tr>
<tr><td>중복(Replication)</td><td>복제본 존재 여부</td><td>복제 일관성 유지</td></tr>
<tr><td>병행(Concurrency)</td><td>다른 트랜잭션의 동시 수행</td><td>분산 잠금, 타임스탬프</td></tr>
<tr><td>장애(Failure)</td><td>사이트·통신망 고장</td><td>2단계 커밋(2PC)</td></tr>
<tr><td>분할(Fragmentation)</td><td>데이터가 수평·수직 분할된 사실</td><td>분할 질의 처리</td></tr></table>
분산 DB의 구성 요소는 분산 처리기, 분산 데이터베이스, 통신 네트워크입니다. 장점은 지역 자치성, 신뢰성·가용성 향상, 점진적 확장이며 단점은 설계·관리 복잡성, 처리 비용 증가, 보안 통제 어려움입니다.`,
   trap:"'중복 투명성'을 데이터 중복을 없앤다는 의미로 오해하기 쉽습니다. 중복은 존재하지만 사용자가 의식하지 않게 하는 것입니다.",
   tip:"위중병장(위치·중복·병행·장애) + 분할.",
   kw:["위치 투명성","중복 투명성","병행 투명성","장애 투명성","2PC"]},

  {key:"크리덴셜 스터핑과 계정 공격 기법 비교",
   body:`<b>크리덴셜 스터핑</b>은 이미 유출된 아이디·비밀번호 쌍을 다른 서비스에 자동으로 대입하는 공격으로, 비밀번호 재사용 습관을 노립니다. 실제로 유효했던 계정 정보이므로 성공률이 높고 정상 로그인처럼 보여 탐지가 어렵습니다.
<table><tr><th>기법</th><th>방식</th></tr>
<tr><td>무차별 대입(Brute Force)</td><td>가능한 모든 조합 시도</td></tr>
<tr><td>사전 공격(Dictionary)</td><td>자주 쓰는 단어 목록 대입</td></tr>
<tr><td>크리덴셜 스터핑</td><td>유출된 실제 ID/PW 쌍 대입</td></tr>
<tr><td>패스워드 스프레잉</td><td>흔한 비밀번호 하나를 여러 계정에 시도</td></tr>
<tr><td>레인보우 테이블</td><td>해시값-평문 사전 계산표로 해시 역추적</td></tr></table>
대응책은 다중 인증(MFA), 비밀번호 재사용 금지, 로그인 시도 횟수 제한, CAPTCHA, 비정상 IP·기기 탐지입니다. 레인보우 테이블은 솔트(Salt)로 막고, 무차별 대입은 계정 잠금으로 막는 식으로 대응책을 짝지어 기억하세요.`,
   trap:"무차별 대입 공격과 혼동하기 쉽습니다. '유출된 계정 정보 재사용'이라는 단서가 있으면 크리덴셜 스터핑입니다.",
   tip:"크리덴셜(자격 증명)을 스터핑(속 채워 넣기) → 훔친 열쇠 꾸러미를 다른 집 문에 꽂아 보기.",
   kw:["크리덴셜 스터핑","무차별 대입","패스워드 스프레잉","MFA","비밀번호 재사용"]},

  {key:"키 개수: 대칭키 n(n-1)/2, 공개키 2n",
   body:`대칭키 방식은 통신하는 <b>두 사람마다</b> 고유한 비밀키 하나가 필요하므로 n명 중 2명을 고르는 조합 수 <b>nC2 = n(n−1)/2</b>입니다. 공개키 방식은 사람마다 공개키·개인키 <b>한 쌍</b>만 있으면 되므로 <b>2n</b>개(공개키 n개만 세면 n개)입니다.
<table><tr><th>사용자 수 n</th><th>대칭키 n(n−1)/2</th><th>공개키 2n</th></tr>
<tr><td>10</td><td>45</td><td>20</td></tr>
<tr><td>50</td><td>1225</td><td>100</td></tr>
<tr><td>60</td><td>1770</td><td>120</td></tr>
<tr><td>100</td><td>4950</td><td>200</td></tr></table>
사용자가 m명 추가될 때 대칭키 증가분은 <b>m × 기존 n + m(m−1)/2</b>로도 구할 수 있습니다(50명에 10명 추가: 500 + 45 = 545).<br>
대칭키는 속도가 빠르지만 키 분배·관리가 어렵고(DES, AES, SEED, ARIA), 공개키는 키 관리가 쉽지만 느립니다(RSA, ECC, ElGamal). 실무에서는 공개키로 대칭키(세션키)를 교환하고 데이터는 대칭키로 암호화하는 <b>하이브리드 방식</b>을 사용합니다.`,
   trap:"대칭키를 n(n−1)로 계산해 2배로 답하거나, 공개키를 n개로만 답하는 실수. 문제에서 '공개키와 개인키 모두'인지 확인하세요.",
   tip:"대칭키는 악수 횟수(n(n−1)/2), 공개키는 1인 1쌍(2n).",
   kw:["대칭키","공개키","n(n-1)/2","2n","키 분배","하이브리드 암호"]},

  {key:"AS와 BGP: IGP vs EGP 라우팅 프로토콜",
   body:`<b>AS(Autonomous System)</b>는 하나의 관리 주체가 단일 라우팅 정책으로 운영하는 네트워크 집합이며 ASN으로 식별됩니다. 라우팅 프로토콜은 AS 내부용 <b>IGP</b>와 AS 간 <b>EGP</b>로 나뉩니다.
<table><tr><th>프로토콜</th><th>구분</th><th>알고리즘</th><th>특징</th></tr>
<tr><td>RIP</td><td>IGP</td><td>거리 벡터(벨만-포드)</td><td>홉 수, 최대 15홉, UDP 520</td></tr>
<tr><td>OSPF</td><td>IGP</td><td>링크 상태(다익스트라)</td><td>대규모, 영역(Area) 분할</td></tr>
<tr><td>EIGRP</td><td>IGP</td><td>하이브리드</td><td>시스코 계열</td></tr>
<tr><td>BGP</td><td>EGP</td><td>경로 벡터</td><td>TCP 179, AS_PATH, 정책 기반</td></tr></table>
BGP는 목적지까지 거치는 AS 번호 목록(AS_PATH)을 주고받아 자기 AS 번호가 경로에 있으면 루프로 판단해 버립니다. 같은 AS 내부의 BGP 연결을 iBGP, 서로 다른 AS 간 연결을 eBGP라 합니다.<br>
관련 개념인 <b>SDN</b>은 네트워크의 제어 평면(Control Plane)과 데이터 평면(Data Plane)을 분리하여 중앙 컨트롤러가 소프트웨어로 네트워크를 제어하는 구조이며, 대표 프로토콜은 OpenFlow입니다.`,
   trap:"BGP를 IGP로, OSPF를 AS 간 프로토콜로 혼동하는 실수. 'AS 사이', 'TCP 179', '경로 벡터'가 보이면 BGP입니다.",
   tip:"AS 안은 RIP·OSPF, AS 밖(Border)은 BGP.",
   kw:["AS","BGP","IGP","EGP","경로 벡터","SDN"]},

  {key:"CPM 임계 경로: 전진·후진 계산과 여유 시간",
   body:`<b>CPM(Critical Path Method)</b>은 작업 간 선후 관계와 기간으로 프로젝트 최단 완료 기간을 구합니다. 임계 경로는 시작부터 끝까지 <b>가장 긴 경로</b>이며, 이 경로의 작업이 하루라도 지연되면 프로젝트 전체가 지연됩니다.
<pre>전진 계산: ES = 선행 작업 EF 중 최댓값, EF = ES + 기간
후진 계산: LF = 후행 작업 LS 중 최솟값, LS = LF - 기간
총 여유(Total Float) = LS - ES = LF - EF
임계 작업 = 총 여유가 0인 작업</pre>
<table><tr><th>기법</th><th>특징</th></tr>
<tr><td>CPM</td><td>확정적 기간, 임계 경로 중심</td></tr>
<tr><td>PERT</td><td>낙관·보통·비관 3점 추정, (a+4m+b)/6</td></tr>
<tr><td>간트 차트</td><td>막대로 일정 표시, 선후 관계 표현 약함</td></tr></table>
경로가 적을 때는 모든 경로 길이를 나열해 최댓값을 고르는 방법이 빠르지만, 여유 시간 문제는 반드시 후진 계산까지 해야 합니다. PERT 기댓값 예: 낙관 2, 보통 5, 비관 14이면 (2+20+14)/6 = 6입니다.`,
   trap:"전진 계산에서 선행 작업이 여러 개일 때 최솟값을 고르는 실수. 모든 선행 작업이 끝나야 시작하므로 최댓값입니다. 임계 경로를 '가장 짧은 경로'로 착각하지 마세요.",
   tip:"앞으로 갈 땐 MAX, 뒤로 갈 땐 MIN, 여유 0이 임계.",
   kw:["CPM","임계 경로","ES/EF","LS/LF","총 여유 시간","PERT"]},

  {key:"페이징 주소 변환: 몫=페이지, 나머지=오프셋",
   body:`페이징 시스템에서 논리 주소는 <b>(페이지 번호, 오프셋)</b>으로 나뉩니다. 페이지 번호는 <b>주소 ÷ 페이지 크기의 몫</b>, 오프셋은 <b>나머지</b>이며, 페이지 테이블에서 페이지 번호를 프레임 번호로 바꾼 뒤 <b>물리 주소 = 프레임 번호 × 페이지 크기 + 오프셋</b>으로 구합니다.<br>
페이지 크기가 2의 거듭제곱이면 비트로 나눌 수 있습니다. 32비트 주소, 4KB(2¹²) 페이지라면 하위 12비트가 오프셋, 상위 20비트가 페이지 번호이므로 페이지 테이블 엔트리는 최대 2²⁰개입니다.
<table><tr><th>구분</th><th>페이징</th><th>세그먼테이션</th></tr>
<tr><td>분할 단위</td><td>고정 크기(페이지)</td><td>가변 크기(논리 단위)</td></tr>
<tr><td>단편화</td><td>내부 단편화</td><td>외부 단편화</td></tr>
<tr><td>주소 형식</td><td>(페이지 번호, 오프셋)</td><td>(세그먼트 번호, 변위)</td></tr>
<tr><td>테이블 정보</td><td>프레임 번호</td><td>시작 주소(기준) + 길이(한계)</td></tr></table>
세그먼테이션에서는 변위가 세그먼트 길이 이상이면 <b>트랩(세그먼테이션 폴트)</b>이 발생합니다. 주소 변환 속도를 높이기 위해 페이지 테이블 캐시인 <b>TLB</b>를 사용합니다.`,
   trap:"물리 주소 계산 시 페이지 번호(4)를 그대로 곱하는 실수. 반드시 페이지 테이블에서 찾은 프레임 번호(7)를 곱해야 합니다.",
   tip:"몫은 바꾸고(페이지→프레임), 나머지는 그대로(오프셋).",
   kw:["페이지 번호","오프셋","프레임","페이지 테이블","세그먼테이션","TLB"]},

  {key:"배열 매개변수 전달과 선택 정렬·뒤집기",
   body:`C에서 배열을 함수에 넘기면 배열 전체가 복사되지 않고 <b>첫 원소의 주소</b>가 전달되므로, 함수 안에서 원소를 바꾸면 호출한 쪽 배열이 직접 변경됩니다(<code>int a[]</code>와 <code>int *a</code>는 매개변수로서 동일).<br>
<b>선택 정렬</b>은 매 회전마다 남은 구간에서 최솟값(또는 최댓값)의 <b>위치를 찾은 뒤 한 번만 교환</b>합니다. k회전 후에는 앞의 k개만 확정되고 나머지는 교환에 의해 순서가 섞여 있습니다.
<table><tr><th>정렬</th><th>1회전 동작</th><th>비교 횟수</th></tr>
<tr><td>선택 정렬</td><td>최솟값 위치 찾아 맨 앞과 교환</td><td>n(n−1)/2</td></tr>
<tr><td>버블 정렬</td><td>인접 원소 비교·교환, 큰 값이 뒤로</td><td>n(n−1)/2</td></tr>
<tr><td>삽입 정렬</td><td>현재 원소를 앞쪽 정렬 구간에 삽입</td><td>최선 n−1</td></tr></table>
뒤집기 함수의 <code>a[s++] = a[e]; a[e--] = t;</code>는 각 문장에서 변수가 한 번씩만 변경되므로 안전합니다. 반면 <code>a[i] = i++</code>처럼 한 식에서 같은 변수를 읽고 수정하는 코드는 정의되지 않은 동작입니다.`,
   trap:"부분 정렬(k=3)인데 전체 정렬 결과를 쓰거나, 비교 연산자(&gt;)를 보지 않고 오름차순으로 정렬하는 실수. 교환으로 밀려난 원소의 위치도 주의하세요.",
   tip:"선택 정렬은 '찾고 나서 한 번 교환', 회전 수만큼만 앞이 확정된다.",
   kw:["배열 매개변수","선택 정렬","부분 정렬","in-place 뒤집기","후위 증감"]},

  {key:"인터페이스·추상 클래스·super 호출과 동적 바인딩",
   body:`인터페이스의 필드는 자동으로 <b>public static final</b>, 추상 메서드는 <b>public abstract</b>이며, Java 8부터 <b>default 메서드</b>와 static 메서드를 가질 수 있습니다. 구현 클래스에서 인터페이스 메서드를 재정의할 때는 반드시 public이어야 합니다.<br>
<code>super.info()</code>로 부모 메서드를 호출해도 그 안에서 호출되는 다른 인스턴스 메서드(area)는 <b>여전히 실제 객체 기준</b>으로 동적 바인딩됩니다. 이것이 템플릿 메서드 패턴의 원리입니다.
<table><tr><th>구분</th><th>인터페이스</th><th>추상 클래스</th></tr>
<tr><td>키워드</td><td>implements (다중 가능)</td><td>extends (단일)</td></tr>
<tr><td>필드</td><td>상수만(static final)</td><td>일반 필드 가능</td></tr>
<tr><td>생성자</td><td>없음</td><td>있음(직접 new 불가)</td></tr>
<tr><td>메서드</td><td>abstract, default, static</td><td>abstract + 일반 메서드</td></tr></table>
static 필드는 객체 수와 상관없이 하나만 존재하므로, 출력 시점에 이미 생성된 모든 객체의 누적값이 반영됩니다. 부모에 기본 생성자가 없으면 자식 생성자 첫 줄에서 <code>super(인자)</code>를 명시해야 합니다.`,
   trap:"super.info() 안의 area()를 Base의 area()로 계산해 'B6'으로 답하는 실수. 또 cnt를 첫 객체 생성 직후 값(11)으로 착각하기 쉽습니다.",
   tip:"super는 '그 메서드만' 부모 것, 그 안에서 부르는 메서드는 다시 자식 것.",
   kw:["인터페이스","추상 클래스","default 메서드","super","동적 바인딩","static 공유"]},

  {key:"bin·oct·hex·format·int(x, 진법) 변환",
   body:`Python의 진법 변환 함수는 <b>접두어 유무</b>와 <b>대소문자</b>가 핵심 함정입니다. 내장 함수 bin/oct/hex는 접두어(0b, 0o, 0x)가 붙은 문자열을 반환하고, <code>format()</code>은 접두어 없이 반환합니다(<code>'#b'</code>처럼 #을 붙이면 접두어 포함).
<table><tr><th>식 (n = 45)</th><th>결과</th></tr>
<tr><td><code>bin(n)</code></td><td>'0b101101'</td></tr>
<tr><td><code>oct(n)</code></td><td>'0o55'</td></tr>
<tr><td><code>hex(n)</code></td><td>'0x2d' (소문자)</td></tr>
<tr><td><code>format(n, 'X')</code></td><td>'2D' (대문자)</td></tr>
<tr><td><code>format(n, '08b')</code></td><td>'00101101'</td></tr>
<tr><td><code>format(n, '#x')</code></td><td>'0x2d'</td></tr></table>
반대로 <code>int('1F', 16)</code>처럼 문자열과 진법을 주면 10진 정수로 바꿉니다. <code>int('0b101', 0)</code>은 접두어로 진법을 자동 판단합니다.<br>
f-string에서도 같은 형식 지정자를 씁니다: <code>f"{n:08b}"</code>, <code>f"{n:&gt;5}"</code>(오른쪽 정렬), <code>f"{3.14159:.2f}"</code>(소수 둘째 자리). 정수의 1비트 개수는 <code>bin(n).count('1')</code>로 구합니다.`,
   trap:"bin(n)의 결과에 '0b'가 붙는 것을 빼먹거나, hex는 소문자·format 'X'는 대문자라는 차이를 놓치는 실수.",
   tip:"내장 함수는 접두어 O, format은 접두어 X, 대문자 X면 대문자 출력.",
   kw:["bin","hex","format","int(x, base)","진법 변환","f-string"]},

  {key:"CHECK · FOREIGN KEY · ON DELETE CASCADE 제약",
   body:`테이블 생성 시 무결성을 보장하는 제약 조건은 다음과 같습니다.
<table><tr><th>제약 조건</th><th>역할</th></tr>
<tr><td>PRIMARY KEY</td><td>NOT NULL + UNIQUE, 개체 무결성</td></tr>
<tr><td>FOREIGN KEY ... REFERENCES</td><td>다른 테이블 기본키 참조, 참조 무결성</td></tr>
<tr><td>UNIQUE</td><td>중복 불허(NULL은 허용)</td></tr>
<tr><td>NOT NULL</td><td>NULL 불허</td></tr>
<tr><td>CHECK</td><td>값의 범위·조건 제한, 도메인 무결성</td></tr>
<tr><td>DEFAULT</td><td>값 미입력 시 기본값</td></tr></table>
외래키에는 부모 행이 삭제·변경될 때의 <b>참조 동작</b>을 지정할 수 있습니다: <b>CASCADE</b>(자식도 연쇄 삭제·변경), <b>SET NULL</b>(자식 외래키를 NULL로), <b>SET DEFAULT</b>(기본값으로), <b>RESTRICT / NO ACTION</b>(자식이 있으면 부모 삭제 거부).<br>
제약 조건에 이름을 붙일 때는 <code>CONSTRAINT 이름 CHECK (...)</code> 형식을 사용하고, 나중에 <code>ALTER TABLE 테이블 DROP CONSTRAINT 이름</code>으로 제거합니다. 참고로 DROP TABLE ... CASCADE는 테이블 삭제 시 참조하는 객체까지 함께 삭제하는 별개의 문법입니다.`,
   trap:"REFERENCES를 REFERENCE로 단수형으로 쓰는 실수, ON DELETE CASCADE를 ON DELETE SET NULL과 혼동하는 실수가 많습니다.",
   tip:"FOREIGN KEY(내 컬럼) REFERENCES 부모(부모 컬럼) ON DELETE CASCADE — '외래키는 참조들(복수)을 연쇄로'.",
   kw:["CHECK","FOREIGN KEY","REFERENCES","ON DELETE CASCADE","SET NULL","RESTRICT"]},

  {key:"OLAP 연산: Roll-up, Drill-down, Slice, Dice, Pivot",
   body:`<b>OLAP(온라인 분석 처리)</b>은 데이터 웨어하우스의 다차원 데이터 큐브를 사용자가 대화식으로 분석하는 기술입니다. 거래 처리 중심의 OLTP와 대비됩니다.
<table><tr><th>연산</th><th>의미</th><th>예</th></tr>
<tr><td>Roll-up</td><td>상세 → 요약(집계)</td><td>월 → 연, 도시 → 국가</td></tr>
<tr><td>Drill-down</td><td>요약 → 상세</td><td>연 → 분기 → 월</td></tr>
<tr><td>Slice</td><td>한 차원을 값 하나로 고정</td><td>제품 = 노트북</td></tr>
<tr><td>Dice</td><td>여러 차원에 범위 조건, 하위 큐브</td><td>2024~2025년 and 서울·부산</td></tr>
<tr><td>Pivot(Rotate)</td><td>축(행·열) 회전</td><td>행 지역 ↔ 열 연도</td></tr></table>
같은 계열의 <b>데이터 마이닝</b> 기법도 함께 출제됩니다: <b>연관 규칙</b>(장바구니 분석, 지지도·신뢰도), <b>순차 패턴</b>(시간 순서가 있는 연관), <b>분류</b>(정답 레이블이 있는 예측, 의사결정 트리), <b>군집(클러스터링)</b>(레이블 없이 유사한 것끼리 묶기).<br>
OLAP 구현 방식에는 ROLAP(관계형 DB 기반), MOLAP(다차원 DB 기반), HOLAP(혼합)이 있습니다.`,
   trap:"Slice와 Dice의 혼동: 한 차원을 하나의 값으로 고정하면 Slice, 둘 이상 차원에 조건을 주어 작은 큐브를 만들면 Dice입니다. Roll-up과 Drill-down 방향도 자주 뒤바꿔 씁니다.",
   tip:"Roll-up은 말아 올려 요약, Drill-down은 드릴로 파고들어 상세, Slice는 한 조각, Dice는 주사위(작은 큐브).",
   kw:["OLAP","Roll-up","Drill-down","Slice","Dice","Pivot"]},

  {key:"해시 vs MAC vs 전자서명: 부인 방지 여부",
   body:`세 기법 모두 무결성을 제공하지만 <b>키의 종류</b>에 따라 제공하는 보안 서비스가 달라집니다.
<table><tr><th>기법</th><th>키</th><th>무결성</th><th>메시지 인증</th><th>부인 방지</th><th>예</th></tr>
<tr><td>해시</td><td>없음</td><td>O</td><td>X</td><td>X</td><td>SHA-256, MD5</td></tr>
<tr><td>MAC</td><td>공유 비밀키</td><td>O</td><td>O</td><td>X</td><td>HMAC, CBC-MAC</td></tr>
<tr><td>전자서명</td><td>개인키/공개키</td><td>O</td><td>O</td><td>O</td><td>RSA, DSA, ECDSA</td></tr></table>
전자서명은 송신자가 해시값을 <b>자신의 개인키로 서명</b>하고, 수신자는 <b>송신자의 공개키로 검증</b>합니다. 반대로 기밀성을 위한 공개키 암호화는 <b>수신자의 공개키로 암호화</b>하고 수신자의 개인키로 복호화합니다.<br>
해시 함수의 요건은 일방향성(역상 저항성), 제2 역상 저항성, 충돌 저항성입니다. 부인 방지에는 송신 부인 방지(전자서명)와 수신 부인 방지(수신 확인 서명)가 있으며, 공개키의 신뢰성은 <b>PKI와 인증서(CA)</b>로 보장합니다.`,
   trap:"MAC도 인증을 제공하므로 부인 방지가 된다고 착각하는 실수. 키를 양쪽이 공유하므로 누가 만들었는지 제3자에게 증명할 수 없습니다. 서명 검증 키를 '수신자 공개키'로 쓰는 실수도 흔합니다.",
   tip:"서명은 내 개인키로, 암호화는 상대 공개키로. 부인 방지는 나만 가진 키(개인키)가 있어야 가능.",
   kw:["해시","MAC","HMAC","전자서명","부인 방지","PKI"]},

  {key:"와일드카드 마스크와 사설 IP 범위",
   body:`<b>와일드카드 마스크</b>는 서브넷 마스크의 비트를 반전한 값으로, ACL·OSPF 설정에서 0은 '일치해야 함', 1은 '상관없음'을 뜻합니다. 계산은 <code>255.255.255.255 − 서브넷 마스크</code>로 간단히 구합니다.
<table><tr><th>프리픽스</th><th>서브넷 마스크</th><th>와일드카드</th></tr>
<tr><td>/24</td><td>255.255.255.0</td><td>0.0.0.255</td></tr>
<tr><td>/21</td><td>255.255.248.0</td><td>0.0.7.255</td></tr>
<tr><td>/20</td><td>255.255.240.0</td><td>0.0.15.255</td></tr>
<tr><td>/27</td><td>255.255.255.224</td><td>0.0.0.31</td></tr></table>
<b>사설 IP(RFC 1918)</b>: 10.0.0.0/8, 172.16.0.0/12(172.16~172.31), 192.168.0.0/16. 그 밖의 특수 주소로 루프백 127.0.0.0/8, APIPA(자동 사설 IP) 169.254.0.0/16, 멀티캐스트(D 클래스) 224.0.0.0~239.255.255.255가 있습니다.<br>
IP 클래스 첫 옥텟 범위는 A 1~126, B 128~191, C 192~223, D 224~239, E 240~255입니다.`,
   trap:"172.16.0.0/12를 172.16.x.x만 사설로 알거나, 반대로 172.x 전체를 사설로 아는 실수. 172.16 ~ 172.31까지만 사설입니다.",
   tip:"와일드카드 = 255에서 빼기. 사설은 '10 하나, 172는 16~31, 192.168'.",
   kw:["와일드카드 마스크","ACL","사설 IP","RFC 1918","APIPA","IP 클래스"]},

  {key:"회귀·스모크 테스트와 부하·스트레스 테스트",
   body:`테스트는 <b>목적</b>에 따라 구분됩니다. 회귀 테스트는 변경 영향 확인, 스모크 테스트는 빌드 기본 동작 확인이 목적이고, 성능 테스트 계열은 부하의 크기와 지속 시간으로 구별합니다.
<table><tr><th>테스트</th><th>목적</th></tr>
<tr><td>회귀(Regression)</td><td>변경 후 기존 기능에 새 결함이 없는지 재확인</td></tr>
<tr><td>스모크(Smoke)</td><td>새 빌드 핵심 기능의 빠른 기본 확인</td></tr>
<tr><td>부하(Load)</td><td>예상 부하를 늘리며 임계점까지 성능 측정</td></tr>
<tr><td>스트레스(Stress)</td><td>임계점 초과 과부하에서 실패·복구 확인</td></tr>
<tr><td>스파이크(Spike)</td><td>사용자 수가 순간 급증할 때의 반응</td></tr>
<tr><td>내구성(Soak/Endurance)</td><td>장시간 지속 부하에서 메모리 누수 등 확인</td></tr></table>
목적 기반 테스트로는 회복(Recovery), 안전(Security), 성능(Performance), 구조(Structure), 회귀(Regression), 병행(Parallel) 테스트가 있습니다. 개발 단계 기준 V-모델 순서는 단위 → 통합 → 시스템 → <b>인수</b> 테스트이며, 인수 테스트는 사용자 관점에서 요구사항 충족을 확인합니다.`,
   trap:"부하 테스트와 스트레스 테스트의 경계: '임계점까지 성능 측정'은 부하, '한계를 넘겨 실패 양상 확인'은 스트레스입니다.",
   tip:"회귀는 뒤돌아보기, 스모크는 전원 켜서 연기 나나 보기, 부하는 한계까지, 스트레스는 한계 너머.",
   kw:["회귀 테스트","스모크 테스트","부하 테스트","스트레스 테스트","인수 테스트"]},

  {key:"2차원 배열 전치와 중첩 반복 범위",
   body:`정사각 행렬의 <b>전치(Transpose)</b>는 <code>a[i][j]</code>와 <code>a[j][i]</code>를 교환하는 것으로, 반드시 <b>대각선 한쪽(상삼각 또는 하삼각)</b>만 순회해야 합니다. 안쪽 반복을 j = 0부터 돌리면 각 쌍을 두 번 교환해 원래 행렬로 돌아갑니다.<br>
중첩 반복의 실행 횟수는 범위로 계산합니다.
<table><tr><th>반복 형태 (n=3)</th><th>대상</th><th>횟수</th></tr>
<tr><td>j = 0 ~ n−1</td><td>전체</td><td>n² = 9</td></tr>
<tr><td>j = i ~ n−1</td><td>대각선 포함 상삼각</td><td>n(n+1)/2 = 6</td></tr>
<tr><td>j = i+1 ~ n−1</td><td>대각선 제외 상삼각</td><td>n(n−1)/2 = 3</td></tr>
<tr><td>j = 0 ~ i</td><td>대각선 포함 하삼각</td><td>6</td></tr></table>
대각선 원소의 조건은 주대각선 <code>i == j</code>, 부대각선 <code>i + j == n − 1</code>입니다. 전치 후 행렬에서 하삼각 합은 전치 전 상삼각 합과 같다는 성질도 검산에 활용할 수 있습니다.`,
   trap:"두 번째 반복을 원래 배열 기준으로 계산하는 실수. 전치는 배열을 직접 바꾸므로 이후 연산은 전치 후 값으로 해야 합니다.",
   tip:"전치는 반쪽만 돌린다, 다 돌리면 원상복구.",
   kw:["전치 행렬","상삼각","하삼각","중첩 반복 횟수","대각선"]},

  {key:"Mediator · Memento · Visitor 행위 패턴",
   body:`GoF 패턴은 생성(5), 구조(7), 행위(11)로 나뉘며, 행위 패턴은 객체 간 책임 분배와 상호작용 방식을 다룹니다.
<table><tr><th>패턴</th><th>핵심</th><th>키워드</th></tr>
<tr><td>Mediator</td><td>객체 간 통신을 중재자에 집중</td><td>관제탑, M:N → 1:N</td></tr>
<tr><td>Memento</td><td>상태 저장·복원</td><td>Undo, Originator, Caretaker</td></tr>
<tr><td>Visitor</td><td>구조는 그대로 두고 연산 분리</td><td>accept, visit, 더블 디스패치</td></tr>
<tr><td>Observer</td><td>상태 변화를 구독자들에게 통지</td><td>1:N, 발행-구독</td></tr>
<tr><td>Command</td><td>요청을 객체로 캡슐화</td><td>실행 취소, 큐잉</td></tr>
<tr><td>State / Strategy</td><td>상태별 행위 변경 / 알고리즘 교체</td><td>위임</td></tr></table>
Memento는 상태를 보관해 되돌리는 패턴이고, Command도 실행 취소를 지원하지만 '요청(명령) 자체'를 객체로 만드는 데 초점이 있습니다. 구조 패턴에는 Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy가 있습니다.`,
   trap:"Mediator와 Observer의 혼동: 중재자가 객체 간 통신을 조율하면 Mediator, 하나의 상태 변화를 여러 구독자에게 알리면 Observer입니다. Memento와 Command의 Undo 단서도 구별하세요.",
   tip:"관제탑 = Mediator, 세이브 포인트 = Memento, 방문 점검원 = Visitor.",
   kw:["Mediator","Memento","Visitor","Observer","GoF 행위 패턴"]}
]);
