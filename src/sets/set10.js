const SET10_EMP = `<div class="tblwrap"><table><tr><th>이름</th><th>부서</th><th>급여</th></tr>
<tr><td>김민준</td><td>A</td><td>500</td></tr>
<tr><td>이서연</td><td>A</td><td>400</td></tr>
<tr><td>박지호</td><td>B</td><td>400</td></tr>
<tr><td>최유나</td><td>B</td><td>300</td></tr>
<tr><td>정하늘</td><td>A</td><td>400</td></tr>
<tr><td>한도윤</td><td>B</td><td>200</td></tr></table></div>`;

const EXAM = {
title: "정보처리기사 실기 예상문제 제10회 (2026년 제3회 대비)",
questions: [
{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오. (64비트 환경으로 포인터는 8바이트, int는 4바이트, char는 1바이트이다. 값 사이는 한 칸씩 띄어 쓰시오.)",
 code:`
#include <stdio.h>
#include <string.h>

void f(char s[]) {
    printf("%d ", (int)(sizeof(s) + strlen(s)));
}

int main() {
    char a[10] = "KOREA";
    char b[] = "SEOUL";
    char *p = b;
    int n[5] = {1, 2, 3};

    printf("%d ", (int)(sizeof(a) + strlen(a)));
    printf("%d ", (int)(sizeof(b) - strlen(p)));
    printf("%d ", (int)(sizeof(p) * (sizeof(n) / sizeof(n[0]))));
    f(b);
    printf("%d", (int)strlen(p + 2));
    return 0;
}`,
 ans:[["15 1 40 13 3","15140133"]],
 exp:`<b>sizeof</b>는 컴파일 시점의 <b>메모리 크기</b>, <b>strlen</b>은 실행 시점에 널 문자(<code>&#92;0</code>) 직전까지의 <b>문자 개수</b>입니다.<br>
① <code>a[10]</code>: sizeof = 선언 크기 <b>10</b>, strlen("KOREA") = 5 → <b>15</b><br>
② <code>b[] = "SEOUL"</code>: 크기 생략 시 널 문자 포함 6바이트 → 6 − 5 = <b>1</b><br>
③ <code>sizeof(p)</code>는 포인터 크기 8, <code>sizeof(n)/sizeof(n[0])</code> = 20/4 = 5 (초기값이 3개여도 원소는 5개) → 8 × 5 = <b>40</b><br>
④ 함수 매개변수 <code>char s[]</code>는 실제로는 <b>char *s</b>(포인터) → sizeof(s) = 8, strlen = 5 → <b>13</b><br>
⑤ <code>p + 2</code>는 "OUL"의 시작 → strlen = <b>3</b><br>
결과: <code>15 1 40 13 3</code>`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
public class Main {
    static String f(String s, int n) {
        if (n == 0) return "";
        char c = s.charAt(n - 1);
        if (n % 3 == 0) return c + 1 + f(s, n - 1);
        return f(s, n - 1) + c;
    }
    public static void main(String[] args) {
        System.out.print(f("ABCDEF", 6));
    }
}`,
 ans:[["7168ABDE"]],
 exp:`핵심 함정: <code>c + 1 + f(...)</code>는 <b>왼쪽부터</b> 계산되어 <code>c + 1</code>이 먼저 <b>int 덧셈</b>(문자 코드 + 1)이 되고, 그 다음 String과 결합됩니다.
<pre>f(6): c='F'(70), 6%3==0 → "71" + f(5)
f(5): c='E'           → f(4) + "E"
f(4): c='D'           → f(3) + "D"
f(3): c='C'(67), 3%3==0 → "68" + f(2)
f(2): c='B'           → f(1) + "B"
f(1): c='A'           → f(0) + "A" = "A"

f(2)="AB", f(3)="68AB", f(4)="68ABD", f(5)="68ABDE"
f(6)="71" + "68ABDE" = "7168ABDE"</pre>
반면 <code>f(s, n-1) + c</code>는 왼쪽이 이미 String이므로 c가 문자 그대로 붙습니다. 결과: <b>7168ABDE</b>`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
class Bag:
    count = 0
    def __init__(self, *items):
        self.items = list(items)
        Bag.count += 1
        self.count += 10
    def __len__(self):
        return len(self.items) * 2
    def __eq__(self, other):
        return sum(self.items) == sum(other.items)
    def __str__(self):
        return f"Bag{len(self)}"

a = Bag(1, 2, 3)
b = Bag(6)
b.items.append(0)
print(a == b, str(a), b, a.count, Bag.count)`,
 ans:[["True Bag6 Bag4 11 2"]],
 exp:`• <code>Bag.count += 1</code>은 <b>클래스 변수</b>를 증가시킵니다.<br>
• <code>self.count += 10</code>은 <code>self.count = self.count + 10</code>으로, 읽을 때는 클래스 변수를 읽고 대입할 때는 <b>인스턴스 변수를 새로 생성</b>합니다(섀도잉).
<pre>a 생성: Bag.count=1, a.count = 1 + 10 = 11
b 생성: Bag.count=2, b.count = 2 + 10 = 12
b.items = [6, 0]</pre>
• <code>a == b</code> → <code>__eq__</code>: sum([1,2,3]) = 6, sum([6,0]) = 6 → <b>True</b><br>
• <code>str(a)</code> → <code>__str__</code> 안의 len(self)는 <code>__len__</code> 호출: 3 × 2 = 6 → <b>Bag6</b><br>
• print(b)도 <code>__str__</code> 사용: 2 × 2 = 4 → <b>Bag4</b><br>
• a.count는 인스턴스 변수 <b>11</b>, Bag.count는 클래스 변수 <b>2</b><br>
결과: <code>True Bag6 Bag4 11 2</code>`},

{cat:"SQL",
 q:`다음 [사원] 테이블에 대해 아래 SQL문을 실행하였다. 괄호 ①~④에 들어갈 값을 쓰시오. (이름 정렬은 가나다 순이다.)` + SET10_EMP + `<div class="box"><code>SELECT 이름,<br>
&nbsp;&nbsp;RANK() OVER (ORDER BY 급여 DESC) AS R1,<br>
&nbsp;&nbsp;DENSE_RANK() OVER (ORDER BY 급여 DESC) AS R2,<br>
&nbsp;&nbsp;ROW_NUMBER() OVER (ORDER BY 급여 DESC, 이름 ASC) AS R3,<br>
&nbsp;&nbsp;RANK() OVER (PARTITION BY 부서 ORDER BY 급여 DESC) AS R4<br>
FROM 사원;</code></div>
• 최유나의 R1 = ( ① ) &nbsp; • 최유나의 R2 = ( ② )<br>
• 정하늘의 R3 = ( ③ ) &nbsp; • 정하늘의 R4 = ( ④ )`,
 ans:[["5"],["3"],["4"],["2"]],
 exp:`급여 내림차순: 김민준 500 / 박지호·이서연·정하늘 400 (동점 3명) / 최유나 300 / 한도윤 200
<div class="tblwrap"><table><tr><th>이름</th><th>급여</th><th>RANK</th><th>DENSE_RANK</th><th>ROW_NUMBER</th></tr>
<tr><td>김민준</td><td>500</td><td>1</td><td>1</td><td>1</td></tr>
<tr><td>박지호</td><td>400</td><td>2</td><td>2</td><td>2</td></tr>
<tr><td>이서연</td><td>400</td><td>2</td><td>2</td><td>3</td></tr>
<tr><td>정하늘</td><td>400</td><td>2</td><td>2</td><td><b>4</b></td></tr>
<tr><td>최유나</td><td>300</td><td><b>5</b></td><td><b>3</b></td><td>5</td></tr>
<tr><td>한도윤</td><td>200</td><td>6</td><td>4</td><td>6</td></tr></table></div>
• RANK: 동점은 같은 순위, 다음 순위는 <b>동점 수만큼 건너뜀</b>(2,2,2 → 5)<br>
• DENSE_RANK: 동점 후에도 <b>연속된 순위</b>(2,2,2 → 3)<br>
• ROW_NUMBER: 동점이어도 고유 번호 — 2차 정렬(이름) 기준 박 → 이 → 정 순으로 2, 3, <b>4</b><br>
• R4: A부서만 분리하면 김민준 500(1), 이서연·정하늘 400(공동 <b>2</b>)`},

{cat:"데이터베이스",
 q:`다음은 분산 데이터베이스의 <b>투명성(Transparency)</b>에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.
<div class="box">• ( ① ) 투명성: 사용자는 데이터가 <b>물리적으로 어느 사이트에 저장</b>되어 있는지 알 필요 없이 논리적인 이름만으로 접근할 수 있다.<br>
• ( ② ) 투명성: 동일한 데이터가 <b>여러 사이트에 복제</b>되어 있더라도 사용자는 하나의 데이터만 존재하는 것처럼 사용한다.<br>
• ( ③ ) 투명성: 분산 데이터베이스와 관련된 <b>다수의 트랜잭션이 동시에 실행</b>되더라도 그 결과는 일관성이 유지된다.<br>
• ( ④ ) 투명성: 특정 사이트나 통신망에 <b>고장이 발생</b>하더라도 트랜잭션은 원자성을 유지하며 정확하게 처리된다.</div>`,
 ans:[["위치","Location","위치 투명성","장소"],["중복","Replication","복제","중복 투명성","복제 투명성"],["병행","Concurrency","병행 투명성","동시성","병행성"],["장애","Failure","장애 투명성","고장","고장 투명성"]],
 exp:`분산 데이터베이스의 4대 투명성: <b>위치 · 중복(복제) · 병행 · 장애</b> (암기: <b>위중병장</b>)<br>
• 위치(Location): 데이터 저장 장소를 몰라도 됨<br>
• 중복(Replication): 복제본의 존재와 일관성 유지를 시스템이 처리<br>
• 병행(Concurrency): 동시 트랜잭션 결과의 일관성 보장 (분산 잠금, 2PL 등)<br>
• 장애(Failure): 장애에도 원자성 유지 (2PC 등)<br>
추가로 분할(Fragmentation) 투명성, 지역 사상(Local Mapping) 투명성도 거론됩니다.`},

{cat:"보안",
 q:`다음 설명에 해당하는 공격 기법을 쓰시오.
<div class="box">다른 사이트에서 유출된 <b>아이디와 비밀번호 목록</b>을 확보한 공격자가, 많은 사용자가 <b>여러 서비스에 동일한 계정 정보를 재사용</b>한다는 점을 노려 자동화 도구로 다른 웹 사이트에 대량으로 로그인을 시도하는 공격이다. 무작위로 비밀번호를 추측하는 무차별 대입 공격과 달리 <b>실제 유효했던 계정 정보 쌍</b>을 그대로 대입한다는 특징이 있으며, 다중 인증(MFA) 적용과 비밀번호 재사용 금지가 주요 대응책이다.</div>`,
 ans:[["크리덴셜 스터핑","크리덴셜스터핑","Credential Stuffing","credential stuffing attack","크리덴셜 스터핑 공격","크리덴셜 스터핑 어택","계정 정보 무작위 대입","Credential Stuffing Attack"]],
 exp:`<b>크리덴셜 스터핑(Credential Stuffing)</b>: 유출된 계정 정보(크리덴셜)를 다른 사이트에 '채워 넣는(stuffing)' 공격.<br>
비교 — <b>무차별 대입(Brute Force)</b>: 가능한 모든 조합을 시도 / <b>사전 공격(Dictionary)</b>: 자주 쓰는 단어 목록 대입 / <b>패스워드 스프레이(Password Spraying)</b>: 흔한 비밀번호 하나를 다수 계정에 시도하여 계정 잠금을 회피.`},

{cat:"보안",
 q:`어떤 조직의 사용자 <b>50명</b>이 서로 1:1로 암호화 통신을 하려고 한다. 다음 물음에 답하시오.
<div class="box">① 대칭키(비밀키) 암호 방식을 사용할 때 필요한 전체 키의 개수<br>
② 공개키 암호 방식을 사용할 때 필요한 전체 키의 개수 (공개키와 개인키를 모두 센다)<br>
③ 대칭키 방식에서 사용자 10명이 새로 추가되어 60명이 되었을 때, <b>추가로</b> 필요한 키의 개수</div>`,
 ans:[["1225","1225개","1,225"],["100","100개"],["545","545개"]],
 exp:`• 대칭키: 서로 다른 두 사람마다 키 1개 → <b>n(n−1)/2</b> = 50 × 49 / 2 = <b>1225</b><br>
• 공개키: 사용자마다 공개키·개인키 한 쌍 → <b>2n</b> = <b>100</b><br>
• 60명일 때 대칭키 = 60 × 59 / 2 = 1770 → 추가분 = 1770 − 1225 = <b>545</b><br>
(검산: 새 10명 × 기존 50명 = 500 + 새 사람끼리 10 × 9 / 2 = 45 → 545)`},

{cat:"네트워크",
 q:`다음은 인터넷 라우팅에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.
<div class="box">• ( ① ): 하나의 관리 주체(ISP, 대기업 등)가 동일한 라우팅 정책으로 운영하는 네트워크와 라우터의 집합으로, 고유 번호(ASN)를 할당받는다.<br>
• ( ② ): 서로 다른 ( ① ) 사이에서 경로 정보를 교환하는 대표적인 <b>EGP(외부 게이트웨이 프로토콜)</b>로, <b>TCP 179번 포트</b>를 사용하며, 목적지까지 거치는 ( ① ) 번호 목록을 이용하는 <b>경로 벡터(Path Vector)</b> 방식이다.</div>`,
 ans:[["AS","자율 시스템","자율시스템","Autonomous System","자치 시스템"],["BGP","Border Gateway Protocol","BGP4","BGP-4","보더 게이트웨이 프로토콜"]],
 exp:`• <b>AS(Autonomous System, 자율 시스템)</b>: 단일 라우팅 정책 하의 네트워크 묶음<br>
• AS 내부 라우팅 = <b>IGP</b>: RIP(거리 벡터, 홉 수 최대 15), OSPF(링크 상태, 다익스트라), IGRP/EIGRP<br>
• AS 간 라우팅 = <b>EGP</b>: <b>BGP</b> — TCP 179, 경로 벡터, AS_PATH로 루프 방지, 정책 기반 라우팅<br>
• 같은 AS 내 BGP는 iBGP, 다른 AS 간은 eBGP`},

{cat:"소프트웨어공학",
 q:`다음은 어떤 프로젝트의 작업 목록이다. ① <b>임계 경로(Critical Path)의 길이</b>(일), ② 임계 경로를 구성하는 작업을 순서대로, ③ 작업 C의 <b>여유 시간(Total Float)</b>(일)을 쓰시오.
<div class="tblwrap"><table><tr><th>작업</th><th>기간(일)</th><th>선행 작업</th></tr>
<tr><td>A</td><td>3</td><td>-</td></tr>
<tr><td>B</td><td>4</td><td>-</td></tr>
<tr><td>C</td><td>5</td><td>A</td></tr>
<tr><td>D</td><td>2</td><td>A, B</td></tr>
<tr><td>E</td><td>6</td><td>B</td></tr>
<tr><td>F</td><td>4</td><td>C, D</td></tr>
<tr><td>G</td><td>3</td><td>D, E</td></tr>
<tr><td>H</td><td>2</td><td>F, G</td></tr></table></div>`,
 seq:true,
 ans:[["15","15일"],["B, E, G, H","B→E→G→H","BEGH","B-E-G-H"],["1","1일"]],
 exp:`<b>전진 계산(ES/EF)</b>: 선행 작업 EF 중 <b>최댓값</b>이 ES
<pre>A: 0 → 3     B: 0 → 4
C: 3 → 8     D: max(3,4)=4 → 6     E: 4 → 10
F: max(8,6)=8 → 12      G: max(6,10)=10 → 13
H: max(12,13)=13 → 15   ⇒ 프로젝트 기간 15일</pre>
<b>후진 계산(LS/LF)</b>: 후행 작업 LS 중 <b>최솟값</b>이 LF
<pre>H: 13~15   F: 9~13   G: 10~13   E: 4~10
D: LF=min(9,10)=9 → 7~9   C: LF=9 → 4~9
B: LF=min(7,4)=4 → 0~4   A: LF=min(4,7)=4 → 1~4</pre>
여유 시간 = LS − ES: A 1, <b>B 0</b>, C 1, D 3, <b>E 0</b>, F 1, <b>G 0</b>, <b>H 0</b><br>
여유 0인 작업 연결 = <b>B → E → G → H</b> (4+6+3+2 = 15), C의 여유 = 4 − 3 = <b>1일</b><br>
(비교: A→C→F→H = 14일로 임계 경로 아님)`},

{cat:"운영체제",
 q:`페이지 크기가 <b>4KB(4096바이트)</b>인 페이징 시스템에서 다음 페이지 테이블이 주어졌다. 10진수 논리 주소 <b>20000</b>에 대해 ① 페이지 번호, ② 오프셋(변위), ③ 변환된 물리 주소(10진수)를 쓰시오.
<div class="tblwrap"><table><tr><th>페이지 번호</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
<tr><td>프레임 번호</td><td>5</td><td>2</td><td>9</td><td>1</td><td>7</td><td>3</td></tr></table></div>`,
 ans:[["4"],["3616"],["32288","32,288"]],
 exp:`• 페이지 번호 = 논리 주소 ÷ 페이지 크기의 <b>몫</b> = 20000 ÷ 4096 = <b>4</b> (4 × 4096 = 16384)<br>
• 오프셋 = <b>나머지</b> = 20000 − 16384 = <b>3616</b><br>
• 페이지 4 → 프레임 <b>7</b><br>
• 물리 주소 = 프레임 번호 × 페이지 크기 + 오프셋 = 7 × 4096 + 3616 = 28672 + 3616 = <b>32288</b><br>
오프셋은 변환 과정에서 <b>그대로 유지</b>되고 페이지 번호만 프레임 번호로 바뀝니다.`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오.",
 code:`
#include <stdio.h>

void sort(int a[], int n, int k) {
    for (int i = 0; i < k; i++) {
        int m = i;
        for (int j = i + 1; j < n; j++)
            if (a[j] > a[m]) m = j;
        int t = a[i]; a[i] = a[m]; a[m] = t;
    }
}

void rev(int *a, int s, int e) {
    while (s < e) {
        int t = a[s];
        a[s++] = a[e];
        a[e--] = t;
    }
}

int main() {
    int d[6] = {5, 2, 8, 1, 9, 3};
    sort(d, 6, 3);
    rev(d, 1, 4);
    for (int i = 0; i < 6; i++)
        printf("%d", d[i]);
    return 0;
}`,
 ans:[["921583"]],
 exp:`배열은 함수에 <b>시작 주소</b>가 전달되므로 함수 안의 변경이 main의 d에 그대로 반영됩니다.<br>
<b>sort</b>: 최댓값을 앞으로 보내는 <b>내림차순 선택 정렬</b>을 k=3회만 수행
<pre>초기   : 5 2 8 1 9 3
i=0    : 최댓값 9(idx4) ↔ idx0 → 9 2 8 1 5 3
i=1    : 최댓값 8(idx2) ↔ idx1 → 9 8 2 1 5 3
i=2    : 최댓값 5(idx4) ↔ idx2 → 9 8 5 1 2 3</pre>
<b>rev(d, 1, 4)</b>: 인덱스 1~4 구간(8 5 1 2)을 뒤집음
<pre>s=1,e=4: 8↔2 → 9 2 5 1 8 3
s=2,e=3: 5↔1 → 9 2 1 5 8 3
s=3,e=2: 종료</pre>
결과: <code>921583</code>`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
interface Shape {
    int K = 2;
    int area();
    default String info() { return "S" + area(); }
}

abstract class Base implements Shape {
    static int cnt = 0;
    int w;
    Base(int w) { this.w = w; cnt++; }
    public int area() { return w * K; }
    public String info() { return "B" + area(); }
}

class Box extends Base {
    int h;
    Box(int w, int h) { super(w); this.h = h; cnt += 10; }
    public int area() { return super.area() + h; }
    public String info() { return super.info() + "/" + cnt; }
}

public class Main {
    public static void main(String[] args) {
        Shape s1 = new Box(3, 4);
        Base s2 = new Box(5, 1);
        System.out.print(s1.info() + " " + s2.area() + " " + Base.cnt);
    }
}`,
 ans:[["B10/22 11 22"]],
 exp:`• 인터페이스 필드 <code>K</code>는 자동으로 <b>public static final</b> 상수(2)<br>
• <code>cnt</code>는 static이므로 모든 객체가 공유: Box(3,4) 생성 → 1 → +10 = 11, Box(5,1) 생성 → 12 → +10 = <b>22</b><br>
• <code>s1.info()</code> → 실제 객체 Box의 info() → <code>super.info()</code> = Base.info() → "B" + <b>area()</b><br>
&nbsp;&nbsp;여기서 area()는 <b>동적 바인딩</b>으로 Box.area() 호출 → super.area()(3×2=6) + h(4) = 10 → "B10"<br>
&nbsp;&nbsp;이어서 "/" + cnt(이미 두 객체 모두 생성되어 22) → <b>"B10/22"</b><br>
• <code>s2.area()</code> → Box.area() = 5×2 + 1 = <b>11</b><br>
• Shape의 default info()는 Base에서 재정의되어 사용되지 않음<br>
결과: <code>B10/22 11 22</code>`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
n = 45
b = bin(n)
print(b, b[2:].count('1'), end=' ')
print(format(n, '08b'), format(n, 'o'), format(n, 'X'), hex(n), end=' ')
print(int('1011', 2) + int('17', 8) + int('1F', 16))`,
 ans:[["0b101101 4 00101101 55 2D 0x2d 57"]],
 exp:`45 = 32 + 8 + 4 + 1 = 2진수 <b>101101</b>, 8진수 <b>55</b>(5×8+5), 16진수 <b>2D</b>(2×16+13)<br>
• <code>bin(45)</code> → <b>'0b101101'</b> (접두어 0b 포함), <code>b[2:]</code> = '101101'의 '1' 개수 → <b>4</b><br>
• <code>format(n, '08b')</code> → 8자리, 빈자리 0 채움 → <b>00101101</b> (접두어 없음)<br>
• <code>format(n, 'o')</code> → <b>55</b>, <code>format(n, 'X')</code> → 대문자 <b>2D</b>, <code>hex(n)</code> → 소문자 + 접두어 <b>0x2d</b><br>
• <code>int('1011', 2)</code> = 11, <code>int('17', 8)</code> = 15, <code>int('1F', 16)</code> = 31 → 합 <b>57</b><br>
결과: <code>0b101101 4 00101101 55 2D 0x2d 57</code>`},

{cat:"SQL",
 q:`다음은 [수강] 테이블을 생성하는 SQL문이다. 조건을 만족하도록 괄호 ①~④에 알맞은 키워드를 쓰시오.
<div class="box">[조건]<br>• 점수는 0 이상 100 이하의 값만 입력될 수 있다.<br>• 학번은 [학생] 테이블의 학번을 참조하는 외래키이다.<br>• [학생] 테이블에서 학생이 삭제되면 그 학생의 수강 행도 <b>함께 자동 삭제</b>된다.</div>
<div class="box"><code>CREATE TABLE 수강 (<br>
&nbsp;&nbsp;학번 CHAR(4),<br>
&nbsp;&nbsp;과목코드 CHAR(4),<br>
&nbsp;&nbsp;점수 INT ( ① ) (점수 BETWEEN 0 AND 100),<br>
&nbsp;&nbsp;PRIMARY KEY (학번, 과목코드),<br>
&nbsp;&nbsp;( ② ) (학번) ( ③ ) 학생(학번) ON DELETE ( ④ )<br>
);</code></div>`,
 ans:[["CHECK"],["FOREIGN KEY"],["REFERENCES"],["CASCADE"]],
 exp:`• <b>CHECK</b>: 속성 값의 범위·조건 제약 (도메인 무결성)<br>
• <b>FOREIGN KEY (컬럼) REFERENCES 부모테이블(컬럼)</b>: 참조 무결성 — REFERENCE가 아니라 <b>REFERENCES</b>(복수형)<br>
• <b>ON DELETE CASCADE</b>: 부모 행 삭제 시 참조하는 자식 행도 연쇄 삭제<br>
참조 동작 옵션: CASCADE(연쇄) / SET NULL(NULL로 변경) / SET DEFAULT(기본값으로 변경) / RESTRICT·NO ACTION(삭제 거부)`},

{cat:"데이터베이스",
 q:`다음은 [연도·지역·제품]을 차원으로 하는 판매 데이터 큐브에 대한 <b>OLAP 연산</b> 예시이다. 각 설명에 해당하는 연산을 영문으로 쓰시오.
<div class="box">① 연도별 매출 보고서를 <b>분기별 → 월별</b> 매출로 점점 더 상세하게 분석하였다.<br>
② 도시별 매출을 <b>국가별 → 대륙별</b> 매출로 요약·집계하였다.<br>
③ 데이터 큐브에서 <b>제품 = '노트북'</b> 이라는 한 차원의 값만 고정하여 2차원 단면을 잘라 보았다.<br>
④ 보고서의 <b>행에 있던 지역과 열에 있던 연도를 서로 바꾸어</b> 다른 관점으로 보았다.</div>`,
 ans:[["Drill-down","Drill down","Drilldown","드릴다운","드릴 다운"],["Roll-up","Roll up","Rollup","롤업","롤 업"],["Slice","슬라이스","Slicing","슬라이싱"],["Pivot","피벗","피봇","Pivoting","Rotate","회전"]],
 exp:`• <b>Drill-down</b>: 요약 → 상세 (계층을 내려감, 연 → 분기 → 월)<br>
• <b>Roll-up</b>: 상세 → 요약 (계층을 올라가며 집계, 도시 → 국가 → 대륙)<br>
• <b>Slice</b>: <b>하나의 차원</b>을 특정 값으로 고정해 단면을 잘라냄<br>
• <b>Dice</b>: <b>두 개 이상 차원</b>에 범위 조건을 주어 작은 하위 큐브를 추출 (Slice와 구별!)<br>
• <b>Pivot(Rotate)</b>: 축(행·열)을 회전하여 보는 관점을 바꿈`},

{cat:"보안",
 q:`다음은 메시지 보호 기법에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.
<div class="box">• ( ① ): <b>키를 사용하지 않고</b> 임의 길이의 메시지를 고정 길이 값으로 변환하는 일방향 함수로, 무결성 확인에 사용되지만 누구나 같은 값을 다시 계산할 수 있어 송신자 인증은 불가능하다. (예: SHA-256)<br>
• ( ② ): 송·수신자가 <b>공유한 비밀키</b>와 메시지를 함께 해시하여 만든 값으로, 무결성과 메시지 인증을 제공하지만 양측이 같은 키를 가지므로 <b>부인 방지는 제공하지 못한다</b>. (예: HMAC)<br>
• ( ③ ): 송신자가 메시지 해시값을 <b>자신의 개인키</b>로 암호화하여 첨부하는 방식으로, 무결성·인증과 함께 <b>부인 방지</b>를 제공한다.<br>
• 수신자는 ( ③ )을(를) 검증할 때 <b>( ④ )</b>을(를) 사용한다.</div>`,
 ans:[["해시 함수","해시","해시함수","Hash","Hash Function","해쉬 함수","해쉬"],["MAC","메시지 인증 코드","메시지인증코드","Message Authentication Code","HMAC"],["전자서명","전자 서명","디지털 서명","디지털서명","Digital Signature"],["송신자의 공개키","송신자 공개키","공개키","Public Key","송신자의 공개 키"]],
 exp:`<div class="tblwrap"><table><tr><th>기법</th><th>사용 키</th><th>무결성</th><th>인증</th><th>부인 방지</th></tr>
<tr><td>해시</td><td>없음</td><td>O</td><td>X</td><td>X</td></tr>
<tr><td>MAC</td><td>공유 비밀키(대칭)</td><td>O</td><td>O</td><td><b>X</b></td></tr>
<tr><td>전자서명</td><td>서명: 송신자 개인키 / 검증: 송신자 공개키</td><td>O</td><td>O</td><td><b>O</b></td></tr></table></div>
MAC은 수신자도 같은 키로 동일한 MAC을 만들 수 있으므로 "송신자가 만들었다"는 것을 제3자에게 증명할 수 없습니다. 전자서명은 개인키를 송신자만 가지므로 부인 방지가 가능합니다.`},

{cat:"네트워크",
 q:`다음 물음에 답하시오.
<div class="box">① 네트워크 <code>192.168.32.0/21</code>을 ACL에서 지정할 때 사용하는 <b>와일드카드 마스크</b><br>
② 위 네트워크의 <b>브로드캐스트 주소</b><br>
③ [보기] 중 <b>사설(Private) IP 주소가 아닌 것</b><br>
[보기] 10.255.1.1 &nbsp; / &nbsp; 172.31.200.5 &nbsp; / &nbsp; 172.32.0.1 &nbsp; / &nbsp; 192.168.255.1</div>`,
 ans:[["0.0.7.255"],["192.168.39.255"],["172.32.0.1"]],
 exp:`① /21 서브넷 마스크 = 255.255.<b>248</b>.0 → 와일드카드 = 255.255.255.255 − 서브넷 마스크 = <b>0.0.7.255</b><br>
② 3번째 옥텟 블록 크기 = 256 − 248 = 8 → 32~39 구간 → 브로드캐스트 <b>192.168.39.255</b><br>
③ 사설 IP 범위 (RFC 1918)<br>
&nbsp;&nbsp;• A: 10.0.0.0 ~ 10.255.255.255 (10.0.0.0/8)<br>
&nbsp;&nbsp;• B: 172.<b>16</b>.0.0 ~ 172.<b>31</b>.255.255 (172.16.0.0/12)<br>
&nbsp;&nbsp;• C: 192.168.0.0 ~ 192.168.255.255 (192.168.0.0/16)<br>
→ <b>172.32.0.1</b>은 172.16~31 범위를 벗어나므로 공인 IP`},

{cat:"소프트웨어공학",
 q:`다음은 소프트웨어 테스트 유형에 대한 설명이다. 괄호에 들어갈 알맞은 테스트 명칭을 쓰시오.
<div class="box">• ( ① ): 오류를 수정하거나 기능을 변경한 후, <b>변경으로 인해 기존에 정상 동작하던 기능에 새로운 결함이 생기지 않았는지</b> 반복하여 확인하는 테스트<br>
• ( ② ): 본격적인 테스트에 앞서 새 빌드의 <b>핵심 기능이 기본적으로 동작하는지</b>를 빠르게 확인하여, 테스트를 계속 진행할 가치가 있는지 판단하는 테스트<br>
• ( ③ ): 시스템에 <b>예상되는 사용자 수·트랜잭션을 점진적으로 증가</b>시키면서, 임계점까지 응답 시간과 처리량 등 성능이 요구 수준을 만족하는지 측정하는 테스트<br>
• ( ④ ): 시스템이 처리할 수 있는 <b>한계를 넘는 과부하</b>를 가하여 시스템이 어떻게 실패하고 얼마나 안정적으로 복구되는지 확인하는 테스트</div>`,
 ans:[["회귀 테스트","회귀테스트","Regression Test","Regression Testing","회귀 시험"],["스모크 테스트","스모크테스트","Smoke Test","Smoke Testing","연기 테스트"],["부하 테스트","부하테스트","Load Test","Load Testing"],["스트레스 테스트","스트레스테스트","Stress Test","Stress Testing","강도 테스트"]],
 exp:`• <b>회귀(Regression)</b>: 변경 후 기존 기능 재검증 — "고쳤더니 다른 곳이 깨지지 않았나?"<br>
• <b>스모크(Smoke)</b>: 빌드 직후 핵심 기능 빠른 확인 (빌드 검증 테스트, BVT)<br>
• <b>부하(Load)</b>: 예상 부하를 점차 늘리며 <b>임계점까지</b> 성능 측정<br>
• <b>스트레스(Stress)</b>: <b>임계점 이상</b>의 과부하에서 실패 양상·복구 확인<br>
그 밖의 성능 테스트: 스파이크(순간 급증), 내구성(Soak, 장시간 지속)<br>
비교: <b>인수 테스트</b>는 사용자가 요구사항 충족 여부를 확인하는 최종 단계 테스트(알파·베타 포함)`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오. (값 사이는 한 칸씩 띄어 쓰시오.)",
 code:`
#include <stdio.h>

int main() {
    int a[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int cnt = 0, sum = 0;

    for (int i = 0; i < 3; i++) {
        for (int j = i; j < 3; j++) {
            int t = a[i][j];
            a[i][j] = a[j][i];
            a[j][i] = t;
            cnt++;
        }
    }
    for (int i = 0; i < 3; i++)
        for (int j = 0; j <= i; j++)
            sum += a[i][j];

    printf("%d %d %d", cnt, sum, a[0][2]);
    return 0;
}`,
 ans:[["6 26 7","6267"]],
 exp:`<b>① 전치(Transpose)</b>: j가 i부터 시작하므로 상삼각(대각선 포함)만 교환 → 각 쌍이 한 번씩만 교환되어 정상 전치됨<br>
교환 횟수: i=0 → j=0,1,2 (3회), i=1 → j=1,2 (2회), i=2 → j=2 (1회) → cnt = <b>6</b> (대각선은 자기 자신과 교환)
<pre>전치 전        전치 후
1 2 3          1 4 7
4 5 6    →     2 5 8
7 8 9          3 6 9</pre>
<b>② 하삼각 합</b> (j ≤ i): 전치 <b>후</b> 배열 기준 → 1 + (2+5) + (3+6+9) = <b>26</b><br>
(전치 전 배열로 계산하면 1+4+5+7+8+9 = 34가 되는 함정)<br>
<b>③</b> a[0][2] = <b>7</b><br>
※ j를 0부터 시작하면 모든 쌍이 두 번 교환되어 원래대로 돌아옵니다.<br>
결과: <code>6 26 7</code>`},

{cat:"소프트웨어공학",
 q:`다음은 GoF 행위(Behavioral) 디자인 패턴에 대한 설명이다. 괄호에 들어갈 알맞은 패턴명을 쓰시오.
<div class="box">• ( ① ) 패턴: 여러 객체가 서로 직접 참조하며 복잡하게 얽힌 <b>M:N 상호작용</b>을 하나의 <b>중재자 객체</b>에 캡슐화하여, 객체들이 중재자를 통해서만 통신하도록 함으로써 결합도를 낮춘다. (예: 항공 관제탑, 채팅방)<br>
• ( ② ) 패턴: <b>캡슐화를 위반하지 않고</b> 객체의 내부 상태를 외부에 저장해 두었다가, 나중에 그 상태로 <b>복원(Undo)</b>할 수 있게 한다. Originator, Caretaker 등으로 구성된다.<br>
• ( ③ ) 패턴: 객체 구조(요소 클래스)는 변경하지 않고, 그 구조 위에서 수행할 <b>새로운 연산을 별도의 클래스로 분리</b>하여 추가할 수 있게 한다. 요소는 accept() 메서드로 이 객체를 받아들인다(더블 디스패치).</div>`,
 ans:[["Mediator","중재자","미디에이터","Mediator Pattern","중재자 패턴"],["Memento","메멘토","Memento Pattern","메멘토 패턴","기념품"],["Visitor","방문자","비지터","Visitor Pattern","방문자 패턴"]],
 exp:`• <b>Mediator(중재자)</b>: 객체 간 통신을 중재자에 집중 → N:N 관계를 N:1로 단순화 (Observer는 1:N 상태 변화 통지라는 점에서 구별)<br>
• <b>Memento(메멘토)</b>: Originator(원본)가 상태 스냅샷 Memento를 만들고 Caretaker(관리자)가 보관 → 되돌리기 기능<br>
• <b>Visitor(방문자)</b>: 데이터 구조와 처리 로직 분리, <code>element.accept(visitor)</code> → <code>visitor.visit(element)</code><br>
GoF 행위 패턴 11개: 책임 연쇄, 커맨드, 인터프리터, 반복자, <b>중재자</b>, <b>메멘토</b>, 옵서버, 상태, 전략, 템플릿 메서드, <b>방문자</b>`}
]};
