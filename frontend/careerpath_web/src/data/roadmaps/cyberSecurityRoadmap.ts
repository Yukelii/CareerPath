import type { RoadmapData, RoadmapEdgeData, RoadmapNodeData } from '../../types/roadmap';

// COLOR PALETTE (same style as your example)
const COLORS = {
  intro: '#FFFACD',
  core: '#FFEB3B',
  advanced: '#E8E8E8',
  white: '#FFFFFF',
};

// NODES (Fundamental IT Skills section for Cybersecurity)
const cyberSecurityNodes: RoadmapNodeData[] = [
  // MAIN PATH (center column)
  {
    id: 'cs-fundamentals',
    title: 'Fundamental IT Skills',
    description: 'Core IT foundation for cybersecurity (hardware, OS, networking, scripting, troubleshooting).',
    level: 'core',
    color: COLORS.core,
    position: { x: 510, y: 80 },
    targetPosition: 'bottom', // exits downward to next main node
    sourcePosition: 'left', // exits downward to next main node
    resources: [
      {
        type: 'opensource',
        label: 'Cisco NetAcad: Introduction to Cybersecurity',
        url: 'https://prelogin-authoring.netacad.com/courses/cybersecurity/introduction-cybersecurity',
      },
    ],
  },
  {
    id: 'cs-networking-basics',
    title: 'Networking Basics',
    description: 'TCP/IP, IP addressing, routing/switching basics, DNS, and connectivity.',
    level: 'core',
    color: COLORS.core,
    position: { x: 510, y: 260 },
    targetPosition: 'top', 
    sourcePosition: 'left',
    resources: [
      {
        type: 'video',
        label: 'Crash Course: Computer Networks (#28)',
        url: 'https://www.youtube.com/watch?v=3QhU9jd03a0',
      },
    ],
  },
  {
    id: 'cs-operating-systems',
    title: 'Operating Systems',
    description: 'Windows + Linux fundamentals for security work and administration.',
    level: 'core',
    color: COLORS.core,
    position: { x: 510, y: 440 },
    targetPosition: 'top',
    sourcePosition: 'bottom',
    resources: [],
  },
  {
    id: 'cs-permissions',
    title: 'Permissions',
    description: 'Users/groups, ACLs, file permissions, and least privilege.',
    level: 'core',
    color: COLORS.core,
    position: { x: 510, y: 620 },
    targetPosition: 'top',
    sourcePosition: 'bottom',
    resources: [
      {
        type: 'article',
        label: 'freeCodeCamp: chmod/chown permissions',
        url: 'https://www.freecodecamp.org/news/linux-chmod-chown-change-file-permissions/',
      },
      {
        type: 'article',
        label: 'Baeldung: chmod vs chown (Linux)',
        url: 'https://www.baeldung.com/linux/chown-chmod-permissions',
      },
    ],
  },
  {
    id: 'cs-troubleshooting',
    title: 'Troubleshooting',
    description: 'Systematic debugging, isolating causes, log checking, and validation.',
    level: 'core',
    color: COLORS.core,
    position: { x: 510, y: 800 },
    targetPosition: 'top',
    sourcePosition: 'bottom',
    resources: [],
  },
  {
    id: 'cs-cli-commands',
    title: 'Common Commands',
    description: 'CLI navigation, file ops, process monitoring, and basic network commands.',
    level: 'core',
    color: COLORS.core,
    position: { x: 510, y: 980 },
    targetPosition: 'top',
    resources: [],
  },

  // LEFT COLUMN (supporting topics)
  {
    id: 'cs-hardware',
    title: 'Computer Hardware',
    description: 'Computer hardware components are the physical parts of a computer system that work together to perform computing tasks. The key components include the central processing unit (CPU), which is the "brain" of the computer responsible for executing instructions and processing data. The motherboard is the main circuit board that connects and allows communication between the CPU, memory, and other hardware. Random Access Memory (RAM) serves as the computer\'s short-term memory, storing data that is actively being used by the CPU for quick access.The storage device, such as a hard disk drive (HDD) or solid-state drive (SSD), is where data is permanently stored, including the operating system, applications, and files. The power supply unit (PSU) provides the necessary electrical power to run the components. Graphics processing units (GPU), dedicated for rendering images and videos, are important for tasks like gaming, video editing, and machine learning. Additionally, input devices like keyboards and mice, and output devices like monitors and printers, enable users to interact with the system. Together, these components make up the essential hardware of a computer, enabling it to perform various computing',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 180, y: 180 },
    targetPosition: 'right', // edge comes from the right (from fundamentals)
    resources: [],
  },
  {
    id: 'cs-connection-types',
    title: 'Connection Types',
    description: 'There are several types of network connections that enable communication between devices, each serving different functions based on speed, reliability, and purpose. Ethernet is a wired connection type commonly used in local area networks (LANs), providing high-speed, stable, and secure data transfer. Ethernet is ideal for businesses and environments where reliability is crucial, offering speeds from 100 Mbps to several Gbps. Wi-Fi, a wireless connection, enables devices to connect to a network without physical cables. It provides flexibility and mobility, making it popular in homes, offices, and public spaces. While Wi-Fi offers convenience, it can be less reliable and slower than Ethernet due to signal interference or distance from the access point. Bluetooth is a short-range wireless technology primarily used for connecting peripherals like headphones, keyboards, and other devices. It operates over shorter distances, typically up to 10 meters, and is useful for personal device communication rather than networking larger systems. Fiber-optic connections use light signals through glass or plastic fibers to transmit data at very high speeds over long distances, making them ideal for internet backbones or connecting data centers. Fiber is faster and more reliable than traditional copper cables, but it is also more expensive to implement. Cellular connections, such as 4G and 5G, allow mobile devices to connect to the internet via wireless cellular networks. These connections offer mobility, enabling internet access from almost anywhere, but their speeds and reliability can vary depending on network coverage. Each connection type plays a specific role, balancing factors like speed, distance, and convenience to meet the varying needs of users and organizations.',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 180, y: 360 },
    targetPosition: 'right', // enters from right
    sourcePosition: 'bottom', // exits downward to wireless nodes
    resources: [],
  },
  {
    id: 'cs-wireless-wifi',
    title: 'Wi‑Fi',
    description: 'Wireless basics, SSIDs, encryption, interference, and common risks.',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 20, y: 420 },
    targetPosition: 'top', // enters from above
    resources: [],
  },
  {
    id: 'cs-wireless-bluetooth',
    title: 'Bluetooth',
    description: 'Short-range connectivity and common security considerations.',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 180, y: 420 },
    targetPosition: 'top',
    resources: [],
  },
  {
    id: 'cs-wireless-nfc',
    title: 'NFC',
    description: 'Near-field communication basics and typical use cases.',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 20, y: 470 },
    targetPosition: 'top',
    resources: [],
  },
  {
    id: 'cs-wireless-infrared',
    title: 'Infrared',
    description: 'IR basics and typical short-range device communication.',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 180, y: 470 },
    targetPosition: 'top',
    resources: [],
  },

  // RIGHT COLUMN (supporting topics)
  {
    id: 'cs-programming',
    title: 'Programming (Scripting)',
    description: 'Python/JS scripting for automation, parsing logs, and tooling.',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 840, y: 700 },
    targetPosition: 'left', // enters from left (from troubleshooting)
    sourcePosition: 'bottom', // exits downward to db/cloud
    resources: [],
  },
  {
    id: 'cs-databases-sql',
    title: 'Databases (SQL)',
    description: 'CRUD, joins, auth concepts, and securing stored data.',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 840, y: 760 },
    targetPosition: 'top', // enters from above
    resources: [],
  },
  {
    id: 'cs-cloud',
    title: 'Cloud Basics',
    description: 'Core concepts: IAM, storage, networks, shared responsibility.',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 840, y: 820 },
    targetPosition: 'top',
    resources: [],
  },
  {
    id: 'cs-office-suites',
    title: 'Office Suites',
    description: 'Microsoft Office, Google Workspace, LibreOffice fundamentals for work environments.',
    level: 'white',
    color: COLORS.white,
    position: { x: 840, y: 540 },
    targetPosition: 'left', // enters from left (from OS)
    resources: [],
  },
  {
    id: 'cs-web-basics',
    title: 'Web Basics',
    description: 'HTTP/HTTPS, browsers, cookies, forms, and basic web architecture.',
    level: 'white',
    color: COLORS.white,
    position: { x: 840, y: 600 },
    targetPosition: 'left',
    resources: [],
  },
];

