import { useState } from "react";
import getCharacterList from '../helpers/getCharacterList';

const list = getCharacterList();
const nameArray = Object.keys(list);

export default function useCharacter(defaultChar = list.jane) {
  const [character, setCharacter] = useState(defaultChar);

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

  return { character, nextChar, lastChar };
};