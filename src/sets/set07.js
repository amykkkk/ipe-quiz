const SET7_TBL = `<div class="tblwrap"><table><tr><th>사번</th><th>이름</th><th>부서</th><th>급여</th></tr>
<tr><td>101</td><td>김민준</td><td>영업</td><td>300</td></tr>
<tr><td>102</td><td>이서연</td><td>개발</td><td>520</td></tr>
<tr><td>103</td><td>박도윤</td><td>영업</td><td>450</td></tr>
<tr><td>104</td><td>최하은</td><td>인사</td><td>280</td></tr>
<tr><td>105</td><td>정시우</td><td>개발</td><td>500</td></tr>
<tr><td>106</td><td>강지아</td><td>영업</td><td>610</td></tr></table></div>`;

const EXAM = {
title: "정보처리기사 실기 예상문제 제7회 (2026년 제3회 대비)",
questions: [
{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오.",
 code:`
#include <stdio.h>

void f(int n) {
    if (n == 0) return;
    printf("%d", n % 2);
    f(n / 2);
}

void g(int n) {
    if (n == 0) return;
    g(n / 2);
    printf("%d", n % 2);
}

int main() {
    f(26);
    printf("-");
    g(26);
    return 0;
}`,
 ans:[["01011-11010"]],
 exp:`두 함수 모두 n을 2로 나눈 나머지(이진수 자릿값)를 출력하지만 <b>출력 시점</b>이 다릅니다.<br>
• <code>f</code>: 출력 후 재귀 호출 → 나머지가 <b>나온 순서대로</b>(하위 비트부터) 출력<br>
• <code>g</code>: 재귀 호출 후 출력 → 호출이 되돌아오면서 <b>역순</b>(상위 비트부터) 출력 = 올바른 이진수
<pre>n  : 26  13   6   3   1   0(종료)
n%2:  0   1   0   1   1
f 출력(내려가며): 0 1 0 1 1  → 01011
g 출력(올라오며): 1 1 0 1 0  → 11010</pre>
26 = 16 + 8 + 2 = 11010₂ 이므로 결과는 <code>01011-11010</code>`},

{cat:"SQL",
 q:`다음 [사원] 테이블에 대해 아래 SQL문을 실행했을 때 ① 중간, ② 영업합 컬럼의 결과값을 쓰시오.${SET7_TBL}
<div class="box"><code>SELECT SUM(CASE WHEN 급여 BETWEEN 300 AND 500 THEN 1 ELSE 0 END) AS 중간,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SUM(CASE WHEN 부서 = '영업' THEN 급여 ELSE 0 END) AS 영업합<br>
FROM 사원;</code></div>`,
 ans:[["3"],["1360"]],
 exp:`<code>BETWEEN A AND B</code>는 <b>A 이상 B 이하</b>(양 끝 포함)입니다.<br>
① 급여 300~500: 300(김민준), 450(박도윤), 500(정시우) → CASE가 1을 반환하는 행 3개 → <b>3</b> (280, 520, 610은 0)<br>
② 부서가 '영업'인 행만 급여, 나머지는 0 → 300 + 450 + 610 = <b>1360</b><br>
CASE WHEN은 위에서부터 처음 참이 되는 조건의 THEN 값을 반환하고, 모두 거짓이면 ELSE 값(ELSE 생략 시 NULL)을 반환합니다.`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        for (int i = 1; i <= 5; i++) list.add(i * 10);
        list.remove(1);
        list.remove(Integer.valueOf(40));
        list.add(1, 99);

        Map<String, Integer> map = new HashMap<>();
        map.put("A", list.get(0));
        map.put("B", list.size());
        map.put("A", map.get("A") + list.get(1));
        map.put("C", map.getOrDefault("D", 7));

        int sum = 0;
        for (int v : map.values()) sum += v;
        System.out.print(list + " " + map.size() + " " + sum);
    }
}`,
 ans:[["[10, 99, 30, 50] 3 120"]],
 exp:`<pre>add 10~50          → [10, 20, 30, 40, 50]
remove(1)          → 인덱스 1 삭제 → [10, 30, 40, 50]
remove(Integer 40) → 값 40 삭제   → [10, 30, 50]
add(1, 99)         → 인덱스 1에 삽입 → [10, 99, 30, 50]</pre>
• <code>remove(int)</code>는 <b>인덱스</b>, <code>remove(Object)</code>는 <b>값</b>으로 삭제합니다.<br>
• map: A=10 → B=4(size) → A를 10+99=<b>109</b>로 덮어씀(키 중복 시 값 교체) → C = getOrDefault("D", 7) = 7 (D는 추가되지 않음)<br>
• map.size() = 3 (A, B, C), sum = 109 + 4 + 7 = 120<br>
List의 toString은 <code>[10, 99, 30, 50]</code> 형식 → 결과 <code>[10, 99, 30, 50] 3 120</code>`},

{cat:"보안",
 q:`다음 설명에 해당하는 악성 프로그램을 쓰시오.<div class="box">시스템에 침입한 공격자가 <b>관리자(root) 권한을 획득·유지</b>하고, 자신의 침입 흔적과 악성 프로세스·파일·네트워크 연결을 <b>운영체제나 백신으로부터 숨기기</b> 위해 설치하는 프로그램들의 모음이다. 커널 수준에서 동작하는 경우 탐지가 매우 어렵다.</div>`,
 ans:[["루트킷","Rootkit","루트 킷","Root kit","Root-kit"]],
 exp:`<b>루트킷(Rootkit)</b>: root 권한 + kit(도구 모음). 자신과 다른 악성코드의 존재를 은폐하는 것이 핵심입니다.<br>
비교 — <b>키로거(Key Logger)</b>: 키보드 입력을 가로채 ID·비밀번호 등을 탈취 / <b>랜섬웨어</b>: 파일을 암호화하고 복호화 대가로 금전 요구 / <b>백도어</b>: 정상 인증 절차를 우회하는 비밀 통로 / <b>트로이 목마</b>: 정상 프로그램으로 위장, 자기 복제 없음`},

{cat:"네트워크",
 q:`<code>192.168.1.0/24</code> 네트워크를 VLSM 방식으로 분할하여 아래 부서에 할당하려 한다. 필요한 호스트 수가 <b>많은 부서부터</b> 낮은 주소 순으로 낭비 없이 할당할 때, ① C 부서의 네트워크 주소, ② C 부서의 서브넷 마스크, ③ D 부서의 브로드캐스트 주소를 쓰시오.
<div class="box">A 부서: 100대 &nbsp; B 부서: 50대 &nbsp; C 부서: 25대 &nbsp; D 부서: 10대</div>`,
 ans:[["192.168.1.192"],["255.255.255.224","/27"],["192.168.1.239"]],
 exp:`필요 주소 = 호스트 수 + 2(네트워크·브로드캐스트) 이상인 2의 거듭제곱 블록을 선택합니다.
<pre>부서  필요   블록  프리픽스  할당 범위
A     102    128   /25      192.168.1.0   ~ 127
B      52     64   /26      192.168.1.128 ~ 191
C      27     32   /27      192.168.1.192 ~ 223
D      12     16   /28      192.168.1.224 ~ 239</pre>
① C 네트워크 주소 192.168.1.192 ② /27 → 255.255.255.224 ③ D 브로드캐스트 192.168.1.239<br>
함정: C 부서 25대를 /28(16개)로 잡거나, D 부서 10대를 호스트 비트 계산 없이 /29(8개)로 잡으면 안 됩니다.`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
d = {k: k * k for k in range(1, 6) if k % 2}
d.setdefault(3, 100)
d.setdefault(7, 49)
d.update({1: 10, 2: 4})
r = d.get(4, 0) + d.get(5)
s = sum(v for k, v in d.items() if k > 2)
print(len(d), r, s, list(d)[-1])`,
 ans:[["5 25 83 2"]],
 exp:`<pre>컴프리헨션(k가 홀수) → {1: 1, 3: 9, 5: 25}
setdefault(3, 100)   → 키 3 존재 → 변경 없음
setdefault(7, 49)    → 키 7 없음 → {1:1, 3:9, 5:25, 7:49}
update({1:10, 2:4})  → 1은 덮어쓰기, 2는 끝에 추가
                     → {1:10, 3:9, 5:25, 7:49, 2:4}</pre>
• len(d) = 5<br>
• r = d.get(4, 0) + d.get(5) = 0 + 25 = 25<br>
• s = 키가 2보다 큰 값의 합 = 9 + 25 + 49 = 83<br>
• 딕셔너리는 <b>삽입 순서</b>를 유지하므로 마지막 키는 2 → 결과 <code>5 25 83 2</code>`},

