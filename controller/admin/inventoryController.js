const InventoryItem = require("../../modal/admin/inventoryModal");

exports.createItem = async (req, res) => {
  try {
    const item = await InventoryItem.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: item,
    });
  } catch (error) {
    console.error("Create Item Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await InventoryItem.find({
  isArchived: false,
}).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await InventoryItem.findById(
      req.params.id
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item =
      await InventoryItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await InventoryItem.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.archiveItem = async (req, res) => {
  try {
    const item =
      await InventoryItem.findByIdAndUpdate(
        req.params.id,
        {
          isArchived: true,
        },
        {
          new: true,
        }
      );

    return res.status(200).json({
      success: true,
      message: "Item archived successfully",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};