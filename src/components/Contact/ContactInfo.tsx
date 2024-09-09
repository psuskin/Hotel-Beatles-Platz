import React from "react";

const ContactInfo = () => {
  return (
    <div className="text-gray-800">
      <h2 className="text-2xl font-bold mb-4">HOTEL AT BEATLES PLACE</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">HOTEL ADDRESS</h3>
        <p>Hotel at Beatles-Platz</p>
        <p>Nobistor 8</p>
        <p>22767 Hamburg - Germany</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">COMPANY ADDRESS</h3>
        <p>Polat Hotelbetriebsgesellschaft mbH</p>
        <p>Reeperbahn 117</p>
        <p>20359 Hamburg - Germany</p>
      </div>
      <div>
        <p className="mb-2">
          <a href="mailto:info@hotelambeatlesplatz.de" className="text-blue-600 hover:underline">
            info@hotelambeatlesplatz.de
          </a>
        </p>
        <p>
          <a href="tel:+4940181283811" className="text-blue-600 hover:underline">
            +49 40 181 283 811
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
