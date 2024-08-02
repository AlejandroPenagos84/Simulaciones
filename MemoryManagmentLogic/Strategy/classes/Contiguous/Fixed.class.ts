import { Process } from "../../../interfaces/process.interface";
import { Program } from "../../../interfaces/program.interface";


import {
  create_empty_process,
  create_process,
  MEGABYTE,
} from "../../common/common_variables";
import { HEAP, STACK } from "../../common/common_variables";
import { ProcessContiguousStrategy } from "../../interfaces/ProcessStrategy.interface";

export class FixedPartitioning
  implements ProcessContiguousStrategy{

  private fit: (memory: Process[], memory_process: number) => number;
  private partitions: number[];

  constructor(fit: (memory: Process[], memory_process: number) => number, partitions: number[]) {
    this.fit = fit;
    this.partitions = partitions;
  }

  addProcess(
    newProgram: Program,
    memory: Process[],
    totalMemory: number
  ): { memory: Process[]; added: boolean; newTotalMemory: number } {
    const { name, bss, data, txt } = newProgram;
    const memory_process: number = bss + data + txt + HEAP + STACK;
    const index: number = this.fit(memory, memory_process);
    let added: boolean = false;
    let newTotalMemory: number = totalMemory;

    // En caso de que si haya espacio, agrega el proceso
    if (index !== -1) {
      memory[index] = create_process(
        newProgram,
        memory_process ,
        memory[index].base,
        name
      );
      added = true;
      newTotalMemory -= memory_process;
    }

    return { memory, added, newTotalMemory };
  }

  removeProcess(
    idProcess: string,
    memory: Process[],
    totalMemory: number
  ): { memory: Process[]; removed: boolean; newTotalMemory: number } {
    const process_index: number = memory.findIndex(
      (process) => process.id === idProcess
    );
    let removed = false;
    let newTotalMemory = totalMemory;

    if (process_index !== -1) {
      const process_deleted = memory[process_index];
      memory[process_index] = create_empty_process(
        process_deleted.base,
        this.partitions[process_index]*MEGABYTE,
        process_deleted.key
      );
      removed = true;
      newTotalMemory += process_deleted.memory;
    }

    return { memory, removed, newTotalMemory };
  }
}
