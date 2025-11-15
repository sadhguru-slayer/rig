const YouTubeAddIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
    {...props}
  >
    {/* YouTube rectangle with play button */}
    <rect x="2" y="5" width="20" height="14" rx="3" ry="3" fill="currentColor" />
    <polygon points="10,8 16,12 10,16" fill="white" />

    {/* Plus sign */}
    <circle cx="18" cy="6" r="3" fill="red" />
    <line x1="18" y1="4.5" x2="18" y2="7.5" stroke="white" strokeWidth="1" />
    <line x1="16.5" y1="6" x2="19.5" y2="6" stroke="white" strokeWidth="1" />
  </svg>
);

export default YouTubeAddIcon;
