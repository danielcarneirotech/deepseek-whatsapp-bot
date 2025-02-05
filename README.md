# deepseek-whatsapp-bot

This project is a WhatsApp bot that uses the `whatsapp-web.js` library to interact with the WhatsApp Web client and processes messages using a language model via an API. The bot maintains conversation history to provide context-aware responses.

## Prerequisites

- Node.js installed on your machine
- A WhatsApp account
- LM Studio API running locally on `http://localhost:1234`

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/danielcarneirotech/deepseek-whatsapp-bot.git
   cd whatsapp-deepseek-bot
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

## Configuration

Ensure that the LM Studio API is running locally on `http://localhost:1234`. The language model used is specified in the code as `deepseek-r1-distill-qwen-7b@q3_k_l`.

## Usage

1. Start the bot:

   ```sh
   node index.js
   ```

2. Scan the QR code displayed in the terminal with your WhatsApp to connect the bot to your WhatsApp account.

3. The bot will now listen for incoming messages and respond accordingly.

## Project Structure

- [index.js](http://_vscodecontentref_/0): Main file that initializes the WhatsApp client, processes incoming messages, and interacts with the LM Studio API.
- `package.json`: Contains metadata about the project and its dependencies.

## Dependencies

- `axios`: For making HTTP requests to the LM Studio API.
- [qrcode-terminal](http://_vscodecontentref_/1): For generating QR codes in the terminal.
- `whatsapp-web.js`: For interacting with the WhatsApp Web client.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Author

Daniel Carneiro

## Acknowledgements

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [qrcode-terminal](https://github.com/gtanner/qrcode-terminal)
- [axios](https://github.com/axios/axios)
