function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diffSeconds < 60) {
    return `${diffSeconds} detik yang lalu`;
  }
  if (diffMinutes < 60) {
    return `${diffMinutes} menit yang lalu`;
  }
  if (diffHours < 24) {
    return `${diffHours} jam yang lalu`;
  }
  if (diffDays < 30) {
    return `${diffDays} hari yang lalu`;
  }
  return posted.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default postedAt;
