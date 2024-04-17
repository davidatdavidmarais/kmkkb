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

    return <div className={`cap border-2 col-${params.col} row-${params.row} ${params.classes ? params.classes : ''} ${params.keyType.Selected ? 'border-blue-500' : 'border-black'}`} onKeyDown={handleKeyPressed} onClick={handleClick} tabIndex={tabIndex}>{params.keyType.Value}</div>;
}