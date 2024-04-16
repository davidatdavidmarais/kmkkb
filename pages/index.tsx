import { useState } from 'react';
import SearchComponent from "@/components/SearchComponent";
import InputBox from "@/components/InputBox";
import {CorneDefaultLeftBoard, CorneDefaultRightBoard} from "@/domain/boards/corne";
import Board from "@/components/Board";

export default function Index() {
    const [input, setInput] = useState<string>("")

    return (
        <div className={"home"}>
            <div className={"boards"}>
                <Board classes={"board left"} board={CorneDefaultLeftBoard}></Board>
                <SearchComponent></SearchComponent>
                <Board classes={"board right"} board={CorneDefaultRightBoard}></Board>
            </div>
            <div className={"inputbox"}>
                <InputBox setInput={setInput}></InputBox>
            </div>
      </div>
    );
}