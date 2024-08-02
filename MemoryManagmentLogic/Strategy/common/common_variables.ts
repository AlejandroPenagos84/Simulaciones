import { Process } from "../../interfaces/process.interface";
import { Program } from "../../interfaces/program.interface";
import { getRandomInt } from "../util/util_functions";

// Aqui agrego las variables que se usan en varias partes del programa y también aquellas funciones que solo sirven para
// crear un objeto

export const HEAP: number = 131072;
export const STACK: number = 65536;
export const TOTAL: number = 16777216;
export const MEGABYTE: number = 1048576;
// Funcion para crear un proceso vacio
export const create_process = (
  newProgram: Program,
  memory_process: number,
  base: number,
  name: string
): Process => {
  return {
    ...newProgram,
    id: name + getRandomInt(100001).toString(),
    heap: HEAP,
    stack: STACK,
    base: base,
    memory: memory_process,
  };
};

// Funcion para crear un proceso vacio
export const create_empty_process = (
  base: number,
  memory: number,
  key: number
): Process => {
  return {
    heap: 0,
    stack: 0,
    id: "0",
    key: key,
    name: "0",
    bss: 0,
    data: 0,
    txt: 0,
    memory: memory,
    base: base,
  };
};
