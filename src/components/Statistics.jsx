import React, { useState, useEffect } from 'react';
import StatisticCard from './StatisticCard';
import Axios from 'axios';

function Statistics() {

  const [statisticsData, setStatisticsData] = useState({
    completedTasks: null,
    teamsWorking: null,
    projectsInProgress: null,
    totalMembers: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [completedTasks, teamsWorking, projectsInProgress, totalMembers] = await Promise.all([
          Axios.get('https://localhost:8080/api/statistics/completed-tasks'),
          Axios.get('https://localhost:8080/api/statistics/teams-working'),
          Axios.get('https://localhost:8080/api/statistics/projects-in-progress'),
          Axios.get('https://localhost:8080/api/statistics/total-members'),
        ]);

        setStatisticsData({
          completedTasks: completedTasks.data,
          teamsWorking: teamsWorking.data,
          projectsInProgress: projectsInProgress.data,
          totalMembers: totalMembers.data,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='project md:mx-14 my-2'>
      <h3 className="text-xl font-extrabold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
        Estadísticas
      </h3>
      <ul className="grid grid-cols-2 gap-8 justify-center md:justify-start mt-4">
      <StatisticCard
  data={statisticsData.teamsWorking?.total_equipos ?? 0}
  description={"Total de equipos trabajando"}
  color={"#8DA8C5"}
/>

<StatisticCard
  data={statisticsData.projectsInProgress?.cantidad_proyectos_en_proceso ?? 0}
  description={"Proyectos en proceso"}
  color={"#8DA8C5"}
/>

<StatisticCard
  data={statisticsData.totalMembers?.total_miembros ?? 0}
  description={"Total de miembros en el área"}
  color={"#8DA8C5"}
/>

<StatisticCard
  data={(statisticsData.completedTasks?.PromedioCompletadas ?? 0) + "%"}
  description={"Tareas completadas"}
  color={"#8DA8C5"}
/>

      </ul>
    </div>
  );
}

export default Statistics;
