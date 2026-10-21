const EMP_TABLE = `<div class="tblwrap"><table><tr><th>이름</th><th>부서</th><th>급여</th></tr>
<tr><td>김민수</td><td>영업</td><td>300</td></tr>
<tr><td>이민호</td><td>개발</td><td>450</td></tr>
<tr><td>박지민</td><td>개발</td><td>400</td></tr>
<tr><td>최민영</td><td>영업</td><td>350</td></tr>
<tr><td>정수빈</td><td>인사</td><td>380</td></tr></table></div>`;

const EXAM = {
title: "정보처리기사 실기 예상문제 제5회 (2026년 제3회 대비)",
questions: [
{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오.",
 code:`
#include <stdio.h>

int f() {
    static int n = 0;
    int m = 0;
    n += 2;
    m += 2;
    return n * m;
}

int main() {
    int s = 0;
    for (int i = 0; i < 3; i++)
        s += f();
    printf("%d", s);
    return 0;
}`,
 ans:[["24"]],
 exp:`<b>static 지역 변수</b> n은 최초 1회만 초기화되고 함수 종료 후에도 값이 유지됩니다. 일반 지역 변수 m은 호출마다 0으로 초기화됩니다.<br>
1회: n=2, m=2 → 4 / 2회: n=4, m=2 → 8 / 3회: n=6, m=2 → 12<br>4 + 8 + 12 = <b>24</b>`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
public class Main {
    static void change(int[] a, int b) {
        a[0] += 10;
        b += 10;
        a = new int[]{100, 200};
        a[1] = 0;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2};
        int v = 5;
        change(arr, v);
        System.out.println(arr[0] + arr[1] + v);
    }
}`,
 ans:[["18"]],
 exp:`• 배열은 <b>참조값이 복사</b>되어 전달 → <code>a[0] += 10</code>은 원본 arr[0]을 11로 변경<br>
• 기본형 b는 값 복사 → v는 그대로 5<br>
• <code>a = new int[]{...}</code>는 지역 변수 a가 새 배열을 가리키게 할 뿐, 원본 arr에는 영향 없음 → arr[1] = 2 유지<br>
11 + 2 + 5 = <b>18</b>`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
scores = {"kim": 80, "lee": 95, "park": 70, "choi": 95}
r = sorted(scores.items(), key=lambda x: (-x[1], x[0]))
print(r[0][0], r[-1][0])`,
 ans:[["choi park"]],
 exp:`정렬 키 <code>(-점수, 이름)</code> → 점수 내림차순, 점수가 같으면 이름 오름차순<br>
결과: [("choi", 95), ("lee", 95), ("kim", 80), ("park", 70)]<br>
r[0][0] = "choi", r[-1][0] = "park" → <code>choi park</code>`},

{cat:"SQL",
 q:`다음 [사원] 테이블에 대해 아래 SQL문을 실행했을 때의 결과값을 쓰시오.${EMP_TABLE}
<div class="box"><code>SELECT COUNT(*) FROM 사원<br>WHERE 이름 LIKE '%민%' AND 급여 &gt;= 350;</code></div>`,
 ans:[["3"]],
 exp:`<code>'%민%'</code>: '민'이 어느 위치든 포함 → 김민수, 이민호, 박지민, 최민영<br>
그중 급여 350 이상: 이민호(450), 박지민(400), 최민영(350) → <b>3</b><br>
(참고) <code>%</code>: 0개 이상의 임의 문자, <code>_</code>: 정확히 1개의 임의 문자`},

{cat:"데이터베이스",
 q:"다음은 데이터베이스 설계 단계에 대한 설명이다. 괄호에 들어갈 알맞은 설계 단계를 쓰시오.<div class=\"box\">요구 조건 분석 → ( ① ) → ( ② ) → ( ③ ) → 구현<br><br>• ( ① ): 현실 세계를 추상화하여 DBMS에 독립적인 <b>E-R 다이어그램(ERD)</b>을 작성하는 단계<br>• ( ② ): 특정 DBMS의 데이터 모델에 맞게 <b>테이블(스키마)로 변환하고 정규화</b>를 수행하는 단계<br>• ( ③ ): <b>저장 구조, 인덱스, 접근 경로</b> 등 성능을 고려하여 물리적 저장 장치에 맞게 설계하는 단계</div>",
 ans:[["개념적 설계","개념적설계","개념 설계","개념설계"],["논리적 설계","논리적설계","논리 설계","논리설계"],["물리적 설계","물리적설계","물리 설계","물리설계"]],
 exp:`<b>요구 조건 분석 → 개념적 설계 → 논리적 설계 → 물리적 설계 → 구현</b><br>
• 개념적 설계: E-R 모델, 트랜잭션 모델링 (DBMS 독립적)<br>• 논리적 설계: 스키마 정의, 정규화 (DBMS 종속적)<br>• 물리적 설계: 레코드 집중 분석, 인덱스·저장 구조, 응답 시간·저장 공간 효율·트랜잭션 처리량 고려`},

{cat:"데이터베이스",
 q:"다음은 관계형 데이터 모델의 구성 요소에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.<div class=\"box\">• ( ① ): 릴레이션을 구성하는 <b>튜플(행)의 수</b><br>• ( ② ): 릴레이션을 구성하는 <b>속성(열)의 수</b><br>• ( ③ ): 하나의 속성이 취할 수 있는 <b>같은 타입의 원자값들의 집합</b></div>",
 ans:[["카디널리티","Cardinality","기수","대응수"],["차수","Degree","디그리"],["도메인","Domain"]],
 exp:`• <b>카디널리티(Cardinality)</b> = 튜플 수 (기수, 대응수)<br>• <b>차수(Degree)</b> = 속성 수<br>• <b>도메인(Domain)</b> = 속성 값의 범위<br>
예: 5명의 학생이 (학번, 이름, 학과) 3개 속성으로 저장 → 카디널리티 5, 차수 3`},

{cat:"보안",
 q:"다음 설명에 해당하는 공격 기법을 쓰시오.<div class=\"box\">사자가 사냥감을 기다리는 물웅덩이에 비유한 공격으로, 공격 대상이 <b>자주 방문하는 웹사이트를 사전에 파악</b>하여 해당 사이트를 감염시킨 뒤, 대상이 사이트에 접속하면 악성코드에 감염되도록 하는 <b>표적형 공격</b>이다.</div>",
 ans:[["워터링 홀","워터링홀","Watering Hole","워터링 홀 공격","Watering Hole Attack"]],
 exp:`<b>워터링 홀(Watering Hole)</b>: 표적 집단이 신뢰하는 사이트를 미리 감염<br>
관련 — <b>드라이브 바이 다운로드</b>: 사이트 방문만으로 악성코드 자동 다운로드 / <b>스피어 피싱</b>: 특정인 대상 맞춤형 이메일 / <b>APT</b>: 지능형 지속 위협`},

{cat:"보안",
 q:"다음 설명에 해당하는 보안 모델을 쓰시오.<div class=\"box\">'<b>아무것도 신뢰하지 말고 항상 검증하라(Never Trust, Always Verify)</b>'는 원칙에 기반한 보안 모델로, 내부 네트워크라도 기본적으로 신뢰하지 않고 모든 사용자·기기·접근 요청에 대해 <b>지속적으로 인증과 권한을 검증</b>하며 최소 권한만 부여한다.</div>",
 ans:[["제로 트러스트","제로트러스트","Zero Trust","제로 트러스트 모델","Zero Trust Model","ZTA"]],
 exp:`<b>제로 트러스트(Zero Trust)</b>: 경계 기반 보안(내부=신뢰)의 한계를 보완<br>
핵심 요소: 최소 권한 원칙, 마이크로 세그멘테이션, 다중 인증(MFA), 지속적 모니터링`},

{cat:"네트워크",
 q:"다음 설명에 해당하는 기술을 영문 약어로 쓰시오.<div class=\"box\">내부 네트워크에서 사용하는 <b>사설 IP 주소를 외부의 공인 IP 주소로 변환</b>해 주는 기술로, 부족한 공인 IP 주소를 절약할 수 있고 내부 네트워크 주소를 외부에 숨겨 보안성을 높일 수 있다.</div>",
 ans:[["NAT","Network Address Translation","네트워크 주소 변환"]],
 exp:`<b>NAT(Network Address Translation)</b> 유형: Static NAT(1:1), Dynamic NAT, <b>PAT(NAPT)</b> – 포트 번호로 여러 사설 IP를 하나의 공인 IP로 변환<br>
사설 IP 대역: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16`},

{cat:"소프트웨어공학",
 q:"다음 설명에 해당하는 디자인 패턴을 쓰시오.<div class=\"box\">구조(Structural) 패턴의 하나로, 기존 객체를 수정하지 않고 <b>객체에 추가적인 기능(책임)을 동적으로 덧붙이는</b> 패턴이다. 상속 대신 객체를 감싸는(Wrapping) 방식으로 기능을 확장하며, Java의 입출력 스트림 클래스(BufferedReader 등)가 대표적인 예이다.</div>",
 ans:[["Decorator","데코레이터","Decorator Pattern","데코레이터패턴"]],
 exp:`<b>데코레이터(Decorator)</b>: 기능을 겹겹이 감싸 확장 (서브클래싱보다 유연)<br>
비교 — <b>프록시</b>: 접근 제어용 대리 객체 / <b>퍼사드</b>: 복잡한 서브시스템에 단순한 통합 인터페이스 제공 / <b>컴포지트</b>: 부분-전체 트리 구조`},

{cat:"소프트웨어공학",
 q:"다음 설명에 해당하는 블랙박스 테스트 기법을 쓰시오.<div class=\"box\">과거의 경험이나 테스터의 감각으로 <b>오류가 발생할 만한 부분을 예측</b>하여 테스트하는 기법으로, 다른 블랙박스 테스트 기법으로는 놓치기 쉬운 오류를 찾아내기 위한 <b>보충적</b> 검사 기법이다.</div>",
 ans:[["오류 예측 검사","오류예측검사","오류 예측","오류예측","Error Guessing","오류 예측 테스트","에러 추정"]],
 exp:`블랙박스 테스트 기법<br>• 동치 분할: 입력 자료를 유효/무효 동치 클래스로 나눔<br>• 경계값 분석: 경계값 위주 테스트<br>• 원인-효과 그래프: 입력과 출력의 관계를 그래프로 분석<br>• <b>오류 예측</b>: 경험 기반 보충 검사<br>• 비교 검사: 여러 버전에 같은 입력 후 결과 비교`},

{cat:"운영체제",
 q:"다음 프로세스들이 모두 시각 0에 P1, P2, P3 순서로 준비 큐에 도착했다. <b>라운드 로빈(RR)</b> 스케줄링(타임 퀀텀 = 2)을 적용할 때, ① P2의 완료 시각과 ② 평균 반환 시간을 쓰시오. (②는 소수점 셋째 자리에서 반올림)<div class=\"tblwrap\"><table><tr><th>프로세스</th><th>실행 시간</th></tr><tr><td>P1</td><td>5</td></tr><tr><td>P2</td><td>3</td></tr><tr><td>P3</td><td>1</td></tr></table></div>",
 ans:[["8"],["7.33"]],
 exp:`<pre>| P1 0~2 | P2 2~4 | P3 4~5 | P1 5~7 | P2 7~8 | P1 8~9 |</pre>
P3 완료 5, P2 완료 <b>8</b>, P1 완료 9<br>
반환 시간 = 완료 시각 − 도착 시각 → (9 + 8 + 5) / 3 = 22 / 3 = <b>7.33</b><br>
(참고) 대기 시간 = 반환 시간 − 실행 시간 → P1 4, P2 5, P3 4 → 평균 4.33`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오.",
 code:`
#include <stdio.h>

int main() {
    char *s = "PROGRAM";
    char *p = s + 3;
    printf("%c%c%s", *p, *(s + 1), p + 2);
    return 0;
}`,
 ans:[["GRAM"]],
 exp:`인덱스: P(0) R(1) O(2) G(3) R(4) A(5) M(6)<br>
• <code>*p</code> = s[3] = 'G'<br>• <code>*(s+1)</code> = 'R'<br>• <code>p + 2</code> = s + 5부터 널 문자 전까지 문자열 → "AM"<br>결과: <code>GRAM</code>`},

{cat:"Java", cs:true,
 q:"다음 Java 프로그램의 실행 결과를 쓰시오.",
 code:`
class A {
    int f(int x) { return x + 1; }
    int g(int x) { return f(x) * 2; }
}

class B extends A {
    int f(int x) { return x * 3; }
    int g(int x) { return super.g(x) + 1; }
}

public class Main {
    public static void main(String[] args) {
        A a = new B();
        System.out.println(a.g(4));
    }
}`,
 ans:[["25"]],
 exp:`① a.g(4) → 실제 객체가 B이므로 B.g(4) 실행<br>
② super.g(4) → A.g 실행, 그 안의 <code>f(x)</code>는 <b>this.f(x)</b>이고 this는 B 객체 → <b>B.f(4) = 12</b> (A.f가 아님!)<br>
③ A.g 결과 12 × 2 = 24 → B.g에서 +1 = <b>25</b>`},

{cat:"Python", cs:true,
 q:"다음 Python 프로그램의 실행 결과를 쓰시오.",
 code:`
a = [10, 20, 30]
total = 0
for i in range(5):
    try:
        total += a[i] // (i - 1)
    except ZeroDivisionError:
        total += 100
    except IndexError:
        total -= 1
print(total)`,
 ans:[["118"]],
 exp:`• i=0: 10 // (−1) = −10 → total −10<br>
• i=1: 20 // 0 → ZeroDivisionError → +100 → 90<br>
• i=2: 30 // 1 = 30 → 120<br>
• i=3: a[3] → IndexError → −1 → 119<br>
• i=4: a[4] → IndexError → −1 → <b>118</b><br>
(<code>//</code>는 바닥 나눗셈이며 음수는 내림 처리됩니다. 예: 7 // −2 = −4)`},

{cat:"네트워크",
 q:"다음은 IPSec 프로토콜에 대한 설명이다. 괄호에 들어갈 알맞은 프로토콜을 영문 약어로 쓰시오.<div class=\"box\">• ( ① ): 메시지 인증 코드(MAC)를 이용하여 <b>데이터 무결성과 출처 인증</b>을 제공하지만, <b>암호화(기밀성)는 제공하지 않는다</b>.<br>• ( ② ): 데이터 무결성과 인증뿐 아니라 페이로드를 <b>암호화하여 기밀성</b>까지 제공한다.</div>",
 ans:[["AH","Authentication Header"],["ESP","Encapsulating Security Payload"]],
 exp:`IPSec(네트워크 계층 보안)<br>• <b>AH</b>: 무결성 + 인증 (암호화 X)<br>• <b>ESP</b>: 무결성 + 인증 + <b>기밀성(암호화)</b><br>• <b>IKE</b>: 보안 연관(SA)과 키 교환<br>동작 모드: 전송(Transport) 모드, 터널(Tunnel) 모드`},

{cat:"소프트웨어공학",
 q:"LOC(Line Of Code) 기법으로 개발 기간을 산정하려고 한다. 총 라인 수가 <b>30,000라인</b>, 개발자가 <b>5명</b>, 개발자 1인당 월평균 생산성이 <b>300라인</b>일 때 예상 개발 기간은 몇 개월인지 쓰시오.",
 ans:[["20","20개월"]],
 exp:`노력(인월, M/M) = LOC / 1인당 월평균 생산성 = 30,000 / 300 = 100 M/M<br>
개발 기간 = 노력 / 투입 인원 = 100 / 5 = <b>20개월</b><br>
(참고) 비용 산정 기법: LOC, COCOMO(조직형·반분리형·내장형), 기능 점수(FP), Putnam 모형`},

{cat:"C언어", cs:true,
 q:"다음 C언어 프로그램의 실행 결과를 쓰시오. (두 값은 한 칸 띄어 쓰시오.)",
 code:`
#include <stdio.h>

int fib(int n, int *calls) {
    (*calls)++;
    if (n <= 1) return n;
    return fib(n - 1, calls) + fib(n - 2, calls);
}

int main() {
    int c = 0;
    int r = fib(5, &c);
    printf("%d %d", r, c);
    return 0;
}`,
 ans:[["5 15"]],
 exp:`fib(5) = 5 (0, 1, 1, 2, 3, 5)<br>
호출 횟수 C(n) = 1 + C(n−1) + C(n−2), C(0) = C(1) = 1<br>
C(2) = 3, C(3) = 5, C(4) = 9, C(5) = 1 + 9 + 5 = <b>15</b><br>
calls는 포인터로 전달되어 모든 재귀 호출이 같은 변수 c를 증가시킵니다. → <code>5 15</code>`},

{cat:"보안",
 q:"다음은 정보보안의 3대 요소에 대한 설명이다. 괄호에 들어갈 알맞은 용어를 쓰시오.<div class=\"box\">• ( ① ): 인가된 사용자만 정보에 접근할 수 있도록 하여 정보가 노출되지 않게 하는 것<br>• ( ② ): 인가된 사용자만 정보를 수정할 수 있으며, 정보가 위·변조되지 않고 정확하게 유지되는 것<br>• ( ③ ): 인가된 사용자가 필요할 때 언제든지 정보와 서비스를 사용할 수 있는 것</div>",
 ans:[["기밀성","Confidentiality","비밀성"],["무결성","Integrity"],["가용성","Availability"]],
 exp:`정보보안 3요소 <b>CIA</b>: Confidentiality(기밀성), Integrity(무결성), Availability(가용성)<br>
추가 요소: 인증(Authentication), 부인 방지(Non-repudiation)<br>
가용성을 위협하는 대표 공격: DoS/DDoS`},

{cat:"SQL",
 q:`다음 [사원] 테이블에 대해 아래 SQL문을 실행했을 때, ① 결과의 <b>첫 번째 행의 부서</b>와 ② 결과 <b>행의 수</b>를 쓰시오.${EMP_TABLE}
<div class="box"><code>SELECT 부서, MAX(급여) AS 최고급여<br>FROM 사원<br>GROUP BY 부서<br>ORDER BY 2 DESC;</code></div>`,
 ans:[["개발"],["3","3행","3개"]],
 exp:`부서별 최고 급여: 영업 350, 개발 450, 인사 380 → 3개 그룹(3행)<br>
<code>ORDER BY 2 DESC</code>는 SELECT 목록의 <b>2번째 열(최고급여)</b> 기준 내림차순<br>
→ 개발(450), 인사(380), 영업(350) → 첫 행은 <b>개발</b>`}
]};
