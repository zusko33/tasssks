import TasksList from "@/components/TasksList";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
import Calendar from "react-calendar";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function List() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data, isLoading, error } = useSWR("/api/tasks", { fallbackData: [] });
  const [selectedDate, setSelectedDate] = useState();
  const [calendarText, setCalendarText] = useState(`No Date is selected`);
  const { mutate } = useSWR("/api/tasks");
  const [tasks, setTasks] = useState(data);
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function doneTask(taskId) {
    const updateTask = tasks.find((task) => task._id === taskId);
    updateTask.isDone = !updateTask.isDone;

    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTask),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === taskId ? updateTask : task))
    );
    mutate();
    router.push("/calendar");
  }
  const updateData = data.filter((item) => item.isDone === false);

  const allMonthValues = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handleDateChange = (value) => {
    setSelectedDate(value);
    setCalendarText(
      data
        .map((item) => item.date)
        .find((one) => one === value.toLocaleDateString("en-CA"))
        ? `${data
            .filter((one) => one.date === value.toLocaleDateString("en-CA"))
            .map((item) => item.name)}`
        : "you have no task today"
    );
  };
  // Function to handle selected Year change
  const handleYearChange = (value) => {
    const yearValue = value.getFullYear();
    setCalendarText(`${yearValue} Year  is selected`);
  };
  // Function to handle selected Month change
  const handleMonthChange = (value) => {
    const monthValue = allMonthValues[value.getMonth()];
    setCalendarText(`${monthValue} Month  is selected`);
  };
  return (
    <Div>
      <div>
        <Calendar
          onClickMonth={handleMonthChange}
          onClickYear={handleYearChange}
          onChange={handleDateChange}
          value={selectedDate}
        />
        {/* <div className="dropdown">
          <label tabIndex={0}></label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>{calendarText}</a>
            </li>
          </ul>
        </div> */}
        <div className="calender-details">
          <div className="card w-86 h-20 bg-base-100 shadow-xl">
            <div className="card-body">
              <p>{calendarText}</p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <h1>All tasks to do:</h1>
      <TasksList data={updateData} onClick={doneTask} />
      <Link href="/" passHref legacyBehavior>
        <Link>
          <Button className="btn btn-neutral">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </Button>
        </Link>
      </Link>
    </Div>
  );
}
