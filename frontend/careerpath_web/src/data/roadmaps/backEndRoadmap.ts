import type { RoadmapData, RoadmapEdgeData, RoadmapNodeData,RoadmapGroupData, CanvasTextData } from '../../types/roadmap';

// Simple palette
const COLORS = {
  intro: '#FFFACD',
  core: '#FFEB3B',
  advanced: '#E8E8E8',
  white: '#FFFFFF',
};



const backendNodes: RoadmapNodeData[] = [
  // TOP: Human Decision Making
  {
    id: 'internet-id',
    title: 'Internet',
    description: 'Understand how the internet works, including browsers, servers, DNS, HTTP/HTTPS, and how data flows between users and websites.',
    level: 'core',
    color: COLORS.core,
    size: 'lg',
    position: { x: 490, y: 165 },
    resources: [
      {
        type: 'article',
        label: 'MDN: How the Internet Works',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work',
      },
      {
        type: 'video',
        label: 'How the Internet Works (Computerphile)',
        url: 'https://www.youtube.com/watch?v=7_LPdttKXPc',
      },
    ],
  },

   {
    id: 'frontendbasics-id',
    title: 'Frontend Basics',
    description: 'Learn the fundamentals of frontend development, including HTML for structure, CSS for styling, and JavaScript for interactivity.',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 510, y: 250 },
    resources: [
      {
        type: 'official',
        label: 'MDN Web Docs – Frontend Basics',
        url: 'https://developer.mozilla.org/en-US/docs/Learn',
      },
    ],
  },
  {
    id: 'html-id',
    title: 'HTML',
    description: 'Learn the standard markup language used to structure content on the web, including elements, attributes, forms, and semantic HTML.',
    level: 'intro',
    size: 'sm',
    color: COLORS.intro,
    position: { x: 460, y: 325 },
    resources: [
      {
        type: 'official',
        label: 'MDN: HTML Basics',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML',
      },
    ],
  },

   {
    id: 'css-id',
    title: 'CSS',
    description: 'Learn how to style and layout web pages using CSS, including selectors, box model, flexbox, grid, and responsive design.',
    level: 'intro',
    size: 'sm',
    color: COLORS.intro,
    position: { x: 600, y: 325 },
    resources: [
      {
        type: 'official',
        label: 'MDN: CSS Basics',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS',
      },
    ],
  },
  {
    id: 'javascript-id',
    title: 'JavaScript',
    description: 'Learn the fundamentals of frontend development, including HTML for structure, CSS for styling, and JavaScript for interactivity.',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 510, y: 380 },
    resources: [
      {
        type: 'official',
        label: 'MDN Web Docs – Frontend Basics',
        url: 'https://developer.mozilla.org/en-US/docs/Learn',
      },
    ],
  },
   {
    id: 'pick-backend-id',
    title: 'Pick a Back-end Language',
    description: 'Choose a backend programming language to build server-side logic, handle requests, manage databases, and implement authentication.',
    level: 'intro',
    color: COLORS.intro,
    size: 'lg',
    position: { x: 165, y: 380 },
    resources: [
      {
        type: 'article',
        label: 'MDN: Server-side website programming',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side',
      },
    ],
  },
   {
    id: 'php-id',
    title: 'PHP',
    description: 'Learn PHP, a widely-used server-side scripting language for building dynamic websites, handling forms, working with databases, and implementing authentication.',
    level: 'intro',
    color: COLORS.intro,
    size: 'sm',
    position: { x: 135, y: 330 },
    resources: [
      {
        type: 'official',
        label: 'PHP Official Documentation',
        url: 'https://www.php.net/docs.php',
      },
    ],
  },

   {
    id: 'rust-id',
    title: 'Rust',
    description: 'Learn Rust for backend development, focusing on performance, memory safety, and building reliable web services and APIs.',
    level: 'intro',
    color: COLORS.intro,
    size: 'sm',
    position: { x: 275, y: 330 },
    resources: [
      {
        type: 'official',
        label: 'The Rust Programming Language (Book)',
        url: 'https://doc.rust-lang.org/book/',
      },
    ],
  },
   {
    id: 'java-id',
    title: 'Java',
    description: 'Learn Java for backend development, including building REST APIs, handling server-side logic, managing databases, and implementing authentication.',
    level: 'intro',
    color: COLORS.intro,
    size: 'sm',
    position: { x: 135, y: 285 },
    resources: [
      {
        type: 'official',
        label: 'Java Official Documentation',
        url: 'https://docs.oracle.com/en/java/',
      },
    ],
  },
  {
    id: 'python-id',
    title: 'Python',
    description: 'Learn Python for backend development using frameworks like Django or Flask to handle APIs, databases, and authentication.',
    level: 'intro',
    color: COLORS.intro,
    size: 'sm',
    position: { x: 135, y: 240 },
    resources: [
      {
        type: 'official',
        label: 'Python Official Documentation',
        url: 'https://docs.python.org/3/',
      },
    ],
  },
  {
    id: 'javascript-id',
    title: 'JavaScript',
    description: 'Learn JavaScript for backend development using Node.js to build scalable APIs, handle requests, and manage databases.',
    level: 'intro',
    color: COLORS.intro,
    size: 'sm',
    position: { x: 135, y: 195 },
    resources: [
      {
        type: 'official',
        label: 'Node.js Official Documentation',
        url: 'https://nodejs.org/en/docs',
      },
    ],
  },
  {
    id: 'csharp-id',
    title: 'C#',
    description: 'Learn C# for backend development using .NET to build REST APIs, handle server-side logic, manage databases, and implement authentication.',
    level: 'intro',
    color: COLORS.intro,
    size: 'sm',
    position: { x: 275, y: 285 },
    resources: [
      {
        type: 'official',
        label: 'Microsoft C# Documentation',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
      },
    ],
  },
  {
    id: 'ruby-id',
    title: 'Ruby',
    description: 'Learn Ruby for backend development using Ruby on Rails to build web applications, APIs, handle databases, and authentication.',
    level: 'intro',
    color: COLORS.intro,
    size: 'sm',
    position: { x: 275, y: 240 },
    resources: [
      {
        type: 'official',
        label: 'Ruby Official Documentation',
        url: 'https://www.ruby-lang.org/en/documentation/',
      },
    ],
  },
  {
    id: 'go-id',
    title: 'Go',
    description: 'Learn Go (Golang) for backend development to build fast, scalable APIs and microservices with strong concurrency support.',
    level: 'intro',
    color: COLORS.intro,
    size: 'sm',
    position: { x: 275, y: 195 },
    resources: [
      {
        type: 'official',
        label: 'Go Official Documentation',
        url: 'https://go.dev/doc/',
      },
    ],
  },
  {
    id: 'versioncontrol-id',
    title: 'Version Control Systems',
    description: 'Learn Go (Golang) for backend development to build fast, scalable APIs and microservices with strong concurrency support.',
    level: 'intro',
    color: COLORS.intro,
    size: 'lg',
    position: { x: 490, y: 475 },
    resources: [
      {
        type: 'official',
        label: 'Go Official Documentation',
        url: 'https://go.dev/doc/',
      },
    ],
  },
  {
    id: 'versioncontrol-id',
    title: 'Version Control Systems',
    description: 'Learn how version control systems track code changes, enable collaboration, manage history, and support branching and merging workflows.',
    level: 'intro',
    color: COLORS.intro,
    size: 'lg',
    position: { x: 490, y: 475 },
    resources: [
      {
        type: 'official',
        label: 'Git Official Documentation',
        url: 'https://git-scm.com/doc',
      },
    ],
  },
  {
    id: 'Repohosting-id',
    title: 'Repo Hosting Services',
    description: 'Learn how repository hosting platforms store Git repositories, enable collaboration, manage pull requests, issues, CI/CD, and access control.',
    level: 'intro',
    color: COLORS.intro,
    size: 'lg',
    position: { x: 490, y: 549 },
    resources: [
      {
        type: 'official',
        label: 'GitHub Docs',
        url: 'https://docs.github.com/',
      },
    ],
  },
  {
    id: 'git-id',
    title: 'Git',
    description: 'Learn Git, a distributed version control system that tracks changes in your code, supports branching, merging, and collaboration.',
    level: 'intro',
    color: COLORS.intro,
    size: 'sm',
    position: { x: 800, y: 486 },
    resources: [
      {
        type: 'official',
        label: 'Git Official Documentation',
        url: 'https://git-scm.com/doc',
      },
    ],
  },
  {
    id: 'github-id',
    title: 'GitHub',
    description: 'Learn GitHub, a popular platform for hosting Git repositories, collaborating via pull requests, managing issues, and automating workflows with CI/CD.',
    level: 'intro',
    color: COLORS.intro,
    size: 'sm',
    position: { x: 800, y: 560 },
    resources: [
      {
        type: 'official',
        label: 'GitHub Docs',
        url: 'https://docs.github.com/',
      },
    ],
  },
  {
    id: 'gitlab-id',
    title: 'GitLab',
    description: 'Learn GitLab, a Git-based platform for repository hosting, collaboration, CI/CD pipelines, issue tracking, and DevOps workflows.',
    level: 'intro',
    color: COLORS.intro,
    size: 'sm',
    position: { x: 930, y: 560 },
    resources: [
      {
        type: 'official',
        label: 'GitLab Docs',
        url: 'https://docs.gitlab.com/',
      },
    ],
  },
   {
    id: 'relational-id',
    title: 'Relational Databases',
    description: 'Learn about relational databases that store data in tables with defined relationships, and use SQL to query and manage data.',
    level: 'intro',
    color: COLORS.intro,
    size: 'lg',
    position: { x: 490, y: 680 },
    resources: [
      {
        type: 'official',
        label: 'PostgreSQL Docs',
        url: 'https://www.postgresql.org/docs/',
      },
    ],
  },
  {
    id: 'migration-id',
    title: 'Migration',
    description: 'Learn how to migrate database schemas and data between different environments, keeping data consistent and avoiding downtime.',
    level: 'intro',
    color: COLORS.intro,
    size: 'md',
    position: { x: 605, y: 625 },
    resources: [
      {
        type: 'official',
        label: 'Flyway Docs',
        url: 'https://flywaydb.org/documentation/',
      },
    ],
  },
  {
    id: 'nplus1-id',
    title: 'N+1 Problem',
    description: 'Understand the N+1 problem in database queries, why it occurs, and how to optimize queries to prevent excessive database calls.',
    level: 'intro',
    color: COLORS.intro,
    size: 'md',
    position: { x: 610, y: 750 },
    resources: [
      {
        type: 'article',
        label: 'Understanding N+1 Queries',
        url: 'https://www.railwaycoders.com/n-plus-1-problem/',
      },
    ],
  },
 {
  id: 'sqlite-id',
  title: 'SQLite',
  description: 'Learn SQLite, a lightweight, file-based relational database ideal for small projects, mobile apps, and local storage.',
  level: 'intro',
  color: COLORS.intro,
  size: 'md',
  position: { x: 250, y: 685 },
  resources: [
    {
      type: 'official',
      label: 'SQLite Documentation',
      url: 'https://www.sqlite.org/docs.html',
    },
  ],
},
{
  id: 'mariadb-id',
  title: 'MariaDB',
  description: 'Learn MariaDB, a fork of MySQL, providing open-source relational database management with enhanced features and performance.',
  level: 'intro',
  color: COLORS.intro,
  size: 'md',
  position: { x: 85, y: 685 },
  resources: [
    {
      type: 'official',
      label: 'MariaDB Documentation',
      url: 'https://mariadb.com/kb/en/documentation/',
    },
  ],
},
{
  id: 'mysql-id',
  title: 'MySQL',
  description: 'Learn MySQL, a popular relational database for web applications that supports SQL queries, transactions, and relational data structures.',
  level: 'intro',
  color: COLORS.intro,
  size: 'md',
  position: { x: 85, y: 635 },
  resources: [
    {
      type: 'official',
      label: 'MySQL Documentation',
      url: 'https://dev.mysql.com/doc/',
    },
  ],
},
{
  id: 'postgre-id',
  title: 'PostgreSQL',
  description: 'Learn PostgreSQL, a powerful open-source relational database with advanced features like JSON support, indexing, and concurrency.',
  level: 'intro',
  color: COLORS.intro,
  size: 'md',
  position: { x: 250, y: 635 },
  resources: [
    {
      type: 'official',
      label: 'PostgreSQL Documentation',
      url: 'https://www.postgresql.org/docs/',
    },
  ],
},
{
  id: 'mysql-id',
  title: 'MySQL',
  description: 'Learn MySQL, a popular relational database for web applications that supports SQL queries, transactions, and relational data structures.',
  level: 'intro',
  color: COLORS.intro,
  size: 'md',
  position: { x: 85, y: 735 },
  resources: [
    {
      type: 'official',
      label: 'MySQL Documentation',
      url: 'https://dev.mysql.com/doc/',
    },
  ],
},
{
  id: 'oracle-id',
  title: 'Oracle',
  description: 'Learn Oracle, a powerful relational database management system with advanced features like SQL, PL/SQL, high availability, and enterprise-grade tools.',
  level: 'intro',
  color: COLORS.intro,
  size: 'md',
  position: { x: 250, y: 735 },
  resources: [
    {
      type: 'official',
      label: 'Oracle Database Documentation',
      url: 'https://docs.oracle.com/en/database/',
    },
  ],
},

