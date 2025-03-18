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
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../store/LocationSlice.js";

export default function SelectState({ data, selected, setSelected }) {
  
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const filteredData =
    query === ""
      ? data
      : data.filter((currData) => {
          return currData.name.toLowerCase().includes(query.toLowerCase());
        });

  const filterState = ()=>{
    // console.log(selected);
    dispatch(setState(selected));
    
  }
  filterState();


  return (
    <div className="z-50">
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
            displayValue={(data) => data?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-black/60 group-data-[hover]:fill-black/100" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-xl border  bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible z-40  border-white",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 h-[15rem]"
          )}
        >
          {filteredData?.map((currData) => (
            <ComboboxOption
              key={currData.id}
              value={currData}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-black">{currData.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
