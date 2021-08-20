import { useEffect, useState } from "react";
import { fetchHystory } from "./api";
import DateInput from "./components/DateInput";
import MissionCard from "./components/MissionCard";
import "./App.css";

export default function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [data, SetData] = useState([]);

  const getHistory = async () => {
    const history = await fetchHystory({
      start: startDate,
      end: endDate
    });
    SetData(history);
  };
  useEffect(() => {
    getHistory();
  }, [startDate, endDate]);

  return (
    <div>
      <h1 className="title">Historial de Space X </h1>

      <div className="filters">
        <DateInput
          label="Fecha de comienzo"
          onChange={(e) => setStartDate(e.target.value)}
        />

        <DateInput
          label ="Fecha de final"
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="mission-list">
        {data.map((item, index) => {
          return <MissionCard key={index} mission={item} />;
        })}
      </div>
    </div>
  );
}

