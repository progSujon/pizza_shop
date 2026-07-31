import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const PizzaCard = ({ pizza }) => {
  const { id, title, image, rating, sizes } = pizza;

  return (
    <div className="bg-white text-black rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          {title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <FaStar className="text-yellow-500" />
          <span className="font-medium">{rating}</span>
        </div>

        {/* Price */}
        <div className="mt-4 flex justify-between items-center">

          <div>
            <p className="text-sm text-gray-500">
              Starting From
            </p>

            <h3 className="text-3xl font-bold text-orange-500">
              ${sizes[0].price}
            </h3>
          </div>

          <Link to={`/pizza/${id}`}>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition">
              Order
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
};

export default PizzaCard;