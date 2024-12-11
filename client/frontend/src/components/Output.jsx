const Output = ({ response }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <p className="text-gray-800 font-medium">{JSON.stringify(response.response)}</p> {/* Render object as a string */}
    </div>
  );
};

export default Output;
