const form = document.getElementById('qrForm');
const result = document.getElementById('qrResult');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const url = formData.get('url');

  try {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ url })
    });

    if (response.ok) {
      const qrSVG = await response.text();
      result.innerHTML = qrSVG;
    } else {
      result.innerHTML = `<p style="color:red;">Failed to generate QR Code.</p>`;
    }
  } catch (error) {
    result.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
});
