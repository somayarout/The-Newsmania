import Bookmark from "../Models/bookmarkSchema.js";

export const createBookmark = async (req, res) => {
  try {
    const { title, description} = req.body;
    console.log("Creating bookmark with title:", title, "and description:", description);
    const bookmark = await Bookmark.create({
      user: req.user._id,
      title,
      description,
    });
    console.log("Bookmark created:", bookmark);
    res.status(201).json({
      success: true,
      data: bookmark
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getUserBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookmarks.length,
      data: bookmarks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!bookmark)
      return res.status(404).json({ message: "Bookmark not found" });

    res.json({
      success: true,
      message: "Bookmark deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
