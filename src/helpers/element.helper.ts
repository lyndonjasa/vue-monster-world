export function toElementString(element: number): string {
  switch (element) {
    case 0:
      return 'Non Elemental';
    case 1:
      return 'Fire';
    case 2:
      return 'Wind';
    case 3:
      return 'Electric';
    case 4:
      return 'Rock';
    case 5:
      return 'Water';
    default:
      throw 'Unsupported Element'
  }
}