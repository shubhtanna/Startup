import { Product } from "../models/Product.js";
import { mailsender } from "../utils/mailSender.js";
import { respond } from "../utils/response.js";
import { User } from "../models/User.js";

export const addPrice = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, price } = req.body;

        if (!productId) {
            return respond(res, "Please provide the product ID", 400, false);
        }

        if (!price) {
            return respond(res, "Please enter your estimated price", 400, false);
        }

        const product = await Product.findById(productId);
        if (!product) {
            return respond(res, "Could not find the product", 400, false);
        }

        const user = await User.findById(userId);
        if (!user) {
            return respond(res, "User not found", 400, false);
        }

        // Check if user already has an estimated price for the product
        const existingPriceIndex = product.estimatedPrice.findIndex(
            entry => entry.userId.toString() === userId
        );

        if (existingPriceIndex !== -1) {
            // Update the existing estimated price entry
            product.estimatedPrice[existingPriceIndex].price = price;
        } else {
            // Add a new estimated price entry
            product.estimatedPrice.push({ userId, price });

            // Add the product to the user's list of products if not already there
            if (!user.products.includes(productId)) {
                user.products.push(productId);
            }
        }

        // Save the product with the updated or new estimated price
        await product.save();
        // Save the user with the updated products list
        await user.save();

        const emailResponse = await mailsender(user.email, "Thanks for your interest",
            `Now you are on boarded for the product ${product.name}`
        );

        return respond(res, "You have successfully added your interest in this product", 200, true, product);

    } catch (error) {
        return respond(res, "Something went wrong while adding interest in the product", 500, false);
    }
}


export const getAllInterestedShopkeepers = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("ioqfhoq", JSON
            .stringify(req.params)
        )

        if (!id) {
            return respond(res, "please provide the product", 400, false)
        }

        const product = await Product.findById({ _id: id }).populate({
            path: 'estimatedPrice.userId',
            populate: { path: 'vendorDetails' } // Populate vendorDetails field within user
        })
            .populate({
                path: 'estimatedPrice.price'
            }).populate({
                path: 'estimatedPrice.userId',
                populate: { path: 'profile' }
            }).populate("category", 'categoryName').populate("brandName", 'name')
            .exec();

        console.log("egg", product)

        return respond(res, "fetch all the shopkeepers who are interested in one product", 200, true, product)
    } catch (error) {
        console.log(error.message)
        return respond(res, "error in geting all intrested shopkeepers", 500, false)
    }
}

export const editPrice = async (req, res) => {
    try {

        const userId = req.user.id

        const { productId, price } = req.body;


        if (!productId) {
            return respond(res, "Product is not found", 400, false)
        }

        const updatedProductPrice = await Product.findOneAndUpdate(
            { _id: productId, "estimatedPrice.userId": userId },
            { $set: { "estimatedPrice.$.price": price } },
            { new: true }
        );


        return respond(res, "Price updated successfully", 200, true, updatedProductPrice)
    } catch (error) {
        console.log(error)
        return respond(res, "Price doesn't get updated", 500, false)
    }
}

export const deletePrice = async (req, res) => {

    try {
        const userId = req.user.id;
        const { productId } = req.body;


        const productDetails = await Product.findById(productId);

        if (!productDetails) {
            return respond(res, "Product not found", 404, false);
        }


        await Product.findByIdAndUpdate(
            productId,
            {
                $pull: {
                    estimatedPrice: { userId: userId }
                }
            },
            { new: true }
        )

        return respond(res, "Price entry deleted successfully", 200, true);

    } catch (error) {
        console.error(error);
        return respond(res, "Failed to delete the price entry", 500, false);
    }
}

export const allInterestedProductsOfUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate({
            path: 'products',
            populate: [
                { path: 'category' }, // Populating category
                { path: 'brandName' }, // Populating brandName
                {
                    path: 'estimatedPrice',
                    match: { userId } // Filter products based on estimatedPrice.userId === userId
                }
            ]

        }).populate('profile vendorDetails');

        if (!user || !user.products) {
            return respond(res, "No products found for the user", 404, false);
        }

        // Filter out products with no estimatedPrice match
        const filteredProducts = user.products.filter(product => product.estimatedPrice.length > 0);

        return respond(res, "Fetching all products which are interested by other shopkeepers", 200, true, filteredProducts);
    } catch (error) {
        console.error("Error fetching interested products:", error);
        return respond(res, "Something went wrong while fetching the interested products", 500, false);
    }
};


