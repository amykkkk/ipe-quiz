const SET9_EMP = `<div class="tblwrap"><table><tr><th colspan="4">[사원]</th></tr>
<tr><th>사번</th><th>이름</th><th>부서코드</th><th>급여</th></tr>
<tr><td>101</td><td>김민수</td><td>D1</td><td>300</td></tr>
<tr><td>102</td><td>이서연</td><td>D2</td><td>450</td></tr>
<tr><td>103</td><td>박준호</td><td>D1</td><td>350</td></tr>
<tr><td>104</td><td>최유리</td><td>D3</td><td>500</td></tr>
<tr><td>105</td><td>정하늘</td><td>D2</td><td>250</td></tr>
<tr><td>106</td><td>강도윤</td><td>NULL</td><td>400</td></tr></table></div>`;

const SET9_DEPT = `<div class="tblwrap"><table><tr><th colspan="3">[부서]</th></tr>
<tr><th>부서코드</th><th>부서명</th><th>지역</th></tr>
<tr><td>D1</td><td>개발</td><td>서울</td></tr>
<tr><td>D2</td><td>영업</td><td>부산</td></tr>
<tr><td>D3</td><td>인사</td><td>서울</td></tr>
<tr><td>D4</td><td>기획</td><td>대전</td></tr></table></div>`;

const EXAM = {
title: "정보처리기사 실기 예상문제 제9회 (2026년 제3회 대비)",
questions: [
{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오. (값 사이는 한 칸씩 띄어 쓰시오.)",
 code:`
#include <stdio.h>

int main() {
    int a[5] = {10, 20, 30, 40, 50};
    int *p = a;
    int x, y, z, w;

    x = *p++;
    y = (*p)++;
    z = *++p;
    w = ++*p;

    printf("%d %d %d %d %d", x, y, z, w, *(p - 1) + p[1]);
    return 0;
}`,
 ans:[["10 20 30 31 61"]],
 exp:`후위 <code>++</code>는 <code>*</code>보다 우선순위가 높고, 전위 <code>++</code>와 <code>*</code>는 같은 순위(오른쪽→왼쪽 결합)입니다.
<pre>x = *p++   → *(p++) : a[0]=10 을 읽고 p → a[1]        x = 10
y = (*p)++ → a[1] 값을 후위 증가: 20 반환, a[1] = 21   y = 20
z = *++p   → p를 먼저 a[2]로 이동 후 참조             z = 30
w = ++*p   → a[2] 값을 전위 증가: a[2] = 31            w = 31
마지막: p는 a[2] → *(p-1) = a[1] = 21, p[1] = a[3] = 40 → 61</pre>
결과: <code>10 20 30 31 61</code> — <code>(*p)++</code>는 포인터가 아닌 <b>값</b>을 바꾸므로 a[1]이 21이 된 점이 함정입니다.`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
class Parent {
    int a = 10;
    Parent() {
        System.out.print("P" + a + " ");
        show();
    }
    void show() { System.out.print("PS" + a + " "); }
}
class Child extends Parent {
    int b = 20;
    String s = "hi";
    Child() {
        super();
        System.out.print("C" + b + " ");
        show();
    }
    void show() { System.out.print("CS" + b + s + " "); }
}
public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.print(p.a);
    }
}`,
 ans:[["P10 CS0null C20 CS20hi 10","P10CS0nullC20CS20hi10"]],
 exp:`객체 생성 순서: ① 모든 필드를 기본값(0, null)으로 할당 → ② <code>super()</code> 호출(부모 필드 초기화 → 부모 생성자 본문) → ③ <b>자식 필드 초기화</b> → ④ 자식 생성자 본문
<pre>Parent 필드 a = 10
Parent() : "P10 " 출력 → show() 호출
           실제 객체는 Child → Child.show() 실행 (동적 바인딩)
           이 시점에 b, s는 아직 초기화 전 → b = 0, s = null → "CS0null "
Child 필드 초기화 : b = 20, s = "hi"
Child() 본문 : "C20 " 출력 → show() → "CS20hi "
main : p.a → 10</pre>
결과: <code>P10 CS0null C20 CS20hi 10</code> — 부모 생성자에서 오버라이딩된 메서드를 호출하면 자식 필드가 기본값 상태로 보이는 것이 핵심 함정입니다.`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
cnt = 0
def hanoi(n, src, dst, via):
    global cnt
    cnt += 1
    if n == 0:
        return 0
    m = hanoi(n - 1, src, via, dst)
    m += 1
    m += hanoi(n - 1, via, dst, src)
    return m

print(hanoi(4, 'A', 'C', 'B'), cnt)`,
 ans:[["15 31"]],
 exp:`반환값 m은 <b>원판 이동 횟수</b>, cnt는 <b>함수 호출 횟수</b>입니다.<br>
• 이동 횟수 M(n) = 2·M(n−1) + 1, M(0) = 0 → M(4) = 2⁴ − 1 = <b>15</b><br>
• 호출 횟수 C(n) = 2·C(n−1) + 1, C(0) = 1 (n=0도 호출되어 cnt 증가) → C(1)=3, C(2)=7, C(3)=15, C(4)=<b>31</b>
<pre>n : 0  1  2  3   4
M : 0  1  3  7  15
C : 1  3  7  15 31</pre>
결과: <code>15 31</code> — 기저 조건이 n == 0이므로 호출 횟수는 이동 횟수보다 2ⁿ만큼 많습니다(C(n) = 2ⁿ⁺¹ − 1).`},

