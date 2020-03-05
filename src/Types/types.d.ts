interface ITable {
    row: number;
    column: number;
}
interface IUseInput {
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}