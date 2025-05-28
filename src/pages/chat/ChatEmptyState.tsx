export default function ChatEmptyState() {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="w-64 h-64 mb-6">
          <svg viewBox="0 0 200 200" className="w-full h-full text-primary">
            <g>
              <path
                fill="currentColor"
                d="M100,15c-47.5,0-86,38.5-86,86s38.5,86,86,86s86-38.5,86-86S147.5,15,100,15z M100,170c-38,0-69-31-69-69 s31-69,69-69s69,31,69,69S138,170,100,170z"
              />
              <path
                fill="currentColor"
                d="M130,60c-16.5,0-30,13.5-30,30c0,16.5,13.5,30,30,30s30-13.5,30-30C160,73.5,146.5,60,130,60z M130,105 c-8.3,0-15-6.7-15-15s6.7-15,15-15s15,6.7,15,15S138.3,105,130,105z"
              />
              <path
                fill="currentColor"
                d="M100,100c0-16.5-13.5-30-30-30S40,83.5,40,100s13.5,30,30,30S100,116.5,100,100z M70,115c-8.3,0-15-6.7-15-15 s6.7-15,15-15s15,6.7,15,15S78.3,115,70,115z"
              />
            </g>
            <g transform="translate(100, 100)">
              <g>
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M0,0 C10,10 20,-10 30,0 M-10,20 C0,30 10,10 20,20"
                />
                <line x1="-20" y1="-10" x2="-10" y2="-20" stroke="currentColor" strokeWidth="2" />
                <line x1="-15" y1="-15" x2="-5" y2="-25" stroke="currentColor" strokeWidth="2" />
              </g>
            </g>
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Select a conversation or start a new one</h2>
        <a href="#" className="text-primary hover:underline">
          new one
        </a>
      </div>
    )
  }
  
  