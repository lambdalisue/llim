import { Buffer } from './buffer';
import { TextObj, repeatTextObj } from './textobj';

export interface OperatorParams {
    repeat: number;
}

export abstract class Operator {
    constructor(public params: OperatorParams) {}

    abstract execute(buffer: Buffer, textobj: TextObj): void;
}

export class OperatorSelect extends Operator {
    execute(buffer: Buffer, textobj: TextObj): void {
        buffer.selection = repeatTextObj(buffer, textobj, this.params.repeat);
    }
}
