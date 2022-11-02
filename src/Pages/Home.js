import React, { useState } from "react";
import dayjs from "dayjs";

import { Navbar, Location, Date } from "../components";
import { globe } from "../images";
import { arrow, search } from "../images/icons";

// let newDate = new Date();
let date = dayjs().date();
let month = dayjs().month() + 1;
let year = dayjs().year();
const separator = " - ";

const today = `${date}${separator}${
  month < 10 ? `0${month}` : `${month}`
}${separator}${year}`;

function Home() {
  const [uLocation, setuLocation] = useState(false);
  const [locationName, setLocationName] = useState("New Delhi, Delhi, India");
  const [uDate, setuDate] = useState(false);
  const [eventdate, setDate] = useState(today);
  console.log(eventdate);
  // console.log(uDate);
  // console.log(locationName);

  return (
    <div>
      <Navbar />
      <div className="flex justify-between h-auto w-auto px-16">
        <div className="h-auto pt-12 pb-8  flex flex-col justify-between items-start">
          <h1 className="text-6xl">
            All Your
            <br />
            <span className="text-saffron font-semibold">
              Volunteer
              <br /> Needs
            </span>
            <br />
            Are Here
          </h1>
          <p className="tracking-widest mt-3">
            This Platform website is for the platform of platforming
            <br />
            the major Platformers Platforming
          </p>
          <div className="w-80 -mt-8 flex items-center justify-between">
            <button className="h-12 w-48 bg-saffron text-white rounded-md">
              Explore Now
            </button>
            <button className="">
              <img className="h-40 w-40" src={arrow} alt="arrow" />
            </button>
          </div>
        </div>
        <img
          className="h-[550px] w-[550px] -mt-8"
          src={globe}
          alt="helping hands"
        />
      </div>
      <div className="px-10 w-auto h-28 bg-white rounded-lg flex justify-between items-center font-bold">
        <button
          className="bg-gray w-64 h-16 rounded-lg flex flex-col pl-3 hover:bg-slate-100 items-start justify-center"
          onClick={() => setuLocation(true)}
        >
          <p>Location</p>
          <p className="font-normal tracking-widest">{locationName}</p>
        </button>
        <button
          className="bg-gray w-64 h-16 rounded-lg flex flex-col pl-3 hover:bg-slate-100 items-start justify-center"
          onClick={() => setuDate(true)}
        >
          <p>Date</p>
          <p className="font-normal tracking-widest">{eventdate}</p>
        </button>
        <button className="bg-gray w-64 h-16 rounded-lg flex flex-col pl-3 hover:bg-slate-100 items-start justify-center">
          <p>Type of Event</p>
          <p className="font-normal tracking-widest">Food Distribution</p>
        </button>
        <button className="bg-saffron w-48 h-16 rounded-lg text-white flex justify-center items-center font-normal">
          <img src={search} alt="search" className="pr-3" /> Search
        </button>
      </div>

      {/* Location Overlay */}
      <div>
        <button
          className={
            uLocation
              ? "w-screen h-screen bg-black opacity-20 absolute z-10 top-0 left-0"
              : "hidden"
          }
          onClick={() => setuLocation(false)}
        ></button>
        <Location
          uLocation={uLocation}
          setLocationName={setLocationName}
          setuLocation={setuLocation}
        />
      </div>

      {/* Date Overlay */}
      <div>
        <button
          className={
            uDate
              ? "w-screen h-screen bg-black opacity-20 absolute z-10 top-0 left-0"
              : "hidden"
          }
          onClick={() => setuDate(false)}
        ></button>
        <Date uDate={uDate} setDate={setDate} setuDate={setuDate} />
      </div>
    </div>
  );
}

export default Home;
