# AMPLIA Lab 홈페이지 인수인계

최종 정리일: 2026-08-12  
GitHub 저장소: <https://github.com/dear-hub-hub/forfun>  
공개 사이트: <https://dear-hub-hub.github.io/forfun/>  
기본 브랜치: `main`

## 사이트 구성

| 파일 | 역할 |
| --- | --- |
| `index.html` | 메인 홈페이지: Hero, News, Research, People, Publications, Contact |
| `styles.css` | 메인 홈페이지 스타일 및 Hero/Research 인터랙션 |
| `script.js` | 모바일 메뉴 동작 |
| `professor.html` | Professor Profile 전용 페이지 |
| `professor.css` | Professor Profile 기본 스타일 |
| `amplia-mark.png` | AMPLIA 공식 심볼 원본. 파비콘·상단 로고·Hero 워터마크에 사용 |
| `Research Interests.png` | Research Interests 왼쪽에 표시되는 연구 개요 이미지 |
| `professor.jpg` | Professor Profile 상단 사진 |
| `professor QR.png` | 모바일 명함 QR 코드 |

## 주요 페이지와 링크

- 메인: `https://dear-hub-hub.github.io/forfun/`
- Professor Profile: `https://dear-hub-hub.github.io/forfun/professor.html`
- 메인 People 섹션의 `Professor profile` 링크는 `professor.html`로 연결됨.

## 현재 디자인 상태

### Hero

- 거의 검정에 가까운 딥 네이비 배경과 블루 포인트 컬러.
- 중앙에 `AMPLIA Lab`, `INHA UNIVERSITY`, 소개 문구, 메일 버튼.
- 하단에는 여러 겹의 파란 파형 애니메이션.
- `amplia-mark.png`을 육각형 형태로 잘라 워터마크처럼 사용함.

### Research

- Hero와 같은 딥 네이비 기반.
- 왼쪽: `Research Interests`, 연구 개요 이미지, 연구 키워드 태그.
- 오른쪽: `On-Going Projects`.
- 오른쪽 하단: 낮은 불투명도의 `Completed Projects`.
- Research Interests 이미지는 기본적으로 왼쪽 칸 폭을 채우며, 마우스 오버 또는 키보드 포커스 시 전체 화면으로 확대됨.

### Professor Profile

- 상단: 어두운 네이비 소개 영역, 컬러 교수님 사진, 연락처, QR 코드.
- 중간: ORCID / Google Scholar 바는 딥 네이비.
- 하단: Education / Professional Experiences / Awards and Honors가 각기 다른 배경색으로 분리됨.
- 01 / 02 / 03 제목은 큰 목차용 텍스트, 이력 본문은 문서형 크기로 조정됨.

## 최근 커밋

- `6bba62c` Apply professor profile hierarchy inline
- `aab0e68` Strengthen professor profile hierarchy
- `02e28d7` Refine professor profile typography
- `c4ff0f7` Add professor profile page
- `a576a01` Expand Research diagram on hover
- `b354643` Reorganize research project panels

## 매우 중요한 캐시 주의사항

GitHub Pages CDN이 `styles.css`와 특히 `professor.css`의 이전 버전을 오래 제공한 적이 있습니다.

- 메인 CSS 변경 시 `index.html`의 stylesheet URL 뒤 버전 값을 바꾸는 것을 권장합니다.
  - 예: `styles.css?v=20260812-01`
- Professor CSS 변경 시 `professor.html`의 stylesheet URL 뒤 버전 값을 바꾸는 것을 권장합니다.
  - 예: `professor.css?v=20260812-01`
- Professor Profile의 가장 최근 폰트/색상 위계는 `professor.html`의 `<style>` 블록에도 직접 들어 있습니다. 이는 CDN 캐시가 오래된 `professor.css`를 제공하던 문제를 우회하기 위해 추가된 것입니다.
- 확인할 때는 URL 끝에 임의의 쿼리 값을 붙이거나 `Ctrl + F5`로 새로고침합니다.
  - 예: `https://dear-hub-hub.github.io/forfun/professor.html?v=check-1`

## 배포 방법

현재 폴더는 Git 저장소이며 원격 저장소는 `origin`으로 설정되어 있습니다.

```powershell
cd "C:\Users\김민지\Desktop\취미생활"
git status
git add <수정한 파일>
git commit -m "작업 설명"
git push
```

`main`으로 푸시하면 GitHub Pages가 자동 배포합니다. 초기 반영에는 수 분이 걸릴 수 있습니다.

## 주의할 파일

- `KakaoTalk_20260812_143645571.png`은 작업 중 폴더에 들어온 사용자 이미지이며, 현재 웹사이트에는 사용하지 않습니다.
- 변경 사항을 올릴 때 `git add .` 대신 필요한 파일만 명시적으로 추가하는 편이 안전합니다.

## 다음 작업 시 권장 사항

1. 먼저 공개 URL에서 화면을 실제로 확인한 뒤 완료를 알릴 것.
2. CSS를 수정했다면 HTML의 CSS 버전 쿼리도 함께 갱신할 것.
3. 로고는 반드시 `amplia-mark.png` 원본만 사용할 것. 새 로고를 만들거나 변형하지 말 것.
4. Research 이미지가 오른쪽 칼럼을 덮지 않는지 데스크톱/모바일에서 모두 확인할 것.
