const Bill = require("../models/bill");
const User = require("../models/user");
const Supplier = require("../models/supplier");
const Prod = require("../models/product");

exports.addNew = async (req, res) => {
    const userId = req.user.id;
    const prods = req.body.prods;
    /*
    [
        {
            prod: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantaty: Number,
        }
    ]
    */
    const user = await User.findById(userId);
    // let suppliers = [];
    const newBill = new Bill({
        prods: prods,
        user: user._id
    })
    await newBill.save();
    const suppliers = async () => {
        await prods.forEach(p => {
            Prod.findById(p.prod)
        });
    }
}
// exports.addOrder = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const product = req.body.product;
//         const quantity = req.body.quantity;
//         const user = await User.findById(userId);
//         const supId = await Prod.findById(product).select('supplier');
//         if (!user) {
//             return res.status(304).json({
//                 msg: "not allowed"
//             })
//         }
//         const newOrder = new Order({
//             prod: product,
//             quantity: quantity,
//             supplier: supId,
//             user: userId,
//             supplerresponse: 0,
//             userresponse: 0
//         })
//         await newOrder.save()
//         user.orders.push(newOrder._id)
//         await user.save()
//         return res.status(200).json({
//             order: newOrder
//         })
//     } catch (err) {
//         res.status(500).json({
//             msg: "server error",
//             error: err.message
//         })
//     }
// }
// exports.addSupplierResponse = async (req, res) => {
//     try {
//         const orderId = req.body.orderId;
//         const supId = req.user.id;
//         const price = req.body.price;
//         const order = await Order.findById(orderId);
//         if (order.supplier != supId) {
//             return res.status(304).json({
//                 msg: "not allowed"
//             })
//         }
//         order.price = price
//         await order.save()
//         return res.status(200).json({
//             order: order
//         })
//     } catch (err) {

//     }
// }