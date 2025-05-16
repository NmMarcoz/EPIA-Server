import * as arktyper from "../utils/typeValidations"

export type User = typeof arktyper.CreateUserRequest.infer &  {
    id: number;
}
export type Store = typeof arktyper.CreateStoreRequest.infer & {
    id: number;
}