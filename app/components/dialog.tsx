export default function Dialog({isVisible, setIsVisible}: {isVisible: boolean, setIsVisible: (isVisible: boolean) => void}) {
  if (!isVisible) return null;
  return (
    <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-[999]">
      <div className="bg-black p-8 rounded-2xl max-w-xl border-2 border-dashed m-6 flex flex-col">
        <h1 className="text-2xl font-bold text-center">He loved cheese.</h1>
        <p className="text-gray-500 my-1">
          They say Crypto wasn&rsquo;t just a soldier; he was the Batata Battalion itself, the heart and soul of the fiercest fighting force ever seen. He led us through fire and ash, from the endless sands of Tunisiastan to the chaos of Chorba, never faltering. This web app stands as a tribute to his legacy &mdash; a tool to transform any image you upload, applying the same gritty filter that shaped his legend. Each generated image marks a chapter of his gospel, echoing the moments when Crypto, &quot;The Butcher&quot; Borgir, led the Battalion to glory. He wasn&rsquo;t just the best of us &mdash; he was the reason we believed victory was always within reach.
        </p>
        <button
          onClick={() => setIsVisible(false)} 
          className="bg-white/20 text-white px-4 py-2 rounded-xl mt-4"
        >
          Close
        </button>
      </div>
    </div>
  )
}