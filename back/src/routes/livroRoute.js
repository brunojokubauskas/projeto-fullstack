const express = require("express");
const router = express.Router();

const livroController = require("../controllers/livroController");

router.get("/test", (req, res) => {
  res.send("Está funcionando.");
});

router.post("/livro", livroController.create);
router.get("/livro", livroController.readAll);
router.get("/livro/:id", livroController.readOne);
router.put("/livro/:id", livroController.update);
router.delete("/livro/:id", livroController.delete);

module.exports = router;
