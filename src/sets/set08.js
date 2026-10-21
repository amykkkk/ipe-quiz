const SET8_CUST = `<div class="tblwrap"><table><tr><th colspan="3">[고객]</th></tr><tr><th>고객번호</th><th>이름</th><th>등급</th></tr>
<tr><td>C1</td><td>김민준</td><td>VIP</td></tr>
<tr><td>C2</td><td>이서연</td><td>GOLD</td></tr>
<tr><td>C3</td><td>박지호</td><td>VIP</td></tr>
<tr><td>C4</td><td>최유나</td><td>SILVER</td></tr>
<tr><td>C5</td><td>정하은</td><td>GOLD</td></tr></table></div>
<div class="tblwrap"><table><tr><th colspan="3">[주문]</th></tr><tr><th>주문번호</th><th>고객번호</th><th>금액</th></tr>
<tr><td>O1</td><td>C1</td><td>30000</td></tr>
<tr><td>O2</td><td>C2</td><td>15000</td></tr>
<tr><td>O3</td><td>C1</td><td>50000</td></tr>
<tr><td>O4</td><td>C4</td><td>8000</td></tr>
<tr><td>O5</td><td>C2</td><td>42000</td></tr>
<tr><td>O6</td><td>C5</td><td>20000</td></tr></table></div>`;

const SET8_EMP = `<div class="tblwrap"><table><tr><th colspan="5">[사원]</th></tr><tr><th>사번</th><th>이름</th><th>부서</th><th>급여</th><th>관리자사번</th></tr>
<tr><td>E1</td><td>강도윤</td><td>영업</td><td>500</td><td>NULL</td></tr>
<tr><td>E2</td><td>윤서아</td><td>영업</td><td>350</td><td>E1</td></tr>
<tr><td>E3</td><td>장민호</td><td>개발</td><td>420</td><td>E1</td></tr>
<tr><td>E4</td><td>오지민</td><td>개발</td><td>300</td><td>E3</td></tr>
<tr><td>E5</td><td>임하준</td><td>개발</td><td>450</td><td>E3</td></tr></table></div>
<div class="tblwrap"><table><tr><th colspan="2">[부서]</th></tr><tr><th>부서코드</th><th>부서명</th></tr>
<tr><td>D1</td><td>영업</td></tr>
<tr><td>D2</td><td>개발</td></tr>
<tr><td>D3</td><td>인사</td></tr></table></div>`;

