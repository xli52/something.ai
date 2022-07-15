import { useState } from "react";
import getCharacterList from '../helpers/getCharacterList';

const list = getCharacterList();

export default function useCharacter(defaultChar = list.jane) {
  const [character] = useState(defaultChar);

  return { character };
};