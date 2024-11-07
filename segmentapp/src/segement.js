import React, { useState } from 'react';
import './SegmentForm.css';

const SegmentForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  
  const allOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ];
  
  const getAvailableOptions = () =>
    allOptions.filter(option => !selectedSchemas.includes(option.value));
  
  const handleSaveSegment = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSegmentName('');
    setSelectedSchemas([]);
  };

  const handleSchemaSelection = (e, index) => {
    const newSchema = e.target.value;
    const updatedSchemas = [...selectedSchemas];
    updatedSchemas[index] = newSchema;
    setSelectedSchemas(updatedSchemas);
  };

  const handleAddNewSchema = () => {
    setSelectedSchemas([...selectedSchemas, '']);
  };

  const handleSubmit = async () => {
    const formattedSchema = selectedSchemas.map(schema => {
      const label = allOptions.find(option => option.value === schema)?.label;
      return { [schema]: label };
    });

    const data = {
      segment_name: segmentName,
      schema: formattedSchema
    };

    try {
      await fetch("https://webhook.site/your-unique-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      alert("Segment saved successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error saving segment:", error);
    }
  };

  return (
    <div className="segment-form">
      <button onClick={handleSaveSegment}>Save segment</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Save Segment</h2>
            <label>
              Segment Name:
              <input
                type="text"
                value={segmentName}
                onChange={e => setSegmentName(e.target.value)}
              />
            </label>

            <div className="schema-selection">
              {selectedSchemas.map((schema, index) => (
                <select
                  key={index}
                  value={schema}
                  onChange={e => handleSchemaSelection(e, index)}
                >
                  <option value="" disabled>
                    Select schema
                  </option>
                  {getAvailableOptions().map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ))}
            </div>

            <button onClick={handleAddNewSchema}>+Add new schema</button>

            <button onClick={handleSubmit}>Save Segment</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentForm;
