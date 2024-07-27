// eslint-disable-next-line react/prop-types
function Filter({ date, type, onDateChange, onTypeChange }) {
  return (
    <div className="filter-container">
      <input
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
      />
      <select value={type} onChange={(e) => onTypeChange(e.target.value)}>
        <option value="">All Types</option>
        <option value="yoga">Yoga</option>
        <option value="meditation">Meditation</option>
        <option value="fitness">Fitness</option>
      </select>
    </div>
  );
}

export default Filter;