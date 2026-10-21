const EXAM = {
title: "정보처리기사 실기 예상문제 제4회 (2026년 제3회 대비)",
questions: [
{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오. (두 값은 한 칸 띄어 쓰시오.)",
 code:`
#include <stdio.h>

void f(int *a, int b) {
    *a = *a + b;
    b = *a * 2;
}

int main() {
    int x = 3, y = 4;
    f(&x, y);
    f(&y, x);
    printf("%d %d", x, y);
    return 0;
}`,
 ans:[["7 11"]],
 exp:`첫 번째 인자는 <b>주소 전달(Call by Reference)</b>, 두 번째는 <b>값 전달(Call by Value)</b>입니다. 함수 안에서 b를 바꿔도 호출한 쪽에는 영향이 없습니다.<br>
• f(&amp;x, 4): x = 3 + 4 = <b>7</b><br>
• f(&amp;y, 7): y = 4 + 7 = <b>11</b><br>결과: <code>7 11</code>`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
class Item {
    static int count = 0;
    int id;
    Item() {
        count++;
        id = count * 10;
    }
}

public class Main {
    public static void main(String[] args) {
        Item a = new Item();
        Item b = new Item();
        Item c = new Item();
        a.count = 7;
        System.out.println(a.id + b.id + c.id + Item.count);
    }
}`,
 ans:[["67"]],
 exp:`생성될 때마다 count가 1, 2, 3으로 증가 → id = 10, 20, 30<br>
<code>a.count = 7</code>은 인스턴스를 통해 접근했지만 <b>static 변수는 클래스 전체가 공유</b>하므로 Item.count = 7<br>
10 + 20 + 30 + 7 = <b>67</b>`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
m = [[1, 2, 3], [4, 5, 6]]
t = list(zip(*m))
print(len(t), t[1][1] * t[2][0])`,
 ans:[["3 15"]],
 exp:`<code>zip(*m)</code>은 <code>zip([1,2,3], [4,5,6])</code>과 같아 행과 열을 바꾼(전치) 결과를 만듭니다.<br>
t = [(1, 4), (2, 5), (3, 6)] → len(t) = 3<br>
t[1][1] = 5, t[2][0] = 3 → 15<br>결과: <code>3 15</code>`},

{cat:"SQL",
 q:`다음 두 테이블 T1, T2가 있을 때, 각 SQL문의 실행 결과 <b>행(튜플)의 수</b>를 쓰시오.
<div class="tblwrap" style="display:flex;gap:16px"><table><tr><th>T1.A</th></tr><tr><td>1</td></tr><tr><td>2</td></tr><tr><td>3</td></tr><tr><td>3</td></tr></table>
<table><tr><th>T2.A</th></tr><tr><td>3</td></tr><tr><td>4</td></tr><tr><td>4</td></tr></table></div>
<div class="box">① <code>SELECT A FROM T1 UNION SELECT A FROM T2;</code><br>② <code>SELECT A FROM T1 UNION ALL SELECT A FROM T2;</code><br>③ <code>SELECT A FROM T1 INTERSECT SELECT A FROM T2;</code></div>`,
 ans:[["4","4행","4개"],["7","7행","7개"],["1","1행","1개"]],
 exp:`• <b>UNION</b>: 합집합, 중복 제거 → {1, 2, 3, 4} → 4행<br>
• <b>UNION ALL</b>: 중복 포함 모두 → 4 + 3 = 7행<br>
• <b>INTERSECT</b>: 교집합(중복 제거) → {3} → 1행<br>
• (참고) <b>EXCEPT / MINUS</b>: 차집합 → T1 − T2 = {1, 2}`},

{cat:"데이터베이스",
 q:"다음 설명에 해당하는 용어를 쓰시오.<div class=\"box\">정규화된 엔티티, 속성, 관계에 대해 시스템의 <b>성능 향상과 개발 및 운영의 편의성</b> 등을 위해 정규화 원칙을 위배하여 <b>중복을 허용하거나 테이블을 통합·분할</b>하는 등의 데이터 모델링 기법으로, 데이터의 일관성과 무결성이 저하될 수 있다.</div>",
 ans:[["반정규화","역정규화","비정규화","Denormalization","반 정규화"]],
 exp:`<b>반정규화(Denormalization)</b> 방법<br>
• 테이블 통합 / 테이블 분할(수평·수직) / 중복 테이블 추가(집계·진행·특정 부분만 포함) / 중복 속성 추가`},

{cat:"데이터베이스",
 q:"다음은 데이터베이스 회복(Recovery) 기법에 대한 설명이다. 괄호에 들어갈 알맞은 연산을 영문으로 쓰시오.<div class=\"box\">• ( ① ): 장애 발생 시 로그를 이용하여 <b>커밋(Commit)된 트랜잭션</b>의 변경 내용을 <b>다시 실행(재수행)</b>하여 데이터베이스에 반영하는 연산<br>• ( ② ): 장애 발생 시 로그를 이용하여 <b>완료되지 않은 트랜잭션</b>의 변경 내용을 <b>취소</b>하여 이전 상태로 되돌리는 연산</div>",
 ans:[["REDO","재실행","재수행"],["UNDO","취소"]],
 exp:`• <b>REDO</b>: 완료된 트랜잭션 재수행 (Commit 기록 있음)<br>• <b>UNDO</b>: 미완료 트랜잭션 취소 (Commit 기록 없음)<br>
회복 기법: 즉시 갱신(REDO + UNDO), 지연 갱신(REDO만), 검사점(Checkpoint), 그림자 페이징(Shadow Paging, UNDO 불필요)`},

{cat:"보안",
 q:"다음 설명에 해당하는 공격 기법을 쓰시오.<div class=\"box\">사용자 PC를 악성코드에 감염시키거나 <b>DNS 서버, hosts 파일을 변조</b>하여, 사용자가 <b>정상적인 웹사이트 주소를 입력해도 가짜 사이트로 접속</b>되도록 유도한 뒤 금융 정보 등을 탈취하는 공격 기법이다.</div>",
 ans:[["파밍","Pharming"]],
 exp:`<b>파밍(Pharming)</b>: 주소 자체를 속이므로 사용자가 알아채기 어려움<br>
비교 — <b>피싱</b>: 가짜 메일·링크로 유도 / <b>스미싱</b>: 문자 메시지 / <b>DNS 스푸핑</b>: DNS 응답 위조(파밍의 주요 수단)`},

{cat:"보안",
 q:"다음 설명에 해당하는 보안 시스템을 쓰시오.<div class=\"box\">비정상적인 접근을 탐지하기 위해 의도적으로 설치해 둔 <b>가상의 취약한 시스템(미끼)</b>으로, 공격자를 유인하여 공격 행위를 기록하고 공격 기법을 분석하는 데 활용한다. 여러 개를 네트워크 형태로 구성하면 허니넷이라 한다.</div>",
 ans:[["허니팟","Honeypot","Honey Pot","허니 팟"]],
 exp:`<b>허니팟(Honeypot)</b>: 공격자를 오래 머물게 하여 추적·분석<br>
관련 — <b>IDS</b>: 침입 탐지 / <b>IPS</b>: 침입 탐지 + 차단 / <b>ESM·SIEM</b>: 보안 이벤트 통합 관리·분석 / <b>DMZ</b>: 외부에 공개되는 서버를 두는 중립 구역`},

{cat:"네트워크",
 q:"다음은 TCP의 연결 설정 과정인 <b>3-Way Handshake</b>이다. 괄호에 들어갈 알맞은 제어 플래그(패킷)를 쓰시오.<div class=\"box\">클라이언트 → 서버: ( ① )<br>서버 → 클라이언트: ( ② )<br>클라이언트 → 서버: ( ③ )</div>",
 ans:[["SYN"],["SYN+ACK","SYN/ACK","SYN,ACK","SYN ACK","SYNACK","SYN-ACK"],["ACK"]],
 exp:`<b>SYN → SYN+ACK → ACK</b> 로 연결 수립 (상태: CLOSED → SYN_SENT → ESTABLISHED)<br>
연결 종료는 <b>4-Way Handshake</b>: FIN → ACK → FIN → ACK<br>
TCP 특징: 연결 지향, 신뢰성 보장, 흐름 제어(슬라이딩 윈도우), 혼잡 제어`},

{cat:"소프트웨어공학",
 q:"다음 설명에 해당하는 디자인 패턴을 쓰시오.<div class=\"box\">생성(Creational) 패턴의 하나로, 객체를 생성하기 위한 <b>인터페이스는 상위 클래스에서 정의</b>하고, <b>어떤 클래스의 인스턴스를 생성할지는 하위 클래스가 결정</b>하도록 하는 패턴이다. 가상 생성자(Virtual Constructor) 패턴이라고도 한다.</div>",
 ans:[["Factory Method","팩토리 메서드","팩토리 메소드","팩토리메서드","팩토리메소드","Factory Method Pattern"]],
 exp:`<b>팩토리 메서드(Factory Method)</b>: 객체 생성을 서브 클래스에 위임<br>
비교 — <b>추상 팩토리</b>: 관련된 객체들의 집합(제품군)을 구체 클래스 지정 없이 생성 / <b>빌더</b>: 복잡한 객체를 단계별로 조립 / <b>프로토타입</b>: 원형 객체를 복제`},

{cat:"소프트웨어공학",
 q:"다음은 인수 테스트(Acceptance Test)의 종류에 대한 설명이다. 괄호에 들어갈 알맞은 테스트 명칭을 쓰시오.<div class=\"box\">• ( ① ) 테스트: <b>개발자의 장소</b>에서 사용자가 개발자 앞에서 수행하는 테스트로, 통제된 환경에서 오류와 사용상의 문제점을 기록한다.<br>• ( ② ) 테스트: <b>선정된 최종 사용자가 실제 업무 환경</b>에서 개발자 없이 수행하는 필드 테스트이다.</div>",
 ans:[["알파","Alpha","알파 테스트","α"],["베타","Beta","베타 테스트","β"]],
 exp:`V-모델 테스트 레벨: <b>단위 → 통합 → 시스템 → 인수</b> 테스트<br>
인수 테스트 종류: 사용자 인수, 운영상 인수, 계약 인수, 규정 인수, <b>알파</b>, <b>베타</b> 테스트`},

{cat:"운영체제",
 q:"페이지 참조 순서가 다음과 같고 할당된 페이지 프레임이 3개일 때, <b>FIFO</b> 페이지 교체 알고리즘을 사용할 경우 발생하는 <b>페이지 부재 횟수</b>를 쓰시오. (초기 프레임은 비어 있다.)<div class=\"box\">7, 0, 1, 2, 0, 3, 0, 4, 2, 3</div>",
 ans:[["9","9회","9번"]],
 exp:`FIFO: 가장 먼저 들어온 페이지를 교체
<pre>참조   : 7  0  1  2  0  3  0  4  2  3
프레임1: 7  7  7  2  2  2  2  4  4  4
프레임2:    0  0  0  0  3  3  3  2  2
프레임3:       1  1  1  1  0  0  0  3
부재   : F  F  F  F     F  F  F  F  F</pre>
두 번째 0 참조만 적중(Hit) → 부재 <b>9회</b>`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오.",
 code:`
#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 4; i++) {
        switch (i % 3) {
            case 0: sum += 1;
            case 1: sum += 10; break;
            case 2: sum += 100;
            default: sum += 1000;
        }
    }
    printf("%d", sum);
    return 0;
}`,
 ans:[["1131"]],
 exp:`break가 없으면 다음 case로 계속 실행되는 <b>폴스루(Fall-through)</b>에 주의합니다.<br>
• i=1 (1): +10 → 10<br>• i=2 (2): +100, default +1000 → 1110<br>• i=3 (0): +1, case 1로 이어서 +10, break → 1121<br>• i=4 (1): +10 → <b>1131</b>`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
public class Main {
    static void p(int x)    { System.out.print("I"); }
    static void p(long x)   { System.out.print("L"); }
    static void p(double x) { System.out.print("D"); }
    static void p(Object x) { System.out.print("O"); }

    public static void main(String[] args) {
        byte b = 1;
        char c = 'A';
        float f = 1.0f;
        Integer i = 5;
        p(b); p(c); p(f); p(i); p(3L);
    }
}`,
 ans:[["IIDOL"]],
 exp:`오버로딩 선택 규칙: ① 정확히 일치 → ② <b>기본형 확대 변환(widening)</b> 중 가장 가까운 타입 → ③ 박싱/언박싱 → ④ 가변인자<br>
• byte → int (가장 가까운 확대) "I"<br>• char → int "I"<br>• float → double "D"<br>• Integer → 언박싱보다 <b>상위 타입(Object) 변환이 우선</b> "O"<br>• 3L(long) → "L"<br>결과: <code>IIDOL</code>`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
s = "Hello, Python World"
words = s.replace(",", "").split()
r = ""
for w in words:
    r += w[0].lower() + w[-1].upper()
print(r)`,
 ans:[["hOpNwD"]],
 exp:`replace로 쉼표 제거 후 공백 기준 split → ["Hello", "Python", "World"]<br>
각 단어의 첫 글자는 소문자, 마지막 글자는 대문자로<br>
Hello → "hO", Python → "pN", World → "wD" → <code>hOpNwD</code>`},

{cat:"네트워크",
 q:"<code>172.16.0.0/16</code> 네트워크를 서브넷 마스크 <code>255.255.240.0</code>으로 분할하려 한다. ① 생성되는 서브넷의 개수와 ② 서브넷당 사용 가능한 호스트 수를 쓰시오.",
 ans:[["16","16개"],["4094","4094개","4,094"]],
 exp:`255.255.<b>240</b>.0 = /20 → /16 대비 서브넷 비트 4개 → 2⁴ = <b>16개</b><br>
호스트 비트 = 32 − 20 = 12 → 2¹² − 2 = <b>4094</b>`},

{cat:"소프트웨어공학",
 seq:true,
 q:"다음 [보기]의 모듈 결합도(Coupling)를 <b>결합도가 약한 것부터 강한 순서</b>로 기호를 나열하시오. (예: ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ)<div class=\"box\">[보기] ㄱ. 내용 결합도 &nbsp; ㄴ. 스탬프 결합도 &nbsp; ㄷ. 데이터 결합도 &nbsp; ㄹ. 제어 결합도 &nbsp; ㅁ. 공통 결합도 &nbsp; ㅂ. 외부 결합도</div>",
 ans:[["ㄷ, ㄴ, ㄹ, ㅂ, ㅁ, ㄱ"]],
 exp:`약 → 강: <b>데이터 → 스탬프 → 제어 → 외부 → 공통 → 내용</b> (암기: 데-스-제-외-공-내)<br>
• 데이터: 값(파라미터)만 전달 / 스탬프: 자료구조 전달 / 제어: 제어 플래그 전달 / 외부: 외부 데이터·통신 프로토콜 공유 / 공통: 전역 변수 공유 / 내용: 다른 모듈 내부 직접 참조<br>
좋은 설계: <b>결합도는 낮게, 응집도는 높게</b>`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오. (값 사이는 한 칸씩 띄어 쓰시오.)",
 code:`
#include <stdio.h>

int main() {
    int x = 0, y = 0, z = 0;

    if (x++ && y++) z = 1;
    if (++x || y++) z += 10;

    printf("%d %d %d", x, y, z);
    return 0;
}`,
 ans:[["2 0 10"]],
 exp:`<b>단락 평가(Short-circuit Evaluation)</b> 문제입니다.<br>
• <code>x++ &amp;&amp; y++</code>: 후위 증가라 x의 값 0(거짓)으로 평가 후 x = 1 → &amp;&amp; 왼쪽이 거짓이므로 <b>y++ 실행 안 됨</b>, z 그대로 0<br>
• <code>++x || y++</code>: x = 2(참) → || 왼쪽이 참이므로 <b>y++ 실행 안 됨</b>, z = 10<br>결과: <code>2 0 10</code>`},

{cat:"보안",
 q:"다음 설명에 해당하는 블록 암호 운영 모드를 영문 약어로 쓰시오.<div class=\"box\">각 평문 블록을 암호화하기 전에 <b>이전 암호문 블록과 XOR</b> 연산을 수행하는 방식으로, 첫 번째 블록은 <b>초기화 벡터(IV)</b>와 XOR 한다. 같은 평문 블록이라도 서로 다른 암호문이 생성된다.</div>",
 ans:[["CBC","Cipher Block Chaining"]],
 exp:`블록 암호 운영 모드<br>• <b>ECB</b>: 블록별 독립 암호화 (같은 평문 → 같은 암호문, 취약)<br>• <b>CBC</b>: 이전 암호문과 XOR, IV 사용<br>• <b>CFB / OFB</b>: 블록 암호를 스트림 암호처럼 사용<br>• <b>CTR</b>: 카운터 값을 암호화해 평문과 XOR, 병렬 처리 가능`},

{cat:"SQL",
 q:`다음 [학생], [수강] 테이블에 대해 아래 SQL문을 실행했을 때의 결과값을 쓰시오.
<div class="tblwrap" style="display:flex;gap:16px"><table><tr><th>학번</th><th>이름</th></tr><tr><td>1</td><td>A</td></tr><tr><td>2</td><td>B</td></tr><tr><td>3</td><td>C</td></tr><tr><td>4</td><td>D</td></tr></table>
<table><tr><th>학번</th><th>과목</th></tr><tr><td>1</td><td>DB</td></tr><tr><td>1</td><td>OS</td></tr><tr><td>3</td><td>DB</td></tr></table></div>
<div class="box"><code>SELECT COUNT(*) FROM 학생<br>WHERE 학번 NOT IN (SELECT 학번 FROM 수강);</code></div>`,
 ans:[["2"]],
 exp:`서브쿼리 결과: 수강 테이블의 학번 {1, 1, 3}<br>
학생 중 학번이 1, 3이 아닌 학생 → 2(B), 4(D) → <b>2</b><br>
같은 의미: <code>WHERE NOT EXISTS (SELECT * FROM 수강 WHERE 수강.학번 = 학생.학번)</code>`}
]};
