import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { allothershopkeeperprice } from "../../Services/Operation/vendorAPI";
import { useSelector } from "react-redux";

const OtherShopkeeperModal = ({ setShowModal, otherProducts }) => {
  const { token } = useSelector((state) => state.auth);
  const [shopkeepers, setShopkeepers] = useState([]);
  const [filteredShopkeepers, setFilteredShopkeepers] = useState([]); // State for filtered data
  const [myPrice, setMyPrice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    (async () => {
      const result = await allothershopkeeperprice(token, otherProducts._id);
      if (result) {
        setShopkeepers(result.otherPrices);
        setFilteredShopkeepers(result.otherPrices); // Initialize filteredShopkeepers with all shopkeepers
        setMyPrice(result.myPrice);
      }
    })();
  }, [token, otherProducts]);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredShopkeepers.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedShopkeepers = filteredShopkeepers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "all") {
      setFilteredShopkeepers(shopkeepers); // Show all if "all" is selected
    } else if (filterValue === "higher") {
      setFilteredShopkeepers(
        shopkeepers.filter((shopkeeper) => shopkeeper.price > myPrice)
      );
    } else if (filterValue === "lower") {
      setFilteredShopkeepers(
        shopkeepers.filter((shopkeeper) => shopkeeper.price < myPrice)
      );
    }
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <div className="bg-black bg-opacity-30 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white w-[90%] max-w-3xl rounded-lg shadow-lg overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#174B3A]">Other Shopkeeper Prices</h2>
          <button
            onClick={closeModal}
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#174B3A]"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Filter Section */}
        <div className="px-6 py-4">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by My Price:
          </label>
          <select
            id="filter"
            onChange={handleFilter}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#174B3A]"
          >
            <option value="all">All</option>
            <option value="higher">Higher than My Price</option>
            <option value="lower">Lower than My Price</option>
          </select>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-[60vh]">
          <table className="w-full text-left text-sm bg-gray-100 rounded-lg overflow-hidden">
            <thead className="bg-[#DCE2DE] text-gray-700">
              <tr>
                <th className="px-4 py-3">Sr No</th>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Other Shopkeeper Price</th>
                <th className="px-4 py-3">My Price</th>
              </tr>
            </thead>
            <tbody>
              {displayedShopkeepers.length > 0 ? (
                displayedShopkeepers.map((shopkeeper, index) => (
                  <tr key={index} className="border-b border-gray-200 last:border-none">
                    <td className="px-4 py-2 font-medium text-gray-800">{startIndex + index + 1}</td>
                    <td className="px-4 py-2 text-gray-600">{shopkeeper.firstName}</td>
                    <td className="px-4 py-2 text-gray-600">{shopkeeper.price}</td>
                    <td className="px-4 py-2 text-gray-800 font-semibold">{myPrice}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500"
                : "bg-[#174B3A] text-white hover:bg-[#145034]"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#174B3A]`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {Math.ceil(filteredShopkeepers.length / itemsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(filteredShopkeepers.length / itemsPerPage)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === Math.ceil(filteredShopkeepers.length / itemsPerPage)
                ? "bg-gray-300 text-gray-500"
                : "bg-[#174B3A] text-white hover:bg-[#145034]"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#174B3A]`}
          >
            Next
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-[#174B3A] text-white text-sm font-medium rounded-md hover:bg-[#145034] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#174B3A]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherShopkeeperModal;
