export function getRoomHeading(imgUrl: string, index: number): string {
  if (!imgUrl) return "Living Room";
  const url = imgUrl.toLowerCase();
  
  if (url.includes("living") || url.includes("sofa") || url.includes("lounge")) {
    return "Living Room";
  }
  if (url.includes("bedroom") || url.includes("bed") || url.includes("suite")) {
    if (url.includes("master")) return "Master Bedroom";
    if (url.includes("kids")) return "Kids Bedroom";
    return "Bedroom";
  }
  if (url.includes("dining")) {
    return "Dining Room";
  }
  if (url.includes("kitchen") || url.includes("cooking")) {
    return "Modular Kitchen";
  }
  if (url.includes("bathroom") || url.includes("washroom") || url.includes("vanity")) {
    return "Bathroom & Vanity";
  }
  if (url.includes("pooja") || url.includes("mandir")) {
    return "Pooja Room";
  }
  if (url.includes("office") || url.includes("study") || url.includes("desk")) {
    return "Home Office & Study";
  }
  if (url.includes("balcony") || url.includes("terrace")) {
    return "Balcony & Sitout";
  }
  if (url.includes("cafe") || url.includes("restaurant")) {
    return "Lounge & Dining";
  }
  if (url.includes("exterior") || url.includes("facade") || url.includes("architectural")) {
    return "Exterior Architecture";
  }

  // Fallback room sequence based on index
  const defaultRooms = [
    "Living Room",
    "Master Bedroom",
    "Dining Room",
    "Modular Kitchen",
    "Guest Bedroom",
    "Balcony & Sitout"
  ];
  return defaultRooms[index % defaultRooms.length];
}
