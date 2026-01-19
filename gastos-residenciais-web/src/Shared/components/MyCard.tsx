function MyCard({ children }) {
  return (
    <div className="mt-5 bg-white px-7 py-4 flex flex-col rounded-lg border-2">
      {children}
    </div>
  );
}

export default MyCard;
