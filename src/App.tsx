import { useEffect, useState } from "react";
import "./App.css";

interface Square {
  top: number;
  left: number;
  right: number;
  bottom: number;
  background: string;
}

const Square = (props: any) => {
  const { top, left, background } = props;
  return (
    <div
      style={{
        position: "absolute",
        width: "200px",
        height: "200px",
        borderRadius: "8px",
        opacity: 0.7,
        top,
        left,
        background,
      }}
    />
  );
};

function App() {
  const [sqaures, setSquares] = useState<Square[]>([]);

  const getRandomColor = () => {
    let color = "#";
    const options = "0123456789ABCDEF";

    for (let i = 0; i < 6; i++) {
      color += options[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const checkForOverlap = (c1: Square, c2: Square) => {
    return !(
      c1.top > c2.bottom ||
      c1.left > c2.right ||
      c1.bottom < c2.top ||
      c1.right < c2.left
    );
  };

  const drawSquare = (e: any) => {
    const { clientX, clientY } = e;
    let currentSquare: Square = {
      top: clientY - 100,
      left: clientX - 100,
      right: clientX + 100,
      bottom: clientY + 100,
      background: "tomato",
    };

    setSquares((prevSquares) => {
      prevSquares.forEach((s: Square) => {
        if (checkForOverlap(currentSquare, s)) {
          currentSquare.background = getRandomColor();
        }
      });

      return [...prevSquares, currentSquare];
    });
  };

  useEffect(() => {
    document.addEventListener("click", drawSquare);
    return () => {
      document.removeEventListener("click", drawSquare);
    };
  }, []);

  return (
    <div>
      {sqaures.map((c: Square) => (
        <Square {...c} key={c.top + c.left + c.right} />
      ))}
    </div>
  );
}

export default App;
