import React from 'react';
import CalendarTask from './CalendarTask';

function Calendar() {
  return (
    <div className="">
      <div className="container flex justify-center">
        <div className="flex flex-col bg-[#13315C] rounded-lg p-10 my-5 w-80 overflow-hidden">
          <div className='flex justify-between'>
            <h4 className="text-[#EEF4ED] font-bold text-2xl">Calendario</h4>
          </div>

          <ul className='h-90 overflow-y-auto'>
            <p className='text-white font-extralight my-2'>Agosto 22, 2024</p>
            <CalendarTask team="Equipo 1" teamName="Desarrollo" title="Presentar propuesta" description="Diseñar la propuesta de aplicación para la aplicación"/>
            <CalendarTask team="Equipo 1" teamName="Desarrollo" title="Presentar propuesta" description="Diseñar la propuesta de aplicación para la aplicación"/>
            <p className='text-white font-extralight my-2'>Agosto 23, 2024</p>
            <CalendarTask team="Equipo 1" teamName="Desarrollo" title="Presentar propuesta" description="Diseñar la propuesta de aplicación para la aplicación"/>
            <CalendarTask team="Equipo 1" teamName="Desarrollo" title="Presentar propuesta" description="Diseñar la propuesta de aplicación para la aplicación"/>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
