import { useState } from "react";
import Select from 'react-select';

const Filters = props => {
  const [selectedTags, setSelectedTags] = useState([]);

  const nameSelectionHandler = selection => {
    const action = selection === null ? "remove" : "add";
    const label = selection === null ? "" : selection.label;
    props.filterSensors("name", label, action);
  };

  const tagClickHandler = tag => {
    // Update the list of selected tags
    const tags = JSON.parse(JSON.stringify(selectedTags));
    let action = "";
    if (tags.includes(tag)) {
      const index = tags.indexOf(tag);
      tags.splice(index, 1);
      action = "remove";
    } else {
      tags.push(tag);
      action = "add";
    }

    setSelectedTags(tags);

    props.filterSensors("tag", tag, action);
  }

  return (
    <div className="filters-container">
      <h2>Filter</h2>
      <div className="filters-section">
        <div className="filters-section-title">Name</div>
        <div className="filters-section-instructions">Start typing the name of the filter.</div>
        <Select
          options={props.names}
          isClearable
          onChange={nameSelectionHandler}
        />
      </div>
      <div className="filters-section">
        <div className="filters-section-title">Tags</div>
        <div className="filters-section-instructions">Select all that apply.</div>
        <div className="filter-tags-container tags">
          {props.tags.map((tag, i) => (
            <div 
              key={`filter-tag-${i}`} 
              className={`tag ${!selectedTags.includes(tag) && "unselected"}`}
              onClick={() => tagClickHandler(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;