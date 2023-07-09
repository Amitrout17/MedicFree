// import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
    organization: "org-XtTaGoOrbmalQUxVkwT79oum",
    apiKey:  "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",
});

const openai = new OpenAIApi(configuration);
var result
async function complete(prompt){
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role":"system","content":"You are a friendly medical chatbot here to help patients with their medical queries. Remember to suggest doctor's consultation for severe cases."},
        {"role": "user", "content": prompt}],
        temperature:0.6,
        max_tokens:150,
        top_p:1.0,
        frequency_penalty:0.0,
        presence_penalty:0.3,  
    }).then((res)=>{
        result = res.data.choices[0].message.content
    })
    .catch((err)=>{
        console.log(err)
    })
    
} 

const prompt = "What are some common symptoms of the flu?"

const print = async() => {
    await complete(prompt)
    .then(()=>{
        console.log(result)
    })   
}
print()


