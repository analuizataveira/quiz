import {
  UserStatusEnum,
  getUserStatusEnum,
  getUserStatusEnumValues,
} from "@enums/UserStatusEnum";

/**
 * Utility functions for working with shared enums
 */

// Type guard to check if a string is a valid UserStatusEnum
export const isValidUserStatus = (value: string): value is UserStatusEnum => {
  return getUserStatusEnumValues().includes(value);
};

// Get display name for enum values (useful for UI)
export const getUserStatusDisplayName = (status: UserStatusEnum): string => {
  const displayNames: Record<UserStatusEnum, string> = {
    [UserStatusEnum.ACTIVE]: "Active",
    [UserStatusEnum.INACTIVE]: "Inactive",
    [UserStatusEnum.DELETED]: "Deleted",
  };

  return displayNames[status];
};

// Get color/class for enum values (useful for UI styling)
export const getUserStatusColor = (status: UserStatusEnum): string => {
  const colors: Record<UserStatusEnum, string> = {
    [UserStatusEnum.ACTIVE]: "green",
    [UserStatusEnum.INACTIVE]: "yellow",
    [UserStatusEnum.DELETED]: "red",
  };

  return colors[status];
};

// Check if a status allows certain operations
export const canPerformAction = (
  status: UserStatusEnum,
  action: string
): boolean => {
  const allowedActions: Record<UserStatusEnum, string[]> = {
    [UserStatusEnum.ACTIVE]: ["login", "purchase", "update_profile"],
    [UserStatusEnum.INACTIVE]: ["reactivate", "update_profile"],
    [UserStatusEnum.DELETED]: ["reactivate"],
  };

  return allowedActions[status]?.includes(action) || false;
};

// Convert database enum string to TypeScript enum
export const fromDatabaseEnum = (dbValue: string): UserStatusEnum => {
  return getUserStatusEnum(dbValue);
};

// Convert TypeScript enum to database enum string
export const toDatabaseEnum = (enumValue: UserStatusEnum): string => {
  return enumValue;
};
