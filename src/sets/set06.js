const SET6_TBL = `<div class="tblwrap"><table><tr><th>사번</th><th>이름</th><th>부서</th><th>보너스</th></tr>
<tr><td>101</td><td>김가람</td><td>영업</td><td>100</td></tr>
<tr><td>102</td><td>이나래</td><td>NULL</td><td>200</td></tr>
<tr><td>103</td><td>박다솜</td><td>개발</td><td>NULL</td></tr>
<tr><td>104</td><td>최라온</td><td>영업</td><td>100</td></tr>
<tr><td>105</td><td>정마루</td><td>개발</td><td>NULL</td></tr>
<tr><td>106</td><td>한바다</td><td>NULL</td><td>300</td></tr>
<tr><td>107</td><td>윤사랑</td><td>인사</td><td>200</td></tr></table></div>`;

const EXAM = {
title: "정보처리기사 실기 예상문제 제6회 (2026년 제3회 대비)",
questions: [
{cat:"C언어", cs:true,
 q:`다음 C언어 프로그램의 실행 결과를 쓰시오. (값 사이는 한 칸씩 띄어 쓰시오.)`,
 code:`
#include <stdio.h>

int main() {
    int a[6] = {3, 8, 1, 9, 4, 7};
    int *p = a + 5;
    int *q = a;
    int s = 0;

    while (p > q) {
        s += *p - *q;
        p -= 2;
        q++;
    }
    printf("%d %d %d", s, (int)(p - q), *p);
    return 0;
}`,
 ans:[["5 -1 8"]],
 exp:`<code>p</code>는 마지막 원소(a[5])에서 출발해 2칸씩 <b>뒤로</b>, <code>q</code>는 a[0]에서 1칸씩 앞으로 이동합니다.
<pre>반복 | p      q      | *p - *q   | s
 1   | a+5(7) a+0(3) | 7 - 3 = 4 | 4
 2   | a+3(9) a+1(8) | 9 - 8 = 1 | 5
종료 | a+1    a+2    | p &gt; q 거짓</pre>
• 포인터끼리의 뺄셈 <code>p - q</code>는 바이트 수가 아니라 <b>원소 개수 차이</b> → (a+1) − (a+2) = <b>-1</b><br>
• 종료 시 p는 a+1을 가리키므로 <code>*p</code> = <b>8</b><br>
결과: <code>5 -1 8</code>`},

{cat:"Java", cs:true,
 q:`다음 Java 프로그램의 실행 결과를 쓰시오.`,
 code:`
abstract class Shape {
    int n = 1;
    Shape() {
        System.out.print("S" + n + " ");
        draw();
    }
    abstract void draw();
}
class Circle extends Shape {
    int r = 5;
    Circle(int r) {
        super();
        System.out.print("C" + this.r + " ");
        this.r = r;
    }
    void draw() { System.out.print("D" + r + " "); }
}
public class Main {
    public static void main(String[] args) {
        Shape s = new Circle(3);
        s.draw();
    }
}`,
 ans:[["S1 D0 C5 D3","S1D0C5D3"]],
 exp:`객체 생성 순서: <b>부모 필드 초기화 → 부모 생성자 본문 → 자식 필드 초기화 → 자식 생성자 본문</b><br>
① Shape의 n = 1 → Shape() 출력 <code>S1 </code><br>
② 생성자 안의 <code>draw()</code>는 동적 바인딩으로 <b>Circle.draw()</b> 실행. 이때 Circle의 필드 초기화(r = 5)는 <b>아직 실행 전</b>이므로 r은 기본값 0 → <code>D0 </code><br>
③ super() 복귀 후 Circle 필드 초기화 r = 5 → 생성자 본문에서 this.r 출력 <code>C5 </code>, 이후 this.r = 3 (매개변수 r)<br>
④ main의 s.draw() → <code>D3 </code><br>
결과: <code>S1 D0 C5 D3</code>`},

{cat:"Python", cs:true,
 q:`다음 Python 프로그램의 실행 결과를 쓰시오.`,
 code:`
m = [[i * j for j in range(1, 4)] for i in range(1, 4)]
t = [x for row in m for x in row if x % 2 == 0]
c = [sum(r[k] for r in m) for k in range(3)]
g = [[0] * 3] * 3
g[0][0] = 7
print(len(t), sum(t), c, g[2][0])`,
 ans:[["5 20 [6, 12, 18] 7","5 20 [6,12,18] 7"]],
 exp:`• m = [[1, 2, 3], [2, 4, 6], [3, 6, 9]] (바깥 for가 행 i, 안쪽 for가 열 j)<br>
• t: 중첩 컴프리헨션은 <b>왼쪽 for가 바깥 루프</b> → 행 순서대로 짝수만: [2, 2, 4, 6, 6] → len 5, sum 20<br>
• c: k열의 합 → [1+2+3, 2+4+6, 3+6+9] = [6, 12, 18]<br>
• <code>[[0]*3]*3</code>은 <b>같은 리스트 객체 하나를 3번 참조</b>하므로 g[0][0] = 7 이 모든 행에 반영 → g[2][0] = 7
<pre>g = [[7, 0, 0], [7, 0, 0], [7, 0, 0]]</pre>
결과: <code>5 20 [6, 12, 18] 7</code>`},

{cat:"SQL",
 q:`다음 [사원] 테이블에 대해 아래 SQL문을 실행했을 때 ①~④에 출력되는 값을 쓰시오.` + SET6_TBL + `
<div class="box"><code>SELECT COUNT(*) AS ①, COUNT(부서) AS ②, COUNT(DISTINCT 부서) AS ③, AVG(보너스) AS ④<br>FROM 사원;</code></div>`,
 ans:[["7"],["5"],["3"],["180","180.0"]],
 exp:`• <code>COUNT(*)</code>: NULL 여부와 관계없이 <b>모든 행</b> → 7<br>
• <code>COUNT(부서)</code>: 부서가 NULL인 102, 106 제외 → 5<br>
• <code>COUNT(DISTINCT 부서)</code>: NULL 제외 후 중복 제거 → 영업, 개발, 인사 = 3<br>
• <code>AVG(보너스)</code>: 집계 함수는 <b>NULL을 제외</b>하고 계산 → (100+200+100+300+200) / <b>5</b> = 180 (7로 나눈 128.57…이 아님)`},

{cat:"데이터베이스",
 q:`[수강] 릴레이션의 기본키는 (학번, 과목코드)이고 다음 함수적 종속이 성립한다. 괄호에 들어갈 함수적 종속의 종류를 쓰시오.
<div class="box">수강(<u>학번</u>, <u>과목코드</u>, 성적, 학생이름, 학과, 학과장)<br>
FD: (학번, 과목코드) → 성적 / 학번 → 학생이름 / 학번 → 학과 / 학과 → 학과장<br><br>
• (학번, 과목코드) → 성적 은 ( ① ) 함수적 종속이다.<br>
• (학번, 과목코드) → 학생이름 은 기본키의 일부인 학번만으로도 결정되므로 ( ② ) 함수적 종속이다.<br>
• 학번 → 학과, 학과 → 학과장 이므로 학번 → 학과장 은 ( ③ ) 함수적 종속이다.</div>`,
 ans:[["완전","완전 함수적 종속","완전함수종속","완전 함수 종속","Full","Full Functional Dependency"],["부분","부분 함수적 종속","부분함수종속","부분 함수 종속","Partial","Partial Functional Dependency"],["이행","이행적","이행 함수적 종속","이행적 함수 종속","이행함수종속","Transitive","Transitive Functional Dependency"]],
 exp:`• <b>완전 함수적 종속</b>: 기본키 <b>전체</b>에 종속되고 일부에는 종속되지 않음 → 성적은 학번과 과목코드가 모두 있어야 결정<br>
• <b>부분 함수적 종속</b>: 복합키의 <b>일부</b>에만 종속 → 학생이름은 학번만으로 결정 (2NF에서 제거 대상)<br>
• <b>이행적 함수적 종속</b>: X → Y, Y → Z 이면 X → Z (3NF에서 제거 대상)`},

{cat:"보안",
 q:`다음 설명에 해당하는 ① 공격 기법과 ② 그 유형을 쓰시오.
<div class="box">공격자가 게시판 글에 <code>&lt;script&gt;</code> 태그 등 악성 스크립트를 삽입하여 <b>서버의 데이터베이스에 저장</b>해 두면, 해당 글을 열람한 다른 사용자의 브라우저에서 스크립트가 실행되어 쿠키(세션) 탈취, 악성 사이트 리다이렉트 등이 일어난다.<br>
이 공격은 스크립트가 서버에 저장되는지에 따라 ( ② ) 방식, URL 파라미터에 담겨 즉시 응답에 반사되는 반사형(Reflected), 서버를 거치지 않고 클라이언트 측에서 처리되는 DOM 기반 방식으로 구분된다.</div>`,
 ans:[["XSS","크로스 사이트 스크립팅","크로스사이트스크립팅","Cross Site Scripting","Cross-Site Scripting"],["저장형","저장","Stored","Stored XSS","저장형 XSS","Persistent","지속형"]],
 exp:`<b>XSS(Cross Site Scripting)</b>: 웹 페이지에 악성 스크립트를 삽입해 <b>다른 사용자의 브라우저</b>에서 실행시키는 공격<br>
• 저장형(Stored): 게시판·DB에 저장 → 열람자 모두 피해<br>
• 반사형(Reflected): 악성 URL 클릭 시 응답에 스크립트가 반사<br>
• DOM 기반: 클라이언트 측 JavaScript의 DOM 조작 과정에서 발생<br>
대응: 입력값 검증, <code>&lt;</code> → <code>&amp;lt;</code> 같은 출력 인코딩(HTML 이스케이프), HttpOnly 쿠키, CSP`},

{cat:"네트워크",
 q:`다음 설명에 해당하는 ① 라우팅 프로토콜과 괄호 ②, ③에 들어갈 알맞은 말을 쓰시오.
<div class="box">• 대표적인 내부 라우팅 프로토콜(IGP)로, <b>벨만-포드(Bellman-Ford)</b> 알고리즘을 사용하는 ( ② ) 방식이다.<br>
• 경로 선택 기준(메트릭)으로 <b>홉 수(Hop Count)</b>만 사용하며, 최대 홉 수는 ( ③ )이고 그보다 큰 값은 도달 불가(무한대)로 간주한다.<br>
• 기본적으로 30초마다 전체 라우팅 테이블을 이웃 라우터에 전달하므로 소규모 네트워크에 적합하다.</div>`,
 ans:[["RIP","Routing Information Protocol","라우팅 정보 프로토콜"],["거리 벡터","거리벡터","Distance Vector","디스턴스 벡터"],["15","15홉","15개"]],
 exp:`<b>RIP</b>: 거리 벡터(Distance Vector) 라우팅, 벨만-포드 알고리즘, 최대 <b>15홉</b>(16 = 무한대), 30초 주기 갱신<br>
비교 — <b>OSPF</b>: 링크 상태(Link State), 다익스트라 알고리즘, 대규모 네트워크, 변화 시에만 갱신 / <b>BGP</b>: AS 간 외부 라우팅(EGP), 경로 벡터<br>
거리 벡터의 <b>무한 카운팅</b> 문제 대책: 스플릿 호라이즌, 포이즌 리버스, 홀드다운 타이머`},

{cat:"소프트웨어공학", seq:true,
 q:`다음 [보기]의 모듈 응집도(Cohesion)를 <b>응집도가 강한 것부터 약한 순서</b>로 기호를 나열하시오. (예: ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ)
<div class="box">[보기] ㄱ. 시간적 응집도 &nbsp; ㄴ. 기능적 응집도 &nbsp; ㄷ. 우연적 응집도 &nbsp; ㄹ. 교환적 응집도 &nbsp; ㅁ. 절차적 응집도 &nbsp; ㅂ. 논리적 응집도 &nbsp; ㅅ. 순차적 응집도</div>`,
 ans:[["ㄴ, ㅅ, ㄹ, ㅁ, ㄱ, ㅂ, ㄷ"]],
 exp:`강 → 약: <b>기능적 → 순차적 → 교환적 → 절차적 → 시간적 → 논리적 → 우연적</b> (암기: 기-순-교-절-시-논-우)<br>
• 기능적: 모듈 내부 요소가 단일 기능 수행 / 순차적: 한 활동의 출력이 다음 활동의 입력 / 교환적(통신적): 동일한 입력·출력 데이터를 사용하는 활동 모음<br>
• 절차적: 정해진 순서대로 수행되는 다른 기능 모음 / 시간적: 같은 시기에 실행(초기화 등) / 논리적: 유사한 성격의 처리를 묶음 / 우연적: 관련 없는 요소의 모음<br>
좋은 설계: <b>응집도는 높게(강하게), 결합도는 낮게(약하게)</b>`},

{cat:"C언어", cs:true,
 q:`다음 C언어 프로그램의 실행 결과를 쓰시오. (값 사이는 한 칸씩 띄어 쓰시오.)`,
 code:`
#include <stdio.h>
#include <string.h>

int main() {
    char a[20] = "KOR";
    char b[] = "EA";
    char c[10];

    strcpy(c, a);
    strcat(c, b);
    strcat(a, "-");
    strcat(a, c);
    printf("%s %d %d %d %d", a, (int)strlen(a), (int)sizeof(a), (int)sizeof(b), (int)strlen(c));
    return 0;
}`,
 ans:[["KOR-KOREA 9 20 3 5"]],
 exp:`<pre>strcpy(c, a)   → c = "KOR"
strcat(c, b)   → c = "KOREA"
strcat(a, "-") → a = "KOR-"
strcat(a, c)   → a = "KOR-KOREA"</pre>
• <code>strlen(a)</code>: 널 문자(&#92;0) 앞까지의 글자 수 → 9<br>
• <code>sizeof(a)</code>: 선언된 <b>배열 전체 크기</b> → 20 (내용과 무관)<br>
• <code>sizeof(b)</code>: <code>char b[] = "EA"</code>는 널 문자를 포함해 크기가 자동 결정 → 3<br>
• <code>strlen(c)</code> → 5<br>
결과: <code>KOR-KOREA 9 20 3 5</code>`},

{cat:"운영체제", seq:true,
 q:`다음 프로세스들이 준비 큐에 있을 때, <b>HRN(Highest Response-ratio Next)</b> 스케줄링 기법을 적용하려 한다. ① 가장 먼저 실행되는 프로세스의 우선순위 값을 쓰고, ② 현재 시점의 우선순위가 높은 순서대로 프로세스를 나열하시오.
<div class="tblwrap"><table><tr><th>프로세스</th><th>대기 시간</th><th>서비스(실행) 시간</th></tr>
<tr><td>A</td><td>8</td><td>2</td></tr>
<tr><td>B</td><td>12</td><td>6</td></tr>
<tr><td>C</td><td>15</td><td>3</td></tr>
<tr><td>D</td><td>18</td><td>8</td></tr></table></div>`,
 ans:[["6","6.0"],["C, A, D, B"]],
 exp:`HRN 우선순위 = <b>(대기 시간 + 서비스 시간) / 서비스 시간</b> — 값이 클수록 우선
<pre>A: (8 + 2) / 2   = 5
B: (12 + 6) / 6  = 3
C: (15 + 3) / 3  = 6
D: (18 + 8) / 8  = 3.25</pre>
순서: <b>C → A → D → B</b>, 가장 먼저 실행되는 C의 우선순위 = 6<br>
HRN은 SJF의 단점인 <b>기아(Starvation)</b> 현상을 보완하기 위해 대기 시간을 반영한 비선점 기법입니다. (SJF라면 서비스 시간이 가장 짧은 A가 먼저 실행)`},

{cat:"Java", cs:true,
 q:`다음 Java 프로그램의 실행 결과를 쓰시오.`,
 code:`
interface Greet {
    default String hello() { return "G"; }
    String name();
}
interface Polite extends Greet {
    default String hello() { return "P" + Greet.super.hello(); }
}
class Kim implements Polite {
    public String name() { return "K"; }
}
class Lee implements Polite {
    public String hello() { return "L" + Polite.super.hello(); }
    public String name() { return "E"; }
}
public class Main {
    public static void main(String[] args) {
        Greet[] arr = { new Kim(), new Lee() };
        String s = "";
        for (Greet g : arr) s += g.hello() + g.name();
        System.out.print(s);
    }
}`,
 ans:[["PGKLPGE"]],
 exp:`• <b>default 메서드</b>는 구현 클래스가 재정의하지 않으면 그대로 상속되고, 하위 인터페이스나 클래스에서 오버라이딩할 수 있습니다.<br>
• <code>인터페이스명.super.메서드()</code>로 상위 인터페이스의 default 메서드를 호출합니다.<br>
• Kim: hello()를 재정의하지 않음 → Polite의 hello() = "P" + "G" = "PG", name() = "K" → <code>PGK</code><br>
• Lee: 재정의한 hello() = "L" + Polite.super.hello() = "L" + "PG" = "LPG", name() = "E" → <code>LPGE</code><br>
결과: <code>PGKLPGE</code>`},

{cat:"보안",
 q:`다음 설명에 해당하는 공격 기법을 영문 약어로 쓰시오.
<div class="box">로그인한 사용자가 공격자가 만든 악성 링크나 이미지 태그가 포함된 페이지를 열면, 사용자의 브라우저가 <b>사용자의 인증 정보(세션 쿠키)를 가진 채</b> 사용자가 의도하지 않은 요청(비밀번호 변경, 송금, 게시글 작성 등)을 웹 서버로 전송하게 만드는 공격이다. 서버는 정상 사용자의 요청으로 판단해 처리한다. 대응 방법으로 요청마다 예측 불가능한 토큰을 검증하는 방법, Referer 검증, SameSite 쿠키 속성 등이 있다.</div>`,
 ans:[["CSRF","XSRF","Cross Site Request Forgery","Cross-Site Request Forgery","사이트 간 요청 위조","크로스 사이트 요청 위조"]],
 exp:`<b>CSRF(Cross-Site Request Forgery, 사이트 간 요청 위조)</b>: 사용자의 인증된 권한을 이용해 <b>서버</b>가 위조된 요청을 실행하게 함<br>
XSS와 비교 — XSS는 악성 스크립트가 <b>사용자 브라우저</b>에서 실행되는 것(클라이언트 공격), CSRF는 사용자를 통해 <b>서버에 원치 않는 요청</b>을 보내게 하는 것<br>
대응: CSRF 토큰(Anti-CSRF Token), Referer/Origin 검증, SameSite 쿠키, 중요 기능 재인증(CAPTCHA, 비밀번호 재입력)`},

{cat:"Python", cs:true,
 q:`다음 Python 프로그램의 실행 결과를 쓰시오.`,
 code:`
s = "  data,base, ,sql  "
words = [w.strip() for w in s.split(",")]
words = [w for w in words if w]
r = "-".join(w.capitalize() for w in words)
print(f"{r}|{len(words):03d}|{s.strip().count('a')}")`,
 ans:[["Data-Base-Sql|003|3"]],
 exp:`<pre>s.split(",")   → ['  data', 'base', ' ', 'sql  ']
strip() 적용    → ['data', 'base', '', 'sql']
빈 문자열 제거  → ['data', 'base', 'sql']</pre>
• <code>capitalize()</code>: 첫 글자만 대문자, 나머지는 소문자 → "Data", "Base", "Sql" → <code>"-".join</code> → "Data-Base-Sql"<br>
• <code>{len(words):03d}</code>: 3을 폭 3, 빈자리 0으로 채움 → "003"<br>
• <code>s.strip().count('a')</code>: "data,base, ,sql"의 a 개수 → 2 + 1 = 3<br>
결과: <code>Data-Base-Sql|003|3</code>`},

{cat:"SQL",
 q:`다음 [사원] 테이블에 대해 아래 SQL문을 차례로 실행했을 때, 마지막 SELECT문의 결과 ①, ②를 쓰시오.` + SET6_TBL + `
<div class="box"><code>UPDATE 사원 SET 보너스 = 보너스 + 50 WHERE 부서 = '영업' OR 보너스 IS NULL;<br>
DELETE FROM 사원 WHERE 부서 IS NULL;<br>
SELECT COUNT(*) AS ①, SUM(보너스) AS ② FROM 사원;</code></div>`,
 ans:[["5"],["500"]],
 exp:`① UPDATE 대상: 영업(101, 104)과 보너스가 NULL인 행(103, 105)<br>
• 101, 104: 100 + 50 = 150<br>
• 103, 105: <b>NULL + 50 = NULL</b> (NULL과의 산술 연산 결과는 NULL이므로 값이 바뀌지 않음)<br>
② DELETE: 부서가 NULL인 102, 106 삭제
<pre>사번 | 부서 | 보너스
101  | 영업 | 150
103  | 개발 | NULL
104  | 영업 | 150
105  | 개발 | NULL
107  | 인사 | 200</pre>
COUNT(*) = <b>5</b>, SUM(보너스) = 150 + 150 + 200 = <b>500</b> (SUM은 NULL 제외)`},

{cat:"소프트웨어공학",
 q:`다음 설명에 해당하는 디자인 패턴을 쓰시오.
<div class="box">GoF의 <b>행위(Behavioral)</b> 패턴 중 하나로, 동일한 목적을 수행하는 여러 <b>알고리즘을 각각 별도의 클래스로 캡슐화</b>하고 공통 인터페이스를 통해 상호 교체 가능하도록 만든다. 클라이언트는 실행 중(런타임)에 사용할 알고리즘을 선택할 수 있으며, 결제 방식(카드/계좌이체/포인트)이나 정렬 방식 교체 등에 사용된다. if-else 분기를 줄이고 개방-폐쇄 원칙(OCP)을 따르게 한다.</div>`,
 ans:[["Strategy","전략","Strategy Pattern","전략 패턴","스트래티지","스트래티지 패턴","Policy"]],
 exp:`<b>전략(Strategy) 패턴</b>: Context가 Strategy 인터페이스를 참조하고, 구체 전략(ConcreteStrategy)을 주입·교체하여 알고리즘을 바꿈<br>
혼동 주의 — <b>템플릿 메서드</b>: 알고리즘의 <b>골격</b>은 상위 클래스가 정하고 일부 단계만 하위 클래스가 재정의(상속 기반) / <b>상태(State)</b>: 객체의 내부 상태에 따라 행위가 바뀜<br>
GoF 행위 패턴: 책임 연쇄, 커맨드, 인터프리터, 반복자, 중재자, 메멘토, 옵서버, 상태, <b>전략</b>, 템플릿 메서드, 방문자`},

{cat:"데이터베이스",
 q:`다음은 뷰(View)에 대한 설명이다. 괄호에 들어갈 알맞은 말을 쓰시오.
<div class="box">• 뷰는 하나 이상의 기본 테이블로부터 유도되어 만들어지는 ( ① ) 테이블로, 물리적으로 데이터를 저장하지 않는다.<br>
• 한 번 정의된 뷰는 ( ② ) 문으로 정의를 변경할 수 없으므로, 삭제(DROP VIEW) 후 다시 생성해야 한다.<br>
• 뷰를 생성할 때 ( ③ ) 옵션을 지정하면, 뷰를 통한 INSERT·UPDATE 시 뷰를 정의한 WHERE 조건을 만족하지 않는 변경은 거부된다.</div>`,
 ans:[["가상","가상 테이블","Virtual"],["ALTER","ALTER VIEW","알터"],["WITH CHECK OPTION","CHECK OPTION","위드 체크 옵션"]],
 exp:`<b>뷰의 특징</b><br>
• 가상 테이블 — 정의만 데이터 사전(시스템 카탈로그)에 저장, 조회 시 기본 테이블에서 계산<br>
• <code>ALTER VIEW</code>로 정의 변경 불가 → DROP 후 CREATE (DBMS에 따라 CREATE OR REPLACE 지원)<br>
• <code>WITH CHECK OPTION</code>: 뷰 조건을 벗어나는 갱신 방지<br>
• 장점: 논리적 독립성 제공, 접근 제어(보안), 복잡한 질의 단순화 / 단점: 독자적 인덱스 불가, 삽입·삭제·갱신 제약(집계·DISTINCT·GROUP BY가 있는 뷰는 갱신 불가)<br>
• 기본 테이블이나 뷰가 삭제되면 그것을 기반으로 정의된 뷰도 사용 불가`},

{cat:"네트워크",
 q:`라우터에 다음 8개의 네트워크가 연결되어 있다. 이를 하나의 경로로 <b>요약(Route Summarization, 슈퍼네팅)</b>하려고 할 때, ① 요약된 네트워크 주소를 CIDR 표기(예: 1.2.3.0/24)로 쓰고 ② 해당 서브넷 마스크를 점-10진 표기로 쓰시오.
<div class="box">10.1.40.0/24, 10.1.41.0/24, 10.1.42.0/24, 10.1.43.0/24,<br>10.1.44.0/24, 10.1.45.0/24, 10.1.46.0/24, 10.1.47.0/24</div>`,
 ans:[["10.1.40.0/21"],["255.255.248.0"]],
 exp:`세 번째 옥텟을 2진수로 비교합니다.
<pre>40 = 0010 1000
41 = 0010 1001
 ...
47 = 0010 1111
     ^^^^ ^      ← 앞 5비트(00101)가 공통</pre>
공통 비트 = 8 + 8 + 5 = <b>21비트</b> → 요약 주소 <b>10.1.40.0/21</b><br>
/21 마스크 = 11111111.11111111.11111000.00000000 = <b>255.255.248.0</b><br>
검산: /21 블록 크기는 세 번째 옥텟 기준 2<sup>3</sup> = 8 → 40은 8의 배수이므로 40~47이 정확히 하나의 블록 (8개 네트워크 = 2<sup>3</sup>)`},

{cat:"C언어", cs:true,
 q:`다음 C언어 프로그램의 실행 결과를 쓰시오. (값 사이는 한 칸씩 띄어 쓰시오.)`,
 code:`
#include <stdio.h>

struct P {
    int x;
    int y;
};

int main() {
    struct P arr[3] = {{1, 2}, {3, 4}, {5, 6}};
    struct P *p = arr;

    (p + 1)->x += p[2].y;
    p[2].y = (p + 1)->x - p->y;
    p++;
    printf("%d %d %d", p->x, (p + 1)->y, (*p).y + p[-1].x);
    return 0;
}`,
 ans:[["9 7 5"]],
 exp:`<code>(p+1)-&gt;x</code>, <code>p[1].x</code>, <code>(*(p+1)).x</code>는 모두 arr[1].x와 같습니다. 포인터 +1은 구조체 하나 크기만큼 이동합니다.
<pre>(p+1)-&gt;x += p[2].y   → arr[1].x = 3 + 6 = 9
p[2].y = (p+1)-&gt;x - p-&gt;y → arr[2].y = 9 - 2 = 7
p++                   → p = &amp;arr[1]</pre>
• <code>p-&gt;x</code> = arr[1].x = <b>9</b><br>
• <code>(p+1)-&gt;y</code> = arr[2].y = <b>7</b><br>
• <code>(*p).y + p[-1].x</code> = arr[1].y + arr[0].x = 4 + 1 = <b>5</b><br>
결과: <code>9 7 5</code>`},

{cat:"보안",
 q:`다음은 키 교환 알고리즘에 대한 설명이다. ① 알고리즘의 이름을 쓰고, 주어진 값으로 ② A가 B에게 전송하는 공개값과 ③ 두 사람이 얻게 되는 공유 비밀키를 계산하시오.
<div class="box">1976년 발표된 최초의 공개키 방식 키 교환 알고리즘으로, 이산 대수 문제의 어려움에 기반한다. 두 사용자가 공개된 소수 p와 원시근 g를 공유하고, 각자 비밀값을 골라 <code>g<sup>비밀값</sup> mod p</code>를 상대방에게 보낸 뒤, 받은 값을 자신의 비밀값으로 거듭제곱하여 같은 비밀키를 얻는다.<br><br>
p = 23, g = 5, A의 비밀값 a = 6, B의 비밀값 b = 15</div>`,
 ans:[["디피-헬만","디피헬만","Diffie-Hellman","DiffieHellman","DH","디피 헬만 키 교환","디피-헬만 키 교환","Diffie-Hellman Key Exchange"],["8"],["2"]],
 exp:`<b>디피-헬만(Diffie-Hellman) 키 교환</b>
<pre>A의 공개값 = 5^6  mod 23 = 15625 mod 23 = 8
B의 공개값 = 5^15 mod 23 = 19
A가 계산: 19^6 mod 23 = 2
B가 계산: 8^15 mod 23 = 2   → 공유 비밀키 2</pre>
• 비밀키 자체는 네트워크로 전송되지 않으며, 공개값(8, 19)만으로 비밀값을 알아내는 것은 이산 대수 문제로 어렵습니다.<br>
• 약점: 상대방 인증 기능이 없어 <b>중간자 공격(MITM)</b>에 취약 → 전자서명·인증서와 함께 사용`},

{cat:"소프트웨어공학", seq:true, set:true,
 q:`다음 [보기]의 UML 다이어그램을 ① <b>구조(정적) 다이어그램</b>과 ② <b>행위(동적) 다이어그램</b>으로 분류하여 각각 기호를 쓰시오. (기호의 순서는 무관합니다.)
<div class="box">[보기] ㄱ. 클래스 &nbsp; ㄴ. 시퀀스 &nbsp; ㄷ. 컴포넌트 &nbsp; ㄹ. 유스케이스 &nbsp; ㅁ. 배치 &nbsp; ㅂ. 상태 &nbsp; ㅅ. 패키지 &nbsp; ㅇ. 활동</div>`,
 ans:[["ㄱ, ㄷ, ㅁ, ㅅ"],["ㄴ, ㄹ, ㅂ, ㅇ"]],
 exp:`• <b>구조(Structural) 다이어그램</b>: 클래스, 객체, <b>컴포넌트</b>, <b>배치</b>, 복합체 구조, <b>패키지</b> → ㄱ, ㄷ, ㅁ, ㅅ<br>
• <b>행위(Behavioral) 다이어그램</b>: <b>유스케이스</b>, <b>시퀀스</b>, 커뮤니케이션, <b>상태</b>, <b>활동</b>, 상호작용 개요, 타이밍 → ㄴ, ㄹ, ㅂ, ㅇ<br>
함정: 유스케이스 다이어그램은 시스템의 '기능'을 표현하므로 <b>행위</b> 다이어그램에 속합니다.`}
]};