{cat:"데이터베이스",
 q:`다음 [주문] 릴레이션은 기본키가 <b>주문번호</b>이고 아래의 함수적 종속성을 가진다. 모든 속성은 원자값이다. ① 이 릴레이션이 만족하는 <b>가장 높은 정규형</b>과 ② 다음 단계 정규형이 되기 위해 제거해야 하는 종속의 명칭을 쓰시오.
<div class="box">주문(<u>주문번호</u>, 고객ID, 고객등급, 할인율)<br>
• 주문번호 → 고객ID<br>• 고객ID → 고객등급<br>• 고객등급 → 할인율</div>`,
 ans:[["제2정규형","2NF","2정규형","제2 정규형"],["이행적 함수 종속","이행 함수 종속","이행적 종속","이행 종속","이행함수종속","이행적함수종속","Transitive Dependency","이행적 함수 종속성"]],
 exp:`• 모든 속성이 원자값 → 1NF 만족<br>
• 기본키가 <b>단일 속성</b>(주문번호)이므로 부분 함수 종속이 존재할 수 없음 → <b>2NF</b> 만족<br>
• 주문번호 → 고객ID → 고객등급 → 할인율로 <b>이행적 함수 종속</b>이 존재 → 3NF 불만족<br>
따라서 현재 최고 정규형은 <b>제2정규형</b>이며, 이행적 종속을 제거하여 주문(주문번호, 고객ID) / 고객(고객ID, 고객등급) / 등급(고객등급, 할인율)로 분해하면 3NF가 됩니다.`},

