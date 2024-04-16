import { useState } from "react";
import "./App.css";
import { Searchfunction, Sortfunction } from "./mycomponents";

function App() {
  // const [hotelData, setHotelData] = useState(null);
  // const [originalHotelData, setOriginalHotalData] = useState(null);
  return (
    <>
      <Searchfunction
        // hotelData={hotelData}
        // setHotelData={setHotelData}
        // originalHotelData={originalHotelData}
        // setOriginalHotalData={setOriginalHotalData}
      />
      {/* <Sortfunction
        hotelData={hotelData}
        originalHotelData={originalHotelData}
        setHotelData={setHotelData}
      /> */}
    </>
  );
}

export default App;
