export enum UserStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}

// Type for Prisma generated enum
export type PrismaUserStatusEnum = "ACTIVE" | "INACTIVE" | "DELETED";

// Helper function to convert between enum and string
export const getUserStatusEnum = (value: string): UserStatusEnum => {
  switch (value) {
    case "ACTIVE":
      return UserStatusEnum.ACTIVE;
    case "INACTIVE":
      return UserStatusEnum.INACTIVE;
    case "DELETED":
      return UserStatusEnum.DELETED;
    default:
      throw new Error(`Invalid UserStatusEnum value: ${value}`);
  }
};

// Helper function to get all enum values
export const getUserStatusEnumValues = (): string[] => {
  return Object.values(UserStatusEnum);
};