{cat:"소프트웨어공학",
 q:`다음 제어 흐름 그래프의 <b>McCabe 순환 복잡도(Cyclomatic Complexity)</b>를 계산하시오. (노드 1은 시작, 노드 7은 종료 노드이다.)
<div class="box">간선: 1→2, 2→3, 2→4, 3→5, 4→5, 4→7, 5→6, 6→2, 6→7</div>`,
 ans:[["4"]],
 exp:`공식: <b>V(G) = E − N + 2</b> (E: 간선 수, N: 노드 수)<br>
E = 9, N = 7(노드 1~7) → V(G) = 9 − 7 + 2 = <b>4</b><br>
검산: 분기 노드(나가는 간선 2개) = 2, 4, 6 → 3 + 1 = 4 / 영역 수(닫힌 영역 3 + 외부 1) = 4<br>
순환 복잡도는 기초 경로 검사에서 필요한 <b>독립 경로(테스트 케이스)의 최소 개수</b>입니다.`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오.",
 code:`
#include <stdio.h>

int main() {
    int a = 5, b = 3, c = 2, r;

    a += b *= c + 1;
    r = a % b > 3 ? a / b : a % b;
    c = r == 1 ? a > 10 ? 100 : 200 : 300;
    a -= c / 30 * 3;
    b %= r + 4;

    printf("%d %d %d %d", a, b, c, r);
    return 0;
}`,
 ans:[["5 4 100 1"]],
 exp:`복합 대입 연산자는 우선순위가 가장 낮고 <b>오른쪽에서 왼쪽</b>으로 결합합니다.
<pre>a += b *= c + 1  → b *= 3 → b = 9 → a += 9 → a = 14
r: a % b = 5 &gt; 3 참 → a / b = 14 / 9 = 1   → r = 1
c: r == 1 참 → (a &gt; 10 ? 100 : 200) → 100   → c = 100
a -= c / 30 * 3  → 100/30 = 3, 3*3 = 9 → a = 14 - 9 = 5
b %= r + 4       → b = 9 % 5 = 4</pre>
• 정수 나눗셈 <code>c / 30 * 3</code>은 왼쪽부터 계산(3 × 3 = 9), 100 / 90이 아님<br>
• 중첩 삼항 연산자는 오른쪽 결합: <code>r==1 ? (a&gt;10 ? 100 : 200) : 300</code><br>
결과: <code>5 4 100 1</code>`},

