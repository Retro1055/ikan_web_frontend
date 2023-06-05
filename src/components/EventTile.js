import React, { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  getDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase-config";

function EventTile({ event, user, setUser }) {
  const [buttonTitle, setbuttonTitle] = useState("Apply Now");
  const [eventData, setEventData] = useState({ ...event });

  useEffect(() => {
    if (
      eventData?.interested?.length > 0 &&
      eventData?.interested?.filter((item) => item === user?.email).length > 0
    ) {
      setbuttonTitle("Withdraw");
    }
  }, [eventData?.interested, user?.email]);

  async function getUserData() {
    const docRef = doc(db, "users", user?.email);
    const snapshots = await getDoc(docRef);
    const docs = snapshots.data();
    setUser(docs);
  }

  async function getEventData() {
    const docRef = doc(db, "events", eventData?.eid);
    const snapshots = await getDoc(docRef);
    const docs = snapshots.data();
    setEventData(docs);
  }

  async function neditUser() {
    const ref = doc(db, "users", user?.email);

    // Atomically add a new region to the "regions" array field.
    const addEventField = {
      events: arrayUnion(eventData?.eid),
    };
    console.log(addEventField);
    const removeEventField = {
      // events: Fieldvalue.arrayRemove(eventData?.eid),
      events: arrayRemove(eventData?.eid),
    };
    console.log(removeEventField);
    await updateDoc(
      ref,
      buttonTitle === "Apply Now" ? addEventField : removeEventField
    ).then((res) => {
      console.log(res);
      if (buttonTitle === "Apply Now")
        window.alert("Event added to your profile!");
      else window.alert("Event removed from your profile!");
    });
    getUserData();
  }
  async function neditEvent() {
    const ref = doc(db, "events", eventData?.eid);

    // Atomically add a new region to the "regions" array field.
    const interested = eventData.interested;
    const addEventField = {
      interested: arrayUnion(...interested, user?.email),
    };
    const removeEventField = {
      interested: arrayRemove(user?.email),
    };
    await updateDoc(
      ref,
      buttonTitle === "Apply Now" ? addEventField : removeEventField
    ).then(() => {
      if (buttonTitle === "Apply Now")
        window.alert("Thank you for showing interest in this event");
      else window.alert("You have removed your interest from this event!");
    });
    getEventData();
  }

  function showInterest() {
    if (buttonTitle === "Apply Now") {
      neditUser();
      neditEvent();
      setbuttonTitle("Withdraw");
    } else {
      neditUser();
      neditEvent();
      setbuttonTitle("Apply Now");
    }
  }

  return (
    <div className="w-[350px] md:w-[1100px] bg-white h-44 md:h-60 rounded-xl p-2 md:p-4 flex mb-9">
      <img
        className="object-cover rounded-lg md:rounded-xl mr-3 md:mr-5 h-40 md:h-56 w-40 md:w-80"
        src={event?.img}
        alt={event?.name}
      />
      <div className="flex w-full flex-col justify-around md:justify-between">
        <div>
          <div className="flex w-full flex-col md:flex-row justify-between">
            <h2 className="text-base md:text-xl font-semibold">
              {event?.name}
            </h2>
            <p className="text-gray-500">
              {event?.City + ", " + event?.State + ", " + event?.Country}
            </p>
          </div>
          <h4 className="hidden md:block text-sm text-gray-700">
            {event?.organisation}
          </h4>
        </div>
        <div className="">
          <p className="hidden md:block text-gray-500">{event?.description}</p>
          <p className="text-gray-500 mt-3">{event?.date}</p>
          <p className="text-gray-500 mt-3">{eventData?.volreq}</p>
        </div>
        <div className="flex gap-2">
          <button
            className={
              buttonTitle === "Apply Now"
                ? "h-8 md:h-10 w-full md:w-36 text-sm bg-saffron text-white rounded-md flex justify-center items-center"
                : "h-8 md:h-10 w-full md:w-36 text-sm bg-black text-white rounded-md flex justify-center items-center"
            }
            disabled={event?.volreq <= 0 ? true : false}
            onClick={showInterest}
          >
            {buttonTitle}
          </button>
          <a
            className="h-8 md:h-10 w-full md:w-36 text-sm bg-white text-black rounded-md flex justify-center items-center border-2 border-black"
            href={`/event-detail/${event?.eid}`}
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default EventTile;
