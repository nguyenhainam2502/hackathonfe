
# FlightBooker FE (React + Vite + Tailwind)

Converted from 5 static HTML mockups into a functional React front-end with routes ready to connect to your backend.

## Run locally
```bash
npm install
npm run dev
```

## Env
Create `.env` and set:
```
VITE_API_BASE=http://localhost:8000/api
```

## Pages
- `/` — Search flights
- `/checkout` — Passenger + payment
- `/manage` — PNR lookup
- `/ticket/:pnr` — E-ticket
- `/login` — Admin login

API calls are defined in `src/services/api.ts` (axios). Replace endpoints to match your BE.