{cat:"SQL",
 q:`다음 [사원], [부서] 테이블에 대해 아래 두 SQL문을 실행했을 때 ①, ②의 결과값을 각각 쓰시오.` + SET9_EMP + SET9_DEPT + `<div class="box">① <code>SELECT SUM(E.급여) FROM 사원 E JOIN 부서 D ON E.부서코드 = D.부서코드 WHERE D.지역 = '서울';</code><br>
② <code>SELECT COUNT(DISTINCT D.지역) FROM 사원 E INNER JOIN 부서 D ON E.부서코드 = D.부서코드;</code></div>`,
 ans:[["1150"],["2"]],
 exp:`INNER JOIN은 조인 조건이 일치하는 행만 남깁니다. 부서코드가 NULL인 106(강도윤)과 사원이 없는 D4(기획, 대전)는 결과에서 제외됩니다.
<pre>사번  부서코드  급여  지역
101   D1        300   서울
102   D2        450   부산
103   D1        350   서울
104   D3        500   서울
105   D2        250   부산</pre>
① 서울: 300 + 350 + 500 = <b>1150</b><br>
② 조인 결과의 지역: 서울, 부산 → 중복 제거 시 <b>2</b> (대전은 매칭되는 사원이 없어 제외 — 부서 테이블만 보고 3이라 답하면 오답)`},

{cat:"데이터베이스",
 q:`다음은 트랜잭션의 상태에 대한 설명이다. 괄호에 들어갈 알맞은 상태를 쓰시오.
<div class="box">• ( ① ): 트랜잭션이 실행을 시작하였거나 실행 중인 상태<br>
• ( ② ): 트랜잭션의 마지막 연산까지 실행했지만, Commit 연산이 실행되기 직전의 상태<br>
• ( ③ ): 트랜잭션 실행 중 오류가 발생하여 실행이 중단된 상태<br>
• ( ④ ): 트랜잭션이 비정상적으로 종료되어 Rollback 연산을 수행한 상태<br>
• ( ⑤ ): 트랜잭션이 성공적으로 종료되어 Commit 연산을 실행한 후의 상태</div>`,
 ans:[["활동","Active","활동 상태","실행"],["부분 완료","부분완료","Partially Committed","부분 완료 상태"],["실패","Failed","실패 상태"],["철회","Aborted","철회 상태","중단"],["완료","Committed","완료 상태","커밋"]],
 exp:`<pre>활동(Active) → 부분 완료(Partially Committed) → 완료(Committed)
     ↓                    ↓
   실패(Failed) ──────→ 철회(Aborted)</pre>
• <b>부분 완료</b>: 마지막 연산은 끝났지만 아직 Commit 전 — 이 상태에서도 실패로 갈 수 있습니다.<br>
• <b>철회</b>: Rollback 후 트랜잭션을 재시작하거나 폐기합니다.<br>
'실패'(오류로 중단)와 '철회'(Rollback 수행)를 혼동하지 않도록 주의합니다.`},

