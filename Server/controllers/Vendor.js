import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { respond } from "../utils/response.js";

export const getAllProductsByCity = async (req, res) => {
    try {
        const { city } = req.user;

        const data = await Product.find()
            .populate({
                path: 'individual',
                match: { city: city }
            }).populate('category', 'categoryName')
            .populate('brandName', 'name');

        // console.log("data:",data)


        const filteredData = data.filter(product => product.individual !== null);

        // console.log("Filtered data:", filteredData);
        // console.log(filteredData);
        return respond(res, "get all products by city successfully", 200, true, filteredData)
    } catch (error) {
        console.log(error)
        return respond(res, "Error in fetching the products by city", 500, false)
    }
}

export const getVendorDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const vendorDetails = await User.findById({ _Id: userId }).populate("vendorDetails").exec();

        return respond(res, "Vendor detais fetched successfully", 200, true, vendorDetails);
    } catch (error) {
        console.log(error)
        return respond(res, "error while geting all users", 500, false)
    }
}

export const getAllInterestedProductsOfShopkeeper = async (req, res) => {
    try {
        const userId = req.user.id

        const interestedProducts = await User.findById(userId).populate(
            {
                path: "products",
                populate: [
                    { path: 'category', select: 'categoryName' },
                    { path: 'brandName', select: 'name' },
                    { path: 'estimatedPrice', select: 'userId price' }
                ],
                match: { "estimatedPrice.userId": userId }
            }).exec();

        console.log("hello", interestedProducts)


        const filteredProducts = interestedProducts.products.filter(product => {
            // Filter the estimatedPrice array within each product
            product.estimatedPrice = product.estimatedPrice.filter(priceEntry =>
                priceEntry.userId.toString() === userId.toString()
            );
            // Include the product if it has any matching estimatedPrice entries
            return product.estimatedPrice.length > 0;
        });



        if (!interestedProducts) {
            return respond(res, "there were no interested products for that user", 400, false);
        }

        return respond(res, "All products are fetched for that shopkeeper", 200, true, filteredProducts)
    } catch (error) {
        console.log(error)
        return respond(res, "something went wrong while fetching the interested products of that shopkeeper", 500, false)
    }
}

