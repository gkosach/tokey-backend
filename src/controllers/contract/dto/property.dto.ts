import { Property } from "@/src/db/entities";

export class PropertyDTO {
  /** Уникальный идентификатор объекта недвижимости */
  id: number;
  /** Название объекта недвижимости */
  name: string;
  /** Описание объекта недвижимости */
  description: string;
  /** Цена аренды в месяц */
  pricePerMonth: number;
  /** Сумма залога */
  securityDeposit: number;
  /** Сумма платы за заявку */
  applicationFee: number;
  /** Список URL-адресов фотографий объекта недвижимости */
  photoUrls: string[];
  /** Разрешено ли содержание домашних животных */
  isPetsAllowed: boolean;
  /** Включена ли парковка в стоимость аренды */
  isParkingIncluded: boolean;
  /** Количество спален в объекте недвижимости */
  beds: number;
  /** Количество ванных комнат в объекте недвижимости */
  baths: number;
  /** Площадь объекта недвижимости в квадратных футах */
  squareFeet: number;
  /** Тип объекта недвижимости (например, квартира или дом) */
  propertyType: string;
  /** Адрес местоположения объекта недвижимости */
  address: string;
  /** Город местоположения объекта недвижимости */
  city: string;
  /** Регион местоположения объекта недвижимости */
  state: string;
  /** Страна местоположения объекта недвижимости */
  country: string;
  /** Почтовый индекс местоположения объекта недвижимости */
  postalCode: string;
  /** Дата публикации объекта недвижимости */
  postedDate: Date;
  /** Средний рейтинг объекта недвижимости */
  averageRating?: number;
  /** Количество отзывов для объекта недвижимости */
  numberOfReviews?: number;
  /** Широта (latitude) местоположения объекта недвижимости */
  latitude: number;
  /** Долгота (longitude) местоположения объекта недвижимости */
  longitude: number;
  /** Геопространственные данные в формате GeoJSON для отображения на карте */
  locationGeoJSON: {
    type: string;
    coordinates: number[];
  };
  /** Информация о менеджере без циклических ссылок */
  manager?: {
    id: number;
    name: string;
    email: string;
  };

  /**
   * Преобразует сущность Property в объект DTO для безопасной передачи на фронтенд
   * @param property Сущность объекта недвижимости из базы данных
   * @returns Объект DTO с данными для фронтенда
   */
  static fromEntity(property: Property): PropertyDTO {
    const dto = new PropertyDTO();

    // Копируем все базовые поля
    Object.assign(dto, {
      id: property.id,
      name: property.name,
      description: property.description,
      pricePerMonth: property.pricePerMonth,
      securityDeposit: property.securityDeposit,
      applicationFee: property.applicationFee,
      photoUrls: property.photoUrls,
      isPetsAllowed: property.isPetsAllowed,
      isParkingIncluded: property.isParkingIncluded,
      beds: property.beds,
      baths: property.baths,
      squareFeet: property.squareFeet,
      propertyType: property.propertyType,
      address: property.address,
      city: property.city,
      state: property.state,
      country: property.country,
      postalCode: property.postalCode,
      postedDate: property.postedDate,
      averageRating: property.averageRating,
      numberOfReviews: property.numberOfReviews,
      latitude: property.latitude,
      longitude: property.longitude,
    });

    // Преобразуем PostGIS Point в GeoJSON для использования в картографических библиотеках
    dto.locationGeoJSON = {
      type: "Point",
      coordinates: [property.longitude, property.latitude],
    };

    // Добавляем информацию о менеджере без циклических ссылок
    if (property.manager) {
      dto.manager = {
        id: property.manager.id,
        name: property.manager.name,
        email: property.manager.email,
      };
    }

    return dto;
  }
}