{
  id: 'learnaboutapi-id',
  title: 'Learn about APIs',
  description: 'Learn Oracle, a powerful relational database management system with advanced features like SQL, PL/SQL, high availability, and enterprise-grade tools.',
  level: 'intro',
  color: COLORS.intro,
  size: 'lg',
  position: { x: 490, y: 835 },
  resources: [
    {
      type: 'official',
      label: 'Oracle Database Documentation',
      url: 'https://docs.oracle.com/en/database/',
    },
  ],
},

{
  id: 'caching-id',
  title: 'Caching',
  description: 'Learn Oracle, a powerful relational database management system with advanced features like SQL, PL/SQL, high availability, and enterprise-grade tools.',
  level: 'intro',
  color: COLORS.intro,
  size: 'lg',
  position: { x: 490, y: 955 },
  resources: [
    {
      type: 'official',
      label: 'Oracle Database Documentation',
      url: 'https://docs.oracle.com/en/database/',
    },
  ],
},
{
  id: 'caching-id',
  title: 'Caching',
  description: 'Learn Oracle, a powerful relational database management system with advanced features like SQL, PL/SQL, high availability, and enterprise-grade tools.',
  level: 'intro',
  color: COLORS.intro,
  size: 'lg',
  position: { x: 490, y: 955 },
  resources: [
    {
      type: 'official',
      label: 'Oracle Database Documentation',
      url: 'https://docs.oracle.com/en/database/',
    },
  ],
},
{
  id: 'redis-id',
  title: 'Redis',
  description:
    'Learn Redis, an in-memory data structure store used as a database, cache, and message broker, known for its speed and support for data types like strings, hashes, lists, and sets.',
  level: 'intro',
  color: COLORS.intro,
  size: 'sm',
  position: { x: 530, y: 1055 },
  resources: [
    {
      type: 'official',
      label: 'Redis Documentation',
      url: 'https://redis.io/docs/',
    },
  ],
},
{
  id: 'memcached-id',
  title: 'Memcached',
  description:
    'Learn Redis, an in-memory data structure store used as a database, cache, and message broker, known for its speed and support for data types like strings, hashes, lists, and sets.',
  level: 'intro',
  color: COLORS.intro,
  size: 'md',
  position: { x: 510, y: 1100 },
  resources: [
    {
      type: 'official',
      label: 'Redis Documentation',
      url: 'https://redis.io/docs/',
    },
  ],
},
{
  id: 'httpcaching-id',
  title: 'HTTP Caching',
  description:
    'Learn how HTTP caching works to improve web performance by reducing server load and latency using cache headers like Cache-Control, ETag, and Expires.',
  level: 'intro',
  color: COLORS.intro,
  size: 'lg',
  position: { x: 490, y: 1150 },
  resources: [
    {
      type: 'official',
      label: 'MDN Web Docs – HTTP Caching',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching',
    },
  ],
},