{cat:"보안",
 q:`다음 설명에 해당하는 악성 프로그램의 유형을 쓰시오.
<div class="box">다른 프로그램(숙주 파일)에 기생하지 않고 <b>독립적으로 실행</b>되며, 스스로를 <b>복제</b>하여 네트워크나 이메일 등을 통해 다른 시스템으로 <b>자동 전파</b>된다. 대량 복제로 네트워크 대역폭과 시스템 자원을 고갈시키며, 대표적인 예로 슬래머, 코드레드 등이 있다.</div>`,
 ans:[["웜","Worm","웜 바이러스","웜바이러스","웜(Worm)"]],
 exp:`<b>웜(Worm)</b>: 독립 실행 + 자기 복제 + 네트워크 자동 전파<br>
• <b>바이러스</b>: 다른 파일에 감염(숙주 필요)되어 사용자가 실행해야 전파<br>
• <b>트로이 목마</b>: 정상 프로그램으로 위장, <b>자기 복제 능력 없음</b>, 백도어 설치·정보 유출<br>
'숙주 없이 스스로 퍼진다'가 웜의 결정적 키워드입니다.`},

{cat:"네트워크",
 q:`다음은 전송 계층 프로토콜을 비교한 설명이다. 괄호에 들어갈 알맞은 답을 쓰시오.
<div class="box">• ( ① ): 연결 지향형 프로토콜로, 3-way handshake로 연결을 설정하며 순서 번호와 확인 응답(ACK)을 이용해 신뢰성 있는 전송을 보장한다. 흐름 제어와 혼잡 제어를 수행하며 기본 헤더 크기는 20바이트이다.<br>
• ( ② ): 비연결형 프로토콜로, 순서 보장·재전송을 하지 않아 신뢰성은 낮지만 오버헤드가 적어 실시간 스트리밍, DNS 질의 등에 사용된다. 헤더는 출발지 포트, 목적지 포트, 길이, 체크섬으로 구성되며 크기는 ( ③ )바이트이다.</div>`,
 ans:[["TCP","Transmission Control Protocol"],["UDP","User Datagram Protocol"],["8","8바이트","8byte"]],
 exp:`<div class="tblwrap"><table><tr><th>구분</th><th>TCP</th><th>UDP</th></tr>
<tr><td>연결</td><td>연결 지향(3-way handshake)</td><td>비연결형</td></tr>
<tr><td>신뢰성</td><td>순서 보장, 재전송, ACK</td><td>보장 안 함</td></tr>
<tr><td>제어</td><td>흐름 제어(슬라이딩 윈도우), 혼잡 제어</td><td>없음</td></tr>
<tr><td>헤더</td><td>20~60바이트</td><td><b>8바이트</b></td></tr>
<tr><td>전송 단위</td><td>세그먼트</td><td>데이터그램</td></tr>
<tr><td>사용 예</td><td>HTTP, FTP, SMTP, SSH</td><td>DNS, DHCP, SNMP, 스트리밍</td></tr></table></div>`},

