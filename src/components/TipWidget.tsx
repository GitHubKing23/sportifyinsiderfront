import React, { useState } from "react";
import dynamic from "next/dynamic";

// ✅ Dynamically import QRCodeCanvas to prevent SSR issues
const QRCodeCanvas = dynamic(
  () => import("qrcode.react").then((mod) => mod.QRCodeCanvas),
  { ssr: false }
);

const TipWidget = () => {
  const [open, setOpen] = useState(false);
  const tipAddress = "0x3fF964E530eCe8587da1B67d9A43De5d734Ef0DE";

  const tipOptions = [
    { label: "$3", wei: "1370000000000000" },
    { label: "$7", wei: "3200000000000000" },
    { label: "$10", wei: "4600000000000000" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="bg-white dark:bg-gray-900 border shadow-xl rounded-lg p-4 w-72">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800 dark:text-white">💸 Tip the Creator</h4>
            <button
              className="text-gray-500 hover:text-red-500"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="text-xs text-gray-600 dark:text-gray-300 mb-2 break-words">
            {tipAddress}
          </div>

          <QRCodeCanvas
            value={tipAddress}
            size={150}
            fgColor="#000000"
            bgColor="transparent"
            imageSettings={{
              src: "/eth-logo.gif", // ✅ Local image path
              height: 32,
              width: 32,
              excavate: true,
            }}
          />

          <div className="mt-4 space-y-2">
            {tipOptions.map((tip) => (
              <a
                key={tip.label}
                href={`https://metamask.app.link/send/${tipAddress}?value=${tip.wei}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-blue-600 hover:bg-blue-700 text-white text-center text-sm font-medium py-2 px-3 rounded transition"
              >
                💸 Tip {tip.label} in ETH
              </a>
            ))}
          </div>

          <p className="mt-2 text-xs text-gray-500 text-center">Scan or choose an amount</p>
        </div>
      ) : (
        <button
          className="bg-white rounded-full p-2 shadow-lg hover:scale-110 transition"
          onClick={() => setOpen(true)}
          aria-label="Tip with ETH"
        >
          <img
            src="/eth-logo.gif" // ✅ Local GIF
            alt="Tip in ETH"
            className="w-10 h-10"
          />
        </button>
      )}
    </div>
  );
};

export default TipWidget;