{
  id: 'learnaboutwebservers-id',
  title: 'Learn about Web Servers',
  description:
    'Learn how HTTP caching works to improve web performance by reducing server load and latency using cache headers like Cache-Control, ETag, and Expires.',
  level: 'intro',
  color: COLORS.intro,
  size: 'lg',
  position: { x: 150, y: 1094 },
  resources: [
    {
      type: 'official',
      label: 'MDN Web Docs – HTTP Caching',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching',
    },
  ],
},

{
	id: 'nginx-id',
	title: 'Nginx',
	description:
		'Learn Nginx, a high-performance web server and reverse proxy commonly used for load balancing, HTTP caching, and serving static content efficiently.',
	level: 'intro',
	color: COLORS.intro,
	size: 'md',
	position: { x: 150, y: 1175 },
	resources: [
		{
		type: 'official',
		label: 'Nginx Documentation',
		url: 'https://nginx.org/en/docs/',
		},
	],
},

{
	id: 'apache-id',
	title: 'Apache',
	description:
		'Learn Apache HTTP Server, a widely used and flexible web server known for its module-based architecture and strong community support.',
	level: 'intro',
	color: COLORS.intro,
	size: 'md',
	position: { x: 150, y: 1225 },
	resources: [
		{
		type: 'official',
		label: 'Apache HTTP Server Documentation',
		url: 'https://httpd.apache.org/docs/',
		},
	],
},

