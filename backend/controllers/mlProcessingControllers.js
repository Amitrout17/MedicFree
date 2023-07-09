const { default: axios } = require("axios");
const { Configuration, OpenAIApi } = require("openai");

exports.varifiyPrescutionForMedicineBooking = async (req, res) => {
  try {
    if (req.files) {
      const files = req.files;
      if (files !== undefined) {
        const url = `http://localhost:${process.env.PORT}/uploads/${req.files[0].filename}`;

        //now the file is present in backend/uploads/fileName.extenssion
        // file url is url variable
        //process for ml varification

        //if ml model varifies to be true :
        var success = true;

        //if ml model fails make it to be false
        res.status(200).json({
          success,
        });
      } else {
        res.status(200).json({
          message: "No file Present",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

exports.scanPrescution = async (req, res) => {
  try {
    const filePath = `D:/Medifree/backend/uploads/${req.files[0].filename}`;
    var result;
    var arr = [];
    await axios
      .post(
        "http://127.0.0.1:5000/extract_text",
        { file_path: filePath },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        arr = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    result = arr.map((item) => item.replace("*", "")).join(", ");

    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

exports.mlTest = async (req, res) => {
  try {
    const filePath = "D:/Medifree/backend/uploads/prescution.png";

    await axios
      .post(
        "http://127.0.0.1:5000/extract_text",
        { file_path: filePath },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const extractedText = response.data.extracted_text;
        console.log(response.data);
        res.status(200).json({
          data: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

//controller for sentiment analysis :
exports.sentimentAnalysis = async (req, res) => {
  try {
    console.log("message incoming");
    const configuration = new Configuration({
      organization: "org-XtTaGoOrbmalQUxVkwT79oum",
      apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);
    var result;

    async function complete(prompt) {
      const completion = await openai
        .createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a chat analysis system for a healthcare-related chat community, and your goal is to identify hate messages. The chat community consists of users discussing various healthcare topics, seeking advice, and sharing experiences.",
            },
            { role: "user", content: prompt },
          ],
        })
        .then((res) => {
          result = res.data.choices[0].message.content;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const comment = req.body.message;

    const prompt = `What is the sentiment of the following sentence, 
  which is delimited with triple backticks?   
  
  Give your answer as a single word, either "positive" \
  or "negative".
  
  Review text: '''${comment}'''`;

    await complete(prompt).then(() => {
      res.status(200).json({
        result,
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

//medical chat bot

exports.medicalChatBot = async (req, res) => {
  try {
    // import { Configuration, OpenAIApi } from "openai";
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      organization: "org-XtTaGoOrbmalQUxVkwT79oum",
      apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);
    var result;
    async function complete(prompt) {
      const completion = await openai
        .createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a friendly medical chatbot here to help patients with their medical queries. Remember to suggest doctor's consultation for severe cases.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.6,
          max_tokens: 150,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.3,
        })
        .then((res) => {
          result = res.data.choices[0].message.content;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const message = req.body.input;
    const prompt = `Give your answer in one to two sentences for the query which is delimited with triple backticks \n
    user query: '''${message}'''`

    await complete(prompt).then(() => {
      res.status(200).json({
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};
