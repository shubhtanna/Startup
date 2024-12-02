import { User } from "../models/User.js";
import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { Brand } from "../models/Brand.js";
import { uploadImageCloudinary } from "../utils/ImageUploader.js";
import { respond } from "../utils/response.js";

export const createProduct = async (req, res) => {
  try {
    const { productName, category, brandName, modelName, productDescription } = req.body;

    const userId = req.user.id;

    console.log(req.body);

    const productImage = req.files.productImageUpload;

    const invoiceImage = req.files.invoiceImageUpload;
    // const invoiceImage = req.files.invoiceImage;


    if (!productName || !category || !productDescription) {
      return respond(
        res,
        "all fields are required when product is created",
        404,
        false
      );
    }

    const individualDetails = await User.findById(userId, {
      AccountType: "Individual",
    });

    const categoryDetails = await Category.findById({ _id: category });
    // console.log("details:", categoryDetails);

    if (!categoryDetails) {
      return respond(res, "Categories details Not Found", 404, false);
    }

    const brandDetails = await Brand.findById(brandName);

    if (!brandDetails) {
      return respond(res, "Brand Not Found", 404, false);
    }

    const productImageUpload = await uploadImageCloudinary(productImage, process.env.FOLDER_NAME);

    const invoiceImageUpload = await uploadImageCloudinary(invoiceImage, process.env.FOLDER_NAME);

    const newProduct = await Product.create({
      productName,
      category: categoryDetails._id,
      brandName: brandDetails._id,
      modelName,
      productDescription,
      individual: individualDetails._id,
      productImage: productImageUpload.secure_url,
      invoiceImage: invoiceImageUpload.secure_url,
    });

    await User.findByIdAndUpdate(
      {
        _id: req.user.id,

      },
      {
        $push: {
          products: newProduct._id,
        },
      },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      {
        _id: categoryDetails._id,
      },
      {
        $push: {
          products: newProduct._id,
        },
      },
      { new: true }
    );

    return respond(res, "Product Created successfully", 200, true, newProduct);
  } catch (error) {
    console.log(error);
    return respond(res, "Product is not created", 500, false);
  }
};

export const updateProduct = async (req, res) => {
  try {

    const { productId } = req.body;
    const updates = req.body;

    console.log("Updates in  update product", updates);

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product is not found",
      });
    }

    if (req.files) {
      const productimage = req.files.productImageUpload;
      const invoiceimage = req.files.invoiceImageUpload;
      const productImageCloud = await uploadImageCloudinary(productimage, process.env.FOLDER_NAME);
      const invoiceImageCloud = await uploadImageCloudinary(invoiceimage, process.env.FOLDER_NAME);

      product.productImage = productImageCloud.secure_url;
      product.invoiceImage = invoiceImageCloud.secure_url;
    }

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {

        product[key] = updates[key];
      }
    }
    await product.save();


    const updatedProduct = await Product.findOne({
      _id: productId
    })
      .populate('category')
      .populate('brandName')
      .exec()


    return respond(res, "product updated successfully", 200, true, updatedProduct)

  } catch (error) {
    console.log(error)
    return respond(res, "something went wrong while updating the product", 500, false)
  }
}

export const getOneProduct = async (req, res) => {
  try {
    console.log("REq body", req.body);
    const { productId } = req.body;
    // const userId = req.user.id;

    const productDetails = await Product.findById({ _id: productId });

    if (!productDetails) {
      return respond(res, "product is not found", 400, false)
    }

    return respond(res, "product details fetch successfully", 200, true, productDetails)
  } catch (error) {
    return respond(res, "error in get one product details", 500, false)
  }
}

export const deleteProduct = async (req, res) => {
  try {

    const { productId } = req.body;

    if (!productId) {
      return respond(res, "Product is not found", 400, false)
    }

    const userId = req.user.id;

    const product = await Product.findByIdAndDelete({ _id: productId })

    await User.findByIdAndUpdate({
      _id: userId
    }, {
      $pull: {
        products: productId
      }
    }, { new: true })

    await Category.findOneAndUpdate({ products: productId }, {
      $pull: {
        products: productId
      }
    }, { new: true })

    return respond(res, "product deleted successfully", 200, true)

  } catch (error) {
    console.log(error)
    return respond(res, "something went wrong while deleting the product", 500, false)
  }
}


export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products and populate related fields
    const products = await Product.find()
      .populate('category') // Populating category details
      .populate('brandName') // Populating brand details
      .populate('individual', 'name email') // Populating individual user details
      .exec();

    if (!products || products.length === 0) {
      return respond(res, "No products found", 404, false);
    }

    return respond(res, "All products fetched successfully", 200, true, products);
  } catch (error) {
    console.error(error);
    return respond(res, "Error while fetching all products", 500, false);
  }
};

