import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

type MovieData = {
  id: number;
  poster_path?: string;
  title?: string;
  name?: string;
  media_type?: string;
  media?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
};

type CardProps = {
  data: MovieData;
  trending?: boolean;
  index?: number;
  media_type?: string;
};

type RootState = {
  movieo: {
    imageURL: string;
  };
};

function Card({ data, trending, index, media_type }: CardProps) {
  const imageURL = useSelector((state: RootState) => state.movieo.imageURL);

  const mediaType = data.media ?? media_type;

  return (
    <Link
      to={"/" + mediaType + "/" + data.id}
      className="w-full min-[530px] max-w-57.5 h-65 overflow-hidden block rounded relative hover:scale-105 transition-transform duration-300"
    >
      {data?.poster_path ? (
        <img src={imageURL + data?.poster_path} alt={data.title || data.name} />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-white text-sm">
          Image Not Available
        </div>
      )}

      <div className="absolute">
        {trending && (
          <div className="py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden">
            #{index} Trending
          </div>
        )}
      </div>

      <div className="absolute bottom-0 h-14 backdrop-blur-3xl w-full bg-black/50 p-1">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
          {data?.title || data?.name}
        </h2>

        <div className="text-sm text-neutral-400 flex justify-between items-center">
          <p>
            {moment(data?.release_date || data?.first_air_date).format(
              "MMM DD, YYYY"
            )}
          </p>

          <p className="bg-black px-1 rounded-full text-xs text-white">
            Rating :{" "}
            {data.vote_average
              ? Number(data.vote_average).toFixed(1)
              : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Card;

