import {useState} from "react";

export default function Key(params:{col: number, row: number, classes?: string}) {
    const [value, setValue] = useState("");
    const [tabIndex, setTabIndex] = useState(1);

    function handleClick() {
        setTabIndex(0);
    }

    function handleKeyPressed(e: any) {
        setValue(e.key);
    }

    return <div className={`cap col-${params.col} row-${params.row} ${params.classes}`} onKeyDown={handleKeyPressed} onClick={handleClick} tabIndex={tabIndex}>{value}</div>;
}