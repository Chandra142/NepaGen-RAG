const FileUploader = ({ label, onFiles, className = '' }) => {
  const handleChange = (event) => {
    const files = Array.from(event.target.files ?? []);
    onFiles(files);
    event.target.value = '';
  };

  return (
    <label
      className={`cursor-pointer inline-flex items-center justify-center rounded-lg transition-colors duration-200 ${className}`}
      title="Upload files"
    >
      {label}
      <input type="file" accept=".pdf,image/*" multiple className="sr-only" onChange={handleChange} />
    </label>
  );
};

export default FileUploader;
