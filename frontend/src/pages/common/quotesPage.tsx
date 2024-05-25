import React, { useEffect, useState } from "react";

import Ticker, { FinancialTicker, NewsTicker } from "nice-react-ticker";
import { Card, CardDescription, CardTitle } from "../../components/ui/card";

export const getRandomFontSize = () => {
  const min = 9;
  const max = 30;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomHorizontalPosition = () => {
  const min = 0;
  const max = 90;
  return Math.floor(Math.random() * (max - min + 1)) + "%";
};

// export const getRandomVerticalPosition = () => {
//   const min = 0;
//   const max = 90;
//   return Math.floor(Math.random() * (max - min + 1)) + "%";
// };

export const getVerticalPositions = (numQuotes: any, containerHeight: any) => {
  const segmentHeight = containerHeight / numQuotes;
  const positions = [];

  for (let i = 0; i < numQuotes; i++) {
    const position = Math.floor(segmentHeight * i + segmentHeight / 2);
    positions.push(`${position}px`);
  }

  return positions;
};
const quotes = [
  "The only limit to our realization of tomorrow is our doubts of today.",
  "The purpose of our lives is to be happy.",
  "Life is what happens when you're busy making other plans.",
  "Get busy living or get busy dying.",
  "You have within you right now, everything you need to deal with whatever the world can throw at you.",
  // Add more quotes as needed
  "The only limit to our realization of tomorrow is our doubts of today.",
  "The purpose of our lives is to be happy.",
  "Life is what happens when you're busy making other plans.",
  "Get busy living or get busy dying.",
  "You have within you right now, everything you need to deal with whatever the world can throw at you.",
  // Add more quotes as needed
];

const TickerQuotes = () => {
  const [positions, setPositions] = useState<any>([]);

  useEffect(() => {
    const containerHeight = window.innerHeight - 50; // Or any other height you prefer
    const positions = getVerticalPositions(quotes.length, containerHeight);
    setPositions(positions);
  }, []);
  return (
    <>
      <div className="ticker-container">
        {quotes.map((quote, index) => (
          <div
            className="ticker-item"
            key={index}
            style={{
              left: getRandomHorizontalPosition(),
              top: positions[index],
            }}
          >
            {/* <Ticker> */}{" "}
            <Card
              className="text-white cursor-pointer hover:text-gray-100 text-xl italic font-semibold text-gray-300 italic bg-black border-0 flex  flex-col"
              style={{
                fontSize: `${getRandomFontSize()}px`,
              }}
            >
              <svg
                className="mb-2 h-5 w-5 text-gray-400 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 14"
              >
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>{" "}
              <CardTitle
                style={{
                  fontSize: `${getRandomFontSize()}px`,
                }}
                className="text-base"
              >
                "{quote}"
              </CardTitle>
              <CardDescription className="text-xs justify-end">
                Seatsfrom indeia
              </CardDescription>
            </Card>
            {/* <div className="text-white text-xl italic font-semibold text-gray-100 italic"></div> */}
            {/* </Ticker> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default TickerQuotes;
