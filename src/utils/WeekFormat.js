import React, { useState } from "react";

export const WeekFormat = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const handleForward = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleBack = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };
  const formattedDate = currentDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return { formattedDate, handleForward, handleBack };
};
