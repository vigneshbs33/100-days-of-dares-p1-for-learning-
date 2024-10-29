let day = 1;

document.addEventListener("DOMContentLoaded", getDare);

function getDare() {
    fetch(`/get_dare/${day}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("dare").textContent = data.dare;
        });
}

function submitComment() {
    const comment = document.getElementById("comment").value;
    fetch('/submit_comment', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ day: day, comment: comment })
    }).then(response => response.json())
      .then(data => {
          alert(data.message);
          day += 1;  // Move to the next day
          document.getElementById("comment").value = "";  // Clear the comment field
          getDare();  // Load the next dare
      });
}

function showMemories() {
    fetch('/memories')
        .then(response => response.json())
        .then(data => {
            const memoriesDiv = document.getElementById("memories");
            memoriesDiv.innerHTML = '<h2>Your Memories</h2>' +
                data.comments.map(entry => `<p>Day ${entry.day}: ${entry.comment}</p>`).join('');
            memoriesDiv.style.display = 'block';
        });
}
