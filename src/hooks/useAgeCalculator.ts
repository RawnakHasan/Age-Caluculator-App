// hooks/useAgeCalculator.ts
import { useState } from "react";

export const useAgeCalculator = () => {
  const [date, setDate] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const [dateError, setDateError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");

  const [ageDate, setAgeDate] = useState<number | null>(null);
  const [ageMonth, setAgeMonth] = useState<number | null>(null);
  const [ageYear, setAgeYear] = useState<number | null>(null);

  const currentDate = new Date();

  const isLeapYear = (y: number) =>
    (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

  const daysInMonth = (m: number, y: number) => {
    if (m === 2) return isLeapYear(y) ? 29 : 28;
    if ([1, 3, 5, 7, 8, 10, 12].includes(m)) return 31;
    return 30;
  };

  const validateInputs = (
    d: number | null,
    m: number | null,
    y: number | null
  ) => {
    setDateError("");
    setMonthError("");
    setYearError("");

    if (!d) setDateError("This field is required");
    if (!m) setMonthError("This field is required");
    if (!y) setYearError("This field is required");

    if (d && m && y) {
      const maxDays = daysInMonth(m, y);
      if (d < 1 || d > maxDays)
        setDateError(`Must be a valid day (1-${maxDays})`);
      const inputDate = new Date(y, m - 1, d);
      if (inputDate > currentDate) {
        setDateError("Must be in the past");
        setMonthError("Must be in the past");
        setYearError("Must be in the past");
      }
    }
    if (m && (m < 1 || m > 12)) setMonthError("Must be a valid month");
    if (y && (y < 1700 || y > currentDate.getFullYear()))
      setYearError("Must be a valid year");
  };

  // ---- handlers now accept ChangeEvent directly ----
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? null : Number(e.target.value);
    setDate(value);
    validateInputs(value, month, year);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? null : Number(e.target.value);
    setMonth(value);
    validateInputs(date, value, year);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? null : Number(e.target.value);
    setYear(value);
    validateInputs(date, month, value);
  };

  const calculateAge = () => {
    if (date === null || month === null || year === null) {
      validateInputs(date, month, year);
      return;
    }

    validateInputs(date, month, year);
    if (dateError || monthError || yearError) return;

    const birthDate = new Date(year, month - 1, date);
    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAgeYear(years);
    setAgeMonth(months);
    setAgeDate(days);
  };

  return {
    dateError,
    monthError,
    yearError,
    ageDate,
    ageMonth,
    ageYear,
    handleDateChange,
    handleMonthChange,
    handleYearChange,
    calculateAge,
  };
};
