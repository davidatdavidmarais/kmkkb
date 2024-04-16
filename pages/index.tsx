import { useState } from 'react';
import SearchComponent from "@/components/SearchComponent";
import InputBox from "@/components/InputBox";
import {CorneDefaultLeftBoard, CorneDefaultRightBoard} from "@/domain/boards/corne";
import {Board as BoardType} from "@/domain/types"
import Board from "@/components/Board";
import {Key} from "@/domain/types";
import {CurrentKey} from "@/pages/types";

export default function Index() {
    const [input, setInput] = useState<string>("")

    const [currentKey, setCurrentKey] = useState<CurrentKey | undefined>(undefined)
    const [leftBoard, setLeftBoard] = useState<BoardType>(CorneDefaultLeftBoard)
    const [rightBoard, setRightBoard] = useState<BoardType>(CorneDefaultRightBoard)

    function handleKeyDown(left: boolean, keyIndex: number, keyCode: string) {
        var board:BoardType;

        if (left) {
            board = {...leftBoard};
            board.Keys = board.Keys.slice()
            board.Keys[keyIndex].Value = keyCode;
            setLeftBoard(board);
        } else {
            board = {...rightBoard};
            board.Keys = board.Keys.slice()
            board.Keys[keyIndex].Value = keyCode;
            setRightBoard(board);
        }
    }

    function handleClick(left: boolean, keyIndex: number, key: Key) {
        var board:BoardType;

        setCurrentKey({
            Index: keyIndex,
            Left: left,
        })

        if (left) {
            board = {...leftBoard};
            board.Keys = board.Keys.slice()
            board.Keys[keyIndex].Value = "YES";
            setLeftBoard(board);
        } else {
            board = {...rightBoard};
            board.Keys = board.Keys.slice()
            board.Keys[keyIndex].Value = "YES";
            setRightBoard(board);
        }
    }

    return (
        <div className={"home"}>
            <div className={"boards"}>
                <Board classes={"board left"} board={leftBoard} onKeyDown={handleKeyDown} onClick={handleClick}></Board>
                <SearchComponent></SearchComponent>
                <Board classes={"board right"} board={rightBoard} onKeyDown={handleKeyDown} onClick={handleClick}></Board>
            </div>
            <div className={"inputbox"}>
                <InputBox setInput={setInput}></InputBox>
            </div>
      </div>
    );
}