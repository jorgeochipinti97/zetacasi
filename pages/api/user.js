import User from "@/Models/User";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(201).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      case 'POST':
        try {
          const user = await User.create(req.body);
          res.status(201).json({ success: true, data: user });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
