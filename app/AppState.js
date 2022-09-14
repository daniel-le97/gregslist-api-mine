import { Value } from "./Models/Value.js";
import { EventEmitter } from "./Utils/EventEmitter.js";
import { isValidProp } from "./Utils/isValidProp.js";
import { loadState } from "./Utils/Store.js";

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  // values = loadState('values', Value)

  /** @type {import('./Models/Car').Car[]} */
  cars = [];

  /** @type {import('./Models/Car').Car} */
  // @ts-ignore
  activeCar = null;

  /** @type {import('./Models/Job').Job[]} */
  jobs = [];

  /** @type {import('./Models/Job').Job} */
  // @ts-ignore
  activeJob = null;

  /** @type {import('./Models/Home').Home[]} */
  homes = [];

  /** @type {import('./Models/Home').Home} */
  // @ts-ignore
  activeHome = null;
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop);
    return target[prop];
  },
  set(target, prop, value) {
    isValidProp(target, prop);
    target[prop] = value;
    target.emit(prop, value);
    return true;
  },
});
