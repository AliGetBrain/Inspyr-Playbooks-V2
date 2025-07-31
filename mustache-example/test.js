const { generateAndSaveHTML, setupWatcher } = require("../Utils/generate.js");

const template = `
<h1>Welcome to Brain!</h1>
<p>Hi there {{ endearment }},</p>
<p>Thank you, {{ contact.first_name }} {{ contact.last_name }}</p>
{{#emergency}}
<p>BALLISTIC MISSILE THREAT INBOUND TO HAWAII.</p>
{{/emergency}}
{{^emergency}}
<p>{{ affirmation }}</p>
{{/emergency}}
{{#reasons}}
<li>{{ . }}</li>
{{/reasons}}
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
  generateAndSaveHTML(template, data, "testing");
}

setupWatcher(regenerate);
regenerate(); // Initial generation
