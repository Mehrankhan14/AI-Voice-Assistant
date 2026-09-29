
# AI Voice Task Assistant

An AI-powered voice assistant that allows users to record tasks using their microphone, convert spoken Roman Urdu/Hinglish into text, edit the transcription, and submit the task for AI-powered processing and automation.

The project combines a lightweight browser-based dashboard with an **n8n automation workflow**, **Google Gemini**, **Gmail**, and **Supabase**.

## ✨ Features

* 🎙️ Record tasks directly from the browser
* 🔊 Animated audio recording visualizer
* 📝 Convert voice recordings into editable text
* 🌐 Supports spoken Urdu + English / Roman Urdu (Hinglish)
* 🤖 Use Google Gemini to understand and classify tasks
* ✉️ Generate professional emails from voice instructions
* 📧 Send emails through Gmail
* 🗃️ Store processed task information in Supabase
* ⚡ n8n-based backend automation
* 🎨 Clean dark-mode interface built with Tailwind CSS
* 📱 Responsive browser-based interface

## 🧠 How It Works

The application uses two main automation flows.

### 1. Voice Transcription

```text
User
  │
  ▼
Voice Recording
  │
  ▼
Browser AudioRecorder
  │
  ▼
n8n /transcribe Webhook
  │
  ▼
Google Gemini Audio Analysis
  │
  ▼
Roman Urdu / Hinglish Transcription
  │
  ▼
Frontend Text Preview
```

The frontend records audio using the browser's `MediaRecorder` API and sends the audio file to the n8n transcription webhook.

The n8n workflow receives the uploaded binary audio file and passes it to Google Gemini for transcription.

### 2. Task Execution

```text
Edited Text
    │
    ▼
n8n /execute Webhook
    │
    ▼
Google Gemini
    │
    ▼
Task Classification
    │
    ├── Task Title
    ├── Email Detection
    ├── Recipient Email
    ├── Email Subject
    └── Email Body
    │
    ▼
JavaScript Processing
    │
    ▼
Gmail
    │
    ▼
Supabase
```

The execution workflow sends the submitted text to Gemini, which extracts structured task information such as the task title, recipient email, email subject, and email body.

The workflow then processes the generated JSON, sends the email through Gmail, and creates a task record in Supabase.

## 🛠️ Tech Stack

### Frontend

* HTML5
* JavaScript
* Tailwind CSS
* Web MediaRecorder API
* Google Fonts

The frontend uses Tailwind CSS through its CDN and provides the voice recording, transcription preview, and task submission interface.

### Automation / Backend

* n8n
* n8n Webhooks
* Google Gemini
* Gmail
* Supabase

### AI

The project uses Google Gemini for two main AI tasks:

1. Audio transcription
2. Task understanding and classification

The transcription prompt specifically instructs the model to preserve spoken Roman Urdu/Hinglish rather than translating it into English.

## 📁 Project Structure

```text
ai-voice-task-assistant/
│
├── index.html
├── My workflow.json
├── codeNode.js
├── email-prompt.txt
├── transcribe-prompt.txt
└── README.md
```


## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mehrankhan14/AI-Voice-Assistant.git
cd AI-Voice-Assistant
```

### 2. Frontend

The frontend is a standalone HTML file.

You can run it using a local development server.

For example:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

You can also use the **Live Server** extension in Visual Studio Code.

### 3. Configure n8n

Import:

```text
My workflow.json
```

into your n8n instance.

The workflow contains two webhook endpoints:

```text
POST /transcribe
POST /execute
```

The transcription workflow receives an audio file through the `file` binary field.

The execution workflow receives the submitted task text in the request body. The frontend sends it as:

```json
{
  "text": "your task here"
}
```

The frontend currently calls the two webhook endpoints directly.

### 4. Configure Google Gemini

The n8n workflow requires Google Gemini credentials.

Gemini is used for:

* Audio analysis/transcription
* Task classification
* Email generation

Make sure your n8n instance has the required Google Gemini credentials configured before activating the workflow.

### 5. Configure Gmail

The execution workflow uses Gmail to send generated emails.

Configure a Gmail OAuth credential in n8n and connect it to the Gmail node.

The recipient, subject, and message are generated from the structured Gemini output.

### 6. Configure Supabase

The workflow also creates a record in a Supabase table named:

```text
Voice Assistant
```

The workflow stores fields including:

* Task title
* Task description
* Status
* Assigned recipient

## 🎤 Using the Application

### Step 1 — Record

Click the microphone button.

The browser requests microphone access and starts recording.

### Step 2 — Stop

Click the microphone button again to stop recording.

### Step 3 — Convert to Text

Click:

```text
Convert to Text
```

The recorded audio is sent to the transcription workflow.

The returned transcription appears inside the editable text field.

### Step 4 — Edit

Review or modify the generated transcription before submitting it.

### Step 5 — Submit

Click:

```text
Submit Task
```

The text is sent to the `/execute` n8n webhook for AI processing and automation.

## 💬 Example

A user can say something like:

```text
Ali ko email karo ke kal ki meeting 10 baje shift kar dein.
```

The system first converts the voice into Roman Urdu text.

Gemini then interprets the request and extracts structured information such as:

```json
{
  "task_title": "Reschedule Tomorrow's Meeting",
  "is_email_task": true,
  "recipient_email": "ali@example.com",
  "email_subject": "Request to Reschedule Tomorrow's Meeting",
  "email_body": "..."
}
```

The JavaScript processing node parses the model response and provides default values when fields are missing.


## 🔮 Possible Future Improvements

* Add user authentication
* Add task history dashboard
* Add task status tracking
* Add support for more languages
* Add calendar integration
* Add WhatsApp integration
* Add Google Calendar automation
* Add reminders and scheduled tasks
* Add conditional routing for different task types
* Add confirmation before sending emails
* Move webhook configuration to environment variables
* Add proper backend authentication
* Add error handling and retry mechanisms
* Add real-time task status updates
* Convert the frontend into React/Next.js

## 📄 License

This project is currently provided for educational and development purposes.

Add an appropriate license before distributing the project publicly.

## 👨‍💻 Author

**Khan**

Built with:

* HTML
* JavaScript
* Tailwind CSS
* n8n
* Google Gemini
* Gmail
* Supabase

---

⭐ If you find this project useful, consider giving the repository a star.