{cat:"운영체제",
 q:`메모리의 빈 분할 영역이 아래와 같을 때, <b>17K</b> 크기의 프로세스를 적재하려 한다. 각 배치 전략에 따라 선택되는 영역 번호와 ④ 최악 적합 시 해당 영역에 남는 <b>단편화 크기(K)</b>를 쓰시오.
<div class="tblwrap"><table><tr><th>영역 번호</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
<tr><td>크기</td><td>12K</td><td>30K</td><td>18K</td><td>50K</td><td>20K</td></tr></table></div>`,
 blanks:["① 최초 적합","② 최적 적합","③ 최악 적합","④ 최악 적합 단편화"],
 ans:[["2","2번","영역 2"],["3","3번","영역 3"],["4","4번","영역 4"],["33","33K","33KB"]],
 exp:`• <b>최초 적합(First Fit)</b>: 앞에서부터 처음 들어갈 수 있는 영역 → 1번(12K)은 부족, <b>2번(30K)</b><br>
• <b>최적 적합(Best Fit)</b>: 들어갈 수 있는 영역 중 남는 공간이 가장 작은 영역 → 30, 18, 50, 20 중 <b>3번(18K)</b>, 단편화 1K<br>
• <b>최악 적합(Worst Fit)</b>: 남는 공간이 가장 큰 영역 → <b>4번(50K)</b>, 단편화 50 − 17 = <b>33K</b><br>
함정: 12K 영역(1번)은 17K보다 작아 어떤 전략에서도 선택 대상이 아닙니다.`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
class Parent {
    static { System.out.print("A"); }
    { System.out.print("B"); }
    Parent() { System.out.print("C"); }
}

class Child extends Parent {
    static { System.out.print("D"); }
    { System.out.print("E"); }
    Child() { System.out.print("F"); }
}

public class Main {
    static { System.out.print("M"); }

    public static void main(String[] args) {
        new Child();
        System.out.print(" ");
        new Child();
    }
}`,
 ans:[["MADBCEF BCEF"]],
 exp:`• <b>static 블록</b>: 클래스가 처음 로딩될 때 <b>단 한 번</b> 실행. main 실행 전에 Main 클래스가 로딩되므로 "M"이 가장 먼저 출력<br>
• 첫 <code>new Child()</code>: 부모 클래스 → 자식 클래스 순으로 static 초기화(A, D) 후, 객체 생성 시 <b>부모의 인스턴스 블록 → 부모 생성자 → 자식의 인스턴스 블록 → 자식 생성자</b>(B, C, E, F)
<pre>M        Main 로딩
A D      Parent, Child 로딩 (static, 1회)
B C      Parent 인스턴스 블록, 생성자
E F      Child 인스턴스 블록, 생성자
" "
B C E F  두 번째 객체 (static 블록은 재실행 안 됨)</pre>
결과: <code>MADBCEF BCEF</code>`},

{cat:"보안",
 q:`다음은 공개키 기반 구조(PKI)에서의 <b>전자서명</b>에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.<div class="box">• 송신자는 문서의 해시값을 <b>송신자 자신의</b> ( ① )로 암호화하여 전자서명을 생성한다.<br>• 수신자는 <b>송신자의</b> ( ② )로 전자서명을 복호화하여 해시값을 비교·검증한다.<br>• 공개키와 그 소유자를 연결하는 인증서를 발급·관리하는 신뢰할 수 있는 제3의 기관을 ( ③ )이라 한다.</div>`,
 ans:[["개인키","사설키","비밀키","Private Key","개인 키"],["공개키","Public Key","공개 키"],["인증기관","CA","인증 기관","Certificate Authority","Certification Authority","인증기관(CA)"]],
 exp:`<b>전자서명</b>: 개인키로 서명, 공개키로 검증 → 부인 방지·무결성·인증 제공<br>
<b>기밀성 암호화</b>는 반대: 수신자의 공개키로 암호화, 수신자의 개인키로 복호화<br>
PKI 구성: <b>CA</b>(인증기관, 인증서 발급), RA(등록기관, 신원 확인), 디렉터리(인증서·CRL 저장), 사용자 / 인증서 표준: <b>X.509</b>`},

{cat:"SQL",
 q:`다음은 [사원] 테이블에서 개발 부서 사원만 보여주는 뷰를 만들고 삭제하는 SQL문이다. 뷰를 통한 INSERT·UPDATE 시 뷰의 조건(부서 = '개발')을 벗어나는 변경을 막고, 삭제 시 이 뷰를 참조하는 다른 뷰도 함께 삭제되도록 괄호 ①~③에 알맞은 키워드를 쓰시오.
<div class="box"><code>CREATE ( ① ) V_개발 AS<br>
SELECT 사번, 이름, 급여 FROM 사원 WHERE 부서 = '개발'<br>
( ② ) CHECK OPTION;<br><br>
DROP VIEW V_개발 ( ③ );</code></div>`,
 ans:[["VIEW"],["WITH"],["CASCADE"]],
 exp:`• <code>CREATE VIEW 뷰이름 AS SELECT ...</code>: 뷰 생성<br>
• <code>WITH CHECK OPTION</code>: 뷰의 WHERE 조건을 만족하지 않는 행이 뷰를 통해 삽입·수정되는 것을 거부<br>
• <code>DROP VIEW ... CASCADE</code>: 이 뷰를 참조하는 다른 객체까지 연쇄 삭제 / <code>RESTRICT</code>: 참조 중이면 삭제 거부<br>
뷰는 ALTER로 정의를 변경할 수 없으므로 DROP 후 다시 CREATE 합니다.`},

{cat:"데이터베이스",
 q:`다음은 병행 제어 기법인 로킹(Locking)에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오. (③은 '높아진다/낮아진다' 중 하나를 쓰시오.)<div class="box">• <b>2단계 로킹(2PL) 규약</b>에서 트랜잭션은 lock만 수행할 수 있고 unlock은 할 수 없는 ( ① ) 단계와, unlock만 수행할 수 있고 새로운 lock은 할 수 없는 ( ② ) 단계로 나뉜다.<br>• <b>로킹 단위</b>가 커질수록 로크의 수가 적어져 관리가 쉽지만, 병행성 수준은 ( ③ ).</div>`,
 ans:[["확장","확장 단계","Growing","Growing Phase","성장","성장 단계"],["축소","축소 단계","Shrinking","Shrinking Phase","수축","수축 단계"],["낮아진다","낮아","낮다","낮아짐","감소한다"]],
 exp:`<b>2단계 로킹(2PL)</b>: 확장(Growing) 단계 → 축소(Shrinking) 단계. 직렬 가능성(Serializability)을 보장하지만 <b>교착상태는 예방하지 못합니다</b>.<br>
<b>로킹 단위(Granularity)</b>: 데이터베이스 &gt; 파일(테이블) &gt; 레코드 &gt; 필드
<pre>로킹 단위 큼  → 로크 수 적음, 오버헤드 감소, 병행성 낮음
로킹 단위 작음 → 로크 수 많음, 오버헤드 증가, 병행성 높음</pre>`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
a = list(range(10, 0, -3))
a.append([2, 3])
a.extend([5, 6])
a.insert(2, 8)
x = a.pop()
y = a.pop(1)
a.remove(4)
print(len(a), x + y, a[3][1], a[-2:])`,
 ans:[["5 13 3 [[2, 3], 5]"]],
 exp:`<pre>range(10, 0, -3)  → 10, 7, 4, 1 (0은 포함 안 됨)
append([2, 3])    → [10, 7, 4, 1, [2, 3]]       (리스트 통째로 1개 원소)
extend([5, 6])    → [10, 7, 4, 1, [2, 3], 5, 6] (원소를 풀어서 추가)
insert(2, 8)      → [10, 7, 8, 4, 1, [2, 3], 5, 6]
pop()             → x = 6, [10, 7, 8, 4, 1, [2, 3], 5]
pop(1)            → y = 7, [10, 8, 4, 1, [2, 3], 5]
remove(4)         → 값 4 삭제 → [10, 8, 1, [2, 3], 5]</pre>
len(a) = 5, x + y = 13, a[3] = [2, 3] → a[3][1] = 3, a[-2:] = [[2, 3], 5]<br>
결과: <code>5 13 3 [[2, 3], 5]</code>`},

