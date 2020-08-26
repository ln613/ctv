import { flHost, domain } from './const';

const isDev = process.env.NODE_ENV === 'development';
const host = isDev ? 'http://localhost:9001' : '/.netlify/functions';
const url = host + '/api?type={type}&cat={cat}&epg={epg}';
const addDays = (d, n) => new Date(d.setDate(d.getDate() + n))
const setCookie = (k, v) => document.cookie = `${k}=${v}; domain=${domain}; expires=${addDays(new Date()).toUTCString()}`;

// export const loadCategories = () => ({
//   path: 'cats',
//   url,
//   params: { type: 'cats' },
//   deps: [],
// })

export const loadChannels = ({ cat }) => ({
  path: `cats[cat=${cat}].chs`,
  url,
  params: { type: 'chs', cat },
})

export const loadChannel = ({ cat, epg = '' }) => ({
  isValid: epg,
  path: `cats[cat=${cat}].chs[epg=${epg}].live`,
  url,
  params: { type: 'ch', epg, cat },
  done: r => {console.log(r)
    r = r.filter(x => x.urlvip.toString() === '0');
    if (r.length > 0) {
      const l = r.find(x => x.url.slice(-2) === 'hd') || r[0];
      window.open(`${flHost}embed/${l.player}?${l.url}`, '_blank');
    }
  }
})
