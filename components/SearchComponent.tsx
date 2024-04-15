import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import KeyComponent from './KeyComponent';
import kmkKeys from './Keyloader'

interface Key {
    label: string,
    value: string,
}
const HackerNewsStoriesWithSearch = () => {
    const [keys, setKeys] = useState<Key[]>([]);
    const [allKeys, setAllKeys] = useState<Key[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [keyword, setKeyword] = useState<string>('');

    const fetchKeys = async () => {
        let keys: Key[] = kmkKeys
        setKeys(keys)
        setAllKeys(keys)
        setLoading(false)
    };

    const updateKeyword = (keyword: string) => {
        const filtered = allKeys.filter(key => {
            return key.label.toLowerCase().includes(keyword.toLowerCase());
        })
        setKeyword(keyword);
        setKeys(filtered);
    }

    useEffect(() => {
        fetchKeys();
    }, []);

    return (
        <> { /* React fragment */}
            <div className="wrapper">
                <h2>Keys</h2>
                {loading && <div>Loading keys...</div>}
                <SearchBar keyword={keyword} handleSearch={updateKeyword}/>
                <div className="keys">
                    {  keys.map((k) => (
                        <KeyComponent key={k.label} label={k.label} value={k.value}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HackerNewsStoriesWithSearch;