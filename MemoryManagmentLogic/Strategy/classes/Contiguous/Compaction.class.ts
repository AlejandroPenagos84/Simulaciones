import { Process } from "../../../interfaces/process.interface";
import { Program } from "../../../interfaces/program.interface";

import { create_process} from "../../common/common_variables";
import { HEAP, STACK } from "../../common/common_variables";
import { ProcessContiguousStrategy } from "../../interfaces/ProcessStrategy.interface";

export class Compaction implements ProcessContiguousStrategy{
    
    addProcess(newProgram: Program, memory: Process[], totalMemory: number): 
    { memory: Process[], added: boolean, newTotalMemory: number } {
        const { name, bss, data, txt } = newProgram;
        const memory_process = bss + data + txt + HEAP + STACK;
        let added = false;
        let newTotalMemory: number = totalMemory;
        let index: number = memory.findIndex(process => process.id === '0');

        // En caso de que si haya espacio, agrega el proceso
        if (index !== -1 && memory_process<=memory[index].memory) {
          let new_process: Process = create_process(newProgram,memory_process, memory[index].base, name);
          memory[index].base += memory_process;
          memory[index].memory -= memory_process;
          memory = [...memory.slice(0, index), new_process, ...memory.slice(index)];
    
          added = true;
          newTotalMemory -= memory_process;
        }
        return {memory,added, newTotalMemory};
    }

    
    removeProcess(idProcess: string, memory: Process[], totalMemory: number): 
    { memory: Process[]; removed: boolean, newTotalMemory: number } {
        const process_index: number = memory.findIndex( process => process.id === idProcess);
        let removed = false;
        let newTotalMemory: number = totalMemory;

        if(process_index !== -1){
            const process_deleted = memory[process_index];
            for(let i: number = memory.length -1 ; i > process_index; i--)
              memory[i].base = memory[i-1].base;

            memory = [...memory.slice(0, process_index), ...memory.slice(process_index+1)];
            
            const empty_process_index: number = memory.findIndex(process => process.id === '0');
            memory[empty_process_index].memory += process_deleted.memory;
            removed = true;
            newTotalMemory += process_deleted.memory;
        }
        return {memory, removed, newTotalMemory};
    }
}