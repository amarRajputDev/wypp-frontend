import { Plus } from 'lucide-react';


function StoriesContainer() {
  return (
    <>
      <div className="w-full py-2 bg-[#D77A61] border-2 border-[#B95B45] shadow-[0_0_20px_5px_rgba(215,122,97,0.6)] rounded-lg p-4 overflow-x-auto overflow-y-hidden">
      <div className="carousel rounded-box ">
        {[...Array(15)].map((_, i) => (
          <div className={`carousel-item ml-2 relative `}>
            

              <img
              className="mask mask-circle w-24"
              src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" />

              <div  className= {` absolute  bottom-0 -right-[4px] ${i === 0 ? " ":" hidden "} bg-white/50 rounded-full border `}>

            <Plus size={25} />
              </div>
          </div>
        ))}
      </div>

    </div>
    </>
  )
}

export default StoriesContainer
