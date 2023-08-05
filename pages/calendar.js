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
        <div className="calender-details">
          <div className="card w-96 h-10 bg-base-100 shadow-xl" key={data._id}>
            <p>{calendarText}</p>
          </div>
        </div>
      </div>
      <br />
      <h1>All tasks to do:</h1>
      <TasksList data={updateData} onClick={doneTask} />
      <Link href="/" passHref legacyBehavior>
        <Link>
          <Button className="btn btn-neutral"> 🔙 </Button>
        </Link>
      </Link>
    </Div>
  );
}