// export const allOtherShopkeepersPrice = async(req,res) => {
//     try{
//         const {productId} = req.body;
//         const userId = req.user.id;

//         const product = await Product.find(productId).populate({
//             path:"estimatadPrice",
//             match:{userId:userId}
//         })

//         const filteredData = product.filer(product => product.estimatedPrice !== null);

//         return respond(res,"fetching the price of other shopkeeperes done",200,true,filteredData)
//     }catch(error) {
//         return respond(res,"something went wrong ahile fetching the price of other shopkeeperes",500,false)
//     }
// }

// export const getAllShopKeepers = async(req,res) => {
//     try  {

//         const productId = req.params;

//         const result = await Product.findById(productId).populate("estimatedPrice").exec();

//         return respond(res,"fetching the price of other shopkeeperes done",200,true,result)
//     } catch (error) {
//         console.log(error)
//         return respond(res,"something went wrong ahile fetching the price of other shopkeeperes",500,false)
//     }
// }

// export const allOtherShopkeepersPrice = async (req, res) => {
//     try {
//         const { productId } = req.body;
//         const {id} = req.user; // Assuming req.user._id contains the logged-in user's ID

//         // Find the product and populate the estimatedPrice.userId field
//         const product = await Product.findById(productId)
//             .populate({
//                 path:"estimatedPrice",
//                 match:{userId:id}
//             })

//         if (!product) {
//             return res.status(404).json({
//                 message: "price not found",
//                 success: false,
//             });
//         }

//         // const filteredData = data.filter(product => product.individual !== null);

//         const filteredData = product.filter(product=> product.estimatedPrice !== null);

//         // Separate the logged-in vendor's price from other shopkeepers' prices
//         // const otherShopkeepersPrices = product.estimatedPrice.filter(
//         //     price => price.userId._id.toString() !== userId.toString()
//         // );

//         // const loggedInVendorPrice = product.estimatedPrice.find(
//         //     price => price.userId._id.toString() === userId.toString()
//         // );

//         return res.status(200).json({
//             message: "Fetching the price of other shopkeepers done",
//             success: true,
//             data: {
//                 // otherShopkeepersPrices,
//                 // loggedInVendorPrice,
//                 filteredData
//             },
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({
//             message: "Something went wrong while fetching the price of other shopkeepers",
//             success: false,
//         });
//     }
// };

export const allOtherShopkeepersPrice = async (req, res) => {
    console.log("body", req.query)
    try {
        const { productId } = req.query;

        const userId = req.user.id; // Assuming req.user contains the logged-in user's ID
        console.log("user id :", req.user.id);

        // Find the product and populate the estimatedPrice.userId field
        const product = await Product.findById(productId).populate({
            path: "estimatedPrice.userId",
            select: "firstName" // Assuming you want to display the first name of shopkeepers
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }

        console.log("Product in interested product controller:", product);

        // Separate the logged-in vendor's price from other shopkeepers' prices
        const myPriceEntry = product.estimatedPrice.find(priceEntry => priceEntry.userId._id.toString() === userId.toString());
        const otherPrices = product.estimatedPrice.filter(priceEntry => priceEntry.userId._id.toString() !== userId.toString());

        // Format the data
        const formattedData = {
            myPrice: myPriceEntry ? myPriceEntry.price : null, // Assuming price is the field name
            otherPrices: otherPrices.map(priceEntry => ({
                firstName: priceEntry.userId.firstName,
                price: priceEntry.price
            }))
        };

        console.log("repsonse", formattedData)

        return respond(res, "Fetching the price of other shopkeepers done", 200, true, formattedData)
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Something went wrong while fetching the price of other shopkeepers",
            success: false,
        });
    }
};



