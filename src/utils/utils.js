export const formatCount = (followers) => {
  if (followers >= 1000000) {
    return (followers / 1000000).toFixed(1) + "M";
  } else if (followers >= 1000) {
    return (followers / 1000).toFixed(1) + "K";
  } else {
    return followers.toString();
  }
};

export function timeAgo(time) {
  time = new Date(time);
  const seconds = Math.floor((Date.now() - time) / 1000);
  const interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return `${interval} years ago`;
  }
  if (interval === 1) {
    return "1 year ago";
  }
  if (interval < 1) {
    const days = Math.floor(seconds / 86400);
    if (days >= 7) {
      const weeks = Math.floor(days / 7);
      return `${weeks} weeks ago`;
    }
    if (days === 1) {
      return "1 day ago";
    }
    if (days > 1) {
      return `${days} days ago`;
    }
    const hours = Math.floor(seconds / 3600);
    if (hours === 1) {
      return "1 hour ago";
    }
    if (hours > 1) {
      return `${hours} hours ago`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes === 1) {
      return "1 minute ago";
    }
    if (minutes > 1) {
      return `${minutes} minutes ago`;
    }
    if (seconds <= 10) {
      return "just now";
    }
    return `${seconds} seconds ago`;
  }
}

export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function formatChatTimestamp(date) {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Date(date).toLocaleString("en-US", options);
}
