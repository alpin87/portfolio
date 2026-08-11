type ImprovementRow = { label: string; before: string; after: string; delta?: string; note?: string };
type ImprovementGroup = { group: string; rows: ImprovementRow[] };

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
      features: [
        {
          title: "확장 오리진에서는 쿠키를 쓸 수 없다 — 그래서 토큰",
          description: "확장은 chrome-extension:// 오리진에서 돌기 때문에 쿠팡 상품 페이지에서 서비스 도메인으로 가는 요청이 크로스 사이트가 됩니다. 세션 쿠키는 SameSite=Lax라 이 요청에 실리지 않고, credentials: 'include'를 붙여도 브라우저가 애초에 보내지 않습니다. 그래서 쿠키를 포기하고 머천트별 토큰을 Authorization 헤더에 실었습니다. 확장이 보낸 값으로 즉시 조회해야 해서 deterministic 암호화로 저장했습니다. 이 선택의 대가는 명확합니다. 토큰은 만료가 없고 브라우저 저장소에 남습니다. 그래서 매 요청마다 계정 상태를 다시 확인합니다. 세션 인증은 사용자 활성 여부만 보는데 여기만 지나치면 계정을 정지시켜도 예전 토큰으로 계속 쓰기가 되므로, 머천트 상태와 사용자 상태를 둘 다 확인하고 하나라도 아니면 거절하도록(fail closed) 했습니다."
        },
        {
          title: "계정 연결 방식을 세 번 다시 만들었다",
          description: "같은 기능을 세 세대에 걸쳐 다시 만들었고, 각 단계가 앞 단계의 구체적인 결함에서 나왔습니다. 1세대는 어드민에서 발급한 연동 토큰을 사용자가 복사해 확장에 붙여넣는 방식이었습니다. 가장 단순하고 가장 나빴습니다. 어드민 이동, 발급, 복사, 확장 열기, 붙여넣기, 저장으로 여섯 단계인 데다 그 사이 토큰이 클립보드와 화면을 거칩니다. 2세대는 chrome.identity.launchWebAuthFlow로 승인 화면을 별도 창에 띄워, 사용자가 평소처럼 로그인하고 연결하기만 누르면 토큰이 콜백으로 확장에 직접 전달되도록 했습니다. 여섯 단계가 버튼 한 번이 됐습니다. 여기서는 확장 쪽 표준을 따르는 것이 중요했는데, getAuthToken은 구글 계정 전용이라 쓸 수 없고 서드파티 OAuth 자리가 launchWebAuthFlow이며 콜백 주소는 chrome.identity.getRedirectURL()이 주는 chromiumapp.org 주소로 고정된다는 점을 확인하고 그대로 맞췄습니다. 3세대는 2세대의 결함이 외부 코드 리뷰에서 잡혀 나온 것으로, 다음 항목이 그 이야기입니다."
        },
        {
          title: "프래그먼트는 안전하다는 내 반박이 틀렸다 — 로그에 남은 토큰 95건",
          description: "리뷰 지적은 콜백 URL에 장기 유효 토큰을 싣고 있다는 것이었고, 저는 프래그먼트(#)는 브라우저가 서버로 보내지 않으니 안전하다고 반박했습니다. 그 반박은 틀렸습니다. 브라우저가 보내지 않는 것과, 우리가 만들어 내보내는 Location 헤더가 로그에 남는 것은 다른 문제입니다. Rails는 리다이렉트 대상을 INFO로 기록하고 config.filter_redirect는 기본값이 비어 있습니다. 개발 로그를 실제로 세어 보니 토큰이 그대로 실린 리다이렉트 기록이 95건 남아 있었습니다. 추측이 아니라 로그에 찍힌 실물이었습니다. 고친 방식은 OAuth 인가 코드와 같습니다. 콜백에는 60초짜리 일회용 코드만 싣고 확장이 별도 요청으로 토큰과 바꿔 가도록 했습니다. 코드는 32바이트 난수에 TTL 60초로 캐시에 두고, 교환할 때 읽는 즉시 삭제해 같은 코드로 두 번 받아갈 수 없게 했습니다. 교환 엔드포인트는 코드 자체가 인증이라 쿠키 인증이 없고 CSRF 표면이 없으며, 무작위 대입은 IP 기준 분당 10회로 제한했습니다. config.filter_redirect에 콜백 호스트를 넣어 리다이렉트 로그 자체도 가렸습니다. 배포 환경별 함정도 하나 겪었는데, 이 코드가 사는 캐시는 테스트 환경 기본값이 null_store라 쓰자마자 사라져 CI가 깨졌습니다. 해당 테스트에서만 실제로 저장되는 스토어를 끼워 해결하고 환경별 캐시 기본값 차이를 주석으로 남겼습니다. 배운 것은 기술보다 태도 쪽입니다. 이론상 안전하다고 반박하기 전에 로그를 먼저 열었어야 했습니다."
        },
        {
          title: "승인 콜백을 신뢰하지 않는다",
          description: "redirect_uri는 확장이 보내오는 값이라 그대로 믿으면 토큰이 남의 주소로 나갑니다. 그래서 승인 화면을 열기 전에 검사하고, 통과하지 못하면 화면 자체를 렌더하지 않습니다. 호스트를 문자열 포함으로 비교하지 않고 확장 ID를 정확히 떼어내 허용 목록과 맞췄습니다. 아무 주소, 다른 확장 ID, 접두사 붙이기, 접미사 붙이기, 평문 다운그레이드, javascript: 스킴, 빈 문자열까지 우회 시도 일곱 가지를 테스트로 고정했고 전부 400이며 토큰은 발급되지 않습니다. 이 검사 때문에 실제로 겪은 일도 있습니다. 압축을 풀어 로드한 개발용 사본은 크롬이 폴더 경로에서 ID를 만들기 때문에 스토어 ID와 달라 서버가 거절했고, 크롬은 그것을 Authorization page could not be loaded로 보여줬습니다. 크롬 프로필의 확장 설정에서 실제 ID를 확인해 원인을 특정했는데, 방어가 의도대로 동작한다는 증거이기도 했습니다."
        },
        {
          title: "콘텐츠 스크립트는 신뢰 경계 밖이다",
          description: "확장에서 가장 중요한 경계입니다. 콘텐츠 스크립트는 쿠팡 페이지 안에서 돌고 그 페이지는 DOM을 마음대로 바꿀 수 있으므로, 콘텐츠 스크립트가 보낸 값은 제가 짠 코드에서 왔더라도 사용자 입력과 같은 급으로 다뤄야 합니다. 실제 방어선은 백그라운드 워커에 뒀습니다. URL 문자열 전체에 경로 정규식을 걸면 남의 도메인이나 쿼리스트링에 든 같은 문자열도 통과하므로 호스트를 정확히 비교하고, 상품 경로에 숫자 경계를 둬 상품이 아닌 경로를 막고, 목록 카드의 상대 경로는 페이지 주소를 기준으로 절대화하고, javascript:로 시작하는 이미지 값은 버리고, 제목은 200자로 자릅니다. 이 규칙들은 jsdom 하니스로 검증했습니다. 정상 상품, 남의 도메인, 상품 아닌 경로, 상대 경로, 위험한 이미지 스킴, 초장문 제목, 중복 담기, 서버 401, 토큰 없음까지 아홉 가지 경계 케이스의 반환값을 고정해두고 브라우저를 띄우지 않은 채 초 단위로 돌립니다."
        },
        {
          title: "통제할 수 없는 DOM 위에 UI를 얹기",
          description: "쿠팡 DOM은 저희가 통제하지 못하고 클래스명은 빌드마다 바뀔 수 있어서, 선택자에 기대지 않는 방식을 찾는 데 손이 가장 많이 갔습니다. 장바구니담기 버튼을 a와 button 태그에서 찾았을 때 하나도 걸리지 않았는데, 쿠팡이 그 자리를 div로 그리고 있었습니다. TreeWalker로 텍스트 노드를 훑어 문구로 찾는 방식으로 바꿔 해결했습니다. 목록 카드는 상품 링크에서 출발해 그 상품만 담고 있는 동안 조상으로 올라가며 카드 경계를 잡아 클래스명이 바뀌어도 버티게 했습니다. 패널 배치는 처음에 가장 큰 이미지를 기준으로 삼았다가 본문 설명 이미지가 잡혀 패널이 top 19468px에 붙는 일이 있었습니다. 구매 버튼 행보다 위, 가로세로비 0.5에서 2 사이, og:image와 일치 같은 조건을 겹쳐 후보를 좁혔고, 최종적으로는 사진 열을 직접 지정해 그 아래 남는 여백에 흐름 밖으로 얹었습니다. 흐름 안에 넣으면 상품 사진이 아래로 밀려나기 때문입니다. 폭을 지정해도 먹지 않아 확인해보니 확장 CSS 쪽에 !important가 있었고, setProperty로 우선순위를 맞춰 해결했습니다."
        },
        {
          title: "되지 않을 상태를 먼저 막는다",
          description: "확장이 붙는다고 다 되는 것이 아니라, 되지 않을 상태를 미리 막는 쪽이 실제로는 더 중요했습니다. 쿠팡파트너스 API 키가 없으면 연결 자체를 거절합니다. 키 없이 토큰만 있으면 연결은 됐는데 담기가 실패한다는 가장 나쁜 상태가 되기 때문입니다. 담을 페이지를 필수로 받아 계정에 페이지가 여럿일 때 엉뚱한 곳에 쌓이지 않게 했고, 변환에 실패한 상품이 있으면 무엇이 실패했는지 이름으로 알려줍니다. 일부 실패라고만 보여주면 사용자가 어느 상품을 다시 담아야 할지 알 수 없습니다. 담은 결과를 확인하러 어드민을 열게 하면 화면을 떠나지 않는다는 목표가 무너지므로 사이드패널 안에 공개 페이지를 모달로 띄웠는데, 공개 페이지는 기본값이 X-Frame-Options SAMEORIGIN이라 확장 안에서 뜨지 않습니다. 전부 여는 대신 공개 페이지에 한해서만 이 헤더를 걷고 CSP frame-ancestors에 self와 확장 ID만 넣었으며 어드민은 그대로 뒀습니다. 확장 ID는 상수 하나로 모아 콜백 검증과 프레이밍 정책이 같은 값을 보게 했습니다."
        },
        {
          title: "검증하지 못한 것과 스토어 제출",
          description: "검증한 항목은 위 표에 정리했습니다. 여기서는 검증하지 못한 것을 적습니다. 확장 UI 전체를 도는 e2e 자동화는 없습니다. 쿠팡 DOM이 바뀌면 버튼 주입이 조용히 실패할 수 있고, 이건 테스트가 아니라 사용자 제보로 알게 되는 종류입니다. 스토어에는 권한을 storage, scripting, sidePanel, identity와 호스트 세 개만 넣어 제출했습니다. 탭 URL·제목·파비콘은 호스트 권한만으로 읽을 수 있어 tabs 권한은 넣지 않았습니다. 심사는 확장이 선언한 데이터 처리와 개인정보처리방침을 대조하므로 방침에 무엇을 수집하고 무엇을 수집하지 않는지를 실제 동작에 맞춰 적었고, 검색에 노출되지 않는 미등록으로 배포해 어드민 연동 화면의 설치 링크를 유일한 설치 경로로 뒀습니다. 남은 것은 코드 교환의 동시 요청 방어와, 확장 ID를 key로 고정해 개발용 사본도 같은 ID로 로드되게 하는 일입니다."
        }
      ],
      improvements: [
        {
          group: "동선",
          rows: [
            { label: "쿠팡 상품을 내 페이지에 담기", before: "화면 이동 · 복사 · 붙여넣기 6단계", after: "버튼 1회" },
            { label: "계정 연결 (3세대 재설계)", before: "토큰 수동 복사 6단계", after: "로그인 승인 1회 + 일회용 코드 교환" }
          ]
        },
        {
          group: "보안 · 신뢰 경계",
          rows: [
            { label: "리다이렉트 로그에 남던 장기 토큰", before: "95건", after: "0건", delta: "-100%" },
            { label: "콜백에 실리는 값", before: "만료 없는 장기 토큰", after: "60초 · 1회 소비 코드" },
            { label: "redirect_uri 우회 시도", before: "검증 없음", after: "7종 전부 400" },
            { label: "페이지가 조작한 콘텐츠 스크립트 값", before: "그대로 신뢰", after: "7종 차단 확인" },
            { label: "토큰 요청의 계정 상태 확인", before: "사용자 상태만", after: "머천트 + 사용자 (fail closed)" },
            { label: "코드 교환 무작위 대입", before: "제한 없음", after: "IP 기준 분당 10회" }
          ]
        },
        {
          group: "검증",
          rows: [
            { label: "승인 · 코드 교환 흐름", before: "—", after: "Rails 통합 테스트 (1회 교환 · 재사용 거절 · 우회 7종)" },
            { label: "콘텐츠 · 백그라운드 로직", before: "—", after: "jsdom 하니스 경계 케이스 9개" },
            { label: "정적 분석", before: "—", after: "RuboCop 위반 0 · Brakeman 경고 0" },
            { label: "쿠팡 화면 배치", before: "—", after: "실제 브라우저 육안 확인" }
          ]
        },
        {
          group: "측정하지 못한 것",
          rows: [
            { label: "확장 UI 전체 e2e 자동화", before: "—", after: "없음", note: "미검증 · 쿠팡 DOM이 바뀌면 버튼 주입이 조용히 실패할 수 있음" }
          ]
        }
      ] as ImprovementGroup[],
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
      features: [
        {
          title: "템플릿 적용 지연 — 병목은 고칠 때마다 옮겨 다닌다",
          description: "블록 추가 모달에서 템플릿을 고르면 페이지 구성이 한 번에 갈아끼워지는 기능입니다. 느리다는 체감을 바로 고치지 않고, 먼저 렌더가 느린지 응답이 느린지 가른 다음 응답을 구간별로 쪼개 비중이 큰 곳부터 손댔습니다. 첫 번째는 삭제 비용이 기존 블록 수에 정비례한다는 것이었습니다. dependent 선언에서 연관을 끌어와 첨부만 따로 정리하고 나머지를 한 번에 지우도록 바꿔, 블록 수에 비례하던 삭제 쿼리를 상수로 고정했습니다. 이때 일괄 삭제로 바꾸면 Active Storage의 purge 시점이 커밋 전으로 당겨져 아직 남아 있는 첨부 행 때문에 외래키에 막히고, 그 예외를 purge가 삼켜 스토리지 객체만 고아로 남는다는 함정을 조사해 커밋 이후로 걸었고, 고치기 전 코드로 되돌리면 실패하는 회귀 테스트를 붙였습니다. 두 번째가 이 작업에서 가장 중요한 대목입니다. 로컬에서 순식간에 끝나던 구간이 개발 서버에서는 몇 초씩 걸렸습니다. 템플릿 블록을 한 건씩 저장하느라 쓰기 왕복이 여러 번 나갔는데, 로컬 DB는 쓰기가 싸서 드러나지 않던 비용이었습니다. 검증은 메모리에서 그대로 돌리고 INSERT만 묶었더니 로컬 측정은 사실상 변하지 않았지만 원격 DB에서는 크게 줄었습니다. 그래서 PR에 로컬 수치로는 판단할 수 없으니 배포 후 다시 재야 한다고 명시했고, 실제로 재측정해 확인했습니다. 세 번째는 화면 폭에 따라 한쪽만 보이는 미리보기 프레임 두 개를 매 응답마다 완성본으로 렌더하던 것이었습니다. 팝업용은 빈 지연 로딩 프레임으로 되돌려 응답당 공개 페이지 전체 렌더를 한 번으로 줄였습니다. 최적화 한 번에 병목이 옮겨 다니므로 다음 대상은 짐작하지 않고 다시 재서 정했습니다."
        },
        {
          title: "대형 링크 임포트 504 — 원인이 한 겹이 아니었다",
          description: "다른 서비스의 페이지를 통째로 가져오는 이사오기 기능이 실사용 페이지 두 곳에서 실패했고, 원인이 네 겹이었습니다. 파서는 컬렉션 하나에 링크가 1,204개인데 그룹당 24개를 넘으면 예외를 던졌고, Lambda 스크레이퍼는 아이템 1,368개에서 추출 워치독 10초를 넘겼고, Rails 수신부는 결과 URL마다 DNS를 검증하느라 2,736회에 133초를 썼고, 저장은 블록 건별 저장으로 한 트랜잭션에 순차 INSERT를 약 2,700회 돌려 프록시 120초를 넘겼습니다. 핵심 판단은 상한 초과를 실패가 아니라 절단으로 정책을 바꾼 것입니다. 1,300개 중 24개만 들어오거나 아예 실패하는 것보다, 상한까지 가져오고 나머지를 잘라내는 편이 사용자 관점에서 낫습니다. DNS는 호스트당 1회만 조회하도록 캐시했고, 저장은 건별 저장 대신 집합 기반 두 문장으로 바꿨습니다. 타임아웃도 프록시부터 Lambda 함수까지 바깥이 항상 더 길도록 체인을 정렬했습니다. DNS 캐시가 rebinding 방어를 건드릴 수 있다는 점은 따로 보완했습니다."
        },
        {
          title: "이미지 재호스팅 — 캐시 무효화 폭주 억제",
          description: "외부 이미지를 자체 스토리지로 옮기는 파이프라인에서, 이미지가 붙을 때마다 상위 레코드 touch 연쇄가 일어나 페이지 UPDATE가 이미지 장수만큼 나갔습니다. 디바운스 창당 한 번으로 묶었습니다. 다만 touch 연쇄를 그냥 지우면 공개 페이지 캐시가 무효화되지 않아 낡은 화면이 남으므로, 왜 지우면 안 되는지와 디바운스가 임시 조치라는 사실을 문서로 남겼습니다. 이미지 워커는 공용 3스레드를 쓰다가 일반 작업을 밀어내서 전용 20스레드로 분리하고 일반 워커는 3스레드로 유지했습니다."
        },
        {
          title: "쿼터와 결제 권한을 직렬화",
          description: "무료 플랜의 페이지 1개, 인스타 계정 1개 같은 상한은 동시 요청 두 건이 같은 시점에 카운트를 읽으면 둘 다 통과합니다. 슬롯 예약 방식으로 바꿔 경합 시 예약이 1건만 잡히도록 했습니다. 결제 권한 연장은 머천트 행 잠금으로 만료 시각 계산과 연장을 직렬화하고 멱등 가드를 뒀으며, 실패 전이는 대기 상태를 확인한 뒤 교체하는 방식으로 처리해 실패 콜백이 결제 완료 상태를 덮어쓰지 못하게 했습니다. 동시 유료 주문에서 권한 연장은 주문당 정확히 1회, 실패 콜백의 덮어쓰기는 0건입니다. 재정렬 SQL은 성능을 유지하면서 Brakeman High 경고 2건을 0건으로 없앴습니다. 락 획득 순서와 쿼터가 환불되지 않는 이유는 PR과 주석에 남겼습니다."
        },
        {
          title: "렌더링 쿼리를 예산으로 고정",
          description: "관리자 프로필 조회가 마흔 건 넘는 쿼리를 내고 있었습니다. 12쿼리 상한을 테스트로 박아 고정했습니다. 쿼리를 줄였다는 서술 대신 이 화면은 12쿼리 이하라는 숫자를 회귀 테스트로 고정하는 방식을 썼고, 임포트 저장의 INSERT가 1회인지, 이미지 첨부 시 페이지 UPDATE가 이미지 수에 비례하지 않는지도 같은 방식으로 박았습니다. 공개 페이지는 페이지네이션과 중첩 캐시를 정리했고, 편집기에는 hover 프리로드와 지연 로딩을 넣었습니다. 이 프리로드가 날린 speculative 요청이 템플릿 삭제와 겹쳐 404가 되고 Turbo가 프레임 자리에 에러 화면을 통째로 그리던 문제는, 해당 액션만 본문 없는 응답으로 흘려보내도록 분리해 해결했습니다."
        },
        {
          title: "배포할 수 없는 환경에서 전후를 만드는 법",
          description: "디자인 탭이 느렸는데 배포 전이라 실서버에서 전후를 잴 수 없었습니다. 실서버에서 쿼리당 90ms를 측정한 뒤 그 값을 로컬 어댑터에 주입하고 stash로 전후를 같은 조건에서 쟀습니다. 먼저 렌더가 느린지 응답이 느린지 가르고, 응답이면 무엇 때문인지 구간을 쪼갰습니다. 디자인 화면은 전용 레이아웃이라 사이드바를 그리지 않는데 매 요청 사이드바용 조회 6건이 나가고 있었고, 미리보기를 두 번째 요청으로 받던 구조를 한 번으로 합쳤으며, 클라이언트가 이미 반영하는 배경색에 서버 재렌더가 붙어 있었습니다. 이 세 가지를 걷어내 탭 열기와 배경색 저장을 모두 줄였습니다. 곱셈으로 추정하는 것보다는 낫지만 어디까지나 주입 실측이고 실서버 재측정은 아니라는 것도 함께 적었습니다. 남은 가장 큰 레버는 DB 리전입니다. 쿼리당 90ms는 디자인 탭만이 아니라 어드민 전 화면이 내는 비용이라, DB를 앱과 같은 지역으로 옮기는 쪽이 개별 화면 최적화보다 효과가 큽니다."
        },
        {
          title: "되돌린 개선과 정정한 보고 — 무엇을 세고 있는지 확인한다",
          description: "처음에는 같은 요청 안에서 페이지를 두 번 조회하는 것을 보고 이미 읽은 레코드를 재사용하도록 고친 뒤, 저장 경로의 왕복도 준다고 정리했습니다. 지연 주입 실측에서 저장 동작의 왕복 수가 전후 모두 10으로 같았습니다. 같은 요청 안의 중복 조회는 Rails 쿼리 캐시가 이미 잡고 있어 애초에 DB로 나가지 않았던 것입니다. 이득이 없는데 분기만 늘어나므로 해당 변경을 되돌리고 보고를 정정했습니다. 알림 이벤트로 세면 캐시 히트까지 포함돼 14건, 실제 왕복만 세면 12건으로 보입니다. 어느 쪽을 세고 있는지 모르면 개선율을 부풀리게 됩니다."
        },
        {
          title: "화면은 멀쩡한데 상태가 거짓말하던 결함들",
          description: "쿠팡파트너스 키는 암호화 컬럼에 저장하는데, 복호화에 실패하면 딥링크 변환이 안 되는데도 연동 카드는 초록색 연동 중으로 보이고 예외는 삼켜지고 있었습니다. 사용자는 정상이라고 믿는데 기능은 죽어 있는 상태입니다. 상태를 연결됨과 확인 필요로 나눠 실패를 경고색으로 드러냈고, 색만으로 구분하면 색각 이상이나 흑백 환경에서 전달되지 않으므로 아이콘과 문구로도 구분했으며, 삼키던 예외는 로그와 Sentry로 보고하게 했습니다. Turbo 스냅샷이 HTML 명세의 input cloning steps를 타면서 결제 모달의 카드번호·유효기간·생년월일이 캐시에 남아 뒤로 갔다가 다시 열면 되살아나던 문제, 그리고 비활성 속성과 버튼 문구가 함께 복제돼 처리 중 상태로 굳던 문제도 캐시 직전 정리로 고쳤습니다. 다만 이 두 건은 브라우저 실물 확인을 마치지 못했습니다. 가입 흐름에서는 기존 회원이 랜딩 CTA로 다시 들어와도 인증이 똑같이 성공해 페이지가 하나 더 생기던 문제를, 신규 생성인지 확인하는 조건으로 막고 이 경로가 가입 전용이라는 사실을 주석으로 남겼습니다."
        }
      ],
      improvements: [
        {
          group: "응답 시간",
          rows: [
            { label: "템플릿 적용 응답 (개발 서버)", before: "3,570ms", after: "2,266ms", delta: "-36.5%" },
            { label: "└ 템플릿 적용 구간 (개발 서버)", before: "1,800ms", after: "440ms", delta: "-75.6%" },
            { label: "임포트 결과 URL 검증 (1,368 아이템)", before: "133초", after: "20초", delta: "-85.0%" },
            { label: "디자인 탭 열기 (실서버 지연 주입)", before: "2,026ms", after: "1,026ms", delta: "-49.3%" },
            { label: "디자인 배경색 저장 (실서버 지연 주입)", before: "1,025ms", after: "215ms", delta: "-79.0%" }
          ]
        },
        {
          group: "쿼리 · 왕복 횟수",
          rows: [
            { label: "임포트 저장 INSERT (블록 1,345 + 아이템 1,368)", before: "약 2,700문", after: "2문", delta: "-99.9%" },
            { label: "임포트 DNS 조회 (URL 2,736개 / 호스트 11개)", before: "2,736회", after: "11회", delta: "-99.6%" },
            { label: "이미지 1,500장 첨부 시 페이지 UPDATE", before: "최대 1,500회", after: "1회 (디바운스 창당)", delta: "-99.9%" },
            { label: "블록 삭제 쿼리 (49블록)", before: "395쿼리", after: "9쿼리 고정", delta: "-97.7%" },
            { label: "관리자 프로필 조회 쿼리", before: "46쿼리", after: "12쿼리 (상한 고정)", delta: "-73.9%" },
            { label: "블록 500개 재정렬 UPDATE", before: "500문", after: "1문", delta: "-99.8%" },
            { label: "템플릿 적용 서버 왕복", before: "4회", after: "1회", delta: "-75.0%" }
          ]
        },
        {
          group: "수집률 · 처리량",
          rows: [
            { label: "대형 페이지 링크 수집", before: "105개 (8.1%)", after: "1,292개 전량", delta: "12.3배" },
            { label: "1,300+ 아이템 페이지 임포트", before: "실패 (0 엔트리)", after: "1,345 엔트리 / 20초" },
            { label: "이미지 워커 동시성", before: "공용 3스레드", after: "전용 20스레드", delta: "6.7배" }
          ]
        },
        {
          group: "정합성 · 보안",
          rows: [
            { label: "무료 쿼터 동시 요청 2건", before: "초과 발급 가능", after: "슬롯 예약 1건 (초과 0건)" },
            { label: "동시 유료 주문 권한 연장", before: "중복 연장 가능", after: "주문당 정확히 1회" },
            { label: "실패 콜백의 결제 완료 상태 덮어쓰기", before: "가능", after: "0건 (CAS 차단)" },
            { label: "재정렬 SQL Brakeman High 경고", before: "2건", after: "0건", delta: "-100%" },
            { label: "전체 테스트 스위트", before: "—", after: "0 failures · RuboCop 0 · Brakeman 0" }
          ]
        },
        {
          group: "측정하지 못한 것",
          rows: [
            { label: "미리보기 중복 렌더 제거 후 응답", before: "2,266ms", after: "약 1,800ms (기대)", note: "미검증 · 렌더 2회→1회는 코드상 확정이나 배포 후 재측정 안 함" },
            { label: "디자인 탭 열기 (실서버)", before: "2,447ms", after: "약 1,200ms (기대)", note: "미검증 · 지연 주입 실측이며 실서버 재측정 안 함" },
            { label: "결제 모달 캐시 정리 (입력값 · 버튼 상태)", before: "—", after: "코드상 처리 완료", note: "미검증 · 브라우저 실물 확인 미완" }
          ]
        }
      ] as ImprovementGroup[],
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
