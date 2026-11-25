// Photos come from Pexels (free to use, commercial use allowed, no attribution required — credits are in the README).
// Every image has a built-in illustration fallback, so a failed or blocked image never leaves a gap.
// To use your own photo instead, put a file in /public/images/ and set `image: "/images/your-file.jpg"` in src/config/site.js.
export const pexels = (id, w, h) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}`;

export const PHOTO_SIZES = {
  hero: [1920, 1080],
  destination: [720, 900],
  service: [1000, 625],
};

export const srcsFor = (image) => (image ? [image] : []);
