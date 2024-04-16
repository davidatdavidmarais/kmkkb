import {useEffect, useState} from 'react';
import SearchComponent from "@/components/SearchComponent";
import InputBox from "@/components/InputBox";
import {CorneDefaultLeftBoard, CorneDefaultRightBoard} from "@/domain/boards/corne";
import {BoardsConfig} from "@/domain/types"
import Board from "@/components/Board";
import {Key} from "@/domain/types";
import {CurrentKey} from "@/pages/types";
import {Html2KMK} from "@/domain/kmk/Html2KMK";

export default function Index() {
    const [input, setInput] = useState<string>("")

    const [currentLayer, setCurrentLayer] = useState<number>(0);
    const [currentKey, setCurrentKey] = useState<CurrentKey | undefined>(undefined)
    const [boards, setBoards] = useState<BoardsConfig>({
        Layer: [{
            Left: CorneDefaultLeftBoard,
            Right: CorneDefaultRightBoard,
        }]
    })

    useEffect(() => {
        load();
    }, []);

    function handleKeyDown(left: boolean, keyIndex: number, e: any) {
        let tempBoards:BoardsConfig;
        let keyCode = e.key;

        console.log("keydown");
        console.log(e);

        let mapped = Html2KMK.get(keyCode);
        console.log(mapped);
        if (mapped) {
            keyCode = mapped;
        }

        if (left) {
            tempBoards = {...boards};
            tempBoards.Layer[currentLayer].Left.Keys = tempBoards.Layer[currentLayer].Left.Keys.slice()
            tempBoards.Layer[currentLayer].Left.Keys[keyIndex].Value = keyCode;
            setBoards(tempBoards);
        } else {
            tempBoards = {...boards};
            tempBoards.Layer[currentLayer].Right.Keys = tempBoards.Layer[currentLayer].Right.Keys.slice()
            tempBoards.Layer[currentLayer].Right.Keys[keyIndex].Value = keyCode;
            setBoards(tempBoards);
        }
    }

    function handleClick(left: boolean, keyIndex: number, key: Key) {
        setCurrentKey({
            Index: keyIndex,
            Left: left,
        })
    }

    function addLayer() {
        let tempBoards = {...boards};
        tempBoards.Layer.push({
            Left: CorneDefaultLeftBoard,
            Right: CorneDefaultRightBoard,
        })
        setBoards(tempBoards);
        setCurrentLayer(tempBoards.Layer.length - 1);
    }

    function removeLayer() {
        let tempBoards = {...boards};
        tempBoards.Layer.splice(currentLayer, 1);
        setBoards(tempBoards);
        setCurrentLayer(0);
    }

    function getValue(): string {
        if (currentKey === undefined) {
            return "";
        }

        if (currentKey?.Left) {
            return boards.Layer[currentLayer].Left.Keys[currentKey.Index].Value;
        }

        return boards.Layer[currentLayer].Right.Keys[currentKey.Index].Value;
    }

    function setValue(value: string) {
        if (currentKey === undefined) {
            return;
        }

        if (currentKey?.Left) {
            let tempBoards = {...boards};
            tempBoards.Layer[currentLayer].Left.Keys = tempBoards.Layer[currentLayer].Left.Keys.slice()
            tempBoards.Layer[currentLayer].Left.Keys[currentKey.Index].Value = value;
            setBoards(tempBoards);
            return;
        }

        let tempBoards = {...boards};
        tempBoards.Layer[currentLayer].Right.Keys = tempBoards.Layer[currentLayer].Right.Keys.slice()
        tempBoards.Layer[currentLayer].Right.Keys[currentKey.Index].Value = value;
        setBoards(tempBoards);
        return;
    }

    function save() {
        localStorage.setItem("boardconfig", JSON.stringify(boards))
    }

    function load() {
        const ls = localStorage.getItem('boardconfig');
        if (ls === null) {
            return;
        }

        const config = JSON.parse(ls);
        setBoards(config);
        setCurrentKey(undefined);
    }

    function updateKey(e: any) {
        console.log(e.target.value);
        setValue(e.target.value);
    }

    function changeLayer(layer: number) {
        setCurrentLayer(layer);
    }

    return (
        <div className={"home"}>
            <div className={"boards"}>
                <Board classes={"board left"} board={boards.Layer[currentLayer].Left} onKeyDown={handleKeyDown} onClick={handleClick}></Board>
                <SearchComponent></SearchComponent>
                <Board classes={"board right"} board={boards.Layer[currentLayer].Right} onKeyDown={handleKeyDown}
                       onClick={handleClick}></Board>
            </div>
            <div className={"inputbox"}>
                <InputBox setInput={setInput}></InputBox>
            </div>
            <div>
                Layers
                {
                    boards.Layer.map(function(value, index) {
                        return (
                            <div className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline cursor-pointer " + (currentLayer === index ? "bg-red-500 hover:bg-red-700 " : "bg-blue-500 hover:bg-blue-700")} key={index} onClick={function() {changeLayer(index)} }>{index + 1}</div>
                        );
                    })
                }
            </div>
            <div>
                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                        onClick={addLayer}>Add Layer
                </button>
                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                        onClick={removeLayer}>Remove Layer
                </button>
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