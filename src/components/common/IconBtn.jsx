export default function IconBtn({
  text,
  onclick,
  children,
  disabled = false,
  outline = false,
  customClasses = "",
  type = "button",
}) {
  // Conditional classes
  const buttonStyle = outline ? "border border-yellow-50 bg-transparent text-yellow-50" : "bg-[#F19A3E] text-richblack-900";
  const cursorStyle = disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer";

  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center gap-x-2 rounded-md py-2 px-5 font-semibold ${buttonStyle} ${cursorStyle} ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}
