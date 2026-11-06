document.addEventListener("DOMContentLoaded", () => {
  const quoteBtn = document.getElementById("quote-btn");
  const quoteBox = document.getElementById("quote-box");
  const journalInput = document.getElementById("journal-input");
  const saveBtn = document.getElementById("save-btn");
  const journalList = document.getElementById("journal-list");

  // Load journal entries on startup
  async function loadEntries() {
    const response = await fetch("/journal");
    const entries = await response.json();
    renderEntries(entries);
  }

  function renderEntries(entries) {
    journalList.innerHTML = "";
    entries.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `[${entry.timestamp}] ${entry.text}`;
      journalList.appendChild(li);
    });
  }

  // Fetch a random quote
  quoteBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("/quote");
      const data = await response.json();
      quoteBox.textContent = data.quote;
    } catch (error) {
      quoteBox.textContent = "Error fetching quote!";
    }
  });

  // Save journal entry
  saveBtn.addEventListener("click", async () => {
    const text = journalInput.value.trim();
    if (!text) {
      alert("Please write something before saving!");
      return;
    }

    const response = await fetch("/journal", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ text })
    });

    const data = await response.json();
    if (data.success) {
      journalInput.value = "";
      loadEntries();
    }
  });

  loadEntries();
});
