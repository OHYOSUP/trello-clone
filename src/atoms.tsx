import { atom } from "recoil";

interface IToDoState {
  // 이렇게 함으로써 여러개의 키가 추가되어도 에러가 발생하지 않는다.
  [key: string]: ITodo[];
}

export interface ITodo{
  id: number;
  text: string;
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: [],
    doing: [],
    done: [],    
  },
});
