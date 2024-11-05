import IconBtn from "./IconBtn";

export default function ConfirmationModal({ modalData }) {
  const {
    text1 = "",
    text2 = "",
    btn1Handler = () => {},
    btn1Text = "",
    btn2Handler = () => {},
    btn2Text = "",
  } = modalData || {};

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-[white] bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-black p-6">
        <p className="text-2xl font-semibold text-white">{text1}</p>
        <p className="mt-3 mb-5 leading-6 text-white">{text2}</p>
        <div className="flex items-center gap-x-4">
          <IconBtn onclick={btn1Handler} text={btn1Text} />
          <button
            className="cursor-pointer rounded-md border-2 border-[#F19A3E] py-2 px-5 font-semibold text-[#F19A3E] bg-transparent"
            onClick={btn2Handler}
          >
            {btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}
