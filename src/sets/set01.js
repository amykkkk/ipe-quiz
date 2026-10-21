const STU_TABLE = `<div class="tblwrap"><table><tr><th>학번</th><th>이름</th><th>학과</th><th>점수</th></tr>
<tr><td>1001</td><td>김철수</td><td>컴퓨터</td><td>85</td></tr>
<tr><td>1002</td><td>이영희</td><td>전자</td><td>90</td></tr>
<tr><td>1003</td><td>박민수</td><td>컴퓨터</td><td>75</td></tr>
<tr><td>1004</td><td>최지은</td><td>전자</td><td>60</td></tr>
<tr><td>1005</td><td>정다은</td><td>기계</td><td>95</td></tr>
<tr><td>1006</td><td>한수진</td><td>컴퓨터</td><td>90</td></tr></table></div>`;

const EXAM = {
title: "정보처리기사 실기 예상문제 제1회 (2026년 제3회 대비)",
questions: [
{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오.",
 code:`
#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr;
    int sum = 0;

    for (int i = 0; i < 5; i += 2) {
        sum += *(p + i);
    }
    printf("%d", sum + *(p + 1) * 2);
    return 0;
}`,
 ans:[["130"]],
 exp:`<code>p</code>는 배열의 시작 주소이므로 <code>*(p+i)</code> = <code>arr[i]</code>입니다.<br>
i = 0, 2, 4 → sum = 10 + 30 + 50 = <b>90</b><br>
<code>*(p+1) * 2</code> = 20 × 2 = 40 → 90 + 40 = <b>130</b>`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
class A {
    int x = 10;
    void show() { System.out.print("A" + x + " "); }
    static void sm() { System.out.print("SA "); }
}
class B extends A {
    int x = 20;
    void show() { System.out.print("B" + x + " "); }
    static void sm() { System.out.print("SB "); }
}
public class Main {
    public static void main(String[] args) {
        A obj = new B();
        obj.show();
        obj.sm();
        System.out.print(obj.x);
    }
}`,
 ans:[["B20 SA 10","B20SA10"]],
 exp:`• <b>인스턴스 메서드</b>는 실제 객체 타입(B) 기준으로 동적 바인딩 → <code>B.show()</code> 실행, 메서드 안의 x는 B의 필드 20 → "B20 "<br>
• <b>static 메서드</b>는 오버라이딩되지 않고 <b>참조 변수의 선언 타입(A)</b> 기준으로 호출(하이딩) → "SA "<br>
• <b>필드</b>도 다형성이 적용되지 않으며 선언 타입(A) 기준 → obj.x = 10<br>
결과: <code>B20 SA 10</code>`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
b = a[::3]
c = a[-2:-6:-2]
print(sum(b) + sum(c))`,
 ans:[["26"]],
 exp:`• <code>a[::3]</code> → 인덱스 0, 3, 6 → [1, 4, 7], 합 12<br>
• <code>a[-2:-6:-2]</code> → 인덱스 -2(값 8)부터 -6 직전까지 -2씩 → -2, -4 → [8, 6], 합 14<br>
12 + 14 = <b>26</b>`},

{cat:"SQL",
 q:`다음 [학생] 테이블에서 학과별 평균 점수가 80점 이상인 학과의 학과명과 평균 점수를 조회하려고 한다. 괄호 ①, ②에 들어갈 알맞은 키워드를 쓰시오.${STU_TABLE}
<div class="box"><code>SELECT 학과, AVG(점수) FROM 학생 ( ① ) 학과 ( ② ) AVG(점수) &gt;= 80;</code></div>`,
 ans:[["GROUP BY"],["HAVING"]],
 exp:`그룹별 집계는 <code>GROUP BY</code>, 그룹에 대한 조건은 <code>WHERE</code>가 아닌 <code>HAVING</code>절에 작성합니다.<br>
WHERE는 그룹화 <b>이전</b> 개별 행을 거르고, HAVING은 그룹화 <b>이후</b> 집계 결과를 거릅니다. (결과: 컴퓨터 83.33, 기계 95 — 전자는 75로 제외)`},

{cat:"데이터베이스",
 q:`다음은 정규화 과정에 대한 설명이다. 괄호에 들어갈 알맞은 정규형을 쓰시오.
<div class="box">• 1NF에서 <b>부분 함수 종속</b>을 제거하면 ( ① )이 된다.<br>
• ( ① )에서 <b>이행적 함수 종속</b>을 제거하면 ( ② )이 된다.<br>
• ( ② )에서 <b>결정자이면서 후보키가 아닌 것</b>을 제거하면 ( ③ )이 된다.</div>`,
 ans:[["제2정규형","2NF","2정규형","제2정규화"],["제3정규형","3NF","3정규형","제3정규화"],["BCNF","보이스-코드정규형","보이스코드정규형","Boyce-Codd정규형"]],
 exp:`정규화 단계 암기법: <b>도·부·이·결·다·조</b><br>
도메인 원자값(1NF) → <b>부</b>분 함수 종속 제거(2NF) → <b>이</b>행 함수 종속 제거(3NF) → <b>결</b>정자이면서 후보키 아닌 것 제거(BCNF) → <b>다</b>치 종속 제거(4NF) → <b>조</b>인 종속 이용(5NF)`},

{cat:"보안",
 q:"다음 설명에 해당하는 공격 기법을 쓰시오.<div class=\"box\">소프트웨어나 시스템의 보안 취약점이 발견되어 공표되었으나, 이에 대한 <b>보안 패치가 배포되기 전</b>에 해당 취약점을 이용하여 이루어지는 공격으로, 대응책이 없는 상태에서 공격이 이루어지므로 피해가 크다.</div>",
 ans:[["제로데이 공격","제로데이","Zero-Day Attack","Zero Day Attack","Zero-Day","제로 데이 공격","제로데이어택"]],
 exp:`<b>제로데이 공격(Zero-Day Attack)</b>: 취약점 공개 후 패치가 나오기까지의 '0일'에 이뤄지는 공격.<br>
비교 개념 — APT(지능형 지속 위협): 특정 대상을 장기간 지속적으로 공격 / 랜섬웨어: 파일을 암호화하고 금전을 요구.`},

{cat:"보안",
 q:"다음 설명에 해당하는 암호 알고리즘을 쓰시오.<div class=\"box\">1999년 <b>한국인터넷진흥원(KISA)</b>에서 개발한 <b>블록 암호화 알고리즘</b>으로, 블록 크기는 128비트이며 키 길이에 따라 128, 256비트로 분류된다. 국내 전자상거래, 금융 분야에서 널리 사용된다.</div>",
 ans:[["SEED","시드"]],
 exp:`<b>SEED</b>: KISA 개발, 128bit 블록 암호.<br>
비교 — <b>ARIA</b>: 2004년 국정원+산학연 개발, 128bit 블록, 키 128/192/256 / <b>AES</b>: 미국 NIST, DES 대체 / <b>DES</b>: 64bit 블록, 56bit 키 / <b>IDEA</b>: 스위스 개발, 64bit 블록, 128bit 키`},

{cat:"네트워크",
 q:"IP 주소가 <code>192.168.10.100/26</code>인 호스트가 속한 네트워크의 ① 네트워크 주소와 ② 브로드캐스트 주소를 쓰시오.",
 ans:[["192.168.10.64"],["192.168.10.127"]],
 exp:`/26 → 서브넷 마스크 255.255.255.<b>192</b>, 블록 크기 = 256 − 192 = <b>64</b><br>
서브넷 구간: 0~63, <b>64~127</b>, 128~191, 192~255 → 100은 64~127 구간<br>
네트워크 주소 192.168.10.64, 브로드캐스트 주소 192.168.10.127 (사용 가능 호스트 65~126, 62개)`},

{cat:"소프트웨어공학",
 q:"다음 설명에 해당하는 디자인 패턴을 쓰시오.<div class=\"box\">생성(Creational) 패턴의 하나로, 클래스의 인스턴스가 <b>오직 하나만 생성</b>되도록 보장하고, 생성된 인스턴스에 대한 <b>전역적인 접근점</b>을 제공한다. 로그 기록 객체, 설정 관리 객체 등에 주로 사용된다.</div>",
 ans:[["Singleton","싱글톤","싱글턴","Singleton Pattern","싱글톤패턴","싱글턴패턴"]],
 exp:`<b>싱글톤(Singleton)</b>: 생성자를 private으로 막고 static 메서드(getInstance)로 하나의 인스턴스만 반환.<br>
GoF 생성 패턴 5가지: 추상 팩토리, 빌더, 팩토리 메서드, 프로토타입, <b>싱글톤</b>`},

{cat:"소프트웨어공학",
 q:"다음 설명에 해당하는 블랙박스 테스트 기법을 쓰시오.<div class=\"box\">입력 조건의 <b>중간값보다 경계값에서 오류가 발생할 확률이 높다</b>는 점을 이용하여, 입력 조건의 경계값을 테스트 케이스로 선정하여 검사하는 기법이다. 예를 들어 입력 범위가 1~100이라면 0, 1, 100, 101 등을 테스트한다.</div>",
 ans:[["경계값 분석","경계값분석","Boundary Value Analysis","경계값 분석 테스트","경계 값 분석","BVA","경곗값 분석"]],
 exp:`<b>경계값 분석(Boundary Value Analysis)</b><br>
블랙박스 테스트 종류: 동치 분할(동등 분할), <b>경계값 분석</b>, 원인-효과 그래프, 오류 예측, 비교 검사<br>
화이트박스 테스트: 기초 경로 검사, 제어 구조 검사(조건·루프·데이터 흐름 검사)`},

{cat:"운영체제",
 q:"페이지 참조 순서가 다음과 같고 할당된 페이지 프레임이 3개일 때, <b>LRU</b> 페이지 교체 알고리즘을 사용할 경우 발생하는 <b>페이지 부재(Page Fault) 횟수</b>를 쓰시오. (초기 프레임은 비어 있다.)<div class=\"box\">1, 2, 3, 1, 4, 2, 5, 1, 2, 3</div>",
 ans:[["8","8회","8번"]],
 exp:`LRU: 가장 오랫동안 사용되지 않은 페이지를 교체
<pre>참조   : 1  2  3  1  4  2  5  1  2  3
프레임1: 1  1  1  1  1  1  5  5  5  3
프레임2:    2  2  2  4  4  4  1  1  1
프레임3:       3  3  3  2  2  2  2  2
부재   : F  F  F     F  F  F  F     F</pre>
(4 참조 시 최근 사용 순 1,3,2 → 2 교체 / 2 참조 시 3 교체 / 5 참조 시 1 교체 / 1 참조 시 4 교체 / 3 참조 시 5 교체)<br>부재 횟수 = <b>8회</b>`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오.",
 code:`
#include <stdio.h>

int f(int n) {
    if (n <= 1) return 1;
    return n + f(n - 2);
}

int main() {
    printf("%d", f(7) + f(6));
    return 0;
}`,
 ans:[["29"]],
 exp:`f(7) = 7 + f(5) = 7 + 5 + f(3) = 7 + 5 + 3 + f(1) = 7 + 5 + 3 + 1 = <b>16</b><br>
f(6) = 6 + f(4) = 6 + 4 + f(2) = 6 + 4 + 2 + f(0) = 6 + 4 + 2 + 1 = <b>13</b><br>
16 + 13 = <b>29</b> (f(0)도 n ≤ 1 이므로 1을 반환하는 점 주의)`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
public class Main {
    static int cnt = 0;

    static int calc(int[] a) {
        int s = 0;
        for (int v : a) {
            if (v % 3 == 0) {
                cnt++;
                continue;
            }
            s += v;
        }
        return s;
    }

    public static void main(String[] args) {
        int[] arr = {3, 5, 6, 8, 9, 10};
        int r = calc(arr);
        System.out.println(r + cnt);
    }
}`,
 ans:[["26"]],
 exp:`3의 배수(3, 6, 9)는 cnt만 증가시키고 continue로 합산을 건너뜁니다 → cnt = 3<br>
나머지 5 + 8 + 10 = 23 → r = 23<br>
<code>r + cnt</code>는 int + int 이므로 산술 덧셈 → <b>26</b>`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오. (출력값 사이는 한 칸씩 띄어 쓰시오.)",
 code:`
#include <stdio.h>

int main() {
    int a[] = {5, 3, 8, 1, 9, 2};
    int n = 6, i, j, t;

    for (i = 0; i < 2; i++) {
        for (j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                t = a[j];
                a[j] = a[j + 1];
                a[j + 1] = t;
            }
        }
    }
    for (i = 0; i < n; i++)
        printf("%d ", a[i]);
    return 0;
}`,
 ans:[["3 1 5 2 8 9"]],
 exp:`버블 정렬이지만 바깥 루프가 <b>2회전만</b> 수행되는 함정 문제입니다.
<pre>초기   : 5 3 8 1 9 2
1회전  : 3 5 1 8 2 9   (최댓값 9 확정)
2회전  : 3 1 5 2 8 9   (8 확정)</pre>결과: <code>3 1 5 2 8 9</code>`},

{cat:"데이터베이스",
 q:"다음은 관계대수 연산자 기호이다. 각 기호에 해당하는 연산의 이름을 쓰시오.<div class=\"box\">① σ &nbsp;&nbsp; ② π &nbsp;&nbsp; ③ ⋈ &nbsp;&nbsp; ④ ÷</div>",
 ans:[["셀렉트","Select","SELECT","셀렉션","Selection"],["프로젝트","Project","PROJECT","프로젝션","Projection"],["조인","Join","JOIN"],["디비전","Division","DIVISION","나누기"]],
 exp:`순수 관계 연산자<br>• <b>σ Select</b>: 조건을 만족하는 튜플(행) 추출 — 수평 연산<br>• <b>π Project</b>: 지정한 속성(열) 추출 — 수직 연산<br>• <b>⋈ Join</b>: 공통 속성으로 두 릴레이션 결합<br>• <b>÷ Division</b>: S의 모든 튜플과 관련 있는 R의 튜플 추출<br>
일반 집합 연산자: 합집합(∪), 교집합(∩), 차집합(−), 카티션 프로덕트(×)`},

{cat:"네트워크",
 q:"다음 설명에 해당하는 라우팅 프로토콜을 영문 약어로 쓰시오.<div class=\"box\">• 대규모 네트워크에 적합한 <b>링크 상태(Link State)</b> 라우팅 프로토콜이다.<br>• <b>다익스트라(Dijkstra)</b> 알고리즘으로 최단 경로를 계산한다.<br>• 네트워크 변화 시 신속하게 반영되며, 영역(Area) 개념을 사용하는 내부 라우팅 프로토콜(IGP)이다.</div>",
 ans:[["OSPF","Open Shortest Path First"]],
 exp:`<b>OSPF(Open Shortest Path First)</b>: 링크 상태, 다익스트라 알고리즘<br>
비교 — <b>RIP</b>: 거리 벡터, 벨만-포드 알고리즘, 최대 홉 15 / <b>BGP</b>: 자율 시스템(AS) 간 외부 라우팅(EGP), 경로 벡터`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
s = "information"
d = {}
for ch in s:
    d[ch] = d.get(ch, 0) + 1
print(max(d.values()), len(d))`,
 ans:[["2 8"]],
 exp:`"information"의 문자별 빈도: i 2, n 2, f 1, o 2, r 1, m 1, a 1, t 1<br>
최대 빈도 <code>max(d.values())</code> = 2, 서로 다른 문자 수 <code>len(d)</code> = 8<br>
print는 인자를 공백으로 구분 → <code>2 8</code>`},

{cat:"소프트웨어공학",
 q:"다음은 UML의 관계에 대한 설명이다. 해당하는 관계의 명칭을 쓰시오.<div class=\"box\">전체와 부분의 관계를 나타내는 관계 중, 부분 객체가 전체 객체에 <b>강하게 종속</b>되어 <b>전체 객체가 소멸되면 부분 객체도 함께 소멸</b>되는(생명주기를 함께하는) 관계로, 전체 쪽에 <b>채워진 마름모(◆)</b>로 표기한다.</div>",
 ans:[["합성","합성 관계","Composition","컴포지션","포함관계","포함 관계","복합"]],
 exp:`<b>합성(Composition) 관계</b> — ◆ 채워진 마름모, 생명주기 동일 (예: 집 ◆— 방)<br>
<b>집합(Aggregation) 관계</b> — ◇ 빈 마름모, 부분이 독립적으로 존재 가능 (예: 컴퓨터 ◇— 모니터)<br>
그 밖의 관계: 연관, 일반화(상속), 의존, 실체화`},

{cat:"보안",
 q:"다음은 정보 시스템 접근 시 수행되는 <b>AAA</b>에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.<div class=\"box\">• ( ① ): 시스템에 접근하는 사용자의 신원을 검증하는 것<br>• ( ② ): 검증된 사용자에게 어떤 수준의 권한과 서비스를 허용할지 결정하는 것<br>• ( ③ ): 사용자가 사용한 자원의 시간, 정보 등을 기록·수집하여 과금·감사에 활용하는 것</div>",
 ans:[["인증","Authentication"],["인가","권한부여","권한 부여","Authorization"],["계정관리","계정 관리","Accounting","어카운팅","과금"]],
 exp:`<b>AAA</b> = Authentication(인증) · Authorization(인가/권한 부여) · Accounting(계정 관리)<br>
대표 프로토콜: RADIUS, TACACS+`},

{cat:"SQL",
 q:`다음 [학생] 테이블에 대해 아래 SQL문을 실행했을 때의 결과값을 쓰시오.${STU_TABLE}
<div class="box"><code>SELECT COUNT(*) FROM 학생<br>WHERE 점수 &gt; (SELECT AVG(점수) FROM 학생 WHERE 학과 = '컴퓨터');</code></div>`,
 ans:[["4"]],
 exp:`서브쿼리: 컴퓨터학과 평균 = (85 + 75 + 90) / 3 = 83.33…<br>
83.33보다 큰 점수: 85(김철수), 90(이영희), 95(정다은), 90(한수진) → <b>4</b>`}
]};
