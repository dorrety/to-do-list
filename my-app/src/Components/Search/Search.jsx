export default function Search({ searchItem, setSearchItem }) {

    const handleSearch = (e) => {
        setSearchItem(e.target.value)
    }

    return (
        <>
            <input
            type="text"
            value={searchItem}
            onChange={handleSearch}
            placeholder='Type to search'
            />
        </>
    )
}