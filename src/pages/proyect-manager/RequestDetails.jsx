import React, { useState, useEffect} from "react";
import Header from "../../components/Header";
import ResourceRequest from "../../components/ResourceRequest";
import RequestDetailsCard from "../../components/RequestDetailsCard";
import ReturnButton from "../../components/ReturnButton";
import { useParams } from 'react-router-dom';

function RequestDetails() {

  const { id } = useParams();
  const idNumerico = parseInt(id, 10);
  const [request, setRequest] = useState({});
  
  useEffect(() => {
    fetch(`https://localhost:8080/api/resource/request/${idNumerico}`)
      .then(response => response.json())
      .then(data => {
        setRequest(data);
        console.log("detalles de la solicitud", data);
      })
  }, [])

  return (
    
      request ?
      <div className="w-full container h-screen bg-[#EEF4ED]">
      <Header homeLink={'/project-manager-home'}/>
      <div className="w-full h-auto bg-[#EEF4ED] px-12 pb-12 mt-2">
        <h2 className="text-3xl font-extrabold text-[#13315C] mb-6 px-10">
          Detalles de la solicitud
        </h2>
        <div className="ml-10">
          <ReturnButton/>
        </div>
        <div className="flex justify-around">
          <RequestDetailsCard request={request}/>
        </div>
      </div>
    </div>
    :
    null
    
  );
}

export default RequestDetails;
