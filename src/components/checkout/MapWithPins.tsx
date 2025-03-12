// MapWithPins.js
import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

export type Location = {
  x: number;
  y: number;
  title: string;
};

const MapWithPins = ({ location }: { location?: Location }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "",
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded || !location) {
    return <div>Loading Maps...</div>;
  }

  const { x, y, title } = location;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={{ lat: y, lng: x }}
    >
      <Marker position={{ lat: y, lng: x }} title={title} />
    </GoogleMap>
  );
};

export default MapWithPins;
