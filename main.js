// set year in footer
document.getElementById('year')?.textContent = new Date().getFullYear();

// force-download helper (fallback if browser ignores download attribute)
async function forceDownload(url, suggestedFilename) {
  try {
    // fetch same-origin file
    const resp = await fetch(url, { mode: 'same-origin' });
    if (!resp.ok) throw new Error('Network response not OK');
    const blob = await resp.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = suggestedFilename || url.split('/').pop();
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);
  } catch (e) {
    console.error('Download failed, opening in new tab as fallback', e);
    window.open(url, '_blank', 'noopener');
  }
}
