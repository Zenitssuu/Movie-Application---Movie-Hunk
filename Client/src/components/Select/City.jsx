import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../../store/LocationSlice.js";

export default function SelectCity({ state }) {
  // console.log(state);

  let cities = City.getCitiesOfState(state?.countryCode, state?.isoCode);
  const tempCity = {
    countryCode: "IN",
    latitude: "",
    longitude: "",
    name: "City",
    stateCode: "C",
  };
  const dispatch = useDispatch();

  cities = [tempCity, ...cities];
  // console.log(cities);
  const currState = useSelector((state) => state.locationReducer.State);
  const currCity = useSelector((state) => state.locationReducer.City);

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(currCity);

  const filteredCity =
    query === ""
      ? cities
      : cities?.filter((city) => {
          return city.name.toLowerCase().includes(query.toLowerCase());
        });

  const filterCity = () => {
    dispatch(setCity(selected));
  };

  filterCity();

  return (
    <div className="">
      <Combobox
        value={selected}
        onChange={(value) => setSelected(value)}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border-none bg-white py-1.5 pr-8 pl-3 text-sm/6 text-black",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            displayValue={(cities) => cities?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-black/70 group-data-[hover]:fill-black/100" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-xl border border-white bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible z-20",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 h-[15rem]"
          )}
        >
          {filteredCity?.map((city) => (
            <ComboboxOption
              key={city.id}
              value={city}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-black">{city.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
