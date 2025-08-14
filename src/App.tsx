import InputFields from "@/components/InputFields";
import { useAgeCalculator } from "@/hooks/useAgeCalculator";

const App = () => {
  const {
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
  } = useAgeCalculator();

  return (
    <div className="h-screen bg-grey-200 flex flex-col gap-4 items-center justify-center">
      <div className="main bg-white rounded-2xl rounded-br-[12rem] w-3xl h-[36rem] p-8">
        <InputFields
          setDate={handleDateChange}
          setMonth={handleMonthChange}
          setYear={handleYearChange}
          dateError={dateError}
          monthError={monthError}
          yearError={yearError}
        />

        <div className="flex items-center justify-between">
          <div className="border h-[1px] border-grey-100 w-full" />
          <button
            className="rounded-full p-4 hover:cursor-pointer active:scale-150 bg-purple-500 hover:bg-black outline-none"
            onClick={calculateAge}
          >
            <img className="rounded-full w-16" src="/icon-arrow.svg" />
          </button>
        </div>

        <div className="flex italic flex-col">
          <span className="font-bold text-8xl space-x-2 text-black">
            <strong className="tracking-wider text-purple-500">
              {ageYear ?? "--"}
            </strong>
            years
          </span>
          <span className="font-bold text-8xl space-x-2 text-black">
            <strong className="tracking-wider text-purple-500">
              {ageMonth ?? "--"}
            </strong>
            months
          </span>
          <span className="font-bold text-8xl space-x-2 text-black">
            <strong className="tracking-wider text-purple-500">
              {ageDate ?? "--"}
            </strong>
            days
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
