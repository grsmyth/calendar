import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from '../Components/Modal';
import { returnRed, returnBlue, returnBlack, returnRGB } from '../utils';
import './home.scss';

export default function Home() {
  const [value, onChange] = useState(new Date());
  const [displayModal, onChangeDisplayModal] = useState(false);
  const [days, updateDays] = useState([]);
  const [todaysData, updateTodaysData] = useState(null);
  const [update, setUpdate] = useState(false);

  // eslint-disable-next-line no-undef
  const readAll = () => fetch('/.netlify/functions/getAllDays').then((response) => response.json());
  const hasDay = (date) => days.find((day) => date.toDateString() === day.data.date);

  useEffect(async () => {
    const allDays = await readAll();
    updateDays(allDays);
  }, [update]);

  function tileClassName({ date }) {
    const current = new Date();

    if (date.toDateString() === current.toDateString()) {
      return 'current';
    }

    if (date.toDateString() === value.toDateString()) {
      return 'selected';
    }

    return '';
  }

  // eslint-disable-next-line no-unused-vars
  const onClickDay = (dayValue, dayEvent) => {
    const today = hasDay(dayValue);
    updateTodaysData(today ? today.data : undefined);
    onChangeDisplayModal(true);
  };

  const closeButton = () => {
    onChangeDisplayModal(false);
  };

  const submitModal = (red, blue, black, notes) => {
    const data = {
      date: value.toDateString(),
      blood: red,
      anxiety: blue,
      heart: black,
      notes,
    };
    if (!todaysData) {
      // eslint-disable-next-line no-undef
      fetch('/.netlify/functions/dayCreate', {
        body: JSON.stringify(data),
        method: 'POST',
      }).then((response) => {
        onChangeDisplayModal(false);
        setUpdate(!update);
        return response.json();
      });
    } else {
      // eslint-disable-next-line no-undef
      fetch('/.netlify/functions/dayUpdate', {
        body: JSON.stringify(data),
        method: 'POST',
      }).then((response) => {
        onChangeDisplayModal(false);
        setUpdate(!update);
        return response.json();
      });
    }
  };

  const tileContent = ({ date }) => {
    const day = hasDay(date);
    const red = day && day.data.blood ? returnRGB(returnRed(day.data.blood)) : 'white';
    const blue = day && day.data.anxiety ? returnRGB(returnBlue(day.data.anxiety)) : 'white';
    const black = day && day.data.heart ? returnRGB(returnBlack(day.data.heart)) : 'white';
    const hasNotes = day && day.data.notes;
    return (
      <>
        <div className="tileContainer">
          <div style={{ backgroundColor: red }} className="tileContainer__sub tileContainerB" />
          <div style={{ backgroundColor: blue }} className="tileContainer__sub tileContainerA" />
          <div style={{ backgroundColor: black }} className="tileContainer__sub tileContainerH" />
        </div>
        <div className="tileContainerTitle">{date.getDate()}</div>
        {hasNotes && <div className="tileContainerNotes">i</div>}
      </>
    );
  };

  const modal = () => (
    <div className="displayModalContainer">
      <button type="button" className="closeButton" onClick={closeButton}>
        X
      </button>
      <h1>{value.toDateString()}</h1>
      <Modal submit={submitModal} data={todaysData} />
    </div>
  );

  return (
    <main className="container">
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={tileClassName}
        onClickDay={onClickDay}
        view="month"
        tileContent={tileContent}
      />
      {displayModal ? modal() : null}
    </main>
  );
}