{
	id: 'caddy-id',
	title: 'Caddy',
	description:
		'Learn Caddy, a modern web server designed for simplicity with automatic HTTPS, easy configuration, and strong defaults.',
	level: 'intro',
	color: COLORS.intro,
	size: 'md',
	position: { x: 150, y: 1275 },
	resources: [
		{
		type: 'official',
		label: 'Caddy Documentation',
		url: 'https://caddyserver.com/docs/',
		},
	],
},

{
	id: 'msiis-id',
	title: 'MS IIS',
	description:
		'Learn Microsoft IIS (Internet Information Services), a web server for Windows used to host web applications built with .NET and other technologies.',
	level: 'intro',
	color: COLORS.intro,
	size: 'md',
	position: { x: 150, y: 1325 },
	resources: [
		{
		type: 'official',
		label: 'Microsoft IIS Documentation',
		url: 'https://learn.microsoft.com/en-us/iis/',
		},
	],
},
{
  id: 'moreaboutdatabases-id',
  title: 'More about Databases',
  description:
    'Explore advanced database concepts including data modeling, indexing, replication, sharding, and performance optimization techniques.',
  level: 'intro',
  color: COLORS.intro,
  size: 'lg',
  position: { x: 150, y: 1420 },
  resources: [
    {
      type: 'official',
      label: 'PostgreSQL Documentation – Concepts',
      url: 'https://www.postgresql.org/docs/current/index.html',
    },
  ],
},
{
  id: 'transactions-id',
  title: 'Transactions',
  description:
    'Learn how database transactions ensure data consistency using commit and rollback operations, and how they group multiple queries into a single unit of work.',
  level: 'intro',
  color: COLORS.intro,
  size: 'lg',
  position: { x: 150, y: 1520 },
  resources: [
    {
      type: 'official',
      label: 'Transactions – PostgreSQL Docs',
      url: 'https://www.postgresql.org/docs/current/tutorial-transactions.html',
    },
  ],
},
{
  id: 'orms-id',
  title: 'ORMs',
  description:
    'Learn about Object-Relational Mappers (ORMs), tools that allow developers to interact with databases using objects instead of writing raw SQL.',
  level: 'intro',
  color: COLORS.intro,
  size: 'sm',
  position: { x: 130, y: 1580 },
  resources: [
    {
      type: 'official',
      label: 'ORM Overview – Prisma',
      url: 'https://www.prisma.io/docs/concepts/overview/what-is-prisma',
    },
  ],
},
{
  id: 'acid-id',
  title: 'ACID',
  description:
    'Learn the ACID properties (Atomicity, Consistency, Isolation, Durability) that guarantee reliable and predictable database transactions.',
  level: 'intro',
  color: COLORS.intro,
  size: 'sm',
  position: { x: 250, y: 1580 },
  resources: [
    {
      type: 'official',
      label: 'ACID Properties – Wikipedia',
      url: 'https://en.wikipedia.org/wiki/ACID',
    },
  ],
},
{
  id: 'normalization-id',
  title: 'Normalization',
  description:
    'Learn database normalization techniques used to reduce redundancy and improve data integrity by organizing tables efficiently.',
  level: 'intro',
  color: COLORS.intro,
  size: 'lg',
  position: { x: 150, y: 1620 },
  resources: [
    {
      type: 'official',
      label: 'Database Normalization – GeeksforGeeks',
      url: 'https://www.geeksforgeeks.org/database-normalization/',
    },
  ],
},
{
  id: 'failuremodes-id',
  title: 'Failure Modes',
  description:
    'Understand common database failure modes such as crashes, network partitions, data corruption, and how systems recover from them.',
  level: 'intro',
  color: COLORS.intro,
  size: 'lg',
  position: { x: 150, y: 1680 },
  resources: [
    {
      type: 'official',
      label: 'Database Reliability Concepts',
      url: 'https://aws.amazon.com/builders-library/',
    },
  ],
},
{
  id: 'profilingperformance-id',
  title: 'Profiling Performance',
  description:
    'Learn how to analyze and optimize database performance using query plans, indexing strategies, and profiling tools.',
  level: 'intro',
  color: COLORS.intro,
  size: 'lg',
  position: { x: 150, y: 1740 },
  resources: [
    {
      type: 'official',
      label: 'Query Performance – PostgreSQL',
      url: 'https://www.postgresql.org/docs/current/using-explain.html',
    },
  ],
},
{
  id: 'testing-id',
  title: 'Testing',
  description:
    'Learn how to test database logic using unit tests, integration tests, migrations, and test databases to ensure data correctness.',
  level: 'intro',
  color: COLORS.intro,
  size: 'lg',
  position: { x: 490, y: 1420 },
  resources: [
    {
      type: 'official',
      label: 'Database Testing Guide – Martin Fowler',
      url: 'https://martinfowler.com/articles/mocksArentStubs.html',
    },
  ],
},

