import type { Color, Node, Vector2, Vector3 } from 'three/webgpu';

// Parameter input aliases. Each texture passes its params straight into a TSL Fn
// (via setLayout), which coerces every argument — so a param typed with one of
// these accepts either a plain JS value or a TSL node of that type (e.g. a
// uniform() or an animated time node), letting the texture be configured
// statically or driven by a node graph. The plain boolean flags (e.g.
// GridParams.equirectangular) are the exception and stay JS booleans.
type FloatInput = Node<'float'> | number;
type Vec2Input = Node<'vec2'> | Vector2;
type Vec3Input = Node<'vec3'> | Vector3;
type ColorInput = Node<'color'> | Color;

// === Utility functions ===

export declare function approximateNormal(pos: Vec3Input, posU: Vec3Input, posV: Vec3Input): Node<'vec3'>;
export declare function showFallbackWarning(): Promise<void>;
export declare function hideFallbackWarning(): void;
export declare function remapExp(x: FloatInput, fromMin: FloatInput, fromMax: FloatInput, toMin: FloatInput, toMax: FloatInput): Node<'float'>;
export declare function hsl(col: Vec3Input): Node<'vec3'>;
export declare function toHsl(rgb: Vec3Input): Node<'vec3'>;
export declare function rotatePivot(vector: Vec3Input, pivot: Vec3Input, angle: Vec3Input): Node<'vec3'>;
export declare function vnoise(v: Vec3Input): Node<'float'>;
export declare function spherical(phi: FloatInput, theta: FloatInput): Node<'vec3'>;
export declare function selectPlanar(pos: Vec3Input, selAngles: Vec2Input, selCenter: Vec3Input, selWidth: FloatInput): Node<'float'>;

// Noise / fractal / voronoi re-exported from three/tsl
export {
	mx_noise_float as noise,
	mx_noise_vec3 as noise3,
	mx_fractal_noise_float as fractal,
	mx_fractal_noise_vec3 as fractal3,
	mx_worley_noise_float as voronoi,
	mx_worley_noise_vec2 as voronoi2,
	mx_worley_noise_vec3 as voronoi3,
} from 'three/tsl';

// === Texture param interfaces ===

