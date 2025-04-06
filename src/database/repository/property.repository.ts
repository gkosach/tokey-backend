import { BaseRepository } from "@/src/database/repository/base.repository";
import { Between, FindManyOptions } from "typeorm";
import { Property } from "../entities";

export class PropertyRepository extends BaseRepository<Property> {
  constructor() {
    super(Property);
  }

  async find(options?: FindManyOptions<Property>): Promise<Property[]> {
    return this.repository.find({
      ...options,
      relations: ["manager", "leases"],
    });
  }

  async findByFilters(filters: Record<string, unknown>): Promise<Property[]> {
    const findOptions: FindManyOptions<Property> = {
      relations: ["manager", "leases"],
      where: this.buildWhereClause(filters),
    };
    return this.repository.find(findOptions);
  }

  private buildWhereClause(filters: Record<string, unknown>) {
    const where: Record<string, any> = {};

    // Фильтр по цене
    if (filters.priceMin || filters.priceMax) {
      where.pricePerMonth = Between(Number(filters.priceMin ?? 0), Number(filters.priceMax ?? 1_000_000));
    }

    // Фильтр по типу свойства
    if (filters.propertyType) {
      where.propertyType = filters.propertyType;
    }

    // Фильтр по количеству спален
    if (filters.beds) {
      where.beds = Number(filters.beds);
    }

    // Фильтр по количеству ванных
    if (filters.baths) {
      where.baths = Number(filters.baths);
    }

    // Фильтр по наличию парковки
    if (filters.isParkingIncluded) {
      where.isParkingIncluded = filters.isParkingIncluded === "true";
    }

    // Фильтр по разрешению с животными
    if (filters.isPetsAllowed) {
      where.isPetsAllowed = filters.isPetsAllowed === "true";
    }

    return where;
  }

  async findById(id: string): Promise<Property | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["manager", "leases"],
    });
  }

  async findPropertiesByManagerId(managerId: string): Promise<Property[]> {
    return this.repository.find({
      where: { manager: { id: managerId } },
      relations: ["manager"],
    });
  }
}
