const EXAM = {
title: "정보처리기사 실기 예상문제 제2회 (2026년 제3회 대비)",
questions: [
{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오.",
 code:`
#include <stdio.h>

struct Node {
    int v;
    struct Node *next;
};

int main() {
    struct Node a = {1, NULL}, b = {2, NULL}, c = {3, NULL};
    a.next = &b;
    b.next = &c;
    c.next = &a;

    struct Node *p = &a;
    int s = 0;
    for (int i = 0; i < 7; i++) {
        s += p->v;
        p = p->next;
    }
    printf("%d", s);
    return 0;
}`,
 ans:[["13"]],
 exp:`a → b → c → a … 로 이어지는 <b>원형 연결 리스트</b>입니다.<br>
7번 순회하며 더하는 값: 1, 2, 3, 1, 2, 3, 1 → 합 = <b>13</b><br>
<code>p-&gt;v</code>는 <code>(*p).v</code>와 같습니다.`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
class Parent {
    Parent() { System.out.print("P"); }
    Parent(int n) { System.out.print("P" + n); }
}

class Child extends Parent {
    Child() {
        this(5);
        System.out.print("C");
    }
    Child(int n) {
        super(n * 2);
        System.out.print("C" + n);
    }
}

public class Main {
    public static void main(String[] args) {
        new Child();
    }
}`,
 ans:[["P10C5C"]],
 exp:`① <code>new Child()</code> → 첫 줄 <code>this(5)</code>로 Child(int) 호출<br>
② Child(5)의 첫 줄 <code>super(10)</code> → Parent(int) 실행: "P10"<br>
③ Child(5) 나머지: "C5"<br>
④ Child() 나머지: "C"<br>
this()가 있는 생성자에는 super()가 자동 삽입되지 않으므로 기본 생성자 Parent()의 "P"는 출력되지 않습니다. → <code>P10C5C</code>`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
nums = [1, 2, 3, 4, 5, 6]
r = list(map(lambda x: x * x, filter(lambda x: x % 2 == 0, nums)))
print(r[-1] - r[0])`,
 ans:[["32"]],
 exp:`filter → 짝수만 [2, 4, 6] → map(제곱) → [4, 16, 36]<br>
r[-1] − r[0] = 36 − 4 = <b>32</b>`},

{cat:"SQL",
 q:`[사원] 테이블과 [부서] 테이블을 조인하여, <b>부서가 배정되지 않은 사원까지 모두 포함</b>하여 사원 이름과 부서명을 조회하려 한다. 괄호 ①, ②에 들어갈 알맞은 키워드를 쓰시오.
<div class="box"><code>SELECT A.이름, B.부서명<br>FROM 사원 A ( ① ) JOIN 부서 B<br>( ② ) A.부서코드 = B.부서코드;</code></div>`,
 ans:[["LEFT OUTER","LEFT"],["ON"]],
 exp:`왼쪽 테이블(사원)의 모든 행을 유지하고 오른쪽(부서)에 일치하는 값이 없으면 NULL로 채우는 조인은 <b>LEFT OUTER JOIN</b>입니다. 조인 조건은 <b>ON</b>절에 씁니다.<br>
• INNER JOIN: 양쪽 모두 일치하는 행만 / RIGHT OUTER JOIN: 오른쪽 전체 유지 / FULL OUTER JOIN: 양쪽 전체 유지<br>
• 조인 컬럼명이 같다면 <code>USING(부서코드)</code>로도 쓸 수 있습니다.`},

{cat:"데이터베이스",
 q:"다음은 정규화를 하지 않아 발생하는 이상(Anomaly) 현상에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.<div class=\"box\">• ( ① ) 이상: 데이터를 추가할 때 원하지 않는 값(NULL 등)도 함께 입력해야 하는 현상<br>• ( ② ) 이상: 튜플을 지울 때 유지되어야 할 정보까지 연쇄적으로 함께 지워지는 현상<br>• ( ③ ) 이상: 중복된 튜플 중 일부만 수정되어 데이터의 불일치가 발생하는 현상</div>",
 ans:[["삽입","삽입이상","Insertion"],["삭제","삭제이상","Deletion"],["갱신","갱신이상","수정","수정이상","Update","Modification"]],
 exp:`이상 현상 3가지: <b>삽입 이상, 삭제 이상, 갱신 이상</b><br>
원인: 하나의 릴레이션에 여러 종류의 데이터가 섞여 데이터 중복과 종속이 발생 → 해결책: <b>정규화</b>`},

{cat:"데이터베이스",
 q:"다음은 트랜잭션의 특성(ACID)에 대한 설명이다. 괄호에 들어갈 알맞은 특성을 쓰시오.<div class=\"box\">• ( ① ): 트랜잭션의 연산은 모두 반영되거나 전혀 반영되지 않아야 한다. (All or Nothing)<br>• ( ② ): 트랜잭션이 성공적으로 완료되면 데이터베이스는 언제나 일관성 있는 상태를 유지해야 한다.<br>• ( ③ ): 둘 이상의 트랜잭션이 동시에 실행될 때 서로의 연산에 끼어들 수 없다.<br>• ( ④ ): 성공적으로 완료된 트랜잭션의 결과는 시스템이 고장 나더라도 영구적으로 반영되어야 한다.</div>",
 ans:[["원자성","Atomicity"],["일관성","Consistency"],["독립성","격리성","고립성","Isolation"],["영속성","지속성","Durability"]],
 exp:`<b>A</b>tomicity 원자성 – Commit/Rollback으로 보장<br><b>C</b>onsistency 일관성<br><b>I</b>solation 독립성(격리성) – 병행 제어(로킹 등)로 보장<br><b>D</b>urability 영속성(지속성) – 회복 기법(로그)으로 보장`},

{cat:"보안",
 q:"다음 설명에 해당하는 공격 기법을 쓰시오.<div class=\"box\"><b>문자 메시지(SMS)</b>와 <b>피싱(Phishing)</b>의 합성어로, '무료 쿠폰 제공', '택배 배송 조회' 등을 내용으로 하는 문자 메시지에 악성 URL을 포함하여 전송하고, 사용자가 이를 클릭하면 악성 앱이 설치되어 개인정보 탈취나 소액결제 피해를 유발한다.</div>",
 ans:[["스미싱","Smishing"]],
 exp:`<b>스미싱(Smishing)</b> = SMS + Phishing<br>
비교 — <b>파밍</b>: DNS/hosts 변조로 정상 주소를 입력해도 가짜 사이트로 유도 / <b>스피어 피싱</b>: 특정 대상을 겨냥한 맞춤형 이메일 피싱 / <b>큐싱</b>: QR코드 + 피싱 / <b>비싱</b>: 음성(Voice) + 피싱`},

{cat:"보안",
 q:"다음 설명에 해당하는 암호 알고리즘을 쓰시오.<div class=\"box\">1978년 MIT의 <b>리베스트, 샤미르, 애들먼</b>에 의해 제안된 <b>공개키(비대칭키)</b> 암호 알고리즘으로, <b>큰 숫자를 소인수분해하기 어렵다</b>는 수학적 난제에 기반한다. 전자서명과 키 교환 등에 널리 사용된다.</div>",
 ans:[["RSA","Rivest-Shamir-Adleman"]],
 exp:`<b>RSA</b>: 소인수분해 문제 기반 공개키 암호<br>
비교 — <b>ECC</b>: 타원곡선 이산대수 문제 기반, 짧은 키로 RSA와 동등 보안 / <b>ElGamal</b>: 이산대수 문제 기반 / <b>디피-헬만</b>: 최초의 공개키 기반 키 교환 알고리즘<br>
대칭키(DES, AES, SEED, ARIA)는 암·복호화 키가 같고, 공개키는 공개키/개인키 쌍을 사용합니다.`},

{cat:"네트워크",
 q:"다음은 OSI 7계층에서 각 계층이 사용하는 데이터 단위(PDU)이다. 괄호에 들어갈 알맞은 용어를 쓰시오.<div class=\"box\">• 데이터 링크 계층: ( ① )<br>• 네트워크 계층: ( ② )<br>• 전송 계층: ( ③ )</div>",
 ans:[["프레임","Frame"],["패킷","Packet","데이터그램","Datagram"],["세그먼트","Segment"]],
 exp:`물리 – <b>비트(Bit)</b> / 데이터 링크 – <b>프레임(Frame)</b> / 네트워크 – <b>패킷(Packet)</b> / 전송 – <b>세그먼트(Segment)</b> (UDP는 데이터그램) / 세션·표현·응용 – <b>메시지(데이터)</b><br>
대표 장비: 리피터·허브(1), 브리지·스위치(2), 라우터(3)`},

{cat:"소프트웨어공학",
 q:"다음 설명에 해당하는 디자인 패턴을 쓰시오.<div class=\"box\">행위(Behavioral) 패턴의 하나로, 한 객체의 <b>상태가 변화하면 그 객체에 의존하는 다른 객체들에게 자동으로 통지</b>되고 내용이 갱신되는 <b>일대다(1:N)</b> 의존 관계를 정의한다. 주로 이벤트 처리, 분산 시스템의 구독(Subscribe) 모델 구현에 사용된다.</div>",
 ans:[["Observer","옵저버","옵서버","Observer Pattern","옵저버패턴","옵서버패턴"]],
 exp:`<b>옵서버(Observer)</b> 패턴: Subject가 변경되면 등록된 Observer들에게 notify<br>
GoF 행위 패턴 11가지: 책임 연쇄, 커맨드, 인터프리터, 반복자, 중재자, 메멘토, <b>옵서버</b>, 상태, 전략, 템플릿 메서드, 방문자`},

{cat:"소프트웨어공학",
 q:"다음 설명에 해당하는 테스트 커버리지를 쓰시오.<div class=\"box\">화이트박스 테스트의 검증 기준 중 하나로, 조건/결정 커버리지를 향상시킨 것이다. 결정 포인트 내의 다른 <b>개별 조건식의 결과에 상관없이</b>, 각 <b>개별 조건식이 독립적으로 전체 조건식의 결과에 영향을 주는 것</b>을 검증한다. 항공 등 안전 필수 소프트웨어에서 요구된다.</div>",
 ans:[["변경 조건/결정 커버리지","변경조건/결정커버리지","변경 조건 결정 커버리지","MC/DC","MCDC","MC/DC 커버리지","Modified Condition/Decision Coverage","변경 조건/결정 검증 기준"]],
 exp:`<b>변경 조건/결정 커버리지(MC/DC)</b><br>
커버리지 종류: 구문(문장) → 결정(분기) → 조건 → 조건/결정 → <b>변경 조건/결정</b> → 다중 조건(모든 조합)`},

{cat:"운영체제",
 q:"다음 프로세스들을 <b>비선점 SJF(Shortest Job First)</b> 스케줄링 기법으로 처리할 때의 <b>평균 대기 시간</b>을 쓰시오.<div class=\"tblwrap\"><table><tr><th>프로세스</th><th>도착 시간</th><th>실행 시간</th></tr><tr><td>P1</td><td>0</td><td>6</td></tr><tr><td>P2</td><td>1</td><td>3</td></tr><tr><td>P3</td><td>2</td><td>8</td></tr><tr><td>P4</td><td>3</td><td>2</td></tr></table></div>",
 ans:[["4.75"]],
 exp:`시각 0에는 P1만 도착 → P1 실행(0~6). 시각 6에 대기 중인 P2(3), P3(8), P4(2) 중 실행 시간이 가장 짧은 순으로 실행
<pre>| P1 0~6 | P4 6~8 | P2 8~11 | P3 11~19 |</pre>
대기 시간 = 시작 시각 − 도착 시각<br>
P1: 0, P4: 6−3=3, P2: 8−1=7, P3: 11−2=9 → 합 19 / 4 = <b>4.75</b>`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오.",
 code:`
#include <stdio.h>
#include <string.h>

int main() {
    char s[] = "KOREA2026";
    int n = strlen(s), cnt = 0;

    for (int i = 0; i < n; i++) {
        if (s[i] >= '0' && s[i] <= '9')
            cnt += s[i] - '0';
        else if (s[i] == 'A' || s[i] == 'E' || s[i] == 'O')
            cnt++;
    }
    printf("%d", cnt * n);
    return 0;
}`,
 ans:[["117"]],
 exp:`n = strlen("KOREA2026") = 9 (널 문자 제외)<br>
숫자 문자: <code>s[i] - '0'</code>으로 정수 변환 → 2 + 0 + 2 + 6 = 10<br>
모음 O, E, A → 3<br>
cnt = 13 → 13 × 9 = <b>117</b>`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
public class Main {
    static int test(int x) {
        try {
            if (x == 0) throw new ArithmeticException();
            return 10 / x;
        } catch (ArithmeticException e) {
            System.out.print("E");
            return -1;
        } finally {
            System.out.print("F");
        }
    }

    public static void main(String[] args) {
        int a = test(0);
        int b = test(5);
        System.out.print(a + b);
    }
}`,
 ans:[["EFF1"]],
 exp:`• test(0): 예외 발생 → catch에서 "E" 출력, return −1 대기 → <b>finally는 return 전에 반드시 실행</b> "F" → a = −1<br>
• test(5): return 2 대기 → finally "F" → b = 2<br>
• a + b = 1<br>결과: <code>EFF1</code>`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
class Counter:
    total = 0

    def __init__(self, n):
        self.n = n
        Counter.total += n

    def __add__(self, other):
        return Counter(self.n + other.n)

a = Counter(3)
b = Counter(4)
c = a + b
print(c.n, Counter.total)`,
 ans:[["7 14"]],
 exp:`<code>total</code>은 모든 인스턴스가 공유하는 <b>클래스 변수</b>입니다.<br>
Counter(3) → total 3, Counter(4) → total 7<br>
<code>a + b</code> → <code>__add__</code> 호출 → Counter(7) 생성 → total 14, c.n = 7<br>결과: <code>7 14</code>`},

{cat:"네트워크",
 q:"다음은 IPv4에서 IPv6로의 전환 기술에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.<div class=\"box\">• ( ① ): 하나의 호스트나 라우터에서 IPv4와 IPv6 프로토콜을 <b>동시에</b> 처리할 수 있도록 두 스택을 모두 구성하는 방식<br>• ( ② ): IPv6 패킷을 IPv4 패킷 안에 <b>캡슐화</b>하여 IPv4 네트워크를 통과시키는 방식<br>• ( ③ ): IPv4와 IPv6의 <b>헤더를 상호 변환</b>하여 통신하는 방식</div>",
 ans:[["듀얼 스택","듀얼스택","Dual Stack","이중 스택"],["터널링","Tunneling"],["헤더 변환","헤더변환","주소 변환","주소변환","Header Translation","NAT-PT","변환"]],
 exp:`IPv4 → IPv6 전환 기술 3가지: <b>듀얼 스택(Dual Stack), 터널링(Tunneling), 헤더(주소) 변환(Translation)</b><br>
IPv6: 128비트, 16비트씩 8개 필드를 콜론(:)으로 구분, 16진수 표기, 유니캐스트·멀티캐스트·애니캐스트 (브로드캐스트 없음)`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오.",
 code:`
#include <stdio.h>
#define SQ(x) x * x

int main() {
    int a = 3;
    int r1 = SQ(a + 1);
    int r2 = 50 / SQ(5);
    printf("%d %d", r1, r2);
    return 0;
}`,
 ans:[["7 50"]],
 exp:`매크로는 괄호 없이 <b>텍스트 그대로 치환</b>됩니다.<br>
• <code>SQ(a + 1)</code> → <code>a + 1 * a + 1</code> = 3 + 3 + 1 = <b>7</b> (16 아님)<br>
• <code>50 / SQ(5)</code> → <code>50 / 5 * 5</code> = 10 × 5 = <b>50</b> (2 아님)<br>
올바른 정의: <code>#define SQ(x) ((x) * (x))</code>`},

{cat:"소프트웨어공학",
 q:"다음은 소프트웨어 형상 관리(SCM) 절차에 대한 설명이다. 설명에 해당하는 절차를 쓰시오.<div class=\"box\">식별된 형상 항목에 대한 <b>변경 요구를 검토하여 승인 여부를 결정</b>하고, 현재의 베이스라인(기준선)에 잘 반영될 수 있도록 조정하는 작업으로, <b>형상 통제 위원회(CCB)</b>의 승인을 통해 변경이 이루어진다.</div>",
 ans:[["형상 통제","형상통제","Configuration Control","변경 통제","변경통제"]],
 exp:`형상 관리 절차: <b>형상 식별 → 형상 통제 → 형상 감사 → 형상 기록(상태 보고)</b><br>
• 형상 식별: 관리 대상에 이름과 번호 부여<br>• <b>형상 통제</b>: 변경 요구 검토·승인(CCB)<br>• 형상 감사: 베이스라인 무결성 평가<br>• 형상 기록: 변경 사항을 기록·보고<br>대표 도구: Git, SVN, CVS`},

{cat:"보안",
 q:"다음은 접근 통제 정책에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 영문 약어로 쓰시오.<div class=\"box\">• ( ① ): 데이터 <b>소유자</b>가 사용자나 그룹의 신원에 따라 접근 권한을 부여하는 방식<br>• ( ② ): 주체와 객체의 <b>보안 등급(비밀 등급)</b>을 비교하여 시스템이 강제적으로 접근을 통제하는 방식<br>• ( ③ ): 사용자의 <b>역할(Role)</b>에 따라 접근 권한을 부여하며, 중앙 관리자가 권한을 관리하는 방식</div>",
 ans:[["DAC","임의적 접근 통제","임의적접근통제","Discretionary Access Control"],["MAC","강제적 접근 통제","강제적접근통제","Mandatory Access Control"],["RBAC","역할 기반 접근 통제","역할기반접근통제","Role Based Access Control","Role-Based Access Control"]],
 exp:`• <b>DAC</b>(임의적 접근 통제): 신원 기반, 소유자가 권한 부여 (예: 파일 권한, ACL)<br>• <b>MAC</b>(강제적 접근 통제): 규칙 기반, 보안 레이블 비교 (군사 시스템)<br>• <b>RBAC</b>(역할 기반 접근 통제): 직무/역할 기반, 인사 이동이 잦은 조직에 적합`},

{cat:"SQL",
 q:`다음은 데이터 제어어(DCL)에 대한 SQL문이다. 괄호에 들어갈 알맞은 키워드를 쓰시오.
<div class="box">• 사용자 kim에게 [학생] 테이블의 SELECT, UPDATE 권한을 부여하고, kim이 <b>다른 사용자에게도 해당 권한을 부여할 수 있도록</b> 하는 SQL문<br>
<code>GRANT SELECT, UPDATE ON 학생 TO kim ( ① );</code><br><br>
• kim의 권한을 회수하면서, kim이 <b>다른 사용자에게 부여한 권한까지 연쇄적으로 회수</b>하는 SQL문<br>
<code>REVOKE SELECT, UPDATE ON 학생 FROM kim ( ② );</code></div>`,
 ans:[["WITH GRANT OPTION"],["CASCADE"]],
 exp:`• <code>WITH GRANT OPTION</code>: 부여받은 권한을 다른 사용자에게 다시 부여할 수 있음<br>
• <code>CASCADE</code>: 연쇄 회수 (반대: RESTRICT – 다른 곳에 부여된 권한이 있으면 회수 거부)<br>
• 권한 부여 권한만 회수: <code>REVOKE GRANT OPTION FOR ...</code><br>
DCL: GRANT, REVOKE, COMMIT, ROLLBACK (TCL로 따로 구분하기도 함)`}
]};
