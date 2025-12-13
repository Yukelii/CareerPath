import { RoadmapNodeData, RoadmapEdgeData } from '../types/gameDevRoadmap';

// COLOR PALETTE
const COLORS = {
  intro: '#FFFACD',      // Light yellow for intro
  core: '#FFEB3B',       // Bright yellow for core (main path)
  advanced: '#E8E8E8',   // Light gray for advanced/optional
  white: '#FFFFFF',      // White for supporting nodes
};

export const gameDevNodes: RoadmapNodeData[] = [
   //LEFT COLUMN - Programming Languages & Linear Algebra 
  {
    id: 'g-c-cpp-csharp',
    title: 'C# / C++',
    description: 'Core programming languages for game development',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 20, y: 700 },
    resources: [
      { type: 'article', label: 'Learn C++', url: '#' },
      { type: 'video', label: 'C++ Game Dev Basics', url: '#' },
    ],
  },
  {
    id: 'g-rust-python',
    title: 'Rust / Python',
    description: 'Alternative languages for game development',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 20, y: 750 },
    resources: [
      { type: 'article', label: 'Rust Game Dev', url: '#' },
      { type: 'article', label: 'Python for Games', url: '#' },
    ],
  },
  {
    id: 'g-gdscript',
    title: 'GDScript',
    description: 'Godot engine scripting language',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 20, y: 800 },
    resources: [
      { type: 'official', label: 'GDScript Docs', url: '#' },
    ],
  },
  {
    id: 'g-linear-algebra',
    title: 'Linear Algebra',
    description: 'Vectors, matrices, transformations for 3D graphics',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 20, y: 180 },
    resources: [
      { type: 'article', label: 'Linear Algebra for Games', url: '#' },
      { type: 'video', label: 'Kimberly Brehm Full Course', url: '#' },
    ],
  },
  {
    id: 'g-vector',
    title: 'Vector',
    description: 'Magnitude and direction - position, velocity, acceleration',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 20, y: 230 },
    resources: [
      { type: 'article', label: 'Vectors for Game Dev', url: '#' },
      { type: 'video', label: 'Sebastian Lague', url: '#' },
    ],
  },
  {
    id: 'g-matrix',
    title: 'Matrix',
    description: '4x4 transformations - scale, rotate, translate',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 180, y: 230 },
    resources: [
      { type: 'article', label: 'Matrix Algebra & Games', url: '#' },
    ],
  },
  {
    id: 'g-linear-transformation',
    title: 'Linear\nTransformation',
    description: 'Mathematical transformations preserving vector operations',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 180, y: 180 },
    resources: [
      { type: 'article', label: 'Linear Transformation', url: '#' },
    ],
  },
  {
    id: 'g-geometry',
    title: 'Geometry',
    description: 'Spatial math for collision, rendering, movement',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 20, y: 280 },
    resources: [
      { type: 'article', label: 'Game Geometry', url: '#' },
    ],
  },
  {
    id: 'g-affine-space',
    title: 'Affine Space',
    description: 'Points and vectors - comfortable geometric structure',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 180, y: 280 },
    resources: [
      { type: 'article', label: 'Understanding Affine Space', url: '#' },
    ],
  },
  {
    id: 'g-affine-transformation',
    title: 'Affine\nTransformation',
    description: 'Translation, scaling, rotation - preserves parallel lines',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 20, y: 330 },
    resources: [
      { type: 'article', label: 'Affine Transformations', url: '#' },
    ],
  },
  {
    id: 'g-projection',
    title: 'Projection',
    description: 'Orthographic & Perspective - 3D to 2D rendering',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 180, y: 330 },
    resources: [
      { type: 'article', label: 'Projection in Games', url: '#' },
    ],
  },
  {
    id: 'g-orientation',
    title: 'Orientation',
    description: 'Pitch, yaw, roll - Euler angles & Quaternions',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 180, y: 380 },
    resources: [
      { type: 'article', label: 'Orientation of Character', url: '#' },
    ],
  },
  {
    id: 'g-perspective',
    title: 'Perspective',
    description: 'One-point & two-point perspective projection',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 20, y: 380 },
    resources: [
      { type: 'article', label: 'Perspective in Games', url: '#' },
    ],
  },
  {
    id: 'g-quaternion',
    title: 'Quaternion',
    description: 'Complex rotations - avoid Gimbal lock',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 180, y: 430 },
    resources: [
      { type: 'article', label: 'Understanding Quaternions', url: '#' },
      { type: 'video', label: 'Quaternions Explained', url: '#' },
    ],
  },
  {
    id: 'g-orthogonal',
    title: 'Orthogonal',
    description: 'Orthographic projection - no perspective',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 20, y: 430 },
    resources: [
      { type: 'article', label: 'Orthogonal Projection', url: '#' },
    ],
  },
  {
    id: 'g-euler-angle',
    title: 'Euler Angle',
    description: 'Three sequential rotations - alpha, beta, gamma',
    level: 'intro',
    color: COLORS.intro,
    position: { x: 20, y: 480 },
    resources: [
      { type: 'article', label: 'Euler Angles', url: '#' },
    ],
  },

  // CENTER COLUMN - Game Engine, Mathematics, Physics (MAIN YELLOW PATH)
  {
    id: 'g-client-side-dev',
    title: 'Client Side Development',
    description: 'Graphics rendering, input handling, UI on player machines',
    level: 'core',
    color: COLORS.core,
    position: { x: 510, y: 100 },
    resources: [
      { type: 'article', label: 'Client Side Architecture', url: '#' },
    ],
  },
  {
    id: 'g-game-mathematics',
    title: 'Game Mathematics',
    description: 'Geometry, logic, algebra, trigonometry for game mechanics',
    level: 'core',
    color: COLORS.core,
    position: { x: 510, y: 240 },
    resources: [
      { type: 'article', label: 'Game Math', url: '#' },
      { type: 'article', label: 'Master Game Physics', url: '#' },
    ],
  },
  {
    id: 'g-game-engine',
    title: 'Game Engine',
    description: 'Unity 3D, Unreal Engine, Godot - Choose your platform',
    level: 'core',
    color: COLORS.core,
    position: { x: 310, y: 500 },
    resources: [
      { type: 'official', label: 'Unity', url: '#' },
      { type: 'official', label: 'Unreal Engine', url: '#' },
      { type: 'official', label: 'Godot', url: '#' },
    ],
  },
  {
    id: 'g-programming-languages',
    title: 'Programming Languages',
    description: 'C#, C++, Python, GDScript for game scripting',
    level: 'core',
    color: COLORS.core,
    position: { x: 310, y: 700 },
    resources: [
      { type: 'article', label: 'Language Comparison', url: '#' },
    ],
  },
 /*
  // CENTER-RIGHT - Curve, Collision, Dynamics
  {
    id: 'g-curve',
    title: 'Curve',
    description: 'Smooth paths and animations - Splines, Bezier',
    level: 'white',
    color: COLORS.white,
    position: { x: 310, y: 360 },
    resources: [
      { type: 'article', label: 'Curves in Games', url: '#' },
    ],
  },
  {
    id: 'g-spline',
    title: 'Spline',
    description: 'Smooth curves connecting multiple points',
    level: 'white',
    color: COLORS.white,
    position: { x: 280, y: 390 },
    resources: [
      { type: 'article', label: 'Spline Mathematics', url: '#' },
    ],
  },
  {
    id: 'g-hermite',
    title: 'Hermite',
    description: 'Polynomial interpolation with tangent control',
    level: 'white',
    color: COLORS.white,
    position: { x: 340, y: 390 },
    resources: [
      { type: 'article', label: 'Hermite Interpolation', url: '#' },
    ],
  },
  {
    id: 'g-bezier',
    title: 'Bezier',
    description: 'Control point curves - widely used in graphics',
    level: 'white',
    color: COLORS.white,
    position: { x: 280, y: 430 },
    resources: [
      { type: 'article', label: 'Bezier Curves for Games', url: '#' },
      { type: 'video', label: 'Bezier Explained', url: '#' },
    ],
  },
  {
    id: 'g-catmull-rom',
    title: 'Catmull-Rom',
    description: 'Cubic interpolating spline - smooth curves',
    level: 'white',
    color: COLORS.white,
    position: { x: 340, y: 430 },
    resources: [
      { type: 'article', label: 'Catmull Rom Spline', url: '#' },
    ],
  }, */

 /* 
  // RIGHT COLUMN - Server Side, Physics (Advanced)
  {
    id: 'g-server-side',
    title: 'Server Side',
    description: 'Multiplayer connections, state synchronization, validation',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 520, y: 200 },
    resources: [
      { type: 'article', label: 'Networking Basics', url: '#' },
    ],
  },*/
  {
    id: 'g-game-physics',
    title: 'Game Physics',
    description: 'Gravity, collisions, forces - Simulate real-world physics',
    level: 'core',
    color: COLORS.core,
    position: { x: 890, y: 500 },
    resources: [
      { type: 'article', label: 'Game Physics', url: '#' },
      { type: 'article', label: 'Master Physics', url: '#' },
    ],
  },


 /* 
  // RIGHT SIDE - Physics Details
  {
    id: 'g-center-of-mass',
    title: 'Center of Mass',
    description: 'Average position weighted by mass - affects movement',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 520, y: 240 },
    resources: [
      { type: 'article', label: 'Center of Mass', url: '#' },
    ],
  },
  {
    id: 'g-moment-of-inertia',
    title: 'Moment of Inertia',
    description: 'Rotational inertia - resistance to rotation',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 520, y: 280 },
    resources: [
      { type: 'article', label: 'Moment of Inertia', url: '#' },
    ],
  },
  {
    id: 'g-acceleration',
    title: 'Acceleration',
    description: 'Rate of change in velocity - F=ma',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 520, y: 320 },
    resources: [
      { type: 'article', label: 'Acceleration in Games', url: '#' },
    ],
  },
  {
    id: 'g-joints',
    title: 'Joints',
    description: 'Connections between objects - hinges, springs',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 520, y: 360 },
    resources: [
      { type: 'official', label: 'Joints in Unity', url: '#' },
      { type: 'article', label: 'Character Rigging', url: '#' },
    ],
  },
  {
    id: 'g-restitution',
    title: 'Restitution',
    description: 'Bounciness - elasticity of collisions',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 520, y: 400 },
    resources: [
      { type: 'article', label: 'Restitution Property', url: '#' },
    ],
  },
  {
    id: 'g-force',
    title: 'Force',
    description: 'Influence causing movement - gravity, friction',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 520, y: 440 },
    resources: [
      { type: 'article', label: 'Physics for Game Dev', url: '#' },
    ],
  },
  {
    id: 'g-buoyancy',
    title: 'Buoyancy',
    description: 'Upward force from fluid - swimming, floating',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 520, y: 480 },
    resources: [
      { type: 'article', label: 'Buoyancy in Games', url: '#' },
    ],
  },
  {
    id: 'g-friction',
    title: 'Friction',
    description: 'Resistance to movement - terrain-dependent',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 520, y: 520 },
    resources: [
      { type: 'article', label: 'Friction in Game Dev', url: '#' },
      { type: 'video', label: 'Friction Explained', url: '#' },
    ],
  },
  {
    id: 'g-linear-velocity',
    title: 'Linear Velocity',
    description: 'Rate of position change - speed and direction',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 520, y: 560 },
    resources: [
      { type: 'article', label: 'Linear Velocity', url: '#' },
    ],
  },
  {
    id: 'g-dynamics',
    title: 'Dynamics',
    description: 'Movement & interaction over time - kinematics, forces',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 520, y: 600 },
    resources: [
      { type: 'article', label: 'Dynamics in Physics', url: '#' },
    ],
  },
  {
    id: 'g-collision-detection',
    title: 'Collision Detection',
    description: 'Broad phase, narrow phase, SAT, GJK algorithms',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 520, y: 640 },
    resources: [
      { type: 'article', label: 'Collision Detection', url: '#' },
    ],
  },
  {
    id: 'g-ccd',
    title: 'CCD',
    description: 'Continuous collision detection - prevent tunneling',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 570, y: 670 },
    resources: [
      { type: 'article', label: 'Continuous Collision', url: '#' },
    ],
  },
  {
    id: 'g-intersection',
    title: 'Intersection',
    description: 'Exact collision point determination',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 470, y: 670 },
    resources: [
      { type: 'article', label: 'Intersection Tests', url: '#' },
    ],
  },
  {
    id: 'g-convexity',
    title: 'Convexity',
    description: 'Convex vs concave shapes in collision',
    level: 'white',
    color: COLORS.white,
    position: { x: 400, y: 640 },
    resources: [
      { type: 'article', label: 'Convexity in Games', url: '#' },
    ],
  },
  {
    id: 'g-sat',
    title: 'SAT',
    description: 'Separating Axis Theorem - polygon collision',
    level: 'white',
    color: COLORS.white,
    position: { x: 330, y: 640 },
    resources: [
      { type: 'article', label: 'Separating Axis Theorem', url: '#' },
    ],
  },
  {
    id: 'g-gjk',
    title: 'GJK',
    description: 'Gilbert-Johnson-Keerthi - convex intersection',
    level: 'white',
    color: COLORS.white,
    position: { x: 260, y: 640 },
    resources: [
      { type: 'article', label: 'GJK Algorithm', url: '#' },
    ],
  },
  {
    id: 'g-epa',
    title: 'EPA',
    description: 'Expanding Polytope - penetration depth',
    level: 'white',
    color: COLORS.white,
    position: { x: 190, y: 640 },
    resources: [
      { type: 'article', label: 'EPA Algorithm', url: '#' },
    ],
  },
  {
    id: 'g-convex',
    title: 'Convex',
    description: 'Convex shape detection and handling',
    level: 'white',
    color: COLORS.white,
    position: { x: 400, y: 680 },
    resources: [
      { type: 'article', label: 'Convex in Games', url: '#' },
    ],
  },
  {
    id: 'g-concave',
    title: 'Concave',
    description: 'Concave shape handling - more complex',
    level: 'white',
    color: COLORS.white,
    position: { x: 330, y: 680 },
    resources: [
      { type: 'article', label: 'Concave Shapes', url: '#' },
    ],
  },
  {
    id: 'g-convex-hull',
    title: 'Convex Hull',
    description: 'Smallest convex polygon - simplify collision',
    level: 'white',
    color: COLORS.white,
    position: { x: 260, y: 680 },
    resources: [
      { type: 'article', label: 'Convex Hull', url: '#' },
    ],
  },
  {
    id: 'g-convex-decomposition',
    title: 'Convex\nDecomposition',
    description: 'Break concave shapes into convex parts',
    level: 'white',
    color: COLORS.white,
    position: { x: 190, y: 680 },
    resources: [
      { type: 'article', label: 'Convex Decomposition', url: '#' },
    ],
  }, */

 /* 
  // Far Right - Native Engines
  {
    id: 'g-unity-3d',
    title: 'Unity 3D',
    description: 'Versatile cross-platform game engine',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 620, y: 370 },
    resources: [
      { type: 'official', label: 'Unity Docs', url: '#' },
      { type: 'video', label: 'Unity in 100 Seconds', url: '#' },
    ],
  },
  {
    id: 'g-unreal-engine',
    title: 'Unreal Engine',
    description: 'High-performance engine for AAA games',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 620, y: 410 },
    resources: [
      { type: 'official', label: 'Unreal Docs', url: '#' },
      { type: 'video', label: 'Unreal in 100 Seconds', url: '#' },
    ],
  },
  {
    id: 'g-native',
    title: 'Native',
    description: 'C++/Rust game development without engine',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 620, y: 450 },
    resources: [
      { type: 'article', label: 'Game Dev with C++', url: '#' },
      { type: 'article', label: 'Building with Rust', url: '#' },
    ],
  },
  {
    id: 'g-godot',
    title: 'Godot',
    description: 'Open-source, feature-rich game engine',
    level: 'advanced',
    color: COLORS.advanced,
    position: { x: 1000, y: 490 },
    resources: [
      { type: 'official', label: 'Godot Docs', url: '#' },
      { type: 'video', label: 'Godot Tutorial', url: '#' },
    ],
  },*/
];

