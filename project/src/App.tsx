import Board from "./components/Board";

const NUM_ROWS = 3;
const NUM_COLS = 3;

function App() {
  return (
    <>
      <Board num_rows={NUM_ROWS} num_cols={NUM_COLS} />
    </>
  );
}

export default App;
