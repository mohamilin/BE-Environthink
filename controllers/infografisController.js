import Infografis from "../models/infografisModel.js";
import path from "path";
import fs from "fs";

export const infografisController = {
  getInfografis: async (req, res) => {
    try {
      const response = await Infografis.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch infografis" });
    }
  },
  getInfografisById: async (req, res) => {
    try {
      const response = await Infografis.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (response) {
        res.json({ result: response });
      } else {
        res.status(404).json({ error: "Infografis not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch infografis" });
    }
  },
  createInfografis: async (req, res) => {
    if (req.files === null)
      return res.status(400).json({ message: "No file Uploaded" });
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.lenght;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ message: "Invalid Images Type" });
    if (fileSize > 5000000)
      return res.status(422).json({ message: "Image size larger than 5 MB" });

    file.mv(`./assets/images/${fileName}`, async (error) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      try {
        const newInfografis = await Infografis.create({
          judul: name,
          gambar: fileName,
          url: url,
        });
        res.status(201).json({
          success: true,
          message: "Successfully Created Infografis",
          result: newInfografis,
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    });
  },
  updateInfografis: async (req, res) => {
    const infografis = await Infografis.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!infografis) return res.status(404).json({ message: "Data Not Found" });

    let fileName = "";
    if (req.file === null) {
      fileName = Infografis.gambar;
    } else {
      const file = req.files.file;
      const fileSize = file.data.lenght;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ message: "Invalid Images Type" });
      if (fileSize > 5000000)
        return res.status(422).json({ message: "Image size larger than 5 MB" });

      const filepath = `./assets/images/${infografis.gambar}`;
      fs.unlinkSync(filepath);

      file.mv(`./assets/images/${fileName}`, (error) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
      });
    }
    const name = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
      await Infografis.update(
        { judul: name, gambar: fileName, url: url },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        message: "Successfully Updated Product",
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteInfografis: async (req, res) => {
    const infografis = await Infografis.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!infografis) return res.status(404).json({ message: "Data Not Found" });
    try {
      const filepath = `./assets/images/${infografis.gambar}`;
      fs.unlinkSync(filepath);
      await Infografis.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: " Successfully Deleted Infografis" });
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default infografisController;
