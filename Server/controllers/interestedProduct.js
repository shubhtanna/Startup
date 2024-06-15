import { Product } from "../models/Product.js";
import { mailsender } from "../utils/mailSender.js";
import { respond } from "../utils/response.js";
import { User } from "../models/User.js";

// export const addPrice = async(req,res) => {
//     try{
//         const userId = req.user.id;
//         const {productId} = req.body;

//         if(!productId) {
//             return respond(res,"please provide the product id",400,false)
//         }

//         const product = await Product.findById({_id:productId});

//         if(!product){
//             return respond(res,"could not find the product",400,false)
//         }

//         const {price} = req.body;

//         if(!price) {
//             return respond(res,"Please enter your estimeted price",400,false)
//         }

//         const user = await User.findById(userId);

//         if (user) {
//             // Assuming user.products is an array of product IDs
//             const productExists = user.products.includes(productId);
        
//             if (productExists) {
//                 const updatedProduct = await Product.findByIdAndUpdate(
//                     productId,
//                     {
//                         $push: {
//                             estimatedPrice: { userId, price }
//                         }
//                     },
//                     { new: true }
//                 );
        
//                 if (updatedProduct) {
//                     console.log('Product updated successfully', updatedProduct);

//                     const emailResponse = await mailsender(user.email,"Thanks for your Intrest",
//                         `Now you are on boarded for the product ${updatedProduct.name}`)
//                 } else {
//                     console.error('Product not found or could not be updated');
//                 }
//             } else {
//                 const addInterestedProduct = await Product.findOneAndUpdate({_id:productId},{
//                     $push:{
//                         estimatedPrice:{userId,price}
//                     },
//                 },{new:true});
        
//                 const interestedUser = await User.findOneAndUpdate({_id:userId},{
//                     $push:{
//                         products:productId,
//                     }
//                 },{new:true})

//                 const emailResponse = await mailsender(interestedUser.email,"Thanks for your Intrest",
//                     `Now you are on boarded for the product ${addInterestedProduct.name}`)
//             }
//         } else {
//             console.error('User not found');
//         }

//         // const addInterestedProduct = await Product.findOneAndUpdate({_id:productId},{
//         //     $push:{
//         //         estimatedPrice:{userId,price}
//         //     },
//         // },{new:true});

//         // const interestedUser = await User.findOneAndUpdate({_id:userId},{
//         //     $push:{
//         //         products:productId,
//         //     }
//         // },{new:true})

//         return respond(res,"you are successfully add your intrest in this product",200,true,addInterestedProduct)
//     } catch(error) {
//         return respond(res,"something went wrong while adding interest in product",500,false)
//     }
// }

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


export const getAllInterestedShopkeepers = async(req,res) => {
    try{
        const {id} = req.params;

        console.log("ioqfhoq", JSON
            .stringify(req.params)
        )

        if(!id) {
            return respond(res,"please provide the product",400,false)
        }

        const product = await Product.findById({_id:id}).populate({
            path: 'estimatedPrice.userId',
            populate: { path: 'vendorDetails' } // Populate vendorDetails field within user
        })
        .populate({
            path: 'estimatedPrice.price'
        }).populate({
            path: 'estimatedPrice.userId',
            populate: { path: 'profile' } 
        })
        .exec();

        console.log("egg",product)

        return respond(res,"fetch all the shopkeepers who are interested in one product",200,true,product)
    } catch(error) {
        console.log(error.message)
        return respond(res,"error in geting all intrested shopkeepers",500,false)
    }
}

export const editPrice = async(req,res) => {
    try{

        const userId = req.user.id
        const {productId,price} = req.body;

        if(!productId) {
            return respond(res,"Product is not found",400,false)
        }

        const updatedProductPrice = await Product.findOneAndUpdate(
            { _id: productId, "estimatedPrice.userId": userId },
            { $set: { "estimatedPrice.$.price": price } },
            { new: true }
        );

        return respond(res,"Price updated successfully",200,true)
    } catch(error) {
        console.log(error) 
        return respond(res,"Price doesn't get updated",500,false)
    }
}

export const deletePrice = async(req, res)=>{

    try{
        const userId =  req.user.id;
        const { productId } = req.body;

        const productDetails = await Product.findById({productId : productId});

        if (!productDetails) {
            return respond(res, "Product not found", 404, false);
        }


        await Product.findByIdAndUpdate(
           productId,
           {
            $pull:{
                estimatedPrice: { userId : userId, price:price}
            }
           },
           {new: true }
        )

        return respond(res, "Price entry deleted successfully", 200, true);

    }catch(error){
        console.error(error);
        return respond(res, "Failed to delete the price entry", 500, false);
    }
}

export const allInterestedProductsOfUser = async(req,res) =>{
    try{

        const userId = req.user.id;


        const data = await User.findById(userId).populate(
            { path: "products",
                populate: [
                // { path: 'category', select: 'categoryName' },
                { path: 'brandName', select: 'name' },
                // { path: 'estimatedPrice', select: 'userId price' }
            ],
            //   match:{"estimatedPrice.userId" : userId}
    }).exec();

        console.log(data);

        return respond(res,"fetching all the products which interested by other shopkeeperes done",200,true,data)
    } catch(error) {
        console.log(error);
        return respond(res,"something went wrong ahile fetching the all products which interested by shopkeeperes",500,false)
    }
}

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

        console.log("repsonse",formattedData)

        return respond(res,"Fetching the price of other shopkeepers done",200,true,formattedData)
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Something went wrong while fetching the price of other shopkeepers",
            success: false,
        });
    }
};


     
