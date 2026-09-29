let rawText = $input.first().json.candidates[0].content.parts[0].text || "";

if (!rawText) {
    return {
        json: {
            task_title: "New Task Via Voice",
            is_email_task: false,
            recipient_email: null,
            email_subject: null,
            email_body: null
        }
    };
}

try {
    if (rawText.includes("```json")) {
        rawText = rawText.split("```json")[1].split("```")[0];
    } else if (rawText.includes("```")) {
        rawText = rawText.split("```")[1].split("```")[0];
    }

    const parsedData = JSON.parse(rawText.trim());

    return {
        json: {
            task_title: parsedData.task_title || "New Task Via Voice",
            is_email_task: parsedData.is_email_task || false,
            recipient_email: parsedData.recipient_email || null,
            email_subject: parsedData.email_subject || null,
            email_body: parsedData.email_body || null
        }
    };

} catch (error) {
    return {
        json: {
            error: "Failed to parse JSON string from LLM",
            raw_text: rawText
        }
    };
}