export interface BrainParams {
	position?: Vec3Input;
	scale?: FloatInput;
	smooth?: FloatInput;
	wave?: FloatInput;
	speed?: FloatInput;
	time?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface BricksParams {
	position?: Vec3Input;
	scale?: FloatInput;
	brickSize?: Vec3Input;
	brickShift?: FloatInput;
	jointSize?: FloatInput;
	jointSpan?: FloatInput;
	jointJitter?: FloatInput;
	jointBlur?: FloatInput;
	noiseSize?: FloatInput;
	noiseStrength?: FloatInput;
	colorShade?: FloatInput;
	color?: ColorInput;
	additional?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface CamouflageParams {
	position?: Vec3Input;
	scale?: FloatInput;
	colorA?: ColorInput;
	colorB?: ColorInput;
	colorC?: ColorInput;
	colorD?: ColorInput;
	seed?: FloatInput;
}

export interface CausticsParams {
	position?: Vec3Input;
	scale?: FloatInput;
	speed?: FloatInput;
	time?: FloatInput;
	color?: ColorInput;
	seed?: FloatInput;
}

export interface CaveArtParams {
	position?: Vec3Input;
	scale?: FloatInput;
	thinness?: FloatInput;
	noise?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface CircleDecorParams {
	position?: Vec3Input;
	scale?: FloatInput;
	grains?: FloatInput;
	complexity?: FloatInput;
	blur?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface CirclesParams {
	position?: Vec3Input;
	scale?: FloatInput;
	variety?: FloatInput;
	color?: ColorInput;
	seed?: FloatInput;
}

export interface CloudsParams {
	position?: Vec3Input;
	scale?: FloatInput;
	density?: FloatInput;
	opacity?: FloatInput;
	color?: ColorInput;
	subcolor?: ColorInput;
	seed?: FloatInput;
}

export interface ConcreteParams {
	position?: Vec3Input;
	scale?: FloatInput;
	density?: FloatInput;
	bump?: FloatInput;
	seed?: FloatInput;
}

export interface CorkParams {
	position?: Vec3Input;
	scale?: FloatInput;
	straight?: FloatInput;
	noise?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface CrumpledFabricParams {
	position?: Vec3Input;
	scale?: FloatInput;
	pinch?: FloatInput;
	color?: ColorInput;
	subcolor?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface DalmatianSpotsParams {
	position?: Vec3Input;
	scale?: FloatInput;
	density?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface DarthMaulParams {
	position?: Vec3Input;
	scale?: FloatInput;
	shift?: Vec3Input;
	complexity?: FloatInput;
	angle?: FloatInput;
	distance?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	balance?: FloatInput;
	seed?: FloatInput;
}

export interface DysonSphereParams {
	position?: Vec3Input;
	scale?: FloatInput;
	complexity?: FloatInput;
	variation?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface EntangledParams {
	position?: Vec3Input;
	scale?: FloatInput;
	density?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface ForditeParams {
	position?: Vec3Input;
	scale?: FloatInput;
	color?: ColorInput;
	seed?: FloatInput;
}

export interface GasGiantParams {
	position?: Vec3Input;
	scale?: FloatInput;
	turbulence?: FloatInput;
	blur?: FloatInput;
	colorA?: ColorInput;
	colorB?: ColorInput;
	colorC?: ColorInput;
	seed?: FloatInput;
}

export interface GridParams {
	uvs?: Vec2Input;
	countU?: FloatInput;
	countV?: FloatInput;
	aspect?: FloatInput;
	thinness?: FloatInput;
	equirectangular?: boolean;
	color?: ColorInput;
	background?: ColorInput;
}

export interface HalftoneParams {
	position?: Vec2Input;
	scale?: FloatInput;
	radius?: FloatInput;
	pattern?: FloatInput;
	attenuation?: FloatInput;
	near?: FloatInput;
	far?: FloatInput;
	color?: Vec3Input | ColorInput;
	positionView?: Vec3Input;
}

export interface IsolayersParams {
	position?: Vec3Input;
	scale?: FloatInput;
	layers?: FloatInput;
	edge?: FloatInput;
	darkness?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface IsolinesParams {
	position?: Vec3Input;
	scale?: FloatInput;
	density?: FloatInput;
	blur?: FloatInput;
	thinness?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface KarstRockParams {
	position?: Vec3Input;
	scale?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface MarbleParams {
	position?: Vec3Input;
	scale?: FloatInput;
	thinness?: FloatInput;
	noise?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface NeonLightsParams {
	position?: Vec3Input;
	scale?: FloatInput;
	thinness?: FloatInput;
	mode?: FloatInput;
	colorA?: ColorInput;
	colorB?: ColorInput;
	colorC?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface PerlinNoiseParams {
	position?: Vec3Input;
	scale?: FloatInput;
	balance?: FloatInput;
	contrast?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface PhotosphereParams {
	position?: Vec3Input;
	scale?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface PlanetParams {
	position?: Vec3Input;
	scale?: FloatInput;
	iterations?: FloatInput;
	levelSea?: FloatInput;
	levelMountain?: FloatInput;
	balanceWater?: FloatInput;
	balanceSand?: FloatInput;
	balanceSnow?: FloatInput;
	colorDeep?: ColorInput;
	colorShallow?: ColorInput;
	colorBeach?: ColorInput;
	colorGrass?: ColorInput;
	colorForest?: ColorInput;
	colorSnow?: ColorInput;
	seed?: FloatInput;
}

export interface PolkaDotsParams {
	position?: Vec3Input;
	count?: FloatInput;
	size?: FloatInput;
	blur?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	flat?: FloatInput;
}

export interface ProcessedWoodParams {
	position?: Vec3Input;
	scale?: FloatInput;
	lengths?: FloatInput;
	strength?: FloatInput;
	angle?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface ProtozoaParams {
	position?: Vec3Input;
	matcap?: Vec2Input;
	scale?: FloatInput;
	fat?: FloatInput;
	amount?: FloatInput;
	color?: ColorInput;
	subcolor?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface ReticularVeinsParams {
	position?: Vec3Input;
	scale?: FloatInput;
	reticulation?: FloatInput;
	strength?: FloatInput;
	organelles?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface RomanPavingParams {
	position?: Vec3Input;
	scale?: FloatInput;
	depth?: FloatInput;
	seed?: FloatInput;
}

export interface RotatorParams {
	angles?: Vec3Input;
	center?: Vec3Input;
	selectorCenter?: Vec3Input;
	selectorAngles?: Vec2Input;
	selectorWidth?: FloatInput;
}

export interface RoughClayParams {
	position?: Vec3Input;
	scale?: FloatInput;
	bump?: FloatInput;
	curvature?: FloatInput;
	seed?: FloatInput;
}

export interface RunnyEggsParams {
	position?: Vec3Input;
	scale?: FloatInput;
	sizeYolk?: FloatInput;
	sizeWhite?: FloatInput;
	colorYolk?: ColorInput;
	colorWhite?: ColorInput;
	colorBackground?: ColorInput;
	seed?: FloatInput;
}

export interface RustParams {
	position?: Vec3Input;
	scale?: FloatInput;
	iterations?: FloatInput;
	amount?: FloatInput;
	opacity?: FloatInput;
	noise?: FloatInput;
	noiseScale?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface SatinParams {
	position?: Vec3Input;
	scale?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface ScalerParams {
	scales?: Vec3Input;
	center?: Vec3Input;
	selectorCenter?: Vec3Input;
	selectorAngles?: Vec2Input;
	selectorWidth?: FloatInput;
}

export interface ScepterHeadParams {
	position?: Vec3Input;
	xFactor?: FloatInput;
	yFactor?: FloatInput;
	zFactor?: FloatInput;
	colorRim?: ColorInput;
	colorA?: ColorInput;
	colorB?: ColorInput;
}

export interface ScreamParams {
	position?: Vec3Input;
	scale?: FloatInput;
	variety?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface StarsParams {
	position?: Vec3Input;
	scale?: FloatInput;
	density?: FloatInput;
	variation?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface StaticNoiseParams {
	position?: Vec2Input;
	time?: FloatInput;
	scale?: FloatInput;
	balance?: FloatInput;
	contrast?: FloatInput;
	delay?: FloatInput;
	seed?: FloatInput;
}

export interface SupersphereParams {
	exponent?: FloatInput;
}

export interface TigerFurParams {
	position?: Vec3Input;
	scale?: FloatInput;
	lengths?: FloatInput;
	blur?: FloatInput;
	strength?: FloatInput;
	hairs?: FloatInput;
	color?: ColorInput;
	bottomColor?: ColorInput;
	seed?: FloatInput;
}

export interface TranslatorParams {
	distance?: Vec3Input;
	selectorCenter?: Vec3Input;
	selectorAngles?: Vec2Input;
	selectorWidth?: FloatInput;
}

export interface TurbulentSmokeParams {
	position?: Vec3Input;
	scale?: FloatInput;
	speed?: FloatInput;
	details?: FloatInput;
	time?: FloatInput;
	seed?: FloatInput;
}

export interface VoronoiCellsParams {
	position?: Vec3Input;
	scale?: FloatInput;
	variation?: FloatInput;
	facet?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface WaterDropsParams {
	position?: Vec3Input;
	scale?: FloatInput;
	density?: FloatInput;
	bump?: FloatInput;
	seed?: FloatInput;
}

export interface WatermelonParams {
	position?: Vec3Input;
	uvs?: Vec2Input;
	scale?: FloatInput;
	stripes?: FloatInput;
	variation?: FloatInput;
	noise?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface WavesParams {
	position?: Vec3Input;
	scale?: FloatInput;
	speed?: FloatInput;
	time?: FloatInput;
	level?: FloatInput;
	rough?: FloatInput;
	height?: FloatInput;
	foamSize?: FloatInput;
	foamEdge?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface WoodParams {
	position?: Vec3Input;
	scale?: FloatInput;
	rings?: FloatInput;
	lengths?: FloatInput;
	angle?: FloatInput;
	fibers?: FloatInput;
	fibersDensity?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	seed?: FloatInput;
}

export interface ZebraLinesParams {
	position?: Vec3Input;
	scale?: FloatInput;
	thinness?: FloatInput;
	phi?: FloatInput;
	theta?: FloatInput;
	color?: ColorInput;
	background?: ColorInput;
	flat?: FloatInput;
}

// === Texture function types ===

// Simple texture: callable + .defaults
interface SimpleTexture<P> {
	(params?: P): Node<'vec3'>;
	defaults: P;
}

// Texture with a .normal() method
interface TextureWithNormal<P> {
	(params?: P): Node<'vec3'>;
	normal(params?: P): Node<'vec3'>;
	defaults: P;
}

// Texture with an .opacity() method
interface TextureWithOpacity<P> {
	(params?: P): Node<'vec3'>;
	opacity(params?: P): Node<'float'>;
	defaults: P;
}

// runnyEggs: both .normal() and .roughness()
interface RunnyEggsTexture {
	(params?: RunnyEggsParams): Node<'vec3'>;
	normal(params?: RunnyEggsParams): Node<'vec3'>;
	roughness(params?: RunnyEggsParams): Node<'float'>;
	defaults: RunnyEggsParams;
}

// === Exports ===

export declare const brain: TextureWithNormal<BrainParams>;
export declare const bricks: SimpleTexture<BricksParams>;
export declare const camouflage: SimpleTexture<CamouflageParams>;
export declare const caustics: SimpleTexture<CausticsParams>;
export declare const caveArt: SimpleTexture<CaveArtParams>;
export declare const circleDecor: SimpleTexture<CircleDecorParams>;
export declare const circles: SimpleTexture<CirclesParams>;
export declare const clouds: TextureWithOpacity<CloudsParams>;
export declare const concrete: SimpleTexture<ConcreteParams>;
export declare const cork: SimpleTexture<CorkParams>;
export declare const crumpledFabric: SimpleTexture<CrumpledFabricParams>;
export declare const dalmatianSpots: SimpleTexture<DalmatianSpotsParams>;
export declare const darthMaul: SimpleTexture<DarthMaulParams>;
export declare const dysonSphere: SimpleTexture<DysonSphereParams>;
export declare const entangled: SimpleTexture<EntangledParams>;
export declare const fordite: SimpleTexture<ForditeParams>;
export declare const gasGiant: SimpleTexture<GasGiantParams>;
export declare const grid: SimpleTexture<GridParams>;
export declare const halftone: SimpleTexture<HalftoneParams>;
export declare const isolayers: SimpleTexture<IsolayersParams>;
export declare const isolines: SimpleTexture<IsolinesParams>;
export declare const karstRock: SimpleTexture<KarstRockParams>;
export declare const marble: SimpleTexture<MarbleParams>;
export declare const neonLights: SimpleTexture<NeonLightsParams>;
export declare const perlinNoise: SimpleTexture<PerlinNoiseParams>;
export declare const photosphere: SimpleTexture<PhotosphereParams>;
export declare const planet: SimpleTexture<PlanetParams>;
export declare const polkaDots: SimpleTexture<PolkaDotsParams>;
export declare const processedWood: SimpleTexture<ProcessedWoodParams>;
export declare const protozoa: SimpleTexture<ProtozoaParams>;
export declare const reticularVeins: SimpleTexture<ReticularVeinsParams>;
export declare const romanPaving: SimpleTexture<RomanPavingParams>;
export declare const rotator: TextureWithNormal<RotatorParams>;
export declare const roughClay: SimpleTexture<RoughClayParams>;
export declare const runnyEggs: RunnyEggsTexture;
export declare const rust: TextureWithOpacity<RustParams>;
export declare const satin: SimpleTexture<SatinParams>;
export declare const scaler: TextureWithNormal<ScalerParams>;
export declare const scepterHead: SimpleTexture<ScepterHeadParams>;
export declare const scream: SimpleTexture<ScreamParams>;
export declare const stars: SimpleTexture<StarsParams>;
export declare const staticNoise: SimpleTexture<StaticNoiseParams>;
export declare const supersphere: TextureWithNormal<SupersphereParams>;
export declare const tigerFur: SimpleTexture<TigerFurParams>;
export declare const translator: TextureWithNormal<TranslatorParams>;
export declare const turbulentSmoke: SimpleTexture<TurbulentSmokeParams>;
export declare const voronoiCells: SimpleTexture<VoronoiCellsParams>;
export declare const waterDrops: SimpleTexture<WaterDropsParams>;
export declare const watermelon: SimpleTexture<WatermelonParams>;
export declare const waves: TextureWithOpacity<WavesParams>;
export declare const wood: SimpleTexture<WoodParams>;
export declare const zebraLines: SimpleTexture<ZebraLinesParams>;