export const gameDevEdges: RoadmapEdgeData[] = [
  // Left side connections
  { id: 'e1', source: 'g-linear-algebra', target: 'g-vector' },
  { id: 'e2', source: 'g-linear-algebra', target: 'g-matrix' },
  { id: 'e3', source: 'g-vector', target: 'g-linear-transformation' },
  { id: 'e4', source: 'g-matrix', target: 'g-linear-transformation' },
  { id: 'e5', source: 'g-linear-transformation', target: 'g-geometry' },
  { id: 'e6', source: 'g-linear-transformation', target: 'g-affine-space' },
  { id: 'e7', source: 'g-geometry', target: 'g-affine-transformation' },
  { id: 'e8', source: 'g-affine-space', target: 'g-affine-transformation' },
  { id: 'e9', source: 'g-affine-transformation', target: 'g-projection' },
  { id: 'e10', source: 'g-affine-transformation', target: 'g-orientation' },
  { id: 'e11', source: 'g-projection', target: 'g-perspective' },
  { id: 'e12', source: 'g-orientation', target: 'g-quaternion' },
  { id: 'e13', source: 'g-perspective', target: 'g-orthogonal' },
  { id: 'e14', source: 'g-quaternion', target: 'g-euler-angle' },

  // Center main path
  { id: 'e15', source: 'g-linear-algebra', target: 'g-game-mathematics' },
  { id: 'e16', source: 'g-game-mathematics', target: 'g-game-engine' },
  { id: 'e17', source: 'g-game-engine', target: 'g-programming-languages' },
  { id: 'e18', source: 'g-client-side-dev', target: 'g-game-mathematics' },

  // Center curves
  { id: 'e19', source: 'g-game-mathematics', target: 'g-curve' },
  { id: 'e20', source: 'g-curve', target: 'g-spline' },
  { id: 'e21', source: 'g-curve', target: 'g-hermite' },
  { id: 'e22', source: 'g-spline', target: 'g-bezier' },
  { id: 'e23', source: 'g-hermite', target: 'g-catmull-rom' },

  // Center to Physics
  { id: 'e24', source: 'g-game-mathematics', target: 'g-game-physics' },
  { id: 'e25', source: 'g-curve', target: 'g-game-physics' },

  // Right side Physics details
  { id: 'e26', source: 'g-game-physics', target: 'g-center-of-mass' },
  { id: 'e27', source: 'g-game-physics', target: 'g-moment-of-inertia' },
  { id: 'e28', source: 'g-game-physics', target: 'g-acceleration' },
  { id: 'e29', source: 'g-game-physics', target: 'g-joints' },
  { id: 'e30', source: 'g-game-physics', target: 'g-restitution' },
  { id: 'e31', source: 'g-game-physics', target: 'g-force' },
  { id: 'e32', source: 'g-game-physics', target: 'g-buoyancy' },
  { id: 'e33', source: 'g-game-physics', target: 'g-friction' },
  { id: 'e34', source: 'g-game-physics', target: 'g-linear-velocity' },
  { id: 'e35', source: 'g-game-physics', target: 'g-dynamics' },
  { id: 'e36', source: 'g-game-physics', target: 'g-collision-detection' },

  // Collision detection branches
  { id: 'e37', source: 'g-collision-detection', target: 'g-ccd' },
  { id: 'e38', source: 'g-collision-detection', target: 'g-intersection' },
  { id: 'e39', source: 'g-intersection', target: 'g-convexity' },
  { id: 'e40', source: 'g-convexity', target: 'g-sat' },
  { id: 'e41', source: 'g-convexity', target: 'g-gjk' },
  { id: 'e42', source: 'g-gjk', target: 'g-epa' },
  { id: 'e43', source: 'g-sat', target: 'g-convex' },
  { id: 'e44', source: 'g-gjk', target: 'g-convex' },
  { id: 'e45', source: 'g-convex', target: 'g-concave' },
  { id: 'e46', source: 'g-concave', target: 'g-convex-hull' },
  { id: 'e47', source: 'g-convex-hull', target: 'g-convex-decomposition' },

  // Engines
  { id: 'e48', source: 'g-game-engine', target: 'g-unity-3d' },
  { id: 'e49', source: 'g-game-engine', target: 'g-unreal-engine' },
  { id: 'e50', source: 'g-game-engine', target: 'g-native' },
  { id: 'e51', source: 'g-game-engine', target: 'g-godot' },

  // Server side
  { id: 'e52', source: 'g-server-side', target: 'g-game-physics' },
];
