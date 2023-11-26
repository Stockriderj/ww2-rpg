const sounds = [
  "bolt-action",
  "click",
  "no-ammo",
  "pistol",
  "grenade-explosion",
  "equip",
  "xp",
  "bad-to-the-bone",
];

export default function preloadSounds() {
  sounds.map(sound => {
    new Audio(`sounds/${sound}.mp3`).load();
  });
}