{cat:"소프트웨어공학",
 q:`다음 설명에 해당하는 소프트웨어 아키텍처 패턴을 [보기]에서 골라 쓰시오.
<div class="box">① 데이터 스트림을 처리하는 각 단계를 독립된 컴포넌트로 캡슐화하고, 한 단계의 출력이 다음 단계의 입력으로 전달되도록 연결하는 구조이다. 컴포넌트 재사용과 추가가 쉽지만 단계 간 데이터 변환 오버헤드가 발생한다. (예: UNIX 셸의 명령 연결)<br>
② 하나의 주(主) 컴포넌트가 작업을 분할하여 동일한 구조의 여러 부(副) 컴포넌트에 분배하고, 부 컴포넌트들이 처리한 결과를 취합하여 최종 결과를 계산하는 구조이다. 병렬 컴퓨팅, 장애 허용 시스템에 주로 사용된다.<br><br>
[보기] 계층, 클라이언트-서버, MVC, 파이프-필터, 브로커, 마스터-슬레이브, 피어-투-피어, 이벤트-버스</div>`,
 ans:[["파이프-필터","파이프 필터","파이프필터","Pipe-Filter","Pipe and Filter","파이프-필터 패턴"],["마스터-슬레이브","마스터 슬레이브","마스터슬레이브","Master-Slave","마스터-슬레이브 패턴"]],
 exp:`① <b>파이프-필터</b>: 필터(처리 단계)를 파이프(데이터 통로)로 연결 — 예: <code>cat log | grep ERR | sort</code><br>
② <b>마스터-슬레이브</b>: 마스터가 분배·취합, 슬레이브가 병렬 처리<br>
• <b>MVC</b>: Model(데이터)·View(화면)·Controller(입력 처리) 분리<br>
• <b>브로커</b>: 분산 컴포넌트 사이에서 브로커가 클라이언트 요청을 적절한 서버로 중개(예: CORBA)<br>
• <b>계층</b>: 각 계층이 바로 위 계층에 서비스 제공(예: OSI 7계층)`},

{cat:"운영체제",
 q:`디스크 헤드가 현재 <b>50번 실린더</b>에 위치하고 있으며, 디스크 대기 큐에 다음 순서로 요청이 들어와 있다. <b>SSTF</b> 스케줄링 기법을 사용할 때 헤드의 <b>총 이동 거리</b>를 쓰시오. (실린더 범위는 0~199)
<div class="box">82, 170, 43, 140, 24, 16, 190</div>`,
 ans:[["208"]],
 exp:`SSTF(Shortest Seek Time First): 현재 헤드 위치에서 <b>가장 가까운</b> 요청을 먼저 처리
<pre>50 → 43  : 7    (43까지 7, 82까지 32)
43 → 24  : 19   (24까지 19, 82까지 39)
24 → 16  : 8
16 → 82  : 66
82 → 140 : 58
140 → 170: 30
170 → 190: 20
합계     : 7+19+8+66+58+30+20 = 208</pre>
총 이동 거리 = <b>208</b> (참고: FCFS로 처리하면 642)`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오. (값 사이는 한 칸 띄어 쓰시오.)",
 code:`
#include <stdio.h>

int isPrime(int n) {
    if (n < 2) return 0;
    for (int i = 2; i * i < n; i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

int main() {
    int cnt = 0, sum = 0;
    for (int i = 1; i <= 30; i++) {
        if (isPrime(i)) {
            cnt++;
            sum += i;
        }
    }
    printf("%d %d", cnt, sum);
    return 0;
}`,
 ans:[["13 167"]],
 exp:`반복 조건이 <code>i * i &lt;= n</code>이 아니라 <code>i * i &lt; n</code>입니다. 따라서 <b>소수의 제곱수</b>는 약수 √n을 검사하지 못해 소수로 잘못 판정됩니다.
<pre>n = 4  : i=2 → 4 &lt; 4 거짓 → 반복 없이 return 1 (오판정)
n = 9  : i=2 (9%2≠0), i=3 → 9 &lt; 9 거짓 → return 1 (오판정)
n = 25 : i=2,3,4 통과, i=5 → 25 &lt; 25 거짓 → return 1 (오판정)
n = 49 는 범위 밖</pre>
실제 소수(2,3,5,7,11,13,17,19,23,29): 10개, 합 129<br>
오판정 4, 9, 25 추가 → cnt = 13, sum = 129 + 38 = <b>167</b><br>
결과: <code>13 167</code>`},

