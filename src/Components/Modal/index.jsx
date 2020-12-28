import React, { useState } from 'react';
import Slider from '../Slider';
import './modal.scss';

function Modal({ submit, data }) {
  const [red, updateRed] = useState(data ? data.blood : 75);
  const [blue, updateBlue] = useState(data ? data.anxiety : 75);
  const [black, updateBlack] = useState(data ? data.heart : 75);
  const [notes, updateNotes] = useState(data ? data.notes : '');
  const onChange = ({ target }) => updateNotes(target.value);

  const submitButton = () => {
    submit(red, blue, black, notes);
  };

  return (
    <div className="modalContainer">
      <Slider option="red" label="Bleeding" update={updateRed} startValue={red} />
      <Slider option="blue" label="Anxiety" update={updateBlue} startValue={blue} />
      <Slider option="black" label="Heart" update={updateBlack} startValue={black} />
      <div className="textArea">
        <p>Notes</p>
        <textarea id="notes" name="notes" onChange={onChange} value={notes} />
      </div>
      <div className="buttonArea" style={{ flexDirection: 'row', alignItems: 'center' }}>
        <div className="flex" />
        <button type="button" onClick={submitButton} className="flex submitButton">
          Submit
        </button>
        <div className="flex" />
      </div>
    </div>
  );
}

export default Modal;
