# ipe-quiz · 정보처리기사 실기 예상문제 모의고사

2026년 정기기사 제3회 대비 **정보처리기사 실기(필답형) 예상문제 10회분, 200문항**을 풀고, 자동으로 채점받고, 틀린 문제를 오답노트와 재시험으로 복습하는 웹 페이지입니다.
설치 없이 HTML 파일 하나(`docs/index.html`)로 동작합니다.

### 👉 [모의고사 바로 풀기](https://htmlpreview.github.io/?https://github.com/amykkkk/ipe-quiz/blob/main/docs/index.html)

| 바로가기 | 링크 |
|---|---|
| ▶️ 브라우저에서 바로 풀기 | [htmlpreview로 열기](https://htmlpreview.github.io/?https://github.com/amykkkk/ipe-quiz/blob/main/docs/index.html) |
| 🌐 GitHub Pages 주소 | [amykkkk.github.io/ipe-quiz](https://amykkkk.github.io/ipe-quiz/) (Pages를 켠 뒤 사용 가능, 아래 사용 방법 참고) |
| 💾 파일 내려받기 | [index.html 다운로드](https://raw.githubusercontent.com/amykkkk/ipe-quiz/main/docs/index.html) (열린 화면에서 `Ctrl+S`로 저장한 뒤 더블클릭) |

> ⚠️ 최근 출제 경향(2021~2026년 2회)을 바탕으로 만든 **예상 문제**이며, 실제 기출문제나 공식 자료가 아닙니다.

## 주요 기능

- **실전 형식:** 회차당 20문항 × 5점 = 100점 만점, 60점 이상 합격, 회차별 2시간 30분 타이머(시간이 끝나면 제출 안내)
- **자동 채점:** 문항마다 즉시 채점하고 정답과 해설을 보여 줌. 빈칸이 여러 개면 빈칸별 부분점수
  - 용어 문항: 띄어쓰기·대소문자 무시, 한/영 표기와 `OSPF(Open Shortest Path First)` 같은 괄호 표기 인정
  - 코드 실행 결과 문항: 대소문자와 값 사이 띄어쓰기 구분
  - 의미상 맞는데 오답이 되면 [내 답 정답 인정]으로 직접 정답 처리
- **📒 오답노트:** 틀린 문제가 자동으로 모임. 내 답과 정답 비교, 해설, 문항별 학습 자료(핵심 개념, 비교표, 함정 포인트, 암기 팁, 관련 키워드), 취약 영역 그래프, 필터·검색·정렬, 인쇄/PDF 저장
- **🔁 오답 재시험:** 미해결 오답만 모아 다시 풀기. 맞히면 '극복'으로 표시
- **자동 저장:** 답안(입력 중인 답 포함), 점수, 남은 시간, 오답노트를 브라우저에 저장해 새로고침 후에도 이어서 풀 수 있음. 여러 탭에서 열어도 서로 덮어쓰지 않도록 동기화
- 다크 모드, 모바일 화면 지원

## 출제 구성

회차마다 같은 비율로 출제했고, 회차끼리 주제가 겹치지 않게 나눴습니다.

| 영역 | 회차당 | 전체 |
|---|---|---|
| C언어 | 3 | 30 |
| Java | 2 | 20 |
| Python | 2 | 20 |
| SQL | 2 | 20 |
| 데이터베이스 | 2 | 20 |
| 보안 | 3 | 30 |
| 네트워크 | 2 | 20 |
| 소프트웨어공학 | 3 | 30 |
| 운영체제 | 1 | 10 |

## 사용 방법

- **바로 풀기:** 위의 [모의고사 바로 풀기](https://htmlpreview.github.io/?https://github.com/amykkkk/ipe-quiz/blob/main/docs/index.html) 링크를 누르면 설치 없이 브라우저에서 바로 열립니다.
- **내 PC에서 풀기:** `docs/index.html`을 내려받아 브라우저로 열면 됩니다(인터넷 연결 불필요).
- **GitHub Pages로 공개:** 저장소 Settings → Pages → Branch `main`, 폴더 `/docs`로 설정하면 [amykkkk.github.io/ipe-quiz](https://amykkkk.github.io/ipe-quiz/) 주소로 열립니다. 바로가기 링크보다 빠르고 안정적입니다.

기록은 그 브라우저 안에 저장되며, **여는 주소마다 따로 저장**됩니다(바로가기 링크, Pages 주소, 내려받은 파일의 기록은 서로 이어지지 않음). 시크릿 창, 사이트 데이터 삭제, 다른 브라우저나 기기에서도 이어지지 않습니다.

## 프로젝트 구조

```
src/
  head.html          페이지 head와 공통 스타일
  app.html           화면과 로직 (채점, 저장, 재시험, 오답노트)
  sets/setNN.js      회차별 문제 20개 (const EXAM = {...})
  notes/noteNN.js    회차별 학습 자료 20개 (NOTES.push([...]))
build.py             src를 합쳐 docs/index.html 한 파일로 만듦
tests/               채점·화면 테스트 (jsdom)
docs/index.html      빌드 결과물 (배포용)
```

## 빌드와 테스트

필요한 것: Python 3, Node.js

```bash
python build.py      # docs/index.html 생성
npm install          # 테스트용 jsdom 설치
npm test             # 빌드 후 전체 테스트
```

테스트에서 확인하는 내용:
- 200문항 모두 정답과 인정 답안이 정답으로, 엉뚱한 답이 오답으로 채점되는지
- Python 문항의 코드를 실제로 실행한 결과가 정답과 일치하는지
- 문제와 학습 자료의 HTML 태그가 깨지지 않았는지
- 채점 규칙, 저장·복원, 재시험, 오답노트, 시간 종료, 탭 동기화 등 화면 동작

C·Java 문항은 테스트에서 컴파일해 실행하지는 않습니다. 같은 로직을 다른 언어로 옮겨 실행하거나 직접 따라가며 정답을 확인했습니다.

## 문제 추가·수정

`src/sets/setNN.js`의 문항 형식:

```js
{ cat: "C언어",            // 영역 (위 표의 이름)
  q: `문제 HTML`,
  code: `코드 (선택)`,
  ans: [["정답", "인정 답안", ...], ...],   // 빈칸마다 배열 하나
  exp: `해설 HTML`,
  cs: true,          // 코드 실행 결과 문항: 대소문자·값 사이 띄어쓰기 구분
  unordered: true,   // 빈칸 순서 무관
  seq: true,         // 순서 나열 답 (쉼표·화살표 무시)
  set: true,         // 기호 묶음 답 (기호 순서 무관)
  blanks: ["①", "②"] // 빈칸 이름 직접 지정 (선택)
}
```

새 회차는 `setNN.js`와 같은 번호의 `noteNN.js`를 함께 추가하고 `python build.py`를 실행하면 탭이 자동으로 늘어납니다.