{
  id: 'functionaltesting-id',
  title: 'Functional Testing',
  description:
    'Learn functional testing, which verifies that an application works according to its requirements by testing features and user flows from an end-user perspective.',
  level: 'intro',
  color: COLORS.intro,
  size: 'lg',
  position: { x: 490, y: 1350 },
  resources: [
    {
      type: 'official',
      label: 'Functional Testing – Software Testing Help',
      url: 'https://www.softwaretestinghelp.com/functional-testing/',
    },
  ],
},
{
  id: 'unittesting-id',
  title: 'Unit Testing',
  description:
    'Learn unit testing, which focuses on testing individual functions or components in isolation to ensure they work correctly.',
  level: 'intro',
  color: COLORS.intro,
  size: 'lg',
  position: { x: 490, y: 1290 },
  resources: [
    {
      type: 'official',
      label: 'Unit Testing – Martin Fowler',
      url: 'https://martinfowler.com/bliki/UnitTest.html',
    },
  ],
},
{
  id: 'integrationtesting-id',
  title: 'Integration Testing',
  description:
    'Learn integration testing, which ensures that multiple components or services work together correctly, including databases, APIs, and external systems.',
  level: 'intro',
  color: COLORS.intro,
  size: 'lg',
  position: { x: 490, y: 1230 },
  resources: [
    {
      type: 'official',
      label: 'Integration Testing – Martin Fowler',
      url: 'https://martinfowler.com/bliki/IntegrationTest.html',
    },
  ],
}










  








  



]

