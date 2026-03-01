import { app } from "./app.js";
import { connectDb } from "./src/DB/db.mongoose.js";

const PORT = 8000;

await connectDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});