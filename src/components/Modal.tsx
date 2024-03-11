"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { SeatType, Seats, initialData } from "@/app/page";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useToast } from "./ui/use-toast";

const TIXPRICE = {
  "CAT-1A": 2900000,
  "CAT-1B": 2900000,
  "CAT-2C": 2700000,
  "CAT-4A": 1500000,
  "CAT-4B": 1500000,
  "CAT-5A": 1100000,
  "CAT-5B": 1100000,
  "CAT-3C": 1900000,
};

function Modal({
  selected,
  setSelected,
}: {
  selected: Seats;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [seats, setSeats] = useLocalStorage<Seats>("seats", initialData);
  const { toast } = useToast();

  const total = Object.keys(selected).reduce((acc, type: string) => {
    return acc + selected[type as SeatType].length * TIXPRICE[type as SeatType];
  }, 0);

  const totalSelected = Object.keys(selected).reduce((acc, type: string) => {
    return acc + selected[type as SeatType].length;
  }, 0);

  const formatedSelectedSeat = Object.keys(selected).reduce(
    (acc: { seats: string; total: string }[], type) => {
      const seat = selected[type as SeatType];
      if (seat.length > 0) {
        const price = seat.length * TIXPRICE[type as SeatType];
        acc.push({
          seats: `${type} : ${seat.join(", ")}`,
          total: price.toLocaleString(),
        });
      }
      return acc;
    },
    []
  );

  const handleCheckout = () => {
    const newSeats = { ...seats! };
    Object.keys(selected).forEach((type) => {
      newSeats[type as SeatType] = newSeats[type as SeatType].concat(
        selected[type as SeatType]
      );
    });

    setSeats(newSeats);
    setSelected(initialData);
    toast({
      title: "Checkout success",
      description: "Thank you for your purchase",
    });
  };

  return (
    <Drawer>
      <div className="absolute top-5 right-5">
        <DrawerTrigger className="relative px-4 py-2 bg-white rounded-md active:scale-95">
          Cart
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {totalSelected}
          </div>
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Cart</DrawerTitle>
          <DrawerClose />
        </DrawerHeader>
        <DrawerFooter>
          {totalSelected > 0 &&
            formatedSelectedSeat.map((data, i) => (
              <div key={i} className="flex justify-between w-full">
                <p key={i} className="pr-10">
                  {data.seats}
                </p>
                <p className="flex-1 text-right whitespace-nowrap">
                  Rp. {data.total}
                </p>
              </div>
            ))}
          <div className="flex justify-between">
            <p className="font-bold">Total</p>
            <p>Rp. {total.toLocaleString()}</p>
          </div>
          <DrawerClose
            className="w-full bg-red-500 text-white py-2 rounded-md disabled:opacity-50"
            onClick={handleCheckout}
            disabled={totalSelected === 0}
          >
            Checkout
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Modal;
