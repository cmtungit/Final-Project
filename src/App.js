import { useState } from "react";
import "./App.css";
import { SearchFunction, SortFunction, FilterFunction } from "./mycomponents";

function App() {
  const [hotelData, setHotelData] = useState(null);
  const [originalHotelData, setOriginalHotelData] = useState(null);
  return (
    <>
      <SearchFunction
        hotelData={hotelData}
        setHotelData={setHotelData}
        originalHotelData={originalHotelData}
        setOriginalHotelData={setOriginalHotelData}
      />
      <SortFunction
        hotelData={hotelData}
        originalHotelData={originalHotelData}
        setHotelData={setHotelData}
      />
      <FilterFunction
        hotelData={hotelData}
        originalHotelData={originalHotelData}
        setHotelData={setHotelData}
      />
    </>
  );
}

export default App;
