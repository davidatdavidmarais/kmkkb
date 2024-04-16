import {Board as BoardConfig} from "@/domain/types";
import Key from "@/components/Key";

export default function Board(params: {board: BoardConfig, classes: string}) {
    return (
        <div className={params.classes}>
            {
                params.board.Keys.map(function(key, index) {
                    return <Key key={index} col={key.Col} row={key.Row} classes={key.Classes} />;
                })
            }
        </div>
    )
}