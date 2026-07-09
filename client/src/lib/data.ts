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
      { category: "LANGUAGE / RUNTIME", items: ["TypeScript", "Next.js", "React", "Node.js"] },
      { category: "AWS SERVERLESS", items: ["Lambda", "Step Functions", "SQS + DLQ", "EventBridge", "CDK"] },
      { category: "DATA / SEARCH", items: ["DynamoDB", "Upstash Redis", "OpenSearch"] },
      { category: "EDGE / TOOLING", items: ["Cloudflare", "Turborepo", "Sentry"] }
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