{cat:"보안",
 q:`다음은 블루투스(Bluetooth) 취약점을 이용한 공격에 대한 설명이다. 괄호에 들어갈 공격 기법을 쓰시오.
<div class="box">• ( ① ): 블루투스 장비 사이의 취약한 연결 관리를 악용하여, 공격자가 장비에 접근 후 <b>전화 걸기, 문자 발송 등 장비를 원격으로 제어</b>하는 공격<br>
• ( ② ): 블루투스의 취약점을 이용하여 장비 내의 <b>파일(주소록, 일정 등)에 무단으로 접근하여 정보를 탈취</b>하는 공격<br>
• ( ③ ): 블루투스를 이용해 근처의 기기에 <b>익명으로 스팸 메시지나 명함</b>을 전송하는 공격</div>`,
 ans:[["블루버그","BlueBug","Bluebugging","블루버깅"],["블루스나프","BlueSnarf","블루스나핑","Bluesnarfing","블루스나프(BlueSnarf)"],["블루재킹","BlueJacking","Bluejacking","블루잭킹"]],
 exp:`<b>블루버그(BlueBug)</b>: 장비 제어권 탈취 — 통화·문자 등 원격 조작<br>
<b>블루스나프(BlueSnarf)</b>: OPP(Object Push Profile) 등을 악용해 파일·주소록 <b>정보 탈취</b><br>
<b>블루재킹(BlueJacking)</b>: 스팸 메시지·명함을 익명 전송(직접적인 정보 탈취는 아님)<br>
<b>블루프린팅(BluePrinting)</b>: 공격 대상이 될 블루투스 장비를 검색·식별하는 활동<br>
암기: 버그=조종, 스나프=훔치기(snarf: 낚아채다), 재킹=스팸`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
class MyException extends Exception {
    int code;
    MyException(int c) {
        super("E" + c);
        code = c;
    }
}
public class Main {
    static int test(int n) throws MyException {
        if (n % 3 == 0) throw new MyException(n);
        return n / (n % 2);
    }
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 6; i++) {
            try {
                sum += test(i);
                System.out.print("A");
            } catch (MyException e) {
                sum += e.code * 10;
                System.out.print(e.getMessage());
            } catch (RuntimeException e) {
                sum -= 1;
                System.out.print("R");
            } finally {
                sum++;
            }
        }
        System.out.print(" " + sum);
    }
}`,
 ans:[["ARE3RAE6 100"]],
 exp:`• 3의 배수 → MyException(n) 발생, 메시지는 "E" + n<br>
• 짝수 → <code>n / (n % 2)</code> = n / 0 → <b>ArithmeticException</b>(RuntimeException의 하위 클래스)<br>
• 홀수 → n / 1 = n 반환 / finally는 예외 여부와 관계없이 매번 sum++
<pre>i  처리                        출력  sum(finally 후)
1  1 반환 → +1                 A     2
2  ArithmeticException → -1    R     2
3  MyException(3) → +30        E3    33
4  ArithmeticException → -1    R     33
5  5 반환 → +5                 A     39
6  MyException(6) → +60        E6    100</pre>
6은 짝수이지만 3의 배수 검사가 먼저이므로 MyException이 발생합니다. 결과: <code>ARE3RAE6 100</code>`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
s = "programming"
a = s.count("r") + s.count("mm")
b = s.find("g") + s.find("z")
lst = [3, 1, 4, 1, 5, 9, 2, 6]
c = lst.index(1) + lst.index(1, 2)
t = 0
for i, v in enumerate(lst, 1):
    if v % 2 == 1:
        t += i
print(a, b, c, t)`,
 ans:[["3 2 4 18"]],
 exp:`<pre>s = p r o g r a m m i n g
    0 1 2 3 4 5 6 7 8 9 10</pre>
• a: "r"은 인덱스 1, 4 → 2개, "mm" → 1개 → <b>3</b><br>
• b: <code>find("g")</code>는 첫 위치 3, 없는 문자 <code>find("z")</code>는 <b>−1</b>(index와 달리 예외 없음) → 3 + (−1) = <b>2</b><br>
• c: <code>lst.index(1)</code> = 1, <code>lst.index(1, 2)</code>는 인덱스 2부터 검색 → 3 → <b>4</b><br>
• t: <code>enumerate(lst, 1)</code>은 번호를 1부터 매김. 홀수 값 3(1), 1(2), 1(4), 5(5), 9(6) → 1+2+4+5+6 = <b>18</b><br>
결과: <code>3 2 4 18</code>`},

