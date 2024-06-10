import { Roles } from "../../enums/Roles/ERoles";

export interface User {
    id: string;
    email?: string;
    phone?: string;
    first_name?: string; // имя
    last_name?: string; // фамилия
    middle_name?: string; // отчество
    role: Roles;
}