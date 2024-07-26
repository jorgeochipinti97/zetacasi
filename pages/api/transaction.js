import Transaction from "@/Models/Transaction";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });
        res.status(201).json({ success: true, data: transactions });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const transaction = await Transaction.create(req.body);
        res.status(201).json({ success: true, data: transaction });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
