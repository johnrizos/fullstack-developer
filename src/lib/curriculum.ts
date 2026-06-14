export type Lesson = {
  id: string;
  title: string;
  description: string;
  project: string;
  skills: string[];
  href: string;
};

// A topic that is too big for one page (π.χ. Python, Node.js): groups several
// sub-lessons under a single heading inside a section.
export type LessonGroup = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type SectionItem = Lesson | LessonGroup;

export type CurriculumSection = {
  id: string;
  title: string;
  description: string;
  lessons: SectionItem[];
};

export function isLessonGroup(item: SectionItem): item is LessonGroup {
  return "lessons" in item;
}

// Όλα τα leaf lessons μιας ενότητας, "ισιωμένα" (groups ανοιγμένα), με τη σειρά τους.
export function flattenItems(items: SectionItem[]): Lesson[] {
  return items.flatMap((item) => (isLessonGroup(item) ? item.lessons : [item]));
}

export const curriculum: CurriculumSection[] = [
  {
    id: "web",
    title: "Web Foundations",
    description: "Πριν γράψεις κώδικα, καταλαβαίνεις τι συμβαίνει ανάμεσα σε browser και server.",
    lessons: [
      {
        id: "web-basics",
        title: "Τι είναι το Web;",
        description: "Internet, browser, server και request/response.",
        project: "Χάρτης client-server με δικά σου λόγια.",
        skills: ["Internet", "Browser", "Server"],
        href: "/lessons/web-basics",
      },
    ],
  },
  {
    id: "html-css",
    title: "HTML & CSS",
    description: "Χτίζεις τη δομή, την προσβασιμότητα και το layout των πρώτων σου σελίδων.",
    lessons: [
      {
        id: "html-css",
        title: "HTML & CSS Basics",
        description: "Tags, απλή δομή σελίδας και πρώτες CSS αλλαγές.",
        project: "Προσωπική profile card.",
        skills: ["HTML tags", "CSS selectors", "Live preview"],
        href: "/lessons/html-css",
      },
      {
        id: "html-semantics",
        title: "HTML Structure & Semantics",
        description: "Semantic elements που δίνουν νόημα στη σελίδα.",
        project: "Semantic article page.",
        skills: ["header", "main", "section", "article"],
        href: "/lessons/html-semantics",
      },
      {
        id: "html-forms-accessibility",
        title: "HTML Forms & Accessibility",
        description: "Inputs, labels, buttons και βασική προσβασιμότητα.",
        project: "Accessible contact form.",
        skills: ["forms", "labels", "inputs"],
        href: "/lessons/html-forms-accessibility",
      },
      {
        id: "css-box-model",
        title: "CSS Box Model",
        description: "Margin, padding, border, width και σωστές αποστάσεις.",
        project: "Spacing card.",
        skills: ["box model", "padding", "margin", "border"],
        href: "/lessons/css-box-model",
      },
      {
        id: "css-flex-responsive",
        title: "CSS Flexbox & Responsive Layouts",
        description: "Flexbox, wrapping και responsive navigation.",
        project: "Responsive nav bar.",
        skills: ["flexbox", "gap", "wrap"],
        href: "/lessons/css-flex-responsive",
      },
      {
        id: "css-grid-layouts",
        title: "CSS Grid & Page Layouts",
        description: "Grid columns, card layouts, dashboard structure και responsive page layouts.",
        project: "Responsive dashboard grid.",
        skills: ["grid", "columns", "responsive"],
        href: "/lessons/css-grid-layouts",
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Η βασική γλώσσα του fullstack path: fundamentals, DOM, async, runtime behavior και interview-level concepts.",
    lessons: [
      {
        id: "javascript-intro",
        title: "JavaScript Basics",
        description: "Variables, functions, events και πρώτη διαδραστικότητα.",
        project: "Interactive counter.",
        skills: ["variables", "functions", "events"],
        href: "/lessons/javascript-intro",
      },
      {
        id: "javascript-logic",
        title: "JavaScript Logic",
        description: "Conditions, loops και αποφάσεις στον κώδικα.",
        project: "Pass/fail score checker.",
        skills: ["if", "else", "loops"],
        href: "/lessons/javascript-logic",
      },
      {
        id: "javascript-arrays-objects",
        title: "JavaScript Arrays & Objects",
        description: "Λίστες δεδομένων, objects και rendering.",
        project: "Task list renderer.",
        skills: ["arrays", "objects", "map"],
        href: "/lessons/javascript-arrays-objects",
      },
      {
        id: "javascript-dom-forms",
        title: "JavaScript DOM, Forms & Storage",
        description: "DOM manipulation, submit events και localStorage.",
        project: "Saved notes form.",
        skills: ["DOM", "forms", "localStorage"],
        href: "/lessons/javascript-dom-forms",
      },
      {
        id: "javascript-scope-closures",
        title: "Scope, Hoisting & Closures",
        description: "Το πιο συχνό interview core: scope chains, lexical scope, hoisting και closures.",
        project: "Counter factory με closure.",
        skills: ["scope", "closures", "hoisting"],
        href: "/lessons/javascript-scope-closures",
      },
      {
        id: "javascript-this-prototypes",
        title: "this, Prototypes & Classes",
        description: "Πώς δουλεύουν το this, prototype chain, classes και object methods.",
        project: "Small user model with methods.",
        skills: ["this", "prototype", "class"],
        href: "/lessons/javascript-this-prototypes",
      },
      {
        id: "javascript-async-event-loop",
        title: "Async JavaScript & Event Loop",
        description: "Call stack, task queue, microtasks, promises, async/await και timers.",
        project: "Async timeline visualizer.",
        skills: ["event loop", "promises", "async/await"],
        href: "/lessons/javascript-async-event-loop",
      },
      {
        id: "javascript-fetch-errors",
        title: "Fetch, Errors & API Handling",
        description: "HTTP requests, try/catch, failed responses, retries και loading/error states.",
        project: "Robust API search widget.",
        skills: ["fetch", "try/catch", "error states"],
        href: "/lessons/javascript-fetch-errors",
      },
      {
        id: "javascript-modules-patterns",
        title: "Modules & Code Organization",
        description: "Imports/exports, pure functions, separation of concerns και μικρά reusable modules.",
        project: "Modular shopping cart logic.",
        skills: ["modules", "pure functions", "architecture"],
        href: "/lessons/javascript-modules-patterns",
      },
      {
        id: "javascript-interview-drills",
        title: "JavaScript Interview Drills",
        description: "Κλασικές ερωτήσεις: equality, coercion, closures, async output order και array methods.",
        project: "Interview question bank με εξηγήσεις.",
        skills: ["coercion", "output order", "array methods"],
        href: "/lessons/javascript-interview-drills",
      },
    ],
  },
  {
    id: "developer-workflow",
    title: "Developer Workflow",
    description: "Τα εργαλεία που χρειάζεσαι για να δουλεύεις σαν πραγματικός developer.",
    lessons: [
      {
        id: "git-github",
        title: "Git & GitHub",
        description: "Commits, branches, pull requests και συνεργασία σε κώδικα.",
        project: "Πρώτο repository με καθαρό README.",
        skills: ["commit", "branch", "pull request"],
        href: "/lessons/git-github",
      },
      {
        id: "agile-scrum-kanban",
        title: "Agile, Scrum & Kanban",
        description: "Πώς δουλεύουν tickets, boards, sprints, standups και acceptance criteria σε ομάδα.",
        project: "Kanban board για το capstone project.",
        skills: ["Scrum", "Kanban", "tickets"],
        href: "/lessons/agile-scrum-kanban",
      },
      {
        id: "job-ready-practice",
        title: "Job-Ready Practice & Portfolio",
        description: "Deliverables, acceptance criteria και portfolio tasks για να μετατρέψεις το roadmap σε job-ready έργα.",
        project: "Audit και portfolio plan για το capstone.",
        skills: ["portfolio", "acceptance criteria", "README"],
        href: "/lessons/job-ready-practice",
      },
      {
        id: "milestone-projects",
        title: "Milestone Projects",
        description: "Τέσσερα αυξανόμενα projects που αποδεικνύουν progression από HTML/CSS μέχρι fullstack.",
        project: "MILESTONES.md με acceptance criteria.",
        skills: ["projects", "rubrics", "portfolio"],
        href: "/lessons/milestone-projects",
      },
      {
        id: "code-review-practice",
        title: "Code Review Practice",
        description: "Πώς βρίσκεις bugs, security risks, missing validation και edge cases σε πραγματικό κώδικα.",
        project: "Self-review σε παλιό PR ή feature.",
        skills: ["review", "debugging", "quality"],
        href: "/lessons/code-review-practice",
      },
      {
        id: "typescript",
        title: "TypeScript",
        description: "Τύποι, interfaces, generics και πιο ασφαλής JavaScript σε frontend και backend.",
        project: "Typed task model και API response types.",
        skills: ["types", "interfaces", "generics"],
        href: "/lessons/typescript",
      },
      {
        id: "testing-debugging",
        title: "Testing & Debugging",
        description: "Πώς βρίσκεις bugs και πώς γράφεις βασικά tests.",
        project: "Tested utility functions.",
        skills: ["debugger", "unit tests", "errors"],
        href: "/lessons/testing-debugging",
      },
    ],
  },
  {
    id: "frontend-apps",
    title: "Frontend App Development",
    description: "Μετατρέπεις HTML/CSS/JS γνώση σε React εφαρμογές με TypeScript και production patterns.",
    lessons: [
      {
        id: "react-ecosystem",
        title: "React + TypeScript",
        description: "Components, props, hooks, typed state και event handlers σε πραγματικές οθόνες.",
        project: "Typed todo app με φίλτρα.",
        skills: ["components", "props", "typed state"],
        href: "/lessons/react-ecosystem",
      },
      {
        id: "nextjs-app-router",
        title: "Next.js App Router + TypeScript",
        description: "Pages, layouts, routing, server/client components, metadata και typed data loading.",
        project: "Multi-page portfolio app.",
        skills: ["routing", "layouts", "server components"],
        href: "/lessons/nextjs-app-router",
      },
      {
        id: "frontend-testing",
        title: "React Testing",
        description: "Component tests, user flows και βασική κάλυψη με React Testing Library ή Playwright.",
        project: "Tested form and todo interactions.",
        skills: ["RTL", "Playwright", "user flows"],
        href: "/lessons/frontend-testing",
      },
    ],
  },
  {
    id: "backend-apis",
    title: "Backend & APIs",
    description: "Φτιάχνεις server-side λογική και endpoints που μιλάνε με το frontend.",
    lessons: [
      {
        id: "node",
        title: "Node.js, Express & NestJS",
        description:
          "Από το runtime και τα async patterns μέχρι production: ένα πλήρες backend track με Express, NestJS, persistence, testing και scaling.",
        lessons: [
          {
            id: "node-runtime-modules",
            title: "Node Runtime & Modules",
            description: "V8, libuv, event loop, single-threaded non-blocking I/O, CommonJS vs ESM, process & env.",
            project: "Πειράματα event loop ordering και ESM setup.",
            skills: ["event loop", "non-blocking I/O", "ESM"],
            href: "/lessons/node-runtime-modules",
          },
          {
            id: "node-async-streams",
            title: "Async Patterns & Streams",
            description: "callbacks→promises→async/await, Promise.all/allSettled, EventEmitter και streams/backpressure.",
            project: "Παράλληλα API calls και stream pipeline για μεγάλο αρχείο.",
            skills: ["async/await", "Promise.all", "streams"],
            href: "/lessons/node-async-streams",
          },
          {
            id: "node-express",
            title: "Express Fundamentals",
            description: "Routing, req/res lifecycle, status codes, routers και λεπτοί handlers.",
            project: "CRUD tasks API με σωστά status codes.",
            skills: ["Express", "routing", "status codes"],
            href: "/lessons/node-express",
          },
          {
            id: "node-middleware-errors",
            title: "Middleware & Error Handling",
            description: "Middleware pipeline, centralized error handler και το async error trap.",
            project: "Production-grade error handling χωρίς κρεμασμένα requests.",
            skills: ["middleware", "error handler", "async errors"],
            href: "/lessons/node-middleware-errors",
          },
          {
            id: "node-validation-security",
            title: "Validation & Security",
            description: "Zod schema validation, helmet/CORS/rate limit, injection, secrets και password hashing.",
            project: "Ασφάλιση API με validation και security controls.",
            skills: ["Zod", "security", "bcrypt"],
            href: "/lessons/node-validation-security",
          },
          {
            id: "node-architecture",
            title: "Layered Architecture",
            description: "routes/services/repositories, validated config και dependency injection.",
            project: "Refactor fat controller σε καθαρά στρώματα.",
            skills: ["layering", "config", "DI"],
            href: "/lessons/node-architecture",
          },
          {
            id: "node-nestjs",
            title: "NestJS in Depth",
            description: "Modules, controllers, providers, dependency injection, pipes/guards/interceptors.",
            project: "Feature module με DI, validation και guard.",
            skills: ["NestJS", "DI", "guards"],
            href: "/lessons/node-nestjs",
          },
          {
            id: "node-persistence",
            title: "Persistence with Prisma",
            description: "Type-safe schema, CRUD, relations, N+1 problem, transactions και migrations.",
            project: "Data layer χωρίς N+1 με transaction και migration.",
            skills: ["Prisma", "N+1", "transactions"],
            href: "/lessons/node-persistence",
          },
          {
            id: "node-testing",
            title: "Testing Node APIs",
            description: "Unit tests (Jest/Vitest), integration με Supertest, mocking και testing pyramid.",
            project: "Test suite με unit + integration και error paths.",
            skills: ["Vitest", "Supertest", "mocking"],
            href: "/lessons/node-testing",
          },
          {
            id: "node-production",
            title: "Performance, Scaling & Production",
            description: "cluster/horizontal scaling, worker_threads, Redis caching, graceful shutdown και observability.",
            project: "Production-ready service με caching, shutdown και logging.",
            skills: ["scaling", "caching", "observability"],
            href: "/lessons/node-production",
          },
        ],
      },
      {
        id: "rest-apis",
        title: "REST APIs",
        description: "HTTP methods, status codes, request/response και API contracts.",
        project: "CRUD API contract.",
        skills: ["GET", "POST", "status codes"],
        href: "/lessons/rest-apis",
      },
      {
        id: "graphql-basics",
        title: "GraphQL Basics",
        description: "Queries, mutations και πότε έχει νόημα σε σχέση με REST.",
        project: "Simple GraphQL schema.",
        skills: ["schema", "queries", "mutations"],
        href: "/lessons/graphql-basics",
      },
      {
        id: "python",
        title: "Python",
        description:
          "Από τα foundations μέχρι production FastAPI services: μια πλήρης διαδρομή για AI/data/background-job services δίπλα στο main app.",
        lessons: [
          {
            id: "python-foundations",
            title: "Python Foundations",
            description: "Syntax, dynamic+strong typing, truthiness, functions και Pythonic idioms vs JavaScript.",
            project: "Μετατροπή JavaScript-style λογικής σε Pythonic κώδικα.",
            skills: ["syntax", "typing model", "functions"],
            href: "/lessons/python-foundations",
          },
          {
            id: "python-collections",
            title: "Collections & Comprehensions",
            description: "list/dict/set/tuple, comprehensions, slicing, unpacking και generators.",
            project: "Pythonic data wrangling πάνω σε λίστα από records.",
            skills: ["comprehensions", "generators", "slicing"],
            href: "/lessons/python-collections",
          },
          {
            id: "python-iterators-generators",
            title: "Iterators, Generators & Lazy Evaluation",
            description: "Iteration protocol, generators, yield from, lazy pipelines και itertools.",
            project: "Lazy data pipeline που επεξεργάζεται 'τεράστιο' αρχείο με σταθερή μνήμη.",
            skills: ["iterators", "generators", "itertools"],
            href: "/lessons/python-iterators-generators",
          },
          {
            id: "python-oop-typing",
            title: "OOP, Type Hints & Dataclasses",
            description: "Classes, self, dunder methods, type hints, mypy και @dataclass.",
            project: "Typed domain model με dataclasses.",
            skills: ["classes", "type hints", "dataclasses"],
            href: "/lessons/python-oop-typing",
          },
          {
            id: "python-decorators-context-managers",
            title: "Decorators & Context Managers",
            description: "Decorators (με/χωρίς params, functools.wraps), closures applied και context managers.",
            project: "Reusable decorators (timing/retry/cache) και transaction context manager.",
            skills: ["decorators", "functools.wraps", "with"],
            href: "/lessons/python-decorators-context-managers",
          },
          {
            id: "python-advanced-typing",
            title: "Advanced Typing",
            description: "Generics (TypeVar), Protocol, type narrowing, Literal/TypedDict και mypy --strict.",
            project: "Generic, typed utility module που περνά mypy --strict.",
            skills: ["generics", "Protocol", "mypy"],
            href: "/lessons/python-advanced-typing",
          },
          {
            id: "python-stdlib",
            title: "Standard Library Mastery",
            description: "collections, functools, itertools, pathlib και timezone-aware datetime.",
            project: "Λύση κλασικών data προβλημάτων μόνο με stdlib.",
            skills: ["collections", "functools", "pathlib"],
            href: "/lessons/python-stdlib",
          },
          {
            id: "python-fastapi",
            title: "FastAPI Services",
            description: "Endpoints, Pydantic validation, dependency injection και contract με το main app.",
            project: "Python service που δέχεται job και επιστρέφει result.",
            skills: ["FastAPI", "Pydantic", "Depends"],
            href: "/lessons/python-fastapi",
          },
          {
            id: "python-sqlalchemy",
            title: "Databases with SQLAlchemy & Alembic",
            description: "Typed ORM models, select()/Session CRUD, relationships, N+1 problem, transactions, migrations.",
            project: "Data layer με relationships χωρίς N+1 και Alembic migration.",
            skills: ["SQLAlchemy", "N+1", "Alembic"],
            href: "/lessons/python-sqlalchemy",
          },
          {
            id: "python-async-jobs",
            title: "Async, Concurrency & Background Jobs",
            description: "GIL, asyncio vs threads vs processes, queue + worker, retries και status flow.",
            project: "Background job pipeline με queue, worker και status.",
            skills: ["GIL", "asyncio", "Celery"],
            href: "/lessons/python-async-jobs",
          },
          {
            id: "python-data-ai",
            title: "Data & AI with Python",
            description: "numpy/pandas vectorization, data wrangling, model serving και production AI/LLM patterns.",
            project: "Service που κάνει vectorized data processing και σερβίρει predictions.",
            skills: ["numpy", "pandas", "model serving"],
            href: "/lessons/python-data-ai",
          },
          {
            id: "python-performance",
            title: "Performance & Profiling",
            description: "timeit/cProfile, Big-O δομών, performance traps, caching και πότε φεύγεις από pure Python.",
            project: "Profile & βελτιστοποίηση αργού script με μετρήσεις.",
            skills: ["cProfile", "Big-O", "caching"],
            href: "/lessons/python-performance",
          },
          {
            id: "python-production",
            title: "Testing, Packaging & Production",
            description: "pytest, fixtures/mocking, virtual environments, packaging, Docker και config από env.",
            project: "Tested, containerized FastAPI service με health check.",
            skills: ["pytest", "venv", "deployment"],
            href: "/lessons/python-production",
          },
        ],
      },
      {
        id: "websockets-realtime",
        title: "WebSockets & Real-Time Apps",
        description: "Persistent connections για chat, notifications, live dashboards και status updates.",
        project: "Real-time notifications ή live chat flow.",
        skills: ["WebSocket", "Socket.IO", "Redis Pub/Sub"],
        href: "/lessons/websockets-realtime",
      },
      {
        id: "api-integrations",
        title: "API Integrations",
        description: "Σύνδεση με τρίτα APIs, auth headers, retries, rate limits και error handling.",
        project: "External API dashboard.",
        skills: ["fetch", "auth headers", "rate limits"],
        href: "/lessons/api-integrations",
      },
    ],
  },
  {
    id: "architecture-system-design",
    title: "Architecture & System Design",
    description: "Μαθαίνεις πότε διαλέγεις monolith, modular monolith, microservices ή hybrid architecture.",
    lessons: [
      {
        id: "architecture-monolith-microservices",
        title: "Monolith, Microservices & Hybrid Architecture",
        description: "Πώς οργανώνεις ένα product από απλό monolith μέχρι ανεξάρτητα services.",
        project: "Architecture map για fullstack SaaS με core app και ξεχωριστά services.",
        skills: ["monolith", "microservices", "boundaries"],
        href: "/lessons/architecture-monolith-microservices",
      },
    ],
  },
  {
    id: "data-auth-security",
    title: "Data, Auth & Security",
    description: "Αποθηκεύεις δεδομένα και προστατεύεις χρήστες, routes και APIs.",
    lessons: [
      {
        id: "databases",
        title: "Databases",
        description: "SQL, NoSQL, schema design και βασικά queries.",
        project: "Persistent tasks database.",
        skills: ["SQL", "NoSQL", "schema"],
        href: "/lessons/databases",
      },
      {
        id: "redis-caching-sessions",
        title: "Redis, Caching & Sessions",
        description: "Key-value storage για cache, TTL, sessions, rate limits, queues και Pub/Sub.",
        project: "Cached API response με TTL και session lookup.",
        skills: ["Redis", "cache", "TTL"],
        href: "/lessons/redis-caching-sessions",
      },
      {
        id: "authentication",
        title: "Authentication & Authorization",
        description: "Login, sessions, JWT/OAuth και προστατευμένες σελίδες.",
        project: "Protected dashboard.",
        skills: ["sessions", "JWT", "OAuth"],
        href: "/lessons/authentication",
      },
      {
        id: "web-security",
        title: "Web Security Basics",
        description: "XSS, CSRF, secrets, validation και ασφαλή server-side όρια.",
        project: "Secure form handling.",
        skills: ["XSS", "CSRF", "validation"],
        href: "/lessons/web-security",
      },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Κάνεις deploy, διαβάζεις logs και οργανώνεις delivery pipeline.",
    lessons: [
      {
        id: "deployment",
        title: "Deployment & Cloud",
        description: "Build, environment variables, deploy σε Vercel/AWS/Azure/GCP και basic cloud services.",
        project: "Deploy του fullstack project.",
        skills: ["AWS", "Azure/GCP", "env vars"],
        href: "/lessons/deployment",
      },
      {
        id: "docker-ci-cd",
        title: "Docker & CI/CD",
        description: "Containers, GitHub Actions, automated checks και release workflow.",
        project: "Dockerized app with CI.",
        skills: ["Docker", "GitHub Actions", "CI/CD"],
        href: "/lessons/docker-ci-cd",
      },
      {
        id: "observability",
        title: "Logs, Monitoring & Observability",
        description: "Διαβάζεις logs, παρακολουθείς errors και καταλαβαίνεις τι συμβαίνει στην παραγωγή.",
        project: "App with structured logs and error tracking.",
        skills: ["logs", "Sentry", "metrics"],
        href: "/lessons/observability",
      },
      {
        id: "capstone",
        title: "Fullstack Capstone",
        description: "Συνδυάζεις frontend, backend, database, auth και deploy.",
        project: "Production-style fullstack app.",
        skills: ["frontend", "backend", "database"],
        href: "/lessons/capstone",
      },
      {
        id: "final-assessment",
        title: "Final Assessment",
        description: "Rubric για να κρίνεις αν το capstone είναι portfolio-ready και interview-ready.",
        project: "Self-assessment scorecard για το capstone.",
        skills: ["rubric", "capstone", "interview"],
        href: "/lessons/final-assessment",
      },
    ],
  },
];

export type LessonWithSection = Lesson & {
  sectionId: string;
  sectionTitle: string;
  sectionIndex: number;
  groupTitle?: string;
};

export const allLessons: LessonWithSection[] = curriculum.flatMap((section, sectionIndex) =>
  section.lessons.flatMap((item) => {
    const base = { sectionId: section.id, sectionTitle: section.title, sectionIndex };
    if (isLessonGroup(item)) {
      return item.lessons.map((lesson) => ({ ...lesson, ...base, groupTitle: item.title }));
    }
    return [{ ...item, ...base }];
  }),
);

export function getLessonBySlug(slug: string): LessonWithSection | undefined {
  return allLessons.find((lesson) => lesson.href === `/lessons/${slug}`);
}

export function getAdjacentLessons(slug: string): {
  previous: LessonWithSection | null;
  next: LessonWithSection | null;
} {
  const index = allLessons.findIndex((lesson) => lesson.href === `/lessons/${slug}`);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? allLessons[index - 1] : null,
    next: index < allLessons.length - 1 ? allLessons[index + 1] : null,
  };
}
