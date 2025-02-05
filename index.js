const { Client, LocalAuth } = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")
const axios = require("axios")

// Language model name to use
const languageModelName = "deepseek-r1-distill-qwen-7b@q3_k_l"

// Object to store conversation history
const conversationHistory = {}

// Function to process messages using LM Studio with history
async function processMessage(text, userId) {
  try {
    // Initialize the user's history if it doesn't exist
    if (!conversationHistory[userId]) {
      conversationHistory[userId] = []
    }

    // Add the user's message to the history
    conversationHistory[userId].push({ role: "user", content: text })

    // Limit the history to the last 10 interactions
    if (conversationHistory[userId].length > 10) {
      conversationHistory[userId].shift()
    }

    const response = await axios.post(
      "http://localhost:1234/api/v0/chat/completions",
      {
        model: languageModelName,
        messages: [
          {
            role: "system",
            content:
              "Respond in a natural and friendly manner, maintaining the context of the conversation.",
          },
          ...conversationHistory[userId], // Send the user's complete history
        ],
        temperature: 0.7,
        max_tokens: 500,
      }
    )

    let reply = response.data.choices[0].message.content

    // Remove any <think>...</think> before replying
    reply = reply.replace(/<think>[\s\S]*?<\/think>/g, "").trim()

    // Add the AI's response to the history
    conversationHistory[userId].push({ role: "assistant", content: reply })

    console.log(`Generated response for CLIENT: ${reply}`)
    console.log("***************************************")
    return reply
  } catch (error) {
    console.error("Error processing message:", error)
    return "Sorry, I couldn't process your message."
  }
}

// Initialize the WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(), // Save the session locally
})

// Generate the QR Code in the terminal
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true })
})

// When ready, display a message
client.on("ready", () => {
  console.log("Client is ready!")
  console.log("---------------------------------------------")
})

// Listen for received messages
client.on("message", async (message) => {
  // Ignore messages from "status" updates
  if (message.from.includes("status")) {
    return
  }
  console.log(`Message received from CLIENT: ${message.body}`)
  console.log("---------------------------------------------")

  // Process the message with LM Studio using the history
  const response = await processMessage(message.body, message.from)

  // Reply to the message on WhatsApp
  message.reply(response)
})

// Initialize the client
client.initialize()
