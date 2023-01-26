import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  //apiKey: process.env.OPENAI_API_KEY,
  apiKey : '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'
});
const openai = new OpenAIApi(configuration);

export async function OpenAiTextCompletionApi ( promptText /*req , res*/) {
//   if (!configuration.apiKey) {
//     res.status(500).json({
//       error: {
//         message: "OpenAI API key not configured, please follow instructions in README.md",
//       }
//     });
//     return;
//   }

//   const inputText = req.body.inputText || '';
//   if (inputText.trim().length === 0) {
//     res.status(400).json({
//       error: {
//         message: "Please enter a valid input",
//       }
//     });
//     return;
//   }

  try {
    const completion = await openai.createCompletion(
        {
            model: "text-davinci-003",
            prompt: promptText, //generatePrompt(promptText),
            temperature: 0.6,
            max_tokens:1000,
            // top_p:0,
            // logprobs:10,
            //frequency_penalty: 0,
            //presence_penalty: 0,
        },
        // {
        //     timeout: 1000,
        //     headers: {
        //         "Example-Header": "example",
        //     },
        // }
    );
    //console.log(completion.data.choices[0].text)
    //return res.status(200).json({ result: completion.data.choices[0].text });
    //return { result: completion.data.choices[0].text }
    return completion.data.choices[0].text;
  } 
  catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      //res.status(error.response.status).json(error.response.data);
      return error.response.data;
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      // res.status(500).json({
      //   error: {
      //     message: 'An error occurred during your request.',
      //   }
      // });
      return error.message;
    }
  }
}




export async function CallOpenaiImageApi ( promptText, sizeValue /*req , res*/) {
    try {
      const completion = await openai.createImage(
          {
              prompt: promptText, 
              n:1,
              size: sizeValue //256x256, 512x512, or 1024x1024 
          },
      );
      console.log(completion)
      console.log(completion.data.data[0].url)
      return completion.data.data[0].url;
    } 
    catch(error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        //res.status(error.response.status).json(error.response.data);
        return error.response.data;
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        // res.status(500).json({
        //   error: {
        //     message: 'An error occurred during your request.',
        //   }
        // });
        return error.message;
      }
    }
  }

// function generatePrompt(animal) {
//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest three names for an animal that is a superhero.
// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
// }


//response sample below

// {
//   "id": "cmpl-GERzeJQ4lvqPk8SkZu4XMIuR",
//   "object": "text_completion",
//   "created": 1586839808,
//   "model": "text-davinci:003",
//   "choices": [
//       {
//           "text": "\n\nThis is indeed a test",
//           "index": 0,
//           "logprobs": null,
//           "finish_reason": "length"
//       }
//   ],
//   "usage": {
//       "prompt_tokens": 5,
//       "completion_tokens": 7,
//       "total_tokens": 12
//   }
// }