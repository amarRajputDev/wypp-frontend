import { Socket } from "socket.io-client"
import { create } from "zustand"

interface SocketStore {
  Socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
}

const useSocketStore = create<SocketStore>((set) => ({
  Socket: null,
  setSocket: (socket: Socket | null) => set({ Socket: socket })
}))

export default useSocketStore