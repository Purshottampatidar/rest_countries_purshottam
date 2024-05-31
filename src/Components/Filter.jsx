export default function Filter({ onSelect, target, filterBy }) {
  const handleRegionChange = (e) => {
    onSelect(e.target.value);
  };
  return (
    <>
      <select
        onChange={handleRegionChange}
        key={filterBy}
        className="filter-container"
      >
        <option value="">Filter by {filterBy}</option>
        {[...target].map((response) => (
          <option key={response} value={response}>
            {response}
          </option>
        ))}
      </select>
    </>
  );
}
