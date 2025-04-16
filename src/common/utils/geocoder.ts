export class Geocoder {
  static async geocode(address: string): Promise<{ lat: number; lng: number }> {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`,
    );

    const data = await response.json();

    if (!data[0]?.lat || !data[0]?.lon) {
      throw new Error("Адрес не найден");
    }

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  }
}
