// import React, { useState, useEffect } from "react";
// import api from "@services/api";
// import { useNavigate } from "react-router-dom";
// import Card from "./Card";

// // eslint-disable-next-line react/prop-types
// function DecisionsAll() {
//   const navigate = useNavigate();
//   const [datas, setDatas] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [StatusSelect, setStatusSelect] = useState(null);
//   const [DureeSelect, setDureeSelect] = useState(null);

//   useEffect(() => {
//     // Options query
//     let duree;
//     let status;
//     /* eslint-disable no-unused-expressions */
//     StatusSelect ? (status = `status=${StatusSelect}`) : (status = "");
//     DureeSelect ? (duree = `duree=${DureeSelect}`) : (duree = "");
//     const getDatas = async () => {
//       const decisions = await api.apigetmysql(
//         `${import.meta.env.VITE_BACKEND_URL}/decisions?${status}&${duree}`
//       );
//       if (datas === null) {
//         decisions.map((dec) => {
//           const content = JSON.parse(dec.content);
//           const body = {};
//           if (content.dateOpinion < new Date()) {
//             const updateStatus = api.apiputmysql(
//               `${import.meta.env.VITE_BACKEND_URL}/decisions/status/${
//                 dec.id
//               }/2`,
//               body
//             );
//           }
//           if (content.dateFirstDecision < new Date()) {
//             const updateStatus = api.apiputmysql(
//               `${import.meta.env.VITE_BACKEND_URL}/decisions/status/${
//                 dec.id
//               }/3`,
//               body
//             );
//           }
//           if (content.dateEndConflict < new Date()) {
//             const updateStatus = api.apiputmysql(
//               `${import.meta.env.VITE_BACKEND_URL}/decisions/status/${
//                 dec.id
//               }/4`,
//               body
//             );
//           }
//           if (content.dateFinaleDecision < new Date()) {
//             const updateStatus = api.apiputmysql(
//               `${import.meta.env.VITE_BACKEND_URL}/decisions/status/${
//                 dec.id
//               }/5`,
//               body
//             );
//           }
//         });
//       }
//       setDatas(decisions);
//       setIsLoaded(true);
//     };
//     getDatas(); // lance la fonction getDatas
//   }, [isLoaded]);

//   const [searchTerm, setSearchTerm] = useState("");
//   function handleChange(event) {
//     event.preventDefault();
//     setSearchTerm(event.target.value);
//   }

//   const HandlerStatus = (event) => {
//     setStatusSelect(event.target.value !== "" ? event.target.value : null);
//     setIsLoaded(false);
//   };
//   const HandlerDuree = (event) => {
//     if (DureeSelect === event.target.value) {
//       setDureeSelect(null);
//     } else {
//       setDureeSelect(event.target.value !== "" ? event.target.value : null);
//     }
//     setIsLoaded(false);
//   };

//   return (
//     isLoaded && (
//       <div>
//         <div className="searchBar">
//           <input
//             key="searchbar"
//             id="searchbar"
//             name="searchbar"
//             type="text"
//             value={searchTerm}
//             onChange={handleChange}
//             placeholder="Search..."
//           />
//           <select
//             value={StatusSelect || ""}
//             id="select-status"
//             onChange={HandlerStatus}
//           >
//             <option value="">--Please choose an option--</option>
//             <option value="1">commencée</option>
//             <option value="2">1rst décision prise</option>
//             <option value="3">1rst décision conflit</option>
//             <option value="4">définitive</option>
//             <option value="5">non aboutie</option>
//             <option value="6">terminée</option>
//           </select>
//         </div>
//         <div>
//           <button
//             type="button"
//             value="1"
//             onClick={HandlerDuree}
//             className={DureeSelect === "1" ? "active" : ""}
//           >
//             {`<24H`}
//           </button>
//           <button
//             type="button"
//             value="7"
//             onClick={HandlerDuree}
//             className={DureeSelect === "7" ? "active" : ""}
//           >
//             {`<Semaine`}
//           </button>
//           <button
//             type="button"
//             value="31"
//             onClick={HandlerDuree}
//             className={DureeSelect === "31" ? "active" : ""}
//           >
//             {`<Mois`}
//           </button>
//           <button
//             type="button"
//             value="93"
//             onClick={HandlerDuree}
//             className={DureeSelect === "93" ? "active" : ""}
//           >
//             {`<3Mois`}
//           </button>
//         </div>
//         <div>
//           {
//             // eslint-disable-next-line react/prop-types
//             datas
//               // eslint-disable-next-line react/prop-types
//               .filter((data) =>
//                 JSON.parse(data.content)
//                   .title.normalize("NFD")
//                   .replace(/\p{Diacritic}/gu, "")
//                   .toLocaleLowerCase()
//                   .includes(
//                     searchTerm
//                       .normalize("NFD")
//                       .replace(/\p{Diacritic}/gu, "")
//                       .toLocaleLowerCase()
//                   )
//               )
//               .map((data) => (
//                 <button
//                   type="button"
//                   key={data.id}
//                   id={data.id}
//                   onClick={() => {
//                     navigate(`/user/decisions?comp=Page&id=${data.id}`);
//                   }}
//                 >
//                   <Card key={data.id} data={data} />
//                 </button>
//               ))
//           }
//         </div>
//       </div>
//     )
//   );
// }
// export default DecisionsAll;
