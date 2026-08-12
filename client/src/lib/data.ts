type ResultRow = { label: string; before: string; after: string; delta?: string; note?: string };
type Troubleshooting = { title: string; problem: string; cause: string; solution: string; results?: ResultRow[] };

export const portfolioData = {
  name: "백승민",
  title: "Backend Engineer",
  contact: {
    email: "alpin1122@gmail.com",
    phone: "010-2822-6154",
    github: "github.com/alpin87",
    blog: "alpine-1.tistory.com"
  },
  hero: {
    facts: [
      { label: "NOW", title: "앤유코퍼레이션 Backend Engineer", sub: "myblocks.kr 커머스 개발 중" },
      { label: "SHIPPED", title: "동양미래대 숲 운영 중", sub: "iOS · Android 스토어 출시" },
      { label: "OPEN SOURCE", title: "Spring Security 기여", sub: "PR #18493 merged" }
    ]
  },
  openSource: [
    {
      repo: "spring-projects/spring-security",
      pr: "#18493",
      title: "Fix Javadoc warnings in spring-security-acl",
      description: "세계적으로 쓰이는 보안 프레임워크의 Javadoc 경고를 정리해 머지됐습니다.",
      url: "https://github.com/spring-projects/spring-security/pull/18493"
    }
  ],
  miniProjects: [
    {
      name: "Image-Resize",
      description: "Spring Boot + AWS S3 이미지 리사이징 업로드 구현.",
      language: "Java",
      tag: "Backend",
      github: "github.com/alpin87/Image-Resize"
    },
    {
      name: "ReLog",
      description: "Menhealer 팀의 ReLog 서비스 Spring Boot 백엔드.",
      language: "Java",
      tag: "Backend",
      github: "github.com/Menhealer/backend"
    }
  ],
  skills: {
    now: [
      { category: "LANGUAGE / RUNTIME", items: ["TypeScript", "JavaScript", "Next.js", "React", "Node.js"] },
      { category: "RUBY / RAILS", items: ["Ruby", "Ruby on Rails 8", "Hotwire (Turbo · Stimulus)", "Solid Queue · Solid Cache"] },
      { category: "AWS SERVERLESS", items: ["Lambda", "Step Functions", "SQS + DLQ", "EventBridge", "CDK"] },
      { category: "DATA / SEARCH", items: ["DynamoDB", "Upstash Redis", "OpenSearch"] },
      { category: "EDGE / TOOLING", items: ["Cloudflare", "Chrome Extension MV3", "Turborepo", "Sentry"] }
    ],
    previously: [
      { category: "BACKEND", items: ["Java", "Spring Boot", "Spring Security", "JPA / QueryDSL"] },
      { category: "DATABASE", items: ["MySQL", "PostgreSQL", "Elasticsearch", "Redis"] },
      { category: "INFRA", items: ["Docker", "Linux", "GitHub Actions", "AWS EC2 / S3", "OCI"] }
    ]
  },
  experience: [
    {
      company: "Mireene.com (미리내닷컴)",
      position: "Web Hosting Engineer Intern",
      role: "Web Hosting Engineer Intern",
      period: "2018.01 - 2018.03",
      description: "호스팅 전문 기업에서 리눅스 서버(CentOS)를 직접 관리하며 엔지니어링의 기초를 다졌습니다."
    },
    {
      company: "덕일전자공업고등학교",
      position: "실습실 조교",
      role: "실습실 조교",
      period: "2018.04 - 2019.03",
      description: "컴퓨터 실습실 관리 및 유지보수 [비개발]"
    },
    {
      company: "제 11 기계화 보병사단 정보통신대대",
      position: "통신병",
      role: "통신병",
      period: "2019.06 - 2021.01",
      description: "만기 전역"
    },
    {
      company: "김앤장 법률사무소",
      position: "사원",
      role: "사원",
      period: "2021.07 - 2022.02",
      description: "사원 [비개발]"
    },
    {
      company: "동양미래대학교",
      position: "근로장학생",
      role: "근로장학생",
      period: "2022.12 - 2025.02",
      description: "컴퓨터공학과 실습실 유지보수 [비개발]"
    },
    {
      company: "주식회사 앤유코퍼레이션",
      position: "Backend Engineer",
      role: "Backend Engineer",
      period: "2026.03 - 현재",
      description: "링크 인 바이오 커머스 플랫폼 myblocks.kr 백엔드 개발 (Next.js 모노레포 · AWS 서버리스)"
    }
  ],
  education: [
    {
      school: "동양미래대학교",
      major: "컴퓨터소프트웨어공학과 3년제",
      type: "졸업",
      status: "졸업",
      gpa: "3.73 / 4.5"
    },
    {
      school: "동양미래대학교",
      major: "컴퓨터소프트웨어공학과 학사과정 1년 (야간)",
      type: "(졸업예정)",
      status: "(졸업예정)",
      gpa: "4.07 / 4.5"
    }
  ],
  certifications: [
    { name: "통신선로기능사", issuer: "한국방송통신전파진흥원", date: "종료일 없음" },
    { name: "리눅스 마스터 2급", issuer: "정보통신기술자격검증", date: "2028.06 만료" },
    { name: "네트워크 관리사 2급", issuer: "한국정보통신자격협회", date: "2028.06 만료" },
    { name: "정보처리기사", issuer: "필기합격", date: "실기 발표 대기중" }
  ],
  projects: [
    {
      id: "tempick-extension",
      hasDetail: true,
      category: "회사 프로젝트 · 앤유코퍼레이션",
      title: "Tempick 크롬 확장",
      subtitle: "쿠팡 상품 페이지에서 버튼 한 번으로 담는 Manifest V3 확장",
      period: "2026.07 - 현재",
      status: { label: "스토어 심사", tone: "accent" as const },
      summary: "쿠팡 화면을 떠나지 않고 상품을 크리에이터 페이지에 담게 만든 크롬 확장. 확장 오리진이 쿠키를 받지 못해 인증 설계부터 다시 짠 사례.",
      highlights: [
        "chrome-extension:// 오리진은 SameSite=Lax 쿠키를 못 받음 → 토큰 인증 + 매 요청 계정 상태 재확인 (fail closed)",
        "계정 연결 3세대 재설계 — 토큰 수동 복사 6단계 → 로그인 승인 1회 → 일회용 코드 교환",
        "프래그먼트는 안전하다던 내 반박이 오답 — 로그에 남은 토큰 95건 확인 후 OAuth 인가 코드 방식으로 교체"
      ],
      description: "쿠팡 상품을 Tempick 페이지에 올리려면 주소를 복사해 어드민으로 이동하고, 모달을 열어 붙여넣고, 수익 링크로 변환해 저장하는 여섯 단계를 거쳐야 했습니다. 상품 하나에 화면을 두 번 오가는 구조라 상품을 열 개 올리는 사용자에게는 이 왕복이 작업 시간의 대부분이었습니다. 목표는 쿠팡 화면을 떠나지 않는 것 하나였고, 상품 페이지에 버튼을 얹어 제목·썸네일·주소를 읽어 보내면 서버가 머천트 본인의 쿠팡파트너스 키로 수익 링크를 만들어 블록으로 쌓게 했습니다. 다만 이 작업의 대부분은 기능이 아니라 확장이라는 실행 환경이 만든 제약이었습니다. 쿠키를 쓸 수 없다는 것과, 콘텐츠 스크립트가 도는 페이지를 통제할 수 없다는 것 두 가지입니다.",
      role: "Backend & Extension",
      techStack: [
        "JavaScript", "Chrome Extension MV3", "Service Worker", "Side Panel API", "Content Script",
        "chrome.identity", "Node.js (jsdom)", "Ruby", "Ruby on Rails 8.1", "PostgreSQL (Neon)",
        "Solid Cache", "쿠팡파트너스 Open API"
      ],
      features: [],
      troubleshooting: [
        {
          title: "확장에서는 로그인 세션이 통하지 않았다",
          problem: "쿠팡 페이지에 얹은 버튼이 서버로 요청을 보내면 로그인하지 않은 것으로 처리됐습니다. 확장을 쓰려면 먼저 사용자를 알아봐야 하는데 그 첫 단추가 막힌 셈입니다.",
          cause: "확장은 chrome-extension:// 오리진에서 돌기 때문에 쿠팡 페이지에서 서비스 도메인으로 가는 요청이 크로스 사이트가 됩니다. 세션 쿠키는 SameSite=Lax라 이때 실리지 않고, credentials 옵션을 붙여도 브라우저가 애초에 보내지 않습니다.",
          solution: "쿠키를 포기하고 머천트별 토큰을 Authorization 헤더에 실었습니다. 대신 토큰은 만료가 없고 브라우저 저장소에 남으므로, 매 요청마다 머천트 상태와 사용자 상태를 둘 다 확인하고 하나라도 아니면 거절하도록 했습니다. 사용자 활성 여부만 보면 계정을 정지시켜도 예전 토큰으로 계속 쓰기가 됩니다.",
          results: [
            { label: "토큰 요청의 계정 상태 확인", before: "사용자 상태만", after: "머천트 + 사용자 (fail closed)" }
          ]
        },
        {
          title: "계정을 연결하는 데 여섯 단계가 필요했다",
          problem: "확장을 쓰려면 어드민으로 이동해 연동 토큰을 발급하고, 복사해서, 확장을 열고, 붙여넣고, 저장해야 했습니다. 상품을 담기도 전에 여섯 단계를 밟는 셈이고 그 사이 토큰이 클립보드와 화면을 거칩니다.",
          cause: "첫 구현이 가장 만들기 쉬운 방법을 골랐습니다. 사용자 동선과 토큰 노출 둘 다에서 가장 나쁜 선택이었습니다.",
          solution: "chrome.identity.launchWebAuthFlow로 승인 화면을 별도 창에 띄워, 평소처럼 로그인하고 연결하기만 누르면 토큰이 콜백으로 확장에 직접 전달되게 바꿨습니다. getAuthToken은 구글 계정 전용이라 쓸 수 없고 서드파티 OAuth 자리가 launchWebAuthFlow라는 것, 콜백 주소가 chrome.identity.getRedirectURL()이 주는 값으로 고정된다는 것을 확인하고 그 표준에 맞췄습니다.",
          results: [
            { label: "쿠팡 상품을 내 페이지에 담기", before: "화면 이동 · 복사 · 붙여넣기 6단계", after: "버튼 1회" },
            { label: "계정 연결", before: "토큰 수동 복사 6단계", after: "로그인 승인 1회" }
          ]
        },
        {
          title: "안전하다고 반박했는데, 로그에 토큰이 95건 남아 있었다",
          problem: "외부 코드 리뷰에서 승인 콜백 URL에 만료 없는 장기 토큰을 싣고 있다는 지적을 받았습니다.",
          cause: "저는 프래그먼트(#)는 브라우저가 서버로 보내지 않으니 안전하다고 반박했고, 그 반박이 틀렸습니다. 브라우저가 보내지 않는 것과, 우리가 만들어 내보내는 Location 헤더가 로그에 남는 것은 다른 문제입니다. Rails는 리다이렉트 대상을 INFO로 기록하는데 필터 설정 기본값이 비어 있어서, 개발 로그를 실제로 세어 보니 토큰이 그대로 실린 기록이 95건 있었습니다. 추측이 아니라 로그에 찍힌 실물이었습니다.",
          solution: "OAuth 인가 코드와 같은 방식으로 다시 만들었습니다. 콜백에는 60초짜리 일회용 코드만 싣고 확장이 별도 요청으로 토큰과 바꿔 갑니다. 코드는 읽는 즉시 삭제해 두 번 쓸 수 없고, 무작위 대입은 IP 기준 분당 10회로 제한하고, 리다이렉트 로그 자체도 필터로 가렸습니다. 이론상 안전하다고 반박하기 전에 로그를 먼저 열었어야 했다는 것이 이 건에서 남은 교훈입니다.",
          results: [
            { label: "리다이렉트 로그에 남던 장기 토큰", before: "95건", after: "0건", delta: "-100%" },
            { label: "콜백에 실리는 값", before: "만료 없는 장기 토큰", after: "60초 · 1회 소비 코드" }
          ]
        },
        {
          title: "확장이 보내온 값을 그대로 믿을 수 없었다",
          problem: "승인 콜백 주소도, 상품 정보도 모두 우리 통제 밖에서 들어옵니다. 콜백 주소를 그대로 믿으면 토큰이 남의 주소로 나가고, 상품 정보는 쿠팡 페이지가 DOM을 바꿔 조작할 수 있습니다.",
          cause: "콘텐츠 스크립트는 제가 짰지만 제가 통제하지 못하는 페이지 안에서 돕니다. 우리 코드가 보낸 값이라는 이유로 믿으면 안 되고, 사용자 입력과 같은 급으로 다뤄야 합니다.",
          solution: "콜백 주소는 호스트를 문자열 포함으로 비교하지 않고 확장 ID를 정확히 떼어내 허용 목록과 맞추며, 통과하지 못하면 승인 화면 자체를 렌더하지 않습니다. 상품 값은 백그라운드 워커에서 다시 검사합니다. 호스트를 정확히 비교하고, 상품 경로에 숫자 경계를 두고, 목록 카드의 상대 경로를 절대화하고, 위험한 이미지 스킴을 버리고, 제목 길이를 자릅니다.",
          results: [
            { label: "redirect_uri 우회 시도", before: "검증 없음", after: "7종 전부 400" },
            { label: "페이지가 조작한 콘텐츠 스크립트 값", before: "그대로 신뢰", after: "7종 차단 확인" },
            { label: "경계 케이스 검증", before: "—", after: "jsdom 하니스 9개 고정" }
          ]
        },
        {
          title: "버튼이 아예 안 붙거나 화면 한참 아래에 붙었다",
          problem: "쿠팡 상품 페이지에 버튼을 주입했는데 하나도 붙지 않았고, 사이드패널은 상품 사진과 상관없는 위치에 나타났습니다.",
          cause: "장바구니담기 버튼을 a와 button 태그에서 찾았는데 쿠팡은 그 자리를 div로 그립니다. 패널 위치는 가장 큰 이미지를 기준으로 삼았다가 본문 설명 이미지가 잡혀 top 19468px에 붙는 일이 있었습니다. 쿠팡 DOM은 우리가 통제하지 못하고 클래스명도 빌드마다 바뀔 수 있습니다.",
          solution: "TreeWalker로 텍스트 노드를 훑어 태그가 아닌 문구로 찾고, 목록 카드는 상품 링크에서 조상으로 올라가며 경계를 잡아 클래스명이 바뀌어도 버티게 했습니다. 패널은 구매 버튼 행보다 위, 가로세로비, og:image 일치 같은 조건을 겹쳐 후보를 좁힌 뒤 최종적으로 사진 열을 직접 지정해 그 아래 여백에 흐름 밖으로 얹었습니다. 흐름 안에 넣으면 상품 사진이 밀려납니다.",
          results: [
            { label: "확장 UI 전체 e2e 자동화", before: "—", after: "없음", note: "미검증 — 쿠팡 DOM이 바뀌면 버튼 주입이 조용히 실패할 수 있고, 이건 테스트가 아니라 사용자 제보로 알게 되는 종류입니다." }
          ]
        },
        {
          title: "연결은 됐는데 담기만 실패하는 상태가 만들어졌다",
          problem: "쿠팡파트너스 API 키가 없어도 확장 연결은 성공했습니다. 사용자는 연결됐다고 믿는데 상품을 담을 때만 실패하는, 아예 연결이 안 되는 것보다 나쁜 상태입니다.",
          cause: "연결에 필요한 조건과 실제 동작에 필요한 조건을 따로 검사하지 않았습니다. 담을 페이지를 지정하지 않는 것도 같은 성격이라, 계정에 페이지가 여럿이면 엉뚱한 곳에 쌓입니다.",
          solution: "키가 없으면 연결 자체를 거절하고, 담을 페이지를 필수로 받고, 변환에 실패한 상품은 이름으로 알려줍니다. 일부 실패라고만 보여주면 어느 상품을 다시 담아야 할지 알 수 없습니다. 결과 확인을 위해 사이드패널 안에 공개 페이지를 띄우는 것도, 프레이밍 정책을 전부 여는 대신 공개 페이지에 한해서만 풀고 확장 ID만 허용해 어드민은 그대로 뒀습니다.",
          results: []
        }
      ] as Troubleshooting[],
      links: {},
      image: "/images/project-tempick-extension.png"
    },
    {
      id: "tempick",
      hasDetail: true,
      category: "회사 프로젝트 · 앤유코퍼레이션",
      title: "Tempick",
      subtitle: "쿠팡파트너스 수익 링크를 블록으로 쌓는 크리에이터 페이지",
      period: "2026.07 - 현재",
      status: { label: "운영 중", tone: "success" as const },
      summary: "크리에이터 페이지 빌더의 Rails 백엔드 — 실사용에서 드러난 병목과 동시성 결함을 실측으로 분해해 고친 작업.",
      highlights: [
        "템플릿 적용 응답 3,570ms → 2,266ms (-36.5%) — 로컬에서 -9%였던 변경이 원격 DB에서는 -75.6%",
        "대형 임포트 504 해소 — 결과 URL 검증 133초 → 20초, 저장 INSERT 약 2,700문 → 2문",
        "쿼터·결제 권한을 락과 CAS로 직렬화해 경합 시 초과 발급 0건"
      ],
      description: "크리에이터가 프로필 페이지에 블록을 쌓아 공개하고, 쿠팡파트너스 수익 링크를 붙여 수익화하는 서비스입니다. Rails 8.1 애플리케이션 하나에 머천트 어드민, 플랫폼 슈퍼어드민, 공개 프로필 렌더링이 함께 들어 있습니다. 제가 맡은 부분은 실사용에서 드러난 병목과 동시성 결함을 고치는 일이었고, 값을 먼저 재고 구간을 쪼개 비중이 큰 곳부터 손대고 고친 뒤 다시 재는 순서를 지켰습니다. 아래 수치는 전부 실측이며, 측정하지 못한 것은 측정하지 못했다고 적었습니다.",
      role: "Backend",
      techStack: [
        "Ruby", "Ruby on Rails 8.1", "JavaScript", "Hotwire (Turbo · Stimulus)", "Node.js 22",
        "AWS Lambda (CDK)", "SQS", "PostgreSQL (Neon)", "Solid Queue", "Solid Cache",
        "Cloudflare R2", "Tailwind CSS", "Kamal", "Sentry"
      ],
      features: [],
      troubleshooting: [
        {
          title: "템플릿을 고르면 3.5초 동안 화면이 멈춰 있었다",
          problem: "블록 추가 모달에서 템플릿을 고르면 페이지 구성이 한 번에 갈아끼워지는데, 그동안 화면이 멈춘 것처럼 보였습니다.",
          cause: "먼저 렌더가 느린지 응답이 느린지 갈랐더니 응답 자체가 늦었고, 구간을 쪼개니 원인이 둘이었습니다. 기존 블록을 지우는 쿼리가 블록 수에 정비례했고, 새 블록도 한 건씩 저장해 원격 DB로 쓰기 왕복이 그만큼 나갔습니다. 로컬 DB는 쓰기가 싸서 이 비용이 전혀 드러나지 않았습니다.",
          solution: "삭제는 연관을 한 번에 정리해 쿼리를 블록 수와 무관한 상수로 고정했고, 저장은 검증을 메모리에서 그대로 돌리면서 INSERT만 묶었습니다. 화면 폭에 따라 한쪽만 보이는 미리보기를 매번 두 벌 렌더하던 것도 한 벌로 줄였습니다. 일괄 삭제로 바꾸면 첨부 파일 정리 시점이 커밋 전으로 당겨져 실패가 조용히 삼켜진다는 함정이 있어, 커밋 이후로 걸고 되돌리면 실패하는 회귀 테스트를 붙였습니다.",
          results: [
            { label: "응답 전체 (개발 서버)", before: "3,570ms", after: "2,266ms", delta: "-36.5%" },
            { label: "└ 템플릿 적용 구간", before: "1,800ms", after: "440ms", delta: "-75.6%" },
            { label: "블록 삭제 쿼리 (49블록)", before: "395쿼리", after: "9쿼리 고정", delta: "-97.7%" },
            { label: "서버 왕복", before: "4회", after: "1회", delta: "-75.0%" },
            { label: "미리보기 중복 렌더 제거 후 응답", before: "2,266ms", after: "약 1,800ms (기대)", note: "미검증 — 렌더 2회→1회는 코드상 확정이나 배포 후 재측정 안 함" }
          ]
        },
        {
          title: "다른 서비스에서 페이지를 가져오면 504로 죽었다",
          problem: "페이지를 통째로 옮겨오는 이사오기 기능이 실사용 페이지 두 곳에서 실패했습니다. 링크가 많은 페이지일수록 확실히 실패했습니다.",
          cause: "원인이 한 겹이 아니라 네 겹이었습니다. 파서는 그룹당 24개 상한을 넘으면 예외를 던졌고, 스크레이퍼는 아이템이 많아 추출 워치독 10초를 넘겼고, 수신부는 결과 URL마다 DNS를 검증했고, 저장은 블록을 한 건씩 넣어 한 트랜잭션에 INSERT 수천 개를 순차로 돌렸습니다.",
          solution: "가장 중요한 판단은 상한 초과를 실패가 아니라 절단으로 바꾼 것입니다. 1,300개 중 24개만 들어오거나 아예 실패하는 것보다, 상한까지 가져오고 나머지를 잘라내는 편이 사용자에게 낫습니다. DNS는 호스트당 한 번만 조회하도록 캐시하고, 저장은 집합 기반 두 문장으로 바꾸고, 타임아웃은 프록시부터 함수까지 바깥이 항상 더 길도록 정렬했습니다.",
          results: [
            { label: "결과 URL 검증 (1,368 아이템)", before: "133초", after: "20초", delta: "-85.0%" },
            { label: "저장 INSERT", before: "약 2,700문", after: "2문", delta: "-99.9%" },
            { label: "DNS 조회 (URL 2,736개 / 호스트 11개)", before: "2,736회", after: "11회", delta: "-99.6%" },
            { label: "대형 페이지 링크 수집", before: "105개 (8.1%)", after: "1,292개 전량", delta: "12.3배" }
          ]
        },
        {
          title: "이미지를 옮길 때마다 페이지 갱신이 폭주했다",
          problem: "외부 이미지를 자체 스토리지로 옮기는 동안 DB 쓰기가 튀고, 이미지 작업이 일반 작업까지 밀어냈습니다.",
          cause: "이미지가 하나 붙을 때마다 상위 레코드 touch 연쇄가 일어나, 페이지 UPDATE가 이미지 장수만큼 나갔습니다. 워커도 일반 작업과 공용 스레드를 쓰고 있었습니다.",
          solution: "touch를 지우는 대신 디바운스 창당 한 번으로 묶었습니다. 그냥 지우면 공개 페이지 캐시가 무효화되지 않아 낡은 화면이 남기 때문입니다. 왜 지우면 안 되는지와 디바운스가 임시 조치라는 사실은 문서로 남겼고, 이미지 워커는 전용 스레드로 분리했습니다.",
          results: [
            { label: "이미지 1,500장 첨부 시 페이지 UPDATE", before: "최대 1,500회", after: "1회 (디바운스 창당)", delta: "-99.9%" },
            { label: "이미지 워커 동시성", before: "공용 3스레드", after: "전용 20스레드", delta: "6.7배" }
          ]
        },
        {
          title: "동시 요청 두 건이 같은 쿼터를 함께 통과했다",
          problem: "무료 플랜의 페이지·계정 상한이 경합 상황에서 초과 발급될 수 있었고, 결제 실패 콜백이 이미 완료된 주문 상태를 덮어쓸 수 있었습니다.",
          cause: "카운트를 읽고 검사한 뒤 쓰는 사이에 다른 요청이 끼어들 수 있었습니다. 결제 쪽도 만료 시각 계산과 연장이 직렬화돼 있지 않아 같은 주문이 두 번 연장될 여지가 있었습니다.",
          solution: "쿼터는 검사 대신 슬롯 예약으로 바꿔 경합해도 하나만 잡히게 했고, 권한 연장은 머천트 행 잠금으로 직렬화하고 멱등 가드를 뒀습니다. 실패 전이는 대기 상태를 확인한 뒤에만 교체하도록 해 완료 상태를 덮어쓰지 못하게 했습니다. 락 획득 순서와 쿼터가 환불되지 않는 이유는 주석과 PR에 남겼습니다.",
          results: [
            { label: "무료 쿼터 동시 요청 2건", before: "초과 발급 가능", after: "슬롯 예약 1건 (초과 0건)" },
            { label: "동시 유료 주문 권한 연장", before: "중복 연장 가능", after: "주문당 정확히 1회" },
            { label: "실패 콜백의 완료 상태 덮어쓰기", before: "가능", after: "0건" },
            { label: "재정렬 SQL Brakeman High 경고", before: "2건", after: "0건", delta: "-100%" }
          ]
        },
        {
          title: "배포 전이라 성능 전후를 잴 방법이 없었다",
          problem: "디자인 탭이 느리다는 것은 알았지만 아직 배포 전이라, 실서버에서 개선 전후를 비교할 수 없었습니다.",
          cause: "실서버는 원격 DB라 쿼리당 90ms가 드는데 로컬은 그 비용이 없습니다. 로컬 측정만으로는 무엇이 병목인지 판단할 수 없고, 곱셈으로 추정하면 개선율을 부풀리게 됩니다.",
          solution: "실서버에서 잰 90ms를 로컬 어댑터에 주입하고 stash로 전후를 같은 조건에서 쟀습니다. 그렇게 찾은 것이 셋이었습니다. 전용 레이아웃이라 그리지도 않는 사이드바를 매 요청 조회하고 있었고, 미리보기를 두 번째 요청으로 따로 받고 있었고, 클라이언트가 이미 반영하는 배경색에 서버 재렌더가 붙어 있었습니다. 같은 방식으로 관리자 프로필도 쿼리 상한을 테스트에 박아 고정했습니다.",
          results: [
            { label: "디자인 탭 열기 (지연 주입)", before: "2,026ms", after: "1,026ms", delta: "-49.3%" },
            { label: "배경색 저장 (지연 주입)", before: "1,025ms", after: "215ms", delta: "-79.0%" },
            { label: "관리자 프로필 조회 쿼리", before: "46쿼리", after: "12쿼리 (상한 고정)", delta: "-73.9%" },
            { label: "디자인 탭 열기 (실서버)", before: "2,447ms", after: "약 1,200ms (기대)", note: "미검증 — 지연 주입 실측이며 실서버 재측정은 하지 않음" }
          ]
        },
        {
          title: "개선했다고 보고한 것이 실은 개선이 아니었다",
          problem: "같은 요청 안에서 페이지를 두 번 조회하는 것을 발견해 재사용하도록 고치고, 저장 경로의 왕복도 줄었다고 정리했습니다.",
          cause: "지연 주입으로 실측했더니 저장 동작의 왕복 수가 전후 모두 같았습니다. 같은 요청 안의 중복 조회는 Rails 쿼리 캐시가 이미 잡고 있어 애초에 DB로 나가지 않았던 것입니다. 알림 이벤트로 세면 캐시 히트까지 포함돼 14건, 실제 왕복만 세면 12건으로 보입니다.",
          solution: "이득이 없는데 분기만 늘어나므로 해당 변경을 되돌리고 보고를 정정했습니다. 무엇을 세고 있는지 모르면 개선율을 부풀리게 된다는 것을 이 건에서 확인했고, 이후로는 실제 DB 왕복만 세도록 기준을 고정했습니다.",
          results: []
        },
        {
          title: "연동은 초록불인데 기능은 죽어 있었다",
          problem: "쿠팡파트너스 키 복호화가 실패해도 연동 카드는 초록색 연동 중으로 보였습니다. 사용자는 정상이라고 믿는데 딥링크 변환은 되지 않는, 기능이 죽은 것보다 나쁜 상태입니다.",
          cause: "예외를 삼키고 있었고, 상태가 연결과 미연결 두 가지뿐이라 실패를 표현할 자리가 없었습니다. 같은 성격으로 Turbo 스냅샷이 결제 모달의 입력값과 버튼 상태까지 복제해, 뒤로 갔다 돌아오면 카드번호가 되살아나거나 버튼이 처리 중인 채로 굳었습니다.",
          solution: "연동 상태를 연결됨과 확인 필요로 나눠 실패를 경고색으로 드러냈습니다. 색만으로 구분하면 색각 이상이나 흑백 환경에서 전달되지 않으므로 아이콘과 문구로도 구분했고, 삼키던 예외는 로그와 Sentry로 보고하게 했습니다. 결제 모달은 캐시 직전에 입력값과 로딩 상태를 정리하되 스코프를 결제 다이얼로그로 좁혀 편집 모달은 건드리지 않았습니다.",
          results: [
            { label: "결제 모달 캐시 정리 (입력값 · 버튼 상태)", before: "—", after: "코드상 처리 완료", note: "미검증 — 브라우저 실물 확인 미완" }
          ]
        }
      ] as Troubleshooting[],
      links: { site: "tempick.biz" },
      image: "/images/project-tempick.png"
    },
    {
      id: "dongyang-forest",
      hasDetail: true,
      category: "대학 프로젝트",
      title: "동양미래대 숲",
      subtitle: "동양미래대학교 통합 정보 및 커뮤니티 앱",
      period: "2025.03 - 2025.12",
      status: { label: "운영 중", tone: "success" as const },
      summary: "교내 정보·커뮤니티·실시간 채팅을 담아 스토어에 출시·운영 중인 통합 앱의 백엔드·인프라.",
      highlights: [
        "RDBMS LIKE 한계 → Elasticsearch + nori, Logstash 3분 주기 동기화로 검색 전환",
        "WebSocket 끊김 대비 Redis 버퍼 + 재전송으로 메시지 유실 방지",
        "GitHub Actions + Nginx Blue-Green 무중단 배포 (다운타임 0초)"
      ],
      description: "동양미래대학교 학생들의 교내 생활 편리성 증진을 목적으로 개발된 통합 커뮤니티 및 정보 제공 애플리케이션입니다. 학과 정보, 공지사항 필터링, 실시간 학식, 시간표 자동 등록, 스터디룸 예약, 중고 거래, 실시간 채팅 등 다양한 기능을 제공합니다.",
      role: "Backend & DevOps",
      techStack: [
        "Spring Boot 3.x", "Java 17", "Elasticsearch", "Redis", "PostgreSQL",
        "QueryDSL", "Docker", "GitHub Actions", "Oracle Cloud", "FastAPI"
      ],
      features: [
        {
          title: "검색 엔진 도입 및 성능 최적화",
          description: "RDBMS의 LIKE 검색 한계를 극복하기 위해 Elasticsearch를 도입하여 검색 속도를 획기적으로 단축했습니다. Logstash를 통해 DB 변경 사항을 3분 주기로 동기화하고, nori 형태소 분석기를 적용하여 정확도 높은 검색 결과를 제공했습니다."
        },
        {
          title: "실시간 채팅 시스템 및 안정성 확보",
          description: "WebSocket 연결 끊김 시 메시지 유실을 방지하기 위해 Redis List를 활용한 임시 저장 버퍼와 자동 재전송 로직을 구현했습니다. Redis로 세션을 중앙 관리하고 외부 메시지 브로커를 연동하여 서버 부하를 분산시켰습니다."
        },
        {
          title: "복잡한 비즈니스 로직 처리 (QueryDSL)",
          description: "동적 쿼리가 많은 검색 기능을 위해 QueryDSL을 도입하여 Type-Safe한 쿼리를 작성하고, BooleanBuilder를 활용해 조건을 모듈화하여 코드 재사용성과 가독성을 높였습니다."
        },
        {
          title: "인프라 구축 및 배포 자동화 (CI/CD)",
          description: "GitHub Actions를 활용해 테스트-빌드-배포 전 과정을 자동화하고, Nginx를 이용한 Blue-Green 무중단 배포 전략을 적용하여 다운타임 0초를 달성했습니다. Discord WebHook으로 실시간 서버 로그 및 에러 알림 시스템을 구축했습니다."
        },
        {
          title: "신고 기능 및 커뮤니티 관리 시스템",
          description: "다양한 콘텐츠(게시글, 댓글, 채팅)를 유연하게 신고할 수 있도록 DB를 설계하고, 트랜잭션을 보장하여 신고 처리를 원자적으로 구현했습니다. 누적 신고 횟수에 따른 자동 블라인드 처리 로직을 적용했습니다."
        }
      ],
      links: {
        github: "github.com/dongsooop/backend",
        android: "play.google.com/store/apps/details?id=com.dongsoop.site.dongsoop&pcampaignid=web_share",
        ios: "apps.apple.com/kr/app/동숲/id6748893131"
      },
      image: "/images/project-dongyang.png"
    },
    {
      id: "danum",
      hasDetail: true,
      category: "졸업작품 (NOMAD)",
      title: "Danum (다눔)",
      subtitle: "AI와 이웃이 함께하는 실시간 Q&A 지식 커뮤니티 플랫폼",
      period: "2024.03 - 2024.11",
      summary: "지역 기반 Q&A에 ChatGPT 즉시 답변을 결합한 커뮤니티 플랫폼의 Backend Lead.",
      highlights: [
        "커스텀 프롬프트로 질문 등록 즉시 AI 답변 제공 (대기 시간 제거)",
        "WebSocket/STOMP + Redis 중앙 세션으로 다중 서버 실시간 채팅",
        "GitHub Actions Blue-Green 파이프라인 + Swagger·Discord 알림 자동화"
      ],
      description: "동양미래대학교 컴퓨터 소프트웨어학과 2024년 졸업작품(NOMAD). 기존 Q&A 플랫폼의 느린 응답 시간과 낮은 신뢰도 문제를 해결하기 위해 지역 기반 Q&A와 AI 기반 즉시 답변 시스템을 구현한 플랫폼입니다. 사용자는 자신의 동네에서 이웃들과 실시간으로 소통하며 신뢰도 높은 지역 정보를 빠르게 획득할 수 있습니다.",
      role: "Backend Lead (인프라 구축, 채팅 개발, Rest API 개발)",
      techStack: [
        "Spring Boot", "Java", "PostgreSQL", "Redis", "WebSocket", "STOMP",
        "ChatGPT API", "Docker", "GitHub Actions", "AWS", "Swagger", "Spring AI"
      ],
      features: [
        {
          title: "생성형 AI 기반 답변 프롬프트 시스템",
          description: "사용자가 질문을 등록하면 커스텀 프롬프트를 통해 ChatGPT가 즉시 답변을 제공합니다. 기존 지식인 서비스의 답변 대기 시간을 획기적으로 단축하여 질문자의 불편함을 해소하고 즉각적인 피드백을 제공합니다."
        },
        {
          title: "실시간 채팅 시스템 및 메시지 안정성 확보",
          description: "WebSocket/STOMP를 활용한 양방향 통신으로 1:1 채팅 시 딜레이 없는 메시지 주고받기를 구현했습니다. Redis와 메시지 큐를 도입하여 네트워크 불안정 시에도 메시지 유실을 방지하고, Redis를 중앙 세션 저장소로 활용해 다중 서버 환경에서 사용자의 접속 상태를 정확히 관리합니다."
        },
        {
          title: "위치 정보 기반 맞춤형 Q&A 시스템",
          description: "카카오 지도 등 지오로케이션 API를 통해 사용자의 현재 동네를 설정하고, 해당 지역 이웃들과만 Q&A가 이뤄지도록 구현했습니다. 이를 통해 신뢰도 높은 지역 특화 정보(동네 소식, 맛집 후기 등)를 빠르게 획득할 수 있습니다."
        },
        {
          title: "CI/CD 파이프라인 및 배포 자동화",
          description: "GitHub Actions를 활용해 테스트-빌드-배포 전 과정을 자동화하고, 블루-그린 배포 전략을 적용해 무중단 배포 환경을 구축했습니다. Swagger와 Discord Webhook을 연동하여 API 명세 변경 시 팀원들에게 자동으로 알림이 가도록 구현했습니다."
        },
        {
          title: "지역 기반 사용자 매칭 및 마을 게시판",
          description: "당근마켓의 개념을 차용하여 마을 게시판 기능을 개발하고, 같은 지역 내 사용자들이 물리적 문제를 해결할 수 있도록 돕는 사용자-사용자 매칭 시스템을 구현했습니다."
        }
      ],
      links: {
        github: "github.com/KJLBK/danum-backend",
        demo: ""
      },
      image: "/images/project-danum.png"
    },
    {
      id: "linkinbio-commerce",
      hasDetail: false,
      category: "회사 프로젝트 · 앤유코퍼레이션",
      title: "링크 인 바이오 커머스 (myblocks)",
      subtitle: "이벤트 드리븐 서버리스 커머스",
      period: "2026.03 -",
      status: { label: "In Progress", tone: "accent" as const },
      summary: "앤유코퍼레이션에서 개발 중인 링크 인 바이오 커머스 myblocks.kr — Next.js 모노레포 + AWS 서버리스.",
      highlights: [
        "주문/결제 흐름을 Step Functions Saga 패턴으로 설계",
        "DynamoDB → EventBridge → OpenSearch 검색 파이프라인"
      ],
      description: "",
      role: "Backend",
      techStack: ["Next.js", "TypeScript", "Lambda", "Step Functions", "DynamoDB", "OpenSearch"],
      features: [],
      links: { site: "myblocks.kr" },
      image: ""
    }
  ]
};

export type Project = (typeof portfolioData.projects)[number];
