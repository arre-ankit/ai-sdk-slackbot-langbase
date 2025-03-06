import { langbase } from "./utils";
import { Message } from "langbase";


export const generateResponseLangBase = async (
  messages: Message[],
  updateStatus?: (status: string) => void,
) => {

    const response1 = await langbase.pipes.run({
		name: 'ai-chatbot',
		stream: false,
		messages,
        tools:[{
            "type": "function",
            "function": {
                "name": "get_current_weather",
                "description": "Get the current weather of a given location",
                "parameters": {
                    "type": "object",
                    "required": [
                        "location"
                    ],
                    "properties": {
                        "unit": {
                            "enum": [
                                "celsius",
                                "fahrenheit"
                            ],
                            "type": "string"
                        },
                        "location": {
                            "type": "string",
                            "description": "The city and state, e.g. San Francisco, CA"
                        }
                    }
                }
            }
        }
        ]
	});

  // Convert markdown to Slack mrkdwn format
  console.log(response1.completion)
  return response1.completion;
};
