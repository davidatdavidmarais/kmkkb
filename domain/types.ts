export type Board = {
    Caps: Cap[]
}

export type Cap = {
    Row: number
    Col: number
    Value: string
    Classes?: string
}