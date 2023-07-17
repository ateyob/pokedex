import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const HeartButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleLike}
    >
      {isLiked ? (
        <AiFillHeart
          size={24}
          className="fill-red-500 absolute -top-[2px] -right-[2px]"
        />
      ) : (
        <AiOutlineHeart
          size={28}
          className="fill-white absolute -top-[2px] -right-[2px]"
        />
      )}
    </div>
  );
};

export default HeartButton;