{cat:"소프트웨어공학",
 q:`다음은 ISO/IEC 25010 소프트웨어 제품 품질 특성에 대한 설명이다. 괄호에 들어갈 품질 특성을 쓰시오.
<div class="box">• ( ① ): 다른 제품·시스템과 동일한 환경을 공유하면서 정보를 교환하고 필요한 기능을 수행할 수 있는 정도 (부특성: 공존성, 상호운용성)<br>
• ( ② ): 제품을 하나의 하드웨어·소프트웨어·운영 환경에서 다른 환경으로 효과적으로 옮길 수 있는 정도 (부특성: 적응성, 설치성, 대체성)<br>
• ( ③ ): 제품을 개선·수정·적응시키기 위해 효과적이고 효율적으로 변경할 수 있는 정도 (부특성: 모듈성, 재사용성, 분석성, 수정성, 시험성)</div>`,
 ans:[["호환성","Compatibility"],["이식성","Portability"],["유지보수성","Maintainability","유지 보수성"]],
 exp:`ISO/IEC 25010의 8가지 품질 특성: <b>기능 적합성, 성능 효율성, 호환성, 사용성, 신뢰성, 보안성, 유지보수성, 이식성</b><br>
• ① <b>호환성</b> — 25010에서 새로 추가된 특성(공존성·상호운용성)<br>
• ② <b>이식성</b> — 다른 환경으로 옮기기(적응성·설치성·대체성)<br>
• ③ <b>유지보수성</b> — 변경 용이성(모듈성·재사용성·분석성·수정성·시험성)<br>
ISO/IEC 9126(6가지: 기능성, 신뢰성, 사용성, 효율성, 유지보수성, 이식성)과 구분해야 합니다.`},

{cat:"데이터베이스",
 q:`다음은 인덱스(Index)에 대한 설명이다. 괄호에 들어갈 알맞은 인덱스의 종류를 쓰시오.
<div class="box">• ( ① ): 인덱스 키의 순서에 따라 테이블의 <b>데이터 행이 물리적으로 정렬</b>되어 저장되는 인덱스로, <b>테이블당 하나만</b> 생성할 수 있다. 범위 검색에 유리하지만 데이터 삽입 시 정렬을 유지해야 하므로 입력·수정 부하가 크다.<br>
• ( ② ): 데이터의 물리적 순서와 무관하게 별도의 인덱스 페이지에 키 값과 <b>데이터 행의 위치(포인터)</b>를 저장하는 인덱스로, 한 테이블에 <b>여러 개</b>를 생성할 수 있다.</div>`,
 ans:[["클러스터드 인덱스","클러스터드","Clustered Index","클러스터형 인덱스","클러스터 인덱스","클러스터형","Clustered"],["넌클러스터드 인덱스","넌클러스터드","Non-Clustered Index","NonClustered Index","비클러스터형 인덱스","논클러스터드 인덱스","넌클러스터 인덱스","비클러스터드 인덱스","비클러스터형","Non-Clustered"]],
 exp:`<div class="tblwrap"><table><tr><th>구분</th><th>클러스터드</th><th>넌클러스터드</th></tr>
<tr><td>물리적 정렬</td><td>데이터 자체가 키 순서로 정렬</td><td>정렬 안 됨(인덱스만 정렬)</td></tr>
<tr><td>개수</td><td>테이블당 1개</td><td>여러 개</td></tr>
<tr><td>리프 노드</td><td>데이터 페이지</td><td>행 위치(RID/키) 포인터</td></tr>
<tr><td>검색 속도</td><td>빠름(특히 범위 검색)</td><td>상대적으로 느림</td></tr></table></div>
보통 기본키(PK)를 지정하면 클러스터드 인덱스가 자동 생성됩니다.`},

