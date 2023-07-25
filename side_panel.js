document.addEventListener('DOMContentLoaded', function () {
  displayTextInputBox();

  // Function to make an API call to OpenAI GPT-3.5-turbo Chatbot
  const openAIApiKey = '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';

  async function callOpenAIGptChatbot(userQuestion) {
    // Display the chatbot response to the user
    const chatbotOutputBox = document.getElementById('side-panel-output-box');
    chatbotOutputBox.innerHTML = '';

    // Create a new message container for user's question
    const userMessageContainer = document.createElement('div');
    userMessageContainer.className = 'message-container user-message-container';

    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = userQuestion;

    userQuestion = "Give me a short and friendly answer in short using icons,text and emojis of the given Question in triple Brackets" + " {'''" + userQuestion + "'''} ";

    userMessageContainer.appendChild(userMessage);
    chatbotOutputBox.appendChild(userMessageContainer);

    // Create a new message container for chatbot's response
    const chatbotMessageContainer = document.createElement('div');
    chatbotMessageContainer.className = 'message-container chatbot-message-container';

    const chatbotMessage = document.createElement('div');
    chatbotMessage.className = 'message chatbot-message';
    chatbotMessage.textContent = 'Loading...'; // Optionally, you can show a loading message

    chatbotMessageContainer.appendChild(chatbotMessage);
    chatbotOutputBox.appendChild(chatbotMessageContainer);

    // Make the API call to OpenAI GPT-3.5-turbo Chatbot
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: userQuestion },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Error calling OpenAI GPT-3.5-turbo Chatbot: ' + response.statusText);
      }

      const data = await response.json();
      const chatbotResponse = data.choices[0].message.content || 'Oops! No response from the Chatbot. Please try again.';

      // Update the chatbot message with the response
      chatbotMessage.textContent = chatbotResponse;

      // Log the chatbot response to the console
      console.log('Chatbot Response:', chatbotResponse);
    } catch (error) {
      console.error('Error calling OpenAI GPT-3.5-turbo Chatbot:', error);
      chatbotMessage.textContent = 'Oops! An error occurred. Please try again.';
    }
  }

  // Function to display the text input box and handle user input
  function displayTextInputBox() {
    const inputBox = document.getElementById('side-panel-input-box');
    const questionInput = document.getElementById('side-panel-question-input');
    const submitBtn = document.getElementById('side-panel-submit-btn');
    const chatbotOutputBox = document.getElementById('side-panel-output-box');

    // Show the input box
    inputBox.style.display = 'flex';

    // Event listener for the submit button
    submitBtn.addEventListener('click', function () {
      const userQuestion = questionInput.value;
      console.log('User Question:', userQuestion);
      if (userQuestion.trim() !== '') {
        // Call the OpenAI GPT-3.5-turbo Chatbot API
        callOpenAIGptChatbot(userQuestion);
      }
    });

    // Event listener for Enter key press in the text input box
    questionInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        submitBtn.click();
      }
    });
  }
});
