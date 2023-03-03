const Filters = props => {
  return (
    <div className="filters-container">
      <h2>Filter</h2>
      <div className="filters-section">
        <div className="filters-section-title">Tags</div>
        <div className="filters-section-instructions">Select all that apply.</div>
        <div className="filter-tags-container tags">
          {props.tags.map((tag, i) => (
            <div key={`filter-tag-${i}`} className="tag unselected">{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;