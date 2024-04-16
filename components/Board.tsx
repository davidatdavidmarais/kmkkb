import {Board as BoardConfig, Key as KeyType} from "@/domain/types";
import Key from "@/components/Key";

export default function Board(params: {board: BoardConfig, classes: string, onKeyDown: (left: boolean, keyIndex: number, keyCode: string) => void, onClick: (left: boolean, keyIndex: number, key: KeyType) => void}) {
    return (
        <div className={params.classes}>
            {
                params.board.Keys.map(function(key, index) {
                    return <Key key={index} keyType={key} col={key.Col} row={key.Row} classes={key.Classes} onKeyDown={(keyCode: string) => { params.onKeyDown(params.board.Left, index, keyCode) }} onClick={() => { params.onClick(params.board.Left, index, key) }} />;
                })
            }
        </div>
    )
}