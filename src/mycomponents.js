import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as React from "react";
import { addDays, format, setDate } from "date-fns";
import {
  Calendar as CalendarIcon,
  Search,
  Users,
  Plus,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";

function InputDemo({ params, setParams }) {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search city, hotel..."
        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        value={params.q}
        onChange={(e) => setParams(`${e.target.value}`)}
        autoFocus="autoFocus"
      />
    </div>
  );
}
function DatePickerWithRange({ className, date, setDate }) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "y-MM-dd")} - {format(date.to, "y-MM-dd")}
                </>
              ) : (
                format(date.from, "y-MM-dd")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
function PopoverDemo({ adult, setAdult, children, setChildren }) {
  function onAdultClick(adjustment) {
    setAdult(Math.max(0, Math.min(100, adult + adjustment)));
  }
  function onChildrenClick(adjustment) {
    setChildren(Math.max(0, Math.min(100, children + adjustment)));
  }
  return (
    <div className="relative">
      <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          >
            Adults: {adult} Children: {children}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-65">
          <div className="flex flex-wrap">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Adult</h4>
              <p className="text-sm text-muted-foreground">18 or above</p>
            </div>
            <div className="space-y-2">
              {" "}
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onAdultClick(-1)}
                    disabled={adult <= 0}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-xl font-bold tracking-tighter">
                      {adult}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onAdultClick(1)}
                    disabled={adult >= 400}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Children</h4>
              <p className="text-sm text-muted-foreground">0 to 17</p>
            </div>
            <div className="space-y-2">
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onChildrenClick(-1)}
                    disabled={children <= 0}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-xl font-bold tracking-tighter">
                      {children}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onChildrenClick(1)}
                    disabled={children >= 400}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function ButtonDemo({
  params,
  setParams,
  checkInDate,
  checkOutDate,
  adult,
  children,
}) {
  const [fetching, setFetch] = useState(null);
  const [count, setCount] = useState(0);
  function handleSearch() {
    setCount(count + 1);
  }
  useEffect(() => {
    async function fetchHotelAPI() {
      setFetch(null);
      const HotelAPIurl =
        "https://serpapi.com/search.json?engine=google_hotels&";
      const response = await fetch(
        HotelAPIurl +
          new URLSearchParams({
            q: `${params}`,
            check_in_date: `${checkInDate}`,
            check_out_date: `${checkOutDate}`,
            adults: `${adult}`,
            children: `${children}`,
            currency: "HKD",
            api_key:
              "fae153abc369e2c25284c39de2b4241751818bab0c79ad3b0bdcaf2b5f8902a7",
          })
      );
      const result = await response.json();
      if (!ignore) {
        setFetch(result);
      }
      console.log(result);
    }
    let ignore = false;
    fetchHotelAPI();
    return () => {
      ignore = true;
    };
  }, [count]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setParams(params);
    console.log(
      params,
      checkInDate,
      checkOutDate,
      `adult: ${adult}`,
      `children: ${children}`
    );
    handleSearch();
    console.log(count);
  };
  return (
    <Button
      variant="destructive"
      type="button"
      onClick={(e) => handleSubmit(e)}
    >
      Search
    </Button>
  );
}

export function Searchfunction() {
  const [date, setDate] = React.useState({
    from: new Date(2024, 3, 20),
    to: addDays(new Date(2024, 3, 20), 2),
  });
  const [adult, setAdult] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const [params, setParams] = useState("");
  let checkInDate = format(date.from, "y-MM-dd");
  let checkOutDate = format(date.to, "y-MM-dd");
  return (
    <>
      <InputDemo params={params} setParams={setParams} />
      <DatePickerWithRange date={date} setDate={setDate} />
      <PopoverDemo
        adult={adult}
        setAdult={setAdult}
        children={children}
        setChildren={setChildren}
      />
      <ButtonDemo
        // handleSubmit={handleSubmit}
        params={params}
        setParams={setParams}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        adult={adult}
        children={children}
      />
    </>
  );
}