const EXAM = {
title: "정보처리기사 실기 예상문제 제8회 (2026년 제3회 대비)",
questions: [
{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오. (값 사이는 한 칸씩 띄어 쓰시오.)",
 code:`
#include <stdio.h>

typedef struct {
    char name[10];
    int score;
    int bonus;
} Student;

void update(Student *s, int add) {
    s->score += add;
    s->bonus = s->score / 10;
    add = add * 2;
}

void reset(Student s) {
    s.score = 0;
    s.bonus = 0;
}

int main() {
    Student st[3] = {{"Kim", 70, 0}, {"Lee", 85, 0}, {"Park", 92, 0}};
    Student *p = st;
    int add = 5;

    for (int i = 0; i < 3; i++) {
        update(p + i, add);
        add += 3;
    }
    reset(st[1]);
    (p + 2)->score -= st[0].bonus;

    printf("%d %d %d", st[0].score + st[0].bonus, st[1].score, p[2].score + (*(p + 1)).bonus);
    return 0;
}`,
 ans:[["82 93 105"]],
 exp:`<code>update</code>는 구조체의 <b>주소</b>를 받으므로 <code>s-&gt;score</code> 변경이 원본에 반영됩니다. 반면 매개변수 <code>add</code>는 값 복사이므로 함수 안의 <code>add = add * 2</code>는 main의 add에 영향이 없습니다.
<pre>i=0: add=5  → Kim  score 75,  bonus 75/10 = 7   (main add → 8)
i=1: add=8  → Lee  score 93,  bonus 9            (main add → 11)
i=2: add=11 → Park score 103, bonus 10           (main add → 14)</pre>
<code>reset(st[1])</code>은 구조체를 <b>값으로 전달</b>(복사본)하므로 원본 Lee는 그대로 93, 9입니다.<br>
<code>(p+2)-&gt;score -= st[0].bonus</code> → Park 103 − 7 = 96<br>
출력: 75+7 = <b>82</b>, <b>93</b>, 96 + Lee의 bonus 9 = <b>105</b> → <code>82 93 105</code>`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
class Animal {
    int leg = 4;
    String sound() { return "..."; }
}
class Dog extends Animal {
    String sound() { return "Woof"; }
    int fetch() { return 10; }
}
class Puppy extends Dog {
    String sound() { return "Yip"; }
    int fetch() { return 3; }
}
class Bird extends Animal {
    Bird() { leg = 2; }
    String sound() { return "Tweet"; }
}
public class Main {
    public static void main(String[] args) {
        Animal[] arr = { new Dog(), new Bird(), new Puppy(), new Animal() };
        int total = 0;
        String s = "";
        for (Animal a : arr) {
            if (a instanceof Dog) {
                Dog d = (Dog) a;
                total += d.fetch();
                s += d.sound().charAt(0);
            } else if (a instanceof Bird) {
                total += a.leg * 100;
            } else {
                s += a.sound().length();
            }
        }
        System.out.print(s + " " + total);
    }
}`,
 ans:[["WY3 213"]],
 exp:`<code>instanceof</code>는 해당 클래스 <b>또는 그 하위 클래스</b>의 객체이면 true입니다.
<pre>Dog    : instanceof Dog → true  → fetch() 10, sound() "Woof" → s="W",   total=10
Bird   : instanceof Dog → false, instanceof Bird → true → leg 2*100 → total=210
Puppy  : instanceof Dog → true (Dog의 자식) → (Dog)로 다운캐스팅해도
         실제 객체가 Puppy이므로 오버라이딩된 fetch() 3, sound() "Yip"
         → s="WY", total=213
Animal : 둘 다 false → "...".length() = 3 → s="WY3"</pre>
<code>String += char</code>는 문자를 이어 붙입니다(정수 덧셈 아님). 결과: <code>WY3 213</code>`},

{cat:"SQL",
 q:`다음 [고객], [주문] 테이블에 대하여 아래 두 SQL문을 실행했을 때 각각의 결과값을 쓰시오.` + SET8_CUST + `
<div class="box">① <code>SELECT COUNT(*) FROM 고객 C<br>&nbsp;&nbsp;&nbsp;WHERE EXISTS (SELECT * FROM 주문 O<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHERE O.고객번호 = C.고객번호 AND O.금액 &gt;= 20000);</code><br><br>
② <code>SELECT COUNT(*) FROM 고객 C<br>&nbsp;&nbsp;&nbsp;WHERE NOT EXISTS (SELECT * FROM 주문 O<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHERE O.고객번호 = C.고객번호 AND O.금액 &gt;= 20000);</code></div>`,
 ans:[["3"],["2"]],
 exp:`<b>상관 부속질의(Correlated Subquery)</b>: 바깥 쿼리의 각 행(C)마다 서브쿼리가 실행되고, <code>EXISTS</code>는 서브쿼리 결과가 <b>한 행이라도 있으면 참</b>입니다.
<pre>고객 | 20000 이상 주문      | EXISTS | NOT EXISTS
C1   | O1(30000), O3(50000) | 참     | 거짓
C2   | O5(42000)            | 참     | 거짓
C3   | 주문 없음            | 거짓   | 참
C4   | 없음(O4는 8000)      | 거짓   | 참
C5   | O6(20000)            | 참     | 거짓</pre>
• C1은 해당 주문이 2건이지만 고객 테이블 기준 1행이므로 한 번만 셉니다.<br>
• C5의 20000은 <code>&gt;=</code> 조건이므로 포함됩니다.<br>
① <b>3</b> (C1, C2, C5) ② <b>2</b> (C3, C4)`},

{cat:"데이터베이스",
 q:`다음은 병행 제어(Concurrency Control)를 하지 않았을 때 발생하는 문제점에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.
<div class="box">• ( ① ): 잔고가 100인 계좌에 대해 T1이 100을 읽고, T2도 100을 읽은 뒤 T1이 +50 하여 150을 기록하고, 이어서 T2가 −30 하여 70을 기록하였다. 결과적으로 T1의 갱신 내용이 사라졌다.<br>
• ( ② ): 하나의 트랜잭션이 수행 중일 때 그 <b>중간 수행 결과</b>를 다른 트랜잭션이 참조하여 오류가 발생한다.<br>
• ( ③ ): 두 트랜잭션이 동시에 실행되어 데이터베이스가 서로 <b>일관성이 없는 상태</b>로 남는다.<br>
• ( ④ ): 여러 트랜잭션이 데이터를 공유하던 중 하나의 트랜잭션이 <b>취소(Rollback)</b>되면, 그 트랜잭션이 갱신한 데이터를 사용한 다른 트랜잭션도 함께 취소해야 한다.</div>`,
 ans:[["갱신 손실","갱신손실","Lost Update","분실된 갱신","갱신 분실"],["현황 파악 오류","현황파악오류","Dirty Read","더티 리드","오손 판독","현황 파악오류"],["모순성","Inconsistency","불일치성","비일관성"],["연쇄 복귀","연쇄복귀","Cascading Rollback","연쇄 복귀(Cascading Rollback)","연쇄 롤백","연쇄롤백","Cascading Abort"]],
 exp:`병행 제어 미실시 시 문제점 4가지<br>
① <b>갱신 손실(Lost Update)</b>: 같은 데이터를 동시에 갱신하여 한쪽 갱신이 덮어써짐 (정상이라면 100+50−30 = 120이어야 함)<br>
② <b>현황 파악 오류(Dirty Read)</b>: 커밋되지 않은 중간 결과를 읽음<br>
③ <b>모순성(Inconsistency)</b>: 동시 실행으로 데이터 간 일관성이 깨짐<br>
④ <b>연쇄 복귀(Cascading Rollback)</b>: 한 트랜잭션의 롤백이 다른 트랜잭션의 롤백을 연쇄적으로 유발<br>
해결 기법: 로킹(2PL), 타임스탬프 순서, 낙관적 검증, 다중 버전 기법`},

{cat:"보안",
 q:`다음은 로그인 처리를 위해 사용자 입력값을 그대로 이어 붙여 SQL문을 만드는 코드의 예이다. 공격자가 아이디에 <code>admin</code>, 비밀번호에 <code>' OR '1'='1</code>을 입력하자 비밀번호를 모르고도 로그인에 성공하였다. ① 이 공격 기법의 명칭과 ② 이를 방지하기 위해 SQL 구조와 입력값을 분리하여 바인딩 변수(?)로 전달하는 방식을 쓰시오.
<div class="box"><code>sql = "SELECT * FROM users WHERE id='" + id + "' AND pw='" + pw + "'";</code><br><br>
실행되는 SQL: <code>SELECT * FROM users WHERE id='admin' AND pw='' OR '1'='1'</code></div>`,
 ans:[["SQL 인젝션","SQL Injection","SQL 삽입","SQL삽입","SQL인젝션","SQL 주입","SQLi"],["Prepared Statement","PreparedStatement","프리페어드 스테이트먼트","매개변수화 쿼리","파라미터화 쿼리","Parameterized Query","바인딩 변수","바인드 변수","준비된 문장"]],
 exp:`① <b>SQL 인젝션(SQL Injection)</b>: 입력값에 SQL 구문을 삽입하여 DB를 비정상적으로 조작하는 공격.<br>
AND가 OR보다 우선순위가 높으므로 조건은 <code>(id='admin' AND pw='') OR '1'='1'</code>이 되어 <b>항상 참</b> → 모든 행 반환<br>
② <b>Prepared Statement(매개변수화 쿼리)</b>: <code>"SELECT * FROM users WHERE id=? AND pw=?"</code>처럼 쿼리 구조를 먼저 컴파일하고 입력값은 데이터로만 바인딩하므로 구문으로 해석되지 않음<br>
기타 대응: 입력값 검증(화이트리스트), 특수문자 필터링, 최소 권한 DB 계정, 오류 메시지 노출 금지`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
class Account:
    rate = 0.1
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance
    def interest(self):
        return int(self.balance * self.rate)
    def info(self):
        return self.owner + ":" + str(self.balance + self.interest())

class Saving(Account):
    rate = 0.2
    def __init__(self, owner, balance, bonus):
        super().__init__(owner, balance * 2)
        self.bonus = bonus
    def interest(self):
        return super().interest() + self.bonus

accs = [Account("A", 1000), Saving("B", 500, 50)]
print(accs[0].info(), accs[1].info())`,
 ans:[["A:1100 B:1250"]],
 exp:`• <code>Account("A", 1000)</code>: interest = int(1000 × 0.1) = 100 → "A:1100"<br>
• <code>Saving("B", 500, 50)</code>: <code>super().__init__(owner, balance*2)</code>로 balance = <b>1000</b><br>
<pre>accs[1].info()            → Account.info (상속)
  self.interest()         → Saving.interest (오버라이딩, 동적 바인딩)
    super().interest()    → int(self.balance * self.rate)
                            self.rate는 인스턴스의 클래스 Saving 기준 → 0.2
                          = int(1000 * 0.2) = 200
    + self.bonus 50       → 250
  1000 + 250 = 1250       → "B:1250"</pre>
부모 메서드 안의 <code>self.rate</code>도 실제 객체(Saving)의 클래스 변수 0.2를 찾는다는 점이 함정입니다. 결과: <code>A:1100 B:1250</code>`},

{cat:"네트워크",
 q:`다음은 매체 접근 제어(MAC) 방식에 대한 설명이다. 괄호에 들어갈 알맞은 방식을 영문 약어로 쓰시오.
<div class="box">• ( ① ): <b>IEEE 802.3(유선 이더넷)</b>에서 사용한다. 전송 전 채널을 감지하고, 전송 중 <b>충돌을 감지</b>하면 즉시 전송을 중단하고 잼(Jam) 신호를 보낸 뒤 임의 시간(Backoff) 후 재전송한다.<br>
• ( ② ): <b>IEEE 802.11(무선 LAN)</b>에서 사용한다. 무선 환경에서는 충돌 감지가 어려우므로 채널이 비어 있어도 임의 시간 대기 후 전송하거나 <b>RTS/CTS</b> 신호를 교환하여 충돌을 사전에 <b>회피</b>한다.</div>`,
 ans:[["CSMA/CD","CSMA-CD","CSMACD"],["CSMA/CA","CSMA-CA","CSMACA"]],
 exp:`① <b>CSMA/CD</b> (Carrier Sense Multiple Access / Collision <b>Detection</b>) — 유선, 충돌 <b>감지</b> 후 재전송<br>
② <b>CSMA/CA</b> (Carrier Sense Multiple Access / Collision <b>Avoidance</b>) — 무선, 충돌 <b>회피</b>(IFS 대기, RTS/CTS, ACK)<br>
무선에서 충돌 감지가 어려운 이유: 송신 중에는 수신이 어렵고, 서로 보이지 않는 <b>숨겨진 노드(Hidden Node)</b> 문제가 있기 때문`},

{cat:"소프트웨어공학",
 seq:true,
 q:`다음 [보기]는 요구사항 개발 프로세스의 단계이다. 진행 순서대로 기호를 나열하시오. (예: ㄱ, ㄴ, ㄷ, ㄹ)
<div class="box">[보기] ㄱ. 명세(Specification) &nbsp; ㄴ. 도출(Elicitation) &nbsp; ㄷ. 확인(Validation) &nbsp; ㄹ. 분석(Analysis)</div>`,
 ans:[["ㄴ, ㄹ, ㄱ, ㄷ"]],
 exp:`요구사항 개발 프로세스: <b>도출 → 분석 → 명세 → 확인</b> (암기: 도-분-명-확)<br>
• <b>도출</b>: 인터뷰, 브레인스토밍, 설문, 프로토타이핑, 유스케이스 등으로 요구사항 수집<br>
• <b>분석</b>: 불명확·모순 요구 식별, 범위 결정, 자료 흐름도(DFD)·자료 사전(DD) 활용<br>
• <b>명세</b>: 요구사항을 문서화(SRS), 정형/비정형 명세<br>
• <b>확인(검증)</b>: 이해관계자가 요구사항이 올바른지 검토, 형상 관리로 베이스라인 설정`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오. (ASCII 코드: 'A' = 65, 'a' = 97, '0' = 48)",
 code:`
#include <stdio.h>

int main() {
    char s[] = "xYz9Ab";
    int cnt = 0;

    for (int i = 0; s[i]; i++) {
        if (s[i] >= 'a' && s[i] <= 'z') {
            s[i] = s[i] - 32;
        } else if (s[i] >= 'A' && s[i] <= 'Z') {
            s[i] = s[i] + 32;
            cnt++;
        } else {
            s[i] = s[i] + 1;
        }
    }
    printf("%s %c%d", s, s[4] + cnt, s[3]);
    return 0;
}`,
 ans:[["XyZ:aB c58"]],
 exp:`소문자 − 32 → 대문자, 대문자 + 32 → 소문자, 그 밖의 문자는 ASCII 코드 + 1
<pre>x(120) → X(88)
Y(89)  → y(121)   cnt=1
z(122) → Z(90)
9(57)  → 58 = ':'  ('9'+1은 숫자 10이 아니라 문자 ':')
A(65)  → a(97)    cnt=2
b(98)  → B(66)</pre>
s = "XyZ:aB"<br>
<code>%c</code>에 s[4] + cnt = 'a'(97) + 2 = 99 → <b>c</b><br>
<code>%d</code>에 s[3] = ':' → 정수로 출력 <b>58</b><br>
결과: <code>XyZ:aB c58</code>`},

{cat:"운영체제",
 q:`다음 설명의 괄호에 들어갈 알맞은 용어를 쓰시오.
<div class="box">• ( ① ): 다중 프로그래밍 정도가 지나치게 높거나 프로세스에 할당된 프레임 수가 부족하여 <b>페이지 부재(Page Fault)가 과도하게 발생</b>하고, 프로세스 실행 시간보다 <b>페이지 교체에 소요되는 시간이 더 많아져</b> CPU 이용률이 급격히 떨어지는 현상이다.<br>
• ( ② ): 데닝(Denning)이 제안한 개념으로, 프로세스가 <b>일정 시간 동안 자주 참조하는 페이지들의 집합</b>을 의미한다. 이 집합을 주기억장치에 상주시켜 ① 현상을 방지한다.</div>`,
 ans:[["스래싱","Thrashing","쓰래싱","스레싱","쓰레싱"],["워킹 셋","워킹셋","Working Set","작업 집합","작업집합","워킹 세트"]],
 exp:`① <b>스래싱(Thrashing)</b>: 페이지 부재 폭증 → 페이지 교체에 시간 소모 → CPU 이용률 급감<br>
② <b>워킹 셋(Working Set)</b>: 지역성(Locality)에 근거하여 일정 시간 Δ 동안 참조한 페이지 집합을 메모리에 유지<br>
그 밖의 스래싱 방지책: <b>페이지 부재 빈도(PFF)</b> 방식(부재율 상한·하한으로 프레임 조절), 다중 프로그래밍 정도 낮추기`},

{cat:"보안",
 q:`다음 설명의 괄호에 들어갈 알맞은 용어를 쓰시오.
<div class="box">공격자는 같은 LAN에 있는 피해자에게 <b>위조된 ARP 응답(Reply)</b>을 반복적으로 보내 <b>게이트웨이의 IP 주소에 공격자의 MAC 주소</b>가 대응되도록 피해자의 ARP 캐시를 변조한다. 이 공격을 ( ① )이라 하며, 이후 피해자가 외부로 보내는 패킷은 공격자를 거쳐 가게 된다.<br>
공격자는 이렇게 자신에게 흘러온 패킷을 중간에서 몰래 엿보아 계정·비밀번호 등을 수집하는데, 이처럼 네트워크 상의 패킷을 <b>도청</b>하는 수동적 공격을 ( ② )이라 한다.</div>`,
 ans:[["ARP 스푸핑","ARP스푸핑","ARP Spoofing","ARP 캐시 포이즈닝","ARP Cache Poisoning","ARP 포이즈닝"],["스니핑","Sniffing","스니핑 공격"]],
 exp:`① <b>ARP 스푸핑(ARP Spoofing)</b>: IP–MAC 대응을 위조(속임). 스푸핑은 <b>신분을 속이는</b> 능동적 공격<br>
② <b>스니핑(Sniffing)</b>: 패킷을 엿듣는(도청) <b>수동적</b> 공격, NIC를 무차별 모드(Promiscuous Mode)로 설정<br>
ARP 스푸핑 + 스니핑 = 중간자 공격(MITM)의 대표 사례. 대응: <b>정적 ARP 테이블</b>(arp -s), ARP 감시 도구, 암호화 통신`},

{cat:"SQL",
 q:`다음 [사원], [부서] 테이블에 대하여 아래 SQL문을 실행했을 때 각각의 결과값을 쓰시오.` + SET8_EMP + `
<div class="box">① <code>SELECT COUNT(*) FROM 사원 CROSS JOIN 부서;</code><br><br>
② <code>SELECT COUNT(*) FROM 사원 E, 사원 M<br>&nbsp;&nbsp;&nbsp;WHERE E.관리자사번 = M.사번 AND E.급여 &gt; M.급여;</code><br><br>
③ <code>SELECT MAX(급여) - MIN(급여) FROM 사원 WHERE 부서 = '개발';</code></div>`,
 ans:[["15"],["1"],["150"]],
 exp:`① <b>CROSS JOIN(교차 조인, 카티션 곱)</b>: 조건 없이 모든 행을 조합 → 5 × 3 = <b>15</b>행 (차수는 5 + 2 = 7)<br>
② <b>셀프 조인(Self Join)</b>: 같은 테이블을 별칭 E(사원), M(관리자)으로 두 번 사용
<pre>E(급여)       M(급여)        E.급여 &gt; M.급여?
E2 윤서아 350 E1 강도윤 500   X
E3 장민호 420 E1 강도윤 500   X
E4 오지민 300 E3 장민호 420   X
E5 임하준 450 E3 장민호 420   O
(E1은 관리자사번이 NULL → 조인 조건 불만족, 제외)</pre>
→ <b>1</b><br>
③ 개발 부서 급여 420, 300, 450 → 450 − 300 = <b>150</b>`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
public class Main {
    public static void main(String[] args) {
        String s = "2026-INFO-PROC-EXAM";
        String[] parts = s.split("-");
        int idx = s.indexOf("O");
        String sub = s.substring(5, 9);

        System.out.print(parts.length + " ");
        System.out.print(idx + " ");
        System.out.print(sub.toLowerCase() + " ");
        System.out.print(parts[2].charAt(1) + parts[3].length());
        System.out.print(" " + s.lastIndexOf("O"));
    }
}`,
 ans:[["4 8 info 86 12"]],
 exp:`<pre>인덱스: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18
문자  : 2 0 2 6 - I N F O -  P  R  O  C  -  E  X  A  M</pre>
• <code>split("-")</code> → ["2026", "INFO", "PROC", "EXAM"] → 길이 <b>4</b><br>
• <code>indexOf("O")</code> → 처음 나오는 O의 위치 <b>8</b><br>
• <code>substring(5, 9)</code> → 5 이상 9 미만 "INFO" → toLowerCase → <b>info</b><br>
• <code>parts[2].charAt(1)</code> = 'R'(char), <code>parts[3].length()</code> = 4(int) → <b>char + int는 정수 덧셈</b> → 82 + 4 = <b>86</b><br>
• <code>lastIndexOf("O")</code> → 마지막 O의 위치 <b>12</b><br>
결과: <code>4 8 info 86 12</code>`},

{cat:"소프트웨어공학",
 q:`다음 설명에 해당하는 디자인 패턴을 쓰시오.
<div class="box">구조(Structural) 패턴의 하나로, 실제 객체에 대한 <b>대리자(대변인) 객체</b>를 두어 실제 객체로의 <b>접근을 제어</b>한다. 비용이 큰 객체의 생성을 실제로 필요할 때까지 미루거나(가상), 원격지 객체를 로컬처럼 사용하게 하거나(원격), 접근 권한을 검사하는(보호) 용도로 사용한다. 클라이언트는 대리자와 실제 객체를 같은 인터페이스로 사용한다.</div>`,
 ans:[["Proxy","프록시","Proxy Pattern","프록시 패턴","프록시패턴"]],
 exp:`<b>프록시(Proxy) 패턴</b>: 실제 객체(RealSubject)와 같은 인터페이스(Subject)를 구현한 대리 객체가 요청을 받아 제어 후 위임<br>
종류: 가상 프록시(지연 로딩), 원격 프록시, 보호 프록시, 캐싱 프록시<br>
GoF 구조 패턴 7가지: 어댑터, 브리지, 컴포지트, 데코레이터, 퍼사드, 플라이웨이트, <b>프록시</b><br>
비교 — 데코레이터는 <b>기능 추가</b>, 프록시는 <b>접근 제어</b>가 목적`},

{cat:"데이터베이스",
 q:`다음은 ANSI/SPARC에서 제안한 3단계 스키마에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.
<div class="box">• ( ① ): 사용자나 응용 프로그래머가 각 개인의 입장에서 필요로 하는 데이터베이스의 논리적 구조로, <b>서브 스키마</b>라고도 하며 여러 개가 존재할 수 있다.<br>
• ( ② ): 데이터베이스 <b>전체</b>의 논리적 구조로, 모든 응용 프로그램이나 사용자들이 필요로 하는 데이터를 종합한 조직 전체의 데이터베이스이며 하나만 존재한다. 개체 간의 관계, 제약 조건, 접근 권한, 보안 정책 등을 정의한다.<br>
• ( ③ ): <b>물리적 저장 장치</b>의 입장에서 본 데이터베이스 구조로, 레코드 형식, 저장 데이터 항목의 표현 방법, 내부 레코드의 물리적 순서 등을 나타낸다.<br>
• ① 과 ② 사이의 독립성, 즉 ②가 변경되어도 ①이나 응용 프로그램이 영향을 받지 않는 성질을 ( ④ ) 독립성이라 한다.</div>`,
 ans:[["외부 스키마","외부스키마","External Schema","서브 스키마"],["개념 스키마","개념스키마","Conceptual Schema"],["내부 스키마","내부스키마","Internal Schema"],["논리적","논리","논리적 데이터","Logical"]],
 exp:`3단계 스키마: <b>외부(사용자 관점) – 개념(조직 전체 관점) – 내부(물리적 저장 관점)</b><br>
• <b>논리적 데이터 독립성</b>: 개념 스키마가 변경되어도 외부 스키마·응용 프로그램은 영향 없음 (외부/개념 사상)<br>
• <b>물리적 데이터 독립성</b>: 내부 스키마(저장 구조)가 변경되어도 개념 스키마는 영향 없음 (개념/내부 사상)`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
import copy

a = [1, 2, [3, 4]]
b = a
c = a[:]
d = copy.deepcopy(a)

b[0] = 10
c[1] = 20
c[2][0] = 30
d[2][1] = 40

print(a, c[0], d[2], a is b)`,
 ans:[["[10, 2, [30, 4]] 1 [3, 40] True","[10,2,[30,4]] 1 [3,40] True"]],
 exp:`• <code>b = a</code>: <b>같은 객체</b>를 가리키는 별칭(alias) → b[0] = 10이 a에도 반영<br>
• <code>c = a[:]</code>: <b>얕은 복사</b> → 바깥 리스트는 새 객체지만 안쪽 리스트 [3, 4]는 a와 <b>공유</b><br>
• <code>d = copy.deepcopy(a)</code>: <b>깊은 복사</b> → 안쪽 리스트까지 새로 생성
<pre>b[0] = 10     → a = [10, 2, [3, 4]]
c[1] = 20     → c = [1, 20, [3, 4]]   (a 영향 없음)
c[2][0] = 30  → 공유된 내부 리스트 변경 → a = [10, 2, [30, 4]]
d[2][1] = 40  → d = [1, 2, [3, 40]]   (a 영향 없음)</pre>
<code>c[0]</code>은 복사 시점의 값 1 그대로, <code>a is b</code>는 True<br>
결과: <code>[10, 2, [30, 4]] 1 [3, 40] True</code>`},

{cat:"네트워크",
 q:`다음은 주요 응용 계층 프로토콜과 기본(Well-known) 포트 번호이다. 괄호에 들어갈 포트 번호를 쓰시오.
<div class="box">• HTTP: 80 &nbsp;&nbsp; • HTTPS: ( ① )<br>
• SSH: ( ② ) &nbsp;&nbsp; • Telnet: 23<br>
• DNS: ( ③ ) &nbsp;&nbsp; • SMTP: ( ④ )<br>
• FTP: 데이터 전송 20, <b>제어(명령) 연결</b> ( ⑤ )</div>`,
 ans:[["443"],["22"],["53"],["25"],["21"]],
 exp:`① HTTPS <b>443</b> ② SSH <b>22</b> ③ DNS <b>53</b> (주로 UDP, 영역 전송·대용량 응답은 TCP) ④ SMTP <b>25</b> ⑤ FTP 제어 <b>21</b> (데이터 20)<br>
기타: POP3 110, IMAP 143, SNMP 161(UDP), DHCP 67/68(UDP), TFTP 69(UDP), NTP 123, RDP 3389<br>
Well-known 포트 범위: 0 ~ 1023`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오. (값 사이는 한 칸씩 띄어 쓰시오.)",
 code:`
#include <stdio.h>

int main() {
    int a[3][4] = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}};
    int row[3] = {0}, col[4] = {0};
    int i = 0, j, cnt = 0, k = 5;

    do {
        j = 0;
        do {
            if ((i + j) % 2 == 0) {
                row[i] += a[i][j];
                col[j] += a[i][j];
            }
            cnt++;
            j++;
        } while (j < 4);
        i++;
    } while (i < 3);

    do {
        k -= 2;
        cnt++;
    } while (k > 5);

    printf("%d %d %d", row[1], col[0] + col[3], cnt + k);
    return 0;
}`,
 ans:[["14 18 16"]],
 exp:`(i + j)가 짝수인 칸만 행 합·열 합에 누적합니다.
<pre>       j=0  j=1  j=2  j=3   row
i=0   [1]   2   [3]   4    1+3  = 4
i=1    5   [6]   7   [8]   6+8  = 14
i=2   [9]  10  [11]  12    9+11 = 20
col    10   6    14    8</pre>
안쪽 do-while은 3 × 4 = 12번 실행 → cnt = 12<br>
마지막 do-while은 <b>조건(k &gt; 5)을 나중에 검사</b>하므로 처음부터 거짓이어도 <b>1회는 실행</b> → k = 3, cnt = 13<br>
출력: row[1] = <b>14</b>, col[0] + col[3] = 10 + 8 = <b>18</b>, cnt + k = 13 + 3 = <b>16</b>`},

{cat:"소프트웨어공학",
 q:`다음은 통합 테스트에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.
<div class="box">• <b>상향식 통합 테스트</b>는 하위 모듈부터 결합하며 테스트하므로, 아직 작성되지 않은 <b>상위 모듈의 역할</b>을 대신하여 테스트 대상 모듈을 호출하고 테스트 데이터를 전달하는 ( ① )가 필요하다.<br>
• <b>하향식 통합 테스트</b>는 상위 모듈부터 결합하며 테스트하므로, 아직 작성되지 않은 <b>하위 모듈의 역할</b>을 대신하여 호출되었을 때 미리 정해진 값을 반환하는 임시 모듈인 ( ② )이 필요하다.</div>`,
 ans:[["테스트 드라이버","테스트드라이버","드라이버","Test Driver","Driver"],["테스트 스텁","테스트스텁","스텁","Test Stub","Stub"]],
 exp:`① <b>테스트 드라이버(Test Driver)</b>: 상향식 — 상위 모듈 대신 하위 모듈을 호출·결과 확인<br>
② <b>테스트 스텁(Test Stub)</b>: 하향식 — 하위 모듈 대신 호출되어 고정값 반환<br>
암기: <b>상드하스</b> (상향식-드라이버, 하향식-스텁)<br>
하향식은 깊이 우선/너비 우선으로 통합, 상향식은 하위 모듈을 <b>클러스터(빌드)</b>로 묶어 통합. 그 밖에 샌드위치(혼합식), 빅뱅 방식이 있음`},

{cat:"보안",
 q:`다음은 행정안전부 「소프트웨어 개발보안 가이드」의 시큐어 코딩 보안 약점 유형 중 하나에 대한 설명이다. 해당하는 유형의 명칭을 쓰시오.
<div class="box">프로그램에 입력되는 데이터로 인해 발생하는 보안 약점 유형으로, 입력값에 대한 <b>검증 누락</b>, 부적절한 검증, 잘못된 형식 지정 등으로 인해 발생한다. 대표적인 보안 약점으로 <b>SQL 삽입, 크로스사이트 스크립트(XSS), 경로 조작 및 자원 삽입, 운영체제 명령어 삽입, 위험한 형식 파일 업로드</b> 등이 있다.</div>`,
 ans:[["입력 데이터 검증 및 표현","입력데이터 검증 및 표현","입력 데이터 검증 및 표현 오류","입력데이터검증및표현","입력 데이터 검증","입력값 검증 및 표현"]],
 exp:`<b>입력 데이터 검증 및 표현</b> — 보안 약점 7대 유형 중 하나<br>
7대 유형: <b>입력 데이터 검증 및 표현</b>, 보안 기능, 시간 및 상태, 에러 처리, 코드 오류, 캡슐화, API 오용<br>
대응: 서버 측에서 화이트리스트 기반 입력값 검증, 특수문자 이스케이프, Prepared Statement 사용, 업로드 파일 확장자·크기 제한`}
]};
