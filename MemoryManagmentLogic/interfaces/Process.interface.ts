export interface Process{
    id: string;
    key: number;
    name: string; 
    bss: number;
    data: number;
    txt: number;
    heap: number;
    stack: number;
    base: number;
    memory: number;
}