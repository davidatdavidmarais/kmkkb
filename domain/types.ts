export type Board = {
    Keys: Key[]
}

export type Key = {
    Row: number
    Col: number
    Value: string
    Classes?: string
}