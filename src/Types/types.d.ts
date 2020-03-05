interface ITable {
    row: number;
    column: number;
    title: string;
}
interface IUseInputNumber {
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface IUseInputString {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}