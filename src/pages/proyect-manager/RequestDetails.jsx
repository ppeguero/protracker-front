import React, { useState } from "react";
import Header from "../../components/Header";
import ResourceRequest from "../../components/ResourceRequest";
import RequestDetailsCard from "../../components/RequestDetailsCard";

function RequestDetails() {

  

  return (
    <div className="w-full container h-screen bg-[#EEF4ED]">
      <Header homeLink={'/project-manager-home'}/>
      <div className="w-full h-auto bg-[#EEF4ED] px-12 mt-2">
        <h2 className="text-3xl font-extrabold text-[#13315C] mb-6 px-10">
          Detalles de la solicitud
        </h2>
        <div className="flex justify-around">
          <div className="bg-[#13315C] rounded-lg w-96 p-6 h-[35rem]"> 
            <h4 className="text-white text-lg font-semibold mb-4">Solicitudes de recursos</h4>
            <div className="flex flex-col items-center space-y-6">
              <ResourceRequest/>
              <ResourceRequest/>
              <ResourceRequest/>
              <ResourceRequest/>
            </div>
          </div>
          <RequestDetailsCard/>
        </div>
      </div>
    </div>
  );
}

export default RequestDetails;
