interface Props {
  setDate: (value: React.ChangeEvent<HTMLInputElement>) => void;
  setMonth: (value: React.ChangeEvent<HTMLInputElement>) => void;
  setYear: (value: React.ChangeEvent<HTMLInputElement>) => void;
  dateError: string;
  monthError: string;
  yearError: string;
}

const InputFields = ({
  setDate,
  setMonth,
  setYear,
  dateError,
  monthError,
  yearError,
}: Props) => (
  <div className="flex gap-8">
    <div className="flex flex-col gap-2">
      <strong className="tracking-[0.25rem] text-grey-500">DAY</strong>
      <input
        required
        className="font-bold text-2xl pl-4 border border-grey-100 outline-none rounded-xl w-32 h-16"
        type="number"
        max={31}
        min={1}
        placeholder="DD"
        onChange={setDate}
      />
      {dateError && <span className="text-red-500 text-sm">{dateError}</span>}
    </div>
    <div className="flex flex-col gap-2">
      <strong className="tracking-[0.25rem] text-grey-500">MONTH</strong>
      <input
        required
        className="font-bold text-2xl pl-4 border border-grey-100 outline-none rounded-xl w-32 h-16"
        type="number"
        max={12}
        min={1}
        placeholder="MM"
        onChange={setMonth}
      />
      {monthError && <span className="text-red-500 text-sm">{monthError}</span>}
    </div>
    <div className="flex flex-col gap-2">
      <strong className="tracking-[0.25rem] text-grey-500">YEAR</strong>
      <input
        required
        className="font-bold text-2xl pl-4 border border-grey-100 outline-none rounded-xl w-32 h-16"
        type="number"
        max={new Date().getFullYear()}
        min={1700}
        placeholder="YYYY"
        onChange={setYear}
      />
      {yearError && <span className="text-red-500 text-sm">{yearError}</span>}
    </div>
  </div>
);

export default InputFields;
