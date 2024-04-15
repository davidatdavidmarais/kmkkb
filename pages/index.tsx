import { useState } from 'react';
import SearchComponent from "@/components/SearchComponent";

function Cap(params:{col: number, row: number, classes?: string}) {
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

function LeftBoard() {
    return (
                <div className="board left">
                    <Cap col={1} row={1} />
                    <Cap col={2} row={1} />
                    <Cap col={3} row={1} />
                    <Cap col={4} row={1} />
                    <Cap col={5} row={1} />
                    <Cap col={6} row={1} />

                    <Cap col={1} row={2} />
                    <Cap col={2} row={2} />
                    <Cap col={3} row={2} />
                    <Cap col={4} row={2} />
                    <Cap col={5} row={2} />
                    <Cap col={6} row={2} />

                    <Cap col={1} row={3} />
                    <Cap col={2} row={3} />
                    <Cap col={3} row={3} />
                    <Cap col={4} row={3} />
                    <Cap col={5} row={3} />
                    <Cap col={6} row={3} />

                    <Cap col={1} row={4} />
                    <Cap col={2} row={4} />
                    <Cap col={3} row={4} />
                    <Cap col={4} row={4} classes={"thumb-1"} />
                    <Cap col={5} row={4} classes={"thumb-2"} />
                    <Cap col={6} row={4} classes={"thumb-3"} />
                </div>
    )
}

function RightBoard() {
    return (
            <div className="board right">
                <Cap col={1} row={1} />
                <Cap col={2} row={1} />
                <Cap col={3} row={1} />
                <Cap col={4} row={1} />
                <Cap col={5} row={1} />
                <Cap col={6} row={1} />

                <Cap col={1} row={2} />
                <Cap col={2} row={2} />
                <Cap col={3} row={2} />
                <Cap col={4} row={2} />
                <Cap col={5} row={2} />
                <Cap col={6} row={2} />

                <Cap col={1} row={3} />
                <Cap col={2} row={3} />
                <Cap col={3} row={3} />
                <Cap col={4} row={3} />
                <Cap col={5} row={3} />
                <Cap col={6} row={3} />

                <Cap col={1} row={4} classes={"thumb-1"} />
                <Cap col={2} row={4} classes={"thumb-2"} />
                <Cap col={3} row={4} classes={"thumb-3"} />
                <Cap col={4} row={4} />
                <Cap col={5} row={4} />
                <Cap col={6} row={4} />
            </div>
    )
}

export default function Boards() {
    return (
        <div className={"boards"}>
            <LeftBoard></LeftBoard>
            <SearchComponent></SearchComponent>
            <RightBoard></RightBoard>
        </div>
    );
}