{cat:"소프트웨어공학",
 q:`다음 설명에 해당하는 디자인 패턴을 쓰시오.<div class="box">행위(Behavioral) 패턴의 하나로, 상위 클래스에 알고리즘의 <b>전체 처리 흐름(골격)</b>을 정의한 메서드를 두고, 그 중 일부 단계를 <b>하위 클래스에서 재정의(오버라이딩)</b>하도록 하여 전체 구조는 바꾸지 않으면서 특정 단계의 처리만 달리할 수 있게 한다.</div>`,
 ans:[["템플릿 메서드","Template Method","템플릿메서드","템플릿 메소드","템플릿메소드","Template Method Pattern","템플릿 메서드 패턴"]],
 exp:`<b>템플릿 메서드(Template Method)</b>: 골격은 상위 클래스(final 템플릿 메서드), 세부 단계는 하위 클래스(추상/훅 메서드)가 구현.<br>
비교 — <b>전략(Strategy)</b>: 알고리즘 전체를 캡슐화하여 실행 중 교체(위임 기반) / <b>퍼사드(Facade)</b>: 복잡한 서브시스템에 단순한 통합 인터페이스 제공(구조 패턴)`},

{cat:"네트워크",
 q:`다음 설명에 해당하는 네트워크 장비를 [보기]에서 골라 쓰시오.<div class="box">① <b>물리 계층</b> 장비로, 한 포트로 들어온 신호를 연결된 <b>모든 포트로 그대로 전송</b>하며 전체가 하나의 충돌 도메인이 된다.<br>② <b>데이터 링크 계층</b> 장비로, <b>MAC 주소 테이블</b>을 이용해 목적지 포트로만 프레임을 전달한다.<br>③ <b>네트워크 계층</b> 장비로, <b>IP 주소</b>와 라우팅 테이블을 이용해 최적 경로를 선택하여 패킷을 전달한다.<br>④ 서로 <b>다른 프로토콜</b>을 사용하는 네트워크를 연결하며, 주로 전송 계층 이상에서 프로토콜 변환을 수행한다.<br><br>[보기] 허브, 스위치, 라우터, 게이트웨이</div>`,
 ans:[["허브","Hub"],["스위치","Switch","L2 스위치"],["라우터","Router"],["게이트웨이","Gateway"]],
 exp:`<pre>계층          장비             기준
1 물리        리피터, 허브      전기 신호
2 데이터링크  브리지, 스위치    MAC 주소
3 네트워크    라우터, L3 스위치 IP 주소
4~7 상위      게이트웨이        프로토콜 변환</pre>
허브는 충돌 도메인 1개, 스위치는 포트마다 충돌 도메인을 분리, 라우터는 <b>브로드캐스트 도메인</b>까지 분리합니다.`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오.",
 code:`
#include <stdio.h>

int main() {
    char *names[] = {"KOREA", "JAVA", "PYTHON", "SQL"};
    char **pp = names;

    printf("%s ", *(pp + 2));
    printf("%c", **pp);
    printf("%c", *(*(pp + 1) + 2));
    printf("%c ", pp[3][1]);
    pp++;
    printf("%s ", *pp + 1);
    printf("%d", (int)(sizeof(names) / sizeof(names[0])));
    return 0;
}`,
 ans:[["PYTHON KVQ AVA 4"]],
 exp:`<code>names</code>는 문자열 주소 4개를 담은 <b>포인터 배열</b>, <code>pp</code>는 그 첫 원소를 가리키는 <b>이중 포인터</b>입니다.<br>
• <code>*(pp+2)</code> = names[2] → "PYTHON"<br>
• <code>**pp</code> = names[0][0] → 'K'<br>
• <code>*(*(pp+1)+2)</code> = names[1][2] → "JAVA"의 'V'<br>
• <code>pp[3][1]</code> = "SQL"의 'Q'<br>
• <code>pp++</code> 후 <code>*pp</code> = names[1], <code>*pp + 1</code>은 'A' 다음 위치부터의 문자열 → "AVA" (<code>*(pp+1)</code>과 구분)<br>
• <code>sizeof(names) / sizeof(names[0])</code> = 배열 원소 개수 4 (pp를 옮겨도 names 배열의 크기는 불변)<br>
결과: <code>PYTHON KVQ AVA 4</code>`},

