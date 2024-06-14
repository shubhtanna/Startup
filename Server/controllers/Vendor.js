import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { respond } from "../utils/response.js";

// export const getAllProductsByCity = async (req,res) => {
//     try{
//         const {city} = req.user;
//         const userId = req.user.id;

//         const data = await Product.find()
//             .populate({
//                 path: 'individual',
//                 match: { city: city }
//             });

//             // console.log("data:",data)

//             const filteredData = data.filter(product => product.individual !== null);

//             const products = await User.findById(userId).populate("products")

//             console.log("products id" , products)
//             console.log(products._id)


//             if(products) {
//                 const filteredproducts = products.filter(product => product._id !== products._id);
//                 console.log("filter products",filteredproducts)
//                 return respond(res,"get all products by city successfully",200,true,filteredproducts)
//             }

        
//             // console.log("Filtered data:", filteredData);

//         return respond(res,"get all products by city successfully",200,true,filteredData)
//     } catch(error) {
//         console.log(error) 
//         return respond(res,"Error in fetching the products by city",500,false)
//     }
// }

export const getAllProductsByCity = async (req,res) => {
    try{
        const {city} = req.user;

        const data = await Product.find()
            .populate({
                path: 'individual',
                match: { city: city }
            }).populate('category', 'categoryName') 
            .populate('brandName', 'name'); 

            // console.log("data:",data)

            const filteredData = data.filter(product => product.individual !== null);

            // console.log("Filtered data:", filteredData);

        return respond(res,"get all products by city successfully",200,true,filteredData)
    } catch(error) {
        console.log(error) 
        return respond(res,"Error in fetching the products by city",500,false)
    }
}

export const getVendorDetails = async(req,res) => {
    try{
        const userId = req.user.id;

        const vendorDetails = await User.findById({_Id: userId}).populate("vendorDetails").exec();

        return respond(res,"Vendor detais fetched successfully",200,true,vendorDetails);
    } catch(error) {
        console.log(error) 
            return respond(res,"error while geting all users",500,false)
        }
    }

export const getAllInterestedProductsOfShopkeeper = async(req,res) => {
    try{
        const userId = req.user.id

        const interestedProducts = await User.findById(userId).populate(
            { path: "products",
                populate: [
                { path: 'category', select: 'categoryName' },
                { path: 'brandName', select: 'name' },
                { path: 'estimatedPrice', select: 'userId price' }
            ],
              match:{"estimatedPrice.userId" : userId}
    }).exec();

    console.log("hello",interestedProducts)


        const filteredData = interestedProducts.products.filter(priceEntry =>{
            let length = priceEntry.estimatedPrice.length;
            for(let i=0; i < length; i++ ){
                if(priceEntry.estimatedPrice[i].userId.toString() === userId.toString()){
                    console.log(priceEntry.estimatedPrice[i].userId )
                    return true;
                }
            }
            // console.log(length)
            return false;

        }
            
            // priceEntry.estimatedPrice[0].userId === userId

        );



        if(!interestedProducts) {
            return respond(res,"there were no interested products for that user",400,false);
        }

        return respond(res,"All products are fetched for that shopkeeper",200,true,filteredData)
    }catch(error) {
        console.log(error)
        return respond(res,"something went wrong while fetching the interested products of that shopkeeper",500,false)
    }
}

