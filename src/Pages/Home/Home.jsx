import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../../Components/Loading";


const Products = () => {
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

    // Fetch count data
    const { data: countData } = useQuery({
        queryKey: ["count", filter, filter1, search, priceRange],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/products-count", {
                params: { filter, filter1, search, price_range: priceRange },
            });
            return data.count;
        },
    });

    useEffect(() => {
        if (countData !== undefined) {
            setCount(countData);
        }
    }, [countData]);

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);

    const handlePaginationButton = (value) => {
        setCurrentPage(value);
    };

    const handleReset = () => {
        setFilter("");
        setFilter1("");
        setSort("");
        setSearch("");
        setSearchText("");
        setPriceRange("");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchText);
    };

    return (
        <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
            <div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
                    {/* Filter dropdown */}
                    {/* 1 filter */}
                    <div>
                        <select
                            onChange={(e) => {
                                setFilter1(e.target.value);
                                setCurrentPage(1);
                            }}
                            value={filter1}
                            name="brand_name"
                            id="brand_name"
                            className="border p-4 rounded-lg"
                        >
                            <option value="">Filter By Brand </option>

                            <option value="TechLife">Tech Life</option>
                            <option value="VisionTech">Vision Tech</option>
                            <option value="SoundWave">Sound Wave</option>
                            <option value="SnapShot">Snap Shot</option>
                            <option value="EcoSmart">Eco Smart</option>

                        </select>
                    </div>
                    {/* 2 filter */}
                    <div>
                        <select
                            onChange={(e) => {
                                setFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            value={filter}
                            name="category"
                            id="category"
                            className="border p-4 rounded-lg"
                        >
                            <option value="">Filter By Category</option>

                            <option value="Electronics">Electronics</option>
                            <option value="Wearables">Wearables</option>
                            <option value="Home Automation">Home Automation</option>
                            <option value="Cameras">Cameras</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>
                    {/* 3 filter */}
                    <div>
                        <select
                            onChange={(e) => {
                                setPriceRange(e.target.value);
                                setCurrentPage(1);
                            }}
                            value={priceRange}
                            name="price_range"
                            id="price_range"
                            className="border p-4 rounded-lg"
                        >
                            <option value="">Filter By Price Range</option>
                            <option value="0-20">$0 - $20</option>
                            <option value="21-50">$21 - $50</option>
                            <option value="51-100">$51 - $100</option>
                            <option value="101-1600">$101 - $1000</option>
                        </select>
                    </div>



                    {/* Search input */}
                    <form onSubmit={handleSearch}>
                        <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-[#3C6D71] focus-within:ring-[#3C6D71]">
                            <input
                                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                                type="text"
                                onChange={(e) => setSearchText(e.target.value)}
                                value={searchText}
                                name="search"
                                placeholder="Enter Products Title"
                                aria-label="Enter Products Title"
                            />
                            <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-[#3C6D71] rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Sort dropdown */}
                    <div>
                        <select
                            onChange={(e) => {
                                setSort(e.target.value);
                                setCurrentPage(1);
                            }}
                            value={sort}
                            name="sort"
                            id="sort"
                            className="border p-4 rounded-md"
                        >
                            <option value="">Sort By</option>
                            <option value="dsc">High to Low</option>
                            <option value="asc">Low to High</option>
                            <option value="newest">Newest first</option>

                        </select>

                    </div>
                    <button
                        onClick={handleReset}
                        className="btn  bg-[#3C6D71] text-white"
                    >
                        Reset
                    </button>
                </div>

                {/* Display products */}
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {isLoading ? (
                        <Loading className="text-center h-screen mx-auto block" />
                    ) : (
                        products.map((product, index) => (
                            <div key={index} className="flex flex-col h-full">
                                <div className="flex flex-col flex-grow max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-500">
                                    <div className="px-4 py-2 flex-grow">
                                        <h1 className="text-xl font-bold text-gray-800 uppercase dark:text-white">{product?.productName}</h1>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-gray-400">
                                            {product?.brandName}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-gray-400">
                                            {product?.description}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-gray-400">
                                            Category : {product?.category}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-gray-400 flex items-center gap-1">
                                            Ratings : {product?.ratings}
                                            <span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="#FBBF24"
                                                    className="w-4 h-5"
                                                >
                                                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.399 8.158L12 18.897l-7.333 3.848 1.399-8.158L.133 9.21l8.2-1.192z" />
                                                </svg>
                                            </span>
                                        </p>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-gray-400">
                                            Date: {new Date(product?.creationDate).toLocaleDateString("en-GB", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
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

            {/* Pagination Section */}
            <div className="flex justify-center mt-12">
                {/* Previous Button */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePaginationButton(currentPage - 1)}
                    className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#3C6D71] hover:text-white"
                >
                    <div className="flex items-center -mx-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mx-1 rtl:-scale-x-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                            />
                        </svg>
                        <span className="mx-1">previous</span>
                    </div>
                </button>
                {/* Numbers */}
                {pages.map((btnNum) => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}
                        key={btnNum}
                        className={`hidden ${currentPage === btnNum ? "bg-[#1a373a] text-white" : ""
                            } px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-[#3C6D71] hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}
                {/* Next Button */}
                <button
                    disabled={currentPage === numberOfPages}
                    onClick={() => handlePaginationButton(currentPage + 1)}
                    className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-[#3C6D71] disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
                >
                    <div className="flex items-center -mx-1">
                        <span className="mx-1">Next</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mx-1 rtl:-scale-x-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Products;
