"use client";

import { FormEventHandler, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";

import MapWithPins from "@/components/checkout/MapWithPins";
import { Button } from "@headlessui/react";
import { appFetch } from "@/lib/fetch";

type Office = {
  address: {
    fullAddressString: string;
    siteName: string;
    x: number;
    y: number;
  };
};

const ShippingPage = () => {
  const router = useRouter();
  const [offices, setOffices] = useState<Office[]>([]);
  const [office, setOffice] = useState<Office>();

  useEffect(() => {
    const fetchOffices = async () => {
      const { offices, recipientCity } = await appFetch<{
        offices: Office[];
        recipientCity: { name: string };
      }>("/api/couriers/offices");

      setOffices(offices);
      setOffice(offices.find((o) => o.address.siteName === recipientCity.name));
    };
    fetchOffices();
  }, []);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    await appFetch("/api/checkout/shipping", {
      method: "POST",
      // body: JSON.stringify({ address }),
    });

    router.push("/checkout/payment");
  };

  const location = office && {
    x: office.address.x,
    y: office.address.y,
    title: office.address.fullAddressString,
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        value={{ label: office?.address.fullAddressString, value: office }}
        options={offices.map((opt) => ({
          label: opt.address.fullAddressString,
          value: opt,
        }))}
        onChange={({ value }) => {
          if (value) {
            setOffice(value);
          }
        }}
        name="offices"
      />
      <MapWithPins location={location} />
      <Button
        type="submit"
        className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
        disabled={!office}
      >
        go to payment
      </Button>
    </form>
  );
};

export default function Shipping() {
  return (
    <Suspense fallback="Loading.....">
      <ShippingPage />
    </Suspense>
  );
}
