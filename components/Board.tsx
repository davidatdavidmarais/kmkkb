import {Board as BoardConfig} from "@/domain/types";
import Key from "@/components/Key";

export default function Board(params: {board: BoardConfig, classes: string}) {
    return (
        <div className={params.classes}>
            {
                params.board.Caps.map(function(cap, index) {
                    return <Key key={index} col={cap.Col} row={cap.Row} classes={cap.Classes} />;
                })
            }
        </div>
    )
}