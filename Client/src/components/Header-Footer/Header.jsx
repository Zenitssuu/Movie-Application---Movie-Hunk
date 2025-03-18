import React, { useState, Suspense, lazy } from "react";
import { Button, Loading,SearchBar } from "../index.js";
import { Country, City, State } from "country-state-city";
const SelectState = lazy(() => import("../Select/State.jsx"));
const SelectCity = lazy(() => import("../Select/City.jsx"));
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  let stateData = State.getStatesOfCountry("IN");
  const tempState = {
    countryCode: "IN",
    isoCode: "",
    latitude: "",
    longitude: "",
    name: "State",
  };
  stateData = [tempState, ...stateData];
  // console.log(stateData);

  const [state, setState] = useState(stateData[0]);
  // console.log(state);

  const [showFilter, setShowFilter] = useState(false);

  return (
    <header className="flex min-h-[3.5rem] items-center shadow-lg justify-between px-4 relative">
      {/* logo */}
      <Link to="/">Logo</Link>

        {/*search bar  */}
      <div>
        <SearchBar/>
      </div>

      {/* filter */}
      <div className="flex items-center rounded-lg gap-5">
        <div className="border-black relative">
          <button
            onClick={(e) => setShowFilter((prev) => !prev)}
            className="flex items-center gap-2 font-semibold"
          >
            <FaFilter />
            <p>Select City</p>
          </button>
          {showFilter && (
            <div className="absolute right-0.5 top-10 w-[150px] z-10">
              <div className="mb-1 relative z-50">
                <Suspense>
                  <SelectState
                    data={stateData}
                    selected={state}
                    setSelected={setState}
                  />
                </Suspense>
              </div>
              <div>
                <Suspense fallback={<Loading />}>
                  <SelectCity state={state} />
                </Suspense>
              </div>
            </div>
          )}
        </div>
        <Button name="Logout" className="bg-red-600" />
      </div>
    </header>
  );
}

export default Header;
