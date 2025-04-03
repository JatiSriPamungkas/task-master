const IsLoadingModal = () => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-b-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-secondary">Loading...</p>
        </div>
      </div>
    </>
  );
};

export default IsLoadingModal;
