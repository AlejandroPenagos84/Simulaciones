import { Process } from "../../interfaces/process.interface";
import { Program } from "../../interfaces/program.interface";

export interface ProcessContiguousStrategy{
    addProcess(newProgram: Program, memory: Process[], totalMemory: number): 
    {memory: Process[], added: boolean, newTotalMemory: number};

    removeProcess(idProcess: string, memory: Process[], totalMemory: number): 
    {memory: Process[], removed: boolean, newTotalMemory: number};
}