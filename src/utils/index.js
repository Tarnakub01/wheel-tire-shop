export * from "./calc.js";
export * from "./cart.js";
export * from "./format.js";

// ทำไมต้องทำแบบนี้? เวลาขึ้น React จริง คุณจะ import จากที่เดียว เช่น:
// import { addToCart, updateQty } from "../utils";