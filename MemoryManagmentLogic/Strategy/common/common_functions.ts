import { Process } from "../../interfaces/process.interface";


// Primer ajuste
export const first_fit = (memory: Process[], memory_process: number): number => 
{
    let index: number = -1;
    for (let i: number = 0; i < memory.length; i++) {
      if (memory[i].memory > memory_process && memory[i].id === '0') {
        index = i;
        break;
      }
    }
    return index;
}

// Mejor ajuste
export const best_fit = (memory: Process[], memory_process: number) : number => 
{
    let index:number = -1;
    let diference:number = 0;
    let minDiference:number = -1;
    for (let i: number = 0; i < memory.length; i++) {
      if (memory[i].memory >= memory_process && memory[i].id === '0') {
        diference = memory[i].memory - memory_process;
        if(diference >= 0){
          if(minDiference === -1 || minDiference>diference) 
          {
            minDiference = diference;
            index = i;
          }
        }
      }
    }
    return index;
}

// Peor ajuste
export const worst_fit = (memory: Process[], memory_process: number) : number =>
{
    let index:number = -1;
    let max:number = 0;
    for (let i:number = 0; i < memory.length; i++) {
      if (memory[i].memory > memory_process && memory[i].id === '0') {
        if (max <= memory[i].memory) {
          index = i;
          max = memory[i].memory;
        }
      }
    }
    return index;
}

// Esta funcion permite unir las memoria en blanco para las particiones dinamicas sin compactacion
export const linkMemory = (index: number, memory: Process[]): void =>
{
  if(memory.length != 0 && index !== memory.length -1)
  {
    if(memory[index].id === '0'&& memory[index+1].id === '0')
    {
      memory[index].memory += memory[index + 1].memory;
      memory.splice(index + 1, 1); // Elimina el proceso siguiente
      linkMemory(index, memory); // Llama recursivamente a la función con el mismo índice
    }else{
      linkMemory(index+1,memory);
    }
  }
}

