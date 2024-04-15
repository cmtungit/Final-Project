import { useState } from "react";
import "./App.css";
import { Searchfunction, Sortfunction } from "./mycomponents";

function App() {
  const [hotelData, setHotelData] = useState(null);
  const [updatedHotelData, setUpdatedHotalData] = useState(null);
  return (
    <>
      <Searchfunction
        hotelData={hotelData}
        setHotelData={setHotelData}
        updatedHotelData={updatedHotelData}
        setUpdatedHotalData={setUpdatedHotalData}
      />
      {/* <Sortfunction
        hotelData={hotelData}
        updatedHotelData={updatedHotelData}
        setUpdatedHotalData={setUpdatedHotalData}
      /> */}
    </>
  );
}

export default App;
