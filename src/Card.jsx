import { useEffect, useState } from "react";

const Card = ({ cardInfo, index, zodiacSign, flipped }) => {
  const [zIndex, setZIndex] = useState("");
//   console.log(zodiacSign);
  useEffect(() => {
    const zIndexSetter = () => {
      if (index === 0) {
        setZIndex("rotate-5");
      } else {
        setZIndex("none");
      }
    };
    zIndexSetter();
  }, []);

  return (
    <div
      className={`card h-[25rem] w-[16rem] absolute top-80 ${zIndex} ${
        flipped && index === 0 ? "flipped" : ""
      }`}
    >
      <div className="card-inner w-full h-full">
        {/* Front Side */}
        <div
          className="card-front w-full h-full flex items-center justify-center rounded-md text-white"
          style={{
            backgroundImage: `url('../assets/${flipped ? 'blank' : zodiacSign}.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          { flipped && index === 3 ? cardInfo : null }
        </div>

        {/* Back Side */}
        <div
          className="card-back w-full h-full flex items-center justify-center rounded-md text-white"
          style={{
            backgroundImage: `url('../assets/blank.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          { index === 3 ? cardInfo : null }
        </div>
      </div>
    </div>
  );
};
export default Card;
