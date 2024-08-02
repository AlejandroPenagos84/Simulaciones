import { Process } from "../../../interfaces/process.interface";
import { Program } from "../../../interfaces/program.interface";

import { create_empty_process, create_process } from "../../common/common_variables";
import { HEAP, STACK } from "../../common/common_variables";

import { linkMemory } from "../../common/common_functions";
import { ProcessContiguousStrategy } from "../../interfaces/ProcessStrategy.interface";

export class NoCompaction implements ProcessContiguousStrategy {
  private fit: (memory: Process[], memory_process: number) => number;
  constructor(fit: (memory: Process[], memory_process: number) => number) {
    this.fit = fit;
  }

  addProcess(newProgram: Program, memory: Process[], totalMemory: number): 
  { memory: Process[], added: boolean, newTotalMemory: number } {
    const { name, bss, data, txt } = newProgram;
    const memory_process: number = bss + data + txt + HEAP + STACK;
    const index: number = this.fit(memory, memory_process);
    let added: boolean = false;
    let newTotalMemory: number = totalMemory;

    // En caso de que si haya espacio, agrega el proceso
    if (index !== -1) {
      let new_process: Process = create_process(newProgram,memory_process, memory[index].base, name);
      memory[index].base += memory_process;
      memory[index].memory -= memory_process;
      memory = [...memory.slice(0, index), new_process, ...memory.slice(index)];

      added = true;
      newTotalMemory -= memory_process;

      //console.log(memory)
    }
    return { memory, added, newTotalMemory };
  }


  removeProcess(idProcess: string, memory: Process[], totalMemory: number): 
  { memory: Process[]; removed: boolean, newTotalMemory: number } {
    const process_index: number = memory.findIndex(process => process.id === idProcess);
    let removed: boolean = false;
    let newTotalMemory: number = totalMemory;

    if (process_index !== -1) {
      const process_deleted = memory[process_index];
      memory[process_index] = create_empty_process(process_deleted.base, process_deleted.memory, process_deleted.key);
      removed = true;
      newTotalMemory += process_deleted.memory;
      linkMemory(0, memory);
    }
    return { memory, removed, newTotalMemory };
  }
}