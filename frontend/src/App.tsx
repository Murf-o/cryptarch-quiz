import Board from "./components/Board";

const NUM_ROWS = 3;
const NUM_COLS = 3;

function App() {
  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          height: "100vh",
          width: "100%",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Board num_rows={NUM_ROWS} num_cols={NUM_COLS} />
        </div>
      </div>
    </>
  );
}

export default App;
