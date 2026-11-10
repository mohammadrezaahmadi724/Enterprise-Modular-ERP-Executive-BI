import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    checkout_gl_saga: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 200 },
        { duration: '1m', target: 1000 },
        { duration: '30s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE = __ENV.API_BASE || 'http://127.0.0.1:3000';

export default function wave5Load() {
  const health = http.get(`${BASE}/health`);
  check(health, { 'health ok': (r) => r.status === 200 });
  sleep(0.2);
}
