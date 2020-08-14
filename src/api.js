const isDev = process.env.NODE_ENV === 'development';
const host = isDev ? 'http://localhost:9001' : '/.netlify/functions';
const url = host + '/api?type={type}&cat={cat}';

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
