export default function SettingsDialog(
  {isVisible, setIsVisible, blur, setBlur, sepia, setSepia, shake, setShake, offset, setOffset}:
  {
    isVisible: boolean, setIsVisible: (isVisible: boolean) => void,
    blur: number, setBlur: (blur: number) => void,
    sepia: number, setSepia: (sepia: number) => void,
    shake: number, setShake: (shake: number) => void,
    offset: number, setOffset: (offset: number) => void
  }
) {

  const setDefaults = () => {
    setBlur(2);
    setSepia(0.4);
    setShake(10);
    setOffset(1);
  }

  if (!isVisible) return null;
  return (
    <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-[999]">
      <div className="bg-black p-8 rounded-2xl max-w-xl border-2 border-dashed m-6 flex flex-col min-w-96">
        <h1 className="text-2xl font-bold text-center">Settings</h1>

        <label className="text-white mt-4">Blur</label>
        <input
          type="number"
          value={blur}
          onChange={(e) => setBlur(Number(e.target.value))}
          className="bg-white/20 text-white px-4 py-2 rounded-xl mt-2"
        />

        <label className="text-white mt-4">Sepia</label>
        <input
          type="number"
          value={sepia}
          onChange={(e) => setSepia(Number(e.target.value))}
          className="bg-white/20 text-white px-4 py-2 rounded-xl mt-2"
        />

        <label className="text-white mt-4">Shake</label>
        <input
          type="number"
          value={shake}
          onChange={(e) => setShake(Number(e.target.value))}
          className="bg-white/20 text-white px-4 py-2 rounded-xl mt-2"
        />

        <label className="text-white mt-4">Offset</label>
        <input
          type="number"
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
          className="bg-white/20 text-white px-4 py-2 rounded-xl mt-2"
        />

        <div className="flex gap-2 items-stretch justify-stretch mt-8">
          <button
            onClick={() => setIsVisible(false)} 
            className="bg-white/20 text-white px-4 py-2 rounded-xl w-full"
          >
            Close
          </button>
          <button
            onClick={setDefaults}
            className="bg-red-900 text-white px-4 py-2 rounded-xl w-full"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}