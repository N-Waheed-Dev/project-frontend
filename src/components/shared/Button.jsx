export default function Button({ handleClick, children }) {
  return (
    <button
      onClick={() => {
        if (typeof handleClick == "function") {
          handleClick();
        }
      }}
      className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-sage-button hover:bg-sage-primary active:bg-sage-text backdrop-blur-lg px-6 py-2 text-base font-semibold text-sage-background transition-all duration-300 ease-in-out hover:scale-103 hover:shadow-xl hover:shadow-sage-button/30 border border-sage-background/20 cursor-pointer"
    >
      <span className="text-lg tracking-wider uppercase">{children}</span>
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 ]">
        <div className="relative h-full w-10 bg-sage-background/30"></div>
      </div>
    </button>
  );
}
