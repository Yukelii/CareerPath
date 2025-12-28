import type { RoadmapData, RoadmapEdgeData, RoadmapNodeData, RoadmapGroupData } from '../../types/roadmap';

/* =========================
   COLOR PALETTE
========================= */
const COLORS = {
  intro: '#FFFACD',
  core: '#FFEB3B',
  advanced: '#E8E8E8',
  white: '#FFFFFF',
};

/* =========================
   NODES (UNIQUE fe-* IDs)
========================= */
const frontendNodes: RoadmapNodeData[] = [
  {
    id: 'internet-id',
    title: 'Internet',
    description: 'Understand how the internet works: HTTP, DNS, browsers, hosting, and basic networking.',
    level: 'intro',
    color: COLORS.intro,
    size: 'lg',
    position: { x: 500, y: 100 },
    resources: [
      {
        type: 'article',
        label: 'How the Internet Works (MDN)',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work',
      },
    ],
  },
  {
    id: 'html-id',
    title: 'HTML',
    description: 'Semantic HTML, elements, forms, accessibility, and document structure.',
    level: 'intro',
    color: COLORS.intro,
    size: 'lg',
    position: { x: 500, y: 220 },
    resources: [
      {
        type: 'article',
        label: 'MDN HTML Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      },
    ],
  },
  {
    id: 'css-id',
    title: 'CSS',
    description: 'Box model, layouts, Flexbox, Grid, positioning, and responsive design.',
    level: 'core',
    color: COLORS.core,
    size: 'lg',
    position: { x: 500, y: 280 },
    resources: [
      {
        type: 'article',
        label: 'MDN CSS Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      },
    ],
  },
  {
    id: 'javascript-id',
    title: 'JavaScript Basics',
    description: 'Variables, functions, DOM manipulation, events, and asynchronous concepts.',
    level: 'core',
    color: COLORS.core,
    size: 'lg',
    position: { x: 500, y: 340 },
    resources: [
      {
        type: 'article',
        label: 'MDN JavaScript Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
      },
    ],
  },
  {
    id: 'versioncontrol-id',
    title: 'Version Control',
    description: 'Learn Git basics, repository workflows, branching, and collaboration using GitHub.',
    level: 'core',
    color: COLORS.core,
    size: 'lg',
    position: { x: 500, y: 460 },
    resources: [
      {
        type: 'article',
        label: 'MDN Version Control Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Version_control',
      },
    ],
  },
  {
    id: 'vcshost-id',
    title: 'VCS Hosting',
    description: 'Learn Git basics, repository workflows, branching, and collaboration using GitHub.',
    level: 'core',
    color: COLORS.core,
    size: 'lg',
    position: { x: 500, y: 520 },
    resources: [
      {
        type: 'article',
        label: 'MDN Version Control Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Version_control',
      },
    ],
  },
  {
    id: 'git-id',
    title: 'Git',
    description: 'Learn Git basics, branching, and collaboration using GitHub.',
    level: 'core',
    color: COLORS.core,
    size: 'md',
    position: { x: 280, y: 466 },
    resources: [
      {
        type: 'article',
        label: 'MDN Version Control Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Version_control',
      },
    ],
  },
  {
    id: 'github-id',
    title: 'GitHub',
    description: 'Learn how to host repositories, collaborate, and use GitHub workflows effectively.',
    level: 'core',
    color: COLORS.core,
    size: 'md',
    position: { x: 280, y: 526 },
    resources: [
      {
        type: 'article',
        label: 'GitHub Learning Lab',
        url: 'https://lab.github.com/',
      },
    ],
  },
  {
    id: 'gitlab-id',
    title: 'GitLab',
    description: 'Learn how to host repositories, manage projects, and collaborate using GitLab workflows.',
    level: 'core',
    color: COLORS.core,
    size: 'md',
    position: { x: 120, y: 526 },
    resources: [
      {
        type: 'article',
        label: 'GitLab Learn',
        url: 'https://learn.gitlab.com/',
      },
    ],
  },
  {
    id: 'packagemanager-id',
    title: 'Package Managers',
    description: 'Learn how to install, update, and manage project dependencies using npm, yarn, or pnpm.',
    level: 'core',
    color: COLORS.core,
    size: 'lg',
    position: { x: 850, y: 520 },
    resources: [
      {
        type: 'article',
        label: 'MDN Package Management Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Package_management',
      },
    ],
  },
  {
    id: 'npm-id',
    title: 'npm',
    description: 'Learn how to install, update, and manage JavaScript dependencies using npm.',
    level: 'core',
    color: COLORS.core,
    size: 'sm',
    position: { x: 800, y: 350 },
    resources: [
      {
        type: 'article',
        label: 'npm Documentation',
        url: 'https://docs.npmjs.com/',
      },
    ],
  },
  {
    id: 'pnpm-id',
    title: 'pnpm',
    description: 'Learn a fast and efficient alternative to npm for managing JavaScript dependencies.',
    level: 'core',
    color: COLORS.core,
    size: 'sm',
    position: { x: 800, y: 400 },
    resources: [
      {
        type: 'article',
        label: 'pnpm Documentation',
        url: 'https://pnpm.io/',
      },
    ],
  },
  {
    id: 'yarn-id',
    title: 'Yarn',
    description: 'Learn how to manage JavaScript dependencies using Yarn as an alternative to npm.',
    level: 'core',
    color: COLORS.core,
    size: 'sm',
    position: { x: 975, y: 350 },
    resources: [
      {
        type: 'article',
        label: 'Yarn Documentation',
        url: 'https://yarnpkg.com/getting-started',
      },
    ],
  },
  {
    id: 'bun-id',
    title: 'Bun',
    description: 'Learn a modern JavaScript runtime and package manager focused on speed and simplicity.',
    level: 'core',
    color: COLORS.core,
    size: 'sm',
    position: { x: 975, y: 400 },
    resources: [
      {
        type: 'article',
        label: 'Bun Documentation',
        url: 'https://bun.sh/docs',
      },
    ],
  },
  {
    id: 'cssframework-id',
    title: 'CSS Frameworks',
    description: 'Learn reusable UI systems that speed up styling and layout.',
    level: 'core',
    color: COLORS.core,
    size: 'lg',
    position: { x: 850, y: 640 },
    resources: [
      {
        type: 'article',
        label: 'MDN CSS Frameworks Overview',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout',
      },
    ],
  },
  {
    id: 'tailwind-id',
    title: 'Tailwind CSS',
    description: 'Learn utility-first CSS to build modern, responsive user interfaces.',
    level: 'core',
    color: COLORS.core,
    size: 'lg',
    position: { x: 850, y: 720 },
    resources: [
      {
        type: 'article',
        label: 'Tailwind CSS Documentation',
        url: 'https://tailwindcss.com/docs',
      },
    ],
  },
  {
    id: 'learnframework-id',
    title: 'Learn a Framework',
    description: 'Choose and learn a frontend framework or library to build scalable user interfaces.',
    level: 'core',
    color: COLORS.core,
    size: 'lg',
    position: { x: 500, y: 900 },
    resources: [
      {
        type: 'article',
        label: 'MDN Frontend Frameworks Overview',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks',
      },
    ],
  },
  {
    id: 'linter-id',
    title: 'Linters & Formatters',
    description: 'Choose and learn a frontend framework or library to build scalable user interfaces.',
    level: 'core',
    color: COLORS.core,
    size: 'md',
    position: { x: 770, y: 906   },
    resources: [
      {
        type: 'article',
        label: 'MDN Frontend Frameworks Overview',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks',
      },
    ],
  },
  {
    id: 'biome-id',
    title: 'Biome',
    description: 'Learn a fast JavaScript and TypeScript toolchain for formatting, linting, and code quality checks.',
    level: 'core',
    color: COLORS.core,
    size: 'sm',
    position: { x: 975, y: 850 },
    resources: [
      {
        type: 'official',
        label: 'Biome Documentation',
        url: 'https://biomejs.dev/docs/',
      },
    ],
  },
  {
    id: 'prettier-id',
    title: 'Prettier',
    description: 'Learn an opinionated code formatter that enforces consistent style for JavaScript, TypeScript, CSS, and more.',
    level: 'core',
    color: COLORS.core,
    size: 'sm',
    position: { x: 975, y: 910 },
    resources: [
      {
        type: 'official',
        label: 'Prettier Documentation',
        url: 'https://prettier.io/docs/en/',
      },
    ],
  },
  {
    id: 'eslint-id',
    title: 'ESLint',
    description: 'Learn a static code analysis tool that helps identify and fix problems in JavaScript and TypeScript code.',
    level: 'core',
    color: COLORS.core,
    size: 'sm',
    position: { x: 975, y: 970 },
    resources: [
      {
        type: 'official',
        label: 'ESLint Documentation',
        url: 'https://eslint.org/docs/latest/',
      },
    ],
  },
  
  {
    id: 'modulebundlers-id',
    title: 'Module Bundlers',
    description: 'Learn how module bundlers combine, optimize, and serve JavaScript, CSS, and assets for production-ready web applications.',
    level: 'core',
    color: COLORS.core,
    size: 'lg',
    position: { x: 750, y: 1050 },
    resources: [
      {
        type: 'article',
        label: 'MDN: Client-side tooling overview',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools',
      },
    ],
  },
  {
    id: 'solidjs-id',
    title: 'Solid JS',
    description: 'Learn a modern JavaScript framework for building fast, reactive user interfaces with fine-grained reactivity.',
    level: 'core',
    color: COLORS.core,
    size: 'md',
    position: { x: 200, y: 940 },
    resources: [
      {
        type: 'official',
        label: 'SolidJS Official Docs',
        url: 'https://www.solidjs.com/docs/latest',
      },
    ],
  },
  {
    id: 'svelte-id',
    title: 'Svelte',
    description: 'Learn a compiler-based framework that builds highly efficient web applications with minimal runtime overhead.',
    level: 'core',
    color: COLORS.core,
    size: 'md',
    position: { x: 200, y: 880 },
    resources: [
      {
        type: 'official',
        label: 'Svelte Official Docs',
        url: 'https://svelte.dev/docs',
      },
    ],
  },
  {
    id: 'angular-id',
    title: 'Angular',
    description: 'Learn a full-featured framework for building large-scale, maintainable web applications using TypeScript.',
    level: 'core',
    color: COLORS.core,
    size: 'md',
    position: { x: 200, y: 820 },
    resources: [
      {
        type: 'official',
        label: 'Angular Official Docs',
        url: 'https://angular.io/docs',
      },
    ],
  },
  {
    id: 'vuejs-id',
    title: 'Vue.js',
    description: 'Learn a progressive JavaScript framework for building user interfaces with an approachable and flexible API.',
    level: 'core',
    color: COLORS.core,
    size: 'md',
    position: { x: 200, y: 760 },
    resources: [
      {
        type: 'official',
        label: 'Vue.js Official Docs',
        url: 'https://vuejs.org/guide/introduction.html',
      },
    ],
  },
  {
    id: 'react-id',
    title: 'React',
    description: 'Learn a popular JavaScript library for building component-based user interfaces using a declarative approach.',
    level: 'core',
    color: COLORS.core,
    size: 'md',
    position: { x: 200, y: 700 },
    resources: [
      {
        type: 'official',
        label: 'React Official Docs',
        url: 'https://react.dev/',
      },
    ],
  },
  {
    id: 'vite-id',
    title: 'Vite',
    description: 'Learn a fast frontend build tool that bundles, serves, and hot-reloads JavaScript and CSS for modern web applications.',
    level: 'core',
    color: COLORS.core,
    size: 'lg',
    position: { x: 750, y: 1135 },
    resources: [
      {
        type: 'official',
        label: 'Vite Official Docs',
        url: 'https://vitejs.dev/guide/',
      },
    ],
  },
  {
    id: 'swc-id',
    title: 'SWC',
    description: 'Learn a super-fast JavaScript and TypeScript compiler that transforms and minifies code for modern web applications.',
    level: 'core',
    color: COLORS.core,
    size: 'sm',
    position: { x: 730, y: 1200 },
    resources: [
      {
        type: 'official',
        label: 'SWC Official Docs',
        url: 'https://swc.rs/docs/getting-started',
      },
    ],
  },
  {
    id: 'esbuild-id',
    title: 'ESBuild',
    description: 'Learn a fast frontend build tool that bundles, serves, and hot-reloads JavaScript and CSS for modern web applications.',
    level: 'core',
    color: COLORS.core,
    size: 'sm',
    position: { x: 850, y: 1200 },
    resources: [
      {
        type: 'official',
        label: 'ESBuild Official Docs',
        url: 'https://esbuild.github.io/',
      },
    ],
  },
  {
    id: 'rollup-id',
    title: 'Rollup',
    description: 'Learn a module bundler that compiles small pieces of code into larger, optimized JavaScript files for production.',
    level: 'core',
    color: COLORS.core,
    size: 'sm',
    position: { x: 790, y: 1240 },
    resources: [
      {
        type: 'official',
        label: 'Rollup Official Docs',
        url: 'https://rollupjs.org/guide/en/',
      },
    ],
  },
  {
    id: 'parcel-id',
    title: 'Parcel',
    description: 'Learn a zero-configuration frontend build tool that bundles JavaScript, CSS, and assets with fast performance and hot reloading.',
    level: 'core',
    color: COLORS.core,
    size: 'lg',
    position: { x: 750, y: 1280 },
    resources: [
      {
        type: 'official',
        label: 'Parcel Official Docs',
        url: 'https://parceljs.org/getting-started/',
      },
    ],
  },
   {
    id: 'testing-id',
    title: 'Testing',
    description: 'Learn how to write tests for your JavaScript and TypeScript code to ensure correctness, maintainability, and reliability.',
    level: 'core',
    color: COLORS.core,
    size: 'lg',
    position: { x: 450, y: 1050 },
    resources: [
      {
        type: 'article',
        label: 'MDN: Testing JavaScript',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Testing',
      },
    ],
  },  
  {
    id: 'auth-id',
    title: 'Auth Strategies',
    description: 'Learn common authentication methods, including session-based, token-based, and OAuth strategies for web applications.',
    level: 'core',
    color: COLORS.core,
    size: 'md',
    position: { x: 470, y: 1150 },
    resources: [
      {
        type: 'article',
        label: 'MDN: HTTP authentication',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication',
      },
    ],
  },
  {
    id: 'vitest-id',
    title: 'Vitest',
    description: 'Learn a fast and lightweight testing framework built for Vite projects, supporting unit and integration tests.',
    level: 'core',
    color: COLORS.core,
    size: 'md',
    position: { x: 200, y: 1052 },
    resources: [
      {
        type: 'official',
        label: 'Vitest Official Docs',
        url: 'https://vitest.dev/guide/',
      },
    ],
  },

  {
    id: 'jest-id',
    title: 'Jest',
    description: 'Learn a JavaScript testing framework for writing unit tests, snapshot tests, and mocking to ensure code correctness.',
    level: 'core',
    color: COLORS.core,
    size: 'md',
    position: { x: 200, y: 1112 },
    resources: [
      {
        type: 'official',
        label: 'Jest Official Docs',
        url: 'https://jestjs.io/docs/getting-started',
      },
    ],
  },
  {
    id: 'playwright-id',
    title: 'Playwright',
    description: 'Learn an end-to-end testing framework for web applications that supports multiple browsers and reliable automated tests.',
    level: 'core',
    color: COLORS.core,
    size: 'md',
    position: { x: 200, y: 1172 },
    resources: [
      {
        type: 'official',
        label: 'Playwright Official Docs',
        url: 'https://playwright.dev/docs/intro',
      },
    ],
  },
  {
    id: 'cypress-id',
    title: 'Cypress',
    description: 'Learn an end-to-end testing framework for web applications that allows you to write, run, and debug tests efficiently.',
    level: 'core',
    color: COLORS.core,
    size: 'md',
    position: { x: 200, y: 1232 },
    resources: [
      {
        type: 'official',
        label: 'Cypress Official Docs',
        url: 'https://www.cypress.io/docs/',
      },
    ],
  },



  
  












  

















];








/* =========================
   EDGES (MATCH NODE IDS)
========================= */
const frontendEdges: RoadmapEdgeData[] = [
  {
    id: 'fe-e1',
    source: 'internet-id',
    target: 'html-id',
    type: 'elbow',
  },
  {
    id: 'fe-e2',
    source: 'html-id',
    target: 'css-id',
    type: 'elbow',
  },
  {
    id: 'fe-e3',
    source: 'css-id',
    target: 'javascript-id',
    type: 'elbow',
  },
  {
    id: 'fe-e4',
    source: 'javascript-id',
    target: 'versioncontrol-id',
    type: 'elbow',
  },
  {
    id: 'fe-e5',
    source: 'versioncontrol-id',
    target: 'git-id',
    type: 'elbow',
  },
  {
    id: 'fe-e6',
    source: 'versioncontrol-id',
    target: 'vcshost-id',
    type: 'elbow',
  },
  {
    id: 'fe-e7',
    source: 'vcshost-id',
    target: 'github-id',
    type: 'elbow',
  },
  {
    id: 'fe-e8',
    source: 'github-id',
    target: 'gitlab-id',
    type: 'elbow',
  },
  {
    id: 'fe-e9',
    source: 'vcshost-id',
    target: 'packagemanager-id',
    type: 'elbow',
    
  },
  {
    id: 'fe-e10',
    source: 'packagemanager-id',
    target: 'pnpm-id',
    type: 'straight',
    sourcePosition: 'top',
    targetPosition: 'bottom',
  },


  {
    id: 'fe-e11',
    source: 'packagemanager-id',
    target: 'bun-id',
    type: 'straight',
    sourcePosition: 'top',
    targetPosition: 'bottom',
  },
  {
    id: 'fe-e12',
    source: 'packagemanager-id',
    target: 'cssframework-id',
    type: 'straight',
    
  },
  {
    id: 'fe-e13',
    source: 'cssframework-id',
    target: 'tailwind-id',
    type: 'straight',
    
  },
  {
    id: 'fe-e14',
    source: 'cssframework-id',
    target: 'learnframework-id',
    type: 'elbow',
    sourcePosition: 'left',
    targetPosition: 'top',
  },
  {
    id: 'fe-e15',
    source: 'learnframework-id',
    target: 'linter-id',
    type: 'elbow',

  },
  {
    id: 'fe-e16',
    source: 'linter-id',
    target: 'eslint-id',
    type: 'straight',

  },
   {
    id: 'fe-e17',
    source: 'linter-id',
    target: 'prettier-id',
    type: 'straight',

  },
  {
    id: 'fe-e18',
    source: 'linter-id',
    target: 'biome-id',
    type: 'straight',

  },
  {
    id: 'fe-e19',
    source: 'linter-id',
    target: 'modulebundlers-id',
    type: 'straight',

  },
  {
    id: 'fe-e20',
    source: 'learnframework-id',
    target: 'solidjs-id',
    type: 'straight',

  },
  {
    id: 'fe-e21',
    source: 'learnframework-id',
    target: 'svelte-id',
    type: 'straight',

  },
  {
    id: 'fe-e22',
    source: 'learnframework-id',
    target: 'angular-id',
    type: 'straight',

  },
  {
    id: 'fe-e23',
    source: 'learnframework-id',
    target: 'vuejs-id',
    type: 'straight',

  },
  {
    id: 'fe-e24',
    source: 'learnframework-id',
    target: 'react-id',
    type: 'straight',

  },
  {
    id: 'fe-e25',
    source: 'modulebundlers-id',
    target: 'vite-id',
    type: 'straight',

  },
  {
    id: 'fe-e26',
    source: 'modulebundlers-id',
    target: 'testing-id',
    type: 'straight',

  },
  {
    id: 'fe-e27',
    source: 'testing-id',
    target: 'auth-id',
    type: 'straight',

  },
  {
    id: 'fe-e28',
    source: 'testing-id',
    target: 'vitest-id',
    type: 'straight',

  },
  {
    id: 'fe-e29',
    source: 'testing-id',
    target: 'jest-id',
    type: 'straight',

  },
  {
    id: 'fe-e30',
    source: 'testing-id',
    target: 'playwright-id',
    type: 'straight',

  },
  {
    id: 'fe-e31',
    source: 'testing-id',
    target: 'cypress-id',
    type: 'straight',

  },
  

    
    
    

];

/* =========================
   ROADMAP EXPORT
========================= */
export const frontEndRoadmap: RoadmapData = {
  id: 'front-end',
  title: 'Frontend Developer',
  subtitle: 'Roadmap to becoming a Frontend Developer in 2025',
  nodes: frontendNodes,
  edges: frontendEdges,
};
