import {useEffect, useState} from 'react';
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


    useEffect(() => {
        load();
    }, []);

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
        setCurrentKey({
            Index: keyIndex,
            Left: left,
        })
    }

    function getValue(): string {
        if (currentKey === undefined) {
            return "";
        }

        if (currentKey?.Left) {
            return leftBoard.Keys[currentKey.Index].Value;
        }

        return rightBoard.Keys[currentKey.Index].Value;
    }

    function setValue(value: string) {
        if (currentKey === undefined) {
            return;
        }

        if (currentKey?.Left) {
            let board = {...leftBoard};
            board.Keys = board.Keys.slice()
            board.Keys[currentKey.Index].Value = value;
            setLeftBoard(board);
            return;
        }

        let board = {...rightBoard};
        board.Keys = board.Keys.slice()
        board.Keys[currentKey.Index].Value = value;
        setRightBoard(board);
        return;
    }

    function save() {
        localStorage.setItem("boardconfig", JSON.stringify({
            left: leftBoard,
            right: rightBoard
        }))
    }

    function load() {
        const ls = localStorage.getItem('boardconfig');
        if (ls === null) {
            return;
        }

        const config = JSON.parse(ls);
        setLeftBoard(config.left);
        setRightBoard(config.right);
        setCurrentKey(undefined);
    }

    function updateKey(e: any) {
        console.log(e.target.value);
        setValue(e.target.value);
    }

    return (
        <div className={"home"}>
            <div className={"boards"}>
                <Board classes={"board left"} board={leftBoard} onKeyDown={handleKeyDown} onClick={handleClick}></Board>
                <SearchComponent></SearchComponent>
                <Board classes={"board right"} board={rightBoard} onKeyDown={handleKeyDown}
                       onClick={handleClick}></Board>
            </div>
            <div className={"inputbox"}>
                <InputBox setInput={setInput}></InputBox>
            </div>
            <div>
                Current Key Value:
                <input value={getValue()} onChange={updateKey}/>
            </div>
            <div>
                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} onClick={save}>Save Config</button>
            </div>
        </div>
    );
}