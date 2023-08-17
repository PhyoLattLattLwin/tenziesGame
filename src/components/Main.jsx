import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";
import Confetti from "react-confetti";

const Main = () => {
  const [number, setNumber] = useState(allNewNumber());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHied = number.every((ev) => ev.isHeld);
    const firstValue = number[0].value;
    const allSameValue = number.every((ev) => ev.value === firstValue);
    if (allHied && allSameValue) {
      setTenzies(true);
      console.log("won");
    }
  }, [number]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
    };
  }

  function allNewNumber() {
    const newnumber = [];
    for (let i = 0; i < 10; i++) {
      newnumber.push(generateNewDie());
    }
    return newnumber;
  }

  const roll = () => {
    if (!tenzies) {
      setNumber((oldDice) =>
        oldDice?.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setNumber(allNewNumber());
    }
  };

  const hollDie = (id) => {
    setNumber((oldDice) =>
      oldDice.map((die) => {
        return die?.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  return (
    <>
      {tenzies && <Confetti className="w-full h-full" />}
      <div className="bg-black min-h-screen">
        <div className="p-20">
          <div className="bg-gray rounded-lg p-10">
            <h2 className="text-black text-4xl font-bold text-center mb-5">
              Tenzies
            </h2>
            <p className="text-center">
              Roll until all dice are the same. Click each die to freeze it at
              its current value between rolls.
            </p>
            <div className="grid grid-cols-5 gap-5 mt-5">
              {number.map((e, index) => (
                <Die
                  isHeld={e?.isHeld}
                  hollDie={() => {
                    hollDie(!tenzies && e?.id);
                  }}
                  value={e?.value}
                  key={index}
                />
              ))}
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={roll}
                className="bg-blue active:bg-blue2 w-60 p-1 text-white font-bold rounded-md mt-5"
              >
                {tenzies ? "New Game" : "Roll"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
