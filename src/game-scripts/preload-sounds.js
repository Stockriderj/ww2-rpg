const sounds = [
  "bad-to-the-bone",
  "bolt-action",
  "carpet-bomb",
  "click",
  "grenade-explosion",
  "no-ammo",
  "pistol",
  "reload",
  "xp",
];

export default function preloadSounds() {
  sounds.map(sound => {
    new Audio(`sounds/${sound}.mp3`).load();
  });
}
