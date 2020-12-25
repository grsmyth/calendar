import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Head from 'next/head';
import './home.scss'

export default function Home() {
  const [value, onChange] = useState(new Date());

  function createTodo(data) {
    return fetch('/.netlify/functions/getDay', {
      body: JSON.stringify(data),
      method: 'POST',
    }).then((response) => {
      return response.json();
    });
  }

  const myTodo = {
    title: 'My todo title',
    completed: false,
  };

  function tileClassName({ date, view }) {
    const current = new Date();

    if (date.toDateString() === current.toDateString()) {
      return 'current';
    }

    if (date.toDateString() === value.toDateString()) {
      return 'selected';
    }

    console.log(date.toDateString());
  }

  const onClickDay = (value, event) => {
    createTodo(myTodo);
  };

  return (
    <main className="container">
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={tileClassName}
        onClickDay={onClickDay}
        view="month"
      />
    </main>
  );
}

export async function getStaticProps({ params }) {
  // const { route } = params;
  // const slug = route.pop();
  // let subSection = null;

  // if (route.length > 0) {
  //   subSection = route.pop();
  // }

  const currentDate = Date.now();

  return {
    props: {
      currentDate,
    },
  };
}