{cat:"보안",
 q:`다음은 디지털 콘텐츠 보호 기술에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.<div class="box">( ① )은(는) 디지털 콘텐츠의 생성부터 유통·이용까지 전 과정에서 <b>허가된 사용자만</b> 정해진 권한 범위 내에서 콘텐츠를 이용하도록 통제하는 기술이다. 그 구성 요소 중 ( ② )은(는) <b>저작권자의 사용 권한, 라이선스 발급 및 결제 관리</b>를 수행하는 주체이다.</div>`,
 ans:[["DRM","디지털 저작권 관리","Digital Rights Management","디지털저작권관리"],["클리어링 하우스","클리어링하우스","Clearing House","ClearingHouse"]],
 exp:`<b>DRM(Digital Rights Management)</b> 구성 요소<br>
• 콘텐츠 제공자(Contents Provider): 저작권자 / 콘텐츠 분배자(Distributor): 유통 / 패키저(Packager): 콘텐츠를 메타데이터와 함께 보호 단위로 묶음<br>
• <b>클리어링 하우스(Clearing House)</b>: 키 관리, 라이선스 발급, 결제 관리<br>
• 보안 컨테이너: 원본을 안전하게 유통하는 전자적 보안 장치 / DRM 컨트롤러: 이용 권한 통제`},

