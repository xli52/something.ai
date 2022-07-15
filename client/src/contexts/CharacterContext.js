import { useState, createContext } from "react";
import getCharacterList from '../helpers/getCharacterList';

const list = getCharacterList();
const nameArray = Object.keys(list);

export const characterContext = createContext();

export default function CharacterProvider({ children, defaultChar = list.jane }) {
  const [character, setCharacter] = useState(defaultChar);
  const [bgColor, setBgColor] = useState("bg1");

  const nextChar = function () {
    let index = nameArray.indexOf(character.name);
    if (index >= nameArray.length - 1 || index < 0) {
      index = 0;
    } else {
      index++;
    }
    setCharacter(list[nameArray[index]]);
  }

  const lastChar = function () {
    let index = nameArray.indexOf(character.name);
    if (index <= 0) {
      index = nameArray.length - 1;
    } else {
      index--;
    }
    setCharacter(list[nameArray[index]]);
  }

  const providerValues = { character, nextChar, lastChar, bgColor, setBgColor };

  return (
    <characterContext.Provider value={providerValues} >
      {children}
    </characterContext.Provider>
  );
};