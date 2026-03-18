function LoadingBar({ loading }) {
  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[100]">
      <div className="h-1 bg-accent animate-pulse rounded-r" />
    </div>
  );
}

export default LoadingBar;
