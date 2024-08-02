import { Process } from "../../interfaces/process.interface";
import { create_empty_process, MEGABYTE, TOTAL } from "./common_variables";

export const static_memory = (num_mega_bytes: number): [Process[],number[]] => {
    const num_partitions: number = Math.floor(15/num_mega_bytes); // Numero de particiones
    const array: number[] = Array(num_partitions).fill(num_mega_bytes); // Numero de la particion
    const bases: number[] = create_array_bases(array);
    const memory: Process[] = create_memory(bases,array);

    return [memory, array];
}

export const variable_memory = (): [Process[], number[]] => {
    const array: number[] = [0.5,0.5,1,1,2,2,4,4];
    const bases: number[] = create_array_bases(array);
    const memory : Process[] = create_memory(bases, array);
    return [memory, array];
}

export const dynamic_no_compaction = () =>{
    return [create_empty_process(MEGABYTE,TOTAL-MEGABYTE,0)];
}

const create_array_bases = (array: number[]): number[] =>{
    const bases: number[] = [];
    let sum: number = MEGABYTE;

    for(let i: number = 0; i < array.length; i++){
        bases[i] = sum;
        sum+=MEGABYTE*array[i]; // LLenar las bases
    }

    return bases;
}

const create_memory = (bases: number[], array: number[])=>{
    return bases.map((base, index)=>{
        return create_empty_process(base, array[index]*MEGABYTE, index);
    })
}