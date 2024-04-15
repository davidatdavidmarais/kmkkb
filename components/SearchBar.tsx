
interface Props {
    keyword: string;
    handleSearch: (keyword: string) => void;
}

const SearchBar = ({keyword, handleSearch}: Props) => {
    const BarStyle = {width:"20rem",background:"#F0F0F0", border:"none", padding:"0.5rem"};
    return (
        <input
            style={BarStyle}
            key="search-bar"
            value={keyword}
            placeholder={"search keys"}
            onChange={(e) => handleSearch(e.target.value)}
        />
    );
}

export default SearchBar;