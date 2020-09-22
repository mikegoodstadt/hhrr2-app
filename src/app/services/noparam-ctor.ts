export type NoParamConstructor<T> = new (...args: any[]) => T;
// export interface NoParamConstructor<T> {
//     new (...args: any[]): T;
//    // Or enforce default constructor
//    // new (): T;
// }
