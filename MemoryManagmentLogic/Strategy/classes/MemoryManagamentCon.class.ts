import { Process } from "../../interfaces/process.interface";
import { Program } from "../../interfaces/program.interface";
import { MEGABYTE } from "../common/common_variables";
import { ProcessContiguousStrategy } from "../interfaces/ProcessStrategy.interface";

/**
 * Clase que maneja las particiones contiguas 
 */
// Clase Context
export class MemoryManagamentContiguous {
  private processStrategy!: ProcessContiguousStrategy;
  private memory!: Process[];
  private totalMemory: number;

  constructor() {
    this.totalMemory = 15728640;
  }

  public setInitialMemory(memory: Process[]){
    this.memory = memory;
  }

  get Memory(): Process[]{
    if(this.memory === undefined) return []
    else return [...this.memory];
  }

  get total_Memory(): number{
    return this.totalMemory;
  }

  setTotalMemory(): void{
    this.totalMemory = MEGABYTE*15;
  }

  // Inyeccion por setters.
  public setStrategies(
    processStrategy: ProcessContiguousStrategy
  ) : void{
    this.processStrategy = processStrategy;
  }

  public addProgram(newProgram: Program): void
  {
    const result : 
    {
      memory: Process[],
      added: boolean,
      newTotalMemory: number
    } = this.processStrategy.addProcess(newProgram, this.memory, this.totalMemory);
      this.memory = result.memory;
      this.totalMemory = result.newTotalMemory;
  }

  public removeProcess(idProcess: string): void 
  {
    const result: {    
      memory: Process[],
      removed: boolean,
      newTotalMemory: number
    } = this.processStrategy.removeProcess(idProcess,this.memory, this.totalMemory);
      this.memory = result.memory;
      this.totalMemory = result.newTotalMemory;
  }
}
