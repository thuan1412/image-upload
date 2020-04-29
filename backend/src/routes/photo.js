const express = require("express");
const multer = require("multer");

const router = express.Router();

const models = require("../models");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${+new Date()}.jpg`);
  },
});

const upload = multer({
  storage,
});

// list all images
router.get("/", async (req, res) => {
  const photos = await models.Photo.findAll();
  res.json({ photos: photos });
});

// upload image
router.post("/add", upload.single("photo"), async (req, res) => {
  try {
    const photoPath = req.file.path;
    const { name, description } = req.body;
    const entry = await models.Photo.create({
      name,
      description,
      photoPath,
    });
    res.json(entry);
  } catch (ex) {
    res.status(400).send({ error: ex });
  }
});

// edit image info
router.put("/edit", upload.single("photo"), async (req, res) => {
  try {
    const photoPath = req.file && req.file.path;
    const { id, name, description } = req.body;
    let params = {};
    if (path) {
      params = {
        name,
        description,
        photoPath,
      };
    } else {
      params = {
        name,
        description,
      };
    }

    const photo = await models.Photo.update(params, {
      where: {
        id,
      },
    });
  } catch (ex) {
    res.status(400).send({ error: ex });
  }
});

router.delete("delete/id", async (req, res) => {
  const { id } = req.params;
  await models.Photo.destroy({
    where: {
      id,
    },
  });
  res.json({ deleted: id });
});

module.exports = router;
