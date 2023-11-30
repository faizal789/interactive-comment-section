import CommentsCard from "./components/CommentsCard";
import { useSelector } from "react-redux";
import CommentsAdd from "./components/CommentsAdd";

function App() {
  const { commentsData } = useSelector((store) => store.comments);

  return (
    <main className="w-full h-full bg-very-light-gray-neutral p-20 max-md:px-5 max-md:py-10 box-border flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        {commentsData.comments.map((comment, index) => {
          return (
            <CommentsCard
              key={comment.id}
              id={comment.id}
              index={index}
              comment={comment}
            ></CommentsCard>
          );
        })}
      </div>
      <CommentsAdd></CommentsAdd>
    </main>
  );
}

export default App;
