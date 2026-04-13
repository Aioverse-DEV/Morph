// ── Timestamp ──
const now = new Date();
document.getElementById('ts').textContent =
  now.toISOString().split('T')[0] + ' ' + now.toTimeString().slice(0,5) + ' IST';
if (document.getElementById('submission_date')) {
  document.getElementById('submission_date').valueAsDate = now;
}

// ── Progress bar ──
function updateProgress() {
  const req = document.querySelectorAll('[required]');
  let filled = 0;
  req.forEach(el => {
    if (el.type === 'checkbox') { if (el.checked) filled++; }
    else if (el.value.trim() !== '') filled++;
  });
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = Math.min(100, Math.round((filled / req.length) * 100)) + '%';
  }
}
document.addEventListener('change', updateProgress);
document.addEventListener('input', updateProgress);

// ── File list display ──
function showFiles(input, listId) {
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = '';
  Array.from(input.files).forEach(f => {
    const s = document.createElement('span');
    s.textContent = '▶ ' + f.name + ' (' + (f.size / 1024 / 1024).toFixed(2) + ' MB)';
    list.appendChild(s);
  });
}

// ── Data helpers ──
function getChecked(prefix) {
  return Array.from(document.querySelectorAll(`input[type="checkbox"][id^="${prefix}"]:checked`))
    .map(e => e.value).join(', ') || 'None selected';
}

function getRadio(name) {
  const e = document.querySelector(`input[type="radio"][name="${name}"]:checked`);
  return e ? e.value : 'Not specified';
}

function getFiles(id) {
  const e = document.getElementById(id);
  return (e && e.files.length > 0) ? Array.from(e.files).map(f => f.name).join(', ') : 'None';
}

function v(id) {
  const e = document.getElementById(id);
  return e ? (e.value.trim() || 'Not provided') : 'N/A';
}

// Form submission handler
const form = document.getElementById('morphForm');
if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const statusMsg = document.getElementById('statusMsg');
    
    if (submitBtn) submitBtn.disabled = true;
    if (statusMsg) {
      statusMsg.className = 'sending';
      statusMsg.style.display = 'block';
      statusMsg.textContent = '⟳ TRANSMITTING ENCRYPTED BRIEF...';
    }
    
    try {
      // Collect form data
      const formData = new FormData(this);
      
      // Send to server (placeholder - update with actual endpoint)
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        if (statusMsg) {
          statusMsg.className = 'success';
          statusMsg.textContent = '✓ SUBMISSION SUCCESSFUL';
        }
        
        // Show success screen
        setTimeout(() => {
          const formElement = document.getElementById('morphForm');
          const successScreen = document.getElementById('successScreen');
          if (formElement) formElement.style.display = 'none';
          if (successScreen) successScreen.style.display = 'block';
        }, 1500);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      if (statusMsg) {
        statusMsg.className = 'error';
        statusMsg.textContent = '✗ TRANSMISSION ERROR - Please retry or contact support';
      }
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
