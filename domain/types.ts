export type BoardsConfig = {
    Layer: BoardConfig[]
}

export type BoardConfig = {
    Left: Board
    Right: Board
}

export type Board = {
    Left: boolean
    Keys: Key[]
}

export type Key = {
    Row: number
    Col: number
    Value: string
    Classes?: string
}