const groupNodes: RoadmapGroupData[] = [
    {
      id: 'serverside-id',
      title: '',
      titlePosition: 'bottom',
      nodeIds: ['internet-id', 'frontendbasics-id', 'html-id', 'css-id', 'pick-backend-id','php-id','rust-id','java-id','python-id','javascript-id','csharp-id','ruby-id','go-id','versioncontrol-id','git-id','github-id','gitlab-id','Relational Databases','migration-id','nplus1-id','sqlite-id','mariadb-id','mysql-id','postgre-id','oracle-id','learnaboutapi-id','caching-id'],
      padding: 14,
      stroke: '#000000ff',
      strokeWidth: 3,	
      fill: 'transparent',
      rx: 10,
      titleFontSize: 14,
      titleColor: '#ffffffff',
      bounds: { x: 485, y: 988, width: 200, height: 220 },

    }	
  ];


  const canvasTexts: CanvasTextData[] = [
    {
      id: 'cs-note-left1',
      text: 'Server Side',
      position: { x: 550, y: 1035 },
      fontSize: 15,
      fontWeight: 600,
      color: '#444',
      textAnchor: 'start',
    },
  ];
const backendEdges: RoadmapEdgeData[] = [
  {
    id: 'fe-e1',
    source: 'internet-id',
    target: 'frontendbasics-id',
    type: 'elbow',
  },
  {
    id: 'fe-e2',
    source: 'frontendbasics-id',
    target: 'html-id',
    type: 'straight',
  },
  {
    id: 'fe-e3',
    source: 'frontendbasics-id',
    target: 'css-id',
    type: 'straight',
    sourcePosition: 'bottom',
    targetPosition: 'top',
  },
  {
    id: 'fe-e4',
    source: 'frontendbasics-id',
    target: 'pick-backend-id',
    type: 'elbow',
    sourcePosition: 'left',
    targetPosition: 'right',
  },
   {
    id: 'fe-e5',
    source: 'pick-backend-id',
    target: 'rust-id',
    type: 'straight',
    sourcePosition: 'top',
    targetPosition: 'bottom',
  },
  {
    id: 'fe-e6',
    source: 'pick-backend-id',
    target: 'php-id',
    type: 'straight',
    sourcePosition: 'top',
    targetPosition: 'bottom',
  },
  {
    id: 'fe-e7',
    source: 'pick-backend-id',
    target: 'versioncontrol-id',
    type: 'elbow',
    sourcePosition: 'bottom',
    targetPosition: 'left',

  },
   {
    id: 'fe-e8',
    source: 'versioncontrol-id',
    target: 'git-id',
    type: 'elbow',
   
    
  },
  {
    id: 'fe-e9',
    source: 'Repohosting-id',
    target: 'github-id',
    type: 'elbow',
   
    
  },

    {
    id: 'fe-e10',
    source: 'relational-id',
    target: 'migration-id',
    type: 'elbow',

  },
    {
    id: 'fe-e11',
    source: 'relational-id',
    target: 'nplus1-id',
    type: 'elbow',
    

  },
    {
    id: 'fe-e12',
    source: 'Repohosting-id',
    target: 'relational-id',
    type: 'elbow',
   

  },
  {
    id: 'fe-e13',
    source: 'relational-id',
    target: 'sqlite-id',
    type: 'straight',
   

  },
  {
    id: 'fe-e14',
    source: 'relational-id',
    target: 'oracle-id',
    type: 'straight',
   

  },
  {
    id: 'fe-e15',
    source: 'relational-id',
    target: 'postgre-id',
    type: 'straight',
   

  },
  {
    id: 'fe-e16',
    source: 'relational-id',
    target: 'learnaboutapi-id',
    type: 'straight',
   

  },
  {
    id: 'fe-e17',
    source: 'learnaboutapi-id',
    target: 'caching-id',
    type: 'straight',
   

  },
  {
    id: 'fe-e18',
    source: 'memcached-id',
    target: 'learnaboutwebservers-id',
    type: 'elbow',
   

  },
   {
    id: 'fe-e19',
    source: 'learnaboutwebservers-id',
    target: 'nginx-id',
    type: 'straight',
   

  },

  {
    id: 'fe-e20',
    source: 'learnaboutwebservers-id',
    target: 'moreaboutdatabases-id',
    type: 'straight',
	sourcePosition: 'right',
    targetPosition: 'right',
   

  },
  {
    id: 'fe-e21',
    source: 'moreaboutdatabases-id',
    target: 'transactions-id',
    type: 'straight',
	
   

  },
   {
    id: 'fe-e22',
    source: 'moreaboutdatabases-id',
    target: 'testing-id',
    type: 'straight',
	
   

  },

  {
    id: 'fe-e23',
    source: 'moreaboutdatabases-id',
    target: 'testing-id',
    type: 'straight',
	
   

  },
  {
    id: 'fe-e24',
    source: 'testing-id',
    target: 'functionaltesting-id',
    type: 'straight',
	
   

  },






]
export const backEndRoadmap: RoadmapData = {
  id: 'back-end',
  title: 'Back-end Developer',
  subtitle: 'Roadmap to becoming a Back-end Developer in 2025',
  nodes: backendNodes,
  edges: backendEdges ,
  groups: groupNodes,
  canvasTexts: canvasTexts
};

