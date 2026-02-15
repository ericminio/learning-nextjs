import { TextEncoder, TextDecoder } from "util";

// Polyfill for pg module in jsdom environment
global.TextEncoder = TextEncoder;
// @ts-expect-error TextDecoder types
global.TextDecoder = TextDecoder;
