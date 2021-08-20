const { Router } = require("express");
const route = Router();
const {
  GetAllMemo,
  GetMemoById,
  CreateMemo,
  UpdateMemo,
  DeleteMemo,
} = require("../controller/memo");

route.get("/memos", GetAllMemo);
route.get("/memo/:id", GetMemoById);
route.post("/memo/create", CreateMemo);
route.patch("/memo/update/:id", UpdateMemo);
route.delete("/memo/delete/:id", DeleteMemo);

module.exports = route;
