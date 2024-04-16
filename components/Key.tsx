import {useState} from "react";
import {Key as KeyType} from "@/domain/types";

export default function Key(params:{keyType: KeyType, col: number, row: number, classes?: string, onKeyDown: (keyCode: any) => void, onClick: () => void}) {
    const [tabIndex, setTabIndex] = useState(1);

    function handleClick() {
        setTabIndex(0);
        params.onClick()
    }

    function handleKeyPressed(e: any) {
        params.onKeyDown(e);
    }

    return <div className={`cap col-${params.col} row-${params.row} ${params.classes}`} onKeyDown={handleKeyPressed} onClick={handleClick} tabIndex={tabIndex}>{params.keyType.Value}</div>;
}