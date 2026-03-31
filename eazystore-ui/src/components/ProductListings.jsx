import { useState } from "react";
import Dropdown from "./Dropdown";
import ProductCard from "./ProductCard";
import SearchBox from "./SearchBox";

const sortList = ["Popularity", "Price Low to High", "Price High to Low"];

const ProductListings = ({products}) => {
    const [searchText, setSearchText] = useState("");
    const [selectedSort, setSelectedSort] = useState("Popularity");

    const handleSearchChange = (inputSearch) => {
        setSearchText(inputSearch.target.value);
    }

    const handleSearchSortChange = (sortType) => {
        setSelectedSort(sortType.target.value);
    }

    let filteredAndSortedProducts = Array.isArray(products) ? products.filter((product) => 
        product.name.toLowerCase().includes(searchText.toLowerCase()) || 
        product.description.toLowerCase().includes(searchText.toLowerCase()) 
    ) : []

    switch (selectedSort) {
        case "Price Low to High":
            filteredAndSortedProducts = filteredAndSortedProducts.sort((a,b) => parseFloat(a.price) - parseFloat(b.price));
            break;
        case "Price High to Low":
            filteredAndSortedProducts = filteredAndSortedProducts.sort((a,b) => parseFloat(b.price) - parseFloat(a.price));
            break;
        case "Popularity":
        default:
            filteredAndSortedProducts = filteredAndSortedProducts.sort((a,b) => parseInt(b.popularity) - parseInt(a.popularity));
            break;
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12">
                <SearchBox 
                    label="Search" 
                    placeholder="Search Products..." 
                    value={searchText} 
                    handleSearch={(event) => handleSearchChange(event)}
                />
                <Dropdown label="Sort By" options={sortList} value={selectedSort} handleSort={(event) => handleSearchSortChange(event)}/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
                {filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts.map(product => <ProductCard key={product.productId} product={product} />)
                ) : (
                    <p className="text-center font-primary font-bold text-lg text-primary">No products found</p>
                )}
            </div>
        </div>
    )
}

export default ProductListings;