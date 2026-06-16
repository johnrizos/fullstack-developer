export type Lesson = {
  id: string;
  title: string;
  description: string;
  project: string;
  skills: string[];
  href: string;
};

export const lessonDurationsMinutes: Record<string, number> = {
  "web-basics": 35,
  "html-css": 45,
  "html-semantics": 40,
  "html-forms-accessibility": 50,
  "css-box-model": 40,
  "css-flex-responsive": 55,
  "css-grid-layouts": 55,
  "javascript-intro": 50,
  "javascript-logic": 55,
  "javascript-arrays-objects": 60,
  "javascript-dom-forms": 65,
  "javascript-scope-closures": 70,
  "javascript-this-prototypes": 70,
  "javascript-async-event-loop": 75,
  "javascript-fetch-errors": 70,
  "javascript-modules-patterns": 65,
  "javascript-interview-drills": 80,
  "git-github": 55,
  "agile-scrum-kanban": 45,
  "job-ready-practice": 60,
  "milestone-projects": 70,
  "code-review-practice": 70,
  "typescript": 75,
  "testing-debugging": 70,
  "react-rendering-model": 70,
  "react-components-props": 65,
  "react-state-events": 70,
  "react-effects": 75,
  "react-hooks-in-depth": 80,
  "react-context-state": 75,
  "react-performance": 80,
  "react-data-fetching": 80,
  "react-patterns-production": 85,
  "nextjs-routing-layouts": 70,
  "nextjs-server-client-components": 75,
  "nextjs-data-fetching-streaming": 80,
  "nextjs-caching-rendering": 85,
  "nextjs-server-actions": 75,
  "nextjs-route-handlers": 70,
  "nextjs-error-loading": 65,
  "nextjs-metadata-seo": 60,
  "nextjs-optimization-production": 85,
  "frontend-testing": 80,
  "node-runtime-modules": 70,
  "node-async-streams": 80,
  "node-express": 75,
  "node-middleware-errors": 70,
  "node-validation-security": 80,
  "node-architecture": 80,
  "node-nestjs": 85,
  "node-persistence": 80,
  "node-testing": 75,
  "node-production": 85,
  "rest-apis": 75,
  "graphql-basics": 70,
  "python-foundations": 60,
  "python-collections": 65,
  "python-iterators-generators": 70,
  "python-oop-typing": 75,
  "python-decorators-context-managers": 75,
  "python-advanced-typing": 80,
  "python-stdlib": 75,
  "python-fastapi": 80,
  "python-sqlalchemy": 85,
  "python-async-jobs": 85,
  "python-data-ai": 85,
  "python-performance": 80,
  "python-production": 85,
  "websockets-realtime": 75,
  "api-integrations": 70,
  "architecture-monolith-microservices": 80,
  "db-relational-modeling": 75,
  "db-sql-queries": 80,
  "db-indexing-performance": 85,
  "db-transactions-acid": 80,
  "db-orm-n-plus-one": 80,
  "db-migrations-schema": 80,
  "db-scaling-replication": 85,
  "db-design-interview": 85,
  "nosql-foundations": 70,
  "nosql-document": 75,
  "nosql-key-value": 70,
  "nosql-wide-column": 75,
  "nosql-data-modeling": 80,
  "nosql-consistency-scaling": 80,
  "nosql-choosing-polyglot": 75,
  "redis-caching-sessions": 75,
  "db-engines-compared": 65,
  "authentication": 80,
  "web-security": 80,
  "linux-command-line": 55,
  "linux-server-ssh": 70,
  "linux-processes-logs-services": 70,
  "deployment": 75,
  "docker-ci-cd": 80,
  "observability": 75,
  "capstone": 120,
  "final-assessment": 60,
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
        id: "react",
        title: "React + TypeScript",
        description:
          "Από το rendering model μέχρι production: ένα πλήρες React mastery track με hooks, state management, performance, server state, patterns και testing — σε interview βάθος.",
        lessons: [
          {
            id: "react-rendering-model",
            title: "Rendering & Reconciliation",
            description: "UI = f(state), re-renders, virtual DOM diffing, keys και γιατί το reference equality έχει σημασία.",
            project: "Visualizer που δείχνει πότε και γιατί ξανα-renderάρει κάθε component.",
            skills: ["re-render", "reconciliation", "keys"],
            href: "/lessons/react-rendering-model",
          },
          {
            id: "react-components-props",
            title: "Components, Props & Composition",
            description: "Typed props contracts, children, composition vs configuration και one-way data flow.",
            project: "Reusable component library με typed props και composition.",
            skills: ["props", "composition", "children"],
            href: "/lessons/react-components-props",
          },
          {
            id: "react-state-events",
            title: "State, Events & Forms",
            description: "useState, immutable updates, functional updates, controlled inputs και event handling.",
            project: "Controlled form με typed state και validation.",
            skills: ["useState", "controlled inputs", "immutability"],
            href: "/lessons/react-state-events",
          },
          {
            id: "react-effects",
            title: "Effects & Lifecycle",
            description: "useEffect, cleanup, dependency array, race conditions και πότε ΔΕΝ χρειάζεσαι effect.",
            project: "Data loader με AbortController, cleanup και loading/error states.",
            skills: ["useEffect", "cleanup", "race conditions"],
            href: "/lessons/react-effects",
          },
          {
            id: "react-hooks-in-depth",
            title: "Hooks in Depth",
            description: "useRef, useReducer, useMemo, useCallback, custom hooks και οι κανόνες των hooks.",
            project: "Custom hooks (useToggle, useDebounce, useFetch) και reducer-based state.",
            skills: ["useReducer", "custom hooks", "useRef"],
            href: "/lessons/react-hooks-in-depth",
          },
          {
            id: "react-context-state",
            title: "Context & State Management",
            description: "Context, prop drilling, re-render traps και πότε φεύγεις σε external store (Zustand/Redux).",
            project: "Theme + auth context χωρίς περιττά re-renders.",
            skills: ["Context", "prop drilling", "state management"],
            href: "/lessons/react-context-state",
          },
          {
            id: "react-performance",
            title: "Performance & Optimization",
            description: "React.memo, useMemo/useCallback, re-render causes, profiling και list virtualization.",
            project: "Profile & βελτιστοποίηση αργής λίστας με μετρήσιμη διαφορά.",
            skills: ["memo", "profiling", "virtualization"],
            href: "/lessons/react-performance",
          },
          {
            id: "react-data-fetching",
            title: "Data Fetching & Server State",
            description: "Server state vs UI state, React Query/SWR, caching, Suspense και error boundaries.",
            project: "Data layer με caching, retries και error boundary.",
            skills: ["React Query", "caching", "Suspense"],
            href: "/lessons/react-data-fetching",
          },
          {
            id: "react-patterns-production",
            title: "Patterns, Testing & Production",
            description: "Composition patterns, error boundaries, accessibility και testing με React Testing Library.",
            project: "Tested, accessible feature με σωστά patterns.",
            skills: ["patterns", "testing", "accessibility"],
            href: "/lessons/react-patterns-production",
          },
        ],
      },
      {
        id: "nextjs",
        title: "Next.js (App Router)",
        description:
          "Από το file-system routing μέχρι production: ένα πλήρες Next.js 16 mastery track με Server/Client Components, streaming, Cache Components, Server Actions, route handlers, metadata και deployment.",
        lessons: [
          {
            id: "nextjs-routing-layouts",
            title: "App Router & File-System Routing",
            description: "page/layout, nested routes, dynamic segments [slug], params/searchParams ως Promises και Link.",
            project: "Multi-page app με nested layouts και dynamic routes.",
            skills: ["routing", "layouts", "dynamic segments"],
            href: "/lessons/nextjs-routing-layouts",
          },
          {
            id: "nextjs-server-client-components",
            title: "Server & Client Components",
            description: "RSC by default, το 'use client' boundary, πότε διαλέγεις το καθένα και interleaving.",
            project: "Server page με νησίδες client interactivity.",
            skills: ["RSC", "use client", "boundaries"],
            href: "/lessons/nextjs-server-client-components",
          },
          {
            id: "nextjs-data-fetching-streaming",
            title: "Data Fetching & Streaming",
            description: "async Server Components, fetch χωρίς default cache, Suspense, loading.js και parallel vs sequential.",
            project: "Σελίδα με streaming και parallel data loading.",
            skills: ["async components", "Suspense", "streaming"],
            href: "/lessons/nextjs-data-fetching-streaming",
          },
          {
            id: "nextjs-caching-rendering",
            title: "Caching & Rendering Strategies",
            description: "Cache Components/PPR, use cache, cacheLife/cacheTag, static shell και runtime APIs (cookies/headers).",
            project: "Σελίδα που συνδυάζει static, cached και request-time περιεχόμενο.",
            skills: ["use cache", "PPR", "cacheLife"],
            href: "/lessons/nextjs-caching-rendering",
          },
          {
            id: "nextjs-server-actions",
            title: "Server Actions & Mutations",
            description: "use server, forms, useActionState, revalidatePath/Tag, redirect και pending states.",
            project: "Form mutation με validation, revalidation και redirect.",
            skills: ["Server Actions", "useActionState", "revalidate"],
            href: "/lessons/nextjs-server-actions",
          },
          {
            id: "nextjs-route-handlers",
            title: "Route Handlers & APIs",
            description: "route.ts, HTTP methods, Web Request/Response, NextRequest/NextResponse και RouteContext typing.",
            project: "REST endpoints με route handlers και typed context.",
            skills: ["route.ts", "NextResponse", "HTTP methods"],
            href: "/lessons/nextjs-route-handlers",
          },
          {
            id: "nextjs-error-loading",
            title: "Error & Loading UI",
            description: "error.tsx (unstable_retry), not-found, global-error και expected vs uncaught errors.",
            project: "Route με error boundaries, not-found και loading states.",
            skills: ["error.tsx", "notFound", "loading"],
            href: "/lessons/nextjs-error-loading",
          },
          {
            id: "nextjs-metadata-seo",
            title: "Metadata, SEO & OG Images",
            description: "Metadata object, generateMetadata, ImageResponse (next/og), sitemap/robots και streaming metadata.",
            project: "SEO-ready σελίδες με dynamic OG images.",
            skills: ["generateMetadata", "ImageResponse", "SEO"],
            href: "/lessons/nextjs-metadata-seo",
          },
          {
            id: "nextjs-optimization-production",
            title: "Optimization & Production",
            description: "next/image, next/font, Proxy (πρώην Middleware), env vars/NEXT_PUBLIC και deployment.",
            project: "Production build με optimized images, fonts και proxy.",
            skills: ["next/image", "Proxy", "deployment"],
            href: "/lessons/nextjs-optimization-production",
          },
        ],
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
    id: "databases",
    title: "Databases",
    description:
      "Από relational modeling μέχρι NoSQL και production: SQL, NoSQL, caching με Redis και πώς διαλέγεις engine — σε interview βάθος.",
    lessons: [
      {
        id: "sql",
        title: "SQL (Relational Databases)",
        description:
          "Από το data modeling μέχρι production: πλήρες relational mastery track με schema design, queries, indexing, transactions, ORMs, migrations και scaling — σε interview βάθος.",
        lessons: [
          {
            id: "db-relational-modeling",
            title: "Relational Modeling & Normalization",
            description: "Tables, primary/foreign keys, σχέσεις (1-1, 1-N, N-N), normalization και πότε denormalize.",
            project: "Σχεδιασμός schema για e-shop με σωστές σχέσεις.",
            skills: ["keys", "relationships", "normalization"],
            href: "/lessons/db-relational-modeling",
          },
          {
            id: "db-sql-queries",
            title: "SQL Queries & Joins",
            description: "SELECT/WHERE, JOIN types, GROUP BY, aggregations, subqueries και CTEs.",
            project: "Analytics queries πάνω σε relational dataset.",
            skills: ["JOIN", "GROUP BY", "subqueries"],
            href: "/lessons/db-sql-queries",
          },
          {
            id: "db-indexing-performance",
            title: "Indexing & Query Performance",
            description: "B-tree indexes, EXPLAIN/query plans, composite indexes και πότε ένα index βλάπτει.",
            project: "Βελτιστοποίηση αργού query με index και μέτρηση.",
            skills: ["indexes", "EXPLAIN", "query plan"],
            href: "/lessons/db-indexing-performance",
          },
          {
            id: "db-transactions-acid",
            title: "Transactions, ACID & Isolation",
            description: "ACID, isolation levels, locking, deadlocks και race conditions σε concurrent writes.",
            project: "Money transfer με transaction που αντέχει concurrency.",
            skills: ["ACID", "isolation", "locking"],
            href: "/lessons/db-transactions-acid",
          },
          {
            id: "db-orm-n-plus-one",
            title: "ORMs, N+1 & Data Access",
            description: "ORM vs raw SQL, το N+1 problem, eager/lazy loading και connection pooling.",
            project: "Refactor data layer χωρίς N+1, με pooling.",
            skills: ["ORM", "N+1", "pooling"],
            href: "/lessons/db-orm-n-plus-one",
          },
          {
            id: "db-migrations-schema",
            title: "Schema Migrations & Evolution",
            description: "Migrations, versioning, zero-downtime αλλαγές, backfills και rollback strategy.",
            project: "Zero-downtime schema change με migration + backfill.",
            skills: ["migrations", "zero-downtime", "backfill"],
            href: "/lessons/db-migrations-schema",
          },
          {
            id: "db-scaling-replication",
            title: "Scaling, Replication & Partitioning",
            description: "Read replicas, replication lag, sharding/partitioning, connection limits και caching layer.",
            project: "Scaling plan για read-heavy service.",
            skills: ["replication", "sharding", "scaling"],
            href: "/lessons/db-scaling-replication",
          },
          {
            id: "db-design-interview",
            title: "Schema Design & Interview Practice",
            description: "Πρακτικό relational data modeling, trade-offs, κλασικές SQL ερωτήσεις και πώς απαντάς σε design.",
            project: "Σχεδιασμός schema για πραγματικό feature από την αρχή.",
            skills: ["design", "trade-offs", "interview"],
            href: "/lessons/db-design-interview",
          },
        ],
      },
      {
        id: "nosql",
        title: "NoSQL (Non-Relational)",
        description:
          "Από τους τύπους NoSQL μέχρι production data modeling: document, key-value, wide-column, access-pattern design, consistency/CAP και πότε διαλέγεις τι — σε interview βάθος.",
        lessons: [
          {
            id: "nosql-foundations",
            title: "NoSQL Foundations",
            description: "Οι 4 τύποι, SQL vs NoSQL, ACID vs BASE, CAP theorem και πότε φεύγεις από relational.",
            project: "Χάρτης: ποιος τύπος NoSQL για ποιο πρόβλημα και γιατί.",
            skills: ["NoSQL types", "BASE", "CAP"],
            href: "/lessons/nosql-foundations",
          },
          {
            id: "nosql-document",
            title: "Document Databases (MongoDB)",
            description: "Document modeling, embed vs reference, queries, indexes και aggregation pipeline.",
            project: "Document schema για blog με σωστές αποφάσεις embed/reference.",
            skills: ["documents", "embed/reference", "aggregation"],
            href: "/lessons/nosql-document",
          },
          {
            id: "nosql-key-value",
            title: "Key-Value Stores (Redis & DynamoDB)",
            description: "Key-value model, TTL, access patterns, partition keys και πότε ταιριάζει.",
            project: "Key design για session/cart/leaderboard σε key-value store.",
            skills: ["key-value", "TTL", "partition key"],
            href: "/lessons/nosql-key-value",
          },
          {
            id: "nosql-wide-column",
            title: "Wide-Column Stores (Cassandra)",
            description: "Partition & clustering keys, query-first design, write-heavy workloads και tunable consistency.",
            project: "Cassandra table design από access patterns ενός feed.",
            skills: ["partition key", "query-first", "write-heavy"],
            href: "/lessons/nosql-wide-column",
          },
          {
            id: "nosql-data-modeling",
            title: "NoSQL Data Modeling",
            description: "Access-pattern-driven design, denormalization, single-table design και σχέσεις χωρίς joins.",
            project: "Single-table design για app με πολλαπλά access patterns.",
            skills: ["denormalization", "single-table", "access patterns"],
            href: "/lessons/nosql-data-modeling",
          },
          {
            id: "nosql-consistency-scaling",
            title: "Consistency, Replication & Scaling",
            description: "Eventual consistency, quorum (R+W>N), replication, sharding, conflict resolution και PACELC.",
            project: "Consistency/scaling plan για distributed NoSQL store.",
            skills: ["eventual consistency", "quorum", "sharding"],
            href: "/lessons/nosql-consistency-scaling",
          },
          {
            id: "nosql-choosing-polyglot",
            title: "Choosing a Store & Polyglot Persistence",
            description: "Decision framework SQL vs NoSQL, polyglot persistence, migration considerations και interview practice.",
            project: "Διάλεξε & δικαιολόγησε stores για ένα multi-feature product.",
            skills: ["decision", "polyglot", "interview"],
            href: "/lessons/nosql-choosing-polyglot",
          },
        ],
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
        id: "db-engines-compared",
        title: "Choosing a Database Engine",
        description: "PostgreSQL vs MySQL vs SQLite vs MongoDB: διαφορές, πότε ποιο, embedded vs server και operational concerns.",
        project: "Διάλεξε & δικαιολόγησε engine για 3 διαφορετικά apps.",
        skills: ["PostgreSQL", "MySQL", "SQLite"],
        href: "/lessons/db-engines-compared",
      },
    ],
  },
  {
    id: "auth-security",
    title: "Auth & Security",
    description: "Προστατεύεις χρήστες, routes και APIs: authentication, authorization και web security.",
    lessons: [
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
        id: "linux",
        title: "Linux & Command Line",
        description:
          "Το terminal που τρέχει πίσω από κάθε deploy: command line basics, Linux server με SSH, και πώς κρατάς processes/services ζωντανά με logs — η βάση κάθε backend/DevOps δουλειάς.",
        lessons: [
          {
            id: "linux-command-line",
            title: "Command Line Basics",
            description: "Terminal vs shell, navigation, χειρισμός αρχείων, pipes/redirection, exit codes και αλυσίδωση εντολών.",
            project: "Βρες το πιο πρόσφατο error ενός app μόνο μέσω terminal.",
            skills: ["shell", "pipes", "redirection"],
            href: "/lessons/linux-command-line",
          },
          {
            id: "linux-server-ssh",
            title: "Linux Server & SSH",
            description: "VPS, SSH keys vs passwords, scp/rsync, users/sudo, permissions (chmod/chown), firewall/ports και reverse proxy.",
            project: "Στήσε key-based, hardened πρόσβαση σε φρέσκο VPS.",
            skills: ["SSH", "permissions", "reverse proxy"],
            href: "/lessons/linux-server-ssh",
          },
          {
            id: "linux-processes-logs-services",
            title: "Processes, Logs & Services",
            description: "Processes & signals, graceful shutdown, ports, systemd services με auto-restart, journalctl/logs και cron.",
            project: "Κάνε ένα Node app production-grade systemd service.",
            skills: ["systemd", "signals", "journalctl"],
            href: "/lessons/linux-processes-logs-services",
          },
        ],
      },
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
  estimatedMinutes: number;
};

export const allLessons: LessonWithSection[] = curriculum.flatMap((section, sectionIndex) =>
  section.lessons.flatMap((item) => {
    const base = { sectionId: section.id, sectionTitle: section.title, sectionIndex };
    if (isLessonGroup(item)) {
      return item.lessons.map((lesson) => ({
        ...lesson,
        ...base,
        groupTitle: item.title,
        estimatedMinutes: lessonDurationsMinutes[lesson.id] ?? 60,
      }));
    }
    return [{ ...item, ...base, estimatedMinutes: lessonDurationsMinutes[item.id] ?? 60 }];
  }),
);

export const totalEstimatedMinutes = allLessons.reduce((total, lesson) => total + lesson.estimatedMinutes, 0);

export function getLessonsEstimatedMinutes(lessons: Lesson[]) {
  return lessons.reduce((total, lesson) => total + (lessonDurationsMinutes[lesson.id] ?? 60), 0);
}

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} λεπτά`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hourLabel = hours === 1 ? "ώρα" : "ώρες";

  if (remainingMinutes === 0) return `${hours} ${hourLabel}`;
  return `${hours} ${hourLabel} ${remainingMinutes} λεπτά`;
}

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
