const { generateAndSaveHTML, setupWatcher } = require("../Utils/generate.js");

const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Brain!</title>
</head>
<body>
    <h1>Welcome to Brain!</h1>
    {{#endearment}}
    <p>Hi there {{ endearment }},</p>
    {{/endearment}}
    <p>Thank you, {{ contact.first_name }} {{ contact.last_name }}</p>
    
    {{#emergency}}
    <p>THIS IS AN EMERGENCY</p>
    {{/emergency}}
    
    {{^emergency}}
    <p>{{ affirmation }}</p>
    {{/emergency}}
    
    <ul>
        {{#reasons}}
        <li>{{ . }}</li>
        {{/reasons}}
    </ul>
</body>
</html>
`;

const data = {
  endearment: "friend",
  contact: {
    first_name: "John",
    last_name: "Doe",
  },
  emergency: false,
  affirmation: "Have a great day!",
  reasons: ["Fast", "Reliable", "Secure"],
};

function regenerate() {
  generateAndSaveHTML(template, data, "test");
}

setupWatcher(regenerate);
regenerate(); // Initial generation
