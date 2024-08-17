import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../../Components/Loading";

const Home = () => {
    // eslint-disable-next-line no-unused-vars
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [filter, setFilter] = useState("");
    const [filter1, setFilter1] = useState("");
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const [searchText, setSearchText] = useState("");
    const [priceRange, setPriceRange] = useState("");

    const axiosPublic = useAxiosPublic();

    // Fetch products data
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ["products", currentPage, itemsPerPage, filter, filter1, sort, search, priceRange],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/all-products", {
                params: { page: currentPage, size: itemsPerPage, filter, filter1, sort, search, price_range: priceRange },
            });
            return data.products;
        },
    });



    return (
        <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
            <div>



                {/* Display products */}
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {isLoading ? (
                        <Loading className="text-center h-screen mx-auto block" />
                    ) : (
                        products.map((product, index) => (
                            <div key={index}>
                                <div className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-500">
                                    <div className="px-4 py-2">
                                        <h1 className="text-xl font-bold text-gray-800 uppercase dark:text-white">{product?.productName}</h1>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            {product?.description}
                                        </p>
                                    </div>

                                    <img
                                        className="object-cover w-full h-48 mt-2"
                                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80"
                                        alt=""
                                    />

                                    <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                                        <h1 className="text-lg font-bold text-white">${product.price}</h1>
                                        <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
};

export default Home;
