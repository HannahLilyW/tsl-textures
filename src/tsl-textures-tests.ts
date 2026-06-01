// Type tests for tsl-textures, in the style used by DefinitelyTyped.
//
// This file is never executed; it is only type-checked (see tsconfig.json).
// It exercises the public API surface declared in tsl-textures.d.ts so that
// `tsc --noEmit` fails if the declarations drift away from the runtime API.

import { Color, Node, Vector2, Vector3 } from "three/webgpu";
import { float, vec2, vec3 } from "three/tsl";

import {
	// utility functions
	approximateNormal,
	hideFallbackWarning,
	hsl,
	remapExp,
	rotatePivot,
	selectPlanar,
	showFallbackWarning,
	spherical,
	toHsl,
	vnoise,

	// re-exported noise / fractal / voronoi
	fractal,
	fractal3,
	noise,
	noise3,
	voronoi,
	voronoi2,
	voronoi3,

	// simple textures (callable + .defaults)
	bricks,
	camouflage,
	grid,
	halftone,
	planet,
	polkaDots,

	// multi-channel textures
	brain,
	clouds,
	rotator,
	runnyEggs,
	rust,
	scaler,
	supersphere,
	translator,
	waves,

	// param interfaces
	BricksParams,
	GridParams,
	HalftoneParams,
	RunnyEggsParams,
} from "tsl-textures";

// Asserts that `value` is assignable to `T`. Used instead of typed `const`
// bindings so the file produces no "unused variable" noise under strict configs.
declare function expectType<T>(value: T): void;

// Sample node values of each supported kind, used as inputs below.
const f: Node<"float"> = float(1);
const v2node: Node<"vec2"> = vec2(0, 1);
const v3node: Node<"vec3"> = vec3(0, 1, 2);

const col = new Color(0xff0000);
const p2 = new Vector2(0.5, 0.5);
const p3 = new Vector3(0, 1, 0);

// === Utility functions ===

expectType<Node<"vec3">>(approximateNormal(v3node, p3, v3node));

// remapExp: float-ish args (numbers or float nodes) -> float node.
expectType<Node<"float">>(remapExp(0.5, 0, 1, 1, 10));
expectType<Node<"float">>(remapExp(f, f, 1, 0, f));

// hsl / toHsl convert vec3 <-> vec3.
expectType<Node<"vec3">>(hsl(v3node));
expectType<Node<"vec3">>(toHsl(p3));

expectType<Node<"vec3">>(rotatePivot(v3node, p3, v3node));
expectType<Node<"float">>(vnoise(v3node));
expectType<Node<"vec3">>(spherical(f, 0.25));
expectType<Node<"float">>(selectPlanar(v3node, p2, p3, 0.5));

// Fallback-warning helpers.
expectType<Promise<void>>(showFallbackWarning());
hideFallbackWarning();

// === Re-exported noise functions ===
// These come straight from three/tsl; just confirm they are exported and callable.
noise(v3node);
noise3(v3node);
fractal(v3node);
fractal3(v3node);
voronoi(v3node);
voronoi2(v3node);
voronoi3(v3node);

// === Simple textures ===

// Callable with no arguments.
expectType<Node<"vec3">>(bricks());

// Partial params; F accepts numbers or float nodes, C accepts Color or color
// nodes, V3 accepts Vector3 or vec3 nodes.
expectType<Node<"vec3">>(
	bricks({ scale: 2, brickSize: p3, jointSize: f, color: col, seed: 7 }),
);

// camouflage exposes several color slots.
camouflage({ colorA: col, colorB: col, colorC: col, colorD: col, seed: 1 });

// grid uses uv (vec2) inputs and a boolean flag.
expectType<Node<"vec3">>(
	grid({ uvs: v2node, countU: 32, countV: 16, equirectangular: true, color: col }),
);

// halftone uses a vec2 position and accepts a vec3 OR color for `color`.
halftone({ position: p2, radius: 0.5, color: v3node });
halftone({ position: vec2(0, 0), color: col, positionView: p3 });

// planet has many balance/color knobs.
planet({ iterations: 10, levelSea: 0.5, colorDeep: col, colorSnow: col });

// polkaDots uses a `flat` flag-like float.
polkaDots({ count: 4, size: 0.3, blur: f, flat: 1 });

// `.defaults` is exposed and shaped like the params object.
expectType<BricksParams>(bricks.defaults);
expectType<GridParams>(grid.defaults);
expectType<HalftoneParams>(halftone.defaults);

// === Textures with a .normal() channel ===

expectType<Node<"vec3">>(brain({ color: col, background: col }));
expectType<Node<"vec3">>(brain.normal({ wave: 0.5, speed: 2.5, time: f }));

// rotator / scaler / translator / supersphere share params across channels.
rotator.normal({ angles: p3, center: p3, selectorWidth: 0.5 });
scaler.normal({ scales: p3, selectorAngles: p2 });
translator.normal({ distance: p3, selectorCenter: p3 });
supersphere.normal({ exponent: 3 });

// === Textures with an .opacity() channel ===

expectType<Node<"vec3">>(clouds({ density: 0.5, color: col, subcolor: col }));
expectType<Node<"float">>(clouds.opacity({ density: 0.5, opacity: 0.8 }));

expectType<Node<"float">>(rust.opacity({ amount: 0.5, opacity: 0.5 }));
expectType<Node<"float">>(waves.opacity({ level: 0.5, foamEdge: 0.1 }));

// The same config object can be fed to every channel of a texture.
const cloudConfig = { scale: 3, density: 0.7, opacity: 0.8, color: col, seed: 5 };
expectType<Node<"vec3">>(clouds(cloudConfig));
expectType<Node<"float">>(clouds.opacity(cloudConfig));

// === runnyEggs: both .normal() and .roughness() ===

expectType<Node<"vec3">>(runnyEggs({ sizeYolk: 0.2, sizeWhite: 0.7, colorYolk: col }));
expectType<Node<"vec3">>(runnyEggs.normal({ sizeWhite: 0.7 }));
expectType<Node<"float">>(runnyEggs.roughness({ sizeYolk: 0.2 }));

// The full params object is the superset and works on every channel.
const eggConfig: RunnyEggsParams = { sizeYolk: 0.2, sizeWhite: 0.7, colorWhite: col };
runnyEggs(eggConfig);
runnyEggs.normal(eggConfig);
runnyEggs.roughness(eggConfig);

// === Negative tests ===

// A simple texture has no extra channels.
// @ts-expect-error - bricks is a plain texture without a .normal() method.
bricks.normal();

// @ts-expect-error - clouds has .opacity(), not .normal().
clouds.normal();

// @ts-expect-error - scale must be a number or float node, not a string.
brain({ scale: "large" });

// @ts-expect-error - `nope` is not a known parameter.
grid({ nope: true });

// @ts-expect-error - a color slot does not accept a bare number.
camouflage({ colorA: 123 });

// @ts-expect-error - bricks() returns a vec3, not a float.
expectType<Node<"float">>(bricks());
