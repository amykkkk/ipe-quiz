const EXAM = {
title: "정보처리기사 실기 예상문제 제3회 (2026년 제3회 대비)",
questions: [
{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오.",
 code:`
#include <stdio.h>

int main() {
    int a[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int s = 0;

    for (int i = 0; i < 3; i++)
        s += a[i][i] - a[i][2 - i];

    int *p = &a[0][0];
    printf("%d", s + *(p + 5) + *(*(a + 2) + 1));
    return 0;
}`,
 ans:[["14"]],
 exp:`• 주대각선 a[0][0]+a[1][1]+a[2][2] = 1+5+9 = 15, 부대각선 a[0][2]+a[1][1]+a[2][0] = 3+5+7 = 15 → s = 0<br>
• 2차원 배열은 메모리에 행 순서로 연속 저장 → <code>*(p+5)</code> = 6번째 원소 = a[1][2] = <b>6</b><br>
• <code>*(*(a+2)+1)</code> = a[2][1] = <b>8</b><br>
0 + 6 + 8 = <b>14</b>`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
interface Shape {
    int area();
}

class Rect implements Shape {
    int w, h;
    Rect(int w, int h) { this.w = w; this.h = h; }
    public int area() { return w * h; }
}

class Square extends Rect {
    Square(int s) { super(s, s); }
    public int area() { return super.area() + 1; }
}

public class Main {
    public static void main(String[] args) {
        Shape[] arr = { new Rect(2, 3), new Square(4), new Rect(1, 5) };
        int sum = 0;
        for (Shape s : arr)
            sum += s.area();
        System.out.println(sum);
    }
}`,
 ans:[["28"]],
 exp:`인터페이스 타입 배열이지만 실제 객체의 메서드가 호출됩니다(동적 바인딩).<br>
Rect(2,3) → 6 / Square(4) → super.area() = 16, +1 → 17 / Rect(1,5) → 5<br>
6 + 17 + 5 = <b>28</b>`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7}
c = a ^ b
d = [x * 2 for x in sorted(c) if x > 2]
print(d)`,
 ans:[["[6, 12, 14]"]],
 exp:`집합 연산자: <code>|</code> 합집합, <code>&amp;</code> 교집합, <code>-</code> 차집합, <code>^</code> <b>대칭 차집합</b><br>
a ^ b = 둘 중 한쪽에만 있는 원소 = {1, 2, 3, 6, 7}<br>
sorted → [1, 2, 3, 6, 7] 중 2보다 큰 3, 6, 7을 2배 → <code>[6, 12, 14]</code>`},

{cat:"SQL",
 q:`다음 [주문] 테이블에 대해 아래 SQL문을 실행했을 때의 결과값을 쓰시오.
<div class="tblwrap"><table><tr><th>주문번호</th><th>고객</th><th>상품</th><th>수량</th></tr>
<tr><td>1</td><td>김</td><td>A</td><td>2</td></tr><tr><td>2</td><td>이</td><td>B</td><td>1</td></tr>
<tr><td>3</td><td>김</td><td>B</td><td>3</td></tr><tr><td>4</td><td>박</td><td>A</td><td>1</td></tr>
<tr><td>5</td><td>이</td><td>A</td><td>2</td></tr><tr><td>6</td><td>김</td><td>C</td><td>1</td></tr></table></div>
<div class="box"><code>SELECT SUM(수량) FROM 주문<br>WHERE 고객 IN (SELECT 고객 FROM 주문<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GROUP BY 고객 HAVING COUNT(*) &gt;= 2);</code></div>`,
 ans:[["9"]],
 exp:`서브쿼리: 고객별 주문 건수 — 김 3건, 이 2건, 박 1건 → 2건 이상인 고객 {김, 이}<br>
김의 수량 2 + 3 + 1 = 6, 이의 수량 1 + 2 = 3 → 합계 <b>9</b>`},

{cat:"데이터베이스",
 q:"다음은 관계형 데이터베이스의 키(Key)에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.<div class=\"box\">• ( ① ): 릴레이션의 튜플을 유일하게 식별할 수 있는 속성들의 부분집합으로, <b>유일성과 최소성</b>을 모두 만족하는 키<br>• ( ② ): 릴레이션의 튜플을 유일하게 식별할 수 있는 속성의 집합으로, <b>유일성은 만족하지만 최소성은 만족하지 않는</b> 키</div>",
 ans:[["후보키","Candidate Key","후보 키"],["슈퍼키","Super Key","수퍼키","슈퍼 키"]],
 exp:`• <b>후보키</b>: 유일성 + 최소성<br>• <b>기본키</b>: 후보키 중 선정된 대표 키 (NULL·중복 불가)<br>• <b>대체키</b>: 기본키로 선택되지 않은 나머지 후보키<br>• <b>슈퍼키</b>: 유일성만 만족<br>• <b>외래키</b>: 다른 릴레이션의 기본키를 참조하는 속성`},

{cat:"데이터베이스",
 q:"다음은 데이터베이스 무결성 제약조건에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.<div class=\"box\">• ( ① ) 무결성: 기본 테이블의 <b>기본키를 구성하는 어떤 속성도 NULL 값이나 중복 값을 가질 수 없다</b>.<br>• ( ② ) 무결성: <b>외래키 값은 NULL이거나 참조 릴레이션의 기본키 값과 동일</b>해야 한다. 즉, 참조할 수 없는 외래키 값을 가질 수 없다.</div>",
 ans:[["개체","개체무결성","Entity"],["참조","참조무결성","Referential"]],
 exp:`• <b>개체 무결성</b>: 기본키 NOT NULL + UNIQUE<br>• <b>참조 무결성</b>: 외래키 ↔ 참조 테이블 기본키<br>• 도메인 무결성: 속성 값은 정의된 도메인에 속해야 함<br>• 그 외: 사용자 정의 무결성, NULL 무결성, 고유 무결성, 키 무결성, 관계 무결성`},

{cat:"보안",
 q:"다음 설명에 해당하는 서비스 거부(DoS) 공격 기법을 쓰시오.<div class=\"box\">TCP 프로토콜의 <b>3-Way Handshake</b> 구조적 취약점을 이용한 공격으로, 공격자가 위조된 IP로 <b>SYN 패킷만 대량으로 전송</b>하고 ACK를 보내지 않아, 서버의 <b>백로그 큐(Backlog Queue)</b>를 가득 채워 정상 사용자의 연결 요청을 받지 못하게 만든다.</div>",
 ans:[["SYN Flooding","SYN 플러딩","SYN플러딩","SYN Flood","신 플러딩","TCP SYN Flooding","SYN Flooding 공격"]],
 exp:`<b>SYN Flooding</b> — 대응: SYN Cookie, 백로그 큐 크기 증가, 타임아웃 단축<br>
비교 — <b>Smurf(스머프)</b>: ICMP Echo 요청을 브로드캐스트 주소로 보내 피해자에게 응답 폭주 / <b>Ping of Death</b>: 규정 크기 이상의 ICMP 패킷 / <b>Land Attack</b>: 출발지=목적지 IP / <b>Teardrop</b>: 조각 패킷의 Offset 조작`},

{cat:"보안",
 q:"다음 설명에 해당하는 용어를 쓰시오.<div class=\"box\">비밀번호를 해시 함수로 저장할 때, 동일한 비밀번호가 동일한 해시값을 갖게 되어 <b>레인보우 테이블 공격</b>에 취약해지는 문제를 막기 위해 <b>원문에 덧붙이는 임의의 무작위 문자열</b>을 말한다.</div>",
 ans:[["솔트","Salt","솔팅","Salting"]],
 exp:`<b>솔트(Salt)</b>: 해시 전에 비밀번호에 랜덤 값을 추가 → 같은 비밀번호도 다른 해시값<br>
관련 — <b>키 스트레칭</b>: 해시를 여러 번 반복해 계산 비용 증가 / 대표 해시: SHA-256, bcrypt, PBKDF2, scrypt`},

{cat:"네트워크",
 q:"<code>200.1.1.0/24</code> 네트워크를 <b>FLSM(고정 길이 서브넷 마스크)</b> 방식으로 <b>6개의 서브넷</b>으로 분할하려고 한다. ① 사용할 서브넷 마스크(10진 표기)와 ② 각 서브넷에서 실제 사용 가능한 호스트 수를 쓰시오. (서브넷 수는 최소로 분할한다.)",
 ans:[["255.255.255.224","/27"],["30","30개"]],
 exp:`6개 이상 서브넷 → 2³ = 8 ≥ 6 → 서브넷 비트 3개 차용 → /24 + 3 = <b>/27</b> = 255.255.255.<b>224</b><br>
호스트 비트 5 → 2⁵ − 2 = <b>30</b> (네트워크 주소와 브로드캐스트 주소 제외)`},

{cat:"소프트웨어공학",
 q:"다음 설명에 해당하는 디자인 패턴을 쓰시오.<div class=\"box\">구조(Structural) 패턴의 하나로, <b>호환되지 않는 인터페이스</b>를 가진 클래스들을 함께 사용할 수 있도록 기존 클래스의 인터페이스를 클라이언트가 기대하는 <b>다른 인터페이스로 변환</b>해 주는 패턴이다. 기존 코드를 수정하지 않고 재사용할 때 사용한다.</div>",
 ans:[["Adapter","어댑터","Adapter Pattern","어댑터패턴","아답터"]],
 exp:`<b>어댑터(Adapter)</b>: '변환기' 역할<br>
GoF 구조 패턴 7가지: <b>어댑터</b>, 브리지, 컴포지트, 데코레이터, 퍼사드, 플라이웨이트, 프록시`},

{cat:"소프트웨어공학",
 q:"다음은 테스트 오라클(Test Oracle)의 종류에 대한 설명이다. 설명에 해당하는 오라클을 쓰시오.<div class=\"box\">특정한 몇몇 테스트 케이스의 입력 값들에 대해서만 기대하는 결과를 제공하는 오라클로, 전수 테스트가 불가능한 경우 사용하며 <b>경계값 및 구간별 예상값</b> 결과 작성 시 사용한다.</div>",
 ans:[["샘플링 오라클","샘플링오라클","Sampling Oracle","샘플링"]],
 exp:`테스트 오라클 4가지<br>• <b>참(True) 오라클</b>: 모든 입력 값에 대해 기대 결과 제공<br>• <b>샘플링(Sampling) 오라클</b>: 특정 몇몇 입력 값에 대해서만 결과 제공<br>• <b>추정(휴리스틱) 오라클</b>: 샘플링 + 나머지 입력 값은 추정으로 처리<br>• <b>일관성 검사 오라클</b>: 변경 전후 결과 비교`},

{cat:"운영체제",
 q:"교착상태(Deadlock)가 발생하기 위한 <b>4가지 필요충분조건</b>을 쓰시오. (순서 무관)",
 unordered:true,
 blanks:["조건 1","조건 2","조건 3","조건 4"],
 ans:[["상호 배제","상호배제","Mutual Exclusion"],["점유와 대기","점유와대기","점유 대기","점유대기","Hold and Wait"],["비선점","비 선점","No Preemption","비선점 조건"],["환형 대기","환형대기","순환 대기","순환대기","Circular Wait"]],
 exp:`① <b>상호 배제</b>: 한 번에 한 프로세스만 자원 사용<br>② <b>점유와 대기</b>: 자원을 가진 채 다른 자원을 기다림<br>③ <b>비선점</b>: 다른 프로세스의 자원을 강제로 빼앗을 수 없음<br>④ <b>환형 대기</b>: 프로세스들이 원형으로 서로의 자원을 기다림<br>
해결 방법: 예방, 회피(은행원 알고리즘), 발견, 회복`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오.",
 code:`
#include <stdio.h>

int main() {
    int a = 13, b = 6;
    int c = a & b;
    int d = a | b;
    int e = a ^ b;
    printf("%d", (c << 2) + (d >> 1) - e);
    return 0;
}`,
 ans:[["12"]],
 exp:`a = 1101₍₂₎, b = 0110₍₂₎
<pre>c = a & b = 0100 = 4
d = a | b = 1111 = 15
e = a ^ b = 1011 = 11</pre>
c &lt;&lt; 2 = 4 × 4 = 16, d &gt;&gt; 1 = 15 / 2 = 7 → 16 + 7 − 11 = <b>12</b>`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
public class Main {
    public static void main(String[] args) {
        String a = "Java";
        String b = "Java";
        String c = new String("Java");
        int r = 0;

        if (a == b) r += 1;
        if (a == c) r += 2;
        if (a.equals(c)) r += 4;

        StringBuilder sb = new StringBuilder(a);
        sb.reverse().append(r);
        System.out.println(sb);
    }
}`,
 ans:[["avaJ5"]],
 exp:`• 문자열 리터럴은 String Constant Pool에서 공유 → <code>a == b</code> true (+1)<br>
• <code>new String()</code>은 힙에 새 객체 → <code>a == c</code> false (주소 비교)<br>
• <code>equals()</code>는 내용 비교 → true (+4) → r = 5<br>
• "Java" 뒤집기 → "avaJ", 뒤에 5 추가 → <code>avaJ5</code>`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
def f(s):
    if len(s) <= 1:
        return s
    return f(s[1:]) + s[0]

print(f("ABCDE")[1:4])`,
 ans:[["DCB"]],
 exp:`f는 재귀로 문자열을 <b>뒤집는</b> 함수입니다.<br>
f("ABCDE") = f("BCDE") + "A" = … = "EDCB" + "A" = "EDCBA"<br>
"EDCBA"[1:4] → 인덱스 1, 2, 3 → <code>DCB</code>`},

{cat:"네트워크",
 q:"다음 설명에 해당하는 프로토콜을 영문 약어로 쓰시오.<div class=\"box\">• ( ① ): 네트워크 계층의 <b>IP 주소를 물리적 주소(MAC 주소)로 변환</b>하는 프로토콜<br>• ( ② ): IP 패킷 전송 중 발생한 <b>오류 메시지나 제어 메시지를 전달</b>하는 프로토콜로, ping과 traceroute 명령어에서 사용한다.</div>",
 ans:[["ARP","Address Resolution Protocol"],["ICMP","Internet Control Message Protocol"]],
 exp:`• <b>ARP</b>: IP → MAC / <b>RARP</b>: MAC → IP<br>• <b>ICMP</b>: 오류·제어 메시지 (ping, traceroute)<br>• <b>IGMP</b>: 멀티캐스트 그룹 관리<br>모두 네트워크 계층(3계층) 관련 프로토콜입니다.`},

{cat:"소프트웨어공학",
 q:"다음 설명의 괄호에 공통으로 들어갈 알맞은 용어를 쓰시오.<div class=\"box\">애자일 방법론인 <b>스크럼(Scrum)</b>에서는 보통 2~4주의 짧은 개발 주기인 ( )를 반복하며 개발을 진행한다. ( ) 계획 회의에서 제품 백로그 중 이번 주기에 구현할 항목을 선정하고, 매일 15분 내외의 일일 스크럼 회의를 하며, 주기가 끝나면 ( ) 리뷰와 회고를 진행한다.</div>",
 ans:[["스프린트","Sprint"]],
 exp:`스크럼 구성: 제품 책임자(PO), 스크럼 마스터(SM), 개발팀<br>
진행: 제품 백로그 → <b>스프린트</b> 계획 회의 → <b>스프린트</b> → 일일 스크럼 회의 → <b>스프린트</b> 검토 → <b>스프린트</b> 회고<br>
진행 상황은 <b>번다운 차트</b>로 확인합니다.`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오. (두 값은 한 칸 띄어 쓰시오.)",
 code:`
#include <stdio.h>

int main() {
    int i = 0, cnt = 0;
    while (i < 20) {
        i++;
        if (i % 2 == 0) continue;
        if (i % 7 == 0) break;
        cnt += i;
    }
    printf("%d %d", i, cnt);
    return 0;
}`,
 ans:[["7 9"]],
 exp:`짝수는 continue로 건너뛰고, 홀수만 검사합니다.<br>
i = 1 → cnt 1 / i = 3 → cnt 4 / i = 5 → cnt 9 / i = 7 → 7의 배수이므로 <b>break</b> (cnt에 더하지 않음)<br>
결과: <code>7 9</code>`},

{cat:"보안",
 q:"다음 설명에 해당하는 인증 기술을 영문 약어로 쓰시오.<div class=\"box\">한 번의 로그인(인증)으로 <b>여러 개의 시스템이나 서비스를 추가 인증 없이</b> 이용할 수 있도록 하는 통합 인증 기술로, 사용자 편의성이 높고 계정 관리가 일원화되는 장점이 있다.</div>",
 ans:[["SSO","Single Sign On","Single Sign-On","싱글사인온"]],
 exp:`<b>SSO(Single Sign-On)</b> — 구현 방식: Kerberos, SAML, OAuth 기반 등<br>
관련 용어 — <b>OAuth</b>: 비밀번호를 제공하지 않고 접근 권한을 위임하는 개방형 표준 / <b>MFA(다중 인증)</b>: 지식·소유·생체 등 두 가지 이상의 인증 요소 조합`},

{cat:"SQL",
 q:`다음 SQL문의 괄호에 들어갈 알맞은 키워드를 쓰시오.
<div class="box">• [학생] 테이블의 이름 속성에 대해 <b>idx_name 인덱스를 생성</b>하는 SQL문<br>
<code>CREATE ( ① ) idx_name ON 학생(이름);</code><br><br>
• [학생] 테이블에 <b>전화번호 속성을 추가</b>하는 SQL문<br>
<code>ALTER TABLE 학생 ( ② ) 전화번호 VARCHAR(20);</code></div>`,
 ans:[["INDEX","UNIQUE INDEX"],["ADD"]],
 exp:`• 인덱스 생성: <code>CREATE [UNIQUE] INDEX 인덱스명 ON 테이블(속성);</code><br>
• 속성 추가: <code>ALTER TABLE 테이블 ADD 속성 타입;</code> / 변경: <code>ALTER</code>(또는 MODIFY) / 삭제: <code>DROP COLUMN</code><br>
DDL: CREATE, ALTER, DROP, TRUNCATE`}
]};