{cat:"소프트웨어공학",
 q:`다음은 보헴(Boehm)이 제안한 <b>나선형(Spiral) 모델</b>의 반복 단계를 순서대로 나타낸 것이다. 괄호에 들어갈 알맞은 단계를 쓰시오.<div class="box">( ① ): 목표, 대안, 제약 조건을 설정하는 단계<br>→ ( ② ): 위험 요소를 식별·평가하고 프로토타입 등으로 해결 방안을 찾는 단계<br>→ 개발 및 검증(공학적 개발): 소프트웨어를 개발하고 검증하는 단계<br>→ ( ③ ): 개발 결과를 사용자가 확인하고 다음 단계를 결정하는 단계</div>`,
 ans:[["계획 수립","계획수립","계획","Planning","계획 및 정의"],["위험 분석","위험분석","Risk Analysis","리스크 분석","리스크분석"],["고객 평가","고객평가","평가","사용자 평가","Customer Evaluation","Evaluation"]],
 exp:`<b>나선형 모델</b>: 폭포수 + 프로토타입 모델의 장점에 <b>위험 분석</b>을 추가한 점진적 반복 모델<br>
순서: <b>계획 수립 → 위험 분석 → 개발 및 검증 → 고객 평가</b> (암기: 계-위-개-고)<br>
특징: 대규모·고위험 시스템에 적합, 위험 관리 능력에 의존, 반복할수록 완성도가 높아짐`}
]};
