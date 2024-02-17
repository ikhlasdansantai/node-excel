const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");

const app = express();
const PORT = 4000;
const data = require("./data.json");

app.get("/", (req, res) => {
  res.send("Silahkan kunjungi /export untuk mengexport data Excel 🚀");
});

app.get("/export", async (req, res) => {
  try {
    const books = data.books;
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(books);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const buffer = XLSX.write(workbook, { type: "buffer" });
    const filename = "books-export.xlsx";

    fs.writeFileSync(filename, buffer);
    console.log("File Excel berhasil diekspor!");
    res.download(filename);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error saat mengekspor data");
  }
});

app.listen(PORT, () => {
  console.log("Server Running on PORT", PORT);
});