{cat:"네트워크",
 q:`<code>10.10.0.0/16</code> 네트워크를 각 서브넷에 <b>최소 500대</b>의 호스트를 수용할 수 있도록 동일한 크기로 분할하려 한다. (단, 서브넷 마스크는 조건을 만족하는 것 중 가장 긴 것을 사용하며, 네트워크·브로드캐스트 주소는 호스트에 할당할 수 없다.)<br>
① 서브넷 마스크(점-10진 표기)<br>② 생성되는 서브넷의 개수<br>③ <b>세 번째</b> 서브넷의 브로드캐스트 주소<br>를 각각 쓰시오.`,
 ans:[["255.255.254.0","/23"],["128","128개"],["10.10.5.255"]],
 exp:`필요 호스트 500 + 2(네트워크·브로드캐스트) = 502 ≤ 2⁹ = 512 → 호스트 비트 9개<br>
① 프리픽스 = 32 − 9 = /23 → <b>255.255.254.0</b> (호스트 2⁹ − 2 = 510개, 2⁸ − 2 = 254로는 부족)<br>
② /16 → /23: 서브넷 비트 7개 → 2⁷ = <b>128개</b><br>
③ 블록 크기 = 3번째 옥텟 기준 2씩
<pre>1번째: 10.10.0.0 ~ 10.10.1.255
2번째: 10.10.2.0 ~ 10.10.3.255
3번째: 10.10.4.0 ~ 10.10.5.255</pre>
세 번째 서브넷의 브로드캐스트 주소 = <b>10.10.5.255</b>`},

{cat:"SQL",
 q:`다음 [사원] 테이블에 대해 아래 두 SQL문을 실행했을 때 ①, ②의 결과값을 각각 쓰시오.` + SET9_EMP + `<div class="box">① <code>SELECT COUNT(*) FROM 사원 WHERE 급여 &gt; ALL (SELECT 급여 FROM 사원 WHERE 부서코드 = 'D2');</code><br>
② <code>SELECT COUNT(*) FROM 사원 WHERE 급여 &lt; ANY (SELECT 급여 FROM 사원 WHERE 부서코드 = 'D1');</code></div>`,
 ans:[["1"],["2"]],
 exp:`① 서브쿼리 결과(D2): {450, 250}. <code>&gt; ALL</code>은 <b>모든 값보다 커야</b> 하므로 <b>최댓값(450)보다 큰</b> 행 → 500(최유리) → <b>1</b><br>
② 서브쿼리 결과(D1): {300, 350}. <code>&lt; ANY</code>는 <b>하나라도 작으면</b> 참이므로 <b>최댓값(350)보다 작은</b> 행 → 300(김민수), 250(정하늘) → <b>2</b>
<pre>&gt; ALL  ≡ &gt; MAX      &lt; ALL  ≡ &lt; MIN
&gt; ANY  ≡ &gt; MIN      &lt; ANY  ≡ &lt; MAX
= ANY  ≡ IN</pre>`},

