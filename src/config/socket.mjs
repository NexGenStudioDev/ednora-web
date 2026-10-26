import { io } from 'socket.io-client';

const backendUrl =
   import.meta.env.VITE_BACKEND_URL ||
   'https://ciitm-backend.onrender.com';

const MAX_RETRIES = 5;
let retryCount = 0;
let reconnecting = false;

console.log('Connecting to socket at', backendUrl);

const socket = io(backendUrl, {
   auth: {
      token: localStorage.getItem('token'), // or sessionStorage
   },
   withCredentials: true,
   autoConnect: true,
   transports: ['websocket', 'polling'],
   reconnection: false, // We'll handle reconnection manually
   timeout: 20000,
   pingTimeout: 20000,
   pingInterval: 25000,
});
// ✅ Connected
socket.on('connect', () => {
   console.log('✅ Connected to server');
   retryCount = 0; // reset retry count
   reconnecting = false;
});

// ❌ Disconnected
socket.on('disconnect', reason => {
   console.warn(`⚠️ Disconnected: ${reason}`);
   if (!reconnecting) {
      attemptReconnection();
   }
});

// ❌ Connection error
socket.on('connect_error', error => {
   console.error('❌ Connection error:', error.message);
   if (!reconnecting) {
      attemptReconnection();
   }
});

function attemptReconnection() {
   reconnecting = true;
   const retryInterval = setInterval(() => {
      if (socket.connected) {
         console.log('✅ Reconnected successfully.');
         clearInterval(retryInterval);
         reconnecting = false;
         retryCount = 0;
         return;
      }

      if (retryCount >= MAX_RETRIES) {
         clearInterval(retryInterval);
         console.warn(
            '⚠️ Socket reconnection attempts reached max limit.',
         );
         reconnecting = false;
         return;
      }

      console.log(`🔄 Reconnection attempt ${retryCount + 1}...`);
      socket.connect(); // manually attempt to reconnect
      retryCount++;
   }, 3000); // wait 3 seconds between each attempt
}

export default socket;
