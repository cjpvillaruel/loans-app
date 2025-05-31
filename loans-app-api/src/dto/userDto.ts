export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;   // Consider using a hashed password in production
}

export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;  // Consider using a hashed password in production
}