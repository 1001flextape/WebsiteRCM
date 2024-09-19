function getProjectName(): string {
  const adjectives = [
    "Infinite", "Quantum", "Silent", "Dynamic", "Epic",
    "Vivid", "Galactic", "Radiant", "Mystic", "Vortex",
    "Stellar", "Celestial", "Eternal", "Primal", "Arcane",
    "Crimson", "Electric", "Frozen", "Luminous", "Shadowy",
    "Majestic", "Hyper", "Nebulous", "Ironclad", "Solar",
    "Spectral", "Cosmic", "Shimmering", "Ethereal", "Thunderous"
  ];

  const nouns = [
    "Voyager", "Phoenix", "Horizon", "Nebula", "Echo",
    "Falcon", "Pioneer", "Odyssey", "Pulse", "Titan",
    "Serpent", "Forge", "Griffin", "Mirage", "Sentinel",
    "Catalyst", "Eclipse", "Prism", "Atlas", "Ember",
    "Kraken", "Zenith", "Nova", "Apex", "Infinity",
    "Chimera", "Tempest", "Avalanche", "Blaze", "Oracle",
    "Spectrum", "Phantom", "Valkyrie", "Forge", "Horizon",
    "Storm", "Pulse", "Matrix", "Dynamo", "Leviathan",
    "Quantum", "Cipher", "Eclipse", "Nexus", "Zenith",
    "Ember", "Circuit", "Nebula", "Drift", "Fusion",
    "Dragon", "Crescent", "Strider", "Arrow", "Comet",
    "Spear", "Specter", "Hydra", "Eclipse", "Monolith",
    "Orbit", "Prism", "Warp", "Inferno", "Cascade",
    "Nova", "Pulse", "Ember", "Reactor", "Nexus",
    "Cyclone", "Armada", "Shard", "Summit", "Rift",
    "Vanguard", "Abyss", "Enigma", "Obsidian", "Starlight",
    "Fracture", "Bolt", "Surge", "Terra", "Echo",
    "Vector", "Rift", "Apex", "Forge", "Specter",
    "Nexus", "Viper", "Shadow", "Inferno", "Goliath",
    "Vortex", "Stratos", "Pyre", "Mirage", "Helix"
  ];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}

export default getProjectName;
