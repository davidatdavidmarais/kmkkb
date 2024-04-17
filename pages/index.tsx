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

        let mapped = Html2KMK.get(keyCode);
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
        let tempBoards = {...boards};
        tempBoards.Layer[currentLayer].Left.Keys = tempBoards.Layer[currentLayer].Left.Keys.slice()
        tempBoards.Layer[currentLayer].Right.Keys = tempBoards.Layer[currentLayer].Right.Keys.slice()
        for (let i = 0; i < tempBoards.Layer.length; i++) {
            for (let ii = 0; ii < tempBoards.Layer[i].Left.Keys.length; ii++) {
                tempBoards.Layer[i].Left.Keys[ii].Selected = false
                if (left && keyIndex == ii) {
                    tempBoards.Layer[i].Left.Keys[ii].Selected = true
                }
            }
            for (let ii = 0; ii < tempBoards.Layer[i].Right.Keys.length; ii++) {
                tempBoards.Layer[i].Right.Keys[ii].Selected = false
                if (!left && keyIndex == ii) {
                    tempBoards.Layer[i].Right.Keys[ii].Selected = true
                }
            }
        }
        setBoards(tempBoards);
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

    async function copy() {
        let copyValues: string = `keyboard.keymap = [
    `;

        let rowCount = 0;
        let colCount = 0;

        for (const k of boards.Layer[0].Left.Keys) {
            if (k.Col > colCount) {
                colCount = k.Col
            }
            if (k.Row > rowCount) {
                rowCount = k.Row
            }
        }

        // We only support split keyboards now.
        for (let i: number = 0; i < boards.Layer.length; i++) {
            copyValues += `# Layer ${i+1}
    ${createLayerCopy(rowCount, colCount, i)}${i == boards.Layer.length - 1 ? '' : ','}
    `;
        }

        copyValues += `]`

        await navigator.clipboard.writeText(copyValues);
    }

    function createLayerCopy(rowCount: number, colCount: number, layerIndex: number): string {
        let layerData = `[
    `;

        let leftIndex:number = 0;
        let rightIndex:number = 0;
        for (let r:number = 0; r < rowCount; r++) {
            // Left
            for (let lc:number = 0; lc < colCount; lc++) {
                if (lc == 0) {
                    layerData += `    `
                }
                layerData += `${boards.Layer[layerIndex].Left.Keys[leftIndex].Value},`
                leftIndex++;
            }
            // Right
            for (let rc:number = 0; rc < colCount; rc++) {
                layerData += `${rc == 0 ? '                ' : '    '}${boards.Layer[layerIndex].Right.Keys[rightIndex].Value}`
                if (r != rowCount - 1 && rc != colCount - 1) {
                       layerData += `,`
                }
                rightIndex++;
            }
            layerData += `${r == rowCount - 1 ? '' : ','}
    `
        }

        layerData += `]`

        return layerData;
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
        setValue(e.target.value);
    }

    function changeLayer(layer: number) {
        setCurrentLayer(layer);
    }

    return (
        <div className={"home"}>
            <div className={"boards"}>
                <Board classes={"board left"} board={boards.Layer[currentLayer].Left} onKeyDown={handleKeyDown}
                       onClick={handleClick}></Board>
                <SearchComponent onSelectedItem={setValue}></SearchComponent>
                <Board classes={"board right"} board={boards.Layer[currentLayer].Right} onKeyDown={handleKeyDown}
                       onClick={handleClick}></Board>
            </div>
            <div className={"inputbox"}>
                <InputBox setInput={setInput}></InputBox>
            </div>
            <div className={"m-4"}>
                Layers
            </div>
            <div className={"m-4"}>
                {
                    boards.Layer.map(function (value, index) {
                        return (
                            <div
                                className={"mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline cursor-pointer " + (currentLayer === index ? "bg-red-500 hover:bg-red-700 " : "bg-blue-500 hover:bg-blue-700")}
                                key={index} onClick={function () {
                                changeLayer(index)
                            }}>{index + 1}</div>
                        );
                    })
                }
                <button className={"mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                        onClick={addLayer}>+
                </button>
                <button className={"mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                        onClick={removeLayer}>-
                </button>
            </div>
            <div className={"m-4"}>
                Current Key Value:
            </div>
            <div className={"m-4"}>
                <input className={"font-bold border-4 border-blue-200 rounded"} value={getValue()}
                       onChange={updateKey}/>
            </div>
            <div className={"m-4"}>
                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                        onClick={save}>Save Config
                </button>
            </div>
            <div className={"m-4"}>
                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                        onClick={copy}>Copy to clipboard
                </button>
            </div>
        </div>
    );
}