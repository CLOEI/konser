"use client";

import { MouseEvent, useEffect, useState } from "react";
import Modal from "@/components/Modal";
import useLocalStorage from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";

type Seat = number;

export type SeatType =
  | "CAT-1A"
  | "CAT-1B"
  | "CAT-2C"
  | "CAT-4A"
  | "CAT-4B"
  | "CAT-5A"
  | "CAT-5B"
  | "CAT-3C";

export type Seats = {
  [Type in SeatType]: Seat[];
};

export const initialData = {
  "CAT-1A": [],
  "CAT-1B": [],
  "CAT-2C": [],
  "CAT-4A": [],
  "CAT-4B": [],
  "CAT-5A": [],
  "CAT-5B": [],
  "CAT-3C": [],
};

export default function Home() {
  const [seats, _] = useLocalStorage<Seats>("seats", initialData);
  const [selected, setSelected] = useState<typeof seats>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const removeSeat = (data: Seats, id: number, type: SeatType) => {
    return {
      ...data,
      [type]: data[type].filter((seat) => seat !== id),
    };
  };

  const addSeat = (data: Seats, id: number, type: SeatType) => {
    return {
      ...data,
      [type]: [...data[type], id],
    };
  };

  const handleSelect = (
    e: MouseEvent<HTMLDivElement>,
    id: number,
    type: SeatType
  ) => {
    if (e.currentTarget.classList.contains("occupied")) return;

    if (selected) {
      if (selected[type].find((seat) => seat === id)) {
        setSelected((prev) => removeSeat(prev!, id, type));
        e.currentTarget.classList.remove("selected");
      } else {
        setSelected((prev) => addSeat(prev!, id, type));
        e.currentTarget.classList.add("selected");
      }
    }
  };

  return (
    <>
      {!isLoading && (
        <>
          <div className="bg-red-500 min-h-screen grid items-center justify-center pb-5">
            <div className="flex flex-col md:flex-row">
              <div className="relative">
                <div className="relative top-10 z-10 mx-auto w-max bg-[#444444] text-white px-10 py-6 rounded-full border-4 border-white">
                  <p>STAGE</p>
                </div>
                <div className="grid relative grid-cols-[repeat(2,8rem)]">
                  <div className="bg-[#ef9595] border-4 relative">
                    <div className="grid grid-cols-4">
                      {new Array(24).fill(null).map((_, i) => {
                        if (i == 2 || i == 3)
                          return (
                            <div key={i} className="pb-[100%] border-2"></div>
                          );
                        return (
                          <div
                            key={i}
                            className={cn(
                              "pb-[100%] border-2 hover:bg-white cursor-pointer",
                              seats!["CAT-1A"].includes(i) && "occupied"
                            )}
                            onClick={(e) => handleSelect(e, i, "CAT-1A")}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="bg-[#ef9595] border-4 relative">
                    <div className="grid grid-cols-4">
                      {new Array(24).fill(null).map((_, i) => {
                        if (i == 0 || i == 1)
                          return (
                            <div key={i} className="pb-[100%] border-2"></div>
                          );
                        return (
                          <div
                            key={i}
                            className={cn(
                              "pb-[100%] border-2 hover:bg-white cursor-pointer",
                              seats!["CAT-1B"].includes(i) && "occupied"
                            )}
                            onClick={(e) => handleSelect(e, i, "CAT-1B")}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-[1fr,2fr,1fr] text-center border-t-4">
                    <div className="bg-[#4571ba] relative">
                      <div className="grid grid-cols-3">
                        {new Array(9).fill(null).map((_, i) => {
                          return (
                            <div
                              key={i}
                              className={cn(
                                "pb-[100%] border-2 hover:bg-white cursor-pointer",
                                seats!["CAT-4A"].includes(i) && "occupied"
                              )}
                              onClick={(e) => handleSelect(e, i, "CAT-4A")}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="bg-[#fae453] relative">
                      <div className="grid grid-cols-6">
                        {new Array(18).fill(null).map((_, i) => {
                          return (
                            <div
                              key={i}
                              className={cn(
                                "pb-[100%] border-2 hover:bg-white cursor-pointer",
                                seats!["CAT-2C"].includes(i) && "occupied"
                              )}
                              onClick={(e) => handleSelect(e, i, "CAT-2C")}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="bg-[#4571ba] relative">
                      <div className="grid grid-cols-3">
                        {new Array(9).fill(null).map((_, i) => {
                          return (
                            <div
                              key={i}
                              className={cn(
                                "pb-[100%] border-2 hover:bg-white cursor-pointer",
                                seats!["CAT-4B"].includes(i) && "occupied"
                              )}
                              onClick={(e) => handleSelect(e, i, "CAT-4B")}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[1fr,2fr,1fr] text-center">
                    <div className="bg-[#43bca1] relative">
                      <div className="grid grid-cols-3">
                        {new Array(9).fill(null).map((_, i) => {
                          return (
                            <div
                              key={i}
                              className={cn(
                                "pb-[100%] border-2 hover:bg-white cursor-pointer",
                                seats!["CAT-5A"].includes(i) && "occupied"
                              )}
                              onClick={(e) => handleSelect(e, i, "CAT-5A")}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="bg-[#9fc4f0] relative">
                      <div className="grid grid-cols-6">
                        {new Array(18).fill(null).map((_, i) => {
                          return (
                            <div
                              key={i}
                              className={cn(
                                "pb-[100%] border-2 hover:bg-white cursor-pointer",
                                seats!["CAT-3C"].includes(i) && "occupied"
                              )}
                              onClick={(e) => handleSelect(e, i, "CAT-3C")}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="bg-[#43bca1] relative">
                      <div className="grid grid-cols-3">
                        {new Array(9).fill(null).map((_, i) => {
                          return (
                            <div
                              key={i}
                              className={cn(
                                "pb-[100%] border-2 hover:bg-white cursor-pointer",
                                seats!["CAT-5B"].includes(i) && "occupied"
                              )}
                              onClick={(e) => handleSelect(e, i, "CAT-5B")}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-start md:self-center md:ml-10">
                <div className="mt-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rotate-45 bg-[#ef9595] shadow-[3px_3px_5px_0px_rgba(101,27,32,1)]"></div>
                    <div>
                      <p className="font-bold">CAT 1A, 1B</p>
                      <p>(SEATED)</p>
                      <p>IDR 2,900,000</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rotate-45 bg-[#fae453] shadow-[3px_3px_5px_0px_rgba(101,27,32,1)]"></div>
                    <div>
                      <p className="font-bold">CAT 2C</p>
                      <p>(SEATED)</p>
                      <p>IDR 2,700,000</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rotate-45 bg-[#9fc4f0] shadow-[3px_3px_5px_0px_rgba(101,27,32,1)]"></div>
                    <div>
                      <p className="font-bold">CAT 3C</p>
                      <p>(SEATED)</p>
                      <p>IDR 1,900,000</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rotate-45 bg-[#4571ba] shadow-[3px_3px_5px_0px_rgba(101,27,32,1)]"></div>
                    <div>
                      <p className="font-bold">CAT 4A, 4B</p>
                      <p>(SEATED)</p>
                      <p>IDR 1,500,000</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rotate-45 bg-[#43bca1] shadow-[3px_3px_5px_0px_rgba(101,27,32,1)]"></div>
                    <div>
                      <p className="font-bold">CAT 5A, 5B</p>
                      <p>(SEATED)</p>
                      <p>IDR 1,100,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal selected={selected!} setSelected={setSelected} />
        </>
      )}
    </>
  );
}
