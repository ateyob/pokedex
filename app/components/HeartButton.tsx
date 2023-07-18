import axios from "axios";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
interface HeartButtonProps {
  data: any;
  favourites: any;
  item?: any;
  foundItem: any;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  data,
  favourites,
  item,
  foundItem,
}) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (item) {
      setIsLiked(true);
      console.log("set");
    }
  }, []);
  const toggleLike = async () => {
    try {
      if (isLiked) {
        await axios
          .delete("/api/favorites", {
            data: {
              name: foundItem.name,
            },
          })
          .then(() => {
            // window.location.reload();
            console.log("deleted");
            // removed from fav
            toast.success('Removed from my favorites', {
              duration: 8000,
            });

          })
          .catch((error: any) => {
            console.log(error.message);
            console.log("delete wrong");
          });
      } else {
        await axios
          .post("/api/favorites", { data })
          .then(() => {
            // router.push("/");
          })
          .catch((error) => console.log(error.message));
          // added to fav
          toast.success('Added to my favorites', {
            duration: 8000,
          });
      }
      window.location.reload();
    } catch (error) {}
    console.log(data + "Frontend ");
  };

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleLike}
    >
      {isLiked ? (
        <AiFillHeart
          size={28}
          className="fill-red-500 absolute  -top-[2px] -right-[2px]"
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
