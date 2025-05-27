type Props = {
  text: string;
  clickFunction: Function;
};

function DefaultButton({ text, clickFunction }: Props) {
  const handleClick = () => {
    clickFunction();
  };

  return (
    <button
      type="button"
      className="cursor-pointer w-fit h-18 p-4 border-2 border-white rounded-2xl text-white text-2xl font-bold"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default DefaultButton;
