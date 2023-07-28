document.addEventListener('DOMContentLoaded', function () {
  displayTextInputBox();

  // doing API call to OpenAI GPT-3.5-turbo Chatbot
  const openAIApiKey = process.env.OPENAI_API_KEY || 'YOUR_DEFAULT_API_KEY';


  async function callOpenAIGptChatbot(userQuestion) {
   
    const chatbotOutputBox = document.getElementById('side-panel-output-box');
    chatbotOutputBox.innerHTML = '';

    
    const userMessageContainer = document.createElement('div');
    userMessageContainer.className = 'message-container user-message-container';

    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = userQuestion;

    userQuestion = "Give me a short and friendly answer in short using icons,text and emojis of the given Question in triple Brackets" + " {'''" + userQuestion + "'''} ";

    userMessageContainer.appendChild(userMessage);
    chatbotOutputBox.appendChild(userMessageContainer);


    const chatbotMessageContainer = document.createElement('div');
    chatbotMessageContainer.className = 'message-container chatbot-message-container';

    const chatbotMessage = document.createElement('div');
    chatbotMessage.className = 'message chatbot-message';
    chatbotMessage.textContent = 'Loading...'; 

    chatbotMessageContainer.appendChild(chatbotMessage);
    chatbotOutputBox.appendChild(chatbotMessageContainer);

    // API call to OpenAI GPT-3.5-turbo Chatbot
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

    
      chatbotMessage.textContent = chatbotResponse;

      console.log('Chatbot Response:', chatbotResponse);
    } catch (error) {
      console.error('Error calling OpenAI GPT-3.5-turbo Chatbot:', error);
      chatbotMessage.textContent = 'Oops! An error occurred. Please try again.';
    }
  }

  function displayTextInputBox() {
    const inputBox = document.getElementById('side-panel-input-box');
    const questionInput = document.getElementById('side-panel-question-input');
    const submitBtn = document.getElementById('side-panel-submit-btn');
    const chatbotOutputBox = document.getElementById('side-panel-output-box');
    
    
    inputBox.style.display = 'flex';

    submitBtn.addEventListener('click', function () {
      const userQuestion = questionInput.value;
      console.log('User Question:', userQuestion);
      if (userQuestion.trim() !== '') {

        callOpenAIGptChatbot(userQuestion);
      }
    });


    questionInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        submitBtn.click();
      }
    });
  }
});
