import { Body } from "./signup.dto";
import { isValidEmail } from "common/validation/email";
import { isNonEmptyString } from "common/validation/string";

export function isValid({ email, firstName, lastName, password}: Body): boolean {
    return (
        isValidEmail(email) &&
        isNonEmptyString(lastName) &&
        isNonEmptyString(firstName) &&
        isNonEmptyString(password)
    );
}