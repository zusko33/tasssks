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
  margin: 0% 2% 2% 2%;
`;

export default function List() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data, isLoading, error } = useSWR("/api/tasks", { fallbackData: [] });
  // const [value, onChange] = useState(new Date());
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
    // const selectedDateValue = value.toLocaleDateString("en-CA");
    setCalendarText(
      data.map((item) => item.date).includes(value.toLocaleDateString("en-CA"))
        ? `${data.map((item) => item.name)}`
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
    <>
      <Div>
        <Calendar
          onClickMonth={handleMonthChange}
          onClickYear={handleYearChange}
          onChange={handleDateChange}
          value={selectedDate}
        />
        <h2 className="calender-details">{calendarText}</h2>
      </Div>
      <TasksList data={updateData} onClick={doneTask} />
      <Link href="/" passHref legacyBehavior>
        <Link>
          <Button className="btn btn-neutral"> 🔙 </Button>
        </Link>
      </Link>
    </>
  );
}
