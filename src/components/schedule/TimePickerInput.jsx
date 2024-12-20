export const TimePickerInput = ({ value, onChange, className = "", placeholder }) => {
  const validateTimeInput = (input) => {
    // Basic 24-hour format validation (HH:mm)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(input)) return false;
    return true;
  };

  const handleChange = (e) => {
    const input = e.target.value;
    if (input === "" || validateTimeInput(input)) {
      onChange(input);
    }
  };

  return (
    <input
      type="time"
      value={value}
      onChange={handleChange}
      className={`px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 
        focus:ring-primary-500 focus:border-primary-300 outline-none ${className}`}
      placeholder={placeholder}
    />
  );
};
