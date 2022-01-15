import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addData } from '../../actions';
import './form.scss';


const Form = ({addData}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [availability, setAvailability] = useState('');
  const full = 'Full';
  const available = 'Available';

  const handleOnSubmit = () => {
    addData(name, category, availability);
    setName('');
    setCategory('');
    setAvailability('');
  }

  return (
    <div className="form">
      <div className="name">
        <div>Name</div>
        <input 
          type="text"
          placeholder="Enter Your Name"
          className="input-name" 
          onChange={e => setName(e.target.value)}
          value={name}
        />
      </div>

       <div className="category">
        <div>Category</div>
        <select name="categories"  placeholder="Enter Your Name"  className="dropdown-category" onChange={e => setCategory(e.target.value)} value={category}>
          <option value="" disabled defaultValue>Select your option</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
          <option value="Category 4">Category 4</option>
        </select>
      </div>
  

      <div className="availability">
        <div>Availability</div>
        <div className="radio-availability">
          <input
            checked={availability === available}
            type="radio"
            id="available"
            name ="availability"
            value={available}
            onChange={() => setAvailability(available)}
          />

          <label htmlFor="available">Available</label>
          
          <input
            checked={availability === full}
            type="radio"
            id="full" 
            name ="availability"
            value={full}
            onChange={() => setAvailability(full)}
          />

          <label htmlFor="full">Full</label>
        </div>
      </div>

      <div className="arrival">
        <div>Arrival</div>
        <input
          disabled
          type="text"
          className="input-arrival"
          placeholder="Value Hasn't Arrived"          
        />
      </div>
      <div>

        <button 
          className="btn-form"
          onClick={handleOnSubmit}
        >
          Submit Form
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    input: state.input
  }
}

export default connect(mapStateToProps, { addData }) (Form);