// EDGES (connect the fundamentals section)
const cyberSecurityEdges: RoadmapEdgeData[] = [

  // main path flow (vertical, can stay default or use 'elbow' - will auto-detect)
  { id: 'cs-e1', source: 'cs-fundamentals', target: 'cs-networking-basics', type: 'elbow' },
  { id: 'cs-e2', source: 'cs-networking-basics', target: 'cs-operating-systems', type: 'elbow' },
  { id: 'cs-e3', source: 'cs-operating-systems', target: 'cs-permissions', type: 'elbow' },
  { id: 'cs-e4', source: 'cs-permissions', target: 'cs-troubleshooting', type: 'elbow' },
  { id: 'cs-e5', source: 'cs-troubleshooting', target: 'cs-cli-commands', type: 'elbow' },

  // supporting branches from fundamentals (angled to the left)
  { id: 'cs-e6', source: 'cs-fundamentals', target: 'cs-hardware', type: 'elbow' },
  { id: 'cs-e7', source: 'cs-networking-basics', target: 'cs-connection-types', type: 'elbow' },

  // connection types -> wireless details (angled downward from connection-types)
  { id: 'cs-e8', source: 'cs-connection-types', target: 'cs-wireless-wifi', type: 'elbow' },
  { id: 'cs-e9', source: 'cs-connection-types', target: 'cs-wireless-bluetooth', type: 'elbow' },
  { id: 'cs-e10', source: 'cs-connection-types', target: 'cs-wireless-nfc', type: 'elbow' },
  { id: 'cs-e11', source: 'cs-connection-types', target: 'cs-wireless-infrared', type: 'elbow' },

  // OS/troubleshooting -> practical skills (angled to the right)
  { id: 'cs-e12', source: 'cs-operating-systems', target: 'cs-office-suites', type: 'elbow' },
  { id: 'cs-e13', source: 'cs-operating-systems', target: 'cs-web-basics', type: 'elbow' },

  // troubleshooting -> automation/tooling (angled to the right)
  { id: 'cs-e14', source: 'cs-troubleshooting', target: 'cs-programming', type: 'elbow' },
  { id: 'cs-e15', source: 'cs-programming', target: 'cs-databases-sql', type: 'elbow' },
  { id: 'cs-e16', source: 'cs-programming', target: 'cs-cloud', type: 'elbow' },
];

export const cyberSecurityRoadmap: RoadmapData = {
  id: 'cyber-security',
  title: 'Cyber Security Expert',
  subtitle: 'Step by step guide to becoming a Cyber Security Expert in 2025',
  nodes: cyberSecurityNodes,
  edges: cyberSecurityEdges,
};
