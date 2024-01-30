import React from "react";
import StatisticCard from "./StatisticCard";
import LongStatisticsCard from "./LongStatisticsCard";

function ProjectStatistics() {
  return (
    <div className="container">
      <div className="container mt-8 space-y-2 flex flex-col">
        <ul className="flex justify-around">
          <StatisticCard
            data={3}
            description={"Equipos"}
            color={"#134175"}
            textColor={"white"}
          />
          <StatisticCard
            data={9}
            description={"Miembros"}
            color={"#134175"}
            textColor={"white"}
          />
        </ul>
      </div>
      <div className="container mt-4">
        <LongStatisticsCard
          completedTasks={15}
          description={"tareas completadas de"}
          totalTasks={18}
          color={"#134175"}
          textColor={"white"}
        />
      </div>
    </div>
  );
}

export default ProjectStatistics;
