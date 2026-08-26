type ResultRow = { label: string; before?: string; after: string; delta?: string; note?: string };
type Troubleshooting = { title: string; problem: string; cause: string; solution: string; results?: ResultRow[] };

type ArticleSection = {
  heading: string;
  body: string[];
  code?: { caption?: string; content: string };
  after?: string[];
};

export type OpenSourceEntry = {
  id: string;
  hasDetail: boolean;
  repo: string;
  kind: "pr" | "issue";
  ref: string;
  state: string;
  tone: "success" | "accent";
  date: string;
  role: string;
  title: string;
  description: string;
  url: string;
  article?: { lead: string; sections: ArticleSection[] };
  results?: ResultRow[];
};

const openSource: OpenSourceEntry[] = [

    {
      id: "spring-batch-5493",
      hasDetail: true,
      repo: "spring-projects/spring-batch",
      kind: "issue" as const,
      ref: "#5493",
      state: "Fixed · 6.0.6",
      tone: "success" as const,
      date: "2026.08",
      role: "이슈 분석 · 재현 코드",
      title: "COMPLETED로 끝났는데 아이템이 사라졌습니다: Spring Batch scan 모드 이야기",
      description:
        "쓰기 실패 후 재시도하는 scan 구간에서 ChunkListener가 문서와 다른 타입을 받고, 그 리스너가 예외를 던지면 읽은 아이템이 쓰이지도 스킵으로 집계되지도 않은 채 스텝이 COMPLETED로 끝났습니다. 재현 코드와 함께 제보해 6.0.6에 반영됐습니다.",
      article: {
        lead: "Spring Batch로 배치를 돌리다 보면 쓰기 도중에 예외가 나는 순간이 옵니다. 이때 프레임워크는 청크 전체를 버리는 대신 scan 모드로 들어가 아이템을 하나씩 다시 처리합니다. 어느 아이템이 문제인지 골라내기 위해서죠. 그런데 이 scan 구간에서 프레임워크가 ChunkListener에게 넘겨주는 값이 문서에 적힌 것과 달랐습니다. 문서를 그대로 믿고 만든 리스너는 그 자리에서 예외를 던집니다. 진짜 문제는 그다음입니다. 스텝이 실패로 끝나는 게 아니라 COMPLETED로 끝나면서, 읽은 아이템이 쓰이지도 스킵으로 집계되지도 않은 채 사라집니다.",
        sections: [
          {
            heading: "리스너가 받는 청크의 타입이 문서와 달랐습니다",
            body: [
              "레퍼런스 문서와 javadoc 모두 beforeChunk(Chunk<I>)는 '아이템을 읽은 뒤, 처리를 시작하기 전에' 호출된다고 적고 있습니다. 그러니 리스너가 받는 것은 입력 타입 I여야 합니다.",
              "그런데 <String, Integer> 스텝에 아이템 클래스를 기록하는 리스너를 달아보면 이렇게 나옵니다."
            ],
            code: {
              caption: "beforeChunk가 관측한 아이템 타입",
              content: `[String, String, String]      // 일반 청크 — 문서대로 입력 타입
[Integer, Integer, Integer]   // scan 구간 — 처리가 끝난 출력 타입`
            },
            after: [
              "ChunkOrientedStep이 scan 청크를 tracker.pollNextScanItem()이 돌려준 값, 즉 처리가 끝난 아이템으로 만들어 그대로 넘기고 있었습니다. 순차 실행은 512번 줄, 동시 실행은 425번 줄입니다.",
              "이게 컴파일이 되는 이유는 CompositeChunkListener가 제네릭을 뺀 raw Chunk 시그니처를 선언하고 있기 때문입니다. 타입이 어긋나 있는데 컴파일러가 잡아줄 방법이 없었던 셈이죠."
            ]
          },
          {
            heading: "문서대로 만든 리스너 때문에 아이템이 조용히 사라졌습니다",
            body: [
              "여기서 끝났다면 타입 표기가 이상하다는 이야기로 끝났을 겁니다. 받은 청크를 Chunk<I>로 순회하는, 문서가 안내한 그대로의 리스너는 scan 모드에서 ClassCastException을 던집니다. 리스너 잘못이 아닙니다. 그런데 스텝은 이렇게 끝났습니다."
            ],
            code: {
              caption: "3건을 읽고 0건을 쓴 뒤 COMPLETED",
              content: `readCount=3 writeCount=0 writeSkipCount=0 filterCount=0 exitStatus=COMPLETED`
            },
            after: [
              "세 건 모두 사라졌습니다. 정상적으로 쓰였을 1번 아이템까지 포함해서요. scan 루프의 포괄적인 catch가 예외를 삼키는데, 그 시점에 아이템은 이미 ChunkTracker의 큐에서 LinkedList#poll로 빠져나온 뒤였고 되돌려 넣는 경로가 없습니다. SkipListener에도 통지되지 않습니다.",
              "그리고 스텝이 COMPLETED이기 때문에 잡을 재시작해도 이 스텝은 다시 실행되지 않습니다. 유실을 되돌릴 방법이 없다는 뜻입니다.",
              "같은 리스너를 일반 경로에 달면 문서가 약속한 대로 스텝이 FAILED로 끝납니다. scan 경로만 삼킵니다."
            ]
          },
          {
            heading: "동시 실행에서는 호출되지 않는다던 콜백이 호출됐습니다",
            body: [
              "ChunkListener 세 메서드의 javadoc과 레퍼런스 문서는 모두 '동시 실행 스텝에서는 호출되지 않는다'고 명시하고 있습니다. 실제로 동시 실행의 일반 경로는 호출하지 않습니다. 그런데 동시 실행의 scan 경로는 호출합니다.",
              "문서가 뒤처진 것인지 구현이 빠뜨린 것인지 확인하려고 커밋 이력을 봤습니다. '동시 실행에서는 호출되지 않는다'는 문구는 2026년 1월에 의도적으로 추가됐고, scan 모드의 리스너 호출은 그보다 뒤인 4월 리팩터링에서 들어왔습니다. 문서가 늦은 게 아니라 리팩터링이 빠뜨린 쪽입니다.",
              "이 순서를 이슈에 같이 적었습니다. 메인테이너가 어느 쪽을 기준으로 삼을지 바로 판단할 수 있게요."
            ]
          },
          {
            heading: "말 대신 실패하는 테스트를 붙였습니다",
            body: [
              "글로만 적으면 확인하는 쪽이 처음부터 다시 만들어봐야 합니다. Spring Batch 저장소의 기존 테스트 인프라와 같은 자리에 그대로 넣을 수 있는 실패 테스트를 함께 올렸습니다."
            ],
            code: {
              caption: "COMPLETED 스텝이라면 항상 성립해야 하는 불변식",
              content: `assertEquals(
    stepExecution.getReadCount(),
    stepExecution.getWriteCount()
        + stepExecution.getWriteSkipCount()
        + stepExecution.getFilterCount());`
            },
            after: [
              "핵심 단언은 두 줄입니다. 하나는 beforeChunk가 관측한 타입이 [String, String, String]이어야 한다는 것, 다른 하나는 위처럼 COMPLETED로 끝난 스텝이라면 읽은 수와 쓴 수 + 스킵 + 필터가 맞아야 한다는 것입니다. 두 번째는 이 버그와 무관하게 배치가 늘 지켜야 하는 불변식이라고 생각합니다.",
              "여기에 더해 동시 실행에서 콜백이 실제로 불린다는 것과, 일반 경로에서는 정상적으로 FAILED가 된다는 것을 확인하는 테스트를 각각 준비해 문제의 경계를 분명히 했습니다."
            ]
          },
          {
            heading: "고치는 방향은 제안만 하고 물었습니다",
            body: [
              "PR을 바로 올릴 수도 있었습니다. 그런데 scan 구간의 콜백을 아예 없앨지, 아니면 의미를 다시 정의할지는 프레임워크가 정할 문제라고 봤습니다. 그래서 제 판단을 관철하는 대신 방향을 적고 확인을 요청했습니다.",
              "제안한 쪽은 scan 분기의 beforeChunk/afterChunk 호출을 빼는 것입니다. 원래 청크는 이미 beforeChunk와 onChunkError를 받았으니 scan 트랜잭션마다 다시 부를 이유가 없습니다. 여기에 CompositeChunkListener를 타입 있는 시그니처로 바꾸면, 같은 종류의 혼동이 다음번에는 컴파일 단계에서 막힙니다.",
              "방향이 정해지면 테스트와 함께 PR을 올리겠다고 적어두었습니다."
            ]
          },
          {
            heading: "그래서 어떻게 됐나",
            body: [
              "리드 메인테이너가 보고한 항목이 모두 유효하다고 확인했습니다. 동시 실행 scan 경로의 리스너 호출은 의도치 않게 들어간 것이고, CompositeChunkListener가 raw Chunk를 선언한 것이 애초에 입력/출력 청크 혼동을 컴파일되게 만든 원인이라는 점도 함께 짚어주었습니다. 수정은 본인이 직접 하기로 해서 제가 PR을 올리지는 않았습니다.",
              "이슈는 2026년 8월 25일 6.0.6 마일스톤으로 닫혔습니다. 코드를 한 줄도 머지하지 않은 기여입니다. 다만 원인을 어디까지 좁혀서 넘기느냐가 제보의 값을 정한다는 걸 확인한 건이었습니다."
            ]
          }
        ]
      },
      results: [
        { label: "제보한 계약 위반", after: "3건 전부 유효 확인" },
        { label: "함께 올린 재현 코드", after: "실패 테스트 2개 + 경계 확인 2개" },
        { label: "반영", before: "미수정", after: "6.0.6 마일스톤" },
        {
          label: "수정 PR",
          after: "제가 작성하지 않았습니다",
          note: "메인테이너가 직접 수정하기로 해서 PR은 올리지 않았습니다. 이 기여의 내용은 코드가 아니라 원인 규명과 재현입니다."
        }
      ],
      url: "https://github.com/spring-projects/spring-batch/issues/5493"
    },
    {
      id: "aws-cdk-38551",
      hasDetail: false,
      repo: "aws/aws-cdk",
      kind: "pr" as const,
      ref: "#38551",
      state: "머지 대기 중",
      tone: "accent" as const,
      date: "2026.08",
      role: "PR",
      title: "RDS SQL Server 최신 CU/GDR 빌드 상수 추가",
      description:
        "RDS에 올라온 최신 빌드에 SqlServerEngineVersion 상수가 없어 of()로만 지정할 수 있었습니다. describe-db-engine-versions로 실제 배포 가능한 버전만 골라 5종을 추가하고, 어느 리전에서도 조회되지 않는 13.00 계열은 근거와 함께 제외했습니다.",
      url: "https://github.com/aws/aws-cdk/pull/38551"
    },
    {
      id: "spring-security-18493",
      hasDetail: true,
      repo: "spring-projects/spring-security",
      kind: "pr" as const,
      ref: "#18493",
      state: "Merged",
      tone: "success" as const,
      date: "2026.01",
      role: "PR",
      title: "두 파일 +5 / -1, 첫 업스트림 PR 이야기",
      description:
        "Spring Security의 Javadoc 경고 제거 이니셔티브에서 spring-security-acl 모듈 몫을 맡았습니다. 경고를 지우는 데서 멈추지 않고 다시 들어오지 못하도록 빌드에 게이트를 걸었습니다.",
      article: {
        lead: "업스트림에 처음 보낸 PR입니다. 크지 않습니다. 두 파일에 +5 / -1이고, 실제로 고친 코드는 {@link} 태그 한 줄입니다. 그래도 이 PR을 남겨두는 이유는, 경고를 지우는 것과 같은 경고가 다시 생기지 않게 막는 것을 한 번에 담았기 때문입니다.",
        sections: [
          {
            heading: "무엇을 고를지부터 정했습니다",
            body: [
              "Spring Security는 gh-18443으로 모듈 전체의 Javadoc 경고를 없애는 작업을 진행하고 있었습니다. 모듈별로 이슈가 나뉘어 있었고, 그중 spring-security-acl에 해당하는 이슈가 gh-18445였습니다.",
              "처음 기여하는 저장소에 큰 변경을 제안하는 것은 서로에게 부담입니다. 방향이 이미 정해져 있고 범위가 분명한 작업을 하나 맡아 끝까지 마무리하는 쪽을 선택했습니다."
            ]
          },
          {
            heading: "경고의 정체는 깨진 참조였습니다",
            body: [
              "acl 모듈의 Javadoc 빌드에 broken reference 경고가 남아 있었습니다. AclPermissionEvaluator의 {@link} 태그에 불필요한 패키지 수식이 붙어 참조가 깨져 있었고, 수식을 제거하니 경고가 사라졌습니다.",
              "여기까지는 한 줄짜리 수정입니다."
            ]
          },
          {
            heading: "수정한 상태를 사람이 아니라 빌드가 검사하게 했습니다",
            body: [
              "경고를 한 번 제거해도 다음 커밋에서 같은 경고가 조용히 다시 들어올 수 있습니다. acl 모듈 빌드에는 Javadoc 경고를 오류로 취급하는 게이트가 없었기 때문입니다.",
              "다른 모듈이 이미 쓰고 있던 javadoc-warnings-error 플러그인을 acl 빌드에도 적용했습니다. 이제 경고가 하나라도 생기면 빌드가 실패합니다. 수정한 상태가 유지되는지를 사람의 주의력에 맡기지 않고 CI가 검사하게 됐습니다."
            ]
          },
          {
            heading: "그래서 어떻게 됐나",
            body: [
              "2026년 1월 14일에 열고 21일에 머지됐습니다. 변경 줄 수로만 보면 작은 PR입니다. 다만 기여를 시작할 때 무엇을 골라야 하는지에 대한 답을 여기서 얻었습니다. 진행 중인 이니셔티브에서 한 조각을 맡아, 고치는 것과 재발을 막는 것까지 함께 닫는 것입니다."
            ]
          }
        ]
      },
      results: [
        { label: "Javadoc 경고", before: "1건", after: "0건", delta: "-100%" },
        { label: "재발 방지", before: "게이트 없음", after: "경고 발생 시 빌드 실패" },
        { label: "변경 범위", after: "2개 파일 · +5 / -1" },
        { label: "머지까지", before: "2026.01.14 오픈", after: "2026.01.21 머지" }
      ],
      url: "https://github.com/spring-projects/spring-security/pull/18493"
    }
  ];

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
      { label: "OPEN SOURCE", title: "Spring · AWS CDK 기여", sub: "Security 머지 · Batch 6.0.6 반영 · CDK 머지 대기" }
    ]
  },
  openSource,
  miniProjects: [
    {
      name: "Image-Resize",
      description: "Spring Boot + AWS S3 이미지 리사이징 업로드 구현.",
      language: "Java",
      tag: "Backend",
      url: "https://github.com/alpin87/Image-Resize",
      linkLabel: "GitHub"
    },
    {
      name: "ReLog",
      description: "Menhealer 팀의 ReLog 서비스 Spring Boot 백엔드.",
      language: "Java",
      tag: "Backend",
      url: "https://github.com/Menhealer/backend",
      linkLabel: "GitHub"
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
      id: "feelter",
      hasDetail: true,
      category: "개인 프로젝트",
      title: "Feelter",
      subtitle: "앱 설치 없이 토스에서 바로 여는 사진 필터 · 인생네컷 웹앱",
      period: "2026.08 - 현재",
      status: { label: "운영 중", tone: "success" as const },
      summary:
        "갤러리에 있는 사진에 색감 필터를 입히거나 인생네컷 프레임에 배치해 저장하는 모바일 웹앱입니다. 토스 앱인토스 미니앱으로 출시했고, 서버를 두지 않고 전부 브라우저에서 처리하기 때문에 운영비가 들지 않습니다.",
      highlights: [
        "서버와 로그인, 결제를 두지 않는 완전 클라이언트 사이드 구조여서 운영비가 들지 않습니다.",
        "미리보기와 저장이 같은 Canvas 2D 파이프라인을 지나기 때문에 색이 어긋나지 않습니다.",
        "필터 40종을 8개 그룹의 색보정 레시피로 정의해, 새 필터를 코드가 아니라 값으로 추가합니다."
      ],
      description:
        "갤러리에 있는 사진을 꾸미는 앱입니다. 찍는 기능은 일부러 넣지 않았습니다. 카메라를 붙이면 권한 안내와 촬영 화면이 따라오는데, 정작 필요한 건 이미 찍어둔 사진을 SNS에 올리기 전에 손보는 일이라고 봤기 때문입니다.\n\n색감 필터를 입히는 필터 모드와 인생네컷 프레임에 사진을 배치하는 네컷 모드 두 가지가 있으며, 두 모드는 서로 독립적으로 동작합니다. 앱인토스 미니앱으로 출시해 토스 안에서 설치 없이 열리고, 같은 코드가 순수 웹으로도 돌아가 Vercel 데모로도 띄웁니다.\n\nv1은 서버와 로그인, 결제를 전부 두지 않았습니다. 개인 프로젝트에서 매달 나가는 비용이 생기면 오래 유지하기 어렵다고 판단해, 처음부터 브라우저 안에서 끝나는 구조로 설계했습니다.",
      role: "기획 · 개발 · 출시",
      techStack: [
        "React 19", "TypeScript", "Vite 7", "Canvas 2D",
        "Apps in Toss SDK", "Vitest", "pnpm", "Vercel"
      ],
      techChoices: [
        {
          title: "왜 서버를 두지 않았나",
          reason: "개인 프로젝트에서 매달 나가는 비용이 생기면 오래 유지하기 어렵습니다. v1은 서버와 로그인, 결제, 계정을 전부 제외하고 브라우저 안에서 처리를 끝내 운영비를 0원으로 고정했습니다. 사진이 기기 밖으로 나가지 않는다는 점도 함께 얻었습니다."
        },
        {
          title: "CSS filter 대신 Canvas 2D",
          reason: "CSS filter로 미리보기를 만들면 저장할 때 다시 그려야 하고, 그 과정에서 화면에서 보던 색과 저장된 색이 어긋납니다. 미리보기와 저장이 같은 파이프라인을 지나도록 처음부터 Canvas 2D로만 렌더링했습니다."
        },
        {
          title: "필터를 코드가 아니라 레시피로",
          reason: "밝기와 대비, 채도, 색온도, 페이드, 그레인 같은 파라미터 조합을 값으로 정의했습니다. 필터 40종이 전부 같은 함수를 거치기 때문에, 새 필터를 추가하는 작업이 코드를 작성하는 대신 숫자를 추가하는 작업이 됩니다."
        },
        {
          title: "필터 인터페이스 고정",
          reason: "필터는 { id, name, isFree, apply(ImageData) } 하나로 고정했습니다. 나중에 유료 AI 필터를 추가할 때 이 자리에 그대로 연결되고, 그때 화면 코드를 수정하지 않아도 되게 하려는 목적입니다."
        },
        {
          title: "앱인토스 SDK 격리",
          reason: "SDK에 의존하는 코드를 어댑터 뒤로 모으고 순수 웹 폴백을 남겼습니다. 같은 코드가 토스 미니앱과 일반 브라우저 양쪽에서 동작합니다."
        },
        {
          title: "카메라를 넣지 않음",
          reason: "촬영하는 앱이 아니라 이미 있는 사진을 꾸미는 앱으로 범위를 명확히 했습니다. getUserMedia를 추가하면 권한 안내와 촬영 화면이 따라오는데, 그만큼의 값어치를 하지 않는다고 판단했습니다."
        }
      ],
      features: [
        {
          title: "필터 모드",
          description: "사진 1장을 올리면 필터 40종을 적용한 썸네일을 만들어 하단 가로 스크롤로 보여주고, 고른 필터를 원본에 바로 반영합니다. 필터는 소프트·인물·보정·필름·레트로·계절·무드·클래식 8개 그룹으로 묶었습니다."
        },
        {
          title: "수동 조정",
          description: "밝기와 대비, 채도, 색온도 슬라이더를 필터 위에 더해 레시피에 합산하고, 같은 파이프라인으로 다시 렌더링합니다."
        },
        {
          title: "네컷 모드",
          description: "프레임 프리셋 4종과 색상 4색(블랙·화이트·크림·핑크)을 고르고, 칸을 탭해 사진을 채운 뒤 합성해 저장합니다."
        },
        {
          title: "cover 크롭",
          description: "칸 비율과 사진 비율이 달라도 중앙 기준 cover 방식으로 잘라 넣고, 칸을 다시 탭하면 사진을 교체합니다."
        },
        {
          title: "Canvas 2D 파이프라인",
          description: "톤커브·색온도·페이드·그레인·비네팅에 bloom 오버레이까지 한 파이프라인으로 묶어 미리보기와 저장이 같은 결과를 냅니다."
        },
        {
          title: "Safe Area 대응",
          description: "토스 웹뷰가 주는 inset을 읽어 노치와 홈 인디케이터를 피해 화면을 그립니다."
        },
        {
          title: "단위 테스트",
          description: "파이프라인·강도 계산·프레임 분배·레시피·Safe Area inset을 Vitest로 고정했습니다."
        }
      ],
      troubleshooting: [],
      links: { toss: "minion.toss.im/7D9nBbr4", site: "feelter-gamma.vercel.app" },
      image: ""
    },
    {
      id: "tempick-extension",
      hasDetail: true,
      category: "회사 프로젝트 · 앤유코퍼레이션",
      title: "Tempick 크롬 확장",
      subtitle: "쿠팡 상품 페이지에서 버튼 한 번으로 담는 Manifest V3 확장",
      period: "2026.07 - 현재",
      status: { label: "운영 중", tone: "success" as const },
      summary: "쿠팡 화면을 떠나지 않고도 상품을 크리에이터 페이지에 담을 수 있게 만든 크롬 확장입니다. 지금은 인스타그램과 스레드, 틱톡, 더우인에서 사진과 영상을 내려받는 기능까지 함께 다룹니다. 확장 오리진이 쿠키를 받지 못하는 제약 때문에 인증 설계부터 다시 세워야 했습니다.",
      highlights: [
        "쿠팡 상품 메타데이터를 서버에서 얻을 방법이 없어, 사용자의 브라우저에서 읽는 확장으로 방향을 바꿨습니다.",
        "chrome-extension:// 오리진은 SameSite=Lax 쿠키를 받지 못하기 때문에, 토큰 인증으로 바꾸고 요청마다 계정 상태를 다시 확인하도록 했습니다.",
        "계정 연결 방식을 세 차례 다시 설계했습니다. 토큰을 손으로 복사하던 6단계를 로그인 승인 1회로 줄였고, 다시 일회용 코드 교환으로 바꿨습니다.",
        "프래그먼트는 안전하다는 제 반박이 틀렸습니다. 로그에 남은 토큰 95건을 확인하고 OAuth 인가 코드 방식으로 교체했습니다.",
        "쿠팡 담기에서 시작해 인스타그램과 스레드, 틱톡, 더우인의 사진·영상 저장까지 넓혔고, 버전을 0.1.1에서 0.3.6까지 올렸습니다."
      ],
      description: "쿠팡 상품을 Tempick 페이지에 올리려면 주소를 복사해 어드민으로 이동하고, 모달을 열어 붙여넣고, 수익 링크로 변환해 저장하는 여섯 단계를 거쳐야 했습니다. 상품 하나에 화면을 두 번 오가는 구조라, 상품을 열 개 올리는 사용자에게는 이 왕복이 작업 시간의 대부분이었습니다.\n\n목표는 쿠팡 화면을 떠나지 않는 것 하나였습니다. 상품 페이지에 버튼을 추가해 제목과 썸네일, 주소를 읽어 보내면, 서버가 머천트 본인의 쿠팡파트너스 키로 수익 링크를 만들어 블록으로 저장합니다.\n\n다만 이 작업의 대부분을 차지한 것은 기능이 아니라 확장이라는 실행 환경이 만든 제약이었습니다. 쿠키를 사용할 수 없다는 점과, 콘텐츠 스크립트가 실행되는 페이지를 통제할 수 없다는 점 두 가지입니다.",
      role: "Backend & Extension",
      techStack: [
        "JavaScript", "Chrome Extension MV3", "Service Worker", "Side Panel API", "Content Script",
        "chrome.identity", "Node.js (jsdom)", "Ruby", "Ruby on Rails 8.1", "PostgreSQL (Neon)",
        "Solid Cache", "쿠팡파트너스 Open API"
      ],
      techChoices: [
        {
          title: "Manifest V3 · 서비스 워커",
          reason: "웹스토어가 MV3만 받습니다. 백그라운드가 언제든 종료될 수 있기 때문에, 상태를 워커에 두지 않고 서버와 스토리지에 저장했습니다."
        },
        {
          title: "왜 확장이어야 했나",
          reason: "쿠팡 상품 정보를 서버에서 가져오려고 스크래핑과 딥링크, 단축링크, 검색을 모두 시도했지만 전부 막혔고, 람다에 헤드리스 브라우저를 올리는 방법도 차단됐습니다. 사용자의 브라우저에서 이미 열려 있는 페이지를 읽는 방식만 유효했기 때문에 확장으로 방향을 바꿨습니다."
        },
        {
          title: "Side Panel API",
          reason: "팝업은 다른 곳을 클릭하면 닫히기 때문에 상품을 여러 개 담는 동선과 맞지 않았습니다. 사이드패널은 쿠팡 화면을 띄워둔 상태에서도 유지됩니다."
        },
        {
          title: "쿠키 대신 토큰 인증",
          reason: "chrome-extension:// 오리진에서 서비스 도메인으로 가는 요청은 크로스 사이트로 분류되기 때문에 SameSite=Lax 세션 쿠키가 실리지 않습니다. 쿠키를 사용할 수 없어서 토큰 방식으로 전환했습니다."
        },
        {
          title: "일회용 코드 교환",
          reason: "URL 프래그먼트에 장기 토큰을 실었더니 리다이렉트 로그에 95건이 남았습니다. OAuth 인가 코드 방식으로 바꿔 콜백에는 60초·1회 소비 코드만 싣습니다."
        },
        {
          title: "jsdom 테스트 하니스",
          reason: "콘텐츠 스크립트가 실행되는 페이지는 우리가 통제할 수 없습니다. 조작된 입력을 가정한 경우를 브라우저 없이 고정해두기 위해 사용했습니다."
        }
      ],
      features: [
        {
          title: "쿠팡 상품 담기",
          description: "콘텐츠 스크립트로 쿠팡 상품 페이지에 버튼을 주입해 제목과 썸네일, 주소를 읽어 보냅니다. 담을 수 없는 블록은 이유를 함께 표시합니다."
        },
        {
          title: "사이드패널 UI",
          description: "팝업을 사이드패널로 바꿔 쿠팡 화면 옆에서 담은 블록을 확인하고, 확장 안에서 공개 페이지를 미리 봅니다."
        },
        {
          title: "쿠키 없는 인증",
          description: "chrome.identity와 60초짜리 일회용 코드 교환으로 확장 오리진에서도 로그인 상태를 잇고, 어드민에서 확장으로 곧장 연결합니다."
        },
        {
          title: "권한 최소화",
          description: "쿠팡 상품 페이지인지 호스트를 검사하고 page_id를 필수로 받으며, 파트너스 키가 없으면 토큰을 발급하지 않습니다. 운영 빌드에서는 개발 서버 권한을 제거했습니다."
        },
        {
          title: "수익 링크 변환",
          description: "쿠팡파트너스 Open API로 머천트 본인 키의 수익 링크를 만들어 블록으로 저장합니다."
        },
        {
          title: "SNS 사진 · 영상 저장",
          description: "인스타그램과 스레드, 틱톡, 더우인 게시물의 사진과 영상을 원본 화질로 내려받습니다. 미디어가 여러 개면 목록을 펼쳐 개별과 전체 중에 고를 수 있습니다."
        },
        {
          title: "미디어 예외 처리",
          description: "4MB를 넘는 릴스 응답이 통째로 버려지던 문제와 DASH에만 미디어가 있는 게시물을 처리했습니다. 저장 버튼을 놓을 자리가 없으면 떠 있는 카드로 표시합니다."
        },
        {
          title: "입력값 검증",
          description: "Node.js(jsdom) 하니스로 페이지가 조작한 값과 redirect_uri 우회를 걸러냅니다."
        },
        {
          title: "스토어 운영",
          description: "제출 문안과 상세 설명을 작성하고 개인정보처리방침에 확장 항목을 반영했습니다. 빌드에서 테스트 파일을 제외하고 버전을 0.1.1에서 0.3.6까지 올렸습니다."
        }
      ],
      troubleshooting: [
        {
          title: "확장에서는 로그인 세션이 통하지 않았다",
          problem: "쿠팡 페이지에 추가한 버튼이 서버로 요청을 보내면 로그인하지 않은 것으로 처리됐습니다. 확장을 사용하려면 먼저 사용자를 식별해야 하는데, 그 첫 단계부터 막혀 있었습니다.",
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
            { label: "경계 케이스 검증", after: "jsdom 하니스 9개 고정" }
          ]
        },
        {
          title: "버튼이 아예 안 붙거나 화면 한참 아래에 붙었다",
          problem: "쿠팡 상품 페이지에 버튼을 주입했는데 하나도 붙지 않았고, 사이드패널은 상품 사진과 상관없는 위치에 나타났습니다.",
          cause: "장바구니담기 버튼을 a와 button 태그에서 찾았는데 쿠팡은 그 자리를 div로 그립니다. 패널 위치는 가장 큰 이미지를 기준으로 삼았다가 본문 설명 이미지가 잡혀 top 19468px에 붙는 일이 있었습니다. 쿠팡 DOM은 우리가 통제하지 못하고 클래스명도 빌드마다 바뀔 수 있습니다.",
          solution: "TreeWalker로 텍스트 노드를 훑어 태그가 아닌 문구로 찾고, 목록 카드는 상품 링크에서 조상으로 올라가며 경계를 잡아 클래스명이 바뀌어도 동작하도록 했습니다. 패널은 구매 버튼 행보다 위, 가로세로비, og:image 일치 같은 조건을 겹쳐 후보를 좁힌 뒤 최종적으로 사진 열을 직접 지정해 그 아래 여백에 흐름 밖으로 얹었습니다. 흐름 안에 넣으면 상품 사진이 밀려납니다.",
          results: [
            { label: "확장 UI 전체 e2e 자동화", after: "없음", note: "미검증입니다. 쿠팡의 DOM 구조가 바뀌면 버튼 주입이 조용히 실패할 수 있는데, 이런 실패는 테스트가 아니라 사용자 제보로 알게 됩니다." }
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
      links: { chrome: "chromewebstore.google.com/detail/kgccbeldpclbbdenbahpaakocanpcjbd" },
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
      summary: "링크인바이오 페이지 빌더 tempick의 Rails 백엔드와 어드민을 맡았습니다. 외부 페이지 이사오기와 쿠팡파트너스 수익 링크 변환을 만들었고, 원격 DB 왕복 때문에 느리던 화면을 실측으로 분해해 수정했습니다.",
      highlights: [
        "2026년 7월부터 8월까지 커밋 261건을 남겼습니다(머지 커밋은 제외한 수치입니다).",
        "외부 페이지 이사오기를 스크래퍼 람다로 구축하고, 쿠팡파트너스 키를 페이지 단위 등록으로 바꿔 수익 링크 변환을 붙였습니다.",
        "템플릿 적용 응답을 3,570ms에서 2,266ms로 줄였습니다. 로컬에서 9%에 그쳤던 개선이 원격 DB에서는 75.6%였습니다.",
        "대형 임포트에서 발생하던 504 오류를 해소했습니다. 결과 URL 검증은 133초에서 20초로, 저장 INSERT는 약 2,700문에서 2문으로 줄었습니다.",
        "쿼터와 결제 권한을 락과 CAS로 직렬화해, 동시 요청이 겹쳐도 초과 발급이 0건이 되도록 했습니다."
      ],
      description: "크리에이터가 프로필 페이지에 블록을 쌓아 공개하고, 쿠팡파트너스 수익 링크를 붙여 수익화하는 서비스입니다. Rails 8.1 애플리케이션 하나에 머천트 어드민과 플랫폼 슈퍼어드민, 공개 프로필 렌더링이 함께 들어 있습니다.\n\n2026년 7월부터 커밋 261건을 남겼습니다. 다른 서비스의 페이지를 그대로 옮겨 오는 이사오기, 쿠팡파트너스 수익 링크 변환, 디자인 전용 화면 분리, 결제 모달과 플랜, 인스타그램 DM 자동화까지 담당 범위가 넓었습니다.\n\n작업의 절반 이상은 성능이었습니다. 앱은 서울에 있고 Neon DB는 싱가포르에 있어서 쿼리 한 번에 왕복 75ms가 고정으로 붙는데, 이 값이 어드민 응답 시간의 바닥을 만들고 있었습니다. 리전 이전은 보류하고 왕복 횟수를 줄이는 쪽으로 대응했습니다.\n\n값을 먼저 측정하고, 구간을 나누어 비중이 큰 곳부터 수정한 뒤, 다시 측정하는 순서를 지켰습니다. 아래 수치는 전부 실측한 값이며, 측정하지 못한 항목은 측정하지 못했다고 적었습니다.",
      role: "Backend · 어드민",
      techStack: [
        "Ruby", "Ruby on Rails 8.1", "JavaScript", "Hotwire (Turbo · Stimulus)", "Node.js 22",
        "AWS Lambda (CDK)", "SQS", "PostgreSQL (Neon)", "Solid Queue", "Solid Cache",
        "Cloudflare R2", "Tailwind CSS", "Kamal", "Sentry"
      ],
      techChoices: [
        {
          title: "왜 Ruby on Rails 8인가",
          reason: "링크 인 바이오는 블록을 만들고 정렬하고 보여주는 CRUD가 제품의 중심이고, 서버 로직 자체는 얇은 편입니다. 그런 모양에는 규칙이 이미 정해져 있는 프레임워크가 유리했습니다. 여기에 Rails 8은 큐(Solid Queue)·캐시(Solid Cache)·배포(Kamal)를 기본으로 들고 옵니다. Redis도 배포 플랫폼도 따로 고르지 않고 바로 시작할 수 있었습니다. 저장소를 사실상 혼자 맡는 상황에서는, 선택할 것이 적다는 점이 가장 큰 장점이었습니다."
        },
        {
          title: "Java에서 넘어오며 감수한 것",
          reason: "저는 Spring으로 백엔드를 시작했고 Ruby는 이 제품에서 처음 썼습니다. 정적 타입의 안전망이 사라지는 건 그대로 비용입니다. 그래서 Brakeman과 bundler-audit, 시스템 테스트를 CI 게이트로 걸어, 컴파일러가 걸러주던 부분을 파이프라인이 대신 걸러내게 했습니다."
        },
        {
          title: "Hotwire (Turbo · Stimulus)",
          reason: "블록 편집은 화면의 일부만 바뀌는 경우가 대부분입니다. SPA를 도입하는 대신 서버가 만든 조각을 교체하는 방식이 코드를 적게 씁니다."
        },
        {
          title: "Solid Queue · Solid Cache",
          reason: "Redis를 따로 띄우지 않고 PostgreSQL 하나로 큐와 캐시를 처리합니다. 그만큼 운영할 인프라가 하나 줄어듭니다."
        },
        {
          title: "Cloudflare R2",
          reason: "블록마다 썸네일이 붙기 때문에 이미지 트래픽이 많습니다. 그래서 egress 요금이 없는 쪽을 선택했습니다."
        },
        {
          title: "이사오기를 별도 람다로 분리한 이유",
          reason: "외부 페이지를 긁어오는 작업은 상대 서비스의 구조에 따라 걸리는 시간이 크게 달라집니다. 이 작업을 웹 서버 안에 두면 요청 하나가 오래 잡혀 다른 요청까지 밀리기 때문에, CDK 스택으로 분리한 람다에 맡기고 결과만 받도록 했습니다."
        },
        {
          title: "쿠팡 상품 데이터를 서버에서 가져오지 않기로 한 이유",
          reason: "스크래핑과 딥링크, 단축링크, 검색을 모두 시도했지만 우리 서버 경로에서는 상품 메타데이터를 얻을 수 없었습니다. 헤드리스 브라우저를 람다에 올리는 방법도 차단됐습니다. 결국 사용자의 브라우저에서 읽는 방식만 유효해서 크롬 확장으로 옮겼고, API 호출량 때문에 이사오기의 대량 자동변환도 폐기하고 단일 링크 수동 변환만 남겼습니다."
        },
        {
          title: "Neon 리전 이전을 보류한 이유",
          reason: "앱은 서울에, DB는 싱가포르에 있어서 쿼리 한 번마다 왕복 75ms가 고정으로 붙습니다. 이 값이 성능의 바닥이지만 리전을 옮기는 작업은 위험과 비용이 큽니다. 이전을 보류하고 왕복 횟수 자체를 줄이는 쪽으로 대응했으며, 줄인 상태가 되돌아가지 않도록 SQL 회귀 단언을 걸었습니다."
        },
        {
          title: "Kamal 배포",
          reason: "매니지드 플랫폼 없이 컨테이너를 서버에서 직접 운영합니다. Rails 8이 기본으로 제시하는 배포 경로여서 추가로 작성할 설정이 적습니다."
        }
      ],
      features: [
        {
          title: "링크 이사오기",
          description: "link-scraper Lambda를 CDK 스택으로 만들고 배포 파이프라인에 SSM으로 환경 변수를 연결했습니다. 다른 서비스의 페이지 구조를 파싱해 순서를 보존한 채 블록으로 옮깁니다."
        },
        {
          title: "쿠팡파트너스 딥링크 변환",
          description: "페이지 단위로 등록한 파트너스 키로 단일링크와 그룹링크를 수익 링크로 변환합니다. 다른 사람의 파트너스 링크는 302 리다이렉트로 원본을 복원한 뒤 본인 키로 다시 발급합니다."
        },
        {
          title: "디자인 전용 화면",
          description: "프로필과 스타일, 블록, 설정 네 개 탭으로 편집 화면을 분리하고 테마 프리셋 5종과 배경 12색, 블록 모양·그림자 설정을 신설했습니다."
        },
        {
          title: "블록 종류 확장",
          description: "텍스트 블록과 구분선 블록(스타일 4종에 농도 3단계), 그룹 제목 편집, 페이지 소개 입력과 실시간 미리보기를 추가했습니다."
        },
        {
          title: "블록 리스트 편집모드",
          description: "일괄 선택과 활성화, 비활성화, 삭제를 붙이고 실패 토스트와 Turbo 복원 리셋, 키보드 접근성, 요약 재조회의 N+1 문제를 함께 처리했습니다."
        },
        {
          title: "자동저장 · 미리보기",
          description: "디자인 저장이 미리보기와 폼을 통째로 교체하던 것을 morph 제자리 패치로 바꾸고, 자동저장마다 지나가 새로고침처럼 보이던 Turbo 진행 바를 숨겼습니다."
        },
        {
          title: "공개 페이지",
          description: "그룹링크 아이템을 30개씩 지연 로딩하고, OG 메타 태그와 루트 도메인 직접 렌더링으로 공유 미리보기를 고정했습니다."
        },
        {
          title: "결제 · 플랜",
          description: "결제 모달의 서버 계약 일치와 동의 검증을 맞추고, 카드번호 하이픈 자동 구분과 PCI-DSS 기준 마스킹을 적용했습니다. 무료체험 카드 입력 화면도 혜택이 보이도록 개편했습니다."
        },
        {
          title: "인스타그램 DM 자동화",
          description: "공개 답글 다중화와 AI 생성, 비팔로워 전용 캐러셀을 붙이고 캐러셀 카드 편집기를 카드형 UI로 개편했습니다."
        },
        {
          title: "성능 · 회귀 고정",
          description: "어드민 응답 시간의 지배 요인이던 원격 DB 순차 왕복을 병렬화하고, 쿼리 병합과 중복 제거가 단건 조회로 되돌아가지 않도록 SQL 회귀 단언으로 고정했습니다."
        },
        {
          title: "보안 · CI 유지보수",
          description: "Active Storage 취약점 때문에 Rails 8.1.3.1로 올리고 loofah와 rails-html-sanitizer를 패치했습니다. 날짜에 의존하던 테스트를 상대 시각으로 바꿔 CI를 안정화했습니다."
        }
      ],
      troubleshooting: [
        {
          title: "어드민이 느린 원인이 코드가 아니라 거리였다",
          problem: "어드민 화면 전반이 체감상 느렸고, 특정 화면 하나의 문제가 아니라 어디를 열어도 비슷하게 느렸습니다.",
          cause: "앱은 서울에, Neon DB는 싱가포르에 있어서 쿼리 한 번마다 왕복 75ms가 고정으로 붙습니다. 화면마다 조회를 순차로 보내고 있었기 때문에 이 75ms가 조회 수만큼 그대로 쌓였습니다. 같은 페이지를 베이스 컨트롤러와 아이템 컨트롤러가 각각 다시 읽는 중복도 있었습니다.",
          solution: "리전 이전은 위험과 비용이 커서 보류하고, 왕복 횟수를 줄이는 쪽으로 대응했습니다. 순차 조회를 병렬로 바꾸고 load_async로 겹쳤으며, DM 규칙 저장과 토글이 각자 갖고 있던 콘텐츠 로딩 복제본을 공유 concern으로 합쳤습니다. 422로 끝날 응답에서 버려질 콘텐츠를 미리 읽던 것도 제거했습니다.",
          results: [
            { label: "어드민 콘텐츠 조회", before: "순차 왕복", after: "병렬 처리" },
            { label: "같은 페이지 중복 조회", before: "베이스와 아이템에서 각각 조회", after: "한 번만 조회" },
            {
              label: "회귀 방지",
              after: "쿼리 수를 SQL 단언으로 고정",
              note: "쿼리 병합과 중복 제거가 단건 조회로 되돌아가는 것을 테스트가 잡습니다."
            }
          ]
        },
        {
          title: "템플릿을 고르면 3.5초 동안 화면이 멈춰 있었다",
          problem: "블록 추가 모달에서 템플릿을 고르면 페이지 구성이 한 번에 갈아끼워지는데, 그동안 화면이 멈춘 것처럼 보였습니다.",
          cause: "먼저 렌더가 느린지 응답이 느린지 구분했더니 응답 자체가 늦었고, 구간을 나누어 보니 원인이 두 가지였습니다. 기존 블록을 지우는 쿼리가 블록 수에 정비례했고, 새 블록도 한 건씩 저장해 원격 DB로 쓰기 왕복이 그만큼 나갔습니다. 로컬 DB는 쓰기 비용이 낮아서 이 비용이 전혀 드러나지 않았습니다.",
          solution: "삭제는 연관을 한 번에 정리해 쿼리를 블록 수와 무관한 상수로 고정했고, 저장은 검증을 메모리에서 그대로 돌리면서 INSERT만 묶었습니다. 화면 폭에 따라 한쪽만 보이는 미리보기를 매번 두 벌 렌더하던 것도 한 벌로 줄였습니다. 일괄 삭제로 바꾸면 첨부 파일 정리 시점이 커밋 전으로 당겨져 실패가 조용히 삼켜진다는 함정이 있어, 커밋 이후로 걸고 되돌리면 실패하는 회귀 테스트를 붙였습니다.",
          results: [
            { label: "응답 전체 (개발 서버)", before: "3,570ms", after: "2,266ms", delta: "-36.5%" },
            { label: "└ 템플릿 적용 구간", before: "1,800ms", after: "440ms", delta: "-75.6%" },
            { label: "블록 삭제 쿼리 (49블록)", before: "395쿼리", after: "9쿼리 고정", delta: "-97.7%" },
            { label: "서버 왕복", before: "4회", after: "1회", delta: "-75.0%" },
            { label: "미리보기 중복 렌더 제거 후 응답", before: "2,266ms", after: "약 1,800ms (기대)", note: "미검증입니다. 렌더가 2회에서 1회로 줄어드는 것은 코드상 확정이지만, 배포한 뒤에 다시 측정하지는 않았습니다." }
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
            { label: "디자인 탭 열기 (실서버)", before: "2,447ms", after: "약 1,200ms (기대)", note: "미검증입니다. 지연을 주입해 측정한 값이며, 실서버에서 다시 측정하지는 않았습니다." }
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
          cause: "예외를 삼키고 있었고, 상태가 연결과 미연결 두 가지뿐이라 실패를 표현할 자리가 없었습니다. 같은 성격으로 Turbo 스냅샷이 결제 모달의 입력값과 버튼 상태까지 복제해, 뒤로 갔다 돌아오면 카드번호가 다시 나타나거나 버튼이 처리 중인 상태로 고정됐습니다.",
          solution: "연동 상태를 연결됨과 확인 필요로 나눠 실패를 경고색으로 드러냈습니다. 색만으로 구분하면 색각 이상이나 흑백 환경에서 전달되지 않으므로 아이콘과 문구로도 구분했고, 삼키던 예외는 로그와 Sentry로 보고하게 했습니다. 결제 모달은 캐시 직전에 입력값과 로딩 상태를 정리하되 스코프를 결제 다이얼로그로 좁혀 편집 모달은 건드리지 않았습니다.",
          results: [
            { label: "결제 모달 캐시 정리 (입력값 · 버튼 상태)", after: "코드상 처리 완료", note: "미검증입니다. 브라우저에서 직접 확인하지는 못했습니다." }
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
      summary: "교내 정보와 커뮤니티, 실시간 채팅을 담아 스토어에 출시하고 운영 중인 통합 앱에서 백엔드와 인프라를 담당했습니다.",
      highlights: [
        "RDBMS의 LIKE 검색으로는 한글을 제대로 찾지 못해, Elasticsearch와 nori 분석기로 전환하고 Logstash로 3분 주기 동기화를 걸었습니다.",
        "WebSocket 연결이 끊기는 상황에 대비해 Redis를 버퍼로 두고 재전송하도록 만들어 메시지 유실을 막았습니다.",
        "GitHub Actions와 Nginx로 Blue-Green 무중단 배포를 구성해 다운타임을 0초로 만들었습니다."
      ],
      description: "동양미래대학교 학생들이 교내 생활에서 매번 다른 곳을 찾아보던 정보를 한 앱으로 모은 통합 커뮤니티·정보 앱입니다.\n\n학과 정보와 공지사항 필터링, 실시간 학식, 시간표 자동 등록, 스터디룸 예약, 중고 거래, 실시간 채팅을 담았습니다. iOS와 Android 스토어에 출시해 지금도 운영 중입니다.",
      role: "Backend & DevOps",
      techStack: [
        "Spring Boot 3.x", "Java 17", "Elasticsearch", "Redis", "PostgreSQL",
        "QueryDSL", "Docker", "GitHub Actions", "Oracle Cloud", "FastAPI"
      ],
      techChoices: [
        {
          title: "Elasticsearch + nori",
          reason: "RDBMS의 LIKE 검색은 한글을 형태소로 나누지 못해 원하는 글이 검색되지 않았습니다. nori 분석기로 형태소 단위 색인을 구성했습니다."
        },
        {
          title: "WebSocket · STOMP + Redis",
          reason: "실시간 채팅에서는 연결이 끊겨도 메시지가 사라지면 안 됩니다. Redis를 버퍼로 두고 재전송에 사용합니다."
        },
        {
          title: "JPA + QueryDSL",
          reason: "게시판과 채팅, 신고까지 도메인이 넓어서 조회 조건이 계속 추가됐습니다. 동적 쿼리를 타입 안전하게 조립하기 위해 사용했습니다."
        },
        {
          title: "Blue-Green + GitHub Actions",
          reason: "학생들이 실제로 사용하는 앱이어서 배포 중에 서비스가 끊기면 안 됐습니다. 새 컨테이너를 미리 띄워두고 트래픽만 옮깁니다."
        }
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
      summary: "지역 기반 Q&A에 생성형 AI의 즉시 답변을 결합한 커뮤니티 플랫폼에서 백엔드를 이끌었습니다.",
      highlights: [
        "질문을 등록하면 커스텀 프롬프트로 AI가 즉시 답변해, 사람이 답할 때까지 비어 있던 대기 시간을 없앴습니다.",
        "WebSocket과 STOMP에 Redis 중앙 세션을 붙여, 서버가 여러 대여도 실시간 채팅이 흩어지지 않게 했습니다.",
        "GitHub Actions로 Blue-Green 파이프라인을 구성하고 Swagger 문서와 Discord 알림을 자동화했습니다."
      ],
      description: "동양미래대학교 컴퓨터소프트웨어공학과 2024년 졸업작품(NOMAD)입니다. 기존 Q&A 플랫폼의 두 가지 약점, 느린 응답 시간과 낮은 신뢰도를 함께 풀어보려 했습니다.\n\n답이 달릴 때까지 비어 있는 시간은 생성형 AI의 즉시 답변으로 메우고, 신뢰도는 같은 동네 이웃이라는 조건으로 확보했습니다. 사용자는 자기 동네 이웃과 실시간으로 주고받으며 지역 정보를 빠르게 얻습니다.",
      role: "Backend Lead (인프라 구축, 채팅 개발, Rest API 개발)",
      techStack: [
        "Spring Boot", "Java", "PostgreSQL", "Redis", "WebSocket", "STOMP",
        "ChatGPT API", "Docker", "GitHub Actions", "AWS", "Swagger", "Spring AI"
      ],
      techChoices: [
        {
          title: "생성형 AI 초기 답변",
          reason: "질문을 올려도 사람이 답할 때까지 비어 있는 시간이 이탈로 이어졌습니다. 그 시간을 AI 답변으로 채웠습니다."
        },
        {
          title: "WebSocket · STOMP + Redis",
          reason: "서버가 여러 대여도 같은 방의 메시지가 흩어지지 않도록 Redis를 중앙 세션으로 두었습니다."
        },
        {
          title: "위치 기반 필터",
          reason: "이웃에게 묻는다는 전제를 지키려면 지역 범위를 기준으로 질문과 사용자를 묶어야 했습니다."
        },
        {
          title: "GitHub Actions CI/CD",
          reason: "졸업작품이어서 배포가 잦았습니다. 손으로 올리는 단계를 없애 실수를 줄였습니다."
        }
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
      hasDetail: true,
      category: "회사 프로젝트 · 앤유코퍼레이션",
      title: "블록스 (myblocks)",
      subtitle: "모노레포 전 영역에서 페이지 빌더와 커머스, 정산을 담당했습니다",
      period: "2026.03 - 현재",
      status: { label: "운영 중", tone: "success" as const },
      summary:
        "링크인바이오 페이지 빌더에서 시작해 커머스와 정산, 메시징까지 이어붙인 서비스입니다. 페이지 빌더를 처음부터 만들었고, 결제가 끝난 뒤에야 문제가 드러나는 경로를 막는 데 가장 많은 시간을 썼습니다.",
      highlights: [
        "약 5개월 반 동안 모노레포 전 영역에서 커밋 1,389개와 PR 405건(머지 332건)을 남겼습니다.",
        "페이지 빌더를 처음부터 구현했습니다. 블록 11종과 모바일 미리보기 실시간 동기화가 여기에 포함됩니다.",
        "주문과 결제를 Step Functions 사가로 전환하면서 Lambda 10개와 보상 단계를 분리했습니다.",
        "결제 사고 세 종류를 차단했습니다. 알림톡 지연으로 인한 환불, CRM 변수 불일치, 결제 직후 삭제입니다."
      ],
      description:
        "크리에이터가 링크인바이오 페이지를 만들고, 그 페이지에서 바로 상품을 파는 플랫폼입니다. 2026년 3월부터 어드민·클라이언트·슈퍼어드민·공용 패키지·Amplify 백엔드를 오가며 작업했고, 배포 PR을 뺀 집계로 커밋 1,389개와 PR 405건(머지 332건)이 남았습니다.\n\n핵심인 페이지 빌더를 처음부터 만들었습니다. 블록 리스트 편집 화면과 모바일 미리보기를 실시간으로 맞추고, 단일링크부터 상품판매·상품리뷰까지 블록 타입을 하나씩 붙였습니다. 그 위에 장바구니와 주문, 결제, 정산으로 이어지는 판매 흐름 전체와 알림톡과 CRM, 인스타그램 DM 같은 메시징을 추가했습니다.\n\n가장 많은 시간을 쓴 부분은 기능이 아니라, 결제가 끝난 뒤에야 문제가 드러나는 경로였습니다. 알림톡 발송이 지연되면 결제 사가의 보상 체인이 작동해 정상 결제를 환불시키던 경로, CRM 변수가 어긋나 결제만 되고 발송은 0건이던 사고, 결제 직후 상품을 삭제하면 구매 콘텐츠가 사라지던 허점이 여기에 해당합니다. 이 세 가지를 먼저 막았습니다.",
      role: "Backend · 모노레포 전 영역",
      techStack: [
        "Next.js", "TypeScript", "DynamoDB", "Step Functions", "Lambda", "SQS + DLQ",
        "OpenSearch", "AWS Amplify", "S3 + CloudFront", "Cloudflare Stream · R2",
        "토스페이먼츠", "토스 지급대행", "카카오 알림톡", "NextAuth", "TipTap", "Puppeteer"
      ],
      techChoices: [
        {
          title: "주문·결제를 Step Functions 사가로",
          reason: "주문과 결제는 단계가 이어지고 중간에 실패하면 앞 단계를 되돌려야 합니다. 상태 머신으로 정의해두면 어디에서 멈췄는지 로그를 찾아보지 않아도 확인할 수 있고, 보상 단계를 별도 Lambda로 분리할 수 있습니다."
        },
        {
          title: "SQS + DLQ",
          reason: "인스타그램 웹훅이나 엑셀 export처럼 우리 사정과 무관하게 들어오거나 오래 걸리는 작업은 큐로 받았습니다. 처리에 실패한 건은 DLQ에 남겨 유실 없이 재처리합니다."
        },
        {
          title: "DynamoDB",
          reason: "페이지와 블록, 주문, 알림은 키로 찾는 접근이 대부분이고 트래픽이 몰리는 구간이어서 관리형 키-값 저장소를 사용했습니다. 대신 조회 패턴이 늘어날수록 핫패스에 중복 조회가 생기기 쉬워, 그 부분을 계속 점검해야 했습니다."
        },
        {
          title: "OpenSearch",
          reason: "발송 이력 집계와 히트맵처럼 키-값 조회로는 처리할 수 없고 RDB로도 부담이 큰 질의는 검색 엔진에 맡겼습니다."
        },
        {
          title: "Cloudflare Stream · R2",
          reason: "영상은 업로드 원본과 재생 스트림을 따로 다뤄야 합니다. R2로 받아 SQS를 거쳐 Stream으로 전달하는 파이프라인을 만들었고, egress 요금이 없는 R2를 원본 보관에 사용했습니다."
        },
        {
          title: "AWS Amplify",
          reason: "모노레포에서 백엔드와 두 프런트엔드가 따로 배포되면 순서가 어긋납니다. 백엔드 배포가 끝난 뒤에 admin과 client 빌드를 webhook으로 실행하도록 연결했습니다."
        },
        {
          title: "토스 지급대행",
          reason: "판매자에게 직접 송금하려면 별도의 자격이 필요합니다. 지급은 대행에 맡기고 우리는 정산 원장의 정확성만 책임지도록 역할을 나눴습니다."
        },
        {
          title: "Puppeteer 헤드리스",
          reason: "이사오기는 타사 페이지가 자바스크립트로 그려낸 결과를 읽어야 하기 때문에, HTTP 응답을 파싱하는 것만으로는 부족했습니다."
        }
      ],
      features: [
        {
          title: "페이지 빌더",
          description: "블록 리스트 편집 화면과 모바일 미리보기를 실시간으로 동기화하고, 단일링크·그룹링크·SNS·일정·지도·검색·영상·게시물·라이브·상품판매·상품리뷰 블록을 구현했습니다."
        },
        {
          title: "페이지 디자인",
          description: "배경·색상·폰트 설정과 렌더러 반영을 붙이고 px() 반응형 규칙을 정해, 편집 화면과 공개 페이지의 결과가 어긋나지 않게 했습니다."
        },
        {
          title: "커머스 플로우",
          description: "장바구니·주문·마이콘텐츠·상품 상세를 만들고 토스페이먼츠 바로구매·장바구니·배송지를 연동했습니다. 주문 취소와 환불의 상태 전이 정합성도 함께 맞췄습니다."
        },
        {
          title: "주문·결제 사가",
          description: "Step Functions 기반 사가로 전환해 Lambda 10개와 보상 단계를 분리했습니다."
        },
        {
          title: "정산 · 지급대행",
          description: "셀러 정산 원장과 토스 지급대행 셀러 등록·지급 자동화를 만들고 PG정산과 셀러정산 구조를 분리했습니다. 정산 컷오버·선점 롤백·웹훅 유입 제한까지 포함합니다."
        },
        {
          title: "메시징",
          description: "카카오 알림톡·CRM 예약 발송과 자동환불, 템플릿 라이브러리와 그룹 발송, 버튼 링크 변수, 인스타 자동 DM의 팔로워 분기와 이미지 캐러셀을 붙였습니다."
        },
        {
          title: "영상 파이프라인",
          description: "R2 → SQS → Cloudflare Stream으로 업로드를 넘기고 VOD 재생 페이지를 만들었습니다."
        },
        {
          title: "인증 · 개인정보",
          description: "휴대폰 인증과 로그인 Rate Limit, 사업자 인증 게이트를 두고, 마스킹·동의·엑셀 반출·차단 로그의 판정 기준을 사업자 인증 상태 하나로 통일했습니다. 리뷰 IDOR·상품 상세 XSS·presigned 우회도 막았습니다."
        },
        {
          title: "인프라",
          description: "S3 + CloudFront CDN과 이미지 리사이징 파이프라인, Amplify 빌드 오케스트레이션, 비동기 엑셀 export(Lambda + SQS + DLQ), OpenSearch 색인을 맡았습니다."
        },
        {
          title: "슈퍼어드민",
          description: "회원·상품·결제 관리와 무료 이용권·비즈니스 플랜 수기 발급, 계정 차단과 반출·삭제 로그, 정기결제 현황 탭을 만들었습니다."
        },
        {
          title: "온보딩 · 이사오기",
          description: "12스텝 투어와 스텝별 UI 잠금으로 이탈을 막고, 타사 프로필 링크를 자동으로 가져오는 이사오기를 붙였습니다."
        },
        {
          title: "개발 규율",
          description: "CLAUDE.md를 200줄 제한 + 토픽별 docs 분리 구조로 세우고 문서-코드 드리프트 감사를 정기 실행했습니다. npm run check 게이트에 정적 스캐너와 도메인 단위테스트 21종을 걸었습니다."
        }
      ],
      troubleshooting: [
        {
          title: "알림톡 발송이 늦으면 정상 결제가 환불됐다",
          problem: "결제 자체는 문제없이 끝났는데, 알림톡 발송이 늦어지면 그 결제가 되돌려지는 경로가 있었습니다.",
          cause: "단건 알림톡 발송이 결제 사가의 한 단계로 들어가 있었고 타임아웃이 없었습니다. 카카오 쪽 지연이 길어지면 사가가 실패로 판정되고 보상 체인이 돌아 결제를 취소했습니다.",
          solution: "단건 발송에 5초 타임아웃을 걸어 발송 지연이 사가의 성패를 좌우하지 못하게 끊었습니다.",
          results: [
            { label: "발송 지연으로 인한 정상 결제 환불", before: "가능", after: "차단" }
          ]
        },
        {
          title: "결제는 됐는데 발송이 0건이었다",
          problem: "CRM 광고메시지에서 결제만 끝나고 실제 발송은 0건인 사고가 있었습니다.",
          cause: "본문 템플릿이 쓰는 변수와 업로드한 수신자 데이터의 변수가 맞지 않아도 결제 단계를 그대로 통과했습니다. 어긋난 건 발송 시점에야 드러났습니다.",
          solution: "결제 전에 템플릿 변수 정합성을 검사하고, 본문에서 지운 변수는 variableMeta에서 자동으로 정리되게 했습니다.",
          results: [
            { label: "변수 불일치 상태의 결제 통과", before: "가능", after: "결제 전 차단" }
          ]
        },
        {
          title: "결제 직후 상품을 지우면 산 콘텐츠가 사라졌다",
          problem: "판매자가 결제 직후 상품을 삭제하면 구매자가 이미 산 콘텐츠가 영구히 사라졌습니다.",
          cause: "하드 삭제 가드가 결제 완료(PAID) 구간을 덮지 못했습니다.",
          solution: "가드를 PAID 창까지 확장하고, 상품판매 블록을 지울 때는 삭제 대신 판매를 중단시키도록 바꿨습니다.",
          results: [
            { label: "결제 직후 삭제로 인한 콘텐츠 소실", before: "가능", after: "차단" }
          ]
        },
        {
          title: "페이지 편집에 처음 들어갈 때 호출이 일곱 번 나갔다",
          problem: "페이지 편집 화면 첫 진입이 느렸습니다.",
          cause: "화면을 그리는 데 필요한 데이터를 조각내어 각각 따로 불러오고 있었습니다.",
          solution: "첫 진입에 필요한 조회를 한 번의 배치 호출로 묶었습니다.",
          results: [
            { label: "페이지 편집 첫 진입 호출", before: "7회", after: "1회", delta: "-85.7%" }
          ]
        },
        {
          title: "편집 화면에서 탭을 옮길 때마다 멈춰 보였다",
          problem: "편집 화면의 탭을 바꿀 때 화면이 잠깐 멈춰 새로고침처럼 보였습니다.",
          cause: "라우트를 미리 받는 요청이 순서 없이 한꺼번에 나가, 정작 지금 필요한 것이 늦게 도착했습니다.",
          solution: "프리페치를 순차화해 전환 직전에 필요한 라우트부터 받게 했습니다.",
          results: [
            { label: "편집 3탭 전환", before: "201ms", after: "38ms", delta: "-81.1%" }
          ]
        },
        {
          title: "로그인하고 들어오는 길에 불필요한 왕복이 있었다",
          problem: "로그인 직후 홈과 편집 화면에 들어가는 동안 대기가 있었습니다.",
          cause: "홈이 클라이언트에서 데이터를 다시 받아왔고 편집 화면은 mount 시점에 서버 액션을 호출했습니다. 미들웨어도 핫패스에서 같은 조회를 중복으로 했습니다.",
          solution: "홈을 RSC로 전환하고 mount 시점의 서버 액션을 제거했으며, 미들웨어의 중복 조회를 없애고 남은 조회를 병렬로 처리했습니다.",
          results: [
            { label: "편집 화면 mount 시 서버 액션", before: "POST 발생", after: "POST 0회" },
            { label: "핫패스 중복 DynamoDB 조회", before: "중복 있음", after: "제거" }
          ]
        }
      ],
      links: { site: "myblocks.kr" },
      image: ""
    }
  ]
};

export type Project = (typeof portfolioData.projects)[number];
