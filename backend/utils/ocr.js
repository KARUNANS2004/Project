import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

export const extractTextFromImage = async (filePath) => {
  try {
    const formData = new FormData();

    formData.append("file", fs.createReadStream(filePath), {
      filename: path.basename(filePath), // 🔥 ensures .jpg is sent
    });

    formData.append("apikey", "K81226937988957");
    formData.append("OCREngine", "1");

    console.log("File path:", filePath);

    const response = await axios.post(
      "https://api.ocr.space/parse/image",
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 60000,
      },
    );

    console.log("✅ OCR RESPONSE:", response.data);

    return response.data?.ParsedResults?.[0]?.ParsedText || "No text found";
  } catch (err) {
    console.log("❌ OCR ERROR STATUS:", err.response?.status);
    console.log("❌ OCR ERROR DATA:", err.response?.data);
    console.log("❌ FULL ERROR:", err.message);

    throw new Error("OCR Failed");
  }
};