{cat:"보안",
 q:`다음 설명에 해당하는 보안 기법을 쓰시오.
<div class="box">패스워드를 저장할 때 해시 함수의 출력값을 다시 해시 함수의 입력으로 넣는 과정을 <b>수천~수만 번 반복</b>하여 해시값을 생성하는 기법이다. 하나의 해시값을 계산하는 데 걸리는 시간을 의도적으로 늘려 <b>무차별 대입 공격(Brute Force)</b>과 레인보우 테이블 공격에 대한 공격자의 비용을 증가시킨다. PBKDF2, bcrypt, scrypt 등이 이 원리를 이용한다.</div>`,
 ans:[["키 스트레칭","키스트레칭","Key Stretching","Key-Stretching"]],
 exp:`<b>키 스트레칭(Key Stretching)</b>: 해시를 반복 적용해 연산 시간을 늘림 → 대입 공격 속도 저하<br>
<b>솔트(Salt)</b>: 패스워드에 임의의 값을 덧붙여 같은 패스워드도 다른 해시값을 갖게 함 → 레인보우 테이블 무력화<br>
실무에서는 둘을 함께 사용(예: PBKDF2 = 솔트 + 반복 횟수 지정)합니다.`},

{cat:"소프트웨어공학",
 q:`다음 설명에 해당하는 GoF 디자인 패턴을 쓰시오.
<div class="box">행위(Behavioral) 패턴의 하나로, 객체의 <b>내부 상태가 바뀜에 따라 객체의 행위가 달라지도록</b> 하는 패턴이다. 각 상태를 별도의 클래스로 캡슐화하고, 객체는 현재 상태 객체에 처리를 위임한다. 상태에 따른 복잡한 조건문(if/switch)을 제거할 수 있다. (예: 자판기의 '대기 – 동전 투입 – 판매 중' 동작 변화)</div>`,
 ans:[["State","상태","State 패턴","상태 패턴","스테이트","스테이트 패턴","State Pattern"]],
 exp:`<b>State(상태) 패턴</b>: 상태별 클래스 + Context가 현재 상태 객체에 위임<br>
비교 — <b>Strategy</b>: 알고리즘을 클라이언트가 교체(상태 전이 개념 없음) / <b>Command</b>: 요청을 객체로 캡슐화(실행 취소·큐잉) / <b>Iterator</b>: 내부 구조 노출 없이 순차 접근<br>
GoF 행위 패턴 11가지: 책임 연쇄, 커맨드, 인터프리터, 반복자, 중재자, 메멘토, 옵서버, <b>상태</b>, 전략, 템플릿 메서드, 방문자`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오. (값 사이는 한 칸씩 띄어 쓰시오.)",
 code:`
#include <stdio.h>

void findMinMax(int *arr, int n, int *maxIdx, int *minIdx) {
    *maxIdx = 0;
    *minIdx = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] >= arr[*maxIdx]) *maxIdx = i;
        if (arr[i] < arr[*minIdx]) *minIdx = i;
    }
}

int main() {
    int a[8] = {7, 3, 9, 1, 9, 4, 1, 6};
    int mx, mn;
    findMinMax(a, 8, &mx, &mn);
    printf("%d %d %d", mx, mn, a[mx] - a[mn] + mx * mn);
    return 0;
}`,
 ans:[["4 3 20"]],
 exp:`함수는 주소(<code>&amp;mx</code>, <code>&amp;mn</code>)를 받아 <code>*maxIdx</code>, <code>*minIdx</code>로 main의 변수를 직접 변경합니다.<br>
• 최댓값 비교는 <code>&gt;=</code> → 같은 값이 다시 나오면 <b>뒤쪽 인덱스</b>로 갱신 → 9는 인덱스 2, 4 중 <b>4</b><br>
• 최솟값 비교는 <code>&lt;</code> → 같은 값이면 갱신 안 함 → 1은 인덱스 3, 6 중 <b>3</b>
<pre>i : 1  2  3  4  5  6  7
값: 3  9  1  9  4  1  6
mx: 0  2  2  4  4  4  4
mn: 1  1  3  3  3  3  3</pre>
a[4] − a[3] + 4 × 3 = 9 − 1 + 12 = <b>20</b> → 결과: <code>4 3 20</code>`}
]};
