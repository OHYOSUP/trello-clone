import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  // 드래그가 끝났을 때 움직이는 함수
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source, draggableId } = info;
    if (!destination) return;
    if (source.droppableId === destination?.droppableId) {
      setToDos((prev) => {
        const boardCopy = [...prev[source.droppableId]];
        // 선택한 '객체'를 가져오는 것
        // source.index = 선택한 객체의 id
        const tastObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        // 선택한 객체를 삽입할 목표지점
        boardCopy.splice(destination?.index, 0, tastObj);
        return {
          ...prev,
          [source.droppableId]: boardCopy,
        };
      });
    }
    // 다른 보드로 이동시킬 때
    if (source.droppableId !== destination?.droppableId) {
      setToDos((prev) => {
        const sourceBoard = [...prev[source.droppableId]];
        // 선택한 '객체'를 가져오는 것
        // source.index = 선택한 객체의 id
        const tastObj = sourceBoard[source.index];
        const destinationBoard = [...prev[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, tastObj);
        return {
          ...prev,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
